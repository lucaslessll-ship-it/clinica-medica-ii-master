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
async function abrirAula(width=1280){
 const context=await browser.newContext({viewport:{width,height:900},timezoneId:'America/Sao_Paulo',isMobile:width<800,hasTouch:width<800});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 await page.goto(`${base}/${APP}/index.html`);
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 await page.evaluate(async()=>{openTopic('neuro1');await new Promise(r=>setTimeout(r,400));switchChapter(0)});
 await page.waitForFunction(()=>document.querySelectorAll('.deep-block p').length>0,null,{timeout:15000});
 await page.waitForTimeout(700);
 return {page,errors,close:async()=>{await context.close();assert.deepEqual(errors,[]);}};
}
// Seleciona um trecho de um parágrafo da aula e abre a barra.
const selecionar=(page,indice=0,de=10,ate=55)=>page.evaluate(([indice,de,ate])=>{
 const paragrafos=[...document.querySelectorAll('.deep-block p')].filter(p=>p.textContent.trim().length>140);
 const alvo=paragrafos[indice]||paragrafos[0];
 const no=[...alvo.childNodes].find(n=>n.nodeType===3&&n.nodeValue.trim().length>60);
 const faixa=document.createRange();faixa.setStart(no,de);faixa.setEnd(no,ate);
 const selecao=getSelection();selecao.removeAllRanges();selecao.addRange(faixa);
 document.dispatchEvent(new MouseEvent('mouseup',{bubbles:true}));
 return selecao.toString();
},[indice,de,ate]);
const gravadas=page=>page.evaluate(()=>JSON.parse(localStorage.getItem('master_p2_hig_v2')).marcas||{});

test('selecionar um trecho abre a barra com cores, sublinhado e comentário',async()=>{
 for(const width of [390,1280]){
  const t=await abrirAula(width),p=t.page;
  assert.equal(await p.locator('.nota-barra').count(),0,'barra aparece antes da seleção');
  const texto=await selecionar(p);
  await p.waitForSelector('.nota-barra:not([hidden])',{timeout:5000});
  const barra=await p.locator('.nota-barra').evaluate(el=>({
   cores:el.querySelectorAll('.nota-cor').length,
   sublinhado:!!el.querySelector('[data-cor="sublinhado"]'),
   comentar:!!el.querySelector('[data-acao="comentar"]'),
   dentroDaTela:el.getBoundingClientRect().left>=0&&el.getBoundingClientRect().right<=innerWidth,
   alvo:Math.min(...[...el.querySelectorAll('button')].filter(b=>b.getBoundingClientRect().height>0).map(b=>Math.min(b.getBoundingClientRect().width,b.getBoundingClientRect().height)))}));
  assert.equal(barra.cores,4);assert.ok(barra.sublinhado);assert.ok(barra.comentar);
  assert.ok(barra.dentroDaTela,`barra fora da tela em ${width}px`);
  assert.ok(barra.alvo>=34,`alvo de toque pequeno em ${width}px: ${barra.alvo}`);
  assert.ok(texto.length>10);
  await t.close();
 }
});

test('a marca é gravada na aula e volta ao reabrir',async()=>{
 const t=await abrirAula(),p=t.page;
 await selecionar(p);
 await p.waitForSelector('.nota-barra:not([hidden])');
 await p.click('.nota-barra .nota-cor[data-cor="verde"]');
 await p.waitForSelector('.nota-marca');
 const marca=await p.locator('.nota-marca').first().evaluate(el=>({cor:el.dataset.cor,texto:el.textContent}));
 assert.equal(marca.cor,'verde');
 const salvas=await gravadas(p);
 assert.deepEqual(Object.keys(salvas),['neuro1_0']);
 assert.equal(salvas.neuro1_0.length,1);
 assert.equal(salvas.neuro1_0[0].cor,'verde');

 await p.evaluate(async()=>{navigate('dashboard');await new Promise(r=>setTimeout(r,300));openTopic('neuro1');await new Promise(r=>setTimeout(r,400));switchChapter(0)});
 await p.waitForSelector('.nota-marca',{timeout:10000});
 assert.equal(await p.locator('.nota-marca').first().textContent(),marca.texto,'trecho remarcado em lugar diferente');
 await t.close();
});

test('comentário vira bolha ao lado do trecho e reabre pelo clique',async()=>{
 const t=await abrirAula(),p=t.page;
 await selecionar(p);
 await p.waitForSelector('.nota-barra:not([hidden])');
 await p.click('.nota-barra [data-acao="comentar"]');
 await p.waitForSelector('.nota-caixa:not([hidden])',{timeout:5000});
 assert.equal(await p.evaluate(()=>document.activeElement.tagName),'TEXTAREA','foco não foi para o campo');
 assert.ok((await p.locator('.nota-caixa blockquote').textContent()).length>10,'caixa não mostra o trecho');
 await p.fill('.nota-caixa textarea','Diferenciar de crise epiléptica pelo pós-ictal.');
 await p.click('.nota-caixa .nota-salvar');
 await p.waitForSelector('.nota-bolha',{timeout:5000});
 const salvas=await gravadas(p);
 assert.equal(salvas.neuro1_0[0].comentario,'Diferenciar de crise epiléptica pelo pós-ictal.');
 await p.click('.nota-bolha');
 await p.waitForSelector('.nota-caixa:not([hidden])');
 assert.equal(await p.locator('.nota-caixa textarea').inputValue(),'Diferenciar de crise epiléptica pelo pós-ictal.');
 // Apagar remove a marca do texto e do armazenamento.
 await p.click('.nota-caixa .nota-apagar');
 await p.waitForFunction(()=>document.querySelectorAll('.nota-marca').length===0,null,{timeout:5000});
 assert.deepEqual(Object.keys(await gravadas(p)),[]);
 await t.close();
});

