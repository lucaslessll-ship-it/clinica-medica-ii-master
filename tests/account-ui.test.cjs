const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium,webkit}=require('playwright');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
const APP='/MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/index.html';
const keys=['master_p2_lucas_v1','master_p1_lucas_v4','master_p2_hig_v2','master_clinica_banca_v7','MASTER_EVIDENCE_UI_v5'];
const user={id:'user-a',email:'ana@example.test',user_metadata:{full_name:'Ana Lima'}};
const empty={results:{},review:{},completed:{},caseDone:{},discursive:{},examHistory:[]};
let server,browser,base;
before(async()=>{
 await fs.mkdir('work',{recursive:true});
 server=http.createServer(async(req,res)=>{
  try{const filename=path.join(process.cwd(),decodeURIComponent(new URL(req.url,'http://local').pathname));const data=await fs.readFile(filename.endsWith('/')?filename+'index.html':filename);res.setHeader('Content-Type',filename.endsWith('.js')?'text/javascript':filename.endsWith('.css')?'text/css':'text/html');res.end(data);}catch{res.writeHead(404);res.end();}
 });await new Promise(r=>server.listen(0,'127.0.0.1',r));base=`http://127.0.0.1:${server.address().port}`;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();await new Promise(r=>server.close(r));});
function mockSdk(){
 const f=window.fixture,log=window.calls=[];let callback,session=f.session?{user:f.user}:null;
 const result=async(name,args,data)=>{log.push({name,args});if(f.delay)await new Promise(r=>setTimeout(r,f.delay));const error=f.errors?.[name];return {data,error};};
 const emit=(event,s=session)=>{session=s;callback?.(event,s);};
 const auth={
  onAuthStateChange(fn){callback=fn;return {data:{subscription:{unsubscribe(){}}}};},
  getSession:()=>result('getSession',null,{session}),getUser:()=>result('getUser',null,{user:session?.user}),
  async signInWithPassword(args){const r=await result('login',args,{session:{user:f.user}});if(!r.error)emit('SIGNED_IN',r.data.session);return r;},
  signUp:args=>result('register',args,{session:null}),
  resetPasswordForEmail:args=>result('forgot',args,{}),signInWithOAuth:args=>result('google',args,{}),
  async updateUser(args){log.push({name:'update',args});return {data:{user:session?.user},error:f.updateErrors?.shift()||null};},
  reauthenticate:()=>result('reauthenticate',null,{}),
  async signOut(args){const r=await result('signout',args,{});if(!r.error)emit('SIGNED_OUT',null);return r;}
 };
 window.__authTest={emit,session:s=>session=s};
 window.supabase={createClient:()=>({auth,from:table=>{
  const query={select(){return query},eq(){return table==='master_progress'?result('load',table,f.remote):query},maybeSingle:()=>result('consent',null,f.consent?{policy_version:'2026-11-08'}:null),insert:args=>result('acceptConsent',args,{}),upsert:args=>result('upsert',args,{})};return query;
 }})};
}
async function open(options={}){
 const context=await browser.newContext({viewport:options.viewport||{width:1440,height:1000},isMobile:options.mobile||false,hasTouch:options.mobile||false});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const f={user,session:false,remote:[],consent:true,...options};
 await page.addInitScript(({f,keys})=>{
  window.fixture=f;
  localStorage.setItem('master_auth_local_owner',f.user.id);
  if(f.local)for(const [key,value]of Object.entries(f.local))localStorage.setItem(key,JSON.stringify(value));
 },{f,keys});
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',r=>r.fulfill({contentType:'text/javascript',body:`(${mockSdk.toString()})()`}));
 await page.goto(base+(options.root?'/' :APP)+(options.query||''));
 await page.waitForFunction(()=>window.MASTER_AUTH);
 return {page,context,errors,close:async()=>{assert.deepEqual(errors,[]);await context.close();}};
}
async function login(page){await page.locator('#master-email').fill(user.email);await page.locator('#master-password').fill('strong-password');await page.locator('#master-submit').click();await page.waitForFunction(()=>document.getElementById('master-auth').hidden);}
async function visible(page,selector){await page.locator(selector).waitFor({state:'visible'});}
async function text(page,selector,match){await page.waitForFunction(({selector,source})=>new RegExp(source).test(document.querySelector(selector)?.textContent||''),{selector,source:match.source});}
async function calls(page,name){return page.evaluate(name=>calls.filter(c=>c.name===name),name);}
test('login validates, blocks duplicate sends, and shows actionable errors',async()=>{
 const t=await open({delay:150,errors:{login:{code:'invalid_credentials'}}}),p=t.page;
 await p.locator('#master-email').fill('not-an-email');await p.locator('#master-password').fill('x');await p.locator('#master-submit').click();assert.equal((await calls(p,'login')).length,0);
 await p.locator('#master-email').fill(user.email);await p.locator('#master-password').fill('valid-password');await p.locator('#master-submit').click();
 assert.equal(await p.locator('#master-submit').isDisabled(),true);await p.locator('#master-auth-form').dispatchEvent('submit');
 await text(p,'#master-auth-message',/E-mail ou senha incorretos/);assert.equal((await calls(p,'login')).length,1);assert.equal(await p.locator('#master-submit').isEnabled(),true);await t.close();
});
test('registration is separate, validates confirmation, and requests email confirmation',async()=>{
 const t=await open(),p=t.page;await p.locator('#master-register-tab').click();await p.locator('#master-email').fill(user.email);await p.locator('#master-password').fill('strong-password');await p.locator('#master-confirm').fill('different');await p.locator('#master-submit').click();await text(p,'#master-auth-message',/não coincidem/);assert.equal((await calls(p,'register')).length,0);
 await p.locator('#master-confirm').fill('strong-password');await p.locator('#master-submit').click();await text(p,'#master-auth-message',/confirmar o cadastro/);assert.equal((await calls(p,'register')).length,1);await t.close();
});
test('forgot password validates email and retains a neutral success message',async()=>{
 const t=await open(),p=t.page;assert.equal(await p.locator('#master-google').isHidden(),true);await p.locator('#master-forgot').click();assert.equal(await p.locator('#master-password').count(),0);await p.locator('#master-email').fill(user.email);await p.locator('#master-submit').click();await text(p,'#master-auth-message',/Se o endereço estiver cadastrado/);assert.equal((await calls(p,'forgot')).length,1);await t.close();
});
test('login loads progress, menu belongs to user, Escape and outside click close it',async()=>{
 const t=await open({remote:[{storage_key:keys[0],payload:{...empty,completed:{neuro2_1:true}}}]}),p=t.page;
 await login(p);await text(p,'#master-avatar',/AL/);assert.equal(await p.evaluate(()=>store.completed.neuro2_1),true);
 await p.locator('#master-avatar').click();await text(p,'#master-profile-email',/ana@example.test/);await p.keyboard.press('Escape');assert.equal(await p.locator('#master-profile').isHidden(),true);
 await p.locator('#master-avatar').click();await p.locator('#main-content h1').click();assert.equal(await p.locator('#master-avatar').getAttribute('aria-expanded'),'false');await t.close();
});
test('consent uses an inline form and can be declined without exposing study data',async()=>{
 const t=await open({session:true,consent:false}),p=t.page;await visible(p,'#master-consent');assert.equal(await p.locator('#app-shell').getAttribute('aria-hidden'),'true');await p.locator('#master-back').click();await text(p,'#master-auth-title',/Seu estudo/);assert.equal((await calls(p,'signout')).length,1);await t.close();
});
test('recovery callback survives refresh, updates password and unlocks only after progress load',async()=>{
 const t=await open({session:true,query:'?auth=recovery'}),p=t.page;await text(p,'#master-auth-title',/Definir nova senha/);assert.equal((await calls(p,'load')).length,0);
 await p.reload();await text(p,'#master-auth-title',/Definir nova senha/);await p.locator('#master-password').fill('another-strong-password');await p.locator('#master-confirm').fill('another-strong-password');await p.locator('#master-submit').click();await p.waitForFunction(()=>document.getElementById('master-auth').hidden);assert.equal((await calls(p,'update'))[0].args.password,'another-strong-password');assert.equal(await p.evaluate(()=>sessionStorage.getItem('master_password_recovery')),null);await t.close();
});
test('PASSWORD_RECOVERY event interrupts an active session',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 await p.evaluate(user=>__authTest.emit('PASSWORD_RECOVERY',{user}),user);await text(p,'#master-auth-title',/Definir nova senha/);assert.equal(await p.locator('#app-shell').getAttribute('inert'),'');await t.close();
});
test('password change validates confirmation and handles nonce reauthentication and current password',async()=>{
 const t=await open({session:true,updateErrors:[{code:'reauthentication_needed'},{code:'reauthentication_not_valid'},{code:'current_password_missing'},null]}),p=t.page;
 await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.locator('#master-avatar').click();await p.locator('#master-change-password').click();
 await p.locator('#master-password').fill('new-password-123');await p.locator('#master-confirm').fill('different');await p.locator('#master-submit').click();assert.equal((await calls(p,'update')).length,0);
 await p.locator('#master-confirm').fill('new-password-123');await p.locator('#master-submit').click();await visible(p,'#master-nonce');assert.equal((await calls(p,'reauthenticate')).length,1);
 await p.locator('#master-nonce').fill('bad-code');await p.locator('#master-submit').click();await text(p,'#master-auth-message',/Código inválido/);
 await p.locator('#master-nonce').fill('123456');await p.locator('#master-submit').click();await visible(p,'#master-current');await p.locator('#master-current').fill('old-password');await p.locator('#master-submit').click();await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 assert.deepEqual((await calls(p,'update')).at(-1).args,{password:'new-password-123',nonce:'123456',current_password:'old-password'});await t.close();
});
test('expired recovery link and expired session stay locked, login remains usable',async()=>{
 const t=await open({query:'?error=access_denied&error_description=expired'}),p=t.page;await text(p,'#master-auth-message',/link é inválido/);assert.equal(await p.locator('#master-password').count(),0);
 await p.locator('#master-back').click();await login(p);await p.evaluate(()=>__authTest.emit('SIGNED_OUT',null));await text(p,'#master-auth-message',/sessão terminou/);assert.equal(await p.locator('#app-shell').getAttribute('aria-hidden'),'true');await t.close();
});
test('account changes replace all in-memory modules and prevent progress leaking',async()=>{
 const t=await open({session:true,remote:[{storage_key:keys[0],payload:{...empty,completed:{neuro1_0:true}}},{storage_key:keys[2],payload:{notes:{neuro1_0:'private-a'},lastTopic:'neuro2',lastChapter:1}}]}),p=t.page;
 await p.waitForFunction(()=>document.getElementById('master-auth').hidden);assert.equal(await p.evaluate(()=>store.completed.neuro1_0),true);
 await p.evaluate(()=>{fixture.remote=[{storage_key:'master_p2_lucas_v1',payload:{results:{},completed:{gastro_0:true}}}];const user={id:'user-b',email:'bia@example.test',user_metadata:{full_name:'Bia'}};__authTest.emit('SIGNED_IN',{user});});
 await text(p,'#master-profile-email',/bia@example.test/);await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 assert.equal(await p.evaluate(()=>store.completed.neuro1_0),undefined);assert.equal(await p.evaluate(()=>store.completed.gastro_0),true);assert.equal(await p.evaluate(()=>HIG.resumeInfo().title.includes('Guillain')),false);
 await p.evaluate(()=>{store.completed.gastro_1=true;stateSave();});await p.waitForFunction(()=>calls.some(c=>c.name==='upsert'&&c.args.user_id==='user-b'));assert.equal((await calls(p,'upsert')).filter(c=>c.args.user_id==='user-b').some(c=>c.args.payload.notes?.neuro1_0==='private-a'),false);await t.close();
});
test('dashboard restores exact P2 and P1 chapters and all study routes render without errors',async()=>{
 const t=await open({session:true,remote:[{storage_key:keys[2],payload:{lastTopic:'neuro2',lastChapter:1,studyStarted:true}}]}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 await p.getByRole('button',{name:'Retomar aula',exact:false}).click();assert.equal(await p.evaluate(()=>ui.topic),'neuro2');assert.equal(await p.evaluate(()=>ui.chapter),1);
 await p.evaluate(()=>{P1.openTopic('p1inf');P1.chapter(2);navigate('dashboard');});await p.getByRole('button',{name:'Retomar aula',exact:false}).click();assert.equal(await p.evaluate(()=>ui.route),'p1topic');assert.equal(await p.evaluate(()=>P1.getBackup().lastChapter),2);
 for(const route of ['dashboard','today','topics','banca','notes','practice','exam','flashcards','cases','discursive','oral','sources','p1']){await p.evaluate(route=>navigate(route),route);assert.ok((await p.locator('#main-content').innerText()).length>100,route);}
 await t.close();
});
test('root redirect preserves recovery parameters',async()=>{
 const t=await open({session:true,root:true,query:'?auth=recovery#type=recovery'});await text(t.page,'#master-auth-title',/Definir nova senha/);await t.close();
});
test('network failure preserves local progress and failed signout keeps account active',async()=>{
 const t=await open({session:true,remote:[{storage_key:keys[0],payload:empty}],errors:{upsert:{message:'Failed to fetch'}}}),p=t.page;
 await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.evaluate(()=>{store.completed.neuro2_0=true;stateSave();});await text(p,'#master-sync-status',/pendente/);
 await p.locator('#master-avatar').click();await p.locator('#master-signout').click();assert.equal((await calls(p,'signout')).length,0);assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('master_p2_lucas_v1')).completed.neuro2_0),true);await t.close();
});
test('responsive layouts, theme preferences and keyboard focus remain usable',async()=>{
 for(const viewport of [{width:320,height:568},{width:390,height:844},{width:820,height:1180},{width:1180,height:820}]){
  const t=await open({session:true,viewport,mobile:viewport.width<500,remote:[{storage_key:keys[2],payload:{theme:'dark',font:'large',contrast:true,motion:true}}]}),p=t.page;
  await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
  assert.equal(await p.evaluate(()=>document.body.dataset.theme),'dark');
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overflow dashboard ${viewport.width}`);
  const contrast=await p.evaluate(()=>{
   const luminance=color=>{const rgb=color.match(/\d+/g).slice(0,3).map(Number).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];};
   const a=luminance(getComputedStyle(document.querySelector('.resume-card .subtle')).color),b=luminance(getComputedStyle(document.querySelector('.resume-card')).backgroundColor);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
  });assert.ok(contrast>=4.5,`dark/high-contrast readability: ${contrast}`);
  await p.locator('#master-avatar').click();await p.locator('#master-change-password').click();assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overflow password ${viewport.width}`);
  await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.id),'master-password');await p.keyboard.press('Shift+Tab');assert.equal(await p.evaluate(()=>document.activeElement.matches('.auth-privacy summary')),true);
  await p.screenshot({path:`work/account-${viewport.width}.png`,fullPage:true});await p.keyboard.press('Escape');await p.screenshot({path:`work/dashboard-${viewport.width}.png`,fullPage:true});await t.close();
 }
});

