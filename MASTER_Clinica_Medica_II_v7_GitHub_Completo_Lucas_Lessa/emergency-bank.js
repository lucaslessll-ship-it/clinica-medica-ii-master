/* Banco de Urgência e Emergência: sessões, simulados e catálogo de provas.
   Compatível com CourseKit, QuestionHistory e store.study sem tocar nas outras disciplinas. */
(function(){
'use strict';
const E=()=>window.Emergency;
const DATA=()=>window.EMERGENCY_CONTENT||[];
const ADD=()=>window.UE_BANK_EXTRA||[];
const SOURCES=()=>window.UE_BANK_SOURCES||{};
const ORIGINALS=()=>window.UE_BANK_ORIGINALS||[];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const MAX=120,ALPHABET='ABCDE',STAGES=['P1','P2'];
const defaultFilter=()=>({types:['fixacao','modelo'],levels:[1,2,3],themes:DATA().map(m=>m.id),stages:['P1','P2'],count:20,minutes:60,onlyWrong:false,onlyUnanswered:false});
let filter=defaultFilter(),view='setup',current=null;
const bank=()=>{
 const root=store.study||(store.study={version:1,reviews:{},steps:{}});
 const b=root.ueQuestions||(root.ueQuestions={results:{},questionSessions:[],questionLegacyImported:true,exams:[],version:2});
 b.results=b.results||{};b.questionSessions=b.questionSessions||[];b.exams=b.exams||[];
 return b;
};
const persist=()=>{try{stateSave();}catch(e){console.warn('Falha ao salvar Urgência',e);}};
const title=id=>DATA().find(m=>m.id===id)?.title||id;
const pool=()=>[
 ...DATA().flatMap(m=>m.quiz.map((q,i)=>({id:'ue-fix-'+m.id+'-'+i,t:m.id,stage:m.stage,kind:'fixacao',
  level:i%3+1,q:q.q,o:[...q.o],a:q.a,why:q.why,revision:'base-2026',origin:'Curso Clínica Master',extra:m.sections.find(x=>x.p?.length)?.p?.[0]||''}))),
 ...ADD().map(q=>({...q,stage:DATA().find(m=>m.id===q.t)?.stage||'P2'}))
];
const get=id=>pool().find(q=>q.id===id);
const randomize=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const formatTime=ms=>{let v=Math.max(0,Math.floor(ms/1000));return String(Math.floor(v/60)).padStart(2,'0')+':'+String(v%60).padStart(2,'0');};
const timerActive=run=>!!run&&!run.done&&run.kind==='exam'&&run.minutes>0;
const remain=run=>!run?.deadline?Infinity:run.deadline-Date.now();
function filtered(){
 const b=bank();return pool().filter(q=>
 filter.types.includes(q.kind)&&filter.levels.includes(q.level)&&filter.stages.includes(q.stage)&&filter.themes.includes(q.t)&&
 (!filter.onlyWrong||b.results[q.id]?.correct===false)&&
 (!filter.onlyUnanswered||!b.results[q.id]));
}
const metrics=()=>{
 const b=bank(),qs=pool(),answered=qs.filter(q=>b.results[q.id]),correct=answered.filter(q=>b.results[q.id].correct);
 return {total:qs.length,answered:answered.length,correct:correct.length,sessions:b.questionSessions.length};
};
function selected(button,val,chosen){return '<button type="button" class="ue-choice '+(chosen?'active':'')+'" aria-pressed="'+chosen+'" onclick="'+button+'">'+esc(val)+'</button>';}
function setFilter(name,value){
 if(!['count','minutes','onlyWrong','onlyUnanswered'].includes(name))return;
 if(name==='count')filter.count=Math.min(MAX,Math.max(1,Number(value)||20));
 else if(name==='minutes')filter.minutes=Math.min(300,Math.max(0,Number(value)||0));
 else filter[name]=!!value;
 persist();render();
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
 const a=filter[key],value=key==='levels'?Number(v):v;
 filter[key]=a.includes(value)?a.filter(x=>x!==value):[...a,value];
 render();
}
function setMode(v){view=v;render();}
function active(){
 if(current)return current;
 const b=bank();
 for(const kind of ['practice','exam']){
  const id=b[kind==='exam'?'activeQuestionExamId':'activeQuestionPracticeId'];
  if(id){const r=QuestionHistory.restore(b,kind,id);if(r&&!r.done){current=r;return r;}}
 }
 return null;
}
function create(kind){
 const b=bank(),eligible=filtered();
 if(!eligible.length){window.toast?.('Selecione pelo menos um tema e um tipo com questões disponíveis.');return;}
 const ids=randomize(eligible.map(x=>x.id)).slice(0,Math.min(filter.count,eligible.length));
 const now=Date.now();
 const run={kind,ids,step:0,done:kind==='practice'?{}:false,ans:{},orders:Object.fromEntries(ids.map(id=>[id,randomize(get(id).o.map((_,i)=>i))])),started:now,
 minutes:kind==='exam'?filter.minutes:0,deadline:kind==='exam'&&filter.minutes>0?now+filter.minutes*60000:0,
 filters:JSON.parse(JSON.stringify(filter)),score:0};
 QuestionHistory.begin(b,'ue',kind,run,(kind==='exam'?'Simulado':'Treino')+' · '+ids.length+' questões');
 current=run;
 window.QuestionReview?.begin?.('ue',kind==='exam'?'Simulado de Urgência':'Questões de Urgência');
 persist();view='run';navigate(kind==='exam'?'emergency-simulado':'emergency-questions');
}
function jump(i){
 const r=active();if(!r||!r.ids?.length)return;
 r.step=Math.max(0,Math.min(r.ids.length-1,Number(i)||0));
 QuestionHistory.touch(bank(),r.kind,r);persist();render();
}
function saveResult(q,chosen,ok){
 const b=bank(),before=b.results[q.id];b.results[q.id]={answer:chosen,correct:ok,at:new Date().toISOString(),
  attempts:(before?.attempts||0)+1,revision:q.revision,kind:q.kind,topic:q.t,level:q.level};
}
function answer(choice){
 const r=active();if(!r||r.done===true)return;
 const id=r.ids[r.step],q=get(id);if(!q||!Number.isInteger(choice)||choice<0||choice>=q.o.length)return;
 if(r.kind==='practice'){
  if(r.done[id])return;
  const ok=choice===q.a;
  r.done[id]={chosen:choice,ok,answeredAt:new Date().toISOString(),order:r.orders[id]};
  saveResult(q,choice,ok);
  window.QNav?.registrar?.('ue',q.id,ok,{tid:q.t,tema:title(q.t),q:q.q});
 }else{
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
 current=r;view='run';
 b[session.kind==='exam'?'activeQuestionExamId':'activeQuestionPracticeId']=id;
 persist();navigate(session.kind==='exam'?'emergency-simulado':'emergency-questions');
}
function clearQuestionHistory(){
 if(!window.confirm('Limpar TODO o histórico de questões de Urgência e Emergência? As aulas, notas e resultados de outras disciplinas serão preservados.'))return;
 const b=bank();QuestionHistory.clear(b,'ue');
 b.exams=[];current=null;view='setup';persist();render();
}
function history(){return window.QuestionHistory?QuestionHistory.panel(bank(),'ue','UEQuestions',false):'';}
function externalSources(){
 const files=SOURCES(),filtered=ORIGINALS().filter(x=>filter.themes.includes(x.theme)),total=filtered.length;
 return '<section class="card pad ue-bank-originals"><div class="ue-bank-heading"><div><span class="kicker">CADERNOS OFICIAIS CONFERIDOS</span><h2>Questões reais de provas</h2><p>Índice por tema com banca, ano e número da questão. Clique para ler o enunciado <b>original</b> no PDF. Não foram republicados integralmente os enunciados das bancas nem inventados gabaritos oficiais.</p></div><strong>'+total+' localizadas</strong></div><div class="ue-bank-source-grid">'+filtered.map(v=>{
  const s=files[v.source];
  return '<a class="ue-bank-source" target="_blank" rel="noopener noreferrer" href="'+esc(v.link)+'"><small>'+esc(s.label)+' · Q'+v.number+'</small><strong>'+esc(v.subject)+'</strong><span>'+esc(title(v.theme))+' · abrir no PDF ↗</span>'+(v.key?'<span>Gabarito publicado: <b>'+esc(v.key)+'</b></span>':'')+'</a>';
 }).join('')+'</div><p class="subtle">ENARE 2021/2022: o endereço original não pôde ser conferido; <a target="_blank" rel="noopener noreferrer" href="'+esc(files.enare.url)+'">consulte o índice oficial</a>. Apenas itens verificados aparecem nesta seleção.</p></section>';
}
function progressDots(r){
 const answerFor=id=>r.kind==='exam'?r.ans[id]:(r.done[id]?.chosen);
 return '<div class="ue-bank-dots" aria-label="Navegação entre questões">'+r.ids.map((id,i)=>{
 const a=answerFor(id),answered=Number.isInteger(a),q=get(id),ok=r.kind==='practice'&&answered?r.done[id]?.ok:null;
 let cls=ok===true?'right':ok===false?'wrong':answered?'answered':'pending';
 return '<button type="button" class="ue-bank-dot '+cls+' '+(i===r.step?'current':'')+'" aria-label="Questão '+(i+1)+(answered?', respondida':'')+'" aria-current="'+(i===r.step?'step':'false')+'" onclick="UEQuestions.jump('+i+')">'+(i+1)+'</button>';
 }).join('')+'</div>';
}
function details(q,answer,show){
 if(!show)return '';
 const ok=answer===q.a,explanation=esc(q.why||'');
 const addition=q.extra?'<details class="ue-bank-deep"><summary>Aprofundamento resumido</summary><p>'+esc(q.extra)+'</p><button class="btn secondary" onclick="navigate('+(q.stage==='P1'? "'emergency-p1'":"'emergency-p2'")+');Emergency.'+(q.stage==='P1'?'p1':'p2')+'.open('+DATA().filter(m=>m.stage===q.stage).findIndex(m=>m.id===q.t)+')">Estudar aula completa →</button></details>':'';
 return '<div class="ue-bank-feedback '+(ok?'right':'wrong')+'"><strong>'+(ok?'Resposta correta.':'Revise esta questão.')+'</strong><p>Gabarito: <b>'+esc(q.o[q.a])+'</b></p><p>'+explanation+'</p>'+addition+'</div>';
}
function sessionView(){
 const r=active();if(!r){view='setup';return setupView();}
 if(r.kind==='exam'&&!r.done&&timerActive(r)&&remain(r)<=0){finish(false,true);}
 const id=r.ids[r.step],q=get(id);if(!q)return '<section class="card pad">Questão antiga não encontrada. Volte ao banco e inicie uma nova sessão.</section>';
 const answer=r.kind==='exam'?r.ans[id]:(r.done[id]?.chosen),show=r.kind==='practice'?!!r.done[id]:!!r.done;
 const answered=r.kind==='exam'?Object.keys(r.ans).length:Object.keys(r.done).length;
 const submitted=r.kind==='exam'&&r.done;
 return '<section class="emergency-page ue-bank-page"><nav class="pocus-crumb"><button class="btn" onclick="UEQuestions.setMode(\'setup\')">← Configurações</button><span>'+(r.kind==='exam'?'Simulado':'Treino')+' · '+answered+'/'+r.ids.length+' respondidas</span></nav>'+
 '<div class="ue-bank-heading"><div><span class="kicker">'+(r.kind==='exam'?'MODO PROVA':'ESTUDO COM FEEDBACK')+'</span><h1>'+(r.done===true?'Correção do simulado':'Questão '+(r.step+1)+' de '+r.ids.length)+'</h1><p>'+(submitted?'Resultado: '+r.score+' / '+r.ids.length+' acertos':'Respostas registradas automaticamente após cada seleção.')+'</p></div>'+
 (r.kind==='exam'&&r.minutes>0?'<div class="ue-bank-clock" aria-live="off"><span>Tempo restante</span><strong id="ue-bank-timer">'+(submitted?'Finalizado':formatTime(remain(r)))+'</strong></div>':'')+'</div>'+
 progressDots(r)+'<article class="card pad ue-bank-question"><div class="ue-bank-meta"><span>'+esc(title(q.t))+'</span><span>'+esc(q.kind==='fixacao'?'Fixação':'Modelo de residência')+'</span><span>N'+q.level+'</span></div>'+
 '<h2>'+esc(q.q)+'</h2><div class="ue-bank-options">'+r.orders[id].map((orig,i)=>'<button type="button" '+(show||r.kind==='practice'&&Number.isInteger(answer)?'disabled':'')+' class="ue-bank-option '+(answer===orig?'picked ':'')+(show&&orig===q.a?'right ':'')+(show&&answer===orig&&orig!==q.a?'wrong':'')+'" onclick="UEQuestions.answer('+orig+')"><b>'+(ALPHABET[i])+'</b><span>'+esc(q.o[orig])+'</span></button>').join('')+'</div>'+
 details(q,answer,show)+'<div class="ue-bank-actions"><button class="btn" onclick="UEQuestions.jump('+(r.step-1)+')" '+(r.step===0?'disabled':'')+'>← Anterior</button>'+
 '<button class="btn primary" onclick="UEQuestions.jump('+(r.step+1)+')" '+(r.step===r.ids.length-1?'disabled':'')+'>Próxima →</button>'+
 (r.kind==='exam'&&!r.done?'<button class="btn secondary" onclick="UEQuestions.finish()">Entregar simulado</button>':r.kind==='practice'?'<button class="btn secondary" onclick="UEQuestions.finish(false)">Encerrar treino</button>':'')+'</div></article>'+
 (submitted?'<div class="card pad ue-bank-summary"><h2>Seu desempenho</h2><p><strong>'+r.score+' de '+r.ids.length+'</strong> acertos ('+Math.round(r.score/r.ids.length*100)+'%). As respostas foram registradas e podem ser revisitadas pelas bolinhas.</p><button class="btn primary" onclick="UEQuestions.setMode(\'setup\')">Gerar novo simulado</button></div>':'')+history()+'</section>';
}
function setupView(){
 const s=metrics(),available=filtered(),selectedThemes=filter.themes.length;
 const group=(name,label,values,fn)=>'<div class="ue-bank-filter-group"><strong>'+label+'</strong><div class="ue-bank-choices">'+values.map(([value,text])=>selected(fn+'('+JSON.stringify(value)+')',text,filter[name].includes(value))).join('')+'</div></div>';
 return '<section class="emergency-page ue-bank-page"><header class="emergency-hero"><div class="emergency-hero-icon">◈</div><div><span class="kicker">URGÊNCIA E EMERGÊNCIA · BANCO COMPLETO</span><h1>Questões e simulados</h1><p>O mesmo padrão de navegação, progresso e histórico de Cirurgia — com questões novas, modelos de residência e provas de referência.</p></div></header>'+
 '<div class="ue-bank-stats"><div><strong>'+s.total+'</strong><span>Questões avaliáveis</span></div><div><strong>'+s.answered+'</strong><span>Já respondidas</span></div><div><strong>'+s.correct+'</strong><span>Acertos registrados</span></div><div><strong>'+s.sessions+'</strong><span>Sessões no histórico</span></div></div>'+
 '<section class="card pad ue-bank-config"><div class="ue-bank-heading"><div><h2>Montar meu treino ou simulado</h2><p>Escolha temas, nível, fonte, quantidade e duração.</p></div><span>'+available.length+' questões elegíveis</span></div>'+
 group('types','Tipo de questão',[['fixacao','Fixação da aula'],['modelo','Modelo residência']],'UEQuestions.toggleType')+
 group('stages','Período',[['P1','P1'],['P2','P2']],'UEQuestions.toggleStage')+
 group('levels','Nível de dificuldade',[[1,'N1 · Essencial'],[2,'N2 · Aplicação'],[3,'N3 · Decisão']],'UEQuestions.toggleLevel')+
 '<div class="ue-bank-filter-group"><div class="ue-bank-heading"><strong>Temas ('+selectedThemes+' de '+DATA().length+')</strong><div class="btn-row"><button type="button" class="btn ghost" onclick="UEQuestions.allThemes()">Todos</button><button type="button" class="btn ghost" onclick="UEQuestions.noThemes()">Nenhum</button></div></div><div class="ue-bank-themes">'+DATA().map(m=>'<label><input type="checkbox" '+(filter.themes.includes(m.id)?'checked':'')+' onchange="UEQuestions.toggleTheme(\''+m.id+'\')"> <span>'+esc(m.title)+'</span></label>').join('')+'</div></div>'+
 '<div class="ue-bank-filter-group"><strong>Histórico como filtro</strong><div class="ue-bank-choices">'+selected('UEQuestions.setFilter(\'onlyWrong\','+(!filter.onlyWrong)+')','Só questões erradas',filter.onlyWrong)+selected('UEQuestions.setFilter(\'onlyUnanswered\','+(!filter.onlyUnanswered)+')','Só inéditas',filter.onlyUnanswered)+'</div></div>'+
 '<div class="ue-bank-parameters"><label>Quantidade de questões<input type="number" min="1" max="'+MAX+'" value="'+filter.count+'" onchange="UEQuestions.setFilter(\'count\',this.value)"></label><label>Tempo do simulado (min; 0 = sem limite)<input type="number" min="0" max="300" value="'+filter.minutes+'" onchange="UEQuestions.setFilter(\'minutes\',this.value)"></label></div>'+
 '<div class="ue-bank-buttons"><button class="btn secondary" '+(!available.length?'disabled':'')+' onclick="UEQuestions.create(\'practice\')">Treinar e corrigir após resposta</button><button class="btn primary" '+(!available.length?'disabled':'')+' onclick="UEQuestions.create(\'exam\')">Gerar simulado com '+Math.min(filter.count,available.length)+' questões</button></div>'+
 '<p class="subtle">No modo prova, o gabarito permanece oculto até a entrega. O cronômetro é persistente ao sair e retornar à página.</p></section>'+
 history()+externalSources()+'</section>';
}
function page(){
 const expected=ui.route==='emergency-simulado'?'exam':'practice';
 if(view==='run'&&(!current||current.kind!==expected)){
  const b=bank(),id=b[expected==='exam'?'activeQuestionExamId':'activeQuestionPracticeId'];
  const r=id&&QuestionHistory.restore(b,expected,id);
  if(r)current=r;else{current=null;view='setup';}
 }
 return view==='run'?sessionView():setupView();
}
function openExam(){view='setup';current=null;navigate('emergency-simulado');}
function openQuestions(){view='setup';current=null;navigate('emergency-questions');}
const exposed={page,openExam,openQuestions,create,answer,jump,finish,setMode,setFilter,allThemes,noThemes,toggleTheme,
 toggleType:v=>toggleValue('types',v),toggleStage:v=>toggleValue('stages',v),toggleLevel:v=>toggleValue('levels',v),
 openQuestionSession:resume,clearQuestionHistory,metrics,pool,filtered,originals:ORIGINALS,history};
window.UEQuestions=exposed;
setInterval(()=>{if(typeof ui==='undefined'||ui.route!=='emergency-simulado')return;const r=active();if(!timerActive(r))return;const ms=remain(r),el=document.getElementById('ue-bank-timer');if(el)el.textContent=formatTime(ms);if(ms<=0)finish(false,true);},1000);
})();