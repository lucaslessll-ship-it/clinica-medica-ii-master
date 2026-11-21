'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const scripts=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-pilot.js'];
function setup(){
 const db=new Map(),window={addEventListener(){},matchMedia:()=>({matches:true})},localStorage={getItem:k=>db.get(k)||null,setItem:(k,v)=>db.set(k,String(v))};
 const ctx=vm.createContext({window,localStorage,Date,console});
 for(const name of scripts)vm.runInContext(fs.readFileSync(path.join(ROOT,name),'utf8'),ctx,{filename:name});
 return {P:window.OSCEPilot,data:window.OSCE_VISUAL_NOTES,db,stations:[window.OSCE_PILOT_DATA,window.OSCE_FA_DATA,...window.OSCE_EXTRA_STATIONS]};
}
test('todos os ECGs, RX e arquivos POCUS reais do banco possuem guias por imagem',()=>{
 const {data,stations}=setup();
 const diagnosticImages=stations.flatMap(s=>(s.images||[]).map((im,i)=>({s,im,i}))).filter(x=>!x.im.src.startsWith('data:'));
 assert.equal(diagnosticImages.length,14);
 for(const {s,im,i} of diagnosticImages){
  const d=data[String(s.number)]?.[i];
  assert.ok(d,'falta guia para '+s.title+' imagem '+i);
  assert.ok(d.intro?.length>20);
  assert.ok(d.notes?.length>=2);
  for(const n of d.notes){
   assert.ok(n.name&&n.meaning&&n.limitation);
   assert.ok(n.x===undefined||Number.isFinite(n.x)&&n.x>=0&&n.x<=100);
   assert.ok(n.y===undefined||Number.isFinite(n.y)&&n.y>=0&&n.y<=100);
  }
 }
});
test('modo pré-estudo apresenta pinos e explicação do ECG original; modo simulado oculta gabarito',()=>{
 const {P,db}=setup();
 P.preview(52);
 let html=P.page();
 assert.equal((html.match(/class="osce-visual-pin"/g)||[]).length,4);
 assert.match(html,/não comprova fibrilação atrial isoladamente/);
 assert.match(html,/Ampliar com marcações/);
 assert.match(html,/Não conclua apenas por este achado/);
 assert.equal(db.has('master_osce_pilot_v1'),false);
 P.start('essencial',null,52);
 html=P.page();
 assert.doesNotMatch(html,/class="osce-visual-pin"/);
 assert.doesNotMatch(html,/i-031\.jpg/); // spoiler da legenda original permanece oculto
 assert.match(html,/Após responder/);
 P.answer('não sei');P.conf(1);P.reveal();
 html=P.page();
 assert.equal((html.match(/class="osce-visual-pin"/g)||[]).length,4);
 assert.match(html,/Resposta-modelo Master/);
 assert.match(html,/Crédito|Fonte|Imagem original|IMAGEM ORIGINAL/);
});
test('POCUS: pin das linhas B na revisão, legenda sem diagnóstico na tentativa',()=>{
 const {P}=setup();
 P.start('rapida',null,87);
 let html=P.page();
 assert.doesNotMatch(html,/class="osce-visual-pin"/);
 assert.doesNotMatch(html,/Banda clara vertical originada na região pleural/);
 P.answer('não sei');P.conf(1);P.reveal();html=P.page();
 assert.equal((html.match(/class="osce-visual-pin"/g)||[]).length,3);
 assert.match(html,/Linha pleural/);assert.match(html,/fibrose/i);
});
test('ultrassons dinâmicos usam instruções sem marcação fixa que poderia desviar da estrutura',()=>{
 const {P}=setup();
 for(const n of [91,89]){
  P.preview(n);
  const html=P.page();
  assert.match(html,/Imagem dinâmica: guia por texto/);
 }
 P.preview(91);
 assert.doesNotMatch(P.page(),/class="osce-visual-pin"/);
 assert.match(P.page(),/Colapsabilidade isolada não prevê responsividade/);
});
test('POCUS fetal rotulado continua oculto antes da tentativa e anotado depois',()=>{
 const {P}=setup();
 P.start('essencial',null,88);
 assert.match(P.page(),/Imagem de referência com a resposta sinalizada/);
 assert.doesNotMatch(P.page(),/Pleural_effusion_2.jpg/);
 P.answer('não sei');P.conf(1);P.reveal();
 const html=P.page();
 assert.match(html,/Pleural_effusion_2.jpg/);
 assert.equal((html.match(/class="osce-visual-pin"/g)||[]).length,3);
 assert.match(html,/é um feto de 22 semanas/);
});
test('diagramas SVG autorais têm três pontos explicativos mas só após a tentativa',()=>{
 const {P}=setup();
 P.start('essencial',null,75);
 let html=P.page();
 assert.match(html,/Esquema com sinais, exames e condutas/);
 assert.doesNotMatch(html,/data:image\/svg\+xml/);
 P.answer('não sei');P.conf(1);P.reveal();html=P.page();
 assert.match(html,/data:image\/svg\+xml/);
 assert.equal((html.match(/class="osce-visual-pin"/g)||[]).length,3);
 assert.match(html,/Sinais e síndrome/);
 assert.match(html,/Exame e confirmação/);
 assert.match(html,/Conduta e segurança/);
});
test('arquivo das marcações é carregado antes do motor, sem tocar no progresso persistido',()=>{
 const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 assert.ok(html.indexOf('osce-visual-notes.js')<html.indexOf('osce-pilot.js'));
 const {P,db}=setup();
 P.start('essencial',null,87);P.answer('não sei');P.conf(1);P.reveal();P.finish();
 const state=JSON.parse(db.get('master_osce_pilot_v1'));
 assert.equal(state.items['87:interpretacao'].attempts[0].score,0);
 assert.equal(state.items['87:interpretacao'].attempts.length,1);
});
