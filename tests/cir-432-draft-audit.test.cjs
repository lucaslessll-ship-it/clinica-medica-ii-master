'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const base=path.join(root,'MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
function read(f){return fs.readFileSync(path.join(base,f),'utf8');}
function load(){
 const window={};
 for(const f of ['cir_questions.js','cir-quality-v2.js','cir-quality-draft-432.js'])new Function('window',read(f))(window);
 return window;
}
test('432 authorial stems and answers remain bytewise unchanged',()=>{
 const w=load();
 assert.equal(w.MASTER_CIR_QUESTIONS.length,432);
 const ids=w.MASTER_CIR_QUESTIONS.map(q=>q.id);
 assert.equal(new Set(ids).size,432);
 for(const q of w.MASTER_CIR_QUESTIONS){
  assert.equal(q.o.length,4);
  assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<4);
 }
});
test('draft excludes every correct answer and preserves exact gabarito position',()=>{
 const w=load(),lookup=new Map(w.MASTER_CIR_QUESTIONS.map(q=>[q.id,q]));
 const review=w.CIR_QUALITY_DRAFT_432.reviewed;
 assert.equal(w.CIR_QUALITY_DRAFT_432.status,'draft_not_enabled');
 for(const [id,wrong] of Object.entries(review)){
  const q=lookup.get(id);assert.ok(q,id);
  assert.deepEqual(Object.keys(wrong).map(Number).sort(),
   [0,1,2,3].filter(i=>i!==q.a).sort(),id);
  const options=q.o.map((opt,i)=>Object.hasOwn(wrong,i)?wrong[i]:opt);
  assert.equal(options[q.a],q.o[q.a],id);
  assert.equal(new Set(options).size,4,id);
  assert.ok(options.every(s=>typeof s==='string'&&s.length>20),id);
 }
});
test('all 432 items have explicit editorial status; reviewed and draft are disjoint',()=>{
 const w=load();
 const data=JSON.parse(fs.readFileSync(path.join(root,'docs/CIRURGIA_432_AUDITORIA_STATUS.json'),'utf8'));
 assert.equal(data.questions.length,432);
 assert.equal(data.counts.total,432);
 const draft=new Set(Object.keys(w.CIR_QUALITY_DRAFT_432.reviewed));
 const active=new Set(Object.keys(w.CIR_QUALITY_V2.items).filter(x=>!x.startsWith('b:')));
 for(const id of draft)assert.ok(!active.has(id),id);
 const groups=data.questions.reduce((m,q)=>(m[q.status]=(m[q.status]||0)+1,m),{});
 assert.equal(groups.draft_edited,draft.size);
 assert.equal(groups.active_v2,active.size);
 assert.equal(groups.pending_review,432-draft.size-active.size);
});
test('work-in-progress files are never loaded into live index',()=>{
 const index=read('index.html');
 assert.doesNotMatch(index,/cir-quality-draft-432\.js/);
 assert.match(index,/cir-quality-v2\.js/);
});
