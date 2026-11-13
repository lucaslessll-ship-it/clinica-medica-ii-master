/* The SDK stores session tokens, never the password entered in the form. */
window.MasterSessionStorage=(()=>{
  'use strict';
  const preferenceKey='master_auth_remember_device';
  const remembered=()=>localStorage.getItem(preferenceKey)!=='false';
  function create(url){
    const key=`sb-${new URL(url).hostname.split('.')[0]}-auth-token`;
    const selected=()=>remembered()?localStorage:sessionStorage;
    const other=()=>remembered()?sessionStorage:localStorage;
    const storage={
      getItem:name=>selected().getItem(name),
      setItem(name,value){selected().setItem(name,value);other().removeItem(name);},
      removeItem(name){localStorage.removeItem(name);sessionStorage.removeItem(name);}
    };
    function setRemember(value){
      if(!!value===remembered())return;
      const source=selected(),target=value?localStorage:sessionStorage;
      // Include the SDK's own callback/verifier keys; never move study progress.
      const names=Array.from({length:source.length},(_,i)=>source.key(i)).filter(name=>name===key||name?.startsWith(key+'-'));
      for(const name of names)target.setItem(name,source.getItem(name));
      localStorage.setItem(preferenceKey,String(!!value));
      for(const name of names)source.removeItem(name);
    }
    return {storage,setRemember};
  }
  return {remembered,create};
})();
