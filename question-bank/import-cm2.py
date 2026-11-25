"""Extract the supplied CM2 reconstruction into a private editorial inbox."""
import argparse
import json
import re
import subprocess
from collections import Counter
from pathlib import Path

BLOCK = re.compile(r"^(\d+)\. (.+?) \((\d+) questões\)$")
HEADER = re.compile(r"^(Q\d+)\s*\|\s*(R1|R\+)\s*\|\s*(estilo .+?)\s*\|\s*(MC|Discursiva)$")
FIELD = re.compile(r"^(Tema:|[A-D]\)|Gabarito:|Resposta-modelo:|Comentário:|Apareceu em:)\s*(.*)$")
TOPICS = (
    'p1inf', 'p1has', 'p1arr', 'p1dm', 'p1tir1', 'p1tir2', 'p1neuro',
    'reuma2', 'reuma1', 'reuma1', 'neuro1', 'neuro1', 'neuro3', 'gastro', 'pocus',
    'hema', 'hema', 'hema', 'hema', 'hema', 'onco', 'hema',
)
CHAPTERS = {
    'p1inf': {'ITU': 3, 'PAC': 2, 'Pele/MRSA': 5},
    'p1has': {'Emergência hipertensiva': 2, 'HAS resistente': 0, 'Renovascular': 3,
              'Outras HAS sec': 3, 'Feocromocitoma': 3, 'DRC': 3, 'Cushing': 3},
    'p1arr': {'FA': 0, 'TSV': 1, 'TV/QT': 2, 'BAV/bradi': 3, 'Taquicardia sinusal': 1},
    'p1dm': {'DM+DCV/IC': 1, 'DM+DRC': 1, 'Síndrome metabólica/dx': 0,
             'DM idoso': 3, 'Antidiabéticos': 3},
    'p1tir1': {'Hashimoto/hipo': 1, 'Hipo subclínico': 1, 'Graves': 0},
    'p1tir2': {'Carcinomas tireoide': 3, 'Crise tireotóxica': 1,
               'Amiodarona': 2, 'Coma mixedematoso': 1},
    'p1neuro': {'Insuficiência adrenal': 0, 'Hipófise/prolactina': 3, 'Acromegalia': 3},
    'reuma2': {'LES': 0, 'SAF': 1, 'PAN/outras vasculites': 2,
               'Vasculites ANCA': 2, 'Vasculites grandes vasos': 2},
    'reuma1': {'Miopatias': 0, 'Esclerose sistêmica': 1},
    'neuro1': {'Síncope': 0, 'Epilepsia': 1},
    'neuro2': {'Guillain-Barré': 0},
    'neuro3': {'Esclerose múltipla': 0, 'Miastenia': 1},
    'gastro': {'DII': 0, 'Celíaca': 1, 'CCR': 2},
    'hema': {'LLC': 0, 'LMC': 0, 'Leucemias agudas': 0, 'SMPC': 0, 'SMD': 0,
             'Linfomas': 1, 'MGUS/outras': 2, 'Mieloma': 2},
}


def parse(text):
    block, records = None, []
    expected = {}
    item, part, theme = None, 'stem', ''
    for page, content in enumerate(text.split('\f'), 1):
        for raw in content.splitlines():
            line = raw.strip()
            if not line or line.startswith('Banco de Questões CM2 - reconstruído'):
                continue
            if match := BLOCK.fullmatch(line):
                block = int(match[1])
                expected[block] = int(match[3])
                item, theme = None, ''
            elif match := HEADER.fullmatch(line):
                if not block:
                    raise ValueError(f'Questão {match[1]} sem bloco')
                number, level, style, kind = match.groups()
                item = dict(number=number, level=level, style=style, kind=kind, block=block,
                            theme=theme, page=page, fields={'stem': []})
                records.append(item)
                part = 'stem'
            elif line.startswith('Dificuldade '):
                item = None
            elif match := FIELD.fullmatch(line):
                part, value = match.groups()
                if part == 'Tema:':
                    theme = value
                    item = None
                elif item is not None:
                    item['fields'][part] = [value]
            elif item is not None:
                item['fields'][part].append(line)
    if expected != Counter(item['block'] for item in records) or set(expected) != set(range(1, len(TOPICS)+1)):
        raise ValueError('A extração não bate com a contagem de cada bloco do PDF')
    if len({item['number'] for item in records}) != len(records):
        raise ValueError('Identificadores repetidos')
    return records


def convert(item, filename):
    fields = {key: ' '.join(value) for key, value in item['fields'].items()}
    subtheme = item['theme'].split(' - caiu em ', 1)[0]
    topic = TOPICS[item['block'] - 1]
    if subtheme in ('Amiodarona', 'Coma mixedematoso'):
        topic = 'p1tir2'
    elif subtheme == 'Graves':
        topic = 'p1tir1'
    elif subtheme == 'Guillain-Barré':
        topic = 'neuro2'
    chapter = CHAPTERS.get(topic, {}).get(subtheme)
    lessons = [topic] if chapter is None else [f'{topic}_{chapter}']
    if topic == 'pocus':
        lessons = ['pocus']
    reference = f"{filename}, p. {item['page']}, {item['number']}"
    base = dict(discipline='clinica_medica', period='P1' if topic.startswith('p1') else 'P2',
                theme=topic, subtheme=subtheme, lesson_ids=lessons, stem=fields['stem'],
                origin='banco_cm2', profiles=['estilo_fmp' if 'FMP' in item['style'] else 'estilo_residencia'],
                difficulty={'R1': 'N2', 'R+': 'N3'}[item['level']], source_level=item['level'],
                source_style=item['style'], source_mentions=fields.get('Apareceu em:', ''),
                reference=reference, page=item['page'], number=item['number'],
                comment=fields.get('Comentário:', ''), bibliography=[],
                medical_status='pendente', rights_status='pendente', revision_history=[])
    for optional in ('source_mentions', 'comment'):
        if not base[optional]:
            del base[optional]
    if item['kind'] == 'Discursiva':
        return {**base, 'model_answer': fields['Resposta-modelo:']}
    options = [{'id': letter, 'text': fields[letter + ')']} for letter in 'ABCD']
    correct = re.fullmatch(r'([A-D])\)\s*(.+)', fields['Gabarito:'])
    if not correct or options[ord(correct[1]) - ord('A')]['text'] != correct[2]:
        raise ValueError(f"Gabarito incompatível em {item['number']}")
    return {**base, 'options': options, 'original_answer': correct[1]}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('pdf', type=Path)
    args = parser.parse_args()
    text = subprocess.check_output(['pdftotext', '-layout', str(args.pdf), '-'], text=True)
    groups = {'MC': [], 'Discursiva': []}
    for item in parse(text):
        groups[item['kind']].append(convert(item, args.pdf.name))
    root = Path(__file__).resolve().parent / 'review'
    for kind, questions in groups.items():
        target = root / f'cm2-{kind.lower()}.jsonl'
        target.write_text(''.join(json.dumps(row, ensure_ascii=False) + '\n' for row in questions), encoding='utf-8')
        print(f'{kind}: {len(questions)}')


if __name__ == '__main__':
    main()
