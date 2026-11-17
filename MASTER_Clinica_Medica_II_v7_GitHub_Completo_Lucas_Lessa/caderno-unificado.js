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

  function trechoHTML(marca, chave) {
    const comentario = String(marca.comentario || '');
    return '<div class="caderno-trecho" data-marca-id="' + escapar(marca.id) + '">' +
      '<p class="caderno-trecho-citado" data-cor="' + escapar(marca.cor || 'amarelo') + '">' + escapar(marca.texto || '') + '</p>' +
      '<label>Observação sobre o trecho' +
      '<textarea rows="2" class="caderno-comentario" placeholder="Acrescente uma observação vinculada ao trecho">' + escapar(comentario) + '</textarea></label>' +
      '<button type="button" class="btn secondary caderno-salvar-comentario" data-chave="' + escapar(chave) +
      '" data-marca-id="' + escapar(marca.id) + '">Salvar observação</button></div>';
  }

  function aulaHTML(materia, tema, aula) {
    return '<details class="caderno-aula">' +
      '<summary><span>' + escapar(aula.titulo) + '</span><small>' +
      (aula.nota.trim() ? 'Nota escrita · ' : '') + aula.marcas.length + ' ' + (aula.marcas.length===1?'trecho':'trechos') +
      (aula.salvo?' · Salva para revisão':'') + '</small></summary>' +
      '<div class="caderno-aula-corpo" data-materia="' + materia.id + '" data-chave="' + escapar(aula.chave) + '">' +
      '<label class="caderno-rotulo">Anotações da aula' +
      '<textarea class="caderno-editor" rows="4" placeholder="Escreva suas anotações com suas próprias palavras">' + escapar(aula.nota) + '</textarea></label>' +
      '<div class="caderno-acoes"><button type="button" class="btn secondary caderno-salvar-nota">Salvar nota</button>' +
      '<button type="button" class="btn caderno-abrir" data-rota="' + materia.rota +
      '" data-tema="' + escapar(tema.id) + '" data-indice="' + aula.indice + '">Abrir aula no texto</button>' +
      '<span class="caderno-status" aria-live="polite"></span></div>' +
      (aula.marcas.length ? '<details class="caderno-trechos"><summary>' + aula.marcas.length +
      ' trechos destacados e citações</summary>' + aula.marcas.map(m => trechoHTML(m,aula.chave)).join('') +
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
      '<nav class="caderno-atalhos" aria-label="Filtrar por matéria">' +
      grupos.map(g=>'<button type="button" data-caderno-destino="caderno-' + g.id + '">' + escapar(g.nome) + ' (' + g.quantidade + ')</button>').join('') + '</nav>' +
      grupos.map(g=>'<section class="caderno-materia" id="caderno-' + g.id + '" aria-label="' + escapar(g.nome) + '">' +
        '<header><h2>' + escapar(g.nome) + '</h2><span>' + g.quantidade + ' aulas</span></header>' +
        (g.topicos.length ? g.topicos.map(t=>'<section class="caderno-tema"><h3>' + escapar(t.titulo) +
          '</h3>' + t.aulas.map(a=>aulaHTML(g,t,a)).join('') + '</section>').join('') :
          '<p class="caderno-vazio">Nenhuma anotação nesta matéria. Abra uma aula para começar.</p>') +
        '</section>').join('') + '</section>';
  }

  function salvarNota(botao) {
    const corpo = botao.closest('.caderno-aula-corpo');
    if (!corpo) return;
    const {materia,chave} = corpo.dataset;
    const valor = corpo.querySelector('.caderno-editor').value;
    if (materia === 'p2') {
      window.HIG?.saveNote(chave,valor);
    } else {
      const storageKey = chaveDados(materia), dados = ler(storageKey);
      dados.notes = {...(dados.notes || {}),[chave]:valor};
      try { localStorage.setItem(storageKey,JSON.stringify(dados)); }
      catch { corpo.querySelector('.caderno-status').textContent = 'Falha ao salvar neste dispositivo.'; return; }
      if (materia === 'p1') window.P1?.reload?.();
      if (materia === 'cir') window.CIR?.reload?.();
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

  document.addEventListener('click', evento => {
    const botao = evento.target.closest('button');
    if (!botao || !botao.closest('.caderno-unificado')) return;
    if (botao.dataset.cadernoDestino) document.getElementById(botao.dataset.cadernoDestino)?.scrollIntoView({behavior:'smooth',block:'start'});
    else if (botao.classList.contains('caderno-salvar-nota')) salvarNota(botao);
    else if (botao.classList.contains('caderno-salvar-comentario')) salvarComentario(botao);
    else if (botao.classList.contains('caderno-exportar')) exportar();
    else if (botao.classList.contains('caderno-abrir')) {
      window.HIG?.abrirAula(botao.dataset.rota,botao.dataset.tema,Number(botao.dataset.indice));
    }
  });

  if (window.HIG) window.HIG.viewNotes = exibir;
  window.CadernoUnificado = {exibir,reunir,exportar};
})();
