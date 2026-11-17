# Estudo Master e Urgência e Emergência

A identidade pública foi atualizada no menu, cabeçalho, login, título e manifesto.
As chaves de armazenamento e os IDs de aulas e progresso não mudaram. Os novos
ícones vetoriais locais usam gradientes e relevo, sem dependências externas ou
animação contínua. A biblioteca e os cartões de P1/P2 e Cirurgia compartilham o estilo.

Urgência e Emergência tem somente os 10 títulos P2 e os 10 títulos de revisão P1
da checklist recebida. Todos os botões de aula e os acessos P1/P2 estão desativados.
A rota mostra a organização em construção; URLs diretas não liberam aulas.
Não foram criados conteúdos clínicos, questões, professores ou cronogramas.

A versão do caderno já integrada em main foi preservada, incluindo suas anotações
nas demais páginas de estudo. O atalho foi posicionado junto ao Pomodoro e recebeu
ícone com relevo. A apresentação de novidade é um cartão no fluxo da página ou do
painel, para não cobrir controles. Fechar ou dispensar registra o identificador do
recurso em `novidadesVistas` nas preferências sincronizadas existentes da conta.
O botão de ajuda no painel permite reler. Novas apresentações podem ser cadastradas
com `Novidades.register`, com ID versionado, título, descrição e ação de exploração.
Não houve mudança de tabelas, políticas ou credenciais. Anexos não foram adicionados.

Os testes de `estudo-master.test.cjs` usam conta e dados sintéticos; verificam os
títulos bloqueados, a apresentação, os ícones, os limites de tela e axe claro/escuro.
Os testes existentes do caderno, da versão otimizada e da leitura no iPad complementam
a verificação. Emulação de viewport em Chromium não equivale a iPad físico ou Safari.
