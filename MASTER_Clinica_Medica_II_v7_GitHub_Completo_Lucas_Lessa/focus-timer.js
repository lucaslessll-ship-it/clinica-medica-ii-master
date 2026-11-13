/* Account-scoped Pomodoro. Only explicitly running time is recorded; no unattended
   time is inferred after a reload. Persistence uses the existing HIG progress key. */
const FocusTimer=(()=>{
  'use strict';
  let state,owner=null,running=false,interval=null,lastTick=0,lastWall=0,lastSave=0,releaseLock=null;
  const user=()=>window.MASTER_AUTH?.user()?.id||null;
  const dayKey=value=>{const d=new Date(value);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const format=ms=>{const seconds=Math.ceil(Math.max(0,ms)/1000);return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;};
  const duration=ms=>{const minutes=Math.floor(ms/60000);return minutes>=60?`${Math.floor(minutes/60)} h ${minutes%60} min`:`${minutes} min`;};
  function normalize(raw={}){
    const minutes=[25,45,60].includes(raw.minutes)?raw.minutes:25,days={};
    for(const [key,value]of Object.entries(raw.days||{}))if(/^\d{4}-\d{2}-\d{2}$/.test(key)&&value&&typeof value==='object')days[key]={ms:Math.max(0,Math.min(86400000,Number(value.ms)||0)),completed:Math.max(0,Math.floor(Number(value.completed)||0))};
    return {version:1,minutes,remainingMs:Number.isFinite(raw.remainingMs)?Math.max(0,Math.min(minutes*60000,raw.remainingMs)):minutes*60000,floating:raw.floating!==false,legacyMinutes:Math.max(0,Number(raw.legacyMinutes)||0),days};
  }
  function release(){clearInterval(interval);interval=null;running=false;releaseLock?.();releaseLock=null;}
  function reload(){release();owner=user();state=normalize(HIG.focusData());loadFloat();render();refreshHistory();}
  function allowed(){return owner&&owner===user()&&!document.documentElement.classList.contains('master-auth-locked');}
  function persist(){if(owner&&owner===user())HIG.saveFocus(state);lastSave=performance.now();refreshHistory();}
  function credit(start,ms){
    let at=start,left=ms;
    while(left>0){const date=new Date(at),key=dayKey(at);date.setHours(24,0,0,0);const part=Math.min(left,date.getTime()-at);if(part<=0)break;
      const day=state.days[key]||(state.days[key]={ms:0,completed:0});day.ms+=part;left-=part;at+=part;
    }
  }
  function tick(saveNow=false){
    if(!running)return;
    if(owner!==user()){release();return;}
    const now=performance.now(),elapsed=Math.min(state.remainingMs,Math.max(0,now-lastTick)),completedAt=lastWall+elapsed;
    // Monotonic elapsed time avoids timer drift and manual wall-clock changes.
    credit(lastWall,elapsed);state.remainingMs=Math.max(0,state.remainingMs-elapsed);lastTick=now;lastWall=Date.now();
    if(state.remainingMs===0){const key=dayKey(completedAt),day=state.days[key]||(state.days[key]={ms:0,completed:0});day.completed++;release();persist();toast('Pomodoro concluído. Faça uma pausa antes de iniciar outro bloco.');}
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
  function panel(){return `<p>Escolha um bloco de dedicação. O tempo é registrado enquanto o pomodoro estiver rodando, inclusive ao navegar entre aulas. Ao recarregar ou fechar, o bloco fica pausado; o tempo já salvo é preservado.</p><div class="btn-row">${[25,45,60].map(n=>`<button class="btn" data-focus-duration="${n}" onclick="FocusTimer.configure(${n})" type="button">${n} min</button>`).join('')}</div><p class="focus-panel-time" data-focus-time>${format(state.remainingMs)}</p><div class="btn-row"><button class="btn primary" data-focus-toggle onclick="FocusTimer.toggle()" type="button">${running?'Pausar':'Começar'}</button><button class="btn" onclick="FocusTimer.reset()" type="button">Reiniciar bloco</button><button class="btn" onclick="FocusTimer.resetFloat()" type="button">Recentralizar flutuante</button><button class="btn" data-focus-floating onclick="FocusTimer.floating(!FocusTimer.status().floating)" type="button">${state.floating?'Ocultar':'Mostrar'} controle lateral</button></div>${historyMarkup()}`;}
  function historyMarkup(){return `<section class="focus-history" data-focus-history aria-label="Histórico de dedicação">${historyContent()}</section>`;}
  function historyContent(){
    if(!state)return '';
    const today=dayKey(Date.now()),days=state.days,datedTotal=Object.values(days).reduce((sum,d)=>sum+d.ms,0),blocks=Object.values(days).reduce((sum,d)=>sum+d.completed,0);
    const now=new Date(),recent=[];for(let i=6;i>=0;i--){const date=new Date(now);date.setDate(date.getDate()-i);recent.push({date,key:dayKey(date.getTime())});}
    let streak=0,date=new Date(now);if(!(days[today]?.ms>0))date.setDate(date.getDate()-1);
    while(days[dayKey(date.getTime())]?.ms>0){streak++;date.setDate(date.getDate()-1);}
    return `<h3>Sua dedicação</h3><dl class="focus-stats"><div><dt>Hoje</dt><dd>${duration(days[today]?.ms||0)}</dd></div><div><dt>Total registrado</dt><dd>${duration(datedTotal+state.legacyMinutes*60000)}</dd></div><div><dt>Blocos concluídos</dt><dd>${blocks}</dd></div><div><dt>Dias em sequência</dt><dd>${streak}</dd></div></dl><p class="clinical-note">Tempo com pomodoro ativo, não uma medida de atenção ou domínio clínico. Dias em sequência consideram qualquer tempo registrado; as datas seguem o fuso do dispositivo.</p><ol class="focus-week">${recent.map(({date,key})=>`<li><time datetime="${key}">${date.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'})}</time><strong>${duration(days[key]?.ms||0)}</strong></li>`).join('')}</ol>${state.legacyMinutes?`<p class="clinical-note">${state.legacyMinutes} min do temporizador anterior estão no total, sem atribuição a dias ou novos blocos.</p>`:''}`;
  }
  function refreshHistory(){document.querySelectorAll('[data-focus-history]').forEach(el=>el.innerHTML=historyContent());}
  function render(){
    if(!state)return;
    const label=format(state.remainingMs);
    document.querySelectorAll('[data-focus-time],#timer-count').forEach(el=>el.textContent=label);
    document.querySelectorAll('[data-focus-toggle],#timer-toggle').forEach(el=>{el.textContent=running?'Pausar':'Começar';el.setAttribute('aria-label',running?'Pausar pomodoro':'Iniciar pomodoro');});
    document.querySelectorAll('[data-focus-duration]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.focusDuration)===state.minutes)));
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
  function init(){initFloat();reload();document.addEventListener('visibilitychange',()=>{if(running)tick(true);});window.addEventListener('pagehide',pause);window.addEventListener('beforeunload',pause);window.addEventListener('master-auth-ready',reload);window.addEventListener('master-auth-ended',()=>{release();state=normalize();owner=null;render();refreshHistory();});window.addEventListener('storage',e=>{if(e.key==='master_p2_hig_v2'&&!running){HIG.refreshFocus();state=normalize(HIG.focusData());render();refreshHistory();}});}
  return {init,reload,render,toggle,pause,configure,reset,floating,panel,historyMarkup,status,cancel,expand,resetFloat};
})();
window.FocusTimer=FocusTimer;
window.addEventListener('DOMContentLoaded',FocusTimer.init);
