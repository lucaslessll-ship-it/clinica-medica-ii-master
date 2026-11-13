/* Account UI and per-user progress. Only the public Supabase client belongs here. */
(() => {
  'use strict';
  const cfg = window.MASTER_AUTH_CONFIG;
  const keys = cfg?.progressKeys || [];
  const ownerKey = 'master_auth_local_owner';
  const recoveryKey = 'master_password_recovery';
  const originalSet = Storage.prototype.setItem;
  const $ = id => document.getElementById(id);
  const status = {client:null, user:null, ready:false, busy:false, mode:'login', initializing:true, timers:new Map(), epoch:0, entering:null, recovery:false, baseline:new Map(), consent:null};
  const read = key => {try{return JSON.parse(localStorage.getItem(key));}catch{return null;}};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const errors = {
    invalid_credentials:'E-mail ou senha incorretos.', email_not_confirmed:'Confirme seu e-mail antes de entrar.',
    user_already_exists:'Esse e-mail já possui cadastro.', over_email_send_rate_limit:'Muitas solicitações de e-mail. Aguarde antes de tentar novamente.',
    over_request_rate_limit:'Muitas tentativas. Aguarde e tente novamente.', weak_password:'A senha não atende aos requisitos de segurança. Use uma senha mais longa com letras, números e símbolos.',
    same_password:'Escolha uma senha diferente da atual.', reauthentication_not_valid:'Código inválido ou expirado. Confira o código ou solicite outro.',
    session_not_found:'Sua sessão expirou. Entre novamente.', refresh_token_not_found:'Sua sessão expirou. Entre novamente.',
    otp_expired:'O link expirou ou já foi utilizado. Solicite um novo e-mail de recuperação.',
    current_password_invalid:'A senha atual está incorreta.', validation_failed:'Confira os campos e tente novamente.'
  };
  function errorText(e){
    if(errors[e?.code])return errors[e.code];
    if(/Invalid login credentials/i.test(e?.message))return errors.invalid_credentials;
    if(/fetch|network|offline|Load failed/i.test(e?.message))return 'Não foi possível conectar. Verifique sua internet e tente novamente.';
    return 'Não foi possível concluir. '+(e?.message || 'Tente novamente.');
  }
  function notice(text, error=false){$('master-auth-message').textContent=text;$('master-auth-message').dataset.error=String(error);}
  function syncNotice(text){$('master-sync-status').textContent=text;}
  function lock(on){
    if(on)window.closeMobileNav?.(false);
    if(on)window.FocusTimer?.pause();
    document.documentElement.classList.toggle('master-auth-locked',on);
    for(const id of ['app-shell','mobile-tabbar','focus-exit','hig-overlay','focus-float']){
      const el=$(id);if(el){el.inert=on;if(on)el.setAttribute('aria-hidden','true');else el.removeAttribute('aria-hidden');}
    }
    if(!on)window.FocusTimer?.render();
  }
  function redirectUrl(recovery=false){const url=new URL(location.pathname,location.origin);if(recovery)url.searchParams.set('auth','recovery');return url.href;}
  function setBusy(on, label){
    status.busy=on;$('master-auth-form').setAttribute('aria-busy',String(on));
    $('master-auth').querySelectorAll('button,input').forEach(el=>el.disabled=on||(el.tagName==='INPUT'&&!!el.closest('[hidden]')));
    $('master-submit').textContent=on?label:$('master-submit').dataset.label;
  }
  async function run(label,action){
    if(status.busy)return;
    setBusy(true,label);notice(label);
    try{await action();}catch(e){notice(errorText(e),true);if($('master-auth').hidden)syncNotice(errorText(e));}finally{setBusy(false);}
  }
  const field=(id,label,type,autocomplete,extra='')=>`<label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" autocomplete="${autocomplete}" aria-describedby="master-auth-message" required ${extra}>`;
  function show(mode, message='', error=false){
    status.mode=mode;closeProfile();lock(true);$('master-auth').hidden=false;
    let title,description,fields,submit;
    const email=esc($('master-email')?.value||status.user?.email||'');
    const emailField=()=>field('master-email','E-mail','email','email',`value="${email}" autocapitalize="none" spellcheck="false"`);
    const newPasswords=()=>field('master-password','Nova senha','password','new-password','minlength="8"')+'<p class="auth-hint">Use pelo menos 8 caracteres. Prefira uma senha única com letras, números e símbolos.</p>'+field('master-confirm','Confirmar nova senha','password','new-password','minlength="8"');
    if(mode==='register'){
      title='Criar sua conta';description='Seu progresso e suas anotações, disponíveis nos seus dispositivos.';
      fields=emailField()+field('master-password','Crie uma senha','password','new-password','minlength="8"')+'<p class="auth-hint">Pelo menos 8 caracteres; prefira letras, números e símbolos.</p>'+field('master-confirm','Confirme sua senha','password','new-password','minlength="8"');submit='Criar conta';
    }else if(mode==='forgot'){
      title='Recuperar senha';description='Informe seu e-mail para receber um link e definir uma nova senha.';fields=emailField();submit='Enviar link de recuperação';
    }else if(mode==='password'||mode==='recovery'){
      title=mode==='recovery'?'Definir nova senha':'Alterar senha';description=mode==='recovery'?'Escolha a nova senha da sua conta.':'Confirme sua nova senha. Podemos pedir uma verificação adicional da sua conta.';
      fields='<div id="master-current-wrap" hidden>'+field('master-current','Senha atual','password','current-password','disabled')+'</div>'+newPasswords()+'<div id="master-nonce-wrap" hidden>'+field('master-nonce','Código recebido por e-mail ou SMS','text','one-time-code','disabled')+'<button id="master-resend" type="button" class="auth-link">Enviar outro código</button></div>';submit='Salvar nova senha';
    }else if(mode==='consent'){
      title='Seus dados de estudo';description='Para sincronizar, armazenamos seu e-mail, respostas, anotações e progresso no Supabase. O acesso ao progresso é vinculado à sua conta. Nunca inclua dados de pacientes identificáveis.';
      fields='<label class="auth-consent"><input id="master-consent" type="checkbox" required> Li o aviso de privacidade e concordo em sincronizar meus dados de estudo.</label>';submit='Concordar e continuar';
    }else{
      title='Seu estudo, no seu ritmo.';description='Entre para retomar suas aulas e sincronizar seu progresso.';fields=emailField()+field('master-password','Senha','password','current-password');submit='Entrar';
    }
    $('master-auth-title').textContent=title;$('master-auth-description').textContent=description;
    $('master-auth-fields').innerHTML=fields;
    for(const input of $('master-auth-fields').querySelectorAll('input[type=password]')){const toggle=document.createElement('button');toggle.type='button';toggle.className='auth-link';toggle.textContent='Mostrar senha';toggle.setAttribute('aria-controls',input.id);toggle.setAttribute('aria-pressed','false');toggle.onclick=()=>{const visible=input.type==='password';input.type=visible?'text':'password';toggle.textContent=visible?'Ocultar senha':'Mostrar senha';toggle.setAttribute('aria-pressed',String(visible));};input.after(toggle);}
    $('master-submit').textContent=submit;$('master-submit').dataset.label=submit;
    $('master-auth-tabs').hidden=!['login','register'].includes(mode);
    $('master-login-tab').setAttribute('aria-pressed',String(mode==='login'));
    $('master-register-tab').setAttribute('aria-pressed',String(mode==='register'));
    $('master-google').hidden=mode!=='login'||cfg?.googleEnabled!==true;$('master-forgot').hidden=mode!=='login';
    $('master-back').hidden=mode==='login';$('master-back').textContent=mode==='password'?'Cancelar':mode==='consent'?'Sair sem aceitar':mode==='recovery'?'Cancelar recuperação':'Voltar para entrar';
    notice(message,error);setBusy(status.busy,'Processando…');
    requestAnimationFrame(()=>$('master-auth-title').focus());
    $('master-resend')?.addEventListener('click',()=>run('Enviando código…',requestNonce));
  }
  function interfaceHtml(){
    const el=document.createElement('section');el.id='master-auth';
    el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-labelledby','master-auth-title');
    el.innerHTML=`<div class="auth-panel"><div class="auth-brand">✦ MASTER</div><div id="master-auth-tabs" class="auth-tabs"><button id="master-login-tab" type="button" aria-pressed="true">Entrar</button><button id="master-register-tab" type="button" aria-pressed="false">Criar conta</button></div><h1 id="master-auth-title" tabindex="-1"></h1><p id="master-auth-description"></p><form id="master-auth-form"><div id="master-auth-fields"></div><button id="master-submit" class="btn primary" type="submit" data-label="Entrar">Entrar</button></form><button id="master-google" class="btn auth-google" type="button">Continuar com Google</button><div class="auth-links"><button id="master-forgot" class="auth-link" type="button">Esqueci a senha</button><button id="master-back" class="auth-link" type="button" hidden>Voltar para entrar</button></div><p id="master-auth-message" role="status" aria-live="polite" aria-atomic="true"></p><button id="master-retry" class="btn" type="button" hidden>Tentar carregar progresso novamente</button><details class="auth-privacy"><summary>Privacidade e seus dados</summary><p>Seu e-mail identifica sua conta; respostas e anotações são armazenadas no Supabase para sincronização. Nunca inclua dados de pacientes identificáveis. Para solicitar acesso ou exclusão dos seus dados, contate o responsável pela plataforma. Este aviso resumido não substitui uma Política de Privacidade completa.</p></details><noscript>Ative o JavaScript para acessar seu ambiente de estudo.</noscript></div>`;
    document.body.appendChild(el);
    $('master-auth-form').addEventListener('submit',submit);
    $('master-login-tab').addEventListener('click',()=>show('login'));
    $('master-register-tab').addEventListener('click',()=>show('register'));
    $('master-forgot').addEventListener('click',()=>show('forgot'));
    $('master-back').addEventListener('click',()=>{
      if(status.mode==='password'){hide();return;}
      if(status.mode==='consent'){status.consent?.(false);return;}
      if(status.mode==='recovery'){signOut();return;}
      show('login');
    });
    $('master-google').addEventListener('click',()=>run('Abrindo Google…',async()=>{
      const {error}=await status.client.auth.signInWithOAuth({provider:'google',options:{redirectTo:redirectUrl()}});if(error)throw error;
    }));
    $('master-retry').addEventListener('click',()=>{if(!status.busy)enter(status.user);});
    $('master-avatar').addEventListener('click',()=>{
      const open=$('master-profile').hidden;$('master-profile').hidden=!open;$('master-avatar').setAttribute('aria-expanded',String(open));
      if(open)$('master-change-password').focus();
    });
    $('master-change-password').addEventListener('click',()=>show('password'));
    $('master-signout').addEventListener('click',signOut);
    $('master-sync').addEventListener('click',async()=>{
      if($('master-sync').disabled)return;$('master-sync').disabled=true;
      try{await syncAll();}catch(e){syncNotice(errorText(e));}finally{$('master-sync').disabled=false;}
    });
    document.addEventListener('click',e=>{if(!e.target.closest('.account-control'))closeProfile();});
    document.addEventListener('keydown',e=>{
      if(!$('master-profile').hidden&&e.key==='Escape'){closeProfile();$('master-avatar').focus();}
      if(el.hidden)return;
      if(e.key==='Escape'&&status.mode==='password'&&!status.busy){hide();return;}
      if(e.key==='Tab'){
        const focusable=[...el.querySelectorAll('button,input,summary,a[href]')].filter(x=>!x.disabled&&x.getClientRects().length);
        const first=focusable[0],last=focusable.at(-1);
        if(e.shiftKey&&(document.activeElement===first||!focusable.includes(document.activeElement))){e.preventDefault();last?.focus();}
        else if(!e.shiftKey&&(document.activeElement===last||!focusable.includes(document.activeElement))){e.preventDefault();first?.focus();}
      }
    });
  }
  function closeProfile(){if($('master-profile'))$('master-profile').hidden=true;$('master-avatar')?.setAttribute('aria-expanded','false');}
  function accountAvatar(id){
    // Local, stable account illustration. Never send account identifiers to an image service.
    let hash=2166136261;
    for(const char of String(id||'guest'))hash=Math.imul(hash^char.codePointAt(0),16777619)>>>0;
    const backgrounds=['#dcefe9','#e2e9fa','#f5e5ef','#f6ebd6','#dceef6','#ebe2f4'];
    const shirts=['#17685e','#365b93','#854665','#895f25','#24667d','#66508e'];
    const skins=['#f2c8a4','#deb08b','#bd8665','#875b45'];
    const hair=['#302c32','#654331','#36363f','#4c352b'];
    const style=(hash>>>12)%4,skin=skins[(hash>>>8)%skins.length],shirt=shirts[(hash>>>4)%shirts.length];
    const hairline=['M12 18V14a8 8 0 0 1 16 0v4l-4-6-5 3-7-1Z','M12 18V14a8 8 0 0 1 16 0v4l-2-4H14Z','M12 18V14a8 8 0 0 1 16 0v4l-4-3-3-4-7 4Z','M12 18V14a8 8 0 0 1 16 0v4l-3-5-10-1Z'][style];
    return `<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false"><rect width="40" height="40" rx="20" fill="${backgrounds[hash%backgrounds.length]}"/><path d="M6 40v-3a14 14 0 0 1 28 0v3Z" fill="${shirt}"/><path d="M17 24h6v6a5 5 0 0 1-6 0Z" fill="${skin}"/><ellipse cx="20" cy="18" rx="8" ry="10" fill="${skin}"/><path d="${hairline}" fill="${hair[(hash>>>16)%hair.length]}"/><g fill="#28232a"><circle cx="17" cy="18" r="1"/><circle cx="23" cy="18" r="1"/></g><path d="M18 23q2 2 4 0" fill="none" stroke="#694436" stroke-width="1.2" stroke-linecap="round"/></svg>`;
  }
  function updateProfile(){
    const user=status.user,name=user?.user_metadata?.full_name||user?.user_metadata?.name||user?.email?.split('@')[0]||'Sua conta';
    $('master-avatar').innerHTML=accountAvatar(user?.id);$('master-avatar').disabled=!status.ready;
    $('master-avatar').setAttribute('aria-label',`Abrir menu da conta de ${name}`);
    $('master-profile-name').textContent=name;$('master-profile-email').textContent=user?.email||'';
  }
  function hide(){
    if(!status.ready){enter(status.user);return;}
    $('master-auth-form').reset();$('master-auth').hidden=true;lock(false);updateProfile();$('master-avatar').focus();
  }
  async function submit(e){
    e.preventDefault();if(status.busy)return;
    if(!status.client){notice('O serviço de acesso não foi carregado. Verifique a conexão e recarregue a página.',true);return;}
    const mode=status.mode,email=$('master-email')?.value.trim(),password=$('master-password')?.value;
    if($('master-confirm')&&password!==$('master-confirm').value){notice('As senhas não coincidem. Confira a confirmação.',true);$('master-confirm').focus();return;}
    if(mode==='consent'){status.consent?.(true);return;}
    await run(mode==='forgot'?'Enviando e-mail…':mode==='login'?'Entrando…':mode==='register'?'Criando conta…':'Salvando senha…',async()=>{
      if(mode==='forgot'){
        const {error}=await status.client.auth.resetPasswordForEmail(email,{redirectTo:redirectUrl(true)});if(error)throw error;
        notice('Se o endereço estiver cadastrado, você receberá um e-mail com instruções. Confira também o spam.');return;
      }
      if(mode==='login'||mode==='register'){
        const result=mode==='login'?await status.client.auth.signInWithPassword({email,password}):await status.client.auth.signUp({email,password,options:{emailRedirectTo:redirectUrl()}});
        if(result.error)throw result.error;
        $('master-password').value='';if($('master-confirm'))$('master-confirm').value='';
        if(result.data.session)setTimeout(()=>handleSession('SIGNED_IN',result.data.session),0);
        else notice('Verifique sua caixa de entrada para confirmar o cadastro e depois entre na sua conta.');
        return;
      }
      const attrs={password};
      if($('master-nonce-wrap')&&!$('master-nonce-wrap').hidden)attrs.nonce=$('master-nonce').value.trim();
      if($('master-current-wrap')&&!$('master-current-wrap').hidden)attrs.current_password=$('master-current').value;
      const {error}=await status.client.auth.updateUser(attrs);
      if(error){
        if(error.code==='reauthentication_needed'){await requestNonce();return;}
        if(error.code==='current_password_missing'){
          $('master-current-wrap').hidden=false;$('master-current').disabled=false;notice('Informe a senha atual para confirmar a alteração.',true);$('master-current').focus();return;
        }
        if(error.status===401||error.code==='session_not_found'){
          signedOut('Sua sessão expirou. Entre novamente ou solicite outro link de recuperação.');return;
        }
        throw error;
      }
      status.recovery=false;sessionStorage.removeItem(recoveryKey);clearAuthUrl();
      if(status.ready){hide();toast('Senha atualizada com sucesso.');}
      else{notice('Senha atualizada. Carregando seu progresso…');setTimeout(()=>enter(status.user),0);}
    });
  }
  async function requestNonce(){
    const {error}=await status.client.auth.reauthenticate();if(error)throw error;
    $('master-nonce-wrap').hidden=false;$('master-nonce').disabled=false;
    notice('Enviamos um código de confirmação para seu e-mail ou telefone. Informe-o para salvar a senha.');$('master-nonce').focus();
  }
  function clearAuthUrl(){
    const url=new URL(location.href);for(const key of ['auth','code','error','error_code','error_description'])url.searchParams.delete(key);
    if(/access_token=|refresh_token=|error=|type=recovery/.test(url.hash))url.hash='';history.replaceState(null,'',url);
  }
  async function consent(user){
    const {data,error}=await status.client.from('master_consents').select('policy_version').eq('user_id',user.id).maybeSingle();if(error)throw error;
    if(data?.policy_version===cfg.privacyVersion)return true;
    show('consent');const agreed=await new Promise(resolve=>status.consent=resolve);status.consent=null;
    if(!agreed)return false;
    const {error:writeError}=await status.client.from('master_consents').insert({user_id:user.id,policy_version:cfg.privacyVersion});if(writeError)throw writeError;
    return true;
  }
  // Postgres jsonb returns object keys in its own order; compare payloads independent of key order.
  const canon=value=>JSON.stringify(value,(k,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.keys(x).sort().map(name=>[name,x[name]])):x);
  const pendingKey=id=>'master_auth_pending_'+id;
  function pending(id){return read(pendingKey(id))||{};}
  function cancelSync(){status.ready=false;status.epoch++;for(const timer of status.timers.values())clearTimeout(timer);status.timers.clear();}
  async function syncKey(key){
    if(!status.ready||!status.user||!keys.includes(key))return;
    const raw=localStorage.getItem(key),value=read(key);if(value===null)return;
    const epoch=status.epoch,userId=status.user.id;
    const {data:latest,error:readError}=await status.client.from('master_progress').select('storage_key,payload').eq('user_id',userId);
    if(readError){syncNotice('Sincronização pendente. Seu progresso continua salvo neste dispositivo.');throw readError;}
    if(epoch!==status.epoch)return;
    const remote=latest?.find(row=>row.storage_key===key);
    const remoteCanon=remote?canon(remote.payload):null;
    if(remote&&remoteCanon!==status.baseline.get(key)&&remoteCanon!==canon(value)){
      originalSet.call(localStorage,'master_conflict_backup_'+userId+'_'+Date.now(),JSON.stringify(Object.fromEntries(latest.map(row=>[row.storage_key,row.payload]))));
      toast('Outro dispositivo alterou o progresso. Cópia da versão remota preservada; disponível no menu da conta.');
    }
    const {error}=await status.client.from('master_progress').upsert({user_id:userId,storage_key:key,payload:value,updated_at:new Date().toISOString()},{onConflict:'user_id,storage_key'});
    if(error){if(epoch===status.epoch)syncNotice('Sincronização pendente. Seu progresso continua salvo neste dispositivo.');throw error;}
    if(epoch===status.epoch){
      status.baseline.set(key,canon(value));
      const queued=pending(userId);
      if(queued[key]===raw){delete queued[key];originalSet.call(localStorage,pendingKey(userId),JSON.stringify(queued));}
      syncNotice(Object.keys(queued).length?'Há alterações aguardando sincronização.':'Progresso sincronizado.');
    }
  }
  async function syncAll(){syncNotice('Sincronizando…');await Promise.all(keys.map(syncKey));syncNotice('Progresso sincronizado.');}
  function syncSoon(key){
    if(!status.ready)return;clearTimeout(status.timers.get(key));syncNotice('Salvo neste dispositivo. Sincronizando…');
    status.timers.set(key,setTimeout(()=>{status.timers.delete(key);syncKey(key).catch(()=>{});},800));
  }
  Storage.prototype.setItem=function(key,value){originalSet.call(this,key,value);if(this===localStorage&&keys.includes(String(key))&&status.ready&&status.user){
      const queued=pending(status.user.id);queued[String(key)]=String(value);
      originalSet.call(localStorage,pendingKey(status.user.id),JSON.stringify(queued));syncSoon(String(key));
    }};
  async function enter(user){
    if(!user||status.recovery||status.entering?.id===user.id||status.ready&&status.user?.id===user.id)return;
    cancelSync();const epoch=status.epoch;status.user=user;status.entering={id:user.id,epoch};lock(true);$('master-auth').hidden=false;
    $('master-retry').hidden=true;notice('Carregando sua conta e seu progresso…');
    const previousOwner=localStorage.getItem(ownerKey);
    try{
      // The event provides a session, but validate the user with Auth before loading progress.
      const {data,error}=await status.client.auth.getUser();if(error)throw error;
      if(epoch!==status.epoch)return;
      if(data.user?.id!==user.id)throw new Error('A conta mudou. Entre novamente.');
      if(!await consent(user)){if(epoch===status.epoch)await signOut();return;}
      if(epoch!==status.epoch)return;
      const {data:remote,error:loadError}=await status.client.from('master_progress').select('storage_key,payload').eq('user_id',user.id);if(loadError)throw loadError;
      if(epoch!==status.epoch)return;
      status.baseline=new Map((remote||[]).map(row=>[row.storage_key,canon(row.payload)]));
      let importLocal=!remote?.length&&previousOwner===user.id;
      if(!remote?.length&&!previousOwner&&keys.some(k=>read(k)&&Object.keys(read(k)).length)){
        importLocal=confirm('Encontramos progresso anterior neste navegador. Deseja vinculá-lo à sua conta? Cancelar inicia com progresso vazio e mantém uma cópia de segurança local.');
        if(!importLocal){const backup=Object.fromEntries(keys.map(k=>[k,read(k)]));originalSet.call(localStorage,'master_guest_backup_'+Date.now(),JSON.stringify(backup));}
      }
      if(!importLocal){for(const key of keys)localStorage.removeItem(key);for(const row of remote||[])if(keys.includes(row.storage_key))originalSet.call(localStorage,row.storage_key,JSON.stringify(row.payload));}
      const queued=pending(user.id);
      const conflicts=keys.filter(key=>queued[key]&&localStorage.getItem(key)&&queued[key]!==localStorage.getItem(key));
      if(conflicts.length){originalSet.call(localStorage,'master_conflict_backup_'+user.id+'_'+Date.now(),JSON.stringify(Object.fromEntries(keys.map(key=>[key,read(key)]))));}
      for(const key of keys)if(typeof queued[key]==='string')originalSet.call(localStorage,key,queued[key]);
      originalSet.call(localStorage,ownerKey,user.id);status.ready=true;
      if(importLocal||Object.keys(queued).length){try{await syncAll();}catch{syncNotice('Sincronização pendente. Seu progresso continua salvo neste dispositivo.');}}
      if(epoch!==status.epoch)return;
      // Refresh every module before exposing any account data; no reload or stale user state.
      window.dispatchEvent(new Event('master-auth-ready'));
      clearAuthUrl();hide();if(conflicts.length)toast('Alterações locais recuperadas. Uma cópia da versão do servidor foi preservada neste dispositivo.');if(!Object.keys(pending(user.id)).length)syncNotice('Progresso carregado da sua conta.');
    }catch(e){
      if(epoch!==status.epoch)return;status.ready=false;show('login','Não foi possível carregar seu progresso. '+errorText(e),true);$('master-retry').hidden=false;
    }finally{if(status.entering?.epoch===epoch)status.entering=null;}
  }
  function exportConflict(){
    const id=status.user?.id;if(!id)return;
    const prefix='master_conflict_backup_'+id+'_',name=Object.keys(localStorage).filter(key=>key.startsWith(prefix)).sort().at(-1);
    if(!name){toast('Nenhuma cópia de conflito disponível para esta conta.');return;}
    const copy=read(name),backup={app:'MASTER_P2_Lucas_Lessa',data:copy.master_p2_lucas_v1||{},experience:copy.master_p2_hig_v2,p1:copy.master_p1_lucas_v4};
    const url=URL.createObjectURL(new Blob([JSON.stringify(backup,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='MASTER-copia-conflito.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function signedOut(message='Sua sessão terminou. Entre novamente para continuar.'){
    window.FocusTimer?.pause();
    cancelSync();status.entering=null;status.consent?.(false);status.user=null;status.recovery=false;sessionStorage.removeItem(recoveryKey);
    window.dispatchEvent(new Event('master-auth-ended'));
    closeProfile();updateProfile();window.HIG?.closeOverlay();show('login',message);
  }
  async function signOut(){
    if(status.busy)return;
    window.FocusTimer?.pause();
    await run('Saindo da conta…',async()=>{
      // Keep local data and ownership if sync is pending; another account never imports it.
      if(status.ready){try{await syncAll();}catch{notice('Há progresso salvo apenas neste dispositivo. Tente sincronizar antes de sair.',true);if($('master-auth').hidden)toast('Não foi possível sincronizar. Tente novamente antes de sair.');return;}}
      const leavingUserId=status.user?.id;
      const {error}=await status.client.auth.signOut({scope:'local'});if(error)throw error;
      if(leavingUserId&&localStorage.getItem(ownerKey)===leavingUserId&&!Object.keys(pending(leavingUserId)).length){for(const key of keys)localStorage.removeItem(key);localStorage.removeItem(ownerKey);localStorage.removeItem(pendingKey(leavingUserId));}
      signedOut('Você saiu da conta.');
    });
  }
  function handleSession(event,session){
    if(event==='SIGNED_OUT'){signedOut();return;}
    if(!session?.user)return;
    if(event==='PASSWORD_RECOVERY'){
      cancelSync();status.consent?.(false);status.entering=null;status.user=session.user;status.recovery=true;sessionStorage.setItem(recoveryKey,'yes');clearAuthUrl();show('recovery');return;
    }
    if(status.recovery){status.user=session.user;return;}
    if(status.user&&status.user.id!==session.user.id){window.FocusTimer?.pause();cancelSync();status.consent?.(false);}
    status.user=session.user;updateProfile();
    if(!status.ready)enter(session.user);
  }
  async function start(){
    interfaceHtml();show('login','Verificando sessão…');
    if(!cfg?.url||!cfg?.publishableKey||!window.supabase?.createClient){notice('O serviço de acesso não foi carregado. Verifique a conexão e recarregue a página.',true);$('master-submit').disabled=true;$('master-google').disabled=true;return;}
    try{
      const params=new URLSearchParams(location.search),hash=new URLSearchParams(location.hash.slice(1));
      const callbackError=params.get('error_description')||hash.get('error_description');
      status.recovery=!callbackError&&(params.get('auth')==='recovery'||hash.get('type')==='recovery'||sessionStorage.getItem(recoveryKey)==='yes');
      status.client=window.supabase.createClient(cfg.url,cfg.publishableKey);
      // Never await Supabase calls inside this callback: they can hold the Auth lock.
      status.client.auth.onAuthStateChange((event,session)=>{
        if(status.initializing){if(event==='PASSWORD_RECOVERY')status.recovery=true;return;}
        if(event==='SIGNED_OUT')cancelSync(); // Lock immediately, before any deferred work.
        if(event==='SIGNED_OUT')lock(true);
        setTimeout(()=>handleSession(event,session),0);
      });
      window.MASTER_AUTH={user:()=>status.user,signOut,sync:syncAll,exportConflict,changePassword:()=>{if(status.ready)show('password');}};
      const {data,error}=await status.client.auth.getSession();status.initializing=false;if(error)throw error;
      if(callbackError){status.recovery=false;sessionStorage.removeItem(recoveryKey);clearAuthUrl();show('forgot','O link é inválido, expirou ou já foi utilizado. Solicite um novo e-mail.',true);}
      else if(data.session&&status.recovery){status.user=data.session.user;sessionStorage.setItem(recoveryKey,'yes');clearAuthUrl();show('recovery');}
      else if(data.session)handleSession('INITIAL_SESSION',data.session);
      else{const recovery=status.recovery;status.recovery=false;sessionStorage.removeItem(recoveryKey);clearAuthUrl();show(recovery?'forgot':'login',recovery?'Não foi possível validar o link. Solicite um novo e-mail.':'Entre para acessar seu ambiente de estudos.',recovery);}
    }catch(e){notice(errorText(e),true);}
    window.addEventListener('online',()=>{if(status.ready)keys.forEach(syncSoon);});
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&status.ready)keys.forEach(syncSoon);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
