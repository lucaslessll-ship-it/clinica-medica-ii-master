/* Botão global de subir para o início da página.
   Aparece em qualquer página que tenha rolagem e some quando o botão de
   voltar ao início da aula já está na tela, para não haver dois no mesmo lugar. */
window.ScrollTop=(()=>{
  'use strict';
  const THRESHOLD=360;
  let button=null,pending=false;
  const reducedMotion=()=>document.body.classList.contains('reduce-motion')||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function lessonButtonVisible(){
    const back=document.querySelector('.reading-back');
    return !!back&&!back.hidden&&back.isConnected;
  }
  function update(){
    pending=false;
    if(!button?.isConnected)return;
    const scrolled=window.scrollY||document.documentElement.scrollTop||0;
    button.hidden=scrolled<THRESHOLD||lessonButtonVisible();
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}
  function go(){
    if(button)button.hidden=true;
    window.scrollTo({top:0,behavior:reducedMotion()?'auto':'smooth'});
    const main=document.getElementById('main-content');
    const heading=main?.querySelector('h1, h2');
    if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
    schedule();
  }
  function mount(){
    if(button?.isConnected)return;
    const host=document.querySelector('.app-body')||document.body;
    if(!host)return;
    button=document.createElement('button');
    button.type='button';button.className='scroll-top';button.hidden=true;
    button.setAttribute('aria-label','Subir para o início da página');
    button.title='Subir para o início da página';
    button.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 12 6-6 6 6M12 6v14"/></svg>';
    button.addEventListener('click',go);
    host.append(button);
    schedule();
  }
  function init(){
    mount();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    window.addEventListener('hashchange',schedule);
    let queued=false;
    new MutationObserver(()=>{
      if(queued)return;queued=true;
      requestAnimationFrame(()=>{queued=false;mount();update();});
    }).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  return {update:schedule,go};
})();
