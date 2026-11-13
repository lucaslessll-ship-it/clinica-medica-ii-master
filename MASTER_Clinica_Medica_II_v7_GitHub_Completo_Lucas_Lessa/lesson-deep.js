/* Estudo aprofundado por aula. Camada aditiva: aparece abaixo dos blocos existentes da aula.
   Cada entrada usa a chave "<id da matéria>_<índice da aula>". Texto original, com fontes ao final.
   Técnicas usadas: pré-teste, explicação em blocos, fluxograma, tabela comparativa, mnemônico,
   erros comuns e evocação ativa com autoavaliação. */
const LessonDeep=(()=>{
'use strict';
const DATA={
'p1arr_0':{
 updated:'2026-11',
 pretest:['Qual achado do ECG define fibrilação atrial?','Sexo feminino ainda pontua no escore de risco de AVC usado pela diretriz europeia de 2024?','A partir de quantas horas de arritmia a cardioversão eletiva exige anticoagulação prévia ou ecocardiograma transesofágico?','Por que diltiazem e verapamil são evitados quando a fração de ejeção é de 40% ou menos?'],
 sections:[
  {h:'Por que a fibrilação atrial acontece',p:[
   'Dois elementos precisam coexistir: um gatilho e um substrato. O gatilho mais comum são focos de disparo rápido nas veias pulmonares. O substrato é um átrio remodelado por hipertensão, insuficiência cardíaca, obesidade, apneia do sono, álcool, valvopatia ou idade, com fibrose e dilatação que permitem que múltiplas frentes de onda se mantenham.',
   'A própria arritmia piora o substrato: encurta o período refratário e aumenta a fibrose. Por isso se diz que fibrilação atrial gera fibrilação atrial, e por isso a doença tende a progredir de paroxística para persistente. Esse é o raciocínio por trás de tratar fatores de risco e de considerar controle de ritmo cedo.',
   'Sem contração atrial organizada, o sangue fica parado, principalmente no apêndice atrial esquerdo, onde se forma a maior parte dos trombos. O nó atrioventricular recebe centenas de impulsos por minuto e deixa passar apenas parte deles, de forma irregular. Daí vêm os dois problemas clínicos: embolia e resposta ventricular rápida e irregular.']},
  {h:'Diagnóstico: o que precisa estar no ECG',p:[
   'Três achados: ausência de ondas P distintas, linha de base com atividade atrial irregular (ondas f) e intervalos RR irregularmente irregulares. O diagnóstico exige documentação eletrocardiográfica; pulso irregular ou alerta de relógio levantam a suspeita, mas não confirmam.'],
   table:{head:['Ritmo','Atividade atrial','RR','Pista'],rows:[
    ['Fibrilação atrial','Sem P; ondas f finas e caóticas','Irregularmente irregular','Nenhum padrão se repete'],
    ['Flutter atrial','Ondas F em dente de serra, cerca de 300 por minuto','Regular (2:1, frequência perto de 150) ou irregular com bloqueio variável','Olhar DII, DIII, aVF e V1'],
    ['Taquicardia atrial multifocal','Três ou mais morfologias de P','Irregular','Paciente com doença pulmonar'],
    ['Extrassístoles frequentes','P sinusal presente na maioria dos batimentos','Irregular com padrão','Ritmo de base é sinusal']]}},
  {h:'Classificação temporal',list:[
   'Primeiro diagnóstico: nunca documentada antes, qualquer duração.',
   'Paroxística: termina sozinha ou com intervenção em até 7 dias.',
   'Persistente: dura mais de 7 dias.',
   'Persistente de longa duração: 12 meses ou mais, ainda com intenção de controlar o ritmo.',
   'Permanente: paciente e médico decidiram não tentar mais restaurar o ritmo sinusal. É uma decisão, não um achado.'],
   after:'A classificação orienta a estratégia de ritmo. Ela não muda a indicação de anticoagulação, que depende só do risco tromboembólico.'},
  {h:'AF-CARE: a ordem do cuidado na diretriz europeia de 2024',p:[
   'A sigla organiza o plano em quatro pilares, e todos se aplicam a todo paciente.'],
   list:[
   '<strong>C, comorbidades e fatores de risco:</strong> controlar pressão arterial, tratar insuficiência cardíaca, diabetes e apneia do sono, perder peso, reduzir álcool e manter atividade física. Sem isso, a arritmia recorre mesmo após ablação.',
   '<strong>A, evitar AVC e tromboembolismo:</strong> estratificar o risco e anticoagular quando indicado.',
   '<strong>R, reduzir sintomas com controle de frequência e de ritmo:</strong> escolher a estratégia conforme sintomas, tempo de doença e cardiopatia.',
   '<strong>E, avaliação e reavaliação dinâmica:</strong> ecocardiograma, função renal e tireoidiana no início, e revisão periódica do risco, que muda com a idade e com novas doenças.']},
  {h:'Pilar A: quem anticoagular',p:[
   'O escore adotado é o CHA₂DS₂-VA. A diferença para o escore anterior é a retirada do critério sexo.'],
   table:{head:['Letra','Fator','Pontos'],rows:[
    ['C','Insuficiência cardíaca (sintomas ou fração de ejeção reduzida)','1'],
    ['H','Hipertensão arterial','1'],
    ['A₂','Idade de 75 anos ou mais','2'],
    ['D','Diabetes','1'],
    ['S₂','AVC, AIT ou tromboembolismo prévio','2'],
    ['V','Doença vascular (infarto prévio, doença arterial periférica, placa aórtica)','1'],
    ['A','Idade de 65 a 74 anos','1']]},
   list:[
   'Escore de 2 ou mais: anticoagulação oral recomendada.',
   'Escore de 1: anticoagulação deve ser considerada.',
   'Escore de 0: não anticoagular por causa da arritmia.',
   'Anticoagulantes orais diretos são preferidos à varfarina. Exceções em que a varfarina é obrigatória: prótese valvar mecânica e estenose mitral moderada a grave.',
   'Antiagregante plaquetário não substitui anticoagulante para prevenir AVC.',
   'Escores de sangramento servem para identificar e corrigir fatores modificáveis (pressão descontrolada, álcool, anti-inflamatórios, INR lábil). Não devem ser usados sozinhos para negar anticoagulação.',
   'Cardiomiopatia hipertrófica e amiloidose cardíaca com fibrilação atrial: anticoagular independentemente do escore.']},
  {h:'Doses dos anticoagulantes orais diretos',p:[
   'Dose reduzida só quando o paciente cumpre os critérios. Reduzir "por precaução" em idoso aumenta o risco de AVC sem reduzir sangramento de forma comprovada.'],
   table:{head:['Fármaco','Dose padrão','Critério para dose reduzida','Dose reduzida'],rows:[
    ['Apixabana','5 mg, 2 vezes ao dia','Dois de três: idade de 80 anos ou mais, peso de 60 kg ou menos, creatinina de 1,5 mg/dL ou mais','2,5 mg, 2 vezes ao dia'],
    ['Rivaroxabana','20 mg, 1 vez ao dia, com alimento','Depuração de creatinina de 15 a 49 mL/min','15 mg, 1 vez ao dia'],
    ['Dabigatrana','150 mg, 2 vezes ao dia','Idade de 80 anos ou mais, ou uso de verapamil','110 mg, 2 vezes ao dia'],
    ['Edoxabana','60 mg, 1 vez ao dia','Depuração de 15 a 50 mL/min, peso de 60 kg ou menos, ou inibidor potente da glicoproteína P','30 mg, 1 vez ao dia']]},
   after:'Calcule a depuração por Cockcroft-Gault, que foi a fórmula usada nos estudos. Confira bula e protocolo local antes de prescrever.'},
  {h:'Pilar R: frequência',p:[
   'Controle de frequência é o tratamento inicial de quase todos e pode ser a estratégia definitiva em pacientes pouco sintomáticos.'],
   list:[
   'Fração de ejeção acima de 40%: betabloqueador, diltiazem, verapamil ou digoxina.',
   'Fração de ejeção de 40% ou menos: betabloqueador e/ou digoxina. Diltiazem e verapamil deprimem a contratilidade e são evitados.',
   'Meta inicial: frequência de repouso abaixo de 110 por minuto. No estudo RACE II, com 614 pacientes em fibrilação atrial permanente, essa meta flexível não foi inferior à meta estrita (abaixo de 80) e foi atingida com menos consultas. Aperte a meta se persistirem sintomas ou surgir disfunção ventricular.',
   'Falha do tratamento clínico: ablação do nó atrioventricular com implante de marca-passo.']},
  {h:'Pilar R: ritmo e cardioversão',list:[
   '<strong>Instabilidade hemodinâmica causada pela arritmia:</strong> cardioversão elétrica sincronizada imediata, sem esperar anticoagulação.',
   '<strong>Estável, duração de até 24 horas:</strong> a cardioversão pode ser feita, iniciando anticoagulação o quanto antes. Também é aceitável aguardar, porque muitos episódios recentes revertem sozinhos em até 48 horas.',
   '<strong>Estável, duração acima de 24 horas ou desconhecida:</strong> pelo menos 3 semanas de anticoagulação terapêutica antes, ou ecocardiograma transesofágico para excluir trombo. A diretriz de 2024 reduziu esse limite de 48 para 24 horas.',
   '<strong>Depois de qualquer cardioversão:</strong> manter anticoagulação por pelo menos 4 semanas em todos, pois o átrio fica "atordoado" e ainda forma trombo. Depois disso, a decisão segue o escore, não o ritmo.',
   '<strong>Antiarrítmico de manutenção sem cardiopatia estrutural:</strong> propafenona ou flecainida. São contraindicadas em disfunção ventricular, doença coronariana e hipertrofia importante.',
   '<strong>Com insuficiência cardíaca de fração reduzida:</strong> amiodarona. Vigiar tireoide, pulmão, fígado e intervalo QT.',
   '<strong>Ablação por cateter:</strong> indicada quando o antiarrítmico falha ou não é tolerado, e pode ser primeira opção na forma paroxística por decisão compartilhada. Tem papel especial na insuficiência cardíaca com suspeita de taquicardiomiopatia.']}
 ],
 flow:{title:'Do ECG à conduta',nodes:[
  {k:'start',t:'Ritmo irregular sem onda P: fibrilação atrial confirmada no ECG'},
  {k:'ask',t:'Há instabilidade causada pela arritmia? (hipotensão ou choque, edema agudo de pulmão, dor isquêmica, rebaixamento de consciência)',yes:'Cardioversão elétrica sincronizada imediata',no:'Seguir'},
  {k:'ask',t:'QRS largo, muito rápido e irregular, sugerindo pré-excitação?',yes:'Não usar bloqueadores do nó atrioventricular. Cardioversão ou procainamida',no:'Seguir'},
  {k:'do',t:'Controlar a frequência: betabloqueador, ou diltiazem/verapamil só se fração de ejeção acima de 40%'},
  {k:'do',t:'Calcular CHA₂DS₂-VA. 2 ou mais: anticoagular. 1: considerar. Preferir anticoagulante oral direto'},
  {k:'ask',t:'Vai cardioverter? A arritmia tem mais de 24 horas ou duração desconhecida?',yes:'3 semanas de anticoagulação antes, ou transesofágico sem trombo',no:'Pode cardioverter, com anticoagulação iniciada'},
  {k:'do',t:'Após cardioversão: anticoagular por pelo menos 4 semanas; depois, conforme o escore'},
  {k:'end',t:'Tratar comorbidades, escolher frequência ou ritmo a longo prazo e reavaliar o risco periodicamente'}]},
 reasoning:[
  'Faça sempre as mesmas três perguntas, nesta ordem: está instável? precisa anticoagular? frequência ou ritmo?',
  'Anticoagulação e ritmo são decisões independentes. O paciente que voltou ao ritmo sinusal continua com o mesmo escore.',
  'Antes de escolher o fármaco, pergunte pela fração de ejeção. Ela decide entre diltiazem e betabloqueador, e entre propafenona e amiodarona.',
  'Procure a causa reversível: hipertireoidismo, infecção, embolia pulmonar, álcool, pós-operatório, distúrbio eletrolítico.',
  'Frequência perto de 150 e regular: pense em flutter 2:1 antes de chamar de taquicardia sinusal.'],
 mnemonics:[
  {n:'AF-CARE',t:'Comorbidades, Anticoagular, Reduzir sintomas, Examinar de novo. Leia a sigla como a ordem da consulta.'},
  {n:'CHA₂DS₂-VA',t:'Os dois fatores com número 2 valem 2 pontos: Age de 75 ou mais e Stroke. Todo o resto vale 1. O "Sc" de sexo saiu.'},
  {n:'24, 3 e 4',t:'Mais de 24 horas: 3 semanas antes, 4 semanas depois.'},
  {n:'Regra dos 40',t:'Fração de ejeção de 40% ou menos: sem diltiazem, sem verapamil, sem propafenona.'}],
 pitfalls:[
  'Suspender o anticoagulante porque o paciente "voltou ao ritmo sinusal".',
  'Usar AAS no lugar de anticoagulante em idoso com medo de sangramento.',
  'Pontuar sexo feminino no escore da diretriz de 2024.',
  'Reduzir a dose do anticoagulante direto sem critério.',
  'Dar adenosina, betabloqueador, diltiazem ou digoxina na fibrilação atrial pré-excitada: pode acelerar a condução pela via acessória e degenerar em fibrilação ventricular.',
  'Usar anticoagulante oral direto em prótese mecânica ou estenose mitral moderada a grave.',
  'Chamar de permanente uma arritmia apenas porque é antiga. Permanente é decisão de não buscar ritmo sinusal.'],
 recall:[
  {q:'Mulher, 66 anos, hipertensa, fração de ejeção de 42%, fibrilação atrial paroxística. Qual o CHA₂DS₂-VA e a conduta de anticoagulação?',a:'Hipertensão 1 + idade de 65 a 74 anos 1 = 2. Com fração de ejeção de 42%, só pontua insuficiência cardíaca se houver sintomas ou diagnóstico clínico. Com 2 pontos, anticoagulação recomendada, de preferência com anticoagulante oral direto. Sexo não pontua.'},
  {q:'Na mesma paciente, por que a fração de ejeção muda o antiarrítmico?',a:'Propafenona e flecainida são contraindicadas em disfunção ventricular e cardiopatia estrutural relevante, pelo risco de pró-arritmia. Com fração de ejeção reduzida, as opções são amiodarona ou ablação.'},
  {q:'Homem, 58 anos, sem comorbidades, palpitações há 3 dias, estável, frequência de 130. Ele quer cardioversão hoje. O que é necessário?',a:'Duração acima de 24 horas: ou 3 semanas de anticoagulação terapêutica antes, ou ecocardiograma transesofágico sem trombo. Enquanto isso, controlar a frequência. Depois da cardioversão, anticoagular por pelo menos 4 semanas, mesmo com escore 0.'},
  {q:'Qual a meta inicial de frequência cardíaca em repouso e de onde ela vem?',a:'Abaixo de 110 por minuto. Vem do estudo RACE II, em que a meta flexível não foi inferior à estrita em desfechos cardiovasculares.'},
  {q:'Cite duas situações em que a varfarina é obrigatória.',a:'Prótese valvar mecânica e estenose mitral moderada a grave.'},
  {q:'Paciente com escore 3 e queda recente, com medo de sangramento. Qual o raciocínio correto?',a:'O risco de sangramento não contraindica por si só. Corrigir fatores modificáveis (pressão, álcool, anti-inflamatórios, interações), avaliar causa da queda e manter o anticoagulante, que tem benefício líquido na grande maioria.'}],
 practice:[
  'Peça TSH, função renal, eletrólitos e ecocardiograma em todo primeiro diagnóstico.',
  'Registre no prontuário o escore item a item e a data. Ele muda quando o paciente faz 65 e 75 anos.',
  'Oriente o paciente: o anticoagulante previne AVC, não trata palpitação. Muitos abandonam por não sentir efeito.',
  'Reavalie função renal pelo menos uma vez por ano em quem usa anticoagulante direto, e com mais frequência em idosos e renais crônicos.'],
 refs:[
  {t:'Van Gelder IC, et al. 2024 ESC Guidelines for the management of atrial fibrillation. Eur Heart J. 2024;45(36):3314-3414.',u:'https://doi.org/10.1093/eurheartj/ehae176'},
  {t:'Van Gelder IC, et al. Lenient versus strict rate control in patients with atrial fibrillation (RACE II). N Engl J Med. 2010;362(15):1363-73.',u:'https://doi.org/10.1056/NEJMoa1001337'}],
 note:'Recomendações resumidas da diretriz europeia de 2024. Os números do RACE II foram conferidos no resumo do artigo. Doses seguem os critérios de bula e precisam ser confirmadas no protocolo local.'
}
};

function has(id,index){return !!DATA[id+'_'+index];}
function add(entries){Object.assign(DATA,entries);}
const refLink=r=>r.u||'https://pubmed.ncbi.nlm.nih.gov/?term='+encodeURIComponent(r.q||r.t);
function table(t){return `<div class="deep-table-wrap"><table class="deep-table"><thead><tr>${t.head.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r=>`<tr>${r.map((c,i)=>i?`<td>${c}</td>`:`<th scope="row">${c}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function flow(f){
  return `<section class="deep-block hy-keep"><h4>Fluxograma: ${f.title}</h4><ol class="deep-flow">${f.nodes.map(n=>{
    if(n.k==='ask')return `<li class="deep-flow-ask"><p>${n.t}</p><div class="deep-flow-branches"><span class="yes"><b>Sim</b>${n.yes}</span><span class="no"><b>Não</b>${n.no}</span></div></li>`;
    return `<li class="deep-flow-${n.k}"><p>${n.t}</p></li>`;}).join('')}</ol></section>`;
}
const plain=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',[String.fromCharCode(39)]:'&#39;'}[char]));
function examBlock(items){
  if(!Array.isArray(items)||!items.length)return '';
  return `<section class="deep-block deep-exam hy-keep"><h4>Como cai na prova</h4><ol class="deep-exam-list">${items.map(item=>`<li>${typeof item==='string'?plain(item):`<p><strong>Padrão do enunciado:</strong> ${plain(item.pattern)}</p><p><strong>Pegadinha:</strong> ${plain(item.trap)}</p><p><strong>Resposta esperada:</strong> ${plain(item.answer)}</p>`}</li>`).join('')}</ol></section>`;
}
function caseSteps(value){return Array.isArray(value)?`<ol>${value.map(step=>`<li>${plain(step)}</li>`).join('')}</ol>`:`<p>${plain(value)}</p>`;}
function casesBlock(items){
  if(!Array.isArray(items)||!items.length)return '';
  return `<section class="deep-block deep-cases"><h4>Casos resolvidos passo a passo</h4>${items.map((item,index)=>`<article class="deep-case"><h5>${plain(item.title||'Caso '+(index+1))}</h5><dl>${[['Dados',item.data],['Raciocínio',item.reasoning],['Conduta',item.conduct],['Erro comum',item.error]].map(([label,value])=>`<div><dt>${label}</dt><dd>${caseSteps(value)}</dd></div>`).join('')}</dl></article>`).join('')}</section>`;
}
function figureLicense(value){
  const license=String(value||'').trim(),by=license.match(/^CC BY (1\.0|2\.0|2\.5|3\.0|4\.0)$/);
  return by?{label:license,url:'https://creativecommons.org/licenses/by/'+by[1]+'/'}:/^CC0(?: 1\.0)?$/.test(license)?{label:license,url:'https://creativecommons.org/publicdomain/zero/1.0/'}:null;
}
function validFigure(figure){
  if(!figure||!/^assets\/figs\/[a-zA-Z0-9][a-zA-Z0-9._-]*\.webp$/.test(figure.src||'')||!figureLicense(figure.license))return false;
  if(![figure.alt,figure.caption,figure.credit].every(value=>typeof value==='string'&&value.trim()))return false;
  try{const source=new URL(figure.sourceUrl);return source.protocol==='https:'&&['pmc.ncbi.nlm.nih.gov','commons.wikimedia.org','radiopaedia.org'].includes(source.hostname);}catch{return false;}
}
let figureSequence=0;
function figureMarkers(items){
  if(!Array.isArray(items)||items.length<2||items.length>4||!items.every(item=>[item.x,item.y,item.toX,item.toY].every(value=>Number.isFinite(value)&&value>=0&&value<=100)&&typeof item.label==='string'&&item.label.trim()))return {svg:'',legend:''};
  const id='deep-arrow-'+(++figureSequence);
  return {svg:`<svg class="deep-figure-marks" width="100%" height="100%" aria-hidden="true" focusable="false"><defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ffe066"/></marker></defs>${items.map((item,index)=>`<line x1="${item.x}%" y1="${item.y}%" x2="${item.toX}%" y2="${item.toY}%" marker-end="url(#${id})"/><circle cx="${item.x}%" cy="${item.y}%" r="12"/><text x="${item.x}%" y="${item.y}%" dy=".35em" text-anchor="middle">${index+1}</text>`).join('')}</svg>`,legend:`<ol class="deep-figure-legend">${items.map(item=>`<li>${plain(item.label)}</li>`).join('')}</ol>`};
}
function figures(items){
  const usable=Array.isArray(items)?items.filter(validFigure):[];if(!usable.length)return '';
  return `<div class="deep-figures">${usable.map(figure=>{const license=figureLicense(figure.license),marks=figureMarkers(figure.markers);return `<figure class="deep-figure"><button type="button" class="deep-figure-open" data-deep-figure aria-label="Ampliar imagem: ${plain(figure.alt)}"><span class="deep-figure-visual"><img src="${plain(figure.src)}" alt="${plain(figure.alt)}" loading="lazy" decoding="async">${marks.svg}</span><span class="deep-figure-hint">Toque para ampliar</span></button><figcaption><p>${plain(figure.caption)}</p>${marks.legend}<p class="deep-figure-credit">Crédito: ${plain(figure.credit)}. Licença: <a href="${license.url}" target="_blank" rel="noopener">${plain(license.label)}</a>. <a href="${plain(figure.sourceUrl)}" target="_blank" rel="noopener">Página de origem</a>.</p></figcaption></figure>`;}).join('')}</div>`;
}
function openFigure(button){
  const source=button.closest('.deep-figure');if(!source)return;
  const dialog=document.createElement('dialog');dialog.className='deep-figure-dialog';dialog.setAttribute('aria-label',button.getAttribute('aria-label'));
  dialog.innerHTML=`<button type="button" class="btn deep-figure-close" autofocus>Fechar imagem</button><figure class="deep-figure">${source.querySelector('.deep-figure-visual').outerHTML}${source.querySelector('figcaption').outerHTML}</figure>`;
  const arrow=dialog.querySelector('marker');if(arrow){arrow.id+='-zoom';dialog.querySelectorAll('line').forEach(line=>line.setAttribute('marker-end','url(#'+arrow.id+')'));}
  dialog.querySelectorAll('img').forEach(img=>img.loading='eager');
  document.body.appendChild(dialog);
  dialog.querySelector('.deep-figure-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{dialog.remove();if(button.isConnected)button.focus();},{once:true});
  dialog.showModal();
}
document.addEventListener('click',event=>{const button=event.target.closest?.('[data-deep-figure]');if(button)openFigure(button);});
function render(id,index){
  const d=DATA[id+'_'+index];if(!d)return '';
  const key=id+'_'+index,L=window.LearnUX,imageHTML=figures(d.figs);
  return `<section class="lesson-block full deep-lesson${L&&L.isHy()?' deep-hy':''}" aria-label="Estudo aprofundado"><header class="deep-head"><span class="kicker">Estudo aprofundado</span><h3>Entenda, decida e lembre</h3><p>Leia depois dos blocos acima. Comece tentando responder ao pré-teste, mesmo sem saber: errar antes de ler melhora a retenção.</p>${L?L.tools():''}</header>
  <section class="deep-block deep-pretest"><h4>Pré-teste: responda de cabeça</h4><ol>${d.pretest.map((q,i)=>L?L.preMarkup(q,i):`<li>${q}</li>`).join('')}</ol><p class="deep-pre-out subtle" role="status" aria-live="polite"></p></section>
  ${examBlock(d.exam)}
  ${d.sections.map(s=>`<section class="deep-block"><h4>${s.h}</h4>${(s.p||[]).map(p=>`<p>${p}</p>`).join('')}${s.table?table(s.table):''}${s.list?`<ul>${s.list.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}${s.after?`<p>${s.after}</p>`:''}</section>`).join('')}
  ${imageHTML?`<section class="deep-block deep-images"><h4>Imagens comentadas</h4>${imageHTML}</section>`:''}
  ${d.flow?flow(d.flow):''}
  <section class="deep-block"><h4>Dicas de raciocínio</h4><ul>${d.reasoning.map(x=>`<li>${x}</li>`).join('')}</ul></section>
  ${casesBlock(d.cases)}
  <section class="deep-block deep-mnemonics hy-keep"><h4>Para memorizar</h4><dl>${d.mnemonics.map(m=>`<div><dt>${m.n}</dt><dd>${m.t}</dd></div>`).join('')}</dl></section>
  <section class="deep-block deep-pitfalls hy-keep"><h4>Erros que custam ponto e paciente</h4><ul>${d.pitfalls.map(x=>`<li>${x}</li>`).join('')}</ul></section>
  <section class="deep-block deep-recall-block hy-keep"><h4>Evocação ativa</h4><p class="subtle">Responda em voz alta ou por escrito antes de abrir a resposta. Depois diga como foi: a pergunta volta para revisão no painel inicial em 1, 3, 7, 14 ou 30 dias.</p>${d.recall.map((r,i)=>{const k=key+'#'+i,due=L?L.dueText(k):'';return `<details class="deep-recall" data-recall="${k}"><summary><span>${i+1}</span>${r.q}<em class="deep-recall-due"${due?'':' hidden'}>${due}</em></summary><p>${r.a}</p>${L?L.rateMarkup(k):''}</details>`;}).join('')}</section>
  <section class="deep-block"><h4>Na prática</h4><ul>${d.practice.map(x=>`<li>${x}</li>`).join('')}</ul></section>
  <section class="deep-block deep-refs"><h4>Referências</h4><ul>${d.refs.map(r=>`<li><a href="${refLink(r)}" target="_blank" rel="noopener">${r.t}</a></li>`).join('')}</ul>${d.note?`<p class="subtle">${d.note} Revisado em ${d.updated}.</p>`:''}</section>
  </section>`;
}
return {render,has,add,keys:()=>Object.keys(DATA),figures};
})();
window.LessonDeep=LessonDeep;
