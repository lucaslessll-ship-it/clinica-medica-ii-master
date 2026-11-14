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
 const context=await browser.newContext({viewport,timezoneId:'America/Sao_Paulo'});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
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
  const info=await p.evaluate(()=>{const d=document.querySelector('.deep-lesson');return d&&{pre:d.querySelectorAll('.deep-pretest li').length,flow:d.querySelectorAll('.deep-flow > li').length,recall:d.querySelectorAll('.deep-recall').length,refs:d.querySelectorAll('.deep-refs a[href^="https://"]').length,mn:d.querySelectorAll('.deep-mnemonics dt').length,cases:d.querySelectorAll('.deep-case').length,ex:d.querySelectorAll('.deep-exam li').length,fit:document.documentElement.scrollWidth<=innerWidth+1}});
  assert.ok(info,`${id}_${i} missing`);if(['ciraa','cirpanc','cirher','cirtabd','cirttor'].includes(id))assert.ok(info.ex>=4&&info.pre>=6&&info.recall>=8&&info.cases===2,`${id}_${i} aprofundamento ${JSON.stringify(info)}`);assert.ok(info.pre>=4&&info.flow>=6&&info.recall>=5&&info.refs>=2&&info.mn>=3&&info.fit,`${id}_${i} ${JSON.stringify(info)}`);
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
 const initial=await p.evaluate(()=>CIR.studyPlan());assert.equal(initial.totalLessons,58);assert.equal(initial.totalQuestions,await p.evaluate(()=>CIR.own.length));assert.equal(initial.days[0].lessons.length,10);
 await p.locator('.cir-next-lesson').click();assert.equal(await p.evaluate(()=>ui.route),'cirtopic');await p.locator('.cir-lesson .module-actions button').first().click();
 const next=await p.evaluate(()=>CIR.studyPlan());assert.notEqual(next.next.key,initial.next.key);assert.equal(next.days[0].lessons.length,9);assert.equal(next.completedToday,1);
 const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem(CIR.KEY)));assert.ok(saved.plan.days['2026-11-13'].lessons.includes(initial.next.key));
 await p.evaluate(()=>{for(let next=CIR.studyPlan().next;next;next=CIR.studyPlan().next){CIR.openTopic(next.topic,next.index);CIR.toggleDone();}});
 assert.equal(await p.evaluate(()=>CIR.studyPlan().days[0].lessons.length),0);assert.equal(await p.evaluate(()=>CIR.studyPlan().completedToday),10);
 await p.evaluate(()=>navigate('dashboard'));await p.getByRole('button',{name:'Treinar questões de hoje',exact:true}).click();
 assert.equal(await p.evaluate(()=>ui.route),'cirpractice');assert.match(await p.locator('.cir-q .status-row').innerText(),new RegExp('Questão 1 de '+initial.days[0].questions.length));await p.locator('.cir-q .p1-option').first().click();assert.equal(await p.evaluate(()=>CIR.studyPlan().questionCreditToday),1);await t.close();
});
test('Hoje soma evocação e revisões de Cirurgia e o botão usa o filtro devidas',async()=>{
 const t=await open({width:1280,height:900},'2026-11-13T09:00:00-03:00'),p=t.page;
 await p.evaluate(()=>{const id=CIR.own[0].id;localStorage.setItem(CIR.KEY,JSON.stringify({results:{[id]:{correct:false,next:'2026-11-12T12:00:00Z'}}}));CIR.reload();store.study={deep:{recall:{'neuro1_0#0':{d:'2026-11-12',n:0}},days:{}}};render();});
 assert.equal(await p.locator('.dash-today-nums strong').nth(1).textContent(),'2');await p.getByRole('button',{name:'Revisar Cirurgia: 1',exact:true}).click();assert.equal(await p.evaluate(()=>ui.route),'cirpractice');assert.match(await p.locator('.cir-q .status-row').innerText(),/Questão 1 de 1/);await t.close();
});
test('o plano preserva conclusões com doneAt da versão publicada',async()=>{
 const t=await open({width:390,height:844},'2026-11-14T09:00:00-03:00'),p=t.page;
 await p.evaluate(()=>{localStorage.setItem(CIR.KEY,JSON.stringify({completed:{ciraa_0:true},doneAt:{ciraa_0:'2026-11-14'},notes:{ciraa_0:'Anotação preservada'},exams:[{score:1,total:2}]}));CIR.reload();render();});
 const plan=await p.evaluate(()=>CIR.studyPlan());assert.equal(plan.completedToday,1);assert.equal(plan.days[0].lessons.length,11);assert.equal(plan.pendingLessons,57);
 await p.locator('.cir-next-lesson').click();await p.getByRole('button',{name:/Marcar aula concluída/}).click();
 const state=await p.evaluate(()=>JSON.parse(localStorage.getItem(CIR.KEY)));assert.equal(state.doneAt.ciraa_0,'2026-11-14');assert.equal(state.notes.ciraa_0,'Anotação preservada');assert.equal(state.exams.length,1);assert.equal(await p.evaluate(()=>CIR.studyPlan().completedToday),2);await t.close();
});
test('Hoje atualiza revisões do banco privado quando o carregamento termina',async()=>{
 const t=await open({width:1280,height:900},'2026-11-13T09:00:00-03:00'),p=t.page;await p.waitForFunction(()=>CIR.pool().some(q=>q.bank));
 await p.evaluate(()=>{window.dispatchEvent(new Event('master-auth-ended'));localStorage.setItem(CIR.KEY,JSON.stringify({results:{'b:t1':{correct:false,next:'2026-11-12T12:00:00Z'}}}));CIR.reload();navigate('dashboard');});
 assert.equal(await p.locator('.dash-today-nums strong').nth(1).textContent(),'0');await p.evaluate(()=>CIR.loadBank());
 assert.equal(await p.locator('.dash-today-nums strong').nth(1).textContent(),'1');await p.getByRole('button',{name:'Revisar Cirurgia: 1',exact:true}).click();assert.match(await p.locator('.cir-q').innerText(),/Questão privada de teste/);await t.close();
});
test('desempenho ordena percentuais conhecidos e não mostra percentual com poucos dados',async()=>{
 const t=await open(),p=t.page;
 const ids=await p.evaluate(()=>{const ids=CIR.topics.slice(0,3).map(topic=>topic.id),results={};ids.forEach((id,k)=>CIR.own.filter(q=>q.t===id).slice(0,k===2?4:5).forEach((q,i)=>results[q.id]={correct:k===0?i===0:true}));localStorage.setItem(CIR.KEY,JSON.stringify({results}));CIR.reload();CIR.go('cir');return ids;});
 const rows=p.locator('.cir-perf-row');assert.equal(await rows.count(),14);assert.match(await rows.nth(0).innerText(),/Abdome agudo/);assert.match(await rows.nth(0).innerText(),/20%/);assert.match(await rows.nth(1).innerText(),/Pâncreas/);assert.match(await rows.nth(1).innerText(),/100%/);
 const scarce=rows.filter({hasText:'Hérnias da parede abdominal'});assert.match(await scarce.innerText(),/4 respondidas/);assert.match(await scarce.innerText(),/poucos dados/);assert.ok(!(await scarce.innerText()).includes('%'));await scarce.getByRole('button',{name:/Treinar este tema/}).click();assert.equal(await p.evaluate(()=>ui.route),'cirpractice');await t.close();
});
test('plano final reserva revisão e desaparece automaticamente à meia-noite após a prova',async()=>{
 const t=await open({width:390,height:844},'2026-11-19T23:59:50-03:00'),p=t.page;
 assert.equal(await p.locator('.cir-study-plan').count(),1);assert.match(await p.locator('.cir-study-plan').innerText(),/revisão final e simulado/);assert.equal(await p.locator('.cir-next-lesson').count(),0);
 await p.clock.fastForward(11000);await p.waitForFunction(()=>!document.querySelector('.cir-study-plan'));await t.close();
});
test('grade com 30 matérias e plano respeita telas pequenas e os dois temas de cor',async()=>{
 for(const width of [320,390,820])for(const theme of ['light','dark']){
  const t=await open({width,height:1000},'2026-11-13T09:00:00-03:00'),p=t.page;await p.evaluate(theme=>HIG.setTheme(theme),theme);assert.equal(await p.locator('[data-subject]').count(),30);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await p.locator('[data-subject-filter=CIR]').click();assert.equal(await p.locator('[data-subject]:visible').count(),14);await p.locator('[data-subject=ciraa]').click();assert.equal(await p.evaluate(()=>ui.route),'cirtopic');await p.evaluate(()=>CIR.go('cir'));assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  const small=await p.locator('.cir-perf .btn').evaluateAll(items=>items.filter(item=>item.getBoundingClientRect().height<44).length);assert.equal(small,0);if(width===390)await p.screenshot({path:`work/lote1-cirurgia-${theme}.png`,animations:'disabled'});await t.close();
 }
});

