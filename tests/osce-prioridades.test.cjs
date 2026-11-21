'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const files=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-pilot.js'];
function make(){
 const mem=new Map(),win={addEventListener(){}};
 const localStorage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,String(v))};
 const ctx=vm.createContext({window:win,localStorage,Date,console});
 for(const f of files)vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx,{filename:f});
 return {win,P:win.OSCEPilot,stations:[win.OSCE_PILOT_DATA,win.OSCE_FA_DATA,...win.OSCE_EXTRA_STATIONS],mem};
}
test('cinco novas estações prioritárias mantêm o padrão completo e os casos da fase 1',()=>{
 const {stations}=make();const numbers=stations.map(s=>s.number).sort((a,b)=>a-b);
 assert.deepEqual(numbers,[4,7,20,24,46,52,61]);
 assert.equal(stations.reduce((a,s)=>a+s.questions.length,0),77);
 for(const s of stations){
  assert.equal(s.priority,'alta');
  assert.equal(s.tiers.essencial.ids.length,1);
  assert.equal(s.tiers.rapida.ids.length,4);
  assert.equal(s.tiers.completa.ids.length,s.questions.length);
  assert.equal(new Set(s.questions.map(q=>q.id)).size,s.questions.length);
  assert.ok(s.sources?.length>=2,s.title);
  for(const q of s.questions){
   assert.ok(q.answer?.length>60,q.id);assert.ok(q.criteria.length>=3,q.id);
   assert.equal(q.hints.length,3,q.id);
   assert.ok(s.tiers.completa.ids.includes(q.id),q.id);
  }
 }
});
test('imagens de referência têm fonte verificável e não se declaram originais do caso',()=>{
 const {stations}=make();
 for(const n of [4,20,46]){
  const s=stations.find(x=>x.number===n);
  assert.ok(s.images.length>0,String(n));
  for(const img of s.images){
   assert.equal(img.kind,'reference');
   assert.match(img.src,/^https:\/\/upload\.wikimedia\.org\//);
   assert.match(img.creditUrl,/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
  }
 }
});
test('pré-estudo libera respostas de cada pergunta sem gerar nota ou tentativas',()=>{
 const {P,mem}=make();
 const initial=P.page();
 assert.match(initial,/Revisar respostas antes/);
 P.preview(7);
 const html=P.page();
 assert.match(html,/REVISÃO ANTES DO SIMULADO/);
 assert.match(html,/Resposta-modelo do Master/);
 assert.match(html,/tratamento específico/i);
 assert.doesNotMatch(html,/Registrar resultado e avançar/);
 assert.ok(mem.get('master_osce_pilot_v1')===undefined,'pré-estudo não salva notas');
 P.previewTierSet('essencial');
 assert.match(P.page(),/Essencial/);
});
test('simulação preserva gabarito oculto até tentativa e registra reteste normal',()=>{
 const {P,mem}=make();
 P.start('rapida',null,20);let html=P.page();
 assert.match(html,/TV polimórfica|Torsades/);
 assert.match(html,/Após a tentativa/);
 assert.doesNotMatch(html,/Resposta-modelo Master/);
 P.answer('não sei');P.reveal();
 assert.doesNotMatch(P.page(),/Resposta-modelo Master/);
 P.conf(1);P.reveal();
 html=P.page();
 assert.match(html,/Resposta-modelo Master/);
 assert.match(html,/Aprofundamento|Explicação da questão/);
 P.finish();
 const progress=JSON.parse(mem.get('master_osce_pilot_v1'));
 const item=progress.items['20:diag'].attempts[0];
 assert.equal(item.score,0);assert.equal(item.confidence,1);
 assert.ok(new Date(item.due)>new Date(item.at));
});
test('os temas novos vinculam aulas internas confirmadas e referências atuais',()=>{
 const {stations,P}=make();
 const expected={4:'reuma2',7:'neuro2',20:'p1arr',24:'neuro3',46:'p1arr'};
 for(const [n,id] of Object.entries(expected)){
  const s=stations.find(x=>x.number===Number(n));assert.equal(s.lesson.id,id);
  assert.ok(s.deeper.length>=4,s.title);assert.ok(s.terms.length>=4,s.title);
  P.preview(Number(n));assert.match(P.page(),/Aula completa/);assert.match(P.page(),/Referências/);
 }
});
