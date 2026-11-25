import copy
import json
import unittest

from pipeline import SimilarityIndex, parse_pages, prepare


def fixture():
    return {
        "discipline": "clinica_medica", "period": "P2", "theme": "fixture",
        "stem": "Enunciado sintético para verificação estrutural", "lesson_ids": ["fixture_0"],
        "options": [{"id": "A", "text": "Alternativa alfa"}, {"id": "B", "text": "Alternativa beta"}],
        "origin": "autoral_master", "profiles": ["estilo_fmp"], "difficulty": "N2",
        "bibliography": [], "medical_status": "pendente", "rights_status": "pendente", "revision_history": [],
    }


class PipelineTests(unittest.TestCase):
    def test_stable_id_and_hash_under_reordering(self):
        question = fixture()
        before = prepare(question)
        question["options"].reverse()
        question["stem"] = "  ENUNCIADO SINTÉTICO para verificação estrutural."
        self.assertEqual(prepare(question)["hash"], before["hash"])
        self.assertEqual(prepare(question)["id"], before["id"])

    def test_answer_and_publication_validation(self):
        question = fixture()
        with self.assertRaises(ValueError):
            prepare({**question, "original_answer": "C"})
        for fields in ({"medical_status": "validada"}, {"rights_status": "autorizada"}):
            self.assertRaises(Exception, prepare, {**question, **fields})
        self.assertEqual(prepare(question)["origin"], "autoral_master")

    def test_similarity_candidates(self):
        index = SimilarityIndex()
        first = prepare(fixture())
        second = copy.deepcopy(fixture())
        second["stem"] += " adicional"
        self.assertEqual(index.add(first, .78), [])
        self.assertEqual(index.add(prepare(second), .78)[0][1], first["id"])

    def test_pdf_continuation_and_answer_key(self):
        pages = ["QUESTÃO 12. Enunciado\nA) Primeira", "opção\nB) Segunda opção\nGABARITO\n12 - B"]
        result, = parse_pages(pages, {})
        self.assertEqual((result["page"], result["number"], result["original_answer"]), (1, "12", "B"))
        self.assertEqual(result["options"][0]["text"], "Primeira opção")

    def test_json_roundtrip(self):
        question = prepare(fixture())
        self.assertEqual(question, prepare(json.loads(json.dumps(question))))


if __name__ == "__main__":
    unittest.main()
