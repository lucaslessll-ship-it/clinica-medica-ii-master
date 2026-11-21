/* Aviso de novo módulo na página inicial. Não altera o guia interno do OSCE. */
window.HomeOSCENotice=(()=>{
 'use strict';
 const key=()=> 'master_osce_home_notice_v1:'+(window.MASTER_AUTH?.user?.()?.id||'visitor');
 let dismissedInTab=false;
 function neverDismissed(){
  try{return localStorage.getItem(key())==='hidden'}catch{return false}
 }
 function visible(){return !dismissedInTab&&!neverDismissed()}
 function html(){
  if(!visible())return '';
  return '<aside class="ed-osce-announcement" id="ed-osce-announcement" aria-labelledby="ed-osce-announcement-title">'
   +'<div class="ed-osce-announcement-copy"><p class="ed-osce-announcement-kicker"><span class="ed-osce-new">NOVO</span> TREINAMENTO PRÁTICO-ORAL</p>'
   +'<h2 id="ed-osce-announcement-title">Conheça o OSCE Clínica Médica</h2>'
   +'<p>Agora você pode treinar casos clínicos, <strong>POCUS e ECG com imagens comentadas</strong>, responder uma pergunta por vez e receber correção por critérios. Revise seus erros com retestes e um roteiro para estudar com IA.</p></div>'
   +'<div class="ed-osce-announcement-actions"><button class="btn primary ed-osce-launch" type="button" onclick="HomeOSCENotice.open()">Explorar o OSCE <span aria-hidden="true">→</span></button>'
   +'<div class="ed-osce-secondary-actions"><button type="button" onclick="HomeOSCENotice.close()">Agora não</button><button type="button" onclick="HomeOSCENotice.never()">Não mostrar novamente</button></div></div></aside>';
 }
 function close(){
  dismissedInTab=true;
  if(typeof document!=='undefined')document.getElementById('ed-osce-announcement')?.remove();
 }
 function never(){
  try{localStorage.setItem(key(),'hidden')}catch{}
  close();
 }
 function open(){close();if(typeof navigate==='function')navigate('osce')}
 return {html,open,close,never,visible};
})();

