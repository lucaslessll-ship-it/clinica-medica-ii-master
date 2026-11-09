from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]
html=(root/'index.html').read_text()
assert all((root/name).exists() for name in re.findall(r'(?:href|src)="([\w.\-/]+(?:\.css|\.js|\.svg|\.webmanifest))"',html))
q=(root/'banca_questions.js').read_text()
assert q.count('level:')==40
for x in ['neuro1','neuro2','neuro3','reuma2','onco','hema','gastro','reuma1']: assert q.count("t:'"+x+"'")==5
assert (root/'ENGENHARIA_REVERSA_V7.md').exists()
assert (root/'banca.css').exists()
assert "case 'banca':content=BANCA.page();break;" in (root/'app.js').read_text()
assert 'banca.css' in html and 'banca.js' in html
assert 'color:#175458!important' in (root/'banca.css').read_text()
print('OK: fontes ligadas, 40 novas questões, 8 eixos, novo Radar e correção de contraste.')
