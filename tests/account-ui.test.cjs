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
 const context=await browser.newContext({timezoneId:'UTC',viewport:options.viewport||{width:1440,height:1000},isMobile:options.mobile||false,hasTouch:options.mobile||false});
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
async function freezeTime(page,iso){await page.clock.install({time:new Date(Date.parse(iso)-1000)});await page.clock.pauseAt(new Date(iso));}
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
 await login(p);assert.equal(await p.locator('#master-avatar svg').count(),1);assert.equal(await p.locator('#master-avatar').getAttribute('aria-label'),'Abrir menu da conta de Ana Lima');assert.equal(await p.evaluate(()=>store.completed.neuro2_1),true);
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

async function realSdkApp(recovery=false,storageState){
 const context=await browser.newContext({storageState}),page=await context.newPage(),apiCalls=[],errors=[];
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
test('server copy with reordered keys after our own save is not reported as another device',async()=>{
 const t=await open({session:true,remote:[{storage_key:keys[0],payload:empty}]}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 await p.evaluate(()=>{store.completed.neuro1_0=true;stateSave();});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const reorder=v=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).reverse().map(k=>[k,reorder(v[k])])):v;fixture.remote=[{storage_key:'master_p2_lucas_v1',payload:reorder(JSON.parse(localStorage.getItem('master_p2_lucas_v1')))}];store.completed.neuro1_1=true;stateSave();});
 await p.waitForTimeout(2500);
 assert.equal(await p.evaluate(()=>Object.keys(localStorage).some(key=>key.startsWith('master_conflict_backup_'))),false);assert.doesNotMatch(await p.locator('#toast').textContent(),/Outro dispositivo/);await t.close();
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
test('clinical data covers all sixteen topics and every reference regimen has traceable sources',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 const audit=await p.evaluate(()=>{
  const guides=window.MASTER_CLINICAL_GUIDES,rx=window.MASTER_RX;
  return {topics:Object.keys(guides).length,drugs:Object.keys(rx.drugs).length,invalidGuides:Object.entries(guides).filter(([id,g])=>!g.note.includes('[')||g.history.length<3||g.exam.length<3||g.tests.length<3||g.drugs.some(key=>!rx.drugs[key])).map(([id])=>id),invalidDrugs:Object.entries(rx.drugs).filter(([,d])=>['name','context','mechanism','dose','course','care'].some(key=>!d[key])||!d.sources.length||d.sources.some(key=>!rx.sources[key]?.url.startsWith('https://'))).map(([id])=>id)};
 });assert.equal(audit.topics,16);assert.equal(audit.drugs,16);assert.deepEqual(audit.invalidGuides,[]);assert.deepEqual(audit.invalidDrugs,[]);await t.close();
});
test('every P2 and P1 chapter keeps its original content and receives one clinical guide',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 const report=await p.evaluate(()=>{
  const result=[];
  for(const t of TOPICS){ui.topic=t.id;ui.route='topic';for(let i=0;i<t.chapters.length;i++){ui.chapter=i;render();result.push({key:'P2:'+t.id+':'+i,labs:document.querySelectorAll('.clinical-lab').length,original:document.getElementById('main-content').textContent.includes(t.chapters[i].name)});}}
  for(const t of P1.topics){P1.openTopic(t.id);for(let i=0;i<t.chapters.length;i++){P1.chapter(i);result.push({key:'P1:'+t.id+':'+i,labs:document.querySelectorAll('.clinical-lab').length,original:document.getElementById('main-content').textContent.includes(t.chapters[i].name)});}}
  return result;
 });assert.equal(report.length,54);assert.ok(report.every(r=>r.labs===1&&r.original));await t.close();
});
test('clinical tabs work with keyboard, keep chapter and link to filtered prescription manual',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.evaluate(()=>{openTopic('neuro3');switchChapter(1)});
 await p.locator('.clinical-lab>summary').click();await p.locator('.clinical-lab [role=tab]').first().focus();await p.keyboard.press('ArrowRight');assert.equal(await p.locator('.clinical-lab [role=tab]').last().getAttribute('aria-selected'),'true');await visible(p,'.clinical-lab [role=tabpanel]:not([hidden]) [data-drug=pyridostigmine]');assert.equal(await p.evaluate(()=>ui.chapter),1);
 await p.locator('.clinical-lab').getByRole('button',{name:/manual central/}).click();assert.equal(await p.locator('#rx-topic').inputValue(),'neuro3');assert.equal(await p.locator('.rx-card').count(),2);await p.locator('#rx-search').fill('metilprednisolona');await p.getByRole('button',{name:'Buscar',exact:true}).click();assert.equal(await p.locator('.rx-card').count(),1);await text(p,'.rx-card',/Surto de EM|surto de EM/);await t.close();
});
test('prescription writing exercise checks structure without saving, uploading or authorizing a prescription',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.evaluate(()=>Clinical.openManual('p1has'));await p.getByText('Treinar redação e revisar o próprio raciocínio',{exact:true}).click();await p.getByRole('button',{name:'Revisar estrutura do rascunho'}).click();await text(p,'#rx-draft-feedback',/Campos a desenvolver/);
 const textValue='CENÁRIO FICTÍCIO <img src=x onerror="window.badRx=true">';await p.locator('#rx-indication').fill(textValue);await p.evaluate(()=>{for(const area of document.querySelectorAll('#rx-workshop textarea'))if(!area.value)area.value='Exercício fictício a revisar';});await p.getByRole('button',{name:'Revisar estrutura do rascunho'}).click();await text(p,'#rx-draft-feedback',/não confirma indicação/);
 assert.equal(await p.evaluate(()=>window.badRx),undefined);assert.equal(await p.evaluate(value=>JSON.stringify({...localStorage}).includes(value),textValue),false);assert.equal(await p.locator('#rx-workshop img').count(),0);await p.getByRole('button',{name:'Limpar',exact:true}).click();assert.equal(await p.locator('#rx-indication').inputValue(),'');await t.close();
});
test('clinical guide and prescription manual reflow on phone/tablet and dark mode',async()=>{
 for(const width of [375,820,1440]){
  const t=await open({session:true,viewport:{width,height:1000},remote:[{storage_key:keys[2],payload:{theme:'dark',font:'large',contrast:true,motion:true}}]}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.evaluate(()=>openTopic('reuma2'));await p.locator('.clinical-lab>summary').click();
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`guide ${width}`);await p.locator('.clinical-lab [role=tab]').last().click();assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`drug ${width}`);await p.locator('.clinical-lab [role=tab]').last().scrollIntoViewIfNeeded();await p.screenshot({path:`work/clinical-${width}.png`});
  await p.evaluate(()=>Clinical.openManual('p1has'));assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`manual ${width}`);await p.screenshot({path:`work/manual-${width}.png`});await t.close();
 }
});
test('dashboard typography has no overlapping card text at phone, tablet and desktop widths',async()=>{
 for(const width of [390,820,1440,1562]){
  const t=await open({session:true,viewport:{width,height:1000}}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.evaluate(()=>document.fonts.ready);
  assert.equal(await p.evaluate(()=>document.fonts.check('400 16px Inter')),true);
  const cards=await p.evaluate(()=>[...document.querySelectorAll('.study-tool')].map(card=>{const a=card.querySelector('strong').getBoundingClientRect(),b=card.querySelector('small').getBoundingClientRect();return {title:card.querySelector('strong').textContent,overlap:b.top<a.bottom-1,inside:b.right<=card.getBoundingClientRect().right,width:a.width}}));
  assert.ok(cards.every(c=>!c.overlap&&c.inside&&c.width>60),JSON.stringify({width,cards}));assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.screenshot({path:`work/redesign-${width}.png`});await t.close();
 }
});
test('sidebar supports direct navigation, disclosure toggles and compact icons without native markers',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);assert.equal(await p.locator('#sidebar-nav summary').count(),0);
 await p.getByRole('button',{name:'Expandir Exercícios',exact:true}).click();assert.equal(await p.getByRole('button',{name:'Recolher Exercícios',exact:true}).getAttribute('aria-expanded'),'true');await p.locator('#sidebar-nav').getByRole('button',{name:'Simulado de 20 questões',exact:true}).click();assert.equal(await p.evaluate(()=>ui.route),'exam');
 await p.locator('#sidebar-nav .nav-destination').filter({hasText:'Matérias P2'}).click();assert.equal(await p.evaluate(()=>ui.route),'topics');await p.evaluate(()=>HIG.toggleSidebar());assert.equal(await p.locator('#sidebar-nav .nav-destination>span').first().isVisible(),false);await p.evaluate(()=>HIG.toggleSidebar());await t.close();
});
test('account illustration is stable, changes with the account and never interpolates profile HTML',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 const first=await p.locator('#master-avatar').innerHTML();assert.equal(await p.locator('#master-avatar').innerText(),'');assert.equal(await p.locator('#master-avatar svg').count(),1);
 await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth').hidden);assert.equal(await p.locator('#master-avatar').innerHTML(),first);
 await p.evaluate(()=>__authTest.emit('SIGNED_IN',{user:{id:'user-b',email:'bia@example.test',user_metadata:{full_name:'<img src=x onerror=alert(1)>'}}}));
 await p.waitForFunction(()=>document.getElementById('master-auth').hidden&&document.getElementById('master-profile-email').textContent==='bia@example.test');
 assert.notEqual(await p.locator('#master-avatar').innerHTML(),first);assert.equal(await p.locator('#master-profile-name img').count(),0);assert.equal(await p.locator('#master-profile-name').textContent(),'<img src=x onerror=alert(1)>');await t.close();
});
test('all existing reference cards expose worked unit calculations in the manual and lesson',async()=>{
 const t=await open({session:true,viewport:{width:390,height:844}}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 await p.evaluate(()=>navigate('prescriptions'));assert.equal(await p.locator('.rx-card').count(),16);assert.equal(await p.locator('.rx-calculation').count(),16);
 const ivig=p.locator('[data-drug=ivig]');await ivig.locator('summary').click();assert.match(await ivig.innerText(),/140 g/);assert.match(await ivig.innerText(),/280 mL/);
 const atra=p.locator('[data-drug=tretinoin]');await atra.locator('summary').click();assert.match(await atra.innerText(),/90 mg\/dia/);
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await p.evaluate(()=>openTopic('neuro2'));await p.locator('.clinical-lab>summary').click();await p.getByRole('tab',{name:'Prescrição e seguimento'}).click();assert.equal(await p.locator('[role=tabpanel]:visible .rx-calculation').count(),1);await t.close();
});
test('pomodoro is global, dismissible and synchronizes active dedication without counting paused time',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await freezeTime(p,'2026-11-11T12:00:00Z');
 assert.equal(await p.locator('#focus-float').isVisible(),true);await p.locator('#focus-top').click();await p.locator('[data-focus-toggle]').click();await p.waitForFunction(()=>FocusTimer.status().running);await p.keyboard.press('Escape');
 await p.clock.fastForward(65000);await p.evaluate(()=>openTopic('neuro2'));assert.equal(await p.locator('#focus-top [data-focus-time]').textContent(),'23:55');
 await p.locator('#focus-float .focus-float-close').click();assert.equal(await p.locator('#focus-float').isVisible(),false);assert.equal(await p.evaluate(()=>FocusTimer.status().running),true);
 await p.locator('#focus-top').click();await p.locator('[data-focus-toggle]').click();await p.clock.fastForward(60000);assert.equal(await p.evaluate(()=>Object.values(FocusTimer.status().days).reduce((n,d)=>n+d.ms,0)),65000);
 const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('master_p2_hig_v2')));assert.equal(Object.values(saved.pomodoro.days).reduce((n,d)=>n+d.ms,0),65000);
 await p.evaluate(()=>MASTER_AUTH.sync());assert.ok((await calls(p,'upsert')).some(c=>c.args.storage_key==='master_p2_hig_v2'&&Object.values(c.args.payload.pomodoro?.days||{}).some(d=>d.ms===65000)));
 await p.locator('[data-focus-floating]').click();assert.equal(await p.locator('#focus-float').isVisible(),true);await p.screenshot({path:'work/pomodoro-desktop.png'});await t.close();
});
test('pomodoro completion is capped, counted once and restored paused after reload',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await freezeTime(p,'2026-11-11T12:00:00Z');
 await p.locator('#focus-top').click();await p.locator('[data-focus-toggle]').click();await p.waitForFunction(()=>FocusTimer.status().running);await p.clock.fastForward(1800000);
 let data=await p.evaluate(()=>FocusTimer.status());assert.equal(data.running,false);assert.equal(data.remainingMs,0);assert.equal(data.days['2026-11-11'].ms,1500000);assert.equal(data.days['2026-11-11'].completed,1);
 await p.clock.fastForward(60000);await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth').hidden);data=await p.evaluate(()=>FocusTimer.status());assert.equal(data.running,false);assert.equal(data.days['2026-11-11'].completed,1);assert.equal(data.remainingMs,0);await t.close();
});
test('pomodoro splits midnight and keeps accounts isolated during a running session',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await freezeTime(p,'2026-11-11T23:59:50Z');
 await p.locator('#focus-top').click();await p.locator('[data-focus-toggle]').click();await p.waitForFunction(()=>FocusTimer.status().running);await p.clock.fastForward(30000);await p.keyboard.press('Escape');
 let days=await p.evaluate(()=>FocusTimer.status().days);assert.equal(days['2026-11-11'].ms,10000);assert.equal(days['2026-11-12'].ms,20000);
 await p.evaluate(()=>__authTest.emit('SIGNED_IN',{user:{id:'user-b',email:'bia@example.test',user_metadata:{}}}));await p.clock.runFor(1);await text(p,'#master-profile-email',/bia@example.test/);await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 assert.equal(await p.evaluate(()=>FocusTimer.status().running),false);assert.deepEqual(await p.evaluate(()=>FocusTimer.status().days),{});await p.clock.fastForward(60000);assert.deepEqual(await p.evaluate(()=>FocusTimer.status().days),{});await t.close();
});
test('a second tab cannot double-count a running pomodoro for the same account',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 await p.locator('#focus-top').click();await p.locator('[data-focus-toggle]').click();await p.waitForFunction(()=>FocusTimer.status().running);
 const second=await t.context.newPage();await second.addInitScript(({user})=>{window.fixture={user,session:true,remote:[],consent:true};},{user});
 await second.route('https://cdn.jsdelivr.net/**/supabase.min.js',r=>r.fulfill({contentType:'text/javascript',body:`(${mockSdk.toString()})()`}));
 await second.goto(base+APP);await second.waitForFunction(()=>document.getElementById('master-auth').hidden);
 await second.locator('#focus-top').click();await second.locator('[data-focus-toggle]').click();await text(second,'#toast',/outra aba/);
 assert.equal(await second.evaluate(()=>FocusTimer.status().running),false);assert.equal(await p.evaluate(()=>FocusTimer.status().running),true);
 await p.evaluate(()=>FocusTimer.pause());await second.locator('[data-focus-toggle]').click();await second.waitForFunction(()=>FocusTimer.status().running);await t.close();
});
test('dashboard shows all sixteen subjects directly and every card opens its own topic',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 const subjects=await p.locator('[data-subject]').evaluateAll(nodes=>nodes.map(n=>({id:n.dataset.subject,period:n.dataset.period,title:n.querySelector('strong').textContent,hiddenInDetails:!!n.closest('details')})));
 assert.equal(subjects.length,16);assert.equal(new Set(subjects.map(s=>s.id)).size,16);assert.ok(subjects.every(s=>!s.hiddenInDetails));
 for(const s of subjects){await p.locator(`[data-subject="${s.id}"]`).click();assert.equal(await p.evaluate(()=>ui.route),s.period==='P2'?'topic':'p1topic');assert.ok((await p.locator('#main-content').innerText()).includes(s.title));await p.evaluate(()=>navigate('dashboard'));}
 await p.setViewportSize({width:390,height:844});await p.evaluate(()=>{closeMobileNav();window.scrollTo(0,0);});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.screenshot({path:'work/subjects-mobile.png',animations:'disabled'});await t.close();
});
test('Decision Lab has twenty P2 and two P1 cases with stable legacy IDs, feedback and saved progress',async()=>{
 const previous={answers:{'neuro1:0':{picked:1,correct:true,at:'2026-11-10T12:00:00Z'}}};
 const t=await open({session:true,local:{master_clinica_banca_v7:previous}}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 const data=await p.evaluate(()=>({ids:BANCA.cases.map(c=>c.id),p2:BANCA.cases.filter(c=>c.period==='P2').length,p1:BANCA.cases.filter(c=>c.period==='P1').length,valid:BANCA.cases.every(c=>c.stages.length>=2&&c.stages.every(s=>s.o.length===3&&Number.isInteger(s.a)&&s.a>=0&&s.a<s.o.length&&s.why.length>60&&MASTER_REVIEW.sources[s.source||c.source]))}));
 assert.equal(data.p2,20);assert.equal(data.p1,2);assert.equal(new Set(data.ids).size,22);assert.ok(data.valid);assert.deepEqual(data.ids.slice(0,10),['neuro1','neuro2','neuro3','reuma2','onco','hema','gastro','reuma1','p1dm','p1has']);
 await p.evaluate(()=>navigate('banca'));assert.equal(await p.locator('.banca-case-tab').count(),20);
 await p.evaluate(()=>BANCA.chooseCase('dl-status'));assert.equal(await p.locator('.banca-explain').count(),0);await p.locator('.banca-answer').nth(1).click();await visible(p,'.banca-explain');assert.match(await p.locator('.banca-explain').innerText(),/ABC/);await p.getByRole('button',{name:'O paciente mudou →'}).click();assert.match(await p.locator('.banca-case-stage').innerText(),/Etapa 2/);
 await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.evaluate(()=>navigate('banca'));assert.match(await p.locator('.banca-case-stage').innerText(),/Etapa 2/);
 const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('master_clinica_banca_v7')));assert.equal(saved.answers['neuro1:0'].correct,true);assert.equal(saved.answers['dl-status:0'].correct,true);
 await p.evaluate(()=>BANCA.chooseFilter('P1'));assert.equal(await p.locator('.banca-case-tab').count(),2);await p.setViewportSize({width:390,height:844});await p.evaluate(()=>{BANCA.chooseFilter('P2');closeMobileNav();document.activeElement?.blur();document.getElementById('banca-lab').scrollIntoView({block:'start'});});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.screenshot({path:'work/decision-lab-mobile.png',animations:'disabled'});await t.close();
});
test('lessons omit the removed image/video block while prescription tabs remain available',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 for(const topic of ['neuro1','reuma1','gastro']){await p.evaluate(id=>openTopic(id),topic);assert.equal(await p.getByRole('heading',{name:'Imagens, vídeos e farmacologia'}).count(),0);assert.equal(await p.getByRole('button',{name:'Estudar e marcar uma imagem local'}).count(),0);await p.locator('.clinical-lab>summary').click();assert.equal(await p.getByRole('tab',{name:'Prescrição e seguimento'}).count(),1);}
 await p.evaluate(()=>P1.openTopic('p1dm'));await p.locator('.clinical-lab>summary').click();assert.equal(await p.getByRole('tab',{name:'Prescrição e seguimento'}).count(),1);await t.close();
});
test('pomodoro top bar remains visible while scrolling on mobile',async()=>{
 const t=await open({session:true,viewport:{width:390,height:844}}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 await p.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';closeMobileNav();window.scrollTo(0,1000);});
 const layout=await p.evaluate(()=>{const b=document.querySelector('.topbar').getBoundingClientRect();return {top:b.top,bottom:b.bottom,position:getComputedStyle(document.querySelector('.topbar')).position,scroll:scrollY,height:innerHeight,visual:visualViewport.height,focus:document.body.classList.contains('focus-mode')};});
 assert.ok(layout.top>=-1&&layout.top<=1&&layout.bottom>40,JSON.stringify(layout));assert.equal(await p.locator('#focus-top').isVisible(),true);
 await p.evaluate(()=>window.scrollTo(0,0));await p.screenshot({path:'work/subjects-mobile.png',animations:'disabled'});await t.close();
});
test('subject discovery supports accents, evaluation filters and clear empty states without changing progress',async()=>{
 const t=await open({session:true,remote:[{storage_key:keys[0],payload:{...empty,completed:{neuro1_0:true}}},{storage_key:keys[1],payload:{completed:{p1arr_0:true}}}]}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 assert.match(await p.locator('[data-subject=neuro1] .subject-meta').innerText(),/1 revisada/);assert.match(await p.locator('[data-subject=p1arr] .subject-meta').innerText(),/1 revisada/);
 await p.locator('[data-subject-filter=P1]').click();assert.equal(await p.locator('[data-subject]:visible').count(),8);await p.locator('[data-subject-filter=all]').click();await p.locator('#subjects-search').fill('lupus');assert.equal(await p.locator('[data-subject]:visible').count(),1);assert.equal(await p.locator('[data-subject=reuma2]').isVisible(),true);assert.match(await p.locator('#subject-results').innerText(),/^1 matéria/);
 await p.locator('#subjects-search').fill('nenhuma-materia-com-este-nome');assert.equal(await p.locator('#subject-empty').isVisible(),true);await p.getByRole('button',{name:'Limpar filtros'}).click();assert.equal(await p.locator('[data-subject]:visible').count(),16);assert.equal(await p.locator('#subjects-search').evaluate(el=>el===document.activeElement),true);assert.equal(await p.evaluate(()=>store.completed.neuro1_0),true);await t.close();
});
test('lesson section navigation and reading position preserve P2/P1 routes and clear on leaving',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.emulateMedia({reducedMotion:'reduce'});
 for(const period of ['P2','P1']){
  await p.evaluate(period=>{if(period==='P2')openTopic('neuro1');else P1.openTopic('p1dm');},period);assert.equal(await p.locator('.reading-outline').count(),1);const hash=await p.evaluate(()=>location.hash);
  await p.locator('.reading-outline summary').click();await p.locator('.reading-outline-links button').nth(1).click();assert.equal(await p.evaluate(()=>document.activeElement.tagName),'H3');assert.equal(await p.evaluate(()=>location.hash),hash);
  await p.evaluate(()=>window.scrollTo({top:document.body.scrollHeight,behavior:'instant'}));await p.waitForFunction(()=>!document.querySelector('.reading-back').hidden);await p.waitForFunction(()=>Number(document.querySelector('.reading-progress').getAttribute('aria-valuenow'))>=90);
  await p.getByRole('button',{name:'Voltar ao início da aula'}).click();assert.equal(await p.evaluate(()=>document.activeElement.tagName),'H2');await p.evaluate(()=>render());assert.equal(await p.locator('.reading-outline').count(),1);
 }
 await p.evaluate(()=>navigate('dashboard'));assert.equal(await p.locator('.reading-back').count(),0);assert.equal(await p.locator('.reading-outline').count(),0);await t.close();
});
test('refreshed library and lesson remain usable with 200 percent reading size on phone and tablet',async()=>{
 for(const width of [320,390,820]){
  const t=await open({session:true,viewport:{width,height:1000}}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.evaluate(()=>{HIG.setFont('xxlarge');HIG.setTheme('dark');HIG.togglePref('contrast');});
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`library overflow ${width}`);assert.equal(await p.locator('[data-subject]:visible').count(),16);
  await p.locator('#subjects-search').fill('guillain');assert.equal(await p.locator('[data-subject]:visible').count(),1);await p.locator('[data-subject=neuro2]').click();await p.locator('.reading-outline summary').click();assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`lesson overflow ${width}`);await p.screenshot({path:`work/review-reading-${width}.png`,animations:'disabled'});await t.close();
 }
});

