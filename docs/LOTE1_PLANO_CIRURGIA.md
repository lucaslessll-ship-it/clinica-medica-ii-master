# Lote 1: plano e acompanhamento de Cirurgia

O painel Hoje distribui as 58 aulas e as 212 questões autorais existentes até a prova escrita de 19/11/2026. O plano prioriza temas de peso 5, depois 4 e depois 3, preservando a ordem das aulas dentro de cada tema. O banco privado não entra na meta de questões novas.

## Distribuição inicial, sem progresso anterior

| Data | Aulas | Questões novas | Percurso de aulas |
| --- | ---: | ---: | --- |
| 13/11 | 10 | 36 | Abdome agudo completo; pancreatite aguda e complicações locais |
| 14/11 | 10 | 36 | Pâncreas restante; trauma abdominal e torácico completos; anatomia das hérnias |
| 15/11 | 10 | 35 | Hérnias restantes; coloproctologia; REMIT, cicatrização e classificação das queimaduras |
| 16/11 | 10 | 35 | Atendimento das queimaduras; doença vascular; vias biliares; primeiras duas aulas de Radiologia |
| 17/11 | 9 | 35 | Radiologia restante; primeiras cinco aulas de Urologia |
| 18/11 | 9 | 35 | Urologia restante; esôfago; estômago; fígado |
| 19/11 | 0 novas | 0 novas | Revisão de erros, assuntos de maior dificuldade e simulado |

As questões também seguem o peso do tema. A quantidade diária é distribuída independentemente da quantidade de aulas.

## Comportamento

- Aulas já concluídas e questões já respondidas saem das pendências. Os registros anteriores continuam válidos, sem atribuir uma data fictícia de conclusão.
- Conclusões e primeiras respostas feitas hoje contam para a meta de hoje. A meta não cresce a cada aula concluída.
- Ao perder um dia, o conteúdo restante se redistribui pelos dias de estudo disponíveis. O dia 19 permanece reservado à revisão.
- O botão principal abre a próxima aula pendente do dia. O treino de hoje contém somente as questões autorais alocadas nesse dia.
- O painel deixa de aparecer após 19/11, inclusive se a página permanecer aberta durante a virada do dia. A data segue o relógio local do dispositivo.
- O novo campo opcional `plan.days` fica no estado existente `master_cir_lucas_v1`; os campos de progresso, resultados, notas e simulados são preservados.

## Integrações

- Hoje soma as revisões de evocação com `CIR.dueCount()`, com botões separados para cada atividade.
- Todas as matérias passa a listar 30 temas, incluindo os 14 de Cirurgia. Os contadores são calculados a partir dos dados, com filtro Cirurgia.
- A página inicial de Cirurgia mostra os resultados por tema em ordem crescente de acerto. Temas com menos de 5 questões respondidas aparecem como poucos dados, sem percentual. A contagem usa questões distintas e o resultado mais recente de cada questão, mantendo o comportamento existente.

## Verificação e publicação

Versão preparada: `20261113-plano1`, interface `2026.11.13.10`.

As verificações cobrem integridade estática, sintaxe JavaScript, distribuição do plano, conclusões, dias perdidos, revisão final, virada de data, integração de revisões, desempenho e navegação. As telas de 320, 390 e 820 px são verificadas nos temas claro e escuro, além da cobertura de desktop da suíte existente.

Resultado: 79 testes aprovados, nenhum teste falhou ou foi ignorado. Os dois validadores Python passaram, assim como `node --check` nos 52 arquivos JavaScript do app e `git diff --check`.

Nenhum conteúdo médico, dose ou imagem foi acrescentado neste lote. Os lotes de aprofundamento e imagens dependem da consulta às fontes e da comprovação das licenças. O proxy do ambiente retornou HTTP 403 ao acessar a API do GitHub, o PubMed Central, o Wikimedia Commons e o WJES. Um rascunho de configuração de rede foi salvo, mas ainda não está aplicado ao ambiente ativo.

O lote foi preparado em branch própria a partir da main atualizada. A publicação exige PR, merge e confirmação do workflow do Pages, conforme solicitado. O envio da branch não equivale à publicação.
