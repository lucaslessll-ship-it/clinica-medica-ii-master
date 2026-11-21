/* Clínica Master · visualizador acessível de figuras de Urgência e Emergência.
   Zoom, arraste, pinça, swipe, teclado, foco e retorno à navegação anterior.
   Não altera estados acadêmicos, modos de foco ou respostas. */
(function(){
 'use strict';
 const selector='.ue-atlas .ue-zoom-trigger img, .ue-pcr-source-figure .ue-zoom-trigger img';
 let root=null,stage=null,image=null,figures=[],index=0,zoom=1,offsetX=0,offsetY=0;
 let oldOverflow='',lastFocus=null,start=null,pinch=null;
 const pointers=new Map();
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const text=x=>String(x??'');
 function findImages(clicked){
  const lesson=clicked.closest('.ue-atlas,.ue-pcr-pilot');
  return Array.from((lesson||document).querySelectorAll(selector)).filter(x=>x.getAttribute('src'));
 }
 function describe(src){
  const fig=src.closest('figure'),title=fig?.querySelector('figcaption strong')?.textContent||'Figura clínica';
  const sub=fig?.querySelector('figcaption span')?.textContent||src.getAttribute('alt')||'';
  return {el:src,src:src.currentSrc||src.src,alt:src.getAttribute('alt')||title,title,sub};
 }
 function limits(){
  if(!stage)return [0,0];
  const w=stage.clientWidth,h=stage.clientHeight;
  return [Math.max(0,(zoom-1)*w*.5),Math.max(0,(zoom-1)*h*.5)];
 }
 function draw(){
  if(!root||!image)return;
  const [mx,my]=limits();
  offsetX=clamp(offsetX,-mx,mx);
  offsetY=clamp(offsetY,-my,my);
  image.style.transform='translate3d('+offsetX+'px,'+offsetY+'px,0) scale('+zoom+')';
  image.style.cursor=zoom>1?'grab':'zoom-in';
  const meter=root.querySelector('[data-meter]');if(meter)meter.textContent=Math.round(zoom*100)+'%';
  const reset=root.querySelector('[data-action="reset"]');if(reset)reset.disabled=zoom===1;
  const minus=root.querySelector('[data-action="minus"]');if(minus)minus.disabled=zoom<=1;
  const plus=root.querySelector('[data-action="plus"]');if(plus)plus.disabled=zoom>=5;
 }
 function setZoom(value){
  zoom=clamp(Math.round(value*100)/100,1,5);
  if(zoom===1){offsetX=0;offsetY=0;}
  draw();
 }
 function show(i){
  if(!root||!figures.length)return;
  index=(i+figures.length)%figures.length;
  const item=figures[index];
  image.src=item.src;
  image.alt=item.alt;
  root.querySelector('[data-title]').textContent=item.title;
  root.querySelector('[data-description]').textContent=item.sub;
  root.querySelector('[data-count]').textContent=(index+1)+' de '+figures.length;
  root.querySelectorAll('[data-action="previous"],[data-action="next"]').forEach(b=>{b.disabled=figures.length<2;});
  pointers.clear();pinch=null;start=null;setZoom(1);
 }
 function close(){
  if(!root)return;
  const el=root;root=null;stage=null;image=null;figures=[];pointers.clear();
  el.remove();document.body.style.overflow=oldOverflow;
  if(lastFocus&&document.contains(lastFocus)&&typeof lastFocus.focus==='function')lastFocus.focus({preventScroll:true});
  lastFocus=null;
 }
 function open(target){
  const sources=findImages(target);
  if(!sources.length)return;
  if(root)close();
  figures=sources.map(describe);
  index=Math.max(0,sources.indexOf(target));
  oldOverflow=document.body.style.overflow;lastFocus=document.activeElement;
  root=document.createElement('div');
  root.className='ue-lightbox';
  root.setAttribute('role','dialog');
  root.setAttribute('aria-modal','true');
  root.setAttribute('aria-label','Visualizador ampliado de imagem clínica');
  root.innerHTML='<div class="ue-lightbox-backdrop" data-action="close"></div>'+
  '<div class="ue-lightbox-dialog">'+
  '<div class="ue-lightbox-toolbar" role="toolbar" aria-label="Controles de imagem">'+
  '<button type="button" data-action="previous" aria-label="Imagem anterior" title="Imagem anterior">‹</button>'+
  '<span data-count class="ue-lightbox-count"></span>'+
  '<span class="ue-lightbox-tools">'+
  '<button type="button" data-action="minus" aria-label="Diminuir zoom">−</button>'+
  '<span data-meter aria-live="off" class="ue-lightbox-meter">100%</span>'+
  '<button type="button" data-action="plus" aria-label="Aumentar zoom">+</button>'+
  '<button type="button" data-action="reset" aria-label="Ajustar imagem à tela">Ajustar</button>'+
  '</span><button type="button" data-action="next" aria-label="Próxima imagem" title="Próxima imagem">›</button>'+
  '<button type="button" data-action="close" aria-label="Fechar imagem" class="ue-lightbox-close">×</button></div>'+
  '<div class="ue-lightbox-stage" tabindex="0" aria-label="Imagem ampliada; use pinça ou controles para zoom">'+
  '<img draggable="false" alt="" /></div>'+
  '<div class="ue-lightbox-caption"><strong data-title></strong><p data-description></p>'+
  '<small>Pinça ou botões para ampliar · arraste para explorar · deslize para trocar de imagem · Esc para fechar</small></div>'+
  '</div>';
  document.body.appendChild(root);document.body.style.overflow='hidden';
  stage=root.querySelector('.ue-lightbox-stage');image=stage.querySelector('img');
  root.addEventListener('click',function(e){
   const btn=e.target.closest('button[data-action]'),overlay=e.target.closest('.ue-lightbox-backdrop');
   if(overlay){close();return;}
   if(!btn||btn.disabled)return;
   const action=btn.dataset.action;
   if(action==='close')close();
   else if(action==='next')show(index+1);
   else if(action==='previous')show(index-1);
   else if(action==='plus')setZoom(zoom*1.4);
   else if(action==='minus')setZoom(zoom/1.4);
   else if(action==='reset')setZoom(1);
  });
  stage.addEventListener('wheel',e=>{e.preventDefault();setZoom(zoom*(e.deltaY<0?1.15:1/1.15));},{passive:false});
  stage.addEventListener('dblclick',e=>{e.preventDefault();setZoom(zoom>1.6?1:2);});
  stage.addEventListener('pointerdown',e=>{
   if(e.button&&e.pointerType==='mouse')return;
   e.preventDefault();
   try{stage.setPointerCapture(e.pointerId);}catch(_){}
   pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
   if(pointers.size===1){start={x:e.clientX,y:e.clientY,offsetX,offsetY};pinch=null;}
   if(pointers.size===2){const p=Array.from(pointers.values());pinch={distance:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)||1,zoom};start=null;}
  });
  stage.addEventListener('pointermove',e=>{
   if(!pointers.has(e.pointerId))return;
   e.preventDefault();pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
   if(pointers.size>1){
    const p=Array.from(pointers.values());
    if(!pinch)pinch={distance:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)||1,zoom};
    setZoom(pinch.zoom*Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)/pinch.distance);
   }else if(start&&zoom>1){
    offsetX=start.offsetX+e.clientX-start.x;
    offsetY=start.offsetY+e.clientY-start.y;
    draw();
   }
  });
  const finish=e=>{
   if(!pointers.has(e.pointerId))return;
   const dx=start?e.clientX-start.x:0,dy=start?e.clientY-start.y:0;
   pointers.delete(e.pointerId);
   if(!pointers.size){
    if(start&&zoom===1&&Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.3&&figures.length>1)show(index+(dx<0?1:-1));
    start=null;pinch=null;
   }else{
    const remaining=Array.from(pointers.values())[0];
    start={x:remaining.x,y:remaining.y,offsetX,offsetY};
    pinch=null;
   }
  };
  stage.addEventListener('pointerup',finish);
  stage.addEventListener('pointercancel',finish);
  image.addEventListener('dragstart',e=>e.preventDefault());
  show(index);
  root.querySelector('.ue-lightbox-close').focus({preventScroll:true});
 }
 document.addEventListener('click',e=>{
  if(!e.target||typeof e.target.closest!=='function')return;
  const btn=e.target.closest('.ue-zoom-trigger');
  if(!btn)return;
  const pic=btn.querySelector('img');
  if(!pic||!pic.closest('.ue-atlas,.ue-pcr-source-figure'))return;
  e.preventDefault();open(pic);
 });
 document.addEventListener('keydown',e=>{
  if(!root)return;
  if(e.key==='Escape'){e.preventDefault();close();return;}
  if(e.key==='ArrowRight'){e.preventDefault();if(figures.length>1)show(index+1);return;}
  if(e.key==='ArrowLeft'){e.preventDefault();if(figures.length>1)show(index-1);return;}
  if(e.key==='+'||e.key==='='){e.preventDefault();setZoom(zoom*1.4);return;}
  if(e.key==='-'){e.preventDefault();setZoom(zoom/1.4);return;}
  if(e.key==='0'){e.preventDefault();setZoom(1);return;}
  if(e.key==='Tab'){
   const focusable=Array.from(root.querySelectorAll('button:not([disabled]),[tabindex="0"]'));
   if(!focusable.length)return;
   const first=focusable[0],last=focusable.at(-1),current=document.activeElement;
   if(e.shiftKey&&current===first){e.preventDefault();last.focus();}
   else if(!e.shiftKey&&current===last){e.preventDefault();first.focus();}
  }
 });
 window.addEventListener('resize',()=>{if(root)draw();});
 window.UEImageViewer={open,close,isOpen:()=>!!root};
})();