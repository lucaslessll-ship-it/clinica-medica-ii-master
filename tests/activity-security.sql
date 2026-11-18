begin;
select set_config('request.jwt.claims',jsonb_build_object('sub',(select user_id from public.study_owners limit 1),'role','authenticated')::text,true);
delete from public.master_activity_preferences where user_id=auth.uid();
set local role authenticated;
do $test$
declare eid uuid:=gen_random_uuid(); sid uuid:=gen_random_uuid(); v jsonb; n integer; r jsonb;
begin
 v:=jsonb_build_array(jsonb_build_object('id',eid,'session_id',sid,'kind','page_view','route','dashboard','resource','verification_backend','happened_at',now()));
 n:=public.master_activity_record(v); if n<>1 then raise exception 'expected one insert'; end if;
 if not exists(select 1 from public.master_activity_preferences where user_id=auth.uid() and enabled) then raise exception 'automatic default missing'; end if;
 n:=public.master_activity_record(v); if n<>0 then raise exception 'duplicate event not idempotent'; end if;
 if (select count(*) from public.master_activity_events where id=eid)<>1 then raise exception 'owner cannot read event'; end if;
 perform public.master_activity_record(jsonb_build_array((v->0)||jsonb_build_object('id',gen_random_uuid(),'kind','lesson_open')));
 r:=public.master_activity_report(now()-interval '1 hour',now()+interval '1 minute');
 if (select (x->>'visits')::integer from jsonb_array_elements(r->'resources') x where x->>'resource'='verification_backend')<>1 then raise exception 'page access double counted'; end if;
 if jsonb_typeof(r->'timeline')<>'array' then raise exception 'invalid report'; end if;
 begin perform public.master_activity_record(jsonb_build_array((v->0)||'{"question":"must not be stored"}'::jsonb)); raise exception 'unknown fields accepted'; exception when invalid_parameter_value then null; end;
 update public.master_activity_preferences set enabled=false where user_id=auth.uid();
 if public.master_activity_record(jsonb_build_array((v->0)||jsonb_build_object('id',gen_random_uuid())))<>0 then raise exception 'opt out not enforced'; end if;
 perform set_config('request.jwt.claims',jsonb_build_object('sub',gen_random_uuid(),'role','authenticated','user_metadata',jsonb_build_object('role','admin'))::text,true);
 if public.master_activity_is_admin() then raise exception 'metadata admin escalation'; end if;
 begin select user_id into eid from master_activity_private.administrator; raise exception 'admin mapping is exposed'; exception when insufficient_privilege then null; end;
 if (select count(*) from public.master_activity_events)<>0 then raise exception 'ordinary account sees events'; end if;
 begin perform public.master_activity_report(now()-interval '1 hour',now()+interval '1 minute'); raise exception 'ordinary account accessed report'; exception when insufficient_privilege then null; end;
 begin insert into public.master_activity_events(id,user_id,session_id,kind,route,happened_at) values(gen_random_uuid(),auth.uid(),sid,'page_view','dashboard',now()); raise exception 'direct insert allowed'; exception when insufficient_privilege then null; end;
end $test$;
reset role;
select not has_function_privilege('anon','public.master_activity_report(timestamptz,timestamptz,uuid,timestamptz,uuid)','execute') as anonymous_report_blocked,
not has_function_privilege('anon','public.master_activity_record(jsonb)','execute') as anonymous_ingestion_blocked;
rollback;
