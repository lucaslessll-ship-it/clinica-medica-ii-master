/* Clínica Master · PCR: primeira aula com aprendizagem guiada e recuperação ativa. */
(function createPCRPilot(){
'use strict';
const DAY=86400000;
const MODES={
 "2":{label:"Início rápido",description:"Uma decisão, um algoritmo e uma síntese.",steps:["start","algorithm","summary"]},
 "5":{label:"Revisão breve",description:"Reconhecimento, escolha do ritmo e minicaso.",steps:["start","algorithm","case","summary"]},
 "15":{label:"Aprendizagem guiada",description:"Explicações, decisões, ciclo de RCP e caso.",steps:["start","foundation","algorithm","timeline","case","summary"]},
 "30":{label:"Treino completo",description:"Percurso integral com questões persistentes.",steps:["start","foundation","algorithm","timeline","case","practice","summary"]}
};
const STEPS={
 start:{title:"Antes da aula: sua primeira decisão",short:"Desafio inicial",kicker:"01 · RECUPERAÇÃO ATIVA"},
 foundation:{title:"Reconhecer PCR e fazer RCP de qualidade",short:"Fundamentos",kicker:"02 · COMPREENDER"},
 algorithm:{title:"Qual é o próximo ramo do algoritmo?",short:"Ritmos e decisões",kicker:"03 · ESCOLHER"},
 timeline:{title:"O que acontece durante os ciclos?",short:"Conduta e cronologia",kicker:"04 · CONDUZIR"},
 case:{title:"Caso clínico que evolui com as decisões",short:"Simulação progressiva",kicker:"05 · TRANSFERIR"},
 practice:{title:"Questões de fixação e retestes",short:"Questões do banco",kicker:"06 · COMPROVAR"},
 summary:{title:"O essencial e a próxima revisão",short:"Consolidar",kicker:"07 · RETER"}
};
const QUESTIONS={
 initial:{prompt:"Adulto cai diante da equipe. Está inconsciente, apresenta gasping e não há pulso central definido na avaliação rápida. Qual ação tem prioridade?",options:["Aguardar ECG de 12 derivações e troponina.","Acionar ajuda, iniciar RCP de alta qualidade e conectar o desfibrilador.","Administrar atropina antes das compressões.","Oferecer apenas oxigênio e observar."],a:1,why:"Gasping não é respiração normal. Profissional treinado verifica pulso em até 10 segundos; sem pulso definido, presume PCR e inicia RCP sem atraso.",hint:"O primeiro passo salva circulação; exames não devem atrasar compressões."},
 quality:{prompt:"Durante a RCP do adulto, qual conjunto representa compressões de qualidade?",options:["80/min, 3 cm, pausas frequentes.","100–120/min, 5–6 cm, retorno torácico completo e poucas interrupções.","140/min, 8 cm e ventilação rápida.","60/min e checagem de pulso a cada 20 segundos."],a:1,why:"Diretriz AHA 2025: frequência 100–120/min, profundidade de pelo menos 5 cm sem exceder 6 cm, retorno completo e mínimas pausas.",hint:"Pense em ritmo, profundidade e tempo sem compressões."},
 rhythm_vf:{prompt:"O monitor exibe FV ou TV sem pulso. Qual intervenção específica é decisiva?",options:["Cardioversão sincronizada.","Desfibrilação não sincronizada e retomada imediata da RCP.","Adenosina em bolus como primeira medida.","Aguardar acesso venoso antes de qualquer choque."],a:1,why:"FV/TV sem pulso são chocáveis. Choque rápido seguido de RCP por aproximadamente 2 minutos, sem demora por drogas ou exames.",hint:"Sem pulso, não existe onda R confiável para sincronizar uma cardioversão."},
 rhythm_pea:{prompt:"Há atividade elétrica organizada no monitor, mas não existe pulso central. O que fazer?",options:["Choque em toda atividade elétrica sem pulso.","Cardioversão sincronizada.","RCP, adrenalina IV/IO tão cedo quanto possível e busca de causas reversíveis.","Esperar o monitor tornar-se assistolia."],a:2,why:"AESP não é ritmo chocável. A prioridade é RCP, adrenalina e investigação/tratamento de causas reversíveis.",hint:"AESP é definida pela falta de perfusão apesar de atividade elétrica."},
 rhythm_asys:{prompt:"O monitor apresenta assistolia confirmada. Qual conduta é correta?",options:["RCP, adrenalina e checagem de causas reversíveis, sem desfibrilação.","Desfibrilar em máxima energia.","Aguardar retorno espontâneo antes da RCP.","Administrar adenosina."],a:0,why:"Assistolia é ritmo não chocável. Confirme derivações/equipamento quando necessário, mantendo RCP e adrenalina.",hint:"Choque não corrige ausência de atividade elétrica ventricular."},
 rhythm_vtpulse:{prompt:"TV rápida com pulso e choque circulatório atribuído à arritmia. Qual algoritmo escolher?",options:["Desfibrilar como PCR sem avaliar pulso.","Algoritmo de bradicardia com atropina.","Apenas observação e alta.","Cardioversão sincronizada conforme ritmo e protocolo, sem atraso indevido."],a:3,why:"Taquicardia instável com pulso segue algoritmo de taquicardia com pulso, geralmente com cardioversão sincronizada.",hint:"O pulso altera completamente o caminho do algoritmo."},
 case_0:{prompt:"Paciente de 58 anos colapsa na sala de espera. Inconsciente, gasping, sem pulso central definido em até 10 segundos. Sua primeira ordem?",options:["Pedir ECG de 12 derivações.","Chamar a equipe, iniciar compressões e solicitar desfibrilador.","Medir temperatura e aguardar.","Fazer apenas ausculta cardíaca."],a:1,why:"Reconhecimento de PCR exige RCP imediata e desfibrilador. A equipe pode distribuir tarefas simultâneas."},
 case_1:{prompt:"O desfibrilador chega e mostra fibrilação ventricular. Qual é a medida específica?",options:["Adenosina.","Desfibrilação não sincronizada, com energia recomendada pelo aparelho.","Atropina.","Cardioversão sincronizada."],a:1,why:"Em FV, desfibrilação precoce. Ajustar energia conforme fabricante/algoritmo institucional."},
 case_2:{prompt:"O primeiro choque foi aplicado. O que fazer imediatamente em seguida?",options:["Retomar RCP por aproximadamente 2 minutos.","Palpar pulso por 30 segundos.","Esperar que apareça ritmo sinusal.","Preparar transferência sem compressões."],a:0,why:"Após o choque, reinicie compressões sem pausa prolongada e reavalie o ritmo depois do ciclo."},
 case_3:{prompt:"Após novo ciclo, a FV persiste, recebe segundo choque e a RCP é retomada. Qual terapia medicamentosa entra agora?",options:["Atropina isolada.","Bicarbonato para todos os casos.","Adenosina.","Adrenalina 1 mg IV/IO durante RCP, repetindo a cada 3–5 minutos conforme algoritmo."],a:3,why:"No ramo chocável do algoritmo AHA, adrenalina é administrada após tentativas iniciais de choque sem sucesso, durante a RCP. Antiarritmias são consideradas para FV/TVSP persistente após choques adicionais."},
 case_4:{prompt:"Surge pulso e pressão arterial; o paciente permanece sem seguir comandos. Qual plano pós-RCE é mais adequado?",options:["Manter oxigênio a 100% por tempo indefinido.","Suspender monitorização e dar alta.","Confirmar via aérea, buscar causa, titular SpO₂ 90–98% com leitura confiável, manter PAM ≥65 e avaliar controle de temperatura.","Concluir prognóstico neurológico irreversível nos primeiros minutos."],a:2,why:"Cuidados pós-PCR têm metas próprias: quando mensuração confiável está disponível, SpO₂ 90–98%, PAM ≥65 mmHg, controle térmico indicado e prognóstico neurológico diferido/multimodal."}
};
const EXPLAIN_ALTERNATIVES={"initial":["ECG e troponina ajudam na investigação posterior; não devem atrasar compressões.","Correto: acionamento, RCP e desfibrilador são intervenções tempo-dependentes.","Atropina não é tratamento inicial de PCR.","Gasping representa respiração agônica, e não permite observação passiva."],"quality":["Frequência e profundidade insuficientes prejudicam o fluxo circulatório.","Correto: frequência, profundidade, retorno torácico e pausas mínimas compõem a qualidade.","Compressões muito profundas e hiperventilação podem causar danos e prejudicar a ressuscitação.","Pausas frequentes reduzem a perfusão construída com compressões."],"rhythm_vf":["Cardioversão sincronizada é usada em arritmias selecionadas com pulso, não em FV/TV sem pulso.","Correto: desfibrilação não sincronizada seguida de retomada da RCP.","Adenosina não trata FV/TV sem pulso.","Acesso venoso é importante, mas não pode atrasar desfibrilação."],"rhythm_pea":["Atividade elétrica organizada sem pulso não indica choque.","Cardioversão sincronizada pressupõe outro cenário, geralmente taquiarritmia com pulso.","Correto: RCP, adrenalina precoce e investigação de causas reversíveis.","Esperar conversão para assistolia atrasa o cuidado."],"rhythm_asys":["Correto: assistolia confirmada é não chocável; RCP, adrenalina e reversíveis.","Desfibrilação não é indicada em assistolia.","Aguardar retorno espontâneo é inadequado.","Adenosina não reverte assistolia."],"rhythm_vtpulse":["Desfibrilar como PCR desconsidera que existe pulso.","Atropina faz parte do algoritmo de bradicardia sintomática, não de TV instável.","Choque circulatório requer atendimento imediato.","Correto: quando a taquiarritmia causa instabilidade com pulso, a cardioversão sincronizada costuma ser indicada."],"case_0":["Exames não substituem reconhecimento de PCR e compressões.","Correto: acionar apoio, compressões e desfibrilador de imediato.","Temperatura pode orientar causas, mas não precede RCP.","Ausculta isolada não deve atrasar intervenções de ressuscitação."],"case_1":["Adenosina não reverte fibrilação ventricular.","Correto: FV é chocável, com energia conforme fabricante/protocolo.","Atropina não é indicada para desfibrilar FV.","Cardioversão sincronizada não é adequada para FV sem pulso."],"case_2":["Correto: retomar compressões imediatamente após o choque.","Palpação prolongada após choque interrompe a perfusão.","Um choque não garante ritmo eficaz nem retorno do pulso.","Transferência sem compressões não corresponde à conduta imediata."],"case_3":["Atropina não é recomendação de rotina na PCR chocável.","Bicarbonato de rotina não substitui o algoritmo de PCR.","Adenosina não trata FV.","Correto: adrenalina 1 mg IV/IO no ciclo apropriado, repetida a cada 3–5 minutos."],"case_4":["Oxigênio a 100% indefinidamente pode causar hiperóxia.","Alta imediata desconsidera instabilidade e risco pós-PCR.","Correto: confirmar estabilização, titular oxigênio, manter perfusão e avaliar controle térmico/neuroprognóstico.","Neuroprognóstico isolado e precoce não é adequado."]};
const RHYTHMS=[
 {id:"vf",label:"FV / TV sem pulso",note:"Sem pulso. Indicação de desfibrilação."},
 {id:"pea",label:"AESP",note:"Ritmo organizado, mas sem pulso. Não chocar."},
 {id:"asys",label:"Assistolia",note:"Sem atividade ventricular efetiva. Não chocar."},
 {id:"vtpulse",label:"Taquicardia com pulso instável",note:"Não é PCR; seguir taquicardia com pulso."}
];
const CASE_SCENES=[
 {lead:"Colapso testemunhado",stem:"Homem de 58 anos cai diante da equipe. Está inconsciente, gasping e sem pulso definido."},
 {lead:"Monitor conectado",stem:"A equipe inicia compressões. O desfibrilador identifica fibrilação ventricular."},
 {lead:"Depois do primeiro choque",stem:"O choque foi aplicado. A equipe olha para o monitor, mas ainda não iniciou compressões."},
 {lead:"Após o segundo choque",stem:"FV persiste após novo ciclo e novo choque; acesso IV está disponível."},
 {lead:"Retorno da circulação",stem:"Há pulso e pressão, mas o paciente não obedece comandos. SpO₂ monitorizável, ventilação assistida."}
];
const TIMELINES={
 shock:[
  ["Reconhecer FV/TV sem pulso","Desfibrilar assim que possível, com energia recomendada para o equipamento; retomar compressões imediatamente."],
  ["Ciclo de 2 minutos","RCP de qualidade, monitorização, oxigenação/ventilação adequada e acesso IV/IO sem prolongar pausas."],
  ["FV persiste após reavaliação","Novo choque, retorno imediato à RCP; administrar adrenalina 1 mg IV/IO no ciclo apropriado, repetir a cada 3–5 minutos."],
  ["Refratariedade","Choques e RCP conforme algoritmo; considerar amiodarona 300 mg IV/IO e dose posterior 150 mg, ou lidocaína, conforme protocolo e ritmo."],
  ["RCE ou continuidade","Se RCE: iniciar pacote pós-parada. Caso contrário, seguir ciclos e investigar causas reversíveis."]
 ],
 nonshock:[
  ["AESP ou assistolia","Não desfibrilar. Iniciar/continuar RCP de alta qualidade imediatamente."],
  ["Adrenalina precoce","Administrar 1 mg IV/IO tão cedo quanto possível, repetir a cada 3–5 minutos no algoritmo adulto."],
  ["Ciclo de 2 minutos","Reavaliar ritmo com pausa mínima, manter RCP e buscar causas reversíveis; confirmar cabos se assistolia aparente."],
  ["Muda para ritmo chocável?","Se FV/TV sem pulso surgir, mudar para o ramo de desfibrilação; se houver RCE, iniciar cuidados pós-parada."]
 ]
};
let ctx=null;
function esc(x){return String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function state(){
 store.study=store.study||{version:1};
 const course=store.study.uep1||(store.study.uep1={done:{},quiz:{},seen:{}});
 const s=course.pcrPilot||(course.pcrPilot={mode:"15",step:"start",answers:{},hints:{},visited:["start"],rhythm:"vf",cycle:"shock",cycleIndex:0,caseStage:0,caseHistory:[],finishedAt:null});
 s.answers=s.answers||{};s.hints=s.hints||{};s.visited=s.visited||["start"];s.caseHistory=s.caseHistory||[];
 if(!MODES[s.mode])s.mode="15";if(!MODES[s.mode].steps.includes(s.step))s.step="start";
 return s;
}
function save(){stateSave();}
function paths(){return MODES[state().mode].steps;}
function refresh(focus){
 if(!ctx)return;
 const host=document.getElementById("ue-pcr-pilot");
 if(!host){if(typeof render==="function")render();return;}
 host.outerHTML=page(ctx);
 if(focus){
  const el=document.getElementById(focus)||document.getElementById("ue-pcr-step-heading");
  if(el?.focus)el.focus({preventScroll:true});
 }
}
function mode(value){
 const s=state();if(!MODES[value])return;
 s.mode=value;if(!MODES[value].steps.includes(s.step))s.step="start";
 save();refresh("ue-pcr-step-heading");
}
function go(id){
 const s=state();
 if(!MODES[s.mode].steps.includes(id))return;
 s.step=id;if(!s.visited.includes(id))s.visited.push(id);
 save();refresh("ue-pcr-step-heading");
 const node=document.getElementById("ue-pcr-pilot");
 if(node?.scrollIntoView){
 const reduce=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
 node.scrollIntoView({block:"start",behavior:reduce?"auto":"smooth"});
 }
}
function answer(id,value){
 const s=state(),q=QUESTIONS[id];
 if(!q||!Number.isInteger(value)||value<0||value>=q.options.length||s.answers[id]!==undefined)return;
 s.answers[id]=value;
 s.lastDecisionAt=Date.now();
 s.attempts=s.attempts||[];
 s.attempts.push({id,choice:value,correct:value===q.a,at:s.lastDecisionAt,hint:!!s.hints[id]});
 if(s.attempts.length>180)s.attempts=s.attempts.slice(-180);
 window.PCRAdaptive?.openSession(s.mode);
 window.PCRAdaptive?.record(id,value===q.a,{hint:!!s.hints[id],type:id.startsWith("case_")?"transfer":"recall",critical:value!==q.a&&(id==="initial"||id==="rhythm_vf"||id==="rhythm_pea"||id==="rhythm_asys"||id==="case_1"||id==="case_2"||id==="case_4")});
 save();refresh("ue-pcr-question-"+id);
}
function confidence(id,level){
 window.PCRAdaptive?.confidence(id,level);
 save();refresh("ue-pcr-question-"+id);
}
function hint(id){
 const s=state();if(!QUESTIONS[id]||s.answers[id]!==undefined)return;
 s.hints[id]=true;save();refresh("ue-pcr-question-"+id);
}
function selectRhythm(id){
 if(!RHYTHMS.some(x=>x.id===id))return;
 const s=state();s.rhythm=id;save();refresh();
}
function cycle(id){
 if(!TIMELINES[id])return;
 const s=state();s.cycle=id;s.cycleIndex=0;save();refresh();
}
function cycleStep(i){
 const s=state(),arr=TIMELINES[s.cycle]||[];
 if(!Number.isInteger(i)||i<0||i>=arr.length)return;
 s.cycleIndex=i;save();refresh();
}
function nextCase(){
 const s=state();
 if(s.answers["case_"+s.caseStage]===undefined)return;
 if(s.caseStage<CASE_SCENES.length-1)s.caseStage++;
 else s.caseCompletedAt=Date.now();
 save();refresh("ue-pcr-step-heading");
}
function resetCase(){
 const s=state();
 const total=CASE_SCENES.filter((_,i)=>s.answers["case_"+i]!==undefined).length;
 if(total)s.caseHistory.unshift({date:Date.now(),answered:total,correct:CASE_SCENES.filter((_,i)=>s.answers["case_"+i]===QUESTIONS["case_"+i].a).length});
 if(s.caseHistory.length>30)s.caseHistory=s.caseHistory.slice(0,30);
 for(let i=0;i<CASE_SCENES.length;i++)delete s.answers["case_"+i];
 s.caseStage=0;s.caseCompletedAt=null;
 save();refresh("ue-pcr-step-heading");
}
function restart(){
 const s=state(),now=Date.now();
 const tried=Object.keys(s.answers).filter(k=>QUESTIONS[k]);
 if(tried.length){
  s.reviewHistory=s.reviewHistory||[];
  s.reviewHistory.unshift({at:now,count:tried.length,correct:tried.filter(k=>s.answers[k]===QUESTIONS[k].a).length});
  if(s.reviewHistory.length>30)s.reviewHistory=s.reviewHistory.slice(0,30);
 }
 for(const key of tried)delete s.answers[key];
 s.hints={};s.step="start";s.mode="5";s.visited=["start"];s.caseStage=0;s.caseCompletedAt=null;
 s.rhythm="vf";s.cycle="shock";s.cycleIndex=0;
 save();refresh("ue-pcr-step-heading");
}
function finish(){
 const s=state(),now=Date.now();
 s.finishedAt=now;
 s.reviews=s.reviews||{};
 s.reviews.d1=now+DAY;
 s.reviews.d7=now+7*DAY;
 store.study.uep1.done=store.study.uep1.done||{};
 store.study.uep1.done.pcr=true;
 save();
 window.MasterActivity?.track?.("lesson_complete","uep1:pcr");
 refresh("ue-pcr-step-heading");
}
function question(id){
 const q=QUESTIONS[id],s=state(),selected=s.answers[id],answered=Number.isInteger(selected);
 if(!q)return "";
 return `<section class="ue-pcr-question" id="ue-pcr-question-${esc(id)}" aria-label="Decisão clínica">
  <div class="ue-pcr-question-kicker">RECUPERAÇÃO ATIVA · DECIDA ANTES DA EXPLICAÇÃO</div>
  <h3>${esc(q.prompt)}</h3><div class="ue-pcr-options">${q.options.map((opt,i)=>`<button type="button" ${answered?"disabled":""} class="ue-pcr-option${answered&&i===q.a?" is-correct":""}${answered&&i===selected&&selected!==q.a?" is-incorrect":""}" aria-pressed="${i===selected}" onclick="EmergencyPCR.answer('${id}',${i})"><span class="ue-pcr-opt-letter">${"ABCD"[i]}</span><span>${esc(opt)}</span></button>`).join("")}</div>
  ${!answered?`<button type="button" class="ue-pcr-help" onclick="EmergencyPCR.hint('${id}')">Preciso de uma pista</button>${s.hints[id]?`<p class="ue-pcr-hint"><strong>Pista:</strong> ${esc(q.hint||"Pense na ameaça imediata e no próximo passo seguro.")}</p>`:""}`:`<div class="ue-pcr-feedback" role="status"><strong>${selected===q.a?"Decisão adequada.":"Revise esta decisão."}</strong><p>${esc(q.why)}</p>${selected!==q.a?`<small>Resposta recomendada: ${"ABCD"[q.a]}. ${esc(q.options[q.a])}</small>`:""}${EXPLAIN_ALTERNATIVES[id]?`<details class="pcr-ai-alternatives"><summary>Por que cada alternativa está correta ou errada?</summary><ol type="A">${EXPLAIN_ALTERNATIVES[id].map((t,i)=>`<li><strong>${"ABCD"[i]}.</strong> ${esc(t)}</li>`).join("")}</ol></details>`:""}<div class="pcr-ai-confidence"><span>Quão seguro estava do raciocínio?</span>${[["low","Chutei"],["medium","Tive dúvida"],["high","Tenho certeza"]].map(([v,label])=>`<button type="button" aria-pressed="${window.PCRAdaptive?.state()?.confidence?.[id]===v}" onclick="EmergencyPCR.confidence('${id}','${v}')">${label}</button>`).join("")}</div></div>`}
  </section>`;
}
function overview(){
 const s=state(),modeInfo=MODES[s.mode];
 return `<section class="ue-pcr-entry">
 <div class="ue-pcr-entry-top"><span class="ue-pcr-eyebrow">CLÍNICA MASTER · URGÊNCIA E EMERGÊNCIA · P1</span><span class="ue-pcr-session">Aula-piloto · AHA 2025</span></div>
 <h1 id="ue-pcr-title">Parada cardiorrespiratória</h1>
 <p class="ue-pcr-lead">A cada etapa, uma pergunta clínica → uma decisão → uma explicação. Sem precisar ler tudo antes de começar.</p>
 <div class="ue-pcr-modes" role="group" aria-label="Escolher percurso de estudo">${Object.entries(MODES).map(([mins,config])=>`<button type="button" onclick="EmergencyPCR.mode('${mins}')" aria-pressed="${s.mode===mins}" class="ue-pcr-mode${s.mode===mins?" active":""}"><span class="ue-pcr-mode-mins">${mins} min</span><span>${esc(config.label)}</span></button>`).join("")}</div>
 <p class="ue-pcr-mode-note"><strong>${esc(modeInfo.label)}:</strong> ${esc(modeInfo.description)} Tempo estimado; você pode continuar estudando além dele.</p>${window.PCRAdaptiveUI?.homepage?.()||''}</section>`;
}
function nav(){
 const s=state(),allSteps=paths(),idx=allSteps.indexOf(s.step);
 const opened=allSteps.filter(id=>s.visited.includes(id)).length,pct=Math.round(opened/allSteps.length*100);
 return `<nav class="ue-pcr-step-nav" aria-label="Etapas da aula"><div class="ue-pcr-step-progress"><span>Etapa ${idx+1} de ${allSteps.length}</span><span>${opened} de ${allSteps.length} etapas abertas · ${pct}%</span></div>
 <div class="ue-pcr-progress" role="progressbar" aria-label="Etapas abertas" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><div style="width:${pct}%"></div></div>
 <div class="ue-pcr-step-tabs">${allSteps.map((id,i)=>`<button type="button" aria-current="${s.step===id?"step":"false"}" class="ue-pcr-step-tab${s.step===id?" active":""}${s.visited.includes(id)?" visited":""}" onclick="EmergencyPCR.go('${id}')"><span>${String(i+1).padStart(2,"0")}</span>${esc(STEPS[id].short)}</button>`).join("")}</div></nav>`;
}
function headline(){
 const step=STEPS[state().step];
 return `<header class="ue-pcr-stage-heading"><div class="ue-pcr-eyebrow">${esc(step.kicker)}</div><h2 id="ue-pcr-step-heading" tabindex="-1">${esc(step.title)}</h2></header>`;
}
function start(){
 return `<div class="ue-pcr-case-banner"><span class="ue-pcr-mono">SALA DE EMERGÊNCIA · 00:00</span><strong>Você está no primeiro atendimento.</strong><p>As próximas escolhas são baseadas em decisões reais de ressuscitação. Responda sem consultar o gabarito.</p></div>${question("initial")}
 <div class="ue-pcr-note"><strong>Por que começar com uma questão?</strong> Tentar recuperar uma conduta antes de receber a explicação ajuda a revelar o que precisa de estudo. Erros aqui são oportunidades de correção, não punições.</div>`;
}
function foundation(){
 return `<div class="ue-pcr-metrics">
 <div><span>Ritmo de compressões</span><strong>100–120/min</strong></div>
 <div><span>Profundidade adulto</span><strong>5–6 cm</strong></div>
 <div><span>Sem via aérea avançada</span><strong>30:2</strong></div>
 <div><span>Ritmo de reavaliação</span><strong>~2 min</strong></div></div>
 <div class="ue-pcr-two-col">
 <section class="ue-pcr-surface"><div class="ue-pcr-eyebrow">RECONHECIMENTO</div><h3>O que define a emergência?</h3><p>Ausência de resposta, respiração ausente ou agônica, e ausência de pulso definido em avaliação de até 10 segundos por profissional treinado.</p><p>Gasping é sinal agônico. Não deve adiar compressões.</p></section>
 <section class="ue-pcr-surface"><div class="ue-pcr-eyebrow">QUALIDADE DA RCP</div><h3>O que mantém a perfusão?</h3><p>Comprimir no centro do tórax, permitir retorno completo e evitar interrupções longas. Trocar o compressor aproximadamente a cada dois minutos.</p><p>Com via aérea avançada, manter compressões contínuas e uma ventilação a cada 6 segundos.</p></section></div>
 ${question("quality")}
 <details class="ue-pcr-expand"><summary>Entenda a fisiologia por trás da RCP</summary><p>Compressões externas produzem fluxo de sangue limitado, mas decisivo para perfusão coronária e cerebral. Pausas repetidas reduzem a pressão de perfusão construída durante a RCP. A desfibrilação termina a atividade elétrica caótica; ela não substitui a necessidade de comprimir.</p></details>`;
}
function wave(type){
 const paths={
 vf:"M0 43 L12 30 22 62 35 14 49 70 66 32 77 55 92 18 103 76 117 38 133 61 146 20 157 75 173 36 189 62 201 16 217 72 229 31 246 57 258 17 273 73 285 31 301 62 315 20 327 71 342 32 360 50",
 pea:"M0 49 H32 l8 -5 8 5 H62 l5 12 7 -48 10 70 8 -27 h19 l6 -4 7 4 H160 l8 -3 6 3 h12 l5 12 7 -48 10 70 8 -27 H236 l6 -4 7 4 H277 l8 -3 6 3 h10 l5 12 7 -48 10 70 8 -27 H360",
 asys:"M0 49 H28 l8 -1 8 2 10 -1 H118 l9 1 12 -1 H218 l10 -1 10 2 12 -1 H300 l12 1 14 -1 H360",
 vtpulse:"M0 47 l12 -28 19 61 19 -58 19 57 19 -58 20 57 20 -57 20 57 20 -58 20 58 20 -58 20 59 20 -58 20 58 20 -57 20 57 20 -58 20 58"
 };
 return `<div class="ue-pcr-wave"><svg viewBox="0 0 360 98" role="img" aria-label="Traçado ilustrativo simplificado, não diagnóstico"><defs><pattern id="pcr-grid-${type}" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0H0V12" fill="none" stroke="#d3e9e5" stroke-width=".65"/></pattern></defs><rect width="360" height="98" rx="10" fill="url(#pcr-grid-${type})"/><path d="${paths[type]}" fill="none" stroke="#236e65" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg><small>Traçado didático esquemático. AESP requer confirmação clínica de ausência de pulso.</small></div>`;
}
function algorithm(){
 const s=state(),item=RHYTHMS.find(x=>x.id===s.rhythm)||RHYTHMS[0],qid="rhythm_"+item.id;
 return `<p class="ue-pcr-stage-intro">Escolha um cenário. O circuito muda conforme <strong>pulso e ritmo</strong>, não apenas conforme o aspecto do monitor.</p>
 <div class="ue-pcr-rhythms" role="group" aria-label="Selecionar ritmo">${RHYTHMS.map(r=>`<button type="button" aria-pressed="${r.id===s.rhythm}" class="ue-pcr-rhythm${r.id===s.rhythm?" active":""}" onclick="EmergencyPCR.selectRhythm('${r.id}')">${esc(r.label)}</button>`).join("")}</div>
 <section class="ue-pcr-surface"><div class="ue-pcr-eyebrow">TRAÇADO CLÍNICO ILUSTRATIVO</div><h3>${esc(item.label)}</h3>${wave(item.id)}<p>${esc(item.note)}</p>
 ${item.id==="vf"?'<figure class="ue-atlas-card ue-pcr-source-figure"><button type="button" class="ue-zoom-trigger" aria-label="Ampliar ECG de taquicardia ventricular"><img loading="lazy" decoding="async" src="assets/urgencia/figures/pcr/taquicardia-ventricular.jpg" alt="Traçado de taquicardia ventricular extraído do PDF, para comparação com os ritmos do algoritmo"/><span class="ue-zoom-hint" aria-hidden="true">⤢ Ampliar ECG</span></button><figcaption><strong>Traçado extraído para comparar com o esquema</strong><span>Descreva frequência, largura e regularidade. Este traçado isolado não informa se existe pulso; a decisão sobre desfibrilação depende do contexto clínico.</span><small>Figura individual extraída do material de PCR, sem slide completo.</small></figcaption></figure>':''}
 </section>
 ${question(qid)}
 <div class="ue-pcr-branch"><div class="ue-pcr-branch-node"><strong>O paciente tem pulso?</strong><span>Decisão clínica inicial</span></div><div class="ue-pcr-branch-fork">
 <div class="ue-pcr-branch-lane"><strong>Não: seguir algoritmo de PCR</strong><p>O ritmo é chocável?</p><div class="ue-pcr-branch-choices"><div><small>SIM · FV / TV SEM PULSO</small><b>Desfibrilar + RCP</b></div><div><small>NÃO · AESP / ASSISTOLIA</small><b>RCP + adrenalina + causas reversíveis</b></div></div></div>
 <div class="ue-pcr-branch-lane"><strong>Sim: não é PCR</strong><p>Avaliar perfusão e ritmo.</p><div class="ue-pcr-branch-choices"><div><small>TAQUICARDIA INSTÁVEL COM PULSO</small><b>Considerar cardioversão sincronizada conforme protocolo</b></div></div></div>
 </div></div>
 <details class="ue-pcr-expand"><summary>Por que AESP não deve receber choque?</summary><p>Na AESP já existe atividade elétrica organizada no monitor, mas falta circulação mecânica. A desfibrilação não trata essa falha; RCP e correção de hipóxia, hipovolemia, acidose, eletrólitos, tamponamento, trombose e outras causas podem ser decisivas.</p></details>`;
}
function timeline(){
 const s=state(),items=TIMELINES[s.cycle]||TIMELINES.shock;
 const idx=Math.min(Math.max(s.cycleIndex||0,0),items.length-1),part=items[idx];
 return `<p class="ue-pcr-stage-intro">A desfibrilação não encerra a reanimação. Explore a sequência, verificando o que acontece <strong>antes, durante e depois de cada ciclo de dois minutos</strong>.</p>
 <div class="ue-pcr-toggle" role="group" aria-label="Escolher ramo do algoritmo"><button type="button" aria-pressed="${s.cycle==="shock"}" class="${s.cycle==="shock"?"active":""}" onclick="EmergencyPCR.cycle('shock')">FV / TV sem pulso</button><button type="button" aria-pressed="${s.cycle==="nonshock"}" class="${s.cycle==="nonshock"?"active":""}" onclick="EmergencyPCR.cycle('nonshock')">AESP / assistolia</button></div>
 <div class="ue-pcr-timeline">${items.map((it,i)=>`<button type="button" class="${idx===i?"active":""}" aria-pressed="${idx===i}" onclick="EmergencyPCR.cycleStep(${i})"><span class="ue-pcr-timeline-dot">${i+1}</span><span>${esc(it[0])}</span></button>`).join("")}</div>
 <div class="ue-pcr-timeline-detail" role="status"><div class="ue-pcr-eyebrow">PASSO ${idx+1} DE ${items.length}</div><h3>${esc(part[0])}</h3><p>${esc(part[1])}</p></div>
 <div class="ue-pcr-two-col"><div class="ue-pcr-surface"><h3>Adrenalina</h3><p><strong>1 mg IV/IO a cada 3–5 minutos.</strong> No ritmo não chocável, administrar tão cedo quanto possível. Na FV/TV sem pulso, entra após tentativas iniciais de desfibrilação sem sucesso.</p></div><div class="ue-pcr-surface"><h3>Via aérea e capnografia</h3><p>Sem via aérea avançada: <strong>30:2</strong>. Com via aérea avançada: ventilação em torno de <strong>10/min</strong> sem pausar compressões. ETCO₂ auxilia, mas não define isoladamente interrupção de RCP.</p></div></div>
 <details class="ue-pcr-expand"><summary>Causas reversíveis: abra o checklist dos H e T</summary>
 <div class="ue-pcr-cause-grid"><div><strong>H</strong><ul><li>Hipóxia</li><li>Hipovolemia</li><li>Íons H⁺ / acidose</li><li>Hipo/hipercalemia</li><li>Hipotermia</li></ul></div><div><strong>T</strong><ul><li>Tensão torácica (pneumotórax)</li><li>Tamponamento cardíaco</li><li>Trombose coronária</li><li>Trombose pulmonar</li><li>Toxinas</li></ul></div></div>
 <p>O checklist é um auxílio; priorize as causas prováveis no caso real e não prolongue pausas por procedimentos diagnósticos.</p></details>`;
}
function caseView(){
 const s=state(),idx=Math.min(Math.max(s.caseStage||0,0),CASE_SCENES.length-1),scene=CASE_SCENES[idx];
 const answered=s.answers["case_"+idx]!==undefined;
 const completed=idx===CASE_SCENES.length-1&&answered;
 const correct=CASE_SCENES.reduce((n,_,i)=>n+(s.answers["case_"+i]===QUESTIONS["case_"+i].a?1:0),0);
 return `<div class="ue-pcr-case-banner"><span class="ue-pcr-mono">SIMULAÇÃO · CENÁRIO ${idx+1} DE ${CASE_SCENES.length}</span><strong>${esc(scene.lead)}</strong><p>${esc(scene.stem)}</p></div>
 <div class="ue-pcr-case-dots" aria-label="Evolução clínica">${CASE_SCENES.map((x,i)=>`<span class="${i<idx?"complete":i===idx?"active":""}" title="Decisão ${i+1}"></span>`).join("")}</div>
 ${question("case_"+idx)}
 ${answered?`<div class="ue-pcr-case-next">${completed?`<strong>Você concluiu o caso: ${correct} de ${CASE_SCENES.length} decisões adequadas.</strong><p>Revise os ramos em que houve dúvida. O percurso de consolidação pode recomendar o próximo treino.</p><button type="button" class="btn secondary" onclick="EmergencyPCR.resetCase()">Refazer caso preservando o registro anterior</button>`:`<button type="button" class="btn primary" onclick="EmergencyPCR.nextCase()">Paciente evolui → Próxima decisão</button>`}</div>`:""}
 <p class="ue-pcr-caption">Simulação educacional, com evolução predeterminada para treino de decisões. Não representa previsão do desfecho de um paciente real.</p>`;
}
function practice(){
 const s=state(),course=store.study.uep1||{quiz:{}},arr=ctx?.module?.quiz||[];
 const answered=arr.filter((_,i)=>Number.isInteger(course.quiz?.["pcr_"+i])).length;
 return `<p class="ue-pcr-stage-intro">Agora as questões do banco do Clínica Master. Cada resposta é registrada no histórico que já existe; não é preciso começar outro módulo para praticar.</p>
 <div class="ue-pcr-note"><strong>${answered} de ${arr.length} respondidas.</strong> A prática é salva automaticamente. É possível retornar aos itens quando quiser.</div>
 <section class="ue-pcr-linked-quiz">${arr.map((_,i)=>ctx.quizItem(i)).join("")}</section>
 <details class="ue-pcr-expand"><summary>Como usar seus erros na próxima revisão?</summary><p>Erros de reconhecimento pedem treino de sinais e primeiros segundos; erros de ritmo pedem classificação chocável/não chocável; erros após o choque pedem prática de cronologia; erros pós-RCE pedem nova revisão das metas e investigação de causa.</p></details>`;
}
function getRecommendation(){
 const s=state(),a=s.answers;
 if(a.initial!==undefined&&a.initial!==QUESTIONS.initial.a)return {label:"Revisar reconhecimento e RCP",step:"foundation",why:"A decisão inicial mostrou uma lacuna no primeiro minuto."};
 for(const id of ["rhythm_vf","rhythm_pea","rhythm_asys","rhythm_vtpulse"])if(a[id]!==undefined&&a[id]!==QUESTIONS[id].a)return {label:"Rever ritmos e escolha do algoritmo",step:"algorithm",why:"Uma escolha sobre choque, pulso ou ritmo precisa de reforço."};
 for(let i=0;i<CASE_SCENES.length;i++)if(a["case_"+i]!==undefined&&a["case_"+i]!==QUESTIONS["case_"+i].a)return {label:"Repetir o caso progressivo",step:"case",why:"Houve uma decisão incorreta durante a evolução do paciente."};
 const q=ctx?.module?.quiz||[],scores=store.study?.uep1?.quiz||{};
 const wrong=q.findIndex((qq,i)=>Number.isInteger(scores["pcr_"+i])&&scores["pcr_"+i]!==qq.a);
 if(wrong>=0)return {label:"Refazer questões de fixação",step:"practice",why:"Há respostas do banco que precisam de reteste."};
 if(Object.keys(a).length<2)return {label:"Treinar a escolha do ritmo",step:"algorithm",why:"Ainda há poucas decisões registradas para personalizar."};
 return {label:"Resolver outro caso ou revisar em D+1",step:"case",why:"Você já praticou decisões iniciais; fortaleça a recuperação em um contexto novo."};
}
function follow(){
 const r=getRecommendation(),s=state();
 if(!MODES[s.mode].steps.includes(r.step))s.mode="30";
 s.step=r.step;if(!s.visited.includes(r.step))s.visited.push(r.step);
 save();refresh("ue-pcr-step-heading");
}
function summary(){
 const s=state(),adaptive=window.PCRAdaptiveUI;
 const attempted=Object.keys(s.answers).filter(k=>QUESTIONS[k]).length;
 const correct=Object.entries(s.answers).filter(([id,v])=>QUESTIONS[id]&&QUESTIONS[id].a===v).length;
 return `<div class="ue-pcr-summary">
 <div class="ue-pcr-summary-top"><span>SEU PERCURSO</span><strong>${correct} de ${attempted} decisões adequadas</strong></div>
 <p>Indicador descritivo das decisões feitas nesta aula. Não é uma nota clínica validada nem mede sozinho domínio da ressuscitação.</p>
 <div class="ue-pcr-memory"><h3>Quatro ideias para lembrar sem consultar</h3><ol>
 <li><strong>Reconheceu PCR?</strong> Acione a equipe, inicie compressões e conecte o desfibrilador.</li>
 <li><strong>FV/TV sem pulso?</strong> Desfibrile e retome a RCP imediatamente.</li>
 <li><strong>AESP/assistolia?</strong> RCP, adrenalina e causas reversíveis; sem choque.</li>
 <li><strong>RCE?</strong> Trate a causa, monitore oxigenação e perfusão e organize cuidados neurológicos.</li>
 </ol></div>

 <div class="ue-pcr-reviews"><strong>Revisão espaçada por competência</strong><p>Cada competência recebe uma data de revisão calculada a partir dos erros, acertos e histórico. Os intervalos são heurísticos nesta fase, não FSRS calibrado.</p><p>O painel abaixo mostra revisões disponíveis e recomenda a próxima questão inédita.</p>
 <div class="ue-pcr-review-actions"><button type="button" class="btn primary" onclick="EmergencyPCR.finish()">${s.finishedAt?"Atualizar conclusão da aula":"Concluir a aula e abrir plano de revisões"}</button><button type="button" class="btn secondary" onclick="EmergencyPCR.restart()">Iniciar novo reteste de 5 min</button></div></div>
 </div>
 ${adaptive?.progress?.()||""}
 ${adaptive?.review?.()||""}
 <details class="ue-pcr-expand ue-pcr-full" ${window.PCRAdaptive?.state()?.ui?.startMode==="reading"?"open":""}><summary>Consultar o conteúdo integral aprofundado (8 seções)</summary>${(ctx?.module?.sections||[]).map(section=>`<section class="ue-pcr-deep-section"><h3>${esc(section.h)}</h3>${(section.p||[]).map(p=>`<p>${esc(p)}</p>`).join("")}${section.table?`<div class="ue-pcr-table-scroll"><table><thead><tr>${(section.table.head||[]).map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${(section.table.rows||[]).map(row=>`<tr>${row.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:""}</section>`).join("")}</details>
  <div class="ue-pcr-sources"><h3>Referências verificadas</h3><ul><li><a href="https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support/" target="_blank" rel="noopener noreferrer">AHA 2025 · Suporte básico adulto</a></li><li><a href="https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support/" target="_blank" rel="noopener noreferrer">AHA 2025 · Suporte avançado adulto</a></li><li><a href="https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/post-cardiac-arrest-care/" target="_blank" rel="noopener noreferrer">AHA 2025 · Cuidados pós-parada</a></li><li><a href="https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-CA-250527.pdf" target="_blank" rel="noopener noreferrer">Algoritmo oficial ACLS adulto (PDF)</a></li></ul></div>
 <p class="ue-pcr-caption">Material educacional para treino supervisionado. Doses, energia de desfibrilação e intervenções devem ser verificadas no algoritmo e protocolo institucional antes do cuidado real.</p>`;
}
function section(){
 switch(state().step){
 case "start":return start();
 case "foundation":return foundation();
 case "algorithm":return algorithm();
 case "timeline":return timeline();
 case "case":return caseView();
 case "practice":return practice();
 default:return summary();
 }
}
function footer(){
 const s=state(),arr=paths(),pos=arr.indexOf(s.step);
 return `<nav class="ue-pcr-footer" aria-label="Navegação da aula"><button type="button" class="btn secondary" ${pos<=0?"disabled":""} onclick="EmergencyPCR.go('${arr[Math.max(pos-1,0)]}')">← Voltar</button><span>${pos+1}/${arr.length}</span>${pos<arr.length-1?`<button type="button" class="btn primary" onclick="EmergencyPCR.go('${arr[pos+1]}')">Próxima etapa →</button>`:`<button type="button" class="btn secondary" onclick="Emergency.p1.open(null)">Voltar aos módulos</button>`}</nav>`;
}
function page(context){
 ctx=context;
 const s=state();
 if(window.PCRAdaptive){
   const session=window.PCRAdaptive.state().analytics.active;
   if(!session||Date.now()-(session.lastAt||session.startedAt)>20*60*1000)window.PCRAdaptive.openSession(s.mode);
 }
 return `<div id="ue-pcr-pilot" class="ue-pcr-pilot">
 <nav class="ue-pcr-breadcrumb" aria-label="Localização"><button type="button" class="btn secondary" onclick="Emergency.p1.open(null)">← Todas as aulas</button><span>Urgência e Emergência / P1 / PCR</span></nav>
 ${overview()}${nav()}
 <article class="ue-pcr-stage">${headline()}${section()}${footer()}</article>
 <div class="ue-pcr-endnote">Os resultados são salvos no progresso desta disciplina. As etapas vistas não equivalem a proficiência clínica demonstrada.</div>
 </div>`;
}
window.EmergencyPCR={page,mode,go,answer,hint,confidence,refresh,selectRhythm,cycle,cycleStep,nextCase,resetCase,restart,follow,finish,questionIds:Object.keys(QUESTIONS),paths:MODES};
})();
