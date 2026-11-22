'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const names=['osce-priority-index.js','osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pilot.js'];
function setup(){
 const memory=new Map(),window={addEventListener:()=>{}};
 const localStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,String(v))};
 const sandbox=vm.createContext({window,localStorage,Date,console});
 for(const file of names)vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),sandbox,{filename:file});
 return {P:window.OSCEPilot,index:window.OSCE_PRIORITY_INDEX,window,memory,bank:[window.OSCE_PILOT_DATA,window.OSCE_FA_DATA,...window.OSCE_EXTRA_STATIONS]};
}
test('índice mantém 86 IDs e retira 19 onco-hematológicas do plano ativo',()=>{
 const {index,bank,P}=setup(),groups=index.groups,items=groups.flatMap(g=>g.numbers);
 assert.equal(Object.keys(index.names).length,86);
 assert.deepEqual(Array.from(groups,g=>g.numbers.length),[22,35,10,19]);
 assert.deepEqual(JSON.parse(JSON.stringify(index.originalDistribution)),{alta:22,media:29,baixa:10,excluida:13});
 assert.equal(new Set(items).size,86);
 assert.deepEqual([...items].sort((a,b)=>a-b),Array.from({length:86},(_,i)=>i+1));
 assert.equal(bank.length,86);
 assert.deepEqual([...new Set(bank.map(st=>st.number))].sort((a,b)=>a-b),Array.from({length:86},(_,i)=>i+1));
 for(const st of P.bank()){
  assert.ok(index.names[st.number],st.number+' needs a title');
  assert.equal(groups.find(g=>g.numbers.includes(st.number)).key,st.priority,'priority mismatch for '+st.number);
 }
});
test('lista simplificada aparece antes dos cards, com legenda e status clicável',()=>{
 const {P}=setup(),html=P.page();
 assert.match(html,/Índice das 86 estações/);
 assert.match(html,/Alta · vermelho/);
 assert.match(html,/Média · amarelo/);
 assert.match(html,/Baixa · verde/);
 assert.ok(html.indexOf('id="osce-priority-overview"')<html.indexOf('<h2>Estações disponíveis</h2>'),'overview should precede cards');
 assert.equal((html.match(/class="osce-index-entry osce-index-ready"/g)||[]).length,86);
 assert.match(html,/OSCEPilot.jumpToIndex\(61\)/);
 assert.match(html,/osce-index-alta/);
 assert.match(html,/osce-index-media/);
 assert.match(html,/osce-index-baixa/);
});
test('clicar no índice destaca catálogo sem sobrescrever tentativas',()=>{
 const {P,memory}=setup();
 P.start('essencial',null,52);P.answer('não sei');P.conf(1);P.reveal();P.finish();
 const before=memory.get('master_osce_pilot_v1');
 P.home();P.jumpToIndex(61);
 const html=P.page();
 assert.match(html,/id="osce-station-61"/);
 assert.doesNotMatch(html,/id="osce-station-52"/,"should show only selected station");
 assert.equal(memory.get('master_osce_pilot_v1'),before,'index must never change recorded progress');
});
test('novos arquivos carregam na ordem correta no HTML',()=>{
 const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 assert.ok(html.indexOf('osce-priority-index.js')<html.indexOf('osce-pilot.js'));
 assert.ok(html.includes('osce.css'));
});
