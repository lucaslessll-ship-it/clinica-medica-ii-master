/* Dicas de funcionalidades: uma por visita, com opção de fechar e de dispensar.
   Aparece só quando nada mais está em foco e destaca o botão que explica.
   O modo foco ganha um realce permanente até ser usado pela primeira vez. */
(() => {
  'use strict';
  const CHAVE = 'master_dicas_v1';
  const ESPERA_MS = 3500;
  const INTERVALO_MS = 6 * 3600 * 1000;
  const DICAS = [
    { id: 'foco', alvo: '.focus-trigger', titulo: 'Modo foco', texto: 'Esconde menus e distrações e abre a aula em tela cheia. Toque de novo, ou aperte F, para voltar.' },
    { id: 'pomodoro', alvo: '#focus-top', titulo: 'Pomodoro configurável', texto: 'Defina foco, pausa curta, pausa longa e a cada quantos blocos ela chega. O aviso de fim pergunta se você descansa ou continua.' },
    { id: 'marcas', alvo: '', titulo: 'Marque e comente o texto', texto: 'Selecione um trecho da aula para destacar em quatro cores, sublinhar ou escrever um comentário. Tudo fica reunido por aula na Biblioteca.' },
    { id: 'busca', alvo: '.search-trigger', titulo: 'Busca em todo o conteúdo', texto: 'Encontre aulas, questões e cursos em segundos. No computador, use Ctrl+K ou ⌘K.' },
    { id: 'assistente', alvo: '[data-ai-open]', titulo: 'Assistente de estudo', texto: 'Pergunte sobre qualquer aula: ele responde com base no conteúdo do site e indica onde revisar.' },
    { id: 'aparencia', alvo: '.settings-trigger', titulo: 'Aparência e leitura', texto: 'Troque o tema claro ou escuro, aumente a letra e reduza movimento para ler com mais conforto.' }
  ];
  let cartao = null, alvoAtual = null, mostradaNaSessao = false;

  const ler = () => {
    try { const v = JSON.parse(localStorage.getItem(CHAVE) || 'null'); if (v && typeof v === 'object') return { vistas: Array.isArray(v.vistas) ? v.vistas : [], desligado: !!v.desligado, ultimo: Number(v.ultimo) || 0, focoUsado: !!v.focoUsado }; } catch {}
    return { vistas: [], desligado: false, ultimo: 0, focoUsado: false };
  };
  const gravar = estado => { try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch {} };
  const visivel = el => { if (!el) return false; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
  const livre = () => {
    const html = document.documentElement, corpo = document.body;
    if (html.classList.contains('master-auth-locked')) return false;
    if (corpo.classList.contains('focus-mode')) return false;
    const sobreposto = document.getElementById('hig-overlay');
    if (sobreposto && !sobreposto.hidden) return false;
    const fim = document.getElementById('focus-end');
    if (fim && !fim.hidden) return false;
    if (document.querySelector('.scrim.open, dialog[open]')) return false;
    return true;
  };

  function limparAlvo() { alvoAtual?.classList.remove('dica-alvo'); alvoAtual = null; }
  function fechar() { limparAlvo(); if (cartao) cartao.hidden = true; }

  function montar() {
    cartao = document.createElement('aside');
    cartao.className = 'dica';
    cartao.hidden = true;
    cartao.setAttribute('role', 'status');
    cartao.setAttribute('aria-live', 'polite');
    cartao.innerHTML = '<button type="button" class="dica-x" data-dica="fechar" aria-label="Fechar dica">&#10005;</button>'
      + '<p class="dica-kicker">Dica</p><h2 class="dica-titulo"></h2><p class="dica-texto"></p>'
      + '<div class="dica-acoes"><button type="button" class="btn primary" data-dica="entendi">Entendi</button>'
      + '<button type="button" class="btn" data-dica="desligar">Não mostrar dicas</button></div>';
    document.body.append(cartao);
    cartao.addEventListener('click', e => {
      const botao = e.target.closest('[data-dica]');
      if (!botao) return;
      const estado = ler();
      const atual = cartao.dataset.id;
      if (atual && !estado.vistas.includes(atual)) estado.vistas.push(atual);
      if (botao.dataset.dica === 'desligar') estado.desligado = true;
      gravar(estado);
      fechar();
    });
    cartao.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); cartao.querySelector('[data-dica="fechar"]').click(); } });
  }

  function exibir(dica,solicitada=false) {
    if (!cartao) montar();
    limparAlvo();
    const alvo = dica.alvo ? document.querySelector(dica.alvo) : null;
    if (alvo && visivel(alvo)) { alvo.classList.add('dica-alvo'); alvoAtual = alvo; }
    cartao.dataset.id = dica.id;
    cartao.querySelector('.dica-titulo').textContent = dica.titulo;
    cartao.querySelector('.dica-texto').textContent = dica.texto;
    const main=document.getElementById('main-content');
    const intro=main?.querySelector('.ed-dashboard-intro');
    if(intro)intro.after(cartao);else if(main)main.append(cartao);
    cartao.hidden = false;
    if(solicitada)cartao.scrollIntoView({block:'center',behavior:'instant'});
    mostradaNaSessao = true;
    const estado = ler();
    estado.ultimo = Date.now();
    gravar(estado);
  }

  function proxima() {
    const estado = ler();
    return DICAS.find(d => !estado.vistas.includes(d.id) && (!d.alvo || visivel(document.querySelector(d.alvo))));
  }

  function tentar() {
    if (mostradaNaSessao) return;
    const estado = ler();
    if (estado.desligado) return;
    if (Date.now() - estado.ultimo < INTERVALO_MS) return;
    if (!livre()) { setTimeout(tentar, 8000); return; }
    const dica = proxima();
    if (dica) exibir(dica);
  }

  // O realce do modo foco vale até a primeira vez que o botão é usado.
  function realcarFoco() {
    const botao = document.querySelector('.focus-trigger');
    if (!botao) return;
    botao.classList.toggle('dica-foco', !ler().focoUsado);
    botao.addEventListener('click', () => {
      const estado = ler();
      if (!estado.focoUsado) { estado.focoUsado = true; if (!estado.vistas.includes('foco')) estado.vistas.push('foco'); gravar(estado); }
      botao.classList.remove('dica-foco');
      if (cartao && cartao.dataset.id === 'foco') fechar();
    });
  }

  function iniciar() {
    realcarFoco();
    const quando = () => setTimeout(tentar, ESPERA_MS);
    if (document.documentElement.classList.contains('master-auth-locked')) {
      window.addEventListener('master-auth-ready', quando, { once: true });
    } else quando();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar, { once: true });
  else iniciar();
  window.Dicas = {
    mostrar() { const e = ler(); e.desligado = false; e.vistas = []; e.ultimo = 0; gravar(e); mostradaNaSessao = false; const d = proxima(); if (d) exibir(d,true); },
    fechar
  };
})();
