# Avatar, painel, pomodoro e Decision Lab

Alterações desenvolvidas na branch `avatar-e-calculos-prescricao`, a partir de `399cbeb`. Publicação solicitada pelo usuário nesta revisão. Nenhum dado ou configuração do Supabase foi alterado.

## Interface

- Avatar ilustrado em SVG gerado localmente a partir do identificador da conta. O mesmo usuário recebe a mesma ilustração ao recarregar; contas diferentes podem ter cores, pele e cabelo diferentes. Não há upload, serviço externo ou identificador pessoal na imagem. O menu e sua identificação acessível foram preservados.
- As 16 matérias estão visíveis no painel inicial: oito P2 e oito P1, com acesso direto às aulas. A navegação anterior permanece disponível.
- Removido das aulas o bloco “Imagens, vídeos e farmacologia”, sua mensagem de curadoria pendente e o botão “Estudar e marcar uma imagem local”. As abas de prescrição e o manual foram preservados. O recurso separado de POCUS não foi removido.

## Pomodoro e dedicação

- Contador na barra superior fixa durante a rolagem e controle flutuante lateral. É possível ocultar o flutuante e restaurá-lo pelo botão superior.
- Blocos de 25/45/60 minutos, início, pausa e reinício. O mesmo relógio acompanha todas as rotas. A interface mantém os controles de “Meu plano de hoje”.
- Tempo parcial é contado, mesmo quando um bloco não é concluído. Só tempo com pomodoro ativo é registrado; não se infere atenção, nota ou domínio a partir dele.
- Cálculo por tempo monotônico decorrido, sem depender da quantidade de chamadas do temporizador. O tempo de um bloco é limitado à duração escolhida. A passagem da meia-noite divide os registros por data local.
- Histórico com dedicação de hoje, total, blocos concluídos, dias em sequência e sete dias recentes. A sequência considera qualquer tempo registrado no dia, com regra explícita na interface.
- Dados aditivos em `pomodoro` dentro de `master_p2_hig_v2`, uma das cinco chaves já sincronizadas. Nenhuma tabela ou política nova. As preferências, anotações e dados legados foram preservados; minutos antigos sem data ficam identificados como histórico anterior.
- Salvamento local aproximadamente a cada cinco segundos, ao pausar, ocultar/fechar a página e antes da saída explícita. Usa a fila e a sincronização de conta existentes. Em encerramento abrupto do processo, os últimos segundos ainda não salvos podem ser perdidos. Ao recarregar, o relógio volta pausado e não contabiliza tempo com o navegador fechado.
- Troca de conta e encerramento de sessão interrompem o relógio. A sincronização é validada com APIs interceptadas, sem gravação em contas reais.
- Web Locks evita dois pomodoros simultâneos da mesma conta nas abas do mesmo navegador. Navegadores sem esse recurso recebem orientação de atualização. Isso não fornece bloqueio entre dispositivos; conflitos simultâneos continuam sujeitos à política e às cópias de segurança existentes.

## Decision Lab

22 casos: 20 P2 e dois P1, com 64 decisões no total. Foram acrescentados 12 casos P2: estado de mal, variantes de SGB, pseudossurto de EM, SAAF, miosite/pulmão, Sjögren, colite grave, testes para celíaca, sinais de alarme colorretais, linfoma, mieloma e compressão medular.

Os dez IDs antigos e seus registros foram preservados. Os novos casos têm IDs próprios, etapas progressivas, alternativas e justificativas. As referências são as fontes temáticas já existentes; não foram apresentadas como nova consulta documental nem gabarito oficial. Não foram adicionadas doses aos casos novos. A lista de casos tem rolagem própria em telas grandes.

## Prescrição: entrega e pendência

As 16 fichas existentes recebem exemplos de cálculo passo a passo: dose diária versus por tomada, quantidade, conversão de g/mg/microgramas, concentração/volume, peso e superfície corporal. Os exemplos usam as referências já presentes, sem ampliar indicações ou criar novos regimes. Não há coleta de dados de paciente ou cálculo individual automatizado.

O pedido de cobrir todos os tratamentos das doenças do site **permanece incompleto**. O inventário das 54 aulas e suas condutas originais está em `docs/COBERTURA_PRESCRICAO.md` e `docs/cobertura-prescricao.json`; ele não confunde uma ficha compartilhada por matéria com cobertura de todas as doenças.

O proxy bloqueou com 403 as fontes `dailymed.nlm.nih.gov`, `www.nice.org.uk` e `www.endocrinology.org`. A inclusão desses três domínios foi salva apenas no rascunho de rede, preservando Supabase e os presets existentes. Salvar o rascunho pelo agente não aplica acesso nem publica o ambiente. Após a liberação, a consulta às fontes e a expansão por indicação precisam continuar; não foi declarada revisão clínica independente.

## Validação

`npm test` cobre interface, avatar por conta, recuperação de senha, persistência e isolamento de contas, pomodoro com relógio controlado, meia-noite, limite do bloco, pausa após recarregar, sincronização simulada, disputa entre abas, navegação das 16 matérias, casos do laboratório e remoção do bloco solicitado. Os validadores Python, sintaxe JavaScript e `git diff --check` também são executados.

Resultado da execução completa para publicação: **41 testes aprovados, zero falhas e zero ignorados**. Validadores Python e sintaxe também aprovados. As capturas responsivas ficam em `work/`, ignorado pelo Git.

O teste da barra superior confirmou sua visibilidade após rolar a página no viewport de 390 × 844. A captura móvel final foi inspecionada.

Safari/iOS físico e gravação de dedicação no Supabase de produção não foram testados. A tentativa anterior de instalar WebKit foi bloqueada pelo proxy; não se afirma compatibilidade validada no Safari.
