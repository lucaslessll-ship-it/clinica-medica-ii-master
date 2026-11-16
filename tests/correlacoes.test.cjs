const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
let browser,server,base;
before(async()=>{
 server=http.createServer(async(req,res)=>{try{const file=path.join(process.cwd(),decodeURIComponent(new URL(req.url,'http://local').pathname));res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.json')?'application/json':'text/html');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();await new Promise(resolve=>server.close(resolve));});
function mock(){
 const user={id:'correl-test',email:'correl@example.test',user_metadata:{full_name:'Correlações'}};
 localStorage.setItem('master_auth_local_owner',user.id);
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user}}}),getUser:async()=>({data:{user}}),onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(){const query={select(){return query},order(){return query},contains(){return query},eq(){return query},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null}),then(resolve){resolve({data:[],error:null});}};return query;}})};
}
async function open(width=390){
 const context=await browser.newContext({viewport:{width,height:900},timezoneId:'America/Sao_Paulo'});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:`(${mock.toString()})()`}));
 await page.goto(base+'/MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/index.html');
 await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden);
 return {page,close:async()=>{assert.deepEqual(errors,[]);await context.close();}};
}

test('glossário carregado e sem termo genérico',async()=>{
 const t=await open(),p=t.page;
 assert.ok(await p.evaluate(()=>Correlacoes.entries())>=40);
 const genericos=await p.evaluate(()=>Correlacoes.detect('A tomografia com contraste e o ultrassom do exame de imagem'));
 assert.deepEqual(genericos,[]);
 const reais=await p.evaluate(()=>Correlacoes.detect('Havia pneumoperitônio e níveis hidroaéreos no FAST'));
 assert.ok(reais.includes('pneumoperitônio'));
 assert.ok(reais.includes('FAST'));
 await t.close();
});

test('sigla só casa em caixa alta',async()=>{
 const t=await open(),p=t.page;
 assert.ok((await p.evaluate(()=>Correlacoes.detect('havia BAV de segundo grau'))).length>0);
 assert.deepEqual(await p.evaluate(()=>Correlacoes.detect('o paciente bav sem nada')),[]);
 await t.close();
});

test('aula de Cirurgia recebe marcações dentro do limite e fora das zonas proibidas',async()=>{
 const t=await open(),p=t.page;
 await p.evaluate(()=>{CIR.openTopic('cirrad',2);});
 await p.waitForFunction(()=>document.querySelectorAll('.correl-term').length>0,null,{timeout:8000});
 const total=await p.locator('.correl-term').count();
 assert.ok(total>0&&total<=6,'marcações dentro do teto: '+total);
 assert.equal(await p.locator('.pocus-q .correl-term, .deep-cases .correl-term, .deep-exam .correl-term, .deep-pretest .correl-term, table .correl-term, h1 .correl-term, h3 .correl-term, h4 .correl-term, .deep-figure .correl-term').count(),0);
 assert.equal(await p.locator('.correl-term .correl-term, button .correl-term').count(),0);
 await t.close();
});

test('cartão abre, explica e leva à aula dona',async()=>{
 const t=await open(),p=t.page;
 await p.evaluate(()=>{CIR.openTopic('cirrad',2);});
 await p.waitForFunction(()=>document.querySelectorAll('.correl-term').length>0,null,{timeout:8000});
 await p.locator('.correl-term').first().click();
 await p.waitForSelector('.correl-dialog[open]');
 assert.ok((await p.locator('.correl-what').textContent()).length>10);
 assert.ok((await p.locator('.correl-why').textContent()).length>10);
 await p.locator('[data-correl-go]').click();
 await p.waitForFunction(()=>['#rad','#pocus','#ecg','#hemo','#atb'].includes(location.hash)||location.hash.startsWith('#topic/'));
 assert.ok(await p.locator('.pocus-module, .lesson-sections').count()>0);
 await t.close();
});

test('curso dono não linka o próprio termo',async()=>{
 const t=await open(),p=t.page;
 await p.evaluate(()=>{navigate('rad');RadCourse.open(4);});
 await p.waitForTimeout(600);
 const donos=await p.evaluate(()=>[...document.querySelectorAll('.correl-term')].map(b=>b.title));
 assert.equal(donos.filter(x=>/pneumoperitônio|níveis hidroaéreos/i.test(x)).length,0);
 await t.close();
});

test('bloco de conexões aparece e o interruptor limpa o texto',async()=>{
 const t=await open(),p=t.page;
 await p.evaluate(()=>{CIR.openTopic('cirrad',2);});
 await p.waitForFunction(()=>document.querySelector('.correl-guide'),null,{timeout:8000});
 assert.ok(await p.locator('.correl-guide-list > li').count()>=1);
 await p.locator('[data-correl-toggle]').click();
 await p.waitForFunction(()=>document.querySelectorAll('.correl-term').length===0,null,{timeout:8000});
 assert.ok(await p.locator('.correl-guide').count()>0,'bloco permanece como ponto de religar');
 await p.locator('[data-correl-toggle]').click();
 await p.waitForFunction(()=>document.querySelectorAll('.correl-term').length>0,null,{timeout:8000});
 await t.close();
});
