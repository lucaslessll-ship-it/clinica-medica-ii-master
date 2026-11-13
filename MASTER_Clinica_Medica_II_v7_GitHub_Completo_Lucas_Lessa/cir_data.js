/* MASTER · Cirurgia (P2 do 8º período). Estrutura dos temas conforme o checklist da disciplina.
   Cada aula tem o conteúdo aprofundado em LessonDeep com a chave "<id>_<índice>". */
(()=>{
const T=(id,block,title,short,priority,focus,chapters)=>({id,block,title,short,priority,focus,chapters});
const C=(name,hy)=>({name,hy});
window.MASTER_CIR_DATA={
 exam:{written:'2026-11-19T13:30:00-03:00',practical:'2026-12-04T08:00:00-03:00'},
 blocks:[
  ['P2','Cirurgia (P2)','Conteúdo novo da prova escrita de 19/11'],
  ['RAD','Radiologia','Semestre inteiro, 5 questões'],
  ['URO','Urologia','Semestre inteiro, 5 questões'],
  ['P1','Cirurgia (P1, revisão)','Conteúdo cumulativo da primeira prova']
 ],
 topics:[
  T('ciraa','P2','Abdome agudo','Abdome agudo',5,'Classificar a síndrome, reconhecer quem opera agora e escolher o exame certo',[
   C('Abordagem do abdome agudo','Cinco síndromes, sinais de peritonite e quando a imagem não deve atrasar a cirurgia'),
   C('Apendicite aguda','Alvarado, imagem por grupo de paciente e conduta na apendicite complicada'),
   C('Colecistite aguda e colangite','Critérios e graus de Tóquio, tríade de Charcot e pêntade de Reynolds, momento da colecistectomia'),
   C('Diverticulite aguda','Hinchey, TC como exame padrão, quem drena, quem opera e colonoscopia depois'),
   C('Abdome agudo obstrutivo','Delgado versus cólon, bridas, volvo de sigmoide e sinais de sofrimento de alça'),
   C('Abdome agudo perfurativo','Pneumoperitônio, úlcera perfurada e conduta cirúrgica'),
   C('Abdome agudo vascular','Isquemia mesentérica: dor desproporcional ao exame, angioTC e revascularização'),
   C('Abdome agudo hemorrágico','Gravidez ectópica rota, aneurisma roto e ruptura de víscera sólida')
  ]),
  T('cirpanc','P2','Pâncreas','Pâncreas',5,'Diagnosticar e graduar a pancreatite, manejar coleções e reconhecer tumores',[
   C('Pancreatite aguda','Dois de três critérios, Atlanta revisado, hidratação e dieta precoce'),
   C('Complicações locais da pancreatite','Coleções agudas, pseudocisto, necrose encapsulada e abordagem em degraus'),
   C('Pancreatite crônica','Álcool, dor, insuficiência exócrina e endócrina, calcificações e cirurgia'),
   C('Tumores do pâncreas','Adenocarcinoma, ressecabilidade, Whipple, neoplasias císticas e neuroendócrinas')
  ]),
  T('cirher','P2','Hérnias da parede abdominal','Hérnias',4,'Anatomia inguinal, classificação de Nyhus e quando operar com urgência',[
   C('Anatomia da região inguinal e classificação','Triângulo de Hesselbach, direta versus indireta, Nyhus'),
   C('Hérnia inguinal e femoral: tratamento','Lichtenstein, técnicas videolaparoscópicas e por que a femoral sempre opera'),
   C('Hérnias ventrais e outras','Umbilical, epigástrica, incisional, Spiegel, obturadora e Richter'),
   C('Hérnia encarcerada e estrangulada','Redução, sinais de sofrimento e cirurgia de urgência')
  ]),
  T('cirtabd','P2','Trauma abdominal','Trauma abdominal',5,'Decidir entre laparotomia, TC e tratamento não operatório',[
   C('Avaliação inicial e exames no trauma abdominal','FAST, eFAST, lavado peritoneal, TC e indicações de laparotomia'),
   C('Trauma de baço e fígado','Graus da AAST e critérios para tratamento não operatório'),
   C('Vísceras ocas, penetrante, pelve e retroperitônio','Ferimento por arma branca versus fogo, zonas do retroperitônio'),
   C('Controle de danos e síndrome compartimental','Tríade letal, cirurgia abreviada e pressão intra-abdominal')
  ]),
  T('cirttor','P2','Trauma torácico','Trauma torácico',5,'Reconhecer e tratar as lesões que matam no exame primário',[
   C('Lesões com risco imediato de morte','Pneumotórax hipertensivo, aberto, hemotórax maciço, tamponamento e tórax instável'),
   C('Drenagem torácica e toracotomia','Local da drenagem, critérios de toracotomia e toracotomia de reanimação'),
   C('Lesões potencialmente letais do exame secundário','Contusão pulmonar, aorta, diafragma, traqueobrônquica, esôfago e coração')
  ]),
  T('cirproc','P2','Coloproctologia','Coloprocto',4,'Doenças anorretais e câncer colorretal sob a ótica cirúrgica',[
   C('Doença hemorroidária','Interna versus externa, graus de Goligher e tratamento por grau'),
   C('Fissura, abscesso e fístula anal','Diagnóstico, drenagem, regra de Goodsall e tratamento'),
   C('Câncer colorretal: rastreamento, estadiamento e cirurgia','Colonoscopia, TNM, reto versus cólon e neoadjuvância'),
   C('Outras doenças anorretais','Cisto pilonidal, prolapso retal, condiloma e câncer de canal anal')
  ]),
  T('cirremit','P2','REMIT, cicatrização e queimaduras','REMIT e queimaduras',4,'Fisiologia do trauma, fases da cicatrização e atendimento ao queimado',[
   C('Resposta endócrino-metabólica ao trauma','Fase ebb e flow, hormônios, catabolismo e como modular'),
   C('Cicatrização de feridas','Fases, tipos de intenção, fatores que atrapalham, queloide e cicatriz hipertrófica'),
   C('Queimaduras: classificação e avaliação','Profundidade, regra dos nove, Lund-Browder e critérios de grande queimado'),
   C('Queimaduras: atendimento e reposição','Via aérea, Parkland, diurese alvo, escarotomia, inalatória e elétrica')
  ]),
  T('cirvasc','P2','Doença vascular','Vascular',4,'Isquemia arterial, aneurisma e doença venosa',[
   C('Doença arterial obstrutiva periférica','Claudicação, ITB, Fontaine e Rutherford, tratamento clínico e revascularização'),
   C('Isquemia arterial aguda','Embolia versus trombose, os seis Ps, Rutherford e síndrome de reperfusão'),
   C('Aneurisma de aorta e dissecção','Quando operar o aneurisma, rotura e classificação de Stanford'),
   C('Doença venosa: varizes e trombose venosa profunda','CEAP, Wells, D-dímero, anticoagulação e prevenção')
  ]),
  T('cirrad','RAD','Radiologia','Radiologia',3,'Saber o que pedir e o que olhar na imagem',[
   C('Radiografia no abdome agudo','Rotina de abdome agudo, pneumoperitônio, níveis hidroaéreos e grão de café'),
   C('Tomografia no abdome agudo','Apendicite, diverticulite, isquemia e obstrução na TC'),
   C('Trauma e FAST','Janelas do FAST, eFAST e TC no trauma'),
   C('Hemorragia digestiva na imagem','AngioTC, cintilografia e arteriografia com embolização'),
   C('Esôfago, estômago e duodeno','Esofagograma, acalasia, divertículos e úlcera'),
   C('Fígado e pâncreas','Lesões hepáticas focais, colangiorressonância e TC da pancreatite')
  ]),
  T('ciruro','URO','Urologia','Urologia',3,'Diagnóstico e conduta nos temas urológicos do semestre',[
   C('Introdução, fisiologia e semiologia urológica','Hematúria, sintomas do trato urinário inferior e exames'),
   C('Litíase urinária','Cólica renal, TC sem contraste, expulsão medicamentosa e quando desobstruir'),
   C('Uropatia obstrutiva e hiperplasia prostática benigna','Hidronefrose, IPSS, alfabloqueador, 5-ARI e cirurgia'),
   C('Infecções inespecíficas e tuberculose urogenital','Cistite, pielonefrite, prostatite e piúria estéril'),
   C('Oncologia urológica I: próstata e bexiga','PSA, Gleason, hematúria no tabagista e RTU'),
   C('Oncologia urológica II: rim, testículo e pênis','Tríade clássica, marcadores tumorais e orquiectomia inguinal')
  ]),
  T('ciresof','P1','Esôfago','Esôfago',3,'DRGE, Barrett, acalasia e câncer',[
   C('DRGE e esôfago de Barrett','Sintomas, endoscopia, pHmetria, fundoplicatura e vigilância'),
   C('Acalasia e divertículos','Manometria, Chicago, miotomia e Zenker'),
   C('Câncer de esôfago','Escamoso versus adenocarcinoma, estadiamento e tratamento')
  ]),
  T('cirestom','P1','Estômago','Estômago',3,'Úlcera complicada e câncer gástrico',[
   C('Doença ulcerosa péptica e complicações','Sangramento, perfuração, obstrução e cirurgias'),
   C('Câncer gástrico','Lauren, Borrmann, estadiamento e gastrectomia com linfadenectomia D2')
  ]),
  T('cirvb','P1','Vias biliares','Vias biliares',4,'Colelitíase, coledocolitíase e tumores',[
   C('Colelitíase e suas complicações','Cólica biliar, indicações de colecistectomia, vesícula em porcelana'),
   C('Coledocolitíase e estratificação de risco','Probabilidade alta, intermediária e baixa, CPRE e colangiorressonância'),
   C('Tumores das vias biliares','Colangiocarcinoma, Klatskin, Bismuth e câncer de vesícula')
  ]),
  T('cirfig','P1','Fígado','Fígado',3,'Lesões hepáticas, abscessos e hipertensão portal',[
   C('Lesões hepáticas benignas e abscessos','Hemangioma, HNF, adenoma, abscesso piogênico e amebiano'),
   C('Tumores hepáticos malignos','Hepatocarcinoma, BCLC e metástases'),
   C('Hipertensão portal','Varizes, profilaxia, sangramento agudo e TIPS')
  ])
 ],
 refs:[
  {t:'American College of Surgeons. ATLS, 10ª edição, 2018',q:'ATLS 10th edition'},
  {t:'Townsend CM et al. Sabiston Textbook of Surgery, 21ª edição',q:'Sabiston Textbook of Surgery 21st edition'},
  {t:'Brunicardi FC et al. Schwartz Principles of Surgery, 11ª edição',q:'Schwartz Principles of Surgery 11th edition'}
 ]
};
})();
