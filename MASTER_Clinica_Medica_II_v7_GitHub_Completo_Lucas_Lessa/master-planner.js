/* Master Planner: cronograma orientado pela data da prova, revisão ativa e gamificação sem punição.
 * O histórico das questões permanece nos módulos originais. Este arquivo registra apenas planos e autoavaliações do planejador.
 */
window.MasterPlanner=(()=>{
'use strict';
const KEY='master_study_planner_v1', VERSION=1, INTERVALS=[1,3,7,21], ONE_DAY=86400000;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const n=v=>Number.isFinite(Number(v))?Number(v):0;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,n(v)));
const pad=v=>String(v).padStart(2,'0');
const localDate=(d=new Date())=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const dateOf=key=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(String(key)))return null;const [y,m,d]=key.split('-').map(Number),x=new Date(y,m-1,d,12);return localDate(x)===key?x:null};
const shift=(key,days)=>{const d=dateOf(key);if(!d)return null;d.setDate(d.getDate()+days);return localDate(d)};
const delta=(a,b)=>Math.round((dateOf(b)-dateOf(a))/ONE_DAY);
const weekday=key=>dateOf(key)?.getDay();
const label=key=>dateOf(key)?.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'})||'—';
const notify=m=>{if(typeof toast==='function')toast(m)};
const empty=()=>({version:VERSION,plans:[],active:null,settings:{weeklyGoal:4,heatMetric:'days'},updatedAt:null});
function load(){try{const data=JSON.parse(localStorage.getItem(KEY));if(data&&data.version===VERSION&&Array.isArray(data.plans))return {...empty(),...data,settings:{...empty().settings,...data.settings}};}catch{}return empty();}
let state=load(),editing=false,draft=null,subjectFilter='all',searchText='',showArchived=false,sessionMinutes=15,heatDay='',owner=window.MASTER_AUTH?.user?.()?.id||'guest';
const id=()=>('p'+Date.now().toString(36)+Math.random().toString(36).slice(2,9));
function persist(){
 state.updatedAt=new Date().toISOString();
 try{localStorage.setItem(KEY,JSON.stringify(state));}catch{notify('Seu dispositivo não pôde salvar o planejador. Confira o armazenamento.');}
}
function renderPage(){if(typeof ui!=='undefined'&&ui.route==='planner'&&typeof render==='function'){const y=typeof window.scrollY==='number'?window.scrollY:0;render();if(typeof window.scrollTo==='function')window.scrollTo({top:y,behavior:'instant'});}}
function afterDataChange(){persist();renderPage();}
function catalog(){
 const result=[],seen=new Set();
 const add=(course,subject,themeId,title,priority,extras={})=>{
  const key=course+':'+themeId;if(!themeId||seen.has(key))return;
  seen.add(key);result.push({id:key,course,themeId:String(themeId),subject,title:String(title||themeId),priority:priority||'media',...extras});
 };
 if(typeof TOPICS!=='undefined'&&Array.isArray(TOPICS))
  TOPICS.forEach(t=>add('p2','Clínica Médica II',t.id,t.title,'alta'));
 if(window.P1?.topics)window.P1.topics.forEach(t=>add('p1','Clínica Médica I',t.id,t.title,'media'));
 if(window.CIR?.topics)window.CIR.topics.forEach(t=>add('cir','Clínica Cirúrgica',t.id,t.title||t.short,'media'));
 if(window.OSCEPilot?.bank)window.OSCEPilot.bank().forEach(st=>{
  add('osce',st.pocusOrder?'POCUS · OSCE':'OSCE · Clínica Médica',st.number,st.title,st.pocusOrder?'alta':st.priority||'media',{pocusOrder:st.pocusOrder||0});
 });
 return result;
}
function getTheme(key){return catalog().find(t=>t.id===key)||null;}
function activePlan(){return state.plans.find(p=>p.id===state.active&&!p.archived)||state.plans.find(p=>!p.archived)||null;}
function progressOf(plan,themeId){return plan.progress?.[themeId]||{history:[]};}
function latest(plan,themeId){const h=progressOf(plan,themeId).history||[];return h[h.length-1]||null;}
function osceEvidence(theme){
 if(!theme||theme.course!=='osce')return null;
 let data;
 try{data=JSON.parse(localStorage.getItem('master_osce_pilot_v1'));}catch{return null;}
 const ids=Object.entries(data?.items||{}).filter(([k])=>k.startsWith(theme.themeId+':'));
 const attempts=ids.flatMap(([,v])=>Array.isArray(v.attempts)?v.attempts:[]);
 if(!attempts.length)return null;
 const time=v=>new Date(v.at||v.attemptedAt||0).getTime()||0;
 const last=attempts.slice().sort((a,b)=>time(b)-time(a))[0];
 return {attempts:attempts.length,score:n(last.score),due:last.due||null,at:last.at||null,confidence:last.confidence||null};
}
function superFocoEvidence(theme){
 if(!theme)return null;
 const uid=window.MASTER_AUTH?.user?.()?.id||'local';
 let data;
 try{data=JSON.parse(localStorage.getItem('master_super_foco_v1:'+uid));}catch{return null;}
 const prefix=theme.course==='osce'?'osce:'+theme.themeId+':':theme.course+':'+theme.themeId+':';
 const entries=Object.entries(data?.records||{}).filter(([id])=>id.startsWith(prefix)).map(([,r])=>r).filter(Boolean);
 if(!entries.length)return null;
 const attempts=entries.reduce((a,r)=>a+(Number(r.attempts)||0),0);
 const latest=entries.slice().sort((a,b)=>new Date(b.lastAt||0)-new Date(a.lastAt||0))[0];
 const due=entries.map(r=>r.due).filter(Boolean).sort()[0];
 return {attempts,score:Number(latest?.score)||0,due:due||null,at:latest?.lastAt||null,from:'superfoco'};
}
function externalEvidence(theme){
 const osce=osceEvidence(theme),focus=superFocoEvidence(theme);
 if(osce&&focus){
  const due=[osce.due,focus.due].filter(Boolean).sort()[0]||null;
  return {...osce,attempts:osce.attempts+focus.attempts,due,from:'osce+superfoco'};
 }
 if(osce)return osce;
 if(focus)return focus;
 if(!theme)return null;
 // Leitura concluída no acervo é cobertura, não comprovação de recordação ativa.
 try{
  if(theme.course==='p2'&&typeof store!=='undefined'){
   const topic=(typeof TOPICS!=='undefined'?TOPICS:[]).find(x=>x.id===theme.themeId);
   const count=topic?.chapters?.filter((_,i)=>store.completed?.[theme.themeId+'_'+i]).length||0;
   return count?{read:count,total:topic.chapters.length}:null;
  }
  if(theme.course==='p1'&&window.P1?.getBackup){
   const data=window.P1.getBackup(),topic=window.P1.topics?.find(x=>x.id===theme.themeId);
   const count=topic?.chapters?.filter((_,i)=>data.completed?.[theme.themeId+'_'+i]).length||0;
   return count?{read:count,total:topic.chapters.length}:null;
  }
 }catch{}
 return null;
}
function priority(t){return t?.priority==='alta'?0:t?.priority==='media'?1:2;}
function topicList(plan){return (plan?.themes||[]).map(getTheme).filter(Boolean).sort((a,b)=>priority(a)-priority(b)||a.title.localeCompare(b.title,'pt-BR'));}
function completed(plan,theme){return !!latest(plan,theme.id)||!!externalEvidence(theme)?.attempts;}
function mastery(plan,theme){
 const hist=progressOf(plan,theme.id).history||[],clean=hist.filter(x=>x.rating==='good');
 if(clean.length>=2&&new Set(clean.map(x=>x.day)).size>=2&&hist.at(-1)?.rating==='good')return 'consistente';
 if(hist.length||externalEvidence(theme)?.attempts)return 'consolidando';
 return 'novo';
}
function availableDays(plan,from=localDate()){
 const last=plan?.examDate;if(!dateOf(last)||delta(from,last)<0)return [];
 const weekdays=Array.isArray(plan.weekdays)&&plan.weekdays.length?plan.weekdays:[0,1,2,3,4,5,6];
 return Array.from({length:Math.min(366,delta(from,last)+1)},(_,i)=>shift(from,i)).filter(day=>weekdays.includes(weekday(day)));
}
function dueOn(plan,theme){
 const h=latest(plan,theme.id);
 if(h?.due&&dateOf(h.due))return h.due;
 const src=externalEvidence(theme);
 if(src?.due){const d=localDate(new Date(src.due));return dateOf(d)?d:null;}
 return null;
}
function schedule(plan,from=localDate()){
 const days=availableDays(plan,from),themes=topicList(plan),cap=Math.max(1,Math.floor(clamp(plan?.minutes||30,5,240)/8));
 const rows=days.map(date=>({date,tasks:[]})),set=new Set();let overflow=0,unsupported=0;
 const put=(wish,theme,kind,repeat=false)=>{
  const start=rows.findIndex(x=>x.date>=wish);
  if(start<0){unsupported++;return null;}
  const found=rows.findIndex((x,i)=>i>=start&&x.tasks.length<cap&&!x.tasks.some(t=>t.id===theme.id&&t.kind===kind));
  if(found<0){overflow++;return null;}
  const row=rows[found],key=row.date+'|'+theme.id+'|'+kind;
  if(set.has(key))return row.date;
  set.add(key);row.tasks.push({id:theme.id,title:theme.title,subject:theme.subject,kind,priority:theme.priority,due:wish});
  return row.date;
 };
 // Revisões reais vencidas vêm antes do conteúdo novo.
 for(const t of themes){
  const due=dueOn(plan,t);
  if(due)put(due<from?from:due,t,'review');
 }
 const fresh=themes.filter(t=>!completed(plan,t));
 // Primeira passada em assuntos ainda não cobertos, com recapitulações programadas.
 for(const t of fresh){
  const first=put(from,t,'new');
  if(first)for(const d of INTERVALS){const desired=shift(first,d);if(desired&&desired<=plan.examDate)put(desired,t,'review');}
 }
 // Assuntos vistos sem reteste futuro ganham ao menos uma recuperação antes da prova.
 for(const t of themes.filter(t=>completed(plan,t)&&!dueOn(plan,t))){
  const last=latest(plan,t.id),ex=externalEvidence(t);
  const when=last?.day||(ex?.at?localDate(new Date(ex.at)):from);
  put(shift(when,7)>from?shift(when,7):from,t,'review');
 }
 return {rows,capacity:cap,themes:themes.length,planned:rows.reduce((sum,row)=>sum+row.tasks.length,0),unplaced:overflow,afterExam:unsupported,days:days.length};
}
function dailyTasks(plan,minutes=sessionMinutes){
 const sched=schedule(plan),row=sched.rows[0],today=localDate(),slots=Math.max(1,Math.floor(minutes/8));
 const current=row?.date===today?row:{tasks:[]}; // Não antecipar um dia futuro e chamá-lo de sessão de hoje.
 const all=current.tasks.slice().sort((a,b)=>(a.kind==='review'?0:1)-(b.kind==='review'?0:1)||priority(a)-priority(b));
 return all.slice(0,slots);
}
function createDraft(plan){
 return {id:plan?.id||null,title:plan?.title||'',examDate:plan?.examDate||shift(localDate(),14),minutes:plan?.minutes||30,
   weekdays:[...(plan?.weekdays||[0,1,2,3,4,5,6])],themes:new Set(plan?.themes||[])};
}
function openEditor(planId){
 const current=state.plans.find(p=>p.id===planId);draft=createDraft(current);editing=true;searchText='';subjectFilter='all';renderPage();
}
function closeEditor(){editing=false;draft=null;renderPage();}
function changeDraft(field,value){
 if(!draft)return;if(field==='title')draft.title=String(value).slice(0,100);
 if(field==='examDate')draft.examDate=String(value);
 if(field==='minutes')draft.minutes=clamp(value,5,240);
}
function toggleTheme(key,checked){if(!draft||!getTheme(key))return;if(checked)draft.themes.add(key);else draft.themes.delete(key);renderPage();}
function toggleDay(day,checked){if(!draft)return;const days=new Set(draft.weekdays);if(checked)days.add(Number(day));else days.delete(Number(day));draft.weekdays=[...days].sort((a,b)=>a-b);}
function setSubject(v){subjectFilter=String(v);renderPage();}
function searchThemes(value){
 searchText=String(value||'').toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
 const root=document.getElementById('planner-topics');if(!root)return;
 let count=0;root.querySelectorAll('[data-plan-topic]').forEach(item=>{
  const label=String(item.getAttribute('data-search')||'');
  const subject=String(item.getAttribute('data-subject')||'');
  item.hidden=!(!searchText||label.includes(searchText))||(subjectFilter!=='all'&&subject!==subjectFilter);
  if(!item.hidden)count++;
 });
 const countEl=document.getElementById('planner-topic-count');if(countEl)countEl.textContent=count+' temas encontrados';
}
function selectVisible(value){
 if(!draft)return;const keys=catalog().filter(t=>(subjectFilter==='all'||t.subject===subjectFilter)&&(!searchText||(t.title+' '+t.subject).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').includes(searchText)));
 keys.forEach(t=>value?draft.themes.add(t.id):draft.themes.delete(t.id));renderPage();
}
function savePlan(){
 if(!draft)return;
 const title=draft.title.trim(),date=draft.examDate,topics=[...draft.themes].filter(t=>!!getTheme(t));
 if(title.length<3)return notify('Informe o nome da avaliação (pelo menos 3 caracteres).');
 if(!dateOf(date))return notify('Escolha uma data válida para a avaliação.');
 if(date<localDate())return notify('A data deve ser hoje ou posterior.');
 if(!topics.length)return notify('Selecione pelo menos um tema.');
 if(!draft.weekdays.length)return notify('Selecione ao menos um dia da semana.');
 const old=state.plans.find(x=>x.id===draft.id);
 const plan={...old,id:old?.id||id(),title,examDate:date,minutes:clamp(draft.minutes,5,240),
  themes:topics,weekdays:[...draft.weekdays],progress:old?.progress||{},createdAt:old?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),archived:false};
 state.plans=old?state.plans.map(p=>p.id===old.id?plan:p):[...state.plans,plan];
 state.active=plan.id;editing=false;draft=null;persist();renderPage();notify('Planejamento salvo e cronograma recalculado.');
}
function activate(id){if(!state.plans.some(p=>p.id===id&&!p.archived))return;state.active=id;afterDataChange();}
function archive(id){const plan=state.plans.find(p=>p.id===id);if(!plan)return;plan.archived=!plan.archived;state.active=activePlan()?.id||null;afterDataChange();}
function setWeeklyGoal(v){state.settings.weeklyGoal=Math.floor(clamp(v,1,7));afterDataChange();}
function setMetric(v){if(!['days','reviews'].includes(v))return;state.settings.heatMetric=v;afterDataChange();}
function setSessionMinutes(v){sessionMinutes=[5,15,30].includes(Number(v))?Number(v):15;renderPage();}
function register(planId,themeId,rating){
 const plan=state.plans.find(p=>p.id===planId&&!p.archived),theme=getTheme(themeId);
 if(!plan||!theme||!plan.themes.includes(themeId)||!['again','help','good'].includes(rating))return;
 const date=localDate(),old=progressOf(plan,themeId),history=Array.isArray(old.history)?old.history.slice():[],before=history.at(-1)||null;
 const same=history.findIndex(x=>x.day===date);
 const previousGood=history.filter(x=>x.rating==='good').length;
 const interval=rating==='again'?1:rating==='help'?1:INTERVALS[Math.min(previousGood,INTERVALS.length-1)];
 const due=shift(date,interval),recover=rating==='good'&&before?.rating==='again'&&before.day!==date;
 const entry={day:date,at:new Date().toISOString(),rating,due,kind:!history.length?'new':same>=0?'practice':'review',recovered:!!recover};
 if(same>=0)history[same]=entry;else history.push(entry);
 plan.progress=plan.progress||{};plan.progress[themeId]={history:history.slice(-60)};
 plan.updatedAt=new Date().toISOString();afterDataChange();
 notify(rating==='again'?'Lacuna registrada: revisão antecipada.':'Autoavaliação registrada. Próxima revisão '+label(due)+'.');
}
function entries(){return state.plans.flatMap(p=>Object.entries(p.progress||{}).flatMap(([themeId,record])=>(record.history||[]).map(x=>({...x,themeId,planId:p.id}))));}
function stats(){
 const events=entries(),unique=new Set(events.map(x=>x.day));
 const reviews=events.filter(x=>x.kind==='review').length,recovered=events.filter(x=>x.recovered).length;
 const xp=events.reduce((sum,x)=>sum+(x.rating==='good'?12:x.rating==='help'?6:4)+(x.kind==='review'?6:0)+(x.recovered?10:0),0);
 return {events,days:unique.size,reviews,recovered,xp,level:Math.floor(Math.sqrt(xp/70))+1};
}
function weekStart(day=localDate()){const d=weekday(day);return shift(day,-((d+6)%7));}
function weeklyEvents(){const since=weekStart();return entries().filter(x=>x.day>=since&&x.day<=localDate());}
function weeklySummary(){
 const records=weeklyEvents(),goal=state.settings.weeklyGoal;
 return {days:new Set(records.map(x=>x.day)).size,goal,reviews:records.filter(x=>x.kind==='review').length,recovered:records.filter(x=>x.recovered).length};
}
function achievementList(){
 const s=stats(),week=weeklySummary();
 return [
  {id:'first',title:'Primeiro passo',icon:'✦',earned:s.events.length>0,detail:'Concluir a primeira recuperação ativa'},
  {id:'consistent',title:'Constância tranquila',icon:'▦',earned:s.days>=7,detail:'Estudar em sete dias diferentes'},
  {id:'review',title:'Revisão consciente',icon:'↻',earned:s.reviews>=10,detail:'Concluir dez retestes em dias diferentes'},
  {id:'recovery',title:'Transformar erros',icon:'✓',earned:s.recovered>=3,detail:'Recuperar três dificuldades em retestes'},
  {id:'weekly',title:'Meta semanal',icon:'◎',earned:week.days>=week.goal,detail:'Cumprir os dias planejados da semana'}
 ];
}
function heatmap(compact=false){
 const events=entries(),map=new Map(),metric=state.settings.heatMetric;
 for(const x of events){const rec=map.get(x.day)||{studied:0,reviews:0};rec.studied++;if(x.kind==='review')rec.reviews++;map.set(x.day,rec);}
 const last=localDate(),start=shift(last,-(compact?97:363));
 let aligned=weekStart(start),weeks=[],i=0;
 while(aligned<=last&&i++<55){const arr=[];for(let d=0;d<7;d++){const date=shift(aligned,d),value=map.get(date)||{studied:0,reviews:0},count=metric==='reviews'?value.reviews:value.studied;arr.push({date,count,valid:date>=start&&date<=last});}weeks.push(arr);aligned=shift(aligned,7);}
 const chosen=heatDay&&map.get(heatDay),active=heatDay||last,details=map.get(active)||{studied:0,reviews:0};
 const cells=weeks.map(week=>'<div class="mp-heat-col">'+week.map(d=>d.valid?
  '<button type="button" class="mp-heat-cell level-'+(d.count>=4?4:d.count)+'" title="'+esc(d.date)+' · '+d.count+' '+(metric==='reviews'?'revisões':'atividades')+'" aria-label="'+esc(d.date)+', '+d.count+' '+(metric==='reviews'?'revisões':'atividades')+'" onclick="MasterPlanner.inspectDay(\''+d.date+'\')"></button>':'<span class="mp-heat-cell empty" aria-hidden="true"></span>').join('')+'</div>').join('');
 return '<section class="mp-heatmap '+(compact?'compact':'')+'" aria-label="Mapa de frequência"><div class="mp-heat-heading"><div><h3>Mapa de constância</h3><p>Atividades registradas, não apenas páginas abertas.</p></div>'
  +(!compact?'<div class="mp-segments"><button type="button" aria-pressed="'+(metric==='days')+'" onclick="MasterPlanner.setMetric(\'days\')">Atividade</button><button type="button" aria-pressed="'+(metric==='reviews')+'" onclick="MasterPlanner.setMetric(\'reviews\')">Retestes</button></div>':'')+'</div>'
  +'<div class="mp-heat-scroll"><div class="mp-heat-grid" role="group" aria-label="Dias de estudo">'+cells+'</div></div>'
  +'<div class="mp-heat-caption"><small>Menos</small><span class="mp-heat-scale"><i class="level-0"></i><i class="level-1"></i><i class="level-2"></i><i class="level-3"></i><i class="level-4"></i></span><small>Mais</small></div>'
  +(!compact?'<p class="mp-heat-detail" role="status">'+esc(label(active))+' · '+details.studied+' atividade(s) · '+details.reviews+' revisão(ões)</p>':'')+'</section>';
}
function inspectDay(day){if(!dateOf(day))return;heatDay=day;renderPage();}
function openTheme(themeId,mode='study'){
 const t=getTheme(themeId);if(!t)return notify('O conteúdo deste tema não está disponível.');
 if(t.course==='osce'){
  if(typeof navigate==='function')navigate('osce');
  if(mode==='practice')window.OSCEPilot?.start?.('essencial',null,Number(t.themeId));
  else window.OSCEPilot?.preview?.(Number(t.themeId));
 }else if(t.course==='p2'){
  if(typeof openTopic==='function')openTopic(t.themeId);
  else if(typeof navigate==='function')navigate('topics');
 }else if(t.course==='p1'){
  if(window.P1?.openTopic)window.P1.openTopic(t.themeId);
 }else if(t.course==='cir'){
  if(window.CIR?.openTopic)window.CIR.openTopic(t.themeId);
 }
}
function htmlDays(){
 const plan=activePlan();if(!plan)return '';
 const sched=schedule(plan),today=localDate(),rows=sched.rows.slice(0,14);
 const all=topicList(plan),covered=all.filter(t=>completed(plan,t)).length,
   mastered=all.filter(t=>mastery(plan,t)==='consistente').length,daysTo=delta(today,plan.examDate);
 const todayTasks=dailyTasks(plan);
 return '<section class="mp-panel mp-plan-summary"><div class="mp-panel-head"><div><p class="mp-eyebrow">AVALIAÇÃO ATIVA</p><h2>'+esc(plan.title)+'</h2><p>'+label(plan.examDate)+' · '+(daysTo===0?'Avaliação hoje':daysTo>0?daysTo+' dias até a avaliação':'Data encerrada')+' · '+plan.minutes+' minutos/dia</p></div><div class="mp-actions"><button type="button" class="btn" onclick="MasterPlanner.openEditor(\''+plan.id+'\')">Editar plano</button><button type="button" class="btn ghost" onclick="MasterPlanner.archive(\''+plan.id+'\')">Arquivar</button></div></div>'
  +'<div class="mp-scorecards"><div><strong>'+covered+'/'+all.length+'</strong><small>Temas vistos</small></div><div><strong>'+mastered+'/'+all.length+'</strong><small>Em domínio consistente*</small></div><div><strong>'+sched.days+'</strong><small>Dias disponíveis</small></div><div><strong>'+sched.planned+'</strong><small>Blocos sugeridos</small></div></div>'
  +'<div class="mp-progress"><span style="width:'+(all.length?Math.round(covered/all.length*100):0)+'%"></span></div>'
  +(sched.unplaced||sched.afterExam?'<p class="mp-warning" role="status"><strong>Carga superior ao prazo:</strong> '+(sched.unplaced+sched.afterExam)+' bloco(s) ficaram fora da capacidade prevista. Aumente o tempo diário, libere dias ou reduza temas. Não serão considerados concluídos.</p>':'')
  +'<p class="mp-small">*Domínio consistente: pelo menos dois acertos independentes declarados em dias distintos. Leituras e respostas com ajuda não são prova de domínio.</p></section>'
  +'<section class="mp-panel mp-today"><div class="mp-panel-head"><div><p class="mp-eyebrow">PRÓXIMA AÇÃO</p><h2>O que revisar agora</h2><p>Prioridade a erros e assuntos ainda não cobertos.</p></div><div class="mp-segments"><button type="button" aria-pressed="'+(sessionMinutes===5)+'" onclick="MasterPlanner.setSessionMinutes(5)">5 min</button><button type="button" aria-pressed="'+(sessionMinutes===15)+'" onclick="MasterPlanner.setSessionMinutes(15)">15 min</button><button type="button" aria-pressed="'+(sessionMinutes===30)+'" onclick="MasterPlanner.setSessionMinutes(30)">30 min</button></div></div>'
  +(todayTasks.length?'<div class="mp-task-list">'+todayTasks.map((task,i)=>taskRow(plan,task,i)).join('')+'</div>':'<p class="mp-empty">Nenhuma tarefa programada para hoje. Confira os próximos dias ou ajuste a disponibilidade.</p>')
  +'</section><section class="mp-panel"><div class="mp-panel-head"><div><h2>Próximos 14 dias de estudo</h2><p>Agenda reajustada automaticamente quando você registra uma revisão ou altera a prova.</p></div></div><div class="mp-agenda">'+rows.map(row=>'<div class="mp-agenda-day"><b>'+label(row.date)+'</b><span>'+row.tasks.length+' bloco(s)</span><p>'+row.tasks.slice(0,3).map(x=>esc(x.title)+(x.kind==='review'?' ↻':' +')).join(' · ')+(row.tasks.length>3?' e outros '+(row.tasks.length-3):'')+'</p></div>').join('')+'</div></section>';
}
function taskRow(plan,task,i){
 const theme=getTheme(task.id),prev=latest(plan,task.id),source=externalEvidence(theme),level=mastery(plan,theme);
 return '<article class="mp-task" aria-label="Tarefa '+(i+1)+'"><div class="mp-task-main"><small>'+esc(task.kind==='review'?'REVISÃO ESPAÇADA':'PRIMEIRA PASSADA')+' · '+esc(theme?.subject||'')+'</small><h3>'+esc(task.title)+'</h3><p>'+esc(level==='novo'?'Ainda sem tentativa registrada':level==='consolidando'?'Em consolidação':'Domínio consistente')+(source?.attempts?' · '+source.attempts+' tentativa(s) no OSCE':'')+'</p></div>'
  +'<div class="mp-task-actions"><button type="button" class="btn" onclick="MasterPlanner.openTheme(\''+task.id+'\')">Estudar</button>'
  +(theme?.course==='osce'?'<button type="button" class="btn" onclick="MasterPlanner.openTheme(\''+task.id+'\',\'practice\')">Simular</button>':'')
  +'<div class="mp-self-grade" role="group" aria-label="Autoavaliação após estudar '+esc(task.title)+'"><button type="button" onclick="MasterPlanner.register(\''+plan.id+'\',\''+task.id+'\',\'again\')">Preciso revisar</button><button type="button" onclick="MasterPlanner.register(\''+plan.id+'\',\''+task.id+'\',\'help\')">Com ajuda</button><button type="button" onclick="MasterPlanner.register(\''+plan.id+'\',\''+task.id+'\',\'good\')">Sem ajuda</button></div></div></article>';
}
function radarPanel(plan){
 const groups=new Map();
 for(const t of topicList(plan)){
  const g=groups.get(t.subject)||{subject:t.subject,novo:0,consolidando:0,consistente:0,total:0};
  g[mastery(plan,t)]++;g.total++;groups.set(t.subject,g);
 }
 return '<section class="mp-panel mp-radar"><div class="mp-panel-head"><div><h2>Radar de consolidação</h2><p>Cobertura e retenção por matéria, com critérios visíveis.</p></div></div>'
  +'<div class="mp-radar-list">'+[...groups.values()].map(g=>
    '<div class="mp-radar-row"><div><b>'+esc(g.subject)+'</b><small>'+g.consistente+'/'+g.total+' temas consistentes</small></div>'
    +'<div class="mp-radar-bar" role="img" aria-label="'+esc(g.subject)+': '+g.novo+' novos, '+g.consolidando+' em consolidação, '+g.consistente+' consistentes">'
    +'<span class="novo" style="width:'+(100*g.novo/g.total)+'%"></span>'
    +'<span class="consolidando" style="width:'+(100*g.consolidando/g.total)+'%"></span>'
    +'<span class="consistente" style="width:'+(100*g.consistente/g.total)+'%"></span>'
    +'</div></div>').join('')
  +'</div><div class="mp-radar-legend"><span>○ Ainda não coberto</span><span>◒ Em consolidação</span><span>● Consistente</span></div>'
  +'</section>';
}
function surprise(){
 const plan=activePlan();if(!plan)return notify('Crie um plano para receber uma pergunta surpresa.');
 const cards=topicList(plan).filter(t=>t.course==='osce');
 if(!cards.length)return notify('Adicione uma estação OSCE à avaliação para receber uma pergunta surpresa.');
 const date=localDate(),order=Number(date.replace(/-/g,''))%cards.length;
 openTheme(cards[order].id,'practice');
}
function gamePanel(){
 const summary=stats(),week=weeklySummary(),achievements=achievementList(),goal=week.goal,
  missions=[{title:'Estudar em '+goal+' dias da semana',done:Math.min(week.days,goal),target:goal},{title:'Realizar 2 retestes',done:Math.min(week.reviews,2),target:2},{title:'Recuperar 1 dificuldade',done:Math.min(week.recovered,1),target:1}];
 return '<section class="mp-panel"><div class="mp-panel-head"><div><p class="mp-eyebrow">EVOLUÇÃO SEM PRESSÃO</p><h2>Suas missões e conquistas</h2><p>XP ilustra a prática registrada. Não equivale a nota ou certificação médica.</p></div></div>'
  +'<div class="mp-game-metrics"><div><b>'+summary.xp+'</b><small>Master XP</small></div><div><b>Nível '+summary.level+'</b><small>Trajetória pessoal</small></div><div><b>'+summary.days+'</b><small>Dias ativos</small></div><div><b>'+summary.recovered+'</b><small>Erros recuperados</small></div></div>'
  +'<div class="mp-week-goal"><label for="mp-weekly-goal">Meta semanal (dias)</label><select id="mp-weekly-goal" onchange="MasterPlanner.setWeeklyGoal(this.value)">'+[1,2,3,4,5,6,7].map(n=>'<option value="'+n+'" '+(n===goal?'selected':'')+'>'+n+' dia(s)</option>').join('')+'</select><span>'+week.days+'/'+goal+' dias</span></div>'
  +'<div class="mp-missions">'+missions.map(m=>'<div><span>'+esc(m.title)+'</span><strong>'+m.done+'/'+m.target+'</strong><div class="mp-progress"><span style="width:'+(m.done/m.target*100)+'%"></span></div></div>').join('')+'</div>'
  +'<div class="mp-achievements">'+achievements.map(a=>'<div class="'+(a.earned?'earned':'pending')+'"><span aria-hidden="true">'+a.icon+'</span><b>'+esc(a.title)+'</b><small>'+esc(a.detail)+'</small></div>').join('')+'</div>'
  +(activePlan()&&topicList(activePlan()).some(t=>t.course==='osce')?'<div class="mp-surprise"><span><strong>Banca surpresa</strong><small>Uma estação OSCE do seu plano, escolhida para hoje. Nenhum XP por apenas abrir.</small></span><button type="button" class="btn" onclick="MasterPlanner.surprise()">Treinar surpresa →</button></div>':'')
  +'<p class="mp-small">Um dia mínimo com uma recuperação ativa já conta. Descansos e ausências não geram penalidades ou perdas de XP.</p></section>';
}
function editor(){
 const d=draft||createDraft(),subjects=[...new Set(catalog().map(t=>t.subject))],topics=catalog().filter(t=>(subjectFilter==='all'||t.subject===subjectFilter)&&(!searchText||(t.title+' '+t.subject).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').includes(searchText)));
 return '<section class="mp-panel mp-editor"><div class="mp-panel-head"><div><p class="mp-eyebrow">'+(d.id?'EDITAR':'NOVA')+' AVALIAÇÃO</p><h2>'+ (d.id?'Ajustar':'Criar')+' plano de revisão</h2><p>Selecione os temas e informe sua data. Você pode alterar depois sem perder registros.</p></div><button class="btn ghost" onclick="MasterPlanner.closeEditor()">Fechar</button></div>'
  +'<div class="mp-form-grid"><label>Nome da avaliação<input type="text" maxlength="100" placeholder="Ex.: OSCE de Clínica Médica" value="'+esc(d.title)+'" oninput="MasterPlanner.changeDraft(\'title\',this.value)"></label>'
  +'<label>Data da avaliação<input type="date" min="'+localDate()+'" value="'+esc(d.examDate)+'" onchange="MasterPlanner.changeDraft(\'examDate\',this.value)"></label>'
  +'<label>Tempo diário disponível<select onchange="MasterPlanner.changeDraft(\'minutes\',this.value)">'+[5,15,30,45,60,90,120,180,240].map(v=>'<option value="'+v+'" '+(d.minutes===v?'selected':'')+'>'+v+' minutos</option>').join('')+'</select></label></div>'
  +'<fieldset class="mp-weekdays"><legend>Quais dias você pode estudar?</legend>'+['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map((s,i)=>'<label><input type="checkbox" '+(d.weekdays.includes(i)?'checked':'')+' onchange="MasterPlanner.toggleDay('+i+',this.checked)"><span>'+s+'</span></label>').join('')+'</fieldset>'
  +'<div class="mp-topic-selector"><div class="mp-topic-tools"><label for="mp-search">Escolha matérias e temas</label><div class="mp-topic-search"><input id="mp-search" placeholder="Buscar tema" type="search" value="'+esc(searchText)+'" oninput="MasterPlanner.searchThemes(this.value)"><select aria-label="Filtrar por matéria" onchange="MasterPlanner.setSubject(this.value)"><option value="all">Todas as matérias</option>'+subjects.map(v=>'<option '+(subjectFilter===v?'selected':'')+' value="'+esc(v)+'">'+esc(v)+'</option>').join('')+'</select></div><small id="planner-topic-count">'+topics.length+' temas encontrados</small><div class="mp-actions"><button type="button" class="btn" onclick="MasterPlanner.selectVisible(true)">Selecionar visíveis</button><button type="button" class="btn ghost" onclick="MasterPlanner.selectVisible(false)">Limpar visíveis</button></div></div>'
  +'<div id="planner-topics" class="mp-topic-list">'+topics.map(t=>'<label data-plan-topic data-search="'+esc((t.title+' '+t.subject).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR'))+'" data-subject="'+esc(t.subject)+'"><input type="checkbox" '+(d.themes.has(t.id)?'checked':'')+' onchange="MasterPlanner.toggleTheme(\''+t.id+'\',this.checked)"><span><b>'+esc(t.title)+'</b><small>'+esc(t.subject)+(t.priority==='alta'?' · Prioridade alta':'')+'</small></span></label>').join('')+'</div>'
  +'<div class="mp-editor-footer"><p><strong>'+d.themes.size+' tema(s) selecionados</strong><br>O cronograma combina primeira passada, retestes e prioridades sem garantir domínio.</p><button type="button" class="btn primary" onclick="MasterPlanner.savePlan()">Gerar meu plano de estudos</button></div></div></section>';
}
function homeCard(){
 const plan=activePlan(),sum=weeklySummary();
 if(!plan)return '<section class="mp-home-card"><div><strong>Master Planner</strong><p>Organize suas provas, revisões e metas de estudo.</p></div><button type="button" class="btn" onclick="navigate(\'planner\')">Criar plano →</button></section>';
 const due=dailyTasks(plan,15);
 return '<section class="mp-home-card"><div><strong>Master Planner · '+esc(plan.title)+'</strong><p>'+esc(label(plan.examDate))+' · '+due.length+' tarefa(s) sugerida(s) · '+sum.days+'/'+sum.goal+' dias na meta semanal</p></div><button type="button" class="btn" onclick="navigate(\'planner\')">Abrir meu plano →</button></section>'+heatmap(true);
}
function page(){
 const plan=activePlan(),all=state.plans.filter(x=>showArchived||!x.archived),s=stats();
 let out='<div class="mp-root"><header class="mp-header"><p class="mp-eyebrow">ESTUDO MASTER · PLANEJAMENTO INTELIGENTE</p><h1>Master <em>Planner.</em></h1><p>Uma próxima ação clara para cada dia. Planeje avaliações, consolide as dificuldades e acompanhe sua constância.</p><div class="mp-actions"><button class="btn primary" onclick="MasterPlanner.openEditor()">+ Nova avaliação</button><button class="btn ghost" onclick="MasterPlanner.toggleArchived()">'+(showArchived?'Ocultar arquivadas':'Ver arquivadas')+'</button></div></header>';
 if(all.length)out+='<div class="mp-plan-switch" role="group" aria-label="Planos de avaliação">'+all.map(x=>'<button type="button" class="'+(x.id===plan?.id?'active':'')+'" onclick="MasterPlanner.activate(\''+x.id+'\')" '+(x.archived?'disabled':'')+'>'+esc(x.title)+(x.archived?' · arquivado':'')+'</button>').join('')+'</div>';
 if(editing)out+=editor();
 if(plan){out+=htmlDays();out+=radarPanel(plan);out+=heatmap();out+=gamePanel();}
 else if(!editing)out+='<section class="mp-panel mp-empty-state"><h2>Seu planejamento começa com uma avaliação.</h2><p>Informe a data, os temas e seus minutos disponíveis. O Master distribui atividades e mostra quando a carga não cabe no prazo.</p><button class="btn primary" onclick="MasterPlanner.openEditor()">Configurar primeira avaliação</button></section>';
 // O mapa e as conquistas aparecem após criar um plano; antes disso a tela permanece enxuta.
 out+='<p class="mp-footer-note">O planejador não cria respostas nem altera o histórico original de provas, questões ou OSCE. Atividades assinaladas são autoavaliações; a revisão real deve ser realizada no módulo correspondente.</p></div>';
 return out;
}
function toggleArchived(){showArchived=!showArchived;renderPage();}
function mergeProgress(base,local,remote){
 // Conflictos multiplataforma: preservar planos e registros históricos de dias distintos,
 // sem transformar dados de questões em pontuações do planejador.
 const a=local&&Array.isArray(local.plans)?local:empty();
 const b=remote&&Array.isArray(remote.plans)?remote:empty();
 const plans=new Map();
 for(const p of [...b.plans,...a.plans]){
  if(!p||typeof p.id!=='string')continue;
  const old=plans.get(p.id);
  if(!old){plans.set(p.id,{...p,progress:{...(p.progress||{})}});continue;}
  const latest=new Date(p.updatedAt||p.createdAt||0)>new Date(old.updatedAt||old.createdAt||0)?p:old;
  const previous=latest===p?old:p,progress={};
  for(const key of new Set([...Object.keys(old.progress||{}),...Object.keys(p.progress||{})])){
   const aa=old.progress?.[key]?.history||[],bb=p.progress?.[key]?.history||[];
   const history=new Map();
   for(const event of [...aa,...bb]){
    if(!event?.day||!dateOf(event.day))continue;
    const prev=history.get(event.day);
    if(!prev||new Date(event.at||0)>=new Date(prev.at||0))history.set(event.day,event);
   }
   progress[key]={history:[...history.values()].sort((x,y)=>x.day.localeCompare(y.day)).slice(-60)};
  }
  plans.set(p.id,{...previous,...latest,progress});
 }
 const newest=new Date(a.updatedAt||0)>=new Date(b.updatedAt||0)?a:b;
 const settings={...empty().settings,...(b.settings||{}),...(a.settings||{})};
 if(newest===b)Object.assign(settings,b.settings||{});
 const all=[...plans.values()];
 const selected=all.some(p=>p.id===newest.active&&!p.archived)?newest.active:all.find(p=>!p.archived)?.id||null;
 return {version:VERSION,plans:all,active:selected,settings,updatedAt:new Date().toISOString()};
}
function resetAccount(){owner=window.MASTER_AUTH?.user?.()?.id||'guest';state=load();editing=false;draft=null;heatDay='';showArchived=false;}
window.addEventListener('master-auth-ready',()=>{resetAccount();renderPage();});
window.addEventListener('master-auth-ended',()=>{state=empty();editing=false;draft=null;heatDay='';owner='guest';});
window.addEventListener('master-remote-merge',e=>{if(e.detail?.key===KEY){state=load();renderPage();}});
window.addEventListener('storage',e=>{if(e.key===KEY){state=load();renderPage();}});
return {page,homeCard,catalog,schedule,dailyTasks,stats,heatmap,openEditor,closeEditor,changeDraft,toggleTheme,toggleDay,
 setSubject,searchThemes,selectVisible,savePlan,activate,archive,setWeeklyGoal,setMetric,setSessionMinutes,
 register,inspectDay,openTheme,surprise,toggleArchived,load,activePlan,externalEvidence,mergeProgress};
})();
