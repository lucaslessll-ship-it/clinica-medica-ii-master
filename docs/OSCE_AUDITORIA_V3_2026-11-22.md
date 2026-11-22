# OSCE Clínica Médica II — auditoria aplicada (22/11/2026)

## Escopo
Repositório: `clinica-medica-ii-master`. **Não modificar ApexMed.**
Este registro documenta melhorias realmente implementadas e limites não resolvidos; não é uma homologação clínica da FMP.

## Inventário auditado
- 93 estações: 86 do catálogo anterior + 7 POCUS.
- 858 perguntas armazenadas. Os textos originais enviados pelo aluno somam 74 estações e 403 itens; **nem toda pergunta atual foi transcrita literalmente do banco original**. O módulo inclui muitas perguntas autorais de treino, com variação de profundidade clínica.
- 79 esquemas didáticos de catálogo e 14 arquivos de exame real/referência com guias visuais, sujeitos a conferência das fontes.
- O progresso local do OSCE usa `master_osce_pilot_v1`; o registro também integra a lista de chaves sincronizáveis do módulo de autenticação. Não houve mudança de esquema nem migração destrutiva.

## Problemas resolvidos nesta versão
1. **Sessão diária real:** seleção intercalada de 3/8/14/20 itens para metas de 5/15/30/45 minutos; prioriza itens vencidos, temas de alta prioridade e novas perguntas. A meta encerra após terminar a pergunta em andamento; não existe bloqueio do aluno por timer.
2. **Continuidade exata:** rascunho, confiança, dicas, checklist, posição e gabarito aberto persistem; Retomar restaura as informações. Mantém compatibilidade com histórico anterior sem campo `view`.
3. **Pontuação auditável:** `source:'autoauditoria'` e `scoring:'manual-checklist-v2'` no registro; “não sei”/“não lembro” isolados recebem 0 mesmo com checkbox acidental. A pontuação não é gerada por IA, nem validada pela banca.
4. **Cobertura honesta:** uma pergunta feita em sessão mista marca amplitude (estação vista) mas não conclui automaticamente nível Completo nem etapa de estação.
5. **Estado enxuto:** consulta da última tentativa não materializa itens vazios de todas as perguntas; reduz gravações desnecessárias e evita estatísticas infladas.
6. **Radar de competências:** a tela Revisão mostra médias dos checklists por habilidade, quantidade de tentativas e erros com alta confiança — sempre sinalizados como autoavaliação.
7. **Proveniência e referências:** pergunta autoral versus origem do banco identificada na prática; fontes genéricas rotuladas como apoio da estação, não como citação de cada item. O roteiro para IA aceita fontes com `title` ou `label`.
8. **Texto de interface:** botão da sessão ajustado ao número de questões e aos minutos selecionados; cabeçalho mostra posição e meta; mensagem vazia deixa de afirmar que existem só duas estações.

## Verificação automatizada
- `tests/osce-audit-regression.test.cjs` — sequência mista, nenhuma duplicação de questões, duração-alvo, nota 0 para “não sei”, retomada e cobertura.
- `tests/osce-content-integrity.test.cjs` — 93 estações, 858 perguntas, IDs, profundidades, critérios e fontes disponíveis.
- Preservar testes anteriores de POCUS, notas visuais, prioridades, navegação, Foco, avisos e autenticação.

## Itens que continuam exigindo trabalho específico

**P0 — Segurança clínica e fidelidade das fontes:** revisar individualmente conteúdo de tratamento, doses, sinais de gravidade, exames confirmatórios e critérios das estações prioritárias contra diretrizes verificáveis. Substituir ou marcar como não apropriadas imagens de referência que não representam o caso, como o derrame pleural fetal, o eco de coração normal usado no TEP e o achado de linhas B de fibrose. Não atribuir diagnóstico por imagem limitada (p.ex. recorte de ECG para fibrilação atrial). Reanalisar as imagens reais com um revisor clínico antes de usar coordenadas como marcações definitivas.

**P1 — Simulação de banca:** cronômetro visual opcional, desempenho com avaliador externo, arguição oral por voz, paciente simulado e interpretação de imagens com escolhas gradativas. Correção automática com IA exigiria backend, custos, validação e autorização; não fingir que já existe.

**P1 — Qualidade de conteúdo:** recuperar enunciados originais quando a licença/permissão autorizar e preservar a origem; não misturar texto original e questão autoral sem rótulo. Mapear a referência à pergunta específica, não apenas à estação.

**P2 — Performance/UX real:** realizar teste em navegador, iPad e Android com usuários para verificar tamanho de alvos, carregamento, zoom de GIF, imagens externas, teclado virtual e posição do scroll. A inspeção de código e os testes de funções não substituem esta etapa.

**P2 — Evidência de aprendizado:** acompanhar retenção em reteste, não apenas médias imediatas de checklist; registrar dados sem afirmar ganhos garantidos.

## Critérios de aceite antes de declarar concluído
- GitHub Actions principais aprovadas na revisão final;
- PR mesclada somente se os testes passaram ou se a exceção foi informada;
- não alterar ApexMed, não apagar histórico;
- clínico que valida uma conduta deve registrar a diretriz/item e versão;
- não declarar uma imagem fidedigna de um caso quando pertence a outra pessoa.

Este arquivo distingue problemas resolvidos de riscos ainda abertos, para não apresentar cobertura técnica como certificação médica.