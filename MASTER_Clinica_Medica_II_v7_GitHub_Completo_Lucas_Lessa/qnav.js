/* Navegação por bolinhas, resultado em gráfico e revisão automática das questões erradas.
   Serve aos três bancos (P2, P1, Cirurgia). O registro de erros vive nas preferências
   (chave master_p2_hig_v2), então sincroniza entre aparelhos junto com o resto. */
'use strict';
const QNav = (() => {
  // Um acerto encerra a pendência; um novo erro reabre a revisão para amanhã.
  const bancos = {};                        // bank -> {rotulo, iniciar(ids), tema(tid)}
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const dia = (t = Date.now(), mais = 0) => { const d = new Date(t); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + mais); return d.getTime(); };
  const log = () => (window.HIG && HIG.qlog ? HIG.qlog() : {});
  const salvar = () => window.HIG?.qlogSave?.();

  function registrar(bank, id, ok, meta = {}) {
    window.MasterActivity?.track('question_answer',meta.resource||bank+':'+id,{correct:!!ok});
    if (!window.HIG?.qlog) return;
    const L = log(), k = bank + ':' + id, e = L[k];
    if (!ok) {
      L[k] = { b: bank, id, tid: meta.tid || e?.tid || '', tema: meta.tema || e?.tema || '', q: String(meta.q || e?.q || '').slice(0, 140), erros: (e?.erros || 0) + 1, box: 0, due: dia(Date.now(), 1), last: Date.now(), res: false, policy: 2 };
    } else if (e && e.erros > 0) {
      L[k] = { ...e, box: (e.box || 0) + 1, last: Date.now(), res: true, due: 0, policy: 2 };
    } else {
      L[k] = { b: bank, id, erros: 0, res: true, due: 0, last: Date.now(), policy: 2 };
    }
    salvar();
  }

  /* ---------- bolinhas ---------- */
  function dots({ total, step, estado, ir }) {
    let h = '<nav class="qnav-dots" aria-label="Ir para a questão">';
    for (let k = 0; k < total; k++) {
      const s = estado(k) || '';
      const rot = `Questão ${k + 1}${s === 'certa' ? ', acertou' : s === 'errada' ? ', errou' : ''}`;
      h += `<button type="button" class="qnav-dot ${s} ${k === step ? 'atual' : ''}" aria-label="${rot}" ${k === step ? 'aria-current="step"' : ''} onclick="${ir}(${k})">${k + 1}</button>`;
    }
    return h + '</nav>';
  }

  /* Ações visíveis e compartilhadas por P1, P2 e Cirurgia. O summary nativo
     funciona por clique, toque, Enter e Espaço sem JavaScript adicional. */
  function filtros(formulario) {
    return `<details class="qnav-filterbox"><summary class="qnav-filter-toggle"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M7 12h10m-7 6h4"/><circle cx="8" cy="6" r="2" fill="currentColor"/><circle cx="15" cy="12" r="2" fill="currentColor"/></svg><span>Filtrar questões</span><svg class="qnav-filter-chevron" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="qnav-filter-content"><p class="qnav-filter-hint">Escolha o tema ou a modalidade. Aplicar o filtro inicia outra rodada; suas respostas já registradas permanecem salvas.</p>${formulario}</div></details>`;
  }

  function resultado(ir, total) {
    return `<div class="qnav-fim"><button type="button" class="btn qnav-result-button" onclick="${ir}(${total})"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19V11m6 8V5m6 14v-7m4 7H2"/></svg><span>Ver resultado</span></button></div>`;
  }

  /* ---------- gráfico de resultado ---------- */
  function rosca(c, e, b) {
    const t = c + e + b || 1, R = 52, C = 2 * Math.PI * R;
    const arco = (v, off, cor) => `<circle r="${R}" cx="70" cy="70" fill="none" stroke="${cor}" stroke-width="18" stroke-dasharray="${(v / t) * C} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 70 70)"/>`;
    const pc = Math.round(c / t * 100);
    return `<svg class="qnav-rosca" viewBox="0 0 140 140" role="img" aria-label="${c} certas, ${e} erradas, ${b} em branco"><circle r="${R}" cx="70" cy="70" fill="none" stroke="#e3e8ea" stroke-width="18"/>${arco(c, 0, '#1f9d62')}${arco(e, (c / t) * C, '#d64545')}${arco(b, ((c + e) / t) * C, '#aab4b8')}<text x="70" y="68" text-anchor="middle" class="qnav-pc">${pc}%</text><text x="70" y="88" text-anchor="middle" class="qnav-sub">de acertos</text></svg>`;
  }

  function resumo({ bank, itens, refazer = '' }) {
    const c = itens.filter(i => i.ok === true).length, e = itens.filter(i => i.ok === false).length, b = itens.length - c - e;
    const por = {};
    itens.forEach(i => { const k = i.tid || i.tema || '—'; const o = por[k] || (por[k] = { tid: i.tid, tema: i.tema || k, c: 0, e: 0, b: 0 }); if (i.ok === true) o.c++; else if (i.ok === false) o.e++; else o.b++; });
    const lista = Object.values(por).sort((x, y) => (y.e + y.b) / (y.c + y.e + y.b) - (x.e + x.b) / (x.c + x.e + x.b) || y.e - x.e);
    const barras = lista.map(o => { const t = o.c + o.e + o.b; return `<li><span class="qnav-tema">${esc(o.tema)}</span><span class="qnav-barra" role="img" aria-label="${o.c} certas, ${o.e} erradas, ${o.b} em branco"><i class="c" style="flex:${o.c}"></i><i class="e" style="flex:${o.e}"></i><i class="b" style="flex:${o.b}"></i></span><b>${o.c}/${t}</b></li>`; }).join('');
    const fracos = lista.filter(o => o.e + o.b > 0).slice(0, 3);
    const reforco = fracos.length
      ? `<h3>Temas para reforçar</h3><ul class="qnav-fracos">${fracos.map(o => `<li><span><b>${esc(o.tema)}</b> · ${o.e} ${o.e === 1 ? 'erro' : 'erros'}${o.b ? ' e ' + o.b + ' em branco' : ''}</span>${o.tid && bancos[bank]?.tema ? `<button type="button" class="btn small" onclick="QNav.tema('${bank}','${esc(o.tid)}')">Treinar tema</button>` : ''}</li>`).join('')}</ul>`
      : '<p class="qnav-ok">Nenhum tema fraco nesta rodada.</p>';
    const agenda = e ? `<p class="qnav-agenda">${e} ${e === 1 ? 'questão errada entrou' : 'questões erradas entraram'} na revisão espaçada. A revisão fica disponível amanhã. Ao acertar, a questão sai da fila automática; se errar novamente, volta amanhã.</p>` : '';
    return `<section class="card pad qnav-resumo" aria-label="Resultado da rodada"><div class="qnav-topo">${rosca(c, e, b)}<div class="qnav-leg"><p><i class="c"></i><b>${c}</b> certas</p><p><i class="e"></i><b>${e}</b> erradas</p><p><i class="b"></i><b>${b}</b> em branco</p></div></div><h3>Desempenho por tema</h3><ul class="qnav-temas">${barras}</ul>${reforco}${agenda}<div class="btn-row">${refazer}<button type="button" class="btn" onclick="navigate('revisao')">Abrir painel de revisão</button></div></section>`;
  }

  /* ---------- painel de revisão ---------- */
  const pendentes = () => Object.values(log()).filter(e => !e.res);
  const vencidas = bank => pendentes().filter(e => e.due <= Date.now() && (!bank || e.b === bank));
  const total = () => vencidas().length;

  function painel() {
    const todas = pendentes(), hoje = dia(Date.now(), 1) - 1, venc = todas.filter(e => e.due <= hoje).sort((a, b) => a.due - b.due);
    const resolvidas = Object.values(log()).filter(e => e.res).length;
    const nomes = { p2: 'Clínica Médica P2', p1: 'Clínica Médica P1', cir: 'Cirurgia' };
    const dias = [...Array(7)].map((_, k) => ({ k, n: todas.filter(e => k === 0 ? e.due <= hoje : e.due > dia(Date.now(), k) - 1 && e.due <= dia(Date.now(), k + 1) - 1).length }));
    const max = Math.max(1, ...dias.map(d => d.n));
    const rotulo = k => k === 0 ? 'Hoje' : k === 1 ? 'Amanhã' : new Date(dia(Date.now(), k)).toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
    const agenda = `<div class="qnav-agendagraf" role="img" aria-label="Revisões agendadas nos próximos 7 dias">${dias.map(d => `<div><span class="qnav-col" style="height:${Math.max(4, d.n / max * 70)}px"></span><b>${d.n}</b><small>${rotulo(d.k)}</small></div>`).join('')}</div>`;
    const temas = {};
    todas.forEach(e => { const k = e.tema || '—'; (temas[k] = temas[k] || { n: 0, erros: 0 }); temas[k].n++; temas[k].erros += e.erros; });
    const rank = Object.entries(temas).sort((a, b) => b[1].erros - a[1].erros).slice(0, 6);
    const botoes = Object.keys(nomes).map(b => { const n = vencidas(b).length; return n && bancos[b] ? `<button type="button" class="btn primary" onclick="QNav.revisar('${b}')">Revisar ${nomes[b]} (${n})</button>` : ''; }).join('');
    const vazio = !todas.length && !resolvidas;
    return `<header class="page-header"><p class="eyebrow">REVISÃO DAS ERRADAS</p><h1>Painel de <em>revisão.</em></h1><p>Toda questão errada volta amanhã; um acerto encerra a pendência. Aqui está o que vence e onde você mais erra.</p></header>`
      + (vazio ? '<div class="card pad empty-state"><h2>Nada para revisar ainda</h2><p>Quando você errar uma questão nos treinos ou simulados, ela aparece aqui com a data da próxima revisão.</p></div>' :
        `<div class="card pad qnav-painel"><div class="qnav-nums"><p><b>${venc.length}</b><span>para revisar hoje</span></p><p><b>${todas.length}</b><span>erradas em aberto</span></p><p><b>${resolvidas}</b><span>dominadas</span></p></div><div class="btn-row">${botoes || '<span class="subtle">Nenhuma revisão vence hoje.</span>'}</div></div>`
        + `<div class="card pad"><h3>Próximos 7 dias</h3>${agenda}</div>`
        + (rank.length ? `<div class="card pad"><h3>Temas que mais errou</h3><ul class="qnav-temas">${rank.map(([t, v]) => `<li><span class="qnav-tema">${esc(t)}</span><span class="qnav-barra"><i class="e" style="flex:${v.erros}"></i></span><b>${v.erros} ${v.erros === 1 ? 'erro' : 'erros'}</b></li>`).join('')}</ul></div>` : '')
        + (venc.length ? `<div class="card pad"><h3>Vencem hoje</h3><ul class="qnav-lista">${venc.slice(0, 30).map(e => `<li><span class="badge gray">${esc(nomes[e.b] || e.b)}</span><span>${esc(e.q)}</span><small>${esc(e.tema)} · ${e.erros}x errada</small></li>`).join('')}</ul></div>` : ''));
  }

  function revisar(bank) { const ids = vencidas(bank).map(e => e.id); if (ids.length && bancos[bank]) bancos[bank].iniciar(ids); }
  function tema(bank, tid) { bancos[bank]?.tema?.(tid); }
  function registrarBanco(bank, def) { bancos[bank] = def; }
  const catalogos = () => bancos;

  return { registrar, dots, filtros, resultado, resumo, painel, revisar, tema, registrarBanco, catalogos, total, vencidas };
})();
window.QNav = QNav;
