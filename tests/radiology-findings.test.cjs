const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const AxeBuilder=require('@axe-core/playwright').default;
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const A='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';let server,browser,base,records;
before(async()=>{
 records=JSON.parse(await fs.readFile('docs/radiologia-achados.json','utf8'));
 server=http.createServer(async(req,res)=>{
  try{const name=new URL(req.url,'http://local').pathname;if(name==='/fixture'){res.setHeader('Content-Type','text/html');res.end(`<html lang="pt-BR"><head><title>Teste de marcações</title><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/${A}/tokens.css"><link rel="stylesheet" href="/${A}/lesson-deep.css"></head><body style="margin:16px;background:#fffdf8;color:#183934"><main style="max-width:960px;margin:auto"><h1>Imagens para teste da interface</h1><div id="gallery"></div></main><script src="/${A}/lesson-images.js"></script><script>document.getElementById('gallery').innerHTML=LessonImages.slot('rad_fixture');</script></body></html>`);return;}
   const file=path.join(process.cwd(),process.env.MASTER_TEST_DIST?'dist':'',decodeURIComponent(name));res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(await fs.readFile(file));
  }catch{res.writeHead(404);res.end();}
 });await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium'});
});
after(async()=>{await browser?.close();await new Promise(r=>server?.close(r));});
async function open(width=820){
 const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await context.addInitScript(records=>{
  // Technical portrait fixture, without diagnostic content or copied exam pixels.
  const canvas=document.createElement('canvas');canvas.width=400;canvas.height=800;const ctx=canvas.getContext('2d');ctx.fillStyle='#142c32';ctx.fillRect(0,0,400,800);ctx.fillStyle='#79bda5';ctx.fillRect(80,240,240,100);const data=canvas.toDataURL('image/png').split(',')[1];
  const rows=records.map(r=>({...r,keys:['rad_fixture'],caption:r.caption||'Figura sintética para testar marcações',mime:'image/png',data}));
  let user={id:'findings-fixture'};const client={from(){let columns;const q={select(c){columns=c;return q},contains(){return q},order(){return q},then(resolve){resolve({data:columns==='keys'?[{keys:['rad_fixture']}]:rows,error:null});}};return q;}};
  window.MASTER_AUTH={user:()=>user,client:()=>client};window.endFixture=()=>{user=null;window.dispatchEvent(new Event('master-auth-ended'));};
 },records);
 await page.goto(base+'/fixture');await page.waitForFunction(n=>document.querySelectorAll('.lesson-marks-toggle').length===n,records.length);
 return {page,close:async()=>{assert.deepEqual(errors,[]);await context.close();}};
}
test('todas as 76 figuras cadastradas têm achados; as 54 novas possuem explicações por marcação',()=>{
 assert.equal(records.length,76);assert.equal(new Set(records.map(r=>r.id)).size,76);
 const added=records.filter(r=>r.marks.every(m=>m.d));assert.equal(added.length,54);
 for(const r of records){assert.ok(r.marks.length);assert.ok(r.keys.some(k=>k.startsWith('rad_')||k.startsWith('cirrad')));for(const m of r.marks){assert.ok(m.t);if(m.d)assert.ok(m.d.length>50);if(m.x!=null){assert.ok(m.x>=0&&m.x<=100);assert.ok(m.y>=0&&m.y<=100);}else assert.equal(m.e.length,4);}}
 assert.match(records.find(r=>r.id==='vasc18').caption,/pediátrico/);assert.match(records.find(r=>r.id==='rad_mm_pelve').caption,/não representa o aspecto lítico clássico/);
});
test('mostrar, focar e ocultar achados com legenda; dialog mantém controles e proporção em todas as telas',async()=>{
 for(const width of [320,820,1280]){
  const {page:p,close}=await open(width),figure=p.locator('.lesson-images figure').first(),toggle=figure.locator('.lesson-marks-toggle');
  assert.equal(await figure.locator('.lesson-marks').evaluate(el=>el.hidden),true);assert.equal(await figure.locator('.lesson-findings').evaluate(el=>el.hidden),true);
  await toggle.click();assert.equal(await toggle.getAttribute('aria-expanded'),'true');assert.equal(await figure.locator('.lesson-findings').evaluate(el=>el.hidden),false);
  const n=records[0].marks.length;assert.equal(await figure.locator('.lesson-mark-label').count(),n);assert.equal(await figure.locator('.lesson-finding-focus').count(),n);
  const proportions=await figure.locator('img').evaluate(async img=>{await img.decode();const box=img.getBoundingClientRect(),surface=img.closest('.lesson-image-surface').getBoundingClientRect();return {ratio:box.width/box.height,natural:img.naturalWidth/img.naturalHeight,diff:Math.abs(surface.width-box.width)+Math.abs(surface.height-box.height)};});assert.ok(Math.abs(proportions.ratio-proportions.natural)<.01,JSON.stringify(proportions));assert.ok(proportions.diff<2,JSON.stringify(proportions));
  await figure.locator('[data-finding="0"]').click();assert.equal(await figure.locator('[data-finding="0"]').getAttribute('aria-pressed'),'true');assert.ok(await figure.locator('.is-muted').count()>0);await figure.locator('[data-finding="0"]').click();assert.equal(await figure.locator('.is-muted').count(),0);
  await figure.locator('.lesson-image-open').click();const dialog=p.locator('.lesson-image-dialog[open]');await dialog.waitFor();assert.equal(await dialog.locator('.lesson-findings').evaluate(el=>el.hidden),false);
  await dialog.getByRole('button',{name:'Ocultar achados',exact:true}).click();assert.equal(await dialog.locator('.lesson-findings').evaluate(el=>el.hidden),true);
  await dialog.getByRole('button',{name:'Mostrar achados',exact:true}).click();await dialog.locator('[data-finding="0"]').click();assert.ok(await dialog.locator('.is-muted').count()>0);
  if(width===820){await fs.mkdir('work',{recursive:true});await p.screenshot({path:'work/radiologia-achados-dialog.png'});const audit=await new AxeBuilder({page:p}).include('.lesson-image-dialog[open]').withTags(['wcag2a','wcag2aa']).analyze();assert.deepEqual(audit.violations.map(v=>({id:v.id,impact:v.impact})),[]);}
  await p.keyboard.press('Escape');assert.equal(await p.locator('.lesson-image-dialog[open]').count(),0);await toggle.click();assert.equal(await figure.locator('.lesson-marks').evaluate(el=>el.hidden),true);
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.evaluate(()=>window.endFixture());assert.equal(await p.locator('.lesson-images img').count(),0);assert.equal(await p.locator('.lesson-image-dialog').count(),0);await close();
 }
});