/* Apresentação editorial: usa apenas progresso real e mantém os destinos existentes. */
window.EditorialUI=(()=>{
 'use strict';
 const esc=escapeHtml;
 const symbols={arrow:'M7 17 17 7M7 7h10v10',play:'m8 5 10 7-10 7V5Z',stethoscope:'M5 3v6a5 5 0 0 0 10 0V3M3 3h4m6 0h4M10 14v2a5 5 0 0 0 10 0v-3m0-5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5',book:'M12 6C9 3 5 3 2 4v15c4-1 7-1 10 2V6Zm0 0c3-3 7-3 10-2v15c-4-1-7-1-10 2',surgery:'m4 20 15-15m-3 0 3 3M3 21l5-1-4-4Z',emergency:'M9 6V3h6v3M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm7 4v7m-3-3.5h6',review:'m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5',plan:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',chart:'M4 20V10m8 10V4m8 16v-7'};
 function icon(id,cl=''){return `<svg class="ed-icon ${cl}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${symbols[id]||symbols.book}"/></svg>`;}
 function ornament(){return `<svg class="ed-ornament" viewBox="0 0 180 140" fill="none" aria-hidden="true"><path d="M90 122V22M90 102c-29 0-49-16-52-40 27-1 47 12 52 40Zm0-26c26 0 44-14 47-35-24 0-42 11-47 35Zm0-24C73 51 61 39 60 22c17 1 29 12 30 30Zm0 61c28-3 48-20 52-44-27 2-46 17-52 44Z" stroke="currentColor" stroke-width="1.2"/><path d="m53 77 37 25m32-48L90 76M70 32l20 20m37 32-37 29" stroke="currentColor" stroke-width=".7"/></svg>`;}
 function intro({g,resume,focus,due,greeting}){
  const name=window.MASTER_AUTH?.user()?.user_metadata?.full_name?.trim().split(/\s+/)[0]||'';
  const title=greeting.title.replace(/!$/,'')+(name?', '+name:'');
  const isP1=resume.chapter.startsWith('P1'),topic=(isP1?P1.topics:TOPICS).find(t=>t.title===resume.title),doneMap=isP1?(P1.getBackup().completed||{}):store.completed;
  const completed=topic?topic.chapters.filter((_,i)=>doneMap[topic.id+'_'+i]).length:0,total=topic?.chapters.length||0,percent=total?Math.round(completed/total*100):0;
  const recall=LearnUX.dueList().length,cirDue=window.CIR?CIR.dueCount():0,reviewCount=recall+cirDue;
  return `<section class="ed-dashboard-intro"><header class="ed-greeting"><div><p class="page-eyebrow">ESTUDO MASTER · SEU ESPAÇO DE ESTUDO</p><h1 class="page-title">${esc(title)}</h1><p class="ed-greeting-note">Estudo consistente, evolução real.</p></div>${ornament()}</header>
  ${window.HomeOSCENotice?.html()||''}
  <article class="resume-card ed-resume" aria-label="Continuar estudando"><div class="ed-resume-art">${ornament()}</div><div class="ed-resume-copy"><span class="kicker">CONTINUAR ESTUDANDO</span><h2>${esc(resume.started?resume.title:"Seu próximo capítulo começa aqui")}</h2><p class="subtle">${esc(resume.started?resume.chapter:"Explore sua biblioteca de Clínica Médica, Cirurgia e interpretação de exames.")}</p><div class="ed-resume-progress"><div class="progress-track" role="progressbar" aria-label="${resume.started?'Aulas revisadas neste módulo':'Progresso de leitura'}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><div class="progress-fill" style="width:${percent}%"></div></div><span>${resume.started?completed+'/'+total+' aulas revisadas':'Comece no seu ritmo'}</span></div></div><button class="btn primary ed-resume-action" type="button" onclick="${resume.started?'HIG.openLast()':'DashboardUX.showSubjects()'}">${icon('play')} ${resume.started?'Retomar aula':'Explorar matérias'}</button></article>
  <section class="ed-overview" aria-label="Seu estudo em resumo"><article><h2>${icon('plan')}Seu plano de hoje</h2><p class="ed-overview-caption">Um passo de cada vez</p><ul class="ed-plan-list"><li><span></span>Retomar a aula</li><li><span></span>${esc(focus.short)}</li><li><span></span>${due} flashcards disponíveis</li></ul><button class="ed-text-link" type="button" onclick="navigate('today')">Abrir meu plano <span>${icon('arrow')}</span></button></article>
  <article><h2>${icon('review')}Revisões pendentes</h2><p class="ed-overview-caption">Recordação e prática</p><p class="ed-review-number"><strong>${reviewCount}</strong> ${reviewCount===1?'revisão agendada':'revisões agendadas'}</p><div class="ed-review-lines" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><button class="ed-text-link" type="button" onclick="${recall?'LearnUX.openDue()':cirDue?"CIR.startPractice({t:'all',src:'all',mode:'due'})":"navigate('practice')"}">${reviewCount?'Começar revisão':'Praticar questões'} <span>${icon('arrow')}</span></button></article>
  <article><h2>${icon('chart')}Seu progresso</h2><p class="ed-overview-caption">Questões da P2</p><div class="ed-progress-wrap"><div class="ed-progress-ring" style="--progress:${g.value}%" role="img" aria-label="${g.value}% do banco P2 respondido corretamente"><strong>${g.value}%</strong></div><dl><div><dt>Acertos</dt><dd>${g.correct}/${g.total}</dd></div><div><dt>Respondidas</dt><dd>${g.unique}</dd></div></dl></div><button class="ed-text-link" type="button" onclick="document.getElementById('ed-full-progress').scrollIntoView({behavior:'instant'})">Ver meu progresso <span>${icon('arrow')}</span></button></article></section>
  <section class="ed-explore" aria-labelledby="ed-explore-title"><div class="ed-section-heading"><h2 id="ed-explore-title">Explore as matérias</h2><button class="ed-text-link" type="button" onclick="DashboardUX.showSubjects()">Toda a biblioteca <span>${icon('arrow')}</span></button></div><div class="ed-explore-grid">${[['topics','stethoscope','Clínica Médica','P1 e P2'],['cir','surgery','Cirurgia','Aulas, exames e casos'],['emergency','emergency','Urgência','Em construção']].map(([route,id,label,sub])=>`<button class="ed-explore-card" type="button" onclick="navigate('${route}')"><span class="ed-explore-art">${icon(id)}</span><span><strong>${label}</strong><small>${sub}</small></span><span class="ed-explore-arrow">${icon('arrow')}</span></button>`).join('')}</div><nav class="ed-course-links" aria-label="Cursos de interpretação"><button type="button" onclick="navigate('rad')">Radiologia</button><button type="button" onclick="navigate('pocus')">POCUS</button><button type="button" onclick="navigate('ecg')">ECG</button><button type="button" onclick="navigate('labmaster')">Laboratório Master</button><button type="button" onclick="navigate('atb')">Antimicrobianos</button></nav></section></section>`;
 }
 return {intro};
})();
