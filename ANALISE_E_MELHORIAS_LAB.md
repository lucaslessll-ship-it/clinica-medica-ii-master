# Análise do site e ampliação do Decision Lab

Análise do código e de execuções locais em navegador, sem alegação de auditoria clínica integral ou medição de Core Web Vitals em produção.

## Achados e alterações aplicadas

1. O Decision Lab de `evidence.js` tinha **três** microcasos e ficava dentro dos recursos expansíveis do painel. É diferente do laboratório de casos sequenciais do Radar da Banca (`banca.js`). Agora possui **24 microcasos** (20 P2, quatro P1), acesso direto em Treinar e atalho no painel.
2. Vinte e quatro abas seriam densas e repetiriam rótulos. Foi criada seleção compacta por caso com filtros P1/P2, contagem real de respostas e acertos e navegação entre os casos do filtro.
3. A explicação permanece oculta antes da escolha. Após responder, aparecem justificativa, ponto-chave, fonte e botão de revisão do tema. O traçado ilustrativo só aparece no caso eletrocardiológico; não é mostrado como se fosse exame pertinente a todos os temas.
4. As chaves antigas `case-qrs`, `case-gb`, `case-lpa` e a chave de progresso `MASTER_EVIDENCE_UI_v5` foram preservadas. IDs dos novos casos são estáveis; nenhuma migração ou escrita de teste em produção.
5. A captura enviada pelo usuário mostrava arquivos anteriores apesar do deploy concluído. Os recursos locais JS/CSS e o redirecionamento agora têm versão explícita `20261112-lab1`, preservando parâmetros/fragmentos de recuperação. O rodapé identifica a interface 2026.11.12.3. Não foi pedido que o usuário apagasse armazenamento ou progresso.

## Próximas melhorias recomendadas

- **Prioridade alta:** vincular erros do Decision Lab à fila de revisão já existente, com reteste e registro de retenção. Hoje os erros do LAB e a agenda do banco principal são registros diferentes.
- **Prioridade alta:** oferecer sessões de 5/10/20 casos com resumo por tema, sem inventar probabilidades de aprovação.
- **Prioridade média:** acrescentar explicação individual de cada distrator e variações de casos com achados novos; a entrega atual tem explicação geral e ponto-chave por caso.
- **Prioridade média:** aproximar anotações, manual de prescrição e treino em um percurso por tema, reduzindo duplicação de destinos do painel.
- **Qualidade contínua:** revisão clínica independente dos casos, acessibilidade com VoiceOver/Safari real, acompanhamento de fontes e medição de desempenho em produção. Testes de interface não certificam qualidade médica individual.

## Conteúdo e fontes

21 casos autorais novos sem doses ou esquemas de prescrição. Cobrem os oito eixos P2 e decisões cumulativas em diabetes/endocrinologia. Mantidos os três originais. Cada caso tem enunciado, pergunta, três alternativas, índice correto, justificativa, ponto-chave e referência. Não são questões oficiais nem predição de cobrança da banca.

Reconsultados para decisões selecionadas: NICE NG217 (EEG normal não exclui epilepsia), EULAR/BSR esclerose sistêmica (crise renal e cautela com glicocorticoide), IDSA febre/neutropenia (terapia empírica oportuna), ACG/ESsCD diagnóstico celíaco (limitação de IgA) e consenso 2024 de crises hiperglicêmicas (hipocalemia antes de insulina). As demais referências são links temáticos do acervo existente, sem alegação de atualização integral.

- https://www.nice.org.uk/guidance/ng217/chapter/diagnosis-and-assessment-of-epilepsy
- https://ard.bmj.com/content/early/2024/10/17/ard-2024-226430
- https://www.idsociety.org/practice-guideline/neutropenic-patients-with-cancer/
- https://gi.org/guideline/diagnosis-and-management-of-celiac-disease/
- https://onlinelibrary.wiley.com/doi/full/10.1002/ueg2.70119
- https://diabetesjournals.org/care/article/doi/10.2337/dci24-0032/156808/Hyperglycemic-Crises-in-Adults-With-Diabetes-A

## Verificação

Testes adicionados: 24 IDs únicos, 20 P2, referências existentes, alternativas válidas, preservação de resposta antiga igual a zero, bloqueio de segunda resposta, filtros e contadores. Os 24 casos são respondidos e corrigidos em viewport de 390 px, verificando ausência de overflow. Também foi testado o versionamento dos arquivos e o retorno de recuperação de senha. Validadores Python e sintaxe dos JS aprovados.
