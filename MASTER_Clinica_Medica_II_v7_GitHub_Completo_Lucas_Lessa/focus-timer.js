/* Account-scoped Pomodoro. Only explicitly running time is recorded; no unattended
   time is inferred after a reload. Persistence uses the existing HIG progress key. */
const FocusTimer=(()=>{
  'use strict';
  let state,owner=null,running=false,interval=null,lastTick=0,lastWall=0,lastSave=0,releaseLock=null;
  const user=()=>window.MASTER_AUTH?.user()?.id||null;
  const dayKey=value=>{const d=new Date(value);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const format=ms=>{const seconds=Math.ceil(Math.max(0,ms)/1000);return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;};
  const duration=ms=>{const minutes=Math.floor(ms/60000);return minutes>=60?`${Math.floor(minutes/60)} h ${minutes%60} min`:`${minutes} min`;};
  const DESCANSOS=[5,10,15];
  function normalize(raw={}){
    const minutes=[25,45,60].includes(raw.minutes)?raw.minutes:25,days={};
    const breakMinutes=DESCANSOS.includes(raw.breakMinutes)?raw.breakMinutes:5;
    const mode=raw.mode==='descanso'?'descanso':'foco';
    for(const [key,value]of Object.entries(raw.days||{}))if(/^\d{4}-\d{2}-\d{2}$/.test(key)&&value&&typeof value==='object')days[key]={ms:Math.max(0,Math.min(86400000,Number(value.ms)||0)),completed:Math.max(0,Math.floor(Number(value.completed)||0)),breakMs:Math.max(0,Math.min(86400000,Number(value.breakMs)||0)),breaks:Math.max(0,Math.floor(Number(value.breaks)||0))};
    return {version:1,minutes,breakMinutes,mode,remainingMs:(()=>{const teto=(mode==='descanso'?breakMinutes:minutes)*60000;return Number.isFinite(raw.remainingMs)?Math.max(0,Math.min(teto,raw.remainingMs)):teto})(),floating:raw.floating!==false,legacyMinutes:Math.max(0,Number(raw.legacyMinutes)||0),days};
  }
  function release(){clearInterval(interval);interval=null;running=false;releaseLock?.();releaseLock=null;}
  function reload(){release();owner=user();state=normalize(HIG.focusData());loadFloat();render();refreshHistory();}
  function allowed(){return owner&&owner===user()&&!document.documentElement.classList.contains('master-auth-locked');}
  function persist(){if(owner&&owner===user())HIG.saveFocus(state);lastSave=performance.now();refreshHistory();}
  const diaDe=key=>state.days[key]||(state.days[key]={ms:0,completed:0,breakMs:0,breaks:0});
  function credit(start,ms){
    let at=start,left=ms;
    const campo=state.mode==='descanso'?'breakMs':'ms';
    while(left>0){const date=new Date(at),key=dayKey(at);date.setHours(24,0,0,0);const part=Math.min(left,date.getTime()-at);if(part<=0)break;
      const day=diaDe(key);day[campo]=(day[campo]||0)+part;left-=part;at+=part;
    }
  }
  function tick(saveNow=false){
    if(!running)return;
    if(owner!==user()){release();return;}
    const now=performance.now(),elapsed=Math.min(state.remainingMs,Math.max(0,now-lastTick)),completedAt=lastWall+elapsed;
    // Monotonic elapsed time avoids timer drift and manual wall-clock changes.
    credit(lastWall,elapsed);state.remainingMs=Math.max(0,state.remainingMs-elapsed);lastTick=now;lastWall=Date.now();
    if(state.remainingMs===0){
      const day=diaDe(dayKey(completedAt)),terminou=state.mode;
      if(terminou==='descanso')day.breaks=(day.breaks||0)+1;else day.completed++;
      state.mode='foco';state.remainingMs=state.minutes*60000;
      release();persist();avisarFim(terminou);
    }
    else if(saveNow||now-lastSave>=5000)persist();
    render();
  }
  async function toggle(){
    if(running){pause();return;}
    if(!allowed())return;
    if(!navigator.locks){toast('Atualize este navegador para usar o pomodoro com controle de tempo entre abas.');return;}
    const requestedOwner=owner;
    await navigator.locks.request('master-pomodoro-'+owner,{ifAvailable:true},async lock=>{
      if(!lock){toast('O pomodoro desta conta já está ativo em outra aba. Pause-o lá antes de iniciar aqui.');return;}
      if(!allowed()||owner!==requestedOwner)return;
      // Another tab may have finished a session since this page was opened.
      HIG.refreshFocus();state=normalize(HIG.focusData());
      if(state.remainingMs<=0)state.remainingMs=state.minutes*60000;
      const held=new Promise(resolve=>releaseLock=resolve);running=true;lastTick=performance.now();lastWall=Date.now();lastSave=lastTick;
      persist();interval=setInterval(()=>tick(),1000);render();await held;
    });
  }
  function pause(){if(!running)return;tick(true);release();persist();render();}
  function configure(minutes){if(!allowed()||![25,45,60].includes(minutes))return;pause();state.minutes=minutes;state.remainingMs=minutes*60000;persist();render();}
  function reset(){if(!allowed())return;pause();state.remainingMs=state.minutes*60000;persist();render();}
  function floating(show){if(!allowed())return;state.floating=!!show;persist();render();if(!show&&document.getElementById('hig-overlay').hidden)document.getElementById('focus-top')?.focus();}
  function panel(){return `<p>Escolha um bloco de dedicação. O tempo é registrado enquanto o pomodoro estiver rodando, inclusive ao navegar entre aulas. Ao recarregar ou fechar, o bloco fica pausado; o tempo já salvo é preservado.</p><div class="btn-row">${[25,45,60].map(n=>`<button class="btn" data-focus-duration="${n}" onclick="FocusTimer.configure(${n})" type="button">${n} min</button>`).join('')}</div>
    <p class="focus-panel-sub">Descanso entre blocos</p>
    <div class="btn-row">${DESCANSOS.map(n=>`<button class="btn" data-focus-break-duration="${n}" onclick="FocusTimer.definirDescanso(${n})" type="button">${n} min</button>`).join('')}<button class="btn" onclick="FocusTimer.iniciarDescanso()" type="button">Descansar agora</button></div><p class="focus-panel-time" data-focus-time>${format(state.remainingMs)}</p><div class="btn-row"><button class="btn primary" data-focus-toggle onclick="FocusTimer.toggle()" type="button">${running?'Pausar':'Começar'}</button><button class="btn" onclick="FocusTimer.reset()" type="button">Reiniciar bloco</button><button class="btn" onclick="FocusTimer.resetFloat()" type="button">Recentralizar flutuante</button><button class="btn" data-focus-floating onclick="FocusTimer.floating(!FocusTimer.status().floating)" type="button">${state.floating?'Ocultar':'Mostrar'} controle lateral</button></div>${historyMarkup()}`;}
  function historyMarkup(){return `<section class="focus-history" data-focus-history aria-label="Histórico de dedicação">${historyContent()}</section>`;}
  function historyContent(){
    if(!state)return '';
    const hojeKey=dayKey(Date.now()),days=state.days;
    const totalMs=Object.values(days).reduce((soma,d)=>soma+d.ms,0);
    const blocos=Object.values(days).reduce((soma,d)=>soma+d.completed,0);
    const pausas=Object.values(days).reduce((soma,d)=>soma+(d.breaks||0),0);
    const agora=new Date();
    const dia=atras=>{const d=new Date(agora);d.setHours(12,0,0,0);d.setDate(d.getDate()-atras);return d;};

    let sequencia=0,cursor=new Date(agora);
    if(!(days[hojeKey]?.ms>0))cursor.setDate(cursor.getDate()-1);
    while(days[dayKey(cursor.getTime())]?.ms>0){sequencia++;cursor.setDate(cursor.getDate()-1);}

    const semana=Array.from({length:7},(_,k)=>days[dayKey(dia(k).getTime())]?.ms||0).reduce((a,b)=>a+b,0);
    const diasAtivos=Object.values(days).filter(d=>d.ms>0).length;

    // Barras: minutos de foco por dia nas duas últimas semanas.
    const janela=Array.from({length:14},(_,k)=>{const d=dia(13-k),key=dayKey(d.getTime()),reg=days[key]||{};
      return {d,key,min:Math.round((reg.ms||0)/60000),blocos:reg.completed||0,pausas:reg.breaks||0};});
    const teto=Math.max(25,...janela.map(x=>x.min));
    const fmtDia=d=>d.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'});
    const inicial=d=>['D','S','T','Q','Q','S','S'][d.getDay()];
    const barras=janela.map(x=>{
      const altura=x.min?Math.max(4,Math.round(x.min/teto*100)):0;
      const hoje=x.key===hojeKey;
      return `<li class="focus-bar"${hoje?' data-hoje="true"':''}>
        <span class="focus-bar-trilho">${x.min?`<span class="focus-bar-valor" style="height:${altura}%"></span>`:''}</span>
        <span class="focus-bar-dia" aria-hidden="true">${inicial(x.d)}</span>
        <span class="focus-bar-dica" role="tooltip">${fmtDia(x.d)} · ${x.min} min · ${x.blocos} ${x.blocos===1?'bloco':'blocos'}</span>
        <span class="sr-only">${fmtDia(x.d)}: ${x.min} minutos, ${x.blocos} blocos</span>
      </li>`;}).join('');

    // Frequência: em quantas das últimas 8 semanas você estudou em cada dia.
    const frequencia=Array.from({length:7},(_,semanaDia)=>{
      let contagem=0;
      for(let k=0;k<56;k++){const d=dia(k);if(d.getDay()===semanaDia&&days[dayKey(d.getTime())]?.ms>0)contagem++;}
      return {semanaDia,contagem};});
    const maxFreq=Math.max(1,...frequencia.map(f=>f.contagem));
    const nomeDia=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
    const freqMarkup=frequencia.map(f=>`<li><span class="focus-freq-nome">${nomeDia[f.semanaDia].slice(0,3)}</span>
      <span class="focus-freq-trilho">${f.contagem?`<span class="focus-freq-valor" style="width:${Math.round(f.contagem/maxFreq*100)}%"></span>`:''}</span>
      <span class="focus-freq-conta">${f.contagem}</span>
      <span class="sr-only">${nomeDia[f.semanaDia]}: ${f.contagem} de 8 semanas</span></li>`).join('');

    const tabela=janela.filter(x=>x.min||x.blocos).reverse().map(x=>`<tr><th scope="row">${fmtDia(x.d)}</th><td>${x.min} min</td><td>${x.blocos}</td><td>${x.pausas}</td></tr>`).join('')
      ||'<tr><td colspan="4">Nenhum bloco nas duas últimas semanas.</td></tr>';

    return `<h3>Sua dedicação</h3>
      <dl class="focus-stats">
        <div><dt>Hoje</dt><dd>${duration(days[hojeKey]?.ms||0)}</dd></div>
        <div><dt>Últimos 7 dias</dt><dd>${duration(semana)}</dd></div>
        <div><dt>Sequência</dt><dd>${sequencia} ${sequencia===1?'dia':'dias'}</dd></div>
        <div><dt>Blocos concluídos</dt><dd>${blocos}</dd></div>
      </dl>
      <figure class="focus-chart">
        <figcaption>Minutos de foco por dia <span class="focus-chart-nota"><span class="focus-nota-larga">últimas duas semanas</span><span class="focus-nota-curta">última semana</span> · pico de ${teto} min</span></figcaption>
        <ol class="focus-bars">${barras}</ol>
      </figure>
      <figure class="focus-chart">
        <figcaption>Em que dias você estuda <span class="focus-chart-nota">semanas com estudo, das 8 últimas</span></figcaption>
        <ol class="focus-freq">${freqMarkup}</ol>
      </figure>
      <p class="focus-chart-nota">${diasAtivos} ${diasAtivos===1?'dia registrado':'dias registrados'} · ${pausas} ${pausas===1?'descanso cumprido':'descansos cumpridos'} · ${duration(totalMs+state.legacyMinutes*60000)} no total</p>
      <details class="focus-tabela"><summary>Ver tabela dos últimos 14 dias</summary>
        <table><thead><tr><th scope="col">Dia</th><th scope="col">Foco</th><th scope="col">Blocos</th><th scope="col">Pausas</th></tr></thead><tbody>${tabela}</tbody></table>
      </details>`;
  }
  /* ---------- aviso de fim de ciclo ---------- */

  // Mensagens variam com a hora e com quantos blocos já saíram hoje, para o
  // aviso não virar paisagem.
  function mensagemFim(terminou){
    const hora=new Date().getHours(),blocos=state.days[dayKey(Date.now())]?.completed||0;
    if(terminou==='descanso'){
      const pausa=['Pausa encerrada. Pronto para outro bloco?','Descanso cumprido. Voltar ao estudo?','Fim da pausa. Bora para o próximo bloco?'];
      return {titulo:pausa[blocos%pausa.length],detalhe:`Você já fechou ${blocos} ${blocos===1?'bloco':'blocos'} hoje.`};
    }
    const abertura=hora<6?'Bloco fechado de madrugada.':hora<12?'Bloco da manhã fechado.':hora<18?'Bloco da tarde fechado.':'Bloco da noite fechado.';
    const elogio=blocos<=1?'Primeiro bloco do dia já conta.'
      :blocos<4?`${blocos} blocos hoje, o ritmo está de pé.`
      :blocos<7?`${blocos} blocos hoje. Isso é dia de estudo cheio.`
      :`${blocos} blocos hoje. Cuide do descanso também.`;
    return {titulo:abertura,detalhe:elogio};
  }

  function caixaFim(){
    let caixa=document.getElementById('focus-end');
    if(caixa)return caixa;
    caixa=document.createElement('div');
    caixa.id='focus-end';caixa.className='focus-end';caixa.hidden=true;
    caixa.innerHTML=`<div class="focus-end-card" role="alertdialog" aria-labelledby="focus-end-title">
      <button type="button" class="focus-end-x" data-focus-end-close aria-label="Fechar aviso">&#10005;</button>
      <p class="focus-end-kicker" data-focus-end-kicker></p>
      <h2 id="focus-end-title" data-focus-end-title></h2>
      <p class="focus-end-detail" data-focus-end-detail></p>
      <p class="focus-end-ask" data-focus-end-ask></p>
      <div class="focus-end-break" data-focus-end-break>
        <span class="focus-end-break-label">Descanso de</span>
        <div class="focus-end-chips" role="group" aria-label="Minutos de descanso">
          ${DESCANSOS.map(n=>`<button type="button" class="focus-end-chip" data-focus-break="${n}" aria-pressed="false">${n} min</button>`).join('')}
        </div>
      </div>
      <div class="focus-end-actions">
        <button type="button" class="btn primary" data-focus-end-main></button>
        <button type="button" class="btn" data-focus-end-alt></button>
      </div></div>`;
    document.body.append(caixa);
    caixa.addEventListener('click',evento=>{
      if(evento.target===caixa||evento.target.closest('[data-focus-end-close]')){fecharFim();return;}
      const chip=evento.target.closest('[data-focus-break]');
      if(chip){definirDescanso(Number(chip.dataset.focusBreak));return;}
      if(evento.target.closest('[data-focus-end-main]')){const tipo=caixa.dataset.tipo;fecharFim();tipo==='descanso'?iniciarFoco():iniciarDescanso();return;}
      if(evento.target.closest('[data-focus-end-alt]')){const tipo=caixa.dataset.tipo;fecharFim();tipo==='descanso'?iniciarDescanso():iniciarFoco();}
    });
    return caixa;
  }

  function avisarFim(terminou){
    if(!allowed())return;
    const caixa=caixaFim(),{titulo,detalhe}=mensagemFim(terminou);
    caixa.dataset.tipo=terminou;
    caixa.querySelector('[data-focus-end-kicker]').textContent=terminou==='descanso'?'Descanso concluído':'Pomodoro concluído';
    caixa.querySelector('[data-focus-end-title]').textContent=titulo;
    caixa.querySelector('[data-focus-end-detail]').textContent=detalhe;
    caixa.querySelector('[data-focus-end-ask]').textContent=terminou==='descanso'
      ? 'Voltar ao estudo ou esticar a pausa?'
      : 'Hora do descanso ou vai continuar estudando?';
    caixa.querySelector('[data-focus-end-main]').textContent=terminou==='descanso'?`Estudar ${state.minutes} min`:`Descansar ${state.breakMinutes} min`;
    caixa.querySelector('[data-focus-end-alt]').textContent=terminou==='descanso'?`Mais ${state.breakMinutes} min de pausa`:`Continuar estudando ${state.minutes} min`;
    caixa.hidden=false;
    render();
    requestAnimationFrame(()=>caixa.querySelector('[data-focus-end-main]')?.focus());
    try{navigator.vibrate?.(terminou==='descanso'?[90]:[90,70,90]);}catch{}
  }

  function fecharFim(){const caixa=document.getElementById('focus-end');if(caixa)caixa.hidden=true;}
  function definirDescanso(minutos){
    if(!allowed()||!DESCANSOS.includes(minutos))return;
    state.breakMinutes=minutos;
    if(state.mode==='descanso'&&!running)state.remainingMs=minutos*60000;
    persist();render();
  }
  function iniciarDescanso(){
    if(!allowed())return;
    pause();state.mode='descanso';state.remainingMs=state.breakMinutes*60000;persist();render();toggle();
  }
  function iniciarFoco(){
    if(!allowed())return;
    pause();state.mode='foco';state.remainingMs=state.minutes*60000;persist();render();toggle();
  }

  function refreshHistory(){document.querySelectorAll('[data-focus-history]').forEach(el=>el.innerHTML=historyContent());}
  function render(){
    if(!state)return;
    const label=format(state.remainingMs);
    document.querySelectorAll('[data-focus-time],#timer-count').forEach(el=>el.textContent=label);
    document.querySelectorAll('[data-focus-toggle],#timer-toggle').forEach(el=>{el.textContent=running?'Pausar':'Começar';el.setAttribute('aria-label',running?'Pausar pomodoro':'Iniciar pomodoro');});
    document.querySelectorAll('[data-focus-duration]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.focusDuration)===state.minutes)));
    document.querySelectorAll('[data-focus-break-duration]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.focusBreakDuration)===state.breakMinutes)));
    document.querySelectorAll('.focus-end-chip').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.focusBreak)===state.breakMinutes)));
    const aviso=document.getElementById('focus-end');
    if(aviso&&!aviso.hidden){
      const descanso=aviso.dataset.tipo==='descanso';
      aviso.querySelector('[data-focus-end-main]').textContent=descanso?`Estudar ${state.minutes} min`:`Descansar ${state.breakMinutes} min`;
      aviso.querySelector('[data-focus-end-alt]').textContent=descanso?`Mais ${state.breakMinutes} min de pausa`:`Continuar estudando ${state.minutes} min`;
    }
    document.querySelectorAll('[data-focus-mode-label]').forEach(el=>el.textContent=state.mode==='descanso'?'Descanso':'Foco');
    document.documentElement.dataset.focusMode=state.mode;
    document.querySelectorAll('[data-focus-floating]').forEach(el=>el.textContent=state.floating?'Ocultar controle lateral':'Mostrar controle lateral');
    const top=document.getElementById('focus-top');if(top){top.setAttribute('aria-label',`Abrir pomodoro: ${label}, ${running?'em andamento':'pausado'}`);top.dataset.running=String(running);}
    const float=document.getElementById('focus-float');if(float){float.hidden=!state.floating||!allowed();float.dataset.running=String(running);placeFloat();}
    document.querySelectorAll('[data-focus-float-toggle]').forEach(el=>{el.textContent=running?'Pausar':'Começar';});
  }
  /* Floating control: position and size are device preferences, stored per account on this device only. */
  const floatKey=()=>'master_focus_float_v1_'+(owner||'anon');
  let floatPrefs={x:null,y:null,expanded:false};
  function loadFloat(){floatPrefs={x:null,y:null,expanded:false};try{const raw=JSON.parse(localStorage.getItem(floatKey())||'null');if(raw&&typeof raw==='object')floatPrefs={x:Number.isFinite(raw.x)?raw.x:null,y:Number.isFinite(raw.y)?raw.y:null,expanded:!!raw.expanded};}catch{}}
  function saveFloat(){try{if(owner)localStorage.setItem(floatKey(),JSON.stringify(floatPrefs));}catch{}}
  function placeFloat(){
    const el=document.getElementById('focus-float');if(!el)return;
    el.dataset.expanded=String(floatPrefs.expanded);el.querySelector('.focus-float-size')?.setAttribute('aria-expanded',String(floatPrefs.expanded));
    if(floatPrefs.x===null||el.hidden){if(floatPrefs.x===null){el.style.left=el.style.top=el.style.right=el.style.bottom='';}return;}
    const box=el.getBoundingClientRect(),x=Math.max(8,Math.min(window.innerWidth-box.width-8,floatPrefs.x)),y=Math.max(8,Math.min(window.innerHeight-box.height-8,floatPrefs.y));
    el.style.left=x+'px';el.style.top=y+'px';el.style.right='auto';el.style.bottom='auto';
  }
  function moveFloat(x,y){floatPrefs.x=x;floatPrefs.y=y;placeFloat();}
  function expand(){floatPrefs.expanded=!floatPrefs.expanded;saveFloat();placeFloat();}
  function resetFloat(){floatPrefs.x=floatPrefs.y=null;saveFloat();placeFloat();}
  function cancel(button){
    if(!allowed())return;
    if(button&&button.dataset.confirm!=='true'){button.dataset.confirm='true';button.textContent='Confirmar';clearTimeout(cancel._timer);cancel._timer=setTimeout(()=>{button.dataset.confirm='false';button.textContent='Cancelar';},4000);return;}
    clearTimeout(cancel._timer);if(button){button.dataset.confirm='false';button.textContent='Cancelar';}
    reset();toast('Bloco cancelado. O tempo já registrado foi mantido.');
  }
  function initFloat(){
    const el=document.getElementById('focus-float');if(!el)return;
    let drag=null;
    el.addEventListener('pointerdown',e=>{if(e.button)return;const box=el.getBoundingClientRect();drag={id:e.pointerId,sx:e.clientX,sy:e.clientY,ox:box.left,oy:box.top,moved:false};});
    // Listen on window so the drag continues when the pointer leaves the small control.
    window.addEventListener('pointermove',e=>{
      if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.sx,dy=e.clientY-drag.sy;
      if(!drag.moved){if(Math.hypot(dx,dy)<6)return;drag.moved=true;el.classList.add('dragging');}
      e.preventDefault();moveFloat(drag.ox+dx,drag.oy+dy);
    },{passive:false});
    const end=e=>{if(!drag||e.pointerId!==drag.id)return;const moved=drag.moved;drag=null;el.classList.remove('dragging');if(moved){saveFloat();const stop=ev=>{ev.stopPropagation();ev.preventDefault();};window.addEventListener('click',stop,{capture:true,once:true});setTimeout(()=>window.removeEventListener('click',stop,{capture:true}),0);}};
    window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end);
    el.querySelector('.focus-float-grip')?.addEventListener('keydown',e=>{
      const step={ArrowLeft:[-16,0],ArrowRight:[16,0],ArrowUp:[0,-16],ArrowDown:[0,16]}[e.key];
      if(e.key==='Home'){e.preventDefault();resetFloat();return;}
      if(!step)return;e.preventDefault();const box=el.getBoundingClientRect();moveFloat(box.left+step[0],box.top+step[1]);saveFloat();
    });
    el.querySelector('.focus-float-grip')?.addEventListener('dblclick',resetFloat);
    window.addEventListener('resize',placeFloat);
  }
  function status(){return {...state,running};}
  function init(){initFloat();reload();document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.getElementById('focus-end')?.hidden)fecharFim();});document.addEventListener('visibilitychange',()=>{if(running)tick(true);});window.addEventListener('pagehide',pause);window.addEventListener('beforeunload',pause);window.addEventListener('master-auth-ready',reload);window.addEventListener('master-auth-ended',()=>{release();state=normalize();owner=null;render();refreshHistory();});window.addEventListener('storage',e=>{if(e.key==='master_p2_hig_v2'&&!running){HIG.refreshFocus();state=normalize(HIG.focusData());render();refreshHistory();}});}
  return {init,reload,render,toggle,pause,configure,reset,floating,panel,historyMarkup,status,cancel,expand,resetFloat,definirDescanso,iniciarDescanso,iniciarFoco,fecharFim,avisarFim};
})();
window.FocusTimer=FocusTimer;
window.addEventListener('DOMContentLoaded',FocusTimer.init);
