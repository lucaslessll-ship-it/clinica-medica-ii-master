"""Validação, extração e importação administrativa do banco."""
import argparse
import csv
import hashlib
import json
import os
import re
import subprocess
import tempfile
import unicodedata
import uuid
from collections import defaultdict
from pathlib import Path

from jsonschema import Draft202012Validator, FormatChecker

ROOT = Path(__file__).resolve().parent
SCHEMA = json.loads((ROOT / "schema/question.schema.json").read_text())
VALIDATOR = Draft202012Validator(SCHEMA, format_checker=FormatChecker())
NAMESPACE = uuid.UUID("b84261fc-3b9e-4a90-9938-659d2a591a37")
FIELDS = SCHEMA["properties"]


def tokens(text):
    text = unicodedata.normalize("NFKD", text.casefold())
    return re.findall(r"[^\W_]+", "".join(c for c in text if not unicodedata.combining(c)))


def prepare(question):
    VALIDATOR.validate(question)
    options = question["options"]
    ids = [item["id"] for item in options]
    texts = [" ".join(tokens(item["text"])) for item in options]
    if len(set(ids)) != len(ids) or len(set(texts)) != len(texts):
        raise ValueError("Alternativas repetidas")
    for field in ("original_answer", "reviewed_answer"):
        if field in question and question[field] not in ids:
            raise ValueError(f"{field} precisa referenciar uma alternativa")
    canonical = [" ".join(tokens(question["stem"])), sorted(texts)]
    digest = hashlib.sha256(json.dumps(canonical, ensure_ascii=False).encode()).hexdigest()
    if "hash" in question and question["hash"] != digest:
        raise ValueError("Hash divergente do conteúdo")
    return {**question, "hash": digest, "id": str(uuid.UUID(question["id"])) if "id" in question
            else str(uuid.uuid5(NAMESPACE, question.get("legacy_key", digest)))}


class SimilarityIndex:
    """Triagem por similaridade aproximada, sem descarte automático."""
    def __init__(self, model=None):
        self.model = model
        self.embeddings = {}
        self.terms = defaultdict(set)
        self.vectors = {}

    def add(self, question, threshold, *, remember=True):
        vector = set(tokens(question["stem"]))
        candidates = set().union(*(self.terms[term] for term in vector))
        candidates.discard(question["id"])
        scores = [(len(vector & self.vectors[key]) / len(vector | self.vectors[key]), key)
                  for key in candidates]
        matches = {key: round(score, 3) for score, key in scores if score >= threshold}
        key = question["id"]
        if self.model:
            embedding = self.model.encode(question["stem"], normalize_embeddings=True)
            if threshold <= 1:
                for candidate, stored in self.embeddings.items():
                    if candidate != key:
                        score = float(embedding @ stored)
                        if score >= .9:
                            matches[candidate] = max(matches.get(candidate, 0), round(score, 3))
            if remember:
                self.embeddings[key] = embedding
        ranked = sorted(((score, key) for key, score in matches.items()), reverse=True)[:5]
        if not remember:
            return ranked
        for term in self.vectors.get(question["id"], ()):
            self.terms[term].discard(question["id"])
        self.vectors[question["id"]] = vector
        for term in vector:
            self.terms[term].add(question["id"])
        return ranked


def rows(path):
    with path.open(encoding="utf-8-sig", newline="") as file:
        if path.suffix.lower() == ".csv":
            reader = csv.DictReader(file)
            for row in reader:
                try:
                    yield reader.line_num, {
                        key: json.loads(value) if FIELDS.get(key, {}).get("type") in ("array", "integer")
                        else value for key, value in row.items() if value
                    }
                except (ValueError, TypeError) as error:
                    yield reader.line_num, error
        else:
            for line, raw in enumerate(file, 1):
                if raw.strip():
                    try:
                        yield line, json.loads(raw)
                    except ValueError as error:
                        yield line, error


