const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
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
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user}}}),getUser:async()=>({data:{user}}),onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(table){let columns='',key='';const query={select(c){columns=c;return query},order(){return query},contains(_,keys){key=keys[0];return query},eq(){return query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null}),then(resolve){const data=table==='lesson_images'?(columns==='keys'?[{keys:Array.from({length:8},(_,i)=>'rad_m'+(i+2))}]:[{id:key,caption:'Imagem sintética para teste',credit:'Fixture',mime:'image/png',data:fixture,marks:[{t:'Achado',x:50,y:50,lx:10,ly:10}]}]):[];resolve({data,error:null});}};return query;}})};
}
async function open(viewport={width:1280,height:800},date){
 const context=await browser.newContext({viewport,timezoneId:'America/Sao_Paulo'});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock.toString()})()`}));
 if(date)await page.clock.install({time:new Date(date)});
 await page.goto(base+'/MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/index.html');await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 return {page,close:async()=>{assert.deepEqual(errors,[]);await context.close();}};
}

test('Radiologia: nove módulos, questões, imagens privadas e persistência no celular e desktop',async()=>{
 for(const width of [320,1440]){
  const t=await open({width,height:900}),p=t.page;
  await p.evaluate(()=>navigate('rad'));assert.equal(await p.locator('.pocus-card').count(),9);
  assert.equal(await p.evaluate(()=>RadCourse.modules()),9);assert.equal(await p.evaluate(()=>RadCourse.cases()),9);
  for(let i=0;i<9;i++){
   await p.evaluate(i=>RadCourse.open(i),i);
   assert.equal(await p.locator('.pocus-q').count(),3);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   if(i>0){await p.locator('.lesson-images:not([hidden]) img').waitFor({state:'attached'});assert.equal(await p.locator('[data-img-key]').getAttribute('data-img-key'),'rad_m'+(i+1));}
   await p.locator('.pocus-q-opt').first().click();assert.equal(await p.locator('.pocus-q-why').count(),1);
  }
  await p.locator('.pocus-done input').check();
  await p.evaluate(()=>RadCourse.bank());assert.equal(await p.locator('.pocus-card').count(),9);
  await p.evaluate(()=>RadCourse.caseOpen(0));await p.locator('.pocus-script summary').click();assert.ok(await p.locator('.pocus-script li').count()>=3);await p.locator('.pocus-done input').check();
  await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
  assert.equal(await p.evaluate(()=>store.study.rad.done.m9),true);assert.equal(await p.evaluate(()=>store.study.rad.seen.c1),true);
  await p.evaluate(()=>{navigate('rad');RadCourse.open(1)});await p.locator('.lesson-image-open').click();assert.equal(await p.locator('.lesson-image-dialog').evaluate(d=>d.open),true);await p.keyboard.press('Escape');
  await p.evaluate(()=>RadCourse.open(null));await p.screenshot({path:'work/radiology-'+width+'.png',fullPage:false});
  await t.close();
 }
});
test('Radiologia entra na navegação e na pesquisa, sem alterar cursos existentes',async()=>{
 const t=await open({width:1440,height:900}),p=t.page;
 await p.locator('.nav-destination').filter({hasText:'Radiologia'}).click();assert.equal(await p.evaluate(()=>ui.route),'rad');
 assert.equal(await p.evaluate(()=>RadCourse.searchItems().length),18);
 await p.locator('.search-trigger').click();await p.locator('#global-search').fill('Tórax normal');assert.match(await p.locator('#hig-dialog-content').textContent(),/Tórax normal/);await p.keyboard.press('Escape');
 for(const [route,global] of [['hemo','HemoCourse'],['atb','AtbCourse'],['ecg','ECGCourse']]){await p.evaluate(r=>navigate(r),route);assert.ok(await p.locator('#main-content h1').count());assert.ok(await p.evaluate(g=>window[g].modules()>0,global));}
 await t.close();
});
