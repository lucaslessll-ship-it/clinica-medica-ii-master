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

window.EMERGENCY_CONTENT.push(...[
 {
  "id": "trauma",
  "stage": "P1",
  "title": "Atendimento ao politraumatizado",
  "summary": "xABCDE, hemorragia exsanguinante, eFAST e prioridade de intervenção.",
  "goals": [
   "Iniciar xABCDE.",
   "Identificar hemorragia crítica.",
   "Decidir entre TC e intervenção."
  ],
  "sections": [
   {
    "h": "O xABCDE do ATLS 11",
    "p": [
     "A primeira etapa x é controle imediato da hemorragia externa ameaçadora. A: via aérea com proteção cervical conforme risco; B: ventilação e ameaças torácicas; C: circulação e hemorragia; D: avaliação neurológica; E: exposição completa com prevenção de hipotermia. Intervenções são simultâneas conforme equipe."
    ]
   },
   {
    "h": "Hemorragia e ressuscitação",
    "p": [
     "Buscar perdas em tórax, abdome, pelve, ossos longos e exterior; realizar eFAST quando disponível sem substituir julgamento. Se necessário, aplicar compressão/torniquete adequado, estabilizar pelve, ativar protocolo de hemorragia e controle definitivo. Evitar tríade de hipotermia, acidose e coagulopatia."
    ]
   },
   {
    "h": "Imagem e destino",
    "p": [
     "Trauma instável com alta suspeita de sangramento pode exigir cirurgia ou hemostasia imediata; tomografia não deve retardar controle de fonte. TC contrastada é mais útil no paciente suficientemente estável. Exame eFAST negativo não elimina lesão."
    ]
   }
  ],
  "flow": [
   [
    "Hemorragia externa grave",
    "Controlar antes das demais etapas."
   ],
   [
    "A/B",
    "Proteger via aérea e tratar ameaças respiratórias."
   ],
   [
    "C/D/E",
    "Perfusão, neurologia e prevenção de hipotermia."
   ],
   [
    "Instabilidade refratária",
    "Avaliar intervenção imediata, não atrasar com TC."
   ]
  ],
  "pitfalls": [
   "Mandar instável para TC antes de controle de hemorragia.",
   "Confundir eFAST negativo com ausência de lesão."
  ],
  "quiz": [
   {
    "q": "No xABCDE, x representa:",
    "o": [
     "Controle de hemorragia exsanguinante",
     "Raio X",
     "Xifoide",
     "Analgesia"
    ],
    "a": 0,
    "why": "ATLS 11 enfatiza hemorragia que ameaça a vida imediatamente."
   },
   {
    "q": "Trauma abdominal instável com eFAST positivo requer:",
    "o": [
     "Controle de fonte e reanimação sem atrasos",
     "Alta",
     "TC obrigatória antes de qualquer intervenção",
     "Somente analgesia"
    ],
    "a": 0,
    "why": "Instabilidade e sangramento indicam abordagem tempo-dependente."
   }
  ],
  "case": {
   "id": "case-trauma",
   "focus": "Atendimento ao politraumatizado",
   "stem": "Homem de 26 anos, colisão, PA 78/42, abdome rígido e eFAST com líquido livre.",
   "ask": "Como ordenar condutas e justificar não fazer TC imediata?",
   "answer": [
    "xABCDE, controle externo, vias aéreas, respiração e circulação.",
    "Acionar cirurgia/trauma e ressuscitação hemostática.",
    "Instabilidade com provável sangramento intra-abdominal pode demandar controle cirúrgico imediato; reavaliar."
   ]
  },
  "refs": [
   "atls",
   "slideTrauma"
  ],
  "slide": "1a-w0A9LmmON2xHDNGrY7EtotbSx5L-Mg"
 },
 {
  "id": "trauma-especifico",
  "stage": "P1",
  "title": "TCE, coluna e trauma torácico",
  "summary": "Evitar lesão secundária e reconhecer ameaças torácicas e medulares.",
  "goals": [
   "Documentar Glasgow, pupilas e focalidade.",
   "Prevenir hipóxia/hipotensão.",
   "Identificar pneumotórax hipertensivo."
  ],
  "sections": [
   {
    "h": "TCE grave",
    "p": [
     "Avaliar Glasgow por componentes, resposta pupilar, déficit motor, convulsões e anticoagulação. Evitar hipóxia e hipotensão é prioritário para prevenir lesão cerebral secundária; TC de crânio é central quando indicada após estabilização inicial."
    ]
   },
   {
    "h": "Coluna/medula",
    "p": [
     "Pesquisar dor mediana, déficit motor/sensitivo, nível da lesão e disfunção autonômica. Restrição de movimento é seletiva e não pode prejudicar a via aérea. No trauma hipotenso com bradicardia, pensar em choque neurogênico, mas procurar sangramento antes de concluir."
    ]
   },
   {
    "h": "Trauma torácico",
    "p": [
     "Pneumotórax hipertensivo instável é diagnóstico clínico: descompressão não deve esperar RX. Hemotórax maciço, tamponamento e contusão pulmonar têm apresentações e intervenções distintas; integrar exame físico, eFAST e perfusão."
    ]
   }
  ],
  "flow": [
   [
    "TCE com rebaixamento",
    "ABCDE, neuro seriado, evitar hipóxia e hipotensão."
   ],
   [
    "Trauma de coluna",
    "Proteger movimento conforme risco e examinar função medular."
   ],
   [
    "Ventilação unilateral + choque",
    "Tratar suspeita de pneumotórax hipertensivo sem atraso de RX."
   ]
  ],
  "pitfalls": [
   "Atribuir toda hipotensão à lesão medular sem excluir sangramento.",
   "Adiar intervenção em pneumotórax hipertensivo instável para radiografia."
  ],
  "quiz": [
   {
    "q": "TCE grave: agressões secundárias a evitar:",
    "o": [
     "Hipóxia e hipotensão",
     "Exames neurológicos",
     "Analgésicos conforme indicação",
     "Monitorização"
    ],
    "a": 0,
    "why": "Hipóxia/hipotensão agravam lesão cerebral."
   },
   {
    "q": "Choque com murmúrio unilateral abolido após trauma sugere:",
    "o": [
     "Pneumotórax hipertensivo",
     "Bronquite simples",
     "Faringite",
     "Hipoglicemia isolada"
    ],
    "a": 0,
    "why": "Sinais sugerem lesão torácica obstrutiva."
   }
  ],
  "case": {
   "id": "case-trauma-especifico",
   "focus": "TCE, coluna e trauma torácico",
   "stem": "Paciente com TCE, Glasgow 7 e PA 84/50; ventilação assimétrica à direita.",
   "ask": "Quais riscos simultâneos?",
   "answer": [
    "Proteger oxigenação e hemodinâmica, avaliar via aérea e coluna.",
    "Investigar e tratar rapidamente ameaça torácica, principalmente pneumotórax hipertensivo.",
    "Buscar hemorragia e avaliar neuroimagem quando seguro."
   ]
  },
  "refs": [
   "atls",
   "slideTrauma"
  ],
  "slide": "1a-w0A9LmmON2xHDNGrY7EtotbSx5L-Mg"
 },
 {
  "id": "queimado",
  "stage": "P1",
  "title": "Grande queimado",
  "summary": "SCQ, profundidade, lesão inalatória e ressuscitação guiada.",
  "goals": [
   "Estimar SCQ corretamente.",
   "Identificar risco de via aérea.",
   "Titular fluidos por perfusão."
  ],
  "sections": [
   {
    "h": "Primeira abordagem",
    "p": [
     "Segurança da cena, interromper queimadura, retirar adornos não aderidos e ABCDE. Rouquidão progressiva, estridor, fuligem oral e queimadura após fogo em ambiente fechado exigem atenção imediata à via aérea e intoxicação por fumaça. Não usar gelo diretamente."
    ]
   },
   {
    "h": "Extensão e gravidade",
    "p": [
     "Regra dos nove no adulto ou Lund-Browder; eritema isolado não entra na SCQ para reposição. Queimaduras de espessura parcial e total têm riscos distintos. Face, mãos, pés, genitais, articulações, circunferenciais e lesão inalatória podem indicar centro especializado."
    ]
   },
   {
    "h": "Fluidos e segurança",
    "p": [
     "Fórmulas para reposição em queimadura extensa apenas estimam volume inicial; ajuste por diurese, perfusão, balanço e sinais de sobrecarga. Analgesia, cobertura limpa, controle térmico e profilaxia antitetânica pertinente. Não usar antibiótico sistêmico profilático indiscriminadamente."
    ]
   }
  ],
  "flow": [
   [
    "Incêndio/queimadura",
    "Segurança, ABCDE e retirar fonte."
   ],
   [
    "Sinais de lesão inalatória",
    "Avaliar via aérea precocemente."
   ],
   [
    "SCQ e profundidade",
    "Definir necessidade de fluidos/centro especializado."
   ],
   [
    "Reavaliação",
    "Diurese, perfusão, hipotermia e dor."
   ]
  ],
  "pitfalls": [
   "Contar eritema simples como SCQ profunda.",
   "Dar volume de fórmula sem reavaliar.",
   "Subestimar rouquidão e edema após fumaça."
  ],
  "quiz": [
   {
    "q": "Queimadura extensa: fluidos devem ser titulados por:",
    "o": [
     "Perfusão e diurese",
     "Fórmula rígida sem ajuste",
     "Número de bolhas",
     "Saturação isolada"
    ],
    "a": 0,
    "why": "A resposta clínica guia a ressuscitação."
   },
   {
    "q": "Sinal prioritário no queimado após incêndio:",
    "o": [
     "Rouquidão progressiva",
     "Dor leve em mão",
     "Eritema localizado",
     "Sudorese isolada"
    ],
    "a": 0,
    "why": "Pode indicar lesão inalatória e edema de via aérea."
   }
  ],
  "case": {
   "id": "case-queimado",
   "focus": "Grande queimado",
   "stem": "Adulto com queimadura torácica e de braços após incêndio fechado; rouquidão e fuligem oral.",
   "ask": "Qual sequência antes de qualquer fórmula de fluidos?",
   "answer": [
    "ABCDE com avaliação de lesão inalatória e oxigenação.",
    "Estimar SCQ sem contar eritema isolado; analgesia e prevenção da hipotermia.",
    "Ressuscitação individualizada por perfusão/diurese e centro de referência."
   ]
  },
  "refs": [
   "aba",
   "atls"
  ],
  "slide": "1a-w0A9LmmON2xHDNGrY7EtotbSx5L-Mg"
 },
 {
  "id": "asma",
  "stage": "P1",
  "title": "Crise asmática grave",
  "summary": "Broncodilatação, corticoterapia e sinais de falência iminente.",
  "goals": [
   "Reconhecer gravidade clínica.",
   "Iniciar terapêutica imediata.",
   "Identificar momento de escalonamento."
  ],
  "sections": [
   {
    "h": "Avaliação",
    "p": [
     "Sinais: fala em palavras isoladas, FR elevada, uso de musculatura acessória, hipoxemia e taquicardia. Sonolência, tórax silencioso, exaustão e piora do sensório são sinais de vida ameaçada, não de melhora."
    ]
   },
   {
    "h": "Tratamento",
    "p": [
     "Iniciar SABA inalatório repetido, oxigênio titulado e corticoide sistêmico precoce; associar ipratrópio em crises graves. Magnésio IV pode ser considerado em casos graves refratários. Não administrar antibiótico sem indicação específica."
    ]
   },
   {
    "h": "Monitorização",
    "p": [
     "Reavaliar SpO₂, ausculta, esforço, capacidade de falar e fluxo expiratório quando viável. Ventilação em asma crítica exige cuidado com auto-PEEP, aprisionamento de ar e hipotensão; solicitar equipe experiente cedo."
    ]
   }
  ],
  "flow": [
   [
    "Crise suspeita",
    "Classificar gravidade e monitorizar."
   ],
   [
    "Moderada/grave",
    "SABA repetido, oxigênio titulado e corticoide."
   ],
   [
    "Grave",
    "Ipratrópio e considerar magnésio quando pertinente."
   ],
   [
    "Exaustão/sensório reduzido",
    "Preparar suporte avançado."
   ]
  ],
  "pitfalls": [
   "Tórax silencioso não é sinal de melhora.",
   "Não retardar broncodilatação esperando exames."
  ],
  "quiz": [
   {
    "q": "Asma aguda: achado ameaçador à vida:",
    "o": [
     "Tórax silencioso + sonolência",
     "Sibilância leve",
     "Coriza isolada",
     "Tosse controlada"
    ],
    "a": 0,
    "why": "Sinais de falência ventilatória."
   },
   {
    "q": "Tratamento de crise grave inclui:",
    "o": [
     "SABA + ipratrópio + corticoide sistêmico",
     "Somente antibiótico",
     "Sedativo de rotina",
     "Apenas anti-histamínico"
    ],
    "a": 0,
    "why": "Broncodilatadores e corticoide são centrais no tratamento."
   }
  ],
  "case": {
   "id": "case-asma",
   "focus": "Crise asmática grave",
   "stem": "Jovem asmática, fala palavras isoladas, SpO₂ 88%, uso de musculatura acessória.",
   "ask": "Descreva terapêutica e sinais de falha.",
   "answer": [
    "Monitor, O₂ titulado, SABA repetido, ipratrópio e corticoide.",
    "Considerar magnésio se grave/refratária.",
    "Exaustão, rebaixamento e hipoventilação exigem equipe de via aérea."
   ]
  },
  "refs": [
   "gina"
  ],
  "slide": null
 }
]);

