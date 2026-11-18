const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
const vm=require('node:vm');
const {clinicalFixtures}=require('./helpers/clinical-fixtures.cjs');
const app='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
const previousById={m1:3,m2:3,m3:3,m4:4,m5:3,m6:4,m7:3,m8:3};
let previous=[];
let browser,server,base,modules;
before(async()=>{
 const context={window:{}};vm.createContext(context);
 await fs.readFile(path.join(app,'pocus-figures.js'),'utf8').then(source=>vm.runInContext(source,context));
 await fs.readFile(path.join(app,'pocus-course.js'),'utf8').then(source=>vm.runInContext(source.replace('const MODULES=[','const MODULES=window.testModules=['),context));
 modules=JSON.parse(JSON.stringify(context.window.testModules));previous=modules.map(m=>previousById[m.id]);
 server=http.createServer(async(req,res)=>{try{const file=path.join(process.cwd(),decodeURIComponent(new URL(req.url,'http://local').pathname));res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();await new Promise(resolve=>server.close(resolve));});
function mock(){
 const user={id:'pocus-pratica-test',email:'pocus-pratica@example.test',user_metadata:{full_name:'Prática'}};
 localStorage.setItem('master_auth_local_owner',user.id);
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user}}}),getUser:async()=>({data:{user}}),onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(table){let key='',columns='';const query={select(c){columns=c;return query},contains(_,keys){key=keys[0];return query},then(resolve){resolve({data:table==='lesson_images'?(columns==='keys'?clinicalTestRows.map(r=>({keys:r.keys})):clinicalTestRows.filter(r=>r.keys.includes(key))):[],error:null});},order(){return query},range:async()=>({data:[],error:null}),eq(){return table==='master_progress'?Promise.resolve({data:[],error:null}):query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null})};return query;}})};
}
async function open(width=1280,settings={}){
 const context=await browser.newContext({viewport:{width,height:1000},...settings}),page=await context.newPage(),errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock.toString()})()`}));
 await page.route(/^https:\/\/(upload\.wikimedia\.org|cdn\.ncbi\.nlm\.nih\.gov)\//,r=>r.fulfill({contentType:'image/gif',body:Buffer.from('R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==','base64')}));
 await page.addInitScript(clinicalFixtures);
 await page.goto(base+'/'+app+'/index.html');await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 return {page,close:async()=>{assert.deepEqual(errors,[]);await context.close();}};
}
test('POCUS preserva os índices antigos e acrescenta seis questões com esquema por módulo',async()=>{
 const context={window:{}};vm.createContext(context);vm.runInContext(await fs.readFile(path.join(app,'pocus-figures.js'),'utf8'),context);
 assert.equal(modules.length,12);assert.equal(new Set(modules.map(m=>m.id)).size,12);let total=0,images=0;
 modules.forEach((m,index)=>{
  if(previous[index]===undefined){assert.ok(['m9','m10','m11','m12'].includes(m.id));assert.equal(m.quiz.length,3);total+=m.quiz.length;return;}assert.equal(m.quiz.length,previous[index]+6);assert.ok(m.quiz.slice(0,previous[index]).every(q=>!q.fig));
  assert.equal(m.practical.exam.length,4);assert.equal(m.practical.errors.length,4);assert.equal(m.practical.script.length,6);
  assert.equal(new Set(m.quiz.map(q=>q.q)).size,m.quiz.length);
  m.quiz.slice(previous[index]).forEach(q=>{assert.ok(context.window.PocusFigures.names.includes(q.fig));assert.equal(q.o.length,4);assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<4);assert.ok(q.why.length>100);assert.ok(!/alternativa [ABCD]\b/.test(q.why));assert.ok(!/[0-9]/.test(q.q+q.o.join(' ')+q.why));images++;});
  total+=m.quiz.length;
 });
 assert.equal(total,86);assert.equal(images,48);
});
test('estações e questões com SVG funcionam nos dois temas e de 320 px a desktop',async()=>{
 for(const width of [320,390,820,1280])for(const theme of ['light','dark']){
  const t=await open(width),p=t.page;await p.evaluate(theme=>HIG.setTheme(theme),theme);
  if(width<801)await p.getByRole('button',{name:'Abrir menu de navegação',exact:true}).click();
  await p.locator('#sidebar-nav').getByRole('button',{name:/^POCUS/}).click();assert.equal(await p.evaluate(()=>ui.route),'pocus');
  assert.ok(await p.locator('.nav-badge').first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>=12);
  for(let index=0;index<modules.length;index++){
   await p.evaluate(index=>PocusCourse.open(index),index);
   const count=previous[index]===undefined?0:6;assert.equal(await p.locator('.pocus-module > .pocus-sec > .pocus-fig').count(),0);if(count)await p.locator('.pocus-schematic-practice > summary').click();assert.equal(await p.locator('.pocus-q-image').count(),count);assert.equal(await p.locator('.pocus-q-image svg[role=img]').count(),count);if(count){await p.waitForFunction(()=>[...document.querySelectorAll('.pocus-q-image [data-clinical-schematic]')].every(el=>!el.hidden));assert.equal(await p.locator('.pocus-q-image .pocus-fig:visible').count(),0);}
   assert.equal(await p.locator('.pocus-practical li').count(),count?4:0);assert.equal(await p.locator('.pocus-technique-errors li').count(),count?4:0);assert.equal(await p.locator('.pocus-script li').count(),count?6:0);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`rolagem em ${width}, ${theme}, módulo ${index}`);
   assert.equal(await p.evaluate(()=>{const ids=[...document.querySelectorAll('.pocus-module svg [id]')].map(el=>el.id);return ids.length===new Set(ids).size;}),true);
   assert.equal(await p.locator('.pocus-q-opt,.pocus-script summary').evaluateAll(items=>items.filter(el=>el.getBoundingClientRect().height<44).length),0);
   assert.match(await p.locator('.pocus-refs').innerText(),/Conferência online de atualizações das fontes: a confirmar/);
  }
  await p.locator('.pocus-script summary').click();assert.equal(await p.locator('.pocus-script').getAttribute('open'),'');await t.close();
 }
});
test('respostas das 48 questões novas e progresso antigo permanecem ao recarregar',async()=>{
 const t=await open(),p=t.page;await p.evaluate(()=>{navigate('pocus');PocusCourse.open(0);PocusCourse.answer(0,0,1);PocusCourse.complete('m1',true);});
 for(let mi=0;mi<modules.length;mi++){
  await p.evaluate(mi=>PocusCourse.open(mi),mi);if(previous[mi]!==undefined)await p.locator('.pocus-schematic-practice > summary').click();
  for(let qi=previous[mi];qi<modules[mi].quiz.length;qi++){
   const question=p.locator('#pq-'+mi+'-'+qi);await question.locator('.pocus-q-opt').nth(modules[mi].quiz[qi].a).click();assert.match(await question.locator('.pocus-q-why').innerText(),/^Correto\./);
  }
 }
 const before=await p.evaluate(()=>JSON.parse(JSON.stringify(store.study.pocus)));assert.equal(before.quiz.m1_0,1);assert.equal(before.done.m1,true);assert.equal(Object.keys(before.quiz).length,49);
 await p.reload();await p.waitForFunction(()=>document.getElementById('master-auth')?.hidden);const after=await p.evaluate(()=>store.study.pocus);assert.deepEqual(after,before);
 await p.evaluate(()=>{navigate('pocus');PocusCourse.open(0);});assert.equal(await p.locator('#pq-0-0 .pocus-q-opt[aria-pressed=true]').count(),1);assert.equal(await p.locator('#pq-0-3 .pocus-q-opt[aria-pressed=true]').count(),1);await t.close();
});
test('esquema ampliado permite zoom e movimento em 320 px, com foco e rótulos legíveis',async()=>{
 const t=await open(320,{hasTouch:true}),p=t.page;await p.evaluate(()=>{HIG.setTheme('dark');navigate('pocus');PocusCourse.open(0);});
 await p.locator('.pocus-schematic-practice > summary').click();
 const paired=p.locator('.pocus-q-image .clinical-schematic:not([hidden])').filter({has:p.locator('defs')}).first();await paired.waitFor({state:'visible'});await paired.locator('summary').click();const trigger=paired.locator('.pocus-zoom-open');assert.ok(await trigger.evaluate(el=>el.getBoundingClientRect().height)>=44);await trigger.focus();await p.keyboard.press('Enter');
 const dialog=p.locator('.pocus-zoom-dialog'),viewport=dialog.locator('.pocus-zoom-viewport'),svg=dialog.locator('svg');await dialog.waitFor({state:'visible'});
 assert.equal(await dialog.locator('output').innerText(),'100%');assert.equal(await dialog.getByRole('button',{name:'Diminuir',exact:true}).isDisabled(),true);
 const size=await svg.evaluate(el=>({width:el.getBoundingClientRect().width,logical:el.viewBox.baseVal.width,fonts:[...el.querySelectorAll('text,foreignObject div')].map(node=>parseFloat(getComputedStyle(node).fontSize)*el.getBoundingClientRect().width/el.viewBox.baseVal.width)}));
 assert.ok(size.width>=size.logical);assert.ok(size.fonts.length>0&&size.fonts.every(value=>value>=12));
 assert.ok(await viewport.evaluate(el=>el.scrollWidth>el.clientWidth));assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 assert.equal(await dialog.locator('button').evaluateAll(items=>items.filter(el=>el.getBoundingClientRect().height<44).length),0);
 await dialog.getByRole('button',{name:'Aumentar',exact:true}).click();assert.equal(await dialog.locator('output').innerText(),'150%');assert.ok(await svg.evaluate(el=>el.getBoundingClientRect().width)>size.width);
 await dialog.getByRole('button',{name:'Diminuir',exact:true}).click();assert.equal(await dialog.locator('output').innerText(),'100%');assert.equal(await svg.evaluate(el=>el.getBoundingClientRect().width),size.width);await dialog.getByRole('button',{name:'Aumentar',exact:true}).click();
 await viewport.focus();await p.keyboard.press('ArrowRight');await p.waitForFunction(()=>document.querySelector('.pocus-zoom-viewport')?.scrollLeft>0);
 assert.equal(await p.evaluate(()=>{const ids=[...document.querySelectorAll('.pocus-module svg [id],.pocus-zoom-dialog svg [id]')].map(el=>el.id);return ids.length===new Set(ids).size;}),true);
 await dialog.getByRole('button',{name:'Restaurar',exact:true}).click();assert.equal(await dialog.locator('output').innerText(),'100%');assert.equal(await viewport.evaluate(el=>el.scrollLeft),0);
 await p.keyboard.press('Escape');await dialog.waitFor({state:'detached'});assert.equal(await trigger.evaluate(el=>el===document.activeElement),true);
 await trigger.tap();await p.getByRole('button',{name:'Fechar esquema',exact:true}).tap();await dialog.waitFor({state:'detached'});assert.equal(await trigger.evaluate(el=>el===document.activeElement),true);
 await trigger.tap();await p.evaluate(()=>window.dispatchEvent(new Event('master-auth-ended')));await dialog.waitFor({state:'detached'});assert.equal(await p.locator('.pocus-zoom-dialog svg').count(),0);await t.close();
});
