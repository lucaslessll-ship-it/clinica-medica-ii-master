/* Clínica Master Adaptive — PCR: competência, revisão e indicadores locais; modelo de intervalos heurístico, não FSRS. */
(function createAdaptive(){
'use strict';
const D=86400000;
const SKILLS=[
{id:"recognition",title:"Reconhecimento e primeira resposta",step:"start",importance:1,exam:1,prereq:[]},
{id:"compressions",title:"Compressões e ventilação eficaz",step:"foundation",importance:1,exam:.9,prereq:["recognition"]},
{id:"shockable",title:"FV/TV sem pulso e desfibrilação",step:"algorithm",importance:1,exam:1,prereq:["recognition"]},
{id:"nonshockable",title:"AESP, assistolia e causas reversíveis",step:"algorithm",importance:1,exam:1,prereq:["recognition"]},
{id:"pharmacology",title:"Drogas e cronologia do ACLS",step:"timeline",importance:.95,exam:1,prereq:["shockable","nonshockable"]},
{id:"reversible",title:"Causas reversíveis (H e T)",step:"timeline",importance:.92,exam:.85,prereq:["recognition"]},
{id:"postrosc",title:"Cuidados pós-RCE",step:"case",importance:.95,exam:.95,prereq:["recognition"]},
{id:"transfer",title:"Transferência para casos novos",step:"case",importance:1,exam:1,prereq:["recognition","shockable","nonshockable"]}
];
const META={
initial:["recognition"],quality:["compressions"],
rhythm_vf:["shockable"],rhythm_pea:["nonshockable"],rhythm_asys:["nonshockable"],rhythm_vtpulse:["shockable"],
case_0:["recognition","transfer"],case_1:["shockable","transfer"],case_2:["compressions","transfer"],
case_3:["pharmacology","transfer"],case_4:["postrosc","transfer"],
"pcr_0":["recognition","shockable"],"pcr_1":["nonshockable"],"pcr_2":["compressions"],
"pcr_3":["reversible"],"pcr_4":["postrosc"]
};
const ITEMS=[
{id:"rev_recog_a",skill:"recognition",tag:"transfer",prompt:"Um paciente cai na frente da equipe. Não responde, apresenta gasping e o profissional treinado não identifica pulso central em até 10 segundos. Qual é a sequência prioritária?",options:["ECG e troponina antes de qualquer medida.","Acionar emergência, iniciar RCP e conectar desfibrilador.","Aguardar ventilação espontânea por um minuto.","Administrar atropina antes da RCP."],answer:1,why:["ECG e troponina não podem atrasar compressões.","Reconhecimento de PCR exige RCP imediata e desfibrilador.","Gasping é respiração agônica, não respiração normal.","Atropina não é conduta inicial da PCR."],critical:[0,2,3]},
{id:"rev_recog_b",skill:"recognition",tag:"transfer",prompt:"Após queda súbita, o paciente não responde, respira de modo agônico e o pulso é incerto depois da avaliação rápida. Como agir?",options:["Esperar um especialista confirmar o pulso por 60 segundos.","Considerar respiração agônica uma ventilação adequada.","Tratar como PCR: pedir ajuda, compressões e DEA/desfibrilador.","Solicitar radiografia de tórax."],answer:2,why:["Não prolongar checagem de pulso.","Gasping não é normal.","Na dúvida após até 10 segundos, o profissional treinado inicia RCP.","Imagem não precede RCP."],critical:[0,1,3]},
{id:"rev_comp_a",skill:"compressions",tag:"recall",prompt:"Qual conjunto descreve a RCP adulta de alta qualidade?",options:["100–120 compressões/min, 5–6 cm, retorno completo e poucas pausas.","80 compressões/min e 3 cm.","140 compressões/min com longas pausas.","Checar pulso a cada 20 segundos."],answer:0,why:["Parâmetros recomendados de RCP adulta.","Frequência e profundidade insuficientes.","Compressões excessivamente rápidas e pausas prejudicam qualidade.","Checagens frequentes interrompem perfusão."],critical:[1,2,3]},
{id:"rev_comp_b",skill:"compressions",tag:"transfer",prompt:"Após o primeiro choque em FV, a equipe mantém o paciente sem compressões para observar o monitor. Qual é o problema?",options:["Não há problema porque o choque restabelece sempre o débito.","É obrigatório checar pulso por 40 s.","A RCP só reinicia após ECG de 12 derivações.","Pausas após choque reduzem perfusão; reiniciar compressões imediatamente."],answer:3,why:["Choque não garante RCE.","Pausas devem ser minimizadas.","ECG não deve atrasar RCP.","Retomar compressões em seguida ao choque é essencial."],critical:[0,1,2]},
{id:"rev_shock_a",skill:"shockable",tag:"recall",prompt:"O ritmo é TV sem pulso. Qual intervenção específica do ramo chocável?",options:["Cardioversão sincronizada.","Desfibrilação e RCP imediata.","Adenosina isolada.","Atropina e observação."],answer:1,why:["Sem pulso, algoritmo é de PCR com desfibrilação.","Ritmo chocável e ausência de circulação exigem choque não sincronizado.","Adenosina não trata TV sem pulso.","Atropina não substitui choque."],critical:[0,2,3]},
{id:"rev_shock_b",skill:"shockable",tag:"transfer",prompt:"Uma TV muito rápida aparece no monitor. O paciente está hipotenso, mas tem pulso central presente. Que diferença muda a escolha?",options:["Sempre aplicar desfibrilação como FV.","Administrar adrenalina de PCR de rotina.","Seguir taquicardia instável com pulso, avaliando cardioversão sincronizada.","Ignorar instabilidade por ser ritmo organizado."],answer:2,why:["Pulso muda o algoritmo.","Adrenalina de PCR não é resposta automática em taquicardia com pulso.","Instabilidade atribuída à arritmia com pulso normalmente indica cardioversão sincronizada.","Choque circulatório exige intervenção."],critical:[0,1,3]},
{id:"rev_non_a",skill:"nonshockable",tag:"recall",prompt:"Monitor com atividade elétrica organizada, paciente sem pulso. Qual a conduta?",options:["Desfibrilar repetidamente.","Iniciar/continuar RCP, adrenalina precoce e buscar causas.","Cardioversão sincronizada.","Aguardar assistolia."],answer:1,why:["AESP não é chocável.","AESP necessita RCP, adrenalina e causas reversíveis.","Cardioversão exige condição diferente.","Aguardar deterioração é inadequado."],critical:[0,2,3]},
{id:"rev_non_b",skill:"nonshockable",tag:"transfer",prompt:"O monitor mostra linha aparentemente isoelétrica e não há pulso. Qual é a medida segura?",options:["Desfibrilar a linha isoelétrica.","Confirmar cabos/ganho rapidamente e continuar RCP e adrenalina.","Esperar surgir FV.","Dar adenosina."],answer:1,why:["Assistolia não é chocável.","Confirmar o traçado sem atrasar manobras e continuar algoritmo não chocável.","Esperar piora não é adequado.","Adenosina não trata assistolia."],critical:[0,2,3]},
{id:"rev_pharm_a",skill:"pharmacology",tag:"recall",prompt:"Na PCR adulta, qual esquema de adrenalina é recomendado?",options:["0,1 mg IV única.","1 mg IV/IO a cada 3–5 min, no momento indicado para o ritmo.","10 mg IV a cada minuto.","Somente depois do RCE."],answer:1,why:["Dose menor que o esquema ACLS.","1 mg IV/IO a cada 3–5 min; momento inicial difere entre ritmos.","Dose excessiva e intervalo inadequado.","Drogas são usadas durante reanimação."],critical:[0,2,3]},
{id:"rev_pharm_b",skill:"pharmacology",tag:"transfer",prompt:"FV persiste após choques adicionais e RCP. Qual fármaco pode ser considerado para FV/TV sem pulso refratária?",options:["Amiodarona 300 mg IV/IO (ou lidocaína conforme algoritmo).","Atropina 1 mg de rotina.","Adenosina 6 mg.","Betabloqueador por via oral."],answer:0,why:["Alternativa antiarrítmica prevista em PCR chocável refratária.","Atropina é para bradicardia sintomática com pulso, não FV.","Adenosina não é tratamento de FV.","Terapia oral não trata PCR."],critical:[1,2,3]},
{id:"rev_rev_a",skill:"reversible",tag:"transfer",prompt:"Durante PCR, há ausência unilateral de murmúrio, ventilação difícil e jugulares túrgidas. Qual causa reversível é prioritária?",options:["Hipoglicemia como única causa.","DPOC estável.","Pneumotórax hipertensivo.","Enxaqueca."],answer:2,why:["Não explica os sinais torácicos.","DPOC estável não explica o colapso súbito com assimetria.","Pneumotórax hipertensivo pode obstruir retorno venoso e requer tratamento causal imediato.","Sem relação."],critical:[0,1,3]},
{id:"rev_rev_b",skill:"reversible",tag:"transfer",prompt:"Paciente com DRC, potássio 7,4 e PCR. Qual causa deve ser tratada em paralelo às manobras?",options:["Hipercalemia grave.","Hiponatremia leve isolada.","Rinite alérgica.","Infecção cutânea remota."],answer:0,why:["Hipercalemia é causa reversível relevante de PCR.","Não explica o quadro tão diretamente.","Sem relação.","Sem evidência etiológica."],critical:[1,2,3]},
{id:"rev_post_a",skill:"postrosc",tag:"recall",prompt:"Após RCE, com SpO₂ confiável, qual alvo de saturação é recomendado pela AHA 2025?",options:["Manter 100% independentemente do valor.","90–98%, titulando oxigênio.","75–80%.","Não monitorizar oxigenação."],answer:1,why:["Evitar hiperóxia prolongada.","AHA 2025 recomenda 90–98% com medida confiável.","Hipoxemia prejudica recuperação.","Monitorização é essencial."],critical:[0,2,3]},
{id:"rev_post_b",skill:"postrosc",tag:"transfer",prompt:"Após RCE, paciente permanece sem seguir comandos. Qual é a abordagem neurológica apropriada?",options:["Prognóstico definitivo nos primeiros minutos.","Alta imediata após retornar pulso.","Controle térmico apropriado e avaliação multimodal sem prognóstico prematuro.","Interromper toda monitorização."],answer:2,why:["Prognóstico precoce isolado é inseguro.","Sem estabilidade neurológica, alta é inadequada.","Cuidados pós-PCR incluem abordagem térmica e neuroprognóstico diferido/multimodal.","Persistem riscos pós-PCR."],critical:[0,1,3]},
{id:"rev_trans_a",skill:"transfer",tag:"transfer",prompt:"Paciente com PCR em AESP recebe RCP e adrenalina, mas persiste em choque sem pulso; ecocardiografia rápida sem aumentar pausas mostra derrame pericárdico com fisiologia de tamponamento. Qual raciocínio correto?",options:["Desfibrilar por ser AESP.","Suspender compressões para discutir diagnóstico.","Dar adenosina.","Manter RCP e providenciar tratamento do tamponamento como causa reversível."],answer:3,why:["AESP não é chocável.","Pausas prolongadas pioram perfusão.","Adenosina não trata tamponamento.","Correção de causas reversíveis acompanha RCP."],critical:[0,1,2]},
{id:"rev_trans_b",skill:"transfer",tag:"transfer",prompt:"Durante PCR testemunhada por FV, um membro da equipe quer retirar compressões para captar imagem ultrassonográfica prolongada. Qual decisão?",options:["Permitir pausa longa por diagnóstico.","Priorizar compressões e desfibrilação; POCUS não pode prolongar pausas.","Esperar ultrassom para escolher ritmo.","Manter apenas ventilação."],answer:1,why:["Pausas reduzem perfusão.","POCUS auxilia quando não atrasa RCP e choque.","Ritmo chocável é determinado pelo monitor.","Ventilação isolada não substitui compressões."],critical:[0,2,3]}
];
const MAP=Object.fromEntries(ITEMS.map(q=>[q.id,q.skill]));
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
function state(){
 const parent=store.study||(store.study={});
 const part=parent.uep1||(parent.uep1={done:{},quiz:{},seen:{}});
 const s=part.pcrAdaptive||(part.pcrAdaptive={v:1,events:[],confidence:{},review:{},used:[],seenTags:[],analytics:{opens:0,sessions:[],firstStarts:[],active:null},ui:{activeQuestion:null,reviewMode:"mixed",startMode:"guided"}});
 s.events=s.events||[];s.confidence=s.confidence||{};s.review=s.review||{};s.used=s.used||[];s.analytics=s.analytics||{opens:0,sessions:[],firstStarts:[],active:null};s.ui=s.ui||{};
 return s;
}
function save(){stateSave();}
function item(id){return ITEMS.find(x=>x.id===id);}
function skill(id){return SKILLS.find(x=>x.id===id);}
function skillEvents(id){return state().events.filter(e=>(e.skills||[]).includes(id));}
function skillStats(id){
 const ev=skillEvents(id);
 const weighted=ev.reduce((x,e)=>{const w=e.hint?.6:e.type==="transfer"?1.35:1;x.total+=w;x.right+=e.correct?w:0;x.withoutHint+=e.correct&&!e.hint?1:0;return x;},{total:0,right:0,withoutHint:0});
 const mean=(1+weighted.right)/(2+weighted.total);
 const evidence=clamp(weighted.total/7,0,1);
 const uncertainty=1/Math.sqrt(1+weighted.total);
 const reviews=state().review[id];
 const due=reviews?.due||0;
 const stability=reviews?.intervalDays||1;
 const elapsed=reviews?.lastAt?Math.max(0,(Date.now()-reviews.lastAt)/D):0;
 const retrievability=reviews?Math.exp(Math.log(.90)*elapsed/stability):null;
 const status=weighted.total===0?"Não avaliada":evidence<.5?"Em construção":mean>=.82&&evidence>=.8?"Forte":mean>=.65?"Em desenvolvimento":"Revisar";
 return {id,mean,evidence,uncertainty,status,attempts:ev.length,independent:weighted.withoutHint,
 due,overdue:due>0&&due<=Date.now(),retrievability,review:reviews||null};
}
function allStats(){return SKILLS.map(s=>({...s,...skillStats(s.id)}));}
function openSession(mode){
 const s=state(),now=Date.now();
 const a=s.analytics;
 if(a.active&&now-a.active.startedAt<20*60*1000){a.active.lastAt=now;save();return;}
 a.opens=(a.opens||0)+1;
 a.active={startedAt:now,lastAt:now,mode:mode||"guided",actions:0,firstActionAt:null};
 a.sessions.unshift(a.active);
 if(a.sessions.length>50)a.sessions=a.sessions.slice(0,50);
 save();
}
function record(id,correct,extra={}){
 const s=state(),skills=extra.skills||META[id]||(MAP[id]?[MAP[id]]:[]);
 if(!skills.length)return;
 const now=Date.now();
 const event={id,at:now,skills,correct:!!correct,hint:!!extra.hint,
 type:extra.type||(id.startsWith("case_")||id.startsWith("rev_")?"transfer":"recall"),
 critical:!!extra.critical,confidence:null,latencyMs:Number.isFinite(extra.latencyMs)?extra.latencyMs:null};
 s.events.push(event);if(s.events.length>1500)s.events.splice(0,s.events.length-1500);
 if(s.analytics.active){s.analytics.active.actions++;s.analytics.active.lastAt=now;
 if(!s.analytics.active.firstActionAt){s.analytics.active.firstActionAt=now;s.analytics.firstStarts=s.analytics.firstStarts||[];s.analytics.firstStarts.unshift(now-s.analytics.active.startedAt);s.analytics.firstStarts=s.analytics.firstStarts.slice(0,60);}}
 for(const k of skills){
 const prev=s.review[k]||{streak:0,intervalDays:1};
 const streak=correct?prev.streak+1:0;
 // Intervals are heuristic and will need calibration; NOT an FSRS implementation.
 const schedule=[1,3,7,14,30,60,90];
 let intervalDays=correct?schedule[Math.min(streak-1,schedule.length-1)]:.007;
 if(extra.hint&&correct)intervalDays=Math.min(intervalDays,1);
 if(extra.critical&&!correct)intervalDays=.007;
 s.review[k]={streak,intervalDays,lastAt:now,due:now+intervalDays*D,lastCorrect:!!correct,history:(prev.history||0)+1};
 }
 save();
}
function confidence(id,value){
 if(!["low","medium","high"].includes(value))return;
 const s=state(),latest=[...s.events].reverse().find(e=>e.id===id);
 if(!latest)return;
 latest.confidence=value;
 s.confidence[id]=value;
 save();
}
function priority(s){
 const gap=1-(s.mean*(.4+.6*s.evidence));
 const due=s.overdue?1:s.review?(s.retrievability<.93?clamp((1-(s.retrievability||0))/.2,0,1):.05):.5;
 const deps=s.prereq.length?s.prereq.reduce((n,k)=>n+(1-skillStats(k).mean),0)/s.prereq.length:0;
 const recent=state().events.slice(-3).some(e=>e.skills.includes(s.id))?.07:0;
 return .3*gap+.25*due+.2*s.exam+.15*s.importance+.1*deps-recent;
}
function recommendations(limit=3){
 return allStats().map(x=>({...x,priority:priority(x)}))
 .sort((a,b)=>b.priority-a.priority)
 .slice(0,limit)
 .map(x=>({skill:x.id,title:x.title,step:x.step,score:Math.round(x.priority*100),
 reason:x.attempts===0?"Ainda não há evidência de domínio nesta competência.":x.overdue?"Há uma revisão vencida; recupere a informação antes de reler.":x.mean<.67?"As últimas decisões sugerem necessidade de reforço.":"Uma questão nova ajudará a confirmar a aprendizagem.",due:x.due}));
}
function dueSkills(){return allStats().filter(x=>x.due&&x.due<=Date.now()).sort((a,b)=>a.due-b.due);}
function pick(skillId){
 const s=state(),id=skillId||(recommendations(1)[0]||{}).skill;
 const items=ITEMS.filter(q=>q.skill===id);
 if(!items.length)return null;
 const recent=s.used.slice(-6);
 let pool=items.filter(q=>!recent.includes(q.id));
 if(!pool.length)pool=items;
 const n=pool.slice().sort((a,b)=>((s.used.lastIndexOf(a.id)+1)-(s.used.lastIndexOf(b.id)+1)))[0];
 s.used.push(n.id);if(s.used.length>80)s.used=s.used.slice(-80);
 s.ui.activeQuestion=n.id;
 s.ui.startedAt=Date.now();
 save();
 return n;
}
function answerReview(id,chosen){
 const q=item(id);if(!q||!Number.isInteger(chosen)||chosen<0||chosen>=q.options.length)return null;
 const s=state();
 if(s.ui.answered===id)return null;
 const correct=chosen===q.answer;
 record(id,correct,{skills:[q.skill],type:q.tag,hint:false,critical:!correct&&q.critical.includes(chosen),latencyMs:Date.now()-(s.ui.startedAt||Date.now())});
 s.ui.answered=id;s.ui.chosen=chosen;
 save();
 return {correct,why:q.why[chosen]};
}
function nextReview(skillId){
 const s=state();s.ui.answered=null;s.ui.chosen=null;
 return pick(skillId||recommendations(1)[0]?.skill);
}
function report(){
 const s=state(),n=s.events.length,correct=s.events.filter(e=>e.correct).length;
 const transfer=s.events.filter(e=>e.type==="transfer");
 const starts=s.analytics.firstStarts||[];
 const meanStart=starts.length?Math.round(starts.reduce((a,b)=>a+b,0)/starts.length/1000):null;
 const calibrated=s.events.filter(e=>e.confidence);
 const miscal=calibrated.filter(e=>(e.confidence==="high"&&!e.correct)||(e.confidence==="low"&&e.correct)).length;
 return {events:n,accuracy:n?Math.round(correct/n*100):null,transfer:transfer.length,transferAccuracy:transfer.length?Math.round(transfer.filter(e=>e.correct).length/transfer.length*100):null,startSeconds:meanStart,calibration:calibrated.length?Math.round((1-miscal/calibrated.length)*100):null,due:dueSkills().length};
}
window.PCRAdaptive={skills:SKILLS,items:ITEMS,meta:META,state,skillStats,allStats,openSession,record,confidence,recommendations,dueSkills,pick,item,answerReview,nextReview,report};
})();
