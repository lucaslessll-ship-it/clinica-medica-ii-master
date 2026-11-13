/* Estudo aprofundado · Neurologia (P2). Texto original; referências ao final de cada aula. */
LessonDeep.add({
'neuro1_0':{
 updated:'2026-11',
 pretest:['Quais são os três exames obrigatórios na avaliação inicial de toda síncope?','Síncope durante esforço físico sugere qual grupo de causas?','Abalos musculares breves durante a perda de consciência excluem síncope?','Tomografia de crânio e Doppler de carótidas fazem parte da rotina?'],
 sections:[
  {h:'Definição que organiza tudo',p:[
   'Síncope é perda transitória de consciência causada por hipoperfusão cerebral global. Tem quatro marcas: início rápido, curta duração, perda do tônus postural e recuperação espontânea e completa. Se falta alguma delas, o diagnóstico é outro: crise epiléptica, hipoglicemia, intoxicação, AVC de circulação posterior ou evento psicogênico.',
   'O cérebro tolera poucos segundos sem fluxo. Queda da pressão sistólica para cerca de 50 a 60 mmHg no nível do coração, ou parada do fluxo por 6 a 8 segundos, já basta. Pressão arterial é débito cardíaco vezes resistência periférica, então só há três mecanismos possíveis: o coração não bombeia, os vasos dilatam ou falta volume.']},
  {h:'Os três grupos',table:{head:['Grupo','Mecanismo','Exemplos','Pistas'],rows:[
   ['Reflexa (neuromediada)','Vasodilatação e/ou bradicardia reflexas','Vasovagal, situacional (tosse, micção, defecação), seio carotídeo','Gatilho, pródromo com náusea, sudorese e calor, jovem sem cardiopatia'],
   ['Hipotensão ortostática','Falha da vasoconstrição ao levantar ou falta de volume','Fármacos, desidratação, sangramento, disautonomia (Parkinson, diabetes)','Logo após levantar, idoso, anti-hipertensivo novo'],
   ['Cardíaca','Queda súbita do débito','Bloqueio atrioventricular, taquicardia ventricular, estenose aórtica, cardiomiopatia hipertrófica, embolia pulmonar','Sem pródromo, no esforço ou deitado, palpitação antes, cardiopatia conhecida']]},
   after:'A reflexa é a mais comum e benigna. A cardíaca é a que mata: tem mortalidade em um ano muito maior que as outras.'},
  {h:'Avaliação inicial: três itens, três perguntas',p:[
   'Todo paciente recebe anamnese detalhada (com testemunha, se houver), exame físico com pressão deitado e após 1 e 3 minutos em pé, e ECG de 12 derivações. Com isso se respondem três perguntas: foi síncope mesmo? há causa evidente? há risco de evento grave em curto prazo?',
   'Hipotensão ortostática é queda de 20 mmHg ou mais na sistólica, de 10 mmHg ou mais na diastólica, ou sistólica abaixo de 90 mmHg em até 3 minutos em pé.']},
  {h:'Estratificação de risco',table:{head:['Alto risco: internar ou monitorar','Baixo risco: provável reflexa'],rows:[
   ['Durante esforço ou em decúbito','Em pé por tempo prolongado, lugar quente ou cheio'],
   ['Dor torácica, dispneia, dor abdominal ou cefaleia novas','Após dor, medo, visão de sangue, procedimento'],
   ['Palpitação súbita imediatamente antes','Pródromo típico: náusea, calor, sudorese, escurecimento visual'],
   ['Ausência de pródromo ou pródromo muito curto','Durante ou após refeição, tosse, micção, defecação'],
   ['Cardiopatia estrutural, insuficiência cardíaca, infarto prévio','História longa de episódios iguais, sem cardiopatia'],
   ['Morte súbita em familiar jovem','Ao virar a cabeça ou pressionar o pescoço'],
   ['Sopro sistólico não explicado, pressão sistólica abaixo de 90, sangramento digestivo','Exame físico e ECG normais']]}},
  {h:'ECG: o que procurar',list:[
   'Bloqueio atrioventricular de segundo grau Mobitz II ou de terceiro grau.',
   'Bradicardia sinusal abaixo de 40 por minuto ou pausas acima de 3 segundos em vigília.',
   'Bloqueio de ramo, bloqueio bifascicular ou QRS de 120 ms ou mais.',
   'Taquicardia ventricular sustentada ou não sustentada.',
   'Pré-excitação (onda delta), QT longo ou curto, padrão de Brugada tipo 1.',
   'Sinais de isquemia, de cardiomiopatia hipertrófica ou de sobrecarga de ventrículo direito.']},
  {h:'Exames complementares dirigidos',list:[
   'Ecocardiograma: quando há suspeita de cardiopatia estrutural.',
   'Monitorização (telemetria, Holter, monitor implantável): quando se suspeita de arritmia; a escolha depende da frequência dos episódios.',
   'Massagem do seio carotídeo: acima de 40 anos com síncope de causa indefinida compatível com mecanismo reflexo.',
   'Teste de inclinação: para confirmar reflexa ou hipotensão ortostática tardia quando a história não fecha.',
   'Teste ergométrico: síncope durante ou logo após esforço.',
   'Não são rotina: tomografia de crânio, eletroencefalograma, Doppler de carótidas e enzimas cardíacas sem suspeita específica.']},
  {h:'Tratamento por mecanismo',list:[
   '<strong>Reflexa:</strong> explicar a benignidade, evitar gatilhos, aumentar ingestão de água e sal quando não há contraindicação, ensinar manobras de contrapressão (cruzar as pernas, apertar as mãos, contrair os braços) ao sentir o pródromo.',
   '<strong>Ortostática:</strong> rever fármacos, hidratar, levantar em etapas, meias elásticas e cinta abdominal; fludrocortisona ou midodrina nos casos persistentes.',
   '<strong>Cardíaca:</strong> tratar a causa. Marca-passo para bloqueio avançado ou doença do nó sinusal sintomática; ablação para taquicardias supraventriculares; cardiodesfibrilador para taquicardia ventricular com disfunção ventricular; cirurgia ou intervenção na valvopatia.']}
 ],
 flow:{title:'Perda transitória de consciência',nodes:[
  {k:'start',t:'Perda de consciência breve com recuperação completa'},
  {k:'ask',t:'A história é de síncope? (início rápido, curta, sem confusão prolongada depois)',yes:'Seguir',no:'Investigar crise epiléptica, causa metabólica ou psicogênica'},
  {k:'do',t:'Anamnese, pressão deitado e em pé, ECG de 12 derivações'},
  {k:'ask',t:'Algum achado de alto risco na história, no exame ou no ECG?',yes:'Monitorização, ecocardiograma e investigação cardiológica imediata',no:'Seguir'},
  {k:'ask',t:'Queda pressórica ao levantar?',yes:'Hipotensão ortostática: rever fármacos e volume',no:'Seguir'},
  {k:'ask',t:'Gatilho e pródromo típicos, sem cardiopatia?',yes:'Síncope reflexa: orientar e dar alta',no:'Causa indefinida: testes dirigidos (seio carotídeo, inclinação, monitorização prolongada)'},
  {k:'end',t:'Tratar o mecanismo e orientar sobre direção e atividades de risco'}]},
 reasoning:[
  'A anamnese fecha o diagnóstico na maioria. Pergunte sempre o que estava fazendo, o que sentiu antes e como acordou.',
  'Deitado ou em esforço: pense em coração até prova em contrário.',
  'Abalos mioclônicos de poucos segundos acontecem em qualquer síncope prolongada. O que sugere epilepsia é o que vem depois: confusão por minutos, mordedura lateral de língua.',
  'Idoso com queda sem explicação pode ter tido síncope sem se lembrar.',
  'Síncope com dispneia e taquicardia: lembre de embolia pulmonar.'],
 mnemonics:[
  {n:'3 itens, 3 grupos',t:'História, pressão em pé e ECG; reflexa, ortostática e cardíaca.'},
  {n:'20, 10, 3',t:'Queda de 20 na sistólica ou 10 na diastólica em 3 minutos.'},
  {n:'Os 3 P da vasovagal',t:'Postura (em pé), Provocador (dor, medo, calor) e Pródromo.'},
  {n:'Esforço e deitado = Elétrico ou Estrutural',t:'Síncope no esforço ou em decúbito aponta para arritmia ou obstrução.'}],
 pitfalls:[
  'Pedir tomografia de crânio para toda síncope.',
  'Não medir a pressão em pé.',
  'Dar alta a paciente com bloqueio de ramo e síncope sem pródromo.',
  'Diagnosticar epilepsia por causa de abalos breves.',
  'Chamar de vasovagal a síncope de um idoso cardiopata sem investigar.',
  'Esquecer de rever a lista de medicamentos.'],
 recall:[
  {q:'Homem de 68 anos, infarto prévio, perde a consciência sentado, sem aviso, e acorda lúcido. ECG com bloqueio de ramo esquerdo. Como classificar e conduzir?',a:'Alto risco para síncope cardíaca (cardiopatia estrutural, sem pródromo, sentado, bloqueio de ramo). Internar com monitorização, fazer ecocardiograma e avaliação para arritmia ventricular ou bloqueio intermitente.'},
  {q:'Mulher de 22 anos desmaia ao coletar sangue, após náusea e sudorese; recupera-se em um minuto. Exame e ECG normais. Conduta?',a:'Síncope vasovagal típica, baixo risco. Orientar sobre benignidade, hidratação, gatilhos e manobras de contrapressão. Sem exames adicionais.'},
  {q:'Como diferenciar síncope convulsiva de crise tônico-clônica?',a:'Na síncope, os abalos são poucos, arrítmicos, duram segundos e surgem depois da queda; a recuperação é imediata e há palidez. Na crise, a fase tônico-clônica dura em geral mais de um minuto, há cianose, mordedura lateral de língua e confusão prolongada.'},
  {q:'Quando indicar massagem do seio carotídeo e quando evitá-la?',a:'Acima de 40 anos com síncope de causa indefinida. Evitar se houver sopro carotídeo, AVC ou AIT recente.'},
  {q:'Cite quatro achados de ECG que indicam alto risco.',a:'Bloqueio atrioventricular Mobitz II ou total, bloqueio bifascicular, QT longo, padrão de Brugada, pré-excitação, taquicardia ventricular ou pausas sinusais acima de 3 segundos.'}],
 practice:[
  'Peça ao acompanhante para descrever ou imitar o episódio; vídeos de celular ajudam muito.',
  'Registre a pressão deitado e em pé com os horários.',
  'Oriente não dirigir até definir a causa nos casos de alto risco ou recorrentes.'],
 refs:[
  {t:'Brignole M, et al. 2018 ESC Guidelines for the diagnosis and management of syncope. Eur Heart J. 2018.',q:'2018 ESC Guidelines diagnosis management syncope Brignole'},
  {t:'Shen WK, et al. 2017 ACC/AHA/HRS Guideline for the evaluation and management of patients with syncope. Circulation. 2017.',q:'2017 ACC AHA HRS guideline evaluation management patients syncope Shen'}],
 note:'Síntese das diretrizes europeia e norte-americana.'
},
'neuro1_1':{
 updated:'2026-11',
 pretest:['Uma única crise pode ser suficiente para diagnosticar epilepsia? Em que condição?','Cite quatro causas de crise sintomática aguda.','Por que evitar valproato em mulher em idade fértil?','Que fármacos podem piorar crises de ausência e mioclônicas?'],
 sections:[
  {h:'Crise, crise provocada e epilepsia',p:[
   'Crise epiléptica é a manifestação transitória de atividade neuronal excessiva ou sincrônica. Ela pode ser sintomática aguda (provocada), quando ocorre em relação temporal estreita com um insulto: distúrbio metabólico, abstinência, intoxicação, infecção do sistema nervoso, AVC ou trauma recentes. Nesses casos trata-se a causa, e em geral não se mantém fármaco a longo prazo.',
   'Epilepsia é a tendência duradoura a ter crises não provocadas. O diagnóstico é feito com duas crises não provocadas separadas por mais de 24 horas, ou uma crise não provocada com risco de recorrência de 60% ou mais em 10 anos (por exemplo, lesão estrutural ou eletroencefalograma epileptiforme), ou uma síndrome epiléptica definida.']},
  {h:'Classificação pelo início',table:{head:['Início','Subtipos','Exemplo clínico'],rows:[
   ['Focal','Com consciência preservada ou comprometida; motor ou não motor; pode evoluir para tônico-clônica bilateral','Aura epigástrica, olhar parado e automatismos orais (lobo temporal)'],
   ['Generalizado','Motor (tônico-clônica, mioclônica, atônica) ou não motor (ausência)','Ausência com parada súbita por segundos; mioclonias ao despertar'],
   ['Desconhecido','Quando o início não foi presenciado','Crise durante o sono']]},
   after:'Aura já é a crise focal. Paralisia de Todd (fraqueza focal transitória após a crise) e desvio do olhar apontam para início focal, mesmo que a crise tenha parecido generalizada. A classificação foi atualizada pela liga internacional em 2025, com mudanças de nomenclatura; confirme qual versão a sua banca adota.'},
  {h:'Foi crise mesmo?',table:{head:['','Crise tônico-clônica','Síncope','Evento não epiléptico psicogênico'],rows:[
   ['Olhos','Abertos','Abertos ou revirados','Fechados, com resistência à abertura'],
   ['Movimentos','Tônicos e depois clônicos, rítmicos','Poucos abalos, breves','Assíncronos, oscilantes, movimento pélvico'],
   ['Duração','1 a 2 minutos','Segundos','Muitos minutos, com flutuação'],
   ['Depois','Confusão e sonolência por minutos','Lucidez imediata','Recuperação rápida ou choro'],
   ['Língua','Mordedura lateral','Rara','Ponta da língua, se houver']]}},
  {h:'Primeira crise: investigação',list:[
   'Glicemia capilar na hora. Sódio, cálcio, magnésio, função renal e hepática, hemograma; toxicológico e teste de gravidez conforme o caso.',
   'ECG: QT longo e arritmias podem simular crise.',
   'Neuroimagem: ressonância é o exame de escolha; tomografia na emergência se houver déficit focal, trauma, febre, cefaleia, imunossupressão, anticoagulação ou idade avançada.',
   'Eletroencefalograma: melhor rendimento nas primeiras 24 a 48 horas. Exame normal não exclui epilepsia.',
   'Punção lombar: se houver febre, imunossupressão ou suspeita de infecção ou hemorragia subaracnoide.']},
  {h:'Tratar depois da primeira crise?',p:[
   'O risco de recorrência após uma primeira crise não provocada é maior nos dois primeiros anos e varia de cerca de 20 a 45%. Sobe com lesão cerebral prévia, eletroencefalograma com atividade epileptiforme, alteração relevante na imagem e crise durante o sono. Iniciar o fármaco reduz a recorrência nos primeiros dois anos, mas não muda a chance de remissão a longo prazo. A decisão é compartilhada, pesando risco de nova crise, profissão, direção e efeitos adversos.']},
  {h:'Escolha do fármaco',table:{head:['Situação','Preferir','Evitar'],rows:[
   ['Epilepsia focal','Lamotrigina, levetiracetam, carbamazepina, oxcarbazepina','Etossuximida (só trata ausência)'],
   ['Generalizada tônico-clônica','Valproato; lamotrigina ou levetiracetam','Carbamazepina e fenitoína podem piorar mioclonias e ausências'],
   ['Ausência','Etossuximida, valproato','Carbamazepina, fenitoína, gabapentina'],
   ['Mioclônica juvenil','Valproato; levetiracetam','Carbamazepina, fenitoína'],
   ['Mulher em idade fértil','Lamotrigina, levetiracetam; ácido fólico','Valproato (malformações e prejuízo cognitivo no feto)'],
   ['Idoso ou em uso de muitos fármacos','Lamotrigina, levetiracetam','Indutores enzimáticos (fenitoína, carbamazepina, fenobarbital)']]},
   after:'Regra geral: monoterapia, dose baixa com aumento gradual. Carbamazepina e fenitoína reduzem o efeito de anticoncepcionais e anticoagulantes; anticoncepcional com estrogênio reduz o nível de lamotrigina.'}
 ],
 flow:{title:'Primeira crise no adulto',nodes:[
  {k:'start',t:'Evento paroxístico com suspeita de crise epiléptica'},
  {k:'do',t:'Estabilizar, glicemia capilar, anamnese com testemunha'},
  {k:'ask',t:'Há causa aguda? (metabólica, abstinência, intoxicação, infecção, AVC ou trauma recentes)',yes:'Crise sintomática aguda: tratar a causa; fármaco só por curto prazo, se preciso',no:'Seguir'},
  {k:'do',t:'ECG, exames laboratoriais, neuroimagem e eletroencefalograma'},
  {k:'ask',t:'Segunda crise não provocada, lesão estrutural ou eletroencefalograma epileptiforme?',yes:'Epilepsia: iniciar fármaco conforme o tipo de crise e o perfil do paciente',no:'Primeira crise isolada: decisão compartilhada; muitas vezes observar'},
  {k:'end',t:'Orientar sobre direção, sono, álcool, natação e trabalho em altura'}]},
 reasoning:[
  'Classifique primeiro o início (focal ou generalizado). O fármaco depende disso.',
  'Crise aos 60 anos é focal estrutural até prova em contrário: procure AVC, tumor e demência.',
  'Adolescente com abalos nos braços ao acordar que derruba objetos: mioclônica juvenil, não "tique".',
  'Febre, cefaleia e crise: punção lombar depois da imagem.',
  'Paciente com epilepsia que volta a ter crises: pergunte primeiro sobre adesão, sono e álcool.'],
 mnemonics:[
  {n:'2 em 24 ou 1 em 60',t:'Duas crises com mais de 24 horas de intervalo, ou uma com 60% de risco.'},
  {n:'Carbamazepina é do Canto',t:'Serve para crise que começa num canto do cérebro (focal). Nas generalizadas, pode piorar.'},
  {n:'Valproato vale para tudo, menos para o ventre',t:'Amplo espectro, mas teratogênico.'},
  {n:'Olho fechado, crise duvidosa',t:'Olhos fechados com força durante o evento sugerem origem psicogênica.'}],
 pitfalls:[
  'Iniciar anticonvulsivante de manutenção em crise por hipoglicemia ou abstinência alcoólica.',
  'Excluir epilepsia porque o eletroencefalograma veio normal.',
  'Prescrever carbamazepina para ausência ou mioclônica juvenil.',
  'Prescrever valproato a mulher jovem sem discutir contracepção.',
  'Esquecer a interação entre indutores enzimáticos e anticoncepcionais.',
  'Não orientar sobre direção.'],
 recall:[
  {q:'Homem de 45 anos, etilista, crise tônico-clônica 30 horas após a última dose. Exames e tomografia normais. Precisa de anticonvulsivante de manutenção?',a:'Não. É crise sintomática aguda por abstinência. Trata-se a abstinência com benzodiazepínico e tiamina, e aborda-se o etilismo.'},
  {q:'Jovem de 16 anos com mioclonias matinais e uma crise tônico-clônica após privação de sono. Diagnóstico e fármacos a evitar?',a:'Epilepsia mioclônica juvenil. Evitar carbamazepina e fenitoína, que pioram mioclonias. Opções: valproato (se não for mulher com potencial de gestação), levetiracetam ou lamotrigina.'},
  {q:'O que aumenta o risco de recorrência após a primeira crise não provocada?',a:'Lesão cerebral prévia, atividade epileptiforme no eletroencefalograma, anormalidade significativa na imagem e crise noturna.'},
  {q:'Iniciar o fármaco após a primeira crise muda o prognóstico a longo prazo?',a:'Reduz a recorrência nos dois primeiros anos, mas não altera a chance de remissão sustentada.'},
  {q:'Quais achados favorecem evento não epiléptico psicogênico?',a:'Olhos fechados com resistência, movimentos assíncronos e flutuantes, impulsão pélvica, duração longa, ausência de confusão depois e ocorrência diante de testemunhas.'}],
 practice:[
  'Peça vídeo do evento sempre que possível.',
  'Anote o que o paciente lembra de antes e de depois, com horários.',
  'Reforce sono regular e adesão: são os gatilhos mais comuns de recorrência.'],
 refs:[
  {t:'Fisher RS, et al. Operational classification of seizure types by the International League Against Epilepsy. Epilepsia. 2017.',q:'Operational classification of seizure types International League Against Epilepsy Fisher 2017'},
  {t:'Fisher RS, et al. ILAE official report: a practical clinical definition of epilepsy. Epilepsia. 2014.',q:'ILAE official report practical clinical definition of epilepsy Fisher 2014'},
  {t:'Krumholz A, et al. Evidence-based guideline: management of an unprovoked first seizure in adults. Neurology. 2015.',q:'Evidence-based guideline management unprovoked first seizure adults Krumholz 2015'}],
 note:'Síntese da classificação e das definições da liga internacional e da diretriz norte-americana de primeira crise.'
},
'neuro1_2':{
 updated:'2026-11',
 pretest:['A partir de quantos minutos de crise convulsiva se inicia o tratamento?','Qual o erro mais comum com o benzodiazepínico?','Quais são as três opções de segunda linha e qual o estudo que as comparou?','O paciente parou de se debater, mas não acorda. O que pode estar acontecendo?'],
 sections:[
  {h:'Dois tempos que definem a conduta',p:[
   'A definição operacional usa dois marcos. O primeiro (t1) é o momento em que a crise dificilmente vai parar sozinha e o tratamento deve começar: 5 minutos na crise tônico-clônica. O segundo (t2) é quando passa a haver risco de lesão neuronal: 30 minutos. Para crise focal com comprometimento da consciência, os tempos são de 10 e 60 minutos.',
   'Também é estado de mal quando há crises repetidas sem recuperação da consciência entre elas. A mensagem prática: cronometre. Crise que chega ao pronto-socorro ainda acontecendo já passou dos 5 minutos.',
   'Quanto mais a crise dura, menos ela responde. Os receptores de GABA são internalizados e os de glutamato aumentam na sinapse, o que explica a perda de efeito dos benzodiazepínicos com o tempo e a necessidade de agir rápido e com dose plena.']},
  {h:'Linha do tempo do tratamento',table:{head:['Tempo','Fase','O que fazer'],rows:[
   ['0 a 5 min','Estabilização','Via aérea, oxigênio, monitor, acesso venoso, glicemia capilar. Se hipoglicemia: tiamina e depois glicose. Colher eletrólitos, hemograma, nível sérico do anticonvulsivante, toxicológico'],
   ['5 a 20 min','Primeira linha: benzodiazepínico','Midazolam intramuscular 10 mg (acima de 40 kg), ou diazepam intravenoso 0,15 a 0,2 mg/kg (máximo de 10 mg por dose), ou lorazepam intravenoso 0,1 mg/kg (máximo de 4 mg). Pode repetir uma vez'],
   ['20 a 40 min','Segunda linha','Levetiracetam 60 mg/kg (máximo de 4.500 mg), ou valproato 40 mg/kg (máximo de 3.000 mg), ou fenitoína 20 mg/kg (velocidade máxima de 50 mg/min)'],
   ['40 a 60 min','Terceira linha: estado de mal refratário','Intubação e infusão contínua de midazolam, propofol ou barbitúrico, em terapia intensiva, com eletroencefalograma contínuo']]},
   after:'No Brasil não há lorazepam intravenoso; usa-se diazepam intravenoso ou midazolam intramuscular. O estudo RAMPART mostrou que o midazolam intramuscular aplicado antes do hospital foi pelo menos tão eficaz quanto o lorazepam intravenoso, porque o tempo até a aplicação é menor.'},
  {h:'Segunda linha: como escolher',p:[
   'O estudo ESETT comparou levetiracetam, fosfenitoína e valproato após falha do benzodiazepínico. Os três controlaram a crise em cerca de metade dos pacientes, sem diferença de eficácia ou segurança. A escolha depende do paciente.'],
   list:[
   '<strong>Fenitoína:</strong> diluir só em soro fisiológico, monitorar ECG e pressão; causa hipotensão e arritmia se correr rápido. Evitar em cardiopata grave e em crises generalizadas genéticas.',
   '<strong>Valproato:</strong> evitar em gestantes, hepatopatas, doenças mitocondriais e plaquetopenia.',
   '<strong>Levetiracetam:</strong> poucas interações, ajuste na insuficiência renal; bom para idosos e hepatopatas.']},
  {h:'Procurar a causa enquanto trata',list:[
   'Nível baixo de anticonvulsivante por má adesão: a causa mais comum em quem já tem epilepsia.',
   'AVC isquêmico ou hemorrágico, trauma, tumor.',
   'Abstinência de álcool ou de benzodiazepínico, intoxicações.',
   'Hipoglicemia, hiponatremia, hipocalcemia, uremia.',
   'Meningite e encefalite: febre ou imunossupressão pedem punção lombar e tratamento empírico.',
   'Encefalite autoimune em jovem sem causa aparente.',
   'Eclâmpsia em gestante ou puérpera: sulfato de magnésio.']},
  {h:'Estado de mal não convulsivo',p:[
   'Depois que os abalos cessam, o esperado é melhora progressiva da consciência em 20 a 30 minutos. Se o paciente não desperta, ou tem movimentos sutis (nistagmo, abalos de face ou dedos), pode haver atividade epiléptica contínua sem convulsão. Só o eletroencefalograma confirma. Também é causa de confusão sem explicação em idosos e em pacientes de terapia intensiva.']},
  {h:'Complicações',list:[
   'Aspiração e insuficiência respiratória.',
   'Rabdomiólise, hipercalemia e lesão renal aguda.',
   'Hipertermia, acidose láctica (que se resolve com o fim da crise).',
   'Arritmias e edema pulmonar neurogênico.',
   'Lesão neuronal permanente após 30 minutos.']}
 ],
 flow:{title:'Crise que não para',nodes:[
  {k:'start',t:'Crise convulsiva com 5 minutos ou mais, ou crises repetidas sem recuperação'},
  {k:'do',t:'Via aérea, oxigênio, monitor, acesso venoso, glicemia. Anotar a hora'},
  {k:'do',t:'Benzodiazepínico em dose plena. Repetir uma vez se a crise persistir após 5 minutos'},
  {k:'ask',t:'A crise cessou?',yes:'Investigar a causa; observar retorno da consciência',no:'Segunda linha: levetiracetam, valproato ou fenitoína em dose de ataque'},
  {k:'ask',t:'Cessou após a segunda linha?',yes:'Manter o fármaco e investigar',no:'Refratário: intubar, anestésico em infusão contínua, terapia intensiva'},
  {k:'ask',t:'Parou de convulsionar, mas não desperta em 30 minutos?',yes:'Eletroencefalograma urgente: estado de mal não convulsivo',no:'Seguir investigação'},
  {k:'end',t:'Tratar a causa, ajustar o esquema de manutenção e prevenir recorrência'}]},
 reasoning:[
  'Tempo é neurônio: cada etapa tem prazo. Não espere o efeito de uma dose baixa.',
  'Depressão respiratória é mais frequente na crise não tratada do que com benzodiazepínico em dose correta.',
  'Glicemia capilar antes de qualquer fármaco. Tiamina antes da glicose no etilista e no desnutrido.',
  'Na gestante, pense em eclâmpsia antes de pensar em epilepsia.',
  'Se você intubou com bloqueador neuromuscular, a convulsão some da vista, mas o cérebro pode continuar em crise.'],
 mnemonics:[
  {n:'5, 20, 40',t:'Aos 5 minutos benzodiazepínico, aos 20 a segunda linha, aos 40 a anestesia.'},
  {n:'Segunda linha em 20-40-60',t:'Fenitoína 20, valproato 40 e levetiracetam 60 mg/kg.'},
  {n:'Fenitoína só com Fisiológico',t:'Precipita em soro glicosado.'},
  {n:'Dose plena, uma repetição',t:'O benzodiazepínico é dado inteiro e repetido uma única vez.'}],
 pitfalls:[
  'Dar benzodiazepínico em dose baixa por medo de depressão respiratória.',
  'Repetir benzodiazepínico várias vezes em vez de avançar para a segunda linha.',
  'Correr fenitoína rápido ou em soro glicosado.',
  'Não medir a glicemia.',
  'Considerar o caso resolvido porque os abalos pararam, com o paciente ainda em coma.',
  'Dar valproato a gestante.'],
 recall:[
  {q:'Mulher de 30 anos, 60 kg, chega convulsionando há 10 minutos, sem acesso venoso. Qual a primeira medicação e a dose?',a:'Midazolam intramuscular 10 mg, enquanto se obtém acesso, monitor e glicemia capilar.'},
  {q:'A crise persiste 10 minutos depois de duas doses de benzodiazepínico. Paciente hepatopata. Qual segunda linha?',a:'Levetiracetam 60 mg/kg (máximo de 4.500 mg). Evitar valproato pela hepatopatia.'},
  {q:'O que o estudo ESETT mostrou?',a:'Levetiracetam, fosfenitoína e valproato tiveram eficácia semelhante, de cerca de 45 a 47%, no estado de mal resistente a benzodiazepínico.'},
  {q:'Defina estado de mal refratário e super-refratário.',a:'Refratário: persiste após benzodiazepínico e um fármaco de segunda linha em doses adequadas. Super-refratário: continua ou recorre 24 horas ou mais após o início da anestesia.'},
  {q:'Quais cuidados com a infusão de fenitoína?',a:'Diluir em soro fisiológico, não ultrapassar 50 mg/min, monitorar ECG e pressão arterial, usar veia calibrosa pelo risco de lesão tecidual.'},
  {q:'Por que o benzodiazepínico perde efeito com o tempo de crise?',a:'Porque os receptores de GABA são internalizados na sinapse durante a crise prolongada.'}],
 practice:[
  'Tenha as doses por peso anotadas na sala de emergência.',
  'Marque no prontuário a hora de início e de cada fármaco.',
  'Peça o nível sérico do anticonvulsivante de quem já trata epilepsia.'],
 refs:[
  {t:'Trinka E, et al. A definition and classification of status epilepticus: report of the ILAE Task Force. Epilepsia. 2015.',q:'A definition and classification of status epilepticus ILAE Task Force Trinka 2015'},
  {t:'Glauser T, et al. Evidence-based guideline: treatment of convulsive status epilepticus in children and adults. Epilepsy Curr. 2016.',q:'Evidence-Based Guideline Treatment of Convulsive Status Epilepticus Children Adults Glauser 2016'},
  {t:'Kapur J, et al. Randomized trial of three anticonvulsant medications for status epilepticus (ESETT). N Engl J Med. 2019.',q:'Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus Kapur 2019'},
  {t:'Silbergleit R, et al. Intramuscular versus intravenous therapy for prehospital status epilepticus (RAMPART). N Engl J Med. 2012.',q:'Intramuscular versus intravenous therapy for prehospital status epilepticus Silbergleit 2012'}],
 note:'Doses conforme a diretriz norte-americana de 2016 e o estudo ESETT. Confirmar apresentações e protocolo do serviço.'
},
'neuro2_0':{
 updated:'2026-11',
 pretest:['O líquor é normal na primeira semana em que proporção relevante dos casos: isso exclui a doença?','Quais três medidas respiratórias indicam intubação?','Corticoide tem papel no tratamento?','Qual achado clínico faz duvidar do diagnóstico e pensar em medula?'],
 sections:[
  {h:'O que acontece',p:[
   'Polirradiculoneuropatia aguda imunomediada. Em cerca de dois terços dos casos há infecção nas semanas anteriores, respiratória ou intestinal. O sistema imune, ao responder ao agente, produz anticorpos que reconhecem gangliosídeos do nervo periférico (mimetismo molecular). O exemplo clássico é o Campylobacter jejuni; outros são citomegalovírus, vírus Epstein-Barr, Mycoplasma, influenza, vírus Zika e SARS-CoV-2.',
   'O ataque pode ser à mielina (forma desmielinizante, a mais comum no Ocidente) ou ao axônio (formas axonais motora e sensitivo-motora, mais ligadas ao Campylobacter e com recuperação por vezes mais lenta). Como a lesão é de raiz e nervo, os reflexos somem cedo.']},
  {h:'Quadro clínico',list:[
   'Fraqueza bilateral, relativamente simétrica, que começa nas pernas e sobe em dias.',
   'Reflexos diminuídos ou ausentes.',
   'Parestesias distais e dor lombar ou em membros, às vezes intensa e anterior à fraqueza.',
   'Paralisia facial bilateral e fraqueza bulbar em parte dos casos.',
   'Disautonomia: taquicardia, bradicardia, oscilação pressórica, retenção urinária, íleo.',
   'Insuficiência respiratória em cerca de um quinto a um quarto dos pacientes.',
   'Curso monofásico: piora por até 4 semanas (a maioria atinge o pior em 2), platô e recuperação.']},
  {h:'Diagnóstico',p:[
   'É clínico. Os exames apoiam e excluem imitadores.'],
   list:[
   '<strong>Líquor:</strong> dissociação albuminocitológica, isto é, proteína alta com celularidade normal. Pode ser normal na primeira semana. Mais de 50 células por microlitro obriga a pensar em HIV, doença de Lyme, infiltração linfomatosa ou poliomielite.',
   '<strong>Eletroneuromiografia:</strong> classifica em desmielinizante ou axonal e ajuda no prognóstico. Também pode ser normal no início; ondas F ausentes e preservação do nervo sural são pistas precoces.',
   '<strong>Ressonância de coluna:</strong> quando há dúvida com mielopatia.',
   '<strong>Outros:</strong> eletrólitos (hipocalemia), CK, sorologias conforme o contexto.']},
  {h:'Sinais que fazem duvidar',table:{head:['Achado','Pensar em'],rows:[
   ['Nível sensitivo, disfunção esfincteriana precoce e persistente','Mielite transversa, compressão medular'],
   ['Assimetria marcada e persistente','Vasculite, poliomielite, AVC'],
   ['Hiperreflexia ou sinal de Babinski','Lesão central'],
   ['Febre no início','Infecção'],
   ['Paralisia descendente, pupilas dilatadas','Botulismo'],
   ['Fatigabilidade com reflexos normais','Miastenia gravis'],
   ['Progressão por mais de 8 semanas','Polineuropatia desmielinizante inflamatória crônica']]}},
  {h:'Vigilância: o que mata',p:[
   'Insuficiência respiratória, arritmias por disautonomia, embolia pulmonar e infecção. A fraqueza respiratória pode progredir sem dispneia evidente; oximetria e gasometria alteram tarde. Meça a capacidade vital e as pressões máximas de forma seriada.'],
   list:[
   'Regra 20-30-40 para intubação: capacidade vital abaixo de 20 mL/kg, pressão inspiratória máxima mais fraca que 30 cmH₂O, pressão expiratória máxima abaixo de 40 cmH₂O, ou queda de mais de 30% na capacidade vital.',
   'Sinais clínicos: não consegue contar até 20 em uma respiração, uso de musculatura acessória, fraqueza de pescoço, voz fraca, tosse ineficaz, disfagia.',
   'Monitorização cardíaca contínua nos casos moderados e graves.',
   'Evitar succinilcolina na intubação, pelo risco de hipercalemia.']},
  {h:'Tratamento específico',list:[
   'Indicado para quem não consegue andar sem ajuda, tem progressão rápida, fraqueza bulbar ou respiratória.',
   '<strong>Imunoglobulina intravenosa:</strong> 0,4 g/kg/dia por 5 dias (total de 2 g/kg). Melhor resultado se iniciada nas 2 primeiras semanas.',
   '<strong>Plasmaférese:</strong> 4 a 5 sessões em 1 a 2 semanas. Eficácia equivalente; útil até 4 semanas do início.',
   'Associar as duas não acrescenta benefício. Uma segunda dose de imunoglobulina em pacientes de mau prognóstico não melhorou o resultado e aumentou eventos adversos.',
   'Corticoide isolado não funciona e não é recomendado.']},
  {h:'Suporte e prognóstico',list:[
   'Profilaxia de trombose venosa, analgesia para dor neuropática (gabapentina, carbamazepina), cuidado com pele, olhos, bexiga e intestino, fisioterapia precoce.',
   'Cerca de 80% voltam a andar sem ajuda em 6 meses. Mortalidade de 3 a 7%. Fadiga e dor podem persistir.',
   'Pior prognóstico: idade avançada, diarreia prévia, forma axonal, progressão rápida, necessidade de ventilação.',
   'Cerca de 10% pioram após melhora inicial (flutuação relacionada ao tratamento) e se beneficiam de repetir o tratamento.']}
 ],
 flow:{title:'Fraqueza aguda ascendente',nodes:[
  {k:'start',t:'Fraqueza bilateral progressiva em dias, com reflexos diminuídos'},
  {k:'ask',t:'Há nível sensitivo, esfíncteres comprometidos desde o início ou hiperreflexia?',yes:'Ressonância de coluna urgente: pensar em medula',no:'Seguir'},
  {k:'do',t:'Medir capacidade vital e pressões máximas; monitor cardíaco; avaliar deglutição'},
  {k:'ask',t:'Capacidade vital abaixo de 20 mL/kg ou em queda rápida, ou fraqueza bulbar grave?',yes:'Terapia intensiva e intubação eletiva',no:'Reavaliar a cada 4 a 6 horas'},
  {k:'do',t:'Líquor e eletroneuromiografia, sem atrasar o tratamento'},
  {k:'ask',t:'Não anda sem ajuda ou está piorando rápido?',yes:'Imunoglobulina por 5 dias ou plasmaférese',no:'Observação e suporte'},
  {k:'end',t:'Profilaxia de trombose, analgesia, reabilitação e vigilância de recaída'}]},
 reasoning:[
  'Fraqueza com reflexos ausentes localiza no nervo periférico; com reflexos vivos, no sistema nervoso central.',
  'Líquor e eletroneuromiografia normais na primeira semana não excluem.',
  'A decisão de intubar é pela tendência das medidas, não por um valor isolado nem pela gasometria.',
  'Dor lombar forte com fraqueza de pernas também é a apresentação de compressão medular: examine a sensibilidade e os esfíncteres.',
  'Não espere o exame para tratar quem está piorando.'],
 mnemonics:[
  {n:'20-30-40',t:'Capacidade vital 20 mL/kg, pressão inspiratória 30, pressão expiratória 40.'},
  {n:'5 dias, 2 semanas, 4 semanas',t:'Imunoglobulina por 5 dias, ideal em 2 semanas; pior momento da doença até 4 semanas.'},
  {n:'Proteína sobe, célula não',t:'Dissociação albuminocitológica.'},
  {n:'Ascende e Apaga reflexos',t:'Os dois A da forma clássica.'}],
 pitfalls:[
  'Dar corticoide.',
  'Excluir o diagnóstico por líquor normal no terceiro dia.',
  'Confiar na oximetria para decidir a intubação.',
  'Deixar sem monitor cardíaco um paciente com disautonomia.',
  'Esquecer a profilaxia de trombose no paciente acamado.',
  'Usar succinilcolina.'],
 recall:[
  {q:'Homem de 40 anos, diarreia há 2 semanas, fraqueza ascendente há 4 dias, não anda sem apoio, reflexos ausentes. Líquor do dia 4 normal. Conduta?',a:'O líquor normal não exclui. Internar, medir capacidade vital seriada, monitorar e iniciar imunoglobulina 0,4 g/kg/dia por 5 dias ou plasmaférese.'},
  {q:'Quais parâmetros indicam intubação?',a:'Capacidade vital abaixo de 20 mL/kg, pressão inspiratória máxima mais fraca que 30 cmH₂O, pressão expiratória máxima abaixo de 40 cmH₂O, queda de mais de 30% da capacidade vital, ou fraqueza bulbar com risco de aspiração.'},
  {q:'O que significa líquor com 80 células em paciente com quadro compatível?',a:'Pleocitose acima de 50 faz pensar em outra causa: HIV, doença de Lyme, infiltração neoplásica ou poliomielite.'},
  {q:'Imunoglobulina seguida de plasmaférese é melhor que uma delas?',a:'Não. As duas têm eficácia equivalente e a associação não acrescenta benefício.'},
  {q:'O paciente melhora e volta a piorar na terceira semana. O que é e o que fazer?',a:'Flutuação relacionada ao tratamento, em cerca de 10%. Repetir o tratamento. Se a progressão passar de 8 semanas ou houver várias recaídas, pensar na forma crônica.'}],
 practice:[
  'Peça ao paciente para contar em voz alta em uma única respiração; registre o número a cada avaliação.',
  'Examine a força de flexão do pescoço: ela acompanha a do diafragma.',
  'Explique à família que a recuperação leva meses e costuma ser boa.'],
 refs:[
  {t:'Leonhard SE, et al. Diagnosis and management of Guillain-Barré syndrome in ten steps. Nat Rev Neurol. 2019.',q:'Diagnosis and management of Guillain-Barre syndrome in ten steps Leonhard'},
  {t:'van Doorn PA, et al. European Academy of Neurology/Peripheral Nerve Society guideline on diagnosis and treatment of Guillain-Barré syndrome. Eur J Neurol. 2023.',q:'European Academy of Neurology Peripheral Nerve Society Guideline diagnosis treatment Guillain-Barre syndrome van Doorn'},
  {t:'Willison HJ, Jacobs BC, van Doorn PA. Guillain-Barré syndrome. Lancet. 2016.',q:'Willison Jacobs van Doorn Guillain-Barre syndrome Lancet 2016'}],
 note:'Síntese de revisão e diretriz europeia.'
},
'neuro2_1':{
 updated:'2026-11',
 pretest:['Qual a tríade da síndrome de Miller Fisher?','Que anticorpo une Miller Fisher e Bickerstaff, e por que ele explica a oftalmoplegia?','O que a encefalite de Bickerstaff tem que Miller Fisher não tem?','Oftalmoplegia, ataxia e confusão em etilista: qual diagnóstico tratar antes de pensar em variantes?'],
 sections:[
  {h:'Um espectro, não doenças separadas',p:[
   'Síndrome de Guillain-Barré clássica, síndrome de Miller Fisher e encefalite de tronco de Bickerstaff compartilham o mesmo mecanismo pós-infeccioso e podem se sobrepor. O que muda é o alvo dos anticorpos. O anti-GQ1b reconhece um gangliosídeo abundante nos nervos oculomotor, troclear e abducente, nos fusos musculares e na formação reticular. Isso explica oftalmoplegia, ataxia e arreflexia e, quando o tronco é atingido, sonolência.']},
  {h:'Comparação',table:{head:['','Miller Fisher','Bickerstaff','Forma clássica'],rows:[
   ['Tríade','Oftalmoplegia, ataxia, arreflexia','Oftalmoplegia, ataxia e rebaixamento de consciência e/ou hiperreflexia','Fraqueza ascendente, arreflexia'],
   ['Consciência','Normal','Sonolência a coma','Normal'],
   ['Reflexos','Ausentes','Podem estar vivos, com sinal de Babinski','Ausentes'],
   ['Força dos membros','Preservada','Preservada ou pouco reduzida','Reduzida'],
   ['Anti-GQ1b','Positivo em cerca de 85 a 90%','Positivo em cerca de dois terços','Raro'],
   ['Ressonância','Normal','Lesão de tronco em minoria','Normal'],
   ['Evolução','Benigna, recuperação em semanas a meses','Geralmente boa','Variável']]},
   after:'Quando surge fraqueza de membros ou respiratória em quem começou com Miller Fisher, fala-se em sobreposição com a forma clássica, e o tratamento passa a ser obrigatório.'},
  {h:'Outras variantes para reconhecer',list:[
   'Faringo-cérvico-braquial: fraqueza de faringe, pescoço e braços, com pernas poupadas; pode simular botulismo e miastenia. Associada a anti-GT1a.',
   'Paraparética: restrita às pernas; exige excluir medula.',
   'Diplegia facial com parestesias.',
   'Formas incompletas: oftalmoplegia aguda isolada ou ataxia aguda isolada com anti-GQ1b.']},
  {h:'Diagnóstico',list:[
   'Clínico, com história de infecção nas semanas anteriores.',
   'Anti-GQ1b sérico apoia, mas o resultado demora e o exame negativo não exclui.',
   'Líquor com dissociação albuminocitológica após a primeira semana.',
   'Ressonância de encéfalo para excluir lesão estrutural de tronco, sobretudo se houver alteração de consciência.',
   'Eletroneuromiografia pode mostrar redução de potenciais sensitivos e reflexo H ausente.']},
  {h:'Diferenciais que não podem passar',table:{head:['Doença','Como diferenciar'],rows:[
   ['Encefalopatia de Wernicke','Oftalmoplegia, ataxia e confusão em desnutrido ou etilista. Tratar com tiamina intravenosa na suspeita'],
   ['Botulismo','Paralisia descendente, pupilas dilatadas e fixas, boca seca, sem alteração sensitiva'],
   ['Miastenia gravis','Flutuação e fatigabilidade, reflexos normais, sem ataxia'],
   ['AVC de tronco','Início súbito, sinais cruzados'],
   ['Esclerose múltipla e outras desmielinizantes','Oftalmoplegia internuclear, lesões na ressonância'],
   ['Difteria, intoxicações, lesão compressiva','Contexto e imagem']]}},
  {h:'Tratamento',list:[
   'Miller Fisher puro costuma se resolver sozinho; o tratamento de suporte é aceitável, com observação inicial em ambiente hospitalar pelo risco de evoluir para a forma clássica.',
   'Imunoglobulina ou plasmaférese quando há sobreposição com fraqueza de membros, disfagia, fraqueza facial importante ou comprometimento respiratório, e na encefalite de Bickerstaff. A evidência vem de séries de casos.',
   'Proteção ocular e oclusão alternada para a diplopia; prevenção de quedas.']}
 ],
 flow:{title:'Oftalmoplegia aguda com ataxia',nodes:[
  {k:'start',t:'Diplopia e marcha instável que se instalam em dias'},
  {k:'ask',t:'Desnutrição, etilismo, vômitos prolongados ou cirurgia bariátrica?',yes:'Tiamina intravenosa imediata; pensar em Wernicke',no:'Seguir'},
  {k:'ask',t:'Início súbito ou sinais focais cruzados?',yes:'Imagem urgente para AVC de tronco',no:'Seguir'},
  {k:'do',t:'Examinar reflexos, consciência, pupilas, força e deglutição'},
  {k:'ask',t:'Arreflexia com consciência normal?',yes:'Miller Fisher provável',no:'Sonolência ou hiperreflexia: Bickerstaff; ressonância de encéfalo'},
  {k:'ask',t:'Há fraqueza de membros, bulbar ou respiratória?',yes:'Imunoglobulina ou plasmaférese e vigilância respiratória',no:'Suporte e observação'},
  {k:'end',t:'Solicitar anti-GQ1b e líquor; acompanhar a recuperação'}]},
 reasoning:[
  'A pupila ajuda: dilatada e fixa aponta para botulismo; normal ou pouco alterada fala a favor de Miller Fisher.',
  'Ataxia com força normal e reflexos ausentes é sensitiva (perda de propriocepção), não cerebelar.',
  'Hiperreflexia com oftalmoplegia e ataxia desloca o diagnóstico para o tronco.',
  'Na dúvida com Wernicke, dê tiamina: é barata, segura e o atraso deixa sequela.'],
 mnemonics:[
  {n:'OAA',t:'Oftalmoplegia, Ataxia, Arreflexia: Miller Fisher.'},
  {n:'Bickerstaff = Miller Fisher + B',t:'B de Babinski e de Baixo nível de consciência.'},
  {n:'GQ1b: Q de Quiasma do olhar',t:'O anticorpo que paralisa os olhos.'},
  {n:'Fisher fica; Guillain sobe',t:'Um fica nos olhos e no equilíbrio; o outro sobe pelas pernas.'}],
 pitfalls:[
  'Esquecer a tiamina no paciente de risco.',
  'Dar alta precoce a Miller Fisher sem observar se surge fraqueza.',
  'Confundir ataxia sensitiva com doença cerebelar e parar a investigação na imagem normal.',
  'Esperar o anticorpo para tratar a sobreposição.',
  'Não considerar botulismo quando há pupilas dilatadas.'],
 recall:[
  {q:'Jovem com diplopia, marcha instável e reflexos ausentes 10 dias após resfriado; força e consciência normais. Diagnóstico, anticorpo e conduta?',a:'Síndrome de Miller Fisher, com anti-GQ1b esperado. Observar em ambiente hospitalar, tratar com suporte e indicar imunoterapia se surgir fraqueza de membros, bulbar ou respiratória.'},
  {q:'O que muda se o mesmo paciente estiver sonolento e com sinal de Babinski?',a:'Passa a ser encefalite de tronco de Bickerstaff. Pedir ressonância de encéfalo e tratar com imunoglobulina ou plasmaférese.'},
  {q:'Por que o anti-GQ1b causa oftalmoplegia?',a:'Porque o gangliosídeo GQ1b é abundante nos nervos cranianos que movem os olhos e nos fusos musculares.'},
  {q:'Como diferenciar de botulismo?',a:'No botulismo a paralisia é descendente, as pupilas ficam dilatadas e fixas, há boca seca e constipação, e não há ataxia sensitiva.'},
  {q:'Qual variante acomete faringe, pescoço e braços?',a:'A faringo-cérvico-braquial.'}],
 practice:[
  'Teste sempre os reflexos em quem chega com diplopia aguda.',
  'Reavalie força e deglutição duas vezes ao dia na primeira semana.',
  'Peça o anticorpo, mas decida pela clínica.'],
 refs:[
  {t:'Wakerley BR, Uncini A, Yuki N. Guillain-Barré and Miller Fisher syndromes: new diagnostic classification. Nat Rev Neurol. 2014.',q:'Guillain-Barre and Miller Fisher syndromes new diagnostic classification Wakerley Uncini Yuki'},
  {t:'Shahrizaila N, Yuki N. Bickerstaff brainstem encephalitis and Fisher syndrome: anti-GQ1b antibody syndrome. J Neurol Neurosurg Psychiatry. 2013.',q:'Bickerstaff brainstem encephalitis and Fisher syndrome anti-GQ1b antibody syndrome Shahrizaila Yuki'},
  {t:'Leonhard SE, et al. Diagnosis and management of Guillain-Barré syndrome in ten steps. Nat Rev Neurol. 2019.',q:'Diagnosis and management of Guillain-Barre syndrome in ten steps Leonhard'}],
 note:'Síntese de revisões. A evidência para tratamento das variantes vem de séries de casos.'
},
'neuro3_0':{
 updated:'2026-11',
 pretest:['O que significam disseminação no espaço e no tempo?','Que achado do líquor pode substituir a disseminação no tempo?','Mielite que ocupa mais de três segmentos vertebrais sugere esclerose múltipla?','Antes de tratar um surto, o que é obrigatório excluir?'],
 sections:[
  {h:'A doença em uma ideia',p:[
   'Doença inflamatória e desmielinizante do sistema nervoso central, com componente neurodegenerativo desde o início. Linfócitos atravessam a barreira hematoencefálica e atacam a mielina em focos (placas) ao redor de vênulas. Cada placa nova pode causar um surto ou passar despercebida. Com os anos, soma-se perda axonal, que explica a incapacidade progressiva.',
   'Acomete principalmente mulheres jovens. Fatores associados: infecção prévia pelo vírus Epstein-Barr, baixa vitamina D, tabagismo, obesidade na adolescência e genética (HLA-DRB1*15:01).']},
  {h:'Surtos típicos',table:{head:['Síndrome','Como se apresenta'],rows:[
   ['Neurite óptica','Unilateral, dor ao mover o olho, piora em dias, perda de visão central e de cores, defeito pupilar aferente'],
   ['Mielite parcial','Sintomas sensitivos assimétricos, sinal de Lhermitte, urgência urinária; lesão curta na ressonância'],
   ['Tronco e cerebelo','Oftalmoplegia internuclear, diplopia, vertigem, ataxia; neuralgia do trigêmeo em jovem'],
   ['Hemisférica','Hemiparesia ou alteração sensitiva de instalação subaguda']]},
   after:'Surto é sintoma neurológico novo que dura mais de 24 horas, sem febre nem infecção, separado do anterior por pelo menos 30 dias. Calor e febre podem trazer de volta sintomas antigos por horas (fenômeno de Uhthoff): isso é pseudossurto.'},
  {h:'Formas clínicas',list:[
   'Síndrome clinicamente isolada: primeiro episódio sugestivo.',
   'Remitente-recorrente: surtos com recuperação total ou parcial; cerca de 85% no início.',
   'Secundariamente progressiva: piora contínua após anos de surtos.',
   'Primariamente progressiva: progressão desde o início, em cerca de 10 a 15%, em geral com paraparesia espástica após os 40 anos.']},
  {h:'Critérios de McDonald de 2017',p:[
   'Exigem síndrome típica, disseminação no espaço e no tempo, e ausência de explicação melhor.'],
   list:[
   '<strong>Espaço:</strong> lesões em T2 em pelo menos duas de quatro regiões: periventricular, cortical ou justacortical, infratentorial e medula.',
   '<strong>Tempo:</strong> lesões com e sem realce por gadolínio no mesmo exame, ou lesão nova em exame de seguimento, ou novo surto clínico.',
   '<strong>Líquor:</strong> bandas oligoclonais exclusivas do líquor substituem a disseminação no tempo.',
   'Na forma primariamente progressiva: um ano de progressão mais dois de três (lesão cerebral típica, duas ou mais lesões medulares, bandas oligoclonais).'],
   after:'A revisão de 2024 dos critérios acrescentou o nervo óptico como quinta região e novos marcadores de imagem e de líquor. Confirme qual versão a sua banca cobra.'},
  {h:'Bandeiras vermelhas: quando não é esclerose múltipla',table:{head:['Achado','Pensar em'],rows:[
   ['Mielite longitudinalmente extensa (3 ou mais segmentos), neurite óptica bilateral ou grave, soluços e vômitos incoercíveis','Doença do espectro da neuromielite óptica (anti-aquaporina 4)'],
   ['Neurite óptica com edema de papila importante, encefalomielite','Doença associada ao anti-MOG'],
   ['Sintomas sistêmicos, artrite, úlceras, FAN alto','Lúpus, Behçet, sarcoidose'],
   ['Início súbito','Doença vascular'],
   ['Mielopatia com anemia macrocítica','Deficiência de vitamina B12 ou de cobre'],
   ['Febre, líquor muito inflamatório','Infecção: sífilis, HIV, HTLV-1']]},
   after:'Diferenciar da neuromielite óptica é essencial: alguns tratamentos da esclerose múltipla pioram a neuromielite.'},
  {h:'Tratamento',list:[
   '<strong>Surto com incapacidade:</strong> metilprednisolona 1 g por dia, por 3 a 5 dias, intravenosa ou oral em dose equivalente. Acelera a recuperação, sem mudar o resultado a longo prazo. Antes, excluir infecção, principalmente urinária. Plasmaférese no surto grave que não responde.',
   '<strong>Modificadores de doença:</strong> iniciar cedo. Eficácia moderada: interferon beta, glatirâmer, teriflunomida, fumarato de dimetila. Alta eficácia: natalizumabe, anti-CD20 (ocrelizumabe, ofatumumabe), moduladores de esfingosina, cladribina, alentuzumabe.',
   '<strong>Forma primariamente progressiva:</strong> ocrelizumabe.',
   '<strong>Sintomas:</strong> espasticidade (baclofeno, fisioterapia), bexiga, fadiga, dor, depressão.',
   '<strong>Geral:</strong> parar de fumar, corrigir vitamina D, atividade física, vacinas em dia antes de imunossupressor.',
   '<strong>Segurança:</strong> natalizumabe em portador do vírus JC traz risco de leucoencefalopatia multifocal progressiva. Na gestação, os surtos diminuem no fim da gravidez e aumentam no puerpério; planejar o fármaco com antecedência.']}
 ],
 flow:{title:'Suspeita de doença desmielinizante',nodes:[
  {k:'start',t:'Adulto jovem com déficit neurológico subagudo (dias) e melhora parcial em semanas'},
  {k:'ask',t:'Síndrome típica? (neurite óptica unilateral, mielite parcial, tronco)',yes:'Seguir',no:'Ampliar o diagnóstico diferencial'},
  {k:'do',t:'Ressonância de encéfalo e de medula com contraste; líquor com bandas oligoclonais'},
  {k:'ask',t:'Há bandeira vermelha? (mielite extensa, neurite bilateral, doença sistêmica)',yes:'Anti-aquaporina 4, anti-MOG, FAN, sorologias, vitamina B12',no:'Seguir'},
  {k:'ask',t:'Disseminação no espaço e no tempo (ou bandas oligoclonais)?',yes:'Esclerose múltipla: iniciar modificador de doença',no:'Síndrome clinicamente isolada: acompanhar com ressonância'},
  {k:'ask',t:'Surto atual com incapacidade?',yes:'Excluir infecção e fazer pulso de metilprednisolona',no:'Tratar sintomas'},
  {k:'end',t:'Seguimento clínico e por imagem; ajustar o fármaco se houver atividade'}]},
 reasoning:[
  'Pense em "onde" e "quando": duas regiões diferentes, dois momentos diferentes.',
  'Piora transitória com febre ou calor é pseudossurto: procure infecção urinária antes de dar corticoide.',
  'Oftalmoplegia internuclear bilateral em jovem é quase sinônimo da doença.',
  'Lesão medular longa não é esclerose múltipla até prova em contrário.',
  'Ressonância com lesões inespecíficas em paciente com enxaqueca não fecha diagnóstico: exige síndrome típica.'],
 mnemonics:[
  {n:'4 regiões: PCIM',t:'Periventricular, Cortical ou justacortical, Infratentorial, Medula.'},
  {n:'Bandas compram tempo',t:'Bandas oligoclonais substituem a disseminação no tempo.'},
  {n:'24 horas, 30 dias',t:'Surto dura mais de 24 horas e fica a 30 dias do anterior.'},
  {n:'Dedos de Dawson',t:'Lesões ovoides perpendiculares aos ventrículos, típicas na ressonância.'}],
 pitfalls:[
  'Tratar pseudossurto com corticoide sem investigar infecção.',
  'Diagnosticar por ressonância sem síndrome clínica típica.',
  'Não pesquisar anti-aquaporina 4 diante de mielite extensa.',
  'Adiar o modificador de doença esperando "ver a evolução".',
  'Achar que o corticoide do surto muda a progressão.'],
 recall:[
  {q:'Mulher de 28 anos, primeira neurite óptica. Ressonância com lesões periventriculares e infratentoriais, nenhuma com realce; bandas oligoclonais positivas. Preenche critérios?',a:'Sim. Há disseminação no espaço (duas regiões) e as bandas oligoclonais substituem a disseminação no tempo, pelos critérios de 2017.'},
  {q:'Paciente com a doença refere piora da fraqueza antiga há um dia, com febre e disúria. Conduta?',a:'Pseudossurto provável. Investigar e tratar infecção urinária; não dar corticoide.'},
  {q:'Que achados sugerem neuromielite óptica em vez de esclerose múltipla?',a:'Mielite com três ou mais segmentos, neurite óptica bilateral ou grave com má recuperação, síndrome da área postrema (soluços e vômitos), anti-aquaporina 4 positivo.'},
  {q:'Como tratar o surto e o que esse tratamento muda?',a:'Metilprednisolona 1 g por dia por 3 a 5 dias. Acelera a recuperação, mas não altera a incapacidade a longo prazo.'},
  {q:'Qual a preocupação com natalizumabe?',a:'Leucoencefalopatia multifocal progressiva em portadores do vírus JC; exige sorologia e monitorização.'}],
 practice:[
  'Pergunte por episódios neurológicos antigos que melhoraram sozinhos: eles contam como disseminação no tempo.',
  'Peça urina antes de todo pulso de corticoide.',
  'Encaminhe cedo a centro de referência para iniciar o modificador de doença.'],
 refs:[
  {t:'Thompson AJ, et al. Diagnosis of multiple sclerosis: 2017 revisions of the McDonald criteria. Lancet Neurol. 2018.',q:'Diagnosis of multiple sclerosis 2017 revisions of the McDonald criteria Thompson'},
  {t:'Reich DS, Lucchinetti CF, Calabresi PA. Multiple sclerosis. N Engl J Med. 2018.',q:'Reich Lucchinetti Calabresi Multiple sclerosis N Engl J Med 2018'},
  {t:'Wingerchuk DM, et al. International consensus diagnostic criteria for neuromyelitis optica spectrum disorders. Neurology. 2015.',q:'International consensus diagnostic criteria neuromyelitis optica spectrum disorders Wingerchuk 2015'}],
 note:'Baseado nos critérios de 2017. A revisão de 2024 dos critérios não está detalhada aqui.'
},
'neuro3_1':{
 updated:'2026-11',
 pretest:['Que característica da fraqueza é a marca da miastenia?','Que exame de imagem todo paciente deve fazer e por quê?','Cite cinco fármacos que podem piorar a doença.','O que fazer com a piridostigmina no paciente intubado em crise?'],
 sections:[
  {h:'Mecanismo',p:[
   'Doença autoimune da junção neuromuscular, no lado pós-sináptico. Anticorpos contra o receptor de acetilcolina bloqueiam o receptor, aceleram sua degradação e ativam complemento, que destrói a membrana. Com menos receptores, a transmissão falha quando o músculo é usado repetidamente: surge a fatigabilidade.',
   'O timo participa: hiperplasia em jovens e timoma em cerca de 10 a 15% dos pacientes.']},
  {h:'Perfis de anticorpo',table:{head:['Anticorpo','Frequência','Particularidades'],rows:[
   ['Anti-receptor de acetilcolina','Cerca de 85% da forma generalizada e metade da ocular','Associado a hiperplasia tímica e timoma; responde a timectomia'],
   ['Anti-MuSK','Parte dos negativos para o primeiro','Mulheres, predomínio bulbar, facial e respiratório; resposta ruim à piridostigmina; boa resposta a rituximabe; timo normal'],
   ['Anti-LRP4','Raro','Quadro geralmente leve'],
   ['Soronegativa','Minoria','Diagnóstico por eletrofisiologia']]}},
  {h:'Clínica',list:[
   'Fraqueza que piora com o uso e ao longo do dia e melhora com o repouso.',
   'Olhos: ptose assimétrica e diplopia, com pupilas normais. É a apresentação inicial mais comum.',
   'Bulbar: voz anasalada, disfagia, fadiga para mastigar.',
   'Pescoço e membros proximais.',
   'Respiratória nas formas graves.',
   'Sensibilidade e reflexos normais.',
   'Se a doença fica restrita aos olhos por 2 anos, a generalização é pouco provável.']},
  {h:'Diagnóstico',list:[
   '<strong>Beira do leito:</strong> teste do gelo (bolsa de gelo sobre a pálpebra por 2 minutos melhora a ptose); fatigabilidade ao olhar para cima sustentado.',
   '<strong>Anticorpos:</strong> anti-receptor de acetilcolina; se negativo, anti-MuSK.',
   '<strong>Estimulação repetitiva a 3 Hz:</strong> decremento acima de 10%.',
   '<strong>Eletromiografia de fibra única:</strong> o exame mais sensível.',
   '<strong>Tomografia ou ressonância de tórax:</strong> em todos, para procurar timoma.',
   '<strong>TSH:</strong> associação com doença tireoidiana autoimune.']},
  {h:'Diferenciais',table:{head:['Doença','Diferença'],rows:[
   ['Síndrome de Lambert-Eaton','Pré-sináptica; fraqueza proximal de pernas que melhora após esforço breve, reflexos diminuídos, boca seca; associada a carcinoma de pequenas células de pulmão; incremento na estimulação de alta frequência'],
   ['Botulismo','Paralisia descendente aguda, pupilas dilatadas'],
   ['Miopatias','Sem flutuação; CK alta'],
   ['Lesão de tronco, doença do neurônio motor','Outros sinais neurológicos, sem fatigabilidade típica'],
   ['Miller Fisher','Arreflexia e ataxia']]}},
  {h:'Tratamento de manutenção',list:[
   '<strong>Sintomático:</strong> piridostigmina. Efeitos colinérgicos: cólica, diarreia, salivação, bradicardia.',
   '<strong>Imunossupressão:</strong> prednisona, iniciando em dose baixa com aumento gradual, porque dose alta de início pode piorar a fraqueza nas primeiras semanas. Poupadores: azatioprina (efeito em meses), micofenolato.',
   '<strong>Timectomia:</strong> sempre no timoma. Na forma generalizada com anticorpo anti-receptor, sem timoma, entre 18 e 65 anos, o estudo MGTX mostrou melhora clínica e menor necessidade de prednisona em 3 anos.',
   '<strong>Refratários:</strong> rituximabe (especialmente anti-MuSK), inibidores de complemento e bloqueadores do receptor Fc neonatal.']},
  {h:'Crise miastênica',p:[
   'Fraqueza respiratória ou bulbar com necessidade de ventilação. Gatilhos: infecção, cirurgia, redução rápida de imunossupressor, gestação e fármacos.'],
   list:[
   'Internar em terapia intensiva e medir capacidade vital e pressões máximas de forma seriada (regra 20-30-40).',
   'Intubar cedo, de forma eletiva.',
   'Imunoglobulina 2 g/kg em 2 a 5 dias ou plasmaférese. A plasmaférese age mais rápido.',
   'Suspender temporariamente a piridostigmina no paciente intubado, pois aumenta secreções.',
   'Tratar o gatilho e iniciar ou ajustar o corticoide.'],
   after:'Crise colinérgica por excesso de piridostigmina é rara: miose, salivação, diarreia, bradicardia e fasciculações.'},
  {h:'Fármacos que pioram',p:[
   'Aminoglicosídeos, fluoroquinolonas, macrolídeos, sulfato de magnésio intravenoso, betabloqueadores, bloqueadores neuromusculares, quinina e cloroquina, toxina botulínica, penicilamina e inibidores de checkpoint imunológico. Revise a prescrição de todo paciente com a doença antes de assinar.']}
 ],
 flow:{title:'Ptose e diplopia flutuantes',nodes:[
  {k:'start',t:'Fraqueza ocular, bulbar ou proximal que piora com o uso'},
  {k:'ask',t:'Dispneia, voz fraca, engasgos ou não sustenta a cabeça?',yes:'Emergência: terapia intensiva, capacidade vital seriada, imunoglobulina ou plasmaférese',no:'Seguir'},
  {k:'do',t:'Teste do gelo; anticorpo anti-receptor de acetilcolina; se negativo, anti-MuSK'},
  {k:'ask',t:'Anticorpo negativo?',yes:'Estimulação repetitiva e eletromiografia de fibra única',no:'Diagnóstico confirmado'},
  {k:'do',t:'Imagem de tórax para timoma; TSH; rever fármacos em uso'},
  {k:'ask',t:'Timoma, ou forma generalizada com anticorpo anti-receptor entre 18 e 65 anos?',yes:'Timectomia',no:'Tratamento clínico'},
  {k:'end',t:'Piridostigmina, imunossupressor em dose progressiva e lista de fármacos a evitar'}]},
 reasoning:[
  'Pupila normal com ptose e diplopia: junção neuromuscular. Pupila alterada: nervo ou tronco.',
  'Fraqueza que varia de hora em hora não é miopatia.',
  'Paciente que piora após começar antibiótico: confira qual foi.',
  'Predomínio bulbar com pouca resposta à piridostigmina: pense em anti-MuSK.',
  'Piora na primeira ou segunda semana de corticoide em dose alta é esperada, não falha de tratamento.'],
 mnemonics:[
  {n:'Gelo abre o olho',t:'O frio melhora a transmissão neuromuscular.'},
  {n:'Miastenia cansa, Lambert-Eaton aquece',t:'Uma piora com o esforço; a outra melhora após contração breve.'},
  {n:'MuSK: Mulher, bulbar, timo normal',t:'E resposta fraca à piridostigmina.'},
  {n:'AFM-BM',t:'Aminoglicosídeo, Fluoroquinolona, Macrolídeo, Betabloqueador e Magnésio.'}],
 pitfalls:[
  'Prescrever ciprofloxacino ou azitromicina sem pensar na doença.',
  'Dar sulfato de magnésio à gestante miastênica sem cuidado.',
  'Não pedir imagem de tórax.',
  'Começar prednisona em dose alta em casa.',
  'Esperar hipoxemia para intubar.',
  'Manter piridostigmina em dose plena no paciente intubado e cheio de secreção.'],
 recall:[
  {q:'Mulher de 30 anos com ptose que piora à tarde e voz anasalada ao fim do dia. Anticorpo anti-receptor positivo, tomografia com timo hiperplásico. Qual a proposta além da piridostigmina?',a:'Imunossupressão com corticoide em dose progressiva e timectomia, indicada na forma generalizada com anticorpo anti-receptor entre 18 e 65 anos, conforme o estudo MGTX.'},
  {q:'Paciente miastênico interna com pneumonia e passa a ter dispneia e disfagia. Conduta?',a:'Crise miastênica. Terapia intensiva, capacidade vital seriada, intubação precoce se necessário, imunoglobulina ou plasmaférese, antibiótico seguro para a doença e suspensão temporária da piridostigmina se intubado.'},
  {q:'Como a síndrome de Lambert-Eaton difere na clínica e no exame?',a:'É pré-sináptica, com fraqueza proximal de membros inferiores, reflexos diminuídos que melhoram após contração, disautonomia e incremento na estimulação repetitiva de alta frequência; associa-se a câncer de pulmão de pequenas células.'},
  {q:'Por que iniciar prednisona em dose baixa?',a:'Porque dose alta pode causar piora transitória da fraqueza nas primeiras semanas, com risco de crise.'},
  {q:'Qual o exame mais sensível para o diagnóstico?',a:'Eletromiografia de fibra única.'}],
 practice:[
  'Entregue ao paciente uma lista escrita de medicamentos a evitar.',
  'Peça para olhar para cima por um minuto: a ptose que aparece é o sinal mais prático.',
  'Antes de cirurgia eletiva, avalie com o neurologista a necessidade de otimizar o tratamento.'],
 refs:[
  {t:'Narayanaswami P, et al. International consensus guidance for management of myasthenia gravis: 2020 update. Neurology. 2021.',q:'International Consensus Guidance for Management of Myasthenia Gravis 2020 Update Narayanaswami'},
  {t:'Wolfe GI, et al. Randomized trial of thymectomy in myasthenia gravis (MGTX). N Engl J Med. 2016.',q:'Randomized Trial of Thymectomy in Myasthenia Gravis Wolfe 2016'},
  {t:'Gilhus NE. Myasthenia gravis. N Engl J Med. 2016.',q:'Gilhus Myasthenia gravis N Engl J Med 2016'}],
 note:'Síntese de consenso internacional e do estudo MGTX.'
}
});
