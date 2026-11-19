'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..','MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const files=['course-kit.js','emergency-content.js','emergency-depth-core.js','emergency-depth-p1a.js','emergency-depth-p1b.js','emergency-depth-p1c.js','emergency-depth-p2a.js','emergency-depth-p2b.js','emergency-depth-p2c.js','emergency-pcr-pilot.js','emergency.js'];
function setup(){
 let html='',saves=0;
 const host={set outerHTML(v){html=v;}};
 const document={getElementById:id=>id==='ue-pcr-pilot'?host:null,querySelector:()=>null};
 const win={StudyIcons:{emergency:()=>'<svg/>'},MasterActivity:{setContext(){},track(){}},scrollTo(){},matchMedia:()=>({matches:true})};
 const store={study:{}},ui={route:'emergency-p1'};
 const ctx=vm.createContext({window:win,store,ui,document,StudyIcons:win.StudyIcons,stateSave:()=>saves++,header:(_,t)=>'<h1>'+t+'</h1>',section:(_,c)=>c,navigate:x=>ui.route=x,render(){},setInterval(){}});
 for(const file of files)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx,{filename:file,timeout:2500});
 return {win,store,ui,course:win.Emergency,html:()=>html,saves:()=>saves};
}
test('Somente PCR usa o novo percurso, preservando as outras 22 aulas',()=>{
 const x=setup(),a=x.course.p1.modulePage(0),b=x.course.p1.modulePage(1);
 assert.equal(x.course.all.length,23);
 assert.match(a,/id="ue-pcr-pilot"/);
 assert.match(a,/Adulto cai diante da equipe/);
 assert.match(b,/pocus-module/);
 assert.doesNotMatch(b,/ue-pcr-pilot/);
 assert.doesNotMatch(a,/arguiç[aã]o oral|prova oral/i);
});
test('Quatro modos e progressão interativa de pulso, ritmo e cronologia',()=>{
 const x=setup();x.course.p1.modulePage(0);
 for(const mode of ['2','5','15','30']){x.win.EmergencyPCR.mode(mode);assert.equal(x.store.study.uep1.pcrPilot.mode,mode);}
 x.win.EmergencyPCR.go('algorithm');
 assert.match(x.html(),/O ritmo é chocável/);
 assert.match(x.html(),/Sim: não é PCR/);
 x.win.EmergencyPCR.selectRhythm('pea');
 x.win.EmergencyPCR.answer('rhythm_pea',2);
 assert.equal(x.store.study.uep1.pcrPilot.answers.rhythm_pea,2);
 x.win.EmergencyPCR.go('timeline');
 assert.match(x.html(),/adrenalina/i);
});
test('Caso evolutivo registra cinco decisões e permite reteste',()=>{
 const x=setup();x.course.p1.modulePage(0);x.win.EmergencyPCR.mode('30');x.win.EmergencyPCR.go('case');
 for(const [i,a] of [1,1,0,3,2].entries()){
   x.win.EmergencyPCR.answer('case_'+i,a);
   if(i<4)x.win.EmergencyPCR.nextCase();
 }
 assert.match(x.html(),/5 de 5 decisões adequadas/);
 x.win.EmergencyPCR.go('summary');x.win.EmergencyPCR.finish();
 assert.equal(x.store.study.uep1.done.pcr,true);
 assert.ok(x.store.study.uep1.pcrPilot.reviews.d1);
 assert.ok(x.store.study.uep1.pcrPilot.reviews.d7);
 x.win.EmergencyPCR.restart();
 assert.equal(Object.keys(x.store.study.uep1.pcrPilot.answers).length,0);
 assert.ok(x.store.study.uep1.pcrPilot.reviewHistory.length>0);
});
test('Questões formais anteriores continuam no banco e no histórico',()=>{
 const x=setup();x.course.p1.modulePage(0);x.win.EmergencyPCR.mode('30');x.win.EmergencyPCR.go('practice');
 assert.match(x.html(),/Questão 5/);
 x.course.p1.answer(0,0,0);
 assert.equal(Number.isInteger(x.store.study.uep1.quiz.pcr_0),true);
 x.win.EmergencyPCR.restart();
 assert.equal(Number.isInteger(x.store.study.uep1.quiz.pcr_0),true);
 assert.equal(x.course.all.reduce((n,m)=>n+m.quiz.length,0),115);
});
test('HTML carrega módulo e estilos antes do script principal',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert.ok(html.includes('emergency-pcr-pilot.css'));
 assert.ok(html.indexOf('emergency-pcr-pilot.js')<html.indexOf('emergency.js?v='));
 assert.match(html,/course-kit\.js\?v=20261119-pcr-pilot1/);
});
