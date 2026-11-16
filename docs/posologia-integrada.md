# Posologia e orientação de uso

Catálogo ampliado em 16/11/2026: 279 fichas, incluindo as 16 anteriores. São 269 esquemas contextuais adicionais, com fontes próprias. Quatro fichas estão explicitamente pendentes de dose numérica: atropina, dipirona, domperidona e solução de Lugol. A apresentação IV antiarrítmica de lidocaína foi localizada e conferida; a ficha anterior pendente foi substituída pelo regime documentado. Esquemas de outras indicações ou apresentações não são validados automaticamente.

## Acesso e integração

- Aulas, questões e casos de Clínica, Cirurgia, ECG, POCUS, Hemograma, Antimicrobianos e laboratórios: painel recolhível **Posologia e orientações de uso** com os medicamentos mencionados. A primeira menção no texto pode abrir a ficha diretamente.
- Manual central: todas as 279 fichas; filtros existentes e os 16 cálculos anteriores preservados.
- Classes farmacológicas oferecem exemplos de moléculas, sem atribuir uma dose única à classe.
- Anemia microcítica: ferro elementar oral e fichas separadas de carboximaltose férrica e sacarato de hidróxido férrico IV, com populações e apresentações identificadas.
- Urocultura: nitrofurantoína e ciprofloxacino acessíveis nas aulas e nos casos. Simulador removido; interpretação de S/I/R em texto e tabelas, separada de indicação e dose. Categoria I não autoriza duplicação automática.

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

**A confirmar:** algoritmo aplicável à atropina na bradicardia; bula brasileira da apresentação de dipirona; indicação e apresentação de domperidona; concentração e esquema da solução de Lugol. A ficha da insulina NPH explica a individualização e não inventa uma dose fixa. Somatostatina e prostaciclinas exigem molécula/indicação própria. Regimes diferentes do contexto identificado, como Wernicke, infusão de magnésio em torsades, somatostatina e quimioterapia combinada completa, continuam dependentes de fonte própria. Algumas bulas divergem de protocolos clínicos; isso é informado e não resolvido por extrapolação.

Conferência documental não equivale a revisão docente ou prescrição individual. A revisão docente externa permanece pendente. Não foram realizados testes em Safari físico.

## Implementação e verificação

`posology-data.js` amplia os registros existentes sem mudar formatos obrigatórios. `posology.js` identifica menções em nós de texto, preserva alternativas, links, formulários e conteúdo editável e acompanha feedback inserido após a renderização. `clinical.js` aceita o campo opcional `regimens`. Nenhuma consulta de ficha é salva, e não há cálculo com dados de pacientes. O diálogo fecha ao encerrar sessão e devolve foco ao acionador.

A integração também alcança o Laboratório Master independente de microcitose, sem mudar suas chaves de progresso.

Os testes cobrem fontes/estrutura, aliases e siglas sem falsos positivos conhecidos, navegação entre cursos, separação entre interpretação e prescrição, unidades e regimes críticos, atualização parcial, foco/teclado, isolamento de armazenamento e telas de 320, 390, 820 e 1280 px nos dois temas. O Supabase é interceptado nos testes, sem alteração de dados reais.

A revisão de cobertura acrescentou associações com inibidores de betalactamase, opções neurológicas, endocrinológicas, urológicas e oncológicas. Albumina, calcitriol, magnésio, bicarbonato e eritropoetina exigem contexto farmacológico para não transformar um simples marcador laboratorial em sugestão terapêutica. A busca do manual aceita aliases e todos os contextos de esquemas da ficha.

Na cetoacidose, a aula foi alinhada ao consenso de 2024 quanto a fluidos, fósforo e resolução por cetona plasmática e pH ou bicarbonato. O ânion gap não é utilizado como critério de resolução. A referência de 2009 permanece identificada como histórica.

A ficha de magnésio apresenta a referência AHA/ACCF de 2010 para torsades, com ano explícito. Atualização mais recente, velocidade de infusão e algoritmo de reanimação aplicável continuam a confirmar nesta rodada. Regimes históricos de bula de quimioterapia não equivalem a protocolos completos atuais, como ABVD, o que é sinalizado.
