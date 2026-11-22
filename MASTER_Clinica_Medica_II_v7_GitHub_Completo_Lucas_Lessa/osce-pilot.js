/* OSCE Master: duas estações completas, conteúdos autorais e revisão por critérios. */
window.OSCEPilot=(()=>{
 'use strict';
 const PRIORITY_GROUPS=window.OSCE_PRIORITY_INDEX?.groups||[];
 const PRIORITY_ORDER=PRIORITY_GROUPS.flatMap(g=>g.numbers);
 // A ordem visual é pela prioridade; a numeração interna não muda para preservar o histórico.
 const POSITION=new Map(PRIORITY_ORDER.map((id,i)=>[id,i+1]));
 const displayNo=id=>POSITION.get(Number(id))||Number(id);
 const displayLabel=st=>st?.pocusOrder?'POCCUS '+String(st.pocusOrder).padStart(2,'0'):'ESTAÇÃO '+displayNo(st?.number);
 const BANK=[window.OSCE_PILOT_DATA,window.OSCE_FA_DATA,...(window.OSCE_EXTRA_STATIONS||[])]
  .filter(x=>x&&Number.isInteger(x.number)&&Array.isArray(x.questions))
  .sort((a,b)=>(a.pocusOrder?0:1)-(b.pocusOrder?0:1)||(a.pocusOrder||displayNo(a.number))-(b.pocusOrder||displayNo(b.number)));
 const MAP=new Map(BANK.map(s=>[s.number,s]));
 const KEY='master_osce_pilot_v1';
 const isBlankAttempt=v=>/^(?:não sei|nao sei|não lembro|nao lembro|sem resposta|não consegui|nao consegui)[\s.!?]*$/i.test(String(v||'').trim());
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const now=()=>new Date().toISOString();
 const shift=(n)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+n);return d.toISOString()};
 const empty=()=>({version:2,settings:{examDate:'2026-11-24',minutes:15},items:{},runs:[],current:null,covered:{},updatedAt:null});
 function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.items&&s.settings)return {...empty(),...s,covered:s.covered||{}}}catch{}return empty();}
 let state=load(),screen='home',shown=false,confidence=0,hints=0,checked=[],reviewStation=61,previewStation=61,previewTier='completa',previewStep=0,previewLayout='guided',glossary='',catalogSearch='',catalogPriority='alta',catalogLimit=12;
 let welcomeOpen=!state.settings?.hideWelcome, welcomeSkipNext=!!state.settings?.hideWelcome, welcomeDismissedThisLoad=false;
 const bank=()=>BANK;
 function study(){const r=state.current;return MAP.get(r?.mode==='daily'?r.queue?.[r.pos]?.station:r?.station)||MAP.get(61)}
 function data(s){return MAP.get(Number(s))||MAP.get(61)}
 function qkey(st,q){return st.number+':'+q.id}
 function entry(st,q){const k=qkey(st,q);return state.items[k]||(state.items[k]={draft:'',attempts:[]})}
 function last(st,q){const a=state.items[qkey(st,q)]?.attempts||[];return a[a.length-1]||null}
 function due(st,q){const r=last(st,q);return !!r?.due&&new Date(r.due).getTime()<=Date.now();}
 function weakItems(){return BANK.flatMap(st=>st.questions.filter(q=>{const a=last(st,q);return a&&a.score<80}).map(q=>({st,q,a:last(st,q)})))}
 function dueItems(){return BANK.flatMap(st=>st.questions.filter(q=>due(st,q)).map(q=>({st,q,a:last(st,q)}))).sort((a,b)=>new Date(a.a.due)-new Date(b.a.due))}
 function attempted(st){return st.questions.filter(q=>!!last(st,q)).length}
 function stationCompletion(st){
  const total=st.questions.length,done=attempted(st);
  const weak=st.questions.filter(q=>{const a=last(st,q);return a&&a.score<80}).length;
  const pct=total?Math.round(done/total*100):0;
  const label=done===0?'Não iniciada':done<total?'Em andamento':weak?'Concluída · revisar':'Concluída';
  return {total,done,weak,pct,label};
 }
 function completionBar(st,compact=false){
  const p=stationCompletion(st);
  const detail=p.done+'/'+p.total+' questões respondidas';
  return '<div class="osce-topic-completion'+(compact?' is-compact':'')+'" aria-label="Progresso da estação: '+esc(p.label)+', '+detail+'">'
   +'<div class="osce-topic-completion-head"><span>'+esc(p.label)+'</span><strong>'+p.pct+'%</strong></div>'
   +'<div class="osce-topic-completion-track" role="progressbar" aria-label="Cobertura de '+esc(st.title)+'" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+p.pct+'"><span style="width:'+p.pct+'%"></span></div>'
   +(compact?'':'<small>'+detail+(p.weak?' · '+p.weak+' ponto(s) para revisar':'')+'</small>')
   +'</div>';
 }
 function formatDate(s){return s?new Date(s).toLocaleDateString('pt-BR'):'—'}
 function save(){state.updatedAt=now();try{localStorage.setItem(KEY,JSON.stringify(state))}catch{notify('Seu navegador não pôde salvar o progresso.');}}
 function renderAgain(destination){
 if(typeof ui==='undefined'||ui.route!=='osce'||typeof render!=='function')return;
 const hasDom=typeof document!=='undefined'&&typeof window!=='undefined';
 const previousY=hasDom?window.scrollY:0;
 const previousId=hasDom?document.activeElement?.id:null;
 if(hasDom)window.OSCEContext?.close(false);
 render();
 if(!hasDom)return;
 const root=document.querySelector('.osce-app-shell');if(!root)return;
 const anchors={top:root,case:root.querySelector('.osce-case'),guide:root.querySelector('.osce-reading-workspace')||root.querySelector('.osce-guided-card'),feedback:root.querySelector('.osce-feedback'),question:root.querySelector('.osce-step'),levels:root.querySelector('.osce-study-levels')};
 const target=anchors[destination];
 if(target){
  target.scrollIntoView({behavior:'auto',block:'start'});
  window.OSCEContext?.enter(target,destination);
  if(destination==='question'||destination==='case'||destination==='feedback'||destination==='top'||destination==='guide'){const h=destination==='top'?target.querySelector('h1'):target.querySelector('h2,h3')||target;if(h){h.tabIndex=-1;h.focus({preventScroll:true});}}
 }else{
  window.scrollTo({top:previousY,behavior:'auto'});
  if(previousId){const field=document.getElementById(previousId);field?.focus?.({preventScroll:true});}
 }
}
 function notify(s){if(typeof toast==='function')toast(s)}
 function diffDays(){const d=new Date(state.settings.examDate+'T12:00:00'),nowday=new Date();nowday.setHours(12,0,0,0);return Number.isNaN(d.valueOf())?null:Math.ceil((d-nowday)/86400000)}
 function recommended(st){
   const mins=Number(state.settings.minutes)||15,days=diffDays();
   if(dueItems().some(x=>x.st.number===st.number))return {tier:'rapida',reason:'Há itens vencidos: consolidação primeiro.'};
   if(days!==null&&days<=2||mins<=5)return {tier:'essencial',reason:'Tempo curto: começar pelo essencial.'};
   if(mins>=25&&state.covered[st.number]?.rapida)return {tier:'completa',reason:'Você já fez a revisão rápida e tem tempo para aprofundar.'};
   return {tier:'rapida',reason:'Quatro decisões centrais sem sobrecarga.'};
 }
 function sectionTitle(t){return '<header class="page-header osce-head"><p class="eyebrow">CLÍNICA MÉDICA II · AVALIAÇÃO PRÁTICO-ORAL</p><h1>'+t+'</h1></header>';}
 function selector(st){
  const p=recommended(st),completed=attempted(st),covered=state.covered[st.number]||{};
  return '<article class="osce-case osce-theme-card" id="osce-station-'+st.number+'" tabindex="-1"><div class="osce-stepbar"><span>'+displayLabel(st)+'</span><span class="osce-priority osce-priority-'+esc(st.priority)+'">● PRIORIDADE '+({alta:'ALTA',media:'MÉDIA',baixa:'BAIXA'}[st.priority]||'ADICIONAL')+'</span>'+personalBadge(st)+'<strong>'+completed+'/'+st.questions.length+' questões</strong></div>'
   +'<h2>'+esc(st.title)+'</h2><p>'+esc(st.subtitle)+'</p>'
   +completionBar(st)
   +(st.images?.length?'<p class="osce-note">✓ '+st.images.length+' imagem(ns) do caso</p>':st.number===61?'<p class="osce-note">Ilustração didática identificada como tal.</p>':'<p class="osce-note">Caso sem imagem original; explicações clínicas disponíveis.</p>')
   +'<p class="osce-note">'+esc(p.reason)+'</p>'
   +'<p class="osce-note"><strong>Depois de responder:</strong> aparece a resposta-modelo, correção passo a passo, dicas, referências e os painéis para aprofundar. Não precisa acertar para aprender: pode responder “não sei”.</p>'
   +'<div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.start(\''+p.tier+'\',null,'+st.number+')">Simular esta estação</button><button class="btn" onclick="OSCEPilot.preview('+st.number+')">Revisar respostas antes</button>'+'<button type="button" class="btn osce-super-focus-cta" onclick="SuperFoco.open(\''+(st.pocusOrder?'pocus':'osce')+'\',\''+st.number+'\')">Super Foco</button>'
   +'<button class="btn" onclick="OSCEPilot.start(\'essencial\',null,'+st.number+')">1 minuto</button>'
   +'<button class="btn" onclick="OSCEPilot.start(\'completa\',null,'+st.number+')">Completo</button></div>'
   +'<div class="osce-depth-grid">'+Object.entries(st.tiers).map(([tier,t])=>'<button class="osce-depth-btn '+(p.tier===tier?'suggested':'')+'" onclick="OSCEPilot.start(\''+tier+'\',null,'+st.number+')"><strong>'+esc(t.label)+'</strong><span>≈'+t.minutes+' min · '+t.ids.length+' pergunta(s)</span><small>'+esc(t.description)+'</small>'+(covered[tier]?'<em>✓ já percorrida</em>':'')+'</button>').join('')+'</div></article>';
 }
 function filteredCatalog(){
  const exact=/^#?(\d{1,3})$/.exec(catalogSearch.trim());
  return BANK.filter(st=>(catalogPriority==='minhas'?!!personalGroupFor(st):(catalogPriority==='todas'||(catalogPriority==='complementar'?st.number>74:st.priority===catalogPriority)))
   &&(!catalogSearch||(exact?displayNo(st.number)===Number(exact[1]):[st.title,st.subtitle,st.area,String(displayNo(st.number))].join(' ').toLocaleLowerCase('pt-BR').includes(catalogSearch.toLocaleLowerCase('pt-BR')))))
   .sort((a,b)=>({alta:0,media:1,baixa:2}[a.priority]??3)-({alta:0,media:1,baixa:2}[b.priority]??3)||(a.pocusOrder?0:1)-(b.pocusOrder?0:1)||(a.pocusOrder||displayNo(a.number))-(b.pocusOrder||displayNo(b.number)));
 }
 let catalogPaint=0;
 function filterCatalog(v){
  catalogSearch=String(v||'').slice(0,120);catalogLimit=12;
  if(typeof document==='undefined'||typeof window==='undefined'||typeof window.requestAnimationFrame!=='function'){renderAgain();return;}
  const field=document.getElementById('osce-catalog-search');
  const caretStart=field?.selectionStart??catalogSearch.length,caretEnd=field?.selectionEnd??caretStart;
  if(catalogPaint)window.cancelAnimationFrame?.(catalogPaint);
  catalogPaint=window.requestAnimationFrame(()=>{
   catalogPaint=0;if(screen!=='home')return;renderAgain();
   const current=document.getElementById('osce-catalog-search');
   if(current){current.focus({preventScroll:true});try{current.setSelectionRange(caretStart,caretEnd)}catch{}}
  });
 }
 function setCatalogPriority(v){catalogPriority=String(v);catalogLimit=12;renderAgain();}
 function moreCatalog(){catalogLimit+=12;renderAgain();}


 function personalIsOwner(){return window.OSCE_PERSONAL_PRIORITIES?.isOwner?.()===true;}
 function personalGroups(){return personalIsOwner()?window.OSCE_PERSONAL_PRIORITIES.groups:[];}
 function personalGroupFor(st){return personalGroups().find(g=>g.ids.includes(st?.number));}
 function personalBadge(st){const g=personalGroupFor(st);return g?'<span class="osce-personal-chip tier-'+g.tier.toLowerCase()+'" title="Prioridade somente desta conta">★ Minha '+g.tier+g.n+'</span>':'';}
 function personalPlan(){
  if(!personalIsOwner())return '';
  const groups=personalGroups(),doneMap=state.settings.personalPlanDone||{},doneCount=groups.filter(g=>doneMap[g.n]===true).length;
  const categories=[['A','Dominar · não pular'],['B','Saber o essencial'],['C','Proteção contra surpresas']];
  const sections=categories.map(([tier,caption])=>{
   const list=groups.filter(g=>g.tier===tier),completed=list.filter(g=>doneMap[g.n]===true).length;
   const rows=list.map(g=>{
    const completedNow=doneMap[g.n]===true,touched=g.ids.filter(id=>MAP.has(id)&&attempted(MAP.get(id))>0).length;
    return '<article class="osce-personal-row'+(completedNow?' is-done':'')+'">'
     +'<div class="osce-personal-topic"><span class="osce-personal-num">'+String(g.n).padStart(2,'0')+'</span><div><strong>'+esc(g.title)+'</strong><p>'+esc(g.hint)+'</p><small>'+g.minutes+' min sugeridos · '+touched+'/'+g.ids.length+' estações iniciadas</small></div></div>'
     +'<div class="osce-personal-actions"><button type="button" class="btn" onclick="OSCEPilot.personalOpen('+g.ids[0]+')">Abrir treino</button>'
     +'<button type="button" class="btn osce-personal-done" aria-pressed="'+String(completedNow)+'" aria-label="'+(completedNow?'Desmarcar':'Marcar')+' bloco '+g.n+' como concluído" onclick="OSCEPilot.personalDone('+g.n+')">'+(completedNow?'✓ Concluído':'Marcar concluído')+'</button></div></article>';
   }).join('');
   return '<details class="osce-personal-group tier-'+tier.toLowerCase()+'" '+(tier==='A'?'open':'')+'><summary><span class="osce-personal-tier">'+tier+'</span><strong>'+esc(caption)+'</strong><span class="osce-personal-count">'+completed+'/'+list.length+' concluídos</span></summary><div class="osce-personal-list">'+rows+'</div></details>';
  }).join('');
  return '<section id="osce-my-plan" class="osce-personal-plan" aria-labelledby="osce-my-plan-title">'
   +'<header class="osce-personal-header"><div><p class="eyebrow">ROTEIRO EXCLUSIVO DESTA CONTA</p><h2 id="osce-my-plan-title">Minha trilha OSCE · 15 blocos</h2>'
   +'<p>Seis blocos para dominar, seis para saber o essencial e três para reconhecer rapidamente. Esta marcação é <strong>pessoal</strong> e não muda a prioridade geral das outras contas.</p></div>'
   +'<div class="osce-personal-summary"><strong>'+doneCount+'/15</strong><span>blocos marcados</span><small>≈ 6h20 de estudo líquido</small></div></header>'
   +sections
   +'<p class="osce-personal-note">Marque “Concluído” apenas quando conseguir explicar o tema sem consultar. O progresso fica na sua conta. Estas prioridades são estratégia de estudo, não previsão da prova.</p></section>';
 }
 function personalOpen(id){if(!personalIsOwner())return;jumpToIndex(Number(id));}
 function personalDone(number){
  if(!personalIsOwner())return;
  const g=personalGroups().find(x=>x.n===Number(number));if(!g)return;
  const m={...(state.settings.personalPlanDone||{})};
  m[g.n]=m[g.n]!==true;
  state.settings.personalPlanDone=m;
  save();renderAgain();
 }

 function pocusSection(){
  const a=BANK.filter(st=>st.pocusOrder).sort((x,y)=>x.pocusOrder-y.pocusOrder);
  if(!a.length)return '';
  const rows=a.map(st=>{
   const done=attempted(st),showNum='P'+st.pocusOrder;
   return '<article class="osce-pocus-item"><div class="osce-pocus-item-head"><span class="osce-pocus-index">'+showNum+'</span><span class="osce-pocus-area">Alta prioridade sugerida</span>'+personalBadge(st)+'</div><h3>'+esc(st.title)+'</h3><p>'+esc(st.subtitle)+'</p><div class="osce-pocus-item-actions"><button type="button" class="btn primary" onclick="OSCEPilot.start(\'rapida\',null,'+st.number+')">Simular</button><button type="button" class="btn" onclick="OSCEPilot.preview('+st.number+')">Estudar</button><button type="button" class="btn" onclick="SuperFoco.open(\'pocus\',\''+st.number+'\')">Super Foco</button><small>'+done+'/'+st.questions.length+' respondidas</small></div>'+completionBar(st)+'</article>';
  }).join('');
   return '<details class="osce-pocus-section osce-pocus-disclosure" id="osce-pocus-top"><summary class="osce-pocus-heading" aria-controls="osce-pocus-content"><div><p class="eyebrow">TREINO PRIORITÁRIO · EXAME À BEIRA-LEITO</p><h2 id="osce-pocus-title">POCCUS — '+a.length+' estações para começar</h2><p>Toque para ampliar ou ocultar todas as estações de POCCUS. O índice de prioridades fica visível logo abaixo.</p></div><span class="osce-pocus-flag">POCCUS · MOSTRAR / OCULTAR</span></summary><div id="osce-pocus-content"><p class="osce-note">POCCUS foi indicado como conteúdo da avaliação. Os subtemas são uma seleção pedagógica, não uma lista oficial.</p><div class="osce-pocus-grid">'+rows+'</div><p class="osce-note">As imagens são referências independentes das vinhetas, com fonte identificada. Os retestes e o histórico continuam disponíveis.</p></div></details>';
 }

 function priorityIndex(){
  const index=window.OSCE_PRIORITY_INDEX;
  if(!index?.groups?.length)return '';
  const sections=index.groups.map(group=>{
   const count=group.numbers.length;
   const rows=group.numbers.map(n=>{
    const st=MAP.get(n),rank=displayNo(n),label=index.names[n]||st?.title||('Estação '+rank);
    const number='<span class="osce-index-number">'+String(rank).padStart(2,'0')+'</span>';
    const name='<span class="osce-index-name">'+esc(label)+'</span>';
    if(!st)return '<div class="osce-index-entry osce-index-pending" title="Estação ainda não publicada" aria-label="Estação '+rank+': '+esc(label)+', em preparação">'+number+name+'<span class="osce-index-status">Em preparação</span></div>';
    const progress=stationCompletion(st),stateLabel=progress.done?progress.done+'/'+progress.total+' feitas':'Abrir';
    return '<button type="button" class="osce-index-entry osce-index-ready" title="Abrir estação '+rank+'" aria-label="Abrir estação '+rank+', '+esc(label)+', prioridade '+esc(group.label)+'" onclick="OSCEPilot.jumpToIndex('+n+')">'+number+name+personalBadge(st)+'<span class="osce-index-status">'+esc(stateLabel)+'</span>'+completionBar(st,true)+'</button>';
   }).join('');
   return '<details class="osce-index-group osce-index-'+group.key+'" '+(group.key==='alta'?'open':'')+'><summary><span class="osce-index-dot" aria-hidden="true"></span><strong>'+esc(group.label)+'</strong><span class="osce-index-description">'+esc(group.description)+'</span><span class="osce-index-total">'+count+' estações</span></summary><div class="osce-index-grid">'+rows+'</div></details>';
  }).join('');
  const available=index.groups.flatMap(g=>g.numbers).filter(n=>MAP.has(n)).length;
  return '<section class="osce-case osce-priority-overview" aria-labelledby="osce-priority-title" id="osce-priority-overview">'
   +'<div class="osce-index-head"><div><p class="eyebrow">ROTEIRO DE PRIORIDADES</p><h2 id="osce-priority-title">Índice das '+Object.keys(index.names).length+(BANK.some(st=>st.pocusOrder)?' demais estações':' estações')+'</h2><p class="osce-note">Lista simplificada antes dos cartões, em ordem de prioridade. Toque em um tema disponível para ir ao treinamento.</p></div><span class="osce-index-available">'+available+' disponíveis</span></div>'
   +'<div class="osce-index-legend"><span><i class="osce-index-dot osce-index-legend-high" aria-hidden="true"></i>Alta · vermelho</span><span><i class="osce-index-dot osce-index-legend-medium" aria-hidden="true"></i>Média · amarelo</span><span><i class="osce-index-dot osce-index-legend-low" aria-hidden="true"></i>Baixa · verde</span></div>'
   +sections
   +'<p class="osce-note osce-index-footnote">As estações desta lista conservam a numeração de <strong>1 a 86</strong>; POCCUS usa P1–P7 separado, definida pela ordem de estudo: <strong>43 altas, 31 médias e 12 baixas.</strong> A cor indica prioridade pedagógica, não probabilidade de cair na prova.</p></section>';
 }
 function jumpToIndex(number){
  const st=MAP.get(Number(number));
  if(!st)return notify('Esta estação ainda está em preparação.');
  markWelcomeVisited();catalogSearch='#'+displayNo(st.number);catalogPriority='todas';catalogLimit=12;screen='home';renderAgain();
  if(typeof document!=='undefined'){
   const target=document.getElementById('osce-station-'+st.number);
   if(target){target.scrollIntoView({block:'center',behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});target.focus({preventScroll:true});}
  }
 }

 function welcomeGuide(){
  if(!welcomeOpen)return '';
  return '<section class="osce-welcome" id="osce-welcome" aria-labelledby="osce-welcome-title">'
   +'<div class="osce-welcome-header"><span class="osce-welcome-icon" aria-hidden="true">◎</span><div><p class="eyebrow">SEU GUIA DE ESTUDO · OSCE CLÍNICA MÉDICA</p><h2 id="osce-welcome-title">Como estudar e realmente consolidar</h2><p>O método usa <strong>recuperação ativa, tentativa antes da explicação, feedback por critérios, revisão espaçada e calibração da confiança</strong>. Intercale assuntos nas revisões; não é necessário saber a resposta para começar.</p></div></div>'
   +'<div class="osce-welcome-method">'
    +'<div><span>01</span><strong>Revisão — aprenda primeiro</strong><p>Abra o roteiro completo, as respostas, as imagens e as condutas antes de praticar. Escolha Essencial (1 min), Rápida (5 min) ou Completo (20–30 min).</p></div>'
    +'<div><span>02</span><strong>Simulação — treine como na prova</strong><p>Responda sem antecipar o gabarito, registre confiança e receba correção por critérios, aprofundamento e retestes. Pode escrever <b>“não sei”</b>.</p></div>'
    +'<div><span>03</span><strong>Super Foco — aprendizagem ativa</strong><p>Faça uma sessão de 1, 5 ou 10 desafios, veja em qual pergunta está e navegue pelos números. Use recuperação ativa, alternância de assuntos, explicação sem olhar (Espelho Cego), conexões clínicas (Velcro) e retestes. A nota permanece separada da simulação.</p></div>'
    +'<div><span>04</span><strong>Escolha o método certo</strong><p>Não conhece o tema? Revisão. Quer medir seu desempenho? Simulação. Esqueceu ou errou? Super Foco, com indicação de progresso, retorno às perguntas e retestes em <b>D+1, D+3, D+7 ou D+21</b> conforme a autoavaliação.</p></div>'
   +'</div>'
   +'<div class="osce-welcome-ai"><span aria-hidden="true">✦</span><div><strong>Quer aprofundar as dificuldades com IA?</strong><p>Abra <b>Revisão por erros → Gerar script para IA → Copiar para IA</b>. O roteiro reúne os critérios não cumpridos e suas respostas. Cole na IA que preferir e peça uma arguição oral, uma pergunta por vez, com correção e reteste. Nada é enviado automaticamente.</p>'+(weakItems().length?'<button type="button" class="btn osce-welcome-ai-link" onclick="OSCEPilot.showPrompt()">Gerar roteiro com meus erros →</button>':'<small class="osce-welcome-ai-hint">O roteiro fica personalizado depois que você registrar lacunas no treino.</small>')+'</div></div>'
   +'<div class="osce-welcome-bottom"><label class="osce-welcome-checkbox"><input type="checkbox" id="osce-welcome-never" '+(welcomeSkipNext?'checked ':'')+'onchange="OSCEPilot.welcomePreference(this.checked)"><span>Não mostrar novamente</span></label><button type="button" class="btn primary" onclick="OSCEPilot.closeWelcome()">Entendi, começar <span aria-hidden="true">→</span></button></div>'
   +'<p class="osce-welcome-disclaimer">Dica: uma sessão curta e concentrada é melhor do que adiar. A pontuação é uma <b>autoavaliação por checklist</b>, não uma correção automática da banca.</p></section>';
 }
 function markWelcomeVisited(){if(welcomeOpen){welcomeOpen=false;welcomeDismissedThisLoad=true;}}
 function welcomePreference(v){welcomeSkipNext=!!v;}
 function showWelcome(){welcomeOpen=true;welcomeSkipNext=!!state.settings.hideWelcome;renderAgain();}
 function closeWelcome(){
  state.settings.hideWelcome=!!welcomeSkipNext;
  welcomeOpen=false;welcomeDismissedThisLoad=true;
  save();renderAgain();
 }

 function quickNav(){
  return '<nav class="osce-quicknav" aria-label="Acesso rápido ao OSCE">'
   +'<button type="button" onclick="OSCEPilot.jumpSection(\'today\')">Hoje</button>'
   +(personalIsOwner()?'<button type="button" onclick="OSCEPilot.jumpSection(\'mine\')">★ Minha trilha</button>':'')
   +'<button type="button" onclick="OSCEPilot.jumpSection(\'pocus\')">POCCUS</button>'
   +'<button type="button" onclick="OSCEPilot.jumpSection(\'priority\')">Prioridades</button>'
   +'<button type="button" onclick="OSCEPilot.jumpSection(\'search\')">Buscar</button>'
   +'<button type="button" onclick="OSCEPilot.showReview()">Revisão</button></nav>';
 }
 function jumpSection(which){
  const ids={today:'osce-today',mine:'osce-my-plan',pocus:'osce-pocus-top',priority:'osce-priority-overview',search:'osce-catalog-search'};
  const id=ids[which];if(!id||typeof document==='undefined')return;
  const el=document.getElementById(id);if(!el)return;
  if(which==='pocus'&&el.tagName==='DETAILS')el.open=true;
  const scroll=()=>{
   const reduced=window.OSCEContext?.reducedMotion?.()||document.body.classList.contains('reduce-motion');
   el.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
   if(which==='search')el.focus({preventScroll:true});
  };
  if(typeof window.requestAnimationFrame==='function')window.requestAnimationFrame(scroll);
  else scroll();
 }

 function homePage(){
  const total=BANK.reduce((n,st)=>n+attempted(st),0),dueCount=dueItems().length,weakCount=weakItems().length,shallow=BANK.filter(st=>attempted(st)>0||Object.values(state.covered[st.number]||{}).some(Boolean)).length,deep=BANK.filter(st=>state.covered[st.number]?.completa).length;
  const d=diffDays(),selection=dueCount?dueItems()[0].st:BANK.find(st=>attempted(st)===0)||BANK[0],planCount=dailyPlan(Number(state.settings.minutes)||15).length;
  return sectionTitle('OSCE <em>Clínica Médica.</em>')+'<div class="osce-welcome-entry"><p>Treine primeiro, aprofunde ao clicar, recupere os erros e retome sem perder seu progresso.</p>'+(welcomeOpen?'':'<button type="button" class="btn ghost osce-welcome-reopen" onclick="OSCEPilot.showWelcome()">ⓘ Como estudar no OSCE</button>')+'</div>'
   +welcomeGuide()
   +quickNav()
   +'<section class="osce-pilot-hero" id="osce-today"><div><p class="eyebrow">SESSÃO DE HOJE · COMEÇO SEM ATRITO</p><h2>Uma pergunta já é progresso.</h2><p>'+esc(d===null?'Data não definida.':d<0?'A data registrada passou; ajuste abaixo.':d===0?'Avaliação hoje.':d+' dia(s) até a avaliação.')+' Comece pelo erro vencido ou pela próxima estação prioritária.</p><div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.daily()">Sessão de hoje · '+state.settings.minutes+' min (até '+planCount+' itens)</button>'+(state.current?'<button class="btn" onclick="OSCEPilot.resume()">Retomar onde parei</button>':'')+'</div></div><div class="osce-pilot-emblem" aria-hidden="true">'+BANK.length+'<span>estações</span></div></section>'
   +personalPlan()
   +'<div class="osce-stats"><div><b>'+total+'</b><span>perguntas testadas</span></div><div><b>'+dueCount+'</b><span>revisões vencidas</span></div><div><b>'+weakCount+'</b><span>lacunas registradas</span></div><div><b>'+deep+'/'+BANK.length+'</b><span>estações completas</span></div></div>'
   +'<section class="osce-case"><h2>Triagem e cobertura</h2><div class="osce-settings"><label>Data da APO<input type="date" value="'+esc(state.settings.examDate)+'" onchange="OSCEPilot.setDate(this.value)"></label><label>Tempo disponível<select onchange="OSCEPilot.setMinutes(this.value)">'+[5,15,30,45].map(m=>'<option value="'+m+'"'+(Number(state.settings.minutes)===m?' selected':'')+'>'+m+' min</option>').join('')+'</select></label></div><p class="osce-note">Amplitude: '+shallow+'/'+BANK.length+' · Profundidade: '+deep+'/'+BANK.length+'. O roteiro inclui '+BANK.filter(st=>st.pocusOrder).length+' POCCUS e '+BANK.filter(st=>!st.pocusOrder).length+' outras estações; a seção POCCUS fica recolhida por padrão.</p><div class="osce-track"><span style="width:'+(100*shallow/BANK.length)+'%"></span></div><div class="osce-track osce-track-secondary"><span style="width:'+(100*deep/BANK.length)+'%"></span></div></section>'
   +pocusSection()
   +priorityIndex()
   +'<h2>Estações disponíveis</h2><p class="osce-note">Prioridade: <span class="osce-priority osce-priority-alta">● Alta</span> · <span class="osce-priority osce-priority-media">● Média</span> · <span class="osce-priority osce-priority-baixa">● Baixa</span>. Critério pedagógico, não previsão estatística da prova.</p>'
   +'<div class="osce-filter" id="osce-catalog-filter"><label>Buscar estação<input type="search" id="osce-catalog-search" placeholder="Tema ou novo número (ex.: 1, 8, síncope)" value="'+esc(catalogSearch)+'" oninput="OSCEPilot.filterCatalog(this.value)"></label><label>Prioridade<select onchange="OSCEPilot.setCatalogPriority(this.value)">'+(personalIsOwner()?[['minhas','★ Minhas prioridades']]:[]).concat([['alta','Alta'],['media','Média'],['baixa','Baixa'],['todas','Todas']]).map(([k,l])=>'<option value="'+k+'"'+(catalogPriority===k?' selected':'')+'>'+l+'</option>').join('')+'</select></label></div>'
   +'<p class="osce-note">'+filteredCatalog().length+' estações neste filtro; exibindo até '+Math.min(catalogLimit,filteredCatalog().length)+'.</p>'
   +'<div class="osce-catalog-grid">'+filteredCatalog().slice(0,catalogLimit).map(selector).join('')+'</div>'
   +(filteredCatalog().length>catalogLimit?'<button type="button" class="btn" onclick="OSCEPilot.moreCatalog()">Mostrar mais estações</button>':'')
   +'<div class="osce-actions"><button class="btn" onclick="OSCEPilot.showReview()">↻ Revisão por erros</button><button class="btn" onclick="OSCEPilot.showPrompt()">Gerar script de revisão → Copiar para IA</button></div>'
   +'<p class="osce-note">Estações com perguntas e respostas autorais do Master; não se trata de conteúdo oficial da banca. A autoavaliação é manual. O ECG da estação '+displayNo(52)+' (fibrilação atrial) é derivado do arquivo i-031.jpg enviado para este projeto.</p>';
 }
 function toolBar(st){
  return '<div class="osce-top-links">'+((st.lesson?.id||st.number===52||st.number===61)?'<button class="btn" onclick="OSCEPilot.openLesson('+st.number+')">↗ Aula do tema</button>':'')
   +'<button class="btn" onclick="OSCEPilot.showSources()">Referências e diretrizes</button>'
   +'<button class="btn" onclick="OSCEPilot.showTerms()">Termos com referências</button>'
   +'<button class="btn" onclick="OSCEPilot.preview('+st.number+')">Revisar respostas antes</button></div>';
 }
 function illustration(){
  return '<figure class="osce-illustration"><img src="assets/osce/ilustracao-sincope-estacao61.png" alt="Ilustração criada para o Master: idoso com perda de consciência durante esforço, hipótese de estreitamento da valva aórtica e redução da perfusão cerebral; não é o paciente original." loading="lazy" onclick="OSCEPilot.expandImage(this)"><figcaption><strong>ILUSTRAÇÃO DIDÁTICA — NÃO É IMAGEM DO CASO ORIGINAL.</strong> Esquema autoral baseado no cenário clínico descrito; estreitamento valvar é hipótese a investigar, não diagnóstico confirmado.</figcaption></figure>';
 }

 function visualNotes(st,img,index){
  const data=window.OSCE_VISUAL_NOTES?.[String(st.number)]?.[index];
  if(data)return data;
  if(!img.src?.startsWith('data:image/svg+xml'))return null;
  // A caixa SVG agora tem altura adaptativa e metadados de posição; pinos não cobrem o texto.
  const by=(ids)=>st.questions.find(q=>ids.includes(q.id))?.answer||'Relacione o conceito do quadro ao caso clínico.';
  const markerY=window.OSCE_DIAGRAM_LAYOUT?.[String(st.number)]?.markerY??32;
  return {intro:'Esquema AUTORAL, não fotografia ou exame do paciente. Os marcadores indicam o canto superior de cada caixa, sem cobrir os textos.',notes:[
   {name:'Sinais e síndrome',meaning:by(['sindrome','diagnostico']),limitation:'Este cartão é um resumo de sinais, não um achado ultrassonográfico ou eletrocardiográfico real.',x:31,y:markerY},
   {name:'Exame e confirmação',meaning:by(['investigacao','exames','diagnostico']),limitation:'Confirmação diagnóstica depende de história, exame físico e investigação pertinente.',x:62,y:markerY},
   {name:'Conduta e segurança',meaning:by(['conduta','tratamento','plano']),limitation:'Condutas dependem da gravidade e não devem ser copiadas de uma figura sem contexto.',x:93,y:markerY}
  ]};
 }
 function visualAnnotated(img,st,index,showNotes,hidden){
  const raw=visualNotes(st,img,index),canMark=showNotes&&raw?.notes?.length;
  const isMoving=!!raw?.moving,keys=raw?.notes||[];
  const imgSrc=esc(img.src),caption=hidden?'Observe a imagem antes de revelar as informações clínicas sobre o achado.':esc(img.caption||'Imagem de referência para estudo');
  const markType=img.kind==='illustration'?'ILUSTRAÇÃO DIDÁTICA — NÃO É EXAME':img.kind==='reference'?'IMAGEM REAL DE REFERÊNCIA — NÃO DO PACIENTE':'IMAGEM ORIGINAL RECEBIDA';
  const lessonIntro=canMark?'<p class="osce-note osce-annotation-intro">'+esc(raw.intro||'Aponte os achados e conecte-os à conduta.')+'</p>':'';
  const pins=canMark&&!isMoving?keys.map((n,i)=>Number.isFinite(n.x)&&Number.isFinite(n.y)?
    '<button type="button" class="osce-visual-pin" data-step="'+i+'" style="left:'+n.x+'%;top:'+n.y+'%" aria-label="Achado '+(i+1)+': '+esc(n.name)+'" title="'+esc(n.name)+'" onclick="OSCEPilot.focusVisualNote(this)">'+(i+1)+'</button>':'').join(''):'';
  const notes=canMark?
   '<div class="osce-annotation-content"><div class="osce-annotation-note-heading"><strong>Identifique na imagem</strong><small>'+(isMoving?'Imagem dinâmica: guia por texto, sem pinos fixos':'Toque nos números sobre a imagem ou abra os tópicos abaixo')+'</small></div>'
    +keys.map((n,i)=>'<details class="osce-annotation-detail" data-step="'+i+'" '+(i===0?'open':'')+'>'
      +'<summary>'+(i+1)+'. '+esc(n.name)+'</summary>'
      +'<div><p><strong>O que você está vendo:</strong> '+esc(n.meaning)+'</p>'
      +'<p class="osce-annotation-caution"><strong>Não conclua apenas por este achado:</strong> '+esc(n.limitation)+'</p></div></details>').join('')
    +'</div>':'';
  const zoom=canMark?' <button type="button" class="btn osce-annotated-zoom" onclick="OSCEPilot.expandVisual(this)">'+(isMoving?'Ampliar imagem com explicações':'Ampliar com marcações')+'</button>':'';
  return '<figure class="osce-visual osce-annotated'+(canMark?' is-marked':'')+'">'
    +'<div class="osce-image-frame"><img src="'+imgSrc+'" loading="lazy" alt="'+(hidden?'Exame clínico a interpretar — diagnóstico oculto até a tentativa':esc(img.alt||'Imagem clínica'))+'" onclick="OSCEPilot.expandImage(this)" onerror="this.hidden=true;this.nextElementSibling.hidden=false;this.closest(\'.osce-annotated\')?.classList.remove(\'is-marked\')"><p hidden>Imagem não carregada; use a legenda e a referência. As marcações não substituem o exame original.</p>'+pins+'</div>'
    +'<figcaption><strong>'+markType+'</strong> · '+caption+(img.creditUrl?' · <a href="'+esc(img.creditUrl)+'" target="_blank" rel="noopener noreferrer">Fonte e crédito da imagem</a>':'')+'</figcaption>'
    +(canMark?'<div class="osce-annotation-toolbar"><button type="button" class="btn" aria-pressed="true" onclick="OSCEPilot.toggleVisualMarks(this)">Ocultar marcações</button>'+zoom+'</div>':'')
    +(!showNotes&&raw?.notes?.length?'<p class="osce-note"><strong>Após responder:</strong> aparecem marcações numeradas e explicações de cada achado. Em “Revisar respostas antes”, elas ficam disponíveis imediatamente.</p>':'')
    +lessonIntro+notes+'</figure>';
 }
 function media(st){
  if(st.number===61&&!st.images?.length)return illustration();
  if(!st.images?.length)return '<p class="osce-note">Nenhuma imagem de referência disponível nesta estação.</p>';
  const hidden=screen==='study'&&!shown,showNotes=screen==='preview'||(screen==='study'&&shown);
  const mediaTitle=st.pocusOrder?'<p class="osce-note osce-pocus-disclaimer"><strong>POCCUS:</strong> as imagens de referência podem mostrar pessoas ou condições diferentes das descritas na vinheta. As anotações distinguem achado observável de interpretação clínica.</p>':'';
  return mediaTitle+st.images.map((img,index)=>{
   if(hidden&&img.src?.startsWith('data:image/svg+xml'))return '<div class="osce-pocus-image-locked"><span aria-hidden="true">📖</span><strong>Esquema com sinais, exames e condutas</strong><p>Este esquema didático já contém parte do gabarito e aparecerá com marcações explicativas depois da tentativa. No pré-estudo, fica aberto desde o início.</p></div>';
   if(img.revealedOnly&&hidden)return '<div class="osce-pocus-image-locked"><span aria-hidden="true">🔒</span><strong>Imagem de referência com a resposta sinalizada</strong><p>Será revelada depois da tentativa. No estudo, pode ser explorada com marcações e explicações.</p></div>';
   return visualAnnotated(img,st,index,showNotes,hidden);
  }).join('');
 }
 function focusVisualNote(button){
  const root=button?.closest('.osce-annotated');if(!root)return;
  const step=String(button.dataset.step);
  for(const p of root.querySelectorAll('.osce-visual-pin'))p.classList.toggle('is-selected',p.dataset.step===step);
  for(const d of root.querySelectorAll('.osce-annotation-detail'))d.open=d.dataset.step===step;
  root.classList.add('is-marked');
  const toggle=root.querySelector('.osce-annotation-toolbar button:first-child');
  if(toggle){toggle.setAttribute('aria-pressed','true');toggle.textContent='Ocultar marcações';}
  const detail=root.querySelector('.osce-annotation-detail[data-step="'+step+'"]');
  if(detail)detail.scrollIntoView({block:'nearest',behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
 }
 function toggleVisualMarks(btn){
  const root=btn?.closest('.osce-annotated');if(!root)return;
  const show=root.classList.toggle('is-marked');
  btn.setAttribute('aria-pressed',String(show));btn.textContent=show?'Ocultar marcações':'Mostrar marcações';
 }
 function openOSCEDialog(overlay,opener){
  const previous=document.activeElement;
  const close=()=>{
   if(!overlay.isConnected)return;
   overlay.remove();document.body.classList.remove('osce-dialog-open');
   const target=opener?.isConnected?opener:previous;
   if(target?.isConnected&&typeof target.focus==='function')target.focus({preventScroll:true});
  };
  overlay.addEventListener('click',event=>{if(event.target===overlay)close();});
  overlay.addEventListener('keydown',event=>{
   if(event.key==='Escape'){event.preventDefault();close();return;}
   if(event.key!=='Tab')return;
   const focusables=[...overlay.querySelectorAll('button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])')].filter(x=>!x.hidden&&x.getClientRects().length);
   if(!focusables.length){event.preventDefault();return;}
   const first=focusables[0],last=focusables[focusables.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  overlay.querySelector('.osce-close-image')?.addEventListener('click',close);
  document.body.append(overlay);document.body.classList.add('osce-dialog-open');
  overlay.querySelector('.osce-close-image')?.focus();
 }
 function expandVisual(btn){
  const root=btn?.closest('.osce-annotated');if(!root||typeof document==='undefined')return;
  const overlay=document.createElement('div');overlay.className='osce-lightbox osce-visual-lightbox';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Imagem ampliada com marcações');
  const close=document.createElement('button');close.className='osce-close-image';close.type='button';close.textContent='✕ Fechar';close.setAttribute('aria-label','Fechar imagem ampliada');
  const content=root.cloneNode(true);
  content.querySelector('.osce-annotation-toolbar')?.remove();
  // Evita abrir uma segunda janela ao tocar de novo na imagem ampliada.
  const image=content.querySelector('.osce-image-frame img');
  if(image){image.removeAttribute('onclick');image.style.cursor='default';}
  overlay.append(close,content);openOSCEDialog(overlay,btn);
 }

 function sourcePanel(st){
  const sourceItems=(st.sources||[]).map(s=>'<li><a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.label||s.title)+'</a> ('+esc(s.year)+')</li>').join('');
  return '<details id="osce-sources" class="osce-deep"><summary>Fontes e diretrizes para conferência <span>abrir referências</span></summary><div><ul>'+sourceItems+'</ul><p class="osce-note">As fontes são cadastradas por estação, não obrigatoriamente por questão: podem levar a diretrizes gerais. Confirme doses, critérios, indicação e ano diretamente na seção pertinente da fonte. Respostas e checklists são material didático, não gabarito institucional.</p></div></details>';
 }
 function lessonText(st){return st.lesson?.label||(st.number===61?'Clínica Médica II · Síncope e crise convulsiva':st.number===52?'Biblioteca P1 · Arritmias cardíacas':'Sem aula interna identificada');}
 function lessonBar(st){
  if(!(st.lesson?.id||st.number===52||st.number===61))return '';
  return '<details id="osce-lesson" class="osce-deep"><summary>Aula relacionada no Master <span>abrir tema</span></summary><div><p>'+esc(lessonText(st))+'</p><div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.openLesson('+st.number+')">Ir para aula relacionada</button></div></details>';
 }
 function termPanel(st){
  const a=st.terms||[
    {key:'sincope',name:'Síncope',definition:'Perda transitória da consciência por hipoperfusão cerebral global, com início e recuperação rápidos.',source:'esc2018'},
    {key:'ecg',name:'ECG de 12 derivações',definition:'Exame inicial recomendado na avaliação de síncope para pesquisar arritmias e sinais cardiológicos de risco.',source:'esc2018'},
    {key:'eco',name:'Ecocardiograma',definition:'Avalia cardiopatia estrutural e valvopatia quando história e exame sugerem doença do coração.',source:'esc2018'},
    {key:'eeg',name:'EEG',definition:'Não é exame de rotina para síncope típica; indicado quando investigação sugere crise epiléptica.',source:'esc2018'}
  ];
  return '<details id="osce-terms" class="osce-deep"><summary>Termos marcados e referências <span>toque nos conceitos</span></summary><div><p class="osce-note">Toque em um termo para abrir a definição e a fonte sem perder o ponto de leitura.</p><div class="osce-term-list">'+a.map(t=>'<button class="osce-term" type="button" onclick="OSCEPilot.term(\''+t.key+'\',this)">'+esc(t.name)+' <sup>↗</sup></button>').join('')+'</div><div id="osce-glossary-content" role="status" aria-live="polite">'+(glossary?glossary:'<p class="osce-note">Selecione um termo acima.</p>')+'</div></div></details>';
 }
 function mark(st,text){
  // Os destaques são apenas apoio de leitura, aplicados depois da resposta: NÃO são inferências clínicas.
  // Os termos com fonte mantêm os links existentes; nenhuma parte do texto é renderizada sem escapar HTML.
  const raw=String(text??''),isWord=c=>!!c&&/[\p{L}\p{N}_]/u.test(c);
  const hits=[];
  const add=(word,kind,priority,key)=>{
   if(!word||word.length<3||word.length>90)return;
   const needle=word.toLocaleLowerCase('pt-BR'),hay=raw.toLocaleLowerCase('pt-BR');
   let from=0,at=-1,count=0;
   while((at=hay.indexOf(needle,from))!==-1&&count<2){
    const last=at+word.length;
    if(!isWord(raw[at-1])&&!isWord(raw[last]))hits.push({start:at,end:last,kind,priority,key});
    from=at+word.length;count++;
   }
  };
  // Destacar no máximo dois conceitos com definição documentada.
  for(const t of (st.terms||[]).filter(t=>t.name?.length>=5&&t.name.length<=65).slice(0,2)){
   add(t.name,'dx',90,t.key);
  }
  if(state.settings.clinicalHighlights!==false){
   const patterns=[
    {kind:'dx',priority:78,rx:/diagnóstico sindrômico|hipótese etiológica|síndrome disabsortiva intestinal|bloqueio completo da condução AV|síndrome de má absorção/giu},
    {kind:'alert',priority:74,rx:/instabilidade hemodinâmica|sinais? de gravidade|sinais? de alarme|choque|assistolia|estridor|hipotensão|hipoxemia|instável|parada cardiorrespiratória|risco de morte|refratári[oa]s?|contraindicaç[ãõ]o/giu},
    {kind:'action',priority:67,rx:/marcapasso(?: permanente)?|estimulação (?:transcutânea|transvenosa)|cardioversão elétrica|anticoagulação|imunoglobulina(?: intravenosa)?|corticoides?|antibioticoterapia|dieta (?:rigorosa )?sem glúten|monitorização|internação|hidratação|reposição de (?:magnésio|potássio)|desfibrilação|reavaliação seriada/giu},
    {kind:'test',priority:61,rx:/anti-transglutaminase (?:IgA|tecidual)|IgA total|biópsias? duodenais?|ecocardiograma|eletrocardiograma|ECG(?: de 12 derivações)?|ressonância magnética|hemograma|eletrólitos|endoscopia|colonoscopia|mielograma|tomografia(?: computadorizada)?|metanefrinas|eletroforese/giu},
    {kind:'clue',priority:55,rx:/anemia ferropriva|anemia por deficiência de ferro|diarreia crônica|fraqueza (?:muscular )?proximal|atrofia de vilosidades|dissociação atrioventricular|onda P|QRS|linhas B|bradicardia|hemoptise|rash malar|poliartrite|hematúria|ortopneia|perda ponderal/giu}
   ];
   for(const p of patterns){
    for(const m of raw.matchAll(p.rx)){
     if(!isWord(raw[m.index-1])&&!isWord(raw[m.index+m[0].length]))hits.push({start:m.index,end:m.index+m[0].length,kind:p.kind,priority:p.priority});
    }
   }
  }
  const selected=[];
  const cap=state.settings.clinicalHighlights===false?2:Math.max(3,Math.min(7,Math.ceil(raw.length/125)));
  for(const hit of hits.sort((a,b)=>b.priority-a.priority||a.start-b.start||(b.end-b.start)-(a.end-a.start))){
   if(selected.length>=cap)break;
   if(selected.some(e=>hit.start<e.end&&hit.end>e.start))continue;
   selected.push(hit);
  }
  selected.sort((a,b)=>a.start-b.start);
  let html='',cursor=0;
  for(const h of selected){
   html+=esc(raw.slice(cursor,h.start));
   const part=esc(raw.slice(h.start,h.end));
   if(h.key){
    const safeKey=String(h.key).replace(/[^a-zA-Z0-9_-]/g,'');
    html+='<button type="button" class="osce-term-inline osce-keyword osce-keyword-dx" onclick="OSCEPilot.term(\''+safeKey+'\',this)" aria-label="'+part+': abrir definição e referência">'+part+' <sup>ref</sup></button>';
   }else{
    const kind=String(h.kind);
    html+='<mark class="osce-keyword osce-keyword-'+kind+'">'+part+'</mark>';
   }
   cursor=h.end;
  }
  return html+esc(raw.slice(cursor));
 }
 function uniqueStudyTip(st,q){
  const tip=String(q.memory||'').trim(),same=String(st.essential?.mnemonic||'').trim();
  const repeated=tip&&st.questions.some(other=>other!==q&&String(other.memory||'').trim()===tip);
  if(tip&&!repeated&&tip!==same)return tip;
  // Nas estações importadas que reutilizam um mnemônico em todas as perguntas,
  // mostramos uma pista da competência específica, sem repetir o texto geral.
  const criteria=(q.criteria||[]).filter(Boolean);
  const map={
   sindrome:'Distinga o padrão de apresentação da causa e sustente a hipótese com pistas do caso.',
   diagnostico:'Aponte a pista mais discriminadora e só depois nomeie a hipótese.',
   interpretacao:'Descreva o sinal observado, seu significado e uma limitação da imagem.',
   tecnica:'Identifique janela, transdutor e sequência antes de interpretar.',
   anamnese:'Pergunte o dado que mais mudaria a hipótese ou a urgência.',
   exame:'Examine estabilidade e o achado físico que altera a conduta.',
   mecanismo:'Conecte a lesão ao sinal e à consequência clínica.',
   investigacao:'Separe triagem, confirmação e gravidade.',
   exames:'Separe confirmação de exclusão e indique quando o exame não pode atrasar conduta.',
   diferenciais:'Para cada alternativa, cite um discriminador clínico.',
   conduta:'Primeiro estabilizar; depois tratamento dirigido e reavaliação.',
   gravidade:'Priorize sinais que exigem internação ou intervenção imediata.',
   orientacoes:'Explique hipótese, plano e sinais de retorno com linguagem do paciente.',
   sintese:'Feche com síndrome, achado, risco e próximo passo.'
  };
  const base=map[q.id]||map[q.competence?.toLowerCase()?.includes('fisiopatologia')?'mecanismo':''];
  if(!base&&!criteria.length)return '';
  const criterion=criteria.find(c=>c.length>22&&!/^Identifica /.test(c));
  return base?(base+(criterion?' Verifique: '+criterion+'.':'')):(criterion?'Verifique nesta etapa: '+criterion+'.':'');
 }
 function uniqueHints(st,q){
  const h=Array.isArray(q.hints)?q.hints:[];
  const signature=h.join('|'),repeated=signature&&st.questions.some(other=>other!==q&&(other.hints||[]).join('|')===signature);
  if(!repeated&&h.length>=3)return h;
  const checks=q.criteria||[];
  return [
   'Pense apenas na tarefa desta etapa: '+q.competence+'.',
   checks[0]?'Primeiro critério que você precisa demonstrar: '+checks[0]+'.':'Que dado do caso é mais discriminativo?',
   checks[1]?'Conecte ao segundo critério: '+checks[1]+'.':'Que erro de interpretação precisa ser evitado?'
  ];
 }
 function fullTopicDepth(st){
  const blocks=st.deeper||[];
  if(!blocks.length)return '';
  return '<details class="osce-deep osce-topic-depth"><summary>Aprofundamento completo do tema <span>abrir somente se necessário</span></summary><div>'
   +blocks.map(x=>'<section class="osce-depth-subtopic"><h4>'+esc(x.title)+'</h4><p>'+mark(st,x.body)+'</p></section>').join('')
   +'</div></details>';
 }
 function deepPanels(st,q,lastStep=false){
  const tip=uniqueStudyTip(st,q);
  return '<div class="osce-deep-stack osce-deep-compact">'
   +(tip?'<p class="osce-step-tip"><strong>Para lembrar nesta etapa:</strong> '+esc(tip)+'</p>':'')
   +(lastStep?fullTopicDepth(st):'')+'</div>';
 }
 function currentQ(st){const r=state.current;const id=r?.mode==='daily'?r.queue?.[r.pos]?.id:r?.ids?.[r.pos];return st?.questions.find(q=>q.id===id);}
 function activePage(){
  const st=study(),r=state.current;
  if(!r||!st)return homePage();
  const q=currentQ(st);if(!q)return homePage();
  const attemptedEntry=entry(st,q),prev=last(st,q),dailyMode=r.mode==='daily',elapsed=Math.max(0,Math.floor((Date.now()-new Date(r.startedAt))/60000));
  let out=sectionTitle(esc(st.title))+(dailyMode?'<p class="osce-session-timing"><b>Sessão mista:</b> '+(r.pos+1)+'/'+r.queue.length+' questões · meta '+r.targetMinutes+' min · '+elapsed+' min decorridos. O tempo-alvo interrompe apenas após concluir uma questão.</p>':'')+'<button class="btn ghost" onclick="OSCEPilot.home()">← Voltar e salvar</button>'+toolBar(st)
   +'<section class="osce-case"><div class="osce-stepbar"><span>'+displayLabel(st)+'</span><span class="osce-priority osce-priority-'+esc(st.priority)+'">● PRIORIDADE '+({alta:'ALTA',media:'MÉDIA',baixa:'BAIXA'}[st.priority]||'ADICIONAL')+'</span><span>'+esc(st.tiers[r.tier].label)+' · '+(r.pos+1)+'/'+r.ids.length+'</span></div><p>'+esc(st.caseText)+'</p>'+media(st)+'</section>'
   +'<section class="osce-step"><div class="osce-track"><span style="width:'+(r.pos/r.ids.length*100)+'%"></span></div><div class="osce-stepbar"><b>PERGUNTA '+(r.pos+1)+' DE '+r.ids.length+'</b><span>'+esc(q.competence)+'</span></div><h2>'+esc(q.prompt)+'</h2>'
   +(prev?'<p class="osce-note">Última tentativa: '+prev.score+'% de critérios · próxima revisão '+formatDate(prev.due)+'.</p>':'')
   +'<p class="osce-note"><strong>Origem:</strong> '+(q.origin==='original'?'Pergunta do banco original, com correção didática.':'Questão didática do Master; revisar conteúdo clínico crítico com as fontes.')+' Não é gabarito institucional.</p>'
   +'<p class="osce-note"><strong>Após a tentativa você verá:</strong> resposta-modelo, checklist dos pontos essenciais, aprofundamentos, referências e memorização. Se preferir, pode <button class="osce-inline-action" onclick="OSCEPilot.preview('+st.number+')">revisar as respostas agora</button> antes de simular.</p>'+'<label class="osce-answer-label" for="osce-answer">Sua resposta (como na arguição oral)</label><textarea id="osce-answer" rows="6" placeholder="Digite seu raciocínio; pode escrever não sei para aprender pelo erro." oninput="OSCEPilot.answer(this.value)" onkeydown="OSCEPilot.answerKey(event)" '+(shown?'readonly':'')+'>'+esc(attemptedEntry.draft||'')+'</textarea>';
  if(!shown){
   out+='<p class="osce-note">Qual é sua confiança ANTES de conferir?</p><div class="osce-confidence" role="group" aria-label="Confiança antes do gabarito">'+[[1,'Baixa'],[2,'Média'],[3,'Alta']].map(([i,txt])=>'<button type="button" aria-pressed="'+(confidence===i)+'" onclick="OSCEPilot.conf('+i+')">'+txt+'</button>').join('')+'</div>';
   if(hints)out+='<div class="osce-hint"><b>Dica '+hints+'/3:</b> '+esc(uniqueHints(st,q)[hints-1]||'Reexamine os critérios desta pergunta.')+'</div>';
   out+='<div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.reveal()">Conferir resposta <span class="osce-key-hint" aria-hidden="true">⌘/Ctrl ↵</span></button><button class="btn" id="osce-hint-action" onclick="OSCEPilot.hint()">Preciso de dica'+(hints?' ('+hints+'/3)':'')+'</button><button class="btn ghost" onclick="OSCEPilot.home()">Salvar e sair</button></div>';
  }else{
   out+='<div class="osce-feedback"><p class="eyebrow">RESPOSTA DIDÁTICA · CORREÇÃO POR CRITÉRIOS</p><h3>Resposta-modelo Master</h3><p>'+mark(st,q.answer)+'</p><div class="osce-criteria"><h3>O que você realmente incluiu?</h3>'
    +q.criteria.map((txt,i)=>'<label><input type="checkbox" '+(checked.includes(i)?'checked':'')+' onchange="OSCEPilot.criterion('+i+',this.checked)"><span>'+esc(txt)+'</span></label>').join('')+'</div>'
    +'<p class="osce-note"><b id="osce-criteria-count">'+checked.length+'/'+q.criteria.length+'</b> critérios marcados; pontuação por <strong>autoavaliação manual</strong>, não por análise da resposta. Responder apenas “não sei” registra 0% mesmo se algum critério for marcado.</p><div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.finish()">Registrar resultado e avançar</button><button class="btn" onclick="OSCEPilot.retry()">Voltar à resposta</button></div></div>';
   if(r.tier==='essencial')out+='<details class="osce-deep" open><summary>Essencial · illness script de 1 minuto</summary><div><p>'+esc(st.essential.oneMinute)+'</p><p><strong>Âncora:</strong> '+esc(st.essential.mnemonic)+'</p></div></details>';
   out+=deepPanels(st,q,r.pos===r.ids.length-1);
  }
  out+='</section><section class="osce-case osce-library-case"><details class="osce-deep osce-library" id="osce-library"><summary>Biblioteca desta estação <span>conceitos, aulas e referências</span></summary><div class="osce-deep-stack">'+termPanel(st)+lessonBar(st)+sourcePanel(st)+'</div></details></section>';
  return out;
 }
 function preview(n){
  if(!MAP.has(Number(n)))return;
  markWelcomeVisited();previewStation=Number(n);previewTier='completa';previewStep=0;
  previewLayout=state.settings.previewLayout==='all'?'all':'guided';
  screen='preview';glossary='';renderAgain();
 }
 function previewQuestion(number,questionId){
  const st=MAP.get(Number(number));if(!st)return false;
  preview(st.number);
  const levels=['completa','rapida','essencial'];
  const level=levels.find(k=>st.tiers?.[k]?.ids?.includes(String(questionId)));
  if(level){
   previewTier=level;
   previewStep=st.tiers[level].ids.indexOf(String(questionId));
   previewLayout='guided';
   renderAgain('guide');
  }
  return true;
 }
 function previewTierSet(t){
  const st=MAP.get(previewStation);
  if(st?.tiers[t]){previewTier=t;previewStep=0;renderAgain('levels');}
 }
 function previewStepSet(i){
  const st=MAP.get(previewStation),tier=st?.tiers[previewTier];
  if(!tier)return;
  const next=Math.max(0,Math.min(tier.ids.length-1,Number(i)||0));
  previewStep=next;previewLayout='guided';renderAgain('guide');
 }
 function previewLayoutSet(mode){
  if(!['guided','all'].includes(mode))return;
  previewLayout=mode;state.settings.previewLayout=mode;save();renderAgain('guide');
 }
 function toggleClinicalHighlights(){
  state.settings.clinicalHighlights=state.settings.clinicalHighlights===false;
  save();renderAgain(screen==='preview'?'guide':'feedback');
 }
 function highlightLegend(){
  return '<div class="osce-reading-legend" aria-label="Significado dos destaques">'
    +[['dx','Diagnóstico'],['clue','Pista'],['test','Exame'],['action','Conduta'],['alert','Atenção']].map(([k,label])=>'<span class="osce-reading-legend-item"><i class="osce-legend-mark osce-keyword-'+k+'" aria-hidden="true"></i>'+label+'</span>').join('')
    +'</div>';
 }
 function readingCard(st,q,index,total){
  const tip=uniqueStudyTip(st,q);
  return '<article class="osce-preview-question osce-reading-card" id="osce-reading-step-'+index+'">'
   +'<header class="osce-reading-card-head"><p class="eyebrow">ETAPA '+(index+1)+'/'+total+' · '+esc(q.competence)+'</p><h3>'+esc(q.prompt)+'</h3></header>'
   +'<div class="osce-preview-answer osce-reading-answer"><strong>Resposta-modelo do Master</strong><p>'+mark(st,q.answer)+'</p></div>'
   +'<div class="osce-reading-criteria"><h4>O que não posso esquecer</h4><ul>'+q.criteria.map(c=>'<li>'+esc(c)+'</li>').join('')+'</ul></div>'
   +(tip?'<p class="osce-step-tip osce-reading-tip"><strong>Âncora desta pergunta:</strong> '+esc(tip)+'</p>':'')
   +'</article>';
 }
 function previewPage(){
  const st=MAP.get(previewStation)||BANK[0],tier=st.tiers[previewTier]?previewTier:'completa',t=st.tiers[tier],qs=t.ids.map(id=>st.questions.find(q=>q.id===id)).filter(Boolean);
  previewStep=Math.min(previewStep,Math.max(0,qs.length-1));
  const toSimulate=(state.current?.station===st.number?'OSCEPilot.resume()':'OSCEPilot.start(\''+tier+'\',null,'+st.number+')');
  const simText=state.current?.station===st.number?'Retomar simulação':'Iniciar simulação';
  let html=sectionTitle('Revisar '+displayLabel(st).toLowerCase()+' — <em>'+esc(st.title)+'.</em>');
  html+='<button class="btn ghost" onclick="OSCEPilot.home()">← Voltar às estações</button><div class="osce-preview-note osce-reading-intro"><div><strong>ESTUDO GUIADO · SEM NOTA</strong><p>Uma pergunta por vez, com resposta e pontos essenciais à vista. Navegue livremente; abra o aprofundamento completo apenas se precisar. O simulado continua sem mostrar o gabarito antes da sua tentativa.</p></div><button class="btn primary" onclick="'+toSimulate+'">'+simText+'</button></div>';
  html+='<div class="osce-study-levels">'+Object.entries(st.tiers).map(([k,x])=>'<button type="button" class="btn '+(k===tier?'primary':'')+'" aria-pressed="'+(k===tier)+'" onclick="OSCEPilot.previewTierSet(\''+k+'\')">'+esc(x.label)+' · '+x.minutes+'min</button>').join('')+'</div>';
  html+='<section class="osce-case"><h2>Contexto e imagem do caso</h2><p>'+esc(st.caseText)+'</p>'+media(st)+'</section>';
  html+='<section class="osce-case osce-reading-overview"><h2>Essencial — síntese em 1 minuto</h2><p>'+mark(st,st.essential.oneMinute)+'</p><p class="osce-note"><strong>Âncora do tema:</strong> '+esc(st.essential.mnemonic)+'</p></section>';
  html+='<section class="osce-preview-questions osce-reading-workspace" id="osce-reading-workspace"><div class="osce-reading-toolbar"><div><h2>O que preciso saber responder</h2><p class="osce-note">'+qs.length+' etapas para dominar o raciocínio deste caso</p></div><div class="osce-reading-options"><button class="btn osce-reading-view" aria-pressed="'+(previewLayout==='guided')+'" onclick="OSCEPilot.previewLayoutSet(\'guided\')">Passo a passo</button><button class="btn osce-reading-view" aria-pressed="'+(previewLayout==='all')+'" onclick="OSCEPilot.previewLayoutSet(\'all\')">Ver todas</button><button class="btn ghost osce-reading-emphasis" aria-pressed="'+(state.settings.clinicalHighlights!==false)+'" onclick="OSCEPilot.toggleClinicalHighlights()">'+(state.settings.clinicalHighlights!==false?'Destaques: ligados':'Destaques: desligados')+'</button></div></div>'
   +(state.settings.clinicalHighlights===false?'':highlightLegend());
  if(previewLayout==='guided'){
   const i=previewStep;
   html+='<div class="osce-reading-step-nav" aria-label="Escolher etapa">'+qs.map((q,n)=>'<button type="button" class="osce-reading-index'+(n===i?' is-active':'')+'" aria-label="Etapa '+(n+1)+': '+esc(q.competence)+'" aria-current="'+(n===i?'step':'false')+'" onclick="OSCEPilot.previewStepSet('+n+')">'+(n+1)+'</button>').join('')+'</div>';
   html+='<div class="osce-reading-progress"><span style="width:'+((i+1)/qs.length*100)+'%"></span></div>';
   html+='<div class="osce-guided-card" id="osce-guided-card">'+readingCard(st,qs[i],i,qs.length)+'</div>';
   html+='<nav class="osce-reading-pagination" aria-label="Navegação das perguntas"><button type="button" class="btn" '+(i===0?'disabled ':'')+'onclick="OSCEPilot.previewStepSet('+(i-1)+')">← Anterior</button><span>Etapa '+(i+1)+' de '+qs.length+'</span>'+(i<qs.length-1?'<button type="button" class="btn primary" onclick="OSCEPilot.previewStepSet('+(i+1)+')">Próxima →</button>':'<button type="button" class="btn primary" onclick="'+toSimulate+'">'+simText+' →</button>')+'</nav>';
  }else{
   html+='<div class="osce-reading-all" id="osce-guided-card">'+qs.map((q,i)=>readingCard(st,q,i,qs.length)).join('')+'</div>';
  }
  html+='</section>';
  html+='<section class="osce-case osce-study-depth"><h2>Aprofundamento opcional</h2><p class="osce-note">Sem fragmentar o conteúdo: o aprofundamento completo fica em um único painel.</p>'+fullTopicDepth(st)+'</section>';
  html+='<section class="osce-case osce-library-case"><details class="osce-deep osce-library" id="osce-library"><summary>Biblioteca desta estação <span>conceitos, aulas e referências</span></summary><div class="osce-deep-stack">'+termPanel(st)+lessonBar(st)+sourcePanel(st)+'</div></details><div class="osce-actions"><button type="button" class="btn primary" onclick="'+toSimulate+'">'+simText+' agora</button><button type="button" class="btn" onclick="OSCEPilot.home()">Voltar ao catálogo</button></div></section>';
  return html;
 }
 function resetView(){shown=false;confidence=0;hints=0;checked=[];glossary='';}
 function storeView(){if(state.current){state.current.view={shown,confidence,hints,checked:[...checked]};save();}}
 function restoreView(){const v=state.current?.view||{};shown=!!v.shown;confidence=[1,2,3].includes(v.confidence)?v.confidence:0;hints=Math.min(3,Math.max(0,Number(v.hints)||0));checked=Array.isArray(v.checked)?v.checked.filter(Number.isInteger):[];}
 function start(tier,ids,number){
  const st=data(number||61);if(!st?.tiers[tier])return;
  markWelcomeVisited();const chosen=(Array.isArray(ids)&&ids.length?ids:st.tiers[tier].ids).filter(id=>st.questions.some(q=>q.id===id));
  state.current={station:st.number,tier,ids:chosen,pos:0,startedAt:now(),itemStartedAt:Date.now(),prepared:screen==='preview',results:[],view:{shown:false,confidence:0,hints:0,checked:[]}};
  screen='study';resetView();save();renderAgain('case');
 }
 function dailyPlan(minutes){
  const limit=minutes<=5?3:minutes<=15?8:minutes<=30?14:20;
  const due=dueItems().sort((a,b)=>Number(!!b.a?.overconfident)-Number(!!a.a?.overconfident)
   ||Number(b.st.priority==='alta')-Number(a.st.priority==='alta')||new Date(a.a.due)-new Date(b.a.due));
  const fresh=BANK.flatMap(st=>st.questions.filter(q=>!last(st,q)).slice(0,st.priority==='alta'?2:1).map(q=>({st,q})));
  const selected=[],seen=new Set();
  function add(pool,quota){
   let count=0;
   while(pool.length&&selected.length<limit&&count<quota){
    let at=pool.findIndex(x=>!seen.has(qkey(x.st,x.q))&&x.st.area!==selected.at(-1)?.st.area);
    if(at<0)at=pool.findIndex(x=>!seen.has(qkey(x.st,x.q)));
    if(at<0)break;
    const x=pool.splice(at,1)[0];seen.add(qkey(x.st,x.q));selected.push(x);count++;
   }
  }
  add([...due],Math.ceil(limit*.6));
  add(fresh,limit-selected.length);
  add([...due],limit-selected.length);
  const weakest=weakItems().sort((a,b)=>a.a.score-b.a.score);
  add(weakest,limit-selected.length);
  if(!selected.length){const st=BANK[0],q=st.questions[0];return [{station:st.number,id:q.id}];}
  return selected.map(x=>({station:x.st.number,id:x.q.id}));
 }
 function daily(){
  const minutes=[5,15,30,45].includes(Number(state.settings.minutes))?Number(state.settings.minutes):15;
  const queue=dailyPlan(minutes);
  if(!queue.length)return notify('Nenhuma questão de estudo disponível.');
  markWelcomeVisited();
  state.current={station:queue[0].station,mode:'daily',tier:'rapida',ids:queue.map(x=>x.id),queue,
   targetMinutes:minutes,pos:0,startedAt:now(),itemStartedAt:Date.now(),prepared:false,results:[],
   view:{shown:false,confidence:0,hints:0,checked:[]}};
  screen='study';resetView();save();renderAgain('case');
 }
 function resume(){if(!state.current)return daily();screen='study';restoreView();renderAgain('question');}
 function home(){screen='home';renderAgain('top');}
 function setDate(v){state.settings.examDate=v;save();renderAgain();}
 function setMinutes(v){state.settings.minutes=Number(v);save();renderAgain();}
 function answer(v){const q=currentQ(study());if(q&&!shown){entry(study(),q).draft=String(v).slice(0,6000);save()}}
 function answerKey(event){if(!shown&&(event.metaKey||event.ctrlKey)&&event.key==='Enter'){event.preventDefault();reveal();}}
 function conf(n){if(shown)return;confidence=n;storeView();if(typeof document!=='undefined')document.querySelectorAll('.osce-confidence button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i+1===n)));}
 function hint(){if(!shown){hints=Math.min(3,hints+1);storeView();renderAgain();}}
 function reveal(){const q=currentQ(study());if(!q)return;if(!entry(study(),q).draft?.trim())return notify('Escreva sua tentativa primeiro (ou “não sei”).');if(!confidence)return notify('Registre primeiro sua confiança.');shown=true;checked=[];storeView();renderAgain('feedback');}
 function criterion(i,on){const q=currentQ(study());if(!q)return;checked=on?[...new Set([...checked,i])]:checked.filter(x=>x!==i);storeView();if(typeof document!=='undefined'){const el=document.getElementById('osce-criteria-count');if(el)el.textContent=checked.length+'/'+q.criteria.length;}}
 function retry(){shown=false;checked=[];storeView();renderAgain('question');}
 function finish(){
  if(!shown)return;const r=state.current,st=study(),q=currentQ(st);if(!r||!q)return;
  const x=entry(st,q),last0=last(st,q),emptyResponse=isBlankAttempt(x.draft),validCriteria=emptyResponse?[]:checked.filter(i=>i>=0&&i<q.criteria.length),score=q.criteria.length?Math.round(100*validCriteria.length/q.criteria.length):0,high=confidence===3&&score<80;
  const interval=score<50||high||hints>=2?1:score<80?3:score===100&&hints===0&&(last0?.score||0)>=80?21:7;
  const attempt={at:now(),answer:x.draft||'',score,criteria:validCriteria,confidence,hintsUsed:hints,overconfident:high,due:shift(interval),depth:r.tier,prepared:!!r.prepared,durationMs:Math.max(0,Date.now()-(r.itemStartedAt||Date.now())),source:'autoauditoria',scoring:'manual-checklist-v2',blankAnswer:emptyResponse};
  x.attempts=[...(x.attempts||[]),attempt].slice(-50);x.draft='';r.results.push({station:st.number,question:q.id,score,at:attempt.at});
  if(window.MasterActivity?.track)window.MasterActivity.track('question_answer','osce:'+st.number+':'+q.id,{correct:score>=80});
  resetView();
  const timeout=r.mode==='daily'&&Date.now()-new Date(r.startedAt).getTime()>=r.targetMinutes*60000;
  if(r.pos<r.ids.length-1&&!timeout){r.pos++;r.itemStartedAt=Date.now();r.view={shown:false,confidence:0,hints:0,checked:[]};}
  else{if(r.mode!=='daily')state.covered[st.number]={...(state.covered[st.number]||{}),[r.tier]:true};state.runs.push({...r,completedAt:now()});state.runs=state.runs.slice(-120);state.current=null;screen='done';reviewStation=st.number;}
  save();renderAgain(state.current?'question':'top');
 }
 function competencyRadar(){
  const groups=new Map();
  for(const st of BANK)for(const q of st.questions){
   const a=last(st,q);if(!a)continue;
   const name=(q.competence||'Raciocínio clínico').trim();
   const g=groups.get(name)||{name,count:0,total:0,confidentErrors:0,station:st.number,question:q.id};
   g.count++;g.total+=a.score;
   if(a.overconfident)g.confidentErrors++;
   if(a.score<80){g.station=st.number;g.question=q.id;}
   groups.set(name,g);
  }
  const arr=[...groups.values()].map(g=>({...g,mean:Math.round(g.total/g.count)})).sort((a,b)=>b.confidentErrors-a.confidentErrors||a.mean-b.mean);
  if(!arr.length)return '<section class="osce-case"><h2>Mapa de competências</h2><p>Seu mapa aparece após a primeira tentativa. Ele mostra médias <strong>autoavaliadas</strong> por competência, não capacidade clínica comprovada.</p></section>';
  return '<section class="osce-case osce-competence-radar"><h2>Mapa de competências · minhas lacunas</h2><p class="osce-note">Média dos checklists marcados por você. Amostra pequena não é diagnóstico de proficiência; priorize acertos retestados sem consulta.</p><div class="osce-competence-grid">'+arr.slice(0,6).map(g=>{
   const flag=g.confidentErrors?' · erro com alta confiança':'';
   return '<div class="osce-competence-item"><div class="osce-competence-name"><b>'+esc(g.name)+'</b><span>'+g.mean+'% · '+g.count+' tentativa(s)'+flag+'</span></div><div class="osce-competence-progress" role="img" aria-label="Média autodeclarada de '+g.mean+' por cento"><span style="width:'+g.mean+'%"></span></div></div>';
  }).join('')+'</div></section>';
 }
 function reviewPage(){
  const weak=weakItems(),dues=dueItems();
  return sectionTitle('Revisão <em>adaptativa.</em>')+'<button class="btn ghost" onclick="OSCEPilot.home()">← Voltar</button><p>Erros, respostas parciais e confiança excessiva voltam primeiro. Reavaliação por recuperação ativa, sem séries punitivas.</p>'
   +'<div class="osce-stats"><div><b>'+dues.length+'</b><span>vencidas</span></div><div><b>'+weak.length+'</b><span>lacunas insatisfatórias</span></div></div><div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.reviewDue()">Retestar agora</button><button class="btn" onclick="OSCEPilot.showPrompt()">Gerar script para IA</button></div>'
    +competencyRadar()+'<section class="osce-case"><h2>Agendamento explicável</h2><p>Erro importante/alta confiança errada: D+1 · parcial: D+3 · boa resposta: D+7 · domínio repetido, sem dicas: D+21. O escore é produzido por marcação manual dos critérios da resposta.</p></section>'
   +'<div class="osce-review-list">'+(weak.length?weak.map(x=>'<button onclick="OSCEPilot.start(\'rapida\',[ \''+esc(x.q.id)+'\' ],'+x.st.number+')"><b>'+displayLabel(x.st)+' — '+esc(x.q.competence)+' · '+x.a.score+'%</b><span>'+esc(x.q.prompt)+'</span><small>Reteste: '+formatDate(x.a.due)+'</small></button>').join(''):'<div class="card pad"><p>Nenhum erro insatisfatório registrado. Comece por uma das estações disponíveis.</p></div>')+'</div>';
 }
 function makePrompt(){
  const weak=BANK.flatMap(st=>st.questions.map(q=>({st,q,a:last(st,q)})).filter(x=>x.a&&(x.a.score<80||x.a.overconfident))).sort((a,b)=>Number(!!b.a.overconfident)-Number(!!a.a.overconfident)||Number(b.st.priority==='alta')-Number(a.st.priority==='alta')||a.a.score-b.a.score||b.a.confidence-a.a.confidence);
  if(!weak.length)return 'Ainda não há erros ou respostas parciais. Responda uma pergunta para gerar um roteiro específico.';
  let out='Você é avaliador de Clínica Médica II (FMP), especializado em arguição prático-oral. Faça UMA pergunta por vez e aguarde minha resposta. Não trate perguntas do Master como oficiais da FMP.\n\nSeu objetivo é corrigir minhas LACUNAS REAIS: comece por erros com confiança alta ou risco clínico, não repita toda a teoria sem necessidade. Investigue diagnóstico sindrômico e etiológico, anamnese, exame físico, diferenciais, fisiopatologia, exames, gravidade e conduta conforme o assunto. Use as fontes ESPECÍFICAS DE CADA ESTAÇÃO listadas abaixo, verificando se ainda são atuais; se não puder confirmar, informe a limitação. Não invente imagens, achados, doses ou referências.\n\nDepois de cada tentativa: (1) identifique o critério não cumprido, (2) explique o mecanismo e a conduta, (3) dê mnemônico conciso, (4) apresente um caso novo semelhante, (5) aplique checklist, (6) proponha reteste espaçado D+1/D+3/D+7/D+21. Não revele o gabarito antes da minha tentativa. A nota do site é autoavaliação por critérios, não avaliação oficial.\n\nERROS PRIORIZADOS ('+weak.length+'):\n';
  for(const x of weak.slice(0,24)){const missing=x.q.criteria.filter((_,i)=>!x.a.criteria.includes(i)),refs=(x.st.sources||[]).filter(r=>r.url&&(r.label||r.title)).slice(0,2).map(r=>(r.label||r.title)+' — '+r.url);out+='\n'+displayLabel(x.st)+' — '+x.st.title+' | '+x.q.competence+' | '+x.a.score+'% | confiança '+x.a.confidence+'/3 | dicas '+x.a.hintsUsed+'/3'+(x.a.overconfident?' | ATENÇÃO: erro com confiança alta':'')+'\nPergunta: '+x.q.prompt+'\nNão cumpriu: '+(missing.join('; ')||'reavaliar raciocínio')+'\nMinha resposta: '+x.a.answer.slice(0,900)+(refs.length?'\nFontes do tema para conferir: '+refs.join(' ; '):'\nFontes específicas não cadastradas nesta estação: procurar diretrizes verificáveis.')+'\n';}
  return out+'\nComece só com a primeira pergunta, sem revelar a resposta.';
 }
 function promptPage(){return sectionTitle('Script de <em>revisão por erros.</em>')+'<button class="btn ghost" onclick="OSCEPilot.home()">← Voltar</button><p>Copie para uma IA a análise dos critérios não cumpridos. Nenhuma resposta é transmitida automaticamente.</p><section class="osce-step"><label class="osce-answer-label" for="osce-prompt">Roteiro personalizado</label><textarea readonly id="osce-prompt" rows="19">'+esc(makePrompt())+'</textarea><div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.copyPrompt()">Copiar para IA</button><button class="btn" onclick="OSCEPilot.showReview()">Ver erros</button></div></section>';}
 function donePage(){const st=data(reviewStation),run=state.runs.at(-1),n=run?.results.length||0,isDaily=run?.mode==='daily',next=dailyPlan(Number(state.settings.minutes)||15)[0],nextSt=MAP.get(next?.station),nextQ=nextSt?.questions.find(q=>q.id===next?.id);return sectionTitle('Sessão <em>concluída.</em>')+'<p>'+(isDaily?'Você concluiu '+n+' pergunta(s) de diferentes estações na sessão mista.':'Você concluiu '+n+' pergunta(s) da '+displayLabel(st).toLowerCase()+' ('+esc(st.title)+').')+' Não precisa concluir tudo em um dia.</p><section class="osce-case"><h2>Consolide sem consultar</h2><p>'+esc(st.essential.oneMinute)+'</p><p class="osce-note">Próximo passo sugerido: '+(nextSt&&nextQ?displayLabel(nextSt)+' — '+esc(nextSt.title)+' · '+esc(nextQ.competence):'retome uma pergunta sem consulta')+'. Use primeiro a revisão vencida quando chegar o dia.</p><div class="osce-actions"><button class="btn osce-super-focus-cta" onclick="SuperFoco.open(\''+(st.pocusOrder?'pocus':'osce')+'\',\''+st.number+'\')">Treinar pontos fracos</button><button class="btn primary" onclick="OSCEPilot.showReview()">Ver minha revisão</button><button class="btn" onclick="OSCEPilot.showPrompt()">Copiar script para IA</button><button class="btn" onclick="OSCEPilot.home()">Todas as estações</button></div></section>';}
 function page(){if(screen!=='home'&&welcomeOpen){welcomeOpen=false;welcomeDismissedThisLoad=true;}const html=screen==='preview'?previewPage():screen==='study'?activePage():screen==='review'?reviewPage():screen==='prompt'?promptPage():screen==='done'?donePage():homePage();const stationNumber=screen==='preview'?previewStation:screen==='study'?study()?.number:screen==='done'?reviewStation:null;
  const station=stationNumber?MAP.get(Number(stationNumber)):null;
  const noteQ=screen==='study'?currentQ(study())?.id:screen==='preview'?station?.tiers?.[previewTier]?.ids?.[previewStep]:null;
  const noteAttrs=station?' data-note-station="'+esc(station.number)+'" data-note-title="'+esc(station.title)+'" data-note-step="'+esc(screen==='preview'?previewStep:screen==='study'?state.current?.pos||0:0)+'" data-note-question="'+esc(noteQ||'')+'"':'';
  return '<div class="osce-app-shell osce-view-'+screen+'" data-osce-view="'+screen+'"'+noteAttrs+'>'+html+'</div>';}
 function showReview(){screen='review';renderAgain();}
 function showPrompt(){screen='prompt';renderAgain();}
 function reviewDue(){const list=dueItems();if(!list.length)return notify('Nenhum reteste vencido ainda.');const x=list[0];start('rapida',[x.q.id],x.st.number);}
 function term(k,anchor){
  const st=screen==='study'?study():screen==='preview'?MAP.get(previewStation):data(reviewStation);
  const arr=st.terms||[
   {key:'sincope',name:'Síncope',definition:'Hipoperfusão cerebral global transitória.',source:'esc2018'},
   {key:'ecg',name:'ECG',definition:'Avaliação eletrocardiográfica de 12 derivações.',source:'esc2018'},
   {key:'eco',name:'Ecocardiograma',definition:'Exame cardíaco estrutural.',source:'esc2018'},
   {key:'eeg',name:'EEG',definition:'Investigação indicada conforme suspeita neurológica.',source:'esc2018'}
  ];
  const t=arr.find(x=>x.key===k);if(!t)return;
  const src=(st.sources||[]).find(x=>x.id===t.source);
  if(anchor?.isConnected&&window.OSCEContext?.open(anchor,
   {name:t.name,definition:t.definition,url:src?.url,sourceLabel:src?.label||src?.title}))return;
  glossary='<p><strong>'+esc(t.name)+':</strong> '+esc(t.definition)+'</p>'+(src?'<p><a target="_blank" rel="noopener noreferrer" href="'+esc(src.url)+'">Fonte: '+esc(src.label||src.title)+' ↗</a></p>':'');
  const d=document.getElementById('osce-terms');if(d&&!d.open)d.open=true;
  const area=document.getElementById('osce-glossary-content');if(area){area.innerHTML=glossary;area.scrollIntoView({block:'nearest',behavior:'auto'});}
 }

 function showSources(){const d=document.getElementById('osce-sources');if(d){const outer=document.getElementById('osce-library');if(outer)outer.open=true;d.open=true;d.scrollIntoView({block:'start',behavior:'smooth'});}}
 function showTerms(){const d=document.getElementById('osce-terms');if(d){const outer=document.getElementById('osce-library');if(outer)outer.open=true;d.open=true;d.scrollIntoView({block:'start',behavior:'smooth'});}}
 function openLesson(n){
  const st=MAP.get(Number(n)),lesson=st?.lesson||({52:{kind:'p1',id:'p1arr'},61:{kind:'topic',id:'neuro1'}}[n]);
  if(lesson?.kind==='p1'&&window.P1?.openTopic){window.P1.openTopic(lesson.id);return;}
  if(lesson?.kind==='topic'&&typeof window.openTopic==='function'){window.openTopic(lesson.id);return;}
  notify('Aula correlata não confirmada nesta versão. Consulte as referências.');
 }
 function showFullLesson(n){openLesson(n);}
 function expandImage(img){
  if(!img?.src||typeof document==='undefined')return;
  const annot=img.closest?.('.osce-annotated');
  const zoom=annot?.querySelector('.osce-annotated-zoom');
  if(zoom){expandVisual(zoom);return;}
  const overlay=document.createElement('div');
  overlay.className='osce-lightbox';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Imagem clínica ampliada');
  overlay.innerHTML='<button class="osce-close-image" type="button" aria-label="Fechar imagem">✕ Fechar</button><img src="'+esc(img.src)+'" alt="'+esc(img.alt)+'" /><p>Imagem de referência usada nesta estação · ampliação</p>';
  openOSCEDialog(overlay,img);
 }
 async function copyPrompt(){const x=document.getElementById('osce-prompt');if(!x)return;try{await navigator.clipboard.writeText(x.value);notify('Roteiro copiado.');}catch{x.focus();x.select();notify('Selecione e copie o roteiro.');}}
 function reload(){state=load();screen='home';shown=false;confidence=0;hints=0;checked=[];glossary='';if(!personalIsOwner()&&catalogPriority==='minhas')catalogPriority='alta';welcomeOpen=!state.settings.hideWelcome&&!welcomeDismissedThisLoad;welcomeSkipNext=!!state.settings.hideWelcome;renderAgain();}
 window.addEventListener('master-auth-ready',reload);
 window.addEventListener('master-auth-ended',()=>{state=empty();screen='home';shown=false;glossary='';if(catalogPriority==='minhas')catalogPriority='alta';welcomeDismissedThisLoad=false;welcomeOpen=true;welcomeSkipNext=false;});
 window.addEventListener('master-remote-merge',e=>{if(e.detail?.key===KEY)reload()});
 window.addEventListener('storage',e=>{if(e.key===KEY)reload()});
 return {bank,weakItems,page,start,daily,resume,home,personalIsOwner,personalDone,personalOpen,previewQuestion,previewStepSet,previewLayoutSet,toggleClinicalHighlights,answerKey,jumpSection,welcomePreference,showWelcome,closeWelcome,preview,previewTierSet,previewPage,filterCatalog,setCatalogPriority,moreCatalog,jumpToIndex,setDate,setMinutes,answer,conf,hint,reveal,criterion,retry,finish,showReview,showPrompt,reviewDue,term,showSources,showTerms,openLesson,showFullLesson,expandImage,focusVisualNote,toggleVisualMarks,expandVisual,copyPrompt,reload};
})();
