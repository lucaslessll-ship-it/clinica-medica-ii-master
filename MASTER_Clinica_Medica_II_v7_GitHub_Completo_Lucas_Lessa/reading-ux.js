/* Reading aids only: no study scoring, account data or persistence changes. */
window.ReadingUX=(()=>{
  'use strict';
  let lesson=null,sections=null,outline=null,progress=null,back=null,headings=[],pending=false,observador=null,conteudoObserver=null;
  const reducedMotion=()=>document.body.classList.contains('reduce-motion')||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go(target){
    if(!target)return;
    if(outline?.isConnected){outline.querySelector('details').open=false;medida=null;medir();}
    if(medida)window.scrollTo({top:Math.max(0,target.getBoundingClientRect().top+window.scrollY-medida.inset),behavior:reducedMotion()?'instant':'smooth'});
    else target.scrollIntoView({block:'start',behavior:reducedMotion()?'instant':'smooth'});
    target.focus({preventScroll:true});
  }
  function clear(){
    lesson?.classList.remove('reading-lesson');outline?.remove();back?.remove();
    lesson=null;sections=null;outline=null;progress=null;back=null;headings=[];
    medida=null;ultimo={};observador?.disconnect();conteudoObserver?.disconnect();
  }
  // Posições medidas uma vez e reaproveitadas: durante a rolagem o quadro
  // só lê scrollY, sem forçar cálculo de layout a cada linha de cabeçalho.
  let medida=null,ultimo={};
  function medir(){
    if(!lesson?.isConnected||!sections?.isConnected){medida=null;return;}
    const alturaIndice=outline.offsetHeight,caixaIndice=outline.getBoundingClientRect(),escala=alturaIndice?caixaIndice.height/alturaIndice:1;
    const inset=(parseFloat(getComputedStyle(outline).top)||0)*escala+caixaIndice.height+16*escala;
    const caixa=sections.getBoundingClientRect(),cabeca=lesson.querySelector('.lesson-head');
    medida={inset,topo:caixa.top+window.scrollY,altura:caixa.height,
      titulos:headings.map(h=>h.offsetParent?h.getBoundingClientRect().top+window.scrollY:Infinity),
      cabeca:cabeca?cabeca.getBoundingClientRect().top+window.scrollY:0};
  }
  function update(){
    pending=false;
    if(!lesson?.isConnected||!sections?.isConnected||!progress||!outline||!back){medida=null;return;}
    if(!medida)medir();
    if(!medida)return;
    const {inset,topo,altura,titulos,cabeca}=medida;
    const disponivel=window.innerHeight-inset,faixa=altura-disponivel;
    const percorrido=window.scrollY+inset-topo;
    const amount=Math.round(Math.max(0,Math.min(1,faixa>0?percorrido/faixa:(topo+altura<=window.scrollY+window.innerHeight?1:0)))*100);
    if(amount!==ultimo.amount){
      ultimo.amount=amount;
      progress.setAttribute('aria-valuenow',String(amount));
      progress.setAttribute('aria-valuetext',amount+'% da aula');
      progress.querySelector('.reading-progress-fill').style.transform='scaleX('+amount/100+')';
    }
    const limite=window.scrollY+inset+30;
    let current=0;for(let i=0;i<titulos.length;i++)if(titulos[i]<=limite)current=i;
    if(current!==ultimo.current){
      ultimo.current=current;
      const agora=outline.querySelector('.reading-current');
      if(agora&&headings[current]){
        // Atualizar o nó existente não acorda os observadores que varrem a aula
        // a cada childList; a barra também mantém sua altura durante o gesto.
        const texto=headings[current].textContent.replace(/^[^\p{L}\p{N}]+/u,'').trim();
        if(agora.firstChild.data!==texto)agora.firstChild.data=texto;
      }
      outline.querySelectorAll('[data-reading-target]').forEach((button,index)=>{
        if(index===current)button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');
      });
    }
    const esconder=cabeca-window.scrollY>=-250;
    if(esconder!==ultimo.esconder){ultimo.esconder=esconder;back.hidden=esconder;}
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}
  function afterRender(){
    const root=document.getElementById('main-content'),head=root?.querySelector('.lesson-head');
    const next=head?.closest('.card'),content=next?.querySelector('.lesson-sections');
    if(!next||!content){clear();return;}
    if(next===lesson&&outline?.isConnected){medida=null;schedule();return;}
    clear();lesson=next;sections=content;
    headings=[...content.querySelectorAll(':scope > .lesson-block > h3, :scope > .deep-lesson .deep-head h3, :scope > .deep-lesson .deep-block > h4')];
    if(!headings.length){clear();return;}
    lesson.classList.add('reading-lesson');
    outline=document.createElement('div');outline.className='reading-outline';
    const details=document.createElement('details'),summary=document.createElement('summary');
    const titulo=document.createElement('span');titulo.className='reading-outline-title';titulo.textContent='Navegar nesta aula';
    const count=document.createElement('span');count.className='reading-outline-count';count.textContent=`${headings.length} seções`;
    const now=document.createElement('span');now.className='reading-current';now.append(document.createTextNode('\u00a0'));summary.append(titulo,count,now);details.append(summary);
    const nav=document.createElement('nav');nav.className='reading-outline-links';nav.setAttribute('aria-label','Seções desta aula');
    headings.forEach((heading,index)=>{
      heading.id=heading.id||`reading-section-${index+1}`;heading.tabIndex=-1;
      const button=document.createElement('button');button.type='button';button.dataset.readingTarget=heading.id;if(heading.tagName==='H4')button.className='sub';
      button.textContent=heading.textContent.replace(/^[^\p{L}\p{N}]+/u,'').trim();
      button.addEventListener('click',()=>{details.open=false;go(heading);});nav.append(button);
    });
    details.append(nav);outline.append(details);
    const label=document.createElement('span');label.className='reading-progress-label';label.textContent='Posição na aula';
    progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('role','progressbar');
    progress.setAttribute('aria-label','Posição na leitura da aula');progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax','100');progress.setAttribute('aria-valuenow','0');
    const fill=document.createElement('span');fill.className='reading-progress-fill';progress.append(fill);outline.append(label,progress);
    sections.before(outline);
    back=document.createElement('button');back.type='button';back.className='reading-back';back.hidden=true;
    back.setAttribute('aria-label','Voltar ao início da aula');back.title='Voltar ao início da aula';back.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 12 6-6 6 6M12 6v14"/></svg>';
    back.addEventListener('click',()=>{head.querySelector('h2').tabIndex=-1;go(head.querySelector('h2'));});
    document.querySelector('.app-body').append(back);
    medida=null;ultimo={};
    if(observador){observador.disconnect();observador.observe(sections);observador.observe(outline);}
    conteudoObserver=new MutationObserver(records=>{if(records.some(r=>!r.target.parentElement?.closest('.reading-outline')&&!r.target.closest?.('.reading-outline')))remedir();});
    conteudoObserver.observe(root,{childList:true,subtree:true});
    schedule();
  }
  const remedir=()=>{medida=null;ultimo={};schedule();};
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',remedir,{passive:true});
  if(typeof ResizeObserver!=='undefined')observador=new ResizeObserver(remedir);
  window.visualViewport?.addEventListener('resize',remedir,{passive:true});
  document.addEventListener('toggle',e=>{if(lesson?.contains(e.target))remedir();},true);
  document.addEventListener('load',e=>{if(lesson?.contains(e.target))remedir();},true);
  document.addEventListener('animationend',e=>{if(e.target.id==='main-content')remedir();});
  document.fonts?.ready.then(remedir);
  window.addEventListener('master-auth-ended',clear);
  return {afterRender};
})();
