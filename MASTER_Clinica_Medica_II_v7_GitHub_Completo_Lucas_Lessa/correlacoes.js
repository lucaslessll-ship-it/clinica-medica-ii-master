/* Correlações entre aulas. Regras em CORRELACOES.md. Liga um conceito citado em uma aula
   à aula que o ensina a fundo, sem tirar o leitor da leitura. */
window.Correlacoes=(()=>{
 'use strict';
 const data=window.CORRELACOES||[],escape=window.escapeHtml||(s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])));
 const PREF='master-correl-inline',MAX_LESSON=6,MAX_SECTION=2;
 const COURSES={ecg:'ECGCourse',rad:'RadCourse',pocus:'PocusCourse',hemo:'HemoCourse',atb:'AtbCourse'};
 const BLOCK='.pocus-q,.pocus-pitfalls,.pocus-refs,.pocus-goals,.pocus-crumb,.pocus-pager,.pocus-done,.info-notice,.lesson-images,.deep-pretest,.deep-exam,.deep-cases,.deep-flow,.deep-recall,.deep-head,.deep-table-wrap,.deep-figures,.deep-figure,.p1-question,.posology-guide,.correl-guide,.study-breadcrumb,.subtle,.kicker,figure,figcaption,table,legend,h1,h2,h3,h4,h5,a,button,summary,label,form';
 const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
 const pattern=v=>v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/a/g,'[aáàâãä]').replace(/e/g,'[eéèêë]').replace(/i/g,'[iíìîï]').replace(/o/g,'[oóòôõö]').replace(/u/g,'[uúùûü]').replace(/c/g,'[cç]').replace(/ /g,'\\s+');
 const terms=new Map(),strict=new Map();
 data.forEach((entry,index)=>{
  for(const term of [entry.t,...(entry.v||[])])if(term)terms.set(norm(term),index);
  for(const term of entry.s||[])if(term)strict.set(term,index);
 });
 const sorted=[...terms.keys()].sort((a,b)=>b.length-a.length);
 const edge=list=>'(^|[^\\p{L}\\p{N}_])('+list.join('|')+')(?=$|[^\\p{L}\\p{N}_])';
 const general=sorted.length?new RegExp(edge(sorted.map(pattern)),'giu'):null;
 const capitals=strict.size?new RegExp(edge([...strict.keys()].map(v=>v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))),'gu'):null;
 const ready=!!(general||capitals);
 function hits(text){
  const found=[];
  for(const rx of [general,capitals]){
   if(!rx)continue;rx.lastIndex=0;let m;
   while((m=rx.exec(text))){
    const index=rx===general?terms.get(norm(m[2])):strict.get(m[2]);
    if(index!==undefined)found.push({index,start:m.index+m[1].length,end:m.index+m[0].length,text:m[2]});
   }
  }
  return found.sort((a,b)=>a.start-b.start||b.end-a.end).filter((x,i,all)=>!all.slice(0,i).some(y=>x.start<y.end&&x.end>y.start));
 }
 let observer=null,rootRef=null,queued=false,inline=null;

 function enabled(){if(inline===null){try{inline=localStorage.getItem(PREF)!=='0';}catch{inline=true;}}return inline;}
 function setEnabled(value){inline=!!value;try{localStorage.setItem(PREF,value?'1':'0');}catch{}}
 function owner(id){
  const course=/^(ecg|rad|pocus|hemo|atb)_(m\d+)$/.exec(id);
  if(course)return {kind:'course',course:course[1],module:course[2],route:'#'+course[1]};
  const topic=/^([a-z0-9]+)_(\d+)$/.exec(id);
  return topic?{kind:'p2',topic:topic[1],chapter:Number(topic[2]),route:'#topic/'+topic[1]}:null;
 }
 function here(target){return !!target&&location.hash.split('/')[0]===target.route.split('/')[0]&&(target.kind!=='p2'||location.hash==='#topic/'+target.topic);}
 function open(index,trigger){
  const entry=data[index];if(!entry)return;
  document.querySelectorAll('.correl-dialog').forEach(old=>{old.close();old.remove();});
  const dialog=document.createElement('dialog');dialog.className='correl-dialog';dialog.setAttribute('aria-labelledby','correl-title');
  dialog.innerHTML=`<header class="correl-dialog-head"><h2 id="correl-title">${escape(entry.t)}</h2><button type="button" class="btn" autofocus>Fechar</button></header>
  <p class="correl-what">${escape(entry.o)}</p><p class="correl-why">${escape(entry.p)}</p>
  <div class="btn-row"><button type="button" class="btn primary" data-correl-go>Abrir aula</button></div>`;
  document.body.appendChild(dialog);
  dialog.querySelector('header button').addEventListener('click',()=>dialog.close());
  dialog.querySelector('[data-correl-go]').addEventListener('click',()=>{dialog.close();go(entry.d);});
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{dialog.remove();if(trigger?.isConnected)trigger.focus({preventScroll:true});},{once:true});
  if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');
 }
 function go(id){
  const target=owner(id);if(!target)return;
  if(target.kind==='course'){
   if(typeof navigate==='function')navigate(target.course);
   const course=window[COURSES[target.course]],index=course&&typeof course.findId==='function'?course.findId(target.module):-1;
   if(index>=0)course.open(index);
  }else if(typeof openTopic==='function'){
   openTopic(target.topic);
   if(window.ui)ui.chapter=target.chapter;
   if(typeof render==='function')render();
  }
  window.scrollTo({top:0,behavior:'instant'});
  document.querySelector('#main-content h1')?.focus({preventScroll:true});
 }
 function nodes(root){
  const list=[],walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
   const parent=node.parentElement;
   if(!parent||!node.textContent.trim())return NodeFilter.FILTER_REJECT;
   if(parent.closest('script,style,code,pre,textarea,input,select,[contenteditable=true],.correl-term,.posology-term,.rx-card'))return NodeFilter.FILTER_REJECT;
   if(parent.closest(BLOCK))return NodeFilter.FILTER_REJECT;
   if(!parent.closest('p,li,dd'))return NodeFilter.FILTER_REJECT;
   return NodeFilter.FILTER_ACCEPT;}});
  let node;while((node=walk.nextNode()))list.push(node);return list;
 }
 /* O estado vem do DOM, não da memória: a aula é re-renderizada várias vezes e os botões
    inseridos antes desaparecem com ela. */
 function state(root){
  const used=new Set(),sections=new Map();
  for(const button of root.querySelectorAll('.correl-term')){
   used.add(Number(button.dataset.correl));
   const section=button.closest('section,article')||root;
   sections.set(section,(sections.get(section)||0)+1);
  }
  return {used,sections,lesson:used.size};
 }
 function scan(root){
  const place=state(root);
  for(const node of nodes(root)){
   if(place.lesson>=MAX_LESSON)return;
   const text=node.textContent;
   const found=hits(text).filter(hit=>{const target=owner(data[hit.index].d);return !place.used.has(hit.index)&&!here(target)&&!(target?.kind==='course'&&target.course==='pocus');});
   if(!found.length)continue;
   const section=node.parentElement.closest('section,article')||root;
   const fragment=document.createDocumentFragment();let offset=0,applied=false;
   for(const hit of found){
    const inSection=place.sections.get(section)||0;
    if(place.lesson>=MAX_LESSON||inSection>=MAX_SECTION)continue;
    fragment.appendChild(document.createTextNode(text.slice(offset,hit.start)));
    const button=document.createElement('button');
    button.type='button';button.className='correl-term';button.dataset.correl=String(hit.index);
    button.textContent=hit.text;
    button.setAttribute('aria-label',hit.text+': ver a correlação com outra aula');
    button.title='Correlação: '+data[hit.index].t;
    fragment.appendChild(button);
    place.used.add(hit.index);place.lesson++;place.sections.set(section,inSection+1);
    offset=hit.end;applied=true;
   }
   if(!applied)continue;
   fragment.appendChild(document.createTextNode(text.slice(offset)));
   node.replaceWith(fragment);
  }
 }
 function collect(root){
  const found=new Map();
  for(const node of nodes(root)){
   for(const hit of hits(node.textContent)){
    const entry=data[hit.index],target=owner(entry.d);
    if(!target||here(target)||found.has(hit.index)||(target.kind==='course'&&target.course==='pocus'))continue;
    found.set(hit.index,entry);
   }
  }
  for(const button of root.querySelectorAll('.correl-term')){const index=Number(button.dataset.correl);if(data[index])found.set(index,data[index]);}
  return [...found.entries()].slice(0,8);
 }
 function label(id){
  const target=owner(id);if(!target)return '';
  if(target.kind!=='course')return 'Aula de Clínica Médica';
  const course=window[COURSES[target.course]],title=course&&typeof course.titleOf==='function'?course.titleOf(target.module):'';
  const names={ecg:'ECG',rad:'Radiologia',pocus:'POCUS',hemo:'Hemograma',atb:'Antibióticos'};
  return names[target.course]+(title?' · '+title:'');
 }
 function guide(root,items){
  const old=root.querySelector('.correl-guide');
  if(!items.length){old?.remove();return;}
  /* Sem assinatura, cada refresh recriaria o painel, o observador veria a mutação e o ciclo
     não pararia mais. */
  const signature=items.map(([index])=>index).join(',')+'|'+(enabled()?'1':'0');
  if(old&&old.dataset.correlKey===signature)return;
  const groups=new Map();
  for(const [index,entry] of items){const list=groups.get(entry.d)||[];list.push({index,entry});groups.set(entry.d,list);}
  const panel=document.createElement('section');panel.className='card pad correl-guide';panel.setAttribute('aria-label','Conexões desta aula');panel.dataset.correlKey=signature;
  panel.innerHTML=`<h3>Este tema se conecta com</h3>
  <p class="correl-guide-lead">Conceitos citados aqui que têm aula própria. Abra para ver a correlação antes de navegar.</p>
  <ul class="correl-guide-list">${[...groups.entries()].slice(0,5).map(([id,list])=>`<li><p class="correl-guide-where">${escape(label(id))}</p><p class="correl-guide-items">${list.map(x=>`<button type="button" data-correl="${x.index}">${escape(x.entry.t)}</button>`).join('')}</p><p class="correl-guide-go"><button type="button" class="btn secondary" data-correl-open="${escape(id)}">Abrir aula</button></p></li>`).join('')}</ul>
  <p class="correl-guide-toggle"><button type="button" class="btn ghost" data-correl-toggle aria-pressed="${enabled()?'true':'false'}">${enabled()?'Desligar marcações no texto':'Ligar marcações no texto'}</button></p>`;
  if(old)old.replaceWith(panel);else{const pager=root.querySelector('.pocus-pager');if(pager)pager.before(panel);else root.append(panel);}
 }
 function refresh(root){
  if(!ready||!data.length||root!==(window.getMain?getMain():document.getElementById('main-content'))||!root.isConnected)return;
  // O OSCE possui glossário e fontes próprios. Um painel global de correlações
  // produz links POCUS irrelevantes ao fim de cada caso e sobrecarrega a tela.
  if((window.ui&&['dashboard','today','notes','sources','banca','prescriptions','osce','pocus'].includes(ui.route))||location.hash.split('/')[0]==='#osce'){
   root.querySelector('.correl-guide')?.remove();return;
  }
  if(enabled())scan(root);
  guide(root,collect(root));
 }
 function afterRender(){
  const root=window.getMain?getMain():document.getElementById('main-content');if(!root)return;
  if(rootRef!==root||!observer){
   observer?.disconnect();
   observer=new MutationObserver(records=>{
    if(records.every(r=>r.target.nodeType===1&&r.target.closest('.correl-guide,.correl-term,.posology-guide,.posology-term,.correl-dialog')))return;
    if(queued)return;queued=true;queueMicrotask(()=>{queued=false;refresh(root);});
   });
   rootRef=root;observer.observe(root,{childList:true,subtree:true});
  }
  refresh(root);
 }
 document.addEventListener('click',event=>{
  const toggle=event.target.closest('[data-correl-toggle]');
  if(toggle){setEnabled(!enabled());const root=window.getMain?getMain():document.getElementById('main-content');if(!enabled())root.querySelectorAll('.correl-term').forEach(b=>b.replaceWith(document.createTextNode(b.textContent)));refresh(root);return;}
  const openLesson=event.target.closest('[data-correl-open]');
  if(openLesson){go(openLesson.dataset.correlOpen);return;}
  const term=event.target.closest('[data-correl]');
  if(term)open(Number(term.dataset.correl),term);
 });
 return {afterRender,open,go,enabled,setEnabled,entries:()=>data.length,detect:text=>[...new Set(hits(String(text)).map(h=>data[h.index].t))]};
})();
