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
 const user={id:'navigation-test',email:'navigation@example.test',user_metadata:{full_name:'Navegação'}};let callback;
 localStorage.setItem('master_auth_local_owner',user.id);
 window.__navigationSignOut=()=>callback('SIGNED_OUT',null);
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user}}}),getUser:async()=>({data:{user}}),onAuthStateChange(fn){callback=fn;return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(table){const query={select(){return query},eq(){return table==='master_progress'?Promise.resolve({data:[],error:null}):query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null})};return query;}})};
}
async function open(options={}){
 const context=await browser.newContext({viewport:{width:390,height:844},...options});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock.toString()})()`}));
 await page.goto(base+'/MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/index.html');await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 return {page,close:async()=>{assert.deepEqual(errors,[]);await context.close();}};
}
test('mobile drawer excludes closed content, traps focus and restores its trigger',async()=>{
 const t=await open(),p=t.page;
 assert.equal(await p.locator('#sidebar').evaluate(el=>el.inert),true);
 await p.locator('.menu-button').click();assert.equal(await p.locator('.menu-button').getAttribute('aria-expanded'),'true');assert.equal(await p.locator('.app-body').evaluate(el=>el.inert),true);
 const endpoints=await p.locator('#sidebar').evaluate(el=>{const a=[...el.querySelectorAll('a[href],button:not([disabled])')].filter(x=>x.getClientRects().length);return [a[0].outerHTML,a.at(-1).outerHTML]});assert.ok(endpoints.length===2);
 await p.locator('#sidebar button:not([disabled])').last().focus();await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.getElementById('sidebar').contains(document.activeElement)),true);
 await p.keyboard.press('Escape');assert.equal(await p.locator('#sidebar').evaluate(el=>el.inert),true);assert.equal(await p.locator('.app-body').evaluate(el=>el.inert),false);assert.equal(await p.locator('.menu-button').evaluate(el=>el===document.activeElement),true);
 await p.setViewportSize({width:1440,height:1000});assert.equal(await p.locator('#sidebar').evaluate(el=>el.inert),false);await t.close();
});
test('dialog isolates background and traps visible links, select and textarea controls',async()=>{
 const t=await open(),p=t.page;await p.locator('.search-trigger').click();await p.locator('#global-search').waitFor();
 assert.equal(await p.locator('#app-shell').evaluate(el=>el.inert),true);
 await p.locator('#hig-dialog-content').evaluate(el=>{const group=document.createElement('div');group.innerHTML='<select aria-label="Teste de seleção"><option>Um</option></select><textarea aria-label="Teste de texto"></textarea><a id="dialog-last" href="#test">Ajuda</a><input type="hidden">';el.append(group);});
 await p.locator('#dialog-last').focus();await p.keyboard.press('Tab');assert.equal(await p.locator('#hig-overlay .hig-dialog-heading button').evaluate(el=>el===document.activeElement),true);
 await p.keyboard.press('Shift+Tab');assert.equal(await p.locator('#dialog-last').evaluate(el=>el===document.activeElement),true);
 await p.keyboard.press('Escape');assert.equal(await p.locator('#app-shell').evaluate(el=>el.inert),false);assert.equal(await p.locator('.search-trigger').evaluate(el=>el===document.activeElement),true);await t.close();
});
test('skip link retains the route and reduced motion disables smooth navigation',async()=>{
 const t=await open({reducedMotion:'reduce'}),p=t.page;await p.evaluate(()=>navigate('prescriptions'));await p.locator('.skip-link').focus();await p.keyboard.press('Enter');
 assert.equal(await p.evaluate(()=>ui.route),'prescriptions');assert.equal(await p.evaluate(()=>location.hash),'#prescriptions');assert.equal(await p.locator('#main-content').evaluate(el=>el===document.activeElement),true);
 const behavior=await p.evaluate(()=>{let mode;const original=window.scrollTo;window.scrollTo=options=>{mode=options.behavior};navigate('topics');window.scrollTo=original;return mode});assert.equal(behavior,'instant');await t.close();
});
test('session expiration while a dialog is open keeps study content inert',async()=>{
 const t=await open(),p=t.page;await p.locator('.search-trigger').click();await p.evaluate(()=>window.__navigationSignOut());await p.waitForFunction(()=>!document.getElementById('master-auth').hidden);
 assert.equal(await p.locator('#hig-overlay').isVisible(),false);assert.equal(await p.locator('#app-shell').evaluate(el=>el.inert),true);await t.close();
});
test('search announces its active result, handles empty results and opens the keyboard choice',async()=>{
 const t=await open(),p=t.page;await p.locator('.search-trigger').click();const input=p.locator('#global-search');
 assert.equal(await input.getAttribute('aria-autocomplete'),'list');assert.equal(await input.getAttribute('aria-activedescendant'),'global-search-option-0');
 await input.press('ArrowDown');assert.equal(await input.getAttribute('aria-activedescendant'),'global-search-option-1');assert.equal(await p.locator('#global-search-option-1').getAttribute('aria-selected'),'true');
 await input.fill('zzzxxyynosearchresult');await input.press('ArrowDown');await input.press('ArrowUp');await input.press('Enter');assert.equal(await input.getAttribute('aria-activedescendant'),null);assert.equal(await p.locator('#hig-overlay').isVisible(),true);
 await input.fill('Guillain');await input.press('ArrowDown');const selected=await input.getAttribute('aria-activedescendant');assert.ok(selected);await input.press('Enter');assert.equal(await p.locator('#hig-overlay').isVisible(),false);assert.match(await p.locator('#main-content').innerText(),/Guillain/);await t.close();
});
