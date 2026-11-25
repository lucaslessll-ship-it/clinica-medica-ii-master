create schema master_question_bank;
revoke all on schema master_question_bank from public, anon, authenticated;
grant usage on schema master_question_bank to authenticated;

create table master_question_bank.questions (
  id uuid primary key,
  hash text not null unique check (hash ~ '^[0-9a-f]{64}$'),
  content jsonb not null,
  period text generated always as (content->>'period') stored not null check (period in ('P1','P2')),
  theme text generated always as (content->>'theme') stored not null,
  published boolean generated always as (
    coalesce(content->>'medical_status' = 'validada'
      and content->>'rights_status' = 'autorizada', false)
  ) stored not null,
  check (content->>'discipline' is not distinct from 'clinica_medica'),
  check (jsonb_typeof(content->'options') is not distinct from 'array'),
  check (not published or (
    nullif(btrim(content->>'rights_reference'), '') is not null
    and nullif(btrim(content->>'comment'), '') is not null
    and jsonb_array_length(content->'revision_history') > 0
    and jsonb_array_length(content->'bibliography') > 0
    and jsonb_array_length(content->'lesson_ids') > 0
    and content->'options' @> jsonb_build_array(jsonb_build_object('id',content->>'reviewed_answer'))
    and not jsonb_path_exists(content, '$.options[*] ? (!exists(@.comment) || @.comment == "")')
    and (content->>'origin' = 'autoral_master' or (
      content->>'origin' in ('fmp_oswaldo','sao_paulo','enamed','enare','outras_residencias')
      and content ?& array['institution','board','year','number','reference','original_answer']
    ))
  ) is true)
);
create index master_qb_catalog on master_question_bank.questions(period, theme, id) where published;
create index master_qb_lessons on master_question_bank.questions using gin ((content->'lesson_ids')) where published;
create unique index master_qb_legacy on master_question_bank.questions ((content->>'legacy_key'))
  where content ? 'legacy_key';
create table master_question_bank.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references master_question_bank.questions(id),
  favorite boolean not null default false,
  attempts integer not null default 0,
  hits integer not null default 0,
  streak integer not null default 0,
  last_correct boolean,
  due_at timestamptz,
  primary key (user_id, question_id)
);
create index master_qb_progress_question on master_question_bank.progress(question_id);
create table master_question_bank.submissions (
  user_id uuid not null references auth.users(id) on delete cascade,
  id uuid not null,
  response jsonb not null,
  primary key (user_id,id)
);
alter table master_question_bank.questions enable row level security;
alter table master_question_bank.progress enable row level security;
alter table master_question_bank.submissions enable row level security;
revoke all on all tables in schema master_question_bank from public, anon, authenticated;

create function master_question_bank.catalog(filters jsonb, take integer, skip integer)
returns jsonb language sql volatile security definer set search_path = '' as $$
  with matching as materialized (
    select q.id, q.period, q.theme, q.content, p.attempts, p.hits,
      p.last_correct, coalesce(p.favorite,false) as favorite, p.due_at,
      case when filters->>'performance'='focus' then
        case when p.last_correct=false then 0 when p.due_at<=now() then 1 else 2 end end as priority,
      case when filters->>'random'='true' then random() end as shuffle_order
    from master_question_bank.questions q
    left join master_question_bank.progress p on p.question_id=q.id and p.user_id=(select auth.uid())
    where (select auth.uid()) is not null and q.published
      and (filters->>'period' is null or q.period=filters->>'period')
      and (filters->>'theme' is null or q.theme=filters->>'theme')
      and (filters->>'subtheme' is null or q.content->>'subtheme'=filters->>'subtheme')
      and (filters->>'origin' is null or q.content->>'origin'=filters->>'origin')
      and (filters->>'difficulty' is null or q.content->>'difficulty'=filters->>'difficulty')
      and (filters->>'profile' is null or q.content->'profiles' ? (filters->>'profile'))
      and (filters->>'lesson' is null or q.content->'lesson_ids' ? (filters->>'lesson')
        or (q.content ? 'legacy_key' and q.content->'lesson_ids' ? (filters->>'legacy_topic')))
      and case filters->>'performance' when 'wrong' then p.last_correct=false
        when 'correct' then p.last_correct=true
        when 'focus' then p.last_correct=false or p.due_at<=now() or p.attempts=0 or p.attempts is null
        else true end
      and case filters->>'status' when 'favorites' then p.favorite
        when 'new' then coalesce(p.attempts,0)=0 when 'due' then p.due_at<=now() else true end
  ), page as (
    select * from matching
    order by priority, shuffle_order, id
    limit least(greatest(coalesce(take,20),0),100) offset greatest(coalesce(skip,0),0)
  )
  select jsonb_build_object(
    'total',(select count(*) from matching),
    'attempts',(select coalesce(sum(attempts),0) from matching),
    'hits',(select coalesce(sum(hits),0) from matching),
    'themes',(select coalesce(jsonb_agg(distinct theme),'[]'::jsonb) from matching),
    'subthemes',(select coalesce(jsonb_agg(distinct content->>'subtheme'),'[]'::jsonb) from matching),
    'items',coalesce((select jsonb_agg(jsonb_build_object(
      'id',id,'period',period,'theme',theme,'subtheme',content->>'subtheme',
      'origin',content->>'origin','difficulty',content->>'difficulty','stem',content->>'stem',
      'favorite',favorite,
      'options',(select jsonb_agg(jsonb_build_object('id',item->>'id','text',item->>'text') order by position)
        from jsonb_array_elements(content->'options') with ordinality as options(item,position))
    ) order by priority, shuffle_order, id) from page),'[]'::jsonb)
  );
