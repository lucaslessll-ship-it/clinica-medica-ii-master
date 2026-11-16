const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('aula de crise hiperglicêmica separa critério de resolução atual e referência histórica',()=>{
 const lessons={};vm.runInNewContext(fs.readFileSync('MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/lesson-deep-p1-diabetes.js','utf8'),{LessonDeep:{add:data=>Object.assign(lessons,data)}});const m=lessons.p1dm_2;assert.ok(m);const t=JSON.stringify(m);assert.match(t,/cetona plasmática abaixo de 0,6 mmol\/L/);assert.match(t,/Não usar ânion gap como critério de resolução/);assert.match(t,/500 a 1.000 mL\/h/);assert.match(t,/Fosfato|fosfato/);assert.ok(m.refs.some(r=>r.u==='https://pmc.ncbi.nlm.nih.gov/articles/PMC11272983/'));assert.match(m.note,/2009.*histórica/);
});