async function realSdkApp(recovery=false){
 const context=await browser.newContext(),page=await context.newPage(),apiCalls=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const sdk=await fs.readFile(path.join(process.cwd(),'node_modules/@supabase/supabase-js/dist/umd/supabase.js'),'utf8');
 const realUser={...user,id:'00000000-0000-4000-8000-000000000001',aud:'authenticated',role:'authenticated',app_metadata:{provider:'email',providers:['email']},created_at:new Date().toISOString()};
 const now=Math.floor(Date.now()/1000);
 const token=[{alg:'HS256',typ:'JWT'},{sub:realUser.id,role:'authenticated',exp:now+3600,iat:now,email:realUser.email},'test-signature'].map(x=>Buffer.from(typeof x==='string'?x:JSON.stringify(x)).toString('base64url')).join('.');
 const session={access_token:token,refresh_token:'test-refresh-token',expires_in:3600,expires_at:now+3600,token_type:'bearer',user:realUser};
 await page.addInitScript(id=>localStorage.setItem('master_auth_local_owner',id),realUser.id);
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',r=>r.fulfill({contentType:'text/javascript',body:sdk}));
 await page.route('https://lnbcqrdjivvqbhylhtgd.supabase.co/**',async route=>{
   const request=route.request(),url=new URL(request.url()),body=request.postDataJSON();apiCalls.push({path:url.pathname,method:request.method(),body});
   const headers={'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'GET,POST,PUT,OPTIONS'};
   let data={};
   if(url.pathname.endsWith('/token'))data=session;
   else if(url.pathname.endsWith('/user'))data=realUser;
   else if(url.pathname.endsWith('/master_consents'))data=[{policy_version:'2026-11-08'}];
   else if(url.pathname.endsWith('/master_progress'))data=[];
   await route.fulfill({contentType:'application/json',headers,body:JSON.stringify(data)});
 });
 const callback=recovery?`?auth=recovery#access_token=${token}&refresh_token=test-refresh-token&expires_in=3600&token_type=bearer&type=recovery`:'';
 await page.goto(base+APP+callback);await page.waitForFunction(()=>window.MASTER_AUTH);
 return {page,context,apiCalls,errors,close:async()=>{assert.deepEqual(errors,[]);await context.close();}};
}
test('pinned Supabase SDK signs in and updates a password against intercepted HTTP APIs',async()=>{
 const t=await realSdkApp(),p=t.page;await p.locator('#master-forgot').click();await p.locator('#master-email').fill(user.email);await p.locator('#master-submit').click();await text(p,'#master-auth-message',/Se o endereço/);assert.ok(t.apiCalls.some(r=>r.path.endsWith('/recover')&&r.body.email===user.email));await p.locator('#master-back').click();await login(p);await p.locator('#master-avatar').click();await p.locator('#master-change-password').click();await p.locator('#master-password').fill('updated-password-123');await p.locator('#master-confirm').fill('updated-password-123');await p.locator('#master-submit').click();await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 assert.ok(t.apiCalls.some(r=>r.path.endsWith('/token')&&r.body.email===user.email));assert.ok(t.apiCalls.some(r=>r.path.endsWith('/user')&&r.method==='PUT'&&r.body.password==='updated-password-123'));await p.locator('#master-avatar').click();await p.locator('#master-signout').click();await text(p,'#master-auth-title',/Seu estudo/);assert.equal(await p.evaluate(()=>localStorage.getItem('master_auth_local_owner')),null);await t.close();
});
test('pinned Supabase SDK consumes an implicit recovery link without deadlocks',async()=>{
 const t=await realSdkApp(true),p=t.page;await text(p,'#master-auth-title',/Definir nova senha/);assert.equal(await p.locator('#app-shell').getAttribute('aria-hidden'),'true');await p.locator('#master-password').fill('recovered-password-123');await p.locator('#master-confirm').fill('recovered-password-123');await p.locator('#master-submit').click();await p.waitForFunction(()=>document.getElementById('master-auth').hidden);assert.ok(t.apiCalls.some(r=>r.method==='PUT'&&r.body.password==='recovered-password-123'));assert.equal(new URL(p.url()).hash,'');await t.close();
});
test('logout clears this account data and returns to login',async()=>{
 const t=await open({session:true,remote:[{storage_key:keys[0],payload:empty}]}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.locator('#master-avatar').click();await p.locator('#master-signout').click();await text(p,'#master-auth-title',/Seu estudo/);assert.equal(await p.evaluate(()=>localStorage.getItem('master_auth_local_owner')),null);assert.equal(await p.evaluate(()=>localStorage.getItem('master_p2_lucas_v1')),null);await t.close();
});
test('pending offline changes survive session expiration and a fresh login',async()=>{
 const t=await open({session:true,remote:[{storage_key:keys[0],payload:empty}],errors:{upsert:{message:'Failed to fetch'}}}),p=t.page;
 await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.evaluate(()=>{store.completed.neuro3_1=true;stateSave();});await text(p,'#master-sync-status',/pendente/);
 await p.evaluate(()=>__authTest.emit('SIGNED_OUT',null));await text(p,'#master-auth-title',/Seu estudo/);await p.evaluate(()=>fixture.errors={});await login(p);
 assert.equal(await p.evaluate(()=>store.completed.neuro3_1),true);assert.ok((await calls(p,'upsert')).some(c=>c.args.payload.completed?.neuro3_1));await t.close();
});
test('expired session during password update can sign in again',async()=>{
 const t=await open({session:true,updateErrors:[{status:401,code:'session_not_found'}]}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.locator('#master-avatar').click();await p.locator('#master-change-password').click();await p.locator('#master-password').fill('new-password-123');await p.locator('#master-confirm').fill('new-password-123');await p.locator('#master-submit').click();await text(p,'#master-auth-message',/sessão expirou/);await login(p);await t.close();
});
test('a progress load error can be retried without creating another session',async()=>{
 const t=await open({session:true,errors:{load:{message:'Failed to fetch'}}}),p=t.page;await visible(p,'#master-retry');await text(p,'#master-auth-message',/Não foi possível carregar/);assert.equal(await p.locator('#app-shell').getAttribute('aria-hidden'),'true');await p.evaluate(()=>fixture.errors={});await p.locator('#master-retry').click();await p.waitForFunction(()=>document.getElementById('master-auth').hidden);assert.equal((await calls(p,'login')).length,0);await t.close();
});
test('curriculum has eight checklist topics, oral has six and P1 six groups',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 assert.deepEqual(await p.evaluate(()=>Study.curriculum().map(t=>t.id)),['reuma2','reuma1','neuro1','neuro2','neuro3','gastro','onco','hema']);await p.evaluate(()=>navigate('oral'));assert.equal(await p.locator('.topic-filter .topic-chip').count(),6);assert.equal(await p.locator('.topic-filter').innerText().then(s=>/Neoplasias|Emergências onco/.test(s)),false);
 await p.evaluate(()=>{ui.oralIndex=CASE_BANK.findIndex(c=>c.t==='onco');render()});assert.ok(await p.evaluate(()=>Study.oralIds.includes(CASE_BANK[ui.oralIndex].t)));
 await p.evaluate(()=>navigate('pocus'));await text(p,'#main-content',/escopo específico/);await p.locator('#pocus-note').fill('Roteiro de treino');await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth').hidden);assert.equal(await p.locator('#pocus-note').inputValue(),'Roteiro de treino');await t.close();
});
test('question filters use old results, hide answers, record help and schedule with controlled dates',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 const result=await p.evaluate(()=>{store.results={0:{correct:false},1:{correct:true}};const errors=Study.selectQuestions('errors'),unanswered=Study.selectQuestions('unanswered');Study.record(0,QUESTION_BANK[0].a,'Alta',true,new Date('2026-11-10T12:00:00'));const review=store.study.reviews[0];return {errors,unanswered,review,due:Study.due(new Date('2026-11-11T12:00:00'))}});
 assert.deepEqual(result.errors,[0]);assert.ok(!result.unanswered.includes(0)&&!result.unanswered.includes(1));assert.equal(result.review.helped,true);assert.equal(result.review.due,'2026-11-11');assert.ok(result.due.includes(0));
 await p.evaluate(()=>startPractice('errors'));assert.equal(await p.locator('.feedback').count(),0);await p.locator('.option-btn').first().click();await p.locator('select').selectOption('Baixa');await p.getByRole('button',{name:'Conferir resposta'}).click();await visible(p,'.feedback');assert.equal(await p.evaluate(()=>store.study.reviews[0].confidence),'Baixa');await t.close();
});
test('image viewer zoom, normalized annotations, undo, export, Escape and broken-image fallback',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 await p.evaluate(()=>MediaViewer.open('data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="600" height="400" fill="white"/></svg>'),'Teste geométrico, não clínico'));
 await p.locator('[data-action=in]').click();await text(p,'.image-status',/125%/);await p.locator('[data-mode=arrow]').click();const box=await p.locator('.image-layer img').boundingBox();await p.mouse.move(box.x+100,box.y+100);await p.mouse.down();await p.mouse.move(box.x+200,box.y+160);await p.mouse.up();assert.equal(await p.locator('.image-layer svg path').count(),1);
 const before=await p.locator('.image-layer svg path').getAttribute('d');await p.locator('[data-action=in]').click();assert.equal(await p.locator('.image-layer svg path').getAttribute('d'),before);
 const download=p.waitForEvent('download');await p.locator('[data-action=export]').click();assert.equal((await download).suggestedFilename(),'MASTER-imagem-anotada.png');await p.locator('[data-action=undo]').click();assert.equal(await p.locator('.image-layer svg path').count(),0);await p.keyboard.press('Escape');assert.equal(await p.locator('dialog').count(),0);
 await p.evaluate(()=>MediaViewer.open('/missing-image.png'));await text(p,'.image-status',/Não foi possível abrir/);await p.keyboard.press('Escape');await t.close();
});
test('a second-device version is backed up before overwriting and can be exported',async()=>{
 const t=await open({session:true,remote:[{storage_key:keys[0],payload:empty}]}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 await p.evaluate(()=>{fixture.remote=[{storage_key:'master_p2_lucas_v1',payload:{results:{},completed:{gastro_0:true}}}];store.completed.neuro1_0=true;stateSave();});
 await p.waitForFunction(()=>Object.keys(localStorage).some(key=>key.startsWith('master_conflict_backup_')));
 assert.equal(await p.evaluate(()=>{const key=Object.keys(localStorage).find(key=>key.startsWith('master_conflict_backup_'));return JSON.parse(localStorage.getItem(key)).master_p2_lucas_v1.completed.gastro_0}),true);
 const download=p.waitForEvent('download');await p.evaluate(()=>MASTER_AUTH.exportConflict());assert.equal((await download).suggestedFilename(),'MASTER-copia-conflito.json');await t.close();
});
