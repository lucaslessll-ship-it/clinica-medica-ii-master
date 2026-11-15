# Auditoria e entregas de Cirurgia

## Ponto de partida

A main `998c7a1`, merge do PR 17, já continha os 14 temas na tela inicial, filtro e contadores dinâmicos, um plano de aulas e o bloco de prova nas 19 aulas de peso 5. Essas partes foram preservadas.

A auditoria identificou as seguintes lacunas:

- O plano reservava também a véspera, não distribuía questões, não apresentava o calendário completo e não atualizava a virada de data.
- O contador Hoje não incluía as revisões de Cirurgia nem atualizava após o carregamento do banco privado.
- O desempenho desaparecia sem respostas e não mostrava a quantidade respondida nos temas com poucos dados.
- As 58 aulas tinham pelo menos 4 pré-testes e 5 evocações, sem casos resolvidos. Havia 212 questões.
- Não havia imagens clínicas locais com licença comprovada.
- POCUS tinha 8 módulos e 26 questões, com esquemas originais, sem roteiro prático por módulo.

## Lote de correção do plano e preparação do renderizador

- Calendário diário de 13 a 19/11, com redistribuição das pendências por peso do tema e somente 19/11 reservado à revisão e ao simulado.
- Aulas e questões autorais distribuídas por dia. A tarefa de hoje diminui conforme é cumprida, sem puxar indefinidamente novas tarefas de amanhã.
- Compatibilidade com o campo `doneAt` da versão publicada, com preservação de notas, resultados e simulados.
- Revisões de Cirurgia somadas às de evocação, com botões próprios e atualização após o banco privado carregar.
- Desempenho dos 14 temas visível, inclusive sem respostas, com contagem e sem percentual quando há menos de 5 respostas.
- Renderização opcional de casos resolvidos e figuras com legenda, crédito, licença, marcações SVG e ampliação acessível. Mantido o formato de prova existente `{c,p,r}`.
- Figuras exigem caminho local WebP, licença CC BY ou CC0, origem HTTPS admitida e 2 a 4 marcações. Isso verifica formato de metadados e não substitui a conferência da licença na origem.
- Correções pontuais de enunciados que apresentavam condutas como regras absolutas.

Validação deste lote em uma cópia exata dos arquivos preparados para commit: 83 testes aprovados, nenhum ignorado, os dois validadores Python aprovados e sintaxe dos 53 arquivos JavaScript válida. As imagens dos testes são figuras geométricas sintéticas e não fazem parte do conteúdo clínico publicado.

Versão preparada: `20261114-plano2`, Interface `2026.11.14.2`.

## Lote dos temas de maior peso e Hérnias

As 19 aulas de peso 5 e as 4 aulas de Hérnias foram ampliadas. Cada uma tem pelo menos 6 pré-testes, 8 perguntas de evocação, 4 itens de prova e 2 casos resolvidos, com novas seções de fisiopatologia, diferenciais, técnica e complicações.

Entraram 69 questões autorais: 10 de Abdome, 14 de Pâncreas, 14 de Hérnias, 13 de Trauma abdominal e 18 de Trauma torácico. O banco passa a ter 281 questões nesta etapa. Esses cinco temas alcançam pelo menos 30 questões, com os IDs anteriores preservados. Os comentários novos explicam as alternativas pelo conteúdo, sem depender das letras que são embaralhadas.

Foram corrigidas imprecisões anatômicas do canal inguinal e qualificadas regras absolutas sobre escore diagnóstico, necrose pancreática, cistos, anticoagulação, laparotomia, hematoma retroperitoneal e TEVAR. Os valores numéricos anteriores não foram certificados como atualizados; as notas de cada aula informam a conferência online a confirmar. Classificações, doses, prazos e pontos de corte atuais continuam sujeitos à revisão nas fontes.

