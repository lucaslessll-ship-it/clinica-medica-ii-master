/* Imagens reais das aulas. Ficam fora do repositório, na tabela privada lesson_images,
   e só são lidas por quem está logado. Sem login ou sem imagens, o bloco não aparece. */
const LessonImages=(()=>{
'use strict';
const cache=new Map();let index=null,indexFor=null,dialog=null,account=null,clientFor=null,generation=0,ended=false;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const auth=()=>window.MASTER_AUTH;
function clear(){
  generation++;cache.clear();index=null;indexFor=null;account=null;clientFor=null;
  if(dialog){if(dialog.open&&typeof dialog.close==='function')dialog.close();dialog.remove();dialog=null;}
  document.querySelectorAll('[data-img-key]').forEach(el=>{el.hidden=true;el.replaceChildren();el.onclick=null;delete el.dataset.imgDone;});
}
function ready(){
  const a=auth(),user=a&&a.user(),client=a&&a.client();
  if(ended||!user||!client){if(account!==null)clear();return null;}
  if(account!==user.id||clientFor!==client){clear();account=user.id;clientFor=client;}
  return {uid:user.id,client,generation};
}
function current(scope){const a=auth();return !ended&&scope.generation===generation&&a&&a.user()?.id===scope.uid&&a.client()===scope.client;}
function slot(key,cls){return `<section class="${cls||'deep-block'} lesson-images" data-img-key="${esc(key)}" hidden></section>`;}
async function keys(scope){
  const uid=scope.uid;
  if(index&&indexFor===uid)return index;
  const {data,error}=await scope.client.from('lesson_images').select('keys');
  if(error||!current(scope))return new Set();
  index=new Set((data||[]).flatMap(r=>r.keys||[]));indexFor=uid;cache.clear();return index;
}
function image(row){
  if(!row||typeof row.data!=='string')return null;
  const mime=String(row.mime||'').trim().toLowerCase(),data=row.data.replace(/\s/g,'');
  if(!['image/jpeg','image/png','image/webp','image/gif','image/avif'].includes(mime)||!data||!/^[A-Za-z0-9+/]+={0,2}$/.test(data)||data.length%4===1||(data.includes('=')&&data.length%4!==0))return null;
  const normalized=data+'='.repeat((4-data.length%4)%4);
  try{atob(normalized);}catch{return null;}
  return {...row,mime,data:normalized,caption:String(row.caption||'Imagem da aula'),credit:String(row.credit||'')};
}
async function load(scope,key){
  if(cache.has(key))return cache.get(key);
  const {data,error}=await scope.client.from('lesson_images').select('id,ord,caption,credit,mime,data').contains('keys',[key]).order('ord');
  if(error||!current(scope))return [];
  const rows=(Array.isArray(data)?data:[]).map(image).filter(Boolean);
  cache.set(key,rows);return rows;
}
function markup(rows){
  return `<h4>Imagens reais</h4><p class="subtle">Toque em uma imagem para ampliar. Antes de ler a legenda, diga em voz alta o que você vê.</p><div class="lesson-images-grid">${rows.map((r,i)=>`<figure><button type="button" class="lesson-image-open" data-img-open="${i}" aria-label="Ampliar imagem ${i+1}"><img loading="lazy" decoding="async" alt="${esc(r.caption)}" src="data:${esc(r.mime)};base64,${esc(r.data)}"></button><figcaption>${esc(r.caption)}${r.credit?` <small>${esc(r.credit)}.</small>`:''}</figcaption></figure>`).join('')}</div>`;
}
function open(src,caption){
  if(!dialog){dialog=document.createElement('dialog');dialog.className='lesson-image-dialog';dialog.innerHTML='<form method="dialog"><button class="btn" aria-label="Fechar imagem">Fechar</button></form><img alt=""><p></p>';document.body.appendChild(dialog);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});}
  dialog.querySelector('img').src=src;dialog.querySelector('img').alt=caption;dialog.querySelector('p').textContent=caption;
  if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');
}
async function fill(el,scope){
  el.dataset.imgDone='1';
  try{
    const key=el.dataset.imgKey,set=await keys(scope);if(!current(scope)||!set.has(key))return;
    const rows=await load(scope,key);if(!current(scope)||!rows.length||!el.isConnected)return;
    el.innerHTML=markup(rows);el.hidden=false;
    el.onclick=e=>{const b=e.target.closest('[data-img-open]');if(!b||!current(scope))return;const r=rows[Number(b.dataset.imgOpen)];if(r)open(b.querySelector('img').src,r.caption);};
  }catch{if(current(scope))delete el.dataset.imgDone;}
}
function scan(){const scope=ready();if(scope)document.querySelectorAll('[data-img-key]:not([data-img-done])').forEach(el=>fill(el,scope));}
function init(){
  let queued=false;
  new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;scan();});}).observe(document.body,{childList:true,subtree:true});
  scan();setInterval(scan,4000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.addEventListener('master-auth-ended',()=>{ended=true;clear();});
window.addEventListener('master-auth-ready',()=>{ended=false;clear();scan();});
return {slot,scan};
})();
window.LessonImages=LessonImages;
