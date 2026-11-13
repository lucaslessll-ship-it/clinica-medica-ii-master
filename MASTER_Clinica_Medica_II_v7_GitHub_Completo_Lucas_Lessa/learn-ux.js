/* Camada de aprendizado: cabecalho unico do tema, painel "Hoje", revisao espacada da evocacao ativa,
   pre-teste clicavel, modo alto rendimento, icones por especialidade e comandos da busca. */
window.LearnUX=(()=>{
  'use strict';
  const LADDER=[1,3,7,14,30];
  let hy=false;const pre={};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pad=n=>String(n).padStart(2,'0');
  const dayKey=(d=new Date())=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
  const addDays=n=>{const d=new Date();d.setDate(d.getDate()+n);return dayKey(d);};
  function data(){
    const s=store.study||(store.study={version:1,since:new Date().toISOString(),reviews:{},steps:{},settings:{intervals:[1,3,7],dailyLimit:20}});
    if(!s.deep||typeof s.deep!=='object')s.deep={recall:{},days:{}};
    s.deep.recall=s.deep.recall||{};s.deep.days=s.deep.days||{};return s.deep;
  }
  function peek(){const d=store.study?.deep;return {recall:d?.recall||{},days:d?.days||{}};}
  const AREAS=[['neuro','neuro'],['reuma','reuma'],['onco','onco'],['hema','hema'],['gastro','gastro'],['p1inf','infecto'],['p1arr','cardio'],['p1has','pressao'],['p1dm','diabetes'],['p1tir','tireoide'],['p1neuro','endocrino'],['p1tele','tele'],['cir','cirurgia']];
  const area=id=>(AREAS.find(([k])=>String(id).startsWith(k))||[,'geral'])[1];
  const ICONS={
    neuro:'M9.5 4A2.5 2.5 0 0 0 7 6.5 3 3 0 0 0 4.5 11 3 3 0 0 0 6 16a3 3 0 0 0 6 1V6.5A2.5 2.5 0 0 0 9.5 4Zm5 0A2.5 2.5 0 0 1 17 6.5 3 3 0 0 1 19.5 11 3 3 0 0 1 18 16a3 3 0 0 1-6 1M8 10.5h1.5M14.5 13H16',
    reuma:'M8 4a2.5 2.5 0 0 0-2.2 3.8A2.5 2.5 0 0 0 8 12l4 4a2.5 2.5 0 0 0 4.2 2.2A2.5 2.5 0 0 0 16 12l-4-4A2.5 2.5 0 0 0 8 4Z',
    onco:'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM7.5 9h.01M16 16h.01',
    hema:'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Zm-2.5 11.5a2.5 2.5 0 0 0 2.5 2.5',
    gastro:'M10 3v4a3 3 0 0 0 3 3h1a4.5 4.5 0 0 1 0 9h-3a5 5 0 0 1-5-5v-1',
    infecto:'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-4v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.9 2.9m7 7 2.9 2.9m0-12.8-2.9 2.9m-7 7-2.9 2.9',
    cardio:'M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11ZM6.5 12H9l1.5-3 2.5 5 1.5-2h3',
    pressao:'M4 17a8 8 0 1 1 16 0M12 17l4-6M12 17h.01',
    diabetes:'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11ZM9.5 14h5M12 11.5v5',
    tireoide:'M12 8v10M12 10C10.5 6 5 6 5 10c0 2.5 2.5 3.5 4.5 3.5C8 14.5 7 16.5 8 18c2 .8 3.5-1 4-3.5m0-4.5c1.5-4 7-4 7 0 0 2.5-2.5 3.5-4.5 3.5 1.5 1 2.5 3 1.5 4.5-2 .8-3.5-1-4-3.5',
    endocrino:'M12 3l7 4v8l-7 4-7-4V7Zm0 5.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
    tele:'M4 6h11a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm12 4.5 5-3v9l-5-3',
    cirurgia:'M5 19 19 5m-4 0 4 4M3 21l4-1-3-3ZM8 8l3 3',
    geral:'M12 6c-3-3-7-3-10-2v15c4-1 7-1 10 2m0-15c3-3 7-3 10-2v15c-4-1-7-1-10 2V6'};
  const icon=id=>`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICONS[area(id)]}"/></svg>`;

  function topicHead(o){
    return `<header class="topic-head" data-area="${area(o.id)}"><span class="topic-head-icon" aria-hidden="true">${icon(o.id)}</span><div class="topic-head-main"><div class="page-eyebrow">${esc(o.eyebrow)}</div><h1 class="page-title">${esc(o.title)}</h1><p class="topic-head-sub">${esc(o.subtitle)}</p><div class="topic-head-meta"><span class="topic-head-stats">${esc(o.stats)}</span>${o.badges.map(b=>`<span class="topic-chip">${esc(b)}</span>`).join('')}</div><div class="topic-head-progress" role="progressbar" aria-label="Aulas concluídas neste tema" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${o.pct}"><span style="width:${o.pct}%"></span></div></div><div class="topic-head-actions">${o.actions||''}</div></header>`;
  }

  function info(key){const r=peek().recall[key];if(!r)return null;const today=dayKey();return {due:r.d<=today,date:r.d,level:r.n};}
  function dueText(key){const i=info(key);if(!i)return '';if(i.due)return 'revisar hoje';const days=Math.round((new Date(i.date+'T12:00')-new Date(dayKey()+'T12:00'))/864e5);return days===1?'revisar amanhã':`revisar em ${days} dias`;}
  function dueList(){const today=dayKey();return Object.entries(peek().recall).filter(([,r])=>r.d<=today).sort((a,b)=>a[1].d<b[1].d?-1:1).map(([k])=>k);}
  function rate(key,v){
    const d=data(),old=d.recall[key],n=v===0?0:v===1?Math.max(1,(old?.n??0)):Math.min(LADDER.length-1,(old?.n??1)+1);
    d.recall[key]={d:addDays(LADDER[n]),n,last:dayKey()};touch(d);stateSave();
  }
  function touch(d){const k=dayKey();d.days[k]=(d.days[k]||0)+1;const keys=Object.keys(d.days).sort();while(keys.length>180)delete d.days[keys.shift()];}
  function activeDays(){
    const set=new Set(Object.keys(peek().days));
    try{Object.entries(window.HIG?.focusData()?.days||{}).forEach(([k,v])=>{if(v&&(v.ms>0||v.completed>0))set.add(k);});}catch(e){}
    return set;
  }
  function streak(){const set=activeDays();let n=0;const d=new Date();if(!set.has(dayKey(d)))d.setDate(d.getDate()-1);while(set.has(dayKey(d))){n++;d.setDate(d.getDate()-1);}return n;}
  function lessonsDone(){const p1=window.P1?P1.getBackup().completed||{}:{};const cir=window.CIR?CIR.completed():{};return Object.values(store.completed||{}).filter(Boolean).length+Object.values(p1).filter(Boolean).length+Object.values(cir).filter(Boolean).length;}
  function todayPanel(){
    const recallDue=dueList().length,cirDue=window.CIR?CIR.dueCount():0,due=recallDue+cirDue,cards=window.HIG?HIG.dueCards():0,s=streak(),set=activeDays(),total=TOPICS.concat(P1.topics,window.CIR?CIR.topics:[]).reduce((n,t)=>n+t.chapters.length,0);
    const week=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);week.push({on:set.has(dayKey(d)),label:d.toLocaleDateString('pt-BR',{weekday:'short'}).slice(0,3),today:i===0});}
    return `<aside class="dash-today" aria-label="Seu estudo hoje"><span class="overview-label">HOJE</span><div class="dash-today-nums"><div><strong>${s}</strong><span>${s===1?'dia seguido':'dias seguidos'}</span></div><div><strong>${due}</strong><span>${due===1?'pergunta para revisar':'perguntas para revisar'}</span></div><div><strong>${lessonsDone()}<small>/${total}</small></strong><span>aulas concluídas</span></div></div><ol class="dash-week" aria-label="Últimos sete dias">${week.map(w=>`<li class="${w.on?'on':''}${w.today?' today':''}"><span aria-hidden="true"></span>${esc(w.label)}<span class="visually-hidden">${w.on?': estudou':': sem registro'}</span></li>`).join('')}</ol>${recallDue?`<button class="btn primary" type="button" onclick="LearnUX.openDue()">Revisar evocação: ${recallDue}</button>`:''}${cirDue?`<button class="btn secondary" type="button" onclick="CIR.startPractice({t:'all',src:'all',mode:'due'})">Revisar Cirurgia: ${cirDue}</button>`:''}${!due?`<p class="dash-today-hint">${cards?cards+' flashcards disponíveis. ':''}Avalie as perguntas de evocação ao fim de cada aula para agendar revisões aqui.</p>`:''}${window.CIR?CIR.planPanel():''}</aside>`;
  }
  function openLesson(key){const cut=key.lastIndexOf('_'),id=key.slice(0,cut),i=Number(key.slice(cut+1));if(id.startsWith('cir')){CIR.openTopic(id,i);}else if(id.startsWith('p1')){navigate('p1');P1.openTopic(id);P1.chapter(i);}else{openTopic(id);switchChapter(i);}}
  function openDue(){
    const key=dueList()[0];if(!key)return;openLesson(key.split('#')[0]);
    setTimeout(()=>{const el=document.querySelector(`[data-recall="${CSS.escape(key)}"]`);if(el){el.scrollIntoView({block:'center',behavior:'instant'});el.querySelector('summary').focus({preventScroll:true});}},450);
  }

  function preMarkup(q,i){return `<li><span class="deep-pre-q">${q}</span><span class="deep-pre-btns" role="group" aria-label="Você sabe responder?"><button type="button" data-deep-act="pre" data-i="${i}" data-v="1" aria-pressed="false">Sei</button><button type="button" data-deep-act="pre" data-i="${i}" data-v="0" aria-pressed="false">Não sei</button></span></li>`;}
  function rateMarkup(key){return `<div class="deep-rate" role="group" aria-label="Como foi sua resposta?"><span>Como foi?</span><button type="button" data-deep-act="rate" data-key="${esc(key)}" data-v="0">Errei</button><button type="button" data-deep-act="rate" data-key="${esc(key)}" data-v="1">Difícil</button><button type="button" data-deep-act="rate" data-key="${esc(key)}" data-v="2">Acertei</button></div>`;}
  function tools(){return `<div class="deep-tools"><button type="button" class="deep-hy-btn" data-deep-act="hy" aria-pressed="${hy}">Alto rendimento</button><span class="deep-tools-hint">Mostra só fluxograma, memorização, erros clássicos e evocação.</span></div>`;}

  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-deep-act]');if(!b)return;const act=b.dataset.deepAct,root=b.closest('.deep-lesson');
    if(act==='hy'){hy=!hy;root.classList.toggle('deep-hy',hy);b.setAttribute('aria-pressed',String(hy));window.dispatchEvent(new Event('resize'));}
    else if(act==='pre'){
      const box=b.closest('.deep-pretest'),group=b.parentElement;group.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
      const marks=[...box.querySelectorAll('.deep-pre-btns')].map(g=>g.querySelector('[aria-pressed=true]')?.dataset.v),done=marks.filter(v=>v!==undefined).length,unknown=marks.filter(v=>v==='0').length,out=box.querySelector('.deep-pre-out');
      out.textContent=done<marks.length?`${done} de ${marks.length} marcadas.`:unknown?`Você marcou ${unknown} como "não sei". Leia a aula procurando essas respostas e volte aqui no fim.`:'Você marcou todas como sabidas. Confirme na evocação ativa, sem olhar o texto.';
    }
    else if(act==='rate'){
      const key=b.dataset.key,box=b.closest('.deep-recall');rate(key,Number(b.dataset.v));
      b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
      const tag=box.querySelector('.deep-recall-due');tag.textContent=dueText(key);tag.hidden=false;box.dataset.state=b.dataset.v;
    }
  });

  function commands(){
    const c=(label,sub,action,words)=>({type:'Ação',label,sub,icon:'›',action,text:[label,sub,words||'']});
    return [
      c('Iniciar ou pausar pomodoro','Bloco de dedicação',()=>FocusTimer.toggle(),'timer foco tempo tomate'),
      c('Revisar perguntas vencidas',dueList().length+' para hoje',()=>dueList().length?openDue():toast('Nenhuma pergunta vencida hoje.'),'revisao espacada evocacao'),
      c('Abrir plano de hoje','Aula, questões e cartões do dia',()=>navigate('today'),'hoje plano'),
      c('Revisar flashcards','Cartões da P2',()=>navigate('flashcards'),'cartoes anki'),
      c('Fazer simulado','20 questões com correção ao final',()=>navigate('exam'),'prova teste'),
      c('Abrir curso de POCUS','Módulos e figuras anotadas',()=>navigate('pocus'),'ultrassom'),
      c('Abrir Decision Lab','Casos de decisão clínica',()=>navigate('decisionlab'),'casos'),
      c('Alternar tema claro e escuro','Aparência',()=>HIG.setTheme(document.body.dataset.theme==='dark'?'light':'dark'),'dark mode noturno'),
      c('Modo de concentração','Leitura sem distrações',()=>HIG.toggleFocus(),'foco'),
      c('Preferências e acessibilidade','Tema, tamanho de leitura e movimento',()=>HIG.openSettings(),'configuracoes ajustes')];
  }
  return {area,icon,topicHead,todayPanel,openDue,dueText,info,dueList,streak,preMarkup,rateMarkup,tools,commands,isHy:()=>hy};
})();
