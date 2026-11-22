-- Applied to MASTER Clínica Médica II on 2026-11-22; permits the new per-user study planner progress key.
-- Does not affect existing storage keys or row-level security policies.
ALTER TABLE public.master_progress DROP CONSTRAINT IF EXISTS master_progress_allowed_key;
ALTER TABLE public.master_progress ADD CONSTRAINT master_progress_allowed_key
CHECK (storage_key = ANY (ARRAY[
 'master_p2_lucas_v1',
 'master_p1_lucas_v4',
 'master_p2_hig_v2',
 'master_clinica_banca_v7',
 'MASTER_EVIDENCE_UI_v5',
 'master_cir_lucas_v1',
 'master_osce_pilot_v1',
 'master_study_planner_v1'
]::text[]));
