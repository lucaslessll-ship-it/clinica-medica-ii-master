const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
let browser,server,base;
before(async()=>{
 server=http.createServer(async(req,res)=>{try{const file=path.join(process.cwd(),decodeURIComponent(new URL(req.url,'http://local').pathname));res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.svg')?'image/svg+xml':'text/html');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();await new Promise(resolve=>server.close(resolve));});
function mock(){
 const user={id:'cir-test',email:'cir@example.test',user_metadata:{full_name:'Cirurgia'}};
 localStorage.setItem('master_dicas_v1',JSON.stringify({desligado:true,focoUsado:true}));localStorage.setItem('master_auth_local_owner',user.id);const canvas=document.createElement('canvas');canvas.width=600;canvas.height=400;const ctx=canvas.getContext('2d');ctx.fillStyle='#284c54';ctx.fillRect(0,0,600,400);const fixture=canvas.toDataURL('image/png').split(',')[1];
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user,access_token:'test-jwt'}}}),getUser:async()=>({data:{user}}),onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(table){let columns='',key='';const query={select(c){columns=c;return query},order(){return query},contains(_,keys){key=keys[0];return query},eq(){return query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null}),then(resolve){const data=table==='lesson_images'?(columns==='keys'?[{keys:Array.from({length:8},(_,i)=>'rad_m'+(i+2))}]:[{id:key,caption:'Imagem sintética para teste',credit:'Fixture',mime:'image/png',data:fixture,marks:[{t:'Achado',x:50,y:50,lx:10,ly:10}]}]):[];resolve({data,error:null});}};return query;}})};
}
const APP='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
async function abrirAula(width=1280){
 const context=await browser.newContext({viewport:{width,height:900},timezoneId:'America/Sao_Paulo',isMobile:width<800,hasTouch:width<800});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 await page.goto(`${base}/${APP}/index.html`);
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 await page.evaluate(async()=>{openTopic('neuro1');await new Promise(r=>setTimeout(r,400));switchChapter(0)});
 await page.waitForFunction(()=>document.querySelectorAll('.deep-block p').length>0,null,{timeout:15000});
 await page.waitForTimeout(700);
 return {page,errors,close:async()=>{await context.close();assert.deepEqual(errors,[]);}};
}
test('Estudo Master reúne os 20 títulos da checklist com P1 e P2 bloqueadas',async()=>{
 const t=await abrirAula(),p=t.page;assert.equal(await p.title(),'Estudo Master');
 await p.evaluate(()=>navigate('emergency'));
 assert.equal(await p.locator('.brand strong').innerText(),'Estudo Master');
 assert.equal(await p.locator('.emergency-topic:disabled').count(),20);
 assert.equal(await p.locator('.emergency-period').count(),2);
 assert.equal(await p.locator('.nav-child:disabled').count(),2);
 const content=await p.locator('.emergency-page').innerText();assert.match(content,/Emergência hipertensiva e EAP/);assert.match(content,/Afogamento/);
 assert.doesNotMatch(content,/Frolini|Mariana|Claudio|Claude|Saúde Mental|Psiquiatria/i);
 for(const route of ['emergency-p1','emergency-p2']){await p.evaluate(route=>navigate(route),route);assert.equal(await p.locator('.emergency-topic:enabled,.emergency-page .deep-lesson').count(),0);}
 await p.evaluate(()=>navigate('dashboard'));assert.equal(await p.locator('.emergency-preview').count(),1);
 assert.ok(await p.locator('.subject-symbol .study-icon-3d').count()>8);
 await t.close();
});
test('nova identidade e caderno preservado cabem em celular, tablet e desktop',async()=>{
 await fs.mkdir('work/estudo-master',{recursive:true});
 for(const [width,height] of [[390,844],[844,390],[768,1024],[1024,768],[1440,1000]]){
  const t=await abrirAula(width),p=t.page;await p.setViewportSize({width,height});
  await p.evaluate(()=>{HIG.novidadeVista('caderno-2026-11',true);navigate('emergency')});
  await p.waitForTimeout(100);await p.evaluate(()=>document.activeElement?.blur());
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overflow ${width}x${height}`);
  const bounds=await p.locator(width<=600?'#mobile-tabbar [data-tab=notes]':'#caderno-atalho-topo').boundingBox();assert.ok(bounds.x>=0&&bounds.x+bounds.width<=width+1);
  if([390,768,1440].includes(width))await p.screenshot({path:`work/estudo-master/emergency-${width}.png`,fullPage:true});
  await p.evaluate(()=>{HIG.saveNote('neuro1_0','**Revisar o mecanismo** e os diagnósticos diferenciais.');CadernoUnificado.abrirPainel()});
  await p.waitForFunction(()=>!document.getElementById('caderno-painel')?.classList.contains('wm-enter'));
  const panel=await p.locator('#caderno-painel').boundingBox();assert.ok(panel.x>=-1&&panel.x+panel.width<=width+1,`painel fora ${width}`);
  if([390,768,1440].includes(width))await p.screenshot({path:`work/estudo-master/caderno-${width}.png`});
  await p.evaluate(()=>{CadernoUnificado.fecharPainel();navigate('dashboard');});
  if(width===1440){await p.locator('.dashboard-subjects').scrollIntoViewIfNeeded();await p.screenshot({path:'work/estudo-master/materias-desktop.png'});}
  await t.close();
 }
});
test('apresentação é dispensável, fica na conta e não encobre controles de navegação',async()=>{
 const t=await abrirAula(),p=t.page;
 await p.evaluate(()=>navigate('dashboard'));await p.waitForTimeout(150);await p.evaluate(()=>Novidades.show('caderno-2026-11',true));
 await p.locator('.feature-intro-actions button').last().click();assert.equal(await p.locator('.feature-intro').count(),0);
 assert.equal(await p.evaluate(()=>HIG.novidadeVista('caderno-2026-11')),true);
 await p.locator('#caderno-atalho-topo').click();await p.locator('.feature-help').click();
 assert.equal(await p.locator('#caderno-painel .feature-intro').count(),1);
 await p.locator('.feature-intro-close').click();
 assert.equal(await p.locator('#caderno-painel .feature-intro').count(),0);
 assert.equal(await p.locator('#caderno-painel').isVisible(),true);
 await t.close();
});
test('auditoria axe da nova disciplina em ambos os temas',async()=>{
 const AxeBuilder=require('@axe-core/playwright').default;const t=await abrirAula(390),p=t.page;
 for(const theme of ['light','dark']){await p.evaluate(theme=>{HIG.novidadeVista('caderno-2026-11',true);HIG.setTheme(theme);navigate('emergency')},theme);const result=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],theme);}
 await t.close();
});
