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
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user,access_token:'test-jwt'}}}),getUser:async()=>({data:{user}}),onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(table){let columns='',key='';const query={select(c){columns=c;return query},order(){return query},contains(_,keys){key=keys[0];return query},eq(){return query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null}),then(resolve){const data=table==='lesson_images'?(columns==='keys'?[{keys:Array.from({length:8},(_,i)=>'rad_m'+(i+2))}]:[{id:key,caption:'Imagem sintética para teste',credit:'Fixture',mime:'image/png',data:fixture,marks:[{t:'Achado',x:50,y:50,lx:10,ly:10}]}]):[];resolve({data,error:null});}};return query;}})};
}
const APP='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
async function open(viewport){
 const context=await browser.newContext({viewport,timezoneId:'America/Sao_Paulo',isMobile:viewport.width<800,hasTouch:viewport.width<800});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 await page.goto(`${base}/${APP}/index.html`);
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 await page.waitForTimeout(500);
 return {page,errors,close:async()=>{await context.close();assert.deepEqual(errors,[]);}};
}
const chrome=page=>page.evaluate(()=>({
 sidebar:getComputedStyle(document.querySelector('.sidebar')).display,
 topbar:getComputedStyle(document.querySelector('.topbar')).display,
 tabbar:getComputedStyle(document.getElementById('mobile-tabbar')).display,
 assistente:getComputedStyle(document.querySelector('.ai-tutor-dock')).display,
 saida:getComputedStyle(document.getElementById('focus-exit')).display,
 foco:document.body.classList.contains('focus-mode'),
 salvo:!!JSON.parse(localStorage.getItem('master_p2_hig_v2')||'{}').focus
}));

test('modo foco esconde a interface, entra em tela cheia e é acionável em qualquer largura',async()=>{
 for(const width of [320,390,768,1280]){
  const t=await open({width,height:width<800?760:900}),p=t.page;
  const botao=p.locator('.focus-trigger');
  assert.equal(await botao.isVisible(),true,`botão de foco invisível em ${width}px`);
  const caixa=await botao.boundingBox();
  assert.ok(caixa.width>=44&&caixa.height>=44,`alvo de toque pequeno em ${width}px`);
  assert.equal(await p.locator('.menu-button').isVisible()||width>800,true);
  await botao.click();
  await p.waitForFunction(()=>document.body.classList.contains('focus-mode'));
  const dentro=await chrome(p);
  assert.equal(dentro.sidebar,'none');assert.equal(dentro.topbar,'none');
  assert.equal(dentro.tabbar,'none');assert.equal(dentro.assistente,'none');
  assert.equal(dentro.saida,'flex');assert.equal(dentro.salvo,true);
  assert.equal(await p.evaluate(()=>!!document.fullscreenElement),true,`sem tela cheia em ${width}px`);
  await t.close();
 }
});

test('sai do foco pelo botão, pelo Esc e ao deixar a tela cheia',async()=>{
 const t=await open({width:1280,height:900}),p=t.page;
 await p.locator('.focus-trigger').click();
 await p.waitForFunction(()=>document.body.classList.contains('focus-mode'));
 await p.locator('#focus-exit button').click();
 await p.waitForFunction(()=>!document.body.classList.contains('focus-mode'));
 assert.equal((await chrome(p)).salvo,false);
 assert.equal(await p.evaluate(()=>!!document.fullscreenElement),false);

 await p.keyboard.press('f');
 await p.waitForFunction(()=>document.body.classList.contains('focus-mode'));
 await p.keyboard.press('Escape');
 await p.waitForFunction(()=>!document.body.classList.contains('focus-mode'));
 assert.equal((await chrome(p)).topbar!=='none',true);

 // Sair da tela cheia por fora (Esc do navegador) também encerra o foco.
 await p.locator('.focus-trigger').click();
 await p.waitForFunction(()=>!!document.fullscreenElement);
 await p.evaluate(()=>document.exitFullscreen());
 await p.waitForFunction(()=>!document.body.classList.contains('focus-mode'));
 assert.equal((await chrome(p)).salvo,false);
 await t.close();
});

test('o aviso do foco aparece uma única vez e a sessão nunca começa presa no foco',async()=>{
 const t=await open({width:1280,height:900}),p=t.page;
 await p.locator('.focus-trigger').click();
 await p.waitForFunction(()=>document.getElementById('toast').textContent.includes('Modo foco'));
 await p.locator('#focus-exit button').click();
 await p.waitForFunction(()=>!document.body.classList.contains('focus-mode'));
 await p.evaluate(()=>{document.getElementById('toast').textContent='';});
 await p.locator('.focus-trigger').click();
 await p.waitForTimeout(600);
 assert.equal(await p.evaluate(()=>document.getElementById('toast').textContent.trim()),'');
 // Com o foco gravado, recarregar devolve a interface: a tela cheia não sobrevive ao reload.
 await p.reload();
 await p.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 await p.waitForTimeout(400);
 const depois=await chrome(p);
 assert.equal(depois.foco,false);assert.equal(depois.topbar!=='none',true);
 await t.close();
});
