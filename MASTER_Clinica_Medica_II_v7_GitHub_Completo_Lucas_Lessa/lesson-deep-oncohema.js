/* Estudo aprofundado · Emergências onco-hematológicas e neoplasias hematológicas (P2). Texto original. */
LessonDeep.add({
'onco_0':{
 updated:'2026-11',
 pretest:['Quais valores de temperatura e de neutrófilos definem neutropenia febril?','Em quanto tempo o antibiótico deve ser iniciado?','Quando a vancomicina entra no esquema inicial?','Febre que persiste após 4 a 7 dias de antibiótico de amplo espectro: qual o próximo passo?'],
 sections:[
  {h:'Por que é emergência',p:[
   'O neutrófilo é a primeira linha de defesa contra bactérias e fungos. Sem ele, a infecção progride em horas e quase sem sinais: não há pus, o infiltrado pulmonar pode não aparecer, a urina pode não ter leucócitos. A febre costuma ser o único aviso. Somam-se a isso a mucosite, que abre a barreira intestinal a bacilos gram-negativos, e os cateteres, que abrem a pele a gram-positivos.',
   'Antes da antibioticoterapia empírica imediata, a mortalidade da bacteremia por gram-negativos nesses pacientes era muito alta. Daí a regra: tratar primeiro, investigar junto.']},
  {h:'Definição',list:[
   'Febre: temperatura oral de 38,3 °C ou mais em medida única, ou de 38,0 °C ou mais sustentada por uma hora.',
   'Neutropenia: neutrófilos abaixo de 500 por microlitro, ou previsão de queda abaixo de 500 nas próximas 48 horas.',
   'Neutropenia profunda: abaixo de 100 por microlitro.',
   'Paciente neutropênico sem febre, mas com hipotensão, calafrios ou deterioração clínica, é tratado da mesma forma. Corticoide pode mascarar a febre.']},
  {h:'Avaliação inicial sem atrasar o antibiótico',list:[
   'Exame físico dirigido: pele, cateter, boca, períneo (inspeção, sem toque retal), pulmões, abdome.',
   'Duas amostras de hemocultura: de cada lúmen do cateter e de veia periférica.',
   'Hemograma, função renal e hepática, eletrólitos, lactato.',
   'Urocultura e outras culturas conforme o foco; radiografia ou tomografia de tórax se houver sintoma respiratório.',
   'Primeira dose do antibiótico em até 60 minutos da chegada.']},
  {h:'Estratificação de risco',table:{head:['','Baixo risco','Alto risco'],rows:[
   ['Escore MASCC','21 ou mais','Abaixo de 21'],
   ['Neutropenia esperada','Curta, até 7 dias','Longa, mais de 7 dias, ou profunda'],
   ['Doença de base','Tumor sólido em quimioterapia convencional','Leucemia aguda em indução, transplante'],
   ['Clínica','Estável, sem comorbidade descompensada','Hipotensão, pneumonia, dor abdominal nova, alteração neurológica, mucosite grave'],
   ['Local e via','Pode ser ambulatorial, por via oral, se houver suporte e retorno fácil','Internação e antibiótico intravenoso']]},
   after:'Esquema oral clássico para baixo risco: ciprofloxacino com amoxicilina-clavulanato. Não usar se o paciente fazia profilaxia com quinolona.'},
  {h:'Antibiótico empírico no alto risco',list:[
   'Monoterapia com betalactâmico antipseudomonas: cefepima, piperacilina-tazobactam ou carbapenêmico (meropenem). A escolha segue o perfil de resistência do hospital.',
   '<strong>Associar vancomicina só se houver:</strong> instabilidade hemodinâmica, pneumonia, infecção de pele ou de cateter, colonização por estafilococo resistente, hemocultura com coco gram-positivo ainda não identificado, ou mucosite grave em quem usava quinolona profilática.',
   'Ampliar a cobertura para gram-negativos resistentes se houver colonização prévia ou choque.',
   'Cobertura para anaeróbios se houver suspeita de foco abdominal (enterocolite neutropênica), perianal ou sinusite.']},
  {h:'Febre persistente',p:[
   'Reavaliar todos os dias. Febre que continua por 4 a 7 dias com neutropenia prolongada, sem foco definido, levanta a suspeita de infecção fúngica invasiva.'],
   list:[
   'Tomografia de tórax e de seios da face; galactomanana sérica.',
   'Antifúngico empírico: equinocandina, anfotericina lipossomal ou voriconazol, conforme a suspeita.',
   'Aspergilose: nódulos com halo em vidro fosco na tomografia; voriconazol é a escolha.',
   'Candidemia: retirar o cateter e fazer fundo de olho.',
   'Não trocar o antibiótico apenas porque a febre persiste em paciente estável sem novos achados.']},
  {h:'Duração e medidas associadas',list:[
   'Infecção documentada: tratar pelo tempo próprio daquela infecção e, no mínimo, até a recuperação dos neutrófilos acima de 500.',
   'Febre sem foco: manter até neutrófilos acima de 500 e pelo menos 48 horas sem febre.',
   'Fator estimulador de colônias: não é rotina no tratamento; é usado como profilaxia em esquemas com risco de neutropenia febril de 20% ou mais.',
   'Enterocolite neutropênica: dor em fossa ilíaca direita, espessamento do ceco na tomografia; antibiótico com cobertura para anaeróbios, repouso intestinal e avaliação cirúrgica se complicar.']}
 ],
 flow:{title:'Febre no paciente em quimioterapia',nodes:[
  {k:'start',t:'Febre em paciente que recebeu quimioterapia nas últimas semanas'},
  {k:'do',t:'Tratar como neutropenia febril até o hemograma chegar: sinais vitais, culturas, acesso'},
  {k:'do',t:'Betalactâmico antipseudomonas em até 60 minutos'},
  {k:'ask',t:'Choque, pneumonia, infecção de cateter ou de pele?',yes:'Associar vancomicina e ampliar para gram-negativo resistente se instável',no:'Monoterapia'},
  {k:'ask',t:'Neutrófilos abaixo de 500 confirmados e escore de baixo risco, com suporte em casa?',yes:'Considerar via oral e seguimento ambulatorial após observação',no:'Internar'},
  {k:'ask',t:'Febre persiste após 4 a 7 dias?',yes:'Tomografias, galactomanana e antifúngico empírico',no:'Manter até recuperar neutrófilos e ficar 48 horas sem febre'},
  {k:'end',t:'Ajustar pelo resultado das culturas e planejar profilaxia no próximo ciclo'}]},
 reasoning:[
  'O nadir dos neutrófilos costuma ocorrer entre 7 e 14 dias após a quimioterapia: pergunte a data do último ciclo.',
  'Ausência de sinais inflamatórios não significa ausência de infecção.',
  'Vancomicina não é rotina: usá-la sem indicação aumenta toxicidade renal e resistência.',
  'Dor abdominal em neutropênico é enterocolite até prova em contrário.',
  'Cateter com hiperemia ou dor é foco provável.'],
 mnemonics:[
  {n:'38,3 uma vez; 38,0 por uma hora',t:'As duas formas de definir a febre.'},
  {n:'500 e 60',t:'Menos de 500 neutrófilos, antibiótico em 60 minutos.'},
  {n:'MASCC 21',t:'A partir de 21, baixo risco.'},
  {n:'Vanco só com PICC-H',t:'Pneumonia, Instabilidade, Cateter, Cutânea e Hemocultura com gram-positivo.'}],
 pitfalls:[
  'Esperar o hemograma ou o raio X para iniciar o antibiótico.',
  'Fazer toque retal ou usar supositório.',
  'Usar ceftriaxona, que não cobre Pseudomonas.',
  'Associar vancomicina em todo paciente.',
  'Suspender o antibiótico porque as culturas vieram negativas, com o paciente ainda neutropênico e febril.',
  'Esquecer infecção fúngica na febre prolongada.'],
 recall:[
  {q:'Mulher com leucemia aguda, 10 dias após quimioterapia, febre de 38,5 °C, pressão de 80 por 50 mmHg. Hemograma ainda não saiu. O que fazer nos primeiros 60 minutos?',a:'Ressuscitação volêmica, hemoculturas periféricas e do cateter, betalactâmico antipseudomonas imediatamente, com vancomicina pela instabilidade e ampliação para gram-negativos resistentes conforme o perfil local.'},
  {q:'Quais são as indicações de vancomicina no esquema inicial?',a:'Instabilidade hemodinâmica, pneumonia, infecção de pele e partes moles ou de cateter, colonização por estafilococo resistente, hemocultura com gram-positivo não identificado e mucosite grave com uso prévio de quinolona.'},
  {q:'Paciente com tumor sólido, estável, escore MASCC de 23. Qual a opção?',a:'Baixo risco: antibiótico oral (ciprofloxacino com amoxicilina-clavulanato) e seguimento ambulatorial, se tiver acesso rápido ao serviço e não usava quinolona.'},
  {q:'Sexto dia de meropenem, febre persiste, tosse seca. Tomografia com nódulos com halo. Conduta?',a:'Aspergilose pulmonar invasiva provável. Iniciar voriconazol, dosar galactomanana e considerar broncoscopia.'},
  {q:'Quando suspender o antibiótico na febre sem foco?',a:'Quando os neutrófilos passarem de 500 e o paciente estiver sem febre por pelo menos 48 horas.'}],
 practice:[
  'Oriente todo paciente em quimioterapia a ter termômetro e a procurar o serviço com febre, sem tomar antitérmico antes.',
  'Deixe o esquema antibiótico padronizado na emergência, com a meta de 60 minutos.',
  'Examine boca, cateter e períneo com cuidado: são os focos que passam.'],
 refs:[
  {t:'Freifeld AG, et al. Clinical practice guideline for the use of antimicrobial agents in neutropenic patients with cancer: 2010 update by the IDSA. Clin Infect Dis. 2011.',q:'Clinical practice guideline use of antimicrobial agents neutropenic patients cancer 2010 update Freifeld'},
  {t:'Klastersky J, et al. The Multinational Association for Supportive Care in Cancer risk index. J Clin Oncol. 2000.',q:'Multinational Association for Supportive Care in Cancer risk index febrile neutropenic Klastersky 2000'},
  {t:'Taplitz RA, et al. Outpatient management of fever and neutropenia in adults treated for malignancy: ASCO and IDSA clinical practice guideline update. J Clin Oncol. 2018.',q:'Outpatient management of fever and neutropenia adults treated for malignancy ASCO IDSA Taplitz 2018'}],
 note:'Síntese das diretrizes norte-americanas. A escolha do antibiótico depende do perfil de resistência local.'
},
'onco_1':{
 updated:'2026-11',
 pretest:['Quais quatro alterações laboratoriais compõem a síndrome?','Por que o cálcio cai?','Em que paciente a rasburicase é contraindicada?','Deve-se alcalinizar a urina?'],
 sections:[
  {h:'Do tumor ao rim',p:[
   'Quando muitas células tumorais morrem ao mesmo tempo, seu conteúdo cai na circulação: potássio, fosfato e ácidos nucleicos. Os ácidos nucleicos são convertidos em ácido úrico. O fosfato em excesso se liga ao cálcio e precipita, o que derruba o cálcio sérico. Cristais de ácido úrico e de fosfato de cálcio se depositam nos túbulos renais e causam lesão renal aguda, que por sua vez piora a retenção de potássio e fosfato. É um ciclo que se alimenta.',
   'Pode ser espontânea, em tumores de crescimento muito rápido, ou ocorrer de horas a dias após o início do tratamento.']},
  {h:'Definição de Cairo e Bishop',table:{head:['Tipo','Critério'],rows:[
   ['Laboratorial','Duas ou mais alterações entre 3 dias antes e 7 dias depois do início do tratamento: ácido úrico de 8 mg/dL ou mais, potássio de 6 mEq/L ou mais, fósforo de 4,5 mg/dL ou mais, cálcio de 7 mg/dL ou menos, ou variação de 25% em relação ao basal'],
   ['Clínica','Critério laboratorial mais um de: creatinina de 1,5 vez o limite superior ou mais, arritmia ou morte súbita, ou convulsão']]}},
  {h:'Quem tem risco',table:{head:['Risco','Exemplos'],rows:[
   ['Alto','Linfoma de Burkitt, linfoma linfoblástico, leucemia linfoide aguda e mieloide aguda com leucócitos muito elevados, doença volumosa com DHL alta'],
   ['Intermediário','Linfoma difuso de grandes células B, leucemias agudas com contagem menor, leucemia linfocítica crônica em tratamento com venetoclax'],
   ['Baixo','Maioria dos tumores sólidos, mieloma, linfomas indolentes']]},
   after:'Aumentam o risco: doença renal prévia, desidratação, ácido úrico já elevado, tumor volumoso e muito sensível ao tratamento.'},
  {h:'Prevenção: o que realmente importa',list:[
   '<strong>Hidratação vigorosa:</strong> 2 a 3 litros por metro quadrado ao dia, com meta de diurese alta. É a medida mais importante. Cuidado no cardiopata e no renal.',
   '<strong>Alopurinol:</strong> bloqueia a formação de ácido úrico novo. Não remove o que já existe. Indicado no risco intermediário, iniciado 1 a 2 dias antes.',
   '<strong>Rasburicase:</strong> degrada o ácido úrico em alantoína, solúvel. Age em horas. Indicada no alto risco e na hiperuricemia estabelecida. Contraindicada na deficiência de G6PD, pelo risco de hemólise e metemoglobinemia.',
   '<strong>Não alcalinizar a urina:</strong> aumenta a precipitação de fosfato de cálcio.',
   'Suspender fármacos nefrotóxicos e que elevam potássio. Evitar contraste.',
   'Monitorar eletrólitos, ácido úrico, creatinina e DHL a cada 4 a 6 horas no alto risco.']},
  {h:'Tratamento da síndrome instalada',table:{head:['Problema','Conduta'],rows:[
   ['Hipercalemia','ECG e monitor. Gluconato de cálcio se houver alteração no ECG; insulina com glicose, beta-agonista inalatório; diurético de alça se houver diurese; diálise se refratária'],
   ['Hiperfosfatemia','Hidratação, restrição de fósforo, quelantes; diálise se grave'],
   ['Hipocalcemia','Tratar só se sintomática (tetania, convulsão, arritmia). Repor em assintomático favorece precipitação com o fosfato'],
   ['Hiperuricemia','Rasburicase'],
   ['Lesão renal aguda','Manter volume; diálise precoce se oligúria, sobrecarga de volume ou distúrbio refratário']]}},
  {h:'Indicações de diálise',list:[
   'Hipercalemia refratária.',
   'Hiperfosfatemia grave com hipocalcemia sintomática.',
   'Sobrecarga de volume ou oligúria apesar das medidas.',
   'Uremia sintomática ou acidose grave.']}
 ],
 flow:{title:'Paciente que vai iniciar quimioterapia',nodes:[
  {k:'start',t:'Neoplasia hematológica ou tumor volumoso com tratamento programado'},
  {k:'do',t:'Dosar potássio, fósforo, cálcio, ácido úrico, creatinina e DHL'},
  {k:'ask',t:'Alto risco ou ácido úrico já elevado?',yes:'Hidratação vigorosa e rasburicase (checar G6PD)',no:'Hidratação e alopurinol no risco intermediário; observação no baixo'},
  {k:'do',t:'Repetir os exames a cada 4 a 6 horas nas primeiras 48 a 72 horas no alto risco'},
  {k:'ask',t:'Duas ou mais alterações laboratoriais?',yes:'Síndrome laboratorial: intensificar, monitor cardíaco, terapia intensiva se progredir',no:'Manter prevenção'},
  {k:'ask',t:'Creatinina subindo, arritmia ou convulsão?',yes:'Síndrome clínica: tratar distúrbios e avaliar diálise',no:'Seguir monitorando'},
  {k:'end',t:'Manter até 7 dias após o tratamento ou até normalizar'}]},
 reasoning:[
  'Três sobem e um desce: potássio, fósforo e ácido úrico sobem; cálcio desce.',
  'O que mata rápido é o potássio; o que lesa o rim são os cristais.',
  'Hipocalcemia assintomática não se trata enquanto o fósforo estiver alto.',
  'Paciente com linfoma de Burkitt ainda sem tratamento e com creatinina alta já pode estar em síndrome espontânea.',
  'Alopurinol previne; rasburicase trata.'],
 mnemonics:[
  {n:'PUK sobe, Ca cai',t:'Phosphate (fósforo), Urato e K (potássio) sobem; cálcio cai.'},
  {n:'Alopurinol = Antes; Rasburicase = Rápido',t:'Um previne a formação; a outra resolve o que já existe.'},
  {n:'Rasburicase e G6PD não combinam',t:'Risco de hemólise.'},
  {n:'Água sim, bicarbonato não',t:'Hidratar sem alcalinizar.'}],
 pitfalls:[
  'Alcalinizar a urina.',
  'Repor cálcio em hipocalcemia assintomática.',
  'Confiar só no alopurinol em paciente de alto risco.',
  'Dar rasburicase sem perguntar por deficiência de G6PD.',
  'Não repetir os exames após o início da quimioterapia.',
  'Atrasar a diálise.'],
 recall:[
  {q:'Jovem com linfoma de Burkitt, 12 horas após quimioterapia: potássio 6,4, fósforo 7,0, cálcio 6,5, ácido úrico 11, creatinina dobrou. Classifique e trate.',a:'Síndrome de lise tumoral clínica. Monitor e ECG, medidas para hipercalemia, hidratação vigorosa, rasburicase, quelante de fósforo; cálcio só se houver sintoma; avaliar diálise precoce.'},
  {q:'Por que não alcalinizar a urina?',a:'Porque o pH alto reduz a solubilidade do fosfato de cálcio e favorece sua precipitação nos túbulos, sem benefício comprovado.'},
  {q:'Qual a diferença de mecanismo entre alopurinol e rasburicase?',a:'O alopurinol inibe a xantina oxidase e impede a formação de novo ácido úrico. A rasburicase é uma urato oxidase que converte o ácido úrico existente em alantoína.'},
  {q:'Quando tratar a hipocalcemia?',a:'Apenas quando sintomática, com tetania, convulsão ou arritmia, usando a menor dose que controle os sintomas.'},
  {q:'Cite três tumores de alto risco.',a:'Linfoma de Burkitt, linfoma linfoblástico e leucemias agudas com hiperleucocitose.'}],
 practice:[
  'Colha os exames de base antes do primeiro ciclo de todo paciente hematológico.',
  'Pergunte sobre origem e história de anemia hemolítica antes da rasburicase.',
  'Combine com a enfermagem a meta de diurese e o balanço hídrico.'],
 refs:[
  {t:'Howard SC, Jones DP, Pui CH. The tumor lysis syndrome. N Engl J Med. 2011.',q:'Howard Jones Pui The tumor lysis syndrome N Engl J Med 2011'},
  {t:'Cairo MS, Bishop M. Tumour lysis syndrome: new therapeutic strategies and classification. Br J Haematol. 2004.',q:'Cairo Bishop Tumour lysis syndrome new therapeutic strategies and classification 2004'},
  {t:'Coiffier B, et al. Guidelines for the management of pediatric and adult tumor lysis syndrome: an evidence-based review. J Clin Oncol. 2008.',q:'Guidelines management pediatric adult tumor lysis syndrome evidence-based review Coiffier 2008'}],
 note:'Síntese de revisão e da classificação de Cairo e Bishop.'
},
'onco_2':{
 updated:'2026-11',
 pretest:['Qual o primeiro sintoma da compressão medular por metástase?','Que exame pedir e de que extensão?','Qual a medida inicial na hipercalcemia grave e por que não começar pelo diurético?','Na leucostase, por que a transfusão de hemácias pode piorar o quadro?'],
 sections:[
  {h:'Compressão medular neoplásica',p:[
   'Metástase vertebral que cresce para o espaço epidural e comprime a medula ou a cauda equina. Tumores mais envolvidos: pulmão, mama, próstata, mieloma, linfoma e rim. A coluna torácica é a mais afetada.',
   'A dor vem primeiro, semanas antes do déficit: dor nas costas progressiva, que piora deitado e à noite, às vezes em faixa. Depois surgem fraqueza de pernas, alteração sensitiva com nível e, por último, retenção urinária e constipação. O estado neurológico no momento do tratamento é o que mais prevê o resultado: quem chega andando costuma sair andando.'],
   list:[
   '<strong>Exame:</strong> ressonância de toda a coluna, em até 24 horas. Cerca de um terço tem mais de um nível.',
   '<strong>Corticoide:</strong> dexametasona logo na suspeita com déficit, por exemplo 10 mg intravenosos seguidos de 4 mg a cada 6 horas, sem esperar a imagem.',
   '<strong>Tratamento definitivo:</strong> cirurgia descompressiva seguida de radioterapia para pacientes selecionados (instabilidade da coluna, nível único, tumor pouco sensível à radiação, bom prognóstico); o estudo de Patchell mostrou mais pacientes andando com essa combinação. Radioterapia isolada para os demais. Quimioterapia em tumores muito sensíveis, como linfoma.',
   'Analgesia, profilaxia de trombose e cuidado com bexiga e intestino.']},
  {h:'Hipercalcemia da malignidade',p:[
   'É a emergência metabólica mais comum no câncer e indica doença avançada. Quatro mecanismos:'],
   table:{head:['Mecanismo','Tumores','Marcador'],rows:[
    ['Peptídeo relacionado ao PTH (humoral)','Carcinomas escamosos, rim, mama, bexiga','PTH baixo, PTHrP alto'],
    ['Osteólise por metástases','Mama, mieloma','PTH baixo, lesões líticas'],
    ['Produção de calcitriol','Linfomas','Vitamina D ativa alta'],
    ['PTH ectópico','Raro','PTH alto']]},
   list:[
   '<strong>Clínica:</strong> poliúria e desidratação, náuseas, constipação, fraqueza, confusão e sonolência; QT curto no ECG.',
   '<strong>Corrigir pela albumina:</strong> cálcio medido mais 0,8 vez (4 menos a albumina). Ou dosar cálcio iônico.',
   '<strong>Gravidade:</strong> acima de 14 mg/dL ou sintomática é grave.']},
  {h:'Tratamento da hipercalcemia grave',table:{head:['Medida','Detalhe','Início de ação'],rows:[
   ['Soro fisiológico','Volume generoso, ajustado ao coração e ao rim. O paciente está desidratado pela poliúria','Horas'],
   ['Calcitonina','4 unidades/kg a cada 12 horas; perde efeito em 48 horas','4 a 6 horas'],
   ['Bisfosfonato','Ácido zoledrônico 4 mg ou pamidronato 60 a 90 mg, intravenosos','2 a 4 dias'],
   ['Denosumabe','Refratários ou com insuficiência renal','Dias'],
   ['Corticoide','Linfoma e outros casos mediados por calcitriol','Dias'],
   ['Diálise','Hipercalcemia grave com insuficiência renal ou cardíaca','Imediato']]},
   after:'Diurético de alça só depois de repor volume e apenas se houver sobrecarga. Suspender tiazídicos, cálcio, vitamina D e lítio.'},
  {h:'Hiperleucocitose e leucostase',p:[
   'Hiperleucocitose é a contagem de leucócitos acima de 100.000 por microlitro. Leucostase é a síndrome clínica em que blastos, grandes e pouco deformáveis, obstruem a microcirculação e lesam o endotélio. É muito mais comum na leucemia mieloide aguda. Na leucemia linfocítica crônica, contagens muito altas raramente causam sintomas, porque as células são pequenas e maduras.'],
   list:[
   '<strong>Pulmão:</strong> dispneia, hipoxemia, infiltrado difuso.',
   '<strong>Sistema nervoso:</strong> cefaleia, confusão, alteração visual, hemorragia intracraniana.',
   '<strong>Armadilhas de laboratório:</strong> a gasometria pode mostrar oxigênio falsamente baixo, porque os leucócitos consomem oxigênio no tubo; confie na oximetria. O potássio pode vir falsamente alto.',
   '<strong>Tratamento:</strong> citorredução imediata com hidroxiureia e início rápido da quimioterapia de indução; hidratação e prevenção de lise tumoral; leucaférese em casos sintomáticos selecionados.',
   '<strong>Transfusão:</strong> evitar hemácias até reduzir a contagem, pois aumentam a viscosidade. Manter plaquetas em nível seguro, pelo risco de sangramento.',
   '<strong>Leucemia promielocítica:</strong> iniciar ácido transretinoico na suspeita; a leucaférese é evitada pelo risco de sangramento.']}
 ],
 flow:{title:'Três emergências, três perguntas',nodes:[
  {k:'start',t:'Paciente com câncer e piora aguda'},
  {k:'ask',t:'Dor nas costas nova ou progressiva, com ou sem fraqueza de pernas?',yes:'Dexametasona se houver déficit; ressonância de toda a coluna em 24 horas; cirurgia e radioterapia',no:'Seguir'},
  {k:'ask',t:'Confusão, poliúria, constipação ou desidratação?',yes:'Dosar cálcio e albumina. Se grave: soro, calcitonina e bisfosfonato',no:'Seguir'},
  {k:'ask',t:'Leucócitos acima de 100.000 com dispneia ou sintoma neurológico?',yes:'Leucostase: hidroxiureia, hidratação, prevenção de lise, indução; evitar hemácias',no:'Seguir'},
  {k:'do',t:'Em todos: monitorar, tratar a dor, prevenir trombose e discutir com a oncologia'},
  {k:'end',t:'Alinhar o plano com o prognóstico e os objetivos do paciente'}]},
 reasoning:[
  'Dor nas costas em paciente com câncer é metástase até prova em contrário. Não espere o déficit.',
  'Confusão no paciente oncológico: peça cálcio antes de pedir tomografia de crânio.',
  'Hipercalcemia com PTH baixo aponta para malignidade; com PTH alto, para hiperparatireoidismo.',
  'Na leucostase, a oximetria é mais confiável que a gasometria.',
  'O bisfosfonato demora dias: por isso a calcitonina faz a ponte.'],
 mnemonics:[
  {n:'Dor antes do déficit',t:'A janela para preservar a marcha é a fase da dor.'},
  {n:'Hidrata, Calcitonina, Bisfosfonato',t:'A ordem do tratamento da hipercalcemia, do mais rápido ao mais duradouro.'},
  {n:'100 mil e mieloide',t:'Leucostase é problema de blasto mieloide acima de 100.000.'},
  {n:'Pedras, ossos, gemidos e sono',t:'Cálculos, dor óssea, queixas abdominais e sonolência da hipercalcemia.'}],
 pitfalls:[
  'Pedir ressonância só do segmento doloroso.',
  'Atrasar a dexametasona para esperar o exame.',
  'Começar furosemida no paciente hipercalcêmico desidratado.',
  'Não corrigir o cálcio pela albumina.',
  'Transfundir hemácias antes da citorredução na leucostase.',
  'Intubar por hipoxemia da gasometria sem checar a oximetria.'],
 recall:[
  {q:'Homem com câncer de próstata, dor torácica dorsal há 3 semanas e fraqueza de pernas há 2 dias. Quais as três primeiras condutas?',a:'Dexametasona intravenosa imediata, ressonância de toda a coluna em até 24 horas e avaliação urgente de neurocirurgia e radioterapia.'},
  {q:'Mulher com câncer de mama, sonolenta, cálcio de 15 mg/dL, albumina de 3. Qual o cálcio corrigido e o tratamento?',a:'Corrigido: 15 + 0,8 x (4 - 3) = 15,8 mg/dL. Soro fisiológico generoso, calcitonina e ácido zoledrônico; suspender tiazídico, cálcio e vitamina D; monitorar.'},
  {q:'Qual o mecanismo mais comum da hipercalcemia da malignidade?',a:'Secreção de peptídeo relacionado ao PTH pelo tumor.'},
  {q:'Por que a leucemia linfocítica crônica raramente causa leucostase?',a:'Porque os linfócitos são pequenos, maduros e deformáveis, ao contrário dos blastos mieloides.'},
  {q:'Quais tumores permitem tratar a compressão medular com quimioterapia?',a:'Os muito sensíveis, como linfomas, mieloma e tumores germinativos.'}],
 practice:[
  'Examine força, nível sensitivo e bexiga em todo paciente oncológico com dor nas costas.',
  'Inclua cálcio e albumina no painel de admissão do paciente com câncer.',
  'Converse com paciente e família sobre objetivos de cuidado: hipercalcemia indica doença avançada.'],
 refs:[
  {t:'Patchell RA, et al. Direct decompressive surgical resection in the treatment of spinal cord compression caused by metastatic cancer. Lancet. 2005.',q:'Direct decompressive surgical resection treatment spinal cord compression metastatic cancer Patchell 2005'},
  {t:'El-Hajj Fuleihan G, et al. Treatment of hypercalcemia of malignancy in adults: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2023.',q:'Treatment of hypercalcemia of malignancy in adults Endocrine Society clinical practice guideline 2023'},
  {t:'Stewart AF. Hypercalcemia associated with cancer. N Engl J Med. 2005.',q:'Stewart Hypercalcemia associated with cancer N Engl J Med 2005'}],
 note:'Síntese de estudo clínico, diretriz e revisão. Doses variam conforme o protocolo do serviço.'
},
'hema_0':{
 updated:'2026-11',
 pretest:['Que proporção de blastos define leucemia aguda?','Qual leucemia é emergência por coagulopatia e qual o tratamento imediato?','Que alteração genética define a leucemia mieloide crônica?','Linfocitose de 40.000 em idoso assintomático com leucemia linfocítica crônica: precisa tratar?'],
 sections:[
  {h:'A lógica: aguda ou crônica, mieloide ou linfoide',p:[
   'Nas agudas, a célula para de amadurecer. Blastos se acumulam na medula e substituem a produção normal: faltam hemácias, plaquetas e neutrófilos. O quadro se instala em semanas, com cansaço, sangramento e infecção.',
   'Nas crônicas, a célula amadurece, mas se acumula em excesso. O curso é de meses a anos, muitas vezes descoberto em hemograma de rotina.'],
   table:{head:['','Mieloide aguda','Linfoide aguda','Mieloide crônica','Linfocítica crônica'],rows:[
    ['Idade típica','Adultos e idosos','Crianças; segundo pico em idosos','Adultos de meia-idade','Idosos'],
    ['Sangue','Blastos; bastonetes de Auer','Blastos linfoides','Leucocitose com todas as fases de maturação, basofilia','Linfócitos maduros, sombras nucleares'],
    ['Marca','20% ou mais de blastos mieloides','Blastos com TdT; acomete sistema nervoso e mediastino','Cromossomo Filadélfia: t(9;22), BCR-ABL1','Células B CD5 e CD23 positivas'],
    ['Exame físico','Hipertrofia gengival nas formas monocíticas','Linfonodos, baço, massa de mediastino','Esplenomegalia volumosa','Linfonodos, baço'],
    ['Tratamento','Indução com citarabina e antraciclina; transplante conforme o risco','Poliquimioterapia com profilaxia do sistema nervoso','Inibidor de tirosina quinase','Observar; tratar só doença ativa']]}},
  {h:'Leucemias agudas: diagnóstico e emergências',list:[
   'Diagnóstico: 20% ou mais de blastos na medula ou no sangue. Algumas alterações genéticas definem a doença mesmo com menos.',
   'Mielograma com morfologia, imunofenotipagem por citometria de fluxo, cariótipo e testes moleculares. Eles definem linhagem, risco e alvo terapêutico.',
   '<strong>Emergências na apresentação:</strong> neutropenia febril, sangramento por plaquetopenia, coagulação intravascular, síndrome de lise tumoral e leucostase.',
   'Suporte: transfusões, antibiótico, prevenção de lise tumoral, cateter central.']},
  {h:'Leucemia promielocítica aguda',p:[
   'Subtipo da mieloide aguda com t(15;17) e gene de fusão PML-RARA. Os promielócitos anormais liberam substâncias que causam coagulação intravascular e fibrinólise: o paciente morre de hemorragia, principalmente cerebral, nos primeiros dias. Por isso é a leucemia mais urgente e, tratada, a mais curável.'],
   list:[
   'Suspeitar com pancitopenia, sangramento desproporcional, fibrinogênio baixo e promielócitos com muitos bastonetes de Auer.',
   'Iniciar ácido transretinoico na suspeita, antes da confirmação genética.',
   'Manter plaquetas e fibrinogênio em níveis seguros com transfusão.',
   'Tratamento: ácido transretinoico com trióxido de arsênio, com ou sem quimioterapia conforme o risco.',
   'Síndrome de diferenciação: febre, dispneia, infiltrado, derrames, ganho de peso e hipotensão. Tratar com dexametasona logo que suspeitar.']},
  {h:'Leucemia mieloide crônica',list:[
   'Leucocitose com desvio até formas jovens, basofilia e eosinofilia, plaquetas normais ou altas, esplenomegalia.',
   'Confirmação: detecção de BCR-ABL1 por FISH ou PCR.',
   'Diferencial com reação leucemoide (infecção grave): nesta há granulações tóxicas, sem basofilia, sem BCR-ABL1.',
   'Fases: crônica, que responde muito bem, e crise blástica, que se comporta como leucemia aguda.',
   'Tratamento: inibidores de tirosina quinase (imatinibe, dasatinibe, nilotinibe). Acompanhar a resposta pela quantificação seriada do transcrito. Sobrevida próxima à da população geral nos bons respondedores.']},
  {h:'Leucemia linfocítica crônica',list:[
   'Diagnóstico: 5.000 ou mais linfócitos B clonais por microlitro, por pelo menos 3 meses, com imunofenótipo típico. Não exige mielograma.',
   'Muitos pacientes nunca precisam de tratamento. Tratar só com doença ativa: anemia ou plaquetopenia por infiltração, esplenomegalia ou linfonodos volumosos ou progressivos, duplicação dos linfócitos em menos de 6 meses, sintomas constitucionais, ou citopenia autoimune refratária.',
   'O número de linfócitos, isoladamente, não indica tratamento.',
   'Tratamento atual: inibidores de BTK ou venetoclax com anti-CD20. Deleção 17p ou mutação de TP53 indica pior resposta à quimioterapia.',
   'Complicações: infecções por hipogamaglobulinemia, anemia hemolítica autoimune, plaquetopenia imune e transformação em linfoma agressivo (síndrome de Richter).']}
 ],
 flow:{title:'Hemograma com suspeita de leucemia',nodes:[
  {k:'start',t:'Citopenias, leucocitose ou células anormais no sangue periférico'},
  {k:'do',t:'Revisar o esfregaço com o laboratório no mesmo dia'},
  {k:'ask',t:'Há blastos?',yes:'Leucemia aguda provável: internar, coagulograma, fibrinogênio, ácido úrico, potássio, DHL',no:'Seguir'},
  {k:'ask',t:'Sangramento, fibrinogênio baixo ou promielócitos?',yes:'Ácido transretinoico imediato e suporte transfusional',no:'Mielograma com citometria, cariótipo e molecular'},
  {k:'ask',t:'Leucocitose com desvio escalonado e basofilia?',yes:'Pesquisar BCR-ABL1: leucemia mieloide crônica',no:'Seguir'},
  {k:'ask',t:'Linfocitose madura persistente em idoso?',yes:'Imunofenotipagem do sangue: leucemia linfocítica crônica; tratar só se doença ativa',no:'Investigar outras causas'},
  {k:'end',t:'Encaminhar à hematologia com urgência proporcional ao achado'}]},
 reasoning:[
  'Pancitopenia com blastos é leucemia aguda; pancitopenia sem blastos pede mielograma.',
  'Sangramento exagerado para o número de plaquetas: pense em promielocítica.',
  'Basofilia é a pista que separa leucemia mieloide crônica de infecção.',
  'Na leucemia linfocítica crônica, trata-se o paciente, não o número.',
  'Hemólise em portador de leucemia linfocítica crônica: peça teste de antiglobulina direto.'],
 mnemonics:[
  {n:'20% blastos',t:'O número que define leucemia aguda.'},
  {n:'15;17 dá ATRA',t:'Translocação da promielocítica e seu tratamento.'},
  {n:'9;22 dá imatinibe',t:'Cromossomo Filadélfia e inibidor de tirosina quinase.'},
  {n:'Crônica linfocítica: 5 mil e 5 (CD5)',t:'5.000 linfócitos B clonais, CD5 positivos.'}],
 pitfalls:[
  'Esperar a confirmação genética para dar ácido transretinoico.',
  'Tratar leucemia linfocítica crônica pelo valor da linfocitose.',
  'Confundir leucemia mieloide crônica com reação leucemoide e adiar o teste molecular.',
  'Fazer procedimento invasivo em promielocítica sem corrigir a coagulação.',
  'Não prevenir lise tumoral antes da indução.'],
 recall:[
  {q:'Mulher de 35 anos com gengivorragia, equimoses, plaquetas de 20.000, fibrinogênio de 80 mg/dL e células com múltiplos bastonetes de Auer. Conduta imediata?',a:'Leucemia promielocítica aguda provável. Iniciar ácido transretinoico de imediato, transfundir plaquetas e repor fibrinogênio, evitar procedimentos invasivos e confirmar com pesquisa de PML-RARA.'},
  {q:'Homem de 50 anos, leucócitos de 180.000 com mielócitos, metamielócitos e basofilia, baço a 10 cm. Qual exame confirma e qual o tratamento?',a:'Pesquisa de BCR-ABL1 por PCR ou FISH. Tratamento com inibidor de tirosina quinase.'},
  {q:'Quais são os critérios para tratar leucemia linfocítica crônica?',a:'Falência medular progressiva, esplenomegalia ou linfonodomegalia volumosa ou progressiva, tempo de duplicação dos linfócitos menor que 6 meses, sintomas constitucionais ou citopenia autoimune que não responde ao corticoide.'},
  {q:'O que é a síndrome de diferenciação e como tratar?',a:'Complicação do tratamento da promielocítica, com febre, dispneia, infiltrados, derrames e ganho de peso. Tratar com dexametasona de imediato.'},
  {q:'O que é a síndrome de Richter?',a:'Transformação da leucemia linfocítica crônica em linfoma agressivo, em geral difuso de grandes células B, com piora rápida, febre e aumento de DHL.'}],
 practice:[
  'Ligue para o laboratório e peça a revisão da lâmina diante de qualquer hemograma estranho.',
  'Inclua fibrinogênio no pedido de toda leucemia aguda nova.',
  'Explique ao portador de leucemia linfocítica crônica em observação que não tratar é a conduta correta, não descaso.'],
 refs:[
  {t:'Döhner H, et al. Diagnosis and management of AML in adults: 2022 recommendations from an international expert panel on behalf of the ELN. Blood. 2022.',q:'Diagnosis and management of AML in adults 2022 recommendations ELN Dohner'},
  {t:'Sanz MA, et al. Management of acute promyelocytic leukemia: updated recommendations from an expert panel of the European LeukemiaNet. Blood. 2019.',q:'Management of acute promyelocytic leukemia updated recommendations European LeukemiaNet Sanz 2019'},
  {t:'Hochhaus A, et al. European LeukemiaNet 2020 recommendations for treating chronic myeloid leukemia. Leukemia. 2020.',q:'European LeukemiaNet 2020 recommendations for treating chronic myeloid leukemia Hochhaus'},
  {t:'Hallek M, et al. iwCLL guidelines for diagnosis, indications for treatment, response assessment, and supportive management of CLL. Blood. 2018.',q:'iwCLL guidelines diagnosis indications for treatment response assessment supportive management CLL Hallek 2018'}],
 note:'Síntese de recomendações internacionais.'
},
'hema_1':{
 updated:'2026-11',
 pretest:['Qual célula define o linfoma de Hodgkin e quais seus marcadores?','O que são sintomas B?','Por que a biópsia deve ser excisional?','Que sorologia é obrigatória antes do rituximabe?'],
 sections:[
  {h:'Dois grandes grupos',table:{head:['','Hodgkin','Não Hodgkin'],rows:[
   ['Célula','Reed-Sternberg (CD15 e CD30 positivas), minoria no tumor','Linfócitos B (maioria) ou T clonais'],
   ['Disseminação','Por contiguidade, de uma cadeia para a vizinha','Não contígua, com acometimento extranodal frequente'],
   ['Local','Cervical, supraclavicular, mediastino','Qualquer cadeia; trato digestivo, pele, medula, sistema nervoso'],
   ['Idade','Bimodal: adulto jovem e após 55 anos','Aumenta com a idade'],
   ['Pistas','Prurido, dor no linfonodo ao ingerir álcool, massa de mediastino','Depende do subtipo'],
   ['Prognóstico','Curável na maioria','Variável: indolentes controláveis, agressivos curáveis']]}},
  {h:'Quando suspeitar e como confirmar',list:[
   'Linfonodo com mais de 2 cm, endurecido, indolor, que persiste por mais de 4 a 6 semanas ou cresce. Linfonodo supraclavicular é sempre suspeito.',
   'Sintomas B: febre acima de 38 °C sem infecção, sudorese noturna profusa e perda de mais de 10% do peso em 6 meses.',
   '<strong>Biópsia excisional do linfonodo.</strong> A arquitetura do tecido é necessária para classificar; a punção por agulha fina não basta.',
   'Imuno-histoquímica define o subtipo.',
   'Exames: hemograma, DHL, função renal e hepática, ácido úrico, sorologias para HIV e hepatites B e C.',
   'Antes de rituximabe: sorologia de hepatite B, pelo risco de reativação. Antes de antraciclina: ecocardiograma. Discutir preservação de fertilidade.']},
  {h:'Estadiamento',table:{head:['Estágio','Definição'],rows:[
   ['I','Uma região linfonodal ou um sítio extranodal isolado'],
   ['II','Duas ou mais regiões do mesmo lado do diafragma'],
   ['III','Regiões dos dois lados do diafragma'],
   ['IV','Acometimento extranodal difuso (medula, fígado, pulmão)']]},
   after:'Acrescenta-se A (sem sintomas B) ou B. PET-CT é o exame de estadiamento e de avaliação de resposta nos linfomas ávidos por glicose. No linfoma de Hodgkin, o PET-CT dispensa a biópsia de medula.'},
  {h:'Linfoma de Hodgkin',list:[
   'Subtipo mais comum: esclerose nodular, em adultos jovens, com massa de mediastino.',
   'Celularidade mista: associada ao vírus Epstein-Barr e ao HIV.',
   'Predomínio linfocitário nodular: entidade à parte, com células CD20 positivas e curso indolente.',
   'Tratamento: quimioterapia ABVD (doxorrubicina, bleomicina, vimblastina, dacarbazina), com ou sem radioterapia, ajustada pelo PET-CT intermediário. Anti-CD30 e imunoterapia nas formas avançadas ou recaídas.',
   'Efeitos tardios: toxicidade pulmonar da bleomicina, cardiotoxicidade da antraciclina, segundo câncer (mama e pulmão após radioterapia de mediastino), hipotireoidismo, infertilidade.']},
  {h:'Linfomas não Hodgkin: os que caem',table:{head:['Subtipo','Comportamento','Marca','Conduta'],rows:[
   ['Difuso de grandes células B','Agressivo; o mais comum','Massa de crescimento rápido, DHL alta','R-CHOP com intenção curativa'],
   ['Folicular','Indolente','t(14;18), BCL2','Observar se assintomático; tratar se sintomas ou grande volume'],
   ['Burkitt','Muito agressivo','t(8;14), MYC; céu estrelado; duplica em um dia','Quimioterapia intensiva urgente e prevenção de lise tumoral'],
   ['Do manto','Agressivo','t(11;14), ciclina D1','Quimioimunoterapia; inibidor de BTK'],
   ['MALT gástrico','Indolente','Associado ao Helicobacter pylori','Erradicar a bactéria'],
   ['Leucemia/linfoma T do adulto','Agressivo','HTLV-1; hipercalcemia, lesões de pele','Tratamento especializado']]},
   after:'Regra útil: os indolentes crescem devagar e raramente se curam; os agressivos crescem rápido e podem ser curados com quimioterapia.'},
  {h:'Emergências associadas',list:[
   'Síndrome da veia cava superior por massa de mediastino: obter tecido antes de tratar, se a via aérea permitir.',
   'Síndrome de lise tumoral em Burkitt e linfoblástico.',
   'Compressão medular.',
   'Hipercalcemia.',
   'Obstrução de via aérea, ureter ou intestino.']}
 ],
 flow:{title:'Linfonodomegalia persistente',nodes:[
  {k:'start',t:'Linfonodo aumentado por mais de 4 a 6 semanas ou com características suspeitas'},
  {k:'ask',t:'Há causa infecciosa ou inflamatória evidente?',yes:'Tratar e reavaliar',no:'Seguir'},
  {k:'do',t:'Hemograma, DHL, sorologias (HIV, hepatites, outras conforme o caso), imagem'},
  {k:'do',t:'Biópsia excisional do linfonodo mais acessível e representativo'},
  {k:'ask',t:'Células de Reed-Sternberg?',yes:'Hodgkin: PET-CT, ABVD com ou sem radioterapia',no:'Não Hodgkin: classificar em indolente ou agressivo'},
  {k:'ask',t:'Agressivo ou muito agressivo?',yes:'Tratar sem demora; prevenir lise tumoral',no:'Indolente: observar se assintomático e de baixo volume'},
  {k:'end',t:'Estadiar, checar hepatite B e coração, discutir fertilidade e iniciar o plano'}]},
 reasoning:[
  'Linfonodo doloroso e recente costuma ser infeccioso; duro, fixo e indolor preocupa.',
  'Massa de mediastino em jovem com prurido: Hodgkin.',
  'DHL muito alta com crescimento em dias: pense em Burkitt e prepare-se para lise tumoral.',
  'Evite corticoide antes da biópsia: ele pode apagar o diagnóstico.',
  'Linfoma indolente assintomático: observar é tratamento.'],
 mnemonics:[
  {n:'15 e 30 de Reed-Sternberg',t:'CD15 e CD30 positivas.'},
  {n:'14;18 Folicular, 8;14 Burkitt, 11;14 Manto',t:'As três translocações mais cobradas.'},
  {n:'Sintomas B: Febre, Suor, Peso',t:'38 graus, sudorese noturna, 10% em 6 meses.'},
  {n:'Hodgkin anda de vizinho em vizinho',t:'Disseminação por contiguidade.'}],
 pitfalls:[
  'Aceitar punção por agulha fina como diagnóstico.',
  'Dar corticoide antes de obter tecido.',
  'Iniciar rituximabe sem sorologia de hepatite B.',
  'Tratar linfoma folicular assintomático de baixo volume.',
  'Não pedir ecocardiograma antes de antraciclina.',
  'Esquecer de falar sobre fertilidade com o paciente jovem.'],
 recall:[
  {q:'Mulher de 24 anos, linfonodo cervical de 3 cm há 2 meses, prurido, massa de mediastino. Qual a hipótese, o exame diagnóstico e o tratamento?',a:'Linfoma de Hodgkin, provável esclerose nodular. Biópsia excisional do linfonodo, estadiamento com PET-CT e quimioterapia ABVD com ou sem radioterapia.'},
  {q:'Por que pedir sorologia de hepatite B antes de R-CHOP?',a:'Porque o rituximabe pode reativar o vírus, com hepatite grave. Portadores recebem profilaxia antiviral.'},
  {q:'Como se comporta e se trata o linfoma folicular?',a:'É indolente, com t(14;18). Pacientes assintomáticos e com baixo volume são observados; o tratamento é indicado por sintomas, citopenias ou grande massa.'},
  {q:'Qual a translocação e a histologia do linfoma de Burkitt?',a:'t(8;14), com ativação de MYC, e aspecto de céu estrelado. Proliferação próxima de 100%.'},
  {q:'O que define estágio III?',a:'Acometimento de regiões linfonodais dos dois lados do diafragma.'}],
 practice:[
  'Meça e registre os linfonodos em centímetros.',
  'Peça a biópsia do maior linfonodo, evitando a região inguinal quando houver outra opção.',
  'Encaminhe o paciente jovem ao serviço de reprodução antes da quimioterapia, se o tempo permitir.'],
 refs:[
  {t:'Cheson BD, et al. Recommendations for initial evaluation, staging, and response assessment of Hodgkin and non-Hodgkin lymphoma: the Lugano classification. J Clin Oncol. 2014.',q:'Recommendations initial evaluation staging response assessment Hodgkin non-Hodgkin lymphoma Lugano classification Cheson 2014'},
  {t:'Swerdlow SH, et al. The 2016 revision of the World Health Organization classification of lymphoid neoplasms. Blood. 2016.',q:'2016 revision World Health Organization classification of lymphoid neoplasms Swerdlow'},
  {t:'Coiffier B, et al. CHOP chemotherapy plus rituximab compared with CHOP alone in elderly patients with diffuse large-B-cell lymphoma. N Engl J Med. 2002.',q:'CHOP chemotherapy plus rituximab compared with CHOP alone elderly diffuse large-B-cell lymphoma Coiffier 2002'}],
 note:'Síntese da classificação de Lugano e da classificação da Organização Mundial da Saúde.'
},
'hema_2':{
 updated:'2026-11',
 pretest:['O que significa CRAB?','Por que a fita urinária não detecta a proteína de Bence Jones?','Cintilografia óssea é um bom exame para o mieloma?','O que diferencia gamopatia monoclonal de significado indeterminado de mieloma?'],
 sections:[
  {h:'O que é',p:[
   'Proliferação clonal de plasmócitos na medula óssea, que produzem uma imunoglobulina monoclonal (proteína M) ou apenas cadeias leves. Os danos vêm de três fontes: a ocupação da medula (anemia), a ativação de osteoclastos com bloqueio de osteoblastos (lesões líticas e hipercalcemia) e a toxicidade das cadeias leves (rim).']},
  {h:'Espectro das gamopatias',table:{head:['','Significado indeterminado','Mieloma indolente','Mieloma múltiplo'],rows:[
   ['Proteína M sérica','Menor que 3 g/dL','3 g/dL ou mais','Qualquer'],
   ['Plasmócitos clonais na medula','Menos de 10%','10 a 59%','10% ou mais, ou plasmocitoma'],
   ['Evento definidor','Não','Não','Sim'],
   ['Conduta','Acompanhar; progressão de cerca de 1% ao ano','Acompanhar de perto; tratar alto risco em casos selecionados','Tratar']]}},
  {h:'Eventos definidores',p:[
   'O diagnóstico de mieloma exige plasmócitos clonais (10% ou mais na medula, ou plasmocitoma comprovado) e pelo menos um evento.'],
   table:{head:['Sigla','Critério'],rows:[
    ['C: cálcio','Acima de 11 mg/dL'],
    ['R: rim','Creatinina acima de 2 mg/dL ou depuração abaixo de 40 mL/min'],
    ['A: anemia','Hemoglobina abaixo de 10 g/dL ou 2 g/dL abaixo do normal'],
    ['B: osso','Uma ou mais lesões líticas em radiografia, tomografia ou PET-CT'],
    ['S: sessenta','60% ou mais de plasmócitos clonais na medula'],
    ['Li: cadeias leves','Relação entre cadeia envolvida e não envolvida de 100 ou mais'],
    ['M: ressonância','Mais de uma lesão focal de 5 mm ou mais']]},
   after:'Os três últimos são biomarcadores de malignidade: permitem tratar antes que haja lesão de órgão.'},
  {h:'Clínica e pistas de laboratório',list:[
   'Dor óssea, principalmente lombar, e fraturas patológicas.',
   'Anemia normocítica com empilhamento de hemácias (rouleaux) e VHS muito alta.',
   'Proteína total alta com albumina baixa.',
   'Insuficiência renal: a causa principal é a nefropatia por cilindros de cadeias leves. A fita urinária detecta albumina, não cadeias leves; daí a proteinúria de 24 horas alta com fita negativa.',
   'Infecções de repetição por germes encapsulados, pela queda das imunoglobulinas normais.',
   'Hipercalcemia.',
   'Hiperviscosidade (mais em IgA e IgM), amiloidose de cadeias leves, neuropatia.']},
  {h:'Investigação',list:[
   'Eletroforese de proteínas séricas com imunofixação e dosagem de cadeias leves livres. As três juntas detectam quase todos os casos.',
   'Proteinúria de 24 horas com eletroforese e imunofixação.',
   'Hemograma, cálcio, creatinina, albumina, beta-2 microglobulina e DHL.',
   'Mielograma e biópsia com citogenética por FISH: deleção 17p, t(4;14) e t(14;16) indicam alto risco.',
   'Imagem: tomografia de corpo inteiro de baixa dose, PET-CT ou ressonância. A cintilografia óssea é ruim, porque as lesões não têm atividade osteoblástica; pelo mesmo motivo a fosfatase alcalina é normal.',
   'Estadiamento prognóstico: sistema internacional revisado (beta-2 microglobulina, albumina, DHL e citogenética).']},
  {h:'Tratamento',list:[
   '<strong>Elegível a transplante (em geral até cerca de 70 anos, com bom estado):</strong> indução com combinação de inibidor de proteassoma (bortezomibe), imunomodulador (lenalidomida), dexametasona e, cada vez mais, anti-CD38 (daratumumabe); depois transplante autólogo e manutenção com lenalidomida.',
   '<strong>Não elegível:</strong> combinações com daratumumabe, lenalidomida e dexametasona, ou com bortezomibe.',
   'A doença recai; as linhas seguintes combinam outras classes, incluindo anticorpos biespecíficos e terapia celular.']},
  {h:'Suporte que evita complicação',list:[
   'Osso: bisfosfonato (ácido zoledrônico) ou denosumabe, com avaliação odontológica antes, pelo risco de osteonecrose de mandíbula.',
   'Rim: hidratar, evitar anti-inflamatórios e contraste, tratar a hipercalcemia e iniciar rápido o tratamento do mieloma.',
   'Trombose: profilaxia com ácido acetilsalicílico ou anticoagulante em quem usa imunomodulador.',
   'Infecção: aciclovir em quem usa inibidor de proteassoma ou anti-CD38; vacinas.',
   'Dor: analgesia, radioterapia local, cifoplastia. Compressão medular é emergência.']}
 ],
 flow:{title:'Dor óssea, anemia ou creatinina alta em idoso',nodes:[
  {k:'start',t:'Idoso com dor lombar persistente, anemia sem causa ou piora renal'},
  {k:'do',t:'Proteínas totais e frações, cálcio, creatinina, hemograma, VHS'},
  {k:'do',t:'Eletroforese de proteínas, imunofixação e cadeias leves livres séricas'},
  {k:'ask',t:'Componente monoclonal ou relação de cadeias leves alterada?',yes:'Mielograma e imagem de corpo inteiro',no:'Procurar outras causas'},
  {k:'ask',t:'Plasmócitos de 10% ou mais com evento definidor?',yes:'Mieloma múltiplo: estadiar e tratar',no:'Significado indeterminado ou indolente: acompanhar'},
  {k:'ask',t:'Elegível a transplante?',yes:'Indução, transplante autólogo e manutenção',no:'Esquema combinado contínuo'},
  {k:'end',t:'Bisfosfonato, profilaxias e proteção renal desde o primeiro dia'}]},
 reasoning:[
  'Anemia, dor lombar e creatinina alta em idoso: peça eletroforese de proteínas.',
  'Diferença grande entre proteína total e albumina sugere gamopatia.',
  'Fita urinária negativa não exclui proteinúria por cadeias leves.',
  'Lombalgia com piora noturna e fratura sem trauma não é "coluna da idade".',
  'Componente monoclonal pequeno sem lesão de órgão não é mieloma.'],
 mnemonics:[
  {n:'CRAB',t:'Cálcio, Rim, Anemia, Bone (osso).'},
  {n:'SLiM',t:'Sessenta por cento, Light chains (cadeias leves) com relação de 100, Magnetic resonance (ressonância).'},
  {n:'3 e 10',t:'3 g/dL de proteína M e 10% de plasmócitos separam o indeterminado do indolente.'},
  {n:'Lítico não acende',t:'Lesão do mieloma não aparece na cintilografia.'}],
 pitfalls:[
  'Pedir cintilografia óssea para rastrear lesões.',
  'Excluir proteinúria pela fita urinária.',
  'Dar anti-inflamatório para a dor em paciente com rim em risco.',
  'Iniciar bisfosfonato sem avaliação odontológica.',
  'Esquecer a profilaxia de trombose com lenalidomida ou talidomida.',
  'Tratar gamopatia de significado indeterminado.'],
 recall:[
  {q:'Homem de 68 anos, lombalgia, hemoglobina de 8,5, creatinina de 2,6, cálcio de 12, proteína total de 10 com albumina de 2,8. Quais exames fecham o diagnóstico?',a:'Eletroforese de proteínas com imunofixação e cadeias leves livres séricas, proteinúria de 24 horas com imunofixação, mielograma com citogenética e imagem de corpo inteiro. Há três eventos CRAB.'},
  {q:'Por que a fita urinária é negativa com proteinúria alta?',a:'Porque a fita detecta principalmente albumina, e a proteína excretada é cadeia leve (Bence Jones).'},
  {q:'Qual a diferença entre gamopatia de significado indeterminado e mieloma indolente?',a:'Na primeira, proteína M abaixo de 3 g/dL e menos de 10% de plasmócitos. No indolente, 3 g/dL ou mais e/ou 10 a 59% de plasmócitos. Em ambos não há evento definidor.'},
  {q:'Quais cuidados acompanham o uso de bisfosfonato?',a:'Avaliação odontológica prévia pelo risco de osteonecrose de mandíbula, ajuste pela função renal e reposição de cálcio e vitamina D.'},
  {q:'Quais alterações citogenéticas indicam alto risco?',a:'Deleção 17p, t(4;14) e t(14;16).'}],
 practice:[
  'Peça proteínas totais e frações em todo idoso com anemia sem explicação.',
  'Prescreva analgesia sem anti-inflamatório e oriente hidratação.',
  'Pergunte por dormência em sela e retenção urinária: compressão medular.'],
 refs:[
  {t:'Rajkumar SV, et al. International Myeloma Working Group updated criteria for the diagnosis of multiple myeloma. Lancet Oncol. 2014.',q:'International Myeloma Working Group updated criteria for the diagnosis of multiple myeloma Rajkumar 2014'},
  {t:'Palumbo A, et al. Revised International Staging System for multiple myeloma. J Clin Oncol. 2015.',q:'Revised International Staging System for multiple myeloma Palumbo 2015'},
  {t:'Dimopoulos MA, et al. Multiple myeloma: EHA-ESMO clinical practice guidelines for diagnosis, treatment and follow-up. Ann Oncol. 2021.',q:'Multiple myeloma EHA-ESMO Clinical Practice Guidelines diagnosis treatment follow-up Dimopoulos 2021'}],
 note:'Síntese dos critérios do grupo internacional de mieloma e de diretriz europeia.'
}
});
