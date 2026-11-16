/* Modo embutido: a página do Laboratório Master roda dentro do site (iframe do mesmo domínio),
   sem barra lateral própria. Avisa a altura ao site, recebe o tema e a posição de rolagem. */
(()=>{
 'use strict';
 const root=document.documentElement;
 if(!root.classList.contains('embed'))return;
 const host=window.parent,shell=document.querySelector('.shell');
 const send=m=>{try{host.postMessage({labMaster:true,...m},location.origin);}catch{}};
 const apply=t=>document.body.classList.toggle('dark',t==='dark');
 apply(new URLSearchParams(location.search).get('theme'));
 let last=0;
 const size=()=>{const h=Math.ceil(shell.getBoundingClientRect().height);if(h&&h!==last){last=h;send({h});}};
 new ResizeObserver(size).observe(shell);
 window.addEventListener('load',size);
 const scrollTo=window.scrollTo.bind(window);
 window.scrollTo=(...args)=>{send({top:true});scrollTo(...args);};
 window.addEventListener('message',e=>{
  if(e.source!==host||e.origin!==location.origin||!e.data||e.data.labMasterHost!==true)return;
  if(e.data.theme)apply(e.data.theme);
  if(e.data.vp){root.style.setProperty('--vp-top',e.data.vp.top+'px');root.style.setProperty('--vp-h',e.data.vp.h+'px');}
 });
 send({ready:true});size();
})();
