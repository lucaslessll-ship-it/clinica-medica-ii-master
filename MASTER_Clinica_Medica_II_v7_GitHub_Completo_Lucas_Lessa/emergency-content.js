window.EMERGENCY_CONTENT=[
 {
  "id": "pcr",
  "stage": "P1",
  "title": "Parada cardiorrespiratória",
  "summary": "Reconhecimento, ritmos, RCP, desfibrilação e cuidados pós-RCE.",
  "goals": [
   "Reconhecer PCR.",
   "Distinguir ritmos chocáveis.",
   "Organizar ressuscitação."
  ],
  "sections": [
   {
    "h": "Diagnóstico",
    "p": [
     "Paciente inconsciente, sem respiração normal e sem pulso central em até 10 segundos: acionar equipe, solicitar desfibrilador e iniciar compressões.",
     "RCP de alta qualidade: 100–120/min, profundidade de 5–6 cm, retorno completo e mínimas pausas. Sem via aérea avançada, 30 compressões para 2 ventilações."
    ]
   },
   {
    "h": "Ritmos",
    "p": [
     "FV/TV sem pulso: choque não sincronizado seguido de retomada imediata de RCP por 2 minutos. AESP/assistolia: não desfibrilar; RCP, adrenalina e causas reversíveis.",
     "Adrenalina 1 mg IV/IO a cada 3–5 minutos. Em ritmos chocáveis, depois das primeiras tentativas de desfibrilação falharem."
    ]
   },
   {
    "h": "Pós-RCE",
    "p": [
     "Monitorizar perfusão, oxigenação, ritmo, ECG, temperatura e causa da PCR. Evitar prognóstico neurológico prematuro."
    ]
   }
  ],
  "flow": [
   [
    "Sem resposta e respiração anormal",
    "Avaliar pulso rapidamente e iniciar RCP se PCR."
   ],
   [
    "FV/TVSP",
    "Desfibrilar e retomar RCP."
   ],
   [
    "AESP/assistolia",
    "RCP, adrenalina e causas reversíveis."
   ]
  ],
  "pitfalls": [
   "Desfibrilar assistolia.",
   "Interromper compressões por tempo prolongado."
  ],
  "quiz": [
   {
    "q": "FV sem pulso: qual intervenção prioritária?",
    "o": [
     "Desfibrilar",
     "Adenosina",
     "Atropina",
     "Aguardar laboratório"
    ],
    "a": 0,
    "why": "FV/TVSP são ritmos chocáveis."
   },
   {
    "q": "AESP deve receber choque?",
    "o": [
     "Sim, sempre",
     "Não: RCP, adrenalina e causas reversíveis",
     "Somente após amiodarona",
     "Somente após 10 min"
    ],
    "a": 1,
    "why": "AESP não é ritmo chocável."
   }
  ],
  "case": {
   "id": "case-pcr",
   "focus": "RCP",
   "stem": "Homem colapsa sem pulso, gasping e FV no monitor.",
   "ask": "Descreva as primeiras intervenções.",
   "answer": [
    "Iniciar RCP e chamar ajuda.",
    "Desfibrilar e retomar RCP.",
    "Tratar causas e organizar cuidado pós-RCE."
   ]
  },
  "refs": [
   "aha",
   "slidePCR"
  ],
  "slide": "1WKQCE_tI0fmiyzYD0cHcl6KzjYZu5PGf"
 }
];

