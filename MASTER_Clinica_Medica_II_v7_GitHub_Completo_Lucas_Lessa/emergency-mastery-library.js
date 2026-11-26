/* Une o roteiro editorial ao acervo preservado, sem alterar quizzes ou identificadores anteriores. */
(()=>{
'use strict';
const references={
 sca:['acs2025',['Dor torácica · diretriz AHA/ACC 2021','https://pubmed.ncbi.nlm.nih.gov/34709879/']],
 hipertensiva:['htn2025',['ESC · Insuficiência cardíaca aguda e crônica','https://pubmed.ncbi.nlm.nih.gov/34447992/']],
 acidobase:['general',['MSD Manual · Distúrbios acidobásicos','https://www.msdmanuals.com/professional/endocrine-and-metabolic-disorders/acid-base-regulation-and-disorders/acid-base-disorders']],
 eletrolitos:['ukka2026',['European Society of Endocrinology · Hiponatremia','https://pubmed.ncbi.nlm.nih.gov/24569125/']],
 glicemia:['dka2024'],intox:['ahaSpecial'],tireoide:[['ATA · Hipertireoidismo e tireotoxicose','https://pubmed.ncbi.nlm.nih.gov/27521067/'],['ATA · Hipotireoidismo','https://pmc.ncbi.nlm.nih.gov/articles/PMC4267409/']],
 catastrofes:[['HHS CHEMM · Triage adult START','https://chemm.hhs.gov/startadult.htm']],
 paliativos:['whoPall',['NICE · Cuidado de adultos nos últimos dias de vida','https://www.nice.org.uk/guidance/ng31']],
 pcr:['aha','postAha'],sepse:['ssc'],choque:['general','ssc'],irpa:['atsResp'],vm:['ards'],
 avci:['ahaStroke'],trauma:['atls'],'trauma-especifico':['atls'],asma:['gina'],adrenal:['endocrine'],afogamento:['ahaSpecial','erc'],queimado:['aba','atls'],sensorio:['general','ahaStroke']
};
const pharmacology={
 sca:[['AAS','Inibe irreversivelmente COX-1 plaquetária e reduz tromboxano A₂.','Avalie antiagregação precoce em SCA quando indicada.','Verifique sangramento, hipersensibilidade e diagnóstico concorrente, especialmente suspeita de dissecção.']],
 hipertensiva:[['Nitroglicerina','Aumenta GMPc via óxido nítrico e produz vasodilatação dependente de dose.','Pode ajudar em EAP hipertensivo com monitorização e pressão adequada.','Acompanhe PA e perfusão. Verifique uso de PDE5 e suspeita de infarto de VD.'],['Furosemida','Bloqueia NKCC2 na alça de Henle e promove natriurese.','Avalie se há excesso de volume, além da redistribuição aguda.','Acompanhe volemia, diurese, eletrólitos e função renal.']],
 acidobase:[['Bicarbonato de sódio','Aumenta a capacidade tampão e pode elevar geração de CO₂.','A indicação depende da causa e gravidade. Trate a causa e verifique ventilação.','Monitore pH, sódio, potássio e volume. Evite uso automático para qualquer acidemia.']],
 eletrolitos:[['Cálcio IV','Antagoniza a instabilidade elétrica associada ao K elevado.','Proteção miocárdica conforme ECG, contexto e protocolo.','Monitore ECG e acesso. Associe estratégias para deslocar e eliminar K.'],['Insulina com glicose','Estimula entrada celular de K.','Redistribuição temporária no manejo da hipercalemia.','Acompanhe hipoglicemia tardia e potássio seriado.']],
 glicemia:[['Insulina','Inibe lipólise e cetogênese, reduz glicemia e desloca K.','Titule conforme protocolo de CAD/EHH, depois de avaliar K, perfusão e volemia.','Monitore glicemia e eletrólitos. Glicose IV pode permitir continuar a insulina até resolução.']],
 intox:[['Naloxona','Antagoniza receptores opioides e pode reverter depressão respiratória.','Use quando indicada e apoie ventilação prontamente.','Acompanhe recorrência da depressão respiratória e possível abstinência.']],
 tireoide:[['Tionamidas','Reduzem síntese de hormônio tireoidiano.','Na tempestade, quando indicado, integram a estratégia com suporte e tratamento do precipitante.','A escolha depende de etiologia, contraindicações e protocolo. Siga sequência de iodo quando indicado.']],
 catastrofes:[['Medicamentos durante triagem','O benefício depende da intervenção imediata autorizada pelo protocolo local e dos recursos disponíveis.','Organize administração, registro e encaminhamento no posto apropriado.','Evite atrasar a triagem para iniciar esquemas que não abordem ameaça imediata.']],
 paliativos:[['Opioides','Agonismo opioide pode reduzir dor e, em casos selecionados, a percepção de dispneia.','Titule ao objetivo, à exposição prévia e à tolerância.','Acompanhe alívio, sedação, função orgânica e efeitos adversos.']],
 pcr:[['Adrenalina','A vasoconstrição alfa-adrenérgica aumenta a pressão de perfusão durante RCP.','Integre ao algoritmo por ritmo e momento.','A administração não deve atrasar compressões ou desfibrilação.']],
 sepse:[['Noradrenalina','Vasoconstrição alfa-adrenérgica eleva resistência vascular e PA.','Vasopressor inicial no choque séptico, com titulação à perfusão.','Monitore acesso, PA, perfusão periférica e fatores concorrentes.']],
 choque:[['Vasoativos','Agentes variam em efeitos sobre resistência vascular, contratilidade e frequência.','Escolha após identificar o mecanismo predominante e sua causa.','Monitore perfusão, ritmo, acesso e efeito. Controle de fonte ou obstrução pode ser decisivo.']],
 irpa:[['Oxigênio','Aumenta a fração inspirada e pode corrigir hipoxemia.','Titule à meta individual e à causa.','Mantenha avaliação de ventilação, especialmente com risco de retenção de CO₂.']],
 vm:[['Analgesia e sedação','Reduzem dor e agitação, podendo diminuir esforço respiratório.','Considere indicações e metas após examinar causas de desconforto e assincronia.','Monitore hemodinâmica e profundidade. Reavalie necessidade com evolução.']],
 avci:[['Trombolítico','Ativa fibrinólise para favorecer reperfusão em casos elegíveis.','A escolha depende de tempo, imagem, contraindicações e protocolo vigente.','Verifique PA, risco hemorrágico e seguimento neurológico. Avalie trombectomia quando indicada.']],
 trauma:[['Ácido tranexâmico','Inibe fibrinólise por impedir ligação do plasminogênio à fibrina.','Considere em hemorragia traumática significativa segundo elegibilidade e janela do protocolo.','Use em paralelo a controle de fonte e ressuscitação hemostática.']],
 'trauma-especifico':[['Agentes osmóticos','Podem reduzir edema cerebral por gradiente osmótico.','Considere em indicações específicas de hipertensão intracraniana com equipe de trauma/neurocrítica.','Reavalie hemodinâmica, sódio, volume e função renal.']],
 asma:[['Salbutamol','Agonismo beta-2 promove relaxamento do músculo liso brônquico.','Broncodilatação rápida conforme gravidade e protocolo.','Reavalie esforço, oxigenação, resposta e efeitos sistêmicos.'],['Corticoide sistêmico','Reduz inflamação de vias aéreas com início mais lento que broncodilatador.','Use precocemente quando indicado na exacerbação.','Avalie resposta, glicemia e adequação do plano de alta.']],
 adrenal:[['Hidrocortisona','Repõe ação glicocorticoide e ajuda a recuperar responsividade vascular.','Na forte suspeita de crise, administre prontamente segundo protocolo com suporte e tratamento do gatilho.','Acompanhe perfusão, eletrólitos e glicemia.']],
 afogamento:[['Oxigênio','Apoia recuperação da oxigenação após insulto hipóxico.','Use junto de ventilação eficaz conforme gravidade.','Siga SpO₂ confiável e reavalie ventilação e deterioração.']],
 queimado:[['Analgesia','Reduz sofrimento e facilita exame e cuidados.','Escolha e titule analgesia sistêmica conforme extensão, perfusão e monitorização.','Reavalie dor, sedação, ventilação e efeitos hemodinâmicos.']],
 sensorio:[['Glicose','Repõe substrato para corrigir neuroglicopenia.','Corrija hipoglicemia sem atraso, por via compatível com consciência e proteção de via aérea.','Repita glicemia e procure causas recorrentes.']]
};
const longCase=(c,chapter)=>[c.focus,c.stem,c.ask,c.answer.join(' '),chapter];
function assemble(module,track,assessment){
 const id=module.id,main=track[0][0],mRefs=references[id];
 const keys=mRefs.map((item,i)=>typeof item==='string'?item:'topic-ref-'+i);
 const refs=Object.fromEntries(mRefs.map((item,i)=>{
  if(Array.isArray(item))return [keys[i],item];
  const source=window.Emergency.refs[item];
  return [keys[i],[source.t,source.u]];
 }));
 const [source]=keys;
 const core=track.map(([key,title,,answer])=>[key,title,answer,'',keys[1]&&id==='sca'&&['aorta','tep','ecg','primeiros-minutos'].includes(key)?keys[1]:source]);
 const supporting=module.sections.filter(s=>!s.table);
 const chapters=[...core,...supporting.map((s,i)=>['acervo-'+(i+1),s.h,s.p?.[0]||'',s.p?.slice(1).join(' ')||''])];
 const extras=Object.fromEntries(supporting.map((s,i)=>['acervo-'+(i+1),s.list||[]]));
 const matrix=module.sections.find(s=>s.table)?.table;
 const cases=[module.case,...(module.moreCases||[])];
 const questions=assessment.map(([topic,level,competency,stem,correct,...wrong],index)=>{
  const position=(index+id.length)%5,choices=wrong.slice();
  choices.splice(position,0,correct);
  return {id:'ue-mastery-'+id+'-'+String(index+1).padStart(2,'0')+'-v1',revision:'1',t:id,kind:'mastery',origin:'Clínica Master · autoral',level,chapter:topic,competency,q:stem,a:position,
   o:choices.map(([answer])=>answer),rationales:choices.map(([,rationale])=>rationale),why:correct[1],memory:track.find(([slug])=>slug===topic)[3]};
 });
 // Correspondência estável com o conteúdo de origem e com as séries de revisão.
 const cards=[
  ...track.map(([key,,front,back])=>[key,front,back,key]),
  ...module.quiz.map((q,i)=>['fixacao-'+(i+1),q.q,q.o[q.a]+'\n'+q.why,main]),
  ...module.flow.map(([label,answer],i)=>['conduta-'+(i+1),'Qual ação o fluxograma associa a «'+label+'»?',answer,main]),
  ...cases.map((c,i)=>['caso-'+(i+1),c.stem+'\n'+c.ask,c.answer.join(' '),main]),
  ...questions.map(q=>['aplicacao-'+q.id.split('-').at(-2),q.q,q.o[q.a]+'\n'+q.why,q.chapter])
 ].slice(0,20).map(([key,front,back,chapter])=>({id:id+'-'+key+'-v1',front,back,chapter}));
 return {schemaVersion:1,edition:'2026.11-expansão',refs,chapters,extras,questions,cards,art:({sca:['assets/urgencia/mastery/territorios-ecg.svg','Mapa didático de derivações e territórios no ECG'],vm:['assets/urgencia/mastery/fluxo-autopeep.svg','Gráfico esquemático de fluxo expiratório e auto-PEEP']})[id],tableHeaders:matrix?.head||['Situação','Conduta'],
  table:matrix?.rows||module.flow,branches:module.flow.map(([label,action])=>[label,action,null]),
  essential:track.slice(0,6).map(([,label,,answer])=>[label,answer]),memory:module.memory.slice(0,3),
  cases:cases.map(c=>longCase(c,main)),drugs:pharmacology[id].map(drug=>[...drug,source])};
}
for(const module of window.Emergency.all){
 if(Object.hasOwn(window.UE_MASTERY_CONTENT,module.id))continue;
 window.UE_MASTERY_CONTENT[module.id]=assemble(module,window.UE_MASTERY_TRACKS[module.id],window.UE_MASTERY_ASSESSMENTS[module.id]);
}
})();

