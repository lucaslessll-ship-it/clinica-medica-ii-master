/* Estudo aprofundado · Diabetes em situações especiais (P1). Texto original; referências ao final de cada aula. */
LessonDeep.add({
'p1dm_0':{
 updated:'2026-11',
 pretest:['Quais os quatro critérios diagnósticos clássicos de diabetes?','Um único exame alterado em paciente assintomático fecha o diagnóstico?','Cite três situações em que a hemoglobina glicada não é confiável.','Glicemia de jejum de 95 mg/dL no primeiro trimestre da gestação: como classificar?'],
 sections:[
  {h:'Critérios',table:{head:['Exame','Normal','Pré-diabetes','Diabetes'],rows:[
   ['Glicemia de jejum (8 horas)','Abaixo de 100 mg/dL','100 a 125','126 ou mais'],
   ['Glicemia 2 horas após 75 g de glicose','Abaixo de 140','140 a 199','200 ou mais'],
   ['Hemoglobina glicada','Abaixo de 5,7%','5,7 a 6,4%','6,5% ou mais'],
   ['Glicemia ao acaso','','','200 ou mais, com sintomas clássicos']]},
   after:'A diretriz brasileira recente também aceita a glicemia de 1 hora no teste oral (209 mg/dL ou mais para diabetes). Confirme os valores vigentes na referência da sua banca.'},
  {h:'Regras de confirmação',list:[
   'Sem sintomas inequívocos, são necessários dois exames alterados: dois testes diferentes na mesma amostra (por exemplo, jejum e glicada) ou o mesmo teste repetido em outro dia.',
   'Com sintomas clássicos (poliúria, polidipsia, perda de peso) e glicemia ao acaso de 200 ou mais, o diagnóstico está feito.',
   'Se dois testes diferentes discordam, repete-se o que veio alterado. Se confirmar, vale o diagnóstico.',
   'Glicemia capilar não serve para diagnóstico.']},
  {h:'Quando a hemoglobina glicada engana',table:{head:['Efeito','Situações'],rows:[
   ['Falsamente baixa','Hemólise, sangramento recente, transfusão, uso de eritropoetina, doença renal em diálise, gestação no segundo e terceiro trimestres'],
   ['Falsamente alta','Anemia ferropriva, deficiência de vitamina B12, esplenectomia'],
   ['Imprevisível','Hemoglobinopatias, conforme o método']]},
   after:'Em todas essas situações, use critérios de glicemia. A glicada reflete os 2 a 3 meses anteriores e depende da vida da hemácia.'},
  {h:'Que tipo de diabetes é',list:[
   '<strong>Tipo 1:</strong> destruição autoimune da célula beta. Início em geral abrupto, magreza, cetose. Autoanticorpos (anti-GAD, anti-IA2, anti-ZnT8) e peptídeo C baixo. Pode surgir em adultos de forma lenta (forma autoimune latente), simulando tipo 2 que falha cedo com fármacos orais.',
   '<strong>Tipo 2:</strong> resistência à insulina com falência progressiva da célula beta. Obesidade, história familiar, síndrome metabólica.',
   '<strong>Monogênico (MODY):</strong> jovem, não obeso, história familiar em várias gerações, anticorpos negativos. Alguns subtipos respondem a sulfonilureia; o da glicoquinase causa hiperglicemia leve que não precisa de tratamento.',
   '<strong>Secundário:</strong> doença do pâncreas (pancreatite, fibrose cística, hemocromatose), corticoide, síndrome de Cushing, acromegalia.',
   '<strong>Gestacional:</strong> diagnosticado na gravidez, sem critérios de diabetes prévio.']},
  {h:'Gestação',list:[
   'Primeira consulta: glicemia de jejum. De 92 a 125 mg/dL define diabetes gestacional. De 126 ou mais define diabetes prévio diagnosticado na gestação.',
   'Entre 24 e 28 semanas, para quem teve jejum normal: teste oral com 75 g. Um único valor alterado basta: jejum de 92 ou mais, 1 hora de 180 ou mais, 2 horas de 153 ou mais.',
   'Não usar hemoglobina glicada para diagnóstico na gestação.',
   'Reavaliar com teste oral 6 semanas após o parto.']},
  {h:'Quem rastrear',list:[
   'Adultos a partir de 45 anos (diretriz brasileira) ou de 35 anos (diretriz norte-americana).',
   'Qualquer idade com sobrepeso e fator de risco: parente de primeiro grau, hipertensão, dislipidemia, ovários policísticos, diabetes gestacional prévio, doença cardiovascular, sedentarismo.',
   'Repetir a cada 3 anos se normal; todo ano no pré-diabetes.']}
 ],
 flow:{title:'Exame de glicemia alterado',nodes:[
  {k:'start',t:'Glicemia de jejum, glicada ou teste oral acima do normal'},
  {k:'ask',t:'Sintomas clássicos com glicemia de 200 ou mais?',yes:'Diabetes: não precisa repetir',no:'Seguir'},
  {k:'ask',t:'Há condição que altera a hemoglobina glicada?',yes:'Usar só critérios de glicemia',no:'Seguir'},
  {k:'ask',t:'Dois testes diferentes alterados na mesma amostra?',yes:'Diabetes confirmado',no:'Repetir o teste alterado em outro dia'},
  {k:'ask',t:'Confirmou na repetição?',yes:'Diabetes',no:'Pré-diabetes ou normal: acompanhar'},
  {k:'ask',t:'Jovem, magro, cetose ou falha rápida de tratamento oral?',yes:'Dosar autoanticorpos e peptídeo C',no:'Tipo 2 provável'},
  {k:'end',t:'Classificar, rastrear complicações e iniciar o tratamento'}]},
 reasoning:[
  'Dois exames, um diagnóstico. A exceção é o paciente sintomático.',
  'Glicada baixa com glicemias altas: pense em hemácia de vida curta.',
  'Adulto magro rotulado como tipo 2 que precisa de insulina em poucos meses: peça anti-GAD.',
  'Três gerações de diabetes antes dos 25 anos: pense em forma monogênica.',
  'Na gestante, o corte é mais baixo e um valor basta.'],
 mnemonics:[
  {n:'126, 200, 6,5',t:'Jejum, 2 horas e glicada do diabetes.'},
  {n:'100 e 140, 5,7',t:'Onde começa o pré-diabetes.'},
  {n:'92, 180, 153',t:'Teste oral na gestação.'},
  {n:'Ferro baixo sobe, hemólise desce',t:'Efeito sobre a hemoglobina glicada.'}],
 pitfalls:[
  'Fechar diagnóstico com um exame em assintomático.',
  'Usar glicemia capilar para diagnosticar.',
  'Confiar na glicada em renal crônico em diálise ou em anêmico.',
  'Rotular todo adulto como tipo 2 sem considerar a forma autoimune.',
  'Aplicar os cortes do adulto à gestante.',
  'Esquecer a reavaliação após o parto.'],
 recall:[
  {q:'Homem assintomático com glicemia de jejum de 132 e glicada de 6,1%. Tem diabetes?',a:'Ainda não. Os testes discordam; repetir a glicemia de jejum. Se voltar com 126 ou mais, confirma.'},
  {q:'Paciente com anemia hemolítica, glicada de 5,2% e glicemias de jejum de 140 e 150. Interpretação?',a:'Diabetes. A glicada está falsamente baixa pela vida curta das hemácias; valem as duas glicemias de jejum.'},
  {q:'Gestante de 10 semanas com jejum de 96 mg/dL. Diagnóstico?',a:'Diabetes gestacional, sem necessidade de teste oral.'},
  {q:'Mulher de 38 anos, magra, diagnosticada como tipo 2 há um ano, já sem controle com dois fármacos orais. O que pedir?',a:'Autoanticorpos (anti-GAD) e peptídeo C, pela suspeita de diabetes autoimune de início no adulto.'},
  {q:'Quais os valores de pré-diabetes?',a:'Jejum de 100 a 125, 2 horas de 140 a 199 e glicada de 5,7 a 6,4%.'}],
 practice:[
  'Peça glicemia de jejum e glicada na mesma coleta: resolve a confirmação em um passo.',
  'Olhe o hemograma antes de interpretar a glicada.',
  'Anote o método e a data de cada exame usado no diagnóstico.'],
 refs:[
  {t:'American Diabetes Association Professional Practice Committee. 2. Diagnosis and classification of diabetes: Standards of Care in Diabetes 2025. Diabetes Care. 2025.',q:'Diagnosis and Classification of Diabetes Standards of Care in Diabetes 2025'},
  {t:'Sociedade Brasileira de Diabetes. Diretriz da Sociedade Brasileira de Diabetes: diagnóstico de diabetes mellitus.',u:'https://diretriz.diabetes.org.br/'},
  {t:'Metzger BE, et al. International Association of Diabetes and Pregnancy Study Groups recommendations on the diagnosis and classification of hyperglycemia in pregnancy. Diabetes Care. 2010.',q:'International association of diabetes and pregnancy study groups recommendations diagnosis classification hyperglycemia in pregnancy 2010'}],
 note:'Critérios das diretrizes norte-americana e brasileira. Os valores do teste de 1 hora e a idade de rastreio variam entre diretrizes.'
},
'p1dm_1':{
 updated:'2026-11',
 pretest:['Que duas classes reduzem eventos cardiovasculares e renais independentemente da glicada?','Qual classe é prioritária na insuficiência cardíaca?','A partir de que filtração glomerular se pode iniciar inibidor de SGLT2?','Qual complicação dos inibidores de SGLT2 pode ocorrer com glicemia quase normal?'],
 sections:[
  {h:'Mudança de lógica',p:[
   'O tratamento do diabetes tipo 2 deixou de ser só baixar a glicada. Em quem tem doença cardiovascular, insuficiência cardíaca ou doença renal, escolhem-se fármacos pelo órgão que protegem, mesmo com glicada na meta. Duas classes provaram reduzir desfechos: inibidores de SGLT2 e agonistas do receptor de GLP-1.']},
  {h:'Escolha pelo órgão',table:{head:['Condição','Prioridade','Evidência'],rows:[
   ['Doença aterosclerótica estabelecida ou alto risco','Agonista de GLP-1 com benefício comprovado e/ou inibidor de SGLT2','Estudos LEADER, SUSTAIN-6, REWIND, EMPA-REG'],
   ['Insuficiência cardíaca, com fração de ejeção reduzida ou preservada','Inibidor de SGLT2','DAPA-HF, EMPEROR, DELIVER'],
   ['Doença renal crônica (filtração reduzida ou albuminúria)','Inibidor de SGLT2; agonista de GLP-1; finerenona se a albuminúria persistir','CREDENCE, DAPA-CKD, EMPA-KIDNEY, FLOW, FIDELIO'],
   ['Obesidade','Agonista de GLP-1 ou agonista duplo','Maior perda de peso'],
   ['Sem essas condições','Metformina e escolha individualizada','']]},
   after:'No estudo EMPA-REG, a empagliflozina reduziu morte cardiovascular em pacientes com doença cardiovascular. No estudo FLOW, a semaglutida reduziu desfechos renais em diabéticos com doença renal crônica.'},
  {h:'Inibidores de SGLT2 na prática',list:[
   'Bloqueiam a reabsorção de glicose e sódio no túbulo proximal. O benefício cardíaco e renal independe do efeito sobre a glicemia.',
   'Podem ser iniciados com filtração glomerular de 20 mL/min ou mais. Abaixo de 45, quase não baixam a glicemia, mas mantêm a proteção.',
   'Queda inicial e pequena da filtração é esperada e não é motivo para suspender.',
   'Efeitos adversos: infecção genital por fungos, depleção de volume, cetoacidose com glicemia pouco elevada.',
   'Suspender 3 a 4 dias antes de cirurgia e durante doença aguda com jejum, vômitos ou desidratação.',
   'Evitar no diabetes tipo 1.']},
  {h:'Agonistas de GLP-1 na prática',list:[
   'Aumentam a secreção de insulina dependente de glicose, retardam o esvaziamento gástrico e reduzem o apetite.',
   'Efeitos adversos: náuseas, vômitos, diarreia; doença da vesícula biliar. Titular a dose devagar.',
   'Contraindicados com história pessoal ou familiar de carcinoma medular de tireoide ou neoplasia endócrina múltipla tipo 2. Cautela com pancreatite prévia.',
   'Não associar a inibidor de DPP-4.',
   'Risco baixo de hipoglicemia, que aumenta quando combinados a insulina ou sulfonilureia.']},
  {h:'O restante do pacote de proteção',list:[
   'Inibidor da ECA ou bloqueador do receptor de angiotensina em dose máxima tolerada quando há albuminúria e hipertensão.',
   'Estatina conforme o risco; pressão abaixo de 130 por 80 mmHg quando tolerado.',
   'Metformina: contraindicada com filtração abaixo de 30; reduzir a dose entre 30 e 45. Dosar vitamina B12 periodicamente.',
   'Evitar: pioglitazona na insuficiência cardíaca; saxagliptina na insuficiência cardíaca; sulfonilureias em idosos e renais crônicos, pelo risco de hipoglicemia.',
   'Meta de glicada em torno de 7% para a maioria; mais frouxa, perto de 8%, em idosos frágeis, com hipoglicemias ou expectativa de vida limitada.',
   'Rastrear todo ano: creatinina com filtração estimada, relação albumina/creatinina na urina, fundo de olho e exame dos pés.']}
 ],
 flow:{title:'Diabetes tipo 2: escolha do tratamento',nodes:[
  {k:'start',t:'Adulto com diabetes tipo 2'},
  {k:'do',t:'Avaliar: doença cardiovascular, insuficiência cardíaca, filtração glomerular, albuminúria, peso, risco de hipoglicemia'},
  {k:'ask',t:'Insuficiência cardíaca?',yes:'Inibidor de SGLT2',no:'Seguir'},
  {k:'ask',t:'Doença renal crônica com filtração de 20 ou mais?',yes:'Inibidor de SGLT2; associar agonista de GLP-1; finerenona se a albuminúria persistir',no:'Seguir'},
  {k:'ask',t:'Doença aterosclerótica ou alto risco?',yes:'Agonista de GLP-1 e/ou inibidor de SGLT2',no:'Metformina e escolha individualizada'},
  {k:'ask',t:'Glicada acima da meta após 3 meses?',yes:'Intensificar: combinar classes; insulina basal se muito elevada ou com sintomas',no:'Manter'},
  {k:'end',t:'Estatina, controle pressórico, rastreio anual de complicações'}]},
 reasoning:[
  'Pergunte primeiro pelo coração e pelo rim; a glicada vem depois.',
  'Filtração baixa não contraindica o inibidor de SGLT2: é indicação.',
  'Náusea com agonista de GLP-1 costuma ceder com titulação lenta.',
  'Paciente em inibidor de SGLT2 com mal-estar, vômitos e glicemia de 180: dose cetonas.',
  'Idoso com hipoglicemias: afrouxe a meta e retire a sulfonilureia.'],
 mnemonics:[
  {n:'Coração fraco e rim: SGLT2',t:'Insuficiência cardíaca e doença renal.'},
  {n:'Artéria e peso: GLP-1',t:'Aterosclerose e obesidade.'},
  {n:'20, 30 e 45',t:'SGLT2 a partir de 20; metformina proibida abaixo de 30 e reduzida até 45.'},
  {n:'3 dias antes da cirurgia',t:'Suspensão do inibidor de SGLT2.'}],
 pitfalls:[
  'Suspender o inibidor de SGLT2 por causa da queda inicial da filtração.',
  'Não iniciar proteção de órgão porque a glicada está na meta.',
  'Manter metformina com filtração abaixo de 30.',
  'Associar agonista de GLP-1 a inibidor de DPP-4.',
  'Esquecer de pausar o inibidor de SGLT2 antes de cirurgia.',
  'Usar glibenclamida em idoso com doença renal.'],
 recall:[
  {q:'Homem de 64 anos, diabetes tipo 2, infarto prévio, fração de ejeção de 35%, filtração de 48, glicada de 6,8% com metformina. O que acrescentar?',a:'Inibidor de SGLT2, pela insuficiência cardíaca e pela doença renal, independentemente da glicada. Considerar também agonista de GLP-1 pela doença aterosclerótica.'},
  {q:'Mulher em uso de dapagliflozina, internada com vômitos, glicemia de 190, bicarbonato de 12. Hipótese?',a:'Cetoacidose diabética com glicemia pouco elevada, associada ao inibidor de SGLT2. Dosar cetonas, suspender o fármaco e tratar como cetoacidose.'},
  {q:'Paciente com albuminúria persistente apesar de losartana em dose plena e inibidor de SGLT2, potássio normal. Qual a opção adicional?',a:'Finerenona, antagonista mineralocorticoide não esteroidal, com monitorização do potássio.'},
  {q:'Em quem os agonistas de GLP-1 são contraindicados?',a:'Em pessoas com história pessoal ou familiar de carcinoma medular de tireoide ou de neoplasia endócrina múltipla tipo 2.'},
  {q:'Qual a meta de glicada para idoso frágil com hipoglicemias?',a:'Menos rigorosa, em torno de 8%, priorizando a segurança.'}],
 practice:[
  'Peça relação albumina/creatinina na urina todo ano: é ela que indica proteção renal.',
  'Explique ao paciente as "regras do dia doente" para o inibidor de SGLT2.',
  'Revise a lista em busca de sulfonilureia a cada queda da filtração.'],
 refs:[
  {t:'American Diabetes Association Professional Practice Committee. 9. Pharmacologic approaches to glycemic treatment: Standards of Care in Diabetes 2025. Diabetes Care. 2025.',q:'Pharmacologic Approaches to Glycemic Treatment Standards of Care in Diabetes 2025'},
  {t:'KDIGO 2022 clinical practice guideline for diabetes management in chronic kidney disease. Kidney Int. 2022.',q:'KDIGO 2022 Clinical Practice Guideline for Diabetes Management in Chronic Kidney Disease'},
  {t:'Zinman B, et al. Empagliflozin, cardiovascular outcomes, and mortality in type 2 diabetes (EMPA-REG OUTCOME). N Engl J Med. 2015.',q:'Empagliflozin Cardiovascular Outcomes and Mortality in Type 2 Diabetes Zinman 2015'},
  {t:'Perkovic V, et al. Effects of semaglutide on chronic kidney disease in patients with type 2 diabetes (FLOW). N Engl J Med. 2024.',q:'Effects of Semaglutide on Chronic Kidney Disease in Patients with Type 2 Diabetes Perkovic 2024'}],
 note:'Síntese das diretrizes de diabetes e de doença renal.'
},
'p1dm_2':{
 updated:'2026-11',
 pretest:['Quais os três componentes que definem cetoacidose diabética?','Com que potássio não se pode iniciar insulina?','Quando acrescentar glicose ao soro?','Como fazer a transição da insulina intravenosa para a subcutânea?'],
 sections:[
  {h:'Duas crises, um eixo',p:[
   'Na cetoacidose falta insulina de forma quase absoluta. Sem ela, o tecido adiposo libera ácidos graxos, o fígado produz corpos cetônicos e surge acidose com ânion gap elevado. A hiperglicemia causa diurese osmótica, com perda de água, sódio e potássio.',
   'No estado hiperosmolar ainda há insulina suficiente para impedir a cetose, mas não para controlar a glicemia. A hiperglicemia chega a valores muito altos, a desidratação é profunda e a osmolaridade sobe, com rebaixamento de consciência. É mais comum em idosos com diabetes tipo 2 e tem mortalidade maior.']},
  {h:'Critérios',table:{head:['','Cetoacidose','Estado hiperosmolar'],rows:[
   ['Glicemia','200 mg/dL ou mais, ou diabetes conhecido','600 mg/dL ou mais'],
   ['Cetonas','Beta-hidroxibutirato de 3 mmol/L ou mais, ou cetonúria de 2+ ou mais','Ausentes ou discretas'],
   ['Acidose','pH abaixo de 7,30 e/ou bicarbonato abaixo de 18','pH de 7,30 ou mais, bicarbonato de 15 ou mais'],
   ['Osmolaridade efetiva','Variável','Acima de 300 mOsm/kg'],
   ['Déficit de água','Moderado','Grande']]},
   list:[
   'Gravidade da cetoacidose: leve com pH de 7,25 a 7,30; moderada de 7,00 a 7,24; grave abaixo de 7,00.',
   'Ânion gap = sódio menos (cloro mais bicarbonato). Osmolaridade efetiva = 2 vezes o sódio mais glicemia dividida por 18.',
   'Sódio corrigido: somar 1,6 mEq/L para cada 100 mg/dL de glicemia acima de 100.',
   'Cetoacidose com glicemia pouco elevada: inibidores de SGLT2, gestação, jejum, álcool.']},
  {h:'Procurar o gatilho',list:[
   'Infecção: a causa mais frequente.',
   'Omissão de insulina e falha de bomba.',
   'Primeira manifestação do diabetes.',
   'Infarto, AVC, pancreatite.',
   'Fármacos: corticoides, inibidores de SGLT2, antipsicóticos atípicos.',
   'Dor abdominal é comum na cetoacidose e melhora com o tratamento; se persistir, investigar abdome.']},
  {h:'Tratamento em três frentes',table:{head:['Frente','Conduta'],rows:[
   ['Volume','Cristaloide isotônico, 1 a 1,5 litro na primeira hora; depois 250 a 500 mL por hora conforme hidratação e sódio. Acrescentar glicose a 5 ou 10% quando a glicemia chegar a 250 mg/dL na cetoacidose, ou a 300 no estado hiperosmolar'],
   ['Potássio','Abaixo de 3,5 mEq/L: não iniciar insulina; repor potássio até subir. De 3,5 a 5,0: acrescentar 20 a 30 mEq em cada litro de soro. Acima de 5,0: não repor e reavaliar a cada 2 horas'],
   ['Insulina','Regular intravenosa em infusão de 0,1 unidade/kg por hora. Quando a glicemia chegar a 250, reduzir a infusão e manter glicose no soro, até resolver a acidose'],
   ['Bicarbonato','Só com pH abaixo de 7,0'],
   ['Fósforo','Repor apenas se muito baixo ou com disfunção cardíaca ou respiratória']]},
   after:'O potássio corporal total está sempre baixo, mesmo com potássio sérico normal ou alto: a insulina e a correção da acidose empurram o potássio para dentro da célula. Insulina sem potássio causa arritmia fatal. Cetoacidose leve pode ser tratada com análogo rápido subcutâneo.'},
  {h:'Resolução e transição',list:[
   'Cetoacidose resolvida: glicemia abaixo de 200 com bicarbonato de 18 ou mais, pH acima de 7,30 e cetonas baixas ou ânion gap normal. A glicemia normaliza antes da acidose: não desligue a insulina por causa dela.',
   'Estado hiperosmolar resolvido: osmolaridade abaixo de 300, glicemia abaixo de 250 e consciência recuperada. Reduzir a osmolaridade de forma gradual.',
   'Transição: aplicar insulina basal subcutânea 1 a 2 horas antes de desligar a bomba. Sem essa sobreposição, a cetoacidose volta.',
   'Complicações do tratamento: hipocalemia, hipoglicemia, acidose hiperclorêmica, edema cerebral (principalmente em crianças) e sobrecarga de volume.',
   'Antes da alta: tratar o gatilho e educar sobre insulina e dias de doença.']}
 ],
 flow:{title:'Hiperglicemia com paciente grave',nodes:[
  {k:'start',t:'Hiperglicemia com desidratação, vômitos, respiração profunda ou rebaixamento'},
  {k:'do',t:'Gasometria, cetonas, eletrólitos, creatinina, osmolaridade, ECG; procurar o gatilho'},
  {k:'do',t:'Iniciar cristaloide isotônico'},
  {k:'ask',t:'Potássio abaixo de 3,5 mEq/L?',yes:'Repor potássio antes da insulina',no:'Iniciar insulina intravenosa; potássio no soro se entre 3,5 e 5,0'},
  {k:'do',t:'Reavaliar glicemia a cada hora e eletrólitos a cada 2 a 4 horas'},
  {k:'ask',t:'Glicemia chegou a 250 (cetoacidose) ou 300 (hiperosmolar)?',yes:'Acrescentar glicose ao soro e reduzir a infusão de insulina',no:'Manter'},
  {k:'ask',t:'Acidose resolvida e paciente se alimentando?',yes:'Insulina basal subcutânea e desligar a bomba 1 a 2 horas depois',no:'Continuar a infusão'},
  {k:'end',t:'Tratar o gatilho e orientar prevenção'}]},
 reasoning:[
  'Na cetoacidose, o que se trata é a acidose; a glicemia é só o marcador mais fácil de medir.',
  'Potássio antes da insulina, sempre.',
  'Ânion gap alto com glicemia quase normal em diabético: pergunte por inibidor de SGLT2.',
  'Idoso sonolento com glicemia de 900 e sem acidose: o principal tratamento é volume.',
  'Se o ânion gap não fecha, a insulina ou o volume estão insuficientes, ou há outra causa de acidose.'],
 mnemonics:[
  {n:'VIP',t:'Volume, Insulina, Potássio: as três frentes.'},
  {n:'3,5 trava a insulina',t:'Abaixo disso, potássio primeiro.'},
  {n:'250 pede glicose',t:'Momento de pôr glicose no soro na cetoacidose.'},
  {n:'Basal antes de desligar',t:'Sobrepor 1 a 2 horas.'}],
 pitfalls:[
  'Iniciar insulina sem saber o potássio.',
  'Suspender a insulina quando a glicemia normaliza, com acidose ainda presente.',
  'Desligar a bomba sem insulina basal subcutânea prévia.',
  'Dar bicarbonato com pH acima de 7,0.',
  'Não investigar o fator desencadeante.',
  'Corrigir a osmolaridade rápido demais no estado hiperosmolar.'],
 recall:[
  {q:'Jovem com diabetes tipo 1, glicemia de 480, pH de 7,08, bicarbonato de 7, potássio de 3,1. Primeiras medidas?',a:'Cetoacidose moderada. Cristaloide isotônico e reposição de potássio; só iniciar insulina quando o potássio passar de 3,5. Procurar o gatilho.'},
  {q:'Após 6 horas, glicemia de 230, bicarbonato de 12 e ânion gap de 20. O que fazer?',a:'A acidose não resolveu. Acrescentar glicose ao soro, reduzir a taxa de insulina sem suspender e manter potássio, até fechar o ânion gap.'},
  {q:'Como diferenciar cetoacidose de estado hiperosmolar?',a:'Cetoacidose: cetonas elevadas e acidose. Hiperosmolar: glicemia de 600 ou mais, osmolaridade efetiva acima de 300, sem acidose nem cetose relevantes.'},
  {q:'Quando o bicarbonato é indicado?',a:'Apenas com pH abaixo de 7,0.'},
  {q:'Qual o critério de resolução da cetoacidose?',a:'Glicemia abaixo de 200 com bicarbonato de 18 ou mais, pH acima de 7,30 e cetonas baixas ou ânion gap normal.'}],
 practice:[
  'Monte uma folha de fluxo com glicemia horária, potássio, bicarbonato e ânion gap.',
  'Anote o horário da insulina basal antes de desligar a bomba.',
  'Pergunte "por que hoje?" a todo paciente em crise.'],
 refs:[
  {t:'Umpierrez GE, et al. Hyperglycaemic crises in adults with diabetes: a consensus report. Diabetes Care. 2024.',q:'Hyperglycemic Crises in Adults With Diabetes A Consensus Report Umpierrez 2024'},
  {t:'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes. Diabetes Care. 2009.',q:'Hyperglycemic crises in adult patients with diabetes Kitabchi 2009'}],
 note:'Critérios e limiares do consenso de 2024. Protocolos locais podem diferir em doses e pontos de corte.'
},
'p1dm_3':{
 updated:'2026-11',
 pretest:['Quais os três níveis de hipoglicemia?','Como tratar hipoglicemia em paciente consciente e em inconsciente?','Qual a meta de glicemia para a maioria dos pacientes internados?','Por que não usar só a escala móvel de insulina?'],
 sections:[
  {h:'Hipoglicemia: definição e clínica',table:{head:['Nível','Glicemia','Significado'],rows:[
   ['1','Abaixo de 70 mg/dL','Alerta; tratar e rever o esquema'],
   ['2','Abaixo de 54 mg/dL','Clinicamente importante'],
   ['3','Qualquer valor','Grave: o paciente precisa de ajuda de terceiros']]},
   list:[
   'Sintomas adrenérgicos: tremor, sudorese, palpitação, fome, ansiedade.',
   'Sintomas de neuroglicopenia: confusão, alteração de comportamento, fala arrastada, convulsão, coma.',
   'Hipoglicemia sem aviso: perda dos sintomas adrenérgicos após episódios repetidos, neuropatia autonômica ou uso de betabloqueador. O primeiro sinal já é neurológico.',
   'Em não diabéticos, exige a tríade de Whipple: sintomas, glicemia baixa documentada e melhora com glicose.']},
  {h:'Tratamento',list:[
   '<strong>Consciente e engolindo:</strong> 15 g de carboidrato de absorção rápida (uma colher de sopa de açúcar em água, 150 mL de suco ou refrigerante comum). Medir de novo em 15 minutos e repetir se ainda abaixo de 70. Depois, lanche com carboidrato complexo.',
   '<strong>Inconsciente ou sem via oral:</strong> glicose intravenosa, 25 g (50 mL de glicose a 50%). Sem acesso: glucagon intramuscular, subcutâneo ou nasal.',
   'Não colocar alimento na boca de paciente rebaixado.',
   'Depois de tratar, descobrir a causa e ajustar o esquema.']},
  {h:'Causas e armadilhas',list:[
   'Dose excessiva de insulina, erro de aplicação, refeição atrasada ou omitida, exercício sem ajuste, álcool.',
   'Piora da função renal: insulina e sulfonilureias se acumulam.',
   'Sulfonilureias, sobretudo glibenclamida, em idosos e renais crônicos. A hipoglicemia é prolongada e recorre: internar, observar por 24 a 48 horas, manter glicose em infusão e considerar octreotida.',
   'Insuficiência adrenal, insuficiência hepática, sepse, desnutrição.',
   'Redução do corticoide sem reduzir a insulina.']},
  {h:'Hiperglicemia no hospital',p:[
   'Hiperglicemia aumenta infecção e mortalidade; hipoglicemia também. A meta é intermediária.'],
   list:[
   'Meta para a maioria dos internados, em enfermaria ou terapia intensiva: 140 a 180 mg/dL. No estudo NICE-SUGAR, o controle estrito (81 a 108) aumentou a mortalidade em pacientes críticos.',
   'Dosar hemoglobina glicada na admissão, se não houver uma dos últimos 3 meses.',
   'Insulina é o tratamento de escolha no hospital.',
   'Paciente crítico: infusão intravenosa quando a glicemia persiste acima de 180.']},
  {h:'Esquema basal-bolus',list:[
   'Três componentes: basal (cobre o jejum), prandial (cobre as refeições) e correção (corrige o que escapou).',
   'Dose total inicial de 0,3 a 0,5 unidade/kg por dia; 0,2 a 0,3 em idosos, renais crônicos e magros. Metade como basal, metade dividida entre as refeições.',
   'Em jejum ou com ingestão incerta: basal com correção, sem dose prandial fixa.',
   'A escala móvel isolada só reage à hiperglicemia que já ocorreu. O esquema basal-bolus controlou melhor a glicemia e reduziu complicações em pacientes cirúrgicos no estudo RABBIT 2.',
   'Corticoide: eleva principalmente a glicemia da tarde e da noite. Insulina NPH pela manhã, junto da prednisona, acompanha esse perfil.',
   'Toda glicemia abaixo de 70 exige revisão do esquema no mesmo dia.']},
  {h:'Medicamentos de alto risco e orais no hospital',table:{head:['Fármaco','Conduta no hospital'],rows:[
   ['Metformina','Suspender em lesão renal aguda, sepse, hipóxia, uso de contraste em paciente de risco'],
   ['Inibidores de SGLT2','Suspender na doença aguda e 3 a 4 dias antes de cirurgia'],
   ['Sulfonilureias','Suspender: risco de hipoglicemia com ingestão irregular'],
   ['Inibidores de DPP-4','Podem ser mantidos em hiperglicemia leve'],
   ['Insulina','Fármaco de alta vigilância: prescrever "unidades" por extenso, checar concentração, nunca compartilhar canetas, dupla checagem']]},
   after:'Na alta, entregar plano escrito: doses, horários, como tratar hipoglicemia e quando retornar.'}
 ],
 flow:{title:'Glicemia baixa ou alta na enfermaria',nodes:[
  {k:'start',t:'Glicemia capilar fora da meta em paciente internado'},
  {k:'ask',t:'Abaixo de 70 mg/dL?',yes:'Tratar agora: 15 g por via oral se consciente; glicose intravenosa se não',no:'Seguir'},
  {k:'do',t:'Após hipoglicemia: medir em 15 minutos, alimentar, achar a causa e reduzir doses'},
  {k:'ask',t:'Persistentemente acima de 180?',yes:'Iniciar ou ajustar insulina',no:'Manter e monitorar'},
  {k:'ask',t:'Paciente crítico?',yes:'Insulina intravenosa em infusão, meta de 140 a 180',no:'Seguir'},
  {k:'ask',t:'Alimenta-se bem?',yes:'Basal, prandial e correção',no:'Basal com correção'},
  {k:'do',t:'Suspender orais de risco; ajustar para corticoide e função renal'},
  {k:'end',t:'Plano de alta com educação e seguimento'}]},
 reasoning:[
  'Paciente diabético confuso: glicemia capilar antes de qualquer outro exame.',
  'Hipoglicemia que volta após tratada em usuário de sulfonilureia é o esperado: observe por mais tempo.',
  'Creatinina subindo e mesma dose de insulina é receita de hipoglicemia.',
  'Glicemia alta à tarde em quem toma prednisona de manhã: o corticoide explica.',
  'Meta mais apertada não é melhor: no doente crítico, mata.'],
 mnemonics:[
  {n:'Regra dos 15',t:'15 g de carboidrato, reavaliar em 15 minutos.'},
  {n:'70 e 54',t:'Limites dos níveis 1 e 2.'},
  {n:'140 a 180',t:'Meta hospitalar.'},
  {n:'Basal, Bolus, Correção',t:'Os três componentes do esquema.'}],
 pitfalls:[
  'Tratar hipoglicemia e não investigar a causa.',
  'Dar alta logo após hipoglicemia por glibenclamida.',
  'Prescrever só escala móvel.',
  'Suspender a insulina basal de paciente com diabetes tipo 1 em jejum.',
  'Buscar glicemia de 80 a 110 no paciente crítico.',
  'Manter a dose de insulina após reduzir o corticoide.'],
 recall:[
  {q:'Idosa de 80 anos, doença renal crônica, em uso de glibenclamida, encontrada sonolenta com glicemia de 38. Conduta?',a:'Glicose intravenosa imediata, internação com infusão de glicose e glicemias seriadas por 24 a 48 horas, octreotida se recorrer, suspensão definitiva da glibenclamida e escolha de fármaco seguro para a função renal.'},
  {q:'Paciente de 70 kg internado por pneumonia, alimentando-se, glicemias de 240 a 300. Como iniciar insulina?',a:'Esquema basal-bolus com dose total de cerca de 0,3 a 0,5 unidade/kg por dia (21 a 35 unidades), metade como basal e metade dividida nas refeições, com correção adicional. Meta de 140 a 180.'},
  {q:'O que o estudo NICE-SUGAR mostrou?',a:'Que o controle glicêmico intensivo em pacientes críticos aumentou a mortalidade em relação à meta convencional, com mais hipoglicemia grave.'},
  {q:'Como ajustar a insulina de quem usa prednisona pela manhã?',a:'Acrescentar NPH pela manhã, que tem pico coincidente com a hiperglicemia vespertina do corticoide, e reduzir a dose quando o corticoide for reduzido.'},
  {q:'O que é hipoglicemia sem aviso e quem tem risco?',a:'Ausência dos sintomas adrenérgicos de alerta. Ocorre após hipoglicemias repetidas, em neuropatia autonômica e com betabloqueadores.'}],
 practice:[
  'Deixe prescrito o protocolo de hipoglicemia em todo paciente em uso de insulina.',
  'Reveja as doses todos os dias com base nas glicemias das últimas 24 horas.',
  'Ensine o familiar a reconhecer e tratar hipoglicemia antes da alta.'],
 refs:[
  {t:'American Diabetes Association Professional Practice Committee. 16. Diabetes care in the hospital: Standards of Care in Diabetes 2025. Diabetes Care. 2025.',q:'Diabetes Care in the Hospital Standards of Care in Diabetes 2025'},
  {t:'NICE-SUGAR Study Investigators. Intensive versus conventional glucose control in critically ill patients. N Engl J Med. 2009.',q:'Intensive versus Conventional Glucose Control in Critically Ill Patients NICE-SUGAR 2009'},
  {t:'Umpierrez GE, et al. Randomized study of basal-bolus insulin therapy in the inpatient management of patients with type 2 diabetes undergoing general surgery (RABBIT 2 Surgery). Diabetes Care. 2011.',q:'Randomized study of basal-bolus insulin therapy inpatient management type 2 diabetes general surgery RABBIT 2 Umpierrez 2011'}],
 note:'Síntese da diretriz norte-americana e de estudos clínicos. Doses são pontos de partida e exigem ajuste diário.'
}
});
