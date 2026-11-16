# Posologia e orientação de uso

Catálogo ampliado em 15/11/2026: 202 fichas, incluindo as 16 anteriores. Foram acrescentadas 186 fichas e 188 esquemas contextuais com fontes documentais. Três fichas novas estão explicitamente pendentes de dose numérica: atropina, lidocaína e dipirona. Os esquemas novos documentados são 188 distribuídos por 183 medicamentos; as três fichas pendentes não contam como esquemas conferidos.

## Acesso e integração

- Aulas, questões e casos de Clínica, Cirurgia, ECG, POCUS, Hemograma, Antimicrobianos e laboratórios: painel recolhível **Posologia e orientações de uso** com os medicamentos mencionados. A primeira menção no texto pode abrir a ficha diretamente.
- Manual central: todas as 202 fichas; filtros existentes e os 16 cálculos anteriores preservados.
- Classes farmacológicas oferecem exemplos de moléculas, sem atribuir uma dose única à classe.
- Anemia microcítica: ferro elementar oral e fichas separadas de carboximaltose férrica e sacarato de hidróxido férrico IV, com populações e apresentações identificadas.
- Urocultura: nitrofurantoína e ciprofloxacino acessíveis também no simulador. S/I/R continua separado de indicação e dose; categoria I não autoriza duplicação automática.

Cada esquema documentado apresenta contexto, dose/via/frequência, duração ou reavaliação, administração, riscos/ajustes/monitorização e fontes próprias. Regimes de bula EUA são identificados e não apresentados como uma diretriz brasileira. O catálogo não confirma todos os ajustes por indicação, idade ou apresentação.

## Fontes e limites

As fichas novas usam seções de posologia das apresentações identificadas no DailyMed/FDA, com versão/publicação e URL visíveis, além de NICE NG109, NG141, NG185, NG239; BSG 2021; consenso internacional de crises hiperglicêmicas de 2024; diretriz europeia de hemorragia no trauma de 2023; e atualização SHEA de prevenção de infecção cirúrgica de 2022, publicada em 2023. A data de conferência das 16 fichas anteriores foi preservada. Bulas integrais, imagens de bulas e PDFs de terceiros não foram incluídos no repositório.

Comparações que precisam permanecer explícitas:

- Nitrofurantoína: apresentação e população determinam o intervalo e a duração; bula monoidratada/macrocristais e NICE não foram fundidas.
- Vancomicina IV e oral: fichas distintas; a dose oral para C. difficile não trata infecção sistêmica.
- Cefazolina: comparador de peso, redose e interrupção ao fechamento segundo a fonte identificada.
- Insulina na cetoacidose: potássio abaixo de 3,5 mmol/L exige reposição e adiamento de insulina até correção conforme consenso de 2024.
- Metotrexato para artrite reumatoide: semanal, sem conversão para uso diário.
- Fórmulas de ferro, sais, unidades e concentrações não são intercambiáveis automaticamente.

**A confirmar:** dose atual de atropina na bradicardia na diretriz aplicável; apresentação IV antiarrítmica da lidocaína; bula brasileira da apresentação de dipirona. A ficha da insulina NPH explica a individualização e não inventa uma dose fixa. Somatostatina e prostaciclinas exigem molécula/indicação própria. Regimes diferentes do contexto identificado, como Wernicke, infusão de magnésio em torsades, somatostatina e quimioterapia combinada completa, continuam dependentes de fonte própria. Algumas bulas divergem de protocolos clínicos; isso é informado e não resolvido por extrapolação.

Conferência documental não equivale a revisão docente ou prescrição individual. A revisão docente externa permanece pendente. Não foram realizados testes em Safari físico.

## Implementação e verificação

`posology-data.js` amplia os registros existentes sem mudar formatos obrigatórios. `posology.js` identifica menções em nós de texto, preserva alternativas, links, formulários e conteúdo editável e acompanha feedback inserido após a renderização. `clinical.js` aceita o campo opcional `regimens`. Nenhuma consulta de ficha é salva, e não há cálculo com dados de pacientes. O diálogo fecha ao encerrar sessão e devolve foco ao acionador.

Os testes cobrem fontes/estrutura, aliases e siglas sem falsos positivos conhecidos, navegação entre cursos, separação entre interpretação e prescrição, unidades e regimes críticos, atualização parcial, foco/teclado, isolamento de armazenamento e telas de 320, 390, 820 e 1280 px nos dois temas. O Supabase é interceptado nos testes, sem alteração de dados reais.
