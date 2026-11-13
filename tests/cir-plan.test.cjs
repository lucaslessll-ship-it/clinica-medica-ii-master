const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
process.env.TZ='America/Sao_Paulo';
const plan=require('../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/cir-plan.js');
const app=path.join(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const context=vm.createContext({window:{}});
for(const file of ['cir_data.js','cir_questions.js'])vm.runInContext(fs.readFileSync(path.join(app,file),'utf8'),context);
const topics=JSON.parse(JSON.stringify(context.window.MASTER_CIR_DATA.topics)),questions=JSON.parse(JSON.stringify(context.window.MASTER_CIR_QUESTIONS));
const build=(options={})=>plan.build({topics,questions,now:new Date('2026-11-13T09:00:00-03:00'),...options});
test('plano cobre as 58 aulas e as 212 questões sem repetição, com peso 5 primeiro',()=>{
 const result=build(),lessons=result.days.flatMap(day=>day.lessons),ids=result.days.flatMap(day=>day.questions);
 assert.equal(result.days.length,7);assert.equal(lessons.length,58);assert.equal(ids.length,212);assert.equal(new Set(lessons.map(lesson=>lesson.key)).size,58);assert.equal(new Set(ids).size,212);
 assert.ok(lessons.every((lesson,index)=>!index||lessons[index-1].priority>=lesson.priority));
 const weight=new Map(topics.map(topic=>[topic.id,topic.priority])),questionMap=new Map(questions.map(question=>[question.id,question]));
 assert.ok(ids.every((id,index)=>!index||weight.get(questionMap.get(ids[index-1]).t)>=weight.get(questionMap.get(id).t)));
 assert.equal(result.days.at(-1).review,true);assert.equal(result.days.at(-1).date,'2026-11-19');assert.deepEqual(result.days.at(-1).lessons,[]);assert.deepEqual(result.days.at(-1).questions,[]);
});
test('concluir a tarefa de hoje não puxa aulas e questões futuras para uma meta sem fim',()=>{
 const initial=build(),today=initial.days[0],completed=Object.fromEntries(today.lessons.map(lesson=>[lesson.key,true])),results=Object.fromEntries(today.questions.map(id=>[id,{correct:true}]));
 const activity={'2026-11-13':{lessons:today.lessons.map(lesson=>lesson.key),questions:today.questions}};
 const result=build({completed,results,activity});
 assert.equal(result.days[0].lessons.length,0);assert.equal(result.days[0].questions.length,0);assert.equal(result.completedToday,today.lessons.length);assert.equal(result.days.slice(1).flatMap(day=>day.lessons).length,58-today.lessons.length);
});
test('dia perdido redistribui pendências e conclusões antigas não são inventadas como estudo de hoje',()=>{
 const initial=build(),tomorrow=build({now:new Date('2026-11-14T09:00:00-03:00')});assert.equal(tomorrow.days[0].date,'2026-11-14');assert.ok(tomorrow.days[0].lessons.length>initial.days[0].lessons.length);assert.equal(tomorrow.days.flatMap(day=>day.lessons).length,58);
 const completed=Object.fromEntries(initial.days[0].lessons.map(lesson=>[lesson.key,true])),snapshot=JSON.stringify(completed),result=build({completed});assert.equal(result.completedToday,0);assert.equal(result.pendingLessons,58-initial.days[0].lessons.length);assert.equal(JSON.stringify(completed),snapshot);
});
test('19 de novembro fica só para revisão e o plano expira por data local',()=>{
 const final=build({now:new Date('2026-11-19T00:00:00-03:00')});assert.equal(final.days.length,1);assert.equal(final.days[0].review,true);assert.equal(final.next,null);assert.equal(final.pendingLessons,58);
 for(const now of [new Date('2026-11-20T00:00:00-03:00'),new Date('2026-11-12T23:59:59-03:00')]){const result=build({now});assert.equal(result.active,false);assert.deepEqual(result.days,[]);}
});
test('conclusão total preserva o cronograma de revisão sem gerar tarefas fictícias',()=>{
 const completed=Object.fromEntries(topics.flatMap(topic=>topic.chapters.map((_,index)=>[topic.id+'_'+index,true]))),results=Object.fromEntries(questions.map(question=>[question.id,{correct:true}])),result=build({completed,results});assert.equal(result.pendingLessons,0);assert.equal(result.pendingQuestions,0);assert.equal(result.next,null);assert.ok(result.days.every(day=>!day.lessons.length&&!day.questions.length));
});
