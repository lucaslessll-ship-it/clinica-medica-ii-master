'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const scripts=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-pilot.js'];
const KEY='master_osce_pilot_v1';
function fixture(storage=new Map()){
 const window={addEventListener(){}};
 const localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v))};
 const ctx=vm.createContext({window,localStorage,Date,console});
 for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx,{filename:f});
 return {P:window.OSCEPilot,storage,progress:()=>JSON.parse(storage.get(KEY))};
}
const finishOne=(P,text='não sei',confidence=1,checked=[])=>{P.answer(text);P.conf(confidence);P.reveal();for(const n of checked)P.criterion(n,true);P.finish()};
test('abertura de índice não gera centenas de tentativas vazias no armazenamento',()=>{
 const {P,storage}=fixture();
 assert.match(P.page(),/93/);
 P.setMinutes(15);
 assert.equal(Object.keys(JSON.parse(storage.get(KEY)).items).length,0);
});
test('sessão de hoje monta fila de oito questões distintas e informa meta sem prometer 15 minutos exatos',()=>{
 const {P,progress}=fixture();
 P.daily();const c=progress().current;
 assert.equal(c.mode,'daily');assert.equal(c.queue.length,8);
 assert.equal(c.targetMinutes,15);
 assert.equal(new Set(c.queue.map(x=>x.station+':'+x.id)).size,8);
 assert.match(P.page(),/Sessão mista/);
 assert.match(P.page(),/meta 15 min/);
});
test('5 minutos oferece até três questões e é diferente da sessão de 15 minutos',()=>{
 const {P,progress}=fixture();P.setMinutes(5);P.daily();
 assert.equal(progress().current.queue.length,3);
 assert.equal(progress().current.targetMinutes,5);
 assert.match(P.page(),/meta 5 min/);
});
test('confiança, dica, checklist e resposta revelada persistem após recarregar e retomar',()=>{
 const storage=new Map(),{P,progress}=fixture(storage);
 P.start('essencial',null,87);
 P.answer('Minha hipótese é congestão, mas linhas B também aparecem em outras doenças');
 P.conf(2);P.hint();P.reveal();P.criterion(0,true);
 const c=progress().current;
 assert.equal(c.view.shown,true);assert.equal(c.view.confidence,2);
 assert.equal(c.view.hints,1);assert.equal(c.view.checked[0],0);
 const restored=fixture(storage).P;restored.resume();
 const html=restored.page();
 assert.match(html,/Resposta-modelo Master/);
 assert.match(html,/id="osce-criteria-count">1\/3/);
 assert.match(html,/Registrar resultado e avançar/);
});
test('não sei nunca recebe nota positiva por checklist marcado acidentalmente',()=>{
 const {P,progress}=fixture();
 P.start('essencial',null,87);
 finishOne(P,'não sei',3,[0,1,2]);
 const a=progress().items['87:interpretacao'].attempts[0];
 assert.equal(a.score,0);assert.equal(a.criteria.length,0);
 assert.equal(a.blankAnswer,true);assert.equal(a.overconfident,true);
 assert.equal(a.scoring,'manual-checklist-v2');
});
test('resposta desenvolvida conserva correção por checklist manual, com fonte transparente',()=>{
 const {P,progress}=fixture();
 P.start('essencial',null,87);
 finishOne(P,'Observo artefatos verticais, inespecíficos sem contexto clínico',2,[0,1]);
 const a=progress().items['87:interpretacao'].attempts[0];
 assert.equal(a.score,67);assert.equal(a.criteria.length,2);
 assert.equal(a.blankAnswer,false);
});
test('ao concluir sessão mista, o texto final não diz que todas as perguntas eram de uma estação',()=>{
 const {P,progress}=fixture();P.daily();
 for(let i=0;i<8;i++)finishOne(P,'não sei',1);
 assert.equal(progress().current,null);
 assert.equal(progress().runs.at(-1).results.length,8);
 assert.equal(progress().runs.at(-1).mode,'daily');
 assert.match(P.page(),/diferentes estações na sessão mista/);
 const covered=progress().covered;
 assert.ok(Object.values(covered).every(x=>!x.completa),'sessão mista não deve fingir conclusão integral');
});
test('caminho de estação completa preserva marcação de cobertura',()=>{
 const {P,progress}=fixture();P.start('essencial',null,87);finishOne(P);
 assert.equal(progress().covered['87'].essencial,true);
});
test('retomada após salvar e sair mantém a pergunta e confiança anteriores',()=>{
 const {P,progress}=fixture();P.start('rapida',null,87);
 P.answer('Hipótese de linhas B, checar distribuição');P.conf(3);P.home();P.resume();
 assert.match(P.page(),/Hipótese de linhas B/);
 assert.match(P.page(),/aria-pressed="true" onclick="OSCEPilot.conf\(3\)"/);
 assert.equal(progress().current.pos,0);
});
