# Auditoria de legibilidade — Fluxo de Estudos MASTER 2.00

Validação de contraste pelas cores CSS explícitas, usando a razão WCAG. Não é uma garantia de acessibilidade de toda a interface.

| Estado | Texto | Fundo | Contraste | Meta 4,5:1 |
|---|---|---|---:|---|
| Padrão claro | `#173b3e` | `#ffffff` | 12.13:1 | Atingida |
| Selecionado claro | `#075a4f` | `#daf4e9` | 7.00:1 | Atingida |
| Hover claro | `#075a4f` | `#e9f7f2` | 7.37:1 | Atingida |
| Padrão escuro | `#eaf8f4` | `#1e3339` | 12.11:1 | Atingida |
| Selecionado escuro | `#f2fff9` | `#235348` | 8.51:1 | Atingida |

## Correção
Foi adicionada regra de cor explícita em `evidence.css` para `.stage` e `.stage.active`, incluindo os estados `:hover`, `:focus-visible` e tema escuro. O fundo dos sete passos não deve depender da herança de estilos de botões globais.

## Escopo e limitações
- Sintaxe dos 12 módulos JavaScript e quatro folhas CSS conferida.
- Inspeção visual automatizada no Chromium não pôde ser executada: política de ambiente bloqueou a navegação local, inclusive `file://`.
- Após publicar no GitHub Pages, conferir manualmente no Safari do iPad: Dashboard → Fluxo MASTER 2.00; alternar modo claro e escuro; verificar estados selecionado e foco.
- Garantir que títulos, etiquetas, botões, chips e cards conservem contraste ao modificar temas em outras atualizações.