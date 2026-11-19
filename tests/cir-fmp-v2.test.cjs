'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const root=path.join(__dirname,'..','MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const scripts=['cir_data.js','cir_questions.js','cir-quality-v2.js','question-history.js','cir_app.js'];
const read=f=>fs.readFileSync(path.join(root,f),'utf8');

function setup(initial={},privateRows=[]){
 const storage=new Map([['master_cir_lucas_v1',JSON.stringify(initial)]]);
 const localStorage={getItem:key=>storage.has(key)?storage.get(key):null,setItem:(key,v)=>storage.set(key,String(v)),removeItem:key=>storage.delete(key)};
 const ui={route:'cir'};
 const win={addEventListener(){},MasterActivity:{setContext(){},track(){}},QuestionReview:{begin(){}},
   MASTER_AUTH:{user:()=>({id:'test-user'}),client:()=>({from:()=>({select:()=>({order:()=>({range:async()=>({data:privateRows,error:null})})})})})}
 };
 const QNav={filtros:x=>x,dots:()=>'',resultado:()=>'',registrar(){},resumo:()=>'',registrarBanco(){}};
 win.QNav=QNav;
 const ctx=vm.createContext({window:win,ui,localStorage,toast(){},render(){},navigate:r=>ui.route=r,
   escapeHtml:x=>String(x),header:(a,b,c)=>a+' '+b+' '+c,sec:(a,b)=>a+' '+b,
   QNav,LearnUX:{icon:()=>''},CirPlan:{dayKey:()=>'',build:()=>({})},QuestionHistory:null,
   document:{getElementById:()=>null},requestAnimationFrame:()=>{},setInterval:()=>{},clearInterval:()=>{}
 });
 for(const file of scripts){
   if(file==='cir_app.js')ctx.QuestionHistory=win.QuestionHistory;
   vm.runInContext(read(file),ctx,{filename:file,timeout:5000});
 }
 const saved=()=>JSON.parse(storage.get('master_cir_lucas_v1'));
 return {CIR:win.CIR,win,ui,saved,storage};
}
const results=ids=>Object.fromEntries(ids.map(id=>[id,{answer:0,correct:true,revision:'cir-20261116',date:'2026-11-18T11:00:00Z'}]));

