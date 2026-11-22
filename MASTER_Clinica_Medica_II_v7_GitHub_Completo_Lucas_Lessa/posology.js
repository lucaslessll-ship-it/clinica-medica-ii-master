/* Referências farmacológicas em toda a leitura. Não registra consultas nem interpreta dados de pacientes. */
window.Posology=(()=>{
 'use strict';
 const config=window.MASTER_POSOLOGY,rx=window.MASTER_RX,escape=escapeHtml;
 let observed=null,observer=null,queued=false,signature='',rootRef=null;
 const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
 const aliases=new Map(),strict=new Map();
 for(const [id,item] of Object.entries(config.entries)){
  for(const alias of item.aliases||[])aliases.set(norm(alias),id);
  for(const alias of item.strictAliases||[])strict.set(alias,id);
 }
 const pattern=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/a/g,'[aáàâãä]').replace(/e/g,'[eéèêë]').replace(/i/g,'[iíìîï]').replace(/o/g,'[oóòôõö]').replace(/u/g,'[uúùûü]').replace(/c/g,'[cç]').replace(/ /g,'\\s+');
 const sorted=[...aliases.keys()].sort((a,b)=>b.length-a.length);
 const general=new RegExp('(^|[^\\p{L}\\p{N}_])('+sorted.map(pattern).join('|')+')(?=$|[^\\p{L}\\p{N}_])','giu');
 const capitals=strict.size?new RegExp('(^|[^\\p{L}\\p{N}_])('+[...strict.keys()].map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')(?=$|[^\\p{L}\\p{N}_])','gu'):null;
 function matches(text,context=text){const found=[];for(const regex of [general,capitals].filter(Boolean)){regex.lastIndex=0;let m;while((m=regex.exec(text))){const id=regex===general?aliases.get(norm(m[2])):strict.get(m[2]);if(id)found.push({id,start:m.index+m[1].length,end:m.index+m[0].length,text:m[2]});}}return found.filter(hit=>{const required=config.entries[hit.id]?.requiresContext;return !required||new RegExp(required,'i').test(norm(context));}).sort((a,b)=>a.start-b.start||b.end-a.end).filter((x,i,a)=>!a.slice(0,i).some(y=>x.start<y.end&&x.end>y.start));}
 function source(id){const item=rx.sources[id];return item?`<a href="${escape(item.url)}" target="_blank" rel="noopener">${escape(item.name)}</a>`:'';}
 function card(id){const item=config.entries[id];if(!item)return '';if(item.type==='class'||item.type==='exposure')return `<article class="posology-class"><h3>${escape(item.name)}</h3><p>${escape(item.note)}</p><p>Abra cada medicamento para entender sua classe farmacológica, mecanismo, segurança e doses por indicação.</p><div class="btn-row">${item.members.filter(key=>config.entries[key]).map(key=>`<button type="button" class="btn secondary" onclick="Posology.open('${key}',this)">${escape(config.entries[key].name)}</button>`).join('')}</div></article>`;return Clinical.card(id);}
 function open(id,trigger){const entry=config.entries[id];if(!entry)return;document.querySelectorAll('.posology-dialog').forEach(old=>{old.close();old.remove();});const dialog=document.createElement('dialog');dialog.className='posology-dialog';dialog.setAttribute('aria-labelledby','posology-title');dialog.innerHTML=`<header class="posology-dialog-head"><h2 id="posology-title">Farmacologia clínica · mecanismos e uso</h2><button type="button" class="btn" autofocus>Fechar</button></header><p class="posology-scope">Entenda o que é, como funciona, quando considerar e quais riscos monitorizar ANTES de consultar a dose. As características de classe não equivalem à revisão individual da bula. A menção na aula ou questão não indica uso automático.</p>${card(id)}`;document.body.appendChild(dialog);dialog.querySelector('header button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{dialog.remove();if(trigger?.isConnected)trigger.focus({preventScroll:true});},{once:true});dialog.showModal();}
 function texts(root){const values=[],walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){const p=node.parentElement;if(!p||!node.textContent.trim()||p.closest('script,style,textarea,input,select,code,pre,[contenteditable=true],.posology-guide,.posology-term,.rx-card'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}});let n;while((n=walk.nextNode()))values.push(n);return values;}
 function contextOf(node){return node.parentElement.closest('p,li,tr,fieldset,.lab-choices,.case-step,section')?.textContent||node.textContent;}
 function collect(root){const ids=new Set();for(const node of texts(root))for(const hit of matches(node.textContent,contextOf(node)))ids.add(hit.id);root.querySelectorAll('[data-posology-id]').forEach(el=>{if(!el.closest('.posology-guide')&&config.entries[el.dataset.posologyId])ids.add(el.dataset.posologyId);});root.querySelectorAll('.rx-card[data-drug]').forEach(el=>{if(config.entries[el.dataset.drug])ids.add(el.dataset.drug);});return [...ids].sort((a,b)=>config.entries[a].name.localeCompare(config.entries[b].name,'pt-BR'));}
 function annotate(root){
  // Uma marcação por medicamento em cada bloco de explicação: permite consultar novamente
  // nas aulas, resumos e comentários de questões, sem cobrir botões/alternativas interativas.
  const visited=new WeakMap();
  const group=node=>node.parentElement.closest('p,li,dd,td,blockquote,.case-step,.question-explanation,.lesson-block')||node.parentElement;
  for(const node of texts(root)){
   if(node.parentElement.closest('form,button,a,summary,label,h1,h2,h3,h4,h5,legend,[role=button]'))continue;
   const scope=group(node);
   if(!scope)continue;
   let used=visited.get(scope);
   if(!used){used=new Set([...scope.querySelectorAll('.posology-term')].map(x=>x.dataset.posologyId));visited.set(scope,used);}
   const hits=matches(node.textContent,contextOf(node)).filter(x=>!used.has(x.id));
   if(!hits.length)continue;
   const fragment=document.createDocumentFragment();let offset=0,added=0;
   for(const hit of hits){
    if(used.has(hit.id))continue;
    fragment.appendChild(document.createTextNode(node.textContent.slice(offset,hit.start)));
    const button=document.createElement('button');button.type='button';button.className='posology-term';
    button.dataset.posologyId=hit.id;button.textContent=hit.text;
    button.title='Farmacologia, riscos e posologia de '+config.entries[hit.id].name;
    button.setAttribute('aria-label',config.entries[hit.id].name+': consultar farmacologia e posologia');
    fragment.appendChild(button);used.add(hit.id);offset=hit.end;added++;
   }
   if(!added)continue;
   fragment.appendChild(document.createTextNode(node.textContent.slice(offset)));node.replaceWith(fragment);
  }
 }
 function refresh(root){if(root!==getMain()||!root.isConnected)return;if(['dashboard','today','notes','sources','banca','prescriptions'].includes(ui.route)){root.querySelector('.posology-guide')?.remove();return;}const ids=collect(root);const key=ui.route+'|'+location.hash+'|'+ids.join(',');const old=root.querySelector('.posology-guide');if(!ids.length){old?.remove();signature=key;return;}if(!old||key!==signature){const panel=document.createElement('details');panel.className='posology-guide';panel.innerHTML=`<summary>Farmacologia dos medicamentos citados <span>${ids.length} ${ids.length===1?'referência citada':'referências citadas'}</span></summary><p>Abra a ficha completa: classe e mecanismo, efeito, indicação, contraindicações, interações e monitorização; só depois consulte dose, via e duração conforme a indicação. Em exercícios, identifique primeiro se há indicação e se existem riscos que mudam a conduta.</p><ul>${ids.map(id=>`<li><button type="button" data-posology-id="${id}">${escape(config.entries[id].name)}${config.entries[id].status==='pending'?' · a confirmar':''}</button></li>`).join('')}</ul>`;if(old)old.replaceWith(panel);else{const crumb=root.querySelector('.study-breadcrumb');if(crumb)crumb.after(panel);else root.prepend(panel);}}signature=key;annotate(root);}
 function afterRender(){const root=getMain();if(rootRef!==root||!observer){observer?.disconnect();observer=new MutationObserver(records=>{if(records.every(r=>r.target.nodeType===1&&r.target.closest('.posology-guide,.posology-term')))return;if(queued)return;queued=true;queueMicrotask(()=>{queued=false;refresh(root);});});rootRef=root;observer.observe(root,{childList:true,subtree:true});}refresh(root);}
 document.addEventListener('click',event=>{const button=event.target.closest?.('[data-posology-id]');if(button)open(button.dataset.posologyId,button);});
 window.addEventListener('master-auth-ended',()=>document.querySelectorAll('.posology-dialog').forEach(d=>{d.close();d.remove();}));
 return {afterRender,open,card,ids:()=>Object.keys(config.entries),detect:text=>[...new Set(matches(text).map(x=>x.id))]};
})();
