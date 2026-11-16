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
test('built site loads courses on demand, retries network failure and preserves navigation',async()=>{
 const {page:p,context}=await open();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 assert.equal(await p.evaluate(()=>typeof window.ECGCourse),'undefined');
 await p.route('**/ecg-course.js*',r=>r.abort());await p.evaluate(()=>navigate('ecg'));await p.getByRole('button',{name:'Tentar novamente',exact:true}).waitFor();
 await p.unroute('**/ecg-course.js*');await p.getByRole('button',{name:'Tentar novamente',exact:true}).click();await p.waitForFunction(()=>!!window.ECGCourse&&document.querySelector('#main-content h1'));
 for(const [route,name] of [['hemo','HemoCourse'],['atb','AtbCourse'],['rad','RadCourse']]){await p.evaluate(route=>navigate(route),route);await p.waitForFunction(name=>!!window[name],name);}
 for(const [route,open] of [['topic',()=>openTopic('gastro')],['p1topic',()=>P1.openTopic('p1arr')],['cirtopic',()=>CIR.openTopic('ciraa',0)]]){
  await p.evaluate('('+open.toString()+')()');await p.waitForFunction(route=>RouteAssets.ready(route),route);await p.waitForFunction(()=>!!document.querySelector('#main-content h1'));assert.ok(await p.locator('.deep-section, .deep-study, .lesson-deep').count()||await p.evaluate(()=>LessonDeep.keys().length>1));
 }
 assert.deepEqual(errors,[]);await context.close();
});
test('FSRS survives JSON sync, adapts to ratings and keeps legacy history',async()=>{
 const {page:p,context}=await open();const result=await p.evaluate(()=>{
 const now=new Date('2026-11-16T15:00:00Z');const high=MasterScheduler.next(null,{correct:true,confidence:'Alta',now}),low=MasterScheduler.next(null,{correct:true,confidence:'Baixa',now}),help=MasterScheduler.next(null,{correct:true,helped:true,now});
 store.study={reviews:{0:{due:'2026-11-15',attempts:4,level:2}},steps:{kept:true}};Study.record(0,QUESTION_BANK[0].a,'Média',false,now);const first=JSON.parse(JSON.stringify(store.study.reviews[0]));const later=new Date(first.fsrs.due);Study.record(0,QUESTION_BANK[0].a,'Alta',false,later);return {high,low,help,first,second:store.study.reviews[0],kept:store.study.steps.kept};
 });assert.ok(Date.parse(result.high.due)>Date.parse(result.low.due));assert.ok(Date.parse(result.help.due)<=Date.parse(result.low.due));assert.equal(result.first.attempts,5);assert.equal(result.second.attempts,6);assert.equal(result.second.fsrs.reps,2);assert.equal(result.kept,true);await context.close();
});
test('typed memorization question uses the open lesson instead of unrelated search',async()=>{
 const {page:p,context}=await open();let sent;
 await p.route('**/functions/v1/ai-tutor',async r=>{sent=r.request().postDataJSON();await r.fulfill({contentType:'application/json',body:JSON.stringify({answer:'Dica de estudo: revisão.',remaining:39})});});
 await p.evaluate(()=>{openTopic('gastro');ui.chapter=0;render();});await p.locator('.ai-tutor-launch').click();await p.locator('#ai-tutor-question').fill('Me dê uma dica para memorizar esse conteúdo');await p.locator('.ai-tutor-send').click();await p.waitForFunction(()=>document.querySelector('.ai-tutor-status').textContent.includes('39 perguntas'));
 assert.ok(sent.blocks.every(b=>b.id.startsWith('gastro_0:')));assert.equal(sent.question,'Me dê uma dica para memorizar esse conteúdo');await context.close();
});
test('axe audits built mobile home, study controls, course and assistant',async()=>{
 const {page:p,context}=await open();
 for(const route of ['dashboard','practice','ecg']){await p.evaluate(route=>navigate(route),route);if(route==='ecg')await p.waitForFunction(()=>!!window.ECGCourse);const result=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();await fs.mkdir('work',{recursive:true});await fs.writeFile('work/axe-'+route+'.json',JSON.stringify(result.violations,null,2));assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],route);}
 await p.locator('.ai-tutor-launch').click();const result=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],'assistant');await context.close();
});

test('global search loads course entries even before the first course visit',async()=>{
 const {page:p,context}=await open();assert.equal(await p.evaluate(()=>typeof window.ECGCourse),'undefined');await p.evaluate(()=>HIG.openSearch());assert.equal(await p.evaluate(()=>['ECGCourse','HemoCourse','AtbCourse','RadCourse'].every(name=>!!window[name])),true);await p.locator('#global-search').fill('ECG');await p.locator('#search-results button').first().waitFor();await context.close();
});

test('Laboratório Master built catalog works before Hemograma loads, then opens its original lesson',async()=>{
 const {page:p,context}=await open();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 assert.equal(await p.evaluate(()=>typeof window.HemoCourse),'undefined');await p.evaluate(()=>navigate('labmaster'));assert.equal(await p.locator('.la-track').count(),20);
 await p.evaluate(()=>LabAcademy.go('trilha/hemograma'));await p.locator('.la-module').first().click();await p.waitForFunction(()=>ui.route==='hemo'&&!!document.querySelector('.pocus-module'));
 await p.evaluate(()=>LabAcademy.go('aula/coagulacao-fundamentos'));assert.equal(await p.locator('.la-question').count(),2);await p.locator('.la-options button').first().click();assert.ok((await p.locator('.la-feedback').first().innerText()).length>40);
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);assert.deepEqual(errors,[]);await context.close();
});
test('axe audits laboratory catalog, annotated report and answered case in the built site',async()=>{
 const {page:p,context}=await open();
 for(const path of ['', 'aula/hepatico-interpretacao','caso/coagulacao/0']){
  await p.evaluate(path=>LabAcademy.go(path),path);if(path.startsWith('caso/'))await p.locator('.la-options button').first().click();
  const result=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],path||'catalog');
 }
 await context.close();
});
