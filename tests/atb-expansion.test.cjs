const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const root='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/';
function course(){const c={window:{},CourseKit:{create:cfg=>cfg}};vm.createContext(c);vm.runInContext(fs.readFileSync(root+'atb-course.js','utf8'),c);return vm.runInContext('AtbCourse',c);}
test('expansão preserva módulos e questões e acrescenta decisão por via, duração e descalonamento',()=>{
 const c=course();assert.equal(c.MODULES.length,12);assert.equal(c.CASES.length,10);assert.equal(c.MODULES.reduce((s,m)=>s+m.quiz.length,0),36);
 for(const id of ['m5','m6','m7','m8','m10','m11']){const m=c.MODULES.find(m=>m.id===id);assert.ok(m.sections.length>=5,id);const t=JSON.stringify(m);assert.match(t,/via oral|via venosa|via IV/i,id);assert.match(t,/duração|dias|curso/i,id);assert.ok(m.refs.every(k=>c.REFS[k]),id);}
 assert.match(JSON.stringify(c.MODULES.find(m=>m.id==='m8')),/porta.*coleta|porta asséptica/);assert.match(JSON.stringify(c.MODULES.find(m=>m.id==='m12')),/fechamento da incisão/);
});
test('revisão docente separa conferência documental de pendência sem certificar revisão externa',()=>{
 const s=fs.readFileSync('REVISAO_DOCENTE_HEMO_ATB.md','utf8');assert.match(s,/323 registros/);assert.match(s,/11 com conferência/);assert.match(s,/312 a confirmar/);assert.match(s,/sem executar revisão docente externa/);assert.match(s,/Distratores|distratores/);
});
