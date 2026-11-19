/* Extensão clínica de alto rendimento do curso de Urgência e Emergência.
   Acrescenta seções, questões e cenários sem substituir IDs ou respostas preexistentes.
   Todos os conteúdos são educacionais, com referências na própria aula. */
(function(){
'use strict';
const topics=window.EMERGENCY_CONTENT||[];
const index=new Map(topics.map(m=>[m.id,m]));
window.EmergencyDeepAudit={processed:[],missing:[],version:'2026.11.19-deep1'};
window.addEmergencyDepth=function(payload){
 const m=index.get(payload.id);
 if(!m){window.EmergencyDeepAudit.missing.push(payload.id);return;}
 if(m.depthApplied)return;
 m.sections=m.sections||[];
 const sections=(payload.sections||[]).map(s=>{
   const [h,p,items]=s;
   return {h,p:Array.isArray(p)?p:[p],...(items?.length?{list:items}:{})};
 });
 m.sections.push(...sections);
 if(payload.compare&&payload.compare.length>=2){
   m.sections.push({h:'Matriz comparativa para decisão',p:[payload.compareIntro||'Diferencie apresentações semelhantes antes de escolher o tratamento.'],table:{head:payload.compare[0],rows:payload.compare.slice(1)}});
 }
 m.quiz.push(...(payload.quiz||[]).map(q=>({q:q[0],o:q[1],a:q[2],why:q[3]})));
 if(payload.case){
   m.moreCases=m.moreCases||[];
   m.moreCases.push({id:'case-'+m.id+'-evolucao',focus:m.title+' · evolução',stem:payload.case.stem,ask:payload.case.ask,answer:payload.case.answer});
 }
 m.oral=payload.oral||[];
 m.memory=payload.memory||[];
 m.alerts=payload.alerts||[];
 m.refs.push(...(payload.refs||[]).filter(x=>!m.refs.includes(x)));
 m.depthApplied=true;
 window.EmergencyDeepAudit.processed.push(m.id);
};
})();
