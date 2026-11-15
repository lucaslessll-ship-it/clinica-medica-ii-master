/* Motor comum dos cursos em camadas (Hemograma, Antimicrobianos).
   Mesmo desenho dos cursos de POCUS e ECG: módulos com objetivos, seções,
   erros comuns, questões e fontes, mais um banco de casos para resolver.
   Progresso salvo em store.study[key]. Imagens, quando houver, vêm da base
   privada (LessonImages) pela chave '<key>_<id>'. */
const CourseKit=(()=>{
'use strict';
function create(cfg){
  const {global:G,key,route,label,REFS,MODULES,CASES}=cfg;
  let view=null,current=null;
  // Distribui a posição da alternativa correta, para a resposta não cair sempre na mesma letra.
  MODULES.forEach((m,mi)=>m.quiz.forEach((x,qi)=>{const to=(mi+qi*2+1)%x.o.length;if(to===x.a)return;const o=x.o.slice();[o[to],o[x.a]]=[o[x.a],o[to]];x.o=o;x.a=to;}));
  function st(){const s=store.study||(store.study={version:1,since:new Date().toISOString(),reviews:{},steps:{},settings:{intervals:[1,3,7],dailyLimit:20}});const p=s[key]||(s[key]={});p.done=p.done||{};p.quiz=p.quiz||{};p.seen=p.seen||{};return p;}
  const doneCount=()=>MODULES.filter(m=>st().done[m.id]).length;
  const seenCount=()=>CASES.filter(c=>st().seen[c.id]).length;
  function quizScore(m){const q=st().quiz;let right=0,answered=0;m.quiz.forEach((x,i)=>{const v=q[m.id+'_'+i];if(Number.isInteger(v)){answered++;if(v===x.a)right++;}});return {right,answered,total:m.quiz.length};}
  function quizItem(mi,qi){
    const m=MODULES[mi],x=m.quiz[qi],chosen=st().quiz[m.id+'_'+qi],answered=Number.isInteger(chosen);
    return `<fieldset class="pocus-q" id="${key}q-${mi}-${qi}"><legend><span>Questão ${qi+1}</span>${x.q}</legend><div class="pocus-q-options">${x.o.map((o,oi)=>`<button type="button" class="pocus-q-opt${answered&&oi===x.a?' right':''}${answered&&oi===chosen&&oi!==x.a?' wrong':''}" aria-pressed="${chosen===oi}" onclick="${G}.answer(${mi},${qi},${oi})"><b>${'ABCD'[oi]}</b><span>${o}</span></button>`).join('')}</div>${answered?`<p class="pocus-q-why" role="status"><strong>${chosen===x.a?'Correto.':'Resposta: '+'ABCD'[x.a]+'.'}</strong> ${x.why}</p>`:''}</fieldset>`;
  }
  function tableMarkup(t){return `<div class="pocus-table-wrap"><table class="pocus-table"><thead><tr>${t.head.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r=>`<tr>${r.map((c,i)=>i?`<td>${c}</td>`:`<th scope="row">${c}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
  function sectionMarkup(s){
    return `<section class="pocus-sec"><h3>${s.h}</h3>${(s.p||[]).map(t=>`<p>${t}</p>`).join('')}${s.list?`<ul>${s.list.map(t=>`<li>${t}</li>`).join('')}</ul>`:''}${s.table?tableMarkup(s.table):''}${s.after?`<p>${s.after}</p>`:''}</section>`;
  }
  const refItem=r=>REFS[r].u?`<li><a href="${REFS[r].u}" target="_blank" rel="noopener">${REFS[r].t}</a></li>`:`<li>${REFS[r].t}</li>`;
  function moduleView(mi){
    const m=MODULES[mi],done=!!st().done[m.id];
    return `<nav class="pocus-crumb" aria-label="${cfg.title}"><button type="button" class="btn" onclick="${G}.open(null)">← Todos os módulos</button><span>Módulo ${mi+1} de ${MODULES.length}</span></nav>
    <article class="card pad pocus-module"><span class="kicker">${m.layer}</span><h1 class="pocus-title">${m.title}</h1><p class="pocus-lead">${m.summary}</p>
    ${mi?`<p class="info-notice">Este módulo usa o que foi visto em "${MODULES[mi-1].title}". Se algo parecer novo, volte um passo.</p>`:''}
    <section class="pocus-goals"><h3>Ao final, você deve conseguir</h3><ul>${m.goals.map(g=>`<li>${g}</li>`).join('')}</ul></section>
    ${m.sections.map(sectionMarkup).join('')}
    ${cfg.images!==false&&window.LessonImages?LessonImages.slot(key+'_'+m.id,'pocus-sec'):''}
    <section class="pocus-sec pocus-pitfalls"><h3>Erros comuns</h3><ul>${m.pitfalls.map(t=>`<li>${t}</li>`).join('')}</ul></section>
    <section class="pocus-sec"><h3>Fixação</h3><p class="subtle">Responda antes de ver o comentário. As respostas ficam salvas no seu progresso.</p>${m.quiz.map((_,qi)=>quizItem(mi,qi)).join('')}</section>
    <section class="pocus-sec pocus-refs"><h3>Fontes deste módulo</h3><ul>${m.refs.map(refItem).join('')}</ul><p>${cfg.refNote}</p></section>
    <label class="pocus-done"><input type="checkbox" ${done?'checked':''} onchange="${G}.complete('${m.id}',this.checked)"> Estudei este módulo e respondi às questões</label>
    <div class="pocus-pager">${mi?`<button type="button" class="btn" onclick="${G}.open(${mi-1})">← ${MODULES[mi-1].title}</button>`:'<span></span>'}${mi<MODULES.length-1?`<button type="button" class="btn primary" onclick="${G}.open(${mi+1})">${MODULES[mi+1].title} →</button>`:`<button type="button" class="btn primary" onclick="${G}.open(null)">Concluir e voltar ao curso</button>`}</div></article>`;
  }
  function caseView(ci){
    const c=CASES[ci],seen=!!st().seen[c.id];
    return `<nav class="pocus-crumb" aria-label="${cfg.bankTitle}"><button type="button" class="btn" onclick="${G}.bank()">← Todos os casos</button><span>Caso ${ci+1} de ${CASES.length}</span></nav>
    <article class="card pad pocus-module"><span class="kicker">${c.focus}</span><h1 class="pocus-title">Caso ${ci+1}</h1><p class="pocus-lead">${c.stem}</p>
    ${c.table?`<section class="pocus-sec"><h3>${c.tableTitle||'Dados'}</h3>${tableMarkup(c.table)}</section>`:''}
    <section class="pocus-sec"><h3>Sua tarefa</h3><p>${c.ask}</p><p class="subtle">${cfg.caseHint}</p></section>
    <details class="pocus-script"><summary>Ver a resolução comentada</summary><ul>${c.answer.map(a=>`<li>${a}</li>`).join('')}</ul></details>
    <label class="pocus-done"><input type="checkbox" ${seen?'checked':''} onchange="${G}.markSeen('${c.id}',this.checked)"> Resolvi este caso</label>
    <div class="pocus-pager">${ci?`<button type="button" class="btn" onclick="${G}.caseOpen(${ci-1})">← Caso ${ci}</button>`:'<span></span>'}${ci<CASES.length-1?`<button type="button" class="btn primary" onclick="${G}.caseOpen(${ci+1})">Caso ${ci+2} →</button>`:`<button type="button" class="btn primary" onclick="${G}.bank()">Voltar aos casos</button>`}</div></article>`;
  }
  function bankView(){
    const n=seenCount(),pct=Math.round(n/CASES.length*100);
    return `<nav class="pocus-crumb" aria-label="${cfg.title}"><button type="button" class="btn" onclick="${G}.open(null)">← ${cfg.title}</button><span>${cfg.bankTitle}</span></nav>
    ${header('TREINO',cfg.bankHeading,cfg.bankLead)}
    ${section('Seu progresso',`<div class="card pad pocus-progress"><div class="pocus-progress-head"><strong>${n} de ${CASES.length} casos resolvidos</strong><span>${pct}%</span></div><div class="progress-track" role="progressbar" aria-label="Progresso nos casos" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div class="progress-fill" style="width:${pct}%"></div></div></div>
    <ol class="pocus-grid">${CASES.map((c,i)=>{const d=!!st().seen[c.id];return `<li><button type="button" class="pocus-card${d?' done':''}" onclick="${G}.caseOpen(${i})"><span class="pocus-card-n">${i+1}</span><span class="pocus-card-body"><small>${c.focus}</small><strong>${c.stem}</strong><em>com resolução comentada${d?' · resolvido':''}</em></span></button></li>`}).join('')}</ol>`)}`;
  }
  function home(){
    const n=doneCount(),pct=Math.round(n/MODULES.length*100),total=MODULES.reduce((s,m)=>s+m.quiz.length,0);
    return header('CURSO',cfg.heading,cfg.lead)
    +`<div class="info-notice">${MODULES.length} módulos e ${total} questões, mais ${CASES.length} casos com resolução comentada. ${cfg.notice}</div>`
    +(typeof cfg.extraHome==='function'?cfg.extraHome():'')
    +section('Seu percurso',`<div class="card pad pocus-progress"><div class="pocus-progress-head"><strong>${n} de ${MODULES.length} módulos concluídos</strong><span>${pct}%</span></div><div class="progress-track" role="progressbar" aria-label="Progresso no ${cfg.title}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div class="progress-fill" style="width:${pct}%"></div></div><p class="subtle">${cfg.pathHint}</p></div>
    <ol class="pocus-grid">${MODULES.map((m,i)=>{const q=quizScore(m),d=!!st().done[m.id];return `<li><button type="button" class="pocus-card${d?' done':''}" onclick="${G}.open(${i})"><span class="pocus-card-n">${i+1}</span><span class="pocus-card-body"><small>${m.layer}</small><strong>${m.title}</strong><span>${m.summary}</span><em>${m.min} min · ${q.answered?`${q.right}/${q.total} questões certas`:`${q.total} questões`}${d?' · concluído':''}</em></span></button></li>`}).join('')}</ol>`)
    +section(cfg.bankTitle,`<div class="card pad"><p>${cfg.bankLead} ${seenCount()} de ${CASES.length} resolvidos até agora.</p><button type="button" class="btn primary" onclick="${G}.bank()">Abrir os casos</button></div>`)
    +section('Fontes e curadoria',`<div class="card pad pocus-refs"><p>${cfg.sourcesNote}</p><ul>${Object.keys(REFS).map(refItem).join('')}</ul></div>`);
  }
  function page(){
    if(current!==null&&CASES[current])return caseView(current);
    if(view==='bank')return bankView();
    return view===null||!MODULES[view]?home():moduleView(view);
  }
  function focusTop(){window.scrollTo({top:0,behavior:'instant'});const h=document.querySelector('#main-content h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}}
  function open(i){current=null;view=i===null?null:Math.max(0,Math.min(MODULES.length-1,Number(i)||0));render();focusTop();}
  function bank(){current=null;view='bank';render();focusTop();}
  function caseOpen(i){current=Math.max(0,Math.min(CASES.length-1,Number(i)||0));render();focusTop();}
  function answer(mi,qi,oi){const m=MODULES[mi];if(!m||!m.quiz[qi])return;st().quiz[m.id+'_'+qi]=oi;stateSave();const el=document.getElementById(`${key}q-${mi}-${qi}`);if(el)el.outerHTML=quizItem(mi,qi);}
  function complete(id,value){st().done[id]=!!value;stateSave();}
  function markSeen(id,value){st().seen[id]=!!value;stateSave();}
  function searchItems(){
    return MODULES.map((m,i)=>({type:'Módulo de '+label,label:m.title,sub:cfg.title+' · '+m.layer,icon:'◎',action:()=>{navigate(route);open(i);},text:[m.title,m.summary,m.layer]}))
      .concat(CASES.map((c,i)=>({type:'Caso de '+label,label:'Caso '+(i+1)+': '+c.focus,sub:cfg.title,icon:'◎',action:()=>{navigate(route);caseOpen(i);},text:[c.stem,c.focus]})));
  }
  return {page,open,bank,caseOpen,answer,complete,markSeen,searchItems,modulePage:i=>MODULES[i]?moduleView(i):home(),casePage:i=>CASES[i]?caseView(i):home(),modules:()=>MODULES.length,cases:()=>CASES.length};
}
return {create};
})();
window.CourseKit=CourseKit;
