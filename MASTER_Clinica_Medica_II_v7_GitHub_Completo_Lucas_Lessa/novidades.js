/* Apresentações de recursos: privadas por conta, versionadas e sem cobrir controles. */
(() => {
 'use strict';
 const features=new Map();
 function remove(){document.querySelectorAll('.feature-intro').forEach(el=>el.remove());}
 function card(feature,host){
  remove();const box=document.createElement('section');box.className='feature-intro';box.setAttribute('role','region');box.setAttribute('aria-label','Apresentação de novo recurso');box.dataset.feature=feature.id;
  const close=document.createElement('button');close.type='button';close.className='feature-intro-close';close.textContent='×';close.setAttribute('aria-label','Fechar apresentação');
  const label=document.createElement('small');label.textContent='NOVO RECURSO';
  const title=document.createElement('h2');title.textContent=feature.title;
  const description=document.createElement('p');description.textContent=feature.description;
  const actions=document.createElement('div');actions.className='feature-intro-actions';
  const explore=document.createElement('button');explore.type='button';explore.className='btn primary';explore.textContent=feature.actionLabel||'Conhecer recurso';
  const later=document.createElement('button');later.type='button';later.className='btn secondary';later.textContent='Agora não';
  function dismiss(){HIG.novidadeVista(feature.id,true);box.remove();}
  close.addEventListener('click',dismiss);later.addEventListener('click',dismiss);
  explore.addEventListener('click',()=>{dismiss();feature.explore?.();});
  actions.append(explore,later);box.append(close,label,title,description,actions);const intro=host.querySelector('.ed-dashboard-intro');if(intro)intro.after(box);else host.prepend(box);
 }
 function panelHelp(){const panel=document.getElementById('caderno-painel');if(!panel||panel.hidden)return;const header=panel.querySelector('.caderno-painel-topo');if(!header.querySelector('.feature-help')){const help=document.createElement('button');help.type='button';help.className='feature-help';help.textContent='?';help.setAttribute('aria-label','Como usar meu caderno');help.addEventListener('click',()=>show('caderno-2026-11',true));header.append(help);}}
 function show(id,force=false){const feature=features.get(id);if(!feature||document.documentElement.classList.contains('master-auth-locked')||(!force&&HIG.novidadeVista(id)))return;const panel=document.getElementById('caderno-painel');const host=panel&&!panel.hidden?panel.querySelector('.caderno-painel-scroll'):document.getElementById('main-content');if(host)card(feature,host);}
 function automatic(){if(document.documentElement.classList.contains('master-auth-locked'))return;if(document.querySelector('.dashboard-hero,.ed-dashboard-intro')&&scrollY<80&&!document.activeElement?.closest('input,textarea,[contenteditable="true"]')&&!document.querySelector('.feature-intro')){const next=[...features.values()].find(f=>!HIG.novidadeVista(f.id));if(next)show(next.id);}}
 function register(feature){if(!feature?.id||!feature.title)return;features.set(feature.id,feature);}
 register({id:'caderno-2026-11',title:'Suas ideias, em um só caderno.',description:'Selecione um trecho da aula para destacar ou comentar. Formate suas notas com negrito, sublinhado e listas. Use Meu caderno no cabeçalho ou Caderno na navegação inferior para reunir registros por aula e voltar ao trecho.',actionLabel:'Conhecer meu caderno',explore(){const panel=document.getElementById('caderno-painel');if(!panel||panel.hidden)window.CadernoUnificado?.abrirPainel();panelHelp();}});
 function init(){
  new MutationObserver(automatic).observe(document.getElementById('main-content'),{childList:true});
  new MutationObserver(automatic).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  addEventListener('master-auth-ready',()=>queueMicrotask(automatic));addEventListener('master-auth-ended',remove);
  document.addEventListener('click',event=>{if(event.target.closest('#caderno-atalho-topo')){panelHelp();const panel=document.getElementById('caderno-painel');if(panel&&!panel.hidden)show('caderno-2026-11');}});
  automatic();
 }
 window.Novidades={register,show};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
