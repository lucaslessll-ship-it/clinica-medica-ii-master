/* MASTER · Cirurgia. Módulo próprio, com progresso separado da Clínica Médica.
   Questões autorais ficam em cir_questions.js. O banco privado de questões fica no Supabase
   (tabela cir_bank) e só é entregue à conta autorizada; nada dele vive no repositório. */
const CIR=(()=>{
'use strict';
const data=window.MASTER_CIR_DATA,topics=data.topics,own=(window.MASTER_CIR_QUESTIONS||[]).map(q=>({...q,src:'Autoral',shuffle:true}));
const KEY='master_cir_lucas_v1',LADDER=[1,3,7,14,30];
const def=()=>({completed:{},results:{},notes:{},lastTopic:'ciraa',lastChapter:0,exams:[]});
function load(){try{const o=JSON.parse(localStorage.getItem(KEY));if(o&&typeof o==='object')return {...def(),...o};}catch(e){}return def();}
let state=load(),bank=[],bankStatus='idle',sel=state.lastTopic,chap=state.lastChapter||0,practice=null,exam=null,tick=null;
let filt={t:'all',src:'all',mode:'all'};
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){toast('Não foi possível salvar o progresso neste navegador.')}}
const esc=s=>escapeHtml(String(s??'')),ph=s=>esc(s).replace(/\n/g,'<br>');
const topic=id=>topics.find(t=>t.id===id)||topics[0];
const pool=()=>own.concat(bank);
const byId=id=>pool().find(q=>q.id===id);
const nLessons=topics.reduce((n,t)=>n+t.chapters.length,0);
const done=(t,i)=>!!state.completed[t+'_'+i];
function isDue(id){const r=state.results[id];return !!r&&!!r.next&&Date.parse(r.next)<=Date.now();}
function stats(tid){const qs=pool().filter(q=>tid==='all'||q.t===tid),ans=qs.filter(q=>state.results[q.id]),ok=ans.filter(q=>state.results[q.id].correct);return {total:qs.length,answered:ans.length,right:ok.length,pct:ans.length?Math.round(ok.length/ans.length*100):0};}
function lessonPct(t){return Math.round(t.chapters.filter((_,i)=>done(t.id,i)).length/t.chapters.length*100);}
function daysTo(iso){return Math.ceil((Date.parse(iso)-Date.now())/86400000);}
function sec(title,html,extra=''){return `<section class="section-spaced"><div class="section-header"><h2 class="section-title">${title}</h2>${extra}</div>${html}</section>`;}

/* Banco privado */
async function loadBank(){
 const auth=window.MASTER_AUTH,client=auth?.client?.(),user=auth?.user?.();
 if(!client||!user){bankStatus='signed-out';return;}
 bankStatus='loading';
 try{
  let rows=[],from=0;
  for(;;){const {data:part,error}=await client.from('cir_bank').select('id,topic,source,year,stem,options,answer,comment,image_url').order('id').range(from,from+999);if(error)throw error;rows=rows.concat(part||[]);if(!part||part.length<1000)break;from+=1000;}
  bank=rows.map(r=>({id:'b:'+r.id,t:r.topic,q:r.stem,o:Array.isArray(r.options)?r.options:[],a:r.answer,why:r.comment||'',src:[r.source,r.year].filter(Boolean).join(' · ')||'Banco de questões',img:r.image_url||'',shuffle:false,bank:true}));
  bankStatus=rows.length?'ready':'empty';
 }catch(e){bank=[];bankStatus='error';}
 if(ui.route.startsWith('cir'))render();
}
window.addEventListener('master-auth-ready',()=>loadBank());
window.addEventListener('master-auth-ended',()=>{bank=[];bankStatus='signed-out';});
function bankLine(){
 const n=bank.length;
 const msg={idle:'Banco de questões: aguardando login.','signed-out':'Entre na sua conta para carregar o banco de questões privado.',loading:'Carregando o banco de questões…',ready:`Banco de questões carregado: ${n} ${n===1?'questão':'questões'} de provas anteriores, só para a sua conta.`,empty:'Banco de questões privado ainda vazio. As questões autorais já estão disponíveis.',error:'Não foi possível carregar o banco privado agora. As questões autorais seguem disponíveis.'}[bankStatus];
 return `<p class="cir-bank-line" role="status">${esc(msg)}</p>`;
}

