/* Régua lateral de seções, complementar ao índice de aulas. Sem alterar conteúdo nem progresso. */
window.SectionRail=(function sectionRailModule(){
 'use strict';
 const ROOT='#main-content';
 const coarse=()=>window.matchMedia('(pointer:coarse)').matches;
 const reduced=()=>document.body.classList.contains('reduce-motion')||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let host=null,tracks=null,tooltip=null,menu=null,toggle=null;
 let targets=[],positions=[],current=-1,pending=false,measurePending=false;
 let observedRoot=null,mo=null,ro=null,routeToken='';
 const clean=s=>String(s||'').replace(/\s+/g,' ').replace(/^[^\p{L}\p{N}]+/u,'').trim();
 function visible(el){
   if(!el.isConnected||!el.getClientRects().length)return false;
   if(el.closest('nav,aside,[hidden],[aria-hidden="true"],.reading-outline,.qhistory,.qnav-filterbox,.lesson-toolbar,.qr-options,.hig-overlay,.modal,.section-rail'))return false;
   const details=el.closest('details:not([open])');if(details&&!el.closest('summary'))return false;
   return !!clean(el.textContent);
 }
 function collect(root){
   if(!root)return [];
   let nodes=[...root.querySelectorAll('h1,h2,h3,h4')].filter(visible).filter(h=>h.tagName!=='H4'||h.closest('.lesson-block,.deep-lesson,.deep-block,.clinical,.section-spaced,.card'));
   const seen=new Set();
   nodes=nodes.filter(h=>{const text=clean(h.textContent);if(seen.has(h)||text.length<3)return false;seen.add(h);return true;});
   if(nodes.length>56){
     const major=nodes.filter(h=>h.matches('h1,h2'));
     const others=nodes.filter(h=>!h.matches('h1,h2'));
     if(major.length>=50){const step=Math.ceil(major.length/50);nodes=major.filter((_,i)=>i%step===0);}
     else{
       const budget=Math.max(0,56-major.length),step=Math.ceil(others.length/Math.max(1,budget));
       const keep=new Set([...major,...others.filter((_,i)=>i%step===0)]);
       nodes=nodes.filter(h=>keep.has(h));
     }
   }
   return nodes;
 }
 function resetPreview(){if(host)host.classList.remove('is-previewing');}
 function preview(idx,element){
   const target=targets[idx];if(!target||!host||!tooltip)return;
   tooltip.textContent=clean(target.textContent).slice(0,185);
   const rect=element.getBoundingClientRect();
   tooltip.style.top=Math.max(64,Math.min(window.innerHeight-92,rect.top+(rect.height/2)-17))+'px';
   host.classList.add('is-previewing');
 }
 function jump(idx){
   const heading=targets[idx];if(!heading?.isConnected)return;
   closeMenu();
   heading.tabIndex=-1;
   heading.scrollIntoView({block:'start',behavior:reduced()?'auto':'smooth'});
   heading.focus({preventScroll:true});
   current=idx;paint();
 }
 function closeMenu(){
   if(!host)return;
   host.classList.remove('menu-open');
   if(toggle)toggle.setAttribute('aria-expanded','false');
 }
 function paint(){
   if(!host?.isConnected)return;
   const buttons=tracks?.children||[];
   for(let i=0;i<buttons.length;i++){
     buttons[i].classList.toggle('active',i===current);
     if(i===current)buttons[i].setAttribute('aria-current','location');
     else buttons[i].removeAttribute('aria-current');
   }
   const items=menu?.querySelectorAll('[data-rail-index]')||[];
   items.forEach(el=>{if(Number(el.dataset.railIndex)===current)el.setAttribute('aria-current','location');else el.removeAttribute('aria-current');});
 }
 function measure(){
   measurePending=false;
   positions=targets.map(h=>h.isConnected?h.getBoundingClientRect().top+window.scrollY:Infinity);
   scrollUpdate();
 }
 function measureSoon(){if(!measurePending){measurePending=true;requestAnimationFrame(measure);}}
 function scrollUpdate(){
   pending=false;
   if(!host?.isConnected||!targets.length)return;
   const cutoff=window.scrollY+Math.min(260,Math.max(115,window.innerHeight*.28));
   let index=0;
   for(let i=0;i<positions.length;i++){if(positions[i]<=cutoff)index=i;else break;}
   if(index!==current){current=index;paint();}
 }
 function scrollSoon(){if(!pending){pending=true;requestAnimationFrame(scrollUpdate);}}
 function createHost(){
   if(host?.isConnected)return;
   host=document.createElement('nav');host.className='section-rail';host.setAttribute('aria-label','Mapa de seções da página');host.hidden=true;
   toggle=document.createElement('button');toggle.type='button';toggle.className='section-rail-toggle';toggle.setAttribute('aria-label','Abrir índice das seções');toggle.setAttribute('aria-expanded','false');toggle.title='Seções desta página';
   toggle.textContent='☷';
   toggle.addEventListener('click',()=>{const opened=host.classList.toggle('menu-open');toggle.setAttribute('aria-expanded',String(opened));resetPreview();});
   tracks=document.createElement('div');tracks.className='section-rail-marks';tracks.setAttribute('role','group');tracks.setAttribute('aria-label','Marcas de seção');
   tooltip=document.createElement('span');tooltip.className='section-rail-preview';tooltip.setAttribute('aria-hidden','true');
   menu=document.createElement('div');menu.className='section-rail-menu';menu.setAttribute('aria-label','Seções da página');
   host.append(toggle,tracks,tooltip,menu);
   document.body.append(host);
   host.addEventListener('keydown',e=>{if(e.key==='Escape'&&host.classList.contains('menu-open')){e.stopPropagation();closeMenu();toggle.focus({preventScroll:true});}});
   document.addEventListener('pointerdown',e=>{if(host?.classList.contains('menu-open')&&!host.contains(e.target))closeMenu();},{passive:true});
 }
 function connectRoot(root){
   if(root===observedRoot)return;
   mo?.disconnect();ro?.disconnect();observedRoot=root;
   if(!root)return;
   let queued=false;
   mo=new MutationObserver(changes=>{
     if(!changes.some(c=>c.type==='childList'&&[...c.addedNodes,...c.removedNodes].some(n=>n.nodeType===1)))return;
     if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;afterRender();});
   });
   mo.observe(root,{childList:true,subtree:true});
   if(typeof ResizeObserver!=='undefined'){
     ro=new ResizeObserver(()=>measureSoon());ro.observe(root);
   }
 }
 function afterRender(){
   const root=document.querySelector(ROOT);
   if(!root||document.documentElement.classList.contains('master-auth-locked')){if(host)host.hidden=true;return;}
   connectRoot(root);
   const list=collect(root),signature=(window.location.hash||'')+'|'+list.map(h=>clean(h.textContent)).join('\u241f');
   if(list.length<2){targets=[];positions=[];if(host)host.hidden=true;routeToken=signature;return;}
   createHost();
   if(signature===routeToken&&list.length===targets.length&&list.every((x,i)=>x===targets[i])){measureSoon();return;}
   routeToken=signature;targets=list;current=-1;host.hidden=false;closeMenu();resetPreview();tracks.replaceChildren();menu.replaceChildren();
   list.forEach((heading,i)=>{
     const label=clean(heading.textContent);
     const mark=document.createElement('button');mark.type='button';mark.className='section-rail-mark';
     mark.dataset.railIndex=String(i);mark.setAttribute('aria-label','Ir à seção: '+label.slice(0,170));
     mark.title=label.slice(0,170);
     mark.addEventListener('pointerenter',()=>preview(i,mark));
     mark.addEventListener('pointerleave',resetPreview);
     mark.addEventListener('focus',()=>preview(i,mark));
     mark.addEventListener('blur',resetPreview);
     mark.addEventListener('click',()=>jump(i));
     tracks.append(mark);
     const button=document.createElement('button');button.type='button';button.className='section-rail-menu-item';button.dataset.railIndex=String(i);
     button.textContent=label;button.addEventListener('click',()=>jump(i));
     menu.append(button);
   });
   measureSoon();
 }
 window.addEventListener('scroll',scrollSoon,{passive:true});
 window.addEventListener('resize',measureSoon,{passive:true});
 window.addEventListener('orientationchange',measureSoon,{passive:true});
 window.visualViewport?.addEventListener('resize',measureSoon,{passive:true});
 window.visualViewport?.addEventListener('scroll',measureSoon,{passive:true});
 document.addEventListener('toggle',e=>{if(document.querySelector(ROOT)?.contains(e.target))requestAnimationFrame(afterRender);},true);
 window.addEventListener('master-auth-ended',()=>{if(host)host.hidden=true;targets=[];routeToken='';});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',afterRender);
 else requestAnimationFrame(afterRender);
 return {afterRender,refresh:afterRender,go:jump};
})();
