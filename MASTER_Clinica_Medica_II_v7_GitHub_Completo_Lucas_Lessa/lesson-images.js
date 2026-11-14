/* Imagens reais das aulas. Ficam fora do repositório, na tabela privada lesson_images,
   e só são lidas por quem está logado. Sem login ou sem imagens, o bloco não aparece. */
const LessonImages=(()=>{
'use strict';
const cache=new Map();let index=null,indexFor=null,dialog=null;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const auth=()=>window.MASTER_AUTH;
const ready=()=>{const a=auth();return a&&a.user()&&a.client()?a:null;};
function slot(key,cls){return `<section class="${cls||'deep-block'} lesson-images" data-img-key="${esc(key)}" hidden></section>`;}
async function keys(a){
  const uid=a.user().id;
  if(index&&indexFor===uid)return index;
  const {data,error}=await a.client().from('lesson_images').select('keys');
  if(error)return new Set();
  index=new Set((data||[]).flatMap(r=>r.keys||[]));indexFor=uid;cache.clear();return index;
}
async function load(a,key){
  if(cache.has(key))return cache.get(key);
  const {data,error}=await a.client().from('lesson_images').select('id,ord,caption,credit,mime,data').contains('keys',[key]).order('ord');
  if(error)return [];
  cache.set(key,data||[]);return data||[];
}
function markup(rows){
  return `<h4>Imagens reais</h4><p class="subtle">Toque em uma imagem para ampliar. Antes de ler a legenda, diga em voz alta o que você vê.</p><div class="lesson-images-grid">${rows.map((r,i)=>`<figure><button type="button" class="lesson-image-open" data-img-open="${i}" aria-label="Ampliar imagem ${i+1}"><img loading="lazy" decoding="async" alt="${esc(r.caption)}" src="data:${esc(r.mime)};base64,${r.data}"></button><figcaption>${esc(r.caption)}${r.credit?` <small>${esc(r.credit)}.</small>`:''}</figcaption></figure>`).join('')}</div>`;
}
function open(src,caption){
  if(!dialog){dialog=document.createElement('dialog');dialog.className='lesson-image-dialog';dialog.innerHTML='<form method="dialog"><button class="btn" aria-label="Fechar imagem">Fechar</button></form><img alt=""><p></p>';document.body.appendChild(dialog);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});}
  dialog.querySelector('img').src=src;dialog.querySelector('img').alt=caption;dialog.querySelector('p').textContent=caption;
  if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');
}
async function fill(el){
  el.dataset.imgDone='1';
  const a=ready();if(!a){delete el.dataset.imgDone;return;}
  const key=el.dataset.imgKey,set=await keys(a);if(!set.has(key))return;
  const rows=await load(a,key);if(!rows.length||!el.isConnected)return;
  el.innerHTML=markup(rows);el.hidden=false;
  el.addEventListener('click',e=>{const b=e.target.closest('[data-img-open]');if(!b)return;const r=rows[Number(b.dataset.imgOpen)];open(b.querySelector('img').src,r.caption);});
}
function scan(){document.querySelectorAll('[data-img-key]:not([data-img-done])').forEach(fill);}
function init(){
  let queued=false;
  new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;scan();});}).observe(document.body,{childList:true,subtree:true});
  scan();setInterval(scan,4000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
return {slot,scan};
})();
window.LessonImages=LessonImages;
