'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const source=fs.readFileSync(path.join(ROOT,'editorial.js'),'utf8');
const placementToken=String.fromCharCode(36)+"{window.HomeOSCENotice?.html()||''}";
function setup(db=new Map(),user='student-1'){
 const removed=[],navigation=[];
 const window={MASTER_AUTH:{user:()=>({id:user})}};
 const localStorage={getItem:key=>db.get(key)||null,setItem:(key,value)=>db.set(key,String(value))};
 const document={getElementById:id=>({remove:()=>removed.push(id)})};
 const navigate=route=>navigation.push(route);
 const context=vm.createContext({window,localStorage,document,navigate,escapeHtml:x=>String(x),console});
 vm.runInContext(source,context,{filename:'editorial.js'});
 return {notice:window.HomeOSCENotice,db,removed,navigation};
}
test('aviso aparece após saudação inicial e antes do card Continuar estudando',()=>{
 const {notice}=setup(),html=notice.html();
 assert.match(html,/Conheça o OSCE Clínica Médica/);
 assert.match(html,/POCUS e ECG com imagens comentadas/);
 assert.match(html,/Revise seus erros/);
 assert.match(html,/Explorar o OSCE/);
 assert.match(html,/Não mostrar novamente/);
 assert.ok(source.indexOf(placementToken)>source.indexOf('class="ed-greeting"'));
 assert.ok(source.indexOf(placementToken)<source.indexOf('<article class="resume-card ed-resume"'));
 assert.doesNotMatch(html,/aria-modal/);
});
test('Agora não esconde durante a sessão, sem gravar a preferência definitiva',()=>{
 const db=new Map(),{notice,removed}=setup(db);
 assert.equal(notice.visible(),true);
 notice.close();
 assert.equal(notice.visible(),false);
 assert.equal(db.size,0);
 assert.deepEqual(removed,['ed-osce-announcement']);
 assert.equal(setup(db).notice.visible(),true);
});
test('Não mostrar novamente persiste para o mesmo usuário, sem esconder para usuários distintos',()=>{
 const db=new Map();
 setup(db,'user-a').notice.never();
 assert.equal(db.get('master_osce_home_notice_v1:user-a'),'hidden');
 assert.equal(setup(db,'user-a').notice.visible(),false);
 assert.equal(setup(db,'user-b').notice.visible(),true);
});
test('Explorar o OSCE navega diretamente ao módulo, sem persistir recusa',()=>{
 const db=new Map(),ctx=setup(db);
 ctx.notice.open();
 assert.deepEqual(ctx.navigation,['osce']);
 assert.equal(ctx.notice.visible(),false);
 assert.equal(db.size,0);
});
test('CSS e HTML possuem estilo responsivo e invalidam cache de assets',()=>{
 const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 const css=fs.readFileSync(path.join(ROOT,'editorial.css'),'utf8');
 assert.match(html,/editorial\.js\?v=20261121-osce-home-notice1/);
 assert.match(html,/editorial\.css\?v=20261121-osce-home-notice1/);
 assert.match(css,/\.ed-osce-announcement/);
 assert.match(css,/@media\(max-width:470px\)/);
});
