'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const code=fs.readFileSync(path.join(root,'super-foco.js'),'utf8');
function fixture(memory=new Map(),user={id:'student-a'}){
 const messages=[],routes=[],win={
  MASTER_AUTH:{user:()=>user},addEventListener(){},
  OSCEPilot:{bank:()=>[{number:61,title:'Síncope versus crise epiléptica',priority:'alta',caseText:'Paciente com perda da consciência.',questions:Array.from({length:12},(_,i)=>({
   id:'q'+i,prompt:'Pergunta '+(i+1)+': diferencie síncope da crise epiléptica.',answer:'Resposta-modelo da pergunta '+(i+1)+': avaliar início, duração e recuperação.',
   criteria:['Pródromos','Características motoras','Confusão pós-ictal'],memory:'Antes / Durante / Depois'
  }))}],weakItems:()=>[]},
  MASTER_DATA:{topics:[{id:'neuro1',title:'Neurologia',priority:'Alta',chapters:[{name:'Síncope',patho:'Hipoperfusão cerebral global transitória.',why:'Reconhecer sinais de risco.',clinic:'Pródromos e recuperação.',tests:'ECG.',strategy:'Investigar causas cardíacas.',exception:'Arritmias.'}]},{id:'hema',title:'Hematologia',priority:'Alta',chapters:[{name:'Anemia',patho:'Hemoglobina reduzida.',clinic:'Palidez e fadiga.',strategy:'Buscar causa e gravidade.'}]}]},
  P1:{topics:[{id:'inf',title:'Infectologia',chapters:[{name:'Sepse',mechanism:'Disfunção orgânica.',clinical:'Hipoperfusão.',diagnostics:'Lactato.',treatment:'Antimicrobiano.'}]}]},
  CIR:{topics:[{id:'ciraa',title:'Abdome agudo',chapters:[{name:'Peritonite',hy:'Sinais de irritação peritoneal e instabilidade.'}]}]},
  LessonDeep:{get:(topic,index)=>topic==='ciraa'&&index===0?{
   recall:[{q:'Por que o abdome em tábua preocupa?',a:'Pode indicar irritação peritoneal relevante e necessidade de investigação urgente.'}],
   reasoning:['Integrar estabilidade e peritonismo.'],sections:[{h:'Exame abdominal',p:['Avaliar irritação peritoneal.']}],
   pitfalls:['Não atrasar avaliação da gravidade.'],mnemonics:[{t:'Pense em estabilidade antes do exame.'}],practice:['Definir conduta conforme estabilidade.']
  }:null},
  Emergency:{all:[{id:'pcr',title:'PCR',case:{stem:'Adulto inconsciente.',ask:'Qual a primeira abordagem?',answer:['Reconhecer PCR.','Iniciar RCP.']},quiz:[{q:'FV é chocável?',o:['Sim','Não'],a:0,why:'Ritmo chocável.'}],flow:[['FV sem pulso','Desfibrilar e reiniciar RCP.']]}]}
 };
 const local={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,String(v))};
 const document={getElementById:()=>null,querySelectorAll:()=>[]};
 const context=vm.createContext({window:win,localStorage:local,document,Date,console,render:()=>{},navigate:r=>routes.push(r),toast:m=>messages.push(m)});
 vm.runInContext(code,context,{filename:'super-foco.js'});
 return {f:win.SuperFoco,memory,user,routes,messages};
}
test('sessão curta contém mapa numerado e alternância sem perder rascunhos',()=>{
 const {f,memory}=fixture();
 f.open('osce','61');
 let html=f.page();
 assert.match(html,/Pergunta 1 de 5/);
 assert.match(html,/Ir à pergunta 5/);
 assert.doesNotMatch(html,/Resposta-modelo da pergunta 1/);
 f.input('Pródromos e recuperação rápida');
 f.goTo(2);
 assert.match(f.page(),/Pergunta 3 de 5/);
 f.previous();
 assert.match(f.page(),/Pergunta 2 de 5/);
 f.goTo(0);
 assert.match(f.page(),/Pródromos e recuperação rápida/);
 const saved=JSON.parse(memory.get('master_super_foco_v1:student-a'));
 assert.equal(saved.session.ids.length,5);
 assert.equal(saved.session.cursor,0);
 assert.equal(saved.session.notes['osce:61:q0'].draft,'Pródromos e recuperação rápida');
});
test('cinco técnicas: recuperar, conferir, espelho cego, conectar e agenda',()=>{
 const {f,memory}=fixture();f.open('osce','61');
 assert.match(f.page(),/Arranco da Gaveta/);
 assert.match(f.page(),/Respiro da Névoa/);
 assert.match(f.page(),/Embaralhamento de Cartas/);
 assert.match(f.page(),/Espelho Cego/);
 assert.match(f.page(),/Velcro de Conceitos/);
 f.input('Pode ter pródromos e recuperação rápida');f.conf(2);f.reveal();
 assert.match(f.page(),/Resposta-modelo da pergunta 1/);
 assert.match(f.page(),/Checklist do que não pode faltar/);
 f.mirror();
 assert.match(f.page(),/Explique sem enxergar a resposta/);
 assert.doesNotMatch(f.page(),/Resposta-modelo da pergunta 1/);
 f.mirrorInput('Recuperação rápida sem confusão longa');
 f.connect();assert.match(f.page(),/Ligue este conhecimento/);
 f.connectionInput('Diferencio pela recuperação e história');
 f.score(2);
 const saved=JSON.parse(memory.get('master_super_foco_v1:student-a'));
 assert.equal(saved.records['osce:61:q0'].score,75);
 assert.ok(new Date(saved.records['osce:61:q0'].due)>new Date());
 assert.equal(saved.records['osce:61:q0'].history[0].connection,'Diferencio pela recuperação e história');
 assert.match(f.page(),/Pergunta 2 de 5/);
 assert.equal(memory.has('master_osce_pilot_v1'),false);
});
test('microinício com uma pergunta, interleaving opcional e progresso isolado',()=>{
 const {f,memory}=fixture();f.setLength(1);f.open('osce','61');
 assert.match(f.page(),/Pergunta 1 de 1/);
 f.back();f.setLength(10);f.setMixed(true);f.open('p2','neuro1');
 const saved=JSON.parse(memory.get('master_super_foco_v1:student-a'));
 const topics=new Set(saved.session.items.map(x=>x.topic));
 assert.ok(topics.has('neuro1'));
 assert.ok(topics.has('hema'));
 assert.equal(saved.session.mixed,true);
});
test('aproveita questões comentadas do aprofundamento existente',()=>{
 const {f}=fixture();
 const items=f.catalog();
 const question=items.find(x=>x.id==='cir:ciraa:0:recall:0');
 assert.ok(question);
 assert.match(question.prompt,/abdome em tábua/);
 assert.match(question.answer,/irritação peritoneal/);
 assert.match(question.pitfall,/Não atrasar/);
});
test('reabre sessão do mesmo usuário e separa a de outro usuário',()=>{
 const memory=new Map(),user={id:'student-a'};
 const a=fixture(memory,user);a.f.open('osce','61');a.f.input('Resposta começada');a.f.goTo(2);
 const b=fixture(memory,user);assert.match(b.f.page(),/Pergunta 3 de 5/);
 b.f.goTo(0);assert.match(b.f.page(),/Resposta começada/);
 user.id='student-b';b.f.resetUser();
 assert.match(b.f.page(),/0<\/strong> desafios treinados/);
 assert.ok(memory.has('master_super_foco_v1:student-a'));
 assert.equal(memory.has('master_super_foco_v1:student-b'),false);
});
