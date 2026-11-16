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
 const context=await browser.newContext({viewport:{width,height:900},timezoneId:'America/Sao_Paulo',isMobile:width<800,hasTouch:width<800});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 await page.goto(`${base}/${APP}/index.html`);
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 await page.waitForFunction(()=>typeof FocusTimer!=='undefined'&&FocusTimer.status().minutes,null,{timeout:10000});
 return {page,errors,close:async()=>{await context.close();assert.deepEqual(errors,[]);}};
}
const semear=(page,padrao)=>page.evaluate(padrao=>{
 const dias={},hoje=new Date();
 padrao.forEach((min,i)=>{const d=new Date(hoje);d.setDate(d.getDate()-(padrao.length-1-i));
  const k=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  if(min)dias[k]={ms:min*60000,completed:Math.floor(min/25),breakMs:min*12000,breaks:Math.floor(min/25)};});
 HIG.saveFocus({...FocusTimer.status(),days:dias});FocusTimer.reload();
},padrao);

test('o fim do bloco abre um aviso na tela, com a pergunta e saída fácil',async()=>{
 for(const width of [390,1280]){
  const t=await abrir(width),p=t.page;
  assert.equal(await p.locator('#focus-end').count(),0,'aviso existe antes da hora');
  await p.evaluate(()=>FocusTimer.avisarFim('foco'));
  await p.waitForSelector('#focus-end:not([hidden])',{timeout:5000});
  const card=await p.locator('#focus-end').evaluate(el=>({
   pergunta:el.querySelector('[data-focus-end-ask]').textContent,
   titulo:el.querySelector('[data-focus-end-title]').textContent,
   principal:el.querySelector('[data-focus-end-main]').textContent,
   alternativa:el.querySelector('[data-focus-end-alt]').textContent,
   chips:[...el.querySelectorAll('.focus-end-chip')].map(c=>c.textContent),
   dentroDaTela:el.querySelector('.focus-end-card').getBoundingClientRect().bottom<=innerHeight+1,
   alvoFechar:Math.min(...[...el.querySelectorAll('button')].map(bt=>Math.min(bt.getBoundingClientRect().width,bt.getBoundingClientRect().height)))}));
  assert.equal(card.pergunta,'Hora do descanso ou vai continuar estudando?');
  assert.ok(card.titulo.length>8,'título vazio');
  assert.deepEqual(card.chips,['3 min','5 min','10 min','15 min']);
  assert.match(card.principal,/^Descansar \d+ min$/);
  assert.match(card.alternativa,/^Continuar estudando \d+ min$/);
  assert.ok(card.dentroDaTela,`aviso corta na tela de ${width}px`);
  assert.ok(card.alvoFechar>=34,`botão pequeno demais: ${card.alvoFechar}`);
  // Esc fecha; o X também.
  await p.keyboard.press('Escape');
  await p.waitForFunction(()=>document.getElementById('focus-end').hidden,null,{timeout:4000});
  await p.evaluate(()=>FocusTimer.avisarFim('foco'));
  await p.waitForSelector('#focus-end:not([hidden])');
  await p.click('[data-focus-end-close]');
  await p.waitForFunction(()=>document.getElementById('focus-end').hidden,null,{timeout:4000});
  await t.close();
 }
});

test('a mensagem muda conforme os blocos do dia e o tipo de ciclo',async()=>{
 const t=await abrir(),p=t.page;
 await semear(p,[0,0,0,0,0,0,25]);
 await p.evaluate(()=>FocusTimer.avisarFim('foco'));
 const primeiro=await p.locator('[data-focus-end-detail]').textContent();
 await semear(p,[0,0,0,0,0,0,150]);
 await p.evaluate(()=>FocusTimer.avisarFim('foco'));
 const cheio=await p.locator('[data-focus-end-detail]').textContent();
 assert.notEqual(primeiro,cheio,'mensagem não muda com a quantidade de blocos');
 await p.evaluate(()=>FocusTimer.avisarFim('curto'));
 const pausa=await p.locator('#focus-end').evaluate(el=>({
  kicker:el.querySelector('[data-focus-end-kicker]').textContent,
  pergunta:el.querySelector('[data-focus-end-ask]').textContent,
  principal:el.querySelector('[data-focus-end-main]').textContent}));
 assert.equal(pausa.kicker,'Descanso concluído');
 assert.equal(pausa.pergunta,'Voltar ao estudo ou esticar a pausa?');
 assert.match(pausa.principal,/^Estudar \d+ min$/);
 await t.close();
});

