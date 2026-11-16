/* Adaptador de leitura: reutiliza as fichas do app sem alterar chaves de progresso. */
(()=>{
'use strict';
window.escapeHtml=window.escapeHtml||function(value){return String(value).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));};
window.MASTER_CLINICAL_GUIDES=window.MASTER_CLINICAL_GUIDES||{};
window.getMain=()=>document.getElementById('main');
window.ui={route:'labmaster'};
function fit(){
 if(window.parent===window)return;
 try{const box=window.frameElement.getBoundingClientRect(),head=window.parent.document.querySelector('.topbar'),inset=Math.max(0,head?.getBoundingClientRect().bottom||0);document.documentElement.style.setProperty('--posology-vp-top',(Math.max(0,inset-box.top)+12)+'px');document.documentElement.style.setProperty('--posology-vp-h',Math.max(120,window.parent.innerHeight-Math.max(box.top,inset)-24)+'px');}catch{}
}
window.addEventListener('message',event=>{if(event.source===window.parent&&event.origin===location.origin&&event.data?.labMasterHost===true)fit();});
window.addEventListener('resize',fit);
fit();
document.addEventListener('DOMContentLoaded',()=>window.Posology?.afterRender(),{once:true});
})();