def validated_batch(path, errors):
    for line, question in rows(path):
        try:
            if isinstance(question, Exception):
                raise question
            yield line, prepare(question)
        except Exception as error:
            errors.append({"line": line, "error": getattr(error, "message", str(error))})


def publishable(question):
    return question["medical_status"] == "validada" and question["rights_status"] == "autorizada"


def process(args):
    errors, duplicate, similar = [], [], []
    model = None
    if args.semantic_model:
        from sentence_transformers import SentenceTransformer
        model = SentenceTransformer(str(args.semantic_model.resolve()), local_files_only=True)
    index = SimilarityIndex(model)
    hashes, stored, seen = {}, {}, set()
    pending = []
    connection = None
    try:
        if args.command == "import":
            import psycopg
            connection = psycopg.connect(os.environ["MASTER_QB_DATABASE_URL"])
            connection.execute("select pg_advisory_xact_lock(811463920)")
            for (existing,) in connection.execute("select content from master_question_bank.questions"):
                stored[existing["id"]] = existing
                hashes[existing["hash"]] = existing["id"]
                index.add(existing, 2)
        for line, question in validated_batch(args.input, errors):
            key, digest = question["id"], question["hash"]
            previous = stored.get(key)
            other = hashes.get(digest)
            if key in seen or (other and other != key):
                duplicate.append({"line": line, "id": other or key})
                continue
            if previous == question:
                duplicate.append({"line": line, "id": key})
                continue
            if previous:
                history = previous["revision_history"]
                incoming = question["revision_history"]
                if len(incoming) <= len(history) or incoming[:len(history)] != history:
                    errors.append({"line": line, "error": "Acrescente a revisão ao histórico existente"})
                    continue
                if previous.get("legacy_key") != question.get("legacy_key"):
                    errors.append({"line": line, "error": "Vínculo legado é imutável"})
                    continue
            if publishable(question) and connection and not args.approved:
                errors.append({"line": line, "error": "Importação aprovada exige --approved"})
                continue
            matches = index.add(question, 0.78, remember=False)
            if matches:
                similar.append({"line": line, "matches": matches})
                if publishable(question) and connection and not args.confirm_similar:
                    errors.append({"line": line, "error": "Similaridade exige decisão editorial"})
                    continue
            index.add(question, 2)
            if previous:
                hashes.pop(previous["hash"], None)
            hashes[digest] = key
            seen.add(key)
            pending.append(question)
        if connection:
            from psycopg.types.json import Jsonb
            for offset in range(0, len(pending), args.batch_size):
                with connection.cursor() as cursor:
                    cursor.executemany(
                        """insert into master_question_bank.questions(id,hash,content)
                        values (%s,%s,%s) on conflict (id) do update
                        set hash=excluded.hash, content=excluded.content""",
                        [(q["id"], q["hash"], Jsonb(q)) for q in pending[offset:offset + args.batch_size]],
                    )
            connection.commit()
    finally:
        if connection:
            connection.close()
    if args.output:
        write_jsonl(args.output, pending)
    report = {"accepted": len(pending), "duplicates": duplicate, "similar": similar, "errors": errors}
    write = json.dumps(report, ensure_ascii=False, indent=2) + "\n"
    if args.report:
        args.report.write_text(write, encoding="utf-8")
    else:
        print(write, end="")
    return bool(errors)


def write_jsonl(path, records):
    with path.open("w", encoding="utf-8") as file:
        for item in records:
            file.write(json.dumps(item, ensure_ascii=False) + "\n")


QUESTION = re.compile(r"^\s*(?:quest[ãa]o\s+)?(\d{1,3})\s*[.)–:-]\s*(.*)$", re.I)
OPTION = re.compile(r"^\s*\(?([A-J])\s*[.)–:-]\s*(.+)$", re.I)
KEY = re.compile(r"\b(\d{1,3})\s*[).:\-–]?\s*([A-J])\b", re.I)
KEY_HEADER = re.compile(r"^\s*gabarito\b", re.I)


