/* Laboratório Master dentro do site: a aula (laboratorio-master/microcitose) abre na própria rota,
   com o menu, o tema e a barra de progresso do MASTER, sem sair da plataforma. */
window.LabMasterEmbed=(()=>{
 'use strict';
 const SRC='laboratorio-master/microcitose/index.html',VERSION='20261116-posologia2';
 let bound=false;
 const frame=()=>document.getElementById('lab-master-frame');
 const theme=()=>document.body.dataset.theme==='dark'?'dark':'light';
 function page(){
  return header('LABORATÓRIO','Laboratório <em>Master</em>','Aula aprofundada de anemia microcítica: fisiologia, padrões laboratoriais, microscopia, laudos interativos, casos e prova de domínio. O progresso é salvo automaticamente na sua conta.')
   +`<div class="card lab-embed"><iframe id="lab-master-frame" class="lab-embed-frame" title="Laboratório Master: anemia microcítica" src="${SRC}?embed=1&theme=${theme()}&v=${VERSION}" scrolling="no"></iframe></div><p class="subtle lab-embed-note">Prefere tela cheia? <a href="${SRC}" target="_blank" rel="noopener">Abrir em outra aba</a>.</p>`;
 }
 function post(message){try{frame()?.contentWindow?.postMessage({labMasterHost:true,...message},location.origin);}catch{}}
 function viewport(){const f=frame();if(f)post({vp:{top:Math.max(0,-f.getBoundingClientRect().top),h:window.innerHeight}});}
 function afterRender(){
  if(bound)return;bound=true;
  window.addEventListener('message',event=>{
   const f=frame();if(!f||event.source!==f.contentWindow||event.origin!==location.origin||!event.data||event.data.labMaster!==true)return;
   if(Number.isFinite(event.data.h))f.style.height=Math.max(480,Math.ceil(event.data.h))+'px';
   if(event.data.top){const reduce=document.body.classList.contains('reduce-motion')||window.matchMedia('(prefers-reduced-motion: reduce)').matches;window.scrollTo({top:Math.max(0,window.scrollY+f.closest('.lab-embed').getBoundingClientRect().top-72),behavior:reduce?'instant':'smooth'});}
   if(event.data.ready){post({theme:theme()});viewport();}
  });
  window.addEventListener('scroll',()=>requestAnimationFrame(viewport),{passive:true});
  window.addEventListener('resize',viewport);
  new MutationObserver(()=>post({theme:theme()})).observe(document.body,{attributes:true,attributeFilter:['data-theme']});
 }
 return {page,afterRender};
})();
