/* Estudo aprofundado · Cirurgia · Revisão da P1: esôfago, estômago, vias biliares e fígado. Texto original. */
(function(){
const entries={
'ciresof_0':{
 updated:'2026-11',
 pretest:['Quais sinais de alarme indicam endoscopia na DRGE?','Qual exame é o padrão para confirmar refluxo quando a endoscopia é normal?','Quem tem indicação de fundoplicatura?','Qual o intervalo de vigilância do Barrett sem displasia?'],
 sections:[
  {h:'Diagnóstico da DRGE',p:[
   'Pirose e regurgitação são os sintomas típicos. Sem sinais de alarme, a prova terapêutica com inibidor de bomba de prótons por cerca de 8 semanas é aceitável. Endoscopia está indicada com disfagia, odinofagia, perda de peso, anemia, sangramento, vômitos persistentes, massa, falha do tratamento, e para rastrear Barrett em quem tem fatores de risco (homem, mais de 50 anos, branco, obesidade central, tabagismo, sintomas por muitos anos).',
   'A endoscopia classifica a esofagite pela classificação de Los Angeles (A a D). Pelo consenso de Lyon 2.0, esofagite LA B, C ou D, Barrett longo e estenose péptica confirmam DRGE. Com endoscopia normal, a pHmetria (ou impedanciopHmetria) de 24 horas fora do IBP é o exame que confirma o refluxo, e é obrigatória antes de cirurgia nesses casos. A manometria antes da fundoplicatura exclui acalasia e aperistalse.']},
  {h:'Tratamento',list:[
   '<strong>Medidas:</strong> perder peso, elevar a cabeceira, evitar refeições 2 a 3 horas antes de deitar e alimentos que pioram os sintomas.',
   '<strong>IBP:</strong> 8 semanas e depois a menor dose eficaz.',
   '<strong>Fundoplicatura laparoscópica:</strong> paciente com refluxo comprovado que responde ao IBP mas não quer ou não tolera uso contínuo, regurgitação volumosa persistente, complicações ou hérnia hiatal grande. Nissen (360°) é a clássica; Toupet (270°, parcial) reduz disfagia, preferida quando a motilidade é fraca.',
   'Quem não responde ao IBP raramente melhora com cirurgia: rever o diagnóstico.']},
  {h:'Esôfago de Barrett',p:[
   'Substituição do epitélio escamoso distal por epitélio colunar com metaplasia intestinal (células caliciformes), a partir de 1 cm acima da junção esofagogástrica. É a lesão precursora do adenocarcinoma de esôfago.'],
   table:{head:['Achado','Conduta'],rows:[
    ['Sem displasia, menos de 3 cm','Endoscopia a cada 5 anos'],
    ['Sem displasia, 3 cm ou mais','Endoscopia a cada 3 anos'],
    ['Displasia de baixo grau confirmada por segundo patologista','Ablação por radiofrequência (ou vigilância de 6 meses)'],
    ['Displasia de alto grau ou carcinoma intramucoso','Ressecção endoscópica das lesões visíveis e ablação do restante'],
    ['Todos','IBP contínuo']]}}
 ],
 flow:{title:'Pirose e regurgitação',nodes:[
  {k:'start',t:'Sintomas típicos de refluxo'},
  {k:'ask',t:'Sinais de alarme ou fatores de risco para Barrett?',yes:'Endoscopia',no:'IBP por 8 semanas e medidas'},
  {k:'ask',t:'Resposta ao IBP?',yes:'Reduzir para a menor dose; cirurgia se não quiser uso contínuo',no:'Endoscopia e pHmetria fora do IBP'},
  {k:'ask',t:'Refluxo comprovado e indicação cirúrgica?',yes:'Manometria e fundoplicatura',no:'Rever diagnóstico: hipersensibilidade, pirose funcional'},
  {k:'do',t:'Barrett: vigilância conforme extensão e displasia'},
  {k:'end',t:'Displasia: tratamento endoscópico'}]},
 reasoning:['Quem responde ao IBP é o melhor candidato à fundoplicatura.','Manometria antes de operar evita fazer Nissen em acalasia.','Barrett precisa de metaplasia intestinal na biópsia.'],
 mnemonics:[{n:'LA B, C, D',t:'Esofagite que confirma DRGE pelo consenso de Lyon.'},{n:'3 e 5',t:'Barrett longo vigia a cada 3 anos; curto, a cada 5.'},{n:'Nissen 360, Toupet 270',t:'Fundoplicatura total e parcial.'}],
 pitfalls:['Operar paciente sem refluxo comprovado.','Fazer pHmetria em uso de IBP para diagnóstico.','Chamar de Barrett epitélio colunar sem metaplasia intestinal.'],
 recall:[
  {q:'Cite quatro sinais de alarme da DRGE.',a:'Disfagia, odinofagia, perda de peso, anemia, sangramento, vômitos persistentes.'},
  {q:'Exame que confirma refluxo com endoscopia normal?',a:'pHmetria de 24 horas (ou impedanciopHmetria) fora do IBP.'},
  {q:'Exame obrigatório antes da fundoplicatura?',a:'Manometria esofágica.'},
  {q:'Definição de Barrett?',a:'Epitélio colunar com metaplasia intestinal a partir de 1 cm acima da junção esofagogástrica.'},
  {q:'Conduta no Barrett com displasia de alto grau?',a:'Ressecção endoscópica e ablação.'}],
 practice:['Monte o algoritmo de um paciente de 55 anos, obeso, com pirose há 10 anos.'],
 refs:[
  {t:'Gyawali CP, et al. Updates to the modern diagnosis of GERD: Lyon consensus 2.0. Gut. 2024.',q:'Lyon consensus 2.0 modern diagnosis of GERD Gut 2024'},
  {t:'Katz PO, et al. ACG clinical guideline for the diagnosis and management of gastroesophageal reflux disease. Am J Gastroenterol. 2022.',q:'ACG clinical guideline GERD 2022 Katz'},
  {t:'Weusten BLAM, et al. Diagnosis and management of Barrett esophagus: ESGE guideline. Endoscopy. 2023.',q:'ESGE guideline Barrett esophagus 2023'}],
 note:'Consenso de Lyon 2.0, diretriz americana de DRGE e diretriz europeia de Barrett.'
},
'ciresof_1':{
 updated:'2026-11',
 pretest:['Qual exame é o padrão-ouro no diagnóstico da acalasia?','Qual o aspecto típico no esofagograma?','Qual subtipo de Chicago responde melhor ao tratamento?','Onde se forma o divertículo de Zenker?'],
 sections:[
  {h:'Acalasia',p:[
   'Perda dos neurônios inibitórios do plexo mioentérico: o esfíncter inferior não relaxa e o corpo perde a peristalse. No Brasil, a doença de Chagas causa quadro idêntico (megaesôfago chagásico). Disfagia para sólidos e líquidos desde o início, regurgitação de alimento não digerido, perda de peso e aspiração.',
   'Esofagograma: esôfago dilatado com afilamento distal em bico de pássaro. Endoscopia é obrigatória para excluir pseudoacalasia, isto é, câncer da cárdia (pensar nela em idoso, com história curta e emagrecimento rápido). A manometria de alta resolução é o padrão-ouro: pressão de relaxamento integrada elevada e ausência de peristalse.'],
   table:{head:['Chicago 4.0','Padrão','Melhor tratamento'],rows:[
    ['Tipo I','Clássica, sem pressurização','Miotomia de Heller ou POEM'],
    ['Tipo II','Pressurização panesofágica','Responde bem a qualquer método'],
    ['Tipo III','Espástica, contrações prematuras','POEM, que permite miotomia longa']]}},
  {h:'Tratamento',list:[
   '<strong>Miotomia de Heller laparoscópica com fundoplicatura parcial</strong> (Dor ou Toupet, para evitar refluxo).',
   '<strong>POEM</strong> (miotomia endoscópica peroral): eficácia semelhante, mais refluxo depois.',
   '<strong>Dilatação pneumática:</strong> eficaz, pode precisar de repetição, risco de perfuração.',
   '<strong>Toxina botulínica:</strong> efeito temporário, para pacientes sem condição para os demais.',
   '<strong>Megaesôfago avançado</strong> (grau IV de Rezende, dolicomegaesôfago): esofagectomia pode ser necessária.',
   'Classificação de Rezende para o chagásico, pelo diâmetro no esofagograma: I até 4 cm; II de 4 a 7 cm; III de 7 a 10 cm; IV acima de 10 cm ou dolicomegaesôfago.']},
  {h:'Divertículos',table:{head:['Tipo','Mecanismo e local','Quadro e conduta'],rows:[
   ['Zenker','Pulsão; triângulo de Killian, entre o tireofaríngeo e o cricofaríngeo, na parede posterior','Idoso com disfagia alta, halitose, regurgitação de alimento antigo, aspiração. Diagnóstico por esofagograma (endoscopia com cuidado, risco de perfuração). Tratamento: septotomia endoscópica ou cirurgia com miotomia do cricofaríngeo'],
   ['Médio-esofágico','Tração, por linfonodos inflamados (tuberculose, histoplasmose)','Geralmente assintomático; observar'],
   ['Epifrênico','Pulsão, acima do diafragma, associado a distúrbio motor','Tratar o distúrbio motor; diverticulectomia com miotomia se sintomático']]}}
 ],
 flow:{title:'Disfagia para sólidos e líquidos',nodes:[
  {k:'start',t:'Disfagia para sólidos e líquidos com regurgitação'},
  {k:'do',t:'Endoscopia para excluir câncer e esofagite'},
  {k:'do',t:'Esofagograma e manometria de alta resolução'},
  {k:'ask',t:'Relaxamento ausente e aperistalse?',yes:'Acalasia: definir tipo de Chicago e sorologia para Chagas',no:'Outro distúrbio motor'},
  {k:'ask',t:'Tipo III?',yes:'POEM',no:'Heller com fundoplicatura parcial, POEM ou dilatação'},
  {k:'end',t:'Idoso com perda de peso rápida: excluir pseudoacalasia'}]},
 reasoning:['Disfagia que começa com líquidos e sólidos sugere motilidade; só sólidos e progressiva sugere obstrução mecânica.','Bico de pássaro no idoso emagrecido pode ser câncer.','Heller sem fundoplicatura gera refluxo.'],
 mnemonics:[{n:'Bico de pássaro',t:'Acalasia no esofagograma.'},{n:'Killian no Zenker',t:'Triângulo entre tireofaríngeo e cricofaríngeo.'},{n:'Tipo II é o bom',t:'Melhor resposta ao tratamento.'}],
 pitfalls:['Indicar miotomia sem endoscopia.','Fazer endoscopia descuidada no Zenker.','Esquecer a fundoplicatura parcial após Heller.'],
 recall:[
  {q:'Padrão-ouro diagnóstico da acalasia?',a:'Manometria de alta resolução.'},
  {q:'Cirurgia clássica da acalasia?',a:'Miotomia de Heller laparoscópica com fundoplicatura parcial.'},
  {q:'Subtipo com melhor resposta?',a:'Tipo II.'},
  {q:'Onde se forma o divertículo de Zenker?',a:'No triângulo de Killian, na parede posterior da transição faringoesofágica.'},
  {q:'Grau IV de Rezende?',a:'Diâmetro acima de 10 cm ou dolicomegaesôfago.'}],
 practice:['Diferencie acalasia de pseudoacalasia em quatro pontos.'],
 refs:[
  {t:'Yadlapati R, et al. Esophageal motility disorders on high-resolution manometry: Chicago classification version 4.0. Neurogastroenterol Motil. 2021.',q:'Chicago classification version 4.0 esophageal motility'},
  {t:'Vaezi MF, et al. ACG clinical guidelines: diagnosis and management of achalasia. Am J Gastroenterol. 2020.',q:'ACG clinical guidelines diagnosis management achalasia 2020'}],
 note:'Classificação de Chicago 4.0 e diretriz americana de acalasia.'
},
'ciresof_2':{
 updated:'2026-11',
 pretest:['Quais as diferenças entre carcinoma escamoso e adenocarcinoma de esôfago?','Qual é o sintoma principal?','Qual exame define T e N?','Qual o tratamento do tumor localmente avançado?'],
 sections:[
  {h:'Dois tumores diferentes',table:{head:['','Carcinoma escamoso','Adenocarcinoma'],rows:[
   ['Fatores','Tabagismo, álcool, bebidas muito quentes, acalasia, estenose cáustica, tilose','DRGE, Barrett, obesidade, tabagismo'],
   ['Local','Terço médio e superior','Terço distal e junção esofagogástrica'],
   ['Epidemiologia','Mais comum no mundo e no Brasil','Crescente no ocidente']]},
   after:'O sintoma típico é disfagia progressiva, primeiro para sólidos e depois para líquidos, com emagrecimento. Rouquidão sugere invasão do nervo laríngeo recorrente; tosse ao deglutir sugere fístula traqueoesofágica.'},
  {h:'Diagnóstico e estadiamento',list:['Endoscopia com biópsia.','Tomografia de tórax e abdome; PET-CT para metástases ocultas.','Ecoendoscopia para profundidade (T) e linfonodos (N).','Broncoscopia em tumores do terço superior e médio.']},
  {h:'Tratamento',list:[
   '<strong>Precoce (T1a, mucosa):</strong> ressecção endoscópica.',
   '<strong>Localmente avançado (T2 ou mais, ou N positivo):</strong> neoadjuvância seguida de esofagectomia. Quimiorradioterapia (esquema CROSS) para escamoso e adenocarcinoma; quimioterapia perioperatória (FLOT) é alternativa no adenocarcinoma. Imunoterapia adjuvante se houver doença residual após neoadjuvância.',
   '<strong>Escamoso do esôfago cervical:</strong> quimiorradioterapia definitiva, evitando cirurgia mutiladora.',
   '<strong>Esofagectomia:</strong> transtorácica (Ivor Lewis) ou trans-hiatal; reconstrução com tubo gástrico. Complicação temida: fístula da anastomose.',
   '<strong>Paliação da disfagia:</strong> prótese esofágica ou radioterapia.']}
 ],
 flow:{title:'Disfagia progressiva',nodes:[
  {k:'start',t:'Disfagia progressiva para sólidos e emagrecimento'},
  {k:'do',t:'Endoscopia com biópsia'},
  {k:'do',t:'TC, PET-CT e ecoendoscopia'},
  {k:'ask',t:'Metástase?',yes:'Tratamento paliativo, prótese e quimioterapia',no:'Estadiar T e N'},
  {k:'ask',t:'T1a?',yes:'Ressecção endoscópica',no:'Neoadjuvância e esofagectomia'},
  {k:'end',t:'Escamoso cervical: quimiorradioterapia definitiva'}]},
 reasoning:['Escamoso no meio, adeno embaixo.','Disfagia progressiva de sólidos para líquidos em idoso emagrecido: câncer até prova em contrário.','A ecoendoscopia é o melhor exame para T e N.'],
 mnemonics:[{n:'Escamoso: fumo e álcool; Adeno: refluxo',t:'Fatores de risco por tipo.'},{n:'CROSS',t:'Quimiorradioterapia neoadjuvante antes da esofagectomia.'},{n:'Sólido antes de líquido',t:'Disfagia mecânica progressiva.'}],
 pitfalls:['Operar direto um T3N1 sem neoadjuvância.','Esquecer broncoscopia no tumor de terço médio.','Atribuir disfagia nova em idoso a refluxo sem endoscopia.'],
 recall:[
  {q:'Tipo histológico mais comum no Brasil?',a:'Carcinoma escamoso.'},
  {q:'Principal fator do adenocarcinoma?',a:'Esôfago de Barrett por DRGE crônica.'},
  {q:'Exame para T e N?',a:'Ecoendoscopia.'},
  {q:'Tratamento do T3N1 sem metástases?',a:'Neoadjuvância seguida de esofagectomia.'},
  {q:'Tratamento do escamoso cervical?',a:'Quimiorradioterapia definitiva.'}],
 practice:['Compare os dois tipos histológicos em fatores, local e tratamento.'],
 refs:[
  {t:'van Hagen P, et al. Preoperative chemoradiotherapy for esophageal or junctional cancer (CROSS). N Engl J Med. 2012.',q:'CROSS preoperative chemoradiotherapy esophageal junctional cancer NEJM 2012'},
  {t:'Obermannová R, et al. Oesophageal cancer: ESMO clinical practice guideline. Ann Oncol. 2022.',q:'ESMO clinical practice guideline oesophageal cancer 2022'}],
 note:'Estudo CROSS e diretriz da ESMO.'
},
'cirestom_0':{
 updated:'2026-11',
 pretest:['Qual escore define quem pode ter alta na hemorragia digestiva alta?','Quais estigmas de Forrest pedem terapia endoscópica?','Qual artéria sangra na úlcera da parede posterior do bulbo?','Que distúrbio ácido-base aparece na estenose pilórica?'],
 sections:[
  {h:'Hemorragia por úlcera',list:[
   '<strong>Estratificação:</strong> escore de Glasgow-Blatchford. Pontuação 0 ou 1 permite manejo ambulatorial.',
   '<strong>Reanimação:</strong> transfusão restritiva, alvo de hemoglobina em torno de 7 g/dL (8 g/dL em cardiopatas).',
   '<strong>IBP</strong> intravenoso em dose alta e <strong>endoscopia em até 24 horas</strong> após estabilização (mais cedo se instável).',
   '<strong>Forrest Ia</strong> (jato), <strong>Ib</strong> (babando), <strong>IIa</strong> (vaso visível) e <strong>IIb</strong> (coágulo aderido, remover e avaliar): terapia endoscópica, preferencialmente combinada. IIc (hematina) e III (base limpa): só IBP.',
   '<strong>Ressangramento:</strong> segunda endoscopia. Se falhar, angioembolização ou cirurgia. Úlcera da parede posterior do bulbo sangra pela artéria gastroduodenal; cirurgicamente, sutura do vaso.',
   'Erradicar Helicobacter pylori e suspender anti-inflamatórios.']},
  {h:'Obstrução pilórica',p:[
   'Cicatrização de úlceras próximas ao piloro ou neoplasia. Vômitos de alimentos ingeridos horas antes, sem bile, distensão epigástrica e emagrecimento. Os vômitos geram alcalose metabólica hipoclorêmica e hipocalêmica; o rim, tentando reter sódio, troca por hidrogênio e produz acidúria paradoxal.',
   'Tratamento: sonda nasogástrica, reposição com soro fisiológico e potássio, IBP, endoscopia para excluir câncer, dilatação endoscópica com balão e, se falhar, cirurgia (antrectomia ou gastrojejunostomia).']},
  {h:'Classificação de Johnson e cirurgia da úlcera',table:{head:['Tipo','Local','Ácido','Cirurgia clássica'],rows:[
   ['I','Pequena curvatura, na incisura','Normal ou baixo','Gastrectomia distal com Billroth I'],
   ['II','Corpo gástrico mais úlcera duodenal','Alto','Antrectomia com vagotomia'],
   ['III','Pré-pilórica','Alto','Antrectomia com vagotomia'],
   ['IV','Pequena curvatura alta, perto da cárdia','Baixo','Gastrectomia com reconstrução em Y de Roux'],
   ['V','Qualquer local, por anti-inflamatório','Variável','Suspender anti-inflamatório']]},
   after:'Hoje a cirurgia eletiva da úlcera é rara; as cirurgias são indicadas pelas complicações. Complicações pós-gastrectomia: dumping precoce (30 minutos, sintomas vasomotores e diarreia por carga hiperosmolar), dumping tardio (2 a 3 horas, hipoglicemia reativa), síndrome da alça aferente (após Billroth II), gastrite alcalina por refluxo biliar (tratada com reconstrução em Y de Roux) e deficiências de ferro e vitamina B12.'}
 ],
 flow:{title:'Hemorragia digestiva alta por úlcera',nodes:[
  {k:'start',t:'Hematêmese ou melena'},
  {k:'do',t:'Reanimação, transfusão restritiva, IBP intravenoso, Glasgow-Blatchford'},
  {k:'do',t:'Endoscopia em até 24 horas'},
  {k:'ask',t:'Forrest Ia, Ib, IIa ou IIb?',yes:'Terapia endoscópica combinada e IBP em dose alta',no:'IBP e alimentação precoce'},
  {k:'ask',t:'Ressangrou?',yes:'Segunda endoscopia; se falhar, angioembolização ou cirurgia',no:'Erradicar H. pylori'},
  {k:'end',t:'Suspender anti-inflamatórios'}]},
 reasoning:['Vaso visível é alto risco mesmo sem sangrar no momento.','Vômito de estase com alcalose hipoclorêmica: estenose pilórica.','Bulbo posterior: gastroduodenal.'],
 mnemonics:[{n:'Forrest I e IIa, IIb tratam',t:'Jato, babando, vaso visível e coágulo: terapia endoscópica.'},{n:'Alcalose com urina ácida',t:'Acidúria paradoxal da estenose pilórica.'},{n:'Dumping 30 e 180',t:'Precoce em 30 minutos, tardio em 2 a 3 horas.'}],
 pitfalls:['Transfundir até hemoglobina 10 em todos.','Tratar endoscopicamente úlcera de base limpa.','Repor só soro glicosado na estenose pilórica.'],
 recall:[
  {q:'Glasgow-Blatchford de quanto permite alta?',a:'0 ou 1.'},
  {q:'O que é Forrest IIa?',a:'Vaso visível não sangrante.'},
  {q:'Artéria da úlcera de parede posterior do bulbo?',a:'Gastroduodenal.'},
  {q:'Distúrbio da estenose pilórica?',a:'Alcalose metabólica hipoclorêmica e hipocalêmica com acidúria paradoxal.'},
  {q:'Quando ocorre o dumping tardio?',a:'2 a 3 horas após a refeição, por hipoglicemia reativa.'}],
 practice:['Classifique em Forrest e defina a conduta: úlcera com coágulo aderido, úlcera com base limpa, úlcera com sangramento em babação.'],
 refs:[
  {t:'Gralnek IM, et al. Endoscopic diagnosis and management of nonvariceal upper gastrointestinal hemorrhage: ESGE guideline update 2021. Endoscopy. 2021.',q:'ESGE guideline nonvariceal upper gastrointestinal hemorrhage 2021'},
  {t:'Laine L, et al. ACG clinical guideline: upper gastrointestinal and ulcer bleeding. Am J Gastroenterol. 2021.',q:'ACG clinical guideline upper gastrointestinal and ulcer bleeding 2021'}],
 note:'Diretrizes europeia e americana de hemorragia digestiva alta.'
},
'cirestom_1':{
 updated:'2026-11',
 pretest:['Quais são os tipos de Lauren?','Qual o Borrmann mais comum?','O que é câncer gástrico precoce?','Qual linfadenectomia é o padrão?'],
 sections:[
  {h:'Classificações',table:{head:['Lauren','Perfil'],rows:[
   ['Intestinal','Idosos, homens, H. pylori, gastrite atrófica e metaplasia; distal; melhor prognóstico'],
   ['Difuso','Jovens, células em anel de sinete, sem lesão precursora clara, pode ser hereditário (CDH1); linite plástica; pior prognóstico']]},
   after:'Borrmann (avançado): I polipoide; II ulcerado com bordas nítidas; III ulcerado e infiltrativo (o mais comum); IV infiltrativo difuso (linite plástica). Câncer gástrico precoce é o que se limita à mucosa ou submucosa, independentemente de linfonodos.'},
  {h:'Clínica e sinais de disseminação',list:['Dispepsia, saciedade precoce, perda de peso, anemia, vômitos.','<strong>Virchow:</strong> linfonodo supraclavicular esquerdo.','<strong>Irmã Maria José:</strong> nódulo umbilical.','<strong>Blumer:</strong> prateleira retal no fundo de saco ao toque.','<strong>Krukenberg:</strong> metástase ovariana.','<strong>Paraneoplásicas:</strong> acantose nigricans, sinal de Leser-Trélat, Trousseau.']},
  {h:'Estadiamento e tratamento',list:[
   'Endoscopia com biópsia; tomografia de tórax, abdome e pelve; ecoendoscopia em lesões precoces; laparoscopia de estadiamento em tumores T3 ou T4 para excluir carcinomatose oculta.',
   '<strong>Precoce com critérios favoráveis</strong> (intramucoso, bem diferenciado, sem úlcera, tamanho limitado): dissecção endoscópica da submucosa.',
   '<strong>Demais ressecáveis:</strong> gastrectomia subtotal (distal) quando a margem permite, total para tumores proximais ou difusos extensos, com linfadenectomia D2 (pelo menos 16 linfonodos para estadiar, idealmente 25 ou mais).',
   '<strong>T2 ou mais, ou N positivo:</strong> quimioterapia perioperatória (FLOT) no ocidente.',
   '<strong>Reconstrução:</strong> Billroth II ou Y de Roux na subtotal; Y de Roux na total. Reposição de vitamina B12 após gastrectomia total.']}
 ],
 flow:{title:'Câncer gástrico',nodes:[
  {k:'start',t:'Dispepsia com perda de peso ou anemia'},
  {k:'do',t:'Endoscopia com biópsia'},
  {k:'do',t:'TC; laparoscopia se T3 ou T4'},
  {k:'ask',t:'Metástase ou carcinomatose?',yes:'Quimioterapia paliativa',no:'Avaliar extensão'},
  {k:'ask',t:'Precoce com critérios endoscópicos?',yes:'Dissecção endoscópica da submucosa',no:'FLOT perioperatório e gastrectomia com D2'},
  {k:'end',t:'Gastrectomia total: vitamina B12 para sempre'}]},
 reasoning:['Precoce é definido pela profundidade, não pelos linfonodos.','Linite plástica é Borrmann IV e Lauren difuso.','A TC pode não demonstrar implantes peritoneais pequenos: avaliar laparoscopia de estadiamento no cenário indicado.'],
 mnemonics:[{n:'Intestinal idoso, difuso jovem',t:'Lauren.'},{n:'Borrmann III',t:'O mais comum.'},{n:'Virchow, Maria José, Blumer, Krukenberg',t:'Pescoço, umbigo, reto, ovário.'}],
 pitfalls:['Definir câncer precoce pela ausência de linfonodos.','Operar T4 sem laparoscopia de estadiamento.','Esquecer vitamina B12 após gastrectomia total.'],
 recall:[
  {q:'O que é câncer gástrico precoce?',a:'Limitado à mucosa ou submucosa, independentemente de linfonodos.'},
  {q:'Borrmann mais comum?',a:'III.'},
  {q:'Linfadenectomia padrão?',a:'D2.'},
  {q:'O que é o linfonodo de Virchow?',a:'Linfonodo supraclavicular esquerdo metastático.'},
  {q:'Quimioterapia perioperatória padrão no ocidente?',a:'FLOT.'}],
 practice:['Compare Lauren intestinal e difuso em cinco itens.'],
 refs:[
  {t:'Al-Batran SE, et al. Perioperative chemotherapy with FLOT versus ECF/ECX for resectable gastric or gastro-oesophageal junction adenocarcinoma (FLOT4). Lancet. 2019.',q:'FLOT4 perioperative chemotherapy gastric cancer Lancet 2019'},
  {t:'Japanese Gastric Cancer Association. Japanese gastric cancer treatment guidelines 2021 (6th edition). Gastric Cancer. 2023.',q:'Japanese gastric cancer treatment guidelines 2021 6th edition'}],
 note:'Estudo FLOT4 e diretriz japonesa de câncer gástrico.'
},
'cirvb_0':{
 updated:'2026-11',
 pretest:['Qual o tipo de cálculo mais comum?','Quando indicar colecistectomia em paciente assintomático?','O que é a visão crítica de segurança?','O que é a síndrome de Mirizzi?'],
 sections:[
  {h:'Cálculos e quadro',p:[
   'O cálculo de colesterol é o mais comum, ligado a sexo feminino, obesidade, idade de 40 anos ou mais, gestação, perda de peso rápida e estrogênio. Pigmentares pretos aparecem na hemólise crônica e na cirrose; pigmentares castanhos se formam na via biliar infectada.',
   'Cólica biliar: dor no hipocôndrio direito ou epigástrio após refeição gordurosa, durando menos de 6 horas, sem febre. Durando mais, com febre e Murphy, é colecistite. A ultrassonografia é o exame de escolha.']},
  {h:'Quem opera',list:[
   '<strong>Sintomáticos:</strong> colecistectomia laparoscópica.',
   '<strong>Assintomáticos, em situações de maior risco:</strong> vesícula em porcelana, cálculo maior que cerca de 2,5 a 3 cm, pólipo de 10 mm ou mais (ou menor com fatores de risco), anemia hemolítica (como a falciforme), anomalia da junção pancreatobiliar e populações de alto risco para câncer de vesícula.',
   '<strong>Pólipo de vesícula:</strong> menor que 6 mm sem fatores, vigilância; de 6 a 9 mm, depende dos fatores de risco; 10 mm ou mais, colecistectomia.']},
  {h:'Segurança na colecistectomia',p:[
   'A lesão iatrogênica da via biliar é a complicação mais grave. A visão crítica de segurança (Strasberg) exige três condições antes de clipar: triângulo hepatocístico livre de gordura e tecido fibroso, terço inferior da vesícula separado do leito hepático e apenas duas estruturas entrando na vesícula (ducto e artéria císticos). Se não for possível, considerar colecistectomia subtotal ou conversão.',
   'Síndrome de Mirizzi: cálculo impactado no infundíbulo ou no cístico comprime o ducto hepático comum, causando icterícia; pode evoluir para fístula colecistobiliar. Tem alto risco de lesão da via biliar na cirurgia.']}
 ],
 flow:{title:'Colelitíase',nodes:[
  {k:'start',t:'Cálculo na ultrassonografia'},
  {k:'ask',t:'Sintomas biliares?',yes:'Colecistectomia laparoscópica',no:'Avaliar situações de risco'},
  {k:'ask',t:'Porcelana, cálculo grande, pólipo de 10 mm ou mais, hemólise?',yes:'Colecistectomia',no:'Observação'},
  {k:'ask',t:'Enzimas canaliculares altas ou colédoco dilatado?',yes:'Estratificar coledocolitíase',no:'Seguir'},
  {k:'do',t:'Na cirurgia: visão crítica de segurança antes de clipar'},
  {k:'end',t:'Sem visão crítica: subtotal ou conversão'}]},
 reasoning:['Assintomático não opera, salvo risco de câncer ou complicação grave.','Visão crítica primeiro, clipes depois.','Icterícia com cálculo no infundíbulo: Mirizzi.'],
 mnemonics:[{n:'4 F',t:'Female, fat, forty, fertile: perfil do cálculo de colesterol.'},{n:'Duas e só duas',t:'Visão crítica: só ducto e artéria císticos entram na vesícula.'},{n:'Porcelana, pólipo, pedra grande',t:'Indicações em assintomáticos.'}],
 pitfalls:['Operar todo cálculo assintomático.','Clipar sem visão crítica.','Confundir cólica biliar com colecistite.'],
 recall:[
  {q:'Cálculo biliar mais comum?',a:'De colesterol.'},
  {q:'Pólipo de vesícula que indica cirurgia?',a:'10 mm ou mais.'},
  {q:'Três critérios da visão crítica de segurança?',a:'Triângulo hepatocístico limpo, terço inferior da vesícula separado do leito e apenas duas estruturas entrando na vesícula.'},
  {q:'O que é síndrome de Mirizzi?',a:'Compressão do ducto hepático comum por cálculo no infundíbulo ou no cístico.'},
  {q:'Cálculo pigmentar preto aparece em quê?',a:'Hemólise crônica e cirrose.'}],
 practice:['Liste as indicações de colecistectomia em assintomáticos.'],
 refs:[
  {t:'European Association for the Study of the Liver. EASL clinical practice guidelines on the prevention, diagnosis and treatment of gallstones. J Hepatol. 2016.',q:'EASL clinical practice guidelines gallstones 2016'},
  {t:'Strasberg SM, et al. An analysis of the problem of biliary injury during laparoscopic cholecystectomy. J Am Coll Surg. 1995.',q:'Strasberg analysis biliary injury laparoscopic cholecystectomy 1995'},
  {t:'Foley KG, et al. Management and follow-up of gallbladder polyps: updated joint guidelines. Eur Radiol. 2022.',q:'management follow-up gallbladder polyps updated joint guidelines 2022'}],
 note:'Diretriz europeia de litíase e diretriz de pólipos de vesícula.'
},
'cirvb_1':{
 updated:'2026-11',
 pretest:['O que define alto risco de coledocolitíase?','Qual exame no risco intermediário?','Quando fazer a colecistectomia após CPRE?','Qual a diferença entre cálculo primário e secundário do colédoco?'],
 sections:[
  {h:'Estratificação de risco (ASGE 2019)',table:{head:['Risco','Critérios','Conduta'],rows:[
   ['Alto','Cálculo no colédoco visto em imagem, ou colangite, ou bilirrubina total acima de 4 mg/dL com colédoco dilatado','CPRE pré-operatória (ou exploração cirúrgica da via biliar)'],
   ['Intermediário','Provas hepáticas alteradas, idade acima de 55 anos ou colédoco dilatado na ultrassonografia','Colangiorressonância ou ecoendoscopia (ou colangiografia intraoperatória)'],
   ['Baixo','Nenhum dos anteriores','Colecistectomia sem investigação adicional']]}},
  {h:'Conceitos',list:['Cálculo secundário (o mais comum) vem da vesícula. Primário forma-se no próprio colédoco, por estase ou infecção, e é castanho.','A CPRE é diagnóstica e terapêutica (papilotomia e extração), mas tem risco de pancreatite. Por isso não se usa só para diagnosticar quando a colangiorressonância resolve.','Após a CPRE, retirar a vesícula na mesma internação reduz eventos biliares.','Cálculo grande ou múltiplo: litotripsia mecânica, a laser, ou exploração cirúrgica.']}
 ],
 flow:{title:'Suspeita de coledocolitíase',nodes:[
  {k:'start',t:'Colelitíase com provas hepáticas alteradas ou icterícia'},
  {k:'ask',t:'Colangite, cálculo visto no colédoco ou bilirrubina acima de 4 com colédoco dilatado?',yes:'Alto risco: CPRE',no:'Seguir'},
  {k:'ask',t:'Provas alteradas, idade acima de 55 ou colédoco dilatado?',yes:'Intermediário: colangiorressonância ou ecoendoscopia',no:'Baixo risco: colecistectomia'},
  {k:'ask',t:'Cálculo confirmado?',yes:'CPRE com extração',no:'Colecistectomia'},
  {k:'do',t:'Cálculo grande ou múltiplo: litotripsia ou exploração cirúrgica da via biliar'},
  {k:'end',t:'Colecistectomia na mesma internação após a CPRE'}]},
 reasoning:['CPRE é terapêutica; colangiorressonância é diagnóstica.','Alto risco vai direto para CPRE; intermediário confirma antes.','Vesícula fica para trás se não for retirada: recidiva.'],
 mnemonics:[{n:'4 e 6',t:'Bilirrubina acima de 4 com colédoco acima de cerca de 6 mm: alto risco.'},{n:'Ver, inflamar, ictérico',t:'Alto risco: ver o cálculo, colangite ou bilirrubina alta com dilatação.'},{n:'Mesma internação',t:'Colecistectomia depois da CPRE.'}],
 pitfalls:['CPRE diagnóstica no risco intermediário.','Alta após CPRE sem programar colecistectomia.','Confundir cálculo primário com secundário.'],
 recall:[
  {q:'Critérios de alto risco de coledocolitíase?',a:'Cálculo visto no colédoco, colangite, ou bilirrubina acima de 4 mg/dL com colédoco dilatado.'},
  {q:'Exame no risco intermediário?',a:'Colangiorressonância ou ecoendoscopia.'},
  {q:'Complicação mais comum da CPRE?',a:'Pancreatite.'},
  {q:'Cálculo de colédoco mais comum?',a:'Secundário, vindo da vesícula.'},
  {q:'Quando retirar a vesícula após CPRE?',a:'Na mesma internação.'}],
 practice:['Estratifique: 60 anos, colelitíase, fosfatase alcalina alta, colédoco de 5 mm, bilirrubina 2.'],
 refs:[
  {t:'ASGE Standards of Practice Committee. ASGE guideline on the role of endoscopy in the evaluation and management of choledocholithiasis. Gastrointest Endosc. 2019.',q:'ASGE guideline role of endoscopy evaluation management choledocholithiasis 2019'},
  {t:'Manes G, et al. Endoscopic management of common bile duct stones: ESGE guideline. Endoscopy. 2019.',q:'ESGE guideline endoscopic management common bile duct stones 2019'}],
 note:'Diretrizes americana e europeia de endoscopia.'
},
'cirvb_2':{
 updated:'2026-11',
 pretest:['Qual o principal fator de risco de colangiocarcinoma no ocidente?','O que é tumor de Klatskin?','Como se classifica pela Bismuth-Corlette?','Conduta no câncer de vesícula T1b achado após colecistectomia?'],
 sections:[
  {h:'Colangiocarcinoma',p:[
   'Fatores de risco: colangite esclerosante primária (o principal no ocidente), cistos de colédoco, hepatolitíase e parasitas hepáticos (no oriente). Pela localização: intra-hepático, peri-hilar e distal. O peri-hilar (tumor de Klatskin) é o mais comum.',
   'Clínica: icterícia obstrutiva indolor, prurido e emagrecimento. No Klatskin, a obstrução é acima do cístico, então a vesícula fica murcha (Courvoisier negativo), ao contrário dos tumores distais.'],
   table:{head:['Bismuth-Corlette','Extensão'],rows:[['I','Ducto hepático comum, abaixo da confluência'],['II','Atinge a confluência'],['IIIa','Estende-se ao ducto hepático direito'],['IIIb','Estende-se ao ducto hepático esquerdo'],['IV','Ambos os ductos ou multifocal']]},
   after:'Diagnóstico: colangiorressonância, tomografia, CA 19-9, escovado ou biópsia. Tratamento curativo: ressecção da via biliar com hepatectomia conforme a extensão, e transplante em casos selecionados em centros especializados. Paliação: drenagem biliar endoscópica ou percutânea e quimioterapia.'},
  {h:'Câncer de vesícula',list:['Mulheres idosas, cálculos grandes, vesícula em porcelana, pólipo de 10 mm ou mais, anomalia da junção pancreatobiliar.','Frequentemente achado na peça de colecistectomia.','<strong>T1a</strong> (até a lâmina própria) com margem livre: colecistectomia basta.','<strong>T1b ou mais:</strong> reoperação com ressecção do leito hepático (segmentos IVb e V) e linfadenectomia do pedículo, se não houver doença à distância.','Tumor avançado tem prognóstico ruim.']},
  {h:'Cistos de colédoco',p:['Dilatações congênitas da via biliar (Todani I, fusiforme, é o mais comum), com risco de colangite, pancreatite e colangiocarcinoma. Tratamento: ressecção do cisto com hepaticojejunostomia em Y de Roux, não apenas drenagem.']}
 ],
 flow:{title:'Icterícia obstrutiva sem cálculo',nodes:[
  {k:'start',t:'Icterícia indolor, via biliar dilatada'},
  {k:'do',t:'Colangiorressonância, TC e CA 19-9'},
  {k:'ask',t:'Obstrução na confluência hepática?',yes:'Klatskin: classificar Bismuth-Corlette',no:'Distal: pensar em pâncreas, ampola ou colangiocarcinoma distal'},
  {k:'ask',t:'Ressecável?',yes:'Ressecção com hepatectomia conforme extensão',no:'Drenagem biliar e quimioterapia'},
  {k:'do',t:'Avaliar transplante em casos selecionados'},
  {k:'end',t:'Câncer de vesícula T1b ou mais achado na peça: reoperar'}]},
 reasoning:['Vesícula murcha com icterícia: obstrução alta, Klatskin.','Colangite esclerosante e piora da icterícia: pensar em colangiocarcinoma.','Câncer de vesícula T1a basta colecistectomia; T1b em diante reopera.'],
 mnemonics:[{n:'Klatskin no hilo',t:'Colangiocarcinoma peri-hilar.'},{n:'IVb e V',t:'Segmentos ressecados na reoperação do câncer de vesícula.'},{n:'Todani I',t:'Cisto fusiforme, o mais comum.'}],
 pitfalls:['Esperar vesícula palpável no Klatskin.','Só drenar cisto de colédoco sem ressecar.','Não reoperar câncer de vesícula T2 achado na peça.'],
 recall:[
  {q:'Principal fator de risco no ocidente?',a:'Colangite esclerosante primária.'},
  {q:'O que é Bismuth-Corlette IV?',a:'Acometimento de ambos os ductos hepáticos ou multifocal.'},
  {q:'Conduta no câncer de vesícula T1a com margem livre?',a:'Colecistectomia é suficiente.'},
  {q:'Conduta no T1b ou mais?',a:'Ressecção dos segmentos IVb e V e linfadenectomia.'},
  {q:'Tratamento do cisto de colédoco?',a:'Ressecção com hepaticojejunostomia em Y de Roux.'}],
 practice:['Compare tumor de Klatskin e tumor de cabeça de pâncreas: vesícula, nível da obstrução, exames.'],
 refs:[
  {t:'European Association for the Study of the Liver. EASL-ILCA clinical practice guidelines on the management of intrahepatic cholangiocarcinoma. J Hepatol. 2023.',q:'EASL ILCA clinical practice guidelines intrahepatic cholangiocarcinoma 2023'},
  {t:'National Comprehensive Cancer Network. NCCN Guidelines: Biliary Tract Cancers. Versão vigente.',q:'NCCN Guidelines Biliary Tract Cancers'}],
 note:'Diretrizes europeia e do NCCN de tumores das vias biliares.'
},
'cirfig_0':{
 updated:'2026-11',
 pretest:['Qual o tumor hepático benigno mais comum?','Qual lesão tem cicatriz central e não precisa de tratamento?','Quando ressecar adenoma hepático?','Abscesso amebiano precisa de drenagem?'],
 sections:[
  {h:'Lesões sólidas benignas',table:{head:['Lesão','Perfil','Imagem','Conduta'],rows:[
   ['Hemangioma','O mais comum; mulheres','Hiperecogênico; realce nodular periférico com enchimento centrípeto','Observar; tratar se sintomático ou com complicações'],
   ['Hiperplasia nodular focal','Mulher jovem, não maligniza','Cicatriz central; na ressonância com contraste hepatobiliar, iso ou hiperintensa na fase hepatobiliar','Observar'],
   ['Adenoma','Mulher jovem com anticoncepcional, anabolizantes, glicogenose','Variável; risco de sangramento e de transformação maligna','Suspender estrogênio; ressecar se 5 cm ou mais, em homens, com mutação de beta-catenina ou crescimento']]},
   after:'Adenoma sangrando: embolização arterial e depois ressecção eletiva. Cisto simples assintomático: observar.'},
  {h:'Abscessos',table:{head:['','Piogênico','Amebiano','Hidático'],rows:[
   ['Quem','Idoso, diabético, doença biliar (a causa mais comum) ou foco abdominal (apendicite, diverticulite)','Homem jovem, área endêmica','Contato com cães, área rural'],
   ['Agente','Klebsiella, E. coli, anaeróbios','Entamoeba histolytica','Echinococcus granulosus'],
   ['Imagem','Únicos ou múltiplos','Geralmente único, lobo direito; conteúdo em pasta de anchova','Cisto com vesículas filhas, sinal do lírio d água'],
   ['Tratamento','Antibiótico e drenagem percutânea se maior que cerca de 3 a 5 cm; tratar a causa','Metronidazol e amebicida luminal; drenagem só se risco de ruptura (lobo esquerdo, grande), falha em alguns dias ou dúvida','Albendazol e tratamento percutâneo (PAIR) ou cirurgia; cuidado com anafilaxia ao puncionar']]}}
 ],
 flow:{title:'Nódulo hepático em fígado sem cirrose',nodes:[
  {k:'start',t:'Nódulo hepático incidental'},
  {k:'do',t:'Ressonância com contraste, de preferência hepatobiliar'},
  {k:'ask',t:'Realce nodular periférico centrípeto?',yes:'Hemangioma: observar',no:'Seguir'},
  {k:'ask',t:'Cicatriz central e captação na fase hepatobiliar?',yes:'Hiperplasia nodular focal: observar',no:'Pensar em adenoma'},
  {k:'ask',t:'Adenoma de 5 cm ou mais, homem ou beta-catenina?',yes:'Ressecção',no:'Suspender estrogênio e controlar com imagem'},
  {k:'end',t:'Febre com lesão cística: abscesso, definir etiologia'}]},
 reasoning:['HNF não maligniza; adenoma pode sangrar e malignizar.','Abscesso amebiano raramente drena; piogênico costuma drenar.','Cisto com vesículas filhas: não puncionar sem proteção, risco de anafilaxia.'],
 mnemonics:[{n:'Hemangioma enche de fora para dentro',t:'Realce centrípeto.'},{n:'Adenoma 5',t:'Ressecar a partir de 5 cm.'},{n:'Anchova é ameba',t:'Pasta de anchova no abscesso amebiano.'}],
 pitfalls:['Biopsiar hemangioma.','Manter anticoncepcional com adenoma.','Drenar todo abscesso amebiano.'],
 recall:[
  {q:'Tumor hepático benigno mais comum?',a:'Hemangioma.'},
  {q:'Lesão com cicatriz central que não precisa de tratamento?',a:'Hiperplasia nodular focal.'},
  {q:'Indicações de ressecar adenoma?',a:'5 cm ou mais, sexo masculino, mutação de beta-catenina, crescimento ou sangramento.'},
  {q:'Causa mais comum de abscesso piogênico?',a:'Doença biliar.'},
  {q:'Tratamento do abscesso amebiano?',a:'Metronidazol seguido de amebicida luminal; drenagem em casos selecionados.'}],
 practice:['Compare abscesso piogênico e amebiano em seis pontos.'],
 refs:[
  {t:'European Association for the Study of the Liver. EASL clinical practice guidelines on the management of benign liver tumours. J Hepatol. 2016.',q:'EASL clinical practice guidelines management of benign liver tumours 2016'},
  {t:'Townsend CM, et al. Sabiston Textbook of Surgery. 21ª ed. Capítulo The Liver.',q:'Sabiston the liver chapter abscess'}],
 note:'Diretriz europeia de tumores hepáticos benignos.'
},
'cirfig_1':{
 updated:'2026-11',
 pretest:['Quem deve ser rastreado para hepatocarcinoma e como?','Quando o diagnóstico de hepatocarcinoma dispensa biópsia?','O que são os critérios de Milão?','Qual o tratamento do estágio B do BCLC?'],
 sections:[
  {h:'Rastreamento e diagnóstico',p:[
   'Cirróticos de qualquer causa e alguns portadores de hepatite B sem cirrose devem fazer ultrassonografia a cada 6 meses, com ou sem alfafetoproteína.',
   'Nódulo de 1 cm ou mais em cirrótico: tomografia ou ressonância multifásica. Hiper-realce na fase arterial com lavagem (washout) na fase portal ou tardia é diagnóstico de hepatocarcinoma (LI-RADS 5) e dispensa biópsia. Fora dos grupos em que critérios de imagem foram validados, a confirmação histológica deve ser discutida; alguns grupos com hepatite B sem cirrose também podem preencher critérios não invasivos.']},
  {h:'Estadiamento BCLC (2022) e tratamento',table:{head:['Estágio','Perfil','Tratamento'],rows:[
   ['0 · muito precoce','Nódulo único menor que 2 cm, função preservada, bom estado geral','Ablação ou ressecção'],
   ['A · precoce','Único, ou até 3 nódulos de até 3 cm, função preservada','Ressecção (sem hipertensão portal significativa), transplante ou ablação'],
   ['B · intermediário','Multinodular, função preservada, sem invasão vascular','Quimioembolização (TACE); transplante se critérios estendidos; sistêmico se extenso'],
   ['C · avançado','Invasão portal ou doença extra-hepática, ou estado geral limitado','Tratamento sistêmico: atezolizumabe com bevacizumabe ou durvalumabe com tremelimumabe'],
   ['D · terminal','Função hepática ruim, sem transplante possível','Cuidados paliativos']]},
   after:'Critérios de Milão para transplante: nódulo único de até 5 cm ou até 3 nódulos de até 3 cm cada, sem invasão vascular e sem metástase extra-hepática. O transplante trata o tumor e a cirrose.'},
  {h:'Metástases hepáticas',p:['São os tumores malignos mais comuns no fígado. As de câncer colorretal, quando ressecáveis com função hepática residual adequada, são operadas com intenção curativa, frequentemente combinadas com quimioterapia.']}
 ],
 flow:{title:'Nódulo em fígado cirrótico',nodes:[
  {k:'start',t:'Nódulo na ultrassonografia de rastreamento'},
  {k:'ask',t:'1 cm ou mais?',yes:'TC ou RM multifásica',no:'Repetir ultrassonografia em 3 meses'},
  {k:'ask',t:'Hiper-realce arterial com washout?',yes:'Hepatocarcinoma sem biópsia',no:'Seguimento ou biópsia'},
  {k:'do',t:'Estadiar pelo BCLC: tumor, função hepática e estado geral'},
  {k:'ask',t:'Dentro de Milão?',yes:'Ressecção, ablação ou transplante',no:'TACE ou tratamento sistêmico'},
  {k:'end',t:'Função hepática ruim sem transplante: paliação'}]},
 reasoning:['Em cirrótico, imagem típica fecha o diagnóstico.','Milão é 1 até 5 ou 3 até 3.','Invasão portal desloca para o estágio C.'],
 mnemonics:[{n:'Milão: 5 ou 3 e 3',t:'Um nódulo até 5 cm ou até 3 nódulos de até 3 cm.'},{n:'Acende e lava',t:'Hiper-realce arterial e washout.'},{n:'Seis meses',t:'Intervalo do rastreamento com ultrassonografia.'}],
 pitfalls:['Biopsiar nódulo típico em cirrótico.','Indicar ressecção em cirrótico com hipertensão portal importante.','Esquecer que hepatite B pode dar hepatocarcinoma sem cirrose.'],
 recall:[
  {q:'Como rastrear hepatocarcinoma?',a:'Ultrassonografia a cada 6 meses, com ou sem alfafetoproteína, em cirróticos.'},
  {q:'Padrão de imagem diagnóstico?',a:'Hiper-realce arterial com washout portal ou tardio.'},
  {q:'Critérios de Milão?',a:'Único até 5 cm ou até 3 nódulos de até 3 cm, sem invasão vascular ou metástase.'},
  {q:'Tratamento do BCLC B?',a:'Quimioembolização transarterial.'},
  {q:'Tumor maligno mais comum do fígado?',a:'Metástase.'}],
 practice:['Estadie e trate: cirrótico Child A, nódulo único de 4 cm, sem invasão.'],
 refs:[
  {t:'Reig M, et al. BCLC strategy for prognosis prediction and treatment recommendation: the 2022 update. J Hepatol. 2022.',q:'BCLC strategy 2022 update Reig'},
  {t:'Singal AG, et al. AASLD practice guidance on prevention, diagnosis, and treatment of hepatocellular carcinoma. Hepatology. 2023.',q:'AASLD practice guidance hepatocellular carcinoma 2023'}],
 note:'BCLC 2022 e orientação da AASLD de 2023.'
},
'cirfig_2':{
 updated:'2026-11',
 pretest:['Qual gradiente de pressão define hipertensão portal clinicamente significativa?','Como fazer profilaxia primária de sangramento varicoso?','Qual o tratamento do sangramento varicoso agudo?','Quando indicar TIPS precoce?'],
 sections:[
  {h:'Conceitos',p:[
   'Gradiente de pressão venosa hepática acima de 5 mmHg define hipertensão portal; 10 mmHg ou mais é clinicamente significativa (formação de varizes); 12 mmHg ou mais, risco de sangramento.',
   'Causas pré-hepáticas (trombose da porta ou da esplênica), intra-hepáticas pré-sinusoidais (esquistossomose, com função hepática preservada e esplenomegalia volumosa), sinusoidais (cirrose, a mais comum) e pós-hepáticas (Budd-Chiari, insuficiência cardíaca direita).']},
  {h:'Prevenção',list:['<strong>Profilaxia primária:</strong> varizes de médio ou grosso calibre, ou finas com sinais vermelhos ou Child C: betabloqueador não seletivo (carvedilol ou propranolol) ou ligadura elástica.','<strong>Baveno VII:</strong> carvedilol em hipertensão portal clinicamente significativa compensada para prevenir descompensação.','<strong>Profilaxia secundária:</strong> após o primeiro sangramento, betabloqueador associado a ligadura seriada.']},
  {h:'Sangramento agudo',list:[
   'Reanimação com transfusão restritiva, alvo de hemoglobina de cerca de 7 a 8 g/dL; excesso de volume aumenta a pressão portal.',
   'Vasoativo (terlipressina, somatostatina ou octreotide) assim que se suspeita, mantido por 2 a 5 dias.',
   'Antibiótico profilático (ceftriaxona) para todo cirrótico com sangramento.',
   'Endoscopia em até 12 horas com ligadura elástica. Varizes gástricas: cianoacrilato.',
   '<strong>TIPS precoce (em até 72 horas):</strong> Child C de 10 a 13 pontos ou Child B acima de 7 com sangramento ativo na endoscopia.',
   '<strong>Falha:</strong> balão (Sengstaken-Blakemore) ou prótese esofágica como ponte para TIPS de resgate.',
   '<strong>Esquistossomose:</strong> a cirurgia clássica é a desconexão ázigo-portal com esplenectomia.',
   'Transplante hepático para doença avançada.']}
 ],
 flow:{title:'Hemorragia varicosa',nodes:[
  {k:'start',t:'Cirrótico com hematêmese'},
  {k:'do',t:'Via aérea, acesso, transfusão restritiva'},
  {k:'do',t:'Vasoativo e ceftriaxona imediatamente'},
  {k:'do',t:'Endoscopia em até 12 horas com ligadura'},
  {k:'ask',t:'Child C 10 a 13 ou Child B com sangramento ativo?',yes:'TIPS precoce em até 72 horas',no:'Profilaxia secundária: betabloqueador e ligadura'},
  {k:'end',t:'Falha: balão como ponte e TIPS de resgate'}]},
 reasoning:['No varicoso, menos sangue é mais: transfusão restritiva.','Antibiótico reduz mortalidade no cirrótico que sangra.','Esquistossomose: fígado funciona, baço é enorme.'],
 mnemonics:[{n:'5, 10, 12',t:'Hipertensão portal, clinicamente significativa, risco de sangramento.'},{n:'VAC',t:'Vasoativo, Antibiótico, Colocar ligadura.'},{n:'TIPS em 72',t:'TIPS precoce nos de alto risco.'}],
 pitfalls:['Transfundir até hemoglobina 10.','Esquecer a ceftriaxona.','Esperar a endoscopia para iniciar o vasoativo.'],
 recall:[
  {q:'Gradiente de hipertensão portal clinicamente significativa?',a:'10 mmHg ou mais.'},
  {q:'Três medidas imediatas no sangramento varicoso?',a:'Vasoativo, antibiótico profilático e ligadura endoscópica em até 12 horas.'},
  {q:'Indicação de TIPS precoce?',a:'Child C de 10 a 13 ou Child B acima de 7 com sangramento ativo.'},
  {q:'Tratamento de varizes gástricas?',a:'Cianoacrilato.'},
  {q:'Cirurgia clássica na esquistossomose?',a:'Desconexão ázigo-portal com esplenectomia.'}],
 practice:['Prescreva as primeiras 2 horas de um cirrótico Child B com hematêmese.'],
 refs:[
  {t:'de Franchis R, et al. Baveno VII: renewing consensus in portal hypertension. J Hepatol. 2022.',q:'Baveno VII renewing consensus in portal hypertension 2022'},
  {t:'Kaplan DE, et al. AASLD practice guidance on risk stratification and management of portal hypertension and varices in cirrhosis. Hepatology. 2024.',q:'AASLD practice guidance portal hypertension varices cirrhosis 2024'}],
 note:'Consenso de Baveno VII e orientação da AASLD de 2024.'
}
};
const extra={
ciresof_0:{
pretest:['Por que sintomas persistentes em uso de IBP não comprovam refluxo persistente?','Como distinguir regurgitação por refluxo de retenção por distúrbio motor antes de indicar cirurgia?'],
sections:[
{h:'Barreira antirrefluxo e sintomas que não obedecem ao mesmo mecanismo',p:['A junção esofagogástrica depende do esfíncter inferior, do diafragma crural e da anatomia hiatal. A supressão de ácido muda a agressividade do conteúdo, mas não corrige necessariamente a passagem de volume para o esôfago. Isso explica por que regurgitação pode persistir apesar de melhora da pirose.','Refratariedade exige conferir adesão, modo de uso e se o sintoma atribuído ao refluxo tem outra origem. Na DRGE ainda não comprovada, o teste busca demonstrar refluxo patológico; na DRGE já documentada, a investigação de sintomas persistentes pode exigir impedanciopHmetria durante tratamento. Não confundir essas perguntas clínicas.'],table:{head:['Hipótese','Pista que a favorece','Como muda a investigação'],rows:[['DRGE','Pirose, regurgitação e evidência objetiva de refluxo','Relacionar sintomas, lesão e exposição ao refluxo'],['Pirose funcional','Sintomas sem refluxo patológico nem associação temporal convincente','Evitar escalada de IBP ou fundoplicatura sem fundamento'],['Hipersensibilidade ao refluxo','Exposição global não patológica com associação entre episódios e sintomas','Discutir mecanismos de sensibilidade e tratamento individualizado'],['Acalasia ou ruminação','Retenção alimentar, regurgitação não ácida ou padrão comportamental','Investigar motilidade e mecanismo antes de operar a junção']]}},
{h:'Fundoplicatura: o raciocínio por trás dos passos',list:['Demonstrar a doença e explicar qual sintoma se pretende corrigir, discutindo risco de disfagia e incapacidade de eructar.','Estudar motilidade e anatomia hiatal, mobilizar adequadamente a junção e corrigir o defeito hiatal quando indicado.','Confeccionar a válvula sem tensão ou estreitamento excessivo; a escolha da extensão integra motilidade, características do caso e experiência da equipe.','No pós-operatório, separar adaptação transitória da deglutição de obstrução persistente, migração da válvula ou recidiva do refluxo.']},
{h:'Barrett e seguimento depois da intervenção',p:['Metaplasia, displasia e carcinoma intramucoso descrevem situações diferentes. A confirmação de displasia deve incluir revisão anatomopatológica especializada; uma lesão visível precisa de avaliação e ressecção para estadiamento, não apenas de ablação cega.','A cirurgia antirrefluxo trata refluxo selecionado, mas não elimina automaticamente o risco neoplásico do Barrett nem a necessidade de seguimento. Disfagia nova após fundoplicatura exige reavaliação da anatomia e da função, em vez de presumir refluxo persistente.']}
],
exam:[{c:'Pirose persiste apesar de tratamento, sem DRGE objetivamente demonstrada.',p:'Chamar falha do IBP de indicação automática de cirurgia.',r:'Rever uso e diagnóstico e documentar refluxo antes da decisão invasiva.'},{c:'Regurgitação importante, refluxo documentado e proposta de fundoplicatura.',p:'Dispensar o estudo motor porque a endoscopia mostrou esofagite.',r:'Avaliar motilidade e anatomia para selecionar e planejar a operação.'},{c:'Barrett com lesão elevada ou área nodular.',p:'Ablacionar toda a mucosa sem obter estadiamento da área suspeita.',r:'Avaliar e ressecar a lesão visível; completar tratamento conforme histologia.'},{c:'Paciente operado de refluxo pergunta se o Barrett desapareceu do acompanhamento.',p:'Equiparar controle dos sintomas a eliminação do risco de câncer.',r:'Manter seguimento orientado por histologia e extensão, conforme diretriz aplicável.'}],
cases:[{title:'Sintoma refratário sem comprovação de refluxo',data:['Adulto com pirose persistente e endoscopia sem lesão conclusiva.','Pede cirurgia por não melhorar com IBP.'],reasoning:['A persistência do sintoma não estabelece a sua causa.','É necessário verificar uso do medicamento e diferenciar refluxo, hipersensibilidade e pirose funcional.'],conduct:['Documentar ou excluir refluxo pelo teste apropriado à situação clínica.','Discutir operação apenas se houver relação plausível entre a doença comprovada e o sintoma-alvo.'],error:'Indicar fundoplicatura como teste terapêutico para qualquer pirose persistente.'},{title:'Barrett com área visível suspeita',data:['Pessoa em seguimento de Barrett apresenta área nodular em endoscopia.','Biópsias prévias não mostravam displasia.'],reasoning:['Uma lesão focal muda o risco e pode estar subestimada pelas amostras antigas.','A ressecção endoscópica fornece diagnóstico de profundidade e margens.'],conduct:['Encaminhar para avaliação endoscópica especializada e revisão histológica.','Definir tratamento do segmento restante e seguimento após o estadiamento.'],error:'Repetir o calendário antigo sem investigar a nova lesão.'}],
recall:[{q:'Por que IBP pode melhorar pirose e não regurgitação?',a:'Reduz a acidez, mas não necessariamente o refluxo de volume ou o defeito mecânico da junção.'},{q:'Quando o estudo de refluxo pode ser feito durante tratamento?',a:'Quando a DRGE já foi comprovada e a pergunta é se os sintomas persistentes se relacionam a refluxo apesar do tratamento.'},{q:'Cirurgia antirrefluxo elimina o seguimento do Barrett?',a:'Não. O seguimento continua orientado pela histologia e extensão, mesmo com controle dos sintomas.'}]
},
ciresof_1:{
pretest:['Por que a miotomia facilita o esvaziamento sem restaurar a peristalse?','Que combinação de história e exame impõe investigar pseudoacalasia?'],
sections:[
{h:'Obstrução funcional não é sinônimo de perda de propulsão isolada',p:['A perda da inibição impede o relaxamento adequado da junção e compromete a coordenação do corpo esofágico. O tratamento reduz a resistência de saída, mas não recria os neurônios perdidos. Por isso esvaziamento, aspiração e estado nutricional precisam ser avaliados além da percepção de disfagia.','Resultados manométricos inconclusivos devem ser interpretados com a clínica e testes complementares de esvaziamento. O afilamento distal isolado não substitui a exclusão de obstrução tumoral.'],table:{head:['Condição','Padrão que chama atenção','Decisão'],rows:[['Acalasia','Disfagia para sólidos e líquidos, retenção e regurgitação','Confirmar distúrbio motor e selecionar redução da resistência da junção'],['Pseudoacalasia','Evolução rápida, emagrecimento marcante ou resistência à passagem pela cárdia','Investigar causa neoplásica mesmo com exame inicial pouco conclusivo'],['Estenose péptica','Disfagia mecânica e história de refluxo','Definir estreitamento e histologia quando indicada'],['Zenker','Regurgitação alta de conteúdo antigo, halitose e aspiração','Estudar divertículo e segmento cricofaríngeo com cuidado']]}},
{h:'Escolher e explicar a intervenção',list:['Na miotomia cirúrgica, expor a junção e seccionar a camada muscular preservando a mucosa; a extensão deve resolver a zona de resistência.','Associar estratégia antirrefluxo apropriada na abordagem cirúrgica e verificar integridade da mucosa.','No POEM, a abordagem por túnel permite tratar segmento espástico; isso não dispensa discutir refluxo posterior.','Na dilatação pneumática, a melhora depende de reduzir a resistência muscular, com risco de perfuração que deve fazer parte do consentimento e do plano de resgate.']},
{h:'Persistência de disfagia e complicações',p:['Disfagia persistente pode resultar de miotomia incompleta, fibrose, refluxo com estenose ou esôfago avançadamente deformado. A reavaliação combina anatomia, esvaziamento e sintomas, evitando repetir procedimentos às cegas.','Dor intensa, febre, taquicardia ou sinais de extravasamento após intervenção exigem investigar perfuração. Na cirurgia de Zenker, tratar a disfunção cricofaríngea é tão importante quanto resolver a bolsa; remover apenas o divertículo deixa o mecanismo de pulsão ativo.']}
],
exam:[{c:'Disfagia para sólidos e líquidos com imagem em bico de pássaro.',p:'Fechar acalasia apenas pelo esofagograma.',r:'Excluir obstrução orgânica e confirmar o distúrbio motor.'},{c:'Idoso com disfagia recente, grande emagrecimento e resistência na cárdia.',p:'Atribuir tudo à acalasia primária.',r:'Investigar pseudoacalasia neoplásica, inclusive se a primeira biópsia não resolveu a dúvida.'},{c:'Pergunta sobre o objetivo da miotomia.',p:'Afirmar que ela recupera a peristalse perdida.',r:'Reduzir a resistência da junção e facilitar esvaziamento.'},{c:'Divertículo alto com halitose e regurgitação de alimento antigo.',p:'Introduzir endoscópio sem considerar entrada na bolsa.',r:'Pensar em Zenker e estudar a anatomia com técnica cuidadosa.'}],
cases:[{title:'A imagem típica não encerra a investigação',data:['Idoso com disfagia de instalação recente e emagrecimento importante.','Esofagograma mostra afilamento distal.'],reasoning:['O aspecto radiológico pode ser produzido por doença primária ou por obstrução tumoral.','O perfil clínico aumenta a preocupação com pseudoacalasia.'],conduct:['Avaliar a junção por endoscopia e completar investigação se a suspeita persistir.','Evitar miotomia antes de excluir causa estrutural relevante.'],error:'Usar bico de pássaro como autorização automática para miotomia.'},{title:'Disfagia após tratamento da acalasia',data:['Pessoa tratada por miotomia volta a relatar disfagia.','Também refere sintomas de refluxo.'],reasoning:['A recidiva não prova regeneração da doença na junção.','Miotomia incompleta, fibrose, estenose péptica e anatomia avançada entram no diferencial.'],conduct:['Reavaliar anatomia, esvaziamento e refluxo conforme a hipótese.','Escolher nova intervenção apenas depois de definir o mecanismo.'],error:'Repetir dilatação sem estudar a causa da persistência.'}],
recall:[{q:'A miotomia restaura a peristalse?',a:'Não. Reduz a resistência de saída e facilita esvaziamento sem repor os neurônios perdidos.'},{q:'Como investigar disfagia recorrente após miotomia?',a:'Reavaliando anatomia, esvaziamento e possíveis complicações, como fibrose, miotomia incompleta ou estenose por refluxo.'},{q:'Por que tratar o cricofaríngeo no Zenker?',a:'Porque a dificuldade de abertura desse segmento participa do mecanismo de pulsão que forma a bolsa.'}]
},
ciresof_2:{
pretest:['Por que o estadiamento sistêmico deve preceder uma operação de grande porte?','Que sinais após esofagectomia fazem suspeitar de fístula ou complicação pulmonar?'],
sections:[
{h:'Profundidade, drenagem linfática e capacidade de suportar tratamento',p:['O esôfago tem extensa rede linfática, permitindo disseminação além da área visível do tumor. Histologia, profundidade, linfonodos e doença à distância precisam ser integrados, junto com estado funcional e nutrição.','A escolha de tratamento multimodal depende da histologia e da localização. A preferência atual entre quimioterapia perioperatória e quimiorradioterapia no adenocarcinoma ressecável precisa de atualização na diretriz: a confirmar. Não extrapolar um esquema histórico para todo paciente.'],table:{head:['Achado','Consequência para o raciocínio','Próximo foco'],rows:[['Lesão superficial favorável','Pode permitir tratamento endoscópico com estadiamento da peça','Profundidade, diferenciação, invasão linfovascular e margens'],['Doença locorregional potencialmente ressecável','Avaliar estratégia multimodal e risco operatório','Discussão multidisciplinar e otimização nutricional'],['Metástases ou doença irressecável','Priorizar tratamento sistêmico e controle de sintomas','Paliação da disfagia e suporte'],['Tosse ao deglutir ou invasão da via aérea','Pode haver comunicação ou invasão traqueobrônquica','Investigar via aérea antes de planejar ressecção']]}},
{h:'Esofagectomia: passos conceituais cobrados',list:['Confirmar estadiamento e ressecabilidade, avaliando estado nutricional e risco pulmonar.','Ressecar o segmento comprometido e os territórios linfonodais indicados, respeitando estruturas mediastinais.','Preparar conduto com perfusão adequada, geralmente gástrico, evitando tensão ou torção.','Construir anastomose e planejar drenagem, nutrição e vigilância pós-operatória conforme a abordagem.']},
{h:'Reconhecer complicações sem esperar sinais tardios',p:['Taquicardia persistente, febre, dor, deterioração respiratória ou alteração do aspecto do dreno podem indicar fístula anastomótica, pneumonia ou outras complicações. O manejo depende de estabilidade, extensão da contaminação e viabilidade do conduto, com controle do foco e suporte nutricional.','Rouquidão pode refletir lesão do nervo recorrente e aumentar risco de aspiração. Quilotórax sugere lesão linfática; a estratégia de tratamento considera repercussão e persistência. Estenose tardia da anastomose exige excluir recorrência antes de atribuir tudo à cicatriz.']}
],
exam:[{c:'Disfagia progressiva com perda de peso.',p:'Tratar empiricamente como refluxo sem investigar.',r:'Endoscopia com biópsia e posterior estadiamento.'},{c:'Câncer confirmado e proposta de esofagectomia imediata.',p:'Ignorar metástases, nutrição e necessidade de terapia multimodal.',r:'Completar estadiamento e discutir estratégia conforme histologia, extensão e condição clínica.'},{c:'Tumor cervical escamoso.',p:'Aplicar automaticamente a operação usada em lesões torácicas.',r:'Considerar estratégia preservadora com tratamento definitivo não operatório em equipe especializada.'},{c:'Taquicardia e piora respiratória após esofagectomia.',p:'Esperar saída de conteúdo alimentar pelo dreno para investigar.',r:'Suspeitar de complicação e avaliar rapidamente fístula, contaminação e viabilidade do conduto.'}],
cases:[{title:'A disfagia é a porta de entrada, não o estadiamento',data:['Adulto com disfagia progressiva e perda ponderal.','Biópsia confirma neoplasia do esôfago.'],reasoning:['Confirmar histologia não define extensão nem ressecabilidade.','O benefício de uma cirurgia de grande porte depende do cenário oncológico e da reserva clínica.'],conduct:['Completar estadiamento locorregional e sistêmico.','Planejar tratamento multidisciplinar, com atenção à nutrição e ao sintoma de disfagia.'],error:'Marcar esofagectomia apenas com o laudo de biópsia.'},{title:'Deterioração depois da reconstrução',data:['Paciente após esofagectomia apresenta taquicardia, febre e piora respiratória.','O dreno ainda não mostrou conteúdo digestivo evidente.'],reasoning:['Ausência de drenagem típica não exclui fístula.','Pneumonia e problema do conduto podem produzir apresentação sobreposta.'],conduct:['Reavaliar estabilidade e investigar a origem da deterioração.','Garantir suporte e controle do foco de acordo com os achados e a viabilidade dos tecidos.'],error:'Aguardar manifestação tardia e específica antes de investigar.'}],
recall:[{q:'O que deve acompanhar o estadiamento anatômico antes da esofagectomia?',a:'Avaliação funcional, nutricional e de risco operatório, além da discussão de tratamento multimodal.'},{q:'Por que taquicardia pós-operatória merece atenção?',a:'Pode ser manifestação inicial de complicação, incluindo fístula, infecção e deterioração respiratória.'},{q:'Estenose tardia da anastomose é sempre benigna?',a:'Não. A recidiva tumoral precisa ser considerada antes de atribuir a disfagia apenas à cicatriz.'}]
},
cirestom_0:{
pretest:['Por que tratar apenas com injeção vasoconstritora pode ser insuficiente na úlcera de alto risco?','Como diferenciar dumping de obstrução ou complicação infecciosa depois de gastrectomia?'],
sections:[
{h:'A úlcera sangra, perfura ou obstrui por mecanismos distintos',p:['A perda da barreira mucosa permite aprofundamento da lesão. Quando alcança um vaso, ocorre hemorragia; quando ultrapassa a parede, perfuração; quando inflama e cicatriza próximo da saída gástrica, pode surgir obstrução. A localização ajuda a antecipar o mecanismo, mas a estabilidade determina a prioridade.','Hemoglobina inicial pode não traduzir toda a perda aguda. Perfusão, tendência clínica e sangramento em atividade orientam reanimação e necessidade de intervenção. O tratamento endoscópico deve oferecer hemostasia durável; injeção isolada de adrenalina não substitui método definitivo quando indicado.'],table:{head:['Complicação','Pista clínica','Prioridade'],rows:[['Hemorragia','Hematêmese ou melena, repercussão circulatória','Estabilizar e localizar para hemostasia'],['Perfuração','Dor súbita e sinais de irritação peritoneal','Reanimação e controle de foco, sem atrasos indevidos'],['Obstrução da saída','Vômitos de estase, desidratação e distúrbios eletrolíticos','Descomprimir, corrigir alterações e excluir neoplasia'],['Úlcera gástrica suspeita','Lesão persistente ou aspecto irregular','Obter avaliação histológica e comprovar evolução']]}},
{h:'Cirurgia de resgate e reconstrução: explicar o objetivo',list:['Se a hemorragia não é controlada pelos recursos menos invasivos apropriados, definir o vaso e o segmento responsável antes de escolher a operação de resgate.','Na úlcera perfurada, controlar contaminação e avaliar a possibilidade de fechamento seguro; no estômago, não esquecer a investigação de neoplasia.','A indicação de ressecção ou derivação na obstrução integra etiologia, condição clínica e possibilidade de tratamento endoscópico.','Após reconstrução, entender o trajeto do alimento e da bile permite prever alça aferente, refluxo biliar e carências nutricionais.']},
{h:'Depois da hemostasia e depois da gastrectomia',p:['O sucesso imediato da hemostasia não elimina risco de ressangramento. Repetição de hematêmese, deterioração hemodinâmica e queda de hemoglobina no contexto clínico exigem reavaliação. Tratar a causa inclui pesquisar e erradicar H. pylori e rever exposição a anti-inflamatórios.','Dumping se relaciona à chegada inadequada de conteúdo ao intestino e às respostas osmótica e hormonal. Dor persistente, febre, sinais de obstrução ou deterioração sistêmica não devem ser classificados como dumping apenas pela história de gastrectomia. O acompanhamento nutricional busca deficiências e perda ponderal.']}
],
exam:[{c:'Úlcera com vaso visível, mas sem sangramento no instante da endoscopia.',p:'Classificar como baixo risco porque não há jato.',r:'Reconhecer estigma de alto risco e indicar hemostasia adequada.'},{c:'Novo sangramento após hemostasia inicial.',p:'Manter só IBP sem reavaliar o foco.',r:'Reavaliar, realizar nova abordagem endoscópica quando indicada e planejar resgate se houver falha.'},{c:'Vômitos de conteúdo antigo e alterações eletrolíticas.',p:'Atribuir o quadro apenas a dispepsia funcional.',r:'Pensar em obstrução de saída gástrica, corrigir repercussões e excluir câncer.'},{c:'Sintomas depois de gastrectomia.',p:'Chamar toda dor e vômito de dumping.',r:'Relacionar sintomas à refeição e pesquisar complicações mecânicas, infecciosas e nutricionais.'}],
cases:[{title:'O vaso continua perigoso sem jato',data:['Paciente com melena foi estabilizado.','Endoscopia encontra úlcera com vaso visível não sangrante.'],reasoning:['O vaso exposto indica risco de novo sangramento.','A ausência de atividade naquele instante não equivale a cicatrização.'],conduct:['Realizar hemostasia indicada e terapia antissecretora.','Acompanhar resposta, revisar a causa e planejar resgate se ressangrar.'],error:'Liberar sem hemostasia porque o sangramento cessou durante o exame.'},{title:'Vômitos de estase exigem reposição e diagnóstico',data:['Adulto com vômitos de alimento retido, emagrecimento e desidratação.','Há história de úlcera, mas a causa atual não foi documentada.'],reasoning:['A estase pode decorrer de doença benigna ou neoplásica.','A repercussão hidroeletrolítica aumenta risco de qualquer procedimento.'],conduct:['Descomprimir quando indicado e corrigir volume e eletrólitos.','Investigar por endoscopia e definir tratamento da causa.'],error:'Indicar operação eletiva antes de corrigir repercussões e excluir neoplasia.'}],
recall:[{q:'Por que vaso visível sem sangramento não é estigma de baixo risco?',a:'Porque o vaso exposto pode voltar a sangrar e precisa de abordagem conforme o risco endoscópico.'},{q:'Qual o limite da injeção de adrenalina isolada?',a:'Pode obter controle transitório, mas não substitui método de hemostasia definitiva quando este é indicado.'},{q:'Por que não chamar todo sintoma pós-gastrectomia de dumping?',a:'Porque obstrução, fístula, infecção e carências também produzem sintomas e exigem avaliação própria.'}]
},
cirestom_1:{
pretest:['Por que a laparoscopia pode alterar o planejamento mesmo com tomografia sem metástase?','Como a localização e a extensão influenciam a escolha entre gastrectomia subtotal e total?'],
sections:[
{h:'Da parede gástrica ao peritônio',p:['Adenocarcinoma gástrico pode disseminar por continuidade, linfonodos, sangue e peritônio. O tipo infiltrativo pode reduzir a complacência do estômago e produzir saciedade precoce sem grande massa intraluminal.','A profundidade define câncer precoce, mas não basta para decidir ressecção endoscópica: histologia, ulceração, risco linfonodal, margens e outros critérios devem ser integrados. Critérios numéricos atualizados de seleção endoscópica: a confirmar.'],table:{head:['Questão de estadiamento','Ferramenta ou dado','Implicação'],rows:[['Confirmar histologia','Endoscopia e amostras adequadas','Distinguir adenocarcinoma de outras neoplasias'],['Avaliar lesão superficial','Endoscopia especializada e, conforme contexto, ecoendoscopia','Selecionar tratamento local com segurança oncológica'],['Doença sistêmica','Imagem de estadiamento','Evitar operação sem benefício curativo'],['Implantes peritoneais ocultos','Laparoscopia em pacientes selecionados','Pode mudar de ressecção planejada para tratamento sistêmico']]}},
{h:'Gastrectomia oncológica em passos de raciocínio',list:['Definir extensão da ressecção para obter margens adequadas, preservando estômago quando isso não compromete o objetivo oncológico.','Planejar linfadenectomia por territórios anatômicos e qualidade da operação, sem reduzir o conceito a uma contagem isolada.','Reconstruir trânsito com perfusão, ausência de tensão e trajeto claro para alimento e secreções.','Preparar seguimento de peso, ingestão, ferro e vitaminas, especialmente após ressecções extensas.']},
{h:'Complicações precoces e necessidades tardias',p:['Febre, taquicardia, dor persistente ou deterioração após gastrectomia exigem considerar fístula, abscesso, sangramento e complicação respiratória. O tratamento integra suporte, drenagem e controle do foco conforme a gravidade.','No seguimento, diferenciar recidiva tumoral de estenose, síndrome pós-gastrectomia e desnutrição. O planejamento oncológico precisa incluir suporte nutricional e terapias sistêmicas conforme o perfil da doença; o esquema mais atual para cada subgrupo depende de revisão especializada.']}
],
exam:[{c:'Lesão gástrica limitada à submucosa com linfonodo suspeito.',p:'Negar o termo precoce apenas pelo linfonodo.',r:'Precoce descreve profundidade; indicação de tratamento depende também do risco de disseminação.'},{c:'Tomografia sem doença à distância em tumor com risco peritoneal.',p:'Considerar a tomografia suficiente para excluir implantes pequenos.',r:'Avaliar laparoscopia de estadiamento no cenário indicado.'},{c:'Tumor distal ressecável.',p:'Indicar gastrectomia total apenas porque é câncer.',r:'Escolher extensão pela possibilidade de margens adequadas e pelo padrão de disseminação.'},{c:'Paciente emagrecido após gastrectomia.',p:'Avaliar apenas recidiva e esquecer deficiências.',r:'Integrar investigação oncológica, anatomia da reconstrução e acompanhamento nutricional.'}],
cases:[{title:'Profundidade e escolha do tratamento não são a mesma pergunta',data:['Laudo descreve neoplasia limitada à submucosa.','Há achados que aumentam preocupação com disseminação linfonodal.'],reasoning:['A definição de precoce é anatômica pela profundidade.','A segurança de um tratamento apenas endoscópico exige mais critérios.'],conduct:['Revisar histologia e estadiamento.','Definir estratégia oncológica em equipe, sem usar o rótulo precoce como indicação isolada.'],error:'Supor que toda lesão chamada precoce deve ser tratada apenas por endoscopia.'},{title:'A tomografia não exclui toda doença peritoneal',data:['Pessoa com tumor gástrico infiltrativo e imagem sem metástase evidente.','A equipe avalia tratamento com intenção curativa.'],reasoning:['Implantes pequenos podem não ser demonstrados na tomografia.','Detectá-los muda a relação benefício-risco da gastrectomia.'],conduct:['Considerar estadiamento laparoscópico conforme o cenário.','Integrar achados peritoneais, estado nutricional e plano sistêmico.'],error:'Prometer cura com gastrectomia a partir apenas da tomografia negativa.'}],
recall:[{q:'Por que precoce não é sinônimo de indicação endoscópica?',a:'Porque profundidade é apenas um componente; histologia, ulceração, margens e risco linfonodal também orientam a seleção.'},{q:'O que a laparoscopia pode acrescentar à tomografia?',a:'Pode identificar disseminação peritoneal oculta que altera o planejamento terapêutico.'},{q:'Qual princípio orienta subtotal versus total?',a:'Obter ressecção oncologicamente adequada conforme localização e extensão, preservando órgão quando isso for seguro.'}]
},
cirvb_0:{
pretest:['Por que a conversão para cirurgia aberta não substitui a identificação anatômica segura?','Como reconhecer vazamento biliar e lesão de via biliar depois da colecistectomia?'],
sections:[
{h:'Obstrução transitória, inflamação e icterícia não são o mesmo quadro',p:['Na cólica biliar, a obstrução é transitória e não há necessariamente inflamação sustentada da parede. Na colecistite, a obstrução persistente e a resposta inflamatória produzem dor persistente, sensibilidade e repercussão sistêmica. Icterícia exige ampliar a avaliação para a via biliar principal e outras causas.','A indicação de operação em achado incidental não deve ser automática. Tipo de calcificação, morfologia do pólipo, condições clínicas e risco individual mudam a decisão; os limiares e calendários específicos do material base precisam de conferência na diretriz aplicável.'],table:{head:['Condição','Pista','Direção da conduta'],rows:[['Cólica biliar','Sintoma compatível sem síndrome inflamatória persistente','Avaliar operação eletiva no sintomático'],['Colecistite','Dor persistente e inflamação local ou sistêmica','Definir gravidade e controle de foco'],['Coledocolitíase','Colestase, icterícia ou cálculo na via principal','Estratificar e tratar a obstrução'],['Mirizzi','Cálculo impactado junto da via biliar, anatomia inflamada','Planejar abordagem com risco aumentado de lesão']]}},
{h:'Colecistectomia segura e estratégia de saída',list:['Expor o triângulo hepatocístico e manter orientação em relação ao leito hepático e à via biliar principal.','Só dividir estruturas depois de identificação segura; um aspecto tubular isolado não comprova ducto cístico.','Se a anatomia não é segura, interromper a progressão, reavaliar e considerar exame intraoperatório, ajuda especializada ou estratégia de saída como subtotal.','Converter pode facilitar exposição, mas não torna uma anatomia indefinida automaticamente segura. A prioridade é evitar lesão.']},
{h:'Complicações que precisam ser reconhecidas',p:['Dor, febre, icterícia ou débito biliar após operação sugerem coleção, vazamento, cálculo retido ou lesão da via principal. Estabilidade e controle de infecção vêm antes da reconstrução definitiva.','Suspeita de lesão importante pede documentação e avaliação especializada; tentativas repetidas de reparo sem definição anatômica podem piorar o resultado. O tratamento é individualizado conforme nível, continuidade e viabilidade dos ductos.']}
],
exam:[{c:'Cálculo incidental em pessoa sem sintomas biliares.',p:'Indicar colecistectomia para todo achado de ultrassonografia.',r:'Avaliar risco individual e indicações específicas, em vez de operar automaticamente.'},{c:'Triângulo hepatocístico muito inflamado, anatomia duvidosa.',p:'Clipar a estrutura que parece ser o cístico.',r:'Parar a dissecção perigosa e escolher estratégia de segurança.'},{c:'Proposta de conversão por dificuldade anatômica.',p:'Afirmar que abrir elimina o risco de lesão biliar.',r:'A conversão é um recurso; a identificação anatômica continua necessária.'},{c:'Dor e icterícia após colecistectomia.',p:'Classificar como adaptação habitual sem investigar.',r:'Pesquisar obstrução, vazamento, coleção ou lesão da via biliar.'}],
cases:[{title:'A melhor operação pode ser interromper a dissecção insegura',data:['Durante colecistectomia há inflamação intensa.','Não é possível demonstrar a anatomia com segurança.'],reasoning:['Prosseguir com identificação presumida aumenta risco de lesão da via principal.','Conversão e subtotal são estratégias, não sinais de fracasso técnico.'],conduct:['Reavaliar exposição, solicitar ajuda e recursos de definição anatômica quando indicados.','Escolher uma estratégia de saída segura em vez de insistir no plano original.'],error:'Dividir uma estrutura apenas pela posição aparente.'},{title:'Sintoma novo depois da operação',data:['Pessoa apresenta dor e febre após colecistectomia.','Imagem sugere coleção próxima do leito vesicular.'],reasoning:['A coleção pode estar relacionada a vazamento biliar ou outra complicação.','É preciso controlar a infecção e definir a anatomia da lesão.'],conduct:['Avaliar estabilidade e necessidade de drenagem.','Investigar a via biliar e planejar tratamento com equipe apropriada.'],error:'Prescrever apenas analgésico sem investigar coleção e vazamento.'}],
recall:[{q:'Por que converter não basta para evitar lesão?',a:'Porque a identificação anatômica continua indispensável na operação aberta; exposição melhor não é diagnóstico anatômico.'},{q:'Qual o objetivo de uma estratégia de saída?',a:'Controlar o problema sem insistir em dissecção cuja anatomia não pode ser demonstrada com segurança.'},{q:'O que investigar em febre e icterícia após colecistectomia?',a:'Coleção, vazamento, lesão da via principal e obstrução por cálculo retido, conforme o contexto.'}]
},
cirvb_1:{
pretest:['Por que uma CPRE sem objetivo terapêutico pode causar dano evitável?','Como a persistência de sepse após drenagem muda a avaliação?'],
sections:[
{h:'A pressão e a infecção explicam a urgência',p:['O cálculo da via principal pode produzir obstrução intermitente ou persistente. Quando há infecção sobre uma via obstruída, antibiótico sem descompressão pode não resolver o foco. A prioridade depende da repercussão clínica e da presença de colangite.','Probabilidade pré-teste orienta a escolha do exame. Em probabilidade intermediária, confirmar por método menos invasivo pode evitar pancreatite, sangramento ou perfuração de uma CPRE desnecessária.'],table:{head:['Cenário','Pergunta decisiva','Estratégia'],rows:[['Suspeita sem confirmação e sem colangite','Qual a probabilidade de cálculo na via principal?','Estratificar e confirmar quando indicado'],['Cálculo documentado com necessidade de tratamento','Como desobstruir com segurança?','Abordagem endoscópica ou cirúrgica conforme recursos e caso'],['Colangite com repercussão sistêmica','O foco está drenado?','Suporte, antibiótico e descompressão no contexto apropriado'],['Sepse persiste após procedimento','A drenagem foi efetiva e completa?','Reavaliar obstrução residual, segmentos não drenados e complicações']]}},
{h:'Desobstrução e prevenção de recorrência',list:['Na CPRE, acessar e caracterizar a via, escolher técnica de extração e comprovar o resultado conforme a situação.','Se a extração completa não é possível, garantir estratégia de drenagem e plano para tratamento definitivo.','A exploração cirúrgica pode ser opção conforme anatomia, experiência da equipe e combinação com colecistectomia.','Resolver o cálculo da via principal não resolve automaticamente a fonte vesicular de novos eventos. O momento da colecistectomia depende da condição clínica e do contexto.']},
{h:'Complicações e leitura crítica dos marcadores',p:['Dor importante após CPRE exige considerar pancreatite, perfuração e outras complicações; sangramento pode ocorrer após intervenção papilar. A avaliação integra sintomas, exame, exames complementares e evolução, sem diagnosticar apenas por um dado isolado.','A queda de bilirrubina pode não ser instantânea depois da desobstrução. Por outro lado, deterioração clínica ou sepse persistente não deve ser atribuída apenas à demora de normalização laboratorial.']}
],
exam:[{c:'Suspeita intermediária de cálculo sem colangite.',p:'Usar CPRE apenas para confirmar diagnóstico.',r:'Preferir confirmação por exame apropriado antes da intervenção quando indicado.'},{c:'Colangite com obstrução biliar.',p:'Confiar apenas na resposta ao antibiótico.',r:'Integrar reanimação, antibiótico e descompressão do foco.'},{c:'CPRE removeu o cálculo, vesícula permanece com cálculos.',p:'Considerar a doença definitivamente resolvida.',r:'Planejar tratamento da fonte vesicular conforme o cenário.'},{c:'Febre e deterioração continuam após drenagem.',p:'Esperar só a normalização da bilirrubina.',r:'Reavaliar drenagem, obstrução residual, complicação e outros focos.'}],
cases:[{title:'Investigar sem expor a risco desnecessário',data:['Adulto com colelitíase e alterações sugestivas, mas sem cálculo demonstrado na via principal.','Não há quadro de colangite.'],reasoning:['A suspeita não obriga a um procedimento invasivo diagnóstico.','A decisão depende da probabilidade e da capacidade de confirmar por método apropriado.'],conduct:['Estratificar o caso e selecionar colangiorressonância, ecoendoscopia ou avaliação intraoperatória conforme indicação.','Reservar intervenção terapêutica para o cenário em que traga benefício.'],error:'Escolher CPRE para qualquer alteração de enzima hepática.'},{title:'A drenagem precisa produzir controle do foco',data:['Pessoa com colangite foi submetida a descompressão.','Permanece com deterioração e sinais de infecção sistêmica.'],reasoning:['Pode haver drenagem insuficiente, cálculo residual ou complicação do procedimento.','Persistência da sepse é mais relevante do que aguardar queda completa de um marcador.'],conduct:['Reavaliar estabilidade, antibiótico e anatomia da drenagem.','Definir necessidade de novo controle do foco e investigar complicações.'],error:'Atribuir toda piora à demora esperada de melhora da icterícia.'}],
recall:[{q:'Por que confirmar cálculo antes de CPRE em casos selecionados?',a:'Para evitar risco de procedimento invasivo quando a probabilidade não justifica intervenção terapêutica direta.'},{q:'Antibiótico isolado resolve toda colangite?',a:'Não. Na obstrução infectada, a descompressão do foco é componente importante do tratamento.'},{q:'O que avaliar se a sepse persiste após drenagem?',a:'Efetividade da drenagem, obstrução residual, segmentos não drenados, complicações e outros focos.'}]
},
cirvb_2:{
pretest:['Por que a classificação de Bismuth não define sozinha a ressecabilidade?','Qual o risco de obter uma biópsia sem discutir a via de acesso em tumor potencialmente tratável?'],
sections:[
{h:'Localização ductal, invasão vascular e reserva hepática',p:['O tumor biliar pode obstruir o fluxo antes de formar grande massa. A imagem precisa mostrar a extensão ductal e a relação vascular, além da anatomia que restará após eventual ressecção. A classificação ductal organiza a descrição, mas não substitui avaliação de disseminação e reserva funcional.','O marcador tumoral pode aumentar em colestase e inflamação. Não confirma câncer isoladamente. A necessidade e a via de obtenção de tecido devem ser planejadas em equipe, especialmente em candidatos a estratégias curativas especializadas.'],table:{head:['Aspecto','O que informa','O que não decide sozinho'],rows:[['Bismuth-Corlette','Distribuição do comprometimento ductal peri-hilar','Ressecabilidade global'],['Relação vascular','Possibilidade e complexidade da ressecção','Reserva do fígado remanescente'],['Marcador tumoral','Dado complementar no contexto clínico','Diagnóstico histológico ou ressecabilidade'],['Estado funcional e volume remanescente','Tolerância à operação planejada','Presença de metástases']]}},
{h:'Princípios da operação e planejamento da drenagem',list:['Definir quais ductos e territórios devem ser preservados e qual operação pode obter margens adequadas.','Planejar a drenagem em função da anatomia, do fígado que ficará e da presença de infecção; não drenar segmentos de maneira aleatória.','No câncer de vesícula incidental, revisar a peça, margens e estadiamento antes de discutir ampliação da ressecção.','A reconstrução biliar exige tecido viável e drenagem adequada; o seguimento procura estenose, colangite e recidiva.']},
{h:'Após ressecção e no contexto paliativo',p:['Fístula biliar, coleção, colangite e insuficiência hepática são complicações relevantes de operações extensas. O manejo depende de reserva funcional, infecção e necessidade de controle do foco.','Na doença sem opção curativa, a drenagem deve ter objetivo clínico claro, como controlar infecção, aliviar prurido ou permitir tratamento sistêmico. O benefício de um procedimento precisa ser comparado ao risco, e não apenas à possibilidade técnica de colocação de uma prótese.']}
],
exam:[{c:'Tumor peri-hilar classificado pelo acometimento ductal.',p:'Usar a classe de Bismuth como única informação para indicar ou negar cirurgia.',r:'Integrar invasão vascular, disseminação, anatomia e reserva do fígado remanescente.'},{c:'Marcador tumoral elevado com icterícia e inflamação.',p:'Considerar o marcador diagnóstico definitivo de câncer.',r:'Interpretar no contexto e completar investigação anatômica e diagnóstica.'},{c:'Câncer de vesícula descoberto na peça.',p:'Indicar reoperação sem revisar estágio, margens e disseminação.',r:'Revisar anatomopatológico e estadiamento antes de definir ampliação oncológica.'},{c:'Prurido e colangite em obstrução maligna.',p:'Escolher a drenagem apenas pela facilidade técnica.',r:'Planejar segmentos, finalidade clínica e risco de infecção.'}],
cases:[{title:'O mapa ductal não é todo o estadiamento',data:['Colangiorressonância mostra tumor peri-hilar com extensão ductal.','Ainda não foram definidos vasos, disseminação e reserva hepática.'],reasoning:['A classificação anatômica comunica distribuição ductal.','A operação depende também da possibilidade de margem e do fígado remanescente.'],conduct:['Completar avaliação em equipe hepatobiliar.','Planejar drenagem e eventual ressecção de forma integrada.'],error:'Decidir ressecabilidade apenas pelo nome da classe ductal.'},{title:'Câncer incidental requer revisão organizada',data:['Peça de colecistectomia mostra câncer de vesícula.','O paciente foi encaminhado para avaliação oncológica.'],reasoning:['Profundidade, margens e disseminação orientam a necessidade de ampliação.','A indicação depende da possibilidade de benefício oncológico e da condição clínica.'],conduct:['Revisar anatomopatológico e completar estadiamento.','Discutir ressecção complementar quando apropriada.'],error:'Afirmar que toda colecistectomia é tratamento suficiente sem ler o estágio.'}],
recall:[{q:'Bismuth-Corlette define toda a ressecabilidade?',a:'Não. Descreve a extensão ductal, que deve ser integrada a vasos, disseminação e reserva do remanescente.'},{q:'Por que um marcador pode confundir na icterícia?',a:'Porque colestase e inflamação podem elevar o resultado sem comprovar câncer.'},{q:'O que revisar no câncer de vesícula incidental?',a:'Profundidade, margens, qualidade da peça, disseminação e condições para eventual ressecção complementar.'}]
},
cirfig_0:{
pretest:['Por que uma lesão hipervascular típica não deve receber biópsia de rotina?','Como a causa de um abscesso muda o tratamento além do antibiótico?'],
sections:[
{h:'Comportamento biológico explica observar ou intervir',p:['Hemangioma, hiperplasia nodular focal e adenoma não têm o mesmo risco. Caracterizar a lesão evita tanto operação desnecessária quanto observação inadequada de lesão com risco de sangramento ou transformação. A história de exposição hormonal, doença hepática e neoplasia prévia modifica a interpretação.','Em abscessos, tratar só a coleção sem pesquisar a porta de entrada favorece falha e recidiva. Doença biliar e foco intra-abdominal são possibilidades a investigar; imunossupressão e contexto epidemiológico ajudam a ampliar o diferencial.'],table:{head:['Problema','Como distinguir','Consequência'],rows:[['Hiperplasia nodular focal e adenoma','Perfil de realce, fase hepatobiliar e contexto','Risco e indicação de intervenção são diferentes'],['Hemangioma e lesão indeterminada','Padrão vascular e coerência entre fases','Evitar punção de lesão vascular típica sem necessidade'],['Abscesso e tumor necrosado','Febre, infecção, imagem e evolução','Pode exigir investigação complementar quando o curso é atípico'],['Cisto simples e doença hidática','Arquitetura, vesículas filhas e epidemiologia','Punção indiscriminada pode causar complicação grave']]}},
{h:'Intervenções escolhidas pelo mecanismo',list:['No abscesso piogênico, associar terapia antimicrobiana ao controle do foco quando indicado e pesquisar a origem.','No abscesso amebiano, tratar o componente tecidual e a infecção luminal; a drenagem é seletiva, não reflexo automático da imagem de coleção.','Na suspeita de hidatidose, planejar o tratamento especializado para evitar extravasamento, disseminação e reação anafilática.','No adenoma hemorrágico, estabilizar e considerar controle vascular do sangramento antes de planejar tratamento definitivo.']},
{h:'Seguimento e falha terapêutica',p:['Persistência de febre ou piora após tratamento de abscesso exige revisar adequação do antimicrobiano, necessidade de drenagem, foco biliar e possibilidade de diagnóstico alternativo. A imagem não deve ser interpretada sem a evolução clínica.','Após intervenção hepática, sangramento, bile no dreno, coleção e insuficiência hepática requerem avaliação direcionada. Em lesão benigna observada, mudança do padrão, crescimento ou sintomas discordantes motivam reavaliação, sem transformar todo achado incidental em indicação de cirurgia.']}
],
exam:[{c:'Lesão hepática incidental com padrão vascular típico de hemangioma.',p:'Pedir biópsia apenas para confirmar qualquer nódulo.',r:'Valorizar a caracterização por imagem e evitar punção desnecessária de lesão vascular.'},{c:'Mulher com exposição hormonal e adenoma.',p:'Tratar como hiperplasia nodular focal sem discutir risco.',r:'Rever exposição e estratificar risco de sangramento e transformação.'},{c:'Coleção hepática com suspeita amebiana.',p:'Drenar automaticamente toda coleção.',r:'Tratar a etiologia e reservar drenagem para cenários selecionados.'},{c:'Cisto com vesículas filhas e contexto epidemiológico compatível.',p:'Puncionar como um cisto simples.',r:'Pensar em hidatidose e planejar tratamento especializado.'}],
cases:[{title:'Nódulo incidental não é sinônimo de biópsia',data:['Pessoa sem doença hepática conhecida tem lesão com padrão típico de hemangioma.','Está sem sintomas relacionados ao achado.'],reasoning:['O padrão característico pode fornecer diagnóstico sem punção.','O risco de uma intervenção desnecessária deve ser considerado.'],conduct:['Confirmar coerência da caracterização e do contexto.','Orientar observação ou investigação adicional conforme a segurança do diagnóstico.'],error:'Biopsiar rotineiramente uma lesão vascular típica.'},{title:'Abscesso que não melhora pede revisão do foco',data:['Paciente tratado por abscesso hepático persiste febril.','Há antecedente de obstrução biliar.'],reasoning:['O tratamento pode estar incompleto se a fonte de contaminação persistir.','Drenagem e antimicrobiano precisam ser reavaliados no contexto.'],conduct:['Rever a anatomia biliar e o controle do foco.','Reavaliar material microbiológico, tratamento e possíveis diagnósticos alternativos.'],error:'Trocar repetidamente antibiótico sem avaliar a origem e a drenagem.'}],
recall:[{q:'Por que diferenciar HNF de adenoma muda a conduta?',a:'Porque o risco de sangramento e transformação não é equivalente entre essas lesões.'},{q:'O que procurar no abscesso piogênico além da coleção?',a:'A fonte biliar ou intra-abdominal, além de fatores predisponentes e dados microbiológicos.'},{q:'Qual o problema de puncionar cisto hidático sem planejamento?',a:'Pode haver extravasamento, disseminação e reação anafilática.'}]
},
cirfig_1:{
pretest:['Por que tratar apenas o nódulo pode não resolver o problema do cirrótico?','Por que um fígado sem cirrose não torna obrigatória a mesma investigação em todos os pacientes?'],
sections:[
{h:'Tumor, parênquima e estado funcional entram na mesma decisão',p:['A decisão no hepatocarcinoma depende da carga tumoral, mas também da função do fígado e da condição clínica. Uma ressecção tecnicamente possível pode ser mal tolerada quando o remanescente não sustenta a função. O transplante, em pacientes selecionados, pode tratar simultaneamente tumor e doença de base.','Critérios não invasivos de imagem devem ser aplicados apenas às populações em que foram validados. Alguns grupos com hepatite B sem cirrose também podem ser avaliados dessa forma; fora desses contextos, a necessidade de confirmação histológica deve ser discutida. Não decidir biópsia apenas pela palavra cirrose.'],table:{head:['Dimensão da decisão','O que avaliar','Risco de ignorar'],rows:[['Carga tumoral','Número, localização, relação vascular e doença fora do fígado','Escolher tratamento local insuficiente'],['Reserva hepática','Função, hipertensão portal e remanescente','Descompensação após procedimento'],['Estado funcional','Capacidade de tolerar e obter benefício','Tratamento desproporcional ao contexto'],['Biologia e evolução','Comportamento e resposta ao tratamento','Confundir possibilidade técnica com benefício oncológico']]}},
{h:'Princípios das estratégias locais e sistêmicas',list:['Na ressecção, planejar margens e remanescente funcional com atenção à anatomia vascular e biliar.','A ablação trata lesões selecionadas e depende de acesso seguro e relações com estruturas adjacentes.','Tratamentos transarteriais exploram características de vascularização tumoral, mas exigem reserva e seleção adequadas.','Escolha e sequência de terapias sistêmicas devem considerar função hepática, risco de sangramento e atualização especializada; a preferência mais recente por subgrupo é a confirmar.']},
{h:'Depois do tratamento: distinguir recidiva e descompensação',p:['Acompanhamento busca resposta tumoral, recorrência e deterioração da doença hepática. Ascite, encefalopatia, icterícia e sangramento podem refletir perda de reserva e mudam o planejamento, mesmo quando a lesão tratada parece controlada.','Nas metástases hepáticas, a possibilidade de ressecção depende de remover ou controlar toda a doença relevante e preservar remanescente adequado; o número de lesões isoladamente não resume essa decisão. A discussão combina anatomia, biologia e estratégia sistêmica.']}
],
exam:[{c:'Nódulo suspeito em pessoa com doença hepática de base.',p:'Definir o tratamento apenas pelo diâmetro.',r:'Integrar estágio tumoral, função hepática e condição clínica.'},{c:'Imagem típica em população elegível para diagnóstico não invasivo.',p:'Biopsiar automaticamente todo nódulo.',r:'Aplicar corretamente critérios de imagem ao grupo em que foram validados.'},{c:'Hepatite B sem cirrose e lesão suspeita.',p:'Afirmar que ausência de cirrose obriga sempre a mesma conduta.',r:'Avaliar o grupo de risco e a validade dos critérios diagnósticos no caso.'},{c:'Metástases hepáticas de câncer colorretal potencialmente tratáveis.',p:'Considerar toda metástase hepática indicação exclusiva de paliação.',r:'Avaliar ressecabilidade e controle global da doença em equipe especializada.'}],
cases:[{title:'A operação precisa deixar fígado que funcione',data:['Cirrótico tem tumor aparentemente removível.','Apresenta sinais relevantes de perda de reserva hepática.'],reasoning:['Ressecabilidade anatômica não equivale a tolerância funcional.','A doença de base interfere no benefício e no risco do tratamento.'],conduct:['Integrar carga tumoral, reserva e condição clínica.','Discutir alternativas como transplante ou terapias locais conforme elegibilidade.'],error:'Escolher ressecção apenas porque o tumor cabe em uma peça cirúrgica.'},{title:'Metástase não encerra toda possibilidade de intenção curativa',data:['Pessoa tratada por câncer colorretal apresenta doença hepática selecionada.','Não há impossibilidade óbvia de controle global da doença.'],reasoning:['Metástases colorretais podem integrar estratégias com intenção curativa em pacientes selecionados.','É necessário avaliar anatomia, biologia e remanescente.'],conduct:['Discutir com equipe hepatobiliar e oncologia.','Planejar sequência de tratamento sistêmico e local conforme o conjunto de achados.'],error:'Excluir avaliação de tratamento local apenas pelo termo metástase.'}],
recall:[{q:'Quais componentes devem acompanhar a carga tumoral na decisão?',a:'Reserva hepática, hipertensão portal, estado funcional, anatomia e contexto oncológico.'},{q:'A ausência de cirrose obriga biópsia em todo caso?',a:'Não de forma automática. Alguns grupos de risco, como pacientes selecionados com hepatite B, também podem ter critérios não invasivos aplicáveis.'},{q:'Por que contar metástases não basta para definir ressecabilidade?',a:'Porque distribuição, remanescente, controle da doença e biologia também determinam a possibilidade de benefício.'}]
},
cirfig_2:{
pretest:['Por que o sangramento varicoso exige tratar mais que a lesão vista na endoscopia?','Quais consequências da derivação portossistêmica precisam ser discutidas antes do TIPS?'],
sections:[
{h:'Resistência vascular e circulação colateral',p:['Na cirrose, resistência intra-hepática e alterações circulatórias aumentam a pressão portal. As colaterais desviam fluxo, mas podem sangrar; tratá-las localmente não elimina a fisiopatologia portal. Isso explica a associação de medidas farmacológicas, endoscópicas e, em cenários selecionados, derivação.','O gradiente venoso hepático não representa de modo equivalente todas as formas pré-sinusoidais de hipertensão portal. História, anatomia vascular e função hepática ajudam a distinguir cirrose, esquistossomose e tromboses.'],table:{head:['Situação','Pista','Implicação'],rows:[['Cirrose','Comprometimento de parênquima e possível disfunção','Avaliar reserva, descompensação e transplante'],['Doença pré-sinusoidal','Esplenomegalia e hipertensão portal com função relativamente preservada','Não extrapolar todos os marcadores e tratamentos da cirrose'],['Trombose esplênica','Hipertensão portal segmentar, contexto pancreático','Investigar mecanismo regional'],['Derivação portossistêmica','Redução da pressão com desvio do sangue do fígado','Balancear controle do sangramento e risco de encefalopatia']]}},
{h:'Princípios do atendimento e do resgate',list:['Estabilizar perfusão e proteger via aérea quando a situação clínica exige, evitando tanto atraso quanto excesso indiscriminado de expansão.','Iniciar as medidas específicas para hemorragia portal e realizar controle endoscópico no contexto apropriado.','Se o sangramento não é controlado, medidas temporárias devem funcionar como ponte para tratamento definitivo, com vigilância de suas complicações.','Antes de TIPS, integrar reserva hepática, encefalopatia, condição cardíaca e possibilidade de transplante; a indicação não depende apenas da disponibilidade técnica.']},
{h:'Depois do primeiro sangramento',p:['Controlar o episódio não dispensa prevenção secundária e tratamento da doença de base. Adesão, tolerância ao medicamento e necessidade de seguimento endoscópico devem ser abordadas no plano de alta.','Encefalopatia e piora funcional podem ocorrer após derivação. Nova hemorragia pode refletir persistência de hipertensão portal ou disfunção de uma derivação prévia. A reavaliação deve identificar o mecanismo, em vez de repetir indefinidamente medidas de ponte.']}
],
exam:[{c:'Cirrótico com hemorragia digestiva e suspeita de varizes.',p:'Esperar a endoscopia para começar todo tratamento específico.',r:'Iniciar suporte e medidas farmacológicas indicadas enquanto organiza o controle endoscópico.'},{c:'Sangramento persiste apesar da abordagem inicial.',p:'Tratar balão ou prótese temporária como solução definitiva.',r:'Usar recurso de ponte quando indicado e organizar resgate definitivo.'},{c:'Sangramento foi controlado e paciente terá alta.',p:'Encerrar tratamento porque a variz foi ligada.',r:'Planejar profilaxia secundária e seguimento da doença hepática.'},{c:'Proposta de TIPS em pessoa com reserva limitada ou risco de encefalopatia.',p:'Considerar só a queda esperada da pressão portal.',r:'Avaliar benefício, contraindicações, risco funcional e estratégia global.'}],
cases:[{title:'Controle local faz parte de um pacote',data:['Cirrótico com hematêmese e sinais de repercussão circulatória.','Há forte suspeita de origem varicosa.'],reasoning:['A causa envolve hipertensão portal e o paciente também tem risco de infecção.','A organização da endoscopia não deve atrasar medidas iniciais indicadas.'],conduct:['Instituir suporte e tratamento específico conforme o protocolo e a condição clínica.','Realizar controle endoscópico e avaliar necessidade de estratégia adicional.'],error:'Esperar o laudo endoscópico para iniciar todas as medidas.'},{title:'A ponte precisa levar a um destino',data:['Hemorragia portal não foi controlada pela abordagem inicial.','Um recurso temporário foi usado para conter o sangramento.'],reasoning:['A contenção temporária não remove o mecanismo e traz riscos próprios.','É preciso planejar tratamento definitivo conforme elegibilidade e gravidade.'],conduct:['Monitorar e organizar resgate especializado, considerando derivação e outras opções adequadas.','Reavaliar reserva e possibilidade de transplante no planejamento global.'],error:'Manter indefinidamente o recurso de ponte sem plano definitivo.'}],
recall:[{q:'Por que ligadura não resolve toda a fisiopatologia?',a:'Porque trata a variz, mas a hipertensão portal e a doença hepática de base podem persistir.'},{q:'Que riscos entram na avaliação antes do TIPS?',a:'Encefalopatia, reserva hepática e repercussão cardíaca, além de contraindicações e objetivos do tratamento.'},{q:'Controle do primeiro sangramento encerra o tratamento?',a:'Não. Exige profilaxia secundária, seguimento e manejo da doença de base.'}]
}
};
for(const [key,add] of Object.entries(extra)){
 const lesson=entries[key];
 lesson.pretest.push(...add.pretest);
 lesson.sections.push(...add.sections);
 lesson.recall.push(...add.recall);
 lesson.exam=add.exam;
 lesson.cases=add.cases;
 lesson.note+=' Conferência online de atualizações das fontes: a confirmar.';
}
LessonDeep.add(entries);
})();
