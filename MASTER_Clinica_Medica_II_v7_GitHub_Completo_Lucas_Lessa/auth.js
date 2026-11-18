/* Account UI and per-user progress. Only the public Supabase client belongs here. */
(() => {
  'use strict';
  const cfg = window.MASTER_AUTH_CONFIG;
  const keys = cfg?.progressKeys || [];
  const HIGKEY = 'master_p2_hig_v2';
  const ownerKey = 'master_auth_local_owner';
  const recoveryKey = 'master_password_recovery';
  let sessionStore;
  const originalSet = Storage.prototype.setItem;
  const $ = id => document.getElementById(id);
  const status = {client:null, user:null, ready:false, busy:false, mode:'login', initializing:true, timers:new Map(), epoch:0, entering:null, recovery:false, baseline:new Map(), baseObj:new Map(), consent:null};
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
  const quietSync=/^(Sincronizando|Salvo neste dispositivo|Progresso sincronizado)/;
  function syncNotice(text){$('master-sync-status').textContent=quietSync.test(text)?'':text;}
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
    status.mode=mode;closeProfile(true);lock(true);$('master-auth').hidden=false;
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
      title='Seu estudo, no seu ritmo.';description='Entre para retomar suas aulas e sincronizar seu progresso.';fields=emailField()+field('master-password','Senha','password','current-password')+`<label class="auth-consent auth-remember"><input id="master-remember" type="checkbox" ${MasterSessionStorage.remembered()?'checked':''} aria-describedby="master-remember-hint"> Manter conectado neste dispositivo</label><p id="master-remember-hint" class="auth-hint">Use em um dispositivo pessoal. Desmarcado, a sessão fica apenas nesta aba. Você pode encerrar o acesso em “Sair da conta”.</p>`;submit='Entrar';
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
    el.innerHTML=`<div class="auth-panel"><div class="auth-brand">Estudo Master</div><div id="master-auth-tabs" class="auth-tabs"><button id="master-login-tab" type="button" aria-pressed="true">Entrar</button><button id="master-register-tab" type="button" aria-pressed="false">Criar conta</button></div><h1 id="master-auth-title" tabindex="-1"></h1><p id="master-auth-description"></p><form id="master-auth-form"><div id="master-auth-fields"></div><button id="master-submit" class="btn primary" type="submit" data-label="Entrar">Entrar</button></form><button id="master-google" class="btn auth-google" type="button">Continuar com Google</button><div class="auth-links"><button id="master-forgot" class="auth-link" type="button">Esqueci a senha</button><button id="master-back" class="auth-link" type="button" hidden>Voltar para entrar</button></div><p id="master-auth-message" role="status" aria-live="polite" aria-atomic="true"></p><button id="master-retry" class="btn" type="button" hidden>Tentar carregar progresso novamente</button><details class="auth-privacy"><summary>Privacidade e seus dados</summary><p>Seu e-mail identifica sua conta; respostas e anotações são armazenadas no Supabase para sincronização. Nunca inclua dados de pacientes identificáveis. Para solicitar acesso ou exclusão dos seus dados, contate o responsável pela plataforma. O registro automático de atividades informa ao responsável Lucas Lessa áreas acessadas, resultados e tempo estimado por até 90 dias, com limpeza diária. Configurações anteriores de desativação são respeitadas. Não registra texto digitado, buscas, anotações ou conversas. O controle fica em Perfil → Privacidade e atividade. Este aviso resumido não substitui uma Política de Privacidade completa.</p></details><noscript>Ative o JavaScript para acessar seu ambiente de estudo.</noscript></div>`;
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
      const profile=$('master-profile');
      const open=profile.hidden || window.MasterWindowMotion?.isClosing(profile);
      if(open){
        if(window.MasterWindowMotion)window.MasterWindowMotion.show(profile,{kind:'modal'});
        else profile.hidden=false;
      }else closeProfile();
      $('master-avatar').setAttribute('aria-expanded',String(open));
      if(open)$('master-change-password').focus();
    });
    $('master-avatar-change').addEventListener('click',()=>{
      if(!status.ready || !status.user)return;
      const picker=$('master-avatar-picker'),expanded=picker.hidden;
      picker.hidden=!expanded;
      $('master-avatar-change').setAttribute('aria-expanded',String(expanded));
      if(expanded)picker.querySelector('[aria-pressed="true"]')?.focus({preventScroll:true});
    });
    $('master-avatar-picker').addEventListener('click',event=>{
      const btn=event.target.closest('[data-avatar-index]');
      if(!btn||!status.ready||!status.user)return;
      const i=Number(btn.dataset.avatarIndex);
      if(!Number.isInteger(i)||i<0||i>11)return;
      try{localStorage.setItem(AVATAR_CHOICE+status.user.id,String(i))}
      catch{notice('Não foi possível salvar o avatar neste navegador.',true);return}
      $('master-avatar').innerHTML=accountAvatar(status.user.id);
      $('master-avatar-picker').querySelectorAll('[data-avatar-index]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.avatarIndex)===i)));
      btn.focus({preventScroll:true});
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
  function closeProfile(instant=false){
    const profile=$('master-profile');
    if(profile && !profile.hidden){
      if(instant || document.documentElement.classList.contains('master-auth-locked') || !status.user){
        window.MasterWindowMotion?.cancel(profile);
        profile.hidden=true;
      }else if(window.MasterWindowMotion){
        if(!window.MasterWindowMotion.isClosing(profile))window.MasterWindowMotion.hide(profile,{kind:'modal'});
      }else profile.hidden=true;
    }
    $('master-avatar')?.setAttribute('aria-expanded','false');
  }
  const AVATAR_CHOICE='master_avatar_choice_v1:';
  let avatarSerial=0;
  function avatarHash(id){
    let hash=2166136261;
    for(const char of String(id||'guest'))hash=Math.imul(hash^char.codePointAt(0),16777619)>>>0;
    return hash;
  }
  function avatarChoice(id){
    const fallback=avatarHash(id)%12;
    if(!id)return fallback;
    try{
      const value=localStorage.getItem(AVATAR_CHOICE+id);
      if(value!==null&&/^(?:[0-9]|1[01])$/.test(value))return Number(value);
    }catch{}
    return fallback;
  }
  /* Avatares vetoriais com gradientes e sombras, estilo 3D, processados localmente.
     Não enviam UUID, e-mail ou foto a fornecedores de imagens. */
  function accountAvatar(id,choice){
    const i=Number.isInteger(choice)&&choice>=0&&choice<12?choice:avatarChoice(id);
    const uid='master-avatar-'+(++avatarSerial);
    const skins=['#f5cda9','#ddb18b','#ad7257','#8b5843','#e5bc96','#bf8669',
      '#e8b88d','#80513c','#f2c5a5','#cc9272','#a76b51','#ecc4a7'];
    const coats=['#147b70','#395f99','#975f7e','#9b7348','#396b72','#675fa2',
      '#128b7b','#bb6860','#385c91','#736b9a','#277d87','#8d6f50'];
    const hairs=['#332b31','#27282f','#412d27','#492f27','#6b4832','#24242c',
      '#493126','#2f3336','#5a392c','#242832','#3c3433','#654431'];
    const skin=skins[i],shirt=coats[i],hair=hairs[i];
    const styles=[
      'M29 42Q23 22 38 17Q55 9 69 22Q78 31 69 43Q64 31 55 29Q42 36 32 33Z',
      'M26 43Q19 33 29 23Q32 12 44 17Q56 10 66 21Q79 21 73 41L66 39Q69 28 60 29L43 31Q34 26 33 42Z',
      'M28 45Q21 24 39 17Q52 13 70 24L71 41Q63 38 62 31Q53 38 34 33L32 47Z',
      'M26 44Q23 28 33 22Q43 9 61 17Q77 20 74 44L67 43Q67 31 59 30Q42 38 32 33L31 46Z',
      'M25 43Q22 22 41 16Q53 10 69 23Q77 33 72 50Q65 45 65 31Q51 41 34 32L31 51Z',
      'M29 40Q31 19 49 18Q70 18 72 40Q62 29 48 32Q36 30 29 40Z'
    ];
    const style=i%styles.length;
    const glasses=i%5===2||i%7===4;
    const freckles=i%4===1;
    const beard=i===3||i===7||i===10;
    return '<svg class="avatar-3d-art" viewBox="0 0 100 100" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">'+
      '<defs>'+
        '<radialGradient id="'+uid+'-bg" cx="28%" cy="16%" r="94%"><stop stop-color="#ffffff"/><stop offset=".53" stop-color="#d9e9e6"/><stop offset="1" stop-color="#a7cec8"/></radialGradient>'+
        '<radialGradient id="'+uid+'-skin" cx="29%" cy="24%" r="84%"><stop stop-color="#fff3df"/><stop offset=".36" stop-color="'+skin+'"/><stop offset="1" stop-color="#96604f"/></radialGradient>'+
        '<linearGradient id="'+uid+'-shirt" x1="12%" y1="0%" x2="90%" y2="100%"><stop stop-color="#f3fffb" stop-opacity=".28"/><stop offset=".38" stop-color="'+shirt+'"/><stop offset="1" stop-color="#203844"/></linearGradient>'+
        '<linearGradient id="'+uid+'-hair" x1="0%" y1="0%" x2="98%" y2="90%"><stop stop-color="#b08d70" stop-opacity=".55"/><stop offset=".28" stop-color="'+hair+'"/><stop offset="1" stop-color="#141920"/></linearGradient>'+
      '</defs>'+
      '<circle cx="50" cy="50" r="49" fill="url(#'+uid+'-bg)"/>'+
      '<ellipse cx="50" cy="92" rx="34" ry="6" fill="#294f56" opacity=".17"/>'+
      '<path d="M10 101Q13 76 35 72L50 78L65 72Q87 75 90 101Z" fill="url(#'+uid+'-shirt)"/>'+
      '<path d="M36 71L50 86L64 71L57 69L50 78L43 69Z" fill="#f3f5ee" opacity=".9"/>'+
      '<path d="M43 63h14v13q-7 8-14 0Z" fill="'+skin+'"/>'+
      '<ellipse cx="26" cy="50" rx="5" ry="8" fill="'+skin+'"/>'+
      '<ellipse cx="74" cy="50" rx="5" ry="8" fill="'+skin+'"/>'+
      '<ellipse cx="50" cy="47" rx="24" ry="29" fill="url(#'+uid+'-skin)"/>'+
      '<path d="'+styles[style]+'" fill="url(#'+uid+'-hair)"/>'+
      (style===1||style===4?'<path d="M27 37Q22 55 33 65M73 37Q77 54 66 66" stroke="'+hair+'" stroke-width="7" fill="none" stroke-linecap="round"/>':'')+
      (style===3?'<ellipse cx="52" cy="16" rx="10" ry="7" fill="url(#'+uid+'-hair)"/>':'')+
      '<path d="M34 42q5-3 10 0M56 42q5-3 10 0" fill="none" stroke="'+hair+'" stroke-width="2" stroke-linecap="round"/>'+
      '<ellipse cx="40" cy="49" rx="2.4" ry="2.7" fill="#22232b"/><ellipse cx="60" cy="49" rx="2.4" ry="2.7" fill="#22232b"/>'+
      '<circle cx="40.7" cy="48.3" r=".8" fill="#fff"/><circle cx="60.7" cy="48.3" r=".8" fill="#fff"/>'+
      '<path d="M50 48q-3 9-1 11q2 2 5 0" stroke="#8b5d4b" opacity=".48" stroke-width="1.7" fill="none" stroke-linecap="round"/>'+
      '<path d="M43 65q7 6 14 0" stroke="#874a4b" stroke-width="2" fill="none" stroke-linecap="round"/>'+
      (freckles?'<g fill="#ab6c55" opacity=".5"><circle cx="35" cy="58" r="1"/><circle cx="39" cy="59" r=".9"/><circle cx="61" cy="59" r=".9"/><circle cx="65" cy="58" r="1"/></g>':'')+
      (beard?'<path d="M31 60Q37 80 50 78Q64 80 69 60Q60 69 50 72Q40 69 31 60Z" fill="'+hair+'" opacity=".45"/>':'')+
      (glasses?'<g fill="none" stroke="#385963" stroke-width="2.3"><rect x="30" y="44" width="18" height="13" rx="5"/><rect x="52" y="44" width="18" height="13" rx="5"/><path d="M48 49q2-2 4 0M27 49h3M70 49h3"/></g>':'')+
      '<path d="M25 83Q34 76 41 78M75 83Q66 76 59 78" stroke="#fff" stroke-opacity=".23" stroke-width="3" fill="none" stroke-linecap="round"/>'+
      '<circle cx="50" cy="50" r="48.5" fill="none" stroke="#fff" stroke-opacity=".56" stroke-width="2"/>'+
      '</svg>';
  }

  function updateProfile(){
    const user=status.user,name=user?.user_metadata?.full_name||user?.user_metadata?.name||user?.email?.split('@')[0]||'Sua conta';
    $('master-avatar').innerHTML=accountAvatar(user?.id);$('master-avatar').disabled=!status.ready;
    const picker=$('master-avatar-picker');
    if(picker && user){
      const selected=avatarChoice(user.id);
      picker.innerHTML='<p class="avatar-picker-caption">Escolha seu estilo 3D</p><div class="avatar-picker-grid">'+
        Array.from({length:12},(_,i)=>'<button type="button" data-avatar-index="'+i+'" aria-label="Avatar '+(i+1)+'" aria-pressed="'+String(i===selected)+'">'+accountAvatar(user.id,i)+'</button>').join('')+
        '</div><small>Preferência salva neste dispositivo.</small>';
    }
    if(picker)picker.hidden=true;
    $('master-avatar-change')?.setAttribute('aria-expanded','false');
    $('master-avatar').setAttribute('aria-label',`Abrir menu da conta de ${name}`);
    $('master-profile-name').textContent=name;$('master-profile-email').textContent=user?.email||'';
  }
  function hide(){
    if(!status.ready){enter(status.user);return;}
    $('master-auth-form').reset();$('master-auth').hidden=true;lock(false);updateProfile();(document.getElementById('main-content')||$('master-avatar')).focus({preventScroll:true});
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
        if(mode==='login')sessionStore.setRemember($('master-remember').checked);
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
  // Values this tab already sent: a read that returns one of them is our own write, not another device.
  const sent=new Map();
  function rememberSent(key,value){const list=sent.get(key)||[];list.push(value);if(list.length>30)list.shift();sent.set(key,list);}
  let lastConflictNotice=0;
  function keepConflictCopy(userId,rows){
    const prefix='master_conflict_backup_'+userId+'_';
    try{
      originalSet.call(localStorage,prefix+Date.now(),JSON.stringify(Object.fromEntries(rows.map(row=>[row.storage_key,row.payload]))));
      // Keep only the five most recent copies so repeated conflicts cannot fill the browser storage.
      Object.keys(localStorage).filter(name=>name.startsWith(prefix)).sort().slice(0,-5).forEach(name=>localStorage.removeItem(name));
    }catch{}
    if(Date.now()-lastConflictNotice>600000){lastConflictNotice=Date.now();toast('Outro dispositivo alterou o progresso. Cópia da versão remota preservada; disponível no menu da conta.');}
  }
  const pendingKey=id=>'master_auth_pending_'+id;
  function pending(id){return read(pendingKey(id))||{};}
  function cancelSync(){status.ready=false;status.epoch++;sent.clear();for(const timer of status.timers.values())clearTimeout(timer);status.timers.clear();}
  async function syncKey(key){
    if(!status.ready||!status.user||!keys.includes(key))return;
    const raw=localStorage.getItem(key),value=read(key);if(value===null)return;
    const epoch=status.epoch,userId=status.user.id;
    // Gravações idênticas aconteceriam a cada navegação: sem mudança real, não vai à rede.
    const current=canon(value);
    if(status.baseline.get(key)===current){
      const queued=pending(userId);
      if(key in queued){delete queued[key];originalSet.call(localStorage,pendingKey(userId),JSON.stringify(queued));}
      return;
    }
    const {data:latest,error:readError}=await status.client.from('master_progress').select('storage_key,payload').eq('user_id',userId);
    if(readError){syncNotice('Sincronização pendente. Seu progresso continua salvo neste dispositivo.');throw readError;}
    if(epoch!==status.epoch)return;
    const remote=latest?.find(row=>row.storage_key===key);
    const remoteCanon=remote?canon(remote.payload):null;
    const localCanon=current;
    let outgoing=value,outCanon=localCanon,merged=false;
    const alheio=remote&&remoteCanon!==status.baseline.get(key)&&remoteCanon!==localCanon&&!(sent.get(key)||[]).includes(remoteCanon);
    if(alheio&&key===HIGKEY&&window.MASTER_SYNC_MERGE){
      // Outro aparelho mexeu: mescla em silêncio (marcas, notas, pomodoro) em vez de sobrescrever.
      outgoing=window.MASTER_SYNC_MERGE.mesclarPrefs(status.baseObj.get(key),value,remote.payload);outCanon=canon(outgoing);merged=outCanon!==localCanon;
    }else if(alheio&&window.QuestionHistory?.BANK_KEYS.includes(key)){keepConflictCopy(userId,latest);outgoing=QuestionHistory.mergeProgressState(status.baseObj.get(key),value,remote.payload);outCanon=canon(outgoing);merged=outCanon!==localCanon;}else if(alheio)keepConflictCopy(userId,latest);
    rememberSent(key,outCanon);
    const {error}=await status.client.from('master_progress').upsert({user_id:userId,storage_key:key,payload:outgoing,updated_at:new Date().toISOString()},{onConflict:'user_id,storage_key'});
    if(error){if(epoch===status.epoch)syncNotice('Sincronização pendente. Seu progresso continua salvo neste dispositivo.');throw error;}
    if(epoch===status.epoch){
      status.baseline.set(key,outCanon);status.baseObj.set(key,outgoing);
      if(merged){originalSet.call(localStorage,key,JSON.stringify(outgoing));window.dispatchEvent(new CustomEvent('master-remote-merge',{detail:{key}}));}
      const queued=pending(userId);
      if(queued[key]===raw||merged&&key in queued){delete queued[key];originalSet.call(localStorage,pendingKey(userId),JSON.stringify(queued));}
      syncNotice(Object.keys(queued).length?'Há alterações aguardando sincronização.':'Progresso sincronizado.');
    }
  }
  // Busca silenciosa: só olha o carimbo (leve); baixa o conteúdo apenas se mudou.
  async function pullRemote(){
    if(!status.ready||!status.user||navigator.onLine===false||status.pulling)return;
    const epoch=status.epoch,userId=status.user.id;status.pulling=true;
    try{
      const {data:stamp}=await status.client.from('master_progress').select('updated_at').eq('user_id',userId).eq('storage_key',HIGKEY).maybeSingle();
      if(epoch!==status.epoch||!stamp||stamp.updated_at===status.stamp)return;
      const {data:row}=await status.client.from('master_progress').select('payload').eq('user_id',userId).eq('storage_key',HIGKEY).maybeSingle();
      if(epoch!==status.epoch||!row)return;
      status.stamp=stamp.updated_at;
      const rc=canon(row.payload),lc=canon(read(HIGKEY)||{});
      if(rc===lc||rc===status.baseline.get(HIGKEY)||(sent.get(HIGKEY)||[]).includes(rc))return;
      if(lc===status.baseline.get(HIGKEY)){ // nada pendente aqui: adota o remoto direto
        originalSet.call(localStorage,HIGKEY,JSON.stringify(row.payload));status.baseline.set(HIGKEY,rc);status.baseObj.set(HIGKEY,row.payload);
        window.dispatchEvent(new CustomEvent('master-remote-merge',{detail:{key:HIGKEY}}));
      }else await syncKey(HIGKEY);
    }catch{}finally{status.pulling=false;pullQuestionProgress().catch(()=>{});}
  }
  // Detecta alterações salvas em outros dispositivos para os três bancos de questões.
  async function pullQuestionProgress(){
    if(!status.ready||!status.user||navigator.onLine===false||status.pullingQuestions||!window.QuestionHistory)return;
    status.pullingQuestions=true;const epoch=status.epoch,userId=status.user.id;
    try{
      const {data,error}=await status.client.from('master_progress').select('storage_key,payload').eq('user_id',userId);
      if(error||epoch!==status.epoch)return;
      for(const row of data||[]){
        const key=row.storage_key;
        if(!QuestionHistory.BANK_KEYS.includes(key)||!keys.includes(key))continue;
        const rc=canon(row.payload),lc=canon(read(key)||{}),baseline=status.baseline.get(key);
        if(rc===lc){status.baseline.set(key,rc);status.baseObj.set(key,row.payload);continue;}
        if(rc===baseline||(sent.get(key)||[]).includes(rc))continue;
        if(lc===baseline||!localStorage.getItem(key)){
          originalSet.call(localStorage,key,JSON.stringify(row.payload));
          status.baseline.set(key,rc);status.baseObj.set(key,row.payload);
          window.dispatchEvent(new CustomEvent('master-remote-merge',{detail:{key}}));
        }else await syncKey(key);
      }
    }catch{}finally{status.pullingQuestions=false;}
  }
  async function syncAll(){syncNotice('Sincronizando…');await Promise.all(keys.map(syncKey));syncNotice('Progresso sincronizado.');}
  function syncSoon(key){
    if(!status.ready)return;clearTimeout(status.timers.get(key));syncNotice('Salvo neste dispositivo. Sincronizando…');
    status.timers.set(key,setTimeout(()=>{status.timers.delete(key);syncKey(key).catch(()=>{});},key===HIGKEY&&window.__pomodoroRunning?20000:800));
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
      status.baseline=new Map((remote||[]).map(row=>[row.storage_key,canon(row.payload)]));status.baseObj=new Map((remote||[]).map(row=>[row.storage_key,row.payload]));
      let importLocal=!remote?.length&&previousOwner===user.id;
      if(!remote?.length&&!previousOwner&&keys.some(k=>read(k)&&Object.keys(read(k)).length)){
        importLocal=confirm('Encontramos progresso anterior neste navegador. Deseja vinculá-lo à sua conta? Cancelar inicia com progresso vazio e mantém uma cópia de segurança local.');
        if(!importLocal){const backup=Object.fromEntries(keys.map(k=>[k,read(k)]));originalSet.call(localStorage,'master_guest_backup_'+Date.now(),JSON.stringify(backup));}
      }
      let mergedQuestionProgress=false;
      const previousQuestionStates=new Map();
      if(previousOwner===user.id&&window.QuestionHistory)for(const key of QuestionHistory.BANK_KEYS)previousQuestionStates.set(key,read(key));
      if(!importLocal){
        for(const key of keys)localStorage.removeItem(key);
        for(const row of remote||[])if(keys.includes(row.storage_key))originalSet.call(localStorage,row.storage_key,JSON.stringify(row.payload));
        if(previousOwner===user.id&&window.QuestionHistory){
          for(const key of QuestionHistory.BANK_KEYS){
            const local=previousQuestionStates.get(key),remoteState=read(key);
            if(!local)continue;
            if(!remoteState){originalSet.call(localStorage,key,JSON.stringify(local));mergedQuestionProgress=true;continue;}
            const merged=QuestionHistory.mergeProgressState(null,local,remoteState);
            if(canon(merged)!==canon(remoteState)){
              originalSet.call(localStorage,key,JSON.stringify(merged));
              mergedQuestionProgress=true;
            }
          }
        }
      }
      const queued=pending(user.id);
      const conflicts=keys.filter(key=>queued[key]&&localStorage.getItem(key)&&queued[key]!==localStorage.getItem(key));
      if(conflicts.length){originalSet.call(localStorage,'master_conflict_backup_'+user.id+'_'+Date.now(),JSON.stringify(Object.fromEntries(keys.map(key=>[key,read(key)]))));}
      for(const key of keys)if(typeof queued[key]==='string'){
        if(window.QuestionHistory?.BANK_KEYS.includes(key)){
          try{
            const saved=JSON.parse(queued[key]),current=read(key);
            const merged=QuestionHistory.mergeProgressState(null,saved,current);
            queued[key]=JSON.stringify(merged);
            originalSet.call(localStorage,key,queued[key]);
            originalSet.call(localStorage,pendingKey(user.id),JSON.stringify(queued));
          }catch{originalSet.call(localStorage,key,queued[key]);}
        }else originalSet.call(localStorage,key,queued[key]);
      }
      originalSet.call(localStorage,ownerKey,user.id);status.ready=true;
      if(importLocal||mergedQuestionProgress||Object.keys(queued).length){try{await syncAll();}catch{syncNotice('Sincronização pendente. Seu progresso continua salvo neste dispositivo.');}}
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
      sessionStore=window.MasterSessionStorage.create(cfg.url);
      status.client=window.supabase.createClient(cfg.url,cfg.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storage:sessionStore.storage}});
      // Never await Supabase calls inside this callback: they can hold the Auth lock.
      status.client.auth.onAuthStateChange((event,session)=>{
        if(status.initializing){if(event==='PASSWORD_RECOVERY')status.recovery=true;return;}
        if(event==='SIGNED_OUT')cancelSync(); // Lock immediately, before any deferred work.
        if(event==='SIGNED_OUT')lock(true);
        setTimeout(()=>handleSession(event,session),0);
      });
      window.MASTER_AUTH={flush:key=>syncKey(key),pull:pullRemote,user:()=>status.user,client:()=>status.client,signOut,sync:syncAll,exportConflict,changePassword:()=>{if(status.ready)show('password');}};
      const {data,error}=await status.client.auth.getSession();status.initializing=false;if(error)throw error;
      if(callbackError){status.recovery=false;sessionStorage.removeItem(recoveryKey);clearAuthUrl();show('forgot','O link é inválido, expirou ou já foi utilizado. Solicite um novo e-mail.',true);}
      else if(data.session&&status.recovery){status.user=data.session.user;sessionStorage.setItem(recoveryKey,'yes');clearAuthUrl();show('recovery');}
      else if(data.session)handleSession('INITIAL_SESSION',data.session);
      else{const recovery=status.recovery;status.recovery=false;sessionStorage.removeItem(recoveryKey);clearAuthUrl();show(recovery?'forgot':'login',recovery?'Não foi possível validar o link. Solicite um novo e-mail.':'Entre para acessar seu ambiente de estudos.',recovery);}
    }catch(e){notice(errorText(e),true);}
    window.addEventListener('online',()=>{if(status.ready)keys.forEach(syncSoon);});
    // Nova tentativa automática do que ficou pendente, sem depender do botão.
    setInterval(()=>{if(status.ready&&status.user&&navigator.onLine!==false)Object.keys(pending(status.user.id)).forEach(key=>syncKey(key).catch(()=>{}));},45000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&status.ready)keys.forEach(syncSoon);else if(status.ready)pullRemote();});
    window.addEventListener('focus',()=>pullRemote());
    setInterval(()=>{if(document.visibilityState==='visible')pullRemote();},15000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
