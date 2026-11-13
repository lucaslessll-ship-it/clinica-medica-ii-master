/* Estudo aprofundado · Cirurgia · Pâncreas e hérnias. Texto original; referências ao final de cada aula. */
LessonDeep.add({
'cirpanc_0':{
 updated:'2026-11',
 pretest:['Quais são os três critérios diagnósticos de pancreatite aguda e quantos são necessários?','Como Atlanta revisado classifica a gravidade?','Antibiótico profilático está indicado na pancreatite necrosante?','Quando fazer a colecistectomia na pancreatite biliar leve?'],
 sections:[
  {h:'Diagnóstico: dois de três',p:[
   'A pancreatite aguda é diagnosticada com pelo menos dois de três critérios: dor típica (epigástrica, intensa, em faixa, irradiando para o dorso), amilase ou lipase de pelo menos 3 vezes o limite superior e achados de imagem compatíveis. A lipase é mais específica e permanece elevada por mais tempo. O nível da enzima não mede gravidade.',
   'A tomografia não é necessária para diagnosticar quando dor e enzima são típicas. Ela serve para dúvida diagnóstica ou para avaliar complicações, idealmente depois de 72 a 96 horas, quando a necrose já está definida.'],
   table:{head:['Causa','Como pensar'],rows:[
    ['Litíase biliar','A mais comum. Ultrassonografia em todos. ALT acima de 150 sugere origem biliar'],
    ['Álcool','Segunda causa; episódios repetidos levam à forma crônica'],
    ['Hipertrigliceridemia','Triglicerídeos acima de 1.000 mg/dL; diabetes descompensado, gestação'],
    ['Pós-CPRE','Complicação mais comum do procedimento'],
    ['Outras','Hipercalcemia, fármacos (azatioprina, valproato, diuréticos), trauma, tumor, autoimune, genética']]}},
  {h:'Gravidade: Atlanta revisado (2012)',table:{head:['Gravidade','Definição'],rows:[
   ['Leve','Sem falência orgânica e sem complicações locais ou sistêmicas'],
   ['Moderadamente grave','Falência orgânica transitória (até 48 horas) e/ou complicações locais ou exacerbação de doença prévia'],
   ['Grave','Falência orgânica persistente (mais de 48 horas)']]},
   after:'Falência orgânica é medida pelo escore de Marshall modificado (respiratória, renal, cardiovascular), com 2 pontos ou mais num sistema. Preditores precoces de gravidade: SIRS persistente, BISAP, Ranson (exige 48 horas), APACHE II de 8 ou mais, PCR acima de 150 mg/L após 48 horas, hematócrito alto e ureia em elevação.'},
  {h:'Tratamento',list:[
   '<strong>Hidratação:</strong> Ringer lactato em ritmo moderado e guiado por metas (diurese, frequência cardíaca, ureia, hematócrito). O estudo WATERFALL (2022) mostrou que a hidratação agressiva aumentou sobrecarga hídrica sem melhorar desfechos.',
   '<strong>Analgesia:</strong> adequada, opioides permitidos.',
   '<strong>Dieta:</strong> na leve, via oral precoce assim que houver tolerância, sem esperar normalizar a enzima. Na grave, nutrição enteral (sonda gástrica ou nasojejunal) é preferível à parenteral.',
   '<strong>Antibiótico:</strong> não há indicação profilática, nem na necrosante. Usar só se houver infecção documentada ou fortemente suspeita (necrose infectada, colangite, outro foco).',
   '<strong>CPRE:</strong> urgente se houver colangite associada. Sem colangite, só se obstrução biliar persistente. CPRE precoce de rotina na pancreatite biliar sem colangite não traz benefício.',
   '<strong>Colecistectomia:</strong> na pancreatite biliar leve, na mesma internação (estudo PONCHO). Na grave com coleções, adiar até resolução da inflamação ou cerca de 6 semanas.',
   '<strong>Hipertrigliceridemia:</strong> insulina intravenosa e, em casos selecionados, plasmaférese.']}
 ],
 flow:{title:'Pancreatite aguda nas primeiras 72 horas',nodes:[
  {k:'start',t:'Dor epigástrica em faixa e lipase 3 vezes acima do normal'},
  {k:'do',t:'Ultrassonografia, triglicerídeos, cálcio, função renal, gasometria, PCR'},
  {k:'do',t:'Ringer lactato moderado guiado por metas, analgesia, dieta precoce se tolerar'},
  {k:'ask',t:'Colangite associada?',yes:'Antibiótico e CPRE urgente',no:'Sem CPRE de rotina'},
  {k:'ask',t:'Falência orgânica por mais de 48 horas?',yes:'Grave: UTI, enteral, TC após 72 a 96 horas',no:'Leve ou moderada: enfermaria'},
  {k:'end',t:'Biliar leve: colecistectomia na mesma internação'}]},
 reasoning:[
  'Enzima alta confirma, não gradua. Quem gradua é a falência orgânica.',
  'Pancreatite biliar com icterícia e febre é colangite: aí sim CPRE urgente.',
  'Antibiótico sem infecção é erro clássico de prova.',
  'Alta da pancreatite biliar sem retirar a vesícula expõe a recidiva em semanas.'],
 mnemonics:[
  {n:'Dois de três',t:'Dor típica, enzima três vezes, imagem.'},
  {n:'Atlanta: leve, transitória, persistente',t:'Sem falência, falência até 48 horas, falência além de 48 horas.'},
  {n:'GET SMASHED',t:'Gallstones, Ethanol, Trauma, Steroids, Mumps, Autoimmune, Scorpion, Hyperlipidemia e hipercalcemia, ERCP, Drugs: causas de pancreatite aguda.'}],
 pitfalls:[
  'Pedir tomografia no primeiro dia para confirmar pancreatite típica.',
  'Prescrever antibiótico profilático na necrose estéril.',
  'Deixar em jejum prolongado até a lipase normalizar.',
  'Indicar CPRE em toda pancreatite biliar.',
  'Hidratar de forma agressiva sem metas.'],
 recall:[
  {q:'Quais os critérios diagnósticos de pancreatite aguda?',a:'Dois de três: dor típica, amilase ou lipase pelo menos 3 vezes o limite superior, imagem compatível.'},
  {q:'O que define pancreatite grave por Atlanta revisado?',a:'Falência orgânica persistente por mais de 48 horas.'},
  {q:'Qual a causa mais comum?',a:'Litíase biliar.'},
  {q:'Quando fazer CPRE na pancreatite biliar?',a:'Urgente se colangite; se obstrução biliar persistente. Não de rotina.'},
  {q:'Qual via de nutrição é preferida na pancreatite grave?',a:'Enteral.'},
  {q:'Momento da colecistectomia na pancreatite biliar leve?',a:'Na mesma internação.'}],
 practice:['Classifique: falência renal que resolveu em 30 horas, sem coleções. E: insuficiência respiratória por 4 dias.','Prescreva o primeiro dia de uma pancreatite biliar leve.'],
 refs:[
  {t:'Banks PA, et al. Classification of acute pancreatitis 2012: revision of the Atlanta classification. Gut. 2013.',q:'Classification of acute pancreatitis 2012 revision of the Atlanta classification Banks Gut'},
  {t:'de-Madaria E, et al. Aggressive or moderate fluid resuscitation in acute pancreatitis (WATERFALL). N Engl J Med. 2022.',q:'WATERFALL aggressive or moderate fluid resuscitation acute pancreatitis NEJM 2022'},
  {t:'Tenner S, et al. American College of Gastroenterology guidelines: management of acute pancreatitis. Am J Gastroenterol. 2024.',q:'ACG guidelines management of acute pancreatitis 2024 Tenner'},
  {t:'da Costa DW, et al. Same-admission versus interval cholecystectomy for mild gallstone pancreatitis (PONCHO). Lancet. 2015.',q:'PONCHO same-admission versus interval cholecystectomy mild gallstone pancreatitis Lancet 2015'}],
 note:'Atlanta revisado e diretriz americana de 2024.'
},
'cirpanc_1':{
 updated:'2026-11',
 pretest:['Qual a diferença entre pseudocisto e necrose encapsulada?','O que sugere necrose infectada na tomografia?','Por que se espera cerca de 4 semanas para intervir na necrose?','Pseudocisto assintomático de 8 cm precisa ser drenado?'],
 sections:[
  {h:'Coleções segundo Atlanta revisado',table:{head:['Tempo','Pancreatite intersticial','Pancreatite necrosante'],rows:[
   ['Menos de 4 semanas','Coleção líquida peripancreática aguda (sem parede, só líquido)','Coleção necrótica aguda (líquido e necrose, sem parede)'],
   ['Mais de 4 semanas','Pseudocisto (parede bem definida, conteúdo líquido, sem necrose)','Necrose encapsulada (WON: parede definida, conteúdo sólido e líquido)']]},
   after:'A maioria das coleções agudas regride sozinha. Pseudocisto verdadeiro só existe depois de 4 semanas e em pancreatite intersticial; coleção com debris é necrose encapsulada, que se trata de outra forma.'},
  {h:'Necrose infectada',p:[
   'Ocorre em cerca de um terço das necroses, em geral após a primeira semana. Desconfiar quando o paciente piora ou volta a ter febre e leucocitose após 7 a 10 dias. Gás dentro da coleção na tomografia é muito sugestivo. A punção aspirativa não é rotina.',
   'Tratamento: antibiótico que penetra no pâncreas (carbapenêmico, ou quinolona com metronidazol) e, sempre que possível, adiar a intervenção até a necrose encapsular, cerca de 4 semanas. Intervir cedo em necrose não delimitada aumenta mortalidade.',
   'Abordagem em degraus (step-up): primeiro drenagem percutânea ou endoscópica transgástrica. Se não houver melhora, necrosectomia endoscópica ou desbridamento retroperitoneal minimamente invasivo. A necrosectomia aberta virou exceção. Os estudos PANTER e TENSION fundamentam essa estratégia.']},
  {h:'Pseudocisto',list:[
   'Assintomático: observar, independentemente do tamanho. A antiga regra de drenar acima de 6 cm ou após 6 semanas foi abandonada.',
   'Sintomático ou complicado (dor, saciedade precoce, obstrução gástrica ou biliar, infecção, sangramento): drenagem, preferencialmente endoscópica (cistogastrostomia guiada por ecoendoscopia).',
   'Antes de tratar como pseudocisto, excluir neoplasia cística, sobretudo sem história clara de pancreatite.']},
  {h:'Outras complicações locais e vasculares',list:[
   '<strong>Pseudoaneurisma</strong> (artéria esplênica a mais comum): sangramento súbito para coleção ou trato digestivo. Tratamento por embolização angiográfica.',
   '<strong>Trombose da veia esplênica:</strong> hipertensão portal segmentar (sinistra) com varizes gástricas isoladas e fígado normal. Se sangrar, esplenectomia resolve.',
   '<strong>Síndrome compartimental abdominal:</strong> pressão intra-abdominal acima de 20 mmHg com nova disfunção orgânica. Descompressão se não responder a medidas clínicas.',
   '<strong>Desconexão do ducto pancreático:</strong> coleções recorrentes após drenagem.']}
 ],
 flow:{title:'Coleção após pancreatite',nodes:[
  {k:'start',t:'Coleção na tomografia de controle'},
  {k:'ask',t:'Menos de 4 semanas?',yes:'Coleção aguda: tratamento clínico, a maioria regride',no:'Pseudocisto ou necrose encapsulada'},
  {k:'ask',t:'Suspeita de infecção (gás, piora após 7 a 10 dias)?',yes:'Antibiótico e postergar intervenção até encapsular',no:'Observar se assintomático'},
  {k:'do',t:'Step-up: drenagem percutânea ou endoscópica'},
  {k:'ask',t:'Melhora clínica?',yes:'Manter drenagem e acompanhar',no:'Necrosectomia endoscópica ou minimamente invasiva'},
  {k:'end',t:'Coleção sintomática sem infecção: drenagem endoscópica'}]},
 reasoning:[
  'Tempo e conteúdo definem o nome: 4 semanas separam aguda de encapsulada; necrose separa pseudocisto de WON.',
  'Necrose estéril não se drena; necrose infectada se trata com antibiótico e paciência antes do desbridamento.',
  'Varizes gástricas isoladas sem cirrose: veia esplênica trombosada.'],
 mnemonics:[
  {n:'4 semanas',t:'Antes: coleção aguda. Depois: pseudocisto ou necrose encapsulada.'},
  {n:'Step-up',t:'Drenar primeiro, desbridar depois, abrir só se não houver alternativa.'},
  {n:'Gás na coleção',t:'Necrose infectada.'}],
 pitfalls:[
  'Chamar de pseudocisto uma coleção de 2 semanas.',
  'Drenar pseudocisto assintomático só pelo tamanho.',
  'Fazer necrosectomia aberta precoce.',
  'Esquecer pseudoaneurisma em sangramento súbito após pancreatite.'],
 recall:[
  {q:'O que é necrose encapsulada?',a:'Coleção com necrose, parede definida, após 4 semanas de pancreatite necrosante.'},
  {q:'Achado tomográfico sugestivo de necrose infectada?',a:'Gás na coleção necrótica.'},
  {q:'Conduta inicial na necrose infectada estável?',a:'Antibiótico e adiar a intervenção até a encapsulação, depois step-up.'},
  {q:'Pseudocisto assintomático de 8 cm: conduta?',a:'Observação.'},
  {q:'Causa das varizes gástricas isoladas após pancreatite?',a:'Trombose da veia esplênica.'}],
 practice:['Monte o algoritmo step-up com as três etapas e um exemplo de cada.','Diferencie as quatro coleções de Atlanta em uma tabela 2 por 2.'],
 refs:[
  {t:'van Santvoort HC, et al. A step-up approach or open necrosectomy for necrotizing pancreatitis (PANTER). N Engl J Med. 2010.',q:'PANTER step-up approach open necrosectomy necrotizing pancreatitis NEJM 2010'},
  {t:'van Brunschot S, et al. Endoscopic or surgical step-up approach for infected necrotising pancreatitis (TENSION). Lancet. 2018.',q:'TENSION endoscopic or surgical step-up infected necrotising pancreatitis Lancet 2018'},
  {t:'Banks PA, et al. Classification of acute pancreatitis 2012. Gut. 2013.',q:'Classification of acute pancreatitis 2012 revision Atlanta'}],
 note:'Conceitos de Atlanta revisado e estratégia em degraus.'
},
'cirpanc_2':{
 updated:'2026-11',
 pretest:['Qual a causa mais comum de pancreatite crônica?','Qual é a tríade clássica?','Que cirurgia drena um ducto pancreático dilatado?','Como se trata a insuficiência exócrina?'],
 sections:[
  {h:'Conceito e clínica',p:[
   'É inflamação progressiva e irreversível, com fibrose que destrói o parênquima exócrino e depois o endócrino. A causa mais comum é o álcool, e o tabagismo acelera a doença. Outras causas: genética, autoimune, obstrução ductal, hipertrigliceridemia e idiopática.',
   'A dor é o sintoma dominante, epigástrica, irradiando para o dorso, muitas vezes pós-prandial. A tríade clássica (calcificações pancreáticas, esteatorreia e diabetes) aparece em poucos pacientes e tardiamente. Esteatorreia só surge quando mais de 90% da função exócrina se perdeu. O diabetes é do tipo 3c, com risco de hipoglicemia porque o glucagon também falta.']},
  {h:'Diagnóstico',list:[
   '<strong>Tomografia:</strong> calcificações, atrofia, ducto dilatado e irregular. Calcificação é praticamente diagnóstica.',
   '<strong>Colangiorressonância (com secretina):</strong> alterações ductais, estenoses e cálculos.',
   '<strong>Ecoendoscopia:</strong> mais sensível nas fases iniciais.',
   '<strong>Elastase fecal baixa:</strong> confirma insuficiência exócrina.',
   'Na doença autoimune, IgG4 elevada e pâncreas em salsicha; responde a corticoide.']},
  {h:'Tratamento',list:[
   '<strong>Parar álcool e tabaco:</strong> reduz dor e progressão.',
   '<strong>Dor:</strong> analgesia em degraus; antioxidantes e adjuvantes neuromoduladores em casos selecionados.',
   '<strong>Insuficiência exócrina:</strong> enzimas pancreáticas junto com as refeições (cerca de 40 a 50 mil unidades de lipase nas refeições principais), reposição de vitaminas lipossolúveis.',
   '<strong>Diabetes tipo 3c:</strong> metformina no início, depois insulina, com atenção à hipoglicemia.',
   '<strong>Cálculos no ducto principal:</strong> litotripsia extracorpórea e endoscopia em centros com experiência.',
   '<strong>Cirurgia para dor refratária:</strong> ducto principal dilatado (cerca de 7 mm ou mais): pancreatojejunostomia longitudinal látero-lateral (Partington-Rochelle). Doença dominante na cabeça: Frey (ressecção parcial da cabeça mais drenagem ductal) ou Beger. Suspeita de câncer na cabeça: duodenopancreatectomia. O estudo ESCAPE mostrou melhor controle da dor com cirurgia precoce do que com endoscopia escalonada.']},
  {h:'Complicações',list:['Pseudocisto','Obstrução biliar ou duodenal por fibrose da cabeça','Trombose da veia esplênica','Ascite e derrame pancreático por ruptura ductal','Adenocarcinoma de pâncreas (risco aumentado)']}
 ],
 flow:{title:'Pancreatite crônica com dor',nodes:[
  {k:'start',t:'Dor abdominal crônica em etilista, com ou sem esteatorreia'},
  {k:'do',t:'Tomografia ou ressonância, elastase fecal, glicemia e HbA1c'},
  {k:'do',t:'Cessar álcool e tabaco, analgesia, enzimas se insuficiência exócrina'},
  {k:'ask',t:'Dor refratária?',yes:'Avaliar anatomia ductal',no:'Seguimento, diabetes e nutrição'},
  {k:'ask',t:'Ducto principal dilatado sem massa na cabeça?',yes:'Partington-Rochelle ou endoscopia com litotripsia',no:'Cabeça aumentada: Frey ou Beger; massa suspeita: Whipple'},
  {k:'end',t:'Rastrear complicações e câncer'}]},
 reasoning:['Tríade completa é rara: dor em etilista com calcificação já basta.','Ducto dilatado se drena; cabeça doente se resseca.','Diabetes da pancreatite crônica hipoglicemia fácil: insulina com cuidado.'],
 mnemonics:[{n:'CED',t:'Calcificação, Esteatorreia, Diabetes: a tríade clássica.'},{n:'Partington drena, Frey resseca e drena',t:'Escolha pela anatomia.'},{n:'90%',t:'Esteatorreia só aparece com perda de mais de 90% da função exócrina.'}],
 pitfalls:['Exigir a tríade completa para diagnosticar.','Dar enzimas longe das refeições.','Esquecer de rastrear câncer em massa da cabeça.','Não pedir ao paciente que pare de fumar.'],
 recall:[
  {q:'Causa mais comum de pancreatite crônica?',a:'Álcool.'},
  {q:'Tríade clássica?',a:'Calcificações, esteatorreia e diabetes.'},
  {q:'Cirurgia de drenagem para ducto dilatado?',a:'Pancreatojejunostomia longitudinal (Partington-Rochelle).'},
  {q:'Exame laboratorial para insuficiência exócrina?',a:'Elastase fecal.'},
  {q:'Como tomar as enzimas pancreáticas?',a:'Junto com as refeições.'}],
 practice:['Explique por que o diabetes da pancreatite crônica tem mais hipoglicemia.','Escolha a cirurgia para três cenários: ducto de 10 mm, cabeça inflamatória de 4 cm, massa suspeita na cabeça.'],
 refs:[
  {t:'Löhr JM, et al. United European Gastroenterology evidence-based guidelines for the diagnosis and therapy of chronic pancreatitis (HaPanEU). United European Gastroenterol J. 2017.',q:'HaPanEU guidelines chronic pancreatitis 2017'},
  {t:'Issa Y, et al. Effect of early surgery vs endoscopy-first approach on pain in patients with chronic pancreatitis (ESCAPE). JAMA. 2020.',q:'ESCAPE early surgery vs endoscopy-first chronic pancreatitis JAMA 2020'},
  {t:'Gardner TB, et al. ACG clinical guideline: chronic pancreatitis. Am J Gastroenterol. 2020.',q:'ACG clinical guideline chronic pancreatitis 2020'}],
 note:'Diretrizes europeia e americana de pancreatite crônica.'
},
'cirpanc_3':{
 updated:'2026-11',
 pretest:['Qual é o sinal de Courvoisier?','O que define um adenocarcinoma de pâncreas ressecável?','Para que serve o CA 19-9?','Qual neoplasia cística do pâncreas pode ser apenas observada?'],
 sections:[
  {h:'Adenocarcinoma ductal',p:[
   'Responde por cerca de 90% dos tumores pancreáticos e tem prognóstico ruim por diagnóstico tardio. Fatores de risco: tabagismo (o principal modificável), obesidade, pancreatite crônica, diabetes de início recente após os 50 anos, história familiar e mutações como BRCA2.',
   'Na cabeça (cerca de dois terços), aparece como icterícia obstrutiva progressiva e indolor, com colúria, acolia, prurido e perda de peso. O sinal de Courvoisier-Terrier é a vesícula palpável e indolor em paciente ictérico, sugerindo obstrução maligna distal ao cístico. No corpo e na cauda, a doença é silenciosa até causar dor epigástrica irradiada para o dorso e emagrecimento. Tromboflebite migratória (síndrome de Trousseau) pode ser a primeira manifestação.']},
  {h:'Diagnóstico e estadiamento',list:[
   '<strong>Tomografia com protocolo pancreático (multifásica):</strong> exame central para diagnóstico e ressecabilidade.',
   '<strong>Ecoendoscopia com punção:</strong> lesões pequenas e confirmação histológica, obrigatória antes de neoadjuvância.',
   '<strong>CA 19-9:</strong> prognóstico e seguimento, não rastreamento. Eleva também na colestase benigna e é negativo em quem não expressa o antígeno de Lewis.',
   '<strong>Drenagem biliar pré-operatória:</strong> não é rotina. Indicada em colangite, prurido intenso, bilirrubina muito alta ou quando a cirurgia vai demorar, como na neoadjuvância.']},
  {h:'Ressecabilidade (critérios do NCCN)',table:{head:['Categoria','Artérias (tronco celíaco, mesentérica superior, hepática comum)','Veias (mesentérica superior e porta)'],rows:[
   ['Ressecável','Sem contato tumoral','Sem contato ou contato de até 180° sem irregularidade'],
   ['Borderline','Contato de até 180° com mesentérica superior ou tronco celíaco; contato com hepática comum reconstruível','Contato acima de 180° ou trombose reconstruível'],
   ['Localmente avançado','Contato acima de 180° com mesentérica superior ou tronco celíaco','Oclusão não reconstruível'],
   ['Metastático','Metástase hepática, peritoneal ou à distância','Qualquer']]},
   after:'Cirurgia: cabeça, duodenopancreatectomia (Whipple); corpo e cauda, pancreatectomia corpo-caudal com esplenectomia. Depois, quimioterapia adjuvante por 6 meses, com FOLFIRINOX modificado nos pacientes aptos (estudo PRODIGE 24). Borderline: quimioterapia neoadjuvante e reavaliação. A principal complicação do Whipple é a fístula pancreática.'},
  {h:'Neoplasias císticas',table:{head:['Lesão','Perfil','Conduta'],rows:[
   ['Cistoadenoma seroso','Mulher idosa, microcístico em favo de mel, cicatriz central calcificada','Benigno: observar; operar se sintomático'],
   ['Neoplasia cística mucinosa','Mulher de meia-idade, corpo ou cauda, estroma ovariano, sem comunicação com o ducto','Ressecar (potencial maligno)'],
   ['IPMN de ducto principal','Ducto principal dilatado, mucina na papila (papila em boca de peixe)','Ressecar se ducto de 10 mm ou mais ou sinais de alto risco'],
   ['IPMN de ramo secundário','Cisto comunicando com o ducto','Vigilância; ressecar se icterícia, nódulo sólido com realce, ducto dilatado ou crescimento rápido'],
   ['Neoplasia sólida pseudopapilar','Mulher jovem, lesão sólido-cística','Ressecar']]}},
  {h:'Tumores neuroendócrinos funcionantes',table:{head:['Tumor','Quadro','Ponto de prova'],rows:[
   ['Insulinoma','Tríade de Whipple: hipoglicemia, sintomas, melhora com glicose','O mais comum; 90% benigno; enucleação'],
   ['Gastrinoma','Zollinger-Ellison: úlceras múltiplas e atípicas, diarreia','Triângulo do gastrinoma; associação com NEM 1'],
   ['Glucagonoma','Eritema necrolítico migratório, diabetes, emagrecimento, trombose','Pele é a pista'],
   ['VIPoma','Diarreia aquosa volumosa, hipocalemia, acloridria','Síndrome WDHA'],
   ['Somatostatinoma','Diabetes, colelitíase, esteatorreia','Tríade inibitória']]}}
 ],
 flow:{title:'Icterícia indolor no idoso',nodes:[
  {k:'start',t:'Icterícia progressiva, perda de peso, com ou sem vesícula palpável'},
  {k:'do',t:'Ultrassonografia: dilatação de vias biliares'},
  {k:'do',t:'TC com protocolo pancreático e CA 19-9'},
  {k:'ask',t:'Metástase?',yes:'Biópsia, quimioterapia paliativa, prótese biliar endoscópica',no:'Classificar ressecabilidade'},
  {k:'ask',t:'Ressecável?',yes:'Whipple e quimioterapia adjuvante',no:'Borderline ou localmente avançado: neoadjuvância e reavaliação'},
  {k:'end',t:'Drenagem biliar pré-operatória só se colangite ou atraso da cirurgia'}]},
 reasoning:['Icterícia indolor com vesícula palpável: pense em tumor periampular.','Ressecabilidade é decidida pelos vasos, não pelo tamanho do tumor.','CA 19-9 acompanha, não diagnostica.','Cisto em mulher jovem no corpo e cauda: mucinoso ou pseudopapilar, ressecar.'],
 mnemonics:[{n:'Courvoisier',t:'Vesícula grande sem dor com icterícia: tumor, não cálculo.'},{n:'180 graus',t:'Contato arterial acima de 180° com mesentérica superior: localmente avançado.'},{n:'Seroso sossegado',t:'Cistoadenoma seroso é o único cisto que pode só ser observado.'}],
 pitfalls:['Usar CA 19-9 para rastreamento.','Drenar a via biliar de rotina antes do Whipple.','Operar sem avaliar contato arterial.','Confundir IPMN de ducto principal com ramo secundário na conduta.'],
 recall:[
  {q:'O que é o sinal de Courvoisier-Terrier?',a:'Vesícula palpável e indolor em paciente ictérico, sugerindo obstrução maligna distal.'},
  {q:'Principal fator de risco modificável do câncer de pâncreas?',a:'Tabagismo.'},
  {q:'Cirurgia para tumor de cabeça de pâncreas ressecável?',a:'Duodenopancreatectomia (Whipple).'},
  {q:'Qual neoplasia endócrina pancreática funcionante é a mais comum?',a:'Insulinoma.'},
  {q:'Qual é a síndrome do VIPoma?',a:'Diarreia aquosa, hipocalemia e acloridria (WDHA).'},
  {q:'Neoplasia cística que pode ser observada?',a:'Cistoadenoma seroso assintomático.'}],
 practice:['Classifique a ressecabilidade: contato de 90° com a veia mesentérica superior sem contato arterial.','Associe cada tumor neuroendócrino ao seu sinal mais marcante.'],
 refs:[
  {t:'National Comprehensive Cancer Network. NCCN Guidelines: Pancreatic Adenocarcinoma. Versão vigente.',q:'NCCN Guidelines Pancreatic Adenocarcinoma'},
  {t:'Conroy T, et al. FOLFIRINOX or gemcitabine as adjuvant therapy for pancreatic cancer (PRODIGE 24). N Engl J Med. 2018.',q:'PRODIGE 24 FOLFIRINOX gemcitabine adjuvant pancreatic cancer NEJM 2018'},
  {t:'European Study Group on Cystic Tumours of the Pancreas. European evidence-based guidelines on pancreatic cystic neoplasms. Gut. 2018.',q:'European evidence-based guidelines on pancreatic cystic neoplasms Gut 2018'}],
 note:'Critérios de ressecabilidade e diretriz europeia de cistos pancreáticos.'
},
'cirher_0':{
 updated:'2026-11',
 pretest:['Quais são os limites do triângulo de Hesselbach?','Hérnia direta passa medial ou lateral aos vasos epigástricos inferiores?','Qual é a hérnia mais comum na mulher?','O que é Nyhus IIIb?'],
 sections:[
  {h:'Canal inguinal',table:{head:['Parede','Estrutura'],rows:[
   ['Anterior','Aponeurose do oblíquo externo'],
   ['Posterior (assoalho)','Fáscia transversal, reforçada medialmente pelo tendão conjunto'],
   ['Superior (teto)','Fibras arqueadas do oblíquo interno e do transverso'],
   ['Inferior','Ligamento inguinal e ligamento lacunar']]},
   after:'O anel inguinal interno é uma abertura na fáscia transversal, lateral aos vasos epigástricos inferiores. O anel externo é a abertura na aponeurose do oblíquo externo, acima do tubérculo púbico. Pelo canal passam o funículo espermático no homem e o ligamento redondo na mulher, com os nervos ilioinguinal, ílio-hipogástrico (próximo) e o ramo genital do genitofemoral.'},
  {h:'Direta, indireta e femoral',table:{head:['','Indireta','Direta','Femoral'],rows:[
   ['Trajeto','Pelo anel interno, lateral aos vasos epigástricos inferiores','Pelo assoalho, medial aos vasos epigástricos (triângulo de Hesselbach)','Abaixo do ligamento inguinal, pelo canal femoral, medial à veia femoral'],
   ['Origem','Congênita: persistência do processo vaginal','Adquirida: fraqueza da fáscia transversal','Adquirida'],
   ['Quem','A mais comum em qualquer idade e sexo; crianças','Homens idosos, esforço','Mulheres mais velhas'],
   ['Risco de estrangulamento','Moderado','Baixo (colo largo)','Alto (colo estreito e rígido)']]},
   after:'Triângulo de Hesselbach: vasos epigástricos inferiores (lateral), borda lateral do reto abdominal (medial) e ligamento inguinal (inferior). A hérnia mais comum na mulher é a inguinal indireta, embora a femoral seja proporcionalmente mais frequente nas mulheres. Hérnia em pantalona: direta e indireta juntas, abraçando os vasos epigástricos.'},
  {h:'Classificação de Nyhus',table:{head:['Tipo','Descrição'],rows:[
   ['I','Indireta com anel interno normal (típica da criança)'],
   ['II','Indireta com anel interno alargado, assoalho íntegro'],
   ['IIIa','Direta'],
   ['IIIb','Indireta grande com destruição do assoalho (inclui inguinoescrotal e em pantalona)'],
   ['IIIc','Femoral'],
   ['IV','Recidivada: a direta, b indireta, c femoral, d combinada']]}},
  {h:'Diagnóstico',p:[
   'É clínico: abaulamento na região inguinal que aumenta com Valsalva ou em pé e reduz deitado. A diferenciação clínica entre direta e indireta é pouco confiável e não muda a técnica de reparo atual. Ultrassonografia é útil quando o exame é duvidoso, e a ressonância ou tomografia para dor inguinal sem abaulamento ou casos complexos. Diferenciais: linfonodo, hidrocele, varicocele, lipoma de cordão, aneurisma femoral, testículo ectópico.']}
 ],
 flow:{title:'Abaulamento inguinal',nodes:[
  {k:'start',t:'Abaulamento na virilha que aumenta com esforço'},
  {k:'ask',t:'Acima do ligamento inguinal?',yes:'Hérnia inguinal (direta ou indireta)',no:'Abaixo: pensar em femoral'},
  {k:'ask',t:'Redutível e sem dor intensa?',yes:'Avaliação eletiva',no:'Encarcerada: avaliar estrangulamento'},
  {k:'ask',t:'Exame duvidoso?',yes:'Ultrassonografia dinâmica',no:'Planejar cirurgia'},
  {k:'do',t:'Classificar no intraoperatório (Nyhus)'},
  {k:'end',t:'Femoral sempre operar'}]},
 reasoning:['Os vasos epigástricos inferiores são o divisor: lateral é indireta, medial é direta.','Abaixo do ligamento inguinal é femoral.','Indireta é congênita, direta é desgaste.'],
 mnemonics:[{n:'MDLI',t:'Medial Direta, Lateral Indireta (em relação aos vasos epigástricos).'},{n:'NAVEL',t:'De lateral para medial na coxa: Nervo, Artéria, Veia, Espaço vazio (canal femoral), Linfáticos.'},{n:'Hesselbach: RIP',t:'Reto (medial), Inguinal (inferior), ePigástricos (lateral).'}],
 pitfalls:['Afirmar que a hérnia mais comum na mulher é a femoral.','Confundir anel interno (fáscia transversal) com anel externo (oblíquo externo).','Esquecer hérnia femoral no diferencial de massa abaixo do ligamento.'],
 recall:[
  {q:'Limites do triângulo de Hesselbach?',a:'Vasos epigástricos inferiores, borda lateral do reto abdominal e ligamento inguinal.'},
  {q:'Hérnia mais comum em ambos os sexos?',a:'Inguinal indireta.'},
  {q:'Qual parede forma o assoalho do canal inguinal?',a:'Fáscia transversal.'},
  {q:'O que é Nyhus IIIc?',a:'Hérnia femoral.'},
  {q:'Qual hérnia tem maior risco de estrangulamento?',a:'Femoral.'}],
 practice:['Desenhe o canal inguinal com as quatro paredes e os dois anéis.','Classifique por Nyhus: hérnia indireta recidivada.'],
 refs:[
  {t:'HerniaSurge Group. International guidelines for groin hernia management. Hernia. 2018.',q:'HerniaSurge international guidelines for groin hernia management 2018'},
  {t:'Townsend CM, et al. Sabiston Textbook of Surgery. 21ª ed. Capítulo Hernias.',q:'Sabiston hernias chapter'}],
 note:'Diretriz internacional de hérnias da virilha.'
},
'cirher_1':{
 updated:'2026-11',
 pretest:['Toda hérnia inguinal assintomática precisa ser operada?','Qual é a técnica aberta padrão?','Quando preferir a laparoscopia?','Por que a hérnia femoral deve sempre ser operada?'],
 sections:[
  {h:'Quem operar',list:[
   '<strong>Sintomática:</strong> operar.',
   '<strong>Homem assintomático ou com poucos sintomas:</strong> conduta expectante vigilante é aceitável, porque o risco de encarceramento é baixo. A maioria acaba ficando sintomática e é operada em alguns anos.',
   '<strong>Mulher:</strong> operar, preferencialmente por laparoscopia, porque uma parte das supostas inguinais é femoral e o risco de complicação é maior.',
   '<strong>Femoral:</strong> sempre operar, mesmo assintomática.',
   '<strong>Criança:</strong> operar eletivamente logo após o diagnóstico (o processo vaginal não fecha e o risco de encarceramento é alto, sobretudo no lactente).']},
  {h:'Técnicas',table:{head:['Técnica','Princípio','Quando'],rows:[
   ['Lichtenstein','Tela sobre o assoalho, sem tensão, via anterior','Padrão aberto para hérnia primária unilateral'],
   ['TEP e TAPP (laparoscópicas)','Tela pré-peritoneal cobrindo todo o orifício miopectíneo','Bilateral, recidiva após cirurgia aberta, mulheres, retorno rápido às atividades'],
   ['Shouldice','Reparo tecidual em camadas, sem tela','Sem tela por escolha ou contraindicação'],
   ['McVay','Sutura ao ligamento de Cooper (pectíneo)','Corrige também a femoral; exige incisão relaxadora'],
   ['Herniotomia','Ligadura alta do saco, sem reforço','Criança']]},
   after:'Regra útil para recidiva: operar pela via que ainda não foi usada. Recidiva após via anterior, opera por via posterior (laparoscópica); recidiva após laparoscopia, via anterior.'},
  {h:'Complicações do reparo',list:[
   '<strong>Dor inguinal crônica:</strong> a complicação mais importante, por lesão ou aprisionamento dos nervos ilioinguinal, ílio-hipogástrico ou ramo genital do genitofemoral. Identificar os nervos durante a cirurgia reduz o risco.',
   '<strong>Recidiva:</strong> mais com tensão, técnica inadequada, tabagismo e obesidade.',
   '<strong>Hematoma, seroma e infecção.</strong>',
   '<strong>Orquite isquêmica e atrofia testicular:</strong> por trombose do plexo pampiniforme na dissecção extensa do funículo.',
   '<strong>Laparoscópica:</strong> nervos cutâneo femoral lateral e ramo femoral do genitofemoral no triângulo da dor; vasos ilíacos no triângulo da desgraça (triangle of doom).']}
 ],
 flow:{title:'Decisão na hérnia inguinal',nodes:[
  {k:'start',t:'Hérnia inguinal diagnosticada'},
  {k:'ask',t:'Encarcerada ou dolorosa intensa?',yes:'Urgência: ver aula de encarceramento',no:'Avaliação eletiva'},
  {k:'ask',t:'Homem com pouco ou nenhum sintoma?',yes:'Expectante vigilante é aceitável, ou cirurgia eletiva',no:'Indicar cirurgia'},
  {k:'ask',t:'Bilateral, recidiva após aberta ou mulher?',yes:'Laparoscopia (TEP ou TAPP)',no:'Lichtenstein ou laparoscopia conforme experiência'},
  {k:'do',t:'Identificar e preservar os nervos'},
  {k:'end',t:'Retorno precoce às atividades'}]},
 reasoning:['A tela sem tensão reduziu a recidiva: Lichtenstein é o padrão aberto.','Mulher e femoral pedem via posterior, que cobre o orifício femoral.','Recidiva se opera pelo caminho ainda virgem.'],
 mnemonics:[{n:'Mulher, bilateral, recidiva',t:'Três indicações clássicas de laparoscopia.'},{n:'Cooper conserta femoral',t:'McVay usa o ligamento de Cooper e fecha o canal femoral.'},{n:'Doom e dor',t:'Triângulo da desgraça: vasos ilíacos. Triângulo da dor: nervos.'}],
 pitfalls:['Indicar observação para hérnia femoral.','Usar tela em criança.','Operar recidiva pela mesma via anterior.','Grampear tela no triângulo da dor.'],
 recall:[
  {q:'Técnica aberta padrão para hérnia inguinal primária?',a:'Lichtenstein, com tela sem tensão.'},
  {q:'Três indicações para via laparoscópica?',a:'Hérnia bilateral, recidiva após via anterior e mulheres.'},
  {q:'Qual técnica corrige hérnia femoral pela via anterior?',a:'McVay (ligamento de Cooper).'},
  {q:'Complicação mais importante a longo prazo?',a:'Dor inguinal crônica.'},
  {q:'Hérnia inguinal em lactente: conduta?',a:'Herniotomia eletiva precoce.'}],
 practice:['Escolha a técnica para: homem de 55 anos com hérnia bilateral; mulher de 40 anos; recidiva após Lichtenstein.','Liste os três nervos em risco na via anterior.'],
 refs:[
  {t:'HerniaSurge Group. International guidelines for groin hernia management. Hernia. 2018.',q:'HerniaSurge international guidelines groin hernia 2018'},
  {t:'Fitzgibbons RJ Jr, et al. Watchful waiting vs repair of inguinal hernia in minimally symptomatic men. JAMA. 2006.',q:'Watchful waiting vs repair inguinal hernia minimally symptomatic men JAMA 2006'}],
 note:'Diretriz internacional de hérnias da virilha.'
},
'cirher_2':{
 updated:'2026-11',
 pretest:['Até que idade se espera o fechamento espontâneo da hérnia umbilical na criança?','Qual a medida que reduz hérnia incisional no fechamento da laparotomia?','O que é hérnia de Richter?','Qual hérnia dá dor na face medial da coxa?'],
 sections:[
  {h:'Hérnias da parede anterior',table:{head:['Hérnia','Pontos principais'],rows:[
   ['Umbilical na criança','Comum, sobretudo em prematuros e negros. A maioria fecha sozinha até 4 a 5 anos. Operar se persistir depois disso, se o anel for grande ou se houver complicação'],
   ['Umbilical no adulto','Adquirida (obesidade, gestação, ascite). Tratamento cirúrgico; tela quando o defeito tem cerca de 1 cm ou mais'],
   ['Epigástrica','Linha alba entre xifoide e umbigo; costuma conter gordura pré-peritoneal; pequena e dolorosa'],
   ['Incisional','Até cerca de 10 a 20% das laparotomias. Fatores: infecção da ferida, obesidade, tabagismo, diabetes, corticoide, técnica de fechamento. Tratamento com tela'],
   ['Spiegel','Na linha semilunar, abaixo da linha arqueada. Fica entre as camadas musculares, difícil de palpar. Diagnóstico por ultrassonografia ou tomografia. Sempre operar pelo colo estreito'],
   ['Diástase dos retos','Afastamento dos retos sem defeito fascial. Não é hérnia e não estrangula']]},
   after:'Prevenção da incisional: fechar a aponeurose com sutura contínua de pontos pequenos (small bites), cerca de 5 a 8 mm de borda e intervalo, mantendo relação de comprimento de fio para ferida de pelo menos 4 para 1 (estudo STITCH). Tela profilática em pacientes de alto risco é opção.'},
  {h:'Hérnias pélvicas e lombares',list:[
   '<strong>Obturadora:</strong> clássica da idosa magra e multípara. Causa obstrução intestinal sem abaulamento visível. Sinal de Howship-Romberg: dor na face medial da coxa pela compressão do nervo obturador. Diagnóstico por tomografia.',
   '<strong>Lombares:</strong> triângulo de Petit (inferior) e de Grynfeltt-Lesshaft (superior).',
   '<strong>Perineal e isquiática:</strong> raras.']},
  {h:'Epônimos de conteúdo',table:{head:['Nome','Conteúdo ou característica'],rows:[
   ['Richter','Só a borda antimesentérica da alça é pinçada: pode necrosar sem obstrução completa'],
   ['Littré','Divertículo de Meckel no saco herniário'],
   ['Amyand','Apêndice dentro de hérnia inguinal'],
   ['De Garengeot','Apêndice dentro de hérnia femoral'],
   ['Maydl','Duas alças em W no saco; a alça intermediária, dentro do abdome, estrangula'],
   ['Deslizamento','Víscera forma parte da parede do saco (cólon sigmoide à esquerda, ceco à direita, bexiga)']]}}
 ],
 flow:{title:'Hérnia da parede abdominal',nodes:[
  {k:'start',t:'Abaulamento ou dor na parede abdominal'},
  {k:'ask',t:'Criança com hérnia umbilical?',yes:'Observar até 4 a 5 anos se pequena e sem complicação',no:'Seguir'},
  {k:'ask',t:'Abaulamento pouco visível, dor localizada?',yes:'Ultrassonografia ou tomografia: Spiegel, epigástrica pequena',no:'Diagnóstico clínico'},
  {k:'ask',t:'Defeito de 1 cm ou mais?',yes:'Reparo com tela',no:'Sutura simples é aceitável'},
  {k:'do',t:'Controlar fatores de risco: tabagismo, obesidade, diabetes'},
  {k:'end',t:'Fechar laparotomias com small bites para prevenir incisional'}]},
 reasoning:['Umbilical na criança: paciência; no adulto: cirurgia.','Obstrução intestinal em idosa magra sem cicatriz e sem abaulamento: obturadora.','Richter engana porque o paciente pode evacuar enquanto a alça necrosa.'],
 mnemonics:[{n:'Howship-Romberg',t:'Coxa medial dói: obturadora.'},{n:'Amyand inguinal, Garengeot femoral',t:'Apêndice na hérnia: inguinal é Amyand; femoral é De Garengeot.'},{n:'4 para 1',t:'Fio pelo menos 4 vezes o comprimento da incisão, pontos pequenos.'}],
 pitfalls:['Operar diástase dos retos como se fosse hérnia.','Operar toda hérnia umbilical de criança de 2 anos.','Excluir Richter porque não há obstrução completa.','Esquecer hérnia obturadora na obstrução da idosa.'],
 recall:[
  {q:'Até quando observar a hérnia umbilical na criança?',a:'Até cerca de 4 a 5 anos, se pequena e sem complicações.'},
  {q:'O que é hérnia de Richter?',a:'Pinçamento apenas da borda antimesentérica da alça, que pode necrosar sem obstrução completa.'},
  {q:'Sinal de Howship-Romberg?',a:'Dor na face medial da coxa por compressão do nervo obturador.'},
  {q:'Onde ocorre a hérnia de Spiegel?',a:'Na linha semilunar, abaixo da linha arqueada.'},
  {q:'Hérnia de Littré contém o quê?',a:'Divertículo de Meckel.'}],
 practice:['Liste cinco fatores de risco para hérnia incisional.','Associe cada epônimo ao conteúdo.'],
 refs:[
  {t:'Henriksen NA, et al. Guidelines for treatment of umbilical and epigastric hernias from the European Hernia Society and Americas Hernia Society. Br J Surg. 2020.',q:'European Hernia Society Americas Hernia Society guidelines umbilical epigastric hernias 2020'},
  {t:'Deerenberg EB, et al. Small bites versus large bites for closure of abdominal midline incisions (STITCH). Lancet. 2015.',q:'STITCH small bites versus large bites closure midline incisions Lancet 2015'},
  {t:'Muysoms FE, et al. European Hernia Society guidelines on the closure of abdominal wall incisions. Hernia. 2015.',q:'European Hernia Society guidelines closure of abdominal wall incisions 2015'}],
 note:'Diretrizes das sociedades europeia e americana de hérnia.'
},
'cirher_3':{
 updated:'2026-11',
 pretest:['Qual a diferença entre hérnia encarcerada e estrangulada?','Quando é permitido tentar reduzir a hérnia manualmente?','O que é redução em bloco?','Pode-se usar tela numa hérnia estrangulada?'],
 sections:[
  {h:'Conceitos',table:{head:['Termo','Definição'],rows:[
   ['Redutível','Volta para a cavidade espontaneamente ou com manobra'],
   ['Encarcerada','Não reduz, mas sem sofrimento vascular'],
   ['Estrangulada','Comprometimento do fluxo sanguíneo do conteúdo, com risco de necrose'],
   ['Obstrução','Conteúdo intestinal encarcerado causando obstrução do trânsito']]},
   after:'Sinais de estrangulamento: dor intensa e contínua, hérnia tensa, endurecida, quente e hiperemiada, febre, taquicardia, leucocitose, lactato elevado, sinais de obstrução e peritonite.'},
  {h:'Conduta',list:[
   '<strong>Encarcerada recente, sem sinais de estrangulamento:</strong> tentativa de redução manual (taxe) com analgesia, sedação leve e posição de Trendelenburg. Se reduzir, cirurgia eletiva precoce, de preferência na mesma internação ou em poucos dias. Observar algumas horas após a redução.',
   '<strong>Sinais de estrangulamento, peritonite ou encarceramento prolongado:</strong> não tentar reduzir. Cirurgia de urgência.',
   '<strong>Na cirurgia:</strong> abrir o saco, avaliar viabilidade da alça (cor, peristalse, pulso no mesentério, sangramento ao corte). Alça viável após aquecimento com compressas: reduzir. Alça inviável: ressecar.',
   '<strong>Tela:</strong> pode ser usada em campo limpo e mesmo limpo-contaminado (com ressecção intestinal sem contaminação grosseira), com baixa infecção. Em contaminação grosseira ou peritonite, preferir reparo tecidual ou tela biológica.',
   '<strong>Hérnia que reduz sozinha na indução anestésica:</strong> fazer laparoscopia diagnóstica ou explorar para verificar a viabilidade da alça.']},
  {h:'Riscos da redução manual',list:[
   '<strong>Redução em bloco:</strong> o saco e o anel constritor voltam juntos para a cavidade, a alça continua estrangulada e o exame parece melhorar.',
   '<strong>Reduzir alça necrosada:</strong> o paciente desenvolve peritonite horas depois.',
   'Por isso, depois de qualquer redução, o paciente fica em observação e deve ser reavaliado.']}
 ],
 flow:{title:'Hérnia que não reduz',nodes:[
  {k:'start',t:'Hérnia dolorosa, irredutível'},
  {k:'ask',t:'Sinais de estrangulamento ou peritonite?',yes:'Não reduzir: reanimação, antibiótico e cirurgia de urgência',no:'Encarceramento recente'},
  {k:'do',t:'Analgesia, sedação leve, Trendelenburg, redução suave'},
  {k:'ask',t:'Reduziu?',yes:'Observar 6 a 12 horas e cirurgia eletiva precoce',no:'Cirurgia de urgência'},
  {k:'ask',t:'Alça viável na cirurgia?',yes:'Reduzir e reparar, tela se campo limpo',no:'Ressecção intestinal e reparo conforme contaminação'},
  {k:'end',t:'Femoral encarcerada: cirurgia, pois o colo é estreito'}]},
 reasoning:['O que define urgência é a perfusão do conteúdo, não o tempo isolado.','Reduzir hérnia com sinais de estrangulamento é empurrar alça morta para dentro.','Tela não é proibida em campo limpo-contaminado.'],
 mnemonics:[{n:'Encarcerada presa, estrangulada sem sangue',t:'Encarcerada não volta; estrangulada não perfunde.'},{n:'Vermelha, quente, dura',t:'Hérnia estrangulada não se reduz.'},{n:'Em bloco',t:'Reduziu tudo junto e o paciente piorou: alça continua presa.'}],
 pitfalls:['Forçar a redução de hérnia hiperemiada.','Dar alta logo após redução manual.','Contraindicar tela de forma absoluta na urgência.','Não explorar hérnia que reduziu na anestesia.'],
 recall:[
  {q:'Diferença entre encarcerada e estrangulada?',a:'Encarcerada não reduz; estrangulada tem comprometimento vascular do conteúdo.'},
  {q:'Quando tentar redução manual?',a:'Encarceramento recente sem sinais de estrangulamento ou peritonite.'},
  {q:'O que é redução em bloco?',a:'Saco e anel constritor voltam juntos e a alça continua estrangulada.'},
  {q:'Após redução bem-sucedida, qual a conduta?',a:'Observação por algumas horas e cirurgia eletiva precoce.'},
  {q:'Como avaliar viabilidade da alça?',a:'Cor, peristalse, pulso mesentérico e sangramento, após aquecimento.'}],
 practice:['Escreva a conduta para hérnia inguinal irredutível há 3 horas, macia e pouco dolorosa, e para outra com hiperemia e febre.'],
 refs:[
  {t:'Birindelli A, et al. 2017 update of the WSES guidelines for emergency repair of complicated abdominal wall hernias. World J Emerg Surg. 2017.',q:'2017 update WSES guidelines emergency repair complicated abdominal wall hernias'},
  {t:'HerniaSurge Group. International guidelines for groin hernia management. Hernia. 2018.',q:'HerniaSurge international guidelines groin hernia 2018'}],
 note:'Diretriz de hérnias complicadas da sociedade mundial de cirurgia de emergência.'
}
});
