'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const read=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
function make(){
 const mem=new Map();
 const localStorage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,String(v))};
 const win={addEventListener(){}};
 const ctx=vm.createContext({window:win,localStorage,Date,console});
 for(const file of ['osce-pilot-data.js','osce-fa-data.js','osce-pilot.js'])vm.runInContext(read(file),ctx,{filename:file});
 return {win,P:win.OSCEPilot,S:win.OSCE_PILOT_DATA,FA:win.OSCE_FA_DATA,localStorage,mem};
}
test('duas estações distintas completas e três profundidades',()=>{
 const {S,FA}=make();
 assert.equal(S.number,61);assert.equal(FA.number,52);
 assert.equal(S.questions.length,10);assert.equal(FA.questions.length,11);
 for(const st of [S,FA]){
  assert.deepEqual(Array.from(Object.keys(st.tiers)),['essencial','rapida','completa']);
  assert.equal(st.tiers.essencial.ids.length,1);
  assert.equal(st.tiers.rapida.ids.length,4);
  assert.equal(st.tiers.completa.ids.length,st.questions.length);
  assert.ok(st.essential.oneMinute.trim().split(/\s+/).length<=125);
  assert.ok(st.sources.length>=2);
  assert.equal(st.questions.length,new Set(st.questions.map(q=>q.id)).size);
  for(const q of st.questions){
   assert.ok(q.criteria.length>=3,q.id);
   assert.ok(q.answer.length>50,q.id);
   assert.equal(q.hints.length,3,q.id);
  }
 }
 assert.match(FA.images[0].src,/ecg-estacao-52\.jpg$/);
 assert.ok(fs.existsSync(path.join(ROOT,FA.images[0].src)),'ECG original realmente presente');
 assert.ok(fs.existsSync(path.join(ROOT,'assets/osce/ilustracao-sincope-estacao61.png')),'ilustração existente');
});
test('página inicial inclui duas estações, vínculos e triagem',()=>{
 const {P}=make();
 const html=P.page();
 assert.match(html,/Síncope/);assert.match(html,/Fibrilação atrial/);
 assert.match(html,/Sessão de hoje/);assert.match(html,/Triagem e cobertura/);
 assert.match(html,/Gerar script de revisão/);
});
test('ECG real mostrado antes da resposta e resposta oculta até tentativa com confiança',()=>{
 const {P}=make();
 P.start('rapida',null,52);
 const initial=P.page();
 assert.match(initial,/ECG REAL DO MATERIAL ENVIADO/);
 assert.match(initial,/ecg-estacao-52\.jpg/);
 assert.doesNotMatch(initial,/Resposta-modelo Master/);
 P.answer('Não sei');
 P.reveal();
 assert.doesNotMatch(P.page(),/Resposta-modelo Master/);
 P.conf(3);P.reveal();
 assert.match(P.page(),/Resposta-modelo Master/);
 assert.match(P.page(),/Termos marcados e referências/);
 assert.match(P.page(),/Aula completa já existente no Master/);
});
test('registra erros de alta confiança, critério faltante, reteste D+1 e script para IA',()=>{
 const {P,localStorage}=make();
 P.start('essencial',null,52);
 P.answer('Talvez arritmia irregular');P.conf(3);P.reveal();
 P.criterion(0,true);P.finish();
 const s=JSON.parse(localStorage.getItem('master_osce_pilot_v1'));
 const a=s.items['52:ecg'].attempts[0];
 assert.equal(a.score,25);assert.equal(a.confidence,3);
 assert.equal(a.overconfident,true);
 assert.equal(a.criteria.length,1);
 assert.equal(a.depth,'essencial');
 assert.ok(a.durationMs>=0);
 assert.ok(new Date(a.due).getTime()>Date.now());
 assert.equal(s.covered[52].essencial,true);
 P.showPrompt();
 assert.match(P.page(),/Copiar para IA/);
 assert.match(P.page(),/Não cumpriu/);
});
test('estação de síncope identifica imagem como ilustração e permite completar revisão rápida',()=>{
 const {P}=make();
 P.start('rapida',null,61);
 let html=P.page();
 assert.match(html,/ilustracao-sincope-estacao61\.png/);
 assert.match(html,/ILUSTRAÇÃO DIDÁTICA/);
 assert.match(html,/PERGUNTA 1 DE 4/);
 P.answer('Não sei');P.conf(1);P.reveal();P.finish();
 html=P.page();assert.match(html,/PERGUNTA 2 DE 4/);
});
test('aula correlata e referências clínicas estão presentes após a tentativa',()=>{
 const {P}=make();
 P.start('completa',null,52);
 P.answer('não sei');P.conf(1);P.reveal();
 const html=P.page();
 assert.match(html,/Diretriz Brasileira de Fibrilação Atrial/);
 assert.match(html,/CHA₂DS₂-VA/);
 assert.match(html,/Arritmias cardíacas/);
 assert.match(html,/osce-term-inline/);
});
