'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const read=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
function fixture(){
 const window={MASTER_CLINICAL_GUIDES:{},addEventListener(){}};
 const ctx=vm.createContext({window,escapeHtml:s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'),TOPICS:[],P1:{topics:[]},header:()=>'',render:()=>{},navigate:()=>{},document:{getElementById:()=>null}});
 for(const file of ['prescription-data.js','posology-data.js','pharmacology-education.js','prescription-calculations.js','clinical.js'])
  vm.runInContext(read(file),ctx,{filename:file});
 return {rx:window.MASTER_RX,pharm:window.MASTER_PHARMACOLOGY,clinical:vm.runInContext('Clinical',ctx)};
}
test('todas as 279 fichas apresentam farmaco, classe, ação, indicação e segurança; não homologa classes como bula individual',()=>{
 const {rx,pharm,clinical}=fixture();
 assert.equal(Object.keys(rx.drugs).length,279);
 assert.equal(pharm.count,279);
 assert.deepEqual([...pharm.unknown],[]);
 assert.ok(pharm.specific>=15);
 for(const [id,d] of Object.entries(rx.drugs)){
  const p=pharm.entries[id];
  assert.ok(p&&p.className&&p.action&&p.why&&p.risks&&p.contra&&p.interaction&&p.monitor,id);
  const html=clinical.card(id);
  for(const phrase of ['O que é e como funciona','Para que serve','contraindicações','Interações importantes','Como monitorizar','Posologia e administração por indicação'])assert.ok(html.includes(phrase),id+': '+phrase);
  assert.ok(html.includes('data-drug="'+id+'"'),id);
  assert.match(html,/pharm-quality/);
  if(p.level==='classe')assert.match(html,/Características gerais da classe/);
  if(d.regimens?.length)for(const r of d.regimens){
   assert.ok(html.includes('Esquema '+(d.regimens.indexOf(r)+1)),id);
   assert.ok(html.includes(String(r.context).replace(/&/g,'&amp;').replace(/</g,'&lt;')),id+' contexto do regime');
  }
 }
});
test('Digoxina: mecanismo, riscos de bloqueio AV e referência aparecem antes do esquema posológico',()=>{
 const {clinical,pharm}=fixture(),html=clinical.card('digoxin');
 assert.match(html,/Na⁺\/K⁺-ATPase/);
 assert.match(html,/bloqueio AV/);
 assert.match(html,/condução pelo nó AV/);
 assert.match(html,/Janela terapêutica estreita/);
 assert.match(html,/10 a 15 microgramas\/kg/);
 assert.ok(html.indexOf('O que é e como funciona')<html.indexOf('10 a 15 microgramas/kg'));
 assert.ok(html.includes('https://dailymed.nlm.nih.gov'));
 assert.equal(pharm.entries.digoxin.level,'especifico');
});
test('medicamentos em revisão continuam identificados e nenhuma dose é alterada',()=>{
 const {clinical,rx}=fixture();
 for(const id of ['atropine','dipyrone','domperidone','lugol']){
  const html=clinical.card(id);
  assert.match(html,/pendente de verificação documental|A confirmar/);
  for(const r of rx.drugs[id].regimens||[])assert.ok(html.includes(r.dose.replace(/&/g,'&amp;').replace(/</g,'&lt;')),id);
 }
});
test('fichas farmacológicas são carregadas antes da aula e disponíveis no laboratório independente',()=>{
 const html=read('index.html'),lab=read('laboratorio-master/microcitose/index.html');
 const order=['prescription-data.js','posology-data.js','pharmacology-education.js','clinical.js','posology.js'];
 for(const doc of [html,lab]){
  let last=-1;for(const name of order){const at=doc.indexOf('src="'+(doc===lab?'../../':'')+name);assert.ok(at>last,name+' deve ser carregado em ordem');last=at;}
  assert.match(doc,/pharmacology-education\.css/);
 }
 const posology=read('posology.js');
 assert.match(posology,/Farmacologia dos medicamentos citados/);
 assert.match(posology,/consultar farmacologia e posologia/);
 assert.match(posology,/function annotate\(root\)/);
});
test('layout de fármacos é responsivo e doses continuam acessíveis para testes antigos',()=>{
 const css=read('pharmacology-education.css'),clinical=read('clinical.js');
 assert.match(css,/\.pharm-card/);
 assert.match(css,/@media\(max-width:700px\)/);
 assert.match(css,/grid-template-columns:1fr/);
 assert.match(clinical,/<details class="pharm-posology" open>/);
});

test('manual completo renderiza 18 fichas por vez para preservar fluidez',()=>{
 const {clinical}=fixture();
 const first=clinical.page();
 assert.equal((first.match(/class="rx-card pharm-card/g)||[]).length,18);
 assert.match(first,/Exibindo 18 de 279 fichas/);
 assert.match(first,/Clinical\.loadMore\(\)/);
 clinical.loadMore();
 const more=clinical.page();
 assert.equal((more.match(/class="rx-card pharm-card/g)||[]).length,36);
 assert.match(more,/Exibindo 36 de 279 fichas/);
});
