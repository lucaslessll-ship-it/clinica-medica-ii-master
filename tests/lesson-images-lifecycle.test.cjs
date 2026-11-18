const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const {chromium}=require('playwright');
const pixel='R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
let browser,source,css;
before(async()=>{
 const app=path.join(process.cwd(),'MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
 source=await fs.readFile(path.join(app,'lesson-images.js'),'utf8');
 css=(await Promise.all(['style.css','hig.css','lesson-deep.css'].map(file=>fs.readFile(path.join(app,file),'utf8')))).join('\n');
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();});
const row=caption=>({id:caption,ord:0,caption,credit:'Crédito de teste',mime:'image/gif',data:pixel});
async function open(t,options={}){
 const context=await browser.newContext({viewport:{width:320,height:740}}),page=await context.newPage(),errors=[];
 page.setDefaultTimeout(10000);page.on('pageerror',error=>errors.push(error.stack||error.message));
 await page.route('**/*',route=>route.abort());
 await page.setContent('<main id="content"></main>');
 await page.addStyleTag({content:css+'\nbody{padding:16px}.lesson-image-open{width:200px}'});
 await page.evaluate(options=>{
  const state=window.imageTest={user:{id:'conta-a'},rows:options.rows,defer:options.defer||'',pending:[],calls:[]};
  const client={from(table){
   if(table!=='lesson_images')throw new Error('Tabela de teste inesperada');
   return {select(columns){
    const uid=state.user?.id,part=columns==='keys'?'keys':'rows',rows=state.rows[uid]||[];
    const result={data:part==='keys'?(rows.length?[{keys:['aula_0']}]:[]):rows,error:null};
    const query={contains(){return query;},order(){return query;},then(resolve){
     state.calls.push({uid,part});
     if(uid==='conta-a'&&part===state.defer)state.pending.push({resolve,result});else resolve(result);
    }};return query;
   }};
  }};
  window.MASTER_AUTH={user:()=>state.user,client:()=>client};
 },{rows:{'conta-a':[row('Imagem da conta A')],'conta-b':[row('Imagem da conta B')]},...options});
 await page.addScriptTag({content:source});
 await page.evaluate(()=>{document.getElementById('content').innerHTML=LessonImages.slot('aula_0');LessonImages.scan();});
 t.after(async()=>{await context.close();assert.deepEqual(errors,[]);});
 return page;
}
async function settle(page){await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));}
async function release(page){await page.evaluate(()=>imageTest.pending.splice(0).forEach(item=>item.resolve(item.result)));await settle(page);}

test('imagens raster válidas em PNG, JPEG e WebP continuam abrindo e fechando',async t=>{
 const page=await open(t,{rows:{'conta-a':[]}});
 await page.evaluate(()=>{
  document.body.dataset.theme='dark';
  const canvas=document.createElement('canvas');canvas.width=400;canvas.height=1;const ctx=canvas.getContext('2d');ctx.fillStyle='#276a61';ctx.fillRect(0,0,400,1);
  imageTest.rows['conta-a']=['image/png','image/jpeg','image/webp'].map((mime,index)=>({id:String(index),ord:index,caption:'Formato '+mime,credit:'Imagem sintética de teste',mime,data:canvas.toDataURL(mime).split(',')[1]}));
  window.dispatchEvent(new Event('master-auth-ready'));
 });
 await page.waitForSelector('.lesson-images:not([hidden]) figure');assert.equal(await page.locator('.lesson-image-open').count(),3);
 for(let index=0;index<3;index++){
  const button=page.locator('.lesson-image-open').nth(index);await button.locator('img').evaluate(img=>img.decode());assert.ok(await button.evaluate(el=>el.getBoundingClientRect().height)>=44);await button.click();
  assert.equal(await page.locator('.lesson-image-dialog').evaluate(el=>el.open),true);assert.match(await page.locator('.lesson-image-dialog p').innerText(),/Formato image\//);
  const layout=await page.locator('.lesson-image-dialog').evaluate(el=>{const rect=el.getBoundingClientRect(),style=getComputedStyle(el),probe=document.createElement('span');probe.style.position='absolute';el.appendChild(probe);probe.style.color='var(--ink)';const ink=getComputedStyle(probe).color;probe.style.color='var(--white)';const white=getComputedStyle(probe).color;probe.remove();return {fit:rect.x>=0&&rect.y>=0&&rect.right<=innerWidth+1&&rect.bottom<=innerHeight+1,color:style.color,ink,background:style.backgroundColor,white,button:el.querySelector('button').getBoundingClientRect().height};});
  assert.equal(layout.fit,true);assert.equal(layout.color,layout.ink);assert.equal(layout.background,layout.white);assert.notEqual(layout.background,'rgb(255, 255, 255)');assert.ok(layout.button>=44);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('.lesson-image-dialog').open);
 }
});

