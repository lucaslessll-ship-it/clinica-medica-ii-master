# Componentes abertos acrescentados ao Laboratório

## AMR 3.1.0

Dados de referência: Matthijs S. Berends e colaboradores, projeto AMR, versão 3.1.0, commit 052edc476158f1bad7a3df3b0fc78c95eea8ace4.

Origem: https://github.com/msberends/AMR/tree/v3.1.0.

Licença do componente: GPL-2. Cópia integral: tools/amr/LICENSE. Recorte distribuído: MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/amr-uro-data.js. Reprodução e atribuição: tools/amr/gerar_recorte.py e tools/amr/LEIA-ME.md.

Foram selecionadas três regras de interpretação da reprodução EUCAST 16.1. Fonte e hashes são preservados. Nenhum código do runtime R ou do pacote AMR é executado no navegador. Isso não atribui uma licença à totalidade do projeto ou aos documentos originais EUCAST/BrCAST.

## Ferramentas de otimização e validação

- Vite 8.3.8 — MIT — https://github.com/vitejs/vite
- ts-fsrs 6.0.0 — MIT — https://github.com/open-spaced-repetition/ts-fsrs. Código incluído no build; licença distribuída em assets/vendor/FSRS-LICENSE.txt.
- axe-core/Playwright 4.14.0 — MPL-2.0 — https://github.com/dequelabs/axe-core (integração https://github.com/dequelabs/axe-core-npm). Usado nos testes, sem execução para visitantes.
- Lighthouse CI 0.16.1 — Apache-2.0 — https://github.com/GoogleChrome/lighthouse-ci. Usado em auditoria local e CI.
- Promptfoo 0.125.1 — MIT — https://github.com/promptfoo/promptfoo. Usado para avaliar perguntas sintéticas com o handler real do tutor.

As dependências de auditoria e avaliação não são incluídas no JavaScript enviado aos visitantes.
