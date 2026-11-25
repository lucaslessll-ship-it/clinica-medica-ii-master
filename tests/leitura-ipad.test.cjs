const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const APP='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
let browser,server,base;
before(async()=>{
 await fs.mkdir('work',{recursive:true});
 server=http.createServer(async(req,res)=>{try{const f=path.join(process.cwd(),decodeURIComponent(new URL(req.url,'http://local').pathname));res.setHeader('Content-Type',f.endsWith('.js')?'text/javascript':f.endsWith('.css')?'text/css':f.endsWith('.woff2')?'font/woff2':'text/html');res.end(await fs.readFile(f));}catch{res.writeHead(404);res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();if(server)await new Promise(r=>server.close(r));});
function mock(){const user={id:'ipad-reading-fixture',email:'ipad@example.test',user_metadata:{master_welcome_tour_v1:true,full_name:'Leitura'}};localStorage.setItem('master_auth_local_owner',user.id);window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user}}}),getUser:async()=>({data:{user}}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}})},from(){const q={select(){return q},eq(){return q},order(){return q},contains(){return q},range:async()=>({data:[],error:null}),maybeSingle:async()=>({data:{policy_version:'2026-11-08'}}),upsert:async()=>({error:null}),then(r){r({data:[],error:null})}};return q}})}};
const frames=page=>page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(r)))));
async function open(width,size='normal'){
 const context=await browser.newContext({viewport:{width,height:1100},isMobile:true,hasTouch:true,reducedMotion:'reduce',timezoneId:'America/Sao_Paulo'});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',r=>r.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 await page.goto(`${base}/${APP}/index.html`);await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 await page.evaluate(size=>{document.body.dataset.textSize=size;openTopic('onco');ui.chapter=0;render();},size);
 await page.locator('.reading-outline').waitFor();await page.evaluate(()=>document.fonts.ready);await frames(page);
 return {page,close:async()=>{await context.close();assert.deepEqual(errors,[]);}};
}
test('neutropenia no iPad mantém índice estável e não recria texto durante a rolagem',async()=>{
 for(const width of [768,820,1024])for(const size of ['normal','xxlarge']){
  const t=await open(width,size),p=t.page;
  const result=await p.evaluate(async()=>{
   const outline=document.querySelector('.reading-outline'),heights=[];let replaced=0;
   const observer=new MutationObserver(records=>replaced+=records.length);observer.observe(outline,{childList:true,subtree:true});
   const headings=[...document.querySelectorAll('.deep-block>h4,.deep-head h3')];
   for(const h of headings){window.scrollTo({top:h.getBoundingClientRect().top+scrollY-100,behavior:'instant'});await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));heights.push(outline.getBoundingClientRect().height);}
   const y=scrollY;
   for(let i=0;i<8;i++){dispatchEvent(new Event('scroll'));await new Promise(r=>requestAnimationFrame(r));}
   observer.disconnect();return {heights,replaced,drift:scrollY-y,progress:Number(outline.querySelector('[role=progressbar]').getAttribute('aria-valuenow'))};
  });
  assert.ok(Math.max(...result.heights)-Math.min(...result.heights)<1,`índice muda de altura em ${width}/${size}: ${result.heights}`);
  assert.equal(result.replaced,0,`scroll recria nós e dispara scans da aula em ${width}/${size}`);
  assert.ok(Math.abs(result.drift)<=1,`rolagem mudou sem novo comando em ${width}/${size}`);
  assert.ok(result.progress>=0&&result.progress<=100);await t.close();
 }
});
test('neutropenia ampliada preserva texto de evocação, pré-teste e tabelas em dimensões de iPad',async()=>{
 for(const width of [768,820,1024]){
  const t=await open(width,'xxlarge'),p=t.page;
  await p.locator('.deep-recall').first().locator('summary').click();await p.locator('.deep-rate button').first().click();await frames(p);
  const result=await p.evaluate(()=>{
   const intersections=[];
   for(const summary of document.querySelectorAll('.deep-recall>summary')){
    const els=[...summary.querySelectorAll('.deep-recall-num,.deep-recall-q,.deep-recall-due')].filter(el=>el.getClientRects().length);
    for(let i=0;i<els.length;i++)for(let j=i+1;j<els.length;j++){
     const a=els[i].getBoundingClientRect(),b=els[j].getBoundingClientRect();if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1)intersections.push([els[i].className,els[j].className]);
    }
   }
   const clipped=[...document.querySelectorAll('.deep-recall-q,.deep-pre-q,.deep-pre-btns button')].filter(el=>el.scrollWidth>el.clientWidth+1).map(el=>el.className||el.textContent);
   const tables=[...document.querySelectorAll('.deep-table')].map(table=>({fit:table.dataset.fit,overflow:table.parentElement.scrollWidth>table.parentElement.clientWidth+1}));
   return {intersections,clipped,tables,pageOverflow:document.scrollingElement.scrollWidth>document.scrollingElement.clientWidth+1};
  });
  assert.deepEqual(result.intersections,[],`evocação sobreposta em ${width}px`);assert.deepEqual(result.clipped,[],`texto recortado em ${width}px`);
  assert.equal(result.pageOverflow,false,`página alargada em ${width}px`);assert.ok(result.tables.length>0);assert.ok(result.tables.every(table=>!table.overflow),`tabela ultrapassa o contêiner em ${width}px`);
  await p.screenshot({path:`work/ipad-reading-${width}.png`,animations:'disabled'});await t.close();
 }
});
test('índice navega sem esconder o título e recalcula após expandir a aula',async()=>{
 const t=await open(820),p=t.page;await p.locator('.reading-outline summary').click();
 const target=p.locator('.reading-outline-links button').filter({hasText:'Estratificação de risco'});await target.click();await frames(p);
 const gap=await p.evaluate(()=>document.activeElement.getBoundingClientRect().top-document.querySelector('.reading-outline').getBoundingClientRect().bottom);
 assert.ok(gap>=-1&&gap<=64,`distância do título ao índice incorreta: ${gap}`);
 await p.locator('.deep-hy-btn').click();await frames(p);await p.locator('.deep-hy-btn').click();await frames(p);
 await p.evaluate(()=>navigate('dashboard'));assert.equal(await p.locator('.reading-outline').count(),0);await t.close();
});
