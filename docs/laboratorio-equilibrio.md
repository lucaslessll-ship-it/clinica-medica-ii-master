# Laboratório Master: eletrólitos e gasometria

Continuação do bloco renal, em 16/11/2026. Texto, questões e laudos autorais; pessoas e resultados fictícios. Revisão docente externa pendente.

## Entrega

Quatro aulas novas, cada uma com três perguntas de pré-teste, oito seções e seis questões com explicação das quatro alternativas:

1. Sódio e água: tonicidade, sintomas, metas e limites de correção, bolus em protocolos distintos e déficit de água.
2. Potássio: artefato, redistribuição, perdas, ECG, eliminação e segurança da reposição.
3. Magnésio, cálcio e fósforo: interações, cálcio ionizado, massa do sal versus elemento e reposição contextualizada.
4. Gasometria e lactato: amostra arterial/venosa, processos mistos, ânion gap, correção por albumina, Winter e limites do lactato.

Seis casos progressivos novos, com duas decisões cada: hiponatremia com risco de sobrecorreção; déficit de água; hipercalemia; hipocalemia e magnésio; cálcio e realimentação; gasometria mista e lactato.

O laboratório passa a ter sete aulas, 42 questões, 11 casos e 22 decisões. Contadores são calculados pelos dados; não ficam fixados em três aulas ou cinco casos.

## Integração

- Mesma rota `#labrenal`, menu, busca, login, temas e armazenamento de progresso.
- Os três módulos e cinco casos anteriores conservam IDs, ordem e questões. Nenhuma resposta anterior é reindexada.
- Campos opcionais e conteúdo novo são acrescentados por `lab-equilibrio-data.js`, antes da inicialização do CourseKit.
- Inclusão idempotente por ID; não duplica módulos, casos ou regimes farmacológicos se o arquivo for avaliado novamente.
- Tempo de leitura calculado pelo mecanismo existente.
- Justificativas, ajuda, tentativas, revisões e limites de armazenamento usam o mecanismo já validado do laboratório renal.
- Dois regimes opcionais acrescentados às fichas já existentes: KCl IV na preparação FDA de 2026 e exemplo IV de magnésio para pessoa estável. Permanecem separados dos regimes de CAD, deficiência leve, torsades e outras indicações.

## Conferência dos números

| Item publicado | Fonte e limite de aplicação |
| --- | --- |
| NaCl 3%: 100 mL em 10 min versus 150 mL em 20 min | Compilação de Hoorn e Zietse, 2017, tabela comparativa, e revisão de Sumi, 2025. Esquemas alternativos, sem somar protocolos; repetição condicionada à resposta. |
| Meta inicial aproximada de 4 a 6 mmol/L; alto risco com limite de 8 em qualquer 24 h; limite europeu de 10 no primeiro dia e 8 nos seguintes | Sterns, 2024, e Sumi, 2025. Meta não é limite; vigilância de sódio e diurese é parte do manejo. |
| Déficit de água = água corporal estimada × (Na/140 − 1) | Yun, 2023. Fração de água 0,6 declarada como hipótese do exercício; perdas em curso e perfusão não estão resolvidas pela fórmula. Sem velocidade universal de correção em adultos. |
| KCl IV: até 10 mEq/h e 40 mEq/L, quando K é maior que 2,5 mEq/L | Bula específica DailyMed/FDA de 09/11/2026. Diluição obrigatória; volume da conta não valida adequação à pessoa. |
| CAD: K abaixo de 3,5 mmol/L, reposição de 10 mmol/h e adiar insulina até acima de 3,5 | Consenso internacional de 2024. Indicação específica; não transferir para toda hipocalemia. |
| Magnésio: exemplo de 2 g IV em 60 min em pessoa estável com hipomagnesemia sintomática | Tabela 5 da revisão de Hansen e Bruserud, 2018: intervalo de 1 a 2 g em 5 a 60 min. Não é esquema de parada, torsades ou eclâmpsia. |
| Sulfato de magnésio a 50% = 500 mg/mL; diluição IV para 20% ou menos e limite geral de 150 mg/min | Bula específica DailyMed/FDA de 04/11/2026. 2 g correspondem a 4 mL antes de diluir, cerca de 33 mg/min se administrados em 60 min. Individualizar na disfunção renal. |
| Gluconato de cálcio 1 a 2 g iniciais na hipocalcemia adulta; 100 mg/mL do sal, 9,3 mg/mL de elemento; máximo de 200 mg/min e diluição de bolus para 10 a 50 mg/mL | Bula específica DailyMed/FDA de 29/10/2026. Não transportar para hipercalemia; acesso seguro, ECG e compatibilidades precisam ser conferidos. |
| Fosfato em CAD: contexto de fraqueza/comprometimento cardiorrespiratório com fósforo abaixo de 1,0 mmol/L; 20 a 30 mmol nos líquidos quando indicado | Consenso de 2024. Não é reposição rotineira, não é bolus e não equivale a um esquema geral de hipofosfatemia. |
| AG = Na − Cl − HCO3; correção pela albumina: +0,25 × (40 − albumina g/L), equivalente a +2,5 × (4 − albumina g/dL) | Painel francês, 2019. Usar unidade correta; o intervalo 8 a 12 é atribuído ao laboratório fictício do exercício, sem torná-lo universal. |
| Winter: PaCO2 esperada = 1,5 × HCO3 + 8 ± 2 | Painel francês, 2019. Usar na acidose metabólica e comparar com amostra arterial no exercício. Não aplicar a todos os distúrbios. |
| Lactato 5 mmol/L e demais valores dos casos | Resultados fictícios, sem valor universal de decisão. Discussão contextual apoiada na SSC adulta de 2021, sem inferir uma dose de volume do lactato isolado. |

