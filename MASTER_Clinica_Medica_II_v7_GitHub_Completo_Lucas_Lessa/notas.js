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
    if (ultimo && (marca.comentario || marca.comentarioAtivo)) {
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
        if (nova) {
          HIGapi.marcaEdita(aulaAtual(), nova.id, { comentarioAtivo: true });
          agendar();
          requestAnimationFrame(() => abrirCaixa(nova.id));
        }
      } else if (emEdicao?.tipo === 'marca') {
        const id = emEdicao.id;
        esconderBarra();
        abrirCaixa(id);
      }
    }
  }

  /* ---------- painel de citações: uma ou todas, com edição local ---------- */
  let rascunhoTimer = null, modoPainel = 'uma';

  function itensAula() {
    return (api()?.marcas(caixa?.dataset.aula || '') || [])
      .filter(m => m.comentario || m.comentarioAtivo);
  }

  function salvarEntrada(entrada) {
    const id = entrada?.dataset?.nota, aula = caixa?.dataset?.aula;
    if (!id || !aula) return;
    const campo = entrada.querySelector('textarea');
    const atual = api()?.marcas(aula).find(m => m.id === id);
    if (!atual || !campo) return;
    const texto = campo.value.trim();
    if (texto !== (atual.comentario || '') || !atual.comentarioAtivo) {
      api().marcaEdita(aula,id,{comentario:texto,comentarioAtivo:true});
      agendar();
    }
    const status = entrada.querySelector('.nota-painel-salvo');
    if (status) status.textContent = 'Salvo';
  }

  function salvarTodos() {
    clearTimeout(rascunhoTimer);
    if (!caixa || caixa.hidden) return;
    caixa.querySelectorAll('.nota-painel-entrada').forEach(salvarEntrada);
  }

  function montarEntrada(marca, indice, total) {
    const item = document.createElement('section');
    item.className = 'nota-painel-entrada';
    item.dataset.nota = marca.id;
    const topo = document.createElement('div');
    topo.className = 'nota-painel-linha';
    const rotulo = document.createElement('span');
    rotulo.className = 'nota-painel-rotulo';
    rotulo.textContent = modoPainel === 'todas' ? 'TRECHO ' + (indice + 1) + ' DE ' + total : 'TRECHO CITADO';
    const status = document.createElement('small');
    status.className = 'nota-painel-salvo';
    status.setAttribute('aria-live','polite');
    topo.append(rotulo,status);
    const citacao = document.createElement('blockquote');
    citacao.textContent = marca.texto;
    const label = document.createElement('label');
    label.className = 'nota-painel-rotulo';
    label.textContent = 'MINHA OBSERVAÇÃO';
    const editor = document.createElement('textarea');
    editor.setAttribute('aria-label','Editar anotação sobre ' + marca.texto.slice(0,60));
    editor.placeholder = 'Escreva uma dúvida, interpretação ou observação…';
    editor.value = marca.comentario || '';
    label.append(editor);
    const acoes = document.createElement('div');
    acoes.className = 'nota-caixa-acoes';
    const salvar = document.createElement('button');
    salvar.type = 'button'; salvar.className = 'nota-salvar'; salvar.textContent = 'Salvar';
    const apagar = document.createElement('button');
    apagar.type = 'button'; apagar.className = 'nota-apagar'; apagar.textContent = 'Excluir marcação';
    acoes.append(salvar,apagar);
    item.append(topo,citacao,label,acoes);
    return item;
  }

  function renderizarPainel(foco = false) {
    if (!caixa || caixa.hidden) return;
    const todas = itensAula();
    const alvo = todas.find(m=>m.id===caixa.dataset.nota);
    if (!alvo && todas.length) caixa.dataset.nota = todas[0].id;
    const itens = modoPainel === 'todas' ? todas :
      todas.filter(m=>m.id===caixa.dataset.nota);
    const lugar = caixa.querySelector('.nota-painel-conteudo');
    lugar.replaceChildren();
    itens.forEach((item,i)=>lugar.append(montarEntrada(item,i,itens.length)));
    const info = caixa.querySelector('.nota-painel-quantidade');
    info.textContent = todas.length === 1 ? '1 anotação nesta aula' :
      todas.length + ' anotações nesta aula';
    for (const botao of caixa.querySelectorAll('[data-modo]')) {
      const ativo = botao.dataset.modo === modoPainel;
      botao.setAttribute('aria-pressed',String(ativo));
    }
    caixa.querySelector('.nota-painel-titulo').textContent =
      modoPainel === 'todas' ? 'Anotações desta aula' : 'Comentário do trecho';
    if (foco) caixa.querySelector('textarea')?.focus({preventScroll:true});
  }

  function montarCaixa() {
    caixa = document.createElement('aside');
    caixa.className = 'nota-caixa nota-painel-lateral';
    caixa.hidden = true;
    caixa.setAttribute('role','complementary');
    caixa.setAttribute('aria-label','Anotações vinculadas aos trechos da aula');
    caixa.innerHTML =
      '<header class="nota-painel-cabecalho">' +
        '<span class="nota-painel-identidade"><span class="nota-painel-simbolo" aria-hidden="true">✎</span><span><strong class="nota-painel-titulo">Comentário do trecho</strong><small>Vinculado ao texto original</small></span></span>' +
        '<span class="nota-painel-controles"><button type="button" class="nota-minimizar" title="Minimizar para o ícone no texto" aria-label="Minimizar painel">−</button>' +
        '<button type="button" class="nota-fechar" title="Fechar painel" aria-label="Fechar painel">×</button></span>' +
      '</header>' +
      '<div class="nota-painel-seletor" role="group" aria-label="Anotações exibidas">' +
        '<button type="button" data-modo="uma" aria-pressed="true">Esta anotação</button>' +
        '<button type="button" data-modo="todas" aria-pressed="false">Todas da aula</button>' +
      '</div><div class="nota-painel-quantidade" aria-live="polite"></div>' +
      '<div class="nota-painel-conteudo"></div>' +
      '<footer class="nota-painel-fim">Suas alterações ficam vinculadas ao trecho destacado.</footer>';
    document.body.append(caixa);
    caixa.addEventListener('click', evento => {
      const botao = evento.target.closest('button');
      if (!botao || !caixa.dataset.aula) return;
      if (botao.dataset.modo) {
        salvarTodos();
        modoPainel = botao.dataset.modo;
        renderizarPainel();
      } else if (botao.classList.contains('nota-salvar')) {
        clearTimeout(rascunhoTimer);
        salvarEntrada(botao.closest('.nota-painel-entrada'));
      } else if (botao.classList.contains('nota-apagar')) {
        const entrada = botao.closest('.nota-painel-entrada');
        const id = entrada?.dataset.nota;
        if (!id) return;
        clearTimeout(rascunhoTimer);
        api()?.marcaRemove(caixa.dataset.aula,id);
        if (caixa.dataset.nota===id) {
          caixa.dataset.nota = itensAula()[0]?.id || '';
        }
        if (!itensAula().length) fecharCaixa(false);
        else renderizarPainel();
        agendar();
      } else if (botao.classList.contains('nota-minimizar')) {
        fecharCaixa(true);
      } else if (botao.classList.contains('nota-fechar')) {
        fecharCaixa(false);
      }
    });
    caixa.addEventListener('input', evento => {
      if (!evento.target.matches('.nota-painel-entrada textarea')) return;
      const entrada = evento.target.closest('.nota-painel-entrada');
      entrada.querySelector('.nota-painel-salvo').textContent = 'Editando…';
      clearTimeout(rascunhoTimer);
      rascunhoTimer = setTimeout(()=>salvarEntrada(entrada),900);
    });
    caixa.addEventListener('keydown', evento => {
      if (evento.key === 'Escape') { evento.stopPropagation(); fecharCaixa(false); }
    });
  }

  function abrirCaixa(id, modo = 'uma') {
    if (!caixa) montarCaixa();
    const aula = aulaAtual();
    const marca = api()?.marcas(aula).find(m=>m.id===id);
    if (!marca) return;
    salvarTodos();
    caixa.dataset.aula = aula;
    caixa.dataset.nota = id;
    modoPainel = modo;
    caixa.hidden = false;
    renderizarPainel(true);
  }

  function fecharCaixa(minimizar = false) {
    if (!caixa || caixa.hidden) return;
    salvarTodos();
    caixa.hidden = true;
    if (!minimizar) delete caixa.dataset.nota;
  }

  /* ---------- eventos ---------- */

  function iniciar() {
    document.addEventListener('mouseup', evento => {
      if (evento.target.closest?.('.nota-marca,.nota-bolha,.nota-barra,.nota-caixa')) return;
      setTimeout(aoSoltar, 0);
    });
    document.addEventListener('touchend', evento => {
      if (evento.target.closest?.('.nota-marca,.nota-bolha,.nota-barra,.nota-caixa')) return;
      setTimeout(aoSoltar, 10);
    }, { passive: true });
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
      // O painel permanece aberto durante a leitura, sem alterar a rolagem.
    });

    document.addEventListener('keydown', evento => { if (evento.key === 'Escape') { esconderBarra(); fecharCaixa(); } });
    addEventListener('scroll', () => { if (barra && !barra.hidden) esconderBarra(); }, { passive: true });

    const raiz = document.getElementById('main-content');
    if (raiz) new MutationObserver(() => { if (caixa && !caixa.hidden && caixa.dataset.aula !== aulaAtual()) fecharCaixa(); if (!document.querySelector('.nota-marca')) agendar(); }).observe(raiz, { childList: true, subtree: false });
    agendar();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar, { once: true });
  else iniciar();
  window.Notas = { aplicar: agendar, abrirCaixa };
})();
