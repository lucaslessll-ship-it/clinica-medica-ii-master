const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const context={window:{}};vm.runInNewContext(fs.readFileSync('MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/cir_questions.js','utf8'),context);
const qs=JSON.parse(JSON.stringify(context.window.MASTER_CIR_QUESTIONS));
test('revisão editorial cobre os 432 IDs autorais de Cirurgia e preserva os temas',()=>{
 const expected={ciraa:36,cirpanc:30,cirher:30,cirtabd:30,cirttor:30,cirproc:30,cirremit:30,cirvasc:30,ciresof:30,cirestom:30,cirvb:30,cirfig:30,cirrad:30,ciruro:36};
 assert.equal(qs.length,432);assert.equal(new Set(qs.map(q=>q.id)).size,432);
 for(const [topic,count] of Object.entries(expected))for(let i=1;i<=count;i++)assert.ok(qs.some(q=>q.id===topic+'-'+String(i).padStart(2,'0')&&q.t===topic));
 for(const q of qs){assert.equal(q.revision,'cir-20261116');assert.equal(q.o.length,4);assert.equal(new Set(q.o).size,4);assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<4);assert.ok(q.q.split(/\s+/).length>=40,'Caso insuficiente '+q.id);assert.ok(q.why.length>=150,'Justificativa insuficiente '+q.id);assert.doesNotMatch(q.why,/alternativa [ABCD]\b|letra [ABCD]\b/);}
});
test('gabaritos têm distribuição equilibrada e a resposta longa não predomina',()=>{
 const counts=[0,0,0,0];let uniqueLongest=0;
 for(const q of qs){counts[q.a]++;const lengths=q.o.map(o=>o.length);if(lengths[q.a]>Math.max(...lengths.filter((_,i)=>i!==q.a)))uniqueLongest++;assert.ok(Math.max(...lengths)/Math.min(...lengths)<=2.8,'Comprimentos muito desiguais '+q.id);}
 assert.deepEqual(counts,[108,108,108,108]);assert.ok(uniqueLongest/qs.length<=0.4,'Correta única mais longa em '+uniqueLongest+' itens');
});
