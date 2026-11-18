/* Optional first-party learning analytics. No input text, search terms, conversations, URL queries or stack traces. */
window.MasterActivity=(()=>{
 'use strict';
 const VERSION='2026-11-18',allowed=new Set(['session_start','page_view','lesson_open','lesson_complete','question_answer','case_open','case_complete','exam_start','exam_complete','flashcard_review','assistant_open','assistant_request','assistant_result','pomodoro_start','pomodoro_pause','active_time','client_error']);
 const auth=()=>window.MASTER_AUTH, client=()=>auth()?.client(), uid=()=>auth()?.user()?.id;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const uuid=()=>{if(typeof crypto.randomUUID==='function')return crypto.randomUUID();const bytes=crypto.getRandomValues(new Uint8Array(16));bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;const h=[...bytes].map(x=>x.toString(16).padStart(2,'0')).join('');return h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20);};
 const clean=(s,max=100)=>String(s??'').slice(0,max).replace(/[^a-zA-Z0-9_.:-]/g,'');
 let owner=null,epoch=0,enabled=false,known=false,isAdmin=false,session=null,queue=[],sending=false,failures=0,nextRetry=0,lastPage='',pending=null,locationInfo={route:'dashboard',resource:''},lastTick=performance.now(),lastInput=performance.now(),activeMs=0,dialog=null,lastError=0,reportEpoch=0,reportData=null,reportFilter=null,reportScheduled=false;
 function live(mine=epoch,id=owner){return mine===epoch&&!!id&&uid()===id&&owner===id;}
 function ready(){return enabled&&live()&&locationInfo.route!=='admin';}
 function setContext(resource,kind='lesson_open'){pending={resource:clean(resource),kind};}
 function track(kind,resource='',extra={}){
  if(!ready()||!allowed.has(kind))return;
  const route=String(locationInfo.route).slice(0,40);if(!/^[a-z0-9_-]+$/.test(route))return;
  const event={id:uuid(),session_id:session,kind,route,resource:clean(resource||locationInfo.resource),duration_ms:kind==='active_time'?Math.min(30000,Math.max(0,Math.round(extra.duration_ms||0))):0,happened_at:new Date().toISOString()};
  if(kind==='question_answer'&&typeof extra.correct==='boolean')event.correct=extra.correct;
  if(['success','unavailable','network','script','timeout'].includes(extra.code))event.code=extra.code;
  queue.push(event);if(queue.length>200)queue.shift();if(queue.length>=20)void flush();
 }
 function commitTime(){if(activeMs>=1000)track('active_time','',{duration_ms:activeMs});activeMs=0;}
 async function flush(){
  if(sending||!ready()||!queue.length||Date.now()<nextRetry||typeof client()?.rpc!=='function')return;
  const mine=epoch,id=owner,batch=queue.slice(0,50);sending=true;
  try{
   const {error}=await client().rpc('master_activity_record',{p_events:batch});
   if(!live(mine,id))return;
   if(error){failures++;nextRetry=Date.now()+Math.min(120000,10000*2**Math.min(failures,4));return;}
   const ids=new Set(batch.map(x=>x.id));queue=queue.filter(x=>!ids.has(x.id));failures=0;nextRetry=0;
  }catch{if(live(mine,id)){failures++;nextRetry=Date.now()+30000;}}
  finally{if(live(mine,id))sending=false;}
 }
 function tick(){
  const now=performance.now(),elapsed=Math.min(5000,Math.max(0,now-lastTick));lastTick=now;
  if(ready()&&document.visibilityState==='visible'&&document.hasFocus()&&now-lastInput<60000)activeMs+=elapsed;
  if(activeMs>=25000){commitTime();void flush();}
 }
 function restoreContext(){
  const root=document.getElementById('main-content'),route=typeof ui!=='undefined'?ui.route:'dashboard';
  if(root?.dataset.activityRoute===route){pending={resource:root.dataset.activityResource||'',kind:root.dataset.activityKind||null};locationInfo={route,resource:pending.resource};}
 }
 function afterRender(){
  const route=typeof ui!=='undefined'?ui.route:'dashboard';
  const context=pending||(route==='topic'?{resource:clean(ui.topic+':'+ui.chapter),kind:'lesson_open'}:{resource:'',kind:null});pending=null;
  const main=document.getElementById('main-content');if(main){main.dataset.activityRoute=route;main.dataset.activityResource=context.resource;main.dataset.activityKind=context.kind||'';}
  const key=route+'|'+context.resource;
  if(key!==lastPage){tick();commitTime();locationInfo={route,resource:context.resource};lastPage=key;lastTick=performance.now();track('page_view');if(context.kind)track(context.kind);}
  showNotice();if(route==='admin'&&isAdmin&&!reportScheduled){reportScheduled=true;requestAnimationFrame(()=>{reportScheduled=false;if(live()&&typeof ui!=='undefined'&&ui.route==='admin')void loadReport();});}
 }
 function reset(){
  epoch++;owner=null;known=false;enabled=false;isAdmin=false;session=null;queue=[];sending=false;failures=0;nextRetry=0;activeMs=0;lastPage='';pending=null;locationInfo={route:'dashboard',resource:''};lastTick=lastInput=performance.now();reportEpoch++;reportData=null;
  document.getElementById('activity-notice')?.remove();if(dialog){dialog.close();dialog.remove();dialog=null;}
  for(const id of ['master-activity-admin','master-profile-admin']){const b=document.getElementById(id);if(b)b.hidden=true;}
  if(typeof ui!=='undefined'&&ui.route==='admin')document.getElementById('main-content')?.replaceChildren();
 }
 async function start(){
  reset();owner=uid();if(!owner||typeof client()?.rpc!=='function'){owner=null;return;}
  const mine=epoch,id=owner;
  const results=await Promise.allSettled([client().from('master_activity_preferences').select('enabled,notice_version').eq('user_id',id).maybeSingle(),client().rpc('master_activity_is_admin')]);
  if(!live(mine,id))return;
  const pref=results[0].status==='fulfilled'?results[0].value:null,admin=results[1].status==='fulfilled'?results[1].value:null;
  known=!!pref&&!pref.error&&pref.data?.notice_version===VERSION;enabled=known&&pref.data.enabled===true;isAdmin=!!admin&&!admin.error&&admin.data===true;
  for(const bid of ['master-activity-admin','master-profile-admin']){const b=document.getElementById(bid);if(b)b.hidden=!isAdmin;}
  session=uuid();lastTick=lastInput=performance.now();
  restoreContext();track('session_start');afterRender();if(typeof ui!=='undefined'&&ui.route==='admin')render();
 }
 function showNotice(){
  if(!owner||known||!live()||document.documentElement.classList.contains('master-auth-locked'))return;
  const main=document.getElementById('main-content');if(!main||document.getElementById('activity-notice'))return;
  const box=document.createElement('section');box.id='activity-notice';box.className='card pad activity-notice';box.setAttribute('aria-labelledby','activity-notice-title');
  box.innerHTML='<h2 id="activity-notice-title">Registro de atividades: você escolhe</h2><p>Com sua permissão, o Estudo Master registra aulas acessadas, respostas e resultados, uso das ferramentas e tempo estimado de atividade. Lucas Lessa, responsável pela plataforma, poderá consultar esses registros para acompanhar o uso e melhorar o estudo. Histórico por até 90 dias, com limpeza diária.</p><p>Não gravamos texto digitado, buscas, anotações ou conversas do assistente neste histórico. Recusar não impede estudar. Você pode mudar sua escolha em Perfil → Privacidade e atividade. O progresso de estudo continua sincronizado separadamente.</p><div class="btn-row"><button type="button" class="btn primary" data-activity-choice="yes">Permitir registro</button><button type="button" class="btn" data-activity-choice="no">Continuar sem registro</button></div><p class="subtle" data-activity-message role="status"></p>';
  const intro=main.querySelector('.ed-dashboard-intro');if(intro)intro.after(box);else main.prepend(box);
  box.addEventListener('click',e=>{const b=e.target.closest('[data-activity-choice]');if(b)void choose(b.dataset.activityChoice==='yes',box);});
 }
 async function choose(value,box=dialog){
  if(!live()||!box)return;const mine=epoch,id=owner,buttons=[...box.querySelectorAll('button')],message=box.querySelector('[data-activity-message]');buttons.forEach(b=>b.disabled=true);
  if(message)message.textContent='Salvando sua escolha…';
  // Stop immediately on opt-out, including an in-flight batch (server checks preference on receipt).
  if(!value){enabled=false;queue=[];activeMs=0;}
  try{
   const {error}=await client().from('master_activity_preferences').upsert({user_id:id,enabled:value,notice_version:VERSION,updated_at:new Date().toISOString()},{onConflict:'user_id'});
   if(!live(mine,id))return;if(error)throw error;
   known=true;enabled=value;lastTick=lastInput=performance.now();document.getElementById('activity-notice')?.remove();
   if(value){session=session||uuid();lastPage='';restoreContext();track('session_start');afterRender();void flush();}
   if(dialog?.open){dialog.querySelector('[data-activity-state]').textContent=value?'Registro de atividades permitido.':'Registro de atividades desativado.';if(message)message.textContent='Preferência salva. Desativar interrompe novos registros; o histórico anterior segue a retenção informada.';}
  }catch{if(live(mine,id)&&message)message.textContent='Não foi possível salvar. O registro permanece desativado neste dispositivo. Tente novamente.';enabled=false;queue=[];}
  finally{if(live(mine,id))buttons.forEach(b=>b.disabled=false);}
 }
 function privacy(){
  if(!uid())return;
  if(!dialog){dialog=document.createElement('dialog');dialog.className='activity-privacy';dialog.setAttribute('aria-labelledby','activity-privacy-title');dialog.innerHTML='<h2 id="activity-privacy-title">Privacidade e atividade</h2><p data-activity-state></p><p>O registro opcional informa ao responsável Lucas Lessa quais áreas você usa, resultados de exercícios e uma estimativa de tempo ativo. O acesso é restrito à administração. Histórico por até 90 dias, com limpeza diária. Não inclui texto digitado, buscas, anotações, conversas ou gravação da tela.</p><p>Desativar não apaga seu progresso de estudo. Para solicitar acesso ou exclusão dos seus dados, contate Lucas Lessa pelo canal de suporte da plataforma. A exclusão da conta remove também os eventos vinculados.</p><div class="btn-row"><button type="button" class="btn primary" data-activity-choice="yes">Permitir registro</button><button type="button" class="btn" data-activity-choice="no">Desativar registro</button></div><p data-activity-message role="status"></p><form method="dialog"><button class="btn" autofocus>Fechar</button></form>';document.body.appendChild(dialog);dialog.addEventListener('click',e=>{const b=e.target.closest('[data-activity-choice]');if(b)void choose(b.dataset.activityChoice==='yes',dialog);});}
  dialog.querySelector('[data-activity-state]').textContent=!known?'Você ainda não escolheu. Nenhuma atividade está sendo registrada.':enabled?'Registro de atividades permitido.':'Registro de atividades desativado.';dialog.querySelector('[data-activity-message]').textContent='';dialog.showModal();
 }
 const names={session_start:'Sessão iniciada',page_view:'Área acessada',lesson_open:'Aula aberta',lesson_complete:'Aula concluída',question_answer:'Questão respondida',case_open:'Caso aberto',case_complete:'Caso concluído',exam_start:'Simulado iniciado',exam_complete:'Simulado entregue',flashcard_review:'Flashcard revisado',assistant_open:'Assistente aberto',assistant_request:'Solicitação ao assistente',assistant_result:'Resultado do assistente',pomodoro_start:'Pomodoro iniciado',pomodoro_pause:'Pomodoro pausado',active_time:'Atividade estimada',client_error:'Erro no aplicativo'};
 const date=s=>s?new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(new Date(s)):'—';
 const minutes=n=>Math.round((Number(n)||0)/60000)+' min';
 function page(){
  if(!isAdmin)return '<section class="card pad"><h1 class="page-title">Administração</h1><p>Acesso restrito à conta proprietária. A permissão é verificada no servidor.</p></section>';
  return '<section class="activity-admin"><h1 class="page-title">Atividade da plataforma</h1><p>Histórico iniciado após a autorização de cada usuário. Tempo estimado por aba visível, em foco e com interação recente; não comprova leitura ou aprendizado. Atualize para consultar os registros recebidos.</p><form id="activity-filters" class="activity-filters"><label>Período<select name="days"><option value="7">Últimos 7 dias</option><option value="30">Últimos 30 dias</option><option value="90">Últimos 90 dias</option></select></label><label>Usuário<select name="user"><option value="">Todos os usuários</option></select></label><button class="btn primary" type="submit">Atualizar relatório</button></form><p id="activity-report-status" role="status">Carregando relatório…</p><div id="activity-report"></div><button id="activity-more" class="btn" type="button" hidden>Carregar mais eventos</button></section>';
 }
 async function loadReport(more=false){
  if(!isAdmin||!live())return;
  const form=document.getElementById('activity-filters'),box=document.getElementById('activity-report'),status=document.getElementById('activity-report-status'),moreButton=document.getElementById('activity-more');if(!form||!box)return;
  if(!form.dataset.bound){form.dataset.bound='1';form.addEventListener('submit',e=>{e.preventDefault();void loadReport();});moreButton.addEventListener('click',()=>void loadReport(true));}
  const days=Math.min(90,Math.max(1,Number(form.elements.days.value)||7)),user=form.elements.user.value||null;
  const filter=more&&reportFilter?reportFilter:{p_start:new Date(Date.now()-days*864e5).toISOString(),p_end:new Date(Date.now()+1000).toISOString(),p_user:user};
  const last=more?reportData?.timeline?.at(-1):null,request=++reportEpoch,mine=epoch,id=owner;form.querySelector('button').disabled=true;moreButton.disabled=true;status.textContent='Consultando registros…';
  try{
   const {data,error}=await client().rpc('master_activity_report',{...filter,p_before:last?.happened_at||null,p_before_id:last?.id||null});
   if(!live(mine,id)||request!==reportEpoch||!box.isConnected)return;if(error||!data||!Array.isArray(data.timeline))throw error||new Error('report');
   reportFilter=filter;reportData=more?{...data,timeline:[...(reportData?.timeline||[]),...data.timeline]}:data;
   const selected=form.elements.user.value;form.elements.user.innerHTML='<option value="">Todos os usuários</option>'+data.users.map(u=>`<option value="${esc(u.user_id)}">${esc(u.name)} · ${esc(u.email)}</option>`).join('');form.elements.user.value=selected;
   drawReport(box,reportData);moreButton.hidden=!data.has_more;status.textContent='Atualizado em '+date(new Date().toISOString())+'. Dados de uso enviados pelo navegador; não é um registro de auditoria inviolável.';
  }catch{if(live(mine,id)&&request===reportEpoch&&box.isConnected){box.replaceChildren();moreButton.hidden=true;status.textContent='Não foi possível carregar o relatório. Confira sua conexão e sua permissão administrativa e tente novamente.';}}
  finally{if(live(mine,id)&&request===reportEpoch){form.querySelector('button').disabled=false;moreButton.disabled=false;}}
 }
 const areas={dashboard:'Início',topic:'Clínica Médica P2',topics:'Matérias P2',p1:'Matérias P1',p1topic:'Clínica Médica P1',cirtopic:'Aula de Cirurgia',cir:'Cirurgia',cirp1:'Cirurgia P1',cirp2:'Cirurgia P2',pocus:'POCUS',rad:'Radiologia',ecg:'ECG',hemo:'Hemograma',atb:'Antimicrobianos',labmaster:'Laboratório Master',labrenal:'Rim, eletrólitos e gasometria',labferro:'Interpretação do hemograma',micro:'Antimicrobianos e culturas',labmicrocitose:'Laboratório de microcitose',practice:'Exercícios P2',p1practice:'Exercícios P1',cirpractice:'Exercícios de Cirurgia',cases:'Casos clínicos',oral:'Prática oral',exam:'Simulado P2',p1exam:'Simulado P1',cirexam:'Simulado de Cirurgia',flashcards:'Flashcards',notes:'Caderno',today:'Plano do dia',decisionlab:'Decision Lab'};
 function reference(route,resource=''){
  const parts=String(resource).split(':'),base=areas[route]||route;
  let topic=null,chapter;
  if(route==='topic'&&typeof TOPICS!=='undefined'){topic=TOPICS.find(t=>t.id===parts[0]);chapter=parts[1];}
  else if(route==='p1topic'&&Array.isArray(window.P1?.topics)){topic=P1.topics.find(t=>t.id===parts[1]);chapter=parts[2];}
  else if(route==='cirtopic'&&Array.isArray(window.CIR?.topics)){topic=CIR.topics.find(t=>t.id===parts[1]);chapter=parts[2];}
  if(topic)return base+' · '+topic.title+(/^\d+$/.test(chapter||'')?' · Aula '+(Number(chapter)+1):'');
  if(/^m\d+$/.test(parts[1]||''))return base+' · Módulo '+parts[1].slice(1)+(parts[2]!==undefined?' · Questão '+(Number(parts[2])+1):'');
  return base+(resource?' · '+resource:'');
 }
 function drawReport(box,data){
  const s=data.summary||{},rows=data.timeline||[],users=data.users||[];
  box.innerHTML=`<div class="activity-stats">${[['Usuários ativos',s.active_users||0],['Acessos a áreas',s.views||0],['Tempo ativo estimado',minutes(s.active_ms)],['Tentativas de questões',s.answers||0],['Acertos',s.answers?Math.round(s.correct/s.answers*100)+'%':'Sem respostas']].map(([k,v])=>`<article class="card pad"><span>${esc(k)}</span><strong>${esc(v)}</strong></article>`).join('')}</div><section class="card pad"><h2>Usuários</h2><p>Até 200 contas, priorizando atividade recente. ${Number(data.total_users)||0} contas cadastradas. Sem registros pode significar recusa, ausência de uso ou falha de envio.</p><div class="activity-table-wrap"><table><caption>Atividade por usuário no período selecionado</caption><thead><tr><th>Usuário</th><th>Registro opcional</th><th>Último login</th><th>Última atividade</th><th>Tempo estimado</th><th>Acertos/tentativas</th></tr></thead><tbody>${users.map(u=>`<tr><td><button class="activity-user" type="button" data-activity-user="${esc(u.user_id)}">${esc(u.name)}</button><small>${esc(u.email)}</small></td><td>${u.tracking_enabled?'Permitido':'Não permitido'}</td><td>${date(u.last_sign_in_at)}</td><td>${date(u.last_activity)}</td><td>${minutes(u.active_ms)}</td><td>${Number(u.correct)||0}/${Number(u.answers)||0}</td></tr>`).join('')||'<tr><td colspan="6">Nenhum usuário encontrado.</td></tr>'}</tbody></table></div></section><section class="card pad"><h2>Conteúdos mais usados</h2><ol class="activity-resources">${(data.resources||[]).map(r=>`<li><b>${esc(reference(r.route,r.resource))}</b><span>${Number(r.visits)||0} acessos · ${minutes(r.active_ms)}</span></li>`).join('')||'<li>Sem atividade registrada neste período.</li>'}</ol></section><section class="card pad"><h2>Histórico de atividades</h2><ol class="activity-timeline">${rows.map(r=>`<li><time datetime="${esc(r.happened_at)}">${date(r.happened_at)}</time><div><strong>${esc(names[r.kind]||'Atividade')}</strong><p>${esc(r.name)} · ${esc(r.email)}</p><small>${esc(reference(r.route,r.resource))}${r.kind==='active_time'?' · '+Math.round(r.duration_ms/1000)+' s estimados':''}${r.kind==='question_answer'?(r.correct?' · acerto':' · erro'):''}${r.code?' · '+esc(r.code):''}</small></div></li>`).join('')||'<li>Nenhuma atividade registrada neste período.</li>'}</ol></section>`;
  box.onclick=e=>{const b=e.target.closest('[data-activity-user]');if(!b)return;const form=document.getElementById('activity-filters');form.elements.user.value=b.dataset.activityUser;void loadReport();};
 }
 function init(){
  for(const id of ['master-activity-privacy','master-profile-privacy'])document.getElementById(id)?.addEventListener('click',privacy);
  for(const id of ['master-activity-admin','master-profile-admin'])document.getElementById(id)?.addEventListener('click',()=>{document.getElementById('master-profile')?.setAttribute('hidden','');document.getElementById('master-avatar')?.setAttribute('aria-expanded','false');navigate('admin');});
  for(const type of ['pointerdown','keydown','scroll'])window.addEventListener(type,e=>{if(e.isTrusted)lastInput=performance.now();},{passive:true});
  document.addEventListener('visibilitychange',()=>{tick();commitTime();void flush();lastTick=performance.now();});
  window.addEventListener('pagehide',()=>{tick();commitTime();void flush();});
  window.addEventListener('online',()=>{nextRetry=0;void flush();});
  window.addEventListener('error',()=>{if(Date.now()-lastError<60000)return;lastError=Date.now();track('client_error','',{code:'script'});});
  setInterval(tick,5000);setInterval(()=>void flush(),15000);

 }
 window.addEventListener('master-auth-ready',()=>void start());window.addEventListener('master-auth-ended',reset);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
 return {track,setContext,afterRender,privacy,page,flush,interaction:()=>{lastInput=performance.now();}};
})();