def parse_pages(pages, metadata):
    questions, keys = [], {}
    current = None
    reading_key = False
    target = None
    for page_number, page in enumerate(pages, 1):
        for line in page.splitlines():
            if KEY_HEADER.match(line):
                reading_key = True
            if reading_key:
                for number, letter in KEY.findall(line):
                    keys[str(int(number))] = letter.upper()
                continue
            start = QUESTION.match(line)
            alternative = OPTION.match(line)
            if start:
                number, stem = start.groups()
                current = {**metadata, "number": str(int(number)), "page": page_number,
                           "stem": stem.strip(), "options": [], "profiles": [], "bibliography": [],
                           "lesson_ids": [], "medical_status": "pendente", "rights_status": "pendente",
                           "revision_history": []}
                target, field = current, "stem"
                questions.append(current)
            elif current and alternative:
                letter, text = alternative.groups()
                target, field = {"id": letter.upper(), "text": text.strip()}, "text"
                current["options"].append(target)
            elif target is not None and line.strip():
                target[field] = f"{target[field]} {line.strip()}".strip()
    for question in questions:
        if question["number"] in keys:
            question["original_answer"] = keys[question["number"]]
    return questions


def run(*command):
    return subprocess.run(command, check=True, capture_output=True, text=True).stdout


def extract(args):
    metadata = json.loads(args.metadata.read_text(encoding="utf-8"))
    fields = ("discipline", "period", "theme", "difficulty", "origin", "institution", "board", "year", "reference")
    metadata = {field: metadata[field] for field in fields}
    if metadata["origin"] == "autoral_master":
        raise ValueError("Use JSONL ou CSV para questões autorais")
    info = run("pdfinfo", str(args.input.resolve()))
    page_count = int(re.search(r"^Pages:\s+(\d+)", info, re.M).group(1))
    pages, ocr_pages = [], []
    with tempfile.TemporaryDirectory() as directory:
        image = str(Path(directory) / "page")
        for page in range(1, page_count + 1):
            limits = ["-f", str(page), "-l", str(page)]
            text = run("pdftotext", *limits, "-layout", str(args.input.resolve()), "-")
            if len(tokens(text)) < 15 and args.ocr:
                run("pdftoppm", *limits, "-r", "250", "-singlefile", "-png", str(args.input.resolve()), image)
                text = run("tesseract", image + ".png", "stdout", "-l", args.language)
                ocr_pages.append(page)
            pages.append(text)
    questions = parse_pages(pages, metadata)
    write_jsonl(args.output, questions)
    incomplete = [q["number"] for q in questions if not VALIDATOR.is_valid(q) or "original_answer" not in q]
    report = {"extracted": len(questions), "incomplete": incomplete, "ocr_pages": ocr_pages}
    if args.report:
        args.report.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    else:
        print(json.dumps(report))
    return not questions or bool(incomplete)


def main():
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="command", required=True)
    for name in ("validate", "import", "extract"):
        command = sub.add_parser(name)
        command.add_argument("input", type=Path)
        command.add_argument("--output", type=Path, required=name == "extract")
        command.add_argument("--report", type=Path)
        if name != "extract":
            command.add_argument("--semantic-model", type=Path)
        if name == "import":
            command.add_argument("--batch-size", type=int, default=250)
            command.add_argument("--approved", action="store_true")
            command.add_argument("--confirm-similar", action="store_true")
        if name == "extract":
            command.add_argument("--metadata", type=Path, required=True)
            command.add_argument("--ocr", action=argparse.BooleanOptionalAction, default=True)
            command.add_argument("--language", default="por")
    args = parser.parse_args()
    if args.command == "import" and args.batch_size < 1:
        parser.error("--batch-size precisa ser positivo")
    return extract(args) if args.command == "extract" else process(args)


if __name__ == "__main__":
    raise SystemExit(main())