test('release URL versions local assets and preserves recovery callbacks',async()=>{
 const t=await open({session:true,root:true,query:'?auth=recovery'}),p=t.page;await text(p,'#master-auth-title',/Definir nova senha/);
 assert.equal(new URL(p.url()).searchParams.get('v'),'20261113-cir2');
 const unversioned=await p.evaluate(()=>[...document.querySelectorAll('script[src],link[rel=stylesheet]')].map(e=>e.src||e.href).filter(url=>new URL(url).origin===location.origin&&!new URL(url).searchParams.has('v')));assert.deepEqual(unversioned,[]);await t.close();
});
test('Decision Lab has 24 stable cases with 20 P2 items, valid answers and references',async()=>{
 const t=await open({session:true}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 const report=await p.evaluate(()=>({n:EVIDENCE.caseItems.length,p2:EVIDENCE.caseItems.filter(c=>c.period==='P2').length,ids:EVIDENCE.caseItems.map(c=>c.id),invalid:EVIDENCE.caseItems.filter(c=>!c.title||!c.question||c.options.length!==3||!Number.isInteger(c.correct)||c.correct<0||c.correct>2||!c.why||!c.short||!window.MASTER_REVIEW.sources[c.ref]||!c.topic).map(c=>c.id)}));
 assert.equal(report.n,24);assert.equal(report.p2,20);assert.equal(new Set(report.ids).size,24);assert.deepEqual(report.ids.slice(0,3),['qrs','gb','lpa']);assert.deepEqual(report.invalid,[]);await t.close();
});
test('Decision Lab hides explanation, preserves old answers and filters/navigates without losing progress',async()=>{
 const t=await open({session:true,remote:[{storage_key:keys[4],payload:{'case-qrs':0}}]}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.evaluate(()=>navigate('decisionlab'));await text(p,'.decision-progress',/1\/24/);await visible(p,'.ev-feedback');
 await p.locator('#decision-period').selectOption('P2');assert.equal(await p.locator('#decision-case option').count(),20);assert.equal(await p.locator('.ev-feedback').count(),0);await p.locator('.ev-option').first().click();await visible(p,'.ev-feedback');const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('MASTER_EVIDENCE_UI_v5')));assert.equal(saved['case-qrs'],0);
 await p.evaluate(()=>EVIDENCE.answerCase(2));assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('MASTER_EVIDENCE_UI_v5'))),saved);await p.getByRole('button',{name:'Próximo caso',exact:false}).click();assert.equal(await p.locator('.ev-feedback').count(),0);await p.locator('#decision-period').selectOption('P1');assert.equal(await p.locator('#decision-case option').count(),4);await t.close();
});
test('all Decision Lab cases render, answer and explain correctly on a narrow screen',async()=>{
 const t=await open({session:true,viewport:{width:390,height:844}}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.evaluate(()=>navigate('decisionlab'));
 for(let i=0;i<24;i++){await p.evaluate(i=>EVIDENCE.chooseCase(i),i);const expected=await p.evaluate(i=>EVIDENCE.caseItems[i].correct,i);await p.locator('.ev-option').nth(expected).click();await text(p,'.ev-feedback',/Boa decisão/);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 await text(p,'.decision-progress',/24\/24 respondidos · 24 acertos/);await p.screenshot({path:'work/decision-lab-mobile.png'});await t.close();
});
test('sidebar exposes requested panels and opens Decision Lab directly on desktop and phone',async()=>{
 for(const width of [1440,390]){
  const t=await open({session:true,viewport:{width,height:1000}}),p=t.page;await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
  const panels=[['Matérias P1','p1'],['Matérias P2','topics'],['Casos clínicos','cases'],['Exercícios','practice'],['Decision Lab','banca']];
  for(const [label,route] of panels){if(width<801)await p.getByRole('button',{name:'Abrir menu de navegação',exact:true}).click();await p.locator('#sidebar-nav').getByRole('button',{name:label,exact:true}).click();assert.equal(await p.evaluate(()=>ui.route),route);assert.equal(await p.locator('.nav-group.is-active').count(),1);}
  if(width<801)await p.getByRole('button',{name:'Abrir menu de navegação',exact:true}).click();
  await p.locator('#sidebar-nav').getByRole('button',{name:'Microdecisões',exact:true}).click();assert.equal(await p.evaluate(()=>ui.route),'decisionlab');assert.equal(await p.locator('#decision-case option').count(),24);
  if(width<801)await p.getByRole('button',{name:'Abrir menu de navegação',exact:true}).click();await p.screenshot({path:`work/side-panels-${width}.png`,animations:'disabled'});await t.close();
 }
});
test('remembered Supabase session survives reload without another password login and logout removes it',async()=>{
 const t=await realSdkApp(),p=t.page,key='sb-lnbcqrdjivvqbhylhtgd-auth-token';
 assert.equal(await p.locator('#master-remember').isChecked(),true);await login(p);
 assert.ok(await p.evaluate(key=>localStorage.getItem(key),key));assert.equal(await p.evaluate(key=>sessionStorage.getItem(key),key),null);
 await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth').hidden);
 assert.equal(t.apiCalls.filter(c=>c.path.endsWith('/token')&&c.body?.grant_type!=='refresh_token').length,1);
 assert.ok(!(JSON.stringify(await t.context.storageState())).includes('strong-password'));
 const saved=await t.context.storageState();await t.close();const restored=await realSdkApp(false,saved),reopened=restored.page;await reopened.waitForFunction(()=>document.getElementById('master-auth').hidden);assert.equal(restored.apiCalls.filter(c=>c.path.endsWith('/token')).length,0);await restored.close();
 const logout=await realSdkApp(false,saved),exit=logout.page;await exit.waitForFunction(()=>document.getElementById('master-auth').hidden);await exit.locator('#master-avatar').click();await exit.locator('#master-signout').click();await exit.waitForFunction(()=>!document.getElementById('master-auth').hidden);
 assert.equal(await exit.evaluate(key=>localStorage.getItem(key),key),null);assert.equal(await exit.evaluate(key=>sessionStorage.getItem(key),key),null);await logout.close();
});
test('unchecked remember option stores auth only in the current tab and preserves its choice',async()=>{
 const t=await realSdkApp(),p=t.page,key='sb-lnbcqrdjivvqbhylhtgd-auth-token';await p.locator('#master-remember').uncheck();await login(p);
 assert.equal(await p.evaluate(key=>localStorage.getItem(key),key),null);assert.ok(await p.evaluate(key=>sessionStorage.getItem(key),key));
 const exported=await t.context.storageState();assert.ok(!exported.origins.some(o=>o.localStorage.some(item=>item.name===key)));
 await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth').hidden);await p.locator('#master-avatar').click();await p.locator('#master-signout').click();await p.waitForFunction(()=>!document.getElementById('master-auth').hidden);
 assert.equal(await p.locator('#master-remember').isChecked(),false);assert.equal(await p.evaluate(key=>sessionStorage.getItem(key),key),null);await t.close();
});
