/* Clínica Master: offline para recursos públicos estáticos; nunca cachear API ou dados de usuário. */
const VERSION='master-offline-v1',RUNTIME=VERSION+'-runtime',PINNED=VERSION+'-saved';
const SHELL=['./index.html','./offline-manager.js','./offline-manager.css','./assets/app-icon.svg'];
const eligible=url=>url.origin===self.location.origin && url.pathname.startsWith(new URL('./',self.registration.scope).pathname) && !/\/(?:auth|rest|functions|storage|realtime|graphql|api)\//i.test(url.pathname) && /\.(?:html?|css|js|mjs|json|svg|png|jpe?g|webp|gif|ico|woff2?|pdf)$/i.test(url.pathname);
self.addEventListener('install',event=>{event.waitUntil(caches.open(RUNTIME).then(async c=>{await Promise.allSettled(SHELL.map(p=>c.add(p)));}));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('master-offline-')&&!key.startsWith(VERSION))await caches.delete(key);await self.clients.claim();})());});
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET'||!eligible(new URL(req.url)))return;
 event.respondWith((async()=>{
  const saved=await caches.open(PINNED),pinned=await saved.match(req);
  const runtime=await caches.open(RUNTIME),cached=await runtime.match(req);
  try{
   // Online: rede primeiro. Conteúdo salvo serve de fallback quando não houver internet,
   // não como bloqueio permanente de novos commits.
   const response=await fetch(req);
   if(response.ok&&response.type==='basic'&&!response.headers.has('set-cookie')&&response.headers.get('cache-control')?.includes('private')!==true){
    // Nunca gravar HTML personalizado; somente a estrutura pública index.html.
    if(!/\.html?$/i.test(new URL(req.url).pathname)||new URL(req.url).pathname.endsWith('/index.html')){
     const target=pinned?saved:runtime;
     target.put(req,response.clone()).then(async()=>{if(!pinned){const keys=await runtime.keys();if(keys.length>220)await runtime.delete(keys[0]);}}).catch(()=>{});
    }
   }
   return response;
  }catch{return pinned||cached||Response.error();}
 })());
});
self.addEventListener('message',event=>{
 const port=event.ports?.[0],data=event.data||{};
 const reply=x=>port?.postMessage(x);
 event.waitUntil((async()=>{
  try{
   if(data.type==='SAVE'){
    const c=await caches.open(PINNED);let saved=0,failed=0;
    for(const raw of (data.urls||[]).slice(0,300)){
     try{const u=new URL(raw,self.location.href);if(!eligible(u))continue;
      const res=await fetch(u.href,{credentials:'same-origin',cache:'no-store'});
      if(!res.ok||res.type!=='basic'||res.headers.has('set-cookie')||res.headers.get('cache-control')?.includes('private')){failed++;continue;}
      await c.put(u.href,res);saved++;
     }catch{failed++;}
    }reply({ok:true,saved,failed});
   }else if(data.type==='CLEAR'){await caches.delete(PINNED);reply({ok:true});}
   else if(data.type==='STATUS'){const c=await caches.open(PINNED);reply({ok:true,count:(await c.keys()).length});}
  }catch(e){reply({ok:false,error:String(e)});}
 })());
});
