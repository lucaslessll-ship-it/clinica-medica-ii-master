'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const scripts=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-pilot.js'];
function fixture(initial=[]){
 const memory=new Map(initial),window={addEventListener(){}};
 const localStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,String(v))};
 const ctx=vm.createContext({window,localStorage,Date,console});
 for(const file of scripts)vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),ctx,{filename:file});
 return {P:window.OSCEPilot,bank:[window.OSCE_PILOT_DATA,window.OSCE_FA_DATA,...window.OSCE_EXTRA_STATIONS],index:window.OSCE_PRIORITY_INDEX,memory};
}
test('7 estações POCUS com 70 perguntas completas e diretrizes válidas',()=>{
 const {bank}=fixture(),pocus=bank.filter(s=>s.pocusOrder).sort((a,b)=>a.pocusOrder-b.pocusOrder);
 assert.equal(bank.length,93);
 assert.deepEqual(Array.from(pocus,s=>s.number),[87,88,89,90,91,92,93]);
 assert.equal(pocus.reduce((n,s)=>n+s.questions.length,0),70);
 for(const st of pocus){
  assert.equal(st.priority,'alta');
  assert.equal(st.tiers.essencial.ids.length,1);
  assert.equal(st.tiers.rapida.ids.length,4);
  assert.equal(st.tiers.completa.ids.length,10);
  assert.ok(st.essential.oneMinute.length>150);
  assert.ok(st.deeper.length>=4);
  assert.ok(st.terms.length>=4);
  assert.ok(st.sources.length>=2);
  assert.ok(st.images.length>=1);
  for(const img of st.images){assert.equal(img.kind,'reference');assert.match(img.src,/^https:\/\//);assert.match(img.creditUrl,/^https:\/\/commons\.wikimedia\.org\//)}
  for(const q of st.questions){assert.ok(q.answer.length>70,q.id);assert.ok(q.criteria.length>=3,q.id);assert.equal(q.hints.length,3,q.id)}
 }
});
test('trilha POCUS aparece antes do índice 1–86 sem deslocar números antigos',()=>{
 const {P,index}=fixture(),h=P.page();
 assert.match(h,/POCUS — 7 estações para começar/);
 assert.equal((h.match(/class="osce-pocus-item"/g)||[]).length,7);
 assert.ok(h.indexOf('id="osce-pocus-top"')<h.indexOf('id="osce-priority-overview"'));
 assert.match(h,/Índice das 86 demais estações/);
 assert.match(h,/93/);
 assert.equal(index.sourceIdByDisplayNumber['1'],61);
 P.jumpToIndex(61);
 assert.match(P.page(),/<span>ESTAÇÃO 1<\/span>/);
});
test('P1 abre em simulação primeiro, sem revelar resposta antes de confiança',()=>{
 const {P,memory}=fixture();
 P.daily();let h=P.page();
 assert.match(h,/POCUS 01/);assert.match(h,/PERGUNTA 1 DE/);
 assert.doesNotMatch(h,/Resposta-modelo Master/);
 P.answer('Não sei');P.reveal();
 assert.doesNotMatch(P.page(),/Resposta-modelo Master/);
 P.conf(1);P.reveal();
 h=P.page();
 assert.match(h,/Resposta-modelo Master/);
 assert.match(h,/Para lembrar nesta etapa/);
 P.finish();
 const state=JSON.parse(memory.get('master_osce_pilot_v1'));
 const attempt=state.items['87:interpretacao'].attempts[0];
 assert.equal(attempt.score,0);
 assert.ok(new Date(attempt.due)>new Date(attempt.at));
});
test('revisão por texto libera respostas mas não cria tentativas',()=>{
 const {P,memory}=fixture();
 P.preview(89);
 const h=P.page();
 assert.match(h,/REVISÃO ANTES DO SIMULADO/);
 assert.match(h,/Resposta-modelo do Master/);
 assert.match(h,/PericardialeffusionUS/);
 assert.equal(memory.has('master_osce_pilot_v1'),false);
});
test('imagem legendada de derrame pleural fica oculta antes da resposta',()=>{
 const {P}=fixture();
 P.start('essencial',null,88);
 assert.match(P.page(),/Imagem de referência com a resposta sinalizada/);
 assert.doesNotMatch(P.page(),/<img src="https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/2\/22\/Pleural_effusion_2/);
 P.answer('Não sei');P.conf(1);P.reveal();
 assert.match(P.page(),/<img src="https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/2\/22\/Pleural_effusion_2/);
});
test('histórico de síncope da antiga estação 61 permanece associado ao tema, não ao POCUS',()=>{
 const progress={version:2,settings:{examDate:'2026-11-24',minutes:15},items:{'61:sindrome':{draft:'',attempts:[{at:'2026-11-18T12:00:00.000Z',score:40,due:'2026-11-23T12:00:00.000Z',confidence:1,criteria:[],hintsUsed:0,answer:'não sei'}]}}},runs:[],current:null,covered:{}};
 const {P,memory}=fixture([['master_osce_pilot_v1',JSON.stringify(progress)]]);
 P.preview(87);
 assert.match(P.page(),/POCUS pulmonar/);
 P.home();P.jumpToIndex(61);
 assert.match(P.page(),/<span>ESTAÇÃO 1<\/span>/);
 const stored=JSON.parse(memory.get('master_osce_pilot_v1'));
 assert.equal(stored.items['61:sindrome'].attempts[0].score,40);
 assert.ok(!stored.items['87:interpretacao']?.attempts?.length);
});
test('scripts são carregados antes do motor da página',()=>{
 const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 assert.ok(html.indexOf('osce-pocus.js')<html.indexOf('osce-pilot.js'));
 assert.match(html,/osce-pocus\.js\?v=20261121-pocus7-v1/);
});
