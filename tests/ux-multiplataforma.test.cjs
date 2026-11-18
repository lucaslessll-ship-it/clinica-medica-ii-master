const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');

const APP='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
let browser,server,base;
before(async()=>{
 server=http.createServer(async(req,res)=>{
  try{
   const file=path.join(process.cwd(),decodeURIComponent(new URL(req.url,'http://local').pathname));
   res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.svg')?'image/svg+xml':'text/html');
   res.end(await fs.readFile(file));
  }catch{res.writeHead(404);res.end()}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
});
after(async()=>{await browser?.close();await new Promise(resolve=>server.close(resolve))});

function authFixture(){
 const user={id:'ux-smoke-fixture',email:'ux-fixture@example.test',user_metadata:{full_name:'Teste UX'}};
 localStorage.setItem('master_auth_local_owner',user.id);
 localStorage.setItem('master_dicas_v1',JSON.stringify({desligado:true,focoUsado:true}));
 window.supabase={createClient:()=>({
  auth:{
   getSession:async()=>({data:{session:{user,access_token:'fixture-jwt'}}}),
   getUser:async()=>({data:{user}}),
   onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}}),
   signOut:async()=>({error:null})
  },
  from(){
   const query={
    select(){return query},order(){return query},eq(){return query},contains(){return query},
    range:async()=>({data:[],error:null}),maybeSingle:async()=>({data:{policy_version:'2026-11-08'},error:null}),
    upsert:async()=>({error:null}),then(resolve){resolve({data:[],error:null})}
   };return query;
  }
 })};
}

const SCREENS=[
 {name:'android-compacto',width:320,height:720,touch:true},
 {name:'iphone',width:390,height:844,touch:true},
 {name:'tablet-retrato',width:768,height:1024,touch:true},
 {name:'tablet-paisagem',width:820,height:1180,touch:true},
 {name:'notebook',width:1280,height:800,touch:false},
 {name:'desktop',width:1440,height:900,touch:false}
];
const ROUTES=[
 'dashboard','topics','p1','cirp1','cirp2','cirpractice','cirexam',
 'practice','exam','cases','flashcards','revisao','notes','prescriptions',
 'pocus','ecg','rad','labmaster','banca','decisionlab'
];

test('rotas principais permanecem utilizáveis em seis formatos e nos temas claro e escuro',async()=>{
 await fs.mkdir('work/ux-multiplataforma',{recursive:true});
 for(const screen of SCREENS){
  const context=await browser.newContext({viewport:{width:screen.width,height:screen.height},
   hasTouch:screen.touch,isMobile:screen.width<=768,timezoneId:'America/Sao_Paulo',reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://cdn.jsdelivr.net/**/supabase.min.js',route=>route.fulfill({contentType:'text/javascript',body:'('+authFixture.toString()+')()'}));
  await page.goto(base+'/'+APP+'/index.html');
  await page.waitForFunction(()=>document.getElementById('master-auth')?.hidden,null,{timeout:20000});
  await page.evaluate(()=>HIG.novidadeVista('caderno-2026-11',true));
  for(const theme of ['light','dark']){
   await page.evaluate(theme=>HIG.setTheme(theme),theme);
   for(const route of ROUTES){
    await page.evaluate(route=>navigate(route),route);
    await page.waitForTimeout(65);
    const state=await page.evaluate(()=>({
     route:ui.route,
     over:document.documentElement.scrollWidth-window.innerWidth,
     length:document.getElementById('main-content')?.textContent?.trim().length||0,
     header:!!document.querySelector('.topbar'),
     nav:!!document.querySelector('#sidebar-nav'),
    }));
    assert.equal(state.route,route,screen.name+' '+theme+' rota '+route);
    assert.ok(state.over<=1,screen.name+' '+theme+' '+route+' extrapola viewport por '+state.over+'px');
    assert.ok(state.length>10,screen.name+' '+theme+' '+route+' sem conteúdo');
    assert.ok(state.header&&state.nav,screen.name+' '+theme+' '+route+' perdeu navegação');
    if(route==='notes'){
     const outline=await page.locator('.caderno-unificado h1').evaluate(el=>getComputedStyle(el).outlineStyle);
     assert.equal(outline,'none',screen.name+' '+theme+' caderno exibiu foco como botão');
    }
    if(route==='dashboard'&&screen.width<=390){
     const largura=await page.locator('.ai-tutor-dock').evaluate(el=>el.getBoundingClientRect().width);
     assert.ok(largura<=110,screen.name+' robô ocupa '+largura+'px');
    }
    if(theme==='light'&&['dashboard','cirp2','notes','pocus'].includes(route)&&[390,820,1440].includes(screen.width)){
     await page.screenshot({path:'work/ux-multiplataforma/'+screen.name+'-'+route+'.png',animations:'disabled'});
    }
   }
  }
  assert.deepEqual(errors,[],screen.name+' teve erros JavaScript');
  await context.close();
 }
});