window.EMERGENCY_CONTENT.push(...[
 {
  "id": "adrenal",
  "stage": "P1",
  "title": "Insuficiência adrenal aguda",
  "summary": "Choque, hiponatremia e hipoglicemia: tratar antes de testes.",
  "goals": [
   "Suspeitar em choque de causa não clara.",
   "Administrar corticoide imediatamente.",
   "Corrigir hipovolemia/glicemia e causa."
  ],
  "sections": [
   {
    "h": "Suspeita clínica",
    "p": [
     "Doença de Addison, suspensão abrupta de corticoide, infecção ou cirurgia podem precipitar crise adrenal. Quadro: hipotensão, vômitos, dor abdominal, hiponatremia, hipoglicemia e possivelmente hipercalemia. Pode coexistir sepse."
    ]
   },
   {
    "h": "Tratamento urgente",
    "p": [
     "Se não atrasar, colher cortisol/ACTH; iniciar hidrocortisona 100 mg IV/IM imediatamente no adulto, seguida de esquema de manutenção conforme protocolo, habitualmente 200 mg/dia. Administrar cristaloides, corrigir hipoglicemia, monitorar PA, sódio e potássio."
    ]
   },
   {
    "h": "Depois da estabilização",
    "p": [
     "Investigar gatilho, programar testes endócrinos adequados posteriormente, ajustar doses de estresse e orientar prevenção de novas crises. Não atrasar tratamento aguardando resposta laboratorial."
    ]
   }
  ],
  "flow": [
   [
    "Hipotensão + risco endócrino",
    "Suspeitar crise adrenal."
   ],
   [
    "Instabilidade",
    "Hidrocortisona imediata sem teste prévio obrigatório."
   ],
   [
    "Ressuscitação",
    "Cristaloides e correção glicêmica."
   ],
   [
    "Evolução",
    "Tratar precipitante e reavaliar eletrólitos."
   ]
  ],
  "pitfalls": [
   "Esperar teste de estímulo para tratar choque.",
   "Esquecer infecção precipitante concomitante."
  ],
  "quiz": [
   {
    "q": "Crise adrenal instável: droga específica inicial:",
    "o": [
     "Hidrocortisona parenteral",
     "Levotiroxina isolada",
     "Furosemida",
     "Atenolol"
    ],
    "a": 0,
    "why": "Glicocorticoide deve ser iniciado sem atraso."
   },
   {
    "q": "Qual achado pode apoiar insuficiência adrenal primária?",
    "o": [
     "Hiponatremia e hipercalemia",
     "Hipernatremia isolada",
     "Policitemia",
     "Hiperfosfatemia isolada"
    ],
    "a": 0,
    "why": "Déficit mineralocorticoide pode causar sódio baixo e potássio alto."
   }
  ],
  "case": {
   "id": "case-adrenal",
   "focus": "Insuficiência adrenal aguda",
   "stem": "Mulher suspendeu prednisona crônica, está hipotensa, glicemia 54 mg/dL e Na 126.",
   "ask": "Quais intervenções antes da confirmação hormonal?",
   "answer": [
    "ABCDE e suspeita de crise adrenal.",
    "Hidrocortisona parenteral imediata, cristalóide e correção de hipoglicemia.",
    "Monitorizar e tratar fator precipitante, colher hormônios se não atrasar."
   ]
  },
  "refs": [
   "general"
  ],
  "slide": null
 },
 {
  "id": "afogamento",
  "stage": "P1",
  "title": "Afogamento",
  "summary": "Ressuscitação de origem hipóxica com ventilação prioritária.",
  "goals": [
   "Orientar resgate seguro.",
   "Priorizar ventilação efetiva.",
   "Evitar manobras de retirada de água."
  ],
  "sections": [
   {
    "h": "Fisiopatologia e reconhecimento",
    "p": [
     "A hipóxia por imersão/aspiração leva a lesão pulmonar e, em casos graves, parada cardiorrespiratória. A gravidade é definida pelo estado neurológico, respiração, oxigenação e circulação, não pelo volume supostamente aspirado. Segurança de quem resgata vem antes de tudo."
    ]
   },
   {
    "h": "Ventilações e RCP",
    "p": [
     "Uma vez em local seguro, avaliar respiração e circulação. Em vítima sem respiração normal, a ventilação é essencial por se tratar de evento asfíxico; equipes treinadas podem iniciar ventilações de resgate conforme ERC 2025. Sem pulso, iniciar RCP e desfibrilar se ritmo chocável."
    ]
   },
   {
    "h": "Complicações e erros",
    "p": [
     "Não fazer Heimlich, inversão ou manobras para 'retirar água', que atrasam ventilação. Após estabilizar, vigiar desconforto respiratório, hipoxemia, aspiração e hipotermia. Antibiótico e corticoide profiláticos não são rotina."
    ]
   }
  ],
  "flow": [
   [
    "Resgate",
    "Não entrar na água sem segurança/treino."
   ],
   [
    "Sem respiração normal",
    "Abrir via aérea e ventilar."
   ],
   [
    "Sem circulação",
    "RCP e DEA quando disponível."
   ],
   [
    "Pós-resgate",
    "Monitorar respiração e temperatura."
   ]
  ],
  "pitfalls": [
   "Tentar esvaziar água dos pulmões.",
   "Negligenciar ventilação na PCR por hipóxia."
  ],
  "quiz": [
   {
    "q": "Na PCR após afogamento, é especialmente prioritário:",
    "o": [
     "Ventilação efetiva",
     "Manobra de Heimlich",
     "Antibiótico preventivo",
     "Inverter paciente"
    ],
    "a": 0,
    "why": "Trata-se de evento de origem principalmente hipóxica."
   },
   {
    "q": "Por que não fazer Heimlich para expulsar água?",
    "o": [
     "Atrasa suporte e não resolve aspiração",
     "Sempre causa ventilação melhor",
     "É primeira conduta oficial",
     "Substitui RCP"
    ],
    "a": 0,
    "why": "Não é método de desobstrução por líquido aspirado."
   }
  ],
  "case": {
   "id": "case-afogamento",
   "focus": "Afogamento",
   "stem": "Jovem é retirado inconsciente do rio, não respira normalmente; familiares sugerem virá-lo para eliminar água.",
   "ask": "Oriente a equipe.",
   "answer": [
    "Garantir segurança, pedir ajuda, avaliar respiração e circulação.",
    "Priorizar ventilações de resgate conforme treinamento e RCP se PCR.",
    "Evitar manobras para expulsar água e tratar hipoxemia/hipotermia."
   ]
  },
  "refs": [
   "erc",
   "ahaSpecial"
  ],
  "slide": null
 },
 {
  "id": "sensorio",
  "stage": "P1",
  "title": "Rebaixamento agudo de consciência",
  "summary": "Coma: causas estruturais, tóxico-metabólicas e avaliação paralela ao ABC.",
  "goals": [
   "Checar glicose e proteção de via aérea.",
   "Identificar sinais de lesão focal.",
   "Escolher imagem e exames dirigidos."
  ],
  "sections": [
   {
    "h": "Abordagem imediata",
    "p": [
     "ABCDE, SpO₂, ECG, glicemia capilar e temperatura são medidas iniciais do paciente inconsciente. Proteger a via aérea quando necessário e avaliar ventilação; o diagnóstico é construído em paralelo ao suporte, nunca antes dele."
    ]
   },
   {
    "h": "Exame e diferenciais",
    "p": [
     "Documentar Glasgow por componentes, pupilas, simetria motora e sinais de trauma/infecção. Causas estruturais: hemorragia, AVC, TCE, lesão expansiva e estado epiléptico. Causas difusas: hipoglicemia, hipóxia, hipercapnia, eletrólitos, intoxicações, sepse e falência hepatorrenal."
    ]
   },
   {
    "h": "Investigação e tratamento",
    "p": [
     "Corrigir glicemia baixa, considerar naloxona se suspeita de opioide e depressão respiratória, investigar gasometria, sódio, tóxicos e ECG. TC sem contraste quando suspeita intracraniana; EEG se suspeita de estado epiléptico não convulsivo. Não atribuir causa psiquiátrica sem excluir doença orgânica."
    ]
   }
  ],
  "flow": [
   [
    "Coma",
    "ABCDE, glicemia e monitorização."
   ],
   [
    "Hipoglicemia",
    "Corrigir imediatamente e reavaliar."
   ],
   [
    "Focalidade/pupilas anormais",
    "Avaliar neuroimagem urgente."
   ],
   [
    "Causa não evidente",
    "Gasometria, eletrólitos, toxinas, convulsões e infecção."
   ]
  ],
  "pitfalls": [
   "Atrasar glicose até a TC.",
   "Concluir diagnóstico apenas pelo número do Glasgow."
  ],
  "quiz": [
   {
    "q": "Exame capilar prioritário no paciente desacordado:",
    "o": [
     "Glicemia",
     "Vitamina D",
     "Cortisol livre urinário",
     "Colesterol"
    ],
    "a": 0,
    "why": "Hipoglicemia é causa imediatamente reversível."
   },
   {
    "q": "Coma + anisocoria + novo déficit focal sugere:",
    "o": [
     "Lesão intracraniana estrutural",
     "Sinusite simples",
     "Artrite",
     "Anemia discreta"
    ],
    "a": 0,
    "why": "Achados focais requerem avaliação intracraniana urgente."
   }
  ],
  "case": {
   "id": "case-sensorio",
   "focus": "Rebaixamento agudo de consciência",
   "stem": "Homem encontrado desacordado, respiração irregular, glicemia 38 mg/dL.",
   "ask": "O que fazer sem ancorar em uma única causa?",
   "answer": [
    "ABCDE e proteção da via aérea/ventilação conforme necessidade.",
    "Tratar hipoglicemia e reavaliar consciência/glicemia.",
    "Persistência de coma exige investigação neuro, metabólica, tóxica e infecciosa."
   ]
  },
  "refs": [
   "general",
   "slideSensorio"
  ],
  "slide": "1HoONmIlE7r8fDqn0i7CS1SxHjOKZ6745"
 }
]);