test('expiração remove imagem, legenda e diálogo e exige novo carregamento na mesma conta',async t=>{
 const page=await open(t);await page.waitForSelector('.lesson-images:not([hidden]) figure');await page.locator('.lesson-image-open').click();
 await page.evaluate(()=>{imageTest.user=null;window.dispatchEvent(new Event('master-auth-ended'));});
 assert.equal(await page.locator('.lesson-image-dialog').count(),0);assert.equal(await page.locator('.lesson-images').evaluate(el=>el.hidden),true);assert.equal(await page.locator('.lesson-images img').count(),0);assert.equal(await page.locator('.lesson-images').innerText(),'');
 const before=await page.evaluate(()=>imageTest.calls.length);
 await page.evaluate(()=>{imageTest.user={id:'conta-a'};LessonImages.scan();});await settle(page);
 assert.equal(await page.evaluate(()=>imageTest.calls.length),before);assert.equal(await page.locator('.lesson-images img').count(),0);
 await page.evaluate(()=>{imageTest.rows['conta-a'][0].caption='Legenda atualizada';window.dispatchEvent(new Event('master-auth-ready'));});
 await page.waitForFunction(()=>document.querySelector('.lesson-images figcaption')?.textContent.includes('Legenda atualizada'));
 assert.equal(await page.evaluate(()=>imageTest.calls.filter(call=>call.part==='keys').length),2);assert.equal(await page.evaluate(()=>imageTest.calls.filter(call=>call.part==='rows').length),2);
});

test('índice atrasado da conta anterior não substitui índice nem imagem da nova conta',async t=>{
 const page=await open(t,{defer:'keys'});await page.waitForFunction(()=>imageTest.pending.length===1);
 await page.evaluate(()=>{imageTest.user={id:'conta-b'};window.dispatchEvent(new Event('master-auth-ready'));});
 await page.waitForFunction(()=>document.querySelector('.lesson-images figcaption')?.textContent.includes('Imagem da conta B'));
 await release(page);assert.match(await page.locator('.lesson-images figcaption').innerText(),/Imagem da conta B/);
 assert.equal(await page.evaluate(()=>imageTest.calls.filter(call=>call.uid==='conta-a'&&call.part==='rows').length),0);
 await page.evaluate(()=>{document.getElementById('content').innerHTML=LessonImages.slot('aula_0');LessonImages.scan();});
 await page.waitForFunction(()=>document.querySelector('.lesson-images figcaption')?.textContent.includes('Imagem da conta B'));
 assert.equal(await page.evaluate(()=>imageTest.calls.filter(call=>call.uid==='conta-b'&&call.part==='keys').length),1);
});

test('imagem atrasada de uma sessão encerrada não aparece nem contamina o cache seguinte',async t=>{
 const page=await open(t,{defer:'rows'});await page.waitForFunction(()=>imageTest.pending.length===1);
 await page.evaluate(()=>{imageTest.user=null;window.dispatchEvent(new Event('master-auth-ended'));});
 assert.equal(await page.locator('.lesson-images img').count(),0);
 await page.evaluate(()=>{imageTest.user={id:'conta-b'};window.dispatchEvent(new Event('master-auth-ready'));});
 await page.waitForFunction(()=>document.querySelector('.lesson-images figcaption')?.textContent.includes('Imagem da conta B'));
 await release(page);assert.match(await page.locator('.lesson-images figcaption').innerText(),/Imagem da conta B/);
 await page.evaluate(()=>{document.getElementById('content').innerHTML=LessonImages.slot('aula_0');LessonImages.scan();});
 await page.waitForFunction(()=>document.querySelector('.lesson-images figcaption')?.textContent.includes('Imagem da conta B'));
 assert.equal(await page.evaluate(()=>imageTest.calls.filter(call=>call.uid==='conta-b'&&call.part==='rows').length),1);
});

