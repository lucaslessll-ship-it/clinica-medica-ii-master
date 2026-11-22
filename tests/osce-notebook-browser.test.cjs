'use strict';
const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const fs=require('node:fs/promises'),http=require('node:http'),path=require('node:path');
const ROOT='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
const scripts=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js',
'osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js',
'osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js',
'osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js',
'osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js',
'osce-visual-notes.js','osce-pilot.js'];
const initial=[
'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
'<link rel="stylesheet" href="/'+ROOT+'/osce.css"><link rel="stylesheet" href="/'+ROOT+'/notas.css">',
'<style>body{font:16px system-ui;background:#faf8f3;color:#17372c;margin:0;padding:20px}.btn{background:#fff;color:inherit;border:1px solid #ddd;border-radius:9px;padding:9px 12px}.page-header h1{font-size:27px}main{max-width:1050px;margin:auto}</style>',
'<script>',
'window.ui={route:"osce"};',
'window.__marks={};',
'window.HIG={',
' marcas(k){return window.__marks[k]||[]},',
' marcaAdd(k,m){(window.__marks[k]||(window.__marks[k]=[])).push(m);return m},',
' marcaEdita(k,id,v){const x=(window.__marks[k]||[]).find(m=>m.id===id);if(x)Object.assign(x,v);return x||null},',
' marcaRemove(k,id){const a=window.__marks[k]||[],i=a.findIndex(m=>m.id===id);if(i<0)return false;a.splice(i,1);return true},',
' registrarPaginaEstudo(k,v){window.__noteMeta={key:k,...v}},',
' saveNote(k,v){window.__generalNotes=window.__generalNotes||{};window.__generalNotes[k]=v}',
'};',
'window.render=()=>{document.querySelector("#main-content").innerHTML="<nav class=study-breadcrumb>OSCE</nav>"+window.OSCEPilot.page()};',
'</script>',
...scripts.map(f=>'<script src="/'+ROOT+'/'+f+'"></script>'),
'</head><body><main id="main-content"></main><script>render()</script><script src="/'+ROOT+'/notas.js"></script></body></html>'
].join('\n');
let server,base,browser;
before(async()=>{
 server=http.createServer(async(req,res)=>{
  const pathname=new URL(req.url,'http://127.0.0.1').pathname;
  if(pathname==='/notebook-harness'){res.setHeader('Content-Type','text/html;charset=utf-8');res.end(initial);return;}
  const file=path.resolve(process.cwd(),decodeURIComponent(pathname.slice(1)));
  if(!file.startsWith(process.cwd()+path.sep)){res.writeHead(403);res.end();return;}
  try{const data=await fs.readFile(file);res.setHeader('Content-Type',path.extname(file)==='.css'?'text/css':'text/javascript');res.end(data);}
  catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();await new Promise(resolve=>server?.close(resolve));});
test('OSCE: seleção → destaque → comentário → reaplicação após trocar estudo por simulador',async()=>{
 const context=await browser.newContext({viewport:{width:1024,height:800}});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/notebook-harness',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>OSCEPilot.preview(61));
 const shortcut=page.locator('#nota-atalho-pagina');
 await shortcut.waitFor();
 assert.match(await shortcut.innerText(),/Marca-texto e caderno/);
 await page.evaluate(()=>{
  const p=document.querySelector('.osce-case p');if(!p)throw Error('Vinheta clínica ausente');
  const r=document.createRange();r.selectNodeContents(p);
  window.getSelection().removeAllRanges();window.getSelection().addRange(r);
  document.dispatchEvent(new MouseEvent('mouseup',{bubbles:true}));
 });
 await page.locator('.nota-barra:not([hidden])').waitFor();
 await page.locator('.nota-barra [data-cor="amarelo"]').click();
 await page.locator('.nota-marca').first().waitFor();
 const key=await page.evaluate(()=>Notas.contextoAtual().chave);
 assert.equal(key,'estudo_osce_estacao_61');
 assert.equal(await page.evaluate(k=>window.__marks[k].length,key),1);
 await page.locator('.nota-marca').first().click();
 await page.locator('.nota-barra [data-acao="comentar"]').click();
 await page.locator('.nota-painel-entrada textarea').fill('Rever sinais de risco antes da prova');
 await page.locator('.nota-painel-entrada .nota-salvar').click();
 assert.match(await page.evaluate(k=>window.__marks[k][0].comentario,key),/Rever sinais/);
 await page.evaluate(()=>Notas.fecharCaixa());
 await page.evaluate(()=>OSCEPilot.start('essencial',null,61));
 await page.locator('.nota-marca').first().waitFor();
 assert.equal(await page.evaluate(()=>Notas.contextoAtual().chave),key);
 assert.deepEqual(errors,[]);
 await context.close();
});
