
const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const APP='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
let browser,server,base;
before(async()=>{
 await fs.mkdir('work/ux-multiplataforma',{recursive:true});
 server=http.createServer(async(req,res)=>{
  try{
   const file=path.join(process.cwd(),decodeURIComponent(new URL(req.url,'http://localhost').pathname));
   res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');
   res.end(await fs.readFile(file));
  }catch{res.writeHead(404);res.end()}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();await new Promise(r=>server.close(r));});
function authFixture(){
 const user={id:'section-rail-test',email:'rail@example.test',user_metadata:{full_name:'Leitura'}};
 localStorage.setItem('master_auth_local_owner',user.id);
 localStorage.setItem('master_dicas_v1',JSON.stringify({desligado:true,focoUsado:true}));
 window.supabase={createClient:()=>({
  auth:{getSession:async()=>({data:{session:{user}}}),getUser:async()=>({data:{user}}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}})},
  from(){const q={select(){return q},eq(){return q},order(){return q},contains(){return q},range:async()=>({data:[],error:null}),maybeSingle:async()=>({data:{policy_version:'2026-11-08'}}),upsert:async()=>({error:null}),then(resolve){resolve({data:[],error:null})}};return q}
 })};
}
async function open(width=820,height=1040,touch=true){
 const ctx=await browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:width<800,reducedMotion:'reduce',timezoneId:'America/Sao_Paulo'});
 const page=await ctx.newPage(),errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',r=>r.fulfill({contentType:'text/javascript',body:'('+authFixture.toString()+')()'}));
 await page.goto(base+'/'+APP+'/index.html');
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 return {page,close:async()=>{assert.deepEqual(errors,[]);await ctx.close()}};
}
test('marcadores de seções aparecem em aulas de P2, P1 e Cirurgia sem interferir no conteúdo',async()=>{
 const t=await open(820,1100,true),p=t.page;
 for(const route of ['topic','p1topic','cirtopic']){
  await p.evaluate(route=>{
   if(route==='topic')openTopic('onco');
   else if(route==='p1topic')P1.openTopic(P1.topics[0].id);
   else CIR.openTopic(CIR.topics[0].id,0);
  },route);
  await p.waitForFunction(()=>!!document.querySelector('.section-rail:not([hidden]) .section-rail-mark'),null,{timeout:12000});
  const state=await p.evaluate(()=>({
   count:document.querySelectorAll('.section-rail-mark').length,
   selected:document.querySelectorAll('.section-rail-mark[aria-current="location"]').length,
   overflow:document.scrollingElement.scrollWidth>document.scrollingElement.clientWidth+1,
   screen:document.querySelector('.section-rail').getBoundingClientRect().right<=innerWidth+2
  }));
  assert.ok(state.count>=2,route+' should expose section markers');
  assert.equal(state.overflow,false,route+' must not cause horizontal overflow');
  assert.equal(state.screen,true,route+' rail offscreen');
 }
 await p.screenshot({path:'work/ux-multiplataforma/ipad-regua-secoes.png',animations:'disabled'});
 await t.close();
});
test('tooltip mostra título real e marcador navega ao respectivo cabeçalho',async()=>{
 const t=await open(1440,900,false),p=t.page;
 await p.evaluate(()=>openTopic('onco'));
 const marks=p.locator('.section-rail-mark');await marks.first().waitFor();
 assert.ok(await marks.count()>2);
 await marks.nth(2).hover();
 assert.equal(await p.locator('.section-rail-preview').evaluate(el=>getComputedStyle(el).visibility),'visible');
 const label=await marks.nth(2).getAttribute('aria-label');
 const preview=await p.locator('.section-rail-preview').innerText();
 assert.ok(label.includes(preview.slice(0,50)));
 await marks.nth(2).click();
 await p.waitForFunction(()=>document.activeElement?.matches('#main-content h1,#main-content h2,#main-content h3,#main-content h4'));
 assert.ok(await p.evaluate(()=>window.scrollY)>0);
 await t.close();
});
test('no celular o índice fica recolhido e pode ser aberto e usado por toque',async()=>{
 const t=await open(390,844,true),p=t.page;
 await p.evaluate(()=>openTopic('onco'));
 const rail=p.locator('.section-rail');await rail.waitFor({state:'visible'});
 const toggle=p.locator('.section-rail-toggle');
 assert.equal(await toggle.isVisible(),true);
 assert.equal(await toggle.evaluate(el=>el.getBoundingClientRect().height>=44),true);
 await toggle.click();
 assert.equal(await toggle.getAttribute('aria-expanded'),'true');
 const links=p.locator('.section-rail-menu-item');assert.ok(await links.count()>2);
 await links.nth(2).click();
 assert.equal(await toggle.getAttribute('aria-expanded'),'false');
 await p.screenshot({path:'work/ux-multiplataforma/celular-secoes.png',animations:'disabled'});
 await t.close();
});
test('modo foco persiste no iPad após ampliação, rotação, fullscreenchange e reload, saindo apenas no botão superior',async()=>{
 const t=await open(820,1100,true),p=t.page;
 await p.evaluate(()=>{openTopic('onco');HIG.toggleFocus()});
 assert.equal(await p.locator('body').evaluate(el=>el.classList.contains('focus-mode')),true);
 await p.evaluate(()=>{document.dispatchEvent(new Event('fullscreenchange'));document.dispatchEvent(new Event('webkitfullscreenchange'));document.body.style.zoom='1.4'});
 await p.setViewportSize({width:1050,height:800});
 await p.evaluate(()=>HIG.toggleFocus());
 await p.keyboard.press('Escape');
 await p.keyboard.press('f');
 assert.equal(await p.locator('body').evaluate(el=>el.classList.contains('focus-mode')),true);
 await p.reload();
 await p.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 assert.equal(await p.locator('body').evaluate(el=>el.classList.contains('focus-mode')),true);
 await p.locator('#focus-exit button').click();
 assert.equal(await p.locator('body').evaluate(el=>el.classList.contains('focus-mode')),false);
 const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('master_p2_hig_v2')).focus);
 assert.equal(saved,false);
 await t.close();
});
