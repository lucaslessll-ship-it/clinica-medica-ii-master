'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const read=n=>fs.readFileSync(path.join(ROOT,n),'utf8');
class FakeStorage{
 constructor(){this.items=new Map()}
 get length(){return this.items.size}
 getItem(k){return this.items.has(k)?this.items.get(k):null}
 setItem(k,v){this.items.set(k,String(v))}
 removeItem(k){this.items.delete(k)}
 key(i){return [...this.items.keys()][i]??null}
}
function sessionFixture(local=new FakeStorage(),tab=new FakeStorage()){
 const window={};vm.runInNewContext(read('auth-storage.js'),{window,URL,localStorage:local,sessionStorage:tab});
 return {storage:window.MasterSessionStorage,local,tab};
}
const token='sb-demo-auth-token',url='https://demo.supabase.co';
test('Manter conectado: padrão em dispositivo pessoal, token no armazenamento persistente e sem senha salva',()=>{
 const {storage,local,tab}=sessionFixture(),client=storage.create(url);
 assert.equal(storage.remembered(),true);
 client.storage.setItem(token,'token-que-expira');
 assert.equal(local.getItem(token),'token-que-expira');
 assert.equal(tab.getItem(token),null);
 assert.equal([...local.items.keys()].some(k=>k.includes('password')),false);
});
test('Desmarcar: migra sessão para esta aba; reabrir em outra aba não compartilha sessão',()=>{
 const {storage,local,tab}=sessionFixture(),client=storage.create(url);
 client.storage.setItem(token,'auth');
 client.setRemember(false);
 assert.equal(local.getItem(token),null);
 assert.equal(tab.getItem(token),'auth');
 assert.equal(storage.remembered(),false);
 assert.equal(sessionFixture(local,new FakeStorage()).storage.create(url).storage.getItem(token),null);
});
test('Reativar: migração reversível não apaga progresso nem mantém tokens duplicados',()=>{
 const {storage,local,tab}=sessionFixture(),client=storage.create(url);
 local.setItem('master_osce_pilot_v1','{"items":{}}');
 client.setRemember(false);client.storage.setItem(token,'refresh-token');client.setRemember(true);
 assert.equal(local.getItem(token),'refresh-token');
 assert.equal(tab.getItem(token),null);
 assert.equal(local.getItem('master_osce_pilot_v1'),'{"items":{}}');
});
test('Sair: remove a sessão das duas formas de armazenamento',()=>{
 const {storage,local,tab}=sessionFixture(),client=storage.create(url);
 client.storage.setItem(token,'auth');tab.setItem(token,'stale');
 client.storage.removeItem(token);
 assert.equal(local.getItem(token),null);assert.equal(tab.getItem(token),null);
});
test('Sem armazenamento local: volta à sessão de aba sem afirmar que manter login funcionou',()=>{
 class BlockedStorage extends FakeStorage{setItem(){throw new Error('SecurityError')}}
 const {storage,tab}=sessionFixture(new BlockedStorage());
 assert.equal(storage.remembered(),false);
 const client=storage.create(url);client.storage.setItem(token,'auth');
 assert.equal(tab.getItem(token),'auth');
 assert.throws(()=>client.setRemember(true),/não permite salvar a sessão/);
});
test('Login com senha, Google e perfil respeitam a mesma preferência',()=>{
 const js=read('auth.js'),html=read('index.html');
 assert.match(js,/sessionStore\.setRemember\(\$\('master-remember'\)\.checked\)/);
 assert.match(js,/sessionStore\.setRemember\(\$\('master-remember'\)\?\.checked\?\?MasterSessionStorage\.remembered\(\)\)/);
 assert.match(js,/\$\('master-remember-device'\)\?\.addEventListener\('change'/);
 assert.match(html,/id="master-remember-device"/);
 assert.match(html,/role="switch"/);
});
test('Barra lateral: categorias inteligíveis, OSCE à frente, todas as rotas únicas',()=>{
 const source=read('app.js');
 const m=source.match(/ const groups=\[([\s\S]*?)\n \];\n const belongs=/);
 assert.ok(m,'grupos de navegação');
 const window={addEventListener(){}};
 vm.runInNewContext(read('master-question-bank.js'),{window});
 const groups=vm.runInNewContext('['+m[1]+']',{MasterQuestionBank:window.MasterQuestionBank});
 const names=groups.map(g=>g[0]),ids=groups.flatMap(g=>g[2]);
 assert.equal(groups.length,16);
 assert.equal(groups[1][0],'OSCE · Clínica Médica');
 assert.equal(new Set(ids).size,ids.length);
 for(const id of ['dashboard','today','topics','p1','osce','superfoco','practice','revisao','ecg','pocus','labmaster','atb','prescriptions','notes','sources','qb-bank','qb-exam','qb-errors','qb-favorites','qb-stats'])
  assert.ok(ids.includes(id),'Rota não pode desaparecer: '+id);
 for(const title of ['DISCIPLINAS','PRATICAR E REVISAR','INTERPRETAR EXAMES','CONDUTAS E TERAPÊUTICA','CONSULTAR'])
  assert.ok(groups.some(g=>g[4]===title),'Categoria ausente: '+title);
});
test('Painéis recolhidos são realmente ocultados e a barra compacta mostra só ícones',()=>{
 const css=read('navigation-refresh.css'),html=read('index.html');
 assert.match(css,/\.nav-children\[hidden\]\{display:none!important\}/);
 assert.match(css,/body\.side-collapsed #sidebar-nav \.nav-destination>span/);
 assert.match(css,/\.nav-destination>svg/);
 assert.match(html,/navigation-refresh\.css\?v=20261122-nav-auth1/);
 assert.match(html,/auth-storage\.js\?v=20261122-persist1/);
});
