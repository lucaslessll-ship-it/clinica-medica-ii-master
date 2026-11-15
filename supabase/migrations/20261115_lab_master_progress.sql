-- LABORATÓRIO MASTER: progresso individual por curso. Applied to Supabase in 2026-11.
-- Independent of master_progress, master_consents, study_owners and existing lessons.
create table if not exists public.lab_master_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null check (length(course_id) between 3 and 80),
  payload jsonb not null default '{}'::jsonb
    check (jsonb_typeof(payload) = 'object' and octet_length(payload::text) <= 131072),
  revision bigint not null default 1 check (revision >= 1),
  updated_at timestamptz not null default now(),
  primary key (user_id,course_id)
);
alter table public.lab_master_progress enable row level security;
create policy lab_master_select_own on public.lab_master_progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy lab_master_insert_own on public.lab_master_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy lab_master_update_own on public.lab_master_progress
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy lab_master_delete_own on public.lab_master_progress
  for delete to authenticated using ((select auth.uid()) = user_id);
revoke all on public.lab_master_progress from anon;
grant select, insert, update, delete on public.lab_master_progress to authenticated;
