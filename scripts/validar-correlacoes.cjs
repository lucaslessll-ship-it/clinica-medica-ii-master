/* Valida o glossário de correlações contra as regras de CORRELACOES.md. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const A=path.join(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const GENERICOS=['tomografia','contraste','ultrassom','ultrassonografia','radiografia','exame','imagem','laboratorio','laboratório','sangue','antibiotico','antibiótico','ecg','eletrocardiograma'];
const MAX_LESSON=6,MAX_SECTION=2,MAX_PHRASE=140;
const erros=[];
const window={};vm.runInContext(fs.readFileSync(path.join(A,'correlacoes-data.js'),'utf8'),vm.createContext({window}));
const data=window.CORRELACOES;
if(!Array.isArray(data)||!data.length)throw new Error('glossário vazio');
const index=JSON.parse(fs.readFileSync(path.join(A,'ai-index.json'),'utf8'));
const aulas=new Set(index.map(d=>d.lesson));
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const donos=new Map();
for(const e of data){
 if(!e.t||!e.d||!e.o||!e.p)erros.push(`entrada incompleta: ${e.t||'(sem termo)'}`);
 if(!aulas.has(e.d))erros.push(`destino inexistente no ai-index: ${e.d} (${e.t})`);
 if(e.o&&e.o.length>MAX_PHRASE)erros.push(`frase "o que é" acima de ${MAX_PHRASE}: ${e.t}`);
 if(e.p&&e.p.length>MAX_PHRASE)erros.push(`frase "por que abrir" acima de ${MAX_PHRASE}: ${e.t}`);
 for(const termo of [e.t,...(e.v||[])]){
  const k=norm(termo);
  if(GENERICOS.includes(k))erros.push(`termo genérico proibido: ${termo}`);
  if(k.length<4)erros.push(`termo curto demais para ancorar sem caixa alta: ${termo}`);
  if(donos.has(k)&&donos.get(k)!==e.d)erros.push(`termo com dois donos: ${termo} (${donos.get(k)} e ${e.d})`);
  donos.set(k,e.d);
 }
 for(const sigla of e.s||[]){
  if(!/^[A-Z][A-Za-z]{1,}$/.test(sigla)||sigla===sigla.toLowerCase())erros.push(`sigla estrita fora do padrão de caixa alta: ${sigla}`);
  if(GENERICOS.includes(norm(sigla)))erros.push(`sigla genérica proibida: ${sigla}`);
  if(donos.has(sigla)&&donos.get(sigla)!==e.d)erros.push(`sigla com dois donos: ${sigla}`);
  donos.set(sigla,e.d);
 }
}
/* Simulação de densidade sobre o texto real das aulas. */
const pattern=v=>v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/a/g,'[aáàâãä]').replace(/e/g,'[eéèêë]').replace(/i/g,'[iíìîï]').replace(/o/g,'[oóòôõö]').replace(/u/g,'[uúùûü]').replace(/c/g,'[cç]').replace(/ /g,'\\s+');
const termos=new Map(),siglas=new Map();
data.forEach((e,i)=>{for(const t of [e.t,...(e.v||[])])termos.set(norm(t),i);for(const t of e.s||[])siglas.set(t,i);});
const ordenados=[...termos.keys()].sort((a,b)=>b.length-a.length);
const edge=list=>'(^|[^\\p{L}\\p{N}_])('+list.join('|')+')(?=$|[^\\p{L}\\p{N}_])';
const regex=new RegExp(edge(ordenados.map(pattern)),'giu');
const regexSiglas=siglas.size?new RegExp(edge([...siglas.keys()].map(v=>v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))),'gu'):null;
const rota=id=>{const c=/^(ecg|rad|pocus|hemo|atb)_m\d+$/.exec(id);return c?'#'+c[1]:'#topic/'+id.split('_')[0];};
const porAula=new Map();
for(const doc of index){
 const set=porAula.get(doc.lesson)||new Set();
 for(const rx of [regex,regexSiglas]){
  if(!rx)continue;rx.lastIndex=0;let m;
  while((m=rx.exec(doc.text))){
   const i=rx===regex?termos.get(norm(m[2])):siglas.get(m[2]);
   if(i===undefined)continue;
   const destino=data[i].d;
   if(destino===doc.lesson||rota(destino)===rota(doc.lesson))continue;
   set.add(i);
  }
 }
 porAula.set(doc.lesson,set);
}
const estouro=[...porAula.entries()].filter(([,s])=>s.size>MAX_LESSON).sort((a,b)=>b[1].size-a[1].size);
for(const [aula,s] of estouro)erros.push(`aula acima do limite de ${MAX_LESSON} correlações: ${aula} teria ${s.size}`);
const ranking=[...porAula.entries()].filter(([,s])=>s.size).sort((a,b)=>b[1].size-a[1].size).slice(0,8);
if(process.argv.includes('--detalhe'))for(const [aula,s] of ranking)console.log(`  ${aula}: ${[...s].map(i=>data[i].t).join(', ')}`);
const total=[...porAula.values()].reduce((n,s)=>n+s.size,0);
const comLink=[...porAula.values()].filter(s=>s.size).length;
if(erros.length){console.error('Correlações inválidas:');for(const e of erros)console.error(' · '+e);process.exit(1);}
console.log(`${data.length} entradas, ${termos.size} termos, ${comLink} aulas com correlação, ${total} links previstos (teto ${MAX_LESSON} por aula, ${MAX_SECTION} por seção no runtime).`);
