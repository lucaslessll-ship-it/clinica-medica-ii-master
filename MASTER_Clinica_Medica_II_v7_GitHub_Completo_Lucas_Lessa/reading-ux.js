/* Reading aids only: no study scoring, account data or persistence changes. */
window.ReadingUX=(()=>{
  'use strict';
  let lesson=null,sections=null,outline=null,progress=null,back=null,headings=[],pending=false;
  const reducedMotion=()=>document.body.classList.contains('reduce-motion')||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go(target){
    if(!target)return;
    target.scrollIntoView({block:'start',behavior:reducedMotion()?'instant':'smooth'});
    target.focus({preventScroll:true});
  }
  function clear(){
    lesson?.classList.remove('reading-lesson');outline?.remove();back?.remove();
    lesson=null;sections=null;outline=null;progress=null;back=null;headings=[];
  }
  function update(){
    pending=false;
    if(!lesson?.isConnected||!sections?.isConnected)return;
    const topbar=document.querySelector('.topbar'),bar=topbar?.getBoundingClientRect();
    const inset=bar&&bar.bottom>0?Math.max(0,bar.bottom)+20:24;
    const rect=sections.getBoundingClientRect(),available=window.innerHeight-inset;
    const range=rect.height-available;
    const amount=Math.round(Math.max(0,Math.min(1,range>0?(inset-rect.top)/range:rect.bottom<=window.innerHeight?1:0))*100);
    progress.setAttribute('aria-valuenow',String(amount));
    progress.querySelector('.reading-progress-fill').style.width=amount+'%';
    outline.querySelector('.reading-progress-label').textContent=`Posição na aula · ${amount}%`;
    let current=0;headings.forEach((heading,index)=>{if(heading.offsetParent&&heading.getBoundingClientRect().top<=inset+30)current=index;});
    const now=outline.querySelector('.reading-current');if(now)now.textContent=headings[current].textContent.replace(/^[^\p{L}\p{N}]+/u,'').trim();
    outline.querySelectorAll('[data-reading-target]').forEach((button,index)=>{
      if(index===current)button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');
    });
    back.hidden=lesson.querySelector('.lesson-head').getBoundingClientRect().top>=-250;
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}
  function afterRender(){
    const root=document.getElementById('main-content'),head=root?.querySelector('.lesson-head');
    const next=head?.closest('.card'),content=next?.querySelector('.lesson-sections');
    if(!next||!content){clear();return;}
    if(next===lesson&&outline?.isConnected){schedule();return;}
    clear();lesson=next;sections=content;
    headings=[...content.querySelectorAll(':scope > .lesson-block > h3, :scope > .deep-lesson .deep-head h3, :scope > .deep-lesson .deep-block > h4')];
    if(!headings.length){clear();return;}
    lesson.classList.add('reading-lesson');
    outline=document.createElement('div');outline.className='reading-outline';
    const details=document.createElement('details'),summary=document.createElement('summary');
    summary.textContent='Navegar nesta aula';
    const count=document.createElement('span');count.className='reading-outline-count';count.textContent=`${headings.length} seções`;
    const now=document.createElement('span');now.className='reading-current';summary.append(count,now);details.append(summary);
    const nav=document.createElement('nav');nav.className='reading-outline-links';nav.setAttribute('aria-label','Seções desta aula');
    headings.forEach((heading,index)=>{
      heading.id=heading.id||`reading-section-${index+1}`;heading.tabIndex=-1;
      const button=document.createElement('button');button.type='button';button.dataset.readingTarget=heading.id;if(heading.tagName==='H4')button.className='sub';
      button.textContent=heading.textContent.replace(/^[^\p{L}\p{N}]+/u,'').trim();
      button.addEventListener('click',()=>{details.open=false;go(heading);});nav.append(button);
    });
    details.append(nav);outline.append(details);
    const label=document.createElement('span');label.className='reading-progress-label';label.textContent='Posição na aula · 0%';
    progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('role','progressbar');
    progress.setAttribute('aria-label','Posição na leitura da aula');progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax','100');progress.setAttribute('aria-valuenow','0');
    const fill=document.createElement('span');fill.className='reading-progress-fill';progress.append(fill);outline.append(label,progress);
    sections.before(outline);
    back=document.createElement('button');back.type='button';back.className='reading-back';back.hidden=true;
    back.setAttribute('aria-label','Voltar ao início da aula');back.title='Voltar ao início da aula';back.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 12 6-6 6 6M12 6v14"/></svg>';
    back.addEventListener('click',()=>{head.querySelector('h2').tabIndex=-1;go(head.querySelector('h2'));});
    document.querySelector('.app-body').append(back);schedule();
  }
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('master-auth-ended',clear);
  return {afterRender};
})();
