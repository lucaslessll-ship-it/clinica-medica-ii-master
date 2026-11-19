/* Curso de Urgência e Emergência integrado ao Master, respeitando o motor de progresso existente. */
(function installEmergency(){
'use strict';
const all=(window.EMERGENCY_CONTENT||[]).filter(x=>x&&x.id&&x.stage&&Array.isArray(x.quiz));
const P1=all.filter(x=>x.stage==='P1');
const P2=all.filter(x=>x.stage==='P2');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const REFS={
 aha:{t:"American Heart Association — Adult BLS/ACLS, 2025",u:"https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support"},
 ahaSpecial:{t:"AHA 2025 — Circunstâncias especiais da ressuscitação",u:"https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-and-pediatric-special-circumstances-of-resuscitation/"},
 ahaStroke:{t:"AHA/ASA — Early Management of Acute Ischemic Stroke, 2026",u:"https://professional.heart.org/en/science-news/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-stroke"},
 acs2025:{t:"ACC/AHA — Síndromes coronarianas agudas, 2025",u:"https://professional.heart.org/en/science-news/2025-guideline-for-the-management-of-patients-with-acute-coronary-syndromes/top-things-to-know"},
 ssc:{t:"Surviving Sepsis Campaign — Diretriz de Sepse e Choque Séptico, 2026",u:"https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026"},
 gina:{t:"GINA — Summary Guide, 2026",u:"https://ginasthma.org/wp-content/uploads/2026/07/GINA-Summary-Guide-2026-WEB-WMS.pdf"},
 ada:{t:"ADA — Standards of Care in Diabetes, 2026",u:"https://diabetesjournals.org/care/issue/49/Supplement_1"},
 atls:{t:"American College of Surgeons — ATLS, 11ª edição (xABCDE)",u:"https://www.facs.org/quality-programs/trauma/education/advanced-trauma-life-support/atls-11/"},
 aba:{t:"American Burn Association — Resuscitation in Burn Patients",u:"https://www.aafp.org/afp/2025/0800/practice-guidelines-resuscitation-patients-burns"},
 erc:{t:"European Resuscitation Council — Diretrizes de Ressuscitação, 2025",u:"https://www.erc.edu/media/ad5dtph1/gl2025-01-exec-e.pdf"},
 general:{t:"HAJJAR et al. Medicina de emergência: abordagem prática, 18ª ed., 2024 (bibliografia da disciplina)",u:"https://integrada.minhabiblioteca.com.br/reader/books/9788520459553/"},
 postAha:{t:"AHA 2025 — Cuidados pós-parada (oxigênio, temperatura e prognóstico)",u:"https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/post-cardiac-arrest-care/"},
 atsResp:{t:"ATS — Noninvasive Respiratory Support in Acute Respiratory Failure, 2025",u:"https://academic.oup.com/ajrccm/article/212/9/2135/8721554"},
 ards:{t:"ATS/ESICM/SCCM — Ventilação protetora na SDRA",u:"https://www.thoracic.org/statements/resources/cc/ards-guidelines.pdf"},
 htn2025:{t:"Diretriz Brasileira de Hipertensão Arterial, 2025 — Emergências hipertensivas",u:"https://www.scielo.br/j/abc/a/BXT7Vk4B9VKQnJFsJhgJ4Hn/?format=html&ilang=pt_BR"},
 ukka2026:{t:"UK Kidney Association — Tratamento de hipercalemia aguda, atualização 2026",u:"https://guidelines.ukkidney.org/hyperkalaemia/"},
 dka2024:{t:"ADA/EASD — Hyperglycemic Crises in Adults, consenso 2024",u:"https://doi.org/10.2337/dci24-0032"},
 endocrine:{t:"Society for Endocrinology — Adrenal Crisis, tratamento imediato",u:"https://www.endocrinology.org/clinical-practice/clinical-guidance/adrenal-crisis/"},
 thyroid2026:{t:"Consenso conjunto — Management of Thyroid Emergencies, 2026",u:"https://doi.org/10.1530/ETJ-26-0043"},
 whoPall:{t:"Organização Mundial da Saúde — Palliative Care",u:"https://www.who.int/news-room/fact-sheets/detail/palliative-care"},
 slidePCR:{t:"Slides da disciplina — Parada cardiorrespiratória (Drive)",u:"https://drive.google.com/file/d/1WKQCE_tI0fmiyzYD0cHcl6KzjYZu5PGf/view"},
 slideIRPA:{t:"Slides da disciplina — Insuficiência Respiratória Aguda (Drive)",u:"https://drive.google.com/file/d/153JlL-QQwKekWgxqFn7qBHLCg9yPW-4a/view"},
 slideAVC:{t:"Slides da disciplina — AVC (Drive)",u:"https://drive.google.com/file/d/1NsPDBZref6SnQZzNg30bw5wSGPP3BEUg/view"},
 slideSepse:{t:"Slides da disciplina — Sepse (Drive)",u:"https://drive.google.com/file/d/1TtBdtL0ednrpQ16dzgIfi1F8vZPcX8js/view"},
 slideChoque:{t:"Slides da disciplina — Choque (Drive)",u:"https://drive.google.com/file/d/1UQVs6wDfagDfxFhnN06i6AYx8BVQ-1d0/view"},
 slideTrauma:{t:"Slides da disciplina — Trauma (Drive)",u:"https://drive.google.com/file/d/1a-w0A9LmmON2xHDNGrY7EtotbSx5L-Mg/view"},
 slideSensorio:{t:"Slides da disciplina — Rebaixamento de sensório (Drive)",u:"https://drive.google.com/file/d/1HoONmIlE7r8fDqn0i7CS1SxHjOKZ6745/view"},
 slideArritmia:{t:"Slides da disciplina — Arritmias (Drive)",u:"https://drive.google.com/file/d/1NsJly9D6nDyJ3YAHLS2otXhsqIiHFFks/view"},
 slideAcido:{t:"Slides da disciplina — Distúrbios hidroeletrolíticos e ácido-base (Drive)",u:"https://drive.google.com/file/d/1J3CGf_W_-KXdeXqU1ob9mrWk8Sfh6ld-/view"}
};
const scientificRefsById={
 pcr:['postAha'],irpa:['atsResp'],vm:['ards'],adrenal:['endocrine'],hipertensiva:['htn2025'],
 glicemia:['dka2024'],eletrolitos:['ukka2026'],tireoide:['thyroid2026'],paliativos:['whoPall']
};
for(const m of all)for(const ref of scientificRefsById[m.id]||[])if(!m.refs.includes(ref))m.refs.push(ref);
function scheme(m){
 if(m.id==='pcr')return '<figure class="ue-schema" role="img" aria-label="Traçado ilustrativo de fibrilação ventricular, não diagnóstico"><svg viewBox="0 0 720 125" width="100%" aria-hidden="true"><defs><pattern id="ue-grid" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="#d8ece6" stroke-width=".8"/></pattern></defs><rect width="720" height="125" rx="10" fill="url(#ue-grid)"/><path d="M0 63L13 40 23 86 39 31 54 75 68 46 78 95 93 27 108 64 119 52 131 89 149 37 166 65 174 24 185 94 200 58 211 71 224 29 239 77 254 42 268 68 282 24 293 90 307 37 325 69 342 41 354 82 370 20 385 85 398 44 417 67 426 32 440 93 454 57 469 69 481 26 496 78 508 36 528 82 541 49 553 95 569 25 580 77 601 36 611 70 627 54 641 90 651 42 665 75 681 22 697 80 710 48 720 65" fill="none" stroke="#0b6c66" stroke-width="3" stroke-linecap="round"/></svg><figcaption><strong>Traçado esquemático autoral.</strong> Não reproduz ECG de paciente; compare com os slides originais e o módulo de ECG do site.</figcaption></figure>';
 return '';
}
function addOn(m){
 const flows=(m.flow||[]).map((s,i)=>'<div class="ue-flow-step"><span class="ue-flow-n">'+(i+1)+'</span><span class="ue-flow-q">'+esc(s[0])+'</span><span class="ue-flow-arrow" aria-hidden="true">→</span><strong>'+esc(s[1])+'</strong></div>').join('');
 const cards=(m.flow||[]).slice(0,4).map((s,i)=>'<details class="ue-flash"><summary><span>Cartão '+(i+1)+'</span> Quando: '+esc(s[0])+'?</summary><p>'+esc(s[1])+'</p></details>').join('');
 const slide=m.slide?'<section class="pocus-sec ue-slide-block"><h3>Imagens da aula original</h3><p>Slides originais vinculados ao Google Drive informado. Abra o documento para observar esquemas, imagens e marcações. O acesso depende das permissões do próprio Drive; comentários clínicos desta página são autorais e devem ser cotejados com a diretriz indicada.</p><details class="ue-slide-detail"><summary>Visualizar os slides completos desta aula</summary><div class="ue-pdf"><iframe loading="lazy" title="Slides originais: '+esc(m.title)+'" src="https://drive.google.com/file/d/'+encodeURIComponent(m.slide)+'/preview"></iframe></div></details><p><a href="https://drive.google.com/file/d/'+encodeURIComponent(m.slide)+'/view" target="_blank" rel="noopener noreferrer">Abrir PDF original no Drive ↗</a></p></section>':'';
 const oral=(m.oral||[]).length?'<section class="pocus-sec ue-oral"><h3>Prova oral · treinamento ativo</h3><p class="subtle">Responda em voz alta antes de reabrir o conteúdo. Critério: reconhecer, justificar, tratar e reavaliar.</p><ol>'+m.oral.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></section>':'';
 const memory=(m.memory||[]).length?'<section class="pocus-sec ue-memory"><h3>Pódio da memória · quatro frases essenciais</h3><ol>'+m.memory.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></section>':'';
 const alerts=(m.alerts||[]).length?'<p class="ue-disclaimer">'+m.alerts.map(esc).join(' ')+'</p>':'';
 const depthCards=oral+memory+alerts;
 return '<section class="pocus-sec ue-flow-block"><h3>Fluxograma de raciocínio e conduta</h3><p>Reconhecimento → decisão → ação → reavaliação. Se a primeira resposta falhar, reinicie o ciclo de avaliação.</p><div class="ue-flow">'+flows+'</div></section>'+scheme(m)+'<section class="pocus-sec"><h3>Evocação ativa — pódio da memória</h3><p class="subtle">Tente responder sem consultar a aula antes de expandir cada cartão.</p><div class="ue-flashes">'+cards+'</div></section>'+slide+depthCards;
}
const base={
 label:"Urgência e Emergência",
 images:false,
 refNote:"As doses são educativas e precisam ser conferidas com prescrição, protocolo institucional e supervisão; não substituem atendimento real.",
 sourcesNote:"Conteúdo autoral organizado pelo plano de ensino 2026.2 do 8º período (FMP/UNIFASE); referências oficiais e slides originais da pasta do Drive. Os PDFs exigem permissão de acesso.",
 pathHint:"Percurso orientado por reconhecimento, diagnóstico, conduta, reavaliação, questões e casos.",
 caseHint:"Formule avaliação inicial, hipótese, conduta, monitorização e justificativa antes de revelar.",
 extraModule:addOn
};
const p1=CourseKit.create({
 ...base,key:"uep1",global:"Emergency.p1",route:"emergency-p1",
 title:"Urgência e Emergência — P1",heading:"Fundamentos e ressuscitação · P1",lead:"Reconhecimento de emergências, ABCDE, suporte vital, sepse, trauma e falência orgânica.",
 notice:"Revisão cumulativa: este conteúdo também pode ser exigido na P2.",
 bankTitle:"Casos clínicos P1",bankHeading:"Primeiros minutos que mudam o desfecho",bankLead:"Cenários de atendimento inicial para conduzir a equipe.",MODULES:P1,CASES:P1.flatMap(x=>[x.case,...(x.moreCases||[])]),REFS,
 extraHome:()=>'<p class="ue-shortcut"><button type="button" class="btn secondary" onclick="navigate(\'emergency-p2\')">Seguir para P2 →</button></p>'
});
const p2=CourseKit.create({
 ...base,key:"uep2",global:"Emergency.p2",route:"emergency-p2",
 title:"Urgência e Emergência — P2",heading:"Decisões clínicas em emergência · P2",lead:"Cardiovascular, metabólico, eletrolítico, toxicológico, comunicação e prova cumulativa.",
 notice:"P2 cumulativa: 20 questões, 4 alternativas, 90 minutos, conforme plano de ensino 2026.2.",
 bankTitle:"Casos clínicos P2",bankHeading:"Do sintoma à conduta",bankLead:"Cenários para treinar decisão e reavaliação.",MODULES:P2,CASES:P2.flatMap(x=>[x.case,...(x.moreCases||[])]),REFS,
 extraHome:()=>'<div class="ue-exam-card"><strong>Modo prova · 20 questões · 90 minutos</strong><p>Simulado autoral, alinhado ao formato institucional. Não é reprodução de provas oficiais.</p><button type="button" class="btn primary" onclick="Emergency.startExam()">Iniciar ou retomar simulado P2</button></div>'
});
let examOpen=false;
/* P2 é cumulativa: amostra autoral estruturada com 8 itens P1 e 12 itens P2. */
const item=(m,q,i)=>({id:m.id+'-'+i,module:m.title,stage:m.stage,q:q.q,o:q.o,a:q.a,why:q.why});
const legacyExamItems=[
 ...P1.slice(0,8).map(m=>item(m,m.quiz[0],0)),
 ...P2.map(m=>item(m,m.quiz[0],0)),
 ...P2.slice(0,2).map(m=>item(m,m.quiz[1],1))
];
const examBank=all.flatMap(m=>m.quiz.map((q,i)=>item(m,q,i)));
const examById=new Map(examBank.map(x=>[x.id,x]));
function shuffled(items){
 const arr=items.slice();
 for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
 return arr;
}
function sampleExam(){
 const p1=shuffled(P1).slice(0,8).map(m=>{const i=Math.floor(Math.random()*m.quiz.length);return item(m,m.quiz[i],i);}); 
 const freshP1=p1;
 const p2=P2.map(m=>{const i=Math.floor(Math.random()*m.quiz.length);return item(m,m.quiz[i],i);});
 const used=new Set(p2.map(x=>x.id));
 const extra=shuffled(examBank.filter(x=>x.stage==='P2'&&!used.has(x.id))).slice(0,2);
 return shuffled([...freshP1,...p2,...extra]).map(x=>x.id);
}
function currentExamItems(){
 const active=eState().active;
 if(!active?.items?.length)return legacyExamItems;
 const saved=active.items.map(id=>examById.get(id)).filter(Boolean);
 return saved.length===20?saved:legacyExamItems;
}
function eState(){
 store.study=store.study||{version:1,since:new Date().toISOString(),reviews:{},steps:{},settings:{}};
 const s=store.study.ueExam||(store.study.ueExam={history:[],active:null});
 s.history=s.history||[];
 return s;
}
function startExam(){
 const s=eState();
 if(!s.active||s.active.submitted){s.active={startedAt:Date.now(),deadline:Date.now()+90*60000,items:sampleExam(),answers:{},submitted:false,score:null};stateSave();}
 examOpen=true;navigate('emergency-p2');
}
function examAnswer(i,choice){
 const s=eState().active;if(!s||s.submitted||Date.now()>=s.deadline)return;
 s.answers[i]=choice;stateSave();
 const card=document.getElementById('ue-exam-q-'+i);
 if(card){card.querySelectorAll('button[data-option]').forEach(btn=>{btn.classList.toggle('picked',Number(btn.dataset.option)===choice);btn.setAttribute('aria-pressed',String(Number(btn.dataset.option)===choice));});}
 const p=document.getElementById('ue-exam-count');if(p)p.textContent=Object.keys(s.answers).length+' de '+currentExamItems().length+' respondidas';
}
function finishExam(){
 const s=eState(),e=s.active;if(!e||e.submitted)return;
 const examItems=currentExamItems();e.submitted=true;e.finishedAt=Date.now();e.score=examItems.reduce((n,q,i)=>n+(e.answers[i]===q.a?1:0),0);
 s.history.unshift({startedAt:e.startedAt,finishedAt:e.finishedAt,score:e.score,total:examItems.length,answers:{...e.answers},items:e.items?e.items.slice():null});
 stateSave();render();
}
function exitExam(){examOpen=false;render();}
function examPage(){
 const e=eState().active;if(!e)return p2.page();
 const examItems=currentExamItems();
 const submitted=!!e.submitted;
 const remaining=Math.max(0,(e.deadline-Date.now())/1000);
 const displayTime=secs=>String(Math.floor(secs/3600)).padStart(2,'0')+':'+String(Math.floor(secs%3600/60)).padStart(2,'0')+':'+String(Math.floor(secs%60)).padStart(2,'0');
 const count=Object.keys(e.answers).length;
 return '<section class="emergency-page ue-exam"><button class="btn secondary" type="button" onclick="Emergency.exitExam()">← Voltar ao curso P2</button>'+
 '<header class="ue-exam-head"><span class="kicker">AVALIAÇÃO FORMATIVA AUTORAL</span><h1>Simulado de Urgência e Emergência</h1><p>20 questões · 4 opções · 90 minutos · P2 cumulativa (8 questões P1 + 12 questões P2 desta versão)</p>'+
 '<div class="ue-exam-metrics"><strong id="ue-exam-count">'+count+' de '+examItems.length+' respondidas</strong><strong id="ue-timer">'+(submitted?'Concluído':displayTime(remaining))+'</strong>'+(submitted?'<strong>'+e.score+'/'+examItems.length+' acertos</strong>':'')+'</div></header>'+
 examItems.map((q,i)=>'<fieldset id="ue-exam-q-'+i+'" class="pocus-q ue-exam-question"><legend><span>Questão '+(i+1)+' · '+esc(q.module)+'</span>'+esc(q.q)+'</legend><div class="pocus-q-options">'+q.o.map((o,j)=>'<button type="button" data-option="'+j+'" '+(submitted?'disabled':'onclick="Emergency.examAnswer('+i+','+j+')"')+' aria-pressed="'+(e.answers[i]===j)+'" class="pocus-q-opt '+(e.answers[i]===j?'picked ':'')+(submitted&&j===q.a?'right ':'')+(submitted&&e.answers[i]===j&&j!==q.a?'wrong':'')+'"><b>'+'ABCD'[j]+'</b><span>'+esc(o)+'</span></button>').join('')+'</div>'+(submitted?'<p class="pocus-q-why"><strong>Gabarito: '+'ABCD'[q.a]+'.</strong> '+esc(q.why)+'</p>':'')+'</fieldset>').join('')+
 (submitted?'<div class="ue-exam-card"><h2>Resultado: '+e.score+' de '+examItems.length+'</h2><p>Erros e acertos permanecem registrados nesta sessão. Use os módulos e casos para revisá-los.</p><button class="btn primary" type="button" onclick="Emergency.startExam()">Nova sessão de 20 questões</button></div>':
 '<div class="ue-exam-card"><p>Revise suas respostas. Ao finalizar, as explicações serão reveladas.</p><button type="button" class="btn primary" onclick="Emergency.finishExam()">Finalizar e corrigir prova</button></div>')+
 '<section class="pocus-sec"><h3>Últimas sessões</h3><ol class="ue-exam-history">'+eState().history.slice(0,20).map(h=>'<li>'+new Date(h.startedAt).toLocaleString('pt-BR')+' — '+h.score+'/'+h.total+' acertos</li>').join('')+'</ol></section></section>';
}
setInterval(()=>{
 if(!examOpen||typeof ui==='undefined'||ui.route!=='emergency-p2')return;
 const e=eState().active;if(!e||e.submitted)return;
 const time=Math.max(0,(e.deadline-Date.now())/1000),el=document.getElementById('ue-timer');
 if(el){const h=String(Math.floor(time/3600)).padStart(2,'0'),m=String(Math.floor(time%3600/60)).padStart(2,'0'),s=String(Math.floor(time%60)).padStart(2,'0');el.textContent=h+':'+m+':'+s;}
 if(time<=0)finishExam();
},1000);
function landing(){
 const state=store.study||{},done=(key,mods)=>mods.filter(m=>state[key]?.done?.[m.id]).length;
 const tile=(stage,mods,key,desc)=>'<button class="ue-stage-card" type="button" onclick="navigate(\'emergency-'+stage.toLowerCase()+'\')"><span class="kicker">'+stage+'</span><strong>'+esc(desc)+'</strong><span>'+mods.length+' aulas · '+mods.reduce((n,m)=>n+m.quiz.length,0)+' questões · '+mods.length+' casos</span><small>'+done(key,mods)+' de '+mods.length+' aulas marcadas como estudadas</small><em>Entrar no curso →</em></button>';
 return '<section class="emergency-page"><header class="emergency-hero"><div class="emergency-hero-icon">'+(window.StudyIcons?StudyIcons.emergency():'✚')+'</div><div><span class="kicker">8º PERÍODO · 2026.2</span><h1>Urgência e Emergência</h1><p>Reconhecer a emergência, decidir em sequência e reavaliar. Curso nativo do Estudo Master.</p></div></header>'+
 '<div class="info-notice"><strong>Base oficial:</strong> plano de ensino da FMP/UNIFASE 2026.2. A P2 é cumulativa e inclui 20 questões de múltipla escolha; as questões abaixo são autorais e os slides são materiais da disciplina, não provas oficiais.</div>'+
 '<div class="ue-stage-grid">'+tile('P1',P1,'uep1','Ressuscitação, síndromes críticas e trauma')+tile('P2',P2,'uep2','Decisões cardiovasculares, metabólicas e toxicológicas')+'</div>'+
 '<section class="pocus-sec"><h2>Como estudar em alto rendimento</h2><div class="ue-flow"><div class="ue-flow-step"><span class="ue-flow-n">1</span><strong>Pré-teste clínico</strong><span>O que mata primeiro?</span></div><div class="ue-flow-step"><span class="ue-flow-n">2</span><strong>Algoritmo de decisão</strong><span>Se X, faço Y.</span></div><div class="ue-flow-step"><span class="ue-flow-n">3</span><strong>Caso e questões</strong><span>Decidir antes de revelar.</span></div><div class="ue-flow-step"><span class="ue-flow-n">4</span><strong>Revisão D+1/D+7</strong><span>Revisar erros e reavaliar domínio.</span></div></div></section></section>';
}
function page(){
 const route=typeof ui==='undefined'?'emergency':ui.route;
 if(route==='emergency-p1')return p1.page();
 if(route==='emergency-p2')return examOpen?examPage():p2.page();
 return landing();
}
function card(){
 return '<section class="emergency-preview"><div class="emergency-preview-symbol">'+(window.StudyIcons?StudyIcons.emergency():'✚')+'</div><div><span class="kicker">CURSO COMPLETO · 8º PERÍODO</span><h3>Urgência e Emergência</h3><p>'+all.length+' aulas, '+all.reduce((s,m)=>s+m.quiz.length,0)+' questões e '+all.length+' casos clínicos. P1 + P2 cumulativa.</p></div><button class="btn secondary" type="button" onclick="navigate(\'emergency\')">Abrir curso ↗</button></section>';
}
window.Emergency={page,card,p1,p2,startExam,examAnswer,finishExam,exitExam,refs:REFS,all};
})();
