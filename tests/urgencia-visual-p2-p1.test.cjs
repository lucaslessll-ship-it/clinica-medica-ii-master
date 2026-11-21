'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const base=path.join(__dirname,'..','MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const read=n=>fs.readFileSync(path.join(base,n),'utf8');
const p2=['hipertensiva','sca','arritmias','glicemia','acidobase','eletrolitos','tireoide','intox','catastrofes','paliativos'];
const p1new=['vm','queimado','asma','adrenal','afogamento'];
function setup(){
 const files=['course-kit.js','emergency-content.js','emergency-depth-core.js','emergency-depth-p1a.js','emergency-depth-p1b.js','emergency-depth-p1c.js','emergency-depth-p2a.js','emergency-depth-p2b.js','emergency-depth-p2c.js','emergency-visual-data.js','pcr-adaptive-engine.js','pcr-adaptive-ui.js','emergency-pcr-pilot.js','emergency.js'];
 const w={StudyIcons:{emergency:()=>'<svg/>'},MasterActivity:{setContext(){},track(){}},addEventListener(){}};
 const store={study:{uep1:{quiz:{pcr_0:1},done:{pcr:true},seen:{}}}},ui={route:'emergency-p2'};
 const doc={getElementById:()=>null,querySelector:()=>null,addEventListener(){}};
 const ctx=vm.createContext({window:w,store,ui,document:doc,StudyIcons:w.StudyIcons,header:(_,t)=>t,section:(_,c)=>c,stateSave(){},setInterval(){},navigate(){},render(){}});
 for(const f of files)vm.runInContext(read(f),ctx,{filename:f,timeout:3000});
 return {E:w.Emergency,atlas:w.EmergencyFigureAtlas,w,store};
}
test('All ten P2 lessons have standalone zoomable medical visuals',()=>{
 const {E}=setup();
 for(let i=0;i<10;i++){
  const m=E.all[i+13],html=E.p2.modulePage(i);
  assert.equal(m.stage,'P2');
  assert.ok(p2.includes(m.id),m.id);
  assert.match(html,new RegExp('assets/urgencia/illustrations/'+m.id+'\\.svg'));
  assert.match(html,/class="ue-zoom-trigger"/);
  assert.match(html,/data-atlas-module="/);
 }
});
test('P1 lessons retain extracted images and get five new visual explanations',()=>{
 const {E,w}=setup();
 for(const id of p1new){
  const i=E.all.findIndex(m=>m.id===id);
  assert.ok(i>=0&&i<13);
  assert.match(E.p1.modulePage(i),new RegExp('assets/urgencia/illustrations/'+id+'\\.svg'));
 }
 for(const id of ['irpa','avci','sepse','choque','trauma','trauma-especifico','sensorio']){
  const i=E.all.findIndex(m=>m.id===id);
  assert.match(E.p1.modulePage(i),/assets\/urgencia\/figures\//);
 }
 w.EmergencyPCR.mode('30');
 w.EmergencyPCR.go('algorithm');
 assert.match(E.p1.modulePage(0),/class="ue-zoom-trigger"/);
});
test('SVG anatomy illustrations exist, are syntactically bounded and have no executable content',()=>{
 const ids=[...p2,...p1new];
 for(const id of ids){
  const svg=read('assets/urgencia/illustrations/'+id+'.svg');
  assert.match(svg,/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
  assert.match(svg,/<\/svg>$/);
  assert.match(svg,/viewBox="0 0 1100 650"/);
  assert.doesNotMatch(svg,/<script\b|<foreignObject\b|onload\s*=/i);
  assert.ok(svg.length>2000,id);
 }
});
test('visualizer controls, tablet gestures and accessibility are installed',()=>{
 const js=read('emergency-image-viewer.js'),css=read('emergency-image-viewer.css'),index=read('index.html');
 assert.doesNotThrow(()=>new vm.Script(js));
 assert.match(js,/pointerdown/);assert.match(js,/pointermove/);assert.match(js,/pointerup/);
 assert.match(js,/Escape/);assert.match(js,/ArrowRight/);assert.match(js,/ArrowLeft/);
 assert.match(js,/aria-modal/);assert.match(js,/setPointerCapture/);
 assert.match(js,/overflow='hidden'/);
 assert.match(css,/100dvh/);assert.match(css,/touch-action:none/);
 assert.match(css,/focus-visible/);assert.match(css,/prefers-reduced-motion/);
 assert.ok(index.indexOf('emergency-image-viewer.js')>0);
 assert.ok(index.indexOf('emergency-visual-data.js')<index.indexOf('emergency-image-viewer.js'));
 assert.match(index,/emergency-image-viewer\.css/);
});
test('question bank and previous progress are not altered by visual improvements',()=>{
 const {E,store}=setup();
 assert.equal(E.all.length,23);
 assert.equal(E.all.reduce((n,m)=>n+m.quiz.length,0),115);
 for(let i=0;i<13;i++)E.p1.modulePage(i);
 for(let i=0;i<10;i++)E.p2.modulePage(i);
 assert.equal(store.study.uep1.quiz.pcr_0,1);
 assert.equal(store.study.uep1.done.pcr,true);
});
