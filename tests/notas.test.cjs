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
 p.once('dialog',d=>d.accept());
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


test('barra de seleção fora da área visível cabe na viewport e aceita comentário sem rolar',async()=>{
 for(const width of [390,1280]){
  const t=await abrirAula(width),p=t.page;
  await selecionar(p);
  await p.waitForSelector('.nota-barra:not([hidden])');
  const before=await p.evaluate(()=>{const bar=document.querySelector('.nota-barra').getBoundingClientRect(),button=document.querySelector('.nota-barra [data-acao="comentar"]'),r=button.getBoundingClientRect();return {y:scrollY,top:bar.top,bottom:bar.bottom,left:bar.left,right:bar.right,height:visualViewport?.height||innerHeight,width:visualViewport?.width||innerWidth,clickable:button.contains(document.elementFromPoint(r.left+r.width/2,r.top+r.height/2))};});
  assert.ok(before.top>=0&&before.bottom<=before.height+1,`barra fora da altura visível em ${width}px: ${JSON.stringify(before)}`);
  assert.ok(before.left>=0&&before.right<=before.width+1,`barra fora da largura visível em ${width}px`);
  assert.equal(before.clickable,true,'o botão de comentar está encoberto');
  await p.click('.nota-barra [data-acao="comentar"]');
  await p.waitForSelector('.nota-caixa:not([hidden]) textarea');
  assert.ok(Math.abs(await p.evaluate(()=>scrollY)-before.y)<=1,'abrir comentário deslocou a página');
  const inside=await p.locator('.nota-caixa').evaluate(el=>{const r=el.getBoundingClientRect();return r.top>=0&&r.bottom<=(visualViewport?.height||innerHeight)+1;});
  assert.equal(inside,true,'caixa de comentário fora da área visível');
  await t.close();
 }
});


test('painel de citações alterna entre uma e todas da aula e minimiza para o ícone',async()=>{
 const t=await abrirAula(),p=t.page;
 await selecionar(p,0,10,55);
 await p.waitForSelector('.nota-barra:not([hidden])');
 await p.click('.nota-barra [data-acao="comentar"]');
 await p.waitForSelector('.nota-caixa:not([hidden]) .nota-painel-entrada');
 assert.equal(await p.locator('.nota-painel-entrada').count(),1);
 await p.fill('.nota-painel-entrada textarea','Primeira citação');
 await p.click('.nota-painel-entrada .nota-salvar');
 await selecionar(p,1,5,50);
 await p.waitForSelector('.nota-barra:not([hidden])');
 await p.click('.nota-barra [data-acao="comentar"]');
 await p.waitForSelector('.nota-caixa:not([hidden]) .nota-painel-entrada');
 await p.fill('.nota-painel-entrada textarea','Segunda citação');
 await p.click('.nota-painel-entrada .nota-salvar');
 await p.click('.nota-painel-seletor [data-modo="todas"]');
 assert.equal(await p.locator('.nota-painel-entrada').count(),2);
 assert.deepEqual(await p.locator('.nota-painel-entrada textarea').evaluateAll(v=>v.map(e=>e.value)),['Primeira citação','Segunda citação']);
 await p.click('.nota-minimizar');
 await p.locator('.nota-caixa').waitFor({state:'hidden'});
 assert.equal(await p.locator('.nota-bolha').count(),2);
 // A bolha reabre apenas a anotação do trecho selecionado.
 await p.locator('.nota-bolha').first().evaluate(el=>el.click());
 await p.waitForSelector('.nota-caixa:not([hidden])');
 assert.equal(await p.locator('.nota-painel-entrada').count(),1);
 assert.equal(await p.locator('[data-modo="uma"]').getAttribute('aria-pressed'),'true');
 await p.click('.nota-fechar');
 await t.close();
});

