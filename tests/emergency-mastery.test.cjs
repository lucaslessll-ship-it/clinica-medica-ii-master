'use strict';
const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const http=require('node:http');
const path=require('node:path');
const vm=require('node:vm');
const {chromium}=require('playwright');
const app='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
let server,browser,base;
before(async()=>{
 const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json'};
 server=http.createServer(async(req,res)=>{
  const file=path.join(process.cwd(),new URL(req.url,'http://local').pathname);
  try{res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(await fs.readFile(file));}
  catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 base='http://127.0.0.1:'+server.address().port+'/'+app+'/index.html';
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();if(server)await new Promise(resolve=>server.close(resolve));});
function mock(){
 const user={id:'urgencia-fixture',email:'estudante@example.test',user_metadata:{full_name:'Estudante',master_welcome_tour_v1:true}};
 localStorage.setItem('master_auth_local_owner',user.id);
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user,access_token:'fixture'}}}),getUser:async()=>({data:{user}}),updateUser:async()=>({data:{user}}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}})},from(){
  const query={select(){return query},eq(){return query},order(){return query},contains(){return query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'}}),upsert:async()=>({error:null}),then(resolve){resolve({data:[],error:null});}};
  return query;
 }})};
}
async function open(width=834,route='emergency'){
 const context=await browser.newContext({viewport:{width,height:980},reducedMotion:'reduce'});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',r=>r.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 await page.route('https://cdn.jsdelivr.net/npm/minisearch@7.2.0/**',r=>r.abort());
 await page.goto(base+'#'+route);
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 await page.waitForFunction(route=>typeof ui!=='undefined'&&ui.route===route,route);
 return {page,context,errors};
}
const priorities=['Arritmias cardíacas','Dor torácica e síndrome coronariana aguda','Emergência hipertensiva e edema agudo pulmonar','Gasometria e distúrbios acidobásicos','Distúrbios eletrolíticos graves','Emergências glicêmicas','Intoxicações exógenas','Emergências tireoidianas','Atendimento a catástrofes','Cuidados paliativos'];
test('Mastery content has stable IDs, editorial distribution, documented assets and aligned options',async()=>{
 const source=await fs.readFile(path.join(app,'emergency-mastery-content.js'),'utf8');
 const window={};vm.runInNewContext(source,{window});
 const d=window.UE_MASTERY_CONTENT.arritmias;
 assert.equal(d.cards.length,20);
 assert.equal(d.atlas.length,6);
 assert.equal(d.questions.length,20);
 assert.equal(new Set(d.questions.map(q=>q.id)).size,20);
 assert.equal(new Set(d.cards.map(c=>c.id)).size,20);
 for(const [level,total] of [[1,4],[2,10],[3,6]])assert.equal(d.questions.filter(q=>q.level===level).length,total);
 for(let key=0;key<5;key++)assert.equal(d.questions.filter(q=>q.a===key).length,4);
 for(const q of d.questions){
  assert.equal(q.o.length,5);
  assert.equal(q.rationales.filter(Boolean).length,5);
  assert.equal(q.why,q.rationales[q.a]);
  assert.ok(d.chapters.some(c=>c[0]===q.chapter&&d.refs[c[4]]));
 }
 for(const [slug,,,record] of d.atlas){
  const svg=await fs.readFile(path.join(app,'assets/urgencia/mastery',slug+'.svg'),'utf8');
  assert.match(svg,new RegExp('MIT-BIH '+record));
  assert.doesNotMatch(svg,/<script|<foreignObject/);
 }
});
test('navigation, ordered curriculum, feedback, persisted retest and flashcards',async()=>{
 const {page:p,context,errors}=await open();
 try{
  const main=p.locator('#main-content');
  assert.deepEqual(await main.locator('.ue-topic-list').first().locator('button strong').allTextContents(),priorities);
  assert.equal(await main.locator('.ue-topic-list').last().locator('li').count(),13);
  await main.getByRole('button',{name:'Abrir Arritmias cardíacas'}).click();
  await p.waitForURL('**#emergency-arritmias');
  await main.getByRole('checkbox',{name:'Concluir Leitura e preparação'}).check();
  assert.equal(await main.locator('progress').getAttribute('value'),'25');
  assert.equal(await main.locator('.posology-guide').count(),0);
  assert.equal(await p.evaluate(()=>Notas.contextoAtual()?.chave),'uep2_arritmias');
  await p.evaluate(()=>HIG.saveNote('uep2_arritmias','Rever bloqueios AV'));
  await p.reload();
  await p.waitForFunction(()=>Notas.contextoAtual()?.chave==='uep2_arritmias');
  assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('master_p2_hig_v2')).notes.uep2_arritmias),'Rever bloqueios AV');
  await main.getByRole('button',{name:'Ampliar ECG: Fibrilação atrial'}).click();
  await p.getByRole('dialog').waitFor();
  await p.keyboard.press('Escape');
  await main.getByRole('button',{name:'Fazer exercícios',exact:true}).click();
  await p.waitForURL('**#emergency-questions');
  assert.equal(await main.locator('.ue-bank-themes input:checked').count(),1);
  assert.equal(await main.getByRole('heading',{name:'Exercícios',exact:true}).count(),1);
  assert.equal(await main.locator('[data-qb-route]').count(),0);
  await main.getByRole('button',{name:/Iniciar exercícios/}).click();
  const [wrongIndex,id]=await p.evaluate(()=>{
   const b=store.study.ueQuestions,run=QuestionHistory.restore(b,'practice');
   const id=run.ids[0],correct=UEQuestions.pool().find(q=>q.id===id).a;
   return [run.orders[id].findIndex(a=>a!==correct),id];
  });
  await main.locator('button.ue-bank-option').nth(wrongIndex).click();
  assert.equal(await main.locator('.ue-bank-option.right').count(),1);
  assert.equal(await main.locator('.ue-bank-option.wrong').count(),4);
  assert.equal(await main.locator('.ue-option-why').count(),5);
  assert.equal(await main.getByText('Incorreta · Sua resposta').count(),1);
  await p.reload();
  await main.getByRole('button',{name:'Retomar treino',exact:true}).click();
  assert.equal(await main.locator('.ue-option-why').count(),5);
  assert.equal(await p.evaluate(id=>!!store.study.ueMastery.arritmias.review['q:'+id],id),true);
  await main.getByRole('button',{name:'Ler na Masterclass'}).click();
  await p.waitForURL('**#emergency-arritmias');
  await main.getByRole('button',{name:'Flashcards',exact:true}).click();
  await main.getByRole('button',{name:'Revisar conjunto'}).click();
  await main.getByRole('button',{name:'Revelar resposta'}).click();
  await main.getByRole('button',{name:'Errei',exact:true}).click();
  await p.reload();
  assert.equal(await main.getByText('Cartão 2 / 20').count(),1);
  await main.getByRole('button',{name:'Revisar erros'}).click();
  assert.equal(await main.getByText('Cartão 1 / 1').count(),1);
  assert.deepEqual(errors,[]);
 }finally{await context.close();}
});
test('sidebar simulados has preset and generator, saves edits and reveals results after submission',async()=>{
 const {page:p,context,errors}=await open(1280);
 try{
  const main=p.locator('#main-content'),nav=p.locator('#sidebar-nav');
  if(await p.locator('body.side-collapsed').count())await p.evaluate(()=>HIG.toggleSidebar());
  await nav.getByRole('button',{name:'Simulados',exact:true}).click();
  await p.waitForURL('**#emergency-simulado');
  await main.getByRole('heading',{name:'Simulados prontos'}).waitFor();
  await main.getByRole('heading',{name:'Gerar simulado'}).waitFor();
  await main.getByRole('button',{name:'Gerar simulado',exact:true}).click();
  assert.equal(await p.evaluate(()=>document.activeElement.textContent),'Gerar simulado');
  assert.equal(await main.locator('[data-qb-route]').count(),0);
  await main.getByRole('button',{name:'P2',exact:true}).click();
  const shown=await main.locator('.ue-bank-themes label').allTextContents();
  assert.deepEqual(shown.map(x=>x.split(' · ')[0]),priorities);
  await main.getByRole('button',{name:'Iniciar simulado pronto'}).click();
  assert.equal(await main.locator('.ue-bank-dot').count(),20);
  assert.equal(await main.locator('#ue-bank-timer').count(),1);
  assert.equal(await main.locator('.posology-term,.posology-guide').count(),0);
  await main.locator('button.ue-bank-option').nth(0).click();
  await main.locator('button.ue-bank-option').nth(1).click();
  await main.getByRole('button',{name:'Marcar para revisão'}).click();
  assert.equal(await main.locator('.ue-bank-option.right, .ue-option-why').count(),0);
  await p.reload();
  await main.locator('.ue-master-hero').getByRole('button',{name:'Retomar simulado',exact:true}).click();
  assert.equal(await main.locator('button.ue-bank-option').nth(1).getAttribute('aria-pressed'),'true');
  assert.equal(await main.getByRole('button',{name:'Remover marcação'}).count(),1);
  p.once('dialog',dialog=>dialog.accept());
  await main.getByRole('button',{name:'Entregar simulado'}).click();
  assert.equal(await main.locator('.ue-bank-option.right').count(),1);
  assert.equal(await main.locator('.ue-option-why').count(),5);
  assert.deepEqual(errors,[]);
 }finally{await context.close();}
});
test('mobile and tablet show the notebook without overflow and validate QT inputs',async()=>{
 const {page:p,context}=await open(390,'emergency-arritmias');
 try{
  const main=p.locator('#main-content');
  for(const width of [390,834,1280]){
   await p.setViewportSize({width,height:950});
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),width+' px');
  }
  await p.evaluate(()=>HIG.setTheme('dark'));
  assert.equal(await p.locator('body').getAttribute('data-theme'),'dark');
  await main.getByRole('button',{name:'Calcular QTc'}).click();
  await main.locator('output').getByText(/Confira as unidades/).waitFor();
  await main.getByLabel('QT (ms)',{exact:true}).fill('400');
  await main.getByLabel('RR (s)',{exact:true}).fill('0.81');
  await main.getByRole('button',{name:'Calcular QTc'}).click();
  await main.locator('output').getByText(/Bazett: 444 ms · Fridericia: 429 ms/).waitFor();
  await main.getByLabel('RR (s)',{exact:true}).fill('0.1');
  await main.getByRole('button',{name:'Calcular QTc'}).click();
  await main.locator('output').getByText(/Confira as unidades/).waitFor();
 }finally{await context.close();}
});
