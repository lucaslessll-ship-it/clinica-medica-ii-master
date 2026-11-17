/* Transições de janelas inspiradas no iOS (sem depender de bibliotecas).
 * A lógica de abrir/salvar/fechar permanece a cargo dos módulos originais.
 * Apenas opacidade e transform são animadas: nada desloca o layout ou a rolagem.
 */
(function () {
  'use strict';
  const running=new WeakMap();
  const enterEase='cubic-bezier(.16,1,.3,1)';
  const exitEase='cubic-bezier(.4,0,.8,.2)';
  const reduced=()=>document.body.classList.contains('reduce-motion') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function frames(kind,enter){
    const sheet=kind==='sheet';
    const from=sheet?'translate3d(28px,0,0) scale(.985)':'translate3d(0,14px,0) scale(.965)';
    const to='translate3d(0,0,0) scale(1)';
    return enter?
      [{opacity:0,transform:from},{opacity:1,transform:to}]:
      [{opacity:1,transform:to},{opacity:0,transform:sheet?'translate3d(20px,0,0) scale(.99)':'translate3d(0,9px,0) scale(.975)'}];
  }
  function targetOf(el,kind){
    return kind==='overlay'?el.querySelector('.hig-dialog')||el:el;
  }
  function cancel(el){
    const old=running.get(el);
    if(!old)return;
    running.delete(el);
    old.cancelled=true;
    old.animations.forEach(a=>{try{a.cancel()}catch{}});
    old.resolve?.(false);
    el.classList.remove('wm-enter','wm-leave');
  }
  function animate(el,{kind='modal',enter=true,onComplete}={}){
    if(!el)return Promise.resolve(false);
    cancel(el);
    const fast=reduced()||typeof el.animate!=='function';
    if(enter){
      if(typeof onComplete==='function')onComplete();
      el.hidden=false;
      el.inert=false;
    }else if(el.hidden || (el.tagName==='DIALOG'&&!el.open)){
      if(typeof onComplete==='function')onComplete();
      return Promise.resolve(true);
    }
    el.dataset.wmKind=kind;
    if(fast){
      el.classList.remove('wm-enter','wm-leave');
      if(!enter&&typeof onComplete==='function')onComplete();
      return Promise.resolve(true);
    }
    const token={cancelled:false,animations:[],resolve:null};
    const promise=new Promise(resolve=>{token.resolve=resolve});
    running.set(el,token);
    el.classList.add(enter?'wm-enter':'wm-leave');
    el.classList.remove(enter?'wm-leave':'wm-enter');
    const duration=enter?kind==='sheet'?350:330:kind==='sheet'?205:190;
    const options={duration,easing:enter?enterEase:exitEase,fill:'both'};
    try {
      token.animations.push(targetOf(el,kind).animate(frames(kind,enter),options));
      if(kind==='overlay'){
        const dim=el.querySelector('.hig-dim');
        if(dim)token.animations.push(dim.animate(
          enter?[{opacity:0},{opacity:1}]:[{opacity:1},{opacity:0}],
          {duration:enter?250:180,easing:enter?enterEase:exitEase,fill:'both'}
        ));
      }
    }catch {
      token.animations.forEach(a=>{try{a.cancel()}catch{}});
      running.delete(el);
      el.classList.remove('wm-enter','wm-leave');
      if(!enter&&typeof onComplete==='function')onComplete();
      token.resolve(true);
      return promise;
    }
    Promise.allSettled(token.animations.map(a=>a.finished)).then(()=>{
      if(running.get(el)!==token || token.cancelled)return;
      running.delete(el);
      token.animations.forEach(a=>{try{a.cancel()}catch{}});
      el.classList.remove('wm-enter','wm-leave');
      if(!enter&&typeof onComplete==='function')onComplete();
      token.resolve(true);
    });
    return promise;
  }
  const show=(el,options={})=>animate(el,{...options,enter:true});
  const hide=(el,options={})=>animate(el,{...options,enter:false,
    onComplete:options.onComplete||(()=>{el.hidden=true})});
  const showDialog=(dialog)=>show(dialog,{kind:'modal',onComplete:()=>{
    if(!dialog.open)dialog.showModal();
  }});
  const hideDialog=(dialog,onClose)=>hide(dialog,{kind:'modal',onComplete:()=>{
    if(dialog.open)dialog.close();
    onClose?.();
  }});
  const isClosing=el=>!!(running.get(el)&&el.classList.contains('wm-leave'));

  window.MasterWindowMotion={show,hide,showDialog,hideDialog,cancel,isClosing,reduced};
})();
