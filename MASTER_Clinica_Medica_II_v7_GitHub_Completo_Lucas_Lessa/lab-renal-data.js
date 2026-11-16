/* Conteúdo autoral. Laudos e pessoas fictícios. Fontes consultadas em 16/11/2026. */
window.MASTER_LAB_RENAL={
  'id': 'lab_renal_eas_v1',
  'title': 'Função renal e interpretação do EAS',
  'version': '2026.11.16.1',
  'status': 'conteúdo autoral para estudo; revisão docente externa pendente',
  'REFS': {
    'kdigo': {
      't': 'Awdishu e colaboradores. KDIGO 2024 clinical practice guideline: a primer on what pharmacists need to know. Am J Health Syst Pharm, 2025;82:660-671.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12158546/',
      'scope': 'Síntese aberta da KDIGO 2024: cronicidade, categorias G/A, limites da creatinina, cistatina C e ajuste de medicamentos. O PDF primário da KDIGO não pôde ser acessado neste ambiente; não foi declarado como lido.',
      'year': '2025',
      'status': 'texto integral consultado em 16/11/2026'
    },
    'ckd': {
      't': 'NICE NG203. Chronic kidney disease: assessment and management. 2021, versão vigente consultada em 16/11/2026.',
      'u': 'https://www.nice.org.uk/guidance/ng203/chapter/Recommendations',
      'scope': 'Recomendações 1.1.8, 1.1.12 a 1.1.16 e tabela 1: confirmação, RAC, hematúria e categorias G/A. As unidades mg/mmol não são intercambiáveis com mg/g. Fluxo britânico, com aplicação local dependente de supervisão.',
      'year': '2021',
      'status': 'recomendações consultadas em 16/11/2026'
    },
    'aki': {
      't': 'NICE NG148. Acute kidney injury: prevention, detection and management. 2019, atualização de outubro de 2024.',
      'u': 'https://www.nice.org.uk/guidance/ng148/chapter/Recommendations',
      'scope': 'Recomendações 1.3.1, 1.4.3 a 1.4.6 e 1.5.1 a 1.5.9: critérios temporais de LRA, sedimento, obstrução, ultrassom e gravidade.',
      'year': '2019/2024',
      'status': 'recomendações consultadas em 16/11/2026'
    },
    'sed': {
      't': 'Gaggar e Raju. Diagnostic Utility of Urine Microscopy in Kidney Diseases. Indian J Nephrol, 2024;34:213-221.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11303840/',
      'scope': 'Revisão sobre células, cilindros, padrões glomerulares, tubulares e intersticiais. Associações não são diagnósticos isolados. Texto autoral, sem reprodução de figuras ou tabelas do artigo.',
      'year': '2024',
      'status': 'texto integral consultado em 16/11/2026'
    },
    'pre': {
      't': 'Delanghe e Speeckaert. Preanalytical requirements of urinalysis. Biochem Med, 2014;24:89-104.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3936984/',
      'scope': 'Mecanismos analíticos e pré-analíticos da fita: coleta, conservação e reação para sangue. Revisão de fundamentos, sem adotar seus tempos de estabilidade como protocolo local.',
      'year': '2014',
      'status': 'texto integral consultado em 16/11/2026'
    },
    'itu': {
      't': 'NICE NG109. Urinary tract infection (lower): antimicrobial prescribing. 2018, versão vigente consultada em 16/11/2026.',
      'u': 'https://www.nice.org.uk/guidance/ng109/chapter/Recommendations',
      'scope': 'Seção 1.2: bacteriúria assintomática, inclusive a distinção para gestação. O módulo de urocultura aprofunda indicação de cultura e tratamento.',
      'year': '2018',
      'status': 'recomendações consultadas em 16/11/2026'
    }
  },
  'MODULES': [
    {
      'id': 'renal_m1',
      'layer': 'Fundamentos e laudo',
      'title': 'Creatinina, ureia e filtração: leia a tendência',
      'summary': 'Entenda produção, filtração, estado não estacionário e o que o número do laudo permite concluir.',
      'goals': [
        'Separar concentração de creatinina de filtração medida.',
        'Reconhecer LRA pela mudança no tempo e pela diurese.',
        'Explicar por que TFGe, ureia e creatinina não definem diálise sozinhas.'
      ],
      'pretest': [
        'Uma creatinina no intervalo do laboratório exclui disfunção renal?',
        'TFGe pode ser interpretada da mesma forma durante elevação rápida da creatinina?',
        'O que falta para chamar uma redução isolada da TFGe de doença renal crônica?'
      ],
      'sections': [
        {
          'h': 'Comece pelo tempo, pelas unidades e pela pessoa',
          'p': [
            'Confirme identificação, data e hora, unidade, creatinina basal, contexto de coleta e tendência. Registre diurese, peso usado para avaliá-la, perdas, pressão, sinais de congestão e medicamentos. A ausência de exame anterior é uma limitação, não prova de normalidade. Todos os laudos deste bloco são fictícios; valores de referência e métodos devem ser lidos no laboratório que realizou a análise.'
          ]
        },
        {
          'h': 'Por que a creatinina sobe e por que às vezes engana',
          'p': [
            'A creatinina deriva do metabolismo muscular. Sua concentração resulta da produção, da eliminação e do volume de distribuição. A redução da filtração tende a elevá-la, mas a subida pode demorar em uma agressão aguda. Sarcopenia pode mascarar perda de função; maior massa muscular, alimentação e interferências analíticas podem deslocar o resultado sem equivaler à mesma lesão renal.',
            'A secreção tubular também importa. Um medicamento pode alterar a creatinina sem produzir queda proporcional da filtração. Isso exige reconciliar exposição e evolução, sem presumir que toda elevação seja apenas efeito do fármaco. Não atribua a mudança a uma causa benigna antes de excluir sinais de gravidade.'
          ]
        },
        {
          'h': 'TFGe é uma estimativa condicionada ao contexto',
          'table': {
            'head': [
              'Achado',
              'O que significa',
              'O que fazer com a informação'
            ],
            'rows': [
              [
                'Estado estável',
                'Equação validada estima a filtração com erro individual.',
                'Confira a equação e a unidade mL/min/1,73 m².'
              ],
              [
                'Creatinina em rápida mudança',
                'A premissa de equilíbrio não se sustenta.',
                'Use tendência, diurese e avaliação clínica; não classifique a LRA pelo número automático da TFGe.'
              ],
              [
                'Massa muscular muito baixa ou discrepância clínica',
                'A creatinina pode superestimar a função.',
                'Considere avaliação com cistatina C e equação combinada quando isso mudar uma decisão, conforme disponibilidade e supervisão.'
              ],
              [
                'Cistatina C alterada por outros fatores',
                'Inflamação, tireoide e glicocorticoides podem interferir.',
                'A combinação melhora a estimativa em contextos selecionados, sem transformar o biomarcador em medida perfeita.'
              ]
            ]
          },
          'after': 'A síntese de Awdishu de 2025 descreve as recomendações KDIGO 2024. A NG203 de 2021 tem escopo e posição histórica diferentes sobre cistatina C; não a usamos para negar a atualização da KDIGO.'
        },
        {
          'h': 'Ureia não é uma segunda creatinina',
          'p': [
            'A ureia depende de produção hepática, ingestão e catabolismo proteico, reabsorção e eliminação. Hipoperfusão, sangramento digestivo e catabolismo podem aumentar o valor. Doença hepática e baixa ingestão podem atenuá-lo. Ureia elevada não distingue, sozinha, mecanismo pré-renal de lesão tubular.',
            'BUN representa nitrogênio ureico, não a massa de ureia reportada habitualmente no Brasil. Não aplique uma razão BUN/creatinina usando ureia no numerador. Este bloco não oferece um ponto de corte universal nem uma calculadora dessa razão.'
          ]
        },
        {
          'h': 'Critérios de LRA: a janela temporal faz parte do diagnóstico',
          'table': {
            'head': [
              'Achado',
              'O que significa',
              'O que fazer com a informação'
            ],
            'rows': [
              [
                'Creatinina, critério absoluto',
                'Aumento de pelo menos 26 µmol/L em até 48 horas.',
                'Formulação literal da NICE NG148, recomendação 1.3.1.'
              ],
              [
                'Creatinina, critério relativo',
                'Aumento de pelo menos 50% conhecido ou presumido nos últimos 7 dias.',
                'Compare com uma basal adequada e explicite a janela.'
              ],
              [
                'Diurese no adulto',
                'Menos de 0,5 mL/kg/h por mais de 6 horas.',
                'Confira mensuração, peso e obstrução do sistema de coleta.'
              ]
            ]
          },
          'after': 'Os critérios são alternativos, não cumulativos. A faixa do laboratório não invalida uma elevação relativa importante. A forma em mg/dL depende da diretriz citada; não reescrevemos 26 µmol/L como uma igualdade exata com 0,3 mg/dL.'
        },
        {
          'h': 'Laudo resolvido: mudança pequena em número, grande em contexto',
          'table': {
            'head': [
              'Achado',
              'O que significa',
              'O que fazer com a informação'
            ],
            'rows': [
              [
                'Creatinina há 4 dias',
                '0,8 mg/dL',
                'Exame basal conhecido no mesmo laboratório.'
              ],
              [
                'Creatinina atual',
                '1,3 mg/dL',
                'Razão 1,3 ÷ 0,8 = 1,625; aumento de 62,5%.'
              ],
              [
                'História fictícia',
                'Diarreia e baixa ingestão',
                'Mecanismo hemodinâmico plausível; ainda faltam perfusão, exame, eletrólitos e exclusão de outras causas.'
              ]
            ]
          },
          'after': 'O critério relativo em 7 dias está preenchido. A ação é avaliar LRA e sua causa, rever exposições e complicações. Não é suficiente dizer que o valor é quase normal nem diagnosticar DRC a partir desse único episódio.'
        },
        {
          'h': 'Primeiros diferenciais e sinais de gravidade',
          'table': {
            'head': [
              'Achado',
              'O que significa',
              'O que fazer com a informação'
            ],
            'rows': [
              [
                'Hipoperfusão',
                'Perdas, baixa ingestão, sangramento ou baixo débito.',
                'Avaliar perfusão e volemia; congestão pode coexistir e contraindica reposição automática.'
              ],
              [
                'Lesão parenquimatosa',
                'Sedimento ativo, exposição tóxica, infecção ou doença sistêmica.',
                'Integrar EAS, eletrólitos, tendência e avaliação especializada quando indicada.'
              ],
              [
                'Obstrução',
                'Retenção, dor, anúria, fatores urológicos ou dilatação.',
                'Avaliar via urinária; não esperar a creatinina ficar muito alta.'
              ]
            ]
          },
          'after': 'Hipercalemia, acidose, edema pulmonar e manifestações urêmicas podem exigir atendimento imediato. A NG148 orienta terapia renal substitutiva quando complicações não respondem ao tratamento clínico; uma creatinina ou ureia isolada não determina o início.'
        },
        {
          'h': 'Medicamentos: função renal não vira dose por uma regra única',
          'p': [
            'Revise anti-inflamatórios, antimicrobianos, diuréticos e fármacos que interferem na perfusão, além de contraste e suplementos. A presença de um nome no laudo não autoriza suspensão ou ajuste autônomo. O raciocínio considera indicação, gravidade, tendência, volemia e monitorização.',
            'Ao prescrever, confira se a bula usa depuração de creatinina em mL/min ou TFGe indexada. Não troque as duas por equivalência presumida. Durante LRA, as estimativas são especialmente incertas; dose de ataque, manutenção, intervalo e diálise exigem análise específica. O Manual de prescrição traz fichas contextualizadas quando o fármaco é citado, sem aplicar automaticamente uma dose ao valor do laudo.'
          ]
        }
      ],
      'pitfalls': [
        'Confundir resultado dentro do intervalo com ausência de LRA.',
        'Rotular DRC sem demonstrar cronicidade ou outro marcador persistente.',
        'Usar ureia como BUN em uma razão.',
        'Prescrever volume ou diálise apenas pelo número de creatinina.'
      ],
      'refs': [
        'kdigo',
        'ckd',
        'aki'
      ],
      'quiz': [
        {
          'id': 'r1q1',
          'q': 'Creatinina passa de 0,8 para 1,3 mg/dL em 4 dias, após diarreia. Qual interpretação é sustentada?',
          'o': [
            'Há critério relativo de LRA; investigar a causa',
            'O intervalo do laboratório exclui LRA',
            'Já é DRC G3',
            'A ureia decide sozinha se há necessidade de diálise'
          ],
          'a': 0,
          'why': 'Há critério relativo de LRA; investigar a causa: Aumento de 62,5% em 7 dias satisfaz o critério relativo; o mecanismo ainda precisa ser avaliado. O intervalo do laboratório exclui LRA: O diagnóstico depende também da mudança temporal, não só do intervalo. Já é DRC G3: Faltam cronicidade e classificação estável. A ureia decide sozinha se há necessidade de diálise: A decisão depende do estado clínico e de complicações, conforme NG148.',
          'explanations': [
            'Aumento de 62,5% em 7 dias satisfaz o critério relativo; o mecanismo ainda precisa ser avaliado.',
            'O diagnóstico depende também da mudança temporal, não só do intervalo.',
            'Faltam cronicidade e classificação estável.',
            'A decisão depende do estado clínico e de complicações, conforme NG148.'
          ],
          'refs': [
            'aki'
          ]
        },
        {
          'id': 'r1q2',
          'q': 'Pessoa com sarcopenia tem creatinina pouco elevada e sinais discordantes. Qual próximo raciocínio?',
          'o': [
            'Aceitar a creatinina como medida direta',
            'Investigar discordância e considerar estimativa combinada',
            'Multiplicar a creatinina por dois',
            'Usar raça para corrigir a equação'
          ],
          'a': 1,
          'why': 'Aceitar a creatinina como medida direta: A concentração depende também da produção muscular. Investigar discordância e considerar estimativa combinada: A equação com creatinina e cistatina C pode ajudar quando a precisão muda a decisão; há limitações de ambos os marcadores. Multiplicar a creatinina por dois: Não há correção fixa validada por essa operação. Usar raça para corrigir a equação: A síntese KDIGO 2024 recomenda estimativas sem o uso de raça.',
          'explanations': [
            'A concentração depende também da produção muscular.',
            'A equação com creatinina e cistatina C pode ajudar quando a precisão muda a decisão; há limitações de ambos os marcadores.',
            'Não há correção fixa validada por essa operação.',
            'A síntese KDIGO 2024 recomenda estimativas sem o uso de raça.'
          ],
          'refs': [
            'kdigo'
          ]
        },
        {
          'id': 'r1q3',
          'q': 'Durante elevação rápida da creatinina, o laudo mostra TFGe de 38. O que concluir?',
          'o': [
            'É DRC G3b comprovada',
            'A estimativa permite qualquer ajuste automático de dose',
            'O estado não estacionário limita a estimativa',
            'Não há LRA se a diurese estiver preservada'
          ],
          'a': 2,
          'why': 'É DRC G3b comprovada: Um resultado agudo não demonstra persistência. A estimativa permite qualquer ajuste automático de dose: A bula, o contexto e a cinética importam; não há equivalência automática. O estado não estacionário limita a estimativa: A equação pressupõe condições que não se mantêm durante mudança rápida. Não há LRA se a diurese estiver preservada: LRA pode ser não oligúrica e preencher critério de creatinina.',
          'explanations': [
            'Um resultado agudo não demonstra persistência.',
            'A bula, o contexto e a cinética importam; não há equivalência automática.',
            'A equação pressupõe condições que não se mantêm durante mudança rápida.',
            'LRA pode ser não oligúrica e preencher critério de creatinina.'
          ],
          'refs': [
            'kdigo',
            'aki'
          ]
        },
        {
          'id': 'r1q4',
          'q': 'O laudo brasileiro informa ureia e creatinina. Qual erro deve ser evitado?',
          'o': [
            'Comparar os valores anteriores',
            'Ler as unidades',
            'Avaliar sangramento e catabolismo',
            'Usar ureia como se fosse BUN numa razão'
          ],
          'a': 3,
          'why': 'Comparar os valores anteriores: A comparação temporal é essencial. Ler as unidades: Unidades fazem parte da interpretação. Avaliar sangramento e catabolismo: Essas condições podem alterar a produção de ureia. Usar ureia como se fosse BUN numa razão: BUN mede nitrogênio ureico; substituir o analito altera a razão. Não usamos um ponto de corte universal neste bloco.',
          'explanations': [
            'A comparação temporal é essencial.',
            'Unidades fazem parte da interpretação.',
            'Essas condições podem alterar a produção de ureia.',
            'BUN mede nitrogênio ureico; substituir o analito altera a razão. Não usamos um ponto de corte universal neste bloco.'
          ],
          'refs': [
            'kdigo'
          ]
        },
        {
          'id': 'r1q5',
          'q': 'Adulto tem diurese de 0,4 mL/kg/h durante 8 horas. Qual afirmação é correta?',
          'o': [
            'Há critério urinário de LRA, após conferir a mensuração',
            'A diurese nunca faz parte da definição',
            'É necessário aguardar 3 meses',
            'É obrigatório haver também aumento de creatinina'
          ],
          'a': 0,
          'why': 'Há critério urinário de LRA, após conferir a mensuração: O valor é menor que 0,5 por mais de 6 horas, conforme NG148. A diurese nunca faz parte da definição: O critério urinário é uma alternativa reconhecida. É necessário aguardar 3 meses: O período de cronicidade não se aplica ao reconhecimento de LRA. É obrigatório haver também aumento de creatinina: Os critérios são alternativos; a creatinina pode atrasar.',
          'explanations': [
            'O valor é menor que 0,5 por mais de 6 horas, conforme NG148.',
            'O critério urinário é uma alternativa reconhecida.',
            'O período de cronicidade não se aplica ao reconhecimento de LRA.',
            'Os critérios são alternativos; a creatinina pode atrasar.'
          ],
          'refs': [
            'aki'
          ]
        },
        {
          'id': 'r1q6',
          'q': 'LRA com edema pulmonar refratário ao tratamento clínico. O que orienta a prioridade?',
          'o': [
            'Esperar creatinina atingir um valor fixo',
            'Avaliação imediata para suporte renal pela complicação',
            'Calcular somente uma razão ureia/creatinina',
            'Repetir o exame em 3 meses sem outra ação'
          ],
          'a': 1,
          'why': 'Esperar creatinina atingir um valor fixo: Não existe valor isolado que substitua a avaliação clínica. Avaliação imediata para suporte renal pela complicação: NG148 1.5.8 e 1.5.9 priorizam complicações refratárias e o estado global. Calcular somente uma razão ureia/creatinina: A razão não decide terapia renal substitutiva. Repetir o exame em 3 meses sem outra ação: Adiar avaliação em uma complicação grave é inadequado.',
          'explanations': [
            'Não existe valor isolado que substitua a avaliação clínica.',
            'NG148 1.5.8 e 1.5.9 priorizam complicações refratárias e o estado global.',
            'A razão não decide terapia renal substitutiva.',
            'Adiar avaliação em uma complicação grave é inadequado.'
          ],
          'refs': [
            'aki'
          ]
        }
      ]
    },
    {
      'id': 'renal_m2',
      'layer': 'Cronicidade e risco',
      'title': 'DRC e albuminúria: combine categoria G, categoria A e tempo',
      'summary': 'Classifique sem rotular um resultado isolado e transforme RAC, tendência e causa em uma síntese útil.',
      'goals': [
        'Exigir persistência antes de afirmar DRC.',
        'Classificar G e A sem misturar unidades.',
        'Explicar confirmação da RAC e o alcance do risco combinado.'
      ],
      'pretest': [
        'TFGe de 75 sem outros marcadores basta para DRC?',
        'RAC em mg/g e em mg/mmol usa o mesmo número?',
        'Uma RAC aumentada durante febre deve virar um rótulo permanente?'
      ],
      'sections': [
        {
          'h': 'Do resultado isolado à doença crônica',
          'p': [
            'DRC corresponde a anormalidades de estrutura ou função renal presentes por pelo menos 3 meses, com implicações para a saúde. Pode ser reconhecida por TFGe persistentemente abaixo de 60 mL/min/1,73 m² ou por marcadores de dano renal, mesmo com filtração mais alta. A síntese diagnóstica inclui causa, categoria de filtração e albuminúria.',
            'Uma TFGe baixa recém-descoberta pede exclusão de LRA. Na pessoa sem exame prévio, a NG203 orienta repetir TFGe abaixo de 60 em até 2 semanas para confirmar o achado, considerando variabilidade. Esse intervalo não autoriza aguardar em uma pessoa agudamente doente. Depois é preciso documentar a duração ou evidências confiáveis de cronicidade.'
          ]
        },
        {
          'h': 'Categorias de filtração, com unidade explícita',
          'table': {
            'head': [
              'Categoria G',
              'TFGe em mL/min/1,73 m²',
              'Interpretação'
            ],
            'rows': [
              [
                'G1',
                '≥90',
                'Normal ou alta; só configura DRC se houver marcador persistente de dano.'
              ],
              [
                'G2',
                '60 a 89',
                'Levemente reduzida; sozinha não define DRC.'
              ],
              [
                'G3a',
                '45 a 59',
                'Redução leve a moderada, se crônica.'
              ],
              [
                'G3b',
                '30 a 44',
                'Redução moderada a grave, se crônica.'
              ],
              [
                'G4',
                '15 a 29',
                'Redução grave, se crônica.'
              ],
              [
                'G5',
                '<15',
                'Falência renal; a indicação de suporte depende também da situação clínica.'
              ]
            ]
          },
          'after': 'Categorias conferidas na tabela 2 da síntese KDIGO 2024 publicada em 2025. Um estágio não informa sozinho a causa nem substitui a avaliação de urgência.'
        },
        {
          'h': 'RAC: a barreira glomerular e o denominador',
          'p': [
            'A relação albumina/creatinina urinária, chamada RAC ou ACR, ajusta a concentração de albumina pela de creatinina na mesma amostra. Isso reduz a influência da diluição, mas a produção de creatinina urinária também varia. Albumina urinária não é albumina sérica, e RAC não equivale a proteína total urinária.',
            'Aumento persistente da permeabilidade glomerular pode produzir albuminúria antes de uma queda importante da filtração. Por isso, G e A respondem a perguntas complementares: quanto se estima filtrar e que marcador de dano/risco está presente.'
          ]
        },
        {
          'h': 'Categorias de albuminúria: duas convenções, sem misturar números',
          'table': {
            'head': [
              'Categoria A',
              'RAC em mg/g',
              'RAC em mg/mmol'
            ],
            'rows': [
              [
                'A1',
                '<30',
                '<3'
              ],
              [
                'A2',
                '30 a 300',
                '3 a 30'
              ],
              [
                'A3',
                '>300',
                '>30'
              ]
            ]
          },
          'after': 'Faixas de categoria da tabela 3 da síntese KDIGO e da tabela 1 da NG203. São convenções de classificação, não uma fórmula de conversão exata entre unidades. Confira qual unidade o laudo usa antes de classificar.'
        },
        {
          'h': 'Confirmar não é ignorar',
          'p': [
            'Exercício intenso, doença aguda, infecção urinária, hematúria e contaminação podem alterar a interpretação. Confira coleta e contexto; prefira confirmação em primeira urina da manhã quando indicada. Um resultado elevado pede investigação proporcional à gravidade, não apenas uma nova coleta em prazo indefinido.',
            'Segundo NG203 1.1.12, RAC entre 3 e 70 mg/mmol deve ser confirmada em amostra subsequente da manhã; RAC inicial de 70 mg/mmol ou mais dispensa essa repetição confirmatória específica. Essa exceção não demonstra cronicidade automaticamente, não elimina reavaliação clínica e não deve ser aplicada a um laudo em mg/g.'
          ]
        },
        {
          'h': 'Laudo resolvido: a TFGe isolada não conta a história inteira',
          'table': {
            'head': [
              'Dado fictício',
              'Resultado',
              'Leitura'
            ],
            'rows': [
              [
                'TFGe em janeiro, maio e agosto',
                '52, 49 e 50 mL/min/1,73 m²',
                'Redução persistente por mais de 3 meses; categoria G3a.'
              ],
              [
                'RAC em duas amostras adequadas',
                '120 e 135 mg/g',
                'Faixa A2 persistente, sem confundir com mg/mmol.'
              ],
              [
                'Contexto',
                'Sem síndrome aguda; causa ainda em investigação',
                'Síntese: DRC G3a A2, etiologia a esclarecer.'
              ]
            ]
          },
          'after': 'A combinação indica risco maior que G3a A1, mas não produz uma probabilidade individual exata. A causa, tendência, comorbidades e preferências orientam o acompanhamento.'
        },
        {
          'h': 'Diferenciais que mudam o próximo passo',
          'table': {
            'head': [
              'Achado',
              'O que significa',
              'O que fazer com a informação'
            ],
            'rows': [
              [
                'TFGe G2 e RAC A1, sem outro marcador',
                'O laudo isolado não preenche DRC.',
                'Investigar apenas conforme contexto e fatores de risco; evitar rótulo excessivo.'
              ],
              [
                'TFGe preservada e albuminúria persistente',
                'Pode haver DRC com G1 ou G2.',
                'Confirmar duração e investigar a causa.'
              ],
              [
                'Queda nova da TFGe em quem já tem DRC',
                'Pode haver LRA sobre DRC.',
                'Comparar com a basal e procurar agressão reversível.'
              ],
              [
                'Hematúria com proteinúria e piora aguda',
                'Padrão pode sugerir doença glomerular.',
                'Avaliar gravidade e necessidade de nefrologia; não atribuir tudo a infecção.'
              ]
            ]
          }
        },
        {
          'h': 'Do laudo ao acompanhamento seguro',
          'p': [
            'Documente o que é conhecido, o que é hipótese e o que falta confirmar. Reveja pressão, diabetes quando presente, risco cardiovascular, exposições e tendência da RAC. A frequência de controle e os critérios locais de encaminhamento dependem do risco global e da evolução; este piloto não define uma periodicidade única para todos.',
            'Tratamentos renoprotetores e ajustes de medicamentos dependem de indicação, potássio, estabilidade e contraindicações. Não selecione um fármaco apenas pela categoria G/A. Para posologia e orientação de uso de um medicamento específico, consulte a ficha contextualizada e a fonte correspondente no Manual de prescrição.'
          ]
        }
      ],
      'pitfalls': [
        'Chamar G2 de DRC sem qualquer marcador persistente.',
        'Usar o limite em mg/mmol em um exame em mg/g.',
        'Confundir a repetição precoce para excluir LRA com a comprovação de cronicidade.',
        'Usar a categoria de risco como diagnóstico da causa.'
      ],
      'refs': [
        'kdigo',
        'ckd',
        'aki'
      ],
      'quiz': [
        {
          'id': 'r2q1',
          'q': 'TFGe de 75, RAC de 12 mg/g e nenhum outro marcador persistente. O laudo isolado permite afirmar:',
          'o': [
            'DRC G2 obrigatoriamente',
            'DRC G3a',
            'Não há critério suficiente de DRC nesses dados',
            'Albuminúria A3'
          ],
          'a': 2,
          'why': 'DRC G2 obrigatoriamente: G2 requer marcador de dano persistente para configurar DRC. DRC G3a: G3a corresponde à faixa 45 a 59, se crônica. Não há critério suficiente de DRC nesses dados: TFGe acima de 60 e RAC A1 sem outro marcador não bastam. Albuminúria A3: RAC de 12 mg/g pertence à faixa A1.',
          'explanations': [
            'G2 requer marcador de dano persistente para configurar DRC.',
            'G3a corresponde à faixa 45 a 59, se crônica.',
            'TFGe acima de 60 e RAC A1 sem outro marcador não bastam.',
            'RAC de 12 mg/g pertence à faixa A1.'
          ],
          'refs': [
            'kdigo'
          ]
        },
        {
          'id': 'r2q2',
          'q': 'TFGe de 52, 49 e 50 ao longo de 7 meses, RAC persistente de 120 mg/g. Qual síntese é adequada?',
          'o': [
            'DRC G3a A2, causa a esclarecer',
            'LRA obrigatória',
            'DRC G4 A3',
            'Não há DRC porque a RAC está abaixo de 300'
          ],
          'a': 0,
          'why': 'DRC G3a A2, causa a esclarecer: Há cronicidade e os valores pertencem a G3a e A2. LRA obrigatória: A série estável não demonstra aumento agudo; uma LRA sobreposta depende de novos dados. DRC G4 A3: Os valores não pertencem a essas faixas. Não há DRC porque a RAC está abaixo de 300: A TFGe persistentemente abaixo de 60 já atende ao critério, e A2 também importa.',
          'explanations': [
            'Há cronicidade e os valores pertencem a G3a e A2.',
            'A série estável não demonstra aumento agudo; uma LRA sobreposta depende de novos dados.',
            'Os valores não pertencem a essas faixas.',
            'A TFGe persistentemente abaixo de 60 já atende ao critério, e A2 também importa.'
          ],
          'refs': [
            'kdigo',
            'ckd'
          ]
        },
        {
          'id': 'r2q3',
          'q': 'Pessoa com doença febril apresenta primeira RAC de 9 mg/mmol. Qual conduta interpretativa?',
          'o': [
            'Rotular DRC permanente pela primeira amostra',
            'Reavaliar contexto e confirmar em amostra matinal',
            'Tratar como 9 mg/g',
            'Ignorar porque só A3 importa'
          ],
          'a': 1,
          'why': 'Rotular DRC permanente pela primeira amostra: Não foi demonstrada duração e há fator transitório possível. Reavaliar contexto e confirmar em amostra matinal: A NG203 recomenda confirmação matinal nessa faixa, com avaliação clínica. Tratar como 9 mg/g: Unidades diferentes não podem ser intercambiadas pelo mesmo número. Ignorar porque só A3 importa: A2 pode ser clinicamente importante e merece avaliação.',
          'explanations': [
            'Não foi demonstrada duração e há fator transitório possível.',
            'A NG203 recomenda confirmação matinal nessa faixa, com avaliação clínica.',
            'Unidades diferentes não podem ser intercambiadas pelo mesmo número.',
            'A2 pode ser clinicamente importante e merece avaliação.'
          ],
          'refs': [
            'ckd'
          ]
        },
        {
          'id': 'r2q4',
          'q': 'RAC inicial de 85 mg/mmol em amostra adequada. Qual afirmação reflete NG203?',
          'o': [
            'Pode ser ignorada',
            'Prova cronicidade por si só',
            'É A1',
            'Dispensa a repetição confirmatória específica, sem dispensar avaliação'
          ],
          'a': 3,
          'why': 'Pode ser ignorada: É um achado relevante, não normal. Prova cronicidade por si só: Uma amostra não demonstra duração de 3 meses. É A1: A faixa é A3 em mg/mmol. Dispensa a repetição confirmatória específica, sem dispensar avaliação: A recomendação 1.1.12 dispensa essa confirmação quando RAC é pelo menos 70 mg/mmol, mas não toda investigação.',
          'explanations': [
            'É um achado relevante, não normal.',
            'Uma amostra não demonstra duração de 3 meses.',
            'A faixa é A3 em mg/mmol.',
            'A recomendação 1.1.12 dispensa essa confirmação quando RAC é pelo menos 70 mg/mmol, mas não toda investigação.'
          ],
          'refs': [
            'ckd'
          ]
        },
        {
          'id': 'r2q5',
          'q': 'TFGe de 58 aparece pela primeira vez em adulto assintomático, sem exame anterior. Qual leitura é melhor?',
          'o': [
            'Já existe DRC G3a confirmada',
            'Aguardar um ano sem controle',
            'Excluir causa aguda e repetir em até 2 semanas, conforme contexto',
            'A idade sozinha define a conduta'
          ],
          'a': 2,
          'why': 'Já existe DRC G3a confirmada: Ainda falta estabelecer persistência ou evidência de cronicidade. Aguardar um ano sem controle: Uma alteração nova precisa de avaliação antes disso. Excluir causa aguda e repetir em até 2 semanas, conforme contexto: NG203 1.1.8 recomenda confirmação precoce; doença aguda exige avaliação mais rápida. A idade sozinha define a conduta: A avaliação considera risco, causa e evolução, não só idade.',
          'explanations': [
            'Ainda falta estabelecer persistência ou evidência de cronicidade.',
            'Uma alteração nova precisa de avaliação antes disso.',
            'NG203 1.1.8 recomenda confirmação precoce; doença aguda exige avaliação mais rápida.',
            'A avaliação considera risco, causa e evolução, não só idade.'
          ],
          'refs': [
            'ckd',
            'aki'
          ]
        },
        {
          'id': 'r2q6',
          'q': 'Pessoa com DRC estável tem súbita elevação de creatinina e redução da diurese. Qual hipótese deve ser considerada?',
          'o': [
            'LRA sobre DRC',
            'Progressão crônica inevitável, sem causa reversível',
            'A TFGe automática exclui urgência',
            'A RAC isolada define a dose de todos os medicamentos'
          ],
          'a': 0,
          'why': 'LRA sobre DRC: A mudança aguda exige avaliação de agressão sobre a doença prévia. Progressão crônica inevitável, sem causa reversível: Atribuir automaticamente à progressão pode perder hipoperfusão, toxicidade ou obstrução. A TFGe automática exclui urgência: TFGe calculada é limitada durante rápida mudança e não avalia todas as complicações. A RAC isolada define a dose de todos os medicamentos: O ajuste depende do fármaco, da estimativa apropriada e da estabilidade clínica.',
          'explanations': [
            'A mudança aguda exige avaliação de agressão sobre a doença prévia.',
            'Atribuir automaticamente à progressão pode perder hipoperfusão, toxicidade ou obstrução.',
            'TFGe calculada é limitada durante rápida mudança e não avalia todas as complicações.',
            'O ajuste depende do fármaco, da estimativa apropriada e da estabilidade clínica.'
          ],
          'refs': [
            'aki',
            'kdigo'
          ]
        }
      ]
    },
    {
      'id': 'renal_m3',
      'layer': 'Urina e integração',
      'title': 'EAS e sedimento: do achado ao mecanismo',
      'summary': 'Integre coleta, fita, microscopia e sintomas para separar contaminação, padrão glomerular, tubular e infecção.',
      'goals': [
        'Ler fita e sedimento como métodos complementares.',
        'Reconhecer padrões que exigem investigação renal ou urológica.',
        'Evitar antibiótico automático por leucocitúria ou bacteriúria isolada.'
      ],
      'pretest': [
        'Sangue positivo na fita sempre significa hemácias intactas no sedimento?',
        'Leucócitos na urina confirmam infecção bacteriana?',
        'Um cilindro isolado identifica com certeza a doença de base?'
      ],
      'sections': [
        {
          'h': 'Qualidade antes de quantidade',
          'p': [
            'Confirme método de coleta, condições de transporte, tempo até processamento, menstruação, instrumentação, sintomas e uso prévio de antimicrobianos. Amostra inadequada pode misturar leucócitos, células e bactérias de outra origem. O comentário do laboratório faz parte do resultado.',
            'Não compare diretamente contagens por campo com contagens por volume. A técnica, a centrifugação e o sistema automatizado alteram o que é reportado. Os intervalos do laboratório e a revisão manual quando necessária valem mais que um limite universal inventado. Em quadro grave, a busca de uma amostra melhor não deve adiar o atendimento.'
          ]
        },
        {
          'h': 'Fita e microscopia respondem a perguntas diferentes',
          'table': {
            'head': [
              'Achado',
              'O que significa',
              'O que fazer com a informação'
            ],
            'rows': [
              [
                'Reação para sangue',
                'Detecta atividade do grupo heme; pode reagir com hemácias, hemoglobina ou mioglobina.',
                'Correlacione com microscopia e contexto; discrepância não prova rabdomiólise sozinha.'
              ],
              [
                'Proteína na fita',
                'Tem maior sensibilidade para albumina que para algumas outras proteínas.',
                'Quantifique conforme a pergunta clínica; uma fita negativa não substitui RAC quando indicada.'
              ],
              [
                'Esterase leucocitária',
                'Sinal de células inflamatórias.',
                'Inflamação pode ocorrer sem infecção bacteriana.'
              ],
              [
                'Nitrito',
                'Pode apoiar bacteriúria por organismos capazes de produzi-lo.',
                'Resultado negativo não exclui infecção; sintomas, coleta e cultura continuam importantes.'
              ]
            ]
          },
          'after': 'Não usamos a microscopia como etapa obrigatória para confirmar toda fita positiva em rastreamento de DRC: NG203 1.1.16 recomenda investigação da hematúria por fita sem exigir essa confirmação. Aqui, o sedimento é ensinado para caracterizar mecanismos em um contexto clínico, especialmente na LRA.'
        },
        {
          'h': 'O padrão glomerular é uma associação clínica',
          'table': {
            'head': [
              'Achado',
              'O que significa',
              'O que fazer com a informação'
            ],
            'rows': [
              [
                'Hemácias dismórficas e acantócitos',
                'Favorecem origem glomerular, conforme qualidade e observador.',
                'Integre proteinúria, função renal, pressão e sintomas sistêmicos.'
              ],
              [
                'Cilindros hemáticos',
                'Sugerem fortemente sangramento de origem renal, frequentemente glomerular.',
                'Piora aguda com hematúria e proteinúria pode exigir nefrologia; não são absolutamente exclusivos de uma doença.'
              ],
              [
                'Hemácias isomórficas',
                'Podem ocorrer em sangramento urológico.',
                'Não localizam com certeza nem excluem doença glomerular.'
              ]
            ]
          },
          'after': 'O diagnóstico etiológico pode exigir sorologias, imagem e, em contexto selecionado, biópsia. Não transforme um achado morfológico em indicação automática de imunossupressão.'
        },
        {
          'h': 'O padrão tubular e o intersticial',
          'table': {
            'head': [
              'Achado',
              'O que significa',
              'O que fazer com a informação'
            ],
            'rows': [
              [
                'Células epiteliais tubulares e cilindros granulosos pigmentados',
                'Favorecem lesão tubular no contexto adequado.',
                'Procure isquemia, sepse ou exposição tóxica e acompanhe evolução.'
              ],
              [
                'Leucócitos e cilindros leucocitários',
                'Podem ocorrer em pielonefrite ou nefrite intersticial e em outros processos inflamatórios.',
                'Diferencie pela história, sintomas, exposição e cultura quando indicada.'
              ],
              [
                'Cilindros hialinos',
                'Podem ocorrer em urina concentrada e em situações sem doença renal específica.',
                'Sozinhos não provam necrose tubular nem infecção.'
              ],
              [
                'Cristais',
                'Dependem de pH, concentração, substâncias e conservação da amostra.',
                'Correlacione com cálculo, fármacos e contexto; cristal não equivale automaticamente a cálculo obstrutivo.'
              ]
            ]
          },
          'after': 'A revisão de Gaggar e Raju descreve desempenho variável, dependência do observador e limitações da análise automatizada. Não reproduzimos percentuais de acurácia de estudos selecionados como verdades universais.'
        },
        {
          'h': 'Leucocitúria não é uma prescrição',
          'p': [
            'Uma urina com leucócitos ou bactérias não separa, sozinha, colonização, contaminação e infecção sintomática. Disúria, urgência, febre, dor lombar, instabilidade, gestação, sonda e procedimentos mudam a interpretação. A cultura identifica o organismo e o perfil de sensibilidade quando há indicação, mas não cria uma síndrome clínica ausente.',
            'A NG109 orienta que bacteriúria assintomática em pessoas não grávidas não deve ser tratada rotineiramente. Gestação e contextos urológicos específicos exigem avaliação própria. Este bloco não extrapola essa regra para todas as populações. O Laboratório de Urocultura e antibiograma aprofunda coleta, contexto, resistência e escolha terapêutica sem simulador.'
          ]
        },
        {
          'h': 'Laudo resolvido: sangue e proteína com piora renal',
          'table': {
            'head': [
              'Dado fictício',
              'Resultado',
              'Raciocínio'
            ],
            'rows': [
              [
                'Creatinina',
                '0,9 para 1,8 mg/dL em 5 dias',
                'Há mudança aguda importante.'
              ],
              [
                'Fita e sedimento',
                'Sangue, proteína e cilindros hemáticos',
                'Padrão sugere processo renal, frequentemente glomerular.'
              ],
              [
                'História',
                'Sem sintomas urinários baixos; edema novo',
                'Não basta chamar de cistite; avaliar pressão, volemia, potássio e doença sistêmica.'
              ]
            ]
          },
          'after': 'A NG148 1.4.3 orienta pensar em nefrite aguda e encaminhamento à nefrologia quando LRA sem causa evidente se associa a hematúria e proteinúria, sem ITU ou trauma por sonda. O sedimento reforça o mecanismo, mas a etiologia continua em investigação.'
        },
        {
          'h': 'Não perca obstrução nem gravidade',
          'p': [
            'Na LRA com causa não identificada ou risco de obstrução, NG148 1.4.6 recomenda ultrassom urgente, em até 24 horas da avaliação. Se houver suspeita de rim infectado e obstruído, a recomendação 1.4.5 é ultrassom imediato, em até 6 horas. São prazos do fluxo NICE, não autorização para esperar diante de instabilidade.',
            'Obstrução de rim único, obstrução bilateral e complicações da LRA pedem avaliação imediata. Febre com obstrução pode exigir controle urgente do foco. Antibiótico isolado não resolve a obstrução; a escolha, posologia, via e ajuste renal dependem da síndrome e da fonte específica no módulo de urocultura e no Manual de prescrição.'
          ]
        },
        {
          'h': 'Como apresentar a interpretação em uma prova prática',
          'list': [
            'Valido amostra, unidade e história, e digo o que pode ter interferido.',
            'Descrevo o padrão: fita, células, cilindros e quantificação de proteína quando indicada.',
            'Integro a função renal basal e atual e verifico sinais de urgência.',
            'Apresento duas hipóteses e os dados a favor e contra, sem chamar associação de confirmação.',
            'Proponho a próxima investigação e o grau de prioridade; declaro o que ainda falta saber.'
          ],
          'after': 'Modelo de fala: Há LRA com sedimento ativo e proteinúria, favorecendo mecanismo parenquimatoso. Preciso avaliar gravidade e causa, com apoio da nefrologia conforme o quadro. Não há base para escolher antibiótico apenas pela leucocitúria.'
        }
      ],
      'pitfalls': [
        'Tratar a urina e esquecer os sintomas.',
        'Usar cilindros leucocitários como prova exclusiva de pielonefrite.',
        'Chamar uma fita positiva para sangue de rabdomiólise sem contexto.',
        'Esperar a cultura para avaliar um rim infectado e obstruído.'
      ],
      'refs': [
        'sed',
        'pre',
        'aki',
        'ckd',
        'itu'
      ],
      'quiz': [
        {
          'id': 'r3q1',
          'q': 'Urina escura após lesão muscular, fita para sangue positiva e poucas hemácias. O que é adequado?',
          'o': [
            'Confirmar automaticamente glomerulonefrite',
            'Considerar pigmento heme e correlacionar com história e exames',
            'Excluir lesão renal pela baixa contagem de hemácias',
            'Prescrever antibiótico pela cor'
          ],
          'a': 1,
          'why': 'Confirmar automaticamente glomerulonefrite: A discrepância não estabelece origem glomerular. Considerar pigmento heme e correlacionar com história e exames: Mioglobina ou hemoglobina podem reagir na fita; são hipóteses que exigem correlação e avaliação de função renal e eletrólitos. Excluir lesão renal pela baixa contagem de hemácias: Poucas hemácias não excluem dano renal nem pigmentúria. Prescrever antibiótico pela cor: A cor não demonstra infecção bacteriana.',
          'explanations': [
            'A discrepância não estabelece origem glomerular.',
            'Mioglobina ou hemoglobina podem reagir na fita; são hipóteses que exigem correlação e avaliação de função renal e eletrólitos.',
            'Poucas hemácias não excluem dano renal nem pigmentúria.',
            'A cor não demonstra infecção bacteriana.'
          ],
          'refs': [
            'sed',
            'pre'
          ]
        },
        {
          'id': 'r3q2',
          'q': 'LRA, proteinúria e cilindros hemáticos, sem ITU ou trauma por sonda. Qual prioridade?',
          'o': [
            'Rotular cistite simples',
            'Ignorar os cilindros',
            'Avaliar possível nefrite e necessidade de nefrologia',
            'Iniciar imunossupressão só pelo EAS'
          ],
          'a': 2,
          'why': 'Rotular cistite simples: O padrão não se explica automaticamente por infecção baixa. Ignorar os cilindros: O conjunto pode revelar doença renal relevante. Avaliar possível nefrite e necessidade de nefrologia: É compatível com NG148 1.4.3, integrando gravidade e investigação etiológica. Iniciar imunossupressão só pelo EAS: A morfologia não define sozinha causa nem segurança de imunossupressão.',
          'explanations': [
            'O padrão não se explica automaticamente por infecção baixa.',
            'O conjunto pode revelar doença renal relevante.',
            'É compatível com NG148 1.4.3, integrando gravidade e investigação etiológica.',
            'A morfologia não define sozinha causa nem segurança de imunossupressão.'
          ],
          'refs': [
            'aki',
            'sed'
          ]
        },
        {
          'id': 'r3q3',
          'q': 'Cilindros leucocitários estão presentes. Qual interpretação evita excesso de certeza?',
          'o': [
            'Provam exclusivamente pielonefrite',
            'Podem acompanhar infecção ou inflamação intersticial',
            'Excluem qualquer doença renal',
            'Definem o antibiótico e a dose'
          ],
          'a': 1,
          'why': 'Provam exclusivamente pielonefrite: Também podem ocorrer em nefrite intersticial e outros processos. Podem acompanhar infecção ou inflamação intersticial: É preciso integrar sintomas, exposições, cultura quando indicada e função renal. Excluem qualquer doença renal: São formados nos túbulos e exigem correlação renal. Definem o antibiótico e a dose: Não identificam organismo, sensibilidade nem ajuste de dose.',
          'explanations': [
            'Também podem ocorrer em nefrite intersticial e outros processos.',
            'É preciso integrar sintomas, exposições, cultura quando indicada e função renal.',
            'São formados nos túbulos e exigem correlação renal.',
            'Não identificam organismo, sensibilidade nem ajuste de dose.'
          ],
          'refs': [
            'sed'
          ]
        },
        {
          'id': 'r3q4',
          'q': 'Pessoa adulta não grávida, sem sintomas urinários, tem leucócitos e bactérias em coleta possivelmente inadequada. Qual atitude é melhor?',
          'o': [
            'Tratar toda bacteriúria',
            'Escolher antibiótico só pelo EAS',
            'Ignorar para sempre qualquer sintoma futuro',
            'Reavaliar coleta e contexto, sem antibiótico automático'
          ],
          'a': 3,
          'why': 'Tratar toda bacteriúria: A NG109 não recomenda tratamento rotineiro de bacteriúria assintomática em não grávidas. Escolher antibiótico só pelo EAS: O EAS não determina síndrome nem suscetibilidade. Ignorar para sempre qualquer sintoma futuro: O seguimento depende de novos sintomas e condições especiais. Reavaliar coleta e contexto, sem antibiótico automático: Diferencie contaminação, colonização e infecção; condições especiais exigem avaliação própria.',
          'explanations': [
            'A NG109 não recomenda tratamento rotineiro de bacteriúria assintomática em não grávidas.',
            'O EAS não determina síndrome nem suscetibilidade.',
            'O seguimento depende de novos sintomas e condições especiais.',
            'Diferencie contaminação, colonização e infecção; condições especiais exigem avaliação própria.'
          ],
          'refs': [
            'itu',
            'sed'
          ]
        },
        {
          'id': 'r3q5',
          'q': 'LRA com suspeita de rim infectado e obstruído. Segundo NG148, a imagem deve ser:',
          'o': [
            'Adiada até a cultura final',
            'Imediata, em até 6 horas da avaliação, sem atrasar suporte',
            'Apenas eletiva em 3 meses',
            'Dispensada porque o antibiótico resolve a obstrução'
          ],
          'a': 1,
          'why': 'Adiada até a cultura final: A espera pode atrasar controle do foco. Imediata, em até 6 horas da avaliação, sem atrasar suporte: Recomendação 1.4.5; instabilidade demanda atendimento imediato. Apenas eletiva em 3 meses: É uma situação potencialmente urgente. Dispensada porque o antibiótico resolve a obstrução: Antimicrobiano não substitui avaliação e alívio da obstrução.',
          'explanations': [
            'A espera pode atrasar controle do foco.',
            'Recomendação 1.4.5; instabilidade demanda atendimento imediato.',
            'É uma situação potencialmente urgente.',
            'Antimicrobiano não substitui avaliação e alívio da obstrução.'
          ],
          'refs': [
            'aki'
          ]
        },
        {
          'id': 'r3q6',
          'q': 'Na LRA após choque, aparecem células tubulares e cilindros granulosos pigmentados. Qual leitura é melhor?',
          'o': [
            'Favorecem lesão tubular no contexto, sem fechar toda a etiologia',
            'Provam cálculo ureteral',
            'São sempre achados normais sem importância',
            'Obrigam antibiótico de amplo espectro'
          ],
          'a': 0,
          'why': 'Favorecem lesão tubular no contexto, sem fechar toda a etiologia: O conjunto apoia mecanismo tubular e deve ser integrado à história e à evolução. Provam cálculo ureteral: Não localizam obstrução nem demonstram cálculo. São sempre achados normais sem importância: No contexto descrito merecem investigação e acompanhamento. Obrigam antibiótico de amplo espectro: Não estabelecem infecção bacteriana nem escolhem tratamento.',
          'explanations': [
            'O conjunto apoia mecanismo tubular e deve ser integrado à história e à evolução.',
            'Não localizam obstrução nem demonstram cálculo.',
            'No contexto descrito merecem investigação e acompanhamento.',
            'Não estabelecem infecção bacteriana nem escolhem tratamento.'
          ],
          'refs': [
            'sed',
            'aki'
          ]
        }
      ]
    }
  ],
  'CASES': [
    {
      'id': 'renal_c1',
      'focus': 'Mudança aguda após perdas',
      'stem': 'Adulto de 44 anos com diarreia e baixa ingestão. Todos os dados são fictícios.',
      'stages': [
        {
          'id': 'renal_c1s1',
          'h': 'Primeiro laudo',
          'text': 'Há exame basal há 4 dias. Não há história renal documentada.',
          'ask': 'Qual interpretação é sustentada?',
          'o': [
            'LRA pelo aumento relativo; avaliar causa e gravidade',
            'DRC G4 comprovada',
            'Nenhuma alteração porque o valor é pequeno'
          ],
          'a': 0,
          'explanations': [
            'A creatinina aumentou 62,5% em 4 dias, preenchendo critério relativo.',
            'Faltam cronicidade e dados compatíveis com essa categoria.',
            'A magnitude relativa e o tempo importam.'
          ],
          'refs': [
            'aki'
          ],
          'hint': 'Compare a função basal e atual, confira a unidade e separe o mecanismo provável do diagnóstico confirmado.',
          'table': {
            'head': [
              'Exame ou dado',
              'Resultado fictício'
            ],
            'rows': [
              [
                'Creatinina basal',
                '0,8 mg/dL'
              ],
              [
                'Creatinina atual',
                '1,3 mg/dL'
              ]
            ]
          }
        },
        {
          'id': 'renal_c1s2',
          'h': 'Novos dados',
          'text': 'Há redução de diurese e sinais de perdas; ainda faltam avaliação completa de volemia e eletrólitos.',
          'ask': 'Qual próximo passo evita um atalho perigoso?',
          'o': [
            'Prescrever volume fixo sem examinar',
            'Avaliar perfusão, congestão, eletrólitos, exposições e evolução',
            'Decidir diálise apenas pela ureia'
          ],
          'a': 1,
          'explanations': [
            'Reposição depende do exame e do risco de congestão; não há volume universal no laudo.',
            'O mecanismo hemodinâmico é plausível, mas exige avaliação e acompanhamento da resposta.',
            'A decisão é clínica e baseada também em complicações refratárias.'
          ],
          'refs': [
            'aki',
            'kdigo'
          ],
          'hint': 'Compare a função basal e atual, confira a unidade e separe o mecanismo provável do diagnóstico confirmado.'
        }
      ],
      'ask': 'Sintetize o mecanismo mais provável, o grau de urgência e os dados que ainda faltam.',
      'answer': [
        'Identifique LRA pelo aumento relativo em 7 dias.',
        'Perdas sugerem hipoperfusão, sem excluir lesão tubular ou outra causa.',
        'Avalie volemia, perfusão, eletrólitos, diurese e exposições antes de uma intervenção.',
        'Não use a TFGe automática nem ureia isolada para decidir dose, volume ou diálise.'
      ]
    },
    {
      'id': 'renal_c2',
      'focus': 'Cronicidade e unidades da RAC',
      'stem': 'Adulto em acompanhamento ambulatorial, sem síndrome aguda.',
      'stages': [
        {
          'id': 'renal_c2s1',
          'h': 'Série de exames',
          'text': 'Os exames são de janeiro, maio e agosto, com unidades compatíveis.',
          'ask': 'Qual síntese corresponde aos dados?',
          'o': [
            'DRC G3a A2, etiologia a esclarecer',
            'LRA demonstrada apenas pela TFGe',
            'DRC G2 A3'
          ],
          'a': 0,
          'explanations': [
            'A redução persiste por mais de 3 meses; 120 mg/g está em A2.',
            'Uma série relativamente estável não mostra critério de mudança aguda.',
            'As duas categorias divergem das faixas apresentadas.'
          ],
          'refs': [
            'kdigo',
            'ckd'
          ],
          'hint': 'Compare a função basal e atual, confira a unidade e separe o mecanismo provável do diagnóstico confirmado.',
          'table': {
            'head': [
              'Exame ou dado',
              'Resultado fictício'
            ],
            'rows': [
              [
                'TFGe',
                '52, 49 e 50 mL/min/1,73 m²'
              ],
              [
                'RAC persistente',
                '120 mg/g'
              ]
            ]
          }
        },
        {
          'id': 'renal_c2s2',
          'h': 'Resultado de outra pessoa',
          'text': 'Um segundo laudo, de outra pessoa com febre recente, informa primeira RAC de 12 mg/mmol.',
          'ask': 'Qual comparação é correta?',
          'o': [
            '12 mg/mmol vale numericamente 12 mg/g',
            'É A2 na unidade informada; confirmar contexto e amostra matinal',
            'Um único resultado comprova DRC'
          ],
          'a': 1,
          'explanations': [
            'Unidades não são intercambiáveis pelo mesmo número.',
            'A faixa de 3 a 30 mg/mmol é A2; NG203 recomenda confirmação nessa faixa.',
            'Falta demonstrar persistência ou evidência de cronicidade.'
          ],
          'refs': [
            'ckd',
            'kdigo'
          ],
          'hint': 'Leia a unidade antes de escolher a categoria A. Confirmação da amostra e cronicidade são perguntas diferentes.'
        }
      ],
      'ask': 'Sintetize o mecanismo mais provável, o grau de urgência e os dados que ainda faltam.',
      'answer': [
        'A série da primeira pessoa é compatível com DRC G3a A2.',
        'A classificação não define a etiologia; investigue história, comorbidades e tendência.',
        'O segundo laudo não deve ser misturado à série da primeira pessoa nem convertido pelo mesmo número.',
        'Uma RAC elevada em contexto febril precisa de interpretação e confirmação apropriadas.'
      ]
    },
    {
      'id': 'renal_c3',
      'focus': 'Sedimento ativo e edema',
      'stem': 'Adulto com edema novo, sem disúria e sem instrumentação urinária.',
      'stages': [
        {
          'id': 'renal_c3s1',
          'h': 'Sangue, proteína e função renal',
          'text': 'O laboratório descreve cilindros hemáticos em amostra adequada.',
          'ask': 'Qual mecanismo merece prioridade?',
          'o': [
            'Cistite simples confirmada',
            'Processo renal, frequentemente glomerular, a investigar',
            'Contaminação certa sem investigação'
          ],
          'a': 1,
          'explanations': [
            'Ausência de sintomas baixos e o conjunto renal tornam esse rótulo insuficiente.',
            'LRA com hematúria e proteinúria sugere nefrite; a etiologia ainda não está definida.',
            'A hipótese de contaminação não explica automaticamente um sedimento ativo e a piora renal.'
          ],
          'refs': [
            'aki',
            'sed'
          ],
          'hint': 'Compare a função basal e atual, confira a unidade e separe o mecanismo provável do diagnóstico confirmado.',
          'table': {
            'head': [
              'Exame ou dado',
              'Resultado fictício'
            ],
            'rows': [
              [
                'Creatinina',
                '0,9 para 1,8 mg/dL em 5 dias'
              ],
              [
                'EAS',
                'Sangue, proteína e cilindros hemáticos'
              ]
            ]
          }
        },
        {
          'id': 'renal_c3s2',
          'h': 'Diferencial e prioridade',
          'text': 'Há pressão elevada e edema. Ainda faltam potássio, avaliação de congestão e investigação sistêmica.',
          'ask': 'Como avançar?',
          'o': [
            'Escolher imunossupressão apenas pelo cilindro',
            'Esperar meses porque a creatinina não é muito alta',
            'Avaliar gravidade e nefrologia, com investigação etiológica'
          ],
          'a': 2,
          'explanations': [
            'O cilindro sugere mecanismo, mas não define causa nem segurança do tratamento.',
            'Piora aguda com sedimento ativo exige avaliação em tempo oportuno.',
            'NG148 1.4.3 apoia considerar nefrite e encaminhamento; urgência depende das complicações.'
          ],
          'refs': [
            'aki',
            'sed'
          ],
          'hint': 'O que o sedimento sugere? O que ele ainda não prova? Que complicações exigem avaliação imediata?'
        }
      ],
      'ask': 'Sintetize o mecanismo mais provável, o grau de urgência e os dados que ainda faltam.',
      'answer': [
        'Há mudança aguda da creatinina e sedimento ativo.',
        'O padrão favorece mecanismo parenquimatoso, frequentemente glomerular.',
        'Avalie pressão, volemia, eletrólitos e manifestações sistêmicas; considere nefrologia conforme gravidade.',
        'Não transforme o EAS em prescrição automática de antibiótico ou imunossupressor.'
      ]
    },
    {
      'id': 'renal_c4',
      'focus': 'Inflamação urinária sem síndrome infecciosa',
      'stem': 'Adulta não grávida, sem disúria, febre ou dor lombar, fez EAS sem indicação clínica clara.',
      'stages': [
        {
          'id': 'renal_c4s1',
          'h': 'Amostra questionável',
          'text': 'Há leucócitos, bactérias e comentário de possível contaminação.',
          'ask': 'Qual conclusão é segura?',
          'o': [
            'Infecção que sempre exige antibiótico',
            'O EAS sozinho não distingue contaminação e bacteriúria de infecção sintomática',
            'O nitrito decide toda a avaliação'
          ],
          'a': 1,
          'explanations': [
            'A ausência de síndrome e a coleta inadequada impedem essa conclusão.',
            'Reveja indicação, coleta e condições especiais; não prescreva pela urina isolada.',
            'Mesmo um teste de apoio não substitui história nem condições da amostra.'
          ],
          'refs': [
            'itu',
            'sed'
          ],
          'hint': 'Há sintomas? A amostra é confiável? A pessoa pertence a um grupo com orientação específica?'
        },
        {
          'id': 'renal_c4s2',
          'h': 'E se a história mudar?',
          'text': 'Em outra situação, aparecem febre e dor lombar. A função renal também se altera.',
          'ask': 'Qual próximo raciocínio é adequado?',
          'o': [
            'Manter o rótulo de colonização sem reavaliar',
            'Reavaliar síndrome, gravidade, cultura quando indicada e função renal',
            'Escolher qualquer fármaco apenas pelo nome de bactéria'
          ],
          'a': 1,
          'explanations': [
            'Uma nova síndrome muda a probabilidade e a prioridade.',
            'Sintomas sistêmicos e piora renal exigem avaliação; a decisão terapêutica é contextual.',
            'Local da infecção, suscetibilidade, via e ajuste renal importam.'
          ],
          'refs': [
            'aki',
            'itu'
          ],
          'hint': 'A segunda etapa muda o contexto clínico. Não aplique uma conclusão da etapa anterior a uma situação diferente.'
        }
      ],
      'ask': 'Sintetize o mecanismo mais provável, o grau de urgência e os dados que ainda faltam.',
      'answer': [
        'Leucocitúria e bacteriúria não são sinônimos de ITU sintomática.',
        'Bacteriúria assintomática em não grávidas não é tratada rotineiramente; condições específicas requerem orientação própria.',
        'Uma nova síndrome com febre e dor lombar exige reavaliação, não repetição automática da conclusão anterior.',
        'Aprofunde cultura, suscetibilidade e posologia no Laboratório de Urocultura, sem simulador.'
      ]
    },
    {
      'id': 'renal_c5',
      'focus': 'Obstrução e urgência',
      'stem': 'Adulto com rim único conhecido, redução importante de diurese e desconforto lombar.',
      'stages': [
        {
          'id': 'renal_c5s1',
          'h': 'A história muda a prioridade',
          'text': 'A creatinina subiu em relação à basal e há suspeita de obstrução.',
          'ask': 'O que precisa ser excluído rapidamente?',
          'o': [
            'Obstrução em rim único, com avaliação imediata',
            'Somente DRC estável',
            'Uma alteração irrelevante até a cultura ficar pronta'
          ],
          'a': 0,
          'explanations': [
            'A NG148 1.5.1 orienta encaminhamento imediato nesse contexto obstrutivo.',
            'A mudança aguda e a história não permitem esse rótulo tranquilizador.',
            'Esperar cultura pode atrasar alívio de uma obstrução relevante.'
          ],
          'refs': [
            'aki'
          ],
          'hint': 'Rim único mais obstrução possível deixa pouca margem para perda adicional de função.'
        },
        {
          'id': 'renal_c5s2',
          'h': 'Surge febre',
          'text': 'Agora há suspeita de rim infectado e obstruído.',
          'ask': 'Qual atitude está alinhada à NG148?',
          'o': [
            'Antibiótico isolado e retorno eletivo',
            'Aguardar 24 horas para decidir se precisa de qualquer avaliação',
            'Suporte e avaliação imediatos; ultrassom em até 6 horas no fluxo NICE'
          ],
          'a': 2,
          'explanations': [
            'Antibiótico não remove o obstáculo nem substitui controle do foco.',
            'A recomendação para suspeita de pionefrose é mais urgente; instabilidade exige ação imediata.',
            'NG148 1.4.5 orienta imagem imediata, em até 6 horas; atendimento não deve aguardar o prazo máximo.'
          ],
          'refs': [
            'aki'
          ],
          'hint': 'Diferencie a janela de imagem para LRA sem causa ou risco de obstrução da suspeita de infecção com obstrução.'
        }
      ],
      'ask': 'Sintetize o mecanismo mais provável, o grau de urgência e os dados que ainda faltam.',
      'answer': [
        'Piora aguda em rim único com suspeita de obstrução é prioridade.',
        'Infecção associada à obstrução pode exigir controle urgente do foco e suporte.',
        'NG148 distingue ultrassom em até 24 horas para LRA sem causa ou risco obstrutivo e em até 6 horas quando há suspeita de rim infectado e obstruído.',
        'A gravidade clínica pode exigir ação imediata; esses prazos não autorizam esperar.'
      ]
    }
  ]
};
