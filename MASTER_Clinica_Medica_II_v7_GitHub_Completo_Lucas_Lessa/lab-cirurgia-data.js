/* Conteúdo autoral: foco nos temas e pesos cadastrados de Cirurgia. */
window.MASTER_LAB_CIRURGIA={
  'id': 'lab_cirurgia_v1',
  'version': '2026.11.16.1',
  'title': 'Exames prioritários para Cirurgia',
  'REFS': {
    'cir_panc': {
      't': 'Chatila e colaboradores. Evaluation and management of acute pancreatitis. World J Clin Cases, 2019;7:1006-1020.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6511926/',
      'scope': 'Tabela de Ranson não biliar e BISAP. Revisão usada para diagnóstico e escores, sem transportar sua recomendação histórica de hidratação agressiva para a prática atual.',
      'year': '2019',
      'status': 'texto consultado em 16/11/2026'
    },
    'cir_atlanta': {
      't': 'Souza e colaboradores. Understanding the international consensus for acute pancreatitis: classification of Atlanta 2012. ABCD, 2016.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5074676/',
      'scope': 'Dois de três critérios, classificação por falência orgânica e complicações. Não confundir escore preditivo com definição de gravidade.',
      'year': '2016',
      'status': 'texto consultado em 16/11/2026'
    },
    'cir_acg': {
      't': 'Otsuka e colaboradores. Clinical practice guidelines for acute pancreatitis in the United States and Japan: similarities and differences. Hepatobiliary Surg Nutr, 2024.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11534771/',
      'scope': 'Comentário aberto sobre recomendações americanas de 2024 e japonesas. Fonte secundária identificada, sem declarar leitura do documento primário ACG.',
      'year': '2024',
      'status': 'texto consultado em 16/11/2026'
    },
    'cir_nicepanc': {
      't': 'NICE NG104. Pancreatitis. Recomendações vigentes consultadas em 16/11/2026.',
      'u': 'https://www.nice.org.uk/guidance/ng104/chapter/Recommendations',
      'scope': 'Diagnóstico no contexto clínico, avaliação e ausência de indicação de antibiótico profilático apenas pela pancreatite.',
      'year': '2018/vigente',
      'status': 'texto consultado em 16/11/2026'
    },
    'cir_asge': {
      't': 'Buxbaum e colaboradores. ASGE guideline on the role of endoscopy in the evaluation and management of choledocholithiasis. Gastrointest Endosc, 2019.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8594622/',
      'scope': 'Alto risco: cálculo em imagem, colangite ou bilirrubina total acima de 4 mg/dL associada a dilatação do colédoco. Não usar bilirrubina isolada como equivalente.',
      'year': '2019',
      'status': 'texto consultado em 16/11/2026'
    },
    'cir_tg': {
      't': 'Hudgi e colaboradores. Tokyo Guidelines (TG18) for Acute Cholangitis Provide Improved Specificity and Accuracy Compared to Fellow Assessment. Cureus, 2022.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9427126/',
      'scope': 'Tabela 1 reproduz os grupos diagnósticos TG18: inflamação, colestase e imagem. Usada como fonte secundária; a validação deste estudo não é previsão de acurácia para toda população.',
      'year': '2022',
      'status': 'texto consultado em 16/11/2026'
    },
    'cir_liver': {
      't': 'Fontana e colaboradores. AASLD practice guidance on drug, herbal, and dietary supplement-induced liver injury. Hepatology, 2023;77:1036-1065.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9936988/',
      'scope': 'Razão R normalizada pelos limites do laboratório no contexto de lesão hepática: padrão não equivale a diagnóstico etiológico nem confirma obstrução.',
      'year': '2023',
      'status': 'texto consultado em 16/11/2026'
    },
    'cir_trauma': {
      't': 'Rossaint e colaboradores. The European guideline on management of major bleeding and coagulopathy following trauma: sixth edition. Crit Care, 2023;27:80.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9977110/',
      'scope': 'Hemoglobina seriada, controle da hemorragia, TXA na recomendação 23 e fibrinogênio na recomendação 29. Doses específicas do trauma com sangramento relevante.',
      'year': '2023',
      'status': 'texto consultado em 16/11/2026'
    },
    'cir_rbc': {
      't': 'NICE NG24. Red blood cell transfusion. Recomendações vigentes, itens assinalados como 2015, consultadas em 16/11/2026.',
      'u': 'https://www.nice.org.uk/guidance/ng24/chapter/Red-blood-cell-transfusion',
      'scope': 'Limiar restritivo de 70 g/L em grupos selecionados, exclusão de hemorragia maior e síndrome coronariana aguda; uma unidade e reavaliação no adulto sem sangramento ativo.',
      'year': '2015/vigente',
      'status': 'texto consultado em 16/11/2026'
    },
    'cir_plt': {
      't': 'NICE NG24. Platelet transfusion. Recomendações vigentes consultadas em 16/11/2026.',
      'u': 'https://www.nice.org.uk/guidance/ng24/chapter/Platelet-transfusion',
      'scope': 'Procedimentos e cirurgia: considerar elevar acima de 50 × 10⁹/L, com limites mais altos em situações específicas. Não é autorização universal de cirurgia.',
      'year': '2015/vigente',
      'status': 'texto consultado em 16/11/2026'
    },
    'cir_ffp': {
      't': 'NICE NG24. Fresh frozen plasma transfusion. Recomendações vigentes consultadas em 16/11/2026.',
      'u': 'https://www.nice.org.uk/guidance/ng24/chapter/Fresh-frozen-plasma-transfusion',
      'scope': 'Avaliar plasma pelo contexto de sangramento e coagulopatia; não corrigir todo resultado alterado em pessoa sem sangramento.',
      'year': '2015/vigente',
      'status': 'texto consultado em 16/11/2026'
    },
    'cir_preop': {
      't': 'NICE NG45. Routine preoperative tests for elective surgery. Recomendações vigentes consultadas em 16/11/2026.',
      'u': 'https://www.nice.org.uk/guidance/ng45/chapter/Recommendations',
      'scope': 'Testes de hemostasia não são rotina para toda cirurgia eletiva; considerar história, procedimento, comorbidades e anticoagulantes. Testes de rotina não medem adequadamente efeito de DOACs.',
      'year': '2016/vigente',
      'status': 'texto consultado em 16/11/2026'
    }
  },
  'MODULES': [
    {
      'id': 'cir_lab_pancreas',
      'layer': 'Cirurgia · pâncreas',
      'title': 'Pancreatite: enzimas, BUN e escores sem confundir gravidade',
      'summary': 'Treine diagnóstico, tempo dos escores e leitura do laudo. Prioridade baseada no peso cadastrado de Pâncreas.',
      'goals': [
        'Aplicar os dois de três critérios sem exigir TC para toda apresentação.',
        'Separar diagnóstico, etiologia, predição de risco e classificação de gravidade.',
        'Ler BUN, ureia, cálcio e hematócrito com unidade e tendência.'
      ],
      'pretest': [
        'Lipase dez vezes elevada define pancreatite grave?',
        'Ureia de 30 mg/dL equivale a BUN de 30 mg/dL?',
        'Qual parte do Ranson não pode ser encerrada na admissão?'
      ],
      'relatedTopics': [
        {
          'id': 'cirpanc',
          'chapter': 4
        },
        {
          'id': 'ciraa',
          'chapter': 0
        }
      ],
      'exam': [
        {
          'pattern': 'Dor epigástrica típica e lipase acima do corte diagnóstico.',
          'trap': 'Pedir TC obrigatória apenas para somar um terceiro critério.',
          'expected': 'Dois critérios podem estabelecer o diagnóstico; imagem depende da dúvida e da evolução.'
        },
        {
          'pattern': 'Questão pergunta qual parâmetro do Ranson pertence à admissão.',
          'trap': 'Escolher cálcio ou queda do hematócrito como se fossem da primeira lista.',
          'expected': 'Diferenciar os cinco parâmetros de admissão da avaliação em 48 horas.'
        },
        {
          'pattern': 'Paciente tem ureia no laudo e a alternativa cita BUN.',
          'trap': 'Usar o mesmo número para analitos diferentes.',
          'expected': 'Confirmar BUN ou conversão validada e a unidade antes de pontuar.'
        },
        {
          'pattern': 'Lipase muito elevada, mas sem falência orgânica persistente.',
          'trap': 'Definir Atlanta grave pela enzima ou pelo Ranson isolado.',
          'expected': 'A classificação grave depende de falência orgânica persistente além de 48 horas.'
        }
      ],
      'sections': [
        {
          'h': 'A primeira separação: quatro perguntas, quatro respostas',
          'p': [
            'O diagnóstico pergunta se há pancreatite. A investigação etiológica pergunta por que ocorreu. O escore estima risco em uma população e em um momento. A classificação de Atlanta descreve gravidade a partir de falência orgânica e complicações. Não troque essas funções.',
            'Os laudos deste módulo são fictícios. Confira limite superior de normalidade, unidade, tempo de sintomas, momento da coleta e função renal. Exames laboratoriais apoiam uma decisão clínica; um valor isolado não substitui avaliação de instabilidade ou de outro abdome agudo.'
          ]
        },
        {
          'h': 'Diagnóstico: dois de três critérios',
          'table': {
            'head': [
              'Dado',
              'Interpretação',
              'Implicação'
            ],
            'rows': [
              [
                'Dor compatível',
                'Habitualmente abdominal alta, interpretada no contexto.',
                'Sozinha não encerra o diagnóstico diferencial.'
              ],
              [
                'Lipase ou amilase',
                'Pelo menos três vezes o limite superior de normalidade, nas fontes de Atlanta consultadas.',
                'Use o limite daquele laboratório, sem adotar um valor absoluto universal.'
              ],
              [
                'Imagem compatível',
                'Achado de pancreatite na modalidade apropriada.',
                'Ajuda quando faltam critérios, há dúvida ou necessidade de avaliar complicação.'
              ]
            ]
          },
          'after': 'Lipase é preferida em muitos cenários, mas elevação pode ter outras causas. Uma apresentação tardia ou atípica pode precisar de imagem mesmo sem enzima no corte. Não é necessário exigir os três critérios simultaneamente.'
        },
        {
          'h': 'Laudo resolvido: o limite do laboratório muda a leitura',
          'table': {
            'head': [
              'Dado',
              'Interpretação',
              'Implicação'
            ],
            'rows': [
              [
                'Dor epigástrica compatível',
                'Presente.',
                'Primeiro critério no contexto do caso.'
              ],
              [
                'Lipase 240 U/L; limite superior 60 U/L',
                '240 ÷ 60 = 4 vezes o limite.',
                'Segundo critério; a conta apoia o diagnóstico, não define gravidade.'
              ],
              [
                'Pessoa estável, sem dúvida diagnóstica descrita',
                'TC não foi usada para completar uma obrigação numérica.',
                'Pesquisar causa e acompanhar evolução; imagem se indicada por outro motivo.'
              ]
            ]
          },
          'after': 'Leucocitose ou PCR aumentada não prova infecção de necrose. A NG104 não recomenda antibiótico profilático apenas pela pancreatite.'
        },
        {
          'h': 'Etiologia e tendência: o que os exames acrescentam',
          'table': {
            'head': [
              'Dado',
              'Interpretação',
              'Implicação'
            ],
            'rows': [
              [
                'Perfil hepático e ultrassom',
                'Podem apoiar investigação biliar.',
                'ALT alta não é, sozinha, indicação de CPRE.'
              ],
              [
                'Triglicerídeos e cálcio',
                'Integram investigação de causas conforme história.',
                'Não há um ponto de corte etiológico novo fixado aqui sem a fonte específica.'
              ],
              [
                'BUN, hematócrito e função renal em série',
                'Ajudam a reconhecer evolução e contexto de perfusão.',
                'Não usar um resultado isolado para prescrever volume universal.'
              ],
              [
                'Lipase repetida',
                'A magnitude e a queda não substituem evolução clínica.',
                'Não condicionar toda decisão de alimentação ou alta à normalização.'
              ]
            ]
          }
        },
        {
          'h': 'Ranson não biliar: a lista da admissão',
          'table': {
            'head': [
              'Parâmetro',
              'Corte da versão não biliar consultada',
              'Armadilha'
            ],
            'rows': [
              [
                'Idade',
                'Acima de 55 anos.',
                'Não misturar com versões biliares.'
              ],
              [
                'Leucócitos',
                'Acima de 16.000/mm³.',
                'Inflamação não equivale a infecção.'
              ],
              [
                'Glicose',
                'Acima de 200 mg/dL.',
                'Conferir unidade e momento.'
              ],
              [
                'LDH',
                'Acima de 350 U/L.',
                'Não confundir com a lista de 48 horas.'
              ],
              [
                'AST',
                'Acima de 250 U/L.',
                'É AST nesta lista clássica.'
              ]
            ]
          },
          'after': 'Cada critério presente contribui com um ponto. O escore completo também depende da avaliação em 48 horas: queda de hematócrito, aumento de BUN, cálcio, oxigenação, déficit de base e sequestro de líquido. A revisão de 2019 é a fonte da lista clássica. Cortes específicos da versão biliar continuam a confirmar e não foram misturados.'
        },
        {
          'h': 'BISAP: cinco itens, dentro da primeira avaliação de 24 horas',
          'table': {
            'head': [
              'Item',
              'Leitura',
              'Cuidado'
            ],
            'rows': [
              [
                'BUN acima de 25 mg/dL',
                'Um ponto.',
                'BUN é nitrogênio ureico; não inserir ureia total com o mesmo número.'
              ],
              [
                'Alteração do estado mental',
                'Um ponto.',
                'Não inferir esse item de qualquer queixa inespecífica.'
              ],
              [
                'Resposta inflamatória sistêmica',
                'Um ponto se atende aos critérios do escore.',
                'Febre isolada não substitui toda a definição.'
              ],
              [
                'Idade acima de 60 anos',
                'Um ponto.',
                'O corte difere do Ranson não biliar.'
              ],
              [
                'Derrame pleural',
                'Um ponto.',
                'Não é sinônimo de qualquer complicação local.'
              ]
            ]
          },
          'after': 'O BISAP estima risco; não é uma definição substituta de Atlanta. Evitamos converter uma pontuação em uma probabilidade pessoal exata de morte.'
        },
        {
          'h': 'Atlanta: falência orgânica e complicações',
          'table': {
            'head': [
              'Dado',
              'Interpretação',
              'Implicação'
            ],
            'rows': [
              [
                'Leve',
                'Sem falência orgânica e sem complicações locais ou sistêmicas.',
                'Enzima muito alta não transforma o caso automaticamente em grave.'
              ],
              [
                'Moderadamente grave',
                'Falência orgânica transitória e/ou complicação local ou sistêmica, sem falência persistente.',
                'Uma coleção pode mudar a classificação sem equivaler a infecção.'
              ],
              [
                'Grave',
                'Falência orgânica persistente além de 48 horas.',
                'O nível de cuidado acompanha a clínica; não aguardar 48 horas para tratar quem já está instável.'
              ]
            ]
          },
          'after': 'A avaliação de falência orgânica exige critérios clínicos padronizados. Uma creatinina discretamente alterada ou um escore alto não equivale, por si só, à definição completa.'
        },
        {
          'h': 'Conta de prova: pontue sem extrapolar',
          'p': [
            'Pessoa fictícia de 60 anos tem leucócitos 18.000/mm³, glicose 180 mg/dL, LDH 380 U/L e AST 300 U/L. Na lista não biliar de admissão há quatro pontos: idade, leucócitos, LDH e AST. Glicose não pontua nessa versão. A resposta correta é risco aumentado e necessidade de acompanhamento; não chamar Atlanta grave sem avaliar falência orgânica e duração.'
          ]
        },
        {
          'h': 'Fala para a prova prática',
          'list': [
            'Descrevo os critérios que sustentam ou ainda não sustentam pancreatite.',
            'Digo o limite do laboratório e quantas vezes a enzima o ultrapassa.',
            'Separo hipótese etiológica, escore de risco e classificação de gravidade.',
            'Reviso BUN/ureia, perfusão e função orgânica; digo o que falta acompanhar.',
            'Não peço TC, antibiótico ou CPRE apenas para reagir a uma enzima alta.'
          ]
        }
      ],
      'pitfalls': [
        'Usar lipase para graduar gravidade.',
        'Trocar ureia total por BUN.',
        'Encerrar Ranson completo na admissão.',
        'Misturar cortes biliares e não biliares.'
      ],
      'refs': [
        'cir_panc',
        'cir_atlanta',
        'cir_acg',
        'cir_nicepanc'
      ],
      'quiz': [
        {
          'id': 'clp_q1',
          'q': 'Dor compatível e lipase 240 U/L com limite superior de 60 U/L. Qual interpretação é sustentada?',
          'o': [
            'Há dois critérios possíveis e a enzima está quatro vezes o limite',
            'A lipase está duas vezes o limite',
            'O caso é necessariamente Atlanta grave',
            'TC é obrigatória para obter os três critérios'
          ],
          'a': 0,
          'explanations': [
            'A divisão é 240/60 = 4; dor e enzima podem estabelecer o diagnóstico no contexto.',
            'Há erro na divisão.',
            'Enzima não define falência orgânica persistente.',
            'O diagnóstico exige dois de três, sem obrigatoriedade de todos.'
          ],
          'why': 'Há dois critérios possíveis e a enzima está quatro vezes o limite: A divisão é 240/60 = 4; dor e enzima podem estabelecer o diagnóstico no contexto. A lipase está duas vezes o limite: Há erro na divisão. O caso é necessariamente Atlanta grave: Enzima não define falência orgânica persistente. TC é obrigatória para obter os três critérios: O diagnóstico exige dois de três, sem obrigatoriedade de todos.',
          'refs': [
            'cir_atlanta'
          ]
        },
        {
          'id': 'clp_q2',
          'q': 'Qual parâmetro integra a lista clássica não biliar de Ranson na admissão?',
          'o': [
            'Queda do hematócrito em 48 horas',
            'Cálcio baixo em 48 horas',
            'AST acima de 250 U/L',
            'Sequestro de líquido em 48 horas'
          ],
          'a': 2,
          'explanations': [
            'É avaliado na segunda parte.',
            'Pertence à avaliação posterior.',
            'É um dos cinco itens de admissão na versão consultada.',
            'Não é um item que se encerra na admissão.'
          ],
          'why': 'Queda do hematócrito em 48 horas: É avaliado na segunda parte. Cálcio baixo em 48 horas: Pertence à avaliação posterior. AST acima de 250 U/L: É um dos cinco itens de admissão na versão consultada. Sequestro de líquido em 48 horas: Não é um item que se encerra na admissão.',
          'refs': [
            'cir_panc'
          ]
        },
        {
          'id': 'clp_q3',
          'q': 'O laboratório informa ureia de 30 mg/dL; a questão usa BUN acima de 25 mg/dL. Qual atitude é correta?',
          'o': [
            'Pontuar diretamente porque 30 é maior que 25',
            'Confirmar o analito ou usar conversão validada antes de pontuar',
            'Chamar ambos de creatinina',
            'Ignorar a unidade em todos os escores'
          ],
          'a': 1,
          'explanations': [
            'Ureia total e nitrogênio ureico não têm o mesmo valor numérico.',
            'O escore exige BUN na unidade especificada.',
            'São analitos diferentes.',
            'Unidade e método de expressão fazem parte da interpretação.'
          ],
          'why': 'Pontuar diretamente porque 30 é maior que 25: Ureia total e nitrogênio ureico não têm o mesmo valor numérico. Confirmar o analito ou usar conversão validada antes de pontuar: O escore exige BUN na unidade especificada. Chamar ambos de creatinina: São analitos diferentes. Ignorar a unidade em todos os escores: Unidade e método de expressão fazem parte da interpretação.',
          'refs': [
            'cir_panc'
          ]
        },
        {
          'id': 'clp_q4',
          'q': 'Qual dado define pancreatite grave na classificação de Atlanta?',
          'o': [
            'Lipase dez vezes o limite',
            'Ranson de admissão alto isoladamente',
            'Leucocitose isolada',
            'Falência orgânica persistente além de 48 horas'
          ],
          'a': 3,
          'explanations': [
            'A magnitude não mede gravidade.',
            'O escore estima risco; não substitui a classificação.',
            'Inflamação isolada não é essa definição.',
            'É o critério de falência persistente nas fontes de Atlanta.'
          ],
          'why': 'Lipase dez vezes o limite: A magnitude não mede gravidade. Ranson de admissão alto isoladamente: O escore estima risco; não substitui a classificação. Leucocitose isolada: Inflamação isolada não é essa definição. Falência orgânica persistente além de 48 horas: É o critério de falência persistente nas fontes de Atlanta.',
          'refs': [
            'cir_atlanta'
          ]
        },
        {
          'id': 'clp_q5',
          'q': 'No exemplo: 60 anos, leucócitos 18.000, glicose 180, LDH 380, AST 300. Ranson não biliar da admissão soma:',
          'o': [
            'Dois',
            'Quatro',
            'Cinco, porque toda glicose elevada pontua',
            'Zero porque falta TC'
          ],
          'a': 1,
          'explanations': [
            'Idade, leucócitos, LDH e AST atendem aos cortes.',
            'São quatro; a glicose não ultrapassa 200 mg/dL.',
            'O corte específico precisa ser atendido.',
            'TC não compõe essa lista de admissão.'
          ],
          'why': 'Dois: Idade, leucócitos, LDH e AST atendem aos cortes. Quatro: São quatro; a glicose não ultrapassa 200 mg/dL. Cinco, porque toda glicose elevada pontua: O corte específico precisa ser atendido. Zero porque falta TC: TC não compõe essa lista de admissão.',
          'refs': [
            'cir_panc'
          ]
        },
        {
          'id': 'clp_q6',
          'q': 'Leucocitose e lipase alta em pancreatite, sem infecção demonstrada, justificam:',
          'o': [
            'Antibiótico profilático obrigatório',
            'CPRE obrigatória',
            'Avaliação clínica e etiológica, sem tratar os números como infecção',
            'Alta porque o diagnóstico já foi fechado'
          ],
          'a': 2,
          'explanations': [
            'NG104 não recomenda essa aplicação automática.',
            'Indicação depende de colangite, obstrução e contexto, não da enzima isolada.',
            'Os exames não definem por si só infecção nem a necessidade de intervenção.',
            'Diagnóstico não substitui avaliação de gravidade e evolução.'
          ],
          'why': 'Antibiótico profilático obrigatório: NG104 não recomenda essa aplicação automática. CPRE obrigatória: Indicação depende de colangite, obstrução e contexto, não da enzima isolada. Avaliação clínica e etiológica, sem tratar os números como infecção: Os exames não definem por si só infecção nem a necessidade de intervenção. Alta porque o diagnóstico já foi fechado: Diagnóstico não substitui avaliação de gravidade e evolução.',
          'refs': [
            'cir_nicepanc',
            'cir_asge'
          ]
        }
      ]
    },
    {
      'id': 'cir_lab_biliar',
      'layer': 'Cirurgia · abdome agudo e vias biliares',
      'title': 'Icterícia e perfil hepático: do padrão à decisão sobre a via biliar',
      'summary': 'Compare ALT e fosfatase alcalina pelos limites do laudo e combine bilirrubina, sintomas e imagem.',
      'goals': [
        'Separar lesão, colestase e função de síntese.',
        'Calcular R sem usar números brutos de enzimas.',
        'Distinguir risco de cálculo de diagnóstico de colangite.'
      ],
      'pretest': [
        'ALT e AST medem diretamente função de síntese?',
        'Bilirrubina acima de 4 mg/dL sozinha é o critério composto de alto risco da ASGE?',
        'Ausência da tríade completa exclui colangite?'
      ],
      'relatedTopics': [
        {
          'id': 'ciraa',
          'chapter': 2
        },
        {
          'id': 'cirvb',
          'chapter': 1
        }
      ],
      'exam': [
        {
          'pattern': 'Bilirrubina elevada, FA e GGT aumentadas.',
          'trap': 'Tratar o padrão como confirmação etiológica de cálculo.',
          'expected': 'Descrever colestase e integrar imagem, história e diagnósticos diferenciais.'
        },
        {
          'pattern': 'Bilirrubina acima de 4 mg/dL com dilatação do colédoco.',
          'trap': 'Esquecer que esse critério da ASGE é composto.',
          'expected': 'A associação é um critério de alto risco; bilirrubina isolada não é equivalente.'
        },
        {
          'pattern': 'Febre, inflamação, colestase e obstrução na imagem.',
          'trap': 'Aguardar todas as manifestações clássicas antes de suspeitar.',
          'expected': 'Integrar os três grupos TG18 e avaliar gravidade e controle do foco.'
        },
        {
          'pattern': 'Enzimas elevadas em proporções diferentes.',
          'trap': 'Comparar apenas os valores absolutos em U/L.',
          'expected': 'Normalizar ALT e FA pelos respectivos limites e calcular R, sem fechar a causa por esse índice.'
        }
      ],
      'sections': [
        {
          'h': 'O hepatograma contém perguntas diferentes',
          'table': {
            'head': [
              'Dado',
              'Interpretação',
              'Implicação'
            ],
            'rows': [
              [
                'ALT e AST',
                'Apoiam reconhecimento de lesão celular.',
                'Magnitude não equivale diretamente a função de síntese ou etiologia.'
              ],
              [
                'Fosfatase alcalina e GGT',
                'Ajudam a caracterizar colestase e a origem da elevação.',
                'FA também tem fontes não hepáticas; GGT não identifica sozinha uma causa.'
              ],
              [
                'Bilirrubina e frações',
                'Informam produção, processamento e excreção no contexto.',
                'Predomínio conjugado não demonstra sozinho o local ou a causa da obstrução.'
              ],
              [
                'Albumina e TP/INR',
                'Ajudam a avaliar síntese e contexto sistêmico.',
                'Albumina varia com nutrição e inflamação; INR também sofre outras influências.'
              ]
            ]
          }
        },
        {
          'h': 'Use o limite do laboratório, não o tamanho bruto da enzima',
          'p': [
            'Para comparar padrão, a orientação AASLD em lesão hepática por fármacos descreve R = (ALT/limite superior de ALT) ÷ (FA/limite superior de FA). No texto consultado, R acima de 5 favorece padrão hepatocelular, abaixo de 2 padrão colestático e entre 2 e 5 padrão misto. Esses padrões não confirmam lesão por fármaco nem obstrução por cálculo; usamos a conta como exercício de normalização, com o escopo da fonte declarado.'
          ]
        },
        {
          'h': 'Laudo resolvido: duas enzimas altas, padrão colestático',
          'table': {
            'head': [
              'Exame fictício',
              'Conta',
              'Leitura'
            ],
            'rows': [
              [
                'ALT 240 U/L; limite 40',
                '240/40 = 6.',
                'Seis vezes o limite de ALT.'
              ],
              [
                'FA 600 U/L; limite 120',
                '600/120 = 5.',
                'Cinco vezes o limite de FA.'
              ],
              [
                'Razão R',
                '6/5 = 1,2.',
                'Favorece padrão colestático nessa convenção, sem definir a causa.'
              ],
              [
                'Bilirrubina e imagem',
                'Precisam ser integradas à história.',
                'O padrão bioquímico não demonstra sozinho cálculo no colédoco.'
              ]
            ]
          }
        },
        {
          'h': 'ASGE: leia o OU e o E do alto risco',
          'table': {
            'head': [
              'Critério de alto risco da diretriz de 2019',
              'Lógica',
              'Implicação'
            ],
            'rows': [
              [
                'Cálculo no colédoco em ultrassom ou outra imagem',
                'Um critério independente.',
                'Pode indicar abordagem terapêutica conforme contexto.'
              ],
              [
                'Colangite ascendente',
                'Um critério independente.',
                'A prioridade também depende de gravidade e necessidade de drenagem.'
              ],
              [
                'Bilirrubina total acima de 4 mg/dL e colédoco dilatado',
                'Os dois achados precisam estar associados nesse critério.',
                'Bilirrubina isolada não reproduz o mesmo critério.'
              ]
            ]
          },
          'after': 'A definição consultada considera dilatação acima de 6 mm no adulto com vesícula in situ. Não aplicamos esse corte automaticamente a toda idade, contexto pós-operatório ou método. Outros achados, como exames hepáticos alterados, podem compor risco intermediário, em que colangiorressonância, ecoendoscopia ou avaliação intraoperatória podem esclarecer.'
        },
        {
          'h': 'Colangite: organize os grupos diagnósticos TG18',
          'table': {
            'head': [
              'Dado',
              'Interpretação',
              'Implicação'
            ],
            'rows': [
              [
                'A: inflamação sistêmica',
                'Febre/calafrios ou evidência laboratorial de resposta inflamatória.',
                'O grupo não se reduz a um único número isolado.'
              ],
              [
                'B: colestase',
                'Icterícia ou exames hepáticos alterados.',
                'Não é sinônimo de infecção em toda pessoa.'
              ],
              [
                'C: imagem',
                'Dilatação ou evidência de causa, como cálculo, estenose ou prótese.',
                'Pode identificar mecanismo e necessidade de controle do foco.'
              ]
            ]
          },
          'after': 'Na tabela TG18 da fonte secundária de 2022, suspeita: um item de A mais um de B ou C; diagnóstico definido: um de cada grupo A, B e C. Isso não elimina avaliação diferencial nem determina sozinho o grau de gravidade. A tríade de Charcot incompleta não exclui a hipótese.'
        },
        {
          'h': 'Cálculo, colangite, hepatite e obstrução neoplásica',
          'table': {
            'head': [
              'Dado',
              'Interpretação',
              'Implicação'
            ],
            'rows': [
              [
                'Cólica biliar ou colecistite',
                'Podem existir sem o mesmo padrão de obstrução do colédoco.',
                'Integrar dor, inflamação e ultrassom.'
              ],
              [
                'Coledocolitíase',
                'Obstrução pode ser intermitente; o laudo muda com o tempo.',
                'Estratificar com exames e imagem, evitando CPRE diagnóstica automática.'
              ],
              [
                'Colangite',
                'Combina contexto infeccioso e comprometimento da via biliar.',
                'Avaliar gravidade e necessidade de suporte, antimicrobiano e drenagem.'
              ],
              [
                'Lesão hepatocelular ou outra colestase',
                'Fármacos, causas clínicas e neoplasias entram no diferencial.',
                'O padrão laboratorial não substitui a investigação.'
              ]
            ]
          },
          'after': 'Este bloco não escolhe um antimicrobiano pelo hepatograma. A escolha e a posologia devem considerar síndrome, gravidade, culturas, rim e a ficha contextualizada já existente no curso de Antimicrobianos e no Manual de prescrição.'
        },
        {
          'h': 'Síntese não é o mesmo que lesão',
          'p': [
            'ALT muito elevada descreve lesão, não uma medida direta do quanto o fígado sintetiza. Albumina baixa pode refletir doença crônica, inflamação, perdas ou baixa oferta. TP/INR alterado também pode refletir medicamentos, colestase e outros mecanismos. Não rotular falência hepática apenas pela transaminase nem transformar INR isolado em uma indicação universal de plasma.'
          ]
        },
        {
          'h': 'A pergunta de prova que muda com um único dado',
          'p': [
            'Caso fictício: bilirrubina total de 5,2 mg/dL e colédoco de 8 mm, em adulto com vesícula in situ, satisfazem o critério composto de alto risco descrito na ASGE. Se o colédoco fosse de 4 mm e não houvesse cálculo visto nem colangite, a bilirrubina isolada não satisfaria aquele critério composto. A investigação seguiria o conjunto do risco e a avaliação clínica, sem concluir que não há doença apenas por esse detalhe.'
          ]
        },
        {
          'h': 'Fala para a prova prática',
          'list': [
            'Descrevo quais grupos de exames estão alterados e leio unidades e limites.',
            'Se calculo R, declaro a fórmula, o escopo e o resultado, sem fechar a etiologia.',
            'Digo se os dados sustentam suspeita de obstrução, alto risco de cálculo ou colangite.',
            'Explico qual exame de imagem ou intervenção responde à dúvida e por que a urgência muda com a clínica.'
          ]
        }
      ],
      'pitfalls': [
        'Usar transaminase como função de síntese.',
        'Chamar bilirrubina isolada de alto risco pelo critério composto.',
        'Excluir colangite pela tríade incompleta.',
        'Transformar padrão colestático em causa confirmada.'
      ],
      'refs': [
        'cir_asge',
        'cir_tg',
        'cir_liver',
        'cir_ffp'
      ],
      'quiz': [
        {
          'id': 'clb_q1',
          'q': 'ALT 240 com limite 40 e FA 600 com limite 120. A razão R é:',
          'o': [
            '1,2',
            '40',
            '6, porque se ignora FA',
            '0,4 pela divisão dos valores brutos'
          ],
          'a': 0,
          'explanations': [
            '(240/40)/(600/120) = 6/5 = 1,2.',
            'Os limites precisam entrar na normalização.',
            'R compara as duas elevações relativas.',
            'Dividir valores brutos não produz a razão normalizada.'
          ],
          'why': '1,2: (240/40)/(600/120) = 6/5 = 1,2. 40: Os limites precisam entrar na normalização. 6, porque se ignora FA: R compara as duas elevações relativas. 0,4 pela divisão dos valores brutos: Dividir valores brutos não produz a razão normalizada.',
          'refs': [
            'cir_liver'
          ]
        },
        {
          'id': 'clb_q2',
          'q': 'Qual par preenche o critério composto de alto risco da ASGE no adulto com vesícula in situ?',
          'o': [
            'Bilirrubina 5,2 mg/dL e colédoco 8 mm',
            'Bilirrubina 5,2 e colédoco 4 mm, sem outros critérios',
            'ALT isolada elevada',
            'GGT isolada elevada'
          ],
          'a': 0,
          'explanations': [
            'Há bilirrubina acima de 4 e dilatação no contexto especificado.',
            'Não satisfaz o mesmo critério composto.',
            'Alteração hepática isolada não equivale a esse critério de alto risco.',
            'Não demonstra sozinha cálculo nem cumpre o critério composto.'
          ],
          'why': 'Bilirrubina 5,2 mg/dL e colédoco 8 mm: Há bilirrubina acima de 4 e dilatação no contexto especificado. Bilirrubina 5,2 e colédoco 4 mm, sem outros critérios: Não satisfaz o mesmo critério composto. ALT isolada elevada: Alteração hepática isolada não equivale a esse critério de alto risco. GGT isolada elevada: Não demonstra sozinha cálculo nem cumpre o critério composto.',
          'refs': [
            'cir_asge'
          ]
        },
        {
          'id': 'clb_q3',
          'q': 'Pela tabela TG18 consultada, suspeita de colangite pode ser sustentada por:',
          'o': [
            'Apenas bilirrubina alta sem qualquer outro contexto',
            'Um item de inflamação mais um de colestase ou de imagem',
            'Apenas dor inespecífica',
            'Um INR alterado como único achado'
          ],
          'a': 1,
          'explanations': [
            'Colestase isolada não é o conjunto diagnóstico.',
            'Corresponde à estrutura A + B ou C da tabela.',
            'Dor isolada não preenche esses grupos.',
            'Não substitui o conjunto clínico e de imagem.'
          ],
          'why': 'Apenas bilirrubina alta sem qualquer outro contexto: Colestase isolada não é o conjunto diagnóstico. Um item de inflamação mais um de colestase ou de imagem: Corresponde à estrutura A + B ou C da tabela. Apenas dor inespecífica: Dor isolada não preenche esses grupos. Um INR alterado como único achado: Não substitui o conjunto clínico e de imagem.',
          'refs': [
            'cir_tg'
          ]
        },
        {
          'id': 'clb_q4',
          'q': 'Qual afirmação evita confusão de função e lesão?',
          'o': [
            'ALT mede diretamente toda a síntese hepática',
            'Albumina baixa prova exclusivamente insuficiência hepática',
            'Enzimas, albumina e INR respondem a perguntas diferentes',
            'INR isolado determina plasma em toda pessoa'
          ],
          'a': 2,
          'explanations': [
            'ALT é principalmente um marcador de lesão no contexto.',
            'Há outros determinantes, incluindo inflamação e perdas.',
            'É preciso integrar marcadores e suas limitações.',
            'Transfusão depende do contexto e do risco ou presença de sangramento.'
          ],
          'why': 'ALT mede diretamente toda a síntese hepática: ALT é principalmente um marcador de lesão no contexto. Albumina baixa prova exclusivamente insuficiência hepática: Há outros determinantes, incluindo inflamação e perdas. Enzimas, albumina e INR respondem a perguntas diferentes: É preciso integrar marcadores e suas limitações. INR isolado determina plasma em toda pessoa: Transfusão depende do contexto e do risco ou presença de sangramento.',
          'refs': [
            'cir_liver',
            'cir_ffp'
          ]
        },
        {
          'id': 'clb_q5',
          'q': 'Uma pessoa não apresenta toda a tríade de Charcot. Isso permite:',
          'o': [
            'Excluir colangite em qualquer situação',
            'Ignorar imagem e inflamação',
            'Confirmar cálculo por exclusão',
            'Continuar avaliando grupos TG18 e gravidade conforme o caso'
          ],
          'a': 3,
          'explanations': [
            'A tríade incompleta não afasta a hipótese.',
            'O conjunto de dados é necessário.',
            'Ausência da tríade não estabelece outra causa.',
            'A organização diagnóstica é mais ampla que a tríade clássica.'
          ],
          'why': 'Excluir colangite em qualquer situação: A tríade incompleta não afasta a hipótese. Ignorar imagem e inflamação: O conjunto de dados é necessário. Confirmar cálculo por exclusão: Ausência da tríade não estabelece outra causa. Continuar avaliando grupos TG18 e gravidade conforme o caso: A organização diagnóstica é mais ampla que a tríade clássica.',
          'refs': [
            'cir_tg'
          ]
        },
        {
          'id': 'clb_q6',
          'q': 'A razão R abaixo de 2 no contexto explicado demonstra:',
          'o': [
            'Obstrução por cálculo confirmada',
            'Padrão colestático, sem fechar a causa',
            'Câncer confirmado',
            'Indicação automática de CPRE'
          ],
          'a': 1,
          'explanations': [
            'O índice não identifica a etiologia.',
            'A classificação bioquímica ajuda a organizar a investigação.',
            'Não é um teste confirmatório de câncer.',
            'Intervenção depende de critérios clínicos, imagem e contexto.'
          ],
          'why': 'Obstrução por cálculo confirmada: O índice não identifica a etiologia. Padrão colestático, sem fechar a causa: A classificação bioquímica ajuda a organizar a investigação. Câncer confirmado: Não é um teste confirmatório de câncer. Indicação automática de CPRE: Intervenção depende de critérios clínicos, imagem e contexto.',
          'refs': [
            'cir_liver',
            'cir_asge'
          ]
        }
      ]
    },
    {
      'id': 'cir_lab_coagulacao',
      'layer': 'Cirurgia · trauma e pré-operatório',
      'title': 'Coagulação e hemorragia: interpretar antes de transfundir',
      'summary': 'Treine TP/INR, TTPa, plaquetas, fibrinogênio e hemoglobina no trauma e no preparo cirúrgico.',
      'goals': [
        'Reconhecer o que um exame normal ou alterado não permite concluir.',
        'Separar hemorragia maior de anemia estável e preparo eletivo.',
        'Usar os contextos e unidades de referências transfusionais e do TXA.'
      ],
      'pretest': [
        'Hemoglobina inicial dentro do intervalo exclui hemorragia aguda?',
        'Todos precisam de coagulograma antes de qualquer cirurgia?',
        'Fibrinogênio de 1,2 g/L equivale a 1,2 mg/dL?'
      ],
      'relatedTopics': [
        {
          'id': 'cirtabd',
          'chapter': 3
        },
        {
          'id': 'cirremit',
          'chapter': 0
        }
      ],
      'exam': [
        {
          'pattern': 'Trauma recente com choque e hemoglobina inicial pouco alterada.',
          'trap': 'Esperar a hemoglobina cair abaixo de 7 g/dL para reconhecer gravidade.',
          'expected': 'Hemorragia maior depende da clínica e da evolução; o limiar restritivo não é uma trava para ressuscitação.'
        },
        {
          'pattern': 'Pessoa assintomática em cirurgia eletiva com teste isolado alterado.',
          'trap': 'Corrigir o número com plasma de forma automática.',
          'expected': 'Rever história, medicamentos, qualidade da amostra, procedimento e contexto de sangramento.'
        },
        {
          'pattern': 'Sangramento maior com fibrinogênio baixo.',
          'trap': 'Confundir g/L com mg/dL ou usar plaquetas como substituto do substrato.',
          'expected': 'Integrar função e concentração do fibrinogênio, protocolo e fonte específica.'
        },
        {
          'pattern': 'Questão de TXA no trauma hemorrágico.',
          'trap': 'Transportar a dose e janela para qualquer sangramento.',
          'expected': 'Reconhecer a indicação contextual, o início precoce e o esquema da diretriz de trauma.'
        }
      ],
      'sections': [
        {
          'h': 'Antes do coagulograma: história e amostra',
          'p': [
            'Pergunte sobre sangramento prévio, procedimentos, história familiar, medicamentos e doença renal ou hepática. Confira identificação, preenchimento do tubo, coleta por acesso e comentários do laboratório. Um resultado inesperado pode precisar de confirmação, sem atrasar suporte em sangramento grave.',
            'TP/INR e TTPa avaliam aspectos do sistema de coagulação em condições de laboratório. Plaquetas e fibrinogênio acrescentam outras dimensões; nenhum resultado isolado descreve toda a hemostasia.'
          ]
        },
        {
          'h': 'Cada exame responde a uma parte da pergunta',
          'table': {
            'head': [
              'Dado',
              'Interpretação',
              'Implicação'
            ],
            'rows': [
              [
                'TP/INR',
                'Pode se alterar em diferentes deficiências, exposições e doença sistêmica.',
                'Não escolhe sozinho reversão ou transfusão.'
              ],
              [
                'TTPa',
                'Pode refletir fatores, inibidores e interferência de anticoagulantes ou coleta.',
                'Investigar alteração inesperada no contexto.'
              ],
              [
                'Plaquetas',
                'Quantidade é uma parte da avaliação.',
                'Contagem não mede integralmente função plaquetária.'
              ],
              [
                'Fibrinogênio',
                'Substrato da formação do coágulo; consumo e diluição podem ser relevantes.',
                'Ler método, unidade, tendência e contexto hemorrágico.'
              ],
              [
                'Hemoglobina, lactato e gasometria',
                'Ajudam a acompanhar hemorragia e perfusão em conjunto.',
                'Não usar um primeiro resultado aparentemente bom para encerrar avaliação.'
              ]
            ]
          }
        },
        {
          'h': 'Hemorragia maior: a hemoglobina pode atrasar a história',
          'p': [
            'Na perda sanguínea aguda, a concentração de hemoglobina inicialmente pode não representar a magnitude de toda a perda. A diretriz europeia recomenda avaliação e medidas seriadas integradas ao contexto. Instabilidade, perfusão, mecanismo, sangramento visível ou oculto e necessidade de controle do foco não aguardam uma queda numérica predeterminada.'
          ]
        },
        {
          'h': 'Quando o limiar restritivo é uma referência, não uma regra de choque',
          'table': {
            'head': [
              'Cenário da NG24',
              'Referência',
              'Limite de aplicação'
            ],
            'rows': [
              [
                'Grupos selecionados sem hemorragia maior, sem síndrome coronariana aguda e sem transfusões regulares por anemia crônica',
                'Considerar limiar de 70 g/L, equivalente a 7 g/dL, e alvo de 70 a 90 g/L após transfusão.',
                'Não aplicar como gatilho universal no choque hemorrágico.'
              ],
              [
                'Adulto sem sangramento ativo',
                'Considerar uma unidade de concentrado de hemácias e reavaliar clinicamente e com hemoglobina.',
                'Quantidade não é uma fórmula automática para toda pessoa ou baixo peso.'
              ]
            ]
          },
          'after': 'A fonte também diferencia outras populações. Neste bloco não criamos uma ordem transfusional para síndrome coronariana ou para hemorragia maciça a partir do esquema restritivo.'
        },
        {
          'h': 'Plaquetas e plasma no procedimento: contexto e risco importam',
          'table': {
            'head': [
              'Dado',
              'Interpretação',
              'Implicação'
            ],
            'rows': [
              [
                'Procedimentos invasivos ou cirurgia',
                'A NG24 orienta considerar elevar plaquetas acima de 50 × 10⁹/L, equivalentes a 50.000/µL.',
                'Há limiares superiores em procedimentos de maior risco e sítios críticos; não é autorização universal para operar.'
              ],
              [
                'Plasma',
                'Não é indicado apenas para normalizar todo teste alterado em pessoa sem sangramento.',
                'A NG24 considera contexto hemorrágico ou procedimento com risco de sangramento relevante.'
              ],
              [
                'Cirurgia eletiva e hemostasia',
                'A NG45 não recomenda o teste como rotina universal.',
                'Escolha depende de procedimento, história, comorbidades e medicamentos.'
              ]
            ]
          },
          'after': 'Testes de rotina não quantificam adequadamente o efeito de todos os anticoagulantes orais diretos. Não adotar um INR normal como garantia universal de ausência de efeito; o plano é específico do fármaco, rim e procedimento.'
        },
        {
          'h': 'Fibrinogênio no trauma hemorrágico: unidade, indicação e dose',
          'p': [
            'Na diretriz europeia de 2023, em sangramento maior acompanhado de déficit funcional por avaliação viscoelástica ou fibrinogênio de Clauss de até 1,5 g/L, recomenda-se avaliar reposição com concentrado de fibrinogênio ou crioprecipitado. A fonte sugere suplementação inicial de 3 a 4 g de fibrinogênio, com novas doses guiadas por laboratório e avaliação viscoelástica.'
          ],
          'table': {
            'head': [
              'Dado',
              'Interpretação',
              'Implicação'
            ],
            'rows': [
              [
                'Fibrinogênio fictício de 1,2 g/L',
                'Equivale a 120 mg/dL.',
                'Está abaixo de 1,5 g/L nesse cenário de trauma com sangramento maior.'
              ],
              [
                'Concentrado de fibrinogênio',
                'Referência inicial de 3 a 4 g IV no contexto descrito.',
                'Preparo e velocidade dependem da apresentação; seguir a bula e o protocolo, sem inventar diluição universal.'
              ],
              [
                'Reavaliação',
                'Fibrinogênio, hemostasia e evolução do sangramento.',
                'A dose não substitui controle do foco nem a abordagem dos demais componentes da coagulopatia.'
              ]
            ]
          },
          'after': 'A equivalência em unidades de crioprecipitado depende da preparação e da oferta local; não transferimos uma contagem de bolsas como se fosse universal. O valor baixo isolado em pessoa sem hemorragia não recebe automaticamente o mesmo esquema.'
        },
        {
          'h': 'TXA: posologia da indicação de trauma, já presente no Manual',
          'p': [
            'Para adulto com trauma e sangramento ou risco de sangramento significativo, a recomendação 23 da diretriz europeia de 2023 descreve ácido tranexâmico o mais cedo possível e dentro de 3 horas da lesão: 1 g IV em 10 minutos, seguido de 1 g IV em 8 horas. Quando indicado, a fonte orienta não aguardar o exame viscoelástico para iniciar.'
          ],
          'after': 'Usar a apresentação e o preparo conferidos, registrar horário do trauma, início e duração. Não transformar esse esquema em dose para toda hemorragia; outras indicações, contraindicações e função renal exigem avaliação própria. A ficha contextualizada permanece no Manual de prescrição.'
        },
        {
          'h': 'Laudo resolvido: o número não interrompe a avaliação do choque',
          'p': [
            'Pessoa fictícia chega após trauma com sinais de hipoperfusão e suspeita de sangramento interno. Hemoglobina inicial de 12,4 g/dL não exclui perda importante. Fibrinogênio de 1,2 g/L e alteração progressiva de coagulação reforçam a necessidade de avaliação do conjunto, controle do foco e estratégia protocolada. Não aguardar a hemoglobina ficar abaixo de 7 para reconhecer a urgência.'
          ]
        },
        {
          'h': 'Fala para a prova prática',
          'list': [
            'Digo se o cenário é hemorragia maior, anemia estável ou preparo eletivo.',
            'Leio unidade e tendência de hemoglobina, plaquetas, TP/INR, TTPa e fibrinogênio.',
            'Integro perfusão, temperatura, cálcio e necessidade de controlar o foco.',
            'Justifico por que um limiar de um cenário não serve automaticamente para outro.',
            'Se cito TXA, declaro indicação, dose, tempo e janela; se cito fibrinogênio, declaro contexto, fonte e monitorização.'
          ]
        }
      ],
      'pitfalls': [
        'Aguardar hemoglobina cair no choque.',
        'Aplicar limiar de anemia estável em hemorragia maior.',
        'Tratar INR isolado como prescrição de plasma.',
        'Confundir g/L com mg/dL.'
      ],
      'refs': [
        'cir_trauma',
        'cir_rbc',
        'cir_plt',
        'cir_ffp',
        'cir_preop'
      ],
      'quiz': [
        {
          'id': 'clc_q1',
          'q': 'Trauma com hipoperfusão e Hb inicial de 12,4 g/dL. Qual leitura é adequada?',
          'o': [
            'A Hb exclui perda importante',
            'A clínica e as medidas seriadas continuam essenciais',
            'É obrigatório esperar Hb abaixo de 7',
            'Não há necessidade de investigar sangramento oculto'
          ],
          'a': 1,
          'explanations': [
            'A concentração inicial pode não refletir a magnitude da perda.',
            'O contexto e a evolução orientam avaliação e suporte.',
            'O limiar restritivo não é uma trava para hemorragia maior.',
            'Mecanismo e sinais de hipoperfusão podem exigir essa investigação.'
          ],
          'why': 'A Hb exclui perda importante: A concentração inicial pode não refletir a magnitude da perda. A clínica e as medidas seriadas continuam essenciais: O contexto e a evolução orientam avaliação e suporte. É obrigatório esperar Hb abaixo de 7: O limiar restritivo não é uma trava para hemorragia maior. Não há necessidade de investigar sangramento oculto: Mecanismo e sinais de hipoperfusão podem exigir essa investigação.',
          'refs': [
            'cir_trauma',
            'cir_rbc'
          ]
        },
        {
          'id': 'clc_q2',
          'q': '70 g/L de hemoglobina correspondem a:',
          'o': [
            '70 g/dL',
            '0,7 g/dL',
            '7 g/dL',
            '700 g/dL'
          ],
          'a': 2,
          'explanations': [
            'A conversão não mantém o mesmo número.',
            'Há erro por fator dez.',
            'Um decilitro é um décimo de litro, então a concentração por dL é dez vezes menor.',
            'Há inversão da conversão.'
          ],
          'why': '70 g/dL: A conversão não mantém o mesmo número. 0,7 g/dL: Há erro por fator dez. 7 g/dL: Um decilitro é um décimo de litro, então a concentração por dL é dez vezes menor. 700 g/dL: Há inversão da conversão.',
          'refs': [
            'cir_rbc'
          ]
        },
        {
          'id': 'clc_q3',
          'q': 'Fibrinogênio de 1,2 g/L equivale a:',
          'o': [
            '120 mg/dL',
            '1,2 mg/dL',
            '12.000 mg/dL',
            '0,12 mg/dL'
          ],
          'a': 0,
          'explanations': [
            '1 g/L equivale a 100 mg/dL; portanto 1,2 equivale a 120.',
            'Foram tratadas unidades diferentes como iguais.',
            'Há erro de conversão de massa e volume.',
            'Há erro por múltiplas casas decimais.'
          ],
          'why': '120 mg/dL: 1 g/L equivale a 100 mg/dL; portanto 1,2 equivale a 120. 1,2 mg/dL: Foram tratadas unidades diferentes como iguais. 12.000 mg/dL: Há erro de conversão de massa e volume. 0,12 mg/dL: Há erro por múltiplas casas decimais.',
          'refs': [
            'cir_trauma'
          ]
        },
        {
          'id': 'clc_q4',
          'q': 'A diretriz de trauma de 2023 descreve TXA, quando indicado, como:',
          'o': [
            '1 g IV em 10 min, depois 1 g em 8 h, com início precoce e dentro de 3 h',
            'Qualquer dose em qualquer hemorragia',
            'Só depois do resultado viscoelástico',
            'Um substituto do controle do foco'
          ],
          'a': 0,
          'explanations': [
            'Corresponde à recomendação 23 no cenário especificado.',
            'Dose e janela são dependentes da indicação.',
            'A fonte orienta não aguardar esse exame quando há indicação.',
            'A medida farmacológica não elimina a necessidade de hemostasia definitiva.'
          ],
          'why': '1 g IV em 10 min, depois 1 g em 8 h, com início precoce e dentro de 3 h: Corresponde à recomendação 23 no cenário especificado. Qualquer dose em qualquer hemorragia: Dose e janela são dependentes da indicação. Só depois do resultado viscoelástico: A fonte orienta não aguardar esse exame quando há indicação. Um substituto do controle do foco: A medida farmacológica não elimina a necessidade de hemostasia definitiva.',
          'refs': [
            'cir_trauma'
          ]
        },
        {
          'id': 'clc_q5',
          'q': 'Pessoa sem sangramento e com teste de coagulação inesperadamente alterado antes de cirurgia eletiva. O próximo raciocínio é:',
          'o': [
            'Plasma automático até normalizar tudo',
            'Ignorar o resultado e a história',
            'Interpretar coleta, história, medicamentos e risco do procedimento',
            'Aplicar o protocolo de hemorragia maciça'
          ],
          'a': 2,
          'explanations': [
            'A NG24 não apoia corrigir todo número isolado desse modo.',
            'A alteração pode exigir esclarecimento proporcional ao contexto.',
            'A decisão depende do conjunto, com orientação da NG45 e NG24.',
            'O cenário não foi descrito como hemorragia maior.'
          ],
          'why': 'Plasma automático até normalizar tudo: A NG24 não apoia corrigir todo número isolado desse modo. Ignorar o resultado e a história: A alteração pode exigir esclarecimento proporcional ao contexto. Interpretar coleta, história, medicamentos e risco do procedimento: A decisão depende do conjunto, com orientação da NG45 e NG24. Aplicar o protocolo de hemorragia maciça: O cenário não foi descrito como hemorragia maior.',
          'refs': [
            'cir_preop',
            'cir_ffp'
          ]
        },
        {
          'id': 'clc_q6',
          'q': 'Qual afirmação respeita o contexto do fibrinogênio?',
          'o': [
            '1,2 g/L em qualquer pessoa obriga a mesma dose',
            'No trauma com sangramento maior e déficit documentado, a fonte sugere 3 a 4 g iniciais, com reavaliação',
            'A dose dispensa controle do sangramento',
            'Todo crioprecipitado tem a mesma oferta por bolsa'
          ],
          'a': 1,
          'explanations': [
            'Indicação não decorre do número isolado em qualquer cenário.',
            'A diretriz vincula reposição ao contexto e ao acompanhamento.',
            'O foco e os demais componentes precisam ser tratados.',
            'Preparações e oferta local devem ser conferidas.'
          ],
          'why': '1,2 g/L em qualquer pessoa obriga a mesma dose: Indicação não decorre do número isolado em qualquer cenário. No trauma com sangramento maior e déficit documentado, a fonte sugere 3 a 4 g iniciais, com reavaliação: A diretriz vincula reposição ao contexto e ao acompanhamento. A dose dispensa controle do sangramento: O foco e os demais componentes precisam ser tratados. Todo crioprecipitado tem a mesma oferta por bolsa: Preparações e oferta local devem ser conferidas.',
          'refs': [
            'cir_trauma'
          ]
        }
      ]
    }
  ],
  'CASES': [
    {
      'id': 'cl_c1',
      'focus': 'Pancreatite: diagnóstico não é gravidade',
      'stem': 'Pessoa com dor epigástrica compatível; dados inteiramente fictícios.',
      'stages': [
        {
          'id': 'cl_c1s1',
          'h': 'Confira o limite da lipase',
          'text': 'Lipase 240 U/L, limite superior 60 U/L.',
          'ask': 'Qual conclusão é sustentada?',
          'o': [
            'Dor e enzima quatro vezes o limite podem fornecer dois critérios',
            'O caso é grave apenas pela enzima',
            'É obrigatório obter os três critérios'
          ],
          'a': 0,
          'explanations': [
            'A conta é 240/60 = 4; dois de três podem estabelecer o diagnóstico no contexto.',
            'Gravidade exige avaliação diferente.',
            'Imagem pode ser útil, mas não é uma obrigação apenas para somar um terceiro critério.'
          ],
          'refs': [
            'cir_atlanta'
          ],
          'hint': 'Separe diagnóstico, risco e gravidade. Confira unidade, tempo e o que o exame permite concluir antes de propor o próximo passo.'
        },
        {
          'id': 'cl_c1s2',
          'h': 'A evolução acrescenta informação',
          'text': 'Depois surge uma coleção local, sem falência orgânica persistente documentada.',
          'ask': 'Qual leitura evita exagero?',
          'o': [
            'Toda coleção é infecção confirmada',
            'Complicação local pode corresponder a forma moderadamente grave; avaliar o conjunto',
            'A lipase decide a classificação'
          ],
          'a': 1,
          'explanations': [
            'Presença de coleção não equivale automaticamente a infecção.',
            'Atlanta distingue complicações e falência persistente.',
            'Enzima não substitui a classificação clínica.'
          ],
          'refs': [
            'cir_atlanta',
            'cir_nicepanc'
          ],
          'hint': 'Separe diagnóstico, risco e gravidade. Confira unidade, tempo e o que o exame permite concluir antes de propor o próximo passo.'
        }
      ],
      'ask': 'Apresente uma interpretação e justifique a próxima decisão em voz alta.',
      'answer': [
        'A enzima está quatro vezes o limite do laboratório.',
        'Diagnóstico, causa, risco e gravidade são perguntas distintas.',
        'Complicação local não confirma infecção nem define sozinha Atlanta grave.',
        'A classificação e a prioridade de cuidado acompanham evolução e função orgânica.'
      ]
    },
    {
      'id': 'cl_c2',
      'focus': 'Ranson e a armadilha BUN/ureia',
      'stem': 'Pessoa fictícia de 60 anos; leucócitos 18.000/mm³, glicose 180 mg/dL, LDH 380 U/L e AST 300 U/L.',
      'stages': [
        {
          'id': 'cl_c2s1',
          'h': 'Ranson na admissão, versão não biliar',
          'text': 'Use somente a lista de admissão.',
          'ask': 'Quantos critérios estão presentes?',
          'o': [
            'Cinco',
            'Dois',
            'Quatro'
          ],
          'a': 2,
          'explanations': [
            'Glicose não ultrapassa o corte de 200 mg/dL.',
            'Idade, leucócitos, LDH e AST estão presentes.',
            'São os quatro itens que ultrapassam os cortes da versão consultada.'
          ],
          'refs': [
            'cir_panc'
          ],
          'hint': 'Separe diagnóstico, risco e gravidade. Confira unidade, tempo e o que o exame permite concluir antes de propor o próximo passo.'
        },
        {
          'id': 'cl_c2s2',
          'h': 'O outro escore pede outro analito',
          'text': 'O laudo informa ureia total de 30 mg/dL, sem BUN.',
          'ask': 'Como lidar com o item renal do BISAP?',
          'o': [
            'Usar 30 como BUN e pontuar',
            'Confirmar o analito ou uma conversão validada, sem trocar os números',
            'Ignorar qualquer avaliação renal'
          ],
          'a': 1,
          'explanations': [
            'BUN e ureia total são expressões diferentes.',
            'O corte do escore é BUN acima de 25 mg/dL, na unidade especificada.',
            'Função renal e evolução continuam relevantes.'
          ],
          'refs': [
            'cir_panc'
          ],
          'hint': 'Separe diagnóstico, risco e gravidade. Confira unidade, tempo e o que o exame permite concluir antes de propor o próximo passo.'
        }
      ],
      'ask': 'Apresente uma interpretação e justifique a próxima decisão em voz alta.',
      'answer': [
        'Ranson não biliar de admissão soma quatro nesse exercício.',
        'O escore completo não se encerra na admissão.',
        'BUN não é ureia total com o mesmo número.',
        'Risco preditivo não substitui Atlanta nem o atendimento da pessoa instável.'
      ]
    },
    {
      'id': 'cl_c3',
      'focus': 'Icterícia: a razão R não confirma cálculo',
      'stem': 'ALT 240 U/L com limite 40; FA 600 U/L com limite 120; todos os dados são fictícios.',
      'stages': [
        {
          'id': 'cl_c3s1',
          'h': 'Normalize as duas enzimas',
          'text': 'ALT está seis vezes e FA cinco vezes o limite.',
          'ask': 'Qual é a interpretação da conta?',
          'o': [
            'R = 1,2, favorecendo padrão colestático nessa convenção',
            'R = 6, desprezando a FA',
            'Cálculo confirmado apenas pela conta'
          ],
          'a': 0,
          'explanations': [
            'A conta compara as duas elevações relativas, sem definir a causa.',
            'A FA é o denominador normalizado.',
            'O índice não demonstra a etiologia.'
          ],
          'refs': [
            'cir_liver'
          ],
          'hint': 'Separe diagnóstico, risco e gravidade. Confira unidade, tempo e o que o exame permite concluir antes de propor o próximo passo.'
        },
        {
          'id': 'cl_c3s2',
          'h': 'A imagem e a bilirrubina acrescentam o critério',
          'text': 'Adulto com vesícula in situ, bilirrubina total 5,2 mg/dL e colédoco 8 mm.',
          'ask': 'Qual conjunto está presente?',
          'o': [
            'Apenas ALT elevada sem estratificação',
            'Critério composto de alto risco da ASGE: bilirrubina acima de 4 e dilatação',
            'Ausência de qualquer risco'
          ],
          'a': 1,
          'explanations': [
            'Existem dados relevantes além da ALT.',
            'Os dois componentes estão associados no cenário especificado.',
            'Os achados exigem avaliação proporcional ao risco.'
          ],
          'refs': [
            'cir_asge'
          ],
          'hint': 'Separe diagnóstico, risco e gravidade. Confira unidade, tempo e o que o exame permite concluir antes de propor o próximo passo.'
        }
      ],
      'ask': 'Apresente uma interpretação e justifique a próxima decisão em voz alta.',
      'answer': [
        'R de 1,2 organiza o padrão, sem identificar a causa.',
        'A associação de bilirrubina elevada e dilatação tem significado diferente da bilirrubina isolada.',
        'Indicação de abordagem depende do conjunto e da avaliação clínica.',
        'Não escolher CPRE apenas por uma transaminase ou pelo nome do padrão.'
      ]
    },
    {
      'id': 'cl_c4',
      'focus': 'Colangite sem a tríade completa',
      'stem': 'Pessoa com febre e calafrios, exames colestáticos alterados e dilatação biliar; dor típica não foi documentada.',
      'stages': [
        {
          'id': 'cl_c4s1',
          'h': 'Organize os grupos TG18',
          'text': 'Há inflamação, colestase e imagem compatível.',
          'ask': 'Qual leitura é adequada?',
          'o': [
            'A ausência da dor exclui colangite',
            'O conjunto dos três grupos sustenta o diagnóstico no contexto',
            'Icterícia sozinha confirma a mesma coisa'
          ],
          'a': 1,
          'explanations': [
            'A tríade incompleta não afasta a hipótese.',
            'A estrutura A + B + C organiza os dados; ainda é preciso avaliar diferenciais e gravidade.',
            'O conjunto é mais amplo que um único achado.'
          ],
          'refs': [
            'cir_tg'
          ],
          'hint': 'Separe diagnóstico, risco e gravidade. Confira unidade, tempo e o que o exame permite concluir antes de propor o próximo passo.'
        },
        {
          'id': 'cl_c4s2',
          'h': 'Agora há instabilidade',
          'text': 'Surgem hipotensão e alteração do estado mental.',
          'ask': 'O próximo raciocínio deve priorizar:',
          'o': [
            'Esperar uma enzima normalizar',
            'Avaliação de gravidade, suporte e controle do foco biliar',
            'Tratar só o valor da GGT'
          ],
          'a': 1,
          'explanations': [
            'A evolução clínica exige prioridade.',
            'A decisão não se resume a um marcador laboratorial.',
            'GGT isolada não define toda a conduta.'
          ],
          'refs': [
            'cir_tg',
            'cir_asge'
          ],
          'hint': 'Separe diagnóstico, risco e gravidade. Confira unidade, tempo e o que o exame permite concluir antes de propor o próximo passo.'
        }
      ],
      'ask': 'Apresente uma interpretação e justifique a próxima decisão em voz alta.',
      'answer': [
        'A tríade de Charcot incompleta não exclui o diagnóstico.',
        'Inflamação, colestase e imagem compõem os grupos TG18.',
        'Instabilidade muda prioridade e necessidade de suporte e controle do foco.',
        'Escolha e dose de antimicrobiano pertencem à avaliação da síndrome, gravidade, culturas e função renal.'
      ]
    },
    {
      'id': 'cl_c5',
      'focus': 'Trauma: hemoglobina inicial e fibrinogênio',
      'stem': 'Trauma recente com hipoperfusão e suspeita de sangramento interno; dados fictícios.',
      'stages': [
        {
          'id': 'cl_c5s1',
          'h': 'Primeiro exame',
          'text': 'Hemoglobina inicial é 12,4 g/dL.',
          'ask': 'O exame permite excluir hemorragia importante?',
          'o': [
            'Sim, porque está acima de 7',
            'Não; integrar clínica, mecanismo e medidas seriadas',
            'Sim, se a pessoa ainda não recebeu sangue'
          ],
          'a': 1,
          'explanations': [
            'O limiar restritivo não é uma regra para excluir hemorragia maior.',
            'A concentração inicial pode não refletir a magnitude da perda.',
            'A avaliação depende do conjunto, não desse detalhe isolado.'
          ],
          'refs': [
            'cir_trauma',
            'cir_rbc'
          ],
          'hint': 'Separe diagnóstico, risco e gravidade. Confira unidade, tempo e o que o exame permite concluir antes de propor o próximo passo.'
        },
        {
          'id': 'cl_c5s2',
          'h': 'Outro componente está baixo',
          'text': 'Em sangramento maior, fibrinogênio de Clauss de 1,2 g/L.',
          'ask': 'Qual interpretação é correta?',
          'o': [
            'Equivale a 1,2 mg/dL e não exige contexto',
            'Equivale a 120 mg/dL; avaliar reposição no contexto protocolado, com reavaliação',
            'Dispensa controlar o foco'
          ],
          'a': 1,
          'explanations': [
            'Há erro de unidade e ausência de avaliação clínica.',
            'A diretriz aborda déficit documentado e sugere 3 a 4 g iniciais no cenário indicado.',
            'Reposição não substitui hemostasia definitiva.'
          ],
          'refs': [
            'cir_trauma'
          ],
          'hint': 'Separe diagnóstico, risco e gravidade. Confira unidade, tempo e o que o exame permite concluir antes de propor o próximo passo.'
        }
      ],
      'ask': 'Apresente uma interpretação e justifique a próxima decisão em voz alta.',
      'answer': [
        'Hb inicial não exclui perda importante no trauma.',
        'A conversão correta é 1,2 g/L = 120 mg/dL.',
        'No sangramento maior, avaliar déficit e reposição segundo fonte e protocolo.',
        'Integrar hemostasia, perfusão, temperatura, cálcio, controles seriados e controle do foco.'
      ]
    },
    {
      'id': 'cl_c6',
      'focus': 'Pré-operatório: história antes de corrigir o número',
      'stem': 'Cirurgia eletiva; pessoa sem sangramento ativo, com alteração inesperada de um teste de coagulação.',
      'stages': [
        {
          'id': 'cl_c6s1',
          'h': 'Não automatize o próximo passo',
          'text': 'Ainda faltam história de sangramento, medicamentos e conferência da coleta.',
          'ask': 'O que fazer com o resultado?',
          'o': [
            'Solicitar plasma automaticamente',
            'Rever contexto, amostra, história e procedimento antes de decidir',
            'Aplicar protocolo de trauma a toda pessoa'
          ],
          'a': 1,
          'explanations': [
            'A NG24 não recomenda essa correção universal.',
            'A decisão deve responder ao risco e à causa possível da alteração.',
            'O cenário não é hemorragia maior.'
          ],
          'refs': [
            'cir_preop',
            'cir_ffp'
          ],
          'hint': 'Separe diagnóstico, risco e gravidade. Confira unidade, tempo e o que o exame permite concluir antes de propor o próximo passo.'
        },
        {
          'id': 'cl_c6s2',
          'h': 'Medicamentos mudam a interpretação',
          'text': 'Na revisão, a pessoa relata uso de anticoagulante oral direto; INR está dentro do intervalo.',
          'ask': 'Qual conclusão é adequada?',
          'o': [
            'INR normal exclui qualquer efeito do fármaco',
            'A decisão é específica do fármaco, função renal e procedimento; teste de rotina não resolve todo o efeito',
            'Pode usar o esquema de TXA de trauma como reversão universal'
          ],
          'a': 1,
          'explanations': [
            'A NG45 alerta para a limitação dos testes de rotina nesse contexto.',
            'É necessário um plano individualizado, sem intervalo universal inventado.',
            'O esquema de trauma não é uma reversão de todos os anticoagulantes.'
          ],
          'refs': [
            'cir_preop'
          ],
          'hint': 'Separe diagnóstico, risco e gravidade. Confira unidade, tempo e o que o exame permite concluir antes de propor o próximo passo.'
        }
      ],
      'ask': 'Apresente uma interpretação e justifique a próxima decisão em voz alta.',
      'answer': [
        'Testes pré-operatórios não substituem história de sangramento e avaliação do procedimento.',
        'Confirmar uma alteração inesperada pode ser parte do processo, sem transfusão automática.',
        'INR normal não quantifica adequadamente todos os anticoagulantes orais diretos.',
        'Não foi criado prazo universal de suspensão ou esquema de reversão sem referência específica.'
      ]
    }
  ]
};
(()=>{
 'use strict';
 const base=window.MASTER_LAB_RENAL,extra=window.MASTER_LAB_CIRURGIA;
 Object.assign(base.REFS,extra.REFS);
 for(const kind of ['MODULES','CASES'])for(const item of extra[kind])if(!base[kind].some(old=>old.id===item.id))base[kind].push(item);
 base.displayTitle='Laboratório de Exames';
 base.examFocus=[
  {id:'cir_lab_pancreas',topics:['cirpanc'],label:'Pancreatite e escores',why:'Diagnóstico, BUN, Ranson, BISAP e Atlanta.',caseIds:['cl_c1','cl_c2']},
  {id:'cir_lab_biliar',topics:['ciraa','cirvb'],label:'Icterícia e via biliar',why:'Perfil hepático, risco de cálculo e colangite.',caseIds:['cl_c3','cl_c4']},
  {id:'cir_lab_coagulacao',topics:['cirtabd','cirremit'],label:'Coagulação e hemorragia',why:'Trauma, unidades, transfusão e pré-operatório.',caseIds:['cl_c5','cl_c6']}
 ];
})();