test('resposta da sessão anterior é descartada mesmo quando a mesma conta entra novamente',async t=>{
 const page=await open(t,{defer:'rows'});await page.waitForFunction(()=>imageTest.pending.length===1);
 await page.evaluate(()=>{
  imageTest.user=null;window.dispatchEvent(new Event('master-auth-ended'));
  imageTest.rows['conta-a']=[{...imageTest.rows['conta-a'][0],caption:'Imagem da sessão nova'}];imageTest.defer='';
  imageTest.user={id:'conta-a'};window.dispatchEvent(new Event('master-auth-ready'));
 });
 await page.waitForFunction(()=>document.querySelector('.lesson-images figcaption')?.textContent.includes('Imagem da sessão nova'));
 await release(page);assert.match(await page.locator('.lesson-images figcaption').innerText(),/Imagem da sessão nova/);
 await page.evaluate(()=>{document.getElementById('content').innerHTML=LessonImages.slot('aula_0');LessonImages.scan();});
 await page.waitForFunction(()=>document.querySelector('.lesson-images figcaption')?.textContent.includes('Imagem da sessão nova'));
 assert.equal(await page.evaluate(()=>imageTest.calls.filter(call=>call.part==='rows').length),2);
});

test('metadados e base64 malformados não criam atributos ou elementos executáveis',async t=>{
 const caption='<img src=x onerror=window.payload=1>';
 const page=await open(t,{rows:{'conta-a':[
  {...row(caption)},
  {...row('Dados inválidos'),data:'AA==" onerror="window.payload=1'},
  {...row('Tipo inválido'),mime:'image/png" onerror="window.payload=1'},
  {...row('Tipo não permitido'),mime:'text/html'},
  {...row('Base64 truncado'),data:'A'}
 ]}});
 await page.waitForSelector('.lesson-images:not([hidden]) figure');assert.equal(await page.locator('.lesson-images figure').count(),1);
 assert.equal(await page.locator('.lesson-images figcaption').innerText(),caption+' Crédito de teste.');assert.equal(await page.locator('.lesson-images figcaption img,[onerror]').count(),0);assert.equal(await page.evaluate(()=>window.payload),undefined);
 await page.locator('.lesson-image-open').click();assert.equal(await page.locator('.lesson-image-dialog p').innerText(),caption);assert.equal(await page.locator('.lesson-image-dialog p img').count(),0);await page.getByRole('button',{name:'Fechar imagem',exact:true}).click();await page.waitForFunction(()=>!document.querySelector('.lesson-image-dialog').open);
});

test('curadoria por bloco filtra desenhos e contextualiza a legenda sem mudar o cache original',async t=>{
 const page=await open(t,{rows:{'conta-a':[row('Remover'),row('Fonte')],'conta-b':[]}});
 await page.evaluate(()=>{document.getElementById('content').innerHTML=LessonImages.slot('aula_0','',['Remover'],{Fonte:'Legenda contextualizada <sem HTML>'});LessonImages.scan();});
 await page.waitForFunction(()=>document.querySelector('.lesson-images figcaption')?.textContent.includes('contextualizada'));
 assert.equal(await page.locator('.lesson-images figure').count(),1);assert.match(await page.locator('.lesson-images figcaption').innerText(),/Legenda contextualizada <sem HTML>/);
 await page.locator('.lesson-image-open').click();assert.match(await page.locator('.lesson-image-dialog p').innerText(),/contextualizada/);await page.keyboard.press('Escape');
 await page.evaluate(()=>{document.getElementById('content').innerHTML=LessonImages.slot('aula_0');LessonImages.scan();});
 await page.waitForFunction(()=>document.querySelectorAll('.lesson-images figure').length===2);assert.match(await page.locator('.lesson-images figure').last().innerText(),/Fonte/);assert.doesNotMatch(await page.locator('.lesson-images').innerText(),/contextualizada/);
});

