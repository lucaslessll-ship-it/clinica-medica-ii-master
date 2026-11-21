# Clínica Master · Urgência e Emergência — Banco de Questões (21/11/2026)

## Implementação

Novo banco de Urgência com a mesma semântica visual e de histórico já utilizada em Cirurgia, sem alteração das questões/progresso dos demais módulos.

| Tipo | Disponibilidade | Observações |
|---|---:|---|
| Fixação das 23 aulas (P1/P2) | 115 | Questões de `EMERGENCY_CONTENT`; IDs próprios e gabaritos preservados |
| Modelo de residência (autoral) | 46 | Duas questões clínicas adicionais por aula, casos e justificativas |
| Questões de prova pública **adaptadas** | 11 | Enunciados e alternativas reformulados; link para prova real e numeração; apenas 4 gabaritos FGV originais confirmados |
| **Total corrigível** | **172** | Filtros N1/N2/N3, tipo, P1/P2, temas específicos, inéditas ou erradas |
| Índice de originais para consulta | 25 | Links para os PDFs oficiais por número/página, sem cópia do caderno |
| Total aulas com seleção de tema | 23 | Mesmo catálogo de temas das aulas |

**Atenção:** O índice de questões originais **não é** um banco de transcrições completas; a leitura original acontece no site da banca, preservando seus direitos autorais e o contexto das imagens/tabelas. As questões avaliáveis de fonte pública são **adaptações educacionais**, não cópias literais, com gabarito da versão reformulada. Não apresentar os 172 itens como 172 provas reais.

## Fontes e auditoria dos cadernos

1. **TEME/ABRAMEDE 2024**, prova de título em Medicina de Emergência, 100 itens, usada para localizar itens 2, 3, 4, 5, 7, 8. <https://www.conferencebr.com/conteudo/arquivo/teme-2024-com-capa--final-1727212936.pdf>
2. **TEME/ABRAMEDE 2025**, prova de título em Medicina de Emergência, 100 itens, itens 1–8 relevantes. <https://www.conferencebr.com/conteudo/arquivo/espelho-prova-teorica-1756678957.pdf>
3. **FGV/EBSERH 2026**, prova específica Medicina de Emergência (cargo de concurso, **não residência**), itens 31–34; gabarito definitivo Q31=B, Q32=B, Q33=C, Q34=A. <https://conhecimento.fgv.br/sites/default/files/concursos/g011-medicina-de-emergencia-g011-tipo-1.pdf> e <https://conhecimento.fgv.br/sites/default/files/concursos/hubrasil2026_gabaritos_definitivo.pdf>.
4. **FUVEST/HRAC 2025**, residência de acesso direto (prova A), itens 14 e 89. <https://fuvest.br/wp-content/uploads/hrac2025_provaA_areas-basicas-acesso-direto.pdf>.
5. **UNICAMP/Comvest 2023**, residência de acesso direto, prova X, itens 1, 2, 27, 30, 42. <https://www.comvest.unicamp.br/residenciamedica2023/provas/tADX.pdf>.
6. **ENARE 2021/2022**, o URL direto fornecido não pôde ser carregado (timeout); existe o índice oficial dos cadernos, mas **nenhum item do ENARE foi importado/atribuído como verificado**: <https://www.gov.br/ebserh/pt-br/ensino-e-pesquisa/exame-nacional-de-residencia-enare/edicoes-anteriores/2021-2022/provas>.

Os itens das bancas não foram automaticamente aceitos como diretrizes atuais. Os comentários são autorais e seguem o material científico do curso (AHA 2025, SSC 2026, ATLS 11, GINA 2026, AHA/ASA 2026 e demais referências por módulo).

## Funcionalidades

- Barra lateral **Urgência e Emergência → Questões / Simulados**.
- **Montar treino/simulado:** quantidade de 1 até 120 (limitada também ao banco filtrado), duração de 0 a 300 minutos, temas individualmente selecionáveis (todos/nenhum), P1/P2, N1/N2/N3, tipo de questão, apenas erradas e apenas inéditas.
- **Treino:** alternativas em ordem aleatória por sessão, feedback após resposta, resumo clínico e botão para aula completa, navegação e bolinhas cinza/verde/vermelho, sem repetir tentativa acidental na mesma sessão.
- **Simulado:** gabarito oculto até entrega, cronômetro por prazo absoluto `deadline`, cada resposta registrada na sessão e `stateSave()` invocado imediatamente, bolinhas marcadas e correção individual após entrega, resultado resumido e novo simulado.
- **Histórico:** integração com `QuestionHistory.begin/touch/restore/panel/clear` sob a chave **`store.study.ueQuestions`**, com identificação de cada sessão, nº respondidas, total e acertos, retomada/consulta e opção de limpeza exclusiva de Urgência. Respostas de outras disciplinas permanecem intocadas.
- **Banco identificável:** IDs estáveis, `sourceLink`, `originalId`, ano e número da banca para adaptações, quando aplicável.
- **UI mobile:** grid responsivo, botões no formato bolinhas, links externos com abertura em nova aba.

## Código

- `.../emergency-bank-data.js`: 46 itens autorais, 11 adaptações, 25 metadados de originais e 6 registros de fonte
- `.../emergency-bank.js`: seleção, questões, simulados, timer e persistência/histórico
- `.../emergency-bank.css`: interface de filtros e estado de questões
- `.../app.js`: menu lateral e duas rotas novas
- `.../index.html`: scripts/estilos e renovação de cache
- `tests/urgencia-banco-questoes-2026.test.cjs`: regressão de quantidade, respostas, sessões e HTML

## Verificações

- Executada avaliação dos scripts por motor JavaScript simulado, com mock de `store`, `navigate`, `stateSave`, `QuestionHistory` e das rotas.
- Confirmados: 172 IDs únicos e 25 questões originais localizadas; 11 adaptações; 23 aulas; filtros; resposta de treino gravada no estado e marcada verde; navegação e retomada de sessão; resposta de prova gravada sem gabarito prematuro; nota final, bolinhas verdes e comentário após a entrega; menu e ordem de scripts.
- **Não confirmados**: QA em browser real com autenticação, envio/merge de `store.study.ueQuestions` entre dispositivos, deploy Cloudflare e auditoria médica de cada item por docente.
- Os cadernos integrais continuam em seus sites. Não confundir prova de **título TEME** ou prova de **concurso FGV** com residência de acesso direto.
