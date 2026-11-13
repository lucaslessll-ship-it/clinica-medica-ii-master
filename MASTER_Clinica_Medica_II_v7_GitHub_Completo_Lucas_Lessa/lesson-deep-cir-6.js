/* Estudo aprofundado · Radiologia e Urologia. Texto original; referências ao final de cada aula. */
LessonDeep.add({
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
   after:'O índice de gravidade tomográfico soma Balthazar e necrose (sem necrose 0, até 30% 2, de 30 a 50% 4, acima de 50% 6). De 7 a 10 pontos indica pancreatite grave. A TC deve ser feita após 72 a 96 horas, quando a necrose está definida.'},
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
 pretest:['Qual a janela do FAST mais sensível no adulto em decúbito?','Quais achados do eFAST indicam pneumotórax?','O que é o ponto pulmonar?','Como aparece o pneumotórax na radiografia em decúbito?'],
 sections:[
  {h:'FAST e eFAST',p:['O FAST procura líquido livre em quatro janelas: pericárdica, hepatorrenal (espaço de Morison, a mais sensível no adulto em decúbito), esplenorrenal e pélvica. Detecta volumes a partir de algumas centenas de mL. Não avalia retroperitônio nem víscera oca, e um exame negativo deve ser repetido se a clínica mudar.','O eFAST acrescenta o tórax: no pneumotórax, desaparecem o deslizamento pleural e as linhas B; no modo M, o padrão de praia (seashore) vira código de barras (estratosfera). O ponto pulmonar, onde o pulmão volta a tocar a parede, é o achado mais específico.'],
   after:'O curso de POCUS do site detalha as janelas com imagens comentadas.'},
  {h:'Radiografias da sala de trauma',list:['<strong>Tórax AP:</strong> pneumotórax (linha pleural, sinal do sulco profundo no decúbito), hemotórax (velamento difuso no decúbito; em pé, apaga o seio costofrênico a partir de cerca de 200 a 300 mL), mediastino alargado, fraturas, posição de tubos.','<strong>Pelve AP:</strong> fraturas instáveis em livro aberto.','A radiografia não deve atrasar a descompressão de um pneumotórax hipertensivo.']},
  {h:'Tomografia no trauma',list:['Para o paciente estável. Gradua lesões de órgãos sólidos (AAST), mostra blush (sangramento ativo), lesões de víscera oca e retroperitônio.','Tomografia de corpo inteiro em politraumatizados graves estáveis acelera o diagnóstico.','Ar livre sem lesão de órgão sólido, ou líquido livre sem explicação, levanta suspeita de víscera oca.']}
 ],
 flow:{title:'Imagem no trauma',nodes:[
  {k:'start',t:'Politraumatizado na sala de emergência'},
  {k:'do',t:'eFAST, radiografia de tórax e pelve durante o exame primário'},
  {k:'ask',t:'Instável com FAST positivo?',yes:'Centro cirúrgico',no:'Seguir'},
  {k:'ask',t:'Ausência de deslizamento pleural e ponto pulmonar?',yes:'Pneumotórax: drenar',no:'Seguir'},
  {k:'ask',t:'Estável?',yes:'Tomografia com contraste',no:'Procurar outras fontes e repetir FAST'},
  {k:'end',t:'Blush no estável: angioembolização'}]},
 reasoning:['Morison é onde o sangue aparece primeiro no adulto deitado.','Ponto pulmonar confirma pneumotórax.','TC é para quem pode ir ao tomógrafo com segurança.'],
 mnemonics:[{n:'Praia versus código de barras',t:'Modo M normal versus pneumotórax.'},{n:'Morison primeiro',t:'Janela hepatorrenal mais sensível.'},{n:'Sulco profundo',t:'Pneumotórax na radiografia em decúbito.'}],
 pitfalls:['Excluir lesão abdominal com um FAST negativo isolado.','Esperar radiografia para descomprimir pneumotórax hipertensivo.','Levar instável à TC.'],
 recall:[{q:'Janela mais sensível do FAST no adulto?',a:'Hepatorrenal (Morison).'},{q:'Achado mais específico de pneumotórax no ultrassom?',a:'Ponto pulmonar.'},{q:'Modo M no pneumotórax?',a:'Padrão de código de barras.'},{q:'Sinal de pneumotórax na radiografia em decúbito?',a:'Sulco profundo.'},{q:'O que é blush?',a:'Extravasamento de contraste indicando sangramento ativo.'}],
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
  {h:'Raciocínio',list:['Hematoquezia com instabilidade: excluir fonte alta (até cerca de 10 a 15% das hemorragias que parecem baixas vêm do trato alto) com endoscopia digestiva alta.','Estável: colonoscopia após preparo, idealmente nas primeiras 24 horas.','Instável ou sangramento ativo intenso: angioTC e, se positiva, arteriografia com embolização.','Causas mais comuns no idoso: doença diverticular (sangramento indolor e volumoso, muitas vezes do cólon direito) e angiodisplasia (associada à estenose aórtica, síndrome de Heyde).','Criança com sangramento indolor: divertículo de Meckel, diagnosticado por cintilografia com pertecnetato de tecnécio, que capta a mucosa gástrica ectópica.']}
 ],
 flow:{title:'Hemorragia digestiva baixa',nodes:[
  {k:'start',t:'Hematoquezia'},
  {k:'do',t:'Reanimação, hemograma, coagulação, tipagem'},
  {k:'ask',t:'Instável?',yes:'EDA para excluir fonte alta e angioTC',no:'Colonoscopia após preparo'},
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
 reasoning:['Vômito bilioso no recém-nascido é cirúrgico até prova em contrário.','Projeta para fora é benigna; dentro do contorno é suspeita.','Paraesofágica tende à cirurgia pelo risco de volvo.'],
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
 reasoning:['Hemangioma acompanha o sangue: enche devagar de fora para dentro.','Duplo ducto é tumor de cabeça de pâncreas ou ampola.','Fase hepatobiliar separa HNF (capta) de adenoma (não capta).'],
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
   after:'Hematúria glomerular: hemácias dismórficas, cilindros hemáticos, proteinúria e piora da função renal; investigação nefrológica. Hematúria não glomerular em paciente de risco (tabagista, mais de 40 anos): urotomografia (TC com fase excretora) e cistoscopia, para excluir tumor urotelial.'},
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
 reasoning:['Alfabloqueador alivia rápido; 5-ARI muda a história natural.','PSA de quem usa finasterida vale o dobro.','RTU monopolar pode causar hiponatremia grave.'],
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
   '<strong>Epididimite:</strong> abaixo de 35 anos, clamídia e gonococo (ceftriaxona e doxiciclina); acima, germes entéricos (quinolona). Sinal de Prehn positivo (alívio ao elevar o testículo).',
   '<strong>Torção testicular:</strong> adolescente, dor súbita, testículo alto e horizontalizado, reflexo cremastérico ausente, Prehn negativo. Emergência: explorar e distorcer, idealmente em até 6 horas; não atrasar a cirurgia por ultrassonografia quando a clínica é clara. Fixar os dois testículos.',
   '<strong>Gangrena de Fournier:</strong> fasciite necrosante perineal, sobretudo em diabéticos. Desbridamento cirúrgico urgente e antibiótico de amplo espectro.']},
  {h:'Tuberculose urogenital',p:['Disseminação hematogênica, aparecendo anos após a infecção primária. A pista clássica é a piúria estéril: leucocitúria com urocultura comum negativa, urina ácida e hematúria.','Acomete rim (calcificações, estenoses, cavidades, até exclusão renal), ureter (aspecto em rosário), bexiga (contraída, de pequena capacidade) e epidídimo (endurecido, nodular, com fístula escrotal).','Diagnóstico: pesquisa de BAAR, teste molecular e cultura em 3 a 6 amostras da primeira urina da manhã. Tratamento com esquema básico por 6 meses (2 meses com rifampicina, isoniazida, pirazinamida e etambutol, e 4 meses com rifampicina e isoniazida). Cirurgia para sequelas.']}
 ],
 flow:{title:'Dor escrotal aguda',nodes:[
  {k:'start',t:'Dor escrotal aguda'},
  {k:'ask',t:'Início súbito, testículo alto, cremastérico ausente?',yes:'Torção: cirurgia imediata',no:'Seguir'},
  {k:'ask',t:'Dúvida diagnóstica?',yes:'Doppler sem atrasar a exploração',no:'Seguir'},
  {k:'ask',t:'Instalação gradual, febre, disúria, Prehn positivo?',yes:'Epididimite: antibiótico conforme idade',no:'Seguir'},
  {k:'do',t:'Crepitação, necrose perineal: Fournier, desbridamento'},
  {k:'end',t:'Piúria estéril crônica: investigar tuberculose'}]},
 reasoning:['Dor escrotal súbita no adolescente é torção até prova em contrário: o tempo é o testículo.','Piúria estéril: tuberculose, uretrite, nefrite intersticial, cálculo.','Bacteriúria assintomática fora da gestação não se trata.'],
 mnemonics:[{n:'Prehn alivia epididimite',t:'Elevar alivia na epididimite, não na torção.'},{n:'Seis horas',t:'Janela para salvar o testículo torcido.'},{n:'Piúria estéril pensa BK',t:'Tuberculose urogenital.'}],
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
  {h:'Câncer de rim',list:['Carcinoma de células claras é o mais comum (associado à síndrome de von Hippel-Lindau). Fatores: tabagismo, obesidade, hipertensão e doença renal crônica em diálise.','Tríade clássica (hematúria, dor lombar e massa palpável) em menos de 10%; a maioria é achado incidental.','Paraneoplásicas: policitemia (eritropoetina), hipercalcemia (PTHrP), hipertensão, febre e síndrome de Stauffer (disfunção hepática sem metástase). Varicocele esquerda que não esvazia deitado sugere trombo na veia renal.','TC com contraste: massa sólida com realce. Cistos pela classificação de Bosniak: I e II benignos; IIF seguimento; III e IV cirúrgicos.','<strong>T1a (até 4 cm):</strong> nefrectomia parcial; ablação ou vigilância em idosos com massas pequenas.','<strong>Maiores:</strong> parcial se viável, ou radical (com trombectomia se houver trombo na veia cava).','<strong>Metastático:</strong> imunoterapia combinada; nefrectomia citorredutora em casos selecionados.','<strong>Tumor de Wilms:</strong> criança de 2 a 5 anos com massa abdominal assintomática que não cruza a linha média, hipertensão; nefrectomia e quimioterapia, prognóstico muito bom. O neuroblastoma, ao contrário, cruza a linha média e calcifica.']},
  {h:'Câncer de testículo',list:['Homens de 15 a 35 anos. Principal fator: criptorquidia; também história familiar e tumor prévio no outro testículo.','Massa testicular endurecida e indolor. Ultrassonografia escrotal.','<strong>Marcadores:</strong> alfafetoproteína (tumor de saco vitelino, componente não seminomatoso), beta-hCG (coriocarcinoma, discreta em alguns seminomas) e DHL (volume tumoral). Seminoma puro nunca eleva a alfafetoproteína: se estiver alta, há componente não seminomatoso.','<strong>Orquiectomia radical por via inguinal</strong>, com ligadura alta do cordão. Nunca biópsia ou cirurgia transescrotal, que altera a drenagem linfática (do retroperitônio para as inguinais).','Estadiamento com TC e marcadores após a cirurgia. Seminoma estágio I: vigilância (preferida), carboplatina ou radioterapia. Não seminoma estágio I: vigilância, um ciclo de BEP ou linfadenectomia retroperitoneal. Doença avançada: BEP. Alta taxa de cura. Oferecer banco de sêmen.']},
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
});