$$;

create function master_question_bank.record(qid uuid, choice text, favorite_value boolean, submission uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  student uuid := auth.uid();
  question jsonb;
  correct boolean;
  result jsonb;
begin
  if student is null then raise exception 'Authentication required' using errcode='42501'; end if;
  select content into question from master_question_bank.questions where id=qid and published;
  if not found then raise exception 'Question unavailable' using errcode='22023'; end if;
  if favorite_value is not null then
    insert into master_question_bank.progress(user_id,question_id,favorite)
      values (student,qid,favorite_value)
      on conflict (user_id,question_id) do update set favorite=excluded.favorite;
    return jsonb_build_object('favorite',favorite_value);
  end if;
  if choice is null or submission is null or not (question->'options' @> jsonb_build_array(jsonb_build_object('id',choice))) then
    raise exception 'Invalid answer or submission' using errcode='22023';
  end if;
  correct := choice=question->>'reviewed_answer';
  result := jsonb_build_object('id',qid,'choice',choice,'correct',correct,'answer',question->>'reviewed_answer',
    'comment',question->>'comment','options',question->'options','bibliography',question->'bibliography');
  insert into master_question_bank.submissions(user_id,id,response) values (student,submission,result) on conflict do nothing;
  if not found then
    select response into result from master_question_bank.submissions where user_id=student and id=submission;
    if result->>'id' is distinct from qid::text or result->>'choice' is distinct from choice then
      raise exception 'Submission already used' using errcode='22023';
    end if;
    return result;
  end if;
  insert into master_question_bank.progress as p(user_id,question_id,attempts,hits,streak,last_correct,due_at)
    values(student,qid,1,correct::integer,correct::integer,correct,now()+interval '1 day')
    on conflict (user_id,question_id) do update set attempts=p.attempts+1,
      hits=p.hits+excluded.hits, streak=case when correct then p.streak+1 else 0 end,
      last_correct=correct, due_at=now()+interval '1 day'*case when correct then power(2,least(p.streak,6)) else 1 end;
  return result;
end;
$$;

revoke all on all functions in schema master_question_bank from public, anon, authenticated;
grant execute on function master_question_bank.catalog(jsonb,integer,integer),
  master_question_bank.record(uuid,text,boolean,uuid) to authenticated;
create function public.master_qb_catalog(filters jsonb default '{}', take integer default 20, skip integer default 0)
returns jsonb language sql volatile security invoker set search_path = '' as $$
  select master_question_bank.catalog(filters,take,skip);
$$;
create function public.master_qb_record(qid uuid, choice text default null, favorite_value boolean default null, submission uuid default null)
returns jsonb language sql security invoker set search_path = '' as $$
  select master_question_bank.record(qid,choice,favorite_value,submission);
$$;
revoke all on function public.master_qb_catalog(jsonb,integer,integer),
  public.master_qb_record(uuid,text,boolean,uuid) from public,anon,authenticated;
grant execute on function public.master_qb_catalog(jsonb,integer,integer),
  public.master_qb_record(uuid,text,boolean,uuid) to authenticated;

create function public.master_qb_record_batch(answers jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare
  item jsonb;
  results jsonb := '[]'::jsonb;
begin
  if auth.uid() is null then raise exception 'Authentication required' using errcode='42501'; end if;
  if jsonb_typeof(answers) is distinct from 'array' or jsonb_array_length(answers)>100 then
    raise exception 'Invalid batch' using errcode='22023';
  end if;
  for item in select value from jsonb_array_elements(answers) order by value->>'qid' loop
    results := results || master_question_bank.record(
      (item->>'qid')::uuid,item->>'choice',null,(item->>'submission')::uuid);
  end loop;
  return results;
end;
$$;
revoke all on function public.master_qb_record_batch(jsonb) from public,anon,authenticated;
grant execute on function public.master_qb_record_batch(jsonb) to authenticated;
