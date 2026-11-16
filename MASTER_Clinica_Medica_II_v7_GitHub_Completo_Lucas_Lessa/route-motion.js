// Entrada animada a cada troca de rota. Síncrono: o estado e o DOM mudam exatamente como antes; só a classe de animação é adicionada depois.
(function(){
 if(typeof window.navigate!=='function')return;
 const original=window.navigate;
 const reduced=()=>document.body.classList.contains('reduce-motion')||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const enter=()=>{const main=document.getElementById('main-content');if(main&&!reduced()&&!document.hidden){main.classList.remove('rm-enter');void main.offsetWidth;main.classList.add('rm-enter');}};
 let lastRoute=location.hash.replace(/^#/,'').split('/')[0];
 window.navigate=function(route,id){const result=original(route,id);lastRoute=location.hash.replace(/^#/,'').split('/')[0];enter();return result;};
 // Voltar/avançar do navegador: anima só quando a rota (parte antes da barra) muda; o hashchange disparado pelo próprio navigate já encontra lastRoute atualizado.
 window.addEventListener('hashchange',()=>{const r=location.hash.replace(/^#/,'').split('/')[0];if(r&&r!==lastRoute&&r!=='main-content')enter();if(r&&r!=='main-content')lastRoute=r;});
 document.getElementById('main-content')?.addEventListener('animationend',e=>{if(e.target===e.currentTarget)e.currentTarget.classList.remove('rm-enter');});
})();
