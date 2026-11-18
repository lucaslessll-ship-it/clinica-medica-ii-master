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
for(const width of [390,1280])test('Laboratório Master abre dentro do site, sem página separada, com tema e tamanho ajustados em '+width+' px',async()=>{
 const {page,context,errors}=await open(width);
 await page.evaluate(()=>navigate('labmaster'));
 await page.getByRole('button',{name:'Laboratório visual de microcitose',exact:true}).click();
 assert.ok(page.url().includes('/index.html'),'não deve sair do site');
 assert.equal(await page.evaluate(()=>location.hash),'#labmicrocitose');
 assert.match(await page.locator('.nav-group.is-active .nav-destination').getAttribute('aria-label'),/Laboratório Master/);
 const src=await page.locator('#lab-master-frame').getAttribute('src');assert.match(src,/embed=1/);
 const frame=page.frameLocator('#lab-master-frame');
 await frame.locator('.side-nav button').first().waitFor();
 assert.equal(await frame.locator('.side-nav button').count(),7);
 for(const hidden of ['.topbar','.brand','.footer','.course-id'])assert.equal(await frame.locator(hidden).first().isHidden(),true,hidden);
 await page.waitForFunction(()=>document.getElementById('lab-master-frame').getBoundingClientRect().height>520);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'sem rolagem horizontal');
 const small=await frame.locator('.side-nav button').evaluateAll(list=>list.filter(el=>el.getBoundingClientRect().height<44).length);assert.equal(small,0,'alvos de toque com 44 px');
 const before=await page.evaluate(()=>document.getElementById('lab-master-frame').getBoundingClientRect().height);
 await frame.locator('.side-nav button').nth(2).click();
 await page.waitForFunction(h=>document.getElementById('lab-master-frame').getBoundingClientRect().height!==h,before);
 assert.match(await frame.locator('main h1').first().innerText(),/\S/);
 await page.evaluate(()=>HIG.setTheme('dark'));
 await page.waitForFunction(()=>document.getElementById('lab-master-frame').contentDocument.body.classList.contains('dark'));
 await page.evaluate(()=>HIG.setTheme('light'));
 await page.waitForFunction(()=>!document.getElementById('lab-master-frame').contentDocument.body.classList.contains('dark'));
 assert.deepEqual(errors,[]);await context.close();
});
test('página própria continua funcionando fora do site, com barra lateral',async()=>{
 const {page,context,errors}=await open(1280);
 await page.goto(base+'/'+app+'/laboratorio-master/microcitose/index.html');
 await page.locator('.side-nav button').first().waitFor();
 assert.equal(await page.locator('.sidebar').isVisible(),true);assert.equal(await page.locator('.topbar').isVisible(),true);
 assert.deepEqual(errors,[]);await context.close();
});
