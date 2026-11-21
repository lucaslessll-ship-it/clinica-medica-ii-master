/* Super Foco — camada aditiva de recuperação ativa do Clínica Master.
 * Nenhuma nota modifica resultados de prova/OSCE. Salva autoavaliação apenas neste navegador, por usuário.
 */
window.SuperFoco=(()=>{
'use strict';
const VERSION=1,PREFIX='master_super_foco_v1:';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stext=s=>String(s??'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const daysFromNow=n=>{const d=new Date();d.setDate(d.getDate()+n);return d.toISOString();};
const username=()=>window.MASTER_AUTH?.user?.()?.id||'local';
const key=()=>PREFIX+username();
const empty=()=>({version:VERSION,records:{},updatedAt:null});
function load(){try{const x=JSON.parse(localStorage.getItem(key()));if(x&&x.records&&typeof x.records==='object')return x;}catch{}return empty();}
let state=load(),owner=username(),selection={course:'osce',topic:'',mixed:false},stage='catalog',step=0,shown=false,draft='',confidence=0,activeId='',search='';
const courseTitles={osce:'OSCE · Clínica Médica',pocus:'POCUS · Estações',p2:'Clínica Médica II · P2',p1:'Clínica Médica · P1',cir:'Cirurgia',ue:'Urgência e Emergência'};
function ensureOwner(){const current=username();if(owner!==current){owner=current;state=load();stage='catalog';activeId='';draft='';shown=false;}}
function persist(){state.updatedAt=new Date().toISOString();try{localStorage.setItem(key(),JSON.stringify(state));}catch{if(typeof toast==='function')toast('O progresso do Super Foco não pôde ser salvo neste navegador.');}}
function hasText(v){return typeof v==='string'&&v.trim().length>3;}
function question(id,course,topic,title,prompt,answer,extra,kind,priority,context){
 if(!hasText(prompt)||!hasText(answer))return null;
 return {id,course,topic,title,prompt:stext(prompt),answer:stext(answer),extra:stext(extra),kind:kind||'recuperacao',priority:priority||'media',context:stext(context)};
}
function catalog(){
 const entries=[];
 const weakOsce=new Set((window.OSCEPilot?.weakItems?.()||[]).map(x=>'osce:'+x.st.number+':'+x.q.id));
 const osce=window.OSCEPilot?.bank?.()||[];
 for(const st of osce){
  const course=st.pocusOrder?'pocus':'osce',topic=String(st.number);
  (st.questions||[]).forEach(q=>{
   const extra=[...(q.criteria||[]),q.memory].filter(Boolean).join(' · ');
   const item=question('osce:'+topic+':'+q.id,course,topic,st.title,q.prompt,q.answer,extra,'raciocinio',st.priority,st.caseText);
   if(item){item.fromSimulationError=weakOsce.has(item.id);entries.push(item);}
  });
 }
 const p2=window.MASTER_DATA?.topics||[];
 for(const t of p2)(t.chapters||[]).forEach((c,i)=>{
  const base='p2:'+t.id+':'+i,ctx=t.title+' · '+c.name;
  const rows=[
   ['mecanismo','Explique a fisiopatologia de '+c.name+'.',c.patho,c.why,'explicacao'],
   ['clinica','Quais sinais clínicos e achados direcionam a investigação de '+c.name+'?',c.clinic,[c.tests,c.exception].filter(Boolean).join(' · '),'discriminacao'],
   ['conduta','Descreva a estratégia inicial e os principais riscos no manejo de '+c.name+'.',c.strategy,[c.exception,c.exam].filter(Boolean).join(' · '),'aplicacao']
  ];
  rows.forEach(row=>{const item=question(base+':'+row[0],'p2',t.id,t.title,row[1],row[2],row[3],row[4],String(t.priority).toLowerCase(),ctx);if(item)entries.push(item);});
 });
 const p1=window.P1?.topics||window.MASTER_P1_DATA?.topics||[];
 for(const t of p1)(t.chapters||[]).forEach((c,i)=>{
  const base='p1:'+t.id+':'+i,ctx=t.title+' · '+c.name;
  [
   ['mecanismo','Explique o mecanismo e a apresentação de '+c.name+'.',[c.mechanism,c.clinical].filter(Boolean).join(' · '),c.memorize,'explicacao'],
   ['diagnostico','Como você investiga e diferencia '+c.name+'?',c.diagnostics,[c.pitfall,c.comparison].filter(Boolean).join(' · '),'discriminacao'],
   ['tratamento','Qual sua conduta inicial diante de '+c.name+'?',c.treatment,[c.protocol,c.exam].filter(Boolean).join(' · '),'aplicacao']
  ].forEach(row=>{const item=question(base+':'+row[0],'p1',t.id,t.title,row[1],row[2],row[3],row[4],'media',ctx);if(item)entries.push(item);});
 });
 const cir=window.CIR?.topics||window.MASTER_CIR_DATA?.topics||[];
 for(const t of cir)(t.chapters||[]).forEach((c,i)=>{
  const id='cir:'+t.id+':'+i,ctx=t.title+' · '+c.name;
  const item=question(id,'cir',t.id,t.title,'Sem consultar a aula, explique os pontos essenciais de '+c.name+'.',c.hy,'O resumo serve como ponto de partida; abra a aula completa para critérios, exceções e decisões clínicas.','recuperacao','media',ctx);
  if(item)entries.push(item);
 });
 const ue=window.Emergency?.all||window.EMERGENCY_CONTENT||[];
 for(const m of ue){
  const caseItem=question('ue:'+m.id+':case','ue',m.id,m.title,m.case?.ask,m.case?.answer?.join(' · '),m.case?.stem,'aplicacao','alta',m.case?.stem);
  if(caseItem)entries.push(caseItem);
  (m.quiz||[]).forEach((q,i)=>{
   const correct=Array.isArray(q.o)?q.o[q.a]:null;
   const item=question('ue:'+m.id+':quiz:'+i,'ue',m.id,m.title,'Justifique sua decisão: '+q.q,correct,q.why,'discriminacao','media',m.summary);
   if(item)entries.push(item);
  });
 }
 return entries;
}
function topics(){const items=catalog(),out=[],seen=new Set();for(const x of items){const id=x.course+':'+x.topic;if(seen.has(id))continue;seen.add(id);out.push({course:x.course,topic:x.topic,title:x.title,count:items.filter(q=>q.course===x.course&&q.topic===x.topic).length});}return out;}
function status(x){const r=state.records[x.id];if(!r)return 'nova';return new Date(r.due||0).getTime()<=Date.now()?'vencida':r.score<80?'revisao':'em dia';}
function priority(x){const s=status(x),r=state.records[x.id];return (s==='vencida'?0:x.fromSimulationError?1:s==='nova'?2:r?.score<80?3:4)*100+(x.priority==='alta'?0:15)+(r?.attempts||0);}
function pool(){
 const items=catalog().filter(x=>x.course===selection.course&&(selection.mixed||!selection.topic||x.topic===selection.topic));
 return items.sort((a,b)=>priority(a)-priority(b)||a.id.localeCompare(b.id));
}
function current(){const list=pool();return list.find(x=>x.id===activeId)||list[Math.min(step,list.length-1)]||null;}
function goto(){if(typeof navigate==='function')navigate('superfoco');else if(typeof location!=='undefined')location.hash='#superfoco';}
function open(course,topic){
 ensureOwner();
 selection={course:courseTitles[course]?course:'osce',topic:String(topic??''),mixed:false};
 stage='exercise';shown=false;draft='';confidence=0;step=0;activeId=pool()[0]?.id||'';
 goto();
}
function choose(course,topic){open(course,topic);}
function back(){stage='catalog';activeId='';draft='';shown=false;goto();}
function searchSet(value){search=String(value||'').slice(0,80);if(typeof render==='function')render();}
function toggleMix(value){selection.mixed=!!value;step=0;shown=false;draft='';confidence=0;activeId=pool()[0]?.id||'';if(typeof render==='function')render();}
function input(v){draft=String(v||'').slice(0,5000);}
function conf(n){confidence=Math.min(3,Math.max(0,Number(n)||0));if(typeof document!=='undefined')document.querySelectorAll('[data-sf-confidence]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.sfConfidence)===confidence)));}
function reveal(){
 if(!draft.trim()){if(typeof toast==='function')toast('Escreva sua resposta ou “não sei” antes de conferir.');return;}
 if(!confidence){if(typeof toast==='function')toast('Escolha sua confiança antes de conferir.');return;}
 shown=true;if(typeof render==='function')render();
}
function score(n){
 const item=current();if(!shown||!item)return;
 const pct=[0,40,75,100][Math.max(0,Math.min(3,Number(n)||0))],prev=state.records[item.id],high=confidence===3&&pct<80;
 const interval=pct<50||high?1:pct<80?3:pct===100&&(prev?.score||0)>=80?21:7;
 const at=new Date().toISOString();
 state.records[item.id]={score:pct,due:daysFromNow(interval),lastAt:at,attempts:(prev?.attempts||0)+1,confidence,overconfident:high,history:[...(prev?.history||[]),{at,score:pct,confidence,answer:draft.slice(0,1200)}].slice(-12)};
 persist();
 const next=pool().filter(x=>x.id!==item.id)[0];
 activeId=next?.id||item.id;
 shown=false;confidence=0;draft='';
 if(typeof render==='function')render();
}
function modeTitle(kind){return ({recuperacao:'Recuperação ativa',explicacao:'Explicação em voz alta',discriminacao:'Diferenciação clínica',aplicacao:'Aplicação clínica',raciocinio:'Arguição prática'})[kind]||'Aprendizagem ativa';}
function catalogPage(){
 const list=topics().filter(x=>(!search||[x.title,courseTitles[x.course]].join(' ').toLowerCase().includes(search.toLowerCase())));
 const byCourse=Object.keys(courseTitles).map(course=>{
  const found=list.filter(x=>x.course===course);if(!found.length)return '';
  return '<section class="sf-group"><h2>'+esc(courseTitles[course])+' <small>'+found.length+' temas</small></h2><div class="sf-topics">'+found.map(x=>'<button type="button" onclick="SuperFoco.choose(\''+esc(x.course)+'\',\''+esc(x.topic)+'\')"><strong>'+esc(x.title)+'</strong><span>'+x.count+' desafios · recuperação, explicação e aplicação</span></button>').join('')+'</div></section>';
 }).join('');
 const all=catalog(),due=all.filter(x=>status(x)==='vencida').length,done=all.filter(x=>!!state.records[x.id]).length;
 return '<div class="sf-page"><header class="page-header"><p class="eyebrow">ESTUDO MASTER · MÉTODO ATIVO</p><h1>Modo <em>Super Foco.</em></h1><p>Um terceiro modo de aprendizagem, sem substituir Revisão e Simulação. Responda de memória, confira a justificativa, explique em voz alta e revisite os erros.</p></header>'
  +'<section class="sf-stats"><span><strong>'+done+'</strong> desafios revisados</span><span><strong>'+due+'</strong> retestes vencidos</span><span><strong>'+all.length+'</strong> desafios disponíveis</span></section>'
  +'<label class="sf-search">Encontrar tema<input type="search" placeholder="Buscar disciplina ou assunto" value="'+esc(search)+'" oninput="SuperFoco.searchSet(this.value)"></label>'
  +byCourse+'</div>';
}
function exercisePage(){
 const x=current();if(!x)return '<section class="sf-page"><h1>Sem exercícios neste tema</h1><button class="btn" onclick="SuperFoco.back()">Voltar aos temas</button></section>';
 const rec=state.records[x.id],due=rec?'Próximo reteste: '+new Date(rec.due).toLocaleDateString('pt-BR'):'Novo desafio',total=pool().length;
 return '<div class="sf-page"><button type="button" class="btn ghost" onclick="SuperFoco.back()">← Escolher outro tema</button>'
  +'<header class="page-header sf-exercise-header"><p class="eyebrow">'+esc(courseTitles[selection.course])+' · '+esc(modeTitle(x.kind))+'</p><h1>'+esc(x.title)+'</h1><p>'+esc(x.context||'Aprenda recuperando informações antes do gabarito.')+'</p></header>'
  +'<section class="sf-control"><span>'+esc(due)+'</span><span>'+total+' desafios no conjunto</span><label><input type="checkbox" '+(selection.mixed?'checked ':'')+'onchange="SuperFoco.toggleMix(this.checked)"> Intercalar temas desta disciplina</label></section>'
  +'<section class="sf-question"><p class="eyebrow">PERGUNTA · SEM CONSULTAR O GABARITO</p><h2>'+esc(x.prompt)+'</h2>'
  +'<label for="sf-answer">Explique com suas palavras (você pode escrever “não sei”)</label><textarea id="sf-answer" rows="5" '+(shown?'readonly ':'')+'oninput="SuperFoco.input(this.value)" placeholder="Anamnese, mecanismo, raciocínio, exames, conduta...">'+esc(draft)+'</textarea>'
  +(!shown?'<fieldset class="sf-confidence"><legend>Sua confiança antes de conferir</legend>'+[[1,'Baixa'],[2,'Média'],[3,'Alta']].map(z=>'<button type="button" data-sf-confidence="'+z[0]+'" aria-pressed="'+(confidence===z[0])+'" onclick="SuperFoco.conf('+z[0]+')">'+z[1]+'</button>').join('')+'</fieldset><button class="btn primary" onclick="SuperFoco.reveal()">Conferir e aprofundar</button>'
  :'<div class="sf-answer" role="status"><h3>Resposta esperada</h3><p>'+esc(x.answer)+'</p>'+(x.extra?'<details><summary>Critérios, armadilhas e conexões</summary><p>'+esc(x.extra)+'</p></details>':'')+'<p class="sf-reflect"><strong>Espelho cego:</strong> feche mentalmente a resposta e explique em voz alta por que essa conduta ou mecanismo faz sentido. Que conceito anterior ajuda a lembrar?</p></div><div class="sf-grade"><p>Marque o quanto você conseguiu responder <strong>antes</strong> de revelar. Isso é autoavaliação, não correção automática.</p>'+[[0,'Não sabia'],[1,'Pouco'],[2,'Quase'],[3,'Completo']].map(z=>'<button type="button" class="btn" onclick="SuperFoco.score('+z[0]+')">'+z[1]+'</button>').join('')+'</div>')
  +'</section><p class="sf-disclaimer">Treino acadêmico. O modo Super Foco não altera as notas de OSCE, provas ou simulados. Progresso salvo somente neste navegador, por usuário.</p></div>';
}
function page(){ensureOwner();return stage==='catalog'?catalogPage():exercisePage();}
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
 const banner=document.createElement('div');banner.className='sf-context-entry';banner.innerHTML='<span><strong>Super Foco</strong><small>Recuperação ativa, explicação e reteste adaptativo</small></span><button type="button" class="btn" data-sf-open>Treinar agora →</button>';
 banner.querySelector('button').addEventListener('click',()=>open(course,topic));
 const crumb=root.querySelector('.study-breadcrumb');
 if(crumb)crumb.insertAdjacentElement('afterend',banner);else root.prepend(banner);
}
function resetUser(){owner=username();state=load();stage='catalog';activeId='';draft='';shown=false;search='';}
window.addEventListener('master-auth-ready',resetUser);
window.addEventListener('master-auth-ended',()=>{owner='local';state=empty();stage='catalog';activeId='';draft='';shown=false;});
window.addEventListener('storage',e=>{if(e.key===key())state=load();});
return {page,open,choose,back,searchSet,toggleMix,input,conf,reveal,score,catalog,topics,afterRender,resetUser};
})();