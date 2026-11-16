# Otimização do Clínica Master

## Publicação

`npm ci` instala as versões fixadas no lockfile (Node 24). `npm run build` usa Vite para gerar `dist/`, mantendo o endereço principal e a subpasta original do site. O workflow do GitHub Pages publica somente esse diretório. Enquanto o Pages estiver no modo de publicação pela branch, o workflow aguarda a publicação automática dos arquivos originais antes de enviar o build otimizado. A integração atual não tem permissão para mudar o modo do Pages para GitHub Actions; essa coordenação evita que o build original sobrescreva o otimizado. Os arquivos-fonte continuam utilizáveis sem build, com os intervalos de revisão antigos como alternativa; a versão publicada usa FSRS.

O build compacta JS/CSS, preserva o escopo e a ordem dos scripts legados e gera uma versão de cache pelo conteúdo. Cursos de ECG, Hemograma, Antimicrobianos e Radiologia e as extensões das aulas aprofundadas de P1, P2 e Cirurgia são carregados na primeira abertura de cada grupo. Falhas mostram uma opção de tentar novamente. A busca global carrega os quatro cursos sob demanda ao ser aberta, preservando seus resultados mesmo antes da primeira visita aos cursos. O índice de busca da IA é regenerado das aulas a cada build e continua sendo baixado sob demanda. Nenhuma ferramenta de auditoria é enviada ao navegador dos visitantes.

## Revisão adaptativa

`ts-fsrs` agenda as questões respondidas em `Study.record`. Resposta errada ou com consulta recebe Again; acerto com baixa confiança recebe Hard, média/sem confiança Good e alta Easy. Usa retenção alvo de 90%, sem aleatoriedade e sem etapas curtas. Esse alvo é um parâmetro do agendador, não uma previsão individual de aprendizagem ou aprovação.

O cartão FSRS fica no próprio `store.study.reviews[id].fsrs`, dentro do progresso já sincronizado. Datas, tentativas, confiança e registros antigos são preservados. Um registro antigo só começa a ter estado FSRS quando é respondido novamente; o programa não inventa o histórico ausente. Outros módulos e cartões mantêm seus agendamentos atuais. A carga diária continua configurável.

## Assistente

Perguntas digitadas que se referem ao conteúdo atual, como “me dê uma dica para memorizar esse conteúdo”, recebem os blocos da aula aberta e seu título. Perguntas específicas continuam usando MiniSearch. O servidor continua conferindo os IDs contra o corpus oficial. Essa correção não altera os provedores nem resolve, por si só, indisponibilidade ou chaves inválidas do serviço de IA.

## Verificação

- `npm test`: gera o build e executa toda a bateria de testes. `tests/optimized-site.test.cjs` verifica a versão efetivamente publicada, carregamento/retry, navegação, histórico FSRS, contexto da aula e auditoria axe WCAG A/AA na tela inicial, questões, ECG e assistente em celular.
- `npm run audit:performance`: executa Lighthouse CI três vezes sobre o build e salva relatórios em `work/lighthouse/`. A auditoria cobre a entrada pública do site; os testes com axe usam sessão sintética para as telas internas. Limites de acessibilidade são obrigatórios; desempenho gera avisos para evitar flutuações de máquina/rede bloqueando publicação indevidamente.
- `npm run eval:validate`: valida a configuração do Promptfoo sem chamar modelos.
- `npm run eval:ai`: avalia o handler real com perguntas sintéticas e o corpus público. Configure `GROQ_API_KEY` ou `GEMINI_API_KEY` no ambiente local, sem colocar valores no Git ou no chat. O teste usa autenticação e contador sintéticos locais; não chama o banco de produção nem consome a cota de alunos. Chamadas ao provedor estão sujeitas às cotas/custos da conta. Os resultados ficam em `evaluations/results/` (ignorado no Git), sem escrita no banco do Promptfoo e com telemetria desativada.

As assertivas da IA verificam a estrutura, citação, dica e recusa em um caso fora do conteúdo. Não substituem conferência docente da correção clínica. Não foi executada geração com modelo real nesta alteração.

## Medidas locais

Após a alteração, os JS/CSS referenciados na entrada passaram de aproximadamente 3,69 MB para 2,31 MB sem compressão, redução de 37%. Isso mede volume dos arquivos locais, não velocidade de conexão nem tempo de carregamento de um celular real. O restante é baixado ao abrir os grupos de aulas. Resultados e limites do Lighthouse estão em `lighthouserc.cjs`.

Não houve alteração de tabelas, políticas, Secrets ou Edge Functions do Supabase.

## Evidência desta alteração

- Bateria completa: 179 testes aprovados, zero falhas.
- Após incorporar a correção de ECG F12 da branch principal: cinco testes do build e um teste de versão/redirecionamento de recuperação novamente aprovados.
- Validadores estáticos `validar.py` e `validar_v7.py`: aprovados.
- Promptfoo: configuração validada; geração real não executada.
- Lighthouse desktop local, três execuções da versão com carregamento sob demanda: desempenho 89/90/87 e acessibilidade 100/100/100. Estes números são de laboratório e da entrada pública.
