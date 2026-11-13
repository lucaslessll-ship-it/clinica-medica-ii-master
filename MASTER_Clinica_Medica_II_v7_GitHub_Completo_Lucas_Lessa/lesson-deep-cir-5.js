/* Estudo aprofundado · Cirurgia · Revisão da P1: esôfago, estômago, vias biliares e fígado. Texto original. */
LessonDeep.add({
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
 reasoning:['Precoce é definido pela profundidade, não pelos linfonodos.','Linite plástica é Borrmann IV e Lauren difuso.','Carcinomatose não aparece na TC: laparoscopia de estadiamento.'],
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
   'Nódulo de 1 cm ou mais em cirrótico: tomografia ou ressonância multifásica. Hiper-realce na fase arterial com lavagem (washout) na fase portal ou tardia é diagnóstico de hepatocarcinoma (LI-RADS 5) e dispensa biópsia. Em fígado não cirrótico, a biópsia é necessária.']},
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
});
