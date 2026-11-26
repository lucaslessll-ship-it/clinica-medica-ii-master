/* Banco de Urgência e Emergência: sessões, simulados e catálogo de provas.
   Compatível com CourseKit, QuestionHistory e store.study sem tocar nas outras disciplinas. */
(function(){
'use strict';
const E=()=>window.Emergency;
const DATA=()=>E()?.ordered(window.EMERGENCY_CONTENT||[])||[];
const ADD=()=>window.UE_BANK_EXTRA||[];
const SOURCES=()=>window.UE_BANK_SOURCES||{};
const ORIGINALS=()=>window.UE_BANK_ORIGINALS||[];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const MAX=120,ALPHABET='ABCDE',STAGES=['P1','P2'];
const defaultFilter=()=>({types:['mastery','fixacao','modelo','prova'],levels:[null,1,2,3],themes:DATA().map(m=>m.id),stages:['P1','P2'],count:20,minutes:60,status:'all'});
let filter=defaultFilter(),view='setup',current=null,scope='';
const kindForRoute=()=>ui.route==='emergency-simulado'?'exam':'practice';
const activeKey=kind=>kind==='exam'?'activeQuestionExamId':'activeQuestionPracticeId';
const bank=()=>{
 const root=store.study||(store.study={version:1,reviews:{},steps:{}});
 const b=root.ueQuestions||(root.ueQuestions={results:{},questionSessions:[],questionLegacyImported:true,exams:[],version:2});
 b.results=b.results||{};b.questionSessions=b.questionSessions||[];b.exams=b.exams||[];
 return b;
};
const persist=()=>{try{stateSave();}catch(e){console.warn('Falha ao salvar Urgência',e);}};
const title=id=>E()?.titleFor(id)||id;
const pool=()=>[
 ...(window.EmergencyMastery?.questions()||[]).map(q=>({...q,stage:DATA().find(m=>m.id===q.t)?.stage})),
 ...DATA().flatMap(m=>m.quiz.map((q,i)=>({id:'ue-fix-'+m.id+'-'+i,t:m.id,stage:m.stage,kind:'fixacao',
  level:q.editorialLevel??null,q:q.q,o:[...q.o],a:q.a,why:q.why,revision:'base-2026',origin:'Curso Clínica Master',extra:m.sections.find(x=>x.p?.length)?.p?.[0]||''}))),
 ...ADD().map(q=>{const m=DATA().find(x=>x.id===q.t),deep=m?.sections?.[4]||m?.sections?.[2]||m?.sections?.[0];return {...q,level:q.editorialLevel??null,stage:m?.stage,
  extra:(q.kind==='prova'?'Adaptação de prova pública; consulte o PDF para o enunciado original. ':'')+
   (deep?.h?deep.h+': ':'')+(Array.isArray(deep?.p)?deep.p.join(' '):'')};})
];
let catalog;
const questions=()=>catalog||(catalog=pool());
const get=id=>questions().find(q=>q.id===id);
const kindLabels={mastery:'Mastery · autoral',fixacao:'Fixação da aula',modelo:'Modelo residência',prova:'Provas reais · adaptadas'};
const randomize=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const formatTime=ms=>{let v=Math.max(0,Math.floor(ms/1000));return String(Math.floor(v/60)).padStart(2,'0')+':'+String(v%60).padStart(2,'0');};
const timerActive=run=>!!run&&!run.done&&run.kind==='exam'&&run.minutes>0;
const remain=run=>!run?.deadline?Infinity:run.deadline-Date.now();
function eligible(criteria=filter){
 const b=bank();
 return questions().filter(q=>criteria.types.includes(q.kind)&&criteria.levels.includes(q.level)&&criteria.stages.includes(q.stage)&&
  (criteria.status==='all'||criteria.status==='wrong'&&b.results[q.id]?.correct===false||
   criteria.status==='correct'&&b.results[q.id]?.correct===true||criteria.status==='new'&&!b.results[q.id]||
   criteria.status==='favorite'&&b.favorites?.[q.id]));
}
const filtered=()=>eligible().filter(q=>filter.themes.includes(q.t));
const metrics=()=>{
 const b=bank(),qs=questions(),answered=qs.filter(q=>b.results[q.id]),correct=answered.filter(q=>b.results[q.id].correct);
 return {total:qs.length,answered:answered.length,correct:correct.length,sessions:b.questionSessions.length};
};
function selected(button,val,chosen){return '<button type="button" class="ue-choice '+(chosen?'active':'')+'" aria-pressed="'+chosen+'" onclick="'+esc(button)+'">'+esc(val)+'</button>';}
function setFilter(name,value){
 if(name==='count')filter.count=Math.min(MAX,Math.max(1,Math.trunc(Number(value))||20));
 else if(name==='minutes')filter.minutes=Math.min(300,Math.max(0,Math.trunc(Number(value))||0));
 else if(name==='status'&&['all','wrong','correct','new','favorite'].includes(value))filter.status=value;
 else return;
 render();
}
function selectStage(value){
 if(!['P1','P2','all'].includes(value))return;
 filter.stages=value==='all'?[...STAGES]:[value];render();
}
function allThemes(){filter.themes=DATA().map(x=>x.id);render();}
function noThemes(){filter.themes=[];render();}
function toggleTheme(id){
 if(!DATA().some(x=>x.id===id))return;
 filter.themes=filter.themes.includes(id)?filter.themes.filter(x=>x!==id):[...filter.themes,id];
 render();
}
function toggleValue(key,v){
 if(!['types','levels','stages'].includes(key))return;
 const a=filter[key],value=key==='levels'&&v!==null?Number(v):v;
 filter[key]=a.includes(value)?a.filter(x=>x!==value):[...a,value];
 render();
}
function setMode(v){view=v;render();}
function favorite(id){if(!get(id))return;const b=bank();const map=b.favorites||(b.favorites={});map[id]=!map[id];persist();render();}
function active(){
 if(!current)return null;
 return QuestionHistory.restore(bank(),current.kind,current.id);
}
function create(kind,preset){
 if(!['practice','exam'].includes(kind))return;
 scope=kind==='exam'?'emergency-simulado':'emergency-questions';
 const list=preset?.items||filtered();
 if(!list.length){window.toast?.('Selecione filtros com questões disponíveis.');return;}
 const ids=(preset?.items?list:randomize(list).slice(0,filter.count)).map(q=>q.id);
 const now=Date.now(),minutes=kind==='exam'?(preset?.minutes??filter.minutes):0;
 const keys=randomize([0,1,2,3,4]);
 const balanced=preset?.balanced===true;
 const run={kind,ids,step:0,done:kind==='practice'?{}:false,ans:{},flags:{},
 orders:Object.fromEntries(ids.map((id,index)=>{
  const item=get(id),order=randomize(item.o.map((_,i)=>i));
  if(balanced){
   const from=order.indexOf(item.a),to=keys[index%keys.length];
   [order[from],order[to]]=[order[to],order[from]];
  }
  return [id,order];
 })),started:now,minutes,
 deadline:minutes>0?now+minutes*60000:0,filters:JSON.parse(JSON.stringify(filter)),score:0,retestOf:preset?.retestOf};
 QuestionHistory.begin(bank(),'ue',kind,run,preset?.label||(kind==='exam'?'Simulado':'Treino')+' · '+ids.length+' questões');
 current={kind,id:run.sessionId};
 window.QuestionReview?.begin?.('ue',kind==='exam'?'Simulado de Urgência':'Questões de Urgência');
 persist();view='run';navigate(kind==='exam'?'emergency-simulado':'emergency-questions');
}
function ready(){
 const items=questions().filter(q=>q.kind==='mastery'&&q.t==='arritmias');
 if(items.length)create('exam',{items:randomize(items),balanced:true,minutes:30,label:'Arritmias cardíacas · Simulado Mastery'});
}
function retest(id){
 const q=get(id);if(!q||q.kind!=='mastery')return;
 const candidates=questions().filter(x=>x.t===q.t&&x.chapter===q.chapter&&x.kind==='mastery'&&x.id!==id);
 const results=bank().results;
 candidates.sort((a,b)=>Number(!!results[a.id])-Number(!!results[b.id]));
 const alternate=candidates[0];
 if(alternate)create('practice',{items:[alternate],retestOf:id,label:'Reteste · '+title(q.t)});
 else{
  window.EmergencyMastery?.openConcept(q.t,q.chapter,'q:'+id);
 }
}
function flag(){
 const r=active();if(!r||r.kind!=='exam'||r.done)return;
 const flags=r.flags||(r.flags={}),id=r.ids[r.step];flags[id]=!flags[id];
 QuestionHistory.touch(bank(),r.kind,r);persist();render();
}
function jump(i){
 const r=active();if(!r||!r.ids?.length)return;
 r.step=Math.max(0,Math.min(r.ids.length-1,Number(i)||0));
 QuestionHistory.touch(bank(),r.kind,r,r.done===true);persist();render();
 document.getElementById('ue-question-title')?.focus({preventScroll:true});
}
function saveResult(q,chosen,ok,confidence=null){
 const b=bank(),before=b.results[q.id];b.results[q.id]={answer:chosen,correct:ok,at:new Date().toISOString(),
  attempts:(before?.attempts||0)+1,revision:q.revision,kind:q.kind,topic:q.t,level:q.level,confidence};
}
function answer(choice){
 const r=active();if(!r||r.done===true)return;
 const id=r.ids[r.step],q=get(id);if(!q||!Number.isInteger(choice)||choice<0||choice>=q.o.length)return;
 if(r.kind==='practice'){
  if(r.done[id])return;
  const ok=choice===q.a,confidence=document.getElementById('ue-answer-confidence')?.value||null;
  r.done[id]={chosen:choice,ok,confidence,answeredAt:new Date().toISOString(),order:r.orders[id]};
  saveResult(q,choice,ok,confidence);
  if(q.kind==='mastery')window.EmergencyMastery?.recordQuestion(q,ok,r.retestOf?'q:'+r.retestOf:undefined);
  window.QNav?.registrar?.('ue',q.id,ok,{tid:q.t,tema:title(q.t),q:q.q});
 }else{
  if(timerActive(r)&&remain(r)<=0){finish(false,true);return;}
  r.ans[id]=choice;
 }
 QuestionHistory.touch(bank(),r.kind,r);persist();render();
}
function finish(confirmUnanswered=true,expired=false){
 const r=active();if(!r||r.done===true)return;
 if(r.kind==='practice'){
  QuestionHistory.touch(bank(),'practice',r,true);
  current=null;view='setup';persist();render();return;
 }
 const n=Object.keys(r.ans).length;
 if(confirmUnanswered&&n<r.ids.length&&!window.confirm('Há '+(r.ids.length-n)+' questões sem resposta. Finalizar e corrigir?'))return;
 r.done=true;r.finishedAt=Date.now();
 r.score=0;
 for(const id of r.ids){
  const q=get(id);if(!q||r.ans[id]===undefined)continue;
  const ok=r.ans[id]===q.a;r.score+=Number(ok);
  saveResult(q,r.ans[id],ok);
  if(q.kind==='mastery')window.EmergencyMastery?.recordQuestion(q,ok);
  window.QNav?.registrar?.('ue',q.id,ok,{tid:q.t,tema:title(q.t),q:q.q});
 }
 bank().exams.push({at:new Date().toISOString(),score:r.score,total:r.ids.length,id:r.sessionId,minutes:r.minutes,expired});
 QuestionHistory.touch(bank(),'exam',r,true);
 persist();render();
}
function resume(id){
 const b=bank(),session=b.questionSessions.find(x=>x.id===id);if(!session)return;
 if(session.kind==='legacy'){window.toast?.('Sessão legada disponível no histórico, sem prova em andamento.');return;}
 const r=QuestionHistory.restore(b,session.kind,id);
 if(!r)return;
 current={kind:session.kind,id};view='run';scope=session.kind==='exam'?'emergency-simulado':'emergency-questions';
 b[activeKey(session.kind)]=id;
 persist();navigate(session.kind==='exam'?'emergency-simulado':'emergency-questions');
}
function clearQuestionHistory(){
 if(!window.confirm('Limpar TODO o histórico de questões de Urgência e Emergência? As aulas, notas e resultados de outras disciplinas serão preservados.'))return;
 const b=bank();QuestionHistory.clear(b,'ue');
 b.exams=[];current=null;view='setup';persist();render();
}
function history(){return window.QuestionHistory?QuestionHistory.panel(bank(),'ue','UEQuestions',false):'';}
function externalSources(){
 const files=SOURCES(),filtered=ORIGINALS().filter(x=>filter.themes.includes(x.theme)&&filter.stages.includes(DATA().find(m=>m.id===x.theme)?.stage)),total=filtered.length;
 return '<section class="card pad ue-bank-originals"><div class="ue-bank-heading"><div><span class="kicker">CADERNOS OFICIAIS CONFERIDOS</span><h2>Questões reais de provas</h2><p>Índice por tema com banca, ano e número da questão. Clique para ler o enunciado <b>original</b> no PDF. Não foram republicados integralmente os enunciados das bancas nem inventados gabaritos oficiais.</p></div><strong>'+total+' localizadas</strong></div><div class="ue-bank-source-grid">'+filtered.map(v=>{
  const s=files[v.source];
  return '<a class="ue-bank-source" target="_blank" rel="noopener noreferrer" href="'+esc(v.link)+'"><small>'+esc(s.label)+' · Q'+v.number+'</small><strong>'+esc(v.subject)+'</strong><span>'+esc(title(v.theme))+' · abrir no PDF ↗</span>'+(v.key?'<span>Gabarito publicado: <b>'+esc(v.key)+'</b></span>':'')+'</a>';
 }).join('')+'</div><p class="subtle">ENARE 2021/2022: o endereço original não pôde ser conferido; <a target="_blank" rel="noopener noreferrer" href="'+esc(files.enare.url)+'">consulte o índice oficial</a>. Apenas itens verificados aparecem nesta seleção.</p></section>';
}
function progressDots(r){
 const answerFor=id=>r.kind==='exam'?r.ans[id]:(r.done[id]?.chosen);
 return '<div class="ue-bank-dots" aria-label="Navegação entre questões">'+r.ids.map((id,i)=>{
 const a=answerFor(id),answered=Number.isInteger(a),q=get(id),ok=answered&&(r.kind==='practice'||r.done===true)?a===q?.a:null;
 let cls=ok===true?'right':ok===false?'wrong':answered?'answered':'pending';
 const status=ok===true?'correta':ok===false?'incorreta':answered?'respondida':'pendente';
 return '<button type="button" class="ue-bank-dot '+cls+' '+(i===r.step?'current':'')+'" aria-label="Questão '+(i+1)+(', '+status+(r.flags?.[id]?', marcada para revisão':''))+'" aria-current="'+(i===r.step?'step':'false')+'" onclick="UEQuestions.jump('+i+')">'+(i+1)+(r.flags?.[id]?' <span aria-hidden="true">⚑</span>':'')+'</button>';
 }).join('')+'</div>';
}
function details(q,answer,show){
 if(!show)return '';
 const ok=answer===q.a,explanation=esc(q.why||'');
 if(q.rationales)return '<div class="ue-bank-feedback '+(ok?'right':'wrong')+'" role="status"><strong>'+(ok?'Você acertou.':answer===undefined?'Questão sem resposta.':'Você errou.')+'</strong><p>Gabarito: '+esc(q.o[q.a])+'</p></div>'+window.EmergencyMastery.explanation(q);
 const source=q.sourceLink?'<p><a href="'+esc(q.sourceLink)+'" target="_blank" rel="noopener noreferrer">Abrir questão original no PDF ↗</a>'+(q.verifiedKey?' · Gabarito publicado da original: <b>'+esc(q.verifiedKey)+'</b>':'')+'</p>':'';
 const addition=q.extra?'<details class="ue-bank-deep"><summary>Aprofundamento resumido</summary><p>'+esc(q.extra)+'</p><button class="btn secondary" onclick="navigate('+(q.stage==='P1'? "'emergency-p1'":"'emergency-p2'")+');Emergency.'+(q.stage==='P1'?'p1':'p2')+'.open('+DATA().filter(m=>m.stage===q.stage).findIndex(m=>m.id===q.t)+')">Estudar aula completa →</button></details>':'';
 return '<div class="ue-bank-feedback '+(ok?'right':'wrong')+'"><strong>'+(ok?'Resposta correta.':'Revise esta questão.')+'</strong><p>Gabarito: <b>'+esc(q.o[q.a])+'</b></p><p>'+explanation+'</p>'+source+addition+'</div>';
}
function sessionView(){
 const r=active();if(!r){view='setup';return setupView();}
 const id=r.ids[r.step],q=get(id);if(!q)return '<section class="card pad">Questão antiga não encontrada. Volte ao banco e inicie uma nova sessão.</section>';
 const answer=r.kind==='exam'?r.ans[id]:(r.done[id]?.chosen),show=r.kind==='practice'?!!r.done[id]:!!r.done;
 const answered=r.kind==='exam'?Object.keys(r.ans).length:Object.keys(r.done).length;
 const submitted=r.kind==='exam'&&r.done;
 return '<section class="emergency-page ue-bank-page ue-master" '+(r.kind==='exam'&&!submitted?'data-posology-suppressed':'')+'><nav class="pocus-crumb"><button class="btn" onclick="UEQuestions.setMode(\'setup\')">← Configurações</button><span>'+(r.kind==='exam'?'Simulado':'Treino')+' · '+answered+'/'+r.ids.length+' respondidas</span></nav>'+
 '<div class="ue-bank-heading"><div><span class="kicker">'+(r.kind==='exam'?'MODO PROVA':'ESTUDO COM FEEDBACK')+'</span><h1>'+(r.done===true?'Correção do simulado':'Questão '+(r.step+1)+' de '+r.ids.length)+'</h1><p>'+(submitted?'Resultado: '+r.score+' / '+r.ids.length+' acertos':'Respostas registradas automaticamente após cada seleção.')+'</p></div>'+
 (r.kind==='exam'&&r.minutes>0?'<div class="ue-bank-clock" aria-live="off"><span>Tempo restante</span><strong id="ue-bank-timer">'+(submitted?'Finalizado':formatTime(remain(r)))+'</strong></div>':'')+'</div>'+
 progressDots(r)+'<article class="card pad ue-bank-question"><div class="ue-bank-meta"><span>'+esc(title(q.t))+'</span><span>'+esc(kindLabels[q.kind])+'</span><span>'+(q.level?'N'+q.level:'Nível não auditado')+'</span><button type="button" class="btn ghost" aria-pressed="'+!!bank().favorites?.[id]+'" onclick="UEQuestions.favorite(\''+esc(id)+'\')">'+(bank().favorites?.[id]?'★ Favorita':'☆ Favoritar')+'</button></div>'+
 '<h2 tabindex="-1" id="ue-question-title">'+esc(q.q)+'</h2>'+(q.sourceLink?'<p class="ue-bank-provenance">Adaptação didática, não transcrição literal. <a href="'+esc(q.sourceLink)+'" target="_blank" rel="noopener noreferrer">Ver a questão original no PDF ↗</a></p>':'')+
 (!show&&r.kind==='practice'&&q.kind==='mastery'?'<label class="ue-answer-confidence">Confiança antes de responder <select id="ue-answer-confidence"><option value="">Escolher (opcional)</option><option value="seguro">Tenho segurança</option><option value="duvida">Tenho dúvida</option><option value="tentativa">Vou tentar</option></select></label>':'')+
 '<div class="ue-bank-options">'+r.orders[id].map((orig,i)=>{
  const correct=show&&orig===q.a,wrong=show&&orig!==q.a;
  const letter=ALPHABET[i],picked=answer===orig;
  const content='<b>'+letter+'</b><span>'+esc(q.o[orig])+(show?'<small class="ue-option-verdict">'+(correct?'Correta':'Incorreta')+(picked?' · Sua resposta':'')+'</small>':'')+'</span>';
  const cls='ue-bank-option '+(picked?'picked ':'')+(correct?'right ':wrong?'wrong ':'');
  return show?'<div class="'+cls+'">'+content+(q.rationales?'<p class="ue-option-why">'+esc(q.rationales[orig])+'</p>':'')+'</div>':
   '<button type="button" class="'+cls+'" aria-pressed="'+picked+'" onclick="UEQuestions.answer('+orig+')">'+content+'</button>';
 }).join('')+'</div>'+
 details(q,answer,show)+'<div class="ue-bank-actions"><button class="btn" onclick="UEQuestions.jump('+(r.step-1)+')" '+(r.step===0?'disabled':'')+'>← Anterior</button>'+
 '<button class="btn primary" onclick="UEQuestions.jump('+(r.step+1)+')" '+(r.step===r.ids.length-1?'disabled':'')+'>Próxima →</button>'+
 (r.kind==='exam'&&!r.done?'<button class="btn secondary" aria-pressed="'+!!r.flags?.[id]+'" onclick="UEQuestions.flag()">'+(r.flags?.[id]?'Remover marcação':'Marcar para revisão')+'</button><button class="btn secondary" onclick="UEQuestions.finish()">Entregar simulado</button>':r.kind==='practice'?'<button class="btn secondary" onclick="UEQuestions.finish(false)">Encerrar treino</button>':'')+'</div></article>'+
 (submitted?summary(r):'')+history()+'</section>';
}
function refazerErros(){
 const run=active();if(!run?.done||run.kind!=='exam')return;
 const items=run.ids.map(get).filter(q=>q&&run.ans[q.id]!==undefined&&run.ans[q.id]!==q.a);
 if(items.length)create('practice',{items,label:'Revisão dos erros do simulado'});
}
function summary(r){
 const buckets={};
 for(const id of r.ids){
  const q=get(id);if(!q)continue;
  const key=q.competency||title(q.t),b=buckets[key]||(buckets[key]=[0,0]);b[1]++;b[0]+=Number(r.ans[id]===q.a);
 }
 const target=window.EmergencyMastery?.target('arritmias')||90;
 const onlyArr=r.ids.every(id=>get(id)?.t==='arritmias'&&get(id)?.kind==='mastery');
 const wrong=r.ids.filter(id=>r.ans[id]!==undefined&&r.ans[id]!==get(id)?.a);
 return '<div class="card pad ue-bank-summary"><h2>Seu desempenho</h2><p><strong>'+r.score+' de '+r.ids.length+'</strong> acertos ('+Math.round(r.score/r.ids.length*100)+ '%).'+(onlyArr?' Meta: '+target+'%.':'')+'</p>'+
 '<ul>'+Object.entries(buckets).map(([label,[correct,total]])=>'<li>'+esc(label)+' · '+correct+' / '+total+'</li>').join('')+'</ul>'+
 (wrong.length?'<p>Questões erradas: '+wrong.map(id=>r.ids.indexOf(id)+1).join(', ')+'.</p><button class="btn secondary" onclick="UEQuestions.refazerErros()">Refazer só os erros</button>':'')+
 '<button class="btn primary" onclick="UEQuestions.setMode(\'setup\')">Gerar novo simulado</button></div>';
}
function setupView(){
 const s=metrics(),available=filtered(),expected=kindForRoute(),exam=expected==='exam';
 const b=bank(),session=b.questionSessions.find(item=>item.id===b[activeKey(expected)]&&item.status==='active');
 const group=(name,label,values,fn)=>'<div class="ue-bank-filter-group"><strong>'+label+'</strong><div class="ue-bank-choices">'+values.map(([value,text])=>selected(fn+'('+JSON.stringify(value)+')',text,filter[name].includes(value))).join('')+'</div></div>';
 const types=Object.entries(kindLabels).map(([key,label])=>[key,label+' · '+questions().filter(q=>q.kind===key).length]);
 const selectedStage=filter.stages.length===2?'all':filter.stages[0];
 const shown=DATA().filter(m=>filter.stages.includes(m.stage));
 const legacy=store.study?.ueExam?.active;
 const countByTheme={};for(const q of eligible())countByTheme[q.t]=(countByTheme[q.t]||0)+1;
 const mastery=questions().filter(q=>q.kind==='mastery'&&q.t==='arritmias').length;
 return '<section class="emergency-page ue-bank-page ue-master"><header class="ue-master-hero"><span class="kicker">URGÊNCIA E EMERGÊNCIA</span><h1>'+(exam?'Simulados':'Exercícios')+'</h1><p>'+(exam?'Escolha uma prova pronta ou gere um simulado com seus filtros. O gabarito aparece após a entrega.':'Responda uma questão por vez e veja a correção em seguida.')+'</p>'+
 (exam||session?'<div class="ue-master-actions">'+
  (exam?'<button type="button" class="btn secondary" onclick="UEQuestions.goGenerator()">Gerar simulado</button>':'')+
  (session?'<button class="btn primary" onclick="UEQuestions.openQuestionSession(\''+esc(session.id)+'\')">Retomar '+(exam?'simulado':'treino')+'</button>':'')+'</div>':'')+'</header>'+
 (exam?'<section class="ue-master-block"><header><div><h2>Simulados prontos</h2></div></header>'+
 (mastery?'<div class="ue-ready-exam"><div><strong>Arritmias cardíacas · P2</strong><p>'+mastery+' questões Mastery · 30 minutos</p></div><button class="btn primary" onclick="UEQuestions.ready()">Iniciar simulado pronto</button></div>':'')+
 (legacy?'<p><button class="btn secondary" onclick="Emergency.startExam(true)">Abrir sessão P2 anterior</button></p>':'')+'</section>':'')+
 '<div class="ue-bank-stats"><div><strong>'+s.total+'</strong><span>Questões avaliáveis</span></div><div><strong>'+s.answered+'</strong><span>Respondidas</span></div><div><strong>'+s.correct+'</strong><span>Acertos</span></div><div><strong>'+s.sessions+'</strong><span>Sessões</span></div></div>'+
 '<section class="card pad ue-bank-config" id="ue-bank-config"><div class="ue-bank-heading"><div><h2 tabindex="-1">'+(exam?'Gerar simulado':'Montar treino')+'</h2><p>Filtre por prova, tema, origem, nível e histórico.</p></div><span role="status">'+available.length+' questões disponíveis</span></div>'+
 '<div class="ue-bank-filter-group"><strong>Período</strong><div class="ue-bank-choices">'+[['P1','P1'],['P2','P2'],['all','Cumulativa']].map(([key,label])=>selected('UEQuestions.selectStage('+JSON.stringify(key)+')',label,selectedStage===key)).join('')+'</div></div>'+
 group('types','Origem das questões',types,'UEQuestions.toggleType')+
 group('levels','Dificuldade editorial',[[1,'N1 · Essencial'],[2,'N2 · Aplicação'],[3,'N3 · Decisão'],[null,'Não auditada']],'UEQuestions.toggleLevel')+
 '<div class="ue-bank-filter-group"><div class="ue-bank-heading"><strong>Temas ('+shown.filter(m=>filter.themes.includes(m.id)).length+' de '+shown.length+')</strong><div class="btn-row"><button type="button" class="btn ghost" onclick="UEQuestions.allThemes()">Todos</button><button type="button" class="btn ghost" onclick="UEQuestions.noThemes()">Nenhum</button></div></div><div class="ue-bank-themes">'+shown.map(m=>'<label><input type="checkbox" '+(filter.themes.includes(m.id)?'checked':'')+' onchange="UEQuestions.toggleTheme(\''+m.id+'\')"><span>'+esc(title(m.id))+' <strong>· '+(countByTheme[m.id]||0)+'</strong></span></label>').join('')+'</div></div>'+
 '<div class="ue-bank-filter-group"><strong>Histórico</strong><div class="ue-bank-choices">'+[['all','Todas'],['new','Inéditas'],['wrong','Erradas'],['correct','Acertadas'],['favorite','Favoritas']].map(([key,label])=>selected('UEQuestions.setFilter("status",'+JSON.stringify(key)+')',label,filter.status===key)).join('')+'</div></div>'+
 '<div class="ue-bank-parameters"><label>Quantidade de questões<input type="number" min="1" max="'+MAX+'" value="'+filter.count+'" onchange="UEQuestions.setFilter(\'count\',this.value)"></label>'+
 (exam?'<label>Tempo do simulado (min; 0 = sem limite)<input type="number" min="0" max="300" value="'+filter.minutes+'" onchange="UEQuestions.setFilter(\'minutes\',this.value)"></label>':'')+'</div>'+
 '<div class="ue-bank-buttons"><button class="btn primary" '+(!available.length?'disabled':'')+' onclick="UEQuestions.create(\''+expected+'\')">'+(exam?'Gerar simulado':'Iniciar exercícios')+' · '+Math.min(filter.count,available.length)+' questões</button></div></section>'+
 history()+externalSources()+'</section>';
}
function goGenerator(){
 const config=document.getElementById('ue-bank-config');
 config?.scrollIntoView({block:'start'});
 config?.querySelector('h2')?.focus({preventScroll:true});
}
function page(){
 setup(ui.route);
 if(view==='run'&&(!current||current.kind!==kindForRoute())){current=null;view='setup';}
 return view==='run'?sessionView():setupView();
}
function open(route,id){
 filter=defaultFilter();
 if(id&&DATA().some(m=>m.id===id)){
  const theme=DATA().find(m=>m.id===id);
  filter.themes=[id];filter.stages=[theme.stage];
  if(questions().some(q=>q.t===id&&q.kind==='mastery'))filter.types=['mastery'];
 }
 view='setup';current=null;scope=route;navigate(route);
}
const openExam=id=>open('emergency-simulado',id);
const openQuestions=id=>open('emergency-questions',id);
function setup(route){
 if(scope!==route){filter=defaultFilter();scope=route;}
}
const exposed={page,openExam,openQuestions,create,answer,jump,finish,setMode,setFilter,allThemes,noThemes,toggleTheme,selectStage,ready,goGenerator,favorite,flag,retest,refazerErros,
 toggleType:v=>toggleValue('types',v),toggleStage:v=>toggleValue('stages',v),toggleLevel:v=>toggleValue('levels',v),
 openQuestionSession:resume,clearQuestionHistory,metrics,pool,filtered,originals:ORIGINALS,history};
window.UEQuestions=exposed;
window.addEventListener?.('master-auth-ended',()=>{filter=defaultFilter();view='setup';current=null;scope='';});
setInterval(()=>{if(typeof ui==='undefined'||ui.route!=='emergency-simulado')return;const r=active();if(!timerActive(r))return;const ms=remain(r),el=document.getElementById('ue-bank-timer');if(el)el.textContent=formatTime(ms);if(ms<=0)finish(false,true);},1000);
})();