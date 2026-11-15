# Recorte didático de dados abertos AMR

Upstream: https://github.com/msberends/AMR, versão 3.1.0, publicada em 16/10/2026, commit 052edc476158f1bad7a3df3b0fc78c95eea8ace4. Autoria: Matthijs S. Berends e colaboradores. Referência do software: https://doi.org/10.18637/jss.v104.i03.

Licença declarada pelo projeto: GPL-2, preservada integralmente em LICENSE. Os três registros derivados desse conjunto mantêm atribuição e rastreabilidade em amr-uro-data.js. Este registro não altera a licença dos demais arquivos do site nem declara licença sobre normas de terceiros.

O pacote documenta apoio ao uso público de seus dados por representantes de EUCAST e CLSI. Isso não equivale a declarar que qualquer documento original dessas instituições tenha licença GPL. A distribuição consultada e seus termos estão em https://github.com/msberends/AMR/blob/v3.1.0/man/clinical_breakpoints.Rd e https://github.com/msberends/AMR/blob/v3.1.0/LICENSE.

## Reprodução

Na raiz do projeto: `python3 tools/amr/gerar_recorte.py`.

O processo usa Python para consultar arquivos de dados da distribuição fixada AMR. Não executa R, não instala pacote no navegador, não consulta pacientes nem altera banco de dados. Falha se o hash, a quantidade de correspondências, os limites ou as notas diferirem do recorte conferido. Compara os arquivos bruto e normalizado da mesma distribuição; não são duas fontes clínicas independentes.

Entradas: data-raw/breakpoints_eucast_raw.csv e data-raw/breakpoints_eucast.csv, no commit fixado. Saída: amr-uro-data.js com três regras e hashes SHA-256 completos.

Recorte: EUCAST 2026, revisão 16.1. E. coli e nitrofurantoína por CIM/disco em cistite não complicada; E. coli e ciprofloxacino por CIM em indicações diferentes de meningite. O escopo foi limitado a E. coli mesmo quando a linha de origem se refere a Enterobacterales. Não há extensão taxonômica automática.

Não foram importadas regras CLSI, ECOFFs, tabelas veterinárias, disco de ciprofloxacino ou o conjunto completo. Nota ausente na extração não representa revisão de todas as condições de teste e incertezas do documento original.

## Limite de conferência

As páginas originais BrCAST e EUCAST retornaram bloqueio da política de rede em 15/11/2026. Os números foram conferidos na reprodução versionada AMR, não por leitura direta do documento original nesta sessão. A interface informa essa origem secundária e a revisão docente pendente. Não chamar esse recorte de BrCAST e não usar como ferramenta clínica ou gerador de prescrição.
