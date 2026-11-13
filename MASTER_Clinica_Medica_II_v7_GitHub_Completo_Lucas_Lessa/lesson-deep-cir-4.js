/* Estudo aprofundado · Cirurgia · Coloproctologia, REMIT, cicatrização, queimaduras e vascular. Texto original. */
LessonDeep.add({
'cirproc_0':{
 updated:'2026-11',
 pretest:['Qual é a diferença entre hemorroida interna e externa?','Como se classifica a doença hemorroidária interna?','Qual é o tratamento ambulatorial mais eficaz para graus I a III?','Trombose hemorroidária externa com 24 horas: qual a conduta?'],
 sections:[
  {h:'Anatomia que explica a clínica',p:[
   'Os coxins hemorroidários são estruturas normais do canal anal. A doença aparece quando eles aumentam, deslizam ou sangram. A linha pectínea separa as hemorroidas internas (acima, cobertas por mucosa com inervação visceral, portanto indolores) das externas (abaixo, cobertas por anoderma com inervação somática, portanto dolorosas quando trombosam).',
   'A hemorroida interna sangra sangue vivo, que pinga ou mancha o papel após a evacuação, e pode prolapsar. Dor intensa não é típica de hemorroida interna: pense em trombose externa, fissura ou abscesso.']},
  {h:'Graus de Goligher (internas)',table:{head:['Grau','Achado','Tratamento habitual'],rows:[
   ['I','Sangra, não prolapsa','Medidas clínicas; ligadura elástica se persistir'],
   ['II','Prolapsa e reduz sozinha','Ligadura elástica'],
   ['III','Prolapsa e precisa de redução manual','Ligadura elástica em casos selecionados ou cirurgia'],
   ['IV','Prolapso irredutível','Hemorroidectomia']]},
   after:'Medidas clínicas para todos: fibras e água, evitar esforço e tempo prolongado no vaso sanitário, banho de assento morno, flavonoides para sintomas agudos. Cirurgia: hemorroidectomia aberta (Milligan-Morgan) ou fechada (Ferguson); alternativas como ligadura arterial guiada por Doppler e hemorroidopexia com grampeador.'},
  {h:'Situações especiais',list:[
   '<strong>Trombose hemorroidária externa:</strong> nódulo azulado, doloroso. Até cerca de 72 horas, excisão do trombo sob anestesia local alivia rápido. Depois disso, tratamento clínico, porque a dor já está melhorando.',
   '<strong>Ligadura elástica:</strong> só em hemorroida interna, acima da linha pectínea. Na externa causa dor intensa.',
   '<strong>Sangramento retal não é sempre hemorroida:</strong> acima de 45 a 50 anos, anemia, alteração do hábito intestinal, emagrecimento ou história familiar exigem colonoscopia.',
   '<strong>Gestação:</strong> tratamento conservador.']}
 ],
 flow:{title:'Sangramento anal vermelho vivo',nodes:[
  {k:'start',t:'Sangramento vivo à evacuação, com ou sem prolapso'},
  {k:'ask',t:'Sinais de alarme ou idade de rastreamento?',yes:'Colonoscopia antes de atribuir a hemorroidas',no:'Exame proctológico e anuscopia'},
  {k:'ask',t:'Dor intensa?',yes:'Pensar em trombose externa, fissura ou abscesso',no:'Hemorroida interna provável'},
  {k:'do',t:'Medidas clínicas para todos'},
  {k:'ask',t:'Grau I a III sem resposta?',yes:'Ligadura elástica',no:'Grau IV ou mista: hemorroidectomia'},
  {k:'end',t:'Trombose externa com menos de 72 horas: excisão do trombo'}]},
 reasoning:['Interna não dói, externa dói quando trombosa.','Ligadura só acima da linha pectínea.','O sangue vivo pode ser câncer: idade e sinais de alarme decidem a colonoscopia.'],
 mnemonics:[{n:'Goligher 1, 2, 3, 4',t:'Não sai, sai e volta, sai e empurro, sai e não volta.'},{n:'72 horas',t:'Trombose externa: excisar antes, tratar clinicamente depois.'},{n:'Pectínea divide dor',t:'Acima indolor, abaixo dolorosa.'}],
 pitfalls:['Fazer ligadura elástica em hemorroida externa.','Atribuir sangramento retal a hemorroida em paciente de 60 anos sem colonoscopia.','Operar trombose externa de 6 dias que já está melhorando.'],
 recall:[
  {q:'O que é hemorroida interna grau III?',a:'Prolapsa e precisa de redução manual.'},
  {q:'Tratamento ambulatorial mais eficaz para hemorroida interna?',a:'Ligadura elástica.'},
  {q:'Conduta na trombose externa com 24 horas?',a:'Excisão do trombo sob anestesia local.'},
  {q:'Por que a hemorroida interna não dói?',a:'Fica acima da linha pectínea, com inervação visceral.'},
  {q:'Indicação de hemorroidectomia?',a:'Grau IV, falha do tratamento ambulatorial, doença mista volumosa.'}],
 practice:['Classifique e trate: prolapso à evacuação que volta sozinho, sangramento ocasional.'],
 refs:[
  {t:'Hawkins AT, et al. The American Society of Colon and Rectal Surgeons clinical practice guidelines for the management of hemorrhoids. Dis Colon Rectum. 2024.',q:'ASCRS clinical practice guidelines management of hemorrhoids 2024'},
  {t:'van Tol RR, et al. European Society of Coloproctology guideline for haemorrhoidal disease. Colorectal Dis. 2020.',q:'European Society of Coloproctology guideline haemorrhoidal disease 2020'}],
 note:'Diretrizes americana e europeia de doença hemorroidária.'
},
'cirproc_1':{
 updated:'2026-11',
 pretest:['Onde fica a maioria das fissuras anais?','Quais achados caracterizam a fissura crônica?','Abscesso perianal precisa de antibiótico?','O que diz a regra de Goodsall?'],
 sections:[
  {h:'Fissura anal',p:[
   'É uma ulceração linear do anoderma, quase sempre na linha média posterior. Dor intensa durante e após a evacuação, como "cortar vidro", com sangramento pequeno. O espasmo do esfíncter interno reduz o fluxo sanguíneo e impede a cicatrização, fechando o ciclo.',
   'Fissura crônica (mais de 6 a 8 semanas) tem a tríade: plicoma sentinela, papila hipertrófica e fibras do esfíncter interno visíveis no fundo. Fissura lateral, múltipla ou indolor sugere outra causa: doença de Crohn, HIV, tuberculose, sífilis ou câncer.'],
   table:{head:['Etapa','Tratamento'],rows:[
    ['Aguda','Fibras, água, banho de assento, analgesia; muitas cicatrizam'],
    ['Crônica, primeira linha','Relaxamento químico do esfíncter: bloqueador de canal de cálcio tópico (diltiazem ou nifedipina, menos cefaleia) ou nitrato tópico; toxina botulínica'],
    ['Refratária','Esfincterotomia lateral interna, com maior taxa de cura e pequeno risco de incontinência']]}},
  {h:'Abscesso anorretal',p:[
   'A maioria começa em uma glândula anal infectada (teoria criptoglandular). Pela localização: perianal (o mais comum), isquiorretal, interesfinctérico e supraelevador. Dor perianal contínua, piora ao sentar, febre e abaulamento.',
   'Tratamento: drenagem cirúrgica assim que diagnosticado, sem esperar flutuação. Antibiótico não substitui drenagem e é reservado para celulite extensa, imunossupressão, diabetes, sepse ou prótese valvar. Cerca de um terço a metade evolui com fístula. Em diabéticos, cuidado com a gangrena de Fournier.']},
  {h:'Fístula anal',table:{head:['Tipo de Parks','Trajeto'],rows:[
   ['Interesfinctérica','Entre esfíncter interno e externo; a mais comum'],
   ['Transesfinctérica','Atravessa o esfíncter externo até a fossa isquiorretal'],
   ['Supraesfinctérica','Sobe acima do puborretal e desce'],
   ['Extraesfinctérica','Do reto à pele, por fora de todo o aparelho esfincteriano']]},
   after:'Regra de Goodsall: com o paciente em posição de litotomia e uma linha transversal passando pelo ânus, orifício externo posterior a essa linha tem trajeto curvo até a linha média posterior; orifício anterior tem trajeto reto e radial (exceção: orifício anterior a mais de 3 cm do ânus pode ir para a posterior). Tratamento: fistulotomia nas fístulas baixas que envolvem pouco esfíncter; seton, retalho de avanço ou LIFT nas complexas. Ressonância de pelve mapeia as complexas.'}
 ],
 flow:{title:'Dor anal',nodes:[
  {k:'start',t:'Dor anal'},
  {k:'ask',t:'Dor durante e após evacuar, sangramento pequeno, linha média posterior?',yes:'Fissura: tratamento clínico e relaxamento químico do esfíncter',no:'Seguir'},
  {k:'ask',t:'Dor contínua com febre e abaulamento?',yes:'Abscesso: drenagem cirúrgica',no:'Seguir'},
  {k:'ask',t:'Nódulo azulado doloroso?',yes:'Trombose hemorroidária externa',no:'Exame sob anestesia se dúvida'},
  {k:'do',t:'Após abscesso, vigiar formação de fístula'},
  {k:'end',t:'Fissura atípica: investigar Crohn, infecções e câncer'}]},
 reasoning:['Abscesso se drena; antibiótico é coadjuvante.','Fissura fora da linha média é bandeira vermelha.','Goodsall prevê onde está o orifício interno.'],
 mnemonics:[{n:'Posterior curva, anterior reta',t:'Regra de Goodsall.'},{n:'Plicoma, papila, fibras',t:'Tríade da fissura crônica.'},{n:'Pus, abre',t:'Abscesso anorretal: drenagem.'}],
 pitfalls:['Tratar abscesso só com antibiótico.','Esperar flutuação para drenar.','Fazer fistulotomia em fístula alta com grande parte do esfíncter.','Não investigar fissura lateral.'],
 recall:[
  {q:'Localização mais comum da fissura anal?',a:'Linha média posterior.'},
  {q:'Tríade da fissura crônica?',a:'Plicoma sentinela, papila hipertrófica e fibras do esfíncter interno expostas.'},
  {q:'Cirurgia para fissura crônica refratária?',a:'Esfincterotomia lateral interna.'},
  {q:'Tipo de fístula mais comum na classificação de Parks?',a:'Interesfinctérica.'},
  {q:'Tratamento do abscesso perianal?',a:'Drenagem cirúrgica.'}],
 practice:['Aplique Goodsall: orifício às 5 horas a 2 cm do ânus, paciente em litotomia.'],
 refs:[
  {t:'Stewart DB, et al. Clinical practice guideline for the management of anal fissures (ASCRS). Dis Colon Rectum. 2017.',q:'ASCRS clinical practice guideline management of anal fissures 2017'},
  {t:'Gaertner WB, et al. The ASCRS clinical practice guidelines for the management of anorectal abscess, fistula-in-ano, and rectovaginal fistula. Dis Colon Rectum. 2022.',q:'ASCRS clinical practice guidelines anorectal abscess fistula-in-ano 2022'}],
 note:'Diretrizes da sociedade americana de coloproctologia.'
},
'cirproc_2':{
 updated:'2026-11',
 pretest:['Com que idade se inicia o rastreamento do câncer colorretal no risco médio?','Por que o câncer de cólon direito costuma se apresentar com anemia?','Qual exame estadia localmente o câncer de reto?','O que é excisão total do mesorreto?'],
 sections:[
  {h:'Rastreamento',list:[
   '<strong>Risco médio:</strong> as diretrizes americanas (USPSTF 2021 e Sociedade Americana de Câncer) começam aos 45 anos e vão até 75. Muitas referências brasileiras e provas ainda usam 50 anos. No Brasil não há programa populacional organizado.',
   '<strong>Métodos:</strong> pesquisa de sangue oculto imunoquímica (FIT) anual, ou colonoscopia a cada 10 anos. Teste positivo exige colonoscopia.',
   '<strong>Parente de primeiro grau com câncer antes dos 60 anos (ou dois parentes):</strong> colonoscopia aos 40 anos ou 10 anos antes do caso mais jovem, repetindo a cada 5 anos.',
   '<strong>Síndromes:</strong> Lynch (critérios de Amsterdam, instabilidade de microssatélites), polipose adenomatosa familiar (colectomia profilática).']},
  {h:'Apresentação por localização',table:{head:['Local','Apresentação típica'],rows:[
   ['Cólon direito','Anemia ferropriva, astenia, massa; luz larga e fezes líquidas, por isso obstrui pouco'],
   ['Cólon esquerdo','Alteração do hábito intestinal, fezes afiladas, sangue, obstrução'],
   ['Reto','Hematoquezia, tenesmo, puxo, evacuação incompleta']]},
   after:'Anemia ferropriva em homem ou mulher na pós-menopausa exige investigação do trato digestivo. Bacteremia por Streptococcus gallolyticus (bovis) ou Clostridium septicum também obriga colonoscopia.'},
  {h:'Diagnóstico e estadiamento',list:['Colonoscopia completa com biópsia (lesões sincrônicas em cerca de 3 a 5%).','Tomografia de tórax, abdome e pelve.','CEA basal, útil para seguimento.','Reto: ressonância de pelve para T, N, distância da fáscia mesorretal e invasão venosa extramural.']},
  {h:'Tratamento',list:[
   '<strong>Cólon:</strong> colectomia com margens e linfadenectomia de pelo menos 12 linfonodos. Quimioterapia adjuvante no estágio III (linfonodos positivos) e no II de alto risco, com esquemas baseados em oxaliplatina.',
   '<strong>Reto médio e baixo localmente avançado (T3, T4 ou N positivo):</strong> terapia neoadjuvante (quimiorradioterapia ou terapia neoadjuvante total) seguida de excisão total do mesorreto (TME), que retira o reto com seu envelope de gordura e linfonodos intacto. Resposta clínica completa permite estratégia de observar e esperar em centros com seguimento rigoroso.',
   '<strong>Cirurgias do reto:</strong> retossigmoidectomia anterior com anastomose quando há margem distal e esfíncter preservável; amputação abdominoperineal (Miles), com colostomia definitiva, quando o tumor invade o esfíncter.',
   '<strong>Tumores com deficiência de reparo (dMMR):</strong> respondem muito à imunoterapia, inclusive no reto.',
   '<strong>Metástases hepáticas ressecáveis:</strong> ressecção com intenção curativa.']}
 ],
 flow:{title:'Suspeita de câncer colorretal',nodes:[
  {k:'start',t:'Sangue nas fezes, anemia ferropriva ou alteração do hábito'},
  {k:'do',t:'Colonoscopia completa com biópsia'},
  {k:'do',t:'TC de tórax, abdome e pelve e CEA'},
  {k:'ask',t:'Tumor de reto?',yes:'RM de pelve: se localmente avançado, neoadjuvância e TME',no:'Cólon: colectomia com linfadenectomia'},
  {k:'ask',t:'Linfonodo positivo no cólon?',yes:'Quimioterapia adjuvante',no:'Seguimento; adjuvância se estágio II de alto risco'},
  {k:'end',t:'Seguimento com CEA, TC e colonoscopia'}]},
 reasoning:['Direito sangra, esquerdo obstrui, reto dá tenesmo.','No reto, a ressonância decide a neoadjuvância.','Anemia ferropriva no homem adulto é câncer até prova em contrário.'],
 mnemonics:[{n:'45, 10, 1',t:'Rastreamento a partir dos 45; colonoscopia a cada 10 anos ou FIT a cada 1 ano.'},{n:'12 linfonodos',t:'Mínimo para estadiar o cólon.'},{n:'TME',t:'Excisão total do mesorreto: o reto sai com o envelope.'}],
 pitfalls:['Atribuir anemia ferropriva no homem a dieta.','Operar câncer de reto localmente avançado sem neoadjuvância.','Usar CEA como rastreamento.'],
 recall:[
  {q:'Idade de início do rastreamento no risco médio pelas diretrizes americanas?',a:'45 anos.'},
  {q:'Conduta em quem tem pai com câncer colorretal aos 50 anos?',a:'Colonoscopia aos 40 anos e a cada 5 anos.'},
  {q:'Exame de estadiamento local do câncer de reto?',a:'Ressonância de pelve.'},
  {q:'Indicação clássica de quimioterapia adjuvante no cólon?',a:'Estágio III (linfonodo positivo).'},
  {q:'Quando fazer amputação abdominoperineal?',a:'Quando o tumor de reto baixo invade o esfíncter ou não permite margem distal.'}],
 practice:['Monte o plano de rastreamento para três pessoas: risco médio de 46 anos, filho de paciente com câncer aos 55 anos e portador de Lynch.'],
 refs:[
  {t:'US Preventive Services Task Force. Screening for colorectal cancer: recommendation statement. JAMA. 2021.',q:'USPSTF screening for colorectal cancer recommendation statement 2021 JAMA'},
  {t:'National Comprehensive Cancer Network. NCCN Guidelines: Colon Cancer e Rectal Cancer. Versão vigente.',q:'NCCN Guidelines Rectal Cancer'},
  {t:'Instituto Nacional de Câncer. Detecção precoce do câncer colorretal.',q:'INCA detecção precoce câncer colorretal'}],
 note:'USPSTF 2021, NCCN e INCA.'
},
'cirproc_3':{
 updated:'2026-11',
 pretest:['Como diferenciar prolapso retal de prolapso hemorroidário?','Qual é o tratamento de primeira linha do câncer de canal anal?','Qual a conduta no abscesso pilonidal?','Qual vírus causa o condiloma anal?'],
 sections:[
  {h:'Doença pilonidal',p:[
   'Infecção crônica na fenda interglútea, por pelos que penetram a pele, mais em homens jovens, peludos e sedentários. Abscesso agudo: drenagem com incisão fora da linha média. Doença crônica com fístulas: excisão, com fechamento por técnicas que achatam a fenda (retalhos, cleft lift) ou cicatrização por segunda intenção. Depilação da região ajuda a reduzir recidiva.']},
  {h:'Prolapso retal',p:[
   'Exteriorização de toda a parede do reto. Mais em mulheres idosas, multíparas, e associado a constipação e incontinência. O prolapso retal mostra pregas concêntricas, enquanto o hemorroidário mostra sulcos radiais entre os coxins.',
   'Tratamento cirúrgico. Retopexia abdominal (de preferência laparoscópica, como a retopexia ventral com tela) tem menor recidiva. Em idosos frágeis, via perineal (Altemeier, que é retossigmoidectomia perineal, ou Delorme, que é ressecção mucosa com plicatura muscular).']},
  {h:'Condiloma e câncer de canal anal',list:[
   '<strong>Condiloma acuminado:</strong> lesões verrucosas por HPV (tipos 6 e 11). Tratamento com imiquimode, podofilotoxina, ácido tricloroacético, crioterapia ou excisão. Avaliar o canal anal por dentro e oferecer vacina.',
   '<strong>Câncer de canal anal:</strong> carcinoma escamoso associado a HPV (16 e 18), mais em HIV positivos, homens que fazem sexo com homens e imunossuprimidos. Tratamento de primeira linha: quimiorradioterapia (esquema de Nigro, com 5-fluorouracil e mitomicina), que preserva o esfíncter. A amputação abdominoperineal fica para doença residual ou recidiva.',
   '<strong>Adenocarcinoma de reto baixo</strong> invadindo o canal é tratado como câncer de reto, não como de canal anal.']}
 ],
 flow:{title:'Massa ou lesão perianal',nodes:[
  {k:'start',t:'Lesão perianal'},
  {k:'ask',t:'Exteriorização com pregas concêntricas?',yes:'Prolapso retal: retopexia ou cirurgia perineal',no:'Seguir'},
  {k:'ask',t:'Lesões verrucosas?',yes:'Condiloma: tratamento local e avaliação do canal',no:'Seguir'},
  {k:'ask',t:'Lesão ulcerada endurecida no canal?',yes:'Biópsia: se escamoso, quimiorradioterapia',no:'Seguir'},
  {k:'do',t:'Fenda interglútea com orifícios e pelos: doença pilonidal'},
  {k:'end',t:'Abscesso pilonidal: drenagem fora da linha média'}]},
 reasoning:['Canal anal escamoso não é câncer de reto: o tratamento é quimiorradioterapia, não cirurgia.','Concêntrico é prolapso retal; radial é hemorroida.'],
 mnemonics:[{n:'Nigro',t:'Quimiorradioterapia com 5-FU e mitomicina para câncer de canal anal.'},{n:'Círculos versus raios',t:'Prolapso retal tem pregas circulares; hemorroidas têm sulcos radiais.'},{n:'Altemeier tira, Delorme pregueia',t:'Duas cirurgias perineais para prolapso.'}],
 pitfalls:['Indicar amputação como primeira opção no câncer de canal anal.','Confundir prolapso retal com hemorroida grau IV.','Fazer incisão na linha média no abscesso pilonidal.'],
 recall:[
  {q:'Tratamento de primeira linha do câncer de canal anal?',a:'Quimiorradioterapia (Nigro).'},
  {q:'Como diferenciar prolapso retal e hemorroidário?',a:'Retal tem pregas concêntricas; hemorroidário, sulcos radiais.'},
  {q:'Cirurgia perineal para prolapso em idosa frágil?',a:'Altemeier ou Delorme.'},
  {q:'Tipos de HPV do condiloma?',a:'6 e 11.'},
  {q:'Conduta no abscesso pilonidal?',a:'Drenagem, com incisão fora da linha média.'}],
 practice:['Compare câncer de canal anal e de reto baixo: histologia e tratamento.'],
 refs:[
  {t:'Rao S, et al. Anal cancer: ESMO clinical practice guidelines. Ann Oncol. 2021.',q:'ESMO clinical practice guidelines anal cancer 2021'},
  {t:'Bordeianou L, et al. Clinical practice guidelines for the treatment of rectal prolapse (ASCRS). Dis Colon Rectum. 2017.',q:'ASCRS clinical practice guidelines treatment of rectal prolapse'},
  {t:'Johnson EK, et al. The ASCRS clinical practice guidelines for the management of pilonidal disease. Dis Colon Rectum. 2019.',q:'ASCRS clinical practice guidelines pilonidal disease 2019'}],
 note:'Diretrizes da ESMO e da sociedade americana de coloproctologia.'
},
'cirremit_0':{
 updated:'2026-11',
 pretest:['Quais são as fases da resposta metabólica ao trauma?','Quais hormônios aumentam e quais diminuem?','Por que o paciente operado retém água e sódio?','Como o protocolo de recuperação acelerada reduz essa resposta?'],
 sections:[
  {h:'Fases',table:{head:['Fase','Quando','O que acontece'],rows:[
   ['Ebb (refluxo)','Primeiras 24 a 48 horas','Hipometabolismo: queda do débito cardíaco, do consumo de oxigênio e da temperatura; prioridade é manter perfusão'],
   ['Flow catabólica','Após a reanimação, dias a semanas','Hipermetabolismo: catecolaminas, cortisol e glucagon elevados, hiperglicemia, proteólise muscular, balanço nitrogenado negativo'],
   ['Flow anabólica','Recuperação','Ressíntese proteica, recuperação de peso e força']]}},
  {h:'Hormônios e mediadores',table:{head:['Aumentam','Diminuem ou ficam inadequados'],rows:[
   ['ACTH e cortisol','Insulina no início; depois sobe, mas há resistência à insulina'],
   ['Catecolaminas','T3 (T3 baixo do doente grave), com T4 e TSH normais ou baixos'],
   ['Glucagon','Testosterona, LH e FSH'],
   ['GH e prolactina','Albumina e transferrina (proteínas de fase aguda negativas)'],
   ['ADH e aldosterona','']]},
   after:'Consequências práticas: retenção de água (ADH) e de sódio (aldosterona) com oligúria no pós-operatório imediato, perda de potássio na urina, hiperglicemia por resistência à insulina e gliconeogênese, e proteólise muscular para fornecer aminoácidos (alanina e glutamina) ao fígado e à cicatrização. A interleucina 6 é a citocina que melhor acompanha a magnitude da agressão; PCR e fibrinogênio sobem, albumina cai.'},
  {h:'Jejum simples versus trauma',p:[
   'No jejum simples, o glicogênio hepático acaba em cerca de 24 horas, a gliconeogênese a partir de proteína predomina no início e, depois de alguns dias, o cérebro passa a usar corpos cetônicos, poupando proteína. No trauma e na sepse essa adaptação não acontece: a proteólise continua intensa porque é dirigida por hormônios e citocinas. Por isso o doente grave perde massa muscular rapidamente.']},
  {h:'Como modular: recuperação acelerada (ERAS)',list:['Abreviar o jejum pré-operatório: líquidos claros até 2 horas e bebida com carboidrato, que reduz resistência à insulina.','Analgesia multimodal poupadora de opioide e anestesia regional.','Cirurgia minimamente invasiva.','Evitar sobrecarga hídrica.','Controle glicêmico e da temperatura.','Realimentação e mobilização precoces, retirada precoce de sondas e drenos.']}
 ],
 flow:{title:'Resposta ao trauma na prática',nodes:[
  {k:'start',t:'Cirurgia de grande porte ou trauma'},
  {k:'do',t:'Fase ebb: reanimar e restaurar perfusão'},
  {k:'do',t:'Fase flow: esperar hiperglicemia, oligúria com retenção de sódio e água, perda de potássio'},
  {k:'ask',t:'Oligúria nas primeiras 24 horas com paciente perfundido?',yes:'Pode ser resposta hormonal: evitar excesso de volume',no:'Investigar hipovolemia ou lesão renal'},
  {k:'do',t:'Medidas de recuperação acelerada para reduzir a resposta'},
  {k:'end',t:'Nutrição precoce e mobilização para entrar na fase anabólica'}]},
 reasoning:['Tudo sobe para gerar energia e reter volume, exceto insulina efetiva, T3 e hormônios sexuais.','Oligúria leve no pós-operatório imediato pode ser fisiológica; corrigir com litros de soro gera edema.','Jejum longo pré-operatório piora a resistência à insulina.'],
 mnemonics:[{n:'Ebb baixa, flow alta',t:'Ebb é hipometabólica; flow é hipermetabólica.'},{n:'ADH e aldosterona seguram',t:'Água e sódio retidos, potássio perdido.'},{n:'IL-6',t:'Melhor marcador da magnitude da agressão.'}],
 pitfalls:['Dizer que a insulina aumenta e resolve a hiperglicemia.','Hidratar agressivamente oligúria fisiológica do pós-operatório.','Achar que o trauma poupa proteína como o jejum.'],
 recall:[
  {q:'Quais as fases da resposta ao trauma?',a:'Ebb (hipometabólica) e flow (catabólica e depois anabólica).'},
  {q:'Cite três hormônios que aumentam.',a:'Cortisol, catecolaminas, glucagon (também GH, ADH, aldosterona, prolactina).'},
  {q:'Por que há retenção de sódio e água?',a:'Aumento de aldosterona e ADH.'},
  {q:'Qual citocina melhor reflete a magnitude da agressão?',a:'Interleucina 6.'},
  {q:'Medida pré-operatória que reduz resistência à insulina?',a:'Bebida com carboidrato até 2 horas antes, abreviando o jejum.'}],
 practice:['Explique por que o paciente operado tem hiperglicemia mesmo sem diabetes.'],
 refs:[
  {t:'Townsend CM, et al. Sabiston Textbook of Surgery. 21ª ed. Capítulo The Inflammatory Response e Metabolism in Surgical Patients.',q:'Sabiston metabolism in surgical patients chapter'},
  {t:'Gustafsson UO, et al. Guidelines for perioperative care in elective colorectal surgery: ERAS Society recommendations 2018. World J Surg. 2019.',q:'ERAS Society recommendations 2018 elective colorectal surgery'},
  {t:'Desborough JP. The stress response to trauma and surgery. Br J Anaesth. 2000.',q:'Desborough stress response to trauma and surgery Br J Anaesth 2000'}],
 note:'Tratado de cirurgia e diretriz da sociedade ERAS.'
},
'cirremit_1':{
 updated:'2026-11',
 pretest:['Quais são as três fases da cicatrização?','Qual célula é indispensável na fase inflamatória?','Qual vitamina reverte o efeito do corticoide na cicatrização?','Como diferenciar queloide de cicatriz hipertrófica?'],
 sections:[
  {h:'Fases',table:{head:['Fase','Tempo aproximado','Eventos'],rows:[
   ['Inflamatória','Dias 0 a 4','Hemostasia com plaquetas e fibrina; neutrófilos nas primeiras 24 a 48 horas; macrófagos a partir de 48 a 72 horas, a célula essencial (coordena a reparação por fatores de crescimento)'],
   ['Proliferativa','Dia 4 até cerca de 3 semanas','Fibroblastos produzem colágeno tipo III; angiogênese; tecido de granulação; epitelização; miofibroblastos contraem a ferida'],
   ['Maturação ou remodelamento','3 semanas a 1 ano ou mais','Colágeno III substituído por tipo I, organização das fibras; força tênsil chega a cerca de 80% da pele original e nunca a 100%']]}},
  {h:'Tipos de cicatrização',table:{head:['Tipo','Quando','Exemplo'],rows:[
   ['Primeira intenção','Bordas aproximadas, ferida limpa','Incisão cirúrgica suturada'],
   ['Segunda intenção','Ferida aberta, cicatriza por granulação e contração','Abscesso drenado, úlcera'],
   ['Terceira intenção (fechamento primário retardado)','Ferida contaminada deixada aberta alguns dias e depois fechada','Laparotomia por peritonite fecal']]}},
  {h:'O que atrapalha',list:['<strong>Infecção:</strong> mais de 100 mil bactérias por grama de tecido impede a cicatrização.','<strong>Hipóxia e anemia,</strong> tabagismo e doença vascular.','<strong>Desnutrição:</strong> proteína, vitamina C (hidroxilação de prolina e lisina no colágeno; falta causa escorbuto), zinco.','<strong>Corticoide:</strong> bloqueia a fase inflamatória; a vitamina A reverte parcialmente esse efeito.','<strong>Diabetes,</strong> quimioterapia, radioterapia e idade avançada.']},
  {h:'Cicatrização anormal',table:{head:['','Cicatriz hipertrófica','Queloide'],rows:[
   ['Limites','Restrita à ferida','Ultrapassa os limites da ferida'],
   ['Início','Precoce, semanas','Tardio, meses'],
   ['Evolução','Pode regredir','Não regride'],
   ['Locais e quem','Áreas de tensão e flexão','Lóbulo da orelha, ombros, tórax; pele negra e asiática'],
   ['Excisão isolada','Pode resolver','Recidiva alta; associar corticoide ou radioterapia']]},
   after:'Tratamento: corticoide intralesional (triancinolona), placas de silicone, compressão. Úlcera de Marjolin é o carcinoma espinocelular que surge em cicatriz crônica, classicamente de queimadura: ferida que não cicatriza em cicatriz antiga exige biópsia. Curativos modernos mantêm a ferida úmida; terapia por pressão negativa ajuda feridas complexas.'}
 ],
 flow:{title:'Ferida que não cicatriza',nodes:[
  {k:'start',t:'Ferida que não fecha no tempo esperado'},
  {k:'ask',t:'Infecção ou corpo estranho?',yes:'Desbridar, tratar infecção',no:'Seguir'},
  {k:'ask',t:'Perfusão ruim?',yes:'Avaliar doença arterial e oxigenação',no:'Seguir'},
  {k:'do',t:'Corrigir nutrição, glicemia, tabagismo e anemia'},
  {k:'ask',t:'Úlcera crônica em cicatriz antiga?',yes:'Biópsia: excluir úlcera de Marjolin',no:'Curativo adequado e pressão negativa se indicado'},
  {k:'end',t:'Corticoide em uso: considerar vitamina A'}]},
 reasoning:['Sem macrófago não há cicatrização; sem neutrófilo ainda há.','Vitamina C faz colágeno; vitamina A reverte corticoide.','Queloide passa da borda e volta se só cortar.'],
 mnemonics:[{n:'IPM',t:'Inflamatória, Proliferativa, Maturação.'},{n:'Três para um',t:'Colágeno III na proliferação vira tipo I na maturação.'},{n:'A contra o corticoide',t:'Vitamina A reverte o efeito do corticoide.'}],
 pitfalls:['Dizer que a força tênsil volta a 100%.','Excisar queloide sem terapia adjuvante.','Ignorar ferida crônica em cicatriz de queimadura.'],
 recall:[
  {q:'Célula essencial da fase inflamatória?',a:'Macrófago.'},
  {q:'Colágeno predominante na fase proliferativa?',a:'Tipo III.'},
  {q:'O que é cicatrização por terceira intenção?',a:'Fechamento primário retardado de ferida contaminada.'},
  {q:'Diferença principal entre queloide e hipertrófica?',a:'Queloide ultrapassa os limites da ferida e não regride.'},
  {q:'O que é úlcera de Marjolin?',a:'Carcinoma espinocelular em cicatriz crônica, como de queimadura.'}],
 practice:['Explique o papel de cada vitamina e mineral na cicatrização.'],
 refs:[
  {t:'Townsend CM, et al. Sabiston Textbook of Surgery. 21ª ed. Capítulo Wound Healing.',q:'Sabiston wound healing chapter'},
  {t:'Gurtner GC, et al. Wound repair and regeneration. Nature. 2008.',q:'Gurtner wound repair and regeneration Nature 2008'}],
 note:'Tratado de cirurgia e revisão clássica de cicatrização.'
},
'cirremit_2':{
 updated:'2026-11',
 pretest:['Queimadura de primeiro grau entra no cálculo da superfície queimada?','Como se diferencia segundo grau superficial de profundo?','Quanto vale a cabeça na regra dos nove no adulto e na criança?','Quais queimaduras devem ir para centro especializado?'],
 sections:[
  {h:'Profundidade',table:{head:['Grau','Camada','Aspecto','Dor','Evolução'],rows:[
   ['Primeiro','Epiderme','Eritema, sem bolhas','Dolorosa','Cicatriza em dias, sem sequela; não entra no cálculo da superfície'],
   ['Segundo superficial','Derme papilar','Bolhas, base rosada e úmida, enchimento capilar preservado','Muito dolorosa','Cicatriza em cerca de 2 a 3 semanas, pouca cicatriz'],
   ['Segundo profundo','Derme reticular','Base pálida ou mosqueada, menos úmida','Menos dolorosa','Mais de 3 semanas, cicatriz hipertrófica; costuma precisar de enxerto'],
   ['Terceiro','Toda a pele','Branca, nacarada ou marrom, aspecto de couro, vasos trombosados visíveis','Indolor','Não cicatriza sozinha: excisão e enxerto'],
   ['Quarto','Músculo, tendão, osso','Carbonizada','Indolor','Desbridamento extenso, retalhos, amputação']]}},
  {h:'Extensão (superfície corporal queimada)',table:{head:['Região','Adulto','Criança pequena'],rows:[
   ['Cabeça e pescoço','9%','18%'],
   ['Cada membro superior','9%','9%'],
   ['Tronco anterior','18%','18%'],
   ['Tronco posterior','18%','18%'],
   ['Cada membro inferior','18%','14%'],
   ['Períneo','1%','1%']]},
   after:'A palma da mão do paciente, incluindo os dedos, corresponde a cerca de 1% da superfície e serve para queimaduras irregulares. A tabela de Lund-Browder é mais precisa, sobretudo em crianças, porque corrige pela idade. Só contam queimaduras de segundo grau ou mais profundas.'},
  {h:'Quem vai para centro de queimados',list:['Espessura parcial em mais de 10% da superfície corporal.','Qualquer queimadura de terceiro grau.','Face, mãos, pés, genitália, períneo e grandes articulações.','Queimadura elétrica (incluindo raio) e química.','Lesão inalatória.','Comorbidades que dificultam o tratamento ou trauma associado.','Crianças em hospitais sem estrutura pediátrica e situações sociais que exijam cuidado prolongado.']}
 ],
 flow:{title:'Avaliar a queimadura',nodes:[
  {k:'start',t:'Paciente queimado após atendimento inicial'},
  {k:'do',t:'Definir profundidade de cada área'},
  {k:'do',t:'Somar só segundo e terceiro graus pela regra dos nove, palma ou Lund-Browder'},
  {k:'ask',t:'Adulto com mais de 20% de superfície?',yes:'Reposição volêmica por fórmula e sonda vesical',no:'Hidratação oral ou de manutenção, conforme o caso'},
  {k:'ask',t:'Algum critério de centro de queimados?',yes:'Contato e transferência após estabilizar',no:'Tratamento local'},
  {k:'end',t:'Reavaliar profundidade em 48 a 72 horas'}]},
 reasoning:['Primeiro grau não entra na conta: erro clássico.','Dor é bom sinal: queimadura que não dói é profunda.','Criança tem cabeça maior e pernas menores.'],
 mnemonics:[{n:'Regra dos nove',t:'Cabeça 9, braço 9, tronco 18 e 18, perna 18, períneo 1.'},{n:'Palma 1',t:'Palma do paciente com dedos é cerca de 1%.'},{n:'Dói, é superficial',t:'Terceiro grau é indolor.'}],
 pitfalls:['Somar áreas de primeiro grau.','Usar a palma do examinador.','Achar que queimadura indolor é leve.','Não transferir queimadura de mão ou face pequena.'],
 recall:[
  {q:'Primeiro grau entra no cálculo?',a:'Não.'},
  {q:'Quanto vale cada membro inferior no adulto?',a:'18%.'},
  {q:'Característica da queimadura de terceiro grau?',a:'Branca ou de couro, indolor, vasos trombosados, sem enchimento capilar.'},
  {q:'Por que Lund-Browder é melhor na criança?',a:'Corrige a proporção das regiões conforme a idade.'},
  {q:'Cite três critérios de centro de queimados.',a:'Terceiro grau, face ou mãos, elétrica, química, inalatória, mais de 10% de espessura parcial.'}],
 practice:['Calcule: adulto com segundo grau em todo o membro superior direito, tronco anterior e face, e primeiro grau no dorso.'],
 refs:[
  {t:'American College of Surgeons. Advanced Trauma Life Support, 11ª edição. 2025. Capítulo de lesões térmicas.',q:'ATLS 11th edition thermal injuries'},
  {t:'American Burn Association. Guidelines for burn patient referral. 2022.',q:'American Burn Association guidelines for burn patient referral'}],
 note:'ATLS 11 e critérios de encaminhamento da associação americana de queimaduras.'
},
'cirremit_3':{
 updated:'2026-11',
 pretest:['Qual fórmula de reposição o ATLS recomenda hoje? E qual ainda cai muito em prova?','Qual a meta de diurese no adulto?','Quais sinais indicam lesão inalatória e intubação precoce?','Quando fazer escarotomia?'],
 sections:[
  {h:'Primeiro atendimento',list:[
   'Interromper a queimadura: retirar roupas e adornos, resfriar com água corrente em temperatura ambiente por cerca de 20 minutos. Não usar gelo. Evitar hipotermia em queimaduras extensas.',
   'xABCDE com atenção à via aérea. Oxigênio a 100% em todo paciente de incêndio em ambiente fechado.',
   'Dois acessos calibrosos, de preferência em pele não queimada.',
   'Profilaxia antitetânica. Sem antibiótico sistêmico profilático.',
   'Analgesia intravenosa adequada.']},
  {h:'Via aérea e inalação',p:[
   'Sinais de lesão inalatória: queimadura facial, vibrissas chamuscadas, escarro carbonáceo, rouquidão, estridor, incêndio em ambiente fechado, rebaixamento de consciência e carboxi-hemoglobina acima de 10%. O edema de via aérea piora nas primeiras horas e com a reposição volêmica, então a decisão de intubar deve ser precoce quando há rouquidão progressiva, estridor, queimadura circunferencial do pescoço, queimadura facial extensa ou rebaixamento.',
   'Monóxido de carbono: o oxímetro de pulso dá leitura falsamente normal. Oxigênio a 100% reduz a meia-vida da carboxi-hemoglobina de cerca de 4 horas para cerca de 1 hora. Câmara hiperbárica em casos selecionados. Cianeto (incêndio com plásticos, acidose lática grave): hidroxocobalamina.']},
  {h:'Reposição volêmica',table:{head:['Situação','Volume nas primeiras 24 horas','Meta de diurese'],rows:[
   ['Adulto, queimadura térmica (ATLS e associação americana de queimaduras)','2 mL × peso (kg) × % superfície, de Ringer lactato','0,5 mL/kg/h (cerca de 30 a 50 mL/h)'],
   ['Criança (até cerca de 30 kg)','3 mL × peso × %, mais solução glicosada de manutenção','1 mL/kg/h'],
   ['Queimadura elétrica','4 mL × peso × %','1 a 1,5 mL/kg/h até a urina clarear, se houver mioglobinúria'],
   ['Fórmula de Parkland (clássica, muito cobrada em prova)','4 mL × peso × %','0,5 mL/kg/h']]},
   after:'Em todas: metade do volume nas primeiras 8 horas contadas a partir do momento da queimadura (não da chegada) e a outra metade nas 16 horas seguintes, descontando o que já foi infundido. A fórmula só define o ponto de partida; o ajuste é pela diurese, para evitar tanto hipoperfusão quanto sobrecarga (síndrome compartimental, edema de via aérea, progressão da profundidade). O ATLS indica reposição por fórmula a partir de 20% de superfície queimada no adulto. Leia o enunciado: se pedir Parkland, use 4 mL.'},
  {h:'Cuidados com a ferida e complicações',list:[
   '<strong>Escarotomia:</strong> queimadura circunferencial de espessura total em membro com comprometimento circulatório, ou no tórax com restrição ventilatória.',
   '<strong>Curativos:</strong> limpeza e cobertura com agentes tópicos (sulfadiazina de prata ou coberturas com prata, entre outros). Excisão precoce e enxertia das áreas profundas na primeira semana reduzem infecção e mortalidade.',
   '<strong>Nutrição enteral precoce</strong> pelo hipermetabolismo intenso.',
   '<strong>Infecção:</strong> principal causa de morte tardia; Pseudomonas e Staphylococcus aureus são frequentes. Biópsia da ferida com mais de 100 mil bactérias por grama sugere infecção invasiva.',
   '<strong>Úlcera de Curling:</strong> úlcera de estresse do grande queimado; profilaxia com supressão ácida.',
   '<strong>Queimadura elétrica:</strong> lesão interna muito maior do que a da pele. ECG, monitorização se alteração, perda de consciência ou alta tensão, rabdomiólise com risco de lesão renal, síndrome compartimental com fasciotomia, catarata tardia.',
   '<strong>Queimadura química:</strong> irrigação abundante e prolongada com água; não neutralizar. Álcalis penetram mais que ácidos. Ácido fluorídrico: gluconato de cálcio.']}
 ],
 flow:{title:'Grande queimado na emergência',nodes:[
  {k:'start',t:'Queimadura extensa ou suspeita de inalação'},
  {k:'do',t:'Interromper a queimadura, resfriar com água corrente, oxigênio a 100%'},
  {k:'ask',t:'Sinais de obstrução de via aérea ou inalação grave?',yes:'Intubação precoce',no:'Monitorar via aérea de perto'},
  {k:'do',t:'Calcular superfície de segundo e terceiro graus'},
  {k:'ask',t:'Adulto com mais de 20%?',yes:'Ringer lactato 2 mL × kg × %, metade em 8 horas desde a queimadura, sonda vesical',no:'Hidratação conforme necessidade'},
  {k:'end',t:'Titular pela diurese, escarotomia se circunferencial, transferir se critérios'}]},
 reasoning:['O relógio da fórmula começa na hora da queimadura.','Diurese é o alvo; a fórmula é só o começo.','Rouquidão que piora é motivo para intubar antes que o edema feche a via aérea.','Elétrica: pele pequena, estrago grande.'],
 mnemonics:[{n:'2, 3, 4',t:'Adulto 2 mL, criança 3 mL, elétrica 4 mL (e Parkland clássica 4 mL).'},{n:'Metade em 8',t:'Metade nas primeiras 8 horas desde a queimadura.'},{n:'Meio para adulto, um para criança',t:'Diurese de 0,5 mL/kg/h no adulto e 1 mL/kg/h na criança.'}],
 pitfalls:['Contar as 8 horas a partir da chegada ao hospital.','Usar gelo no resfriamento.','Confiar na saturação do oxímetro com intoxicação por monóxido.','Dar antibiótico sistêmico profilático.','Esquecer que provas antigas ainda pedem Parkland com 4 mL.'],
 recall:[
  {q:'Fórmula do ATLS para o adulto queimado?',a:'2 mL × peso × % de superfície de Ringer lactato nas primeiras 24 horas.'},
  {q:'Como dividir o volume?',a:'Metade nas primeiras 8 horas a partir da queimadura e metade nas 16 horas seguintes.'},
  {q:'Meta de diurese no adulto?',a:'0,5 mL/kg/h (cerca de 30 a 50 mL/h).'},
  {q:'Indicação de escarotomia?',a:'Queimadura circunferencial de espessura total com comprometimento circulatório de membro ou restrição respiratória no tórax.'},
  {q:'Antídoto do cianeto?',a:'Hidroxocobalamina.'},
  {q:'O que é úlcera de Curling?',a:'Úlcera de estresse no grande queimado.'}],
 practice:['Calcule para um homem de 80 kg com 40% de superfície queimada às 10 horas, chegando às 12 horas: volume total e ritmo até as 18 horas, pelo ATLS e por Parkland.'],
 refs:[
  {t:'American College of Surgeons. Advanced Trauma Life Support, 11ª edição. 2025. Capítulo de lesões térmicas.',q:'ATLS 11th edition thermal injuries'},
  {t:'Cartotto R, et al. American Burn Association clinical practice guidelines on burn shock resuscitation. J Burn Care Res. 2024.',q:'American Burn Association clinical practice guidelines burn shock resuscitation 2024 Cartotto'},
  {t:'ISBI Practice Guidelines Committee. ISBI practice guidelines for burn care. Burns. 2016.',q:'ISBI practice guidelines for burn care 2016'}],
 note:'ATLS 11 e diretriz de ressuscitação da associação americana de queimaduras.'
},
'cirvasc_0':{
 updated:'2026-11',
 pretest:['Qual valor de índice tornozelo-braquial define doença arterial periférica?','Qual a classificação de Fontaine?','Qual é o tratamento com maior impacto na claudicação?','O que é a síndrome de Leriche?'],
 sections:[
  {h:'Diagnóstico',p:[
   'Aterosclerose dos membros inferiores, com tabagismo e diabetes como principais fatores. A claudicação intermitente é dor muscular reprodutível ao caminhar que alivia em repouso; o local da dor aponta o nível da obstrução (panturrilha: femoropoplítea; coxa e nádega: aortoilíaca).',
   'O índice tornozelo-braquial (ITB) de 0,9 ou menos confirma a doença. Acima de 1,4 indica artérias incompressíveis (diabéticos, renais crônicos), e então se usa o índice hálux-braquial. Duplex, angioTC ou angiorressonância planejam a revascularização.'],
   table:{head:['Fontaine','Quadro'],rows:[
    ['I','Assintomático'],['IIa','Claudicação a mais de 200 m'],['IIb','Claudicação a menos de 200 m'],['III','Dor isquêmica em repouso'],['IV','Úlcera ou gangrena']]},
   after:'Fontaine III e IV correspondem à isquemia crônica ameaçadora do membro, que exige avaliação para revascularização. Rutherford divide de 0 a 6 com a mesma lógica.'},
  {h:'Tratamento',list:[
   '<strong>Para todos:</strong> parar de fumar, estatina de alta intensidade, antiagregante (AAS ou clopidogrel), controle de pressão e glicemia. Em pacientes selecionados, rivaroxabana em dose baixa (2,5 mg duas vezes ao dia) com AAS reduz eventos cardiovasculares e do membro.',
   '<strong>Claudicação:</strong> exercício supervisionado é o tratamento com maior ganho de distância. Cilostazol melhora a distância, mas é contraindicado na insuficiência cardíaca.',
   '<strong>Revascularização:</strong> claudicação limitante refratária ou isquemia ameaçadora do membro. Endovascular ou cirurgia aberta (ponte com veia safena) conforme anatomia e condição clínica.',
   '<strong>Amputação:</strong> membro inviável, infecção incontrolável ou dor refratária sem opção de revascularização.']},
  {h:'Síndrome de Leriche',p:['Oclusão aortoilíaca: claudicação de glúteos e coxas, disfunção erétil e pulsos femorais diminuídos ou ausentes.']}
 ],
 flow:{title:'Dor na perna ao caminhar',nodes:[
  {k:'start',t:'Dor em panturrilha ao caminhar que alivia com repouso'},
  {k:'do',t:'Pulsos e ITB'},
  {k:'ask',t:'ITB de 0,9 ou menos?',yes:'Doença arterial periférica',no:'Se acima de 1,4, índice hálux-braquial; senão, outras causas'},
  {k:'do',t:'Cessar tabagismo, estatina, antiagregante, exercício supervisionado'},
  {k:'ask',t:'Dor em repouso, úlcera ou gangrena?',yes:'Isquemia ameaçadora: imagem e revascularização',no:'Manter tratamento clínico; revascularizar se limitante e refratária'},
  {k:'end',t:'Prevenção cardiovascular é a prioridade'}]},
 reasoning:['O paciente com doença arterial periférica morre do coração: prevenção cardiovascular vem primeiro.','Diabético com ITB alto não está protegido: artérias incompressíveis.','Exercício supervisionado vence remédio na claudicação.'],
 mnemonics:[{n:'0,9 e 1,4',t:'ITB baixo confirma; alto engana.'},{n:'Fontaine 2 de 200',t:'IIa acima de 200 m, IIb abaixo.'},{n:'Leriche: nádega, ereção, femoral',t:'Claudicação glútea, impotência, pulsos femorais ausentes.'}],
 pitfalls:['Revascularizar claudicação leve sem tratamento clínico.','Prescrever cilostazol em insuficiência cardíaca.','Interpretar ITB de 1,5 como normal em diabético.'],
 recall:[
  {q:'ITB que confirma doença arterial periférica?',a:'0,9 ou menos.'},
  {q:'O que é Fontaine III?',a:'Dor isquêmica em repouso.'},
  {q:'Tratamento que mais melhora a distância de marcha?',a:'Exercício supervisionado.'},
  {q:'Contraindicação do cilostazol?',a:'Insuficiência cardíaca.'},
  {q:'Tríade de Leriche?',a:'Claudicação glútea, disfunção erétil e pulsos femorais ausentes.'}],
 practice:['Prescreva o tratamento clínico completo de um claudicante tabagista e diabético.'],
 refs:[
  {t:'Gornik HL, et al. 2024 ACC/AHA multisociety guideline for the management of lower extremity peripheral artery disease. Circulation. 2024.',q:'2024 ACC AHA guideline lower extremity peripheral artery disease'},
  {t:'Conte MS, et al. Global vascular guidelines on the management of chronic limb-threatening ischemia. J Vasc Surg. 2019.',q:'Global vascular guidelines chronic limb-threatening ischemia 2019'}],
 note:'Diretriz americana de 2024 e diretriz global de isquemia ameaçadora do membro.'
},
'cirvasc_1':{
 updated:'2026-11',
 pretest:['Quais são os seis Ps da isquemia arterial aguda?','Como diferenciar embolia de trombose?','O que define Rutherford IIb?','Qual a complicação após revascularizar isquemia prolongada?'],
 sections:[
  {h:'Reconhecer',p:['Isquemia aguda é queda súbita da perfusão do membro, com menos de 2 semanas. Os seis Ps: dor (pain), palidez, ausência de pulso, parestesia, paralisia e frialdade (poiquilotermia). Parestesia e paralisia indicam membro ameaçado.'],
   table:{head:['','Embolia','Trombose in situ'],rows:[
    ['Origem','Coração (fibrilação atrial, infarto recente)','Placa aterosclerótica prévia'],
    ['Início','Súbito, bem demarcado','Mais insidioso'],
    ['História','Sem claudicação prévia','Claudicação prévia'],
    ['Membro contralateral','Pulsos normais','Pulsos diminuídos'],
    ['Colaterais','Ausentes, isquemia mais grave','Presentes'],
    ['Local típico','Bifurcação da femoral comum','Artéria doente, femoral superficial']]}},
  {h:'Classificação de Rutherford',table:{head:['Classe','Sensibilidade','Motor','Doppler arterial','Conduta'],rows:[
   ['I viável','Normal','Normal','Audível','Investigação e revascularização eletiva ou urgente'],
   ['IIa marginalmente ameaçado','Perda mínima (dedos)','Normal','Frequentemente inaudível','Revascularização urgente'],
   ['IIb imediatamente ameaçado','Perda além dos dedos, dor em repouso','Fraqueza leve a moderada','Inaudível','Revascularização imediata'],
   ['III irreversível','Anestesia','Paralisia, rigidez','Inaudível, venoso também','Amputação']]}},
  {h:'Tratamento',list:[
   'Heparina não fracionada em dose plena assim que se suspeita.',
   '<strong>Embolia:</strong> embolectomia com cateter de Fogarty, em geral pela femoral.',
   '<strong>Trombose:</strong> trombólise dirigida por cateter (classes I e IIa) ou cirurgia, com ponte ou endovascular, para tratar a lesão de base.',
   '<strong>Fasciotomia:</strong> após isquemia prolongada, para prevenir ou tratar síndrome compartimental (dor à extensão passiva, tensão do compartimento). Na perna, abrir os quatro compartimentos.',
   '<strong>Síndrome de reperfusão:</strong> hipercalemia, acidose, mioglobinúria com lesão renal e arritmias logo após restaurar o fluxo.',
   'Investigar a fonte embólica (ECG, ecocardiograma) e anticoagular a longo prazo quando indicado.']}
 ],
 flow:{title:'Membro frio e sem pulso',nodes:[
  {k:'start',t:'Dor súbita, palidez e ausência de pulso'},
  {k:'do',t:'Heparina plena imediata'},
  {k:'ask',t:'Anestesia, paralisia e rigidez (classe III)?',yes:'Amputação primária',no:'Membro salvável'},
  {k:'ask',t:'Sinais de embolia (FA, contralateral normal)?',yes:'Embolectomia com Fogarty',no:'Trombose: trombólise por cateter ou ponte'},
  {k:'do',t:'Após revascularizar: vigiar potássio, rim e compartimentos'},
  {k:'end',t:'Fasciotomia se síndrome compartimental ou isquemia prolongada'}]},
 reasoning:['Déficit motor é o divisor de urgência: IIb é para já.','FA e contralateral normal falam em embolia.','Reperfundir pode matar pelo potássio.'],
 mnemonics:[{n:'Seis Ps',t:'Pain, Palidez, Pulso ausente, Parestesia, Paralisia, Poiquilotermia.'},{n:'Fogarty para êmbolo',t:'Embolectomia com cateter balão.'},{n:'III é perda',t:'Classe III de Rutherford: membro irreversível, amputar.'}],
 pitfalls:['Atrasar a heparina para fazer exame.','Tentar revascularizar membro classe III.','Esquecer fasciotomia após isquemia de muitas horas.'],
 recall:[
  {q:'Quais os seis Ps?',a:'Dor, palidez, ausência de pulso, parestesia, paralisia e poiquilotermia.'},
  {q:'Local mais comum de embolia periférica?',a:'Bifurcação da artéria femoral comum.'},
  {q:'O que define Rutherford IIb?',a:'Perda sensitiva além dos dedos com fraqueza motora: imediatamente ameaçado.'},
  {q:'Tratamento da embolia arterial aguda?',a:'Heparina e embolectomia com cateter de Fogarty.'},
  {q:'Alterações da síndrome de reperfusão?',a:'Hipercalemia, acidose, mioglobinúria com lesão renal e arritmias.'}],
 practice:['Classifique: idoso com FA, perna fria há 6 horas, parestesia nos dedos, força normal, Doppler arterial ausente e venoso presente.'],
 refs:[
  {t:'Björck M, et al. European Society for Vascular Surgery 2020 clinical practice guidelines on the management of acute limb ischaemia. Eur J Vasc Endovasc Surg. 2020.',q:'ESVS 2020 clinical practice guidelines acute limb ischaemia'},
  {t:'Rutherford RB, et al. Recommended standards for reports dealing with lower extremity ischemia: revised version. J Vasc Surg. 1997.',q:'Rutherford recommended standards lower extremity ischemia revised 1997'}],
 note:'Diretriz europeia de isquemia aguda de membro.'
},
'cirvasc_2':{
 updated:'2026-11',
 pretest:['A partir de qual diâmetro se indica correção eletiva do aneurisma de aorta abdominal?','Quem deve ser rastreado?','Qual a diferença entre Stanford A e B?','Qual a primeira droga no controle pressórico da dissecção?'],
 sections:[
  {h:'Aneurisma de aorta abdominal',list:[
   '<strong>Definição:</strong> aorta infrarrenal com 3 cm ou mais.',
   '<strong>Fatores:</strong> tabagismo (o principal), sexo masculino, idade, história familiar, hipertensão.',
   '<strong>Rastreamento:</strong> ultrassonografia única em homens de 65 a 75 anos que já fumaram (USPSTF), e conforme diretrizes europeias em todos os homens de 65 anos.',
   '<strong>Correção eletiva (diretriz europeia de 2024):</strong> diâmetro de 5,5 cm ou mais em homens e 5,0 cm ou mais em mulheres, crescimento rápido (cerca de 1 cm por ano ou mais) ou aneurisma sintomático.',
   '<strong>Técnicas:</strong> reparo endovascular (EVAR), com menor mortalidade precoce e necessidade de seguimento por imagem, ou cirurgia aberta, mais durável. A escolha depende da anatomia, idade e risco.',
   '<strong>Abaixo do limiar:</strong> vigilância por ultrassonografia, com intervalo menor quanto maior o aneurisma, e controle de fatores de risco.',
   'Aneurisma roto: ver aula de abdome agudo hemorrágico.']},
  {h:'Dissecção aguda de aorta',p:[
   'Laceração da íntima com sangue dissecando a parede. Dor torácica súbita, lancinante, migrando para o dorso. Diferença de pulsos ou de pressão entre os braços (mais de 20 mmHg), sopro de insuficiência aórtica, déficit neurológico e mediastino alargado são pistas. Fatores: hipertensão, síndrome de Marfan, valva aórtica bicúspide, cocaína e gestação.'],
   table:{head:['Classificação','Acomete','Conduta'],rows:[
    ['Stanford A (DeBakey I e II)','Aorta ascendente','Cirurgia de urgência'],
    ['Stanford B (DeBakey III)','Só a aorta descendente, após a subclávia esquerda','Tratamento clínico; TEVAR se complicada (má perfusão, rotura, dor refratária, expansão)']]},
   after:'Diagnóstico: angioTC no estável; ecocardiograma transesofágico no instável. Controle imediato: betabloqueador intravenoso (esmolol ou labetalol) para FC em torno de 60 bpm e PAS entre 100 e 120 mmHg; só depois vasodilatador (nitroprussiato), para não causar taquicardia reflexa. Analgesia com opioide. Anticoagulante e trombolítico são contraindicados.'}
 ],
 flow:{title:'Dor torácica lancinante para o dorso',nodes:[
  {k:'start',t:'Dor súbita rasgando para o dorso, diferença de pulsos'},
  {k:'do',t:'Analgesia, betabloqueador intravenoso, metas de FC 60 e PAS 100 a 120'},
  {k:'ask',t:'Estável?',yes:'AngioTC',no:'Ecocardiograma transesofágico à beira do leito'},
  {k:'ask',t:'Aorta ascendente envolvida (Stanford A)?',yes:'Cirurgia de urgência',no:'Stanford B: tratamento clínico'},
  {k:'ask',t:'B complicada?',yes:'TEVAR',no:'Controle pressórico e seguimento por imagem'},
  {k:'end',t:'Nunca anticoagular ou trombolisar uma dissecção'}]},
 reasoning:['Ascendente opera; descendente não complicada trata clinicamente.','Betabloqueador antes do vasodilatador.','Dor torácica com diferença de pressão entre braços: pense em dissecção antes de dar antiagregante e anticoagulante para síndrome coronariana.'],
 mnemonics:[{n:'5,5 e 5,0',t:'Limiar de correção do aneurisma em homens e mulheres.'},{n:'A de ascendente, A de abrir',t:'Stanford A é cirúrgico.'},{n:'Beta antes de nitro',t:'Controlar a frequência antes de vasodilatar.'}],
 pitfalls:['Dar nitroprussiato antes do betabloqueador.','Operar toda dissecção tipo B.','Trombolisar dissecção confundida com infarto.'],
 recall:[
  {q:'Limiar de correção eletiva do aneurisma em homens?',a:'5,5 cm.'},
  {q:'Quem deve ser rastreado para aneurisma?',a:'Homens de 65 a 75 anos que já fumaram, com ultrassonografia única.'},
  {q:'Conduta na dissecção Stanford A?',a:'Cirurgia de urgência.'},
  {q:'Metas iniciais na dissecção?',a:'FC em torno de 60 bpm e PAS de 100 a 120 mmHg, com betabloqueador primeiro.'},
  {q:'Indicações de TEVAR na tipo B?',a:'Má perfusão, rotura, dor refratária ou expansão rápida.'}],
 practice:['Escreva a prescrição da primeira hora de uma dissecção tipo B não complicada.'],
 refs:[
  {t:'Wanhainen A, et al. ESVS 2024 clinical practice guidelines on the management of abdominal aorto-iliac artery aneurysms. Eur J Vasc Endovasc Surg. 2024.',q:'ESVS 2024 guidelines abdominal aorto-iliac artery aneurysms'},
  {t:'Isselbacher EM, et al. 2022 ACC/AHA guideline for the diagnosis and management of aortic disease. Circulation. 2022.',q:'2022 ACC AHA guideline diagnosis management aortic disease'},
  {t:'US Preventive Services Task Force. Screening for abdominal aortic aneurysm. JAMA. 2019.',q:'USPSTF screening abdominal aortic aneurysm 2019'}],
 note:'Diretriz europeia de aneurismas de 2024 e diretriz americana de doenças da aorta de 2022.'
},
'cirvasc_3':{
 updated:'2026-11',
 pretest:['O que significa C6 na classificação CEAP?','Qual é o tratamento de primeira linha da safena insuficiente?','Como usar o escore de Wells e o D-dímero na suspeita de TVP?','Quando indicar filtro de veia cava?'],
 sections:[
  {h:'Doença venosa crônica',table:{head:['CEAP clínico','Achado'],rows:[
   ['C0','Sem sinais visíveis'],['C1','Telangiectasias ou veias reticulares'],['C2','Varizes'],['C3','Edema'],['C4','Alterações de pele: pigmentação ou eczema (4a); lipodermatoesclerose ou atrofia branca (4b)'],['C5','Úlcera cicatrizada'],['C6','Úlcera ativa']]},
   after:'Duplex venoso mostra refluxo e define o tratamento. Medidas para todos: elevação dos membros, exercício e meia de compressão. Safena insuficiente sintomática: ablação térmica endovenosa (laser ou radiofrequência) é a primeira escolha da diretriz europeia, com cirurgia convencional e escleroterapia com espuma como alternativas. A úlcera venosa, típica perto do maléolo medial, cicatriza com compressão, e a ablação precoce do refluxo acelera a cicatrização e reduz recidiva (estudo EVRA).'},
  {h:'Trombose venosa profunda',list:[
   '<strong>Tríade de Virchow:</strong> estase, lesão endotelial e hipercoagulabilidade.',
   '<strong>Wells:</strong> com probabilidade baixa, D-dímero; se negativo, exclui; se positivo, duplex. Com probabilidade alta, duplex direto.',
   '<strong>Tratamento:</strong> anticoagulantes orais diretos (rivaroxabana, apixabana) são a primeira escolha na maioria. Varfarina exige heparina em ponte até INR entre 2 e 3. Câncer: heparina de baixo peso ou anticoagulante direto conforme risco de sangramento.',
   '<strong>Duração:</strong> pelo menos 3 meses na TVP provocada por fator transitório; estender na não provocada ou com fator persistente, avaliando sangramento.',
   '<strong>Filtro de veia cava:</strong> só quando há contraindicação à anticoagulação em TVP proximal aguda.',
   '<strong>Flegmasia cerulea dolens:</strong> trombose maciça com membro azulado, edemaciado e risco de gangrena; trombólise ou trombectomia.']},
  {h:'Profilaxia no paciente cirúrgico',p:['Estratificar o risco (escore de Caprini) e o risco de sangramento. Risco moderado ou alto: heparina de baixo peso (enoxaparina 40 mg ao dia) ou heparina não fracionada. Risco alto de sangramento: métodos mecânicos (compressão pneumática). Profilaxia estendida por cerca de 4 semanas após cirurgia oncológica abdominal ou pélvica de grande porte. Mobilização precoce para todos.']}
 ],
 flow:{title:'Suspeita de TVP',nodes:[
  {k:'start',t:'Perna edemaciada e dolorosa'},
  {k:'do',t:'Escore de Wells'},
  {k:'ask',t:'Probabilidade baixa?',yes:'D-dímero: se negativo, exclui',no:'Duplex venoso direto'},
  {k:'ask',t:'Duplex confirma TVP?',yes:'Anticoagulante oral direto na maioria',no:'Investigar outras causas'},
  {k:'ask',t:'Contraindicação à anticoagulação?',yes:'Filtro de veia cava',no:'Pelo menos 3 meses de anticoagulação'},
  {k:'end',t:'Flegmasia: trombólise ou trombectomia'}]},
 reasoning:['D-dímero só serve para excluir na probabilidade baixa.','Filtro não trata TVP; é para quem não pode anticoagular.','Úlcera no maléolo medial com pigmentação: venosa; dedos e calcanhar com dor: arterial.'],
 mnemonics:[{n:'CEAP 6',t:'Úlcera ativa; 5 cicatrizada.'},{n:'Virchow: estase, lesão, coagulação',t:'Tríade da trombose.'},{n:'Três meses',t:'Duração mínima da anticoagulação na TVP provocada.'}],
 pitfalls:['Pedir D-dímero em probabilidade alta.','Colocar filtro em quem pode anticoagular.','Tratar úlcera venosa sem compressão.'],
 recall:[
  {q:'O que é CEAP C4?',a:'Alterações de pele: pigmentação, eczema, lipodermatoesclerose ou atrofia branca.'},
  {q:'Primeira linha para safena insuficiente?',a:'Ablação térmica endovenosa.'},
  {q:'Papel do D-dímero?',a:'Excluir TVP em probabilidade baixa quando negativo.'},
  {q:'Indicação de filtro de veia cava?',a:'TVP proximal aguda com contraindicação à anticoagulação.'},
  {q:'Duração mínima da anticoagulação na TVP provocada?',a:'3 meses.'}],
 practice:['Diferencie úlcera venosa e arterial em cinco características.'],
 refs:[
  {t:'De Maeseneer MG, et al. European Society for Vascular Surgery 2022 clinical practice guidelines on the management of chronic venous disease of the lower limbs. Eur J Vasc Endovasc Surg. 2022.',q:'ESVS 2022 clinical practice guidelines chronic venous disease lower limbs'},
  {t:'Kakkos SK, et al. European Society for Vascular Surgery 2021 clinical practice guidelines on the management of venous thrombosis. Eur J Vasc Endovasc Surg. 2021.',q:'ESVS 2021 clinical practice guidelines management of venous thrombosis'},
  {t:'Gohel MS, et al. A randomized trial of early endovenous ablation in venous ulceration (EVRA). N Engl J Med. 2018.',q:'EVRA early endovenous ablation venous ulceration NEJM 2018'}],
 note:'Diretrizes europeias de doença venosa.'
}
});
