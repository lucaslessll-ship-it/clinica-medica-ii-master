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
// Mock que conta as idas ao banco, para provar que a gravação é automática e econômica.
function mock(){
 const user={id:'autosave',email:'autosave@example.test',user_metadata:{full_name:'Salvamento'}};
 window.__db={select:0,upsert:0,rows:{}};
 localStorage.setItem('master_auth_local_owner',user.id);
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user,access_token:'test-jwt'}}}),getUser:async()=>({data:{user}}),onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},
  from(table){const q={
   select(){if(table==='master_progress')window.__db.select++;return q},
   eq(){return table==='master_progress'?Promise.resolve({data:Object.entries(window.__db.rows).map(([storage_key,payload])=>({storage_key,payload})),error:null}):q},
   maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),
   insert:async()=>({error:null}),
   async upsert(row){window.__db.upsert++;window.__db.rows[row.storage_key]=row.payload;return {error:null}}};return q}})};
}
const APP='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
async function open(){
 const context=await browser.newContext({viewport:{width:1280,height:900},timezoneId:'America/Sao_Paulo'});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock})()`}));
 await page.goto(`${base}/${APP}/index.html`);
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
 await page.waitForTimeout(900);
 await page.evaluate(()=>{window.__avisos=[];const el=document.getElementById('toast');
  new MutationObserver(()=>{const t=el.textContent.trim();if(t)window.__avisos.push(t)}).observe(el,{childList:true,subtree:true,characterData:true});});
 return {page,errors,close:async()=>{await context.close();assert.deepEqual(errors,[]);}};
}
const envios=page=>page.evaluate(()=>window.__db.upsert);

test('cada marcação é gravada na conta sem pedir nada ao usuário',async()=>{
 const t=await open(),p=t.page;
 const antes=await envios(p);
 await p.evaluate(()=>HIG.bookmark('neuro1_0'));
 await p.waitForFunction(n=>window.__db.upsert>n,antes,{timeout:5000});
 assert.equal(await p.evaluate(()=>!!JSON.parse(localStorage.getItem('master_p2_hig_v2')).bookmarks.neuro1_0),true);
 assert.equal(await p.evaluate(()=>!!window.__db.rows.master_p2_hig_v2),true);

 // Responder uma questão guarda o desempenho na conta.
 const antesQuestao=await envios(p);
 await p.evaluate(async()=>{startPractice('neuro1');await new Promise(r=>setTimeout(r,400));choosePractice(0);await new Promise(r=>setTimeout(r,200));submitPractice();});
 await p.waitForFunction(n=>window.__db.upsert>n,antesQuestao,{timeout:5000});
 assert.equal(await p.evaluate(()=>Object.keys(JSON.parse(localStorage.getItem('master_p2_lucas_v1')).results||{}).length>0),true);
 assert.equal(await p.evaluate(()=>!!window.__db.rows.master_p2_lucas_v1),true);
 await t.close();
});

test('rajada de marcações e navegação não sobrecarregam a rede',async()=>{
 const t=await open(),p=t.page;
 await p.evaluate(()=>HIG.bookmark('neuro1_0'));
 await p.waitForTimeout(1500);
 const base1=await envios(p);
 await p.evaluate(()=>{for(let i=0;i<12;i++)HIG.bookmark('neuro1_'+(i%3))});
 await p.waitForTimeout(1800);
 const depoisRajada=await envios(p);
 assert.ok(depoisRajada-base1<=2,`12 marcações geraram ${depoisRajada-base1} envios`);

 // Navegar regrava preferências idênticas; sem mudança real, nada vai à rede.
 await p.evaluate(async()=>{for(const r of ['dashboard','topics','today','notes','dashboard']){navigate(r);await new Promise(x=>setTimeout(x,120))}});
 await p.waitForTimeout(1600);
 assert.equal(await envios(p),depoisRajada,'navegação gerou envio desnecessário');
 await t.close();
});

test('a sincronização não interrompe o estudo com mensagens',async()=>{
 const t=await open(),p=t.page;
 await p.evaluate(async()=>{startPractice('neuro1');await new Promise(r=>setTimeout(r,400));choosePractice(0);await new Promise(r=>setTimeout(r,200));submitPractice();});
 await p.waitForTimeout(1800);
 const avisos=await p.evaluate(()=>window.__avisos);
 assert.equal(avisos.filter(a=>/sincroniz|salvo|servidor|nuvem/i.test(a)).length,0,`avisos de sincronização visíveis: ${avisos.join(' | ')}`);
 assert.equal(await p.evaluate(()=>document.getElementById('master-sync-status').textContent.trim()),'');
 await t.close();
});
