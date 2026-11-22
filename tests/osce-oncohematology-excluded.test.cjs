'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const OWNER='d20331a2-6724-40e9-8e01-e3e82e57924e';
const scripts=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-personal-priorities.js','osce-pilot.js'];
function fixture(owner=false,progress=null){
 const db=new Map(progress?[['master_osce_pilot_v1',JSON.stringify(progress)]]:[]),
 window={MASTER_AUTH:{user:()=>({id:owner?OWNER:'79bc64a0-4c53-4ae9-ae14-62a2dd45c18f'})},addEventListener(){},matchMedia:()=>({matches:true})},
 localStorage={getItem:k=>db.get(k)||null,setItem:(k,v)=>db.set(k,String(v))},
 ctx=vm.createContext({window,localStorage,Date,console});
 for(const file of scripts)vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),ctx,{filename:file});
 return {P:window.OSCEPilot,index:window.OSCE_PRIORITY_INDEX,plan:window.OSCE_PERSONAL_PRIORITIES,db};
}
const EXCLUDED=[8,9,25,26,36,39,45,47,49,59,60,67,69,79,80,81,82,83,84];
test('todas as 86 estações existem, 19 onco-hematológicas estão somente no grupo final',()=>{
 const {P,index}=fixture();const groups=index.groups,all=groups.flatMap(g=>g.numbers);
 assert.deepEqual(Array.from(groups,g=>g.numbers.length),[22,35,10,19]);
 assert.equal(all.length,86);assert.equal(new Set(all).size,86);
 assert.deepEqual(Array.from(groups[3].numbers).sort((a,b)=>a-b),EXCLUDED);
 assert.deepEqual(Array.from(index.excludedIds).sort((a,b)=>a-b),EXCLUDED);
 assert.equal(P.bank().length,93);
 assert.equal(groups[0].numbers[0],52);
 for(const st of P.bank())if(EXCLUDED.includes(st.number))assert.equal(st.priority,'excluida',st.number);
 else assert.notEqual(st.priority,'excluida',st.number);
 const home=P.page();
 assert.match(home,/22 altas, 35 médias, 10 baixas e 19 excluídas/);
 assert.match(home,/Fora do OSCE/);
 assert.match(home,/osce-index-excluida/);
});
test('as estações excluídas permanecem acessíveis manualmente, mas não no treino automático',()=>{
 const {P,db}=fixture();
 P.daily();
 const current=JSON.parse(db.get('master_osce_pilot_v1')).current;
 assert.ok(current.queue.every(e=>!EXCLUDED.includes(e.station)));
 P.home();P.jumpToIndex(79);
 let html=P.page();
 assert.match(html,/id="osce-station-79"/);
 assert.match(html,/FORA DO OSCE/);
 P.start('essencial',null,79);P.answer('não sei');P.conf(1);P.reveal();P.finish();
 const progress=JSON.parse(db.get('master_osce_pilot_v1'));
 assert.ok(Object.keys(progress.items).some(k=>k.startsWith('79:')));
 P.home();html=P.page();
 assert.match(html,/>0<\/b><span>lacunas registradas/);
 P.showPrompt();
 assert.match(P.page(),/Ainda não há erros/);
});
test('plano pessoal não contém neoplasias hematológicas, linfomas nem emergências onco-hematológicas',()=>{
 const {P,plan}=fixture(true),html=P.page();
 assert.equal(plan.groups.length,15);
 assert.deepEqual(Array.from(['A','B','C'],tier=>plan.groups.filter(g=>g.tier===tier).length),[6,6,3]);
 assert.equal(plan.groups.reduce((n,g)=>n+g.minutes,0),380);
 for(const g of plan.groups)for(const id of g.ids)assert.ok(!EXCLUDED.includes(id),'excluded in personal block '+g.n+': '+id);
 assert.equal(plan.groups[7].title,'Vasculites');
 assert.equal(plan.groups[8].title,'Esclerose sistêmica, Sjögren e miopatias');
 assert.match(html,/Minha trilha OSCE/);
 assert.doesNotMatch(html,/Emergências oncológicas/);
 assert.doesNotMatch(html,/Leucemias, linfomas e mieloma/);
});
test('migração conserva conclusões A1–A6, B7 e B10, sem completar indevidamente os novos blocos',()=>{
 const state={version:2,settings:{examDate:'2026-11-24',minutes:15,personalPlanDone:{1:true,8:true,9:true,10:true,11:true,12:true,13:true,14:true,15:true}},items:{},runs:[],current:null,covered:{}};
 const {P,db}=fixture(true,state);
 let h=P.page();
 assert.match(h,/2\/15/);
 P.personalDone(8);
 const saved=JSON.parse(db.get('master_osce_pilot_v1')).settings;
 assert.equal(saved.personalPlanDone[1],true);
 assert.equal(saved.personalPlanDone[10],true);
 assert.equal(saved.personalPlanDone[8],true);
 assert.ok(!saved.personalPlanDone[9]);
 assert.ok(!saved.personalPlanDone[11]);
 assert.ok(!saved.personalPlanDone[12]);
 assert.ok(saved.personalPlanVersion.includes('no-oncohemo'));
 h=P.page();assert.match(h,/3\/15/);
});
test('usuário diferente não recebe trilha A/B/C da conta proprietária',()=>{
 const {P}=fixture(false),h=P.page();
 assert.doesNotMatch(h,/id="osce-my-plan"/);
 assert.doesNotMatch(h,/★ Minhas prioridades/);
 assert.match(h,/Fora do OSCE/);
});
test('scripts são atualizados sem alterar os IDs internos de notas e progresso',()=>{
 const h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 assert.match(h,/osce-priority-index\.js\?v=20261122-sem-oncoheme-v1/);
 assert.match(h,/osce-personal-priorities\.js\?v=20261122-sem-oncoheme-v1/);
 assert.match(h,/osce-pilot\.js\?v=20261122-sem-oncoheme-v1/);
 assert.match(h,/osce\.css\?v=20261122-sem-oncoheme-v1/);
});
