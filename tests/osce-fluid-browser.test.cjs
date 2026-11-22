'use strict';
const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const fs=require('node:fs/promises'),http=require('node:http'),path=require('node:path');
const ROOT='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
const scripts=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-context-ui.js','osce-pilot.js'];
const harness='<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
 +'<link rel="stylesheet" href="/'+ROOT+'/osce.css"><link rel="stylesheet" href="/'+ROOT+'/osce-fluid.css"><link rel="stylesheet" href="/'+ROOT+'/osce-context-ui.css">'
 +'<style>body{margin:0;padding:12px;background:#f7f4ee;color:#193f34;font:16px system-ui}.btn{cursor:pointer;background:#fff;color:inherit;border:1px solid #d1d8d1;padding:9px 14px}.btn.primary{background:#1e5c45;color:#fff}.page-header h1{font-size:2.25rem}main{max-width:1100px;margin:auto}button{cursor:pointer}</style>'
 +'<script>window.ui={route:"osce"};window.render=()=>{document.querySelector("#main").innerHTML=window.OSCEPilot.page()};</script>'
 +scripts.map(s=>'<script src="/'+ROOT+'/'+s+'"></script>').join('\n')
 +'</head><body data-theme="light"><main id="main"></main><script>render()</script></body></html>';
let server,base,browser;
before(async()=>{
 server=http.createServer(async(req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(pathname==='/harness'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end(harness);return;}
  const full=path.resolve(process.cwd(),decodeURIComponent(pathname.slice(1)));
  if(!full.startsWith(process.cwd()+path.sep)){res.writeHead(403);res.end();return;}
  try{const buf=await fs.readFile(full);const ext=path.extname(full);res.setHeader('Content-Type',ext==='.js'?'text/javascript':ext==='.css'?'text/css':'application/octet-stream');res.end(buf);}catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();await new Promise(resolve=>server?.close(resolve));});
async function open(viewport={width:1150,height:820}){
 const context=await browser.newContext({viewport});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/harness',{waitUntil:'domcontentloaded'});
 await page.locator('.osce-app-shell').waitFor();
 return {page,close:async()=>{assert.deepEqual(errors,[]);await context.close();}};
}
test('desktop: início → pergunta → atalho Ctrl+Enter → resposta → imagem ampliada → Esc',async()=>{
 const t=await open(),p=t.page;
 await p.evaluate(()=>OSCEPilot.start('essencial',null,87));
 await p.locator('#osce-answer').fill('não sei');
 await p.locator('.osce-confidence button').first().click();
 await p.locator('#osce-answer').press('Control+Enter');
 await p.locator('.osce-feedback').waitFor();
 assert.equal(await p.locator('.osce-app-shell .osce-feedback').count(),1);
 const pos=await p.locator('.osce-feedback').evaluate(el=>el.getBoundingClientRect().top);
 assert.ok(pos<840 && pos>=-30,'feedback should remain near viewport, got '+pos);
 await p.locator('.osce-annotated-zoom').first().click();
 await p.locator('.osce-visual-lightbox').waitFor();
 assert.equal(await p.locator('.osce-lightbox').count(),1);
 await p.locator('.osce-visual-lightbox .osce-image-frame img').first().dispatchEvent('click');
 assert.equal(await p.locator('.osce-lightbox').count(),1,'zoom should not open second dialog');
 await p.keyboard.press('Escape');
 assert.equal(await p.locator('.osce-lightbox').count(),0);
 assert.equal(await p.evaluate(()=>document.body.classList.contains('osce-dialog-open')),false);
 await t.close();
});
test('tablet: buscar estação preserva cursor, filtro e evita rolagem lateral',async()=>{
 const t=await open({width:768,height:880}),p=t.page;
 const search=p.locator('#osce-catalog-search');
 await search.fill('síncope');
 await p.waitForTimeout(130);
 assert.equal(await p.locator('#osce-catalog-search').inputValue(),'síncope');
 await p.locator('#osce-catalog-search').evaluate(el=>{el.setSelectionRange(2,2);el.focus();});
 await p.keyboard.type('X');
 await p.waitForTimeout(130);
 const data=await p.locator('#osce-catalog-search').evaluate(el=>({value:el.value,caret:el.selectionStart}));
 assert.equal(data.value,'síXncope');assert.equal(data.caret,3);
 const overflow=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 assert.ok(overflow<=2,'OSCE horizontal overflow at tablet width: '+overflow);
 await t.close();
});


test('termo clínico abre referência contextual sem deslocar a página e fecha com Escape',async()=>{
 const t=await open(),p=t.page;
 await p.evaluate(()=>OSCEPilot.preview(61));
 await p.locator('#osce-library > summary').click();
 await p.locator('#osce-terms summary').click();
 const trigger=p.locator('#osce-terms .osce-term').first();
 await trigger.scrollIntoViewIfNeeded();
 const before=await p.evaluate(()=>window.scrollY);
 await trigger.click();
 await p.locator('.osce-context-popover').waitFor();
 assert.match(await p.locator('.osce-context-popover').innerText(),/Síncope/);
 assert.equal(await p.locator('.osce-context-popover a[href^="https://"]').count(),1);
 assert.equal(await trigger.getAttribute('aria-expanded'),'true');
 const after=await p.evaluate(()=>window.scrollY);
 assert.ok(Math.abs(after-before)<32,'popup should not jump to remote glossary panel');
 await p.keyboard.press('Escape');
 assert.equal(await p.locator('.osce-context-popover').count(),0);
 assert.equal(await trigger.getAttribute('aria-expanded'),'false');
 assert.equal(await trigger.evaluate(x=>x===document.activeElement),true);
 await t.close();
});
test('celular: definição abre como folha contextual com botão grande e sem rolagem lateral',async()=>{
 const t=await open({width:390,height:844}),p=t.page;
 await p.evaluate(()=>OSCEPilot.preview(61));
 await p.locator('#osce-library > summary').click();
 await p.locator('#osce-terms summary').click();
 await p.locator('#osce-terms .osce-term').first().click();
 const flyout=p.locator('.osce-context-popover');
 assert.equal(await flyout.evaluate(x=>x.classList.contains('is-sheet')),true);
 const dims=await flyout.evaluate(el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,width:r.width}});
 assert.ok(dims.left>=0&&dims.right<=391,'mobile panel must stay inside viewport');
 const close=p.locator('.osce-context-close');
 assert.ok((await close.boundingBox()).width>=44);
 await close.click();
 assert.equal(await flyout.count(),0);
 await t.close();
});

