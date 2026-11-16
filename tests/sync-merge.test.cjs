const test=require('node:test'),assert=require('node:assert');
const {merge3,mesclarPrefs}=require('../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/sync-merge.js');
const base=()=>({marcas:{a:[{id:'m1',cor:'amarelo',criadoEm:'1'}]},pomodoro:{days:{d:{ms:100,completed:1}},em:1,mode:'foco'},theme:'light'});
test('marcas de dois aparelhos se somam',()=>{
  const l=base(),r=base();l.marcas.a.push({id:'m2',criadoEm:'2'});r.marcas.a.push({id:'m3',criadoEm:'3'});
  assert.deepStrictEqual(mesclarPrefs(base(),l,r).marcas.a.map(x=>x.id),['m1','m2','m3']);
});
test('marca removida em um aparelho continua removida',()=>{
  const l=base(),r=base();l.marcas.a=[];r.marcas.a[0].cor='azul';
  assert.deepStrictEqual(mesclarPrefs(base(),l,r).marcas.a,[]);
});
test('tempo do pomodoro usa o maior valor e etapa vem do mais recente',()=>{
  const l=base(),r=base();l.pomodoro.days.d.ms=200;r.pomodoro.days.d.ms=150;r.pomodoro.days.d.completed=2;r.pomodoro.em=9;r.pomodoro.mode='curto';
  const m=mesclarPrefs(base(),l,r);
  assert.strictEqual(m.pomodoro.days.d.ms,200);assert.strictEqual(m.pomodoro.days.d.completed,2);assert.strictEqual(m.pomodoro.mode,'curto');
});
test('tema fica no aparelho',()=>{
  const l=base(),r=base();l.theme='dark';r.theme='light';r.marcas.a[0].cor='rosa';
  const m=mesclarPrefs(base(),l,r);assert.strictEqual(m.theme,'dark');assert.strictEqual(m.marcas.a[0].cor,'rosa');
});
test('mudança só de um lado vence',()=>{assert.deepStrictEqual(merge3({a:1},{a:1},{a:2}),{a:2});});
