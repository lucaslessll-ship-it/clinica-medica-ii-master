/* Account-scoped Pomodoro. Only explicitly running time is recorded; no unattended
   time is inferred after a reload. Persistence uses the existing HIG progress key. */
const FocusTimer=(()=>{
  'use strict';
  let state,owner=null,running=false,interval=null,lastTick=0,lastWall=0,lastSave=0,releaseLock=null;
  const user=()=>window.MASTER_AUTH?.user()?.id||null;
  const dayKey=value=>{const d=new Date(value);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const format=ms=>{const seconds=Math.ceil(Math.max(0,ms)/1000);return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;};
  const duration=ms=>{const minutes=Math.floor(ms/60000);return minutes>=60?`${Math.floor(minutes/60)} h ${minutes%60} min`:`${minutes} min`;};
  const LIMITES={foco:[5,90,25],curto:[1,30,5],longo:[5,60,15],rodada:[2,8,4]};
  const limitar=(campo,valor)=>{const [min,max,padrao]=LIMITES[campo];const n=Math.round(Number(valor));return Number.isFinite(n)?Math.max(min,Math.min(max,n)):padrao;};
  const MODOS={foco:'Foco',curto:'Pausa curta',longo:'Pausa longa'};
  function normalize(raw={}){
    const days={};
    const minutes=limitar('foco',raw.minutes);
    // breakMinutes é o nome antigo da pausa curta; migra sem perder o ajuste.
    const shortMinutes=limitar('curto',raw.shortMinutes??raw.breakMinutes);
    const longMinutes=limitar('longo',raw.longMinutes);
    const rodada=limitar('rodada',raw.rodada);
    const mode=MODOS[raw.mode]?raw.mode:raw.mode==='descanso'?'curto':'foco';
    const feitos=Math.max(0,Math.min(rodada,Math.floor(Number(raw.feitos)||0)));
    const teto=(mode==='foco'?minutes:mode==='longo'?longMinutes:shortMinutes)*60000;
    for(const [key,value]of Object.entries(raw.days||{}))if(/^\d{4}-\d{2}-\d{2}$/.test(key)&&value&&typeof value==='object')days[key]={ms:Math.max(0,Math.min(86400000,Number(value.ms)||0)),completed:Math.max(0,Math.floor(Number(value.completed)||0)),breakMs:Math.max(0,Math.min(86400000,Number(value.breakMs)||0)),breaks:Math.max(0,Math.floor(Number(value.breaks)||0))};
    const ativoRaw=raw.ativo&&typeof raw.ativo==='object'&&typeof raw.ativo.dev==='string'&&Number(raw.ativo.fimEm)>0?{dev:raw.ativo.dev,modo:MODOS[raw.ativo.modo]?raw.ativo.modo:'foco',fimEm:Number(raw.ativo.fimEm)}:null;
    return {version:2,em:Number(raw.em)||0,ativo:ativoRaw,minutes,shortMinutes,longMinutes,rodada,feitos,mode,auto:raw.auto===true,remainingMs:Number.isFinite(raw.remainingMs)?Math.max(0,Math.min(teto,raw.remainingMs)):teto,floating:raw.floating!==false,legacyMinutes:Math.max(0,Number(raw.legacyMinutes)||0),days,get breakMinutes(){return this.shortMinutes;}};
  }
  const minutosDe=modo=>modo==='foco'?state.minutes:modo==='longo'?state.longMinutes:state.shortMinutes;
  const duracao=modo=>minutosDe(modo)*60000;
  const proximoModo=()=>state.mode==='foco'?(state.feitos+1>=state.rodada?'longo':'curto'):'foco';
  const DEV=(()=>{try{let d=localStorage.getItem('master_device_id');if(!d){d=Math.random().toString(36).slice(2,10)+Date.now().toString(36);localStorage.setItem('master_device_id',d);}return d;}catch{return 'local';}})();
  let espelho=null;
  const remotoAtivo=()=>state&&!running&&state.ativo&&state.ativo.dev!==DEV&&state.ativo.fimEm>Date.now()?state.ativo:null;
  function pararEspelho(){clearInterval(espelho);espelho=null;}
  function iniciarEspelho(){
    pararEspelho();const a=remotoAtivo();if(!a)return;
    espelho=setInterval(()=>{const r=remotoAtivo();if(!r){pararEspelho();render();return;}state.mode=r.modo;state.remainingMs=Math.max(0,r.fimEm-Date.now());render();},1000);
    state.mode=a.modo;state.remainingMs=Math.max(0,a.fimEm-Date.now());render();
  }
  function release(){window.__pomodoroRunning=false;clearInterval(interval);interval=null;running=false;releaseLock?.();releaseLock=null;}
  function reload(){release();pararEspelho();owner=user();state=normalize(HIG.focusData());loadFloat();render();refreshHistory();iniciarEspelho();}
  function allowed(){return owner&&owner===user()&&!document.documentElement.classList.contains('master-auth-locked');}
  function persist(){if(owner&&owner===user()){state.em=Date.now();state.ativo=running?{dev:DEV,modo:state.mode,fimEm:Date.now()+state.remainingMs}:null;HIG.saveFocus(state);}lastSave=performance.now();refreshHistory();}
  const diaDe=key=>state.days[key]||(state.days[key]={ms:0,completed:0,breakMs:0,breaks:0});
  function credit(start,ms){
    let at=start,left=ms;
    const campo=state.mode==='foco'?'ms':'breakMs';
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
      let proximo;
      if(terminou==='foco'){day.completed++;proximo=state.feitos+1>=state.rodada?'longo':'curto';state.feitos=Math.min(state.rodada,state.feitos+1);}
      else{day.breaks=(day.breaks||0)+1;proximo='foco';if(terminou==='longo')state.feitos=0;}
      state.mode=proximo;state.remainingMs=duracao(proximo);
      release();persist();avisarFim(terminou);
      if(state.auto)toggle();
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
      HIG.refreshFocus();state=normalize(HIG.focusData());pararEspelho();
      {const a=state.ativo;if(a&&a.dev!==DEV&&a.fimEm>Date.now()){state.mode=a.modo;state.remainingMs=a.fimEm-Date.now();}}
      if(state.remainingMs<=0)state.remainingMs=duracao(state.mode);
      const held=new Promise(resolve=>releaseLock=resolve);running=true;window.__pomodoroRunning=true;lastTick=performance.now();lastWall=Date.now();lastSave=lastTick;
      persist();window.MASTER_AUTH?.flush?.('master_p2_hig_v2')?.catch?.(()=>{});interval=setInterval(()=>tick(),1000);render();await held;
    });
  }
  function pause(){if(!running)return;tick(true);release();persist();render();window.MASTER_AUTH?.flush?.('master_p2_hig_v2')?.catch?.(()=>{});}
  function configure(minutes){definir('foco',minutes);}
  function definir(campo,valor){
    if(!allowed()||!LIMITES[campo])return;
    const n=limitar(campo,valor);
    if(campo==='rodada'){state.rodada=n;state.feitos=Math.min(state.feitos,n);}
    else{const chave=campo==='foco'?'minutes':campo==='longo'?'longMinutes':'shortMinutes';state[chave]=n;}
    const modoDoCampo=campo==='foco'?'foco':campo==='longo'?'longo':campo==='curto'?'curto':null;
    if(modoDoCampo&&state.mode===modoDoCampo){if(running)pause();state.remainingMs=duracao(state.mode);}
    persist();render();
  }
  function ajustar(campo,passo){if(!state||!LIMITES[campo])return;definir(campo,(campo==='rodada'?state.rodada:minutosDe(campo==='foco'?'foco':campo))+passo);}
  function preset(nome){
    const escolha=PRESETS[nome];
    if(!escolha||!allowed())return;
    if(running)pause();
    [state.minutes,state.shortMinutes,state.longMinutes,state.rodada]=escolha;
    state.feitos=Math.min(state.feitos,state.rodada);state.remainingMs=duracao(state.mode);
    persist();render();
  }
  const PRESETS={classico:[25,5,15,4],curto:[15,3,10,4],longo:[50,10,20,3]};
  const ehPreset=nome=>{const v=PRESETS[nome];return !!v&&v[0]===state.minutes&&v[1]===state.shortMinutes&&v[2]===state.longMinutes&&v[3]===state.rodada;};
  function alternarAuto(){if(!allowed())return;state.auto=!state.auto;persist();render();}
  function trocarModo(modo){
    if(!allowed()||!MODOS[modo]||state.mode===modo)return;
    if(running)pause();
    state.mode=modo;state.remainingMs=duracao(modo);persist();render();
  }
  function pular(){
    if(!allowed())return;
    const proximo=proximoModo();
    if(running)pause();
    if(state.mode==='longo')state.feitos=0;
    state.mode=proximo;state.remainingMs=duracao(proximo);persist();render();
  }
  function reset(){if(!allowed())return;pause();state.remainingMs=duracao(state.mode);persist();render();}
  function floating(show){if(!allowed())return;state.floating=!!show;persist();render();if(!show&&document.getElementById('hig-overlay').hidden)document.getElementById('focus-top')?.focus();}

  function campoNum(campo,rotulo,sufixo){
    const [min,max]=LIMITES[campo],valor=campo==='rodada'?state.rodada:minutosDe(campo);
    return `<div class="focus-campo">
      <span class="focus-campo-rotulo" id="focus-rot-${campo}">${rotulo} <span class="focus-campo-sufixo">(${sufixo})</span></span>
      <div class="focus-stepper">
        <button type="button" class="focus-stepper-btn" onclick="FocusTimer.ajustar('${campo}',-1)" aria-label="Diminuir ${rotulo.toLowerCase()}">&minus;</button>
        <input class="focus-stepper-valor" type="number" inputmode="numeric" min="${min}" max="${max}" step="1" value="${valor}" data-focus-campo="${campo}" aria-labelledby="focus-rot-${campo}" onchange="FocusTimer.definir('${campo}',this.value)">
        <button type="button" class="focus-stepper-btn" onclick="FocusTimer.ajustar('${campo}',1)" aria-label="Aumentar ${rotulo.toLowerCase()}">+</button>
      </div>
    </div>`;
  }
  function pontos(){
    return Array.from({length:state.rodada},(_,i)=>`<span class="focus-ponto"${i<state.feitos?' data-feito="true"':''}></span>`).join('');
  }
  function textoCiclo(){
    const restantes=Math.max(0,state.rodada-state.feitos);
    if(state.mode==='longo')return 'Pausa longa: rodada completa.';
    return restantes<=0?'Próxima pausa é a longa.'
      :`${state.feitos} de ${state.rodada} blocos até a pausa longa`;
  }
  function panel(){
    return `<div class="focus-modos" role="group" aria-label="Etapa do pomodoro">${Object.entries(MODOS).map(([id,rotulo])=>`<button type="button" class="focus-modo" data-focus-mode-tab="${id}" aria-pressed="${state.mode===id}" onclick="FocusTimer.trocarModo('${id}')">${rotulo}</button>`).join('')}</div>
    <p class="focus-panel-time" data-focus-time>${format(state.remainingMs)}</p>
    <p class="focus-ciclo"><span class="focus-pontos" data-focus-dots aria-hidden="true">${pontos()}</span><span data-focus-ciclo-texto>${textoCiclo()}</span></p>
    <div class="btn-row"><button class="btn primary" data-focus-toggle onclick="FocusTimer.toggle()" type="button">${running?'Pausar':'Começar'}</button><button class="btn" onclick="FocusTimer.reset()" type="button">Reiniciar etapa</button><button class="btn" onclick="FocusTimer.pular()" type="button">Pular etapa</button></div>
    <p class="subtle">O tempo é registrado enquanto o pomodoro roda, inclusive ao navegar entre aulas. Ao recarregar ou fechar, a etapa fica pausada e o tempo já salvo é preservado.</p>
    <section class="focus-config" aria-label="Ajustes do pomodoro">
      <h3 class="focus-config-titulo">Seus tempos</h3>
      <div class="focus-campos">
        ${campoNum('foco','Foco','min')}
        ${campoNum('curto','Pausa curta','min')}
        ${campoNum('longo','Pausa longa','min')}
        ${campoNum('rodada','Pausa longa a cada','blocos')}
      </div>
      <div class="focus-presets"><span class="focus-campo-rotulo">Atalhos</span><div class="btn-row">${[['classico','25 · 5 · 15'],['curto','15 · 3 · 10'],['longo','50 · 10 · 20']].map(([id,rot])=>`<button type="button" class="btn" data-focus-preset="${id}" onclick="FocusTimer.preset('${id}')">${rot}</button>`).join('')}</div></div>
      <label class="focus-switch"><input type="checkbox" data-focus-auto ${state.auto?'checked':''} onchange="FocusTimer.alternarAuto()"><span>Começar a próxima etapa sozinho</span></label>
    </section>
    <div class="btn-row focus-extra"><button class="btn" onclick="FocusTimer.resetFloat()" type="button">Recentralizar flutuante</button><button class="btn" data-focus-floating onclick="FocusTimer.floating(!FocusTimer.status().floating)" type="button">${state.floating?'Ocultar':'Mostrar'} controle lateral</button></div>${historyMarkup()}`;
  }
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
    if(terminou!=='foco'){
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

  // Chips do aviso: sugestões do tipo de pausa proposto, sempre incluindo o
  // valor já configurado para o ajuste caber em um toque.
  function chipsDe(modo){
    const base=modo==='longo'?[10,15,20,30]:[3,5,10,15],atual=minutosDe(modo);
    return [...new Set([...base,atual])].sort((a,b)=>a-b);
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
        <span class="focus-end-break-label" data-focus-end-break-label>Descanso de</span>
        <div class="focus-end-chips" data-focus-end-chips role="group" aria-label="Minutos de descanso"></div>
      </div>
      <p class="focus-ciclo focus-end-ciclo"><span class="focus-pontos" data-focus-dots aria-hidden="true"></span><span data-focus-ciclo-texto></span></p>
      <div class="focus-end-actions">
        <button type="button" class="btn primary" data-focus-end-main></button>
        <button type="button" class="btn" data-focus-end-alt></button>
      </div></div>`;
    document.body.append(caixa);
    caixa.addEventListener('click',evento=>{
      if(evento.target===caixa||evento.target.closest('[data-focus-end-close]')){fecharFim();return;}
      const chip=evento.target.closest('[data-focus-break]');
      if(chip){definir(caixa.dataset.proximo==='longo'?'longo':'curto',Number(chip.dataset.focusBreak));return;}
      if(evento.target.closest('[data-focus-end-main]')){fecharFim();iniciarEtapa(caixa.dataset.proximo);return;}
      if(evento.target.closest('[data-focus-end-alt]')){const alt=caixa.dataset.proximo==='foco'?'curto':'foco';fecharFim();iniciarEtapa(alt);}
    });
    return caixa;
  }

  function avisarFim(terminou){
    if(!allowed())return;
    const caixa=caixaFim(),{titulo,detalhe}=mensagemFim(terminou),proximo=terminou==='foco'?(state.feitos>=state.rodada?'longo':'curto'):'foco';
    caixa.dataset.tipo=terminou;caixa.dataset.proximo=proximo;
    caixa.querySelector('[data-focus-end-kicker]').textContent=terminou==='foco'?'Pomodoro concluído':terminou==='longo'?'Pausa longa concluída':'Descanso concluído';
    caixa.querySelector('[data-focus-end-title]').textContent=titulo;
    caixa.querySelector('[data-focus-end-detail]').textContent=detalhe;
    caixa.querySelector('[data-focus-end-ask]').textContent=terminou==='foco'
      ? 'Hora do descanso ou vai continuar estudando?'
      : 'Voltar ao estudo ou esticar a pausa?';
    caixa.hidden=false;
    render();
    requestAnimationFrame(()=>caixa.querySelector('[data-focus-end-main]')?.focus());
    try{navigator.vibrate?.(terminou==='foco'?[90,70,90]:[90]);}catch{}
  }

  function fecharFim(){const caixa=document.getElementById('focus-end');if(caixa)caixa.hidden=true;}
  function definirDescanso(minutos){definir('curto',minutos);}
  function iniciarEtapa(modo){
    if(!allowed()||!MODOS[modo])return;
    pause();state.mode=modo;state.remainingMs=duracao(modo);persist();render();toggle();
  }
  function iniciarDescanso(){iniciarEtapa(state.mode==='foco'?proximoModo():state.mode==='longo'?'longo':'curto');}
  function iniciarFoco(){iniciarEtapa('foco');}

  function refreshHistory(){document.querySelectorAll('[data-focus-history]').forEach(el=>el.innerHTML=historyContent());}
  function render(){
    if(!state)return;
    const label=format(state.remainingMs);
    document.querySelectorAll('[data-focus-time],#timer-count').forEach(el=>el.textContent=label);
    document.querySelectorAll('[data-focus-toggle],#timer-toggle').forEach(el=>{el.textContent=running?'Pausar':remotoAtivo()?'Assumir aqui':'Começar';el.setAttribute('aria-label',running?'Pausar pomodoro':'Iniciar pomodoro');});
    document.querySelectorAll('[data-focus-mode-tab]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.focusModeTab===state.mode)));
    document.querySelectorAll('[data-focus-duration]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.focusDuration)===state.minutes)));
    document.querySelectorAll('[data-focus-break-duration]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.focusBreakDuration)===state.shortMinutes)));
    // Campos numéricos só são reescritos quando não estão sendo digitados.
    document.querySelectorAll('[data-focus-campo]').forEach(el=>{const campo=el.dataset.focusCampo,valor=String(campo==='rodada'?state.rodada:minutosDe(campo));if(el!==document.activeElement&&el.value!==valor)el.value=valor;});
    document.querySelectorAll('[data-focus-auto]').forEach(el=>{el.checked=state.auto;});
    document.querySelectorAll('[data-focus-preset]').forEach(el=>el.setAttribute('aria-pressed',String(ehPreset(el.dataset.focusPreset))));
    document.querySelectorAll('[data-focus-dots]').forEach(el=>{el.innerHTML=pontos();});
    document.querySelectorAll('[data-focus-ciclo-texto]').forEach(el=>{el.textContent=textoCiclo();});
    const aviso=document.getElementById('focus-end');
    if(aviso&&!aviso.hidden){
      const proximo=aviso.dataset.proximo||'curto',pausa=proximo!=='foco';
      const caixaChips=aviso.querySelector('[data-focus-end-chips]');
      const lista=pausa?chipsDe(proximo):[];
      const assinatura=lista.join(',')+'|'+proximo;
      if(caixaChips.dataset.assinatura!==assinatura){
        caixaChips.dataset.assinatura=assinatura;
        caixaChips.innerHTML=lista.map(n=>`<button type="button" class="focus-end-chip" data-focus-break="${n}" aria-pressed="false">${n} min</button>`).join('');
      }
      aviso.querySelector('[data-focus-end-break]').hidden=!pausa;
      aviso.querySelector('[data-focus-end-break-label]').textContent=proximo==='longo'?'Pausa longa de':'Descanso de';
      aviso.querySelector('[data-focus-end-main]').textContent=pausa
        ?`${proximo==='longo'?'Pausa longa de':'Descansar'} ${minutosDe(proximo)} min`
        :`Estudar ${state.minutes} min`;
      aviso.querySelector('[data-focus-end-alt]').textContent=pausa
        ?`Continuar estudando ${state.minutes} min`
        :`Mais ${state.shortMinutes} min de pausa`;
      aviso.querySelectorAll('.focus-end-chip').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.focusBreak)===minutosDe(proximo))));
    }
    document.querySelectorAll('[data-focus-mode-label]').forEach(el=>el.textContent=MODOS[state.mode]);
    document.querySelectorAll('[data-focus-mode-short]').forEach(el=>el.textContent=state.mode==='foco'?'Pomodoro':state.mode==='longo'?'Pausa longa':'Pausa');
    document.documentElement.dataset.focusMode=state.mode;
    document.querySelectorAll('[data-focus-floating]').forEach(el=>el.textContent=state.floating?'Ocultar controle lateral':'Mostrar controle lateral');
    const top=document.getElementById('focus-top');if(top){top.setAttribute('aria-label',`Abrir pomodoro: ${label}, ${MODOS[state.mode].toLowerCase()}, ${running?'em andamento':'pausado'}`);top.dataset.running=String(running);top.dataset.mode=state.mode;}
    const float=document.getElementById('focus-float');if(float){float.hidden=!state.floating||!allowed();float.dataset.running=String(running);float.dataset.mode=state.mode;placeFloat();}
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
  function init(){initFloat();reload();document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.getElementById('focus-end')?.hidden)fecharFim();});document.addEventListener('visibilitychange',()=>{if(running)tick(true);});window.addEventListener('pagehide',pause);window.addEventListener('beforeunload',pause);window.addEventListener('master-auth-ready',reload);window.addEventListener('master-remote-merge',e=>{if(e.detail?.key!=='master_p2_hig_v2')return;HIG.refreshFocus();const r=normalize(HIG.focusData());if(running){if(r.ativo&&r.ativo.dev!==DEV&&r.em>state.em){release();state=r;render();refreshHistory();iniciarEspelho();}}else{state=r;render();refreshHistory();iniciarEspelho();}window.Notas?.aplicar?.();});window.addEventListener('master-auth-ended',()=>{release();state=normalize();owner=null;render();refreshHistory();});window.addEventListener('storage',e=>{if(e.key==='master_p2_hig_v2'&&!running){HIG.refreshFocus();state=normalize(HIG.focusData());render();refreshHistory();}});}
  return {init,reload,render,toggle,pause,configure,definir,ajustar,preset,alternarAuto,trocarModo,pular,reset,floating,panel,historyMarkup,status,cancel,expand,resetFloat,definirDescanso,iniciarDescanso,iniciarFoco,iniciarEtapa,fecharFim,avisarFim};
})();
window.FocusTimer=FocusTimer;
window.addEventListener('DOMContentLoaded',FocusTimer.init);
