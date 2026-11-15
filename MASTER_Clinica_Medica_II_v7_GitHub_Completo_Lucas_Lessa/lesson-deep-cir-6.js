/* Estudo aprofundado · Radiologia e Urologia. Texto original; referências ao final de cada aula. */
(()=>{
const entries={
'cirrad_0':{
 updated:'2026-11',
 pretest:['Quais incidências compõem a rotina radiológica de abdome agudo?','Como diferenciar delgado de cólon na radiografia?','O que é a alça sentinela?','Como diferenciar gás portal de pneumobilia?'],
 sections:[
  {h:'Rotina de abdome agudo',p:['Radiografia de tórax em pé (pneumoperitônio sob as cúpulas e causas torácicas de dor abdominal, como pneumonia de base) e radiografias de abdome em pé e deitado. Quem não fica em pé faz decúbito lateral esquerdo com raios horizontais. A radiografia é pouco sensível e foi superada pela tomografia, mas segue útil e muito cobrada.']},
  {h:'Sinais que caem',table:{head:['Sinal','Significado'],rows:[
   ['Ar sob as cúpulas diafragmáticas','Pneumoperitônio'],
   ['Sinal de Rigler (dupla parede)','Pneumoperitônio na radiografia deitado'],
   ['Ligamento falciforme visível; bola de futebol','Pneumoperitônio volumoso (este último em lactentes)'],
   ['Empilhamento de moedas (pregas coniventes que cruzam toda a alça)','Delgado dilatado'],
   ['Haustrações que não cruzam toda a alça, alças periféricas','Cólon dilatado'],
   ['Níveis hidroaéreos em degrau, ausência de ar no reto','Obstrução mecânica'],
   ['Grão de café ou U invertido','Volvo de sigmoide'],
   ['Alça sentinela','Íleo localizado de uma alça próxima a um foco inflamatório (pancreatite, apendicite)'],
   ['Cólon amputado (cut-off)','Dilatação do cólon transverso com interrupção no ângulo esplênico, sugestivo de pancreatite'],
   ['Ar nas vias biliares, central','Pneumobilia: papilotomia, anastomose biliodigestiva, íleo biliar'],
   ['Ar em ramos portais, periférico','Gás portal: isquemia mesentérica grave, enterocolite necrosante'],
   ['Pneumatose intestinal','Ar na parede da alça: isquemia, enterocolite necrosante'],
   ['Apagamento da linha do psoas','Processo retroperitoneal (hematoma, abscesso)']]},
   after:'Calcificações: cerca de 90% dos cálculos urinários são radiopacos, mas só cerca de 10 a 15% dos biliares. Fecalito, vesícula em porcelana e calcificações pancreáticas (pancreatite crônica) também aparecem.'}
 ],
 flow:{title:'Lendo a radiografia de abdome agudo',nodes:[
  {k:'start',t:'Rotina de abdome agudo'},
  {k:'ask',t:'Ar livre sob o diafragma ou Rigler?',yes:'Pneumoperitônio: perfuração',no:'Seguir'},
  {k:'ask',t:'Alças dilatadas com níveis?',yes:'Delgado (moedas, central) ou cólon (haustrações, periférico)',no:'Seguir'},
  {k:'ask',t:'Grão de café?',yes:'Volvo de sigmoide',no:'Seguir'},
  {k:'do',t:'Procurar gás em locais anormais: vias biliares, porta, parede intestinal'},
  {k:'end',t:'Dúvida: tomografia'}]},
 reasoning:['Gás portal vai até a periferia do fígado; pneumobilia fica no hilo.','Rigler sinal é pneumoperitônio; Rigler tríade é íleo biliar.','Radiografia normal não exclui abdome cirúrgico.'],
 mnemonics:[{n:'Moedas no delgado, haustros no cólon',t:'Padrão das pregas.'},{n:'Central é bile, periférico é porta',t:'Pneumobilia versus gás portal.'},{n:'Sentinela e amputado',t:'Sinais radiológicos de pancreatite.'}],
 pitfalls:['Confundir gás portal com pneumobilia.','Excluir cálculo biliar porque a radiografia está normal.','Pedir só abdome sem radiografia de tórax em pé.'],
 recall:[{q:'Incidências da rotina de abdome agudo?',a:'Tórax em pé e abdome em pé e deitado.'},{q:'O que é alça sentinela?',a:'Íleo localizado de uma alça junto a foco inflamatório.'},{q:'Diferença entre gás portal e pneumobilia?',a:'Gás portal é periférico; pneumobilia é central, no hilo.'},{q:'Sinal radiológico do volvo de sigmoide?',a:'Grão de café ou U invertido.'},{q:'Proporção de cálculos biliares radiopacos?',a:'Cerca de 10 a 15%.'}],
 practice:['Descreva uma radiografia com empilhamento de moedas e níveis em degrau sem ar no reto.'],
 refs:[{t:'Gans SL, et al. Guideline for the diagnostic pathway in patients with acute abdominal pain. Dig Surg. 2015.',q:'Gans guideline diagnostic pathway acute abdominal pain Dig Surg 2015'},{t:'Brant WE, Helms CA. Fundamentals of Diagnostic Radiology. Capítulo de abdome.',q:'Brant Helms Fundamentals of Diagnostic Radiology abdomen'}],
 note:'Diretriz de investigação da dor abdominal aguda e livro de radiologia.'
},
'cirrad_1':{
 updated:'2026-11',
 pretest:['Quais achados tomográficos indicam apendicite?','O que é o sinal do redemoinho?','Como se calcula o índice de gravidade tomográfico da pancreatite?','Quando evitar contraste iodado?'],
 sections:[
  {h:'Achados por doença',table:{head:['Doença','Achados na TC'],rows:[
   ['Apendicite','Apêndice com mais de 6 mm, parede espessada com realce, densificação da gordura, apendicolito; abscesso ou ar extraluminal se complicada'],
   ['Diverticulite','Espessamento segmentar do cólon com divertículos, densificação da gordura pericólica, abscesso, ar extraluminal'],
   ['Obstrução','Ponto de transição, sinal das fezes no delgado, alça fechada em C ou U, sinal do redemoinho (volvo)'],
   ['Sofrimento de alça','Parede sem realce, pneumatose, gás portal, líquido livre, mesentério edemaciado'],
   ['Isquemia mesentérica (angioTC)','Falha de enchimento na mesentérica superior, parede sem realce ou espessada, pneumatose'],
   ['Perfuração','Gás extraluminal, mesmo em pequenas bolhas']]}},
  {h:'Pancreatite na tomografia',table:{head:['Balthazar','Achado','Pontos'],rows:[
   ['A','Pâncreas normal','0'],['B','Aumento focal ou difuso','1'],['C','Inflamação peripancreática','2'],['D','Uma coleção','3'],['E','Duas ou mais coleções ou gás','4']]},
   after:'O índice de gravidade tomográfico soma Balthazar e necrose (sem necrose 0, até 30% 2, de 30 a 50% 4, acima de 50% 6). De 7 a 10 pontos indica maior gravidade tomográfica pelo CTSI clássico; essa categoria não substitui a gravidade clínica de Atlanta. Para avaliação de necrose, a janela tradicional de 72 a 96 horas reduz a subestimação de exame muito precoce; incerteza diagnóstica, deterioração ou suspeita de outra causa podem justificar TC antes. A atualização online dessa janela permanece a confirmar.'},
  {h:'Contraste e segurança',list:['Contraste iodado intravenoso: avaliar risco com taxa de filtração abaixo de 30 mL/min e alergia prévia (pré-medicação conforme protocolo). Na emergência grave, o benefício costuma superar o risco.','Metformina: suspender se função renal reduzida, conforme protocolo.','Gestante: ultrassonografia e ressonância sem gadolínio primeiro.','Tomografia sem contraste é o padrão na cólica renal.']}
 ],
 flow:{title:'Qual tomografia pedir',nodes:[
  {k:'start',t:'Abdome agudo em adulto estável'},
  {k:'ask',t:'Suspeita de cólica renal?',yes:'TC sem contraste em baixa dose',no:'Seguir'},
  {k:'ask',t:'Suspeita de isquemia mesentérica ou sangramento?',yes:'AngioTC com fases arterial e venosa',no:'TC com contraste na fase portal'},
  {k:'ask',t:'Pancreatite típica nas primeiras 72 horas?',yes:'Não precisa de TC para diagnóstico',no:'TC conforme dúvida'},
  {k:'do',t:'Avaliar função renal e alergia antes do contraste'},
  {k:'end',t:'Gestante: ultrassonografia e ressonância'}]},
 reasoning:['Redemoinho no mesentério: volvo.','Pancreatite: TC cedo subestima a necrose.','Cálculo urinário se vê melhor sem contraste.'],
 mnemonics:[{n:'Seis milímetros',t:'Apêndice acima de 6 mm.'},{n:'Balthazar ABCDE',t:'Normal, aumentado, inflamação, uma coleção, duas ou gás.'},{n:'Sem contraste para pedra',t:'TC de cólica renal.'}],
 pitfalls:['Pedir TC com contraste para cólica renal.','TC no primeiro dia de pancreatite típica.','Negar TC com contraste a paciente grave por medo de nefropatia.'],
 recall:[{q:'Calibre do apêndice sugestivo de apendicite?',a:'Acima de 6 mm.'},{q:'O que é Balthazar E?',a:'Duas ou mais coleções ou gás.'},{q:'Índice de gravidade tomográfico grave?',a:'7 a 10 pontos.'},{q:'O que é sinal do redemoinho?',a:'Torção do mesentério em volta do eixo vascular, indicando volvo.'},{q:'TC na cólica renal?',a:'Sem contraste, em baixa dose.'}],
 practice:['Calcule o índice: Balthazar D com necrose de 40%.'],
 refs:[{t:'Balthazar EJ, et al. Acute pancreatitis: value of CT in establishing prognosis. Radiology. 1990.',q:'Balthazar acute pancreatitis value of CT establishing prognosis Radiology 1990'},{t:'American College of Radiology. ACR Appropriateness Criteria: right lower quadrant pain, left lower quadrant pain, acute nonlocalized abdominal pain.',q:'ACR Appropriateness Criteria acute nonlocalized abdominal pain'},{t:'ACR Committee on Drugs and Contrast Media. ACR Manual on Contrast Media.',q:'ACR Manual on Contrast Media'}],
 note:'Critérios de adequação do colégio americano de radiologia.'
},
'cirrad_2':{
 updated:'2026-11',
 pretest:['Como fazer a varredura do quadrante superior direito no FAST?','Quais achados do eFAST indicam pneumotórax?','O que é o ponto pulmonar?','Como aparece o pneumotórax na radiografia em decúbito?'],
 sections:[
  {h:'FAST e eFAST',p:['O FAST procura líquido livre em quatro janelas: pericárdica, quadrante superior direito (espaço hepatorrenal e borda inferior do fígado), esplenorrenal e pélvica. A sensibilidade depende de volume, distribuição, técnica e momento do exame. Não avalia retroperitônio nem víscera oca, e um exame negativo deve ser repetido se a clínica mudar.','O eFAST acrescenta o tórax: no pneumotórax, desaparecem o deslizamento pleural e as linhas B; no modo M, o padrão de praia (seashore) vira código de barras (estratosfera). O ponto pulmonar, onde o pulmão volta a tocar a parede, é o achado mais específico.'],
   after:'O curso de POCUS do site detalha as janelas com imagens comentadas.'},
  {h:'Radiografias da sala de trauma',list:['<strong>Tórax AP:</strong> pneumotórax (linha pleural, sinal do sulco profundo no decúbito), hemotórax (velamento difuso no decúbito; em pé, apaga o seio costofrênico a partir de cerca de 200 a 300 mL), mediastino alargado, fraturas, posição de tubos.','<strong>Pelve AP:</strong> fraturas instáveis em livro aberto.','A radiografia não deve atrasar a descompressão de um pneumotórax hipertensivo.']},
  {h:'Tomografia no trauma',list:['Para o paciente estável. Gradua lesões de órgãos sólidos (AAST), mostra blush (sangramento ativo), lesões de víscera oca e retroperitônio.','Tomografia de corpo inteiro em politraumatizados graves estáveis acelera o diagnóstico.','Ar livre sem lesão de órgão sólido, ou líquido livre sem explicação, levanta suspeita de víscera oca.']}
 ],
 flow:{title:'Imagem no trauma',nodes:[
  {k:'start',t:'Politraumatizado na sala de emergência'},
  {k:'do',t:'eFAST, radiografia de tórax e pelve durante o exame primário'},
  {k:'ask',t:'Instável com FAST positivo?',yes:'Centro cirúrgico',no:'Seguir'},
  {k:'ask',t:'Ausência de deslizamento pleural e ponto pulmonar?',yes:'Pneumotórax provável: avaliar repercussão e necessidade de drenagem conforme o contexto',no:'Seguir'},
  {k:'ask',t:'Estável?',yes:'Tomografia com contraste',no:'Procurar outras fontes e repetir FAST'},
  {k:'end',t:'Blush no estável: discutir controle conforme órgão, lesão e recursos disponíveis'}]},
 reasoning:['A janela direita deve varrer Morison e a borda inferior do fígado; uma imagem fixa não avalia toda a região dependente.','Ponto pulmonar confirma pneumotórax.','TC é para quem pode ir ao tomógrafo com segurança.'],
 mnemonics:[{n:'Praia versus código de barras',t:'Modo M normal versus pneumotórax.'},{n:'Morison e borda do fígado',t:'Varredura do quadrante superior direito, sem limitar a uma imagem fixa.'},{n:'Sulco profundo',t:'Pneumotórax na radiografia em decúbito.'}],
 pitfalls:['Excluir lesão abdominal com um FAST negativo isolado.','Esperar radiografia para descomprimir pneumotórax hipertensivo.','Levar instável à TC.'],
 recall:[{q:'O que varrer no quadrante superior direito do FAST?',a:'Espaço hepatorrenal, borda inferior do fígado e regiões dependentes acessíveis.'},{q:'Achado mais específico de pneumotórax no ultrassom?',a:'Ponto pulmonar.'},{q:'Modo M no pneumotórax?',a:'Padrão de código de barras.'},{q:'Sinal de pneumotórax na radiografia em decúbito?',a:'Sulco profundo.'},{q:'O que é blush?',a:'Extravasamento de contraste indicando sangramento ativo.'}],
 practice:['Descreva o eFAST normal e com pneumotórax direito.'],
 refs:[{t:'American College of Surgeons. Advanced Trauma Life Support, 11ª edição. 2025.',q:'ATLS 11th edition'},{t:'Volpicelli G, et al. International evidence-based recommendations for point-of-care lung ultrasound. Intensive Care Med. 2012.',q:'international evidence-based recommendations point-of-care lung ultrasound 2012'}],
 note:'ATLS 11 e recomendações internacionais de ultrassom pulmonar.'
},
'cirrad_3':{
 updated:'2026-11',
 pretest:['Qual exame mostra sangramento com o menor fluxo?','Qual exame localiza e trata o sangramento ativo?','Como diagnosticar sangramento por divertículo de Meckel?','Qual a causa mais comum de hemorragia digestiva baixa no idoso?'],
 sections:[
  {h:'Métodos e sensibilidade',table:{head:['Exame','Fluxo detectável aproximado','Vantagem','Limitação'],rows:[
   ['Cintilografia com hemácias marcadas','0,05 a 0,1 mL/min','O mais sensível; detecta sangramento intermitente','Localização imprecisa; não trata'],
   ['AngioTC','0,3 a 0,5 mL/min','Rápida, localiza com precisão, guia a angiografia','Contraste; não trata'],
   ['Arteriografia','0,5 a 1 mL/min','Diagnóstica e terapêutica (embolização)','Invasiva; exige sangramento ativo'],
   ['Colonoscopia','Não depende de fluxo','Diagnóstica e terapêutica no estável','Precisa de preparo; visão limitada no sangramento maciço'],
   ['Cápsula endoscópica','Não depende de fluxo','Delgado (sangramento obscuro)','Não trata; risco de retenção']]}},
  {h:'Raciocínio',list:['Hematoquezia com instabilidade: excluir fonte alta (até cerca de 10 a 15% das hemorragias que parecem baixas vêm do trato alto) com endoscopia digestiva alta.','Estável: colonoscopia após preparo e avaliação clínica; não usar urgência por relógio como regra para todo paciente. A diretriz citada deve ser conferida online para atualização.','Instável ou sangramento ativo intenso: angioTC e, se positiva, arteriografia com embolização.','Causas mais comuns no idoso: doença diverticular (sangramento indolor e volumoso, muitas vezes do cólon direito) e angiodisplasia (associada à estenose aórtica, síndrome de Heyde).','Criança com sangramento indolor: divertículo de Meckel, diagnosticado por cintilografia com pertecnetato de tecnécio, que capta a mucosa gástrica ectópica.']}
 ],
 flow:{title:'Hemorragia digestiva baixa',nodes:[
  {k:'start',t:'Hematoquezia'},
  {k:'do',t:'Reanimação, hemograma, coagulação, tipagem'},
  {k:'ask',t:'Instável?',yes:'Reanimar e localizar a fonte com urgência; considerar origem alta e angioTC conforme apresentação',no:'Colonoscopia após preparo'},
  {k:'ask',t:'AngioTC com extravasamento?',yes:'Arteriografia com embolização',no:'Colonoscopia; cintilografia se intermitente'},
  {k:'ask',t:'Fonte não encontrada?',yes:'Cápsula endoscópica do delgado',no:'Tratar a causa'},
  {k:'end',t:'Falha de tudo: cirurgia com localização prévia'}]},
 reasoning:['Cintilografia é a mais sensível, angiografia a que trata.','Sangramento intenso pelo reto pode vir do duodeno.','Meckel: pertecnetato, não hemácias marcadas.'],
 mnemonics:[{n:'0,1 / 0,5 / 1',t:'Cintilografia, angioTC, arteriografia, em ordem de fluxo mínimo.'},{n:'Heyde',t:'Angiodisplasia com estenose aórtica.'},{n:'Meckel: regra dos 2',t:'2% da população, 2 pés da válvula ileocecal, 2 tipos de mucosa ectópica, sintomas antes dos 2 anos.'}],
 pitfalls:['Pedir arteriografia sem sangramento ativo.','Esquecer EDA na hematoquezia volumosa com instabilidade.','Usar cintilografia com hemácias para Meckel.'],
 recall:[{q:'Exame mais sensível para sangramento?',a:'Cintilografia com hemácias marcadas.'},{q:'Exame que diagnostica e trata o sangramento arterial?',a:'Arteriografia com embolização.'},{q:'Exame para Meckel?',a:'Cintilografia com pertecnetato de tecnécio.'},{q:'Causa mais comum de HDB no idoso?',a:'Doença diverticular.'},{q:'O que é síndrome de Heyde?',a:'Angiodisplasia com estenose aórtica.'}],
 practice:['Ordene os exames por sensibilidade e diga qual trata.'],
 refs:[{t:'Triantafyllou K, et al. Diagnosis and management of acute lower gastrointestinal bleeding: ESGE guideline. Endoscopy. 2021.',q:'ESGE guideline acute lower gastrointestinal bleeding 2021'},{t:'Sengupta N, et al. Management of patients with acute lower gastrointestinal bleeding: ACG guideline update. Am J Gastroenterol. 2023.',q:'ACG guideline update acute lower gastrointestinal bleeding 2023'}],
 note:'Diretrizes europeia e americana de hemorragia digestiva baixa.'
},
'cirrad_4':{
 updated:'2026-11',
 pretest:['Qual contraste usar na suspeita de perfuração esofágica?','Qual o aspecto da acalasia e do espasmo esofágico distal no esofagograma?','Como diferenciar úlcera gástrica benigna de maligna no contraste?','O que é o sinal da dupla bolha?'],
 sections:[
  {h:'Esôfago',table:{head:['Achado','Diagnóstico'],rows:[
   ['Afilamento distal em bico de pássaro com dilatação','Acalasia'],
   ['Saca-rolhas ou contas de rosário','Espasmo esofágico distal'],
   ['Bolsa posterior na transição faringoesofágica','Divertículo de Zenker'],
   ['Estenose irregular com bordas em degrau','Neoplasia'],
   ['Junção esofagogástrica acima do diafragma','Hérnia de hiato por deslizamento (tipo I)'],
   ['Junção no lugar e fundo gástrico ao lado do esôfago no tórax','Hérnia paraesofágica (tipo II), risco de volvo; tende à cirurgia'],
   ['Anel fino na junção','Anel de Schatzki (disfagia intermitente para sólidos)']]},
   after:'Na suspeita de perfuração, usar primeiro contraste hidrossolúvel iodado; se negativo, bário dá mais detalhe. Em risco de aspiração, evitar contraste hiperosmolar iodado (edema pulmonar).'},
  {h:'Estômago e duodeno',table:{head:['Achado','Diagnóstico'],rows:[
   ['Úlcera que se projeta além do contorno, pregas que chegam até a cratera, colar de Hampton','Úlcera benigna'],
   ['Úlcera dentro do contorno, pregas interrompidas ou nodulares, massa','Úlcera maligna'],
   ['Estômago rígido, sem distensão, em garrafa de couro','Linite plástica'],
   ['Lactente com vômitos em jato: piloro com músculo de 3 a 4 mm ou mais e canal de 15 a 16 mm ou mais na ultrassonografia; sinal do cordão no contraste','Estenose hipertrófica do piloro'],
   ['Dupla bolha (estômago e duodeno) sem gás distal','Atresia duodenal ou pâncreas anular'],
   ['Junção duodenojejunal à direita, duodeno em saca-rolhas, vômitos biliosos no recém-nascido','Má rotação com volvo do intestino médio (emergência)'],
   ['Compressão do terceiro duodeno entre aorta e mesentérica superior em paciente emagrecido','Síndrome da artéria mesentérica superior']]}}
 ],
 flow:{title:'Estudo contrastado do trato alto',nodes:[
  {k:'start',t:'Disfagia ou vômitos'},
  {k:'ask',t:'Suspeita de perfuração?',yes:'Contraste hidrossolúvel primeiro',no:'Bário'},
  {k:'ask',t:'Bico de pássaro?',yes:'Acalasia: manometria e endoscopia',no:'Seguir'},
  {k:'ask',t:'Úlcera gástrica?',yes:'Avaliar critérios de benignidade e biopsiar na endoscopia',no:'Seguir'},
  {k:'ask',t:'Recém-nascido com vômito bilioso?',yes:'Excluir má rotação com volvo: urgência',no:'Seguir investigação'},
  {k:'end',t:'Toda úlcera gástrica precisa de biópsia endoscópica'}]},
 reasoning:['Vômito bilioso no recém-nascido é cirúrgico até prova em contrário.','Projeta para fora é benigna; dentro do contorno é suspeita.','Hérnia paraesofágica exige avaliar sintomas, complicações e condições clínicas antes de decidir cirurgia.'],
 mnemonics:[{n:'Bico e saca-rolhas',t:'Acalasia e espasmo esofágico distal.'},{n:'Dupla bolha',t:'Atresia duodenal.'},{n:'Hampton benigno',t:'Colar de Hampton em úlcera benigna.'}],
 pitfalls:['Usar bário na suspeita de perfuração como primeiro exame.','Esquecer biópsia em úlcera gástrica de aparência benigna.','Tratar vômito bilioso neonatal como refluxo.'],
 recall:[{q:'Contraste inicial na suspeita de perfuração esofágica?',a:'Hidrossolúvel iodado.'},{q:'Aspecto do espasmo esofágico distal?',a:'Saca-rolhas ou contas de rosário.'},{q:'O que é hérnia paraesofágica?',a:'Junção no lugar com fundo gástrico subindo ao lado do esôfago (tipo II).'},{q:'Critério ultrassonográfico de estenose hipertrófica do piloro?',a:'Espessura muscular de 3 a 4 mm ou mais e canal de 15 a 16 mm ou mais.'},{q:'Dupla bolha sugere o quê?',a:'Atresia duodenal ou pâncreas anular.'}],
 practice:['Liste três critérios de úlcera benigna e três de maligna no contraste.'],
 refs:[{t:'Levine MS, et al. Barium esophagography: a study in contrasts. Radiology. 2016.',q:'Levine barium esophagography a study in contrasts Radiology 2016'},{t:'Kohn GP, et al. SAGES guidelines for the management of hiatal hernia. Surg Endosc. 2013.',q:'SAGES guidelines management of hiatal hernia 2013'}],
 note:'Revisão de esofagografia e diretriz de hérnia de hiato.'
},
'cirrad_5':{
 updated:'2026-11',
 pretest:['Como aparece o hemangioma na fase dinâmica?','Quais metástases hepáticas são hipervasculares?','O que é o sinal do duplo ducto?','Qual o calibre normal do colédoco?'],
 sections:[
  {h:'Fígado',table:{head:['Lesão','Imagem típica'],rows:[
   ['Cisto simples','Anecoico com reforço acústico posterior; sem realce'],
   ['Hemangioma','Realce periférico nodular e descontínuo com enchimento centrípeto progressivo'],
   ['Hiperplasia nodular focal','Realce arterial homogêneo, cicatriz central com realce tardio, iso ou hiperintensa na fase hepatobiliar'],
   ['Adenoma','Gordura intracelular (queda de sinal na fase fora de fase), hemorragia, hipointenso na fase hepatobiliar'],
   ['Hepatocarcinoma','Hiper-realce arterial, washout portal ou tardio, cápsula'],
   ['Metástase hipovascular (colorretal, a mais comum)','Hipoatenuante na fase portal, realce periférico em alvo'],
   ['Metástase hipervascular','Neuroendócrino, rim, melanoma, tireoide, mama'],
   ['Abscesso','Realce periférico, duplo alvo, gás'],
   ['Hidatidose','Vesículas filhas, membrana descolada (lírio d água), calcificações']]},
   after:'Cirrose na ultrassonografia: contornos nodulares, lobo caudado aumentado, esplenomegalia, ascite e fluxo portal reduzido ou invertido (hepatofugal). Esteatose: fígado hiperecogênico.'},
  {h:'Vias biliares',list:['Colédoco normal até cerca de 6 mm, com tolerância maior em idosos (cerca de 1 mm por década após os 60) e após colecistectomia (até cerca de 10 mm).','Colangiorressonância: exame não invasivo de escolha; cálculo aparece como falha de enchimento escura em T2.','Dilatação intra e extra-hepática: obstrução distal (cálculo, pâncreas, ampola). Só intra-hepática: obstrução hilar (Klatskin).']},
  {h:'Pâncreas',list:['<strong>Adenocarcinoma:</strong> massa hipoatenuante na fase pancreática; sinal do duplo ducto (dilatação do colédoco e do Wirsung) no tumor de cabeça.','<strong>Neuroendócrino:</strong> lesão hipervascular.','<strong>Cistoadenoma seroso:</strong> microcístico em favo de mel com cicatriz central calcificada.','<strong>Neoplasia cística mucinosa:</strong> macrocística, calcificação periférica em casca de ovo.','<strong>IPMN:</strong> cisto que comunica com o ducto.','<strong>Pancreatite crônica:</strong> calcificações e ducto em colar de contas (cadeia de lagos).']}
 ],
 flow:{title:'Lesão hepática focal',nodes:[
  {k:'start',t:'Nódulo hepático'},
  {k:'ask',t:'Anecoico sem realce?',yes:'Cisto simples',no:'Estudo multifásico'},
  {k:'ask',t:'Realce periférico nodular centrípeto?',yes:'Hemangioma',no:'Seguir'},
  {k:'ask',t:'Cirrótico com hiper-realce e washout?',yes:'Hepatocarcinoma',no:'Seguir'},
  {k:'ask',t:'Realce em alvo em paciente oncológico?',yes:'Metástase',no:'RM hepatobiliar: HNF versus adenoma'},
  {k:'end',t:'Dúvida persistente: biópsia ou ressecção'}]},
 reasoning:['Hemangioma acompanha o sangue: enche devagar de fora para dentro.','Duplo ducto sugere obstrução pancreática ou periampular; tumor é um diferencial importante, não a única causa.','Fase hepatobiliar ajuda a diferenciar HNF e adenoma, mas variantes exigem integrar todo o estudo.'],
 mnemonics:[{n:'Acende e lava',t:'Hepatocarcinoma.'},{n:'Duplo ducto',t:'Colédoco e Wirsung dilatados.'},{n:'Favo de mel seroso',t:'Cistoadenoma seroso.'}],
 pitfalls:['Biopsiar hemangioma.','Considerar colédoco de 9 mm patológico em idoso colecistectomizado sem outros dados.','Confundir cisto mucinoso com seroso.'],
 recall:[{q:'Padrão de realce do hemangioma?',a:'Periférico nodular com enchimento centrípeto.'},{q:'Cite três metástases hipervasculares.',a:'Neuroendócrino, rim, melanoma (também tireoide e mama).'},{q:'O que é sinal do duplo ducto?',a:'Dilatação do colédoco e do ducto pancreático, sugerindo tumor de cabeça de pâncreas ou ampola.'},{q:'Exame não invasivo de escolha para a via biliar?',a:'Colangiorressonância.'},{q:'Sinal ultrassonográfico de cirrose?',a:'Contornos nodulares, caudado aumentado, esplenomegalia, ascite.'}],
 practice:['Monte uma tabela de quatro lesões hepáticas com aspecto em fase arterial, portal e hepatobiliar.'],
 refs:[{t:'American College of Radiology. LI-RADS v2018.',q:'ACR LI-RADS v2018 CT MRI'},{t:'European Association for the Study of the Liver. EASL clinical practice guidelines on the management of benign liver tumours. J Hepatol. 2016.',q:'EASL clinical practice guidelines benign liver tumours 2016'}],
 note:'LI-RADS e diretriz europeia de tumores hepáticos benignos.'
},
'ciruro_0':{
 updated:'2026-11',
 pretest:['Como a fase da hematúria ajuda a localizar a origem?','O que diferencia hematúria glomerular de urológica?','Quais sintomas são de armazenamento e quais de esvaziamento?','Quem com hematúria precisa de cistoscopia?'],
 sections:[
  {h:'Hematúria',p:['Hematúria macroscópica sempre exige investigação. Microscópica é definida a partir de 3 hemácias por campo em uma amostra adequada e é investigada conforme o risco (idade, sexo, tabagismo, exposição ocupacional, grau de hematúria).'],
   table:{head:['Fase na micção','Origem provável'],rows:[['Inicial','Uretra'],['Terminal','Colo vesical ou próstata'],['Total','Bexiga, ureter ou rim']]},
   after:'Hematúria glomerular: hemácias dismórficas, cilindros hemáticos, proteinúria e piora da função renal; investigação nefrológica. Hematúria não glomerular em paciente com risco urotelial, considerando conjunto de fatores como tabagismo: urotomografia (TC com fase excretora) e cistoscopia, para excluir tumor urotelial.'},
  {h:'Sintomas do trato urinário inferior',table:{head:['Grupo','Sintomas'],rows:[['Armazenamento','Frequência, urgência, noctúria, incontinência de urgência'],['Esvaziamento','Jato fraco, hesitação, esforço, jato interrompido, gotejamento terminal'],['Pós-miccionais','Sensação de esvaziamento incompleto, gotejamento pós-miccional']]}},
  {h:'Exames urológicos',list:['Urina tipo 1 e urocultura.','PSA conforme idade e decisão compartilhada.','Ultrassonografia de rins, bexiga e próstata, com resíduo pós-miccional.','Urofluxometria: fluxo máximo abaixo de cerca de 10 mL/s sugere obstrução ou bexiga fraca.','Estudo urodinâmico: diferencia obstrução de hipocontratilidade e avalia incontinência complexa.','Retenção urinária aguda: sondagem vesical; se impossível, cistostomia suprapúbica.']}
 ],
 flow:{title:'Hematúria',nodes:[
  {k:'start',t:'Hematúria confirmada'},
  {k:'ask',t:'Sinais glomerulares (dismorfismo, cilindros, proteinúria)?',yes:'Investigação nefrológica',no:'Hematúria urológica'},
  {k:'ask',t:'Infecção ou causa benigna clara?',yes:'Tratar e repetir o exame de urina',no:'Seguir'},
  {k:'ask',t:'Macroscópica ou fatores de risco?',yes:'Urotomografia e cistoscopia',no:'Avaliação conforme risco'},
  {k:'do',t:'Citologia urinária em casos selecionados'},
  {k:'end',t:'Tabagista com hematúria total indolor: câncer de bexiga até prova em contrário'}]},
 reasoning:['Hematúria macroscópica indolor em tabagista: bexiga.','Dismorfismo e cilindros apontam o glomérulo.','Urgência e noctúria são de armazenamento; jato fraco é de esvaziamento.'],
 mnemonics:[{n:'Início uretra, fim colo, total alto',t:'Fases da hematúria.'},{n:'Três hemácias',t:'Definição de hematúria microscópica.'},{n:'TC mais cisto',t:'Urotomografia e cistoscopia.'}],
 pitfalls:['Atribuir hematúria a anticoagulante sem investigar.','Esquecer a cistoscopia, que a TC não substitui.','Confundir sintomas de armazenamento com obstrução.'],
 recall:[{q:'Hematúria terminal sugere qual origem?',a:'Colo vesical ou próstata.'},{q:'Achados de hematúria glomerular?',a:'Hemácias dismórficas, cilindros hemáticos e proteinúria.'},{q:'Investigação da hematúria macroscópica em tabagista?',a:'Urotomografia e cistoscopia.'},{q:'Cite dois sintomas de esvaziamento.',a:'Jato fraco, hesitação, esforço, gotejamento.'},{q:'Fluxo máximo sugestivo de obstrução?',a:'Abaixo de cerca de 10 mL/s.'}],
 practice:['Classifique os sintomas de um homem com noctúria, urgência, jato fraco e gotejamento.'],
 refs:[{t:'Barocas DA, et al. Microhematuria: AUA/SUFU guideline. J Urol. 2020.',q:'Microhematuria AUA SUFU guideline 2020'},{t:'European Association of Urology. EAU guidelines on management of non-neurogenic male LUTS. 2025.',q:'EAU guidelines non-neurogenic male LUTS 2025'}],
 note:'Diretrizes americana de micro-hematúria e europeia de sintomas urinários.'
},
'ciruro_1':{
 updated:'2026-11',
 pretest:['Qual o exame de escolha na cólica renal?','Qual o tipo de cálculo mais comum e qual é radiotransparente?','Quando usar terapia expulsiva com alfabloqueador?','Qual a conduta no cálculo obstrutivo com infecção?'],
 sections:[
  {h:'Tipos de cálculo',table:{head:['Cálculo','Características'],rows:[
   ['Oxalato de cálcio','O mais comum; hipercalciúria, hiperoxalúria, hipocitratúria'],
   ['Estruvita','Infecção por germes produtores de urease (Proteus); urina alcalina; coraliforme'],
   ['Ácido úrico','Urina ácida; radiotransparente na radiografia, visível na TC; dissolve com alcalinização (citrato de potássio)'],
   ['Cistina','Doença genética; cristais hexagonais']]}},
  {h:'Diagnóstico e cólica',p:['Dor lombar em cólica, intensa, irradiando para flanco e genitália, com náusea e hematúria. A tomografia sem contraste em baixa dose é o padrão-ouro. A ultrassonografia é a primeira opção em gestantes e crianças e serve como triagem.','Analgesia: anti-inflamatório não esteroide é a primeira escolha (atenção à função renal); opioide é a segunda.']},
  {h:'Expulsão e intervenção',list:[
   'Cálculos menores que 5 mm costumam ser eliminados espontaneamente; entre 5 e 10 mm, a chance cai.',
   '<strong>Terapia expulsiva:</strong> alfabloqueador (tansulosina) para cálculo de ureter distal acima de 5 mm, segundo a diretriz europeia de 2025, por até 4 a 6 semanas, em paciente sem complicações.',
   '<strong>Urgência:</strong> cálculo obstrutivo com infecção (febre, sepse) exige desobstrução imediata com cateter duplo J ou nefrostomia percutânea e antibiótico. Não se retira o cálculo na vigência de infecção.',
   '<strong>Outras indicações de intervenção:</strong> dor refratária, lesão renal aguda, rim único obstruído, obstrução bilateral, cálculo maior que 10 mm, falha da expulsão.',
   '<strong>Ureter:</strong> ureteroscopia com laser (ou litotripsia extracorpórea em casos selecionados).',
   '<strong>Rim:</strong> até cerca de 2 cm, litotripsia extracorpórea (LECO) ou ureteroscopia flexível; acima de 2 cm e coraliformes, nefrolitotripsia percutânea. LECO é contraindicada na gestação, coagulopatia, obstrução distal ao cálculo e aneurisma próximo.']},
  {h:'Prevenção',list:['Ingestão de água para diurese acima de 2 a 2,5 litros por dia.','Reduzir sódio e excesso de proteína animal.','Não restringir cálcio da dieta: a restrição aumenta a absorção de oxalato.','Tiazídico na hipercalciúria, citrato de potássio na hipocitratúria e no ácido úrico, alopurinol na hiperuricosúria.','Avaliação metabólica em recorrentes e em pacientes de alto risco.']}
 ],
 flow:{title:'Cólica renal',nodes:[
  {k:'start',t:'Dor lombar em cólica com hematúria'},
  {k:'do',t:'Anti-inflamatório, TC sem contraste ou ultrassonografia'},
  {k:'ask',t:'Febre ou sepse com obstrução?',yes:'Duplo J ou nefrostomia de urgência e antibiótico',no:'Seguir'},
  {k:'ask',t:'Lesão renal, rim único, dor refratária ou cálculo maior que 10 mm?',yes:'Intervenção: ureteroscopia ou outra',no:'Seguir'},
  {k:'ask',t:'Ureter distal acima de 5 mm?',yes:'Tansulosina e reavaliação',no:'Analgesia e hidratação, expulsão espontânea'},
  {k:'end',t:'Prevenção e avaliação metabólica'}]},
 reasoning:['Rim obstruído e infectado é emergência: drena primeiro, quebra depois.','Ácido úrico some na radiografia e aparece na TC.','Restringir cálcio piora o cálculo de oxalato.'],
 mnemonics:[{n:'Obstruído e infectado: drena',t:'Duplo J ou nefrostomia.'},{n:'5 e 10',t:'Abaixo de 5 mm passa; acima de 10 mm intervém.'},{n:'2 cm',t:'Rim: LECO ou ureteroscopia até 2 cm; percutânea acima.'}],
 pitfalls:['Fazer ureteroscopia para retirar cálculo em paciente séptico.','Restringir cálcio da dieta.','Pedir TC com contraste na cólica renal.'],
 recall:[{q:'Exame padrão-ouro na cólica renal?',a:'TC sem contraste em baixa dose.'},{q:'Cálculo radiotransparente na radiografia?',a:'Ácido úrico.'},{q:'Indicação de terapia expulsiva?',a:'Cálculo de ureter distal acima de 5 mm sem complicações.'},{q:'Conduta no cálculo obstrutivo com febre?',a:'Desobstrução com duplo J ou nefrostomia e antibiótico.'},{q:'Tratamento de cálculo renal coraliforme?',a:'Nefrolitotripsia percutânea.'}],
 practice:['Defina a conduta: cálculo de 4 mm no ureter distal; 7 mm no ureter distal; 6 mm com febre de 39 °C.'],
 refs:[{t:'Skolarikos A, et al. European Association of Urology guidelines on the diagnosis and treatment of urolithiasis. Eur Urol. 2025.',q:'European Association of Urology guidelines diagnosis treatment urolithiasis 2025 Skolarikos'},{t:'Assimos D, et al. Surgical management of stones: AUA/Endourological Society guideline. J Urol. 2016.',q:'Surgical management of stones AUA Endourological Society guideline 2016'}],
 note:'Diretriz europeia de urolitíase de 2025.'
},
'ciruro_2':{
 updated:'2026-11',
 pretest:['Como se classifica o IPSS?','Quais os efeitos adversos dos alfabloqueadores?','O que acontece com o PSA em uso de finasterida?','Quais as indicações absolutas de cirurgia na HPB?'],
 sections:[
  {h:'Hiperplasia prostática benigna',p:['Cresce na zona de transição. Ao toque, próstata aumentada, lisa e fibroelástica. Os sintomas são quantificados pelo IPSS: leve de 0 a 7, moderado de 8 a 19, grave de 20 a 35. O tamanho da próstata não se correlaciona bem com os sintomas.']},
  {h:'Tratamento clínico',table:{head:['Classe','Uso','Efeitos e cuidados'],rows:[
   ['Observação vigilante','Sintomas leves ou pouco incômodos','Medidas comportamentais'],
   ['Alfabloqueador (tansulosina, doxazosina, alfuzosina, silodosina)','Alívio rápido dos sintomas','Hipotensão postural, tontura, ejaculação retrógrada, síndrome da íris flácida na cirurgia de catarata'],
   ['Inibidor da 5-alfa-redutase (finasterida, dutasterida)','Próstata acima de cerca de 30 a 40 mL; reduz volume, retenção e cirurgia','Efeito em cerca de 6 meses; reduz o PSA em cerca de 50% (multiplicar por 2 para interpretar); disfunção sexual'],
   ['Combinação','Próstata grande com sintomas moderados a graves','Melhor que cada um isolado na progressão'],
   ['Antimuscarínico ou mirabegrona','Sintomas de armazenamento predominantes com resíduo baixo','Cuidado com retenção'],
   ['Tadalafila diária','Sintomas urinários com disfunção erétil','Não associar a nitratos']]}},
  {h:'Cirurgia',list:['<strong>Indicações:</strong> retenção urinária refratária, infecções urinárias de repetição, cálculo vesical, hematúria recorrente refratária, insuficiência renal por obstrução e falha do tratamento clínico.','<strong>RTU de próstata:</strong> padrão para próstatas até cerca de 80 mL. A síndrome pós-RTU (hiponatremia dilucional pela absorção de líquido de irrigação sem eletrólitos) ocorre com energia monopolar; a bipolar usa soro fisiológico e reduz o risco.','<strong>Enucleação a laser (HoLEP):</strong> qualquer volume.','<strong>Prostatectomia aberta (Freyer ou Millin):</strong> próstatas muito volumosas, acima de cerca de 80 a 100 mL, quando não há enucleação disponível.']},
  {h:'Uropatia obstrutiva',list:['Obstrução em qualquer nível causa hidronefrose; bilateral ou em rim único leva à lesão renal pós-renal.','Causas: cálculo, estenose da junção ureteropiélica, tumores, fibrose retroperitoneal, HPB, estenose de uretra, bexiga neurogênica.','Diagnóstico: ultrassonografia.','Após desobstruir, vigiar a diurese pós-obstrutiva (poliúria com risco de hipovolemia e distúrbios eletrolíticos).','Refluxo vesicoureteral na criança: uretrocistografia miccional e graus de I a V.']}
 ],
 flow:{title:'Homem com sintomas urinários',nodes:[
  {k:'start',t:'Sintomas urinários em homem acima de 50 anos'},
  {k:'do',t:'IPSS, toque retal, urina, PSA conforme decisão, resíduo pós-miccional'},
  {k:'ask',t:'Indicação absoluta de cirurgia?',yes:'RTU, HoLEP ou prostatectomia conforme volume',no:'Tratamento clínico'},
  {k:'ask',t:'Próstata acima de 30 a 40 mL?',yes:'Alfabloqueador mais 5-ARI',no:'Alfabloqueador'},
  {k:'ask',t:'Armazenamento persistente com resíduo baixo?',yes:'Associar antimuscarínico ou mirabegrona',no:'Reavaliar'},
  {k:'end',t:'Retenção que não resolve: cirurgia'}]},
 reasoning:['Alfabloqueador alivia rápido; 5-ARI muda a história natural.','PSA em uso de finasterida exige considerar tempo de tratamento, adesão e evolução, além de ajuste interpretativo quando aplicável.','RTU monopolar pode causar hiponatremia grave.'],
 mnemonics:[{n:'7, 19, 35',t:'IPSS leve, moderado, grave.'},{n:'Finasterida corta pela metade',t:'Multiplicar o PSA por 2.'},{n:'Íris flácida',t:'Avisar o oftalmologista antes da catarata.'}],
 pitfalls:['Interpretar PSA em uso de finasterida sem corrigir.','Prescrever 5-ARI em próstata pequena esperando efeito rápido.','Esquecer a diurese pós-obstrutiva.'],
 recall:[{q:'IPSS grave começa em quanto?',a:'20 pontos.'},{q:'Efeito do 5-ARI sobre o PSA?',a:'Reduz cerca de 50%.'},{q:'Quando o 5-ARI é indicado?',a:'Próstata acima de cerca de 30 a 40 mL.'},{q:'O que é síndrome pós-RTU?',a:'Hiponatremia dilucional por absorção do líquido de irrigação na RTU monopolar.'},{q:'Cite duas indicações absolutas de cirurgia na HPB.',a:'Retenção refratária, ITU de repetição, cálculo vesical, hematúria refratária, insuficiência renal obstrutiva.'}],
 practice:['Prescreva para um homem de 68 anos com IPSS 22 e próstata de 60 mL.'],
 refs:[{t:'European Association of Urology. EAU guidelines on management of non-neurogenic male LUTS. 2025.',q:'EAU guidelines non-neurogenic male LUTS 2025'},{t:'Sandhu JS, et al. Management of lower urinary tract symptoms attributed to BPH: AUA guideline amendment 2023. J Urol. 2024.',q:'AUA guideline lower urinary tract symptoms BPH amendment 2023'}],
 note:'Diretrizes europeia e americana de HPB.'
},
'ciruro_3':{
 updated:'2026-11',
 pretest:['Qual o tratamento da cistite não complicada na mulher?','Quando tratar bacteriúria assintomática?','Como diferenciar torção testicular de epididimite?','O que sugere tuberculose urogenital?'],
 sections:[
  {h:'Infecções inespecíficas',list:[
   '<strong>Cistite não complicada na mulher:</strong> nitrofurantoína por 5 dias ou fosfomicina em dose única; urocultura não é obrigatória.',
   '<strong>Bacteriúria assintomática:</strong> tratar só em gestantes e antes de procedimento urológico com sangramento de mucosa.',
   '<strong>Pielonefrite:</strong> urocultura, antibiótico (quinolona ou ceftriaxona conforme gravidade e resistência local). Imagem se não melhorar em 48 a 72 horas, sepse ou suspeita de obstrução. Pielonefrite obstrutiva exige desobstrução urgente. Enfisematosa (gás no parênquima, diabéticos): TC e tratamento agressivo.',
   '<strong>Prostatite aguda:</strong> febre, disúria e próstata muito dolorosa; não massagear. Antibiótico por 2 a 4 semanas.',
   '<strong>Epididimite:</strong> considerar exposição sexual, fatores urinários e contexto epidemiológico para diferenciar agentes sexualmente transmissíveis e entéricos. Escolha antimicrobiana segue o agente provável e resistência local. O sinal de Prehn pode estar presente, mas não exclui torção.',
   '<strong>Torção testicular:</strong> adolescente, dor súbita, testículo alto e horizontalizado, reflexo cremastérico ausente, Prehn negativo. Emergência: explorar e distorcer, idealmente em até 6 horas; não atrasar a cirurgia por ultrassonografia quando a clínica é clara. Fixar os dois testículos.',
   '<strong>Gangrena de Fournier:</strong> fasciite necrosante perineal, sobretudo em diabéticos. Desbridamento cirúrgico urgente e antibiótico de amplo espectro.']},
  {h:'Tuberculose urogenital',p:['Disseminação hematogênica, aparecendo anos após a infecção primária. A pista clássica é a piúria estéril: leucocitúria com urocultura comum negativa, urina ácida e hematúria.','Acomete rim (calcificações, estenoses, cavidades, até exclusão renal), ureter (aspecto em rosário), bexiga (contraída, de pequena capacidade) e epidídimo (endurecido, nodular, com fístula escrotal).','Diagnóstico: pesquisa de BAAR, teste molecular e cultura em 3 a 6 amostras da primeira urina da manhã. Tratamento com esquema básico por 6 meses (2 meses com rifampicina, isoniazida, pirazinamida e etambutol, e 4 meses com rifampicina e isoniazida). Cirurgia para sequelas.']}
 ],
 flow:{title:'Dor escrotal aguda',nodes:[
  {k:'start',t:'Dor escrotal aguda'},
  {k:'ask',t:'Início súbito, testículo alto, cremastérico ausente?',yes:'Torção: cirurgia imediata',no:'Seguir'},
  {k:'ask',t:'Dúvida diagnóstica?',yes:'Doppler sem atrasar a exploração',no:'Seguir'},
  {k:'ask',t:'Instalação gradual, febre, disúria, Prehn positivo?',yes:'Considerar epididimite; avaliar exposição sexual e fatores urinários antes de escolher antibiótico',no:'Seguir'},
  {k:'do',t:'Crepitação, necrose perineal: Fournier, desbridamento'},
  {k:'end',t:'Piúria estéril crônica: investigar tuberculose'}]},
 reasoning:['Dor escrotal súbita no adolescente é torção até prova em contrário: o tempo é o testículo.','Piúria estéril: tuberculose, uretrite, nefrite intersticial, cálculo.','Bacteriúria assintomática só deve ser tratada nas indicações específicas, incluindo gestação e determinados procedimentos com trauma de mucosa.'],
 mnemonics:[{n:'Prehn não exclui torção',t:'Alívio à elevação não permite descartar torção testicular.'},{n:'Urgência sem espera',t:'Suspeita de torção exige avaliação e tratamento oportunos; atraso não dispensa exploração quando indicada.'},{n:'Piúria estéril pensa BK',t:'Tuberculose urogenital.'}],
 pitfalls:['Pedir Doppler e atrasar a cirurgia em torção clara.','Tratar bacteriúria assintomática em idosa.','Massagear próstata na prostatite aguda.'],
 recall:[{q:'Tratamento da cistite não complicada?',a:'Nitrofurantoína por 5 dias ou fosfomicina dose única.'},{q:'Quando tratar bacteriúria assintomática?',a:'Gestantes e antes de procedimento urológico com sangramento de mucosa.'},{q:'Sinais de torção testicular?',a:'Dor súbita, testículo alto e horizontal, reflexo cremastérico ausente, Prehn negativo.'},{q:'Pista laboratorial da tuberculose urogenital?',a:'Piúria estéril com urina ácida.'},{q:'Tratamento da gangrena de Fournier?',a:'Desbridamento cirúrgico urgente e antibiótico de amplo espectro.'}],
 practice:['Diferencie torção e epididimite em cinco itens.'],
 refs:[{t:'European Association of Urology. EAU guidelines on urological infections. 2025.',q:'EAU guidelines urological infections 2025'},{t:'Nicolle LE, et al. Clinical practice guideline for the management of asymptomatic bacteriuria: IDSA 2019. Clin Infect Dis. 2019.',q:'IDSA 2019 asymptomatic bacteriuria guideline'},{t:'Ministério da Saúde. Manual de recomendações para o controle da tuberculose no Brasil. 2ª ed. 2019.',q:'Manual de recomendações para o controle da tuberculose no Brasil 2019'}],
 note:'Diretriz europeia de infecções urológicas, IDSA e manual brasileiro de tuberculose.'
},
'ciruro_4':{
 updated:'2026-11',
 pretest:['O Ministério da Saúde recomenda rastreamento populacional do câncer de próstata?','Qual exame deve preceder a biópsia de próstata?','O que é vigilância ativa?','Qual o tratamento do câncer de bexiga músculo-invasivo?'],
 sections:[
  {h:'Câncer de próstata: rastreamento no Brasil',p:['Há duas posições, e a prova pode cobrar qualquer uma. O Ministério da Saúde e o INCA, em linha com a OMS, não recomendam rastreamento populacional de homens sem sintomas; orientam explicar riscos e benefícios a quem procurar o exame. A Sociedade Brasileira de Urologia recomenda avaliação individualizada a partir de 50 anos, ou 45 anos em negros, com história familiar ou obesos. Nos Estados Unidos, a decisão compartilhada entre 55 e 69 anos é a recomendação da USPSTF.']},
  {h:'Diagnóstico e risco',list:['PSA alterado (acima de cerca de 3 a 4 ng/mL, confirmado) ou toque com nódulo endurecido. O tumor nasce na zona periférica, acessível ao toque.','Ressonância multiparamétrica antes da biópsia; PI-RADS 3 ou mais orienta biópsia dirigida mais sistemática. A via transperineal tem menos infecção.','Gleason agrupado em grupos de grau ISUP: grupo 1 (3+3), 2 (3+4), 3 (4+3), 4 (8), 5 (9 e 10).','Risco: baixo (PSA abaixo de 10, grupo 1, T1 a T2a), intermediário (PSA de 10 a 20, grupo 2 ou 3, T2b a T2c), alto (PSA acima de 20, grupo 4 ou 5, T3).']},
  {h:'Tratamento do câncer de próstata',list:['<strong>Muito baixo e baixo risco:</strong> vigilância ativa, com PSA, ressonância e nova biópsia periódicos, tratando só se houver progressão.','<strong>Intermediário e alto:</strong> prostatectomia radical (incorporada ao SUS em versão robótica) ou radioterapia, associada a bloqueio hormonal no alto risco.','<strong>Metastático:</strong> bloqueio androgênico (análogo ou antagonista do LHRH, ou orquiectomia) intensificado com abiraterona, enzalutamida, apalutamida ou docetaxel. Agonista do LHRH pode causar flare no início; associar antiandrogênio.','Metástases ósseas blásticas; atenção à compressão medular.']},
  {h:'Câncer de bexiga',list:['Carcinoma urotelial na maioria. Tabagismo é o principal fator; também aminas aromáticas, ciclofosfamida e, para o escamoso, esquistossomose hematóbia e sonda crônica.','Hematúria macroscópica indolor e total. Cistoscopia com ressecção transuretral (RTU), que deve incluir músculo detrusor, e urotomografia para o trato superior.','<strong>Não músculo-invasivo (Ta, T1, carcinoma in situ):</strong> RTU com instilação única de quimioterapia no pós-operatório imediato nos de baixo risco; BCG intravesical com manutenção nos de risco intermediário e alto e no carcinoma in situ; nova RTU em T1 ou sem músculo na amostra; cistectomia no alto risco que não responde ao BCG.','<strong>Músculo-invasivo (T2 ou mais):</strong> quimioterapia neoadjuvante com cisplatina e cistectomia radical com linfadenectomia e derivação urinária (conduto ileal ou neobexiga). Terapia trimodal preservadora em selecionados.','Tumor urotelial do trato superior (pelve renal e ureter): nefroureterectomia com retirada do segmento de bexiga do meato; lembrar síndrome de Lynch.']}
 ],
 flow:{title:'Câncer de bexiga',nodes:[
  {k:'start',t:'Hematúria macroscópica indolor em tabagista'},
  {k:'do',t:'Urotomografia e cistoscopia'},
  {k:'do',t:'RTU com amostra de músculo detrusor'},
  {k:'ask',t:'Invade o músculo (T2 ou mais)?',yes:'Quimioterapia neoadjuvante e cistectomia radical',no:'Não músculo-invasivo: estratificar risco'},
  {k:'ask',t:'Risco intermediário, alto ou carcinoma in situ?',yes:'BCG intravesical com manutenção',no:'Instilação única de quimioterapia e cistoscopias'},
  {k:'end',t:'Falha do BCG no alto risco: cistectomia'}]},
 reasoning:['BCG é para não invasivo de maior risco; músculo-invasivo é cistectomia.','RTU sem músculo não estadia.','Rastreamento de próstata no Brasil: saiba as duas posições.'],
 mnemonics:[{n:'BCG na bexiga',t:'Imunoterapia intravesical no não músculo-invasivo de maior risco.'},{n:'ISUP 1 a 5',t:'3+3, 3+4, 4+3, 8, 9 e 10.'},{n:'50 ou 45',t:'Idade de discussão do rastreamento pela SBU.'}],
 pitfalls:['Indicar BCG em tumor músculo-invasivo.','Afirmar que o Ministério da Saúde recomenda rastreamento populacional.','Tratar todo câncer de próstata de baixo risco com cirurgia.'],
 recall:[{q:'Posição do Ministério da Saúde sobre rastreamento de próstata?',a:'Não recomenda rastreamento populacional; orienta decisão informada.'},{q:'Exame antes da biópsia de próstata?',a:'Ressonância multiparamétrica.'},{q:'Conduta no câncer de próstata de baixo risco?',a:'Vigilância ativa.'},{q:'Principal fator de risco do câncer de bexiga?',a:'Tabagismo.'},{q:'Tratamento do câncer de bexiga T2?',a:'Quimioterapia neoadjuvante com cisplatina e cistectomia radical.'}],
 practice:['Classifique o risco: PSA 12, Gleason 3+4, T2a.'],
 refs:[{t:'Instituto Nacional de Câncer e Ministério da Saúde. Nota técnica sobre rastreamento do câncer de próstata.',q:'INCA nota técnica rastreamento câncer de próstata'},{t:'European Association of Urology. EAU-EANM-ESTRO-ESUR-ISUP-SIOG guidelines on prostate cancer. 2025.',q:'EAU guidelines prostate cancer 2025'},{t:'European Association of Urology. EAU guidelines on non-muscle-invasive bladder cancer. 2025.',q:'EAU guidelines non-muscle-invasive bladder cancer 2025'}],
 note:'Posições do INCA e da SBU e diretrizes europeias.'
},
'ciruro_5':{
 updated:'2026-11',
 pretest:['Qual a tríade clássica do câncer renal e quão comum ela é?','Qual a cirurgia preferida para tumor renal de até 4 cm?','Qual marcador nunca se eleva no seminoma puro?','Por que a orquiectomia é por via inguinal?'],
 sections:[
  {h:'Câncer de rim',list:['Carcinoma de células claras é o mais comum (associado à síndrome de von Hippel-Lindau). Fatores: tabagismo, obesidade, hipertensão e doença renal crônica em diálise.','Tríade clássica (hematúria, dor lombar e massa palpável) em menos de 10%; a maioria é achado incidental.','Paraneoplásicas: policitemia (eritropoetina), hipercalcemia (PTHrP), hipertensão, febre e síndrome de Stauffer (disfunção hepática sem metástase). Varicocele esquerda que não esvazia deitado sugere trombo na veia renal.','TC com contraste: massa sólida com realce. Cistos pela classificação de Bosniak: I e II benignos; IIF seguimento; III e IV exigem discussão de manejo conforme complexidade, risco clínico e contexto.','<strong>T1a (até 4 cm):</strong> nefrectomia parcial; ablação ou vigilância em idosos com massas pequenas.','<strong>Maiores:</strong> parcial se viável, ou radical (com trombectomia se houver trombo na veia cava).','<strong>Metastático:</strong> imunoterapia combinada; nefrectomia citorredutora em casos selecionados.','<strong>Tumor de Wilms:</strong> criança de 2 a 5 anos com massa abdominal assintomática que não cruza a linha média, hipertensão; nefrectomia e quimioterapia, prognóstico muito bom. O neuroblastoma, ao contrário, cruza a linha média e calcifica.']},
  {h:'Câncer de testículo',list:['Homens de 15 a 35 anos. Principal fator: criptorquidia; também história familiar e tumor prévio no outro testículo.','Massa testicular endurecida e indolor. Ultrassonografia escrotal.','<strong>Marcadores:</strong> alfafetoproteína (tumor de saco vitelino, componente não seminomatoso), beta-hCG (coriocarcinoma, discreta em alguns seminomas) e DHL (volume tumoral). Seminoma puro nunca eleva a alfafetoproteína: se estiver alta, investigar componente não seminomatoso e outras causas de elevação.','<strong>Orquiectomia radical por via inguinal</strong>, com ligadura alta do cordão. Nunca biópsia ou cirurgia transescrotal, que altera a drenagem linfática (do retroperitônio para as inguinais).','Estadiamento com TC e marcadores após a cirurgia. Seminoma estágio I: vigilância (preferida), carboplatina ou radioterapia. Não seminoma estágio I: vigilância, um ciclo de BEP ou linfadenectomia retroperitoneal. Doença avançada: BEP. Alta taxa de cura. Oferecer banco de sêmen.']},
  {h:'Câncer de pênis',p:['Carcinoma espinocelular ligado a fimose, má higiene, HPV e tabagismo; a circuncisão na infância protege. Incidência alta no Norte e Nordeste do Brasil. Lesão ulcerada ou vegetante na glande ou prepúcio; biópsia. Lesões pequenas: cirurgias preservadoras (excisão, laser, glandectomia); maiores: penectomia parcial ou total com margem. Linfonodos inguinais: avaliação e linfadenectomia conforme o risco, com biópsia do linfonodo sentinela em casos selecionados.']}
 ],
 flow:{title:'Massa testicular',nodes:[
  {k:'start',t:'Nódulo testicular endurecido e indolor'},
  {k:'do',t:'Ultrassonografia escrotal e marcadores: AFP, beta-hCG, DHL'},
  {k:'do',t:'Orquiectomia radical por via inguinal'},
  {k:'ask',t:'AFP elevada?',yes:'Componente não seminomatoso',no:'Seminoma possível conforme histologia'},
  {k:'do',t:'TC de abdome, pelve e tórax e marcadores pós-operatórios'},
  {k:'end',t:'Estágio I: vigilância na maioria; avançado: BEP'}]},
 reasoning:['Testículo se aborda pela virilha, nunca pelo escroto.','AFP alta afasta seminoma puro.','Massa renal incidental de até 4 cm: poupar néfrons.'],
 mnemonics:[{n:'Seminoma sem AFP',t:'Seminoma puro nunca eleva alfafetoproteína.'},{n:'Inguinal sempre',t:'Orquiectomia radical inguinal.'},{n:'Wilms não cruza',t:'Neuroblastoma cruza a linha média.'}],
 pitfalls:['Biopsiar testículo por via escrotal.','Achar que a tríade clássica é a apresentação habitual do câncer renal.','Indicar nefrectomia radical para tumor de 3 cm passível de parcial.'],
 recall:[{q:'Tríade clássica do câncer renal?',a:'Hematúria, dor lombar e massa palpável; presente em menos de 10%.'},{q:'Cirurgia preferida no T1a?',a:'Nefrectomia parcial.'},{q:'Marcador que nunca se eleva no seminoma puro?',a:'Alfafetoproteína.'},{q:'Por que a orquiectomia é inguinal?',a:'Para não alterar a drenagem linfática e evitar disseminação para linfonodos inguinais.'},{q:'Principal fator de risco do câncer de testículo?',a:'Criptorquidia.'}],
 practice:['Compare Wilms e neuroblastoma em quatro pontos.'],
 refs:[{t:'European Association of Urology. EAU guidelines on renal cell carcinoma. 2025.',q:'EAU guidelines renal cell carcinoma 2025'},{t:'European Association of Urology. EAU guidelines on testicular cancer. 2025.',q:'EAU guidelines testicular cancer 2025'},{t:'European Association of Urology e ASCO. EAU-ASCO guidelines on penile cancer. 2023.',q:'EAU ASCO collaborative guidelines penile cancer 2023'}],
 note:'Diretrizes europeias de urologia oncológica.'
}
};

/* Complementos autorais: preservam a ordem dos itens de evocação já salvos. */
const extra={
  'cirrad_0':{
    'pretest':[
      'Por que a ausência de gás livre na radiografia não exclui perfuração?',
      'Quais dados técnicos devem ser conferidos antes de interpretar níveis hidroaéreos?'
    ],
    'sections':[
      {
        'h':'Leitura sistemática: da técnica à hipótese',
        'list':[
          'Confira identificação, incidência, posição, rotação e cobertura anatômica. Uma imagem deitado não responde à mesma pergunta que uma incidência com raios horizontais.',
          'Procure gás fora do tubo digestivo antes de analisar a distribuição das alças: abaixo das cúpulas, delineando paredes e em tecidos moles.',
          'Avalie distribuição, pregas, distensão e gás distal em conjunto. A aparência central ou periférica ajuda, mas não substitui seguir o trajeto da alça.',
          'Revise fígado, rins, contornos do psoas, ossos e bases pulmonares. Descreva o achado e depois sua hipótese, incluindo a limitação do método.'
        ]
      },
      {
        'h':'Padrões que se parecem, decisões diferentes',
        'table':{
          'head':[
            'Padrão',
            'Hipótese principal',
            'Diferencial importante',
            'Como avançar'
          ],
          'rows':[
            [
              'Alças dilatadas e níveis',
              'Obstrução mecânica',
              'Íleo adinâmico',
              'Pesquisar transição, causa e sinais de complicação na TC quando indicada'
            ],
            [
              'Ar subdiafragmático',
              'Pneumoperitônio',
              'Alça interposta entre fígado e diafragma',
              'Procurar pregas e continuidade intestinal; integrar sintomas e TC'
            ],
            [
              'Gás em distribuição periférica no fígado',
              'Gás portal',
              'Pneumobilia',
              'Avaliar contexto de isquemia, infecção e procedimentos prévios'
            ],
            [
              'Pneumatose',
              'Gás na parede intestinal',
              'Causas benignas e iatrogênicas',
              'Gravidade depende de perfusão, clínica e achados associados'
            ]
          ]
        }
      },
      {
        'h':'Por que a radiografia falha e quando a falha importa',
        'p':[
          'A imagem plana soma estruturas em profundidade. Pequena quantidade de gás extraluminal, líquido abdominal e doenças com pouca alteração gasosa podem não produzir sinal visível. Uma radiografia aparentemente normal não cancela peritonite ou suspeita de isquemia.',
          'Após uma operação, gás livre pode ter relação com o procedimento, mas deterioração, dor progressiva ou sinais infecciosos exigem investigação de vazamento ou outra complicação. O contexto e a evolução têm mais valor que uma imagem isolada.'
        ]
      }
    ],
    'exam':[
      {
        'c':'Radiografia sem gás livre em paciente com sinais de irritação peritoneal.',
        'p':'Usar a ausência do sinal como exclusão de perfuração.',
        'r':'Reconhecer a limitação da radiografia e manter avaliação cirúrgica e imagem adequada conforme estabilidade.'
      },
      {
        'c':'Ar sob a cúpula direita com pregas visíveis dentro da imagem gasosa.',
        'p':'Chamar qualquer transparência subdiafragmática de perfuração.',
        'r':'Considerar interposição de alça e correlacionar com clínica e outras imagens.'
      },
      {
        'c':'Distensão de alças com níveis e pergunta sobre o segmento acometido.',
        'p':'Decidir apenas pela posição central ou periférica.',
        'r':'Usar pregas, distribuição, gás distal e contexto para diferenciar delgado e cólon.'
      },
      {
        'c':'Gás ramificado junto à periferia hepática em doente grave.',
        'p':'Confundir com pneumobilia esperada após procedimento biliar.',
        'r':'Descrever gás portal e investigar a causa com prioridade, sem concluir necrose somente pelo sinal.'
      }
    ],
    'cases':[
      {
        'title':'Radiografia discreta, abdome preocupante',
        'data':[
          'Adulto com dor intensa progressiva e defesa involuntária.',
          'Radiografia sem pneumoperitônio evidente.'
        ],
        'reasoning':[
          'O exame físico sugere complicação mesmo sem sinal radiográfico.',
          'A sensibilidade do método não permite excluir perfuração ou isquemia.'
        ],
        'conduct':[
          'Avaliar perfusão, iniciar suporte e solicitar avaliação cirúrgica.',
          'Escolher TC se o transporte e a condição clínica permitirem, sem atrasar tratamento de uma emergência evidente.'
        ],
        'error':'Dar alta porque a radiografia foi descrita como normal.'
      },
      {
        'title':'O ar que parece estar livre',
        'data':[
          'Paciente estável com distensão e desconforto abdominal.',
          'Transparência subdiafragmática direita contendo pregas intestinais.'
        ],
        'reasoning':[
          'As pregas sugerem gás dentro de uma alça, não necessariamente na cavidade.',
          'Interposição de cólon pode simular pneumoperitônio; o diagnóstico depende da concordância clínica.'
        ],
        'conduct':[
          'Rever a incidência e procurar continuidade com o cólon.',
          'Usar exame complementar se a dúvida mudar a conduta e tratar conforme o quadro clínico.'
        ],
        'error':'Indicar cirurgia somente pela localização do gás, sem reconhecer as pregas.'
      }
    ],
    'recall':[
      {
        'q':'Qual a sequência inicial de leitura de uma radiografia abdominal?',
        'a':'Conferir técnica e posição, procurar gás fora do tubo, analisar alças e gás distal e revisar estruturas adjacentes.'
      },
      {
        'q':'Pneumatose intestinal prova necrose?',
        'a':'Não. Deve ser interpretada com perfusão, sintomas e demais achados; pode ocorrer em condições de gravidade muito diferente.'
      },
      {
        'q':'Por que a TC pode ser necessária apesar de radiografia normal?',
        'a':'Porque a radiografia pode não demonstrar pequenas perfurações, isquemia e causas de dor sem alteração gasosa marcante.'
      }
    ]
  },
  'cirrad_1':{
    'pretest':[
      'Por que diâmetro isolado do apêndice não fecha diagnóstico?',
      'Qual a diferença entre gravidade clínica da pancreatite e escore tomográfico?'
    ],
    'sections':[
      {
        'h':'Escolher o protocolo responde à pergunta clínica',
        'p':[
          'Antes de pedir TC, formule a dúvida: inflamação, obstrução, isquemia ou sangramento. O protocolo deve permitir avaliar a estrutura e sua perfusão; um exame feito para outra finalidade pode não responder à pergunta.',
          'Contraste oral, fases intravenosas e reconstruções não são pedidos automáticos para todo paciente. A decisão deve ser alinhada com a radiologia e com a urgência, evitando atrasos sem benefício diagnóstico.'
        ],
        'list':[
          'Procure o órgão ou segmento suspeito e confirme os achados em reconstruções.',
          'Examine gordura adjacente, coleções, gás extraluminal e líquido livre.',
          'Na obstrução, encontre a transição e avalie o mesentério e o realce das alças.',
          'Na suspeita vascular, siga artérias e veias e procure consequências sobre a parede intestinal.'
        ]
      },
      {
        'h':'Achado isolado versus conjunto diagnóstico',
        'table':{
          'head':[
            'Achado',
            'O que fortalece a hipótese',
            'Diferencial ou limitação',
            'Consequência'
          ],
          'rows':[
            [
              'Apêndice aumentado',
              'Alterações parietais e inflamação da gordura adjacente',
              'Calibre isolado ou apendicolito sem inflamação não bastam',
              'Integrar exame clínico e conjunto tomográfico'
            ],
            [
              'Espessamento colônico',
              'Divertículos no segmento e inflamação pericólica',
              'Colite, isquemia e neoplasia podem se sobrepor',
              'Pesquisar complicações e planejar investigação posterior'
            ],
            [
              'Alça em configuração fechada',
              'Transições próximas e convergência dos vasos',
              'O padrão sugere mecanismo; perfusão define urgência adicional',
              'Avaliação cirúrgica e busca de sofrimento'
            ],
            [
              'Redução do realce intestinal',
              'Achados vasculares e alteração mesentérica',
              'Técnica inadequada pode prejudicar avaliação',
              'Correlacionar protocolo, perfusão sistêmica e suspeita de isquemia'
            ]
          ]
        }
      },
      {
        'h':'Pancreatite: morfologia não substitui avaliação clínica',
        'p':[
          'Balthazar descreve alterações morfológicas. Os índices tomográficos acrescentam componentes como necrose, mas não substituem a classificação clínica de Atlanta, que considera falência orgânica e complicações.',
          'A TC muito precoce pode não mostrar toda a necrose. Isso não significa proibir TC diante de incerteza diagnóstica, deterioração ou suspeita de outra causa de abdome agudo. Explicar a finalidade do exame evita decorar uma janela temporal como regra absoluta.',
          'Coleção não é sinônimo de abscesso. É necessário considerar seu conteúdo, evolução, presença de gás, sintomas e suspeita de infecção antes de propor drenagem.'
        ]
      }
    ],
    'exam':[
      {
        'c':'Apêndice aumentado sem alterações inflamatórias adjacentes.',
        'p':'Transformar uma medida isolada em indicação cirúrgica automática.',
        'r':'Integrar parede, gordura, sintomas e possibilidade de diagnóstico alternativo.'
      },
      {
        'c':'Paciente com obstrução e redução do realce de uma alça.',
        'p':'Descrever apenas a dilatação e indicar observação rotineira.',
        'r':'Reconhecer suspeita de sofrimento vascular e priorizar avaliação cirúrgica.'
      },
      {
        'c':'Pancreatite típica estável e pedido automático de TC para confirmar.',
        'p':'Confundir exame de estratificação morfológica com exigência para todo diagnóstico.',
        'r':'Definir a pergunta do exame; reservar a TC para indicação clínica, sem ignorar exceções.'
      },
      {
        'c':'Coleção pancreática com pergunta sobre gravidade.',
        'p':'Usar apenas Balthazar para concluir falência orgânica ou infecção.',
        'r':'Separar morfologia, repercussão clínica e investigação de complicações.'
      }
    ],
    'cases':[
      {
        'title':'A medida não decide sozinha',
        'data':[
          'Paciente com dor abdominal pouco específica e TC mostrando apêndice de aspecto limítrofe.',
          'Não há reação importante na gordura adjacente nem sinais claros de complicação.'
        ],
        'reasoning':[
          'Um critério dimensional isolado não resolve uma apresentação equívoca.',
          'É preciso conferir a técnica, os achados associados e a evolução do exame físico.'
        ],
        'conduct':[
          'Reavaliar clinicamente e discutir a interpretação com a radiologia e a equipe cirúrgica.',
          'Escolher seguimento ou investigação complementar conforme a probabilidade e a segurança clínica.'
        ],
        'error':'Operar somente pelo diâmetro, sem avaliar o conjunto.'
      },
      {
        'title':'Exame precoce com uma pergunta legítima',
        'data':[
          'Adulto com suspeita de pancreatite e evolução atípica, com piora da dor e sinais que sugerem outra causa abdominal.',
          'A equipe considera TC apesar de o quadro ser recente.'
        ],
        'reasoning':[
          'A utilidade do exame é esclarecer diagnóstico e complicação, não apenas quantificar necrose.',
          'Uma regra temporal decorada não deve impedir investigação necessária.'
        ],
        'conduct':[
          'Estabilizar o paciente e discutir protocolo dirigido à dúvida clínica.',
          'Interpretar uma TC precoce reconhecendo que a extensão da necrose pode ainda não estar definida.'
        ],
        'error':'Adiar toda imagem porque ainda não chegou uma janela fixa.'
      }
    ],
    'recall':[
      {
        'q':'Por que a inflamação da gordura ajuda no diagnóstico de apendicite?',
        'a':'Ela mostra reação ao redor do apêndice e torna um achado de calibre ou parede mais convincente dentro do contexto clínico.'
      },
      {
        'q':'O que deve ser buscado além do ponto de transição na obstrução?',
        'a':'Configuração de alça fechada, mesentério, realce da parede e outros sinais de comprometimento vascular ou perfuração.'
      },
      {
        'q':'Por que Balthazar e Atlanta não são intercambiáveis?',
        'a':'Balthazar é morfológico; Atlanta incorpora repercussão clínica e falência orgânica, além de complicações.'
      }
    ]
  },
  'cirrad_2':{
    'pretest':[
      'Por que a ausência de deslizamento pleural não confirma sozinha um pneumotórax?',
      'O que um FAST negativo não consegue excluir?'
    ],
    'sections':[
      {
        'h':'FAST e eFAST: responder perguntas sem ampliar indevidamente o resultado',
        'p':[
          'O FAST é uma busca dirigida de líquido em espaços específicos. O resultado deve informar janelas obtidas, qualidade da imagem e achados, sem transformar exame limitado em declaração de abdome normal.',
          'No quadrante superior direito, varra o espaço hepatorrenal e a borda inferior do fígado, incluindo regiões dependentes. Limitar a avaliação a uma imagem fixa de Morison pode deixar líquido fora do campo.',
          'O ultrassom não identifica de modo confiável a natureza do líquido apenas por ser anecoico. No trauma, o mecanismo e a repercussão hemodinâmica dão significado ao achado.'
        ]
      },
      {
        'h':'Sinais torácicos e seus imitadores',
        'table':{
          'head':[
            'Achado',
            'O que sugere',
            'O que pode confundir',
            'Próximo raciocínio'
          ],
          'rows':[
            [
              'Ausência de deslizamento',
              'Pneumotórax entre os diagnósticos',
              'Apneia, intubação seletiva, aderências e consolidação',
              'Buscar outros sinais e integrar contexto'
            ],
            [
              'Ponto pulmonar típico',
              'Interface entre região com e sem contato pleural',
              'Transições anatômicas e imagens tecnicamente inadequadas',
              'Confirmar a identificação da pleura e o padrão dinâmico'
            ],
            [
              'Mediastino alargado em AP',
              'Possível lesão vascular em trauma compatível',
              'Magnificação, rotação e posição deitado',
              'Rever técnica e indicar estudo vascular se a suspeita justificar'
            ],
            [
              'Velamento torácico em decúbito',
              'Líquido pleural entre as hipóteses',
              'Atelectasia, contusão e limitações da incidência',
              'Usar ultrassom e TC conforme estabilidade'
            ]
          ]
        }
      },
      {
        'h':'Da descrição à conduta na sala de trauma',
        'list':[
          'Descreva a estabilidade e o mecanismo antes de nomear o exame.',
          'Em suspeita clínica de pneumotórax hipertensivo com repercussão, não espere confirmação radiológica para tratar.',
          'Em paciente estável, a decisão de drenar um pneumotórax considera repercussão, extensão, necessidade de ventilação e acompanhamento possível.',
          'Líquido livre sem lesão de órgão sólido na TC exige atenção à víscera oca e ao mesentério; ausência de ar livre não afasta lesão.',
          'Após intervenção, reavalie ventilação, perfusão e posição dos dispositivos. Um procedimento tecnicamente concluído ainda pode não ter resolvido o problema.'
        ]
      }
    ],
    'exam':[
      {
        'c':'Trauma com FAST negativo e piora da perfusão.',
        'p':'Encerrar a investigação porque não foi visto líquido.',
        'r':'Reavaliar fontes de choque, qualidade das janelas e necessidade de repetir ou complementar o exame.'
      },
      {
        'c':'Ausência de deslizamento em paciente intubado.',
        'p':'Drenar sem considerar intubação seletiva ou outras causas.',
        'r':'Identificar a pleura, integrar sinais e avaliar a clínica; tratar imediatamente se houver quadro de tensão.'
      },
      {
        'c':'Radiografia AP mostrando mediastino largo após desaceleração.',
        'p':'Confirmar ou excluir lesão aórtica apenas pela radiografia.',
        'r':'Reconhecer sinal de alerta e considerar angioTC quando o paciente puder realizá-la com segurança.'
      },
      {
        'c':'TC com líquido livre sem explicação por lesão de órgão sólido.',
        'p':'Considerar o exame normal por não haver lesão de fígado ou baço.',
        'r':'Pesquisar lesão intestinal ou mesentérica e manter avaliação e reavaliação cirúrgicas.'
      }
    ],
    'cases':[
      {
        'title':'A janela negativa não explica o choque',
        'data':[
          'Vítima de trauma com piora da perfusão e FAST inicial sem líquido visível.',
          'A aquisição foi difícil e a região pélvica ficou mal caracterizada.'
        ],
        'reasoning':[
          'Exame incompleto não equivale a exame negativo confiável.',
          'Mesmo um FAST adequado não exclui hemorragia retroperitoneal ou lesões sem líquido detectável.'
        ],
        'conduct':[
          'Reavaliar fontes torácicas, abdominais, pélvicas e externas durante a reanimação.',
          'Repetir janelas ou escolher outro método e estratégia de controle conforme a estabilidade e a suspeita.'
        ],
        'error':'Atribuir a piora a causa não hemorrágica somente pelo FAST inicial.'
      },
      {
        'title':'O código de barras depois da intubação',
        'data':[
          'Paciente traumatizado intubado com ventilação assimétrica.',
          'Ultrassom mostra ausência de deslizamento em uma região, sem ponto pulmonar identificado.'
        ],
        'reasoning':[
          'Ausência de movimento pleural é um achado, não um diagnóstico completo.',
          'Intubação seletiva e pneumotórax precisam ser considerados em paralelo com o exame clínico.'
        ],
        'conduct':[
          'Revisar posição do tubo e ventilação, buscar sinais adicionais e tratar instabilidade compatível com pneumotórax hipertensivo sem atraso.',
          'Usar imagem complementar se clinicamente apropriada, sem converter ultrassom inconclusivo em exclusão.'
        ],
        'error':'Concluir pneumotórax apenas pelo padrão de modo M.'
      }
    ],
    'recall':[
      {
        'q':'Por que a varredura do FAST deve incluir a borda caudal do fígado?',
        'a':'Porque líquido pode se acumular em regiões dependentes fora de uma imagem fixa do espaço hepatorrenal.'
      },
      {
        'q':'Mediastino alargado em AP confirma lesão aórtica?',
        'a':'Não. Técnica e magnificação interferem; o sinal exige integração com mecanismo e investigação vascular apropriada.'
      },
      {
        'q':'O que diferencia uma janela limitada de uma janela negativa?',
        'a':'Na limitada não foi possível avaliar adequadamente o alvo; na negativa, o alvo foi visualizado sem o achado pesquisado, dentro das limitações do método.'
      }
    ]
  },
  'cirrad_3':{
    'pretest':[
      'Como a intermitência do sangramento altera a interpretação de uma angioTC negativa?',
      'Por que localizar a fonte importa antes de uma ressecção intestinal?'
    ],
    'sections':[
      {
        'h':'A fisiologia do sangramento escolhe o exame',
        'p':[
          'A demonstração de extravasamento depende de o paciente estar sangrando durante a aquisição. Um exame negativo em sangramento intermitente pode significar apenas que não houve extravasamento naquele momento.',
          'Na instabilidade, a prioridade é reanimação e controle da fonte. A escolha entre endoscopia e investigação vascular considera a apresentação, a suspeita de origem e o acesso a tratamento; não é uma fila fixa de exames para todo paciente.',
          'Os fluxos mínimos de detecção são referências técnicas aproximadas, dependentes do protocolo e das condições do exame. Não devem ser usados como medidores do fluxo real do paciente nem como único critério para ordenar métodos.'
        ]
      },
      {
        'h':'Problemas que cada método resolve',
        'table':{
          'head':[
            'Cenário',
            'Método útil',
            'Limitação que deve ser dita',
            'Ligação com tratamento'
          ],
          'rows':[
            [
              'Sangramento ativo importante',
              'AngioTC em protocolo adequado',
              'Pode ser negativa se o episódio cessou',
              'Pode direcionar radiologia intervencionista'
            ],
            [
              'Fonte acessível com paciente apto ao exame',
              'Endoscopia',
              'Visualização depende de conteúdo, preparo e atividade',
              'Permite terapias endoscópicas'
            ],
            [
              'Sangramento intermitente selecionado',
              'Método funcional ou avaliação do delgado',
              'Maior sensibilidade não significa localização precisa',
              'Resultado precisa de correlação antes de procedimento'
            ],
            [
              'Suspeita de fonte de delgado após avaliação inicial',
              'Cápsula ou enteroscopia conforme o caso',
              'Cápsula pode reter em estenose e não trata',
              'Enteroscopia pode permitir intervenção'
            ]
          ]
        }
      },
      {
        'h':'Complicações e falhas de interpretação',
        'list':[
          'Na angioTC, compare fases para distinguir material já hiperdenso de extravasamento que aparece ou se modifica com o contraste.',
          'Após embolização, acompanhe recorrência do sangramento e sinais de isquemia intestinal.',
          'A localização imprecisa pode levar à ressecção do segmento errado. Evite decidir cirurgia extensa apenas por uma projeção pouco específica.',
          'Não descarte fonte alta na hematoquezia acompanhada de repercussão importante, mas também não adie a estratégia apropriada de localização de sangramento ativo.'
        ]
      }
    ],
    'exam':[
      {
        'c':'Hematoquezia importante com angioTC negativa e episódios recorrentes.',
        'p':'Afirmar que o exame exclui sangramento digestivo.',
        'r':'Reconhecer intermitência e planejar reavaliação e método adequado à atividade do sangramento.'
      },
      {
        'c':'Imagem de extravasamento ativo com necessidade de controle.',
        'p':'Pedir novo exame apenas para confirmar o mesmo achado.',
        'r':'Ligar a localização ao método terapêutico disponível, considerando a condição clínica.'
      },
      {
        'c':'Pergunta sobre o exame mais sensível versus o que permite tratar.',
        'p':'Usar sensibilidade como sinônimo de melhor conduta em qualquer situação.',
        'r':'Separar detecção, precisão anatômica e possibilidade de hemostasia.'
      },
      {
        'c':'Proposta de cirurgia sem localização confiável da fonte.',
        'p':'Escolher um segmento apenas pela frequência estatística da doença.',
        'r':'Buscar localização e discutir risco de ressecção inadequada e sangramento persistente.'
      }
    ],
    'cases':[
      {
        'title':'Sangrou antes, não sangrou durante',
        'data':[
          'Idoso com episódios de hematoquezia e angioTC sem extravasamento.',
          'Depois do exame ocorre novo sangramento visível.'
        ],
        'reasoning':[
          'A TC retrata o momento da aquisição.',
          'A hipótese de sangramento intermitente permanece e a estratégia deve considerar a atividade atual e a estabilidade.'
        ],
        'conduct':[
          'Reavaliar perfusão e necessidade de suporte.',
          'Articular nova investigação e tratamento com endoscopia ou radiologia intervencionista conforme o cenário.'
        ],
        'error':'Tratar o exame negativo como garantia de que o sangramento terminou definitivamente.'
      },
      {
        'title':'Extravasamento e plano de controle',
        'data':[
          'Adulto com sangramento ativo importante e angioTC localizando extravasamento colônico.',
          'A equipe de radiologia intervencionista está disponível.'
        ],
        'reasoning':[
          'A informação útil é a localização de uma fonte ativa e potencialmente acessível ao controle.',
          'A investigação deve agora se conectar ao tratamento, sem perder o acompanhamento clínico.'
        ],
        'conduct':[
          'Manter reanimação e discutir angiografia com possível embolização.',
          'Depois do controle, acompanhar recorrência e sinais de complicação isquêmica.'
        ],
        'error':'Repetir exames de detecção sem finalidade terapêutica enquanto o paciente continua sangrando.'
      }
    ],
    'recall':[
      {
        'q':'O que uma angioTC negativa informa em sangramento intermitente?',
        'a':'Que não houve extravasamento detectável no protocolo e no momento examinados; não exclui episódio anterior ou recorrente.'
      },
      {
        'q':'Por que comparar fases na angioTC?',
        'a':'Para diferenciar conteúdo previamente hiperdenso de contraste extravasado e avaliar sua mudança ao longo da aquisição.'
      },
      {
        'q':'Quais complicações vigiar depois de embolização intestinal?',
        'a':'Recorrência do sangramento e isquemia, interpretando dor, perfusão e evolução clínica.'
      }
    ]
  },
  'cirrad_4':{
    'pretest':[
      'Por que bico de pássaro não dispensa avaliação de pseudoacalasia?',
      'Quando um sinal contrastado sugestivo de benignidade ainda exige endoscopia?'
    ],
    'sections':[
      {
        'h':'Descrever o estudo contrastado antes de nomear o sinal',
        'list':[
          'Defina localização e extensão do estreitamento, simetria das margens, distensibilidade, relevo mucoso e passagem do contraste.',
          'Diferencie uma alteração fixa de uma contração transitória pela observação dinâmica.',
          'Relacione a imagem com disfagia para sólidos, para líquidos, perda ponderal e evolução dos sintomas.',
          'Diga o que o exame não responde: histologia e parte dos distúrbios motores exigem outros métodos.'
        ]
      },
      {
        'h':'Sinais clássicos e limites',
        'table':{
          'head':[
            'Padrão',
            'Hipótese de prova',
            'Diferencial ou limite',
            'Exame que completa'
          ],
          'rows':[
            [
              'Afilamento distal liso com dilatação',
              'Acalasia',
              'Obstrução tumoral pode produzir pseudoacalasia',
              'Endoscopia e avaliação motora conforme o caso'
            ],
            [
              'Contrações em saca-rolhas',
              'Distúrbio motor espástico',
              'Imagem isolada não define toda classificação motora',
              'Manometria quando indicada'
            ],
            [
              'Estreitamento irregular com defeito mucoso',
              'Neoplasia',
              'Inflamação ou sequela podem simular alterações',
              'Endoscopia com amostragem'
            ],
            [
              'Cratera de aspecto regular',
              'Úlcera aparentemente benigna',
              'A aparência não substitui investigação histológica',
              'Endoscopia e seguimento apropriado'
            ]
          ]
        }
      },
      {
        'h':'Perfuração, aspiração e escolhas seguras',
        'p':[
          'Na suspeita de perfuração, o tipo de contraste e o método devem ser escolhidos conforme a pergunta e o risco de aspiração. Um estudo sem extravasamento não encerra a investigação se a suspeita clínica continuar alta.',
          'Na suspeita de acalasia com apresentação atípica, perda ponderal ou dificuldade de passagem na junção, procure causa obstrutiva. O desenho em bico de pássaro não autoriza assumir que o problema é apenas motor.',
          'Hérnia paraesofágica sintomática ou complicada pode exigir tratamento cirúrgico, mas a indicação de uma hérnia assintomática precisa considerar risco, sintomas ocultos, condição clínica e decisão compartilhada.'
        ]
      }
    ],
    'exam':[
      {
        'c':'Esofagograma com bico de pássaro e perda ponderal preocupante.',
        'p':'Fechar acalasia primária só pelo sinal.',
        'r':'Investigar pseudoacalasia e excluir obstrução orgânica antes de tratar como distúrbio motor.'
      },
      {
        'c':'Úlcera gástrica de aspecto regular no estudo contrastado.',
        'p':'Dispensar endoscopia por aparência de benignidade.',
        'r':'Reconhecer que a imagem não fornece histologia e organizar avaliação endoscópica.'
      },
      {
        'c':'Suspeita persistente de perfuração com estudo inicial sem extravasamento.',
        'p':'Considerar a lesão excluída por um exame isolado.',
        'r':'Reavaliar a suspeita e escolher complementação conforme estabilidade e risco.'
      },
      {
        'c':'Hérnia paraesofágica em pessoa sem sintomas claros.',
        'p':'Aplicar indicação cirúrgica automática sem avaliar o paciente.',
        'r':'Discutir risco, manifestações clínicas, complicações e adequação do tratamento.'
      }
    ],
    'cases':[
      {
        'title':'O desenho clássico com história atípica',
        'data':[
          'Adulto com disfagia progressiva e perda ponderal importante.',
          'Estudo contrastado mostra afilamento distal e dilatação esofágica.'
        ],
        'reasoning':[
          'O padrão pode ocorrer na acalasia, mas os sintomas exigem excluir causa obstrutiva.',
          'Um nome de sinal não é confirmação de etiologia.'
        ],
        'conduct':[
          'Realizar avaliação endoscópica apropriada e considerar exames complementares conforme os achados.',
          'Somente depois integrar a avaliação motora e escolher tratamento.'
        ],
        'error':'Indicar procedimento para acalasia antes de avaliar pseudoacalasia.'
      },
      {
        'title':'A úlcera que parece benigna',
        'data':[
          'Paciente com sintomas dispépticos e cratera gástrica de contornos regulares no exame contrastado.',
          'A interpretação sugere aspecto benigno.'
        ],
        'reasoning':[
          'A morfologia favorece uma hipótese, mas não exclui malignidade com segurança.',
          'O exame contrastado não oferece tecido para análise.'
        ],
        'conduct':[
          'Organizar endoscopia com amostragem e tratamento conforme a avaliação clínica.',
          'Planejar seguimento da lesão de acordo com o diagnóstico e a evolução.'
        ],
        'error':'Encerrar a investigação porque as pregas chegam à cratera.'
      }
    ],
    'recall':[
      {
        'q':'O que deve ser descrito antes do epônimo de uma estenose esofágica?',
        'a':'Localização, extensão, margens, simetria, distensibilidade, mucosa e passagem do contraste.'
      },
      {
        'q':'Qual o limite do bico de pássaro?',
        'a':'Sugere acalasia, mas não exclui obstrução orgânica que cause pseudoacalasia.'
      },
      {
        'q':'Um exame contrastado negativo exclui perfuração em alta suspeita?',
        'a':'Não necessariamente. A avaliação deve continuar conforme o contexto clínico e a adequação técnica do exame.'
      }
    ]
  },
  'cirrad_5':{
    'pretest':[
      'Por que o padrão de realce deve ser comparado entre fases?',
      'Em que contexto os critérios de imagem para hepatocarcinoma podem ser aplicados?'
    ],
    'sections':[
      {
        'h':'Entender o realce para evitar decorar manchas',
        'p':[
          'O realce descreve como o contraste chega, se distribui e permanece no tecido. A comparação entre fases diferencia enchimento vascular progressivo, retenção hepatocitária e eliminação relativa do contraste.',
          'No hemangioma típico, nódulos periféricos acompanham o comportamento do sangue e preenchem a lesão progressivamente. A ausência do padrão típico exige caracterização, e não a aplicação forçada do nome hemangioma.',
          'Os critérios de LI-RADS têm população e técnica de aplicação definidas. Não é correto transformar qualquer nódulo hipervascular em hepatocarcinoma apenas porque uma fase parece mostrar washout.'
        ]
      },
      {
        'h':'Fase, contexto e diferencial',
        'table':{
          'head':[
            'Pergunta',
            'Pista útil',
            'Diferencial ou armadilha',
            'Consequência'
          ],
          'rows':[
            [
              'A lesão acompanha o sangue?',
              'Realce periférico nodular e preenchimento progressivo',
              'Realce em anel contínuo não é o mesmo padrão',
              'Caracterizar antes de procedimentos invasivos'
            ],
            [
              'Há captação hepatobiliar?',
              'Ajuda a avaliar hepatócitos e transportadores da lesão',
              'HNF e adenoma têm variantes; regra não é absoluta',
              'Integrar sequência completa e contexto'
            ],
            [
              'Há obstrução biliar e pancreática?',
              'Sinal do duplo ducto',
              'Estenose benigna e doença inflamatória podem simular neoplasia',
              'Investigar causa na cabeça pancreática e região periampular'
            ],
            [
              'Há massa com febre ou sinais infecciosos?',
              'Coleção e realce periférico',
              'Necrose tumoral pode se parecer com abscesso',
              'Correlacionar com clínica, culturas e discussão terapêutica'
            ]
          ]
        }
      },
      {
        'h':'Planejamento e complicações que a imagem precisa responder',
        'list':[
          'Na massa pancreática, descreva relação com vasos, ductos, órgãos vizinhos e doença à distância; detectar a massa é apenas parte do estadiamento.',
          'Na colestase, procure nível e causa da obstrução, sem usar apenas o calibre de um ducto isolado como diagnóstico.',
          'Em paciente com sinais de infecção e obstrução biliar, a investigação deve se conectar a suporte e controle da obstrução, sem atrasar tratamento para caracterização excessiva.',
          'Antes de biópsia de lesão focal, confirme se a caracterização radiológica ou uma avaliação multidisciplinar oferece caminho mais seguro e útil.'
        ]
      }
    ],
    'exam':[
      {
        'c':'Nódulo hepático com realce periférico nodular e enchimento progressivo.',
        'p':'Confundir com um anel contínuo e indicar biópsia de rotina.',
        'r':'Reconhecer padrão compatível com hemangioma e avaliar a caracterização completa.'
      },
      {
        'c':'Nódulo hipervascular em paciente sem contexto de aplicação do LI-RADS.',
        'p':'Usar o mesmo algoritmo diagnóstico de toda lesão em fígado de risco.',
        'r':'Considerar população, técnica e diferenciais antes de concluir hepatocarcinoma.'
      },
      {
        'c':'Dilatação simultânea do colédoco e do ducto pancreático.',
        'p':'Afirmar que o sinal sozinho confirma câncer.',
        'r':'Descrever duplo ducto e investigar obstrução pancreática ou periampular e seus diferenciais.'
      },
      {
        'c':'Exame de lesão hepática com uma única fase de contraste.',
        'p':'Concluir a natureza da lesão sem informação dinâmica suficiente.',
        'r':'Reconhecer limitação do protocolo e indicar caracterização apropriada quando necessária.'
      }
    ],
    'cases':[
      {
        'title':'O realce que acompanha o sangue',
        'data':[
          'Lesão hepática incidental com nódulos periféricos de realce e preenchimento progressivo nas fases posteriores.',
          'Paciente sem sintomas atribuíveis à lesão.'
        ],
        'reasoning':[
          'O padrão é compatível com espaço vascular de preenchimento lento.',
          'Antes de propor punção, é necessário confirmar a caracterização e a ausência de discordância clínica.'
        ],
        'conduct':[
          'Discutir o estudo dinâmico completo com a radiologia.',
          'Conduzir conforme caracterização e contexto, evitando procedimento invasivo sem benefício definido.'
        ],
        'error':'Biopsiar apenas porque existe uma massa sólida no fígado.'
      },
      {
        'title':'Duplo ducto não é diagnóstico histológico',
        'data':[
          'Adulto com icterícia e dilatação do colédoco e do ducto pancreático.',
          'A imagem inicial não define a causa da obstrução.'
        ],
        'reasoning':[
          'O sinal aponta para um nível provável de obstrução, não confirma sua natureza.',
          'Neoplasia e processos benignos devem ser diferenciados sem perder a avaliação de gravidade.'
        ],
        'conduct':[
          'Avaliar sinais de colangite e necessidade de suporte e drenagem.',
          'Escolher estudo complementar e eventual obtenção de tecido conforme a pergunta e o planejamento terapêutico.'
        ],
        'error':'Informar diagnóstico definitivo de câncer apenas pelo duplo ducto.'
      }
    ],
    'recall':[
      {
        'q':'Qual a diferença entre realce nodular periférico e realce em anel?',
        'a':'São distribuições diferentes de contraste; o padrão nodular com preenchimento progressivo favorece hemangioma típico, enquanto um anel exige outros diferenciais.'
      },
      {
        'q':'O que limita o uso do LI-RADS?',
        'a':'A população para a qual os critérios se aplicam e a adequação técnica do exame, além da integração dos achados.'
      },
      {
        'q':'O sinal do duplo ducto confirma adenocarcinoma?',
        'a':'Não. Sugere obstrução em região pancreática ou periampular e exige investigação da causa.'
      }
    ]
  },
  'ciruro_0':{
    'pretest':[
      'Por que hematúria em pessoa anticoagulada ainda pode exigir investigação urológica?',
      'Por que resíduo pós-miccional elevado não prova sozinho obstrução prostática?'
    ],
    'sections':[
      {
        'h':'Fisiologia para separar sintoma, mecanismo e diagnóstico',
        'p':[
          'A micção depende da coordenação entre contração do detrusor e relaxamento da via de saída. Um jato fraco pode resultar de resistência aumentada, contração insuficiente ou da combinação dos mecanismos.',
          'Sintomas de armazenamento não significam necessariamente doença exclusiva da bexiga, assim como sintomas de esvaziamento não provam hiperplasia prostática. Medicamentos, infecção, doença neurológica e alterações funcionais fazem parte da investigação.',
          'A fase da hematúria sugere localização, mas não substitui investigação quando o risco indica. Anticoagulação pode facilitar a manifestação de uma lesão e não deve ser usada como explicação definitiva sem avaliar o contexto.'
        ]
      },
      {
        'h':'Diferenciais que mudam a investigação',
        'table':{
          'head':[
            'Apresentação',
            'Hipóteses',
            'Achado útil',
            'Conduta de raciocínio'
          ],
          'rows':[
            [
              'Hematúria com proteinúria e cilindros',
              'Doença glomerular',
              'Sedimento e função renal',
              'Avaliar componente nefrológico, sem ignorar risco urológico coexistente'
            ],
            [
              'Hematúria indolor com fatores de risco',
              'Tumor urotelial entre as hipóteses',
              'História de tabagismo e padrão de sangramento',
              'Investigar bexiga e trato superior conforme risco e adequação do método'
            ],
            [
              'Jato fraco com resíduo elevado',
              'Obstrução ou detrusor hipoativo',
              'História, exame e avaliação funcional selecionada',
              'Não operar apenas pelo resíduo'
            ],
            [
              'Disúria, frequência e hematúria',
              'Infecção, cálculo e outras causas',
              'Urina, cultura quando indicada e evolução',
              'Confirmar resolução e reavaliar persistência'
            ]
          ]
        }
      },
      {
        'h':'Avaliação e comunicação em passos',
        'list':[
          'Caracterize dor, coágulos, sintomas miccionais, menstruação ou outra possibilidade de contaminação, trauma, medicamentos e antecedentes.',
          'Avalie retenção por coágulos, perfusão e repercussão do sangramento antes de uma investigação eletiva.',
          'Confirme a qualidade da amostra e a pertinência do exame; citologia não substitui cistoscopia quando esta é indicada.',
          'Explique que exames do trato superior e avaliação endoscópica da bexiga respondem perguntas complementares.',
          'Na retenção com suspeita de lesão uretral, evite tentativas repetidas e traumáticas de sondagem; organize avaliação urológica e via de drenagem adequada.'
        ]
      }
    ],
    'exam':[
      {
        'c':'Tabagista anticoagulado com hematúria visível indolor.',
        'p':'Atribuir todo sangramento ao anticoagulante e encerrar a investigação.',
        'r':'Avaliar repercussão e investigar causa urológica conforme o contexto e o risco.'
      },
      {
        'c':'Urina com hemácias dismórficas e cilindros.',
        'p':'Tratar como infecção urinária por haver alteração do exame.',
        'r':'Reconhecer provável origem glomerular e avaliar função renal e componente nefrológico.'
      },
      {
        'c':'Jato fraco com grande resíduo pós-miccional.',
        'p':'Concluir que só a próstata pode explicar o resultado.',
        'r':'Diferenciar resistência da saída e força do detrusor antes de escolher tratamento.'
      },
      {
        'c':'Exame de imagem do trato superior sem lesão em pessoa que tem indicação de cistoscopia.',
        'p':'Cancelar a avaliação da bexiga porque a TC foi normal.',
        'r':'Reconhecer a complementaridade dos métodos e manter investigação apropriada.'
      }
    ],
    'cases':[
      {
        'title':'O anticoagulante não encerra a história',
        'data':[
          'Idoso tabagista apresenta hematúria macroscópica indolor.',
          'Usa anticoagulante e não tem sintomas infecciosos evidentes.'
        ],
        'reasoning':[
          'O medicamento pode aumentar o sangramento, mas não identifica sua origem.',
          'A apresentação exige considerar doença urotelial, além de avaliar retenção e repercussão.'
        ],
        'conduct':[
          'Avaliar gravidade e revisar anticoagulação conforme risco e indicação, sem suspensão automática e desassistida.',
          'Organizar investigação da bexiga e do trato superior conforme avaliação de risco e condições clínicas.'
        ],
        'error':'Concluir hematúria medicamentosa sem investigar lesão subjacente.'
      },
      {
        'title':'Jato fraco não é sinônimo de próstata obstrutiva',
        'data':[
          'Homem com jato fraco, sensação de esvaziamento incompleto e resíduo persistente.',
          'Há antecedente de doença neurológica.'
        ],
        'reasoning':[
          'O detrusor pode estar hipoativo; obstrução também pode coexistir.',
          'Resíduo e sintomas quantificam o problema, mas não definem sozinhos seu mecanismo.'
        ],
        'conduct':[
          'Rever história, medicamentos, exame e função renal.',
          'Solicitar avaliação funcional selecionada quando seu resultado puder mudar a decisão de intervenção.'
        ],
        'error':'Prometer resolução com cirurgia prostática sem esclarecer a função vesical.'
      }
    ],
    'recall':[
      {
        'q':'Por que não atribuir hematúria apenas à anticoagulação?',
        'a':'Porque o tratamento pode revelar ou agravar sangramento de uma lesão que continua precisando de investigação.'
      },
      {
        'q':'Resíduo elevado diferencia obstrução de hipocontratilidade?',
        'a':'Não sozinho. É necessário integrar o contexto e, em situações selecionadas, avaliação funcional.'
      },
      {
        'q':'O que deve ser avaliado antes de investigar eletivamente uma hematúria?',
        'a':'Perfusão, repercussão clínica, retenção por coágulos e necessidade de controle inicial do problema.'
      }
    ]
  },
  'ciruro_1':{
    'pretest':[
      'Por que antibiótico sem drenagem pode falhar no sistema urinário obstruído e infectado?',
      'Quais fatores além do tamanho influenciam a escolha do tratamento do cálculo?'
    ],
    'sections':[
      {
        'h':'Obstrução e infecção: por que a drenagem muda o prognóstico',
        'p':[
          'A obstrução aumenta a pressão a montante, prejudica a drenagem e pode reduzir a função renal. Quando há infecção, o sistema fechado dificulta o controle do foco e favorece deterioração sistêmica.',
          'A descompressão por cateter ureteral ou nefrostomia faz parte do controle da fonte. A escolha depende de anatomia, condições clínicas, acesso e experiência; não se deve atrasar uma via viável para insistir numa preferência abstrata.',
          'A retirada definitiva do cálculo é planejada depois do controle infeccioso. Manipular e fragmentar o cálculo durante sepse ativa pode agravar a repercussão sistêmica.'
        ]
      },
      {
        'h':'Da cólica ao diferencial perigoso',
        'table':{
          'head':[
            'Apresentação',
            'Hipótese',
            'Armadilha',
            'O que muda a prioridade'
          ],
          'rows':[
            [
              'Cólica lombar com hematúria',
              'Litíase',
              'Nem toda dor lombar é cálculo',
              'Excluir causas vasculares, abdominais e ginecológicas conforme história'
            ],
            [
              'Dor com febre e obstrução',
              'Infecção em sistema obstruído',
              'Esperar apenas o efeito do antibiótico',
              'Controle da fonte e suporte'
            ],
            [
              'Cálculo e piora de função renal',
              'Obstrução com repercussão',
              'Aplicar apenas uma regra de tamanho',
              'Avaliar rim único, bilateralidade e necessidade de intervenção'
            ],
            [
              'Cristais ou cálculo de composição presumida',
              'Distúrbio metabólico',
              'Prescrever prevenção igual para todos',
              'Análise do cálculo e avaliação metabólica conforme indicação'
            ]
          ]
        }
      },
      {
        'h':'Escolha técnica e prevenção em passos',
        'list':[
          'Decida primeiro se existe emergência, depois se há possibilidade segura de observação.',
          'Na intervenção, considere localização, carga litiásica, densidade, anatomia, composição provável e preferências do paciente, além do tamanho.',
          'Na ureteroscopia, a avaliação do acesso e a identificação do cálculo precedem a fragmentação e retirada; drenagem e seguimento dependem do procedimento e do contexto.',
          'Na abordagem percutânea, planejamento do trajeto e controle de infecção e sangramento são parte central da segurança.',
          'Depois, revise fragmentos residuais, sintomas e sinais de obstrução; o tratamento de uma crise não substitui prevenção de recorrência.'
        ],
        'after':'Hidratação não deve ser forçada durante uma cólica obstrutiva. A prevenção hídrica é individualizada e considera função cardíaca, renal e metas discutidas com o paciente.'
      }
    ],
    'exam':[
      {
        'c':'Cálculo ureteral com infecção e repercussão sistêmica.',
        'p':'Escolher terapia expulsiva ou retirada definitiva imediata como primeira etapa.',
        'r':'Reanimar, tratar infecção e descomprimir o sistema obstruído.'
      },
      {
        'c':'Cálculo aparentemente pequeno em rim único com obstrução e piora funcional.',
        'p':'Aplicar a regra de que cálculo pequeno sempre pode esperar.',
        'r':'Priorizar repercussão renal e necessidade de intervenção, não só a dimensão.'
      },
      {
        'c':'Litíase recorrente com proposta de retirar todo cálcio da dieta.',
        'p':'Confundir cálcio do cálculo com indicação de restrição alimentar indiscriminada.',
        'r':'Planejar prevenção de acordo com avaliação metabólica e orientação nutricional apropriada.'
      },
      {
        'c':'Paciente infectado em que a via retrógrada não é viável.',
        'p':'Adiar drenagem até que seja possível colocar duplo J.',
        'r':'Considerar nefrostomia como via de descompressão, conforme condições e disponibilidade.'
      }
    ],
    'cases':[
      {
        'title':'Drenar antes de resolver a pedra',
        'data':[
          'Adulto com cólica, febre, sinais de infecção sistêmica e obstrução urinária na imagem.',
          'A equipe identifica cálculo ureteral.'
        ],
        'reasoning':[
          'O problema imediato é um foco infeccioso com drenagem comprometida.',
          'O tamanho do cálculo não reduz a urgência do controle da fonte.'
        ],
        'conduct':[
          'Iniciar suporte e antibiótico apropriado ao cenário, obtendo culturas quando possível sem atrasar tratamento.',
          'Organizar descompressão por via adequada e planejar tratamento definitivo após controle da infecção.'
        ],
        'error':'Tentar apenas terapia expulsiva ou fragmentar o cálculo antes de controlar a infecção.'
      },
      {
        'title':'A prevenção precisa do mecanismo',
        'data':[
          'Paciente com cálculos recorrentes quer abolir leite e derivados por presumir cálculo de cálcio.',
          'Não há análise prévia do cálculo nem avaliação metabólica direcionada.'
        ],
        'reasoning':[
          'A composição e o mecanismo de formação não devem ser presumidos por uma única informação.',
          'Restrição indiscriminada pode piorar o balanço de oxalato e não corrige todos os mecanismos.'
        ],
        'conduct':[
          'Rever dieta e fatores de risco e orientar ingestão hídrica compatível com as condições clínicas.',
          'Obter análise e avaliação metabólica quando indicadas antes de individualizar medidas farmacológicas.'
        ],
        'error':'Aplicar a mesma restrição e o mesmo medicamento a toda litíase.'
      }
    ],
    'recall':[
      {
        'q':'Por que o cálculo obstrutivo infectado exige controle da fonte?',
        'a':'Porque a drenagem prejudicada mantém o foco e pode impedir resposta adequada ao antibiótico isolado.'
      },
      {
        'q':'Quais fatores além de tamanho influenciam a técnica para litíase?',
        'a':'Localização, anatomia, composição, densidade, carga litiásica, risco clínico e preferências.'
      },
      {
        'q':'Por que não forçar hidratação durante cólica obstrutiva?',
        'a':'Porque aumentar a produção urinária não resolve a barreira e pode piorar a pressão e a dor; a hidratação é guiada pela condição clínica.'
      }
    ]
  },
  'ciruro_2':{
    'pretest':[
      'Por que aliviar resistência uretral pode não corrigir todos os sintomas de armazenamento?',
      'Quais complicações devem ser vigiadas após desobstruir uma retenção prolongada?'
    ],
    'sections':[
      {
        'h':'Componente estático, dinâmico e vesical',
        'p':[
          'O aumento do tecido prostático pode estreitar a saída, enquanto o tônus da musculatura lisa contribui para a resistência dinâmica. A resposta do detrusor à sobrecarga pode evoluir com hiperatividade e, em alguns pacientes, perda de força contrátil.',
          'Por isso, volume prostático e intensidade dos sintomas não são equivalentes. O tratamento deve considerar incômodo, mecanismo provável, repercussão sobre o trato superior e objetivos do paciente.',
          'O alfabloqueador atua predominantemente no componente dinâmico. O inibidor da redutase modifica o estímulo hormonal e tem papel em situações selecionadas de aumento prostático, com velocidade de resposta e perfil de efeitos diferentes.'
        ]
      },
      {
        'h':'Diferenciais de sintomas atribuídos à HPB',
        'table':{
          'head':[
            'Pista',
            'Hipótese alternativa ou associada',
            'Avaliação útil',
            'Armadilha'
          ],
          'rows':[
            [
              'Jato fraco após instrumentação',
              'Estenose uretral',
              'História e avaliação anatômica selecionada',
              'Atribuir tudo à próstata'
            ],
            [
              'Urgência predominante',
              'Disfunção de armazenamento',
              'Urina, diário e resíduo conforme o caso',
              'Presumir obstrução apenas pelo sexo ou idade'
            ],
            [
              'Retenção com doença neurológica',
              'Disfunção neurogênica ou hipoatividade',
              'Exame e avaliação funcional selecionada',
              'Operar sem esclarecer o mecanismo'
            ],
            [
              'Hematúria recorrente',
              'Cálculo ou neoplasia entre diferenciais',
              'Investigação apropriada ao risco',
              'Chamar de sangramento prostático por exclusão incompleta'
            ]
          ]
        }
      },
      {
        'h':'Princípios técnicos e pós-operatório',
        'list':[
          'RTU e enucleação tratam o adenoma obstrutivo; não são equivalentes à prostatectomia radical oncológica.',
          'O planejamento considera volume, anatomia, condições clínicas, experiência da equipe e prioridades como continência e função sexual.',
          'Após a operação, observe drenagem da sonda, sangramento, coágulos, dor e retenção; uma sonda que deixa de drenar precisa de avaliação.',
          'Depois da desobstrução de retenção crônica, monitore balanço hídrico, perfusão e eletrólitos por risco de diurese pós-obstrutiva.',
          'Estenose uretral, contratura do colo, incontinência e alterações ejaculatórias fazem parte do aconselhamento e do seguimento.'
        ],
        'after':'A interpretação do PSA em uso de inibidor da redutase depende de tempo de uso, adesão, valor de referência e evolução. Uma correção aritmética isolada não substitui avaliar uma elevação persistente.'
      }
    ],
    'exam':[
      {
        'c':'Próstata aumentada com poucos sintomas e sem complicações.',
        'p':'Indicar cirurgia pelo tamanho isolado.',
        'r':'Integrar incômodo, repercussão e preferência antes de escolher observação, medicamento ou intervenção.'
      },
      {
        'c':'Sintomas de esvaziamento com próstata pequena e antecedente de instrumentação.',
        'p':'Prescrever a mesma combinação usada para qualquer HPB.',
        'r':'Investigar estenose e outros mecanismos de obstrução ou disfunção vesical.'
      },
      {
        'c':'Poliúria depois da drenagem de retenção prolongada.',
        'p':'Considerar toda diurese como sinal de recuperação sem riscos.',
        'r':'Monitorar balanço e eletrólitos e ajustar suporte conforme a evolução.'
      },
      {
        'c':'PSA em pessoa que usa finasterida com adesão irregular.',
        'p':'Aplicar um fator fixo e concluir normalidade sem contexto.',
        'r':'Interpretar tratamento, tendência e avaliação clínica em conjunto.'
      }
    ],
    'cases':[
      {
        'title':'A próstata grande e o paciente pouco incomodado',
        'data':[
          'Idoso com aumento prostático na ultrassonografia e sintomas pouco incômodos.',
          'Sem retenção recorrente ou repercussão renal documentada.'
        ],
        'reasoning':[
          'A dimensão não determina sozinha a necessidade de tratamento invasivo.',
          'A escolha deve equilibrar benefícios, riscos e objetivos do paciente.'
        ],
        'conduct':[
          'Revisar sintomas, hábitos, medicamentos e sinais de complicação.',
          'Discutir observação ou tratamento individualizado e explicar motivos para procurar reavaliação.'
        ],
        'error':'Indicar cirurgia apenas porque a imagem descreveu próstata volumosa.'
      },
      {
        'title':'O problema depois de abrir a saída',
        'data':[
          'Paciente com retenção prolongada apresenta grande débito urinário após drenagem.',
          'Passa a ter sede e sinais de redução do volume circulante.'
        ],
        'reasoning':[
          'Diurese pós-obstrutiva pode provocar perda de água e solutos.',
          'A desobstrução não encerra o cuidado quando há repercussão clínica.'
        ],
        'conduct':[
          'Acompanhar balanço, perfusão, função renal e eletrólitos.',
          'Individualizar reposição e monitoramento de acordo com a evolução e comorbidades.'
        ],
        'error':'Dar alta imediatamente porque a sonda drenou e a creatinina começou a melhorar.'
      }
    ],
    'recall':[
      {
        'q':'Por que tamanho prostático não se correlaciona perfeitamente com sintomas?',
        'a':'Porque resistência dinâmica, anatomia e função do detrusor também participam da micção.'
      },
      {
        'q':'Qual a diferença entre cirurgia para HPB e prostatectomia radical?',
        'a':'A cirurgia para HPB trata o tecido obstrutivo; a radical tem objetivo oncológico e escopo anatômico diferente.'
      },
      {
        'q':'O que deve ser monitorado na diurese pós-obstrutiva?',
        'a':'Balanço hídrico, perfusão, função renal e eletrólitos, com suporte individualizado.'
      }
    ]
  },
  'ciruro_3':{
    'pretest':[
      'O sinal de Prehn pode excluir torção testicular?',
      'Por que escolher antibiótico para epididimite apenas pela idade é insuficiente?'
    ],
    'sections':[
      {
        'h':'A anatomia e o mecanismo orientam o controle do foco',
        'p':[
          'Infecção vesical, renal, prostática e de tecidos perineais não são o mesmo problema. O tecido acometido, a repercussão sistêmica, os fatores de resistência e a possibilidade de obstrução mudam tratamento e necessidade de intervenção.',
          'Na prostatite aguda, manipulação vigorosa pode piorar dor e disseminação; investigação e conduta devem evitar massagem prostática como rotina diagnóstica.',
          'Na fasciite perineal, a infecção se espalha por planos profundos, de modo que a lesão cutânea pode subestimar a extensão. Suporte e antibiótico não substituem desbridamento quando há necrose.'
        ]
      },
      {
        'h':'Escroto agudo: comparar sem depender de um sinal isolado',
        'table':{
          'head':[
            'Pista',
            'Torção',
            'Epididimite',
            'Limite do achado'
          ],
          'rows':[
            [
              'Instalação e dor',
              'Frequentemente súbita e intensa',
              'Pode ser mais gradual',
              'Apresentações atípicas existem'
            ],
            [
              'Sintomas urinários ou exposição sexual',
              'Não excluem torção se presentes',
              'Podem orientar a investigação infecciosa',
              'História sexual e urinária vale mais que idade isolada'
            ],
            [
              'Posição e reflexo cremastérico',
              'Alterações aumentam a suspeita',
              'Não definem etiologia isoladamente',
              'Nenhum sinal único é garantia de exclusão'
            ],
            [
              'Doppler',
              'Pode contribuir quando há dúvida',
              'Ajuda a avaliar perfusão e inflamação',
              'Não deve atrasar exploração em alta suspeita clínica'
            ]
          ]
        }
      },
      {
        'h':'Piúria estéril e uso responsável de antibiótico',
        'p':[
          'Piúria com cultura habitual negativa exige revisar qualidade da amostra, uso prévio de antibiótico, uretrite, cálculo, nefrite e tuberculose conforme a história. O padrão não confirma automaticamente tuberculose.',
          'Na suspeita de tuberculose urogenital, combine métodos microbiológicos adequados, avaliação do trato urinário e investigação de outros focos. Depois do controle infeccioso, estenoses e perda funcional podem exigir acompanhamento ou reconstrução.',
          'A bacteriúria assintomática tem indicações específicas de tratamento, incluindo gestação e determinados procedimentos urológicos com trauma de mucosa. A presença de bactérias sem sintomas não é justificativa universal para antibiótico.'
        ]
      }
    ],
    'exam':[
      {
        'c':'Adolescente com dor escrotal súbita e sinal de Prehn aparentemente positivo.',
        'p':'Excluir torção porque elevar o testículo aliviou a dor.',
        'r':'Integrar história e exame e manter avaliação cirúrgica urgente se houver suspeita de torção.'
      },
      {
        'c':'Paciente com epididimite e pergunta sobre agente provável.',
        'p':'Separar infecção sexual e entérica apenas por uma idade de corte.',
        'r':'Considerar exposição sexual, práticas, sintomas urinários e fatores de risco.'
      },
      {
        'c':'Idosa sem sintomas urinários com cultura positiva.',
        'p':'Tratar o laudo apesar de não haver indicação clínica específica.',
        'r':'Distinguir bacteriúria assintomática de infecção que exige tratamento.'
      },
      {
        'c':'Dor perineal intensa com deterioração e alterações cutâneas discretas.',
        'p':'Esperar necrose extensa visível antes de pedir cirurgia.',
        'r':'Considerar infecção necrosante e priorizar avaliação e controle do foco.'
      }
    ],
    'cases':[
      {
        'title':'Alívio à elevação não afasta torção',
        'data':[
          'Adolescente com início súbito de dor escrotal e posição testicular suspeita.',
          'Refere algum alívio ao elevar o escroto.'
        ],
        'reasoning':[
          'O sinal de Prehn não tem segurança para excluir torção.',
          'O padrão clínico exige preservar a prioridade de avaliação cirúrgica.'
        ],
        'conduct':[
          'Solicitar avaliação urológica urgente e evitar atrasos em alta suspeita.',
          'Usar Doppler quando ele contribuir na dúvida sem postergar o tratamento necessário.'
        ],
        'error':'Prescrever antibiótico para epididimite apenas pelo alívio ao elevar.'
      },
      {
        'title':'Leucócitos sem uma explicação pronta',
        'data':[
          'Adulto com sintomas urinários persistentes, piúria e culturas habituais negativas.',
          'Há história epidemiológica que torna tuberculose uma possibilidade.'
        ],
        'reasoning':[
          'Piúria estéril é uma pista, não um diagnóstico.',
          'É preciso avaliar uso prévio de antibiótico, infecções não detectadas pela cultura comum e outras causas.'
        ],
        'conduct':[
          'Organizar microbiologia apropriada e avaliação anatômica conforme a suspeita.',
          'Planejar tratamento específico e acompanhamento de possíveis sequelas quando o diagnóstico estiver estabelecido.'
        ],
        'error':'Iniciar esquema prolongado apenas pelo rótulo piúria estéril, sem investigar a causa.'
      }
    ],
    'recall':[
      {
        'q':'Qual o limite do sinal de Prehn?',
        'a':'Não confirma epididimite nem exclui torção; deve ser interpretado no conjunto clínico.'
      },
      {
        'q':'O que define melhor o agente provável da epididimite além da idade?',
        'a':'Exposição sexual, práticas, antecedentes urinários, instrumentação e contexto epidemiológico.'
      },
      {
        'q':'Por que Fournier exige avaliar além da pele?',
        'a':'Porque o comprometimento fascial pode ser mais extenso que a alteração cutânea e requer controle cirúrgico oportuno.'
      }
    ]
  },
  'ciruro_4':{
    'pretest':[
      'O que diferencia vigilância ativa de espera vigilante?',
      'Por que a presença de detrusor na amostra da RTU muda o estadiamento da bexiga?'
    ],
    'sections':[
      {
        'h':'Diagnóstico, risco e escolha não são a mesma etapa',
        'p':[
          'PSA não é diagnóstico histológico de câncer. Inflamação, manipulação, volume prostático e medicamentos podem interferir; suspeitas devem ser avaliadas no contexto antes de indicar uma estratégia invasiva.',
          'Ressonância e biópsia respondem perguntas complementares. O resultado deve ser integrado ao grupo histológico, à extensão, às condições de saúde e às preferências do paciente.',
          'Vigilância ativa busca identificar progressão que justifique tratamento com intenção curativa. Espera vigilante prioriza o manejo de sintomas em outro contexto de expectativa e condições clínicas; os termos não são sinônimos.'
        ]
      },
      {
        'h':'Bexiga: anatomia da amostra, risco e decisão',
        'table':{
          'head':[
            'Situação',
            'Pergunta necessária',
            'Possível estratégia',
            'Armadilha'
          ],
          'rows':[
            [
              'RTU sem músculo adequado em cenário que exige avaliar profundidade',
              'A amostra permite estadiar?',
              'Reavaliar ressecção e necessidade de nova abordagem conforme o caso',
              'Chamar ausência de informação de ausência de invasão'
            ],
            [
              'Doença não músculo-invasiva',
              'Qual risco de recorrência e progressão?',
              'Tratamento intravesical e seguimento conforme categoria de risco',
              'Oferecer o mesmo esquema a todos'
            ],
            [
              'Invasão de detrusor',
              'Qual extensão e elegibilidade terapêutica?',
              'Tratamento radical ou preservação selecionada em discussão multidisciplinar',
              'Usar BCG isolado como tratamento suficiente'
            ],
            [
              'Falha de tratamento intravesical de alto risco',
              'Há doença persistente e qual a categoria da falha?',
              'Reavaliar estadiamento e alternativas, incluindo cirurgia quando indicada',
              'Repetir indefinidamente a mesma estratégia sem avaliar progressão'
            ]
          ]
        }
      },
      {
        'h':'Princípios cirúrgicos e acompanhamento',
        'list':[
          'Na RTU de bexiga, a descrição do tumor e a obtenção de tecido suficiente para avaliar profundidade influenciam todo o plano posterior.',
          'Na prostatectomia radical, o controle oncológico deve ser discutido junto ao risco de incontinência e disfunção erétil; a preservação de estruturas depende da segurança oncológica.',
          'Na cistectomia, a derivação urinária faz parte do planejamento: função renal, condições intestinais, capacidade de autocuidado e seguimento influenciam a escolha.',
          'Após tratamento, vigie complicações urinárias, infecciosas, funcionais e metabólicas próprias da estratégia utilizada.',
          'Terapia trimodal preservadora da bexiga e esquemas sistêmicos exigem seleção e acompanhamento próprios; alternativas e protocolos atuais precisam de conferência nas fontes.'
        ]
      }
    ],
    'exam':[
      {
        'c':'Câncer de próstata de baixo risco em paciente apto a seguimento.',
        'p':'Equiparar o diagnóstico de câncer à necessidade imediata de cirurgia.',
        'r':'Discutir vigilância ativa e alternativas de acordo com risco, condições e preferências.'
      },
      {
        'c':'Laudo de RTU sem detrusor em cenário que exige avaliar invasão.',
        'p':'Afirmar que o tumor não invade músculo porque não há músculo descrito.',
        'r':'Reconhecer limitação de estadiamento e planejar reavaliação adequada.'
      },
      {
        'c':'Tumor que invade o músculo da bexiga.',
        'p':'Manter apenas tratamento intravesical como se fosse doença superficial.',
        'r':'Avaliar estadiamento e estratégia radical ou preservadora selecionada com equipe multidisciplinar.'
      },
      {
        'c':'Homem assintomático pedindo PSA por iniciativa própria.',
        'p':'Confundir investigação de sintomas com programa de rastreamento populacional.',
        'r':'Explicar posições institucionais, benefícios e riscos e realizar decisão informada.'
      }
    ],
    'cases':[
      {
        'title':'Diagnóstico de câncer sem obrigação de operar imediatamente',
        'data':[
          'Homem com câncer de próstata classificado como baixo risco.',
          'Tem condições de aderir ao acompanhamento e deseja entender alternativas.'
        ],
        'reasoning':[
          'O risco de progressão e os danos do tratamento precisam ser comparados.',
          'Vigilância ativa é uma estratégia estruturada, não abandono do caso.'
        ],
        'conduct':[
          'Discutir vigilância e tratamentos definitivos em decisão compartilhada.',
          'Explicar acompanhamento e quais achados podem motivar mudança de estratégia.'
        ],
        'error':'Oferecer cirurgia como única conduta possível apenas pelo nome câncer.'
      },
      {
        'title':'O músculo que não foi amostrado',
        'data':[
          'Paciente com tumor vesical ressecado por via endoscópica.',
          'O relatório não permite avaliar adequadamente a relação com o músculo detrusor.'
        ],
        'reasoning':[
          'A profundidade influencia risco e tratamento.',
          'Ausência de músculo na amostra não equivale a ausência de invasão.'
        ],
        'conduct':[
          'Rever relatório operatório e anatomopatológico e discutir necessidade de nova ressecção ou avaliação.',
          'Definir o plano após estadiamento e estratificação adequados.'
        ],
        'error':'Iniciar seguimento de baixo risco com base em uma amostra insuficiente.'
      }
    ],
    'recall':[
      {
        'q':'Vigilância ativa e espera vigilante são sinônimos?',
        'a':'Não. A primeira acompanha progressão para possível tratamento curativo; a segunda tem foco diferente, principalmente controle de sintomas conforme o contexto clínico.'
      },
      {
        'q':'Por que a qualidade da RTU influencia o tratamento do câncer de bexiga?',
        'a':'Porque amostragem e profundidade permitem estadiar e estratificar risco; informação insuficiente pode levar a subtratamento.'
      },
      {
        'q':'O que deve entrar no aconselhamento antes de tratamento radical de próstata?',
        'a':'Benefício oncológico, alternativas e riscos urinários e sexuais, considerando condições e preferências do paciente.'
      }
    ]
  },
  'ciruro_5':{
    'pretest':[
      'Por que preservar néfrons pode importar além do controle do tumor?',
      'Que limitações existem ao interpretar marcador tumoral isoladamente?'
    ],
    'sections':[
      {
        'h':'Massa renal: controlar tumor sem esquecer o órgão',
        'p':[
          'A massa sólida com realce sugere tecido vascularizado, mas não define sozinha o subtipo histológico nem a necessidade da mesma intervenção em todos os pacientes.',
          'A preservação de néfrons deve ser considerada junto à complexidade anatômica e à segurança oncológica. Função renal prévia, rim contralateral e comorbidades entram na escolha entre cirurgia parcial, radical e alternativas selecionadas.',
          'Lesões císticas complexas exigem classificação na técnica adequada e interpretação contextual. Categoria de imagem, risco clínico e preferências precisam ser integrados; o rótulo de uma categoria não elimina decisão individualizada.'
        ]
      },
      {
        'h':'Massa renal, testicular e peniana: não trocar a via de investigação',
        'table':{
          'head':[
            'Apresentação',
            'Pergunta central',
            'Estratégia inicial',
            'Armadilha'
          ],
          'rows':[
            [
              'Massa renal incidental',
              'Qual o padrão, extensão e contexto funcional?',
              'Caracterização por imagem e discussão de opções',
              'Indicar radical para toda massa'
            ],
            [
              'Massa intratesticular suspeita',
              'Há tumor e qual o contexto de marcadores?',
              'Ultrassom, marcadores e avaliação urológica',
              'Punção transescrotal de rotina'
            ],
            [
              'AFP elevada em contexto de tumor testicular',
              'Há componente não seminomatoso ou outra explicação?',
              'Correlacionar histologia, tendência e causas alternativas',
              'Classificar tumor apenas por um número isolado'
            ],
            [
              'Lesão ulcerada peniana persistente',
              'Qual histologia, extensão e risco linfonodal?',
              'Exame completo e amostragem apropriada',
              'Tratar por tempo indefinido como inflamação sem esclarecer diagnóstico'
            ]
          ]
        }
      },
      {
        'h':'Passos cirúrgicos de prova e complicações',
        'list':[
          'Na suspeita de tumor testicular, planeje a via inguinal, o controle alto do cordão e a retirada adequada para análise, evitando violação escrotal de rotina.',
          'Obtenha e interprete marcadores dentro da sequência diagnóstica e de seguimento. Histologia, imagem e evolução pós-operatória compõem o estadiamento.',
          'Antes de tratamento que possa afetar fertilidade, discuta preservação reprodutiva conforme a situação e o tempo disponível.',
          'Na cirurgia renal, o planejamento deve antecipar risco de sangramento, perda funcional e vazamento urinário quando há manipulação do sistema coletor.',
          'No câncer de pênis, avaliação do tumor primário e dos linfonodos faz parte de um mesmo plano; preservar órgão exige controle oncológico e seguimento adequados.'
        ]
      }
    ],
    'exam':[
      {
        'c':'Massa renal pequena com anatomia favorável e possibilidade de preservar parênquima.',
        'p':'Escolher nefrectomia radical apenas porque se trata de neoplasia.',
        'r':'Considerar preservação de néfrons, segurança oncológica e alternativas conforme o paciente.'
      },
      {
        'c':'Massa testicular suspeita com proposta de biópsia pelo escroto.',
        'p':'Aplicar a via habitual de outras lesões superficiais.',
        'r':'Reconhecer a importância da abordagem inguinal oncológica e evitar violação escrotal de rotina.'
      },
      {
        'c':'Histologia sugerindo seminoma e AFP discordante.',
        'p':'Ignorar a discordância ou assumir componente tumoral sem avaliar o conjunto.',
        'r':'Rever histologia, marcador e causas alternativas, pois seminoma puro não explica produção tumoral de AFP.'
      },
      {
        'c':'Lesão peniana persistente e linfonodos suspeitos.',
        'p':'Tratar só a ferida e esquecer o estadiamento regional.',
        'r':'Confirmar diagnóstico e avaliar tumor e cadeia linfonodal em plano integrado.'
      }
    ],
    'cases':[
      {
        'title':'Massa renal e reserva funcional',
        'data':[
          'Paciente com massa renal localizada e anatomia que pode permitir ressecção parcial.',
          'Apresenta doença renal prévia.'
        ],
        'reasoning':[
          'O tratamento precisa equilibrar controle do tumor e função renal remanescente.',
          'A presença de uma massa não torna a cirurgia radical obrigatória.'
        ],
        'conduct':[
          'Rever caracterização, extensão e complexidade com a equipe urológica.',
          'Discutir preservação de néfrons e alternativas selecionadas de acordo com risco e preferências.'
        ],
        'error':'Escolher radical sem avaliar viabilidade de preservação funcional.'
      },
      {
        'title':'A via faz parte do tratamento do tumor testicular',
        'data':[
          'Adulto com nódulo intratesticular endurecido e ultrassom suspeito.',
          'Uma biópsia transescrotal foi sugerida para confirmar o diagnóstico.'
        ],
        'reasoning':[
          'A via de acesso interfere no planejamento oncológico e linfático.',
          'Os marcadores ajudam a avaliação, mas não substituem o conjunto diagnóstico.'
        ],
        'conduct':[
          'Encaminhar à avaliação urológica e obter marcadores apropriados.',
          'Planejar abordagem inguinal oncológica e discutir fertilidade, estadiamento e seguimento.'
        ],
        'error':'Realizar punção transescrotal de rotina como se fosse qualquer nódulo cutâneo.'
      }
    ],
    'recall':[
      {
        'q':'Por que a função renal influencia a escolha para uma massa renal?',
        'a':'Porque o benefício oncológico deve ser equilibrado com a reserva funcional, especialmente quando preservar néfrons é viável.'
      },
      {
        'q':'O que fazer diante de marcador discordante da histologia presumida?',
        'a':'Rever o conjunto, incluindo tendência, histologia e causas alternativas, antes de concluir uma classificação tumoral.'
      },
      {
        'q':'Por que a via inguinal importa na suspeita de tumor testicular?',
        'a':'Porque permite abordagem oncológica adequada do testículo e do cordão, evitando violação escrotal de rotina e alteração do planejamento regional.'
      }
    ]
  }
};
for(const [key,more] of Object.entries(extra)){
  const base=entries[key];
  base.pretest.push(...more.pretest);
  base.sections.push(...more.sections);
  base.recall.push(...more.recall);
  base.exam=more.exam;
  base.cases=more.cases;
  base.note+=' Conferência online de atualizações das fontes: a confirmar.';
}
LessonDeep.add(entries);
})();
