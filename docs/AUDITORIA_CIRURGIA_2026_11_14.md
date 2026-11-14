# Auditoria e entregas de Cirurgia

## Ponto de partida

A main `998c7a1`, merge do PR 17, já continha os 14 temas na tela inicial, filtro e contadores dinâmicos, um plano de aulas e o bloco de prova nas 19 aulas de peso 5. Essas partes foram preservadas.

A auditoria identificou as seguintes lacunas:

- O plano reservava também a véspera, não distribuía questões, não apresentava o calendário completo e não atualizava a virada de data.
- O contador Hoje não incluía as revisões de Cirurgia nem atualizava após o carregamento do banco privado.
- O desempenho desaparecia sem respostas e não mostrava a quantidade respondida nos temas com poucos dados.
- As 58 aulas tinham pelo menos 4 pré-testes e 5 evocações, sem casos resolvidos. Havia 212 questões.
- Não havia imagens clínicas locais com licença comprovada.
- POCUS tinha 8 módulos e 26 questões, com esquemas originais, sem roteiro prático por módulo.

## Lote de correção do plano e preparação do renderizador

- Calendário diário de 13 a 19/11, com redistribuição das pendências por peso do tema e somente 19/11 reservado à revisão e ao simulado.
- Aulas e questões autorais distribuídas por dia. A tarefa de hoje diminui conforme é cumprida, sem puxar indefinidamente novas tarefas de amanhã.
- Compatibilidade com o campo `doneAt` da versão publicada, com preservação de notas, resultados e simulados.
- Revisões de Cirurgia somadas às de evocação, com botões próprios e atualização após o banco privado carregar.
- Desempenho dos 14 temas visível, inclusive sem respostas, com contagem e sem percentual quando há menos de 5 respostas.
- Renderização opcional de casos resolvidos e figuras com legenda, crédito, licença, marcações SVG e ampliação acessível. Mantido o formato de prova existente `{c,p,r}`.
- Figuras exigem caminho local WebP, licença CC BY ou CC0, origem HTTPS admitida e 2 a 4 marcações. Isso verifica formato de metadados e não substitui a conferência da licença na origem.
- Correções pontuais de enunciados que apresentavam condutas como regras absolutas.

Validação deste lote em uma cópia exata dos arquivos preparados para commit: 83 testes aprovados, nenhum ignorado, os dois validadores Python aprovados e sintaxe dos 53 arquivos JavaScript válida. As imagens dos testes são figuras geométricas sintéticas e não fazem parte do conteúdo clínico publicado.

Versão preparada: `20261114-plano2`, Interface `2026.11.14.2`.

## Fontes e publicação

O proxy ativo continua permitindo apenas o Supabase como domínio personalizado. As tentativas de acesso à API do GitHub e ao PubMed Central retornaram `CONNECT 403`. A página pública do GitHub abriu, mas sem sessão autenticada para escrita pela interface web.

O rascunho de configuração com os domínios necessários já foi salvo. Ele ainda precisa ser aplicado ao ambiente ativo. Credenciais ou valores secretos não foram publicados.

Publicação exige PR, merge na main e confirmação do Pages. Enviar uma branch não equivale a publicar. O sucesso do Pages não deve ser presumido apenas pelo histórico de merge.
