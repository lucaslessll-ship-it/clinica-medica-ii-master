// Auditoria estrutural e de pistas editoriais; não substitui revisão clínica.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const filename=process.argv[2]||'MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/cir_questions.js';
let questions;
if(filename.endsWith('.json'))questions=JSON.parse(fs.readFileSync(filename,'utf8'));
else {const c={window:{}};vm.runInNewContext(fs.readFileSync(filename,'utf8'),c);questions=c.window.MASTER_CIR_QUESTIONS;}
const ids=new Set(),stems=new Set(),counts=[0,0,0,0],flags=[];
const cues=/\b(sempre|nunca|obrigatoriamente|em todo caso|qualquer paciente|dispensa qualquer)\b/i;
for(const q of questions){
 assert.ok(q.id&&!ids.has(q.id),'ID duplicado: '+q.id);ids.add(q.id);
 assert.ok(!stems.has(q.q),'Enunciado repetido: '+q.id);stems.add(q.q);
 assert.equal(q.o.length,4,q.id);assert.equal(new Set(q.o).size,4,q.id);
 assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<4,q.id);
 assert.ok(q.why&&q.why.length>60,'Comentário insuficiente: '+q.id);counts[q.a]++;
 const sizes=q.o.map(o=>o.length),sorted=[...sizes].sort((a,b)=>b-a);
 const reasons=[];
 if(q.q.split(/\s+/).length<40)reasons.push('caso curto');
 if(sizes[q.a]===sorted[0]&&sizes[q.a]>sorted[1]*1.25)reasons.push('correta destaca-se pelo tamanho');
 if(sorted[0]/Math.min(...sizes)>2.8)reasons.push('alternativas muito desiguais');
 if(q.o.some(o=>cues.test(o)))reasons.push('absolutismo nas alternativas');
 if(reasons.length)flags.push({id:q.id,reasons});
}
console.log(JSON.stringify({questions:questions.length,answers:counts,longestCorrect:questions.filter(q=>q.o[q.a].length===Math.max(...q.o.map(o=>o.length))).length,flags},null,2));
if(process.env.STRICT_EDITORIAL==='1'&&flags.length)process.exitCode=1;
