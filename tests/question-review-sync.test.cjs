const {test}=require('node:test');
const assert=require('node:assert/strict');
const {merge3,mesclarPrefs}=require('../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/sync-merge.js');
test('correção mais recente de outro aparelho encerra a revisão sem misturar data e resultado',()=>{
 const base={b:'p2',id:0,res:false,erros:1,due:10,last:1};
 const local={...base,res:false,erros:2,due:30,last:20};
 const remote={...base,res:true,due:0,last:25};
 const merged=mesclarPrefs({qlog:{'p2:0':base}},{qlog:{'p2:0':local}},{qlog:{'p2:0':remote}}).qlog['p2:0'];
 assert.equal(merged.res,true);assert.equal(merged.due,0);assert.equal(merged.last,25);assert.equal(merged.erros,2);
 const erroPosterior={...remote,res:false,erros:3,last:40,due:50};
 const later=merge3(base,erroPosterior,remote);assert.equal(later.res,false);assert.equal(later.due,50);assert.equal(later.last,40);
});
test('tentativa nativa mais recente preserva alternativa, acerto e data juntos',()=>{
 const base={correct:false,answer:0,at:'2026-11-18T10:00:00Z',attempts:1};
 const local={correct:false,answer:2,at:'2026-11-18T11:00:00Z',attempts:2};
 const remote={correct:true,answer:1,at:'2026-11-18T12:00:00Z',attempts:2};
 assert.deepEqual(merge3(base,local,remote),remote);
});
test('sessões concorrentes mantêm seus IDs e o erro original mesmo após correção em outra sessão',()=>{
 const first={id:'original',started:1,items:{'p2:0':{ok:false,hadError:true}}};
 const local={id:'phone',started:2,items:{'p2:0':{ok:true}}};
 const remote={id:'tablet',started:3,items:{'p1:0':{ok:false}}};
 const m=mesclarPrefs({questionReview:{sessions:[first]}},{questionReview:{sessions:[first,local]}},{questionReview:{sessions:[first,remote]}});
 assert.equal(m.questionReview.sessions.length,3);assert.equal(m.questionReview.sessions.find(s=>s.id==='original').items['p2:0'].ok,false);
});
