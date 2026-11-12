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
  function reload(){release();owner=user();state=normalize(HIG.focusData());render();refreshHistory();}
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
  function panel(){return `<p>Escolha um bloco de dedicação. O tempo é registrado enquanto o pomodoro estiver rodando, inclusive ao navegar entre aulas. Ao recarregar ou fechar, o bloco fica pausado; o tempo já salvo é preservado.</p><div class="btn-row">${[25,45,60].map(n=>`<button class="btn" data-focus-duration="${n}" onclick="FocusTimer.configure(${n})" type="button">${n} min</button>`).join('')}</div><p class="focus-panel-time" data-focus-time>${format(state.remainingMs)}</p><div class="btn-row"><button class="btn primary" data-focus-toggle onclick="FocusTimer.toggle()" type="button">${running?'Pausar':'Começar'}</button><button class="btn" onclick="FocusTimer.reset()" type="button">Reiniciar bloco</button><button class="btn" data-focus-floating onclick="FocusTimer.floating(!FocusTimer.status().floating)" type="button">${state.floating?'Ocultar':'Mostrar'} controle lateral</button></div>${historyMarkup()}`;}
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
    const float=document.getElementById('focus-float');if(float)float.hidden=!state.floating||!allowed();
  }
  function status(){return {...state,running};}
  function init(){reload();document.addEventListener('visibilitychange',()=>{if(running)tick(true);});window.addEventListener('pagehide',pause);window.addEventListener('beforeunload',pause);window.addEventListener('master-auth-ready',reload);window.addEventListener('master-auth-ended',()=>{release();state=normalize();owner=null;render();refreshHistory();});window.addEventListener('storage',e=>{if(e.key==='master_p2_hig_v2'&&!running){HIG.refreshFocus();state=normalize(HIG.focusData());render();refreshHistory();}});}
  return {init,reload,render,toggle,pause,configure,reset,floating,panel,historyMarkup,status};
})();
window.FocusTimer=FocusTimer;
window.addEventListener('DOMContentLoaded',FocusTimer.init);