test('estudo guiado oferece uma pergunta por vez, navegação rápida e visão geral sem perder histórico',async()=>{
 const t=await open({width:768,height:880}),p=t.page;
 await p.evaluate(()=>OSCEPilot.preview(12));
 assert.equal(await p.locator('.osce-reading-card').count(),1);
 assert.ok(await p.locator('.osce-keyword').count()>0);
 assert.equal(await p.locator('.osce-reading-index').count(),9);
 await p.locator('.osce-reading-pagination .btn.primary').click();
 assert.match(await p.locator('.osce-reading-card-head .eyebrow').innerText(),/ETAPA 2\/9/);
 await p.locator('.osce-reading-index').nth(3).click();
 assert.match(await p.locator('.osce-reading-card-head .eyebrow').innerText(),/ETAPA 4\/9/);
 await p.locator('.osce-reading-view').filter({hasText:'Ver todas'}).click();
 assert.equal(await p.locator('.osce-reading-card').count(),9);
 const overflow=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 assert.ok(overflow<=2,'tablet guided view overflow: '+overflow);
 await t.close();
});
test('celular respeita realces desligáveis e botões de 44px na leitura guiada',async()=>{
 const t=await open({width:390,height:844}),p=t.page;
 await p.evaluate(()=>OSCEPilot.preview(64));
 assert.equal(await p.locator('.osce-reading-card').count(),1);
 const before=await p.locator('mark.osce-keyword').count();
 assert.ok(before>0,'marcações semânticas devem aparecer no texto');
 await p.locator('.osce-reading-emphasis').click();
 assert.equal(await p.locator('mark.osce-keyword').count(),0);
 const tap=await p.locator('.osce-reading-index').first().boundingBox();
 assert.ok(tap.height>=44,'touch target no índice');
 const overflow=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 assert.ok(overflow<=2,'mobile guided view overflow: '+overflow);
 await t.close();
});

test('atalhos da página inicial abrem POCUS e chegam à busca sem rolagem manual longa',async()=>{
 const t=await open({width:768,height:880}),p=t.page;
 const pocus=p.locator('.osce-quicknav button').filter({hasText:'POCUS'});
 await pocus.click();
 assert.equal(await p.locator('#osce-pocus-top').evaluate(el=>el.open),true);
 const search=p.locator('.osce-quicknav button').filter({hasText:'Buscar'});
 await search.click();
 await p.waitForTimeout(120);
 assert.equal(await p.locator('#osce-catalog-search').evaluate(el=>el===document.activeElement),true);
 await t.close();
});
