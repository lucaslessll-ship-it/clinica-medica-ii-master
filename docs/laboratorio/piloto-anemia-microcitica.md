# Piloto integrado: anemia microcítica

Versão 2026.11.15.2. Acesso pelo curso de Hemograma, botão Abrir laboratório, ou pela busca global. A rota interna é #labferro. Não há outro menu de Hemograma.

## Conteúdo

Três aulas aprofundadas e 18 questões N2/N3: leitura do laudo e unidades; ferritina, hepcidina e inflamação; investigação da causa e prioridade clínica. Nove perguntas de pré-teste, sem contagem automática de acerto.

Cinco casos com duas etapas cada: estoques reduzidos e perda menstrual; restrição inflamatória; anemia recente com preocupação digestiva; microcitose antiga e familiar; mecanismo misto e incompatibilidade de unidades. As resoluções e os comentários são autorais. Todos os resultados são fictícios.

Calculadoras de VCM e saturação de transferrina, com unidades explícitas, vírgula decimal, validação de denominadores e bloqueio de unidades incompatíveis. Os valores digitados nas calculadoras não são salvos.

## Persistência e compatibilidade

Os cursos existentes mantêm IDs, bancos e formatos. CourseKit recebeu duas opções de configuração, extraHome e images, e renderizadores opcionais de módulo/caso. Somente o piloto desativa o carregamento de imagens.

O progresso do piloto usa o campo opcional versionado store.study.labFerro dentro do estado já sincronizado pela conta. Não cria tabelas, registros com novas storage_key ou campos de mídia. Não importa os dados locais da demonstração anterior. Não modifica chaves de Hemograma, ECG ou Antimicrobianos.

Justificativas têm limite de 1.200 caracteres. O histórico detalhado mantém as últimas 100 tentativas; contadores agregados preservam o total. O estado completo é conferido antes de acrescentar notas e tentativas, reservando margem abaixo do limite do payload existente. Falhas de gravação são informadas sem descartar o progresso anterior.

Abrir conteúdo não gera acerto. Erros, uso de ajuda ou consulta à síntese influenciam as revisões. Intervalos de 1, 3 ou 7 dias são parâmetros educacionais ajustáveis, não uma fórmula validada para todos. Navegação usa rotas com hash para permitir recarregar a aula ou o caso.

## Fontes e revisão

Status visível: piloto em revisão docente. Não houve revisão docente externa nesta entrega.

Foram consultados Anemia of inflammation, Blood 133, 2019, online 2018; How I treat anemia in older adults, Blood 143, edição de 2024, online 2023; NICE NG203, de 2021, recomendações 1.7.3 e 1.7.4; NICE NG20, de 2015, recomendações 1.1.1 e 1.2.2; NICE NG12, de 2015, seção colorretal atualizada em 2023. URLs, escopo e data de consulta constam em REFS no arquivo lab-ferropenia-data.js.

AGA, BSG e páginas OMS ficaram indisponíveis nesta rodada. Seus pontos de corte não foram incluídos como regras numéricas universais. Doses, limiares transfusionais, metas de resposta e prazos de reposição permanecem a confirmar e não foram acrescentados ao piloto. Não houve cópia de figuras, casos ou tabelas de livros. O piloto usa laudos autorais sem imagens.

## Verificação

Testes de conteúdo e gabaritos, entrada pelo Hemograma e busca, persistência ao recarregar, etapas progressivas, revisão com ajuda, fórmulas e unidades, limites de armazenamento, preservação do progresso antigo e isolamento entre contas com autenticação simulada. Verificações em 320, 390, 820 e 1280 px, nos temas claro e escuro, com teclado, toque sintetizado e movimento reduzido.

Os testes não acessam dados reais do Supabase. Safari físico e revisão completa por leitor de tela permanecem pendentes. A publicação não representa validação médica externa de todos os cursos existentes.

## Próximos lotes

1. Revisão docente e conferência das fontes primárias ainda pendentes.
2. Piloto de urocultura e antibiograma com norma, versão e erratas BrCAST/EUCAST conferidas.
3. Catálogo integrado e expansão gradual para rim, eletrólitos, gasometria e demais trilhas do plano.
4. Pendências de imagens de ECG/POCUS e curso de Radiologia em etapas próprias.
