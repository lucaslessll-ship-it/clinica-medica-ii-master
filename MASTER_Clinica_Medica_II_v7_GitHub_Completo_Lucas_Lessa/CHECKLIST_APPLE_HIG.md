# Auditoria de design — Apple Human Interface Guidelines
**MASTER P2 · desenvolvido por Lucas Lessa**

O projeto é um **site web responsivo**, não um aplicativo nativo feito em SwiftUI/UIKit. Por isso, aplicam-se as recomendações **relevantes para interfaces web** das Human Interface Guidelines, sem alegar compatibilidade com cada API, recurso ou padrão exclusivo do sistema operacional Apple.

## Decisões implementadas

| Princípio | Implementação no site |
|---|---|
| Simplicidade e hierarquia | Dashboard com poucas ações prioritárias; módulos e metas claramente agrupados; exploração detalhada apenas depois que o aluno abre um tema |
| Clareza textual | Títulos específicos e linguagem clínica direta; tipografia system UI (`-apple-system`, San Francisco quando disponível); textos de apoio em superfície neutra |
| Foco no conteúdo | Aulas extensas sobre superfícies sólidas, sem transparência por trás de longas leituras; barra de navegação discreta |
| Materiais e profundidade | Superfícies translúcidas usadas com moderação em barras de navegação e elementos flutuantes; cartões de conteúdo mantêm contraste estável |
| Cores semânticas | Azul e verde hospitalar para navegação e ações; feedback combina cor e texto/ícone para não depender apenas da cor |
| Organização | Menu lateral em telas grandes; barra inferior com cinco destinos em celular; cards adaptativos em todos os tamanhos |
| Acessibilidade visual | Modos claro/escuro/automático, alto contraste e ajustes de escala tipográfica até 200%; controles acessíveis por teclado |
| Movimento e conforto | Opção para reduzir animações e suporte à preferência do sistema quando disponível |
| Feedback imediato | Respostas corrigidas, alertas de salvamento, indicadores de conclusão e alterações visuais de estado |
| Prevenção de erros | Backup antes de zerar/importar progresso, confirmação de restauração, indicadores de avanço a partir de dados reais |
| Descoberta e busca | Atalho ⌘K/Ctrl+K; busca por aulas, módulos e questões, com navegação por teclado |
| Personalização discreta | Preferências agrupadas em diálogo dedicado, em vez de espalhar controles pela interface |
| Multidispositivo | Layouts para 390, 768, 1024 e 1536 pixels, verificados contra rolagem horizontal, inclusive com tipografia ampliada |
| Privacidade | Nenhuma requisição de dados pessoais; progresso e notas armazenados somente no navegador local |

## Não implementado por ser recurso nativo / fora do escopo

Não há widgets do iPadOS, Dynamic Island, integração com Shortcuts/Siri, APIs haptics nativas, notificações push, sincronização iCloud, handoff, Sign in with Apple, SwiftUI Liquid Glass nativo ou publicação na App Store. A aparência inspirada em Liquid Glass é uma **aproximação CSS**, não a implementação oficial do material do iOS. Também não existe backend nem persistência entre dispositivos.

## Qualidade e testes realizados

- `test_v2.py`: navegação, busca, acessibilidade da aparência, favoritos, caderno, plano de hoje, temporizador, questão e simulado.
- `audit_v2.py`: renderização e checagem básica de transbordamento em 390, 768, 1024 e 1536 pixels, inclusive com fontes em quatro tamanhos.
- O teste automatizado não equivale a uma auditoria WCAG completa, inspeção de leitor de tela VoiceOver ou teste em todos os dispositivos Apple.

## Referências oficiais utilizadas

- [Apple HIG — Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles)
- [Apple HIG — Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Apple HIG — Materials / Liquid Glass](https://developer.apple.com/design/human-interface-guidelines/materials)
- [Apple HIG — Color](https://developer.apple.com/design/human-interface-guidelines/color)
- [Apple HIG — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [Apple HIG — Typography](https://developer.apple.com/design/human-interface-guidelines/typography)

Essas fontes foram usadas para escolhas de design. A plataforma **não** é produto da Apple nem possui aprovação ou certificação da empresa.


### Versão 4.0 — Separação P2/P1

A biblioteca P1 é uma rota secundária explícita no menu principal, com indicadores próprios, filtros por tema, decisões N2/N3 e simulado independente. Mantêm-se os princípios de hierarquia, consistência, tipografia acessível, foco programático no título de nova rota, navegação com teclado, alvos de toque apropriados e contraste.