Referências com links e escopo estão em `MASTER_LAB_EQUILIBRIO.REFS`. Os textos consultados e rótulos de origem ficam fora do repositório público, em `/workspace/entregas/lab-equilibrio-fontes/` e `/workspace/entregas/posologia-fontes/`.

## O que permaneceu a confirmar

- Posologia emergencial vigente de cálcio e insulina na hipercalemia: o documento primário UKKA 2023 estava bloqueado. A conferência KDIGO de 2020 é usada para mecanismos, sem rotular suas doses como atuais. Não se usa a dose de CAD ou hipocalcemia para preencher essa lacuna.
- Dose de desmopressina no resgate de sobrecorreção da hiponatremia em norma primária atual.
- Esquema geral atual de fosfato fora da CAD, incluindo preparação e ajuste renal. A revisão de 2010 foi usada somente para mecanismos e manifestações.
- Produto e dose oral específicos de KCl, caso sejam acrescentados futuramente. A bula conferida neste lote é da preparação IV concentrada.
- Protocolo institucional vigente de reposição IV de magnésio. O exemplo tem fonte de 2018 e preparo conferido na bula de 2026, com esses anos declarados.
- Revisão docente independente. Nenhum texto é apresentado como avaliado por professor.

Não houve upload de imagens, nova tabela ou modificação de dados reais no Supabase. Não foi recriado o simulador de antibiograma.

## Validação

170 testes aprovados na suíte completa, incluindo sete novos. Validadores validar.py e validar_v7.py aprovados; sintaxe conferida nos 83 arquivos JS do app. Casos, questões, busca, contadores, persistência, IDs anteriores e regimes opcionais testados com autenticação simulada e bloqueio do Supabase real. Verificados 320, 390, 820 e 1280 px, temas claro/escuro, teclado, fontes de pelo menos 12 px e alvos de 44 px.

## Onde parei e o que falta

Concluída a ampliação de eletrólitos e gasometria no laboratório renal: quatro aulas, 24 questões e seis casos novos, preservando o bloco anterior.

Ainda não foram entregues neste lote: coagulação, função hepática e marcadores pancreáticos; expansão completa do catálogo do plano de 36 módulos; revisão docente e confirmação dos esquemas listados acima. Esses itens são etapas futuras, não partes declaradas como prontas.
