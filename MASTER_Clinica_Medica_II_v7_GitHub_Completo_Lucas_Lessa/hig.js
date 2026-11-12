/**
 * MASTER P2 / Experience Layer v2 — Lucas Lessa
 * Progressive enhancements inspired by Apple Human Interface Guidelines.
 * Original academic content and scoring remain in app.js; no data is transmitted.
 */
'use strict';
const HIG = (() => {
  const UX_KEY='master_p2_hig_v2';
  const defaults={theme:'light',font:'normal',contrast:false,motion:false,collapsed:false,focus:false,notes:{},bookmarks:{},lastTopic:'neuro1',lastChapter:0,sessionMinutes:25,sessionSpent:0};
  let preferences=load(),modalType='',modalFocus=null,timer=null,seconds=0,timerRunning=false,searchItems=[],activeResult=0;
  function load(){try{let v=JSON.parse(localStorage.getItem(UX_KEY));return {...defaults,...(v&&typeof v==='object'?v:{}),notes:{...defaults.notes,...(v?.notes||{})},bookmarks:{...defaults.bookmarks,...(v?.bookmarks||{})}}}catch{return {...defaults}}}
  function save(){try{localStorage.setItem(UX_KEY,JSON.stringify(preferences))}catch{toast('O navegador não permitiu salvar esta preferência.') }}
  function setTheme(mode){preferences.theme=mode;applyPrefs();save();refreshSettings();}
  function setFont(size){preferences.font=size;applyPrefs();save();refreshSettings();}
  function togglePref(key){preferences[key]=!preferences[key];applyPrefs();save();refreshSettings();}
  function applyPrefs(){
    const body=document.body;
    body.dataset.theme=preferences.theme==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):preferences.theme;
    body.dataset.textSize=preferences.font;
    body.classList.toggle('high-contrast',!!preferences.contrast);
    body.classList.toggle('reduce-motion',!!preferences.motion);
    body.classList.toggle('side-collapsed',!!preferences.collapsed);
    body.classList.toggle('focus-mode',!!preferences.focus);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',body.dataset.theme==='dark'?'#111d23':'#f7fafb');
  }
  function toggleSidebar(){preferences.collapsed=!preferences.collapsed;save();applyPrefs()}
  function toggleFocus(){preferences.focus=!preferences.focus;save();applyPrefs();toast(preferences.focus?'Concentração ativada. Pressione F para sair.':'Modo de concentração encerrado.');}
  function openOverlay(name,content){
    modalType=name;modalFocus=document.activeElement;
    const overlay=document.getElementById('hig-overlay');
    document.getElementById('hig-dialog-title').textContent=name==='search'?'Buscar conteúdo':name==='settings'?'Preferências': 'Atalhos de teclado';
    document.getElementById('hig-dialog-content').innerHTML=content;
    overlay.hidden=false;document.body.classList.add('modal-open');
    requestAnimationFrame(()=>{let target=name==='search'?document.getElementById('global-search'):overlay.querySelector('.hig-dialog .icon-button');target?.focus()});
  }
  function closeOverlay(){document.getElementById('hig-overlay').hidden=true;document.body.classList.remove('modal-open');modalType='';modalFocus?.focus();}
  function makeSearchItems(){
    let arr=[];
    TOPICS.forEach(t=>{
      arr.push({type:'Módulo',label:t.title,sub:t.subtitle,icon:'▤',action:()=>openTopic(t.id),text:[t.title,t.area,t.subtitle,t.blueprint.join(' ')]});
      t.chapters.forEach((c,i)=>arr.push({type:'Aula',label:c.name,sub:t.short+' · '+c.anchor,icon:'▧',action:()=>{openTopic(t.id);switchChapter(i)},text:[c.name,c.anchor,c.why,c.clinic,c.patho,c.tests,c.strategy,c.memory,c.exam,...Object.values(DEEP.chapters[`${t.id}_${i}`]||{})]}))
    });
    QUESTION_BANK.forEach((q,i)=>arr.push({type:'Questão',label:q.tag||'Questão clínica',sub:getTopic(q.t).short+' · N'+q.level+' · '+q.q.slice(0,100),icon:'◈',action:()=>{ui.practice={tid:q.t,ids:[i],step:0,chosen:null,revealed:false,optionOrders:{}};navigate('practice')},text:[q.q,q.tag,q.why]}));
    if(window.P1)arr.push(...P1.searchItems());
    return arr;
  }
  function norm(x){return String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
  function searchMarkup(v){
    const text=norm(v).trim();let filtered=[];
    if(text.length){filtered=searchItems.map(item=>({item,score:(norm(item.label).startsWith(text)?6:0)+(norm(item.label).includes(text)?4:0)+(norm(item.sub).includes(text)?2:0)+(item.text.some(t=>norm(t).includes(text))?1:0)})).filter(x=>x.score).sort((a,b)=>b.score-a.score).slice(0,12).map(x=>x.item)}
    else filtered=searchItems.filter(x=>x.type==='Módulo');
    activeResult=0; window.__masterSearchResults=filtered;
    const summary=text?`${filtered.length} resultado(s) para sua busca`:'Sugestões para começar';
    return `<div class="search-section-title">${summary}</div><div class="search-result-list" role="listbox" id="search-result-list" aria-label="Resultados da busca">${filtered.length?filtered.map((x,i)=>`<button role="option" aria-selected="${i===activeResult}" type="button" class="search-result ${i===activeResult?'selected':''}" onclick="HIG.chooseResult(${i})"><span class="result-icon" aria-hidden="true">${x.icon}</span><span><strong>${escapeHtml(x.label)}</strong><small>${escapeHtml(x.type+' · '+x.sub)}</small></span><span aria-hidden="true">↗</span></button>`).join(''):'<div class="search-empty">Nenhum resultado. Experimente “miastenia”, “nefrite”, “síncope” ou “quimioterapia”.</div>'}</div>`;
  }
  function openSearch(){searchItems=makeSearchItems();openOverlay('search',`<div class="search-field-wrap"><span aria-hidden="true">⌕</span><input id="global-search" type="search" role="combobox" aria-expanded="true" aria-controls="search-result-list" aria-label="Termo clínico para pesquisar" placeholder="Diagnóstico, tema, exame ou conduta…" autocomplete="off" oninput="HIG.searchInput()" onkeydown="HIG.searchKeys(event)"/><kbd>ESC</kbd></div><div id="search-results">${searchMarkup('')}</div><div class="dialog-footnote">Busque nas ${TOPICS.reduce((n,t)=>n+t.chapters.length,0)+window.MASTER_P1_DATA.topics.reduce((n,t)=>n+t.chapters.length,0)} aulas, ${TOPICS.length+window.MASTER_P1_DATA.topics.length} módulos e ${QUESTION_BANK.length+window.MASTER_P1_QUESTIONS.length} questões. A busca acontece somente no seu dispositivo.</div>`);}
  function searchInput(){const val=document.getElementById('global-search')?.value||'';document.getElementById('search-results').innerHTML=searchMarkup(val)}
  function searchKeys(e){let list=window.__masterSearchResults||[];if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();activeResult=(activeResult+(e.key==='ArrowDown'?1:-1)+list.length)%Math.max(list.length,1);document.querySelectorAll('.search-result').forEach((b,i)=>{b.classList.toggle('selected',i===activeResult);b.setAttribute('aria-selected',String(i===activeResult))});document.querySelectorAll('.search-result')[activeResult]?.scrollIntoView({block:'nearest'})}else if(e.key==='Enter'){e.preventDefault();chooseResult(activeResult)}}
  function chooseResult(i){let x=window.__masterSearchResults?.[i];if(!x)return;closeOverlay();x.action();}
  function settingsMarkup(){
    const groups=[['Aparência','Escolha o visual adequado ao seu dispositivo.',[['Clara','light'],['Escura','dark'],['Automática','system']]],['Tamanho de leitura','Amplie as aulas sem perder as informações clínicas.',[['Padrão','normal'],['Grande','large'],['Extra','xlarge'],['200%','xxlarge']]]];
    return `<div class="settings-group"><h3>${groups[0][0]}</h3><p>${groups[0][1]}</p><div class="segmented" role="group" aria-label="Tema de aparência">${groups[0][2].map(([x,k])=>`<button type="button" aria-pressed="${preferences.theme===k}" class="${preferences.theme===k?'selected':''}" onclick="HIG.setTheme('${k}')">${x}</button>`).join('')}</div></div>
      <div class="settings-group"><h3>${groups[1][0]}</h3><p>${groups[1][1]}</p><div class="segmented" role="group" aria-label="Tamanho do conteúdo">${groups[1][2].map(([x,k])=>`<button type="button" aria-pressed="${preferences.font===k}" class="${preferences.font===k?'selected':''}" onclick="HIG.setFont('${k}')">${x}</button>`).join('')}</div></div>
      <div class="settings-group"><h3>Acessibilidade e concentração</h3><p>Preferências locais, independentes do navegador.</p>
        <label class="setting-switch"><span><strong>Mais contraste</strong><small>Bordas, textos e estados mais nítidos.</small></span><input type="checkbox" ${preferences.contrast?'checked':''} onchange="HIG.togglePref('contrast')" aria-label="Ativar contraste aumentado"><span class="switch-track"></span></label>
        <label class="setting-switch"><span><strong>Reduzir movimentos</strong><small>Desativa animações decorativas.</small></span><input type="checkbox" ${preferences.motion?'checked':''} onchange="HIG.togglePref('motion')" aria-label="Reduzir movimentos"><span class="switch-track"></span></label>
        <label class="setting-switch"><span><strong>Menu compacto</strong><small>Mais espaço para o texto das aulas.</small></span><input type="checkbox" ${preferences.collapsed?'checked':''} onchange="HIG.togglePref('collapsed')" aria-label="Recolher menu lateral"><span class="switch-track"></span></label>
      </div><div class="settings-group"><h3>Seus dados</h3><p>Notas, desempenho e preferências ficam no dispositivo. Nenhum dado é enviado a servidores.</p><div class="btn-row"><button class="btn secondary" onclick="HIG.exportBackup()">Exportar backup completo</button><button class="btn" onclick="document.getElementById('progress-import-input').click()">Importar backup</button><button class="btn" onclick="HIG.openHelp()">Ver atalhos</button></div></div>`;
  }
  function openSettings(){openOverlay('settings',settingsMarkup())}
  function refreshSettings(){if(modalType==='settings')document.getElementById('hig-dialog-content').innerHTML=settingsMarkup()}
  function openHelp(){openOverlay('help',`<div class="shortcut-list">${[['⌘/Ctrl + K','Buscar todo o conteúdo'],['/','Buscar, quando fora de um campo'],['F','Ativar/desativar modo de concentração'],['?','Abrir estes atalhos'],['Esc','Fechar janela ou menu'],['↑ ↓ e Enter','Percorrer resultados da busca']].map(([key,what])=>`<div><kbd>${key}</kbd><span>${what}</span></div>`).join('')}</div><p class="dialog-footnote">Todos os comandos também podem ser acessados por botões, sem necessidade de teclado.</p>`)}
  function footerAndTabs(){document.querySelectorAll('#mobile-tabbar [data-tab]').forEach(b=>{const active=ui.route===b.dataset.tab||(ui.route==='topic'&&b.dataset.tab==='topics');b.classList.toggle('active',active);b.setAttribute('aria-current',active?'page':'false')});}
  function afterRender(){footerAndTabs();if(ui.route==='topic'){preferences.lastTopic=ui.topic;preferences.lastChapter=ui.chapter;preferences.lastStudy='P2';preferences.studyStarted=true;save()}else if(ui.route==='p1topic'){preferences.lastStudy='P1';preferences.studyStarted=true;save()}const focusToggle=document.querySelector('.focus-trigger');if(focusToggle)focusToggle.setAttribute('aria-pressed',String(preferences.focus));}
  function lessonToolbar(t,ci,c){
    const key=t.id+'_'+ci;const marked=!!preferences.bookmarks[key];const count=Object.values(c).join(' ').split(/\s+/).length;const minutes=Math.max(3,Math.ceil(count/180));
    return `<div class="lesson-toolbar"><span>◷ ${minutes} min de leitura estimada</span><div class="lesson-toolbar-actions"><button class="plain-pill" type="button" aria-pressed="${marked}" onclick="HIG.bookmark('${key}')">${marked?'★ Salvo na biblioteca':'☆ Salvar para revisão'}</button><button class="plain-pill" type="button" onclick="HIG.toggleFocus()">⛶ Leitura focada</button></div></div>`;
  }
  function lessonNotes(t,idx){const key=t.id+'_'+idx,old=preferences.notes[key]||'';return `<div class="lesson-caderno"><details ${old?'open':''}><summary>✎ Meu caderno desta aula <span class="note-meta">${old?'Anotações salvas':'Adicionar anotações pessoais'}</span></summary><label for="chapter-note" class="field-label">O que eu preciso lembrar na P2?</label><textarea id="chapter-note" class="answer-box" rows="5" placeholder="Escreva com suas palavras: diagnóstico diferencial, critérios, exceções, conduta e armadilhas…" oninput="HIG.saveNote('${key}',this.value)">${escapeHtml(old)}</textarea><div class="note-tip">Salvamento automático neste navegador. Faça backup em Preferências.</div></details></div>`}
  function saveNote(key,val){preferences.notes[key]=val;save();const info=document.querySelector('.note-meta');if(info)info.textContent='Salvo automaticamente';}
  function bookmark(key){preferences.bookmarks[key]=!preferences.bookmarks[key];save();render();toast(preferences.bookmarks[key]?'Adicionado às revisões.':'Retirado das revisões.');}
  function resumeInfo(){
    if(preferences.lastStudy==='P1'&&window.P1)return {...P1.resumeInfo(),started:true};
    const t=getTopic(preferences.lastTopic),i=Math.max(0,Math.min(Number(preferences.lastChapter)||0,t.chapters.length-1));
    return {title:t.title,chapter:`P2 · Aula ${i+1}: ${t.chapters[i].name}`,started:!!preferences.studyStarted||!!preferences.lastChapter||Object.values(store.completed).some(Boolean)};
  }
  function openLast(){
    if(preferences.lastStudy==='P1'&&window.P1){P1.resume();return}
    const t=getTopic(preferences.lastTopic),i=Math.max(0,Math.min(Number(preferences.lastChapter)||0,t.chapters.length-1));
    ui.topic=t.id;ui.chapter=i;navigate('topic',t.id);
  }
  function dueCards(){return FLASH_DECK.filter(flashDue).length}
  function focusTopic(){let ranks=TOPICS.map(t=>({t,perf:resultForTopic(t.id)}));let untouched=ranks.filter(o=>o.perf.done===0);if(untouched.length){let base=['neuro1','neuro2','reuma2','onco','reuma1','neuro3','gastro','hema'];return base.map(id=>untouched.find(o=>o.t.id===id)).find(Boolean)?.t||untouched[0].t;}return ranks.sort((a,b)=>a.perf.value-b.perf.value)[0].t}
  function viewToday(){let g=globalProgress(),low=focusTopic(),due=dueCards();let tasks=[{num:'01',tag:'Teoria',title:`Aprofundar ${low.short}`,detail:'Fisiopatologia → sinais de alarme → exame decisivo → conduta.',time:'30–40 min',act:`openTopic('${low.id}')`,button:'Abrir aula'},{num:'02',tag:'Recuperação',title:'Questões clínicas N2/N3',detail:'Responder antes de ver o gabarito e justificar por que as outras opções estão erradas.',time:'20 min',act:`startPractice('${low.id}')`,button:'Treinar'},{num:'03',tag:'Memorização',title:`${due} flashcards disponíveis`,detail:'Testar recordação antes de virar, depois classificar a revisão.',time:'15 min',act:"navigate('flashcards')",button:'Revisar'},{num:'04',tag:'Profundidade',title:'Resposta discursiva e prova oral',detail:'Usar roteiro: síndrome, mecanismo, dado discriminador, exames, conduta e exceção.',time:'20 min',act:"navigate('discursive')",button:'Praticar'}];
    return header('PLANO ADAPTATIVO · P2','Seu estudo de <em>hoje.</em>','Uma sequência simples, orientada pelo seu progresso real — sem previsão fictícia de incidência em provas.')+
      `<div class="daily-hero"><div><span class="kicker">ESTAÇÃO DO DIA · ${new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'})}</span><h2>Uma aula bem aprendida é melhor que cinco apenas lidas.</h2><p>Pratique a decisão clínica, depois a justificativa. A ordem adapta-se às respostas guardadas no navegador.</p></div><div class="daily-score"><strong>${g.value}%</strong><span>domínio do banco</span></div></div>`+
      section('Sua trilha guiada',`<div class="daily-grid">${tasks.map(x=>`<article class="daily-card"><span class="daily-counter">${x.num} / ${x.tag} <small>${x.time}</small></span><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.detail)}</p><button class="btn secondary" type="button" onclick="${x.act}">${x.button} ↗</button></article>`).join('')}</div>`)+
      section('Concentrar por blocos de tempo',`<div class="card pad"><div class="timer-wrap"><div><h3>Temporizador discreto</h3><p class="subtle">Escolha seu intervalo. O tempo é controlado no próprio navegador, sem notificações intrusivas.</p><div class="btn-row"><button class="btn" onclick="HIG.configureTimer(25)">25 min</button><button class="btn" onclick="HIG.configureTimer(45)">45 min</button><button class="btn" onclick="HIG.configureTimer(60)">60 min</button></div></div><div class="timer-control"><div id="timer-count" aria-live="off">${timeFormat(seconds||preferences.sessionMinutes*60)}</div><button id="timer-toggle" class="btn primary" onclick="HIG.toggleTimer()">${timerRunning?'Pausar':'Começar'}</button><button class="btn ghost" onclick="HIG.resetTimer()">Reiniciar</button></div></div></div>`)+
      section('Como a prioridade foi calculada',`<div class="insight"><p>Selecionamos primeiro os módulos ainda não estudados e, depois, os que têm menor desempenho nas questões respondidas. A sequência inicial favorece síncope/crise convulsiva, Guillain-Barré e autoimunidade por seu valor pedagógico. <strong>Ela não representa um ranking de cobrança real da P2.</strong></p></div>`);
  }
  function timeFormat(s){let m=Math.floor(s/60),sec=s%60;return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0')}
  function configureTimer(n){if(timerRunning){clearInterval(timer);timerRunning=false}preferences.sessionMinutes=n;seconds=n*60;save();updateTimer()}
  function toggleTimer(){if(timerRunning){clearInterval(timer);timerRunning=false;updateTimer();return}if(seconds<=0)seconds=preferences.sessionMinutes*60;timerRunning=true;timer=setInterval(()=>{seconds--;if(seconds<=0){seconds=0;clearInterval(timer);timerRunning=false;preferences.sessionSpent+=preferences.sessionMinutes;save();toast('Ciclo de estudo concluído. Faça uma breve pausa.')}updateTimer()},1000);updateTimer()}
  function resetTimer(){if(timerRunning)clearInterval(timer);timerRunning=false;seconds=preferences.sessionMinutes*60;updateTimer()}
  function updateTimer(){let e=document.getElementById('timer-count'),b=document.getElementById('timer-toggle');if(e)e.textContent=timeFormat(seconds);if(b)b.textContent=timerRunning?'Pausar':'Começar'}
  function viewNotes(){let all=TOPICS.flatMap(t=>t.chapters.map((ch,i)=>({t,ch,i,key:t.id+'_'+i,note:preferences.notes[t.id+'_'+i]||'',bookmarked:!!preferences.bookmarks[t.id+'_'+i]})));const marked=all.filter(x=>x.bookmarked||x.note.trim());return header('BIBLIOTECA PESSOAL','Seu caderno <em>de revisão.</em>','Reúna suas anotações, aulas salvas e pontos que precisam de uma segunda leitura.')+
      `<div class="card pad" style="margin-bottom:18px"><div class="status-row"><span class="subtle">${marked.length} aulas com notas ou marcações • ${all.length} aulas disponíveis</span><button class="btn secondary" onclick="HIG.exportNotes()">↓ Exportar caderno em Markdown</button></div></div>`+
      (marked.length?`<div class="notes-grid">${marked.map(x=>`<article class="note-card"><div class="note-overline">${x.bookmarked?'★ SALVO PARA REVISÃO':'✎ ANOTAÇÕES'} · ${escapeHtml(x.t.area)}</div><h3>${escapeHtml(x.ch.name)}</h3><p>${escapeHtml((x.note||x.ch.memory).slice(0,240))}${(x.note||x.ch.memory).length>240?'…':''}</p><button class="btn" onclick="openTopic('${x.t.id}');switchChapter(${x.i})">Abrir aula ↗</button></article>`).join('')}</div>`:`<div class="empty-state"><strong>Seu caderno está pronto.</strong><p>Abra uma aula, marque ☆ Salvar para revisão ou escreva suas anotações.</p><button class="btn primary" onclick="navigate('topics')">Explorar as 22 aulas</button></div>`);
  }
  function exportNotes(){let lines=['# MASTER P2 — Meu caderno de revisão','',`Exportado: ${new Date().toLocaleString('pt-BR')}`,''];TOPICS.forEach(t=>t.chapters.forEach((c,i)=>{let key=t.id+'_'+i,n=preferences.notes[key],b=preferences.bookmarks[key];if(n||b){lines.push(`## ${t.title} — ${c.name}`,b?'> ★ Salvo para revisão':'',n||'_Sem anotações pessoais_','')}}));download('MASTER_P2_Caderno_Lucas_Lessa.md',lines.join('\n'),'text/markdown;charset=utf-8');toast('Caderno exportado.')}
  function download(name,content,type){const blob=new Blob([content],{type});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500)}
  function exportBackup(){let obj={app:'MASTER_P2_Lucas_Lessa',version:'4.0-P2-P1',exportedAt:new Date().toISOString(),data:store,experience:preferences,p1:window.P1?.getBackup()};download('MASTER_P2_Backup_Completo.json',JSON.stringify(obj,null,2),'application/json');toast('Backup completo exportado.')}
  async function importProgress(event){const f=event?.target?.files?.[0];if(!f)return;if(f.size>3_000_000){toast('Arquivo muito grande para um backup de progresso.');return}try{let v=JSON.parse(await f.text());if(v.app!=='MASTER_P2_Lucas_Lessa'||!v.data||typeof v.data!=='object'||!v.data.results||!v.data.completed){throw new Error('Formato de backup incompatível')}if(!confirm('Substituir o progresso atual pelos dados deste backup? Exporte antes seus dados atuais, se quiser guardá-los.'))return;store={...store,...v.data};stateSave();if(v.p1&&window.P1)P1.restoreBackup(v.p1);if(v.experience&&typeof v.experience==='object'){preferences={...preferences,...v.experience,notes:{...preferences.notes,...(v.experience.notes||{})},bookmarks:{...preferences.bookmarks,...(v.experience.bookmarks||{})}};save();applyPrefs()}ui.exam=null;ui.practice=null;ui.flashDeck=[];closeOverlay();render();toast('Backup restaurado com sucesso.')}catch(e){toast('Não foi possível importar: '+e.message)}finally{event.target.value=''}}
  function init(){applyPrefs();searchItems=makeSearchItems();if(!seconds)seconds=preferences.sessionMinutes*60;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(preferences.theme==='system')applyPrefs()});
    document.addEventListener('keydown',e=>{
      if(document.documentElement.classList.contains('master-auth-locked'))return;
      if(document.getElementById('hig-overlay').hidden===false){if(e.key==='Escape'){e.preventDefault();closeOverlay()}if(e.key==='Tab'){let el=Array.from(document.querySelectorAll('#hig-overlay button:not([disabled]),#hig-overlay input:not([disabled])'));if(el.length){let first=el[0],last=el[el.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}return}
      if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch();return}
      if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
      if(e.key==='/'){e.preventDefault();openSearch()}else if(e.key.toLowerCase()==='f'&&!e.metaKey&&!e.ctrlKey){e.preventDefault();toggleFocus()}else if(e.key==='?'&&!e.metaKey&&!e.ctrlKey){openHelp()}
    });
  }
  function reload(){clearInterval(timer);timer=null;timerRunning=false;preferences=load();seconds=preferences.sessionMinutes*60;applyPrefs();}
  return {reload,init,afterRender,openSearch,searchInput,searchKeys,chooseResult,openSettings,openHelp,closeOverlay,setTheme,setFont,togglePref,toggleSidebar,toggleFocus,lessonToolbar,lessonNotes,saveNote,bookmark,viewToday,viewNotes,configureTimer,toggleTimer,resetTimer,exportNotes,exportBackup,importProgress,openLast,resumeInfo,focusTopic,dueCards};
})();
window.HIG=HIG;
window.addEventListener('DOMContentLoaded',HIG.init);
