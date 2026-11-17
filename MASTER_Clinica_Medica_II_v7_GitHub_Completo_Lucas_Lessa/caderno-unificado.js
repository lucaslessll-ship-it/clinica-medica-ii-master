(() => {
  'use strict';
  const UX_KEY = 'master_p2_hig_v2';
  const P1_KEY = 'master_p1_lucas_v4';
  const CIR_KEY = 'master_cir_lucas_v1';
  const MATERIAS = [
    {id:'p2',nome:'Clínica Médica · P2',rota:'topic'},
    {id:'p1',nome:'Clínica Médica · P1',rota:'p1topic'},
    {id:'cir',nome:'Clínica Cirúrgica',rota:'cirtopic'}
  ];
  const escapar = valor => String(valor ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const buscaNormal = v => String(v??'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const ler = chave => { try { return JSON.parse(localStorage.getItem(chave)) || {}; } catch { return {}; } };
  const chaveDados = id => id === 'p1' ? P1_KEY : id === 'cir' ? CIR_KEY : UX_KEY;
  const catalogo = id => id === 'p2' ? (typeof TOPICS !== 'undefined' ? TOPICS : []) :
    id === 'p1' ? (window.P1?.topics || []) : (window.CIR?.topics || []);

  function reunir() {
    const ux = ler(UX_KEY), grupos = [];
    for (const materia of MATERIAS) {
      const dados = materia.id === 'p2' ? ux : ler(chaveDados(materia.id));
      const topicos = [];
      for (const tema of catalogo(materia.id)) {
        const aulas = [];
        for (const [indice, capitulo] of (tema.chapters || []).entries()) {
          const chave = tema.id + '_' + indice;
          const nota = String(dados.notes?.[chave] || '');
          const marcas = Array.isArray(ux.marcas?.[chave]) ? ux.marcas[chave] : [];
          const salvo = materia.id === 'p2' && !!ux.bookmarks?.[chave];
          if (!nota.trim() && !marcas.length && !salvo) continue;
          aulas.push({chave, indice, titulo:capitulo.name || capitulo.title || 'Aula ' + (indice+1),nota,marcas,salvo});
        }
        if (aulas.length) topicos.push({id:tema.id,titulo:tema.title || tema.name || tema.id,aulas});
      }
      grupos.push({...materia,topicos,quantidade:topicos.reduce((n,t)=>n+t.aulas.length,0)});
    }
    return grupos;
  }

  function trechoHTML(marca, chave, materia, tema, aula) {
    const comentario = String(marca.comentario || '');
    return '<div class="caderno-trecho notas-item" data-marca-id="' + escapar(marca.id) + '">' +
      '<p class="caderno-trecho-citado notas-trecho" data-cor="' + escapar(marca.cor || 'amarelo') + '">' + escapar(marca.texto || '') + '</p>' +
      '<p class="notas-comentario">' + escapar(comentario) + '</p>' +
      '<label>Observação sobre o trecho' +
      '<textarea rows="2" class="caderno-comentario" placeholder="Acrescente uma observação vinculada ao trecho">' + escapar(comentario) + '</textarea></label>' +
      '<button type="button" class="btn secondary caderno-salvar-comentario" data-chave="' + escapar(chave) +
      '" data-marca-id="' + escapar(marca.id) + '">Salvar observação</button>' +
      '<button type="button" class="btn secondary caderno-voltar-trecho" data-rota="' + materia.rota +
      '" data-tema="' + escapar(tema.id) + '" data-indice="' + aula.indice +
      '" data-chave="' + escapar(chave) + '" data-marca-id="' + escapar(marca.id) +
      '">Voltar ao trecho</button></div>';
  }

  function aulaHTML(materia, tema, aula) {
    const busca=escapar(buscaNormal([materia.nome,tema.titulo,aula.titulo,aula.nota,...aula.marcas.map(m=>m.texto+' '+(m.comentario||''))].join(' ')));
    const comentario=Number(aula.marcas.some(m=>!!(m.comentario||'').trim()));
    return '<details class="caderno-aula notas-aula" data-busca="' + busca +
      '" data-tem-marcas="' + Number(aula.marcas.length>0) +
      '" data-tem-comentarios="' + comentario +
      '" data-tem-notas="' + Number(!!aula.nota.trim()) +
      '"' + (aula.marcas.length ? ' open' : '') + '>' +
      '<summary><span>' + escapar(aula.titulo) + '</span><small>' +
      (aula.nota.trim() ? 'Nota escrita · ' : '') + aula.marcas.length + ' ' + (aula.marcas.length===1?'trecho':'trechos') +
      (aula.salvo?' · Salva para revisão':'') + '</small></summary>' +
      '<div class="caderno-aula-corpo" data-materia="' + materia.id + '" data-chave="' + escapar(aula.chave) + '">' +
      '<h3>Notas de aula · ' + escapar(aula.titulo) + '</h3>' +
      '<label class="caderno-rotulo">Anotações da aula' +
      '<textarea class="caderno-editor" rows="4" placeholder="Escreva suas anotações com suas próprias palavras">' + escapar(aula.nota) + '</textarea></label>' +
      '<div class="caderno-acoes"><button type="button" class="btn secondary caderno-salvar-nota">Salvar nota</button>' +
      '<button type="button" class="btn caderno-abrir notas-ir" data-rota="' + materia.rota +
      '" data-tema="' + escapar(tema.id) + '" data-indice="' + aula.indice + '">Abrir aula no texto</button>' +
      '<span class="caderno-status" aria-live="polite"></span></div>' +
      (aula.marcas.length ? '<details class="caderno-trechos" open><summary>' + aula.marcas.length +
      ' trechos destacados e citações</summary>' + aula.marcas.map(m => trechoHTML(m,aula.chave,materia,tema,aula)).join('') +
      '</details>' : '') + '</div></details>';
  }

  function exibir() {
    const grupos = reunir();
    const total = grupos.reduce((n,g)=>n+g.quantidade,0);
    return '<section class="caderno-unificado" aria-label="Caderno de anotações centralizadas">' +
      '<header class="caderno-cabecalho"><p class="caderno-sobretitulo">BIBLIOTECA PESSOAL</p>' +
      '<h1>Caderno de anotações</h1><p>Suas anotações e citações, organizadas por matéria e aula. ' +
      'Cada edição permanece no registro original da disciplina.</p>' +
      '<div class="caderno-resumo"><span>' + total + ' aulas com registros</span>' +
      '<button type="button" class="btn secondary caderno-exportar">Exportar caderno completo</button></div></header>' +
      '<div class="caderno-filtros"><label for="caderno-busca">Buscar no caderno</label>' +
      '<input id="caderno-busca" class="caderno-busca" type="search" placeholder="Buscar por aula, trecho ou anotação" autocomplete="off">' +
      '<div class="caderno-abas" role="group" aria-label="Tipo de anotação">' +
      '<button type="button" data-caderno-filtro="todas" aria-pressed="true">Todas</button>' +
      '<button type="button" data-caderno-filtro="marcas" aria-pressed="false">Destaques</button>' +
      '<button type="button" data-caderno-filtro="comentarios" aria-pressed="false">Comentários</button>' +
      '<button type="button" data-caderno-filtro="notas" aria-pressed="false">Notas da aula</button></div>' +
      '<p class="caderno-resultado" aria-live="polite"></p></div>' +
      '<nav class="caderno-atalhos" aria-label="Ir para matéria">' +
      grupos.map(g=>'<button type="button" data-caderno-destino="caderno-' + g.id + '">' + escapar(g.nome) + ' (' + g.quantidade + ')</button>').join('') + '</nav>' +
      grupos.map(g=>'<section class="caderno-materia" id="caderno-' + g.id + '" aria-label="' + escapar(g.nome) + '">' +
        '<header><h2>' + escapar(g.nome) + '</h2><span>' + g.quantidade + ' aulas</span></header>' +
        (g.topicos.length ? g.topicos.map(t=>'<section class="caderno-tema"><h3>' + escapar(t.titulo) +
          '</h3>' + t.aulas.map(a=>aulaHTML(g,t,a)).join('') + '</section>').join('') :
          '<p class="caderno-vazio">Nenhuma anotação nesta matéria. Abra uma aula para começar.</p>') +
        '</section>').join('') + '</section>';
  }

  function voltarAoTrecho(rota,tema,indice,chave,id) {
    fecharPainel();
    window.HIG?.abrirAula(rota,tema,Number(indice));
    if(id)window.Notas?.voltarAoTrecho?.(id,chave);
  }

  function filtrarRaiz(raiz, seletor, filtro, termo) {
    let visiveis=0;
    raiz.querySelectorAll(seletor).forEach(cartao=>{
      const tipo=filtro==='todas' || (filtro==='marcas' && cartao.dataset.temMarcas==='1') ||
        (filtro==='comentarios' && cartao.dataset.temComentarios==='1') ||
        (filtro==='notas' && cartao.dataset.temNotas==='1');
      const busca=buscaNormal(cartao.dataset.busca||'').includes(buscaNormal(termo));
      cartao.hidden=!(tipo&&busca);
      if(!cartao.hidden)visiveis++;
    });
    return visiveis;
  }

  function filtrarCaderno() {
    const raiz=document.querySelector('.caderno-unificado');
    if(!raiz)return;
    const filtro=raiz.querySelector('[data-caderno-filtro][aria-pressed="true"]')?.dataset.cadernoFiltro||'todas';
    const termo=raiz.querySelector('#caderno-busca')?.value.trim().toLowerCase()||'';
    const n=filtrarRaiz(raiz,'.caderno-aula',filtro,termo);
    raiz.querySelectorAll('.caderno-tema').forEach(t=>t.hidden=![...t.querySelectorAll('.caderno-aula')].some(a=>!a.hidden));
    raiz.querySelectorAll('.caderno-materia').forEach(m=>m.hidden=![...m.querySelectorAll('.caderno-tema')].some(t=>!t.hidden));
    const status=raiz.querySelector('.caderno-resultado');
    if(status) status.textContent=n+' '+(n===1?'aula encontrada':'aulas encontradas');
  }

  function salvarNota(botao) {
    const corpo = botao.closest('.caderno-aula-corpo');
    if (!corpo) return;
    const {materia,chave} = corpo.dataset;
    const valor = corpo.querySelector('.caderno-editor').value;
    if (materia === 'p2') {
      window.HIG?.saveNote(chave,valor);
    } else {
      const modulo = materia === 'p1' ? window.P1 : window.CIR;
      if (typeof modulo?.saveExternalNote === 'function') {
        modulo.saveExternalNote(chave,valor);
      } else {
        const storageKey = chaveDados(materia), dados = ler(storageKey);
        dados.notes = {...(dados.notes || {}),[chave]:valor};
        try { localStorage.setItem(storageKey,JSON.stringify(dados)); }
        catch { corpo.querySelector('.caderno-status').textContent = 'Falha ao salvar neste dispositivo.'; return; }
      }
    }
    corpo.querySelector('.caderno-status').textContent = 'Salvo no registro original.';
  }

  function salvarComentario(botao) {
    const item = botao.closest('.caderno-trecho');
    if (!item) return;
    const texto = item.querySelector('.caderno-comentario').value.trim();
    const salvo = window.HIG?.marcaEdita(botao.dataset.chave,botao.dataset.marcaId,
      {comentario:texto,comentarioAtivo:true});
    if (salvo) {
      botao.textContent = 'Salvo';
      const exibido = item.querySelector('.notas-comentario');
      if (exibido) exibido.textContent = texto;
      window.Notas?.aplicar?.();
    }
  }

  function exportar() {
    const linhas = ['# Caderno Clínica Master', '', 'Exportado: ' + new Date().toLocaleString('pt-BR'),''];
    for (const grupo of reunir()) {
      linhas.push('## ' + grupo.nome, '');
      for (const tema of grupo.topicos) {
        linhas.push('### ' + tema.titulo,'');
        for (const aula of tema.aulas) {
          linhas.push('#### ' + aula.titulo,'',aula.nota || '_Sem anotação geral_','');
          for (const marca of aula.marcas) {
            linhas.push('> ' + marca.texto.replace(/\n/g,' '),'');
            if (marca.comentario) linhas.push('Comentário: ' + marca.comentario,'');
          }
        }
      }
    }
    const arquivo = new Blob([linhas.join('\n')],{type:'text/markdown;charset=utf-8'});
    const url = URL.createObjectURL(arquivo), link = document.createElement('a');
    link.href = url;
    link.download = 'Clinica_Master_Caderno_Completo.md';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1500);
  }

  /* Painel lateral completo: pesquisa, filtros e edição sem sair da aula. */
  let painel=null, salvarTimer=null, painelFiltro='todas';

  function painelCartao({materia,tema,aula,marca}) {
    const busca=escapar(buscaNormal([materia.nome,tema.titulo,aula.titulo,aula.nota,marca?.texto||'',marca?.comentario||''].join(' ')));
    const tipo=marca?'marca':'nota';
    const ch=escapar(aula.chave);
    const ids='data-materia="'+materia.id+'" data-rota="'+materia.rota+
      '" data-tema="'+escapar(tema.id)+'" data-indice="'+aula.indice+
      '" data-chave="'+ch+'"'+(marca?' data-marca-id="'+escapar(marca.id)+'"':'');
    const titulo='<header><strong>'+escapar(aula.titulo)+'</strong><small>'+escapar(materia.nome+' · '+tema.titulo)+'</small></header>';
    const conteudo=marca ?
      '<blockquote class="caderno-painel-citacao" data-cor="'+escapar(marca.cor||'amarelo')+'">'+escapar(marca.texto||'')+'</blockquote>'+
      '<label class="caderno-painel-legenda">Meu comentário<textarea class="caderno-painel-editor" rows="3" placeholder="Escreva sua observação sobre este trecho">'+escapar(marca.comentario||'')+'</textarea></label>' :
      '<label class="caderno-painel-legenda">Anotações da aula<textarea class="caderno-painel-editor-nota" rows="3" placeholder="Anotação pessoal da aula">'+escapar(aula.nota)+'</textarea></label>';
    return '<article class="caderno-painel-cartao" data-tipo="'+tipo+'" data-tem-marcas="'+Number(!!marca)+
      '" data-tem-comentarios="'+Number(!!(marca?.comentario||'').trim())+
      '" data-tem-notas="'+Number(!marca)+'" data-busca="'+busca+'" '+ids+'>'+titulo+conteudo+
      '<div class="caderno-painel-acoes"><button type="button" class="caderno-painel-salvar">Salvar</button>'+
      '<button type="button" class="caderno-painel-ir">'+(marca?'Voltar ao trecho':'Abrir aula')+'</button></div>'+
      '<small class="caderno-painel-status" aria-live="polite"></small></article>';
  }

  function conteudoPainel() {
    const grupos=reunir();
    return grupos.map(g=>{
      const itens=g.topicos.flatMap(t=>t.aulas.flatMap(a=>{
        const linhas=[];
        if(a.nota.trim())linhas.push(painelCartao({materia:g,tema:t,aula:a,marca:null}));
        for(const m of a.marcas)linhas.push(painelCartao({materia:g,tema:t,aula:a,marca:m}));
        return linhas;
      }));
      return '<section class="caderno-painel-grupo"><h3>'+escapar(g.nome)+'</h3>'+
        (itens.length?itens.join(''):'<p class="caderno-vazio">Ainda não há anotações.</p>')+'</section>';
    }).join('');
  }

  function criarPainel() {
    painel=document.createElement('aside');
    painel.id='caderno-painel';
    painel.className='caderno-painel-lateral';
    painel.hidden=true;
    painel.setAttribute('role','complementary');
    painel.setAttribute('aria-label','Meu caderno de anotações');
    painel.innerHTML='<div class="caderno-painel-topo"><span class="caderno-painel-marca" aria-hidden="true">▤</span>'+
      '<div><strong>Meu caderno</strong><small>Destaques, comentários e notas</small></div>'+
      '<div class="caderno-painel-controles"><button type="button" data-painel-acao="minimizar" title="Minimizar" aria-label="Minimizar caderno">−</button>'+
      '<button type="button" data-painel-acao="fechar" title="Fechar" aria-label="Fechar caderno">×</button></div></div>'+
      '<label class="caderno-painel-legenda" for="caderno-painel-busca">Buscar anotações</label>'+
      '<input type="search" id="caderno-painel-busca" class="caderno-busca" placeholder="Aula, trecho ou observação" autocomplete="off">'+
      '<div class="caderno-abas caderno-painel-abas" role="group" aria-label="Filtrar anotações do painel">'+
      '<button type="button" data-painel-filtro="todas" aria-pressed="true">Todas</button>'+
      '<button type="button" data-painel-filtro="marcas" aria-pressed="false">Destaques</button>'+
      '<button type="button" data-painel-filtro="comentarios" aria-pressed="false">Comentários</button>'+
      '<button type="button" data-painel-filtro="notas" aria-pressed="false">Notas</button></div>'+
      '<p class="caderno-painel-contagem" aria-live="polite"></p>'+
      '<div class="caderno-painel-scroll"></div>'+
      '<footer class="caderno-painel-rodape"><button type="button" data-painel-acao="completo">Abrir caderno completo</button></footer>';
    document.body.append(painel);
  }

  function filtrarPainel() {
    if(!painel || painel.hidden)return;
    const termo=painel.querySelector('#caderno-painel-busca').value.trim().toLowerCase();
    const n=filtrarRaiz(painel,'.caderno-painel-cartao',painelFiltro,termo);
    painel.querySelectorAll('.caderno-painel-grupo').forEach(g=>g.hidden=![...g.querySelectorAll('.caderno-painel-cartao')].some(a=>!a.hidden));
    painel.querySelector('.caderno-painel-contagem').textContent=n+' '+(n===1?'registro':'registros')+' encontrados';
  }

  function salvarCartao(cartao) {
    if(!cartao || cartao.dataset.sujo!=='sim')return;
    const key=cartao.dataset.chave;
    if(cartao.dataset.tipo==='marca') {
      const valor=cartao.querySelector('.caderno-painel-editor').value.trim();
      window.HIG?.marcaEdita(key,cartao.dataset.marcaId,{comentario:valor,comentarioAtivo:true});
      window.Notas?.aplicar?.();
    } else {
      const valor=cartao.querySelector('.caderno-painel-editor-nota').value;
      const materia=cartao.dataset.materia;
      if(materia==='p2') window.HIG?.saveNote(key,valor);
      else (materia==='p1'?window.P1:window.CIR)?.saveExternalNote?.(key,valor);
    }
    cartao.dataset.sujo='nao';
    cartao.querySelector('.caderno-painel-status').textContent='Salvo no registro da aula';
  }

  function salvarEdicoesPainel() {
    clearTimeout(salvarTimer);
    painel?.querySelectorAll('.caderno-painel-cartao[data-sujo="sim"]').forEach(salvarCartao);
  }

  function fecharPainel() {
    if(!painel || painel.hidden)return;
    salvarEdicoesPainel();
    painel.hidden=true;
    document.getElementById('caderno-atalho-topo')?.setAttribute('aria-expanded','false');
  }

  function abrirPainel() {
    if(!painel)criarPainel();
    window.Notas?.fecharCaixa?.();
    if(!painel.hidden){fecharPainel();return}
    painel.querySelector('.caderno-painel-scroll').innerHTML=conteudoPainel();
    painel.hidden=false;
    painel.querySelector('#caderno-painel-busca').value='';
    painelFiltro='todas';
    painel.querySelectorAll('[data-painel-filtro]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.painelFiltro==='todas')));
    document.getElementById('caderno-atalho-topo')?.setAttribute('aria-expanded','true');
    filtrarPainel();
    painel.querySelector('#caderno-painel-busca').focus({preventScroll:true});
  }

  document.addEventListener('input',evento=>{
    if(evento.target.id==='caderno-busca')filtrarCaderno();
    if(evento.target.id==='caderno-painel-busca')filtrarPainel();
    if(evento.target.matches('.caderno-painel-editor,.caderno-painel-editor-nota')){
      const cartao=evento.target.closest('.caderno-painel-cartao');
      if(!cartao)return;
      cartao.dataset.sujo='sim';
      cartao.querySelector('.caderno-painel-status').textContent='Editando…';
      clearTimeout(salvarTimer);
      salvarTimer=setTimeout(()=>salvarEdicoesPainel(),850);
    }
  });

  document.addEventListener('keydown',evento=>{
    if(evento.key==='Escape'&&painel&&!painel.hidden)fecharPainel();
  });

  let salvarCentralTimer=null;
  function salvarPendentesCaderno() {
    clearTimeout(salvarCentralTimer);
    document.querySelectorAll('.caderno-unificado textarea[data-sujo="sim"]').forEach(campo=>{
      if(campo.classList.contains('caderno-editor')) {
        salvarNota(campo.closest('.caderno-aula-corpo')?.querySelector('.caderno-salvar-nota'));
      } else if(campo.classList.contains('caderno-comentario')) {
        salvarComentario(campo.closest('.caderno-trecho')?.querySelector('.caderno-salvar-comentario'));
      }
      campo.dataset.sujo='nao';
    });
  }
  document.addEventListener('input',evento=>{
    if(evento.target.matches('.caderno-unificado .caderno-editor,.caderno-unificado .caderno-comentario')) {
      evento.target.dataset.sujo='sim';
      clearTimeout(salvarCentralTimer);
      salvarCentralTimer=setTimeout(salvarPendentesCaderno,850);
    }
  });
  document.addEventListener('click', evento => {
    const botao = evento.target.closest('button');
    if (!botao) return;
    if (botao.closest('#caderno-painel')) {
      if(botao.dataset.painelFiltro) {
        painelFiltro=botao.dataset.painelFiltro;
        painel.querySelectorAll('[data-painel-filtro]').forEach(b=>b.setAttribute('aria-pressed',String(b===botao)));
        filtrarPainel();
      } else if (botao.dataset.painelAcao==='fechar' || botao.dataset.painelAcao==='minimizar') {
        fecharPainel();
      } else if (botao.dataset.painelAcao==='completo') {
        fecharPainel();
        if(typeof navigate==='function')navigate('notes');
      } else if(botao.classList.contains('caderno-painel-salvar')) {
        const cartao=botao.closest('.caderno-painel-cartao');
        cartao.dataset.sujo='sim'; salvarCartao(cartao);
      } else if(botao.classList.contains('caderno-painel-ir')) {
        const card=botao.closest('.caderno-painel-cartao');
        salvarEdicoesPainel();
        voltarAoTrecho(card.dataset.rota,card.dataset.tema,card.dataset.indice,
          card.dataset.chave,card.dataset.marcaId||'');
      }
      return;
    }
    if (!botao.closest('.caderno-unificado')) return;
    if (botao.dataset.cadernoDestino) {
      document.getElementById(botao.dataset.cadernoDestino)?.scrollIntoView({behavior:'smooth',block:'start'});
    } else if(botao.dataset.cadernoFiltro) {
      const raiz=botao.closest('.caderno-unificado');
      raiz.querySelectorAll('[data-caderno-filtro]').forEach(b=>b.setAttribute('aria-pressed',String(b===botao)));
      filtrarCaderno();
    } else if (botao.classList.contains('caderno-salvar-nota')) {
      salvarNota(botao);
    } else if (botao.classList.contains('caderno-salvar-comentario')) {
      salvarComentario(botao);
    } else if (botao.classList.contains('caderno-exportar')) {
      salvarPendentesCaderno();exportar();
    } else if(botao.classList.contains('caderno-voltar-trecho')) {
      salvarPendentesCaderno();
      voltarAoTrecho(botao.dataset.rota,botao.dataset.tema,botao.dataset.indice,
        botao.dataset.chave,botao.dataset.marcaId);
    } else if (botao.classList.contains('caderno-abrir')) {
      salvarPendentesCaderno();
      voltarAoTrecho(botao.dataset.rota,botao.dataset.tema,botao.dataset.indice,'','');
    }
  });

  // Atalho superior: acesso ao caderno completo sem interferir na aula.
  function inserirAtalho() {
    const topo = document.querySelector('.topbar-right');
    if (!topo || document.getElementById('caderno-atalho-topo')) return;
    const botao = document.createElement('button');
    botao.id = 'caderno-atalho-topo';
    botao.className = 'caderno-atalho-topo';
    botao.type = 'button';
    botao.title = 'Abrir meu caderno de anotações';
    botao.setAttribute('aria-label','Abrir caderno de anotações centralizado');
    botao.innerHTML = '<span class="caderno-icone-3d" aria-hidden="true">' +
      '<svg viewBox="0 0 32 32" width="24" height="24" fill="none" focusable="false"><path d="M8 5h17a2 2 0 0 1 2 2v19a2 2 0 0 1-2 2H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" fill="currentColor" opacity=".16"/><path d="M10 5v23M13.5 11h9M13.5 16h9M13.5 21h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 5h17a2 2 0 0 1 2 2v19a2 2 0 0 1-2 2H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" stroke="currentColor" stroke-width="1.6"/></svg>' +
      '</span><span class="caderno-atalho-texto">Meu caderno</span>';
    botao.setAttribute('aria-expanded','false');
    botao.setAttribute('aria-controls','caderno-painel');
    botao.addEventListener('click',abrirPainel);
    const depois = topo.querySelector('.search-trigger');
    if (depois) depois.after(botao); else topo.prepend(botao);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',inserirAtalho,{once:true});
  else inserirAtalho();

  if (window.HIG) window.HIG.viewNotes = exibir;
  window.CadernoUnificado = {exibir,reunir,exportar,abrirPainel,fecharPainel,filtrarCaderno};
})();