/* Biblioteca */
function countdown(){
 const w=daysTo(data.exam.written),p=daysTo(data.exam.practical);
 const part=(n,label)=>n>0?`<div><strong>${n}</strong><span>${n===1?'dia':'dias'} para a ${label}</span></div>`:n===0?`<div><strong>Hoje</strong><span>${label}</span></div>`:'';
 return `<div class="cir-countdown">${part(w,'prova escrita')}${part(p,'prova prática')}<div><strong>${pool().length}</strong><span>questões disponíveis</span></div><div><strong>${Object.keys(state.completed).filter(k=>state.completed[k]).length}<small>/${nLessons}</small></strong><span>aulas concluídas</span></div></div>`;
}
function topicCard(t){const s=stats(t.id),lp=lessonPct(t);return `<button type="button" class="topic-card cir-topic" onclick="CIR.openTopic('${t.id}')"><div class="topic-icon cir-icon" aria-hidden="true">${t.block==='RAD'?'◐':t.block==='URO'?'◒':'✂'}</div><strong>${esc(t.title)}</strong><small>${t.chapters.length} aulas · ${s.total} questões${s.answered?` · ${s.pct}% de acertos`:''}</small><div class="mini-bar" aria-hidden="true"><span style="width:${lp}%"></span></div><span class="visually-hidden">${lp}% das aulas concluídas</span></button>`;}
function hub(){
 const due=pool().filter(q=>isDue(q.id)).length;
 return header('CIRURGIA · 8º PERÍODO','Cirurgia <em>completa para a P2.</em>','Aulas aprofundadas por tema, fluxogramas de conduta, revisão ativa e treino com questões comentadas. Organizado pelo checklist da disciplina.')+
 countdown()+
 `<div class="btn-row cir-main-actions"><button class="btn primary" type="button" onclick="CIR.resume()">Continuar de onde parei →</button><button class="btn secondary" type="button" onclick="CIR.startPractice({t:'all',src:'all',mode:'all'})">Treinar questões</button>${due?`<button class="btn" type="button" onclick="CIR.startPractice({t:'all',src:'all',mode:'due'})">Revisar ${due} ${due===1?'erro':'erros'} do dia</button>`:''}<button class="btn" type="button" onclick="CIR.go('cirexam')">Simulado</button></div>`+
 bankLine()+
 data.blocks.map(([b,title,sub])=>sec(esc(title),`<div class="topic-grid">${topics.filter(t=>t.block===b).map(topicCard).join('')}</div>`,`<span class="subtle small">${esc(sub)}</span>`)).join('')+
 `<p class="subtle small cir-foot">Conteúdo educativo para estudo. Condutas e doses seguem diretrizes citadas em cada aula e não substituem protocolo institucional nem supervisão.</p>`;
}

