# Exames prioritários para as provas de Cirurgia

Entrega de 16/11/2026. Foco na escrita de 19/11/2026 e na prática de 04/12/2026. Conteúdo, questões, padrões de enunciado e laudos são autorais e fictícios; revisão docente externa pendente.

## O que entrou

Três aulas com pré-teste, nove seções, quatro padrões de treino com pegadinha e resposta esperada, seis questões comentadas e links para os capítulos correspondentes de Cirurgia:

1. Pancreatite: critérios diagnósticos, lipase, BUN/ureia, Ranson não biliar de admissão, BISAP e Atlanta.
2. Icterícia e perfil hepático: lesão, colestase, síntese, razão R, risco de coledocolitíase ASGE e grupos diagnósticos TG18.
3. Coagulação e hemorragia: TP/INR, TTPa, plaquetas, fibrinogênio, hemoglobina seriada, contexto transfusional, TXA e preparo eletivo.

Acrescentadas 18 questões e seis casos progressivos com 12 decisões. O Laboratório de Exames passa a reunir dez aulas, 60 questões, 17 casos e 34 decisões. As sete aulas e 11 casos anteriores preservam IDs, ordem, enunciados e respostas.

## Como aproveitar agora

- No painel Hoje da primeira página, o botão de exames da prova abre a próxima aula prioritária ainda não marcada como estudada.
- Laboratório Master e Laboratório de Exames mostram uma revisão com três caminhos. A ordem usa os pesos efetivamente cadastrados em `cir_data.js`: Pâncreas primeiro, seguido de abdome agudo/vias biliares e trauma/hemostasia, conforme os pesos atuais. Não é previsão de incidência.
- A partir de 20/11, o destaque muda para a prática de 04/12 e leva ao próximo caso pendente; depois de 04/12, o destaque deixa de aparecer. As aulas continuam disponíveis.
- Datas são interpretadas em America/Sao_Paulo, e as datas de prova vêm do cadastro de Cirurgia.
- Cada aula tem botão para abrir o capítulo relacionado de Cirurgia. O armazenamento e o login continuam sendo os já existentes, sem migração.
- Apenas respostas geram tentativas e acertos. Abrir a prioridade ou consultar uma aula não gera acerto automático.

## Cálculos e critérios conferidos

| Informação usada | Fonte e limite de aplicação |
| --- | --- |
| Diagnóstico de pancreatite: dois de três, incluindo enzima pelo menos três vezes o limite do laboratório | Revisão de Atlanta, Souza e colaboradores, 2016. Não é obrigatório exigir todos os três critérios em toda apresentação. |
| Atlanta grave: falência orgânica persistente além de 48 h | Mesma referência. Um escore de risco ou lipase alta não substitui a classificação. |
| Ranson não biliar na admissão: idade acima de 55, leucócitos acima de 16.000/mm³, glicose acima de 200 mg/dL, LDH acima de 350 U/L e AST acima de 250 U/L | Tabela de Chatila e colaboradores, 2019. Lista clássica, separada da avaliação de 48 h; não misturar com versão biliar. |
| BISAP: BUN acima de 25 mg/dL, estado mental, SIRS, idade acima de 60 e derrame pleural | Chatila, 2019. BUN não é ureia total com o mesmo número. Não foi inventada conversão nova ou probabilidade individual de morte. |
| ASGE: cálculo em imagem OU colangite OU bilirrubina total acima de 4 mg/dL E colédoco dilatado; acima de 6 mm no adulto com vesícula in situ no contexto da diretriz | ASGE, 2019. Bilirrubina isolada não é o critério composto; não aplicar um diâmetro a todo contexto pós-operatório ou idade. |
| TG18: suspeita A + B ou C; definido A + B + C | Tabela 1 da fonte secundária de Hudgi, 2022. Grupos: inflamação, colestase e imagem; não confundir diagnóstico com grau de gravidade. |
| Razão R = (ALT/LSN ALT)/(FA/LSN FA); acima de 5 hepatocelular, abaixo de 2 colestático, entre 2 e 5 misto no texto consultado | Orientação AASLD em lesão por fármacos, 2023. Exercício de normalização, sem usar o padrão como prova etiológica ou de obstrução. Casos ficam longe das fronteiras de classificação. |
| Referência restritiva de Hb 70 g/L, alvo 70 a 90; uma unidade e reavaliação em adulto sem sangramento ativo | NG24, capítulo de hemácias, itens vigentes assinalados como 2015. Não aplicar a hemorragia maior, síndrome coronariana aguda ou transfusão crônica como regra única. |
| Considerar plaquetas acima de 50 × 10⁹/L para cirurgia/procedimento em situações selecionadas | NG24, capítulo de plaquetas. Existem outros limiares para risco e sítios específicos; não é autorização universal de operar. |
| Trauma com sangramento maior e déficit funcional ou fibrinogênio Clauss até 1,5 g/L: referência inicial de 3 a 4 g, com reavaliação | Diretriz europeia de 2023. Contexto definido, sem prescrever pelo número isolado nem uniformizar contagem de bolsas de crioprecipitado. |
| TXA no trauma elegível: 1 g IV em 10 min, seguido de 1 g em 8 h, o mais cedo possível e dentro de 3 h | Recomendação 23 da diretriz europeia de 2023, já presente na ficha do Manual. Não transportar para qualquer hemorragia. |
| 70 g/L = 7 g/dL; fibrinogênio 1,2 g/L = 120 mg/dL | Conversões de massa e volume explicitadas nos exercícios, sem alterar o contexto de indicação. |

