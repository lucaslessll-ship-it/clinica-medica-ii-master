-- Count each page access once and make cursor ordering explicit.
create or replace function master_activity_private.master_activity_report(p_start timestamptz,p_end timestamptz,p_user uuid default null,p_before timestamptz default null,p_before_id uuid default null) returns jsonb language plpgsql stable security definer set search_path='' as $$
declare result jsonb;
begin
 if not master_activity_private.master_activity_is_admin() then raise exception 'administrator required' using errcode='42501'; end if;
 if p_start is null or p_end is null or p_end<=p_start or p_end-p_start>interval '91 days' then raise exception 'invalid report window' using errcode='22023'; end if;
 if (p_before is null)<>(p_before_id is null) then raise exception 'invalid cursor' using errcode='22023'; end if;
 with events as materialized (
  select * from public.master_activity_events where happened_at>=greatest(p_start,now()-interval '90 days') and happened_at<p_end and recorded_at>=now()-interval '90 days'
 ), selected as materialized (select * from events where p_user is null or user_id=p_user),
 activity as (select user_id,count(*) as events,max(happened_at) as last_activity,coalesce(sum(duration_ms),0) as active_ms,count(*) filter(where kind='question_answer') as answers,count(*) filter(where kind='question_answer' and correct) as correct from events group by user_id),
 roster as (select u.id as user_id,u.email,coalesce(nullif(u.raw_user_meta_data->>'full_name',''),'Estudante') as name,u.last_sign_in_at,coalesce(p.enabled,true) as tracking_enabled,coalesce(a.events,0) as events,a.last_activity,coalesce(a.active_ms,0) as active_ms,coalesce(a.answers,0) as answers,coalesce(a.correct,0) as correct from auth.users u left join activity a on a.user_id=u.id left join public.master_activity_preferences p on p.user_id=u.id order by a.last_activity desc nulls last,u.created_at desc limit 200),
 timeline as (select e.*,u.email,coalesce(nullif(u.raw_user_meta_data->>'full_name',''),'Estudante') as name from selected e join auth.users u on u.id=e.user_id where p_before is null or (e.happened_at,e.id)<(p_before,p_before_id) order by e.happened_at desc,e.id desc limit 101),
 top as (select route,resource,count(*) filter(where kind='page_view') as visits,coalesce(sum(duration_ms),0) as active_ms from selected where kind in ('page_view','active_time') group by route,resource order by visits desc,active_ms desc limit 20)
 select jsonb_build_object(
  'summary',(select jsonb_build_object('active_users',count(distinct user_id),'events',count(*),'views',count(*) filter(where kind='page_view'),'active_ms',coalesce(sum(duration_ms),0),'answers',count(*) filter(where kind='question_answer'),'correct',count(*) filter(where kind='question_answer' and correct)) from selected),
  'users',coalesce((select jsonb_agg(to_jsonb(r) order by r.last_activity desc nulls last,r.user_id) from roster r),'[]'::jsonb),
  'total_users',(select count(*) from auth.users),
  'resources',coalesce((select jsonb_agg(to_jsonb(t) order by t.visits desc,t.active_ms desc,t.route,t.resource) from top t),'[]'::jsonb),
  'timeline',coalesce((select jsonb_agg(to_jsonb(t) order by t.happened_at desc,t.id desc) from (select * from timeline order by happened_at desc,id desc limit 100) t),'[]'::jsonb),
  'has_more',(select count(*)>100 from timeline)
 ) into result;
 return result;
end;$$;

-- Keep analytics access pinned to the sole current owner; other study accounts never inherit it.
do $$begin
 if (select count(*) from public.study_owners)<>1 then raise exception 'Expected exactly one existing owner'; end if;
end$$;
create table master_activity_private.administrator (
 singleton boolean primary key default true check(singleton),
 user_id uuid not null unique references auth.users(id) on delete cascade
);
alter table master_activity_private.administrator enable row level security;
revoke all on master_activity_private.administrator from public,anon,authenticated;
create policy no_direct_client_access on master_activity_private.administrator for all to authenticated using(false) with check(false);
insert into master_activity_private.administrator(singleton,user_id) select true,user_id from public.study_owners;
create or replace function master_activity_private.master_activity_is_admin() returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and exists(select 1 from master_activity_private.administrator where singleton and user_id=auth.uid());
$$;
