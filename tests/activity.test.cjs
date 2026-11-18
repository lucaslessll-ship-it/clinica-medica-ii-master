const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const AxeBuilder=require('@axe-core/playwright').default;
const fs=require('node:fs/promises'),http=require('node:http'),path=require('node:path');
const APP='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';let browser,server,base;
before(async()=>{server=http.createServer(async(req,res)=>{try{const f=path.join(process.cwd(),'dist',new URL(req.url,'http://local').pathname);res.setHeader('Content-Type',f.endsWith('.js')?'text/javascript':f.endsWith('.css')?'text/css':f.endsWith('.json')?'application/json':f.endsWith('.svg')?'image/svg+xml':'text/html');res.end(await fs.readFile(f));}catch{res.writeHead(404).end();}});await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});});
after(async()=>{await browser?.close();await new Promise(r=>server.close(r));});
function mock(){
 const f=window.activityFixture,user=f.user={id:'11111111-1111-4111-8111-111111111111',email:'aluno@example.test',user_metadata:{full_name:'Estudante',role:'admin'}};
 f.calls=[];f.events={};f.pending=[];localStorage.setItem('master_auth_local_owner',user.id);
 const client={auth:{getSession:async()=>({data:{session:{user:f.user,access_token:'fixture'}}}),getUser:async()=>({data:{user:f.user}}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}})},
 from(table){let payload;const q={select(){return q},eq(){return q},order(){return q},contains(){return q},maybeSingle:async()=>({data:table==='master_activity_preferences'?(f.known?{enabled:f.enabled,notice_version:'2026-11-18'}:null):{policy_version:'2026-11-08'},error:null}),upsert:async value=>{if(table==='master_activity_preferences'){f.known=true;f.enabled=value.enabled;f.preference=value;}return {error:null}},then(r){r({data:[],error:null})}};return q;},
 async rpc(name,args={}){
  f.calls.push({name,args:JSON.parse(JSON.stringify(args))});
  if(name==='master_activity_is_admin')return {data:!!f.admin,error:null};
  if(name==='master_activity_record'){
   if(f.defer)return new Promise(resolve=>f.pending.push(resolve));
   if(f.failures){f.failures--;return {error:{message:'offline'}};}
   if(!f.known){f.known=true;f.enabled=true;}
   if(f.enabled)for(const e of args.p_events)f.events[e.id]=e;
   return {data:f.enabled?args.p_events.length:0,error:null};
  }
  if(name==='master_activity_report'){
   if(!f.admin)return {error:{message:'forbidden'}};
   if(f.reportError)return {error:{message:'offline'}};
   const row={id:'22222222-2222-4222-8222-222222222222',user_id:user.id,email:'aluno@example.test',name:'<img src=x onerror=alert(1)>',kind:'lesson_open',route:'pocus',resource:'pocus:m4',happened_at:'2026-11-18T12:00:00Z',duration_ms:0};
   return {data:{summary:{active_users:1,views:2,active_ms:90000,answers:2,correct:1},users:[{user_id:user.id,name:row.name,email:row.email,tracking_enabled:true,answers:2,correct:1,active_ms:90000,last_activity:row.happened_at,last_sign_in_at:row.happened_at}],total_users:1,resources:[{route:'pocus',resource:'pocus:m4',visits:2,active_ms:90000}],timeline:[{...row,...(args.p_before?{id:'33333333-3333-4333-8333-333333333333',happened_at:'2026-11-18T11:00:00Z'}:{})}],has_more:!args.p_before},error:null};
  }
  return {data:null,error:null};
 }};
 window.supabase={createClient:()=>client};
}
async function open(t,options={},viewport={width:1280,height:900}){
 const context=await browser.newContext({viewport,reducedMotion:'reduce',timezoneId:'America/Sao_Paulo'}),p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(o=>window.activityFixture={known:true,enabled:false,admin:false,...o},options);
 await p.route('https://cdn.jsdelivr.net/**/supabase.min.js',r=>r.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 if(options.clock)await p.clock.install({time:new Date('2026-11-18T12:00:00Z')});await p.goto(base+'/'+APP+'/index.html'+(options.hash||''));await p.waitForFunction(()=>document.getElementById('master-auth')?.hidden);await p.waitForFunction(()=>activityFixture.calls.some(c=>c.name==='master_activity_is_admin'));await p.bringToFront();
 t.after(async()=>{await context.close();assert.deepEqual(errors,[]);});return p;
}
const recorded=p=>p.evaluate(()=>Object.values(activityFixture.events));

test('contas sem preferência registram automaticamente sem mensagem inicial; desativação salva é respeitada',async t=>{
 const p=await open(t,{known:false});await p.evaluate(()=>{navigate('sources');MasterActivity.track('assistant_request');});await p.evaluate(()=>MasterActivity.flush());assert.ok((await recorded(p)).length>0);assert.equal(await p.locator('#activity-notice').count(),0);
 const q=await open(t,{known:true,enabled:false});await q.evaluate(()=>{navigate('sources');MasterActivity.track('assistant_request');});await q.evaluate(()=>MasterActivity.flush());assert.equal((await recorded(q)).length,0);assert.equal(await q.locator('#activity-notice').count(),0);
});

test('controle no perfil e registro de navegação e questões sem textos, buscas, URLs completas ou chaves livres',async t=>{
 const p=await open(t,{known:true,enabled:false});await p.evaluate(()=>MasterActivity.privacy());await p.locator('.activity-privacy [data-activity-choice=yes]').click();await p.waitForFunction(()=>activityFixture.preference?.enabled===true);
 await p.evaluate(()=>{openTopic('neuro1');toggleChapter('neuro1_0');QNav.registrar('p2',0,true,{q:'TEXTO_PRIVADO_QUE_NAO_PODE_SER_REGISTRADO'});MasterActivity.track('assistant_request','',{question:'SEGREDO',message:'SEGREDO',token:'SEGREDO'});});
 await p.evaluate(()=>{navigate('pocus');PocusCourse.open(3);PocusCourse.answer(3,0,0);PocusCourse.complete('m4',true);});await p.evaluate(()=>MasterActivity.flush());
 const events=await recorded(p);assert.ok(events.some(e=>e.kind==='lesson_open'&&e.resource==='pocus:m4'));assert.ok(events.some(e=>e.kind==='lesson_complete'&&e.resource==='pocus:m4'));assert.ok(events.some(e=>e.kind==='question_answer'&&e.resource==='p2:0'&&e.correct));
 assert.doesNotMatch(JSON.stringify(events),/SEGREDO|TEXTO_PRIVADO|access_token|https?:/);for(const e of events)assert.ok(Object.keys(e).every(k=>['id','session_id','kind','route','resource','duration_ms','correct','code','happened_at'].includes(k)));
});

test('desativar pela conta interrompe novos eventos sem apagar progresso',async t=>{
 const p=await open(t,{enabled:true});await p.evaluate(()=>{openTopic('neuro1');toggleChapter('neuro1_0');});await p.evaluate(()=>MasterActivity.flush());const before=(await recorded(p)).length;
 await p.evaluate(()=>MasterActivity.privacy());await p.locator('.activity-privacy [data-activity-choice=no]').click();await p.waitForFunction(()=>activityFixture.preference?.enabled===false);await p.keyboard.press('Escape');
 await p.evaluate(()=>{navigate('sources');MasterActivity.track('assistant_request');});await p.evaluate(()=>MasterActivity.flush());assert.equal((await recorded(p)).length,before);assert.equal(await p.evaluate(()=>store.completed.neuro1_0),true);
});

test('conta comum não ganha painel alterando metadados ou digitando a rota',async t=>{
 const p=await open(t);assert.equal(await p.locator('#master-activity-admin').isVisible(),false);await p.evaluate(()=>navigate('admin'));assert.match(await p.locator('#main-content').innerText(),/Acesso restrito/);assert.equal(await p.evaluate(()=>activityFixture.calls.filter(c=>c.name==='master_activity_report').length),0);
});

test('tempo estimado exige foco, visibilidade e interação recente e não cresce em aba oculta',async t=>{
 const p=await open(t,{enabled:true,clock:true});await p.evaluate(()=>{window.activityVisibility='visible';Object.defineProperty(document,'visibilityState',{configurable:true,get:()=>window.activityVisibility});});
 await p.clock.runFor(30000);await p.evaluate(()=>MasterActivity.flush());const first=(await recorded(p)).filter(e=>e.kind==='active_time');assert.ok(first.length>=1);assert.ok(first.every(e=>e.duration_ms>0&&e.duration_ms<=30000));
 await p.evaluate(()=>{window.activityVisibility='hidden';document.dispatchEvent(new Event('visibilitychange'));});await p.clock.runFor(60000);await p.evaluate(()=>MasterActivity.flush());assert.equal((await recorded(p)).filter(e=>e.kind==='active_time').length,first.length);
});

test('resposta atrasada e fila de eventos não atravessam encerramento ou troca de conta',async t=>{
 const p=await open(t,{enabled:true});await p.evaluate(()=>{activityFixture.defer=true;void MasterActivity.flush();});await p.waitForFunction(()=>activityFixture.pending.length>0);
 await p.evaluate(()=>{window.dispatchEvent(new Event('master-auth-ended'));activityFixture.user={id:'99999999-9999-4999-8999-999999999999',email:'outra@example.test',user_metadata:{}};activityFixture.enabled=false;window.dispatchEvent(new Event('master-auth-ready'));activityFixture.defer=false;activityFixture.pending.splice(0).forEach(r=>r({data:1,error:null}));});
 await p.evaluate(()=>MasterActivity.flush());assert.equal(await p.locator('#master-activity-admin').isVisible(),false);assert.equal((await recorded(p)).length,0);
});

test('reenvio mantém os mesmos IDs e a falha de rede não bloqueia a navegação',async t=>{
 const p=await open(t,{enabled:true,failures:1,clock:true});await p.evaluate(()=>MasterActivity.flush());await p.evaluate(()=>navigate('sources'));assert.equal(await p.evaluate(()=>ui.route),'sources');await p.clock.runFor(25000);await p.evaluate(()=>MasterActivity.flush());
 const calls=await p.evaluate(()=>activityFixture.calls.filter(c=>c.name==='master_activity_record'));assert.ok(calls.length>=2);assert.equal(calls[0].args.p_events[0].id,calls[1].args.p_events[0].id);assert.equal(new Set((await recorded(p)).map(e=>e.id)).size,(await recorded(p)).length);
});

test('painel do proprietário filtra, pagina, escapa nomes e cabe no celular, tablet e desktop',async t=>{
 for(const width of [320,820,1440]){
  const p=await open(t,{admin:true,enabled:false},{width,height:950});await p.waitForFunction(()=>!document.getElementById('master-activity-admin').hidden);await p.evaluate(()=>navigate('admin'));await p.locator('.activity-timeline li').waitFor();
  assert.equal(await p.locator('#activity-report img').count(),0);assert.match(await p.locator('.activity-resources').innerText(),/POCUS · Módulo 4/);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await p.locator('#activity-more').click();await p.waitForFunction(()=>document.querySelectorAll('.activity-timeline li').length===2);
  const calls=await p.evaluate(()=>activityFixture.calls.filter(c=>c.name==='master_activity_report'));const cursorIndex=calls.findIndex(c=>c.args.p_before);assert.ok(cursorIndex>0);assert.equal(calls[cursorIndex].args.p_before,'2026-11-18T12:00:00Z');assert.equal(calls[cursorIndex].args.p_start,calls[cursorIndex-1].args.p_start);
  await p.locator('#activity-filters select[name=user]').selectOption('11111111-1111-4111-8111-111111111111');await p.locator('#activity-filters button').click();await p.waitForFunction(()=>activityFixture.calls.filter(c=>c.name==='master_activity_report').at(-1).args.p_user==='11111111-1111-4111-8111-111111111111');
  for(const theme of ['light','dark']){await p.evaluate(theme=>HIG.setTheme(theme),theme);await p.locator('.activity-timeline li').first().waitFor();const a=await new AxeBuilder({page:p}).include('.activity-admin').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(a.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[]);}
  await fs.mkdir('work/activity',{recursive:true});await p.screenshot({path:'work/activity/admin-'+width+'.png'});
 }
});

test('erro de consulta administrativa mostra tentativa de recuperação e não deixa relatório antigo exposto',async t=>{
 const p=await open(t,{admin:true});await p.waitForFunction(()=>!document.getElementById('master-activity-admin').hidden);await p.evaluate(()=>navigate('admin'));await p.locator('.activity-timeline li').waitFor();await p.evaluate(()=>activityFixture.reportError=true);await p.locator('#activity-filters button').click();await p.waitForFunction(()=>document.getElementById('activity-report-status').textContent.includes('Não foi possível'));assert.equal(await p.locator('#activity-report').innerText(),'');await p.evaluate(()=>activityFixture.reportError=false);await p.locator('#activity-filters button').click();await p.locator('.activity-timeline li').waitFor();
});

 test('abrir uma aula P1 diretamente mantém o identificador ao iniciar a coleta após a autenticação',async t=>{
 const p=await open(t,{enabled:true,hash:'#p1topic'});await p.waitForFunction(()=>document.querySelector('#main-content').dataset.activityKind==='lesson_open');await p.evaluate(()=>MasterActivity.flush());
 const events=await recorded(p);assert.ok(events.some(e=>e.kind==='lesson_open'&&e.route==='p1topic'&&e.resource.startsWith('p1:')));
 });

 test('troca de casos e respostas no Decision Lab mantêm o caso correto no histórico',async t=>{
 const p=await open(t,{enabled:true});const ids=await p.evaluate(()=>{navigate('banca');const c=BANCA.cases[1];BANCA.chooseCase(c.id);BANCA.answer(c.stages[0].a);navigate('decisionlab');const e=EVIDENCE.caseItems[1];EVIDENCE.chooseCase(1);EVIDENCE.answerCase(e.correct);return {banca:c.id,evidence:e.id};});await p.evaluate(()=>MasterActivity.flush());const events=await recorded(p);
 assert.ok(events.some(e=>e.kind==='case_open'&&e.resource==='decisionlab:'+ids.banca));assert.ok(events.some(e=>e.kind==='question_answer'&&e.resource==='decisionlab:'+ids.banca+':0'&&e.correct));assert.ok(events.some(e=>e.kind==='case_open'&&e.resource==='microdecisao:'+ids.evidence));
 });
