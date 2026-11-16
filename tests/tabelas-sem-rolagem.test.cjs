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
async function abrir(width){
 const context=await browser.newContext({viewport:{width,height:900},timezoneId:'America/Sao_Paulo',isMobile:width<800,hasTouch:width<800});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 await page.goto(`${base}/${APP}/index.html`);
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 await page.evaluate(async()=>{openTopic('neuro1');await new Promise(r=>setTimeout(r,400));switchChapter(0);});
 await page.waitForTimeout(1300);
 return {page,errors,close:async()=>{await context.close();assert.deepEqual(errors,[]);}};
}
const medir=page=>page.evaluate(()=>[...document.querySelectorAll('#main-content table')].map(t=>{
 const caixa=t.parentElement;
 return {fit:t.dataset.fit||'',colunas:t.querySelectorAll('thead th').length,
  rola:caixa.scrollWidth>caixa.clientWidth+1,espaco:caixa.clientWidth,
  rotulos:[...t.querySelectorAll('tbody td')].every(td=>!t.matches('[data-fit="stack"]')||td.hasAttribute('data-col')),
  papel:t.getAttribute('role')||''};}));

test('nenhuma tabela precisa de rolagem horizontal, de 320 px ao desktop',async()=>{
 for(const width of [320,360,390,768,1024,1440]){
  const t=await abrir(width),p=t.page;
  const tabelas=await medir(p);
  assert.ok(tabelas.length>0,`nenhuma tabela encontrada em ${width}px`);
  for(const tabela of tabelas)assert.equal(tabela.rola,false,`tabela rolando em ${width}px: ${JSON.stringify(tabela)}`);
  assert.equal(await p.evaluate(()=>document.scrollingElement.scrollWidth>document.scrollingElement.clientWidth+1),false,`página rola na horizontal em ${width}px`);
  await t.close();
 }
});

test('em tela estreita a tabela vira blocos rotulados e mantém a semântica',async()=>{
 const t=await abrir(390),p=t.page;
 const tabelas=await medir(p);
 const empilhadas=tabelas.filter(x=>x.fit==='stack');
 assert.ok(empilhadas.length>0,'nenhuma tabela empilhou em 390px');
 for(const tabela of empilhadas){
  assert.equal(tabela.rotulos,true,'célula sem rótulo de coluna');
  assert.equal(tabela.papel,'table','tabela empilhada perdeu o papel de tabela');
 }
 // O rótulo exibido vem do cabeçalho da coluna correspondente.
 const conferido=await p.evaluate(()=>{
  const t=document.querySelector('#main-content table[data-fit="stack"]');
  const colunas=[...t.querySelectorAll('thead th')].map(th=>th.textContent.trim());
  const linha=t.querySelector('tbody tr');
  return [...linha.children].map((c,i)=>c.tagName==='TD'?c.getAttribute('data-col')===colunas[i]:true).every(Boolean);
 });
 assert.equal(conferido,true,'rótulo não corresponde à coluna');
 await t.close();
});

test('em tela larga a tabela volta a ser tabela e ocupa a coluna',async()=>{
 const t=await abrir(1440),p=t.page;
 const tabelas=await medir(p);
 assert.ok(tabelas.some(x=>x.fit==='wrap'),'nenhuma tabela em formato normal no desktop');
 assert.equal(await p.evaluate(()=>{
  const t=document.querySelector('#main-content table[data-fit="wrap"]');
  return getComputedStyle(t).display;
 }),'table');
 await t.close();
});
