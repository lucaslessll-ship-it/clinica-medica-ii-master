-- PR #75 / OSCE CM: PROPOSTA A APROVAR, NÃO EXECUTADA.
-- A aplicação exige aprovação explícita e validação no Supabase antes de liberar #osce.
-- A tabela master_progress existente tem RLS; este ajuste só expande a lista de chaves permitidas.
BEGIN;
ALTER TABLE public.master_progress DROP CONSTRAINT IF EXISTS master_progress_allowed_key;
ALTER TABLE public.master_progress ADD CONSTRAINT master_progress_allowed_key
  CHECK (storage_key IN (
    'master_p2_lucas_v1',
    'master_p1_lucas_v4',
    'master_p2_hig_v2',
    'master_clinica_banca_v7',
    'MASTER_EVIDENCE_UI_v5',
    'master_cir_lucas_v1',
    'master_osce_pilot_v1'
  ));
COMMIT;
-- Pós-aplicação: verificar pg_get_constraintdef e testar a sincronização de 2 usuários isolados.
-- A estrutura definitiva de histórico ilimitado para 74 estações exigirá tabela de tentativas
-- por usuário com políticas RLS específicas, antes de publicar a Fase 2.
