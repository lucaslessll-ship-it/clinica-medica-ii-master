/* Tutor: índice público sob demanda, histórico efêmero e proxy autenticado. */
(()=>{'use strict';
const script=document.currentScript,asset=new URL('ai-index.json',script.src);asset.search=new URL(script.src).search;
let dialog,launch,dock,hide,restore,returnFocus,history,input,status,send,welcome,loader=null,index=null,documents=[],byId=new Map(),controller=null,generation=0,owner=null;
const HIDDEN='master_ai_launcher_hidden_v1',NEWS='master_ai_news_20261116_lab20',WELCOME='master_ai_welcome_v1:';
const welcomeUsedThisSession=new Set();
let welcomeIntent='ask';
const pref=key=>{try{return localStorage.getItem(key)==='1';}catch{return false;}};
const savePref=key=>{try{localStorage.setItem(key,'1');}catch{}};
let concealed=pref(HIDDEN),newsDismissed=pref(NEWS);
const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const stops=new Set('a o os as um uma de do da dos das em no na nos nas e ou que qual quais como para por com sobre me isso esta este'.split(' '));
const auth=()=>window.MASTER_AUTH;
const unlocked=()=>!document.documentElement.classList.contains('master-auth-locked')&&!!auth()?.user();
let revealTarget=null;
function reveal(box){
 revealTarget=box;
 requestAnimationFrame(()=>{if(revealTarget!==box||!box.isConnected||!dialog.open)return;const top=box.getBoundingClientRect().top-history.getBoundingClientRect().top;history.scrollTop+=top;});
}
function message(who,text,sources=[]){
 if(who==='Assistente')history.querySelector('.ai-tutor-pending')?.remove();
 const box=document.createElement('article');box.className='ai-tutor-message';box.tabIndex=-1;
 const title=document.createElement('strong');title.textContent=who;box.append(title,document.createTextNode(text));
 const unique=[],used=new Set();
 for(const source of sources){const d=byId.get(source.id);if(d&&!used.has(d.lesson)){used.add(d.lesson);unique.push(d);}}
 if(unique.length){
  const links=document.createElement('nav');links.className='ai-tutor-sources';links.setAttribute('aria-label','Aulas consultadas');
  function sourceButton(d){const button=document.createElement('button');button.type='button';button.className='ai-tutor-source';button.textContent='Abrir aula: '+d.title;button.onclick=()=>openSource(d);return button;}
  links.append(sourceButton(unique[0]));
  if(unique.length>1){const more=document.createElement('details');more.className='ai-tutor-more-sources';const summary=document.createElement('summary');summary.textContent='Outras aulas consultadas ('+(unique.length-1)+')';more.append(summary);unique.slice(1).forEach(d=>more.append(sourceButton(d)));links.append(more);}
  box.append(links);
 }
 history.append(box);reveal(box);if(who==='Assistente'&&dialog.open)box.focus({preventScroll:true});return box;
}
function pendingMessage(){const box=document.createElement('article');box.className='ai-tutor-message ai-tutor-pending ai-tutor-dots';box.setAttribute('role','status');box.textContent='Consultando as aulas e preparando sua resposta';history.append(box);reveal(box);}
function state(text,busy=false){status.textContent=text;status.classList.toggle('ai-tutor-dots',busy);history.setAttribute('aria-busy',String(busy));const pending=history.querySelector('.ai-tutor-pending');if(pending&&busy)pending.textContent=text;send.disabled=busy;input.disabled=busy;dialog.querySelectorAll('[data-ai-mode]').forEach(b=>b.disabled=busy);}
async function load(){
 if(index)return;if(loader)return loader;
 loader=(async()=>{
  if(!window.MiniSearch){
   const library=url=>new Promise((resolve,reject)=>{const tag=document.createElement('script'),timer=setTimeout(()=>{tag.remove();reject(new Error('index'));},12000);tag.src=url;tag.onload=()=>{clearTimeout(timer);resolve();};tag.onerror=()=>{clearTimeout(timer);tag.remove();reject(new Error('index'));};document.head.append(tag);});
   try{await library('https://cdn.jsdelivr.net/npm/minisearch@7.2.0/dist/umd/index.js');}catch{await library(new URL('assets/vendor/minisearch-7.2.0.js',script.src));}
  }
  const result=await fetch(asset,{credentials:'omit'});if(!result.ok)throw new Error('index');documents=await result.json();byId=new Map(documents.map(d=>[d.id,d]));
  index=new MiniSearch({fields:['title','text'],storeFields:['title','text','lesson'],processTerm:t=>{const n=normalize(t);return stops.has(n)?null:n;},searchOptions:{boost:{title:3},fuzzy:0.2,prefix:true}});index.addAll(documents);
 })().catch(e=>{loader=null;throw e;});return loader;
}
function search(question){return index.search(question).slice(0,5).map(r=>byId.get(r.id));}
function current(){
 const main=document.getElementById('main-content'),route=location.hash.split('/')[0],heading=main?.querySelector('.pocus-title')?.textContent||main?.querySelector('h1')?.textContent||'';
 if(typeof ui!=='undefined'&&ui.route==='topic')return documents.find(d=>d.kind==='p2'&&d.topic===ui.topic&&d.chapter===ui.chapter)?.lesson;
 const pill=main?.querySelector('.chapter-pill.current')?.textContent.replace(/^[✓\s\d.]+/,'').trim();
 if(pill)return documents.find(d=>d.route===route&&d.title.endsWith(' · '+pill))?.lesson;
 return documents.find(d=>d.route===route&&d.title===heading)?.lesson;
}
async function openSource(d){await window.RouteAssets?.ensure(d.course);close();if(d.kind==='p1'){P1.openTopic(d.topic);P1.chapter(d.chapter);}else if(d.kind==='cir')CIR.openTopic(d.topic,d.chapter);else if(d.kind==='p2'){openTopic(d.topic);ui.chapter=d.chapter;render();}else{navigate(d.course);const courses={pocus:window.PocusCourse,ecg:window.ECGCourse,hemo:window.HemoCourse,atb:window.AtbCourse,rad:window.RadCourse};courses[d.course]?.open(d.module);}window.scrollTo({top:0,behavior:'instant'});document.querySelector('#main-content h1')?.focus({preventScroll:true});}
const errors={daily_limit:'Limite diário atingido, volta amanhã.',provider_busy:'O provedor atingiu o limite temporário. Tente mais tarde.',not_configured:'A IA ainda precisa da chave do provedor no Supabase. Você pode consultar as aulas encontradas abaixo.',bad_key:'A chave do provedor precisa ser revisada no Supabase.',auth:'Sua sessão expirou. Entre novamente.',usage:'Não foi possível conferir o limite diário. Tente novamente.',empty:'Reabra o assistente para atualizar o índice das aulas.',upstream:'O provedor não respondeu. Tente novamente.',unavailable:'A IA está indisponível no momento. Tente novamente.'};
async function ask(mode='ask'){
 if(controller||!unlocked())return;
 let question=input.value.trim(),submitted=false,timedOut=false,requestTimer;const mine=++generation,uid=auth().user().id,activeController=new AbortController();controller=activeController;state('Buscando nas aulas',true);
 const fail=(text,blocks=[],retry=false)=>{const box=message('Assistente',text,blocks);if(retry){const button=document.createElement('button');button.type='button';button.className='btn ai-tutor-retry';button.textContent='Tentar novamente';button.onclick=()=>{input.value=question;ask();};box.append(button);}};
 try{
  await load();if(mine!==generation||!unlocked()||auth().user().id!==uid)return;
  let blocks;
  if(mode!=='ask'){
   const lesson=current();if(!lesson){state('Abra uma aula para usar este atalho.');return;}blocks=documents.filter(d=>d.lesson===lesson).slice(0,5);
   const label=blocks[0].title;question=mode==='resumo'?`Resuma a aula ${label}, somente com os trechos disponíveis.`:mode==='questoes'?`Crie 3 questões de revisão com gabarito comentado sobre ${label}.`:`Destaque pontos de revisão e confusões importantes de ${label}. Não invente frequência em provas.`;
   question=question.slice(0,500);
  }else{
   if(question.length<3){state('Escreva uma pergunta com pelo menos 3 caracteres.');return;}const lesson=current();
   const refersToLesson=/\b(ess[ae]|est[ae]|iss[oa]|conte[uú]do|memorizar|mnem[oô]nico)\b/i.test(question);
   blocks=lesson&&refersToLesson?documents.filter(d=>d.lesson===lesson).slice(0,5):search(question);
  }
  submitted=true;input.blur();dialog.querySelector('.ai-tutor-help').open=false;dialog.querySelector('.ai-tutor-tools').open=false;dialog.querySelector('[data-ai-help-toggle]').setAttribute('aria-expanded','false');message('Você',question);input.value='';
  if(!blocks.length){message('Assistente','Isso não está no conteúdo do site encontrado pela busca. Tente mencionar o tema ou o nome da aula.\n\nDica de estudo: comece identificando a síndrome principal.');state('Nenhuma chamada à IA foi feita.');return;}
  pendingMessage();state('Preparando resposta',true);
  const client=auth().client(),session=await client.auth.getSession();const token=session.data?.session?.access_token;
  if(!token)throw new Error('auth');
  const config=window.MASTER_AUTH_CONFIG;
  requestTimer=setTimeout(()=>{timedOut=true;activeController.abort();},65000);
  const result=await fetch(config.url+'/functions/v1/ai-tutor',{method:'POST',headers:{Authorization:'Bearer '+token,apikey:config.publishableKey,'Content-Type':'application/json'},body:JSON.stringify({question,blocks:blocks.map(b=>({id:b.id})),lessonTitle:blocks[0].title}),signal:activeController.signal});
  let value;try{value=await result.json();}catch{throw new Error('upstream');}
  if(mine!==generation||!unlocked()||auth().user().id!==uid)return;
  if(!result.ok){fail(errors[value.error]||'Não foi possível responder agora.',blocks,['upstream','provider_busy','unavailable'].includes(value.error));state('As aulas encontradas estão disponíveis para consulta.');return;}
  if(typeof value.answer!=='string'||!value.answer.trim())throw new Error('upstream');
  const allowed=new Set(blocks.map(b=>b.id));const sources=Array.isArray(value.sources)?value.sources.filter(s=>allowed.has(s.id)):blocks;
  message('Assistente',value.answer,sources);state(Number.isFinite(value.remaining)?`${value.remaining} perguntas disponíveis hoje.`:'Resposta baseada nas aulas encontradas.');
 }catch(e){if(mine===generation&&(e.name!=='AbortError'||timedOut)){fail(timedOut?'A resposta demorou mais que o esperado. Tente novamente em instantes.':errors[e.message]||(e.message==='index'?'Não foi possível carregar a busca. Confira a conexão e tente novamente.':'Sem conexão ou serviço indisponível. Tente novamente.'),[],e.message!=='auth');state('Não foi possível concluir a pergunta.');}}
 finally{clearTimeout(requestTimer);if(mine===generation){controller=null;history.querySelector('.ai-tutor-pending')?.remove();history.setAttribute('aria-busy','false');send.disabled=false;input.disabled=false;dialog.querySelectorAll('[data-ai-mode]').forEach(b=>b.disabled=false);status.classList.remove('ai-tutor-dots');if(!submitted)input.focus();}}
}

function welcomeKey(){const id=auth()?.user()?.id;return id?WELCOME+id:null;}
function shouldWelcome(){
 const id=auth()?.user()?.id,key=welcomeKey();
 if(!id||!key||welcomeUsedThisSession.has(id))return false;
 try{return localStorage.getItem(key)!=='1';}catch{return true;}
}
function chooseWelcome(intent){
 welcomeIntent=['ask','resumo','questoes'].includes(intent)?intent:'ask';
 welcome?.querySelectorAll('[data-ai-intent]').forEach(button=>{
  button.setAttribute('aria-pressed',String(button.dataset.aiIntent===welcomeIntent));
 });
}
function finishWelcome({showHelp=false}={}){
 if(!welcome||welcome.hidden)return;
 const id=auth()?.user()?.id,key=welcomeKey();
 if(id)welcomeUsedThisSession.add(id);
 if(welcome.querySelector('[data-ai-never-show]')?.checked&&key){
  try{localStorage.setItem(key,'1');}catch{}
 }
 welcome.hidden=true;
 dialog.classList.remove('ai-tutor-intro');
 const help=dialog.querySelector('.ai-tutor-help');
 help.open=showHelp;
 dialog.querySelector('[data-ai-help-toggle]').setAttribute('aria-expanded',String(showHelp));
 if(showHelp){help.querySelector('summary')?.focus({preventScroll:true});}
 else if(welcomeIntent==='resumo'||welcomeIntent==='questoes'){
  dialog.querySelector('.ai-tutor-tools').open=true;
  state('Abra uma aula e toque no atalho de revisão. Nenhuma pergunta foi enviada.');
  dialog.querySelector('[data-ai-mode="'+welcomeIntent+'"]')?.focus({preventScroll:true});
 }else{input.focus({preventScroll:true});}
 load().catch(()=>state('A busca não carregou. Confira a conexão e tente novamente.'));
}

function restoreFocus(){if(!unlocked())return;const mobile=document.querySelector('#sidebar')?.inert&&returnFocus?.closest('#sidebar');const target=mobile?document.querySelector('.menu-button'):returnFocus?.isConnected&&returnFocus.getClientRects().length?returnFocus:!launch.hidden?launch:document.querySelector('[data-ai-open]');target?.focus({preventScroll:true});}
function close(){
 if(!dialog.open)return;
 if(window.MasterWindowMotion)window.MasterWindowMotion.hideDialog(dialog,restoreFocus);
 else{dialog.close();restoreFocus();}
}
function show(from=launch,help=false){
 if(!unlocked())return;
 returnFocus=from;
 if(typeof closeMobileNav==='function')closeMobileNav(false);
 const firstVisit=!help&&shouldWelcome();
 chooseWelcome('ask');
 welcome.hidden=!firstVisit;
 welcome.querySelector('[data-ai-never-show]').checked=false;
 dialog.classList.toggle('ai-tutor-intro',firstVisit);
 if(window.MasterWindowMotion)window.MasterWindowMotion.showDialog(dialog);
 else if(!dialog.open)dialog.showModal();
 dialog.querySelector('.ai-tutor-help').open=help;
 dialog.querySelector('[data-ai-help-toggle]').setAttribute('aria-expanded',String(help));
 if(firstVisit)welcome.querySelector('[data-ai-start]')?.focus({preventScroll:true});
 else{
  if(help)dialog.querySelector('.ai-tutor-help summary')?.focus({preventScroll:true});
  else input.focus({preventScroll:true});
  load().catch(()=>state('A busca não carregou. Confira a conexão e tente novamente.'));
 }
}
function installEntry(){const nav=document.getElementById('sidebar-nav');if(!nav||nav.querySelector('[data-ai-open]'))return;const entry=document.createElement('button');entry.type='button';entry.className='nav-destination ai-tutor-menu';entry.dataset.aiOpen='';entry.title='Assistente de estudo';entry.setAttribute('aria-haspopup','dialog');entry.setAttribute('aria-label','Assistente de estudo');entry.innerHTML=(window.StudyIcons?StudyIcons.robot():'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 4V1m-2 0h4M6 5h12a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3ZM1 10v5m22-5v5M8 10h.01M16 10h.01M8 15q4 3 8 0"/></svg>')+'<span>Assistente de estudo</span>';const first=nav.querySelector('.nav-group');if(first)first.after(entry);else nav.append(entry);}
function showNews(){const main=document.getElementById('main-content');if(!main||typeof ui==='undefined'||ui.route!=='dashboard'||!unlocked()||newsDismissed||main.querySelector('.ai-tutor-news'))return;const news=document.createElement('section');news.className='card pad ai-tutor-news';news.setAttribute('aria-label','Novas funções do MASTER');news.innerHTML='<div class="ai-tutor-news-head"><h2>Novidades do MASTER</h2><button type="button" class="btn" data-ai-dismiss aria-label="Dispensar aviso de novas funções">Dispensar</button></div><p class="ai-tutor-news-lead">Laboratório Master ampliado: 20 trilhas, laudos comentados e casos para praticar o raciocínio.</p><details class="ai-tutor-news-details"><summary>Ver o que mudou</summary><ul><li><strong>Assistente de estudo:</strong> encontre aulas e use atalhos de revisão em um só painel. Confira sempre a aula citada na resposta.</li><li><strong>POCUS:</strong> imagens do acervo em destaque, com treino por desenhos separado.</li><li><strong>Laboratório Master:</strong> 20 trilhas de interpretação, 26 novas aulas, laudos didáticos e casos em etapas.</li></ul></details><div class="btn-row"><button type="button" class="btn primary" onclick="navigate(\'labmaster\')">Explorar Laboratório Master</button><button type="button" class="btn" data-ai-open>Abrir assistente</button><button type="button" class="btn" data-ai-open data-ai-help>Como usar</button></div>';news.querySelector('[data-ai-dismiss]').onclick=()=>{newsDismissed=true;savePref(NEWS);news.remove();};main.prepend(news);}

function reset(){generation++;controller?.abort();controller=null;window.MasterWindowMotion?.cancel(dialog);if(dialog.open)dialog.close();history.replaceChildren();input.value='';owner=null;state('Pergunte sobre os conteúdos do site.');}
function sync(){const visible=unlocked();launch.hidden=!visible||concealed;dock.hidden=launch.hidden;restore.hidden=!visible||!concealed;dialog.querySelector('[data-ai-show]').hidden=!concealed;if(!visible){reset();return;}const uid=auth().user().id;if(owner&&owner!==uid)reset();owner=uid;installEntry();showNews();}
function init(){
 launch=document.createElement('button');launch.type='button';launch.className='ai-tutor-launch';launch.hidden=true;launch.setAttribute('aria-label','Abrir assistente de estudo');launch.setAttribute('aria-haspopup','dialog');const mascot=document.createElement('img');const robotURL=new URL('assets/assistant-robot-3d.webp',script.src);robotURL.search=new URL(script.src).search;mascot.src=robotURL.href;mascot.width=64;mascot.height=64;mascot.alt='';mascot.setAttribute('aria-hidden','true');mascot.decoding='async';mascot.draggable=false;launch.append(mascot);
 dialog=document.createElement('dialog');dialog.className='ai-tutor-dialog';
 dialog.addEventListener('cancel',event=>{event.preventDefault();close();});dialog.setAttribute('aria-labelledby','ai-tutor-title');dialog.setAttribute('aria-modal','true');dialog.setAttribute('role','dialog');dialog.innerHTML='<header class="ai-tutor-head"><div class="ai-tutor-head-brand"><img class="ai-tutor-head-robot" src="assets/assistant-robot-3d.webp" width="36" height="36" alt="" aria-hidden="true"><div><small>ESTUDO MASTER</small><h2 id="ai-tutor-title">Assistente de estudo</h2></div></div><button type="button" class="btn" data-ai-help-toggle aria-label="Como usar o assistente" aria-expanded="false" title="Como usar">?</button><button type="button" class="btn" data-ai-close aria-label="Fechar assistente" title="Fechar">×</button></header><details class="ai-tutor-help"><summary>Como usar o assistente</summary><ol><li>Escreva uma dúvida sobre as aulas. A busca local encontra trechos relacionados.</li><li>Dentro de uma aula, use os atalhos para resumo, questões ou pontos de revisão.</li><li>Confira a resposta e toque em Abrir aula para consultar a fonte completa.</li><li>O botão ao lado do boneco oculta o flutuante. Para mostrar de novo, toque no robô compacto ao lado do Pomodoro ou use o menu lateral.</li><li>Feche pelo X ou pela tecla Escape. O histórico não é mantido ao recarregar ou sair da conta.</li></ol><button type="button" class="btn" data-ai-show hidden>Mostrar assistente flutuante</button><p>Se houver aviso de ativação, as aulas encontradas continuam acessíveis enquanto as respostas por IA estão indisponíveis.</p></details><div class="ai-tutor-history" role="log" aria-live="polite" aria-relevant="additions"></div><p class="ai-tutor-status" role="status"></p><details class="ai-tutor-tools"><summary>Atalhos para esta aula</summary><div class="ai-tutor-actions"><button type="button" data-ai-mode="resumo">Resumir esta aula</button><button type="button" data-ai-mode="questoes">Me faça 3 questões sobre isso</button><button type="button" data-ai-mode="prova">O que mais cai disso na prova</button></div></details><form class="ai-tutor-form"><label for="ai-tutor-question">Sua dúvida sobre as aulas</label><textarea id="ai-tutor-question" maxlength="500" placeholder="Ex.: para que serve a manobra vagal?"></textarea><button class="ai-tutor-send" type="submit">Enviar</button></form><p class="ai-tutor-notice">Ferramenta de estudo. Não substitui supervisão clínica. </p><details class="ai-tutor-privacy"><summary>Privacidade e uso de dados</summary><p>São enviados ao provedor somente sua pergunta e trechos públicos das aulas. Não inclua dados de pacientes. O histórico fica apenas nesta sessão.</p></details>';
 welcome=document.createElement('section');
 welcome.className='ai-tutor-welcome';welcome.hidden=true;
 welcome.setAttribute('aria-labelledby','ai-tutor-welcome-title');
 welcome.innerHTML=
  '<div class="ai-tutor-welcome-main">'+
   '<img class="ai-tutor-welcome-robot" src="assets/assistant-robot-3d.webp" width="66" height="66" alt="" aria-hidden="true" draggable="false">'+
   '<p class="ai-tutor-welcome-kicker">SEU PARCEIRO DE ESTUDO</p>'+
   '<h3 id="ai-tutor-welcome-title">Como posso ajudar?</h3>'+
   '<p class="ai-tutor-welcome-description">Use os conteúdos da plataforma para avançar nos seus estudos.</p>'+
   '<div class="ai-tutor-welcome-choices" role="group" aria-label="Escolha como estudar">'+
    '<button type="button" data-ai-intent="ask" aria-pressed="true"><span class="ai-tutor-choice-icon" aria-hidden="true">?</span><span><strong>Tirar dúvidas</strong><small>Entenda conceitos e diferenças.</small></span></button>'+
    '<button type="button" data-ai-intent="resumo" aria-pressed="false"><span class="ai-tutor-choice-icon" aria-hidden="true">≡</span><span><strong>Resumir aulas</strong><small>Revise os pontos principais.</small></span></button>'+
    '<button type="button" data-ai-intent="questoes" aria-pressed="false"><span class="ai-tutor-choice-icon" aria-hidden="true">✓</span><span><strong>Praticar questões</strong><small>Treine e confira as fontes.</small></span></button>'+
   '</div>'+
  '</div>'+
  '<div class="ai-tutor-welcome-footer">'+
   '<label class="ai-tutor-welcome-never"><input type="checkbox" data-ai-never-show>Não mostrar novamente</label>'+
   '<button type="button" class="ai-tutor-welcome-start" data-ai-start>Começar</button>'+
  '</div>'+
  '<p class="ai-tutor-welcome-footnote">O assistente usa as aulas do site. Confira sempre as fontes e não compartilhe dados de pacientes.</p>';
 dialog.querySelector('.ai-tutor-head').after(welcome);
 welcome.querySelectorAll('[data-ai-intent]').forEach(b=>b.onclick=()=>chooseWelcome(b.dataset.aiIntent));
 welcome.querySelector('[data-ai-start]').onclick=()=>finishWelcome();
 const privacy=dialog.querySelector('.ai-tutor-privacy');dialog.querySelector('.ai-tutor-help').append(privacy);
 dialog.querySelector('[data-ai-help-toggle]').onclick=()=>{if(!welcome.hidden){finishWelcome({showHelp:true});return;}const help=dialog.querySelector('.ai-tutor-help');help.open=!help.open;dialog.querySelector('[data-ai-help-toggle]').setAttribute('aria-expanded',String(help.open));};
 dialog.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const items=[...dialog.querySelectorAll('button:not([disabled]),textarea:not([disabled]),a[href],summary')].filter(el=>el.getClientRects().length);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}});
 dock=document.createElement('aside');dock.className='ai-tutor-dock';dock.setAttribute('aria-label','Assistente flutuante');hide=document.createElement('button');hide.type='button';hide.className='ai-tutor-hide';hide.setAttribute('aria-label','Ocultar assistente flutuante');hide.title='Ocultar. Você pode abrir pelo menu lateral.';hide.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg>';hide.onclick=()=>{concealed=true;savePref(HIDDEN);sync();restore.focus({preventScroll:true});if(typeof toast==='function')toast('Robô recolhido ao lado do Pomodoro.');};dock.append(launch,hide);document.body.append(dock,dialog);history=dialog.querySelector('.ai-tutor-history');input=dialog.querySelector('textarea');status=dialog.querySelector('.ai-tutor-status');send=dialog.querySelector('[type=submit]');
 function revealFloating(){concealed=false;try{localStorage.removeItem(HIDDEN);}catch{}sync();if(dialog.open)dialog.querySelector('[data-ai-help-toggle]').focus();else launch.focus({preventScroll:true});}
 restore=document.createElement('button');restore.id='ai-tutor-restore';restore.type='button';restore.className='ai-tutor-restore';restore.hidden=true;restore.setAttribute('aria-label','Mostrar robô de IA');restore.title='Mostrar assistente flutuante';const mini=mascot.cloneNode(true);mini.width=28;mini.height=28;restore.append(mini);restore.onclick=revealFloating;document.getElementById('focus-top').after(restore);
 dialog.querySelector('[data-ai-show]').onclick=revealFloating;launch.onclick=()=>show(launch);dialog.querySelector('[data-ai-close]').onclick=close;dialog.addEventListener('close',restoreFocus);dialog.querySelector('form').onsubmit=e=>{e.preventDefault();ask();};dialog.querySelectorAll('[data-ai-mode]').forEach(b=>b.onclick=()=>ask(b.dataset.aiMode));
 function fitViewport(){const viewport=window.visualViewport;dialog.style.setProperty('--ai-tutor-vh',(viewport?.height||innerHeight)+'px');dialog.style.setProperty('--ai-tutor-vtop',(viewport?.offsetTop||0)+'px');}fitViewport();window.addEventListener('resize',fitViewport);window.visualViewport?.addEventListener('resize',fitViewport);window.visualViewport?.addEventListener('scroll',fitViewport);
 window.addEventListener('master-auth-ended',sync);window.addEventListener('master-auth-ready',sync);new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['class']});new MutationObserver(installEntry).observe(document.getElementById('sidebar-nav'),{childList:true});new MutationObserver(showNews).observe(document.getElementById('main-content'),{childList:true});document.addEventListener('click',e=>{const button=e.target.closest('[data-ai-open]');if(button)show(button,button.hasAttribute('data-ai-help'));});sync();
 window.AITutor={search:async q=>{await load();return search(q);},current,openSource};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
