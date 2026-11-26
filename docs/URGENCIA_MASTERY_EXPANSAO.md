# Clínica Master — expansão de Urgência e Emergência

A expansão dá sequência ao piloto de Arritmias na branch `feat/urgencia-mastery-arritmias`. O escopo contempla os 23 temas de Urgência, com P2 na ordem aprovada e P1 como revisão complementar.

## Entrega e cobertura

- 23 cadernos com rotas próprias, Essencial, Alto rendimento, Masterclass, casos, condutas, farmacologia, referências, percurso individual, anotações e acesso por assunto ao treino, flashcards e simulados. A página da disciplina, o menu e o planejador usam o catálogo de Urgência.
- 460 flashcards, 20 por tema. As novas coleções combinam recuperação conceitual, decisões do fluxograma, casos da aula e itens de aplicação, com progressão e revisão de erros por assunto.
- 226 questões Mastery autorais, com cinco alternativas individualmente comentadas. Os 20 itens de Arritmias permanecem com seus IDs. Foram acrescentados 206 itens. Há 200 na P2, com 20 por tema, e 26 na P1, com dois por tema. Os 172 itens legados continuam disponíveis com seu histórico, totalizando 398 itens corrigíveis.
- Simulados prontos por assunto e opções multitemáticas de 20 itens para P1 e P2. A correção, o cronômetro, as marcações e a retomada usam o motor já validado no piloto. A meta e o progresso continuam independentes entre temas.
- Atlas com SVGs, diagramas e novos exames licenciados de congestão, ultrassom pulmonar e afogamento. O POCUS de fibrose é identificado como exemplo de linhas B de outra etiologia. A licença, autoria e alterações estão registradas no atlas e em [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md).
- Calculadoras e práticas de interpretação em QTc, gasometria, hiperglicemia, hipernatremia, IRpA, ventilação mecânica e START adulto. Os conjuntos exibem unidades, fórmula ou regra, referência e limitações conforme a ferramenta.

| P2 em ordem | Total | N1/N2/N3 | Cobertura em destaque |
| --- | ---: | --- | --- |
| Arritmias cardíacas | 20 | 4/10/6 | ECG, instabilidade, FA, QRS largo, bloqueios, eletricidade |
| Dor torácica e síndrome coronariana aguda | 20 | 3/10/7 | ECG seriado, territórios, troponina, reperfusão, SCA, aorta e TEP |
| Emergência hipertensiva e edema agudo pulmonar | 20 | 4/11/5 | Lesão aguda, metas por fenótipo, pós-carga, nitratos, VNI e POCUS |
| Gasometria e distúrbios acidobásicos | 20 | 4/10/6 | Processo primário, Winter, AG, albumina, delta ratio e mistos |
| Distúrbios eletrolíticos graves | 20 | 3/12/5 | Potássio, cálcio, sódio, magnésio e vigilância de correção |
| Emergências glicêmicas | 20 | 3/10/7 | CAD, EHH, osmolalidade, fluidos, K, insulina, hipoglicemia, resolução |
| Intoxicações exógenas | 20 | 2/11/7 | Segurança, toxíndromes, ventilação, ECG, descontaminação e seguimento |
| Emergências tireoidianas | 20 | 3/12/5 | Tempestade, mixedema, iodo, betabloqueio, ventilação e eixo adrenal |
| Atendimento a catástrofes | 20 | 5/11/4 | Segurança de cena, START, retriagem, comando e transporte |
| Cuidados paliativos | 20 | 2/13/5 | Metas, autonomia, comunicação, sintomas e proporcionalidade |

A matriz reflete os níveis atribuídos ao raciocínio de cada item. A produção autoral usou a bibliografia indicada nos cadernos. A engenharia reversa de provas e a homologação docente institucional seguem pendentes.

## Integração e preservação

- `emergency-mastery.js`, `emergency.js`, `app.js`, `course-kit.js`, `index.html`, `emergency-visual-data.js` e `emergency-mastery.css` integram as rotas, o atlas, o layout e a navegação. O caderno dá acesso explícito à aula e à fixação originais, inclusive a experiência anterior de PCR.
- `emergency-mastery-topics.js`, `emergency-mastery-assessments.js`, `emergency-mastery-p2-exams.js` e `emergency-mastery-library.js` mantêm conteúdo, questões autorais e mapeamento versionado. `emergency-mastery-calculators.js` contém ferramentas e unidades.
- `emergency-bank.js`, `master-planner.js`, `notas.js`, `caderno-unificado.js` e `hig.js` integram simulados, planejamento e anotações. Os mesmos dados por conta e as chaves do piloto sustentam o progresso.
- Os demais módulos mantêm os fluxos existentes. A entrega usa a branch dedicada e conserva a produção, o banco de produção e o ApexMed.

## Validação e limites

- Build Vite, sintaxe JavaScript e integridade do diff.
- Os 45 testes dirigidos passaram. A bateria cobre as 23 rotas, as 460 cartas, as 200 questões da P2, o isolamento da P1/P2, a correção, o banco preservado, a retomada, o planejador, o OSCE e a navegação de Clínica Médica.
- A autenticação dos testes de navegador é simulada. A conta real entre dispositivos e a revisão docente do novo banco seguem pendentes.
- O acervo anterior continua acessível. O atlas novo utiliza esquemas autorais quando faltam exames adequados com autorização conferida. A farmacologia destaca indicações, mecanismo e segurança com referências para detalhamento. A expansão não funciona como manual completo de posologia.