test('o descanso é escolhido no próprio aviso e conta separado do foco',async()=>{
 const t=await abrir(),p=t.page;
 await p.evaluate(()=>FocusTimer.avisarFim('foco'));
 await p.waitForSelector('#focus-end:not([hidden])');
 await p.click('.focus-end-chip[data-focus-break="15"]');
 await p.waitForFunction(()=>FocusTimer.status().breakMinutes===15,null,{timeout:4000});
 assert.equal(await p.locator('[data-focus-end-main]').textContent(),'Descansar 15 min');
 assert.equal(await p.evaluate(()=>document.querySelector('.focus-end-chip[data-focus-break="15"]').getAttribute('aria-pressed')),'true');

 // Um descanso curto rodando credita em breakMs, não no tempo de foco.
 const antes=await p.evaluate(()=>{const d=FocusTimer.status().days;const hoje=Object.values(d)[0]||{};return {ms:hoje.ms||0,breakMs:hoje.breakMs||0}});
 await p.evaluate(()=>{FocusTimer.pause();HIG.saveFocus({...FocusTimer.status(),mode:'curto',remainingMs:4000});FocusTimer.reload();});
 await p.evaluate(()=>FocusTimer.toggle());
 await p.waitForTimeout(2600);
 await p.evaluate(()=>FocusTimer.pause());
 const depois=await p.evaluate(()=>{const d=FocusTimer.status().days;const hoje=Object.values(d).pop()||{};return {ms:hoje.ms||0,breakMs:hoje.breakMs||0}});
 assert.ok(depois.breakMs>antes.breakMs,'tempo de descanso não foi registrado');
 assert.equal(depois.ms,antes.ms,'descanso entrou como tempo de foco');
 await t.close();
});

test('o relatório mostra barras por dia, frequência por dia da semana e tabela',async()=>{
 const t=await abrir(),p=t.page;
 await semear(p,[52,0,38,75,25,0,64,30,0,46,88,25,0,57]);
 await p.waitForTimeout(500);
 const r=await p.evaluate(()=>{
  const bloco=document.querySelector('.focus-history');
  const barras=[...bloco.querySelectorAll('.focus-bar')];
  return {barras:barras.length,
   comValor:barras.filter(b=>b.querySelector('.focus-bar-valor')).length,
   hoje:barras.filter(b=>b.dataset.hoje==='true').length,
   dicas:barras.filter(b=>/\d{2}\/\d{2} · \d+ min/.test(b.querySelector('.focus-bar-dica')?.textContent||'')).length,
   leitores:barras.filter(b=>b.querySelector('.sr-only')).length,
   frequencia:bloco.querySelectorAll('.focus-freq li').length,
   linhasTabela:bloco.querySelectorAll('.focus-tabela tbody tr').length,
   estatisticas:[...bloco.querySelectorAll('.focus-stats dt')].map(e=>e.textContent)};
 });
 assert.equal(r.barras,14);
 assert.equal(r.comValor,10,'dia sem estudo não pode desenhar barra');
 assert.equal(r.hoje,1);
 assert.equal(r.dicas,14,'barra sem rótulo de data e minutos');
 assert.equal(r.leitores,14,'barra sem texto para leitor de tela');
 assert.equal(r.frequencia,7);
 assert.equal(r.linhasTabela,10);
 assert.deepEqual(r.estatisticas,['Hoje','Últimos 7 dias','Sequência','Blocos concluídos']);
 await t.close();
});

