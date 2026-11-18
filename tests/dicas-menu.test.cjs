const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
let browser,server,base;
before(async()=>{
 server=http.createServer(async(req,res)=>{try{const file=path.join(process.cwd(),decodeURIComponent(new URL(req.url,'http://local').pathname));res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));base=`http://127.0.0.1:${server.address().port}`;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();await new Promise(r=>server.close(r));});
function mock(){
 const user={id:'dica-test',email:'d@example.test',user_metadata:{}};
 localStorage.setItem('master_auth_local_owner',user.id);
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user,access_token:'t'}}}),getUser:async()=>({data:{user}}),onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(){const q={select(){return q},order(){return q},contains(){return q},eq(){return q},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null}),then(r){r({data:[],error:null})}};return q;}})};
}
const APP='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
async function abrir(width,{estado,collapsed}={}){
 const context=await browser.newContext({viewport:{width,height:900},isMobile:width<800,hasTouch:width<800});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',r=>r.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 await page.addInitScript(([estado,collapsed])=>{if(estado)localStorage.setItem('master_dicas_v1',JSON.stringify(estado));if(collapsed)localStorage.setItem('master_ux_collapsed_test','1');},[estado,collapsed]);
 await page.goto(`${base}/${APP}/index.html`);
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 return {page,errors,close:async()=>{await context.close();assert.deepEqual(errors,[]);}};
}

test('a primeira dica destaca o modo foco e some ao fechar, sem voltar na mesma visita',async()=>{
 const t=await abrir(1280),p=t.page;
 assert.equal(await p.locator('.focus-trigger.dica-foco').count(),1,'botão do modo foco sem realce');
 await p.waitForSelector('.dica:not([hidden])',{timeout:8000});
 assert.equal(await p.locator('.dica-titulo').textContent(),'Modo foco');
 assert.equal(await p.locator('.focus-trigger.dica-alvo').count(),1,'alvo não destacado');
 const caixa=await p.locator('.dica').evaluate(el=>{const r=el.getBoundingClientRect();return {dentro:r.left>=0&&r.right<=innerWidth,noFluxo:getComputedStyle(el).position==='relative'&&document.getElementById('main-content').contains(el),alvo:Math.min(...[...el.querySelectorAll('button')].map(b=>Math.min(b.getBoundingClientRect().width,b.getBoundingClientRect().height)))}});
 assert.ok(caixa.dentro);assert.ok(caixa.noFluxo);assert.ok(caixa.alvo>=36,`botão pequeno: ${caixa.alvo}`);
 await p.click('.dica-x');
 assert.equal(await p.locator('.dica').isVisible(),false);
 assert.equal(await p.locator('.dica-alvo').count(),0);
 const salvo=await p.evaluate(()=>JSON.parse(localStorage.getItem('master_dicas_v1')));
 assert.ok(salvo.vistas.includes('foco'));
 await t.close();
});

test('dispensar desliga as dicas e usar o modo foco tira o realce',async()=>{
 let t=await abrir(1280),p=t.page;
 await p.waitForSelector('.dica:not([hidden])',{timeout:8000});
 await p.click('[data-dica="desligar"]');
 assert.equal((await p.evaluate(()=>JSON.parse(localStorage.getItem('master_dicas_v1')))).desligado,true);
 await p.click('.focus-trigger');
 await p.waitForTimeout(300);
 assert.equal(await p.locator('.focus-trigger.dica-foco').count(),0,'realce deveria sumir depois do uso');
 assert.equal((await p.evaluate(()=>JSON.parse(localStorage.getItem('master_dicas_v1')))).focoUsado,true);
 await t.close();
 // Com tudo dispensado, nada aparece.
 t=await abrir(1280,{estado:{vistas:[],desligado:true,ultimo:0,focoUsado:true}});p=t.page;
 await p.waitForTimeout(4800);
 assert.equal(await p.locator('.dica:not([hidden])').count(),0);
 await t.close();
});

test('as dicas vêm aos poucos: respeitam o intervalo e seguem para a próxima',async()=>{
 let t=await abrir(1280,{estado:{vistas:['foco'],desligado:false,ultimo:Date.now()-1000,focoUsado:true}}),p=t.page;
 await p.waitForTimeout(4800);
 assert.equal(await p.locator('.dica:not([hidden])').count(),0,'mostrou antes do intervalo');
 await t.close();
 t=await abrir(1280,{estado:{vistas:['foco'],desligado:false,ultimo:Date.now()-7*3600*1000,focoUsado:true}});p=t.page;
 await p.waitForSelector('.dica:not([hidden])',{timeout:8000});
 assert.equal(await p.locator('.dica-titulo').textContent(),'Pomodoro configurável');
 await t.close();
});

test('em celular a dica segue o fluxo da página, sem rolagem lateral',async()=>{
 const t=await abrir(390),p=t.page;
 await p.waitForSelector('.dica:not([hidden])',{timeout:8000});
 const r=await p.evaluate(()=>{const c=document.querySelector('.dica').getBoundingClientRect(),b=document.getElementById('mobile-tabbar')?.getBoundingClientRect();return {dentro:c.left>=0&&c.right<=innerWidth,noFluxo:document.getElementById('main-content').contains(document.querySelector('.dica'))&&getComputedStyle(document.querySelector('.dica')).position==='relative',largura:document.documentElement.scrollWidth<=innerWidth+1}});
 assert.ok(r.dentro);assert.ok(r.noFluxo,'dica deve fazer parte da página, sem sobrepor a leitura');assert.ok(r.largura);
 await t.close();
});

test('barra lateral reduzida mostra só ícones, sem rótulos cortados',async()=>{
 const t=await abrir(1280),p=t.page;
 await p.evaluate(()=>{if(!document.body.classList.contains('side-collapsed'))HIG.toggleSidebar();});
 await p.waitForFunction(()=>document.body.classList.contains('side-collapsed'));
 const r=await p.evaluate(()=>{
  const rotulos=[...document.querySelectorAll('.nav-section-label')].map(e=>({texto:e.textContent.length>0,altura:Math.round(e.getBoundingClientRect().height),visivel:getComputedStyle(e).display!=='none'}));
  const textos=[...document.querySelectorAll('#sidebar-nav .nav-destination>span')].filter(e=>getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>0).length;
  const lateral=document.getElementById('sidebar'),cortado=[...lateral.querySelectorAll('*')].filter(e=>{const c=e.getBoundingClientRect(),s=lateral.getBoundingClientRect();return c.width>0&&e.textContent.trim().length>2&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).fontSize!=='0px'&&c.right>s.right+1}).length;
  return {rotulos,textos,cortado};});
 assert.equal(r.textos,0,'texto de item ainda visível');
 assert.ok(r.rotulos.every(x=>!x.visivel||x.altura<=2),JSON.stringify(r.rotulos));
 assert.equal(r.cortado,0,'texto cortado na lateral');
 await t.close();
});
