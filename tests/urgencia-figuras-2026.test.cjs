'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..','MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const js=[
 'course-kit.js','emergency-content.js','emergency-depth-core.js',
 'emergency-depth-p1a.js','emergency-depth-p1b.js','emergency-depth-p1c.js',
 'emergency-depth-p2a.js','emergency-depth-p2b.js','emergency-depth-p2c.js',
 'emergency-visual-data.js','pcr-adaptive-engine.js','pcr-adaptive-ui.js',
 'emergency-pcr-pilot.js','emergency.js'
];
function setup(saved=null){
 const win={StudyIcons:{emergency:()=>'<svg/>'},MasterActivity:{setContext(){},track(){}},matchMedia:()=>({matches:true})};
 const store={study:saved||{}},ui={route:'emergency-p1'};
 const document={getElementById:()=>null,querySelector:()=>null};
 const ctx=vm.createContext({window:win,store,ui,document,StudyIcons:win.StudyIcons,
  header:(_,t)=>'<h1>'+t+'</h1>',section:(_,c)=>c,stateSave(){},setInterval(){},
  navigate:x=>ui.route=x,render(){}});
 for(const name of js)vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),ctx,{filename:name,timeout:2800});
 return {win,store,ui,E:win.Emergency,atlas:win.EmergencyFigureAtlas};
}
test('23 módulos, 115 questões e histórico preservado',()=>{
 const saved={uep1:{done:{pcr:true},quiz:{pcr_0:1},seen:{}},uep2:{done:{},quiz:{},seen:{}}};
 const {E,store}=setup(saved);
 assert.equal(E.all.length,23);
 assert.equal(E.all.reduce((n,m)=>n+m.quiz.length,0),115);
 assert.equal(E.all.filter(m=>m.stage==='P1').length,13);
 assert.equal(E.all.filter(m=>m.stage==='P2').length,10);
 E.p1.modulePage(0);E.p1.modulePage(1);E.p2.modulePage(0);
 assert.equal(store.study.uep1.quiz.pcr_0,1);
 assert.equal(store.study.uep1.done.pcr,true);
});
test('atlas: all lessons have meaningful visuals in context, not full slides',()=>{
 const {win,E,atlas}=setup();
 assert.equal(atlas.countExtracted,22); // 23 extracted assets; one left in catalogue for review
 assert.equal(Object.keys(atlas.images).length,9);
 assert.equal(Object.keys(atlas.diagrams).length,14);
 assert.equal(Object.keys(atlas.placement).length,23);
 const pages=E.all.map((m,i)=>i<13?E.p1.modulePage(i):E.p2.modulePage(i-13));
 for(const [i,m] of E.all.entries()){
  if(m.id==='pcr')continue; // guided version supplies an ECG at algorithm step
  assert.match(pages[i],new RegExp('data-atlas-module="'+m.id+'"'),m.id);
  assert.ok(pages[i].includes('ue-atlas-card')||pages[i].includes('ue-atlas-steps'),m.id);
 }
 win.EmergencyPCR.mode('30');
 win.EmergencyPCR.go('algorithm');
 assert.match(E.p1.modulePage(0),/pcr\/taquicardia-ventricular\.jpg/);
 assert.ok(pages.every(html=>!html.includes('<iframe')&&!html.includes('/preview')));
 assert.ok(pages.every(html=>!/(?:UNIFASE|FMP\/|Professora|Professor|LUIS EDUARDO FONTES)/i.test(html)));
});
test('23 JPEG assets are independent files, not slide screenshots',()=>{
 const dir=path.join(root,'assets','urgencia','figures');
 const jpgs=[];
 function walk(d){for(const x of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,x.name);if(x.isDirectory())walk(p);else if(x.name.endsWith('.jpg'))jpgs.push(p);}}
 walk(dir);
 assert.equal(jpgs.length,23);
 for(const f of jpgs){const b=fs.readFileSync(f);assert.ok(b.length>8000,f);assert.equal(b[0],0xff);assert.equal(b[1],0xd8);assert.equal(b.at(-2),0xff);assert.equal(b.at(-1),0xd9);}
});
test('map source URLs are local relative assets and available',()=>{
 const {atlas}=setup();
 const dir=path.join(root,'assets','urgencia','figures');
 for(const [id,items] of Object.entries(atlas.images))for(const item of items){
  assert.ok(Array.isArray(item)&&item.length===4,id);
  assert.ok(!/^https?:\/\//.test(item[0]),id);
  assert.ok(fs.existsSync(path.join(dir,item[0])),id+':'+item[0]);
 }
 for(const module of Object.keys(atlas.updated)){
  const guide=atlas.updated[module];
  assert.match(guide.url,/^https:\/\//);
  assert.ok(guide.note.length>45,module);
 }
});
test('only Urgência uses optional sectionAddon',()=>{
 const kit=fs.readFileSync(path.join(root,'course-kit.js'),'utf8');
 const app=fs.readFileSync(path.join(root,'emergency.js'),'utf8');
 assert.match(kit,/typeof cfg\.sectionAddon/);
 assert.match(app,/sectionAddon:\(module,index\)=>window\.EmergencyFigureAtlas/);
});
test('HTML includes atlas script before emergency and cache busting',()=>{
 const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert.ok(index.indexOf('emergency-visual-data.js')>0);
 assert.ok(index.indexOf('emergency-visual-data.js')<index.indexOf('emergency-pcr-pilot.js'));
 assert.ok(index.indexOf('emergency-visual-data.js')<index.indexOf('emergency.js?v='));
 assert.match(index,/course-kit\.js\?v=20261121-urgencia-visual1/);
 assert.match(index,/emergency-course\.css\?v=20261121-urgencia-visual1/);
});
