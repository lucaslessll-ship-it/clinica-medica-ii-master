/* Estação 52 — conteúdo autoral, ECG real do arquivo enviado pelo usuário (externo). */
window.OSCE_FA_DATA={
  "id": "fa",
  "number": 52,
  "title": "Fibrilação atrial",
  "subtitle": "ECG verdadeiro do material recebido, decisão clínica e prevenção do AVC",
  "area": "Cardiologia",
  "priority": "alta",
  "status": "validacao",
  "hasRealImage": true,
  "provenance": "Perguntas e enunciado originais do material recebido foram utilizados como referência de ensino; a vinheta didática, comentários, checklists e explicações desta estação são elaborados pelo Master.",
  "revision": "Revisão didática 21/11/2026; recomendações da Diretriz Brasileira de Fibrilação Atrial 2025 e ESC 2024; validar com protocolos locais.",
  "caseText": "Homem de 69 anos, com hipertensão arterial e diabetes mellitus tipo 2, procura atendimento por palpitações e dispneia aos esforços. Não foram informados pressão arterial, fração de ejeção nem duração da arritmia. O registro eletrocardiográfico exibido abaixo foi fornecido com o caso.",
  "images": [
    {
      "src": "assets/osce/ecg-estacao-52.jpg",
      "alt": "ECG original recebido para a estação 52 — fibrilação atrial; imagem clínica real, comprimida para exibição na web.",
      "caption": "ECG do material recebido — arquivo i-031.jpg. Observe RR e atividade atrial antes de revelar a interpretação.",
      "kind": "real"
    }
  ],
  "essential": {
    "oneMinute": "Fibrilação atrial: taquiarritmia supraventricular com RR irregularmente irregular e ausência de ondas P sinusais consistentes. No caso: palpitações, dispneia e ECG compatível; procure instabilidade primeiro. Confirme em ECG e investigue função ventricular/valvas por ecocardiograma. Se estável, escolha controle de frequência ou ritmo considerando função cardíaca e sintomas; se instabilidade atribuível à arritmia, cardioversão sincronizada imediata. Prevenção do AVC: CHA₂DS₂-VA = 3 (idade 65–74, HAS, diabetes), indicando anticoagulação oral salvo contraindicação. Armadilha: ecocardiograma não substitui escore clínico de risco embólico. Contraste: flutter tende a exibir atividade atrial organizada em serrilha. Pergunta: quais são os três primeiros passos?",
    "mnemonic": "AF-CARE: comorbidades, evitar AVC, reduzir sintomas, reavaliar. Primeiro: ESTÁVEL? depois: RITMO? depois: EMBOLIA.",
    "clues": [
      "Palpitações e dispneia",
      "RR irregular no ECG, sem P sinusais consistentes",
      "HAS + DM + 69 anos → CHA₂DS₂-VA = 3"
    ],
    "trap": "A questão original pergunta por 'exame complementar' para risco tromboembólico. Corrija o enquadramento: escore clínico CHA₂DS₂-VA é central; TTE avalia estrutura, TEE pode excluir trombo em planejamento de cardioversão conforme indicação.",
    "contrast": "Flutter geralmente apresenta ativação atrial organizada; FA apresenta desorganização atrial e irregularidade ventricular."
  },
  "tiers": {
    "essencial": {
      "label": "Essencial",
      "minutes": 1,
      "ids": [
        "ecg"
      ],
      "description": "Uma pergunta de reconhecimento do ECG e illness script."
    },
    "rapida": {
      "label": "Revisão rápida",
      "minutes": 5,
      "ids": [
        "ecg",
        "risco",
        "frequencia",
        "anticoagulacao"
      ],
      "description": "ECG, risco embólico, controle de frequência e anticoagulação."
    },
    "completa": {
      "label": "Completo",
      "minutes": 25,
      "ids": [
        "ecg",
        "anamnese",
        "exame",
        "risco",
        "eco",
        "frequencia",
        "cardioversao",
        "anticoagulacao",
        "sangramento",
        "diferenciais",
        "comunicacao"
      ],
      "description": "Toda a avaliação: imagem, anamnese, condutas e paciente."
    }
  },
  "deeper": [
    {
      "title": "Leitura sistemática do ECG",
      "body": "1) Qualidade e calibração; 2) frequência e RR; 3) atividade atrial e ondas P; 4) QRS e condução; 5) ST-T; 6) correlação com sintomas. O fragmento fornecido sugere RR irregular e ausência de onda P sinusal organizada. Alguns complexos têm morfologia diferente; não classifique sua origem com certeza só com o recorte.",
      "tip": "RITMO → P → QRS → RISCO. O traçado confirma arritmia; o paciente define a urgência."
    },
    {
      "title": "Cuidado com a pergunta original sobre exames",
      "body": "A estratificação tromboembólica para anticoagulação não depende de um exame de imagem isolado: o escore clínico CHA₂DS₂-VA é recomendado nas diretrizes brasileiras de 2025. O ecocardiograma transtorácico avalia função ventricular, valvopatias e estrutura; ecocardiograma transesofágico pesquisa trombo atrial em cenários selecionados de cardioversão.",
      "tip": "Escore = risco de AVC. Eco = estrutura. ETE = trombo em situação apropriada."
    },
    {
      "title": "Controle de frequência versus controle de ritmo",
      "body": "Se instável por FA, cardioversão sincronizada imediata. Se estável, individualizar controle da frequência (betabloqueador, ou verapamil/diltiazem somente se FEVE preservada; digoxina em contextos selecionados) ou controle de ritmo. Identificar insuficiência cardíaca, pré-excitação, doença estrutural e comorbidades muda fármaco e estratégia.",
      "tip": "1. ESTABILIDADE. 2. FEVE. 3. FC/RITMO. 4. AVC."
    },
    {
      "title": "Anticoagulação com CHA₂DS₂-VA",
      "body": "Neste homem: hipertensão 1, idade 65–74 anos 1, diabetes 1 = 3. Para FA não valvar, diretriz brasileira 2025 recomenda anticoagulação com escore ≥2. Preferir anticoagulante oral direto quando elegível, exceto válvula mecânica ou estenose mitral moderada/grave, entre outros contextos que exigem estratégia específica. Avaliar função renal, interações e risco hemorrágico modificável.",
      "tip": "Idade 65–74 + HAS + DM = 3. HAS-BLED orienta correção de fatores, não bloqueio automático."
    },
    {
      "title": "Cardioversão e janela de risco",
      "body": "Instabilidade atribuível à FA exige cardioversão elétrica sincronizada imediata. No paciente estável, duração da arritmia, anticoagulação prévia, presença de trombo e plano pós-cardioversão determinam estratégia; não cardioverter eletivamente sem considerar risco tromboembólico. Em casos com duração desconhecida, considerar anticoagulação adequada e avaliação de trombo segundo protocolo.",
      "tip": "Instável = sincronizada já. Estável = planejar segurança embólica."
    },
    {
      "title": "Pódio da memória",
      "body": "O primeiro lugar é 'ESTÁVEL?' (segurança), o segundo 'COMO CONTROLAR?' (FC/ritmo), o terceiro 'COMO EVITAR AVC?' (CHA₂DS₂-VA). Refaça a sequência sem olhar e explique em 30 segundos como paciente entenderia.",
      "tip": "Estabilidade → Controle → Anticoagulação."
    }
  ],
  "sources": [
    {
      "id": "sbcfa",
      "label": "Diretriz Brasileira de Fibrilação Atrial — SBC/SOBRAC 2025",
      "url": "https://journals.cardiol.br/article/diretriz-brasileira-de-fibrilacao-atrial-2025/",
      "year": 2025
    },
    {
      "id": "escfa",
      "label": "ESC 2024 — Management of Atrial Fibrillation",
      "url": "https://academic.oup.com/eurheartj/article/45/36/3314/7738779",
      "year": 2024
    },
    {
      "id": "aha",
      "label": "ACC/AHA/ACCP/HRS — Fibrilação atrial 2023",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11095842/",
      "year": 2023
    }
  ],
  "terms": [
    {
      "key": "fa",
      "name": "Fibrilação atrial",
      "definition": "Arritmia supraventricular com ativação atrial desorganizada, intervalos RR irregulares e ausência de ondas P sinusais consistentes.",
      "source": "sbcfa"
    },
    {
      "key": "rr",
      "name": "RR irregularmente irregular",
      "definition": "Intervalos entre complexos ventriculares variáveis sem padrão regular; pista no ECG, interpretada junto à atividade atrial.",
      "source": "sbcfa"
    },
    {
      "key": "cha",
      "name": "CHA₂DS₂-VA",
      "definition": "Escore clínico para risco tromboembólico em FA: insuficiência cardíaca, HAS, idade ≥75 (2), DM, AVC/AIT prévio (2), doença vascular e idade 65–74; sem ponto para sexo.",
      "source": "sbcfa"
    },
    {
      "key": "ttr",
      "name": "Ecocardiograma transtorácico",
      "definition": "Exame para avaliar FEVE, câmaras, valvas e cardiopatia estrutural; não substitui escore clínico de risco embólico.",
      "source": "escfa"
    },
    {
      "key": "ete",
      "name": "Ecocardiograma transesofágico",
      "definition": "Em cenários selecionados, auxilia a excluir trombo no átrio/apêndice atrial esquerdo antes de cardioversão.",
      "source": "sbcfa"
    },
    {
      "key": "cardio",
      "name": "Cardioversão sincronizada",
      "definition": "Choque elétrico sincronizado ao complexo QRS para tratar taquiarritmias com pulso quando indicado, sobretudo diante de instabilidade atribuível à FA.",
      "source": "sbcfa"
    },
    {
      "key": "doac",
      "name": "Anticoagulantes orais diretos",
      "definition": "Classe preferida em FA elegível na ausência de válvula mecânica ou estenose mitral moderada/grave, após avaliar contraindicações e função renal.",
      "source": "sbcfa"
    },
    {
      "key": "hasbled",
      "name": "HAS-BLED",
      "definition": "Instrumento de identificação e correção de fatores modificáveis de risco hemorrágico; não é motivo isolado para negar anticoagulação.",
      "source": "sbcfa"
    }
  ],
  "lesson": {
    "kind": "p1",
    "id": "p1arr",
    "label": "Arritmias cardíacas · Biblioteca P1",
    "part": "Fibrilação atrial: AF-CARE e anticoagulação"
  },
  "questions": [
    {
      "id": "ecg",
      "competence": "Leitura de ECG",
      "prompt": "Interprete o ECG apresentado de forma sistemática, sem nomear o diagnóstico antes de apontar os elementos do traçado.",
      "answer": "Traçado compatível com fibrilação atrial: irregularidade dos intervalos RR e ausência de ondas P sinusais constantes. A morfologia de alguns QRS varia; a classificação de complexos largos isolados depende de traçado e contexto adicionais. O recorte não permite avaliar todas as derivações nem o contexto clínico.",
      "criteria": [
        "Avalia regularidade RR",
        "Comenta atividade atrial/ondas P",
        "Identifica padrão compatível com FA",
        "Evita superinterpretação de complexos de morfologia diferente"
      ],
      "hints": [
        "Conte a variação entre R consecutivos.",
        "Onde estão ondas P sinusais consistentes?",
        "Compare regularidade e atividade atrial: FA geralmente é irregular e sem P organizadas."
      ],
      "memory": "R–R irregular + P ausente = pense FA.",
      "source": "sbcfa"
    },
    {
      "id": "anamnese",
      "competence": "Anamnese dirigida",
      "prompt": "Quais perguntas ajudam a estabelecer duração, repercussão, causas reversíveis e risco de AVC?",
      "answer": "Investigar início/duração, episódios prévios, dor torácica, dispneia em repouso, síncope, insuficiência cardíaca, hipertireoidismo, infecção, álcool/estimulantes, medicamentos, cardiopatia/valvopatia, anticoagulantes prévios, AVC/AIT, sangramentos e função renal.",
      "criteria": [
        "Investiga sintomas de instabilidade",
        "Pergunta tempo de início da FA",
        "Pesquisa gatilhos e comorbidades",
        "Avalia AVC e histórico hemorrágico"
      ],
      "hints": [
        "Comece pelos sinais que mudam a urgência.",
        "Qual a duração da FA? Há AVC prévio?",
        "Instabilidade, duração, cardiopatia, álcool/TSH, anticoagulação e sangramentos."
      ],
      "memory": "Início → gravidade → gatilhos → trombo.",
      "source": "sbcfa"
    },
    {
      "id": "exame",
      "competence": "Exame físico",
      "prompt": "Qual exame físico dirigido define a urgência neste paciente com palpitações e dispneia?",
      "answer": "Avaliar sinais vitais, PA, perfusão, consciência, oximetria, pulso irregular, frequência ventricular, ausculta cardíaca/pulmonar, sinais de congestão e insuficiência cardíaca. Buscar hipotensão, dor isquêmica, edema agudo ou choque atribuíveis à arritmia.",
      "criteria": [
        "Verifica PA e perfusão",
        "Identifica sinais de insuficiência cardíaca",
        "Confirma irregularidade de pulso e FC",
        "Distingue sinais de instabilidade"
      ],
      "hints": [
        "Avalie primeiro ABC e PA.",
        "Procure edema agudo ou dor isquêmica.",
        "Instabilidade define necessidade de cardioversão imediata."
      ],
      "memory": "AURÍCULA: ausculta, urgência, ritmo, congestão.",
      "source": "sbcfa"
    },
    {
      "id": "risco",
      "competence": "Estratificação de AVC",
      "prompt": "Qual é o escore tromboembólico indicado? Calcule-o neste paciente e explique por que a pergunta original sobre 'exame complementar' é imprecisa.",
      "answer": "Usar CHA₂DS₂-VA (SBC 2025 / ESC 2024). HAS = 1; DM = 1; idade 69 anos = 1. Total 3, com indicação de anticoagulação oral, salvo contraindicações. O risco é estratificado clinicamente, não por um exame complementar único. Ecocardiograma auxilia investigação estrutural e ETE pesquisa trombo em situações selecionadas.",
      "criteria": [
        "Nomeia CHA₂DS₂-VA",
        "Calcula corretamente 3",
        "Indica implicação para anticoagulação",
        "Distingue escore de ecocardiograma/ETE"
      ],
      "hints": [
        "Idade 69 vale quantos?",
        "Some HAS, DM e idade 65–74.",
        "Escore 3; anticoagulação em FA não valvar se elegível."
      ],
      "memory": "H + D + A65 = 3.",
      "source": "sbcfa"
    },
    {
      "id": "eco",
      "competence": "Investigação complementar",
      "prompt": "Quais exames complementares pediria e qual o papel de eco transtorácico e transesofágico?",
      "answer": "ECG de 12 derivações, ecocardiograma transtorácico para FEVE/valvas, eletrólitos, função renal, hemograma e TSH conforme cenário. ETE não é exame rotineiro para calcular escore; pode investigar trombo atrial no planejamento de cardioversão quando indicado.",
      "criteria": [
        "Solicita ECG e TTE",
        "Solicita exames laboratoriais pertinentes",
        "Explica quando ETE pode ser útil",
        "Evita exame indiscriminado"
      ],
      "hints": [
        "Comece por ritmo e estrutura.",
        "TTE e ETE não fazem a mesma coisa.",
        "TTE = estrutura; ETE = trombo pré-cardioversão em casos selecionados."
      ],
      "memory": "ECG → ECO → ELETRÓLITOS → TSH.",
      "source": "sbcfa"
    },
    {
      "id": "frequencia",
      "competence": "Controle de frequência",
      "prompt": "Com paciente hemodinamicamente estável, como escolheria tratamento inicial para controle da frequência?",
      "answer": "Confirmar estabilidade e investigar FEVE, síndrome de pré-excitação e contraindicações. Betabloqueador é opção frequente; verapamil/diltiazem apenas quando FEVE >40% e contexto adequado; digoxina em situações selecionadas. Não administrar bloqueador nodal indiscriminadamente em FA pré-excitada ou disfunção ventricular grave.",
      "criteria": [
        "Prioriza estabilidade",
        "Considera betabloqueador como opção",
        "Condiciona diltiazem/verapamil à FEVE preservada",
        "Identifica contraindicações/pré-excitação"
      ],
      "hints": [
        "A decisão depende de FEVE.",
        "Quais bloqueadores do nó AV podem agravar insuficiência cardíaca?",
        "Betabloqueador, ou BCC não di-hidropiridínico com FEVE adequada; evite em FA pré-excitada."
      ],
      "memory": "Estável → FEVE → controlar.",
      "source": "sbcfa"
    },
    {
      "id": "cardioversao",
      "competence": "Cardioversão",
      "prompt": "Em quais situações a cardioversão elétrica está indicada e quais cuidados relacionados ao risco de trombo devem ser observados?",
      "answer": "Instabilidade hemodinâmica atribuível à FA (choque, isquemia, edema agudo, alteração grave da perfusão) → cardioversão sincronizada imediata. No paciente estável, ponderar controle de ritmo conforme sintomas, duração, anticoagulação e possibilidade de trombo, com estratégia peri e pós-cardioversão segundo diretriz.",
      "criteria": [
        "Reconhece instabilidade",
        "Diz sincronizada e imediata se instável",
        "Considera duração e anticoagulação se estável",
        "Não realiza cardioversão eletiva ignorando risco embólico"
      ],
      "hints": [
        "Diferencie urgente de eletiva.",
        "Onde há choque e EAP, não espere.",
        "Instável → cardioversão sincronizada; estável → planejar risco de trombo."
      ],
      "memory": "Instável já; estável planejar.",
      "source": "sbcfa"
    },
    {
      "id": "anticoagulacao",
      "competence": "Anticoagulação crônica",
      "prompt": "Que fatores do caso indicam anticoagulação crônica? Como escolher a classe e que exceções são fundamentais?",
      "answer": "Com CHA₂DS₂-VA 3, anticoagulação oral recomendada na FA, na ausência de contraindicação. ACOD preferidos em FA não valvar elegível. Válvula mecânica ou estenose mitral moderada a grave exigem anticoagulação com antagonista da vitamina K, não ACOD. Avaliar função renal, interações, adesão e risco hemorrágico.",
      "criteria": [
        "Calcula risco 3",
        "Recomenda anticoagulação oral",
        "Prefere ACOD se elegível",
        "Reconhece exceções de válvula mecânica/estenose mitral"
      ],
      "hints": [
        "Pense em prevenir AVC mesmo após restaurar ritmo.",
        "FA + 3 pontos = risco relevante.",
        "ACOD preferido, exceto válvula mecânica/estenose mitral significativa."
      ],
      "memory": "Escore define risco; válvula define escolha.",
      "source": "sbcfa"
    },
    {
      "id": "sangramento",
      "competence": "Segurança",
      "prompt": "Como usar HAS-BLED na avaliação e por que um escore alto não é motivo isolado para suspender anticoagulação?",
      "answer": "HAS-BLED ajuda a identificar e corrigir fatores hemorrágicos modificáveis (PA não controlada, fármacos como AINE/antiagregantes, álcool etc.). Não utilizar o escore isoladamente para negar anticoagulação que tem indicação; verificar contraindicações reais e decidir individualmente.",
      "criteria": [
        "Identifica objetivo do HAS-BLED",
        "Cita fatores modificáveis",
        "Não usa número como veto isolado",
        "Equilibra risco/benefício e contraindicações"
      ],
      "hints": [
        "Para que serve identificar risco de sangramento?",
        "É uma ferramenta de correção, não de exclusão.",
        "Tratar PA, revisar remédios e álcool; não suspender só pelo escore."
      ],
      "memory": "Sangra? Corrija risco, não ignore AVC.",
      "source": "sbcfa"
    },
    {
      "id": "diferenciais",
      "competence": "Diagnóstico diferencial",
      "prompt": "Como diferenciar FA, flutter atrial e extrassístoles em um ECG?",
      "answer": "FA: RR irregularmente irregular e atividade atrial desorganizada. Flutter: atividade atrial organizada, frequentemente ondas em serrilha, com condução AV fixa ou variável. Extrassístoles: batimentos prematuros isolados com ritmo sinusal subjacente; analisar ondas P e padrão global.",
      "criteria": [
        "Caracteriza RR da FA",
        "Descreve ondas em serrilha do flutter",
        "Distingue ectopia isolada de irregularidade contínua"
      ],
      "hints": [
        "Compare regularidade e organização atrial.",
        "Flutter tem onda típica?",
        "FA = irregular sem P; flutter pode ser regular/serrilha; extras isoladas em ritmo subjacente."
      ],
      "memory": "FA desorganiza; flutter organiza.",
      "source": "sbcfa"
    },
    {
      "id": "comunicacao",
      "competence": "Comunicação com paciente",
      "prompt": "Explique ao paciente, em termos simples, por que tratar o coração não é suficiente sem prevenir AVC.",
      "answer": "'Seu coração está com ritmo irregular, o que pode causar palpitações e cansaço. Isso também pode favorecer a formação de coágulos e aumentar o risco de derrame. Vamos avaliar como controlar os sintomas e se existe indicação de um remédio para reduzir esse risco, verificando seus rins e o risco de sangramento.'",
      "criteria": [
        "Explica ritmo irregular em linguagem acessível",
        "Relaciona FA com AVC",
        "Justifica anticoagulação",
        "Inclui acompanhamento e segurança"
      ],
      "hints": [
        "Explique primeiro sintomas, depois riscos.",
        "Fale em coágulo e AVC.",
        "O remédio para frequência não substitui prevenção de AVC."
      ],
      "memory": "Sintomas ≠ trombo; cuidar dos dois.",
      "source": "sbcfa"
    }
  ]
};
