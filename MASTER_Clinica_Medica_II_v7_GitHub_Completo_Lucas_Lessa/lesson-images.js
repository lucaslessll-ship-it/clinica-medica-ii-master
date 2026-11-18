/* Imagens reais das aulas. Ficam fora do repositório, na tabela privada lesson_images,
   e só são lidas por quem está logado. Sem login ou sem imagens, o bloco não aparece. */
const LessonImages=(()=>{
'use strict';
const cache=new Map(),pending=new Map();let indexPending=null,index=null,indexFor=null,dialog=null,account=null,clientFor=null,generation=0,ended=false;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const auth=()=>window.MASTER_AUTH;
function clear(){
  generation++;cache.clear();pending.clear();indexPending=null;index=null;indexFor=null;account=null;clientFor=null;
  document.querySelectorAll('[data-clinical-schematic]').forEach(el=>{el.hidden=true;el.open=false;});
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
function slot(key,cls,exclude=[],captions={},options={}){return `<section class="${cls||'deep-block'} lesson-images" data-img-key="${esc(key)}"${exclude.length?` data-img-exclude="${esc(JSON.stringify(exclude))}"`:''} data-img-captions="${esc(JSON.stringify(captions))}" data-img-options="${esc(JSON.stringify(options))}" hidden></section>`;}
async function keys(scope){
  const uid=scope.uid;
  if(index&&indexFor===uid)return index;
  if(indexPending)return indexPending;
  const task=(async()=>{
    const {data,error}=await scope.client.from('lesson_images').select('keys');
    if(error||!current(scope))return new Set();
    index=new Set((data||[]).flatMap(r=>r.keys||[]));indexFor=uid;return index;
  })();indexPending=task;
  try{return await task;}finally{if(indexPending===task)indexPending=null;}
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
  if(pending.has(key))return pending.get(key);
  const task=(async()=>{
    const {data,error}=await scope.client.from('lesson_images').select('id,ord,caption,credit,mime,data,marks').contains('keys',[key]).order('ord');
    if(error||!current(scope))return [];
    const rows=(Array.isArray(data)?data:[]).map(image).filter(Boolean);cache.set(key,rows);return rows;
  })();pending.set(key,task);
  try{return await task;}finally{if(pending.get(key)===task)pending.delete(key);}
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
function markup(rows,options={}){
  return `<h4>${esc(options.title||"Imagens da aula")}</h4><p class="subtle">Toque em uma imagem para ampliar. Antes de ler a legenda ou tocar em Mostrar achados, diga em voz alta o que você vê.</p><div class="lesson-images-grid">${rows.map((r,i)=>`<figure><button type="button" class="lesson-image-open" data-img-open="${i}" aria-label="Ampliar imagem ${i+1}"><img loading="${Array.isArray(options.include)?'eager':'lazy'}" decoding="async" alt="${esc(r.caption)}" src="data:${esc(r.mime)};base64,${esc(r.data)}">${overlay(r.marks)}</button>${Array.isArray(r.marks)&&r.marks.length?`<button type="button" class="btn lesson-marks-toggle" data-img-marks="${i}" aria-pressed="false">Mostrar achados</button>`:''}<figcaption>${esc(r.caption)}${r.credit?` <small>${esc(r.credit)}.</small>`:''}</figcaption></figure>`).join('')}</div>`;
}
function open(src,caption,marks,shown){
  if(!dialog){dialog=document.createElement('dialog');dialog.className='lesson-image-dialog';dialog.innerHTML='<form method="dialog"><button class="btn" aria-label="Fechar imagem">Fechar</button></form><div class="lesson-image-stage"><img alt=""></div><p></p>';document.body.appendChild(dialog);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});}
  dialog.querySelector('img').src=src;dialog.querySelector('img').alt=caption;dialog.querySelector('p').textContent=caption;dialog.querySelectorAll('.lesson-marks').forEach(n=>n.remove());if(marks){dialog.querySelector('.lesson-image-stage').insertAdjacentHTML('beforeend',overlay(marks));const o=dialog.querySelector('.lesson-marks');if(o)o.hidden=!shown;}
  if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');
}
async function fill(el,scope){
  el.dataset.imgDone='1';
  try{
    const key=el.dataset.imgKey,set=await keys(scope);if(!current(scope)||!set.has(key))return;
    let exclude=[];try{const value=JSON.parse(el.dataset.imgExclude||'[]');if(Array.isArray(value))exclude=value;}catch{}
    let captions={};try{const value=JSON.parse(el.dataset.imgCaptions||'{}');if(value&&typeof value==='object'&&!Array.isArray(value))captions=value;}catch{}
    let options={};try{options=JSON.parse(el.dataset.imgOptions||'{}')||{};}catch{}
    const rows=(await load(scope,key)).filter(row=>!exclude.includes(row.id)&&(!Array.isArray(options.include)||options.include.includes(row.id))).map(row=>Object.hasOwn(captions,row.id)&&typeof captions[row.id]==='string'?{...row,caption:captions[row.id]}:row);if(!current(scope)||!rows.length||!el.isConnected)return;
    if(Array.isArray(options.include))rows.sort((a,b)=>options.include.indexOf(a.id)-options.include.indexOf(b.id));
    el.innerHTML=markup(rows,options);el.hidden=false;
    const comparison=el.closest('[data-clinical-comparison]');
    if(comparison){
      // O mapa só fica disponível após TODOS os exemplos reais deste par decodificarem.
      const slots=[...comparison.querySelectorAll('[data-img-key]')];
      Promise.all(slots.map(async slot=>{
        let expected=[];try{expected=JSON.parse(slot.dataset.imgOptions||'{}').include||[];}catch{}
        if(slot.hidden||!slot.querySelector('img')||(expected.length&&slot.querySelectorAll('img').length!==expected.length))return false;
        return (await Promise.all([...slot.querySelectorAll('img')].map(async img=>{try{await img.decode();return img.naturalWidth>0;}catch{return false;}}))).every(Boolean);
      })).then(async ok=>{const publicOK=await Promise.all([...comparison.querySelectorAll('.clinical-public-exam')].map(async img=>{try{await img.decode();return img.naturalWidth>0;}catch{return false;}}));if(!publicOK.every(Boolean))return;if(!current(scope)||!comparison.isConnected||!ok.every(Boolean))return;const map=comparison.querySelector('[data-clinical-schematic]');if(map)map.hidden=false;comparison.querySelector('[data-clinical-status]')?.setAttribute('hidden','');});
    }
    el.onclick=e=>{if(!current(scope))return;const t=e.target.closest('[data-img-marks]');if(t){const o=t.closest('figure').querySelector('.lesson-marks');if(!o)return;const on=o.hidden;o.hidden=!on;t.setAttribute('aria-pressed',String(on));t.textContent=on?'Ocultar achados':'Mostrar achados';return;}const b=e.target.closest('[data-img-open]');if(!b)return;const r=rows[Number(b.dataset.imgOpen)],o=b.querySelector('.lesson-marks');if(r)open(b.querySelector('img').src,r.caption,r.marks,!!o&&!o.hidden);};
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
