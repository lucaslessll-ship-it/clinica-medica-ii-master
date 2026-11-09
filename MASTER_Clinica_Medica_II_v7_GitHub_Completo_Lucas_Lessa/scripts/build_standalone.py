"""Embutir JS e CSS para um HTML único de referência sem dependências externas.
Não dispensa a hospedagem HTTPS no iPad para armazenamento mais confiável."""
from pathlib import Path
import re, base64
root=Path(__file__).resolve().parents[1]
html=(root/'index.html').read_text(encoding='utf-8')

def style_replace(match):
    name=match.group(1)
    data=(root/name).read_text(encoding='utf-8')
    return '<style data-original-file="'+name+'">\n'+data+'\n</style>'

def script_replace(match):
    name=match.group(1)
    data=(root/name).read_text(encoding='utf-8')
    if '</script' in data.lower(): raise ValueError(f'Embedded script closing tag in {name}')
    if name=='hig.js':data=data.replace('Busque nas 52 aulas, 16 módulos e 88 questões.','Busque nas 54 aulas, 16 módulos e 136 questões.')
    if name=='evidence.js':
        data=data.replace('"url":"docs/plano-de-ensino.html"','"url":"https://app.notion.com/p/3b177b5ddf6a814e8f28c7caf3e38624"')
        data=data.replace('Plano de Ensino Clínica Médica II · UNIFASE/FMP · 2026.2','Plano de aulas 2026.2 · resumo no Notion (consulte plano oficial no AVA)')
    return '<script data-original-file="'+name+'">\n'+data+'\n</script>'

html,count=re.subn(r'<link rel="stylesheet" href="([^"]+)">',style_replace,html)
html,count2=re.subn(r'<script src="([^"]+)"></script>',script_replace,html)
svg=(root/'assets/app-icon.svg').read_bytes()
html=html.replace('href="assets/app-icon.svg"','href="data:image/svg+xml;base64,'+base64.b64encode(svg).decode()+'"')
html=re.sub(r'  <link rel="manifest" href="manifest.webmanifest">\n','',html)
html=html.replace('</head>','  <!-- HTML único offline: o arquivo GitHub Pages é o formato recomendado para estudo e salvamento no iPad. -->\n</head>')
out=Path('/mnt/data/MASTER_Clinica_Medica_II_v7_iPad_ABRIR.html')
out.write_text(html,encoding='utf-8')
print('Standalone',out,'bytes',out.stat().st_size,'inlined CSS',count,'JS',count2)
assert count>=5 and count2>=15