window.EMERGENCY_CONTENT.push(...[
 {
  "id": "irpa",
  "stage": "P1",
  "title": "Insuficiência respiratória aguda",
  "summary": "Hipoxemia versus hipercapnia, oxigênio, CNAF, VNI e IOT.",
  "goals": [
   "Diferenciar falência de oxigenação e de ventilação.",
   "Detectar fadiga respiratória e gravidade.",
   "Escalonar suporte com reavaliação."
  ],
  "sections": [
   {
    "h": "Tipo 1 e tipo 2",
    "p": [
     "IRpA tipo 1: falha predominante de oxigenação por shunt, distúrbio V/Q ou difusão, como pneumonia, edema e SDRA. Tipo 2: insuficiência ventilatória com aumento de PaCO₂, frequente em DPOC, depressão do SNC e fraqueza muscular. Há apresentações mistas. O diagnóstico integra esforço respiratório, consciência, SpO₂ e gasometria; SpO₂ isolada não exclui hipercapnia."
    ]
   },
   {
    "h": "Abordagem inicial",
    "p": [
     "ABCDE, monitorização, posição, oxigênio titulado, exames sem atrasar suporte e investigação direcionada a congestão, broncoespasmo, pneumotórax, TEP e infecção. DPOC com risco de hipercapnia: alvo inicial usual 88–92% de SpO₂, depois ajustar com gasometria e contexto."
    ]
   },
   {
    "h": "Seleção de suporte",
    "p": [
     "VNI tem benefício importante na acidose respiratória por DPOC e no edema cardiogênico, desde que o paciente coopere e proteja a via aérea. CNAF é opção em hipoxemia selecionada. Exaustão, perda da proteção de via aérea ou deterioração apesar do suporte exigem avaliação imediata para IOT."
    ]
   }
  ],
  "flow": [
   [
    "Dispneia e trabalho elevado",
    "ABCDE e O₂ titulado, avaliar ventilação."
   ],
   [
    "Hipercapnia com acidose e paciente elegível",
    "Considerar VNI e reavaliar cedo."
   ],
   [
    "Sensório em declínio/fadiga",
    "Preparar via aérea definitiva sem atraso."
   ]
  ],
  "pitfalls": [
   "Saturação normal não prova ventilação normal.",
   "Não prolongar VNI quando há falência ou contraindicação."
  ],
  "quiz": [
   {
    "q": "DPOC, pH 7,28, PaCO₂ 65, acordado: considerar?",
    "o": [
     "VNI monitorizada",
     "Alta",
     "Apenas mucolítico",
     "IOT obrigatória para toda hipercapnia"
    ],
    "a": 0,
    "why": "VNI é recurso central na acidose respiratória hipercápnica selecionada."
   },
   {
    "q": "Sinal de pré-falência respiratória:",
    "o": [
     "Fala normal",
     "Sonolência e exaustão",
     "SpO₂ isolada 96%",
     "Tosse crônica"
    ],
    "a": 1,
    "why": "O declínio da consciência e fadiga motivam escalonamento."
   }
  ],
  "case": {
   "id": "case-irpa",
   "focus": "Insuficiência respiratória aguda",
   "stem": "Paciente com DPOC, pH 7,23 e PaCO₂ 76, FR 33 e sonolência progressiva.",
   "ask": "Que condições determinam VNI versus IOT?",
   "answer": [
    "Reavaliar via aérea, ventilação, hemodinâmica e proteção de via aérea.",
    "VNI somente se candidato seguro e monitorizado; piora do sensório exige resgate e equipe de IOT.",
    "Investigar e tratar causa precipitante; repetir avaliação clínica e gasométrica."
   ]
  },
  "refs": [
   "general",
   "slideIRPA"
  ],
  "slide": "153JlL-QQwKekWgxqFn7qBHLCg9yPW-4a"
 },
 {
  "id": "vm",
  "stage": "P1",
  "title": "Ventilação mecânica e via aérea",
  "summary": "VNI, intubação, ventilação protetora e alarmes.",
  "goals": [
   "Selecionar pacientes para VNI.",
   "Explicar parâmetros iniciais da VM.",
   "Investigar deterioração súbita pós-IOT."
  ],
  "sections": [
   {
    "h": "Quando proteger a via aérea",
    "p": [
     "VNI depende de proteção de via aérea, cooperação e monitorização. Em falência ventilatória, hipoxemia persistente ou risco de aspiração, considerar IOT por equipe treinada. Antes do procedimento, preparar pré-oxigenação, hemodinâmica, equipamento e plano de resgate. Após IOT, confirmar posição por capnografia de onda e exame clínico."
    ]
   },
   {
    "h": "VM protetora",
    "p": [
     "Na SDRA, volume corrente ao redor de 6 mL/kg do peso predito e pressão de platô tipicamente abaixo de 30 cmH₂O. FiO₂ e PEEP são tituladas à oxigenação e à hemodinâmica. Não calcular volume corrente pelo peso real de paciente obeso."
    ]
   },
   {
    "h": "Deterioração",
    "p": [
     "Piora da saturação ou pressão após IOT: verificar deslocamento do tubo, obstrução, pneumotórax, equipamento e auto-PEEP. Em asma/DPOC, tempo expiratório curto pode causar hiperinsuflação e hipotensão; é essencial adaptar estratégia com supervisão."
    ]
   }
  ],
  "flow": [
   [
    "Falha de suporte não invasivo",
    "Avaliar IOT e plano de resgate."
   ],
   [
    "Tubo colocado",
    "Confirmar capnografia de onda."
   ],
   [
    "VM inicial",
    "Estratégia protetora por peso predito."
   ],
   [
    "Deterioração súbita",
    "Paciente, tubo, circuito e tórax."
   ]
  ],
  "pitfalls": [
   "Usar peso real para volume protetor.",
   "Ignorar auto-PEEP na obstrução."
  ],
  "quiz": [
   {
    "q": "O volume corrente protetor usa:",
    "o": [
     "Peso predito",
     "Peso real",
     "Peso informado em documento",
     "Idade isolada"
    ],
    "a": 0,
    "why": "A altura e sexo permitem calcular peso predito."
   },
   {
    "q": "Confirmação adequada do tubo inclui:",
    "o": [
     "Embaçamento apenas",
     "Capnografia com onda",
     "Radiografia antes de ventilar",
     "Saturação isolada"
    ],
    "a": 1,
    "why": "Capnografia confirma posicionamento traqueal, com exame clínico."
   }
  ],
  "case": {
   "id": "case-vm",
   "focus": "Ventilação mecânica e via aérea",
   "stem": "Após intubação, paciente asmático apresenta hipotensão e elevada pressão de pico.",
   "ask": "O que investigar imediatamente?",
   "answer": [
    "Revisar tubo, circuito e pneumotórax.",
    "Considerar aprisionamento de ar e auto-PEEP.",
    "Não aumentar frequência e volume automaticamente; reavaliar fisiologia."
   ]
  },
  "refs": [
   "general",
   "slideIRPA"
  ],
  "slide": "153JlL-QQwKekWgxqFn7qBHLCg9yPW-4a"
 }
]);
