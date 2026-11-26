# Padrão editorial Mastery

Este padrão se aplica a novos cadernos e revisões editoriais no Clínica Master. A primeira implementação está em Urgência e Emergência, P2, Arritmias cardíacas. Entregue cada tema com os fluxos utilizáveis antes de avançar para o seguinte.

## Roteiro de produção por tema

1. Defina competências de reconhecimento, diagnóstico, tomada de decisão, farmacologia e procedimentos. Faça uma matriz que vincule cada conceito a uma seção, a uma pergunta de recuperação ativa e a questões com dificuldade editorial. Preserve a ordem de estudo aprovada.
2. Liste as diretrizes vigentes e os protocolos conflitantes. Registre edição, data de conferência, URL e qual seção sustenta cada afirmação relevante. Use bibliografia institucional pertinente para preencher lacunas com conteúdo verificável.
3. Escreva o essencial em cerca de um minuto. Inclua definição, mecanismo, achado, critério decisivo, primeira conduta e pegadinha. A revisão de alto rendimento, em 5 a 10 minutos, deve ter valores e critérios, sinais de alarme, interpretação dos exames, comparação de condutas e pódio da memória com três pontos.
4. Construa a Masterclass da fisiologia até a tomada de decisão. Cubra mecanismo, risco, clínica, exames, diferenciais, gravidade, tratamento inicial e definitivo, farmacologia, desfechos e questões discursivas quando pertinentes. Para cada decisão, explique o achado que muda a conduta e a razão fisiológica. Entregue casos com pergunta antes da resposta, explicação após revelar e ligação com o trecho da aula.
5. Planeje o visual durante a escrita. Associe uma tabela ao diagnóstico diferencial, um diagrama ao mecanismo e um fluxograma à primeira decisão. Inclua gráficos com eixos, unidades e legenda. Contextualize cada ECG, radiografia, POCUS ou foto com um objetivo de observação, marcação e leitura progressiva. Guarde origem, referência, licença, atribuição, canal ou recorte e descrição das adaptações. Identifique ilustrações autorais como esquemas. Use SVG responsivo, zoom, texto alternativo e controles acessíveis. Não traga dados identificáveis.
6. Apresente farmacologia no ponto em que o fármaco muda a conduta. Informe classe, alvo, mecanismo, efeito, indicação, ataque, manutenção, via, velocidade, máximo, monitorização, contraindicações, efeitos adversos, interações, ajustes e alternativas quando pertinentes. Explique quando associar e quando optar entre agentes. Valide doses e unidades na fonte consultada. Para calculadoras, inclua fórmula, unidades, interpretação contextual, limitações, fonte e testes de entradas vazias, extremas e inválidas.
7. Examine provas e materiais autorizados antes de criar questões. Priorize FMP, materiais dos docentes e bancos fornecidos, depois residência, ENAMED e ENARE. Registre de onde vieram pistas sobre formato, frequência temática, distratores e competências. Cite provas oficiais verificadas e respeite as permissões. Identifique origem original, adaptada ou autoral em cada item. Se o corpus institucional não estiver verificável, registre a lacuna.
8. Produza 20 questões qualificadas por tema como referência, com 4 N1, 10 N2 e 6 N3. N1 reconhece conceitos ou padrões centrais. N2 aplica o conhecimento a um cenário. N3 integra decisões, contraindicações ou mecanismos sob condições concorrentes. Use cinco alternativas plausíveis, uma melhor resposta e uma explicação específica por alternativa. Equilibre posições corretas, confira gabarito e classifique segundo o raciocínio exigido. Mantenha itens históricos de nível incerto como “Não auditada”.
9. No treino, mostre uma questão por vez e corrija imediatamente. A opção correta fica verde e as outras vermelhas, com rótulo textual, indicação da escolha e comentário individual. A mini-aula traz raciocínio, mecanismo, pegadinha, memória e ligação para a Masterclass. No modo prova, o mesmo banco permite trocar ou marcar respostas, configurar tempo, finalizar com aviso de pendências e ver a correção após a entrega. Salve a cada resposta e permita retomar sessões.
10. Estruture leitura e revisão como marcações manuais, exercícios por meta de questões distintas e flashcards pela revisão do conjunto. Meça atividade concluída separadamente de acurácia e de retenção. Registre confiança voluntária. Use o caderno de erros para ligar exercícios, teoria e cartões. Programe reteste D+0 e revisões D+1, D+3, D+7 e D+14, ajustáveis. Identifique o método como agenda heurística por intervalos fixos. Priorize questões diferentes da mesma competência ou conceito.
11. Teste diretamente os links da barra lateral, acesso por URL, filtros, correção, histórico, retomada, cronômetro, foco, marca-texto e anotações. Revise legibilidade no iPhone, iPad e desktop, nos dois temas. Rode os scripts existentes e confirme a ausência de regressões de Clínica Médica e OSCE. Confira o conteúdo com as fontes e registre o que ainda requer revisão docente.

## Estrutura dos dados

O piloto usa um registro com chave estável por assunto e `schemaVersion`, `edition` e `scientificReview`. Separe conteúdo, mídia, componentes, fontes, prioridades e dados pessoais. As seções têm slug estável que liga aula, questões e flashcards.

| Estrutura | Campos mínimos |
| --- | --- |
| Caderno | ID do tema, versão, data editorial, essencial, revisão, capítulos, casos, farmacologia e referências |
| Capítulo | slug, título, explicação, aplicação e chave de fonte |
| Questão | ID versionado, revisão, assunto, capítulo, competência, nível auditado ou vazio, procedência, cinco opções, índice correto, cinco justificativas e frase de recuperação |
| Flashcard | ID versionado, frente, verso e conceito/capítulo |
| Mídia | arquivo, título, texto alternativo, instrução de observação, interpretação, origem e licença |
| Progresso | conclusão manual, contagem de exercícios distintos, cartões respondidos, histórico e preferências da conta |

A ordem das opções no arquivo é parte da versão de uma questão. Grave a ordem exibida dentro da sessão. Mudança substancial gera novo ID com nova versão. Preserve o registro antigo no catálogo histórico e retire-o da formação de novos blocos. Evite publicar edições de conteúdo sem conferir que uma sessão em andamento ainda resolve seus IDs. As políticas de armazenamento da aplicação carregam os registros por conta. Use as entradas já sincronizadas sempre que compatíveis.

## Mapa dos componentes

O piloto reaproveita `CourseKit`, `QuestionHistory`, a interface de Urgência, o visualizador de imagens, o modo foco, o planejador e o caderno pessoal. O caderno adiciona seções reutilizáveis de Essencial, Alto rendimento, Masterclass, Casos, Atlas, Conduta, Farmacologia, Calculadora e Desempenho. Os motores de questões, prova e flashcards trabalham com registros editoriais em vez de inferir conteúdo a partir do HTML.

Para a próxima aula, primeiro cadastre dados e testes seguindo o modelo de Arritmias. Generalize o roteamento e as configurações de apresentação quando houver um segundo caderno que precise dos mesmos pontos de extensão.
