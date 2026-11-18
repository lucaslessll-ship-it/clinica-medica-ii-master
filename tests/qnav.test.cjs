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
async function abrir(width=1280){
 const context=await browser.newContext({viewport:{width,height:900},timezoneId:'America/Sao_Paulo'});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 await page.goto(`${base}/${APP}/index.html`);
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 return {page,errors,close:async()=>{await context.close();assert.deepEqual(errors,[]);}};
}
test('P2: bolinhas ficam verde/vermelho, permitem pular e o resultado traz gráfico e revisão',async()=>{
 const {page,close}=await abrir();
 await page.evaluate(()=>{startPractice('neuro1');});
 await page.waitForSelector('.qnav-dot');
 const responder=certo=>page.evaluate(certo=>{const p=ui.practice,q=QUESTION_BANK[p.ids[p.step]];choosePractice(certo?q.a:(q.a+1)%4);submitPractice();},certo);
 await responder(false);
 await page.evaluate(()=>jumpPractice(2));
 await responder(true);
 const cls=await page.$$eval('.qnav-dot',els=>els.slice(0,3).map(e=>e.className));
 assert.match(cls[0],/errada/);assert.match(cls[2],/certa/);assert.doesNotMatch(cls[1],/certa|errada/);
 // volta numa já respondida: mostra o feedback sem permitir responder de novo
 await page.click('.qnav-dot >> nth=0');
 await page.waitForSelector('.feedback');
 assert.equal(await page.evaluate(()=>ui.practice.revealed),true);
 await page.click('text=Ver resultado');
 await page.waitForSelector('.qnav-resumo svg.qnav-rosca');
 assert.ok(await page.$('.qnav-resumo .qnav-temas li'));
 const log=await page.evaluate(()=>Object.values(HIG.qlog()));
 assert.equal(log.length,1);assert.equal(log[0].b,'p2');assert.equal(log[0].erros,1);
 await page.evaluate(()=>navigate('revisao'));
 await page.waitForSelector('.qnav-painel');
 assert.match(await page.textContent('.qnav-agendagraf'),/Amanhã/);
 await close();
});
test('Cirurgia: bolinhas e resultado em gráfico',async()=>{
 const {page,close}=await abrir();
 await page.evaluate(()=>CIR.startPractice({t:'all',src:'all',mode:'all'}));
 await page.waitForSelector('.qnav-dot');
 await page.evaluate(()=>{const b=document.querySelector('.p1-option:not(.correct)');b.click();});
 await page.waitForSelector('.qnav-dot.certa, .qnav-dot.errada');
 await page.evaluate(()=>CIR.jump(3));
 await page.evaluate(()=>CIR.jump(0));
 assert.equal(await page.evaluate(()=>!!document.querySelector('.info-notice')),true);
 await page.click('text=Ver resultado');
 await page.waitForSelector('.qnav-resumo');
 await close();
});
test('clicar numa marca oferece Excluir e remove a marcação',async()=>{
 const {page,close}=await abrir();
 await page.evaluate(async()=>{openTopic('neuro1');await new Promise(r=>setTimeout(r,400));switchChapter(0)});
 await page.waitForFunction(()=>document.querySelectorAll('.deep-block p').length>0,null,{timeout:15000});
 await page.waitForTimeout(900);
 await page.evaluate(()=>{
  const p=[...document.querySelectorAll('.deep-block p')].find(p=>p.textContent.trim().length>140);
  const no=[...p.childNodes].find(n=>n.nodeType===3&&n.nodeValue.trim().length>60);
  const f=document.createRange();f.setStart(no,10);f.setEnd(no,55);const s=getSelection();s.removeAllRanges();s.addRange(f);
  document.dispatchEvent(new MouseEvent('mouseup',{bubbles:true}));
 });
 await page.waitForSelector('.nota-barra:not([hidden])');
 await page.click('.nota-cor >> nth=0');
 await page.waitForSelector('.nota-marca');
 await page.waitForTimeout(900);
 await page.evaluate(()=>{const m=document.querySelector('.nota-marca');m.scrollIntoView({block:'center'});});
 await page.waitForTimeout(900);
 await page.click('.nota-marca');
 await page.waitForSelector('.nota-excluir:not([hidden])');
 await page.keyboard.press('Escape');
 await page.locator('.nota-marca').focus();
 await page.keyboard.press('Enter');
 await page.waitForSelector('.nota-excluir:not([hidden])');
 assert.equal(await page.locator('.nota-marca').getAttribute('role'),'button');
 page.once('dialog',dialog=>dialog.accept());
 await page.click('.nota-excluir');
 await page.waitForFunction(()=>!document.querySelector('.nota-marca'));
 await close();
});


