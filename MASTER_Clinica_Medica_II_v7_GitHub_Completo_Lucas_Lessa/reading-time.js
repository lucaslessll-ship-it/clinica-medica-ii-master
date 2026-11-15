/* Tempo médio de leitura calculado pelo texto de cada conteúdo (cerca de 180 palavras por minuto em texto técnico). */
window.ReadingTime=(()=>{
 const SKIP=new Set(['id','layer','min','refs','figs','note','updated','quiz','sourceUrl','license','credit']);
 function words(node){
  if(typeof node==='string')return (node.replace(/<[^>]*>/g,' ').match(/\S+/g)||[]).length;
  if(Array.isArray(node))return node.reduce((n,x)=>n+words(x),0);
  if(node&&typeof node==='object')return Object.keys(node).reduce((n,k)=>n+(SKIP.has(k)?0:words(node[k])),0);
  return 0;
 }
 const minutes=(content,wpm=180)=>Math.max(2,Math.round(words(content)/wpm));
 return {minutes,words};
})();
