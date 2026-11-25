\set ON_ERROR_STOP on
\timing on
begin;
insert into auth.users(id) values ('00000000-0000-4000-8000-000000000001'),('00000000-0000-4000-8000-000000000002');
insert into master_question_bank.questions(id,hash,content)
select ('10000000-0000-4000-8000-'||lpad(i::text,12,'0'))::uuid, lpad(to_hex(i),64,'0'),
  jsonb_build_object(
    'discipline','clinica_medica','period',case when i%2=0 then 'P1' else 'P2' end,
    'theme','tema-fixture','subtheme','subtema-fixture','difficulty','N2','origin','autoral_master',
    'stem','Registro sintético de teste '||i,'reviewed_answer','B','comment','Comentário fixture',
    'options','[{"id":"A","text":"Alternativa A","comment":"Comentário A"},{"id":"B","text":"Alternativa B","comment":"Comentário B"}]'::jsonb,
    'profiles','["estilo_fmp"]'::jsonb,'lesson_ids','["aula-fixture"]'::jsonb,'bibliography','["fixture"]'::jsonb,
    'revision_history','[{"by":"test","date":"2026-11-24","action":"fixture"}]'::jsonb,
    'medical_status',case when i=5002 then 'pendente' else 'validada' end,
    'rights_status',case when i=5003 then 'restrita' else 'autorizada' end,'rights_reference','fixture')
from generate_series(1,5003) i;
insert into master_question_bank.questions(id,hash,content)
select '10000000-0000-4000-8000-000000005004',lpad('5004',64,'0'),content || '{
  "origin":"banco_cm2","source_level":"R+","source_style":"estilo USP","number":"Q1","page":2,
  "reference":"PDF de teste, p. 2, Q1","original_answer":"B",
  "source_mentions":"Tema presente em outra prova","difficulty":"N3","lesson_ids":["tema-fixture"]
}'::jsonb
from master_question_bank.questions where id='10000000-0000-4000-8000-000000000001';

set local role anon;
do $$begin
  begin perform public.master_qb_catalog(); raise exception 'anonymous access succeeded';
  exception when insufficient_privilege then null; end;
  begin perform public.master_qb_record_batch('[]'); raise exception 'anonymous batch succeeded';
  exception when insufficient_privilege then null; end;
end$$;
reset role;

set local role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000001',true);
do $$
declare
  result jsonb;
  question constant uuid := '10000000-0000-4000-8000-000000000001';
  unpublished constant uuid := '10000000-0000-4000-8000-000000005002';
  submission constant uuid := '20000000-0000-4000-8000-000000000001';
begin
  begin perform content from master_question_bank.questions; raise exception 'raw answers accessible';
  exception when insufficient_privilege then null; end;
  begin perform public.master_qb_record(unpublished,'B',null,submission); raise exception 'pending item accessible';
  exception when invalid_parameter_value then null; end;
  result := public.master_qb_catalog('{"lesson":"aula-fixture","period":"P2","profile":"estilo_fmp","origin":"autoral_master","difficulty":"N2","subtheme":"subtema-fixture","theme":"tema-fixture"}',12);
  if (result->>'total')::int <> 2501 or jsonb_array_length(result->'items') <> 12
      or result #>> '{items,0,options,0,comment}' is not null
      or result #>> '{items,0,reviewed_answer}' is not null then
    raise exception 'combined filters or projection failed';
  end if;
  if (public.master_qb_catalog('{"lesson":"unrelated"}',0)->>'total')::int <> 0 then
    raise exception 'lesson linkage failed';
  end if;
  result := public.master_qb_catalog(
    '{"lesson":"tema-fixture_1","legacy_topic":"tema-fixture","origin":"bancos_e_provas","difficulty":"N3"}',12);
  if (result->>'total')::int <> 1 or result #>> '{items,0,origin}' is distinct from 'banco_cm2'
      or result #>> '{items,0,reference}' is distinct from 'PDF de teste, p. 2, Q1'
      or result #>> '{items,0,source_level}' is distinct from 'R+' then
    raise exception 'reconstructed source, topic fallback or grouped origin filter failed';
  end if;
  result := public.master_qb_record(question,'A',null,submission);
  if (result->>'correct')::boolean or result->>'answer'<>'B'
      or result #>> '{options,1,comment}' <> 'Comentário B' then
    raise exception 'grading failed';
  end if;
  perform public.master_qb_record_batch(jsonb_build_array(jsonb_build_object('qid',question,'choice','A','submission',submission)));
  perform public.master_qb_record(question,favorite_value=>true);
  result := public.master_qb_catalog('{"status":"favorites","performance":"wrong"}');
  if (result->>'total')::int <> 1 or (result->>'attempts')::int <> 1 then raise exception 'retry or favorite failed'; end if;
end$$;
select (public.master_qb_catalog('{}',100)->>'total')::int as visible_questions;

select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000002',true);
do $$begin
  if (public.master_qb_catalog('{"status":"favorites"}',0)->>'total')::int <> 0
    or (public.master_qb_catalog('{"performance":"wrong"}',0)->>'total')::int <> 0
    or (public.master_qb_catalog('{}',0)->>'attempts')::int <> 0 then raise exception 'progress leaked'; end if;
end$$;
rollback;
