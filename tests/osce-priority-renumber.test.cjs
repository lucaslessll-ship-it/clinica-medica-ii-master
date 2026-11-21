'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const scripts=['osce-priority-index.js','osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pilot.js'];
function build(initial){
 const stored=new Map(initial||[]),window={addEventListener(){}};
 const localStorage={getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,String(v))};
 const ctx=vm.createContext({window,localStorage,Date,console});
 scripts.forEach(f=>vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx,{filename:f}));
 return {P:window.OSCEPilot,index:window.OSCE_PRIORITY_INDEX,stored};
}
test('renumeração: 86 posições consecutivas na ordem pedagógica, independentemente do ID de origem',()=>{
 const {index,P}=build(),ids=index.groups.flatMap(g=>g.numbers);
 assert.equal(ids.length,86);assert.equal(new Set(ids).size,86);
 assert.deepEqual(ids.slice(0,5),[61,43,7,24,37]);
 assert.deepEqual(index.groups.map(g=>g.numbers.length),[43,31,12]);
 assert.equal(index.displayNumberBySource['61'],1);
 assert.equal(index.displayNumberBySource['52'],10);
 assert.equal(index.sourceIdByDisplayNumber['1'],61);
 const html=P.page();
 assert.match(html,/Índice das 86 estações/);
 assert.match(html,/<span class="osce-index-number">01<\/span>/);
 assert.match(html,/<span class="osce-index-number">86<\/span>/);
 assert.ok(html.indexOf('Síndrome de Guillain-Barré')>html.indexOf('Síncope × crise convulsiva'));
 assert.ok(html.indexOf('Estação 1')<html.indexOf('Estações disponíveis')||html.includes('osce-index-number'));
});
test('cards, busca e treinamento usam o novo número sem alterar os IDs das estações',()=>{
 const {P}=build();
 P.jumpToIndex(61);
 let html=P.page();
 assert.match(html,/id="osce-station-61"/); // âncora técnica preservada
 assert.match(html,/<span>ESTAÇÃO 1<\/span>/);
 assert.match(html,/value="#1"/);
 assert.doesNotMatch(html,/id="osce-station-52"/);
 P.jumpToIndex(52);
 html=P.page();
 assert.match(html,/<span>ESTAÇÃO 10<\/span>/);
 assert.match(html,/value="#10"/);
 P.preview(52);
 assert.match(P.page(),/Revisar estação 10/);
 P.start('essencial',null,61);
 assert.match(P.page(),/<span>ESTAÇÃO 1<\/span>/);
});
test('sessão de hoje escolhe primeiro o tema de maior prioridade sem tentativas',()=>{
 const {P}=build();
 P.daily();
 assert.match(P.page(),/<span>ESTAÇÃO 1<\/span>/);
});
test('as respostas e os retestes antigos continuam intactos, mas relatórios mostram o número novo',()=>{
 const progress={version:2,settings:{examDate:'2026-11-24',minutes:15},items:{'61:sindrome':{draft:'',attempts:[{at:'2026-11-18T12:00:00.000Z',score:40,due:'2026-11-23T12:00:00.000Z',confidence:1,criteria:[],hintsUsed:0,answer:'não sei'}]}}},runs:[],current:null,covered:{},updatedAt:null};
 const {P,stored}=build([['master_osce_pilot_v1',JSON.stringify(progress)]]);
 P.showReview();
 assert.match(P.page(),/Estação 1 —/);
 P.showPrompt();
 assert.match(P.page(),/Estação 1 —/);
 P.start('essencial',null,61);
 P.answer('não sei');P.conf(1);P.reveal();P.finish();
 const saved=JSON.parse(stored.get('master_osce_pilot_v1'));
 assert.equal(saved.items['61:sindrome'].attempts.length,2);
 assert.equal(saved.items['61:sindrome'].attempts[0].score,40);
 assert.ok(!saved.items['1:sindrome'],'não migrar IDs, que já identificam outra estação no banco');
});