window.EMERGENCY_CONTENT.push(...[
 {
  "id": "hipertensiva",
  "stage": "P2",
  "title": "Emergência hipertensiva e edema agudo pulmonar",
  "summary": "Lesão aguda de órgão-alvo, EAP e redução de PA orientada ao fenótipo.",
  "goals": [
   "Diferenciar urgência de emergência hipertensiva.",
   "Reconhecer edema cardiogênico.",
   "Escolher terapêutica e velocidade de queda de PA."
  ],
  "sections": [
   {
    "h": "Emergência não é só pressão alta",
    "p": [
     "PA muito elevada não define emergência sozinha. O diagnóstico depende de lesão aguda de órgão-alvo: encefalopatia, edema pulmonar, síndrome aórtica, lesão renal ou cardiomiocárdica aguda. Examine neurologia, dispneia, dor, perfusão e diurese, com ECG, exames e imagem dirigidos."
    ]
   },
   {
    "h": "Edema agudo cardiogênico",
    "p": [
     "Dispneia intensa, ortopneia, estertores, hipoxemia e congestão sugerem EAP; ultrassom pode demonstrar linhas B difusas no contexto correto. Posicione, monitore, titular oxigênio, considere CPAP/VNI em paciente elegível e vasodilatador como nitrato se PA adequada, evitando em hipotensão."
    ]
   },
   {
    "h": "Controle de PA com segurança",
    "p": [
     "A redução deve ser titulada com droga IV e monitorização conforme síndrome: a meta para dissecção aórtica difere de edema pulmonar ou encefalopatia. Evitar queda abrupta generalizada e uso indiscriminado de antihipertensivos orais de ação rápida. Tratar gatilho e reavaliar perfusão, sintomas e pressão."
    ]
   }
  ],
  "flow": [
   [
    "PA alta + sintomas",
    "Buscar lesão aguda de órgão-alvo."
   ],
   [
    "EAP com hipoxemia",
    "Oxigenação, VNI quando adequada e terapia guiada por PA."
   ],
   [
    "Emergência confirmada",
    "Antihipertensivo IV conforme órgão-alvo e monitorização."
   ],
   [
    "Reavaliação",
    "PA, perfusão, respiração e resposta à terapia."
   ]
  ],
  "pitfalls": [
   "A PA elevada isolada não define emergência.",
   "Nitrato em hipotensão pode piorar choque.",
   "Não reduzir PA de todos os pacientes com a mesma meta."
  ],
  "quiz": [
   {
    "q": "Qual dado diferencia emergência hipertensiva?",
    "o": [
     "Lesão aguda de órgão-alvo",
     "Qualquer PA >160/90",
     "Cefaleia crônica isolada",
     "Hipertensão diagnosticada há anos"
    ],
    "a": 0,
    "why": "O marcador é lesão aguda de órgão-alvo."
   },
   {
    "q": "EAP cardiogênico e PA elevada, paciente elegível: suporte útil?",
    "o": [
     "VNI/CPAP com tratamento etiológico",
     "Bolus grande de soro em todos",
     "Antibiótico universal",
     "Apenas repouso"
    ],
    "a": 0,
    "why": "VNI reduz esforço e melhora oxigenação em edema cardiogênico selecionado."
   }
  ],
  "case": {
   "id": "case-hipertensiva",
   "focus": "Emergência hipertensiva e edema agudo pulmonar",
   "stem": "Idoso com PA 220/120, dispneia aguda, estertores difusos e SpO₂ 85%.",
   "ask": "Qual síndrome e as prioridades na primeira abordagem?",
   "answer": [
    "Reconhecer EAP com provável emergência hipertensiva e estabilizar ABCDE.",
    "O₂ titulado, monitorização, considerar VNI e tratamento dirigido pela pressão/hemodinâmica.",
    "ECG, investigar isquemia, diurese/congestão e acompanhar resposta; evitar redução de PA sem critério."
   ]
  },
  "refs": [
   "general",
   "slideChoque"
  ],
  "slide": "1UQVs6wDfagDfxFhnN06i6AYx8BVQ-1d0"
 },
 {
  "id": "sca",
  "stage": "P2",
  "title": "Dor torácica e síndrome coronariana aguda",
  "summary": "ECG precoce, troponina seriada, reperfusão e diferenciais letais.",
  "goals": [
   "Identificar causas ameaçadoras de dor torácica.",
   "Interpretar ECG e biomarcadores no contexto.",
   "Priorizar reperfusão quando indicada."
  ],
  "sections": [
   {
    "h": "Dor torácica tempo-dependente",
    "p": [
     "Considere SCA, dissecção de aorta, TEP, pneumotórax hipertensivo, tamponamento e ruptura esofágica segundo história e sinais. A avaliação inclui ABCDE, ECG de 12 derivações idealmente em até 10 min na suspeita de SCA, monitorização e acesso. ECG não diagnóstico inicial não exclui SCA."
    ]
   },
   {
    "h": "SCA com e sem supra",
    "p": [
     "STEMI/padrão equivalente e contexto clínico exigem ativação de reperfusão coronariana sem esperar troponina. NSTE-ACS requer integração de ECG, troponina com mudança dinâmica, risco e estabilidade para decidir estratégia invasiva. Aspirina e outras terapias antitrombóticas dependem da suspeita, contraindicações e protocolos."
    ]
   },
   {
    "h": "Prevenção de erros",
    "p": [
     "Oxigênio não é rotina em saturação adequada; titular se hipoxemia. Não administrar nitratos em hipotensão, certos infartos de VD ou uso recente de inibidor PDE5. Dor lancinante com diferença de pulsos e déficit deve levantar dissecção antes de anticoagulação."
    ]
   }
  ],
  "flow": [
   [
    "Dor torácica de risco",
    "ABCDE e ECG precoce."
   ],
   [
    "Suspeita SCA",
    "Troponina seriada e ECG repetido conforme cenário."
   ],
   [
    "STEMI/equivalente",
    "Acionar reperfusão urgente."
   ],
   [
    "Outras causas letais",
    "Excluir dissecção, TEP, pneumotórax e tamponamento se sinais."
   ]
  ],
  "pitfalls": [
   "Troponina inicial negativa não exclui SCA.",
   "Não esperar troponina para reperfusão de STEMI.",
   "Não anticoagular cegamente se forte suspeita de dissecção."
  ],
  "quiz": [
   {
    "q": "STEMI típico em ECG e clínica: deve-se:",
    "o": [
     "Acionar reperfusão imediata",
     "Esperar troponina seriada antes de qualquer ação",
     "Solicitar teste ergométrico",
     "Dar alta"
    ],
    "a": 0,
    "why": "A reperfusão é tempo-dependente."
   },
   {
    "q": "ECG inicial normal exclui SCA?",
    "o": [
     "Sim",
     "Não, pode exigir ECG/troponina seriados",
     "Somente se menor de 50 anos",
     "Apenas em mulheres"
    ],
    "a": 1,
    "why": "SCA pode apresentar ECG inicial não diagnóstico."
   }
  ],
  "case": {
   "id": "case-sca",
   "focus": "Dor torácica e síndrome coronariana aguda",
   "stem": "Homem 57 anos com dor opressiva há 45 min, sudorese e supra de ST em derivações contíguas.",
   "ask": "Quais primeiros passos e o que não deve atrasar?",
   "answer": [
    "ABCDE, ECG, monitorização, antitrombóticos conforme indicação e contraindicações.",
    "Acionar cardiologia e sistema de reperfusão imediatamente.",
    "Não aguardar troponina para acionar reperfusão em STEMI claro; monitorar arritmias e choque."
   ]
  },
  "refs": [
   "acs2025",
   "slideArritmia"
  ],
  "slide": "1NsJly9D6nDyJ3YAHLS2otXhsqIiHFFks"
 },
 {
  "id": "arritmias",
  "stage": "P2",
  "title": "Taquiarritmias e bradiarritmias",
  "summary": "Regularidade, QRS, estabilidade e conduta elétrica/farmacológica.",
  "goals": [
   "Reconhecer instabilidade hemodinâmica.",
   "Distinguir QRS largo de estreito e pulso.",
   "Escolher cardioversão, desfibrilação ou estimulação."
  ],
  "sections": [
   {
    "h": "Triagem primeiro",
    "p": [
     "Paciente com taquicardia ou bradicardia: avaliar pulso, consciência, PA, dor isquêmica, sinais de choque e IC aguda; obter ECG e monitorização sem atrasar intervenção. Taquicardia instável com pulso e relacionada à arritmia geralmente exige cardioversão sincronizada."
    ]
   },
   {
    "h": "Ritmo e tratamento",
    "p": [
     "Complexo estreito/regular e estável pode ser TSV; manobras vagais e adenosina quando indicado e sem contraindicações. Taquicardia QRS largo deve ser tratada com cautela como possível TV. FA com pré-excitação e QRS irregular/largo exige evitar bloqueadores do nó AV e consulta especializada emergencial."
    ]
   },
   {
    "h": "Bradicardia e ritmos críticos",
    "p": [
     "Bradicardia sintomática com hipoperfusão exige medidas segundo ACLS, incluindo atropina e preparo para marcapasso transcutâneo/infusões conforme resposta. TV sem pulso e FV exigem desfibrilação, não cardioversão sincronizada. Sempre investigar isquemia, eletrólitos e causas precipitantes."
    ]
   }
  ],
  "flow": [
   [
    "Arritmia + instabilidade",
    "Confirmar pulso e monitorizar, agir."
   ],
   [
    "Taquicardia instável com pulso",
    "Cardioversão sincronizada quando apropriada."
   ],
   [
    "Sem pulso FV/TV",
    "Desfibrilar conforme PCR."
   ],
   [
    "Bradicardia com hipoperfusão",
    "Algoritmo de bradicardia e preparo para pacing."
   ]
  ],
  "pitfalls": [
   "Confundir cardioversão sincronizada com desfibrilação.",
   "Dar bloqueador AV em suspeita de FA pré-excitada.",
   "Tomar QRS largo como TSV sem avaliar TV."
  ],
  "quiz": [
   {
    "q": "Taquicardia regular instável com pulso: tratamento elétrico usual?",
    "o": [
     "Cardioversão sincronizada",
     "Desfibrilação assíncrona como regra",
     "Nenhuma intervenção",
     "Apenas observação"
    ],
    "a": 0,
    "why": "Cardioversão sincronizada é intervenção para taquicardia instável com pulso, conforme ritmo."
   },
   {
    "q": "Fibrilação ventricular sem pulso requer:",
    "o": [
     "Desfibrilação",
     "Cardioversão sincronizada",
     "Adenosina",
     "Marcapasso"
    ],
    "a": 0,
    "why": "FV é ritmo de PCR chocável."
   }
  ],
  "case": {
   "id": "case-arritmias",
   "focus": "Taquiarritmias e bradiarritmias",
   "stem": "Homem com FC 190 regular, QRS largo, PA 75/45 e rebaixamento, com pulso.",
   "ask": "Explique avaliação e conduta, incluindo possível erro farmacológico.",
   "answer": [
    "Monitorizar e reconhecer taquicardia instável com pulso.",
    "Considerar TV e realizar cardioversão sincronizada conforme protocolo sem atrasos.",
    "Não administrar adenosina ou bloqueador nodal automaticamente sem identificar contexto; avaliar causas."
   ]
  },
  "refs": [
   "aha",
   "slideArritmia"
  ],
  "slide": "1NsJly9D6nDyJ3YAHLS2otXhsqIiHFFks"
 }
]);

