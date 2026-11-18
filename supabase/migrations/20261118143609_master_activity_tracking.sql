-- Activity is optional, append-only, owned by auth.uid(), retained for 90 days.
create schema if not exists master_activity_private;
revoke all on schema master_activity_private from public;
grant usage on schema master_activity_private to authenticated;

create table public.master_activity_preferences (
 user_id uuid primary key references auth.users(id) on delete cascade,
 enabled boolean not null default false,
 notice_version text not null check (notice_version='2026-11-18'),
 updated_at timestamptz not null default now()
);
alter table public.master_activity_preferences enable row level security;
revoke all on public.master_activity_preferences from anon,authenticated;
grant select,insert,update on public.master_activity_preferences to authenticated;
create policy activity_preferences_select on public.master_activity_preferences for select to authenticated using ((select auth.uid())=user_id);
create policy activity_preferences_insert on public.master_activity_preferences for insert to authenticated with check ((select auth.uid())=user_id);
create policy activity_preferences_update on public.master_activity_preferences for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);

create table public.master_activity_events (
 id uuid primary key,
 user_id uuid not null references auth.users(id) on delete cascade,
 session_id uuid not null,
 kind text not null check (kind in ('session_start','page_view','lesson_open','lesson_complete','question_answer','case_open','case_complete','exam_start','exam_complete','flashcard_review','assistant_open','assistant_request','assistant_result','pomodoro_start','pomodoro_pause','active_time','client_error')),
 route text not null check (route ~ '^[a-z0-9_-]{1,40}$'),
 resource text not null default '' check (resource ~ '^[a-zA-Z0-9_.:-]{0,100}$'),
 duration_ms integer not null default 0 check (duration_ms between 0 and 30000 and (kind='active_time' or duration_ms=0)),
 correct boolean,
 code text not null default '' check (code in ('','success','unavailable','network','script','timeout')),
 happened_at timestamptz not null,
 recorded_at timestamptz not null default now()
);
create index master_activity_user_time on public.master_activity_events(user_id,happened_at desc,id desc);
create index master_activity_retention on public.master_activity_events(recorded_at);
create index master_activity_time on public.master_activity_events(happened_at desc,id desc);
alter table public.master_activity_events enable row level security;
revoke all on public.master_activity_events from anon,authenticated;

create function master_activity_private.master_activity_is_admin() returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and exists(select 1 from public.study_owners where user_id=auth.uid());
$$;
revoke all on function master_activity_private.master_activity_is_admin() from public,anon;
grant execute on function master_activity_private.master_activity_is_admin() to authenticated;
create function public.master_activity_is_admin() returns boolean language sql stable security invoker set search_path='' as $$select master_activity_private.master_activity_is_admin();$$;
revoke all on function public.master_activity_is_admin() from public,anon;
grant execute on function public.master_activity_is_admin() to authenticated;
grant select on public.master_activity_events to authenticated;
create policy activity_admin_select on public.master_activity_events for select to authenticated using ((select master_activity_private.master_activity_is_admin()) and recorded_at>=now()-interval '90 days');

create function master_activity_private.master_activity_record(p_events jsonb) returns integer language plpgsql security definer set search_path='' as $$
declare uid uuid:=auth.uid(); n integer; v jsonb; written integer;
begin
 if uid is null then raise exception 'authentication required' using errcode='42501'; end if;
 if not exists(select 1 from public.master_activity_preferences where user_id=uid and enabled and notice_version='2026-11-18') then return 0; end if;
 if jsonb_typeof(p_events) is distinct from 'array' or jsonb_array_length(p_events)>50 then raise exception 'invalid event batch' using errcode='22023'; end if;
 perform pg_advisory_xact_lock(hashtextextended(uid::text,42));
 select count(*) into n from public.master_activity_events where user_id=uid and recorded_at>now()-interval '1 minute';
 if n+jsonb_array_length(p_events)>240 then raise exception 'activity rate limit' using errcode='54000'; end if;
 for v in select value from jsonb_array_elements(p_events) loop
   if jsonb_typeof(v) is distinct from 'object' or exists(select 1 from jsonb_object_keys(v) k where k not in ('id','session_id','kind','route','resource','duration_ms','correct','code','happened_at')) then raise exception 'unexpected event fields' using errcode='22023'; end if;
   if (v->>'happened_at')::timestamptz not between now()-interval '24 hours' and now()+interval '5 minutes' then raise exception 'invalid event time' using errcode='22023'; end if;
 end loop;
 insert into public.master_activity_events(id,user_id,session_id,kind,route,resource,duration_ms,correct,code,happened_at)
 select x.id,uid,x.session_id,x.kind,x.route,coalesce(x.resource,''),coalesce(x.duration_ms,0),x.correct,coalesce(x.code,''),x.happened_at
 from jsonb_to_recordset(p_events) as x(id uuid,session_id uuid,kind text,route text,resource text,duration_ms integer,correct boolean,code text,happened_at timestamptz)
 on conflict(id) do nothing;
 get diagnostics written=row_count; return written;