/* Aula */
function lesson(t,i){
 const c=t.chapters[i],k=t.id+'_'+i,deep=window.LessonDeep&&LessonDeep.has(t.id,i);
 return `<div class="card pad p1-lesson cir-lesson"><div class="lesson-head"><div><span class="kicker">AULA ${i+1} DE ${t.chapters.length} · ${esc(t.title)}</span><h2>${esc(c.name)}</h2><p class="cir-hy"><b>O que mais cai:</b> ${esc(c.hy)}</p></div><span class="module-status">${done(t.id,i)?'✓ Concluída':'Em estudo'}</span></div>
 <div class="lesson-sections">${deep?LessonDeep.render(t.id,i):`<div class="info-notice">O conteúdo aprofundado desta aula entra no próximo lote. As questões do tema já estão disponíveis.</div>`}</div>
 <div class="p1-note-area"><label for="cir-note"><strong>✎ Meu caderno · ${esc(c.name)}</strong><small>Fica salvo na sua conta.</small></label><textarea id="cir-note" rows="3" placeholder="Dúvidas, associações, explicação com suas palavras…">${esc(state.notes[k]||'')}</textarea><button type="button" class="btn secondary" onclick="CIR.saveNote()">Salvar anotação</button></div>
 <div class="module-actions"><button type="button" class="btn primary" onclick="CIR.toggleDone()">${done(t.id,i)?'↺ Desmarcar aula':'✓ Marcar aula concluída'}</button><button type="button" class="btn" onclick="CIR.startPractice({t:'${t.id}',src:'all',mode:'all'})">◈ Questões deste tema</button><button type="button" class="btn" onclick="CIR.nextChapter()">Próxima aula →</button></div></div>`;
}
function topicView(){
 const t=topic(sel);chap=Math.max(0,Math.min(chap,t.chapters.length-1));const s=stats(t.id);
 return LearnUX.topicHead({id:t.id,eyebrow:'Cirurgia · '+(data.blocks.find(b=>b[0]===t.block)||[])[1],title:t.title,subtitle:t.focus,stats:`${t.chapters.length} aulas · ${s.total} questões · ${s.answered?s.pct+'% de acertos':'nenhuma respondida'}`,pct:lessonPct(t),badges:[`Peso ${t.priority}/5`],actions:`<button type="button" class="btn ghost" onclick="CIR.go('cir')">← Cirurgia</button>`})+
 sec('Percurso do tema',`<div class="chapter-nav">${t.chapters.map((c,i)=>`<button type="button" class="chapter-pill ${i===chap?'current':''}" ${i===chap?'aria-current="step"':''} onclick="CIR.chapter(${i})">${done(t.id,i)?'✓ ':''}${i+1}. ${esc(c.name)}</button>`).join('')}</div>`)+lesson(t,chap);
}

