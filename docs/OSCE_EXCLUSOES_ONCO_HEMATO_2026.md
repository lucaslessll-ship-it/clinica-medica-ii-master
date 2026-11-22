# Reclassificação do OSCE — 22/11/2026

## Origem e limite da informação

O estudante informou que os docentes excluíram **Neoplasias Hematológicas, Linfomas e Emergências Onco-Hematológicas** da avaliação prática atual de Clínica Médica II. Esta é uma informação docente **relatada**, não um documento institucional validado. O escopo confirmado neste projeto é **o OSCE**; não reduzir conteúdo da prova teórica de 26/11 sem outra confirmação.

Segundo o estudante, ECG já apareceu em avaliação de turmas anteriores e houve diversas aulas de ECG e POCUS neste período. Isso justifica **priorização pedagógica**, mas não percentuais inventados de ocorrência.

## Matriz geral

- 22 **alta**: ECG e arritmias primeiro, seguidos por síncope/convulsão e núcleo de P2 (neurologia, reumatologia, DII).
- 35 **média**: outros temas práticos e parte dos temas de P1 para cobertura de segurança.
- 10 **baixa**: passagem rápida opcional.
- 19 **excluída**: último grupo do índice, cinza e recolhido; IDs [8,9,25,26,36,39,45,47,49,59,60,67,69,79,80,81,82,83,84].

A trilha de **POCUS P1–P7** continua separada e em destaque. Total do banco é **93 estações**.

Os IDs técnicos usados em `master_osce_pilot_v1.items` nunca mudam. Somente a numeração visual do índice 1–86 foi recalculada. As estações excluídas não entram automaticamente em sessões diárias, retestes, lacunas para IA ou Super Foco misto. Permanecem acessíveis por busca ou abertura manual, sem apagamento de conteúdo ou dados.

## Trilha pessoal da conta proprietária

Permanecem 15 blocos e 380 minutos estimados: 6 A, 6 B, 3 C. A/B focam ECG, POCUS e assuntos de P2. Foram removidos os blocos de hematologia e oncologia.

A migração das conclusões **é por assunto, não por posição**: os temas antigos A1–A6 e B7/B10 permanecem; vasculites migram antigo B11 → novo B8, esclerose sistêmica/Sjögren/miopatias B12 → B9, TEP/pericardite C13 → B11, IRA/PCR C14 → B12, infecções C15 → C13. Conclusões antigas dos dois blocos excluídos B8/B9 **não** se transferem para conteúdos diferentes.

A interface da trilha pessoal só aparece ao UUID autenticado cadastrado previamente. Os dados pessoais de progresso permanecem na chave de sincronização existente e são protegidos pelas políticas de usuário da tabela `master_progress`.

## Verificações

`tests/osce-oncohematology-excluded.test.cjs` cobre mapeamento, preservação, isolamento entre contas e migração; demais testes de prioridade e POCUS foram atualizados. Esta alteração não modifica ApexMed nem outro projeto.