end;$$;
revoke all on function master_activity_private.master_activity_record(jsonb) from public,anon;
grant execute on function master_activity_private.master_activity_record(jsonb) to authenticated;
create function public.master_activity_record(p_events jsonb) returns integer language sql security invoker set search_path='' as $$select master_activity_private.master_activity_record(p_events);$$;
revoke all on function public.master_activity_record(jsonb) from public,anon;
grant execute on function public.master_activity_record(jsonb) to authenticated;

create function master_activity_private.master_activity_report(p_start timestamptz,p_end timestamptz,p_user uuid default null,p_before timestamptz default null,p_before_id uuid default null) returns jsonb language plpgsql stable security definer set search_path='' as $$
declare result jsonb;
begin
 if not master_activity_private.master_activity_is_admin() then raise exception 'administrator required' using errcode='42501'; end if;
 if p_start is null or p_end is null or p_end<=p_start or p_end-p_start>interval '91 days' then raise exception 'invalid report window' using errcode='22023'; end if;
 if (p_before is null)<>(p_before_id is null) then raise exception 'invalid cursor' using errcode='22023'; end if;
 with events as materialized (
  select * from public.master_activity_events where happened_at>=greatest(p_start,now()-interval '90 days') and happened_at<p_end and recorded_at>=now()-interval '90 days'
 ), selected as materialized (select * from events where p_user is null or user_id=p_user),
 activity as (select user_id,count(*) as events,max(happened_at) as last_activity,coalesce(sum(duration_ms),0) as active_ms,count(*) filter(where kind='question_answer') as answers,count(*) filter(where kind='question_answer' and correct) as correct from events group by user_id),
 roster as (select u.id as user_id,u.email,coalesce(nullif(u.raw_user_meta_data->>'full_name',''),'Estudante') as name,u.last_sign_in_at,coalesce(p.enabled,false) as tracking_enabled,coalesce(a.events,0) as events,a.last_activity,coalesce(a.active_ms,0) as active_ms,coalesce(a.answers,0) as answers,coalesce(a.correct,0) as correct from auth.users u left join activity a on a.user_id=u.id left join public.master_activity_preferences p on p.user_id=u.id order by a.last_activity desc nulls last,u.created_at desc limit 200),
 timeline as (select e.*,u.email,coalesce(nullif(u.raw_user_meta_data->>'full_name',''),'Estudante') as name from selected e join auth.users u on u.id=e.user_id where p_before is null or (e.happened_at,e.id)<(p_before,p_before_id) order by e.happened_at desc,e.id desc limit 101),
 top as (select route,resource,count(*) filter(where kind in ('page_view','lesson_open')) as visits,coalesce(sum(duration_ms),0) as active_ms from selected group by route,resource order by visits desc,active_ms desc limit 20)
 select jsonb_build_object(
  'summary',(select jsonb_build_object('active_users',count(distinct user_id),'events',count(*),'views',count(*) filter(where kind='page_view'),'active_ms',coalesce(sum(duration_ms),0),'answers',count(*) filter(where kind='question_answer'),'correct',count(*) filter(where kind='question_answer' and correct)) from selected),
  'users',coalesce((select jsonb_agg(to_jsonb(r)) from roster r),'[]'::jsonb),
  'total_users',(select count(*) from auth.users),
  'resources',coalesce((select jsonb_agg(to_jsonb(t)) from top t),'[]'::jsonb),
  'timeline',coalesce((select jsonb_agg(to_jsonb(t)) from (select * from timeline limit 100) t),'[]'::jsonb),
  'has_more',(select count(*)>100 from timeline)
 ) into result;
 return result;
end;$$;
revoke all on function master_activity_private.master_activity_report(timestamptz,timestamptz,uuid,timestamptz,uuid) from public,anon;
grant execute on function master_activity_private.master_activity_report(timestamptz,timestamptz,uuid,timestamptz,uuid) to authenticated;
create function public.master_activity_report(p_start timestamptz,p_end timestamptz,p_user uuid default null,p_before timestamptz default null,p_before_id uuid default null) returns jsonb language sql stable security invoker set search_path='' as $$select master_activity_private.master_activity_report(p_start,p_end,p_user,p_before,p_before_id);$$;
revoke all on function public.master_activity_report(timestamptz,timestamptz,uuid,timestamptz,uuid) from public,anon;
grant execute on function public.master_activity_report(timestamptz,timestamptz,uuid,timestamptz,uuid) to authenticated;

-- Physical deletion, daily; the UI/RLS also exclude expired records immediately.
create extension if not exists pg_cron with schema pg_catalog;
select cron.schedule('master-activity-retention','15 6 * * *',$job$delete from public.master_activity_events where recorded_at < now()-interval '90 days'$job$);
