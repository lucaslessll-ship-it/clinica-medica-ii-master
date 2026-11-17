/* Marca-texto, sublinhado e comentários presos ao trecho da aula.
   Selecionar um trecho abre a barra de cores; o comentário vira uma bolha ao
   lado do texto. Tudo é gravado nas preferências, que já sobem para a conta,
   e aparece reunido por aula na Biblioteca pessoal. */
(() => {
  'use strict';
  const LEITURA = '.deep-block,.deep-lesson,.pocus-card-body,.pocus-sec,.course-body,.case-step,.insight';
  const CORES = [['amarelo', 'Amarelo'], ['verde', 'Verde'], ['azul', 'Azul'], ['rosa', 'Rosa']];
  let barra, caixa, emEdicao = null, agendado = false;

  const api = () => (typeof HIG !== 'undefined' && HIG.marcaAdd ? HIG : null);
  // A própria aula diz quem ela é (P2, P1 e Cirurgia usam rotas diferentes).
  const aulaEl = () => document.querySelector('#main-content .deep-lesson[data-lesson-key]');
  const aulaAtual = () => aulaEl()?.dataset.lessonKey || '';
  const rotaAtual = () => aulaEl()?.dataset.lessonRoute || '';
  const normal = t => t.replace(/\s+/g, ' ').trim();

  /* ---------- aplicar as marcas gravadas no texto renderizado ---------- */

  // Procura o trecho pelo texto e pelo contexto em volta; o conteúdo é gerado
  // a cada render, então a âncora não pode depender de índice de nó.
  function localizar(raiz, marca) {
    const nos = [];
    const andarilho = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
      acceptNode: no => {
        const pai = no.parentElement;
        if (!pai || pai.closest('script,style,.nota-bolha,.nota-barra,.nota-caixa')) return NodeFilter.FILTER_REJECT;
        const display = getComputedStyle(pai).display;
        if (display === 'flex' || display === 'grid' || display === 'inline-flex' || display === 'inline-grid') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let total = '';
    for (let no = andarilho.nextNode(); no; no = andarilho.nextNode()) { nos.push([no, total.length]); total += no.nodeValue; }
    const alvo = marca.texto;
    if (!alvo) return null;
    let inicio = -1;
    if (marca.antes || marca.depois) {
      const comContexto = total.indexOf((marca.antes || '') + alvo + (marca.depois || ''));
      if (comContexto >= 0) inicio = comContexto + (marca.antes || '').length;
    }
    if (inicio < 0) {
      let busca = total.indexOf(alvo), ocorrencia = 0;
      while (busca >= 0) {
        if (ocorrencia === (marca.ocorrencia || 0)) { inicio = busca; break; }
        ocorrencia++;
        busca = total.indexOf(alvo, busca + 1);
      }
      if (inicio < 0) inicio = total.indexOf(alvo);
    }
    if (inicio < 0) return null;
    const fim = inicio + alvo.length;
    const ponto = (posicao, final) => {
      for (const [no, base] of nos) {
        const limite = base + no.nodeValue.length;
        if (final ? (posicao > base && posicao <= limite) : (posicao >= base && posicao < limite)) return [no, posicao - base];
      }
      const ultimo = nos[nos.length - 1];
      return ultimo ? [ultimo[0], ultimo[0].nodeValue.length] : null;
    };
    const a = ponto(inicio, false), b = ponto(fim, true);
    if (!a || !b) return null;
    const faixa = document.createRange();
    faixa.setStart(a[0], a[1]);
    faixa.setEnd(b[0], b[1]);
    return faixa;
  }

  function pintar(faixa, marca) {
    const pedacos = [];
    const andarilho = document.createTreeWalker(faixa.commonAncestorContainer.nodeType === 1 ? faixa.commonAncestorContainer : faixa.commonAncestorContainer.parentNode, NodeFilter.SHOW_TEXT);
    for (let no = andarilho.nextNode(); no; no = andarilho.nextNode()) if (faixa.intersectsNode(no)) pedacos.push(no);
    if (!pedacos.length && faixa.startContainer.nodeType === 3) pedacos.push(faixa.startContainer);
    let ultimo = null;
    for (const no of pedacos) {
      const inicio = no === faixa.startContainer ? faixa.startOffset : 0;
      const fim = no === faixa.endContainer ? faixa.endOffset : no.nodeValue.length;
      if (fim <= inicio) continue;
      const meio = no.splitText(inicio);
      if (fim - inicio < meio.nodeValue.length) meio.splitText(fim - inicio);
      const marcaEl = document.createElement('mark');
      marcaEl.className = 'nota-marca';
      marcaEl.dataset.cor = marca.cor;
      marcaEl.dataset.nota = marca.id;
      meio.replaceWith(marcaEl);
      marcaEl.append(meio);
      ultimo = marcaEl;
    }
    if (ultimo && marca.comentario) {
      const bolha = document.createElement('button');
      bolha.type = 'button';
      bolha.className = 'nota-bolha';
      bolha.dataset.nota = marca.id;
      bolha.setAttribute('aria-label', `Comentário em "${marca.texto.slice(0, 40)}"`);
      bolha.textContent = '✎';
      ultimo.after(bolha);
    }
    return !!ultimo;
  }

  function aplicar() {
    agendado = false;
    const HIGapi = api();
    if (!HIGapi) return;
    const aula = aulaAtual();
    const raiz = document.getElementById('main-content');
    if (!raiz) return;
    for (const velha of raiz.querySelectorAll('.nota-bolha')) velha.remove();
    for (const velha of raiz.querySelectorAll('.nota-marca')) velha.replaceWith(...velha.childNodes);
    raiz.normalize();
    if (!aula) return;
    const alvo = raiz.querySelector('.deep-lesson');
    if (!alvo) return;
    for (const marca of HIGapi.marcas(aula)) {
      const faixa = localizar(alvo, marca);
      if (faixa) pintar(faixa, marca);
    }
  }

  function agendar() {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(aplicar);
  }

  /* ---------- barra de seleção ---------- */

  function montarBarra() {
    barra = document.createElement('div');
    barra.className = 'nota-barra';
    barra.hidden = true;
    barra.setAttribute('role', 'toolbar');
    barra.setAttribute('aria-label', 'Marcar trecho');
    barra.innerHTML = CORES.map(([cor, nome]) => `<button type="button" class="nota-cor" data-cor="${cor}" title="${nome}" aria-label="Marcar em ${nome.toLowerCase()}"></button>`).join('')
      + '<button type="button" data-cor="sublinhado" title="Sublinhar" aria-label="Sublinhar">S̲</button>'
      + '<span class="nota-sep"></span>'
      + '<button type="button" data-acao="comentar" title="Comentar" aria-label="Comentar">✎</button>'
      + '<button type="button" data-acao="remover" class="nota-excluir" title="Excluir marcação" aria-label="Excluir marcação" hidden>Excluir</button>';
    document.body.append(barra);
    barra.addEventListener('mousedown', e => e.preventDefault());
    barra.addEventListener('click', aoClicarBarra);
  }

  function posicionar(elemento, retangulo) {
    const viewport = window.visualViewport;
    const esquerda = viewport?.pageLeft ?? window.scrollX;
    const topo = viewport?.pageTop ?? window.scrollY;
    const larguraVisivel = viewport?.width ?? document.documentElement.clientWidth;
    const alturaVisivel = viewport?.height ?? window.innerHeight;
    elemento.style.maxWidth = `${Math.max(0, larguraVisivel - 20)}px`;
    elemento.style.maxHeight = `${Math.max(0, alturaVisivel - 16)}px`;
    elemento.hidden = false;
    const largura = elemento.offsetWidth, altura = elemento.offsetHeight;
    let x = retangulo.left + window.scrollX + retangulo.width / 2 - largura / 2;
    let y = retangulo.top + window.scrollY - altura - 10;
    const minimoX = esquerda + 10, minimoY = topo + 8;
    const maximoX = Math.max(minimoX, esquerda + larguraVisivel - largura - 10);
    const maximoY = Math.max(minimoY, topo + alturaVisivel - altura - 8);
    if (y < minimoY) y = retangulo.bottom + window.scrollY + 10;
    // Uma seleção por teclado pode terminar fora da tela. A barra não deve
    // exigir rolar a página para acessá-la, pois a rolagem encerra a seleção.
    elemento.style.left = `${Math.round(Math.max(minimoX, Math.min(x, maximoX)))}px`;
    elemento.style.top = `${Math.round(Math.max(minimoY, Math.min(y, maximoY)))}px`;
  }

  function esconderBarra() { if (barra) { barra.hidden = true; emEdicao = null; } }

  function selecaoValida() {
    const selecao = window.getSelection();
    if (!selecao || selecao.isCollapsed || !selecao.rangeCount) return null;
    const faixa = selecao.getRangeAt(0);
    const dentro = faixa.commonAncestorContainer.nodeType === 1 ? faixa.commonAncestorContainer : faixa.commonAncestorContainer.parentElement;
    if (!dentro || !dentro.closest(LEITURA) || dentro.closest('.nota-caixa,.nota-barra,input,textarea,[contenteditable]')) return null;
    for (const ponta of [faixa.startContainer, faixa.endContainer]) {
      const pai = ponta.nodeType === 3 ? ponta.parentElement : ponta;
      if (!pai) return null;
      const display = getComputedStyle(pai).display;
      if (display === 'flex' || display === 'grid' || display === 'inline-flex' || display === 'inline-grid') return null;
    }
    const texto = normal(selecao.toString());
    if (texto.length < 3 || texto.length > 600) return null;
    return { faixa, texto };
  }

  function aoSoltar() {
    if (!barra) montarBarra();
    const existente = document.activeElement?.closest?.('.nota-marca');
    const selecionado = selecaoValida();
    if (selecionado) {
      emEdicao = { tipo: 'novo', ...selecionado };
      barra.querySelector('[data-acao="remover"]').hidden = true;
      posicionar(barra, selecionado.faixa.getBoundingClientRect());
    } else if (!existente && !(emEdicao?.tipo === 'marca' && !barra.hidden)) {
      esconderBarra();
    }
  }

  function contexto(faixa, texto) {
    const bloco = (faixa.commonAncestorContainer.nodeType === 1 ? faixa.commonAncestorContainer : faixa.commonAncestorContainer.parentElement).closest(LEITURA);
    const total = bloco ? bloco.textContent : '';
    const pos = total.indexOf(texto);
    let ocorrencia = 0;
    if (pos >= 0) { let i = total.indexOf(texto); while (i >= 0 && i < pos) { ocorrencia++; i = total.indexOf(texto, i + 1); } }
    return {
      antes: pos > 0 ? total.slice(Math.max(0, pos - 30), pos) : '',
      depois: pos >= 0 ? total.slice(pos + texto.length, pos + texto.length + 30) : '',
      ocorrencia
    };
  }

  function criar(cor, comentario = '') {
    const HIGapi = api();
    if (!HIGapi || !emEdicao || emEdicao.tipo !== 'novo') return null;
    const aula = aulaAtual();
    if (!aula) return null;
    const { antes, depois, ocorrencia } = contexto(emEdicao.faixa, emEdicao.texto);
    const marca = HIGapi.marcaAdd(aula, {
      id: `m${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      texto: emEdicao.texto, antes, depois, ocorrencia, cor, comentario, rota: rotaAtual(), titulo: normal(document.querySelector('#main-content h1')?.textContent || ''), criadoEm: new Date().toISOString()
    });
    window.getSelection()?.removeAllRanges();
    esconderBarra();
    agendar();
    return marca;
  }

  function aoClicarBarra(evento) {
    const botao = evento.target.closest('button');
    if (!botao) return;
    const HIGapi = api();
    if (botao.dataset.cor) {
      if (emEdicao?.tipo === 'marca') { HIGapi.marcaEdita(aulaAtual(), emEdicao.id, { cor: botao.dataset.cor }); esconderBarra(); agendar(); }
      else criar(botao.dataset.cor);
      return;
    }
    if (botao.dataset.acao === 'remover') {
      if (emEdicao?.tipo === 'marca') { HIGapi.marcaRemove(aulaAtual(), emEdicao.id); esconderBarra(); agendar(); }
      return;
    }
    if (botao.dataset.acao === 'comentar') {
      if (emEdicao?.tipo === 'novo') {
        const nova = criar('amarelo');
        if (nova) requestAnimationFrame(() => abrirCaixa(nova.id));
      } else if (emEdicao?.tipo === 'marca') {
        const id = emEdicao.id;
        esconderBarra();
        abrirCaixa(id);
      }
    }
  }

  /* ---------- caixa de comentário ---------- */

  function montarCaixa() {
    caixa = document.createElement('div');
    caixa.className = 'nota-caixa';
    caixa.hidden = true;
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-label', 'Comentário do trecho');
    caixa.innerHTML = '<blockquote></blockquote><textarea placeholder="Escreva sua anotação sobre este trecho"></textarea>'
      + '<div class="nota-caixa-acoes"><button type="button" class="nota-salvar">Salvar</button>'
      + '<button type="button" class="nota-apagar">Apagar marca</button>'
      + '<button type="button" class="nota-fechar">Fechar</button></div>';
    document.body.append(caixa);
    caixa.addEventListener('click', evento => {
      const botao = evento.target.closest('button');
      if (!botao || !caixa.dataset.nota) return;
      const HIGapi = api(), aula = aulaAtual(), id = caixa.dataset.nota;
      if (botao.classList.contains('nota-salvar')) HIGapi.marcaEdita(aula, id, { comentario: caixa.querySelector('textarea').value.trim() });
      if (botao.classList.contains('nota-apagar')) HIGapi.marcaRemove(aula, id);
      fecharCaixa();
      agendar();
    });
    caixa.addEventListener('keydown', evento => { if (evento.key === 'Escape') { evento.stopPropagation(); fecharCaixa(); } });
  }

  function abrirCaixa(id) {
    if (!caixa) montarCaixa();
    const HIGapi = api();
    const marca = HIGapi.marcas(aulaAtual()).find(m => m.id === id);
    if (!marca) return;
    caixa.dataset.nota = id;
    caixa.querySelector('blockquote').textContent = marca.texto.length > 160 ? `${marca.texto.slice(0, 160)}…` : marca.texto;
    const campo = caixa.querySelector('textarea');
    campo.value = marca.comentario || '';
    const alvo = document.querySelector(`.nota-marca[data-nota="${id}"]`) || document.querySelector(`.nota-bolha[data-nota="${id}"]`);
    posicionar(caixa, alvo ? alvo.getBoundingClientRect() : { left: 20, top: 120, width: 0, height: 0, bottom: 120 });
    campo.focus();
  }

  function fecharCaixa() { if (caixa) { caixa.hidden = true; delete caixa.dataset.nota; } }

  /* ---------- eventos ---------- */

  function iniciar() {
    document.addEventListener('mouseup', () => setTimeout(aoSoltar, 0));
    document.addEventListener('touchend', () => setTimeout(aoSoltar, 10), { passive: true });
    document.addEventListener('keyup', evento => { if (evento.shiftKey || evento.key === 'Shift') aoSoltar(); });

    document.addEventListener('click', evento => {
      const bolha = evento.target.closest('.nota-bolha');
      if (bolha) { evento.preventDefault(); abrirCaixa(bolha.dataset.nota); return; }
      const marca = evento.target.closest('.nota-marca');
      if (marca) {
        if (!barra) montarBarra();
        emEdicao = { tipo: 'marca', id: marca.dataset.nota };
        barra.querySelector('[data-acao="remover"]').hidden = false;
        posicionar(barra, marca.getBoundingClientRect());
        return;
      }
      if (!evento.target.closest('.nota-barra')) esconderBarra();
      if (!evento.target.closest('.nota-caixa')) fecharCaixa();
    });

    document.addEventListener('keydown', evento => { if (evento.key === 'Escape') { esconderBarra(); fecharCaixa(); } });
    addEventListener('scroll', () => { if (barra && !barra.hidden) esconderBarra(); }, { passive: true });

    const raiz = document.getElementById('main-content');
    if (raiz) new MutationObserver(() => { if (!document.querySelector('.nota-marca')) agendar(); }).observe(raiz, { childList: true, subtree: false });
    agendar();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar, { once: true });
  else iniciar();
  window.Notas = { aplicar: agendar, abrirCaixa };
})();
