/* A sessão Supabase é armazenada, nunca a senha. Seleção segura por dispositivo. */
window.MasterSessionStorage=(()=>{
 'use strict';
 const preferenceKey='master_auth_remember_device';
 let persistenceAvailable=null;
 function localAvailable(){
  if(persistenceAvailable!==null)return persistenceAvailable;
  try{
   const probe='__master_auth_storage_probe__';
   localStorage.setItem(probe,'1');localStorage.removeItem(probe);
   persistenceAvailable=true;
  }catch{persistenceAvailable=false;}
  return persistenceAvailable;
 }
 const remembered=()=>{
  if(!localAvailable())return false;
  try{return localStorage.getItem(preferenceKey)!=='false';}catch{return false;}
 };
 function create(url){
  const key='sb-'+new URL(url).hostname.split('.')[0]+'-auth-token';
  const selected=()=>remembered()?localStorage:sessionStorage;
  const other=()=>remembered()?sessionStorage:localStorage;
  const storage={
   getItem(name){try{return selected().getItem(name);}catch{return null;}},
   setItem(name,value){
    selected().setItem(name,value);
    // Limpeza de token antigo em outro armazenamento somente após gravar com êxito.
    try{other().removeItem(name);}catch{}
   },
   removeItem(name){
    // Logout sempre invalida as duas cópias do token do SDK.
    try{localStorage.removeItem(name);}catch{}
    try{sessionStorage.removeItem(name);}catch{}
   }
  };
  function setRemember(value){
   const next=!!value;
   if(next&&!localAvailable())throw new Error('O navegador não permite salvar a sessão neste dispositivo. Tente habilitar armazenamento local.');
   if(next===remembered())return next;
   const source=selected(),target=next?localStorage:sessionStorage;
   const names=[];
   for(let i=0;i<source.length;i++){
    const name=source.key(i);
    if(name===key||name?.startsWith(key+'-'))names.push(name);
   }
   // Primeiro copia os tokens, depois troca a preferência e apaga a origem.
   // Se alguma gravação falhar, a origem continua intacta.
   for(const name of names)target.setItem(name,source.getItem(name));
   localStorage.setItem(preferenceKey,String(next));
   for(const name of names)source.removeItem(name);
   return next;
  }
  return {storage,setRemember};
 }
 return {remembered,create};
})();
