/* Central de Simulados. Persiste exclusivamente no payload P2 existente por conta. */
'use strict';
window.ExamCenter=(()=>{
 const esc=value=>escapeHtml(value), arg=value=>esc(JSON.stringify(String(value))), engine=()=>window.ExamEngine;
 let timer=null, message='',lastTimerSave=0;
 const defaults=()=>({module:'P2',topics:[],subtopics:[],count:20,levels:{1:10,2:45,3:45},kind:'balanced',mode:'exam',includePending:false,topicCounts:{},minutes:90});
 function state(){
  store.examCenter=store.examCenter||{};const s=store.examCenter;
  s.history=s.history||[];s.attempts=s.attempts||{};s.review=s.review||{};s.config=s.config||defaults();return s;
 }
 const bank=()=>engine().bank();
 const active=()=>state().active;
 const title=id=>[...TOPICS,...(window.MASTER_P1_DATA?.topics||[])].find(t=>t.id===id)?.title||id;
 const fmt=ms=>{const sec=Math.max(0,Math.ceil(ms/1000));return String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0')};
 function save(){stateSave();}
 function redraw(){render();}
 function authenticated(){return !document.documentElement.classList.contains('master-auth-locked')&&!!window.MASTER_AUTH?.user();}
 function timeNow(){const a=active();if(!a||a.done)return;engine().tick(a,Date.now());}
 function recordTime(){const a=active();if(!a||a.done||a.paused)return;const id=a.questionIds[a.step],now=Date.now();a.times=a.times||{};a.times[id]=(a.times[id]||0)+Math.max(0,now-(a.questionStartedAt||now));a.questionStartedAt=now;}
 function stopTimer(){clearInterval(timer);timer=null;}
 function ensureTimer(){
  if(timer)return;
  timer=setInterval(()=>{
   if(!authenticated())return;
   const a=active();if(!a||a.done){stopTimer();return;}if(a.paused)return;
   timeNow();if(Date.now()-lastTimerSave>=10000){save();lastTimerSave=Date.now();}
   if(a.remainingMs!==null&&a.remainingMs<=0&&!a.paused){finish(true);return;}
   const el=document.getElementById('central-clock');if(el)el.textContent=a.remainingMs===null?'Sem limite':fmt(a.remainingMs);
  },1000);
 }
 function setConfig(name,value){
  const c=state().config;
  if(name==='module'){c.module=value;c.topics=[];c.subtopics=[];c.topicCounts={};}
  else if(name==='count')c.count=Math.min(120,Math.max(1,Math.floor(Number(value)||1)));
  else if(name==='minutes')c.minutes=Math.min(600,Math.max(0,Number(value)||0));
  else c[name]=value;
  if(c.mode==='exam')c.includePending=false;
  message='';save();redraw();
 }
 function topic(id,on){const c=state().config;c.topics=on?[...new Set([...c.topics,id])]:c.topics.filter(x=>x!==id);c.subtopics=[];save();redraw();}
 function subtopic(id,on){const c=state().config;c.subtopics=on?[...new Set([...c.subtopics,id])]:c.subtopics.filter(x=>x!==id);save();redraw();}
 function level(id,value){state().config.levels[id]=Math.max(0,Number(value)||0);save();redraw();}
 function quota(id,value){const c=state().config;if(value==='')delete c.topicCounts[id];else c.topicCounts[id]=Math.max(0,Math.floor(Number(value)||0));save();redraw();}
 function preset(value){
  const c=state().config;
  c.topics=[];c.subtopics=[];c.topicCounts={};c.kind='balanced';
  if(['P1','P2','all'].includes(value))c.module=value;
  else if(['random','errors','banca','due'].includes(value)){c.kind=value;c.module='all';}
  save();redraw();
 }
 function preview(){try{return engine().select(state().config.kind==='due'?bank().filter(q=>state().review[q.id]?.dueAt&&state().review[q.id].dueAt<=new Date().toISOString()):bank(),state().config,state().attempts)}catch(e){return {items:[],warnings:[e.message],available:0}}}
 function configure(){
  const s=state(),c=s.config,b=bank(),p=preview();
  const topics=[...new Set(b.filter(q=>c.module==='all'||q.module===c.module).map(q=>q.t))];
  const subs=[...new Set(b.filter(q=>(c.module==='all'||q.module===c.module)&&(!c.topics.length||c.topics.includes(q.t))).map(q=>q.subtopic).filter(Boolean))];
  return `<div class="hero"><div class="page-eyebrow">TREINAMENTO AUTORAL · FMP 2026.2</div><h1 class="page-title">Central de <em>Simulados</em></h1><p>Configure sua sessão, responda sem consultar e transforme os erros em revisões. Nenhuma pontuação prevê sua nota oficial.</p></div>
  <div class="central-notice">O programa prevê avaliação escrita cumulativa com perguntas abertas e/ou fechadas e discussão prático-oral. Na composição da P2, a escrita tem peso 3 e a APO peso 4 (de 10). Esta central treina questões objetivas; combine com <a href="docs/plano-de-ensino.html">o plano de ensino</a> e os outros formatos.</div><div class="btn-row"><button class="btn" onclick="navigate('discursive')">Treinar discursivas</button><button class="btn" onclick="navigate('oral')">Treinar prova oral</button><button class="btn" onclick="navigate('pocus')">Prática / POCUS</button></div>
  ${message?`<p role="status" class="central-notice">${esc(message)}</p>`:''}
  <section class="card pad central-config" aria-labelledby="central-config-title"><h2 id="central-config-title">Monte seu simulado</h2>
   <div class="central-presets" aria-label="Configurações rápidas">${[['P2','Completo P2'],['P1','Completo P1'],['all','Integrado P1 + P2'],['random','Aleatório'],['errors','Meus erros'],['due','Revisões devidas'],['banca','Estilo banca']].map(([v,l])=>`<button class="btn" type="button" onclick="ExamCenter.preset('${v}')">${l}</button>`).join('')}</div>
   ${c.kind==='banca'?'<p class="central-notice">Seleção por competências documentadas no repositório. Questões autorais, sem alegação de frequência histórica ou reprodução de prova oficial.</p>':''}
   <div class="central-form-grid"><label>Módulo<select onchange="ExamCenter.setConfig('module',this.value)">${[['P2','P2 prioritária'],['P1','P1 cumulativa'],['all','P1 + P2']].map(([v,l])=>`<option value="${v}" ${c.module===v?'selected':''}>${l}</option>`).join('')}</select></label>
    <label>Quantidade sugerida<select onchange="ExamCenter.setConfig('count',this.value)">${[10,20,30,40,50,60,80,100,120].map(n=>`<option value="${n}" ${c.count===n?'selected':''}>${n}</option>`).join('')}<option value="${c.count}" ${![10,20,30,40,50,60,80,100,120].includes(c.count)?'selected':''}>Personalizada</option></select></label>
    <label>Quantidade personalizada<input type="number" min="1" max="120" value="${esc(c.count)}" onchange="ExamCenter.setConfig('count',this.value)"></label>
    <label>Modalidade<select onchange="ExamCenter.setConfig('mode',this.value)"><option value="exam" ${c.mode==='exam'?'selected':''}>Prova · correção ao final</option><option value="train" ${c.mode==='train'?'selected':''}>Treino · feedback imediato</option></select></label>
    <label>Tempo total em minutos (0 = sem limite)<input type="number" min="0" max="600" value="${esc(c.minutes)}" onchange="ExamCenter.setConfig('minutes',this.value)"></label></div>
   <fieldset class="central-fieldset"><legend>Temas · nenhum marcado inclui todos do módulo</legend><div class="central-topic-grid">${topics.map(id=>`<label><input type="checkbox" ${c.topics.includes(id)?'checked':''} onchange="ExamCenter.topic('${esc(id)}',this.checked)"> ${esc(title(id))}</label>`).join('')}</div></fieldset>
   <details class="central-details"><summary>Filtrar subtemas e quantidades por tema</summary><fieldset class="central-fieldset"><legend>Subtemas · nenhum marcado inclui todos</legend><div class="central-topic-grid">${subs.map(id=>`<label><input type="checkbox" ${c.subtopics.includes(id)?'checked':''} onchange="ExamCenter.subtopic(${arg(id)},this.checked)"> ${esc(id)}</label>`).join('')}</div></fieldset><p class="subtle">Cotas opcionais por tema; mantenha vazio para distribuição automática. Se faltarem itens, o sistema informa a limitação e nunca duplica perguntas.</p><div class="central-form-grid">${topics.filter(id=>!c.topics.length||c.topics.includes(id)).map(id=>`<label>${esc(title(id))}<input aria-label="Quantidade em ${esc(title(id))}" type="number" min="0" max="120" placeholder="Automática" value="${esc(c.topicCounts[id]??'')}" onchange="ExamCenter.quota('${esc(id)}',this.value)"></label>`).join('')}</div></details>
   <fieldset class="central-fieldset"><legend>Distribuição cognitiva · pesos relativos</legend><div class="central-form-grid">${[1,2,3].map(n=>`<label>N${n}<input type="number" min="0" max="100" value="${esc(c.levels[n])}" onchange="ExamCenter.level(${n},this.value)"></label>`).join('')}</div><p class="subtle">Padrão 10 / 45 / 45. A disponibilidade pode exigir redistribuição, indicada antes de começar.</p></fieldset>
   ${c.mode==='train'?`<label class="central-legacy"><input type="checkbox" ${c.includePending?'checked':''} onchange="ExamCenter.setConfig('includePending',this.checked)"> Incluir acervo legado pendente de nova revisão editorial — somente treino, sem certificação de validação clínica</label>`:''}
   <div class="central-preview" aria-live="polite"><strong>${p.items.length} questões distintas selecionadas</strong><p>${p.available??p.items.length} disponíveis com os filtros atuais. Seleção sem repetição dentro da sessão.</p>${(p.warnings||[]).map(w=>`<p>${esc(w)}</p>`).join('')}</div>
   <button class="btn primary" type="button" ${!p.items.length?'disabled':''} onclick="ExamCenter.start()">Iniciar ${c.mode==='train'?'treino':'simulado'} →</button>
  </section>${statistics()}${history()}`;
 }
 function start(){
  const s=state(),c=JSON.parse(JSON.stringify(s.config)),p=preview();
  if(!p.items.length){message='Nenhuma questão elegível. Ajuste os filtros.';redraw();return;}
  s.active=engine().create(p.items,c);Object.assign(s.active,{config:c,confirmed:{},times:{},questionStartedAt:Date.now()});
  message='';save();ensureTimer();redraw();
 }
 function qNow(){const a=active();return a?.questionSnapshots[a.step];}
 function answer(index){const a=active(),q=qNow();if(!a||a.done||a.paused||a.confirmed?.[q.id])return;if(!Number.isInteger(index)||index<0||index>=q.o.length)return;recordTime();a.answers[q.id]=index;save();redraw();}
 function go(index){const a=active();if(!a||a.done||a.paused||index<0||index>=a.questionIds.length)return;recordTime();a.step=index;a.questionStartedAt=Date.now();save();redraw();}
 function flag(){const a=active(),q=qNow();if(!a||a.done||a.paused)return;a.flags[q.id]=!a.flags[q.id];save();redraw();}
 function confirmAnswer(){const a=active(),q=qNow();if(!a||a.paused||a.done||a.config.mode!=='train'||a.answers[q.id]===undefined)return;recordTime();a.confirmed[q.id]=true;save();redraw();}
 function pause(){const a=active();if(!a||a.done)return;recordTime();timeNow();a.paused=!a.paused;a.lastTick=Date.now();a.questionStartedAt=Date.now();save();redraw();}
 function leave(){recordTime();const a=active();if(a&&!a.done){timeNow();a.paused=true;a.lastTick=Date.now();save();}navigate('dashboard');}
 function finish(automatic=false){
  const s=state(),a=s.active;if(!a||a.done)return;
  if(!automatic&&!confirm(`Entregar ${a.questionIds.length} questões? ${a.questionIds.filter(id=>a.answers[id]===undefined).length} estão em branco. A correção ficará disponível após a entrega.`))return;
  recordTime();timeNow();const result=engine().finish(a,Date.now());
  a.result=result;stopTimer();if(!s.history.some(h=>h.id===result.id))s.history.push(result);
  for(const item of result.items){
   if(item.answer===undefined||item.answer===null)continue;
   const old=s.attempts[item.id]||{},elapsedMs=a.times?.[item.id]||0;
   s.attempts[item.id]={correct:item.correct,answer:item.answer,at:result.date,attempts:(old.attempts||0)+1,elapsedMs,history:[...(old.history||[]),{correct:item.correct,at:result.date,elapsedMs}]};
   if(!item.correct)s.review[item.id]={status:'review',dueAt:new Date(Date.now()+864e5).toISOString()};
  }
  save();redraw();
 }
 function review(id,status){const s=state();if(!['mastered','learning','review'].includes(status))return;const days={review:1,learning:3,mastered:7}[status];s.review[id]={status,dueAt:new Date(Date.now()+days*864e5).toISOString()};save();redraw();}
 function feedback(q,answer){
  const t=q.teaching||{},correct=answer===q.a,reviewState=state().review[q.id]?.status;
  const paragraphs=value=>(Array.isArray(value)?value:[value]).filter(Boolean).map(p=>`<p>${esc(p)}</p>`).join('');
  return `<section class="central-feedback ${correct?'':'central-feedback-error'}" aria-label="Correção comentada"><h2>${correct?'Resposta correta':'Revisão do raciocínio'}</h2><p><strong>Melhor resposta:</strong> ${esc(q.o[q.a])}</p>${paragraphs(q.why)}
   ${t.reasoning?`<details open><summary>Raciocínio clínico</summary>${paragraphs(t.reasoning)}</details>`:''}
   <details><summary>Análise das alternativas</summary>${q.o.map((option,i)=>`<div class="central-alt"><strong>${String.fromCharCode(65+i)}. ${esc(option)}</strong>${paragraphs(t.alternatives?.[i]||'Comentário individual ainda não disponível neste item legado. Consulte a explicação geral e a fonte antes de incorporar a conduta.')}</div>`).join('')}</details>
   ${t.pitfall?`<details><summary>Armadilha e dado discriminador</summary>${paragraphs(t.pitfall)}</details>`:''}
   ${t.takeaways?`<details><summary>Conceitos para memorizar</summary>${paragraphs(t.takeaways)}</details>`:''}
   ${t.pharmacology?`<details><summary>Condutas e farmacologia</summary>${paragraphs(t.pharmacology)}</details>`:''}
   <details><summary>Referências e revisão editorial</summary><p>Questão autoral · ${q.status==='released'?'revisão editorial registrada; não equivale a homologação oficial':'pendente de nova revisão editorial'}${q.reviewedAt?' · '+esc(q.reviewedAt):''}.</p><p>${esc(q.reviewType||'Sem revisão clínica individual registrada nesta entrega.')}</p>${(q.references||[]).filter(r=>/^https:\/\//.test(r.url||'')).map(r=>`<p><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title||r.url)}</a>${r.year?' · '+esc(r.year):''}</p>`).join('')||'<p>Fonte individual ainda não catalogada.</p>'}</details>
   <fieldset class="central-fieldset"><legend>Próxima revisão</legend><div class="btn-row">${[['review','Rever · 1 dia'],['learning','Aprendendo · 3 dias'],['mastered','Dominada · 7 dias']].map(([id,label])=>`<button type="button" class="btn" aria-pressed="${reviewState===id}" onclick="ExamCenter.review('${esc(q.id)}','${id}')">${label}</button>`).join('')}</div><p class="subtle">Intervalos iniciais heurísticos, sem previsão de nota ou certificação de competência.</p></fieldset>
   <div class="btn-row"><button class="btn" onclick="${q.module==='P1'?`P1.openTopic('${esc(q.t)}')`:`openTopic('${esc(q.t)}')`}">Revisar aula relacionada</button><button class="btn" onclick="navigate('notes')">Abrir meu caderno</button></div></section>`;
 }
 function session(){
  const a=active(),q=qNow();if(!q)return '<p role="alert">Sessão indisponível. Reconfigure a seleção.</p>';
  if(a.done)return results();ensureTimer();
  const count=a.questionIds.length,answered=Object.keys(a.answers).length,shown=a.config.mode==='train'&&a.confirmed?.[q.id];
  if(a.paused)return `<div class="hero"><h1 class="page-title">Simulado <em>pausado</em></h1><p>Seu andamento foi salvo na conta. O cronômetro está parado.</p></div><div class="card pad"><p>${answered}/${count} respondidas · ${a.remainingMs===null?'sem limite de tempo':fmt(a.remainingMs)+' restantes'}</p><button class="btn primary" onclick="ExamCenter.pause()">Retomar sessão</button><button class="btn" onclick="ExamCenter.leave()">Voltar ao início</button></div>`;
  return `<div class="hero"><div class="page-eyebrow">${a.config.mode==='train'?'TREINO COM FEEDBACK':'PROVA · CORREÇÃO APÓS ENTREGA'}</div><h1 class="page-title">Questão <em>${a.step+1} de ${count}</em></h1></div>
   <section class="card pad central-session"><div class="central-session-head"><span>${answered}/${count} respondidas · ${Object.values(a.flags).filter(Boolean).length} marcadas</span><span id="central-clock" role="timer" aria-live="off">${a.remainingMs===null?'Sem limite':fmt(a.remainingMs)}</span><button class="btn" onclick="ExamCenter.pause()">Pausar</button></div>
   <nav class="central-question-nav" aria-label="Questões respondidas, pendentes e marcadas">${a.questionIds.map((id,i)=>`<button type="button" class="${a.answers[id]!==undefined?'answered ':''}${a.flags[id]?'flagged ':''}" aria-current="${a.step===i?'step':'false'}" aria-label="Questão ${i+1}, ${a.answers[id]!==undefined?'respondida':'pendente'}${a.flags[id]?', marcada para revisão':''}" onclick="ExamCenter.go(${i})">${i+1}${a.flags[id]?' ★':''}</button>`).join('')}</nav>
   ${q.status!=='released'?'<p class="central-notice" role="note">Acervo legado: este item ainda não passou pela nova revisão editorial. Disponível apenas em treino.</p>':''}
   <p class="subtle">${esc(q.module)} · ${esc(title(q.t))} · ${esc(q.subtopic||q.tag||'')} · N${esc(q.level)} · questão autoral</p><p class="question-stem">${esc(q.q)}</p>
   <div class="option-list">${(a.optionOrders[q.id]||q.o.map((_,i)=>i)).map((index,position)=>`<button type="button" class="option-btn ${a.answers[q.id]===index?'selected':''} ${shown&&index===q.a?'correct':''} ${shown&&a.answers[q.id]===index&&index!==q.a?'incorrect':''}" ${shown?'disabled':''} aria-pressed="${a.answers[q.id]===index}" onclick="ExamCenter.answer(${index})"><span class="option-letter">${String.fromCharCode(65+position)}</span>${esc(q.o[index])}</button>`).join('')}</div>
   ${a.config.mode==='train'&&!shown?`<button class="btn primary" ${a.answers[q.id]===undefined?'disabled':''} onclick="ExamCenter.confirmAnswer()">Conferir resposta</button>`:''}
   ${shown?feedback(q,a.answers[q.id]):''}
   <div class="module-actions"><button class="btn" ${a.step===0?'disabled':''} onclick="ExamCenter.go(${a.step-1})">← Anterior</button><button class="btn" aria-pressed="${!!a.flags[q.id]}" onclick="ExamCenter.flag()">${a.flags[q.id]?'★ Marcada':'☆ Marcar para revisar'}</button>${a.step<count-1?`<button class="btn primary" onclick="ExamCenter.go(${a.step+1})">Próxima →</button>`:''}<button class="btn" onclick="ExamCenter.finish()">Entregar sessão</button><button class="btn ghost" onclick="ExamCenter.leave()">Salvar e sair</button></div></section>`;
 }
 function results(){const a=active(),r=a.result;if(!r)return '<p>Resultado indisponível.</p>';return `<div class="hero"><div class="page-eyebrow">SESSÃO CONCLUÍDA · RESULTADO REAL</div><h1 class="page-title">${r.score} de ${r.total} <em>respostas corretas</em></h1><p>${r.percent}% de acerto · ${fmt(r.elapsedMs)} de tempo ativo. Revise os erros e tente casos diferentes antes de concluir que domina o assunto.</p></div><button class="btn primary" onclick="ExamCenter.newSession()">Configurar outra sessão</button>${statistics()}<section class="section-spaced"><h2>Correção comentada</h2>${a.questionSnapshots.map((q,i)=>`<details class="card pad central-result-item"><summary>${i+1}. ${a.answers[q.id]===q.a?'✓ Acertou':'↻ Revisar'} · ${esc(title(q.t))}</summary><p class="question-stem">${esc(q.q)}</p><p><strong>Sua resposta:</strong> ${a.answers[q.id]===undefined?'Em branco':esc(q.o[a.answers[q.id]])}</p>${feedback(q,a.answers[q.id])}</details>`).join('')}</section>`;}
 function newSession(){const a=active();if(a&&!a.done)return;state().active=null;save();redraw();}
 function history(){const list=state().history;return `<section class="card pad section-spaced"><h2>Histórico desta central</h2>${list.length?`<ol class="central-history">${[...list].reverse().map(r=>`<li><strong>${r.score}/${r.total} · ${r.percent}%</strong><span>${esc(new Date(r.date).toLocaleString('pt-BR'))} · ${fmt(r.elapsedMs)} ativos</span></li>`).join('')}</ol>`:'<p>Nenhum simulado finalizado nesta central. O histórico dos simulados anteriores foi preservado na área original.</p>'}</section>`;}
 function statistics(){
  const s=state(),items=s.history.flatMap(r=>r.items||[]),byTopic={},byLevel={},bySub={},times=[];
  for(const i of items){for(const [map,key] of [[byTopic,i.t],[byLevel,'N'+i.level],[bySub,i.subtopic||'Sem subtema']]){map[key]=map[key]||{right:0,total:0};map[key].total++;if(i.correct)map[key].right++;}}
  for(const a of Object.values(s.attempts))for(const h of a.history||[])if(h.elapsedMs>0)times.push(h.elapsedMs);
  const table=(data,label,topicNames=false)=>`<div><h3>${label}</h3>${Object.entries(data).length?`<ul class="central-stats-list">${Object.entries(data).map(([key,v])=>`<li><span>${esc(topicNames?title(key):key)}</span><strong>${v.right}/${v.total} · ${Math.round(v.right/v.total*100)}%</strong></li>`).join('')}</ul>`:'<p>Dados disponíveis após finalizar uma sessão.</p>'}</div>`;
  const improved=Object.values(s.attempts).filter(a=>a.correct&&(a.history||[]).some(h=>!h.correct)).length;
  return `<section class="card pad section-spaced"><h2>Seu desempenho nesta central</h2><p>Revisões devidas: ${Object.values(s.review).filter(r=>r.dueAt<=new Date().toISOString()).length}. <button class="btn" onclick="ExamCenter.newSession();ExamCenter.preset('errors')">Treinar meus erros</button></p><p>${items.length} exposições a questões · ${s.history.length} sessões · ${improved} itens acertados após erro anterior${times.length?' · média de '+Math.round(times.reduce((a,b)=>a+b,0)/times.length/1000)+' s por resposta registrada':''}.</p><p class="subtle">Resultados antigos não foram convertidos em tentativas fictícias. Repetições contam como exposições, não como questões novas.</p><div class="central-stats-grid">${table(byTopic,'Por tema',true)}${table(byLevel,'Por nível')}<details><summary>Por subtema</summary>${table(bySub,'Subtemas')}</details></div>${s.history.length>1?`<p>Evolução por sessão: ${s.history.map(r=>r.percent+'% ('+r.total+' itens)').join(' → ')}</p>`:''}</section>`;
 }
 function view(){if(!window.ExamEngine)return '<p role="alert">A Central de Simulados ainda não carregou. Atualize a página.</p>';return active()?session():configure();}
 document.addEventListener('visibilitychange',()=>{if(authenticated()&&document.hidden&&active()&&!active().done&&!active().paused){recordTime();timeNow();save();}});
 window.addEventListener('beforeunload',()=>{if(authenticated()&&active()&&!active().done){recordTime();timeNow();save();}});
 window.addEventListener('master-auth-ready',()=>{stopTimer();const a=active();if(a&&!a.done){a.paused=true;a.lastTick=Date.now();a.questionStartedAt=Date.now();save();if(ui.route==='simulados')redraw();}});
 window.addEventListener('master-auth-ended',stopTimer);
 return {view,setConfig,topic,subtopic,level,quota,preset,start,answer,go,flag,confirmAnswer,pause,finish,leave,review,newSession,stopTimer};
})();
