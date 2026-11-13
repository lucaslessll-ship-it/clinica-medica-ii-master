/* Estudo aprofundado · Reumatologia (P2). Texto original; referências ao final de cada aula. */
LessonDeep.add({
'reuma1_0':{
 updated:'2026-11',
 pretest:['Qual subtipo de miopatia inflamatória tem maior associação com câncer no adulto?','Paciente em uso de estatina com CK de 9.000 que não cai após suspender o fármaco: qual anticorpo pedir?','Por que TGO e TGP elevadas não indicam, por si só, doença hepática nesse contexto?','Qual miopatia inflamatória não responde a corticoide e acomete flexores dos dedos e quadríceps?'],
 sections:[
  {h:'O que une e o que separa os subtipos',p:[
   'Todas são doenças autoimunes em que o músculo esquelético é o alvo, com fraqueza proximal e simétrica que se instala em semanas a meses. O paciente descreve dificuldade para subir escadas, levantar da cadeira e pentear o cabelo. A dor costuma ser discreta: quando a queixa principal é dor sem fraqueza objetiva, pense em outra coisa.',
   'Hoje o diagnóstico é feito por fenótipo mais autoanticorpo específico. O termo polimiosite ficou restrito a poucos casos, porque a maioria dos antigos diagnósticos se revelou síndrome antissintetase, miopatia necrosante ou miosite por corpos de inclusão.'],
   table:{head:['Subtipo','Pista clínica','Anticorpo','Ponto de atenção'],rows:[
    ['Dermatomiosite','Heliótropo, pápulas de Gottron, sinal do V e do xale','Mi-2, TIF1-γ, NXP2, MDA5, SAE','TIF1-γ e NXP2: rastrear câncer. MDA5: pouca fraqueza e pneumopatia rapidamente progressiva'],
    ['Síndrome antissintetase','Miosite, pneumopatia intersticial, artrite, Raynaud, mãos de mecânico, febre','Jo-1 (mais comum), PL-7, PL-12','O pulmão define o prognóstico'],
    ['Miopatia necrosante imunomediada','Fraqueza intensa, CK muito alta','SRP, HMGCR','HMGCR ligado a estatina; não melhora só com a suspensão'],
    ['Miosite por corpos de inclusão','Mais de 50 anos, curso de anos, assimétrica, flexores dos dedos e quadríceps, disfagia','cN1A','Não responde a imunossupressão'],
    ['Miosite de sobreposição','Com esclerose sistêmica, lúpus ou doença mista','PM-Scl, Ku, U1-RNP','Tratar a doença de base']]}},
  {h:'Pele da dermatomiosite',list:[
   'Heliótropo: eritema violáceo nas pálpebras superiores, com edema.',
   'Pápulas de Gottron: placas eritematosas sobre as articulações metacarpofalângicas e interfalângicas. No lúpus, o eritema poupa as articulações e fica entre elas.',
   'Sinal do V (decote) e do xale (ombros e dorso): fotossensíveis e pruriginosos.',
   'Mãos de mecânico: fissuras e hiperqueratose na face lateral dos dedos, típicas da síndrome antissintetase.',
   'Dermatomiosite amiopática: pele típica sem fraqueza. Com anti-MDA5, vigiar o pulmão de perto.']},
  {h:'Exames e como interpretá-los',list:[
   '<strong>Enzimas musculares:</strong> CK, aldolase, DHL, TGO e TGP sobem. As transaminases vêm do músculo; peça GGT para separar de doença hepática.',
   '<strong>Autoanticorpos específicos de miosite:</strong> definem subtipo, risco de pulmão e de câncer.',
   '<strong>Eletroneuromiografia:</strong> padrão miopático com irritabilidade (fibrilações, ondas positivas, potenciais curtos e polifásicos).',
   '<strong>Ressonância muscular:</strong> edema em sequência STIR mostra atividade e orienta o local da biópsia.',
   '<strong>Biópsia muscular:</strong> atrofia perifascicular na dermatomiosite; necrose com pouco infiltrado na necrosante; vacúolos marginados na de corpos de inclusão.',
   '<strong>Pulmão:</strong> prova de função com difusão e tomografia de alta resolução em todos com anticorpo antissintetase ou anti-MDA5.',
   '<strong>Câncer:</strong> na dermatomiosite do adulto, o risco é maior nos 3 anos em torno do diagnóstico. Fazer o rastreio da idade e ampliar com tomografias conforme o perfil de risco.']},
  {h:'Diagnóstico diferencial da fraqueza proximal',table:{head:['Condição','O que diferencia'],rows:[
   ['Hipotireoidismo','CK alta, reflexos lentos; pedir TSH sempre'],
   ['Miopatia tóxica por estatina','Melhora em semanas após suspender'],
   ['Miopatia por corticoide','CK normal; surge durante o tratamento'],
   ['Polimialgia reumática','Dor e rigidez de cinturas, sem fraqueza real, CK normal, mais de 50 anos'],
   ['Miastenia gravis','Fatigabilidade, flutuação, acometimento ocular, CK normal'],
   ['Distrofias musculares','Curso de anos, história familiar, sem resposta a imunossupressor']]}},
  {h:'Tratamento',list:[
   'Corticoide em dose alta (prednisona em torno de 1 mg/kg/dia) com poupador desde o início: metotrexato ou azatioprina.',
   'Com pneumopatia intersticial: preferir micofenolato, azatioprina ou inibidor de calcineurina; metotrexato tem toxicidade pulmonar própria.',
   'Imunoglobulina intravenosa: dermatomiosite refratária, disfagia grave e miopatia necrosante.',
   'Rituximabe: doença refratária, sobretudo com anticorpos específicos.',
   'Pneumopatia rapidamente progressiva (anti-MDA5): terapia combinada precoce em centro de referência.',
   'Pele: fotoproteção e hidroxicloroquina. Fisioterapia desde cedo.',
   'Acompanhar pela força, não só pela CK.']}
 ],
 flow:{title:'Fraqueza proximal com CK elevada',nodes:[
  {k:'start',t:'Fraqueza proximal simétrica, semanas a meses, CK elevada'},
  {k:'do',t:'Excluir causas comuns: TSH, fármacos (estatina, corticoide, colchicina), álcool, eletrólitos'},
  {k:'ask',t:'Há lesões cutâneas típicas (heliótropo, Gottron)?',yes:'Dermatomiosite provável: anticorpos e rastreio de câncer',no:'Seguir'},
  {k:'ask',t:'Há dispneia, tosse seca ou estertores?',yes:'Tomografia e função pulmonar urgentes; pensar em antissintetase ou MDA5',no:'Seguir'},
  {k:'do',t:'Painel de anticorpos de miosite, eletroneuromiografia, ressonância e biópsia quando houver dúvida'},
  {k:'ask',t:'Mais de 50 anos, curso lento, assimétrica, dedos e quadríceps?',yes:'Corpos de inclusão: não imunossuprimir; reabilitação',no:'Corticoide com poupador'},
  {k:'end',t:'Reavaliar força em 4 a 8 semanas e ajustar o tratamento'}]},
 reasoning:[
  'Fraqueza piorando com CK normal durante o tratamento sugere miopatia por corticoide, não atividade.',
  'CK acima de 10 vezes o normal com pouca inflamação na biópsia aponta para a forma necrosante.',
  'Pouca fraqueza com pele típica e pulmão ruim é o cenário mais perigoso (anti-MDA5).',
  'Disfagia e fraqueza respiratória definem gravidade, independentemente do valor da CK.'],
 mnemonics:[
  {n:'Gottron fica nas juntas',t:'Dermatomiosite pinta as articulações dos dedos; lúpus pinta os espaços entre elas.'},
  {n:'Antissintetase = 5 achados',t:'Músculo, pulmão, articulação, Raynaud e mãos de mecânico.'},
  {n:'Inclusão é a exceção',t:'Lenta, assimétrica, distal e sem resposta a corticoide: o contrário das outras.'},
  {n:'TIF1 = Tumor',t:'TIF1-γ no adulto pede busca ativa de câncer.'}],
 pitfalls:[
  'Investigar fígado por causa de TGO e TGP sem dosar CK.',
  'Rotular como polimiosite sem pedir anticorpos nem considerar corpos de inclusão.',
  'Esquecer o pulmão quando o músculo está melhorando.',
  'Tratar miosite por corpos de inclusão com corticoide prolongado.',
  'Manter o diagnóstico de miopatia por estatina quando a CK segue alta meses após a suspensão.'],
 recall:[
  {q:'Mulher, 52 anos, heliótropo, Gottron, fraqueza proximal e anti-TIF1-γ positivo. Qual o passo que não pode faltar?',a:'Rastreio ativo de neoplasia, pois o anticorpo se associa a câncer no adulto, principalmente nos 3 anos em torno do diagnóstico.'},
  {q:'Como diferenciar atividade de doença de miopatia por corticoide?',a:'Na atividade, a CK sobe e a ressonância mostra edema. Na miopatia por corticoide, a CK é normal, a fraqueza é mais de membros inferiores e melhora com a redução da dose.'},
  {q:'Quais achados compõem a síndrome antissintetase?',a:'Miosite, pneumopatia intersticial, artrite, fenômeno de Raynaud, mãos de mecânico e febre, com anticorpo como o anti-Jo-1.'},
  {q:'Homem, 68 anos, quedas há 3 anos, dificuldade para segurar objetos, quadríceps atrófico, CK pouco elevada. Hipótese e conduta?',a:'Miosite por corpos de inclusão. Não responde a imunossupressores; indicar reabilitação, avaliar disfagia e prevenir quedas.'},
  {q:'Qual imunossupressor evitar como primeira escolha se há pneumopatia intersticial?',a:'Metotrexato, pela toxicidade pulmonar. Preferir micofenolato, azatioprina ou inibidor de calcineurina.'}],
 practice:[
  'Meça força de forma reprodutível a cada consulta (teste muscular manual de grupos proximais).',
  'Pergunte sobre engasgos e voz anasalada: disfagia muda a conduta.',
  'Inicie profilaxia óssea e avalie risco infeccioso ao prescrever corticoide em dose alta.'],
 refs:[
  {t:'Lundberg IE, et al. Idiopathic inflammatory myopathies. Nat Rev Dis Primers. 2021.',q:'Lundberg Idiopathic inflammatory myopathies Nat Rev Dis Primers 2021'},
  {t:'Lundberg IE, et al. 2017 EULAR/ACR classification criteria for adult and juvenile idiopathic inflammatory myopathies. Ann Rheum Dis. 2017.',q:'2017 EULAR ACR classification criteria idiopathic inflammatory myopathies Lundberg'}],
 note:'Síntese de revisão e critérios internacionais.'
},
'reuma1_1':{
 updated:'2026-11',
 pretest:['Quais três processos formam a base da esclerose sistêmica?','Qual anticorpo se associa à forma limitada e à hipertensão pulmonar tardia?','O que desencadeia a crise renal esclerodérmica e qual fármaco a trata?','Quais são as duas principais causas de morte na doença?'],
 sections:[
  {h:'O tripé da doença',p:[
   'Vasculopatia de pequenos vasos, autoimunidade e fibrose. A lesão vascular vem primeiro: o fenômeno de Raynaud costuma preceder em anos o espessamento da pele. A isquemia repetida e a ativação imune estimulam fibroblastos, que depositam colágeno na pele e nos órgãos.',
   'Raciocine por órgão. A pele dá o nome à doença, mas quem mata é o pulmão.']},
  {h:'Forma limitada e forma difusa',table:{head:['','Cutânea limitada','Cutânea difusa'],rows:[
   ['Pele','Distal a cotovelos e joelhos, e face','Também proximal e tronco'],
   ['Ritmo','Lento; Raynaud por anos antes','Rápido nos primeiros anos'],
   ['Anticorpo','Anticentrômero','Anti-Scl-70 (topoisomerase I) e anti-RNA polimerase III'],
   ['Órgão em risco','Hipertensão arterial pulmonar tardia','Pneumopatia intersticial precoce; crise renal'],
   ['Achados clássicos','Calcinose, Raynaud, esôfago, esclerodactilia, telangiectasias','Atrito tendíneo, contraturas']]},
   p:['Anti-RNA polimerase III marca risco de crise renal, pele rapidamente progressiva e câncer próximo ao diagnóstico.']},
  {h:'Raynaud: primário ou secundário',list:[
   'Primário: início na adolescência, simétrico, sem úlceras, capilaroscopia normal e FAN negativo.',
   'Secundário: início após os 30 anos, crises intensas, úlceras ou cicatrizes em polpa digital, capilaroscopia com megacapilares e áreas avasculares, FAN positivo.',
   'Raynaud com capilaroscopia alterada e anticorpo específico já permite reconhecer a doença muito precoce.']},
  {h:'Critérios de 2013 em uma frase',p:[
   'Espessamento da pele dos dedos das duas mãos que se estende além das metacarpofalângicas basta para classificar. Sem isso, somam-se pontos por esclerodactilia ou dedos edemaciados, lesões de polpa digital, telangiectasias, capilaroscopia alterada, hipertensão pulmonar ou pneumopatia intersticial, Raynaud e autoanticorpos específicos; 9 pontos ou mais classificam.']},
  {h:'Órgão por órgão',list:[
   '<strong>Trato gastrointestinal:</strong> o mais acometido. Dismotilidade esofágica e refluxo, ectasia vascular antral (estômago em melancia) com anemia, supercrescimento bacteriano, pseudo-obstrução e incontinência fecal.',
   '<strong>Pneumopatia intersticial:</strong> padrão de pneumonia intersticial não específica nas bases. Mais comum com anti-Scl-70.',
   '<strong>Hipertensão arterial pulmonar:</strong> dispneia com difusão desproporcionalmente baixa e pulmão limpo. Confirmação por cateterismo direito.',
   '<strong>Crise renal:</strong> hipertensão de início abrupto, piora rápida da creatinina e anemia microangiopática. Fatores de risco: forma difusa precoce, anti-RNA polimerase III e corticoide em dose de 15 mg/dia de prednisona ou mais.',
   '<strong>Coração:</strong> fibrose miocárdica, arritmias e pericardite.']},
  {h:'Rastreamento que salva',list:[
   'Na avaliação inicial: tomografia de alta resolução e prova de função pulmonar com difusão.',
   'Todo ano: função pulmonar com difusão e ecocardiograma.',
   'Pressão arterial medida com frequência nos primeiros anos da forma difusa, inclusive em casa.']},
  {h:'Tratamento dirigido ao órgão',table:{head:['Problema','Conduta'],rows:[
   ['Raynaud','Aquecimento, parar de fumar, bloqueador de canal de cálcio (nifedipino); inibidor de fosfodiesterase 5; iloprosta intravenosa nos graves'],
   ['Úlceras digitais','Inibidor de fosfodiesterase 5, iloprosta; bosentana previne novas úlceras'],
   ['Pele e pneumopatia intersticial','Micofenolato como primeira linha; ciclofosfamida, rituximabe, tocilizumabe, nintedanibe; transplante autólogo em casos selecionados de progressão rápida'],
   ['Hipertensão arterial pulmonar','Antagonista de endotelina, inibidor de fosfodiesterase 5, análogos de prostaciclina, muitas vezes combinados'],
   ['Refluxo e dismotilidade','Inibidor de bomba de prótons, procinético; antibióticos em rodízio no supercrescimento bacteriano'],
   ['Crise renal','Inibidor da ECA em dose crescente, iniciado de imediato']]},
   after:'Não se usa inibidor da ECA para prevenir crise renal. E corticoide em dose alta deve ser evitado, pois é fator de risco para ela.'}
 ],
 flow:{title:'Raynaud na consulta',nodes:[
  {k:'start',t:'Paciente com fenômeno de Raynaud'},
  {k:'ask',t:'Início após os 30 anos, assimetria, úlceras ou cicatrizes digitais?',yes:'Tratar como provável secundário',no:'Provável primário: medidas gerais'},
  {k:'do',t:'Pedir FAN, anticentrômero, anti-Scl-70 e capilaroscopia periungueal'},
  {k:'ask',t:'Capilaroscopia alterada ou anticorpo específico positivo?',yes:'Esclerose sistêmica precoce: estadiar órgãos',no:'Reavaliar anualmente'},
  {k:'do',t:'Tomografia de tórax, função pulmonar com difusão, ecocardiograma, função renal e urina'},
  {k:'end',t:'Tratar cada órgão acometido e repetir o rastreio todo ano'}]},
 reasoning:[
  'Dispneia com tomografia limpa e difusão baixa: pense em hipertensão arterial pulmonar.',
  'Dispneia com estertores em velcro nas bases: pense em pneumopatia intersticial.',
  'Pressão que sobe de repente em paciente com forma difusa recente é crise renal até prova em contrário.',
  'Anemia ferropriva sem causa aparente: procure ectasia vascular antral.'],
 mnemonics:[
  {n:'CREST',t:'Calcinose, Raynaud, Esôfago, eSclerodactilia, Telangiectasias: retrato da forma limitada.'},
  {n:'Centrômero = Central tardio',t:'Anticentrômero lembra hipertensão pulmonar, que aparece tarde.'},
  {n:'Scl-70 = Scar no pulmão',t:'Anti-Scl-70 lembra fibrose pulmonar.'},
  {n:'Pol III = Pressão',t:'Anti-RNA polimerase III lembra crise renal hipertensiva.'}],
 pitfalls:[
  'Tratar a pele com corticoide em dose alta e precipitar crise renal.',
  'Dar inibidor da ECA como prevenção de crise renal.',
  'Não pedir difusão na prova de função pulmonar.',
  'Atribuir dispneia ao descondicionamento sem ecocardiograma.',
  'Considerar todo Raynaud como benigno sem capilaroscopia nem FAN.'],
 recall:[
  {q:'Mulher com forma limitada há 15 anos, dispneia progressiva, tomografia normal, difusão de 40% do previsto. Qual a hipótese e como confirmar?',a:'Hipertensão arterial pulmonar. O ecocardiograma sugere e o cateterismo cardíaco direito confirma.'},
  {q:'Cite três fatores de risco para crise renal esclerodérmica.',a:'Forma cutânea difusa nos primeiros anos, anti-RNA polimerase III e uso de corticoide em dose de 15 mg/dia de prednisona ou mais.'},
  {q:'Qual a primeira linha para pneumopatia intersticial da esclerose sistêmica?',a:'Micofenolato. Ciclofosfamida, rituximabe, tocilizumabe e nintedanibe são alternativas ou associações.'},
  {q:'O que diferencia Raynaud primário do secundário na capilaroscopia?',a:'No primário os capilares são normais. No secundário à esclerose sistêmica há megacapilares, micro-hemorragias e áreas sem capilares.'},
  {q:'Qual o órgão interno mais frequentemente acometido?',a:'O trato gastrointestinal, principalmente o esôfago.'}],
 practice:[
  'Examine as polpas digitais e as pregas ungueais em todo paciente com Raynaud.',
  'Oriente a medir a pressão em casa nos primeiros anos da forma difusa.',
  'Encaminhe cedo para centro com capilaroscopia e avaliação pulmonar.'],
 refs:[
  {t:'van den Hoogen F, et al. 2013 classification criteria for systemic sclerosis: an ACR/EULAR collaborative initiative. Ann Rheum Dis. 2013.',q:'2013 classification criteria systemic sclerosis ACR EULAR van den Hoogen'},
  {t:'Del Galdo F, et al. EULAR recommendations for the treatment of systemic sclerosis: 2023 update. Ann Rheum Dis. 2025.',q:'EULAR recommendations treatment systemic sclerosis 2023 update Del Galdo'},
  {t:'Denton CP, Khanna D. Systemic sclerosis. Lancet. 2017.',q:'Denton Khanna Systemic sclerosis Lancet 2017'}],
 note:'Síntese de critérios e recomendações internacionais.'
},
'reuma1_2':{
 updated:'2026-11',
 pretest:['Anti-La isolado conta ponto nos critérios de 2016?','Qual complicação tubular renal é típica e que distúrbio eletrolítico ela causa?','Quais achados aumentam o risco de linfoma?','Qual o risco fetal de uma gestante com anti-Ro positivo?'],
 sections:[
  {h:'O que é',p:[
   'Doença autoimune em que linfócitos infiltram as glândulas exócrinas, sobretudo lacrimais e salivares, com hiperatividade de células B. Pode ser isolada ou acompanhar artrite reumatoide e lúpus. Acomete principalmente mulheres entre 40 e 60 anos.',
   'Dois eixos de raciocínio: a secura, que domina a qualidade de vida, e a doença sistêmica, que define o prognóstico.']},
  {h:'Quadro glandular',list:[
   'Olho seco: sensação de areia, ardor, piora ao longo do dia.',
   'Boca seca: precisa de água para engolir alimentos secos, cáries cervicais, candidíase oral, queilite angular.',
   'Aumento de parótidas, em geral bilateral e recorrente.',
   'Secura vaginal, de pele e de vias aéreas (tosse seca).']},
  {h:'Quadro extraglandular',table:{head:['Sistema','Manifestação'],rows:[
   ['Geral','Fadiga intensa, artralgia ou artrite não erosiva'],
   ['Pele e vasos','Raynaud, púrpura palpável (vasculite crioglobulinêmica)'],
   ['Pulmão','Pneumopatia intersticial, bronquiolite'],
   ['Rim','Nefrite tubulointersticial com acidose tubular renal distal: hipocalemia, cálculos, fraqueza'],
   ['Nervos','Neuropatia sensitiva, de fibras finas, ganglionopatia'],
   ['Sangue','Citopenias, hipergamaglobulinemia, fator reumatoide positivo'],
   ['Linfoma','Linfoma de células B, em especial o de zona marginal de parótida']]}},
  {h:'Critérios ACR/EULAR de 2016',p:[
   'Aplicam-se a quem tem sintomas de secura ou suspeita sistêmica. Somando 4 pontos ou mais, classifica-se como doença.'],
   table:{head:['Item','Pontos'],rows:[
    ['Biópsia de glândula salivar menor com sialadenite linfocítica focal, escore de foco de 1 ou mais','3'],
    ['Anti-SSA/Ro positivo','3'],
    ['Coloração ocular alterada (escore de 5 ou mais)','1'],
    ['Teste de Schirmer de 5 mm ou menos em 5 minutos','1'],
    ['Fluxo salivar não estimulado de 0,1 mL/min ou menos','1']]},
   after:'Anti-La isolado e FAN isolado não pontuam. Excluir antes: radioterapia de cabeça e pescoço, hepatite C ativa, HIV avançado, sarcoidose, amiloidose, doença do enxerto e doença relacionada à IgG4.'},
  {h:'Outras causas de secura',list:[
   'Fármacos: antidepressivos tricíclicos, anti-histamínicos, anticolinérgicos, diuréticos.',
   'Idade, diabetes descompensado, desidratação, respiração bucal.',
   'Hepatite C, HIV, sarcoidose e doença relacionada à IgG4 (aumento glandular sem anti-Ro).']},
  {h:'Risco de linfoma',p:[
   'É a complicação que mais preocupa. Sinais de alerta: aumento persistente ou assimétrico de parótida, púrpura palpável, C4 baixo, crioglobulinas, componente monoclonal, linfopenia e linfonodomegalia. Parótida que endurece ou cresce de um lado só pede imagem e biópsia.']},
  {h:'Gestação',p:[
   'Anti-Ro e anti-La atravessam a placenta. O risco é o lúpus neonatal, com bloqueio atrioventricular congênito em cerca de 1 a 2% das gestações, maior quando já houve um filho acometido. Recomenda-se ecocardiograma fetal seriado no segundo trimestre, e a hidroxicloroquina reduz a recorrência.']},
  {h:'Tratamento',list:[
   '<strong>Olho:</strong> lágrimas artificiais sem conservante, gel à noite, ciclosporina tópica, oclusão de ponto lacrimal.',
   '<strong>Boca:</strong> hidratação frequente, substitutos de saliva, goma sem açúcar, pilocarpina quando há função glandular residual, cuidado odontológico regular e flúor.',
   '<strong>Artralgia e fadiga:</strong> hidroxicloroquina, com benefício modesto.',
   '<strong>Doença sistêmica:</strong> corticoide e imunossupressores conforme o órgão; rituximabe na vasculite crioglobulinêmica e em formas graves.',
   '<strong>Acidose tubular:</strong> repor potássio e bicarbonato ou citrato.']}
 ],
 flow:{title:'Paciente com olho e boca secos',nodes:[
  {k:'start',t:'Secura ocular e oral por mais de 3 meses'},
  {k:'do',t:'Revisar fármacos e causas comuns; testar com Schirmer e fluxo salivar'},
  {k:'ask',t:'Secura objetiva confirmada?',yes:'Pedir anti-Ro, FAN, fator reumatoide, eletroforese de proteínas, C3 e C4',no:'Tratar causas não autoimunes'},
  {k:'ask',t:'Anti-Ro positivo com teste objetivo alterado?',yes:'Critérios preenchidos (4 pontos ou mais)',no:'Biópsia de glândula salivar menor'},
  {k:'do',t:'Avaliar doença sistêmica: hemograma, potássio, bicarbonato, urina, função pulmonar se houver sintomas'},
  {k:'ask',t:'Há sinais de alerta para linfoma?',yes:'Imagem e biópsia da parótida ou do linfonodo',no:'Seguimento periódico'},
  {k:'end',t:'Tratar a secura, tratar o órgão e vigiar linfoma'}]},
 reasoning:[
  'Fraqueza com potássio baixo e pH urinário alto em mulher com olho seco: acidose tubular distal.',
  'Púrpura em pernas com C4 baixo: crioglobulinemia, que também é marcador de linfoma.',
  'Fator reumatoide positivo não significa artrite reumatoide; é frequente na síndrome de Sjögren.',
  'Sem anti-Ro, o diagnóstico depende da biópsia.'],
 mnemonics:[
  {n:'3 + 3 + 1 + 1 + 1',t:'Biópsia 3, anti-Ro 3, e os três testes de secura valem 1 cada. Precisa de 4.'},
  {n:'Ro = Recém-nascido',t:'Anti-Ro lembra bloqueio cardíaco congênito.'},
  {n:'PPC4',t:'Parótida persistente, Púrpura e C4 baixo: os três alertas de linfoma.'}],
 pitfalls:[
  'Diagnosticar pela queixa de secura, sem teste objetivo.',
  'Contar anti-La isolado como critério.',
  'Não rever medicamentos anticolinérgicos antes de investigar.',
  'Ignorar aumento unilateral e duro de parótida.',
  'Esquecer de orientar a gestante com anti-Ro sobre o risco fetal.'],
 recall:[
  {q:'Qual a combinação mínima mais comum que fecha os critérios de 2016?',a:'Anti-Ro positivo (3 pontos) mais um teste objetivo de secura alterado (1 ponto), ou biópsia positiva mais um teste alterado.'},
  {q:'Mulher com Sjögren, fraqueza muscular e potássio de 2,6. Qual o mecanismo?',a:'Nefrite tubulointersticial com acidose tubular renal distal, que causa perda renal de potássio, acidose de ânion gap normal e urina alcalina.'},
  {q:'Cite quatro preditores de linfoma.',a:'Aumento persistente de parótida, púrpura palpável, C4 baixo, crioglobulinas, componente monoclonal ou linfopenia.'},
  {q:'O que oferecer à gestante com anti-Ro que já teve filho com bloqueio cardíaco?',a:'Hidroxicloroquina, que reduz a recorrência, e ecocardiograma fetal seriado no segundo trimestre.'},
  {q:'Quando a pilocarpina funciona?',a:'Quando ainda há tecido glandular funcionante. Efeitos adversos colinérgicos, como sudorese, limitam o uso.'}],
 practice:[
  'Faça o teste de Schirmer no consultório: é rápido e muda a conduta.',
  'Encaminhe ao dentista no diagnóstico; a perda dentária é evitável.',
  'Palpe parótidas e cadeias linfonodais em toda consulta.'],
 refs:[
  {t:'Shiboski CH, et al. 2016 ACR/EULAR classification criteria for primary Sjögren syndrome. Ann Rheum Dis. 2017.',q:'2016 ACR EULAR classification criteria primary Sjogren syndrome Shiboski'},
  {t:'Ramos-Casals M, et al. EULAR recommendations for the management of Sjögren syndrome with topical and systemic therapies. Ann Rheum Dis. 2020.',q:'EULAR recommendations management Sjogren syndrome topical systemic therapies Ramos-Casals'},
  {t:'Mariette X, Criswell LA. Primary Sjögren syndrome. N Engl J Med. 2018.',q:'Mariette Criswell Primary Sjogren syndrome N Engl J Med 2018'}],
 note:'Síntese de critérios e recomendações internacionais.'
},
'reuma2_0':{
 updated:'2026-11',
 pretest:['Qual o critério de entrada da classificação EULAR/ACR de 2019?','Na suspeita de atividade, o que acontece com C3, C4 e anti-DNA?','PCR muito alta em paciente lúpico com febre sugere atividade ou infecção?','Qual fármaco todo paciente com lúpus deve usar, salvo contraindicação?'],
 sections:[
  {h:'Mecanismo em três passos',p:[
   'Perda de tolerância a antígenos nucleares, formação de autoanticorpos e imunocomplexos, e depósito desses complexos em tecidos com ativação do complemento. A via do interferon tipo I mantém o processo ativo. Por isso o complemento cai na atividade e a doença pode atingir quase qualquer órgão.']},
  {h:'Classificação de 2019',p:[
   'Critério de entrada obrigatório: FAN em título de 1:80 ou mais. Depois somam-se pontos por domínios clínicos e imunológicos, contando só o item de maior peso em cada domínio. Classifica-se com 10 pontos ou mais e pelo menos um critério clínico. Um item só conta se não houver explicação mais provável.'],
   table:{head:['Domínio','Exemplos e peso'],rows:[
    ['Constitucional','Febre (2)'],
    ['Hematológico','Leucopenia (3), plaquetopenia (4), hemólise autoimune (4)'],
    ['Neuropsiquiátrico','Delirium (2), psicose (3), convulsão (5)'],
    ['Mucocutâneo','Alopecia não cicatricial (2), úlceras orais (2), lúpus subagudo ou discoide (4), lúpus cutâneo agudo (6)'],
    ['Serosas','Derrame pleural ou pericárdico (5), pericardite aguda (6)'],
    ['Musculoesquelético','Acometimento articular (6)'],
    ['Renal','Proteinúria acima de 0,5 g/24 h (4), nefrite classe II ou V (8), classe III ou IV (10)'],
    ['Imunológico','Antifosfolípides (2), complemento baixo (3 ou 4), anti-DNA ou anti-Sm (6)']]}},
  {h:'Autoanticorpos: o que cada um diz',table:{head:['Anticorpo','Significado'],rows:[
   ['FAN','Muito sensível, pouco específico. Negativo torna o diagnóstico improvável'],
   ['Anti-DNA de dupla hélice','Específico; acompanha atividade e nefrite'],
   ['Anti-Sm','O mais específico; não varia com atividade'],
   ['Anti-Ro e anti-La','Lúpus cutâneo subagudo, fotossensibilidade, lúpus neonatal'],
   ['Anti-histona','Lúpus induzido por drogas'],
   ['Anti-RNP','Doença mista do tecido conjuntivo quando em título alto'],
   ['Antifosfolípides','Risco de trombose e perda gestacional']]}},
  {h:'Atividade ou infecção',p:[
   'É a dúvida mais comum na enfermaria. Na atividade, C3 e C4 caem, o anti-DNA sobe e há leucopenia. A PCR costuma ficar normal ou pouco elevada, exceto em serosite e artrite. PCR muito alta, leucocitose com desvio e calafrios falam a favor de infecção. Na dúvida, colha culturas e trate a infecção: o paciente imunossuprimido morre mais de infecção do que de atividade.']},
  {h:'Nefrite lúpica',list:[
   'Suspeitar com proteinúria de 0,5 g/dia ou mais, hematúria dismórfica, cilindros ou piora da creatinina. Pedir urina e relação proteína/creatinina em toda consulta.',
   'A biópsia renal define a classe e orienta o tratamento. Classes III e IV são proliferativas; a classe V é membranosa.',
   'Indução nas classes III e IV: pulso de metilprednisolona seguido de corticoide oral em dose menor, associado a micofenolato ou ciclofosfamida em dose baixa. Belimumabe ou inibidor de calcineurina podem ser associados desde o início.',
   'Manutenção por pelo menos 3 anos com micofenolato ou azatioprina.',
   'Sempre: inibidor da ECA ou bloqueador do receptor de angiotensina, controle pressórico e hidroxicloroquina.']},
  {h:'Tratamento geral',list:[
   'Hidroxicloroquina para todos, até 5 mg/kg/dia de peso real, com avaliação oftalmológica de base e anual a partir do quinto ano.',
   'Corticoide na menor dose e pelo menor tempo; meta de manutenção de 5 mg/dia de prednisona ou menos, com tentativa de retirada.',
   'Poupadores conforme o órgão: metotrexato (pele e articulação), azatioprina, micofenolato.',
   'Biológicos: belimumabe e anifrolumabe em doença ativa apesar do tratamento padrão.',
   'Fotoproteção, vacinas, controle de risco cardiovascular e saúde óssea.']},
  {h:'Situações especiais',list:[
   '<strong>Gestação:</strong> planejar com doença inativa por 6 meses. Manter hidroxicloroquina; azatioprina é permitida. Micofenolato, metotrexato e ciclofosfamida são contraindicados. Pesquisar anti-Ro, anti-La e antifosfolípides; ácido acetilsalicílico em dose baixa para prevenir pré-eclâmpsia.',
   '<strong>Lúpus induzido por drogas:</strong> hidralazina, procainamida, isoniazida, minociclina, anti-TNF. Anti-histona positivo, rim e sistema nervoso poupados, melhora com a suspensão.',
   '<strong>Neuropsiquiátrico:</strong> excluir infecção, distúrbio metabólico e efeito de corticoide antes de atribuir ao lúpus.']}
 ],
 flow:{title:'Suspeita de lúpus',nodes:[
  {k:'start',t:'Mulher jovem com artrite, lesão cutânea fotossensível, citopenia ou serosite'},
  {k:'ask',t:'FAN em título de 1:80 ou mais?',yes:'Seguir com os critérios',no:'Lúpus improvável; rever diagnóstico'},
  {k:'do',t:'Pedir anti-DNA, anti-Sm, C3, C4, hemograma, urina, relação proteína/creatinina, antifosfolípides'},
  {k:'ask',t:'Proteinúria de 0,5 g/dia ou mais, ou sedimento ativo?',yes:'Biópsia renal e tratamento conforme a classe',no:'Seguir'},
  {k:'ask',t:'Manifestação que ameaça órgão (rim, sistema nervoso, hemólise grave, hemorragia alveolar)?',yes:'Pulso de corticoide e imunossupressor',no:'Hidroxicloroquina e corticoide em dose baixa se preciso'},
  {k:'end',t:'Meta: remissão ou baixa atividade com prednisona de 5 mg/dia ou menos'}]},
 reasoning:[
  'Anti-Sm confirma; anti-DNA acompanha. Use cada um para a pergunta certa.',
  'Urina é sinal vital do lúpus: peça sempre.',
  'Febre em lúpico imunossuprimido é infecção até prova em contrário.',
  'Complemento baixo com anti-DNA subindo antecipa atividade, mesmo sem sintoma.'],
 mnemonics:[
  {n:'Entrada + 10',t:'FAN abre a porta; 10 pontos classificam.'},
  {n:'Sm = Só no lúpus; DNA = Dinâmico',t:'Anti-Sm é o específico fixo; anti-DNA oscila com atividade.'},
  {n:'III e IV proliferam',t:'São as classes que pedem indução agressiva.'},
  {n:'HCQ para todos',t:'Hidroxicloroquina reduz atividade, trombose e mortalidade.'}],
 pitfalls:[
  'Diagnosticar lúpus só por FAN positivo, que ocorre em pessoas saudáveis.',
  'Aumentar corticoide em paciente febril sem excluir infecção.',
  'Deixar de pedir urina em consulta de rotina.',
  'Manter prednisona em dose média por anos.',
  'Prescrever micofenolato a mulher sem contracepção eficaz.'],
 recall:[
  {q:'Paciente lúpica com febre, PCR de 180 mg/L e leucócitos de 14.000. O que é mais provável e o que fazer?',a:'Infecção. Colher culturas, buscar foco e iniciar antibiótico; não escalar imunossupressão antes de excluir.'},
  {q:'Qual achado laboratorial isolado indica investigação de nefrite?',a:'Proteinúria persistente de 0,5 g/dia ou mais, ou sedimento com hematúria dismórfica e cilindros.'},
  {q:'Como é a indução da nefrite classe IV?',a:'Pulso de metilprednisolona e corticoide oral em dose reduzida, com micofenolato ou ciclofosfamida em dose baixa, podendo associar belimumabe ou inibidor de calcineurina; depois manutenção por pelo menos 3 anos.'},
  {q:'Quais imunossupressores são permitidos na gestação?',a:'Hidroxicloroquina e azatioprina, além de corticoide em dose baixa. Micofenolato, metotrexato e ciclofosfamida são contraindicados.'},
  {q:'O que sugere lúpus induzido por droga?',a:'Uso de hidralazina, procainamida, isoniazida, minociclina ou anti-TNF, anti-histona positivo, ausência de nefrite e de quadro neurológico, e melhora após suspender.'},
  {q:'Qual a dose máxima de hidroxicloroquina e o seguimento?',a:'Até 5 mg/kg/dia de peso real, com exame oftalmológico de base e anual após 5 anos de uso.'}],
 practice:[
  'Registre em cada consulta: pressão, urina, hemograma, creatinina, C3, C4 e anti-DNA.',
  'Revise a dose de prednisona sempre; cada miligrama a menos conta.',
  'Discuta contracepção e planejamento de gestação com toda mulher em idade fértil.'],
 refs:[
  {t:'Aringer M, et al. 2019 EULAR/ACR classification criteria for systemic lupus erythematosus. Ann Rheum Dis. 2019.',q:'2019 EULAR ACR classification criteria systemic lupus erythematosus Aringer'},
  {t:'Fanouriakis A, et al. EULAR recommendations for the management of systemic lupus erythematosus: 2023 update. Ann Rheum Dis. 2024.',q:'EULAR recommendations management systemic lupus erythematosus 2023 update Fanouriakis'},
  {t:'KDIGO 2024 Clinical Practice Guideline for the management of lupus nephritis. Kidney Int. 2024.',q:'KDIGO 2024 clinical practice guideline lupus nephritis'}],
 note:'Síntese de critérios e recomendações internacionais.'
},
'reuma2_1':{
 updated:'2026-11',
 pretest:['Quantas vezes e com que intervalo o anticorpo precisa ser positivo?','Por que o TTPa pode estar prolongado em uma doença que causa trombose?','Qual anticoagulante usar na trombose arterial com tripla positividade?','O que usar na gestante com a forma obstétrica?'],
 sections:[
  {h:'Definição',p:[
   'Trombofilia autoimune adquirida. Exige um evento clínico (trombose venosa, arterial ou de microcirculação, ou morbidade gestacional) e a presença persistente de anticorpos antifosfolípides, confirmada em duas dosagens com pelo menos 12 semanas de intervalo. Pode ser primária ou associada ao lúpus.',
   'Os anticorpos se ligam à beta-2 glicoproteína I em superfícies celulares e ativam endotélio, plaquetas e complemento. O resultado é trombose in vivo.']},
  {h:'Os três exames',table:{head:['Teste','Observação'],rows:[
   ['Anticoagulante lúpico','O que mais se associa a trombose. É um teste funcional: prolonga o TTPa e não corrige com mistura de plasma normal'],
   ['Anticardiolipina IgG e IgM','Valoriza-se título médio ou alto'],
   ['Anti-beta-2 glicoproteína I IgG e IgM','Valoriza-se título acima do percentil 99']]},
   p:['Tripla positividade (os três testes positivos) é o perfil de maior risco. Heparina, varfarina e anticoagulantes orais diretos interferem no anticoagulante lúpico; interprete com cuidado e, se possível, colha fora do evento agudo e da anticoagulação.']},
  {h:'Quando suspeitar',list:[
   'Trombose venosa ou arterial em pessoa jovem, sem fator de risco, ou em sítio incomum.',
   'AVC ou AIT antes dos 50 anos.',
   'Três ou mais abortos consecutivos antes de 10 semanas, perda fetal com 10 semanas ou mais, ou parto antes de 34 semanas por pré-eclâmpsia grave ou insuficiência placentária.',
   'Livedo reticular ou racemoso, plaquetopenia leve, vegetações valvares estéreis, TTPa prolongado sem explicação, VDRL falso-positivo.',
   'Todo paciente com lúpus deve ser testado.']},
  {h:'Tratamento por cenário',table:{head:['Cenário','Conduta'],rows:[
   ['Anticorpos sem evento, perfil de alto risco','Ácido acetilsalicílico em dose baixa; controlar fatores de risco cardiovascular'],
   ['Primeira trombose venosa','Varfarina com INR de 2 a 3, por tempo indeterminado'],
   ['Trombose arterial','Varfarina com INR de 2 a 3 associada a ácido acetilsalicílico, ou INR de 3 a 4, pesando sangramento'],
   ['Forma obstétrica, gestante','Ácido acetilsalicílico em dose baixa e heparina em dose profilática na gestação e por 6 semanas após o parto'],
   ['Forma trombótica, gestante','Ácido acetilsalicílico em dose baixa e heparina em dose terapêutica; varfarina é teratogênica'],
   ['Forma catastrófica','Anticoagulação plena, corticoide em dose alta e plasmaférese ou imunoglobulina']]},
   after:'Anticoagulantes orais diretos devem ser evitados em tripla positividade e em eventos arteriais: no estudo TRAPS, a rivaroxabana teve mais eventos que a varfarina.'},
  {h:'Forma catastrófica',p:[
   'Trombose de pequenos vasos em três ou mais órgãos em menos de uma semana, com falência de múltiplos órgãos. Gatilhos: infecção, cirurgia, suspensão de anticoagulante. Mortalidade alta. Tratar o gatilho e iniciar a terapia tripla sem esperar confirmação.']}
 ],
 flow:{title:'Do evento ao tratamento',nodes:[
  {k:'start',t:'Trombose em jovem, sítio incomum ou morbidade gestacional'},
  {k:'do',t:'Pedir anticoagulante lúpico, anticardiolipina e anti-beta-2 glicoproteína I'},
  {k:'ask',t:'Algum positivo?',yes:'Repetir em 12 semanas ou mais',no:'Investigar outras causas'},
  {k:'ask',t:'Persistente na segunda dosagem?',yes:'Síndrome antifosfolípide confirmada',no:'Positividade transitória (infecção, fármacos)'},
  {k:'ask',t:'Evento arterial ou tripla positividade?',yes:'Varfarina; não usar anticoagulante oral direto',no:'Varfarina com INR de 2 a 3'},
  {k:'ask',t:'Gestante ou planejando gestação?',yes:'Trocar por heparina e associar ácido acetilsalicílico',no:'Manter varfarina'},
  {k:'end',t:'Anticoagulação por tempo indeterminado e controle de fatores de risco'}]},
 reasoning:[
  'Uma dosagem positiva não fecha diagnóstico. Infecções positivam transitoriamente.',
  'TTPa prolongado que não corrige na mistura, em paciente sem sangramento, sugere anticoagulante lúpico.',
  'O risco é definido pelo perfil de anticorpos, não só pela presença deles.',
  'Antes de engravidar, a paciente em varfarina precisa de plano de transição para heparina.'],
 mnemonics:[
  {n:'2 x 12',t:'Dois exames positivos, com 12 semanas de intervalo.'},
  {n:'Tripla = Tradicional',t:'Tripla positividade pede varfarina, o anticoagulante tradicional.'},
  {n:'3, 10, 34',t:'Três abortos precoces, perda com 10 semanas ou mais, parto antes de 34 semanas.'}],
 pitfalls:[
  'Diagnosticar com uma única dosagem.',
  'Usar rivaroxabana em paciente com evento arterial ou tripla positividade.',
  'Suspender anticoagulação após alguns meses como em trombose provocada.',
  'Manter varfarina no primeiro trimestre.',
  'Interpretar anticoagulante lúpico colhido em uso de anticoagulante sem considerar a interferência.'],
 recall:[
  {q:'Mulher de 32 anos com AVC isquêmico e os três anticorpos positivos, confirmados após 12 semanas. Qual a anticoagulação?',a:'Varfarina, com INR de 2 a 3 associada a ácido acetilsalicílico ou INR de 3 a 4. Anticoagulantes orais diretos são contraindicados nesse perfil.'},
  {q:'Qual a conduta na gestante com três abortos precoces e anticorpos persistentes, sem trombose prévia?',a:'Ácido acetilsalicílico em dose baixa e heparina em dose profilática durante a gestação e por 6 semanas no puerpério.'},
  {q:'Como reconhecer a forma catastrófica?',a:'Acometimento de três ou mais órgãos em menos de uma semana por microtrombose, geralmente após infecção, cirurgia ou suspensão do anticoagulante.'},
  {q:'O que fazer com portador assintomático de tripla positividade?',a:'Ácido acetilsalicílico em dose baixa como prevenção primária, controle rigoroso de fatores de risco e profilaxia em situações de risco, como cirurgia e puerpério.'},
  {q:'Por que o VDRL pode ser falso-positivo?',a:'Porque o reagente contém cardiolipina, reconhecida pelos anticorpos.'}],
 practice:[
  'Anote a data da primeira dosagem e agende a segunda.',
  'Oriente a paciente em varfarina sobre contracepção: evitar estrogênio.',
  'Em cirurgia, planeje ponte com heparina e o menor tempo possível sem anticoagulante.'],
 refs:[
  {t:'Tektonidou MG, et al. EULAR recommendations for the management of antiphospholipid syndrome in adults. Ann Rheum Dis. 2019.',q:'EULAR recommendations management antiphospholipid syndrome adults Tektonidou 2019'},
  {t:'Barbhaiya M, et al. 2023 ACR/EULAR antiphospholipid syndrome classification criteria. Ann Rheum Dis. 2023.',q:'2023 ACR EULAR antiphospholipid syndrome classification criteria Barbhaiya'},
  {t:'Pengo V, et al. Rivaroxaban vs warfarin in high-risk patients with antiphospholipid syndrome (TRAPS). Blood. 2018.',q:'Pengo rivaroxaban warfarin high-risk antiphospholipid syndrome Blood 2018'}],
 note:'Síntese de recomendações internacionais. Os critérios de classificação de 2023 usam pontuação por domínios; os critérios de Sydney ainda são os mais cobrados.'
},
'reuma2_2':{
 updated:'2026-11',
 pretest:['Qual vasculite de médio calibre poupa pulmão e glomérulo?','Idoso com cefaleia nova e claudicação de mandíbula: o que fazer antes da biópsia?','Quais as três causas principais de síndrome pulmão-rim?','Qual ANCA se associa à granulomatose com poliangiite?'],
 sections:[
  {h:'Pensar pelo calibre do vaso',p:[
   'O tamanho do vaso inflamado prevê a clínica. Vaso grande dá claudicação e assimetria de pulsos. Vaso médio dá infarto de órgão, nódulos e mononeurite. Vaso pequeno dá púrpura palpável, glomerulonefrite e hemorragia alveolar.'],
   table:{head:['Calibre','Doenças','Clínica típica'],rows:[
    ['Grande','Arterite de células gigantes, arterite de Takayasu','Claudicação de membros ou mandíbula, sopros, diferença de pressão entre os braços, perda visual'],
    ['Médio','Poliarterite nodosa, doença de Kawasaki','Nódulos, livedo, mononeurite múltipla, dor testicular, hipertensão renovascular, microaneurismas'],
    ['Pequeno, associado a ANCA','Granulomatose com poliangiite, poliangiite microscópica, granulomatose eosinofílica com poliangiite','Glomerulonefrite pauci-imune, hemorragia alveolar, via aérea superior'],
    ['Pequeno, por imunocomplexos','Vasculite por IgA, crioglobulinêmica, doença antimembrana basal','Púrpura palpável, artralgia, nefrite, complemento baixo'],
    ['Variável','Doença de Behçet','Úlceras orais e genitais, uveíte, trombose venosa']]}},
  {h:'Grandes vasos',list:[
   '<strong>Arterite de células gigantes:</strong> acima de 50 anos, cefaleia nova, hipersensibilidade do couro cabeludo, claudicação de mandíbula, polimialgia reumática, VHS e PCR altas. Risco de cegueira por neuropatia óptica isquêmica. Iniciar corticoide imediatamente (prednisona de 40 a 60 mg; pulso se houver sintoma visual) e biopsiar a artéria temporal em até cerca de 2 semanas. Ultrassom com sinal do halo ajuda. Tocilizumabe poupa corticoide.',
   '<strong>Arterite de Takayasu:</strong> mulher jovem, claudicação de braço, pulsos diminuídos, diferença de pressão acima de 10 mmHg entre os braços, sopros. Angiorressonância ou angiotomografia confirmam.']},
  {h:'Poliarterite nodosa',p:[
   'ANCA negativo. Associa-se à hepatite B. Acomete artérias de médio calibre de rim, intestino, nervos e pele, com microaneurismas na angiografia. Por definição, não causa glomerulonefrite nem capilarite pulmonar. Se há pulmão ou glomérulo, o diagnóstico é outro.']},
  {h:'Vasculites associadas ao ANCA',table:{head:['','Granulomatose com poliangiite','Poliangiite microscópica','Eosinofílica com poliangiite'],rows:[
   ['ANCA','c-ANCA, anti-PR3','p-ANCA, anti-MPO','p-ANCA em cerca de 40%'],
   ['Marca','Sinusite, epistaxe, nariz em sela, nódulos e cavitações pulmonares','Síndrome pulmão-rim sem granuloma; fibrose pulmonar','Asma, eosinofilia, neuropatia'],
   ['Granuloma','Sim','Não','Sim'],
   ['Risco principal','Recidiva','Rim','Coração']]},
   p:['No rim, as três causam glomerulonefrite necrosante com crescentes e pouca ou nenhuma imunofluorescência (pauci-imune).']},
  {h:'Síndrome pulmão-rim',p:[
   'Hemorragia alveolar com glomerulonefrite rapidamente progressiva. Três grupos: vasculite associada ao ANCA (o mais comum), doença antimembrana basal glomerular (imunofluorescência linear) e lúpus (complemento baixo, depósito granular). Queda de hemoglobina com infiltrado difuso é hemorragia alveolar, mesmo sem hemoptise.']},
  {h:'Imunocomplexos e outras',list:[
   '<strong>Vasculite por IgA:</strong> criança, púrpura em membros inferiores e nádegas, artralgia, dor abdominal, nefrite. Tratamento de suporte na maioria.',
   '<strong>Crioglobulinêmica:</strong> púrpura, artralgia e fraqueza, C4 baixo, fator reumatoide positivo. Pesquisar hepatite C.',
   '<strong>Behçet:</strong> úlceras orais recorrentes com úlceras genitais, uveíte, patergia e trombose venosa.']},
  {h:'Tratamento das associadas ao ANCA',list:[
   'Indução em doença grave: corticoide em esquema de dose reduzida associado a rituximabe ou ciclofosfamida. Rituximabe é preferido em recidiva.',
   'Avacopan pode substituir boa parte do corticoide.',
   'Plasmaférese: considerar na glomerulonefrite com creatinina acima de cerca de 3,4 mg/dL; não é rotina na hemorragia alveolar.',
   'Doença não grave: rituximabe, ou metotrexato ou micofenolato.',
   'Manutenção: rituximabe por 24 a 48 meses.',
   'Profilaxia para Pneumocystis com sulfametoxazol-trimetoprima durante a indução.',
   'Eosinofílica recidivante ou refratária sem gravidade: mepolizumabe.']},
  {h:'Imitadores',p:[
   'Antes de imunossuprimir, exclua endocardite infecciosa, embolia de colesterol, síndrome antifosfolípide, mixoma atrial e uso de cocaína adulterada com levamisol. Todos podem dar púrpura, isquemia digital e ANCA positivo.']}
 ],
 flow:{title:'Suspeita de vasculite sistêmica',nodes:[
  {k:'start',t:'Sintomas constitucionais com lesão de mais de um órgão'},
  {k:'do',t:'Excluir imitadores: hemoculturas, ecocardiograma, sorologias, uso de drogas'},
  {k:'ask',t:'Mais de 50 anos com cefaleia nova, sintoma visual ou claudicação de mandíbula?',yes:'Corticoide imediato; biópsia ou ultrassom depois',no:'Seguir'},
  {k:'ask',t:'Pulsos assimétricos ou sopros?',yes:'Angiorressonância ou angiotomografia',no:'Seguir'},
  {k:'ask',t:'Púrpura palpável, hematúria com cilindros ou infiltrado pulmonar?',yes:'ANCA, anti-MBG, complemento, crioglobulinas; biópsia',no:'Considerar médio calibre: angiografia, sorologia de hepatite B'},
  {k:'ask',t:'Síndrome pulmão-rim ou creatinina subindo rápido?',yes:'Pulso de corticoide com rituximabe ou ciclofosfamida, sem esperar a biópsia',no:'Tratamento conforme gravidade'},
  {k:'end',t:'Manutenção, profilaxias e vigilância de recidiva'}]},
 reasoning:[
  'Glomerulonefrite ou capilarite pulmonar excluem poliarterite nodosa.',
  'Asma de difícil controle com eosinofilia e pé caído: granulomatose eosinofílica.',
  'Sintoma visual na arterite de células gigantes é emergência; o corticoide não atrapalha a biópsia nos primeiros dias.',
  'ANCA positivo sem clínica compatível não é vasculite.'],
 mnemonics:[
  {n:'c-PR3 = GPA; p-MPO = PAM',t:'As letras iniciais ajudam: c com granulomatose, p com microscópica.'},
  {n:'PAN poupa P e G',t:'Poliarterite nodosa poupa Pulmão e Glomérulo.'},
  {n:'ELK',t:'Granulomatose com poliangiite: Ear-nose-throat, Lung, Kidney.'},
  {n:'Tríade de Meltzer',t:'Púrpura, artralgia e fraqueza na crioglobulinemia.'}],
 pitfalls:[
  'Esperar a biópsia de temporal para iniciar corticoide em quem tem sintoma visual.',
  'Chamar de poliarterite nodosa um quadro com glomerulonefrite.',
  'Imunossuprimir endocardite com ANCA falso-positivo.',
  'Esquecer a profilaxia para Pneumocystis.',
  'Descartar hemorragia alveolar por não haver hemoptise.'],
 recall:[
  {q:'Homem de 55 anos, sinusite crônica com crostas, nódulos pulmonares cavitados e hematúria dismórfica. Qual o diagnóstico e o anticorpo esperado?',a:'Granulomatose com poliangiite, com c-ANCA e anti-PR3.'},
  {q:'Qual a conduta inicial na síndrome pulmão-rim com ANCA positivo?',a:'Pulso de metilprednisolona associado a rituximabe ou ciclofosfamida; considerar plasmaférese se creatinina muito elevada; suporte ventilatório.'},
  {q:'O que diferencia poliangiite microscópica de poliarterite nodosa?',a:'A microscópica acomete pequenos vasos, com glomerulonefrite e capilarite pulmonar e p-ANCA. A nodosa acomete médio calibre, tem ANCA negativo e poupa glomérulo e pulmão.'},
  {q:'Mulher de 72 anos com cefaleia temporal e visão turva transitória. Conduta?',a:'Corticoide em dose alta imediatamente, de preferência pulso intravenoso pelo sintoma visual, e biópsia de artéria temporal ou ultrassom nos dias seguintes.'},
  {q:'Qual sorologia pedir na crioglobulinemia mista?',a:'Hepatite C, a causa mais comum.'}],
 practice:[
  'Palpe pulsos e meça a pressão nos dois braços em toda suspeita.',
  'Peça urina com pesquisa de dismorfismo: é o exame mais barato para achar vasculite renal.',
  'Na dúvida entre infecção e vasculite, colha culturas antes de qualquer imunossupressor.'],
 refs:[
  {t:'Hellmich B, et al. EULAR recommendations for the management of ANCA-associated vasculitis: 2022 update. Ann Rheum Dis. 2024.',q:'EULAR recommendations management ANCA-associated vasculitis 2022 update Hellmich'},
  {t:'Jennette JC, et al. 2012 revised International Chapel Hill Consensus Conference nomenclature of vasculitides. Arthritis Rheum. 2013.',q:'2012 revised International Chapel Hill Consensus Conference nomenclature vasculitides Jennette'},
  {t:'Kitching AR, et al. ANCA-associated vasculitis. Nat Rev Dis Primers. 2020.',q:'Kitching ANCA-associated vasculitis Nat Rev Dis Primers 2020'}],
 note:'Síntese de nomenclatura e recomendações internacionais.'
}
});
