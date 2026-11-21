'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const all=[
'osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js',
'osce-extra-04.js','osce-extra-20.js','osce-extra-46.js',
'osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js',
'osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pilot.js'
];
function fresh(){
 const mem=new Map(),win={addEventListener(){}};
 const localStorage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,String(v))};
 const ctx=vm.createContext({window:win,localStorage,Date,console,encodeURIComponent});
 for(const name of all)vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),ctx,{filename:name});
 return {P:win.OSCEPilot,S:[win.OSCE_PILOT_DATA,win.OSCE_FA_DATA,...win.OSCE_EXTRA_STATIONS],mem};
}
test('74 estações principais e doze complementares sem duplicação nem alteração das originais',()=>{
 const {S}=fresh();
 assert.equal(S.length,86);
 assert.equal(new Set(S.map(s=>s.number)).size,86);
 assert.deepEqual(S.filter(s=>s.number<=74).map(s=>s.number).sort((a,b)=>a-b),Array.from({length:74},(_,i)=>i+1));
 assert.deepEqual(S.filter(s=>s.number>74).map(s=>s.number).sort((a,b)=>a-b),Array.from({length:12},(_,i)=>i+75));
 const levels=S.filter(s=>s.number<=74).reduce((a,s)=>(a[s.priority]=(a[s.priority]||0)+1,a),{});
 assert.deepEqual(levels,{alta:33,media:29,baixa:12});
 assert.equal(S.reduce((n,s)=>n+s.questions.length,0),788);
});
test('cada caso disponibiliza modelos, critérios, dicas e três profundidades',()=>{
 const {S}=fresh();
 for(const s of S){
  assert.ok(s.title&&s.caseText&&s.essential?.oneMinute,s.number);
  assert.ok(s.essential.oneMinute.trim().split(/\s+/).length<=125,s.number);
  assert.equal(s.tiers.essencial.ids.length,1,s.number);
  assert.equal(s.tiers.rapida.ids.length,4,s.number);
  assert.equal(s.tiers.completa.ids.length,s.questions.length,s.number);
  assert.equal(new Set(s.questions.map(x=>x.id)).size,s.questions.length,s.number);
  assert.ok(s.sources?.length>=2,s.number);
  for(const q of s.questions){
   assert.ok(q.answer&&q.answer.length>40,s.number+':'+q.id);
   assert.ok(q.criteria.length>=3,s.number+':'+q.id);
   assert.equal(q.hints.length,3,s.number+':'+q.id);
  }
 }
});
test('conteúdo de terceiros não é republicado e imagens esquemáticas estão rotuladas',()=>{
 const {S}=fresh();for(const s of S.filter(x=>x.status==='revisao-autoral')){
  assert.match(s.provenance,/Não reproduz enunciados nem imagens originais de terceiros/);
  assert.equal(s.questions.length,9);
  assert.equal(s.images.length,1);
  assert.equal(s.images[0].kind,'illustration');
  assert.match(s.images[0].caption,/NÃO é foto, ECG ou imagem diagnóstica/);
  assert.match(s.images[0].src,/^data:image\/svg\+xml/);
 }
});
test('catálogo pesquisável prioriza altas e possui páginas de 12',()=>{
 const {P}=fresh(),base=P.page();
 assert.match(base,/74/);
 assert.match(base,/Buscar estação/);
 assert.match(base,/Mostrar mais estações/);
 assert.match(base,/Síndrome de Guillain-Barré/);
 P.home();P.setCatalogPriority('baixa');assert.match(P.page(),/Carcinoma anaplásico de tireoide/);
 P.setCatalogPriority('complementar');assert.match(P.page(),/Pneumonia adquirida na comunidade/);
 P.filterCatalog('86');assert.match(P.page(),/Pericardite aguda/);
});
test('pré-estudo não altera notas; simulação revela o modelo apenas depois da tentativa',()=>{
 const {P,mem}=fresh();
 P.preview(73);
 assert.match(P.page(),/Resposta-modelo do Master/);
 assert.doesNotMatch(P.page(),/Registrar resultado e avançar/);
 assert.equal(mem.has('master_osce_pilot_v1'),false);
 P.start('rapida',null,79);
 assert.doesNotMatch(P.page(),/Resposta-modelo Master/);
 P.answer('não sei');P.reveal();
 assert.doesNotMatch(P.page(),/Resposta-modelo Master/);
 P.conf(1);P.reveal();
 assert.match(P.page(),/Resposta-modelo Master/);
 P.finish();
 const state=JSON.parse(mem.get('master_osce_pilot_v1'));
 assert.equal(state.items['79:sindrome'].attempts[0].score,0);
 assert.ok(state.items['79:sindrome'].attempts[0].due);
});