/* Questões */
const shuffle=a=>{const o=[...a];for(let i=o.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[o[i],o[j]]=[o[j],o[i]]}return o;};
const orderOf=q=>q.shuffle?shuffle(q.o.map((_,i)=>i)):q.o.map((_,i)=>i);
function select(f){return pool().filter(q=>(f.t==='all'||q.t===f.t)&&(f.src==='all'||(f.src==='bank'?q.bank:!q.bank))&&(f.mode==='all'||(f.mode==='new'&&!state.results[q.id])||(f.mode==='wrong'&&state.results[q.id]&&!state.results[q.id].correct)||(f.mode==='due'&&isDue(q.id))));}
function startPractice(f){filt={...filt,...(f||{})};const ids=shuffle(select(filt).map(q=>q.id));practice={ids,step:0,chosen:null,revealed:false,order:ids.length?orderOf(byId(ids[0])):[],hits:0};go('cirpractice');}
function record(q,a){
 const prev=state.results[q.id],ok=a===q.a;let box=ok?Math.min((prev?.box??-1)+1,LADDER.length-1):0;
 const next=new Date();next.setDate(next.getDate()+(ok?LADDER[box]:1));
 state.results[q.id]={correct:ok,answer:a,attempts:(prev?.attempts||0)+1,date:new Date().toISOString(),box,next:ok&&box>=LADDER.length-1?null:next.toISOString()};
}
function answer(a){if(!practice||practice.revealed)return;const q=byId(practice.ids[practice.step]);practice.chosen=a;practice.revealed=true;if(a===q.a)practice.hits++;record(q,a);save();render();}
function nextQ(){if(!practice)return;practice.step++;practice.chosen=null;practice.revealed=false;const q=byId(practice.ids[practice.step]);if(q)practice.order=orderOf(q);render();requestAnimationFrame(()=>document.querySelector('.cir-q')?.scrollIntoView({block:'start'}));}
function opts(q,order,chosen,reveal,fn){return `<div class="p1-options">${order.map((orig,i)=>`<button type="button" class="p1-option ${reveal&&orig===q.a?'correct':''} ${reveal&&orig===chosen&&orig!==q.a?'wrong':''} ${chosen===orig?'chosen':''}" ${reveal?'disabled':''} onclick="${fn}(${orig})"><span>${'ABCDE'[i]}</span><strong>${esc(q.o[orig])}</strong></button>`).join('')}</div>`;}
function filterBar(){
 const o=(v,l,cur)=>`<option value="${v}" ${cur===v?'selected':''}>${esc(l)}</option>`;
 return `<form class="cir-filters" onsubmit="event.preventDefault();CIR.applyFilters(this)"><label>Tema<select name="t">${o('all','Todos os temas',filt.t)}${data.blocks.map(([b,title])=>`<optgroup label="${esc(title)}">${topics.filter(t=>t.block===b).map(t=>o(t.id,t.title,filt.t)).join('')}</optgroup>`).join('')}</select></label><label>Fonte<select name="src">${o('all','Todas',filt.src)}${o('own','Autorais',filt.src)}${o('bank','Provas anteriores',filt.src)}</select></label><label>Quais<select name="mode">${o('all','Todas',filt.mode)}${o('new','Não respondidas',filt.mode)}${o('wrong','Que errei',filt.mode)}${o('due','Revisão do dia',filt.mode)}</select></label><button class="btn primary" type="submit">Começar</button></form>`;
}
function applyFilters(form){const f=new FormData(form);startPractice({t:f.get('t'),src:f.get('src'),mode:f.get('mode')});}
function practiceView(){
 const active=practice&&practice.ids.length&&practice.step<practice.ids.length;
 const head=(active?`<div class="p1-back"><button type="button" class="btn ghost" onclick="CIR.go('cir')">← Cirurgia</button></div><details class="cir-filter-box"><summary>Trocar tema ou filtro</summary>${filterBar()}</details>`:header('CIRURGIA · QUESTÕES','Treine <em>a decisão cirúrgica.</em>','Escolha tema, fonte e tipo de revisão. Cada erro volta para revisão no dia seguinte e se espaça conforme você acerta.')+`<div class="p1-back"><button type="button" class="btn ghost" onclick="CIR.go('cir')">← Cirurgia</button></div>`+filterBar()+bankLine());
 if(!practice)return head;
 if(!practice.ids.length)return head+`<div class="card pad empty-state"><h2>Nenhuma questão neste filtro</h2><p>Troque o tema, a fonte ou o tipo de revisão.</p></div>`;
 if(practice.step>=practice.ids.length)return head+`<div class="card pad"><h2>Treino concluído</h2><p>${practice.hits} de ${practice.ids.length} corretas nesta rodada.</p><div class="btn-row"><button type="button" class="btn primary" onclick="CIR.startPractice({mode:'wrong'})">Refazer as que errei</button><button type="button" class="btn" onclick="CIR.go('cir')">Voltar à Cirurgia</button></div></div>`;
 const q=byId(practice.ids[practice.step]),t=topic(q.t),ok=practice.chosen===q.a;
 return head+`<div class="card pad cir-q"><div class="status-row"><b>Questão ${practice.step+1} de ${practice.ids.length}</b><span class="badge">${esc(t.short)}</span><span class="badge gray">${esc(q.src)}</span></div>${q.img?`<img class="cir-q-img" src="${esc(q.img)}" alt="Imagem da questão" loading="lazy">`:''}<p class="p1-question">${ph(q.q)}</p>${opts(q,practice.order,practice.chosen,practice.revealed,'CIR.answer')}${practice.revealed?`<div class="info-notice ${ok?'':'warn'}"><strong>${ok?'✓ Correto':'✗ Resposta correta: '+esc(q.o[q.a])}</strong>${q.why?`<p>${ph(q.why)}</p>`:''}</div><div class="module-actions"><button type="button" class="btn primary" onclick="CIR.nextQ()">${practice.step===practice.ids.length-1?'Ver resultado':'Próxima questão →'}</button><button type="button" class="btn ghost" onclick="CIR.openTopic('${q.t}')">Abrir a aula do tema</button></div>`:''}</div>`;
}

