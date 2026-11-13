# Revisão de layout e usabilidade

Revisão sobre `f979a78`, mantendo as 16 matérias, 54 aulas, bancos de questões, 22 casos do Decision Lab, contas e cinco chaves de progresso. Nenhum conteúdo clínico, dose, esquema do Supabase ou dado de produção foi alterado.

## Problemas encontrados e mudanças aplicadas

| Área | Problema observado | Resultado |
|---|---|---|
| Painel inicial | Cabeçalho muito amplo e ações de continuidade distantes | Apresentação mais compacta, atalhos para retomar/explorar e plano diário, resumo do acervo |
| Biblioteca | Longa lista sem descoberta rápida | Todas as 16 matérias continuam visíveis inicialmente; busca por título e assuntos das aulas, filtros P1/P2, quantidade de resultados e recuperação de busca vazia |
| Cartões | Identificação e evolução pouco evidentes | Ícones SVG, identificação P1/P2, quantidade de aulas, número real de revisadas e barra discreta de progresso por matéria |
| Tipografia | Hierarquia inconsistente e muitos textos pequenos | Inter variável local preservada, com escala e pesos revistos, espaçamento e entrelinhas melhores; campos com tamanho mínimo legível no celular |
| Leitura | Aulas extensas sem navegação interna | Índice expansível de seções, saltos sem mudar a rota, posição na leitura e retorno ao início; texto em coluna confortável de até 76 caracteres |
| Celular e tablet | Espaçamento aninhado e larguras mínimas prejudicavam texto ampliado | Cartões responsivos, filtros que quebram linha, correções de largura em blocos de orientação e fluxos de evidência, margens menores para leitura a 200% |
| Menu móvel | Itens fechados ainda podiam receber foco; fundo continuava interativo | Menu fechado fica inerte; menu aberto controla foco, fundo, Escape, fechamento explícito e retorno ao botão; acompanha mudanças de largura |
| Diálogos | Foco escapava por alguns tipos de controle | Isolamento do fundo e navegação completa entre botões, links, listas, campos, áreas de texto e resumos visíveis; retorno ao acionador |
| Busca global | Seleção por teclado não era anunciada de forma consistente | Opções com identificadores estáveis, anúncio da opção ativa e tratamento seguro de resultados vazios |
| Navegação acessível | Link de pular conteúdo podia trocar a página; movimento ignorava preferência | Pular conteúdo preserva a rota; rolagem e efeitos respeitam movimento reduzido do sistema e da conta |
| Aparência | Controles com ícones de fontes e contraste variável | Ícones SVG consistentes, botões e bordas refinados, temas claro/escuro/alto contraste preservados |

## Dados e desempenho

- Busca de matérias acontece apenas no navegador e não muda nem salva o progresso.
- Progresso dos cartões deriva das aulas marcadas nas contas P1/P2; não há números fictícios.
- Posição de leitura é orientação visual, não marca conclusão nem atribui nota.
- Nenhuma dependência, fonte remota ou serviço adicional. A fonte local existente continua com preload e cache.
- Atualização da posição usa eventos passivos e `requestAnimationFrame`, sem gravar a cada rolagem.
- Pomodoro e seu histórico foram preservados. Trocas de sessão continuam encerrando controles da conta anterior.

## Validação

- Suíte completa: **49 testes aprovados, zero falhas e zero ignorados**. Inclui os testes anteriores de autenticação, recuperação, sincronização simulada, isolamento de contas, pomodoro, casos e integridade das aulas, além dos novos testes de descoberta, leitura e navegação acessível.
- Verificação de telas de 320, 390, 820, 1180, 1440 e 1562 px nas suítes; texto ampliado a 200% em telefone e tablet, incluindo modo escuro e alto contraste.
- Validadores Python existentes, sintaxe de todos os JavaScript e `git diff --check`: aprovados.
- Contraste medido nos controles novos: botão primário 6,83:1 em claro e 9,60:1 em escuro; rótulos dos cartões 4,62:1 em claro e 7,48:1 em escuro. Esses resultados são amostras específicas, não uma certificação WCAG completa.
- Capturas locais em `work/`, ignorado pelo Git. Dados e APIs de conta são fictícios/interceptados durante testes; não houve gravação de dados reais.
- Safari/iOS físico e VoiceOver real continuam sem validação direta. O suporte responsivo foi exercitado em Chromium; os testes de teclado e semântica não substituem ensaio com leitor de tela real.

O workflow de GitHub Pages já existente publicará o pacote estático quando esta revisão chegar à `main`; o resultado da execução deve ser conferido no GitHub Actions.
