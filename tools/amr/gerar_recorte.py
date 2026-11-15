#!/usr/bin/env python3
'''Reproduz somente três regras didáticas a partir da distribuição AMR fixada. Não executa R.'''
import csv,hashlib,io,json,pathlib,urllib.request
BASE='https://raw.githubusercontent.com/msberends/AMR/052edc476158f1bad7a3df3b0fc78c95eea8ace4/'
PATHS=['data-raw/breakpoints_eucast_raw.csv','data-raw/breakpoints_eucast.csv']
EXPECTED=['83998310e0ba31074c2f240082a2369a6346839699517f46f746f80e6daa8e9e','36ab89b187e48d87158ac48160ad941a7f99b36806c680cf7b233004d40a4c49']
ROOT=pathlib.Path(__file__).resolve().parents[2]
OUT=ROOT/'MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/amr-uro-data.js'
def string(v):return "'"+v.replace('\\','\\\\').replace("'",'\\u0027').replace('\n','\\n')+"'"
def js(v):
 if isinstance(v,str):return string(v)
 if isinstance(v,dict):return '{'+','.join(string(k)+':'+js(x) for k,x in v.items())+'}'
 if isinstance(v,list):return '['+','.join(js(x) for x in v)+']'
 return json.dumps(v)
def main():
 sources=[];sets=[]
 for path in PATHS:
  with urllib.request.urlopen(BASE+path,timeout=45) as response:raw=response.read()
  digest=hashlib.sha256(raw).hexdigest();assert digest==EXPECTED[len(sources)],'Hash de origem divergente'
  sources.append({'url':BASE+path,'sha256':digest})
  sets.append(list(csv.DictReader(io.StringIO(raw.decode()))))
 raw,clean=sets;rules=[]
 specs=[('nitro-cim','NIT','Nitrofurantoin (uncomplicated UTI only)','MIC','E. coli','B_ESCHR_COLI',64,64,None,['cistite_nao_complicada']),('nitro-disco','NIT','Nitrofurantoin (uncomplicated UTI only)','DISK','E. coli','B_ESCHR_COLI',11,11,100,['cistite_nao_complicada']),('cipro-cim','CIP','Ciprofloxacin (indications other than meningitis)','MIC','Enterobacterales','B_[ORD]_ENTRBCTR',0.25,0.5,None,['cistite_nao_complicada','pielonefrite'])]
 for id,drug,name,method,organism,mo,s,r,disk,contexts in specs:
  a=[x for x in raw if x['guideline']=='EUCAST 2026' and x['version']=='16.1' and x['sheet']=='Enterobacterales' and x['ab']==name and x['method']==method and x['mo']==organism]
  b=[x for x in clean if x['guideline']=='EUCAST 2026' and x['ref_tbl']=='Enterobacterales (file: Clinical Breakpoint Tables v. 16.1)' and x['ab']==drug and x['method']==method and x['mo']==mo and ('other than meningitis' in x['site'] if drug=='CIP' else x['site']=='uncomplicated UTI only')]
  assert len(a)==len(b)==1,(id,'combinação ambígua')
  assert a[0]['is_bracketed']=='FALSE' and a[0]['type']=='human' and b[0]['type']=='human' and b[0]['is_SDD']=='FALSE','Regra exige revisão específica'
  for row in [a[0],b[0]]:
   assert float(row['breakpoint_S'])==s and float(row['breakpoint_R'])==r
   assert row['note']=='NA','Há nota que precisa de revisão específica'
   if disk:assert row['disk_dose']=='100 mcg'
  rules.append({'id':id,'organism':'ecoli','drug':drug,'method':method,'unit':'mg/L' if method=='MIC' else 'mm','s':s,'r':r,'diskMicrograms':disk,'contexts':contexts,'sourceOrganism':organism,'scope':'E. coli apenas; sem extrapolação taxonômica','sourceRow':a[0]})
 payload={'standard':'EUCAST','year':2026,'revision':'16.1','source':'AMR-3.1.0','reviewed':'2026-11-15','license':'GPL-2','upstreamCommit':'052edc476158f1bad7a3df3b0fc78c95eea8ace4','primaryAccess':'Página original bloqueada pela política de rede; recorte conferido nos arquivos bruto e normalizado do AMR. Revisão docente pendente.','sources':sources,'rules':rules}
 OUT.write_text('/* Dados derivados de AMR 3.1.0, GPL-2. Licença e atribuição em tools/amr/.\n   Recorte documental de EUCAST 16.1; não é tabela BrCAST nem sistema clínico. */\nwindow.MASTER_AMR_URO='+js(payload)+';\n')
 print(json.dumps({'rules':len(rules),'output':str(OUT),'sources':sources},ensure_ascii=False))
if __name__=='__main__':main()
