'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const css=fs.readFileSync(path.join(root,'layout-guard.css'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
test('Camada global de alinhamento é a última folha importada antes do body',()=>{
 const anchor=html.indexOf('layout-guard.css?v=20261122-layout-guard1');
 assert.ok(anchor>html.indexOf('cir-quality-v2.css')&&anchor<html.indexOf('</head>'));
 assert.equal((html.match(/layout-guard\.css/g)||[]).length,1);
});
test('Cabeçalho tem uma linha única com controles dimensionados e coluna que pode encolher',()=>{
 for(const k of ['.topbar .topbar-left','.topbar .topbar-right','.topbar .search-trigger','.topbar .focus-top','.topbar .account-control'])
  assert.ok(css.includes(k),'Falta '+k);
 assert.match(css,/\.topbar \.topbar-right\{[\s\S]*?flex-wrap:nowrap/);
 assert.match(css,/--master-header-h:74px/);
});
test('Navegação lateral não deve sobrepor o avatar no iPad touch e não pode cobrir o editor',()=>{
 assert.match(css,/@media\(min-width:701px\) and \(pointer:coarse\)/);
 assert.match(css,/\.section-rail-toggle\{[\s\S]*?top:12px;bottom:auto/);
 assert.match(css,/body:has\(\.mp-root \.mp-editor\) \.section-rail\{display:none!important\}/);
});
test('Campos do planejador têm altura controlada na direção vertical e grid é responsivo à coluna',()=>{
 assert.match(css,/\.mp-editor\{container-type:inline-size;container-name:master-plan-editor\}/);
 assert.match(css,/height:46px;min-height:46px;max-height:46px/);
 assert.match(css,/@container master-plan-editor \(max-width:720px\)/);
 assert.match(css,/\.mp-editor \.mp-topic-search\{grid-template-columns:minmax\(0,1fr\)\}/);
});
test('A barra inferior tem área segura e reserva espaço ao final do conteúdo',()=>{
 assert.match(css,/--master-safe-bottom:env\(safe-area-inset-bottom,0px\)/);
 assert.match(css,/\.mobile-tabbar\{[\s\S]*?position:fixed/);
 assert.match(css,/#main-content\{padding-bottom:calc\(var\(--master-bottom-nav-h\)/);
});
test('Sem ocultar overflow global e mantendo print, dark mode e acessibilidade',()=>{
 assert.doesNotMatch(css,/(?:html|body)\s*\{[^}]*overflow-x:\s*hidden/);
 assert.match(css,/@media print\{/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
});
