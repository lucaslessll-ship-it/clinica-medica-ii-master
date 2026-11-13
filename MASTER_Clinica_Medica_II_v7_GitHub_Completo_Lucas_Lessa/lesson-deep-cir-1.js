/* Estudo aprofundado · Cirurgia · Abdome agudo. Texto original; referências ao final de cada aula. */
LessonDeep.add({
'ciraa_0':{
 updated:'2026-11',
 pretest:['Quais são as cinco síndromes de abdome agudo?','Analgesia com opioide atrapalha o diagnóstico do abdome agudo?','Que exame laboratorial é obrigatório em toda mulher em idade fértil com dor abdominal?','Em que situação a imagem não deve atrasar a ida ao centro cirúrgico?'],
 sections:[
  {h:'O que é e por que classificar',p:[
   'Abdome agudo é dor abdominal de início recente, em geral com menos de 7 dias, que pode exigir decisão urgente, cirúrgica ou não. A primeira tarefa não é acertar o diagnóstico exato, e sim responder duas perguntas: o paciente está estável? Há sinal de que ele precisa de cirurgia agora? A classificação em síndromes organiza o raciocínio, porque cada uma tem um mecanismo, um exame preferido e uma conduta típica.'],
   table:{head:['Síndrome','Mecanismo','Exemplos','Pista clínica'],rows:[
    ['Inflamatório','Infecção ou inflamação de víscera','Apendicite, colecistite, diverticulite, pancreatite','Dor que piora em horas, febre, dor localizada que vira peritonite'],
    ['Obstrutivo','Bloqueio do trânsito intestinal','Bridas, hérnia encarcerada, câncer de cólon, volvo','Cólica, vômitos, distensão, parada de gases e fezes'],
    ['Perfurativo','Ruptura de víscera oca','Úlcera perfurada, diverticulite perfurada, corpo estranho','Dor súbita e intensa, abdome em tábua, pneumoperitônio'],
    ['Vascular','Isquemia intestinal','Embolia ou trombose mesentérica, colite isquêmica','Dor desproporcional ao exame físico, cardiopata ou com FA'],
    ['Hemorrágico','Sangramento para a cavidade','Gravidez ectópica rota, aneurisma roto, ruptura de baço','Dor súbita com hipotensão e queda de hemoglobina']]}},
  {h:'Tipos de dor e o que eles contam',p:[
   'A dor visceral vem da distensão ou isquemia da víscera, chega por fibras autonômicas e é mal localizada, em linha média, associada a náusea. O nível depende da origem embrionária: intestino anterior (estômago, duodeno, vias biliares) dói no epigástrio, intestino médio (delgado, apêndice, cólon direito) dói na região periumbilical, e intestino posterior (cólon esquerdo, reto) dói no hipogástrio.',
   'A dor parietal (somática) aparece quando o peritônio parietal se inflama. É bem localizada, piora com movimento e tosse e gera defesa muscular. A migração da dor periumbilical para a fossa ilíaca direita na apendicite é exatamente a passagem de dor visceral para parietal. A dor referida aparece longe do órgão por compartilhar inervação, como a dor no ombro na irritação diafragmática (sinal de Kehr).']},
  {h:'Exame físico que decide',list:[
   '<strong>Sinais de peritonite:</strong> descompressão brusca dolorosa (Blumberg), defesa involuntária, rigidez em tábua, dor à percussão e à tosse.',
   '<strong>Idosos, diabéticos, imunossuprimidos e usuários de corticoide</strong> podem ter peritonite com pouca dor e sem febre. Exame pobre não exclui gravidade.',
   '<strong>Sempre examinar regiões herniárias e fazer toque retal</strong> quando indicado: hérnia encarcerada é causa clássica de obstrução esquecida.',
   '<strong>Sinais vitais valem mais que o abdome:</strong> taquicardia, hipotensão, febre alta e confusão mudam a prioridade.']},
  {h:'Exames iniciais',p:[
   'Laboratório básico: hemograma, PCR, função renal, eletrólitos, glicemia, amilase ou lipase, função hepática e bilirrubinas, gasometria com lactato quando há suspeita de isquemia ou sepse, urina tipo 1 e beta-hCG em toda mulher em idade fértil. Lactato normal não exclui isquemia mesentérica inicial.',
   'Imagem: a tomografia de abdome com contraste é o exame de maior acurácia para a maioria dos adultos. A ultrassonografia é a primeira escolha em suspeita biliar, em gestantes, em crianças e em causas ginecológicas. A rotina radiológica de abdome agudo (radiografia de tórax em pé e abdome em pé e deitado) ainda é cobrada em prova e útil para pneumoperitônio e obstrução quando não há tomografia.']},
  {h:'Condutas que valem para todos',list:[
   'Analgesia precoce, inclusive com opioide: não mascara o diagnóstico nem atrasa a decisão cirúrgica.',
   'Jejum, acesso venoso, hidratação guiada por perfusão e correção de eletrólitos.',
   'Sonda nasogástrica quando há vômitos incoercíveis ou obstrução com distensão.',
   'Antibiótico precoce quando há sepse, peritonite ou colangite.',
   'Paciente instável com peritonite difusa vai para a sala de cirurgia após reanimação inicial, sem esperar tomografia.']}
 ],
 flow:{title:'Primeira hora no abdome agudo',nodes:[
  {k:'start',t:'Dor abdominal aguda no pronto-socorro'},
  {k:'ask',t:'Instável (choque, sepse grave)?',yes:'ABC, dois acessos, cristaloide, antibiótico se sepse e cirurgião imediatamente',no:'Anamnese dirigida, exame completo e analgesia'},
  {k:'ask',t:'Peritonite difusa ou pneumoperitônio?',yes:'Preparar laparotomia ou laparoscopia de urgência',no:'Classificar a síndrome provável'},
  {k:'do',t:'Laboratório básico, beta-hCG na mulher em idade fértil, lactato se suspeita de isquemia'},
  {k:'ask',t:'Suspeita biliar, gestante, criança ou causa ginecológica?',yes:'Ultrassonografia primeiro',no:'Tomografia com contraste'},
  {k:'end',t:'Conduta da síndrome específica e reavaliação seriada do abdome'}]},
 reasoning:[
  'Comece sempre pela estabilidade. Em prova, paciente chocado com abdome em tábua não faz tomografia: faz reanimação e cirurgia.',
  'Localização ajuda, mas o tempo de evolução e a velocidade de instalação dizem a síndrome: súbito e intenso sugere perfuração, vascular ou hemorragia; progressivo em horas sugere inflamação.',
  'Dor desproporcional ao exame físico em paciente com fibrilação atrial é isquemia mesentérica até prova em contrário.',
  'Mulher em idade fértil: beta-hCG antes de qualquer conduta. Ectópica rota é hemorrágico e mata.'],
 mnemonics:[
  {n:'IOPVH',t:'Inflamatório, Obstrutivo, Perfurativo, Vascular, Hemorrágico. As cinco síndromes na ordem de frequência aproximada.'},
  {n:'Anterior, médio, posterior',t:'Epigástrio, umbigo, hipogástrio. A dor visceral aparece no nível da origem embrionária da víscera.'},
  {n:'Tábua sem TC',t:'Abdome em tábua com instabilidade vai para o centro cirúrgico, não para o tomógrafo.'}],
 pitfalls:[
  'Suspender analgesia para "não mascarar" o quadro. A evidência mostra que analgesia não piora a acurácia do exame.',
  'Esquecer beta-hCG e tratar gravidez ectópica como apendicite.',
  'Confiar em leucograma normal para excluir apendicite ou isquemia.',
  'Não examinar regiões inguinais e femorais em obstrução intestinal.',
  'Atribuir dor epigástrica ao estômago sem ECG em paciente com fatores de risco: infarto inferior também dói no epigástrio.'],
 recall:[
  {q:'Cite as cinco síndromes de abdome agudo com um exemplo de cada.',a:'Inflamatório (apendicite), obstrutivo (bridas), perfurativo (úlcera perfurada), vascular (embolia mesentérica), hemorrágico (gravidez ectópica rota).'},
  {q:'Por que a dor da apendicite migra do umbigo para a fossa ilíaca direita?',a:'Começa visceral (apêndice é intestino médio, dor periumbilical) e passa a parietal quando a inflamação atinge o peritônio parietal local.'},
  {q:'Qual é o exame de imagem de maior acurácia para abdome agudo no adulto não gestante?',a:'Tomografia de abdome e pelve com contraste.'},
  {q:'Quando a ultrassonografia é a primeira escolha?',a:'Suspeita biliar, gestantes, crianças e suspeita de causa ginecológica.'},
  {q:'O que fazer com o paciente instável com peritonite difusa?',a:'Reanimação e antibiótico, sem atrasar a cirurgia por exame de imagem.'},
  {q:'Qual exame laboratorial não pode faltar na mulher em idade fértil?',a:'Beta-hCG.'}],
 practice:['Monte uma tabela com as cinco síndromes e, para cada uma, o exame de imagem preferido e a conduta inicial.','Explique em voz alta a diferença entre dor visceral, parietal e referida usando um exemplo de cada.'],
 refs:[
  {t:'Stoker J, et al. Imaging patients with acute abdominal pain. Radiology. 2009.',q:'Stoker Imaging patients with acute abdominal pain Radiology 2009'},
  {t:'Manterola C, et al. Analgesia in patients with acute abdominal pain. Cochrane Database Syst Rev. 2011.',q:'Manterola Analgesia in patients with acute abdominal pain Cochrane 2011'},
  {t:'Townsend CM, et al. Sabiston Textbook of Surgery. 21ª ed. Capítulo Acute Abdomen.',q:'Sabiston acute abdomen chapter'}],
 note:'Base para todas as aulas de abdome agudo.'
},
'ciraa_1':{
 updated:'2026-11',
 pretest:['Quais itens compõem o escore de Alvarado e quanto vale cada um?','Qual exame de imagem você pede para uma criança com suspeita de apendicite?','Apendicite não complicada pode ser tratada só com antibiótico?','O que fazer com plastrão apendicular em paciente estável com 6 dias de dor?'],
 sections:[
  {h:'Fisiopatologia em uma linha',p:[
   'A luz do apêndice se obstrui, por hiperplasia linfoide nos jovens ou por fecalito nos adultos. O muco acumula, a pressão sobe, a drenagem venosa cai, as bactérias proliferam e a parede fica isquêmica. Sem tratamento, a evolução natural é gangrena e perfuração, que em geral ocorre após 24 a 36 horas de sintomas.']},
  {h:'Quadro clínico',p:[
   'A sequência clássica é dor periumbilical, depois anorexia, náusea e vômitos, e em seguida migração da dor para a fossa ilíaca direita, com febre baixa. Anorexia é tão frequente que sua ausência deve fazer duvidar do diagnóstico. A sequência importa: vômito antes da dor sugere gastroenterite.'],
   table:{head:['Sinal','Como pesquisar','Significado'],rows:[
    ['Blumberg','Descompressão brusca no ponto de McBurney','Irritação peritoneal local'],
    ['Rovsing','Compressão da fossa ilíaca esquerda gera dor à direita','Deslocamento de gás e irritação peritoneal'],
    ['Psoas','Extensão da coxa direita com paciente em decúbito lateral esquerdo','Apêndice retrocecal'],
    ['Obturador','Rotação interna da coxa direita fletida','Apêndice pélvico'],
    ['Dunphy','Dor na fossa ilíaca direita ao tossir','Peritonite local']]}},
  {h:'Escore de Alvarado (MANTRELS)',p:[
   'Soma até 10 pontos. Até 4 pontos: probabilidade baixa, pode-se observar ou investigar outras causas. De 5 a 6 pontos: probabilidade intermediária, faz imagem. A partir de 7 pontos: probabilidade alta. O escore AIR (Adult Appendicitis Inflammatory Response) inclui PCR e tem melhor desempenho, mas Alvarado ainda é o mais cobrado.'],
   table:{head:['Item','Pontos'],rows:[
    ['Migração da dor para fossa ilíaca direita','1'],['Anorexia','1'],['Náuseas ou vômitos','1'],['Dor (tenderness) na fossa ilíaca direita','2'],['Descompressão dolorosa (rebound)','1'],['Elevação da temperatura (37,3 °C ou mais)','1'],['Leucocitose (mais de 10 mil)','2'],['Desvio à esquerda (shift)','1']]}},
  {h:'Imagem: qual exame para quem',list:[
   '<strong>Adulto:</strong> tomografia com contraste, sensibilidade e especificidade acima de 90%. Achados: apêndice com mais de 6 mm, parede espessada, densificação da gordura, apendicolito.',
   '<strong>Criança:</strong> ultrassonografia primeiro, para evitar radiação. Se inconclusiva, ressonância ou tomografia em baixa dose conforme o serviço.',
   '<strong>Gestante:</strong> ultrassonografia primeiro; se inconclusiva, ressonância sem gadolínio. Apendicite é a causa não obstétrica mais comum de cirurgia na gestação, e a dor pode estar mais alta e lateral.',
   '<strong>Mulher jovem:</strong> lembrar de ectópica, cisto roto, torção ovariana e doença inflamatória pélvica. Beta-hCG e ultrassonografia transvaginal ajudam.']},
  {h:'Tratamento',p:[
   'O padrão é apendicectomia, de preferência laparoscópica, com antibiótico profilático antes da incisão. Na apendicite não complicada, só a dose profilática basta, sem antibiótico no pós-operatório. Na complicada (perfurada, gangrenosa, com abscesso), mantém-se antibiótico por curto período após o controle do foco, em geral cerca de 4 dias.',
   'Tratamento só com antibiótico é opção para apendicite não complicada confirmada por tomografia, em paciente informado. No estudo CODA, cerca de 3 em cada 10 pacientes acabaram operados em 90 dias, e a falha foi maior quando havia apendicolito. Por isso, apendicolito favorece a cirurgia.',
   'Plastrão ou abscesso em paciente estável com evolução longa (em geral mais de 5 dias): tratamento conservador com antibiótico, drenagem percutânea se o abscesso for maior que cerca de 3 a 4 cm, e colonoscopia depois em adultos acima de 40 anos para excluir neoplasia. A apendicectomia de intervalo não é obrigatória. Peritonite difusa é sempre cirúrgica.']}
 ],
 flow:{title:'Suspeita de apendicite',nodes:[
  {k:'start',t:'Dor em fossa ilíaca direita com ou sem migração'},
  {k:'do',t:'Alvarado ou AIR, beta-hCG na mulher, analgesia'},
  {k:'ask',t:'Probabilidade baixa (Alvarado até 4)?',yes:'Observar, reavaliar em 6 a 12 horas ou investigar outra causa',no:'Seguir para imagem ou cirurgia'},
  {k:'ask',t:'Probabilidade intermediária ou dúvida?',yes:'Imagem: TC no adulto, USG na criança e gestante',no:'Alta probabilidade: avaliação cirúrgica'},
  {k:'ask',t:'Abscesso ou plastrão com evolução longa e paciente estável?',yes:'Antibiótico, drenagem percutânea se abscesso maior que 3 a 4 cm, colonoscopia depois se mais de 40 anos',no:'Apendicectomia laparoscópica'},
  {k:'end',t:'Antibiótico pós-operatório só se apendicite complicada'}]},
 reasoning:[
  'Ordem dos sintomas: dor, depois vômito. O contrário fala a favor de gastroenterite.',
  'Escore guia a necessidade de imagem, não substitui o julgamento: alto Alvarado em homem jovem permite ir direto à cirurgia em muitos serviços.',
  'Plastrão bem estabelecido é uma armadilha cirúrgica: operar um bloco inflamatório aumenta lesão de alça e colectomia desnecessária.',
  'Idoso com plastrão ou abscesso: pense em câncer de ceco perfurado e faça colonoscopia.'],
 mnemonics:[
  {n:'MANTRELS',t:'Migração, Anorexia, Náusea, Tenderness (2), Rebound, Elevação de temperatura, Leucocitose (2), Shift. Só os dois "T" e "L" valem 2.'},
  {n:'4, 5 a 6, 7',t:'Até 4 observa, 5 a 6 faz imagem, 7 ou mais pensa em cirurgia.'},
  {n:'Criança e gestante sem raio',t:'Ultrassonografia primeiro, depois ressonância.'}],
 pitfalls:[
  'Manter antibiótico por dias após apendicectomia de apendicite não complicada.',
  'Operar de imediato um plastrão de 7 dias em paciente estável.',
  'Esquecer a colonoscopia de controle no adulto de mais de 40 anos tratado de forma conservadora.',
  'Indicar tratamento só com antibiótico quando há apendicolito, sem discutir o risco maior de falha.'],
 recall:[
  {q:'Quais itens do Alvarado valem 2 pontos?',a:'Dor à palpação da fossa ilíaca direita e leucocitose.'},
  {q:'Qual exame inicial na criança com suspeita de apendicite?',a:'Ultrassonografia.'},
  {q:'Em quem o tratamento só com antibiótico tem maior chance de falhar?',a:'Pacientes com apendicolito na tomografia.'},
  {q:'Conduta no plastrão apendicular de 6 dias em paciente estável sem peritonite difusa?',a:'Antibiótico, drenagem percutânea se houver abscesso de tamanho drenável e colonoscopia posterior se mais de 40 anos.'},
  {q:'Qual sinal sugere apendicite retrocecal?',a:'Sinal do psoas.'},
  {q:'Antibiótico após apendicectomia de apendicite não complicada?',a:'Não; só a profilaxia antes da incisão.'}],
 practice:['Calcule o Alvarado de um caso: homem de 22 anos, dor migratória, anorexia, vômito, dor e descompressão dolorosa em FID, 37,8 °C, 14 mil leucócitos com desvio.','Explique para um colega por que plastrão não se opera de imediato.'],
 refs:[
  {t:'Di Saverio S, et al. Diagnosis and treatment of acute appendicitis: 2020 update of the WSES Jerusalem guidelines. World J Emerg Surg. 2020.',q:'2020 update of the WSES Jerusalem guidelines acute appendicitis'},
  {t:'CODA Collaborative. A randomized trial comparing antibiotics with appendectomy for appendicitis. N Engl J Med. 2020.',q:'CODA randomized trial antibiotics appendectomy NEJM 2020'},
  {t:'Sawyer RG, et al. Trial of short-course antimicrobial therapy for intraabdominal infection (STOP-IT). N Engl J Med. 2015.',q:'STOP-IT short-course antimicrobial therapy intraabdominal infection NEJM 2015'}],
 note:'Síntese das diretrizes da sociedade mundial de cirurgia de emergência.'
},
'ciraa_2':{
 updated:'2026-11',
 pretest:['Quais são os critérios de Tóquio para diagnóstico de colecistite aguda?','O que define colecistite grau II?','Qual é a diferença entre tríade de Charcot e pêntade de Reynolds?','Até quando a colecistectomia precoce é recomendada?'],
 sections:[
  {h:'Colecistite aguda: diagnóstico pelos critérios de Tóquio 2018',p:[
   'Em mais de 90% dos casos, um cálculo impacta no infundíbulo ou no ducto cístico, a vesícula distende e inflama, e depois pode infectar. O quadro é dor no hipocôndrio direito por mais de 6 horas (a cólica biliar costuma passar antes disso), febre e sinal de Murphy.'],
   table:{head:['Grupo','Critérios'],rows:[
    ['A · sinais locais','Sinal de Murphy; massa, dor ou defesa no hipocôndrio direito'],
    ['B · sinais sistêmicos','Febre; PCR elevada; leucocitose'],
    ['C · imagem','Achados compatíveis: parede espessada (mais de 4 mm), vesícula distendida, líquido perivesicular, Murphy ultrassonográfico, cálculo impactado'],
    ['Diagnóstico','Suspeito: um de A mais um de B. Definitivo: A mais B mais C']]}},
  {h:'Gravidade da colecistite',table:{head:['Grau','Definição'],rows:[
   ['III · grave','Disfunção de algum órgão: cardiovascular (vasopressor), neurológica (rebaixamento), respiratória (PaO2/FiO2 menor que 300), renal (oligúria ou creatinina acima de 2), hepática (INR acima de 1,5), hematológica (plaquetas abaixo de 100 mil)'],
   ['II · moderada','Leucócitos acima de 18 mil, massa palpável dolorosa no hipocôndrio direito, sintomas há mais de 72 horas ou inflamação local acentuada (gangrena, abscesso pericolecístico ou hepático, peritonite biliar, colecistite enfisematosa)'],
   ['I · leve','Não preenche II nem III']]},
   after:'A ultrassonografia é o exame inicial. A cintilografia de vias biliares é a mais acurada (a vesícula não aparece porque o cístico está obstruído), útil quando a ultrassonografia é duvidosa.'},
  {h:'Tratamento da colecistite',list:[
   '<strong>Todos:</strong> jejum, hidratação, analgesia e antibiótico com cobertura para gram-negativos entéricos e anaeróbios conforme gravidade.',
   '<strong>Grau I e II com bom estado clínico:</strong> colecistectomia laparoscópica precoce na mesma internação, idealmente nas primeiras 72 horas, aceitável até cerca de 7 dias do início dos sintomas. Precoce tem menos complicações e menos internação que adiar 6 semanas.',
   '<strong>Grau III:</strong> colecistectomia precoce só em centro experiente e se os fatores de prognóstico permitirem (disfunção cardiovascular ou renal reversíveis rapidamente, sem icterícia grave ou disfunção neurológica). Nos demais, drenagem da vesícula (colecistostomia percutânea) e cirurgia eletiva depois.',
   '<strong>Paciente de alto risco cirúrgico em qualquer grau:</strong> considerar colecistostomia.',
   '<strong>Colecistite alitiásica:</strong> doente crítico, jejum prolongado, nutrição parenteral, grandes queimados. Evolui rápido para gangrena; colecistostomia é frequente.',
   '<strong>Colecistite enfisematosa:</strong> gás na parede, diabéticos, clostrídios. Alto risco de perfuração; cirurgia de urgência.']},
  {h:'Colangite aguda',p:[
   'É infecção da via biliar obstruída, quase sempre por coledocolitíase, estenose ou tumor. O perigo é a bacteremia rápida a partir de uma via biliar sob pressão. A tríade de Charcot (febre, icterícia, dor no hipocôndrio direito) é específica mas pouco sensível. A pêntade de Reynolds acrescenta hipotensão e confusão mental e indica colangite grave.'],
   table:{head:['Tóquio 2018','Colangite'],rows:[
    ['A · inflamação sistêmica','Febre ou calafrios; alterações laboratoriais de inflamação'],
    ['B · colestase','Icterícia (bilirrubina de 2 mg/dL ou mais); enzimas canaliculares alteradas'],
    ['C · imagem','Dilatação biliar; evidência da causa (cálculo, estenose, prótese)'],
    ['Diagnóstico','Suspeito: A mais B ou C. Definitivo: A mais B mais C'],
    ['Grau III','Disfunção orgânica'],
    ['Grau II','Dois ou mais de: leucócitos acima de 12 mil ou abaixo de 4 mil, febre de 39 °C ou mais, idade de 75 anos ou mais, bilirrubina de 5 mg/dL ou mais, hipoalbuminemia'],
    ['Grau I','Não preenche II nem III']]},
   after:'Tratamento: antibiótico e drenagem biliar, de preferência por CPRE. No grau III, drenagem urgente assim que o paciente for estabilizado. No grau II, drenagem precoce. No grau I, drenagem se não houver resposta ao antibiótico em 24 horas. Depois de resolver a colangite por cálculo, retirar a vesícula na mesma internação.'}
 ],
 flow:{title:'Dor no hipocôndrio direito com febre',nodes:[
  {k:'start',t:'Dor em hipocôndrio direito, febre, com ou sem icterícia'},
  {k:'do',t:'Hemograma, PCR, bilirrubinas, enzimas hepáticas, amilase ou lipase, ultrassonografia'},
  {k:'ask',t:'Icterícia ou via biliar dilatada com febre?',yes:'Colangite: antibiótico e graduar para definir momento da CPRE',no:'Pensar em colecistite'},
  {k:'ask',t:'Colecistite com disfunção orgânica (grau III)?',yes:'Suporte, antibiótico; colecistostomia ou cirurgia precoce só em centro experiente',no:'Grau I ou II'},
  {k:'ask',t:'Condição clínica para cirurgia?',yes:'Colecistectomia laparoscópica precoce, idealmente até 72 horas',no:'Antibiótico e colecistostomia se não melhorar'},
  {k:'end',t:'Litíase confirmada: retirar a vesícula na mesma internação sempre que possível'}]},
 reasoning:[
  'Febre mais icterícia muda tudo: você saiu da vesícula e entrou na via biliar. A conduta passa a ser desobstruir.',
  'Colecistite não costuma dar icterícia importante. Se der, pense em coledocolitíase associada ou síndrome de Mirizzi.',
  'O grau II da colecistite é o grau "local": leucocitose muito alta, massa, mais de 72 horas ou complicação local. O grau III é sempre sistêmico.',
  'Na colangite, o antibiótico sozinho não basta quando há obstrução: a via precisa ser drenada.'],
 mnemonics:[
  {n:'ABC de Tóquio',t:'A local, B sistêmico, C imagem. A mais B é suspeito, A mais B mais C é definitivo.'},
  {n:'Charcot 3, Reynolds 5',t:'Febre, icterícia, dor. Reynolds soma hipotensão e confusão.'},
  {n:'Grau II colecistite: 18, 72, massa, local',t:'Leucócitos acima de 18 mil, mais de 72 horas, massa palpável ou complicação local.'}],
 pitfalls:[
  'Adiar colecistectomia de rotina por 6 semanas em paciente apto.',
  'Tratar colangite grave só com antibiótico sem drenagem.',
  'Confundir sinal de Murphy (interrupção da inspiração) com ponto de Murphy.',
  'Achar que vesícula normal na ultrassonografia exclui colangite: a causa está no colédoco.'],
 recall:[
  {q:'Critério definitivo de colecistite aguda por Tóquio?',a:'Um sinal local, um sistêmico e imagem compatível.'},
  {q:'Cite três critérios de colecistite grau II.',a:'Leucócitos acima de 18 mil, massa palpável no hipocôndrio direito, sintomas há mais de 72 horas ou inflamação local acentuada.'},
  {q:'Qual exame é mais acurado para colecistite quando a ultrassonografia é duvidosa?',a:'Cintilografia de vias biliares.'},
  {q:'O que é a pêntade de Reynolds?',a:'Febre, icterícia, dor no hipocôndrio direito, hipotensão e confusão mental.'},
  {q:'Qual o tratamento definitivo da colangite por cálculo?',a:'Antibiótico, drenagem biliar por CPRE e colecistectomia na mesma internação.'},
  {q:'Quem tem colecistite alitiásica?',a:'Doentes críticos: jejum prolongado, nutrição parenteral, grandes queimados, pós-operatório de grande porte.'}],
 practice:['Classifique: mulher de 68 anos, dor há 4 dias no hipocôndrio direito, 21 mil leucócitos, sem disfunção orgânica.','Desenhe o algoritmo de colangite por grau, com o momento da CPRE.'],
 refs:[
  {t:'Yokoe M, et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholecystitis. J Hepatobiliary Pancreat Sci. 2018.',q:'Tokyo Guidelines 2018 diagnostic criteria severity grading acute cholecystitis'},
  {t:'Kiriyama S, et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholangitis. J Hepatobiliary Pancreat Sci. 2018.',q:'Tokyo Guidelines 2018 diagnostic criteria severity grading acute cholangitis'},
  {t:'Pisano M, et al. 2020 WSES updated guidelines for the diagnosis and treatment of acute calculus cholecystitis. World J Emerg Surg. 2020.',q:'2020 WSES updated guidelines acute calculus cholecystitis'}],
 note:'Critérios de Tóquio 2018 e diretriz da sociedade mundial de cirurgia de emergência.'
},
'ciraa_3':{
 updated:'2026-11',
 pretest:['Qual é o exame de imagem de escolha na suspeita de diverticulite?','Descreva os quatro estágios de Hinchey.','A partir de que tamanho o abscesso diverticular deve ser drenado?','Toda diverticulite não complicada precisa de antibiótico?'],
 sections:[
  {h:'Doença diverticular e diverticulite',p:[
   'Divertículos do cólon são pseudodivertículos: mucosa e submucosa herniadas por pontos fracos da parede onde entram os vasos retos. No ocidente predominam no sigmoide, ligados a dieta pobre em fibras e alta pressão intraluminal. Diverticulite é a inflamação de um divertículo, com microperfuração. A apresentação típica é dor na fossa ilíaca esquerda, febre, alteração do hábito intestinal e leucocitose, às vezes chamada de "apendicite do lado esquerdo".'],
   after:'O exame de escolha é a tomografia com contraste: confirma o diagnóstico, gradua a gravidade e mostra abscesso ou perfuração. Colonoscopia está contraindicada na fase aguda pelo risco de perfuração.'},
  {h:'Classificação de Hinchey (modificada)',table:{head:['Estágio','Achado','Conduta habitual'],rows:[
   ['0','Diverticulite clínica leve','Tratamento clínico'],
   ['Ia','Inflamação pericólica ou fleimão, sem abscesso','Tratamento clínico'],
   ['Ib','Abscesso pericólico pequeno','Antibiótico; drenar se tamanho permitir'],
   ['II','Abscesso pélvico, retroperitoneal ou distante','Drenagem percutânea e antibiótico'],
   ['III','Peritonite purulenta generalizada','Cirurgia'],
   ['IV','Peritonite fecal','Cirurgia de urgência']]},
   after:'A forma prática de raciocinar é dividir em não complicada (só inflamação) e complicada (abscesso, perfuração, fístula, obstrução ou estenose).'},
  {h:'Tratamento',list:[
   '<strong>Não complicada, imunocompetente, sem sepse, tolerando via oral:</strong> tratamento ambulatorial, dieta líquida no início e reavaliação. O antibiótico pode ser dispensado nesse grupo selecionado (estudos DIABOLO e AVOD), mas é indicado se houver comorbidade relevante, imunossupressão, sinais de sepse ou PCR muito alta.',
   '<strong>Abscesso:</strong> menor que cerca de 4 cm, antibiótico intravenoso; a partir de 4 a 5 cm, drenagem percutânea guiada por imagem mais antibiótico.',
   '<strong>Peritonite purulenta ou fecal:</strong> cirurgia. Em paciente instável ou com peritonite fecal, operação de Hartmann (ressecção do sigmoide, colostomia terminal e coto retal fechado). Em paciente estável, ressecção com anastomose primária, com ou sem ileostomia de proteção, é alternativa equivalente ou melhor em centros experientes.',
   '<strong>Depois do episódio:</strong> colonoscopia em cerca de 6 a 8 semanas, sobretudo após diverticulite complicada ou se não houver colonoscopia recente, para excluir câncer.',
   '<strong>Colectomia eletiva:</strong> decidida caso a caso pela gravidade, recorrência e qualidade de vida. A regra antiga de operar após dois episódios não é mais usada. Imunossuprimidos e doença complicada (fístula, estenose) tendem a ir para cirurgia.']},
  {h:'Complicações crônicas',list:[
   '<strong>Fístula colovesical:</strong> a mais comum, com pneumatúria e fecalúria, mais em homens.',
   '<strong>Fístula colovaginal:</strong> em mulheres histerectomizadas.',
   '<strong>Estenose:</strong> obstrução do cólon esquerdo; diferencial obrigatório com câncer.']}
 ],
 flow:{title:'Dor em fossa ilíaca esquerda com febre',nodes:[
  {k:'start',t:'Suspeita de diverticulite aguda'},
  {k:'do',t:'Tomografia de abdome com contraste'},
  {k:'ask',t:'Peritonite generalizada (Hinchey III ou IV)?',yes:'Reanimação, antibiótico e cirurgia: Hartmann se instável ou fecal; anastomose primária se estável',no:'Seguir'},
  {k:'ask',t:'Abscesso de 4 cm ou mais?',yes:'Drenagem percutânea e antibiótico intravenoso',no:'Seguir'},
  {k:'ask',t:'Não complicada, imunocompetente, sem sepse e aceitando via oral?',yes:'Ambulatorial, antibiótico seletivo, reavaliação em 48 a 72 horas',no:'Internar e antibiótico intravenoso'},
  {k:'end',t:'Colonoscopia em 6 a 8 semanas e decisão individual sobre colectomia'}]},
 reasoning:[
  'Hinchey separa bem quem drena (abscesso, I e II) de quem opera (peritonite, III e IV).',
  'Colonoscopia na fase aguda é proibida; depois, é obrigatória para excluir neoplasia mascarada.',
  'Pneumatúria em idoso: pense em fístula colovesical por diverticulite antes de câncer de bexiga.',
  'Hartmann é a cirurgia do paciente grave; anastomose primária é do paciente estável.'],
 mnemonics:[
  {n:'Hinchey 1 e 2 drena, 3 e 4 opera',t:'Abscesso pericólico e distante drenam; peritonite purulenta e fecal operam.'},
  {n:'4 cm',t:'Abaixo de cerca de 4 cm, antibiótico; acima, drenagem percutânea.'},
  {n:'Seis a oito',t:'Colonoscopia seis a oito semanas depois do episódio.'}],
 pitfalls:[
  'Pedir colonoscopia na fase aguda.',
  'Indicar colectomia automática após dois episódios.',
  'Fazer anastomose primária em paciente chocado com peritonite fecal.',
  'Esquecer que o antibiótico é seletivo na diverticulite não complicada do imunocompetente.'],
 recall:[
  {q:'Exame de escolha na suspeita de diverticulite?',a:'Tomografia com contraste.'},
  {q:'O que é Hinchey II?',a:'Abscesso pélvico, retroperitoneal ou distante.'},
  {q:'Conduta em abscesso diverticular de 6 cm em paciente estável?',a:'Drenagem percutânea e antibiótico.'},
  {q:'O que é a operação de Hartmann?',a:'Ressecção do sigmoide com colostomia terminal e fechamento do coto retal.'},
  {q:'Qual é a fístula mais comum da diverticulite?',a:'Colovesical.'},
  {q:'Quando fazer colonoscopia após diverticulite?',a:'Cerca de 6 a 8 semanas após o episódio.'}],
 practice:['Escreva a conduta para Hinchey Ia, II, III e IV em uma linha cada.','Explique a um paciente por que ele não precisa de antibiótico numa diverticulite leve.'],
 refs:[
  {t:'Sartelli M, et al. 2020 update of the WSES guidelines for the management of acute colonic diverticulitis in the emergency setting. World J Emerg Surg. 2020.',q:'2020 update WSES guidelines acute colonic diverticulitis emergency setting'},
  {t:'Hall J, et al. The American Society of Colon and Rectal Surgeons clinical practice guidelines for the management of left-sided colonic diverticulitis. Dis Colon Rectum. 2020.',q:'ASCRS clinical practice guidelines left-sided colonic diverticulitis 2020'},
  {t:'Daniels L, et al. Randomized clinical trial of observational versus antibiotic treatment for a first episode of CT-proven uncomplicated acute diverticulitis (DIABOLO). Br J Surg. 2017.',q:'DIABOLO observational versus antibiotic uncomplicated diverticulitis Br J Surg 2017'}],
 note:'Diretrizes da sociedade mundial de cirurgia de emergência e da sociedade americana de coloproctologia.'
},
'ciraa_4':{
 updated:'2026-11',
 pretest:['Qual é a causa mais comum de obstrução do intestino delgado? E do cólon?','Como diferenciar delgado de cólon na radiografia?','O que é obstrução em alça fechada e por que é perigosa?','Qual é a conduta inicial no volvo de sigmoide sem sinais de gangrena?'],
 sections:[
  {h:'Delgado versus cólon',table:{head:['','Delgado','Cólon'],rows:[
   ['Causa mais comum','Aderências (bridas) de cirurgia prévia; depois hérnias','Câncer colorretal; depois volvo e diverticulite'],
   ['Vômitos','Precoces e abundantes (quanto mais alta, mais cedo)','Tardios, podem ser fecaloides'],
   ['Distensão','Menor, central','Maior, periférica'],
   ['Radiografia','Alças centrais, pregas coniventes que cruzam toda a alça (empilhamento de moedas), níveis hidroaéreos','Alças periféricas, haustrações que não cruzam toda a alça'],
   ['Calibre de alerta','Mais de 3 cm','Mais de 6 cm; ceco acima de 9 a 12 cm']]},
   after:'Regra 3, 6, 9: diâmetro normal máximo de cerca de 3 cm para o delgado, 6 cm para o cólon e 9 cm para o ceco. O ceco perfura primeiro por ter maior diâmetro e, pela lei de Laplace, maior tensão na parede.'},
  {h:'Sinais de sofrimento de alça (indicam cirurgia)',list:[
   'Clínicos: dor que deixa de ser cólica e fica contínua, febre, taquicardia, peritonite.',
   'Laboratoriais: leucocitose, acidose metabólica, lactato elevado.',
   'Tomográficos: parede espessada sem realce, pneumatose intestinal, gás no sistema porta, líquido livre, sinal do redemoinho no mesentério e obstrução em alça fechada.',
   'Obstrução em alça fechada: um segmento obstruído nas duas pontas (volvo, hérnia, ou cólon com válvula ileocecal competente). Não descomprime e evolui rápido para isquemia.']},
  {h:'Obstrução do delgado por bridas',p:[
   'Sem sinais de sofrimento, o tratamento inicial é conservador: jejum, sonda nasogástrica, hidratação e correção de eletrólitos. O contraste hidrossolúvel pela sonda (diatrizoato) tem valor diagnóstico e terapêutico: se chega ao cólon em até 24 horas, a resolução sem cirurgia é muito provável. Sem melhora em até 72 horas, ou com sinais de sofrimento a qualquer momento, opera-se.',
   'Abdome virgem de cirurgia com obstrução do delgado: hérnia, tumor ou outra causa. A tendência é investigar com tomografia e ter limiar mais baixo para cirurgia.',
   'Íleo biliar: fístula entre vesícula e duodeno, cálculo grande impacta no íleo terminal. Tríade de Rigler na imagem: pneumobilia, obstrução do delgado e cálculo ectópico. Não confundir com o sinal de Rigler do pneumoperitônio.']},
  {h:'Obstrução do cólon',list:[
   '<strong>Câncer:</strong> causa mais comum. No cólon esquerdo, obstrui mais; no direito, sangra e anemia. Tratamento cirúrgico, ou prótese endoscópica como ponte em casos selecionados.',
   '<strong>Volvo de sigmoide:</strong> idoso, constipação crônica, megacólon chagásico no Brasil. Radiografia com alça em U invertido ou grão de café. Sem gangrena: descompressão por retossigmoidoscopia com sonda, seguida de sigmoidectomia na mesma internação pela alta recorrência. Com gangrena, perfuração ou falha da descompressão: cirurgia (Hartmann).',
   '<strong>Volvo de ceco:</strong> mais jovem, alça dilatada para o quadrante superior esquerdo. Tratamento cirúrgico (colectomia direita); a descompressão endoscópica raramente funciona.',
   '<strong>Pseudo-obstrução colônica (Ogilvie):</strong> dilatação sem obstrução mecânica, em pacientes graves e acamados. Corrigir eletrólitos e suspender drogas; neostigmina se ceco muito dilatado e sem contraindicação; descompressão colonoscópica se falhar.']}
 ],
 flow:{title:'Obstrução intestinal',nodes:[
  {k:'start',t:'Cólica, vômitos, distensão e parada de eliminação'},
  {k:'do',t:'Reposição volêmica, eletrólitos, SNG, exame das hérnias, radiografia e tomografia'},
  {k:'ask',t:'Sinais de sofrimento ou alça fechada?',yes:'Cirurgia de urgência',no:'Seguir'},
  {k:'ask',t:'Delgado por bridas?',yes:'Conservador com contraste hidrossolúvel; cirurgia se falhar em 72 horas',no:'Pensar em cólon'},
  {k:'ask',t:'Volvo de sigmoide sem gangrena?',yes:'Descompressão endoscópica e sigmoidectomia na mesma internação',no:'Câncer ou volvo de ceco: abordagem cirúrgica'},
  {k:'end',t:'Reavaliação clínica seriada a cada poucas horas'}]},
 reasoning:[
  'Pergunta-chave: tem cicatriz no abdome? Se sim, bridas. Se não, procure hérnia e tumor.',
  'O que define cirurgia é sofrimento de alça, não o tempo de obstrução isoladamente.',
  'Volvo de sigmoide desfeito por endoscopia volta em mais da metade dos casos: por isso a cirurgia eletiva na mesma internação.',
  'Válvula ileocecal competente transforma obstrução de cólon em alça fechada: o ceco é quem rompe.'],
 mnemonics:[
  {n:'3, 6, 9',t:'Delgado 3 cm, cólon 6 cm, ceco 9 cm.'},
  {n:'Grão de café',t:'Volvo de sigmoide na radiografia.'},
  {n:'Rigler triplo',t:'Pneumobilia, obstrução de delgado e cálculo fora do lugar: íleo biliar.'}],
 pitfalls:[
  'Manter conservador em paciente com dor contínua e acidose.',
  'Não examinar a região femoral em mulher idosa com obstrução.',
  'Tentar descompressão endoscópica em volvo com sinais de gangrena.',
  'Confundir tríade de Rigler (íleo biliar) com sinal de Rigler (pneumoperitônio).'],
 recall:[
  {q:'Causa mais comum de obstrução do delgado?',a:'Aderências pós-operatórias.'},
  {q:'Causa mais comum de obstrução do cólon no adulto?',a:'Câncer colorretal.'},
  {q:'Como as pregas do delgado aparecem na radiografia?',a:'Pregas coniventes que atravessam toda a largura da alça, aspecto de pilha de moedas.'},
  {q:'Para que serve o contraste hidrossolúvel na obstrução por bridas?',a:'Prever resolução não operatória e ajudar a resolvê-la; contraste no cólon em 24 horas indica sucesso provável.'},
  {q:'Conduta no volvo de sigmoide sem gangrena?',a:'Descompressão endoscópica e sigmoidectomia eletiva na mesma internação.'},
  {q:'O que é a tríade de Rigler?',a:'Pneumobilia, obstrução de delgado e cálculo ectópico, típica do íleo biliar.'}],
 practice:['Liste cinco sinais de sofrimento de alça que mudam a conduta para cirurgia.','Compare volvo de sigmoide e de ceco em quatro linhas.'],
 refs:[
  {t:'Ten Broek RPG, et al. Bologna guidelines for diagnosis and management of adhesive small bowel obstruction: 2017 update. World J Emerg Surg. 2018.',q:'Bologna guidelines adhesive small bowel obstruction 2017 update'},
  {t:'Tian BWCA, et al. WSES consensus guidelines on sigmoid volvulus management. World J Emerg Surg. 2023.',q:'WSES consensus guidelines sigmoid volvulus management 2023'},
  {t:'Pisano M, et al. 2017 WSES guidelines on colon and rectal cancer emergencies: obstruction and perforation. World J Emerg Surg. 2018.',q:'WSES guidelines colon and rectal cancer emergencies obstruction and perforation'}],
 note:'Diretrizes de Bolonha e da sociedade mundial de cirurgia de emergência.'
},
'ciraa_5':{
 updated:'2026-11',
 pretest:['Qual é a causa mais comum de pneumoperitônio não iatrogênico?','Qual radiografia mostra melhor o pneumoperitônio?','O que é o sinal de Jobert?','Qual é a técnica cirúrgica clássica na úlcera duodenal perfurada?'],
 sections:[
  {h:'Quadro do abdome perfurativo',p:[
   'Uma víscera oca rompe e o conteúdo (ácido, bile, fezes) contamina o peritônio. A dor é súbita, intensa, como uma facada, e rapidamente se torna difusa. O abdome fica rígido em tábua. Nas primeiras horas a peritonite pode ser química e só depois bacteriana. Em idosos e imunossuprimidos, o quadro pode ser surpreendentemente pobre.',
   'A causa mais comum é a úlcera péptica perfurada, em geral na parede anterior do duodeno. Outras causas: diverticulite perfurada, câncer de cólon, corpo estranho, iatrogenia endoscópica e a síndrome de Boerhaave (ruptura do esôfago após vômitos).']},
  {h:'Imagem',list:[
   '<strong>Radiografia de tórax em pé:</strong> ar sob as cúpulas diafragmáticas. Detecta volumes pequenos se o paciente ficar em pé alguns minutos.',
   '<strong>Decúbito lateral esquerdo com raios horizontais:</strong> para quem não fica em pé; o ar sobe entre fígado e parede.',
   '<strong>Sinal de Rigler:</strong> na radiografia deitado, as duas faces da parede da alça ficam visíveis porque há gás dentro e fora dela.',
   '<strong>Tomografia:</strong> mais sensível, mostra pequenas bolhas e frequentemente o local da perfuração.',
   '<strong>Sinal de Jobert:</strong> timpanismo na percussão da área hepática, por ar livre na frente do fígado.',
   'Ausência de pneumoperitônio não exclui perfuração: uma parte dos casos não mostra ar livre.']},
  {h:'Úlcera péptica perfurada',p:[
   'Conduta: reanimação, sonda nasogástrica, inibidor de bomba de prótons intravenoso, antibiótico e cirurgia de urgência. A técnica clássica é a rafia da perfuração com remendo de omento (Graham), por laparoscopia ou laparotomia, com lavagem da cavidade. Depois, pesquisar e erradicar Helicobacter pylori e suspender anti-inflamatórios.',
   'Úlcera gástrica perfurada: biopsiar as bordas ou ressecar, porque pode ser câncer. O tratamento conservador (método de Taylor) é exceção: paciente estável, perfuração bloqueada sem extravasamento de contraste e sem peritonite difusa, sob vigilância cirúrgica.',
   'O escore de Boey estima mortalidade: choque à admissão, doença clínica grave associada e perfuração com mais de 24 horas. Cada item soma risco.']}
 ],
 flow:{title:'Suspeita de víscera perfurada',nodes:[
  {k:'start',t:'Dor súbita e intensa, abdome em tábua'},
  {k:'do',t:'Reanimação, analgesia, SNG, antibiótico, IBP intravenoso'},
  {k:'do',t:'Radiografia de tórax em pé ou tomografia'},
  {k:'ask',t:'Pneumoperitônio com peritonite?',yes:'Cirurgia de urgência',no:'Tomografia para localizar e definir causa'},
  {k:'ask',t:'Úlcera duodenal perfurada?',yes:'Rafia com omento, lavagem, erradicar H. pylori',no:'Gástrica: biópsia das bordas; cólon: ressecção conforme contaminação'},
  {k:'end',t:'Seguimento e prevenção da recidiva'}]},
 reasoning:[
  'Dor em facada com abdome em tábua: perfuração até prova em contrário.',
  'O exame clássico de prova é radiografia de tórax em pé; o mais sensível é a tomografia.',
  'Úlcera gástrica pode ser câncer: sempre biópsia.',
  'A doença ulcerosa é hoje tratada com IBP e erradicação; cirurgias de vagotomia ficaram para exceções.'],
 mnemonics:[
  {n:'Graham',t:'Remendo de omento na úlcera duodenal perfurada.'},
  {n:'Boey: choque, doença e 24',t:'Três fatores que aumentam a mortalidade na úlcera perfurada.'},
  {n:'Jobert',t:'Perdeu a macicez do fígado: tem ar livre.'}],
 pitfalls:[
  'Excluir perfuração porque a radiografia não mostrou ar.',
  'Rafiar úlcera gástrica sem biópsia.',
  'Esquecer de erradicar Helicobacter pylori após a cirurgia.',
  'Confundir sinal de Rigler com tríade de Rigler.'],
 recall:[
  {q:'Causa mais comum de abdome perfurativo?',a:'Úlcera péptica perfurada, geralmente duodenal anterior.'},
  {q:'Qual a técnica de Graham?',a:'Rafia da perfuração com remendo de omento.'},
  {q:'Quais os fatores do escore de Boey?',a:'Choque à admissão, doença clínica grave associada e perfuração há mais de 24 horas.'},
  {q:'O que é o sinal de Jobert?',a:'Timpanismo na área de macicez hepática por ar livre.'},
  {q:'Qual o exame mais sensível para pneumoperitônio?',a:'Tomografia.'},
  {q:'Por que biopsiar úlcera gástrica perfurada?',a:'Pode ser adenocarcinoma gástrico.'}],
 practice:['Monte a prescrição inicial de um paciente com úlcera perfurada antes da cirurgia.','Diferencie sinal de Rigler, tríade de Rigler e sinal de Jobert.'],
 refs:[
  {t:'Tarasconi A, et al. Perforated and bleeding peptic ulcer: WSES guidelines. World J Emerg Surg. 2020.',q:'Perforated and bleeding peptic ulcer WSES guidelines 2020 Tarasconi'},
  {t:'Boey J, et al. Risk stratification in perforated duodenal ulcers. Ann Surg. 1987.',q:'Boey risk stratification perforated duodenal ulcers Ann Surg 1987'},
  {t:'Townsend CM, et al. Sabiston Textbook of Surgery. 21ª ed. Capítulo Stomach.',q:'Sabiston stomach chapter perforated ulcer'}],
 note:'Diretriz da sociedade mundial de cirurgia de emergência para úlcera perfurada e sangrante.'
},
'ciraa_6':{
 updated:'2026-11',
 pretest:['Qual é a apresentação clássica da isquemia mesentérica aguda?','Quais são as quatro causas de isquemia mesentérica aguda?','Qual é o exame de imagem de escolha?','O que é second look?'],
 sections:[
  {h:'Isquemia mesentérica aguda',p:[
   'É rara, mas tem mortalidade alta porque o diagnóstico costuma vir tarde. O marco clínico é a dor abdominal intensa, desproporcional ao exame físico, que pode ser quase normal nas primeiras horas. Quando aparecem peritonite, acidose e lactato alto, o intestino frequentemente já necrosou.'],
   table:{head:['Causa','Contexto','Pista'],rows:[
    ['Embolia arterial','Fibrilação atrial, infarto recente, valvopatia; êmbolo para a mesentérica superior','Início súbito, outros eventos embólicos'],
    ['Trombose arterial','Aterosclerose da origem da mesentérica superior','Angina abdominal prévia (dor pós-prandial, medo de comer, emagrecimento)'],
    ['Trombose venosa mesentérica','Trombofilia, neoplasia, cirrose, pós-operatório, anticoncepcional','Instalação mais lenta, pacientes mais jovens'],
    ['Isquemia não oclusiva','Baixo débito: choque, IC, vasopressores, digital, cocaína, diálise','Paciente grave na UTI']]}},
  {h:'Diagnóstico e tratamento',list:[
   '<strong>AngioTC</strong> com fase arterial e venosa é o exame de escolha: mostra o vaso ocluído, a parede intestinal, pneumatose e gás portal. Não atrase a angioTC por causa da função renal em suspeita forte.',
   '<strong>Laboratório:</strong> leucocitose, acidose metabólica e lactato elevado são comuns, mas inespecíficos e tardios. D-dímero normal torna o diagnóstico menos provável.',
   '<strong>Medidas imediatas:</strong> heparina não fracionada em dose plena, reanimação, antibiótico de amplo espectro, sonda nasogástrica.',
   '<strong>Arterial (embolia ou trombose):</strong> revascularização urgente, por embolectomia ou cirurgia aberta, ou por via endovascular, associada à ressecção do intestino inviável. Laparotomia de revisão (second look) em 24 a 48 horas para reavaliar viabilidade.',
   '<strong>Venosa:</strong> anticoagulação é o tratamento principal; cirurgia só se houver necrose.',
   '<strong>Não oclusiva:</strong> tratar a causa do baixo débito, suspender vasoconstritores possíveis e considerar vasodilatador intra-arterial (papaverina).']},
  {h:'Colite isquêmica',p:[
   'É a forma mais comum de isquemia intestinal, geralmente não oclusiva, em idosos. Atinge zonas de transição da irrigação: ângulo esplênico (ponto de Griffiths) e junção retossigmoide (ponto de Sudeck). O quadro é dor abdominal leve a moderada seguida de diarreia com sangue em 24 horas. A maioria resolve com suporte. Colonoscopia confirma; cirurgia só para gangrena, perfuração ou piora. Diferente da isquemia mesentérica, aqui o sangramento é típico e a dor não é desproporcional.'],
   table:{head:['','Isquemia mesentérica aguda','Colite isquêmica'],rows:[
    ['Território','Delgado e cólon direito','Cólon esquerdo, zonas de transição'],
    ['Dor','Intensa, desproporcional','Leve a moderada'],
    ['Sangramento','Tardio','Precoce, diarreia com sangue'],
    ['Exame','AngioTC','Colonoscopia, tomografia'],
    ['Tratamento','Revascularização e ressecção','Suporte na maioria']]}}
 ],
 flow:{title:'Dor desproporcional ao exame',nodes:[
  {k:'start',t:'Dor intensa com abdome pouco alterado, fator de risco cardiovascular ou FA'},
  {k:'do',t:'Lactato, gasometria, D-dímero e angioTC sem atrasar'},
  {k:'ask',t:'Oclusão arterial?',yes:'Heparina plena, revascularização e ressecção do inviável; second look',no:'Seguir'},
  {k:'ask',t:'Trombose venosa mesentérica?',yes:'Anticoagulação; cirurgia se necrose',no:'Isquemia não oclusiva provável'},
  {k:'do',t:'Corrigir baixo débito, suspender vasoconstritores, vasodilatador intra-arterial'},
  {k:'end',t:'Peritonite em qualquer momento: laparotomia'}]},
 reasoning:[
  'Em prova, "dor desproporcional ao exame físico" é a frase da isquemia mesentérica.',
  'Fibrilação atrial e embolia, angina abdominal e trombose, trombofilia e trombose venosa, paciente de UTI com noradrenalina e isquemia não oclusiva.',
  'Lactato normal no início não exclui. Esperar acidose é perder o intestino.',
  'Colite isquêmica sangra; mesentérica aguda dói.'],
 mnemonics:[
  {n:'Dor sem sinais',t:'Dor desproporcional ao exame: isquemia mesentérica.'},
  {n:'Griffiths e Sudeck',t:'Pontos de transição: ângulo esplênico e retossigmoide.'},
  {n:'EmTromVeNO',t:'Embolia, Trombose arterial, Venosa, Não Oclusiva.'}],
 pitfalls:[
  'Esperar lactato alterado para pedir angioTC.',
  'Deixar de anticoagular enquanto se aguarda a cirurgia.',
  'Esquecer o second look depois de revascularizar.',
  'Indicar cirurgia de rotina na colite isquêmica leve.'],
 recall:[
  {q:'Frase clínica clássica da isquemia mesentérica aguda?',a:'Dor desproporcional ao exame físico.'},
  {q:'Causa mais comum de isquemia mesentérica aguda?',a:'Embolia da artéria mesentérica superior, geralmente por fibrilação atrial.'},
  {q:'Exame de escolha?',a:'AngioTC.'},
  {q:'Tratamento da trombose venosa mesentérica sem necrose?',a:'Anticoagulação.'},
  {q:'Onde ocorre a colite isquêmica?',a:'Zonas de transição: ângulo esplênico (Griffiths) e retossigmoide (Sudeck).'},
  {q:'Para que serve o second look?',a:'Reavaliar a viabilidade do intestino 24 a 48 horas após a revascularização.'}],
 practice:['Faça a correspondência entre as quatro causas e os quatro perfis clínicos.','Compare isquemia mesentérica aguda e colite isquêmica em uma tabela.'],
 refs:[
  {t:'Bala M, et al. Acute mesenteric ischemia: updated guidelines of the World Society of Emergency Surgery. World J Emerg Surg. 2022.',q:'Acute mesenteric ischemia updated guidelines World Society of Emergency Surgery 2022'},
  {t:'Björck M, et al. Management of the diseases of mesenteric arteries and veins: ESVS clinical practice guidelines. Eur J Vasc Endovasc Surg. 2017.',q:'ESVS clinical practice guidelines diseases of mesenteric arteries and veins 2017'},
  {t:'Brandt LJ, et al. ACG clinical guideline: epidemiology, risk factors, patterns of presentation, diagnosis, and management of colon ischemia. Am J Gastroenterol. 2015.',q:'ACG clinical guideline colon ischemia 2015'}],
 note:'Diretrizes de isquemia mesentérica e colite isquêmica.'
},
'ciraa_7':{
 updated:'2026-11',
 pretest:['Qual é a causa mais importante de abdome agudo hemorrágico na mulher em idade fértil?','Qual é a tríade clínica do aneurisma de aorta roto?','O que é hipotensão permissiva?','O que é o sinal de Kehr?'],
 sections:[
  {h:'Reconhecimento',p:[
   'O abdome agudo hemorrágico combina dor de início súbito com sinais de hipovolemia: taquicardia, hipotensão, palidez, queda de hemoglobina. A irritação peritoneal pelo sangue costuma ser menor do que a esperada. A ultrassonografia à beira-leito mostrando líquido livre em paciente instável muda a conduta para cirurgia imediata.']},
  {h:'Principais causas',table:{head:['Causa','Quem','Pista','Conduta'],rows:[
   ['Gravidez ectópica rota','Mulher em idade fértil','Atraso menstrual, beta-hCG positivo, útero vazio, líquido livre','Instável: cirurgia (salpingectomia, em geral laparoscópica se possível)'],
   ['Cisto de corpo lúteo roto','Mulher jovem, segunda metade do ciclo','Beta-hCG negativo, líquido livre','Conservador se estável; cirurgia se instável'],
   ['Aneurisma de aorta abdominal roto','Homem idoso, tabagista, hipertenso','Dor abdominal ou lombar, hipotensão, massa pulsátil','Centro cirúrgico direto; reparo endovascular se anatomia permitir'],
   ['Ruptura de víscera sólida não traumática','Adenoma hepático (anticoncepcional), hepatocarcinoma, baço na mononucleose','Dor súbita no hipocôndrio, choque','Embolização ou cirurgia'],
   ['Hematoma da bainha do reto','Anticoagulado, tosse intensa','Massa dolorosa na parede que não some ao contrair o abdome (sinal de Fothergill)','Suporte, reverter anticoagulação, embolizar se necessário']]}},
  {h:'Aneurisma de aorta roto',p:[
   'A tríade clássica é dor abdominal ou lombar, hipotensão e massa pulsátil, presente em menos da metade dos casos. Pode imitar cólica renal: idoso com "cólica renal" pela primeira vez merece ultrassonografia da aorta. No paciente instável com diagnóstico conhecido de aneurisma, não se faz tomografia: vai-se ao centro cirúrgico.',
   'A reanimação usa hipotensão permissiva: aceitar pressão sistólica em torno de 70 a 90 mmHg, desde que o paciente esteja consciente, para não aumentar o sangramento antes do controle da aorta. Transfusão precoce é preferível a grandes volumes de cristaloide. O reparo endovascular (EVAR) tem menor mortalidade precoce quando a anatomia permite.']},
  {h:'Dor referida e sinais úteis',list:[
   '<strong>Sinal de Kehr:</strong> dor no ombro esquerdo por sangue sob o diafragma, clássica na ruptura do baço.',
   '<strong>Sinal de Cullen:</strong> equimose periumbilical; <strong>sinal de Grey Turner:</strong> equimose nos flancos. Indicam sangue retroperitoneal (pancreatite hemorrágica, ectópica rota, aneurisma roto).',
   '<strong>Sinal de Fothergill:</strong> massa da parede abdominal que persiste com a contração do reto abdominal, típica do hematoma da bainha.']}
 ],
 flow:{title:'Dor súbita com hipotensão',nodes:[
  {k:'start',t:'Dor abdominal súbita, taquicardia ou hipotensão'},
  {k:'do',t:'Dois acessos calibrosos, tipagem, hemoglobina, beta-hCG, ultrassonografia à beira-leito'},
  {k:'ask',t:'Mulher com beta-hCG positivo e líquido livre?',yes:'Gravidez ectópica rota: cirurgia se instável',no:'Seguir'},
  {k:'ask',t:'Idoso com massa pulsátil ou aorta dilatada?',yes:'Aneurisma roto: hipotensão permissiva e centro cirúrgico',no:'Seguir'},
  {k:'ask',t:'Estável após reanimação?',yes:'Tomografia com contraste para causa e embolização se indicada',no:'Laparotomia exploradora'},
  {k:'end',t:'Transfusão guiada por perda e coagulação'}]},
 reasoning:[
  'Dor súbita mais choque é hemorrágico ou perfurativo grave. Beta-hCG e ultrassonografia à beira-leito separam rápido as causas.',
  'Primeira "cólica renal" em idoso hipertenso tabagista: olhe a aorta.',
  'Na hemorragia não controlada, mais cristaloide é pior: transfusão e controle cirúrgico.'],
 mnemonics:[
  {n:'Kehr no ombro',t:'Sangue embaixo do diafragma esquerdo: baço.'},
  {n:'Cullen no centro, Grey Turner no flanco',t:'Equimoses de sangue retroperitoneal.'},
  {n:'Dor, choque, pulsátil',t:'Tríade do aneurisma roto.'}],
 pitfalls:[
  'Mandar paciente instável com aneurisma conhecido para tomografia.',
  'Ressuscitar com grandes volumes de cristaloide antes do controle do sangramento.',
  'Esquecer beta-hCG na mulher jovem com dor e hipotensão.',
  'Atribuir dor lombar com hipotensão a cólica renal no idoso.'],
 recall:[
  {q:'Tríade do aneurisma de aorta roto?',a:'Dor abdominal ou lombar, hipotensão e massa pulsátil.'},
  {q:'O que é hipotensão permissiva?',a:'Aceitar pressão sistólica mais baixa, com paciente consciente, até o controle cirúrgico do sangramento.'},
  {q:'Conduta na gravidez ectópica rota com instabilidade?',a:'Cirurgia imediata, em geral salpingectomia.'},
  {q:'O que é o sinal de Kehr?',a:'Dor referida no ombro esquerdo por sangue sob o diafragma, típica da ruptura esplênica.'},
  {q:'Qual sinal diferencia hematoma da bainha do reto de massa intra-abdominal?',a:'Sinal de Fothergill: a massa persiste com a contração do músculo.'}],
 practice:['Escreva a conduta da primeira hora para uma mulher de 28 anos com dor súbita, PA 80/50 e atraso menstrual.','Explique por que o aneurisma roto pode ser confundido com cólica renal.'],
 refs:[
  {t:'Wanhainen A, et al. European Society for Vascular Surgery 2024 clinical practice guidelines on the management of abdominal aorto-iliac artery aneurysms. Eur J Vasc Endovasc Surg. 2024.',q:'ESVS 2024 clinical practice guidelines abdominal aorto-iliac artery aneurysms'},
  {t:'American College of Obstetricians and Gynecologists. Practice Bulletin 193: Tubal ectopic pregnancy. 2018.',q:'ACOG Practice Bulletin 193 tubal ectopic pregnancy'},
  {t:'Townsend CM, et al. Sabiston Textbook of Surgery. 21ª ed. Capítulo Acute Abdomen.',q:'Sabiston acute abdomen chapter'}],
 note:'Diretriz europeia de aneurismas de 2024 e diretriz obstétrica americana.'
}
});
