/* OSCE MASTER · Gerador de estações originais a partir de fichas clínicas autorais.
   Nunca importa/copia perguntas ou imagens de terceiros no repositório público.
   Os cartões são complementares aos casos de alta prioridade validados individualmente.
*/
(function(){
'use strict';
const GUIDE={
  endocrino:[
    {id:'endocrine',label:'Endocrine Society — Clinical Practice Guidelines (biblioteca)',year:2026,url:'https://www.endocrine.org/clinical-practice-guidelines'},
    {id:'ata',label:'American Thyroid Association — Guidelines (incl. 2025)',year:2025,url:'https://www.thyroid.org/professionals/ata-professional-guidelines/'}
  ],
  reumato:[
    {id:'acr',label:'ACR — Clinical Practice Guidelines (biblioteca)',year:2025,url:'https://rheumatology.org/clinical-practice-guidelines'},
    {id:'eular',label:'EULAR — Recommendations Management (biblioteca)',year:2026,url:'https://www.eular.org/recommendations-management'}
  ],
  hemo:[
    {id:'nci',label:'NCI — PDQ Cancer Information (atualização contínua)',year:2026,url:'https://www.cancer.gov/publications/pdq'},
    {id:'eln',label:'European LeukemiaNet — Recommendations (biblioteca)',year:2025,url:'https://www.leukemia-net.org/leukemias/cml/recommendations/'}
  ],
  cardio:[
    {id:'esc',label:'ESC — Guidelines and Scientific Documents (biblioteca)',year:2026,url:'https://www.escardio.org/Guidelines'},
    {id:'aha',label:'AHA — Adult Advanced Life Support',year:2025,url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support/'}
  ],
  gastro:[
    {id:'acg',label:'American College of Gastroenterology — Guidelines (2025)',year:2025,url:'https://gi.org/guidelines/'},
    {id:'nci',label:'NCI — PDQ Cancer Information',year:2026,url:'https://www.cancer.gov/publications/pdq'}
  ],
  neuro:[
    {id:'ean',label:'European Academy of Neurology — Clinical Guidelines',year:2026,url:'https://www.ean.org/research/clinical-guidelines'},
    {id:'nice',label:'NICE — Epilepsies (NG217)',year:2025,url:'https://www.nice.org.uk/guidance/ng217'}
  ],
  has:[
    {id:'kdigo',label:'KDIGO — Clinical Practice Guidelines',year:2024,url:'https://kdigo.org/guidelines/'},
    {id:'esc',label:'ESC — European Cardiology Guidelines',year:2026,url:'https://www.escardio.org/Guidelines'}
  ],
  pneumo:[
    {id:'aasm',label:'AASM — Clinical Practice Guidelines',year:2026,url:'https://aasm.org/clinical-resources/practice-standards/practice-guidelines/'},
    {id:'nice',label:'NICE — Obstructive sleep apnoea (NG202)',year:2021,url:'https://www.nice.org.uk/guidance/ng202'}
  ],
  infeccao:[
    {id:'nice',label:'NICE — Guidance by conditions (biblioteca)',year:2026,url:'https://www.nice.org.uk/guidance'},
    {id:'idsa',label:'IDSA — Practice Guidelines (biblioteca)',year:2026,url:'https://www.idsociety.org/practice-guideline/'}
  ],
  onco:[
    {id:'nci',label:'NCI — PDQ Oncology and Supportive Care',year:2026,url:'https://www.cancer.gov/publications/pdq'},
    {id:'esmo',label:'ESMO — Clinical Practice Guidelines (biblioteca)',year:2026,url:'https://www.esmo.org/guidelines'}
  ]
};
const PALETTE={
  endocrino:['#3d7a77','#daf3ed'],reumato:['#7865a2','#e9e3f4'],hemo:['#9a4e56','#f7e3e4'],
  cardio:['#ad563a','#fce6db'],gastro:['#477899','#e3eef7'],neuro:['#596d9d','#e7e9f5'],
  has:['#68844e','#edf3dc'],pneumo:['#548fa0','#e0f2f4'],infeccao:['#36806c','#e0f4ea'],onco:['#846a98','#efeaf5']
};
// Textos SVG em <tspan> de altura calculada: sem recorte fixo, foreignObject ou truncamento.
window.OSCE_DIAGRAM_LAYOUT=window.OSCE_DIAGRAM_LAYOUT||{};
function svgFor(s){
 const [fg,bg]=PALETTE[s.a]||PALETTE.neuro;
 const clean=x=>String(x||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
 const words=(text,limit)=>{
  const line=[],output=[];
  function push(){if(line.length){output.push(line.join(' '));line.length=0;}}
  for(const raw of String(text||'').trim().split(/\s+/).filter(Boolean)){
   // Evitar conteúdo que ultrapasse a largura por palavras muito longas.
   let chunks=[];for(let i=0;i<raw.length;i+=limit)chunks.push(raw.slice(i,i+limit));
   for(const part of chunks){
    const next=[...line,part].join(' ');
    if(next.length>limit)push();
    line.push(part);
   }
  }
  push();return output.length?output:['—'];
 };
 const sentence=value=>String(value||'').split(/[.;](?:\s|$)/)[0].trim();
 const titleLines=words(s.t,57);
 const pieces=[sentence(s.cl),sentence(s.dx),sentence(s.plan)];
 const textLines=pieces.map(x=>words(x,25));
 const titleEnd=44+(titleLines.length-1)*31;
 const subtitleY=titleEnd+24;
 const boxY=subtitleY+32;
 const maxLines=Math.max(...textLines.map(x=>x.length));
 const boxH=Math.max(146,75+maxLines*24);
 const footY=boxY+boxH+37;
 const height=footY+38;
 const tspans=(lines,x,y,dy)=>lines.map((line,i)=>'<tspan x="'+x+'" y="'+(y+i*dy)+'">'+clean(line)+'</tspan>').join('');
 const labels=['SINAIS','CONFIRMAÇÃO','PLANO'];
 const xml='<svg xmlns="http://www.w3.org/2000/svg" width="860" height="'+height+'" viewBox="0 0 860 '+height+'" role="img" aria-label="Esquema didático de '+clean(s.t)+'">'
 +'<rect width="860" height="'+height+'" rx="20" fill="'+bg+'"/>'
 +'<rect x="20" y="20" width="820" height="'+(height-40)+'" rx="16" fill="white" opacity=".94"/>'
 +'<text fill="'+fg+'" font-family="Arial,sans-serif" font-size="25" font-weight="700">'+tspans(titleLines,46,44,31)+'</text>'
 +'<text x="46" y="'+subtitleY+'" fill="#546775" font-size="13" font-family="Arial,sans-serif">ESQUEMA DE RACIOCÍNIO · NÃO É EXAME / IMAGEM ORIGINAL</text>'
 +labels.map((label,i)=>{
   const x=45+i*268;
   return '<rect x="'+x+'" y="'+boxY+'" width="241" height="'+boxH+'" rx="12" fill="'+(i%2?bg:'#f5f8fa')+'" stroke="'+fg+'" stroke-opacity=".35"/>'
    +'<text x="'+(x+16)+'" y="'+(boxY+32)+'" fill="'+fg+'" font-size="15" font-weight="700" font-family="Arial,sans-serif">'+label+'</text>'
    +'<text font-size="16" font-family="Arial,sans-serif" fill="#253a45">'+tspans(textLines[i],x+16,boxY+63,24)+'</text>';
  }).join('')
 +'<text x="46" y="'+footY+'" fill="#62727c" font-size="14" font-family="Arial,sans-serif">Fluxo didático original do Master. Confirme as decisões no texto e nas fontes.</text>'
 +'</svg>';
 // O marcador aponta para o canto da caixa, sem encobrir o enunciado.
 window.OSCE_DIAGRAM_LAYOUT[String(s.n)]={markerY:Math.round((boxY+34)/height*1000)/10,height,lines:textLines.map(a=>a.length)};
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(xml);
}
function question(id,competence,prompt,answer,checks,hint,memory){
 const criteria=checks.filter(Boolean).map(x=>String(x).trim());
 while(criteria.length<3)criteria.push('Relaciona a decisão ao contexto clínico');
 return {id,competence,prompt,answer,criteria,hints:[
  'Comece pelas pistas do caso: '+squeeze(hint,85),
  'Identifique o achado que confirma a hipótese e o que excluiria.',
  'Conecte síndrome, exame e decisão: '+squeeze(memory,115)
 ],memory,origin:'master'};
}
function squeeze(s,n){return String(s||'').slice(0,n)}
function make(s){
 const refs=s.sources||GUIDE[s.a]||GUIDE.neuro;
 const cl=s.cl||'achados principais', dx=s.dx||'investigação dirigida', pl=s.plan||'tratamento individualizado';
 const risk=s.risk||'reavaliar risco e complicações', differ=s.diff||'comparar com outras causas da síndrome';
 const p=s.p||'media';
 const questions=[
  question('sindrome',s.syndrome?'Diagnóstico sindrômico e etiológico':'Hipótese diagnóstica',s.syndrome?'Qual é a síndrome clínica predominante? Qual doença é a hipótese etiológica mais provável? Justifique com duas pistas.':'Qual a hipótese diagnóstica mais provável? Justifique com duas pistas do caso.',
  s.syndrome?('Diagnóstico SINDRÔMICO: '+s.syndrome+'. Hipótese ETIOLÓGICA: '+s.t+'. As pistas do caso são '+cl+'. A síndrome descreve o padrão de manifestação; a etiologia nomeia a doença que pode causá-lo. Confirme a hipótese com investigação apropriada.') :('A principal hipótese diagnóstica é '+s.t+'. O conjunto de achados que sustenta essa hipótese é '+cl+'. A investigação pertinente deve confirmar a doença, sem inferir sua presença por um único sinal.'),
  s.syndrome?['Nomeia a síndrome clínica: '+s.syndrome,'Identifica a hipótese etiológica: '+s.t,'Relaciona duas pistas do caso','Distingue síndrome de etiologia']:['Identifica a hipótese: '+s.t,'Cita ao menos duas pistas do caso','Justifica o raciocínio diferencial','Evita concluir por achado isolado'],cl,s.mem),
  question('anamnese','Anamnese dirigida','Que perguntas você faria para confirmar sua hipótese e identificar gravidade?',
  'Cronologia e evolução dos sintomas, fatores de risco e tratamentos atuais. Neste caso, investigar especificamente: '+(s.hx||cl)+'. Perguntar também impacto funcional, medicamentos, comorbidades, sinais de alarme e antecedentes familiares quando pertinentes.',
  ['Cronologia e evolução','Perguntas específicas: '+squeeze(s.hx||cl,90),'Riscos, medicações e comorbidades'],s.hx||cl,s.mem),
  question('exame','Exame físico dirigido','Como faria o exame físico e quais achados modificam a decisão?',
  'Comece por sinais vitais e estabilidade. Exame dirigido: '+(s.pe||cl)+'. A busca de '+risk+' modifica urgência, exames e encaminhamento. Reconhecer limitações de um exame físico isolado.',
  ['Avalia estabilidade e sinais vitais','Realiza exame direcionado','Reconhece sinais de alerta'],s.pe||cl,s.mem),
  question('mecanismo','Fisiopatologia clínica','Explique o mecanismo que conecta os sintomas aos exames e ao diagnóstico.',
  s.path||('A alteração subjacente de '+s.t+' produz '+cl+'. A fisiopatologia é útil quando explica manifestações, escolha de exames e resposta ao tratamento.'),
  ['Explica mecanismo principal','Relaciona achados clínicos ao mecanismo','Identifica órgão ou sistema afetado'],s.path||cl,s.mem),
  question('investigacao','Exames e confirmação','Qual investigação solicitaria, em que sequência e com que interpretação?',
  dx+'. Explique qual exame faz triagem, qual confirma e qual avalia extensão/gravidade. Evite pedir exames indiferenciados ou interpretar achados fora do contexto.',
  ['Escolhe exames específicos','Justifica a sequência','Interpreta resultado e limitações','Estratifica gravidade'],dx,s.mem),
  question('diferenciais','Diagnósticos diferenciais','Cite diagnósticos diferenciais e um dado discriminador de cada.',
  differ+'. Compare evolução, exame, exames complementares e sinais que tornam uma alternativa mais provável. Não use resultado isolado para excluir hipótese grave.',
  ['Lista diferencial relevante','Dá um discriminador objetivo','Evita confundir síndromes semelhantes'],differ,s.mem),
  question('conduta','Tratamento e conduta','Organize a conduta inicial e o tratamento específico. O que deve ser evitado?',
  pl+'. Primeiro reconhecer instabilidade e necessidades imediatas; depois escolher intervenção conforme estágio, comorbidades, contraindicações e protocolo. Evitar conduta automática sem confirmação ou gravidade.',
  ['Define conduta inicial','Indica tratamento adequado ao caso','Considera contraindicações/individualização','Prevê acompanhamento'],pl,s.mem),
  question('gravidade','Urgências e complicações','Que sinais exigem internação, avaliação urgente ou mudança imediata no plano?',
  risk+'. Nessas situações, priorizar estabilização e encaminhamento apropriado, com reavaliação seriada. Identificar complicações sem presumir que todas estejam presentes.',
  ['Reconhece alerta específico','Descreve encaminhamento ou intervenção','Planeja reavaliação'],risk,s.mem),
  question('orientacoes','Comunicação e prognóstico','Explique em até 40 segundos ao paciente o diagnóstico provável, a investigação e os sinais de retorno.',
  'Explique que a hipótese é '+s.t+' com base em '+cl+'. Diga que a investigação será '+dx+'. Oriente que o tratamento e o seguimento serão individualizados: '+pl+'. Procurar urgência diante de '+risk+'. Confirmar compreensão e evitar promessas de cura.',
  ['Explica hipótese em linguagem simples','Resume exames e plano','Informa sinais de alerta','Checa compreensão'],pl,s.mem)
 ];
 // Cada pergunta recebe uma âncora de memória e três pistas específicas de sua competência.
 // Não reutilizamos o mesmo mnemônico da estação em todas as etapas.
 const clip=(v,n=170)=>String(v||'').replace(/\s+/g,' ').trim().slice(0,n);
 const cues={
  sindrome:{memory:'PADRÃO → HIPÓTESE: '+clip(s.syndrome?('síndrome '+s.syndrome+'; doença suspeita '+s.t):cl,110),
   hints:['Identifique o conjunto dominante de sinais e sintomas, não apenas um detalhe.','Quais achados discriminam essa hipótese de um diagnóstico alternativo?','Se houver síndrome e etiologia, diga cada uma separadamente antes da justificativa.']},
  anamnese:{memory:'3 PERGUNTAS: início → fator de risco → alerta. Pista deste caso: '+clip(cl,86),
   hints:['Pergunte início, cronologia e evolução antes de perguntar por exames.','Busque fatores de risco, exposições e antecedentes diretamente relacionados ao problema.','Priorize perguntas que mudariam sua hipótese ou a segurança da conduta.']},
  exame:{memory:'3 PASSOS: estabilidade → exame do órgão-alvo → sinal de gravidade. Pista: '+clip(cl,80),
   hints:['Comece por estabilidade, sinais vitais e perfusão.','Que estrutura ou sistema precisa ser examinado para sustentar a hipótese?','Diga que achado de gravidade mudaria sua próxima decisão.']},
  mecanismo:{memory:'3 ELOS: origem da lesão → disfunção → sintoma. Reconstrua a cadeia a partir de '+clip(cl,84),
   hints:['Pense no tecido ou órgão inicialmente afetado.','Ligue a alteração funcional aos dois sintomas dominantes.','Complete a sequência lesão → alteração fisiológica → manifestação clínica.']},
  investigacao:{memory:'TRIAGEM ≠ CONFIRMAÇÃO ≠ GRAVIDADE. Que exame transforma esta pista em evidência? '+clip(cl,75),
   hints:['Separe exames de triagem, confirmação e gravidade.','Qual teste responde à principal dúvida clínica deste caso?','Interprete o possível resultado e cite ao menos uma limitação do teste.']},
  diferenciais:{memory:'CONTRASTE: uma pista A FAVOR e uma CONTRA cada hipótese. Compare '+clip(differ,83),
   hints:['Escolha o diagnóstico alternativo que mais se parece com a apresentação.','Qual achado da história ou do exame diferencia as hipóteses?','Use uma pista discriminadora para cada diferencial, sem listar nomes soltos.']},
  conduta:{memory:'3T: TRIAR urgência → TRATAR mecanismo → TESTAR resposta. Observe o risco: '+clip(risk,80),
   hints:['Avalie primeiro se há instabilidade ou intervenção imediata.','Que tratamento responde ao mecanismo principal da doença?','Cite a contraindicação ou erro terapêutico que mais mudaria a segurança.']},
  gravidade:{memory:'SEMÁFORO VERMELHO: que achado muda a urgência? No caso, considere '+clip(risk,84),
   hints:['Que sinal vital ou alteração de consciência muda o nível de urgência?','Pense nas complicações tempo-dependentes deste quadro.','Defina o que exige reavaliação imediata, internação ou encaminhamento.']},
  orientacoes:{memory:'3 FRASES AO PACIENTE: hipótese → plano → quando retornar. Use a pista '+clip(cl,78),
   hints:['Use palavras comuns para a hipótese e explique a incerteza diagnóstica.','Descreva o próximo exame ou tratamento sem prometer resultado.','Peça que o paciente repita o plano e diga quando deve procurar urgência.']}
 };
 questions.forEach(q=>{if(cues[q.id]){q.memory=cues[q.id].memory;q.hints=cues[q.id].hints;}});
 const deeper=[
  {title:'1. Reconhecer o padrão do caso',body:'Padrão-chave: '+cl+'. Compare cronologia, sinais dirigidos e fatores de risco. Diferencie manifestação sindrômica e hipótese etiológica quando forem conceitos distintos.',tip:s.mem||'Pista → síndrome → hipótese.'},
  {title:'2. Anamnese e exame que realmente discriminam',body:'Perguntas: '+(s.hx||cl)+'. No exame: '+(s.pe||cl)+'. Evite listas sem finalidade clínica; diga como cada achado altera a hipótese.',tip:'Perguntar → examinar → interpretar.'},
  {title:'3. Mecanismo e diferencial',body:(s.path||'Descreva a fisiopatologia da síndrome.')+' Diferenciais: '+differ+'. Explique em voz alta qual dado favorece cada hipótese.',tip:'Mecanismo explica sinal; contraste evita confusão.'},
  {title:'4. Sequência de investigação',body:dx+'. Identifique teste inicial, teste confirmatório quando pertinente e o que não se pode concluir de exame normal ou inespecífico.',tip:'Triagem ≠ confirmação ≠ estadiamento.'},
  {title:'5. Tratamento, urgência e retorno',body:pl+'. ALERTA: '+risk+'. Organize medidas imediatas, terapia específica, seguimento, complicações e comunicação com paciente.',tip:s.mem||'Segurança primeiro.'}
 ];
 const keywords=[s.t,s.key||String(dx).split(/[.,;]/)[0].slice(0,42)].filter(x=>x&&x.length>=5);
 const terms=keywords.map((name,i)=>({key:'termo'+i,name,definition:i===0?('Reconhecer '+s.t+': '+cl+'.'):('Investigação: '+dx+'.'),source:refs[0].id}));
 return {
  id:'osce-'+s.n,number:s.n,title:s.t,subtitle:s.sub||squeeze(cl,100),area:s.label||({
   endocrino:'Endocrinologia',reumato:'Reumatologia',hemo:'Hematologia',cardio:'Cardiologia e ECG',gastro:'Gastroenterologia',
   neuro:'Neurologia',has:'HAS/Nefrologia',pneumo:'Pneumologia',infeccao:'Infectologia',onco:'Emergências oncológicas'
  }[s.a]||'Clínica Médica'),priority:p,status:'revisao-autoral',
  provenance:'Caso e nove perguntas originais de estudo criados pelo Master a partir do tema curricular. Não reproduz enunciados nem imagens originais de terceiros.',
  revision:'Versão de estudo 21/11/2026. Condutas resumidas: verificar documentos específicos e protocolo local antes de aplicação clínica.',
  caseText:s.case,
  images:[{src:svgFor(s),kind:'illustration',alt:'Esquema autoral de raciocínio sobre '+s.t+'; não é exame clínico.',caption:'Ilustração educacional original baseada no tema; NÃO é foto, ECG ou imagem diagnóstica do caso.'}],
  essential:{oneMinute:(s.syndrome?'Síndrome clínica: '+s.syndrome+'. Hipótese etiológica: ':'')+s.t+': '+cl+'. Investigação: '+dx+'. Tratamento: '+pl+'. Atenção: '+risk+'. Diferencial importante: '+differ+'. Armadilha: não fechar diagnóstico por achado isolado nem atrasar avaliação de gravidade. Pergunta ativa: qual dado do caso mais muda sua conduta?',mnemonic:s.mem||'Pistas → exames → conduta → risco.'},
  tiers:{
   essencial:{label:'Essencial',minutes:1,ids:['sindrome'],description:'Hipótese, pistas-chave e recuperação ativa.'},
   rapida:{label:'Revisão rápida',minutes:5,ids:['sindrome','investigacao','conduta','gravidade'],description:'Quatro decisões centrais.'},
   completa:{label:'Completo',minutes:25,ids:questions.map(x=>x.id),description:'Nove itens: anamnese, exame, fisiopatologia, diagnóstico, tratamento e comunicação.'}
  },
  deeper,sources:refs,terms,lesson:s.lesson||null,questions
 };
}
window.OSCECatalogBuilder={make,GUIDE};
})();