test('comparação só libera o desenho após todos os exames selecionados decodificarem, na ordem clínica',async t=>{
 const page=await open(t,{rows:{'conta-a':[row('alterado'),row('normal'),row('desenho-antigo')]}});
 await page.evaluate(()=>{
  document.getElementById('content').innerHTML='<section data-clinical-comparison="teste">'+LessonImages.slot('aula_0','',[],{}, {include:['normal','alterado'],title:'Comparação clínica'})+'<p data-clinical-status>Carregando</p><details data-clinical-schematic hidden><summary>Mapa</summary></details></section>';LessonImages.scan();
 });
 await page.waitForFunction(()=>!document.querySelector('[data-clinical-schematic]').hidden);
 assert.deepEqual(await page.locator('.lesson-images figcaption').allTextContents(),['normal Crédito de teste.','alterado Crédito de teste.']);
 assert.equal(await page.locator('[data-clinical-schematic]').getAttribute('open'),null);
 assert.equal(await page.locator('[data-clinical-status]').isVisible(),false);
 await page.locator('[data-clinical-schematic] summary').click();
 await page.evaluate(()=>{imageTest.user=null;window.dispatchEvent(new Event('master-auth-ended'));});
 assert.equal(await page.locator('[data-clinical-schematic]').isVisible(),false);assert.equal(await page.locator('[data-clinical-schematic]').getAttribute('open'),null);assert.equal(await page.locator('.lesson-images img').count(),0);
});

test('exame faltante ou com raster indecodificável não disponibiliza esquema isolado',async t=>{
 for(const rows of [[row('normal')],[row('normal'),{...row('alterado'),mime:'image/png',data:'AAAA'}]]){
  const page=await open(t,{rows:{'conta-a':rows}});
  await page.evaluate(()=>{
   document.getElementById('content').innerHTML='<section data-clinical-comparison="teste">'+LessonImages.slot('aula_0','',[],{}, {include:['normal','alterado']})+'<p data-clinical-status>Conferir conexão</p><details data-clinical-schematic hidden><summary>Mapa</summary></details></section>';LessonImages.scan();
  });
  await page.waitForSelector('.lesson-images:not([hidden]) img');await settle(page);
  assert.equal(await page.locator('[data-clinical-schematic]').isVisible(),false);assert.equal(await page.locator('[data-clinical-status]').isVisible(),true);
 }
});

test('comparações repetidas compartilham a consulta sem duplicar o download da base privada',async t=>{
 const page=await open(t,{defer:'rows'});await page.waitForFunction(()=>imageTest.pending.length===1);
 await page.evaluate(()=>{document.getElementById('content').innerHTML=Array.from({length:8},()=>LessonImages.slot('aula_0')).join('');LessonImages.scan();});await settle(page);
 assert.equal(await page.evaluate(()=>imageTest.calls.filter(c=>c.part==='rows').length),1);
 await release(page);await page.waitForFunction(()=>document.querySelectorAll('.lesson-images:not([hidden]) img').length===8);
 assert.equal(await page.evaluate(()=>imageTest.calls.filter(c=>c.part==='rows').length),1);
});

test('falha da referência pública também mantém o mapa oculto mesmo com os exames privados disponíveis',async t=>{
 const page=await open(t,{rows:{'conta-a':[row('normal'),row('alterado')]}});
 await page.evaluate(()=>{
  document.getElementById('content').innerHTML='<section data-clinical-comparison="teste"><img class="clinical-public-exam" src="data:image/png;base64,AAAA" alt="Referência pública indisponível">'+LessonImages.slot('aula_0','',[],{}, {include:['normal','alterado']})+'<p data-clinical-status>Conferir conexão</p><details data-clinical-schematic hidden><summary>Mapa</summary></details></section>';LessonImages.scan();
 });
 await page.waitForSelector('.lesson-images:not([hidden]) img');await settle(page);
 assert.equal(await page.locator('[data-clinical-schematic]').isVisible(),false);assert.equal(await page.locator('[data-clinical-status]').isVisible(),true);
});
