/* Local library discovery. Filtering never changes study data or account preferences. */
window.DashboardUX=(()=>{
  'use strict';
  let period='all';
  const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').trim();
  function filter(){
    const root=document.querySelector('.dashboard-subjects');if(!root)return;
    const query=normalize(root.querySelector('#subjects-search').value),words=query.split(/\s+/).filter(Boolean);
    let count=0;
    root.querySelectorAll('[data-subject]').forEach(card=>{const text=normalize(card.dataset.searchText||card.dataset.subjectName);card.hidden=(period!=='all'&&card.dataset.period!==period)||!words.every(word=>text.includes(word));if(!card.hidden)count++;});
    root.querySelectorAll('.subject-group').forEach(group=>group.hidden=![...group.querySelectorAll('[data-subject]')].some(card=>!card.hidden));
    root.querySelectorAll('[data-subject-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.subjectFilter===period)));
    root.querySelector('#subject-results').textContent=count===1?'1 matéria disponível':`${count} matérias disponíveis`;
    root.querySelector('#subject-empty').hidden=count!==0;
  }
  function setPeriod(value){period=['P1','P2'].includes(value)?value:'all';filter();}
  function clear(){period='all';const input=document.getElementById('subjects-search');if(input){input.value='';filter();input.focus();}}
  function showSubjects(){const root=document.querySelector('.dashboard-subjects');if(!root)return;const reduced=document.body.classList.contains('reduce-motion')||matchMedia('(prefers-reduced-motion: reduce)').matches;root.scrollIntoView({block:'start',behavior:reduced?'instant':'smooth'});document.getElementById('subjects-search').focus({preventScroll:true});}
  function afterRender(){if(document.querySelector('.dashboard-subjects')){period='all';filter();}}
  return {filter,setPeriod,clear,showSubjects,afterRender};
})();
