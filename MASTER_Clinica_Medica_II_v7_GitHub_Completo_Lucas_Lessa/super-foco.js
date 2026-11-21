/* Super Foco — camada aditiva de recuperação ativa do Clínica Master.
 * Nenhuma nota modifica resultados de prova/OSCE. Salva autoavaliação apenas neste navegador, por usuário.
 */
window.SuperFoco=(()=>{
'use strict';
const VERSION=2,PREFIX='master_super_foco_v1:';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stext=s=>String(s??'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const trim=s=>String(s??'').trim().slice(0,5000);
const daysFromNow=n=>{const d=new Date();d.setDate(d.getDate()+n);return d.toISOString();};
const username=()=>window.MASTER_AUTH?.user?.()?.id||'local';
const key=()=>PREFIX+username();
const empty=()=>({version:VERSION,records:{},session:null,settings:{size:5,mixed:false},updatedAt:null});
function load(){
 try{const x=JSON.parse(localStorage.getItem(key()));if(x&&x.records&&typeof x.records==='object')
  return {...empty(),...x,settings:{...empty().settings,...x.settings}};}catch{}
 return empty();
}
let state=load(),owner=username(),selection={course:'osce',topic:'',mixed:false},stage='catalog',search='',focusPhase='challenge',loadingMessage='';
const courseTitles={osce:'OSCE · Clínica Médica',pocus:'POCUS · Estações',p2:'Clínica Médica II · P2',p1:'Clínica Médica · P1',cir:'Cirurgia',ue:'Urgência e Emergência'};
if(state.session?.status==='active'){
 selection={course:state.session.course,topic:state.session.topic,mixed:!!state.session.mixed};
 stage='exercise';
}
function ensureOwner(){
 const current=username();if(owner!==current){owner=current;state=load();stage=state.session?.status==='active'?'exercise':'catalog';selection=state.session?{course:state.session.course,topic:state.session.topic,mixed:!!state.session.mixed}:{course:'osce',topic:'',mixed:false};}
}
function persist(){state.updatedAt=new Date().toISOString();try{localStorage.setItem(key(),JSON.stringify(state));}catch{if(typeof toast==='function')toast('Não foi possível salvar esta sessão no navegador.');}}
function rerender(){if(typeof render==='function')render();}
function inform(message){if(typeof toast==='function')toast(message);}
function hasText(v){return typeof v==='string'&&v.trim().length>3;}
function question(id,course,topic,title,prompt,answer,extra,kind,priority,context,detail={}){
 if(!hasText(prompt)||!hasText(answer))return null;
 return {
  id,course,topic,title:stext(title),prompt:stext(prompt),answer:stext(answer),extra:stext(extra),
  kind:kind||'recuperacao',priority:priority||'media',context:stext(context),
  criteria:(detail.criteria||[]).filter(Boolean).map(stext).filter(Boolean).slice(0,9),
  mechanism:stext(detail.mechanism),pitfall:stext(detail.pitfall),memory:stext(detail.memory),
  example:stext(detail.example),transfer:stext(detail.transfer),sources:detail.sources||[],
  image:detail.image&&/^(https:\/\/|assets\/)/.test(detail.image.src||'')&&!detail.image.revealedOnly?detail.image:null
 };
}
function enrich(base,deep,topic,part){
 if(!base||!deep)return [];
 const out=[];
 (deep.recall||[]).forEach((r,i)=>{
  const q=question(base+':recall:'+i,part,topic,deep.sections?.[0]?.h||'Aprofundamento clínico',r.q,r.a,
    [deep.reasoning?.[i%Math.max(1,deep.reasoning?.length||1)],deep.mnemonics?.[0]?.t].filter(Boolean).join(' · '),
    i%3===0?'aplicacao':i%3===1?'discriminacao':'explicacao','media',
    deep.cases?.[0]?.stem||deep.sections?.[0]?.h,{
     criteria:deep.reasoning?.slice(0,4)||[],
     mechanism:deep.sections?.[0]?.p?.[0],
     pitfall:deep.pitfalls?.[i%(deep.pitfalls?.length||1)],
     memory:deep.mnemonics?.[0]?.t,
     example:deep.practice?.[i%(deep.practice?.length||1)],
     transfer:deep.cases?.[0]?.ask||'Em que novo paciente ou cenário você reconheceria este padrão?',
     sources:deep.refs||[]
    });
  if(q)out.push(q);
 });
 return out;
}
function catalog(){
 const entries=[],weakOsce=new Set((window.OSCEPilot?.weakItems?.()||[]).map(x=>'osce:'+x.st.number+':'+x.q.id));
 const osce=window.OSCEPilot?.bank?.()||[];
 for(const st of osce){
  const course=st.pocusOrder?'pocus':'osce',topic=String(st.number);
  (st.questions||[]).forEach(q=>{
   const item=question('osce:'+topic+':'+q.id,course,topic,st.title,q.prompt,q.answer,[q.memory,...(q.criteria||[])].filter(Boolean).join(' · '),
    'raciocinio',st.priority,st.caseText,{
     criteria:q.criteria,mechanism:st.essential?.oneMinute,pitfall:(st.deeper||[])[0]?.body,
     memory:q.memory||st.essential?.mnemonic,
     example:q.caseText||st.subtitle,transfer:'Como esse achado mudaria sua hipótese ou conduta em outro paciente?',
     sources:st.sources||[],
     image:(st.images||[]).find(img=>img?.src&&!img.revealedOnly&&img.kind==='reference')
    });
   if(item){item.fromSimulationError=weakOsce.has(item.id);entries.push(item);}
  });
 }
 for(const t of window.MASTER_DATA?.topics||[])(t.chapters||[]).forEach((c,i)=>{
  const base='p2:'+t.id+':'+i,ctx=t.title+' · '+c.name,common={mechanism:c.patho,pitfall:c.exception,memory:c.memory,example:c.exam,transfer:c.discursive};
  const rows=[
   ['mecanismo','Explique a fisiopatologia de '+c.name+'.',c.patho,c.why,'explicacao',{...common,criteria:[c.anchor,c.why,c.clinic]}],
   ['clinica','Quais sinais clínicos e achados direcionam a investigação de '+c.name+'?',c.clinic,[c.tests,c.exception].filter(Boolean).join(' · '),'discriminacao',{...common,criteria:[c.clinic,c.tests,c.exception]}],
   ['conduta','Descreva a estratégia inicial e os principais riscos no manejo de '+c.name+'.',c.strategy,[c.exception,c.exam].filter(Boolean).join(' · '),'aplicacao',{...common,criteria:[c.strategy,c.exception,c.exam]}]
  ];
  rows.forEach(row=>{const item=question(base+':'+row[0],'p2',t.id,t.title,row[1],row[2],row[3],row[4],String(t.priority).toLowerCase(),ctx,row[5]);if(item)entries.push(item);});
  entries.push(...enrich(base,window.LessonDeep?.get?.(t.id,i),t.id,'p2'));
 });
 const p1=window.P1?.topics||window.MASTER_P1_DATA?.topics||[];
 for(const t of p1)(t.chapters||[]).forEach((c,i)=>{
  const base='p1:'+t.id+':'+i,ctx=t.title+' · '+c.name,common={mechanism:c.mechanism,pitfall:c.pitfall,memory:c.memorize,example:c.exam,transfer:c.discursive};
  [
   ['mecanismo','Explique o mecanismo e a apresentação de '+c.name+'.',[c.mechanism,c.clinical].filter(Boolean).join(' · '),c.memorize,'explicacao',{...common,criteria:[c.mechanism,c.clinical]}],
   ['diagnostico','Como você investiga e diferencia '+c.name+'?',c.diagnostics,[c.pitfall,c.comparison].filter(Boolean).join(' · '),'discriminacao',{...common,criteria:[c.diagnostics,c.pitfall,c.comparison]}],
   ['tratamento','Qual sua conduta inicial diante de '+c.name+'?',c.treatment,[c.protocol,c.exam].filter(Boolean).join(' · '),'aplicacao',{...common,criteria:[c.treatment,c.protocol,c.exam]}]
  ].forEach(row=>{const item=question(base+':'+row[0],'p1',t.id,t.title,row[1],row[2],row[3],row[4],'media',ctx,row[5]);if(item)entries.push(item);});
  entries.push(...enrich(base,window.LessonDeep?.get?.(t.id,i),t.id,'p1'));
 });
 const cir=window.CIR?.topics||window.MASTER_CIR_DATA?.topics||[];
 for(const t of cir)(t.chapters||[]).forEach((c,i)=>{
  const id='cir:'+t.id+':'+i,ctx=t.title+' · '+c.name,deep=window.LessonDeep?.get?.(t.id,i);
  const item=question(id,'cir',t.id,t.title,'Sem consultar a aula, explique os pontos essenciais de '+c.name+'.',c.hy,
   'O resumo é uma pista inicial: confira os detalhes da aula antes de concluir que domina o tema.','recuperacao','media',ctx,{
    criteria:(deep?.reasoning||[]).slice(0,4),mechanism:deep?.sections?.[0]?.p?.[0],pitfall:deep?.pitfalls?.[0],memory:deep?.mnemonics?.[0]?.t,
    example:deep?.practice?.[0],transfer:deep?.cases?.[0]?.ask,sources:deep?.refs||[]
   });
  if(item)entries.push(item);
  entries.push(...enrich(id,deep,t.id,'cir'));
 });
 const ue=window.Emergency?.all||window.EMERGENCY_CONTENT||[];
 for(const m of ue){
  const common={mechanism:m.sections?.[0]?.p?.[0],pitfall:m.pitfalls?.[0],memory:m.summary,example:m.case?.stem,transfer:m.case?.ask,criteria:m.case?.answer||[]};
  const item=question('ue:'+m.id+':case','ue',m.id,m.title,m.case?.ask,m.case?.answer?.join(' · '),m.case?.stem,'aplicacao','alta',m.case?.stem,common);
  if(item)entries.push(item);
  (m.quiz||[]).forEach((q,i)=>{
   const correct=Array.isArray(q.o)?q.o[q.a]:null;
   const x=question('ue:'+m.id+':quiz:'+i,'ue',m.id,m.title,'Justifique sua decisão: '+q.q,correct,q.why,'discriminacao','media',m.summary,
    {...common,criteria:[correct,q.why].filter(Boolean)});
   if(x)entries.push(x);
  });
  (m.flow||[]).slice(0,6).forEach((flow,i)=>{
   if(!Array.isArray(flow)||flow.length<2)return;
   const x=question('ue:'+m.id+':decision:'+i,'ue',m.id,m.title,'Diante de '+flow[0]+', qual a decisão inicial e por quê?',flow[1],m.pitfalls?.join(' · '),'aplicacao','alta',m.summary,common);
   if(x)entries.push(x);
  });
 }
 return entries;
}
function topics(){
 const out=new Map();for(const x of catalog()){const id=x.course+':'+x.topic;
  if(!out.has(id))out.set(id,{course:x.course,topic:x.topic,title:x.title,count:0});
  out.get(id).count++;
 }
 return [...out.values()];
}
function status(x){
 const r=state.records[x.id];if(!r)return 'nova';
 return new Date(r.due||0).getTime()<=Date.now()?'vencida':r.score<80?'revisao':'em dia';
}
function priority(x){
 const s=status(x),r=state.records[x.id];
 return (s==='vencida'?0:x.fromSimulationError?1:s==='nova'?2:r?.score<80?3:4)*100+
  (x.priority==='alta'?0:15)+(r?.attempts||0);
}
function candidatePool(course,topic,mixed){
 const items=catalog().filter(x=>x.course===course&&(!topic||mixed||x.topic===topic))
  .sort((a,b)=>priority(a)-priority(b)||a.id.localeCompare(b.id));
 if(!mixed||!topic)return items;
 // Interleaving de assuntos de uma mesma disciplina, mantendo a seleção inicial pertinente.
 const primary=items.filter(x=>x.topic===topic),others=items.filter(x=>x.topic!==topic);
 if(!primary.length||!others.length)return items;
 const order=[],used=new Set();let turn=0,prev='';
 while(order.length<items.length){
  const candidates=[...primary,...others].filter(x=>!used.has(x.id));
  if(!candidates.length)break;
  let candidate=candidates.filter(x=>x.topic!==prev).sort((a,b)=>
   ((turn===0&&a.topic===topic)?-50:0)-((turn===0&&b.topic===topic)?-50:0)||priority(a)-priority(b))[0];
  if(!candidate)candidate=candidates[0];
  order.push(candidate);used.add(candidate.id);prev=candidate.topic;turn++;
 }
 return order;
}
const session=()=>state.session;
function note(id){
 const run=session();if(!run)return null;
 if(!run.notes||typeof run.notes!=='object')run.notes={};
 return run.notes[id]||(run.notes[id]={draft:'',confidence:0,phase:'challenge',mirror:'',connection:'',visitedAt:new Date().toISOString(),hints:0});
}
function current(){const run=session();return run?.items?.[run.cursor]||null;}
function currentNote(){const x=current();return x?note(x.id):null;}
function goto(){if(typeof navigate==='function')navigate('superfoco');else if(typeof location!=='undefined')location.hash='#superfoco';}
function begin(course,topic){
 selection={course:courseTitles[course]?course:'osce',topic:String(topic??''),mixed:!!state.settings.mixed};
 const full=candidatePool(selection.course,selection.topic,selection.mixed);
 const items=full.slice(0,Math.min(full.length,[1,5,10].includes(Number(state.settings.size))?Number(state.settings.size):5));
 if(!items.length){stage='catalog';inform('Ainda não há desafios cadastrados neste tema.');goto();return;}
 state.session={version:2,course:selection.course,topic:selection.topic,mixed:selection.mixed,size:items.length,
  items,ids:items.map(x=>x.id),cursor:0,notes:{},status:'active',startedAt:new Date().toISOString()};
 note(items[0].id);
 stage='exercise';loadingMessage='';focusPhase='challenge';persist();goto();
}
function open(course,topic){
 ensureOwner();
 const route={p1:'p1topic',p2:'topic',cir:'cirtopic'}[course];
 if(route&&window.RouteAssets?.ready?.(route)===false){
  stage='loading';loadingMessage='Carregando os aprofundamentos desta disciplina…';goto();
  window.RouteAssets.ensure(route).then(()=>{if(stage==='loading')begin(course,topic);})
   .catch(()=>{if(stage==='loading'){inform('Aulas aprofundadas indisponíveis. Abrindo conteúdo básico existente.');begin(course,topic);}});
  return;
 }
 begin(course,topic);
}
function choose(course,topic){open(course,topic);}
function resume(){
 ensureOwner();if(!session()?.items?.length)return back();
 selection={course:session().course,topic:session().topic,mixed:!!session().mixed};
 stage=session().status==='complete'?'summary':'exercise';goto();
}
function back(){ensureOwner();stage='catalog';persist();goto();}
function setLength(n){
 const size=Number(n);if(![1,5,10].includes(size))return;
 state.settings.size=size;persist();rerender();
}
function setMixed(value){state.settings.mixed=!!value;persist();rerender();}
function toggleMix(value){setMixed(value);inform('A intercalação será aplicada na próxima sessão para preservar a atual.');}
function searchSet(value){search=String(value||'').slice(0,80);rerender();}
function input(v){const n=currentNote();if(!n||n.phase!=='challenge')return;n.draft=String(v||'').slice(0,5000);persist();}
function mirrorInput(v){const n=currentNote();if(!n||n.phase!=='mirror')return;n.mirror=String(v||'').slice(0,5000);persist();}
function connectionInput(v){const n=currentNote();if(!n||n.phase!=='connection')return;n.connection=String(v||'').slice(0,5000);persist();}
function conf(n){const x=currentNote();if(!x||x.phase!=='challenge')return;x.confidence=Math.min(3,Math.max(0,Number(n)||0));persist();if(typeof document!=='undefined')document.querySelectorAll('[data-sf-confidence]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.sfConfidence)===x.confidence)));}
function hint(){const n=currentNote();if(!n||n.phase!=='challenge')return;n.hints=Math.min(2,(n.hints||0)+1);persist();rerender();}
function reveal(){
 const n=currentNote();if(!n||n.phase!=='challenge')return;
 if(!trim(n.draft)){inform('Escreva a tentativa ou “não sei” antes de conferir.');return;}
 if(!n.confidence){inform('Escolha sua confiança antes de conferir.');return;}
 n.phase='feedback';persist();rerender();
}
function mirror(){
 const n=currentNote();if(!n||n.phase==='challenge')return;
 n.phase='mirror';persist();rerender();
}
function mirrorCheck(){const n=currentNote();if(!n||n.phase!=='mirror')return;n.mirrorChecked=true;persist();rerender();}
function connect(){
 const n=currentNote();if(!n||n.phase==='challenge')return;
 n.phase='connection';persist();rerender();
}
function feedback(){const n=currentNote();if(!n||n.phase==='challenge')return;n.phase='feedback';persist();rerender();}
function goTo(i){
 const run=session(),index=Number(i);
 if(!run||!Number.isInteger(index)||index<0||index>=run.items.length)return;
 run.cursor=index;note(run.items[index].id);if(run.status==='complete')run.status='active';
 stage='exercise';persist();rerender();
}
function previous(){if(session())goTo(Math.max(0,session().cursor-1));}
function next(){if(session())goTo(Math.min(session().items.length-1,session().cursor+1));}
function finishSession(){
 const run=session();if(!run)return;
 run.status='complete';run.completedAt=new Date().toISOString();
 stage='summary';persist();rerender();
}
function score(n){
 const item=current(),run=session(),x=currentNote();if(!x||!item||!run||x.phase==='challenge'||x.grade!==undefined)return;
 const pct=[0,40,75,100][Math.max(0,Math.min(3,Number(n)||0))],prev=state.records[item.id],high=x.confidence===3&&pct<80;
 const interval=pct<50||high?1:pct<80?3:pct===100&&(prev?.score||0)>=80?21:7;
 const at=new Date().toISOString();
 state.records[item.id]={score:pct,due:daysFromNow(interval),lastAt:at,attempts:(prev?.attempts||0)+1,
  confidence:x.confidence,overconfident:high,history:[...(prev?.history||[]),{at,score:pct,confidence:x.confidence,
   answer:trim(x.draft).slice(0,1200),mirror:trim(x.mirror).slice(0,700),connection:trim(x.connection).slice(0,700)}].slice(-12)};
 x.grade=pct;x.phase='graded';x.gradedAt=at;
 if(run.cursor<run.items.length-1){run.cursor++;note(run.items[run.cursor].id);stage='exercise';}
 else {run.status='complete';run.completedAt=at;stage='summary';}
 persist();rerender();
}
function retry(){
 const n=currentNote();if(!n)return;
 n.phase='challenge';n.draft='';n.confidence=0;n.hints=0;n.mirror='';n.connection='';n.mirrorChecked=false;
 delete n.grade;persist();rerender();
}
function modeTitle(kind){return ({recuperacao:'Arranco da Gaveta',explicacao:'Explique o mecanismo',discriminacao:'Diferencie hipóteses',aplicacao:'Decisão clínica',raciocinio:'Arguição OSCE'})[kind]||'Recuperação ativa';}
function techniques(){
 return '<details class="sf-method-guide"><summary>Como funcionam as cinco técnicas do Super Foco? <span>ver método</span></summary>'+
  '<ol><li><strong>Arranco da Gaveta:</strong> tente recuperar de memória antes de olhar.</li>'+
  '<li><strong>Respiro da Névoa:</strong> retestes com intervalos D+1, D+3, D+7 ou D+21.</li>'+
  '<li><strong>Embaralhamento de Cartas:</strong> alterne assuntos relacionados, sem repetir sempre a mesma resposta.</li>'+
  '<li><strong>Espelho Cego:</strong> explique novamente sem enxergar a resposta-modelo.</li>'+
  '<li><strong>Velcro de Conceitos:</strong> conecte o tema a outro conhecimento e a uma situação clínica.</li></ol>'+
  '<p>São estratégias de aprendizagem; nenhuma delas garante desempenho específico ou elimina a procrastinação. A entrada de um único desafio reduz a barreira inicial.</p></details>';
}
function catalogPage(){
 const items=topics().filter(x=>!search||[x.title,courseTitles[x.course]].join(' ').toLowerCase().includes(search.toLowerCase()));
 const byCourse=Object.keys(courseTitles).map(course=>{
  const found=items.filter(x=>x.course===course);if(!found.length)return '';
  return '<section class="sf-group"><h2>'+esc(courseTitles[course])+' <small>'+found.length+' temas</small></h2><div class="sf-topics">'+found.map(x=>
   '<button type="button" onclick="SuperFoco.choose(\''+esc(x.course)+'\',\''+esc(x.topic)+'\')"><strong>'+esc(x.title)+'</strong><span>'+x.count+' desafios · Começar o treino</span></button>').join('')+'</div></section>';
 }).join('');
 const all=catalog(),due=all.filter(x=>status(x)==='vencida').length,done=all.filter(x=>!!state.records[x.id]).length;
 const run=session(),resumeButton=run?.status==='active'&&run.items?.length?
  '<div class="sf-resume"><div><strong>Sessão interrompida · '+esc(courseTitles[run.course])+'</strong><small>Desafio '+(run.cursor+1)+' de '+run.items.length+' · suas respostas foram preservadas</small></div><button type="button" class="btn primary" onclick="SuperFoco.resume()">Retomar sessão →</button></div>':'';
 return '<div class="sf-page"><header class="page-header"><p class="eyebrow">CLÍNICA MASTER · APRENDIZAGEM ATIVA</p><h1>Super <em>Foco.</em></h1><p>Uma trilha guiada para sair da leitura passiva: recupere, verifique critérios, explique sem olhar e faça conexões clínicas. Sem substituir a revisão nem a simulação.</p></header>'+
  resumeButton+'<section class="sf-stats"><span><strong>'+done+'</strong> desafios treinados</span><span><strong>'+due+'</strong> revisões vencidas</span><span><strong>'+all.length+'</strong> desafios disponíveis</span></section>'+
  '<section class="sf-launch" aria-label="Configurar sessão"><div><strong>Comece pequeno</strong><p>Você não precisa completar uma aula inteira. Escolha apenas uma pergunta ou uma sessão curta.</p></div>'+
  '<div class="sf-launch-options" role="group" aria-label="Quantidade de desafios por sessão">'+[[1,'1 desafio'],[5,'5 desafios'],[10,'10 desafios']].map(z=>
   '<button type="button" class="sf-length-choice" aria-pressed="'+(state.settings.size===z[0])+'" onclick="SuperFoco.setLength('+z[0]+')">'+z[1]+'</button>').join('')+'</div>'+
  '<label class="sf-mix-setting"><input type="checkbox" '+(state.settings.mixed?'checked ':'')+'onchange="SuperFoco.setMixed(this.checked)"> Intercalar assuntos da mesma disciplina</label></section>'+
  techniques()+'<label class="sf-search">Escolha seu assunto<input type="search" placeholder="Buscar disciplina ou assunto" value="'+esc(search)+'" oninput="SuperFoco.searchSet(this.value)"></label>'+
  byCourse+'</div>';
}
function navPanel(run){
 const complete=run.items.filter(x=>run.notes[x.id]?.grade!==undefined).length;
 const buttons=run.items.map((x,i)=>{
  const n=run.notes[x.id],kind=n?.grade!==undefined?'concluído':n?.draft?'iniciado':n?'visitado':'pendente';
  return '<button type="button" class="sf-nav-number" aria-label="Ir à pergunta '+(i+1)+', '+esc(kind)+': '+esc(x.title)+'" aria-current="'+(i===run.cursor?'step':'false')+
   '" data-status="'+kind+'" onclick="SuperFoco.goTo('+i+')">'+(i+1)+'</button>';
 }).join('');
 return '<nav class="sf-session-nav" aria-label="Mapa de perguntas da sessão"><div class="sf-nav-head"><strong>Pergunta '+(run.cursor+1)+' de '+run.items.length+
  '</strong><span>'+complete+' concluída(s)</span></div><progress value="'+complete+'" max="'+run.items.length+'" aria-label="Progresso da sessão: '+complete+' de '+run.items.length+' concluídas"></progress>'+
  '<div class="sf-nav-dots">'+buttons+'</div><div class="sf-nav-legend"><span>● Atual</span><span>✓ Concluída</span><span>○ Pendente</span></div>'+
  '<div class="sf-nav-arrows"><button type="button" class="btn ghost" '+(run.cursor===0?'disabled ':'')+'onclick="SuperFoco.previous()">← Anterior</button>'+
  '<button type="button" class="btn ghost" '+(run.cursor===run.items.length-1?'disabled ':'')+'onclick="SuperFoco.next()">Próxima →</button></div></nav>';
}
function phaseBar(phase){
 const phases=[['challenge','1 · Recuperar'],['feedback','2 · Conferir'],['mirror','3 · Espelho cego'],['connection','4 · Conectar']];
 const n=phase==='graded'?4:Math.max(1,phases.findIndex(x=>x[0]===phase)+1);
 return '<div class="sf-phasebar" aria-label="Etapas do aprendizado">'+phases.map((z,i)=>
  '<span class="'+(i+1===n?'is-current':i+1<n?'is-done':'')+'">'+esc(z[1])+'</span>').join('')+'</div>';
}
function rationalePanel(x){
 const blocks=[
  ['Checklist do que não pode faltar',x.criteria.length?'<ul>'+x.criteria.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul>':'<p>'+esc(x.extra||'Consulte os critérios do roteiro completo.')+'</p>','criteria'],
  ['Entenda o mecanismo',x.mechanism?'<p>'+esc(x.mechanism)+'</p>':'','mechanism'],
  ['Armadilhas e diagnósticos diferenciais',x.pitfall?'<p>'+esc(x.pitfall)+'</p>':'','pitfall'],
  ['Âncora de memória',x.memory?'<p>'+esc(x.memory)+'</p>':'','memory'],
  ['Aplicação em outro contexto',x.example?'<p>'+esc(x.example)+'</p>':'','example']
 ].filter(z=>z[1]);
 return '<div class="sf-deep-panels">'+blocks.map((z,i)=>
  '<details class="sf-deep" '+(i===0?'open ':'')+'><summary>'+esc(z[0])+' <span>abrir / recolher</span></summary><div>'+z[1]+'</div></details>').join('')+'</div>';
}
function readAloud(which){
 const x=current();if(!x)return;
 const text=which==='answer'?x.answer:x.prompt;
 if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){inform('Leitura em voz alta indisponível neste navegador.');return;}
 try{window.speechSynthesis.cancel();const utterance=new window.SpeechSynthesisUtterance(text);utterance.lang='pt-BR';utterance.rate=0.96;window.speechSynthesis.speak(utterance);}
 catch{inform('A reprodução da fala não está disponível neste dispositivo.');}
}
function listenButton(which){
 return window.speechSynthesis&&window.SpeechSynthesisUtterance?
  '<button type="button" class="btn ghost sf-listen" onclick="SuperFoco.readAloud(\''+which+'\')">🔊 Ouvir '+(which==='answer'?'a resposta':'a pergunta')+'</button>':'';
}
function caseImage(x){
 if(!x.image?.src)return '';
 return '<figure class="sf-case-image"><img src="'+esc(x.image.src)+'" loading="lazy" alt="Imagem clínica de referência para esta estação; interpretação a realizar pelo aluno"><figcaption>Imagem de referência didática, não necessariamente do paciente da vinheta. Veja as marcações e fontes na estação OSCE completa.</figcaption></figure>';
}
function voiceButton(which){
 return window.SpeechRecognition||window.webkitSpeechRecognition?
  '<button type="button" class="btn ghost sf-dictate" onclick="SuperFoco.dictate(\''+which+'\')">🎤 Ditar com microfone</button>':
  '<span class="sf-voice-hint">Você também pode explicar em voz alta, sem gravação.</span>';
}
function challengePage(x,n){
 const hintText=x.kind==='raciocinio'?'Organize a resposta em antes, durante, depois, exame e conduta.':
  x.kind==='discriminacao'?'Qual achado realmente diferencia as duas hipóteses?':
  x.kind==='aplicacao'?'Comece pela gravidade e pela primeira decisão.':'Recupere o mecanismo e diga como ele aparece na clínica.';
 return '<section class="sf-question"><p class="eyebrow">ARRANCO DA GAVETA · ETAPA 1</p><h2>'+esc(x.prompt)+'</h2>'+
  '<p class="sf-prompt-guidance">Feche mentalmente o material. Recupere o máximo que conseguir, mesmo que a resposta seja incompleta. Não precisa acertar para começar.</p>'+caseImage(x)+
  '<label for="sf-answer">O que você consegue lembrar sem consultar?</label><textarea id="sf-answer" rows="6" oninput="SuperFoco.input(this.value)" placeholder="Pode escrever uma palavra, os passos essenciais ou “não sei”...">'+esc(n.draft)+'</textarea>'+
  '<div class="sf-voice-row">'+listenButton('question')+voiceButton('draft')+'</div>'+
  (n.hints?'<p class="sf-hint"><strong>Pista de raciocínio:</strong> '+esc(hintText)+'</p>':'')+
  '<fieldset class="sf-confidence"><legend>Qual sua confiança nesta resposta?</legend>'+[[1,'Baixa'],[2,'Média'],[3,'Alta']].map(z=>
   '<button type="button" data-sf-confidence="'+z[0]+'" aria-pressed="'+(n.confidence===z[0])+'" onclick="SuperFoco.conf('+z[0]+')">'+z[1]+'</button>').join('')+'</fieldset>'+
  '<div class="sf-action-row"><button type="button" class="btn primary" onclick="SuperFoco.reveal()">Conferir meu raciocínio →</button>'+
  '<button type="button" class="btn ghost" onclick="SuperFoco.hint()">Quero uma pista</button>'+
  (session().cursor<session().items.length-1?'<button type="button" class="btn ghost" onclick="SuperFoco.next()">Pular sem penalidade →</button>':'')+'</div></section>';
}
function feedbackPage(x,n){
 return '<section class="sf-question sf-feedback"><p class="eyebrow">FEEDBACK FORMATIVO · ETAPA 2</p><h2>Compare seu raciocínio com o esperado</h2>'+
  '<div class="sf-attempt"><strong>Sua tentativa</strong><p>'+esc(n.draft)+'</p></div>'+
  '<div class="sf-answer"><h3>Modelo de resposta</h3><p>'+esc(x.answer)+'</p>'+listenButton('answer')+'</div>'+
  rationalePanel(x)+
  '<div class="sf-action-row"><button type="button" class="btn primary" onclick="SuperFoco.mirror()">Agora explicar sem olhar →</button>'+
  '<button type="button" class="btn" onclick="SuperFoco.connect()">Criar uma conexão clínica</button>'+
  '<button type="button" class="btn ghost" onclick="SuperFoco.openSource()">↗ Aula completa e referências</button></div>'+
  gradePanel()+'</section>';
}
function mirrorPage(x,n){
 return '<section class="sf-question"><p class="eyebrow">TESTE DO ESPELHO CEGO · ETAPA 3</p><h2>Explique sem enxergar a resposta</h2>'+
  '<p class="sf-prompt-guidance">Imagine que você está explicando a um colega mais novo: qual é a lógica da decisão, por que acontece e como reconhecer? Fale primeiro, depois registre o essencial.</p>'+
  '<div class="sf-mirror-prompt"><strong>Seu desafio</strong><p>'+esc(x.prompt)+'</p></div>'+
  '<label for="sf-mirror">Minha explicação com palavras simples</label><textarea id="sf-mirror" rows="5" oninput="SuperFoco.mirrorInput(this.value)" placeholder="A ideia central é... porque... então na prática...">'+esc(n.mirror||'')+'</textarea>'+
  '<div class="sf-voice-row">'+listenButton('question')+voiceButton('mirror')+'</div>'+
  (n.mirrorChecked?'<div class="sf-answer"><h3>Compare mais uma vez</h3><p>'+esc(x.answer)+'</p></div>':'')+
  '<div class="sf-action-row"><button type="button" class="btn primary" onclick="SuperFoco.connect()">Agora conectar conceitos →</button>'+
  '<button type="button" class="btn ghost" onclick="SuperFoco.mirrorCheck()">Mostrar resposta para conferir</button>'+
  '<button type="button" class="btn ghost" onclick="SuperFoco.feedback()">Rever critérios</button></div>'+
  gradePanel()+'</section>';
}
function connectionPage(x,n){
 return '<section class="sf-question"><p class="eyebrow">VELCRO DE CONCEITOS · ETAPA 4</p><h2>Ligue este conhecimento a algo que você já domina</h2>'+
  '<p class="sf-prompt-guidance">Busque uma semelhança, uma diferença ou uma consequência clínica. Fazer uma conexão útil é mais importante do que criar uma analogia bonita.</p>'+
  '<div class="sf-mirror-prompt"><strong>Transferência clínica</strong><p>'+esc(x.transfer||'Em qual outra condição ou cenário esta explicação ajudaria a tomar uma decisão?')+'</p>'+
  (x.example?'<details class="sf-deep"><summary>Ver um exemplo do material da aula</summary><div><p>'+esc(x.example)+'</p></div></details>':'')+'</div>'+
  '<label for="sf-connection">Conexão que vou usar para lembrar</label><textarea id="sf-connection" rows="4" oninput="SuperFoco.connectionInput(this.value)" placeholder="Isso se parece com... mas muda quando... porque...">'+esc(n.connection||'')+'</textarea>'+
  '<div class="sf-action-row"><button type="button" class="btn ghost" onclick="SuperFoco.feedback()">Rever explicações</button>'+
  '<button type="button" class="btn ghost" onclick="SuperFoco.mirror()">Explicar outra vez sem olhar</button></div>'+
  gradePanel()+'</section>';
}
function gradePanel(){
 const n=currentNote();
 if(n?.grade!==undefined)return '<div class="sf-grade"><p><strong>Autoavaliação registrada: '+n.grade+'%.</strong> Abrir estes painéis não cria uma nova tentativa. Para testar a memória outra vez, use o botão abaixo.</p><button type="button" class="btn ghost" onclick="SuperFoco.retry()">Nova tentativa sem consulta</button></div>';
 return '<div class="sf-grade"><p><strong>Como foi sua recuperação antes de consultar?</strong> Avalie com rigor. A nota do Super Foco é só autoavaliação e não interfere na Simulação.</p>'+
  [[0,'Não sabia'],[1,'Pouco'],[2,'Quase tudo'],[3,'Completo']].map(z=>
  '<button type="button" class="btn" onclick="SuperFoco.score('+z[0]+')">'+z[1]+'</button>').join('')+'</div>';
}
function gradedPage(x,n){
 return '<section class="sf-question"><p class="eyebrow">REVISADO · MEMÓRIA EM CONSTRUÇÃO</p><h2>Desafio registrado</h2>'+
  '<div class="sf-answer"><strong>Autoavaliação: '+n.grade+'%</strong><p>Este desafio foi agendado para um reteste futuro, conforme seu desempenho. Você pode revisar a resposta ou tentar novamente.</p></div>'+
  '<div class="sf-action-row"><button type="button" class="btn primary" onclick="SuperFoco.retry()">Tentar novamente sem consultar</button>'+
  '<button type="button" class="btn" onclick="SuperFoco.feedback()">Ver explicações</button></div></section>';
}
function exercisePage(){
 const run=session(),x=current();if(!x||!run)return '<section class="sf-page"><h1>Sem desafios nesta sessão</h1><button type="button" class="btn" onclick="SuperFoco.back()">Escolher outro tema</button></section>';
 const n=note(x.id),rec=state.records[x.id],due=rec?'Reteste: '+new Date(rec.due).toLocaleDateString('pt-BR'):'Desafio novo';
 return '<div class="sf-page sf-training"><div class="sf-training-top"><button type="button" class="btn ghost" onclick="SuperFoco.back()">← Pausar e escolher tema</button>'+
  '<button type="button" class="btn ghost" onclick="SuperFoco.finishSession()">Encerrar e ver resumo</button></div>'+
  '<header class="sf-exercise-header"><p class="eyebrow">'+esc(courseTitles[run.course])+' · '+esc(modeTitle(x.kind))+'</p><h1>'+esc(x.title)+'</h1>'+
  '<p>'+esc(x.context||'Uma pergunta por vez. Avance no seu ritmo.')+'</p></header>'+
  navPanel(run)+phaseBar(n.phase)+
  '<div class="sf-training-meta"><span>'+esc(due)+'</span><span>'+(run.mixed?'Intercalação ativa entre temas':'Sequência focada no tema')+'</span></div>'+
  (n.phase==='graded'?gradedPage(x,n):n.phase==='feedback'?feedbackPage(x,n):n.phase==='mirror'?mirrorPage(x,n):n.phase==='connection'?connectionPage(x,n):challengePage(x,n))+
  '<div class="sf-training-foot"><button type="button" class="btn ghost" onclick="SuperFoco.previous()" '+(run.cursor===0?'disabled':'')+'>← Pergunta anterior</button>'+
  '<span>Você pode navegar sem perder o rascunho.</span><button type="button" class="btn ghost" onclick="SuperFoco.next()" '+(run.cursor===run.items.length-1?'disabled':'')+'>Próxima pergunta →</button></div>'+
  techniques()+'<p class="sf-disclaimer">Aprendizagem acadêmica com autocorreção. Pontuações de simulações não são alteradas. Respostas deste treino são armazenadas localmente por usuário.</p></div>';
}
function summaryPage(){
 const run=session();if(!run)return catalogPage();
 const completed=run.items.filter(x=>run.notes[x.id]?.grade!==undefined);
 const pending=run.items.length-completed.length;
 const weak=completed.filter(x=>(run.notes[x.id]?.grade||0)<80);
 return '<div class="sf-page sf-summary"><header class="page-header"><p class="eyebrow">RESUMO · SUPER FOCO</p><h1>Uma sessão concluída, <em>com progresso real.</em></h1><p>O importante é identificar o que você consegue recuperar sem olhar e o que precisa revisitar.</p></header>'+
  '<section class="sf-stats"><span><strong>'+completed.length+'/'+run.items.length+'</strong> desafios avaliados</span><span><strong>'+weak.length+'</strong> lacunas identificadas</span><span><strong>'+pending+'</strong> sem avaliação</span></section>'+
  '<section class="sf-question"><h2>Mapa das perguntas</h2><div class="sf-summary-list">'+run.items.map((x,i)=>{
   const n=run.notes[x.id],grade=n?.grade;
   return '<button type="button" class="sf-summary-item" onclick="SuperFoco.goTo('+i+')"><span>'+(i+1)+'. '+esc(x.prompt)+'</span><strong>'+ (grade===undefined?'Pendente':grade+'%')+'</strong></button>';
  }).join('')+'</div><p class="sf-prompt-guidance">As perguntas avaliadas entram na agenda D+1, D+3, D+7 ou D+21. As pendentes podem ser retomadas sem punição.</p>'+
  '<div class="sf-action-row"><button type="button" class="btn primary" onclick="SuperFoco.back()">Escolher próximo assunto →</button>'+
  (pending?'<button type="button" class="btn" onclick="SuperFoco.goTo('+run.items.findIndex(x=>run.notes[x.id]?.grade===undefined)+')">Voltar às pendentes</button>':'')+
  '<button type="button" class="btn ghost" onclick="SuperFoco.open(\''+esc(run.course)+'\',\''+esc(run.topic)+'\')">Nova sessão no tema</button></div></section></div>';
}
function loadingPage(){
 return '<section class="sf-page"><h1>Preparando o Super Foco</h1><p role="status">'+esc(loadingMessage||'Carregando os desafios...')+'</p><button type="button" class="btn" onclick="SuperFoco.back()">Voltar</button></section>';
}
function page(){ensureOwner();return stage==='loading'?loadingPage():stage==='summary'?summaryPage():stage==='exercise'?exercisePage():catalogPage();}
function dictate(which){
 const Ctor=window.SpeechRecognition||window.webkitSpeechRecognition;if(!Ctor)return inform('Ditado indisponível neste navegador. Use a resposta escrita ou explique em voz alta.');
 const n=currentNote();if(!n)return;
 try{
  const recog=new Ctor();recog.lang='pt-BR';recog.interimResults=false;recog.maxAlternatives=1;
  recog.onresult=e=>{
   const result=e.results?.[0]?.[0]?.transcript||'';
   if(!result)return;
   const target=currentNote();if(!target)return;
   const keyName=which==='mirror'?'mirror':'draft';
   target[keyName]=trim((target[keyName]||'')+' '+result);
   persist();
   const el=document.getElementById(which==='mirror'?'sf-mirror':'sf-answer');
   if(el)el.value=target[keyName];else rerender();
  };
  recog.onerror=()=>inform('Não foi possível usar o microfone. Continue pelo teclado.');
  recog.start();inform('Ditado iniciado. O reconhecimento depende do navegador.');
 }catch{inform('Não foi possível iniciar o ditado neste dispositivo.');}
}
function openSource(){
 const x=current();if(!x)return;
 if(x.course==='osce'||x.course==='pocus'){
  window.OSCEPilot?.preview?.(Number(x.topic));gotoSource('osce');return;
 }
 if(x.course==='p2'&&typeof window.openTopic==='function'){window.openTopic(x.topic);return;}
 if(x.course==='p1'&&window.P1?.openTopic){window.P1.openTopic(x.topic);return;}
 if(x.course==='cir'&&window.CIR?.openTopic){window.CIR.openTopic(x.topic);return;}
 if(x.course==='ue'){
  const mod=(window.EMERGENCY_CONTENT||[]).find(m=>m.id===x.topic);
  gotoSource(mod?.stage==='P2'?'emergency-p2':'emergency-p1');
 }
}
function gotoSource(route){if(typeof navigate==='function')navigate(route);}
function afterRender(route){
 if(!['topic','p1topic','cirtopic','emergency','emergency-p1','emergency-p2','pocus'].includes(route))return;
 const root=document.getElementById('main-content');if(!root||root.querySelector('.sf-context-entry'))return;
 let course='p2',topic='';
 if(route==='topic'){course='p2';topic=typeof ui==='object'?ui.topic:'';}
 else if(route==='p1topic'){course='p1';try{topic=JSON.parse(localStorage.getItem('master_p1_lucas_v4')||'{}').lastTopic||'';}catch{}}
 else if(route==='cirtopic'){course='cir';try{topic=JSON.parse(localStorage.getItem('master_cir_lucas_v1')||'{}').lastTopic||'';}catch{}}
 else if(route.startsWith('emergency'))course='ue';
 else if(route==='pocus')course='pocus';
 const available=catalog().some(x=>x.course===course&&(!topic||x.topic===topic));
 if(!available)return;
 const banner=document.createElement('div');banner.className='sf-context-entry';banner.innerHTML='<span><strong>Super Foco</strong><small>Sessões com mapa de perguntas, recuperação ativa e conexões clínicas</small></span><button type="button" class="btn" data-sf-open>Treinar agora →</button>';
 banner.querySelector('button').addEventListener('click',()=>open(course,topic));
 const crumb=root.querySelector('.study-breadcrumb');
 if(crumb)crumb.insertAdjacentElement('afterend',banner);else root.prepend(banner);
}
function resetUser(){
 owner=username();state=load();search='';loadingMessage='';
 stage=state.session?.status==='active'?'exercise':state.session?.status==='complete'?'summary':'catalog';
 selection=state.session?{course:state.session.course,topic:state.session.topic,mixed:!!state.session.mixed}:{course:'osce',topic:'',mixed:false};
}
window.addEventListener('master-auth-ready',resetUser);
window.addEventListener('master-auth-ended',()=>{owner='local';state=empty();stage='catalog';search='';loadingMessage='';});
window.addEventListener('storage',e=>{if(e.key===key()){resetUser();rerender();}});
return {page,open,choose,resume,back,setLength,setMixed,searchSet,toggleMix,input,mirrorInput,connectionInput,
 conf,hint,reveal,mirror,mirrorCheck,connect,feedback,goTo,previous,next,finishSession,score,retry,dictate,
 readAloud,openSource,catalog,topics,afterRender,resetUser};
})();