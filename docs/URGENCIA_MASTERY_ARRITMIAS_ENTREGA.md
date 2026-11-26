# Urgência e Emergência V2 — Piloto Mastery de Arritmias

Rota do caderno: `#emergency-arritmias`. Branch dedicada: `feat/urgencia-mastery-arritmias`. Base: `a3e1174` de `main` do repositório Clínica Master.

## Entrega para avaliação

- Disciplina com 10 temas P2 na ordem aprovada, 13 aulas da P1 em revisão complementar, marcação independente de estudo e links de navegação. A ordem da P2 também serve para o banco, o catálogo do planejador e as aulas.
- Arritmias com revisão de um minuto e de 5–10 minutos, oito capítulos, seis ECGs observacionais do PhysioNet com zoom, interpretação sob demanda, desenho vetorial de condução, gráfico didático de QTc, casos autorais, conceitos farmacológicos, algoritmo por apresentação e calculadora de Bazett e Fridericia.
- Banco isolado de Urgência com períodos, assuntos, disponibilidade, origens, níveis editoriais, resultados e favoritos. Respostas de treino revelam gabarito e justificativa por alternativa. Simulados têm página própria com gerador, opção pronta de Arritmias com 20 itens em 30 minutos, marcação, alteração de resposta, entrega e correção posterior. Sessões e ordem das alternativas são persistidas após cada interação relevante.
- Percurso com dois marcos manuais e dois automáticos, painel de acertos separado e 20 flashcards. Agenda heurística de erros com D+0, D+1, D+3, D+7 e D+14 configuráveis. Retestes do mesmo assunto usam questão diferente se houver outra disponível para o subtema, com cartão contextual como alternativa.
- Preservados os IDs do catálogo legado e as entradas de histórico. As 172 questões corrigíveis originais continuam disponíveis no catálogo. A dificuldade dos itens sem auditoria aparece como “Não auditada”. O banco tem 192 questões corrigíveis após o acréscimo do piloto.

## Quantidade e origem na P2

| Ordem | Assunto | Mastery autorais novos | Fixação legada | Modelos legados | Adaptações legadas |
| --- | --- | ---: | ---: | ---: | ---: |
| 01 | Arritmias cardíacas | 20 | 2 | 2 | 1 |
| 02 | Dor torácica e síndrome coronariana aguda | 0 | 2 | 2 | 0 |
| 03 | Emergência hipertensiva e edema agudo pulmonar | 0 | 2 | 2 | 3 |
| 04 | Gasometria e distúrbios acidobásicos | 0 | 2 | 2 | 1 |
| 05 | Distúrbios eletrolíticos graves | 0 | 2 | 2 | 1 |
| 06 | Emergências glicêmicas | 0 | 2 | 2 | 0 |
| 07 | Intoxicações exógenas | 0 | 2 | 2 | 1 |
| 08 | Emergências tireoidianas | 0 | 2 | 2 | 0 |
| 09 | Atendimento a catástrofes | 0 | 2 | 2 | 0 |
| 10 | Cuidados paliativos | 0 | 2 | 2 | 0 |

Os 20 novos itens são autorais com casos didáticos. A distribuição editorial é 4 N1, 10 N2 e 6 N3, com quatro gabaritos em cada posição A–E e cinco comentários por questão. O índice legado de originais leva aos PDFs de origem. Nenhuma questão nova foi atribuída à FMP, aos docentes ou às bancas.

### Cobertura das 20 questões novas

| Conceitos | Questões |
| --- | ---: |
| Pulso, estabilidade e taquicardia compensatória | 3 |
| Sistema de condução e QRS | 1 |
| TRN, flutter 2:1 e adenosina | 3 |
| Reconhecimento de FA, risco embólico e cardioversão | 3 |
| Pré-excitação e segurança medicamentosa | 1 |
| TV, torsades, QT longo e procainamida | 4 |
| Bradicardia, bloqueios AV e atropina | 3 |
| Sincronização e confirmação de captura | 2 |

## Referências e mídia

- AHA 2025, Part 9. Adult Advanced Life Support, referência bibliográfica. [PubMed](https://pubmed.ncbi.nlm.nih.gov/41122884/)
- AHA 2025. Algoritmos de taquiarritmia e bradicardia com pulso, conferidos nos PDFs oficiais para as doses apresentadas. [Taquiarritmia](https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-Tachycardia-250514.pdf) · [Bradicardia](https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-Bradycardia-250514.pdf)
- ACC/AHA/ACCP/HRS 2023. Diretriz de FA para cardioversão, tromboembolismo e FA pré-excitada. [PubMed Central](https://pmc.ncbi.nlm.nih.gov/articles/PMC11104284/)
- AHA/ACCF/HRS. Padronização de QT no ECG. [Publicação](https://doi.org/10.1016/j.jacc.2008.12.014)
- Moody e Mark. MIT-BIH Arrhythmia Database 1.0.0. Registros 201, 202, 207, 209, 231 e 232, canal MLII, com fonte e recorte por imagem. [PhysioNet](https://physionet.org/content/mitdb/1.0.0/) · [ODC-BY 1.0](https://physionet.org/content/mitdb/view-license/1.0.0/)

Conferência editorial datada de 26/11/2026. Os materiais institucionais da disciplina e a homologação docente seguem pendentes.

## Arquivos e reutilização

- `emergency-mastery-content.js`, `emergency-mastery.js`, `emergency-mastery.css`, `assets/urgencia/mastery/` — conteúdo versionado, componentes, progresso, revisão e mídia do piloto.
- `emergency.js`, `emergency-bank.js`, `app.js`, `index.html` — catálogo, rotas, sidebar e integração com o banco, `QuestionHistory`, visualizador e tema existentes.
- `course-kit.js`, `master-planner.js`, `notas.js`, `posology.js` — pontos de integração para a ordem do módulo, acesso do planejador, contexto de anotações e sigilo da prova.
- `tests/emergency-mastery.test.cjs`, `tests/urgencia-banco-questoes-2026.test.cjs` — integridade editorial, fluxo de navegação e regressão de banco.
- `AGENTS.md`, `docs/MASTERY_CONTENT_STANDARD.md`, `THIRD_PARTY_NOTICES.md` — padrão permanente, roteiro e atribuição.

## Limites do piloto

O banco e a navegação estão disponíveis nos períodos P1/P2. O caderno Mastery completo, as 20 novas questões e os 20 novos cartões são de Arritmias. Os demais temas seguem com as aulas e os itens legados. A produção das outras nove aulas, a meta global de 200 questões Mastery e a programação de cadernos posteriores dependem da avaliação do piloto. Não houve acesso ou alteração ao ApexMed, banco de produção ou deploy.

## Validação técnica

- Build de produção com Vite. Conferência sintática com `node --check` e do diff com `git diff --check`. O projeto não define scripts separados de lint ou typecheck.
- Suíte direcionada em Chromium e Node: caderno e atlas, ordem da P2, filtros do banco, origem e nível, 20 questões com justificativas, isolamento das rotas, correção imediata e posterior, anotação, armazenamento após recarregar, reteste, flashcards, cronômetro, marcação e troca de resposta, sigilo do gabarito, responsividade e validação de QTc.
- Uma bateria combinada de 44 testes teve 43 aprovações. O teste de notas que exige a versão antiga de `osce-pilot.js` também falha na base. Foram reproduzidas na base outras três falhas de regressão, uma esperando um grupo antigo de Exercícios na barra lateral e duas esperando versões antigas de ativos de Urgência.
- A autenticação dos testes de navegador foi simulada. A sincronização em conta real e entre dispositivos não foi exercitada em produção.
