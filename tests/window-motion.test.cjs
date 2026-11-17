'use strict';
const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const fs=require('node:fs/promises');
const path=require('node:path');
let browser;
before(async()=>{browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true})});
after(async()=>{await browser?.close()});
const src=path.join(__dirname,'..','MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
async function fixture(){
 const p=await browser.newPage({viewport:{width:390,height:760}});
 await p.setContent('<style>[hidden]{display:none!important}.sheet{position:fixed;right:0;top:50px;width:280px;height:340px;background:#fff}.modal{width:280px;height:240px}</style>'+
 '<aside class="sheet" id="sheet" hidden><button id="action">Salvar</button></aside>'+
 '<div id="overlay" hidden><div class="hig-dim"></div><section class="hig-dialog">Pesquisa</section></div>'+
 '<dialog class="modal" id="modal"><button id="exit">Fechar</button></dialog>');
 await p.addScriptTag({content:await fs.readFile(path.join(src,'window-motion.js'),'utf8')});
 return p;
}

test('painel lateral entra e sai suavemente e termina escondido',async()=>{
 const p=await fixture();
 await p.evaluate(()=>MasterWindowMotion.show(document.getElementById('sheet'),{kind:'sheet'}));
 assert.equal(await p.locator('#sheet').isVisible(),true);
 assert.equal(await p.locator('#sheet').getAttribute('data-wm-kind'),'sheet');
 await p.evaluate(()=>MasterWindowMotion.hide(document.getElementById('sheet'),{kind:'sheet'}));
 assert.equal(await p.locator('#sheet').isVisible(),false);
 await p.close();
});

test('reabrir enquanto fecha cancela o fechamento sem perder o painel',async()=>{
 const p=await fixture();
 await p.evaluate(async()=>{
  const el=document.getElementById('sheet');
  await MasterWindowMotion.show(el,{kind:'sheet'});
  MasterWindowMotion.hide(el,{kind:'sheet'});
  MasterWindowMotion.show(el,{kind:'sheet'});
 });
 await p.waitForTimeout(400);
 assert.equal(await p.locator('#sheet').isVisible(),true);
 assert.equal(await p.locator('#sheet').evaluate(el=>el.hidden),false);
 await p.close();
});

test('janela modal nativa mantém abertura e fechamento acessíveis',async()=>{
 const p=await fixture();
 await p.evaluate(()=>MasterWindowMotion.showDialog(document.getElementById('modal')));
 assert.equal(await p.locator('#modal').evaluate(el=>el.open),true);
 await p.evaluate(()=>MasterWindowMotion.hideDialog(document.getElementById('modal')));
 assert.equal(await p.locator('#modal').evaluate(el=>el.open),false);
 await p.close();
});

test('sobreposição da busca anima o conteúdo e não remove o DOM',async()=>{
 const p=await fixture();
 await p.evaluate(()=>MasterWindowMotion.show(document.getElementById('overlay'),{kind:'overlay'}));
 assert.equal(await p.locator('#overlay').isVisible(),true);
 await p.evaluate(()=>MasterWindowMotion.hide(document.getElementById('overlay'),{kind:'overlay'}));
 assert.equal(await p.locator('#overlay').evaluate(el=>el.hidden),true);
 assert.equal(await p.locator('#overlay .hig-dialog').count(),1);
 await p.close();
});

test('reduzir movimento apresenta e fecha imediatamente',async()=>{
 const p=await fixture();
 await p.evaluate(()=>document.body.classList.add('reduce-motion'));
 const result=await p.evaluate(async()=>{
  const el=document.getElementById('sheet');
  const before=performance.now();
  await MasterWindowMotion.show(el,{kind:'sheet'});
  await MasterWindowMotion.hide(el,{kind:'sheet'});
  return {elapsed:performance.now()-before,hidden:el.hidden};
 });
 assert.equal(result.hidden,true);
 assert.ok(result.elapsed<150,'Acessibilidade não deve aguardar animação');
 await p.close();
});
