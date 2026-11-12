# Central de Simulados — primeira entrega executada

## Escopo e publicação

Implementação na branch `melhorias-master`, atualizada por fast-forward com a main publicada antes das alterações. A main remota não foi alterada e não houve merge/deploy. Novo acesso no painel e no grupo Treinar, rota `#simulados`. Execute em servidor HTTP local com as configurações de autenticação existentes; a branch não é um endereço de publicação do GitHub Pages.

## Auditoria inicial

O script `npm run audit:bank` carrega os arrays reais e gera `docs/auditoria-banco.json`. Há 136 itens legados distintos por enunciado normalizado: 80 P2 (10 em cada eixo) e 56 P1 (14 infecções, 6 nos demais eixos). Níveis: 12 N1, 36 N2, 88 N3. Não há enunciados literalmente duplicados após normalização; isso não prova ausência de redundância semântica. Todos possuem estrutura e índice de resposta válidos.

Problemas editoriais: 106 dos 136 gabaritos estão na primeira posição antes do embaralhamento, inclusive todos os 56 da P1; há distratores facilmente descartáveis e explicações curtas em parte do acervo. A classificação inteira da P1 como N3 precisa de revisão cognitiva. Fontes temáticas não comprovam revisão individual. Não há PDF íntegro de prova oficial e gabarito oficial no checkout: os documentos de engenharia reversa relatam referências históricas, sem comprovar incidência P2 ou situação de anulação de cada item. Nada disso foi inventado.

## Currículo utilizado

Foi lido o PDF local fornecido pelo estudante: `26.2_MED_Programa_Clínica_Médica II 13-08.pdf`, programa de unidade curricular, 8º período, 2026.2. Conteúdo programático nas páginas 2–3; POCUS na página 4; escrita cumulativa aberta e/ou fechada e avaliação prático-oral na página 5; composição da P2 na página 6: AE2 peso3, CPG2 peso1, APO peso4, CQ2 peso1 e EP peso1. A síntese em `docs/plano-de-ensino.html` foi corrigida. Não se publicou o PDF pessoal. A separação por P1/P2 e a informação de onco-hematologia apenas escrita seguem o checklist do estudante, não uma exclusão expressa nesse programa geral.

## Implementado

- Motor independente com IDs estáveis por conteúdo para o legado, preservando posições dos arrays antigos e históricos existentes.
- Configuração P2, P1, integrado, tema único ou múltiplos temas, subtemas, cotas por tema, seleção aleatória, erros e revisões devidas.
- Estilo banca como seleção pedagógica N2/N3: não é um modelo estatístico nem reprodução de provas.
- Quantidades sugeridas 10/20/30/40/50/60/80/100/120 e personalizadas; pesos N1/N2/N3 configuráveis. Avisos de escassez, ajuste de níveis e cobertura. Sem duplicação para preencher quantidade.
- Questões e alternativas embaralhadas preservando os índices corretos.
- Treino com feedback após confirmação e resposta imutável após revelação; prova com correção ao terminar.
- Cronômetro ou tempo livre, pausa, navegação, marcação, confirmação da entrega e retomada após recarregar. Snapshot das questões protege sessões em andamento contra atualizações posteriores no banco.
- Correção em seções, referências clicáveis, revisão em 1/3/7 dias (heurística declarada), acesso à aula/caderno e estatísticas reais por tema/subtema/nível, tempo e acertos após erros.
- Lote inicial com 32 itens novos: 4 por eixo P2, 10 N2 e 22 N3, posições corretas equilibradas. Comentários por alternativa, explicações e fontes consultadas. Sem doses novas.
- Interface responsiva, temas existentes e controles de teclado nativos. A ferramenta não é certificação de competência nem previsão de nota.

## Banco e política de liberação

Total: **168 questões distintas**, 112 P2 e 56 P1. Distribuição global: 12 N1 / 46 N2 / 110 N3. Há **32 com revisão editorial assistida por IA e fontes** — não revisão independente por médico nem homologação oficial. O detalhe está em `REVISAO_EDITORIAL.md`.

As 136 legadas estão pendentes da nova revisão individual na Central. Continuam preservadas nas ferramentas originais; na Central só entram mediante opção explícita em modo treino. Provas da Central usam apenas o lote liberado. Assim, atualmente há no máximo32 itens elegíveis em prova; P1 avaliativa não tem lote novo liberado. Treino integrado com legado pode selecionar120 distintos. O gerador foi testado com120 itens sintéticos e com o banco real, sem alegar120 liberados.

## Dados e sincronização

Novos dados ficam em `store.examCenter`, aditivo no payload já permitido `master_p2_lucas_v1`. Nenhuma tabela, política RLS, chave de sincronização, conta, provedor ou configuração de produção foi alterada. Arrays legados e seus índices foram preservados. O salvamento usa a autenticação e a proteção de conflitos existentes; não se promete consistência transacional perfeita entre dois dispositivos simultâneos. O teste entre dispositivos usa respostas controladas, não registros reais.

As gravações periódicas são a cada10 segundos e também em ações, ocultação da aba e saída. Não há gravação periódica quando bloqueado ou pausado. O limite de tamanho JSON existente no Supabase continua valendo: acervos extensos de anotações e muitos históricos podem exigir futura migração aditiva. Não houve teste real de gravação no Supabase de produção.

## Verificações observadas

- `npm ci`: dependências fixadas instaladas; auditoria npm reportou zero vulnerabilidades.
- `npm test`: **45 testes aprovados** (28 navegador com mocks e SDK interceptado, 14 motor, 3 estrutura/editorial). A instalação local usa `CHROMIUM_PATH` apontando para o Chrome. Chrome precisou de acesso fora do sandbox para o servidor local.
- Validadores `scripts/validar.py` e `scripts/validar_v7.py`: aprovados.
- Sintaxe JavaScript e `git diff --check`: aprovados.
- Capturas desktop1180 e celular390 examinadas; testes existentes incluem320/390/820/1180. Capturas ficam em `work/`, fora do Git. Não houve teste em Safari/iOS físico nem auditoria completa com leitor de tela.
- Testes cobrem filtros,120 sem repetição, ajuste por falta de itens, embaralhamento, cronômetro, pausa, retomada, pontuação, correção oculta, treino imutável, sincronização na chave existente e isolamento ao mudar de conta. Código não comprova correção clínica.

## Pendências explícitas

A meta400–500 permanece aberta: faltam232–332 itens para a contagem global, além da revisão do legado. Nem todo subtema foi coberto no novo lote. O aprofundamento farmacológico com doses depende de verificação individual. Não se incluiu acervo de imagens externo novo nem questões ilustradas. O curso Hipócrates não foi identificado com segurança no Drive; não se apresentou material de outro curso como sendo dele e não se copiou apostila comercial para o site.

Esta é uma entrega funcional progressiva autorizada pelo prompt, não conclusão de todas as fases editoriais. A expansão deve continuar com novos lotes e registros de revisão, mantendo os pendentes fora das provas avaliativas.
