const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
const {clinicalFixtures}=require('./helpers/clinical-fixtures.cjs');
let browser,server,base;
before(async()=>{
 server=http.createServer(async(req,res)=>{try{const file=path.join(process.cwd(),decodeURIComponent(new URL(req.url,'http://local').pathname));res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();await new Promise(resolve=>server.close(resolve));});
function mock(){
 const user={id:'cir-test',email:'cir@example.test',user_metadata:{full_name:'Cirurgia'}};
 localStorage.setItem('master_auth_local_owner',user.id);const canvas=document.createElement('canvas');canvas.width=600;canvas.height=400;const ctx=canvas.getContext('2d');ctx.fillStyle='#284c54';ctx.fillRect(0,0,600,400);const fixture=canvas.toDataURL('image/png').split(',')[1];
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user}}}),getUser:async()=>({data:{user}}),onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(table){let columns='',key='';const query={select(c){columns=c;return query},order(){return query},contains(_,keys){key=keys[0];return query},eq(){return query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null}),then(resolve){const data=table==='lesson_images'?(columns==='keys'?[{keys:Array.from({length:12},(_,i)=>'pocus_m'+(i+1))}]:[...clinicalTestRows.filter(r=>r.keys.includes(key)),{id:key,caption:'Imagem sintética para teste',credit:'Fixture',mime:'image/png',data:fixture,marks:[{t:'Achado',x:50,y:50,lx:10,ly:10}]},{id:'pocussch_rush',caption:'Esquema que deve ser excluído',mime:'image/png',data:fixture,marks:[]}]):[];resolve({data,error:null});}};return query;}})};
}
async function open(viewport={width:1280,height:800},date){
 const context=await browser.newContext({viewport,timezoneId:'America/Sao_Paulo'});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock.toString()})()`}));
 if(date)await page.clock.install({time:new Date(date)});
 await page.route(/^https:\/\/(upload\.wikimedia\.org|cdn\.ncbi\.nlm\.nih\.gov)\//,r=>r.fulfill({contentType:'image/gif',body:Buffer.from('R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==','base64')}));
 await page.addInitScript(clinicalFixtures);
 await page.goto(base+'/MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/index.html');await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 return {page,close:async()=>{assert.deepEqual(errors,[]);await context.close();}};
}

test('POCUS prioriza imagens autenticadas nos doze módulos e separa os desenhos antigos',async()=>{
 const ids=[...(await fs.readFile('MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/pocus-course.js','utf8')).matchAll(/id:'(m\d+)'/g)].map(m=>m[1]);
 for(const width of [320,1440]){
  const t=await open({width,height:900}),p=t.page;await p.evaluate(()=>navigate('pocus'));
  for(let i=0;i<12;i++){
   await p.evaluate(i=>PocusCourse.open(i),i);
   const gallery=i<3?p.locator('[data-clinical-comparison]').first():p.locator('.pocus-real-study');await gallery.locator('img').first().waitFor({state:'attached'});
   assert.ok(await gallery.locator('.lesson-images figure').count()>=1);assert.doesNotMatch(await gallery.innerText(),/Esquema que deve ser excluído/);
   if(i>=3)assert.equal(await gallery.locator('[data-img-key]').getAttribute('data-img-key'),'pocus_'+ids[i]);
   assert.equal(await p.locator('.pocus-fig:visible').count(),0);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   if(i===3){await gallery.scrollIntoViewIfNeeded();await p.locator('.pocus-real-study .lesson-marks-toggle').first().click();assert.equal(await p.locator('.pocus-real-study .lesson-marks-toggle').first().getAttribute('aria-pressed'),'true');await gallery.locator('.lesson-image-open').first().click();assert.equal(await p.locator('.lesson-image-dialog').evaluate(d=>d.open),true);await p.keyboard.press('Escape');await p.screenshot({path:'work/pocus-real-'+width+'.png'});}
  }
  await p.evaluate(()=>PocusCourse.open(0));const block=p.locator('.pocus-schematic-practice');assert.equal(await block.getAttribute('open'),null);
  await block.locator(':scope > summary').click();assert.equal(await p.locator('.pocus-q-image:visible').count(),6);await p.locator('#pq-0-3 .pocus-q-opt').first().click();await p.locator('.pocus-done input').check();
  await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth')?.hidden);assert.equal(await p.evaluate(()=>store.study.pocus.quiz.m1_3),0);assert.equal(await p.evaluate(()=>store.study.pocus.done.m1),true);
  await t.close();
 }
});