/* Simulado */
function startExam(n){const ids=shuffle(pool().map(q=>q.id)).slice(0,n);exam={ids,n:ids.length,step:0,start:Date.now(),dur:ids.length*3*60000,ans:{},orders:Object.fromEntries(ids.map(id=>[id,orderOf(byId(id))])),done:false};go('cirexam');}
function clock(){clearInterval(tick);if(!exam||exam.done)return;tick=setInterval(()=>{const el=document.getElementById('cir-clock');if(!el){clearInterval(tick);return;}const left=exam.dur-(Date.now()-exam.start);el.textContent=String(Math.max(0,Math.floor(left/60000))).padStart(2,'0')+':'+String(Math.max(0,Math.floor(left%60000/1000))).padStart(2,'0');if(left<=0){clearInterval(tick);finishExam(true);}},1000);}
function exAnswer(a){if(!exam||exam.done)return;exam.ans[exam.ids[exam.step]]=a;render();}
function exGo(i){if(!exam)return;exam.step=Math.max(0,Math.min(exam.n-1,i));render();}
function finishExam(timeout=false){if(!exam||exam.done)return;if(!timeout&&Object.keys(exam.ans).length<exam.n&&!confirm('Há questões em branco. Entregar mesmo assim?'))return;clearInterval(tick);exam.done=true;exam.score=0;exam.ids.forEach(id=>{const q=byId(id);if(exam.ans[id]!==undefined){record(q,exam.ans[id]);if(exam.ans[id]===q.a)exam.score++;}});state.exams.push({at:new Date().toISOString(),score:exam.score,total:exam.n});save();render();}
function examView(){
 if(!exam)return header('CIRURGIA · SIMULADO','Simulado <em>cronometrado.</em>','Questões sorteadas de todos os temas, três minutos por questão e gabarito comentado só na entrega.')+`<div class="p1-back"><button type="button" class="btn ghost" onclick="CIR.go('cir')">← Cirurgia</button></div>`+bankLine()+`<div class="card pad"><h2>Escolha o tamanho</h2><div class="btn-row">${[20,40,60].map(n=>`<button type="button" class="btn ${n===40?'primary':''}" onclick="CIR.startExam(${n})" ${pool().length<n?'disabled':''}>${n} questões · ${n*3} min</button>`).join('')}</div>${state.exams.length?`<p class="subtle">Últimos: ${state.exams.slice(-5).map(e=>`${e.score}/${e.total}`).join(' · ')}</p>`:''}</div>`;
 if(exam.done)return header('SIMULADO CONCLUÍDO',`${exam.score} de <em>${exam.n}.</em>`,`${Math.round(exam.score/exam.n*100)}% de acertos. Os erros já entraram na revisão do dia seguinte.`)+`<div class="btn-row"><button type="button" class="btn primary" onclick="CIR.startExam(${exam.n})">Novo simulado</button><button type="button" class="btn" onclick="CIR.go('cir')">Voltar à Cirurgia</button></div>`+sec('Correção comentada',`<div class="card pad">${exam.ids.map((id,k)=>{const q=byId(id),ok=exam.ans[id]===q.a;return `<div class="p1-correction"><strong>${k+1}. ${esc(topic(q.t).short)} · ${ok?'✓ acertou':exam.ans[id]===undefined?'em branco':'✗ errou'}</strong><p>${ph(q.q)}</p><p><b>Correta:</b> ${esc(q.o[q.a])}${!ok&&exam.ans[id]!==undefined?`<br><b>Sua:</b> ${esc(q.o[exam.ans[id]])}`:''}</p>${q.why?`<p>${ph(q.why)}</p>`:''}</div>`}).join('')}</div>`);
 const id=exam.ids[exam.step],q=byId(id);
 return header('SIMULADO · CIRURGIA',`Questão <em>${exam.step+1} / ${exam.n}</em>`,'Gabarito na entrega')+`<div class="card pad"><div class="status-row"><b>Tempo: <span id="cir-clock">--:--</span></b><span>${Object.keys(exam.ans).length}/${exam.n} respondidas</span></div><div class="p1-exam-steps">${exam.ids.map((v,k)=>`<button type="button" class="${k===exam.step?'current':''} ${exam.ans[v]!==undefined?'done':''}" onclick="CIR.exGo(${k})" aria-label="Questão ${k+1}">${k+1}</button>`).join('')}</div>${q.img?`<img class="cir-q-img" src="${esc(q.img)}" alt="Imagem da questão" loading="lazy">`:''}<p class="p1-question">${ph(q.q)}</p>${opts(q,exam.orders[id],exam.ans[id],false,'CIR.exAnswer')}<div class="module-actions"><button type="button" class="btn" onclick="CIR.exGo(${exam.step-1})" ${exam.step===0?'disabled':''}>← Anterior</button><button type="button" class="btn" onclick="CIR.exGo(${exam.step+1})" ${exam.step===exam.n-1?'disabled':''}>Próxima →</button><button type="button" class="btn primary" onclick="CIR.finishExam()">Entregar</button></div></div>`;
}

