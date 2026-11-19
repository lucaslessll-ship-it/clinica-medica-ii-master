'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const root=path.join(__dirname,'..','MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const scripts=['emergency-content.js','emergency-depth-core.js','emergency-depth-p1a.js','emergency-depth-p1b.js','emergency-depth-p1c.js','emergency-depth-p2a.js','emergency-depth-p2b.js','emergency-depth-p2c.js'];
function loaded(){
 const win={};
 const ctx=vm.createContext({window:win});
 for(const name of scripts){
   const src=fs.readFileSync(path.join(root,name),'utf8');
   vm.runInContext(src,ctx,{filename:name,timeout:1500});
 }
 return win;
}

test('23 disciplinas foram aprofundadas uma única vez, sem perda',()=>{
 const w=loaded(),mods=w.EMERGENCY_CONTENT;
 assert.equal(mods.length,23);
 assert.equal(mods.filter(x=>x.stage==='P1').length,13);
 assert.equal(mods.filter(x=>x.stage==='P2').length,10);
 assert.equal(w.EmergencyDeepAudit.missing.length,0);
 assert.equal(w.EmergencyDeepAudit.processed.length,23);
 assert.equal(new Set(mods.map(x=>x.id)).size,23);
 assert.ok(mods.every(x=>x.depthApplied));
});
test('todas as aulas têm explicação, fluxograma, questões e arguição',()=>{
 const mods=loaded().EMERGENCY_CONTENT;
 assert.equal(mods.reduce((n,m)=>n+m.quiz.length,0),115);
 assert.equal(mods.reduce((n,m)=>n+m.sections.length,0),184);
 assert.ok(mods.every(m=>m.sections.length>=8&&m.quiz.length>=5));
 assert.ok(mods.every(m=>m.oral.length>=3&&m.memory.length>=3));
 assert.ok(mods.every(m=>m.sections.some(s=>s.table&&s.table.head.length>=3)));
 assert.ok(mods.every(m=>m.case&&m.moreCases.length===1));
 assert.equal(mods.reduce((n,m)=>n+1+m.moreCases.length,0),46);
});
test('questões têm alternativas, gabarito indexado e justificativa',()=>{
 for(const m of loaded().EMERGENCY_CONTENT)for(const [i,q] of m.quiz.entries()){
   assert.equal(q.o.length,4,m.id+':'+i);
   assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<4,m.id+':'+i);
   assert.ok(q.why&&q.why.trim().length>15,m.id+':'+i);
   assert.equal(new Set(q.o).size,4,m.id+':'+i);
 }
});
test('casos clínicos preservam identificadores originais',()=>{
 for(const m of loaded().EMERGENCY_CONTENT){
   assert.equal(m.case.id,'case-'+m.id);
   assert.equal(m.moreCases[0].id,'case-'+m.id+'-evolucao');
   assert.ok(m.moreCases[0].answer.length>=3);
 }
});
test('arquivos de aprofundamento são carregados antes do motor de interface',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const names=scripts.concat(['emergency.js']);
 let pos=-1;
 for(const name of names){
   const now=html.indexOf('src="'+name+'?v=');
   assert.ok(now>pos,'ordem script '+name);
   pos=now;
 }
});
