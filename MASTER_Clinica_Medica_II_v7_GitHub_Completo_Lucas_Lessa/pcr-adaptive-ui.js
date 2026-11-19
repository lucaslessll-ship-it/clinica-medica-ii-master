/* Clínica Master PCR — componentes de domínio, recomendação, revisão e métricas. */
(function createPCRAdaptiveUI(){
'use strict';
const esc=x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pct=n=>Math.round(Math.max(0,Math.min(100,n*100)));
const E=()=>window.PCRAdaptive;
const state=()=>E().state();
function badge(x){
 const colors={"Forte":"strong","Revisar":"warning","Em construção":"muted","Em desenvolvimento":"muted","Não avaliada":"muted"};
 return '<span class="pcr-ai-status '+(colors[x]||"muted")+'">'+esc(x)+'</span>';
}
function competencies(){
 const stats=E().allStats();
 return `<section class="pcr-ai-section" aria-label="Mapa de competências">
 <div class="pcr-ai-header"><div><span class="ue-pcr-eyebrow">PROGRESSO POR HABILIDADE</span><h3>O que você realmente consegue resolver?</h3></div><span class="pcr-ai-secondary">Estimativa inicial · não é certificação clínica</span></div>
 <p class="pcr-ai-caption">A barra expressa desempenho estimado e a linha inferior mostra quantas tentativas a sustentam. A pontuação não cresce apenas por abrir a aula.</p>
 <div class="pcr-ai-skills">${stats.map(s=>`<div class="pcr-ai-skill"><div class="pcr-ai-skill-head"><strong>${esc(s.title)}</strong>${badge(s.status)}</div>
 <div class="pcr-ai-skill-bar" role="progressbar" aria-label="${esc(s.title)}: ${pct(s.mean)} por cento estimados" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct(s.mean)}"><div style="width:${pct(s.mean)}%"></div></div>
 <div class="pcr-ai-skill-foot"><span>${s.attempts} tentativa${s.attempts!==1?"s":""} · evidência ${pct(s.evidence)}%</span><span>${s.overdue?"Revisão disponível":s.review?"Próxima: "+new Date(s.due).toLocaleDateString("pt-BR"):"Ainda sem revisão"}</span></div></div>`).join("")}</div></section>`;
}
function recommendation(){
 const r=E().recommendations(1)[0],k=E().skillStats(r.skill);
 return `<section class="pcr-ai-next"><span class="ue-pcr-eyebrow">PRÓXIMA AÇÃO MAIS ÚTIL</span><div class="pcr-ai-next-layout"><div><h3>${esc(r.title)}</h3><p>${esc(r.reason)}</p><small>O sistema combina lacuna de domínio, revisão, peso de prova, relevância clínica e pré-requisitos. Pontuação de prioridade ${r.score}/100 — regra experimental.</small></div><div class="pcr-ai-action-col"><button type="button" class="btn primary" onclick="PCRAdaptiveUI.start('${esc(r.skill)}')">Treinar agora →</button><span>${k.attempts} respostas nesta competência</span></div></div></section>`;
}
function review(){
 const s=state(),q=E().item(s.ui.activeQuestion);
 const stats=E().report();
 if(!q)return `<section class="pcr-ai-section" id="pcr-ai-review"><div class="pcr-ai-header"><div><span class="ue-pcr-eyebrow">REVISÃO DISTRIBUÍDA</span><h3>Prática de recuperação</h3></div></div>
 <p class="pcr-ai-caption">O algoritmo escolhe perguntas não repetidas recentemente. Ao responder, registra a competência e calcula quando rever.</p>
 <div class="pcr-ai-review-actions"><button type="button" class="btn primary" onclick="PCRAdaptiveUI.start()">Começar revisão de maior prioridade</button><button type="button" class="btn secondary" onclick="PCRAdaptiveUI.mixed()">Misturar os assuntos</button></div>
 <p class="pcr-ai-note">${stats.due} competência${stats.due!==1?"s":""} com revisão vencida neste momento.</p></section>`;
 const answered=s.ui.answered===q.id,chosen=s.ui.chosen;
 return `<section class="pcr-ai-section" id="pcr-ai-review"><div class="pcr-ai-header"><div><span class="ue-pcr-eyebrow">PRÁTICA ADAPTATIVA · QUESTÃO INÉDITA</span><h3>${esc(E().skills.find(x=>x.id===q.skill)?.title)}</h3></div><span class="pcr-ai-secondary">${q.tag==="transfer"?"Transferência clínica":"Recuperação de conceito"}</span></div>
 <div class="pcr-ai-review-card"><h4>${esc(q.prompt)}</h4><div class="pcr-ai-review-options">${q.options.map((o,i)=>`<button type="button" ${answered?"disabled":""} class="pcr-ai-option${answered&&i===q.answer?" right":""}${answered&&i===chosen&&chosen!==q.answer?" wrong":""}" onclick="PCRAdaptiveUI.answer('${q.id}',${i})" aria-pressed="${answered&&i===chosen}"><b>${"ABCD"[i]}</b><span>${esc(o)}</span></button>`).join("")}</div>
 ${answered?`<div class="pcr-ai-explain"><strong>${chosen===q.answer?"Acertou a decisão.":"Reavalie o raciocínio."}</strong><p>${esc(q.why[chosen])}</p><details><summary>Entenda todas as alternativas</summary><ol type="A">${q.why.map((p,i)=>`<li><strong>${"ABCD"[i]}.</strong> ${esc(p)}</li>`).join("")}</ol></details></div>
 <button type="button" class="btn primary" onclick="PCRAdaptiveUI.next()">Próxima questão de maior utilidade →</button>`:"<p class=\"pcr-ai-caption\">Responda antes de abrir a correção. A ordem das questões intercala competências quando há necessidade.</p>"}</div></section>`;
}
function metrics(){
 const m=E().report(),s=state();
 return `<section class="pcr-ai-section" aria-label="Indicadores de aprendizagem"><div class="pcr-ai-header"><div><span class="ue-pcr-eyebrow">PAINEL DE APRENDIZAGEM · DADOS LOCAIS</span><h3>Resultado além das páginas lidas</h3></div></div>
 <div class="pcr-ai-metrics">
 <div><span>Decisões realizadas</span><strong>${m.events}</strong><small>Com competência identificada</small></div>
 <div><span>Acertos registrados</span><strong>${m.accuracy===null?"—":m.accuracy+"%"}</strong><small>Não equivale a domínio</small></div>
 <div><span>Casos / transferência</span><strong>${m.transferAccuracy===null?"—":m.transferAccuracy+"%"}</strong><small>${m.transfer} tentativas de transferência</small></div>
 <div><span>Tempo para começar</span><strong>${m.startSeconds===null?"—":m.startSeconds+"s"}</strong><small>Estimativa das sessões locais</small></div>
 </div>
 <p class="pcr-ai-caption">Calibração de confiança: ${m.calibration===null?"ainda não há respostas classificadas":m.calibration+"% de concordância nas respostas classificadas"}; amostras pequenas não demonstram aprendizagem duradoura. Os dados permanecem no armazenamento usado pelo site.</p>
 <div class="pcr-ai-choice"><span>Como quer estudar?</span><button type="button" class="btn secondary" onclick="PCRAdaptiveUI.layout('guided')" aria-pressed="${s.ui.startMode!=="reading"}">Decisões guiadas</button><button type="button" class="btn secondary" onclick="PCRAdaptiveUI.layout('reading')" aria-pressed="${s.ui.startMode==="reading"}">Leitura integral</button></div>
 </section>`;
}
function homepage(){
 const due=E().dueSkills();
 return `<div class="pcr-ai-home"><div class="pcr-ai-welcome"><div><span class="ue-pcr-eyebrow">CLÍNICA MASTER ADAPTIVE · PCR</span><strong>Comece pela atividade mais útil.</strong><p>Não precisa planejar a sessão: escolha uma duração e responda à primeira pergunta.</p></div><button type="button" class="btn primary" onclick="PCRAdaptiveUI.start()">Começar em um clique →</button></div>
 ${due.length?`<p class="pcr-ai-due">${due.length} revisão${due.length>1?"ões":""} disponível${due.length>1?"eis":""} agora.</p>`:""}
 ${recommendation()}</div>`;
}
function progress(){
 const E1=E();if(!E1)return '';
 return '<div class="pcr-ai-progress">'+recommendation()+competencies()+metrics()+'</div>';
}
function begin(skill){
 const q=E().nextReview(skill||E().dueSkills()[0]?.id||E().recommendations(1)[0]?.skill);
 if(!q)return;
 const pilot=window.EmergencyPCR;
 pilot?.mode?.("15");
 pilot?.go?.("summary");
 pilot?.refresh?.();
 try{const el=document.getElementById("pcr-ai-review");el?.scrollIntoView?.({behavior:"smooth",block:"start"})}catch(e){}
}
function redraw(){window.EmergencyPCR?.refresh?.();}
function answer(id,v){const a=E().answerReview(id,v);if(a)redraw();}
function next(){E().nextReview();redraw();}
function mixed(){
 const set=E().skills;
 const candidates=set.map(x=>E().skillStats(x.id)).sort((a,b)=>a.attempts-b.attempts);
 begin(candidates[0]?.id);
}
function layout(value){
 if(!["guided","reading"].includes(value))return;
 const s=state();s.ui.startMode=value;stateSave();
 if(value==="reading"){window.EmergencyPCR?.mode?.("30");window.EmergencyPCR?.go?.("summary");}
 else{window.EmergencyPCR?.go?.("start");}
 redraw();
}
window.PCRAdaptiveUI={homepage,progress,review,competencies,metrics,recommendation,start:begin,answer,next,mixed,layout};
})();
