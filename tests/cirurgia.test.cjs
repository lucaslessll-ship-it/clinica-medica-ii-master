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
 assert.ok(lessons.length>=46,`only ${lessons.length} deep surgery lessons`);
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
