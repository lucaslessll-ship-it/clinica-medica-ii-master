/* Curso autoral de Radiologia. Integra as chaves rad_m1…rad_m9 do catálogo privado existente; não redistribui imagens. */
const RadCourse=CourseKit.create({
  "key": "rad",
  "route": "rad",
  "label": "Radiologia",
  "title": "Curso de Radiologia",
  "heading": "Radiologia: da imagem ao raciocínio clínico",
  "lead": "Nove módulos em sequência: escolha do exame, anatomia, padrões, descrição e próximo passo. Treine antes de revelar os achados.",
  "notice": "Imagens disponíveis para contas autenticadas. Conteúdo educacional; as limitações das legendas são discutidas nas aulas.",
  "pathHint": "Comece pela técnica, descreva o achado e só então formule hipóteses.",
  "bankTitle": "Casos de Radiologia",
  "bankHeading": "Da descrição à decisão",
  "bankLead": "Nove cenários para justificar a interpretação e a próxima etapa.",
  "caseHint": "Formule a hipótese, os limites da imagem e o próximo passo antes de abrir a resolução.",
  "refNote": "Referências para aprofundamento. O material não representa revisão docente independente de todas as imagens.",
  "sourcesNote": "Texto e questões autorais. As imagens ficam na base privada, com crédito e marcações por figura, e só aparecem para quem está logado. Acesso não equivale a licença de redistribuição.",
  "REFS": {
    "acr": {
      "t": "ACR Appropriateness Criteria — seleção de exames por cenário clínico",
      "u": "https://acsearch.acr.org/list"
    },
    "chest": {
      "t": "Radiology Masterclass — tutorial de radiografia de tórax",
      "u": "https://www.radiologymasterclass.co.uk/tutorials/chest/chest_home_anatomy/chest_anatomy_start"
    },
    "abd": {
      "t": "ACR Appropriateness Criteria — Acute Nonlocalized Abdominal Pain",
      "u": "https://acsearch.acr.org/docs/69467/Narrative/"
    },
    "msk": {
      "t": "Radiology Masterclass — princípios da interpretação de radiografias no trauma",
      "u": "https://www.radiologymasterclass.co.uk/tutorials/musculoskeletal/trauma/trauma_x-ray_page1"
    },
    "trauma": {
      "t": "NICE NG41 — Spinal injury: assessment and initial management",
      "u": "https://www.nice.org.uk/guidance/ng41"
    },
    "atlas": {
      "t": "Créditos individuais das imagens: catálogo privado existente, com origem informada por figura. As fontes não equivalem a revisão independente das legendas."
    },
    "gi": {
      "t": "ACR Appropriateness Criteria — Suspected Small-Bowel Obstruction e Acute Abdominal Pain",
      "u": "https://acsearch.acr.org/list"
    },
    "inv": {
      "t": "Gluckman S, et al. Management for intussusception in children. Cochrane Database Syst Rev. 2017;6:CD006476.",
      "u": "https://doi.org/10.1002/14651858.CD006476.pub3"
    },
    "bili": {
      "t": "Rosenthal SJ, et al. Sonography of the gallbladder and biliary tract (SRU consensus e revisões de técnica)",
      "u": "https://www.acr.org/Clinical-Resources/Practice-Parameters-and-Technical-Standards"
    }
  },
  "MODULES": [
    {
      "id": "m1",
      "layer": "Camada 1 · Fundamentos",
      "title": "Escolher o exame e formular a pergunta",
      "summary": "Da queixa à modalidade: informação útil, segurança e limites.",
      "min": 10,
      "goals": [
        "Formular uma pergunta clínica que mude a conduta.",
        "Distinguir RX, US, TC e RM.",
        "Reconhecer quando estabilizar antes de investigar."
      ],
      "sections": [
        {
          "h": "Antes da imagem",
          "p": [
            "Registre início e evolução da queixa, estabilidade, exame físico dirigido, possibilidade de gestação, cirurgia prévia e hipótese principal. Pergunte qual resultado mudaria a conduta. Em instabilidade, ressuscitação e avaliação da equipe responsável não devem aguardar uma investigação completa.",
            "O pedido deve incluir localização dos sintomas, tempo de evolução, hipótese e dúvida objetiva. Exemplo: dor em fossa ilíaca direita há 24 horas, febre e defesa localizada; investigar apendicite e complicações. Evite pedidos sem contexto, como apenas “dor”."
          ]
        },
        {
          "h": "Escolher a modalidade",
          "p": [
            "Radiografia: rápida, útil para pulmões, ossos e alguns padrões gasosos, mas com sobreposição e sensibilidade limitada. Ultrassom: dinâmico, sem radiação ionizante, dependente de janela e operador; útil para vias biliares e avaliação pélvica. TC: avaliação seccional rápida, particularmente útil em trauma selecionado e abdome agudo. RM: boa diferenciação de tecidos, sem radiação ionizante, com limitações de tempo, dispositivos e disponibilidade.",
            "RX e TC usam radiação ionizante. A necessidade de contraste depende da pergunta, e a avaliação inclui reação prévia, função renal quando pertinente e protocolo local. Gestação não significa proibição absoluta de exame necessário; exige justificar a escolha e discutir alternativas e otimização com a equipe."
          ]
        },
        {
          "h": "Como descrever",
          "p": [
            "Identificação e técnica → qualidade → localização → padrão → extensão e complicações → síntese e limite. Separe descrição (“opacidade basal”) de hipótese (“compatível com consolidação no contexto”). Imagem isolada não substitui história e exame físico."
          ]
        }
      ],
      "pitfalls": [
        "Pedir TC indiscriminadamente.",
        "Atrasar ressuscitação para completar a imagem.",
        "Confundir hipótese com confirmação histológica."
      ],
      "quiz": [
        {
          "q": "Qual pedido orienta melhor o exame?",
          "o": [
            "Dor em FID há 24 h, febre e defesa; investigar apendicite e complicações",
            "Dor",
            "TC de tudo",
            "Exame de rotina sem hipótese"
          ],
          "a": 0,
          "why": "Contexto, localização e pergunta permitem escolher protocolo e interpretar o achado."
        },
        {
          "q": "Qual modalidade não usa radiação ionizante?",
          "o": [
            "Ultrassom",
            "TC",
            "Radiografia",
            "Fluoroscopia"
          ],
          "a": 0,
          "why": "Ultrassom usa ondas sonoras; a escolha ainda depende da pergunta e da janela."
        },
        {
          "q": "Paciente em choque e com deterioração deve primeiro receber:",
          "o": [
            "Ressuscitação e avaliação urgente da causa, com imagem compatível com a estabilidade",
            "TC eletiva antes de qualquer medida",
            "RM demorada como rotina",
            "Alta se uma radiografia for normal"
          ],
          "a": 0,
          "why": "A condição fisiológica determina o percurso; uma imagem normal não elimina uma emergência."
        }
      ],
      "refs": [
        "acr"
      ]
    },
    {
      "id": "m2",
      "layer": "Camada 2 · Fundamentos",
      "title": "Tórax normal: técnica e anatomia",
      "summary": "Uma sequência de leitura antes de procurar doenças.",
      "min": 10,
      "goals": [
        "Identificar PA, AP e perfil.",
        "Reconhecer rotação e baixa inspiração.",
        "Percorrer a anatomia sem saltar regiões."
      ],
      "sections": [
        {
          "h": "Qualidade primeiro",
          "p": [
            "Confira identificação, data, marcador de lateralidade e projeção. A incidência AP portátil pode ampliar a silhueta cardíaca; baixa inspiração pode aumentar a densidade basal e aproximar vasos. Compare extremidades mediais das clavículas com os processos espinhosos para reconhecer rotação.",
            "No perfil, observe espaço retroesternal, região retrocardíaca e seios costofrênicos posteriores. Compare com exames anteriores de técnica semelhante antes de afirmar mudança."
          ]
        },
        {
          "h": "Roteiro de leitura",
          "p": [
            "Partes moles e ossos → traqueia e vias aéreas → pulmões e hilos → mediastino e coração → diafragma e pleura. Observe ápices e áreas atrás do coração e sob as cúpulas: são locais de perda frequente de achados.",
            "Nas imagens deste módulo, localize traqueia, arco aórtico, hilos, bordas cardíacas e seios costofrênicos. Diga o lado usando o marcador do paciente, não o lado da tela."
          ]
        },
        {
          "h": "Redação orientada",
          "p": [
            "Modelo de descrição para treino, se os achados realmente estiverem presentes: “Radiografia de tórax em PA, sem rotação importante. Campos pulmonares sem opacidades focais evidentes; seios costofrênicos livres.” Não copie frases de normalidade sem revisar cada estrutura."
          ]
        }
      ],
      "pitfalls": [
        "Chamar cardiomegalia por um AP hipoinspirado.",
        "Ignorar regiões retrocardíacas.",
        "Inverter direita e esquerda."
      ],
      "quiz": [
        {
          "q": "Por que a silhueta cardíaca parece maior em AP?",
          "o": [
            "Magnificação pela projeção",
            "Todo AP indica insuficiência cardíaca",
            "O coração cresce durante o exame",
            "O marcador modifica o tamanho"
          ],
          "a": 0,
          "why": "A técnica interfere na aparência; correlacione com PA e dados clínicos quando disponíveis."
        },
        {
          "q": "Como definir o lado do paciente?",
          "o": [
            "Pelo marcador de lateralidade e orientação do exame",
            "Pela posição na tela apenas",
            "Pelo nome do arquivo",
            "Pela mão dominante do leitor"
          ],
          "a": 0,
          "why": "Marcadores e orientação devem ser conferidos antes da descrição."
        },
        {
          "q": "Qual região merece revisão mesmo com PA pouco alterado?",
          "o": [
            "Região retrocardíaca e seios posteriores no perfil",
            "Somente o centro do pulmão direito",
            "Somente a pele",
            "Nenhuma se o PA parece normal"
          ],
          "a": 0,
          "why": "Sobreposições escondem lesões; o perfil e a comparação aumentam a informação."
        }
      ],
      "refs": [
        "chest",
        "atlas"
      ]
    },
    {
      "id": "m3",
      "layer": "Camada 3 · Interpretação e decisão",
      "title": "Tórax agudo: opacidade, líquido e ar",
      "summary": "Reconhecer padrões e integrar urgência e exame físico.",
      "min": 10,
      "goals": [
        "Diferenciar consolidação, atelectasia e derrame.",
        "Procurar sinais de pneumotórax.",
        "Relacionar imagem, ausculta e percussão."
      ],
      "sections": [
        {
          "h": "Opacidade não é diagnóstico",
          "p": [
            "Consolidação substitui ar alveolar por material e pode apresentar broncograma aéreo. Atelectasia é perda de volume: procure deslocamento de fissuras, elevação do diafragma e tração de estruturas. Pneumonia exige contexto clínico; edema, hemorragia e outras causas também podem consolidar.",
            "Febre, tosse e crepitações apoiam infecção; macicez e redução do murmúrio podem acompanhar derrame. Na redação do exame físico, registre localização e comparação entre lados, evitando concluir a etiologia apenas pela ausculta."
          ]
        },
        {
          "h": "Pleura e mediastino",
          "p": [
            "Derrame pode apagar o seio costofrênico e formar menisco; em decúbito o líquido se distribui posteriormente. Ultrassom ajuda a confirmar e caracterizar líquido e planejar procedimentos por equipe capacitada.",
            "No pneumotórax, procure linha pleural visceral e ausência de trama periférica além dela. Diferencie pregas cutâneas e bolhas. Instabilidade com suspeita de pneumotórax hipertensivo exige tratamento urgente pela equipe, sem esperar confirmação radiográfica.",
            "Pneumomediastino e enfisema subcutâneo pedem correlação com trauma, vômitos, ventilação e outras causas. As imagens mostram padrões; uma legenda não estabelece a etiologia no novo paciente."
          ]
        },
        {
          "h": "Descrição útil",
          "p": [
            "Exemplo: “Opacidade basal esquerda, com apagamento parcial do contorno diafragmático; avaliar consolidação conforme contexto.” Acrescente perda de volume, derrame ou limitação se presentes. Não transforme “opacidade” automaticamente em prescrição de antibiótico."
          ]
        }
      ],
      "pitfalls": [
        "Chamar toda opacidade de pneumonia.",
        "Esperar RX para tratar tensão com instabilidade.",
        "Confundir prega cutânea com linha pleural."
      ],
      "quiz": [
        {
          "q": "Qual sinal favorece atelectasia?",
          "o": [
            "Perda de volume e deslocamento de fissura",
            "Qualquer opacidade sem outros sinais",
            "Febre isolada",
            "Imagem normal"
          ],
          "a": 0,
          "why": "Perda de volume diferencia atelectasia de preenchimento alveolar, embora possam coexistir."
        },
        {
          "q": "Qual padrão sugere pneumotórax?",
          "o": [
            "Linha pleural com ausência de trama vascular além dela",
            "Brônquios com ar dentro de opacidade",
            "Menisco basal isolado",
            "Traqueia normal isoladamente"
          ],
          "a": 0,
          "why": "É necessário conferir técnica, mimetizadores e repercussão clínica."
        },
        {
          "q": "Derrame e suspeita de punção: qual informação é útil?",
          "o": [
            "US para localizar e caracterizar líquido com equipe treinada",
            "Punção às cegas pela radiografia apenas",
            "Ausência de febre exclui líquido",
            "TC obrigatória em todos"
          ],
          "a": 0,
          "why": "A ultrassonografia auxilia o planejamento seguro; indicação depende do cenário."
        }
      ],
      "refs": [
        "chest",
        "trauma"
      ]
    },
    {
      "id": "m4",
      "layer": "Camada 4 · Interpretação e decisão",
      "title": "Massa pulmonar: do achado à investigação",
      "summary": "Distinguir descrição, suspeita e confirmação.",
      "min": 10,
      "goals": [
        "Descrever massa e repercussões.",
        "Relacionar tabagismo, hemoptise e perda ponderal.",
        "Evitar diagnóstico histológico por imagem."
      ],
      "sections": [
        {
          "h": "Anamnese e leitura",
          "p": [
            "Pergunte tabagismo e exposições, neoplasia prévia, duração da tosse, hemoptise, perda ponderal e infecções. Compare com imagens anteriores. Uma opacidade persistente pode exigir investigação adicional mesmo quando houve tratamento de infecção.",
            "Descreva lado, lobo quando localizável, contornos, tamanho quando medido adequadamente, relação com pleura, vias aéreas, linfonodos e alterações associadas. Atelectasia ou derrame podem acompanhar neoplasia, mas não são específicos."
          ]
        },
        {
          "h": "Por que complementar com TC",
          "p": [
            "A TC define melhor localização e relações anatômicas e ajuda a planejar investigação. Realce heterogêneo ou contato pleural não equivale a confirmação de invasão. O percurso pode incluir equipe especializada, amostragem e estadiamento conforme a hipótese e condição clínica.",
            "Nas três imagens do caso previamente cadastrado, compare PA, perfil e TC. O diagnóstico registrado na fonte serve de contexto didático; uma nova imagem semelhante não autoriza concluir câncer sem investigação apropriada."
          ]
        },
        {
          "h": "Como comunicar",
          "p": [
            "“Lesão expansiva/opacidade localizada no lobo superior direito, associada a ...; necessária correlação e investigação complementar.” Se houver suspeita de complicação urgente, destaque-a na comunicação à equipe."
          ]
        }
      ],
      "pitfalls": [
        "Confirmar tipo de câncer sem anatomopatológico.",
        "Equivaler contato pleural a invasão.",
        "Ignorar opacidade persistente."
      ],
      "quiz": [
        {
          "q": "TC mostra massa com contato pleural. Isso prova invasão?",
          "o": [
            "Não; é preciso avaliar critérios e contexto adicionais",
            "Sim, sempre",
            "Prova benignidade",
            "Exclui doença pleural"
          ],
          "a": 0,
          "why": "Contato e invasão são conceitos diferentes; não extrapole o achado."
        },
        {
          "q": "Qual antecedente muda a avaliação de massa?",
          "o": [
            "Tabagismo, neoplasia prévia e evolução em exames antigos",
            "Somente altura",
            "Somente lateralidade da mão",
            "Nenhum dado clínico"
          ],
          "a": 0,
          "why": "Probabilidade e crescimento orientam investigação, sem substituir confirmação."
        },
        {
          "q": "Qual é o papel da TC nesse cenário?",
          "o": [
            "Caracterizar anatomia e orientar investigação",
            "Definir sempre a histologia",
            "Dispensar avaliação clínica",
            "Prescrever automaticamente quimioterapia"
          ],
          "a": 0,
          "why": "Imagem organiza hipóteses e planejamento; não determina sozinha a terapêutica oncológica."
        }
      ],
      "refs": [
        "acr",
        "chest"
      ]
    },
    {
      "id": "m5",
      "layer": "Camada 5 · Interpretação e decisão",
      "title": "Abdome na radiografia",
      "summary": "Reconhecer distribuição gasosa e os limites do RX.",
      "min": 10,
      "goals": [
        "Distinguir delgado de cólon.",
        "Procurar gás extraluminal.",
        "Integrar obstrução e sinais de gravidade."
      ],
      "sections": [
        {
          "h": "Antes de olhar a alça",
          "p": [
            "Registre dor, vômitos, distensão, eliminação de fezes e gases, cirurgias e hérnias. Examine perfusão, cicatrizes, distensão, defesa e orifícios herniários. Ruídos intestinais isoladamente não excluem obstrução ou isquemia.",
            "Confira posição e técnica. Na imagem anatômica deste módulo, percorra cólon ascendente, flexuras, transverso, descendente e sigmoide. Delgado tende a ser central, com pregas que cruzam a luz; cólon costuma ser periférico, com haustrações incompletas. Esses padrões não são absolutos."
          ]
        },
        {
          "h": "Achados que mudam a hipótese",
          "p": [
            "Dilatação e níveis hidroaéreos sugerem obstrução no contexto adequado, mas o RX não define sempre a causa nem exclui sofrimento de alça. Ar livre pode sugerir perfuração; a ausência no RX não a exclui. Alça sentinela representa íleo localizado e não identifica sozinha a causa.",
            "A escolha do exame depende do quadro. Não existe obrigação de uma série de RX para todo abdome agudo: TC e US podem ser mais apropriados à pergunta. Na instabilidade ou peritonite, discutir avaliação urgente e controle da causa sem atrasos desnecessários."
          ]
        },
        {
          "h": "Modelo de síntese",
          "p": [
            "“Alças dilatadas com predomínio central e níveis hidroaéreos; padrão sugestivo de obstrução, a correlacionar com clínica e investigação da causa.” Não afirmar ausência de isquemia somente pelo RX."
          ]
        }
      ],
      "pitfalls": [
        "Excluir perfuração por RX normal.",
        "Determinar viabilidade intestinal apenas no RX.",
        "Pedir rotina radiológica sem pergunta clínica."
      ],
      "quiz": [
        {
          "q": "Pregas cruzando toda a luz favorecem:",
          "o": [
            "Delgado",
            "Cólon obrigatoriamente",
            "Bexiga",
            "Aorta"
          ],
          "a": 0,
          "why": "Pregas coniventes podem atravessar a alça; posição e contexto complementam a leitura."
        },
        {
          "q": "RX sem ar livre exclui perfuração?",
          "o": [
            "Não, a sensibilidade é limitada",
            "Sim, em qualquer posição",
            "Sim, se não há febre",
            "Somente se o paciente vomitou"
          ],
          "a": 0,
          "why": "Persistência de suspeita exige reavaliação e exame apropriado."
        },
        {
          "q": "Dor desproporcional ao exame e suspeita de isquemia exigem:",
          "o": [
            "Avaliação urgente e investigação dirigida",
            "Alta por RX normal",
            "Laxante como teste diagnóstico",
            "Somente novo RX em um mês"
          ],
          "a": 0,
          "why": "A radiografia não exclui isquemia; urgência e protocolo são definidos clinicamente."
        }
      ],
      "refs": [
        "acr",
        "abd"
      ]
    },
    {
      "id": "m6",
      "layer": "Camada 6 · Interpretação e decisão",
      "title": "TC abdominal: apendicite e complicações",
      "summary": "Do corte axial e coronal à decisão clínica.",
      "min": 10,
      "goals": [
        "Orientar-se em axial e coronal.",
        "Integrar inflamação apendicular e coleção.",
        "Justificar avaliação cirúrgica sem regras isoladas."
      ],
      "sections": [
        {
          "h": "Orientação e anatomia",
          "p": [
            "Confira plano e lateralidade. Em axial, a convenção costuma mostrar o paciente como visto pelos pés; use marcadores para confirmar. No coronal, acompanhe ceco e apêndice em cortes sucessivos. Uma captura selecionada não representa todo o estudo.",
            "Procure alterações do apêndice, gordura adjacente, apendicolito e coleções. Diâmetro isolado não basta: conteúdo, distensão e sinais secundários importam. Apendicolito isolado não confirma apendicite em qualquer contexto."
          ]
        },
        {
          "h": "Correlação clínica e complicação",
          "p": [
            "Dor que migra para FID, anorexia e febre podem apoiar a hipótese. Descreva defesa e descompressão dolorosa quando efetivamente presentes, sem exigir a apresentação clássica em todas as idades. Gestação e outras causas pélvicas, urinárias e intestinais mudam o diferencial.",
            "As imagens cadastradas mostram um caso de apendicite com coleção e apendicolito. Uma coleção sugere doença complicada; conduta depende de estabilidade, extensão, anatomia, possibilidade de drenagem e avaliação cirúrgica. Não indicar drenagem apenas pelo tamanho sem verificar trajeto seguro."
          ]
        },
        {
          "h": "Redação e limite",
          "p": [
            "“Processo inflamatório em topografia apendicular, com coleção adjacente; correlacionar com o estudo completo e avaliação cirúrgica.” Na piora clínica, a reavaliação prevalece sobre uma impressão antiga."
          ]
        }
      ],
      "pitfalls": [
        "Usar apendicolito isolado como diagnóstico.",
        "Prescrever drenagem sem avaliar acesso.",
        "Interpretar uma captura como exame completo."
      ],
      "quiz": [
        {
          "q": "Qual conjunto sustenta mais apendicite?",
          "o": [
            "Alteração apendicular com sinais inflamatórios adjacentes e clínica compatível",
            "Apendicolito isolado em assintomático",
            "Dor lombar sem exame",
            "Qualquer líquido pélvico"
          ],
          "a": 0,
          "why": "O conjunto e o diferencial importam; um sinal isolado pode ser inespecífico."
        },
        {
          "q": "Coleção periapendicular significa:",
          "o": [
            "Possível complicação que requer avaliação contextual",
            "Alta automática",
            "Drenagem obrigatória por qualquer via",
            "Ausência de inflamação"
          ],
          "a": 0,
          "why": "Estabilidade, anatomia e controle da fonte determinam a estratégia."
        },
        {
          "q": "Por que ver cortes sucessivos?",
          "o": [
            "Para acompanhar estruturas e evitar erro por sobreposição parcial",
            "Para substituir a história",
            "Para definir histologia",
            "Porque uma seta basta para todo diagnóstico"
          ],
          "a": 0,
          "why": "Uma captura não permite verificar todas as relações e complicações."
        }
      ],
      "refs": [
        "abd",
        "acr"
      ]
    },
    {
      "id": "m7",
      "layer": "Camada 7 · Interpretação e decisão",
      "title": "Anatomia musculoesquelética",
      "summary": "Pelve, punho, joelho e tornozelo: referências antes da lesão.",
      "min": 10,
      "goals": [
        "Aplicar sequência sistemática aos ossos e articulações.",
        "Identificar estruturas nos exames cadastrados.",
        "Relacionar imagem e exame neurovascular."
      ],
      "sections": [
        {
          "h": "Sequência constante",
          "p": [
            "Identificação e projeções → alinhamento → corticais e trabeculado → espaço articular → partes moles. Sempre que apropriado, use pelo menos duas incidências ortogonais; uma projeção pode esconder fratura ou deslocamento.",
            "No trauma registre mecanismo, dor localizada, capacidade funcional e avaliação distal de perfusão e sensibilidade. Exame vascular e neurológico deve ser documentado antes e depois de intervenções; radiografia não o substitui."
          ]
        },
        {
          "h": "Mapa das imagens",
          "p": [
            "Pelve: siga anel, ramos púbicos, sacroilíacas e articulações coxofemorais. Punho: rádio e ulna distais, fileiras do carpo e alinhamento. Joelho: fêmur, tíbia, patela e interlinhas, considerando posição e carga. Tornozelo: maléolos, tálus e congruência tibiotalar em projeções adequadas.",
            "Na imagem de punho, há sobreposição de estruturas: não conclua ausência de um osso porque não o individualiza. Estreitamento articular depende também de posicionamento; compare padrões e técnica."
          ]
        },
        {
          "h": "Como descrever",
          "p": [
            "“Alinhamento articular preservado na incidência disponível; ...”. Se faltar projeção necessária ou a região dolorosa não estiver incluída, registre a limitação e discuta complementação. Não descreva “sem fratura” como garantia absoluta em suspeita clínica persistente."
          ]
        }
      ],
      "pitfalls": [
        "Esquecer exame neurovascular.",
        "Excluir lesão oculta com uma única incidência.",
        "Interpretar sobreposição como ausência anatômica."
      ],
      "quiz": [
        {
          "q": "Qual estrutura deve ser examinada além da imagem no trauma?",
          "o": [
            "Perfusão e função neurológica distal",
            "Somente temperatura ambiente",
            "Somente cor do monitor",
            "Nenhuma"
          ],
          "a": 0,
          "why": "Comprometimento neurovascular muda urgência e deve ser documentado."
        },
        {
          "q": "Uma incidência sem fratura visível permite:",
          "o": [
            "Descrever o observado e reconhecer limitação se a suspeita persiste",
            "Excluir toda fratura",
            "Liberar qualquer carga",
            "Ignorar dor focal"
          ],
          "a": 0,
          "why": "Fraturas ocultas e projeções inadequadas exigem reavaliação contextual."
        },
        {
          "q": "Primeiro passo ao analisar um punho é:",
          "o": [
            "Conferir identificação, lado e projeção",
            "Escolher um osso aleatório",
            "Comparar com um exame de outro paciente",
            "Concluir entorse antes da leitura"
          ],
          "a": 0,
          "why": "Orientação evita erros de lado e permite leitura sistemática."
        }
      ],
      "refs": [
        "msk",
        "atlas"
      ]
    },
    {
      "id": "m8",
      "layer": "Camada 8 · Interpretação e decisão",
      "title": "Trauma: fratura e coluna cervical",
      "summary": "Descrever o desvio e reconhecer o que não pode esperar.",
      "min": 10,
      "goals": [
        "Descrever fratura sem inventar medidas.",
        "Reconhecer limites do RX cervical.",
        "Relacionar imagem e avaliação inicial do trauma."
      ],
      "sections": [
        {
          "h": "Fratura diafisária",
          "p": [
            "Identifique osso, segmento, traço, número de fragmentos, deslocamento, angulação e relação articular. Meça somente em imagem adequada e com método. A imagem do fêmur permite treinar descrição de fratura diafisária transversa desviada.",
            "Exposição óssea é diagnóstico clínico; não se exclui fratura exposta apenas pelo RX. Lesão de fêmur pode acompanhar perda sanguínea importante e outras lesões: avaliar o paciente inteiro, controlar dor e organizar estabilização pela equipe."
          ]
        },
        {
          "h": "Coluna cervical",
          "p": [
            "Mecanismo, dor mediana, exame neurológico e critérios clínicos validados orientam necessidade de imagem. No adulto com indicação de investigação de trauma cervical, TC costuma ser preferida conforme protocolos. Um perfil simples normal não libera automaticamente a coluna.",
            "Na radiografia, confira alinhamento e visibilidade adequada, incluindo a transição cervicotorácica quando possível. Avalie corticais, espaços e partes moles; se a região não foi incluída, o exame é limitado. Déficit neurológico exige avaliação urgente e investigação apropriada, mesmo sem fratura óbvia no RX."
          ]
        },
        {
          "h": "Comunicação",
          "p": [
            "Informe achado, lado e segmento, condição neurovascular e suspeita de lesão associada. Não espere terminar uma descrição detalhada para comunicar risco imediato."
          ]
        }
      ],
      "pitfalls": [
        "Liberar cervical com RX incompleto.",
        "Concluir fratura fechada pela imagem.",
        "Ignorar hemorragia e lesões associadas."
      ],
      "quiz": [
        {
          "q": "O que define fratura exposta?",
          "o": [
            "Comunicação com o meio externo avaliada clinicamente",
            "Somente desvio no RX",
            "Sempre um traço transverso",
            "Presença de dor"
          ],
          "a": 0,
          "why": "A avaliação da ferida e sua comunicação é clínica; não depende apenas do aspecto radiográfico."
        },
        {
          "q": "RX cervical incompleto permite liberar a coluna?",
          "o": [
            "Não; requer avaliação e investigação apropriadas",
            "Sim se não há traço visível",
            "Sim se há marcador",
            "Sim em qualquer adulto"
          ],
          "a": 0,
          "why": "Área não visualizada não pode ser considerada normal."
        },
        {
          "q": "Fratura femoral desviada exige também:",
          "o": [
            "Avaliação sistêmica, perfusão e lesões associadas",
            "Somente medir o ângulo",
            "Alta imediata",
            "Desconsiderar perda sanguínea"
          ],
          "a": 0,
          "why": "O trauma é avaliado pelo estado fisiológico, além da lesão óssea."
        }
      ],
      "refs": [
        "trauma",
        "msk"
      ]
    },
    {
      "id": "m9",
      "layer": "Camada 9 · Interpretação e decisão",
      "title": "Lesões ósseas e síntese do raciocínio",
      "summary": "Do padrão à hipótese, com atenção às discordâncias.",
      "min": 10,
      "goals": [
        "Descrever lesões líticas e escleróticas.",
        "Relacionar sintomas e investigação sistêmica.",
        "Reconhecer quando a legenda não basta."
      ],
      "sections": [
        {
          "h": "Descrever antes de nomear",
          "p": [
            "Lesão lítica reduz densidade; lesão esclerótica aumenta densidade. Registre número, localização, margens, zona de transição, matriz quando identificável, reação periosteal e comprometimento cortical. Padrão agressivo pede investigação; não confirma sozinho malignidade.",
            "Dor óssea persistente, sintomas gerais, neoplasia prévia e dados laboratoriais podem orientar hipóteses. Múltiplas lesões líticas no crânio podem ocorrer no mieloma, entre outros diagnósticos; confirmação depende do conjunto clínico, laboratorial e hematológico."
          ]
        },
        {
          "h": "Duas imagens, dois limites",
          "p": [
            "O catálogo contrasta crânio com lesões líticas e uma imagem da pelve de padrão misto, com importante componente esclerótico. Esclerose não é o padrão ósseo típico do mieloma. Compare a densidade e a distribuição das alterações sem atribuir automaticamente a mesma etiologia aos dois exemplos.",
            "Na imagem da pelve, diferencie áreas de maior e menor densidade e descreva sua distribuição. Sem contexto clínico e avaliação apropriada, não atribua etiologia apenas pela aparência ou pela legenda. Mantenha descrição e hipótese separadas."
          ]
        },
        {
          "h": "Síntese completa",
          "p": [
            "Anamnese dirigida → exame físico e sinais de gravidade → pergunta e técnica → descrição → hipóteses e diferencial → próximo exame ou avaliação → reavaliação. Toda conclusão precisa dizer o que a imagem sustenta e o que ainda não foi demonstrado."
          ]
        }
      ],
      "pitfalls": [
        "Tratar legenda como confirmação independente.",
        "Ensinar esclerose como padrão habitual do mieloma.",
        "Confundir padrão agressivo com histologia."
      ],
      "quiz": [
        {
          "q": "Múltiplas lesões líticas cranianas permitem afirmar:",
          "o": [
            "Há um padrão que exige correlação e investigação etiológica",
            "Mieloma confirmado sem outros exames",
            "Ausência de doença sistêmica",
            "Infecção excluída sempre"
          ],
          "a": 0,
          "why": "A descrição orienta diferencial; confirmação exige outros dados."
        },
        {
          "q": "Legenda diz mieloma, mas a imagem parece esclerótica. Melhor atitude:",
          "o": [
            "Revisar fonte e contexto, preservando a descrição do padrão",
            "Ensinar que todo mieloma é esclerótico",
            "Ignorar a discordância",
            "Trocar o diagnóstico automaticamente por metástase"
          ],
          "a": 0,
          "why": "Discordâncias exigem verificação; nem a legenda nem uma captura isolada substituem a avaliação completa."
        },
        {
          "q": "Qual síntese é mais adequada?",
          "o": [
            "Achados, hipótese, limites e próximo passo justificado",
            "Nome da doença sem descrição",
            "Somente repetir o título da imagem",
            "Prescrição sem contexto"
          ],
          "a": 0,
          "why": "Uma síntese útil conecta observação e decisão e explicita incerteza."
        }
      ],
      "refs": [
        "msk",
        "acr"
      ]
    },
    {
      "id": "m10",
      "layer": "Camada 10 · Interpretação e decisão",
      "title": "Contraste, ultrassom e o abdome que a radiografia não resolve",
      "summary": "Bário ou iodado, invaginação na criança e vesícula no ultrassom: o que pedir quando o RX simples não fecha.",
      "min": 18,
      "goals": [
        "Escolher entre bário e contraste hidrossolúvel.",
        "Reconhecer pneumoperitônio e obstrução na radiografia simples.",
        "Descrever os sinais da invaginação no ultrassom e indicar a redução por enema.",
        "Ler um ultrassom de vesícula e separar cálculo de colecistite."
      ],
      "sections": [
        {
          "h": "O que o RX simples ainda resolve",
          "p": [
            "Três perguntas continuam sendo respondidas pela radiografia: há ar livre, há obstrução, há corpo estranho. Para ar livre, a melhor incidência é o tórax em PA com o paciente sentado ou em pé por pelo menos cinco minutos: o ar sobe e aparece como uma lâmina clara sob a cúpula diafragmática. Em quem não levanta, use o decúbito lateral esquerdo com raio horizontal, e o ar aparece entre o fígado e a parede.",
            "Na obstrução, procure alças distendidas, níveis hidroaéreos em degraus e ausência de ar distal. Delgado distendido mostra as válvulas coniventes atravessando toda a alça; cólon mostra haustrações que não atravessam. Distensão sem nível e sem dor forte sugere íleo adinâmico, não obstrução mecânica."
          ],
          "list": [
            "Ar livre: tórax em PA sentado ou em pé, não o abdome deitado.",
            "Delgado dilatado: acima de 3 cm. Cólon: acima de 6 cm. Ceco: acima de 9 cm.",
            "Volvo de sigmoide: alça em grão de café apontando para o quadrante superior direito.",
            "A radiografia normal não afasta obstrução nem perfuração; a TC é mais sensível."
          ]
        },
        {
          "h": "Bário ou hidrossolúvel",
          "p": [
            "O bário dá o melhor detalhe de mucosa, mas, se cair no peritônio, provoca peritonite química grave, e no pulmão causa pneumonite. O contraste iodado hidrossolúvel tem detalhe pior e é absorvido, por isso é o escolhido sempre que houver risco de perfuração ou de aspiração."
          ],
          "table": {
            "head": [
              "Situação",
              "Contraste",
              "Motivo"
            ],
            "rows": [
              [
                "Trânsito ou enema de rotina, sem suspeita de perfuração",
                "Bário",
                "Melhor detalhe da mucosa"
              ],
              [
                "Suspeita de perfuração, pós-operatório recente, deiscência",
                "Hidrossolúvel",
                "Bário no peritônio causa peritonite química"
              ],
              [
                "Risco de aspiração ou fístula para a via aérea",
                "Hidrossolúvel de baixa osmolaridade",
                "Bário causa pneumonite; o hiperosmolar puxa líquido para o alvéolo"
              ],
              [
                "Obstrução parcial de delgado em tratamento conservador",
                "Hidrossolúvel",
                "Tem efeito diagnóstico e também terapêutico"
              ]
            ]
          },
          "after": "Sinais clássicos: bico de pássaro no volvo, mola enrolada na invaginação, maçã mordida na lesão estenosante do cólon."
        },
        {
          "h": "Invaginação intestinal",
          "p": [
            "Criança entre três meses e três anos, com dor em cólica que vem em crises, choro com flexão das pernas e intervalos de calma. Massa em salsicha no quadrante superior direito e fezes em geleia de framboesa são achados tardios, e esperar por eles atrasa o diagnóstico.",
            "O ultrassom é o exame de escolha: no corte transversal, camadas concêntricas formam o sinal do alvo, ou do donut; no corte longitudinal, a mesma alça dentro da outra forma o pseudo-rim. Sensibilidade e especificidade são altas, sem radiação."
          ],
          "list": [
            "Confirmado o diagnóstico, a redução é feita por enema com ar ou com contraste hidrossolúvel, guiada por fluoroscopia ou por ultrassom.",
            "Contraindicações à redução por enema: peritonite, perfuração e choque. Nesses casos, cirurgia.",
            "A equipe cirúrgica precisa estar avisada antes da tentativa de redução.",
            "Recorrência acontece em até um décimo dos casos, a maioria nas primeiras 48 horas.",
            "Acima de três anos ou com recorrência, procure um ponto de partida: divertículo de Meckel, pólipo, linfoma."
          ]
        },
        {
          "h": "Ultrassom da vesícula e das vias biliares",
          "p": [
            "Peça jejum de pelo menos seis horas: vesícula contraída não é avaliável. O cálculo aparece como foco hiperecogênico que se move com a mudança de decúbito e que projeta sombra acústica posterior. Pólipo também é hiperecogênico, mas não se move e não faz sombra."
          ],
          "table": {
            "head": [
              "Achado",
              "Como se mede",
              "O que sugere"
            ],
            "rows": [
              [
                "Cálculo",
                "Foco móvel com sombra posterior",
                "Colelitíase"
              ],
              [
                "Parede da vesícula",
                "Acima de 3 mm",
                "Colecistite, mas também ascite, hepatopatia e insuficiência cardíaca"
              ],
              [
                "Líquido perivesicular",
                "Lâmina ao redor da vesícula",
                "Inflamação aguda"
              ],
              [
                "Murphy ecográfico",
                "Dor máxima quando a sonda comprime a vesícula",
                "Colecistite aguda, com boa correlação quando somado aos outros sinais"
              ],
              [
                "Via biliar principal",
                "Acima de 6 mm, somando 1 mm por década após os 60 anos",
                "Obstrução distal, pensar em coledocolitíase"
              ]
            ]
          },
          "after": "Vesícula cheia de cálculos e cheia de gás podem dar a mesma imagem de sombra. A diferença é que o gás sobe quando o paciente muda de posição e o cálculo cai."
        }
      ],
      "pitfalls": [
        "Pedir bário quando há suspeita de perfuração.",
        "Pedir RX de abdome deitado para procurar ar livre.",
        "Esperar as fezes em geleia de framboesa para pensar em invaginação.",
        "Chamar de colecistite toda parede espessada, sem dor e sem o resto do quadro.",
        "Tentar redução por enema sem a equipe cirúrgica avisada.",
        "Concluir que não há obstrução porque a radiografia está normal."
      ],
      "quiz": [
        {
          "q": "Pós-operatório de gastrectomia no quarto dia, com febre e suspeita de deiscência da anastomose. O estudo contrastado deve usar:",
          "o": [
            "Bário, pelo melhor detalhe de mucosa",
            "Contraste hidrossolúvel",
            "Bário diluído",
            "Nenhum contraste"
          ],
          "a": 1,
          "why": "Com risco de extravasamento, o bário no peritônio provoca peritonite química grave. O hidrossolúvel é absorvido."
        },
        {
          "q": "Lactente de 9 meses com crises de choro, vômitos e massa palpável à direita. O exame inicial e o achado esperado são:",
          "o": [
            "TC de abdome com contraste e borramento da gordura",
            "Ultrassom e sinal do alvo no corte transversal",
            "Radiografia simples e nível hidroaéreo isolado",
            "Enema opaco diagnóstico e terapêutico já na suspeita"
          ],
          "a": 1,
          "why": "O ultrassom é o exame de escolha, com o alvo no transversal e o pseudo-rim no longitudinal. O enema vem depois, para reduzir."
        },
        {
          "q": "Mulher de 44 anos com dor no hipocôndrio direito. Ultrassom: cálculo de 12 mm, parede de 5 mm, líquido perivesicular e dor à compressão da vesícula. O quadro corresponde a:",
          "o": [
            "Colelitíase assintomática",
            "Colecistite aguda",
            "Coledocolitíase",
            "Pólipo de vesícula"
          ],
          "a": 1,
          "why": "Cálculo somado a parede espessada, líquido perivesicular e Murphy ecográfico positivo caracteriza colecistite aguda."
        },
        {
          "q": "Para procurar ar livre em paciente que consegue ficar sentado, a melhor incidência é:",
          "o": [
            "Abdome em decúbito dorsal",
            "Tórax em PA, sentado ou em pé",
            "Abdome em decúbito lateral direito",
            "Tórax em perfil deitado"
          ],
          "a": 1,
          "why": "O ar sobe para baixo da cúpula diafragmática e fica bem visível no tórax em PA com o paciente sentado ou em pé por alguns minutos."
        }
      ],
      "refs": [
        "gi",
        "inv",
        "bili",
        "acr"
      ]
    }
  ],
  "CASES": [
    {
      "id": "c1",
      "focus": "Escolher o exame e formular a pergunta",
      "stem": "Adulto apresenta dor abdominal difusa, hipotensão e sinais de hipoperfusão. Alguém solicita TC antes de iniciar atendimento.",
      "ask": "Qual informação determina a prioridade e o que escrever no pedido?",
      "answer": [
        "Reconhecer instabilidade e iniciar ressuscitação com avaliação urgente da equipe.",
        "Usar exames à beira-leito quando contribuírem sem atrasar medidas críticas.",
        "Descrever tempo, sinais de choque e hipóteses; transporte e TC dependem da segurança e da decisão da equipe."
      ]
    },
    {
      "id": "c2",
      "focus": "Tórax normal: técnica e anatomia",
      "stem": "Radiografia portátil AP, em baixa inspiração, mostra silhueta cardíaca aparentemente aumentada. Não há exame prévio.",
      "ask": "Como evitar uma conclusão indevida?",
      "answer": [
        "Descrever as limitações de projeção e inspiração.",
        "Correlacionar com sintomas, exame e exames anteriores se surgirem.",
        "Não concluir cardiomegalia definitiva somente por essa imagem."
      ]
    },
    {
      "id": "c3",
      "focus": "Tórax agudo: opacidade, líquido e ar",
      "stem": "Paciente com dispneia aguda, hipotensão e assimetria ventilatória tem forte suspeita clínica de pneumotórax hipertensivo.",
      "ask": "O exame de imagem deve atrasar a abordagem?",
      "answer": [
        "Não: acionar equipe e tratar a emergência conforme protocolo.",
        "A imagem pode complementar a avaliação quando não atrasar a intervenção.",
        "Após estabilização, reavaliar expansão e outras causas de choque."
      ]
    },
    {
      "id": "c4",
      "focus": "Massa pulmonar: do achado à investigação",
      "stem": "Pessoa com tabagismo, hemoptise e opacidade persistente em lobo superior apresenta massa na TC.",
      "ask": "Quais passos do raciocínio devem constar da síntese?",
      "answer": [
        "Descrever localização e alterações associadas; comparar com exames prévios.",
        "Reconhecer suspeita e discutir investigação e amostragem com equipe especializada.",
        "Não declarar subtipo histológico nem tratamento definitivo com base na aparência."
      ]
    },
    {
      "id": "c5",
      "focus": "Abdome na radiografia",
      "stem": "Paciente operado previamente apresenta cólicas, vômitos e distensão. RX mostra alças centrais dilatadas.",
      "ask": "O que a imagem sugere e o que ainda precisa ser esclarecido?",
      "answer": [
        "Obstrução é hipótese; aderências são possíveis, sem excluir outras causas.",
        "Pesquisar hérnia, perfusão e sinais de irritação peritoneal.",
        "Investigar ponto de transição e complicações conforme estabilidade; RX não define viabilidade de alça."
      ]
    },
    {
      "id": "c6",
      "focus": "TC abdominal: apendicite e complicações",
      "stem": "Dor em FID, febre e TC com coleção periapendicular; o paciente está perfundido, sem choque.",
      "ask": "Como organizar o próximo passo sem automatizar a conduta?",
      "answer": [
        "Discutir doença complicada com a equipe cirúrgica.",
        "Avaliar extensão, evolução e viabilidade das opções de controle da fonte.",
        "Drenagem exige acesso seguro; piora clínica pede reavaliação urgente."
      ]
    },
    {
      "id": "c7",
      "focus": "Anatomia musculoesquelética",
      "stem": "Após queda, há dor focal no punho e RX inicial sem traço evidente.",
      "ask": "Como redigir e orientar o raciocínio?",
      "answer": [
        "Descrever as incidências e o que foi observado sem excluir lesão oculta.",
        "Correlacionar com o ponto de dor e exame neurovascular.",
        "Discutir proteção, reavaliação e investigação adicional conforme suspeita clínica."
      ]
    },
    {
      "id": "c8",
      "focus": "Trauma: fratura e coluna cervical",
      "stem": "Trauma com dor cervical e parestesia apresenta RX de perfil sem visualização adequada da transição cervicotorácica.",
      "ask": "Qual erro evitar e como proceder no raciocínio?",
      "answer": [
        "Não declarar coluna liberada com estudo limitado e déficit neurológico.",
        "Manter cuidados de trauma e avaliação urgente da equipe.",
        "Complementar investigação segundo protocolo; TC e, em cenários selecionados, RM respondem perguntas diferentes."
      ]
    },
    {
      "id": "c9",
      "focus": "Lesões ósseas e síntese do raciocínio",
      "stem": "Pessoa com dor óssea apresenta múltiplas lesões líticas no crânio. Outra imagem do acervo tem legenda discordante do padrão típico.",
      "ask": "Como usar esse material sem transformar a discordância em erro de ensino?",
      "answer": [
        "Descrever o padrão observado e formular diferencial.",
        "Relacionar dados clínicos, laboratoriais e investigação especializada.",
        "Sinalizar a discordância da legenda e revisar a fonte antes de atribuir diagnóstico à segunda imagem."
      ]
    },
    {
      "id": "c10",
      "focus": "Contraste, ultrassom e o abdome que a radiografia não resolve",
      "stem": "Lactente de 11 meses, previamente hígido, com crises de choro intenso a cada 20 minutos há 10 horas, vômitos e recusa alimentar. Entre as crises, fica quieto e pálido. Abdome com massa alongada no quadrante superior direito, sem defesa. Sem febre, enchimento capilar de 2 segundos.",
      "ask": "Qual o exame inicial, o que você espera ver, qual o tratamento e o que o contraindicaria?",
      "answer": [
        "Dor em cólica intermitente com intervalos de calma, vômitos e massa em salsicha em lactente: invaginação intestinal até prova em contrário.",
        "Exame inicial: ultrassom de abdome, sem radiação e com alta acurácia.",
        "Achados esperados: sinal do alvo, ou donut, no corte transversal e pseudo-rim no corte longitudinal.",
        "Tratamento: redução por enema com ar ou com contraste hidrossolúvel, guiada por fluoroscopia ou ultrassom, com a equipe cirúrgica avisada e acesso venoso garantido.",
        "Contraindicações à redução: peritonite, perfuração e choque, que levam direto à cirurgia.",
        "Depois da redução, observação: a recorrência acontece em até um décimo dos casos, a maioria nas primeiras 48 horas.",
        "Nessa idade o ponto de partida costuma ser hipertrofia linfoide. Acima de 3 anos ou em recorrências, procurar divertículo de Meckel, pólipo ou linfoma."
      ]
    }
  ],
  "imageStudies": {
  "m1": {
    "title": "RX e TC em exames reais",
    "guide": "Compare uma projeção radiográfica com um corte tomográfico. São pacientes e problemas distintos: use os exemplos para reconhecer a modalidade e a orientação, sem transferir o diagnóstico de uma imagem para a outra.",
    "groups": [
      [
        "rad_m2",
        [
          "rad_pa"
        ]
      ],
      [
        "rad_m6",
        [
          "rad_apend_ax"
        ]
      ]
    ]
  },
  "m2": {
    "title": "Tórax: PA e perfil",
    "guide": "Na projeção frontal, percorra vias aéreas, hilos, bordas cardíacas e seios costofrênicos. No perfil, confira regiões retroesternal e retrocardíaca. Não deduza lateralidade pelo lado da tela: use os marcadores.",
    "groups": [
      [
        "rad_m2",
        [
          "rad_pa",
          "rad_lat"
        ]
      ]
    ]
  },
  "m3": {
    "title": "Comparar padrões torácicos",
    "guide": "Compare consolidação, líquido pleural, ar pleural e ar mediastinal em exemplos distintos. Descreva distribuição, volume e estruturas deslocadas antes de formular a hipótese; nenhuma imagem isolada estabelece a causa.",
    "groups": [
      [
        "rad_m3",
        [
          "rad_consol",
          "rad_derrame",
          "rad_pneumo",
          "rad_hamman"
        ]
      ]
    ]
  },
  "m4": {
    "title": "Da radiografia à TC",
    "guide": "Compare as projeções radiográficas e o corte tomográfico do caso da fonte. Localize a alteração e suas relações anatômicas. O diagnóstico registrado pertence ao caso original; imagem semelhante em outro paciente requer investigação própria.",
    "groups": [
      [
        "rad_m4",
        [
          "rad_ca_pa",
          "rad_ca_perfil",
          "rad_ca_tc"
        ]
      ]
    ]
  },
  "m5": {
    "title": "Abdome: trajeto do cólon na radiografia",
    "guide": "A marcação vermelha da fonte acompanha a anatomia sobre uma radiografia real. Compare a marcação com as alças e identifique o marcador de lateralidade; o contorno marcado é apoio anatômico, não um achado patológico.",
    "groups": [
      [
        "rad_m5",
        [
          "rad_abd_colon"
        ]
      ]
    ]
  },
  "m6": {
    "title": "Apendicite: planos axial e coronal",
    "guide": "Localize ceco, apêndice, apendicolito e a coleção descrita na fonte. Correlacione os planos; uma seta localiza o achado, mas não substitui a revisão de toda a aquisição ou a avaliação clínica.",
    "groups": [
      [
        "rad_m6",
        [
          "rad_apend_ax",
          "rad_apend_cor"
        ]
      ]
    ]
  },
  "m7": {
    "title": "Anatomia óssea em radiografias reais",
    "guide": "Use as imagens para percorrer pelve, carpo, joelhos e tornozelo. Compare contornos corticais e interlinhas; incidências distintas e sobreposição podem esconder estruturas. As linhas da fonte são marcações sobre exames reais.",
    "groups": [
      [
        "rad_m7",
        [
          "rad_pelve",
          "rad_iliofemoral",
          "rad_punho",
          "rad_joelhos",
          "rad_torn_ap",
          "rad_torn_perfil"
        ]
      ]
    ]
  },
  "m8": {
    "title": "Alinhamento cervical e descrição de fratura",
    "guide": "As imagens são exemplos distintos. Na coluna, siga os alinhamentos e as partes moles. No fêmur, descreva local, traço e desvio. A radiografia anotada preserva o exame real abaixo das linhas de apoio.",
    "groups": [
      [
        "rad_m8",
        [
          "rad_cervical",
          "rad_cerv_linhas",
          "rad_femur_fx"
        ]
      ]
    ]
  },
  "m9": {
    "title": "Lesões ósseas: descrever antes de nomear",
    "guide": "Localize as alterações no crânio e na pelve dos exemplos da fonte. Descreva densidade, limites e distribuição; nem toda lesão de um mesmo caso tem aparência idêntica. Imagem não define histologia isoladamente.",
    "groups": [
      [
        "rad_m9",
        [
          "rad_mm_cranio",
          "rad_mm_pelve"
        ]
      ]
    ]
  }
},
  "imageExclude": ["radsch_dose"],
  "global": "RadCourse"
});
window.RadCourse=RadCourse;
