/* MASTER v7 — prioridade pedagógica recalibrada a partir da análise Notion da P2.
   NÃO representa frequência de questões ou previsão de prova. */
(()=>{
 const ranks=[
  ['neuro1',38,5,4,'Sinais de risco em perda de consciência; ECG, diferencial epilepsia e ação imediata.'],
  ['neuro2',36,5,4,'Gravidade ventilatória e autonômica, LCR precoce e decisão terapêutica.'],
  ['neuro3',34,5,5,'SNC versus junção neuromuscular; pseudossurto e crise miastênica.'],
  ['reuma2',32,5,5,'Órgão-alvo, imunologia contextualizada, trombose e síndrome pulmão-rim.'],
  ['onco',30,5,5,'Primeira ação e sequência temporal diante de emergência oncológica.'],
  ['hema',28,4,5,'Hemograma, esfregaço, diagnóstico confirmatório e urgências hematológicas.'],
  ['gastro',28,4,4,'Diferenciais, limitações de exames, rastreio e sinais de alarme.'],
  ['reuma1',26,4,5,'Fenótipo, autoanticorpo, complicações e prioridade de órgão ameaçado.']
 ];
 const old=Object.fromEntries(window.MASTER_DEEP.ranking.map(x=>[x.id,x]));
 window.MASTER_DEEP.ranking=ranks.map(([id,cards,priority,difficulty,reason],i)=>({
  ...old[id],id,order:i+1,score:100-i*6,cards,priority,difficulty,reason,
  label:i<4?'Prioridade crítica':i<6?'Muito alta':'Alta'
 }));
 const deck=window.MASTER_EXTRA_CARDS;
 // Mantenha identificadores e número total estáveis tanto quanto possível.
 for (const [tid,remove] of [['reuma2',4],['onco',2],['reuma1',2]]) deck[tid]=deck[tid].slice(0,-remove);
 const newCards={
  neuro2:[
   ['O LCR normal nos primeiros dias afasta SGB?','Não. A dissociação albuminocitológica pode estar ausente no início; a suspeita é clínica, com monitorização seriada.'],
   ['Por que oximetria normal pode enganar na SGB grave?','Ela pode permanecer normal inicialmente apesar da fraqueza ventilatória; avaliar capacidade vital, força inspiratória e sinais bulbares conforme protocolo.']
  ],
  neuro3:[
   ['O que distingue pseudossurto de surto de esclerose múltipla?','Piora de déficits prévios por febre/infecção sem nova atividade inflamatória sugere pseudossurto; investigar desencadeante.'],
   ['Na crise miastênica, qual prioridade vem antes do anticorpo?','Proteção de via aérea, avaliação ventilatória e suporte intensivo, além de tratar precipitante e considerar terapia rápida.'],
   ['Como localizar a diferença entre EM e MG?','EM afeta SNC e pode causar sinais focais sensitivos/motores; MG afeta junção neuromuscular e provoca fatigabilidade, sem perda sensitiva típica.'],
   ['Qual detalhe medicamentoso muda o manejo na miastenia?','Identificar fármacos que possam agravar a transmissão neuromuscular e reavaliar sua necessidade com atenção aos sintomas bulbares.']
  ],
  gastro:[
   ['IgA total reduzida e tTG-IgA negativa descartam doença celíaca?','Não. Deficiência de IgA pode causar falso-negativo; considerar testes baseados em IgG e investigação dirigida.'],
   ['Sangue nas fezes com anemia ferropriva e perda de peso é caso de rastreio?','Não apenas rastreio: são sinais de alarme, exigindo investigação diagnóstica adequada, geralmente colonoscopia com biópsia.']
  ]
 };
 for(const [tid,list] of Object.entries(newCards)) deck[tid].push(...list.map(([question,answer])=>({question,answer})));
})();
