-- Lock the preference through ingestion so opt-out completion fences pending writes.
create or replace function master_activity_private.master_activity_record(p_events jsonb) returns integer language plpgsql security definer set search_path='' as $$
declare uid uuid:=auth.uid(); n integer; v jsonb; written integer;
begin
 if uid is null then raise exception 'authentication required' using errcode='42501'; end if;
 if jsonb_typeof(p_events) is distinct from 'array' or jsonb_array_length(p_events)>50 then raise exception 'invalid event batch' using errcode='22023'; end if;
 perform pg_advisory_xact_lock(hashtextextended(uid::text,42));
 -- Default for personal-use accounts without a saved setting; never overwrite an opt-out.
 insert into public.master_activity_preferences(user_id,enabled,notice_version) values(uid,true,'2026-11-18') on conflict(user_id) do nothing;
 perform 1 from public.master_activity_preferences where user_id=uid and enabled and notice_version='2026-11-18' for share;
 if not found then return 0; end if;
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
