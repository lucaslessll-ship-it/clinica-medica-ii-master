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
async function open(viewport={width:1280,height:800},date){
 const context=await browser.newContext({viewport,timezoneId:'America/Sao_Paulo'});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock.toString()})()`}));
 if(date)await page.clock.install({time:new Date(date)});
 await page.goto(base+'/MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/index.html');await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 return {page,close:async()=>{assert.deepEqual(errors,[]);await context.close();}};
}

test('surgery lessons that have deep content are complete and fit 320 px',async()=>{
 const t=await open({width:320,height:640}),p=t.page;
 const lessons=await p.evaluate(()=>CIR.topics.flatMap(x=>x.chapters.map((_,i)=>[x.id,i])).filter(([id,i])=>LessonDeep.has(id,i)));
 assert.ok(lessons.length>=58,`only ${lessons.length} deep surgery lessons`);
 for(const [id,i] of lessons){
  await p.evaluate(([id,i])=>CIR.openTopic(id,i),[id,i]);
  const info=await p.evaluate(()=>{const d=document.querySelector('.deep-lesson');return d&&{pre:d.querySelectorAll('.deep-pretest li').length,flow:d.querySelectorAll('.deep-flow > li').length,recall:d.querySelectorAll('.deep-recall').length,refs:d.querySelectorAll('.deep-refs a[href^="https://"]').length,mn:d.querySelectorAll('.deep-mnemonics dt').length,fit:document.documentElement.scrollWidth<=innerWidth+1}});
  assert.ok(info,`${id}_${i} missing`);assert.ok(info.pre>=4&&info.flow>=6&&info.recall>=5&&info.refs>=2&&info.mn>=3&&info.fit,`${id}_${i} ${JSON.stringify(info)}`);
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
test('plano do dia abre a próxima aula, credita conclusões e limita o treino às questões planejadas',async()=>{
 const t=await open({width:1280,height:900},'2026-11-13T09:00:00-03:00'),p=t.page;
 const initial=await p.evaluate(()=>CIR.studyPlan());assert.equal(initial.totalLessons,58);assert.equal(initial.totalQuestions,212);assert.equal(initial.days[0].lessons.length,10);
 await p.locator('.cir-next-lesson').click();assert.equal(await p.evaluate(()=>ui.route),'cirtopic');await p.locator('.cir-lesson .module-actions button').first().click();
 const next=await p.evaluate(()=>CIR.studyPlan());assert.notEqual(next.next.key,initial.next.key);assert.equal(next.days[0].lessons.length,9);assert.equal(next.completedToday,1);
 const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem(CIR.KEY)));assert.ok(saved.plan.days['2026-11-13'].lessons.includes(initial.next.key));
 await p.evaluate(()=>{for(let next=CIR.studyPlan().next;next;next=CIR.studyPlan().next){CIR.openTopic(next.topic,next.index);CIR.toggleDone();}});
 assert.equal(await p.evaluate(()=>CIR.studyPlan().days[0].lessons.length),0);assert.equal(await p.evaluate(()=>CIR.studyPlan().completedToday),10);
 await p.evaluate(()=>navigate('dashboard'));await p.getByRole('button',{name:'Treinar questões de hoje',exact:true}).click();
 assert.equal(await p.evaluate(()=>ui.route),'cirpractice');assert.match(await p.locator('.cir-q .status-row').innerText(),/Questão 1 de 36/);await p.locator('.cir-q .p1-option').first().click();assert.equal(await p.evaluate(()=>CIR.studyPlan().questionCreditToday),1);await t.close();
});
test('Hoje soma evocação e revisões de Cirurgia e o botão usa o filtro devidas',async()=>{
 const t=await open({width:1280,height:900},'2026-11-13T09:00:00-03:00'),p=t.page;
 await p.evaluate(()=>{const id=CIR.own[0].id;localStorage.setItem(CIR.KEY,JSON.stringify({results:{[id]:{correct:false,next:'2026-11-12T12:00:00Z'}}}));CIR.reload();store.study={deep:{recall:{'neuro1_0#0':{d:'2026-11-12',n:0}},days:{}}};render();});
 assert.equal(await p.locator('.dash-today-nums strong').nth(1).textContent(),'2');await p.getByRole('button',{name:'Revisar Cirurgia: 1',exact:true}).click();assert.equal(await p.evaluate(()=>ui.route),'cirpractice');assert.match(await p.locator('.cir-q .status-row').innerText(),/Questão 1 de 1/);await t.close();
});
test('desempenho ordena percentuais conhecidos e não mostra percentual com poucos dados',async()=>{
 const t=await open(),p=t.page;
 const ids=await p.evaluate(()=>{const ids=CIR.topics.slice(0,3).map(topic=>topic.id),results={};ids.forEach((id,k)=>CIR.own.filter(q=>q.t===id).slice(0,k===2?4:5).forEach((q,i)=>results[q.id]={correct:k===0?i===0:true}));localStorage.setItem(CIR.KEY,JSON.stringify({results}));CIR.reload();CIR.go('cir');return ids;});
 const rows=p.locator('.cir-performance-row');assert.equal(await rows.count(),14);assert.equal(await rows.nth(0).getAttribute('data-performance-topic'),ids[0]);assert.match(await rows.nth(0).innerText(),/20%/);assert.equal(await rows.nth(1).getAttribute('data-performance-topic'),ids[1]);assert.match(await rows.nth(1).innerText(),/100%/);
 const scarce=p.locator(`[data-performance-topic="${ids[2]}"]`);assert.match(await scarce.innerText(),/4 respondidas/);assert.match(await scarce.innerText(),/poucos dados/);assert.ok(!(await scarce.innerText()).includes('%'));await scarce.getByRole('button',{name:/Treinar este tema/}).click();assert.equal(await p.evaluate(()=>ui.route),'cirpractice');await t.close();
});
test('plano final reserva revisão e desaparece automaticamente à meia-noite após a prova',async()=>{
 const t=await open({width:390,height:844},'2026-11-19T23:59:50-03:00'),p=t.page;
 assert.equal(await p.locator('.cir-study-plan').count(),1);assert.match(await p.locator('.cir-study-plan').innerText(),/revisão final e simulado/);assert.equal(await p.locator('.cir-next-lesson').count(),0);
 await p.clock.fastForward(11000);await p.waitForFunction(()=>!document.querySelector('.cir-study-plan'));await t.close();
});
test('grade com 30 matérias e plano respeita telas pequenas e os dois temas de cor',async()=>{
 for(const width of [320,390,820])for(const theme of ['light','dark']){
  const t=await open({width,height:1000},'2026-11-13T09:00:00-03:00'),p=t.page;await p.evaluate(theme=>HIG.setTheme(theme),theme);assert.equal(await p.locator('[data-subject]').count(),30);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await p.locator('[data-subject-filter=Cirurgia]').click();assert.equal(await p.locator('[data-subject]:visible').count(),14);await p.locator('[data-subject=ciraa]').click();assert.equal(await p.evaluate(()=>ui.route),'cirtopic');await p.evaluate(()=>CIR.go('cir'));assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  const small=await p.locator('.cir-performance .btn').evaluateAll(items=>items.filter(item=>item.getBoundingClientRect().height<44).length);assert.equal(small,0);if(width===390)await p.screenshot({path:`work/lote1-cirurgia-${theme}.png`,animations:'disabled'});await t.close();
 }
});
