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
async function open(viewport={width:1280,height:800},date,showWelcome=false){
 const context=await browser.newContext({viewport,timezoneId:'America/Sao_Paulo'});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 if(!showWelcome)await page.addInitScript(()=>{try{localStorage.setItem('master_ai_welcome_v1:cir-test','1')}catch{}});
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock.toString()})()`}));
 await page.route('https://cdn.jsdelivr.net/npm/minisearch@7.2.0/**',async route=>route.fulfill({contentType:'text/javascript',body:await fs.readFile('node_modules/minisearch/dist/umd/index.js','utf8')}));
 if(date)await page.clock.install({time:new Date(date)});
 await page.goto(base+'/MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/index.html');await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 return {page,close:async()=>{assert.deepEqual(errors,[]);await context.close();}};
}

test('assistente carrega busca sob demanda, recupera aulas e abre fonte correta',async()=>{
 const t=await open({width:1440,height:900}),p=t.page;let indexCalls=0,received;
 p.on('request',r=>{if(r.url().includes('ai-index.json'))indexCalls++;});
 assert.equal(await p.locator('.ai-tutor-launch').isVisible(),true);assert.equal(indexCalls,0);
 await p.route('**/functions/v1/ai-tutor',async route=>{received=route.request().postDataJSON();assert.equal(route.request().headers().authorization,'Bearer test-jwt');const first=received.blocks[0];await route.fulfill({contentType:'application/json',body:JSON.stringify({answer:'Resposta falsa de teste <script>erro()</script>.\nDica de estudo: revise a aula.',sources:[{id:first.id}],remaining:39})});});
 await p.locator('.ai-tutor-launch').click();assert.equal(await p.locator('#ai-tutor-question').evaluate(e=>e===document.activeElement),true);
 const results=await p.evaluate(async()=>({cardio:await AITutor.search('manobra vagal'),cir:await AITutor.search('abdome agudo')}));assert.ok(results.cardio.some(d=>d.kind==='p1'));assert.ok(results.cir.some(d=>d.kind==='cir'));
 await p.locator('#ai-tutor-question').fill('manobra vagal');await p.locator('.ai-tutor-send').click();await p.waitForFunction(()=>document.querySelector('.ai-tutor-status')?.textContent.includes('39 perguntas'));
 assert.equal(received.blocks.length,5);assert.equal(Object.keys(received.blocks[0]).join(','),'id');assert.equal(await p.locator('.ai-tutor-message script').count(),0);assert.match(await p.locator('.ai-tutor-history').innerText(),/<script>/);
 await p.locator('.ai-tutor-source').first().click();await p.waitForFunction(()=>!document.querySelector('.ai-tutor-dialog')?.open);assert.equal(await p.evaluate(()=>ui.route),'p1topic');
 await t.close();
});
test('atalhos usam a aula atual, painel reflow e temas mantêm foco; expiração limpa a conversa',async()=>{
 for(const theme of ['light','dark','high-contrast']){
  const t=await open({width:320,height:740}),p=t.page;let request;
  await p.route('**/functions/v1/ai-tutor',async r=>{request=r.request().postDataJSON();await r.fulfill({status:429,contentType:'application/json',body:JSON.stringify({error:'daily_limit'})});});
  await p.evaluate(theme=>{HIG.setTheme(theme==='high-contrast'?'light':theme);if(theme==='high-contrast')HIG.togglePref('contrast');navigate('pocus');PocusCourse.open(0);},theme);
  await p.locator('.ai-tutor-launch').click();await p.locator('.ai-tutor-tools summary').click();await p.locator('[data-ai-mode=resumo]').click();await p.waitForFunction(()=>document.querySelector('.ai-tutor-history')?.textContent.includes('Limite diário'));
  assert.match(request.question,/Resuma a aula/);assert.ok(request.blocks.every(b=>b.id.startsWith('pocus_')));assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await p.keyboard.press('Escape');assert.equal(await p.locator('.ai-tutor-launch').evaluate(e=>e===document.activeElement),true);
  await p.locator('.ai-tutor-launch').click();await p.locator('.ai-tutor-dialog button').last().focus();await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.querySelector('.ai-tutor-dialog').contains(document.activeElement)),true);
  await p.screenshot({path:'work/ai-tutor-'+theme+'.png'});
  await p.evaluate(()=>{document.documentElement.classList.add('master-auth-locked');window.dispatchEvent(new Event('master-auth-ended'));});
  assert.equal(await p.locator('.ai-tutor-launch').isVisible(),false);assert.equal(await p.locator('.ai-tutor-dialog').evaluate(d=>d.open),false);assert.equal(await p.locator('.ai-tutor-history').innerText(),'');await t.close();
 }
});
test('rede indisponível e resposta atrasada não vazam conversa após expiração',async()=>{
 const t=await open(),p=t.page;let complete;
 await p.route('**/functions/v1/ai-tutor',r=>new Promise(resolve=>{complete=async()=>{await r.fulfill({contentType:'application/json',body:JSON.stringify({answer:'Resposta antiga',sources:[]})}).catch(()=>{});resolve();};}));
 await p.locator('.ai-tutor-launch').click();await p.locator('#ai-tutor-question').fill('abdome agudo');await p.locator('.ai-tutor-send').click();await p.waitForFunction(()=>document.querySelector('.ai-tutor-status')?.textContent.includes('Preparando'));
 await p.evaluate(()=>{document.documentElement.classList.add('master-auth-locked');window.dispatchEvent(new Event('master-auth-ended'));});if(complete)await complete();assert.equal(await p.locator('.ai-tutor-history').innerText(),'');await t.close();
});
test('boneco pode ser ocultado, continua no menu e pode ser reexibido em celular e desktop',async()=>{
 for(const width of [320,1440]){
  const t=await open({width,height:900}),p=t.page;
  await p.locator('.ai-tutor-launch img').evaluate(img=>img.decode());assert.equal(await p.locator('.ai-tutor-launch img').evaluate(img=>img.naturalWidth),256);await p.screenshot({path:'work/ai-dock-home-'+width+'.png'});await p.locator('.ai-tutor-hide').click();assert.equal(await p.locator('.ai-tutor-dock').isVisible(),false);
  await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth')?.hidden);assert.equal(await p.locator('.ai-tutor-dock').isVisible(),false);
  if(width<801)await p.locator('.menu-button').click();
  await p.locator('#sidebar-nav [data-ai-open]').click();assert.equal(await p.locator('.ai-tutor-dialog').evaluate(d=>d.open),true);assert.equal(await p.locator('.ai-tutor-help').getAttribute('open'),null);await p.locator('[data-ai-help-toggle]').click();assert.match(await p.locator('.ai-tutor-help').innerText(),/menu lateral/);
  await p.locator('[data-ai-show]').click();await p.keyboard.press('Escape');assert.equal(await p.locator('.ai-tutor-dock').isVisible(),true);
  await p.evaluate(()=>{openTopic('neuro1');window.scrollTo({top:document.body.scrollHeight,behavior:'instant'});});await p.waitForFunction(()=>document.querySelector('.reading-back')&&!document.querySelector('.reading-back').hidden);
  const overlap=await p.evaluate(()=>{const a=document.querySelector('.ai-tutor-dock').getBoundingClientRect(),b=document.querySelector('.reading-back').getBoundingClientRect();return a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;});assert.equal(overlap,false);
  await t.close();
 }
});
test('aviso de novas funções é dispensável e as instruções permanecem no assistente',async()=>{
 const t=await open({width:390,height:844}),p=t.page;assert.equal(await p.locator('.ai-tutor-news').count(),1);
 await p.locator('.ai-tutor-news [data-ai-help]').click();assert.equal(await p.locator('.ai-tutor-help').getAttribute('open'),'');assert.match(await p.locator('.ai-tutor-help').innerText(),/resumo, questões/);await p.keyboard.press('Escape');
 await p.locator('[data-ai-dismiss]').click();assert.equal(await p.locator('.ai-tutor-news').count(),0);await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth')?.hidden);assert.equal(await p.locator('.ai-tutor-news').count(),0);
 await p.screenshot({path:'work/ai-assistant-hidden-home.png'});await t.close();
});
test('resposta permanece visível no celular após envio pelo menu com boneco oculto',async()=>{
 for(const height of [600,420]){
 const t=await open({width:390,height}),p=t.page;
 await p.route('**/functions/v1/ai-tutor',async r=>{const body=r.request().postDataJSON();await r.fulfill({contentType:'application/json',body:JSON.stringify({answer:'RESPOSTA VISÍVEL: a manobra vagal atua no nó atrioventricular, conforme a aula de arritmias.\n\nDica de estudo: revise a aula original antes de memorizar.',sources:body.blocks.map(b=>({id:b.id})),remaining:39})});});
 await p.locator('.ai-tutor-hide').click();await p.locator('.menu-button').click();await p.locator('#sidebar-nav [data-ai-open]').click();
 await p.locator('#ai-tutor-question').fill('manobra vagal');await p.locator('.ai-tutor-send').click();await p.waitForFunction(()=>document.querySelector('.ai-tutor-status')?.textContent.includes('39 perguntas'));
 const visible=await p.evaluate(()=>{const log=document.querySelector('.ai-tutor-history'),messages=[...document.querySelectorAll('.ai-tutor-message')],reply=messages.at(-1),text=[...reply.childNodes].find(n=>n.nodeType===Node.TEXT_NODE),range=document.createRange();range.setStart(text,0);range.setEnd(text,30);const r=range.getBoundingClientRect(),h=log.getBoundingClientRect();return {historyHeight:h.height,answerTop:r.top,answerBottom:r.bottom,historyTop:h.top,historyBottom:h.bottom,visible:h.height>=120&&r.bottom>Math.max(0,h.top)&&r.top<Math.min(innerHeight,h.bottom)};});
 await p.screenshot({path:'work/robot-chat-response-390-'+height+'.png'});assert.equal(visible.visible,true,JSON.stringify(visible));await t.close();
 }
});
test('chat mostra espera e erro do provedor; uma nova tentativa exibe a resposta sem reabrir teclado',async()=>{
 const t=await open({width:390,height:600}),p=t.page;let release,calls=0;
 await p.route('**/functions/v1/ai-tutor',async route=>{calls++;if(calls===1)await new Promise(resolve=>{release=async()=>{await route.fulfill({status:502,contentType:'application/json',body:JSON.stringify({error:'upstream'})});resolve();};});else await route.fulfill({contentType:'application/json',body:JSON.stringify({answer:'RESPOSTA APÓS TENTATIVA.\nDica de estudo: releia a aula.',sources:[],remaining:38})});});
 await p.locator('.ai-tutor-launch').click();await p.locator('#ai-tutor-question').fill('abdome agudo');await p.locator('.ai-tutor-send').click();await p.locator('.ai-tutor-pending').waitFor();assert.equal(await p.locator('.ai-tutor-pending').isVisible(),true);await release();
 await p.locator('.ai-tutor-retry').waitFor();assert.match(await p.locator('.ai-tutor-message').last().innerText(),/provedor não respondeu/);assert.equal(await p.locator('.ai-tutor-pending').count(),0);
 await p.locator('.ai-tutor-retry').click();await p.waitForFunction(()=>document.querySelector('.ai-tutor-status')?.textContent.includes('38 perguntas'));assert.match(await p.locator('.ai-tutor-message').last().innerText(),/RESPOSTA APÓS/);assert.equal(await p.locator('#ai-tutor-question').evaluate(el=>el===document.activeElement),false);assert.equal(calls,2);await t.close();
});
test('requisição que não termina ganha mensagem visível e libera nova tentativa após timeout',async()=>{
 const t=await open({width:390,height:600}),p=t.page;let release;
 await p.route('**/functions/v1/ai-tutor',r=>new Promise(resolve=>{release=async()=>{await r.abort().catch(()=>{});resolve();};}));
 await p.locator('.ai-tutor-launch').click();await p.evaluate(()=>AITutor.search('abdome agudo'));await p.clock.install();
 await p.locator('#ai-tutor-question').fill('abdome agudo');const request=p.waitForRequest('**/functions/v1/ai-tutor');await p.locator('.ai-tutor-send').click();await request;await p.clock.fastForward(66000);
 await p.locator('.ai-tutor-retry').waitFor();assert.match(await p.locator('.ai-tutor-message').last().innerText(),/demorou mais/);assert.equal(await p.locator('.ai-tutor-send').isDisabled(),false);assert.equal(await p.locator('.ai-tutor-pending').count(),0);if(release)await release();await t.close();
});
test('ocultar recolhe o robô ao lado do Pomodoro e o botão compacto restaura sem abrir o chat',async()=>{
 for(const width of [320,390,820,1440]){
  const t=await open({width,height:844}),p=t.page;let calls=0;p.on('request',r=>{if(r.url().includes('/functions/v1/ai-tutor'))calls++;});
  assert.equal(await p.locator('#ai-tutor-restore').isVisible(),false);
  await p.locator('.ai-tutor-hide').click();assert.equal(await p.locator('.ai-tutor-dock').isVisible(),false);assert.equal(await p.locator('#ai-tutor-restore').isVisible(),true);
  const layout=await p.evaluate(()=>{const a=document.getElementById('focus-top').getBoundingClientRect(),b=document.getElementById('ai-tutor-restore').getBoundingClientRect();return {next:document.getElementById('focus-top').nextElementSibling.id,gap:b.left-a.right,sameRow:Math.abs(a.top-b.top)<2,fit:document.documentElement.scrollWidth<=innerWidth+1,height:b.height};});
  assert.equal(layout.next,'ai-tutor-restore');assert.ok(layout.gap>=0&&layout.gap<=12,JSON.stringify(layout));assert.equal(layout.sameRow,true);assert.equal(layout.fit,true);assert.ok(layout.height>=44);
  await p.locator('#ai-tutor-restore img').evaluate(img=>img.decode());await p.screenshot({path:'work/ai-pomodoro-'+width+'.png'});
  await p.locator('#ai-tutor-restore').click();assert.equal(await p.locator('.ai-tutor-dock').isVisible(),true);assert.equal(await p.locator('#ai-tutor-restore').isVisible(),false);assert.equal(await p.locator('.ai-tutor-dialog').evaluate(d=>d.open),false);
  await p.locator('.ai-tutor-hide').click();await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth')?.hidden);assert.equal(await p.locator('#ai-tutor-restore').isVisible(),true);assert.equal(await p.locator('.ai-tutor-dock').isVisible(),false);
  await p.locator('#ai-tutor-restore').click();assert.equal(await p.locator('.ai-tutor-dock').isVisible(),true);assert.equal(calls,0);
  await p.evaluate(()=>{document.documentElement.classList.add('master-auth-locked');window.dispatchEvent(new Event('master-auth-ended'));});assert.equal(await p.locator('#ai-tutor-restore').isVisible(),false);await t.close();
 }
});


test('primeiro uso no celular apresenta o assistente e não abre o teclado antes de Começar',async()=>{
 const t=await open({width:390,height:760},undefined,true),p=t.page;
 let chamadas=0;
 p.on('request',r=>{if(r.url().includes('/functions/v1/ai-tutor'))chamadas++});
 await p.locator('.ai-tutor-launch').click();
 assert.equal(await p.locator('.ai-tutor-welcome').isVisible(),true);
 assert.equal(await p.locator('#ai-tutor-question').isVisible(),false);
 assert.equal(await p.locator('#ai-tutor-question').evaluate(e=>e===document.activeElement),false);
 assert.equal(await p.locator('.ai-tutor-welcome [data-ai-intent]').count(),3);
 assert.equal(await p.locator('.ai-tutor-welcome .ai-tutor-welcome-robot').isVisible(),true);
 assert.equal(await p.locator('.ai-tutor-welcome-choices [data-ai-intent="ask"]').getAttribute('aria-pressed'),'true');
 const bounds=await p.locator('.ai-tutor-welcome-start').boundingBox();
 assert.ok(bounds&&bounds.x>=0&&bounds.x+bounds.width<=391&&bounds.y+bounds.height<=761);
 await p.locator('[data-ai-intent="resumo"]').click();
 assert.equal(await p.locator('[data-ai-intent="resumo"]').getAttribute('aria-pressed'),'true');
 await p.locator('[data-ai-start]').click();
 assert.equal(await p.locator('.ai-tutor-welcome').isVisible(),false);
 assert.equal(await p.locator('.ai-tutor-history').isVisible(),true);
 assert.equal(await p.locator('.ai-tutor-tools').getAttribute('open'),'');
 assert.equal(chamadas,0,'Escolher um atalho não deve consumir respostas da IA');
 await t.close();
});

test('opção Não mostrar novamente é preservada ao recarregar e ajuda continua acessível',async()=>{
 const t=await open({width:390,height:700},undefined,true),p=t.page;
 await p.locator('.ai-tutor-launch').click();
 await p.locator('[data-ai-never-show]').check();
 await p.locator('[data-ai-start]').click();
 assert.equal(await p.evaluate(()=>localStorage.getItem('master_ai_welcome_v1:cir-test')),'1');
 await p.locator('[data-ai-close]').click();
 await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 await p.locator('.ai-tutor-launch').click();
 assert.equal(await p.locator('.ai-tutor-welcome').isVisible(),false);
 await p.locator('[data-ai-help-toggle]').click();
 assert.equal(await p.locator('.ai-tutor-help').getAttribute('open'),'');
 await t.close();
});

test('fechar durante a apresentação não grava preferência e reabrir mostra introdução',async()=>{
 const t=await open({width:360,height:640},undefined,true),p=t.page;
 await p.locator('.ai-tutor-launch').click();
 await p.locator('[data-ai-close]').click();
 assert.equal(await p.evaluate(()=>localStorage.getItem('master_ai_welcome_v1:cir-test')),null);
 await p.locator('.ai-tutor-launch').click();
 assert.equal(await p.locator('.ai-tutor-welcome').isVisible(),true);
 await t.close();
});