/* Navegação e integração */
function go(r){navigate(r);}
function openTopic(id,i=0){sel=id;chap=i;state.lastTopic=id;state.lastChapter=i;save();go('cirtopic');}
function setChapter(i){chap=i;state.lastChapter=i;save();render();window.scrollTo({top:160,behavior:'smooth'});}
function nextChapter(){const t=topic(sel);if(chap<t.chapters.length-1)chap++;else{const k=topics.findIndex(x=>x.id===sel);sel=topics[(k+1)%topics.length].id;chap=0;}state.lastTopic=sel;state.lastChapter=chap;save();render();window.scrollTo({top:160,behavior:'smooth'});}
function toggleDone(){const k=sel+'_'+chap;state.completed[k]=!state.completed[k];save();render();}
function saveNote(){state.notes[sel+'_'+chap]=document.getElementById('cir-note')?.value||'';save();toast('Anotação salva.');}
function resume(){openTopic(topics.some(t=>t.id===state.lastTopic)?state.lastTopic:'ciraa',state.lastChapter||0);}
function view(r){switch(r){case 'cirtopic':return topicView();case 'cirpractice':return practiceView();case 'cirexam':return examView();default:return hub();}}
function afterRender(r){if(r==='cirexam'&&exam&&!exam.done)clock();else clearInterval(tick);}
function searchItems(){return topics.flatMap(t=>[{type:'Cirurgia',label:t.title,sub:'Cirurgia · '+t.focus,icon:'✂',action:()=>openTopic(t.id),text:[t.title,t.focus]},...t.chapters.map((c,i)=>({type:'Aula de cirurgia',label:c.name,sub:t.title,icon:'✂',action:()=>openTopic(t.id,i),text:[c.name,c.hy]}))]);}
function reload(){clearInterval(tick);state=load();practice=null;exam=null;sel=state.lastTopic;chap=state.lastChapter||0;}
window.addEventListener('storage',e=>{if(e.key===KEY)state=load();});
function dueCount(){return pool().filter(q=>isDue(q.id)).length;}
function completed(){return state.completed;}
return {view,afterRender,go,openTopic,chapter:setChapter,nextChapter,toggleDone,saveNote,resume,startPractice,applyFilters,answer,nextQ,startExam,exAnswer,exGo,finishExam,searchItems,reload,loadBank,dueCount,completed,topics,own,pool,KEY};
})();
window.CIR=CIR;
