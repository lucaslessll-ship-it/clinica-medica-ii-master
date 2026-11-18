/* Laboratório integrado ao curso existente. Dados de estudo limitados, sem mídia ou tabelas novas. */
window.LabFerro=(()=>{
'use strict';
const PILOT=window.MASTER_LAB_FERROPENIA,e=escapeHtml;
let caseIndex=0,stageIndex=0,noteTimer;
function data(){const p=store.study?.labFerro||{};return {version:1,...p,decisions:p.decisions||{},attempts:p.attempts||[],drafts:p.drafts||{},settings:p.settings||{correctDays:3},counts:p.counts||{attempts:0,correct:0},seenSolution:p.seenSolution||{}};}
function hasRoom(candidate=store){return new TextEncoder().encode(JSON.stringify(candidate)).byteLength<=950000;}
function save(change){
 const next=structuredClone(data());change(next);
 const defaults={version:1,since:new Date().toISOString(),reviews:{},steps:{},settings:{intervals:[1,3,7],dailyLimit:20}};
 const candidate={...store,study:{...(store.study||defaults),labFerro:next}};
 if(!hasRoom(candidate)){toast('O espaço de progresso está próximo do limite. Exporte seu backup antes de acrescentar mais anotações.');return false;}
 try{localStorage.setItem(STORAGE,JSON.stringify(candidate));store=candidate;return true;}catch{toast('Não foi possível salvar. Verifique o armazenamento do navegador e tente novamente.');return false;}
}
function guard(){if(hasRoom())return true;toast('O espaço de progresso está próximo do limite. Exporte seu backup antes de continuar.');return false;}
function table(t){return `<div class="pocus-table-wrap"><table class="pocus-table"><thead><tr>${t.head.map(c=>`<th scope="col">${e(c)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(row=>`<tr>${row.map((c,i)=>i?`<td>${e(c)}</td>`:`<th scope="row">${e(c)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function refs(ids){return `<section class="pocus-sec pocus-refs"><h2>Referências usadas nesta etapa</h2><ul>${[...new Set(ids)].map(id=>`<li><a href="${PILOT.REFS[id].u}" target="_blank" rel="noopener">${e(PILOT.REFS[id].t)}</a><p class="subtle">${e(PILOT.REFS[id].scope)}</p></li>`).join('')}</ul></section>`;}
const course=CourseKit.create({images:false,global:'LabFerro.course',key:'labFerro',route:'labferro',label:'Laboratório',title:PILOT.title,heading:'Anemia microcítica: do laudo à decisão',lead:'Aprofundamento do curso de Hemograma: três aulas e cinco casos fictícios para interpretar e justificar o próximo passo.',notice:'Piloto em revisão docente. Valores dos casos são fictícios, sem conduta individual.',pathHint:'Leia o laudo, entenda o mecanismo e justifique a decisão. As contas são conferidas no próprio exercício.',bankTitle:'Casos progressivos',bankHeading:'Casos para interpretar',bankLead:'Interprete antes de consultar a síntese; novas informações aparecem após sua decisão.',caseHint:'Escreva sua hipótese e o próximo passo antes de abrir a resolução.',refNote:'Dados fictícios. Pontos de corte não reconferidos não foram transformados em regras. Revisão docente externa pendente.',sourcesNote:'Texto e questões autorais. Fontes consultadas e limites de aplicação descritos em cada referência.',REFS:PILOT.REFS,MODULES:structuredClone(PILOT.MODULES),CASES:structuredClone(PILOT.CASES)});
function go(path=''){
 closeMobileNav(false);ui.route='labferro';location.hash='#labferro'+(path?'/'+path:'');render();focusTop();
}
function focusTop(){window.scrollTo({top:0,behavior:'instant'});requestAnimationFrame(()=>{const h=getMain().querySelector('h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}});}
function entry(){const due=Object.values(data().decisions).filter(v=>new Date(v.due)<=new Date()).length;return `<section class="card lab-ferro-entry" aria-label="Laboratório de anemia microcítica"><div><h2>Laboratório: anemia microcítica</h2><p>3 aulas aprofundadas · 5 casos progressivos · 18 questões${due?' · '+due+' revisões pendentes':''}</p><p class="subtle">Piloto em revisão docente. Pratique o raciocínio com laudos fictícios.</p></div><button type="button" class="btn primary" onclick="LabFerro.go()">Abrir laboratório</button></section>`;}
function caseMenu(){return `<h1>Interprete os casos em etapas</h1><p>Comece com o laudo, escreva a justificativa e escolha o próximo passo. Novos dados aparecem depois da sua resposta. Acertos e revisões contam apenas decisões realmente respondidas.</p><div class="lab-case-menu">${PILOT.CASES.map((c,i)=>{const n=c.stages.filter(s=>data().decisions[s.id]).length;return `<button type="button" onclick="LabFerro.caseOpen(${i})"><strong>Caso ${i+1}: ${e(c.focus)}</strong><span>${e(c.stem)}</span><span>${n}/${c.stages.length} etapas respondidas</span></button>`;}).join('')}</div>`;}
function caseView(){
 const c=PILOT.CASES[caseIndex],s=c?.stages[stageIndex];if(!s)return caseMenu();window.MasterActivity?.setContext('labferro:'+c.id,'case_open');const answer=data().decisions[s.id];
 return `<button class="btn" type="button" onclick="LabFerro.cases()">← Todos os casos</button><article class="pocus-module"><h1>Caso ${caseIndex+1}: ${e(c.focus)}</h1><p>${e(c.stem)}</p><p class="lab-stage-meta">Etapa ${stageIndex+1} de ${c.stages.length} · ${e(s.h)}</p><h2>${e(s.h)}</h2><p>${e(s.text)}</p>${s.table?table(s.table):''}<h2>Sua decisão</h2><p>${e(s.ask)}</p><label class="lab-justification" for="lab-justification">Justifique a hipótese e o próximo passo, sem dados de pacientes<textarea id="lab-justification" rows="4" maxlength="1200" oninput="LabFerro.draft(this.value)" ${answer?'readonly':''} placeholder="Que dado favorece sua hipótese? O que ainda falta saber?">${e(answer?.justification||data().drafts[s.id]||'')}</textarea></label><p class="lab-draft-status" role="status" aria-live="polite"></p><details class="lab-help" ${answer?.help?'open':''}><summary>Consultar pista</summary><p>Separe o padrão do hemograma, os estoques e a disponibilidade de ferro. Confira unidades e diga o que a inflamação impede concluir.</p></details><label class="lab-hint-label"><input type="checkbox" id="lab-used-help" ${answer?.help?'checked':''} ${answer?'disabled':''}>Usei ajuda para esta decisão</label><div class="lab-choices" role="group" aria-label="Alternativas da etapa ${stageIndex+1}">${s.o.map((option,i)=>`<button type="button" class="pocus-q-opt${answer&&i===s.a?' right':''}${answer&&answer.selected===i&&i!==s.a?' wrong':''}" aria-pressed="${answer?.selected===i}" ${answer?'disabled':''} onclick="LabFerro.pick(${i})"><b>${String.fromCharCode(65+i)}</b><span>${e(option)}</span></button>`).join('')}</div><div class="lab-feedback" role="status" aria-live="polite" tabindex="-1">${answer?`<p><strong>${answer.correct?'Correto.':'Reveja o raciocínio.'}</strong> ${e(s.explanations[answer.selected])}</p><details><summary>Por que as outras opções não resolvem?</summary><ul>${s.o.map((option,i)=>`<li><strong>${e(option)}</strong>: ${e(s.explanations[i])}</li>`).join('')}</ul></details><p class="subtle">Revisão agendada para ${new Date(answer.due).toLocaleDateString('pt-BR')}. Intervalo educacional ajustável.</p><button type="button" class="btn" onclick="LabFerro.retry()">Tentar esta etapa novamente</button>`:''}</div>${answer?`<div class="btn-row">${stageIndex<c.stages.length-1?`<button type="button" class="btn primary" onclick="LabFerro.next()">Revelar os próximos dados →</button>`:`<button type="button" class="btn primary" onclick="LabFerro.solution()">Ver síntese completa do caso</button>`}</div>`:''}${answer?refs(s.refs):''}</article>`;
}
function reviewView(){
 const attempts=data().counts.attempts,right=data().counts.correct,entries=Object.entries(data().decisions),due=entries.filter(([,v])=>new Date(v.due)<=new Date()).length;
 return `<h1>Revisões e progresso</h1><p class="lab-progress">${attempts} tentativas reais · ${right} acertos em tentativas · ${entries.length}/10 decisões respondidas · ${due} revisões vencidas.</p><p>Repetir uma etapa gera uma nova tentativa; abrir uma aula ou uma resposta não gera acerto. O progresso fica salvo com seus estudos nesta conta. O histórico detalhado mantém as últimas 100 tentativas; os totais incluem todas as tentativas registradas.</p><label class="lab-review-settings" for="review-days">Intervalo para acerto sem ajuda<select id="review-days" onchange="LabFerro.interval(this.value)">${[1,3,7].map(n=>`<option value="${n}" ${data().settings.correctDays===n?'selected':''}>${n} ${n===1?'dia':'dias'}</option>`).join('')}</select></label><p class="subtle">Erros e respostas com ajuda retornam em um dia. Alterações valem para novas respostas. Os intervalos são parâmetros educacionais, não uma fórmula validada para todos.</p><ul>${entries.length?entries.map(([id,value])=>{const ci=PILOT.CASES.findIndex(c=>c.stages.some(s=>s.id===id)),si=PILOT.CASES[ci].stages.findIndex(s=>s.id===id);return `<li>Caso ${ci+1}, etapa ${si+1}: ${value.correct?'acerto':'erro'}${value.help?' com ajuda':''} · ${new Date(value.due).toLocaleDateString('pt-BR')} <button type="button" class="btn" onclick="LabFerro.caseOpen(${ci},${si})">Abrir etapa</button></li>`;}).join(''):'<li>Responda uma etapa dos casos para iniciar seu histórico.</li>'}</ul>`;
}
function toolsView(){return `<h1>Contas com unidades</h1><p>Use dados fictícios. Nenhum valor digitado nestas calculadoras é armazenado. A conta não define um diagnóstico.</p><div class="lab-tools"><form data-lab-ferro-calc="vcm" novalidate><h2>Volume corpuscular médio</h2><p>VCM (fL) = hematócrito (%) × 10 ÷ hemácias (milhões/µL).</p><div class="lab-tool-fields"><label>Hematócrito (%)<input name="ht" inputmode="decimal" value="30,8" required></label><label>Hemácias (milhões/µL)<input name="rbc" inputmode="decimal" value="4,4" required></label></div><button type="submit" class="btn primary">Calcular VCM</button><output aria-live="polite"></output></form><form data-lab-ferro-calc="tsat" novalidate><h2>Saturação de transferrina</h2><p>Saturação (%) = ferro ÷ capacidade total de ligação × 100, com unidades compatíveis. Não usar transferrina em mg/dL como denominador.</p><div class="lab-tool-fields"><label>Ferro<input name="iron" inputmode="decimal" value="24" required></label><label>Unidade do ferro<select name="ironUnit"><option value="ugdl">µg/dL</option><option value="umoll">µmol/L</option></select></label><label>Capacidade total de ligação<input name="tibc" inputmode="decimal" value="400" required></label><label>Unidade da capacidade<select name="tibcUnit"><option value="ugdl">µg/dL</option><option value="umoll">µmol/L</option></select></label></div><button type="submit" class="btn primary">Calcular saturação</button><output aria-live="polite"></output></form></div>`;}
function calculate(type,data){
 function number(key){const raw=String(data[key]??'').trim();if(!/^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw))throw new Error('Preencha os valores com números, usando ponto ou vírgula decimal, sem unidades no campo.');const v=Number(raw.replace(',','.'));if(!Number.isFinite(v))throw new Error('Informe números finitos.');return v;}
 let result,unit;
 if(type==='vcm'){const ht=number('ht'),rbc=number('rbc');if(ht<=0||ht>100||rbc<=0)throw new Error('O hematócrito deve ser maior que zero e até 100%; as hemácias devem ser maiores que zero.');result=ht*10/rbc;unit='fL';}
 else if(type==='tsat'){const iron=number('iron'),tibc=number('tibc');if(!['ugdl','umoll'].includes(data.ironUnit)||data.ironUnit!==data.tibcUnit)throw new Error('Use unidades compatíveis. Solicite reemissão ou conversão validada antes de calcular.');if(tibc<=0)throw new Error('A capacidade de ligação deve ser maior que zero.');result=iron/tibc*100;if(result>100)throw new Error('A razão ficou acima de 100%. Confira a amostra, os analitos e as unidades com o laboratório.');unit='%';}
 else throw new Error('Cálculo desconhecido.');
 if(!Number.isFinite(result))throw new Error('Valores fora da faixa calculável.');return {value:result,unit};
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
 else if(screen==='contas')content=toolsView();
 else if(screen==='revisoes')content=reviewView();
 else content=course.page();
 return `<div class="lab-ferro"><button type="button" class="btn" onclick="navigate('hemo')">← Curso de Hemograma</button><p class="lab-ferro-status">Piloto em revisão docente. Casos e resultados fictícios; fontes e limitações indicadas nas aulas.</p><nav class="lab-ferro-nav" aria-label="Laboratório de anemia microcítica"><button type="button" class="btn" onclick="LabFerro.go()">Aulas</button><button type="button" class="btn" onclick="LabFerro.cases()">Cinco casos progressivos</button><button type="button" class="btn" onclick="LabFerro.tools()">Contas com unidades</button><button type="button" class="btn" onclick="LabFerro.review()">Revisões e progresso</button></nav>${content}</div>`;
}
function afterRender(){
 if(ui.route!=='labferro')return;const main=getMain();
 main.querySelectorAll('.pocus-module .pocus-sec > h3,.pocus-module .pocus-goals > h3').forEach(heading=>{const h=document.createElement('h2');h.textContent=heading.textContent;heading.replaceWith(h);});
 const parts=location.hash.slice(1).split('/');if(parts[1]==='aula'){
  const module=PILOT.MODULES[Number(parts[2])],first=main.querySelector('.pocus-goals');
  if(first&&module?.pretest)first.insertAdjacentHTML('afterend',`<section class="pocus-sec"><h2>Antes de ler: pré-teste</h2><ol>${module.pretest.map(q=>`<li>${e(q)}</li>`).join('')}</ol><p class="subtle">Responda em voz alta ou no caderno. Abrir a aula não conta como acerto.</p></section>`);
 }
}
function cases(){go('casos');}
function caseOpen(ci,si){if(!Number.isInteger(ci)||!PILOT.CASES[ci])return;const stages=PILOT.CASES[ci].stages;const next=stages.findIndex(s=>!data().decisions[s.id]);go('caso/'+ci+'/'+(Number.isInteger(si)?si:Math.max(0,next)));}
function pick(choice){
 const s=PILOT.CASES[caseIndex]?.stages[stageIndex];if(!s||data().decisions[s.id]||!Number.isInteger(choice)||choice<0||choice>=s.o.length)return;
 window.MasterActivity?.track('question_answer','labferro:'+s.id,{correct:choice===s.a});
 const help=document.getElementById('lab-used-help').checked||document.querySelector('.lab-ferro .lab-help').open||!!data().seenSolution[PILOT.CASES[caseIndex].id],correct=choice===s.a,now=new Date(),days=correct&&!help?data().settings.correctDays:1;
 const entry={selected:choice,correct,help,justification:document.getElementById('lab-justification').value.slice(0,1200),at:now.toISOString(),due:new Date(now.getTime()+days*86400000).toISOString()};
 if(!save(next=>{next.decisions[s.id]=entry;next.attempts.push({caseId:PILOT.CASES[caseIndex].id,stageId:s.id,selected:choice,correct,help,at:entry.at});next.attempts=next.attempts.slice(-100);next.counts.attempts++;if(correct)next.counts.correct++;}))return;
 render();const feedback=document.querySelector('.lab-ferro .lab-feedback');feedback?.focus({preventScroll:true});
}
function retry(){const s=PILOT.CASES[caseIndex]?.stages[stageIndex];if(!s||!save(next=>{delete next.decisions[s.id];}))return;render();document.querySelector('.lab-ferro .lab-choices button')?.focus({preventScroll:true});}
function next(){const c=PILOT.CASES[caseIndex];if(!data().decisions[c.stages[stageIndex].id]||stageIndex>=c.stages.length-1)return;go('caso/'+caseIndex+'/'+(stageIndex+1));}
function draft(value){const s=PILOT.CASES[caseIndex]?.stages[stageIndex];if(!s)return;const saved=save(next=>{next.drafts[s.id]=String(value).slice(0,1200);});const status=document.querySelector('.lab-ferro .lab-draft-status');if(status){clearTimeout(noteTimer);status.textContent=saved?'Justificativa atualizada.':'Justificativa ainda não salva. Tente novamente.';}}
function solution(index=caseIndex){if(!PILOT.CASES[index]||!save(next=>{next.seenSolution[PILOT.CASES[index].id]=true;}))return;go('sintese/'+index);}
function tools(){go('contas');}
function review(){go('revisoes');}
function interval(value){const n=Number(value);if(![1,3,7].includes(n))return;if(save(next=>{next.settings.correctDays=n;}))toast('Intervalo atualizado para novas respostas.');}
function searchItems(){return PILOT.MODULES.map((m,i)=>({type:'Laboratório de Hemograma',label:m.title,sub:'Anemia microcítica · '+m.layer,icon:'▤',action:()=>go('aula/'+i),text:[m.title,m.summary,...m.goals]})).concat(PILOT.CASES.map((c,i)=>({type:'Caso de laboratório',label:c.focus,sub:'Anemia microcítica · caso progressivo',icon:'▤',action:()=>caseOpen(i),text:[c.focus,c.stem]})));}
course.open=i=>go(i===null?'':'aula/'+Math.max(0,Math.min(PILOT.MODULES.length-1,Number(i)||0)));
course.bank=cases;course.caseOpen=solution;
const baseAnswer=course.answer;course.answer=(mi,qi,oi)=>{const q=PILOT.MODULES[mi]?.quiz[qi];if(!q||!Number.isInteger(oi)||oi<0||oi>=q.o.length||!guard())return false;baseAnswer(mi,qi,oi);const feedback=document.querySelector('#labFerroq-'+mi+'-'+qi+' .pocus-q-why');if(feedback){feedback.tabIndex=-1;feedback.focus({preventScroll:true});}};
const baseComplete=course.complete;course.complete=(id,value)=>{if(PILOT.MODULES.some(m=>m.id===id)&&typeof value==='boolean'&&guard())baseComplete(id,value);};
const baseSeen=course.markSeen;course.markSeen=(id,value)=>{if(PILOT.CASES.some(c=>c.id===id)&&typeof value==='boolean'&&guard())baseSeen(id,value);};
document.addEventListener('submit',event=>{
 const form=event.target.closest?.('[data-lab-ferro-calc]');if(!form||ui.route!=='labferro')return;event.preventDefault();const output=form.querySelector('output');
 try{const result=calculate(form.dataset.labFerroCalc,Object.fromEntries(new FormData(form)));output.textContent='Resultado: '+result.value.toLocaleString('pt-BR',{maximumFractionDigits:2})+' '+result.unit;output.className='';}catch(error){output.textContent=error.message;output.className='lab-error';}
});
window.addEventListener('master-auth-ended',()=>clearTimeout(noteTimer));
return {page,afterRender,entry,go,home:()=>go(),cases,caseOpen,pick,retry,next,draft,solution,tools,review,interval,calculate,searchItems,course};
})();
