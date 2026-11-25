create or replace function master_question_bank.catalog(filters jsonb, take integer, skip integer)
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
      and (
        filters->'themes' is null or filters->'themes' = '[]'::jsonb
        or (jsonb_typeof(filters->'themes') = 'array' and filters->'themes' ? q.theme)
      )
      and (filters->>'subtheme' is null or q.content->>'subtheme'=filters->>'subtheme')
      and (filters->>'origin' is null or q.content->>'origin'=filters->>'origin'
        or (filters->>'origin'='bancos_e_provas' and q.content->>'origin'<>'autoral_master'))
      and case filters->>'format' when 'discursive' then q.content ? 'model_answer'
        when 'objective' then not (q.content ? 'model_answer') else true end
      and (filters->>'difficulty' is null or q.content->>'difficulty'=filters->>'difficulty')
      and (filters->>'profile' is null or q.content->'profiles' ? (filters->>'profile'))
      and (filters->>'lesson' is null or q.content->'lesson_ids' ? (filters->>'lesson')
        or (q.theme=filters->>'legacy_topic' and q.content->'lesson_ids' ? (filters->>'legacy_topic')))
      and case filters->>'performance' when 'wrong' then p.last_correct=false
        when 'correct' then p.last_correct=true
        when 'focus' then p.last_correct=false or p.due_at<=now() or p.attempts=0 or p.attempts is null
        else true end
      and case filters->>'status' when 'favorites' then p.favorite
        when 'new' then coalesce(p.attempts,0)=0 when 'due' then p.due_at<=now() else true end
  ), page as (
    select *, case when filters->>'random'='true' and jsonb_typeof(filters->'themes')='array'
      and filters->'themes' <> '[]'::jsonb then
      row_number() over (partition by theme, priority order by shuffle_order, id)
      end as topic_rank
    from matching
    order by priority, topic_rank, shuffle_order, id
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
      'favorite',favorite,'reference',content->>'reference',
      'source_level',content->>'source_level','source_style',content->>'source_style',
      'source_mentions',content->>'source_mentions','discursive',(content ? 'model_answer'),
      'options',coalesce((select jsonb_agg(jsonb_build_object('id',item->>'id','text',item->>'text') order by position)
        from jsonb_array_elements(content->'options') with ordinality as options(item,position)),'[]'::jsonb)
    ) order by priority, topic_rank, shuffle_order, id) from page),'[]'::jsonb)
  );
$$;
