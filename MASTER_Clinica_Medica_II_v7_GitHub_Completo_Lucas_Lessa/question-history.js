/* Persistência e histórico de sessões de treino e simulado (P1, P2, Cirurgia). */
window.QuestionHistory=(function moduleSource(){
'use strict';
const BANK_KEYS=['master_p2_lucas_v1','master_p1_lucas_v4','master_cir_lucas_v1'];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clone=v=>JSON.parse(JSON.stringify(v));
const when=v=>Number(new Date(v||0))||0;
const now=()=>new Date().toISOString();
const byDate=(a,b)=>when(b.updatedAt||b.startedAt)-when(a.updatedAt||a.startedAt);
const equals=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function ensure(state,bank){
 state.questionSessions=Array.isArray(state.questionSessions)?state.questionSessions:[];
 if(!state.questionLegacyImported){
  state.questionLegacyImported=true;
  const answers=Object.entries(state.results||{});
  if(answers.length){
   const done=Object.fromEntries(answers.map(([id,r])=>[id,{chosen:r.answer,ok:!!r.correct,answeredAt:r.at||r.date||now()}]));
   const dates=answers.map(([,r])=>r.at||r.date).filter(Boolean).sort();
   state.questionSessions.unshift({id:'legacy-'+bank,bank,kind:'legacy',label:'Respostas anteriores',startedAt:dates[0]||'',updatedAt:dates.at(-1)||'',status:'completed',run:{ids:answers.map(([id])=>id),done,step:answers.length}});
  }
 }
 return state.questionSessions;
}
function newId(bank){return bank+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9);}
function begin(state,bank,kind,run,label){
 ensure(state,bank);
 const id=newId(bank),date=now();
 run.sessionId=id;run.startedAt=date;
 state.questionSessions.push({id,bank,kind,label:label||'',startedAt:date,updatedAt:date,status:'active',run:clone(run)});
 state[kind==='exam'?'activeQuestionExamId':'activeQuestionPracticeId']=id;
 return run;
}
function touch(state,kind,run,finished=false){
 if(!run)return;
 let found=state.questionSessions?.find(s=>s.id===run.sessionId);
 if(!found||found.kind!==kind)return;
 found.run=clone(run);
 found.updatedAt=now();
 found.status=finished?'completed':run.step>=run.ids.length&&kind==='practice'?'viewed':'active';
 state[kind==='exam'?'activeQuestionExamId':'activeQuestionPracticeId']=found.id;
}
function restore(state,kind,id){
 const session=(state.questionSessions||[]).find(x=>x.id===(id||state[kind==='exam'?'activeQuestionExamId':'activeQuestionPracticeId']));
 if(!session||session.kind!==kind||!session.run||!Array.isArray(session.run.ids))return null;
 return clone(session.run);
}
function summary(session){
 const run=session.run||{},total=run.ids?.length||0;
 const answers=session.kind==='exam'?(run.ans||run.answers||{}):(run.done||{});
 const answered=Object.keys(answers).length;
 const correct=session.kind==='exam'
  ?(run.done===true?Number(run.score??0):null)
  :Object.values(answers).filter(x=>x?.ok===true).length;
 return {total,answered,correct};
}
function labelKind(session){
 if(session.kind==='legacy')return 'Respostas anteriores';
 if(session.kind==='exam')return 'Simulado';
 return 'Treino';
}
function row(session,handler,latest){
 const {total,answered,correct}=summary(session);
 const date=new Date(session.startedAt);
 const local=session.startedAt&&Number.isFinite(date.getTime())?date.toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}):'Data não registrada';
 const shown=correct===null?'acertos ao entregar':correct+' acertos';
 const status=correct===null?'Aguardando entrega':session.status==='completed'?'Concluída':session.status==='viewed'?'Resultado consultado':'Em andamento';
 const action=`<button type="button" class="btn qhistory-open" onclick="${handler}.openQuestionSession('${esc(session.id)}')">${session.kind==='legacy'?'Rever respostas salvas':session.kind==='exam'&&!session.run?.done?'Retomar simulado':session.status==='completed'||session.status==='viewed'?'Ver resultado':'Retomar sessão'}</button>`;
 return `<div class="qhistory-entry ${latest?'qhistory-latest':''}"><div class="qhistory-entry-main"><strong>${latest?'Última sessão · ':''}${labelKind(session)}${session.label?' · '+esc(session.label):''}</strong><small>${local} · ${esc(status)}</small><span><b>${answered}/${total}</b> questões respondidas · <b>${shown}</b></span></div>${action}</div>`;
}
function panel(state,bank,handler){
 ensure(state,bank);
 const arr=[...state.questionSessions].sort(byDate),last=arr[0],older=arr.slice(1);
 const totalAnswered=Object.keys(state.results||{}).length;
 const all=arr.length?`<div class="qhistory-overview"><span><b>${totalAnswered}</b> questões com resposta registrada</span><span><b>${arr.length}</b> sessões armazenadas</span></div>${row(last,handler,true)}${older.length?`<details class="qhistory-all"><summary>Ver todas as ${arr.length} sessões anteriores</summary><div class="qhistory-list">${older.map(s=>row(s,handler,false)).join('')}</div></details>`:''}`:'<p class="subtle">Nenhuma sessão registrada ainda. Suas próximas respostas serão salvas automaticamente.</p>';
 return `<section class="card pad qhistory" aria-label="Histórico das questões"><div class="qhistory-header"><div><h2>Histórico de questões</h2><p class="subtle">Respostas salvas automaticamente e sincronizadas com sua conta quando houver conexão.</p></div><button type="button" class="btn qhistory-clear" onclick="${handler}.clearQuestionHistory()">Limpar histórico de questões</button></div>${all}</section>`;
}
function clear(state,bank){
 state.questionResetAt=now();
 state.questionLegacyImported=true;
 state.questionSessions=[];
 state.activeQuestionPracticeId=null;
 state.activeQuestionExamId=null;
 state.results={};
 if(bank==='p2'){state.review={};state.examHistory=[];if(state.study)state.study.reviews={};}
 if(bank==='p1'){state.review={};state.examHistory=[];}
 if(bank==='cir'){state.exams=[];}
 if(window.HIG?.qlog){
  const log=HIG.qlog();Object.keys(log).filter(k=>k.startsWith(bank+':')).forEach(k=>delete log[k]);HIG.qlogSave?.();
 }
}
function datedResult(r){return when(r?.at||r?.date||r?.updatedAt);}
function mapMerge(key,b,l,r){
 const result={...r,...l};
 const all=new Set([...Object.keys(b||{}),...Object.keys(l||{}),...Object.keys(r||{})]);
 for(const k of all){
  const v1=l?.[k],v2=r?.[k],old=b?.[k];
  if(equals(v1,old)&&!equals(v2,old)){if(v2===undefined)delete result[k];else result[k]=v2;}
  else if(!equals(v1,old)&&equals(v2,old)){if(v1===undefined)delete result[k];else result[k]=v1;}
  else if(key==='results'&&v1&&v2)result[k]=datedResult(v2)>datedResult(v1)?v2:v1;
  else if(v1===undefined&&v2!==undefined)result[k]=v2;
  else if(v2===undefined&&v1!==undefined)result[k]=v1;
 }
 return result;
}
function mergeSessions(base,local,remote){
 const out=new Map();
 for(const s of [...(remote||[]),...(local||[])]){
  if(!s?.id)continue;
  const prev=out.get(s.id);
  if(!prev){out.set(s.id,clone(s));continue;}
  const newer=when(s.updatedAt)>=when(prev.updatedAt)?s:prev;
  const older=newer===s?prev:s;
  const combined=clone(newer);
  combined.run=clone(newer.run||{});
  if(newer.kind==='practice'){
   combined.run.done={...(older.run?.done||{}),...(newer.run?.done||{})};
  }else if(newer.kind==='exam'){
   for(const field of ['ans','answers'])if(older.run?.[field]||newer.run?.[field])combined.run[field]={...(older.run?.[field]||{}),...(newer.run?.[field]||{})};
  }
  out.set(s.id,combined);
 }
 return [...out.values()].sort((a,b)=>when(a.startedAt)-when(b.startedAt));
}
function mergeProgressState(base,local,remote){
 const b=base||{},l=local||{},r=remote||{},result={...r,...l};
 for(const key of new Set([...Object.keys(b),...Object.keys(l),...Object.keys(r)])){
  if(['results','questionSessions','questionResetAt','activeQuestionPracticeId','activeQuestionExamId','questionLegacyImported'].includes(key))continue;
  if(equals(l[key],b[key])&&!equals(r[key],b[key]))result[key]=r[key];
  else if(l[key]&&r[key]&&typeof l[key]==='object'&&!Array.isArray(l[key])&&typeof r[key]==='object'&&!Array.isArray(r[key]))
   result[key]=mapMerge(key,b[key],l[key],r[key]);
 }
 const reset=Math.max(when(l.questionResetAt),when(r.questionResetAt));
 result.questionResetAt=reset?new Date(reset).toISOString():undefined;
 result.results=mapMerge('results',b.results,l.results,r.results);
 result.questionSessions=mergeSessions(b.questionSessions,l.questionSessions,r.questionSessions);
 if(reset){
  result.questionSessions=result.questionSessions.filter(s=>when(s.startedAt)>=reset);
  for(const [id,v] of Object.entries(result.results))if(datedResult(v)<reset)delete result.results[id];
 }
 const latest=(key)=>{const idL=l[key],idR=r[key];const sL=result.questionSessions.find(s=>s.id===idL),sR=result.questionSessions.find(s=>s.id===idR);return (when(sR?.updatedAt)>when(sL?.updatedAt)?idR:idL)||null;};
 result.activeQuestionPracticeId=latest('activeQuestionPracticeId');
 result.activeQuestionExamId=latest('activeQuestionExamId');
 result.questionLegacyImported=!!(l.questionLegacyImported||r.questionLegacyImported);
 return result;
}
return {BANK_KEYS,ensure,begin,touch,restore,summary,panel,clear,mergeProgressState};
})();
