'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.join(__dirname,'..','MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const script=fs.readFileSync(path.join(ROOT,'super-foco.js'),'utf8');
function setup(){
 const storage=new Map(),events={},user={id:'student-a'},routes=[],notes=[];
 const window={
  MASTER_AUTH:{user:()=>user},addEventListener:(ev,fn)=>{events[ev]=fn;},
  MASTER_DATA:{topics:[{id:'neuro1',title:'Neurologia',priority:'Alta',chapters:[{name:'Síncope',patho:'Alteração transitória da perfusão cerebral.',why:'Identificar perda de consciência.',clinic:'Pródromos e recuperação rápida.',tests:'ECG e ortostatismo.',strategy:'Avaliar sinais de risco.',exception:'Excluir arritmias.'}]}]},
  P1:{topics:[{id:'p1inf',title:'Infectologia',chapters:[{name:'Sepse',mechanism:'Disfunção orgânica por infecção.',clinical:'Alteração de perfusão.',diagnostics:'Lactato e culturas.',treatment:'ATB e controle de foco.',pitfall:'Não atrasar tratamento.'}]}]},
  CIR:{topics:[{id:'ciraa',title:'Abdome agudo',chapters:[{name:'Peritonite',hy:'Identificar rigidez e sinais de gravidade.'}]}]},
  Emergency:{all:[{id:'pcr',title:'PCR',summary:'Emergência',case:{stem:'Paciente inconsciente.',ask:'Qual a primeira conduta?',answer:['Avaliar segurança.','Iniciar RCP.']},quiz:[{q:'Qual ritmo é chocável?',o:['FV','Assistolia'],a:0,why:'FV é chocável.'}]}]},
  OSCEPilot:{bank:()=>[{number:61,title:'Síncope versus epilepsia',priority:'alta',caseText:'Paciente colapsou.',questions:[{id:'q1',prompt:'Diferencie síncope de epilepsia.',answer:'História e pós-evento.',criteria:['Pródromos','Recuperação'],memory:'Síncope breve'}]},{number:87,pocusOrder:1,title:'POCUS pulmonar',priority:'alta',caseText:'Dispneia.',questions:[{id:'q1',prompt:'O que representam linhas B?',answer:'Artefatos verticais originados na pleura.',criteria:['Origem pleural']}]}]}
 };
 const context={window,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},navigate:r=>routes.push(r),render:()=>{},toast:s=>notes.push(s),Date,document:{getElementById:()=>null,querySelectorAll:()=>[]}};
 vm.runInNewContext(script,context);
 return {f:window.SuperFoco,storage,user,routes,notes};
}
test('Super Foco covers OSCE, POCUS, P1, P2, Cirurgia, Urgência e Emergência',()=>{
 const {f}=setup(),courses=new Set(f.catalog().map(x=>x.course));
 assert.deepEqual([...courses].sort(),['cir','osce','p1','p2','pocus','ue']);
 assert.ok(f.catalog().some(x=>x.id==='osce:61:q1'));
});
test('Super Foco shows question before feedback and remains independent of OSCE scores',()=>{
 const {f,storage,routes}=setup();
 f.open('osce','61');
 assert.equal(routes.at(-1),'superfoco');
 assert.match(f.page(),/Diferencie síncope de epilepsia/);
 assert.doesNotMatch(f.page(),/História e pós-evento/);
 f.input('Teria pródromos e recuperaria rápido');
 f.conf(2);f.reveal();
 assert.match(f.page(),/História e pós-evento/);
 f.score(2);
 const k=[...storage.keys()].find(x=>x.startsWith('master_super_foco_v1:'));
 const saved=JSON.parse(storage.get(k));
 assert.equal(saved.records['osce:61:q1'].score,75);
 assert.ok(saved.records['osce:61:q1'].due);
 assert.equal([...storage.keys()].some(x=>x==='master_osce_pilot_v1'),false);
});
test('Super Foco persists per signed-in user and does not expose previous user progress',()=>{
 const {f,storage,user}=setup();
 f.open('p2','neuro1');f.input('Hipoperfusão transitória');f.conf(1);f.reveal();f.score(3);
 user.id='student-b';
 f.resetUser();
 const html=f.page();
 assert.match(html,/0<\/strong> desafios revisados/);
 assert.ok(storage.has('master_super_foco_v1:student-a'));
 assert.equal(storage.has('master_super_foco_v1:student-b'),false);
});
test('POCUS band in OSCE uses native details and only opens after user interaction',()=>{
 const css=fs.readFileSync(path.join(ROOT,'osce.css'),'utf8');
 const js=fs.readFileSync(path.join(ROOT,'osce-pilot.js'),'utf8');
 assert.match(js,/details class="osce-pocus-section osce-pocus-disclosure"/);
 assert.match(js,/SuperFoco\.open/);
 assert.match(css,/\.osce-pocus-disclosure/);
});
test('Home notice identifies all three study modes',()=>{
 const content=fs.readFileSync(path.join(ROOT,'editorial.js'),'utf8');
 assert.match(content,/Revisão \(aprenda/);
 assert.match(content,/Simulação \(treine/);
 assert.match(content,/Super Foco \(recuperação/);
});
