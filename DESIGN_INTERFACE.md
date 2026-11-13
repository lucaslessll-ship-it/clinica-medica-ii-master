# Tipografia e navegação

Inter variável 5.3.0 hospedada em `assets/fonts`, licença SIL OFL incluída. Fonte consistente em títulos, controles e textos, com pesos moderados e sem dependência de Google Fonts. `interface.css` é a camada final de apresentação.

A sobreposição em “Pratique e revise” vinha da grade com coluna de ícone aplicada também a cartões sem ícone. Título e descrição agora têm linhas explícitas; cartões com ícone preservam sua própria disposição.

Lateral sem marcadores nativos de details: SVGs, seção ativa, links diretos e botões separados de expansão com aria-expanded e foco visível. Mantidos grupos, destinos, modo compacto e navegação móvel.

Validação: 31 cenários aprovados, incluindo ausência de interseção entre títulos e descrições em 390/820/1440/1562 px, carregamento efetivo da Inter, navegação/expansão/modo compacto. Validadores existentes e diff check aprovados. Captura de desktop inspecionada. Nenhum conteúdo médico ou progresso alterado.

## Painéis laterais

Navegação reorganizada a pedido do usuário: Início, Matérias P1, Matérias P2, Casos clínicos, Exercícios, Decision Lab e Biblioteca. Cada item principal abre seu painel diretamente. Casos clínicos reúne casos escritos, prova oral e POCUS; Exercícios reúne questões, simulado, flashcards e discursivas; Decision Lab reúne laboratório sequencial, microdecisões e estratégia.

Somente um submenu expandido por vez, com destaque da seção atual, controles de expansão separados e comportamento compacto/móvel preservado. Recursos versionados como `20261112-nav2` para carregar a atualização sem limpar dados do estudante. Teste específico percorre os cinco painéis solicitados em desktop e celular, incluindo acesso às microdecisões.