window.UE_MASTERY_MEDIA={
 hipertensiva:[
  ['rx-congestao.jpg','Radiografia anotada de congestão','Localize linhas de Kerley B, redistribuição vascular e derrame. Este caso representa congestão intersticial em insuficiência cardíaca.','Mikael Häggström','Chest_radiograph_with_signs_of_congestive_heart_failure_-_annotated.jpg','CC0 1.0','https://creativecommons.org/publicdomain/zero/1.0/'],
  ['pocus-linhas-b.jpg','Linhas B no ultrassom pulmonar','Observe o artefato vertical que parte da pleura. A aquisição é de um caso de fibrose e ilustra a baixa especificidade etiológica das linhas B. Faixa técnica superior removida.','Tinss','B_lines_on_a_lung_ultrasound_of_a_patient_with_fibrosis.jpg','CC BY-SA 4.0','https://creativecommons.org/licenses/by-sa/4.0/']
 ],
 irpa:[
  ['pocus-linhas-b.jpg','Linhas B no ultrassom pulmonar','Relacione o artefato à síndrome intersticial, que pode ter causas distintas. Exemplo de fibrose. Faixa técnica superior removida.','Tinss','B_lines_on_a_lung_ultrasound_of_a_patient_with_fibrosis.jpg','CC BY-SA 4.0','https://creativecommons.org/licenses/by-sa/4.0/']
 ],
 afogamento:[
  ['rx-afogamento.png','Edema pulmonar após aspiração de água salgada','Observe as opacidades pulmonares bilaterais do caso publicado. Correlacione com oxigenação e história de submersão.','Dr. Terence McManus','Salt_water_aspiration_syndrome_chest_x-ray,_before_treatment.png','CC BY-SA 4.0','https://creativecommons.org/licenses/by-sa/4.0/']
 ]
};
