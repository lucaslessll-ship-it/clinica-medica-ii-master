/* Radiologia de Cirurgia · seleção didática de oito aulas fornecidas.
   As imagens originais ficam na galeria autenticada, fora do repositório público. */
(()=>{
const supplements={
  "cirrad_0": {
    "supplement": [
      {
        "h": "Obstrução: transforme o padrão em uma pergunta clínica",
        "p": [
          "<strong>Na anamnese:</strong> pergunte sobre cirurgias anteriores, hérnias, neoplasia, vômitos, eliminação de gases e fezes. Ao exame, registre distensão, cicatrizes, orifícios herniários e sinais de peritonite. Dor contínua crescente, instabilidade ou defesa exigem reavaliação urgente.",
          "<strong>Na radiografia:</strong> pregas que cruzam todo o lúmen favorecem delgado; haustrações são incompletas. Delgado acima de aproximadamente 3 cm e cólon acima de 6 cm são pistas de dilatação, não diagnósticos isolados. Gás distal não exclui obstrução parcial ou recente.",
          "<strong>Na TC:</strong> siga a sequência dilatação proximal → transição → descompressão distal → causa → sinais de complicação. Em obstrução aguda suspeita, a TC com contraste intravenoso costuma esclarecer melhor a causa e a perfusão; não é obrigatório começar sempre por radiografia."
        ],
        "imageKey": "cirrad_media_obstrucao"
      },
      {
        "h": "Volvo e alça fechada: o desenho importa, a perfusão também",
        "p": [
          "O <strong>grão de café</strong> sugere volvo de sigmoide. Na TC, procure afilamento em bico e torção do mesentério. Dois pontos de transição envolvendo o mesmo segmento sugerem alça fechada e maior risco de estrangulamento.",
          "<strong>Como comunicar:</strong> “Distensão de alças de delgado com transição em…, associada a…”. Acrescente presença ou ausência de hiporrealce, líquido, pneumatose e gás livre conforme o exame completo. Não escreva “sem isquemia” apenas porque a radiografia não mostrou pneumatose."
        ],
        "imageKey": "cirrad_media_volvo"
      }
    ],
    "updated": "18/11/2026"
  },
  "cirrad_1": {
    "supplement": [
      {
        "h": "Apendicite: primeiro localize, depois some os sinais",
        "p": [
          "<strong>Perguntas úteis:</strong> início e migração da dor, anorexia, febre, sintomas urinários, ginecológicos e possibilidade de gestação. Descreva dor localizada, defesa e sinais de irritação peritoneal; a ausência de um sinal clássico não exclui a doença.",
          "No US, procure uma <strong>estrutura tubular em fundo cego, não compressível</strong>, oriunda do ceco, com alteração da gordura e possível hiperemia. Diâmetro aumentado, frequentemente acima de 6 mm, é apenas parte do conjunto. Não visualizar o apêndice é exame inconclusivo, não resultado negativo.",
          "Na TC, combine espessamento/dilatação apendicular com inflamação da gordura e procure abscesso, defeito da parede ou gás extraluminal. O apendicolito isolado não basta. O método é escolhido conforme probabilidade clínica, idade e gestação; nesta, US e depois RM quando necessária evitam radiação."
        ],
        "imageKey": "cirrad_media_apendice"
      },
      {
        "h": "Diverticulite: identifique o foco e procure a complicação",
        "p": [
          "A associação de <strong>divertículos, espessamento segmentar do cólon e densificação da gordura pericólica</strong> sustenta a hipótese no contexto adequado. Dor em fossa ilíaca esquerda é frequente, mas não obrigatória.",
          "Descreva localização, extensão, coleções, gás extraluminal, obstrução e fístulas. Abscesso localizado e peritonite difusa têm implicações diferentes. Espessamento colônico também pode representar neoplasia ou colite; a avaliação posterior depende da apresentação e do contexto.",
          "<strong>Modelo de síntese:</strong> “Processo inflamatório centrado em segmento colônico com divertículos, associado a…, sem/com coleção identificável no estudo”. Não atribua gravidade só ao tamanho da área de gordura inflamada."
        ],
        "imageKey": "cirrad_media_diverticulite"
      }
    ],
    "updated": "18/11/2026"
  },
  "cirrad_2": {
    "supplement": [
      {
        "h": "FAST: aprenda a janela normal antes de procurar líquido",
        "p": [
          "O FAST responde a uma pergunta dirigida à beira-leito: <strong>há líquido livre nas janelas avaliadas?</strong> Reconheça pericárdio, espaço hepatorrenal, esplenorrenal/subdiafragmático e pelve. O eFAST acrescenta avaliação pleuropulmonar para pneumotórax e hemotórax.",
          "Comece identificando órgão sólido, rim, diafragma ou bexiga. Vasos, gordura e a vesícula podem simular achados. A ausência de líquido em uma única imagem não representa avaliação de todas as janelas."
        ],
        "imageKey": "cirrad_media_fast_normal"
      },
      {
        "h": "FAST positivo, negativo ou tecnicamente limitado",
        "p": [
          "Uma faixa anecoica em espaço dependente sugere líquido livre. Sangue recente pode parecer simples; coágulos podem produzir ecos. O FAST não define sozinho a composição do líquido nem a víscera lesada.",
          "<strong>Paciente instável:</strong> ressuscitação e decisão imediata com a equipe de trauma; imagem não deve atrasar controle de hemorragia. <strong>Paciente estável com suspeita relevante:</strong> TC contrastada pode avaliar lesões que o FAST não detecta.",
          "<strong>FAST negativo não exclui lesão.</strong> Pequenos volumes, lesões de víscera oca, retroperitônio e limitações técnicas podem passar despercebidos. Registre janelas obtidas, limitações e necessidade de repetição ou investigação complementar."
        ],
        "imageKey": "cirrad_media_fast_positivo"
      }
    ],
    "updated": "18/11/2026"
  },
  "cirrad_3": {
    "supplement": [
      {
        "h": "Além da hemorragia digestiva: sangue fora do tubo digestivo",
        "p": [
          "<strong>Hemorragia intraluminal</strong> causa hematêmese, melena ou hematoquezia; <strong>hemoperitônio e hematoma retroperitoneal</strong> podem causar dor e choque sem exteriorização de sangue. Não aplique automaticamente o mesmo protocolo de imagem.",
          "Pergunte sobre trauma, anticoagulantes, gestação possível, procedimentos e aneurisma conhecido. Registre perfusão, pressão, frequência cardíaca, dor, distensão e sinais peritoneais. Hemoglobina inicial preservada não exclui sangramento agudo.",
          "No US, líquido com ecos pode corresponder a sangue. Na TC sem contraste, sangue recente costuma ser mais denso que líquido simples, e coágulos podem ser ainda mais densos; hematócrito, diluição e tempo alteram o aspecto. Não use uma faixa de unidades Hounsfield como prova isolada."
        ],
        "imageKey": "cirrad_media_hemoperitonio"
      },
      {
        "h": "Aneurisma roto: o retroperitônio explica o FAST negativo",
        "p": [
          "Dor abdominal ou lombar e instabilidade, sobretudo em quem tem aneurisma conhecido, exigem avaliação imediata. Se houver condições clínicas para imagem, a <strong>angioTC</strong> define anatomia, hematoma e planejamento. A investigação não deve atrasar tratamento em paciente instável com forte suspeita.",
          "No exemplo, observe a aorta dilatada e o hematoma adjacente. Ausência de extravasamento no corte exibido não exclui ruptura. Em atraso menstrual e dor pélvica, pense em gestação ectópica e combine β-hCG com US transvaginal; “anel de fogo” não é específico."
        ],
        "imageKey": "cirrad_media_aorta_rota"
      }
    ],
    "updated": "18/11/2026"
  }
};
LessonDeep.extend(supplements);
LessonDeep.add({
  "cirrad_6": {
    "updated": "18/11/2026",
    "pretest": [
      "Por que uma lesão hepática precisa ser interpretada nas fases corretas?",
      "Como distinguir cisto simples de lesão cística complexa?",
      "Que alterações morfológicas sugerem cirrose?",
      "Qual o papel das veias hepáticas na segmentação?",
      "Um fígado de volume normal exclui cirrose?",
      "Que diferença o histórico oncológico faz?"
    ],
    "sections": [
      {
        "h": "Anatomia que orienta a leitura e a cirurgia",
        "p": [
          "O fígado tem <strong>suprimento portal e arterial</strong>. Os segmentos de Couinaud são territórios portais; as veias hepáticas delimitam planos entre setores. Descreva a relação de uma lesão com vasos e vias biliares, além do segmento.",
          "No US, avalie ecotextura, superfície, dimensões, vasos, ductos e líquido livre. Na TC/RM, identifique a fase antes de julgar o realce: uma lesão pode ser quase invisível em um tempo e evidente em outro."
        ]
      },
      {
        "h": "Doença difusa: cirrose não é apenas “fígado pequeno”",
        "p": [
          "Superfície nodular, parênquima heterogêneo e <strong>redistribuição de volume</strong>, com possível hipertrofia caudada e de segmentos laterais esquerdos, favorecem hepatopatia crônica. O volume total varia.",
          "Procure esplenomegalia, colaterais portossistêmicas e ascite. Na história, registre fatores de risco hepáticos; no exame, ascite, icterícia e sinais de hepatopatia. US morfológico normal não exclui fibrose inicial."
        ],
        "imageKey": "cirrad_media_figado_cirrose"
      },
      {
        "h": "Lesões focais: compare composição e comportamento",
        "p": [
          "Uma lesão incidental em fígado saudável e um nódulo em fígado cirrótico têm probabilidades diferentes. História de câncer, hepatopatia e uso hormonal muda o raciocínio."
        ],
        "table": {
          "head": [
            "Padrão",
            "Achados que orientam",
            "Cuidado"
          ],
          "rows": [
            [
              "Cisto simples",
              "Anecoico, parede fina, reforço posterior; conteúdo líquido e ausência de realce",
              "Se houver septos espessos, componente sólido ou realce, não chamar de simples"
            ],
            [
              "Hemangioma",
              "Realce nodular periférico descontínuo com preenchimento centrípeto progressivo; sinal alto em T2",
              "Uma imagem hiperecogênica isolada não basta em paciente oncológico ou com hepatopatia"
            ],
            [
              "Hiperplasia nodular focal",
              "Realce arterial frequentemente homogêneo; cicatriz pode existir; RM com contraste hepatobiliar ajuda",
              "Cicatriz não é obrigatória; padrão deve ser integrado"
            ],
            [
              "Adenoma",
              "Aspecto variável; pode conter gordura ou hemorragia",
              "Não confundir todos os tumores hipervasculares; contexto e subtipo importam"
            ],
            [
              "Nódulo no fígado de risco",
              "Caracterização multifásica segundo critérios apropriados ao grupo de risco",
              "Realce arterial isolado não confirma carcinoma hepatocelular"
            ],
            [
              "Metástases",
              "Número e realce variáveis conforme o tumor primário",
              "Lesão múltipla não é sinônimo de metástase: cistos e hamartomas também podem ser múltiplos"
            ]
          ]
        }
      },
      {
        "h": "Cistos complexos, abscessos e dilatação biliar",
        "p": [
          "<strong>Abscesso</strong> entra no diferencial de febre, dor e lesão de conteúdo complexo com realce periférico; correlacione com infecção biliar, bacteremia e contexto epidemiológico. Gás pode ajudar, mas sua ausência não exclui.",
          "Cistos com vesículas-filhas ou membranas exigem diferencial de doença hidática; não indicar punção de rotina sem avaliação especializada. Na doença de Caroli, dilatações saculares comunicam-se com a árvore biliar; a colangiorressonância ajuda a demonstrar essa relação.",
          "<strong>Redação útil:</strong> “Lesão no segmento…, de composição…, com comportamento nas fases… e relação com…”. Acrescente limitações e recomendação de caracterização quando o protocolo não responde à pergunta."
        ]
      }
    ],
    "reasoning": [
      "O contexto de hepatopatia muda a probabilidade e os critérios diagnósticos.",
      "Fase de contraste e composição valem mais que chamar toda lesão de “nódulo”."
    ],
    "mnemonics": [
      {
        "n": "Localize → caracterize → decida",
        "t": "Descreva o achado, integre-o com a clínica e explique qual decisão ele modifica."
      },
      {
        "n": "Fase + fígado + foco",
        "t": "A fase do exame e o fígado de origem mudam a interpretação de qualquer foco."
      },
      {
        "n": "Simples tem critérios",
        "t": "Não basta ser escuro no US ou hipodenso na TC para ser um cisto simples."
      }
    ],
    "pitfalls": [
      "Diagnosticar hemangioma por ecogenicidade isolada em fígado de risco.",
      "Chamar lesão com componente sólido realçante de cisto simples.",
      "Afirmar ausência de tumor a partir de uma única fase inadequada."
    ],
    "recall": [
      {
        "q": "O que torna um cisto não simples?",
        "a": "Septos espessos, parede irregular, componente sólido, realce ou conteúdo não simples exigem caracterização."
      },
      {
        "q": "Qual o padrão clássico do hemangioma?",
        "a": "Realce nodular periférico descontínuo com preenchimento centrípeto progressivo, no contexto e protocolo adequados."
      },
      {
        "q": "Por que procurar colaterais e esplenomegalia?",
        "a": "São pistas de hipertensão portal e ajudam a integrar a morfologia hepática com repercussões clínicas."
      },
      {
        "q": "Qual o papel das veias hepáticas na segmentação?",
        "a": "Ajudam a delimitar planos entre setores; segmentos são territórios de distribuição portal."
      },
      {
        "q": "Um fígado de volume normal exclui cirrose?",
        "a": "Não. Contorno, redistribuição de volume e sinais de hipertensão portal devem ser analisados em conjunto."
      },
      {
        "q": "Que diferença o histórico oncológico faz?",
        "a": "Muda a probabilidade pré-teste e a necessidade de caracterização contrastada de uma lesão aparentemente benigna."
      },
      {
        "q": "Por que uma lesão vista em apenas uma fase pode ficar indeterminada?",
        "a": "Sem comparar as fases não é possível caracterizar adequadamente o padrão de realce."
      },
      {
        "q": "Febre com lesão hepática complexa sugere qual diferencial?",
        "a": "Abscesso, entre outros; correlacionar com contexto infeccioso, laboratorial e outras características."
      }
    ],
    "practice": [
      "Diante de uma lesão, diga primeiro em qual fase e método está olhando.",
      "Descreva superfície, distribuição de volume e sinais de hipertensão portal antes de concluir “cirrose”."
    ],
    "refs": [
      {
        "t": "EASL — Management of benign liver tumours",
        "u": "https://easl.eu/wp-content/uploads/2016/10/EASL-CPG-on-Management-of-benign-liver-tumours.pdf"
      },
      {
        "t": "ACG — Focal Liver Lesions, 2024",
        "u": "https://doi.org/10.14309/ajg.0000000000002857"
      }
    ],
    "cases": [
      {
        "title": "Lesão focal em fígado de risco",
        "data": "Pessoa com cirrose tem nódulo novo no US.",
        "reasoning": [
          "Uma lesão nova nesse contexto não deve ser presumida hemangioma pela aparência isolada.",
          "É preciso caracterização com estudo multifásico apropriado e aplicação dos critérios destinados a pacientes de risco."
        ],
        "conduct": "Encaminhar para avaliação e protocolo de caracterização adequado, integrando exames anteriores e função hepática.",
        "error": "Tranquilizar o paciente porque o nódulo parece bem delimitado."
      },
      {
        "title": "Cisto que não é simples",
        "data": "Lesão hepática descrita como cística apresenta septos espessos e componente mural.",
        "reasoning": [
          "Essas características afastam a definição de cisto simples.",
          "É necessário avaliar realce, conteúdo, histórico e exames prévios."
        ],
        "conduct": "Caracterização por protocolo apropriado e avaliação especializada conforme os achados.",
        "error": "Encerrar a investigação porque o conteúdo predominante parece líquido."
      }
    ],
    "note": "Síntese didática das aulas fornecidas, com seleção de imagens e atualização dos pontos de decisão. Imagens estáticas não substituem o estudo completo e o laudo radiológico.",
    "exam": [
      {
        "pattern": "Nódulo hiperecogênico em pessoa com câncer",
        "trap": "Presumir hemangioma apenas pela ecogenicidade",
        "answer": "Caracterizar no contexto oncológico com exame adequado."
      },
      {
        "pattern": "Lesão com septos e nódulo realçante",
        "trap": "Chamar de cisto simples",
        "answer": "Reconhecer complexidade e indicar caracterização especializada."
      },
      {
        "pattern": "Contorno hepático irregular e colaterais",
        "trap": "Avaliar apenas o tamanho do fígado",
        "answer": "Integrar morfologia e sinais de hipertensão portal."
      },
      {
        "pattern": "Lesão com realce arterial isolado",
        "trap": "Confirmar carcinoma sem grupo de risco nem demais critérios",
        "answer": "Rever fases, contexto e critérios diagnósticos apropriados."
      }
    ],
    "flow": {
      "title": "Da pergunta clínica à decisão",
      "nodes": [
        {
          "k": "start",
          "t": "Identificar contexto: hepatopatia, câncer, infecção e exames prévios."
        },
        {
          "k": "do",
          "t": "Localizar lesão e relação com vasos e ductos."
        },
        {
          "k": "do",
          "t": "Caracterizar conteúdo: líquido, gordura ou tecido sólido."
        },
        {
          "k": "do",
          "t": "Comparar realce nas fases adequadas."
        },
        {
          "k": "do",
          "t": "Pesquisar repercussões e sinais de hipertensão portal."
        },
        {
          "k": "end",
          "t": "Integrar a hipótese e explicitar o que ainda exige caracterização."
        }
      ]
    }
  },
  "cirrad_7": {
    "updated": "18/11/2026",
    "pretest": [
      "Qual achado diferencia cálculo de lama biliar no US?",
      "Por que espessamento da parede vesicular isolado não confirma colecistite?",
      "O que a colangiorressonância faz que a CPRE não deve ser usada apenas para investigar?",
      "Por que radiografia normal não exclui colelitíase?",
      "Que quadro sistêmico pode espessar a parede vesicular?",
      "Quando obstrução biliar se torna uma urgência infecciosa?"
    ],
    "sections": [
      {
        "h": "Colelitíase: eco, sombra e mobilidade",
        "p": [
          "O US costuma mostrar <strong>focos ecogênicos com sombra posterior</strong>; mobilidade é avaliada mudando o decúbito. A lama tende a se depositar sem a sombra típica do cálculo. A maioria dos cálculos não é visível na radiografia simples, e a TC também pode não demonstrá-los.",
          "Dor biliar costuma ser contínua durante a crise, apesar do nome “cólica”. Investigue duração, relação alimentar, febre, icterícia e sinais de inflamação. Cálculo incidental sem contexto não explica automaticamente toda dor abdominal."
        ],
        "imageKey": "cirrad_media_biliar_calculos"
      },
      {
        "h": "Colecistite: combine clínica, laboratório e imagem",
        "p": [
          "Busque distensão, parede espessada, cálculo impactado, líquido pericolecístico e Murphy ultrassonográfico. <strong>Espessamento isolado é inespecífico</strong>: pode ocorrer por congestão, hepatopatia e hipoalbuminemia. Ausência de Murphy não exclui doença, especialmente em pacientes graves ou após analgesia.",
          "US é uma opção inicial importante. Se persistir dúvida ou houver suspeita de complicação, o próximo método depende da pergunta e da disponibilidade. TC ajuda a avaliar gás, perfuração e diagnósticos alternativos; cintilografia e RM têm papéis selecionados.",
          "Na colecistite enfisematosa, avalie gás intramural e intraluminal, além de diagnósticos alternativos ligados a procedimentos e fístulas. A suspeita de gangrena, perfuração ou sepse exige discussão urgente."
        ],
        "imageKey": "cirrad_media_biliar_inflamacao"
      },
      {
        "h": "Icterícia: localize a obstrução antes de nomear a causa",
        "p": [
          "Correlacione bilirrubina direta, fosfatase alcalina e GGT com colúria, acolia, dor e perda de peso. No US, procure dilatação intra/extra-hepática e cálculo; <strong>colédoco não dilatado não exclui cálculo</strong>, especialmente no início.",
          "A <strong>CPRM</strong> e a ecoendoscopia esclarecem suspeitas selecionadas de coledocolitíase; a <strong>CPRE</strong> tem papel principalmente terapêutico, pois pode drenar e retirar cálculos, mas tem riscos. Febre, icterícia e sinais de disfunção orgânica exigem pensar em colangite e descompressão conforme gravidade.",
          "Em obstrução hilar, a dilatação pode ser predominantemente intra-hepática, com colédoco distal não dilatado. No colangiocarcinoma, descreva extensão ductal, relação vascular e atrofia lobar. Bismuth-Corlette descreve extensão longitudinal do tumor perihilar, não todo seu estadiamento."
        ],
        "imageKey": "cirrad_media_biliar_obstrucao"
      }
    ],
    "reasoning": [
      "Separe três perguntas: há cálculo, há inflamação, há obstrução do ducto principal?",
      "A imagem localiza a obstrução; gravidade clínica determina a urgência."
    ],
    "mnemonics": [
      {
        "n": "Localize → caracterize → decida",
        "t": "Descreva o achado, integre-o com a clínica e explique qual decisão ele modifica."
      },
      {
        "n": "Cálculo, parede, ducto",
        "t": "Três perguntas diferentes: litíase, inflamação e obstrução."
      },
      {
        "n": "Mapear não é drenar",
        "t": "A CPRM mapeia; a CPRE pode tratar, mas traz riscos."
      }
    ],
    "pitfalls": [
      "Confundir colelitíase com colecistite.",
      "Excluir coledocolitíase por US sem dilatação.",
      "Usar a tríade de Charcot completa como requisito para reconhecer colangite."
    ],
    "recall": [
      {
        "q": "O que favorece cálculo no US?",
        "a": "Foco ecogênico com sombra posterior; mobilidade é confirmada durante o exame."
      },
      {
        "q": "Qual o papel da CPRM?",
        "a": "Mapear ductos, nível de obstrução e possíveis causas sem realizar drenagem."
      },
      {
        "q": "Por que parede espessada não basta?",
        "a": "Edema por doenças sistêmicas também espessa a parede; é preciso combinar clínica e outros achados."
      },
      {
        "q": "Por que radiografia normal não exclui colelitíase?",
        "a": "A maior parte dos cálculos biliares não é radiopaca."
      },
      {
        "q": "Que quadro sistêmico pode espessar a parede vesicular?",
        "a": "Congestão, hepatopatia e hipoalbuminemia são exemplos; a interpretação depende do contexto."
      },
      {
        "q": "Quando obstrução biliar se torna uma urgência infecciosa?",
        "a": "Na suspeita de colangite, sobretudo com disfunção orgânica, é preciso avaliar sepse e controle de foco."
      },
      {
        "q": "Obstrução hilar sempre dilata o colédoco distal?",
        "a": "Não. Pode haver dilatação intra-hepática com ducto distal não dilatado."
      },
      {
        "q": "O que a classificação Bismuth-Corlette descreve?",
        "a": "A extensão ductal longitudinal do colangiocarcinoma perihilar; não é o estadiamento oncológico completo."
      }
    ],
    "practice": [
      "Descreva ductos intra e extra-hepáticos separadamente.",
      "Em febre com icterícia, procure sinais de sepse e disfunção orgânica antes de se limitar ao diagnóstico anatômico."
    ],
    "refs": [
      {
        "t": "WSES — Acute calculous cholecystitis, 2020",
        "u": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7643471/"
      },
      {
        "t": "ASGE — Evaluation and management of choledocholithiasis, 2019",
        "u": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8594622/"
      }
    ],
    "cases": [
      {
        "title": "Icterícia com febre",
        "data": "Pessoa com dor no hipocôndrio direito, febre, colúria e hipotensão.",
        "reasoning": [
          "A combinação sugere infecção biliar com repercussão sistêmica.",
          "O exame de imagem deve procurar obstrução, mas a ausência de um cálculo visível não torna o quadro benigno."
        ],
        "conduct": "Avaliar e tratar sepse, colher exames e discutir controle de foco/drenagem biliar com a equipe conforme gravidade.",
        "error": "Esperar demonstração perfeita do cálculo para reconhecer a urgência."
      },
      {
        "title": "Parede espessada na congestão",
        "data": "Pessoa com insuficiência cardíaca e ascite tem espessamento vesicular, sem dor localizada nem síndrome inflamatória.",
        "reasoning": [
          "Edema sistêmico pode explicar o achado.",
          "Parede espessada isoladamente não preenche o raciocínio de colecistite."
        ],
        "conduct": "Correlacionar com clínica e achados completos; reavaliar se surgirem sinais de inflamação ou dor.",
        "error": "Indicar tratamento de colecistite exclusivamente pelo espessamento."
      }
    ],
    "note": "Síntese didática das aulas fornecidas, com seleção de imagens e atualização dos pontos de decisão. Imagens estáticas não substituem o estudo completo e o laudo radiológico.",
    "exam": [
      {
        "pattern": "Cálculo com sombra, sem sinais inflamatórios",
        "trap": "Confundir litíase com colecistite",
        "answer": "Separar presença de cálculo da inflamação vesicular."
      },
      {
        "pattern": "Parede espessada em pessoa com ascite",
        "trap": "Concluir colecistite apenas pela parede",
        "answer": "Integrar clínica, Murphy e demais sinais."
      },
      {
        "pattern": "Icterícia com US inconclusivo",
        "trap": "Excluir cálculo do colédoco",
        "answer": "Estratificar risco e considerar CPRM/ecoendoscopia."
      },
      {
        "pattern": "Febre e icterícia com confusão",
        "trap": "Aguardar tríade completa ou imagem perfeita",
        "answer": "Reconhecer possível colangite com disfunção orgânica e agir com urgência."
      }
    ],
    "flow": {
      "title": "Da pergunta clínica à decisão",
      "nodes": [
        {
          "k": "start",
          "t": "Definir síndrome: dor biliar, inflamação ou colestase."
        },
        {
          "k": "do",
          "t": "Avaliar gravidade e sinais de infecção/disfunção orgânica."
        },
        {
          "k": "do",
          "t": "Examinar vesícula e árvore biliar no US quando apropriado."
        },
        {
          "k": "do",
          "t": "Combinar sinais; não diagnosticar por parede ou cálculo isolado."
        },
        {
          "k": "do",
          "t": "Esclarecer obstrução com CPRM/ecoendoscopia conforme risco e cenário."
        },
        {
          "k": "end",
          "t": "Planejar tratamento e eventual drenagem conforme diagnóstico e urgência."
        }
      ]
    }
  },
  "cirrad_8": {
    "updated": "18/11/2026",
    "pretest": [
      "Quando a pancreatite pode ser diagnosticada sem TC?",
      "Realce ausente e calcificações representam a mesma fase da doença?",
      "Por que o sinal do duplo ducto não confirma câncer sozinho?",
      "Qual a utilidade inicial do US na pancreatite?",
      "O que sugere doença pancreática crônica na imagem?",
      "Por que uma TC precoce pode subestimar necrose?"
    ],
    "sections": [
      {
        "h": "Pancreatite aguda: a indicação vem antes da classificação",
        "p": [
          "O diagnóstico requer <strong>dois de três critérios</strong>: dor típica, lipase/amílase acima de três vezes o limite superior ou imagem compatível. Se dor e enzimas já sustentam o diagnóstico, TC de rotina na admissão não é necessária apenas para “confirmar”. US ajuda a investigar etiologia biliar.",
          "TC contrastada é útil na dúvida diagnóstica, evolução desfavorável ou suspeita de complicações. Quando a finalidade é avaliar necrose, o exame muito precoce pode subestimá-la; a indicação e o tempo desde o início dos sintomas devem ser explicitados.",
          "No padrão intersticial, procure realce preservado e inflamação peripancreática. Na forma necrosante, procure tecido sem realce e necrose pancreática e/ou peripancreática. Uma coleção heterogênea deve ser descrita segundo conteúdo, tempo e organização."
        ],
        "imageKey": "cirrad_media_pancreas_agudo"
      },
      {
        "h": "Coleções e hemorragia: descreva conteúdo, parede e tempo",
        "p": [
          "Na pancreatite intersticial, coleção líquida aguda pode evoluir para <strong>pseudocisto</strong> após organização, em geral depois de quatro semanas, sem componente necrótico significativo. Na pancreatite necrosante, a coleção necrótica aguda pode evoluir para <strong>necrose encapsulada</strong>, com conteúdo sólido/líquido. O tempo é orientador, não substitui avaliar a parede.",
          "Gás em coleção aumenta a suspeita de infecção, mas deve ser contextualizado com intervenção prévia ou fístula. Sangramento, queda de hemoglobina ou instabilidade levantam suspeita de complicação vascular, como pseudoaneurisma; angioTC pode orientar tratamento.",
          "Balthazar/índice tomográfico descreve alterações de imagem; <strong>gravidade clínica de Atlanta depende de falência orgânica</strong> e complicações. Não usar apenas a imagem para rotular gravidade sistêmica."
        ]
      },
      {
        "h": "Pancreatite crônica: associe estrutura e função",
        "p": [
          "Calcificações, dilatação/irregularidade ductal e atrofia sugerem dano crônico. Procure história de crises, fatores de risco, perda de peso, esteatorreia e diabetes. Exames de imagem e testes funcionais respondem a perguntas diferentes.",
          "<strong>Redação:</strong> “Calcificações pancreáticas associadas a…, compatíveis com pancreatopatia crônica no contexto clínico”. Ausência de calcificação não exclui doença inicial."
        ],
        "imageKey": "cirrad_media_pancreas_cronico"
      },
      {
        "h": "Massa pancreática e duplo ducto",
        "p": [
          "Icterícia progressiva, emagrecimento e massa pouco realçante na cabeça do pâncreas sugerem neoplasia. Observe interrupção ductal, atrofia a montante e relação com vasos. TC com protocolo pancreático e/ou RM ajudam na caracterização e no planejamento.",
          "O <strong>duplo ducto</strong> indica obstrução conjunta das vias biliar e pancreática, mas também pode ocorrer em causas benignas. Imagem estática ou sinal isolado não define histologia nem ressecabilidade; obtenção de tecido e estadiamento dependem do cenário clínico."
        ],
        "imageKey": "cirrad_media_pancreas_massa"
      }
    ],
    "reasoning": [
      "Diferencie diagnóstico, etiologia e pesquisa de complicação: cada pergunta muda o exame.",
      "Necrose requer avaliar realce em estudo contrastado adequado, considerando o tempo da doença."
    ],
    "mnemonics": [
      {
        "n": "Localize → caracterize → decida",
        "t": "Descreva o achado, integre-o com a clínica e explique qual decisão ele modifica."
      },
      {
        "n": "Dois de três",
        "t": "Dor, enzimas e imagem: dois critérios sustentam o diagnóstico."
      },
      {
        "n": "Conteúdo antes do nome",
        "t": "Líquido e necrose organizada não são a mesma coleção."
      }
    ],
    "pitfalls": [
      "Pedir TC precoce de rotina apenas para confirmar quadro já típico.",
      "Chamar toda coleção após pancreatite de pseudocisto.",
      "Confundir imagem de hemorragia com prova de necrose ou de infecção."
    ],
    "recall": [
      {
        "q": "Quais são os dois de três critérios?",
        "a": "Dor típica, enzimas acima de três vezes o limite superior e imagem compatível; bastam dois."
      },
      {
        "q": "Pseudocisto e necrose encapsulada são iguais?",
        "a": "Não. Pseudocisto é predominantemente líquido após pancreatite intersticial; necrose encapsulada contém material necrótico, no contexto de pancreatite necrosante."
      },
      {
        "q": "O duplo ducto confirma adenocarcinoma?",
        "a": "Não. É alerta de obstrução periampular/pancreática que exige investigação da causa."
      },
      {
        "q": "Qual a utilidade inicial do US na pancreatite?",
        "a": "Investigar etiologia biliar e alterações associadas; não precisa demonstrar toda a glândula para haver pancreatite."
      },
      {
        "q": "O que sugere doença pancreática crônica na imagem?",
        "a": "Calcificações, atrofia e irregularidade/dilatação ductal, interpretadas no contexto."
      },
      {
        "q": "Por que uma TC precoce pode subestimar necrose?",
        "a": "A alteração perfusional e a necrose podem ainda estar evoluindo; o tempo da doença influencia a sensibilidade."
      },
      {
        "q": "Qual complicação considerar na queda de hemoglobina?",
        "a": "Hemorragia e complicação vascular, como pseudoaneurisma; investigar conforme estabilidade e contexto."
      },
      {
        "q": "O índice tomográfico substitui Atlanta clínico?",
        "a": "Não. Falência orgânica e sua duração são centrais para classificar gravidade clínica."
      }
    ],
    "practice": [
      "Ao apresentar uma TC, informe dia de evolução, uso de contraste e pergunta clínica.",
      "Descreva separadamente parênquima, ductos, coleções e vasos."
    ],
    "refs": [
      {
        "t": "ACG — Acute Pancreatitis: guideline highlights, 2024",
        "u": "https://webfiles.gi.org/links/journals/AJG-Clinical-Guidelines-Highlights-Acute-Pancreatitis-2024-FINAL.pdf"
      },
      {
        "t": "ACR — Acute Pancreatitis",
        "u": "https://acsearch.acr.org/docs/69468/Narrative/"
      }
    ],
    "cases": [
      {
        "title": "Dor e lipase elevadas, evolução inicial favorável",
        "data": "Dor epigástrica típica e lipase seis vezes o limite superior, sem instabilidade ou dúvida diagnóstica.",
        "reasoning": [
          "Dois critérios sustentam pancreatite.",
          "A TC não é necessária apenas para confirmar; investigar causa biliar e acompanhar evolução responde melhor à pergunta inicial."
        ],
        "conduct": "Avaliar gravidade clínica, etiologia e suporte; reservar imagem adicional para dúvida ou evolução que a justifique.",
        "error": "Exigir TC para iniciar o raciocínio ou usar uma TC muito precoce para excluir necrose futura."
      },
      {
        "title": "Coleção tardia com conteúdo sólido",
        "data": "Após pancreatite necrosante, exame de cinco semanas mostra coleção organizada com debris.",
        "reasoning": [
          "O histórico de necrose e o conteúdo sólido são essenciais.",
          "A coleção é compatível com necrose encapsulada; tempo sozinho não a transforma em pseudocisto."
        ],
        "conduct": "Correlacionar com sintomas, infecção e complicações para definir acompanhamento ou intervenção especializada.",
        "error": "Drenar por tamanho ou chamar toda coleção tardia de pseudocisto."
      }
    ],
    "note": "Síntese didática das aulas fornecidas, com seleção de imagens e atualização dos pontos de decisão. Imagens estáticas não substituem o estudo completo e o laudo radiológico.",
    "exam": [
      {
        "pattern": "Dor típica e enzimas elevadas",
        "trap": "Exigir TC para haver diagnóstico",
        "answer": "Aplicar os critérios de dois de três e investigar etiologia."
      },
      {
        "pattern": "Coleção com debris após pancreatite necrosante",
        "trap": "Chamar de pseudocisto por ter quatro semanas",
        "answer": "Distinguir necrose encapsulada por conteúdo e contexto."
      },
      {
        "pattern": "Calcificações com esteatorreia",
        "trap": "Interpretar como necrose aguda",
        "answer": "Relacionar com dano crônico e insuficiência exócrina."
      },
      {
        "pattern": "Duplo ducto sem massa bem definida",
        "trap": "Confirmar câncer pelo sinal isolado",
        "answer": "Investigar a causa da obstrução com protocolo apropriado."
      }
    ],
    "flow": {
      "title": "Da pergunta clínica à decisão",
      "nodes": [
        {
          "k": "start",
          "t": "Aplicar critérios diagnósticos e avaliar gravidade clínica."
        },
        {
          "k": "do",
          "t": "Investigar etiologia, especialmente biliar."
        },
        {
          "k": "do",
          "t": "Definir se existe indicação de imagem complementar."
        },
        {
          "k": "do",
          "t": "Interpretar realce considerando protocolo e tempo de evolução."
        },
        {
          "k": "do",
          "t": "Classificar coleções por conteúdo, parede e contexto."
        },
        {
          "k": "end",
          "t": "Comunicar complicações e planejar avaliação especializada conforme a clínica."
        }
      ]
    }
  },
  "cirrad_9": {
    "updated": "18/11/2026",
    "pretest": [
      "Quando uma dor desproporcional ao exame deve levantar suspeita vascular?",
      "Por que lactato normal não exclui isquemia mesentérica inicial?",
      "Pneumatose é sempre necrose?",
      "Qual mecanismo pode manter grandes artérias pérvias?",
      "Por que examinar o sistema venoso?",
      "Qual achado clínico sugere progressão para lesão avançada?"
    ],
    "sections": [
      {
        "h": "Suspeite antes da peritonite",
        "p": [
          "Dor intensa desproporcional aos achados iniciais, fibrilação atrial, aterosclerose, estado de baixo fluxo, vasopressores ou risco trombótico ajudam a reconhecer isquemia. <strong>Peritonite pode surgir tardiamente</strong>; um abdome pouco exuberante não torna o quadro seguro.",
          "O lactato pode estar normal no início e elevado por outras causas. Nenhum marcador isolado exclui isquemia. Quando a suspeita é relevante, a <strong>angioTC não deve ser adiada</strong> por esperar normalização ou piora de exames. Discuta a urgência, protocolo e riscos com a equipe."
        ]
      },
      {
        "h": "Leia vasos e intestino no mesmo estudo",
        "p": [
          "No protocolo apropriado, analise fase arterial e venosa, reconstruções, origem e ramos mesentéricos, sistema venoso e realce da parede. Êmbolo, trombose arterial, trombose venosa e isquemia não oclusiva são mecanismos diferentes.",
          "Na isquemia não oclusiva, grandes vasos podem estar pérvios. Na trombose venosa, procure defeito de enchimento venoso, edema mesentérico e espessamento parietal. No comprometimento arterial, defeito vascular e hiporrealce intestinal têm especial importância."
        ],
        "imageKey": "cirrad_media_vascular_isquemia"
      },
      {
        "h": "Sinais de alarme e suas limitações",
        "p": [
          "<strong>Hiporrealce, pneumatose, gás portal, dilatação e líquido</strong> tornam-se mais preocupantes quando aparecem em conjunto com dor, acidose ou peritonite. Pneumatose isolada não comprova necrose transmural: há causas não isquêmicas e situações benignas.",
          "Gás livre pode indicar perfuração. Ausência de pneumatose não exclui isquemia precoce. Não esperar a “imagem clássica completa” para comunicar suspeita e acionar avaliação cirúrgica/vascular."
        ],
        "imageKey": "cirrad_media_vascular_pneumatose"
      },
      {
        "h": "Da descrição à decisão",
        "p": [
          "Uma síntese útil informa <strong>vaso/mecanismo suspeito, segmentos envolvidos, padrão de realce e sinais de complicação</strong>. “Espessamento de alça” sozinho não explica o risco.",
          "Exemplo de comunicação: “Defeito de enchimento arterial associado a hiporrealce de alças, no contexto de dor aguda: achados preocupantes para isquemia mesentérica”. A viabilidade final e a estratégia de revascularização ou ressecção dependem da avaliação clínica e da equipe."
        ]
      }
    ],
    "reasoning": [
      "O exame físico pode ser discreto no início e o lactato pode não estar elevado.",
      "Grandes vasos pérvios não excluem isquemia não oclusiva."
    ],
    "mnemonics": [
      {
        "n": "Localize → caracterize → decida",
        "t": "Descreva o achado, integre-o com a clínica e explique qual decisão ele modifica."
      },
      {
        "n": "Vaso + parede + paciente",
        "t": "A hipótese exige integrar anatomia vascular, perfusão intestinal e situação clínica."
      },
      {
        "n": "Normal não exclui",
        "t": "Exame inicial discreto, lactato normal e ausência de pneumatose não encerram a investigação."
      }
    ],
    "pitfalls": [
      "Esperar peritonite para solicitar investigação vascular.",
      "Descartar isquemia por lactato normal.",
      "Diagnosticar necrose apenas por pneumatose isolada."
    ],
    "recall": [
      {
        "q": "Qual exame responde à suspeita de isquemia aguda?",
        "a": "AngioTC com protocolo apropriado, realizada sem atraso evitável no contexto de suspeita relevante."
      },
      {
        "q": "O que analisar além da artéria mesentérica?",
        "a": "Veias, ramos, realce e espessura da parede, mesentério, líquido e sinais de perfuração."
      },
      {
        "q": "Por que pneumatose não é sinônimo de necrose?",
        "a": "O gás intramural tem causas variadas; clínica e associação com sinais vasculares e de hipoperfusão definem a preocupação."
      },
      {
        "q": "Qual mecanismo pode manter grandes artérias pérvias?",
        "a": "Isquemia mesentérica não oclusiva por baixo fluxo e vasoconstrição."
      },
      {
        "q": "Por que examinar o sistema venoso?",
        "a": "Trombose venosa mesentérica é outra causa e pode associar edema parietal/mesentérico."
      },
      {
        "q": "Qual achado clínico sugere progressão para lesão avançada?",
        "a": "Peritonite é um sinal de alarme; sua ausência inicial não exclui isquemia."
      },
      {
        "q": "Hiporrealce deve ser descrito com qual informação?",
        "a": "Protocolo, fase, segmento envolvido e relação com achados vasculares e outras alças."
      },
      {
        "q": "Ausência de pneumatose exclui isquemia?",
        "a": "Não. Pode faltar especialmente na fase precoce; não se deve esperar sinais tardios."
      }
    ],
    "practice": [
      "Explique o mecanismo provável antes de discutir conduta.",
      "Comunique rapidamente achados suspeitos, mesmo sem sinais tardios."
    ],
    "refs": [
      {
        "t": "WSES — Acute mesenteric ischemia: updated guidelines, 2022",
        "u": "https://doi.org/10.1186/s13017-022-00443-x"
      },
      {
        "t": "ACR — Imaging of Mesenteric Ischemia",
        "u": "https://acsearch.acr.org/docs/70909/Narrative/"
      }
    ],
    "cases": [
      {
        "title": "Dor intensa com exame abdominal discreto",
        "data": "Pessoa com fibrilação atrial apresenta dor abdominal súbita e intensa, pouca defesa e lactato inicial normal.",
        "reasoning": [
          "Há um contexto embólico plausível e a discrepância dor/exame é sinal de alerta.",
          "Lactato normal não exclui a doença no início."
        ],
        "conduct": "Avaliação urgente, angioTC apropriada sem atraso evitável e discussão com equipe cirúrgica/vascular.",
        "error": "Aguardar defesa ou elevação do lactato para investigar."
      },
      {
        "title": "Vasos pérvios no choque",
        "data": "Pessoa em estado de baixo fluxo e em uso de vasopressor desenvolve distensão e sinais de hipoperfusão intestinal, sem oclusão arterial proximal evidente.",
        "reasoning": [
          "A ausência de trombo proximal não afasta mecanismo não oclusivo.",
          "A avaliação deve incluir realce intestinal e perfusão sistêmica."
        ],
        "conduct": "Reavaliação urgente da perfusão e discussão multidisciplinar com base no quadro clínico e na angioTC.",
        "error": "Descartar isquemia apenas porque os grandes vasos estão abertos."
      }
    ],
    "note": "Síntese didática das aulas fornecidas, com seleção de imagens e atualização dos pontos de decisão. Imagens estáticas não substituem o estudo completo e o laudo radiológico.",
    "exam": [
      {
        "pattern": "Dor desproporcional em fibrilação atrial",
        "trap": "Aguardar lactato aumentar",
        "answer": "Reconhecer suspeita embólica e investigar urgentemente."
      },
      {
        "pattern": "Baixo fluxo com grandes vasos pérvios",
        "trap": "Excluir isquemia por não haver oclusão proximal",
        "answer": "Considerar mecanismo não oclusivo."
      },
      {
        "pattern": "Pneumatose isolada",
        "trap": "Afirmar necrose transmural",
        "answer": "Integrar realce, vasos, sinais clínicos e contexto."
      },
      {
        "pattern": "Edema intestinal e defeito venoso",
        "trap": "Pesquisar só a artéria mesentérica",
        "answer": "Examinar sistema venoso e considerar trombose venosa."
      }
    ],
    "flow": {
      "title": "Da pergunta clínica à decisão",
      "nodes": [
        {
          "k": "start",
          "t": "Reconhecer contexto vascular e discrepância entre dor e exame."
        },
        {
          "k": "do",
          "t": "Avaliar perfusão e sinais de peritonite sem esperar laboratório típico."
        },
        {
          "k": "do",
          "t": "Obter angioTC apropriada sem atraso evitável."
        },
        {
          "k": "do",
          "t": "Analisar artérias, veias, realce intestinal e mesentério."
        },
        {
          "k": "do",
          "t": "Procurar sinais de complicação e comunicar suspeita com urgência."
        },
        {
          "k": "end",
          "t": "Definir estratégia de tratamento com equipe cirúrgica/vascular e avaliação clínica."
        }
      ]
    }
  }
});
})();
