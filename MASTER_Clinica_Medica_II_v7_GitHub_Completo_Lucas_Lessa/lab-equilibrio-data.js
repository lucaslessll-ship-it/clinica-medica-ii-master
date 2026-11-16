/* Ampliação autoral do laboratório: não altera IDs nem respostas anteriores. */
window.MASTER_LAB_EQUILIBRIO={
  'id': 'lab_equilibrio_v1',
  'version': '2026.11.16.1',
  'title': 'Eletrólitos e gasometria',
  'REFS': {
    'eq_na': {
      't': 'Sumi e colaboradores. Treatment of hyponatremia: comprehension and best clinical practice. Clin Exp Nephrol, 2025;29:249-258.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11893709/',
      'scope': 'Revisão de 2025: sintomas, solução a 3%, metas, limites e prevenção de sobrecorreção. Não é uma nova diretriz universal.',
      'year': '2025',
      'status': 'texto consultado em 16/11/2026'
    },
    'eq_naguide': {
      't': 'Hoorn e Zietse. Diagnosis and Treatment of Hyponatremia: Compilation of the Guidelines. J Am Soc Nephrol, 2017;28:1340-1349.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5407738/',
      'scope': 'Tabela comparativa das recomendações americanas e europeias: volumes e tempos dos bolus. Distinções retomadas pela revisão de 2025.',
      'year': '2017',
      'status': 'texto consultado em 16/11/2026'
    },
    'eq_nalimit': {
      't': 'Sterns e colaboradores. Treatment Guidelines for Hyponatremia: Stay the Course. CJASN, 2024;19:129-135.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10843202/',
      'scope': 'Risco de desmielinização, metas distintas de limites, aquarese e necessidade de monitorização.',
      'year': '2024',
      'status': 'texto consultado em 16/11/2026'
    },
    'eq_hyperna': {
      't': 'Yun e colaboradores. Evaluation and management of hypernatremia in adults: clinical perspectives. Korean J Intern Med, 2023;38:290-302.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10175862/',
      'scope': 'Tonicidade, água corporal, déficit e perdas em curso. Discute a incerteza das velocidades de correção em adultos.',
      'year': '2023',
      'status': 'texto consultado em 16/11/2026'
    },
    'eq_hyperk': {
      't': 'Lindner e colaboradores. Acute hyperkalemia in the emergency department: a summary from a KDIGO conference. Eur J Emerg Med, 2020;27:329-337.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7448835/',
      'scope': 'Mecanismos, ECG, redistribuição e eliminação. Os limiares de ação são descritos como opinião no documento. Fonte de 2020; atualização da posologia na diretriz vigente a confirmar.',
      'year': '2020',
      'status': 'texto consultado em 16/11/2026'
    },
    'eq_hypok': {
      't': 'Kardalas e colaboradores. Hypokalemia: a clinical update. Endocr Connect, 2018;7:R135-R146.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5881435/',
      'scope': 'Déficit, redistribuição, perdas, magnésio e escolha de via. Os limites IV deste curso usam também a bula FDA de 2026, específica da preparação.',
      'year': '2018',
      'status': 'texto consultado em 16/11/2026'
    },
    'eq_mg': {
      't': 'Hansen e Bruserud. Hypomagnesemia in critically ill patients. J Intensive Care, 2018;6:21.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5872533/',
      'scope': 'Tabela 5: reposição IV em hipomagnesemia sintomática com estabilidade hemodinâmica. Revisão, sem extrapolar para eclâmpsia ou parada.',
      'year': '2018',
      'status': 'texto consultado em 16/11/2026'
    },
    'eq_p': {
      't': 'Geerse e colaboradores. Treatment of hypophosphatemia in the intensive care unit: a review. Crit Care, 2010;14:R147.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2945130/',
      'scope': 'Mecanismos e manifestações da hipofosfatemia. Revisão histórica; não foi adotada como protocolo IV geral atual.',
      'year': '2010',
      'status': 'texto consultado em 16/11/2026'
    },
    'eq_gas': {
      't': 'Jung e colaboradores. Diagnosis and management of metabolic acidosis: guidelines from a French expert panel. Ann Intensive Care, 2019;9:92.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6695455/',
      'scope': 'Winter, ânion gap e correção por albumina; limitações de amostras venosas. Não usamos o documento para fixar tratamento atual com bicarbonato em toda acidemia.',
      'year': '2019',
      'status': 'texto consultado em 16/11/2026'
    },
    'eq_sepsis': {
      't': 'Evans e colaboradores. Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2021.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8486643/',
      'scope': 'Interpretação contextual e tendência do lactato. Fonte adulta consultada de 2021; não apresentamos uma dose de volume como regra derivada do lactato.',
      'year': '2021',
      'status': 'texto consultado em 16/11/2026'
    },
    'eq_cad': {
      't': 'Umpierrez e colaboradores. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report. Diabetes Care, 2024;47:1257-1275.',
      'u': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11272983/',
      'scope': 'Potássio e adiamento da insulina em CAD; indicação e quantidade de fosfato apenas nesse contexto.',
      'year': '2024',
      'status': 'texto consultado em 16/11/2026'
    },
    'eq_kcl': {
      't': 'DailyMed/FDA. Potassium Chloride Injection, Solution, Concentrate, Henry Schein. Versão de 09/11/2026.',
      'u': 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8367a2ae-dfd9-4515-838c-529920291ca0',
      'scope': 'Preparação concentrada IV: diluição obrigatória e limite de 10 mEq/h e 40 mEq/L quando K é maior que 2,5 mEq/L. Não é esquema universal para toda apresentação.',
      'year': '2026',
      'status': 'texto consultado em 16/11/2026'
    },
    'eq_ca': {
      't': 'DailyMed/FDA. Calcium Gluconate Injection, Henry Schein. Versão de 29/10/2026.',
      'u': 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3cbf6bf7-2415-4435-b3df-41855514a05d',
      'scope': 'Hipocalcemia no adulto: dose inicial, diluição, velocidade, cálcio elementar e incompatibilidades. Não transportamos a dose para hipercalemia.',
      'year': '2026',
      'status': 'texto consultado em 16/11/2026'
    },
    'eq_mgfda': {
      't': 'DailyMed/FDA. Magnesium Sulfate Injection, Henry Schein. Versão de 04/11/2026.',
      'u': 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=27a581a3-2342-4cc3-b90f-6c739bdf7120',
      'scope': 'Diluição IV, limite geral de velocidade e necessidade de individualização e monitorização renal. O exemplo de 2 g em 60 minutos vem da revisão de 2018.',
      'year': '2026',
      'status': 'texto consultado em 16/11/2026'
    }
  },
  'MODULES': [
    {
      'id': 'equilibrio_m1',
      'layer': 'Eletrólitos e gasometria',
      'title': 'Sódio e água: tonicidade, sintomas e velocidade de correção',
      'summary': 'Separe concentração de sódio, estoque corporal e tonicidade; interprete antes de calcular uma reposição.',
      'goals': [
        'Diferenciar hiponatremia hipotônica de outros mecanismos.',
        'Distinguir meta de correção e limite de segurança.',
        'Calcular um déficit de água e explicar por que ele não é uma prescrição.'
      ],
      'pretest': [
        'Sódio baixo sempre significa falta de sal?',
        'A meta inicial de melhora equivale a normalizar o sódio?',
        'O déficit de água inclui perdas futuras?'
      ],
      'sections': [
        {
          'h': 'Concentração não é estoque',
          'p': [
            'O sódio plasmático expressa uma relação entre solutos trocáveis e água corporal, não o estoque isolado de sal. Retenção de água pode reduzir sua concentração em uma pessoa com edema e excesso de sódio corporal. Na hipernatremia, frequentemente há déficit de água em relação aos solutos, mas a volemia também precisa ser examinada.',
            'Confirme identificação, unidade, glicose, osmolalidade quando disponível, tendência e duração. Convulsão, rebaixamento de consciência e instabilidade exigem avaliação imediata; a investigação etiológica não deve atrasar suporte. Todos os resultados deste bloco são fictícios.'
          ]
        },
        {
          'h': 'Tonicidade antes de chamar de SIAD',
          'table': {
            'head': [
              'Achado',
              'Raciocínio',
              'Próximo passo'
            ],
            'rows': [
              [
                'Hiponatremia hipotônica',
                'Há excesso relativo de água efetiva.',
                'Integre volemia, urina, função renal, medicamentos, tireoide e adrenal conforme o caso.'
              ],
              [
                'Hiperglicemia ou outro osmólito efetivo',
                'A água desloca-se para o extracelular e o sódio medido pode cair.',
                'Trate a hipótese no contexto; não aplicar solução hipertônica apenas pelo sódio.'
              ],
              [
                'Pseudohiponatremia',
                'Métodos com diluição podem sofrer interferência de lipídios ou proteínas.',
                'Converse com o laboratório e confira método/osmolalidade; não corrigir um artefato.'
              ]
            ]
          },
          'after': 'SIAD é diagnóstico contextual e de exclusão. Uma amostra de urina isolada não resolve todos os mecanismos; diuréticos, baixa ingestão de solutos e DRC podem dificultar a leitura.'
        },
        {
          'h': 'Urina: há diluição apropriada ou retenção de água?',
          'p': [
            'A osmolalidade urinária informa a resposta de concentração; o sódio urinário ajuda a interpretar o balanço e a perfusão, mas depende de dieta, diurético, função renal e momento da coleta. Leia ambos junto da osmolalidade plasmática e da avaliação clínica. Neste bloco não fixamos um ponto de corte urinário universal para situações que alteram essa resposta.'
          ]
        },
        {
          'h': 'Hiponatremia com sintomas graves: esquemas diferentes, mesma necessidade de reavaliar',
          'table': {
            'head': [
              'Fonte comparada',
              'Solução e dose descritas',
              'Como usar a informação'
            ],
            'rows': [
              [
                'Recomendação americana, compilação de 2017 e revisão de 2025',
                'NaCl a 3%: 100 mL IV em 10 minutos; repetir conforme resposta, até três bolus no esquema descrito.',
                'Uso hospitalar com monitorização. Não repetir automaticamente se o objetivo clínico já foi atingido.'
              ],
              [
                'Diretriz europeia, compilação de 2017 e revisão de 2025',
                'NaCl a 3%: 150 mL IV em 20 minutos; o esquema descreve repetição conforme resposta.',
                'É um protocolo alternativo; não somar bolus de diretrizes diferentes.'
              ]
            ]
          },
          'after': 'As revisões de 2024/2025 descrevem elevação inicial em torno de 4 a 6 mmol/L como suficiente em muitos quadros graves para reduzir edema cerebral. É uma meta inicial contextual, não uma ordem de normalização. Peso, risco, diurese, resposta e protocolo local importam.'
        },
        {
          'h': 'Meta e limite não são a mesma coisa',
          'p': [
            'Na hiponatremia crônica com alto risco de desmielinização, o painel americano/irlandês discutido por Sterns em 2024 propõe meta de 4 a 6 mmol/L e limite de 8 mmol/L em qualquer período de 24 horas. Desnutrição, alcoolismo, doença hepática avançada, hipocalemia e sódio muito baixo aumentam o risco.',
            'A diretriz europeia discutida nas revisões limita a correção a 10 mmol/L no primeiro dia e 8 mmol/L nos dias seguintes. Registre qual recomendação está sendo usada; não apresente um limite como se fosse uma meta desejável. Aquarese após reversão do estímulo de vasopressina pode causar subida inesperada. Reavaliar sódio e diurese é parte do tratamento.',
            'Se houver sobrecorreção, a intervenção pode envolver reposição de água e desmopressina sob supervisão. A posologia de resgate na norma vigente ficou a confirmar nesta entrega, por não ter sido reconferida em fonte primária atual. Não usamos um esquema automático.'
          ]
        },
        {
          'h': 'Hipernatremia: uma conta que não substitui acompanhamento',
          'p': [
            'Déficit de água (L) = água corporal total estimada (L) × (Na/140 − 1), na abordagem da revisão de 2023. A fração de água corporal depende de idade, composição corporal e estado de hidratação. A conta não inclui perdas em curso nem a necessidade de corrigir perfusão. Em choque, a prioridade de ressuscitação deve ser avaliada antes de simplesmente administrar água livre.'
          ],
          'table': {
            'head': [
              'Achado',
              'Raciocínio',
              'Próximo passo'
            ],
            'rows': [
              [
                'Homem fictício, 60 kg; fração didática de água 0,6',
                'Água corporal estimada = 60 × 0,6 = 36 L.',
                'A fração é uma hipótese do exercício, não um valor universal.'
              ],
              [
                'Sódio de 154 mmol/L',
                '36 × (154/140 − 1) = 3,6 L.',
                'Déficit estimado, não volume para correr de uma vez.'
              ],
              [
                'Duração e perdas ainda desconhecidas',
                'A velocidade depende da situação e da resposta.',
                'A revisão discute limites tradicionais e incerteza dos dados em adultos; não fixamos uma velocidade única para todos.'
              ]
            ]
          }
        },
        {
          'h': 'Laudo resolvido: já corrigiu o suficiente para exigir reavaliação',
          'p': [
            'Pessoa com hiponatremia crônica, desnutrição e Na inicial de 108 mmol/L tem Na de 114 após 12 horas. A diferença é 6 mmol/L. O objetivo inicial pode já ter sido alcançado; continuar solução hipertônica sem reavaliação pode ultrapassar o limite das próximas horas. A conta deve considerar a janela móvel de 24 horas, a diurese e as medidas feitas fora do serviço.'
          ]
        },
        {
          'h': 'Como cai e como explicar',
          'list': [
            'Sódio baixo com edema: a banca pode querer excesso relativo de água, não falta isolada de sal.',
            'Hiperglicemia importante: avalie tonicidade antes de chamar todo sódio baixo de hiponatremia hipotônica.',
            'Melhora após bolus não autoriza repetir até o valor ficar normal.',
            'Déficit de água não é prescrição pronta: declare a fração usada e o que a fórmula não inclui.'
          ]
        }
      ],
      'pitfalls': [
        'Misturar protocolo de 100 mL com o de 150 mL.',
        'Confundir limite máximo com meta de tratamento.',
        'Ignorar aquarese e contribuição da correção do potássio.',
        'Prescrever o déficit calculado como bolus.'
      ],
      'refs': [
        'eq_na',
        'eq_naguide',
        'eq_nalimit',
        'eq_hyperna'
      ],
      'quiz': [
        {
          'id': 'eq1q1',
          'q': 'Sódio baixo, edema e congestão. Qual afirmação é adequada?',
          'o': [
            'É sempre deficiência isolada de sal',
            'Pode existir excesso de sódio corporal com excesso ainda maior de água',
            'O exame define sozinho SIAD',
            'A osmolalidade nunca importa'
          ],
          'a': 1,
          'explanations': [
            'A concentração não mede o estoque isolado.',
            'O balanço relativo explica a coexistência de edema e hiponatremia.',
            'A causa depende da história e da investigação.',
            'A tonicidade distingue mecanismos com implicações diferentes.'
          ],
          'why': 'É sempre deficiência isolada de sal: A concentração não mede o estoque isolado. Pode existir excesso de sódio corporal com excesso ainda maior de água: O balanço relativo explica a coexistência de edema e hiponatremia. O exame define sozinho SIAD: A causa depende da história e da investigação. A osmolalidade nunca importa: A tonicidade distingue mecanismos com implicações diferentes.',
          'refs': [
            'eq_na'
          ]
        },
        {
          'id': 'eq1q2',
          'q': 'Hiponatremia crônica de alto risco: Na 108 passa a 114 em 12 horas. O que fazer com a informação?',
          'o': [
            'Continuar corrigindo até 135 sem reavaliar',
            'Ignorar a diurese',
            'Reavaliar a trajetória, pois já houve aumento de 6 mmol/L',
            'Chamar 8 mmol/L de meta mínima'
          ],
          'a': 2,
          'explanations': [
            'Normalizar rapidamente pode causar dano.',
            'Aquarese pode acelerar a subida.',
            'O aumento já corresponde à meta descrita para alto risco; a evolução restante exige monitorização.',
            'Na fonte, 8 é limite em 24 horas para alto risco, não meta mínima.'
          ],
          'why': 'Continuar corrigindo até 135 sem reavaliar: Normalizar rapidamente pode causar dano. Ignorar a diurese: Aquarese pode acelerar a subida. Reavaliar a trajetória, pois já houve aumento de 6 mmol/L: O aumento já corresponde à meta descrita para alto risco; a evolução restante exige monitorização. Chamar 8 mmol/L de meta mínima: Na fonte, 8 é limite em 24 horas para alto risco, não meta mínima.',
          'refs': [
            'eq_nalimit'
          ]
        },
        {
          'id': 'eq1q3',
          'q': 'Qual comparação da solução hipertônica respeita as fontes?',
          'o': [
            'Os bolus de 100 e 150 mL pertencem a esquemas alternativos',
            'Deve somar os dois esquemas',
            'Os dois exigem repetir sem olhar a resposta',
            'A concentração a 3% é igual a 0,9%'
          ],
          'a': 0,
          'explanations': [
            'A compilação e a revisão de 2025 identificam as recomendações americanas e europeias separadamente.',
            'Misturar esquemas aumenta o risco e perde o contexto.',
            'Resposta, sódio e monitorização orientam repetição.',
            'Concentrações distintas fornecem quantidades diferentes de sódio.'
          ],
          'why': 'Os bolus de 100 e 150 mL pertencem a esquemas alternativos: A compilação e a revisão de 2025 identificam as recomendações americanas e europeias separadamente. Deve somar os dois esquemas: Misturar esquemas aumenta o risco e perde o contexto. Os dois exigem repetir sem olhar a resposta: Resposta, sódio e monitorização orientam repetição. A concentração a 3% é igual a 0,9%: Concentrações distintas fornecem quantidades diferentes de sódio.',
          'refs': [
            'eq_na',
            'eq_naguide'
          ]
        },
        {
          'id': 'eq1q4',
          'q': 'No exercício, água corporal é 36 L e Na é 154 mmol/L. Qual é o déficit estimado pela fórmula apresentada?',
          'o': [
            '36 L',
            '14 L',
            '0,36 L',
            '3,6 L, sem incluir perdas em curso'
          ],
          'a': 3,
          'explanations': [
            'Água corporal total não é o déficit.',
            'A diferença de concentração não equivale a litros.',
            'Há erro decimal nessa conta.',
            '36 × (154/140 − 1) = 3,6; a conta não define a administração.'
          ],
          'why': '36 L: Água corporal total não é o déficit. 14 L: A diferença de concentração não equivale a litros. 0,36 L: Há erro decimal nessa conta. 3,6 L, sem incluir perdas em curso: 36 × (154/140 − 1) = 3,6; a conta não define a administração.',
          'refs': [
            'eq_hyperna'
          ]
        },
        {
          'id': 'eq1q5',
          'q': 'Após reversão da causa da hiponatremia, surge diurese aquosa intensa. O principal risco é:',
          'o': [
            'Queda obrigatória de sódio',
            'Subida inesperada do sódio e sobrecorreção',
            'Ausência de qualquer mudança',
            'Confirmação de infecção urinária'
          ],
          'a': 1,
          'explanations': [
            'Perder água livre pode elevar o sódio.',
            'Aquarese é motivo para vigilância da tendência, conforme as revisões.',
            'O balanço de água pode mudar rapidamente.',
            'Diurese aquosa não diagnostica ITU.'
          ],
          'why': 'Queda obrigatória de sódio: Perder água livre pode elevar o sódio. Subida inesperada do sódio e sobrecorreção: Aquarese é motivo para vigilância da tendência, conforme as revisões. Ausência de qualquer mudança: O balanço de água pode mudar rapidamente. Confirmação de infecção urinária: Diurese aquosa não diagnostica ITU.',
          'refs': [
            'eq_na',
            'eq_nalimit'
          ]
        },
        {
          'id': 'eq1q6',
          'q': 'Na baixo com hiperglicemia importante deve ser interpretado primeiro como:',
          'o': [
            'Uma indicação automática de bolus hipertônico',
            'Prova de pseudohiponatremia por lipídios',
            'Um resultado que exige avaliar tonicidade e mecanismo',
            'Um resultado sem utilidade'
          ],
          'a': 2,
          'explanations': [
            'A glicose pode mudar a tonicidade e o sódio medido.',
            'Esse mecanismo não pode ser presumido sem avaliar método e contexto.',
            'É necessário separar o mecanismo antes de aplicar um protocolo.',
            'O resultado é útil quando integrado aos demais dados.'
          ],
          'why': 'Uma indicação automática de bolus hipertônico: A glicose pode mudar a tonicidade e o sódio medido. Prova de pseudohiponatremia por lipídios: Esse mecanismo não pode ser presumido sem avaliar método e contexto. Um resultado que exige avaliar tonicidade e mecanismo: É necessário separar o mecanismo antes de aplicar um protocolo. Um resultado sem utilidade: O resultado é útil quando integrado aos demais dados.',
          'refs': [
            'eq_na',
            'eq_hyperna'
          ]
        }
      ]
    },
    {
      'id': 'equilibrio_m2',
      'layer': 'Eletrólitos e gasometria',
      'title': 'Potássio: do artefato à emergência',
      'summary': 'Relacione coleta, redistribuição, perdas, função renal e ECG sem transformar um único número em diagnóstico completo.',
      'goals': [
        'Reconhecer pseudohipercalemia sem atrasar uma emergência.',
        'Separar proteção cardíaca, redistribuição e eliminação.',
        'Conferir concentração, unidade, via e monitorização da reposição.'
      ],
      'pretest': [
        'Um ECG normal exclui risco na hipercalemia?',
        'Insulina retira potássio do corpo?',
        'KCl concentrado pode ser usado sem diluição?'
      ],
      'sections': [
        {
          'h': 'Confirme, mas não espere quando o contexto é grave',
          'p': [
            'Hemólise, coleta traumática e problemas de processamento podem elevar o potássio medido. Avalie o comentário do laboratório, exposição, função renal e evolução. Uma nova amostra adequada pode esclarecer o artefato, mas não deve atrasar atendimento diante de instabilidade, fraqueza importante ou alterações eletrocardiográficas compatíveis.',
            'O ECG tem sensibilidade limitada para excluir hipercalemia perigosa. Ondas T apiculadas, distúrbios de condução e alargamento do QRS podem ocorrer, mas a sequência não é obrigatória. Integre clínica, valor, rapidez de mudança e contexto.'
          ]
        },
        {
          'h': 'Distribuição e estoque são perguntas diferentes',
          'table': {
            'head': [
              'Achado',
              'Raciocínio',
              'Próximo passo'
            ],
            'rows': [
              [
                'Insulina e estímulo beta-adrenérgico',
                'Favorecem entrada de potássio na célula.',
                'O potássio pode cair no sangue sem ter sido eliminado.'
              ],
              [
                'Perdas digestivas ou renais',
                'Podem reduzir o estoque corporal.',
                'Investigue história, diuréticos, função renal e equilíbrio ácido-base.'
              ],
              [
                'DRC, LRA e redução da excreção',
                'Podem sustentar hipercalemia.',
                'Rever exposições e avaliar a necessidade de eliminação efetiva.'
              ],
              [
                'Deficiência de magnésio',
                'Pode manter perda renal de potássio e dificultar correção.',
                'Não repetir potássio indefinidamente sem investigar magnésio.'
              ]
            ]
          }
        },
        {
          'h': 'Hipercalemia: três objetivos que não se substituem',
          'table': {
            'head': [
              'Achado',
              'Raciocínio',
              'Próximo passo'
            ],
            'rows': [
              [
                'Proteger o miocárdio',
                'Cálcio IV quando indicado pelo contexto e protocolo.',
                'Não reduz a concentração de potássio.'
              ],
              [
                'Redistribuir',
                'Insulina com glicose e beta-agonista em cenários apropriados.',
                'Efeito temporário; monitorar hipoglicemia e recorrência.'
              ],
              [
                'Eliminar',
                'Diálise, diurético quando aplicável e agentes ligantes conforme cenário.',
                'Escolha depende de gravidade, função renal e tempo de ação.'
              ]
            ]
          },
          'after': 'A conferência KDIGO de 2020 fundamenta essa organização. A posologia emergencial vigente de cálcio e insulina para hipercalemia ficou a confirmar: o documento primário UKKA 2023 não pôde ser acessado. Não transportar o esquema de insulina da CAD nem o de cálcio da hipocalcemia para essa indicação.'
        },
        {
          'h': 'Hipocalemia: escolha a via pela pessoa, não só pelo número',
          'p': [
            'Sintomas, ECG, tolerância oral, causa, perdas em curso e função renal orientam a via. Em situações sem gravidade e com absorção possível, a via oral pode ser apropriada; produto e dose oral específicos precisam ser conferidos na apresentação prescrita. A via IV requer diluição, bomba, acesso adequado e reavaliação.',
            'A massa de KCl, o potássio em mEq e o volume da ampola são grandezas diferentes. Para o íon potássio, 1 mmol corresponde a 1 mEq; isso não transforma mg de KCl em mEq. Leia o rótulo e não use uma concentração suposta. KCl concentrado nunca deve ser administrado diretamente em bolus IV.'
          ]
        },
        {
          'h': 'Posologia de referência: KCl IV na preparação conferida',
          'table': {
            'head': [
              'Condição e fonte',
              'Dose, concentração e uso',
              'Monitorização'
            ],
            'rows': [
              [
                'Bula FDA de 09/11/2026; K maior que 2,5 mEq/L',
                'A bula da preparação concentrada descreve velocidade que não exceda 10 mEq/h e concentração de até 40 mEq/L, após diluição.',
                'Individualizar quantidade total, rim, acesso, ECG e medidas seriadas. Não é limite de todas as apresentações ou protocolos.'
              ],
              [
                'Exemplo de conferência, sem prescrição',
                'Se uma bolsa já conferida contém 40 mEq/L, 10 mEq/h correspondem a 250 mL/h.',
                'A conta pode gerar volume inadequado para a pessoa; não escolhe sozinha concentração, dose ou velocidade clínica.'
              ],
              [
                'CAD com K abaixo de 3,5 mmol/L, consenso de 2024',
                'O consenso descreve reposição de 10 mmol/h e adiamento da insulina até K acima de 3,5 mmol/L.',
                'Regra contextual de crise hiperglicêmica, com monitorização; não aplicar a todo cenário de hipocalemia.'
              ]
            ]
          }
        },
        {
          'h': 'Laudo resolvido: potássio cai, mas a causa permanece',
          'p': [
            'Adulto fictício em uso de diurético apresenta K de 2,6 mmol/L, magnésio baixo no intervalo do laboratório e função renal sem piora documentada. Repor apenas potássio pode não resolver o mecanismo. Avalie perdas, magnésio, ECG e necessidade de revisar o tratamento. O número em si não determina uma dose total fixa. Se houver reposição IV, documente unidade, diluição, velocidade, acesso e momento da nova avaliação.'
          ]
        },
        {
          'h': 'Depois da medida inicial, o problema pode voltar',
          'p': [
            'Uma queda transitória do potássio após insulina não demonstra eliminação do excesso. Acompanhe glicose, potássio e ECG quando indicado e procure uma estratégia de eliminação e controle da causa. Na hipocalemia, acompanhar a resposta também evita excesso de reposição quando a redistribuição se reverte ou a excreção diminui.'
          ]
        },
        {
          'h': 'Como cai na prova',
          'list': [
            'Hemólise com pessoa estável: considerar nova amostra; não chamar todo valor alto de emergência verdadeira.',
            'Valor alto com LRA e QRS alargado: não esperar apenas o resultado repetido para buscar suporte.',
            'Cálcio protege; insulina redistribui; eliminação reduz o estoque.',
            'Hipocalemia refratária: lembrar magnésio, perdas persistentes e unidade da reposição.'
          ]
        }
      ],
      'pitfalls': [
        'Usar ECG normal para excluir hipercalemia grave.',
        'Confundir queda sérica com eliminação do potássio.',
        'Fazer KCl concentrado em bolus.',
        'Aplicar um esquema de CAD fora da sua indicação.'
      ],
      'refs': [
        'eq_hyperk',
        'eq_hypok',
        'eq_kcl',
        'eq_cad'
      ],
      'quiz': [
        {
          'id': 'eq2q1',
          'q': 'Potássio elevado em amostra hemolisada, mas há LRA e QRS alargado. Qual decisão evita atraso?',
          'o': [
            'Ignorar por causa da hemólise',
            'Considerar emergência e repetir a amostra sem atrasar suporte',
            'Esperar apenas a rotina do dia seguinte',
            'Usar ECG normal como requisito para tratar'
          ],
          'a': 1,
          'explanations': [
            'O contexto clínico pode indicar hipercalemia verdadeira apesar da amostra inadequada.',
            'A avaliação e o suporte podem ocorrer enquanto se busca confirmação confiável.',
            'Há sinais que exigem prioridade.',
            'ECG normal não é requisito e tampouco exclui risco.'
          ],
          'why': 'Ignorar por causa da hemólise: O contexto clínico pode indicar hipercalemia verdadeira apesar da amostra inadequada. Considerar emergência e repetir a amostra sem atrasar suporte: A avaliação e o suporte podem ocorrer enquanto se busca confirmação confiável. Esperar apenas a rotina do dia seguinte: Há sinais que exigem prioridade. Usar ECG normal como requisito para tratar: ECG normal não é requisito e tampouco exclui risco.',
          'refs': [
            'eq_hyperk'
          ]
        },
        {
          'id': 'eq2q2',
          'q': 'Após insulina, o potássio cai. O que essa resposta demonstra?',
          'o': [
            'Redistribuição, sem provar eliminação do excesso',
            'Eliminação renal obrigatória',
            'Fim da necessidade de medir glicose',
            'Cura da causa da hipercalemia'
          ],
          'a': 0,
          'explanations': [
            'A entrada na célula reduz o valor sérico temporariamente.',
            'Insulina não garante excreção.',
            'Hipoglicemia é uma complicação que exige monitorização.',
            'A causa pode persistir e produzir recorrência.'
          ],
          'why': 'Redistribuição, sem provar eliminação do excesso: A entrada na célula reduz o valor sérico temporariamente. Eliminação renal obrigatória: Insulina não garante excreção. Fim da necessidade de medir glicose: Hipoglicemia é uma complicação que exige monitorização. Cura da causa da hipercalemia: A causa pode persistir e produzir recorrência.',
          'refs': [
            'eq_hyperk'
          ]
        },
        {
          'id': 'eq2q3',
          'q': 'O papel do cálcio IV no tratamento da hipercalemia, quando indicado, é:',
          'o': [
            'Retirar potássio pela urina',
            'Substituir toda estratégia de eliminação',
            'Proteger o miocárdio sem baixar o potássio',
            'Definir que a doença renal é crônica'
          ],
          'a': 2,
          'explanations': [
            'Esse não é seu efeito principal nesse contexto.',
            'Proteção não elimina o excesso.',
            'A organização fisiológica separa proteção, redistribuição e eliminação.',
            'A intervenção não estabelece cronicidade.'
          ],
          'why': 'Retirar potássio pela urina: Esse não é seu efeito principal nesse contexto. Substituir toda estratégia de eliminação: Proteção não elimina o excesso. Proteger o miocárdio sem baixar o potássio: A organização fisiológica separa proteção, redistribuição e eliminação. Definir que a doença renal é crônica: A intervenção não estabelece cronicidade.',
          'refs': [
            'eq_hyperk'
          ]
        },
        {
          'id': 'eq2q4',
          'q': 'Bolsa didática com 40 mEq/L, velocidade pretendida de 10 mEq/h. A conta do volume é:',
          'o': [
            '40 mL/h',
            '250 mL/h, sem provar adequação clínica do volume',
            '1.000 mL/h em qualquer paciente',
            '10 mL/h por definição'
          ],
          'a': 1,
          'explanations': [
            '10 dividido por 40 L/h equivale a 0,25 L/h.',
            'A aritmética está correta; volume, acesso e protocolo ainda precisam ser avaliados.',
            'Não há indicação universal e a conta não resulta nesse valor.',
            'A concentração é necessária para converter dose em volume.'
          ],
          'why': '40 mL/h: 10 dividido por 40 L/h equivale a 0,25 L/h. 250 mL/h, sem provar adequação clínica do volume: A aritmética está correta; volume, acesso e protocolo ainda precisam ser avaliados. 1.000 mL/h em qualquer paciente: Não há indicação universal e a conta não resulta nesse valor. 10 mL/h por definição: A concentração é necessária para converter dose em volume.',
          'refs': [
            'eq_kcl'
          ]
        },
        {
          'id': 'eq2q5',
          'q': 'Hipocalemia persiste apesar de reposição. Qual dado pode explicar a dificuldade?',
          'o': [
            'Magnésio baixo e perdas persistentes',
            'A cor do tubo isoladamente',
            'Ausência obrigatória de qualquer perda renal',
            'TFGe automática sem olhar a tendência'
          ],
          'a': 0,
          'explanations': [
            'Magnésio baixo pode sustentar perda renal de potássio; perdas em curso também importam.',
            'A avaliação exige amostra e contexto completos.',
            'Perda renal é uma hipótese a investigar.',
            'Estimativa isolada não explica todos os mecanismos.'
          ],
          'why': 'Magnésio baixo e perdas persistentes: Magnésio baixo pode sustentar perda renal de potássio; perdas em curso também importam. A cor do tubo isoladamente: A avaliação exige amostra e contexto completos. Ausência obrigatória de qualquer perda renal: Perda renal é uma hipótese a investigar. TFGe automática sem olhar a tendência: Estimativa isolada não explica todos os mecanismos.',
          'refs': [
            'eq_hypok',
            'eq_mg'
          ]
        },
        {
          'id': 'eq2q6',
          'q': 'Na CAD com potássio de 3,0 mmol/L, o consenso de 2024 orienta:',
          'o': [
            'Iniciar insulina e ignorar o potássio',
            'Dar KCl concentrado diretamente',
            'Adiar a insulina e corrigir potássio conforme o protocolo específico',
            'Aplicar um esquema de hipercalemia'
          ],
          'a': 2,
          'explanations': [
            'Insulina pode agravar a hipocalemia.',
            'A diluição e a segurança da administração são obrigatórias.',
            'O consenso usa o limite de 3,5 mmol/L para essa decisão, com reposição e monitorização.',
            'Os cenários têm mecanismos e objetivos diferentes.'
          ],
          'why': 'Iniciar insulina e ignorar o potássio: Insulina pode agravar a hipocalemia. Dar KCl concentrado diretamente: A diluição e a segurança da administração são obrigatórias. Adiar a insulina e corrigir potássio conforme o protocolo específico: O consenso usa o limite de 3,5 mmol/L para essa decisão, com reposição e monitorização. Aplicar um esquema de hipercalemia: Os cenários têm mecanismos e objetivos diferentes.',
          'refs': [
            'eq_cad'
          ]
        }
      ]
    },
    {
      'id': 'equilibrio_m3',
      'layer': 'Eletrólitos e gasometria',
      'title': 'Magnésio, cálcio e fósforo: interprete em conjunto',
      'summary': 'Entenda interações, cálcio ionizado, reposição contextualizada e as armadilhas das unidades.',
      'goals': [
        'Relacionar magnésio baixo à hipocalemia persistente.',
        'Separar cálcio total, albumina e cálcio ionizado.',
        'Reconhecer hipofosfatemia e evitar uma reposição automática sem contexto.'
      ],
      'pretest': [
        'Cálcio total baixo sempre representa ionizado baixo?',
        'Gramas de sulfato de magnésio são gramas de magnésio elementar?',
        'Toda queda de fósforo na CAD exige reposição?'
      ],
      'sections': [
        {
          'h': 'A leitura conjunta explica o que um analito isolado não explica',
          'p': [
            'Magnésio participa de processos enzimáticos e da homeostase de potássio e cálcio. Sua deficiência pode contribuir para arritmias, hipocalemia de difícil correção e alterações da ação ou secreção de paratormônio. Revise perdas digestivas, diuréticos, álcool, nutrição e medicamentos.',
            'Fósforo participa do metabolismo energético e da função muscular. Queda sérica pode resultar de redistribuição, baixa oferta ou perdas. Durante realimentação ou tratamento de crise hiperglicêmica, a entrada intracelular pode reduzir a concentração mesmo quando o mecanismo é diferente de uma perda externa.'
          ]
        },
        {
          'h': 'Cálcio total, albumina e pH',
          'table': {
            'head': [
              'Achado',
              'Raciocínio',
              'Próximo passo'
            ],
            'rows': [
              [
                'Albumina baixa',
                'Pode reduzir o cálcio total sem reduzir proporcionalmente o ionizado.',
                'Não chamar toda queda do total de hipocalcemia biologicamente ativa.'
              ],
              [
                'Alcalemia',
                'Pode aumentar a ligação à albumina e reduzir o ionizado.',
                'Correlacione sintomas, pH e medida de ionizado.'
              ],
              [
                'Doença crítica ou discordância',
                'Fórmulas de correção por albumina podem ser imprecisas.',
                'Priorize avaliação com cálcio ionizado quando apropriado e disponível.'
              ]
            ]
          },
          'after': 'Este curso não usa uma fórmula universal de cálcio corrigido para substituir a medida de ionizado em toda situação. Confirme unidade, método e condições da amostra.'
        },
        {
          'h': 'Magnésio: dose do sal, via e tempo precisam estar escritos',
          'p': [
            'Como referência de reposição em adulto hemodinamicamente estável com hipomagnesemia sintomática, a revisão de 2018 descreve 1 a 2 g de sulfato de magnésio IV ao longo de 5 a 60 minutos. Um exemplo educacional conservador desse intervalo é 2 g em 60 minutos, seguido de reavaliação. A dose total e a manutenção dependem de déficit, perdas e função renal; esse exemplo não é o esquema de eclâmpsia, torsades ou parada.'
          ],
          'table': {
            'head': [
              'Achado',
              'Raciocínio',
              'Próximo passo'
            ],
            'rows': [
              [
                'Exemplo de concentração declarada',
                'Solução a 50% = 500 mg/mL de sulfato de magnésio.',
                '2 g do sal correspondem a 4 mL dessa apresentação, antes da diluição obrigatória.'
              ],
              [
                'Bula FDA de 2026',
                'Diluir a solução IV para concentração de 20% ou menos; a bula descreve limite geral de 150 mg/min.',
                'O exemplo de 2 g/60 min fornece cerca de 33 mg/min, mas concentração final e compatibilidade precisam ser conferidas.'
              ],
              [
                'Segurança',
                'Rim, diurese, magnésio e sinais clínicos de toxicidade.',
                'Reduzir e individualizar na disfunção renal; não repetir automaticamente.'
              ]
            ]
          },
          'after': 'As referências têm papéis distintos: revisão de 2018 para o exemplo de reposição e bula de 2026 para a preparação e seus limites. Revisão do protocolo institucional vigente permanece necessária.'
        },
        {
          'h': 'Hipocalcemia: uma referência de dose com indicação definida',
          'table': {
            'head': [
              'Dado conferido na bula FDA de 2026',
              'Uso e conta',
              'Cuidados'
            ],
            'rows': [
              [
                'Adulto com indicação de gluconato de cálcio IV por hipocalcemia',
                'Dose inicial descrita: 1 a 2 g do sal, individualizada.',
                'Não adotar essa dose automaticamente para hipercalemia.'
              ],
              [
                'Preparação de 100 mg/mL',
                '1 g do sal corresponde a 10 mL e contém cerca de 93 mg de cálcio elementar.',
                'Não trocar volume de gluconato por volume de cloreto de cálcio.'
              ],
              [
                'Bolus diluído',
                'A bula orienta diluir para 10 a 50 mg/mL e não exceder 200 mg/min em adulto.',
                'Acesso seguro, ECG e sinais vitais; esse limite não é uma velocidade obrigatória.'
              ],
              [
                'Compatibilidade',
                'Não misturar com bicarbonato ou fosfato.',
                'Conferir também interações e compatibilidade com ceftriaxona, conforme população e apresentação.'
              ]
            ]
          }
        },
        {
          'h': 'Fósforo: o número, o mecanismo e a preparação',
          'p': [
            'Fraqueza muscular, disfunção respiratória e contexto de realimentação ou crise metabólica podem tornar a hipofosfatemia relevante. A concentração sérica não informa sozinha a reserva corporal. A revisão histórica de 2010 é usada aqui para mecanismos e manifestações; não foi convertida em protocolo IV geral atual.'
          ],
          'table': {
            'head': [
              'Achado',
              'Raciocínio',
              'Próximo passo'
            ],
            'rows': [
              [
                'CAD, consenso de 2024',
                'Não recomenda reposição rotineira apenas por queda do fósforo.',
                'A indicação descrita envolve comprometimento muscular/cardiorrespiratório com fósforo abaixo de 1,0 mmol/L.'
              ],
              [
                'Quando indicada nesse contexto de CAD',
                'O consenso descreve 20 a 30 mmol de fosfato de potássio adicionados aos líquidos de reposição.',
                'Não é bolus; concentração, velocidade e compatibilidade dependem da preparação.'
              ],
              [
                'Risco da reposição',
                'Pode haver hipocalcemia e oferta adicional de potássio.',
                'Somar o potássio fornecido e acompanhar rim, cálcio e fósforo.'
              ]
            ]
          },
          'after': 'Posologia geral de fosfato fora da CAD, incluindo escolha de sal e velocidade em insuficiência renal: a confirmar em fonte atual específica antes de publicar um esquema numérico.'
        },
        {
          'h': 'Laudo resolvido: total baixo, ionizado preservado',
          'p': [
            'Pessoa fictícia com albumina baixa tem cálcio total abaixo do intervalo e cálcio ionizado dentro do intervalo informado pelo mesmo laboratório. Isso não estabelece uma indicação automática de cálcio IV. Integre sintomas, pH, tendência e qualidade da amostra. A decisão mudaria se houvesse redução real do ionizado com manifestações compatíveis.'
          ]
        },
        {
          'h': 'Realimentação: não olhe somente o potássio',
          'p': [
            'Após reinício de nutrição em uma pessoa com risco nutricional, acompanhe fósforo, magnésio, potássio, glicose, volume e manifestações clínicas. Uma queda temporal desses eletrólitos deve levantar a hipótese de redistribuição e risco de síndrome de realimentação. Este bloco ensina o reconhecimento; não define um protocolo nutricional ou de reposição para todas as pessoas.'
          ]
        },
        {
          'h': 'Como cai na prova',
          'list': [
            'Potássio refratário: o dado que falta pode ser magnésio.',
            'Cálcio total baixo com albumina baixa: pergunte pelo ionizado e pelo contexto.',
            'Hiperventilação com parestesias: o pH pode mudar o ionizado sem representar o mesmo mecanismo de perda corporal.',
            'Fosfato de potássio fornece dois componentes; calcular só fósforo pode ocultar excesso de potássio.'
          ]
        }
      ],
      'pitfalls': [
        'Confundir massa do sal com elemento.',
        'Substituir sempre cálcio ionizado por uma fórmula.',
        'Usar concentração da ampola como concentração final IV.',
        'Transportar a dose de fosfato da CAD para qualquer hipofosfatemia.'
      ],
      'refs': [
        'eq_mg',
        'eq_mgfda',
        'eq_ca',
        'eq_p',
        'eq_cad'
      ],
      'quiz': [
        {
          'id': 'eq3q1',
          'q': 'Albumina baixa, cálcio total baixo e ionizado dentro do intervalo do laboratório. Qual leitura é adequada?',
          'o': [
            'Administrar cálcio IV automaticamente',
            'Ignorar sintomas e pH para sempre',
            'Não há prova de ionizado baixo apenas pelo total; integrar o contexto',
            'Aplicar uma fórmula como medida perfeita'
          ],
          'a': 2,
          'explanations': [
            'O total pode refletir a fração ligada à proteína.',
            'A interpretação continua clínica e dinâmica.',
            'A discordância requer avaliação, sem assumir deficiência biologicamente ativa.',
            'Fórmulas têm limitações, especialmente na doença crítica.'
          ],
          'why': 'Administrar cálcio IV automaticamente: O total pode refletir a fração ligada à proteína. Ignorar sintomas e pH para sempre: A interpretação continua clínica e dinâmica. Não há prova de ionizado baixo apenas pelo total; integrar o contexto: A discordância requer avaliação, sem assumir deficiência biologicamente ativa. Aplicar uma fórmula como medida perfeita: Fórmulas têm limitações, especialmente na doença crítica.',
          'refs': [
            'eq_ca',
            'eq_gas'
          ]
        },
        {
          'id': 'eq3q2',
          'q': 'No exercício, 2 g de sulfato de magnésio são retirados de uma apresentação de 500 mg/mL. Qual volume antes da diluição?',
          'o': [
            '4 mL',
            '40 mL',
            '0,4 mL',
            '2 mL em qualquer concentração'
          ],
          'a': 0,
          'explanations': [
            '2.000 mg divididos por 500 mg/mL resultam em 4 mL.',
            'Há erro por fator dez.',
            'Há erro por fator dez.',
            'O volume depende da concentração rotulada.'
          ],
          'why': '4 mL: 2.000 mg divididos por 500 mg/mL resultam em 4 mL. 40 mL: Há erro por fator dez. 0,4 mL: Há erro por fator dez. 2 mL em qualquer concentração: O volume depende da concentração rotulada.',
          'refs': [
            'eq_mgfda'
          ]
        },
        {
          'id': 'eq3q3',
          'q': 'Gluconato de cálcio a 100 mg/mL: 10 mL contêm:',
          'o': [
            '1 g de cálcio elementar',
            '1 g do sal e cerca de 93 mg de cálcio elementar',
            'A mesma quantidade elementar que qualquer sal de cálcio',
            'Somente 10 mg do sal'
          ],
          'a': 1,
          'explanations': [
            'A massa do sal não é igual à do elemento.',
            'A bula informa 9,3 mg/mL de cálcio elementar nessa apresentação.',
            'Sais diferentes têm frações diferentes de cálcio.',
            '100 mg/mL vezes 10 mL resultam em 1.000 mg do sal.'
          ],
          'why': '1 g de cálcio elementar: A massa do sal não é igual à do elemento. 1 g do sal e cerca de 93 mg de cálcio elementar: A bula informa 9,3 mg/mL de cálcio elementar nessa apresentação. A mesma quantidade elementar que qualquer sal de cálcio: Sais diferentes têm frações diferentes de cálcio. Somente 10 mg do sal: 100 mg/mL vezes 10 mL resultam em 1.000 mg do sal.',
          'refs': [
            'eq_ca'
          ]
        },
        {
          'id': 'eq3q4',
          'q': 'Em CAD, uma queda isolada do fósforo exige reposição rotineira?',
          'o': [
            'Sim, independentemente de manifestações',
            'Não; avaliar contexto e critérios do consenso de 2024',
            'Sim, sempre em bolus',
            'Não é necessário considerar função renal'
          ],
          'a': 1,
          'explanations': [
            'O consenso não apoia essa aplicação automática.',
            'Comprometimento clínico e a concentração no contexto da CAD orientam a indicação.',
            'A reposição descrita é nos líquidos, com preparação e velocidade conferidas.',
            'Rim e oferta de potássio alteram a segurança.'
          ],
          'why': 'Sim, independentemente de manifestações: O consenso não apoia essa aplicação automática. Não; avaliar contexto e critérios do consenso de 2024: Comprometimento clínico e a concentração no contexto da CAD orientam a indicação. Sim, sempre em bolus: A reposição descrita é nos líquidos, com preparação e velocidade conferidas. Não é necessário considerar função renal: Rim e oferta de potássio alteram a segurança.',
          'refs': [
            'eq_cad'
          ]
        },
        {
          'id': 'eq3q5',
          'q': 'Uma solução IV contém fosfato de potássio. O que precisa entrar na conferência?',
          'o': [
            'Apenas o nome comercial',
            'Só o cálcio total',
            'Somente o volume',
            'Fósforo, potássio fornecido, rim, concentração e compatibilidade'
          ],
          'a': 3,
          'explanations': [
            'A preparação precisa de composição e concentração declaradas.',
            'O cálcio é importante, mas não é a única variável.',
            'Volume sem quantidade dos componentes não define a dose.',
            'A formulação oferece mais de um eletrólito e pode causar eventos adversos.'
          ],
          'why': 'Apenas o nome comercial: A preparação precisa de composição e concentração declaradas. Só o cálcio total: O cálcio é importante, mas não é a única variável. Somente o volume: Volume sem quantidade dos componentes não define a dose. Fósforo, potássio fornecido, rim, concentração e compatibilidade: A formulação oferece mais de um eletrólito e pode causar eventos adversos.',
          'refs': [
            'eq_cad'
          ]
        },
        {
          'id': 'eq3q6',
          'q': 'Parestesias durante alcalemia podem se relacionar a:',
          'o': [
            'Aumento obrigatório do estoque de cálcio',
            'Queda do ionizado por alteração da ligação à albumina',
            'Uma indicação fixa de fosfato',
            'Prova de infecção'
          ],
          'a': 1,
          'explanations': [
            'A alteração de ligação não representa esse aumento.',
            'O pH pode modificar a fração livre; integre medida e clínica.',
            'O mecanismo não define uma prescrição de fosfato.',
            'O achado é inespecífico e não confirma infecção.'
          ],
          'why': 'Aumento obrigatório do estoque de cálcio: A alteração de ligação não representa esse aumento. Queda do ionizado por alteração da ligação à albumina: O pH pode modificar a fração livre; integre medida e clínica. Uma indicação fixa de fosfato: O mecanismo não define uma prescrição de fosfato. Prova de infecção: O achado é inespecífico e não confirma infecção.',
          'refs': [
            'eq_ca',
            'eq_gas'
          ]
        }
      ]
    },
    {
      'id': 'equilibrio_m4',
      'layer': 'Eletrólitos e gasometria',
      'title': 'Gasometria e lactato: identifique distúrbios mistos',
      'summary': 'Leia a amostra, pH, bicarbonato, PaCO2, ânion gap e tendência do lactato com contas explicadas.',
      'goals': [
        'Distinguir acidemia de processo acidótico.',
        'Calcular ânion gap e compensação de Winter com unidades.',
        'Reconhecer distúrbio misto e os limites do lactato.'
      ],
      'pretest': [
        'pH perto do intervalo exclui distúrbio ácido-base?',
        'Toda PaCO2 baixa representa distúrbio respiratório primário?',
        'Lactato alto sempre significa falta de volume?'
      ],
      'sections': [
        {
          'h': 'A amostra e a pergunta vêm antes do pH',
          'p': [
            'Declare se a gasometria é arterial ou venosa, as condições de coleta, oxigênio administrado e o momento clínico. A PaO2 arterial não é substituída pela pressão de oxigênio venosa. Para as contas de compensação deste módulo, os exemplos são arteriais; os valores venosos não são tratados como idênticos aos arteriais.',
            'Bolhas, demora e mudanças na oferta de oxigênio ou ventilação podem alterar o significado. Compare bicarbonato da bioquímica e da gasometria quando houver discordância, lembrando que método e momento podem diferir.'
          ]
        },
        {
          'h': 'Acidemia não é sinônimo de uma causa única',
          'table': {
            'head': [
              'Padrão primário possível',
              'Mudança predominante',
              'Resposta a avaliar'
            ],
            'rows': [
              [
                'Acidose metabólica',
                'Bicarbonato reduzido.',
                'A ventilação tende a reduzir PaCO2; confira se é a resposta esperada.'
              ],
              [
                'Alcalose metabólica',
                'Bicarbonato aumentado.',
                'Avalie contexto de perdas, diuréticos e resposta ventilatória, sem assumir que toda PaCO2 alta seja primária.'
              ],
              [
                'Acidose respiratória',
                'PaCO2 elevada.',
                'O bicarbonato depende da resposta renal e do tempo de evolução.'
              ],
              [
                'Alcalose respiratória',
                'PaCO2 reduzida.',
                'Bicarbonato baixo pode ser compensação ou um segundo processo.'
              ]
            ]
          },
          'after': 'Acidemia e alcalemia descrevem o pH. Acidose e alcalose descrevem processos; eles podem coexistir e aproximar o pH do intervalo do laboratório. Este curso não aplica uma única regra de compensação a todos os distúrbios.'
        },
        {
          'h': 'Ânion gap: declare se a fórmula inclui potássio',
          'p': [
            'Neste bloco, AG = Na − (Cl + HCO3), com os três valores em mmol/L. Não inclui potássio. Compare com o intervalo do método do laboratório, pois a convenção e o método influenciam o intervalo. Um AG aumentado pode indicar ânions não medidos, como lactato ou cetoânions, mas não identifica sozinho a causa.'
          ],
          'table': {
            'head': [
              'Achado',
              'Raciocínio',
              'Próximo passo'
            ],
            'rows': [
              [
                'Laudo fictício',
                'Na 140; Cl 104; HCO3 12 mmol/L.',
                'AG = 140 − (104 + 12) = 24 mmol/L.'
              ],
              [
                'Intervalo didático desse laboratório',
                'AG de 8 a 12 mmol/L.',
                '24 está aumentado nesse laudo; o intervalo não é declarado universal.'
              ],
              [
                'Albumina baixa',
                'Pode reduzir o AG observado.',
                'Um resultado aparentemente dentro do intervalo pode ocultar ânions adicionais.'
              ]
            ]
          }
        },
        {
          'h': 'Correção pela albumina: unidade faz parte da fórmula',
          'p': [
            'O painel francês de 2019 descreve AG corrigido = AG + 0,25 × (40 − albumina em g/L). A expressão equivalente com albumina em g/dL é AG + 2,5 × (4 − albumina). São duas formas da mesma conta; não insira 2 g/dL na fórmula que exige g/L.'
          ],
          'table': {
            'head': [
              'Achado',
              'Raciocínio',
              'Próximo passo'
            ],
            'rows': [
              [
                'Exemplo com AG 24 e albumina 2 g/dL',
                '24 + 2,5 × (4 − 2) = 29 mmol/L.',
                'A correção aumenta a suspeita de ânions não medidos.'
              ],
              [
                'O mesmo exemplo em g/L',
                'Albumina 20 g/L: 24 + 0,25 × (40 − 20) = 29.',
                'O resultado coincide porque as unidades foram convertidas.'
              ]
            ]
          },
          'after': 'A correção estima uma influência da albumina; não identifica etiologia nem substitui o raciocínio sobre lactato, cetonas, rim e exposições.'
        },
        {
          'h': 'Winter: a pergunta é se há um segundo processo',
          'p': [
            'Na acidose metabólica, PaCO2 esperada = 1,5 × HCO3 + 8 ± 2 mmHg, conforme o painel francês. Com HCO3 de 12 mmol/L, a previsão é 26 ± 2 mmHg, isto é, 24 a 28 mmHg.'
          ],
          'table': {
            'head': [
              'Achado',
              'Raciocínio',
              'Próximo passo'
            ],
            'rows': [
              [
                'PaCO2 medida de 26',
                'Dentro da previsão.',
                'Resposta respiratória compatível com a estimativa; não prova a causa da acidose.'
              ],
              [
                'PaCO2 medida de 40',
                'Acima da previsão.',
                'Sugere acidose respiratória associada ou resposta ventilatória insuficiente; avaliar ventilação e contexto.'
              ],
              [
                'PaCO2 medida de 18',
                'Abaixo da previsão.',
                'Sugere alcalose respiratória associada.'
              ]
            ]
          },
          'after': 'A fórmula não deve ser aplicada como regra geral a toda gasometria nem usada para escolher isoladamente um ajuste ventilatório.'
        },
        {
          'h': 'Lactato: produção, depuração e contexto',
          'p': [
            'Lactato pode subir por hipoperfusão, estímulo adrenérgico, convulsões, alterações de depuração e outros mecanismos. A concentração isolada não identifica a causa, não confirma sepse e não informa diretamente um volume de reposição. Avalie perfusão, pressão, consciência, diurese, fígado, exposições e trajetória.',
            'A diretriz adulta SSC de 2021 consultada recomenda interpretar lactato no contexto e das outras causas de elevação. Neste bloco não apresentamos 30 mL/kg como uma consequência automática de um lactato alto nem extrapolamos recomendações pediátricas. Uma queda no valor também não prova resolução de todos os problemas.'
          ]
        },
        {
          'h': 'Laudo resolvido: dois processos, não compensação adequada',
          'p': [
            'Gasometria arterial fictícia: pH 7,10; bicarbonato 12 mmol/L; PaCO2 40 mmHg. A bioquímica contemporânea tem Na 140, Cl 104 e albumina 2 g/dL. Há acidemia com componente metabólico, AG de 24 e corrigido de 29. Winter prevê PaCO2 de 24 a 28, portanto a medida de 40 sugere componente respiratório acidótico associado. É necessário avaliar a pessoa e a ventilação; um número próximo de uma PaCO2 usual não é normal nesse contexto.'
          ]
        },
        {
          'h': 'Bicarbonato e causas: não trate apenas o número',
          'p': [
            'Bicarbonato de sódio não é uma resposta automática a todo pH baixo. Indicação, dose, ventilação, sódio, volume e causa precisam de avaliação específica. As referências sobre bicarbonato na CAD e as fichas contextualizadas continuam no Manual de prescrição; o esquema de CAD não é transportado para toda acidose.',
            'Para a prova, apresente: tipo de amostra, processo predominante, AG e unidade, compensação esperada, hipótese de mistura, causas possíveis e prioridade clínica. Diferencie o que foi calculado do que ainda depende de investigação.'
          ]
        }
      ],
      'pitfalls': [
        'Aplicar Winter fora de acidose metabólica.',
        'Comparar PaCO2 medida com um valor usual sem calcular o esperado.',
        'Inserir albumina em g/dL em fórmula para g/L.',
        'Transformar lactato isolado em diagnóstico ou dose de volume.'
      ],
      'refs': [
        'eq_gas',
        'eq_sepsis',
        'eq_cad'
      ],
      'quiz': [
        {
          'id': 'eq4q1',
          'q': 'Na 140, Cl 104 e HCO3 12, todos em mmol/L. AG sem potássio é:',
          'o': [
            '12',
            '24',
            '40',
            '−24'
          ],
          'a': 1,
          'explanations': [
            '12 é o bicarbonato do exemplo, não o resultado.',
            '140 − (104 + 12) = 24 mmol/L.',
            'Há erro na subtração.',
            'A ordem da fórmula foi invertida.'
          ],
          'why': '12: 12 é o bicarbonato do exemplo, não o resultado. 24: 140 − (104 + 12) = 24 mmol/L. 40: Há erro na subtração. −24: A ordem da fórmula foi invertida.',
          'refs': [
            'eq_gas'
          ]
        },
        {
          'id': 'eq4q2',
          'q': 'AG 24 e albumina 2 g/dL. Pela fórmula apresentada, o AG corrigido é:',
          'o': [
            '29 mmol/L',
            '24 mg/dL',
            '119 mmol/L',
            '19 mmol/L'
          ],
          'a': 0,
          'explanations': [
            '24 + 2,5 × (4 − 2) = 29.',
            'A unidade e a correção estão incorretas.',
            'Misturar g/dL e g/L produz erro grosseiro.',
            'Com albumina reduzida, a correção apresentada aumenta o AG.'
          ],
          'why': '29 mmol/L: 24 + 2,5 × (4 − 2) = 29. 24 mg/dL: A unidade e a correção estão incorretas. 119 mmol/L: Misturar g/dL e g/L produz erro grosseiro. 19 mmol/L: Com albumina reduzida, a correção apresentada aumenta o AG.',
          'refs': [
            'eq_gas'
          ]
        },
        {
          'id': 'eq4q3',
          'q': 'Na acidose metabólica, HCO3 é 12 e PaCO2 medida é 40. Winter prevê 24 a 28. Qual leitura?',
          'o': [
            'Compensação adequada porque 40 é um valor habitual',
            'Alcalose respiratória obrigatória',
            'Possível acidose respiratória associada',
            'A fórmula prova sepse'
          ],
          'a': 2,
          'explanations': [
            'A comparação deve ser com a previsão naquele bicarbonato.',
            'PaCO2 acima, não abaixo, do previsto sugere componente acidótico respiratório.',
            'A ventilação está insuficiente para a resposta estimada; integre a clínica.',
            'A fórmula avalia compensação, não etiologia.'
          ],
          'why': 'Compensação adequada porque 40 é um valor habitual: A comparação deve ser com a previsão naquele bicarbonato. Alcalose respiratória obrigatória: PaCO2 acima, não abaixo, do previsto sugere componente acidótico respiratório. Possível acidose respiratória associada: A ventilação está insuficiente para a resposta estimada; integre a clínica. A fórmula prova sepse: A fórmula avalia compensação, não etiologia.',
          'refs': [
            'eq_gas'
          ]
        },
        {
          'id': 'eq4q4',
          'q': 'pH perto do intervalo do laboratório com PaCO2 e bicarbonato alterados significa:',
          'o': [
            'Ausência garantida de distúrbio',
            'Possibilidade de processos compensados ou mistos',
            'Que não se deve ler os outros valores',
            'Diagnóstico único de ansiedade'
          ],
          'a': 1,
          'explanations': [
            'Processos opostos podem aproximar o pH do intervalo.',
            'É preciso ler o conjunto e avaliar a compensação no contexto.',
            'As demais variáveis continuam essenciais.',
            'O padrão não define uma causa única.'
          ],
          'why': 'Ausência garantida de distúrbio: Processos opostos podem aproximar o pH do intervalo. Possibilidade de processos compensados ou mistos: É preciso ler o conjunto e avaliar a compensação no contexto. Que não se deve ler os outros valores: As demais variáveis continuam essenciais. Diagnóstico único de ansiedade: O padrão não define uma causa única.',
          'refs': [
            'eq_gas'
          ]
        },
        {
          'id': 'eq4q5',
          'q': 'Lactato alto isolado permite:',
          'o': [
            'Prescrever volume fixo automaticamente',
            'Confirmar sepse sem história',
            'Inferir uma causa única',
            'Reconhecer alteração que exige interpretação da perfusão, causas e tendência'
          ],
          'a': 3,
          'explanations': [
            'Reposição depende do contexto e da resposta, não apenas do lactato.',
            'Elevação pode ocorrer por outras causas.',
            'Produção e depuração têm vários determinantes.',
            'A concentração e a trajetória ajudam sem substituir a avaliação.'
          ],
          'why': 'Prescrever volume fixo automaticamente: Reposição depende do contexto e da resposta, não apenas do lactato. Confirmar sepse sem história: Elevação pode ocorrer por outras causas. Inferir uma causa única: Produção e depuração têm vários determinantes. Reconhecer alteração que exige interpretação da perfusão, causas e tendência: A concentração e a trajetória ajudam sem substituir a avaliação.',
          'refs': [
            'eq_sepsis',
            'eq_gas'
          ]
        },
        {
          'id': 'eq4q6',
          'q': 'Qual uso de amostras é correto neste módulo?',
          'o': [
            'Tratar pressão de oxigênio venosa como PaO2 arterial',
            'Aplicar Winter a qualquer gasometria',
            'Declarar tipo de amostra e usar os exemplos arteriais na comparação apresentada',
            'Ignorar condições da coleta'
          ],
          'a': 2,
          'explanations': [
            'Oxigenação arterial e venosa respondem a perguntas diferentes.',
            'Winter é usado aqui para acidose metabólica.',
            'O contexto da amostra é necessário para a interpretação.',
            'Coleta e processamento podem alterar o significado do laudo.'
          ],
          'why': 'Tratar pressão de oxigênio venosa como PaO2 arterial: Oxigenação arterial e venosa respondem a perguntas diferentes. Aplicar Winter a qualquer gasometria: Winter é usado aqui para acidose metabólica. Declarar tipo de amostra e usar os exemplos arteriais na comparação apresentada: O contexto da amostra é necessário para a interpretação. Ignorar condições da coleta: Coleta e processamento podem alterar o significado do laudo.',
          'refs': [
            'eq_gas'
          ]
        }
      ]
    }
  ],
  'CASES': [
    {
      'id': 'eq_c1',
      'focus': 'Hiponatremia: a meta já foi atingida',
      'stem': 'Pessoa com hiponatremia crônica e desnutrição; sem dados de pacientes reais.',
      'ask': 'Sintetize o mecanismo, a prioridade e o que ainda falta confirmar.',
      'stages': [
        {
          'id': 'eq_c1s1',
          'h': 'Tendência durante tratamento',
          'text': 'Na passa de 108 a 114 mmol/L em 12 horas.',
          'ask': 'Qual leitura é mais segura?',
          'o': [
            'Aumento de 6 mmol/L; reavaliar a correção e a trajetória',
            'Faltam 21 mmol/L, então continuar automaticamente',
            'O risco só começa quando chega a 135'
          ],
          'a': 0,
          'explanations': [
            'A meta inicial do grupo de alto risco pode já ter sido atingida.',
            'Normalização rápida não é o objetivo e pode ultrapassar limites.',
            'O risco se relaciona à variação, duração e suscetibilidade, não só ao valor final.'
          ],
          'refs': [
            'eq_na',
            'eq_nalimit'
          ],
          'hint': 'Confira unidade, tempo, gravidade e o que o cálculo permite concluir. Separe hipótese, confirmação e ação prioritária.'
        },
        {
          'id': 'eq_c1s2',
          'h': 'Nova diurese aquosa',
          'text': 'Surge aumento importante de diurese e o sódio continua subindo.',
          'ask': 'O que mudou?',
          'o': [
            'Há cura comprovada sem necessidade de controle',
            'A aquarese pode acelerar a sobrecorreção; exige reavaliação',
            'Deve somar bolus de protocolos diferentes'
          ],
          'a': 1,
          'explanations': [
            'A reversão do mecanismo pode gerar subida excessiva.',
            'É preciso avaliar diurese, medidas seriadas e necessidade de intervenção supervisionada.',
            'Protocolos não devem ser somados e a resposta já exige reavaliação.'
          ],
          'refs': [
            'eq_na',
            'eq_nalimit'
          ],
          'hint': 'Confira unidade, tempo, gravidade e o que o cálculo permite concluir. Separe hipótese, confirmação e ação prioritária.'
        }
      ],
      'answer': [
        'A mudança observada é 6 mmol/L em 12 horas.',
        'Desnutrição aumenta o risco; meta e limite têm papéis diferentes.',
        'Aquarese pode acelerar a elevação além da prevista.',
        'O esquema de resgate vigente com desmopressina ficou a confirmar; não foi transformado em receita automática.'
      ]
    },
    {
      'id': 'eq_c2',
      'focus': 'Hipernatremia: o déficit não é a prescrição',
      'stem': 'Homem fictício de 60 kg, Na 154 mmol/L; o exercício declara fração de água corporal de 0,6.',
      'ask': 'Sintetize o mecanismo, a prioridade e o que ainda falta confirmar.',
      'stages': [
        {
          'id': 'eq_c2s1',
          'h': 'Faça a conta com a hipótese explícita',
          'text': 'Água corporal estimada = 36 L.',
          'ask': 'Qual é o déficit estimado pela fórmula apresentada?',
          'o': [
            '36 L',
            '3,6 L',
            '154 L'
          ],
          'a': 1,
          'explanations': [
            'Esse é o total estimado de água corporal, não o déficit.',
            '36 × (154/140 − 1) = 3,6 L.',
            'Concentração não equivale a volume.'
          ],
          'refs': [
            'eq_hyperna'
          ],
          'hint': 'Confira unidade, tempo, gravidade e o que o cálculo permite concluir. Separe hipótese, confirmação e ação prioritária.'
        },
        {
          'id': 'eq_c2s2',
          'h': 'A clínica acrescenta perdas e baixa perfusão',
          'text': 'Há perdas em curso e a duração não foi estabelecida.',
          'ask': 'O cálculo determina o que fazer sozinho?',
          'o': [
            'Sim, administrar 3,6 L imediatamente',
            'Não; avaliar perfusão, volemia, perdas, duração e resposta',
            'Sim, escolher a mesma velocidade para todo adulto'
          ],
          'a': 1,
          'explanations': [
            'A fórmula não define bolus nem prioridade de ressuscitação.',
            'O déficit é apenas uma parte do balanço e da decisão.',
            'Os dados em adultos e as situações clínicas não sustentam essa regra universal.'
          ],
          'refs': [
            'eq_hyperna'
          ],
          'hint': 'Confira unidade, tempo, gravidade e o que o cálculo permite concluir. Separe hipótese, confirmação e ação prioritária.'
        }
      ],
      'answer': [
        'O déficit didático é 3,6 L, usando a fração declarada.',
        'A fração corporal é uma estimativa, não uma constante para todas as pessoas.',
        'A conta não inclui perdas em curso nem escolhe uma velocidade de correção.',
        'Instabilidade e perfusão precisam de avaliação própria antes de simplesmente repor água livre.'
      ]
    },
    {
      'id': 'eq_c3',
      'focus': 'Hipercalemia: queda transitória não é eliminação',
      'stem': 'Adulto com LRA, potássio de 7,1 mmol/L e QRS alargado. A amostra também tem comentário de hemólise.',
      'ask': 'Sintetize o mecanismo, a prioridade e o que ainda falta confirmar.',
      'stages': [
        {
          'id': 'eq_c3s1',
          'h': 'Amostra imperfeita, contexto grave',
          'text': 'A equipe avalia o paciente e pode obter nova amostra adequada.',
          'ask': 'Qual atitude evita um erro?',
          'o': [
            'Esperar o dia seguinte por causa da hemólise',
            'Buscar suporte imediato e confirmar sem atrasar a avaliação',
            'Considerar o ECG como prova de cronicidade'
          ],
          'a': 1,
          'explanations': [
            'O contexto pode ser de emergência verdadeira.',
            'Artefato deve ser considerado sem ignorar LRA e alteração de condução.',
            'ECG não define duração da disfunção renal.'
          ],
          'refs': [
            'eq_hyperk'
          ],
          'hint': 'Confira unidade, tempo, gravidade e o que o cálculo permite concluir. Separe hipótese, confirmação e ação prioritária.'
        },
        {
          'id': 'eq_c3s2',
          'h': 'Após medida de redistribuição',
          'text': 'O potássio sérico cai após insulina, mas a excreção renal segue reduzida.',
          'ask': 'Qual conclusão é correta?',
          'o': [
            'O excesso já foi eliminado',
            'Não é mais necessário medir glicose',
            'A queda pode ser temporária; avaliar eliminação e monitorização'
          ],
          'a': 2,
          'explanations': [
            'Redistribuir não é eliminar.',
            'Hipoglicemia é uma complicação relevante.',
            'A causa e a capacidade de eliminação continuam importantes; pode haver recorrência.'
          ],
          'refs': [
            'eq_hyperk'
          ],
          'hint': 'Confira unidade, tempo, gravidade e o que o cálculo permite concluir. Separe hipótese, confirmação e ação prioritária.'
        }
      ],
      'answer': [
        'Considerar pseudohipercalemia não autoriza ignorar sinais de gravidade.',
        'Proteção cardíaca, redistribuição e eliminação são objetivos distintos.',
        'Insulina pode reduzir o valor temporariamente sem retirar o excesso corporal.',
        'A posologia emergencial na norma vigente ficou a confirmar; não usamos a dose de CAD ou de hipocalcemia como substituta.'
      ]
    },
    {
      'id': 'eq_c4',
      'focus': 'Hipocalemia refratária e magnésio',
      'stem': 'Pessoa em uso de diurético apresenta K de 2,6 mmol/L e magnésio abaixo do intervalo do laboratório.',
      'ask': 'Sintetize o mecanismo, a prioridade e o que ainda falta confirmar.',
      'stages': [
        {
          'id': 'eq_c4s1',
          'h': 'Entenda a persistência',
          'text': 'A hipocalemia não melhora como esperado após reposição.',
          'ask': 'O que investigar?',
          'o': [
            'Magnésio, perdas e causa da hipocalemia',
            'Apenas repetir potássio indefinidamente',
            'Supor que a função renal nunca interfere'
          ],
          'a': 0,
          'explanations': [
            'Deficiência de magnésio pode dificultar a correção; perdas também persistem.',
            'A falta de resposta exige rever mecanismo e segurança.',
            'Rim e diurese influenciam reposição e risco de excesso.'
          ],
          'refs': [
            'eq_hypok',
            'eq_mg'
          ],
          'hint': 'Confira unidade, tempo, gravidade e o que o cálculo permite concluir. Separe hipótese, confirmação e ação prioritária.'
        },
        {
          'id': 'eq_c4s2',
          'h': 'Conferência de uma conta, sem prescrição',
          'text': 'Uma bolsa didática contém 40 mEq/L; o exercício pede converter 10 mEq/h em mL/h.',
          'ask': 'Qual resposta inclui o limite da conta?',
          'o': [
            '250 mL/h, mas o volume e o protocolo ainda precisam ser adequados',
            '10 mL/h independentemente da concentração',
            'Administrar a ampola concentrada diretamente'
          ],
          'a': 0,
          'explanations': [
            '10/40 = 0,25 L/h; a aritmética não confirma adequação clínica.',
            'A conversão depende da quantidade por volume.',
            'KCl concentrado exige diluição e nunca é bolus IV direto.'
          ],
          'refs': [
            'eq_kcl'
          ],
          'hint': 'Confira unidade, tempo, gravidade e o que o cálculo permite concluir. Separe hipótese, confirmação e ação prioritária.'
        }
      ],
      'answer': [
        'Magnésio baixo pode contribuir para perda renal de potássio e correção difícil.',
        'A dose total exige contexto, rim, perdas e reavaliação.',
        'Uma concentração declarada permite converter mEq/h em volume/h.',
        'O resultado matemático pode ser inadequado para a pessoa; não determina a prescrição.'
      ]
    },
    {
      'id': 'eq_c5',
      'focus': 'Cálcio, albumina e realimentação',
      'stem': 'Pessoa com baixa oferta nutricional tem cálcio total abaixo do intervalo, albumina baixa e ionizado dentro do intervalo do laudo.',
      'ask': 'Sintetize o mecanismo, a prioridade e o que ainda falta confirmar.',
      'stages': [
        {
          'id': 'eq_c5s1',
          'h': 'Total e ionizado não contam a mesma história',
          'text': 'Não há manifestação atribuída a hipocalcemia na avaliação descrita.',
          'ask': 'Qual interpretação é melhor?',
          'o': [
            'Cálcio IV é obrigatório pelo total',
            'O total pode refletir a albumina; integrar ionizado, sintomas e pH',
            'Albumina baixa confirma excesso de cálcio'
          ],
          'a': 1,
          'explanations': [
            'O total isolado não estabelece essa indicação.',
            'É preciso separar a fração ligada e a fração livre no contexto.',
            'Essa conclusão não decorre dos dados.'
          ],
          'refs': [
            'eq_ca'
          ],
          'hint': 'Confira unidade, tempo, gravidade e o que o cálculo permite concluir. Separe hipótese, confirmação e ação prioritária.'
        },
        {
          'id': 'eq_c5s2',
          'h': 'Depois do reinício da nutrição',
          'text': 'Fósforo, magnésio e potássio caem em relação aos valores anteriores.',
          'ask': 'Qual hipótese merece avaliação?',
          'o': [
            'A nutrição exclui qualquer risco metabólico',
            'Apenas erro laboratorial é possível',
            'Redistribuição e risco de síndrome de realimentação'
          ],
          'a': 2,
          'explanations': [
            'A realimentação pode mudar rapidamente a distribuição de eletrólitos.',
            'Erro é um diferencial, mas o padrão temporal tem outras explicações.',
            'O conjunto e o contexto nutricional exigem avaliação e acompanhamento, sem dose universal.'
          ],
          'refs': [
            'eq_p',
            'eq_mg'
          ],
          'hint': 'Confira unidade, tempo, gravidade e o que o cálculo permite concluir. Separe hipótese, confirmação e ação prioritária.'
        }
      ],
      'answer': [
        'Albumina influencia cálcio total e não substitui a medida de ionizado.',
        'A decisão sobre cálcio integra sintomas, pH e exame confiável.',
        'Após realimentação, alterações conjuntas podem indicar redistribuição relevante.',
        'Reconhecer o risco não equivale a escolher um protocolo de nutrição ou reposição para todos.'
      ]
    },
    {
      'id': 'eq_c6',
      'focus': 'Gasometria mista e lactato',
      'stem': 'Gasometria arterial fictícia: pH 7,10; HCO3 12 mmol/L; PaCO2 40 mmHg. Bioquímica contemporânea: Na 140, Cl 104, albumina 2 g/dL.',
      'ask': 'Sintetize o mecanismo, a prioridade e o que ainda falta confirmar.',
      'stages': [
        {
          'id': 'eq_c6s1',
          'h': 'Cálculo e compensação',
          'text': 'O laboratório do exercício informa AG sem potássio com intervalo de 8 a 12 mmol/L.',
          'ask': 'Qual síntese é correta?',
          'o': [
            'AG 24, corrigido 29; PaCO2 acima da previsão de Winter',
            'AG normal e compensação obrigatoriamente adequada',
            'PaCO2 de 40 exclui componente respiratório'
          ],
          'a': 0,
          'explanations': [
            'As contas são 140 − 104 − 12 = 24; corrigido 29; Winter prevê 26 ± 2.',
            'O AG está acima do intervalo declarado e a PaCO2 está acima da previsão.',
            'O valor precisa ser comparado à resposta esperada para aquele bicarbonato.'
          ],
          'refs': [
            'eq_gas'
          ],
          'hint': 'Confira unidade, tempo, gravidade e o que o cálculo permite concluir. Separe hipótese, confirmação e ação prioritária.'
        },
        {
          'id': 'eq_c6s2',
          'h': 'O lactato está elevado',
          'text': 'Há lactato de 5 mmol/L. Ainda faltam perfusão, história, fígado, exposições e tendência.',
          'ask': 'Qual conclusão respeita os limites do exame?',
          'o': [
            'O lactato define sozinho uma dose fixa de volume',
            'É preciso integrar causa, perfusão e tendência; não assumir uma etiologia única',
            'Sepse está confirmada sem outros dados'
          ],
          'a': 1,
          'explanations': [
            'O valor não escolhe sozinho quantidade ou tipo de reposição.',
            'Produção e depuração podem contribuir; o contexto orienta a prioridade.',
            'Elevação de lactato não confirma infecção nem sepse por si só.'
          ],
          'refs': [
            'eq_gas',
            'eq_sepsis'
          ],
          'hint': 'Confira unidade, tempo, gravidade e o que o cálculo permite concluir. Separe hipótese, confirmação e ação prioritária.'
        }
      ],
      'answer': [
        'Há componente metabólico com AG aumentado no intervalo do exercício.',
        'Albumina em g/dL leva a AG corrigido de 29.',
        'PaCO2 de 40 está acima da previsão de 24 a 28, sugerindo componente respiratório acidótico associado.',
        'Lactato elevado ajuda a investigação, sem escolher sozinho diagnóstico, bicarbonato ou volume.'
      ]
    }
  ]
};
(()=>{
 'use strict';
 const base=window.MASTER_LAB_RENAL,extra=window.MASTER_LAB_EQUILIBRIO;
 Object.assign(base.REFS,extra.REFS);
 for(const kind of ['MODULES','CASES'])for(const item of extra[kind])if(!base[kind].some(old=>old.id===item.id))base[kind].push(item);
 base.displayTitle='Função renal, eletrólitos e gasometria';
})();
/* Regimes opcionais: preservam os IDs e as doses de outras indicações. */
(()=>{
 'use strict';
 const rx=window.MASTER_RX,r=window.MASTER_LAB_EQUILIBRIO.REFS;
 if(!rx)return;
 for(const id of ['eq_kcl','eq_mg','eq_mgfda'])rx.sources[id]={name:r[id].t,url:r[id].u};
 const extra=[['potassium',{
  context:'Reposição de potássio em adulto com K maior que 2,5 mEq/L, concentrado IV da bula FDA de 2026',
  dose:'A bula descreve velocidade de até 10 mEq/h e concentração de até 40 mEq/L, após diluição. Não usar esse esquema como regra para toda apresentação ou emergência.',
  course:'Quantidade total e reavaliação individualizadas pelo déficit, perdas, função renal e resposta.',
  use:'Diluir, misturar e usar bomba e acesso adequados. Nunca administrar KCl concentrado diretamente em bolus IV. Conferir mEq, volume e concentração da preparação.',
  care:'Monitorar potássio, rim, diurese e ECG quando indicado. A conta em mL/h não valida o volume para a pessoa. Não confundir com o regime específico de CAD.',
  sources:['eq_kcl'],status:'documental',reviewed:'16/11/2026'
 }],['magnesium',{
  context:'Hipomagnesemia sintomática em adulto hemodinamicamente estável, exemplo da revisão de 2018 com preparo conferido na bula de 2026',
  dose:'Exemplo: 2 g de sulfato de magnésio IV em 60 minutos, dentro do intervalo de 1 a 2 g em 5 a 60 minutos descrito na revisão. Individualizar conforme o contexto.',
  course:'Reavaliar resposta, perdas e necessidade de manutenção; não repetir automaticamente.',
  use:'Diluir para concentração de 20% ou menos conforme a bula da preparação. Não confundir gramas do sal com magnésio elementar. A bula descreve limite geral de 150 mg/min; isso não é uma velocidade obrigatória.',
  care:'Ajustar à função renal e monitorar magnésio, diurese e toxicidade. Não usar esse exemplo como esquema de torsades, eclâmpsia ou parada. Conferir protocolo institucional vigente.',
  sources:['eq_mg','eq_mgfda'],status:'documental',reviewed:'16/11/2026'
 }]];
 for(const [id,regimen] of extra){const drug=rx.drugs[id];if(!drug)continue;drug.regimens=drug.regimens||[];if(!drug.regimens.some(old=>old.context===regimen.context))drug.regimens.push(regimen);drug.sources=[...new Set([...drug.sources,...regimen.sources])];}
})();
