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
async function abrirAula(width){
 const context=await browser.newContext({viewport:{width,height:1000},timezoneId:'America/Sao_Paulo',isMobile:width<800,hasTouch:width<800});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 await page.goto(`${base}/${APP}/index.html`);
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 await page.evaluate(async()=>{openTopic('neuro1');await new Promise(r=>setTimeout(r,400));switchChapter(0)});
 await page.waitForFunction(()=>document.querySelectorAll('#main-content table').length>0,null,{timeout:15000});
 await page.waitForTimeout(900);
 return {page,errors,close:async()=>{await context.close();assert.deepEqual(errors,[]);}};
}
const medir=page=>page.evaluate(()=>[...document.querySelectorAll('#main-content table')].map(t=>{
 const caixa=t.parentElement;
 return {fit:t.dataset.fit,colunas:t.querySelectorAll('thead th').length,
  rola:caixa.scrollWidth>caixa.clientWidth+1,larguraCaixa:caixa.clientWidth,
  rotulos:[...t.querySelectorAll('tbody tr:first-child td')].map(td=>td.getAttribute('data-col'))};
}));

test('nenhuma tabela rola na horizontal, de 320px ao desktop',async()=>{
 for(const width of [320,390,768,1024,1280]){
  const t=await abrirAula(width);
  const tabelas=await medir(t.page);
  assert.ok(tabelas.length>0,`sem tabelas para medir em ${width}px`);
  for(const tab of tabelas)assert.equal(tab.rola,false,`tabela rola em ${width}px: ${JSON.stringify(tab)}`);
  assert.equal(await t.page.evaluate(()=>document.scrollingElement.scrollWidth>document.scrollingElement.clientWidth+1),false,`página rola na horizontal em ${width}px`);
  await t.close();
 }
});

test('em tela estreita a tabela vira blocos rotulados; em tela larga continua tabela',async()=>{
 const estreito=await abrirAula(390);
 const compactas=await medir(estreito.page);
 const empilhada=compactas.find(t=>t.fit==='stack');
 assert.ok(empilhada,'nenhuma tabela empilhou em 390px');
 assert.ok(empilhada.rotulos.every(Boolean),`célula sem rótulo de coluna: ${JSON.stringify(empilhada.rotulos)}`);
 // O cabeçalho some da tela mas continua anunciado para leitores.
 assert.equal(await estreito.page.evaluate(()=>{const t=document.querySelector('#main-content table[data-fit="stack"]');
  return getComputedStyle(t.querySelector('thead')).position}),'absolute');
 assert.equal(await estreito.page.evaluate(()=>{const t=document.querySelector('#main-content table[data-fit="stack"]');
  return t.getAttribute('role')+'/'+t.querySelector('tbody tr').getAttribute('role')+'/'+t.querySelector('tbody td').getAttribute('role')}),'table/row/cell');
 await estreito.close();

 const largo=await abrirAula(1280);
 const amplas=await medir(largo.page);
 assert.ok(amplas.every(t=>t.fit==='wrap'),`tabela empilhou sem precisar no desktop: ${JSON.stringify(amplas)}`);
 await largo.close();
});

test('tabela se reorganiza ao girar o aparelho, sem recarregar',async()=>{
 const t=await abrirAula(1280),p=t.page;
 assert.ok((await medir(p)).every(x=>x.fit==='wrap'));
 await p.setViewportSize({width:380,height:900});
 await p.waitForFunction(()=>[...document.querySelectorAll('#main-content table')].some(t=>t.dataset.fit==='stack'),null,{timeout:5000});
 for(const tab of await medir(p))assert.equal(tab.rola,false);
 await p.setViewportSize({width:1280,height:900});
 await p.waitForFunction(()=>[...document.querySelectorAll('#main-content table')].every(t=>t.dataset.fit==='wrap'),null,{timeout:5000});
 await t.close();
});