window.EMERGENCY_CONTENT.push(...[
 {
  "id": "glicemia",
  "stage": "P2",
  "title": "Emergências glicêmicas",
  "summary": "Hipoglicemia, cetoacidose diabética e estado hiperosmolar.",
  "goals": [
   "Reconhecer hipoglicemia e tratá-la imediatamente.",
   "Diferenciar CAD e EHH.",
   "Priorizar potássio, fluidos e insulina com segurança."
  ],
  "sections": [
   {
    "h": "Hipoglicemia",
    "p": [
     "Sudorese, tremor, confusão, convulsões e coma em paciente com risco exigem glicemia capilar imediata. Se não pode ingerir com segurança, tratar com glicose IV; glucagon pode ser usado quando acesso não disponível. Reavaliar glicemia e identificar causa/risco de recorrência."
    ]
   },
   {
    "h": "CAD x EHH",
    "p": [
     "CAD: cetonemia importante (beta-hidroxibutirato), acidose metabólica e glicemia elevada ou história conhecida de diabetes; uso de iSGLT2 pode gerar CAD euglicêmica. EHH: hiperglicemia muito intensa, hiperosmolalidade e desidratação, com cetose/acidose ausentes ou menos pronunciadas. Quadros mistos existem."
    ]
   },
   {
    "h": "Tratamento em sequência",
    "p": [
     "Repor fluidos conforme estado e comorbidades, medir eletrólitos e corrigir potássio ANTES da insulina se K perigosamente baixo, monitorar resposta e tratar gatilho. Insulina IV deve seguir protocolo e reavaliações frequentes. Quedas rápidas de osmolaridade são perigosas, sobretudo em EHH."
    ]
   }
  ],
  "flow": [
   [
    "Rebaixamento ou sintomas neuroglicopênicos",
    "Medir HGT e tratar hipoglicemia."
   ],
   [
    "Cetonas + acidose",
    "Considerar CAD, inclusive euglicêmica."
   ],
   [
    "Osmolaridade alta + desidratação",
    "Considerar EHH."
   ],
   [
    "Antes da insulina IV",
    "Checar e corrigir K quando indicado."
   ]
  ],
  "pitfalls": [
   "Não iniciar insulina com hipocalemia grave sem correção.",
   "Glicemia pouco elevada não exclui CAD com iSGLT2.",
   "Não corrigir hiperosmolaridade abruptamente."
  ],
  "quiz": [
   {
    "q": "CAD, K 2,9 mEq/L: próximo passo seguro?",
    "o": [
     "Corrigir potássio antes da insulina",
     "Insulina em alta dose imediatamente",
     "Bicarbonato rotineiro em todos",
     "Suspender monitorização"
    ],
    "a": 0,
    "why": "Insulina pode agravar hipocalemia grave e precipitar arritmias."
   },
   {
    "q": "CAD pode ocorrer com glicemia relativamente baixa em uso de:",
    "o": [
     "Inibidor de SGLT2",
     "Estatina",
     "Antiácido",
     "Vitamina C"
    ],
    "a": 0,
    "why": "CAD euglicêmica é reconhecida em usuários de iSGLT2."
   }
  ],
  "case": {
   "id": "case-glicemia",
   "focus": "Emergências glicêmicas",
   "stem": "Paciente com diabetes em iSGLT2, vômitos, pH 7,18, beta-hidroxibutirato elevado e glicemia 185 mg/dL.",
   "ask": "Qual síndrome e primeira sequência?",
   "answer": [
    "Reconhecer CAD euglicêmica; ABCDE, volume/perfusão e pesquisa de gatilho.",
    "Dosar K, eletrólitos, função renal e osmolaridade; corrigir hipocalemia grave antes de insulina.",
    "Iniciar protocolo monitorado de CAD conforme status volêmico e K, acompanhar cetonemia, eletrólitos e glicemia."
   ]
  },
  "refs": [
   "ada"
  ],
  "slide": null
 },
 {
  "id": "acidobase",
  "stage": "P2",
  "title": "Distúrbios ácido-base e gasometria",
  "summary": "Passo a passo de pH, PaCO₂, HCO₃⁻, compensação e ânion gap.",
  "goals": [
   "Identificar distúrbio primário.",
   "Calcular compensação esperada.",
   "Reconhecer distúrbios mistos e causas urgentes."
  ],
  "sections": [
   {
    "h": "Sequência interpretativa",
    "p": [
     "1) Verificar pH: acidemia ou alcalemia. 2) Comparar PaCO₂ e HCO₃⁻: componente respiratório ou metabólico primário. 3) Calcular compensação para detectar distúrbio misto. 4) Na acidose metabólica, calcular ânion gap, considerar albumina e avaliar lactato, cetonas, rim e intoxicações."
    ]
   },
   {
    "h": "Equações úteis",
    "p": [
     "Ânion gap sem potássio = Na − (Cl + HCO₃), normal depende do laboratório e albumina. Na acidose metabólica, fórmula de Winter: PaCO₂ esperada ≈ 1,5 × HCO₃ + 8 (±2). PaCO₂ medida acima da esperada sugere acidose respiratória adicional; abaixo sugere alcalose respiratória associada."
    ]
   },
   {
    "h": "Decisões",
    "p": [
     "Gasometria é ferramenta, não diagnóstico isolado. Acidose láctica exige buscar hipoperfusão; cetose exige investigar CAD; retenção aguda de CO₂ pode demandar suporte ventilatório. Use valores coerentes com contexto e compare com séries para avaliar resposta."
    ]
   }
  ],
  "flow": [
   [
    "pH alterado",
    "Classificar acidemia/alcalemia."
   ],
   [
    "PaCO₂/HCO₃",
    "Definir componente primário."
   ],
   [
    "Compensação",
    "Aplicar regra adequada e buscar distúrbio misto."
   ],
   [
    "Acidose metabólica",
    "Calcular AG e investigar lactato/cetonas/renal/tóxicos."
   ]
  ],
  "pitfalls": [
   "Não usar fórmula de Winter em alcalose metabólica.",
   "Não interpretar AG sem considerar albumina.",
   "Não tratar apenas o número de pH sem buscar causa."
  ],
  "quiz": [
   {
    "q": "pH 7,20, HCO₃ 10, PaCO₂ 23: qual processo predomina?",
    "o": [
     "Acidose metabólica",
     "Alcalose metabólica",
     "Alcalose respiratória isolada",
     "Normal"
    ],
    "a": 0,
    "why": "HCO₃ reduzido e acidemia indicam acidose metabólica; avaliar compensação."
   },
   {
    "q": "Na acidose metabólica, a fórmula de Winter estima:",
    "o": [
     "PaCO₂ compensatória",
     "Sódio corrigido",
     "Lactato",
     "pH urinário"
    ],
    "a": 0,
    "why": "PaCO₂ esperada ≈ 1,5×HCO₃ + 8 ±2."
   }
  ],
  "case": {
   "id": "case-acidobase",
   "focus": "Distúrbios ácido-base e gasometria",
   "stem": "Paciente séptico com pH 7,19, HCO₃ 12, PaCO₂ 26, Na 140, Cl 101 e lactato 6.",
   "ask": "Calcule AG e explique mecanismo e compensação.",
   "answer": [
    "AG = 140−(101+12)=27, elevado; investigar acidose láctica da hipoperfusão.",
    "Winter: PaCO₂ esperada ≈26±2, compatível com compensação respiratória.",
    "Tratar sepse/hipoperfusão e reavaliar gasometria, lactato e perfusão."
   ]
  },
  "refs": [
   "general",
   "slideAcido"
  ],
  "slide": "1J3CGf_W_-KXdeXqU1ob9mrWk8Sfh6ld-"
 },
 {
  "id": "eletrolitos",
  "stage": "P2",
  "title": "Distúrbios eletrolíticos graves",
  "summary": "Hipercalemia, hipocalemia, sódio e magnésio em risco de arritmia ou convulsão.",
  "goals": [
   "Reconhecer alterações de ECG da hipercalemia.",
   "Priorizar proteção miocárdica quando indicada.",
   "Corrigir sódio com velocidade segura."
  ],
  "sections": [
   {
    "h": "Hipercalemia: coração primeiro",
    "p": [
     "K elevado pode produzir ondas T apiculadas, PR prolongado, QRS largo e arritmias, mas ECG normal não exclui gravidade. Instabilidade ou alterações ECG exigem estabilização de membrana com cálcio IV sob monitorização, depois deslocamento de K com insulina/glicose e outras medidas apropriadas; remoção definitiva via renal ou diálise conforme indicação."
    ]
   },
   {
    "h": "Hipocalemia e magnésio",
    "p": [
     "Hipocalemia pode causar fraqueza, alterações de repolarização, ondas U e arritmias; corrigir K avaliando função renal e magnésio, evitando reposição IV excessivamente rápida. Hipomagnesemia pode perpetuar hipocalemia e arritmias, e magnésio é tratamento de torsades de pointes."
    ]
   },
   {
    "h": "Sódio e neurologia",
    "p": [
     "Hiponatremia gravemente sintomática com convulsão/encefalopatia requer salina hipertônica por esquema controlado e monitorização seriada. Corrigir hiponatremia crônica excessivamente rápido pode causar síndrome de desmielinização osmótica. Hipernatremia requer avaliar tempo de instalação, déficit hídrico e reposição gradual."
    ]
   }
  ],
  "flow": [
   [
    "K alto + ECG alterado",
    "Cálcio IV para proteção miocárdica."
   ],
   [
    "Após estabilizar membrana",
    "Deslocar potássio e planejar eliminação."
   ],
   [
    "Na baixo + convulsões",
    "Salina hipertônica com controle e monitorização."
   ],
   [
    "Qualquer correção",
    "Repetir eletrólitos e avaliar ECG/perfusão."
   ]
  ],
  "pitfalls": [
   "Não confiar em ECG normal para excluir hipercalemia.",
   "Não corrigir hiponatremia crônica rapidamente.",
   "Não dar insulina sem monitorar glicemia."
  ],
  "quiz": [
   {
    "q": "K 7,2 e QRS alargado: prioridade:",
    "o": [
     "Cálcio IV monitorizado",
     "Aguardar diálise sem estabilizar",
     "Apenas dieta",
     "Restrição hídrica"
    ],
    "a": 0,
    "why": "O cálcio reduz risco elétrico enquanto outras medidas removem potássio."
   },
   {
    "q": "Hiponatremia grave com convulsão: tratamento inicial apropriado:",
    "o": [
     "Salina hipertônica monitorizada",
     "Água livre",
     "Insulina",
     "Furosemida sempre isolada"
    ],
    "a": 0,
    "why": "Neurossintomas graves exigem correção controlada com solução hipertônica."
   }
  ],
  "case": {
   "id": "case-eletrolitos",
   "focus": "Distúrbios eletrolíticos graves",
   "stem": "Paciente com IRC, K 7,0 mEq/L, QRS alargado e fraqueza.",
   "ask": "Ordene proteção do coração, deslocamento e remoção de K.",
   "answer": [
    "Monitorização ECG contínua e cálcio IV de acordo com protocolo.",
    "Insulina/glicose e medidas complementares de deslocamento conforme indicação.",
    "Remover K (diurese/quelantes/diálise conforme cenário), reavaliar glicemia e K em intervalos curtos."
   ]
  },
  "refs": [
   "general",
   "slideAcido"
  ],
  "slide": "1J3CGf_W_-KXdeXqU1ob9mrWk8Sfh6ld-"
 },
 {
  "id": "tireoide",
  "stage": "P2",
  "title": "Emergências tireoidianas",
  "summary": "Tempestade tireotóxica e coma mixedematoso: diagnóstico clínico e tratamento.",
  "goals": [
   "Distinguir hipertermia agitada de hipotermia com coma.",
   "Iniciar suporte e terapia específica.",
   "Identificar gatilhos e evitar atrasos."
  ],
  "sections": [
   {
    "h": "Tempestade tireotóxica",
    "p": [
     "Febre, taquicardia intensa, arritmia, agitação/delirium, sintomas gastrointestinais e insuficiência cardíaca podem representar tempestade em paciente hipertireóideo. O diagnóstico é sobretudo clínico; não aguarde função tireoidiana para iniciar suporte, correção de gatilho e terapia de controle hormonal."
    ]
   },
   {
    "h": "Tratamento da tempestade",
    "p": [
     "Abordagem multimodal: controle adrenérgico conforme hemodinâmica (betabloqueador com cautela em IC/choque), antitireoidiano, iodeto após o antitireoidiano conforme protocolo, glicocorticoide, suporte térmico e tratamento do precipitante. Encaminhar UTI e endocrinologia."
    ]
   },
   {
    "h": "Coma mixedematoso",
    "p": [
     "Alteração de sensório, hipotermia, bradicardia, hipoventilação, hiponatremia e hipoglicemia sugerem hipotireoidismo extremo descompensado. Proteger via aérea, aquecimento cuidadoso e suporte hemodinâmico; hormônio tireoidiano IV e glicocorticoide empírico antes ou junto, após avaliação apropriada, conforme especialista."
    ]
   }
  ],
  "flow": [
   [
    "Febre + taquiarritmia + hipertireoidismo",
    "Suspeitar tempestade tireotóxica."
   ],
   [
    "Tempestade",
    "Suporte + terapia hormonal multimodal e gatilho."
   ],
   [
    "Hipotermia + coma/bradicardia",
    "Suspeitar coma mixedematoso e proteger ventilação."
   ],
   [
    "Coma mixedematoso",
    "Glicocorticoide de estresse e reposição tireoidiana conforme protocolo."
   ]
  ],
  "pitfalls": [
   "Não usar betabloqueador sem avaliar choque/IC.",
   "Não dar iodeto antes de tionamida na tempestade, em esquema convencional.",
   "Não esquecer insuficiência adrenal associada no coma mixedematoso."
  ],
  "quiz": [
   {
    "q": "Hipotermia, bradicardia, hipoventilação e coma: principal hipótese?",
    "o": [
     "Coma mixedematoso",
     "Tempestade tireotóxica",
     "Crise asmática",
     "SCA típica"
    ],
    "a": 0,
    "why": "O conjunto é compatível com hipotireoidismo extremo descompensado."
   },
   {
    "q": "Na tempestade tireotóxica, o iodeto convencionalmente é dado:",
    "o": [
     "Após antitireoidiano",
     "Antes de qualquer bloqueio hormonal",
     "Sem suporte hemodinâmico",
     "Em todos apenas por via oral domiciliar"
    ],
    "a": 0,
    "why": "A sequência evita fornecer substrato hormonal antes de inibir síntese."
   }
  ],
  "case": {
   "id": "case-tireoide",
   "focus": "Emergências tireoidianas",
   "stem": "Mulher com hipotireoidismo, hipotermia 33 °C, bradicardia, hipoventilação e rebaixamento.",
   "ask": "Qual suspeita, suportes e precauções?",
   "answer": [
    "Suspeitar coma mixedematoso e estabilizar ABCDE/ventilação, temperatura e hemodinâmica.",
    "Solicitar avaliação endócrina/UTI, iniciar reposição tireoidiana IV e glicocorticoide conforme protocolo.",
    "Corrigir distúrbios e investigar desencadeante, como infecção."
   ]
  },
  "refs": [
   "general"
  ],
  "slide": null
 }
]);
