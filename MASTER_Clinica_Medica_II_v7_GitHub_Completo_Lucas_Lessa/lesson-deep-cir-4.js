/* Estudo aprofundado · Cirurgia · Coloproctologia, REMIT, cicatrização, queimaduras e vascular. Texto original. */
LessonDeep.add({
'cirproc_0':{
 updated:'2026-11',
 pretest:['Qual é a diferença entre hemorroida interna e externa?','Como se classifica a doença hemorroidária interna?','Qual é o tratamento ambulatorial mais eficaz para graus I a III?','Trombose hemorroidária externa com 24 horas: qual a conduta?',
  'Por que a presença de hemorroidas não encerra a investigação de uma anemia?',
  'Como a continência e os riscos de sangramento influenciam a escolha do procedimento?'
 ],
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
 ,
  {h:'Da sustentação do coxim ao sintoma',p:['O deslizamento do tecido de sustentação e a congestão dos coxins explicam o prolapso e o sangramento. Constipação e esforço podem agravar os sintomas, mas não substituem a avaliação de outras causas. A estratégia começa por tornar a evacuação menos traumática e escolher um procedimento dirigido à anatomia responsável pela queixa.','Goligher classifica prolapso interno, não a gravidade global. Uma pessoa com pouco prolapso pode ter sangramento relevante; outra com doença mista pode não melhorar com tratamento que aborda apenas os coxins internos.']},
  {h:'Diferenciais do sangramento e da dor',table:{head:['Hipótese','Pista útil','Como a decisão muda'],rows:[['Fissura anal','Dor cortante desencadeada pela evacuação','Inspecionar cuidadosamente e tratar o ciclo de trauma e espasmo'],['Abscesso anorretal','Dor contínua, febre ou sensibilidade profunda','Procurar coleção e organizar drenagem'],['Doença inflamatória intestinal','Diarreia, urgência e sintomas sistêmicos','Investigar inflamação intestinal'],['Neoplasia colorretal','Anemia, mudança do hábito ou perda de peso','Investigar o cólon apesar da doença anal concomitante']]}},
  {h:'Procedimento explicado em passos de prova',list:['Confirmar que o alvo é interno e correlacionar exame com a queixa principal.','Para ligadura, escolher mucosa acima da região sensível e conferir tolerância; dor intensa imediata pede revisão do posicionamento.','Na hemorroidectomia, tratar os segmentos indicados preservando pontes de pele e mucosa para reduzir estenose.','Identificar e proteger o aparelho esfincteriano; a intenção é remover tecido doente sem transformar continência em preço obrigatório da cirurgia.','Planejar analgesia, evacuação sem esforço e orientação de retorno por sinais de alarme.']},
  {h:'Complicações depois do tratamento',table:{head:['Achado','Hipótese','Resposta esperada'],rows:[['Sangramento relevante','Sangramento do leito ou queda da banda','Avaliar estabilidade e controlar a fonte conforme gravidade'],['Dificuldade para urinar','Retenção urinária associada a dor e fatores anestésicos','Avaliar bexiga e tratar a retenção, junto com controle da dor'],['Evacuação progressivamente difícil','Estenose cicatricial','Examinar o canal e planejar tratamento conforme extensão'],['Febre com dor desproporcional','Infecção profunda ou sepse','Avaliação imediata e tratamento da fonte']]}}
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
  {q:'Indicação de hemorroidectomia?',a:'Grau IV, falha do tratamento ambulatorial, doença mista volumosa.'},
  {q:'O que a classificação de Goligher mede e o que deixa de medir?',a:'Mede o comportamento do prolapso das hemorroidas internas. Não resume intensidade do sangramento, componente externo, trombose, impacto funcional ou preferência do paciente.'},
  {q:'Por que uma ligadura abaixo da linha pectínea causa tanta dor?',a:'O anoderma possui inervação somática sensível. A banda deve envolver mucosa do coxim interno, em localização apropriada para evitar prender tecido sensível.'},
  {q:'O que investigar diante de febre e dor progressiva depois de um procedimento hemorroidário?',a:'Complicação infecciosa ou séptica, além de retenção urinária e outras causas. A combinação exige avaliação imediata, sem atribuir todo o quadro à dor esperada.'}
 ],
 practice:['Classifique e trate: prolapso à evacuação que volta sozinho, sangramento ocasional.'],
 refs:[
  {t:'Hawkins AT, et al. The American Society of Colon and Rectal Surgeons clinical practice guidelines for the management of hemorrhoids. Dis Colon Rectum. 2024.',q:'ASCRS clinical practice guidelines management of hemorrhoids 2024'},
  {t:'van Tol RR, et al. European Society of Coloproctology guideline for haemorrhoidal disease. Colorectal Dis. 2020.',q:'European Society of Coloproctology guideline haemorrhoidal disease 2020'}],
 exam:[{c:'Sangramento vermelho vivo em paciente com anemia e mudança do hábito intestinal.',p:'Encerrar o caso quando a anuscopia identifica hemorroidas.',r:'Investigar o cólon conforme o contexto; os diagnósticos podem coexistir.'},{c:'Prolapso que exige redução com a mão.',p:'Classificar apenas pela quantidade de sangue.',r:'Goligher grau III; tratamento depende também dos sintomas, componente externo e resposta prévia.'},{c:'Dor importante ao aplicar a banda de ligadura.',p:'Aceitar a dor como confirmação de boa ligadura.',r:'Suspeitar de aplicação em região sensível e reposicionar adequadamente.'},{c:'Nódulo externo azulado, dor em melhora e ausência de necrose.',p:'Indicar procedimento exclusivamente pelo relógio.',r:'Considerar intensidade e evolução da dor, preferência e possibilidade de tratamento conservador.'}],
 cases:[{title:'Anuscopia positiva, investigação ainda necessária',data:['Paciente com sangramento ao evacuar, fadiga e alteração recente das fezes.','A anuscopia mostra coxins internos que sangram ao contato.'],reasoning:['Há uma fonte anal possível, mas anemia e mudança do hábito são sinais de alarme independentes.','Uma causa visível não exclui neoplasia ou outra lesão mais proximal.'],conduct:['Avaliar repercussão do sangramento e investigar o cólon conforme indicação clínica.','Tratar constipação e sintomas anais enquanto a investigação é organizada.'],error:'Atribuir automaticamente toda a anemia às hemorroidas.'},{title:'Decidir além do grau',data:['Paciente com prolapso interno que precisa ser reduzido manualmente.','Já fez medidas clínicas, continua sintomático e apresenta componente externo volumoso.'],reasoning:['O grau descreve o prolapso, mas a doença mista e a falha clínica pesam na decisão.','Um procedimento ambulatorial interno isolado pode não resolver a queixa externa.'],conduct:['Discutir opções, recuperação esperada e riscos de sangramento, estenose e lesão esfincteriana.','Individualizar tratamento cirúrgico ou ambulatorial conforme anatomia e objetivos.'],error:'Escolher ligadura apenas porque o laudo escreveu grau III.'}],
 note:'Diretrizes americana e europeia de doença hemorroidária. Conferência online de atualizações das fontes: a confirmar.'
},
'cirproc_1':{
 updated:'2026-11',
 pretest:['Onde fica a maioria das fissuras anais?','Quais achados caracterizam a fissura crônica?','Abscesso perianal precisa de antibiótico?','O que diz a regra de Goodsall?',
  'Por que a fistulotomia pode curar a fístula e ao mesmo tempo causar dano funcional?',
  'Em qual situação a ressonância muda o planejamento de uma fístula anal?'
 ],
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
 ,
  {h:'Fissura, abscesso e fístula: mecanismos distintos',p:['Na fissura idiopática, o trauma do anoderma e a hipertonia sustentam um ciclo de dor e baixa perfusão. Na doença criptoglandular, a infecção nasce no sistema glandular e percorre espaços anatômicos. A fístula é a persistência de comunicação entre o canal e a pele, frequentemente após a fase de abscesso.','A esfincterotomia pode ser eficaz para fissura selecionada, porém continência prévia, lesão obstétrica, cirurgia anterior e causas secundárias exigem cuidado. A indicação não é automática para toda fissura crônica.']},
  {h:'Comparar antes de instrumentar',table:{head:['Condição','Padrão dominante','Conduta orientadora'],rows:[['Fissura típica','Dor durante e depois de evacuar','Inspeção cuidadosa e tratamento do trauma e espasmo'],['Abscesso','Dor contínua e sensibilidade local ou profunda','Drenar a coleção; pesquisar extensão'],['Fístula','Orifício com drenagem ou episódios repetidos','Mapear trajeto e planejar preservação funcional'],['Fissura secundária','Localização atípica ou doença sistêmica','Investigar a causa antes de assumir doença idiopática']]}},
  {h:'Roteiro técnico da fístula em prova',list:['Descrever os orifícios e a relação do trajeto com os esfíncteres pela classificação de Parks.','Reconhecer fatores de complexidade: ramificações, recidiva, Crohn e continência já alterada.','Controlar abscesso ou sepse antes de exigir fechamento definitivo do trajeto.','Considerar fistulotomia apenas quando a divisão muscular é aceitável no contexto funcional.','Apresentar alternativas de preservação esfincteriana e explicar que escolha depende do mapeamento e da experiência.']},
  {h:'Falhas e complicações que mudam a reavaliação',table:{head:['Problema','Mecanismo possível','Abordagem'],rows:[['Drenagem persistente','Trajeto não identificado ou ramificação','Reavaliar anatomia e doença de base'],['Novo abscesso','Controle séptico incompleto','Pesquisar e drenar coleção'],['Incontinência','Lesão esfincteriana ou função prévia limitada','Documentar função e encaminhar para avaliação especializada'],['Fissura que não responde','Trauma persistente ou causa secundária','Rever diagnóstico e fatores locais e sistêmicos']]}}
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
  {q:'Tratamento do abscesso perianal?',a:'Drenagem cirúrgica.'},
  {q:'Qual é o ciclo que mantém a fissura anal crônica?',a:'Dor e espasmo do esfíncter interno reduzem a perfusão local e favorecem nova lesão durante a evacuação. Reduzir trauma e hipertonia busca interromper esse ciclo.'},
  {q:'Qual o objetivo de um seton de drenagem?',a:'Manter drenagem e controlar sepse em trajeto que não deve ser simplesmente aberto de uma vez; a estratégia definitiva depende da anatomia e do risco de incontinência.'},
  {q:'Goodsall substitui o mapeamento anatômico?',a:'Não. É uma regra de orientação com exceções e menor utilidade em trajetos complexos, recidivados ou associados a doença inflamatória.'}
 ],
 practice:['Aplique Goodsall: orifício às 5 horas a 2 cm do ânus, paciente em litotomia.'],
 refs:[
  {t:'Stewart DB, et al. Clinical practice guideline for the management of anal fissures (ASCRS). Dis Colon Rectum. 2017.',q:'ASCRS clinical practice guideline management of anal fissures 2017'},
  {t:'Gaertner WB, et al. The ASCRS clinical practice guidelines for the management of anorectal abscess, fistula-in-ano, and rectovaginal fistula. Dis Colon Rectum. 2022.',q:'ASCRS clinical practice guidelines anorectal abscess fistula-in-ano 2022'}],
 exam:[{c:'Dor ao evacuar, fissura posterior e medo de ir ao banheiro.',p:'Tratar a dor sem interromper o espasmo e o trauma repetido.',r:'Regularizar fezes e relaxar o esfíncter conforme tratamento indicado.'},{c:'Dor contínua profunda com pouca alteração visível na pele.',p:'Excluir abscesso por não haver abaulamento ou flutuação.',r:'Considerar coleção profunda e necessidade de exame ou imagem apropriados.'},{c:'Fístula recidivada com grande relação com o esfíncter.',p:'Aplicar fistulotomia como solução universal.',r:'Mapear a anatomia e planejar controle séptico com preservação da continência.'},{c:'Fissuras laterais ou múltiplas.',p:'Rotular como fissura idiopática típica.',r:'Investigar doença de Crohn, infecções e neoplasia conforme contexto.'}],
 cases:[{title:'Abscesso oculto na inspeção',data:['Pessoa com dor anorretal contínua, febre e dificuldade para sentar.','A inspeção externa não mostra uma coleção evidente.'],reasoning:['A ausência de flutuação não exclui abscesso profundo.','A gravidade e a localização orientam exame especializado e eventual imagem, sem transformar antibiótico em substituto da drenagem.'],conduct:['Avaliar sinais sistêmicos e solicitar avaliação cirúrgica para controle da coleção.','Associar antibiótico quando houver indicação clínica, como infecção disseminada ou imunossupressão.'],error:'Esperar o abscesso aparecer na pele para procurar controle da fonte.'},{title:'Curar a fístula preservando continência',data:['Paciente com drenagem recorrente após abscesso e trajeto complexo na ressonância.','Há história de incontinência prévia e cirurgia anal.'],reasoning:['O risco funcional não depende apenas do orifício externo.','Dividir mais esfíncter pode agravar uma continência já comprometida.'],conduct:['Discutir controle séptico e estratégia de preservação esfincteriana com equipe experiente.','Mapear trajeto, ramificações e relação muscular antes da técnica definitiva.'],error:'Abrir o trajeto todo porque a doença voltou.'}],
 note:'Diretrizes da sociedade americana de coloproctologia. Conferência online de atualizações das fontes: a confirmar.'
},
'cirproc_2':{
 updated:'2026-11',
 pretest:['Com que idade se inicia o rastreamento do câncer colorretal no risco médio?','Por que o câncer de cólon direito costuma se apresentar com anemia?','Qual exame estadia localmente o câncer de reto?','O que é excisão total do mesorreto?',
  'Por que CEA normal não exclui câncer colorretal?',
  'Qual a diferença entre rastreamento de pessoa assintomática e investigação de um sintoma de alarme?'
 ],
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
 ,
  {h:'Biologia, apresentação e intenção do tratamento',p:['A sequência adenoma-carcinoma e as vias de instabilidade de reparo ajudam a compreender por que história familiar e características moleculares alteram a investigação. Sintomas decorrem de sangramento, redução da luz e invasão local; o padrão depende da localização, mas não serve para excluir lesões fora do padrão clássico.','É preciso separar intenção curativa, tratamento de complicação e controle paliativo. Obstrução, perfuração, extensão metastática, condição funcional e possibilidade de ressecção mudam a ordem das intervenções. Estratégias específicas, inclusive imunoterapia e preservação de órgão, exigem critérios e equipe com seguimento estruturado.']},
  {h:'Diferenciais de hematoquezia e anemia',table:{head:['Hipótese','Pista','Cuidados para não errar'],rows:[['Doença anal','Sangue relacionado à evacuação e achado local','Não explica automaticamente anemia ou alteração do hábito'],['Doença inflamatória','Diarreia, urgência e inflamação mucosa','Pode coexistir com risco aumentado de neoplasia'],['Angiodisplasia','Sangramento intermitente, muitas vezes indolor','A investigação endoscópica identifica a fonte'],['Neoplasia','Anemia, mudança do hábito, lesão ou síndrome hereditária','Confirmar histologia e completar estadiamento']]}},
  {h:'Passos de uma resposta sobre cirurgia oncológica',list:['Dizer localização, histologia e extensão locorregional e sistêmica antes de nomear a operação.','No cólon, explicar ressecção do segmento com sua drenagem linfovascular e margens adequadas.','No reto, explicar dissecção no plano mesorretal com atenção à margem circunferencial e aos nervos autonômicos.','Decidir reconstrução e necessidade de estomia pela perfusão, tensão, nível da anastomose e risco individual.','Encaminhar o espécime para anatomopatológico e usar o estadiamento definitivo para orientar o tratamento complementar.']},
  {h:'Pós-operatório colorretal: o que reconhecer',table:{head:['Complicação','Pista','Raciocínio de manejo'],rows:[['Deiscência anastomótica','Dor, alteração sistêmica ou evolução inesperada','Investigar a fonte e controlar sepse; drenagem ou cirurgia conforme gravidade'],['Íleo ou obstrução','Distensão e intolerância alimentar','Distinguir dismotilidade, causa mecânica e complicação infecciosa'],['Disfunção urinária ou sexual','Alteração funcional após dissecção pélvica','Considerar fatores neurais e discutir reabilitação'],['Alteração evacuatória após cirurgia de reto','Urgência, fragmentação e dificuldade funcional','Avaliar síndrome funcional e oferecer manejo estruturado']]}}
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
  {q:'Quando fazer amputação abdominoperineal?',a:'Quando o tumor de reto baixo invade o esfíncter ou não permite margem distal.'},
  {q:'Por que a fáscia mesorretal importa no câncer de reto?',a:'A relação do tumor com a margem circunferencial influencia risco de ressecção incompleta e o planejamento do tratamento local e neoadjuvante.'},
  {q:'Rastreamento negativo recente dispensa investigar anemia nova?',a:'Não. Rastreamento é dirigido a pessoas assintomáticas. Um sintoma de alarme exige investigação diagnóstica própria, conforme contexto.'},
  {q:'Qual é o papel de discutir o caso antes de operar um tumor de reto?',a:'Integrar estadiamento local, metástases, biologia tumoral, função e estratégia neoadjuvante para aumentar a chance de controle oncológico e preservar função quando seguro.'}
 ],
 practice:['Monte o plano de rastreamento para três pessoas: risco médio de 46 anos, filho de paciente com câncer aos 55 anos e portador de Lynch.'],
 refs:[
  {t:'US Preventive Services Task Force. Screening for colorectal cancer: recommendation statement. JAMA. 2021.',q:'USPSTF screening for colorectal cancer recommendation statement 2021 JAMA'},
  {t:'National Comprehensive Cancer Network. NCCN Guidelines: Colon Cancer e Rectal Cancer. Versão vigente.',q:'NCCN Guidelines Rectal Cancer'},
  {t:'Instituto Nacional de Câncer. Detecção precoce do câncer colorretal.',q:'INCA detecção precoce câncer colorretal'}],
 exam:[{c:'Anemia ferropriva com poucos sintomas abdominais.',p:'Considerar que ausência de obstrução afasta neoplasia.',r:'Investigar perda digestiva; tumores direitos podem sangrar sem obstruir.'},{c:'Lesão de reto com margem circunferencial ameaçada na imagem.',p:'Tratar como câncer de cólon e operar sem planejamento local.',r:'Discussão multidisciplinar e estadiamento retal adequado.'},{c:'CEA normal e colonoscopia com massa suspeita.',p:'Usar o marcador para negar o diagnóstico.',r:'Confirmar histologia e estadiar; CEA não substitui biópsia.'},{c:'Teste de sangue oculto positivo em pessoa assintomática.',p:'Repetir o teste indefinidamente para evitar investigação.',r:'Completar a investigação com colonoscopia conforme indicação.'}],
 cases:[{title:'Sintoma exige diagnóstico',data:['Pessoa com fadiga, anemia ferropriva e alteração recente do hábito intestinal.','Refere ter feito rastreamento anteriormente sem alteração.'],reasoning:['Um exame de rastreamento prévio não elimina a necessidade de investigar um sintoma novo.','Sangramento de tumor proximal pode ser oculto e não causar obstrução evidente.'],conduct:['Investigar a anemia e realizar avaliação diagnóstica do trato digestivo conforme o caso.','Se houver neoplasia, obter histologia e estadiamento antes de planejar tratamento.'],error:'Aplicar o intervalo do rastreamento como justificativa para adiar investigação sintomática.'},{title:'Reto demanda planejamento próprio',data:['Biópsia confirma adenocarcinoma retal.','A ressonância descreve doença localmente avançada e risco para a margem circunferencial.'],reasoning:['Localização pélvica e mesorreto tornam o controle local diferente daquele do cólon.','A cirurgia isolada pode comprometer margens se a estratégia não integrar tratamento prévio.'],conduct:['Discutir o caso em equipe multidisciplinar com revisão da imagem e biologia tumoral.','Planejar tratamento neoadjuvante e técnica oncológica conforme características individuais.'],error:'Escolher apenas a operação pela distância do tumor ao ânus, ignorando o estadiamento.'}],
 note:'USPSTF 2021, NCCN e INCA. Conferência online de atualizações das fontes: a confirmar.'
},
'cirproc_3':{
 updated:'2026-11',
 pretest:['Como diferenciar prolapso retal de prolapso hemorroidário?','Qual é o tratamento de primeira linha do câncer de canal anal?','Qual a conduta no abscesso pilonidal?','Qual vírus causa o condiloma anal?',
  'Por que histologia é decisiva ao diferenciar tumor anal e tumor de reto?',
  'Como a fragilidade e a função prévia influenciam a escolha da operação para prolapso?'
 ],
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
 ,
  {h:'Separar doenças pelo tecido de origem',p:['A doença pilonidal envolve pelos e inflamação da fenda interglútea, enquanto o prolapso é uma alteração da sustentação e da função retal. Já o câncer de canal anal exige distinguir o epitélio e a histologia envolvidos. A mesma queixa de massa ou secreção pode representar mecanismos completamente diferentes.','Para a prova, descreva o achado antes de nomear o tratamento: pregas concêntricas, orifícios com pelos, verrugas, ulceração endurecida ou massa intraluminal. A localização orienta o exame; a histologia orienta o tratamento oncológico.']},
  {h:'Massa ou secreção perianal',table:{head:['Hipótese','Achado dominante','Próximo raciocínio'],rows:[['Prolapso retal','Pregas concêntricas de parede exteriorizada','Avaliar função e planejar correção'],['Prolapso hemorroidário','Coxins separados por sulcos radiais','Classificar componente interno e externo'],['Doença pilonidal','Orifícios na fenda com pelos e secreção','Distinguir abscesso agudo de doença crônica'],['Lesão neoplásica','Ulceração persistente ou tecido endurecido','Biópsia e estadiamento']]}},
  {h:'Roteiro técnico que evita decorar só o epônimo',list:['Na doença pilonidal aguda, controlar a coleção e evitar apresentar antibiótico como tratamento definitivo do pus.','Na doença crônica, explicar como excisão e fechamento podem reduzir a fenda e a tensão local.','No prolapso, comparar fixação abdominal e abordagem perineal relacionando recidiva, função e risco operatório.','Na oncologia anal, começar por biópsia e estadiamento, antes de propor uma operação.','Planejar seguimento: recidiva, ferida, função evacuatória e resposta oncológica são desfechos diferentes.']},
  {h:'Complicações e seguimento',table:{head:['Situação','Avaliação necessária','Conduta conceitual'],rows:[['Ferida pilonidal que não fecha','Tensão, pelos, infecção e técnica de fechamento','Corrigir fatores locais e reavaliar abordagem'],['Novo prolapso ou sintomas persistentes','Anatomia e função do assoalho pélvico','Investigar recidiva e tratar componente funcional'],['Toxicidade do tratamento oncológico','Pele, mucosas, nutrição e função','Apoio multidisciplinar e ajuste pelo time responsável'],['Suspeita de doença anal persistente','Exame e confirmação conforme momento e contexto','Reestadiar e discutir resgate especializado']]}}
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
  {q:'Conduta no abscesso pilonidal?',a:'Drenagem, com incisão fora da linha média.'},
  {q:'Qual o princípio de um fechamento fora da linha média na doença pilonidal?',a:'Reduzir profundidade da fenda e tensão na área vulnerável, buscando diminuir problemas da ferida e recidiva; a técnica é individualizada.'},
  {q:'O aspecto de uma lesão anal substitui biópsia?',a:'Não. Lesão suspeita, ulcerada ou endurecida requer confirmação histológica e estadiamento apropriado.'},
  {q:'Por que tratar constipação continua importante depois de corrigir prolapso?',a:'A anatomia corrigida não elimina automaticamente disfunção evacuatória, esforço e problemas do assoalho pélvico que contribuem para sintomas e recidiva.'}
 ],
 practice:['Compare câncer de canal anal e de reto baixo: histologia e tratamento.'],
 refs:[
  {t:'Rao S, et al. Anal cancer: ESMO clinical practice guidelines. Ann Oncol. 2021.',q:'ESMO clinical practice guidelines anal cancer 2021'},
  {t:'Bordeianou L, et al. Clinical practice guidelines for the treatment of rectal prolapse (ASCRS). Dis Colon Rectum. 2017.',q:'ASCRS clinical practice guidelines treatment of rectal prolapse'},
  {t:'Johnson EK, et al. The ASCRS clinical practice guidelines for the management of pilonidal disease. Dis Colon Rectum. 2019.',q:'ASCRS clinical practice guidelines pilonidal disease 2019'}],
 exam:[{c:'Exteriorização do reto com pregas circulares.',p:'Chamar qualquer massa exteriorizada de hemorroida.',r:'Reconhecer prolapso retal de espessura total e avaliar função e risco operatório.'},{c:'Abscesso doloroso na fenda interglútea.',p:'Planejar apenas cirurgia eletiva da doença crônica.',r:'Controlar o abscesso por drenagem e depois reavaliar a estratégia definitiva.'},{c:'Biópsia com carcinoma escamoso do canal anal.',p:'Indicar amputação como rotina inicial de todos os tumores anais.',r:'Estadiar e discutir quimiorradioterapia e situações especiais em equipe.'},{c:'Lesão verrucosa acompanhada de área endurecida e ulcerada.',p:'Tratar tudo como condiloma banal.',r:'Investigar a região suspeita, incluindo biópsia quando indicada.'}],
 cases:[{title:'Prolapso não se resume à idade',data:['Pessoa com exteriorização de parede retal e pregas concêntricas.','Apresenta constipação, incontinência e limitação funcional importante.'],reasoning:['É necessário caracterizar o prolapso e a função do assoalho pélvico.','A via operatória depende de reserva fisiológica, anatomia e sintomas, não apenas de uma idade isolada.'],conduct:['Avaliar risco operatório e discutir correção abdominal ou perineal conforme o conjunto do caso.','Tratar fatores evacuatórios e explicar expectativas funcionais.'],error:'Prometer que qualquer correção anatômica elimina toda a incontinência e constipação.'},{title:'A histologia muda o caminho',data:['Paciente com lesão ulcerada do canal e biópsia de carcinoma escamoso.','Não há obstrução ou outra emergência cirúrgica imediata.'],reasoning:['A histologia e a localização definem uma estratégia diferente do adenocarcinoma retal.','A preservação esfincteriana faz parte do objetivo terapêutico quando oncologicamente apropriado.'],conduct:['Completar estadiamento e discutir quimiorradioterapia com equipe multidisciplinar.','Reservar estratégias cirúrgicas para indicações específicas, como doença persistente ou recorrente.'],error:'Escolher cirurgia radical apenas por o tumor estar perto do ânus.'}],
 note:'Diretrizes da ESMO e da sociedade americana de coloproctologia. Conferência online de atualizações das fontes: a confirmar.'
},
'cirremit_0':{
 updated:'2026-11',
 pretest:['Quais são as fases da resposta metabólica ao trauma?','Quais hormônios aumentam e quais diminuem?','Por que o paciente operado retém água e sódio?','Como o protocolo de recuperação acelerada reduz essa resposta?',
  'Por que ofertar calorias não interrompe sozinho o catabolismo do doente grave?',
  'Como diferenciar retenção hormonal de água de hipoperfusão em uma avaliação à beira do leito?'
 ],
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
 ,
  {h:'Por que o catabolismo não é simples falta de comida',p:['A lesão tecidual ativa vias neuroendócrinas e mediadores inflamatórios. O fígado produz glicose e proteínas de fase aguda, enquanto o músculo fornece substratos. O resultado pode ser perda de força mesmo com oferta nutricional, porque a demanda metabólica e a utilização dos nutrientes estão alteradas.','A separação em fases ajuda a organizar a prova, mas não é um cronômetro rígido. Choque, infecção persistente, nova cirurgia e falência orgânica podem sobrepor fases. A resposta deve ser interpretada junto com a situação hemodinâmica e a evolução clínica.']},
  {h:'Interpretar achados sem automatismos',table:{head:['Achado','Resposta ao estresse possível','Outras causas a investigar'],rows:[['Hiperglicemia','Resistência à insulina e produção hepática','Diabetes prévio, medicações e aporte'],['Oligúria','Retenção hormonal','Hipoperfusão, obstrução e lesão renal'],['Albumina baixa','Proteína de fase aguda negativa e redistribuição','Ingestão insuficiente e outras perdas'],['Taquicardia','Ativação simpática e dor','Sangramento, infecção, hipoxemia e arritmia']]}},
  {h:'Resposta de prova sobre recuperação acelerada',list:['Explicar qual agressão pode ser reduzida antes, durante e depois da operação.','Abreviar jejum apenas quando seguro para o risco de aspiração e o procedimento.','Combinar analgesia, técnica menos traumática quando apropriada, normotermia e cuidado com fluidos.','Planejar alimentação e mobilização pelo estado clínico, sem ignorar instabilidade ou intolerância.','Medir recuperação por função e segurança, incluindo reconhecimento precoce de complicações.']},
  {h:'Complicações metabólicas e o que fazer com o raciocínio',table:{head:['Situação','Consequência','Princípio de manejo'],rows:[['Catabolismo prolongado','Fraqueza e dificuldade de reabilitação','Tratar agressão persistente, nutrir e mobilizar'],['Hiperglicemia persistente','Maior vulnerabilidade a complicações','Monitorar e tratar com metas individualizadas, evitando hipoglicemia'],['Sobrecarga de fluidos','Edema e disfunção orgânica','Reavaliar indicação de novas infusões e estratégia de balanço'],['Baixa ingestão prolongada','Déficit proteico e energético','Avaliar risco nutricional e via de suporte apropriada']]}}
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
  {q:'Medida pré-operatória que reduz resistência à insulina?',a:'Bebida com carboidrato até 2 horas antes, abreviando o jejum.'},
  {q:'Insulina elevada significa ação insulínica adequada no trauma?',a:'Não. A resistência à insulina pode coexistir com sua elevação, mantendo produção hepática de glicose e dificuldade de captação periférica.'},
  {q:'Por que albumina baixa não mede sozinha a desnutrição aguda?',a:'Inflamação, distribuição de fluidos e resposta de fase aguda reduzem sua concentração. A avaliação nutricional precisa integrar história, ingestão e função.'},
  {q:'Qual é a pergunta antes de oferecer mais volume a um paciente oligúrico?',a:'Se há hipoperfusão ou outra causa reversível, avaliando circulação, tendência clínica, balanço e contexto; oligúria isolada não define resposta a fluidos.'}
 ],
 practice:['Explique por que o paciente operado tem hiperglicemia mesmo sem diabetes.'],
 refs:[
  {t:'Townsend CM, et al. Sabiston Textbook of Surgery. 21ª ed. Capítulo The Inflammatory Response e Metabolism in Surgical Patients.',q:'Sabiston metabolism in surgical patients chapter'},
  {t:'Gustafsson UO, et al. Guidelines for perioperative care in elective colorectal surgery: ERAS Society recommendations 2018. World J Surg. 2019.',q:'ERAS Society recommendations 2018 elective colorectal surgery'},
  {t:'Desborough JP. The stress response to trauma and surgery. Br J Anaesth. 2000.',q:'Desborough stress response to trauma and surgery Br J Anaesth 2000'}],
 exam:[{c:'Hiperglicemia depois de grande cirurgia em pessoa sem diabetes.',p:'Atribuir exclusivamente à dieta ou concluir falta absoluta de insulina.',r:'Reconhecer resposta hormonal e inflamatória com resistência à insulina.'},{c:'Oligúria com edema e sinais de congestão após reposição.',p:'Prescrever volume repetidamente para normalizar um número isolado.',r:'Reavaliar perfusão, balanço e outras causas de alteração renal.'},{c:'Jejum prolongado em comparação com trauma e sepse.',p:'Afirmar que o organismo poupa proteína da mesma forma nas duas situações.',r:'Trauma mantém catabolismo dirigido por mediadores, apesar da oferta energética.'},{c:'Protocolo com mobilização, analgesia e nutrição integradas.',p:'Reduzir recuperação acelerada a alta precoce.',r:'Entender um conjunto de medidas que reduz agressão e favorece recuperação funcional.'}],
 cases:[{title:'Oligúria não é uma ordem automática de soro',data:['Paciente no pós-operatório com balanço positivo, edema e diurese reduzida.','A perfusão, a função cardíaca e a tendência dos exames precisam ser reavaliadas.'],reasoning:['A resposta hormonal retém água, mas oligúria também pode sinalizar hipoperfusão, obstrução ou lesão renal.','A decisão não cabe em uma interpretação única da diurese.'],conduct:['Reexaminar circulação, congestão, perdas, medicações e permeabilidade do sistema urinário.','Individualizar reposição ou outra intervenção de acordo com o mecanismo identificado.'],error:'Administrar fluidos em sequência sem avaliar benefício e risco.'},{title:'Nutrir e tratar a causa do catabolismo',data:['Paciente com trauma importante perde força e apresenta hiperglicemia durante internação.','Há inflamação persistente e ingestão alimentar insuficiente.'],reasoning:['O aporte reduz déficit nutricional, mas não apaga sozinho a resposta ao estresse.','Controle da agressão, analgesia, mobilidade e nutrição são complementares.'],conduct:['Investigar complicações que mantêm inflamação e planejar suporte nutricional individualizado.','Favorecer mobilização e recuperação funcional quando clinicamente possíveis.'],error:'Tentar compensar toda a perda muscular apenas aumentando calorias de forma indiscriminada.'}],
 note:'Tratado de cirurgia e diretriz da sociedade ERAS. Conferência online de atualizações das fontes: a confirmar.'
},
'cirremit_1':{
 updated:'2026-11',
 pretest:['Quais são as três fases da cicatrização?','Qual célula é indispensável na fase inflamatória?','Qual vitamina reverte o efeito do corticoide na cicatrização?','Como diferenciar queloide de cicatriz hipertrófica?',
  'Como perfusão e tensão na ferida interferem no fechamento?',
  'Por que uma ferida que muda de aspecto em cicatriz antiga exige novo diagnóstico?'
 ],
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
 ,
  {h:'O leito da ferida é um sistema, não uma sequência isolada',p:['Hemostasia, inflamação, proliferação e remodelamento se sobrepõem. O oxigênio e o aporte sanguíneo sustentam a defesa e a síntese de matriz; tensão excessiva e edema podem comprometer a microcirculação. Por isso perfusão, desbridamento e estratégia de fechamento devem ser pensados juntos.','A presença de microrganismos não equivale sozinha a infecção clínica. Colonização, biofilme, invasão tecidual e resposta do hospedeiro precisam ser correlacionados. Valores microbiológicos isolados não substituem o exame da ferida e os sinais sistêmicos.']},
  {h:'Ferida que não progride: diferenciais',table:{head:['Mecanismo','Pistas','Princípio de correção'],rows:[['Isquemia','Extremidade fria, dor ou tecido sem viabilidade','Avaliar perfusão e possibilidade de restaurá-la'],['Infecção ou corpo estranho','Secreção, inflamação e evolução desfavorável','Investigar e controlar a fonte'],['Pressão e trauma repetido','Lesão em área de apoio ou atrito','Retirar o agente mecânico e proteger o local'],['Neoplasia ou doença inflamatória','Aspecto atípico e falha persistente','Rever diagnóstico e considerar biópsia']]}},
  {h:'Técnica de fechamento explicada por princípios',list:['Avaliar viabilidade, perfusão, contaminação e estruturas expostas antes da escolha do método.','Preparar o leito com limpeza e desbridamento quando indicados, sem remover tecido viável indiscriminadamente.','Aproximar planos sem estrangular bordas ou criar espaço morto evitável.','Escolher fechamento primário, cicatrização aberta, fechamento retardado ou cobertura conforme o caso.','Orientar proteção da ferida, sinais de alarme e reavaliação funcional.']},
  {h:'Complicações de ferida e de cicatriz',table:{head:['Problema','Por que importa','Abordagem conceitual'],rows:[['Deiscência','Pode envolver planos profundos e fonte infecciosa','Avaliar extensão e urgência, além da aparência da pele'],['Cicatriz retrátil','Limita movimento e função','Reabilitação e correção especializada conforme necessidade'],['Queloide recorrente','A retirada isolada pode não controlar a doença','Discutir tratamento multimodal'],['Úlcera em cicatriz antiga','Pode representar malignização','Investigar histologicamente quando indicada']]}}
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
  {q:'O que é úlcera de Marjolin?',a:'Carcinoma espinocelular em cicatriz crônica, como de queimadura.'},
  {q:'Qual é a função dos miofibroblastos?',a:'Promover contração da ferida; sua atividade ajuda o fechamento, mas pode contribuir para retrações funcionais em algumas cicatrizes.'},
  {q:'Por que tecido desvitalizado dificulta a cicatrização?',a:'Mantém material sem perfusão, favorece infecção e impede um leito adequado para reparo ou cobertura.'},
  {q:'Qual o cuidado ao interpretar a vitamina A como solução para uso de corticoide?',a:'Não é uma prescrição automática: benefício, indicação e riscos exigem avaliação específica. Perfusão, infecção, nutrição e necessidade do corticoide precisam ser revistos.'}
 ],
 practice:['Explique o papel de cada vitamina e mineral na cicatrização.'],
 refs:[
  {t:'Townsend CM, et al. Sabiston Textbook of Surgery. 21ª ed. Capítulo Wound Healing.',q:'Sabiston wound healing chapter'},
  {t:'Gurtner GC, et al. Wound repair and regeneration. Nature. 2008.',q:'Gurtner wound repair and regeneration Nature 2008'}],
 exam:[{c:'Ferida contaminada com bordas que poderiam ser aproximadas.',p:'Confundir capacidade mecânica de suturar com indicação de fechar.',r:'Avaliar contaminação, viabilidade e controle da fonte; pode ser necessário manter aberta inicialmente.'},{c:'Cicatriz que ultrapassa a incisão e volta após retirada isolada.',p:'Tratar como simples cicatriz hipertrófica.',r:'Reconhecer queloide e discutir estratégia combinada.'},{c:'Ferida em cicatriz antiga que passa a ulcerar e sangrar.',p:'Insistir em curativos sem rever o diagnóstico.',r:'Investigar malignização, com biópsia quando indicada.'},{c:'Borda isquêmica e fechamento sob tensão.',p:'Aumentar a força da sutura para impedir abertura.',r:'Corrigir perfusão e tensão, evitando estrangulamento do tecido.'}],
 cases:[{title:'Fechar menos pode ser mais seguro',data:['Ferida operatória contaminada, com tecido desvitalizado e sinais de infecção.','É possível aproximar a pele, mas o leito não está adequado.'],reasoning:['A sutura não corrige a fonte infecciosa nem devolve viabilidade ao tecido.','O fechamento sob essas condições pode aprisionar infecção e falhar.'],conduct:['Controlar a fonte, remover tecido desvitalizado quando indicado e escolher cuidado local adequado.','Reavaliar o momento e a forma de cobertura depois de melhorar as condições do leito.'],error:'Usar a aparência fechada da pele como único objetivo do cuidado.'},{title:'Uma cicatriz antiga não explica toda ferida nova',data:['Pessoa com cicatriz antiga de queimadura apresenta úlcera que não evolui como esperado.','A área está endurecida e passou a sangrar ao contato.'],reasoning:['Mudança persistente de uma cicatriz exige descartar neoplasia.','A história de trauma antigo não é um diagnóstico suficiente para a lesão atual.'],conduct:['Encaminhar para avaliação e biópsia apropriadas.','Planejar tratamento pelo diagnóstico e extensão, preservando avaliação funcional.'],error:'Repetir curativos sem investigar uma hipótese diferente.'}],
 note:'Tratado de cirurgia e revisão clássica de cicatrização. Conferência online de atualizações das fontes: a confirmar.'
},
'cirremit_2':{
 updated:'2026-11',
 pretest:['Queimadura de primeiro grau entra no cálculo da superfície queimada?','Como se diferencia segundo grau superficial de profundo?','Quanto vale a cabeça na regra dos nove no adulto e na criança?','Quais queimaduras devem ir para centro especializado?',
  'O que são as zonas de coagulação, estase e hiperemia de uma queimadura?',
  'Por que uma área inicialmente intermediária pode aprofundar depois da avaliação inicial?'
 ],
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
 ,
  {h:'Zonas de Jackson e a queimadura que evolui',p:['A zona de coagulação representa dano central irreversível. A zona de estase tem perfusão prejudicada e pode recuperar ou aprofundar; a zona de hiperemia apresenta resposta inflamatória mais periférica e tende a recuperar quando não há agressão adicional. O cuidado busca impedir que tecido potencialmente viável seja perdido.','Hipoperfusão, infecção, edema e exposição continuada ao agente podem piorar a lesão. Evitar hipotermia, proteger a área e restaurar perfusão fazem parte do tratamento da ferida, mesmo antes da escolha de uma cobertura.']},
  {h:'Avaliar profundidade pelo conjunto',table:{head:['Aspecto','Interpretação possível','Limitação'],rows:[['Rosado, úmido e sensível','Espessura parcial mais superficial','Exige reavaliação, pois profundidade pode variar'],['Pálido ou mosqueado e menos sensível','Espessura parcial profunda','Dor reduzida não significa menor gravidade'],['Couro, escara e ausência de perfusão local','Espessura total','A extensão profunda exige planejamento de excisão e cobertura'],['Eritema com pele íntegra sem bolha','Lesão superficial','Distinguir das áreas contadas para ressuscitação por fórmula']]}},
  {h:'Roteiro de avaliação para prova prática',list:['Identificar mecanismo, ambiente, trauma associado e possibilidade de dano inalatório ou sistêmico.','Examinar profundidade por regiões, documentando cor, umidade, perfusão e sensibilidade.','Calcular extensão com método apropriado à pessoa, usando a mão do próprio paciente quando a estimativa palmar for escolhida.','Pesquisar regiões especiais, circunferência do segmento e repercussão funcional.','Reavaliar e comunicar ao centro de referência o mecanismo, a extensão, a profundidade e o suporte já realizado.']},
  {h:'Sequelas e complicações ligadas à profundidade',table:{head:['Problema','Risco principal','Princípio de prevenção ou manejo'],rows:[['Aprofundamento','Perda de tecido inicialmente viável','Corrigir perfusão e evitar agressões adicionais'],['Cicatriz hipertrófica ou retração','Limitação funcional','Planejar cobertura e reabilitação'],['Infecção da área','Progressão local e repercussão sistêmica','Vigiar evolução e tratar infecção diagnosticada'],['Comprometimento de região especial','Perda de função apesar de pequena extensão','Avaliação especializada precoce']]}}
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
  {q:'Cite três critérios de centro de queimados.',a:'Terceiro grau, face ou mãos, elétrica, química, inalatória, mais de 10% de espessura parcial.'},
  {q:'Por que a profundidade deve ser reavaliada?',a:'A lesão pode evoluir por hipoperfusão, edema, infecção e dano continuado. O aspecto inicial não define sozinho a profundidade final.'},
  {q:'Toda queimadura com bolha tem a mesma gravidade?',a:'Não. Cor, umidade, perfusão e sensibilidade do leito ajudam a diferenciar profundidade e potencial de cicatrização.'},
  {q:'Qual é a diferença entre área de superfície e gravidade funcional?',a:'Área quantifica extensão, mas uma lesão pequena em região funcional ou por mecanismo especial pode exigir cuidado especializado.'}
 ],
 practice:['Calcule: adulto com segundo grau em todo o membro superior direito, tronco anterior e face, e primeiro grau no dorso.'],
 refs:[
  {t:'American College of Surgeons. Advanced Trauma Life Support, 11ª edição. 2025. Capítulo de lesões térmicas.',q:'ATLS 11th edition thermal injuries'},
  {t:'American Burn Association. Guidelines for burn patient referral. 2022.',q:'American Burn Association guidelines for burn patient referral'}],
 exam:[{c:'Queimadura extensa misturada a áreas apenas avermelhadas.',p:'Somar toda a pele vermelha na superfície usada pela fórmula.',r:'Distinguir eritema superficial das áreas de espessura parcial e total.'},{c:'Lesão pálida, seca, pouco sensível.',p:'Considerar menos grave porque dói pouco.',r:'Reconhecer possibilidade de lesão profunda e necessidade de cobertura especializada.'},{c:'Queimadura pequena na mão ou por eletricidade.',p:'Usar só a porcentagem de superfície para decidir encaminhamento.',r:'Considerar função, profundidade, mecanismo e recursos disponíveis.'},{c:'Área intermediária piora durante a evolução.',p:'Tratar a primeira classificação como imutável.',r:'Reavaliar profundidade e fatores que comprometem a zona de estase.'}],
 cases:[{title:'A bolha não encerra a classificação',data:['Paciente com áreas úmidas e rosadas ao lado de outras pálidas e menos sensíveis.','A extensão foi calculada, mas a profundidade varia entre as regiões.'],reasoning:['Queimaduras podem ser heterogêneas; presença de bolha não define uma profundidade única.','As áreas profundas têm menor potencial de cicatrização espontânea e maior risco de sequelas.'],conduct:['Documentar profundidade por área e reavaliar a evolução.','Planejar curativos, cobertura e avaliação especializada conforme profundidade e função.'],error:'Classificar toda a queimadura pelo ponto mais superficial.'},{title:'Pouca superfície, grande impacto',data:['Pessoa com queimadura profunda de mão e dificuldade para movimentar os dedos.','A superfície total atingida é pequena.'],reasoning:['A relevância funcional não acompanha necessariamente a extensão.','Edema, cicatriz e dano profundo podem comprometer a função se o cuidado for inadequado.'],conduct:['Procurar avaliação especializada e organizar analgesia, proteção e plano de reabilitação.','Reavaliar perfusão e profundidade, incluindo risco de restrição por lesão circunferencial.'],error:'Dispensar encaminhamento apenas porque a área não é extensa.'}],
 note:'ATLS 11 e critérios de encaminhamento da associação americana de queimaduras. Conferência online de atualizações das fontes: a confirmar.'
},
'cirremit_3':{
 updated:'2026-11',
 pretest:['Qual fórmula de reposição o ATLS recomenda hoje? E qual ainda cai muito em prova?','Qual a meta de diurese no adulto?','Quais sinais indicam lesão inalatória e intubação precoce?','Quando fazer escarotomia?',
  'Qual a diferença entre escarotomia e fasciotomia?',
  'Por que uma fórmula de reposição deve ser ajustada pela resposta clínica?'
 ],
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
 ,
  {h:'Do aumento de permeabilidade ao excesso de fluidos',p:['A queimadura extensa causa aumento de permeabilidade vascular, perda de fluido para o interstício e redução do volume circulante efetivo. Mais tarde, manter infusões excessivas pode ampliar edema e dificultar ventilação e perfusão. Essa dinâmica explica por que a fórmula orienta o início e não autoriza tratamento automático.','Os valores de ATLS e Parkland já apresentados no material são referenciais diferentes, não fórmulas intercambiáveis. A fonte pedida pelo enunciado deve ser declarada. A atualização online dos números, inclusive ajustes pediátricos e de queimadura elétrica, permanece a confirmar.']},
  {h:'Problema observado e mecanismos diferentes',table:{head:['Achado','Mecanismos a considerar','Conduta conceitual'],rows:[['Diurese reduzida','Hipoperfusão, lesão renal, obstrução ou pressão elevada','Reavaliar o conjunto antes de infundir mais'],['Dificuldade ventilatória','Lesão inalatória, edema ou escara restritiva','Avaliar via aérea, pulmão e parede torácica'],['Membro tenso','Escara circunferencial ou síndrome compartimental profunda','Distinguir necessidade de escarotomia e fasciotomia'],['Oxímetro aparentemente normal após incêndio','Possível interferência da carboxi-hemoglobina','Investigar intoxicação pela história e exame apropriado']]}},
  {h:'Escarotomia e cuidado da queimadura: passos de uma resposta',list:['Descrever indicação por restrição circulatória ou ventilatória, não apenas pela presença de escara.','Explicar que a liberação atravessa a escara restritiva e exige conhecimento anatômico e controle de sangramento.','Reavaliar perfusão ou expansão da parede depois da liberação.','Se persistir suspeita de compartimento muscular, avaliar procedimento fascial específico.','Planejar excisão e cobertura das áreas profundas, suporte nutricional e reabilitação com a equipe especializada.']},
  {h:'Complicações sistêmicas e locais',table:{head:['Situação','Mecanismo','Foco de manejo'],rows:[['Lesão renal após eletricidade','Mioglobina, hipoperfusão e outras agressões','Monitorar função renal e tratar mecanismo identificado'],['Restrição ventilatória','Lesão pulmonar, edema ou escara','Tratar componente responsável e proteger via aérea quando indicado'],['Infecção','Barreira perdida e tecido inviável','Diagnóstico clínico e controle da fonte, sem antibiótico sistêmico profilático indiscriminado'],['Retração cicatricial','Reparo com perda de elasticidade','Reabilitação e cobertura funcional planejadas']]}}
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
  {q:'O que é úlcera de Curling?',a:'Úlcera de estresse no grande queimado.'},
  {q:'Escarotomia trata toda síndrome compartimental?',a:'Não. Libera a restrição da escara em queimadura circunferencial; a fasciotomia aborda compartimentos musculares e pode ser necessária em dano profundo, como em lesão elétrica.'},
  {q:'O que fazer quando diurese baixa persiste apesar de crescente infusão?',a:'Reavaliar perfusão, cálculo da extensão, perdas, lesão renal, obstrução e sobrecarga. Aumentar volume sem investigar pode agravar edema e complicações.'},
  {q:'Por que a oximetria habitual é insuficiente em suspeita de monóxido de carbono?',a:'Ela pode apresentar leitura aparentemente tranquilizadora apesar de carboxi-hemoglobina. A história de exposição e a avaliação específica da hemoglobina são importantes.'}
 ],
 practice:['Calcule para um homem de 80 kg com 40% de superfície queimada às 10 horas, chegando às 12 horas: volume total e ritmo até as 18 horas, pelo ATLS e por Parkland.'],
 refs:[
  {t:'American College of Surgeons. Advanced Trauma Life Support, 11ª edição. 2025. Capítulo de lesões térmicas.',q:'ATLS 11th edition thermal injuries'},
  {t:'Cartotto R, et al. American Burn Association clinical practice guidelines on burn shock resuscitation. J Burn Care Res. 2024.',q:'American Burn Association clinical practice guidelines burn shock resuscitation 2024 Cartotto'},
  {t:'ISBI Practice Guidelines Committee. ISBI practice guidelines for burn care. Burns. 2016.',q:'ISBI practice guidelines for burn care 2016'}],
 exam:[{c:'O enunciado pede explicitamente Parkland.',p:'Trocar a fórmula clássica pela recomendação inicial citada para ATLS sem explicar a diferença.',r:'Identificar qual referencial a prova solicitou; manter os valores de cada fórmula distintos.'},{c:'Paciente chega depois de já ter recebido fluidos.',p:'Recomeçar o relógio e desconsiderar o volume administrado.',r:'Contar desde a queimadura e integrar o suporte prévio ao cálculo e à reavaliação.'},{c:'Queimadura circunferencial com piora da perfusão ou ventilação.',p:'Aguardar a fase de enxertia para liberar a escara.',r:'Reconhecer restrição mecânica e avaliar indicação de escarotomia.'},{c:'Acidente elétrico com pouca lesão aparente na pele.',p:'Estimar o dano interno apenas pela superfície visível.',r:'Pesquisar lesão profunda, repercussão cardíaca, rabdomiólise e compartimentos.'}],
 cases:[{title:'A fórmula não substitui a reavaliação',data:['Paciente com queimadura extensa recebe reposição crescente e passa a apresentar edema importante.','A diurese permanece reduzida e o balanço está muito positivo.'],reasoning:['Oligúria pode refletir mecanismos além de falta de volume.','Sobrecarga pode agravar edema, ventilação e pressão compartimental.'],conduct:['Reavaliar perfusão, cálculo da extensão, suporte já recebido, função renal e obstrução.','Titular tratamento com avaliação especializada e monitorização clínica integrada.'],error:'Persistir em aumentar a infusão apenas porque a fórmula ou a diurese parecem exigir.'},{title:'Escara e compartimento não são sinônimos',data:['Pessoa com queimadura elétrica apresenta dor profunda, tensão do membro e alteração funcional.','A pele queimada é pouco extensa.'],reasoning:['O dano elétrico pode atingir músculo e produzir síndrome compartimental.','Liberar somente a escara não resolve necessariamente pressão dentro dos compartimentos musculares.'],conduct:['Avaliar perfusão e compartimentos com urgência junto à equipe cirúrgica.','Tratar dano profundo e repercussões sistêmicas, incluindo rabdomiólise, conforme o caso.'],error:'Propor escarotomia como solução universal para qualquer tensão do membro.'}],
 note:'ATLS 11 e diretriz de ressuscitação da associação americana de queimaduras. Conferência online de atualizações das fontes: a confirmar.'
},
'cirvasc_0':{
 updated:'2026-11',
 pretest:['Qual valor de índice tornozelo-braquial define doença arterial periférica?','Qual a classificação de Fontaine?','Qual é o tratamento com maior impacto na claudicação?','O que é a síndrome de Leriche?',
  'Por que uma artéria incompressível pode produzir índice tornozelo-braquial enganoso?',
  'Como diferenciar claudicação estável de um membro cronicamente ameaçado?'
 ],
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
 ,
  {h:'Hemodinâmica que explica a claudicação',p:['Uma estenose pode permitir fluxo suficiente em repouso e falhar quando a demanda muscular cresce. A dor surge do desequilíbrio entre oferta e necessidade durante esforço. Quando perfusão basal fica muito comprometida, aparecem dor em repouso e lesão tecidual, mas a ameaça ao membro precisa integrar ferida, infecção e evidência de isquemia.','Fontaine organiza sintomas e não substitui uma avaliação completa de ameaça ao membro. Dor em repouso ou úlcera precisam ser atribuídas à isquemia no contexto clínico; neuropatia, infecção e causas mecânicas podem coexistir. A classificação WIfI ajuda a integrar esses componentes.']},
  {h:'Rutherford crônica: descrição clínica completa',table:{head:['Categoria','Quadro predominante'],rows:[['0','Assintomático'],['1','Claudicação leve'],['2','Claudicação moderada'],['3','Claudicação grave'],['4','Dor isquêmica em repouso'],['5','Perda tecidual limitada'],['6','Perda tecidual extensa']]}},
  {h:'Diferenciais da dor no membro',table:{head:['Hipótese','Pista','Como investigar o mecanismo'],rows:[['Claudicação arterial','Dor muscular reprodutível com esforço','Pulsos, testes fisiológicos e imagem quando necessária'],['Claudicação neurogênica','Relação com postura e sintomas neurológicos','Exame neurológico e investigação da coluna conforme contexto'],['Dor venosa','Edema e desconforto com ortostatismo','Exame e duplex venoso conforme indicação'],['Neuropatia','Queimação ou alteração sensitiva','Avaliação neurológica e fatores de risco']]}},
  {h:'Como defender uma estratégia de revascularização',list:['Definir se a indicação é limitação funcional refratária ou ameaça ao membro.','Avaliar anatomia, perfusão distal, ferida, infecção, risco clínico e expectativa funcional.','Comparar opções endovasculares e abertas, incluindo disponibilidade de conduto autólogo quando pertinente.','Explicar que restaurar fluxo deve acompanhar controle de fatores de risco e tratamento da ferida.','Planejar seguimento por sintomas, pulsos, perfusão e integridade da reconstrução.']},
  {h:'Complicações depois de revascularizar',table:{head:['Problema','Pista','Princípio de manejo'],rows:[['Trombose da reconstrução','Retorno de dor, frialdade ou perda de pulso','Avaliação vascular urgente'],['Infecção de ferida ou prótese','Secreção ou sinais sistêmicos','Investigar extensão e controlar a fonte'],['Reperfusão e edema','Dor ou tensão crescente','Avaliar compartimentos e repercussão sistêmica'],['Persistência de ferida','Perfusão insuficiente, infecção ou pressão local','Reavaliar todos os componentes do membro ameaçado']]}}
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
  {q:'Tríade de Leriche?',a:'Claudicação glútea, disfunção erétil e pulsos femorais ausentes.'},
  {q:'O que diferencia claudicação vascular de dor neurogênica?',a:'A claudicação vascular tem relação reprodutível com esforço muscular e melhora ao parar. A dor neurogênica se relaciona também com postura e pode melhorar com flexão; o exame vascular e a investigação dirigida ajudam a separar.'},
  {q:'Por que uma úlcera no pé exige avaliação de perfusão mesmo quando o ITB não parece baixo?',a:'Diabetes e doença renal podem tornar artérias incompressíveis. O valor isolado pode não refletir a perfusão distal e precisa ser correlacionado com outros testes.'},
  {q:'Qual é a finalidade da classificação WIfI?',a:'Combinar ferida, isquemia e infecção do pé para estimar ameaça ao membro e ajudar a planejar revascularização e cuidado multidisciplinar.'}
 ],
 practice:['Prescreva o tratamento clínico completo de um claudicante tabagista e diabético.'],
 refs:[
  {t:'Gornik HL, et al. 2024 ACC/AHA multisociety guideline for the management of lower extremity peripheral artery disease. Circulation. 2024.',q:'2024 ACC AHA guideline lower extremity peripheral artery disease'},
  {t:'Conte MS, et al. Global vascular guidelines on the management of chronic limb-threatening ischemia. J Vasc Surg. 2019.',q:'Global vascular guidelines chronic limb-threatening ischemia 2019'}],
 exam:[{c:'Dor de panturrilha reprodutível ao caminhar e melhora com repouso.',p:'Pular diretamente para arteriografia e cirurgia.',r:'Confirmar doença e iniciar prevenção cardiovascular e exercício estruturado conforme indicação.'},{c:'Pessoa diabética com ferida no pé e índice aparentemente elevado.',p:'Interpretar valor alto como perfusão excelente.',r:'Pensar em incompressibilidade e buscar avaliação distal apropriada.'},{c:'Dor em repouso e lesão trófica em membro com doença arterial.',p:'Aplicar apenas tratamento de claudicação.',r:'Avaliar ameaça ao membro, infecção e possibilidade de revascularização.'},{c:'Paciente com claudicação e insuficiência cardíaca.',p:'Usar cilostazol sem considerar a comorbidade.',r:'Reconhecer a contraindicação e planejar alternativas de tratamento.'}],
 cases:[{title:'Um número tranquilizador pode enganar',data:['Pessoa com diabetes, úlcera no pé e pulsos difíceis de palpar.','O índice tornozelo-braquial é elevado, em contexto de calcificação arterial.'],reasoning:['Artérias rígidas podem não ser comprimidas adequadamente pelo manguito.','A lesão e o exame não permitem concluir perfusão normal pelo índice isolado.'],conduct:['Complementar avaliação de perfusão distal e pesquisar infecção e profundidade da ferida.','Discutir possibilidade de revascularização e cuidado do pé em equipe.'],error:'Adiar avaliação vascular porque o índice não foi baixo.'},{title:'Claudicação com prioridade cardiovascular',data:['Pessoa tabagista tem dor de panturrilha ao caminhar, com alívio ao parar.','Não apresenta ferida ou dor isquêmica em repouso.'],reasoning:['O quadro sugere limitação ao exercício por doença arterial estável.','A doença marca risco cardiovascular sistêmico, além do sintoma na perna.'],conduct:['Confirmar diagnóstico e otimizar cessação do tabagismo, exercício estruturado e prevenção cardiovascular.','Considerar revascularização se persistir limitação relevante apesar de tratamento apropriado.'],error:'Tratar somente a lesão anatômica e ignorar risco sistêmico e preferências.'}],
 note:'Diretriz americana de 2024 e diretriz global de isquemia ameaçadora do membro. Conferência online de atualizações das fontes: a confirmar.'
},
'cirvasc_1':{
 updated:'2026-11',
 pretest:['Quais são os seis Ps da isquemia arterial aguda?','Como diferenciar embolia de trombose?','O que define Rutherford IIb?','Qual a complicação após revascularizar isquemia prolongada?',
  'Qual é a diferença entre classificar a viabilidade do membro e identificar a causa da oclusão?',
  'Que situação pode impedir anticoagulação imediata apesar da suspeita de isquemia aguda?'
 ],
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
 ,
  {h:'Tempo, viabilidade e mecanismo são perguntas separadas',p:['A isquemia interrompe o fornecimento de energia a nervo e músculo. A evolução clínica depende do grau de obstrução, colaterais, território e condição anterior. O exame neurológico é decisivo porque perda sensitiva progressiva e déficit motor sugerem ameaça crescente.','Identificar embolia ou trombose orienta o procedimento, mas não deve substituir a classificação de viabilidade. Anticoagulação inicial é habitual quando não há contraindicação, como sangramento ativo relevante; é necessário comunicar o risco e individualizar a decisão com a equipe responsável.']},
  {h:'Diagnósticos que podem imitar ou acompanhar isquemia',table:{head:['Condição','Pista','Cuidado'],rows:[['Trombose venosa maciça','Edema importante e cianose','Pode comprometer secundariamente a circulação do membro'],['Dissecção aórtica com má perfusão','Dor torácica ou dorsal e assimetria de pulsos','Identificar a origem central muda a estratégia'],['Síndrome compartimental','Dor e tensão com déficit progressivo','Pulso pode permanecer presente'],['Déficit neurológico isolado','Distribuição neurológica sem achados vasculares típicos','Examinar circulação e não assumir um único mecanismo']]}},
  {h:'Passos para explicar revascularização e proteção do membro',list:['Avaliar viabilidade e estabilidade geral, instituindo analgesia e suporte.','Considerar anticoagulação após verificar contraindicações relevantes.','Localizar o nível e a causa com exame e imagem que não atrase uma ameaça imediata.','Escolher remoção de êmbolo, tratamento endovascular ou reconstrução conforme a anatomia e a causa.','Reavaliar fluxo, função neurológica e compartimentos; tratar também a fonte embólica ou a doença de base.']},
  {h:'Reperfusão: benefício e risco simultâneos',table:{head:['Alteração','Por que ocorre','O que vigiar'],rows:[['Edema muscular','Lesão de isquemia e aumento de permeabilidade','Tensão e síndrome compartimental'],['Distúrbio eletrolítico e ácido-base','Liberação de conteúdo de células lesadas','Ritmo cardíaco e alterações laboratoriais'],['Lesão renal','Mioglobina e agressão sistêmica','Função renal e diurese no contexto da perfusão'],['Reoclusão','Problema técnico, trombose ou causa persistente','Retorno dos sinais de isquemia']]}}
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
  {q:'Alterações da síndrome de reperfusão?',a:'Hipercalemia, acidose, mioglobinúria com lesão renal e arritmias.'},
  {q:'Por que sensibilidade e força devem ser reavaliadas em série?',a:'A viabilidade pode deteriorar durante o atendimento. A progressão de déficit neurológico muda a urgência e a estratégia mesmo antes de uma nova imagem.'},
  {q:'A ausência de pulso sozinha define irreversibilidade?',a:'Não. Irreversibilidade exige integrar exame sensitivo e motor, rigidez, aspecto e sinais de fluxo. Um membro sem pulso ainda pode ser salvável.'},
  {q:'O que procurar se o membro piora depois de restaurar o fluxo?',a:'Reoclusão, síndrome compartimental e lesão de reperfusão. Pulsos presentes não excluem pressão compartimental elevada.'}
 ],
 practice:['Classifique: idoso com FA, perna fria há 6 horas, parestesia nos dedos, força normal, Doppler arterial ausente e venoso presente.'],
 refs:[
  {t:'Björck M, et al. European Society for Vascular Surgery 2020 clinical practice guidelines on the management of acute limb ischaemia. Eur J Vasc Endovasc Surg. 2020.',q:'ESVS 2020 clinical practice guidelines acute limb ischaemia'},
  {t:'Rutherford RB, et al. Recommended standards for reports dealing with lower extremity ischemia: revised version. J Vasc Surg. 1997.',q:'Rutherford recommended standards lower extremity ischemia revised 1997'}],
 exam:[{c:'Dor e frialdade súbitas com fraqueza nova.',p:'Solicitar uma sequência longa de exames antes de chamar a equipe vascular.',r:'Reconhecer ameaça imediata e organizar revascularização sem atraso evitável.'},{c:'Pessoa com fibrilação atrial e membro contralateral sem sinais de doença.',p:'Atribuir toda oclusão a aterosclerose crônica.',r:'Considerar embolia e investigar a fonte sem retardar o salvamento do membro.'},{c:'Membro anestesiado, rígido e paralisado.',p:'Tentar restaurar fluxo a qualquer custo.',r:'Considerar dano irreversível e risco sistêmico da reperfusão.'},{c:'Membro revascularizado com dor desproporcional e compartimentos tensos.',p:'Desconsiderar síndrome compartimental porque há pulso.',r:'Avaliar e tratar a complicação compartimental com urgência.'}],
 cases:[{title:'A força altera a urgência',data:['Paciente com membro frio, dor e déficit sensitivo que passa a apresentar fraqueza.','A equipe está organizando exames de imagem.'],reasoning:['Déficit motor indica ameaça mais imediata do que dor isolada.','Exames só ajudam se forem compatíveis com o tempo e a estratégia de salvamento.'],conduct:['Acionar equipe vascular e reavaliar viabilidade em série.','Anticoagular quando não houver contraindicação e organizar intervenção adequada sem atraso evitável.'],error:'Aguardar completar investigação etiológica antes de tratar o membro ameaçado.'},{title:'Fluxo restabelecido, vigilância mantida',data:['Após revascularização, o pulso é detectável, mas a perna está tensa e muito dolorosa.','Há piora da dor com movimentação passiva e alteração de função.'],reasoning:['O pulso avalia a circulação macrovascular, não garante pressão tecidual segura.','Isquemia e reperfusão podem produzir edema dentro de compartimentos fechados.'],conduct:['Avaliar síndrome compartimental imediatamente e organizar tratamento cirúrgico quando indicado.','Monitorar repercussões metabólicas e renais da reperfusão.'],error:'Atribuir toda a dor ao pós-operatório porque o pulso voltou.'}],
 note:'Diretriz europeia de isquemia aguda de membro. Conferência online de atualizações das fontes: a confirmar.'
},
'cirvasc_2':{
 updated:'2026-11',
 pretest:['A partir de qual diâmetro se indica correção eletiva do aneurisma de aorta abdominal?','Quem deve ser rastreado?','Qual a diferença entre Stanford A e B?','Qual a primeira droga no controle pressórico da dissecção?',
  'Por que a ausência da tríade clássica não exclui aneurisma roto?',
  'Quais complicações podem transformar uma dissecção descendente em emergência intervencionista?'
 ],
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
 ,
  {h:'Parede dilatada e parede dissecada não são o mesmo problema',p:['No aneurisma, a parede perde resistência e o vaso dilata; o risco depende do conjunto de diâmetro, crescimento, sintomas, forma e características individuais. Na dissecção, sangue separa camadas e pode comprimir o lúmen verdadeiro ou obstruir ramos, causando má perfusão sem rotura livre.','A classificação de Stanford informa envolvimento da aorta ascendente, mas o raciocínio deve acrescentar estabilidade, rotura, tamponamento, insuficiência aórtica e perfusão dos ramos. A falta de diferença de pulsos ou de alargamento do mediastino não exclui síndrome aórtica aguda.']},
  {h:'Dor torácica ou dorsal: diagnósticos em competição',table:{head:['Hipótese','Pistas','Risco de erro'],rows:[['Síndrome aórtica aguda','Dor súbita, déficit de pulso, repercussão neurológica ou visceral','Dar antitrombótico sem considerar dissecção pode agravar sangramento'],['Síndrome coronariana','Quadro clínico, ECG e marcadores no contexto','Dissecção pode comprometer coronária e imitar infarto'],['Tromboembolismo pulmonar','Dispneia e contexto tromboembólico','O tratamento depende de distinguir o mecanismo'],['Causa musculoesquelética','Dor relacionada a movimento sem sinais de gravidade','É diagnóstico contextual, sem ignorar sinais de alarme']]}},
  {h:'Endoleak: organização conceitual',table:{head:['Tipo','Origem do fluxo','Por que importa'],rows:[['I','Falha de vedação proximal ou distal','Comunicação com pressão arterial exige avaliação para correção'],['II','Fluxo retrógrado por ramos do saco','Repercussão no saco orienta seguimento e eventual intervenção'],['III','Falha de união ou do material da endoprótese','Pode expor o saco à pressão e exigir correção'],['IV','Porosidade do material','Interpretação depende do contexto e dispositivo'],['V','Expansão do saco sem vazamento demonstrado','Exige investigação e acompanhamento especializados']]}},
  {h:'Roteiro técnico do reparo aórtico em prova',list:['Definir o problema anatômico e a urgência antes de escolher acesso ou dispositivo.','No reparo endovascular, descrever planejamento das zonas de vedação, vias de acesso e preservação da perfusão dos ramos.','Na cirurgia aberta, explicar controle vascular e substituição do segmento comprometido, com proteção dos órgãos.','No pós-operatório, vigiar perfusão de membros e vísceras, função renal e complicações hemorrágicas.','Manter vigilância específica do método e da doença aórtica remanescente.']},
  {h:'Complicações que precisam ser lembradas',table:{head:['Problema','Pista','Resposta conceitual'],rows:[['Isquemia intestinal','Dor, deterioração clínica ou achados de má perfusão','Investigar rapidamente e controlar a causa'],['Lesão renal','Piora da função após agressão hemodinâmica ou procedimento','Avaliar perfusão, ramos renais e outras causas'],['Isquemia de membro','Dor e alteração de pulso ou perfusão','Reavaliar acesso e reconstrução'],['Endoleak ou crescimento do saco','Achado de vigilância após EVAR','Classificar e decidir seguimento ou intervenção']]}}
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
  {q:'Indicações de TEVAR na tipo B?',a:'Má perfusão, rotura, dor refratária ou expansão rápida.'},
  {q:'O que é endoleak depois de EVAR?',a:'Persistência de fluxo para o saco aneurismático fora da luz planejada da endoprótese. O tipo, a origem e a repercussão no saco orientam vigilância ou reintervenção.'},
  {q:'Por que controle da frequência pode anteceder vasodilatação na síndrome aórtica aguda?',a:'Reduzir a força e a velocidade do estresse pulsátil ajuda a limitar a agressão à parede; vasodilatação isolada pode provocar resposta reflexa indesejada.'},
  {q:'Dissecção descendente sempre recebe apenas tratamento clínico?',a:'Não. Rotura, má perfusão e outras características de complicação ou risco podem exigir intervenção especializada.'}
 ],
 practice:['Escreva a prescrição da primeira hora de uma dissecção tipo B não complicada.'],
 refs:[
  {t:'Wanhainen A, et al. ESVS 2024 clinical practice guidelines on the management of abdominal aorto-iliac artery aneurysms. Eur J Vasc Endovasc Surg. 2024.',q:'ESVS 2024 guidelines abdominal aorto-iliac artery aneurysms'},
  {t:'Isselbacher EM, et al. 2022 ACC/AHA guideline for the diagnosis and management of aortic disease. Circulation. 2022.',q:'2022 ACC AHA guideline diagnosis management aortic disease'},
  {t:'US Preventive Services Task Force. Screening for abdominal aortic aneurysm. JAMA. 2019.',q:'USPSTF screening abdominal aortic aneurysm 2019'}],
 exam:[{c:'Dor abdominal ou dorsal com instabilidade em pessoa com risco de aneurisma.',p:'Esperar a tríade clássica completa ou a massa pulsátil aparecer.',r:'Considerar rotura e organizar diagnóstico e controle definitivo conforme estabilidade.'},{c:'Dissecção envolvendo a aorta ascendente.',p:'Classificar pela localização da dor ou pelo ponto de origem isoladamente.',r:'Reconhecer Stanford A e avaliação cirúrgica emergencial.'},{c:'Dissecção descendente acompanhada de isquemia visceral.',p:'Tratar como tipo B não complicada.',r:'Reconhecer má perfusão e discutir intervenção especializada.'},{c:'Paciente submetido a EVAR acredita estar dispensado de imagens futuras.',p:'Confundir menor agressão inicial com ausência de complicações tardias.',r:'Explicar seguimento da endoprótese e do saco aneurismático.'}],
 cases:[{title:'Tipo B com órgão em risco',data:['Pessoa com dor torácica dorsal e dissecção descendente confirmada.','Surge dor abdominal e evidência de comprometimento da perfusão visceral.'],reasoning:['A localização descendente não torna o quadro benigno.','Má perfusão é uma complicação que muda a estratégia além do controle clínico.'],conduct:['Acionar equipe aórtica e avaliar intervenção apropriada à anatomia e à repercussão.','Manter suporte e controle da agressão hemodinâmica de modo individualizado.'],error:'Manter apenas observação porque o laudo não menciona a aorta ascendente.'},{title:'O seguimento faz parte do EVAR',data:['Paciente após reparo endovascular sente-se bem e quer abandonar os retornos.','Ainda precisa monitorar a endoprótese e o saco aneurismático.'],reasoning:['Complicações tardias podem ocorrer sem sintoma inicial claro.','Endoleak, migração e falha de vedação fazem parte dos riscos específicos do método.'],conduct:['Explicar o plano de vigilância definido pela equipe e pelos achados.','Reavaliar prontamente sintomas novos ou alteração do saco.'],error:'Apresentar EVAR como tratamento sem necessidade de acompanhamento.'}],
 note:'Diretriz europeia de aneurismas de 2024 e diretriz americana de doenças da aorta de 2022. Conferência online de atualizações das fontes: a confirmar.'
},
'cirvasc_3':{
 updated:'2026-11',
 pretest:['O que significa C6 na classificação CEAP?','Qual é o tratamento de primeira linha da safena insuficiente?','Como usar o escore de Wells e o D-dímero na suspeita de TVP?','Quando indicar filtro de veia cava?',
  'Por que compressão de uma úlcera exige avaliar também a circulação arterial?',
  'Qual é a conduta conceitual quando a suspeita de TVP permanece alta e o primeiro exame não confirma?'
 ],
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
 ,
  {h:'Da hipertensão venosa à ferida',p:['Refluxo e obstrução mantêm pressão elevada na microcirculação, favorecendo extravasamento, inflamação e lesão cutânea. A bomba muscular da panturrilha ajuda o retorno; imobilidade e limitação de tornozelo reduzem esse auxílio. O tratamento deve abordar mecanismo e função, não apenas a aparência da veia.','CEAP descreve clínica, etiologia, anatomia e fisiopatologia. O componente clínico isolado não mostra onde está a falha. O duplex permite relacionar refluxo ou obstrução a segmentos específicos; sintomas e repercussão funcional orientam a importância do achado.']},
  {h:'CEAP: além do nome da classe',table:{head:['Componente','O que descreve','Uso no raciocínio'],rows:[['C: clínica','Sinais como edema, alterações cutâneas e úlcera; sintomas podem ser acrescentados','Registrar gravidade aparente e evolução'],['E: etiologia','Origem primária, secundária, congênita ou não identificada','Distinguir doença primária de sequela trombótica e outras causas'],['A: anatomia','Sistemas superficial, profundo e perfurante','Relacionar achado à intervenção possível'],['P: fisiopatologia','Refluxo, obstrução, ambos ou ausência de mecanismo identificado','Evitar tratar refluxo quando o problema dominante é outro']]}},
  {h:'Edema unilateral: não é sempre TVP',table:{head:['Hipótese','Pista','Como separar'],rows:[['TVP','Contexto trombótico e edema compatível','Probabilidade clínica e imagem apropriada'],['Celulite','Inflamação cutânea e porta de entrada','Exame e repercussão infecciosa'],['Ruptura de cisto poplíteo','Dor e edema na panturrilha','Imagem diferencia a causa'],['Linfedema ou doença venosa crônica','Evolução e achados de pele característicos','Avaliar mecanismos crônicos e causas associadas']]}},
  {h:'Técnica e estratégia venosa em passos de prova',list:['Mapear a fonte do refluxo e avaliar o sistema profundo, sem decidir apenas pelo trajeto visível das varizes.','Verificar doença arterial associada e contraindicações ou limitações da compressão.','Explicar opções de ablação, escleroterapia e cirurgia conforme a anatomia e os recursos.','Na TVP, definir território, risco hemorrágico, contexto desencadeante e estratégia de anticoagulação individualizada.','Planejar retorno e sinais de alarme: dispneia, dor torácica, sangramento e piora intensa do membro.']},
  {h:'Complicações e seguimento',table:{head:['Situação','Preocupação','Princípio de manejo'],rows:[['Dispneia ou dor torácica em TVP','Possível embolia pulmonar','Avaliação imediata conforme estabilidade'],['Sangramento durante anticoagulação','Gravidade, fonte e exposição ao fármaco','Avaliar e ajustar tratamento por risco individual'],['Edema e alterações de pele depois de TVP','Síndrome pós-trombótica','Cuidado funcional, venoso e da pele'],['Recidiva de varizes ou úlcera','Refluxo residual, obstrução ou adesão limitada','Reavaliar anatomia e mecanismo dominante']]}}
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
  {q:'Duração mínima da anticoagulação na TVP provocada?',a:'3 meses.'},
  {q:'O que causa a hipertensão venosa crônica?',a:'Refluxo, obstrução ou falha da bomba muscular podem elevar a pressão venosa e favorecer edema, inflamação de pele e ulceração.'},
  {q:'Meia e ablação tratam exatamente o mesmo mecanismo?',a:'Não. Compressão e ativação da bomba muscular ajudam a controlar a hipertensão venosa; ablação trata refluxo em veias selecionadas. Obstrução e doença arterial associada precisam ser consideradas.'},
  {q:'Por que um ultrassom negativo não encerra todos os casos suspeitos de TVP?',a:'A interpretação depende da probabilidade clínica, do território e da técnica. Se a suspeita permanece, pode ser necessário exame seriado ou investigação complementar conforme protocolo.'}
 ],
 practice:['Diferencie úlcera venosa e arterial em cinco características.'],
 refs:[
  {t:'De Maeseneer MG, et al. European Society for Vascular Surgery 2022 clinical practice guidelines on the management of chronic venous disease of the lower limbs. Eur J Vasc Endovasc Surg. 2022.',q:'ESVS 2022 clinical practice guidelines chronic venous disease lower limbs'},
  {t:'Kakkos SK, et al. European Society for Vascular Surgery 2021 clinical practice guidelines on the management of venous thrombosis. Eur J Vasc Endovasc Surg. 2021.',q:'ESVS 2021 clinical practice guidelines management of venous thrombosis'},
  {t:'Gohel MS, et al. A randomized trial of early endovenous ablation in venous ulceration (EVRA). N Engl J Med. 2018.',q:'EVRA early endovenous ablation venous ulceration NEJM 2018'}],
 exam:[{c:'Úlcera próxima ao maléolo com edema e pigmentação.',p:'Prescrever compressão sem avaliar perfusão arterial.',r:'Reconhecer componente venoso e pesquisar doença mista antes de definir compressão.'},{c:'Probabilidade clínica alta de TVP.',p:'Pedir D-dímero como única etapa para descartar.',r:'Priorizar investigação por imagem e integrar resultado à probabilidade clínica.'},{c:'Contraindicação relevante à anticoagulação com TVP proximal aguda.',p:'Usar filtro como tratamento rotineiro de toda trombose.',r:'Discutir indicação específica e plano de reavaliação; filtro não dissolve trombo.'},{c:'Varizes com refluxo documentado e sintomas.',p:'Escolher a técnica somente pelo aspecto visível das veias.',r:'Relacionar anatomia do refluxo, sintomas, risco e alternativas de tratamento.'}],
 cases:[{title:'Úlcera pode ser mista',data:['Pessoa com edema, pigmentação na perna e úlcera próxima ao maléolo.','Também apresenta extremidade fria e pulsos distais reduzidos.'],reasoning:['O aspecto venoso não exclui doença arterial associada.','Compressão sem avaliar perfusão pode ser inadequada em um membro com isquemia relevante.'],conduct:['Avaliar perfusão arterial e anatomia venosa antes de definir a estratégia.','Combinar cuidado local, medidas venosas e tratamento arterial conforme a contribuição de cada mecanismo.'],error:'Tratar a localização da úlcera como prova suficiente de doença venosa isolada.'},{title:'Imagem negativa com suspeita persistente',data:['Paciente com forte contexto de risco trombótico e edema unilateral.','O primeiro exame não demonstra TVP no território avaliado.'],reasoning:['Um teste deve ser interpretado junto com probabilidade clínica e limitações técnicas.','Trombose em outro território ou evolução ainda não demonstrada podem exigir nova abordagem.'],conduct:['Reavaliar diagnóstico, território estudado e necessidade de exame seriado ou complementar segundo protocolo.','Pesquisar causas alternativas sem declarar exclusão definitiva de forma automática.'],error:'Usar um resultado isolado para negar toda a hipótese, mesmo com discrepância clínica.'}],
 note:'Diretrizes europeias de doença venosa. Conferência online de atualizações das fontes: a confirmar.'
}
});