// Conteúdo e imagem sintéticos usados somente nesta interface de teste.
// Não representam caso clínico, licença verificada ou figura distribuída no site.
function extendedFixture(){
 const text='Texto de teste para conferir leitura, marcações e navegação.';
 return {
  updated:'13/11/2026',pretest:Array.from({length:6},(_,i)=>'Pergunta de teste '+(i+1)),
  exam:Array.from({length:4},(_,i)=>({pattern:'Enunciado de teste '+(i+1),trap:'Identificar a limitação descrita.',answer:'Justificar a resposta com os dados apresentados.'})),
  sections:[{h:'Seção de teste',p:[text]}],flow:{title:'Sequência de teste',nodes:Array.from({length:6},()=>({k:'do',t:text}))},
  reasoning:[text],mnemonics:Array.from({length:3},()=>({n:'Lembrete de teste',t:text})),pitfalls:[text],recall:Array.from({length:8},(_,i)=>({q:'Pergunta '+(i+1),a:text})),practice:[text],
  refs:[{t:'Fonte de teste 1',u:'https://example.test/1'},{t:'Fonte de teste 2',u:'https://example.test/2'}],
  cases:[{title:'Caso sintético 1',data:[text],reasoning:[text,text],conduct:[text,text],error:text},{title:'Caso sintético 2',data:text,reasoning:text,conduct:text,error:text}],
  figs:[{src:'assets/figs/figura-teste.webp',alt:'Figura geométrica sintética para teste de interface',caption:'Imagem sintética criada no teste. Sem conteúdo clínico.',credit:'Teste de interface',license:'CC0 1.0',sourceUrl:'https://commons.wikimedia.org/wiki/Main_Page',markers:[{x:20,y:25,toX:45,toY:45,label:'Centro da forma de teste.'},{x:80,y:75,toX:60,toY:55,label:'Borda da forma de teste.'}]}]
 };
}
async function showFixture(p){
 const data=await p.evaluate(()=>{const canvas=document.createElement('canvas');canvas.width=600;canvas.height=400;const ctx=canvas.getContext('2d');ctx.fillStyle='#303b46';ctx.fillRect(0,0,600,400);ctx.fillStyle='#d8ede5';ctx.fillRect(200,120,200,160);return canvas.toDataURL('image/webp').split(',')[1];});
 await p.route('**/assets/figs/figura-teste.webp',route=>route.fulfill({contentType:'image/webp',body:Buffer.from(data,'base64')}));
 await p.evaluate(fixture=>{LessonDeep.add({'teste_0':fixture});document.querySelector('#main-content').innerHTML=LessonDeep.render('teste',0);},extendedFixture());
}
test('campos opcionais de prova e casos preservam aulas existentes e escapam texto',async()=>{
 const t=await open(),p=t.page;const original=await p.evaluate(()=>LessonDeep.render('ciraa',0));await showFixture(p);
 assert.equal(await p.evaluate(()=>LessonDeep.render('ciraa',0)),original);
 assert.equal(await p.locator('.deep-exam-list>li').count(),4);assert.equal(await p.locator('.deep-case').count(),2);
 assert.equal(await p.locator('.deep-pretest + .deep-exam').count(),1);assert.equal(await p.locator('.deep-case dt').count(),8);assert.equal(await p.locator('.deep-pretest li').count(),6);assert.equal(await p.locator('.deep-recall').count(),8);
 const malicious='<img src=x onerror=alert(1)>';
 await p.evaluate(({fixture,malicious})=>{fixture.exam=[{pattern:malicious,trap:malicious,answer:malicious}];fixture.cases[0].title=malicious;LessonDeep.add({'teste_0':fixture});document.querySelector('#main-content').innerHTML=LessonDeep.render('teste',0);},{fixture:extendedFixture(),malicious});
 assert.equal(await p.locator('.deep-exam img,.deep-cases img').count(),0);assert.ok((await p.locator('.deep-exam').innerText()).includes(malicious));await t.close();
});
test('figuras locais têm crédito, licença, marcações e ampliação por teclado sem rolagem horizontal',async()=>{
 for(const width of [320,390,820,1280])for(const theme of ['light','dark']){
  const t=await open({width,height:1000}),p=t.page;await p.evaluate(theme=>HIG.setTheme(theme),theme);await showFixture(p);
  const figure=p.locator('.deep-images .deep-figure');await figure.scrollIntoViewIfNeeded();await p.locator('.deep-figure img').evaluate(img=>img.decode());
  assert.equal(await figure.locator('svg circle').count(),2);assert.equal(await figure.locator('.deep-figure-legend li').count(),2);assert.match(await figure.locator('figcaption').innerText(),/Crédito: Teste de interface.*CC0 1.0/s);
  assert.equal(await figure.locator('a').last().getAttribute('href'),'https://commons.wikimedia.org/wiki/Main_Page');assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  const button=figure.locator('button');assert.ok(await button.evaluate(el=>el.getBoundingClientRect().height)>=44);await button.focus();await p.keyboard.press('Enter');
  const dialog=p.locator('.deep-figure-dialog');assert.equal(await dialog.isVisible(),true);assert.equal(await dialog.locator('svg circle').count(),2);assert.equal(await dialog.locator('.deep-figure-legend li').count(),2);assert.ok(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth+1));
  assert.equal(await p.evaluate(()=>{const ids=[...document.querySelectorAll('marker')].map(el=>el.id);return ids.length===new Set(ids).size;}),true);
  assert.ok(await dialog.locator('button').evaluate(el=>el.getBoundingClientRect().height)>=44);await p.keyboard.press('Escape');await p.waitForFunction(()=>!document.querySelector('.deep-figure-dialog'));assert.equal(await button.evaluate(el=>el===document.activeElement),true);
  await button.click();await p.getByRole('button',{name:'Fechar imagem',exact:true}).click();await dialog.waitFor({state:'detached'});
  const rejected=await p.evaluate(figure=>['CC BY-NC-SA 4.0','CC BY-SA 4.0','Licença não informada'].map(license=>LessonDeep.figures([{...figure,license}])),extendedFixture().figs[0]);assert.deepEqual(rejected,['','','']);
  const noMarkers=await p.evaluate(figure=>LessonDeep.figures([{...figure,markers:[]}]),extendedFixture().figs[0]);assert.equal(noMarkers,'');await t.close();
 }
});

test('temas aprofundados oferecem ao menos 30 questões distintas',async()=>{
 const t=await open(),p=t.page;
 const counts=await p.evaluate(()=>Object.fromEntries(['ciraa','cirpanc','cirher','cirtabd','cirttor'].map(id=>[id,CIR.own.filter(q=>q.t===id).length])));
 for(const [id,count] of Object.entries(counts))assert.ok(count>=30,id+': '+count);await t.close();
});
