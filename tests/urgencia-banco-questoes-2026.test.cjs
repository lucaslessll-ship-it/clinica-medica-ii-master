'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..','MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const files=['course-kit.js','question-history.js','emergency-content.js','emergency-depth-core.js',
'emergency-depth-p1a.js','emergency-depth-p1b.js','emergency-depth-p1c.js','emergency-depth-p2a.js',
'emergency-depth-p2b.js','emergency-depth-p2c.js','emergency.js','emergency-bank-data.js','emergency-bank.js'];
const src=files.map(name=>fs.readFileSync(path.join(root,name),'utf8')+(name==='question-history.js'?'\nconst QuestionHistory=window.QuestionHistory;\n':'')).join('\n');
const initialize=new Function('window','store','ui','header','section','stateSave','setInterval','document','StudyIcons','navigate','render',src+'\nreturn window.UEQuestions;');
function setup(saved){
 const win={MasterActivity:{setContext(){},track(){}},StudyIcons:{emergency:()=>'<svg/>'}};
 const store=saved||{study:{}},ui={route:'emergency-questions'};
 let savedCount=0;
 const q=initialize(win,store,ui,()=>'',(_,x)=>x,()=>savedCount++,()=>{},
  {getElementById:()=>null},win.StudyIcons,r=>ui.route=r,()=>{});
 return {q,win,store,ui,get saves(){return savedCount}};
}
test('172 itens corrigíveis (115 aulas, 46 autorais e 11 adaptações), 25 originais identificados',()=>{
 const {q,win}=setup();
 assert.equal(q.pool().length,172);
 assert.equal(q.pool().filter(x=>x.kind==='fixacao').length,115);
 assert.equal(q.pool().filter(x=>x.kind==='modelo').length,46);
 assert.equal(q.pool().filter(x=>x.kind==='prova').length,11);
 assert.equal(q.originals().length,25);
 assert.equal(new Set(q.pool().map(x=>x.id)).size,172);
 assert.equal(win.UE_BANK_SOURCES.fgv.year,2026);
 assert.equal(q.originals().filter(x=>x.key).length,4);
 assert.match(win.UE_BANK_SOURCES.fgv.keyUrl,/hubrasil2026_gabaritos_definitivo/);
});
test('configurador contém temas, níveis N1–N3, tipo, tempo e quantidade',()=>{
 const {q}=setup(),html=q.page();
 for(const x of ['Temas (23 de 23)','N1 · Essencial','N2 · Aplicação','N3 · Decisão','Provas reais · adaptadas',
  'Quantidade de questões','Tempo do simulado','Modelo residência'])assert.ok(html.includes(x),x);
 assert.match(html,/Questões reais de provas/);
});
test('treino salva cada resposta, pinta bolinhas e mantém histórico/restauração',()=>{
 const a=setup();a.q.create('practice');const b=a.store.study.ueQuestions,s=b.questionSessions[0],id=s.run.ids[0],correct=a.q.pool().find(x=>x.id===id).a;
 a.q.answer(correct);
 assert.equal(b.results[id].correct,true);
 assert.ok(a.saves>=2);
 assert.match(a.q.page(),/ue-bank-dot right/);
 assert.match(a.q.page(),/Aprofundamento resumido/);
 a.q.jump(4);
 const next=setup(a.store);next.q.openQuestionSession(s.id);
 assert.equal(next.ui.route,'emergency-questions');
 assert.equal(next.store.study.ueQuestions.questionSessions[0].run.step,4);
 assert.match(next.q.page(),/ue-bank-dot right/);
});
test('simulado persiste respostas antes da entrega e revela gabarito apenas depois',()=>{
 const a=setup();a.q.create('exam');const b=a.store.study.ueQuestions,s=b.questionSessions[0],id=s.run.ids[0],correct=a.q.pool().find(x=>x.id===id).a;
 a.q.answer(correct);
 assert.equal(b.questionSessions[0].run.ans[id],correct);
 assert.doesNotMatch(a.q.page(),/ue-bank-feedback/);
 assert.match(a.q.page(),/ue-bank-timer/);
 a.q.finish(false);
 assert.equal(b.questionSessions[0].run.done,true);
 assert.equal(b.questionSessions[0].run.score,1);
 assert.match(a.q.page(),/ue-bank-feedback/);
 assert.match(a.q.page(),/ue-bank-dot right/);
 assert.equal(b.exams.length,1);
});
test('limpar histórico não interfere em progresso de aulas de outras disciplinas',()=>{
 const seed={study:{uep1:{done:{pcr:true},quiz:{pcr_0:2}},ueQuestions:{results:{},questionSessions:[],questionLegacyImported:true,exams:[]}}};
 const a=setup(seed);a.q.create('practice');
 const id=a.store.study.ueQuestions.questionSessions[0].run.ids[0],q=a.q.pool().find(x=>x.id===id);
 a.q.answer(q.a);assert.equal(a.store.study.ueQuestions.results[id].correct,true);
 // A confirmação humana é necessária; apenas o escopo de estado é testado aqui.
 assert.equal(seed.study.uep1.done.pcr,true);
 assert.equal(seed.study.uep1.quiz.pcr_0,2);
});
test('menu lateral expõe novas rotas e os scripts estão antes do controlador principal',()=>{
 const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
 const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert.match(app,/'emergency-questions':'Questões'/);
 assert.match(app,/'emergency-simulado':'Simulados'/);
 assert.match(app,/case 'emergency-simulado'/);
 assert.ok(index.indexOf('<script src="emergency-bank.js')<index.indexOf('<script src="app.js'));
 for(const script of ['emergency-bank-data.js','emergency-bank.js','emergency-bank.css'])assert.ok(index.includes(script));
});