test('botões de filtrar questões e ver resultado são claros e funcionais em P1, P2 e Cirurgia',async()=>{
 await fs.mkdir('work/ux-multiplataforma',{recursive:true});
 for(const width of [390,820,1280]){
  const {page,close}=await abrir(width);
  const verificar=async(area)=>{
   const resumo=page.locator('.qnav-filterbox > summary');
   assert.equal(await resumo.innerText(),'Filtrar questões',area+' · '+width);
   assert.equal(await page.locator('.qnav-result-button').innerText(),'Ver resultado',area+' · '+width);
   const tamanho=await resumo.evaluate(e=>({height:e.getBoundingClientRect().height,width:e.getBoundingClientRect().width,cor:getComputedStyle(e).color,fundo:getComputedStyle(e).backgroundColor}));
   assert.ok(tamanho.height>=47,JSON.stringify({area,width,tamanho}));
   assert.notEqual(tamanho.fundo,'rgba(0, 0, 0, 0)');
   assert.ok(await page.locator('.qnav-result-button').evaluate(e=>e.getBoundingClientRect().height>=44));
   await resumo.click();
   assert.equal(await page.locator('.qnav-filterbox').evaluate(e=>e.open),true);
   if(width===390)await page.screenshot({path:'work/ux-multiplataforma/'+area+'-filtro-390.png',animations:'disabled'});
  };
  await page.evaluate(()=>startPractice('neuro1'));
  await page.waitForSelector('.qnav-dot');
  await verificar('p2');
  await page.locator('#p2-question-filter').selectOption('neuro2');
  await page.locator('.qnav-filter-form button[type=submit]').click();
  assert.equal(await page.evaluate(()=>ui.practice.tid),'neuro2');
  await page.evaluate(()=>P1.startPractice('p1dm'));
  await page.waitForSelector('.qnav-dot');
  await verificar('p1');
  await page.locator('#p1-question-filter').selectOption('p1arr');
  await page.locator('.qnav-filter-form button[type=submit]').click();
  await page.locator('.qnav-filterbox > summary').click();
  assert.equal(await page.locator('#p1-question-filter').inputValue(),'p1arr');
  await page.evaluate(()=>CIR.startPractice({t:'cirproc',src:'all',mode:'all'}));
  await page.waitForSelector('.qnav-dot');
  await verificar('cir');
  await page.locator('.cir-filters select[name=t]').selectOption('cirher');
  await page.locator('.cir-filters button[type=submit]').click();
  await page.locator('.qnav-filterbox > summary').click();
  assert.equal(await page.locator('.cir-filters select[name=t]').inputValue(),'cirher');
  await close();
 }
});


test('P2, P1 e Cirurgia conservam cores, resposta e sessão após recarregar',async()=>{
 const {page,close}=await abrir(390);
 const reload=async(route)=>{
  await page.reload();
  await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
  await page.evaluate(route=>navigate(route),route);
  await page.waitForSelector('.qnav-dot.certa,.qnav-dot.errada',{timeout:10000});
 };
 await page.evaluate(()=>startPractice('neuro1'));
 await page.locator('.option-btn').first().click();
 await page.getByRole('button',{name:'Conferir resposta'}).click();
 assert.equal(await page.locator('.qnav-dot.certa,.qnav-dot.errada').count(),1);
 const p2saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('master_p2_lucas_v1')).questionSessions.length);
 await reload('practice');
 assert.equal(await page.locator('.qnav-dot.certa,.qnav-dot.errada').count(),1);
 assert.ok(await page.locator('.feedback').isVisible());
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('master_p2_lucas_v1')).questionSessions.length),p2saved);
 await page.evaluate(()=>P1.startPractice('p1dm'));
 await page.locator('.p1-option').first().click();
 await reload('p1practice');
 assert.equal(await page.locator('.qnav-dot.certa,.qnav-dot.errada').count(),1);
 assert.ok(await page.locator('.info-notice').count()>0);
 await page.evaluate(()=>CIR.startPractice({t:CIR.own[0].t,src:'own',mode:'all'}));
 await page.locator('.cir-q .p1-option').first().click();
 await reload('cirpractice');
 assert.equal(await page.locator('.qnav-dot.certa,.qnav-dot.errada').count(),1);
 assert.ok(await page.locator('.cir-q .info-notice').count()>0);
 const statuses=await page.evaluate(()=>Object.fromEntries(['master_p2_lucas_v1','master_p1_lucas_v4','master_cir_lucas_v1'].map(key=>{
  const s=JSON.parse(localStorage.getItem(key));return [key,{sessions:s.questionSessions?.length,active:s.activeQuestionPracticeId}];
 })));
 assert.ok(Object.values(statuses).every(x=>x.sessions>=1&&x.active));
 await close();
});
test('histórico mostra sessões distintas e limpeza confirmada mantém aulas e anotações',async()=>{
 const {page,close}=await abrir(390);
 await page.evaluate(()=>{P1.startPractice('p1dm');P1.answerPractice(0);P1.startPractice('p1arr');P1.answerPractice(1);});
 const state=await page.evaluate(()=>JSON.parse(localStorage.getItem('master_p1_lucas_v4')));
 assert.equal(state.questionSessions.filter(s=>s.kind==='practice').length,2);
 await page.evaluate(()=>P1.go('p1practice'));
 await page.waitForSelector('.qhistory-all');
 assert.match(await page.locator('.qhistory').innerText(),/2 sessões/);
 await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('master_p1_lucas_v4'));s.completed.p1dm_0=true;s.notes.p1dm_0='Preservar nota';localStorage.setItem('master_p1_lucas_v4',JSON.stringify(s));P1.reload();window.confirm=()=>true;P1.clearQuestionHistory();});
 const clean=await page.evaluate(()=>JSON.parse(localStorage.getItem('master_p1_lucas_v4')));
 assert.deepEqual(clean.results,{});
 assert.equal(clean.questionSessions.length,0);
 assert.equal(clean.completed.p1dm_0,true);
 assert.equal(clean.notes.p1dm_0,'Preservar nota');
 await close();
});
test('simulado P2 mantém alternativa sem mostrar gabarito ao recarregar',async()=>{
 const {page,close}=await abrir();
 await page.evaluate(()=>startExam());
 await page.waitForSelector('.exam-step');
 await page.evaluate(()=>answerExam(1));
 await page.reload();
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 await page.evaluate(()=>navigate('exam'));
 assert.equal(await page.locator('.exam-step.done').count(),1);
 assert.equal(await page.evaluate(()=>Object.keys(ui.exam?.answers||{}).length),1);
 assert.equal(await page.locator('.exam-result-circle').count(),0);
 await close();
});
