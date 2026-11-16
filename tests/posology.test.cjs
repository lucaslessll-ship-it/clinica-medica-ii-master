const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const fs=require('node:fs/promises'),path=require('node:path'),http=require('node:http'),vm=require('node:vm');
const app='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
let browser,server,base,data;
before(async()=>{const context={window:{}};vm.createContext(context);vm.runInContext(await fs.readFile(path.join(app,'lab-ferropenia-data.js'),'utf8'),context);data=JSON.parse(JSON.stringify(context.window.MASTER_LAB_FERROPENIA));server=http.createServer(async(req,res)=>{try{const file=path.join(process.cwd(),decodeURIComponent(new URL(req.url,'http://local').pathname));res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});});
after(async()=>{await browser?.close();await new Promise(r=>server.close(r));});
function mock(){
 let user={id:'lab-a',email:'lab-a@example.test',user_metadata:{full_name:'Estudante A'}},callback;const remote={};
 if(!localStorage.getItem('master_auth_local_owner'))localStorage.setItem('master_auth_local_owner',user.id);
 window.__labSwitch=id=>{callback('SIGNED_OUT',null);user={id,email:id+'@example.test',user_metadata:{full_name:id}};callback('SIGNED_IN',{user});};
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user}}}),getUser:async()=>({data:{user}}),onAuthStateChange(fn){callback=fn;return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(table){const query={select(){return query},order(){return query},range:async()=>({data:[],error:null}),eq(key,id){return table==='master_progress'?Promise.resolve({data:remote[id]||[],error:null}):query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async row=>{if(table==='master_progress'){const rows=remote[row.user_id]||(remote[row.user_id]=[]),index=rows.findIndex(x=>x.storage_key===row.storage_key);if(index<0)rows.push(structuredClone(row));else rows[index]=structuredClone(row);}return {error:null};}};return query;}})};
}
async function open(options={}){const context=await browser.newContext({viewport:{width:390,height:844},...options}),page=await context.newPage(),errors=[],external=[];page.setDefaultTimeout(8000);page.on('pageerror',e=>errors.push(e.message));await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock.toString()})()`}));await page.route('https://*.supabase.co/**',route=>{external.push(route.request().method());return route.abort();});await page.goto(base+'/'+app+'/index.html');await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);return {page,close:async()=>{assert.deepEqual(errors,[]);assert.deepEqual(external,[],'testes não acessam dados reais');await context.close();}};}

test('catálogo distingue apresentações, pendências e fontes em cada regime novo',async()=>{
 const t=await open(),p=t.page;
 const a=await p.evaluate(()=>({total:Object.keys(MASTER_RX.drugs).length,pending:Object.entries(MASTER_RX.drugs).filter(([,d])=>d.status==='pending').map(([id])=>id),bad:Object.entries(MASTER_RX.drugs).flatMap(([id,d])=>(d.regimens||[]).filter(r=>['context','dose','course','use','care'].some(k=>!r[k])||!r.sources.length||r.sources.some(k=>!MASTER_RX.sources[k]?.url.startsWith('https://'))).map(()=>id)),calculations:Object.keys(MASTER_RX.calculations).length}));
 assert.equal(a.total,202);assert.deepEqual(a.pending.sort(),['atropine','dipyrone','lidocaine']);assert.deepEqual(a.bad,[]);assert.equal(a.calculations,16);await t.close();
});
test('detecção respeita acentos, combinações, siglas e fronteiras das palavras',async()=>{
 const t=await open(),p=t.page;const d=await p.evaluate(()=>Object.fromEntries(['ATO','ato de estudar','ATRA','heparina','heparinase','amoxicilina + clavulanato','sulfametoxazol/trimetoprima','lidocaína','ceftriaxona','ferro sérico','ferro oral','calcineurina','cocaína'].map(s=>[s,Posology.detect(s)])));
 assert.deepEqual(d.ATO,['arsenic']);assert.deepEqual(d['ato de estudar'],[]);assert.deepEqual(d.ATRA,['tretinoin']);assert.deepEqual(d.heparinase,[]);assert.deepEqual(d['amoxicilina + clavulanato'],['amoxicillinclav']);assert.deepEqual(d['sulfametoxazol/trimetoprima'],['smxtmp']);assert.deepEqual(d['lidocaína'],['lidocaine']);assert.deepEqual(d['ferro sérico'],[]);assert.deepEqual(d['ferro oral'],['ferroussulfate']);assert.deepEqual(d.calcineurina,[]);assert.deepEqual(d['cocaína'],['cocaine_exposure']);await t.close();
});
test('aulas de P1, P2, Cirurgia e cursos independentes recebem fichas sem duplicar painéis',async()=>{
 const t=await open(),p=t.page;
 const report=await p.evaluate(()=>{
  const r=[];const capture=label=>r.push({label,panels:document.querySelectorAll('.posology-guide').length,terms:document.querySelectorAll('.posology-term').length});
  openTopic('neuro3');capture('P2');P1.openTopic('p1has');capture('P1');
  CIR.openTopic('cirtabd',3);capture('Cirurgia');
  navigate('atb');AtbCourse.open(0);capture('Antimicrobianos');navigate('hemo');HemoCourse.open(3);capture('Hemograma');navigate('ecg');ECGCourse.open(12);capture('ECG');
  for(let i=0;i<3;i++)Posology.afterRender();capture('idempotência');return r;
 });assert.ok(report.every(r=>r.panels===1),JSON.stringify(report));assert.ok(report.filter(r=>r.terms).length>=4);await t.close();
});
test('laboratório de anemia oferece ferro oral e IV com doses, unidades e orientação',async()=>{
 const t=await open(),p=t.page;await p.evaluate(()=>LabFerro.course.open(2));await p.locator('.posology-guide>summary').click();await p.locator('.posology-guide button[data-posology-id=ferroussulfate]').click();assert.match(await p.locator('dialog').innerText(),/50 a 100 mg de ferro elementar/);assert.match(await p.locator('dialog').innerText(),/cerca de 3 meses/);await p.keyboard.press('Escape');
 await p.evaluate(()=>Posology.open('ferriccarboxymaltose'));assert.match(await p.locator('dialog').innerText(),/750 mg/);assert.match(await p.locator('dialog').innerText(),/7 dias/);assert.match(await p.locator('dialog').innerText(),/hipofosfatemia/);await p.keyboard.press('Escape');
 await p.evaluate(()=>Posology.open('ironsucrose'));assert.match(await p.locator('dialog').innerText(),/DRC sem diálise/);assert.match(await p.locator('dialog').innerText(),/5 ocasiões.*14 dias/);await p.keyboard.press('Escape');await t.close();
});
test('laboratório microbiológico dá acesso às doses sem transformar S ou I em receita',async()=>{
 const t=await open(),p=t.page;await p.evaluate(()=>MicroLab.go('simulador'));await p.locator('.posology-guide>summary').click();await p.locator('.posology-guide button[data-posology-id=nitrofurantoin]').click();let text=await p.locator('dialog').innerText();assert.match(text,/7 dias/);assert.match(text,/3 dias/);assert.match(text,/liberação modificada/);assert.match(text,/Não usar como tratamento de pielonefrite/);await p.keyboard.press('Escape');
 await p.locator('[name=drug]').selectOption('CIP');await p.locator('[name=value]').fill('0,5');await p.getByRole('button',{name:'Interpretar o exercício'}).click();assert.match(await p.locator('.micro-result').innerText(),/^I:/);await p.locator('.posology-guide button[data-posology-id=ciprofloxacin]').click();assert.match(await p.locator('dialog').innerText(),/não duplicação automática/);await p.keyboard.press('Escape');await t.close();
});
test('regimes de crise, profilaxia e vias mantêm limites e fontes próprios',async()=>{
 const t=await open(),p=t.page;const r=await p.evaluate(()=>Object.fromEntries(['insulinR','potassium','cefazolin','vancomycin','vancomycinOral','methotrexate','amiodarone'].map(id=>[id,Clinical.card(id)])));
 assert.match(r.insulinR,/0,1 unidade\/kg\/h/);assert.match(r.insulinR,/3,5 mmol\/L/);assert.match(r.potassium,/10 mmol\/h/);assert.match(r.cefazolin,/fechamento/);assert.match(r.vancomycinOral,/125 mg/);assert.match(r.vancomycin,/IV/);assert.match(r.methotrexate,/não tomar diariamente/);assert.match(r.amiodarone,/Não é a dose de bolus para parada/);await t.close();
});
test('diálogo preserva foco, não salva consultas e fecha ao encerrar sessão',async()=>{
 const t=await open(),p=t.page;await p.evaluate(()=>{navigate('hemo');HemoCourse.open(3);});const trigger=p.locator('.posology-term[data-posology-id=ferroussulfate]').first();await trigger.click();await p.keyboard.press('Escape');assert.equal(await trigger.evaluate(e=>e===document.activeElement),true);
 const before=await p.evaluate(()=>JSON.stringify({...localStorage}));await p.evaluate(()=>Posology.open('dipyrone'));assert.match(await p.locator('dialog').innerText(),/A confirmar/);assert.match(await p.locator('dialog').innerText(),/Como administrar/);await p.keyboard.press('Escape');assert.equal(await p.evaluate(()=>JSON.stringify({...localStorage})),before);
 await p.evaluate(()=>Posology.open('class_insulin'));await p.locator('dialog').getByRole('button',{name:'insulina NPH',exact:true}).click();assert.equal(await p.locator('dialog').count(),1);assert.match(await p.locator('dialog').innerText(),/não fornece dose fixa universal/i);
 await p.evaluate(()=>dispatchEvent(new Event('master-auth-ended')));assert.equal(await p.locator('dialog').count(),0);await t.close();
});
test('atualização parcial de feedback detecta medicamento sem ciclo de observação',async()=>{
 const t=await open(),p=t.page;await p.evaluate(()=>MicroLab.go('aula/0'));await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await p.evaluate(()=>{const n=document.createElement('p');n.id='dose-feedback-fixture';n.textContent='Discussão do caso: enoxaparina.';getMain().append(n);});await p.waitForFunction(()=>document.querySelector('.posology-term[data-posology-id=enoxaparin]'));assert.equal(await p.locator('.posology-guide').count(),1);await p.evaluate(()=>{document.getElementById('dose-feedback-fixture').remove();});await p.waitForFunction(()=>!document.querySelector('.posology-guide [data-posology-id=enoxaparin]'));assert.equal(await p.locator('.posology-guide').count(),1);await t.close();
});
test('fichas têm reflow, texto legível e alvos de toque em celular, tablet e desktop nos dois temas',async()=>{
 for(const width of [320,390,820,1280])for(const theme of ['light','dark']){
  const t=await open({viewport:{width,height:900},hasTouch:width<=820,reducedMotion:'reduce'}),p=t.page;await p.evaluate(theme=>{HIG.setTheme(theme);LabFerro.course.open(2);},theme);
  await p.locator('.posology-guide>summary').click();assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`aula ${width} ${theme}`);
  for(const id of ['ferroussulfate','ferriccarboxymaltose','vancomycin','class_insulin','dipyrone']){
   await p.evaluate(id=>Posology.open(id),id);assert.equal(await p.locator('dialog').evaluate(d=>d.scrollWidth<=d.clientWidth+1),true,`diálogo ${id} ${width} ${theme}`);
   assert.deepEqual(await p.locator('dialog button:visible,.posology-guide button:visible,.posology-term:visible').evaluateAll(els=>els.filter(el=>{const r=el.getBoundingClientRect();return r.width<44||r.height<44;}).map(el=>el.textContent)),[],`toque ${id} ${width}`);
   assert.deepEqual(await p.locator('dialog *').evaluateAll(els=>els.filter(el=>el.getClientRects().length&&[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&parseFloat(getComputedStyle(el).fontSize)<12).map(el=>el.textContent)),[]);await p.keyboard.press('Escape');
  }await t.close();
 }
});
