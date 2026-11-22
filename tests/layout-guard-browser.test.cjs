'use strict';
const {test,before,after}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs/promises'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
const dir='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
const cssFiles=['tokens.css','style.css','hig.css','interface.css','focus-timer.css','editorial.css','master-planner.css','navigation-refresh.css','section-rail.css','layout-guard.css'];
const styles=cssFiles.map(n=>'<link rel="stylesheet" href="/'+dir+'/'+n+'">').join('');
const html='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'+styles+'</head><body data-theme="light" class="side-collapsed">'
 +'<div class="app-shell"><aside class="sidebar"><div class="brand"><span class="brand-icon">M</span></div><nav id="sidebar-nav"><button class="nav-destination">Livro</button></nav></aside><div class="app-body">'
 +'<header class="topbar"><div class="topbar-left"><button class="icon-button desktop-sidebar-button">☷</button><button class="icon-button menu-button">☰</button></div><div class="topbar-right">'
 +'<button class="search-trigger"><span class="search-symbol">⌕</span><span>Buscar conteúdo clínico</span><kbd>⌘ K</kbd></button>'
 +'<button id="caderno-atalho-topo" class="icon-button">Caderno</button><div class="ai-tutor-dock"><button class="ai-tutor-launch icon-button">AI</button></div>'
 +'<button id="focus-top" class="focus-top"><span class="tomato">🍅</span><span class="focus-top-label">Pomodoro</span><span>06:19</span></button>'
 +'<button class="icon-button focus-trigger">⛶</button><button class="icon-button settings-trigger">◐</button><div class="account-control"><button class="avatar">Avatar</button></div></div></header>'
 +'<main id="main-content"><div class="mp-root"><section class="mp-panel mp-editor"><div class="mp-panel-head"><h2>Plano de estudos</h2><button class="btn">Fechar</button></div>'
 +'<div class="mp-form-grid"><label>Nome da avaliação<input value="OSCE"></label><label>Data da avaliação<input type="date" value="2026-12-06"></label><label>Tempo diário disponível<select><option>30 minutos</option></select></label></div>'
 +'<fieldset class="mp-weekdays"><legend>Quais dias você pode estudar?</legend>'+['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(x=>'<label><input type="checkbox" checked><span>'+x+'</span></label>').join('')+'</fieldset>'
 +'<div class="mp-topic-selector"><div class="mp-topic-tools"><label for="mp-search">Escolha matérias e temas</label><div class="mp-topic-search"><input id="mp-search" type="search" placeholder="Buscar tema"><select id="mp-subject"><option>Todas as matérias</option></select></div><small>93 temas encontrados</small><div class="mp-actions"><button class="btn">Selecionar visíveis</button><button class="btn ghost">Limpar visíveis</button></div></div>'
 +'<div class="mp-topic-list"><label><input type="checkbox"><span><b>Síncope</b><small>Clínica Médica</small></span></label><label><input type="checkbox"><span><b>Fibrilação atrial</b><small>OSCE</small></span></label></div><div class="mp-editor-footer"><p>2 temas selecionados</p><button class="btn primary">Gerar meu plano de estudos</button></div></div></section></div></main></div></div>'
 +'<nav class="mobile-tabbar">'+['Início','Matérias','Praticar','Caderno','Perfil'].map(x=>'<button><span>⌂</span>'+x+'</button>').join('')+'</nav>'
 +'<nav class="section-rail" aria-label="Mapa de seções"><button class="section-rail-toggle">☷</button><div class="section-rail-marks"></div></nav></body></html>';
let server,base,browser;
before(async()=>{
 server=http.createServer(async(req,res)=>{
  const pathname=new URL(req.url,'http://127.0.0.1').pathname;
  if(pathname==='/harness'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end(html);return;}
  const filename=path.resolve(process.cwd(),decodeURIComponent(pathname.slice(1)));
  if(!filename.startsWith(process.cwd()+path.sep)){res.writeHead(403);res.end();return;}
  try{const buf=await fs.readFile(filename);res.setHeader('Content-Type','text/css');res.end(buf);}catch{res.writeHead(404);res.end();}
 });
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/google-chrome',headless:true});
});
after(async()=>{await browser?.close();await new Promise(ok=>server?.close(ok));});
for(const [width,height,touch] of [[390,844,true],[700,900,true],[768,1024,true],[834,1112,true],[1024,768,true],[1440,900,false]]){
 test('Alinhamento '+width+'×'+height+(touch?' touch':''),async()=>{
  const context=await browser.newContext({viewport:{width,height},hasTouch:touch,deviceScaleFactor:1});
  const page=await context.newPage();await page.goto(base+'/harness',{waitUntil:'networkidle'});
  try{
   const data=await page.evaluate(()=>{
    const visible=e=>e&&e.getClientRects().length>0&&getComputedStyle(e).display!=='none';
    const top=[...document.querySelectorAll('.topbar button')].filter(visible).map(el=>({name:el.className,rect:el.getBoundingClientRect()}));
    const collisions=[];
    for(let i=0;i<top.length;i++)for(let j=i+1;j<top.length;j++){
     const a=top[i].rect,b=top[j].rect;
     const area=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
     if(area>Math.min(a.width*a.height,b.width*b.height)*.12)collisions.push(top[i].name+' overlaps '+top[j].name);
    }
    const input=document.getElementById('mp-search'),sel=document.getElementById('mp-subject');
    const planner=document.querySelector('.mp-root');
    return {inputH:input.getBoundingClientRect().height,selectH:sel.getBoundingClientRect().height,
     scroll:document.documentElement.scrollWidth,plannerOverflow:planner.scrollWidth-planner.clientWidth,
     collisions,railHidden:!visible(document.querySelector('.section-rail')),
     tabbar:visible(document.querySelector('.mobile-tabbar'))};
   });
   assert.ok(data.inputH>=40&&data.inputH<=55,'Busca ficou enorme: '+JSON.stringify(data));
   assert.ok(data.selectH>=40&&data.selectH<=55,'Seletor deformado: '+JSON.stringify(data));
   assert.ok(data.scroll<=width+3,'Rolagem horizontal: '+JSON.stringify(data));
   assert.ok(data.plannerOverflow<=3,'Planner transborda: '+JSON.stringify(data));
   assert.deepEqual(data.collisions,[],'Cabeçalho com controles sobrepostos');
   assert.equal(data.railHidden,true,'Índice flutuante não pode cobrir campos do planejador');
   assert.equal(data.tabbar,width<=800);
   await page.locator('.mp-editor').evaluate(el=>el.classList.remove('mp-editor'));
   const rail=await page.evaluate(()=>{
    const toggle=document.querySelector('.section-rail-toggle'),head=document.querySelector('.topbar');
    return {shown:toggle.getClientRects().length>0&&getComputedStyle(toggle).display!=='none',
     top:toggle.getBoundingClientRect().top,headerBottom:head.getBoundingClientRect().bottom};
   });
   if(rail.shown)assert.ok(rail.top>=rail.headerBottom-2,'Botão do índice cobre a barra superior: '+JSON.stringify(rail));
  }finally{await context.close();}
 });
}
