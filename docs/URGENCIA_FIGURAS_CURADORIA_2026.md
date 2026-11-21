# Clínica Master — Curadoria visual de Urgência e Emergência (21/11/2026)

## Objetivo e segurança

A pedido do usuário, os **23 módulos** foram revisados para incorporar figuras quando realmente favorecem a compreensão clínica, **sem incorporar o slide/PDF completo, sem mencionar docentes ou instituições na interface** e sem mexer nas questões ou nos registros dos alunos.

- **23 arquivos JPEG individuais** extraídos de objetos de imagem já presentes nos PDFs. Os objetos foram extraídos sem renderizar a página inteira; preservam resolução e cores originais. A origem ficou registrada abaixo para conferência.
- **23 figuras vinculadas à interface em 9 módulos**. Foi evitado reutilizar uma radiografia de IRpA como se representasse EAP cardiogênico; esse tema recebeu um algoritmo visual específico. Critério: pertinência acima de quantidade.
- **14 módulos com diagramas editoriais autorais**, quando não havia figura adequada extraível dos documentos fornecidos. O módulo PCR oferece a figura diretamente na decisão de ritmo dentro da experiência guiada.
- Imagens com autoria ou licença de terceiros devem ser verificadas antes de qualquer redistribuição externa; extração do arquivo não implica transferência dos direitos de publicação.
- **Não há iframe, preview de PDF nem link para slides completos** na aula. O material original do Drive não foi modificado.

## Arquitetura

- `assets/urgencia/figures/*`: JPEGs extraídos como imagens individuais de PDFs, sem recapturar página ou slide.
- `emergency-visual-data.js`: catálogo com título acessível, pergunta de observação e aplicação clínica, mais 14 diagramas de decisão e 17 alertas de revisão de diretrizes.
- `course-kit.js`: novo callback **opcional** `sectionAddon(m,si)`, acionado após a seção de conteúdo escolhida. A mudança não modifica cursos não participantes.
- `emergency.js`: usa o Atlas apenas nas aulas de Urgência, no ponto relacionado à teoria; elimina mapa genérico redundante.
- `emergency-pcr-pilot.js`: mostra um registro de taquicardia ventricular extraído do PDF juntamente com o traçado esquemático no bloco de algoritmo.
- `emergency-course.css`: cards responsivos, imagens proporcionais `object-fit:contain`, lazy-loading e legendas curtas.
- `tests/urgencia-figuras-2026.test.cjs`: integridade dos 23 módulos, existência e formato de JPEG, fontes relativas, inexistência de slide inteiro e não regressão do histórico.

## Proveniência das imagens

| Tema | Origem (arquivo PDF, sem divulgação na página) | Página aprox. | Figura isolada |
|---|---|---:|---|
| PCR | Aula PCR.pdf | 27 | ECG com taquicardia ventricular |
| Arritmias | Aula Arritmias Cardiacas.pdf | 14, 23, 29, 34 | ECG supraventricular, TV, bloqueios AV, FV/TVSP |
| Arritmias | Arritmias cardiacas.pdf (resumo) | 2, 3 | Extrassístoles e complexo largo |
| AVC | Acidente vascular encefálico.pdf | 3, 12 | 3 TC cranianas |
| IRpA | Aula IRpA.pdf | 3, 23, 24 | Troca alvéolo-capilar, RX e TC de tórax |
| Sepse | Sepse.pdf | 9, 11 | Resposta imune e disfunção endotelial |
| Choque | Choque.pdf | 8, 19 | Troca microcirculatória e moteamento |
| Trauma | AULA TRAUMA.pdf | 8, 14, 18 | Via aérea, anatomia torácica e estabilização pélvica |
| Sensório | Aula rebaixamento de sensorio.pdf | 4, 12, 15 | Sistema reticular, Glasgow e pupilas |

*Nota:* o número de página refere-se ao PDF entregue e foi usado para localizar o objeto gráfico; não é uma referência bibliográfica normativa. A figura de AVC que poderia conter marca institucional foi evitada; foram escolhidas apenas as tomografias sem esse elemento. O Atlas usa imagens pertinentes à aula, sem atribuir a elas diagnóstico definitivo sem contexto.

## Comparação com diretrizes atuais (verificação 21/11/2026)

O conteúdo dos slides foi tratado como **fonte histórica de recursos visuais**, não automaticamente como recomendação clínica atual. As revisões abaixo foram comparadas com referências oficiais públicas:

1. PCR: **AHA 2025** BLS/ACLS e pós-parada. Conferir ritmos, prioridade de desfibrilação e metas pós-RCE.
2. AVC isquêmico: **AHA/ASA 2026**. Alteplase/tenecteplase na janela apropriada, seleção por imagem em situações específicas e cautela com redução intensiva de pressão arterial após reperfusão.
3. Sepse: **Surviving Sepsis Campaign 2026**. Tratamento paralelo, avaliação dinâmica de perfusão, noradrenalina de primeira escolha e controle de foco quando indicado.
4. Asma: **GINA 2026**. Avaliação de gravidade e reavaliação após broncodilatadores e corticosteroides.
5. Diabetes: **ADA 2026** e consenso de crises hiperglicêmicas em adultos. Diferenciar CAD/EHH, hipocalemia e risco de CAD euglicêmica.
6. Hipertensão: diretriz **AHA/ACC 2025**. Valor pressórico sozinho não define lesão aguda de órgão-alvo.
7. Hipercalemia: **UK Kidney Association, julho/2026**, com estabilização da membrana quando indicada, translocação, eliminação e monitorização.
8. Emergências tireoidianas: consensos clínicos **2026** para tempestade tireotóxica e coma mixedematoso.
9. VM/SDRA: recomendações de ventilação protetora, monitorização de pressão de platô e mecânica respiratória.

Os alertas de diretriz foram acrescentados ao final de cada componente visual relevante com links ao documento. **Não houve troca de gabaritos, doses nas questões nem histórico dos alunos**. Correções quantitativas não fundamentadas ou de outros 14 temas não foram inventadas.

## Limites da entrega

- A seleção gráfica foi verificada por contact sheets; os recortes são imagens existentes nos PDFs, não screenshots de slides inteiros.
- Há atlas visual em 23 módulos, porém **nem todas as disciplinas tinham imagens extraíveis clinicamente adequadas**. Nesses casos há esquemas editoriais — não fingir que o diagrama foi extraído do PDF.
- Validação de renderização com motor JavaScript e conferência de integridade dos arquivos; QA visual de navegador real e testes por dispositivo e sessão autenticada ainda precisam ser executados.
- Os materiais do Drive consultados não foram alterados, e não foram feitos posts, compartilhamentos ou alterações em Notion.

## Fontes oficiais

- [AHA 2025 — BLS](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support/)
- [AHA 2025 — Post-Cardiac Arrest Care](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/post-cardiac-arrest-care/)
- [AHA/ASA 2026 — AVC isquêmico](https://professional.heart.org/en/science-news/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-stroke)
- [SSC 2026 — Sepse/choque séptico](https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026)
- [GINA — Guia 2026](https://ginasthma.org/2026-gina-summary-guide/)
- [UKKA — Hipercalemia, atualização jul/2026](https://guidelines.ukkidney.org/hyperkalaemia/)
