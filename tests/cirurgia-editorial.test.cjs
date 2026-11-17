const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const context={window:{}};vm.runInNewContext(fs.readFileSync('MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/cir_questions.js','utf8'),context);
const qs=JSON.parse(JSON.stringify(context.window.MASTER_CIR_QUESTIONS));

const revisedLote2={
  "cirrad-09": 2,
  "cirproc-13": 3,
  "cirproc-27": 2,
  "cirtabd-23": 0,
  "ciruro-27": 3,
  "cirremit-16": 2,
  "cirvasc-09": 0,
  "ciruro-02": 1,
  "cirtabd-29": 1,
  "cirvasc-29": 1,
  "cirestom-21": 3,
  "cirestom-25": 2,
  "cirestom-26": 0,
  "cirfig-20": 2,
  "ciruro-28": 0
};
const revised={
 'cirpanc-14':2,'cirremit-14':3,'cirvb-05':1,'cirvb-17':0,
 'ciresof-04':2,'cirvasc-28':0,'cirestom-11':1
};
test('revisão editorial cobre os 432 IDs autorais de Cirurgia e preserva os temas',()=>{
 const expected={ciraa:36,cirpanc:30,cirher:30,cirtabd:30,cirttor:30,cirproc:30,cirremit:30,cirvasc:30,ciresof:30,cirestom:30,cirvb:30,cirfig:30,cirrad:30,ciruro:36};
 assert.equal(qs.length,432);assert.equal(new Set(qs.map(q=>q.id)).size,432);
 for(const [topic,count] of Object.entries(expected))for(let i=1;i<=count;i++)assert.ok(qs.some(q=>q.id===topic+'-'+String(i).padStart(2,'0')&&q.t===topic));
 for(const q of qs){assert.equal(q.revision,Object.hasOwn(revisedLote2,q.id)?'cir-20261117-a2':Object.hasOwn(revised,q.id)?'cir-20261117-a1':'cir-20261116',q.id);assert.equal(q.o.length,4);assert.equal(new Set(q.o).size,4);assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<4);assert.ok(q.q.split(/\s+/).length>=40,'Caso insuficiente '+q.id);assert.ok(q.why.length>=150,'Justificativa insuficiente '+q.id);assert.doesNotMatch(q.why,/alternativa [ABCD]\b|letra [ABCD]\b/);}
});
test('gabaritos têm distribuição equilibrada e a resposta longa não predomina',()=>{
 const counts=[0,0,0,0];let uniqueLongest=0;
 for(const q of qs){counts[q.a]++;const lengths=q.o.map(o=>o.length);if(lengths[q.a]>Math.max(...lengths.filter((_,i)=>i!==q.a)))uniqueLongest++;assert.ok(Math.max(...lengths)/Math.min(...lengths)<=2.8,'Comprimentos muito desiguais '+q.id);}
 assert.deepEqual(counts,[108,108,108,108]);assert.ok(uniqueLongest/qs.length<=0.4,'Correta única mais longa em '+uniqueLongest+' itens');
});


test('lotes 1 e 2: fontes verificáveis, gabaritos estáveis e alternativas comparáveis',()=>{
 for(const [id,answer] of Object.entries({...revised,...revisedLote2})){
  const q=qs.find(q=>q.id===id);
  assert.ok(q,id);assert.equal(q.a,answer,id);
  assert.ok(Array.isArray(q.refs)&&q.refs.length>=1,'Sem fontes: '+id);
  for(const ref of q.refs){
   assert.match(ref.title||'',/\S/,'Fonte sem título '+id);
   assert.match(ref.url||'',/^https:\/\/[a-z0-9.-]+\//i,'Fonte inválida '+id);
  }
  const avgWrong=q.o.filter((_,i)=>i!==q.a).reduce((sum,o)=>sum+o.length,0)/3;
  assert.ok(q.o[q.a].length/avgWrong<1.4,'Comprimento denuncia gabarito: '+id);
 }
});

test('referências de Cirurgia só aparecem após resposta ou entrega do simulado',()=>{
 const app=fs.readFileSync('MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/cir_app.js','utf8');
 assert.match(app,/function fontesDaQuestao\(q\)/);
 assert.match(app,/noopener noreferrer/);
 assert.equal((app.match(/\$\{fontesDaQuestao\(q\)\}/g)||[]).length,2);
 assert.match(app,/practice\.revealed\?/);
 assert.match(app,/if\(exam\.done\)/);
});


test('lote 2 remove pistas verbais de distratores e mantém vinhetas contextualizadas',()=>{
 const signals=/\b(sempre|nunca|apenas|exclusivamente|dispensar|ignorar|sem avaliação|sem investigar|isolad[oa]|não precisa|inevitável|todos os casos)\b/i;
 for(const id of Object.keys(revisedLote2)){
  const q=qs.find(q=>q.id===id);
  assert.ok(q.q.split(/\s+/).length>=45,'Vinheta curta: '+id);
  for(let i=0;i<4;i++)if(i!==q.a)assert.ok(!signals.test(q.o[i]),'Distrator extremo: '+id);
  assert.ok(q.why.length>200,'Justificativa clínica insuficiente: '+id);
  assert.equal(q.revision,'cir-20261117-a2');
 }
});

test('lotes 1 e 2 preservam 410 outras questões e a distribuição 108/108/108/108',()=>{
 const actual=qs.reduce((a,q)=>(a[q.revision]=(a[q.revision]||0)+1,a),{});
 assert.deepEqual(actual,{'cir-20261116':410,'cir-20261117-a1':7,'cir-20261117-a2':15});
 const counts=[0,0,0,0];for(const q of qs)counts[q.a]++;
 assert.deepEqual(counts,[108,108,108,108]);
});
