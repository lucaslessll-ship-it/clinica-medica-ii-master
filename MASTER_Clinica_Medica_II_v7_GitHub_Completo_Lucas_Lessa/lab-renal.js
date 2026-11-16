/* Bloco renal integrado. Reutiliza CourseKit e o estilo dos laboratórios existentes.
   Estado opcional em store.study.labRenal, sem novas tabelas ou migrações. */
window.LabRenal=(()=>{
'use strict';
const PILOT=window.MASTER_LAB_RENAL,e=escapeHtml;
let caseIndex=0,stageIndex=0,noteTimer;
function data(){const p=store.study?.labRenal||{};return {version:1,...p,decisions:p.decisions||{},attempts:p.attempts||[],drafts:p.drafts||{},settings:p.settings||{correctDays:3},counts:p.counts||{attempts:0,correct:0},seenSolution:p.seenSolution||{},helpSeen:p.helpSeen||{}};}
function hasRoom(candidate=store){return new TextEncoder().encode(JSON.stringify(candidate)).byteLength<=950000;}
function save(change){
 const next=structuredClone(data());change(next);
 const defaults={version:1,since:new Date().toISOString(),reviews:{},steps:{},settings:{intervals:[1,3,7],dailyLimit:20}};
 const candidate={...store,study:{...(store.study||defaults),labRenal:next}};
 if(!hasRoom(candidate)){toast('O espaço de progresso está próximo do limite. Exporte seu backup antes de acrescentar mais anotações.');return false;}
 try{localStorage.setItem(STORAGE,JSON.stringify(candidate));store=candidate;return true;}catch{toast('Não foi possível salvar. Verifique o armazenamento do navegador e tente novamente.');return false;}
}
function guard(){if(hasRoom())return true;toast('O espaço de progresso está próximo do limite. Exporte seu backup antes de continuar.');return false;}
function table(t){return `<div class="pocus-table-wrap"><table class="pocus-table"><thead><tr>${t.head.map(c=>`<th scope="col">${e(c)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(row=>`<tr>${row.map((c,i)=>i?`<td>${e(c)}</td>`:`<th scope="row">${e(c)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function refs(ids){return `<section class="pocus-sec pocus-refs"><h2>Referências usadas nesta etapa</h2><ul>${[...new Set(ids)].map(id=>`<li><a href="${PILOT.REFS[id].u}" target="_blank" rel="noopener">${e(PILOT.REFS[id].t)}</a><p class="subtle">${e(PILOT.REFS[id].scope)}</p></li>`).join('')}</ul></section>`;}
function examPlan(now=new Date()){
 const curriculum=window.MASTER_CIR_DATA;if(!PILOT.examFocus||!curriculum?.exam)return null;
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).map(p=>[p.type,p.value]));
 const day=parts.year+'-'+parts.month+'-'+parts.day,written=curriculum.exam.written.slice(0,10),practical=curriculum.exam.practical.slice(0,10);
 const phase=day<=written?'written':day<=practical?'practical':null;if(!phase)return null;
 const progress=data(),items=PILOT.examFocus.map((item,order)=>{
  const moduleIndex=PILOT.MODULES.findIndex(m=>m.id===item.id),cases=item.caseIds.map(id=>PILOT.CASES.findIndex(c=>c.id===id)).filter(i=>i>=0);
  const pending=cases.find(i=>PILOT.CASES[i].stages.some(s=>!progress.decisions[s.id]));
  return {...item,moduleIndex,priority:Math.max(0,...curriculum.topics.filter(t=>item.topics.includes(t.id)).map(t=>t.priority)),done:!!progress.done?.[item.id],caseIndex:pending??cases[0],hasPendingCase:pending!==undefined,order};
 }).filter(item=>item.moduleIndex>=0).sort((a,b)=>b.priority-a.priority||a.order-b.order);
 const next=items.find(item=>phase==='written'?!item.done:item.hasPendingCase)||items[0];
 return {phase,written,practical,items,next};
}
function examPanel(){
 const plan=examPlan();if(!plan?.next)return '';const date=(plan.phase==='written'?plan.written:plan.practical).slice(5).split('-').reverse().join('/');
 const title=plan.phase==='written'?'Prioridade para Cirurgia em '+date:'Treino para a prática de '+date;
 const nextAction=plan.phase==='written'?'LabRenal.course.open('+plan.next.moduleIndex+')':'LabRenal.caseOpen('+plan.next.caseIndex+')';
 return `<section class="card lab-exam-focus" aria-label="Exames prioritários para a prova"><h2>${e(title)}</h2><p>Comece pelos exames ligados aos temas de maior peso cadastrado. Esta ordem é uma orientação de estudo, sem previsão de questões.</p><ol class="lab-exam-list">${plan.items.map(item=>`<li><div><strong>${e(item.label)}</strong><p>${e(item.why)}</p><span class="subtle">Peso cadastrado: ${item.priority}${item.done?' · aula marcada como estudada':''}</span></div><button type="button" class="btn" onclick="LabRenal.course.open(${item.moduleIndex})">Estudar ${e(item.label)}</button></li>`).join('')}</ol><button type="button" class="btn primary" onclick="${nextAction}">${plan.phase==='written'?'Continuar revisão prioritária':'Próximo caso prioritário'}</button><p class="subtle">Os casos pedem uma justificativa antes da decisão. Use-os também para treinar sua fala.</p></section>`;
}
function startExam(){const plan=examPlan();if(!plan?.next)return;if(plan.phase==='written')course.open(plan.next.moduleIndex);else caseOpen(plan.next.caseIndex);}
function examShortcut(){const plan=examPlan();if(!plan?.next)return '';const date=(plan.phase==='written'?plan.written:plan.practical).slice(5).split('-').reverse().join('/');return `<button type="button" class="btn secondary lab-exam-shortcut" onclick="LabRenal.startExam()"><strong>Exames para ${e(date)}</strong><span>Próximo: ${e(plan.next.label)}</span></button>`;}
const course=CourseKit.create({images:false,global:'LabRenal.course',key:'labRenal',route:'labrenal',label:'Laboratório',title:PILOT.displayTitle||PILOT.title,heading:PILOT.displayTitle||PILOT.title,lead:PILOT.MODULES.length+' aulas e '+PILOT.CASES.length+' casos progressivos para interpretar laudos, entender mecanismos e justificar decisões.',notice:'Piloto com revisão docente externa pendente. Valores dos casos são fictícios, sem conduta individual.',pathHint:'Leia o laudo, entenda o mecanismo e justifique a decisão. As fontes e os limites de interpretação acompanham as aulas.',bankTitle:'Casos progressivos',bankHeading:'Casos para interpretar',bankLead:'Interprete antes de consultar a síntese; novas informações aparecem após sua decisão.',caseHint:'Escreva sua hipótese e o próximo passo antes de abrir a resolução.',refNote:'Dados fictícios. Fontes, anos e limites descritos nas aulas. Alguns esquemas estão a confirmar e não foram apresentados como doses atuais. KDIGO 2024 consultada por síntese de 2025. Revisão docente externa pendente.',extraHome:examPanel,sourcesNote:'Texto e questões autorais. Fontes consultadas e limites de aplicação descritos em cada referência.',REFS:PILOT.REFS,MODULES:structuredClone(PILOT.MODULES),CASES:structuredClone(PILOT.CASES)});
function go(path=''){
 closeMobileNav(false);ui.route='labrenal';location.hash='#labrenal'+(path?'/'+path:'');render();focusTop();
}
function focusTop(){window.scrollTo({top:0,behavior:'instant'});requestAnimationFrame(()=>{const h=getMain().querySelector('h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}});}
function entry(){const due=Object.values(data().decisions).filter(v=>new Date(v.due)<=new Date()).length;return examPanel()+`<section class="card lab-ferro-entry" aria-label="Laboratório de exames"><div><h2>${e(PILOT.displayTitle||PILOT.title)}</h2><p>${PILOT.MODULES.length} aulas · ${PILOT.CASES.length} casos progressivos · ${PILOT.MODULES.reduce((n,m)=>n+m.quiz.length,0)} questões${due?' · '+due+' revisões pendentes':''}</p><p class="subtle">Piloto com revisão docente externa pendente. Pratique o raciocínio com laudos fictícios.</p></div><button type="button" class="btn primary" onclick="LabRenal.go()">Abrir laboratório de exames</button></section>`;}
function caseMenu(){return `<h1>Interprete os casos em etapas</h1><p>Comece com o laudo, escreva a justificativa e escolha o próximo passo. Novos dados aparecem depois da sua resposta. Acertos e revisões contam apenas decisões realmente respondidas.</p><div class="lab-case-menu">${PILOT.CASES.map((c,i)=>{const n=c.stages.filter(s=>data().decisions[s.id]).length;return `<button type="button" onclick="LabRenal.caseOpen(${i})"><strong>Caso ${i+1}: ${e(c.focus)}</strong><span>${e(c.stem)}</span><span>${n}/${c.stages.length} etapas respondidas</span></button>`;}).join('')}</div>`;}
function caseView(){
 const c=PILOT.CASES[caseIndex],s=c?.stages[stageIndex];if(!s)return caseMenu();const answer=data().decisions[s.id];
 return `<button class="btn" type="button" onclick="LabRenal.cases()">← Todos os casos</button><article class="pocus-module"><h1>Caso ${caseIndex+1}: ${e(c.focus)}</h1><p>${e(c.stem)}</p><p class="lab-stage-meta">Etapa ${stageIndex+1} de ${c.stages.length} · ${e(s.h)}</p><h2>${e(s.h)}</h2><p>${e(s.text)}</p>${s.table?table(s.table):''}<h2>Sua decisão</h2><p>${e(s.ask)}</p><label class="lab-justification" for="lab-justification">Justifique a hipótese e o próximo passo, sem dados de pacientes<textarea id="lab-justification" rows="4" maxlength="1200" oninput="LabRenal.draft(this.value)" ${answer?'readonly':''} placeholder="Que dado favorece sua hipótese? O que ainda falta saber?">${e(answer?.justification||data().drafts[s.id]||'')}</textarea></label><p class="lab-draft-status" role="status" aria-live="polite"></p><details class="lab-help" ${answer?.help?'open':''}><summary>Consultar pista</summary><p>${e(s.hint)}</p></details><label class="lab-hint-label"><input type="checkbox" id="lab-used-help" ${answer?.help?'checked':''} ${answer?'disabled':''}>Usei ajuda para esta decisão</label><div class="lab-choices" role="group" aria-label="Alternativas da etapa ${stageIndex+1}">${s.o.map((option,i)=>`<button type="button" class="pocus-q-opt${answer&&i===s.a?' right':''}${answer&&answer.selected===i&&i!==s.a?' wrong':''}" aria-pressed="${answer?.selected===i}" ${answer?'disabled':''} onclick="LabRenal.pick(${i})"><b>${String.fromCharCode(65+i)}</b><span>${e(option)}</span></button>`).join('')}</div><div class="lab-feedback" role="status" aria-live="polite" tabindex="-1">${answer?`<p><strong>${answer.correct?'Correto.':'Reveja o raciocínio.'}</strong> ${e(s.explanations[answer.selected])}</p><details><summary>Por que as outras opções não resolvem?</summary><ul>${s.o.map((option,i)=>`<li><strong>${e(option)}</strong>: ${e(s.explanations[i])}</li>`).join('')}</ul></details><p class="subtle">Revisão agendada para ${new Date(answer.due).toLocaleDateString('pt-BR')}. Intervalo educacional ajustável.</p><button type="button" class="btn" onclick="LabRenal.retry()">Tentar esta etapa novamente</button>`:''}</div>${answer?`<div class="btn-row">${stageIndex<c.stages.length-1?`<button type="button" class="btn primary" onclick="LabRenal.next()">Revelar os próximos dados →</button>`:`<button type="button" class="btn primary" onclick="LabRenal.solution()">Ver síntese completa do caso</button>`}</div>`:''}${answer?refs(s.refs):''}</article>`;
}
function reviewView(){
 const attempts=data().counts.attempts,right=data().counts.correct,entries=Object.entries(data().decisions),due=entries.filter(([,v])=>new Date(v.due)<=new Date()).length;
 return `<h1>Revisões e progresso</h1><p class="lab-progress">${attempts} tentativas reais · ${right} acertos em tentativas · ${entries.length}/${PILOT.CASES.reduce((n,c)=>n+c.stages.length,0)} decisões respondidas · ${due} revisões vencidas.</p><p>Repetir uma etapa gera uma nova tentativa; abrir uma aula ou uma resposta não gera acerto. O progresso usa o armazenamento e a sincronização já existentes da sua conta; sem conexão, a atualização remota pode ficar pendente. O histórico detalhado mantém as últimas 100 tentativas; os totais incluem todas as tentativas registradas.</p><label class="lab-review-settings" for="review-days">Intervalo para acerto sem ajuda<select id="review-days" onchange="LabRenal.interval(this.value)">${[1,3,7].map(n=>`<option value="${n}" ${data().settings.correctDays===n?'selected':''}>${n} ${n===1?'dia':'dias'}</option>`).join('')}</select></label><p class="subtle">Erros e respostas com ajuda retornam em um dia. Alterações valem para novas respostas. Os intervalos são parâmetros educacionais, não uma fórmula validada para todos.</p><ul>${entries.length?entries.map(([id,value])=>{const ci=PILOT.CASES.findIndex(c=>c.stages.some(s=>s.id===id)),si=PILOT.CASES[ci].stages.findIndex(s=>s.id===id);return `<li>Caso ${ci+1}, etapa ${si+1}: ${value.correct?'acerto':'erro'}${value.help?' com ajuda':''} · ${new Date(value.due).toLocaleDateString('pt-BR')} <button type="button" class="btn" onclick="LabRenal.caseOpen(${ci},${si})">Abrir etapa</button></li>`;}).join(''):'<li>Responda uma etapa dos casos para iniciar seu histórico.</li>'}</ul>`;
}
function page(){
 const parts=location.hash.slice(1).split('/'),screen=parts[1]||'',index=/^\d+$/.test(parts[2]||'')?Number(parts[2]):0;
 let content;
 if(screen==='aula')content=course.modulePage(index);
 else if(screen==='casos')content=caseMenu();
 else if(screen==='caso'){
  caseIndex=Math.max(0,Math.min(PILOT.CASES.length-1,index));
  const stages=PILOT.CASES[caseIndex].stages,requested=/^\d+$/.test(parts[3]||'')?Number(parts[3]):0;
  const first=stages.findIndex(s=>!data().decisions[s.id]);stageIndex=Math.max(0,Math.min(requested,first<0?stages.length-1:first));
  content=caseView();
 }else if(screen==='sintese')content=course.casePage(index);
 else if(screen==='revisoes')content=reviewView();
 else content=course.page();
 return `<div class="lab-ferro lab-renal"><button type="button" class="btn" onclick="navigate('labmaster')">← Laboratório Master</button><p class="lab-ferro-status">Piloto com revisão docente externa pendente. Casos e resultados fictícios; fontes e limitações indicadas nas aulas.</p><nav class="lab-ferro-nav" aria-label="Laboratório de exames"><button type="button" class="btn" onclick="LabRenal.go()">Aulas</button><button type="button" class="btn" onclick="LabRenal.cases()">${PILOT.CASES.length} casos progressivos</button><button type="button" class="btn" onclick="LabRenal.review()">Revisões e progresso</button><button type="button" class="btn" onclick="navigate('micro')">Urocultura e antibiograma</button></nav>${content}</div>`;
}
function afterRender(){
 if(ui.route!=='labrenal')return;const main=getMain();
 main.querySelectorAll('.pocus-module .pocus-sec > h3,.pocus-module .pocus-goals > h3').forEach(heading=>{const h=document.createElement('h2');h.textContent=heading.textContent;heading.replaceWith(h);});
 const parts=location.hash.slice(1).split('/');
 if(parts[1]==='caso'){
  const stage=PILOT.CASES[caseIndex]?.stages[stageIndex],hint=main.querySelector('.lab-help');
  hint?.querySelector('summary')?.addEventListener('click',()=>{if(stage&&!hint.open&&!data().decisions[stage.id])save(next=>{next.helpSeen[stage.id]=true;});});
 }
 if(parts[1]==='sintese'){
  const c=PILOT.CASES[Number(parts[2])],solution=main.querySelector('.pocus-script');
  solution?.querySelector('summary')?.addEventListener('click',()=>{if(c&&!solution.open&&!data().seenSolution[c.id])save(next=>{next.seenSolution[c.id]=true;});});
 }
 if(parts[1]==='aula'){
  const module=PILOT.MODULES[Number(parts[2])],first=main.querySelector('.pocus-goals');
  if(first&&module?.pretest)first.insertAdjacentHTML('afterend',`<section class="pocus-sec"><h2>Antes de ler: pré-teste</h2><ol>${module.pretest.map(q=>`<li>${e(q)}</li>`).join('')}</ol><p class="subtle">Responda em voz alta ou no caderno. Abrir a aula não conta como acerto.</p></section>`);
  let anchor=first?.nextElementSibling||first;
  if(anchor&&module?.exam){anchor.insertAdjacentHTML('afterend',`<section class="pocus-sec lab-exam-patterns"><h2>Como pode aparecer na prova</h2><p class="subtle">Padrões autorais de treino, sem previsão de incidência.</p><ol>${module.exam.map(item=>`<li><strong>${e(item.pattern)}</strong><p>Pegadinha: ${e(item.trap)}</p><p>Resposta esperada: ${e(item.expected)}</p></li>`).join('')}</ol></section>`);anchor=anchor.nextElementSibling;}
  const related=(module?.relatedTopics||[]).filter(link=>window.CIR&&window.MASTER_CIR_DATA.topics.some(t=>t.id===link.id&&t.chapters[link.chapter]));
  if(anchor&&related.length){anchor.insertAdjacentHTML('afterend',`<section class="pocus-sec lab-related"><h2>Conecte com Cirurgia</h2><div class="btn-row">${related.map(link=>{const topic=window.MASTER_CIR_DATA.topics.find(t=>t.id===link.id);return `<button type="button" class="btn" data-lab-topic="${e(link.id)}" data-lab-chapter="${link.chapter}">${e(topic.chapters[link.chapter].name)}</button>`;}).join('')}</div></section>`);main.querySelectorAll('[data-lab-topic]').forEach(button=>button.addEventListener('click',()=>CIR.openTopic(button.dataset.labTopic,Number(button.dataset.labChapter))));}

 }
}
function cases(){go('casos');}
function caseOpen(ci,si){if(!Number.isInteger(ci)||!PILOT.CASES[ci])return;const stages=PILOT.CASES[ci].stages;const next=stages.findIndex(s=>!data().decisions[s.id]);go('caso/'+ci+'/'+(Number.isInteger(si)?si:Math.max(0,next)));}
function pick(choice){
 const s=PILOT.CASES[caseIndex]?.stages[stageIndex];if(!s||data().decisions[s.id]||!Number.isInteger(choice)||choice<0||choice>=s.o.length)return;
 const help=document.getElementById('lab-used-help').checked||document.querySelector('.lab-ferro .lab-help').open||!!data().helpSeen[s.id]||!!data().seenSolution[PILOT.CASES[caseIndex].id],correct=choice===s.a,now=new Date(),days=correct&&!help?data().settings.correctDays:1;
 const entry={selected:choice,correct,help,justification:document.getElementById('lab-justification').value.slice(0,1200),at:now.toISOString(),due:new Date(now.getTime()+days*86400000).toISOString()};
 if(!save(next=>{next.decisions[s.id]=entry;next.attempts.push({caseId:PILOT.CASES[caseIndex].id,stageId:s.id,selected:choice,correct,help,at:entry.at});next.attempts=next.attempts.slice(-100);next.counts.attempts++;if(correct)next.counts.correct++;}))return;
 render();const feedback=document.querySelector('.lab-ferro .lab-feedback');feedback?.focus({preventScroll:true});
}
function retry(){const s=PILOT.CASES[caseIndex]?.stages[stageIndex];if(!s||!save(next=>{delete next.decisions[s.id];delete next.helpSeen[s.id];}))return;render();document.querySelector('.lab-ferro .lab-choices button')?.focus({preventScroll:true});}
function next(){const c=PILOT.CASES[caseIndex];if(!data().decisions[c.stages[stageIndex].id]||stageIndex>=c.stages.length-1)return;go('caso/'+caseIndex+'/'+(stageIndex+1));}
function draft(value){const s=PILOT.CASES[caseIndex]?.stages[stageIndex];if(!s)return;const saved=save(next=>{next.drafts[s.id]=String(value).slice(0,1200);});const status=document.querySelector('.lab-ferro .lab-draft-status');if(status){clearTimeout(noteTimer);status.textContent=saved?'Justificativa atualizada.':'Justificativa ainda não salva. Tente novamente.';}}
function solution(index=caseIndex){if(!PILOT.CASES[index]||!save(next=>{next.seenSolution[PILOT.CASES[index].id]=true;}))return;go('sintese/'+index);}
function review(){go('revisoes');}
function interval(value){const n=Number(value);if(![1,3,7].includes(n))return;if(save(next=>{next.settings.correctDays=n;}))toast('Intervalo atualizado para novas respostas.');}
function searchItems(){return PILOT.MODULES.map((m,i)=>({type:'Laboratório de exames',label:m.title,sub:(PILOT.displayTitle||PILOT.title)+' · '+m.layer,icon:'▤',action:()=>go('aula/'+i),text:[m.title,m.summary,...m.goals]})).concat(PILOT.CASES.map((c,i)=>({type:'Caso de laboratório',label:c.focus,sub:(PILOT.displayTitle||PILOT.title)+' · caso progressivo',icon:'▤',action:()=>caseOpen(i),text:[c.focus,c.stem]})));}
course.open=i=>go(i===null?'':'aula/'+Math.max(0,Math.min(PILOT.MODULES.length-1,Number(i)||0)));
course.bank=cases;course.caseOpen=solution;
const baseAnswer=course.answer;course.answer=(mi,qi,oi)=>{const q=PILOT.MODULES[mi]?.quiz[qi];if(!q||!Number.isInteger(oi)||oi<0||oi>=q.o.length||!guard())return;baseAnswer(mi,qi,oi);const feedback=document.querySelector('#labRenalq-'+mi+'-'+qi+' .pocus-q-why');if(feedback){feedback.tabIndex=-1;feedback.focus({preventScroll:true});}};
const baseComplete=course.complete;course.complete=(id,value)=>{if(PILOT.MODULES.some(m=>m.id===id)&&typeof value==='boolean'&&guard())baseComplete(id,value);};
const baseSeen=course.markSeen;course.markSeen=(id,value)=>{if(PILOT.CASES.some(c=>c.id===id)&&typeof value==='boolean'&&guard())baseSeen(id,value);};
window.addEventListener('master-auth-ended',()=>clearTimeout(noteTimer));
return {page,afterRender,entry,examPlan,examPanel,examShortcut,startExam,go,home:()=>go(),cases,caseOpen,pick,retry,next,draft,solution,review,interval,searchItems,course};
})();
