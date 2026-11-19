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

window.EMERGENCY_CONTENT.push(...[
 {
  "id": "avci",
  "stage": "P1",
  "title": "AVC isquêmico",
  "summary": "Código AVC, tempo, TC, trombólise e trombectomia.",
  "goals": [
   "Definir último momento bem.",
   "Excluir hemorragia por neuroimagem.",
   "Avaliar reperfusão conforme seleção."
  ],
  "sections": [
   {
    "h": "Tempo e reconhecimento",
    "p": [
     "Fraqueza, afasia, perda visual ou síndrome posterior de início súbito exigem código AVC. Documente último momento conhecido sem déficit; faça glicemia capilar e avaliação neurológica dirigida (incluindo NIHSS), monitorização e avaliação de medicamentos anticoagulantes."
    ]
   },
   {
    "h": "Diagnóstico com imagem",
    "p": [
     "TC sem contraste urgente distingue hemorragia de isquemia; angio-TC identifica possível oclusão de grande vaso. Não atrasar avaliação para exames não essenciais. Lembre mimetizadores: hipoglicemia, crise convulsiva pós-ictal, enxaqueca e alterações metabólicas."
    ]
   },
   {
    "h": "Reperfusão atual",
    "p": [
     "AHA/ASA 2026 considera trombólise IV com alteplase ou tenecteplase em pacientes elegíveis, usualmente dentro de 4,5 horas para déficits incapacitantes; janelas maiores dependem de imagem avançada. Trombectomia beneficia oclusões de grande vaso selecionadas, inclusive até 24 horas. Reavaliar PA, sangramento e função neurológica."
    ]
   }
  ],
  "flow": [
   [
    "Déficit focal súbito",
    "Ativar código AVC; glicemia e último momento bem."
   ],
   [
    "TC urgente",
    "Excluir hemorragia."
   ],
   [
    "Critérios clínicos, tempo e imagem",
    "Considerar trombólise e/ou trombectomia."
   ],
   [
    "Após decisão",
    "Monitorização neurológica e hemodinâmica."
   ]
  ],
  "pitfalls": [
   "Não confundir hora da chegada com início.",
   "Não administrar antiagregante sem excluir hemorragia."
  ],
  "quiz": [
   {
    "q": "Exame rápido inicial para excluir hemorragia:",
    "o": [
     "TC sem contraste",
     "EEG",
     "RX crânio",
     "Teste de esforço"
    ],
    "a": 0,
    "why": "A TC sem contraste é o exame de primeira linha na suspeita de AVC."
   },
   {
    "q": "Qual dado de tempo é essencial?",
    "o": [
     "Último momento conhecido bem",
     "Última refeição",
     "Último ECG",
     "Dia da consulta anterior"
    ],
    "a": 0,
    "why": "O last known well orienta elegibilidade de reperfusão."
   }
  ],
  "case": {
   "id": "case-avci",
   "focus": "AVC isquêmico",
   "stem": "Mulher de 68 anos, hemiparesia esquerda e afasia há cerca de 2 horas, glicemia 107 mg/dL.",
   "ask": "Qual sequência e em que situações não trombolisar?",
   "answer": [
    "Código AVC, último momento bem, NIHSS, PA, drogas e contraindicações.",
    "TC sem contraste, considerar angio-TC para oclusão de grande vaso.",
    "Decidir alteplase/tenecteplase e trombectomia por critérios e equipe de AVC; vigiar complicações."
   ]
  },
  "refs": [
   "ahaStroke",
   "slideAVC"
  ],
  "slide": "1NsPDBZref6SnQZzNg30bw5wSGPP3BEUg"
 },
 {
  "id": "sepse",
  "stage": "P1",
  "title": "Sepse e choque séptico",
  "summary": "Reconhecimento de disfunção orgânica, antibiótico, fluidos e foco.",
  "goals": [
   "Identificar sepse antes do colapso.",
   "Tratar sem atrasos evitáveis.",
   "Reavaliar perfusão e fonte."
  ],
  "sections": [
   {
    "h": "Critério clínico",
    "p": [
     "Sepse é disfunção orgânica ameaçadora à vida relacionada a infecção; aumento de SOFA pode apoiar o diagnóstico. qSOFA isolado não serve para excluir sepse. Examine consciência, perfusão, diurese, oxigenação, plaquetas, função renal e hepática."
    ]
   },
   {
    "h": "Atuação inicial",
    "p": [
     "Em choque/alta probabilidade, medir lactato, coletar culturas sem atrasar antibiótico apropriado, investigar e controlar foco. Usar cristaloides guiados por perfusão e responsividade, evitando sobrecarga em pacientes congestos. Noradrenalina é vasopressor de primeira linha quando indicado; alvo inicial usual de PAM em torno de 65 mmHg, individualizado."
    ]
   },
   {
    "h": "Reavaliação",
    "p": [
     "Comparar estado mental, enchimento capilar, PA, diurese e lactato em tendência. Culturas não substituem controle de foco; drenagem, cirurgia ou desobstrução podem ser essenciais. Rever antibiótico por cultura, função renal e evolução."
    ]
   }
  ],
  "flow": [
   [
    "Infecção + disfunção",
    "Reconhecer sepse e monitorar perfusão."
   ],
   [
    "Choque provável",
    "Culturas sem atrasar antibioticoterapia."
   ],
   [
    "Hipoperfusão",
    "Fluidos reavaliados e vasopressor se necessário."
   ],
   [
    "Foco controlável",
    "Organizar controle de fonte."
   ]
  ],
  "pitfalls": [
   "qSOFA negativo não exclui sepse.",
   "Não insistir em bolus de volume sem avaliar congestão."
  ],
  "quiz": [
   {
    "q": "Vasopressor de primeira escolha em choque séptico:",
    "o": [
     "Noradrenalina",
     "Atropina",
     "Dobutamina obrigatória",
     "Dopamina obrigatória"
    ],
    "a": 0,
    "why": "Noradrenalina é o agente preferencial."
   },
   {
    "q": "Infecção com nova disfunção orgânica ameaça à vida caracteriza:",
    "o": [
     "Sepse",
     "Colonização",
     "Alergia",
     "Hipotensão ortostática isolada"
    ],
    "a": 0,
    "why": "O elemento distintivo é disfunção orgânica por infecção."
   }
  ],
  "case": {
   "id": "case-sepse",
   "focus": "Sepse e choque séptico",
   "stem": "Homem de 76 anos com pneumonia, confusão, PA 80/50, oligúria e lactato 4,1.",
   "ask": "Como organizar tratamento na primeira abordagem?",
   "answer": [
    "ABCDE, oxigenação, monitorização, lactato, culturas sem atrasar antibioticoterapia.",
    "Cristaloides e avaliação dinâmica de resposta; noradrenalina se indicada.",
    "Investigar controle do foco e reavaliar perfusão/diurese/lactato."
   ]
  },
  "refs": [
   "ssc",
   "slideSepse"
  ],
  "slide": "1TtBdtL0ednrpQ16dzgIfi1F8vZPcX8js"
 },
 {
  "id": "choque",
  "stage": "P1",
  "title": "Síndromes de choque",
  "summary": "Hipovolêmico, distributivo, cardiogênico e obstrutivo.",
  "goals": [
   "Reconhecer hipoperfusão mesmo antes de hipotensão.",
   "Distinguir fenótipo e mecanismo.",
   "Evitar tratamento volumétrico indiscriminado."
  ],
  "sections": [
   {
    "h": "Choque não é somente hipotensão",
    "p": [
     "Observe confusão, oligúria, perfusão periférica, pele fria ou quente, lactato, tendência da PA e frequência cardíaca. Hipoperfusão pode anteceder a hipotensão. O atendimento inicial inclui ABCDE, monitorização, acesso e avaliação clínica de mecanismo."
    ]
   },
   {
    "h": "Quatro mecanismos",
    "p": [
     "Hipovolêmico: perdas sanguíneas ou fluidos; controlar a fonte e repor apropriadamente. Distributivo: vasoplegia, como sepse e anafilaxia. Cardiogênico: falha da bomba com congestão e baixo débito. Obstrutivo: TEP de alto risco, tamponamento ou pneumotórax hipertensivo. POCUS ajuda, mas não é diagnóstico isolado."
    ]
   },
   {
    "h": "Tratamento conforme mecanismo",
    "p": [
     "Pneumotórax hipertensivo com instabilidade exige intervenção sem aguardar RX; choque hemorrágico demanda controle da fonte. Cardiogênico com congestão pode piorar com grandes volumes; anafilaxia pede adrenalina IM. Toda intervenção necessita reavaliação de perfusão e causa."
    ]
   }
  ],
  "flow": [
   [
    "Hipoperfusão",
    "ABCDE, monitorar e identificar mecanismo."
   ],
   [
    "Sangramento",
    "Controle hemostático e reposição apropriada."
   ],
   [
    "Congestão + má perfusão",
    "Investigar falha de bomba, evitar fluido cego."
   ],
   [
    "Obstrução",
    "Corrigir causa reversível de imediato."
   ]
  ],
  "pitfalls": [
   "Não repetir fluidos automaticamente em choque cardiogênico.",
   "Não esperar hipotensão profunda para reconhecer choque."
  ],
  "quiz": [
   {
    "q": "Hipotenso, jugulares túrgidas, ausência de murmúrio unilateral:",
    "o": [
     "Choque obstrutivo por pneumotórax hipertensivo",
     "Choque hipovolêmico simples",
     "Sinusite",
     "Anemia crônica"
    ],
    "a": 0,
    "why": "O conjunto sugere emergência obstrutiva torácica."
   },
   {
    "q": "Choque + estertores congestivos exige cautela com:",
    "o": [
     "Grandes bolus sem reavaliação",
     "ECG",
     "POCUS",
     "Sinais vitais"
    ],
    "a": 0,
    "why": "O excesso de fluidos pode agravar edema cardiogênico."
   }
  ],
  "case": {
   "id": "case-choque",
   "focus": "Síndromes de choque",
   "stem": "Paciente com IAM recente, PA 75/45, extremidades frias, estertores e jugulares túrgidas.",
   "ask": "Qual fenótipo e estratégia?",
   "answer": [
    "Provável choque cardiogênico: investigar ECG, eco/POCUS e causas tratáveis.",
    "Evitar hidratação indiscriminada; acionar suporte e reperfusão conforme indicação.",
    "Reavaliar PAM, diurese, lactato, consciência e congestão."
   ]
  },
  "refs": [
   "general",
   "slideChoque"
  ],
  "slide": "1UQVs6wDfagDfxFhnN06i6AYx8BVQ-1d0"
 }
]);
