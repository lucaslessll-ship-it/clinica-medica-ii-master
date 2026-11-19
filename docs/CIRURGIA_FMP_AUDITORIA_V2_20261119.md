# Cirurgia Master — liberação segura do modo FMP e distratores v2

Data: 19/11/2026 · Versão editorial: `cir-fmp-20261119-v2`

## Escopo publicado

- Fonte autoral: 432 questões em `cir_questions.js`, **não modificadas**.
- Banco privado: 140 linhas na tabela `public.cir_bank`, das quais 46 `l120-*` marcadas `Em revisão` continuam excluídas pelo filtro antigo. Restam até 94 itens privados utilizáveis após autenticação.
- Banco disponível: 526 itens no total, se o login autorizado carregar o banco privado; sem login, 432 autorais.
- Curadoria de distratores: **29 itens versionados** (`cir-quality-v2.js`): 24 autorais + cinco baseados em itens privados. Não confundir com revisão de todos os 526 itens.
- Nenhum dado foi atualizado ou excluído no Supabase. Nenhum acerto, erro, sessão ou questão histórica foi apagado ou recalculado.
- O usuário recebe a questão com ID `<original>@fmp2` apenas se ainda não respondeu à família `<original>`. O índice do gabarito se mantém; as alternativas e, em alguns casos, o nível/competência editorial foram aprimorados.
- A fonte legada e suas alternativas continuam carregadas e são recuperáveis por ID para toda sessão anterior, inclusive provas não concluídas.
- Na interface, versão revisada é identificada como `Reformulada · padrão FMP`, distinguindo autoria da transcrição original.

## Proteção de estudantes ativos

1. **Respondeu antes da liberação:** manter `state.results[original]`, com o enunciado e as quatro alternativas originais; a versão revisada não é apresentada automaticamente no treino normal.
2. **Respondeu numa sessão ativa ainda não entregue:** `questionSessions[].run.ans` ou `run.done` bloqueiam a troca da família para aquele aluno.
3. **Iniciou sessão sem responder:** os identificadores armazenados na sessão continuam apontando para o material original por `byId`, mesmo que um novo treino use `@fmp2`.
4. **Nunca respondeu:** o seletor usa a versão revisada. `state.results` recebe a chave `@fmp2` quando responder; isso não altera histórico de outras versões.
5. **Histórico/limpeza:** o mecanismo existente `QuestionHistory` permanece, inclusive restauração de sessões, revisão e limpeza explicitamente solicitada pelo usuário.
6. **Planejamento:** considera a versão ativa para não sugerir erroneamente como inédita uma versão já respondida; aceita IDs antigos de listas de estudo programado.
7. **Sincronização:** preserva a chave `master_cir_lucas_v1`, e os campos `results` e `questionSessions`. Não foi introduzida migração destrutiva.

Regra de manutenção futura: **não apagar nem reescrever as questões-base cujos IDs já foram entregues aos alunos**. Evoluções de conteúdo devem usar sufixos v3, v4 etc. Se uma questão exigir correção urgente de gabarito, suspender a oferta a novos usuários e sinalizar as respostas históricas para revisão pedagógica; nunca recorreção silenciosa.

## Modo novo — Prova FMP (matriz experimental)

O treino livre de 20/40/60 questões permanece igual.

A nova opção `Prova FMP · 30 questões / 90 min` é opt-in. O sorteio é feito sem repetição dentro da sessão e emprega:

| Eixo | Itens |
| --- | ---: |
| Trauma abdominal | 2 |
| Trauma torácico | 2 |
| Coloproctologia | 4 |
| Hérnias | 4 |
| REMIT / cicatrização / queimaduras | 4 |
| Outros eixos de Cirurgia, quatro temas distintos sorteados | 4 |
| Radiologia | 5 |
| Urologia | 5 |
| **Total** | **30** |

Os quatro grandes eixos são **temáticos, não quatro casos originais comprovadamente encadeados**. A matriz reproduz os números relatados para Radiologia e Urologia, mas essa proporção ainda não foi verificada nas provas oficiais completas. As 35 questões históricas transcritas no Notion (Med 59/60/61) são material de referência editorial; sua integridade e a atribuição às provas não foram verificadas contra todos os PDFs originais.

## Critérios editoriais da revisão v2

- Alternativas erradas devem representar hipóteses ou intervenções *plausíveis*, mas falhar por gravidade, momento, contraindicação, critério anatômico ou exame adequado.
- Evitar condutas absurdas, sinais óbvios como 'sempre/nunca' em todos os erros e pistas por tamanho da alternativa.
- Manter **uma única melhor resposta**, sem tornar duas alternativas igualmente defensáveis.
- Manter uma parcela de perguntas diretas N1, além de N2/N3 clínico-cirúrgicas.
- Os níveis incluídos nos 29 itens são **editoriais e provisórios**; não são calibração estatística de todos os 526.
- Questões clínicas devem ser revisadas com diretrizes e protocolos vigentes, preservando a distinção entre conduta atual e gabarito histórico.

## Ensaios realizados

Verificação programática de sintaxe e comportamento do motor JS, incluindo dados reais de leitura de 140 registros privados:
- 432 itens públicos; 526 itens em contexto autorizado.
- 29 versões novas e nenhum ID original removido.
- 30 perguntas distintas no modo FMP, com cinco de Radiologia, cinco de Urologia e vinte de Cirurgia; duração de 90 minutos.
- Respostas antigas no banco autoral e privado mantêm ID original.
- Sessão antiga não respondida pode ser aberta com o enunciado original.
- Testes de regressão permanentes em `tests/cir-fmp-v2.test.cjs`.

**Não realizado:** validação de deploy real no navegador, Playwright/iPad em produção, teste A/B ou medição psicométrica real dos distratores. As 29 reformulações devem ser reavaliadas com escolhas reais dos alunos e revisão clínica humana.

## Pendências e próximos passos

1. Realizar auditoria editorial progressiva dos **497 itens que permaneceram intactos**, priorizando itens com distratores absurdos, alternativas gramaticalmente desiguais e alta relevância de prova.
2. Catalogar comprovadamente provas originais por turma/ano; não usar etiqueta `Questão de prova` como certificação de origem sem documento correspondente.
3. Acrescentar imagens **verificadas e licenciadas** às questões de Radiologia. O banco existente de Radiologia é textual; não atribuir às imagens inexistentes o status de conferidas.
4. Elaborar grupos de casos com um mesmo enunciado-base e perguntas sequenciais, quando isso for confirmado como padrão efetivo da avaliação.
5. Medir proporção de acertos, discriminação item-total e atratividade de cada distrator com tamanho amostral suficiente, versão de item separada e consentimento/privacidade adequados.
6. Calibrar a proporção N1/N2/N3 por dados reais; evitar taxonomia automática apresentada como validação científica.

## Referências internas

- Notion: `Engenharia Reversa P2 — Revisão Master | Casos + 120 questões`.
- Notion: `Questões` com transcrições identificadas como Med 59, 60 e 61.
- Código: `cir_app.js`, `cir_questions.js`, `cir-quality-v2.js`, `question-history.js`, `cir_data.js`.