Validação desta etapa em cópia exata dos arquivos preparados: 84 testes aprovados, nenhum ignorado, ambos os validadores Python aprovados e sintaxe dos 54 arquivos JavaScript válida.

Versão preparada: `20261114-cirdeep1`, Interface `2026.11.14.3`.

## Retomada em 15/11: demais aulas de Cirurgia e Radiologia

A main avançou para `aba6505`, com melhorias de tabelas e imagens da base privada. Essas mudanças foram incorporadas, preservando os dois novos testes e o carregamento autenticado das imagens. Esse banco privado não equivale à curadoria de imagens abertas solicitada.

As 35 aulas restantes foram ampliadas e entraram mais 151 questões. A cobertura completa de Cirurgia passa a ser:

| Item | Resultado |
| --- | ---: |
| Aulas aprofundadas | 58 |
| Pré-testes, 6 por aula | 348 |
| Perguntas de evocação, mínimo de 8 por aula | 473 |
| Itens de prova, mínimo de 4 por aula | 250 |
| Casos resolvidos, 2 por aula | 116 |
| Seções de estudo | 395 |
| Questões autorais | 432 |
| Questões anteriores preservadas, incluindo IDs e conteúdo | 212 |
| Novas imagens locais com licença verificada | 0 |

Todos os 14 temas têm pelo menos 30 questões. Abdome e Urologia têm 36. O inventário por aula e tema está em `docs/cirurgia-cobertura.json`.

Validação desta etapa em cópia exata dos arquivos preparados: 86 testes aprovados, nenhum ignorado, ambos os validadores Python aprovados e sintaxe dos 55 arquivos JavaScript válida. O teste das 58 aulas exige pré-teste >= 6, evocação >= 8, prova >= 4 e casos = 2, além dos requisitos anteriores.

Versão preparada: `20261115-cirdeep2`, Interface `2026.11.15.1`.

### Conferência médica pendente

O aprofundamento novo é qualitativo e autoral, com referências anteriores preservadas. Houve revisão offline de coerência dos casos e gabaritos, com amostragem dos comentários. Isso não comprova atualização de todas as diretrizes.

Não foram introduzidas doses, prazos ou pontos de corte novos sem confirmação. Os números anteriores foram preservados e não estão certificados como atuais. A revisão quantitativa de doses, janelas, limiares, classificações completas e protocolos vigentes continua a confirmar nas fontes. Isso inclui critérios atuais de cistos e estadiamento, AAST, limiares de intervenções no trauma e terapias oncológicas. Os referenciais clássicos ATLS e Parkland existentes foram mantidos com contexto nas aulas; sua atualização online ainda está pendente.

As figuras reais abertas de Radiologia, Trauma e POCUS ainda dependem de licença confirmada na origem, download e conversão para WebP de até 1200 px, créditos e marcações. Nenhum arquivo de licença incerta foi incluído.

## POCUS e validação final da integração

Os 8 módulos receberam 4 itens de prova prática, 4 erros técnicos específicos e um roteiro de fala com 6 passos cada. Foram acrescentadas 48 questões com esquemas originais, 6 por módulo, totalizando 74 questões. As 26 anteriores foram preservadas com o mesmo conteúdo e os mesmos índices.

Os esquemas têm ampliação de 100% a 300%, movimento por toque e teclado, rótulos legíveis na visão ampliada e retorno do foco ao fechar. A comparação lado a lado com figuras reais está preparada, mas depende das imagens licenciadas. As novas questões são baseadas em desenhos, não em fotografias reais de ultrassom.

A integração preserva a aba própria de POCUS da main `617c189`, PR 20. O indicador do menu tem fonte mínima de 12 px. Também preserva as tabelas e o banco privado de imagens, com limpeza de imagens, legendas, diálogos e cache ao encerrar a sessão. Respostas atrasadas de outra conta ou sessão são descartadas, e dados de imagem malformados são rejeitados antes da renderização.