test('tempos de foco, pausas e ciclo são configuráveis e sobrevivem ao recarregar',async()=>{
 const t=await abrir(),p=t.page;
 await p.evaluate(()=>HIG.openTimer());
 await p.waitForSelector('[data-focus-campo="foco"]');
 // Stepper, digitação e atalho: três formas de ajustar.
 await p.click('[data-focus-campo="foco"]+.focus-stepper-btn');
 await p.evaluate(()=>FocusTimer.ajustar('foco',4));
 await p.evaluate(()=>FocusTimer.definir('curto',8));
 await p.fill('[data-focus-campo="longo"]','20');
 await p.dispatchEvent('[data-focus-campo="longo"]','change');
 await p.evaluate(()=>FocusTimer.definir('rodada',3));
 let s=await p.evaluate(()=>FocusTimer.status());
 assert.equal(s.minutes,30);assert.equal(s.shortMinutes,8);assert.equal(s.longMinutes,20);assert.equal(s.rodada,3);
 assert.equal(s.remainingMs,30*60000,'bloco de foco não acompanhou o novo tempo');
 // Limites protegem de valores absurdos.
 await p.evaluate(()=>{FocusTimer.definir('foco',999);FocusTimer.definir('curto',0);});
 s=await p.evaluate(()=>FocusTimer.status());
 assert.equal(s.minutes,90);assert.equal(s.shortMinutes,1);
 await p.evaluate(()=>FocusTimer.preset('classico'));
 s=await p.evaluate(()=>FocusTimer.status());
 assert.deepEqual([s.minutes,s.shortMinutes,s.longMinutes,s.rodada],[25,5,15,4]);
 assert.equal(await p.evaluate(()=>document.querySelector('[data-focus-preset="classico"]').getAttribute('aria-pressed')),'true');
 await p.evaluate(()=>FocusTimer.preset('longo'));
 await p.reload();
 await p.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 s=await p.evaluate(()=>FocusTimer.status());
 assert.deepEqual([s.minutes,s.shortMinutes,s.longMinutes,s.rodada],[50,10,20,3],'ajustes não sobreviveram ao recarregar');
 await t.close();
});

test('a pausa longa chega depois do número de blocos configurado',async()=>{
 const t=await abrir(),p=t.page;
 await p.evaluate(()=>{FocusTimer.definir('rodada',2);FocusTimer.definir('curto',4);FocusTimer.definir('longo',12);});
 const terminarBloco=()=>p.evaluate(async()=>{
  FocusTimer.pause();
  HIG.saveFocus({...FocusTimer.status(),mode:'foco',remainingMs:800});
  FocusTimer.reload();await FocusTimer.toggle();
  await new Promise(r=>setTimeout(r,1400));
 });
 await terminarBloco();
 let s=await p.evaluate(()=>FocusTimer.status());
 assert.equal(s.mode,'curto','primeiro bloco deveria levar à pausa curta');
 assert.equal(s.remainingMs,4*60000);
 assert.equal(s.feitos,1);
 assert.equal(await p.locator('[data-focus-end-main]').textContent(),'Descansar 4 min');
 await p.evaluate(()=>FocusTimer.fecharFim());
 await terminarBloco();
 s=await p.evaluate(()=>FocusTimer.status());
 assert.equal(s.mode,'longo','segundo bloco deveria abrir a pausa longa');
 assert.equal(s.remainingMs,12*60000);
 assert.equal(await p.locator('[data-focus-end-main]').textContent(),'Pausa longa de 12 min');
 // Terminada a pausa longa, a contagem recomeça.
 await p.evaluate(async()=>{
  FocusTimer.fecharFim();FocusTimer.pause();
  HIG.saveFocus({...FocusTimer.status(),mode:'longo',remainingMs:800});
  FocusTimer.reload();await FocusTimer.toggle();
  await new Promise(r=>setTimeout(r,1400));
 });
 s=await p.evaluate(()=>FocusTimer.status());
 assert.equal(s.mode,'foco');assert.equal(s.feitos,0,'ciclo não reiniciou após a pausa longa');
 await t.close();
});

test('etapas podem ser trocadas e puladas pelo painel',async()=>{
 const t=await abrir(),p=t.page;
 await p.evaluate(()=>HIG.openTimer());
 await p.click('[data-focus-mode-tab="longo"]');
 let s=await p.evaluate(()=>FocusTimer.status());
 assert.equal(s.mode,'longo');assert.equal(s.remainingMs,15*60000);
 assert.equal(await p.evaluate(()=>document.querySelector('[data-focus-mode-tab="longo"]').getAttribute('aria-pressed')),'true');
 await p.evaluate(()=>FocusTimer.pular());
 s=await p.evaluate(()=>FocusTimer.status());
 assert.equal(s.mode,'foco','pular a pausa longa volta ao foco');
 await p.evaluate(()=>FocusTimer.pular());
 s=await p.evaluate(()=>FocusTimer.status());
 assert.equal(s.mode,'curto');
 assert.equal(await p.locator('[data-focus-dots] .focus-ponto').count(),4);
 await t.close();
});