test('as marcas aparecem reunidas por aula na Biblioteca pessoal',async()=>{
 const t=await abrirAula(),p=t.page;
 await selecionar(p);
 await p.waitForSelector('.nota-barra:not([hidden])');
 await p.click('.nota-barra [data-acao="comentar"]');
 await p.waitForSelector('.nota-caixa:not([hidden])');
 await p.fill('.nota-caixa textarea','Ponto de prova.');
 await p.click('.nota-caixa .nota-salvar');
 await p.waitForSelector('.nota-bolha');

 await p.evaluate(()=>navigate('notes'));
 await p.waitForSelector('.notas-aula',{timeout:10000});
 const lista=await p.locator('.notas-aula').first().evaluate(el=>({
  titulo:el.querySelector('h3').textContent,
  itens:el.querySelectorAll('.notas-item').length,
  comentario:el.querySelector('.notas-comentario')?.textContent,
  trecho:el.querySelector('.notas-trecho')?.textContent}));
 assert.match(lista.titulo,/^Notas de aula · .+/);
 assert.equal(lista.itens,1);
 assert.equal(lista.comentario,'Ponto de prova.');
 assert.ok(lista.trecho.length>10);
 // A página central não pode marcar o próprio texto citado.
 assert.equal(await p.locator('.nota-marca').count(),0,'a lista central marcou o próprio trecho');

 await p.click('.notas-ir');
 await p.waitForSelector('.nota-marca',{timeout:10000});
 assert.match(await p.evaluate(()=>location.hash),/^#topic\//);
 await t.close();
});

// A marcação precisa funcionar em todas as rotas de aula: P2, P1 e Cirurgia.
const abrirRota=async(abrir,width=1280)=>{
 const context=await browser.newContext({viewport:{width,height:900},timezoneId:'America/Sao_Paulo',isMobile:width<800,hasTouch:width<800});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 await page.goto(`${base}/${APP}/index.html`);
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 await page.evaluate(abrir);
 await page.waitForFunction(()=>document.querySelectorAll('.deep-lesson .deep-block p').length>0,null,{timeout:15000});
 await page.waitForTimeout(700);
 // A abertura da aula rola suavemente; só seleciona quando o texto parou.
 await page.waitForFunction(()=>new Promise(r=>{const a=scrollY;setTimeout(()=>r(Math.abs(scrollY-a)<1),250)}),null,{timeout:10000,polling:300});
 return {page,errors,close:async()=>{await context.close();assert.deepEqual(errors,[]);}};
};
const ROTAS=[
 ['P2 (topic)',()=>{openTopic('neuro1');switchChapter(0)},'neuro1_0'],
 ['P1 (p1topic)',()=>{P1.openTopic('p1dm');P1.chapter(0)},'p1dm_0'],
 ['Cirurgia (cirtopic)',()=>{CIR.openTopic(CIR.topics.find(t=>window.LessonDeep&&true).id,0)},null]
];
for(const [nome,abrir,chave] of ROTAS){
 test(`marcar, comentar e reencontrar o trecho funciona em ${nome}`,async()=>{
  const t=await abrirRota(abrir),p=t.page;
  const texto=await selecionar(p);
  await p.waitForSelector('.nota-barra:not([hidden])',{timeout:5000});
  await p.click('.nota-barra [data-cor="verde"]');
  await p.waitForSelector('.nota-marca[data-cor="verde"]',{timeout:5000});
  const marcada=await p.locator('.nota-marca').first().evaluate(el=>({texto:el.textContent,fundo:getComputedStyle(el).backgroundColor}));
  assert.ok(marcada.texto.trim().length>5);assert.notEqual(marcada.fundo,'rgba(0, 0, 0, 0)','marca sem cor de fundo');
  let gr=await gravadas(p);const chaves=Object.keys(gr);assert.equal(chaves.length,1,'nada foi gravado');
  if(chave)assert.equal(chaves[0],chave);
  // Comentário: abre a caixa, digita, salva e a bolha aparece ao lado do texto.
  await selecionar(p,1,5,50);
  await p.waitForSelector('.nota-barra:not([hidden])');
  await p.click('.nota-barra [data-acao="comentar"]');
  await p.waitForSelector('.nota-caixa:not([hidden]) textarea',{timeout:5000});
  assert.equal(await p.locator('.nota-caixa').isVisible(),true,'caixa de comentário não apareceu');
  await p.fill('.nota-caixa textarea','revisar na sexta');
  await p.click('.nota-caixa .nota-salvar');
  await p.waitForSelector('.nota-bolha',{timeout:5000});
  gr=await gravadas(p);assert.equal(Object.values(gr)[0].length,2);
  assert.ok(Object.values(gr)[0].some(m=>m.comentario==='revisar na sexta'));
  // Recarrega: as marcas voltam sozinhas.
  await p.reload();
  await p.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
  await p.evaluate(abrir);
  await p.waitForSelector('.nota-marca',{timeout:8000});
  assert.equal(await p.locator('.nota-bolha').count(),1);
  // A Biblioteca reúne e leva de volta à aula certa.
  await p.evaluate(()=>navigate('notes'));
  await p.waitForSelector('.notas-aula',{timeout:5000});
  assert.match(await p.locator('.notas-aula').first().innerText(),/revisar na sexta/);
  await p.locator('.notas-ir').first().click();
  await p.waitForSelector('.deep-lesson .nota-marca',{timeout:8000});
  await t.close();
 });
}
