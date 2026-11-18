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
let findingsId=0;
function findings(marks){
  if(!Array.isArray(marks))return [];
  return marks.filter(m=>m&&typeof m==='object'&&typeof m.t==='string'&&m.t.trim()&&
    ((m.x!=null&&m.y!=null&&Number.isFinite(Number(m.x))&&Number.isFinite(Number(m.y)))||
    (Array.isArray(m.e)&&m.e.length===4&&m.e.every(v=>Number.isFinite(Number(v))))));
}
function overlay(marks){
  const list=findings(marks);if(!list.length)return '';
  const lines=list.map((m,i)=>m.x!=null?`<line data-finding-marker="${i}" x1="${num(m.lx??8)}" y1="${num(m.ly??9)}" x2="${num(m.x)}" y2="${num(m.y)}"/>`:'').join('');
  const parts=list.map((m,i)=>{let h='';
    if(m.x!=null)h+=`<i data-finding-marker="${i}" class="lesson-mark-tip" style="left:${num(m.x)}%;top:${num(m.y)}%"></i>`;
    if(Array.isArray(m.e))h+=`<i data-finding-marker="${i}" class="lesson-mark-ring" style="left:${num(m.e[0]-m.e[2])}%;top:${num(m.e[1]-m.e[3])}%;width:${num(m.e[2]*2)}%;height:${num(m.e[3]*2)}%"></i>`;
    const lx=num(m.lx??m.e?.[0]??8),ly=num(m.ly??m.e?.[1]??9);
    return h+`<b data-finding-marker="${i}" class="lesson-mark-label${lx>66?' at-end':lx<34?' at-start':''}" style="left:${lx}%;top:${ly}%">${i+1}</b>`;
  }).join('');
  return `<span class="lesson-marks" hidden aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none">${lines}</svg>${parts}</span>`;
}
function legend(marks,id){
  const list=findings(marks);if(!list.length)return '';
  return `<div class="lesson-findings" id="${id}" hidden><p class="subtle">Os números correspondem à imagem. Toque em uma descrição para destacar apenas aquela marcação.</p><ol>${list.map((m,i)=>`<li><button type="button" class="lesson-finding-focus" data-finding="${i}" aria-pressed="false">${esc(m.t.replace(/^\d+\s*[·.-]\s*/,''))}</button>${m.d?`<p>${esc(m.d)}</p>`:''}</li>`).join('')}</ol><p class="subtle lesson-findings-note">Marcações didáticas de localização. Compare com os demais cortes e com o contexto; não substituem o exame completo e o laudo.</p></div>`;
}
function focusFinding(root,button){
  const index=Number(button.dataset.finding),on=button.getAttribute('aria-pressed')!=='true';
  root.querySelectorAll('[data-finding]').forEach(b=>b.setAttribute('aria-pressed',String(on&&Number(b.dataset.finding)===index)));
  root.querySelectorAll('[data-finding-marker]').forEach(mark=>mark.classList.toggle('is-muted',on&&Number(mark.dataset.findingMarker)!==index));
}
function toggleFindings(root,button){
  const marks=root.querySelector('.lesson-marks'),list=root.querySelector('.lesson-findings');if(!marks)return;
  const on=marks.hidden;marks.hidden=!on;if(list)list.hidden=!on;
  button.setAttribute('aria-pressed',String(on));button.setAttribute('aria-expanded',String(on));button.textContent=on?'Ocultar achados':'Mostrar achados';
  root.querySelectorAll('[data-finding]').forEach(b=>b.setAttribute('aria-pressed','false'));
  root.querySelectorAll('.is-muted').forEach(mark=>mark.classList.remove('is-muted'));
}
function markup(rows,options={}){
  return `<h4>${esc(options.title||"Imagens da aula")}</h4><p class="subtle">Toque na imagem para ampliar. Tente descrever o que vê antes de revelar os achados.${rows.some(r=>findings(r.marks).length)?' Use Mostrar achados para ver as marcações numeradas e suas explicações.':''}</p><div class="lesson-images-grid">${rows.map((r,i)=>{const id='lesson-findings-'+(++findingsId),has=findings(r.marks).length;return `<figure><button type="button" class="lesson-image-open" data-img-open="${i}" aria-label="Ampliar imagem ${i+1}"><span class="lesson-image-surface"><img loading="${Array.isArray(options.include)?'eager':'lazy'}" decoding="async" alt="${esc(r.caption)}" src="data:${esc(r.mime)};base64,${esc(r.data)}">${overlay(r.marks)}</span></button>${has?`<button type="button" class="btn lesson-marks-toggle" data-img-marks="${i}" aria-pressed="false" aria-expanded="false" aria-controls="${id}">Mostrar achados</button>`:''}<figcaption>${esc(r.caption)}${r.credit?` <small>${esc(r.credit)}.</small>`:''}</figcaption>${legend(r.marks,id)}</figure>`;}).join('')}</div>`;
}
function fitDialog(){
  const img=dialog?.querySelector('img'),stage=dialog?.querySelector('.lesson-image-stage');if(!img?.naturalWidth||!img.naturalHeight||!stage)return;
  const width=Math.min(900,Math.max(120,innerWidth-56),Math.max(180,innerHeight*.65)*img.naturalWidth/img.naturalHeight);stage.style.width=width+'px';
}
window.addEventListener('resize',()=>{if(dialog?.open)fitDialog();});
function open(src,caption,marks,shown){
  if(!dialog){dialog=document.createElement('dialog');dialog.className='lesson-image-dialog';dialog.innerHTML='<div class="lesson-image-toolbar"><form method="dialog"><button class="btn" aria-label="Fechar imagem">Fechar</button></form><button type="button" class="btn lesson-dialog-marks" aria-pressed="false" aria-expanded="false" aria-controls="lesson-dialog-findings">Mostrar achados</button></div><div class="lesson-image-stage"><img alt=""></div><p class="lesson-dialog-caption"></p><div class="lesson-dialog-legend"></div>';document.body.appendChild(dialog);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();const t=e.target.closest('.lesson-dialog-marks');if(t)toggleFindings(dialog,t);const b=e.target.closest('[data-finding]');if(b)focusFinding(dialog,b);});}
  dialog.querySelector('img').onload=fitDialog;dialog.querySelector('img').src=src;dialog.querySelector('img').alt=caption;dialog.querySelector('.lesson-dialog-caption').textContent=caption;
  dialog.querySelectorAll('.lesson-marks').forEach(n=>n.remove());const list=findings(marks),button=dialog.querySelector('.lesson-dialog-marks');button.hidden=!list.length;button.setAttribute('aria-pressed','false');button.setAttribute('aria-expanded','false');button.textContent='Mostrar achados';
  dialog.querySelector('.lesson-dialog-legend').innerHTML=legend(list,'lesson-dialog-findings');
  if(list.length){dialog.querySelector('.lesson-image-stage').insertAdjacentHTML('beforeend',overlay(list));if(shown)toggleFindings(dialog,button);}
  if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');fitDialog();
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
    el.onclick=e=>{if(!current(scope))return;const t=e.target.closest('[data-img-marks]');if(t){toggleFindings(t.closest('figure'),t);return;}const f=e.target.closest('[data-finding]');if(f){focusFinding(f.closest('figure'),f);return;}const b=e.target.closest('[data-img-open]');if(!b)return;const r=rows[Number(b.dataset.imgOpen)],o=b.querySelector('.lesson-marks');if(r)open(b.querySelector('img').src,r.caption,r.marks,!!o&&!o.hidden);};
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
