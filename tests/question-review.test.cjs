const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
let browser,server,base;
before(async()=>{
 server=http.createServer(async(req,res)=>{try{const file=path.join(process.cwd(),process.env.MASTER_TEST_DIST?'dist':'',decodeURIComponent(new URL(req.url,'http://local').pathname));res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();await new Promise(resolve=>server.close(resolve));});
function mock(){
 let callback;const user={id:'cir-test',email:'cir@example.test',user_metadata:{full_name:'Cirurgia'}};
 localStorage.setItem('master_auth_local_owner',user.id);const canvas=document.createElement('canvas');canvas.width=600;canvas.height=400;const ctx=canvas.getContext('2d');ctx.fillStyle='#284c54';ctx.fillRect(0,0,600,400);const fixture=canvas.toDataURL('image/png').split(',')[1];
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user,access_token:'test-jwt'}}}),getUser:async()=>({data:{user}}),onAuthStateChange(fn){callback=fn;window.__reviewSignOut=()=>callback('SIGNED_OUT',null);return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(table){let columns='',key='';const query={select(c){columns=c;return query},order(){return query},contains(_,keys){key=keys[0];return query},eq(){return query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null}),then(resolve){const data=table==='lesson_images'?(columns==='keys'?[{keys:Array.from({length:8},(_,i)=>'rad_m'+(i+2))}]:[{id:key,caption:'Imagem sintética para teste',credit:'Fixture',mime:'image/png',data:fixture,marks:[{t:'Achado',x:50,y:50,lx:10,ly:10}]}]):[];resolve({data,error:null});}};return query;}})};
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
function seed(p,bank,id,correct=false){return p.evaluate(({bank,id,correct})=>{const def=QNav.catalogos()[bank],q=def.items().find(q=>String(q.id)===String(id)),a=correct?q.a:(q.a+1)%q.o.length;def.answer(q.id,a);if(!def.records)QNav.registrar(bank,q.id,correct,{tid:q.t,tema:q.tema,q:q.q});return {key:bank+':'+q.id,id:q.id};},{bank,id,correct});}
test('erro agenda amanhã, acerto encerra a fila e novo erro reabre sem apagar histórico',async()=>{
 const {page:p,close}=await abrir();await p.clock.install({time:new Date('2026-11-18T15:00:00-03:00')});
 await p.evaluate(()=>{QuestionReview.begin('p2','Sessão original');startReview([0]);choosePractice((QUESTION_BANK[0].a+1)%QUESTION_BANK[0].o.length);submitPractice();});
 let state=await p.evaluate(()=>({entry:HIG.qlog()['p2:0'],due:Study.due(),sessions:QuestionReview.sessions(),wrong:QuestionReview.available({bank:'p2',mode:'wrong'}).length}));
 assert.equal(state.wrong,1);assert.equal(new Date(state.entry.due).toISOString(),'2026-11-19T03:00:00.000Z');assert.equal(state.sessions.length,1);assert.equal(state.due.length,0);
 const sid=state.sessions[0].id;
 await p.evaluate(()=>{QuestionReview.open('p2','wrong');QuestionReview.start();QuestionReview.answer(QUESTION_BANK[0].a);QuestionReview.answer((QUESTION_BANK[0].a+1)%4);});
 state=await p.evaluate(()=>({entry:HIG.qlog()['p2:0'],due:store.study.reviews[0].due,wrong:QuestionReview.available({bank:'p2',mode:'wrong'}).length,sessions:QuestionReview.sessions()}));
 assert.equal(state.entry.res,true);assert.equal(state.entry.due,0);assert.equal(state.entry.erros,1);assert.equal(state.due,null);assert.equal(state.wrong,0);assert.equal(state.sessions.at(-1).items['p2:0'].attempts,1);assert.equal(state.sessions[0].items['p2:0'].ok,false);
 await p.clock.fastForward(4*86400000);assert.equal(await p.evaluate(()=>Study.due().length),0);
 await p.evaluate(sid=>QuestionReview.open('all','wrong',sid),sid);assert.equal(await p.evaluate(()=>QuestionReview.available().length),0);
 await seed(p,'p2',0,false);assert.equal(await p.evaluate(()=>HIG.qlog()['p2:0'].res),false);assert.equal(await p.evaluate(()=>HIG.qlog()['p2:0'].erros),2);await close();
});
test('central mistura blocos, preserva resultados nativos e retira acertos também de Cirurgia e P1',async()=>{
 const {page:p,close}=await abrir();const cid=await p.evaluate(()=>CIR.own[0].id);
 for(const [bank,id] of [['p2',1],['p1',0],['cir',cid]])await seed(p,bank,id,false);
 await p.evaluate(()=>{QuestionReview.open();QuestionReview.start();});
 const blocks=[];
 for(let i=0;i<3;i++){
  const b=await p.evaluate(()=>{const title=document.querySelector('.qr-question h2').textContent,q=QuestionReview.catalog().find(q=>q.q===title);QuestionReview.answer(q.a);return q.b;});blocks.push(b);
  await p.getByRole('button',{name:i===2?'Ver resultado':'Próxima questão',exact:true}).click();
 }
 assert.deepEqual(blocks.sort(),['cir','p1','p2']);assert.match(await p.locator('.qr-result').innerText(),/3 de 3 corretas/);
 assert.equal(await p.evaluate(()=>QuestionReview.available({mode:'wrong',bank:'all'}).length),0);assert.equal(await p.evaluate(()=>CIR.dueCount()),0);
 assert.equal(await p.evaluate(id=>JSON.parse(localStorage.getItem(CIR.KEY)).results[id].next,cid),null);
 await close();
});
test('filtros de inéditas, erradas, todas e sessão são independentes e não fabricam sessões antigas',async()=>{
 const {page:p,close}=await abrir();
 await p.evaluate(()=>{store.results[0]={answer:(QUESTION_BANK[0].a+1)%4,correct:false,at:'2026-11-10T12:00:00Z',attempts:2};store.results[1]={answer:QUESTION_BANK[1].a,correct:true,at:'2026-11-10T12:00:00Z',attempts:1};stateSave();navigate('revisao');});
 const counts=await p.evaluate(()=>({all:QuestionReview.available({bank:'p2',mode:'all'}).length,new:QuestionReview.available({bank:'p2',mode:'new'}).length,wrong:QuestionReview.available({bank:'p2',mode:'wrong'}).map(q=>q.id),due:QuestionReview.available({bank:'p2',mode:'due'}).map(q=>q.id),sessions:QuestionReview.sessions().length}));
 assert.equal(counts.all-counts.new,2);assert.deepEqual(counts.wrong,[0]);assert.deepEqual(counts.due,[0]);assert.equal(counts.sessions,0);
 await p.evaluate(()=>{HIG.qlog()['p2:0'].box=1;QuestionReview.migrate();});assert.equal(await p.evaluate(()=>QuestionReview.available({bank:'p2',mode:'wrong'}).length),0);
 await close();
});
test('questões dos cursos entram na central, corrigem no progresso original e mantêm histórico dentro da sessão',async()=>{
 const {page:p,close}=await abrir();await p.evaluate(()=>navigate('revisao'));await p.waitForFunction(()=>QNav.catalogos().ecg&&QNav.catalogos().rad);
 const names=await p.evaluate(()=>Object.keys(QNav.catalogos()));for(const name of ['pocus','ecg','hemo','atb','rad','labRenal','labFerro','labMicro'])assert.ok(names.includes(name),name);
 for(const bank of ['pocus','ecg','hemo','atb','rad']){
  const id=await p.evaluate(bank=>QNav.catalogos()[bank].items()[0].id,bank);await seed(p,bank,id,false);
  await p.evaluate(bank=>{QuestionReview.open(bank,'wrong');QuestionReview.start();const q=QuestionReview.available({bank,mode:'wrong'})[0];QuestionReview.answer(q.a);},bank);
  assert.equal(await p.evaluate(bank=>QuestionReview.available({bank,mode:'wrong'}).length,bank),0);
  assert.equal(await p.evaluate(({bank,id})=>QNav.catalogos()[bank].items().find(q=>q.id===id).result.correct,{bank,id}),true);
 }
 const id=await p.evaluate(()=>QNav.catalogos().hemo.items()[1].id);await p.evaluate(()=>QuestionReview.begin('hemo','Módulo revisitado'));await seed(p,'hemo',id,false);await seed(p,'hemo',id,true);
 const last=await p.evaluate(()=>QuestionReview.sessions().at(-1));assert.equal(last.items['hemo:'+id].hadError,true);assert.equal(last.items['hemo:'+id].ok,true);assert.equal(last.items['hemo:'+id].attempts,2);
 await close();
});
test('sugestão do início pode ser ocultada hoje, volta amanhã e abre a fila correta',async()=>{
 const {page:p,close}=await abrir();await p.clock.install({time:new Date('2026-11-18T15:00:00-03:00')});await seed(p,'p2',0,false);await p.evaluate(()=>navigate('dashboard'));
 await p.locator('.qr-suggestion').waitFor();await p.getByRole('button',{name:'Ocultar sugestão de revisão hoje'}).click();assert.equal(await p.locator('.qr-suggestion').count(),0);
 await p.clock.fastForward(86400000);await p.evaluate(()=>render());await p.locator('.qr-suggestion').waitFor();await p.locator('.qr-suggestion').getByRole('button',{name:'Revisar agora',exact:true}).click();
 assert.equal(await p.evaluate(()=>ui.route),'revisao');assert.equal(await p.locator('.qr-filters select').nth(1).inputValue(),'due');await close();
});
test('layout em 320, 820 e 1280 px, teclado e sessão encerrada não deixam fila de outra conta',async()=>{
 for(const width of [320,820,1280]){
  const {page:p,close}=await abrir(width);await seed(p,'p2',0,false);await p.evaluate(()=>QuestionReview.open('p2'));
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await p.locator('.qr-filters select').first().focus();await p.keyboard.press('Tab');assert.equal(await p.locator('.qr-filters select').nth(1).evaluate(el=>el===document.activeElement),true);
  await p.getByRole('button',{name:/Começar rodada/}).click();assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  if(width===820){await fs.mkdir('work',{recursive:true});await p.screenshot({path:'work/revisao-ipad.png'});}
  await p.evaluate(()=>window.__reviewSignOut());await p.waitForFunction(()=>!document.getElementById('master-auth').hidden);
  const before=await p.evaluate(()=>JSON.stringify(localStorage.getItem('master_p2_hig_v2')));await p.evaluate(()=>QuestionReview.answer(0));assert.equal(await p.evaluate(()=>JSON.stringify(localStorage.getItem('master_p2_hig_v2'))),before);
  await close();
 }
});
test('central tem leitura acessível, sessões adicionais e limpeza respeita os blocos separados',async()=>{
 const {page:p,close}=await abrir(820);await seed(p,'p2',0,false);await seed(p,'p1',0,false);
 await p.evaluate(()=>{const r=HIG.questionReview();for(let i=0;i<14;i++)r.sessions.push({id:'older-'+i,bank:'p2',label:'Rodada de teste',started:Date.now()-100000-i,items:{'p2:0':{b:'p2',id:0,ok:false,hadError:true,q:'Questão da sessão de teste',tema:'Teste'}}});HIG.qlogSave();QuestionReview.open();});
 await p.getByRole('button',{name:'Mostrar mais sessões',exact:true}).click();assert.ok(await p.locator('.qr-session').count()>12);
 await p.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await p.screenshot({path:'work/revisao-central-ipad.png'});
 const AxeBuilder=require('@axe-core/playwright').default;
 for(const theme of ['light','dark']){await p.evaluate(theme=>HIG.setTheme(theme),theme);const audit=await new AxeBuilder({page:p}).include('#main-content').withTags(['wcag2a','wcag2aa']).analyze();if(audit.violations.length)console.log('AXE_DETAILS',theme,JSON.stringify(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,html:n.html,checks:[...n.any,...n.all,...n.none].map(x=>({message:x.message,data:x.data}))}))}))));assert.deepEqual(audit.violations.map(v=>({id:v.id,impact:v.impact})),[]);}
 p.once('dialog',d=>d.accept());await p.evaluate(()=>resetProgress());
 assert.equal(await p.evaluate(()=>!!HIG.qlog()['p2:0']),false);assert.equal(await p.evaluate(()=>!!HIG.qlog()['p1:0']),true);
 assert.ok(await p.evaluate(()=>QuestionReview.sessions().every(s=>Object.values(s.items).every(q=>q.b==='p1'||q.b==='cir'))));
 await close();
});
