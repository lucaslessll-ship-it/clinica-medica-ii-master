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
 localStorage.setItem('master_auth_local_owner',user.id);
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user}}}),getUser:async()=>({data:{user}}),onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(table){const query={select(){return query},order(){return query},range:async()=>({data:table==='cir_bank'?[{id:'t1',topic:'cirher',source:'Prova anterior',year:2024,stem:'Questão privada de teste',options:['A','B','C','D'],answer:3,comment:'Comentário privado',image_url:null}]:[],error:null}),eq(){return table==='master_progress'?Promise.resolve({data:[],error:null}):query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null})};return query;}})};
}
async function open(viewport={width:1280,height:800}){
 const context=await browser.newContext({viewport});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock.toString()})()`}));
 await page.goto(base+'/MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/index.html');await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 return {page,close:async()=>{assert.deepEqual(errors,[]);await context.close();}};
}

test('surgery lessons that have deep content are complete and fit 320 px',async()=>{
 const t=await open({width:320,height:640}),p=t.page;
 const lessons=await p.evaluate(()=>CIR.topics.flatMap(x=>x.chapters.map((_,i)=>[x.id,i])).filter(([id,i])=>LessonDeep.has(id,i)));
 assert.ok(lessons.length>=58,`only ${lessons.length} deep surgery lessons`);
 for(const [id,i] of lessons){
  await p.evaluate(([id,i])=>CIR.openTopic(id,i),[id,i]);
  const info=await p.evaluate(()=>{const d=document.querySelector('.deep-lesson');return d&&{pre:d.querySelectorAll('.deep-pretest li').length,flow:d.querySelectorAll('.deep-flow > li').length,recall:d.querySelectorAll('.deep-recall').length,refs:d.querySelectorAll('.deep-refs a[href^="https://"]').length,mn:d.querySelectorAll('.deep-mnemonics dt').length,ex:d.querySelectorAll('.deep-exam li').length,fit:document.documentElement.scrollWidth<=innerWidth+1}});
  assert.ok(info,`${id}_${i} missing`);if(['ciraa','cirpanc','cirtabd','cirttor'].includes(id))assert.ok(info.ex>=4,`${id}_${i} exam ${info.ex}`);assert.ok(info.pre>=4&&info.flow>=6&&info.recall>=5&&info.refs>=2&&info.mn>=3&&info.fit,`${id}_${i} ${JSON.stringify(info)}`);
 }
 await t.close();
});

test('surgery questions are well formed, practice records errors for review and the private bank joins the pool',async()=>{
 const t=await open(),p=t.page;
 const bad=await p.evaluate(()=>CIR.own.filter(q=>!q.id||!CIR.topics.some(t=>t.id===q.t)||!Array.isArray(q.o)||q.o.length<4||!(q.a>=0&&q.a<q.o.length)||!q.why).map(q=>q.id));
 assert.deepEqual(bad,[]);
 const ids=await p.evaluate(()=>CIR.own.map(q=>q.id));assert.equal(new Set(ids).size,ids.length);
 await p.waitForFunction(()=>CIR.pool().some(q=>q.bank));
 await p.evaluate(()=>CIR.startPractice({t:'cirher',src:'bank',mode:'all'}));
 assert.match(await p.locator('.cir-q').textContent(),/Questão privada de teste/);
 await p.locator('.p1-option').first().click();
 assert.match(await p.locator('.cir-q .info-notice').textContent(),/Resposta correta: D|Correto/);
 const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('master_cir_lucas_v1')).results['b:t1']);
 assert.equal(saved.correct,false);assert.ok(Date.parse(saved.next)>Date.now());
 await p.evaluate(()=>{location.hash='#cir'});await p.waitForFunction(()=>ui.route==='cir');
 assert.ok(await p.locator('.topic-card.cir-topic').count()>=14);
 await t.close();
});

test('study plan, home card, per-topic performance and the surgery filter work',async()=>{
 const t=await open({width:390,height:844}),p=t.page;
 const plan=await p.evaluate(()=>CIR.plan());
 if(plan){assert.equal(plan.pending.length,58);assert.ok(plan.target>=1&&plan.today.length===plan.left);assert.equal(plan.today[0].t.priority,5);}
 await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('master_cir_lucas_v1')||'{}');s.results=s.results||{};const past=new Date(Date.now()-864e5).toISOString();CIR.own.filter(q=>q.t==='cirher').slice(0,6).forEach((q,i)=>s.results[q.id]={correct:i<2,answer:0,attempts:1,date:past,box:0,next:past});localStorage.setItem('master_cir_lucas_v1',JSON.stringify(s));CIR.reload();navigate('dashboard');});
 assert.match(await p.locator('.dash-cir').innerText(),/Revisar 6 erros de cirurgia/);
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await p.locator('[data-subject-filter=CIR]').click();assert.equal(await p.locator('[data-subject]:visible').count(),14);
 await p.evaluate(()=>navigate('cir'));
 assert.match(await p.locator('.cir-perf-row').first().innerText(),/Hérnias[\s\S]*33%/);
 assert.match(await p.locator('.cir-perf-row').nth(1).innerText(),/poucos dados/);
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 if(plan){await p.locator('.cir-plan-list button').first().click();assert.equal(await p.evaluate(()=>ui.route),'cirtopic');await p.getByRole('button',{name:/Marcar aula concluída/}).click();assert.equal(await p.evaluate(()=>CIR.plan().doneToday),1);}
 await t.close();
});

test('table cells never break a word letter by letter and the page does not scroll sideways',async()=>{
 const t=await open({width:320,height:640}),p=t.page;
 for(const [id,i,p1] of [['hema',0],['p1arr',0,true],['cirremit',3],['cirtabd',0],['reuma1',0]]){
  await p.evaluate(([id,i,p1])=>{if(id.startsWith('cir'))CIR.openTopic(id,i);else if(p1){navigate('p1');P1.openTopic(id);P1.chapter(i);}else{openTopic(id);switchChapter(i);}},[id,i,p1]);
  const bad=await p.evaluate(()=>{const cv=document.createElement('canvas').getContext('2d'),out=[];document.querySelectorAll('#main-content :is(th,td)').forEach(c=>{const txt=c.textContent.trim();if(!txt)return;const cs=getComputedStyle(c);cv.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;const need=Math.max(...txt.split(/\s+/).map(x=>cv.measureText(x).width)),have=c.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);if(have+1<need)out.push(txt.slice(0,30));});return {out,cells:document.querySelectorAll('#main-content :is(th,td)').length,fit:document.documentElement.scrollWidth<=innerWidth+1};});
  assert.ok(bad.cells>0,`${id} has no table`);assert.deepEqual(bad.out,[],`${id} broken cells`);assert.ok(bad.fit,`${id} overflow`);
 }
 await t.close();
});
