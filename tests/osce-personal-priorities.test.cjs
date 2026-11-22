'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const OWNER='d20331a2-6724-40e9-8e01-e3e82e57924e';
const scripts=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-personal-priorities.js','osce-pilot.js'];
function fixture(identity,db=new Map()){
 let currentIdentity=identity;
 const events=new Map();
 const window={
  MASTER_AUTH:{user:()=>currentIdentity?{id:currentIdentity}:null},
  addEventListener:(name,fn)=>{events.set(name,fn)},
  matchMedia:()=>({matches:true})
 };
 const localStorage={getItem:key=>db.get(key)||null,setItem:(key,value)=>db.set(key,String(value))};
 const ctx=vm.createContext({window,localStorage,Date,console});
 for(const file of scripts)vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),ctx,{filename:file});
 return {P:window.OSCEPilot,config:window.OSCE_PERSONAL_PRIORITIES,index:window.OSCE_PRIORITY_INDEX,db,swap(next){currentIdentity=next;events.get('master-auth-ended')?.();},ready(){events.get('master-auth-ready')?.()}};
}
test('trilha só aparece na sessão autenticada da conta proprietária',()=>{
 const own=fixture(OWNER),other=fixture('2a3e2aba-d55e-4e4d-aaf3-b0af4337978d'),guest=fixture(null);
 const h=own.P.page();
 assert.equal(own.P.personalIsOwner(),true);
 assert.match(h,/Minha trilha OSCE · 15 blocos/);
 assert.match(h,/★ Minha trilha/);
 assert.match(h,/★ Minhas prioridades/);
 assert.match(h,/ROTEIRO EXCLUSIVO DESTA CONTA/);
 assert.equal((h.match(/class="osce-personal-row/g)||[]).length,15);
 for(const k of ['tier-a','tier-b','tier-c'])assert.ok(h.includes('osce-personal-group '+k));
 assert.match(h,/★ Minha A1/);
 for(const fx of [other,guest]){
  assert.equal(fx.P.personalIsOwner(),false);
  assert.doesNotMatch(fx.P.page(),/osce-my-plan/);
  assert.doesNotMatch(fx.P.page(),/★ Minha /);
  assert.doesNotMatch(fx.P.page(),/★ Minha trilha/);
  assert.doesNotMatch(fx.P.page(),/★ Minhas prioridades/);
 }
});
test('as 15 prioridades têm grupos 6/6/3, os mesmos IDs do catálogo e sem trocar matriz geral',()=>{
 const {config,index}=fixture(OWNER),s=config.groups,original=index.groups.flatMap(g=>g.numbers);
 assert.equal(s.length,15);
 assert.deepEqual(Array.from(['A','B','C'],tier=>s.filter(g=>g.tier===tier).length),[6,6,3]);
 assert.equal(s.reduce((a,g)=>a+g.minutes,0),380);
 assert.deepEqual(Array.from(s.slice(0,3),g=>g.title),['ECG e arritmias','POCUS pulmonar e cardíaco','Síncope × crise convulsiva']);
 assert.deepEqual(Array.from(index.groups,g=>g.numbers.length),[43,31,12]);
 assert.equal(original.length,86);assert.equal(new Set(original).size,86);
 const bank=config.groups.flatMap(g=>g.ids);
 assert.ok(bank.includes(61));assert.ok(bank.includes(52));assert.ok(bank.includes(87));assert.ok(bank.includes(93));
});
test('marcar blocos concluídos salva somente progresso autenticado e preserva tentativas',()=>{
 const db=new Map(),{P}=fixture(OWNER,db);
 P.start('essencial',null,61);P.answer('não sei');P.conf(1);P.reveal();P.finish();
 const before=JSON.parse(db.get('master_osce_pilot_v1')).items['61:sindrome'].attempts.length;
 P.home();P.personalDone(1);P.personalDone(6);
 const data=JSON.parse(db.get('master_osce_pilot_v1'));
 assert.equal(data.settings.personalPlanDone['1'],true);
 assert.equal(data.settings.personalPlanDone['6'],true);
 assert.equal(data.items['61:sindrome'].attempts.length,before);
 assert.match(P.page(),/2\/15/);
 const next=fixture(OWNER,db);
 assert.match(next.P.page(),/2\/15/);
 next.P.personalDone(1);
 assert.equal(JSON.parse(db.get('master_osce_pilot_v1')).settings.personalPlanDone['1'],false);
});
test('outras contas não podem alterar nem exibir as marcas pessoais',()=>{
 const db=new Map(),other=fixture('e6fc796a-9832-4c9c-832c-4ef84cf6fd43',db);
 other.P.personalDone(1);
 other.P.personalOpen(52);
 assert.equal(db.has('master_osce_pilot_v1'),false);
 assert.doesNotMatch(other.P.page(),/osce-my-plan/);
});
test('ao trocar de conta no mesmo navegador não permanecem badges, painel nem filtro exclusivo',()=>{
 const u=fixture(OWNER);
 u.P.setCatalogPriority('minhas');
 assert.match(u.P.page(),/★ Minha A1/);
 u.swap('ac7c979f-1484-4642-9ac9-cfa77f2d8d2d');
 assert.doesNotMatch(u.P.page(),/osce-my-plan/);
 assert.doesNotMatch(u.P.page(),/★ Minha /);
 assert.doesNotMatch(u.P.page(),/★ Minhas prioridades/);
 u.ready();assert.doesNotMatch(u.P.page(),/osce-my-plan/);
});
test('o filtro pessoal e a sessão de hoje seguem a ordem individual, sem afetar a ordem geral',()=>{
 const owner=fixture(OWNER),other=fixture('f3d12f35-d196-40e1-9d12-d61a01ed12bd');
 owner.P.setCatalogPriority('minhas');
 const html=owner.P.page();
 assert.ok(html.indexOf('id="osce-station-52"')>=0);
 assert.ok(html.indexOf('id="osce-station-52"')<html.indexOf('id="osce-station-87"'));
 owner.P.daily();
 const current=JSON.parse(owner.db.get('master_osce_pilot_v1')).current;
 assert.equal(current.queue[0].station,52);
 other.P.daily();
 const control=JSON.parse(other.db.get('master_osce_pilot_v1')).current;
 assert.equal(control.queue[0].station,87);
});
test('script pessoal vem antes do OSCE, sem modificar demais cursos',()=>{
 const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 assert.ok(html.indexOf('osce-personal-priorities.js')<html.indexOf('osce-pilot.js'));
 assert.match(html,/osce-personal-priorities\.js\?v=20261122-conta-v1/);
 assert.match(html,/osce\.css\?v=20261122-conta-v1/);
});
