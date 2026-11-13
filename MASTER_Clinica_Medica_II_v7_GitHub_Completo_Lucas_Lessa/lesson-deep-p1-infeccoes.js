/* Estudo aprofundado · Infecções na Clínica Médica (P1). Texto original; referências ao final de cada aula. */
LessonDeep.add({
'p1inf_0':{
 updated:'2026-11',
 pretest:['O que define sepse e o que define choque séptico pela definição de 2016?','O qSOFA serve para rastrear sepse?','Qual o vasopressor de primeira escolha e a meta de pressão arterial média?','Quando o corticoide entra no choque séptico?'],
 sections:[
  {h:'O que é sepse',p:[
   'Sepse é disfunção orgânica ameaçadora à vida causada por resposta desregulada do organismo a uma infecção. A palavra-chave é disfunção: infecção com febre e taquicardia, sem órgão sofrendo, não é sepse. Operacionalmente, a disfunção é identificada por aumento de 2 pontos ou mais no escore SOFA (respiração, coagulação, fígado, circulação, consciência e rim).',
   'Choque séptico é o subgrupo com falência circulatória e metabólica: necessidade de vasopressor para manter pressão arterial média de 65 mmHg ou mais e lactato acima de 2 mmol/L, apesar de reposição volêmica adequada.',
   'O mecanismo combina vasodilatação, extravasamento capilar, depressão miocárdica, microtrombose e incapacidade das células de usar oxigênio. Por isso o lactato sobe mesmo com oferta de oxigênio aparentemente adequada.']},
  {h:'Reconhecer cedo',list:[
   'Suspeite em todo paciente com infecção e qualquer disfunção nova: confusão, hipotensão, taquipneia, hipoxemia, oligúria, pele moteada, enchimento capilar lento, plaquetas em queda, bilirrubina ou creatinina em alta.',
   'O qSOFA (frequência respiratória de 22 ou mais, alteração de consciência, sistólica de 100 ou menos) prevê pior desfecho, mas é pouco sensível. A campanha internacional de 2021 recomenda não usá-lo sozinho como rastreio; escores de alerta precoce e os critérios de resposta inflamatória são mais sensíveis.',
   'Idosos, imunossuprimidos e usuários de betabloqueador podem não ter febre nem taquicardia.',
   'Dose o lactato em toda suspeita. Acima de 2 mmol/L, repita em 2 a 4 horas para guiar a ressuscitação.']},
  {h:'Primeira hora',table:{head:['Ação','Detalhe'],rows:[
   ['Lactato','Dosar; repetir se elevado'],
   ['Culturas','Hemoculturas antes do antibiótico, desde que não o atrasem'],
   ['Antibiótico de amplo espectro','Em até 1 hora no choque ou alta probabilidade de sepse. Sem choque e com dúvida diagnóstica, avaliar rapidamente e iniciar em até 3 horas se a suspeita persistir'],
   ['Cristaloide','30 mL/kg nas primeiras 3 horas se houver hipotensão ou lactato de 4 ou mais; preferir soluções balanceadas'],
   ['Vasopressor','Se hipotenso durante ou após o volume, para manter pressão arterial média de 65 mmHg ou mais']]},
   after:'Depois do volume inicial, novos bolus só com sinais de responsividade a volume (elevação passiva das pernas, variação de pressão de pulso). Excesso de líquido piora pulmão, rim e mortalidade.'},
  {h:'Suporte hemodinâmico',list:[
   '<strong>Noradrenalina</strong> é o vasopressor de primeira linha. Pode ser iniciada em veia periférica calibrosa para não atrasar.',
   'Dose em escalada: associar <strong>vasopressina</strong>. Se ainda insuficiente, <strong>adrenalina</strong>.',
   'Disfunção miocárdica com hipoperfusão persistente apesar de pressão adequada: <strong>dobutamina</strong>.',
   '<strong>Hidrocortisona</strong> 200 mg por dia quando a necessidade de vasopressor persiste (noradrenalina em dose de 0,25 micrograma/kg/min ou mais por pelo menos 4 horas).',
   'Metas: pressão arterial média de 65 mmHg, queda do lactato, enchimento capilar normalizando, diurese e consciência melhorando.']},
  {h:'Foco e antibiótico',list:[
   'Escolha pelo foco provável, pela origem (comunidade ou hospital), por colonização prévia e pelo perfil local de resistência.',
   'Controle do foco é tratamento: drenar abscesso, desobstruir via urinária ou biliar, retirar cateter suspeito, operar peritonite. Fazer assim que for possível, idealmente em 6 a 12 horas.',
   'Reavalie todos os dias: descalonar pelo resultado das culturas e encurtar a duração quando a evolução permite.',
   'Demais cuidados: ventilação protetora se houver síndrome do desconforto respiratório, glicemia abaixo de 180 mg/dL, profilaxia de trombose e de úlcera de estresse nos pacientes de risco, nutrição precoce.']}
 ],
 flow:{title:'Infecção com sinais de gravidade',nodes:[
  {k:'start',t:'Suspeita de infecção com disfunção orgânica nova'},
  {k:'do',t:'Monitor, oxigênio, acesso, lactato, hemoculturas, exames de disfunção'},
  {k:'ask',t:'Hipotensão ou lactato de 4 mmol/L ou mais?',yes:'Cristaloide 30 mL/kg e antibiótico em até 1 hora',no:'Antibiótico em até 1 a 3 horas conforme a probabilidade; reavaliar'},
  {k:'ask',t:'Pressão arterial média abaixo de 65 mmHg após ou durante o volume?',yes:'Noradrenalina; choque séptico se lactato acima de 2',no:'Seguir monitorando'},
  {k:'ask',t:'Vasopressor em dose alta e persistente?',yes:'Associar vasopressina e hidrocortisona',no:'Manter'},
  {k:'do',t:'Identificar e controlar o foco: imagem, drenagem, retirada de dispositivo'},
  {k:'end',t:'Reavaliar perfusão, descalonar antibiótico e planejar a duração'}]},
 reasoning:[
  'Pergunte sempre: há infecção? há órgão sofrendo? qual é o foco e ele pode ser drenado?',
  'Lactato que não cai significa que a ressuscitação ou o controle do foco estão incompletos.',
  'Pressão normal não exclui choque: olhe lactato, enchimento capilar e diurese.',
  'Paciente que piora após os primeiros litros provavelmente precisa de vasopressor, não de mais soro.',
  'Sem foco definido após a avaliação inicial, procure abdome, via urinária obstruída, partes moles e cateteres.'],
 mnemonics:[
  {n:'Sepse = Suspeita + SOFA',t:'Infecção suspeita com 2 pontos ou mais de disfunção.'},
  {n:'65 e 2',t:'Choque séptico: vasopressor para manter 65 e lactato acima de 2.'},
  {n:'Pacote da hora: LCAVV',t:'Lactato, Culturas, Antibiótico, Volume, Vasopressor.'},
  {n:'Nora, Vaso, Adrena',t:'A ordem dos vasopressores.'}],
 pitfalls:[
  'Usar qSOFA negativo para descartar sepse.',
  'Atrasar o antibiótico para colher culturas ou esperar exames.',
  'Continuar dando volume sem reavaliar a resposta.',
  'Esperar acesso central para iniciar noradrenalina.',
  'Esquecer o controle do foco.',
  'Manter antibiótico de amplo espectro sem rever em 48 a 72 horas.'],
 recall:[
  {q:'Mulher de 70 anos, pielonefrite, pressão de 82 por 48 mmHg, lactato de 4,6 mmol/L. Depois de 30 mL/kg de cristaloide a pressão segue baixa. Como classificar e o que fazer?',a:'Choque séptico. Iniciar noradrenalina para pressão arterial média de 65 mmHg, garantir antibiótico já iniciado na primeira hora, investigar obstrução urinária com imagem e drenar se houver, repetir lactato.'},
  {q:'Por que o qSOFA não é recomendado como rastreio isolado?',a:'Porque tem baixa sensibilidade: muitos pacientes com sepse têm qSOFA abaixo de 2. Ele ajuda a identificar risco de pior evolução, não a detectar a síndrome.'},
  {q:'Quando indicar hidrocortisona no choque séptico?',a:'Quando há necessidade persistente de vasopressor, em geral noradrenalina de 0,25 micrograma/kg/min ou mais por pelo menos 4 horas. Dose de 200 mg por dia.'},
  {q:'Qual o prazo do antibiótico em cada cenário?',a:'Em até 1 hora no choque séptico ou quando a sepse é muito provável. Em até 3 horas quando a sepse é possível e não há choque, após avaliação rápida de causas não infecciosas.'},
  {q:'Como decidir se o paciente precisa de mais volume depois do bolus inicial?',a:'Por medidas dinâmicas de responsividade, como elevação passiva das pernas com medida de débito ou variação de pressão de pulso, e pela resposta de perfusão, não por valores fixos de pressão venosa.'}],
 practice:[
  'Anote a hora da suspeita e a hora do antibiótico.',
  'Reexamine enchimento capilar, consciência e diurese a cada reavaliação.',
  'Converse cedo com o cirurgião ou o radiologista intervencionista quando há foco drenável.'],
 refs:[
  {t:'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016.',q:'Third International Consensus Definitions for Sepsis and Septic Shock Sepsis-3 Singer 2016'},
  {t:'Evans L, et al. Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2021. Intensive Care Med. 2021.',q:'Surviving Sepsis Campaign international guidelines management sepsis septic shock 2021 Evans'}],
 note:'Síntese das definições de 2016 e da campanha internacional de 2021.'
},
'p1inf_1':{
 updated:'2026-11',
 pretest:['Quantas amostras de hemocultura colher e em que momento?','Quando o ecocardiograma transesofágico é necessário?','Bacteremia por S. aureus pode ser contaminação?','Quais as três grandes indicações de cirurgia na endocardite?'],
 sections:[
  {h:'Como a endocardite se forma',p:[
   'O endotélio valvar lesado (por valvopatia, prótese, cateter ou jato turbulento) recebe depósito de plaquetas e fibrina. Uma bacteremia, mesmo transitória, coloniza esse depósito e forma a vegetação. Dela saem as três fontes de dano: destruição local (insuficiência valvar, abscesso, bloqueio atrioventricular), embolia (cérebro, baço, rim, pulmão nas valvas direitas) e fenômenos imunes (glomerulonefrite, nódulos de Osler, manchas de Roth).',
   'Agentes principais: Staphylococcus aureus (o mais comum hoje, agudo e destrutivo), estreptococos do grupo viridans (subagudo, origem oral), enterococos (idosos, foco urinário ou intestinal) e estafilococos coagulase-negativos (próteses). Usuários de drogas injetáveis têm endocardite de valva tricúspide com êmbolos pulmonares sépticos.']},
  {h:'Quando suspeitar',list:[
   'Febre sem foco com sopro novo, prótese valvar, dispositivo cardíaco ou valvopatia.',
   'Febre com fenômeno embólico: AVC, infarto esplênico ou renal, isquemia de membro.',
   'Bacteremia por agente típico, sobretudo S. aureus.',
   'Sinais periféricos: petéquias, hemorragias subungueais, lesões de Janeway (indolores, embólicas), nódulos de Osler (dolorosos, imunes), manchas de Roth.',
   'Insuficiência cardíaca nova, bloqueio atrioventricular novo (abscesso de anel aórtico).']},
  {h:'Diagnóstico: critérios de Duke',p:[
   'Somam microbiologia, imagem e clínica. Diagnóstico definitivo com 2 critérios maiores, ou 1 maior e 3 menores, ou 5 menores.'],
   table:{head:['Maiores','Menores'],rows:[
    ['Hemoculturas positivas para agente típico em amostras separadas, ou bacteremia persistente','Predisposição: valvopatia, prótese, droga injetável'],
    ['Imagem: vegetação, abscesso, deiscência nova de prótese ou regurgitação nova','Febre de 38 °C ou mais'],
    ['','Fenômenos vasculares: êmbolos, Janeway, aneurisma micótico'],
    ['','Fenômenos imunes: Osler, Roth, glomerulonefrite, fator reumatoide'],
    ['','Microbiologia que não preenche critério maior']]},
   list:[
   'Colher 3 pares de hemocultura de punções diferentes antes do antibiótico. No paciente estável, pode-se esperar o resultado para tratar.',
   'Ecocardiograma transtorácico em todos. Transesofágico se o primeiro for negativo com suspeita mantida, em próteses e dispositivos, e para pesquisar abscesso.',
   'Culturas negativas: uso prévio de antibiótico, grupo HACEK, Coxiella, Bartonella, fungos.']},
  {h:'Tratamento',list:[
   'Antibiótico bactericida, intravenoso, por 4 a 6 semanas, contado a partir da primeira hemocultura negativa.',
   'S. aureus sensível à oxacilina: oxacilina ou cefazolina. São superiores à vancomicina para cepas sensíveis.',
   'S. aureus resistente: vancomicina ou daptomicina.',
   'Estreptococos sensíveis: penicilina ou ceftriaxona. Enterococo: ampicilina com ceftriaxona ou com aminoglicosídeo.',
   'Prótese com estafilococo: associar rifampicina e gentamicina.',
   'Repetir hemoculturas a cada 24 a 48 horas até negativarem.']},
  {h:'Quando operar',table:{head:['Indicação','Exemplos'],rows:[
   ['Insuficiência cardíaca','Regurgitação aguda grave, edema pulmonar, choque'],
   ['Infecção não controlada','Abscesso, fístula, bacteremia persistente, fungos ou germes multirresistentes'],
   ['Prevenção de embolia','Vegetação grande (10 mm ou mais) com episódio embólico; vegetações muito grandes']]}},
  {h:'Bacteremia por Staphylococcus aureus',p:[
   'Nunca é contaminação. Tem alta taxa de focos metastáticos (endocardite, osteomielite vertebral, abscessos) e recai se tratada por pouco tempo.'],
   list:[
   'Repetir hemoculturas até negativar.',
   'Ecocardiograma em todos; transesofágico nos de maior risco.',
   'Procurar e remover o foco: cateter, abscesso, prótese.',
   'Não complicada (hemocultura negativa em 2 a 4 dias, febre cedendo em 72 horas, sem endocardite, sem material protético, sem foco metastático): pelo menos 14 dias intravenosos. Qualquer outro cenário: 4 a 6 semanas.',
   'Parecer do infectologista reduz mortalidade.']},
  {h:'Profilaxia',p:[
   'Restrita a pacientes de alto risco (prótese valvar, endocardite prévia, cardiopatia congênita cianótica) antes de procedimentos dentários que manipulam gengiva ou região periapical: amoxicilina 2 g, 30 a 60 minutos antes.']}
 ],
 flow:{title:'Febre com suspeita de endocardite',nodes:[
  {k:'start',t:'Febre com sopro, prótese, êmbolo ou bacteremia por agente típico'},
  {k:'do',t:'Três pares de hemocultura antes do antibiótico; ECG'},
  {k:'ask',t:'Instável, sepse ou insuficiência cardíaca aguda?',yes:'Antibiótico empírico logo após as culturas',no:'Pode aguardar culturas se estável'},
  {k:'do',t:'Ecocardiograma transtorácico'},
  {k:'ask',t:'Negativo com suspeita alta, prótese ou dispositivo?',yes:'Ecocardiograma transesofágico',no:'Aplicar critérios de Duke'},
  {k:'ask',t:'Insuficiência cardíaca, abscesso, bacteremia persistente ou embolia com vegetação grande?',yes:'Discutir cirurgia precoce com a equipe',no:'Tratamento clínico por 4 a 6 semanas'},
  {k:'end',t:'Hemoculturas de controle, vigilância de complicações e avaliação dentária'}]},
 reasoning:[
  'Bloqueio atrioventricular novo em endocardite aórtica indica abscesso de anel.',
  'AVC em paciente febril: ausculte o coração antes de qualquer outra coisa.',
  'S. aureus no sangue pede três perguntas: de onde veio, para onde foi e por quanto tempo tratar.',
  'Febre que persiste após uma semana de antibiótico correto: abscesso, êmbolo séptico ou febre por droga.',
  'Janeway não dói; Osler dói.'],
 mnemonics:[
  {n:'2, 1+3 ou 5',t:'As três combinações que fecham Duke.'},
  {n:'Osler dói, Janeway não',t:'Osler é imune e doloroso; Janeway é embólico e indolor.'},
  {n:'Cirurgia: Coração, Controle, Coágulo',t:'Insuficiência cardíaca, infecção sem controle e embolia.'},
  {n:'S. aureus: 14 dias só se tudo limpo',t:'Qualquer complicação leva a 4 a 6 semanas.'}],
 pitfalls:[
  'Dar antibiótico antes das hemoculturas em paciente estável.',
  'Tratar S. aureus sensível com vancomicina por comodidade.',
  'Considerar uma hemocultura com S. aureus como contaminação.',
  'Não repetir hemoculturas para documentar a negativação.',
  'Descartar endocardite só pelo transtorácico normal em portador de prótese.',
  'Adiar a discussão cirúrgica até o paciente descompensar.'],
 recall:[
  {q:'Homem de 34 anos, usuário de droga injetável, febre, tosse e nódulos pulmonares cavitados bilaterais. Qual a hipótese e o agente provável?',a:'Endocardite de valva tricúspide com êmbolos pulmonares sépticos, por Staphylococcus aureus.'},
  {q:'Paciente com bacteremia por S. aureus de cateter, febre resolvida em 48 horas, hemocultura de controle negativa no dia 3, ecocardiograma normal, sem prótese. Quanto tempo tratar?',a:'Bacteremia não complicada: pelo menos 14 dias de antibiótico intravenoso, com retirada do cateter.'},
  {q:'Quando pedir ecocardiograma transesofágico?',a:'Transtorácico negativo ou inconclusivo com suspeita mantida, prótese valvar ou dispositivo intracardíaco, e suspeita de complicação como abscesso.'},
  {q:'Cite as indicações de cirurgia.',a:'Insuficiência cardíaca por disfunção valvar, infecção não controlada (abscesso, bacteremia persistente, fungos ou germes resistentes) e prevenção de embolia em vegetações grandes.'},
  {q:'Quem recebe profilaxia antes de procedimento dentário?',a:'Portadores de prótese valvar, endocardite prévia ou cardiopatia congênita cianótica, com amoxicilina 2 g antes do procedimento.'}],
 practice:[
  'Examine unhas, conjuntivas, palmas e plantas em todo paciente com febre prolongada.',
  'Peça fundo de olho.',
  'Registre a data da primeira hemocultura negativa: é o dia zero do tratamento.'],
 refs:[
  {t:'Delgado V, et al. 2023 ESC Guidelines for the management of endocarditis. Eur Heart J. 2023.',q:'2023 ESC Guidelines for the management of endocarditis Delgado'},
  {t:'Fowler VG, et al. The 2023 Duke-International Society for Cardiovascular Infectious Diseases criteria for infective endocarditis. Clin Infect Dis. 2023.',q:'2023 Duke-International Society for Cardiovascular Infectious Diseases Criteria for Infective Endocarditis Fowler'},
  {t:'Holland TL, Arnold C, Fowler VG. Clinical management of Staphylococcus aureus bacteremia: a review. JAMA. 2014.',q:'Clinical management of Staphylococcus aureus bacteremia a review Holland Fowler JAMA 2014'}],
 note:'Síntese da diretriz europeia de 2023 e de revisão sobre bacteremia estafilocócica.'
},
'p1inf_2':{
 updated:'2026-11',
 pretest:['Quais os cinco itens do CURB-65?','Qual o esquema da pneumonia internada em enfermaria?','Na meningite bacteriana, o que vem primeiro: tomografia ou antibiótico?','Quando e por que usar dexametasona na meningite?'],
 sections:[
  {h:'Pneumonia adquirida na comunidade: onde tratar',p:[
   'A decisão mais importante é o local de tratamento, porque define mortalidade e esquema. O CURB-65 dá um ponto para cada item: Confusão, Ureia acima de 50 mg/dL, frequência Respiratória de 30 ou mais, pressão (Blood pressure) sistólica abaixo de 90 ou diastólica de 60 ou menos, e idade de 65 anos ou mais.'],
   table:{head:['Pontos','Conduta'],rows:[
    ['0 a 1','Ambulatorial, se não houver hipoxemia, comorbidade descompensada ou problema social'],
    ['2','Internação em enfermaria'],
    ['3 ou mais','Internação; avaliar terapia intensiva']]},
   after:'Pneumonia grave pelos critérios norte-americanos: um critério maior (choque com vasopressor ou ventilação mecânica) ou três menores (frequência respiratória de 30 ou mais, relação PaO₂/FiO₂ de 250 ou menos, infiltrado multilobar, confusão, ureia elevada, leucopenia, plaquetopenia, hipotermia, hipotensão que exige volume vigoroso). Oximetria faz parte da avaliação de todos.'},
  {h:'Antibiótico por cenário',table:{head:['Cenário','Esquema'],rows:[
   ['Ambulatorial, sem comorbidade','Amoxicilina, ou macrolídeo, ou doxiciclina'],
   ['Ambulatorial, com comorbidade ou antibiótico recente','Amoxicilina-clavulanato com macrolídeo, ou quinolona respiratória'],
   ['Enfermaria','Betalactâmico (ceftriaxona ou ampicilina-sulbactam) com macrolídeo, ou quinolona respiratória isolada'],
   ['Grave','Betalactâmico com macrolídeo, ou betalactâmico com quinolona respiratória'],
   ['Risco para Pseudomonas ou estafilococo resistente','Ampliar a cobertura só se houver isolamento prévio desses germes ou internação recente com antibiótico intravenoso; colher culturas e descalonar']]},
   list:[
   'Duração: pelo menos 5 dias, encerrando com o paciente afebril e estável há 48 a 72 horas.',
   'Culturas de sangue e escarro: nos graves e quando se cobre germe resistente.',
   'Corticoide: hidrocortisona reduziu mortalidade na pneumonia grave em terapia intensiva no estudo CAPE COD. Não usar em influenza nem em casos leves.',
   'Falha em 48 a 72 horas: pensar em derrame parapneumônico ou empiema, germe não coberto, tuberculose, obstrução, diagnóstico errado.']},
  {h:'Meningite bacteriana: reconhecer',p:[
   'Febre, rigidez de nuca e alteração de consciência formam a tríade clássica, mas menos da metade dos adultos tem os três. Quase todos têm pelo menos dois de quatro: cefaleia, febre, rigidez de nuca e alteração de consciência. Petéquias e púrpura sugerem meningococo. Agentes no adulto: pneumococo e meningococo; Listeria em maiores de 50 anos, gestantes, etilistas e imunossuprimidos.']},
  {h:'Meningite: sequência de ações',list:[
   'Hemoculturas imediatas.',
   'Se há indicação de tomografia antes da punção (imunossupressão, doença prévia do sistema nervoso, convulsão recente, papiledema, rebaixamento importante, déficit focal): dexametasona e antibiótico primeiro, depois imagem, depois punção.',
   'Sem essas indicações: punção lombar logo, seguida de dexametasona e antibiótico.',
   '<strong>Dexametasona</strong> 10 mg a cada 6 horas por 4 dias, iniciada antes ou junto da primeira dose do antibiótico. Reduz sequelas e mortalidade na meningite pneumocócica.',
   '<strong>Antibiótico empírico:</strong> ceftriaxona 2 g a cada 12 horas; associar vancomicina onde há pneumococo resistente; associar ampicilina se houver risco de Listeria.',
   'Isolamento respiratório por gotículas nas primeiras 24 horas de antibiótico. Quimioprofilaxia dos contatos íntimos de doença meningocócica (rifampicina, ciprofloxacino ou ceftriaxona). Notificação compulsória.']},
  {h:'Líquor',table:{head:['','Bacteriana','Viral','Tuberculosa ou fúngica'],rows:[
   ['Células','Mais de 1.000, neutrófilos','Dezenas a centenas, linfócitos','Centenas, linfócitos'],
   ['Glicose','Baixa (abaixo de 40 mg/dL ou de 40% da sérica)','Normal','Baixa'],
   ['Proteína','Muito alta','Normal ou pouco alta','Alta'],
   ['Outros','Gram e cultura; lactato alto','PCR para enterovírus e herpes','Pesquisa de BAAR, teste molecular, tinta da China e antígeno criptocócico']]},
   after:'Encefalite herpética: febre com alteração de comportamento, convulsão ou sinal focal. Iniciar aciclovir na suspeita.'}
 ],
 flow:{title:'Febre com tosse ou febre com cefaleia',nodes:[
  {k:'start',t:'Suspeita de pneumonia ou de meningite'},
  {k:'ask',t:'Cefaleia, rigidez de nuca ou alteração de consciência?',yes:'Hemoculturas, dexametasona e antibiótico; tomografia se indicada; punção lombar',no:'Seguir para pneumonia'},
  {k:'do',t:'Radiografia de tórax, oximetria, ureia; calcular CURB-65'},
  {k:'ask',t:'CURB-65 de 2 ou mais, hipoxemia ou critérios de gravidade?',yes:'Internar; betalactâmico com macrolídeo',no:'Tratamento ambulatorial e retorno em 48 a 72 horas'},
  {k:'ask',t:'Isolamento prévio de germe resistente ou internação recente com antibiótico intravenoso?',yes:'Ampliar cobertura e colher culturas',no:'Esquema padrão'},
  {k:'ask',t:'Sem melhora em 72 horas?',yes:'Procurar derrame, empiema, germe não coberto, outro diagnóstico',no:'Completar pelo menos 5 dias'},
  {k:'end',t:'Vacinas, cessação do tabagismo e radiografia de controle quando indicada'}]},
 reasoning:[
  'Na pneumonia, decida primeiro o local; o antibiótico vem a seguir.',
  'Na meningite, o que mata é o atraso do antibiótico, não a falta da punção.',
  'Ureia alta e confusão valem tanto quanto a radiografia para definir gravidade.',
  'Glicose baixa no líquor nunca é viral.',
  'Idoso com pneumonia pode chegar só confuso, sem febre nem tosse.'],
 mnemonics:[
  {n:'CURB-65',t:'Confusão, Ureia, Respiração, Blood pressure, 65 anos.'},
  {n:'Dexa antes ou junto',t:'A dexametasona perde valor se dada depois do antibiótico.'},
  {n:'Listeria: 50+, Gestante, Álcool, Imunossupressão',t:'Os grupos que pedem ampicilina.'},
  {n:'5 dias e 48 horas',t:'Pneumonia: mínimo de 5 dias, com 48 horas de estabilidade.'}],
 pitfalls:[
  'Esperar a tomografia para iniciar antibiótico na meningite.',
  'Dar a dexametasona horas depois do antibiótico.',
  'Esquecer ampicilina no idoso e na gestante.',
  'Internar ou liberar pneumonia sem medir a oximetria.',
  'Usar macrolídeo isolado em paciente internado.',
  'Não investigar derrame pleural na febre persistente.'],
 recall:[
  {q:'Homem de 72 anos, confuso, frequência respiratória de 32, pressão de 100 por 58, ureia de 70. Qual o CURB-65 e a conduta?',a:'Confusão, ureia, respiração, pressão diastólica e idade: 5 pontos. Pneumonia grave: internar em terapia intensiva, betalactâmico com macrolídeo, culturas e considerar hidrocortisona.'},
  {q:'Mulher de 58 anos, etilista, febre, cefaleia e rigidez de nuca, sonolenta. Qual a sequência e o esquema?',a:'Hemoculturas, dexametasona e antibiótico imediatos (ceftriaxona, vancomicina conforme o perfil local e ampicilina pela idade e pelo etilismo), tomografia por causa do rebaixamento e depois punção lombar.'},
  {q:'Líquor com 2.500 células, 90% de neutrófilos, glicose de 20 e proteína de 300. Interpretação?',a:'Meningite bacteriana.'},
  {q:'Quando ampliar a cobertura para Pseudomonas na pneumonia comunitária?',a:'Quando houver isolamento prévio do germe ou internação recente com antibiótico intravenoso, colhendo culturas para descalonar.'},
  {q:'Quem recebe quimioprofilaxia na doença meningocócica?',a:'Contatos íntimos e prolongados, como moradores da mesma casa, e profissionais expostos a secreções sem proteção.'}],
 practice:[
  'Tenha o CURB-65 anotado na admissão.',
  'Cronometre o tempo porta-antibiótico na suspeita de meningite.',
  'Verifique vacinas contra pneumococo e influenza na alta.'],
 refs:[
  {t:'Metlay JP, et al. Diagnosis and treatment of adults with community-acquired pneumonia: ATS/IDSA clinical practice guideline. Am J Respir Crit Care Med. 2019.',q:'Diagnosis and Treatment of Adults with Community-acquired Pneumonia ATS IDSA Metlay 2019'},
  {t:'Dequin PF, et al. Hydrocortisone in severe community-acquired pneumonia (CAPE COD). N Engl J Med. 2023.',q:'Hydrocortisone in Severe Community-Acquired Pneumonia Dequin 2023'},
  {t:'van de Beek D, et al. ESCMID guideline: diagnosis and treatment of acute bacterial meningitis. Clin Microbiol Infect. 2016.',q:'ESCMID guideline diagnosis and treatment of acute bacterial meningitis van de Beek 2016'}],
 note:'Síntese de diretrizes norte-americana e europeia. Ajustar esquemas ao perfil de resistência local.'
},
'p1inf_3':{
 updated:'2026-11',
 pretest:['Cistite não complicada em mulher jovem precisa de urocultura?','Quando tratar bacteriúria assintomática?','Pielonefrite que não melhora em 72 horas: qual o próximo passo?','Urocultura positiva em paciente com sonda e sem sintomas: tratar?'],
 sections:[
  {h:'Organizar pelo local e pelo hospedeiro',p:[
   'A bactéria sobe pela uretra. Se fica na bexiga, causa cistite: disúria, polaciúria, urgência, sem febre. Se alcança o rim, causa pielonefrite: febre, calafrios, dor lombar, náuseas. Escherichia coli responde pela maioria dos casos.',
   'O hospedeiro muda o risco: homem, gestante, obstrução, cálculo, sonda, alteração anatômica, imunossupressão e diabetes descompensado pedem investigação e tratamento mais cuidadosos.']},
  {h:'Cistite e bacteriúria assintomática',list:[
   'Mulher não gestante com sintomas típicos e sem corrimento: diagnóstico clínico. Urocultura dispensável no primeiro episódio.',
   'Primeira linha: nitrofurantoína por 5 dias ou fosfomicina em dose única. Sulfametoxazol-trimetoprima por 3 dias só onde a resistência é baixa. Quinolonas devem ser poupadas.',
   'Urocultura: falha de tratamento, recorrência, homem, gestante, suspeita de resistência.',
   '<strong>Bacteriúria assintomática:</strong> tratar apenas em gestantes e antes de procedimento urológico com sangramento de mucosa. Em idosos, diabéticos e pacientes com sonda, não tratar: não traz benefício e seleciona resistência.',
   'Confusão em idoso com urocultura positiva e sem sintomas urinários ou febre não é infecção urinária até excluir outras causas.']},
  {h:'Pielonefrite',list:[
   'Urocultura sempre, antes do antibiótico.',
   'Ambulatorial se estável e tolerando via oral: quinolona por 7 dias onde a resistência é baixa, ou dose inicial de ceftriaxona seguida de antibiótico oral guiado pela cultura.',
   'Internação: sepse, vômitos, gestação, obstrução, falha ambulatorial. Ceftriaxona, ou esquema mais amplo se houver risco de germe resistente.',
   'Imagem (tomografia ou ultrassom) se não houver melhora em 48 a 72 horas, se houver suspeita de cálculo ou obstrução, sepse, diabetes descompensado ou recidiva.',
   '<strong>Infecção com obstrução é emergência:</strong> desobstruir com cateter ureteral ou nefrostomia.',
   'Complicações: abscesso renal e perinefrético, pielonefrite enfisematosa (diabéticos), necrose de papila.',
   'No homem, considerar prostatite: febre, dor perineal, próstata dolorosa. Tratamento mais longo, com fármaco que penetre na próstata.']},
  {h:'Infecções associadas à assistência',table:{head:['Infecção','Definição prática','Ponto-chave'],rows:[
   ['Urinária associada a sonda','Sintomas ou febre sem outro foco, com cultura positiva','Não tratar colonização; trocar a sonda antes de colher; retirar assim que possível'],
   ['Corrente sanguínea associada a cateter','Bacteremia sem outro foco, com cateter central','Retirar o cateter na maioria; duração conforme o germe'],
   ['Pneumonia hospitalar','Após 48 horas de internação','Cobrir S. aureus e bacilos gram-negativos conforme o perfil local; 7 dias'],
   ['Pneumonia associada à ventilação','Após 48 horas de intubação','Cultura de secreção respiratória; cabeceira elevada, despertar diário, higiene oral'],
   ['Sítio cirúrgico','Até 30 dias da cirurgia (mais tempo com implante)','Abrir e drenar; antibiótico se houver sinais sistêmicos']]},
   after:'Fatores de risco para germes multirresistentes: antibiótico intravenoso nos últimos 90 dias, internação prolongada, choque séptico, terapia renal substitutiva e colonização prévia. Higiene das mãos e retirada de dispositivos desnecessários são as medidas de maior impacto.'}
 ],
 flow:{title:'Queixa urinária ou urocultura positiva',nodes:[
  {k:'start',t:'Sintomas urinários, febre com dor lombar ou cultura positiva'},
  {k:'ask',t:'Há sintomas ou sinais de infecção?',yes:'Seguir',no:'Bacteriúria assintomática: tratar só gestante ou antes de procedimento urológico'},
  {k:'ask',t:'Febre, dor lombar ou sinais sistêmicos?',yes:'Pielonefrite: urocultura e antibiótico sistêmico',no:'Cistite: nitrofurantoína ou fosfomicina'},
  {k:'ask',t:'Sepse, gestação, vômitos ou obstrução?',yes:'Internar; imagem; desobstruir se necessário',no:'Tratamento oral e reavaliação em 48 a 72 horas'},
  {k:'ask',t:'Sem melhora em 72 horas?',yes:'Tomografia: abscesso, cálculo, obstrução; rever cultura',no:'Completar o curso'},
  {k:'do',t:'Em paciente com sonda: avaliar necessidade diária, trocar antes de colher cultura'},
  {k:'end',t:'Ajustar pela cultura e orientar prevenção'}]},
 reasoning:[
  'Trate o paciente, não a urocultura.',
  'Febre com dor lombar e cálculo: pense em obstrução e peça imagem no mesmo dia.',
  'Em homem, infecção urinária tem causa até prova em contrário: próstata, obstrução, cálculo.',
  'Quinolona empírica falha onde a resistência de E. coli é alta: conheça o perfil local.',
  'Candida na urina de paciente com sonda quase sempre é colonização.'],
 mnemonics:[
  {n:'Assintomática: só Gestante e Urologia',t:'As duas exceções que se tratam.'},
  {n:'Cistite: 5 ou 1',t:'Nitrofurantoína por 5 dias ou fosfomicina em 1 dose.'},
  {n:'72 horas sem melhora = imagem',t:'Regra da pielonefrite.'},
  {n:'48 horas',t:'O marco das pneumonias hospitalar e associada à ventilação.'}],
 pitfalls:[
  'Tratar urocultura positiva de idoso assintomático.',
  'Atribuir confusão mental a infecção urinária sem procurar outras causas.',
  'Não colher urocultura na pielonefrite.',
  'Usar nitrofurantoína para pielonefrite: ela não atinge nível adequado no rim.',
  'Deixar passar obstrução infectada.',
  'Manter sonda vesical sem indicação.'],
 recall:[
  {q:'Mulher de 24 anos, disúria e polaciúria há 2 dias, sem febre. Conduta?',a:'Cistite não complicada. Tratar empiricamente com nitrofurantoína por 5 dias ou fosfomicina em dose única, sem urocultura.'},
  {q:'Idosa de 82 anos, institucionalizada, assintomática, urocultura com E. coli. Conduta?',a:'Bacteriúria assintomática. Não tratar.'},
  {q:'Homem com febre, dor lombar e cálculo de 8 mm no ureter com hidronefrose. O que é prioritário além do antibiótico?',a:'Desobstrução urgente da via urinária, por cateter ureteral ou nefrostomia.'},
  {q:'Paciente no quinto dia de ventilação mecânica com febre, secreção purulenta e infiltrado novo. Diagnóstico e conduta?',a:'Pneumonia associada à ventilação. Colher secreção respiratória e hemoculturas, iniciar antibiótico conforme o perfil da unidade, reavaliar em 48 a 72 horas e tratar por 7 dias.'},
  {q:'Quais as medidas de maior impacto para prevenir infecção relacionada à assistência?',a:'Higiene das mãos, retirada precoce de dispositivos e pacotes de prevenção para cateter, sonda e ventilação.'}],
 practice:[
  'Pergunte todos os dias: este paciente ainda precisa de sonda e de cateter?',
  'Antes de pedir urocultura, pergunte se o resultado vai mudar a conduta.',
  'Consulte o perfil de sensibilidade do seu hospital.'],
 refs:[
  {t:'Gupta K, et al. International clinical practice guidelines for the treatment of acute uncomplicated cystitis and pyelonephritis in women. Clin Infect Dis. 2011.',q:'International clinical practice guidelines treatment acute uncomplicated cystitis pyelonephritis women Gupta 2011'},
  {t:'Nicolle LE, et al. Clinical practice guideline for the management of asymptomatic bacteriuria: 2019 update by the IDSA. Clin Infect Dis. 2019.',q:'Clinical Practice Guideline for the Management of Asymptomatic Bacteriuria 2019 Update Nicolle'},
  {t:'Kalil AC, et al. Management of adults with hospital-acquired and ventilator-associated pneumonia: 2016 clinical practice guidelines by the IDSA and ATS. Clin Infect Dis. 2016.',q:'Management of Adults With Hospital-acquired and Ventilator-associated Pneumonia 2016 Kalil'}],
 note:'Síntese de diretrizes norte-americanas. A escolha empírica depende da resistência local.'
},
'p1inf_4':{
 updated:'2026-11',
 pretest:['O que diferencia diarreia aquosa de disenteria?','Em que situação o antibiótico pode piorar o paciente?','Como se diagnostica e se classifica a infecção por C. difficile?','Álcool em gel elimina os esporos de C. difficile?'],
 sections:[
  {h:'Dois padrões',table:{head:['','Aquosa (não inflamatória)','Disenteria (inflamatória)'],rows:[
   ['Mecanismo','Toxina ou lesão do delgado sem invasão','Invasão ou citotoxina no cólon'],
   ['Fezes','Volumosas, sem sangue','Pequeno volume, com sangue e muco, tenesmo'],
   ['Febre','Ausente ou baixa','Frequente'],
   ['Agentes','Vírus (norovírus, rotavírus), E. coli enterotoxigênica, cólera, toxinas pré-formadas','Shigella, Campylobacter, Salmonella, E. coli êntero-hemorrágica, Entamoeba'],
   ['Risco principal','Desidratação','Complicações sistêmicas']]},
   after:'Início em poucas horas após a refeição, com vômitos, sugere toxina pré-formada (S. aureus, Bacillus cereus).'},
  {h:'Avaliação e hidratação',list:[
   'A primeira tarefa é estimar a desidratação: sede, mucosas, turgor, pressão em pé, diurese, consciência.',
   'Reidratação oral resolve a maioria. Via intravenosa para choque, vômitos incoercíveis ou rebaixamento.',
   'Exames de fezes não são rotina. Pedir em disenteria, febre alta, quadro grave, duração acima de 7 dias, imunossupressão, surto ou uso recente de antibiótico.',
   'Manter a alimentação. Loperamida pode ser usada na diarreia aquosa sem febre; é contraindicada na disenteria e na suspeita de C. difficile.']},
  {h:'Quando dar antibiótico',list:[
   'A maioria dos casos é autolimitada e não precisa.',
   'Indicar em disenteria com febre, quadro grave, imunossuprimidos e diarreia do viajante intensa. Azitromicina é a escolha usual; ciprofloxacino é alternativa onde a resistência permite.',
   'Cólera: hidratação vigorosa e dose única de doxiciclina ou azitromicina.',
   '<strong>Não dar antibiótico na suspeita de E. coli produtora de toxina Shiga</strong> (diarreia com sangue, pouca ou nenhuma febre, dor intensa, surto alimentar): aumenta o risco de síndrome hemolítico-urêmica, com anemia microangiopática, plaquetopenia e lesão renal.',
   'Salmonella não tifoide em pessoa saudável: não tratar; antibiótico prolonga o estado de portador.']},
  {h:'Clostridioides difficile',p:[
   'O antibiótico altera a microbiota e permite que o bacilo produtor de toxinas se multiplique. Fatores de risco: qualquer antibiótico (mais com clindamicina, quinolonas e cefalosporinas), idade avançada, internação e inibidor de bomba de prótons.'],
   list:[
   '<strong>Quem testar:</strong> três ou mais evacuações não formadas em 24 horas, sem outra explicação. Não testar fezes formadas nem pedir teste de cura.',
   '<strong>Como testar:</strong> algoritmo em etapas com antígeno GDH e toxina, com teste molecular para resolver discordância.',
   '<strong>Gravidade:</strong> grave com leucócitos de 15.000 ou mais ou creatinina acima de 1,5 mg/dL. Fulminante com hipotensão ou choque, íleo ou megacólon.']},
  {h:'Tratamento do C. difficile',table:{head:['Situação','Conduta'],rows:[
   ['Primeiro episódio, não fulminante','Fidaxomicina por 10 dias (preferida) ou vancomicina oral 125 mg a cada 6 horas por 10 dias'],
   ['Sem acesso aos dois, quadro não grave','Metronidazol oral'],
   ['Fulminante','Vancomicina oral ou por sonda em dose alta com metronidazol intravenoso; vancomicina retal se houver íleo; avaliação cirúrgica'],
   ['Recorrência','Fidaxomicina, ou vancomicina em esquema de redução gradual; transplante de microbiota fecal a partir da segunda recorrência']]},
   after:'Suspender o antibiótico causador sempre que possível. Precaução de contato e lavagem das mãos com água e sabão: o álcool não elimina esporos. Vancomicina intravenosa não funciona, pois não chega à luz intestinal. No Brasil, a fidaxomicina tem disponibilidade limitada.'}
 ],
 flow:{title:'Diarreia aguda no adulto',nodes:[
  {k:'start',t:'Diarreia há menos de 14 dias'},
  {k:'do',t:'Avaliar desidratação e iniciar reidratação'},
  {k:'ask',t:'Usou antibiótico ou esteve internado nas últimas semanas?',yes:'Testar C. difficile; não usar loperamida',no:'Seguir'},
  {k:'ask',t:'Sangue nas fezes, febre alta, quadro grave ou imunossupressão?',yes:'Coprocultura e pesquisa de toxina Shiga; considerar azitromicina',no:'Suporte; sem exames'},
  {k:'ask',t:'Sangue com pouca febre e dor intensa, ou surto alimentar?',yes:'Suspeitar de E. coli produtora de toxina Shiga: não dar antibiótico; vigiar plaquetas e creatinina',no:'Seguir'},
  {k:'ask',t:'Dura mais de 7 a 14 dias?',yes:'Pesquisar parasitas (Giardia) e causas não infecciosas',no:'Alta com orientações'},
  {k:'end',t:'Orientar hidratação, sinais de alarme e higiene'}]},
 reasoning:[
  'A pergunta que salva é sobre desidratação, não sobre o agente.',
  'Sangue com febre alta: bactéria invasiva. Sangue sem febre: pense em toxina Shiga e em causas não infecciosas.',
  'Diarreia em paciente internado há mais de 3 dias é C. difficile até prova em contrário.',
  'Leucocitose inexplicada em paciente em uso de antibiótico pode ser C. difficile, mesmo com pouca diarreia.',
  'Diarreia que persiste por semanas não é mais aguda: mude o raciocínio.'],
 mnemonics:[
  {n:'Aquosa desidrata, disenteria invade',t:'O risco de cada padrão.'},
  {n:'Shiga + antibiótico = SHU',t:'Risco de síndrome hemolítico-urêmica.'},
  {n:'3 em 24',t:'Três evacuações não formadas em 24 horas para testar C. difficile.'},
  {n:'15 mil e 1,5',t:'Leucócitos e creatinina que definem C. difficile grave.'}],
 pitfalls:[
  'Dar loperamida na disenteria.',
  'Tratar com antibiótico a suspeita de toxina Shiga.',
  'Pedir coprocultura para toda diarreia.',
  'Usar vancomicina intravenosa para C. difficile.',
  'Pedir teste de cura para C. difficile.',
  'Higienizar as mãos só com álcool após contato com esses pacientes.'],
 recall:[
  {q:'Criança e adultos de uma mesma festa com diarreia sanguinolenta, dor abdominal intensa e pouca febre. Qual a suspeita e o que evitar?',a:'E. coli produtora de toxina Shiga. Evitar antibiótico e antidiarreico; hidratar e monitorar hemoglobina, plaquetas e creatinina pelo risco de síndrome hemolítico-urêmica.'},
  {q:'Idoso em uso de ceftriaxona há 8 dias, 6 evacuações líquidas por dia, leucócitos de 22.000 e creatinina de 2,0. Como classificar e tratar?',a:'Infecção por C. difficile grave. Suspender a ceftriaxona se possível e tratar com fidaxomicina ou vancomicina oral por 10 dias, com precaução de contato.'},
  {q:'O que caracteriza a forma fulminante e como tratá-la?',a:'Hipotensão ou choque, íleo ou megacólon. Vancomicina oral ou por sonda em dose alta, metronidazol intravenoso, vancomicina retal se houver íleo e avaliação cirúrgica precoce.'},
  {q:'Quando usar antibiótico na diarreia aguda?',a:'Disenteria com febre, quadro grave, imunossupressão, diarreia do viajante intensa e cólera.'},
  {q:'Por que lavar as mãos com água e sabão no C. difficile?',a:'Porque os esporos resistem ao álcool; a remoção mecânica é necessária.'}],
 practice:[
  'Meça a pressão em pé e pergunte pela última diurese.',
  'Entregue por escrito a receita do soro de reidratação e os sinais de retorno.',
  'Revise a lista de antibióticos dos últimos 3 meses em toda diarreia hospitalar.'],
 refs:[
  {t:'Shane AL, et al. 2017 Infectious Diseases Society of America clinical practice guidelines for the diagnosis and management of infectious diarrhea. Clin Infect Dis. 2017.',q:'2017 Infectious Diseases Society of America Clinical Practice Guidelines Diagnosis Management Infectious Diarrhea Shane'},
  {t:'Johnson S, et al. Clinical practice guideline by the IDSA and SHEA: 2021 focused update guidelines on management of Clostridioides difficile infection in adults. Clin Infect Dis. 2021.',q:'2021 Focused Update Guidelines Management of Clostridioides difficile Infection in Adults Johnson'}],
 note:'Síntese de diretrizes norte-americanas.'
},
'p1inf_5':{
 updated:'2026-11',
 pretest:['Qual o agente típico da celulite sem pus e qual o do abscesso?','Qual o tratamento principal do abscesso cutâneo?','Qual o sinal clínico mais precoce de fasciíte necrosante?','Por que associar clindamicina na infecção necrosante?'],
 sections:[
  {h:'A pergunta que organiza: tem pus?',table:{head:['','Não purulenta','Purulenta'],rows:[
   ['Formas','Erisipela e celulite','Abscesso, furúnculo, carbúnculo'],
   ['Agente principal','Estreptococos beta-hemolíticos','Staphylococcus aureus, inclusive resistente'],
   ['Tratamento central','Antibiótico','Incisão e drenagem'],
   ['Antibiótico','Penicilina, amoxicilina, cefalexina','Sulfametoxazol-trimetoprima, doxiciclina ou clindamicina, quando indicado']]},
   after:'Erisipela é superficial: placa elevada, vermelho-viva, com borda nítida. Celulite é mais profunda, com borda mal definida.'},
  {h:'Celulite e erisipela',list:[
   'Diagnóstico clínico: eritema, calor, edema e dor, quase sempre unilaterais. Hemocultura e cultura de pele não são rotina.',
   'Procurar a porta de entrada: micose entre os dedos, fissuras, úlceras, linfedema, insuficiência venosa.',
   'Leve: antibiótico oral por 5 dias, estendendo se não houver melhora. Elevar o membro.',
   'Internar e tratar por via intravenosa se houver sinais sistêmicos, progressão rápida, imunossupressão ou falha oral.',
   'Cobrir estafilococo resistente se houver trauma penetrante, uso de droga injetável, pus ou colonização conhecida.',
   'Imitadores: dermatite de estase (bilateral, crônica, com prurido), trombose venosa, gota, dermatite de contato, eritema migratório. Vermelhidão bilateral nas pernas raramente é celulite.',
   'Recorrência: tratar a porta de entrada e o edema; profilaxia com penicilina em casos selecionados.']},
  {h:'Abscesso',list:[
   'Incisão e drenagem é o tratamento. Sem drenar, o antibiótico não resolve.',
   'Antibiótico após a drenagem aumenta a taxa de cura, sobretudo em abscessos maiores, múltiplos, com celulite ao redor, sinais sistêmicos ou em imunossuprimidos.',
   'Ultrassom à beira do leito ajuda a diferenciar celulite de coleção.',
   'Mordedura de cão, gato ou humana: amoxicilina-clavulanato; avaliar tétano e raiva.']},
  {h:'Infecção necrosante de partes moles',p:[
   'Infecção que se espalha pela fáscia e destrói tecido em horas. A pele pode parecer pouco alterada enquanto a fáscia já necrosou. Mortalidade alta e dependente do tempo até a cirurgia.'],
   list:[
   '<strong>Pistas precoces:</strong> dor desproporcional ao aspecto, dor que ultrapassa a área vermelha, edema tenso e endurecido, taquicardia e toxemia, progressão em horas apesar do antibiótico.',
   '<strong>Achados tardios:</strong> bolhas hemorrágicas, pele violácea ou necrótica, crepitação, anestesia local, choque.',
   '<strong>Tipos:</strong> polimicrobiana (diabéticos, períneo, pós-operatório; a gangrena de Fournier é a forma perineal) e monomicrobiana por estreptococo do grupo A, às vezes com síndrome do choque tóxico. Vibrio após contato com água do mar em hepatopatas; Clostridium na gangrena gasosa.',
   '<strong>Exames:</strong> escores laboratoriais e imagem têm sensibilidade limitada e não podem atrasar. Gás na imagem ajuda, mas sua ausência não exclui.',
   '<strong>Conduta:</strong> exploração cirúrgica urgente, que confirma e trata, com desbridamento amplo e repetido. Antibiótico de amplo espectro: cobertura para estafilococo resistente (vancomicina), gram-negativos e anaeróbios (piperacilina-tazobactam ou carbapenêmico) e clindamicina, que inibe a produção de toxinas. Suporte intensivo.']}
 ],
 flow:{title:'Pele vermelha, quente e dolorosa',nodes:[
  {k:'start',t:'Infecção de pele e partes moles'},
  {k:'ask',t:'Dor desproporcional, toxemia, bolhas, necrose, crepitação ou progressão em horas?',yes:'Infecção necrosante: cirurgião imediatamente, antibiótico amplo com clindamicina, terapia intensiva',no:'Seguir'},
  {k:'ask',t:'Há coleção ou pus? (exame ou ultrassom)',yes:'Incisão e drenagem; antibiótico contra estafilococo se indicado',no:'Celulite ou erisipela'},
  {k:'ask',t:'Sinais sistêmicos, imunossupressão ou falha de tratamento oral?',yes:'Internar; via intravenosa',no:'Antibiótico oral por 5 dias e elevação do membro'},
  {k:'do',t:'Marcar a borda do eritema com caneta e anotar a hora'},
  {k:'ask',t:'Bilateral, crônico ou sem resposta?',yes:'Rever o diagnóstico: estase, trombose, gota',no:'Completar o tratamento'},
  {k:'end',t:'Tratar a porta de entrada e orientar retorno se piorar'}]},
 reasoning:[
  'Dor demais para pouca lesão é o alarme da infecção necrosante.',
  'Sem pus, pense em estreptococo; com pus, em estafilococo.',
  'Eritema nas duas pernas é estase até prova em contrário.',
  'O eritema pode aumentar nas primeiras 24 a 48 horas de tratamento correto; avalie dor, febre e estado geral.',
  'Na dúvida entre celulite grave e fasciíte, quem decide é a exploração cirúrgica.'],
 mnemonics:[
  {n:'Pus pede Punção',t:'Abscesso se trata drenando.'},
  {n:'Strepto se espalha, Staphylo se encapsula',t:'Celulite difusa contra abscesso.'},
  {n:'Dor Desproporcional = Desbridar',t:'Os três D da fasciíte.'},
  {n:'Clindamicina Cala a toxina',t:'Motivo de associá-la na infecção necrosante.'}],
 pitfalls:[
  'Tratar abscesso só com antibiótico.',
  'Diagnosticar celulite bilateral.',
  'Esperar tomografia ou ressonância na suspeita de fasciíte.',
  'Descartar infecção necrosante por não haver crepitação.',
  'Não procurar micose interdigital na celulite de repetição.',
  'Esquecer a clindamicina na infecção necrosante.'],
 recall:[
  {q:'Diabético de 60 anos, dor intensa na coxa há 12 horas, pele com eritema discreto, frequência de 125 e pressão de 88 por 50. Hipótese e conduta?',a:'Infecção necrosante de partes moles. Ressuscitação, antibiótico de amplo espectro com clindamicina e exploração cirúrgica imediata, sem aguardar imagem.'},
  {q:'Jovem com abscesso de 4 cm em axila, sem febre. Conduta?',a:'Incisão e drenagem. Associar antibiótico com ação contra estafilococo da comunidade, como sulfametoxazol-trimetoprima, pelo tamanho.'},
  {q:'Como diferenciar erisipela de celulite?',a:'A erisipela é superficial, com placa elevada e borda bem delimitada. A celulite acomete derme profunda e subcutâneo, com limites imprecisos.'},
  {q:'Mulher com vermelhidão, edema e prurido nas duas pernas há meses, sem febre. Diagnóstico mais provável?',a:'Dermatite de estase. Tratar a insuficiência venosa, não com antibiótico.'},
  {q:'Qual a cobertura empírica na infecção necrosante e por quê?',a:'Vancomicina para estafilococo resistente, piperacilina-tazobactam ou carbapenêmico para gram-negativos e anaeróbios, e clindamicina para suprimir toxinas de estreptococo e estafilococo.'}],
 practice:[
  'Desenhe a borda do eritema e fotografe, com consentimento, para comparar.',
  'Examine entre os dedos dos pés.',
  'Chame o cirurgião cedo: é melhor uma avaliação a mais do que uma fasciíte tardia.'],
 refs:[
  {t:'Stevens DL, et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the IDSA. Clin Infect Dis. 2014.',q:'Practice guidelines diagnosis management skin and soft tissue infections 2014 update Stevens'},
  {t:'Stevens DL, Bryant AE. Necrotizing soft-tissue infections. N Engl J Med. 2017.',q:'Stevens Bryant Necrotizing Soft-Tissue Infections N Engl J Med 2017'},
  {t:'Talan DA, et al. Trimethoprim-sulfamethoxazole versus placebo for uncomplicated skin abscess. N Engl J Med. 2016.',q:'Trimethoprim-Sulfamethoxazole versus Placebo for Uncomplicated Skin Abscess Talan 2016'}],
 note:'Síntese de diretriz norte-americana e revisão.'
}
});
