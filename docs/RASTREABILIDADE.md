# Atividade da plataforma

Implementação de 18/11/2026. Dados anteriores não são reconstruídos.

## Usar

A única conta proprietária existente foi vinculada à tabela privada singleton `master_activity_private.administrator` e acessa **Administração**, na lateral, ou **Perfil → Administração da plataforma**. O painel permite escolher 7, 30 ou 90 dias, selecionar um usuário, consultar conteúdos acessados, tentativas/acertos e carregar páginas do histórico. A lista traz até 200 contas, priorizando atividade recente. Nome/e-mail são obtidos pelo servidor a partir de Auth, nunca enviados como identificação pelo coletor.

Todos os usuários têm **Perfil → Privacidade e atividade**. Não há mensagem inicial. Contas sem preferência anterior têm registro automático. Uma desativação já salva é respeitada, e o menu permite ativar/desativar sem impedir o estudo nem apagar o progresso. Os detalhes de finalidade, campos, acesso restrito e retenção ficam no menu e na seção recolhida de privacidade da conta. A configuração de atividade é separada do consentimento de sincronização.

## Registro

- Sessão da aba e mudanças de área; abertura de aulas e casos identificados.
- Conclusões e respostas com resultado: P1/P2, Cirurgia, POCUS, ECG, cursos CourseKit, Laboratory Master, pilotos e decisões clínicas.
- Entrega/início do simulado P2 e revisão de flashcards P2; outros exercícios/simulados que passam por QNav registram suas respostas entregues.
- Abertura, solicitação e resultado do assistente, sem texto da conversa.
- Início/pausa do Pomodoro.
- Erros de script apenas com código fixo, sem mensagem, URL ou stack trace.
- Tempo estimado a cada até 30 segundos, enquanto a aba está visível, em foco e com interação nos últimos 60 segundos. Não é tempo de leitura comprovado.

O laboratório de microcitose envia apenas eventos estruturados ao host quando embutido. O host verifica origem, janela remetente, tipos e IDs antes de aceitar, e aplica a mesma preferência. A página independente não tem este coletor autenticado.

Não há gravação de tela, teclas, conteúdo de campos, pesquisas, anotações, texto clínico, conversas, URLs completas, query strings, tokens ou impressões digitais de dispositivo no histórico. Sessões usam UUID aleatório por aba/inicialização, sem fingerprint. IPs/headers dos logs técnicos dos provedores não são adicionados às tabelas de atividade.

## Entrega e limites

Fila limitada a 200 eventos em memória, lotes de até 50, intervalos de envio e recuo em falhas. Sem persistência de fila entre contas ou no armazenamento local. Navegação nunca aguarda coleta. Reenvios conservam IDs e a chave primária elimina duplicação. Fechar abruptamente a aba, perder a conexão ou fechar antes do envio pode perder eventos. A última atividade não equivale ao último login, exibido separadamente a partir do Auth. Resultados e timestamps de ocorrência vêm do navegador, com validação no servidor: este recurso não é auditoria inviolável, prova de presença ou avaliação de aprendizado.

A retenção é de 90 dias: RLS e relatórios ocultam registros vencidos; o job diário `master-activity-retention` remove fisicamente os eventos anteriores a 90 dias, às 06:15 UTC. A limpeza física pode ocorrer até a próxima execução diária. Preferências continuam até exclusão da conta; as duas tabelas têm FK com exclusão em cascata. Desativar interrompe novos registros e não apaga automaticamente os já existentes, conforme aviso. Solicitações de acesso/exclusão devem ser encaminhadas ao responsável pelo canal de suporte já utilizado na plataforma.

## Segurança

`master_activity_events`: RLS, sem INSERT/UPDATE/DELETE direto para contas do cliente. `master_activity_record` deriva `user_id` da sessão verificada; não aceita nome/e-mail/user_id no payload; valida tipos, limites, IDs, códigos e datas. Limite de 240 eventos/minuto/conta. A preferência, criada automaticamente como ativa somente quando ainda não existe, é bloqueada com `FOR SHARE` durante ingestão, de modo que a conclusão da desativação aguarde gravações já iniciadas; os lotes posteriores são recusados.

`master_activity_preferences`: leitura/escrita somente da própria conta, RLS em SELECT/INSERT/UPDATE. Sem alteração de preferências de outros usuários pelo painel.

Relatórios e e-mails só são retornados após checagem da conta administrativa única na tabela privada `master_activity_private.administrator` no banco. Não usa `user_metadata`, e-mail ou um campo de frontend como autorização. A lista de proprietários não foi alterada. O vínculo administrativo foi inicializado a partir da única conta proprietária existente, sem UUID hardcoded. A tabela privada permite no máximo uma conta e não pode ser lida/escrita por clientes. Acrescentar outras contas em `study_owners` não expande o acesso à análise. Entradas e HTML do painel são escapados, inclusive nomes oriundos de metadados.

As funções elevadas ficam em `master_activity_private`, fora dos schemas expostos pela API, com `search_path` vazio, privilégios explícitos e checagem de `auth.uid()`. Wrappers públicos são `SECURITY INVOKER`, sem execução para `anon`. Não há chave de serviço no frontend. Encerrar/trocar a conta limpa fila, relatórios e diálogos; respostas atrasadas são descartadas.

## Migrações e verificação

Migrações foram geradas/aplicadas no projeto por MCP e seus arquivos refletem os identificadores efetivos da migração remota. CLI 3.2.0 não conseguiu iniciar por diretório de configuração somente leitura; CLI 2.75.0 também falhou, então nenhum timestamp de migração local foi inventado.

- `20261118143609_master_activity_tracking.sql`: tabelas, RLS, funções e retenção diária.
- `20261118144029_master_activity_ingest_consent_lock.sql`: proteção de concorrência ao desativar.
- `20261118145149_master_activity_report_visit_counts.sql`: contagem de acessos sem duplicar a abertura de aula e ordenação explícita do cursor.
- `tests/activity-security.sql`: verificações em transação revertida, com papel `authenticated`: proprietário, conta comum, tentativa de elevação por metadados, inserção direta bloqueada, opção de recusa, campos inesperados e deduplicação.
- `tests/activity.test.cjs`: aviso, recusa, permissão, campos mínimos, navegação, respostas, tempo visível, sessão, reenvio, filtros, paginação, XSS, axe nos dois temas e layouts 320/820/1440 px.

Endpoints REST verificados sem autenticação: chamadas de ingestão e permissão retornam HTTP 401/código 42501. Job diário verificado ativo. Revisão de segurança Supabase não apontou problemas novos nas tabelas/funções desta implementação; os avisos preexistentes sobre `ai_usage`, `pg_net` e proteção de senhas vazadas não foram alterados.

## Ajuste solicitado: sem mensagem inicial

Em 18/11/2026, o responsável solicitou retirar o aviso inicial para uso pessoal e das próprias contas. `master_activity_default_on_without_banner` define registro ativo apenas quando não existe configuração; nunca altera recusas anteriores. `master_activity_single_owner_and_default_report` ajusta a indicação do padrão e fixa o acesso analítico à única conta administrativa atual. Os arquivos usam os identificadores efetivos das migrações remotas. Testes confirmam ausência do banner, início automático, desativação preservada e bloqueio de acesso administrativo às outras contas.