Validação final: **96 testes aprovados, nenhum ignorado**, os dois validadores Python aprovados, sintaxe dos 55 arquivos JavaScript válida e `git diff --check` aprovado. O POCUS foi exercitado em 64 combinações de módulo, largura e tema, com persistência das 48 respostas novas e dos registros antigos. Há testes de ampliação em 320 px e de isolamento das imagens entre contas e sessões.

Os testes de interface foram executados em Chromium. Safari nativo não foi executado neste ambiente. Os testes de autenticação e de imagens usam dados simulados; dados reais do Supabase não foram acessados ou alterados e as políticas RLS remotas não foram auditadas.

Versão final preparada: `20261115-cirurgia-pocus1`, Interface `2026.11.15.2`.

## Situação das tarefas na branch de integração

| Tarefa | Implementado | Pendente |
| --- | --- | --- |
| 1. Plano | Calendário, aulas e questões por peso, progresso diário, dias perdidos, revisão em 19/11 e expiração | Nenhum ajuste funcional pendente |
| 2. Início | Temas, filtro, contadores e revisões de Cirurgia | Nenhum ajuste funcional pendente |
| 3. Desempenho | Contagem, ordenação e tratamento de poucos dados | Nenhum ajuste funcional pendente |
| 4. Aprofundamento | 58 aulas, 116 casos, pré-testes, evocações, prova e 220 questões novas | Conferência quantitativa e de diretrizes atuais, classificações completas |
| 5. Imagens reais abertas | Renderizador e metadados com crédito, licença e marcações | Curadoria, comprovação de licença na origem e todos os arquivos de imagem locais |
| 6. POCUS | Conteúdo prático, fala, erros, 74 questões e ampliação | Imagens reais licenciadas, questões vinculadas a essas fotografias, conferência das fontes |

A branch `cirurgia-aprofundamento` reúne a integração final. As branches `cirurgia-plano-revisado`, `cirurgia-aulas-prioritarias` e `cirurgia-aulas-completas` registram as etapas anteriores de preparação. A integração utiliza PR, merge e confirmação do workflow de Pages para publicação.

## Fontes e publicação

Durante as etapas anteriores, o proxy permitia apenas o Supabase como domínio personalizado e retornava CONNECT 403 para a API do GitHub e fontes médicas. Após a publicação da configuração do ambiente em 15/11, os domínios previstos passaram a estar liberados e o acesso à API do GitHub foi confirmado.

A configuração de rede foi aplicada ao ambiente ativo. Credenciais ou valores secretos não foram publicados.

Publicação exige PR, merge na main e confirmação do Pages. Enviar uma branch não equivale a publicar. O sucesso do Pages não deve ser presumido apenas pelo histórico de merge.

## Preparação da publicação autorizada

A integração foi atualizada com a main `9a6e986`, incluindo as marcações das imagens privadas e os quatro módulos adicionais de POCUS. Eles foram preservados na ordem da main. O curso totaliza 12 módulos e 86 questões: as 38 anteriores da main permanecem preservadas, com as 48 questões de esquemas acrescentadas nos oito módulos originais. O progresso continua identificado pelo ID de cada módulo.

As marcações existentes funcionam com as proteções de sessão e validação de imagens. Não houve escrita no Supabase. Os textos novos independentes e o mapa de Hemograma foram salvos em `docs/rascunhos-cursos`, para revisão e integração futura. Os livros e PDFs não integram o repositório.

Versão de publicação preparada: `20261115-ecg1`, Interface `2026.11.15.4`. A autorização de publicação não representa certificação dos números clínicos ou das licenças ainda pendentes neste relatório.

A verificação final da integração atualizada com os 12 módulos aprovou 96 testes, ambos os validadores Python e a sintaxe dos 55 arquivos JavaScript. O teste de telas do POCUS percorre 96 combinações de módulo, largura e tema. O estado da publicação é acompanhado no workflow GitHub Pages do repositório.
