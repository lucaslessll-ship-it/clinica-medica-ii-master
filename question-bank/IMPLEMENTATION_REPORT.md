# Relatório de implementação

## Auditoria da arquitetura

O Clínica Master usa scripts clássicos num site estático empacotado pelo Vite. A P1 usa `p1_questions.js` e `p1_app.js`. A P2 usa `questions.js`, o complemento de `banca_questions.js` e `app.js`. A Cirurgia tem banco e simulado próprios em `cir_questions.js` e `cir_app.js`. Os fluxos existentes mantêm IDs posicionais e persistem o progresso nas chaves por disciplina. O módulo novo usa o cliente autenticado já existente, o algoritmo de embaralhamento da P2 e a estrutura visual e de navegação do site.

## Dados e validação

O lote legado tem 56 questões da P1 e 80 da P2, todas preservadas no site. Uma importação de ensaio no PostgreSQL local inseriu 136 registros pendentes. A repetição inseriu zero e identificou 136 duplicidades. A extração de um PDF sintético com uma página textual e outra escaneada recuperou o gabarito, com OCR aplicado à segunda página. O teste SQL mostrou 5.001 questões disponíveis e ocultou os dois registros bloqueados por curadoria. A consulta de catálogo com 100 itens levou entre 53 e 66 ms no banco local de teste, sem incluir rede.

A curadoria deve revisar os gabaritos e confirmar os direitos da coleção legada antes de liberá-la no banco novo. A meta de 600 itens depende dos lotes científicos. O pipeline aceita candidatos de PDFs com a estrutura documentada. A detecção de paráfrases depende do modelo multilíngue escolhido pela equipe.

Os testes de navegador do banco passaram em larguras de 390, 768 e 1.440 px com autenticação e RPC simuladas. O build e os testes de histórico e sincronização passaram. Três falhas dos testes gerais de conta também ocorreram ao executá-los diretamente na `main` de origem. A suíte geral precisa ficar verde antes de liberar o PR.

## Homologação

A migração e os testes de acesso rodaram em PostgreSQL 17 local, com as funções e papéis de autenticação Supabase simulados. O Supabase CLI executou os advisors contra o banco local sem encontrar avisos ou erros. A aplicação da migração e a verificação de ponta a ponta com usuários reais dependem da instância Supabase de homologação do Clínica Master. Nenhuma migração foi aplicada em produção. O cronômetro da sessão roda no navegador, e as sessões novas em andamento são mantidas em memória até o recarregamento da página.

## Revisão para publicação

- **Acesso e correção.** As tabelas privadas têm RLS e acesso direto revogado para os papéis cliente. O catálogo exige usuário autenticado e só retorna itens com aprovação e autorização. A correção guarda a tentativa por usuário e usa o identificador original da alternativa. As retentativas da mesma entrega são idempotentes.
- **Importação.** A extração gera candidatos para curadoria. O hash normalizado, a chave legada e o UUID foram verificados na importação repetida. A similaridade semântica depende de um modelo local escolhido e validado pela equipe.
- **Interface.** O simulado agora confere o prazo ao receber a resposta, inclusive se a aba em segundo plano atrasar o relógio. Uma consulta de catálogo com erro limpa a lista anterior para que ela não seja confundida com os resultados dos filtros atuais. O relógio continua sendo um controle da interface.
- **CI.** A revisão anterior passou nas checagens de pipeline e banco, leitura e layout. As checagens gerais de qualidade e filtros falharam. No ensaio local de leitura e questões, 14 de 15 testes passaram. A falha restante reproduzida nesse ensaio envolve a abertura do controle de exclusão de uma marcação em uma aula.
- **Publicação.** O GitHub Pages publica após integração à `main`. A criação da branch Supabase de homologação foi recusada, e a pasta `approved/` ainda não contém lotes. A checagem de ponta a ponta com o Supabase do projeto continua pendente.
