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
 localStorage.setItem('master_auth_local_owner',user.id);const canvas=document.createElement('canvas');canvas.width=600;canvas.height=400;const ctx=canvas.getContext('2d');ctx.fillStyle='#284c54';ctx.fillRect(0,0,600,400);const fixture=canvas.toDataURL('image/png').split(',')[1];
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user,access_token:'test-jwt'}}}),getUser:async()=>({data:{user}}),onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(table){let columns='',key='';const query={select(c){columns=c;return query},order(){return query},contains(_,keys){key=keys[0];return query},eq(){return query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null}),then(resolve){const data=table==='lesson_images'?(columns==='keys'?[{keys:Array.from({length:8},(_,i)=>'rad_m'+(i+2))}]:[{id:key,caption:'Imagem sintética para teste',credit:'Fixture',mime:'image/png',data:fixture,marks:[{t:'Achado',x:50,y:50,lx:10,ly:10}]}]):[];resolve({data,error:null});}};return query;}})};
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
test('P2: bolinhas ficam verde/vermelho, permitem pular e o resultado traz gráfico e revisão',async()=>{
 const {page,close}=await abrir();
 await page.evaluate(()=>{startPractice('neuro1');});
 await page.waitForSelector('.qnav-dot');
 const responder=certo=>page.evaluate(certo=>{const p=ui.practice,q=QUESTION_BANK[p.ids[p.step]];choosePractice(certo?q.a:(q.a+1)%4);submitPractice();},certo);
 await responder(false);
 await page.evaluate(()=>jumpPractice(2));
 await responder(true);
 const cls=await page.$$eval('.qnav-dot',els=>els.slice(0,3).map(e=>e.className));
 assert.match(cls[0],/errada/);assert.match(cls[2],/certa/);assert.doesNotMatch(cls[1],/certa|errada/);
 // volta numa já respondida: mostra o feedback sem permitir responder de novo
 await page.click('.qnav-dot >> nth=0');
 await page.waitForSelector('.feedback');
 assert.equal(await page.evaluate(()=>ui.practice.revealed),true);
 await page.click('text=Ver resultado');
 await page.waitForSelector('.qnav-resumo svg.qnav-rosca');
 assert.ok(await page.$('.qnav-resumo .qnav-temas li'));
 const log=await page.evaluate(()=>Object.values(HIG.qlog()));
 assert.equal(log.length,1);assert.equal(log[0].b,'p2');assert.equal(log[0].erros,1);
 await page.evaluate(()=>navigate('revisao'));
 await page.waitForSelector('.qnav-painel');
 assert.match(await page.textContent('.qnav-agendagraf'),/Amanhã/);
 await close();
});
test('Cirurgia: bolinhas e resultado em gráfico',async()=>{
 const {page,close}=await abrir();
 await page.evaluate(()=>CIR.startPractice({t:'all',src:'all',mode:'all'}));
 await page.waitForSelector('.qnav-dot');
 await page.evaluate(()=>{const b=document.querySelector('.p1-option:not(.correct)');b.click();});
 await page.waitForSelector('.qnav-dot.certa, .qnav-dot.errada');
 await page.evaluate(()=>CIR.jump(3));
 await page.evaluate(()=>CIR.jump(0));
 assert.equal(await page.evaluate(()=>!!document.querySelector('.info-notice')),true);
 await page.click('text=Ver resultado');
 await page.waitForSelector('.qnav-resumo');
 await close();
});
test('clicar numa marca oferece Excluir e remove a marcação',async()=>{
 const {page,close}=await abrir();
 await page.evaluate(async()=>{openTopic('neuro1');await new Promise(r=>setTimeout(r,400));switchChapter(0)});
 await page.waitForFunction(()=>document.querySelectorAll('.deep-block p').length>0,null,{timeout:15000});
 await page.waitForTimeout(900);
 await page.evaluate(()=>{
  const p=[...document.querySelectorAll('.deep-block p')].find(p=>p.textContent.trim().length>140);
  const no=[...p.childNodes].find(n=>n.nodeType===3&&n.nodeValue.trim().length>60);
  const f=document.createRange();f.setStart(no,10);f.setEnd(no,55);const s=getSelection();s.removeAllRanges();s.addRange(f);
  document.dispatchEvent(new MouseEvent('mouseup',{bubbles:true}));
 });
 await page.waitForSelector('.nota-barra:not([hidden])');
 await page.click('.nota-cor >> nth=0');
 await page.waitForSelector('.nota-marca');
 await page.waitForTimeout(900);
 await page.evaluate(()=>{const m=document.querySelector('.nota-marca');m.scrollIntoView({block:'center'});});
 await page.waitForTimeout(900);
 await page.click('.nota-marca');
 await page.waitForSelector('.nota-excluir:not([hidden])');
 await page.click('.nota-excluir');
 await page.waitForFunction(()=>!document.querySelector('.nota-marca'));
 await close();
});
