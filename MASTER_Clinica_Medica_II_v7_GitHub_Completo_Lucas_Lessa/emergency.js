/* Curso de Urgência e Emergência integrado ao Master, respeitando o motor de progresso existente. */
(function installEmergency(){
'use strict';
const all=(window.EMERGENCY_CONTENT||[]).filter(x=>x&&x.id&&x.stage&&Array.isArray(x.quiz));
const P1=all.filter(x=>x.stage==='P1');
const P2=all.filter(x=>x.stage==='P2');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const priorities=[
 ['arritmias','Arritmias cardíacas',100],['sca','Dor torácica e síndrome coronariana aguda',98],
 ['hipertensiva','Emergência hipertensiva e edema agudo pulmonar',96],['acidobase','Gasometria e distúrbios acidobásicos',94],
 ['eletrolitos','Distúrbios eletrolíticos graves',92],['glicemia','Emergências glicêmicas',90],
 ['intox','Intoxicações exógenas',75],['tireoide','Emergências tireoidianas',70],
 ['catastrofes','Atendimento a catástrofes',45],['paliativos','Cuidados paliativos',40]
].map(([id,title,score],index)=>({id,title,score,order:index+1,tier:index<6?'Alta':index<8?'Intermediária':'Menor'}));
const priorityById=Object.fromEntries(priorities.map(p=>[p.id,p]));
const p1Order=['pcr','sepse','choque','irpa','vm','avci','trauma','trauma-especifico','asma','adrenal','afogamento','queimado','sensorio'];
const ordered=items=>[...items].sort((a,b)=>a.stage===b.stage?
 (a.stage==='P2'?priorityById[a.id]?.order-priorityById[b.id]?.order:p1Order.indexOf(a.id)-p1Order.indexOf(b.id)):
 a.stage.localeCompare(b.stage));
const titleFor=id=>priorityById[id]?.title||all.find(m=>m.id===id)?.title||id;
function openCourse(stage){
 examOpen=false;
 navigate(stage==='P1'?'emergency-p1':'emergency-p2');
 (stage==='P1'?p1:p2).open(null);
}
function openLesson(id){
 const module=all.find(m=>m.id===id);if(!module)return;
 if(id==='arritmias'&&window.EmergencyMastery){navigate('emergency-arritmias');return;}
 examOpen=false;
 navigate(module.stage==='P1'?'emergency-p1':'emergency-p2');
 const course=module.stage==='P1'?p1:p2;
 course.open(course.findId(id));
}
function topicList(stage){
 const modules=ordered(stage==='P2'?P2:P1),key=stage==='P2'?'uep2':'uep1';
 const count=modules.filter(m=>store.study?.[key]?.done?.[m.id]).length;
 return '<section class="ue-master-block ue-topic-list"><header><div><h2>'+ (stage==='P2'?'P2 · Temas prioritários':'P1 — Revisão complementar') +'</h2><p>'+count+' de '+modules.length+' aulas estudadas</p></div></header>'+
 (stage==='P2'?'<p class="ue-priority-note">Índice estratégico de prioridade educacional. A pontuação é uma estimativa pedagógica.</p>':'')+
 '<ol>'+modules.map(m=>{
  const p=priorityById[m.id],done=!!store.study?.[key]?.done?.[m.id];
  return '<li><button class="ue-topic-link" onclick="Emergency.openLesson(\''+m.id+'\')">'+(p?'<span class="ue-rank">'+String(p.order).padStart(2,'0')+'</span>':'')+
   '<strong>'+esc(titleFor(m.id))+'</strong>'+(p?'<span class="ue-tier ue-tier-'+p.tier.toLowerCase()+'">'+p.tier+' · '+p.score+'/100</span>':'')+'</button>'+
   '<label class="ue-topic-check"><input type="checkbox" '+(done?'checked':'')+' onchange="Emergency.markStudied(\''+m.id+'\',this.checked)" aria-label="Marcar '+esc(titleFor(m.id))+' como estudado"> Estudei</label></li>';
 }).join('')+'</ol></section>';
}
function openCards(id){
 if(window.UE_MASTERY_CONTENT?.[id]){window.EmergencyMastery.openCards(id);return;}
 document.getElementById('ue-lesson-flashcards')?.scrollIntoView({block:'start'});
}
function markStudied(id,value){
 const module=all.find(m=>m.id===id);if(!module)return;
 (module.stage==='P1'?p1:p2).complete(id,value);
 render();
}
function sidebar(){
 const expanded=['emergency-p2','emergency-arritmias'].includes(ui.route);
 return '<div class="ue-nav-topics"><button type="button" class="nav-child ue-nav-priority" aria-expanded="'+expanded+'" aria-controls="ue-nav-order" onclick="Emergency.toggleSidebarOrder(this)">Ordem de estudo · P2</button><ol id="ue-nav-order" '+(expanded?'':'hidden')+'>'+
 priorities.map(p=>'<li><button class="nav-child" type="button" '+(p.id==='arritmias'&&ui.route==='emergency-arritmias'?'aria-current="page"':'')+' onclick="Emergency.openLesson(\''+p.id+'\')"><span class="ue-nav-dot ue-tier-'+p.tier.toLowerCase()+'" aria-hidden="true"></span>'+esc(p.title)+'</button></li>').join('')+
 '</ol></div>';
}
function toggleSidebarOrder(button){
 const list=document.getElementById(button.getAttribute('aria-controls'));
 if(!list)return;
 list.hidden=!list.hidden;
 button.setAttribute('aria-expanded',String(!list.hidden));
}
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
 thyroidMyxedema2026:{t:"Consenso conjunto — Coma mixedematoso, 2026",u:"https://pmc.ncbi.nlm.nih.gov/articles/PMC13452032/"},
 whoPall:{t:"Organização Mundial da Saúde — Palliative Care",u:"https://www.who.int/news-room/fact-sheets/detail/palliative-care"},

};
// Os arquivos completos são apenas fonte interna para curadoria; não aparecem como referências navegáveis nas aulas.
for(const m of all)m.refs=(m.refs||[]).filter(k=>!/^slide[A-Z]/.test(k));
const scientificRefsById={
 pcr:['postAha'],irpa:['atsResp'],vm:['ards'],adrenal:['endocrine'],hipertensiva:['htn2025'],
 glicemia:['dka2024'],eletrolitos:['ukka2026'],tireoide:['thyroid2026','thyroidMyxedema2026'],paliativos:['whoPall']
};
for(const m of all)for(const ref of scientificRefsById[m.id]||[])if(!m.refs.includes(ref))m.refs.push(ref);
function scheme(m){
 if(m.id==='pcr')return '<figure class="ue-schema" role="img" aria-label="Traçado ilustrativo de fibrilação ventricular, não diagnóstico"><svg viewBox="0 0 720 125" width="100%" aria-hidden="true"><defs><pattern id="ue-grid" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="#d8ece6" stroke-width=".8"/></pattern></defs><rect width="720" height="125" rx="10" fill="url(#ue-grid)"/><path d="M0 63L13 40 23 86 39 31 54 75 68 46 78 95 93 27 108 64 119 52 131 89 149 37 166 65 174 24 185 94 200 58 211 71 224 29 239 77 254 42 268 68 282 24 293 90 307 37 325 69 342 41 354 82 370 20 385 85 398 44 417 67 426 32 440 93 454 57 469 69 481 26 496 78 508 36 528 82 541 49 553 95 569 25 580 77 601 36 611 70 627 54 641 90 651 42 665 75 681 22 697 80 710 48 720 65" fill="none" stroke="#0b6c66" stroke-width="3" stroke-linecap="round"/></svg><figcaption><strong>Traçado esquemático autoral.</strong> Não reproduz ECG de paciente; compare com os slides originais e o módulo de ECG do site.</figcaption></figure>';
 return '';
}
function addOn(m){
 const flows=(m.flow||[]).map((s,i)=>'<div class="ue-flow-step"><span class="ue-flow-n">'+(i+1)+'</span><span class="ue-flow-q">'+esc(s[0])+'</span><span class="ue-flow-arrow" aria-hidden="true">→</span><strong>'+esc(s[1])+'</strong></div>').join('');
 const cards=(m.flow||[]).slice(0,4).map((s,i)=>'<details class="ue-flash"><summary><span>Cartão '+(i+1)+'</span> Quando: '+esc(s[0])+'?</summary><p>'+esc(s[1])+'</p></details>').join('');
 const memory=(m.memory||[]).length?'<section class="pocus-sec ue-memory"><h3>Pódio da memória · quatro frases essenciais</h3><ol>'+m.memory.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></section>':'';
 const alerts=(m.alerts||[]).length?'<p class="ue-disclaimer">'+m.alerts.map(esc).join(' ')+'</p>':'';
 const depthCards=memory+alerts;
 return '<div class="ue-master-actions"><button class="btn primary" onclick="UEQuestions.openQuestions(\''+m.id+'\')">Treinar este tema</button><button class="btn secondary" onclick="Emergency.openCards(\''+m.id+'\')">Flashcards deste tema</button></div><section class="pocus-sec ue-flow-block"><h3>Fluxograma de raciocínio e conduta</h3><p>Reconhecimento → decisão → ação → reavaliação. Se a primeira resposta falhar, reinicie o ciclo de avaliação.</p><div class="ue-flow">'+flows+'</div></section>'+scheme(m)+'<section id="ue-lesson-flashcards" class="pocus-sec"><h3>Evocação ativa — pódio da memória</h3><p class="subtle">Tente responder sem consultar a aula antes de expandir cada cartão.</p><div class="ue-flashes">'+cards+'</div></section>'+depthCards;
}
const base={
 label:"Urgência e Emergência",
 images:false,
 refNote:"As doses são educativas e precisam ser conferidas com prescrição, protocolo institucional e supervisão; não substituem atendimento real.",
 sourcesNote:"Conteúdo autoral para estudo de Urgência e Emergência, com fontes clínicas verificáveis e recursos visuais selecionados por pertinência.",
 pathHint:"Percurso orientado por reconhecimento, diagnóstico, conduta, reavaliação, questões e casos.",
 caseHint:"Formule avaliação inicial, hipótese, conduta, monitorização e justificativa antes de revelar.",
 extraModule:addOn,
 sectionAddon:(module,index)=>window.EmergencyFigureAtlas?.afterSection(module,index)||''
};
const p1=CourseKit.create({
 ...base,key:"uep1",global:"Emergency.p1",route:"emergency-p1",
 homeOverview:()=>topicList('P1'),
 moduleOverride:params=>params.module.id==='pcr'&&window.EmergencyPCR?window.EmergencyPCR.page(params):null,
 onAnswer:({module,questionIndex,correct})=>{if(module.id==='pcr')window.PCRAdaptive?.record('pcr_'+questionIndex,correct,{type:'recall',critical:!correct});},
 title:"Urgência e Emergência — P1",heading:"Fundamentos e ressuscitação · P1",lead:"Reconhecimento de emergências, ABCDE, suporte vital, sepse, trauma e falência orgânica.",
 notice:"Revisão cumulativa: este conteúdo também pode ser exigido na P2.",
 bankTitle:"Casos clínicos P1",bankHeading:"Primeiros minutos que mudam o desfecho",bankLead:"Cenários de atendimento inicial para conduzir a equipe.",MODULES:P1,CASES:P1.flatMap(x=>[x.case,...(x.moreCases||[])]),REFS,
 extraHome:()=>'<div class="ue-pcr-pilot-promo"><div><span class="kicker">NOVA EXPERIÊNCIA DE APRENDIZAGEM</span><strong>PCR · primeira aula interativa</strong><p>Escolha 2, 5, 15 ou 30 minutos. Decida, descubra o algoritmo e conduza um caso progressivo.</p></div><button class="btn primary" type="button" onclick="Emergency.p1.open(0)">Iniciar PCR →</button></div><p class="ue-shortcut"><button type="button" class="btn secondary" onclick="navigate(\'emergency-p2\')">Seguir para P2 →</button></p>'
});
const p2=CourseKit.create({
 ...base,key:"uep2",global:"Emergency.p2",route:"emergency-p2",
 moduleOrder:priorities.map(p=>p.id),homeOverview:()=>topicList('P2'),
 moduleOverride:params=>params.module.id==='arritmias'&&window.EmergencyMastery?window.EmergencyMastery.page(params):null,
 title:"Urgência e Emergência — P2",heading:"Decisões clínicas em emergência · P2",lead:"Cardiovascular, metabólico, eletrolítico, toxicológico, comunicação e prova cumulativa.",
 notice:"Os simulados de Urgência incluem opção pronta e geração personalizada.",
 bankTitle:"Casos clínicos P2",bankHeading:"Do sintoma à conduta",bankLead:"Cenários para treinar decisão e reavaliação.",MODULES:P2,CASES:P2.flatMap(x=>[x.case,...(x.moreCases||[])]),REFS,
 extraHome:()=>'<p><button type="button" class="btn primary" onclick="navigate(\'emergency-simulado\')">Abrir simulados de Urgência</button></p>'
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
function startExam(restoreOnly=false){
 const s=eState();
 if(restoreOnly&&!s.active){window.toast?.('Nenhuma sessão anterior ativa.');return;}
 if(!s.active||s.active.submitted&&!restoreOnly){s.active={startedAt:Date.now(),deadline:Date.now()+90*60000,items:sampleExam(),answers:{},submitted:false,score:null};stateSave();}
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
 return '<section class="emergency-page ue-master"><header class="ue-master-hero"><span class="kicker">CLÍNICA MASTER</span><h1>Urgência e Emergência</h1><p>Estude os temas da prova, pratique decisões clínicas e revise seus erros.</p><div class="ue-master-actions">'+
 '<button class="btn primary" onclick="Emergency.openLesson(\'arritmias\')">Abrir Arritmias cardíacas</button><button class="btn secondary" onclick="navigate(\'emergency-questions\')">Exercícios</button><button class="btn secondary" onclick="navigate(\'emergency-flashcards\')">Flashcards</button><button class="btn secondary" onclick="navigate(\'emergency-simulado\')">Simulados</button></div></header>'+
 topicList('P2')+topicList('P1')+'</section>';
}
function page(){
 const route=typeof ui==='undefined'?'emergency':ui.route;
 if(route==='emergency-p1')return p1.page();
 if(route==='emergency-p2')return examOpen?examPage():p2.page();
 if(route==='emergency-arritmias')return p2.modulePage(p2.findId('arritmias'));
 return landing();
}
function card(){
 return '<section class="emergency-preview"><div class="emergency-preview-symbol">'+(window.StudyIcons?StudyIcons.emergency():'✚')+'</div><div><span class="kicker">CURSO COMPLETO · 8º PERÍODO</span><h3>Urgência e Emergência</h3><p>'+all.length+' aulas, '+all.reduce((s,m)=>s+m.quiz.length,0)+' questões e '+all.length+' casos clínicos. P1 + P2 cumulativa.</p></div><button class="btn secondary" type="button" onclick="navigate(\'emergency\')">Abrir curso ↗</button></section>';
}
window.Emergency={page,card,p1,p2,startExam,examAnswer,finishExam,exitExam,refs:REFS,all,priorities,ordered,titleFor,openLesson,openCourse,openCards,markStudied,sidebar,toggleSidebarOrder};
})();
