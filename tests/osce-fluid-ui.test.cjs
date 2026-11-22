'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const scripts=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-pilot.js'];
function load(db=new Map()){
 const window={addEventListener(){}},localStorage={getItem:k=>db.get(k)||null,setItem:(k,v)=>db.set(k,String(v))};
 const ctx=vm.createContext({window,localStorage,Date,console});
 for(const name of scripts)vm.runInContext(fs.readFileSync(path.join(ROOT,name),'utf8'),ctx,{filename:name});
 return {P:window.OSCEPilot,db};
}
test('fluidez: estrutura isolada do OSCE e folha de estilo carregada após estilos base',()=>{
 const {P}=load(),h=P.page(),doc=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 assert.match(h,/class="osce-app-shell osce-view-home"/);
 assert.match(h,/93/);
 assert.ok(doc.includes('osce-fluid.css?v=20261122-fluid-v1'));
 assert.ok(doc.indexOf('osce.css?v')<doc.indexOf('osce-fluid.css'));
 const css=fs.readFileSync(path.join(ROOT,'osce-fluid.css'),'utf8');
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css,/body\[data-theme="dark"\]/);
 assert.match(css,/min-height:44px/);
});
test('Ctrl e Cmd + Enter executam a mesma ação que conferir, mas respeitam validação',()=>{
 const {P}=load();
 P.start('essencial',null,87);const first=P.page();
 assert.match(first,/onkeydown="OSCEPilot.answerKey\(event\)"/);
 assert.match(first,/Conferir resposta/);
 let blocked=false;
 P.answerKey({metaKey:true,key:'Enter',preventDefault(){blocked=true;}});
 assert.equal(blocked,true);
 assert.doesNotMatch(P.page(),/Resposta-modelo Master/);
 P.answer('Não sei');P.conf(1);
 P.answerKey({ctrlKey:true,key:'Enter',preventDefault(){}});
 assert.match(P.page(),/Resposta-modelo Master/);
});
test('navegação do catálogo mantém índice e progresso após filtro e retorno',()=>{
 const {P,db}=load();
 P.filterCatalog('síncope');
 assert.match(P.page(),/Buscar estação/);
 P.start('essencial',null,87);P.answer('Não sei');P.conf(1);P.reveal();P.finish();
 P.home();P.filterCatalog('fibrilação');
 assert.match(P.page(),/Fibrilação atrial/);
 assert.ok(JSON.parse(db.get('master_osce_pilot_v1')).items['87:interpretacao'].attempts.length===1);
});
test('apenas OSCE recebe a folha específica, sem renomear dados ou introduzir fontes externas',()=>{
 const css=fs.readFileSync(path.join(ROOT,'osce-fluid.css'),'utf8');
 const selectors=css.split('\n').filter(s=>s.trim().startsWith('.'));
 assert.ok(selectors.some(s=>s.includes('.osce-app-shell')));
 assert.ok(!css.includes('@import')&&!css.includes('url(http'));
 const {P}=load();P.start('rapida',null,87);
 assert.match(P.page(),/osce-view-study/);
 assert.match(P.page(),/POCUS/);
});
test('imagens ampliadas dispõem de caminho de saída acessível e sem segundo modal ao tocar na cópia',()=>{
 const source=fs.readFileSync(path.join(ROOT,'osce-pilot.js'),'utf8');
 assert.match(source,/event\.key==='Escape'/);
 assert.match(source,/event\.key==='Tab'/);
 assert.match(source,/image\.removeAttribute\('onclick'\)/);
 assert.match(source,/document\.body\.classList\.remove\('osce-dialog-open'\)/);
});
