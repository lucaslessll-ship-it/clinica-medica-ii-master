/* Estudo aprofundado · Doenças da tireoide I e II (P1). Texto original; referências ao final de cada aula. */
LessonDeep.add({
'p1tir1_0':{
 updated:'2026-11',
 pretest:['Qual a diferença entre tireotoxicose e hipertireoidismo?','Como a captação de iodo separa as causas?','Qual o efeito adverso mais temido das tionamidas e como orientar o paciente?','Qual antitireoidiano usar no primeiro trimestre da gestação?'],
 sections:[
  {h:'Dois conceitos',p:[
   'Tireotoxicose é o excesso de hormônio tireoidiano agindo nos tecidos, qualquer que seja a origem. Hipertireoidismo é a tireotoxicose causada por produção aumentada pela glândula. A distinção importa: tionamidas bloqueiam a síntese e só servem quando a glândula está produzindo demais. Na tireoidite, em que o hormônio já pronto vaza, elas não ajudam.']},
  {h:'Causas e como separá-las',table:{head:['Causa','Captação de iodo','Pistas'],rows:[
   ['Doença de Graves','Alta e difusa','Anticorpo antirreceptor de TSH (TRAb), bócio difuso com sopro, orbitopatia, mixedema pré-tibial'],
   ['Bócio multinodular tóxico','Alta e heterogênea','Idoso, bócio nodular antigo'],
   ['Adenoma tóxico','Nódulo quente com supressão do restante','Nódulo único'],
   ['Tireoidites','Baixa','Dor cervical (subaguda) ou pós-parto; fase transitória'],
   ['Excesso de iodo, amiodarona','Baixa','História de contraste ou do fármaco'],
   ['Hormônio exógeno','Baixa','Tireoglobulina baixa'],
   ['Tumor produtor de TSH','Alta','TSH não suprimido com T4 livre alto']]},
   after:'Na prática: TSH suprimido com T4 livre e T3 elevados confirmam. TRAb positivo fecha doença de Graves sem necessidade de cintilografia. A cintilografia é usada quando o TRAb é negativo ou há nódulos.'},
  {h:'Clínica',list:[
   'Perda de peso com apetite preservado, intolerância ao calor, sudorese, tremor fino, palpitações, diarreia, ansiedade, insônia.',
   'Fibrilação atrial, hipertensão sistólica, insuficiência cardíaca de alto débito.',
   'Fraqueza proximal, osteoporose, irregularidade menstrual.',
   'Idoso: forma apática, com perda de peso, fibrilação atrial e fraqueza, sem os sinais adrenérgicos.',
   'Específicos de Graves: orbitopatia (retração palpebral, proptose, diplopia), dermopatia e acropaquia.']},
  {h:'Tratamento da doença de Graves',table:{head:['Opção','Vantagens','Limites'],rows:[
   ['Tionamida (metimazol)','Chance de remissão sem destruir a glândula; primeira escolha na maioria','12 a 18 meses de uso; recidiva em cerca de metade; efeitos adversos'],
   ['Iodo radioativo','Definitivo, simples','Hipotireoidismo permanente; contraindicado na gestação e na amamentação; pode piorar orbitopatia ativa'],
   ['Tireoidectomia','Definitiva e rápida','Risco de hipoparatireoidismo e de lesão do nervo laríngeo recorrente; exige preparo']]},
   list:[
   '<strong>Betabloqueador</strong> para sintomas em todos, desde o início.',
   '<strong>Metimazol</strong> é a tionamida de escolha: dose única diária e menor toxicidade hepática. Propiltiouracil fica para o primeiro trimestre da gestação e para a crise tireotóxica.',
   'Reavaliar T4 livre e T3 em 4 a 6 semanas; o TSH demora meses para sair da supressão.',
   'Cirurgia é preferida em bócio volumoso ou compressivo, nódulo suspeito, orbitopatia grave e quando se deseja gestação em curto prazo.',
   'Bócio multinodular tóxico e adenoma tóxico não entram em remissão com tionamida: o tratamento definitivo é iodo radioativo ou cirurgia.']},
  {h:'Efeitos adversos das tionamidas',list:[
   'Comuns: prurido, exantema, artralgia.',
   '<strong>Agranulocitose:</strong> rara e grave. Orientar por escrito: diante de febre ou dor de garganta, suspender o remédio e fazer hemograma no mesmo dia.',
   '<strong>Hepatotoxicidade:</strong> hepatite, por vezes fulminante, com propiltiouracil; colestase com metimazol.',
   'Metimazol no primeiro trimestre associa-se a malformações (aplasia cutis, atresia de coanas).',
   'Vasculite associada ao ANCA com propiltiouracil.']},
  {h:'Situações especiais',list:[
   '<strong>Gestação:</strong> propiltiouracil no primeiro trimestre e metimazol depois. Usar a menor dose que mantenha o T4 livre no limite superior do normal. Dosar TRAb no fim da gestação, pois atravessa a placenta.',
   '<strong>Orbitopatia:</strong> parar de fumar é a medida mais importante. Formas moderadas a graves e ativas: corticoide intravenoso. Evitar iodo radioativo na doença ocular ativa ou associar corticoide.',
   '<strong>Hipertireoidismo subclínico</strong> (TSH baixo com hormônios normais): tratar quando o TSH está persistentemente abaixo de 0,1 em pessoas de 65 anos ou mais, cardiopatas, com osteoporose ou sintomas.']}
 ],
 flow:{title:'TSH suprimido',nodes:[
  {k:'start',t:'TSH baixo com sintomas de tireotoxicose'},
  {k:'do',t:'T4 livre e T3; betabloqueador se sintomático'},
  {k:'ask',t:'Hormônios elevados?',yes:'Tireotoxicose manifesta',no:'Subclínica: repetir; tratar conforme idade e risco'},
  {k:'ask',t:'Orbitopatia ou bócio difuso com TRAb positivo?',yes:'Doença de Graves',no:'Cintilografia ou captação'},
  {k:'ask',t:'Captação baixa?',yes:'Tireoidite, iodo ou hormônio exógeno: sem tionamida',no:'Nodular: bócio multinodular tóxico ou adenoma'},
  {k:'ask',t:'Graves confirmado?',yes:'Metimazol por 12 a 18 meses; iodo ou cirurgia se recidivar ou por preferência',no:'Nodular tóxico: iodo radioativo ou cirurgia'},
  {k:'end',t:'Orientar sobre febre e dor de garganta; acompanhar T4 livre e T3'}]},
 reasoning:[
  'Captação alta significa produção; captação baixa significa vazamento ou origem externa.',
  'Idoso com fibrilação atrial nova: peça TSH.',
  'TSH segue suprimido por semanas após normalizar os hormônios: ajuste a dose pelo T4 livre.',
  'Dor na tireoide com tireotoxicose aponta para tireoidite subaguda, não para Graves.',
  'Mulher com desejo de engravidar: discuta o tratamento definitivo antes.'],
 mnemonics:[
  {n:'Graves = TRAb + olho + difuso',t:'As três marcas.'},
  {n:'PTU no Primeiro Trimestre',t:'Propiltiouracil só nessa fase e na crise.'},
  {n:'Febre e garganta: parar e hemograma',t:'Regra da agranulocitose.'},
  {n:'Quente produz, frio vaza',t:'Leitura da captação.'}],
 pitfalls:[
  'Dar tionamida para tireoidite.',
  'Ajustar a dose pelo TSH nas primeiras semanas.',
  'Não orientar sobre agranulocitose.',
  'Usar metimazol no primeiro trimestre.',
  'Indicar iodo radioativo em orbitopatia ativa moderada a grave sem proteção.',
  'Esperar remissão de bócio nodular tóxico com tionamida.'],
 recall:[
  {q:'Mulher de 30 anos, perda de peso, tremor, bócio difuso, proptose, TSH indetectável, T4 livre alto. Qual exame confirma e qual o tratamento inicial?',a:'TRAb positivo confirma doença de Graves. Betabloqueador e metimazol por 12 a 18 meses, com orientação sobre agranulocitose e sobre tabagismo.'},
  {q:'Paciente em metimazol há 3 semanas apresenta febre e odinofagia. Conduta?',a:'Suspender o fármaco e fazer hemograma imediatamente pela suspeita de agranulocitose. Se confirmada, internar, antibiótico de amplo espectro e não reintroduzir tionamida.'},
  {q:'Tireotoxicose com captação baixa e dor cervical. Diagnóstico e tratamento?',a:'Tireoidite subaguda. Betabloqueador e anti-inflamatório ou corticoide; tionamidas não têm papel.'},
  {q:'Gestante de 8 semanas com doença de Graves em uso de metimazol. O que fazer?',a:'Trocar por propiltiouracil durante o primeiro trimestre, na menor dose eficaz, e voltar ao metimazol a partir do segundo.'},
  {q:'Quando tratar o hipertireoidismo subclínico?',a:'Com TSH persistentemente abaixo de 0,1 em pessoas de 65 anos ou mais, cardiopatas, com osteoporose ou sintomas.'}],
 practice:[
  'Entregue por escrito a orientação sobre febre e dor de garganta.',
  'Pergunte sobre tabagismo e explique o efeito sobre os olhos.',
  'Antes de iodo radioativo, confirme que a paciente não está grávida.'],
 refs:[
  {t:'Ross DS, et al. 2016 American Thyroid Association guidelines for diagnosis and management of hyperthyroidism and other causes of thyrotoxicosis. Thyroid. 2016.',q:'2016 American Thyroid Association Guidelines Diagnosis Management Hyperthyroidism other causes of Thyrotoxicosis Ross'},
  {t:'Kahaly GJ, et al. 2018 European Thyroid Association guideline for the management of Graves hyperthyroidism. Eur Thyroid J. 2018.',q:'2018 European Thyroid Association Guideline Management of Graves Hyperthyroidism Kahaly'}],
 note:'Síntese das diretrizes norte-americana e europeia.'
},
'p1tir1_1':{
 updated:'2026-11',
 pretest:['Qual a dose plena de levotiroxina por quilo e em quem começar com menos?','Com que TSH tratar o hipotireoidismo subclínico?','O que fazer com a dose de levotiroxina ao confirmar a gestação?','No coma mixedematoso, o que se dá antes do hormônio tireoidiano?'],
 sections:[
  {h:'Classificar pelo TSH',table:{head:['Tipo','TSH','T4 livre','Causas'],rows:[
   ['Primário manifesto','Alto','Baixo','Tireoidite de Hashimoto, pós-iodo ou cirurgia, fármacos (amiodarona, lítio, imunoterapia)'],
   ['Primário subclínico','Alto','Normal','As mesmas, em fase inicial'],
   ['Central','Baixo ou inapropriadamente normal','Baixo','Doença de hipófise ou hipotálamo']]},
   after:'No hipotireoidismo central, o TSH não serve para acompanhar: usa-se o T4 livre. E é obrigatório avaliar o eixo adrenal antes de repor.'},
  {h:'Clínica e laboratório geral',list:[
   'Fadiga, intolerância ao frio, ganho de peso discreto, constipação, pele seca, queda de cabelo, rouquidão, menorragia, lentidão de raciocínio, humor deprimido.',
   'Bradicardia, hipertensão diastólica, reflexos com relaxamento lento, edema de face, derrame pericárdico, síndrome do túnel do carpo.',
   'Exames: colesterol LDL alto, CK alta, hiponatremia, anemia, prolactina discretamente alta.',
   'Anti-TPO positivo aponta para origem autoimune e prevê progressão.']},
  {h:'Tratamento do manifesto',list:[
   'Levotiroxina, cerca de 1,6 micrograma/kg por dia em adultos jovens e sem cardiopatia.',
   'Idosos e coronariopatas: iniciar com 12,5 a 25 microgramas e aumentar devagar, pelo risco de isquemia e arritmia.',
   'Tomar em jejum, com água, 30 a 60 minutos antes do café, ou ao deitar, longe da última refeição.',
   'Separar por 4 horas de cálcio, ferro, antiácidos e resinas. Inibidores de bomba de prótons e café reduzem a absorção.',
   'Dosar TSH 6 a 8 semanas após cada ajuste; depois de estável, a cada 6 a 12 meses.',
   'TSH que não normaliza: perguntar sobre adesão e forma de tomar antes de aumentar a dose; pensar em doença celíaca e gastrite atrófica.']},
  {h:'Hipotireoidismo subclínico',list:[
   'Repetir o exame em 2 a 3 meses: parte dos casos normaliza.',
   'Tratar com TSH de 10 mUI/L ou mais.',
   'Entre o limite superior e 10: considerar em pessoas mais jovens com sintomas, anti-TPO positivo, bócio, desejo de gestação ou risco cardiovascular.',
   'Idosos com TSH abaixo de 10: não tratar. No estudo TRUST, a levotiroxina não melhorou sintomas em idosos. O TSH sobe naturalmente com a idade.',
   'Se optar por tratar por sintomas, reavaliar em poucos meses e suspender se não houver benefício.']},
  {h:'Gestação',list:[
   'O feto depende do hormônio materno no primeiro trimestre, e a necessidade materna aumenta.',
   'Mulher já em tratamento: ao confirmar a gravidez, aumentar a dose em cerca de 25 a 30% (na prática, dois comprimidos a mais por semana) e dosar TSH a cada 4 semanas até a metade da gestação.',
   'Hipotireoidismo manifesto na gestação: tratar sempre, em dose plena.',
   'Meta: TSH na metade inferior da referência para o trimestre.',
   'Depois do parto, voltar à dose anterior e dosar TSH em 6 semanas.']},
  {h:'Coma mixedematoso',p:[
   'Descompensação grave, em geral em idosa com hipotireoidismo não tratado, após infecção, frio, cirurgia ou sedativo. Apesar do nome, coma não é obrigatório.'],
   list:[
   'Hipotermia, bradicardia, hipotensão, hipoventilação com retenção de gás carbônico, hiponatremia, hipoglicemia, rebaixamento de consciência.',
   'Tratamento em terapia intensiva, sem esperar os exames.',
   '<strong>Hidrocortisona intravenosa antes do hormônio tireoidiano,</strong> pela possibilidade de insuficiência adrenal associada.',
   'Levotiroxina intravenosa em dose de ataque, seguida de dose diária; liotironina pode ser associada.',
   'Aquecimento passivo (o ativo causa vasodilatação e choque), suporte ventilatório, correção cuidadosa do sódio e tratamento do fator desencadeante.']}
 ],
 flow:{title:'TSH elevado',nodes:[
  {k:'start',t:'TSH acima da referência'},
  {k:'do',t:'Dosar T4 livre e anti-TPO'},
  {k:'ask',t:'T4 livre baixo?',yes:'Hipotireoidismo manifesto: levotiroxina',no:'Subclínico: repetir em 2 a 3 meses'},
  {k:'ask',t:'Idoso ou coronariopata?',yes:'Iniciar com dose baixa e subir devagar',no:'Dose plena por peso'},
  {k:'ask',t:'Subclínico confirmado com TSH de 10 ou mais, gestante ou planejando gestação?',yes:'Tratar',no:'Individualizar; em idoso com TSH abaixo de 10, observar'},
  {k:'do',t:'TSH em 6 a 8 semanas; rever como o paciente toma o comprimido'},
  {k:'end',t:'Meta de TSH normal; reavaliar a cada 6 a 12 meses'}]},
 reasoning:[
  'TSH baixo com T4 livre baixo não é hipertireoidismo: é doença central.',
  'TSH que oscila sem mudança de dose costuma ser problema de adesão ou de absorção.',
  'Colesterol alto ou CK alta sem explicação: peça TSH.',
  'Idosa hipotérmica, bradicárdica e sonolenta no inverno: coma mixedematoso.',
  'Toda mulher em levotiroxina deve saber o que fazer ao engravidar.'],
 mnemonics:[
  {n:'1,6 por quilo',t:'Dose plena de levotiroxina.'},
  {n:'TSH 10: trata',t:'Limiar do subclínico.'},
  {n:'Grávida: mais 2 por semana',t:'Aumento de dose ao confirmar a gestação.'},
  {n:'Cortisol antes do T4',t:'Ordem no coma mixedematoso e no hipopituitarismo.'}],
 pitfalls:[
  'Iniciar dose plena em idoso coronariopata.',
  'Dosar TSH antes de 6 semanas do ajuste.',
  'Tratar idoso com TSH de 6 e sem sintomas.',
  'Acompanhar hipotireoidismo central pelo TSH.',
  'Tomar levotiroxina com café, cálcio ou ferro.',
  'Dar hormônio tireoidiano antes do corticoide no coma mixedematoso.'],
 recall:[
  {q:'Mulher de 35 anos, TSH de 28, T4 livre baixo, anti-TPO positivo, sem cardiopatia, 60 kg. Como iniciar?',a:'Levotiroxina em dose plena, cerca de 100 microgramas por dia, em jejum, com TSH em 6 a 8 semanas.'},
  {q:'Homem de 78 anos, assintomático, TSH de 7,2 confirmado, T4 livre normal. Conduta?',a:'Não tratar. Acompanhar com TSH periódico; o tratamento não mostrou benefício nessa faixa.'},
  {q:'Paciente em levotiroxina estável descobre gravidez de 5 semanas. O que orientar?',a:'Aumentar a dose em cerca de 25 a 30%, tomando dois comprimidos adicionais por semana, e dosar TSH a cada 4 semanas.'},
  {q:'TSH segue alto apesar de dose crescente. O que investigar?',a:'Adesão, horário e forma de tomar, fármacos que reduzem a absorção (cálcio, ferro, inibidor de bomba de prótons), doença celíaca e gastrite atrófica.'},
  {q:'Qual a sequência de tratamento no coma mixedematoso?',a:'Suporte intensivo, hidrocortisona intravenosa, levotiroxina intravenosa em dose de ataque, aquecimento passivo e tratamento do desencadeante.'}],
 practice:[
  'Pergunte exatamente como e quando o paciente toma o comprimido.',
  'Evite trocas frequentes de marca; se trocar, repita o TSH.',
  'Anote a meta de TSH no prontuário.'],
 refs:[
  {t:'Jonklaas J, et al. Guidelines for the treatment of hypothyroidism: prepared by the American Thyroid Association task force on thyroid hormone replacement. Thyroid. 2014.',q:'Guidelines for the treatment of hypothyroidism American Thyroid Association task force Jonklaas 2014'},
  {t:'Stott DJ, et al. Thyroid hormone therapy for older adults with subclinical hypothyroidism (TRUST). N Engl J Med. 2017.',q:'Thyroid Hormone Therapy for Older Adults with Subclinical Hypothyroidism Stott 2017'},
  {t:'Alexander EK, et al. 2017 guidelines of the American Thyroid Association for the diagnosis and management of thyroid disease during pregnancy and the postpartum. Thyroid. 2017.',q:'2017 Guidelines American Thyroid Association Thyroid Disease During Pregnancy and the Postpartum Alexander'}],
 note:'Síntese das diretrizes norte-americanas e do estudo TRUST.'
},
'p1tir1_2':{
 updated:'2026-11',
 pretest:['Qual tireoidite causa dor cervical intensa com VHS muito alta?','Por que as tionamidas não funcionam na fase tireotóxica das tireoidites?','Como diferenciar tireoidite pós-parto de doença de Graves?','Que fármacos causam tireoidite?'],
 sections:[
  {h:'Mecanismo comum',p:[
   'Tireoidite é inflamação da glândula. Quando os folículos se rompem, o hormônio já armazenado cai na circulação e causa tireotoxicose transitória. Como a glândula está lesada e não capta iodo, a captação é baixa. Esgotado o estoque, vem uma fase de hipotireoidismo, e depois, na maioria, a recuperação. Esse curso em três fases é a assinatura das tireoidites destrutivas.']},
  {h:'Com dor ou sem dor',table:{head:['Tipo','Dor','Causa','Curso','Tratamento'],rows:[
   ['Subaguda granulomatosa (de Quervain)','Intensa, irradia para mandíbula e ouvido','Pós-viral','Trifásico em meses; VHS muito alta, febre','Anti-inflamatório; prednisona se intensa; betabloqueador'],
   ['Supurativa','Intensa, com sinais flogísticos','Bacteriana; abscesso','Função em geral normal','Antibiótico e drenagem'],
   ['Indolor (silenciosa)','Não','Autoimune','Trifásico','Betabloqueador; levotiroxina se sintomático na fase baixa'],
   ['Pós-parto','Não','Autoimune, no primeiro ano após o parto','Trifásico ou só uma fase','Como a indolor; seguimento anual'],
   ['Hashimoto','Não','Autoimune crônica','Hipotireoidismo progressivo','Levotiroxina'],
   ['Induzida por fármacos','Geralmente não','Amiodarona, lítio, interferon, imunoterapia, inibidores de tirosina quinase','Variável','Conforme a fase'],
   ['Riedel','Não; glândula pétrea','Fibrose, relacionada à IgG4','Compressão cervical','Corticoide; cirurgia']]}},
  {h:'Tireoidite subaguda em detalhe',list:[
   'Semanas após infecção de vias aéreas: dor na região anterior do pescoço, que piora ao engolir e migra de um lobo ao outro, febre e mal-estar.',
   'Tireoide muito dolorosa à palpação.',
   'VHS e PCR muito elevadas; TSH suprimido e T4 livre alto na fase inicial; captação baixa; anticorpos em geral negativos.',
   'Tratamento sintomático: anti-inflamatório, prednisona nos casos intensos, com redução lenta para evitar recaída, e betabloqueador para os sintomas.',
   'Hipotireoidismo permanente em uma minoria.']},
  {h:'Tireoidite pós-parto',list:[
   'Ocorre em parcela relevante das puérperas, mais naquelas com anti-TPO positivo ou diabetes tipo 1.',
   'Fase tireotóxica de 1 a 4 meses após o parto, em geral leve; fase de hipotireoidismo entre 4 e 8 meses.',
   'Diferenciar de doença de Graves: no Graves há TRAb positivo, orbitopatia, bócio com sopro e sintomas mais intensos e duradouros.',
   'Fase tireotóxica: betabloqueador se sintomática. Fase de hipotireoidismo: levotiroxina se sintomática, se amamentando com TSH muito alto ou se deseja nova gestação.',
   'Risco de hipotireoidismo permanente nos anos seguintes: dosar TSH todo ano.',
   'Sintomas costumam ser atribuídos a cansaço ou depressão pós-parto: lembrar de pedir TSH.']},
  {h:'Como reconhecer a tireotoxicose por destruição',list:[
   'Captação de iodo baixa.',
   'T4 mais elevado que o T3 em proporção, ao contrário do Graves.',
   'Tireoglobulina alta (baixa no uso de hormônio exógeno).',
   'TRAb negativo.',
   'Curso autolimitado em semanas.',
   'Tionamidas não têm efeito, porque não há síntese aumentada.']}
 ],
 flow:{title:'Tireotoxicose de início recente',nodes:[
  {k:'start',t:'TSH suprimido com T4 livre elevado'},
  {k:'ask',t:'Dor cervical anterior com febre e VHS alta?',yes:'Tireoidite subaguda: anti-inflamatório ou corticoide, betabloqueador',no:'Seguir'},
  {k:'ask',t:'Parto nos últimos 12 meses?',yes:'Tireoidite pós-parto provável: dosar TRAb para excluir Graves',no:'Seguir'},
  {k:'ask',t:'Usa amiodarona, lítio, interferon ou imunoterapia?',yes:'Tireoidite induzida por fármaco: discutir com o prescritor',no:'Seguir'},
  {k:'ask',t:'TRAb positivo ou captação alta?',yes:'Hipertireoidismo verdadeiro: tionamida',no:'Tireoidite destrutiva: só sintomáticos'},
  {k:'do',t:'Repetir função tireoidiana a cada 4 a 8 semanas'},
  {k:'end',t:'Tratar o hipotireoidismo se sintomático e acompanhar a recuperação'}]},
 reasoning:[
  'Pescoço doloroso com tireotoxicose: subaguda.',
  'Tireotoxicose leve no puerpério que some sozinha: pós-parto.',
  'Se a captação é baixa, não há o que bloquear.',
  'Hipotireoidismo após fase tireotóxica não é falha de tratamento: é a evolução natural.',
  'Paciente em imunoterapia com cansaço: TSH e cortisol.'],
 mnemonics:[
  {n:'Tri-fásica: Tireotoxicose, Tireoide baixa, Tudo normal',t:'O curso das tireoidites destrutivas.'},
  {n:'Quervain Queima',t:'A subaguda é a que dói.'},
  {n:'ALI-I',t:'Amiodarona, Lítio, Interferon e Imunoterapia.'},
  {n:'Captação baixa, tionamida não',t:'Regra terapêutica.'}],
 pitfalls:[
  'Prescrever metimazol na tireoidite.',
  'Confundir tireoidite subaguda com faringite e dar antibiótico.',
  'Tratar para sempre um hipotireoidismo que seria transitório, sem tentar retirar.',
  'Não pedir TSH em puérpera com fadiga e humor deprimido.',
  'Esquecer o seguimento anual após tireoidite pós-parto.',
  'Reduzir o corticoide rápido demais na subaguda.'],
 recall:[
  {q:'Mulher de 40 anos, dor cervical irradiada para o ouvido após resfriado, febre, VHS de 90, TSH suprimido. Diagnóstico, exame que confirma e tratamento?',a:'Tireoidite subaguda granulomatosa. Captação de iodo baixa. Anti-inflamatório ou prednisona e betabloqueador; sem tionamida.'},
  {q:'Puérpera de 3 meses com palpitações, TSH baixo, T4 livre pouco elevado, sem bócio nem alteração ocular. Como diferenciar de Graves?',a:'TRAb negativo, sintomas leves e resolução espontânea favorecem tireoidite pós-parto. Graves tem TRAb positivo e pode ter orbitopatia e sopro.'},
  {q:'O que esperar nos meses seguintes à fase tireotóxica?',a:'Fase de hipotireoidismo, em geral transitória, seguida de recuperação. Uma parte evolui com hipotireoidismo permanente.'},
  {q:'Por que a tireoglobulina ajuda a identificar uso de hormônio exógeno?',a:'Porque está baixa quando o hormônio vem de fora e alta quando há destruição da glândula.'},
  {q:'Qual tireoidite deixa a glândula endurecida e causa compressão?',a:'Tireoidite de Riedel.'}],
 practice:[
  'Palpe a tireoide de todo paciente com dor de garganta que não melhora.',
  'Peça TSH na consulta de puerpério de mulheres com anti-TPO positivo ou diabetes tipo 1.',
  'Marque no prontuário a data prevista para tentar suspender a levotiroxina.'],
 refs:[
  {t:'Pearce EN, Farwell AP, Braverman LE. Thyroiditis. N Engl J Med. 2003.',q:'Pearce Farwell Braverman Thyroiditis N Engl J Med 2003'},
  {t:'Ross DS, et al. 2016 American Thyroid Association guidelines for diagnosis and management of hyperthyroidism and other causes of thyrotoxicosis. Thyroid. 2016.',q:'2016 American Thyroid Association Guidelines Diagnosis Management Hyperthyroidism other causes of Thyrotoxicosis Ross'},
  {t:'Alexander EK, et al. 2017 guidelines of the American Thyroid Association for the diagnosis and management of thyroid disease during pregnancy and the postpartum. Thyroid. 2017.',q:'2017 Guidelines American Thyroid Association Thyroid Disease During Pregnancy and the Postpartum Alexander'}],
 note:'Síntese de revisão e diretrizes norte-americanas.'
},
'p1tir2_0':{
 updated:'2026-11',
 pretest:['Qual o primeiro exame diante de um nódulo de tireoide?','Nódulo com TSH baixo: o que pedir antes de pensar em punção?','Cite quatro características ultrassonográficas suspeitas.','O que fazer com citologia Bethesda III?'],
 sections:[
  {h:'O problema',p:[
   'Nódulos são muito comuns: o ultrassom os encontra em grande parte dos adultos. A maioria é benigna, e a maioria dos cânceres encontrados é de baixo risco. O objetivo da avaliação é achar os poucos nódulos que importam sem puncionar e operar os demais.']},
  {h:'Passo 1: TSH',list:[
   'TSH baixo: pedir cintilografia. Nódulo hipercaptante (quente) quase nunca é maligno e não precisa de punção; trata-se o hipertireoidismo.',
   'TSH normal ou alto: seguir para a estratificação por ultrassom.',
   'História que aumenta o risco: irradiação de cabeça e pescoço na infância, parente de primeiro grau com câncer de tireoide, síndromes genéticas, crescimento rápido, rouquidão, nódulo fixo, linfonodo cervical.']},
  {h:'Passo 2: ultrassom',p:[
   'O ultrassom define quem puncionar. Características suspeitas:'],
   list:[
   'Nódulo sólido e hipoecoico, sobretudo muito hipoecoico.',
   'Microcalcificações (focos ecogênicos puntiformes).',
   'Margens irregulares ou lobuladas; extensão para fora da tireoide.',
   'Mais alto do que largo no corte transversal.',
   'Linfonodo cervical suspeito.'],
   after:'Aspectos tranquilizadores: cisto puro, aspecto espongiforme, artefato em cauda de cometa.'},
  {h:'TI-RADS do colégio americano de radiologia',table:{head:['Categoria','Pontos','Puncionar se','Acompanhar se'],rows:[
   ['TR1 benigno','0','Não puncionar','Não precisa'],
   ['TR2 não suspeito','2','Não puncionar','Não precisa'],
   ['TR3 pouco suspeito','3','2,5 cm ou mais','1,5 cm ou mais'],
   ['TR4 moderadamente suspeito','4 a 6','1,5 cm ou mais','1,0 cm ou mais'],
   ['TR5 muito suspeito','7 ou mais','1,0 cm ou mais','0,5 cm ou mais']]},
   after:'Os pontos somam composição, ecogenicidade, forma, margem e focos ecogênicos. Quanto mais suspeito, menor o tamanho que indica punção.'},
  {h:'Passo 3: citologia pelo sistema Bethesda',table:{head:['Categoria','Significado','Conduta habitual'],rows:[
   ['I','Não diagnóstica','Repetir a punção guiada por ultrassom'],
   ['II','Benigna','Seguimento clínico e por ultrassom'],
   ['III','Atipia de significado indeterminado','Repetir a punção, teste molecular ou lobectomia diagnóstica'],
   ['IV','Neoplasia folicular','Teste molecular ou lobectomia'],
   ['V','Suspeita de malignidade','Cirurgia'],
   ['VI','Maligna','Cirurgia']]},
   after:'A citologia não diferencia adenoma de carcinoma folicular, porque o diagnóstico depende de invasão de cápsula ou de vasos, só visível na peça cirúrgica. Por isso a categoria IV leva à cirurgia ou ao teste molecular.'},
  {h:'Seguimento',list:[
   'Nódulo benigno: ultrassom em 12 a 24 meses e, se estável, intervalos maiores.',
   'Crescimento significativo ou aparecimento de características suspeitas: nova punção.',
   'Calcitonina não é rotina; pedir na suspeita de carcinoma medular.',
   'Nódulo achado com captação focal em PET: puncionar.',
   'Sintomas compressivos (disfagia, dispneia, rouquidão) pesam a favor de cirurgia, mesmo com citologia benigna.']}
 ],
 flow:{title:'Nódulo de tireoide',nodes:[
  {k:'start',t:'Nódulo palpado ou achado em exame de imagem'},
  {k:'do',t:'TSH e ultrassom de tireoide e cadeias cervicais'},
  {k:'ask',t:'TSH baixo?',yes:'Cintilografia: nódulo quente não se punciona',no:'Seguir'},
  {k:'do',t:'Classificar pelo TI-RADS'},
  {k:'ask',t:'Tamanho atinge o limiar de punção para a categoria?',yes:'Punção aspirativa guiada por ultrassom',no:'Acompanhar conforme a categoria'},
  {k:'ask',t:'Bethesda V ou VI?',yes:'Cirurgia',no:'II: seguir. I: repetir. III e IV: repetir, teste molecular ou lobectomia'},
  {k:'end',t:'Ultrassom de seguimento e reavaliação se houver mudança'}]},
 reasoning:[
  'TSH antes da agulha.',
  'O aspecto ao ultrassom importa mais que o tamanho.',
  'Linfonodo cervical suspeito muda tudo: puncione o linfonodo.',
  'Bethesda IV não é câncer nem benigno: é indefinição que só a histologia resolve.',
  'Nódulo de 6 mm, mesmo suspeito, em geral só se acompanha.'],
 mnemonics:[
  {n:'Sólido, eScuro, Salpicado, eSpiculado, em pé',t:'Sólido, hipoecoico, com microcalcificações, margem irregular e mais alto que largo.'},
  {n:'TR3 2,5; TR4 1,5; TR5 1,0',t:'Limiares de punção.'},
  {n:'Quente não se fura',t:'Nódulo hipercaptante dispensa punção.'},
  {n:'Bethesda: I repete, II segue, V e VI operam',t:'As condutas mais diretas.'}],
 pitfalls:[
  'Puncionar sem dosar TSH.',
  'Puncionar todo nódulo pequeno de baixo risco.',
  'Considerar Bethesda II como garantia absoluta e não acompanhar.',
  'Indicar tireoidectomia total por Bethesda III sem repetir a punção ou testar.',
  'Pedir cintilografia com TSH normal.',
  'Não examinar as cadeias cervicais no ultrassom.'],
 recall:[
  {q:'Mulher de 45 anos, nódulo de 1,8 cm, sólido, hipoecoico, com microcalcificações, TSH normal. Conduta?',a:'Nódulo de alta suspeita (TR5). Punção aspirativa guiada por ultrassom, pois ultrapassa 1,0 cm.'},
  {q:'Homem de 60 anos, nódulo de 2 cm e TSH de 0,05. Próximo exame?',a:'Cintilografia. Se o nódulo for hipercaptante, não precisa de punção; tratar o hipertireoidismo.'},
  {q:'Punção com resultado Bethesda IV. O que explicar ao paciente?',a:'Que a citologia não distingue adenoma de carcinoma folicular; a definição exige teste molecular ou retirada do lobo para exame histológico.'},
  {q:'Nódulo espongiforme de 3 cm, assintomático. Precisa de punção?',a:'Não. Aspecto espongiforme é benigno (TR1).'},
  {q:'Quando pedir calcitonina?',a:'Na suspeita de carcinoma medular: história familiar, neoplasia endócrina múltipla tipo 2, citologia sugestiva.'}],
 practice:[
  'Peça que o laudo traga a categoria TI-RADS e as três medidas.',
  'Explique desde o início que a maioria dos nódulos é benigna.',
  'Guarde as imagens para comparar o crescimento.'],
 refs:[
  {t:'Tessler FN, et al. ACR Thyroid Imaging, Reporting and Data System (TI-RADS): white paper of the ACR TI-RADS committee. J Am Coll Radiol. 2017.',q:'ACR Thyroid Imaging Reporting and Data System TI-RADS White Paper Tessler 2017'},
  {t:'Haugen BR, et al. 2015 American Thyroid Association management guidelines for adult patients with thyroid nodules and differentiated thyroid cancer. Thyroid. 2016.',q:'2015 American Thyroid Association Management Guidelines Thyroid Nodules Differentiated Thyroid Cancer Haugen'},
  {t:'Ali SZ, et al. The 2023 Bethesda System for Reporting Thyroid Cytopathology. Thyroid. 2023.',q:'2023 Bethesda System for Reporting Thyroid Cytopathology Ali'}],
 note:'Limiares do sistema do colégio americano de radiologia. Outros sistemas de classificação usam cortes diferentes.'
},
'p1tir2_1':{
 updated:'2026-11',
 pretest:['O diagnóstico de crise tireotóxica é clínico ou laboratorial?','Em que ordem se dão tionamida e iodo, e por quê?','Qual betabloqueador é preferido?','Por que evitar ácido acetilsalicílico?'],
 sections:[
  {h:'O que é',p:[
   'Forma extrema e ameaçadora à vida da tireotoxicose, com falência de múltiplos sistemas. Quase sempre há hipertireoidismo de base, em geral doença de Graves, e um gatilho: infecção, cirurgia, trauma, parto, suspensão de tionamida, carga de iodo (contraste, amiodarona), iodo radioativo, cetoacidose.',
   'Os níveis hormonais não diferem dos da tireotoxicose comum. O que define a crise é o quadro clínico. Por isso o diagnóstico é clínico, e o tratamento começa sem esperar exames.']},
  {h:'Quadro clínico',table:{head:['Sistema','Achados'],rows:[
   ['Temperatura','Febre alta, sudorese profusa'],
   ['Cardiovascular','Taquicardia desproporcional, fibrilação atrial, insuficiência cardíaca, choque'],
   ['Sistema nervoso','Agitação, delirium, psicose, convulsão, coma'],
   ['Digestivo','Vômitos, diarreia, dor abdominal, icterícia'],
   ['Gatilho','Presente na maioria']]},
   after:'O escore de Burch e Wartofsky soma esses itens: 45 pontos ou mais é muito sugestivo; de 25 a 44, crise iminente. Alteração do sistema nervoso e icterícia indicam pior prognóstico.'},
  {h:'Tratamento: cinco alvos',table:{head:['Alvo','Fármaco','Observação'],rows:[
   ['Efeito adrenérgico','Propranolol por via oral ou intravenosa','Em dose alta também reduz a conversão de T4 em T3. Na insuficiência cardíaca grave, preferir esmolol, titulável'],
   ['Síntese de hormônio','Propiltiouracil em dose de ataque e manutenção, ou metimazol','Propiltiouracil também bloqueia a conversão periférica'],
   ['Liberação de hormônio','Iodo (solução de Lugol ou iodeto de potássio)','Só 1 hora ou mais depois da tionamida'],
   ['Conversão de T4 em T3 e suporte adrenal','Hidrocortisona','Também trata insuficiência adrenal relativa'],
   ['Recirculação de hormônio','Colestiramina','Adjuvante']]},
   list:[
   'A ordem tionamida antes do iodo é essencial: iodo dado antes serve de matéria-prima para mais hormônio.',
   'Suporte em terapia intensiva: resfriamento externo, paracetamol, hidratação, glicose, tratamento da insuficiência cardíaca e da arritmia.',
   'Evitar ácido acetilsalicílico, que desloca o hormônio das proteínas e aumenta a fração livre.',
   'Tratar o gatilho: colher culturas e iniciar antibiótico se houver suspeita de infecção.',
   'Refratários: plasmaférese e tireoidectomia de urgência.',
   'Depois da crise, planejar o tratamento definitivo.']},
  {h:'Outras emergências da tireoide',list:[
   '<strong>Coma mixedematoso:</strong> hipotermia, bradicardia, hipoventilação. Hidrocortisona antes do hormônio tireoidiano.',
   '<strong>Paralisia periódica tireotóxica:</strong> homem jovem, fraqueza súbita de membros após refeição rica em carboidrato ou exercício, com potássio baixo por desvio para dentro da célula. Repor potássio com cautela, pois há rebote, e dar propranolol. Resolve-se ao tratar o hipertireoidismo.',
   '<strong>Agranulocitose por tionamida:</strong> febre e dor de garganta. Suspender o fármaco, antibiótico de amplo espectro.',
   '<strong>Bócio compressivo com estridor:</strong> via aérea em primeiro lugar.',
   '<strong>Neuropatia óptica da orbitopatia:</strong> queda de visão ou de cores. Corticoide intravenoso em dose alta e avaliação para descompressão.']}
 ],
 flow:{title:'Tireotoxicose com sinais de gravidade',nodes:[
  {k:'start',t:'Febre alta, taquicardia intensa e alteração de consciência em paciente com hipertireoidismo conhecido ou provável'},
  {k:'do',t:'Terapia intensiva, monitor, colher TSH, T4 livre, T3, culturas; não esperar resultados'},
  {k:'do',t:'Betabloqueador'},
  {k:'do',t:'Tionamida em dose alta'},
  {k:'ask',t:'Passou pelo menos 1 hora da tionamida?',yes:'Iniciar iodo',no:'Aguardar'},
  {k:'do',t:'Hidrocortisona; resfriamento, paracetamol, hidratação'},
  {k:'ask',t:'Há gatilho identificável?',yes:'Tratar infecção, cetoacidose ou outro fator',no:'Continuar procurando'},
  {k:'end',t:'Após estabilizar, definir tratamento definitivo'}]},
 reasoning:[
  'Tireotoxicose com febre alta e confusão é crise até prova em contrário.',
  'Hormônio alto não diferencia crise de tireotoxicose comum: o que conta é a clínica.',
  'Cada fármaco ataca um ponto diferente; a sequência importa.',
  'Insuficiência cardíaca da crise costuma ser de alto débito e melhora com controle da frequência, mas cuidado com betabloqueador em disfunção sistólica grave.',
  'Homem jovem com paralisia e potássio baixo: peça TSH.'],
 mnemonics:[
  {n:'B-T-I-C',t:'Betabloqueador, Tionamida, Iodo e Corticoide.'},
  {n:'Tionamida 1 hora antes do iodo',t:'A regra mais cobrada.'},
  {n:'45 pontos',t:'Limiar do escore de Burch e Wartofsky.'},
  {n:'Paracetamol sim, AAS não',t:'Antitérmico na crise.'}],
 pitfalls:[
  'Esperar os hormônios para iniciar o tratamento.',
  'Dar iodo antes da tionamida.',
  'Usar ácido acetilsalicílico como antitérmico.',
  'Não procurar o fator desencadeante.',
  'Esquecer o corticoide.',
  'Repor potássio de forma agressiva na paralisia periódica.'],
 recall:[
  {q:'Mulher de 38 anos, doença de Graves, parou o metimazol há um mês. Chega com pneumonia, temperatura de 40 °C, frequência de 160 em fibrilação atrial e agitação. Conduta em ordem?',a:'Crise tireotóxica. Terapia intensiva, propranolol, propiltiouracil em dose alta, iodo 1 hora depois, hidrocortisona, resfriamento e paracetamol, antibiótico para a pneumonia e suporte.'},
  {q:'Por que o iodo vem depois da tionamida?',a:'Porque sem bloqueio prévio da síntese o iodo é incorporado em novo hormônio. Depois do bloqueio, ele inibe a liberação do hormônio armazenado.'},
  {q:'Quais efeitos têm o propiltiouracil e o propranolol além do principal?',a:'Ambos reduzem a conversão periférica de T4 em T3.'},
  {q:'Homem de 26 anos acorda sem conseguir mover as pernas após jantar farto. Potássio de 2,1. O que suspeitar e como tratar?',a:'Paralisia periódica tireotóxica. Repor potássio com cautela, propranolol e tratar o hipertireoidismo.'},
  {q:'O que indica pior prognóstico na crise?',a:'Alteração grave do sistema nervoso, icterícia, choque e idade avançada.'}],
 practice:[
  'Anote a hora da tionamida para liberar o iodo.',
  'Pergunte sobre contraste iodado e amiodarona recentes.',
  'Avise a família de que o tratamento definitivo vem depois da fase aguda.'],
 refs:[
  {t:'Ross DS, et al. 2016 American Thyroid Association guidelines for diagnosis and management of hyperthyroidism and other causes of thyrotoxicosis. Thyroid. 2016.',q:'2016 American Thyroid Association Guidelines Diagnosis Management Hyperthyroidism other causes of Thyrotoxicosis Ross'},
  {t:'Satoh T, et al. 2016 guidelines for the management of thyroid storm from the Japan Thyroid Association and Japan Endocrine Society. Endocr J. 2016.',q:'2016 Guidelines for the management of thyroid storm Japan Thyroid Association Japan Endocrine Society Satoh'},
  {t:'Burch HB, Wartofsky L. Life-threatening thyrotoxicosis: thyroid storm. Endocrinol Metab Clin North Am. 1993.',q:'Burch Wartofsky Life-threatening thyrotoxicosis Thyroid storm 1993'}],
 note:'Síntese de diretrizes norte-americana e japonesa. Doses seguem o protocolo do serviço.'
},
'p1tir2_2':{
 updated:'2026-11',
 pretest:['Qual o primeiro hormônio a cair na doença grave?','Deve-se repor hormônio tireoidiano no paciente crítico com T3 baixo?','Quais alterações de exame são esperadas em eutireoideo que inicia amiodarona?','Como diferenciar os dois tipos de tireotoxicose por amiodarona?'],
 sections:[
  {h:'Síndrome do eutireoideo doente',p:[
   'Em doença grave, jejum prolongado e grandes cirurgias, os exames da tireoide se alteram sem que haja doença da glândula. É uma adaptação: o organismo reduz a conversão de T4 em T3, o hormônio ativo, e aumenta a formação de T3 reverso, inativo.'],
   table:{head:['Fase','T3','T4','TSH'],rows:[
    ['Doença leve a moderada','Baixo','Normal','Normal'],
    ['Doença grave','Muito baixo','Baixo (mau prognóstico)','Normal ou baixo'],
    ['Recuperação','Subindo','Subindo','Pode subir de forma transitória, em geral abaixo de 20']]},
   list:[
   'Não dosar função tireoidiana em paciente agudamente enfermo, salvo forte suspeita de doença da tireoide.',
   'Não repor hormônio: não há benefício demonstrado.',
   'Repetir os exames cerca de 6 semanas após a recuperação.',
   'Fármacos de terapia intensiva interferem: dopamina e corticoide reduzem o TSH; heparina altera a medida do T4 livre.']},
  {h:'Diferenciar de doença verdadeira',table:{head:['Quadro','Sugere'],rows:[
   ['TSH acima de 20','Hipotireoidismo primário'],
   ['TSH indetectável com T4 livre e T3 altos','Hipertireoidismo'],
   ['T4 livre baixo com TSH baixo e outros eixos alterados','Hipotireoidismo central'],
   ['T3 baixo, T4 normal ou baixo, TSH pouco alterado, doença grave em curso','Eutireoideo doente']]}},
  {h:'Amiodarona e tireoide',p:[
   'A amiodarona é rica em iodo (cerca de um terço do peso), deposita-se nos tecidos e tem meia-vida de meses. Ela bloqueia a conversão de T4 em T3 e pode lesar diretamente a célula tireoidiana.'],
   list:[
   '<strong>Alterações esperadas em quem permanece eutireoideo:</strong> T4 e T4 livre um pouco altos, T3 baixo, TSH discretamente alto nos primeiros 3 meses, com normalização depois.',
   '<strong>Monitorização:</strong> TSH e T4 livre antes de iniciar, aos 3 meses e depois a cada 6 meses.']},
  {h:'Hipotireoidismo por amiodarona',list:[
   'Mais comum em regiões com iodo suficiente e em quem já tem tireoidite autoimune (anti-TPO positivo).',
   'O excesso de iodo inibe a síntese, e a glândula não consegue escapar desse bloqueio.',
   'Tratamento: levotiroxina. Não é preciso suspender a amiodarona.']},
  {h:'Tireotoxicose por amiodarona',table:{head:['','Tipo 1','Tipo 2'],rows:[
   ['Mecanismo','Síntese aumentada pelo excesso de iodo','Tireoidite destrutiva'],
   ['Tireoide de base','Bócio nodular ou doença de Graves latente','Normal'],
   ['Doppler','Vascularização aumentada','Vascularização reduzida'],
   ['Captação','Baixa, normal ou alta','Muito baixa'],
   ['Tratamento','Tionamida em dose alta','Prednisona por 2 a 3 meses'],
   ['Evolução','Pode exigir tratamento definitivo','Geralmente se resolve']]},
   list:[
   'Formas mistas existem: quando não se consegue diferenciar ou o caso é grave, usam-se tionamida e corticoide juntos.',
   'Suspeitar diante de piora inexplicada de arritmia, perda de peso ou insuficiência cardíaca em usuário de amiodarona.',
   'Suspender ou não a amiodarona é decisão conjunta com o cardiologista. No tipo 2, pode ser mantida se for indispensável para arritmia grave. A suspensão não tem efeito rápido, pela meia-vida longa.',
   'Tireoidectomia para casos refratários ou com deterioração cardíaca.']}
 ],
 flow:{title:'Exame de tireoide alterado em paciente internado ou em uso de amiodarona',nodes:[
  {k:'start',t:'TSH, T4 ou T3 fora da referência'},
  {k:'ask',t:'Doença aguda grave em curso?',yes:'Interpretar como eutireoideo doente, salvo TSH acima de 20 ou indetectável com hormônios altos; repetir após a recuperação',no:'Seguir'},
  {k:'ask',t:'Usa amiodarona?',yes:'Seguir',no:'Investigação habitual'},
  {k:'ask',t:'TSH alto com T4 livre baixo?',yes:'Hipotireoidismo por amiodarona: levotiroxina, manter o fármaco',no:'Seguir'},
  {k:'ask',t:'TSH suprimido com T4 livre e T3 altos?',yes:'Tireotoxicose: Doppler, anticorpos e avaliação da glândula',no:'Alterações esperadas: acompanhar'},
  {k:'ask',t:'Glândula nodular ou Doppler aumentado?',yes:'Tipo 1: tionamida',no:'Tipo 2: prednisona; misto ou grave: ambos'},
  {k:'end',t:'Decidir sobre a amiodarona com a cardiologia'}]},
 reasoning:[
  'No doente grave, T3 baixo é esperado; TSH muito alto ou indetectável não é.',
  'T4 um pouco alto com T3 baixo em usuário de amiodarona é efeito do fármaco, não doença.',
  'Arritmia que volta em paciente antes controlado com amiodarona: dose TSH.',
  'Tireoide normal ao ultrassom com tireotoxicose por amiodarona: tipo 2.',
  'Não espere melhora rápida ao suspender a amiodarona.'],
 mnemonics:[
  {n:'T3 cai primeiro',t:'Marca do eutireoideo doente.'},
  {n:'6 semanas depois',t:'Quando repetir os exames.'},
  {n:'Tipo 1 = 1 doença prévia; Tipo 2 = tireoidiTe',t:'O tipo 1 tem glândula doente; o tipo 2 é destrutivo.'},
  {n:'0, 3, 6',t:'Monitorização da amiodarona: base, 3 meses e a cada 6.'}],
 pitfalls:[
  'Pedir função tireoidiana de rotina na terapia intensiva.',
  'Repor hormônio em eutireoideo doente.',
  'Diagnosticar hipotireoidismo por TSH de 8 na fase de recuperação.',
  'Suspender a amiodarona por hipotireoidismo.',
  'Interpretar as alterações esperadas da amiodarona como doença.',
  'Tratar tireotoxicose tipo 2 só com tionamida.'],
 recall:[
  {q:'Paciente em choque séptico: T3 baixo, T4 livre no limite inferior, TSH de 0,6. Interpretação e conduta?',a:'Síndrome do eutireoideo doente. Não tratar; repetir os exames cerca de 6 semanas após a recuperação.'},
  {q:'Homem em amiodarona há 2 anos, tireoide normal ao ultrassom, Doppler com fluxo reduzido, TSH suprimido e T4 livre alto. Tipo e tratamento?',a:'Tireotoxicose por amiodarona tipo 2, destrutiva. Prednisona por 2 a 3 meses; discutir com o cardiologista a manutenção do fármaco.'},
  {q:'Mulher com anti-TPO positivo desenvolve TSH de 22 após 6 meses de amiodarona. Conduta?',a:'Hipotireoidismo por amiodarona. Levotiroxina, mantendo a amiodarona.'},
  {q:'Quais alterações são esperadas em eutireoideo nos primeiros meses de amiodarona?',a:'T4 e T4 livre discretamente elevados, T3 baixo e TSH um pouco alto, que normaliza após cerca de 3 meses.'},
  {q:'Por que a amiodarona causa disfunção tireoidiana?',a:'Pela carga de iodo, pela inibição da conversão de T4 em T3 e por toxicidade direta sobre a célula folicular.'}],
 practice:[
  'Peça TSH e T4 livre antes de prescrever amiodarona.',
  'Antes de interpretar exame de tireoide em internado, pergunte pelo contexto e pelos fármacos.',
  'Registre a data de início da amiodarona no prontuário.'],
 refs:[
  {t:'Bartalena L, et al. 2018 European Thyroid Association guidelines for the management of amiodarone-associated thyroid dysfunction. Eur Thyroid J. 2018.',q:'2018 European Thyroid Association Guidelines Management of Amiodarone-Associated Thyroid Dysfunction Bartalena'},
  {t:'Fliers E, et al. Thyroid function in critically ill patients. Lancet Diabetes Endocrinol. 2015.',q:'Thyroid function in critically ill patients Fliers Lancet Diabetes Endocrinol 2015'}],
 note:'Síntese de diretriz europeia e revisão.'
},
'p1tir2_3':{
 updated:'2026-11',
 pretest:['Qual o tipo mais comum de câncer de tireoide e como ele se dissemina?','Que marcador acompanha o carcinoma diferenciado após tireoidectomia total?','O que excluir antes de operar um carcinoma medular?','Qual a complicação metabólica mais comum da tireoidectomia?'],
 sections:[
  {h:'Os tipos',table:{head:['Tipo','Origem','Disseminação','Marcas','Prognóstico'],rows:[
   ['Papilífero','Célula folicular','Linfática, para linfonodos cervicais','Núcleos claros com fendas e pseudoinclusões, corpos psamomatosos; mutação de BRAF; relação com irradiação','Excelente'],
   ['Folicular','Célula folicular','Hematogênica, para osso e pulmão','Invasão de cápsula e vasos; mutação de RAS','Bom'],
   ['Medular','Célula C (parafolicular)','Linfática e hematogênica','Calcitonina e CEA; amiloide; mutação de RET; neoplasia endócrina múltipla tipo 2','Intermediário'],
   ['Anaplásico','Indiferenciado','Invasão local rápida','Idoso, massa de crescimento em semanas, compressão','Muito ruim'],
   ['Linfoma','Linfócitos','Local','Tireoidite de Hashimoto prévia, crescimento rápido','Depende do subtipo']]},
   after:'Papilífero e folicular são os carcinomas diferenciados: captam iodo, produzem tireoglobulina e respondem ao TSH. Essas três propriedades explicam o tratamento e o seguimento.'},
  {h:'Tratamento do carcinoma diferenciado',list:[
   '<strong>Tumor pequeno e de baixo risco, restrito à glândula:</strong> lobectomia é suficiente; microcarcinomas selecionados podem ser apenas vigiados.',
   '<strong>Tumor de 1 a 4 cm sem fatores de risco:</strong> lobectomia ou tireoidectomia total.',
   '<strong>Tumor maior que 4 cm, extensão extratireoidiana, linfonodos ou metástases:</strong> tireoidectomia total, com esvaziamento cervical quando há linfonodos acometidos.',
   '<strong>Iodo radioativo:</strong> não é rotina no baixo risco; considerado no risco intermediário; indicado no alto risco.',
   '<strong>Supressão do TSH com levotiroxina:</strong> intensidade conforme o risco. Mais rigorosa no alto risco; no baixo risco, TSH no limite inferior do normal. Pesar o risco de fibrilação atrial e osteoporose em idosos.']},
  {h:'Seguimento',list:[
   'Tireoglobulina sérica, sempre com anticorpo antitireoglobulina (o anticorpo falseia o resultado).',
   'Ultrassom cervical.',
   'Classificação dinâmica da resposta: excelente, indeterminada, bioquímica incompleta ou estrutural incompleta. Ela ajusta a meta de TSH e a frequência das consultas.',
   'Estadiamento: a idade pesa. Abaixo de 55 anos, o paciente só pode estar em estágio I ou II, mesmo com metástases à distância.']},
  {h:'Carcinoma medular',list:[
   'Não capta iodo e não responde ao TSH: iodo radioativo e supressão não servem.',
   'Marcadores: calcitonina e CEA, para diagnóstico e seguimento.',
   'Pesquisar mutação germinativa de RET em todos. Um quarto dos casos é hereditário.',
   'Neoplasia endócrina múltipla 2A: carcinoma medular, feocromocitoma e hiperparatireoidismo. 2B: carcinoma medular, feocromocitoma, neuromas de mucosa e hábito marfanoide.',
   '<strong>Antes da cirurgia, excluir feocromocitoma</strong> com metanefrinas. Operar com feocromocitoma não tratado pode causar crise hipertensiva fatal.',
   'Tratamento: tireoidectomia total com esvaziamento do compartimento central.',
   'Familiares portadores da mutação: tireoidectomia profilática, em idade definida pelo tipo de mutação.']},
  {h:'Anaplásico',p:[
   'Massa cervical que cresce em semanas, com dispneia, disfagia e rouquidão. Prioridade para a via aérea e definição rápida do diagnóstico, diferenciando de linfoma, que tem tratamento e prognóstico muito melhores. Testar BRAF: quando mutado, há terapia-alvo. Discutir cuidados paliativos desde o início.']},
  {h:'Complicações da tireoidectomia',table:{head:['Complicação','Como reconhecer','Conduta'],rows:[
   ['Hipoparatireoidismo','Formigamento perioral e de extremidades, câimbras, sinais de Chvostek e Trousseau, QT longo','Cálcio e calcitriol; gluconato de cálcio intravenoso se sintomático grave'],
   ['Lesão do nervo laríngeo recorrente','Rouquidão; se bilateral, estridor e insuficiência respiratória','Avaliação da via aérea'],
   ['Hematoma cervical','Aumento de volume do pescoço e dispneia nas primeiras horas','Abrir a ferida à beira do leito e proteger a via aérea'],
   ['Hipotireoidismo','Esperado após tireoidectomia total','Levotiroxina']]}}
 ],
 flow:{title:'Citologia suspeita ou maligna',nodes:[
  {k:'start',t:'Punção com Bethesda V ou VI'},
  {k:'do',t:'Ultrassom cervical completo, com mapeamento de linfonodos; avaliar as cordas vocais se houver rouquidão'},
  {k:'ask',t:'Suspeita de carcinoma medular? (calcitonina alta, história familiar)',yes:'Metanefrinas e cálcio antes de operar; pesquisa de RET; tireoidectomia total com esvaziamento central',no:'Seguir'},
  {k:'ask',t:'Tumor maior que 4 cm, extensão para fora, linfonodos ou metástases?',yes:'Tireoidectomia total, com esvaziamento se indicado',no:'Baixo risco: lobectomia ou tireoidectomia total'},
  {k:'ask',t:'Risco intermediário ou alto na peça cirúrgica?',yes:'Iodo radioativo e supressão do TSH',no:'Sem iodo; TSH no limite inferior do normal'},
  {k:'do',t:'Tireoglobulina com anticorpo e ultrassom no seguimento'},
  {k:'end',t:'Reclassificar a resposta a cada avaliação e ajustar a meta de TSH'}]},
 reasoning:[
  'Papilífero vai para linfonodo; folicular vai para osso e pulmão.',
  'Tireoglobulina só é interpretável junto com o anticorpo.',
  'Medular: antes do bisturi, metanefrinas.',
  'Massa cervical de crescimento rápido em idoso: anaplásico ou linfoma. A biópsia separa.',
  'Formigamento nos lábios na noite da cirurgia é hipocalcemia.'],
 mnemonics:[
  {n:'Papilífero: Popular, Psamoma, Linfonodo Próximo',t:'O mais comum, com corpos psamomatosos e disseminação linfática.'},
  {n:'Folicular: Far away',t:'Metástase à distância, por via sanguínea.'},
  {n:'Medular: Calcitonina, C de célula C',t:'O marcador do tumor.'},
  {n:'Idade 55',t:'Corte do estadiamento.'}],
 pitfalls:[
  'Dar iodo radioativo a carcinoma medular.',
  'Operar carcinoma medular sem excluir feocromocitoma.',
  'Interpretar tireoglobulina sem dosar o anticorpo.',
  'Suprimir intensamente o TSH em idoso de baixo risco.',
  'Indicar tireoidectomia total e iodo para todo microcarcinoma.',
  'Atribuir a ansiedade o formigamento do pós-operatório.'],
 recall:[
  {q:'Mulher de 35 anos, carcinoma papilífero de 1,2 cm, restrito à tireoide, sem linfonodos. Qual a cirurgia e precisa de iodo?',a:'Lobectomia pode ser suficiente, ou tireoidectomia total conforme a preferência e os achados. Não há indicação rotineira de iodo radioativo no baixo risco.'},
  {q:'Homem com nódulo e calcitonina muito elevada, hipertensão em crises. O que pedir antes da cirurgia?',a:'Metanefrinas para excluir feocromocitoma, cálcio e PTH, e pesquisa de mutação de RET. Se houver feocromocitoma, tratá-lo primeiro.'},
  {q:'Como acompanhar após tireoidectomia total por carcinoma diferenciado?',a:'Tireoglobulina com anticorpo antitireoglobulina e ultrassom cervical, ajustando a meta de TSH pela resposta ao tratamento.'},
  {q:'Paciente no primeiro dia após tireoidectomia com parestesias e espasmo da mão ao inflar o manguito. Diagnóstico e conduta?',a:'Hipocalcemia por hipoparatireoidismo. Dosar cálcio, repor por via oral e, se grave, gluconato de cálcio intravenoso com monitor.'},
  {q:'Por que a citologia não diagnostica carcinoma folicular?',a:'Porque o critério de malignidade é a invasão de cápsula ou de vasos, só avaliável na histologia.'}],
 practice:[
  'Pergunte sobre irradiação cervical na infância e câncer de tireoide na família.',
  'Meça o cálcio nas primeiras 24 horas após a tireoidectomia total.',
  'Explique ao paciente de baixo risco que o prognóstico é excelente.'],
 refs:[
  {t:'Haugen BR, et al. 2015 American Thyroid Association management guidelines for adult patients with thyroid nodules and differentiated thyroid cancer. Thyroid. 2016.',q:'2015 American Thyroid Association Management Guidelines Thyroid Nodules Differentiated Thyroid Cancer Haugen'},
  {t:'Wells SA, et al. Revised American Thyroid Association guidelines for the management of medullary thyroid carcinoma. Thyroid. 2015.',q:'Revised American Thyroid Association Guidelines Management of Medullary Thyroid Carcinoma Wells 2015'},
  {t:'Ali SZ, et al. The 2023 Bethesda System for Reporting Thyroid Cytopathology. Thyroid. 2023.',q:'2023 Bethesda System for Reporting Thyroid Cytopathology Ali'}],
 note:'Baseado nas diretrizes de 2015. Há atualização mais recente da diretriz de carcinoma diferenciado; confirme a versão adotada.'
}
});
