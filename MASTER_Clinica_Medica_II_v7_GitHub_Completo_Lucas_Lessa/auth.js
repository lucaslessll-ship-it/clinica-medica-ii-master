/* MASTER Clínica Médica II — autenticação e progresso individual.
   Requer auth-config.js e supabase-js v2 carregados antes deste arquivo.
   A chave publishable é pública; NUNCA coloque secret/service_role aqui. */
(() => {
  'use strict';
  const cfg = window.MASTER_AUTH_CONFIG;
  const keys = cfg?.progressKeys || [];
  const ownerKey = 'master_auth_local_owner';
  const status = {client:null, user:null, ready:false, timers:new Map(), syncing:false};
  const originalSet = Storage.prototype.setItem;
  const $ = id => document.getElementById(id);
  const read = key => {try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }};
  const errorText = e => ({'Invalid login credentials':'E-mail ou senha incorretos.',
    'Email not confirmed':'Confirme seu e-mail antes de entrar.',
    'User already registered':'Esse e-mail já possui cadastro.',
    'Email rate limit exceeded':'Muitas tentativas. Tente novamente depois.'})[e?.message] || e?.message || 'Não foi possível concluir. Tente novamente.';
  function notice(text) { $('master-auth-message').textContent = text; }
  function lock(on) { document.documentElement.classList.toggle('master-auth-locked',on); }
  function interfaceHtml() {
    const css = document.createElement('style');
    css.textContent = `html.master-auth-locked #app-shell,html.master-auth-locked .mobile-tabbar,html.master-auth-locked #focus-exit{visibility:hidden!important}#master-auth{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:24px;background:linear-gradient(140deg,#edf4f8,#fff 65%,#eaf5f2);color:#1b2935;font:15px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}#master-auth[hidden]{display:none!important}#master-auth *{box-sizing:border-box}#master-auth .panel{width:min(100%,430px);padding:clamp(24px,5vw,42px);border-radius:26px;background:#fff;box-shadow:0 16px 55px #16314720;border:1px solid #e2e9ed}#master-auth h1{font-size:27px;letter-spacing:-.6px;margin:6px 0 8px}#master-auth p{color:#576978;font-size:13px}#master-auth label{display:block;font-weight:600;margin:15px 0 5px}#master-auth input{display:block;width:100%;border:1px solid #c7d2db;border-radius:11px;padding:12px;font:inherit}#master-auth button{font:inherit;cursor:pointer;border-radius:11px;padding:11px;border:1px solid #cbd7dd;background:#fff;color:#203240}#master-auth button.primary{width:100%;background:#144a57;color:#fff;border-color:#144a57;margin-top:18px}#master-auth button:focus-visible,#master-auth input:focus-visible{outline:3px solid #6da6b6;outline-offset:2px}#master-auth .row{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:13px}#master-auth .link{padding:2px;border:0;text-decoration:underline;text-underline-offset:3px}#master-auth .google{width:100%;margin-top:12px}#master-auth #master-auth-message{min-height:22px;color:#865326;font-weight:600}#master-auth small{font-size:12px;color:#617483}#master-auth .brand{font-weight:800;color:#176477;letter-spacing:1.5px}`;
    document.head.appendChild(css);
    const el = document.createElement('section');
    el.id = 'master-auth'; el.setAttribute('aria-label','Acesso ao MASTER');
    el.innerHTML = `<div class="panel"><div class="brand">✦ MASTER</div><h1>Seu estudo, no seu ritmo.</h1><p>Clínica Médica II — entre para sincronizar suas revisões e questões entre dispositivos.</p><form id="master-auth-form"><label for="master-email">E-mail</label><input id="master-email" type="email" autocomplete="email" required><label for="master-password">Senha</label><input id="master-password" type="password" autocomplete="current-password" minlength="6" required><button class="primary" type="submit">Entrar</button></form><button id="master-google" class="google" type="button">Continuar com Google</button><div class="row"><button id="master-register" class="link" type="button">Criar conta</button><button id="master-forgot" class="link" type="button">Esqueci a senha</button></div><p id="master-auth-message" role="status" aria-live="polite"></p><small>Privacidade: seu e-mail identifica sua conta; respostas e anotações são armazenadas para sincronização no Supabase. Você pode solicitar acesso ou exclusão dos seus dados ao responsável pela plataforma. <button id="master-privacy" class="link" type="button">Saiba mais</button>.</small></div>`;
    document.body.appendChild(el);
    $('master-auth-form').addEventListener('submit',signIn);
    $('master-register').addEventListener('click',register);
    $('master-forgot').addEventListener('click',recover);
    $('master-google').addEventListener('click',google);
    $('master-privacy').addEventListener('click',()=>alert('MASTER Clínica Médica II — Informações de privacidade\n\nFinalidade: autenticar estudantes, registrar aceite de privacidade e sincronizar progresso, respostas e anotações.\n\nDados: e-mail, identificador da conta, registros de estudo e data do aceite.\n\nArmazenamento: Supabase, com acesso aos dados de progresso restrito à própria conta autenticada.\n\nNunca inclua dados de pacientes identificáveis nas anotações.\n\nPara exercer direitos previstos na LGPD, contate o responsável pela plataforma. Este aviso resumido não substitui uma Política de Privacidade completa.'));
  }
  async function signIn(e) {
    e.preventDefault(); notice('Entrando…');
    const {error}=await status.client.auth.signInWithPassword({email:$('master-email').value.trim(),password:$('master-password').value});
    if(error) notice(errorText(error)); else await enter();
  }
  async function register() {
    const email=$('master-email').value.trim(), password=$('master-password').value;
    if(!email || password.length<6){notice('Informe e-mail e uma senha com pelo menos 6 caracteres.');return;}
    if(!confirm('Criar uma conta para armazenar suas respostas e anotações? Você concordará com o aviso de privacidade após o primeiro acesso.'))return;
    notice('Criando conta…');
    const {data,error}=await status.client.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}});
    if(error)notice(errorText(error));else if(data.session)await enter();else notice('Verifique sua caixa de entrada para confirmar o cadastro.');
  }
  async function recover() {
    const email=$('master-email').value.trim();
    if(!email){notice('Digite seu e-mail para recuperar a senha.');return;}
    const {error}=await status.client.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});
    notice(error?errorText(error):'Se o endereço estiver cadastrado, você receberá um e-mail com instruções.');
  }
  async function google() {
    notice('Abrindo acesso pelo Google…');
    const {error}=await status.client.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}});
    if(error)notice('O login Google precisa estar habilitado no Supabase. '+errorText(error));
  }
  function hasLocalData() {return keys.some(k=>{const v=read(k);return v && typeof v==='object' && Object.keys(v).length>0;});}
  async function consent(user) {
    const {data,error}=await status.client.from('master_consents').select('policy_version').eq('user_id',user.id).maybeSingle();
    if(error)throw error;
    if(data?.policy_version===cfg.privacyVersion)return true;
    if(!confirm('Proteção de dados — MASTER\n\nSeu e-mail, suas respostas, anotações e progresso serão armazenados no Supabase para sincronização entre dispositivos. Nunca inclua dados de pacientes identificáveis.\n\nVocê concorda em prosseguir?'))return false;
    const {error:writeError}=await status.client.from('master_consents').insert({user_id:user.id,policy_version:cfg.privacyVersion});
    if(writeError)throw writeError;
    return true;
  }
  async function syncKey(key) {
    if(!status.ready || !status.user || !keys.includes(key))return;
    const value=read(key);
    if(value===null)return;
    const {error}=await status.client.from('master_progress').upsert({user_id:status.user.id,storage_key:key,payload:value,updated_at:new Date().toISOString()},{onConflict:'user_id,storage_key'});
    if(error)throw error;
  }
  function syncSoon(key) {
    if(!status.ready)return;
    clearTimeout(status.timers.get(key));
    status.timers.set(key,setTimeout(()=>syncKey(key).catch(e=>console.warn('MASTER: sincronização pendente',e.message)),800));
  }
  Storage.prototype.setItem=function(key,value) {
    originalSet.call(this,key,value);
    if(this===localStorage && keys.includes(String(key)))syncSoon(String(key));
  };
  async function enter() {
    try {
      const {data:{user},error}=await status.client.auth.getUser();
      if(error||!user){notice(errorText(error));return;}
      if(!(await consent(user))){await status.client.auth.signOut();notice('Acesso não iniciado: é necessário aceitar o aviso de privacidade.');return;}
      notice('Recuperando seu progresso…');
      const {data:remote,error:loadError}=await status.client.from('master_progress').select('storage_key,payload').eq('user_id',user.id);
      if(loadError)throw loadError;
      const previousOwner=localStorage.getItem(ownerKey);
      const remoteKeys=new Set((remote||[]).map(r=>r.storage_key));
      let importLocal=false;
      if(!remote?.length && previousOwner===user.id && hasLocalData()) importLocal=true;
      if(!remote?.length && !previousOwner && hasLocalData()) {
        importLocal=confirm('Encontramos progresso salvo neste navegador. Deseja vinculá-lo a esta conta?\n\nOK: importar para sua conta.\nCancelar: iniciar com progresso vazio (mantendo uma cópia de segurança local).');
        if(!importLocal) {
          const backup={};for(const k of keys)if(localStorage.getItem(k)!==null)backup[k]=read(k);
          originalSet.call(localStorage,'master_guest_backup_'+Date.now(),JSON.stringify(backup));
        }
      }
      if(!importLocal) {
        for(const key of keys) localStorage.removeItem(key);
        for(const row of remote||[]) if(keys.includes(row.storage_key)) originalSet.call(localStorage,row.storage_key,JSON.stringify(row.payload));
      }
      originalSet.call(localStorage,ownerKey,user.id);
      status.user=user;status.ready=true;
      if(importLocal)for(const key of keys)await syncKey(key);
      $('master-auth').hidden=true;lock(false);
      if(!sessionStorage.getItem('master_auth_reloaded')) {
        sessionStorage.setItem('master_auth_reloaded','yes');
        location.reload(); // Recria as telas existentes com o progresso da conta.
      } else {
        window.dispatchEvent(new Event('master-auth-ready'));
      }
    }catch(e){notice('Não foi possível carregar seu progresso. '+errorText(e));}
  }
  async function start() {
    lock(true); interfaceHtml();
    if(!cfg || !window.supabase?.createClient){notice('A configuração de acesso ainda não foi carregada.');return;}
    status.client=window.supabase.createClient(cfg.url,cfg.publishableKey);
    const {data:{session}}=await status.client.auth.getSession();
    if(session){await enter();}else{sessionStorage.removeItem('master_auth_reloaded');notice('Entre para acessar seu ambiente de estudos.');}
    window.MASTER_AUTH={
      signOut:async()=>{
        if(!status.user)return;
        try{for(const key of keys)await syncKey(key);}catch(e){alert('Não foi possível concluir a sincronização. Verifique sua internet e tente sair novamente.');return;}
        await status.client.auth.signOut();status.ready=false;status.user=null;
        for(const key of keys)localStorage.removeItem(key);
        localStorage.removeItem(ownerKey);sessionStorage.removeItem('master_auth_reloaded');location.reload();
      },
      user:()=>status.user,
      sync:()=>Promise.all(keys.map(syncKey))
    };
    window.addEventListener('online',()=>{if(status.ready)keys.forEach(syncSoon)});
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&status.ready)keys.forEach(syncSoon)});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
