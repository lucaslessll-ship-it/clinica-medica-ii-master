'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const read=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
function notesFixture(){
 const ctx={route:'osce'};
 const station={dataset:{noteStation:'87',noteTitle:'Linhas B pulmonares',noteStep:'0',noteQuestion:'interpretacao',osceView:'preview'}};
 const sf={querySelector(selector){return {textContent:selector.includes('eyebrow')?'OSCE · Interpretação':'Insuficiência respiratória'};}};
 const content={querySelector(){return {textContent:'Conteúdo médico'};}};
 const elements={'#main-content .deep-lesson[data-lesson-key]':null,'#main-content .osce-app-shell':station,
  '#main-content .sf-page':sf,'#main-content':content};
 const document={readyState:'loading',addEventListener(){},querySelector(s){return elements[s]??null;}};
 const window={addEventListener(){}};
 const sandbox={window,document,location:{hash:'#osce'},ui:ctx,localStorage:{getItem(){return null;}},console};
 vm.runInNewContext(read('notas.js'),sandbox,{filename:'notas.js'});
 return {notes:window.Notas,station,ctx,elements,sandbox};
}
test('OSCE: destaque identificado pela estação, não pela tela, profundidade ou questão',()=>{
 const f=notesFixture(),a=f.notes.contextoAtual();
 assert.equal(a.chave,'estudo_osce_estacao_87');
 assert.equal(a.materia,'OSCE · Clínica Médica');
 assert.equal(a.indice,87);assert.equal(a.questao,'interpretacao');
 f.station.dataset.osceView='study';f.station.dataset.noteStep='3';f.station.dataset.noteQuestion='tratamento';
 const b=f.notes.contextoAtual();
 assert.equal(b.chave,a.chave);assert.equal(b.questao,'tratamento');assert.equal(b.etapa,3);
 f.station.dataset.osceView='home';delete f.station.dataset.noteStation;
 assert.equal(f.notes.contextoAtual().chave,'estudo_osce_home');
});
test('Super Foco: mesma pergunta guarda destaque em etapas diferentes',()=>{
 const f=notesFixture();f.ctx.route='superfoco';
 const a=f.notes.contextoAtual(),b=f.notes.contextoAtual();
 assert.equal(a.chave,b.chave);assert.match(a.chave,/^estudo_superfoco_/);
 assert.equal(a.materia,'Super Foco');
});
test('Todas as rotas educacionais ficam elegíveis e a biblioteca própria não entra em ciclo',()=>{
 const f=notesFixture();
 const routes=['topic','p1topic','cirtopic','practice','exam','cases','oral','flashcards',
  'emergency','emergency-p1','emergency-p2','emergency-questions','emergency-simulado',
  'pocus','ecg','rad','hemo','labmaster','prescriptions','atb','micro','planner','today',
  'decisionlab','banca','revisao','labarea-hematologia','cirpractice','p1practice','sources'];
 for(const r of routes){f.ctx.route=r;f.sandbox.location.hash='#'+r;assert.ok(f.notes.contextoAtual()?.chave,'missing '+r);}
 for(const r of ['dashboard','admin','notes']){f.ctx.route=r;assert.equal(f.notes.contextoAtual(),null);}
});
test('OSCE rende identidade de estação em revisão e simulação, incluindo sessão mista',()=>{
 const scripts=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js',
 'osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js',
 'osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js',
 'osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js',
 'osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-pilot.js'];
 const db=new Map(),window={addEventListener(){}};
 const localStorage={getItem:k=>db.get(k)||null,setItem:(k,v)=>db.set(k,String(v))};
 const context=vm.createContext({window,localStorage,console,Date});
 for(const f of scripts)vm.runInContext(read(f),context,{filename:f});
 const P=window.OSCEPilot;P.preview(87);const a=P.page();
 assert.match(a,/data-note-station="87"/);assert.match(a,/data-note-question="interpretacao"/);
 P.start('essencial',null,87);const b=P.page();
 assert.match(b,/data-note-station="87"/);assert.match(b,/data-note-question="interpretacao"/);
 assert.equal(P.previewQuestion(87,'interpretacao'),true);
 assert.match(P.page(),/data-note-station="87"/);
 P.daily();const s=JSON.parse(db.get('master_osce_pilot_v1'));
 assert.equal(s.current.queue.length,8);
 const first=s.current.queue[0];
 assert.match(P.page(),new RegExp('data-note-station="'+first.station+'"'));
 assert.match(P.page(),new RegExp('data-note-question="'+first.id+'"'));
 P.answer('não sei');P.conf(1);P.reveal();P.finish();
 const updated=JSON.parse(db.get('master_osce_pilot_v1')).current.queue[1];
 assert.match(P.page(),new RegExp('data-note-station="'+updated.station+'"'));
 assert.match(P.page(),new RegExp('data-note-question="'+updated.id+'"'));
});
test('caderno reabre estação e pergunta associadas; ativos são atualizados no HTML',()=>{
 const note=read('notas.js'),library=read('caderno-unificado.js'),index=read('index.html');
 assert.match(note,/questao:pagina\?\.questao\|\|null/);
 assert.match(library,/window\.OSCEPilot\.previewQuestion\(meta\.indice,questao\)/);
 assert.match(library,/window\.OSCEPilot\?\.preview\?\.\(meta\.indice\)/);
 for(const src of ['osce-pilot.js?v=20261122-cross-notes1','notas.js?v=20261122-cross-notes1',
  'caderno-unificado.js?v=20261122-cross-notes1','notas.css?v=20261122-cross-notes1'])
  assert.ok(index.includes(src),'stale cache: '+src);
});
