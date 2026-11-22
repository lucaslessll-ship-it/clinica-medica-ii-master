'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const files=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-pilot.js'];
function load(store=new Map()){
 const window={addEventListener(){}},localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,String(v))};
 const ctx=vm.createContext({window,localStorage,Date,console});
 for(const f of files)vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx,{filename:f});
 return {P:window.OSCEPilot,store,bank:[window.OSCE_PILOT_DATA,window.OSCE_FA_DATA,...window.OSCE_EXTRA_STATIONS]};
}
const state=store=>JSON.parse(store.get('master_osce_pilot_v1'));
test('leitura guiada é padrão, apresenta resposta/critério sem várias abas e não gera tentativa',()=>{
 const {P,store}=load();
 P.preview(12);
 const h=P.page();
 assert.equal((h.match(/osce-reading-card"/g)||[]).length,1);
 assert.match(h,/Resposta-modelo do Master/);
 assert.match(h,/O que não posso esquecer/);
 assert.match(h,/Etapa 1 de 9/);
 assert.match(h,/síndrome disabsortiva intestinal/);
 assert.match(h,/Biblioteca desta estação/);
 assert.doesNotMatch(h,/Perguntas de apoio:/);
 assert.doesNotMatch(h,/Dicas para memorizar e raciocinar/);
 assert.equal(store.has('master_osce_pilot_v1'),false);
});
test('navegação entre nove etapas e escolha de profundidade não produzem notas nem perdem o índice',()=>{
 const {P,store}=load();
 P.preview(64);P.previewStepSet(3);
 let h=P.page();
 assert.match(h,/ETAPA 4\/9/);
 assert.equal((h.match(/osce-reading-card"/g)||[]).length,1);
 P.previewTierSet('rapida');h=P.page();
 assert.match(h,/ETAPA 1\/4/);
 P.previewStepSet(3);assert.match(P.page(),/ETAPA 4\/4/);
 P.previewLayoutSet('all');h=P.page();
 assert.equal((h.match(/osce-reading-card"/g)||[]).length,4);
 assert.equal(state(store).settings.previewLayout,'all');
 assert.deepEqual(Object.keys(state(store).items),[]);
});
test('destaques têm no máximo sete faixas por resposta e preservam termo com referência clicável',()=>{
 const {P}=load();P.preview(12);
 const h=P.page();
 assert.match(h,/osce-keyword-dx/);
 assert.match(h,/<mark class="osce-keyword osce-keyword-(?:clue|test|action|alert|dx)"/);
 assert.match(h,/osce-term-inline/);
 assert.match(h,/osce-reading-legend/);
 assert.ok((h.match(/osce-keyword-(?:dx|test|action|clue|alert)"/g)||[]).length<35,'não destacar cada palavra');
});
test('desligar realces conserva conceitos clicáveis, texto e preferência; religar restaura',()=>{
 const {P,store}=load();P.preview(12);const previous=P.page();
 P.toggleClinicalHighlights();let h=P.page();
 assert.equal(state(store).settings.clinicalHighlights,false);
 assert.doesNotMatch(h,/<mark class="osce-keyword/);
 assert.match(h,/osce-term-inline/);
 assert.match(h,/síndrome disabsortiva intestinal/);
 P.toggleClinicalHighlights();h=P.page();
 assert.equal(state(store).settings.clinicalHighlights,true);
 assert.match(h,/<mark class="osce-keyword/);
 assert.ok(h.length>=previous.length-60);
});
test('no simulador, gabarito continua bloqueado até a tentativa e o checklist não muda',()=>{
 const {P,store}=load();
 P.start('essencial',null,64);
 assert.doesNotMatch(P.page(),/Resposta-modelo Master/);
 P.answer('não sei');P.conf(1);P.reveal();
 const h=P.page();assert.match(h,/Resposta-modelo Master/);
 assert.match(h,/osce-keyword/);
 assert.match(h,/O que você realmente incluiu/);
 assert.doesNotMatch(h,/Dicas para memorizar e raciocinar/);
 P.finish();
 assert.equal(state(store).items['64:sindrome'].attempts[0].score,0);
});
test('casos e referências com caracteres especiais continuam escapados e sem tags injetadas',()=>{
 const {P,bank}=load();const st=bank.find(x=>x.number===12),old=st.questions[0].answer;
 st.questions[0].answer='<script>alert("teste")</script> & Anti-transglutaminase IgA';
 P.preview(12);const h=P.page();
 assert.doesNotMatch(h,/<script>alert/);
 assert.match(h,/&lt;script&gt;/);
 assert.match(h,/&amp;/);
 st.questions[0].answer=old;
});
test('classes e cache estão isolados no OSCE e respeitam acessibilidade mobile',()=>{
 const css=fs.readFileSync(path.join(ROOT,'osce.css'),'utf8');
 const index=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 assert.match(css,/\.osce-app-shell \.osce-reading-workspace/);
 assert.match(css,/\.osce-app-shell \.osce-keyword-alert/);
 assert.match(css,/@media\(max-width:430px\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(index,/osce-pilot\.js\?v=20261122-reading-guided-v1/);
 assert.match(index,/osce\.css\?v=20261122-reading-guided-v1/);
});
