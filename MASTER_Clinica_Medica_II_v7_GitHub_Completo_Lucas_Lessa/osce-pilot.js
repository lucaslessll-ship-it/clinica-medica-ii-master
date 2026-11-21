/* OSCE Master: duas estações completas, conteúdos autorais e revisão por critérios. */
window.OSCEPilot=(()=>{
 'use strict';
 const BANK=[window.OSCE_PILOT_DATA,window.OSCE_FA_DATA,...(Array.isArray(window.OSCE_EXTRA_STATIONS)?window.OSCE_EXTRA_STATIONS:[])].filter(st=>st&&Number.isInteger(st.number)&&Array.isArray(st.questions));
 const MAP=new Map(BANK.map(s=>[s.number,s]));
 const KEY='master_osce_pilot_v1';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const now=()=>new Date().toISOString();
 const shift=(n)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+n);return d.toISOString()};
 const empty=()=>({version:3,settings:{examDate:'2026-11-24',minutes:15},items:{},runs:[],current:null,covered:{},learned:{},learning:{station:61,tier:'completa'},updatedAt:null});
 function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.items&&s.settings)return {...empty(),...s,covered:s.covered||{},learned:s.learned||{},learning:s.learning||empty().learning}}catch{}return empty();}
 let state=load(),screen='home',shown=false,confidence=0,hints=0,checked=[],reviewStation=61,glossary='';
 const bank=()=>BANK;
 function study(){return MAP.get(state.current?.station)||MAP.get(61)}
 function data(s){return MAP.get(Number(s))||MAP.get(61)}
 function qkey(st,q){return st.number+':'+q.id}
 function entry(st,q){const k=qkey(st,q);return state.items[k]||(state.items[k]={draft:'',attempts:[]})}
 function last(st,q){const a=entry(st,q).attempts||[];return a[a.length-1]||null}
 function due(st,q){const r=last(st,q);return !!r?.due&&new Date(r.due).getTime()<=Date.now();}
 function weakItems(){return BANK.flatMap(st=>st.questions.filter(q=>{const a=last(st,q);return a&&a.score<80}).map(q=>({st,q,a:last(st,q)})))}
 function dueItems(){return BANK.flatMap(st=>st.questions.filter(q=>due(st,q)).map(q=>({st,q,a:last(st,q)}))).sort((a,b)=>new Date(a.a.due)-new Date(b.a.due))}
 function attempted(st){return st.questions.filter(q=>!!last(st,q)).length}
 function formatDate(s){return s?new Date(s).toLocaleDateString('pt-BR'):'—'}
 function save(){state.updatedAt=now();try{localStorage.setItem(KEY,JSON.stringify(state))}catch{notify('Seu navegador não pôde salvar o progresso.');}}
 function renderAgain(){if(typeof ui!=='undefined'&&ui.route==='osce'&&typeof render==='function')render();}
 function notify(s){if(typeof toast==='function')toast(s)}
 function diffDays(){const d=new Date(state.settings.examDate+'T12:00:00'),nowday=new Date();nowday.setHours(12,0,0,0);return Number.isNaN(d.valueOf())?null:Math.ceil((d-nowday)/86400000)}
 function recommended(st){
   const mins=Number(state.settings.minutes)||15,days=diffDays();
   if(dueItems().some(x=>x.st.number===st.number))return {tier:'rapida',reason:'Há itens vencidos: consolidação primeiro.'};
   if(days!==null&&days<=2||mins<=5)return {tier:'essencial',reason:'Tempo curto: começar pelo essencial.'};
   if(mins>=25&&state.covered[st.number]?.rapida)return {tier:'completa',reason:'Você já fez a revisão rápida e tem tempo para aprofundar.'};
   return {tier:'rapida',reason:'Quatro decisões centrais sem sobrecarga.'};
 }
 function sectionTitle(t){return '<header class="page-header osce-head"><p class="eyebrow">CLÍNICA MÉDICA II · AVALIAÇÃO PRÁTICO-ORAL</p><h1>'+t+'</h1></header>';}
 function selector(st){
  const p=recommended(st),completed=attempted(st),covered=state.covered[st.number]||{};
  return '<article class="osce-case osce-theme-card"><div class="osce-stepbar"><span>ESTAÇÃO '+st.number+' · PRIORIDADE ALTA</span><strong>'+completed+'/'+st.questions.length+' questões</strong></div>'
   +'<h2>'+esc(st.title)+'</h2><p>'+esc(st.subtitle)+'</p>'
   +(st.images?.length?'<p class="osce-note">✓ ECG original do material recebido</p>':'<p class="osce-note">Ilustração didática identificada como tal; ECG original ausente.</p>')
   +'<p class="osce-note">'+esc(p.reason)+'</p>'
   +'<div class="osce-two-paths"><button type="button" class="osce-path-btn osce-path-study" onclick="OSCEPilot.learn(\'completa\','+st.number+')"><span class="osce-path-icon" aria-hidden="true">📖</span><strong>Estudar primeiro</strong><small>Respostas, explicações e condutas abertas. Sem nota.</small></button>'
   +'<button type="button" class="osce-path-btn" onclick="OSCEPilot.start(\''+p.tier+'\',null,'+st.number+')"><span class="osce-path-icon" aria-hidden="true">🩺</span><strong>Simular agora</strong><small>Arguição sem gabarito; feedback após responder.</small></button></div>'
   +'<div class="osce-actions"><button class="btn" onclick="OSCEPilot.learn(\'essencial\','+st.number+')">Estudo essencial · 1 min</button><button class="btn" onclick="OSCEPilot.learn(\'rapida\','+st.number+')">Estudo rápido · 5 min</button><button class="btn" onclick="OSCEPilot.learn(\'completa\','+st.number+')">Estudo completo</button></div>'
   +'<p class="osce-note">Estudo: '+(state.learned?.[st.number]?.length||0)+'/'+st.questions.length+' pontos marcados como vistos. A leitura não altera o histórico do simulador.</p>'
   +'<div class="osce-depth-grid">'+Object.entries(st.tiers).map(([tier,t])=>'<button class="osce-depth-btn '+(p.tier===tier?'suggested':'')+'" onclick="OSCEPilot.start(\''+tier+'\',null,'+st.number+')"><strong>'+esc(t.label)+'</strong><span>≈'+t.minutes+' min · '+t.ids.length+' pergunta(s)</span><small>'+esc(t.description)+'</small>'+(covered[tier]?'<em>✓ já percorrida</em>':'')+'</button>').join('')+'</div></article>';
 }
 function homePage(){
  const total=BANK.reduce((n,st)=>n+attempted(st),0),dueCount=dueItems().length,weakCount=weakItems().length,shallow=BANK.filter(st=>Object.values(state.covered[st.number]||{}).some(Boolean)).length,deep=BANK.filter(st=>state.covered[st.number]?.completa).length;
  const d=diffDays(),selection=dueCount?dueItems()[0].st:BANK.find(st=>attempted(st)===0)||BANK[0];
  return sectionTitle('OSCE <em>Clínica Médica.</em>')+'<p>Escolha o caminho: estude com respostas e aprofundamentos ou simule a arguição sem gabarito. O progresso de leitura não interfere na nota.</p>'
   +'<section class="osce-pilot-hero"><div><p class="eyebrow">SESSÃO DE HOJE · COMEÇO SEM ATRITO</p><h2>Uma pergunta já é progresso.</h2><p>'+esc(d===null?'Data não definida.':d<0?'A data registrada passou; ajuste abaixo.':d===0?'Avaliação hoje.':d+' dia(s) até a avaliação.')+' Comece pelo erro vencido ou pela próxima estação prioritária.</p><div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.learn(\'completa\',52)">📖 Estudar primeiro</button><button class="btn" onclick="OSCEPilot.daily()">🩺 Simular sessão de hoje</button>'+(state.current?'<button class="btn" onclick="OSCEPilot.resume()">Retomar onde parei</button>':'')+'</div></div><div class="osce-pilot-emblem" aria-hidden="true">'+BANK.length+'<span>estações</span></div></section>'
   +'<div class="osce-stats"><div><b>'+total+'</b><span>perguntas testadas</span></div><div><b>'+dueCount+'</b><span>revisões vencidas</span></div><div><b>'+weakCount+'</b><span>lacunas registradas</span></div><div><b>'+deep+'/74</b><span>estações completas</span></div></div>'
   +'<section class="osce-case"><h2>Triagem e cobertura</h2><div class="osce-settings"><label>Data da APO<input type="date" value="'+esc(state.settings.examDate)+'" onchange="OSCEPilot.setDate(this.value)"></label><label>Tempo disponível<select onchange="OSCEPilot.setMinutes(this.value)">'+[5,15,30,45].map(m=>'<option value="'+m+'"'+(Number(state.settings.minutes)===m?' selected':'')+'>'+m+' min</option>').join('')+'</select></label></div><p class="osce-note">Amplitude: '+shallow+'/74 · Profundidade: '+deep+'/74. Há '+BANK.length+' estações disponíveis neste projeto; as demais dependem de validação e publicação.</p><div class="osce-track"><span style="width:'+(100*shallow/74)+'%"></span></div><div class="osce-track osce-track-secondary"><span style="width:'+(100*deep/74)+'%"></span></div></section>'
   +'<h2>Estações disponíveis</h2>'+BANK.map(selector).join('')
   +'<div class="osce-actions"><button class="btn" onclick="OSCEPilot.showReview()">↻ Revisão por erros</button><button class="btn" onclick="OSCEPilot.showPrompt()">Gerar script de revisão → Copiar para IA</button></div>'
   +'<p class="osce-note">Estações com perguntas e respostas autorais do Master; não se trata de conteúdo oficial da banca. A autoavaliação é manual. O ECG da estação 52 é derivado do arquivo real i-031.jpg enviado para este projeto.</p>';
 }
 function toolBar(st){
  const src=st.sources?.[0],direct=src?.url?'<a class="btn" target="_blank" rel="noopener noreferrer" href="'+esc(src.url)+'">↗ Diretriz '+esc(src.year)+'</a>':'';
  return '<div class="osce-top-links"><button class="btn" onclick="OSCEPilot.openLesson('+st.number+')">↗ Aula relacionada</button>'
   +'<button class="btn" onclick="OSCEPilot.showSources()">📚 Referências e diretrizes</button>'
   +direct
   +'<button class="btn" onclick="OSCEPilot.showTerms()">🔎 Conceitos com referências</button>'
   +(st.number===52?((shown||screen==='learn')?'<button class="btn" onclick="OSCEPilot.showAnnotated()">ECG comentado</button>':'<button class="btn" disabled title="Disponível após você tentar responder">ECG comentado · após responder</button>'):'')
   +'<button class="btn" onclick="OSCEPilot.learn(\'completa\','+st.number+')">📖 Estudo completo com respostas</button></div>';
 }
 function illustration(){
  return '<figure class="osce-illustration"><img src="assets/osce/ilustracao-sincope-estacao61.png" alt="Ilustração criada para o Master: idoso com perda de consciência durante esforço, hipótese de estreitamento da valva aórtica e redução da perfusão cerebral; não é o paciente original." loading="lazy" onclick="OSCEPilot.expandImage(this)"><figcaption><strong>ILUSTRAÇÃO DIDÁTICA — NÃO É IMAGEM DO CASO ORIGINAL.</strong> Esquema autoral baseado no cenário clínico descrito; estreitamento valvar é hipótese a investigar, não diagnóstico confirmado.</figcaption></figure>';
 }
 function media(st){
  if(st.number===61&&!st.images?.length)return illustration();
  if(!st.images?.length)return '<p class="osce-note">Imagem original indisponível para esta estação; estude o caso sem inferir exames não fornecidos.</p>';
  return st.images.map(img=>'<figure class="osce-visual"><img src="'+esc(img.src)+'" loading="lazy" alt="'+esc(img.alt||'Imagem da estação')+'" onclick="OSCEPilot.expandImage(this)" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><p hidden>Imagem indisponível. Confira o arquivo associado à estação.</p><figcaption><strong>'+(img.kind==='illustration'?'ILUSTRAÇÃO EDUCACIONAL — NÃO É IMAGEM ORIGINAL':'IMAGEM ORIGINAL DO MATERIAL ENVIADO')+'</strong> · '+esc(img.caption||'Imagem do caso. Toque para ampliar.')+'</figcaption></figure>').join('');
 }
 function annotatedMedia(st,studyMode=false){
  if(st.number!==52||!st.images?.[0])return '';
  const src=esc(st.images[0].src);
  return '<details class="osce-deep osce-annotated-card" id="osce-ecg-commented"><summary>'+(studyMode?'ECG comentado para estudar':'ECG comentado após a tentativa')+' <span>imagem original + marcações didáticas</span></summary><div>'
   +'<p class="osce-note"><strong>ANOTAÇÕES DIDÁTICAS SOBRE A IMAGEM RECEBIDA.</strong> As marcações são autorais, não constavam do arquivo i-031.jpg e não devem ser confundidas com laudo de ECG de 12 derivações.</p>'
   +'<div class="osce-ecg-annotated"><img src="'+src+'" alt="Mesmo recorte de ECG da estação 52 com marcações de alguns picos R para comparação dos intervalos RR." loading="lazy">'
   +'<svg class="osce-ecg-overlay" viewBox="0 0 678 554" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><g fill="none" stroke="#006f64" stroke-width="3.6" stroke-linecap="round">'
   +'<circle cx="79" cy="61" r="13"/><circle cx="182" cy="60" r="13"/><circle cx="248" cy="72" r="13"/><circle cx="350" cy="66" r="13"/>'
   +'<path d="M79 143V158M182 143V158M79 151H182M182 143V158M248 143V158M182 151H248"/>'
   +'</g><rect x="74" y="171" width="250" height="35" rx="8" fill="#fff" opacity=".94"/><text x="199" y="194" text-anchor="middle" font-size="19" font-weight="700" fill="#075b52">RR desiguais</text></svg></div>'
   +'<ol class="osce-ecg-notes"><li><strong>Ritmo:</strong> intervalos entre complexos R sucessivos variam sem padrão regular.</li><li><strong>Atividade atrial:</strong> ondas P sinusais consistentes não são identificáveis no fragmento.</li><li><strong>Complexos diferentes:</strong> algumas morfologias são distintas; não determine automaticamente a origem dos batimentos a partir deste recorte.</li><li><strong>Limite:</strong> a foto não é um ECG completo de 12 derivações; não é possível concluir eixo, topografia ou outros diagnósticos que dependam do exame completo.</li></ol>'
   +'<div class="osce-actions"><button type="button" class="btn" onclick="OSCEPilot.expandImage(this.closest(\'.osce-annotated-card\').querySelector(\'.osce-ecg-annotated img\'))">Ampliar ECG original</button><button type="button" class="btn" onclick="OSCEPilot.showTerms()">Ver conceitos com fontes</button></div>'
   +'<p class="osce-note">Interpretação educacional compatível com o enunciado de fibrilação atrial, a ser correlacionada com paciente e ECG completo.</p></div></details>';
 }
 
 function sourcePanel(st){
  const sourceItems=(st.sources||[]).map(s=>'<li><a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.label||s.title)+'</a> ('+esc(s.year)+')</li>').join('');
  return '<details id="osce-sources" class="osce-deep"><summary>Referências clínicas oficiais e links <span>abrir fontes</span></summary><div><ul>'+sourceItems+'</ul><p class="osce-note">Diretrizes fundamentam os pontos gerais; respostas e critérios são material didático autoral do Master, não gabarito institucional.</p></div></details>';
 }
 function lessonBar(st){
  if(!st.lesson?.id)return '<details id="osce-lesson" class="osce-deep"><summary>Estudar o assunto completo <span>sem aula interna confirmada</span></summary><div><p>Não há aula específica confirmada nesta biblioteca. Consulte as diretrizes oficiais desta estação.</p><button type="button" class="btn" onclick="OSCEPilot.showSources()">Abrir diretrizes</button></div></details>';
  return '<details id="osce-lesson" class="osce-deep"><summary>Aula relacionada na biblioteca Master <span>abrir tema</span></summary><div><p>'+esc(st.lesson.label||st.title)+'</p><div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.openLesson('+st.number+')">Ir para a aula relacionada</button></div><p class="osce-note">Conteúdo interno complementar. Para recomendações atuais, consulte as diretrizes da estação.</p></div></details>';
 }
 function termPanel(st){
  const a=st.terms||[
    {key:'sincope',name:'Síncope',definition:'Perda transitória da consciência por hipoperfusão cerebral global, com início e recuperação rápidos.',source:'esc2018'},
    {key:'ecg',name:'ECG de 12 derivações',definition:'Exame inicial recomendado na avaliação de síncope para pesquisar arritmias e sinais cardiológicos de risco.',source:'esc2018'},
    {key:'eco',name:'Ecocardiograma',definition:'Avalia cardiopatia estrutural e valvopatia quando história e exame sugerem doença do coração.',source:'esc2018'},
    {key:'eeg',name:'EEG',definition:'Não é exame de rotina para síncope típica; indicado quando investigação sugere crise epiléptica.',source:'esc2018'}
  ];
  return '<details id="osce-terms" class="osce-deep"><summary>Termos marcados e referências <span>toque nos conceitos</span></summary><div><p class="osce-note">Clique em qualquer termo para ver definição breve e fonte.</p><div class="osce-term-list">'+a.map(t=>'<button class="osce-term" type="button" onclick="OSCEPilot.term(\''+t.key+'\')">'+esc(t.name)+' <sup>↗</sup></button>').join('')+'</div><div id="osce-glossary-content" role="status" aria-live="polite">'+(glossary?glossary:'<p class="osce-note">Selecione um termo acima.</p>')+'</div></div></details>';
 }
 function mark(st,text){
  let s=esc(text);
  const terms=(st.terms||[]).filter(t=>t.name.length>=5).sort((a,b)=>b.name.length-a.name.length);
  for(const t of terms.slice(0,8)){
   const term=esc(t.name),pos=s.toLocaleLowerCase('pt-BR').indexOf(term.toLocaleLowerCase('pt-BR'));
   if(pos>=0){
    const visible=s.slice(pos,pos+term.length);
    s=s.slice(0,pos)+'<button class="osce-term-inline" type="button" onclick="OSCEPilot.term(\''+t.key+'\')">'+visible+' <sup>ref</sup></button>'+s.slice(pos+term.length);
   }
  }
  return s;
 }
 function deepPanels(st,q){
  const blocks=(st.deeper||[]);
  return '<div class="osce-deep-stack"><details class="osce-deep"><summary>Explicação da questão <span>aprofundar</span></summary><div><p>'+mark(st,q.answer)+'</p></div></details>'
  +'<details class="osce-deep"><summary>Palácio da memória e armadilhas <span>memorizar</span></summary><div><p>'+esc(q.memory||st.essential.mnemonic)+'</p></div></details>'
  +blocks.map(x=>'<details class="osce-deep"><summary>'+esc(x.title)+' <span>aprofundar</span></summary><div><p>'+mark(st,x.body)+'</p><p><strong>Memorização:</strong> '+esc(x.tip)+'</p></div></details>').join('')+'</div>';
 }

 function learningStation(){return MAP.get(Number(state.learning?.station))||MAP.get(61);}
 function learnedCount(st,ids){const a=state.learned?.[st.number]||[];return ids.filter(id=>a.includes(id)).length;}
 function learn(tier='completa',number=61){
  const st=MAP.get(Number(number));if(!st||!st.tiers[tier])return;
  state.learning={station:st.number,tier};
  screen='learn';glossary='';save();renderAgain();
 }
 function jumpLearn(id){
  if(typeof document==='undefined')return;
  const el=document.getElementById('osce-learn-'+String(id).replace(/[^a-zA-Z0-9_-]/g,''));
  if(el){el.scrollIntoView({block:'start',behavior:'smooth'});el.querySelector('button.osce-study-mark')?.focus({preventScroll:true});}
 }
 function markLearn(number,id){
  const st=MAP.get(Number(number)),q=st?.questions.find(x=>x.id===id);if(!q)return;
  state.learned=state.learned||{};const prev=state.learned[st.number]||[];
  const wasMarked=prev.includes(id);
  state.learned[st.number]=wasMarked?prev.filter(x=>x!==id):[...prev,id];
  save();
  if(typeof document!=='undefined'){
   const b=document.getElementById('osce-learn-mark-'+st.number+'-'+id);
   if(b){b.setAttribute('aria-pressed',String(!wasMarked));b.textContent=wasMarked?'Marcar como estudado':'✓ Estudado';}
   const ids=(st.tiers[state.learning?.tier]?.ids||[]);
   const progress=document.getElementById('osce-learn-progress');
   if(progress)progress.textContent=learnedCount(st,ids)+'/'+ids.length+' pontos estudados';
  }
 }
 function learnPage(){
  const st=learningStation(),tier=st.tiers[state.learning?.tier]?state.learning.tier:'completa',conf=st.tiers[tier],all=conf.ids.map(id=>st.questions.find(q=>q.id===id)).filter(Boolean),read=state.learned[st.number]||[],sim=state.current;
  let out=sectionTitle('Estudo <em>'+esc(st.title)+'.</em>');
  out+='<button type="button" class="btn ghost" onclick="OSCEPilot.home()">← Escolher outra estação</button>';
  out+='<div class="osce-learning-banner" role="note"><div><p class="eyebrow">MODO ESTUDO · SEM NOTA</p><h2>Aprenda antes de ser avaliado.</h2><p>As respostas estão disponíveis desde o início. Leia o raciocínio, revise os conceitos e depois escolha quando começar a simulação.</p></div><div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.start(\''+tier+'\',null,'+st.number+')">🩺 Simular este tema</button>'+(sim&&sim.station===st.number?'<button class="btn" onclick="OSCEPilot.resume()">Retomar simulação anterior</button>':'')+'</div></div>';
  out+='<div class="osce-study-switch" role="group" aria-label="Profundidade de estudo">'+Object.entries(st.tiers).map(([k,t])=>'<button type="button" class="osce-study-switch-btn '+(tier===k?'active':'')+'" aria-pressed="'+(tier===k)+'" onclick="OSCEPilot.learn(\''+k+'\','+st.number+')"><strong>'+esc(t.label)+'</strong><small>≈ '+t.minutes+' min · '+t.ids.length+' tópico(s)</small></button>').join('')+'</div>';
  out+=toolBar(st);
  out+='<section class="osce-case"><div class="osce-stepbar"><strong>CASO CLÍNICO · ESTAÇÃO '+st.number+'</strong><span>Prioridade alta</span></div><p>'+esc(st.caseText)+'</p>'+media(st)+'</section>';
  if(st.number===52)out+=annotatedMedia(st,true);
  out+='<section class="osce-case osce-study-essential"><h2>O essencial em cerca de 1 minuto</h2><p>'+mark(st,st.essential.oneMinute)+'</p><p><strong>Para memorizar:</strong> '+esc(st.essential.mnemonic)+'</p></section>';
  out+='<section class="osce-case osce-study-outline"><div class="osce-study-title"><div><p class="eyebrow">ROTEIRO DA ESTAÇÃO</p><h2>O que estudar e saber responder</h2></div><span class="osce-study-progress" id="osce-learn-progress" aria-live="polite">'+learnedCount(st,conf.ids)+'/'+all.length+' pontos estudados</span></div>';
  out+='<div class="osce-study-index">'+all.map((q,i)=>'<button type="button" onclick="OSCEPilot.jumpLearn(\''+q.id+'\')">'+(i+1)+'. '+esc(q.competence)+'</button>').join('')+'</div></section>';
  out+='<section class="osce-learning-questions" aria-label="Perguntas e respostas para estudar">'+all.map((q,i)=>{
   const marked=read.includes(q.id);
   return '<article class="osce-study-question" id="osce-learn-'+esc(q.id)+'"><div class="osce-stepbar"><strong>TÓPICO '+(i+1)+' DE '+all.length+'</strong><span>'+esc(q.competence)+'</span></div>'
    +'<h3>'+esc(q.prompt)+'</h3>'
    +'<div class="osce-study-model"><p class="eyebrow">RESPOSTA-MODELO MASTER · DISPONÍVEL PARA ESTUDO</p><p>'+mark(st,q.answer)+'</p></div>'
    +'<div class="osce-study-points"><h4>O que não pode faltar na sua resposta</h4><ul>'+q.criteria.map(c=>'<li>'+esc(c)+'</li>').join('')+'</ul></div>'
    +'<div class="osce-study-memory"><strong>Para fixar:</strong> '+esc(q.memory||st.essential.mnemonic||'Associe o sinal ao mecanismo e à decisão clínica.')+'</div>'
    +'<details class="osce-deep"><summary>Como raciocinar e lembrar <span>aprofundamento opcional</span></summary><div><p>Faça três conexões: dado do caso → mecanismo que o explica → decisão que muda o cuidado.</p><p><strong>Perguntas para autoexplicação:</strong> '+esc(q.hints.join(' · '))+'</p><p class="osce-note">Releia a resposta-modelo e tente explicá-la sem olhar, como faria na arguição oral.</p></div></details>'
    +'<div class="osce-study-card-actions"><button class="btn osce-study-mark '+(marked?'is-studied':'')+'" id="osce-learn-mark-'+st.number+'-'+esc(q.id)+'" type="button" aria-pressed="'+marked+'" onclick="OSCEPilot.markLearn('+st.number+',\''+q.id+'\')">'+(marked?'✓ Estudado':'Marcar como estudado')+'</button></div></article>';
   }).join('')+'</section>';
  out+='<section class="osce-case osce-study-depth"><div class="osce-study-title"><div><p class="eyebrow">CONTEÚDO COMPLEMENTAR</p><h2>Aprofundamentos e memorização</h2></div><span class="osce-label medium">Abra só o que precisar</span></div><p class="osce-note">Essas explicações são opcionais e permanecem recolhidas, para não sobrecarregar a leitura. No modo Completo, você pode percorrer todos os assuntos.</p><div class="osce-deep-stack">'+(st.deeper||[]).map(d=>'<details class="osce-deep"><summary>'+esc(d.title)+' <span>aprofundar</span></summary><div><p>'+mark(st,d.body)+'</p><p><strong>Memorização:</strong> '+esc(d.tip)+'</p></div></details>').join('')+'</div></section>';
  out+='<section class="osce-case"><h2>Para estudar até o final</h2><div class="osce-deep-stack">'+termPanel(st)+lessonBar(st)+sourcePanel(st)+'</div><div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.start(\''+tier+'\',null,'+st.number+')">🩺 Agora quero simular</button><button class="btn" onclick="OSCEPilot.learn(\'completa\','+st.number+')">Ver o estudo completo</button><button class="btn" onclick="OSCEPilot.home()">Escolher outra estação</button></div><p class="osce-note">Estudar e marcar tópicos não cria tentativas nem notas. Apenas o modo Simulação registra desempenho e programa retestes por erro.</p></section>';
  return out;
 }

 function currentQ(st){return st.questions.find(q=>q.id===state.current?.ids[state.current.pos]);}
 function activePage(){
  const st=study(),r=state.current;
  if(!r||!st)return homePage();
  const q=currentQ(st);if(!q)return homePage();
  const attemptedEntry=entry(st,q),prev=last(st,q);
  let out=sectionTitle(esc(st.title))+'<button class="btn ghost" onclick="OSCEPilot.home()">← Voltar e salvar</button>'+toolBar(st)
   +'<section class="osce-case"><div class="osce-stepbar"><span>ESTAÇÃO '+st.number+' · PRIORIDADE ALTA</span><span>'+esc(st.tiers[r.tier].label)+' · '+(r.pos+1)+'/'+r.ids.length+'</span></div><p>'+esc(st.caseText)+'</p>'+media(st)+'</section>'
   +'<section class="osce-step"><div class="osce-track"><span style="width:'+(r.pos/r.ids.length*100)+'%"></span></div><div class="osce-stepbar"><b>PERGUNTA '+(r.pos+1)+' DE '+r.ids.length+'</b><span>'+esc(q.competence)+'</span></div><h2>'+esc(q.prompt)+'</h2>'
   +(prev?'<p class="osce-note">Última tentativa: '+prev.score+'% de critérios · próxima revisão '+formatDate(prev.due)+'.</p>':'')
   +'<label class="osce-answer-label" for="osce-answer">Sua resposta (como na arguição oral)</label><textarea id="osce-answer" rows="6" placeholder="Digite seu raciocínio; pode escrever não sei para aprender pelo erro." oninput="OSCEPilot.answer(this.value)" '+(shown?'readonly':'')+'>'+esc(attemptedEntry.draft||'')+'</textarea>';
  if(!shown){
   out+='<p class="osce-note">Qual é sua confiança ANTES de conferir?</p><div class="osce-confidence" role="group" aria-label="Confiança antes do gabarito">'+[[1,'Baixa'],[2,'Média'],[3,'Alta']].map(([i,txt])=>'<button type="button" aria-pressed="'+(confidence===i)+'" onclick="OSCEPilot.conf('+i+')">'+txt+'</button>').join('')+'</div>';
   if(hints)out+='<div class="osce-hint"><b>Dica '+hints+'/3:</b> '+esc(q.hints[hints-1])+'</div>';
   out+='<div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.reveal()">Conferir resposta</button><button class="btn" onclick="OSCEPilot.hint()">Preciso de dica'+(hints?' ('+hints+'/3)':'')+'</button><button class="btn ghost" onclick="OSCEPilot.home()">Salvar e sair</button></div>';
  }else{
   out+='<div class="osce-feedback"><p class="eyebrow">RESPOSTA DIDÁTICA · CORREÇÃO POR CRITÉRIOS</p><h3>Resposta-modelo Master</h3><p>'+mark(st,q.answer)+'</p><div class="osce-criteria"><h3>O que você realmente incluiu?</h3>'
    +q.criteria.map((txt,i)=>'<label><input type="checkbox" '+(checked.includes(i)?'checked':'')+' onchange="OSCEPilot.criterion('+i+',this.checked)"><span>'+esc(txt)+'</span></label>').join('')+'</div>'
    +'<p class="osce-note"><b id="osce-criteria-count">'+checked.length+'/'+q.criteria.length+'</b> critérios marcados; autoavaliação sem IA corretora.</p><div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.finish()">Registrar resultado e avançar</button><button class="btn" onclick="OSCEPilot.retry()">Voltar à resposta</button></div></div>';
   if(r.tier==='essencial')out+='<details class="osce-deep" open><summary>Essencial · illness script de 1 minuto</summary><div><p>'+esc(st.essential.oneMinute)+'</p><p><strong>Âncora:</strong> '+esc(st.essential.mnemonic)+'</p></div></details>';
   if(st.number===52)out+=annotatedMedia(st);
   out+=deepPanels(st,q);
  }
  out+='</section><section class="osce-case"><h2>Estude mais, quando precisar</h2><div class="osce-deep-stack">'+termPanel(st)+lessonBar(st)+sourcePanel(st)+'</div></section>';
  return out;
 }
 function start(tier,ids,number){
  const st=data(number||61);if(!st?.tiers[tier])return;
  const chosen=(Array.isArray(ids)&&ids.length?ids:st.tiers[tier].ids).filter(id=>st.questions.some(q=>q.id===id));
  state.current={station:st.number,tier,ids:chosen,pos:0,startedAt:now(),itemStartedAt:Date.now(),results:[]};
  screen='study';shown=false;confidence=0;hints=0;checked=[];glossary='';save();renderAgain();
 }
 function daily(){
  const a=dueItems();if(a.length)return start('rapida',[a[0].q.id],a[0].st.number);
  const st=BANK.find(x=>attempted(x)===0)||BANK[0];start(recommended(st).tier,null,st.number);
 }
 function resume(){if(!state.current)return daily();screen='study';shown=false;confidence=0;hints=0;checked=[];renderAgain();}
 function home(){screen='home';shown=false;renderAgain();}
 function setDate(v){state.settings.examDate=v;save();renderAgain();}
 function setMinutes(v){state.settings.minutes=Number(v);save();renderAgain();}
 function answer(v){const q=currentQ(study());if(q&&!shown){entry(study(),q).draft=String(v).slice(0,6000);save()}}
 function conf(n){if(shown)return;confidence=n;if(typeof document!=='undefined')document.querySelectorAll('.osce-confidence button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i+1===n)));}
 function hint(){if(!shown){hints=Math.min(3,hints+1);renderAgain();}}
 function reveal(){const q=currentQ(study());if(!q)return;if(!entry(study(),q).draft?.trim())return notify('Escreva sua tentativa primeiro (ou “não sei”).');if(!confidence)return notify('Registre primeiro sua confiança.');shown=true;checked=[];renderAgain();}
 function criterion(i,on){const q=currentQ(study());if(!q)return;checked=on?[...new Set([...checked,i])]:checked.filter(x=>x!==i);if(typeof document!=='undefined'){const el=document.getElementById('osce-criteria-count');if(el)el.textContent=checked.length+'/'+q.criteria.length;}}
 function retry(){shown=false;checked=[];renderAgain();}
 function finish(){
  if(!shown)return;const r=state.current,st=study(),q=currentQ(st);if(!r||!q)return;
  const x=entry(st,q),last0=last(st,q),score=Math.round(100*checked.length/q.criteria.length),high=confidence===3&&score<80;
  const interval=score<50||high||hints>=2?1:score<80?3:score===100&&hints===0&&(last0?.score||0)>=80?21:7;
  const attempt={at:now(),answer:x.draft||'',score,criteria:[...checked],confidence,hintsUsed:hints,overconfident:high,due:shift(interval),depth:r.tier,durationMs:Math.max(0,Date.now()-(r.itemStartedAt||Date.now())),source:'autoauditoria'};
  x.attempts=[...(x.attempts||[]),attempt].slice(-50);x.draft='';r.results.push({question:q.id,score,at:attempt.at});
  if(window.MasterActivity?.track)window.MasterActivity.track('question_answer','osce:'+st.number+':'+q.id,{correct:score>=80});
  shown=false;checked=[];confidence=0;hints=0;glossary='';
  if(r.pos<r.ids.length-1){r.pos++;r.itemStartedAt=Date.now();}
  else{state.covered[st.number]={...(state.covered[st.number]||{}),[r.tier]:true};state.runs.push({...r,completedAt:now()});state.runs=state.runs.slice(-120);state.current=null;screen='done';reviewStation=st.number;}
  save();renderAgain();
 }
 function reviewPage(){
  const weak=weakItems(),dues=dueItems();
  return sectionTitle('Revisão <em>adaptativa.</em>')+'<button class="btn ghost" onclick="OSCEPilot.home()">← Voltar</button><p>Erros, respostas parciais e confiança excessiva voltam primeiro. Reavaliação por recuperação ativa, sem séries punitivas.</p>'
   +'<div class="osce-stats"><div><b>'+dues.length+'</b><span>vencidas</span></div><div><b>'+weak.length+'</b><span>lacunas insatisfatórias</span></div></div><div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.reviewDue()">▶ Retestar agora</button><button class="btn" onclick="OSCEPilot.showPrompt()">Gerar script para IA</button></div>'
   +'<section class="osce-case"><h2>Agendamento explicável</h2><p>Erro importante/alta confiança errada: D+1 · parcial: D+3 · boa resposta: D+7 · domínio repetido, sem dicas: D+21. O escore é produzido por marcação manual dos critérios da resposta.</p></section>'
   +'<div class="osce-review-list">'+(weak.length?weak.map(x=>'<button onclick="OSCEPilot.start(\'rapida\',[ \''+esc(x.q.id)+'\' ],'+x.st.number+')"><b>Estação '+x.st.number+' — '+esc(x.q.competence)+' · '+x.a.score+'%</b><span>'+esc(x.q.prompt)+'</span><small>Reteste: '+formatDate(x.a.due)+'</small></button>').join(''):'<div class="card pad"><p>Nenhum erro insatisfatório registrado. Comece por uma das estações disponíveis.</p></div>')+'</div>';
 }
 function makePrompt(){
  const weak=BANK.flatMap(st=>st.questions.map(q=>({st,q,a:last(st,q)})).filter(x=>x.a&&(x.a.score<80||x.a.overconfident))).sort((a,b)=>a.a.score-b.a.score||b.a.confidence-a.a.confidence);
  if(!weak.length)return 'Ainda não há erros ou respostas parciais. Responda uma pergunta para gerar um roteiro específico.';
  let out='Você é avaliador de Clínica Médica II (FMP), especializado em arguição prático-oral. Faça UMA pergunta por vez e aguarde minha resposta. Não trate perguntas do Master como oficiais da FMP.\n\nFaça revisão de diagnóstico sindrômico e etiológico, anamnese, exame físico, diferenciais, fisiopatologia, exames e conduta. Use diretrizes atuais verificáveis (SBC FA 2025, ESC AF 2024, ESC Síncope 2018, EUSEM 2024). Não invente imagens, doses ou referências.\n\nApós cada resposta: (1) aponte lacuna específica, (2) explique mecanismo e conduta, (3) forneça mnemônico, (4) crie caso breve semelhante mas não idêntico, (5) avalie por checklist, (6) agende D+1/D+3/D+7/D+21 conforme desempenho. Dê prioridade aos erros de alta confiança.\n\nERROS ('+weak.length+'):\n';
  for(const x of weak.slice(0,24)){const missing=x.q.criteria.filter((_,i)=>!x.a.criteria.includes(i));out+='\nEstação '+x.st.number+' — '+x.st.title+' | '+x.q.competence+' | '+x.a.score+'% | confiança '+x.a.confidence+'/3 | dicas '+x.a.hintsUsed+'/3\nPergunta: '+x.q.prompt+'\nNão cumpriu: '+(missing.join('; ')||'reavaliar raciocínio')+'\nMinha resposta: '+x.a.answer.slice(0,900)+'\n';}
  return out+'\nComece só com a primeira pergunta, sem revelar a resposta.';
 }
 function promptPage(){return sectionTitle('Script de <em>revisão por erros.</em>')+'<button class="btn ghost" onclick="OSCEPilot.home()">← Voltar</button><p>Copie para uma IA a análise dos critérios não cumpridos. Nenhuma resposta é transmitida automaticamente.</p><section class="osce-step"><label class="osce-answer-label" for="osce-prompt">Roteiro personalizado</label><textarea readonly id="osce-prompt" rows="19">'+esc(makePrompt())+'</textarea><div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.copyPrompt()">Copiar para IA</button><button class="btn" onclick="OSCEPilot.showReview()">Ver erros</button></div></section>';}
 function donePage(){const st=data(reviewStation),run=state.runs.at(-1),n=run?.results.length||0;return sectionTitle('Sessão <em>concluída.</em>')+'<p>Você concluiu '+n+' pergunta(s) da estação '+st.number+' ('+esc(st.title)+'). Não precisa concluir tudo em um dia.</p><section class="osce-case"><h2>Consolide sem consultar</h2><p>'+esc(st.essential.oneMinute)+'</p><p class="osce-note">Próxima ação: abra a fila de erros ou repita amanhã uma pergunta sem olhar o gabarito.</p><div class="osce-actions"><button class="btn primary" onclick="OSCEPilot.showReview()">Ver minha revisão</button><button class="btn" onclick="OSCEPilot.showPrompt()">Copiar script para IA</button><button class="btn" onclick="OSCEPilot.home()">Todas as estações</button></div></section>';}
 function page(){return screen==='learn'?learnPage():screen==='study'?activePage():screen==='review'?reviewPage():screen==='prompt'?promptPage():screen==='done'?donePage():homePage();}
 function showReview(){screen='review';renderAgain();}
 function showPrompt(){screen='prompt';renderAgain();}
 function reviewDue(){const list=dueItems();if(!list.length)return notify('Nenhum reteste vencido ainda.');const x=list[0];start('rapida',[x.q.id],x.st.number);}
 function term(k){
  const st=screen==='study'?study():screen==='learn'?learningStation():data(reviewStation);const arr=st.terms||[
   {key:'sincope',name:'Síncope',definition:'Hipoperfusão cerebral global transitória.',source:'esc2018'},
   {key:'ecg',name:'ECG',definition:'Avaliação eletrocardiográfica de 12 derivações.',source:'esc2018'},
   {key:'eco',name:'Ecocardiograma',definition:'Exame cardíaco estrutural.',source:'esc2018'},
   {key:'eeg',name:'EEG',definition:'Investigação indicada conforme suspeita neurológica.',source:'esc2018'}
  ];
  const t=arr.find(x=>x.key===k);if(!t)return;
  const src=(st.sources||[]).find(x=>x.id===t.source);
  glossary='<p><strong>'+esc(t.name)+':</strong> '+esc(t.definition)+'</p>'+(src?'<p><a target="_blank" rel="noopener noreferrer" href="'+esc(src.url)+'">Fonte: '+esc(src.label||src.title)+' ↗</a></p>':'');
  const d=document.getElementById('osce-terms');if(d&&!d.open)d.open=true;
  const area=document.getElementById('osce-glossary-content');if(area){area.innerHTML=glossary;area.scrollIntoView({block:'nearest',behavior:'smooth'});}
 }
 function showSources(){const d=document.getElementById('osce-sources');if(d){d.open=true;d.scrollIntoView({block:'start',behavior:'smooth'});}}
 function showTerms(){const d=document.getElementById('osce-terms');if(d){d.open=true;d.scrollIntoView({block:'start',behavior:'smooth'});}}
 function showAnnotated(){const d=typeof document!=='undefined'?document.getElementById('osce-ecg-commented'):null;if(!d){notify('Interpretação comentada disponível após uma tentativa com correção.');return;}d.open=true;d.scrollIntoView({block:'start',behavior:'smooth'});}
 function openLesson(n){
  const st=MAP.get(Number(n)),lesson=st?.lesson;
  if(!lesson?.id)return notify('Não há aula interna validada para esta estação. Consulte as referências.');
  if(lesson.kind==='p1'&&typeof window.P1?.openTopic==='function'){window.P1.openTopic(lesson.id);return;}
  if((lesson.kind==='topic'||lesson.kind==='p2')&&typeof window.openTopic==='function'){window.openTopic(lesson.id);return;}
  notify('A aula relacionada não está disponível nesta versão da biblioteca.');
 }
 function showFullLesson(n){openLesson(n);}
 function expandImage(img){
  if(!img?.src)return;const overlay=document.createElement('div');overlay.className='osce-lightbox';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.innerHTML='<button type="button" aria-label="Fechar imagem" onclick="this.parentElement.remove()">✕ Fechar</button><img src="'+esc(img.src)+'" alt="'+esc(img.alt)+'" /><p>Imagem de referência usada nesta estação · ampliação</p>';overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove();});document.body.append(overlay);overlay.querySelector('button').focus();
 }
 async function copyPrompt(){const x=document.getElementById('osce-prompt');if(!x)return;try{await navigator.clipboard.writeText(x.value);notify('Roteiro copiado.');}catch{x.focus();x.select();notify('Selecione e copie o roteiro.');}}
 function reload(){state=load();screen='home';shown=false;confidence=0;hints=0;checked=[];glossary='';renderAgain();}
 window.addEventListener('master-auth-ready',reload);
 window.addEventListener('master-auth-ended',()=>{state=empty();screen='home';shown=false;glossary='';});
 window.addEventListener('master-remote-merge',e=>{if(e.detail?.key===KEY)reload()});
 window.addEventListener('storage',e=>{if(e.key===KEY)reload()});
 return {page,start,daily,resume,home,learn,jumpLearn,markLearn,setDate,setMinutes,answer,conf,hint,reveal,criterion,retry,finish,showReview,showPrompt,reviewDue,term,showSources,showTerms,showAnnotated,openLesson,showFullLesson,expandImage,copyPrompt,reload};
})();
