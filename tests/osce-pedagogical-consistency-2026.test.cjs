'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const scripts=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-pilot.js'];
const load=()=>{
 const window={addEventListener(){}},store=new Map(),localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,String(v))};
 const context=vm.createContext({window,localStorage,Date,console});
 for(const name of scripts)vm.runInContext(fs.readFileSync(path.join(ROOT,name),'utf8'),context,{filename:name});
 return {P:window.OSCEPilot,store,bank:[window.OSCE_PILOT_DATA,window.OSCE_FA_DATA,...window.OSCE_EXTRA_STATIONS]};
};
test('auditoria estrutural das 93 estações e 858 perguntas após correção do gerador',()=>{
 const {bank}=load();
 assert.equal(bank.length,93);assert.equal(bank.reduce((n,s)=>n+s.questions.length,0),858);
 for(const st of bank){
  assert.ok(st.title&&st.caseText);
  const ids=new Set();
  for(const q of st.questions){
   assert.ok(q.id&&q.prompt&&q.answer,'item incompleto '+st.number);
   assert.ok(!ids.has(q.id),'ID repetido '+st.number+':'+q.id);ids.add(q.id);
   assert.ok(q.criteria.length>0,'critérios ausentes '+st.number+':'+q.id);
   assert.ok(q.hints.length===3,'dicas incompletas '+st.number+':'+q.id);
  }
 }
});
test('gerador não chama a doença de diagnóstico sindrômico sem apresentar síndrome',()=>{
 const {bank}=load();
 const created=bank.filter(st=>st.provenance?.includes('nove perguntas'));
 assert.ok(created.length>=70);
 for(const st of created){
  const first=st.questions[0];
  assert.equal(first.id,'sindrome');
  if(first.competence==='Diagnóstico sindrômico e etiológico'){
   assert.match(first.answer,/SINDRÔMICO:/);
   assert.match(first.answer,/ETIOLÓGICA:/);
  }else{
   assert.equal(first.competence,'Hipótese diagnóstica');
   assert.doesNotMatch(first.prompt,/Qual síndrome e hipótese/);
  }
  assert.equal(new Set(st.questions.map(q=>q.memory)).size,st.questions.length,'dicas iguais em '+st.number);
  assert.equal(new Set(st.questions.map(q=>q.hints.join('|'))).size,st.questions.length,'pistas iguais em '+st.number);
 }
});
test('doença celíaca separa síndrome de má absorção e doença etiológica, com checklist adequado',()=>{
 const {bank,P}=load(),st=bank.find(s=>s.number===12),q=st.questions[0];
 assert.match(q.prompt,/síndrome clínica/);
 assert.match(q.answer,/síndrome disabsortiva intestinal/);
 assert.match(q.answer,/Hipótese ETIOLÓGICA: Doença celíaca/);
 assert.ok(q.criteria.some(s=>s.includes('síndrome clínica')));
 assert.ok(q.criteria.some(s=>s.includes('hipótese etiológica')));
 P.preview(12);assert.match(P.page(),/síndrome disabsortiva intestinal/);
});
test('pré-estudo mostra uma etapa por vez, com visão geral opcional e um aprofundamento total',()=>{
 const {P}=load();P.preview(64);const html=P.page();
 assert.equal((html.match(/class="osce-guided-card"/g)||[]).length,1);
 assert.equal((html.match(/class="osce-reading-tip"/g)||[]).length,0);
 assert.equal((html.match(/Aprofundamento completo do tema/g)||[]).length,1);
 assert.match(html,/Passo a passo/);
 assert.match(html,/Ver todas/);
 assert.doesNotMatch(html,/Dicas para memorizar e raciocinar/);
 P.previewLayoutSet('all');
 const all=P.page();
 assert.equal((all.match(/class="osce-reading-card"/g)||[]).length,0);
 assert.equal((all.match(/osce-reading-card/g)||[]).length,9);
 assert.equal((all.match(/Aprofundamento completo do tema/g)||[]).length,1);
});
test('simulação mostra resposta única, dica específica e mantém correção manual e tentativas',()=>{
 const {P,store}=load();P.start('completa',null,64);P.answer('não sei');P.conf(1);P.reveal();
 const html=P.page();
 assert.match(html,/Resposta-modelo Master/);
 assert.equal((html.match(/Explicação da questão/g)||[]).length,0);
 assert.equal((html.match(/class="osce-step-tip"/g)||[]).length,1);
 assert.doesNotMatch(html,/Palácio da memória e armadilhas/);
 P.finish();const state=JSON.parse(store.get('master_osce_pilot_v1'));
 assert.equal(state.items['64:sindrome'].attempts[0].score,0);
});
test('POCUS: referências no próprio módulo recolhidas e painel global proibido no OSCE',()=>{
 const cross=fs.readFileSync(path.join(ROOT,'correlacoes.js'),'utf8');
 const course=fs.readFileSync(path.join(ROOT,'pocus-course.js'),'utf8');
 assert.match(cross,/course==='pocus'/);
 assert.match(cross,/'osce','pocus'/);
 assert.match(course,/<details class="pocus-sec pocus-refs pocus-refs-collapsible">/);
 assert.match(course,/Referências e diretrizes deste módulo de POCUS/);
 assert.doesNotMatch(course,/<section class="pocus-sec pocus-refs">/);
 const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 for(const n of ['osce-catalog-builder.js','osce-high-clinical.js','osce-pilot.js','osce.css','correlacoes.js','pocus-course.js','pocus.css'])assert.ok(html.includes(n+'?v=20261122-osce-fix-r1'),n);
});
