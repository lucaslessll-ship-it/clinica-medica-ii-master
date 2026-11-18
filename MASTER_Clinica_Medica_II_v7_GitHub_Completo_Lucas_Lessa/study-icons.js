/* Ícones vetoriais com relevo: leves, locais e sem animação de leitura. */
window.StudyIcons=(()=>{
 let serial=0;
 const colors={neuro:['#8796e8','#4654a1'],reuma:['#e5ad79','#a86435'],onco:['#bd9ee0','#78549e'],hema:['#e89b9f','#aa475b'],gastro:['#e5ba70','#aa7c32'],infecto:['#7ac8ad','#338c76'],cardio:['#ed9c9b','#b55066'],pressao:['#8abbd7','#497eab'],diabetes:['#e7af7f','#b77a43'],tireoide:['#ba9bdf','#78559e'],endocrino:['#af9edc','#7560a9'],tele:['#85bdcf','#397d95'],cirurgia:['#7bbfb4','#307d76'],emergency:['#efa17d','#b75c43'],geral:['#8bc7b8','#397f73']};
 function icon(name,path,size=48){
  const id='si'+(++serial),[light,dark]=colors[name]||colors.geral;
  return `<svg class="study-icon-3d" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}a" x1="8" y1="5" x2="54" y2="59" gradientUnits="userSpaceOnUse"><stop stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></linearGradient><linearGradient id="${id}b" x1="16" y1="7" x2="49" y2="48" gradientUnits="userSpaceOnUse"><stop stop-color="#fff" stop-opacity=".66"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><ellipse cx="32" cy="58" rx="22" ry="3" fill="${dark}" opacity=".16"/><rect x="7" y="9" width="50" height="48" rx="15" fill="${dark}"/><rect x="7" y="5" width="50" height="48" rx="15" fill="url(#${id}a)"/><rect x="8" y="6" width="48" height="46" rx="14" stroke="url(#${id}b)" stroke-width="1.5"/><path d="M16 11c6-3 16-3 23-1" stroke="#fff" stroke-opacity=".3" stroke-width="2" stroke-linecap="round"/><g transform="translate(16 15) scale(1.34)" stroke-linecap="round" stroke-linejoin="round"><path d="${path}" transform="translate(0 1.4)" stroke="${dark}" stroke-width="2.7"/><path d="${path}" stroke="#f5fffc" stroke-width="1.85"/></g></svg>`;
 }
 const book='M12 6c-3-3-7-3-10-2v15c4-1 7-1 10 2m0-15c3-3 7-3 10-2v15c-4-1-7-1-10 2V6';
 const emergency='M9 6V3h6v3M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2ZM12 10v7m-3-3.5h6';
 const robot='M12 4V1m-2 0h4M6 5h12a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3ZM1 10v5m22-5v5M8 10h.01M16 10h.01M8 15q4 3 8 0';
 return {icon,robot:()=>icon('geral',robot,32),book:()=>icon('geral',book),emergency:()=>icon('emergency',emergency),emergencyPath:emergency};
})();