test('caderno no topo reúne os registros de P1, P2 e Cirurgia sem mudar suas chaves',async()=>{
 const t=await abrirAula(),p=t.page;
 const antes=await p.evaluate(()=>{
   const p1=JSON.parse(localStorage.getItem('master_p1_lucas_v4')||'{}');
   const cir=JSON.parse(localStorage.getItem('master_cir_lucas_v1')||'{}');
   p1.notes={...(p1.notes||{}),p1dm_0:'Nota P1 preservada'};
   cir.notes={...(cir.notes||{}),ciraa_0:'Nota da Cirurgia preservada'};
   localStorage.setItem('master_p1_lucas_v4',JSON.stringify(p1));
   localStorage.setItem('master_cir_lucas_v1',JSON.stringify(cir));
   P1.reload();CIR.reload();
   return [localStorage.getItem('master_p1_lucas_v4'),localStorage.getItem('master_cir_lucas_v1')];
 });
 await p.click('#caderno-atalho-topo');
 await p.waitForSelector('#caderno-painel:not([hidden])');
 assert.match(await p.locator('#caderno-painel [data-materia="p1"] .caderno-painel-editor-nota').first().inputValue(),/Nota P1 preservada/);
 assert.match(await p.locator('#caderno-painel [data-materia="cir"] .caderno-painel-editor-nota').first().inputValue(),/Nota da Cirurgia preservada/);
 await p.click('[data-painel-acao="completo"]');
 await p.waitForSelector('.caderno-unificado');
 assert.equal(await p.locator('.caderno-materia').count(),3);
 const p1aula=p.locator('#caderno-p1 .caderno-aula').first();
 const ciraula=p.locator('#caderno-cir .caderno-aula').first();
 await p1aula.locator('summary').click();
 await ciraula.locator('summary').click();
 assert.match(await p1aula.locator('.caderno-editor').inputValue(),/Nota P1 preservada/);
 assert.match(await ciraula.locator('.caderno-editor').inputValue(),/Nota da Cirurgia preservada/);
 const notas=await p.evaluate(()=>[
   JSON.parse(localStorage.getItem('master_p1_lucas_v4')).notes.p1dm_0,
   JSON.parse(localStorage.getItem('master_cir_lucas_v1')).notes.ciraa_0
 ]);
 assert.deepEqual(notas,['Nota P1 preservada','Nota da Cirurgia preservada']);
 // O caderno pode editar diretamente o registro original da P1.
 await p1aula.locator('.caderno-editor').fill('Nota P1 editada no caderno');
 await p1aula.locator('.caderno-salvar-nota').click();
 assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('master_p1_lucas_v4')).notes.p1dm_0),'Nota P1 editada no caderno');
 await t.close();
});


test('editor formata texto e jamais injeta HTML, script ou imagem na prévia',async()=>{
 const t=await abrirAula(),p=t.page;
 await p.waitForFunction(()=>!!window.FormatacaoNotas);
 const html=await p.evaluate(()=>FormatacaoNotas.renderizar('**Negrito** ++sublinhado++ ~~riscado~~\n- Primeiro\n<img src="https://example.test/x" onerror="alert(1)">'));
 assert.match(html,/<strong>Negrito<\/strong>/);
 assert.match(html,/<u>sublinhado<\/u>/);
 assert.match(html,/<s>riscado<\/s>/);
 assert.match(html,/<li>Primeiro<\/li>/);
 assert.doesNotMatch(html,/<img |<script/i);
 assert.match(html,/&lt;img/);
 await p.evaluate(()=>{openTopic('neuro1');switchChapter(0)});
 const textarea=p.locator('#chapter-note');
 await p.locator('.lesson-caderno summary').click();
 await textarea.fill('Texto para negrito');
 await textarea.evaluate(el=>el.setSelectionRange(0,5));
 await p.locator('.lesson-caderno .nota-formatbar [data-formatar="negrito"]').click();
 assert.match(await textarea.inputValue(),/\*\*Texto\*\*/);
 assert.match(await p.locator('.lesson-caderno .nota-preview').innerHTML(),/<strong>Texto<\/strong>/);
 await t.close();
});

test('caderno filtra matérias, volta ao trecho citado e preserva marcação original',async()=>{
 const t=await abrirAula(),p=t.page;
 await selecionar(p,0,10,55);
 await p.waitForSelector('.nota-barra:not([hidden])');
 await p.click('.nota-barra [data-acao="comentar"]');
 await p.waitForSelector('.nota-caixa:not([hidden])');
 await p.fill('.nota-painel-entrada textarea','Observação teste de citação');
 await p.click('.nota-painel-entrada .nota-salvar');
 const original=await p.evaluate(()=>JSON.stringify(HIG.marcas('neuro1_0')));
 await p.evaluate(()=>navigate('notes'));
 await p.waitForSelector('.caderno-unificado');
 await p.fill('#caderno-busca','observação teste');
 assert.equal(await p.locator('.caderno-aula:not([hidden])').count(),1);
 await p.locator('[data-caderno-filtro="comentarios"]').click();
 assert.equal(await p.locator('.caderno-aula:not([hidden])').count(),1);
 await p.locator('.caderno-voltar-trecho').first().click();
 await p.waitForSelector('.nota-marca.nota-trecho-destino',{timeout:8000});
 assert.equal(await p.evaluate(()=>JSON.stringify(HIG.marcas('neuro1_0'))),original);
 await t.close();
});


