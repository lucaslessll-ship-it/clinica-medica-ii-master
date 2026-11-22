'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const files=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-pilot.js'];
function init(store=new Map()){
 const window={addEventListener(){}},localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,String(v))};
 const ctx=vm.createContext({window,localStorage,Date,console});
 for(const file of files)vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),ctx,{filename:file});
 return {window,store,stations:[window.OSCE_PILOT_DATA,window.OSCE_FA_DATA,...window.OSCE_EXTRA_STATIONS]};
}
test('93 estações, 858 itens com critérios, sem IDs duplicados, sem níveis apontando para perguntas inexistentes',()=>{
 const {stations}=init();
 assert.equal(stations.length,93);
 assert.equal(stations.reduce((n,s)=>n+s.questions.length,0),858);
 const global=new Set();
 for(const st of stations){
  assert.equal(typeof st.number,'number');assert.ok(!global.has(st.number),'ID duplicado '+st.number);global.add(st.number);
  assert.ok(st.title&&st.caseText&&st.priority);
  const ids=new Set();
  for(const q of st.questions){
   assert.ok(q.id&&q.prompt&&q.answer,'pergunta incompleta em '+st.number);
   assert.ok(!ids.has(q.id),'pergunta duplicada em '+st.number+': '+q.id);
   ids.add(q.id);
   assert.ok(Array.isArray(q.criteria)&&q.criteria.length>0,'critérios ausentes em '+st.number+': '+q.id);
  }
  for(const level of ['essencial','rapida','completa']){
   assert.ok(st.tiers[level]?.ids.length>0,'falta profundidade '+level+' em '+st.number);
   for(const id of st.tiers[level].ids)assert.ok(ids.has(id),'referência inexistente '+st.number+': '+id);
  }
 }
});
test('todas as referências têm identificador, URL segura e título exibível',()=>{
 const {stations}=init();
 for(const st of stations)for(const ref of st.sources||[]){
  assert.match(ref.url,/^https:\/\//,'URL de referência inválida em '+st.number);
  assert.ok(ref.label||ref.title,'rótulo da referência ausente em '+st.number);
 }
});
test('roteiro para IA também aproveita referências antigas que usam title no lugar de label',()=>{
 const {window}=init(),P=window.OSCEPilot;
 P.start('essencial',null,61);P.answer('não sei');P.conf(3);P.reveal();P.finish();P.showPrompt();
 assert.match(P.page(),/ESC/);
 assert.match(P.page(),/eusem|Síncope|Syncope/i);
 assert.match(P.page(),/Fontes do tema para conferir/);
});
