const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
const A='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
let browser,server,base,manifest;
before(async()=>{
 manifest=JSON.parse(await fs.readFile('docs/cirurgia-radiologia-imagens-2026-11.json','utf8'));
 server=http.createServer(async(req,res)=>{try{const file=path.join(process.cwd(),process.env.MASTER_TEST_DIST?'dist':'',decodeURIComponent(new URL(req.url,'http://local').pathname));res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium'});
});
after(async()=>{await browser?.close();await new Promise(resolve=>server?.close(resolve));});
async function open(width){
 const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 // Synthetic pixel validates gallery behavior only, never diagnostic appearance.
 await context.addInitScript(({records})=>{
  const user={id:'cirrad-fixture',email:'cirrad@example.test',user_metadata:{full_name:'Teste'}};
  localStorage.setItem('master_auth_local_owner',user.id);
  localStorage.setItem('master_cir_lucas_v1',JSON.stringify({completed:{cirrad_0:true},notes:{cirrad_0:'Anotação preservada'}}));
  const pixel='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII=';
  window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user}}}),getUser:async()=>({data:{user}}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}}),signOut:async()=>({error:null})},from(table){let filter;const result=()=>({data:table==='lesson_images'?records.filter(r=>!filter||r.keys.includes(filter)).map(r=>({...r,data:pixel,mime:'image/png',credit:'Imagem sintética de teste'})):[],error:null});const q={select(){return q},contains(field,keys){filter=keys[0];return q},order(){return q},eq(){return q},range:async()=>result(),then(ok,fail){return Promise.resolve(result()).then(ok,fail)},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null})};return q;}})};
 },{records:manifest});
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',r=>r.fulfill({contentType:'text/javascript',body:''}));
 await page.goto(base+'/'+A+'/index.html');await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 return {context,page,errors};
}
test('seleção cobre as oito aulas sem publicar os originais ou dados institucionais',async()=>{
 assert.equal(manifest.length,28);assert.equal(new Set(manifest.map(r=>r.topic)).size,8);assert.equal(new Set(manifest.map(r=>r.id)).size,28);
 for(const r of manifest){assert.match(r.sha256,/^[a-f0-9]{64}$/);assert.ok(r.caption.length>120);assert.equal(r.keys.length,1);assert.match(r.keys[0],/^cirrad_media_/);assert.equal('data' in r,false);assert.equal('file' in r,false);}
 const source=await fs.readFile(A+'/lesson-deep-cir-radiologia.js','utf8');assert.doesNotMatch(source,/data:image|base64|professor|instituição|1366x768/i);
});
test('imagens contextuais, ampliação, evocação e enquadramento em celular, iPad e desktop',async()=>{
 for(const width of [320,820,1280]){
  const {context,page:p,errors}=await open(width);
  const chapterNames=await p.evaluate(()=>CIR.topics.find(t=>t.id==='cirrad').chapters.map(c=>c.name));assert.equal(chapterNames.length,10);assert.match(chapterNames[4],/Esôfago/);assert.match(chapterNames[6],/Fígado/);
  let total=0;
  for(const index of [0,1,2,3,6,7,8,9]){
   await p.evaluate(index=>CIR.openTopic('cirrad',index),index);
   await p.locator(`.deep-lesson[data-lesson-key="cirrad_${index}"]`).waitFor();
   const expected=await p.locator('[data-img-key^="cirrad_media_"]').evaluateAll(nodes=>nodes.map(n=>n.dataset.imgKey));assert.ok(expected.length);
   const count=manifest.filter(r=>expected.some(key=>r.keys.includes(key))).length;
   await p.waitForFunction(count=>document.querySelectorAll('[data-img-key^="cirrad_media_"] img').length===count,count);
   total+=count;
   assert.equal(await p.locator('[data-img-key^="cirrad_media_"]:visible').count(),expected.length,`hidden gallery ${index}`);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overflow ${width}:cirrad_${index}`);
   const text=await p.locator('.deep-lesson').innerText();assert.doesNotMatch(text,/undefined|\[object Object\]/);
   if(index>=6){assert.equal(await p.locator('.deep-case').count(),2);assert.ok(await p.locator('.deep-recall').count()>=8);}
  }
  assert.equal(total,28);
  const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem(CIR.KEY)));assert.equal(saved.completed.cirrad_0,true);assert.equal(saved.notes.cirrad_0,'Anotação preservada');
  await p.locator('[data-img-key^="cirrad_media_"] .lesson-image-open').first().click();await p.locator('.lesson-image-dialog[open]').waitFor();assert.ok(await p.locator('.lesson-image-dialog img').getAttribute('alt'));
  await p.keyboard.press('Escape');assert.equal(await p.locator('.lesson-image-dialog[open]').count(),0);
  await p.locator('.deep-recall summary').first().click();assert.equal(await p.locator('.deep-recall[open]').count(),1);
  await p.evaluate(()=>window.dispatchEvent(new Event('master-auth-ended')));assert.equal(await p.locator('[data-img-key] img').count(),0);
  assert.deepEqual(errors,[]);await context.close();
 }
});
