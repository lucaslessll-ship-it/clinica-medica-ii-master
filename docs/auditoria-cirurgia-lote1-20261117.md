# Auditoria editorial e clínica — Cirurgia, lote 1 (17/11/2026)

**Escopo:** banco autoral público de 432 questões em \`cir_questions.js\`. Não inclui o banco privado \`cir_bank\` do Supabase, questões de provas antigas nem todos os módulos da plataforma.

## Diagnóstico do banco — avaliação automatizada

- **432 questões / 432 IDs únicos / 14 assuntos**, distribuídos de forma estável.
- **Gabarito original:** 108 questões com resposta A, 108 com B, 108 com C e 108 com D (25% cada).
- **113/432 (26,2%)** tinham a resposta correta como alternativa mais longa **ou empatada** na primeira verificação; este não era o viés dominante.
- **22 questões** tinham pelo menos duas alternativas incorretas contendo expressões heurísticas como "sempre", "nunca", "apenas", "dispensar" ou "isolado". Isso é um **sinal de revisão**, não prova de erro.
- Não houve, na auditoria estrutural inicial, alternativas faltantes, IDs duplicados, gabaritos fora de 0–3 ou explicações vazias.
- As questões já eram predominantemente vinhetas clínicas. Não é necessário converter todas para casos.
- **Alerta:** balanceamento de letras não equivale a validade médica. A análise de conteúdo por especialista é independente e continua necessária.

## Lote 1 — sete questões revisadas com referências

| ID | Competência | Motivo da revisão | Referência principal |
| --- | --- | --- | --- |
| \`cirpanc-14\` | Interpretação de CA 19-9 sob colestase | Evitar tomar marcador como confirmação/estadiamento; criar distinções clínicas mais realistas | ESMO 2023; MedlinePlus (NIH) |
| \`cirremit-14\` | Intoxicação por CO no incêndio | Diferenciar oximetria comum, PaO₂, cooximetria e tratamento imediato | CDC |
| \`cirvb-05\` | Alto risco ASGE de coledocolitíase | Evitar distratores triviais e cobrar o critério combinado de bilirrubina/dilatação | ASGE 2019 |
| \`cirvb-17\` | Risco intermediário de coledocolitíase | Diferenciar EUS/MRCP de CPRE diagnóstica, sem induzir pelo texto | ASGE 2019 |
| \`ciresof-04\` | Barrett não displásico, 4 cm | Cobrar intervalo de vigilância por extensão, evitando soluções extremas | ACG 2022 / AGA 2025 |
| \`cirvasc-28\` | Úlcera mista e compressão | Exigir avaliação da perfusão e reconhecimento de limiares de risco | ESVS 2022 |
| \`cirestom-11\` | Hemostasia em úlcera Forrest IIa | Distinguir adrenalina transitória de terapia definitiva do vaso | ESGE 2021 / ACG 2021 |

As URLs de referência são registradas no campo \`refs\` de cada questão e **mostradas somente após responder ao treino ou finalizar o simulado**.

## Proteções de integridade

1. Todos os **IDs**, **temas (\`t\`)** e **gabaritos (\`a\`)** permaneceram idênticos.
2. Somente as sete questões acima tiveram \`q\`, \`o\`, \`why\`, \`revision\` e \`refs\` alterados. As outras 425 foram preservadas.
3. O gabarito agregado permanece em **108/108/108/108**. Alternativas ainda são embaralhadas na interface, e o gabarito não aparece antes da resposta.
4. Revisões mudaram o campo \`revision\` para \`cir-20261117-a1\`, de modo que respostas antigas não sejam confundidas com domínio do novo enunciado. O histórico anterior não é apagado.
5. Os links têm validação de formato e proteção \`noopener noreferrer\` e são exibidos apenas na correção.
6. Nenhuma tabela, política ou linha do Supabase foi alterada nesta etapa.

## Limitações e revisão necessária

- **Não há garantia de erro médico zero.** A verificação bibliográfica e a revisão por modelo são etapas importantes, mas não substituem uma segunda leitura crítica de cirurgião/professor quando houver risco de controvérsia.
- As outras **425 questões** passaram apenas por auditoria estrutural/heurística, não por revisão clínica individual conclusiva.
- Questões antigas, banco privado e outras disciplinas ficam fora deste lote. Não foram reescritas.
- Erros de distribuição e tamanho podem ser detectados por script; **ambiguidades clínicas, evolução de diretrizes e qualidade dos distratores exigem avaliação semântica**.

## Próximas prioridades

1. Revisar o restante das questões sinalizadas por pistas verbais, começando por \`cirrad-09\`, \`cirproc-27\`, \`cirproc-13\`, \`cirtabd-23\` e \`ciruro-27\`, **após conferir se a redação realmente revela o gabarito**.
2. Aplicar análise semântica por especialidade e identificar itens quase redundantes (por exemplo, as duas vinhetas de hematúria \`ciruro-02\` e \`ciruro-27\`).
3. Auditar o banco privado de questões separadamente, sem modificar questões de provas anteriores ou o seu vínculo de origem.
4. Conferir os temas e a complexidade com **provas históricas da banca** para orientar N1/N2/N3; não inferir prevalência sem ler as provas.
5. Expandir revisão para P2 e P1 após estabilizar e validar os lotes de Cirurgia.

**Comandos de verificação:**
\`node scripts/auditar-questoes-cirurgia.cjs\`
\`node --test tests/cirurgia-editorial.test.cjs\`
\`npm test\`
