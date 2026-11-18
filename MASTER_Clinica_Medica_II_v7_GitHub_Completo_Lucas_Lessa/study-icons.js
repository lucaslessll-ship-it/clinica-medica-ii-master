/* Ícones vetoriais com relevo: leves, locais e sem animação de leitura. */
window.StudyIcons=(()=>{
 let serial=0;
 const colors={neuro:['#8796e8','#4654a1'],reuma:['#e5ad79','#a86435'],onco:['#bd9ee0','#78549e'],hema:['#e89b9f','#aa475b'],gastro:['#e5ba70','#aa7c32'],infecto:['#7ac8ad','#338c76'],cardio:['#ed9c9b','#b55066'],pressao:['#8abbd7','#497eab'],diabetes:['#e7af7f','#b77a43'],tireoide:['#ba9bdf','#78559e'],endocrino:['#af9edc','#7560a9'],tele:['#85bdcf','#397d95'],cirurgia:['#7bbfb4','#307d76'],emergency:['#efa17d','#b75c43'],geral:['#8bc7b8','#397f73']};
 function icon(name,path,size=48){return `<svg class="study-icon-3d editorial-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${path}"/></svg>`;}

 const book='M12 6c-3-3-7-3-10-2v15c4-1 7-1 10 2m0-15c3-3 7-3 10-2v15c-4-1-7-1-10 2V6';
 const emergency='M9 6V3h6v3M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2ZM12 10v7m-3-3.5h6';
 const robot='M12 4V1m-2 0h4M6 5h12a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3ZM1 10v5m22-5v5M8 10h.01M16 10h.01M8 15q4 3 8 0';
 return {icon,robot:()=>icon('geral',robot,32),book:()=>icon('geral',book),emergency:()=>icon('emergency',emergency),emergencyPath:emergency};
})();
