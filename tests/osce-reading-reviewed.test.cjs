'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const OWNER='d20331a2-6724-40e9-8e01-e3e82e57924e';
const scripts=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-personal-priorities.js','osce-pilot.js'];
function setup({owner=false,initial=null}={}){
 const db=new Map(initial?[['master_osce_pilot_v1',JSON.stringify(initial)]]:[]);
 const events=new Map(),window={MASTER_AUTH:{user:()=>({id:owner?OWNER:'674cae33-3f0e-4561-8f3b-b0b200f73277'})},addEventListener:(name,fn)=>events.set(name,fn),matchMedia:()=>({matches:true})};
 const localStorage={getItem:key=>db.get(key)||null,setItem:(key,value)=>db.set(key,String(value))};
 const ctx=vm.createContext({window,localStorage,Date,console});
 for(const file of scripts)vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),ctx,{filename:file});
 return {P:window.OSCEPilot,db,events};
}
const read=db=>JSON.parse(db.get('master_osce_pilot_v1'));
test('POCUS e todas as estações têm botão para marcar leitura sem obrigatoriedade de simulação',()=>{
 const {P,db}=setup(),h=P.page();
 assert.match(h,/Marcar como estudado/);
 assert.match(h,/OSCEPilot\.markStudied\(87,'essencial'\)/);
 P.preview(88);
 const p=P.page();
 assert.match(p,/ESTUDO GUIADO · SEM NOTA/);
 assert.match(p,/OSCEPilot\.markStudied\(88,'completa'\)/);
 assert.equal(db.has('master_osce_pilot_v1'),false);
 P.preview(61);
 assert.match(P.page(),/OSCEPilot\.markStudied\(61,'completa'\)/);
});
test('revisão por leitura salva a data e nível, sem inventar tentativa, acerto ou nota',()=>{
 const {P,db}=setup();P.preview(87);P.markStudied(87,'rapida');
 const saved=read(db),r=saved.readingReviews['87'];
 assert.equal(r.count,1);assert.equal(r.tier,'rapida');
 assert.ok(new Date(r.due)>new Date(r.at));
 assert.ok(saved.covered['87'].rapida);
 assert.equal(Object.keys(saved.items).length,0);
 assert.equal(saved.runs.length,0);
 assert.match(P.page(),/Estudado por leitura hoje/);
 P.home();
 assert.match(P.page(),/<b>1<\/b><span>temas estudados por leitura<\/span>/);
 assert.match(P.page(),/Estudada por leitura/);
});
test('a segunda marcação do mesmo dia não duplica revisão; o aprofundamento pode subir de nível',()=>{
 const {P,db}=setup();
 P.markStudied(87,'essencial');const first=read(db).readingReviews['87'];
 P.markStudied(87,'completa');const r=read(db).readingReviews['87'];
 assert.equal(r.count,1);
 assert.equal(r.due,first.due);
 assert.equal(r.tier,'completa');
 assert.equal(r.history.length,1);
 assert.equal(read(db).covered['87'].completa,true);
 assert.equal(Object.keys(read(db).items).length,0);
});
test('revisão teórica vencida abre estudo antes do simulado e não entra no contador de erros',()=>{
 const {P,db}=setup();
 P.markStudied(88,'rapida');
 const state=read(db);
 state.readingReviews['88'].due='2020-01-01T12:00:00.000Z';
 db.set('master_osce_pilot_v1',JSON.stringify(state));
 P.reload();
 assert.equal(P.readingDueItems().length,1);
 assert.equal(P.readingDueItems()[0].number,88);
 P.showReview();
 const h=P.page();
 assert.match(h,/Revisões por leitura/);
 assert.match(h,/POCUS P2/);
 assert.match(h,/OSCEPilot\.preview\(88\)/);
 assert.match(h,/0<\/b><span>lacunas insatisfatórias/);
 P.preview(88);
 assert.match(P.page(),/Marcar como estudado/);
});
test('histórico de questões e notas anteriores permanecem intactos',()=>{
 const existing={version:2,settings:{examDate:'2026-11-24',minutes:15},items:{'61:sindrome':{draft:'',attempts:[{at:'2026-11-20T18:00:00.000Z',score:40,confidence:1,criteria:[],due:'2026-11-23T12:00:00.000Z',answer:'teste'}]}},runs:[],current:null,covered:{},updatedAt:null};
 const {P,db}=setup({initial:existing});
 P.markStudied(61,'rapida');
 assert.equal(read(db).items['61:sindrome'].attempts[0].score,40);
 assert.equal(read(db).items['61:sindrome'].attempts.length,1);
 assert.ok(read(db).readingReviews['61']);
});
test('trilha pessoal contabiliza tema estudado sem marcar o bloco completo automaticamente',()=>{
 const {P,db}=setup({owner:true});
 P.markStudied(87,'essencial');
 assert.match(P.page(),/1\/7 estações estudadas ou testadas/);
 assert.match(P.page(),/0\/15/);
 assert.equal(read(db).settings.personalPlanDone,undefined);
});
test('estações fora do OSCE permanecem disponíveis para leitura manual mas não geram retestes automáticos',()=>{
 const {P,db}=setup();P.markStudied(79,'essencial');
 const saved=read(db);saved.readingReviews['79'].due='2020-01-01T12:00:00.000Z';
 db.set('master_osce_pilot_v1',JSON.stringify(saved));
 P.reload();
 assert.equal(P.readingDueItems().length,0);
 P.preview(79);
 assert.match(P.page(),/Marcar como estudado/);
});
test('arquivos de interface usam versões novas no site',()=>{
 const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 const css=fs.readFileSync(path.join(ROOT,'osce.css'),'utf8');
 assert.match(html,/osce-pilot\.js\?v=20261122-leitura-revisada-v1/);
 assert.match(html,/osce\.css\?v=20261122-leitura-revisada-v1/);
 assert.match(css,/\.osce-reading-mark/);
 assert.match(css,/\.osce-reading-intro-actions/);
});
