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
  const {data,error}=await a.client().from('lesson_images').select('id,ord,caption,credit,mime,data,marks').contains('keys',[key]).order('ord');
  if(error)return [];
  cache.set(key,data||[]);return data||[];
}
const num=v=>Math.max(0,Math.min(100,Number(v)||0));
function overlay(marks){
  if(!Array.isArray(marks)||!marks.length)return '';
  const lines=marks.filter(m=>m&&m.x!=null).map(m=>`<line x1="${num(m.lx)}" y1="${num(m.ly)}" x2="${num(m.x)}" y2="${num(m.y)}"/>`).join('');
  const parts=marks.map(m=>{if(!m)return '';let h='';
    if(m.x!=null)h+=`<i class="lesson-mark-tip" style="left:${num(m.x)}%;top:${num(m.y)}%"></i>`;
    if(Array.isArray(m.e))h+=`<i class="lesson-mark-ring" style="left:${num(m.e[0]-m.e[2])}%;top:${num(m.e[1]-m.e[3])}%;width:${num(m.e[2]*2)}%;height:${num(m.e[3]*2)}%"></i>`;
    if(m.t)h+=`<b class="lesson-mark-label${num(m.lx)>66?' at-end':num(m.lx)<34?' at-start':''}" style="left:${num(m.lx)}%;top:${num(m.ly)}%">${esc(m.t)}</b>`;
    return h;}).join('');
  return `<span class="lesson-marks" hidden aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none">${lines}</svg>${parts}</span>`;
}
function markup(rows){
  return `<h4>Imagens reais</h4><p class="subtle">Toque em uma imagem para ampliar. Antes de ler a legenda ou tocar em Mostrar achados, diga em voz alta o que você vê.</p><div class="lesson-images-grid">${rows.map((r,i)=>`<figure><button type="button" class="lesson-image-open" data-img-open="${i}" aria-label="Ampliar imagem ${i+1}"><img loading="lazy" decoding="async" alt="${esc(r.caption)}" src="data:${esc(r.mime)};base64,${r.data}">${overlay(r.marks)}</button>${Array.isArray(r.marks)&&r.marks.length?`<button type="button" class="btn lesson-marks-toggle" data-img-marks="${i}" aria-pressed="false">Mostrar achados</button>`:''}<figcaption>${esc(r.caption)}${r.credit?` <small>${esc(r.credit)}.</small>`:''}</figcaption></figure>`).join('')}</div>`;
}
function open(src,caption,marks,shown){
  if(!dialog){dialog=document.createElement('dialog');dialog.className='lesson-image-dialog';dialog.innerHTML='<form method="dialog"><button class="btn" aria-label="Fechar imagem">Fechar</button></form><div class="lesson-image-stage"><img alt=""></div><p></p>';document.body.appendChild(dialog);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});}
  dialog.querySelector('img').src=src;dialog.querySelector('img').alt=caption;dialog.querySelector('p').textContent=caption;dialog.querySelectorAll('.lesson-marks').forEach(n=>n.remove());if(marks){dialog.querySelector('.lesson-image-stage').insertAdjacentHTML('beforeend',overlay(marks));const o=dialog.querySelector('.lesson-marks');if(o)o.hidden=!shown;}
  if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');
}
async function fill(el){
  el.dataset.imgDone='1';
  const a=ready();if(!a){delete el.dataset.imgDone;return;}
  const key=el.dataset.imgKey,set=await keys(a);if(!set.has(key))return;
  const rows=await load(a,key);if(!rows.length||!el.isConnected)return;
  el.innerHTML=markup(rows);el.hidden=false;
  el.addEventListener('click',e=>{const t=e.target.closest('[data-img-marks]');if(t){const o=t.closest('figure').querySelector('.lesson-marks'),on=o.hidden;o.hidden=!on;t.setAttribute('aria-pressed',String(on));t.textContent=on?'Ocultar achados':'Mostrar achados';return;}const b=e.target.closest('[data-img-open]');if(!b)return;const r=rows[Number(b.dataset.imgOpen)],o=b.querySelector('.lesson-marks');open(b.querySelector('img').src,r.caption,r.marks,!!o&&!o.hidden);});
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
