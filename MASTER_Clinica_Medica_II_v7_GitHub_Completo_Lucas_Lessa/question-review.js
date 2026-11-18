/* Central de questões. Reutiliza os resultados e a sincronização da conta existentes.
   Um acerto encerra a pendência; um novo erro agenda outra tentativa para amanhã. */
const QuestionReview=(()=>{
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text=s=>String(s??'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const day=(plus=0,at=Date.now())=>{const d=new Date(at);d.setHours(0,0,0,0);d.setDate(d.getDate()+plus);return d.getTime();};
const data=()=>window.HIG?.questionReview?.()||{sessions:[]};
const log=()=>window.HIG?.qlog?.()||{};
const save=()=>window.HIG?.qlogSave?.();
const banks=()=>QNav.catalogos();
const key=q=>q.b+':'+q.id;
const nowLabel=t=>new Date(t).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
let filter={bank:'all',mode:'wrong',topic:'all',session:'',limit:20},active=null,run=null,loading=false,loaded=false,failures=[],epoch=0,lastRoute='',sessionLimit=12;
function begin(bank,label='Treino'){
 active={id:globalThis.crypto?.randomUUID?.()||Date.now()+'-'+Math.random().toString(36).slice(2),bank,label,started:Date.now(),updated:Date.now(),items:{}};
 return active.id;
}
function attempt(bank,id,ok,meta){
 const d=data();
 if(!active||(active.bank!=='all'&&active.bank!==bank)||Date.now()-active.updated>30*60000||(active.auto&&active.context!==meta.tid)){begin(bank,meta.tema?'Questões · '+text(meta.tema):'Treino · '+(banks()[bank]?.rotulo||bank));active.auto=true;active.context=meta.tid;}
 active.updated=Date.now();const previous=active.items[bank+':'+id];active.items[bank+':'+id]={hadError:previous?.hadError||!ok,attempts:(previous?.attempts||0)+1,b:bank,id,tid:meta.tid||'',tema:text(meta.tema),q:text(meta.q).slice(0,140),ok:!!ok,at:Date.now()};
 const old=d.sessions.findIndex(s=>s.id===active.id);if(old>=0)d.sessions[old]=active;else d.sessions.push(active);
 // Nunca descartar sessões silenciosamente: o aluno controla a limpeza.
 save();
}
const originalRecord=QNav.registrar;
QNav.registrar=(bank,id,ok,meta={})=>{originalRecord(bank,id,ok,meta);attempt(bank,id,ok,meta);};
function catalog(){
 return Object.entries(banks()).flatMap(([b,def])=>{
  if(typeof def.items!=='function')return [];
  return def.items().filter(q=>q&&Array.isArray(q.o)&&Number.isInteger(q.a)&&q.a>=0&&q.a<q.o.length).map(q=>({...q,b,tema:text(q.tema||q.t||''),q:text(q.q),answered:!q.stale&&(!!q.result||!!log()[b+':'+q.id])}));
 });
}
function migrate(items=catalog()){
 let changed=false;const L=log();
 // Legacy boxes > 0 already represent a correct answer after the last error.
 for(const e of Object.values(L))if(e&&e.erros>0&&!e.res&&(e.box||0)>0){e.res=true;e.due=0;e.policy=2;changed=true;}
 for(const q of items){
  if(!q.result||q.stale)continue;const k=key(q),r=q.result,e=L[k],at=Date.parse(r.at||r.date||'')||0;
  if(r.correct===true&&e&&!e.res&&((at&&at>=e.last)||(!at&&e.policy!==2))){e.res=true;e.due=0;e.policy=2;changed=true;}
  if(r.correct===false&&(!e||(e.res&&at>e.last))){
   const stamp=at||Date.now();L[k]={b:q.b,id:q.id,tid:q.t||q.tid||'',tema:q.tema,q:q.q.slice(0,140),erros:Math.max(1,e?.erros||0),box:0,due:day(1,stamp),last:stamp,res:false,policy:2};changed=true;
  }
 }
 if(changed)save();
 return items;
}
function pending(q){const e=log()[key(q)];return !q.stale&&!!e&&e.erros>0&&!e.res;}
function available(f=filter){
 let items=migrate();
 if(f.bank&&f.bank!=='all')items=items.filter(q=>q.b===f.bank);
 if(f.topic&&f.topic!=='all')items=items.filter(q=>q.b+':'+(q.t||q.tid||'')===f.topic);
 if(f.session){const session=data().sessions.find(s=>s.id===f.session);items=items.filter(q=>(session?.items?.[key(q)]?.hadError||session?.items?.[key(q)]?.ok===false));}
 return items.filter(q=>f.mode==='all'||(f.mode==='new'?!q.answered:f.mode==='due'?pending(q)&&log()[key(q)].due<=Date.now():pending(q))).sort((a,b)=>(log()[key(a)]?.due||0)-(log()[key(b)]?.due||0));
}
function registerCourse({bank,label,modules,state,answer,open,visual}){
 QNav.registrarBanco(bank,{rotulo:label,records:true,
  items:()=>modules.flatMap((m,mi)=>m.quiz.map((q,qi)=>{const value=state().quiz[m.id+'_'+qi];return {...q,id:m.id+'_'+qi,t:m.id,tema:m.title,result:Number.isInteger(value)?{correct:value===q.a,answer:value}:undefined,mi,qi,visual:visual?()=>visual(q):null};})),
  answer:(id,oi)=>{for(let mi=0;mi<modules.length;mi++){const qi=modules[mi].quiz.findIndex((_,j)=>modules[mi].id+'_'+j===id);if(qi>=0){return answer(mi,qi,oi);}}return false;},
  tema:tid=>{const mi=modules.findIndex(m=>m.id===tid);if(mi>=0)open(mi);}
 });
}
async function ensureCatalog(){
 if(loading||loaded)return;loading=true;const generation=epoch,uid=window.MASTER_AUTH?.user?.()?.id;
 const routes=['ecg','hemo','atb','rad'];
 const results=await Promise.allSettled(routes.map(route=>window.RouteAssets?.ensure(route)||Promise.resolve()));
 if(generation!==epoch||uid!==window.MASTER_AUTH?.user?.()?.id)return;
 failures=results.flatMap((r,i)=>r.status==='rejected'?[routes[i]]:[]);
 // The private Surgery bank already guards requests against account changes.
 try{await banks().cir?.load?.();}catch{failures.push('banco de Cirurgia');}
 if(generation!==epoch||uid!==window.MASTER_AUTH?.user?.()?.id)return;
 loading=false;loaded=true;migrate();if(typeof ui!=='undefined'&&['revisao','dashboard'].includes(ui.route))render();
}
function retry(){loaded=false;failures=[];ensureCatalog();render();}
function change(name,value){
 if(name==='limit')filter.limit=Math.max(1,Math.min(50,Number(value)||20));
 else if(['bank','mode','topic','session'].includes(name))filter[name]=String(value);
 if(name==='bank')filter.topic='all';
 run=null;render();
}
function open(bank='all',mode='wrong',session=''){
 filter={...filter,bank,mode,topic:'all',session};run=null;active=null;navigate('revisao');
}
function start(){
 const chosen=available();if(!chosen.length)return;
 if(['new','all'].includes(filter.mode))for(let i=chosen.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[chosen[i],chosen[j]]=[chosen[j],chosen[i]];}
 const list=chosen.slice(0,filter.limit);
 const sid=begin('all',filter.mode==='new'?'Questões inéditas':filter.mode==='all'?'Treino misto':'Revisão de erros');
 run={items:list,step:0,answers:{},sid,session:active};render();focusQuestion();
}
function focusQuestion(){const el=document.querySelector('.qr-question h2,.qr-result h2');if(el){el.tabIndex=-1;el.focus({preventScroll:true});el.scrollIntoView({block:'start',behavior:'instant'});}}
function answer(oi){
 if(!run||run.step>=run.items.length||Object.hasOwn(run.answers,run.step))return;
 const q=run.items[run.step],def=banks()[q.b];if(!Number.isInteger(oi)||oi<0||oi>=q.o.length||!def?.answer)return;
 const fresh=def.items().find(x=>String(x.id)===String(q.id));
 if(!fresh||JSON.stringify([fresh.q,fresh.o,fresh.a])!==JSON.stringify([q.originalQ||q.q,q.o,q.a])){
  // Catalog text may include inline formatting; compare its normalized prompt.
  if(!fresh||text(fresh.q)!==q.q||JSON.stringify(fresh.o)!==JSON.stringify(q.o)||fresh.a!==q.a){toast('Esta questão foi atualizada. Abra uma nova rodada para responder à versão atual.');return;}
 }
 active=run.session;
 if(def.answer(q.id,oi)===false)return;
 const ok=oi===q.a;run.answers[run.step]={ok,oi};
 if(!def.records)QNav.registrar(q.b,q.id,ok,{tid:q.t||q.tid,tema:q.tema,q:q.q});
 render();document.querySelector('.qr-feedback')?.scrollIntoView({block:'nearest',behavior:'instant'});
}
function next(){if(!run||!Object.hasOwn(run.answers,run.step))return;run.step++;render();focusQuestion();}
function original(bank,tid){const d=banks()[bank];(d?.original||d?.tema)?.(tid);}
function leave(){run=null;active=null;render();}
function runner(){
 const r=run;
 if(r.step>=r.items.length){const right=Object.values(r.answers).filter(a=>a.ok).length,wrong=r.items.length-right;
  return `<section class="card pad qr-result" aria-label="Resultado da revisão"><span class="kicker">RODADA CONCLUÍDA</span><h2>${right} de ${r.items.length} corretas</h2><p>${wrong?`${wrong} ${wrong===1?'questão volta':'questões voltam'} amanhã. Você também pode refazer os erros agora.`:'Nenhuma questão desta rodada ficou pendente.'} As acertadas saíram da fila automática.</p><div class="btn-row">${wrong?`<button type="button" class="btn primary" onclick="QuestionReview.open('all','wrong','${esc(r.sid)}')">Refazer os erros desta sessão</button>`:''}<button type="button" class="btn" onclick="QuestionReview.leave()">Voltar à central</button></div></section>`;
 }
 const q=r.items[r.step],a=r.answers[r.step],def=banks()[q.b];
 return `<section class="card pad qr-question" aria-label="Rodada de questões"><div class="status-row"><span class="kicker">${esc(def.rotulo||q.b)} · ${esc(q.tema)}</span><span>${r.step+1} de ${r.items.length}</span></div><h2>${esc(q.q)}</h2>${q.visual?q.visual():''}<fieldset class="qr-options"><legend class="visually-hidden">Escolha uma alternativa</legend>${q.o.map((o,i)=>`<button type="button" class="btn qr-option${a?(i===q.a?' is-correct':i===a.oi?' is-wrong':''):''}" ${a?'disabled':''} onclick="QuestionReview.answer(${i})"><b>${String.fromCharCode(65+i)}</b><span>${esc(text(o))}</span></button>`).join('')}</fieldset>${a?`<div class="qr-feedback" role="status"><h3>${a.ok?'Correto — saiu da fila automática.':'Ainda precisa de revisão — volta amanhã.'}</h3><p><strong>Resposta:</strong> ${esc(text(q.o[q.a]))}</p><p>${esc(text(q.why||q.comment||'Consulte a resolução e o conteúdo do tema para entender a decisão.'))}</p></div><button type="button" class="btn primary" onclick="QuestionReview.next()">${r.step===r.items.length-1?'Ver resultado':'Próxima questão'}</button>`:''}<div class="btn-row"><button type="button" class="btn ghost" onclick="QuestionReview.leave()">Encerrar e voltar à central</button>${q.t&&def.tema?`<button type="button" class="btn ghost" onclick="QuestionReview.original('${esc(q.b)}','${esc(q.t)}')">Abrir tema original</button>`:''}</div></section>`;
}
function suggestion(){
 const items=available({bank:'all',mode:'wrong'}),n=items.length;if(!n||data().dismissed===day())return '';
 const due=items.filter(q=>log()[key(q)].due<=Date.now()).length;
 return `<section class="card pad qr-suggestion" aria-labelledby="qr-suggestion-title"><div><span class="kicker">RECAPITULE SEUS ERROS</span><h2 id="qr-suggestion-title">Vamos revisar as questões das últimas sessões?</h2><p>${n} ${n===1?'questão ainda precisa':'questões ainda precisam'} de revisão${due?`; ${due} para hoje`:'. A próxima revisão está programada para amanhã'}. Ao acertar, ela sai da fila automática.</p><div class="btn-row"><button type="button" class="btn primary" onclick="QuestionReview.open('all','${due?'due':'wrong'}')">${due?'Revisar agora':'Revisar erros sem esperar'}</button><button type="button" class="btn" onclick="QuestionReview.open()">Ver sessões e filtros</button></div></div><button type="button" class="btn ghost" onclick="QuestionReview.dismiss()" aria-label="Ocultar sugestão de revisão hoje">Hoje não</button></section>`;
}
function dismiss(){data().dismissed=day();save();render();}
function agenda(){const entries=Object.values(log()).filter(e=>e&&!e.res&&e.erros>0),counts=Array.from({length:7},(_,i)=>entries.filter(e=>i===0?e.due<day(1):e.due>=day(i)&&e.due<day(i+1)).length),max=Math.max(1,...counts);
 return `<div class="qnav-agendagraf" role="img" aria-label="Revisões de erros nos próximos sete dias">${counts.map((n,i)=>`<div><span class="qnav-col" style="height:${Math.max(4,n/max*70)}px"></span><b>${n}</b><small>${i===0?'Hoje':i===1?'Amanhã':new Date(day(i)).toLocaleDateString('pt-BR',{weekday:'short'})}</small></div>`).join('')}</div>`;}
function panel(){
 if(run)return `<header class="page-header"><p class="eyebrow">CENTRAL DE QUESTÕES</p><h1>Revisar para <em>consolidar.</em></h1></header>`+runner();
 const items=migrate(),wrong=available({bank:'all',mode:'wrong'}),due=wrong.filter(q=>log()[key(q)].due<=Date.now()),resolved=Object.values(log()).filter(e=>e?.erros>0&&e.res).length;
 const chosen=available(),entries=Object.entries(banks()).filter(([,d])=>d.items),sessions=data().sessions.slice().reverse(),topics=[...new Map(items.filter(q=>filter.bank==='all'||q.b===filter.bank).map(q=>[q.b+':'+(q.t||q.tid||''),q.tema])).entries()];
 const options=(list,current)=>list.map(([value,label])=>`<option value="${esc(value)}" ${value===current?'selected':''}>${esc(label)}</option>`).join('');
 return `<header class="page-header"><p class="eyebrow">QUESTÕES E RECAPITULAÇÃO</p><h1>Sua central de <em>revisão.</em></h1><p>Errou? A questão volta amanhã. Acertou? Sai da fila automática. Você pode revisar antes da data e treinar inéditas ou todas quando quiser.</p></header>
 <section class="card pad qnav-painel"><div class="qnav-nums"><p><b>${due.length}</b><span>para revisar hoje</span></p><p><b>${wrong.length}</b><span>erros em aberto</span></p><p><b>${resolved}</b><span>erros corrigidos</span></p></div><details><summary>Como funciona a revisão</summary><p>Cada novo erro agenda uma tentativa para o próximo dia, no horário local. Um acerto encerra essa pendência. Errar de novo reabre a fila. O histórico permanece salvo na sua conta; os acertos não são reagendados automaticamente. Esta central reúne os bancos de questões e a fixação dos cursos. Casos progressivos, flashcards e evocação das aulas mantêm seus próprios fluxos.</p><p>As sessões abaixo preservam todas as rodadas registradas a partir desta atualização. Respostas anteriores continuam nos filtros, mesmo sem um histórico de sessão disponível.</p></details></section>
 ${loading?'<p class="info-notice" role="status">Carregando os bancos dos cursos…</p>':''}${failures.length?`<p class="info-notice" role="status">Alguns bancos não carregaram: ${esc(failures.join(', '))}. Os demais continuam disponíveis. <button type="button" class="btn" onclick="QuestionReview.retry()">Tentar novamente</button></p>`:''}
 <form class="card pad qr-filters" onsubmit="event.preventDefault();QuestionReview.start()"><h2>Monte sua rodada</h2><div class="qr-filter-grid"><label>Bloco<select onchange="QuestionReview.change('bank',this.value)">${options([['all','Todos os blocos'],...entries.map(([b,d])=>[b,d.rotulo||b])],filter.bank)}</select></label><label>Questões<select onchange="QuestionReview.change('mode',this.value)">${options([['wrong','Somente erradas'],['due','Revisões de hoje'],['new','Inéditas'],['all','Todas']],filter.mode)}</select></label><label>Matéria ou módulo<select onchange="QuestionReview.change('topic',this.value)">${options([['all','Todas as matérias'],...topics],filter.topic)}</select></label><label>Quantidade por rodada<input type="number" min="1" max="50" value="${filter.limit}" onchange="QuestionReview.change('limit',this.value)"></label></div>${filter.session?`<p>Filtro adicional: erros de uma sessão. <button type="button" class="btn ghost" onclick="QuestionReview.change('session','')">Remover filtro de sessão</button></p>`:''}<div class="btn-row"><button type="submit" class="btn primary" ${chosen.length?'':'disabled'}>Começar rodada · ${Math.min(chosen.length,filter.limit)}</button><span role="status">${chosen.length} ${chosen.length===1?'questão disponível':'questões disponíveis'}</span></div>${!chosen.length?'<p class="subtle">Nenhuma questão neste filtro. Você pode mudar o bloco, escolher inéditas ou treinar todas.</p>':''}</form>
 <section class="card pad"><h2>Próximos sete dias</h2>${agenda()}</section>
 <section class="qr-blocks" aria-label="Revisão por bloco">${entries.map(([b,d])=>{const n=wrong.filter(q=>q.b===b).length;return `<article class="card pad"><h2>${esc(d.rotulo||b)}</h2><p>${n} ${n===1?'erro pendente':'erros pendentes'}</p><button type="button" class="btn" onclick="QuestionReview.open('${esc(b)}','wrong')">Revisar este bloco</button></article>`;}).join('')}</section>
 <section class="section-spaced"><h2>Suas últimas sessões</h2>${sessions.length?sessions.slice(0,sessionLimit).map(s=>{const list=Object.values(s.items||{}),bad=list.filter(x=>x.hadError||!x.ok),remaining=bad.filter(x=>log()[x.b+':'+x.id]&&!log()[x.b+':'+x.id].res);return `<article class="card pad qr-session"><div><h3>${esc(s.label)}</h3><p class="subtle">${esc(nowLabel(s.started))} · ${list.length} ${list.length===1?'respondida':'respondidas'} · ${list.filter(x=>x.ok).length} corretas na última tentativa · ${bad.length} ${bad.length===1?'teve':'tiveram'} erro</p><p>${remaining.length} ${remaining.length===1?'erro ainda pendente':'erros ainda pendentes'}</p></div><button type="button" class="btn" ${remaining.length?'':'disabled'} onclick="QuestionReview.open('all','wrong','${esc(s.id)}')">Revisar erros desta sessão</button><details><summary>Ver questões da sessão</summary><ol class="qr-session-items">${list.map(x=>`<li><span class="badge gray">${x.ok?(x.hadError?'Errou e corrigiu':'Acertou'):'Errou'} na sessão</span> ${esc(x.q)} <small>${esc(x.tema)}${!x.ok&&log()[x.b+':'+x.id]?.res?' · já corrigida':''}</small></li>`).join('')}</ol></details></article>`;}).join('')+(sessions.length>sessionLimit?'<button type="button" class="btn" onclick="QuestionReview.moreSessions()">Mostrar mais sessões</button>':''):'<div class="card pad"><p>Suas próximas rodadas aparecem aqui. Os erros anteriores já podem ser revisados pelos filtros acima.</p></div>'}</section>`;
}
function afterRender(route){
 if(route!==lastRoute){active=null;lastRoute=route;}
 if(route==='revisao')ensureCatalog();
 if(route==='dashboard'&&typeof store!=='undefined'){const keys=['ecg','hemo','atb','rad'];if(keys.some(k=>!banks()[k]&&(Object.keys(store.study?.[k]?.quiz||{}).length||Object.values(log()).some(e=>e.b===k&&!e.res))))ensureCatalog();}
}
function clearBank(bank){
 const dataSet=data();
 dataSet.sessions=dataSet.sessions.map(session=>{
   const items=Object.fromEntries(Object.entries(session.items||{}).filter(([,v])=>v?.b!==bank));
   return {...session,items};
 }).filter(session=>Object.keys(session.items).length);
 if(active?.bank===bank||active?.bank==='all'&&Object.values(active.items||{}).every(v=>v?.b===bank))active=null;
 if(run?.items?.every(item=>item.b===bank))run=null;
 save();
}
function clearClinical(){
 for(const [k,e] of Object.entries(log()))if(!['p1','cir'].includes(e.b))delete log()[k];
 data().sessions=data().sessions.map(s=>({...s,items:Object.fromEntries(Object.entries(s.items||{}).filter(([,v])=>['p1','cir'].includes(v.b)))})).filter(s=>Object.keys(s.items).length);
 active=null;run=null;save();
}
function moreSessions(){sessionLimit+=12;render();}
function reset(){sessionLimit=12;epoch++;active=null;run=null;loaded=false;loading=false;failures=[];filter={bank:'all',mode:'wrong',topic:'all',session:'',limit:20};lastRoute='';}
window.addEventListener('master-auth-ended',reset);
window.addEventListener('master-auth-ready',reset);
QNav.painel=panel;
return {begin,registerCourse,catalog,available,migrate,open,start,answer,next,original,leave,panel,suggestion,dismiss,change,moreSessions,afterRender,retry,reset,clearClinical,clearBank,sessions:()=>data().sessions};
})();
window.QuestionReview=QuestionReview;
