'use strict';
const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const fs=require('node:fs/promises'),http=require('node:http'),path=require('node:path');
const ROOT='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
const scripts=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-pilot.js'];
const harness='<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
 +'<link rel="stylesheet" href="/'+ROOT+'/osce.css"><link rel="stylesheet" href="/'+ROOT+'/osce-fluid.css">'
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