test('originais permanecem disponíveis e 29 revisões possuem IDs exclusivos',()=>{
 const x=setup(),a=x.CIR.pool(),v=x.win.CIR_QUALITY_V2;
 assert.equal(a.length,432);
 assert.equal(Object.keys(v.items).length,29);
 assert.ok(a.some(q=>q.id==='cirproc-24'+v.suffix));
 assert.ok(!a.some(q=>q.id==='cirproc-24'));
 for(const [id,edit] of Object.entries(v.items)){
   assert.equal(edit.o.length,4,'four options '+id);
   assert.equal(new Set(edit.o).size,4,'distinct alternatives '+id);
   if(!id.startsWith('b:'))assert.ok(a.some(q=>q.id===id+v.suffix),'curated question '+id);
 }
});
test('respostas antigas continuam no item anterior e sem recorreção',()=>{
 const initial={results:results(['cirproc-24']),questionLegacyImported:true};
 const x=setup(initial);
 assert.ok(x.CIR.pool().some(q=>q.id==='cirproc-24'));
 assert.ok(!x.CIR.pool().some(q=>q.id==='cirproc-24@fmp2'));
 assert.deepEqual(x.saved().results,initial.results);
 x.CIR.startExam(30,'fmp');
 assert.deepEqual(x.saved().results,initial.results);
});
test('questões já respondidas em simulado não entregue mantêm a versão histórica',()=>{
 const x=setup({questionLegacyImported:true,questionSessions:[{id:'session-old',kind:'exam',bank:'cir',label:'Teste',startedAt:'2026-11-18T11:00:00Z',updatedAt:'2026-11-18T11:00:00Z',status:'active',run:{ids:['cirher-30','cirproc-24'],ans:{'cirher-30':0},orders:{'cirher-30':[0,1,2,3]},step:1}}]});
 assert.ok(x.CIR.pool().some(q=>q.id==='cirher-30'));
 assert.ok(x.CIR.pool().some(q=>q.id==='cirproc-24@fmp2'));
 x.CIR.openQuestionSession('session-old');
 const updated=x.saved();
 assert.deepEqual(updated.questionSessions[0].run.ids,['cirher-30','cirproc-24']);
 assert.deepEqual(updated.questionSessions[0].run.ans,{'cirher-30':0});
});
test('planejamento antigo pode iniciar a revisão nova sem perder filtros',()=>{
 const x=setup();
 x.CIR.startPractice({t:'cirfig',src:'own',mode:'all',ids:['cirfig-11']});
 const run=x.saved().questionSessions.at(-1).run;
 assert.deepEqual(run.ids,['cirfig-11@fmp2']);
 const q=x.CIR.pool().find(q=>q.id===run.ids[0]);
 x.CIR.answer(q.a);
 const saved=x.saved();
 assert.equal(saved.results['cirfig-11@fmp2'].correct,true);
 assert.equal(saved.results['cirfig-11'],undefined);
});
test('matriz FMP monta 30 itens sem reposição, inclusive cinco RAD e cinco URO',()=>{
 const x=setup();
 x.CIR.startExam(30,'fmp');
 const run=x.saved().questionSessions.at(-1).run;
 assert.equal(run.variant,'fmp');assert.equal(run.ids.length,30);
 assert.equal(new Set(run.ids).size,30);
 const counts={};for(const id of run.ids){const q=x.CIR.pool().find(x=>x.id===id);counts[q.t]=(counts[q.t]||0)+1;}
 assert.equal(counts.cirrad,5);assert.equal(counts.ciruro,5);
 assert.equal(counts.cirtabd,2);assert.equal(counts.cirttor,2);
 assert.equal(counts.cirproc,4);assert.equal(counts.cirher,4);assert.equal(counts.cirremit,4);
 assert.equal(run.ids.filter(id=>!['cirrad','ciruro'].includes(x.CIR.pool().find(q=>q.id===id).t)).length,20);
 assert.equal(run.dur,90*60000);
});
test('simulados livres 20, 40 e 60 continuam funcionando',()=>{
 for(const n of [20,40,60]){
  const x=setup();x.CIR.startExam(n);
  const run=x.saved().questionSessions.at(-1).run;
  assert.equal(run.ids.length,n);assert.equal(run.variant,'free');
 }
});
test('banco privado continua sem mudança e novas variantes têm identificação distinta',async()=>{
 const rows=[{id:'l120-003',topic:'cirproc',source:'Questão de prova',year:null,stem:'Caso histórico previamente apresentado',options:['A','B','C','D'],answer:0,comment:'Comentário original'},
 {id:'l120-004',topic:'cirproc',source:'Em revisão',year:null,stem:'Em validação',options:['A','B','C','D'],answer:0,comment:''}];
 const x=setup({},rows);
 await x.CIR.loadBank();
 const visible=x.CIR.pool();
 assert.ok(visible.some(q=>q.id==='b:l120-003@fmp2'));
 assert.ok(!visible.some(q=>q.id==='b:l120-004'));
 assert.ok(visible.some(q=>q.id==='b:l120-003@fmp2'&&q.bank===true));
 const answered=setup({results:results(['b:l120-003'])},rows);
 await answered.CIR.loadBank();
 assert.ok(answered.CIR.pool().some(q=>q.id==='b:l120-003'));
});
test('as dependências e o versionamento são carregados antes de Cirurgia',()=>{
 const html=read('index.html');
 assert.ok(html.indexOf('cir-quality-v2.js')>=0);
 assert.ok(html.indexOf('cir-quality-v2.js')<html.indexOf('cir_app.js'));
 assert.match(html,/cir-quality-v2.css/);
 for(const file of scripts)new vm.Script(read(file),{filename:file});
});
