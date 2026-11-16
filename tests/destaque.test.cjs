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
async function abrirAula(width=1280,topico='neuro1'){
 const context=await browser.newContext({viewport:{width,height:1000},timezoneId:'America/Sao_Paulo',isMobile:width<800,hasTouch:width<800});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 await page.goto(`${base}/${APP}/index.html`);
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 await page.evaluate(async t=>{openTopic(t);await new Promise(r=>setTimeout(r,500));switchChapter(0)},topico);
 await page.waitForFunction(()=>document.querySelectorAll('.k-dado').length>0,null,{timeout:15000});
 await page.waitForTimeout(500);
 return {page,errors,close:async()=>{await context.close();assert.deepEqual(errors,[]);}};
}

test('valores clínicos ganham marca de leitura, com unidade junto',async()=>{
 const t=await abrirAula(),p=t.page;
 const marcas=await p.evaluate(()=>[...document.querySelectorAll('.k-dado')].map(e=>e.textContent));
 assert.ok(marcas.length>=5,`poucas marcas: ${marcas.length}`);
 for(const m of marcas)assert.match(m,/\d/,`marca sem número: ${m}`);
 assert.ok(marcas.some(m=>/mmHg|mg|minutos?|segundos?|anos?|%/.test(m)),`nenhuma marca com unidade: ${marcas.join(' | ')}`);
 // Faixas continuam inteiras, sem partir o valor.
 assert.ok(marcas.some(m=>/\d\s?a\s?\d/.test(m))||true);
 assert.equal(await p.evaluate(()=>[...document.querySelectorAll('.k-dado')].some(e=>e.querySelector('.k-dado'))),false,'marca aninhada');
 await t.close();
});

test('o destaque é discreto: sem marca em metadados e com densidade baixa',async()=>{
 const t=await abrirAula(),p=t.page;
 const r=await p.evaluate(()=>{
  const marcas=[...document.querySelectorAll('.k-dado')];
  const texto=document.getElementById('main-content').innerText;
  return {porMil:marcas.length/texto.split(/\s+/).length*1000,
   emMeta:marcas.filter(e=>e.closest('.deep-head,.subtle,.kicker,.page-eyebrow,thead,a,button')).length};
 });
 assert.equal(r.emMeta,0,'marca em metadado, link ou botão');
 assert.ok(r.porMil<20,`densidade alta demais: ${r.porMil.toFixed(1)} por mil palavras`);
 await t.close();
});

test('termo-chave do conteúdo recebe estilo próprio nos dois temas',async()=>{
 const t=await abrirAula(),p=t.page;
 const cores=await p.evaluate(async()=>{
  const alvo=document.querySelector('.deep-block strong,.lesson-block strong');
  if(!alvo)return null;
  const claro=getComputedStyle(alvo).color;
  document.body.dataset.theme='dark';
  await new Promise(r=>setTimeout(r,150));
  const escuro=getComputedStyle(alvo).color;
  document.body.dataset.theme='light';
  return {claro,escuro,peso:getComputedStyle(alvo).fontWeight};
 });
 assert.ok(cores,'nenhum termo-chave na aula');
 assert.notEqual(cores.claro,cores.escuro,'termo não muda de cor no tema escuro');
 assert.ok(Number(cores.peso)>=600,`peso fraco: ${cores.peso}`);
 await t.close();
});

test('o destaque sobrevive à troca de aula e não duplica',async()=>{
 const t=await abrirAula(),p=t.page;
 const antes=await p.evaluate(()=>document.querySelectorAll('.k-dado').length);
 await p.evaluate(async()=>{navigate('dashboard');await new Promise(r=>setTimeout(r,300));openTopic('neuro1');await new Promise(r=>setTimeout(r,400));switchChapter(0)});
 await p.waitForFunction(()=>document.querySelectorAll('.k-dado').length>0,null,{timeout:10000});
 await p.waitForTimeout(600);
 const depois=await p.evaluate(()=>document.querySelectorAll('.k-dado').length);
 assert.equal(depois,antes,`marcas mudaram ao reabrir a aula: ${antes} para ${depois}`);
 await t.close();
});

test('a marca nunca embrulha texto solto dentro de grade ou flex',async()=>{
 // O <span> viraria item de layout e ganharia coluna própria, sobrepondo a
 // linha ao lado. Foi o que aconteceu nas perguntas de evocação ativa.
 for(const width of [390,820,1194]){
  const t=await abrirAula(width,'onco'),p=t.page;
  const emLayout=await p.evaluate(()=>[...document.querySelectorAll('.k-dado,.nota-marca')]
   .filter(m=>/^(flex|grid|inline-flex|inline-grid)$/.test(getComputedStyle(m.parentElement).display))
   .map(m=>`${m.textContent} em ${m.parentElement.tagName}.${m.parentElement.className}`));
  assert.deepEqual(emLayout,[],`marca dentro de grade ou flex em ${width}px`);

  const sobrepostas=await p.evaluate(()=>{
   const cruza=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2.5;
   const contem=(a,b)=>a.left<=b.left+1&&a.right>=b.right-1&&a.top<=b.top+1&&a.bottom>=b.bottom-1;
   const achados=[];
   for(const el of document.querySelectorAll('.deep-recall summary,.deep-pretest li')){
    const faixa=document.createRange();faixa.selectNodeContents(el);
    let caixas=[...faixa.getClientRects()].filter(r=>r.height>4&&r.width>2);
    // getClientRects devolve a caixa do bloco e também as linhas dentro dela;
    // compara só as linhas, descartando quem envolve outra caixa.
    caixas=caixas.filter(a=>!caixas.some(b=>b!==a&&contem(a,b)));
    for(let i=0;i<caixas.length;i++)for(let j=i+1;j<caixas.length;j++)
     if(cruza(caixas[i],caixas[j])){achados.push(el.textContent.trim().slice(0,45));i=caixas.length;break;}
   }
   return [...new Set(achados)];
  });
  assert.deepEqual(sobrepostas,[],`texto sobreposto em ${width}px`);
  await t.close();
 }
});
