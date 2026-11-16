const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const fs=require('node:fs/promises'),path=require('node:path'),http=require('node:http');
const app='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
let browser,server,base;
before(async()=>{server=http.createServer(async(req,res)=>{try{const file=path.join(process.cwd(),decodeURIComponent(new URL(req.url,'http://local').pathname));res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});});
after(async()=>{await browser?.close();await new Promise(r=>server.close(r));});
function mock(){
 const user={id:'lab-e',email:'lab-e@example.test',user_metadata:{full_name:'Estudante'}};
 if(!localStorage.getItem('master_auth_local_owner'))localStorage.setItem('master_auth_local_owner',user.id);
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user}}}),getUser:async()=>({data:{user}}),onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(table){const query={select(){return query},order(){return query},range:async()=>({data:[],error:null}),eq(){return table==='master_progress'?Promise.resolve({data:[],error:null}):query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null})};return query;}})};
}
async function open(width){const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock.toString()})()`}));await page.route('https://*.supabase.co/**',route=>route.abort());await page.goto(base+'/'+app+'/index.html');await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);return {page,context,errors};}
test('20 trilhas e todas as aulas/casos novos funcionam, bloqueiam avanço e preservam respostas',async()=>{
 const {page,context,errors}=await open(1280);
 await page.evaluate(()=>navigate('labmaster'));
 assert.equal(await page.locator('.la-track').count(),20,JSON.stringify({errors,body:await page.locator('main').innerText()}));
 const metadata=await page.evaluate(()=>({tracks:LabAcademy.tracks.map(t=>({id:t.id,legacy:t.legacy})),lessons:LabAcademy.lessons.map(l=>({id:l.id,a:l.pack.quiz.slice(l.part*2,l.part*2+2).map(q=>q.a)})),packs:MASTER_LAB_ACADEMY.PACKS.map(p=>({id:p.id,a:p.case.stages.map(q=>q.a)}))}));
 assert.equal(metadata.lessons.length,26);
 for(const t of metadata.tracks){await page.evaluate(id=>LabAcademy.go('trilha/'+id),t.id);assert.ok(await page.locator('.la-module').count()>0);assert.doesNotMatch(await page.locator('main').innerText(),/undefined/);}
 for(const l of metadata.lessons){await page.evaluate(id=>LabAcademy.go('aula/'+id),l.id);assert.equal(await page.locator('.la-question').count(),2);assert.ok(await page.locator('.la-figure').count()>0);assert.ok(await page.locator('.la-section a[target="_blank"]').count()>0);await page.locator('.la-options').first().locator('button').nth(l.a[0]).click();assert.match(await page.locator('.la-feedback').first().innerText(),/Correto/);}
 for(const p of metadata.packs){await page.evaluate(id=>LabAcademy.go('caso/'+id+'/1'),p.id);assert.match(await page.locator('.la-hero .kicker').innerText(),/ETAPA 1/);await page.locator('.la-options button').nth(p.a[0]).click();await page.getByRole('button',{name:'Revelar próximos dados',exact:true}).click();assert.match(await page.locator('.la-hero .kicker').innerText(),/ETAPA 2/);await page.locator('.la-options button').nth(p.a[1]).click();assert.match(await page.locator('main').innerText(),/Síntese do caso/);}
 await page.evaluate(()=>LabAcademy.go('aula/fundamentos-fundamentos'));
 await page.locator('#la-note').fill('<img src=x onerror=alert(1)> síntese');await page.locator('.la-complete input').check();
 await page.reload();await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 assert.equal(await page.locator('#la-note').inputValue(),'<img src=x onerror=alert(1)> síntese');assert.equal(await page.locator('.la-complete input').isChecked(),true);assert.equal(await page.locator('main img[src=x]').count(),0);assert.match(await page.locator('.la-feedback').first().innerText(),/Correto/);
 assert.deepEqual(errors,[]);await context.close();
});
for(const width of [320,390,820,1440])test('catálogo, diagramas, laudos e respostas legíveis em '+width+' px',async()=>{
 const {page,context,errors}=await open(width);
 await page.evaluate(()=>navigate('labmaster'));
 await page.locator('.la-search input').fill('tireoide');assert.equal(await page.locator('.la-track:visible').count(),1);
 await page.locator('.la-track:visible').click();await page.locator('.la-module').first().click();
 for(const theme of ['light','dark']){await page.evaluate(t=>HIG.setTheme(t),theme);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);assert.equal(await page.locator('.la-options button').first().evaluate(el=>el.getBoundingClientRect().height>=44),true);}
 await page.evaluate(()=>LabAcademy.go('aula/hepatico-interpretacao'));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
 assert.deepEqual(errors,[]);await context.close();
});
test('todos os cursos reaproveitados abrem a aula original e a navegação mantém um grupo ativo',async()=>{
 const {page,context,errors}=await open(1280);
 for(const [track,route] of [['hemograma','hemo'],['anemias','hemo'],['renal','labrenal'],['urina','labrenal'],['eletrolitos','labrenal'],['gasometria','labrenal'],['microbiologia','micro']]){await page.evaluate(id=>LabAcademy.go('trilha/'+id),track);await page.locator('.la-module').first().click();assert.equal(await page.evaluate(()=>ui.route),route);assert.equal(await page.locator('.nav-group.is-active').count(),1);assert.match(await page.locator('.nav-group.is-active').innerText(),/Laboratório Master/);assert.ok((await page.locator('main').innerText()).length>500);}
 await page.evaluate(()=>navigate('labarea-metabolismo'));assert.equal(await page.locator('.la-track').count(),3);
 await page.locator('.search-trigger').click();await page.locator('#global-search').fill('eletroforese');assert.ok(await page.locator('#search-results button').count()>0);
 assert.deepEqual(errors,[]);await context.close();
});
