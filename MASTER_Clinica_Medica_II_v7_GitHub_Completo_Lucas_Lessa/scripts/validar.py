"""Teste estático rápido. Não substitui inspeção visual no iPad."""
from pathlib import Path
import re, sys
from urllib.parse import urlsplit
root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text(encoding='utf-8')
style=(root/'evidence.css').read_text(encoding='utf-8')
missing=[]
for name in re.findall(r'(?:href|src)="([^"]+)"',html):
    if name.startswith(('https:','http:','#','mailto:','data:')): continue
    if not (root/urlsplit(name).path).exists(): missing.append(name)
checks={
    'legenda explícita': 'color: #173b3e;' in style,
    'selecionado explícito': 'color: #075a4f;' in style,
    'modo escuro explícito': 'body[data-theme="dark"] .stage' in style,
    'cor de foco': '.stage:focus-visible' in style,
    'página inicial': (root/'index.html').exists(),
    'síntese de plano': (root/'docs/plano-de-ensino.html').exists(),
    'nenhum PDF privado': not (root/'assets/plano-clinica-medica-ii.pdf').exists(),
}
for label,ok in checks.items():print(('OK' if ok else 'FALHA')+' — '+label)
if missing: print('ARQUIVOS NÃO ENCONTRADOS:',missing)
if missing or not all(checks.values()):sys.exit(1)
print('Integridade estática aprovada.')
