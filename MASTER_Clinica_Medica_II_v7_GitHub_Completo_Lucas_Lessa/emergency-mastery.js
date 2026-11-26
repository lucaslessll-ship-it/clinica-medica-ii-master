/* Mastery notebook renderer, learning progress and spaced recall for Urgência. */
(() => {
'use strict';
const notebooks=window.UE_MASTERY_CONTENT;
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const day=86400000;
const defaultIntervals=[0,1,3,7,14];
const personalPriorities=['','Alta','Intermediária','Menor'];
const ids=()=>Object.keys(notebooks);
const state=()=>{
 const root=store.study||(store.study={});
 return root.ueMastery||(root.ueMastery={});
};
const lesson=id=>state()[id]||(state()[id]={});
const ref=(data,key)=>{const [label,url]=data.refs[key];return '<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a>';};
const url='\'arritmias\'';
const link=(label,section)=>'<button class="btn secondary" onclick="EmergencyMastery.openChapter(\''+section+'\')">'+label+'</button>';
const chapter=(data,id)=>data.chapters.find(c=>c[0]===id);
const block=(id,title,lead,body)=>'<section id="mastery-'+id+'" class="ue-master-block"><header><div><h2>'+esc(title)+'</h2>'+(lead?'<p>'+esc(lead)+'</p>':'')+'</div></header>'+body+'</section>';
const save=()=>stateSave();
function openChapter(id){
 if(!['essencial','revisao','masterclass','atlas','algoritmo','casos','farmacos','qt','desempenho','referencias',...notebooks.arritmias.chapters.map(c=>c[0])].includes(id))return;
 if(ui.route!=='emergency-arritmias')navigate('emergency-arritmias');
 requestAnimationFrame(()=>{
  const el=document.getElementById('mastery-'+id);
  el?.scrollIntoView({block:'start'});
  const heading=el?.querySelector('h2,h3');
  if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
 });
}
function config(id,key,value){
 const s=lesson(id);
 if(key==='meta'||key==='target'){
  const max=key==='meta'?notebooks[id].questions.length:100;
  const number=Number(value);
  if(!Number.isInteger(number)||number<1||number>max){render();return;}
  s[key]=number;
 }else if(key==='personalPriority'&&personalPriorities.includes(value)){
  s.personalPriority=value;
 }else if(key==='intervals'){
  const values=value.trim().split(/\s*,\s*/).map(Number);
  if(!/^\d+(?:\s*,\s*\d+){1,7}$/.test(value.trim())||values[0]!==0||values.at(-1)>365||values.some((n,i)=>i>0&&n<=values[i-1])){
   window.toast?.('Use dias inteiros em ordem crescente, começando com 0.');render();return;
  }
  s.intervals=values;
 }else return;
 save();render();
}
function schedule(id,key,good,concept,label){
 const s=lesson(id),review=s.review||(s.review={}),prev=review[key],intervals=s.intervals||defaultIntervals;
 const now=Date.now();
 if(good&&(!prev||prev.done||prev.due>now))return;
 const start=good?prev.start:now;
 const step=good?prev.step+1:0;
 const due=Math.max(now,start+(intervals[step]||0)*day);
 review[key]={start,step,due,done:step>=intervals.length,concept,label,at:now};
}
function recordQuestion(question,correct,retestKey){
 const id=question.t,s=lesson(id);
 let key=retestKey;
 // A different item can advance a due review of the same concept.
 if(!key&&correct)key=Object.keys(s.review||{}).find(k=>k.startsWith('q:')&&k.slice(2)!==question.id&&s.review[k].concept===question.chapter&&!s.review[k].done&&s.review[k].due<=Date.now());
 schedule(id,key||'q:'+question.id,correct,question.chapter,question.memory);
}
function stats(id){
 const d=notebooks[id],s=lesson(id),result=store.study?.ueQuestions?.results||{};
 const answered=d.questions.filter(q=>result[q.id]),correct=answered.filter(q=>result[q.id].correct);
 const cards=d.cards.filter(c=>s.cards?.[c.id]).length;
 const stages=[!!s.read,!!s.quick,answered.length>=(s.meta||10),cards===d.cards.length];
 return {answered:answered.length,correct:correct.length,cards,stages,percent:stages.filter(Boolean).length*25,accuracy:answered.length?Math.round(correct.length/answered.length*100):null};
}
function check(id,key,value){
 if(!['read','quick'].includes(key)||!notebooks[id])return;
 lesson(id)[key]=value;save();render();
}
function atlas(data){
 return '<div class="ue-atlas ue-master-atlas"><div class="ue-atlas-grid">'+data.atlas.map(([slug,title,note,record,start,length])=>
  '<figure class="ue-atlas-card"><button type="button" class="ue-zoom-trigger" aria-label="Ampliar ECG: '+esc(title)+'"><img loading="lazy" src="assets/urgencia/mastery/'+slug+'.svg" alt="ECG real: '+esc(title)+'"></button>'+
  '<figcaption><strong>'+esc(title)+'</strong><details><summary>Interpretar o traçado</summary><span>'+esc(note)+'</span><small>Marcas verdes indicam batimentos anotados na base. Recorte do registro '+record+' · MLII · amostras '+start+'–'+(start+length-1)+'.</small></details>'+
  '<small>ECG real · '+ref(data,'mit')+' · <a href="https://physionet.org/content/mitdb/view-license/1.0.0/" target="_blank" rel="noopener noreferrer">ODC-BY 1.0</a></small></figcaption></figure>'
 ).join('')+'</div></div>';
}
function table(headers,rows){
 return '<div class="ue-master-table"><table><thead><tr>'+headers.map(h=>'<th scope="col">'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+
 rows.map(row=>'<tr>'+row.map((cell,i)=>i?'<td>'+esc(cell)+'</td>':'<th scope="row">'+esc(cell)+'</th>').join('')+'</tr>').join('')+'</tbody></table></div>';
}
const branches=[
 ['Pulso ausente','Comece RCP. Em FV ou TV sem pulso, desfibrile assim que possível.','als'],
 ['Taquicardia com pulso e instabilidade causada pelo ritmo','Se sincronizável, cardioverta. Na TV polimórfica sustentada, aplique choque não sincronizado.','tachy'],
 ['Taquicardia com pulso e perfusão preservada','Classifique regularidade e largura do QRS. No regular estreito, considere manobras vagais. No largo, avalie TV e procure apoio especializado.','tachy'],
 ['Bradicardia com comprometimento','Trate causas reversíveis e siga o algoritmo. Se atropina falhar, considere estimulação transcutânea e/ou infusão vasoativa.','brady']
];
function algorithm(data){
 return '<div class="ue-master-branches" role="group" aria-label="Selecione uma apresentação do paciente">'+branches.map(([label,detail,source],i)=>
 '<details class="ue-master-choice" name="ue-arritmia-ramo" '+(i===1?'open':'')+'><summary>'+esc(label)+'</summary><p>'+esc(detail)+'</p><p>'+ref(data,source)+'</p></details>').join('')+'</div>';
}
function calculateQT(form){
 const qt=form.elements.qt.valueAsNumber,rr=form.elements.rr.valueAsNumber;
 const out=form.querySelector('output');
 if(!Number.isFinite(qt)||!Number.isFinite(rr)||qt<100||qt>1000||rr<0.2||rr>3||qt>=rr*1000){
  out.textContent='Confira as unidades. Use QT de 100–1000 ms e RR de 0,20–3,00 s, com QT menor que o RR.';return;
 }
 const bazett=Math.round(qt/Math.sqrt(rr)),fridericia=Math.round(qt/Math.cbrt(rr));
 out.textContent='Bazett: '+bazett+' ms · Fridericia: '+fridericia+' ms. '+(Math.max(bazett,fridericia)>=500?'Pelo menos uma estimativa está ≥500 ms. Confira manualmente e interprete no contexto.':'Interprete conforme ritmo, frequência, QRS e contexto clínico.');
}
function qtChart(){
 const rr=[0.44,0.6,0.8,1,1.2,1.6,2,2.4];
 const x=v=>58+(v-0.4)*214,y=v=>156-(v-240)*0.34;
 const trace=fn=>rr.map(v=>x(v).toFixed(1)+','+y(fn(v)).toFixed(1)).join(' ');
 const lines=[300,400,500,600].map(v=>'<path d="M58 '+y(v)+'h428"/><text x="49" y="'+(y(v)+4)+'" text-anchor="end">'+v+'</text>').join('');
 return '<figure class="ue-qt-chart"><svg viewBox="0 0 525 210" role="img" aria-label="Gráfico didático: QTc estimado por Bazett e Fridericia com QT fixo de 400 ms e diferentes intervalos RR"><g class="ue-qt-grid">'+lines+'</g>'+
 '<path class="ue-qt-axis" d="M58 26v130h428"/><polyline fill="none" stroke="#217d71" stroke-width="3" points="'+trace(v=>400/Math.sqrt(v))+'"/><polyline fill="none" stroke="#9e6119" stroke-dasharray="6 4" stroke-width="3" points="'+trace(v=>400/Math.cbrt(v))+'"/>'+
 '<g font-size="12"><text x="59" y="17">QTc (ms)</text><text x="'+x(0.5)+'" y="176">0,5</text><text x="'+x(1)+'" y="176">1,0</text><text x="'+x(1.5)+'" y="176">1,5</text><text x="'+x(2)+'" y="176">2,0</text><text x="448" y="176">RR (s)</text><text x="74" y="199" class="ue-qt-bazett">━ Bazett</text><text x="176" y="199" class="ue-qt-fridericia">┄ Fridericia</text></g></svg><figcaption>Gráfico didático calculado com QT fixo de 400 ms. As fórmulas coincidem quando RR é 1 segundo e divergem quando ele se afasta desse valor.</figcaption></figure>';
}
const qtForm=()=>'<form class="ue-master-qt" novalidate onsubmit="event.preventDefault();EmergencyMastery.calculateQT(this)"><label>QT (ms)<input name="qt" type="number" min="100" max="1000" step="1" inputmode="numeric"></label><label>RR (s)<input name="rr" type="number" min="0.20" max="3" step="0.01" inputmode="decimal"></label><button class="btn primary">Calcular QTc</button><output aria-live="polite"></output></form><p><b>Bazett:</b> QT ÷ √RR. <b>Fridericia:</b> QT ÷ ∛RR. Use QT medido em milissegundos e RR em segundos. Bazett pode supercorrigir em taquicardia e subcorrigir em bradicardia. RR variável, QRS largo e artefatos exigem abordagem própria. Ferramenta de estudo.</p><p><a href="https://doi.org/10.1016/j.jacc.2008.12.014" target="_blank" rel="noopener noreferrer">AHA/ACCF/HRS · Padronização de QT no ECG</a></p>';
function performance(data,id){
 const s=lesson(id),p=stats(id),review=s.review||{},pending=Object.entries(review).filter(([,v])=>!v.done).sort(([,a],[,b])=>a.due-b.due);
 const byChapter=data.chapters.map(([key,title])=>{
  const results=data.questions.filter(q=>q.chapter===key).map(q=>store.study?.ueQuestions?.results?.[q.id]).filter(Boolean);
  return [title,results.length?results.filter(r=>r.correct).length+' / '+results.length:'Sem respostas'];
 });
 const unsure=data.questions.filter(q=>{const result=store.study?.ueQuestions?.results?.[q.id];return result?.correct&&['duvida','tentativa'].includes(result.confidence);}).length;
 return '<div class="ue-mastery-metrics"><div><strong>'+p.percent+'%</strong><span>Percurso concluído</span></div><div><strong>'+p.answered+' / '+data.questions.length+'</strong><span>Exercícios distintos respondidos</span></div><div><strong>'+(p.accuracy===null?'—':p.accuracy+'%')+'</strong><span>Acerto nas últimas respostas · meta '+(s.target||90)+'%</span></div></div>'+
 (unsure?'<p>'+unsure+' acerto(s) com dúvida ou por tentativa declarada. Use os retestes para verificar retenção.</p>':'')+
 '<div class="ue-master-settings"><label>Exercícios para concluir a etapa <input type="number" min="1" max="'+data.questions.length+'" value="'+(s.meta||10)+'" onchange="EmergencyMastery.config('+url+',\'meta\',this.value)"></label>'+
 '<label>Meta de acerto (%) <input type="number" min="1" max="100" value="'+(s.target||90)+'" onchange="EmergencyMastery.config('+url+',\'target\',this.value)"></label>'+
 '<label>Prioridade pessoal <select onchange="EmergencyMastery.config('+url+',\'personalPriority\',this.value)">'+personalPriorities.map(value=>'<option value="'+esc(value)+'" '+((s.personalPriority||'')===value?'selected':'')+'>'+esc(value||'Sem preferência')+'</option>').join('')+'</select></label>'+
 '<label>Dias de revisão após erro <input value="'+(s.intervals||defaultIntervals).join(', ')+'" onchange="EmergencyMastery.config('+url+',\'intervals\',this.value)"></label></div>'+
 '<p>Revisão interna por intervalos fixos a partir do erro mais recente. D+0 permite reteste imediato. Cada acerto elegível libera a próxima etapa.</p>'+
 '<h3>Caderno de erros e retestes</h3>'+(pending.length?'<ol class="ue-master-review">'+pending.map(([key,v])=>{
   const due=v.due<=Date.now(),isCard=key.startsWith('card:');
   return '<li><div><strong>'+esc(chapter(data,v.concept)?.[1]||'Revisão')+'</strong><p>'+esc(v.label)+'</p><small>'+(due?'Disponível agora':'Agendado para '+new Date(v.due).toLocaleDateString('pt-BR'))+'</small></div>'+
   (due?'<button class="btn secondary" onclick="'+(isCard?'EmergencyMastery.openCards('+url+',true)':'UEQuestions.retest(\''+esc(key.slice(2))+'\')')+'">Retestar</button>':'')+'</li>';
 }).join('')+'</ol>':'<p>Seus erros de Arritmias entram aqui após a correção.</p>')+
 '<div class="ue-master-actions">'+link('Revisar essencial','essencial')+link('Revisar alto rendimento','revisao')+link('Voltar à Masterclass','masterclass')+'</div>'+
 '<details><summary>Gerar roteiro para estudo dialogado</summary><label for="ue-study-prompt">Copie e use em uma conversa de estudo</label><textarea id="ue-study-prompt" rows="4" readonly>'+esc('Guie meu estudo de Arritmias cardíacas em português. Faça uma pergunta clínica por vez, peça minha justificativa e dê feedback com base nas diretrizes AHA 2025 e ACC/AHA 2023. '+(pending.length?'Foque em: '+[...new Set(pending.map(([,v])=>chapter(data,v.concept)?.[1]).filter(Boolean))].join(', ')+'.':'Comece por pulso, estabilidade e interpretação do ritmo.')+' Ao final, reteste com um cenário diferente.')+'</textarea></details>'+
 '<h3>Desempenho por subtema</h3>'+table(['Subtema','Acertos / respondidas'],byChapter);
}
function page({done}){
 const id='arritmias',d=notebooks[id],p=stats(id),s=lesson(id);
 const actions='<div class="ue-master-actions"><button class="btn primary" onclick="UEQuestions.openQuestions('+url+')">Fazer exercícios</button>'+
 '<button class="btn secondary" onclick="UEQuestions.openExam('+url+')">Simulados</button><button class="btn secondary" onclick="EmergencyMastery.openCards('+url+')">Flashcards</button><button class="btn ghost" aria-pressed="false" onclick="HIG.toggleFocus()">Modo foco</button></div>';
 const sections=[['essencial','Essencial'],['revisao','Alto rendimento'],['atlas','Atlas de ECG'],['masterclass','Masterclass'],['algoritmo','Condutas'],['casos','Casos clínicos'],['farmacos','Farmacologia'],['qt','QT corrigido'],['desempenho','Desempenho'],['referencias','Referências']];
 const stages=['Leitura e preparação','Revisão rápida','Exercícios','Flashcards'];
 return '<article class="emergency-page ue-master deep-lesson" data-posology-inline-only data-lesson-key="uep2_arritmias" data-lesson-route="emergency-arritmias"><header class="ue-master-hero ue-arr-hero"><div><span class="kicker">MASTERY · URGÊNCIA E EMERGÊNCIA · P2</span><h1>Arritmias cardíacas</h1><p>Do traçado à conduta. Aprenda a distinguir instabilidade causada pelo ritmo, reconhecer padrões no ECG e escolher a intervenção.</p><span class="ue-tier ue-tier-alta">Prioridade 01 · 100/100</span>'+actions+'</div>'+
 '<figure class="ue-master-hero-art"><img src="assets/urgencia/mastery/conducao.svg" alt="Diagrama esquemático do trajeto elétrico do nó sinusal aos ventrículos"><figcaption>Representação esquemática · condução cardíaca</figcaption></figure></header>'+
 '<nav class="ue-master-jumps" aria-label="Seções da aula">'+sections.map(([key,label])=>'<a href="#emergency-arritmias" onclick="event.preventDefault();EmergencyMastery.openChapter(\''+key+'\')">'+label+'</a>').join('')+'</nav>'+
 '<section class="ue-master-block ue-master-path"><header><div><h2>Seu percurso</h2><p>'+p.percent+'% concluído · '+p.stages.filter(Boolean).length+' de 4 etapas</p></div><label><input type="checkbox" '+(done?'checked':'')+' onchange="Emergency.markStudied('+url+',this.checked)"> Marcar tema como estudado</label></header><progress aria-label="Progresso no percurso" value="'+p.percent+'" max="100"></progress><ol>'+
 stages.map((label,i)=>'<li><div><b>'+label+'</b><small>'+(i===2?p.answered+' de '+(s.meta||10)+' da meta':i===3?p.cards+' de '+d.cards.length+' revisados':(p.stages[i]?'Concluída':'Marcação manual'))+'</small></div>'+
 (i<2?'<label><input type="checkbox" '+(p.stages[i]?'checked':'')+' aria-label="Concluir '+label+'" onchange="EmergencyMastery.check('+url+',\''+(i?'quick':'read')+'\',this.checked)"> Concluir</label>':'<span>'+(p.stages[i]?'Concluída':'Pendente')+'</span>')+'</li>').join('')+'</ol></section>'+
 block('essencial','Essencial','1 minuto', '<div class="ue-master-grid">'+d.essential.map(([label,text])=>'<div class="ue-master-tile"><h3>'+esc(label)+'</h3><p>'+esc(text)+'</p></div>').join('')+'</div>')+
 block('revisao','Revisão de alto rendimento','5–10 minutos · Ritmo, sinal de alarme e conduta',table(['Ritmo','Pista no ECG','Hipótese','Conduta a considerar'],d.table)+
 '<aside class="ue-memory-podium"><h3>Pódio da memória</h3><ol><li>Pulso e perfusão definem o primeiro ramo.</li><li>Ritmo largo regular sugere TV até esclarecimento.</li><li>Ritmo largo irregular pré-excitado exige evitar bloqueadores nodais.</li></ol></aside>')+
 block('atlas','Atlas de ECG','Observe o traçado antes de abrir a interpretação. Toque na imagem para ampliar.',atlas(d))+
 block('masterclass','Masterclass','Aprofundamento completo',d.chapters.map(([key,title,first,detail,source])=>
 '<section class="deep-block ue-master-chapter" id="mastery-'+key+'"><h3>'+esc(title)+'</h3><p>'+esc(first)+'</p><p>'+esc(detail)+'</p><p class="ue-ref-line">'+ref(d,source)+'</p></section>').join(''))+
 block('algoritmo','Algoritmo de conduta','Selecione a apresentação para ver a primeira decisão.',algorithm(d))+
 block('casos','Casos clínicos','Explique sua decisão antes de revelar a resposta.',d.cases.map(([title,stem,prompt,answer,key])=>
 '<div class="ue-master-case"><h3>'+esc(title)+'</h3><p>'+esc(stem)+'</p><p><strong>'+esc(prompt)+'</strong></p><details><summary>Ver raciocínio e conduta</summary><p>'+esc(answer)+'</p>'+link('Rever a seção',''+key)+'</details></div>').join(''))+
 block('farmacos','Farmacologia contextualizada','Adultos · use o protocolo institucional e confira as doses no contexto clínico.',d.drugs.map(([name,mechanism,dose,care,source])=>
 '<div class="ue-master-drug"><h3>'+esc(name)+'</h3><p>'+esc(mechanism)+'</p><p><strong>Uso no algoritmo</strong> '+esc(dose)+'</p><p><strong>Segurança e monitorização</strong> '+esc(care)+'</p><p class="ue-ref-line">'+ref(d,source)+'</p></div>').join(''))+
 block('qt','Calculadora de QT corrigido','Compare duas fórmulas com o mesmo QT e RR.',qtForm()+qtChart())+
 block('desempenho','Desempenho e revisão','O percurso mede atividades concluídas. O desempenho mede acertos nas questões respondidas.',performance(d,id))+
 block('referencias','Referências','Revisão editorial '+d.scientificReview.split('-').reverse().join('/')+' · edição '+d.edition,'<ul>'+Object.keys(d.refs).map(key=>'<li>'+ref(d,key)+'</li>').join('')+'</ul><p>Escopo educacional. Em ambiente assistencial, siga protocolos locais e supervisão clínica.</p>')+
 '<footer class="ue-master-actions"><button class="btn primary" onclick="UEQuestions.openQuestions('+url+')">Começar exercícios</button><button class="btn secondary" onclick="Emergency.openLesson(\'sca\')">Próxima aula · Dor torácica e SCA →</button></footer></article>';
}
function explanation(q){
 const d=notebooks[q.t],entry=chapter(d,q.chapter);
 return '<div class="ue-master-rationale"><h3>Aprenda com esta questão</h3><p>'+esc(entry[2])+' '+esc(entry[3])+'</p><aside><strong>Para memorizar</strong><p>'+esc(q.memory)+'</p></aside><p>'+ref(d,entry[4])+'</p>'+link('Ler na Masterclass',q.chapter)+'</div>';
}
let flashId='arritmias',face=false;
function cardRun(id){return lesson(id).flashRun;}
function openCards(id,due=false){
 if(!notebooks[id])return;
 flashId=id;face=false;
 if(due)startCards('due',false,false);
 navigate('emergency-flashcards');
}
function openConcept(id,concept,retestKey){
 if(!notebooks[id])return;
 flashId=id;startCards('concept',false,false,concept,retestKey);navigate('emergency-flashcards');
}
function startCards(mode,shuffle=false,draw=true,concept,retestKey){
 const s=lesson(flashId),now=Date.now();
 const cards=notebooks[flashId].cards.filter(c=>mode==='concept'?c.chapter===concept:mode!=='due'||(s.review?.['card:'+c.id]&&!s.review['card:'+c.id].done&&s.review['card:'+c.id].due<=now));
 const order=cards.map(c=>c.id);
 if(shuffle)for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
 s.flashRun={order,index:0,mode,retestKey,at:new Date().toISOString()};face=false;save();if(draw)render();
}
function flip(){face=true;render();document.getElementById('ue-flash-answer')?.focus();}
function rate(label){
 if(!['erro','parcial','seguro'].includes(label))return;
 const id=flashId,s=lesson(id),run=cardRun(id),card=notebooks[id].cards.find(c=>c.id===run?.order[run.index]);
 if(!face||!card)return;
 (s.cards||(s.cards={}))[card.id]={confidence:label,at:new Date().toISOString()};
 schedule(id,'card:'+card.id,label==='seguro',card.chapter,card.front);
 if(run.retestKey&&s.review?.[run.retestKey])schedule(id,run.retestKey,label==='seguro',card.chapter,s.review[run.retestKey].label);
 run.index++;run.at=new Date().toISOString();face=false;save();render();
 document.getElementById('ue-flash-front')?.focus();
}
function flashPage(){
 const data=notebooks[flashId],s=lesson(flashId),run=cardRun(flashId);
 const card=data.cards.find(c=>c.id===run?.order[run.index]);
 const due=Object.entries(s.review||{}).filter(([key,v])=>key.startsWith('card:')&&!v.done&&v.due<=Date.now()).length;
 return '<section class="emergency-page ue-master"><header class="ue-master-hero"><span class="kicker">URGÊNCIA E EMERGÊNCIA</span><h1>Flashcards</h1><p>Recupere a resposta antes de revelar o verso.</p></header>'+block('deck',window.Emergency.titleFor(flashId),stats(flashId).cards+' de '+data.cards.length+' cartões revisados · '+due+' a retestar agora',
 '<label>Tema <select onchange="EmergencyMastery.openCards(this.value)">'+ids().map(id=>'<option value="'+esc(id)+'" '+(id===flashId?'selected':'')+'>'+esc(window.Emergency.titleFor(id))+'</option>').join('')+'</select></label>'+
 '<div class="ue-master-actions"><button class="btn secondary" onclick="EmergencyMastery.startCards(\'all\')">Revisar conjunto</button><button class="btn secondary" onclick="EmergencyMastery.startCards(\'all\',true)">Embaralhar</button><button class="btn secondary" '+(!due?'disabled':'')+' onclick="EmergencyMastery.startCards(\'due\')">Revisar erros</button></div>'+
 (card?'<article class="ue-master-card"><small>Cartão '+(run.index+1)+' / '+run.order.length+'</small><h3 tabindex="-1" id="ue-flash-front">'+esc(card.front)+'</h3>'+
 (face?'<p tabindex="-1" id="ue-flash-answer">'+esc(card.back)+'</p><div class="ue-master-actions"><button class="btn ue-card-error" onclick="EmergencyMastery.rate(\'erro\')">Errei</button><button class="btn secondary" onclick="EmergencyMastery.rate(\'parcial\')">Com dúvida</button><button class="btn primary" onclick="EmergencyMastery.rate(\'seguro\')">Lembrei com segurança</button></div>':'<button class="btn primary" onclick="EmergencyMastery.flip()">Revelar resposta</button>')+'</article>':
 '<p>'+(run?.order.length?'Sessão concluída.':run?'Nenhuma revisão disponível agora.':'Escolha como quer começar.')+'</p>')+
 '<p><button class="btn ghost" onclick="Emergency.openLesson('+url+')">Voltar à aula</button></p>')+'</section>';
}
window.addEventListener?.('master-auth-ended',()=>{flashId='arritmias';face=false;});
window.EmergencyMastery={page,openChapter,config,check,calculateQT,questions:()=>Object.values(notebooks).flatMap(d=>d.questions),explanation,recordQuestion,stats,target:id=>lesson(id).target||90,openCards,openConcept,startCards,flip,rate,flashPage};
})();