test('modo todas reúne comentários e nota geral sem confundir o armazenamento',async()=>{
 const t=await abrirAula(),p=t.page;
 await selecionar(p,0,10,55);
 await p.waitForSelector('.nota-barra:not([hidden])');
 await p.click('.nota-barra [data-acao="comentar"]');
 await p.waitForSelector('.nota-caixa:not([hidden])');
 await p.fill('.nota-painel-entrada textarea','Comentário individual');
 await p.click('.nota-painel-entrada .nota-salvar');
 await p.click('.nota-painel-seletor [data-modo="todas"]');
 await p.waitForSelector('.nota-painel-geral-editor');
 await p.fill('.nota-painel-geral-editor','Resumo geral desta aula');
 await p.click('.nota-painel-salvar-geral');
 const valor=await p.evaluate(()=>JSON.parse(localStorage.getItem('master_p2_hig_v2')).notes.neuro1_0);
 assert.equal(valor,'Resumo geral desta aula');
 await p.click('.nota-painel-seletor [data-modo="uma"]');
 await p.click('.nota-painel-seletor [data-modo="todas"]');
 assert.equal(await p.locator('.nota-painel-geral-editor').inputValue(),'Resumo geral desta aula');
 assert.equal(await p.locator('.nota-painel-entrada').count(),1);
 await t.close();
});

test('atalho do caderno e menu principal permanecem acessíveis no celular',async()=>{
 const t=await abrirAula(390),p=t.page;
 await p.locator('#mobile-tabbar [data-tab=notes]').click();
 await p.getByRole('button',{name:'Abrir painel do caderno',exact:true}).click();
 await p.waitForFunction(()=>!document.getElementById('caderno-painel')?.classList.contains('wm-enter'));
 const layout=await p.evaluate(()=>{
   const painel=document.getElementById('caderno-painel');
   const r=painel.getBoundingClientRect();
   const menu=document.querySelector('.menu-button');
   const b=menu.getBoundingClientRect();
   return {painel:painel.hidden,painelNaTela:r.left>=0&&r.right<=innerWidth+1,menuLivre:menu.contains(document.elementFromPoint(b.left+b.width/2,b.top+b.height/2))};
 });
 assert.equal(layout.painel,false);
 assert.equal(layout.painelNaTela,true);
 assert.equal(layout.menuLivre,true);
 await p.locator('[data-painel-acao="minimizar"]').click();
 await p.locator('#caderno-painel').waitFor({state:'hidden'});
 assert.equal(await p.locator('#mobile-tabbar [data-tab=notes]').isVisible(),true);
 await t.close();
});


test('anotações em cursos POCUS são isoladas por módulo e reunidas no caderno',async()=>{
 const t=await abrirAula(),p=t.page;
 await p.evaluate(async()=>{
   if(window.RouteAssets)await window.RouteAssets.ensure('pocus');
   navigate('pocus');
   PocusCourse.open(0);
 });
 await p.waitForSelector('.pocus-module .pocus-lead');
 await p.waitForSelector('#nota-atalho-pagina');
 await p.evaluate(()=>{
   const el=document.querySelector('.pocus-module .pocus-lead');
   const no=[...el.childNodes].find(n=>n.nodeType===3&&n.nodeValue.length>15);
   const faixa=document.createRange();
   faixa.setStart(no,2);faixa.setEnd(no,Math.min(34,no.nodeValue.length));
   const sel=getSelection();sel.removeAllRanges();sel.addRange(faixa);
   document.dispatchEvent(new MouseEvent('mouseup',{bubbles:true}));
 });
 await p.waitForSelector('.nota-barra:not([hidden])');
 await p.locator('.nota-barra [data-acao="comentar"]').click();
 await p.waitForSelector('.nota-painel-entrada textarea');
 await p.locator('.nota-painel-entrada textarea').fill('POCUS teste observação específica');
 await p.locator('.nota-painel-entrada .nota-salvar').click();
 const inicial=await p.evaluate(()=>Object.entries(HIG.marcasTodas())
   .filter(([k,v])=>k.startsWith('estudo_pocus_')&&v.length));
 assert.equal(inicial.length,1);
 assert.equal(inicial[0][1][0].materia,'POCUS');
 await p.evaluate(()=>PocusCourse.open(1));
 await p.waitForSelector('.pocus-module .pocus-title');
 await p.waitForTimeout(300);
 assert.equal(await p.locator('.nota-marca').count(),0);
 await p.evaluate(()=>PocusCourse.open(0));
 await p.waitForSelector('.nota-marca');
 await p.evaluate(()=>navigate('notes'));
 await p.waitForSelector('.caderno-unificado');
 const rotulos=await p.locator('.caderno-materia h2').allTextContents();
 assert.ok(rotulos.includes('POCUS'));
 assert.match(await p.locator('.caderno-unificado').innerText(),/POCUS teste observação específica/);
 await p.locator('#caderno-estudo-0 .caderno-voltar-trecho').first().click();
 await p.waitForSelector('.nota-marca.nota-trecho-destino',{timeout:10000});
 await t.close();
});

