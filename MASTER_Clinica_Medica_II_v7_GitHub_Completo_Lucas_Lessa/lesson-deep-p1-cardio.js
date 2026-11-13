/* Estudo aprofundado · Arritmias e hipertensão (P1). Texto original; referências ao final de cada aula. */
LessonDeep.add({
'p1arr_1':{
 updated:'2026-11',
 pretest:['Qual a taquicardia supraventricular paroxística mais comum?','Qual manobra vagal tem melhor taxa de reversão?','Como se aplica a adenosina e o que avisar ao paciente?','Em que taquicardia os bloqueadores do nó atrioventricular são perigosos?'],
 sections:[
  {h:'O mecanismo explica o tratamento',p:[
   'A maioria das taquicardias de QRS estreito e regular depende de um circuito de reentrada que passa pelo nó atrioventricular. Se o nó é bloqueado por um instante, o circuito se interrompe e o ritmo sinusal volta. É por isso que manobra vagal e adenosina funcionam.',
   'Quando a taquicardia nasce no átrio (taquicardia atrial, flutter), bloquear o nó não a encerra, mas reduz a resposta ventricular e deixa a atividade atrial visível. A adenosina, então, serve também como teste diagnóstico.']},
  {h:'Diagnóstico diferencial do QRS estreito',table:{head:['Ritmo','Regular?','Pista no ECG','Resposta à adenosina'],rows:[
   ['Taquicardia sinusal','Sim','P normal antes de cada QRS; início e fim graduais','Desacelera e volta'],
   ['Reentrada nodal','Sim','P escondida ou logo após o QRS (pseudo-S em derivações inferiores, pseudo-R em V1)','Reverte'],
   ['Reentrada atrioventricular por via acessória','Sim','P retrógrada um pouco depois do QRS; onda delta no ECG em ritmo sinusal','Reverte'],
   ['Taquicardia atrial','Sim','P de morfologia diferente, antes do QRS','Bloqueio transitório revela as ondas P'],
   ['Flutter atrial','Sim (2:1) ou não','Dente de serra; frequência ventricular perto de 150','Revela as ondas F'],
   ['Fibrilação atrial','Não','Sem P, RR irregular','Só desacelera']]},
   after:'A reentrada nodal é a mais comum, sobretudo em mulheres jovens. Início e término súbitos, com sensação de batimento no pescoço, são típicos.'},
  {h:'Tratamento agudo',list:[
   '<strong>Instável</strong> (hipotensão, choque, dor isquêmica, edema pulmonar, rebaixamento): cardioversão elétrica sincronizada.',
   '<strong>Manobra vagal:</strong> a de Valsalva modificada (soprar por 15 segundos semissentado e, em seguida, deitar com as pernas elevadas a 45 graus) reverteu cerca de 43% dos casos no estudo REVERT, contra 17% da manobra padrão. Massagem do seio carotídeo só sem sopro e sem doença carotídea.',
   '<strong>Adenosina:</strong> 6 mg em bolus rápido, em veia proximal, seguidos de lavagem com soro; repetir com 12 mg. Avisar sobre mal-estar torácico e rubor por alguns segundos. Cautela em asma grave; reduzir a dose em transplantados cardíacos e em uso de dipiridamol.',
   '<strong>Sem resposta:</strong> verapamil ou diltiazem, ou betabloqueador, por via intravenosa.',
   'Registrar o ECG durante a manobra e a adenosina.']},
  {h:'Pré-excitação (Wolff-Parkinson-White)',list:[
   'ECG em ritmo sinusal: PR curto, onda delta e QRS alargado.',
   'Taquicardia ortodrômica (desce pelo nó, sobe pela via): QRS estreito, tratada como as demais.',
   '<strong>Fibrilação atrial pré-excitada:</strong> QRS largo, irregular, muito rápido e com morfologia que varia. Bloqueadores do nó (adenosina, verapamil, diltiazem, betabloqueador, digoxina) podem acelerar a condução pela via e causar fibrilação ventricular. Tratar com cardioversão elétrica ou procainamida.',
   'Tratamento definitivo: ablação da via acessória.']},
  {h:'Depois da reversão',list:[
   'Ablação por cateter é o tratamento de escolha para episódios recorrentes ou sintomáticos, com taxa de sucesso acima de 95% na reentrada nodal.',
   'Quem não quer ou não pode ablação: betabloqueador, verapamil ou diltiazem.',
   'Ensinar a manobra vagal ao paciente.',
   'Episódio único e bem tolerado pode ser apenas acompanhado.']}
 ],
 flow:{title:'Taquicardia regular de QRS estreito',nodes:[
  {k:'start',t:'Frequência acima de 150, QRS abaixo de 120 ms, ritmo regular'},
  {k:'ask',t:'Instável?',yes:'Cardioversão sincronizada',no:'Seguir'},
  {k:'do',t:'ECG de 12 derivações e monitorização contínua'},
  {k:'do',t:'Manobra de Valsalva modificada'},
  {k:'ask',t:'Reverteu?',yes:'Observar, ECG em ritmo sinusal (procurar onda delta)',no:'Adenosina 6 mg; repetir com 12 mg'},
  {k:'ask',t:'A adenosina revelou ondas de flutter ou de taquicardia atrial?',yes:'Controlar frequência e tratar o ritmo atrial',no:'Se persistir: verapamil, diltiazem ou betabloqueador'},
  {k:'end',t:'Encaminhar para avaliação de ablação se recorrente'}]},
 reasoning:[
  'Frequência fixa perto de 150 é flutter 2:1 até prova em contrário.',
  'Taquicardia sinusal tem causa: febre, dor, hipovolemia, embolia, tireotoxicose. Trate a causa.',
  'Irregular e de QRS largo em jovem: pense em fibrilação atrial pré-excitada e não use bloqueador do nó.',
  'Sempre peça ECG depois de reverter.',
  'A adenosina dura segundos: se não for em bolus rápido com lavagem, não chega ao coração.'],
 mnemonics:[
  {n:'6 e 12',t:'Doses da adenosina.'},
  {n:'Valsalva e pernas para cima',t:'A manobra modificada.'},
  {n:'Delta + irregular + largo = não bloquear',t:'Regra da fibrilação atrial pré-excitada.'},
  {n:'150 = flutter',t:'Lembrete da condução 2:1.'}],
 pitfalls:[
  'Aplicar adenosina devagar ou em veia distal.',
  'Dar verapamil a taquicardia de QRS largo.',
  'Usar bloqueador do nó na fibrilação atrial pré-excitada.',
  'Não registrar o ECG durante a reversão.',
  'Tratar taquicardia sinusal com antiarrítmico.',
  'Fazer massagem carotídea sem auscultar as carótidas.'],
 recall:[
  {q:'Mulher de 28 anos, palpitações súbitas, frequência de 190, QRS estreito e regular, pressão de 110 por 70. Qual a sequência?',a:'Monitor e ECG, manobra de Valsalva modificada, adenosina 6 mg em bolus rápido com lavagem e, se necessário, 12 mg. Se não reverter, verapamil ou betabloqueador intravenoso.'},
  {q:'O que o estudo REVERT mostrou?',a:'A manobra de Valsalva modificada, com elevação passiva das pernas logo após o esforço, reverteu cerca de 43% das taquicardias, contra 17% com a manobra padrão.'},
  {q:'Homem de 22 anos com taquicardia irregular de QRS largo a 250 por minuto, estável. O que evitar e o que usar?',a:'Fibrilação atrial pré-excitada provável. Evitar adenosina, verapamil, diltiazem, betabloqueador e digoxina. Usar procainamida ou cardioversão elétrica.'},
  {q:'Como a adenosina ajuda no diagnóstico?',a:'Ao bloquear o nó por segundos, encerra as taquicardias que dependem dele e, nas atriais, expõe as ondas P ou de flutter.'},
  {q:'Qual o tratamento definitivo da reentrada nodal recorrente?',a:'Ablação por cateter da via lenta, com sucesso acima de 95%.'}],
 practice:[
  'Explique a sensação da adenosina antes de aplicar.',
  'Use torneira de três vias: adenosina em uma, soro na outra.',
  'Guarde o traçado da crise: é o que o eletrofisiologista vai querer ver.'],
 refs:[
  {t:'Brugada J, et al. 2019 ESC Guidelines for the management of patients with supraventricular tachycardia. Eur Heart J. 2020.',q:'2019 ESC Guidelines management of patients with supraventricular tachycardia Brugada'},
  {t:'Appelboam A, et al. Postural modification to the standard Valsalva manoeuvre for emergency treatment of supraventricular tachycardias (REVERT). Lancet. 2015.',q:'Postural modification standard Valsalva manoeuvre emergency treatment supraventricular tachycardias REVERT Appelboam'}],
 note:'Síntese da diretriz europeia e do estudo REVERT.'
},
'p1arr_2':{
 updated:'2026-11',
 pretest:['Taquicardia regular de QRS largo em paciente com infarto prévio: qual o diagnóstico até prova em contrário?','Qual o tratamento da torsades de pointes?','Quais são os ritmos chocáveis na parada cardíaca?','Quando entram adrenalina e amiodarona no algoritmo da parada?'],
 sections:[
  {h:'QRS largo: assuma taquicardia ventricular',p:[
   'Taquicardia regular com QRS de 120 ms ou mais pode ser ventricular, supraventricular com bloqueio de ramo ou pré-excitada. Na dúvida, trate como ventricular: é a mais comum, sobretudo em quem tem cardiopatia estrutural ou infarto prévio, e tratar como supraventricular pode ser fatal. Estabilidade hemodinâmica não ajuda a diferenciar.'],
   list:[
   'Favorecem origem ventricular: dissociação atrioventricular, batimentos de captura e de fusão, QRS muito largo, eixo extremo, concordância nas precordiais.',
   'Taquicardia ventricular sustentada dura mais de 30 segundos ou causa instabilidade.',
   'Monomórfica sugere cicatriz (reentrada). Polimórfica sugere isquemia aguda ou QT longo.']},
  {h:'Tratamento da taquicardia ventricular com pulso',table:{head:['Situação','Conduta'],rows:[
   ['Instável','Cardioversão elétrica sincronizada, com sedação se possível'],
   ['Monomórfica estável','Procainamida ou amiodarona 150 mg em 10 minutos; cardioversão se falhar. No estudo PROCAMIO, a procainamida teve menos eventos adversos e mais reversão que a amiodarona'],
   ['Polimórfica com QT normal','Tratar isquemia: reperfusão, betabloqueador, amiodarona'],
   ['Polimórfica com QT longo (torsades)','Sulfato de magnésio, correção de potássio, suspensão de fármacos, aumento da frequência cardíaca'],
   ['Sem pulso','Desfibrilação imediata e reanimação']]},
   after:'Depois do episódio: procurar isquemia, corrigir potássio e magnésio, avaliar a função ventricular e a indicação de cardiodesfibrilador.'},
  {h:'Torsades de pointes',list:[
   'Taquicardia polimórfica com QRS que parece girar em torno da linha de base, em paciente com QT longo.',
   'Causas adquiridas: antiarrítmicos das classes IA e III, macrolídeos, quinolonas, antipsicóticos (haloperidol), ondansetrona, metadona, antifúngicos azólicos; hipocalemia, hipomagnesemia, hipocalcemia; bradicardia.',
   'Tratamento: sulfato de magnésio 2 g intravenosos, mesmo com magnésio normal; potássio em nível normal-alto; suspender os fármacos; se recorrer com bradicardia ou pausas, aumentar a frequência com marca-passo provisório ou isoproterenol.',
   'Instável ou sem pulso: desfibrilação.',
   'QT longo congênito: betabloqueador e evitar fármacos que prolongam o QT.']},
  {h:'Parada cardiorrespiratória',p:[
   'O que mais muda a sobrevida é compressão de qualidade e desfibrilação precoce. Compressões de 100 a 120 por minuto, com 5 a 6 cm de profundidade, retorno completo do tórax e interrupções mínimas.'],
   table:{head:['','Chocável (fibrilação ventricular, taquicardia ventricular sem pulso)','Não chocável (atividade elétrica sem pulso, assistolia)'],rows:[
    ['Prioridade','Choque e voltar a comprimir por 2 minutos','Compressões e adrenalina o quanto antes'],
    ['Adrenalina','1 mg a cada 3 a 5 minutos, a partir do segundo choque','1 mg a cada 3 a 5 minutos'],
    ['Antiarrítmico','Amiodarona 300 mg após o terceiro choque (depois 150 mg), ou lidocaína','Não indicado'],
    ['Ao mesmo tempo','Procurar causas reversíveis','Procurar causas reversíveis']]},
   after:'Causas reversíveis, os 5 H e 5 T: hipovolemia, hipóxia, hidrogênio (acidose), hipo ou hipercalemia, hipotermia; tensão no tórax (pneumotórax), tamponamento, toxinas, trombose pulmonar e trombose coronariana.'},
  {h:'Depois do retorno da circulação',list:[
   'ECG de 12 derivações; coronariografia de emergência se houver supradesnível de ST.',
   'Evitar hipóxia e hiperóxia; ventilar para normocapnia.',
   'Pressão arterial média de 65 mmHg ou mais.',
   'Controle de temperatura com prevenção ativa de febre em quem permanece comatoso.',
   'Glicemia, eletrólitos e investigação da causa.',
   'Cardiodesfibrilador implantável em sobreviventes de parada por arritmia ventricular sem causa reversível (prevenção secundária) e em disfunção ventricular importante persistente apesar do tratamento otimizado (prevenção primária).']}
 ],
 flow:{title:'Taquicardia de QRS largo',nodes:[
  {k:'start',t:'QRS de 120 ms ou mais, frequência acima de 100'},
  {k:'ask',t:'Tem pulso?',yes:'Seguir',no:'Parada: comprimir, desfibrilar, adrenalina e amiodarona conforme o algoritmo'},
  {k:'ask',t:'Instável?',yes:'Cardioversão sincronizada',no:'ECG de 12 derivações'},
  {k:'ask',t:'Polimórfica?',yes:'Medir o QT em ritmo de base: longo, magnésio; normal, tratar isquemia',no:'Monomórfica: tratar como taquicardia ventricular'},
  {k:'do',t:'Procainamida ou amiodarona; cardioversão se não reverter'},
  {k:'do',t:'Corrigir potássio e magnésio; procurar isquemia; rever fármacos'},
  {k:'end',t:'Ecocardiograma, avaliação de cardiodesfibrilador e de ablação'}]},
 reasoning:[
  'QRS largo em cardiopata é ventricular. Não gaste tempo com critérios se o paciente está mal.',
  'Paciente estável com taquicardia ventricular continua em risco: monitor e desfibrilador ao lado.',
  'Polimórfica: a primeira pergunta é o intervalo QT.',
  'Na parada, se o ritmo não é chocável, pense na causa: é ela que precisa ser tratada.',
  'Todo paciente em uso de vários fármacos que prolongam o QT merece ECG e eletrólitos.'],
 mnemonics:[
  {n:'Largo = Letal até provar',t:'Trate QRS largo como ventricular.'},
  {n:'Torsades: Mg, K, parar, acelerar',t:'Magnésio, potássio, suspender fármacos, aumentar a frequência.'},
  {n:'Choque 2, adrenalina; choque 3, amiodarona',t:'Sequência no ritmo chocável.'},
  {n:'5 H e 5 T',t:'Causas reversíveis da parada.'}],
 pitfalls:[
  'Dar verapamil a taquicardia de QRS largo.',
  'Confiar na estabilidade para concluir que é supraventricular.',
  'Tratar torsades com amiodarona, que prolonga ainda mais o QT.',
  'Interromper as compressões por longos períodos para checar ritmo ou intubar.',
  'Chocar assistolia.',
  'Não procurar causas reversíveis na atividade elétrica sem pulso.'],
 recall:[
  {q:'Homem de 65 anos, infarto há 3 anos, taquicardia regular de QRS largo a 180, pressão de 118 por 76. Diagnóstico e tratamento?',a:'Taquicardia ventricular monomórfica estável. Procainamida ou amiodarona intravenosa, com desfibrilador pronto; cardioversão sincronizada se não reverter ou se instabilizar.'},
  {q:'Mulher em uso de haloperidol e azitromicina, potássio de 2,9, apresenta salvas de taquicardia polimórfica. Conduta?',a:'Torsades de pointes por QT longo adquirido. Sulfato de magnésio 2 g, repor potássio, suspender os dois fármacos e, se recorrer com bradicardia, aumentar a frequência cardíaca.'},
  {q:'Qual a sequência no ritmo chocável?',a:'Choque, 2 minutos de compressões, novo choque, adrenalina 1 mg, compressões, terceiro choque, amiodarona 300 mg, mantendo adrenalina a cada 3 a 5 minutos e procurando causas reversíveis.'},
  {q:'Cite os 5 H e 5 T.',a:'Hipovolemia, hipóxia, acidose, distúrbios do potássio, hipotermia; pneumotórax hipertensivo, tamponamento, toxinas, embolia pulmonar e trombose coronariana.'},
  {q:'Quais achados do ECG favorecem taquicardia ventricular?',a:'Dissociação atrioventricular, batimentos de captura e fusão, concordância precordial, eixo extremo e QRS muito largo.'}],
 practice:[
  'Meça o QT corrigido antes de associar fármacos de risco.',
  'Mantenha potássio acima de 4 e magnésio acima de 2 em cardiopatas com arritmia.',
  'Treine a troca de quem comprime a cada 2 minutos.'],
 refs:[
  {t:'Zeppenfeld K, et al. 2022 ESC Guidelines for the management of patients with ventricular arrhythmias and the prevention of sudden cardiac death. Eur Heart J. 2022.',q:'2022 ESC Guidelines management ventricular arrhythmias prevention sudden cardiac death Zeppenfeld'},
  {t:'Panchal AR, et al. Part 3: Adult basic and advanced life support: 2020 American Heart Association guidelines. Circulation. 2020.',q:'Part 3 Adult Basic and Advanced Life Support 2020 American Heart Association Guidelines Panchal'},
  {t:'Ortiz M, et al. Randomized comparison of intravenous procainamide vs intravenous amiodarone for the acute treatment of tolerated wide QRS tachycardia: the PROCAMIO study. Eur Heart J. 2017.',q:'Randomized comparison intravenous procainamide amiodarone tolerated wide QRS tachycardia PROCAMIO Ortiz'}],
 note:'Síntese da diretriz europeia de 2022 e das diretrizes de reanimação de 2020. Há atualizações periódicas dos algoritmos de reanimação; confirme a versão vigente.'
},
'p1arr_3':{
 updated:'2026-11',
 pretest:['Como diferenciar Mobitz I de Mobitz II?','Qual a dose de atropina na bradicardia instável?','Em que bloqueios a atropina tende a não funcionar?','Que causas reversíveis procurar antes de indicar marca-passo definitivo?'],
 sections:[
  {h:'Onde está o bloqueio',p:[
   'A pergunta central é se o problema está no nó atrioventricular ou abaixo dele, no sistema His-Purkinje. Bloqueio nodal costuma ser benigno, com QRS estreito, ritmo de escape confiável e resposta à atropina. Bloqueio infranodal é instável, com QRS largo, escape lento e risco de assistolia: pede marca-passo.'],
   table:{head:['Bloqueio','ECG','Local habitual','Significado'],rows:[
    ['Primeiro grau','PR acima de 200 ms, toda P conduz','Nó','Benigno'],
    ['Segundo grau Mobitz I (Wenckebach)','PR aumenta progressivamente até uma P bloqueada','Nó','Geralmente benigno; comum em atletas e durante o sono'],
    ['Segundo grau Mobitz II','PR constante, com P bloqueada de repente','Abaixo do nó','Risco de bloqueio total; marca-passo'],
    ['2:1','Uma P conduz, outra não','Indefinido pelo ECG','QRS largo sugere infranodal'],
    ['Avançado','Duas ou mais P seguidas bloqueadas','Abaixo do nó','Marca-passo'],
    ['Terceiro grau (total)','P e QRS independentes','Nó (escape estreito, 40 a 60) ou abaixo (escape largo, 20 a 40)','Marca-passo se não reversível']]}},
  {h:'Bradicardia sinusal e doença do nó sinusal',list:[
   'Bradicardia sinusal assintomática é normal em atletas e no sono. Não se trata frequência; trata-se sintoma.',
   'Doença do nó sinusal: bradicardia inapropriada, pausas, incompetência cronotrópica ou síndrome bradi-taqui (alternância com fibrilação atrial).',
   'Sintomas: síncope, pré-síncope, fadiga, intolerância ao esforço, piora de insuficiência cardíaca.']},
  {h:'Causas reversíveis',list:[
   'Fármacos: betabloqueadores, verapamil e diltiazem, digoxina, amiodarona, clonidina, ivabradina.',
   'Hipercalemia, hipotireoidismo, hipotermia, hipóxia.',
   'Infarto inferior (bloqueio nodal, em geral transitório) e infarto anterior (bloqueio infranodal, mau prognóstico).',
   'Aumento do tônus vagal, apneia do sono, hipertensão intracraniana.',
   'Infecções e infiltração: doença de Chagas (muito relevante no Brasil), doença de Lyme, miocardite, sarcoidose, amiloidose.',
   'Pós-operatório de cirurgia cardíaca e implante de valva por cateter.']},
  {h:'Bradicardia instável',p:[
   'Instabilidade: hipotensão, alteração aguda de consciência, sinais de choque, dor torácica isquêmica ou insuficiência cardíaca aguda atribuíveis à bradicardia.'],
   list:[
   'Monitor, oxigênio se hipoxemia, acesso venoso, ECG de 12 derivações. Procurar e tratar a causa.',
   '<strong>Atropina</strong> 1 mg em bolus, repetida a cada 3 a 5 minutos, até 3 mg.',
   'Se não responder: <strong>marca-passo transcutâneo</strong>, com analgesia e sedação, ou infusão de <strong>dopamina</strong> ou <strong>adrenalina</strong>.',
   'Em seguida, marca-passo transvenoso provisório e avaliação da cardiologia.',
   'A atropina age no nó. Tende a não funcionar no bloqueio infranodal e não funciona no coração transplantado. Nesses casos, vá direto ao marca-passo ou às catecolaminas.',
   'Hipercalemia: gluconato de cálcio. Intoxicação por betabloqueador ou bloqueador de canal de cálcio: glucagon, cálcio, insulina em dose alta.']},
  {h:'Marca-passo definitivo',table:{head:['Indicado','Não indicado'],rows:[
   ['Doença do nó sinusal com sintomas relacionados à bradicardia','Bradicardia sinusal assintomática'],
   ['Mobitz II, bloqueio avançado ou total não reversíveis, com ou sem sintomas','Bloqueio de primeiro grau assintomático'],
   ['Bloqueio de ramo alternante','Mobitz I assintomático de localização nodal'],
   ['Síncope com bloqueio bifascicular após investigação','Bloqueio por causa reversível que se resolveu'],
   ['Bradicardia sintomática por fármaco indispensável','']]}}
 ],
 flow:{title:'Frequência cardíaca baixa',nodes:[
  {k:'start',t:'Frequência abaixo de 50 por minuto'},
  {k:'ask',t:'Há sintomas ou sinais de hipoperfusão causados pela bradicardia?',yes:'Seguir',no:'Observar; ECG; procurar causas; sem tratamento de urgência'},
  {k:'do',t:'Monitor, acesso, ECG de 12 derivações, potássio, revisão de fármacos'},
  {k:'do',t:'Atropina 1 mg; repetir a cada 3 a 5 minutos até 3 mg'},
  {k:'ask',t:'Sem resposta, ou bloqueio infranodal (Mobitz II, total com QRS largo)?',yes:'Marca-passo transcutâneo ou dopamina ou adrenalina; preparar transvenoso',no:'Manter monitorização'},
  {k:'ask',t:'Causa reversível identificada?',yes:'Tratar a causa e reavaliar a necessidade de marca-passo',no:'Marca-passo definitivo conforme a indicação'},
  {k:'end',t:'Investigar cardiopatia de base, inclusive sorologia para Chagas'}]},
 reasoning:[
  'PR que cresce antes da pausa é Wenckebach; PR igual antes da pausa é Mobitz II.',
  'QRS largo no escape significa bloqueio baixo e perigoso.',
  'Infarto inferior com bloqueio costuma se resolver; infarto anterior com bloqueio pede marca-passo.',
  'Bradicardia com potássio alto se trata com cálcio, não com atropina.',
  'No Brasil, bloqueio de ramo direito com hemibloqueio anterior esquerdo em adulto jovem lembra Chagas.'],
 mnemonics:[
  {n:'Wenckebach avisa; Mobitz II trai',t:'Um prolonga o PR antes de falhar; o outro falha sem aviso.'},
  {n:'1 mg até 3',t:'Dose da atropina.'},
  {n:'Atropina, Transcutâneo, Dopamina, Adrenalina',t:'A escada da bradicardia instável.'},
  {n:'Nodal responde, infranodal não',t:'Efeito esperado da atropina.'}],
 pitfalls:[
  'Tratar número em paciente assintomático.',
  'Insistir em atropina no bloqueio total com QRS largo.',
  'Não dosar potássio.',
  'Indicar marca-passo definitivo sem excluir causa reversível.',
  'Esquecer analgesia e sedação no marca-passo transcutâneo.',
  'Suspender de forma abrupta betabloqueador em coronariopata sem avaliar o risco.'],
 recall:[
  {q:'ECG com PR fixo de 180 ms e ondas P bloqueadas de forma intermitente, QRS de 140 ms. Qual o bloqueio e a conduta?',a:'Segundo grau Mobitz II, de localização infranodal. Monitorar, deixar marca-passo provisório disponível e indicar marca-passo definitivo se não houver causa reversível.'},
  {q:'Idoso com frequência de 34, pressão de 76 por 40 e confusão. Bloqueio total com escape largo. O que fazer?',a:'Bradicardia instável por bloqueio infranodal. Atropina pode ser tentada, mas a prioridade é marca-passo transcutâneo ou infusão de dopamina ou adrenalina, seguido de marca-passo transvenoso.'},
  {q:'Por que a atropina não funciona no coração transplantado?',a:'Porque o coração está desnervado, sem tônus vagal para bloquear; pode até causar bloqueio paradoxal.'},
  {q:'Cite cinco causas reversíveis de bradicardia.',a:'Fármacos cronotrópicos negativos, hipercalemia, hipotireoidismo, hipotermia, infarto inferior, apneia do sono.'},
  {q:'Atleta de 25 anos com frequência de 42 e Mobitz I durante o sono, assintomático. Conduta?',a:'Nenhuma. É achado fisiológico por tônus vagal elevado.'}],
 practice:[
  'Marque as ondas P com um compasso ou papel para ver se caminham pelo traçado.',
  'Revise a prescrição: a causa mais comum está nela.',
  'Peça sorologia para doença de Chagas em bloqueios sem explicação.'],
 refs:[
  {t:'Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the evaluation and management of patients with bradycardia and cardiac conduction delay. Circulation. 2019.',q:'2018 ACC AHA HRS Guideline evaluation management bradycardia cardiac conduction delay Kusumoto'},
  {t:'Glikson M, et al. 2021 ESC Guidelines on cardiac pacing and cardiac resynchronization therapy. Eur Heart J. 2021.',q:'2021 ESC Guidelines on cardiac pacing and cardiac resynchronization therapy Glikson'}],
 note:'Síntese das diretrizes norte-americana e europeia.'
},
'p1has_0':{
 updated:'2026-11',
 pretest:['Quantos fármacos definem hipertensão resistente e qual deles é obrigatório?','O que é pseudorresistência?','Qual o quarto fármaco de escolha e que estudo o sustenta?','Qual a causa secundária mais comum nesses pacientes?'],
 sections:[
  {h:'Definições',list:[
   '<strong>Hipertensão resistente:</strong> pressão acima da meta com três anti-hipertensivos de classes diferentes em doses otimizadas, sendo um deles diurético; ou pressão controlada com quatro ou mais.',
   '<strong>Refratária:</strong> não controlada com cinco ou mais, incluindo diurético tiazídico de longa ação e espironolactona.',
   '<strong>Pseudorresistência:</strong> parece resistente, mas não é. Precisa ser excluída antes de qualquer investigação cara.']},
  {h:'Primeiro passo: excluir pseudorresistência',table:{head:['Causa','Como identificar'],rows:[
   ['Técnica de medida inadequada','Manguito pequeno para o braço, sem repouso, conversa durante a medida'],
   ['Efeito do avental branco','Medidas fora do consultório normais'],
   ['Má adesão','Perguntar sem julgar, contar comprimidos, verificar retirada na farmácia'],
   ['Esquema inadequado','Doses baixas, sem diurético, combinações da mesma classe'],
   ['Inércia terapêutica','Consultas sem ajuste apesar de pressão alta']]},
   after:'Cerca de metade dos casos encaminhados como resistentes se resolve nesta etapa.'},
  {h:'Medida fora do consultório',list:[
   '<strong>Monitorização residencial (MRPA):</strong> aparelho validado, de braço. Três medidas pela manhã e três à noite por 5 dias, ou duas e duas por 7 dias, descartando o primeiro dia. Anormal: média de 130 por 80 mmHg ou mais.',
   '<strong>Monitorização ambulatorial de 24 horas (MAPA):</strong> anormal com média de 24 horas de 130 por 80 ou mais, vigília de 135 por 85 ou mais, sono de 120 por 70 ou mais. Mostra também a ausência de descenso noturno.',
   'Fenótipos: hipertensão do avental branco (alta só no consultório) e hipertensão mascarada (normal só no consultório).']},
  {h:'Fatores que mantêm a pressão alta',list:[
   'Excesso de sal, álcool, obesidade, sedentarismo.',
   'Fármacos e substâncias: anti-inflamatórios, corticoides, anticoncepcionais com estrogênio, descongestionantes, estimulantes, ciclosporina, eritropoetina, antidepressivos como a venlafaxina, alcaçuz, cocaína.',
   'Causas secundárias: apneia obstrutiva do sono (a mais frequente), hiperaldosteronismo primário (presente em parcela importante dos resistentes), doença renal crônica, estenose de artéria renal. Mais raras: feocromocitoma e síndrome de Cushing.']},
  {h:'Tratamento em degraus',list:[
   'Base tripla em doses plenas: inibidor da ECA ou bloqueador do receptor de angiotensina, bloqueador de canal de cálcio di-hidropiridínico (anlodipino) e diurético tiazídico de longa ação (clortalidona ou indapamida). Com filtração glomerular abaixo de 30, usar diurético de alça.',
   '<strong>Quarto fármaco: espironolactona</strong> 25 a 50 mg. No estudo PATHWAY-2 foi superior a bisoprolol e doxazosina. Vigiar potássio e função renal.',
   'Depois: betabloqueador, alfabloqueador, clonidina e, por fim, vasodilatadores diretos (hidralazina, minoxidil).',
   'Restrição de sódio tem efeito grande nesses pacientes.',
   'Tomar os comprimidos em dose única diária e em combinações fixas melhora a adesão.',
   'Denervação renal é opção em casos selecionados, em centros especializados.']}
 ],
 flow:{title:'Pressão fora da meta com três fármacos',nodes:[
  {k:'start',t:'Pressão de consultório alta apesar de três classes'},
  {k:'do',t:'Conferir técnica e manguito; rever adesão e doses; confirmar que há diurético'},
  {k:'do',t:'MRPA ou MAPA'},
  {k:'ask',t:'Pressão fora do consultório normal?',yes:'Efeito do avental branco: não intensificar',no:'Hipertensão resistente verdadeira'},
  {k:'do',t:'Retirar substâncias que elevam a pressão; reduzir sal e álcool'},
  {k:'do',t:'Rastrear causas secundárias: apneia do sono, aldosterona e renina, função renal, artérias renais'},
  {k:'ask',t:'Ainda fora da meta?',yes:'Associar espironolactona; depois betabloqueador, alfabloqueador, clonidina',no:'Manter e acompanhar'},
  {k:'end',t:'Encaminhar a centro de referência se refratária'}]},
 reasoning:[
  'Antes de acrescentar o quarto remédio, confirme que o paciente toma os três primeiros.',
  'Roncos e sonolência diurna em hipertenso difícil: apneia do sono.',
  'Potássio baixo em hipertenso resistente: aldosterona.',
  'Pergunte por anti-inflamatório de venda livre.',
  'Diurético fraco ou ausente é a falha de esquema mais comum.'],
 mnemonics:[
  {n:'3 com diurético ou 4 controlado',t:'Definição de resistente.'},
  {n:'A + C + D, depois E',t:'Bloqueador do sistema renina-Angiotensina, bloqueador de Cálcio, Diurético e Espironolactona.'},
  {n:'TAEI da pseudorresistência',t:'Técnica, Avental branco, Esquema e Inércia, além da adesão.'},
  {n:'130 por 80 em casa',t:'Limite da monitorização residencial.'}],
 pitfalls:[
  'Investigar causas raras antes de checar adesão e técnica.',
  'Acrescentar fármacos sem medida fora do consultório.',
  'Usar hidroclorotiazida em dose baixa como único diurético.',
  'Manter tiazídico com filtração glomerular muito baixa.',
  'Associar inibidor da ECA com bloqueador do receptor de angiotensina.',
  'Iniciar espironolactona sem acompanhar potássio.'],
 recall:[
  {q:'Homem de 58 anos, obeso, pressão de 162 por 98 no consultório com losartana, anlodipino e clortalidona em doses plenas. MAPA com média de 24 horas de 148 por 90. Próximos passos?',a:'Hipertensão resistente confirmada. Rever adesão e substâncias, reduzir sal, rastrear apneia do sono e hiperaldosteronismo, avaliar rim, e associar espironolactona.'},
  {q:'O que mostrou o estudo PATHWAY-2?',a:'Que a espironolactona foi o quarto fármaco mais eficaz, superior a bisoprolol e doxazosina, em hipertensão resistente.'},
  {q:'Como orientar a monitorização residencial?',a:'Aparelho de braço validado, após 5 minutos de repouso, três medidas pela manhã e três à noite por 5 dias, descartando o primeiro dia; média de 130 por 80 ou mais é anormal.'},
  {q:'Diferencie hipertensão do avental branco de hipertensão mascarada.',a:'Avental branco: alta no consultório e normal fora. Mascarada: normal no consultório e alta fora, com risco cardiovascular aumentado.'},
  {q:'Qual diurético usar com filtração glomerular de 22?',a:'Diurético de alça, pois os tiazídicos perdem eficácia.'}],
 practice:[
  'Tenha manguitos de mais de um tamanho.',
  'Peça ao paciente que traga as caixas dos remédios.',
  'Simplifique: menos comprimidos, uma tomada ao dia.'],
 refs:[
  {t:'Barroso WKS, et al. Diretrizes Brasileiras de Hipertensão Arterial 2020. Arq Bras Cardiol. 2021.',q:'Diretrizes Brasileiras de Hipertensao Arterial 2020 Barroso Arq Bras Cardiol'},
  {t:'Williams B, et al. Spironolactone versus placebo, bisoprolol, and doxazosin to determine the optimal treatment for drug-resistant hypertension (PATHWAY-2). Lancet. 2015.',q:'Spironolactone versus placebo bisoprolol doxazosin drug-resistant hypertension PATHWAY-2 Williams'},
  {t:'Carey RM, et al. Resistant hypertension: detection, evaluation, and management. A scientific statement from the American Heart Association. Hypertension. 2018.',q:'Resistant Hypertension Detection Evaluation and Management Scientific Statement American Heart Association Carey 2018'}],
 note:'Limiares de MRPA e MAPA conforme a diretriz brasileira de 2020. Há diretriz brasileira mais recente; confirme os valores vigentes.'
},
'p1has_1':{
 updated:'2026-11',
 pretest:['A hipocalemia está presente na maioria dos casos de hiperaldosteronismo primário?','Qual o exame de rastreio e que fármaco precisa ser suspenso antes?','Para que serve o cateterismo de veias adrenais?','Qual a velocidade máxima de reposição de potássio em veia periférica?'],
 sections:[
  {h:'Mecanismo',p:[
   'A adrenal produz aldosterona de forma autônoma, sem depender da renina. A aldosterona retém sódio e água, elimina potássio e hidrogênio e suprime a renina. O resultado é hipertensão com renina baixa, tendência a hipocalemia e alcalose metabólica.',
   'Além de elevar a pressão, o excesso de aldosterona lesa diretamente coração, vasos e rim: há mais fibrilação atrial, AVC, infarto e hipertrofia ventricular do que em hipertensos com a mesma pressão. Por isso vale a pena diagnosticar.',
   'Causas: hiperplasia adrenal bilateral (a mais comum) e adenoma produtor de aldosterona (síndrome de Conn). Raras: formas familiares e carcinoma.']},
  {h:'Quem rastrear',list:[
   'Hipertensão resistente.',
   'Hipertensão com hipocalemia espontânea ou induzida por diurético.',
   'Hipertensão com incidentaloma adrenal.',
   'Hipertensão com apneia do sono.',
   'História familiar de hipertensão precoce ou de AVC antes dos 40 anos; parente com a doença.',
   'Pressão persistentemente elevada em níveis moderados a graves.'],
   after:'A hipocalemia aparece só em uma minoria. Esperar por ela faz perder a maioria dos casos. Diretriz recente da sociedade de endocrinologia propõe rastrear de forma muito mais ampla.'},
  {h:'Rastreio: relação aldosterona/renina',list:[
   'Colher pela manhã, com o paciente fora da cama há 2 horas e sentado há alguns minutos.',
   'Positivo: aldosterona elevada (em geral 15 ng/dL ou mais; alguns usam 10) com renina suprimida e relação acima de 30, quando se usa atividade de renina.',
   'Preparo: corrigir o potássio antes (hipocalemia reduz a aldosterona) e não restringir sal.',
   'Suspender espironolactona e outros antagonistas mineralocorticoides por 4 semanas. Idealmente, suspender diuréticos.',
   'Interferências: inibidores da ECA, bloqueadores do receptor de angiotensina e diuréticos elevam a renina (falso-negativo); betabloqueadores e clonidina reduzem a renina (falso-positivo). Se a renina está suprimida mesmo em uso de inibidor da ECA, o resultado é muito sugestivo.',
   'Para controlar a pressão durante a investigação: verapamil, hidralazina, doxazosina.']},
  {h:'Confirmação e subtipo',list:[
   '<strong>Teste confirmatório:</strong> infusão de 2 litros de soro fisiológico em 4 horas; aldosterona que não suprime confirma. Alternativas: sobrecarga oral de sódio, teste do captopril. Pode ser dispensado quando há hipocalemia espontânea, renina indetectável e aldosterona muito alta.',
   '<strong>Tomografia de adrenais:</strong> procura adenoma e exclui carcinoma. Sozinha, erra o lado em parte dos casos, pois nódulos não funcionantes são comuns.',
   '<strong>Cateterismo de veias adrenais:</strong> define se a produção é unilateral ou bilateral. Indicado quando a cirurgia é uma opção. Pode ser dispensado em jovens com quadro florido e adenoma unilateral típico.']},
  {h:'Tratamento',table:{head:['Achado','Conduta'],rows:[
   ['Doença unilateral','Adrenalectomia laparoscópica: cura a hipocalemia e melhora ou cura a hipertensão'],
   ['Doença bilateral, ou paciente que não vai operar','Antagonista mineralocorticoide: espironolactona (ginecomastia, disfunção sexual) ou eplerenona'],
   ['Em todos','Restrição de sódio, controle de fatores de risco']]}},
  {h:'Hipertenso com potássio baixo: diferencial',table:{head:['Renina','Aldosterona','Pensar em'],rows:[
   ['Baixa','Alta','Hiperaldosteronismo primário'],
   ['Alta','Alta','Estenose de artéria renal, diurético, tumor produtor de renina'],
   ['Baixa','Baixa','Síndrome de Cushing, alcaçuz, síndrome de Liddle, excesso aparente de mineralocorticoide']]}},
  {h:'Hipocalemia: reposição segura',list:[
   'ECG: onda T achatada, onda U, depressão de ST, arritmias.',
   'Via oral sempre que possível, com cloreto de potássio.',
   'Via intravenosa em hipocalemia grave ou sintomática: em veia periférica, até 10 a 20 mEq por hora, em solução de até 40 mEq por litro, sem glicose. Velocidades maiores exigem veia central e monitor.',
   'Corrigir o magnésio: sem isso, o potássio não sobe.',
   'Nunca em bolus.']}
 ],
 flow:{title:'Hipertenso com indicação de rastreio',nodes:[
  {k:'start',t:'Hipertensão resistente, hipocalemia, incidentaloma adrenal ou apneia do sono'},
  {k:'do',t:'Corrigir potássio; suspender espironolactona por 4 semanas; ajustar anti-hipertensivos'},
  {k:'do',t:'Dosar aldosterona e renina pela manhã'},
  {k:'ask',t:'Aldosterona alta com renina suprimida?',yes:'Teste confirmatório (dispensável no quadro florido)',no:'Diagnóstico improvável; ver outras causas'},
  {k:'do',t:'Tomografia de adrenais'},
  {k:'ask',t:'Candidato a cirurgia e deseja operar?',yes:'Cateterismo de veias adrenais para lateralizar',no:'Espironolactona ou eplerenona'},
  {k:'ask',t:'Produção unilateral?',yes:'Adrenalectomia laparoscópica',no:'Tratamento clínico'},
  {k:'end',t:'Acompanhar pressão, potássio e função renal'}]},
 reasoning:[
  'Pense na doença pelo contexto, não pelo potássio.',
  'Renina suprimida é a chave: sem ela, não é hiperaldosteronismo primário.',
  'Nódulo na tomografia não prova que é ele quem produz.',
  'Hipocalemia que não corrige: dose o magnésio.',
  'Hipertenso que desenvolve hipocalemia importante com dose baixa de tiazídico merece rastreio.'],
 mnemonics:[
  {n:'Aldo alta, renina baixa',t:'A assinatura da doença.'},
  {n:'4 semanas sem espironolactona',t:'Preparo do rastreio.'},
  {n:'Uni opera, Bi bloqueia',t:'Unilateral: cirurgia. Bilateral: antagonista.'},
  {n:'10 a 20 por hora, 40 por litro',t:'Limites do potássio em veia periférica.'}],
 pitfalls:[
  'Só rastrear quem tem hipocalemia.',
  'Dosar com o paciente em uso de espironolactona.',
  'Interpretar o exame com potássio baixo não corrigido.',
  'Operar com base apenas na tomografia em paciente de mais idade.',
  'Repor potássio em bolus ou diluído em soro glicosado.',
  'Esquecer o magnésio.'],
 recall:[
  {q:'Mulher de 45 anos, hipertensão resistente, potássio de 3,1 sem diurético. Qual exame e como preparar?',a:'Relação aldosterona/renina pela manhã, após corrigir o potássio, com dieta sem restrição de sal e sem antagonista mineralocorticoide por 4 semanas, ajustando os demais fármacos.'},
  {q:'O rastreio foi positivo e a tomografia mostra nódulo de 1,2 cm à direita em paciente de 55 anos. Pode-se operar?',a:'Não diretamente. Nessa idade, nódulos não funcionantes são comuns; é preciso cateterismo de veias adrenais para confirmar a lateralização.'},
  {q:'Qual o efeito dos inibidores da ECA e dos betabloqueadores sobre o exame?',a:'Inibidores da ECA elevam a renina e podem causar falso-negativo. Betabloqueadores reduzem a renina e podem causar falso-positivo.'},
  {q:'Como diferenciar hiperaldosteronismo primário de estenose de artéria renal pelo laboratório?',a:'No primário, a renina está suprimida. Na estenose, a renina está alta, e a aldosterona também (forma secundária).'},
  {q:'Como repor potássio de 2,6 com alteração no ECG?',a:'Cloreto de potássio intravenoso com monitor, até 10 a 20 mEq por hora em veia periférica, em solução salina de até 40 mEq por litro, com correção do magnésio e reavaliação seriada.'}],
 practice:[
  'Anote no pedido os anti-hipertensivos em uso.',
  'Avise o laboratório sobre a posição e o horário da coleta.',
  'Oriente sobre ginecomastia ao prescrever espironolactona.'],
 refs:[
  {t:'Funder JW, et al. The management of primary aldosteronism: case detection, diagnosis, and treatment. An Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2016.',q:'Management of Primary Aldosteronism Case Detection Diagnosis Treatment Endocrine Society Funder 2016'},
  {t:'Monticone S, et al. Prevalence and clinical manifestations of primary aldosteronism encountered in primary care practice. J Am Coll Cardiol. 2017.',q:'Prevalence and Clinical Manifestations of Primary Aldosteronism Encountered in Primary Care Practice Monticone 2017'}],
 note:'Pontos de corte variam com o método laboratorial. Baseado na diretriz de 2016; há atualização de 2025 com indicação de rastreio mais ampla.'
},
'p1has_2':{
 updated:'2026-11',
 pretest:['O que diferencia emergência de urgência hipertensiva?','Qual a regra geral de redução da pressão na primeira hora?','Qual a meta e o primeiro fármaco na dissecção de aorta?','No AVC isquêmico sem trombólise, a partir de que pressão se trata?'],
 sections:[
  {h:'O que define a emergência é o órgão, não o número',p:[
   'Emergência hipertensiva é a elevação acentuada da pressão com lesão aguda e progressiva de órgão-alvo: cérebro, coração, aorta, rim, retina ou placenta. Exige redução controlada com fármaco intravenoso, em ambiente monitorizado.',
   'Pressão muito alta sem lesão aguda de órgão não é emergência. Trata-se com fármacos orais, ajuste do esquema e retorno em dias. Reduzir rápido nesses pacientes causa isquemia. Dor, ansiedade, retenção urinária e abstinência elevam a pressão e devem ser tratadas primeiro (pseudocrise).']},
  {h:'Avaliação',list:[
   'Sintomas: cefaleia intensa, alteração visual, confusão, déficit focal, dor torácica ou dorsal, dispneia, redução da diurese.',
   'Exame: pressão nos dois braços, pulsos, ausculta, exame neurológico e fundo de olho (hemorragias, exsudatos, papiledema).',
   'Exames: ECG, troponina, creatinina, eletrólitos, hemograma com pesquisa de hemólise, urina, radiografia de tórax; tomografia de crânio ou angiotomografia de aorta conforme a suspeita.']},
  {h:'Regra geral e exceções',p:[
   'Regra: reduzir a pressão arterial média em até 25% na primeira hora; depois, levar a cerca de 160 por 100 em 2 a 6 horas; normalizar em 24 a 48 horas. O cérebro do hipertenso crônico só mantém o fluxo com pressões mais altas, e quedas bruscas causam infarto cerebral, cardíaco e renal.'],
   table:{head:['Situação','Meta','Fármacos'],rows:[
    ['Dissecção de aorta','Sistólica abaixo de 120 e frequência abaixo de 60, em minutos','Betabloqueador intravenoso primeiro; depois nitroprussiato'],
    ['Edema agudo de pulmão','Redução rápida','Nitroglicerina ou nitroprussiato, com diurético de alça'],
    ['Síndrome coronariana aguda','Redução moderada','Nitroglicerina e betabloqueador'],
    ['AVC isquêmico sem trombólise','Tratar só acima de 220 por 120, reduzindo cerca de 15% em 24 horas','Fármaco titulável'],
    ['AVC isquêmico com trombólise','Abaixo de 185 por 110 antes e de 180 por 105 depois','Fármaco titulável'],
    ['AVC hemorrágico','Sistólica em torno de 140','Fármaco titulável'],
    ['Encefalopatia hipertensiva','Regra geral','Nitroprussiato'],
    ['Pré-eclâmpsia grave e eclâmpsia','Abaixo de 160 por 110','Hidralazina intravenosa ou nifedipino oral; sulfato de magnésio'],
    ['Feocromocitoma, cocaína','Regra geral','Alfabloqueador ou benzodiazepínico antes de betabloqueador']]}},
  {h:'Fármacos intravenosos mais usados no Brasil',list:[
   '<strong>Nitroprussiato de sódio:</strong> início imediato, titulável. Risco de intoxicação por cianeto e tiocianato em uso prolongado ou em insuficiência renal e hepática. Evitar na gestação.',
   '<strong>Nitroglicerina:</strong> venodilatador; escolha na isquemia e no edema pulmonar.',
   '<strong>Betabloqueadores intravenosos (metoprolol, esmolol):</strong> dissecção e isquemia.',
   '<strong>Hidralazina intravenosa:</strong> gestação.',
   'Nifedipino sublingual em cápsula não deve ser usado: causa queda imprevisível.']},
  {h:'Hipertensão maligna',p:[
   'Pressão muito elevada com retinopatia avançada (hemorragias, exsudatos algodonosos, papiledema), muitas vezes com lesão renal aguda e anemia microangiopática. Trata-se como emergência, com redução gradual. Investigar causa secundária depois.']}
 ],
 flow:{title:'Pressão muito elevada no pronto-socorro',nodes:[
  {k:'start',t:'Pressão em torno de 180 por 120 mmHg ou mais'},
  {k:'do',t:'Repetir a medida após repouso; tratar dor e ansiedade; exame dirigido e fundo de olho'},
  {k:'ask',t:'Há lesão aguda de órgão-alvo?',yes:'Emergência: fármaco intravenoso em sala monitorizada',no:'Sem emergência: ajustar tratamento oral e reavaliar em dias'},
  {k:'ask',t:'Dor torácica ou dorsal com assimetria de pulsos?',yes:'Dissecção: betabloqueador, sistólica abaixo de 120, angiotomografia',no:'Seguir'},
  {k:'ask',t:'Déficit neurológico focal?',yes:'Tomografia antes de reduzir; seguir metas do AVC',no:'Seguir'},
  {k:'ask',t:'Gestante ou puérpera?',yes:'Hidralazina ou nifedipino e sulfato de magnésio',no:'Regra geral: até 25% na primeira hora'},
  {k:'end',t:'Transição para via oral e investigação de adesão e de causa secundária'}]},
 reasoning:[
  'Pergunte "qual órgão está sofrendo?" antes de "quanto está a pressão?".',
  'No AVC isquêmico, a pressão alta é mecanismo de proteção: baixar demais aumenta o infarto.',
  'Na dissecção, baixe a frequência antes da pressão; vasodilatador isolado aumenta a força de cisalhamento.',
  'Paciente assintomático com 200 por 110 precisa de consulta, não de nitroprussiato.',
  'Fundo de olho muda a classificação: faça.'],
 mnemonics:[
  {n:'25% em 1 hora; 160 por 100 em 6',t:'A regra geral.'},
  {n:'Dissecção: 120 e 60 em 20',t:'Sistólica, frequência e minutos.'},
  {n:'AVC: 220 sem lise, 185 com lise',t:'Limiares de tratamento.'},
  {n:'Beta antes do vaso na aorta; alfa antes do beta no feo',t:'As duas ordens que caem.'}],
 pitfalls:[
  'Tratar número sem lesão de órgão com fármaco intravenoso.',
  'Normalizar a pressão em minutos fora da dissecção.',
  'Reduzir a pressão no AVC isquêmico abaixo de 220 por 120 sem indicação.',
  'Dar vasodilatador antes do betabloqueador na dissecção.',
  'Usar nifedipino sublingual.',
  'Liberar o paciente sem plano de seguimento.'],
 recall:[
  {q:'Homem de 60 anos, dor torácica lancinante irradiada para o dorso, pressão de 200 por 110 no braço direito e 160 por 90 no esquerdo. Metas e fármacos?',a:'Dissecção de aorta provável. Betabloqueador intravenoso para frequência abaixo de 60 e sistólica abaixo de 120 em minutos, associando nitroprussiato se necessário, analgesia e angiotomografia.'},
  {q:'Mulher de 70 anos, hemiparesia há 2 horas, tomografia sem sangramento, candidata a trombólise, pressão de 198 por 112. Conduta com a pressão?',a:'Reduzir para abaixo de 185 por 110 antes do trombolítico e manter abaixo de 180 por 105 nas 24 horas seguintes.'},
  {q:'Paciente assintomático, pressão de 196 por 118, exame e fundo de olho normais, parou os remédios. O que fazer?',a:'Não é emergência. Reiniciar o tratamento oral, orientar e agendar reavaliação em poucos dias. Não usar fármaco intravenoso nem reduzir de forma abrupta.'},
  {q:'Qual a regra geral de redução na emergência hipertensiva?',a:'Até 25% da pressão arterial média na primeira hora, depois cerca de 160 por 100 em 2 a 6 horas e normalização em 24 a 48 horas.'},
  {q:'Qual o risco do nitroprussiato em uso prolongado?',a:'Intoxicação por cianeto e tiocianato, sobretudo em insuficiência renal ou hepática.'}],
 practice:[
  'Meça a pressão nos dois braços em toda dor torácica.',
  'Use bomba de infusão e reavalie a pressão a cada poucos minutos.',
  'Antes da alta, descubra por que a pressão descompensou.'],
 refs:[
  {t:'Barroso WKS, et al. Diretrizes Brasileiras de Hipertensão Arterial 2020. Arq Bras Cardiol. 2021.',q:'Diretrizes Brasileiras de Hipertensao Arterial 2020 Barroso Arq Bras Cardiol'},
  {t:'van den Born BH, et al. ESC Council on hypertension position document on the management of hypertensive emergencies. Eur Heart J Cardiovasc Pharmacother. 2019.',q:'ESC Council on hypertension position document management of hypertensive emergencies van den Born'}],
 note:'Metas no AVC seguem as diretrizes de AVC vigentes e podem ser atualizadas.'
},
'p1has_3':{
 updated:'2026-11',
 pretest:['Cite quatro pistas clínicas de hipertensão secundária.','Que achado após iniciar inibidor da ECA sugere estenose de artéria renal?','Qual o exame de rastreio do feocromocitoma?','No preparo cirúrgico do feocromocitoma, qual bloqueio vem primeiro?'],
 sections:[
  {h:'Quando suspeitar',list:[
   'Início antes dos 30 anos sem fatores de risco, ou início súbito após os 55.',
   'Hipertensão resistente ou piora rápida de pressão antes controlada.',
   'Hipertensão grave ou com lesão de órgão desproporcional.',
   'Hipocalemia espontânea.',
   'Ausência de descenso noturno na MAPA.',
   'Sinais específicos: sopro abdominal, assimetria de pulsos, crises de cefaleia com sudorese e palpitação, fácies característica, roncos.'],
   after:'A causa secundária é minoria entre os hipertensos, mas é a parte potencialmente curável.'},
  {h:'Doença renal parenquimatosa',p:[
   'É a causa secundária mais comum no conjunto. Creatinina, filtração estimada, urina e albuminúria em todo hipertenso; ultrassom renal se alterados. Trata-se com bloqueio do sistema renina-angiotensina, restrição de sódio e diurético adequado à função renal.']},
  {h:'Hipertensão renovascular',table:{head:['','Aterosclerose','Displasia fibromuscular'],rows:[
   ['Perfil','Mais de 50 anos, tabagista, doença arterial em outros territórios','Mulher jovem'],
   ['Lesão','Óstio e terço proximal','Terço médio e distal, em colar de contas'],
   ['Tratamento','Clínico na maioria','Angioplastia com bom resultado']]},
   list:[
   'Pistas: piora de 30% ou mais da creatinina após inibidor da ECA ou bloqueador do receptor de angiotensina, edema agudo de pulmão de repetição, sopro abdominal, rins de tamanhos diferentes, hipocalemia.',
   'Exames: Doppler de artérias renais, angiotomografia ou angiorressonância.',
   'Nos estudos CORAL e ASTRAL, a revascularização não foi melhor que o tratamento clínico na estenose aterosclerótica. Fica reservada a edema pulmonar de repetição, hipertensão refratária ou perda progressiva de função renal.',
   'Na estenose bilateral ou em rim único, o inibidor da ECA pode causar lesão renal aguda: usar com vigilância.']},
  {h:'Apneia obstrutiva do sono',list:[
   'Muito frequente na hipertensão resistente.',
   'Pistas: ronco, pausas observadas, sonolência diurna, obesidade, pescoço largo, ausência de descenso noturno.',
   'Diagnóstico por polissonografia.',
   'CPAP melhora sintomas e reduz a pressão de forma modesta; perda de peso ajuda.']},
  {h:'Feocromocitoma e paraganglioma',list:[
   'Tumores produtores de catecolaminas. Crises de cefaleia, sudorese e palpitação, com palidez, tremor e ansiedade. A hipertensão pode ser sustentada ou em crises, e há hipotensão postural.',
   'Gatilhos: anestesia, cirurgia, fármacos (metoclopramida, antidepressivos tricíclicos, betabloqueador isolado).',
   '<strong>Rastreio:</strong> metanefrinas livres plasmáticas ou metanefrinas fracionadas em urina de 24 horas. Só depois do diagnóstico bioquímico pedir imagem (tomografia ou ressonância) e, quando indicado, exame funcional.',
   'Parte importante dos casos é hereditária: oferecer teste genético a todos.',
   '<strong>Preparo cirúrgico:</strong> alfabloqueador por 7 a 14 dias, com dieta rica em sal e hidratação. Betabloqueador só depois, para controlar taquicardia. Betabloqueador isolado deixa a vasoconstrição alfa sem oposição e pode causar crise.']},
  {h:'Outras causas',table:{head:['Causa','Pista','Exame inicial'],rows:[
   ['Hiperaldosteronismo primário','Resistente, hipocalemia','Aldosterona e renina'],
   ['Síndrome de Cushing','Fácies, estrias violáceas, fraqueza proximal','Teste de supressão com 1 mg de dexametasona'],
   ['Hipotireoidismo e hipertireoidismo','Diastólica alta no primeiro, sistólica no segundo','TSH'],
   ['Hiperparatireoidismo','Cálculos, cálcio alto','Cálcio e PTH'],
   ['Coarctação de aorta','Jovem, pulsos femorais fracos e atrasados, pressão maior nos braços','Ecocardiograma, angiotomografia'],
   ['Acromegalia','Mãos e pés crescendo, fácies','IGF-1'],
   ['Fármacos e substâncias','Anti-inflamatório, corticoide, anticoncepcional, estimulantes','História']]}}
 ],
 flow:{title:'Suspeita de hipertensão secundária',nodes:[
  {k:'start',t:'Hipertenso com pista clínica de causa secundária'},
  {k:'do',t:'Rever fármacos e substâncias; creatinina, potássio, urina, albuminúria, TSH'},
  {k:'ask',t:'Função renal ou urina alteradas?',yes:'Doença renal: ultrassom e avaliação nefrológica',no:'Seguir'},
  {k:'ask',t:'Hipocalemia ou hipertensão resistente?',yes:'Aldosterona e renina',no:'Seguir'},
  {k:'ask',t:'Ronco, sonolência, obesidade?',yes:'Polissonografia',no:'Seguir'},
  {k:'ask',t:'Crises de cefaleia, sudorese e palpitação?',yes:'Metanefrinas; imagem só se alteradas',no:'Seguir'},
  {k:'ask',t:'Piora renal com inibidor da ECA, sopro abdominal ou edema pulmonar de repetição?',yes:'Doppler ou angiotomografia de artérias renais',no:'Reavaliar outras causas conforme a clínica'},
  {k:'end',t:'Tratar a causa e manter o controle pressórico'}]},
 reasoning:[
  'Comece pelo barato: história de fármacos, creatinina, potássio, urina e TSH.',
  'Jovem com pressão alta e pulso femoral fraco: coarctação.',
  'Creatinina que sobe após inibidor da ECA aponta para estenose bilateral de artéria renal.',
  'Feocromocitoma se confirma no laboratório antes da imagem.',
  'Achar a estenose não significa que dilatar vai resolver.'],
 mnemonics:[
  {n:'Tríade do feo: Cefaleia, Suor, Palpitação',t:'As três queixas das crises.'},
  {n:'Alfa antes de Beta',t:'Ordem do bloqueio no feocromocitoma.'},
  {n:'30% de creatinina',t:'Queda de função com inibidor da ECA sugere estenose renal.'},
  {n:'Jovem mulher, colar de contas',t:'Displasia fibromuscular.'}],
 pitfalls:[
  'Pedir imagem de adrenal antes das metanefrinas.',
  'Dar betabloqueador isolado a paciente com feocromocitoma.',
  'Indicar angioplastia de artéria renal a toda estenose aterosclerótica.',
  'Não palpar pulsos femorais em jovem hipertenso.',
  'Esquecer anti-inflamatórios e anticoncepcionais na história.',
  'Investigar causas raras em hipertenso típico e bem controlado.'],
 recall:[
  {q:'Mulher de 28 anos, hipertensão recente e sopro em flanco. Hipótese e tratamento?',a:'Displasia fibromuscular de artéria renal. Confirmar com angiotomografia ou angiorressonância; a angioplastia costuma ter bom resultado.'},
  {q:'Homem de 68 anos, tabagista, creatinina passou de 1,2 para 2,0 após iniciar enalapril. O que suspeitar?',a:'Estenose aterosclerótica bilateral de artérias renais, ou em rim único.'},
  {q:'Paciente com crises de cefaleia, sudorese e palpitações. Como investigar?',a:'Metanefrinas livres plasmáticas ou fracionadas em urina de 24 horas. Se elevadas, imagem de abdome e teste genético.'},
  {q:'Como preparar o paciente para a retirada do feocromocitoma?',a:'Alfabloqueador por 7 a 14 dias, com sal e líquidos; betabloqueador só depois, se houver taquicardia.'},
  {q:'O que mostraram os estudos de revascularização na estenose aterosclerótica de artéria renal?',a:'Ausência de benefício sobre o tratamento clínico otimizado na maioria dos pacientes.'}],
 practice:[
  'Ausculte o abdome e palpe os pulsos femorais na primeira consulta de todo hipertenso jovem.',
  'Repita creatinina e potássio 1 a 2 semanas após iniciar inibidor da ECA.',
  'Pergunte ao parceiro sobre roncos e pausas.'],
 refs:[
  {t:'Lenders JW, et al. Pheochromocytoma and paraganglioma: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2014.',q:'Pheochromocytoma and Paraganglioma Endocrine Society Clinical Practice Guideline Lenders 2014'},
  {t:'Cooper CJ, et al. Stenting and medical therapy for atherosclerotic renal-artery stenosis (CORAL). N Engl J Med. 2014.',q:'Stenting and Medical Therapy for Atherosclerotic Renal-Artery Stenosis Cooper 2014'},
  {t:'Rimoldi SF, Scherrer U, Messerli FH. Secondary arterial hypertension: when, who, and how to screen? Eur Heart J. 2014.',q:'Secondary arterial hypertension when who and how to screen Rimoldi Scherrer Messerli'}],
 note:'Síntese de diretriz, estudo clínico e revisão.'
}
});
