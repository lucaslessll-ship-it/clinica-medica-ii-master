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
 const user={id:'pocus-test',email:'pocus@example.test',user_metadata:{full_name:'Curso'}};
 localStorage.setItem('master_auth_local_owner',user.id);
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user}}}),getUser:async()=>({data:{user}}),onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(table){const query={select(){return query},eq(){return table==='master_progress'?Promise.resolve({data:[],error:null}):query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null})};return query;}})};
}
async function open(viewport={width:1280,height:800}){
 const context=await browser.newContext({viewport});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock.toString()})()`}));
 await page.goto(base+'/MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/index.html');await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 return {page,close:async()=>{assert.deepEqual(errors,[]);await context.close();}};
}
const fits=p=>p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1);

test('lesson tabs wrap without horizontal scrolling and keep the active tab readable',async()=>{
 for(const viewport of [{width:390,height:844},{width:1280,height:800}]){
  const t=await open(viewport),p=t.page;await p.evaluate(()=>openTopic('reuma2'));
  const nav=await p.locator('.chapter-nav').evaluate(el=>({scroll:el.scrollWidth,client:el.clientWidth,overflow:getComputedStyle(el).overflowX}));
  assert.ok(nav.scroll<=nav.client+1,JSON.stringify(nav));assert.equal(nav.overflow,'visible');
  const contrast=await p.locator('.chapter-pill.current').evaluate(el=>{const lum=c=>{const v=c.match(/\d+/g).slice(0,3).map(Number).map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*v[0]+.7152*v[1]+.0722*v[2]};const s=getComputedStyle(el),a=lum(s.color),b=lum(s.backgroundColor);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)});
  assert.ok(contrast>=4.5,`active tab contrast ${contrast}`);assert.ok(await fits(p));await t.close();
 }
});
test('POCUS course lists eight modules, renders annotated figures and saves answers and completion',async()=>{
 const t=await open(),p=t.page;await p.evaluate(()=>navigate('pocus'));
 assert.equal(await p.locator('.pocus-card').count(),8);assert.equal(await p.locator('#pocus-note').count(),1);
 for(let i=0;i<8;i++){
  await p.evaluate(i=>PocusCourse.open(i),i);
  assert.ok(await p.locator('.pocus-q').count()>=3,`module ${i+1} questions`);assert.ok(await p.locator('.pocus-refs a').count()>=1,`module ${i+1} sources`);assert.ok(await fits(p),`module ${i+1} overflow`);
  assert.equal(await p.locator('.pocus-fig').evaluateAll(list=>list.every(f=>f.querySelector('svg[role=img]')&&f.querySelector('figcaption small'))),true);
 }
 assert.ok(await p.evaluate(()=>PocusFigures.names.every(n=>PocusFigures.render(n).includes('<svg'))));
 await p.evaluate(()=>PocusCourse.open(3));assert.ok(await p.locator('.pocus-fig').count()>=4);
 await p.locator('#pq-3-1 .pocus-q-opt').nth(2).click();assert.match(await p.locator('#pq-3-1 .pocus-q-why').textContent(),/Correto/);
 await p.locator('.pocus-module .pocus-done input').check();
 await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.evaluate(()=>navigate('pocus'));
 assert.match(await p.locator('.pocus-progress-head').textContent(),/1 de 8/);assert.equal(await p.locator('.pocus-card.done').count(),1);
 await p.setViewportSize({width:390,height:844});await p.evaluate(()=>PocusCourse.open(5));assert.ok(await fits(p));await t.close();
});
test('floating pomodoro can be dragged, expanded, cancelled with confirmation and remembers its place',async()=>{
 const t=await open(),p=t.page;assert.equal(await p.locator('#focus-top svg.tomato').count(),1);
 const before=await p.locator('#focus-float').boundingBox(),grip=await p.locator('.focus-float-grip').boundingBox();
 await p.mouse.move(grip.x+10,grip.y+20);await p.mouse.down();await p.mouse.move(400,300,{steps:6});await p.mouse.up();
 const moved=await p.locator('#focus-float').boundingBox();assert.ok(Math.abs(moved.x-before.x)>100&&Math.abs(moved.y-before.y)>100,JSON.stringify({before,moved}));
 assert.equal(await p.locator('#hig-overlay').isVisible(),false);
 await p.locator('.focus-float-size').click();await p.locator('[data-focus-float-toggle]').click();await p.waitForFunction(()=>FocusTimer.status().running);
 await p.locator('.focus-float-cancel').click();assert.equal(await p.evaluate(()=>FocusTimer.status().running),true);
 await p.locator('.focus-float-cancel').click();assert.equal(await p.evaluate(()=>FocusTimer.status().running),false);assert.equal(await p.evaluate(()=>FocusTimer.status().remainingMs),1500000);
 await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.waitForTimeout(200);
 const kept=await p.locator('#focus-float').boundingBox();assert.ok(Math.abs(kept.y-moved.y)<3,JSON.stringify({moved,kept}));
 await p.setViewportSize({width:390,height:700});await p.waitForTimeout(100);const small=await p.locator('#focus-float').boundingBox();assert.ok(small.x>=0&&small.x+small.width<=391,JSON.stringify(small));
 await p.locator('.focus-float-grip').focus();await p.keyboard.press('Home');await t.close();
});
test('deep study block renders on the pilot lesson with flowchart, recall and sources',async()=>{
 const t=await open(),p=t.page;await p.evaluate(()=>{navigate('p1');P1.openTopic('p1arr');});
 assert.equal(await p.locator('.deep-lesson').count(),1);assert.ok(await p.locator('.deep-flow > li').count()>=6);assert.ok(await p.locator('.deep-recall').count()>=5);assert.ok(await p.locator('.deep-refs a[href^="https://doi.org/"]').count()>=2);
 await p.locator('.deep-recall summary').first().click();assert.equal(await p.locator('.deep-recall').first().evaluate(el=>el.open),true);
 await p.evaluate(()=>P1.chapter(1));assert.equal(await p.locator('.deep-lesson').count(),1);
 await p.setViewportSize({width:390,height:844});await p.evaluate(()=>P1.chapter(0));assert.ok(await fits(p));await t.close();
});
test('every P2 lesson has a complete deep study block that fits small screens',async()=>{
 const t=await open({width:390,height:844}),p=t.page;
 const lessons=await p.evaluate(()=>TOPICS.flatMap(x=>x.chapters.map((_,i)=>[x.id,i])));assert.equal(lessons.length,22);
 for(const [id,i] of lessons){
  await p.evaluate(([id,i])=>{openTopic(id);switchChapter(i);},[id,i]);
  const info=await p.evaluate(()=>{const d=document.querySelector('.deep-lesson');return d&&{pre:d.querySelectorAll('.deep-pretest li').length,flow:d.querySelectorAll('.deep-flow > li').length,recall:d.querySelectorAll('.deep-recall').length,refs:d.querySelectorAll('.deep-refs a[href^="https://"]').length,mn:d.querySelectorAll('.deep-mnemonics dt').length,fit:document.documentElement.scrollWidth<=innerWidth+1}});
  assert.ok(info,`${id}_${i} missing`);assert.ok(info.pre>=4&&info.flow>=6&&info.recall>=5&&info.refs>=2&&info.mn>=3&&info.fit,`${id}_${i} ${JSON.stringify(info)}`);
 }
 await t.close();
});
test('every P1 lesson has a complete deep study block that fits small screens',async()=>{
 const t=await open({width:390,height:844}),p=t.page;await p.evaluate(()=>navigate('p1'));
 const lessons=await p.evaluate(()=>P1.topics.flatMap(x=>x.chapters.map((_,i)=>[x.id,i])));assert.equal(lessons.length,32);
 for(const [id,i] of lessons){
  await p.evaluate(([id,i])=>{P1.openTopic(id);P1.chapter(i);},[id,i]);
  const info=await p.evaluate(()=>{const d=document.querySelector('.deep-lesson');return d&&{pre:d.querySelectorAll('.deep-pretest li').length,flow:d.querySelectorAll('.deep-flow > li').length,recall:d.querySelectorAll('.deep-recall').length,refs:d.querySelectorAll('.deep-refs a[href^="https://"]').length,mn:d.querySelectorAll('.deep-mnemonics dt').length,fit:document.documentElement.scrollWidth<=innerWidth+1}});
  assert.ok(info,`${id}_${i} missing`);assert.ok(info.pre>=4&&info.flow>=6&&info.recall>=5&&info.refs>=2&&info.mn>=3&&info.fit,`${id}_${i} ${JSON.stringify(info)}`);
 }
 await t.close();
});
test('topic head is single, outline lists deep sections, pretest and recall are interactive and due reviews reach the dashboard',async()=>{
 const t=await open(),p=t.page;await p.evaluate(()=>{navigate('p1');P1.openTopic('p1arr');});
 assert.equal(await p.locator('.topic-head').count(),1);assert.equal(await p.locator('.topic-banner').count(),0);assert.equal(await p.locator('#main-content h1').count(),1);
 assert.ok(await p.locator('.reading-outline-links button.sub').count()>=8);assert.equal(await p.locator('.reading-outline').evaluate(el=>getComputedStyle(el).position),'sticky');
 await p.locator('.deep-pre-btns button[data-v="0"]').first().click();assert.match(await p.locator('.deep-pre-out').textContent(),/1 de \d+ marcadas/);
 await p.locator('[data-deep-act=hy]').click();assert.equal(await p.locator('.deep-pretest').isVisible(),false);assert.equal(await p.locator('.deep-flow').isVisible(),true);await p.locator('[data-deep-act=hy]').click();
 await p.locator('.deep-recall summary').first().click();await p.locator('.deep-rate button[data-v="0"]').first().click();
 assert.equal(await p.locator('.deep-recall-due').first().textContent(),'revisar amanhã');
 assert.equal(await p.evaluate(()=>LearnUX.dueList().length),0);assert.equal(await p.evaluate(()=>LearnUX.streak()),1);
 await p.evaluate(()=>{const r=store.study.deep.recall;Object.keys(r).forEach(k=>r[k].d='2026-01-01');stateSave();navigate('dashboard');});
 assert.match(await p.locator('.dash-today').textContent(),/1pergunta para revisar/);
 await p.locator('.dash-today .btn').click();await p.waitForFunction(()=>document.activeElement?.closest('[data-recall="p1arr_0#0"]'));
 assert.equal(await p.locator('[data-recall="p1arr_0#0"] .deep-recall-due').textContent(),'revisar hoje');
 await p.evaluate(()=>navigate('dashboard'));assert.equal(await p.locator('.subject-card[data-area]').count(),16);
 await p.evaluate(()=>HIG.openSearch());await p.locator('#global-search').fill('alternar tema');assert.match(await p.locator('#search-results').textContent(),/Alternar tema claro e escuro/);await p.keyboard.press('Escape');
 await p.setViewportSize({width:390,height:844});await p.waitForTimeout(100);assert.equal(await p.locator('#focus-float').isVisible(),false);assert.equal(await p.locator('#mobile-tabbar svg').count(),5);await t.close();
});
