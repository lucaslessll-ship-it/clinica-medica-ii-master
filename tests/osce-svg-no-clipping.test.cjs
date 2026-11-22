'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const files=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-pilot.js'];
function load(){
 const window={addEventListener(){}},storage=new Map(),localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v))};
 const ctx=vm.createContext({window,localStorage,Date,console});
 for(const file of files)vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),ctx,{filename:file});
 return {window,storage,bank:[window.OSCE_PILOT_DATA,window.OSCE_FA_DATA,...window.OSCE_EXTRA_STATIONS]};
}
test('79 ilustrações de raciocínio têm SVG adaptativo com caixas e texto íntegros',()=>{
 const {window,bank}=load();
 const diagrams=bank.flatMap(st=>(st.images||[]).filter(im=>im.src.startsWith('data:image/svg+xml')).map(im=>({st,xml:decodeURIComponent(im.src.slice(im.src.indexOf(',')+1))})));
 assert.equal(diagrams.length,79);
 assert.equal(Object.keys(window.OSCE_DIAGRAM_LAYOUT).length,79);
 for(const {st,xml} of diagrams){
  const meta=window.OSCE_DIAGRAM_LAYOUT[String(st.number)];
  assert.ok(meta,'falta metadado de layout em '+st.number);
  assert.ok(meta.height>=320&&meta.height<=900,'altura inesperada '+st.number);
  assert.match(xml,new RegExp('viewBox="0 0 860 '+meta.height+'"'));
  assert.equal((xml.match(/<rect x="/g)||[]).length,4,'caixas e moldura '+st.number);
  assert.ok(!xml.includes('foreignObject')&&!xml.includes('…'),'SVG com corte ou uso de foreignObject '+st.number);
  assert.ok(meta.lines.length===3&&meta.lines.every(n=>n>0),'sem linhas '+st.number);
  const boxes=[...xml.matchAll(/<rect x="(\d+)" y="(\d+)" width="241" height="(\d+)"/g)];
  assert.equal(boxes.length,3,'blocos '+st.number);
  const textBlocks=[...xml.matchAll(/<text font-size="16" font-family="Arial,sans-serif" fill="#253a45">([\s\S]*?)<\/text>/g)];
  assert.equal(textBlocks.length,3,'textos '+st.number);
  for(let i=0;i<3;i++){
   const ys=[...textBlocks[i][1].matchAll(/<tspan x="\d+" y="(\d+)">[^<]*<\/tspan>/g)].map(x=>Number(x[1]));
   assert.equal(ys.length,meta.lines[i],'linhas exibidas '+st.number);
   assert.ok(Math.max(...ys)+19<=Number(boxes[i][2])+Number(boxes[i][3]),'texto cruza rodapé '+st.number);
  }
  assert.ok(meta.markerY>1&&meta.markerY<90,'marcador inválido '+st.number);
 }
});
test('bloqueio atrioventricular total mantém o plano inteiro sem cortar transcutânea/transvenosa',()=>{
 const {bank}=load(),st=bank.find(s=>s.title==='Bloqueio atrioventricular total');
 assert.ok(st);
 const xml=decodeURIComponent(st.images[0].src.split(',')[1]);
 assert.match(xml,/transcutânea\/transvenosa/);
 assert.match(xml,/algoritmo/);
 assert.match(xml,/dissociação/);
 assert.doesNotMatch(xml,/bradicardia de e<\/tspan>/);
});
test('pinos informativos ficam na borda dos quadros adaptativos, não sobre o meio do texto',()=>{
 const {window}=load(),P=window.OSCEPilot;
 P.preview(64);
 const html=P.page();
 for(const x of ['left:31%','left:62%','left:93%'])assert.ok(html.includes(x),x);
 assert.equal((html.match(/class="osce-visual-pin"/g)||[]).length,3);
 const y=window.OSCE_DIAGRAM_LAYOUT['64'].markerY;
 assert.ok(html.includes('top:'+y+'%'));
});
test('simulador não antecipa os esquemas com resposta antes da tentativa',()=>{
 const {window}=load(),P=window.OSCEPilot;
 P.start('essencial',null,64);
 assert.doesNotMatch(P.page(),/data:image\/svg\+xml/);
 P.answer('não sei');P.conf(1);P.reveal();
 assert.match(P.page(),/data:image\/svg\+xml/);
});
