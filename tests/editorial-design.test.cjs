const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const AxeBuilder=require('@axe-core/playwright').default;
const http=require('node:http');const fs=require('node:fs/promises');const path=require('node:path');
const APP='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
let server,browser,base;
before(async()=>{
 await fs.access('dist/'+APP+'/index.html');
 server=http.createServer(async(req,res)=>{try{const name=path.join(process.cwd(),'dist',new URL(req.url,'http://local').pathname);res.setHeader('Content-Type',name.endsWith('.js')?'text/javascript':name.endsWith('.css')?'text/css':name.endsWith('.json')?'application/json':'text/html');res.end(await fs.readFile(name));}catch{res.writeHead(404);res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();if(server)await new Promise(r=>server.close(r));});
function mock(){const user={id:'optimization-fixture',email:'student@example.test',user_metadata:{full_name:'Estudante'}};localStorage.setItem('master_auth_local_owner',user.id);window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user,access_token:'fixture'}}}),getUser:async()=>({data:{user}}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}})},from(table){const q={select(){return q},eq(){return q},order(){return q},contains(){return q},maybeSingle:async()=>({data:{policy_version:'2026-11-08'}}),upsert:async()=>({error:null}),then(resolve){resolve({data:[],error:null})}};return q}})}};
async function open(){const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',timezoneId:'America/Sao_Paulo'});const page=await context.newPage();await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',r=>r.fulfill({contentType:'text/javascript',body:`(${mock.toString()})()`}));await page.route('https://cdn.jsdelivr.net/npm/minisearch@7.2.0/**',r=>r.abort());await page.goto(base+'/'+APP+'/index.html');await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);return {page,context};}
test('editorial covers all study areas in light/dark and phone/tablet/desktop without overflow',async()=>{
 const {page:p,context}=await open(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 const routes=['dashboard','topics','topic','p1','p1topic','cirp1','cirp2','cirtopic','emergency','practice','exam','cases','oral','flashcards','notes','prescriptions','pocus','ecg','hemo','rad','atb','labmaster','labrenal','labferro','micro','banca','decisionlab','today','sources'];
 for(const width of [320,820,1440]){
  await p.setViewportSize({width,height:900});
  for(const theme of ['light','dark']){
   await p.evaluate(t=>HIG.setTheme(t),theme);
   for(const route of routes){await p.evaluate(async r=>{navigate(r);await window.RouteAssets?.ensure(r);},route);await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
    const v=await p.evaluate(()=>({background:getComputedStyle(document.body).backgroundColor,overflow:document.documentElement.scrollWidth-innerWidth,text:document.querySelector('main').textContent.length}));
    assert.equal(v.background,theme==='light'?'rgb(247, 244, 238)':'rgb(17, 31, 28)',route);assert.ok(v.overflow<=1,width+' '+theme+' '+route+' overflow '+v.overflow);assert.ok(v.text>10,route);
   }
  }
 }
 assert.deepEqual(errors,[]);await context.close();
});
test('editorial resume uses real topic completion, retains exact chapter and has no duplicate timer',async()=>{
 const {page:p,context}=await open();
 assert.match(await p.locator('.ed-resume h2').innerText(),/Seu próximo capítulo/);
 await p.locator('.ed-resume-action').click();assert.equal(await p.locator('#subjects-search').evaluate(el=>el===document.activeElement),true);
 await p.evaluate(async()=>{await RouteAssets.ensure('topic');store.completed.neuro2_0=true;stateSave();openTopic('neuro2');switchChapter(1);navigate('dashboard');});
 assert.equal(await p.locator('.ed-resume-progress>span').innerText(),await p.evaluate(()=>`1/${getTopic('neuro2').chapters.length} aulas revisadas`));
 await p.locator('.ed-resume-action').click();assert.deepEqual(await p.evaluate(()=>[ui.topic,ui.chapter]),['neuro2',1]);
 await p.evaluate(async()=>{await RouteAssets.ensure('p1topic');P1.openTopic('p1inf');P1.chapter(2);navigate('dashboard');});await p.locator('.ed-resume-action').click();assert.equal(await p.evaluate(()=>P1.getBackup().lastChapter),2);
 assert.equal(await p.locator('.topbar .ai-tutor-dock').count(),1);assert.equal(await p.locator('#focus-float').isVisible(),false);assert.equal(await p.locator('#focus-top').isVisible(),true);
 await p.evaluate(()=>{FocusTimer.floating(true);FocusTimer.expand();});assert.equal(await p.locator('#focus-float').isVisible(),true);assert.equal(await p.locator('#focus-top').isVisible(),false);await p.evaluate(()=>FocusTimer.floating(false));assert.equal(await p.locator('#focus-top').isVisible(),true);
 await context.close();
});
test('editorial representative tools and lessons meet axe contrast and semantic checks in both themes',async()=>{
 const {page:p,context}=await open();
 for(const theme of ['light','dark']){
  await p.evaluate(t=>HIG.setTheme(t),theme);
  for(const route of ['topics','practice','notes','labmaster','banca','emergency','cirp1']){
   await p.evaluate(async r=>{navigate(r);await window.RouteAssets?.ensure(r);},route);
   const r=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   await fs.mkdir('work/editorial-a11y',{recursive:true});await fs.writeFile('work/editorial-a11y/'+theme+'-'+route+'.json',JSON.stringify(r.violations,null,2));
   assert.deepEqual(r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],theme+' '+route);
  }
 }
 await context.close();
});
test('expanded tablet sidebar and larger reading text keep header and controls inside viewport',async()=>{
 const {page:p,context}=await open();
 for(const width of [801,820,1024,1180]){
  await p.setViewportSize({width,height:820});await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  await p.evaluate(()=>{if(document.body.classList.contains('side-collapsed'))HIG.toggleSidebar();HIG.setFont('large');navigate('dashboard');});
  const v=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,buttons:[...document.querySelectorAll('.topbar button')].filter(b=>b.getClientRects().length&&getComputedStyle(b).visibility!=='hidden').map(b=>({name:b.getAttribute('aria-label')||b.textContent,box:b.getBoundingClientRect().toJSON()}))}));
  assert.ok(v.overflow<=1,width+' global overflow '+v.overflow);
  for(const b of v.buttons)assert.ok(b.box.x>=0&&b.box.right<=width+1,width+' '+b.name+' outside viewport');
 }
 await context.close();
});
test('editorial mobile bar opens notebook and profile, while search stays reachable in the header',async()=>{
 const {page:p,context}=await open();await p.setViewportSize({width:320,height:740});
 assert.deepEqual(await p.locator('#mobile-tabbar button').allTextContents(),['Início','Matérias','Praticar','Caderno','Perfil']);
 await p.locator('#mobile-tabbar [data-tab=notes]').click();assert.equal(await p.evaluate(()=>ui.route),'notes');
 await p.locator('#mobile-tabbar [data-tab=profile]').click();await p.locator('#master-profile').waitFor({state:'visible'});await p.keyboard.press('Escape');
 await p.locator('.topbar .search-trigger').click();await p.locator('#global-search').waitFor({state:'visible'});await p.keyboard.press('Escape');
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);await context.close();
});
