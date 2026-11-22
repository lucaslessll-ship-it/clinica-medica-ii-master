/* Clínica Master · OSCE contextual UI.
   Vanilla JS, sem bibliotecas externas, com posicionamento responsivo e respeito à acessibilidade. */
window.OSCEContext = (()=>{
 'use strict';
 let current=null,sequence=0;
 const reducedMotion=()=>{
  if(typeof document==='undefined')return true;
  return !!document.body?.classList.contains('reduce-motion') ||
   !!window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
 };
 function close(restoreFocus=false){
  if(!current)return;
  const {panel,anchor,onOutside,onEscape,onViewport,observer}=current;
  observer?.disconnect();
  current=null;
  document.removeEventListener('pointerdown',onOutside,true);
  document.removeEventListener('keydown',onEscape,true);
  window.removeEventListener('scroll',onViewport,true);
  window.removeEventListener('resize',onViewport);
  window.visualViewport?.removeEventListener?.('resize',onViewport);
  anchor?.setAttribute?.('aria-expanded','false');
  anchor?.removeAttribute?.('aria-controls');
  if(panel.isConnected)panel.remove();
  if(restoreFocus&&anchor?.isConnected)anchor.focus({preventScroll:true});
 }
 function position(){
  if(!current)return;
  const {panel,anchor}=current;
  if(!anchor.isConnected){close();return;}
  const rect=anchor.getBoundingClientRect(),w=Math.max(320,window.innerWidth||320);
  panel.classList.toggle('is-sheet',w<=620);
  panel.style.left='';panel.style.right='';panel.style.top='';panel.style.bottom='';panel.style.width='';
  if(w<=620){
   panel.style.left='12px';panel.style.right='12px';
   panel.style.bottom='calc(12px + env(safe-area-inset-bottom, 0px))';
   return;
  }
  const width=Math.min(368,w-28),vw=window.visualViewport?.width||window.innerWidth;
  panel.style.width=width+'px';
  const x=Math.min(Math.max(14,rect.left),Math.max(14,vw-width-14));
  const pageHeight=window.visualViewport?.height||window.innerHeight;
  const height=panel.getBoundingClientRect().height;
  const below=pageHeight-rect.bottom,above=rect.top;
  const openUp=below<height+14&&above>below;
  const y=openUp?Math.max(12,rect.top-height-10):Math.min(Math.max(12,rect.bottom+10),Math.max(12,pageHeight-height-12));
  panel.style.left=x+'px';panel.style.top=y+'px';
 }
 function open(anchor,detail){
  if(typeof document==='undefined'||!anchor?.isConnected||!detail?.name)return false;
  if(current?.anchor===anchor){close(true);return true;}
  close(false);
  const panel=document.createElement('aside');
  panel.className='osce-context-popover';
  panel.setAttribute('role','dialog');
  panel.setAttribute('aria-modal','false');
  panel.setAttribute('aria-label','Definição de '+detail.name);
  panel.id='osce-context-'+(++sequence);
  const top=document.createElement('div');top.className='osce-context-heading';
  const heading=document.createElement('strong');heading.textContent=detail.name;
  heading.id=panel.id+'-title';panel.setAttribute('aria-labelledby',heading.id);
  const dismiss=document.createElement('button');dismiss.type='button';dismiss.className='osce-context-close';
  dismiss.setAttribute('aria-label','Fechar definição e voltar ao termo');dismiss.textContent='×';
  top.append(heading,dismiss);
  const text=document.createElement('p');text.textContent=detail.definition||'Definição indisponível nesta estação.';
  panel.append(top,text);
  if(detail.url){
   try{
    const u=new URL(detail.url,window.location.href);
    if(u.protocol==='https:'){
     const a=document.createElement('a');a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';
     a.className='osce-context-source';a.textContent='Conferir fonte · '+(detail.sourceLabel||'diretriz');
     panel.append(a);
    }
   }catch{}
  }
  anchor.setAttribute('aria-expanded','true');
  anchor.setAttribute('aria-controls',panel.id);
  const onOutside=e=>{if(!panel.contains(e.target)&&!anchor.contains(e.target))close(false);};
  const onEscape=e=>{if(e.key==='Escape'){e.preventDefault();close(true);}};
  const onViewport=()=>position();
  current={panel,anchor,onOutside,onEscape,onViewport};
  const host=anchor.closest?.('.osce-app-shell')?.parentElement;
  if(host&&typeof MutationObserver!=='undefined'){
   const observer=new MutationObserver(()=>{if(!anchor.isConnected)close(false);});
   observer.observe(host,{childList:true});current.observer=observer;
  }
  dismiss.addEventListener('click',()=>close(true));
  document.body.append(panel);
  document.addEventListener('pointerdown',onOutside,true);
  document.addEventListener('keydown',onEscape,true);
  window.addEventListener('scroll',onViewport,true);
  window.addEventListener('resize',onViewport);
  window.visualViewport?.addEventListener?.('resize',onViewport);
  position();
  if(!reducedMotion()&&panel.animate){
   panel.animate([{opacity:0,transform:'translateY(6px) scale(.985)'},{opacity:1,transform:'translateY(0px) scale(1)'}],
    {duration:190,easing:'cubic-bezier(.22,1,.36,1)'});
  }
  dismiss.focus({preventScroll:true});
  return true;
 }
 function enter(node,kind){
  if(!node||reducedMotion()||typeof node.animate!=='function')return;
  if(!['top','case','question','levels'].includes(kind))return;
  node.animate([{opacity:.72,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],
    {duration:210,easing:'cubic-bezier(.22,1,.36,1)'});
 }
 if(typeof window.addEventListener==='function'){
  window.addEventListener('hashchange',()=>close(false));
  window.addEventListener('popstate',()=>close(false));
 }
 return {open,close,enter,reducedMotion};
})();