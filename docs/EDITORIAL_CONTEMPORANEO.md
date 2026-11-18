# Estudo Master — Editorial contemporâneo

Direção visual aprovada pelo usuário em 18/11/2026, a partir da segunda proposta de dashboard para iPad e celular.

## Identidade

- Fundo marfim `#f7f4ee`, papel `#fffcf7`, verde profundo `#143d38` e cobre `#86502e` para textos e detalhes com contraste.
- Source Serif 4 nos títulos editoriais; Public Sans na interface e leitura. Fontes locais com as licenças já presentes no projeto.
- Ícones vetoriais lineares, marca em forma de livro/monograma, contornos leves e sombras discretas.
- Tema escuro em verdes profundos, com os modos de alto contraste e movimento reduzido preservados.

## Organização

A página inicial prioriza saudação, retomada da aula, plano, revisões, progresso e acesso às matérias. Biblioteca, filtros, estatísticas detalhadas, prioridades de Cirurgia, fontes e ferramentas continuam disponíveis abaixo. O cartão de retomada usa as marcações reais do módulo e mantém o capítulo exato; sem histórico, o destino é a biblioteca.

O celular oferece Início, Matérias, Praticar, Caderno e Perfil na navegação inferior, com busca no cabeçalho. A lateral compacta é o padrão para novas preferências em tablet/desktop; o menu móvel conserva os rótulos. Preferências explícitas anteriores de expansão continuam válidas.

O assistente tem um atalho compacto no cabeçalho. Recolher/reativar fica disponível em Como usar, sem boneco sobrepondo a leitura. O Pomodoro abre pelo cabeçalho e mantém a opção de controle lateral; há um relógio visível de cada vez. A preferência explícita anterior pelo controle lateral é respeitada.

## Implementação e limites

`editorial.css` é a camada visual final tanto no aplicativo principal quanto no laboratório embutido/independente. `editorial.js` produz a introdução do dashboard a partir dos dados existentes. Consultas, conteúdos clínicos, fontes, rotas, identificadores e chaves de progresso foram preservados. Sem mudanças em tabelas, políticas ou chaves do Supabase.

As ilustrações novas são ornamentos de interface e ícones autorais, não imagens clínicas. Não foram criados laudos, resultados ou percentuais fictícios para compor o dashboard.

## Verificação

`tests/editorial-design.test.cjs` percorre as áreas principais nos dois temas e em três larguras, verifica retomada P1/P2, progresso real, ausência de duplicação de relógios, contraste e semântica com axe, lateral expandida no tablet, fonte ampliada e navegação móvel. Testes anteriores do assistente e Pomodoro foram atualizados para os novos acessos, preservando a conferência de suas funcionalidades.