test('páginas sem marcações permitem escrever nota geral pelo atalho próprio',async()=>{
 const t=await abrirAula(),p=t.page;
 await p.evaluate(async()=>{
   if(window.RouteAssets)await window.RouteAssets.ensure('ecg');
   navigate('ecg');
   ECGCourse.open(0);
 });
 await p.waitForSelector('.pocus-module .pocus-lead');
 await p.locator('#nota-atalho-pagina').click();
 await p.waitForSelector('.nota-caixa:not([hidden]) .nota-painel-geral-editor');
 await p.locator('.nota-painel-geral-editor').fill('Resumo ECG geral exclusivo da página');
 await p.locator('.nota-painel-salvar-geral').click();
 const dados=await p.evaluate(()=>{
   const d=JSON.parse(localStorage.getItem('master_p2_hig_v2')||'{}');
   const chaves=Object.keys(d.pages||{}).filter(k=>k.startsWith('estudo_ecg_'));
   const keys=Object.keys(d.paginasEstudo||{}).filter(k=>k.startsWith('estudo_ecg_'));
   return {keys,valor:keys.length?d.notes?.[keys[0]]:null};
 });
 assert.equal(dados.keys.length,1);
 assert.equal(dados.valor,'Resumo ECG geral exclusivo da página');
 await p.evaluate(()=>navigate('notes'));
 await p.waitForSelector('.caderno-unificado');
 assert.ok((await p.locator('.caderno-materia h2').allTextContents()).includes('ECG'));
 await t.close();
});

test('seleção de botões e alternativas interativas não recebe marca-texto',async()=>{
 const t=await abrirAula(),p=t.page;
 await p.evaluate(async()=>{if(window.RouteAssets)await window.RouteAssets.ensure('pocus');navigate('pocus');PocusCourse.open(0)});
 await p.waitForSelector('.pocus-module');
 await p.evaluate(()=>{
   const b=document.querySelector('.pocus-pager button');
   const no=[...b.childNodes].find(n=>n.nodeType===3&&n.nodeValue.length>5);
   const faixa=document.createRange();faixa.setStart(no,0);faixa.setEnd(no,Math.min(10,no.nodeValue.length));
   const sel=getSelection();sel.removeAllRanges();sel.addRange(faixa);
   document.dispatchEvent(new MouseEvent('mouseup',{bubbles:true}));
 });
 await p.waitForTimeout(200);
 assert.equal(await p.locator('.nota-barra:not([hidden])').count(),0);
 await t.close();
});


test('excluir nota de P1 no caderno central preserva P2 e Cirurgia',async()=>{
 const t=await abrirAula(),p=t.page;
 await p.evaluate(()=>{
   P1.saveExternalNote('p1dm_0','Nota isolada da P1 para excluir');
   CIR.saveExternalNote('ciraa_0','Nota cirúrgica preservada');
   HIG.saveNote('neuro1_0','Nota clínica preservada');
   navigate('notes');
 });
 const p1corpo=p.locator('.caderno-unificado .caderno-aula-corpo[data-materia="p1"][data-chave="p1dm_0"]');
 await p1corpo.locator('xpath=..').locator('summary').first().click();
 await p1corpo.waitFor({state:'visible'});
 p.once('dialog',d=>d.accept());
 await p.locator('.caderno-aula-corpo[data-materia="p1"][data-chave="p1dm_0"] .caderno-excluir-nota').click();
 const atual=await p.evaluate(()=>{
   const p1=JSON.parse(localStorage.getItem('master_p1_lucas_v4')||'{}');
   const cir=JSON.parse(localStorage.getItem('master_cir_lucas_v1')||'{}');
   const ux=JSON.parse(localStorage.getItem('master_p2_hig_v2')||'{}');
   return {p1:p1.notes?.p1dm_0,cir:cir.notes?.ciraa_0,p2:ux.notes?.neuro1_0};
 });
 assert.equal(atual.p1,'');
 assert.equal(atual.cir,'Nota cirúrgica preservada');
 assert.equal(atual.p2,'Nota clínica preservada');
 assert.equal(await p.locator('.caderno-aula-corpo[data-materia="p1"][data-chave="p1dm_0"]').count(),0);
 await t.close();
});

