/* Adaptador de leitura: reutiliza as fichas do app sem alterar chaves de progresso. */
(()=>{
'use strict';
window.escapeHtml=window.escapeHtml||function(value){return String(value).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));};
window.MASTER_CLINICAL_GUIDES=window.MASTER_CLINICAL_GUIDES||{};
window.getMain=()=>document.getElementById('main');
window.ui={route:'labmaster'};
document.addEventListener('DOMContentLoaded',()=>window.Posology?.afterRender(),{once:true});
})();
