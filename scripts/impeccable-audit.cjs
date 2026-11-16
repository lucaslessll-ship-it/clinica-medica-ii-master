// Auditoria renderizada: contraste, alvos de toque, overflow, foco, a11y básica.
// Uso: CHROMIUM_PATH=/usr/bin/google-chrome node scripts/impeccable-audit.cjs
const {chromium}=require('playwright');const http=require('node:http');const fs=require('node:fs/promises');const path=require('node:path');
function mock(){
 const user={id:'audit',email:'audit@example.test',user_metadata:{full_name:'Auditoria'}};let callback;
 localStorage.setItem('master_auth_local_owner',user.id);
 window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user}}}),getUser:async()=>({data:{user}}),onAuthStateChange(fn){callback=fn;return {data:{subscription:{unsubscribe(){}}}}},signOut:async()=>({error:null})},from(table){const q={select(){return q},eq(){return table==='master_progress'?Promise.resolve({data:[],error:null}):q},maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),upsert:async()=>({error:null})};return q;}})};
}
const lum=([r,g,b])=>{const f=v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4};return .2126*f(r)+.7152*f(g)+.0722*f(b)};
const ratio=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return (x+.05)/(y+.05)};
(async()=>{
 const server=http.createServer(async(req,res)=>{try{const file=path.join(process.cwd(),decodeURIComponent(new URL(req.url,'http://local').pathname));res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.json')?'application/json':'text/html');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
 const routes=(process.env.ROUTES||'dashboard,lessons,questions,pocus,cirurgia,ecg,cases,flashcards,errors').split(',');
 const out=[];const shots=[];
 for(const scheme of (process.env.SCHEMES||'light,dark').split(',')){
  for(const vw of [320,390,1180]){
   const ctx=await browser.newContext({viewport:{width:vw,height:vw<500?844:900},colorScheme:scheme,hasTouch:vw<500,isMobile:vw<500});
   const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push('console: '+m.text().slice(0,160))});
   await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',r=>r.fulfill({contentType:'text/javascript',body:`(${mock.toString()})()`}));
   await page.goto(base+'/MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/index.html');
   await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000}).catch(()=>{});if(scheme==='dark')await page.evaluate(()=>document.body.setAttribute('data-theme','dark'));
   for(const route of routes){
    await page.evaluate(r=>{if(typeof navigate==='function')navigate(r);else location.hash='#'+r},route);await page.waitForTimeout(700);
    const res=await page.evaluate(()=>{
     const lum=([r,g,b])=>{const f=v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4};return .2126*f(r)+.7152*f(g)+.0722*f(b)};
     const ratio=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return (x+.05)/(y+.05)};
     const parse=c=>{const m=c.match(/[\d.]+/g);if(!m)return null;const a=m.length>3?+m[3]:1;return a===0?null:m.slice(0,3).map(Number)};
     const bgOf=el=>{let e=el;while(e){const c=parse(getComputedStyle(e).backgroundColor);if(c)return c;e=e.parentElement}return [255,255,255]};
     const vis=el=>{const r=el.getBoundingClientRect();const s=getComputedStyle(el);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'&&r.bottom>0&&r.top<innerHeight*3};
     const texts=[];const nodes=document.querySelectorAll('main *, header *, nav *');
     for(const el of nodes){if(!vis(el))continue;const hasText=Array.from(el.childNodes).some(n=>n.nodeType===3&&n.textContent.trim().length>1);if(!hasText)continue;const s=getComputedStyle(el);const fg=parse(s.color);if(!fg)continue;const bg=bgOf(el);const size=parseFloat(s.fontSize);const bold=parseInt(s.fontWeight)>=700;const large=size>=24||(size>=18.66&&bold);const need=large?3:4.5;const r=ratio(fg,bg);if(r<need)texts.push({tag:el.tagName.toLowerCase(),cls:(el.className||'').toString().slice(0,40),text:el.textContent.trim().slice(0,40),ratio:+r.toFixed(2),need,fg:s.color,bg:'rgb('+bg+')'});}
     const targets=[];for(const el of document.querySelectorAll('a,button,input,select,textarea,[role=button],[role=tab],[tabindex="0"]')){if(!vis(el))continue;const r=el.getBoundingClientRect();if(r.width<24||r.height<24)targets.push({tag:el.tagName.toLowerCase(),id:el.id,cls:(el.className||'').toString().slice(0,40),text:(el.getAttribute('aria-label')||el.textContent||'').trim().slice(0,30),w:Math.round(r.width),h:Math.round(r.height)})}
     const overflow=document.documentElement.scrollWidth>innerWidth+1?document.documentElement.scrollWidth-innerWidth:0;
     const wide=[];if(overflow){for(const el of document.querySelectorAll('body *')){const r=el.getBoundingClientRect();if(r.right>innerWidth+2&&r.width>40)wide.push({tag:el.tagName.toLowerCase(),id:el.id,cls:(el.className||'').toString().slice(0,40),right:Math.round(r.right)});if(wide.length>6)break;}}
     const imgs=Array.from(document.images).filter(vis);const noAlt=imgs.filter(i=>!i.hasAttribute('alt')).length;const noLazy=imgs.filter(i=>i.loading!=='lazy').length;
     const unlabeled=Array.from(document.querySelectorAll('button,a[href],input:not([type=hidden])')).filter(vis).filter(el=>{const n=(el.getAttribute('aria-label')||el.getAttribute('aria-labelledby')||el.getAttribute('title')||el.textContent||'').trim();if(n)return false;if(el.tagName==='INPUT'){const id=el.id;return !(id&&document.querySelector(`label[for="${id}"]`))&&!el.closest('label')}return true}).map(el=>el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+'.'+(el.className||'').toString().slice(0,30));
     const h=Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).filter(vis).map(x=>+x.tagName[1]);let skips=0;for(let i=1;i<h.length;i++)if(h[i]-h[i-1]>1)skips++;
     const h1=document.querySelectorAll('h1').length;
     const landmarks={main:!!document.querySelector('main'),nav:!!document.querySelector('nav'),header:!!document.querySelector('header')};
     return {texts:texts.slice(0,12),nText:texts.length,targets:targets.slice(0,12),nTargets:targets.length,overflow,wide,imgs:imgs.length,noAlt,noLazy,unlabeled:unlabeled.slice(0,8),nUnlabeled:unlabeled.length,headingSkips:skips,h1,landmarks};
    });
    // Focus visibility check: tab 6 times and see if focused element has visible outline/shadow
    let focusMissing=0;
    for(let i=0;i<6;i++){await page.keyboard.press('Tab');const ok=await page.evaluate(()=>{const el=document.activeElement;if(!el||el===document.body)return true;const s=getComputedStyle(el);return (s.outlineStyle!=='none'&&parseFloat(s.outlineWidth)>0)||s.boxShadow!=='none'});if(!ok)focusMissing++;}
    out.push({scheme,vw,route,...res,focusMissing,errors:errors.splice(0)});
    if(vw!==1180||scheme!=='dark'){const f=`/tmp/shot-${scheme}-${vw}-${route}.png`;await page.screenshot({path:f,fullPage:false});shots.push(f);}
   }
   await ctx.close();
  }
 }
 await browser.close();server.close();
 await fs.writeFile('/tmp/audit-render.json',JSON.stringify(out,null,1));
 // summary
 for(const r of out){console.log(`${r.scheme} ${r.vw} ${r.route}: contrast<${r.nText} targets<24:${r.nTargets} overflow:${r.overflow}px imgs:${r.imgs} noAlt:${r.noAlt} noLazy:${r.noLazy} unlabeled:${r.nUnlabeled} hSkips:${r.headingSkips} h1:${r.h1} focusMissing:${r.focusMissing} errors:${r.errors.length}`)}
 console.log('shots',shots.length);
})().catch(e=>{console.error(e);process.exit(1)});
