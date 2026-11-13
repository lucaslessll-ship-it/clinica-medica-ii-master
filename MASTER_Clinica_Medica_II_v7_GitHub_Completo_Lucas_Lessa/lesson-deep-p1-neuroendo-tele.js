/* Estudo aprofundado · Doenças neuroendócrinas e telemedicina (P1). Texto original; referências ao final de cada aula. */
LessonDeep.add({
'p1neuro_0':{
 updated:'2026-11',
 pretest:['Que achados diferenciam a insuficiência adrenal primária da secundária?','Qual o tratamento imediato da crise adrenal e é preciso esperar exames?','O que o paciente deve fazer com a dose do corticoide quando tem febre?','Qual a causa mais comum de insuficiência adrenal na prática?'],
 sections:[
  {h:'Primária ou secundária',p:[
   'Na forma primária a doença está na adrenal. Faltam cortisol e aldosterona, e o ACTH sobe. Na secundária o problema está na hipófise ou no hipotálamo: falta ACTH e, com ele, cortisol; a aldosterona fica preservada, porque depende do sistema renina-angiotensina. Essa diferença explica a clínica.'],
   table:{head:['','Primária (doença de Addison)','Secundária ou terciária'],rows:[
    ['ACTH','Alto','Baixo ou inapropriadamente normal'],
    ['Hiperpigmentação','Sim: pele, pregas, mucosas, cicatrizes','Não'],
    ['Potássio','Alto','Normal'],
    ['Sódio','Baixo','Baixo (por retenção de água)'],
    ['Avidez por sal, hipotensão postural','Marcantes','Menos marcantes'],
    ['Causas','Autoimune, tuberculose, micoses (paracoccidioidomicose), HIV, hemorragia adrenal, metástases, fármacos','Suspensão de corticoide exógeno, tumores e cirurgia de hipófise, apoplexia, hipofisite']]},
   after:'A causa mais comum de todas é o uso prolongado de corticoide, que suprime o eixo. Doses acima do equivalente a 5 mg de prednisona por mais de 3 a 4 semanas já podem suprimir; por isso a retirada deve ser gradual.'},
  {h:'Quando suspeitar',list:[
   'Fadiga, fraqueza, perda de peso, anorexia, náuseas, dor abdominal.',
   'Hipotensão, sobretudo postural; tontura.',
   'Hiponatremia sem explicação, hipercalemia, hipoglicemia, eosinofilia.',
   'Choque que não responde a volume e vasopressor.',
   'Paciente que usava corticoide e parou, ou que adoeceu em uso de dose baixa.',
   'Usuário de imunoterapia, anticoagulante (hemorragia adrenal) ou com outra doença autoimune.']},
  {h:'Diagnóstico',list:[
   '<strong>Cortisol das 8 horas:</strong> muito baixo (abaixo de cerca de 3 a 5 microgramas/dL) confirma; alto (acima de cerca de 15 a 18) exclui. Valores intermediários pedem teste.',
   '<strong>Teste de estímulo com ACTH sintético</strong> (250 microgramas): cortisol que não atinge o pico esperado em 30 ou 60 minutos confirma. O ponto de corte depende do método do laboratório.',
   '<strong>ACTH:</strong> alto na primária, baixo ou normal na secundária.',
   'Na primária: renina alta e aldosterona baixa; anticorpo anti-21-hidroxilase; tomografia de adrenais se o anticorpo for negativo.',
   'Na secundária: ressonância de sela e avaliação dos outros eixos.',
   'Armadilha: na insuficiência secundária de início recente, as adrenais ainda respondem ao estímulo e o teste pode ser normal.']},
  {h:'Tratamento de manutenção',list:[
   'Glicocorticoide: hidrocortisona 15 a 25 mg por dia em 2 ou 3 tomadas, com a maior parte pela manhã, ou prednisona em dose baixa.',
   'Mineralocorticoide na forma primária: fludrocortisona, ajustada por pressão, potássio e renina.',
   'Não restringir sal na forma primária.',
   '<strong>Regras dos dias de doença:</strong> dobrar ou triplicar a dose do glicocorticoide em febre ou infecção, por 2 a 3 dias. Com vômitos ou diarreia, aplicar hidrocortisona intramuscular e procurar o hospital.',
   'Cartão ou pulseira de identificação e kit de hidrocortisona injetável.',
   'Cirurgia e parto: dose de estresse de hidrocortisona intravenosa.']},
  {h:'Crise adrenal',p:[
   'Emergência com hipotensão ou choque, vômitos, dor abdominal que pode simular abdome agudo, febre, confusão, hiponatremia, hipercalemia e hipoglicemia. Gatilhos: infecção, cirurgia, trauma, omissão do corticoide, vômitos que impedem a absorção.'],
   list:[
   'Tratar na suspeita, sem esperar resultados. Se possível, colher cortisol e ACTH antes, sem atrasar.',
   '<strong>Hidrocortisona 100 mg intravenosa em bolus,</strong> seguida de 200 mg nas 24 horas (infusão contínua ou 50 mg a cada 6 horas).',
   '<strong>Soro fisiológico:</strong> 1 litro na primeira hora, depois conforme a resposta.',
   'Glicose se houver hipoglicemia.',
   'Tratar o fator desencadeante.',
   'Em dose alta, a hidrocortisona tem efeito mineralocorticoide suficiente: a fludrocortisona é retomada quando a dose cai.',
   'Depois da crise: reduzir a dose gradualmente e reforçar a educação do paciente.']}
 ],
 flow:{title:'Suspeita de insuficiência adrenal',nodes:[
  {k:'start',t:'Fadiga, hipotensão, hiponatremia ou choque sem resposta ao tratamento'},
  {k:'ask',t:'Instável ou com vômitos e hipotensão?',yes:'Crise adrenal: hidrocortisona 100 mg e soro fisiológico imediatamente; colher cortisol e ACTH se não atrasar',no:'Seguir'},
  {k:'do',t:'Cortisol das 8 horas'},
  {k:'ask',t:'Valor intermediário?',yes:'Teste de estímulo com ACTH',no:'Muito baixo confirma; alto exclui'},
  {k:'do',t:'Confirmado: dosar ACTH'},
  {k:'ask',t:'ACTH alto?',yes:'Primária: renina, aldosterona, anticorpo, tomografia; repor glicocorticoide e fludrocortisona',no:'Secundária: ressonância de sela e demais eixos; repor glicocorticoide'},
  {k:'end',t:'Ensinar regras dos dias de doença e entregar cartão de identificação'}]},
 reasoning:[
  'Hiperpigmentação e potássio alto apontam para a adrenal; ausência dos dois, para a hipófise.',
  'Choque refratário com sódio baixo e potássio alto: dê hidrocortisona.',
  'Paciente em corticoide crônico que vomita está em risco de crise, mesmo com dose "em dia".',
  'Não inicie levotiroxina antes do corticoide em quem pode ter os dois déficits.',
  'Se precisar testar depois, a dexametasona não interfere na dosagem do cortisol.'],
 mnemonics:[
  {n:'Primária Pinta e Potássio',t:'Hiperpigmentação e hipercalemia só na primária.'},
  {n:'100 e 200',t:'Hidrocortisona 100 mg em bolus e 200 mg em 24 horas.'},
  {n:'Febre: dobra ou triplica',t:'Regra dos dias de doença.'},
  {n:'Vomitou: injeta',t:'Hidrocortisona intramuscular se não há via oral.'}],
 pitfalls:[
  'Esperar o cortisol para tratar a crise.',
  'Suspender corticoide de uso prolongado de forma abrupta.',
  'Esquecer a fludrocortisona na forma primária.',
  'Excluir insuficiência secundária recente por um teste de estímulo normal.',
  'Não ensinar o ajuste de dose em doença aguda.',
  'Repor hormônio tireoidiano antes do corticoide.'],
 recall:[
  {q:'Mulher de 34 anos, pele escurecida, perda de peso, pressão de 84 por 50, sódio de 126 e potássio de 5,9. Diagnóstico provável e exames?',a:'Insuficiência adrenal primária. Cortisol matinal e ACTH (que estará alto), renina e aldosterona, anticorpo anti-21-hidroxilase. Se instável, tratar antes de esperar resultados.'},
  {q:'Homem que usava prednisona 20 mg há 8 meses e parou há 5 dias chega com vômitos e hipotensão. Conduta?',a:'Crise adrenal por supressão do eixo. Hidrocortisona 100 mg intravenosa, soro fisiológico, glicose se necessário, e depois retomada do corticoide com retirada gradual.'},
  {q:'Por que não há hipercalemia na forma secundária?',a:'Porque a aldosterona é regulada pelo sistema renina-angiotensina e continua sendo produzida.'},
  {q:'O que orientar ao paciente em reposição que tem febre de 38,5 °C?',a:'Dobrar ou triplicar a dose do glicocorticoide por 2 a 3 dias. Se vomitar, aplicar hidrocortisona intramuscular e ir ao hospital.'},
  {q:'Por que o teste de estímulo pode falhar na forma secundária recente?',a:'Porque as adrenais ainda não atrofiaram e respondem ao ACTH sintético.'}],
 practice:[
  'Pergunte sobre todo tipo de corticoide: oral, inalatório, tópico, intra-articular.',
  'Olhe pregas palmares, gengivas e cicatrizes.',
  'Verifique se o paciente tem o cartão e a ampola de emergência.'],
 refs:[
  {t:'Bornstein SR, et al. Diagnosis and treatment of primary adrenal insufficiency: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2016.',q:'Diagnosis and Treatment of Primary Adrenal Insufficiency Endocrine Society Clinical Practice Guideline Bornstein 2016'},
  {t:'Rushworth RL, Torpy DJ, Falhammar H. Adrenal crisis. N Engl J Med. 2019.',q:'Rushworth Torpy Falhammar Adrenal Crisis N Engl J Med 2019'},
  {t:'Beuschlein F, et al. European Society of Endocrinology and Endocrine Society joint clinical guideline: diagnosis and therapy of glucocorticoid-induced adrenal insufficiency. J Clin Endocrinol Metab. 2024.',q:'European Society of Endocrinology Endocrine Society Joint Clinical Guideline Glucocorticoid-induced Adrenal Insufficiency Beuschlein 2024'}],
 note:'Pontos de corte do cortisol dependem do ensaio do laboratório.'
},
'p1neuro_1':{
 updated:'2026-11',
 pretest:['Qual o defeito visual típico da compressão do quiasma?','Que exames hormonais pedir diante de qualquer massa selar?','Qual macroadenoma se trata primeiro com remédio?','Na apoplexia hipofisária, qual a primeira medicação?'],
 sections:[
  {h:'Três formas de se manifestar',p:[
   'Adenomas de hipófise são classificados pelo tamanho (micro, menor que 10 mm; macro, 10 mm ou mais) e pela função. Um macroadenoma pode causar problema de três maneiras, e é preciso procurar as três em todo paciente.'],
   table:{head:['Eixo','Manifestações'],rows:[
    ['Efeito de massa','Cefaleia; hemianopsia bitemporal por compressão do quiasma, que começa pelos quadrantes superiores; paralisia de nervos oculomotores se invadir o seio cavernoso'],
    ['Excesso hormonal','Prolactina (o mais comum), hormônio do crescimento, ACTH, raramente TSH'],
    ['Deficiência hormonal','Hipopituitarismo por compressão da glândula normal; prolactina moderadamente alta por compressão da haste']]},
   after:'Os adenomas não funcionantes costumam ser descobertos tarde, já como macroadenomas, por queixa visual ou hipogonadismo.'},
  {h:'Avaliação de toda massa selar',list:[
   'Prolactina. Em tumores grandes com prolactina pouco elevada, pedir diluição da amostra, pois o excesso do hormônio pode falsear o ensaio para baixo.',
   'IGF-1.',
   'Cortisol matinal, com ACTH; rastreio de hipercortisolismo se houver clínica.',
   'TSH e T4 livre.',
   'LH, FSH e testosterona no homem; história menstrual e estradiol na mulher.',
   'Sódio.',
   'Ressonância de sela com contraste.',
   'Campimetria visual se a lesão toca ou se aproxima do quiasma.']},
  {h:'Hipopituitarismo',list:[
   'Ordem habitual de perda: hormônio do crescimento, gonadotrofinas, TSH e, por último, ACTH.',
   'Reposição: primeiro o glicocorticoide, depois a levotiroxina. Hormônio tireoidiano acelera o metabolismo do cortisol e pode precipitar crise adrenal.',
   'Hipotireoidismo central se acompanha pelo T4 livre, não pelo TSH.',
   'Diabetes insípido antes da cirurgia é raro no adenoma: sua presença sugere craniofaringioma, metástase ou hipofisite.']},
  {h:'Tratamento',table:{head:['Lesão','Conduta'],rows:[
   ['Prolactinoma, micro ou macro','Agonista dopaminérgico (cabergolina), mesmo com defeito visual: reduz o tumor em dias a semanas'],
   ['Macroadenoma não funcionante com sintomas ou perto do quiasma','Cirurgia transesfenoidal'],
   ['Produtor de hormônio do crescimento ou de ACTH','Cirurgia transesfenoidal como primeira linha'],
   ['Microadenoma não funcionante achado ao acaso','Acompanhar com ressonância'],
   ['Macroadenoma não funcionante assintomático e distante do quiasma','Acompanhar com ressonância e campimetria']]}},
  {h:'Apoplexia hipofisária',p:[
   'Hemorragia ou infarto súbito de um adenoma, muitas vezes ainda não diagnosticado. O tumor aumenta de volume de repente, comprime o quiasma e os seios cavernosos e destrói a hipófise normal.'],
   list:[
   '<strong>Clínica:</strong> cefaleia súbita e intensa, vômitos, perda visual, oftalmoplegia (o terceiro par é o mais afetado, com ptose e midríase), rigidez de nuca, rebaixamento de consciência e hipotensão por falta aguda de cortisol.',
   '<strong>Fatores precipitantes:</strong> anticoagulação, grandes cirurgias, gestação, testes de estímulo hipofisário, hipertensão, trauma.',
   '<strong>Diferenciais:</strong> hemorragia subaracnoide e meningite. A tomografia pode não mostrar; a ressonância é o melhor exame.',
   '<strong>Conduta imediata:</strong> hidrocortisona intravenosa em dose de estresse, sem esperar exames; hidratação; correção de sódio; coleta de hormônios.',
   '<strong>Cirurgia descompressiva</strong> para perda visual grave ou progressiva e para rebaixamento de consciência. Casos leves e estáveis podem ser tratados de forma conservadora, com vigilância visual estreita.',
   'Depois: reavaliar todos os eixos em 4 a 8 semanas. A maioria fica com deficiência hormonal permanente.'],
   after:'Síndrome de Sheehan: necrose da hipófise após hemorragia grave no parto. A mulher não amamenta, não volta a menstruar e desenvolve hipopituitarismo.'}
 ],
 flow:{title:'Massa selar ou cefaleia súbita com alteração visual',nodes:[
  {k:'start',t:'Lesão de hipófise na imagem, ou cefaleia súbita com queixa visual'},
  {k:'ask',t:'Cefaleia em trovoada, oftalmoplegia, perda visual aguda ou hipotensão?',yes:'Apoplexia: hidrocortisona intravenosa imediata, ressonância, neurocirurgia e oftalmologia',no:'Seguir'},
  {k:'do',t:'Prolactina (com diluição se tumor grande), IGF-1, cortisol, TSH e T4 livre, gonadotrofinas, sódio'},
  {k:'do',t:'Ressonância de sela e campimetria'},
  {k:'ask',t:'Prolactina muito elevada?',yes:'Prolactinoma: cabergolina',no:'Seguir'},
  {k:'ask',t:'Macroadenoma com compressão do quiasma ou produtor de hormônio?',yes:'Cirurgia transesfenoidal',no:'Acompanhar com imagem'},
  {k:'do',t:'Repor deficiências: glicocorticoide antes da levotiroxina'},
  {k:'end',t:'Reavaliar eixos e imagem periodicamente'}]},
 reasoning:[
  'Toda massa selar pede prolactina antes de qualquer decisão cirúrgica.',
  'Prolactina moderadamente alta com tumor grande pode ser compressão da haste, não prolactinoma: a diluição esclarece.',
  'Cefaleia súbita com terceiro par e tomografia sem sangue no espaço subaracnoide: pense em apoplexia.',
  'Homem com queda de libido e campo visual estreitado: hipófise.',
  'Na dúvida entre dois déficits, o cortisol vem primeiro.'],
 mnemonics:[
  {n:'Massa, Mais, Menos',t:'Efeito de massa, hormônio a mais, hormônio a menos.'},
  {n:'Bitemporal = quiasma',t:'O campo visual localiza a lesão.'},
  {n:'Prolactinoma se trata com Pílula',t:'O único macroadenoma de tratamento clínico inicial.'},
  {n:'Apoplexia: Corticoide antes de Cortar',t:'Hidrocortisona antes de qualquer cirurgia.'}],
 pitfalls:[
  'Operar um prolactinoma sem ter dosado a prolactina.',
  'Não pedir diluição em tumor gigante com prolactina pouco alta.',
  'Iniciar levotiroxina antes do glicocorticoide.',
  'Acompanhar hipotireoidismo central pelo TSH.',
  'Esquecer a campimetria.',
  'Atrasar o corticoide na apoplexia.'],
 recall:[
  {q:'Homem de 52 anos, tumor de 2,8 cm comprimindo o quiasma, prolactina de 3.200 ng/mL. Qual o tratamento inicial?',a:'Cabergolina. É um macroprolactinoma, que responde ao agonista dopaminérgico com redução do tumor e melhora visual, sem cirurgia inicial.'},
  {q:'Mulher em anticoagulação apresenta cefaleia súbita, ptose à direita com pupila dilatada e pressão de 80 por 50. Conduta?',a:'Apoplexia hipofisária provável. Hidrocortisona intravenosa imediata, hidratação, ressonância de sela, avaliação urgente de neurocirurgia e oftalmologia, e reversão da anticoagulação conforme o caso.'},
  {q:'Qual a ordem de reposição no hipopituitarismo e por quê?',a:'Glicocorticoide antes da levotiroxina, porque o hormônio tireoidiano aumenta a depuração do cortisol e pode desencadear crise adrenal.'},
  {q:'Por que pedir diluição da prolactina?',a:'Porque concentrações muito altas saturam o ensaio e produzem resultado falsamente baixo, o chamado efeito gancho.'},
  {q:'Achado de microadenoma de 5 mm sem alteração hormonal. Conduta?',a:'Acompanhar com ressonância periódica; não operar.'}],
 practice:[
  'Faça campo visual por confrontação em toda consulta de quem tem lesão selar.',
  'Pergunte ao homem sobre libido e à mulher sobre ciclos e galactorreia.',
  'Deixe orientação escrita sobre dose de estresse para quem repõe corticoide.'],
 refs:[
  {t:'Molitch ME. Diagnosis and treatment of pituitary adenomas: a review. JAMA. 2017.',q:'Molitch Diagnosis and Treatment of Pituitary Adenomas A Review JAMA 2017'},
  {t:'Rajasekaran S, et al. UK guidelines for the management of pituitary apoplexy. Clin Endocrinol (Oxf). 2011.',q:'UK guidelines for the management of pituitary apoplexy Rajasekaran 2011'},
  {t:'Fleseriu M, et al. Hormonal replacement in hypopituitarism in adults: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2016.',q:'Hormonal Replacement in Hypopituitarism in Adults Endocrine Society Clinical Practice Guideline Fleseriu 2016'}],
 note:'Síntese de revisão e diretrizes.'
},
'p1neuro_2':{
 updated:'2026-11',
 pretest:['Qual a causa mais comum de síndrome de Cushing?','Quais os três testes de rastreio?','O que o ACTH baixo indica?','Cite três achados que sugerem produção ectópica de ACTH.'],
 sections:[
  {h:'Antes de tudo: corticoide exógeno',p:[
   'A causa mais frequente é o uso de glicocorticoide, por qualquer via: oral, injetável, inalatória, tópica, nasal ou intra-articular. Pergunte ativamente, inclusive por fórmulas manipuladas e produtos "naturais". Só depois de excluir essa causa faz sentido investigar a forma endógena.']},
  {h:'Quem investigar',list:[
   'Achados mais específicos: fragilidade capilar com equimoses fáceis, pletora facial, fraqueza muscular proximal, estrias violáceas largas (mais de 1 cm).',
   'Achados menos específicos: obesidade central, face em lua cheia, giba, hipertensão, diabetes, osteoporose, hirsutismo, irregularidade menstrual, depressão.',
   'Situações de alerta: osteoporose ou hipertensão em jovem, diabetes de difícil controle com fenótipo sugestivo, incidentaloma adrenal, criança que ganha peso e para de crescer.',
   'Obesidade, depressão, alcoolismo e diabetes descompensado elevam o cortisol sem doença tumoral (pseudo-Cushing).']},
  {h:'Passo 1: confirmar o hipercortisolismo',table:{head:['Teste','Como se faz','Alterado','Limitações'],rows:[
   ['Supressão com 1 mg de dexametasona','1 mg às 23 horas e cortisol às 8 horas','Cortisol acima de 1,8 micrograma/dL','Estrogênio oral eleva a proteína ligadora; indutores enzimáticos aceleram a dexametasona'],
   ['Cortisol salivar noturno','Duas ou mais coletas às 23 horas','Acima do limite do método','Inválido em trabalhador noturno'],
   ['Cortisol livre urinário de 24 horas','Duas ou mais coletas','Acima do limite','Inválido na insuficiência renal; falha em casos leves']]},
   after:'Usar pelo menos dois testes. Resultados discordantes ou limítrofes pedem repetição: a doença pode ser cíclica.'},
  {h:'Passo 2: dosar o ACTH',table:{head:['ACTH','Significa','Próximo passo'],rows:[
   ['Baixo','Independente de ACTH: a adrenal produz sozinha','Tomografia de adrenais: adenoma, carcinoma, hiperplasia'],
   ['Normal ou alto','Dependente de ACTH','Ressonância de hipófise: doença de Cushing ou fonte ectópica']]}},
  {h:'Passo 3: hipófise ou ectópico',list:[
   'Doença de Cushing (adenoma de hipófise) responde por cerca de 70% dos casos endógenos; a maioria é microadenoma.',
   'Produção ectópica: carcinoma de pequenas células de pulmão, carcinoides brônquico e tímico, tumores neuroendócrinos de pâncreas, carcinoma medular de tireoide.',
   '<strong>Pistas de ectópico:</strong> instalação rápida, hipocalemia importante, hiperpigmentação, perda de peso em vez de ganho, fraqueza intensa, cortisol e ACTH muito elevados, mais comum em homens.',
   'Lesão hipofisária de 10 mm ou mais com clínica compatível: dispensa outros testes.',
   'Ressonância normal ou lesão muito pequena: cateterismo de seios petrosos inferiores, que compara o ACTH central com o periférico e é o melhor exame para separar as duas origens.',
   'Testes auxiliares: supressão com dose alta de dexametasona e estímulo com CRH ou desmopressina.']},
  {h:'Tratamento e complicações',list:[
   'Doença de Cushing: cirurgia transesfenoidal. A insuficiência adrenal no pós-operatório indica remissão e exige reposição por meses.',
   'Adenoma adrenal: adrenalectomia unilateral. Fonte ectópica: ressecção do tumor.',
   'Controle clínico quando a cirurgia falha ou é impossível: inibidores da síntese de cortisol (cetoconazol, metirapona, osilodrostate), entre outros.',
   'Adrenalectomia bilateral em casos graves e refratários; risco de crescimento do tumor hipofisário depois.',
   'Complicações que matam: infecções oportunistas, tromboembolismo venoso, eventos cardiovasculares. Considerar profilaxia de trombose no perioperatório e profilaxia para Pneumocystis nos casos graves.',
   'Tratar hipertensão, diabetes, hipocalemia e osteoporose.']}
 ],
 flow:{title:'Suspeita de hipercortisolismo',nodes:[
  {k:'start',t:'Fenótipo sugestivo ou incidentaloma adrenal'},
  {k:'ask',t:'Usa corticoide por qualquer via?',yes:'Síndrome exógena: rever a necessidade e reduzir de forma gradual',no:'Seguir'},
  {k:'do',t:'Dois testes de rastreio: supressão com 1 mg, cortisol salivar noturno ou cortisol urinário'},
  {k:'ask',t:'Dois testes alterados?',yes:'Hipercortisolismo confirmado: dosar ACTH',no:'Improvável; repetir se a suspeita persistir'},
  {k:'ask',t:'ACTH baixo?',yes:'Tomografia de adrenais',no:'Ressonância de hipófise'},
  {k:'ask',t:'Adenoma hipofisário de 10 mm ou mais?',yes:'Doença de Cushing: cirurgia transesfenoidal',no:'Cateterismo de seios petrosos para diferenciar de fonte ectópica'},
  {k:'end',t:'Tratar a causa e as complicações; repor corticoide após a cura'}]},
 reasoning:[
  'Primeiro prove que há cortisol demais; só depois procure de onde vem.',
  'Imagem antes do diagnóstico bioquímico acha incidentalomas e confunde.',
  'Hipocalemia grave com quadro rápido e emagrecimento: ectópico.',
  'Paciente em anticoncepcional oral com teste de supressão alterado: desconfie do teste.',
  'Estria fina e clara de obesidade não é a estria larga e violácea do Cushing.'],
 mnemonics:[
  {n:'3 testes, 2 alterados',t:'Regra do rastreio.'},
  {n:'1 mg, 1,8',t:'Dose de dexametasona e corte do cortisol.'},
  {n:'ACTH baixo olha a Adrenal; ACTH alto olha Acima',t:'Para onde dirigir a imagem.'},
  {n:'Ectópico é Rápido, com K baixo e Escuro',t:'Instalação rápida, hipocalemia e hiperpigmentação.'}],
 pitfalls:[
  'Não perguntar por corticoide tópico, inalatório ou intra-articular.',
  'Pedir ressonância de hipófise antes de confirmar o hipercortisolismo.',
  'Confiar em um único teste de rastreio.',
  'Interpretar teste de supressão em usuária de estrogênio oral.',
  'Esquecer a profilaxia de trombose.',
  'Não repor corticoide após a cirurgia curativa.'],
 recall:[
  {q:'Mulher de 32 anos, equimoses fáceis, estrias violáceas, fraqueza proximal. Cortisol após 1 mg de dexametasona de 9 e cortisol salivar noturno elevado em duas coletas. Próximo exame?',a:'ACTH plasmático, para separar causa dependente de causa independente de ACTH.'},
  {q:'O ACTH veio abaixo do limite inferior. O que pedir?',a:'Tomografia de adrenais, em busca de adenoma, carcinoma ou hiperplasia.'},
  {q:'ACTH elevado e ressonância de hipófise normal. Como definir a origem?',a:'Cateterismo de seios petrosos inferiores com dosagem de ACTH central e periférico, antes e após estímulo.'},
  {q:'Homem tabagista, perda de peso, hipertensão recente, potássio de 2,4, pele escurecida, cortisol muito alto. Hipótese?',a:'Síndrome de ACTH ectópico, provavelmente por carcinoma de pequenas células de pulmão.'},
  {q:'Cite três situações que causam falso-positivo no rastreio.',a:'Depressão, alcoolismo, obesidade grave, diabetes descompensado, uso de estrogênio oral e de indutores enzimáticos como fenitoína e rifampicina.'}],
 practice:[
  'Peça ao paciente fotos antigas para comparar o rosto.',
  'Teste a força levantando da cadeira sem apoio dos braços.',
  'Liste todas as vias de corticoide na anamnese.'],
 refs:[
  {t:'Nieman LK, et al. The diagnosis of Cushing syndrome: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2008.',q:'Diagnosis of Cushing Syndrome Endocrine Society Clinical Practice Guideline Nieman 2008'},
  {t:'Fleseriu M, et al. Consensus on diagnosis and management of Cushing disease: a guideline update. Lancet Diabetes Endocrinol. 2021.',q:'Consensus on diagnosis and management of Cushing disease guideline update Fleseriu 2021'}],
 note:'Pontos de corte dependem do método laboratorial.'
},
'p1neuro_3':{
 updated:'2026-11',
 pretest:['Cite cinco causas de hiperprolactinemia além do prolactinoma.','O que é macroprolactina e quando pesquisá-la?','Qual o tratamento do prolactinoma e seu principal fármaco?','Como se confirma acromegalia?'],
 sections:[
  {h:'Por que a prolactina sobe',p:[
   'A prolactina é o único hormônio hipofisário sob inibição contínua, feita pela dopamina que desce do hipotálamo pela haste. Tudo o que reduz a dopamina, bloqueia seu receptor ou interrompe a haste eleva a prolactina.'],
   table:{head:['Grupo','Exemplos'],rows:[
    ['Fisiológicas','Gestação, amamentação, estresse, sono, exercício, estímulo mamário'],
    ['Fármacos','Antipsicóticos (sobretudo risperidona e os típicos), metoclopramida, domperidona, metildopa, verapamil, opioides, estrogênios, alguns antidepressivos'],
    ['Doenças sistêmicas','Hipotireoidismo primário, doença renal crônica, cirrose, lesões da parede torácica'],
    ['Hipófise e hipotálamo','Prolactinoma; compressão da haste por qualquer tumor selar; hipofisite'],
    ['Artefato','Macroprolactina: forma grande e pouco ativa do hormônio']]},
   after:'O nível orienta: acima de 250 ng/mL costuma ser macroprolactinoma. Compressão de haste e fármacos em geral ficam abaixo de 100 a 150, embora risperidona e metoclopramida possam passar disso.'},
  {h:'Clínica e investigação',list:[
   'Mulher: ciclos irregulares ou amenorreia, galactorreia, infertilidade.',
   'Homem: queda de libido, disfunção erétil, infertilidade; diagnóstico tardio, já com macroadenoma e queixa visual.',
   'Ambos: hipogonadismo com perda de massa óssea.',
   'Roteiro: repetir a dosagem, teste de gravidez, TSH, creatinina, enzimas hepáticas e revisão detalhada dos fármacos.',
   'Paciente assintomático com prolactina alta: pesquisar macroprolactina.',
   'Excluídas as outras causas: ressonância de sela.',
   'Tumor grande com prolactina desproporcionalmente baixa: pedir diluição.']},
  {h:'Tratamento da hiperprolactinemia',list:[
   '<strong>Cabergolina</strong> é a primeira escolha no prolactinoma: normaliza a prolactina, reduz o tumor e restaura a função gonadal, inclusive nos macroadenomas com defeito visual. É mais eficaz e mais bem tolerada que a bromocriptina.',
   'Efeitos adversos: náuseas, hipotensão postural, cefaleia; transtornos do controle de impulsos (jogo, compras, hipersexualidade), que devem ser perguntados.',
   'Após pelo menos 2 anos com prolactina normal e tumor não visível, pode-se tentar a retirada, com vigilância.',
   'Cirurgia para resistência ou intolerância ao fármaco.',
   'Microprolactinoma assintomático, sem desejo de gestação e sem hipogonadismo, pode ser apenas acompanhado.',
   '<strong>Causada por fármaco:</strong> não iniciar agonista dopaminérgico por conta própria em paciente psiquiátrico. Discutir com o psiquiatra a troca por fármaco que eleve menos a prolactina.',
   '<strong>Gestação:</strong> no microprolactinoma, suspender a cabergolina ao confirmar a gravidez e acompanhar clinicamente; no macroprolactinoma, decisão individual com campimetria seriada.']},
  {h:'Acromegalia',p:[
   'Excesso de hormônio do crescimento por adenoma hipofisário, quase sempre macroadenoma no diagnóstico, porque a doença evolui devagar e é reconhecida com anos de atraso. Antes do fechamento das epífises causa gigantismo.'],
   list:[
   '<strong>Clínica:</strong> aumento de mãos e pés (anéis e sapatos não servem), traços faciais grosseiros, prognatismo, afastamento dos dentes, língua grande, voz grave, sudorese, pele espessa.',
   '<strong>Complicações:</strong> hipertensão, diabetes, apneia do sono, cardiomiopatia, artropatia, síndrome do túnel do carpo, pólipos e câncer de cólon.',
   '<strong>Diagnóstico:</strong> IGF-1 elevado para a idade é o rastreio. Confirma-se com o teste oral de tolerância à glicose: o hormônio do crescimento não suprime. Dosagem isolada do hormônio não serve, pois a secreção é pulsátil.',
   'Depois, ressonância de sela, campimetria e avaliação dos demais eixos. Colonoscopia e ecocardiograma no diagnóstico.',
   '<strong>Tratamento:</strong> cirurgia transesfenoidal. Doença persistente: análogos da somatostatina (octreotida, lanreotida), pegvisomanto (bloqueia o receptor do hormônio do crescimento), cabergolina nos casos leves e radioterapia.',
   'Meta: IGF-1 normal para a idade.']},
  {h:'Outros distúrbios do eixo',list:[
   '<strong>Diabetes insípido central</strong> (deficiência de vasopressina): poliúria com urina diluída e sede intensa; sódio sobe se o paciente não bebe água. Tratamento com desmopressina.',
   '<strong>Secreção inapropriada de hormônio antidiurético:</strong> hiponatremia com urina concentrada em paciente sem alteração de volume.',
   '<strong>Craniofaringioma:</strong> tumor suprasselar, com calcificações, em crianças e adultos; causa déficit visual, hipopituitarismo e diabetes insípido.',
   '<strong>Hipofisite:</strong> autoimune (periparto) ou por imunoterapia; cefaleia e deficiência de ACTH.']}
 ],
 flow:{title:'Prolactina elevada',nodes:[
  {k:'start',t:'Prolactina acima da referência'},
  {k:'do',t:'Repetir; teste de gravidez; rever fármacos; TSH, creatinina e enzimas hepáticas'},
  {k:'ask',t:'Causa fisiológica, fármaco ou doença sistêmica identificada?',yes:'Tratar a causa ou discutir troca do fármaco',no:'Seguir'},
  {k:'ask',t:'Assintomático?',yes:'Pesquisar macroprolactina',no:'Ressonância de sela'},
  {k:'ask',t:'Adenoma com prolactina proporcional ao tamanho?',yes:'Prolactinoma: cabergolina',no:'Tumor grande com prolactina pouco alta: diluir a amostra; pensar em compressão de haste'},
  {k:'ask',t:'Macroadenoma?',yes:'Campimetria e avaliação dos outros eixos',no:'Acompanhar prolactina e sintomas'},
  {k:'end',t:'Reavaliar em meses; tentar retirada após 2 anos de controle'}]},
 reasoning:[
  'Antes da ressonância: gravidez, remédio, tireoide e rim.',
  'Prolactina de 80 com tumor de 3 cm não é prolactinoma até diluir a amostra.',
  'Em homem, hiperprolactinemia se apresenta como hipogonadismo, não como galactorreia.',
  'Acromegalia se rastreia com IGF-1, não com hormônio do crescimento ao acaso.',
  'Paciente em antipsicótico com prolactina alta: a conversa é com o psiquiatra.'],
 mnemonics:[
  {n:'Dopamina Desliga a prolactina',t:'Tudo que tira a dopamina eleva o hormônio.'},
  {n:'GRT-R antes da ressonância',t:'Gravidez, Remédio, Tireoide e Rim.'},
  {n:'250 = macro',t:'Nível típico de macroprolactinoma.'},
  {n:'IGF-1 rastreia, glicose confirma',t:'Investigação da acromegalia.'}],
 pitfalls:[
  'Pedir ressonância sem teste de gravidez e sem rever fármacos.',
  'Tratar macroprolactina.',
  'Operar macroprolactinoma como primeira opção.',
  'Dar agonista dopaminérgico a paciente psicótico sem discutir com o psiquiatra.',
  'Dosar hormônio do crescimento ao acaso para excluir acromegalia.',
  'Não perguntar sobre comportamento impulsivo em quem usa cabergolina.'],
 recall:[
  {q:'Mulher de 27 anos, amenorreia e galactorreia, prolactina de 95 ng/mL. Quais os primeiros passos?',a:'Teste de gravidez, revisão de fármacos, TSH, creatinina e enzimas hepáticas. Se tudo normal, ressonância de sela.'},
  {q:'Homem com macroadenoma de 2,5 cm e prolactina de 4.000 ng/mL, com hemianopsia. Tratamento?',a:'Cabergolina. A resposta costuma ser rápida, com redução do tumor e melhora do campo visual; cirurgia fica para resistência ou intolerância.'},
  {q:'O que é macroprolactina?',a:'Complexo de prolactina com imunoglobulina, de baixa atividade biológica, que eleva a dosagem sem causar sintomas. Não se trata.'},
  {q:'Como confirmar acromegalia em paciente com IGF-1 elevado?',a:'Teste oral de tolerância à glicose com dosagem do hormônio do crescimento, que não suprime na acromegalia; depois, ressonância de sela.'},
  {q:'Quais complicações rastrear na acromegalia?',a:'Hipertensão, diabetes, apneia do sono, cardiomiopatia e pólipos de cólon, com colonoscopia no diagnóstico.'}],
 practice:[
  'Pergunte se os anéis e os sapatos ainda servem.',
  'Liste antieméticos e antipsicóticos na anamnese de toda hiperprolactinemia.',
  'Pergunte sobre jogos e compras a quem usa cabergolina.'],
 refs:[
  {t:'Melmed S, et al. Diagnosis and treatment of hyperprolactinemia: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2011.',q:'Diagnosis and Treatment of Hyperprolactinemia Endocrine Society Clinical Practice Guideline Melmed 2011'},
  {t:'Petersenn S, et al. Diagnosis and management of prolactin-secreting pituitary adenomas: a Pituitary Society international consensus statement. Nat Rev Endocrinol. 2023.',q:'Diagnosis and management of prolactin-secreting pituitary adenomas Pituitary Society international Consensus Statement Petersenn 2023'},
  {t:'Katznelson L, et al. Acromegaly: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2014.',q:'Acromegaly Endocrine Society Clinical Practice Guideline Katznelson 2014'}],
 note:'Síntese de diretrizes e consenso internacional.'
},
'p1tele_0':{
 updated:'2026-11',
 pretest:['Que norma do Conselho Federal de Medicina regula a telemedicina hoje?','A primeira consulta pode ser a distância?','Quem decide se o atendimento deve ser presencial?','Cite cinco sinais que obrigam a converter a teleconsulta em atendimento presencial.'],
 sections:[
  {h:'Base normativa',p:[
   'No Brasil, a telemedicina é regulada pela Resolução 2.314 de 2022 do Conselho Federal de Medicina e a telessaúde em geral pela Lei 14.510 de 2022. As duas partem dos mesmos princípios: autonomia do profissional, consentimento do paciente, direito de recusa do atendimento remoto, confidencialidade, registro em prontuário e mesma responsabilidade do atendimento presencial.',
   'O atendimento presencial segue sendo a referência. O remoto é um meio a mais, que serve quando entrega segurança equivalente para aquela situação.']},
  {h:'Modalidades',table:{head:['Modalidade','O que é'],rows:[
   ['Teleconsulta','Consulta entre médico e paciente a distância'],
   ['Teleinterconsulta','Troca de informações entre médicos, com ou sem o paciente presente'],
   ['Telediagnóstico','Emissão de laudo a distância (imagem, traçados)'],
   ['Telemonitoramento','Acompanhamento remoto de parâmetros de saúde'],
   ['Teletriagem','Avaliação de sintomas para direcionar ao tipo de atendimento adequado'],
   ['Teleconsultoria','Orientação a profissionais e gestores sobre condutas e processos'],
   ['Telecirurgia','Procedimento com equipamento robótico operado a distância']]}},
  {h:'Regras que caem em prova',list:[
   'A primeira consulta pode ser remota. Cabe ao médico avaliar se é adequado.',
   'O médico tem autonomia para indicar ou recusar a telemedicina e para pedir avaliação presencial sempre que julgar necessário.',
   'O paciente pode recusar o atendimento remoto e pedir o presencial.',
   'Em doenças crônicas ou que exigem seguimento prolongado, deve haver consulta presencial em intervalos de no máximo 180 dias.',
   'Consentimento livre e esclarecido do paciente ou do representante, com registro.',
   'Registro completo em prontuário, com data, hora e tecnologia usada.',
   'O médico deve estar inscrito no conselho regional; empresas que prestam o serviço precisam de sede no país e diretor técnico médico.',
   'Teletriagem não é consulta: não fecha diagnóstico nem prescreve tratamento definitivo; direciona.']},
  {h:'O que funciona bem e o que não funciona',table:{head:['Adequado ao remoto','Exige presencial'],rows:[
   ['Seguimento de doença crônica estável','Sinais de alarme ou instabilidade'],
   ['Revisão de exames e ajuste de medicação','Necessidade de exame físico que muda a conduta'],
   ['Queixas leves com história clara','Dor torácica, dispneia, déficit neurológico, dor abdominal intensa'],
   ['Saúde mental em acompanhamento, sem risco agudo','Risco de suicídio ou de violência'],
   ['Orientação, educação e renovação de receita','Procedimentos, vacinas, coleta'],
   ['Triagem para definir o nível de atenção','Paciente sem privacidade, com barreira de comunicação ou de tecnologia que impeça avaliação segura']]}},
  {h:'Sinais de alarme na consulta remota',list:[
   'Dor torácica, falta de ar, cianose, fala entrecortada.',
   'Rebaixamento de consciência, confusão, convulsão, déficit focal, cefaleia súbita e intensa.',
   'Sangramento importante, desidratação, vômitos incoercíveis.',
   'Febre com rigidez de nuca, manchas na pele ou imunossupressão.',
   'Dor abdominal intensa ou em gestante; redução de movimentos fetais.',
   'Ideação suicida com plano.',
   'Criança pequena hipoativa ou que não aceita líquidos.'],
   after:'Diante de alarme: interromper a rotina da consulta, confirmar o endereço, orientar serviço de urgência ou acionar o atendimento móvel, e manter contato até a chegada do socorro quando possível.'}
 ],
 flow:{title:'Decidir a modalidade do atendimento',nodes:[
  {k:'start',t:'Pedido de atendimento a distância'},
  {k:'do',t:'Confirmar identidade, local onde o paciente está, telefone de retorno e consentimento'},
  {k:'ask',t:'Há sinal de alarme?',yes:'Urgência: orientar serviço presencial ou acionar socorro; registrar',no:'Seguir'},
  {k:'ask',t:'O exame físico ou um procedimento é indispensável para decidir?',yes:'Agendar presencial em prazo compatível',no:'Seguir'},
  {k:'ask',t:'Há privacidade e condições técnicas para uma avaliação segura?',yes:'Realizar a teleconsulta',no:'Remarcar ou converter em presencial'},
  {k:'do',t:'Registrar em prontuário; prescrever e pedir exames por meio eletrônico válido'},
  {k:'ask',t:'Doença crônica em seguimento?',yes:'Garantir consulta presencial em até 180 dias',no:'Combinar retorno e sinais de alerta'},
  {k:'end',t:'Encerrar com plano claro e canal para intercorrências'}]},
 reasoning:[
  'A pergunta não é "posso atender a distância?", e sim "consigo decidir com segurança sem examinar?".',
  'Quando a dúvida persistir, converta em presencial.',
  'A responsabilidade é a mesma do consultório.',
  'Triagem direciona; consulta decide.',
  'Pergunte onde o paciente está no início: você pode precisar mandar ajuda.'],
 mnemonics:[
  {n:'180 dias',t:'Intervalo máximo entre consultas presenciais no seguimento prolongado.'},
  {n:'ICAR',t:'Identidade, Consentimento, Alarme e Registro: o que não pode faltar.'},
  {n:'Autonomia dos dois lados',t:'Médico pode exigir presencial; paciente pode recusar o remoto.'},
  {n:'Triagem não trata',t:'Teletriagem só direciona.'}],
 pitfalls:[
  'Manter a consulta remota diante de sinal de alarme.',
  'Não registrar o consentimento.',
  'Acompanhar doença crônica por tempo indefinido sem consulta presencial.',
  'Tratar teletriagem como consulta.',
  'Atender sem saber onde o paciente está.',
  'Achar que a responsabilidade é menor por ser a distância.'],
 recall:[
  {q:'Paciente hipertenso estável pede renovação de receita por vídeo; a última consulta presencial foi há 8 meses. O que fazer?',a:'A teleconsulta pode ser feita, mas é preciso agendar avaliação presencial, pois o intervalo máximo de 180 dias no seguimento prolongado foi ultrapassado.'},
  {q:'Durante teleconsulta, homem de 58 anos relata dor no peito em aperto há 40 minutos, com sudorese. Conduta?',a:'Interromper a consulta de rotina, confirmar o endereço, acionar o atendimento móvel de urgência, orientar repouso e manter contato; registrar tudo.'},
  {q:'A primeira consulta pode ser por telemedicina?',a:'Sim. A norma permite, cabendo ao médico julgar se a modalidade é adequada ao caso e indicar o presencial quando necessário.'},
  {q:'Qual a diferença entre teleinterconsulta e teleconsultoria?',a:'A teleinterconsulta é a discussão de um caso entre médicos para apoio diagnóstico ou terapêutico. A teleconsultoria é orientação mais ampla a profissionais ou gestores sobre condutas e processos de trabalho.'},
  {q:'O paciente pode recusar a teleconsulta?',a:'Sim. Tem direito ao atendimento presencial.'}],
 practice:[
  'Comece toda teleconsulta confirmando nome completo, data de nascimento e localização.',
  'Tenha um roteiro de sinais de alarme por queixa.',
  'Termine dizendo o que fazer se piorar e em quanto tempo retornar.'],
 refs:[
  {t:'Conselho Federal de Medicina. Resolução CFM 2.314, de 20 de abril de 2022: define e regulamenta a telemedicina.',u:'https://portal.cfm.org.br/'},
  {t:'Brasil. Lei 14.510, de 27 de dezembro de 2022: autoriza e disciplina a prática da telessaúde em todo o território nacional.',u:'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14510.htm'}],
 note:'Resumo didático das normas. Confira a redação vigente nos textos oficiais antes de usar como referência normativa.'
},
'p1tele_1':{
 updated:'2026-11',
 pretest:['Dado de saúde é que tipo de dado pela LGPD?','O sigilo médico termina com a morte do paciente?','Por quanto tempo o prontuário deve ser guardado?','Que tipo de assinatura vale para receita de medicamento controlado em meio eletrônico?'],
 sections:[
  {h:'Sigilo médico',p:[
   'O sigilo é dever do médico e direito do paciente. O Código de Ética Médica proíbe revelar fato de que se tenha conhecimento pelo exercício da profissão. O dever permanece mesmo que o fato seja público e mesmo depois da morte do paciente.'],
   list:[
   'Exceções: motivo justo, dever legal (como a notificação compulsória de doenças e de violência) e consentimento por escrito do paciente.',
   'Ao depor como testemunha, o médico comparece e declara seu impedimento.',
   'Menor de idade com capacidade de discernimento tem direito ao sigilo, inclusive perante os pais, salvo quando o silêncio puder causar dano.',
   'O prontuário pertence ao paciente; a instituição e o médico são responsáveis pela guarda. O paciente tem direito a cópia.',
   'Na telemedicina, o sigilo se estende ao ambiente: quem está na sala, do lado do médico e do lado do paciente.']},
  {h:'LGPD no cuidado em saúde',p:[
   'A Lei Geral de Proteção de Dados (Lei 13.709 de 2018) classifica o dado de saúde como dado pessoal sensível, com proteção reforçada. Todo tratamento (coleta, uso, armazenamento, compartilhamento) precisa de base legal e deve respeitar os princípios da lei.'],
   table:{head:['Conceito','Aplicação'],rows:[
    ['Base legal','Consentimento específico e destacado, ou hipóteses sem consentimento, como tutela da saúde em procedimento feito por profissionais e serviços de saúde, cumprimento de obrigação legal e proteção da vida'],
    ['Finalidade e necessidade','Usar o dado só para o fim informado e coletar o mínimo necessário'],
    ['Segurança','Medidas técnicas e administrativas contra acesso não autorizado, perda e vazamento'],
    ['Direitos do titular','Acesso, correção, informação sobre compartilhamento e, quando cabível, eliminação'],
    ['Agentes','Controlador decide sobre o tratamento; operador executa; encarregado faz a ponte com o titular e a autoridade nacional'],
    ['Incidente','Vazamento com risco relevante deve ser comunicado à autoridade nacional e aos titulares']]},
   after:'É vedado compartilhar dados de saúde entre empresas para obter vantagem econômica, com as exceções previstas em lei. Operadoras de planos não podem usar esses dados para selecionar riscos.'},
  {h:'Prontuário eletrônico',list:[
   'O prontuário é documento único, com identificação, anamnese, exame, hipóteses, condutas, evolução e prescrições, datadas e assinadas.',
   'A Lei 13.787 de 2018 permite digitalizar e usar sistemas informatizados, desde que garantam integridade, autenticidade e confidencialidade.',
   'Prazo mínimo de guarda: 20 anos a partir do último registro.',
   'Sistemas de registro eletrônico devem atender a requisitos de segurança definidos em norma, com controle de acesso por usuário, trilha de auditoria e cópia de segurança.',
   'Acesso individual: senha não se compartilha. Cada acesso fica registrado.',
   'Na teleconsulta, registrar data, hora, tecnologia usada, consentimento e os dados clínicos como em qualquer consulta.']},
  {h:'Consentimento na telemedicina',list:[
   'O paciente, ou seu representante, deve autorizar o atendimento remoto e a transmissão de seus dados e imagens.',
   'Deve ser informado sobre as limitações do exame a distância e sobre o direito de optar pelo presencial.',
   'A autorização fica registrada no prontuário.',
   'Gravação da consulta exige autorização específica.',
   'Compartilhar o caso com outro profissional (teleinterconsulta) exige cuidado com a identificação e, em regra, concordância do paciente.']},
  {h:'Documentos médicos eletrônicos',list:[
   'Receitas, atestados, relatórios e pedidos de exame podem ser emitidos em meio eletrônico, com identificação do médico e assinatura eletrônica válida.',
   'Receitas de antimicrobianos e de medicamentos sujeitos a controle especial exigem assinatura eletrônica qualificada, com certificado digital no padrão ICP-Brasil.',
   'Notificações de receita em talonário próprio seguem regras específicas da vigilância sanitária; confirme a norma vigente antes de prescrever a distância.',
   'O documento deve poder ser validado pelo farmacêutico e por quem o recebe.']},
  {h:'Boas práticas de segurança',list:[
   'Usar plataformas próprias para saúde, com criptografia; evitar aplicativos pessoais de mensagem para dados clínicos.',
   'Não enviar exames e fotos de pacientes a grupos.',
   'Bloquear a tela, usar autenticação em dois fatores e redes confiáveis.',
   'Atender em ambiente reservado, com fone de ouvido.',
   'Fotografias de lesões: só com consentimento, sem identificação desnecessária, armazenadas no prontuário e apagadas do aparelho pessoal.']}
 ],
 flow:{title:'Antes de registrar ou compartilhar um dado de saúde',nodes:[
  {k:'start',t:'Dado clínico a registrar, armazenar ou compartilhar'},
  {k:'ask',t:'O uso é necessário para o cuidado deste paciente?',yes:'Seguir',no:'Não coletar nem compartilhar'},
  {k:'ask',t:'Há base legal? (tutela da saúde, obrigação legal ou consentimento)',yes:'Seguir',no:'Obter consentimento específico ou não tratar o dado'},
  {k:'ask',t:'Quem vai receber precisa mesmo saber e tem dever de sigilo?',yes:'Compartilhar o mínimo necessário por canal seguro',no:'Não compartilhar'},
  {k:'do',t:'Registrar no prontuário com data, hora e identificação'},
  {k:'ask',t:'Houve acesso indevido, perda ou vazamento?',yes:'Comunicar o encarregado e a instituição; avaliar notificação à autoridade e aos titulares',no:'Seguir'},
  {k:'end',t:'Guardar por no mínimo 20 anos, com controle de acesso'}]},
 reasoning:[
  'Pergunte-se: este dado é necessário, para este fim, para esta pessoa?',
  'Consentimento não é a única base legal; no cuidado direto, a tutela da saúde costuma bastar.',
  'O que não está no prontuário não foi feito; o que está em aplicativo pessoal não está protegido.',
  'Familiar não tem acesso automático às informações de paciente capaz.',
  'Notificação compulsória não é quebra de sigilo: é dever legal.'],
 mnemonics:[
  {n:'Saúde = Sensível',t:'Dado de saúde é dado pessoal sensível.'},
  {n:'20 anos',t:'Guarda mínima do prontuário.'},
  {n:'Sigilo cai por JDC',t:'Justo motivo, Dever legal e Consentimento.'},
  {n:'Controlado pede certificado',t:'Assinatura qualificada para controle especial e antimicrobianos.'}],
 pitfalls:[
  'Discutir caso identificado em grupo de mensagens.',
  'Emprestar senha do prontuário.',
  'Entregar informações a familiar sem autorização de paciente capaz.',
  'Gravar a consulta sem autorização.',
  'Guardar fotos de pacientes no celular pessoal.',
  'Achar que o sigilo acaba quando o paciente morre.'],
 recall:[
  {q:'A filha de um paciente lúcido de 70 anos liga pedindo o resultado da biópsia. O que fazer?',a:'Não informar sem autorização do paciente. O sigilo pertence a ele; pode-se pedir que ele autorize ou participe da conversa.'},
  {q:'Qual a base legal para registrar dados de saúde na consulta sem termo de consentimento específico da LGPD?',a:'A tutela da saúde em procedimento realizado por profissional ou serviço de saúde, além do cumprimento de obrigação legal de manter prontuário.'},
  {q:'Por quanto tempo guardar o prontuário e o que a lei exige do meio digital?',a:'No mínimo 20 anos após o último registro, em sistema que garanta integridade, autenticidade e confidencialidade.'},
  {q:'O que é necessário para uma receita eletrônica de antimicrobiano ser válida?',a:'Identificação do prescritor e assinatura eletrônica qualificada, com certificado digital ICP-Brasil, verificável pela farmácia.'},
  {q:'Um notebook com dados de pacientes foi furtado. Qual a conduta?',a:'Comunicar imediatamente a instituição e o encarregado de dados, avaliar o risco e notificar a autoridade nacional e os titulares quando houver risco relevante, além de adotar medidas de contenção.'}],
 practice:[
  'Antes de enviar algo, pergunte: preciso identificar o paciente nesta mensagem?',
  'Use a plataforma da instituição, não a sua conta pessoal.',
  'Registre o consentimento em uma linha no início da evolução.'],
 refs:[
  {t:'Brasil. Lei 13.709, de 14 de agosto de 2018: Lei Geral de Proteção de Dados Pessoais.',u:'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm'},
  {t:'Brasil. Lei 13.787, de 27 de dezembro de 2018: digitalização e utilização de sistemas informatizados para guarda de prontuário.',u:'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13787.htm'},
  {t:'Conselho Federal de Medicina. Código de Ética Médica: Resolução CFM 2.217 de 2018.',u:'https://portal.cfm.org.br/'}],
 note:'Resumo didático. Não substitui a leitura das normas nem orientação jurídica. Regras sobre receituário eletrônico mudam com frequência.'
},
'p1tele_2':{
 updated:'2026-11',
 pretest:['O que confirmar nos primeiros dois minutos de uma teleconsulta?','Como compensar a falta do exame físico?','O que é uma rede de segurança e o que ela deve conter?','O que fazer se a conexão cair durante um atendimento com sinais de gravidade?'],
 sections:[
  {h:'Por que a comunicação pesa mais a distância',p:[
   'Sem o exame físico e sem boa parte da linguagem corporal, a anamnese precisa carregar mais informação, e os mal-entendidos custam mais caro. Uma consulta remota segura tem estrutura fixa: abertura com checagens, coleta dirigida, exame possível, decisão explícita sobre a necessidade de presencial e fechamento com plano verificado.']},
  {h:'Abertura: checagens obrigatórias',list:[
   'Identificar-se e confirmar a identidade do paciente com dois dados.',
   'Perguntar onde o paciente está e confirmar um telefone para retorno.',
   'Verificar som, imagem e privacidade dos dois lados; perguntar quem mais está no ambiente.',
   'Explicar como será a consulta e obter o consentimento.',
   'Combinar o que fazer se a ligação cair.']},
  {h:'Coleta e exame possível',list:[
   'Perguntas abertas no início e escuta sem interrupção; depois, perguntas dirigidas para sinais de alarme.',
   'Frases curtas, uma pergunta de cada vez, pausas maiores por causa do atraso do áudio.',
   'Olhar para a câmera ao falar; avisar quando for digitar ou consultar a tela.',
   '<strong>Inspeção guiada:</strong> estado geral, padrão respiratório, fala em frases completas, cor da pele, lesões mostradas à câmera com boa luz.',
   '<strong>Manobras orientadas:</strong> contar a frequência respiratória, palpar o próprio abdome, mover uma articulação, andar pela sala.',
   '<strong>Medidas em casa:</strong> pressão, temperatura, oximetria, glicemia, peso. Pedir que mostre o visor.',
   'Apoio de familiar ou de profissional presente com o paciente, quando houver.',
   'Ter clareza do que não foi possível avaliar e registrar essa limitação.']},
  {h:'Decisão e fechamento',list:[
   'Dizer em voz alta a conclusão: o que você acha que é, o que não parece ser e o grau de certeza.',
   'Declarar se a consulta remota foi suficiente ou se é preciso avaliação presencial, e em que prazo.',
   '<strong>Técnica de devolução:</strong> pedir que o paciente repita, com as próprias palavras, o que entendeu e o que vai fazer.',
   'Enviar o plano por escrito, com doses e horários.',
   '<strong>Rede de segurança:</strong> quais sintomas indicam piora, o que fazer se aparecerem, aonde ir e em quanto tempo, e quando será o retorno.',
   'Perguntar se ficou alguma dúvida ou preocupação não abordada.']},
  {h:'Segurança do paciente',table:{head:['Risco','Barreira'],rows:[
   ['Paciente errado','Dois identificadores no início'],
   ['Deixar passar gravidade','Roteiro de sinais de alarme por queixa; limiar baixo para converter em presencial'],
   ['Erro de medicação','Rever a lista de remédios em uso, alergias e função renal; enviar prescrição legível e validável'],
   ['Perda de seguimento','Retorno agendado antes de encerrar; responsável definido pelos exames pendentes'],
   ['Queda de conexão','Plano combinado: quem liga para quem; telefone de retorno'],
   ['Vazamento de informação','Ambiente reservado, plataforma segura']]},
   after:'Se a conexão cair em caso com sinais de gravidade: ligar de volta imediatamente pelo telefone confirmado; sem contato, acionar o serviço de urgência para o endereço informado e registrar as tentativas.'},
  {h:'Continuidade do cuidado',list:[
   'Registrar a consulta no mesmo prontuário usado no presencial, para que a equipe veja a evolução.',
   'Definir quem acompanha os resultados de exames e como o paciente será avisado.',
   'Comunicar-se com a atenção primária e com os demais profissionais quando houver mudança de conduta.',
   'Combinar o canal para dúvidas e deixar claro que ele não serve para urgências.',
   'Intercalar consultas presenciais no seguimento prolongado.',
   'Atenção a quem tem mais dificuldade com a tecnologia: idosos, pessoas com deficiência auditiva ou visual, baixa escolaridade ou sem internet estável. Oferecer alternativa presencial para que o remoto não aumente a desigualdade.']}
 ],
 flow:{title:'Roteiro de uma teleconsulta segura',nodes:[
  {k:'start',t:'Início da chamada'},
  {k:'do',t:'Identidade com dois dados, localização, telefone de retorno, privacidade e consentimento'},
  {k:'do',t:'Motivo da consulta com pergunta aberta; depois, sinais de alarme da queixa'},
  {k:'ask',t:'Sinal de alarme presente?',yes:'Encaminhar para urgência ou acionar socorro; permanecer em contato',no:'Seguir'},
  {k:'do',t:'Exame possível: inspeção guiada, manobras orientadas e medidas em casa'},
  {k:'ask',t:'A informação obtida basta para decidir com segurança?',yes:'Definir conduta e explicar',no:'Converter em presencial, com prazo'},
  {k:'do',t:'Pedir que o paciente repita o plano; enviar por escrito; combinar rede de segurança e retorno'},
  {k:'end',t:'Registrar no prontuário, incluindo limitações e orientações dadas'}]},
 reasoning:[
  'Fale menos e confirme mais.',
  'O que você não conseguiu avaliar é tão importante quanto o que avaliou: registre.',
  'Paciente que não consegue completar uma frase está com dispneia importante, qualquer que seja a oximetria informada.',
  'Se o plano não foi repetido pelo paciente, você não sabe se foi entendido.',
  'Rede de segurança vaga ("qualquer coisa, volte") não protege ninguém.'],
 mnemonics:[
  {n:'ILPC',t:'Identidade, Localização, Privacidade e Consentimento na abertura.'},
  {n:'Olhe, Oriente, Meça',t:'Inspeção guiada, manobras orientadas e medidas em casa.'},
  {n:'Repita para mim',t:'A técnica de devolução.'},
  {n:'Rede de segurança: O quê, Quando, Onde',t:'Quais sintomas, em quanto tempo e aonde ir.'}],
 pitfalls:[
  'Começar pela queixa sem confirmar identidade e localização.',
  'Fazer várias perguntas de uma vez.',
  'Não deixar claro que a avaliação teve limites.',
  'Encerrar sem verificar a compreensão.',
  'Dar orientações de piora genéricas.',
  'Não agendar o retorno nem definir quem verá os exames.'],
 recall:[
  {q:'O que deve ser confirmado na abertura de toda teleconsulta?',a:'Identidade do paciente com dois dados, local onde está, telefone de retorno, condições de som e imagem, privacidade e consentimento, além do combinado para queda de conexão.'},
  {q:'Como avaliar dispneia por vídeo?',a:'Observar se fala frases completas, o uso de musculatura acessória e a cor dos lábios; contar a frequência respiratória; pedir oximetria com o visor à mostra; testar tolerância a pequenos esforços. Se houver dúvida, avaliação presencial.'},
  {q:'O que é a técnica de devolução?',a:'Pedir ao paciente que explique com as próprias palavras o diagnóstico e o plano, para confirmar o entendimento e corrigir falhas.'},
  {q:'Componha uma rede de segurança para lombalgia sem sinais de alarme.',a:'Procurar atendimento presencial no mesmo dia se surgir fraqueza nas pernas, dormência na região genital, perda de controle de urina ou fezes ou febre; retornar em 7 dias se a dor não melhorar; canal para dúvidas não urgentes.'},
  {q:'A chamada cai enquanto o paciente descrevia falta de ar intensa. O que fazer?',a:'Ligar imediatamente para o telefone confirmado no início; sem resposta, acionar o serviço móvel de urgência para o endereço informado e registrar horários e tentativas.'}],
 practice:[
  'Use um roteiro de abertura até que ele vire hábito.',
  'Reserve os últimos minutos só para o fechamento.',
  'Releia a prescrição em voz alta antes de enviar.'],
 refs:[
  {t:'Conselho Federal de Medicina. Resolução CFM 2.314, de 20 de abril de 2022: define e regulamenta a telemedicina.',u:'https://portal.cfm.org.br/'},
  {t:'Greenhalgh T, et al. Video consultations for covid-19. BMJ. 2020.',q:'Greenhalgh Video consultations for covid-19 BMJ 2020'},
  {t:'Neighbour R. Safety netting: now doctors need it too. Br J Gen Pract. 2018.',q:'Neighbour Safety netting now doctors need it too Br J Gen Pract 2018'}],
 note:'Síntese de boas práticas de comunicação clínica remota e da norma brasileira.'
}
});