test('excluir destaque no caderno lateral pede confirmação e remove somente a marca escolhida',async()=>{
 const t=await abrirAula(),p=t.page;
 await p.evaluate(()=>{
   HIG.marcaAdd('neuro1_0',{id:'remover-unico',texto:'Primeira citação',cor:'amarelo',comentario:'Teste a apagar'});
   HIG.marcaAdd('neuro1_0',{id:'preservar-unico',texto:'Segunda citação',cor:'verde',comentario:'Manter'});
   HIG.saveNote('neuro1_0','Aula preservada');
   CadernoUnificado.abrirPainel();
 });
 await p.locator('#caderno-painel .caderno-painel-cartao[data-marca-id="remover-unico"]').waitFor();
 p.once('dialog',d=>d.dismiss());
 await p.locator('#caderno-painel .caderno-painel-cartao[data-marca-id="remover-unico"] .caderno-painel-excluir').click();
 assert.equal(await p.locator('#caderno-painel .caderno-painel-cartao[data-marca-id="remover-unico"]').count(),1);
 p.once('dialog',d=>d.accept());
 await p.locator('#caderno-painel .caderno-painel-cartao[data-marca-id="remover-unico"] .caderno-painel-excluir').click();
 assert.equal(await p.locator('#caderno-painel .caderno-painel-cartao[data-marca-id="remover-unico"]').count(),0);
 const rest=await p.evaluate(()=>{
   const d=JSON.parse(localStorage.getItem('master_p2_hig_v2')||'{}');
   return {ids:(d.marcas?.neuro1_0||[]).map(m=>m.id),nota:d.notes?.neuro1_0};
 });
 assert.deepEqual(rest.ids,['preservar-unico']);
 assert.equal(rest.nota,'Aula preservada');
 await t.close();
});

test('a nota geral também pode ser excluída do painel de comentários da aula',async()=>{
 const t=await abrirAula(),p=t.page;
 await p.evaluate(async()=>{
   if(window.RouteAssets)await RouteAssets.ensure('ecg');
   navigate('ecg');
   ECGCourse.open(0);
 });
 await p.waitForSelector('#nota-atalho-pagina');
 await p.locator('#nota-atalho-pagina').click();
 await p.locator('.nota-painel-geral-editor').fill('Nota temporária de ECG');
 await p.locator('.nota-painel-salvar-geral').click();
 p.once('dialog',d=>d.accept());
 await p.locator('.nota-painel-apagar-geral').click();
 const info=await p.evaluate(()=>{
   const key=document.querySelector('.nota-caixa')?.dataset.aula;
   const d=JSON.parse(localStorage.getItem('master_p2_hig_v2')||'{}');
   return {key,valor:d.notes?.[key]};
 });
 assert.ok(info.key?.startsWith('estudo_ecg_'));
 assert.equal(info.valor,'');
 assert.equal(await p.locator('.nota-painel-geral-editor').inputValue(),'');
 await t.close();
});


test('nota de ECG também é excluída pelo caderno central sem alterar outra página',async()=>{
 const t=await abrirAula(),p=t.page;
 await p.evaluate(async()=>{
   if(window.RouteAssets)await RouteAssets.ensure('ecg');
   navigate('ecg');ECGCourse.open(0);
 });
 await p.waitForSelector('#nota-atalho-pagina');
 await p.locator('#nota-atalho-pagina').click();
 await p.locator('.nota-painel-geral-editor').fill('Apagar via caderno central');
 await p.locator('.nota-painel-salvar-geral').click();
 const key=await p.locator('.nota-caixa').getAttribute('data-aula');
 await p.evaluate(()=>navigate('notes'));
 await p.waitForSelector('.caderno-unificado');
 const card=p.locator('.caderno-aula-corpo[data-materia="estudo"][data-chave="'+key+'"]');
 await card.locator('xpath=..').locator('summary').first().click();
 await card.waitFor({state:'visible'});
 p.once('dialog',d=>d.accept());
 await card.locator('.caderno-excluir-nota').click();
 const value=await p.evaluate(k=>JSON.parse(localStorage.getItem('master_p2_hig_v2')||'{}').notes?.[k],key);
 assert.equal(value,'');
 assert.equal(await p.locator('.caderno-aula-corpo[data-chave="'+key+'"]').count(),0);
 await t.close();
});
