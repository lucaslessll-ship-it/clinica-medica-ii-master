/* Clínica Master · gerenciamento offline para todas as rotas da aplicação. */
(()=>{
 'use strict';
 if(!('serviceWorker' in navigator)||!('caches' in window)||location.protocol!=='https:')return;
 const root=document.createElement('div');root.className='master-offline-widget';
 root.innerHTML='<button type="button" class="master-offline-toggle" aria-expanded="false" aria-controls="master-offline-panel">↓ <span>Offline</span></button><section id="master-offline-panel" class="master-offline-panel" hidden><strong>Estudar sem internet</strong><p id="master-offline-status">Preparando acesso offline…</p><button type="button" id="master-offline-save">Salvar conteúdo aberto</button><button type="button" id="master-offline-clear">Remover downloads offline</button><small>O conteúdo salvo ocupa espaço neste aparelho. Sincronização, login e links externos podem exigir internet.</small></section>';
 document.body.append(root);
 const toggle=root.querySelector('.master-offline-toggle'),panel=root.querySelector('.master-offline-panel'),status=root.querySelector('#master-offline-status');
 toggle.addEventListener('click',()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)refresh();});
 const ready=navigator.serviceWorker.register('./sw.js',{scope:'./'}).then(()=>navigator.serviceWorker.ready).catch(()=>null);
 async function send(type,urls=[]){const reg=await ready,sw=navigator.serviceWorker.controller||reg?.active;if(!sw)return {ok:false};return new Promise(resolve=>{const ch=new MessageChannel();const t=setTimeout(()=>resolve({ok:false}),20000);ch.port1.onmessage=e=>{clearTimeout(t);resolve(e.data||{})};sw.postMessage({type,urls},[ch.port2]);});}
 async function refresh(){const r=await send('STATUS');status.textContent=r.ok?r.count+' arquivo(s) salvo(s) para uso offline. Outros arquivos abertos também podem ficar disponíveis automaticamente.':'Offline ainda não disponível neste navegador.';}
 root.querySelector('#master-offline-save').addEventListener('click',async e=>{
  const button=e.currentTarget;button.disabled=true;status.textContent='Salvando arquivos desta página…';
  const prefix=new URL('./',location.href).pathname;
  const urls=[location.href,...performance.getEntriesByType('resource').map(x=>x.name),...document.querySelectorAll('img[src],video[src],source[src],link[rel="stylesheet"][href],script[src]').values()].map(x=>typeof x==='string'?x:x.src||x.href)]
   .filter(x=>{try{const u=new URL(x,location.href);return u.origin===location.origin&&u.pathname.startsWith(prefix)&&/\.(?:html?|css|js|mjs|json|svg|png|jpe?g|webp|gif|ico|woff2?|pdf)$/i.test(u.pathname)}catch{return false}});
  const r=await send('SAVE',[...new Set(urls)]);status.textContent=r.ok?r.saved+' arquivo(s) salvos'+(r.failed?' · '+r.failed+' indisponíveis':'')+'.':'Não foi possível salvar. Verifique a conexão e o espaço disponível.';button.disabled=false;
 });
 root.querySelector('#master-offline-clear').addEventListener('click',async()=>{const r=await send('CLEAR');status.textContent=r.ok?'Downloads offline removidos. Arquivos temporários do navegador podem permanecer.':'Não foi possível remover os downloads.';});
 window.addEventListener('online',()=>{if(!panel.hidden)refresh();});
 ready.then(()=>{if(!panel.hidden)refresh();});
})();
