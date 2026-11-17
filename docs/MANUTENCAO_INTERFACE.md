# Manutenção da interface

A checagem recorrente do Clínica Master foi configurada para execução horária. Ela procura defeitos reproduzíveis, aplica correções restritas, executa os testes adequados e publica quando houver acesso e as proteções do repositório permitirem. Não é um processo residente nem garantia de ausência de defeitos. Falta de acesso, falha de testes ou necessidade de aprovação deve ser informada, sem declarar uma correção publicada.

## Cobertura prioritária

- Celulares, tablets/iPad e computadores, em retrato e paisagem; tamanhos representativos de 320 a 1920 pixels.
- Chromium e WebKit/Safari quando disponíveis, distinguindo emulação de validação em aparelho físico.
- Temas claro/escuro, movimento reduzido e texto ampliado.
- Rolagem manual contínua sem reposicionamento inesperado, navegação por seção, tabelas, títulos, foco, imagens com carregamento tardio e teclado.
- Login e telas internas com sessões sintéticas. Dados de contas reais e conteúdo privado não devem aparecer em arquivos públicos ou relatórios.

## Procedimento

1. Atualizar o código sem sobrescrever alterações de outras pessoas. Usar checkout ou worktree isolado quando houver trabalho pendente.
2. Reproduzir o defeito, registrando rota, viewport, navegador e interação.
3. Corrigir a causa e adicionar ou ajustar um teste de regressão quando necessário. Medir se alterações em eventos de rolagem causam reflow ou mudam a posição de leitura.
4. Executar os testes afetados e o build; conferir rotas relacionadas. Preservar conteúdo clínico, IDs e progresso.
5. Publicar apenas resultado verificado; deixar PR e explicar o bloqueio quando alguma proteção exigir revisão.
6. Registrar correções e limitações. Se não houver problema ou alteração, evitar notificações sem novidade.

Os workflows de qualidade também verificam alterações enviadas ao GitHub. Testes automatizados não substituem o relato de problemas em um iPad real.
