# Banco de questões de Clínica Médica

Este diretório mantém o contrato de dados entre curadoria e engenharia. Consulte o [guia de curadoria](CURATION_GUIDE.md) e o [JSON Schema](schema/question.schema.json).

## Instalação e uso

Use Node.js 24 para exportar o legado e Python 3.11 ou superior para validar e importar. A extração de PDF usa Poppler (`pdfinfo`, `pdftotext` e `pdftoppm`) e Tesseract com o idioma português.

```sh
python -m venv /tmp/master-qb-venv
. /tmp/master-qb-venv/bin/activate
pip install -r question-bank/requirements.txt
node question-bank/export-legacy.cjs > question-bank/review/legacy.jsonl
python question-bank/pipeline.py validate question-bank/review/legacy.jsonl --report question-bank/reports/legacy.json
```

Para extrair, forneça um JSON com `discipline`, `period`, `theme`, `difficulty`, `origin`, `institution`, `board`, `year` e `reference`. O extrator reconhece numeração e alternativas em linhas separadas, continua o texto de uma página para outra e reconhece gabaritos a partir de um cabeçalho “Gabarito”. A revisão deve conferir enunciado, opções e resposta com o original, em especial para formulários com colunas, figuras ou gabarito em documento separado.

```sh
python question-bank/pipeline.py extract question-bank/inbox/prova.pdf \
  --metadata question-bank/inbox/metadados.json --output question-bank/review/lote.jsonl \
  --report question-bank/reports/extracao.json
python question-bank/pipeline.py validate question-bank/review/lote.jsonl \
  --output question-bank/review/normalizado.jsonl --report question-bank/reports/validacao.json
```

O validador identifica duplicidades exatas por SHA-256 e usa similaridade lexical para sinalizar candidatos a revisão. Para detectar paráfrases, instale `sentence-transformers` no ambiente de curadoria e forneça `--semantic-model /caminho/do/modelo-local` a `validate` ou `import`. Use um modelo multilíngue previamente instalado. O conteúdo fica na máquina local. Similaridade exige decisão humana. Confirme com `--confirm-similar` somente após essa revisão.

Use uma conexão PostgreSQL administrativa exclusiva para o pipeline, preferencialmente em homologação, via `MASTER_QB_DATABASE_URL`. A migração deve ter sido aplicada à instância de destino. A importação serializa lotes concorrentes e grava as questões aceitas em uma única transação por arquivo. Questões já importadas são reconhecidas pelo UUID e pelo hash. Para atualizar uma questão existente, mantenha o UUID e acrescente uma revisão ao histórico. O relatório inclui a linha de cada problema. Um lote com erros de validação pode importar suas linhas válidas e retorna código diferente de zero.

```sh
python question-bank/pipeline.py import question-bank/review/legacy.jsonl \
  --batch-size 250 --report question-bank/reports/importacao.json
python question-bank/pipeline.py import question-bank/approved/lote.jsonl \
  --approved --report question-bank/reports/importacao-aprovada.json
```

## Aulas e progresso

Os IDs de aulas seguem `<id-do-tópico>_<índice-do-capítulo>`, começando em zero. Por exemplo, `neuro1_0`. Para um item legado que só veio identificado pelo tópico, o vínculo permanece no nível do módulo até a curadoria indicar a aula exata. O banco novo contabiliza as tentativas realizadas nele. P1, P2 e Cirurgia continuam usando suas chaves de progresso existentes.

A API retorna apenas questões com validação médica e autorização de reprodução. A busca retorna enunciado e alternativas sem gabarito. A correção é feita no banco usando o ID da alternativa e o usuário autenticado. No simulado, o cronômetro roda no navegador e a correção é entregue em um único lote ao finalizar.

## Verificação

- `npm run build` verifica o empacotamento do site.
- `node --test tests/master-question-bank.test.cjs` verifica navegação e simulado em três tamanhos de tela com a API simulada.
- `python -m unittest discover -s question-bank` verifica estrutura, gabaritos, interpretação do texto extraído, hash e similaridade lexical.
- Execute `tests/master-question-bank.sql` com `psql` contra uma instância local migrada. O teste cria 5.003 registros sintéticos dentro de uma transação revertida e verifica filtros, vínculos, gabarito e isolamento por conta.

## Banco CM2 reconstruído

Execute `python question-bank/import-cm2.py caminho/para/Banco_CM2_por_assunto_e_dificuldade.pdf`
para produzir dois arquivos privados em `question-bank/review/`. A extração preserva código e
página do PDF, alternativas na ordem do documento, gabarito informado, comentário, estilo e
provas mencionadas para o tema. Os estilos de banca indicam a abordagem editorial.
As menções de recorrência informam onde o tema apareceu segundo o PDF.

Os níveis R1 e R+ do PDF são preservados e mapeados para N2 e N3. Questões sem aula
específica associada ficam vinculadas ao assunto. O arquivo de discursivas mantém a resposta-modelo
para curadoria e uso futuro em um fluxo próprio. O fluxo atual de simulados corrigidos recebe
múltipla escolha. A liberação exige revisão médica e autorização de reprodução do material.
