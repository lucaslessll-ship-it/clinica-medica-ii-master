# Master Planner — Clínica Master

## Objetivo e escopo
Camada integrada de planejamento de avaliações para **Clínica Médica II**, **Clínica Médica I**, **Clínica Cirúrgica**, **OSCE Clínica Médica** e **POCUS no OSCE**, sem alterar os bancos de questões nem o progresso original. O planejador substitui nenhuma atividade já existente.

## Fluxo de uso
1. Abrir **Master Planner** na navegação ou no card do início.
2. Criar avaliação com nome, data, tempo diário, dias da semana e temas. Seleção em grupo e busca funcionam para todas as disciplinas carregadas.
3. O cronograma prevê **primeira passada**, **revisões D+1, D+3, D+7 e D+21** enquanto couberem na data da prova, dando prioridade a erros e temas de alta prioridade.
4. Usar **Estudar** para navegar à aula ou ao pré-estudo OSCE; **Simular** nas estações OSCE.
5. Após atividade real, registrar uma autoavaliação: **Preciso revisar**, **Com ajuda**, ou **Sem ajuda**. O registro não altera notas oficiais, resultados de simulados ou histórico de outras ferramentas.
6. Alterar data, tempo ou assuntos quando necessário; a agenda se recalcula sem apagar as tentativas.

## Retenção e domínio
- Erro e acerto com ajuda sugerem nova tentativa em D+1.
- Acertos independentes usam intervalos progressivos D+1 / D+3 / D+7 / D+21, limitados pelo prazo da avaliação.
- **Domínio consistente** exige pelo menos dois acertos sem ajuda em **dias diferentes**. Cobertura por leitura é exibida como cobertura, não domínio.
- Os resultados reais de OSCE e Super Foco são **lidos sem ser modificados** e usados como pistas de vencimento e priorização. Registros sem data válida não são considerados retestes automáticos.
- O algoritmo é explícito, heurístico e não promete melhora de nota garantida. Não equivale ao FSRS clínico calibrado.

## Anti-procrastinação e gamificação
- Sessões rápidas exibidas para 5, 15 ou 30 minutos; tarefa preparada sem múltiplos filtros.
- Meta semanal de 1–7 dias; dia mínimo de uma atividade de recuperação ativa; ausências não causam perdas de XP nem quebram uma corrente punitiva.
- **Master XP** é calculado com limite de um registro por tema por dia: acerto independente 12, com ajuda 6, dificuldade reconhecida 4; bônus de 6 no reteste e 10 no erro recuperado em data posterior.
- Conquistas não dependem de gasto de tempo nem de abrir páginas. Sem rankings públicos.
- **Heatmap** de aproximadamente um ano no planejador e versão curta no início. Tons de verde indicam registros declarados de estudo/reteste por dia, não dados inventados nem simples visitas.

## Sincronização e privacidade
- Nova chave pessoal `master_study_planner_v1` integrada aos `progressKeys` da autenticação atual.
- Supabase **MASTER Clínica Médica II** teve apenas a allowlist `master_progress_allowed_key` ampliada; RLS por usuário permanece intacta. Migração aplicada: `20261122082503_allow_master_study_planner_progress_key`.
- Reconciliação de alterações de múltiplos dispositivos por ID de plano e **data da autoavaliação**, escolhendo evento mais recente no mesmo dia e preservando históricos de dias diferentes.
- Histórico original de questões, OSCE e Super Foco não é regravado pelo planejador. Sem modificações no ApexMed.

## Limitações a acompanhar
- A autoavaliação precisa ser feita após estudar: **não há correção automática do texto pelo planejador**.
- O módulo não envia notificações push nem cria lembretes de calendário automaticamente.
- A previsão de carga utiliza blocos de aproximadamente 8 minutos e um horizonte de até 366 dias; se não couberem todos os blocos no prazo, informa capacidade insuficiente em vez de simular que os concluiu.
- Repetir várias atividades no mesmo dia **não multiplica XP**; o histórico guardado representa a última autoavaliação daquele tema no dia.
- A sincronização entre contas depende de login e conectividade do sistema atual; teste de integração no navegador é necessário para confirmação final em aparelho.

## QA
`tests/master-planner.test.cjs` cobre cadastro, carga, replanejamento, retestes, evidências de OSCE/Super Foco, preservação de histórico, mapa de frequência, XP, anonimização por conta, mobile e merge.
