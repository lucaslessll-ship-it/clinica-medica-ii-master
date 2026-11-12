/* Deterministic identities and pure exam logic. No network or storage writes. */
(function(root){
'use strict';
const clean=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function hash(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return (h>>>0).toString(36);}
function normalize(q,module,index){return {...q,id:q.id||`legacy-${module.toLowerCase()}-${hash(clean(q.q))}`,module:q.module||module,subtopic:q.subtopic||q.tag||q.t,legacyIndex:index,status:q.status||'pending',references:q.references||[]};}
function signature(q){return clean(q.q);}
function distinct(items){const seen=new Set();return items.filter(q=>{const key=signature(q);if(seen.has(key))return false;seen.add(key);return true;});}
function bank(){return distinct([...(root.MASTER_QUESTIONS||[]).map((q,i)=>normalize(q,'P2',i)),...(root.MASTER_P1_QUESTIONS||[]).map((q,i)=>normalize(q,'P1',i)),...(root.MASTER_EXPANDED_QUESTIONS||[]).map((q,i)=>normalize(q,q.module||'P2',i))]);}
function valid(q){return !!q.id&&!!q.q&&[1,2,3].includes(q.level)&&Array.isArray(q.o)&&q.o.length>=4&&q.o.length<=5&&Number.isInteger(q.a)&&q.a>=0&&q.a<q.o.length&&new Set(q.o.map(clean)).size===q.o.length;}
function audit(items){const counts={module:{},topic:{},level:{},status:{}};const duplicateStems=[],invalid=[];const seen=new Set(),ids=new Set();for(const q of items){for(const [key,value] of [['module',q.module],['topic',q.t],['level',q.level],['status',q.status]])counts[key][value]=(counts[key][value]||0)+1;if(seen.has(signature(q)))duplicateStems.push(q.id);seen.add(signature(q));if(ids.has(q.id)||!valid(q))invalid.push(q.id);ids.add(q.id);}return {total:items.length,distinct:seen.size,counts,duplicateStems,invalid};}
function shuffle(items,rng=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function quotas(count,weights){const levels=[1,2,3],w=levels.map(l=>Math.max(0,Number(weights?.[l])||0)),sum=w.reduce((a,b)=>a+b,0);if(!sum)throw Error('Informe ao menos um peso N1/N2/N3.');const exact=w.map(n=>n/sum*count),q=exact.map(Math.floor);let left=count-q.reduce((a,b)=>a+b,0);const order=levels.map((l,i)=>({i,f:exact[i]-q[i]})).sort((a,b)=>b.f-a.f||a.i-b.i);for(let i=0;i<left;i++)q[order[i%3].i]++;return Object.fromEntries(levels.map((l,i)=>[l,q[i]]));}
function select(items,config={},attempts={},rng=Math.random){
 const warnings=[],requested=Math.min(120,Math.max(1,Math.floor(Number(config.count)||20))),weights=config.levels||{1:10,2:45,3:45};
 const allowedPending=config.mode==='train'&&config.includePending===true;
 let pool=distinct(items).filter(valid).filter(q=>(q.status==='released'||allowedPending&&q.status==='pending')&&(!config.module||config.module==='all'||q.module===config.module)&&(!config.topics?.length||config.topics.includes(q.t))&&(!config.subtopics?.length||config.subtopics.includes(q.subtopic))&&(Number(weights[q.level])>0));
 if(config.kind==='errors')pool=pool.filter(q=>attempts[q.id]?.correct===false);
 // Banca is a pedagogical decision/reasoning subset, never an incidence forecast.
 if(config.kind==='banca')pool=pool.filter(q=>q.level>=2);
 const available=pool.length,count=Math.min(requested,available);if(count<requested)warnings.push(`Há ${available} questões distintas disponíveis neste filtro; a sessão terá ${count}. Nenhum item será duplicado.`);
 if(!count)return {items:[],warnings,requested,available,distribution:{1:0,2:0,3:0}};
 const target=quotas(count,weights),topicCounts=config.topicCounts||{},chosen=[],used=new Set(),distribution={1:0,2:0,3:0},topics=[...new Set(pool.map(q=>q.t))],topicUse={};
 const ordered=shuffle(pool,rng).sort((a,b)=>(attempts[a.id]?.at?Date.parse(attempts[a.id].at):0)-(attempts[b.id]?.at?Date.parse(attempts[b.id].at):0));
 const caps=Object.keys(topicCounts).length>0;
 function take(q){chosen.push(q);used.add(q.id);distribution[q.level]++;topicUse[q.t]=(topicUse[q.t]||0)+1;}
 function canTake(q){return !used.has(q.id)&&(!caps||!Object.hasOwn(topicCounts,q.t)||topicUse[q.t]<Math.max(0,Number(topicCounts[q.t])||0)||!topicUse[q.t]&&Number(topicCounts[q.t])>0);}
 for(let i=0;i<count;i++){
  let candidates=ordered.filter(q=>canTake(q)&&distribution[q.level]<target[q.level]);
  if(!candidates.length)candidates=ordered.filter(canTake);
  if(!candidates.length)break;
  candidates.sort((a,b)=>{const balance=config.kind==='random'?0:(topicUse[a.t]||0)-(topicUse[b.t]||0);const p2=config.module==='all'&&a.module!==b.module?(a.module==='P2'?-0.4:0.4):0;return balance+p2;});take(candidates[0]);
 }
 if(chosen.length<count)warnings.push('As cotas por tema limitaram a quantidade final.');
 if([1,2,3].some(l=>distribution[l]!==target[l]))warnings.push('Distribuição cognitiva ajustada à disponibilidade real dos níveis selecionados.');
 const missing=topics.filter(t=>!topicUse[t]);if(missing.length&&config.kind==='balanced')warnings.push('Nem todos os temas couberam na sessão; aumente a quantidade ou revise os filtros.');
 return {items:shuffle(chosen,rng),warnings,requested,available,distribution};
}
function create(items,config={},now=Date.now()){
 const unique=distinct(items);if(unique.length!==items.length||new Set(items.map(q=>q.id)).size!==items.length)throw Error('Sessão contém questões repetidas.');
 const minutes=Math.max(0,Number(config.minutes)||0);
 return {id:`exam-${now}-${Math.random().toString(36).slice(2,8)}`,questionIds:items.map(q=>q.id),questionSnapshots:JSON.parse(JSON.stringify(items)),optionOrders:Object.fromEntries(items.map(q=>[q.id,shuffle(q.o.map((_,i)=>i))])),answers:{},flags:{},step:0,remainingMs:minutes?minutes*60000:null,lastTick:now,paused:false,done:false,elapsedMs:0,config:{...config}};
}
function tick(active,now=Date.now()){
 if(!active||active.done)return active;const delta=Math.max(0,now-(active.lastTick??now));active.lastTick=Math.max(now,active.lastTick??now);
 if(!active.paused){const consumed=active.remainingMs===null?delta:Math.min(delta,Math.max(0,active.remainingMs));active.elapsedMs+=consumed;if(active.remainingMs!==null)active.remainingMs=Math.max(0,active.remainingMs-consumed);}return active;
}
function finish(active,now=Date.now()){
 if(active.result)return active.result;tick(active,now);active.done=true;const byTopic={},byLevel={},bySubtopic={};let score=0;
 const items=active.questionSnapshots.map(q=>{const answer=active.answers[q.id],correct=answer===q.a;if(correct)score++;for(const [obj,key] of [[byTopic,q.t],[byLevel,q.level],[bySubtopic,q.subtopic]]){obj[key]||={correct:0,total:0};obj[key].total++;obj[key].correct+=Number(correct);}return {id:q.id,module:q.module,t:q.t,subtopic:q.subtopic,level:q.level,answer:answer??null,correct,elapsedMs:active.times?.[q.id]||0};});
 const total=items.length;active.result={id:active.id,date:new Date(now).toISOString(),score,total,percent:total?Math.round(score/total*100):0,elapsedMs:active.elapsedMs,byTopic,byLevel,bySubtopic,items};return active.result;
}
const api={bank,normalize,signature,distinct,audit,valid,shuffle,quotas,select,create,tick,finish};root.ExamEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
