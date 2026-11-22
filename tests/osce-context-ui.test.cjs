'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
test('HTML importa o posicionamento contextual antes do OSCE, sem dependências remotas',()=>{
 const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 const a=html.indexOf('osce-context-ui.js?v=20261122-context-v1');
 const b=html.indexOf('osce-pilot.js?v=20261122-context-v1');
 assert.ok(a>=0&&b>a,'o script do popover deve preceder o motor');
 assert.match(html,/osce-context-ui\.css\?v=20261122-context-v1/);
 const js=fs.readFileSync(path.join(ROOT,'osce-context-ui.js'),'utf8');
 assert.doesNotMatch(js,/import\s|require\s*\(|https:\/\/cdn|eval\s*\(/);
});
test('visualização progressiva usa fallback sem DOM e preserva movimento reduzido',()=>{
 const code=fs.readFileSync(path.join(ROOT,'osce-context-ui.js'),'utf8');
 const listeners=[];
 const window={addEventListener:(event,fn)=>listeners.push(event),matchMedia:()=>({matches:true})};
 vm.runInNewContext(code,{window,console});
 assert.ok(window.OSCEContext);
 assert.equal(window.OSCEContext.open(null,{name:'Síncope'}),false);
 assert.equal(window.OSCEContext.reducedMotion(),true);
 assert.ok(listeners.includes('popstate'));
});
test('estudo OSCE abre termos por botão sem interromper a leitura',()=>{
 const js=fs.readFileSync(path.join(ROOT,'osce-pilot.js'),'utf8');
 assert.match(js,/OSCEPilot\.term\(\\''\+t\.key\+'\\',this\)/);
 assert.match(js,/OSCEContext\?\.open\(anchor/);
 assert.match(js,/window\.OSCEContext\?\.close\(false\)/);
 assert.match(js,/window\.OSCEContext\?\.enter\(target,destination\)/);
 assert.doesNotMatch(js,/scrollIntoView\(\{behavior:'instant'/);
});
test('camada de ajuda tem contraste, fonte legível e navegação adaptável',()=>{
 const css=fs.readFileSync(path.join(ROOT,'osce-context-ui.css'),'utf8');
 assert.match(css,/\.osce-context-popover/);
 assert.match(css,/\.osce-context-popover\.is-sheet/);
 assert.match(css,/min\(420px,70dvh\)/);
 assert.match(css,/focus-visible/);
 assert.match(css,/prefers-reduced-motion/);
 assert.match(css,/safe-area-inset-bottom/);
 assert.match(css,/44px/);
});
