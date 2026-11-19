'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const base=path.join(__dirname,'..','MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const scripts=['course-kit.js','emergency-content.js','emergency-depth-core.js','emergency-depth-p1a.js','emergency-depth-p1b.js','emergency-depth-p1c.js','emergency-depth-p2a.js','emergency-depth-p2b.js','emergency-depth-p2c.js','pcr-adaptive-engine.js','pcr-adaptive-ui.js','emergency-pcr-pilot.js','emergency.js'];
function setup(){
 let html='',count=0;
 const host={set outerHTML(v){html=v;}};
 const document={getElementById:id=>id==='ue-pcr-pilot'?host:null,querySelector:()=>null};
 const win={StudyIcons:{emergency:()=>'<svg/>'},MasterActivity:{setContext(){},track(){}},scrollTo(){},matchMedia:()=>({matches:true})};
 const store={study:{}},ui={route:'emergency-p1'};
 const context=vm.createContext({window:win,store,ui,document,StudyIcons:win.StudyIcons,header:(_,title)=>title,section:(_,body)=>body,stateSave:()=>count++,setInterval(){},navigate:route=>ui.route=route,render(){}});
 for(const name of scripts)vm.runInContext(fs.readFileSync(path.join(base,name),'utf8'),context,{filename:name,timeout:2500});
 return {win,store,ui,course:win.Emergency,html:()=>html,saves:()=>count};
}
test('the pilot has an isolated 8-skill graph and no dummy mastery',()=>{
 const x=setup(),page=x.course.p1.modulePage(0);
 assert.equal(x.course.all.length,23);
 assert.equal(x.win.PCRAdaptive.skills.length,8);
 assert.equal(x.win.PCRAdaptive.allStats().filter(s=>s.attempts===0).length,8);
 assert.match(page,/pcr-ai-welcome/);
 assert.match(x.win.PCRAdaptiveUI.competencies(),/width:0%/);
 assert.doesNotMatch(x.course.p1.modulePage(1),/pcr-ai-welcome/);
 assert.doesNotMatch(page,/<iframe|\/preview|arguição oral/i);
});
test('new evidence is recorded without overwriting old quiz results',()=>{
 const x=setup();x.course.p1.modulePage(0);
 x.win.EmergencyPCR.answer('initial',1);
 x.win.EmergencyPCR.confidence('initial','high');
 assert.equal(x.win.PCRAdaptive.state().events[0].confidence,'high');
 x.course.p1.answer(0,0,0);
 x.course.p1.answer(0,0,1);
 assert.equal(x.win.PCRAdaptive.state().events.filter(e=>e.id==='pcr_0').length,1);
 assert.equal(x.store.study.uep1.quiz.pcr_0,1);
});
test('recommendations are ordered, reviews adapt and wrong answers are scheduled',()=>{
 const x=setup();x.course.p1.modulePage(0);
 const r=x.win.PCRAdaptive.recommendations();
 assert.equal(r.length,3);
 assert.ok(r.every(a=>a.skill&&a.reason&&Number.isInteger(a.score)));
 const q=x.win.PCRAdaptive.nextReview('shockable');
 assert.ok(q&&q.id);
 const wrong=(q.answer+1)%4;
 const out=x.win.PCRAdaptive.answerReview(q.id,wrong);
 assert.equal(out.correct,false);
 const skill=x.win.PCRAdaptive.skillStats('shockable');
 assert.equal(skill.review.streak,0);
 assert.ok(skill.review.intervalDays<1);
 assert.ok(skill.review.due>Date.now());
 x.win.PCRAdaptive.state().review.shockable.due=Date.now()-1000;
 assert.ok(x.win.PCRAdaptive.dueSkills().some(s=>s.id==='shockable'));
});
test('cases and review items track distinct transfer evidence and explanations',()=>{
 const x=setup();x.course.p1.modulePage(0);
 x.win.EmergencyPCR.mode('30');x.win.EmergencyPCR.go('case');
 x.win.EmergencyPCR.answer('case_0',1);
 const caseEvent=x.win.PCRAdaptive.state().events.find(e=>e.id==='case_0');
 assert.equal(caseEvent.type,'transfer');
 assert.ok(caseEvent.skills.includes('transfer'));
 x.win.EmergencyPCR.go('summary');
 assert.match(x.html(),/pcr-ai-skills/);
 assert.match(x.html(),/pcr-ai-review/);
 x.win.PCRAdaptiveUI.start('nonshockable');
 const q=x.win.PCRAdaptive.item(x.win.PCRAdaptive.state().ui.activeQuestion);
 x.win.PCRAdaptiveUI.answer(q.id,q.answer);
 assert.match(x.html(),/Entenda todas as alternativas/);
 assert.match(x.html(),/Por que cada alternativa|Entenda todas as alternativas/);
});
test('reading mode expands full content and the prior PCR answers remain',()=>{
 const x=setup();x.course.p1.modulePage(0);
 x.win.EmergencyPCR.mode('30');x.win.EmergencyPCR.go('summary');
 x.win.PCRAdaptiveUI.layout('reading');
 assert.match(x.html(),/ue-pcr-full" open/);
 x.win.EmergencyPCR.answer('case_0',1);
 x.win.EmergencyPCR.restart();
 assert.ok(x.win.PCRAdaptive.state().events.length>=1);
 assert.equal(x.course.all.reduce((n,m)=>n+m.quiz.length,0),115);
});
test('new adaptive files are loaded before PCR and all scripts are parseable',()=>{
 const index=fs.readFileSync(path.join(base,'index.html'),'utf8');
 assert.ok(index.indexOf('pcr-adaptive-engine.js')<index.indexOf('pcr-adaptive-ui.js'));
 assert.ok(index.indexOf('pcr-adaptive-ui.js')<index.indexOf('emergency-pcr-pilot.js'));
 assert.match(index,/pcr-adaptive-ui.css/);
 for(const file of scripts)new vm.Script(fs.readFileSync(path.join(base,file),'utf8'),{filename:file});
});