Referências completas e escopos em `MASTER_LAB_CIRURGIA.REFS`. Textos consultados fora do repositório público: `/workspace/entregas/lab-cirurgia-fontes/`.

## Consistência com as aulas existentes

Foram corrigidas duas frases em `lesson-deep-cir-7.js`: Ranson alto indica maior risco e não define sozinho Atlanta grave; ausência de manifestações clássicas não afasta universalmente colangite. O índice público do assistente foi regenerado para acompanhar essas correções, mantendo 547 blocos e 175 aulas no corpus já suportado. Não se declara que as novas aulas de laboratório foram adicionadas a esse corpus, cujo extrator não abrange os laboratórios.

## Limites e pendências

- Cortes da variante biliar de Ranson continuam a confirmar; não foram misturados na lista não biliar. A aula de laboratório não duplica toda a tabela numérica de 48 h; a avaliação temporal e o capítulo relacionado continuam disponíveis.
- ACG 2024 e critérios TG18 foram consultados por fontes secundárias abertas, identificadas como tais; não se declara leitura dos documentos primários.
- Preparo e velocidade do concentrado de fibrinogênio dependem da apresentação; uma diluição universal não foi inventada. Equivalência em bolsas de crioprecipitado depende da oferta local.
- Não foi criado prazo universal de suspensão nem esquema universal de reversão de anticoagulantes.
- Revisão docente independente ainda pendente. Não há previsão validada de questões da prova.
- Nenhuma imagem nova, migração ou modificação de dados reais no Supabase.

## Validação

A validação inclui a suíte completa em CI, os dois validadores Python, a sintaxe dos arquivos JS e o build otimizado. A cobertura acrescenta oito testes do laboratório e um teste específico do build; os resultados completos ficam registrados no PR desta entrega. Foram verificados pesos do currículo, datas em São Paulo, retomada, respostas, preservação do progresso, busca, carregamento dos capítulos relacionados, 320/390/820/1280 px, temas claro/escuro, teclado, fonte mínima e toque. Autenticação e dados dos testes são simulados.

A publicação preserva as atualizações recebidas na main, incluindo carregamento otimizado, revisões adaptativas, correção de ECG F12, retirada do exercício genérico de descrição do POCUS, modo foco, salvamento automático, tipografia e conexões entre aulas. O build e os fluxos afetados são verificados após essa integração.

## Onde parei e o que falta

Pronto para estudo: bloco prioritário de pâncreas, via biliar e hemostasia, com atalho no Hoje, três aulas, 18 questões e seis casos novos. Total atual do laboratório: dez aulas, 60 questões e 17 casos.

O plano completo de 36 módulos ainda tem expansões futuras. Permanecem a revisão docente, as confirmações acima e os esquemas farmacológicos pendentes documentados no bloco anterior. Este lote prioriza o que é útil para as próximas provas.
