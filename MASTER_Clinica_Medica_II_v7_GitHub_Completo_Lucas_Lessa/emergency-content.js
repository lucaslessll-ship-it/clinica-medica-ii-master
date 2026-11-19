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
