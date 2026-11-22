/* Marca-texto, sublinhado e comentários presos ao trecho da aula.
   Selecionar um trecho abre a barra de cores; o comentário vira uma bolha ao
   lado do texto. Tudo é gravado nas preferências, que já sobem para a conta,
   e aparece reunido por aula na Biblioteca pessoal. */
(() => {
  'use strict';
  const LEITURA = '.deep-block,.deep-lesson,.pocus-card-body,.pocus-sec,.course-body,.case-step,.insight,.osce-case,.osce-step,.osce-preview-questions,.osce-preview-note,.osce-reading-answer,.osce-preview-answer,.osce-feedback,.sf-page,.sf-exercise-header,.la-lesson';
  const BLOQUEADOS = 'button,a,nav,summary,label,input,textarea,select,option,form,svg,canvas,iframe,video,audio,math,pre,code,[contenteditable],[role="button"],[role="tab"],.nota-barra,.nota-caixa,.nota-bolha,.caderno-unificado,.caderno-painel-lateral,.nota-formatbar,.nota-preview,.ai-tutor-dialog,.media-viewer,.pocus-q-options,.lab-choices,.qnav-dots,.pocus-pager,.osce-quicknav,.osce-top-links,.osce-reading-legend,.osce-visual-pin,.osce-annotation-toolbar,.osce-lightbox,.osce-context-popover,.osce-study-levels,.osce-actions,.osce-catalog-grid,.osce-index-entry,.osce-review-list,.sf-session-nav,.sf-training-top,.nota-atalho-pagina,.profile-session';
  const ROTAS_ESTUDO = new Set([
    'topic','p1topic','cirtopic','p1','cir','cirp1','cirp2','topics',
    'reverse','practice','exam','cases','discursive','oral','flashcards','sources',
    'p1practice','p1exam','p1cases','p1discursive','p1oral','p1flashcards','p1sources',
    'cirpractice','cirexam','revisao','decisionlab','banca','prescriptions','osce','superfoco','planner','today',
    'emergency','emergency-p1','emergency-p2','emergency-questions','emergency-simulado','pocus',
    'ecg','rad','hemo','atb','micro','labferro','labrenal','labmaster',
    'labmicrocitose'
  ]);
  const NOME_ROTA = {
    osce:'OSCE · Clínica Médica',superfoco:'Super Foco',planner:'Planejador de estudos',today:'Plano de hoje',
    emergency:'Urgência e Emergência','emergency-p1':'Urgência e Emergência · P1','emergency-p2':'Urgência e Emergência · P2',
    'emergency-questions':'Urgência e Emergência · Questões','emergency-simulado':'Urgência e Emergência · Simulado',
    pocus:'POCUS',ecg:'ECG',rad:'Radiologia',hemo:'Hemograma',
    atb:'Antimicrobianos',micro:'Microbiologia',labferro:'Laboratório de ferro',
    labrenal:'Laboratório renal',labmaster:'Laboratório Master',
    labmicrocitose:'Laboratório · Microcitose',prescriptions:'Prescrições',
    banca:'Raciocínio clínico',decisionlab:'Decision Lab',revisao:'Revisões',
    reverse:'Engenharia reversa',practice:'Questões',exam:'Simulados',
    cases:'Casos clínicos',oral:'Prova oral',discursive:'Discursivas',
    flashcards:'Flashcards',sources:'Fontes',p1practice:'P1 · Questões',
    p1exam:'P1 · Simulado',p1cases:'P1 · Casos',p1discursive:'P1 · Discursivas',
    p1oral:'P1 · Prova oral',p1flashcards:'P1 · Flashcards',
    cirpractice:'Cirurgia · Questões',cirexam:'Cirurgia · Simulados'
  };
  const estudoAtivo = rota => ROTAS_ESTUDO.has(rota) || rota.startsWith('labarea-');
  const proibido = el => !!el?.closest?.(BLOQUEADOS);
  const textoLegivel = el => (el?.textContent||'').replace(/\s+/g,' ').trim();
  function checksum(str) {
    let h=2166136261;
    for(let i=0;i<str.length;i++)h=Math.imul(h^str.charCodeAt(i),16777619);
    return (h>>>0).toString(36);
  }
  const CORES = [['amarelo', 'Amarelo'], ['verde', 'Verde'], ['azul', 'Azul'], ['rosa', 'Rosa']];
  let barra, caixa, emEdicao = null, agendado = false;

  const api = () => (typeof HIG !== 'undefined' && HIG.marcaAdd ? HIG : null);
  const aulaEl = () => document.querySelector('#main-content .deep-lesson[data-lesson-key]');
  const normal = t => t.replace(/\s+/g, ' ').trim();
  function contextoPagina() {
    const aula = aulaEl();
    if (aula) return {
      chave:aula.dataset.lessonKey,rota:aula.dataset.lessonRoute || '',
      raiz:aula,titulo:textoLegivel(document.querySelector('#main-content h1'))||'Aula',
      origem:'aula'
    };
    const rota = typeof ui !== 'undefined' ? ui.route : location.hash.slice(1).split('/')[0];
    if(!rota || !estudoAtivo(rota))return null;
    // O OSCE mantém #osce ao trocar a estação e a pergunta: URL/título da página
    // não identificam o conteúdo. Usamos o número prioritário estável.
    if(rota==='osce'){
      const shell=document.querySelector('#main-content .osce-app-shell');
      if(!shell)return null;
      const numero=Number(shell.dataset.noteStation);
      const valido=Number.isInteger(numero)&&numero>0;
      const view=shell.dataset.osceView||'home';
      const titulo=valido
        ?'Estação '+numero+' · '+(shell.dataset.noteTitle||'OSCE')
        :view==='review'?'OSCE · Revisão adaptativa':view==='prompt'?'OSCE · Roteiro para IA':'OSCE · Índice de estações';
      const chave=valido?'estudo_osce_estacao_'+numero:'estudo_osce_'+view;
      return {chave,rota,raiz:shell,titulo,origem:'estudo',
        materia:'OSCE · Clínica Médica',localizacao:'#osce',
        indice:valido?numero:null,tipo:valido?'osce-estacao':'osce-pagina',
        etapa:Number(shell.dataset.noteStep)||0,questao:shell.dataset.noteQuestion||null};
    }
    // O Super Foco é dinâmico, mas cada desafio possui um título identificável.
    // A mesma pergunta mantém sua chave entre tentativa e feedback.
    if(rota==='superfoco'){
      const shell=document.querySelector('#main-content .sf-page');
      if(!shell)return null;
      const titulo=textoLegivel(shell.querySelector('.sf-exercise-header h1,h1'))||'Super Foco';
      const area=textoLegivel(shell.querySelector('.sf-exercise-header .eyebrow'))||'Biblioteca';
      return {chave:'estudo_superfoco_'+checksum(area+'|'+titulo),
        rota,raiz:shell,titulo,origem:'estudo',materia:'Super Foco',
        localizacao:'#superfoco',indice:null,tipo:'superfoco-desafio'};
    }
    const raiz=document.querySelector('#main-content');
    if(!raiz || !raiz.querySelector('p,li,td,th,blockquote,h1,h2,h3'))return null;
    const titulo=textoLegivel(raiz.querySelector('.pocus-module .pocus-title,.la-lesson h1,.deep-lesson h1,h1,h2'))||NOME_ROTA[rota]||rota;
    const trilha=textoLegivel(raiz.querySelector('.pocus-crumb span,.la-hero .kicker,.lab-stage-meta'));
    const primeiroSub=textoLegivel(raiz.querySelector('article h2,.pocus-sec h3,.la-section h2,.clinical-content h2'));
    const hash=location.hash||('#'+rota);
    const chave='estudo_'+rota+'_'+checksum([hash,titulo,trilha,primeiroSub].join('|'));
    const indice=/\b(?:Módulo|Caso|Traçado)\s+(\d+)/i.exec(trilha)?.[1];
    const tipo=/Caso/i.test(trilha)?'caso':/Traçado/i.test(trilha)?'tracado':/Módulo/i.test(trilha)?'modulo':'pagina';
    return {chave,rota,raiz,titulo,origem:'estudo',
      materia:NOME_ROTA[rota]||(/^(p1)/.test(rota)?'Clínica Médica · P1':/^(cir)/.test(rota)?'Cirurgia':'Estudos'),
      localizacao:hash,indice:indice?Number(indice)-1:null,tipo,trilha};
  }
  const aulaAtual = () => contextoPagina()?.chave || '';
  const rotaAtual = () => contextoPagina()?.rota || '';

  /* ---------- aplicar as marcas gravadas no texto renderizado ---------- */

  // Procura o trecho pelo texto e pelo contexto em volta; o conteúdo é gerado
  // a cada render, então a âncora não pode depender de índice de nó.
  function localizar(raiz, marca) {
    const nos = [];
    const andarilho = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
      acceptNode: no => {
        const pai = no.parentElement;
        if (!pai || pai.closest('script,style,'+BLOQUEADOS)) return NodeFilter.FILTER_REJECT;
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
    for (let no = andarilho.nextNode(); no; no = andarilho.nextNode()) if (faixa.intersectsNode(no) && !proibido(no.parentElement)) pedacos.push(no);
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
      // Um destaque existente também pode ser editado com teclado e leitor de tela.
      marcaEl.tabIndex = 0;
      marcaEl.setAttribute('role', 'button');
      marcaEl.setAttribute('aria-label', 'Editar destaque: ' + marca.texto.slice(0, 100));
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
      bolha.innerHTML = '<svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M4 2.5h8l4 4v11H4z"/><path d="M12 2.5v4h4M7 10h6M7 13h6"/></svg>';
      ultimo.after(bolha);
    }
    return !!ultimo;
  }

  function aplicar() {
    agendado = false;
    const HIGapi = api();
    if (!HIGapi) return;
    const origem=contextoPagina();
    const atalhoAntigo=document.getElementById('nota-atalho-pagina');
    if(origem?.origem==='estudo' && !atalhoAntigo) {
      const acao=document.createElement('button');
      acao.type='button';acao.id='nota-atalho-pagina';
      acao.className='nota-atalho-pagina';
      acao.innerHTML='<span aria-hidden="true">▤</span> '+(origem.rota==='osce'?'Marca-texto e caderno':'Anotações desta página');
      acao.title='Selecione um trecho do texto para destacar ou comentar. Abra aqui suas anotações da página.';
      acao.addEventListener('click',abrirTodas);
      const nav=document.querySelector('#main-content .study-breadcrumb');
      if(nav)nav.after(acao);
      else document.getElementById('main-content')?.prepend(acao);
    }
    if((!origem || origem.origem!=='estudo') && atalhoAntigo)atalhoAntigo.remove();
    const aula=origem?.chave || '';
    const raiz = document.getElementById('main-content');
    if (!raiz) return;
    for (const velha of raiz.querySelectorAll('.nota-bolha')) velha.remove();
    for (const velha of raiz.querySelectorAll('.nota-marca')) velha.replaceWith(...velha.childNodes);
    raiz.normalize();
    if (!aula) return;
    const alvo=origem?.raiz;
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
    const origem=contextoPagina();
    if (!origem || !dentro || !origem.raiz.contains(dentro) || proibido(dentro)) return null;
    const raiz=origem.raiz;
    for(const limite of [faixa.startContainer,faixa.endContainer]){
      const el=limite.nodeType===3?limite.parentElement:limite;
      if(!el || !raiz.contains(el) || proibido(el))return null;
    }
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
    const bloco = (faixa.commonAncestorContainer.nodeType === 1 ? faixa.commonAncestorContainer : faixa.commonAncestorContainer.parentElement).closest(LEITURA+',p,li,td,th,blockquote,h1,h2,h3,h4');
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
    const pagina=contextoPagina();
    if(pagina?.origem==='estudo')HIGapi.registrarPaginaEstudo?.(aula,{
      rota:pagina.rota,titulo:pagina.titulo,materia:pagina.materia,
      localizacao:pagina.localizacao,indice:pagina.indice,tipo:pagina.tipo
    });
    const marca = HIGapi.marcaAdd(aula, {
      paginaEstudo:pagina?.origem==='estudo',
      pagina:pagina?.titulo||'',materia:pagina?.materia||'',
      localizacao:pagina?.localizacao||'',indice:pagina?.indice,tipoPagina:pagina?.tipo||'',etapa:pagina?.etapa??null,questao:pagina?.questao||null,
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
      if (emEdicao?.tipo === 'marca') {
        const ok=window.CadernoUnificado?.excluirRegistro?.({materia:'p2',chave:aulaAtual(),marcaId:emEdicao.id});
        if(ok){esconderBarra();agendar();}
      }
      return;
    }
    if (botao.dataset.acao === 'comentar') {
      if (emEdicao?.tipo === 'novo') {
        const nova = criar('amarelo');
        if (nova) {
          HIGapi.marcaEdita(aulaAtual(), nova.id, { comentarioAtivo: true });
          agendar();
          abrirCaixa(nova.id);
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
    // Todos os destaques são editáveis; comentários são opcionais.
    return (api()?.marcas(caixa?.dataset.aula || '') || []);
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

  function notaGeralDaAula() {
    const rota=caixa?.dataset.rota || rotaAtual(), chave=caixa?.dataset.aula || aulaAtual();
    const materia=rota==='p1topic'?'p1':rota==='cirtopic'?'cir':'p2';
    const storage=materia==='p1'?'master_p1_lucas_v4':materia==='cir'?'master_cir_lucas_v1':'master_p2_hig_v2';
    let dados={};
    try{dados=JSON.parse(localStorage.getItem(storage)||'{}')||{}}catch{}
    return {materia,chave,valor:String(dados.notes?.[chave]||'')};
  }

  function salvarNotaGeral() {
    const campo=caixa?.querySelector('.nota-painel-geral-editor');
    if(!campo || campo.dataset.sujo!=='sim')return;
    const {materia,chave}=notaGeralDaAula();
    if(!chave||chave!==caixa.dataset.aula)return;
    if(materia==='p2')window.HIG?.saveNote?.(chave,campo.value);
    else (materia==='p1'?window.P1:window.CIR)?.saveExternalNote?.(chave,campo.value);
    campo.dataset.sujo='nao';
    const apagar=caixa.querySelector('.nota-painel-apagar-geral');
    if(apagar)apagar.disabled=!campo.value.trim();
    const estado=caixa.querySelector('.nota-painel-geral-status');
    if(estado)estado.textContent='Salvo no caderno da aula';
  }

  function montarNotaGeral() {
    const info=notaGeralDaAula();
    const secao=document.createElement('section');
    secao.className='nota-painel-geral';
    secao.innerHTML='<div class="nota-painel-linha"><strong>Anotação geral da aula</strong><small class="nota-painel-geral-status" aria-live="polite"></small></div>'+
      '<label for="nota-geral-editor">Seu resumo, dúvidas e associações</label>'+
      '<textarea id="nota-geral-editor" class="nota-painel-geral-editor" rows="3" placeholder="Anote o que deseja revisar nesta aula"></textarea>'+
      '<div class="nota-painel-geral-acoes"><button type="button" class="nota-painel-salvar-geral">Salvar nota da aula</button>'+
      '<button type="button" class="nota-painel-apagar-geral nota-acao-excluir"'+(info.valor.trim()?'':' disabled')+'>Excluir nota</button></div>';
    secao.querySelector('textarea').value=info.valor;
    return secao;
  }

  function salvarTodos() {
    clearTimeout(rascunhoTimer);
    if (!caixa || caixa.hidden) return;
    caixa.querySelectorAll('.nota-painel-entrada').forEach(salvarEntrada);
    salvarNotaGeral();
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
    apagar.type = 'button'; apagar.className = 'nota-apagar nota-acao-excluir'; apagar.textContent = 'Excluir marcação';
    const voltar=document.createElement('button');
    voltar.type='button'; voltar.className='nota-voltar-trecho';voltar.textContent='Voltar ao trecho';
    acoes.append(salvar,voltar,apagar);
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
    if(modoPainel==='todas')lugar.append(montarNotaGeral());
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
      } else if (botao.classList.contains('nota-painel-salvar-geral')) {
        const campo=caixa.querySelector('.nota-painel-geral-editor');
        if(campo)campo.dataset.sujo='sim';
        salvarNotaGeral();
      } else if (botao.classList.contains('nota-painel-apagar-geral')) {
        const {materia,chave}=notaGeralDaAula();
        window.CadernoUnificado?.excluirRegistro?.({materia,chave});
      } else if (botao.classList.contains('nota-salvar')) {
        clearTimeout(rascunhoTimer);
        salvarEntrada(botao.closest('.nota-painel-entrada'));
      } else if (botao.classList.contains('nota-voltar-trecho')) {
        salvarTodos();
        voltarAoTrecho(botao.closest('.nota-painel-entrada')?.dataset.nota,caixa.dataset.aula);
      } else if (botao.classList.contains('nota-apagar')) {
        const entrada = botao.closest('.nota-painel-entrada');
        const id = entrada?.dataset.nota;
        if (!id) return;
        salvarTodos();
        window.CadernoUnificado?.excluirRegistro?.({materia:'p2',chave:caixa.dataset.aula,marcaId:id});
      } else if (botao.classList.contains('nota-minimizar')) {
        fecharCaixa(true);
      } else if (botao.classList.contains('nota-fechar')) {
        fecharCaixa(false);
      }
    });
    caixa.addEventListener('input', evento => {
      if(evento.target.matches('.nota-painel-geral-editor')) {
        evento.target.dataset.sujo='sim';
        const estado=caixa.querySelector('.nota-painel-geral-status');
        if(estado)estado.textContent='Editando…';
        clearTimeout(rascunhoTimer);
        rascunhoTimer=setTimeout(()=>salvarNotaGeral(),900);
        return;
      }
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
    if (!marca.comentario && !marca.comentarioAtivo) { api()?.marcaEdita(aula,id,{comentarioAtivo:true}); agendar(); }
    caixa.dataset.aula = aula;
    caixa.dataset.rota = rotaAtual();
    caixa.dataset.nota = id;
    modoPainel = modo;
    window.CadernoUnificado?.fecharPainel?.();
    if(window.MasterWindowMotion)window.MasterWindowMotion.show(caixa,{kind:'sheet'});
    else caixa.hidden = false;
    renderizarPainel(true);
  }

  function fecharCaixa(minimizar = false) {
    if (!caixa || caixa.hidden) return;
    salvarTodos();
    if(window.MasterWindowMotion)window.MasterWindowMotion.hide(caixa,{kind:'sheet'});
    else caixa.hidden = true;
    if (!minimizar) delete caixa.dataset.nota;
  }


  /* O caderno leva de volta exatamente à marca citada, nunca só ao início. */
  function voltarAoTrecho(id, aulaEsperada = '') {
    if (!id) return;
    let tentativas=0;
    const procurar=()=>{
      const aula=aulaAtual();
      const marcas=[...document.querySelectorAll('#main-content .nota-marca[data-nota]')];
      const alvo=marcas.find(el=>el.dataset.nota===id);
      if (alvo && (!aulaEsperada || aula===aulaEsperada)) {
        fecharCaixa(false);
        alvo.tabIndex=-1;
        alvo.scrollIntoView({block:'center',inline:'nearest',behavior:'auto'});
        alvo.focus({preventScroll:true});
        alvo.classList.add('nota-trecho-destino');
        setTimeout(()=>alvo.classList.remove('nota-trecho-destino'),2400);
        return;
      }
      if (++tentativas < 30) {
        if(tentativas===4)agendar();
        setTimeout(procurar,120);
      }
    };
    procurar();
  }

  function abrirTodas() {
    const pagina=contextoPagina();
    if(!pagina)return;
    const primeira=api()?.marcas(aulaAtual())[0];
    if(primeira){abrirCaixa(primeira.id,'todas');return;}
    if(!caixa)montarCaixa();
    if(pagina.origem==='estudo')api()?.registrarPaginaEstudo?.(pagina.chave,{
      rota:pagina.rota,titulo:pagina.titulo,materia:pagina.materia,
      localizacao:pagina.localizacao,indice:pagina.indice,tipo:pagina.tipo
    });
    salvarTodos();
    caixa.dataset.aula=pagina.chave;
    caixa.dataset.rota=pagina.rota;
    caixa.dataset.nota='';
    modoPainel='todas';
    if(window.MasterWindowMotion)window.MasterWindowMotion.show(caixa,{kind:'sheet'});
    else caixa.hidden=false;
    window.CadernoUnificado?.fecharPainel?.();
    renderizarPainel(true);
  }

  /* ---------- eventos ---------- */


  window.addEventListener('master-note-deleted',evento=>{
    const {chave,marcaId}=evento.detail||{};
    if(!caixa||caixa.hidden||caixa.dataset.aula!==chave)return;
    clearTimeout(rascunhoTimer);
    if(!marcaId){
      const editor=caixa.querySelector('.nota-painel-geral-editor');
      if(editor){editor.value='';editor.dataset.sujo='nao';}
    }
    if(marcaId && caixa.dataset.nota===marcaId)
      caixa.dataset.nota=itensAula()[0]?.id||'';
    if(modoPainel==='uma'&&!itensAula().length){
      if(notaGeralDaAula().valor.trim())modoPainel='todas';
      else {fecharCaixa(false);return;}
    }
    renderizarPainel();
  });

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
    // iOS/Safari costuma concluir a seleção após o touchend, especialmente ao
    // arrastar as alças. Ouvir selectionchange evita que a barra não apareça.
    let temporizadorSelecao=null;
    document.addEventListener('selectionchange', () => {
      const selecionado=window.getSelection();
      if(!selecionado || selecionado.isCollapsed || !selecionado.rangeCount)return;
      clearTimeout(temporizadorSelecao);
      temporizadorSelecao=setTimeout(aoSoltar,125);
    });

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

    document.addEventListener('keydown', evento => {
      if (evento.key === 'Escape') { esconderBarra(); fecharCaixa(); return; }
      const marca = evento.target.closest?.('.nota-marca[data-nota]');
      if (!marca || (evento.key !== 'Enter' && evento.key !== ' ')) return;
      evento.preventDefault();
      if (!barra) montarBarra();
      emEdicao = { tipo: 'marca', id: marca.dataset.nota };
      barra.querySelector('[data-acao="remover"]').hidden = false;
      posicionar(barra, marca.getBoundingClientRect());
      barra.querySelector('[data-cor]')?.focus({ preventScroll: true });
    });
    addEventListener('scroll', () => { if (barra && !barra.hidden) esconderBarra(); }, { passive: true });

    const raiz = document.getElementById('main-content');
    if (raiz) new MutationObserver(() => { if (caixa && !caixa.hidden && caixa.dataset.aula !== aulaAtual()) fecharCaixa(); if (!document.querySelector('.nota-marca')) agendar(); }).observe(raiz, { childList: true, subtree: false });
    agendar();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar, { once: true });
  else iniciar();
  window.Notas = { aplicar: agendar, abrirCaixa, fecharCaixa, abrirTodas, voltarAoTrecho, contextoAtual:contextoPagina };
})();
