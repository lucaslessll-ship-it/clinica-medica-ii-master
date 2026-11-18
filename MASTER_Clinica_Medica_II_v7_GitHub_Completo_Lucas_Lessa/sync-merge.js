/* Mesclagem de três vias para a sincronia entre dispositivos.
   base = último estado sincronizado; local = este aparelho; remote = servidor.
   Quem mudou só de um lado vence sem conflito; quando os dois mudaram, objetos
   são mesclados chave a chave, listas com id por id, contadores pelo maior valor.
   Funções puras: usadas pelo auth.js e testadas em Node. */
(function (root) {
  'use strict';
  const MAXIMO = new Set(['ms', 'completed', 'breakMs', 'breaks', 'legacyMinutes', 'sessionSpent']);
  // Preferências deste aparelho nunca viajam: tela, tema, letra, última aula aberta.
  const SO_NESTE_APARELHO = ['theme', 'font', 'contrast', 'motion', 'collapsed', 'focus', 'lastTopic', 'lastChapter'];
  const ehObj = v => v !== null && typeof v === 'object' && !Array.isArray(v);
  const ordenar = v => JSON.stringify(v, (k, x) => ehObj(x) ? Object.fromEntries(Object.keys(x).sort().map(n => [n, x[n]])) : x);
  const igual = (a, b) => ordenar(a) === ordenar(b);
  const porId = l => l.every(x => ehObj(x) && typeof x.id === 'string');

  function mesclarListaComId(base, local, remote) {
    const mapa = l => new Map((Array.isArray(l) ? l : []).filter(x => x && x.id).map(x => [x.id, x]));
    const B = mapa(base), L = mapa(local), R = mapa(remote), saida = [];
    for (const id of new Set([...L.keys(), ...R.keys(), ...B.keys()])) {
      const v = merge3(B.get(id), L.get(id), R.get(id));
      if (v !== undefined) saida.push(v);
    }
    return saida.sort((a, b) => String(a.criadoEm || '').localeCompare(String(b.criadoEm || '')));
  }

  // Listas sem id (histórico, filas): o que um lado acrescentou entra; o que um lado removeu sai.
  function mesclarListaSimples(base, local, remote) {
    const chave = ordenar, b = Array.isArray(base) ? base : [];
    const dosDois = new Set([...local, ...remote].map(chave));
    const removidos = new Set(b.filter(x => !local.some(y => igual(x, y)) || !remote.some(y => igual(x, y))).map(chave));
    const visto = new Set(), saida = [];
    for (const item of [...local, ...remote]) {
      const k = chave(item);
      if (visto.has(k) || removidos.has(k) || !dosDois.has(k)) continue;
      visto.add(k); saida.push(item);
    }
    return saida;
  }

  function merge3(base, local, remote, campo = '') {
    if (igual(local, remote)) return local;
    if (igual(base, local)) return remote;
    if (igual(base, remote)) return local;
    if (ehObj(local) && ehObj(remote)) {
      // Resposta e agenda são um registro único: não misturar a data de uma
      // tentativa com o resultado de outra em dispositivos concorrentes.
      const resposta = (typeof local.correct === 'boolean' && typeof remote.correct === 'boolean') ||
        (typeof local.res === 'boolean' && typeof remote.res === 'boolean' && 'erros' in local && 'erros' in remote);
      const stamp = v => Number(v.last) || Number(v.at) || Date.parse(v.at || v.date || '') || 0;
      if (resposta && stamp(local) && stamp(remote)) {
        const novo = stamp(remote) > stamp(local) ? remote : local;
        const saida = {...novo};
        for (const k of ['attempts', 'erros']) if (typeof local[k] === 'number' && typeof remote[k] === 'number') saida[k] = Math.max(local[k], remote[k]);
        return saida;
      }
      const b = ehObj(base) ? base : {}, saida = {};
      for (const k of new Set([...Object.keys(local), ...Object.keys(remote)])) {
        const v = merge3(b[k], local[k], remote[k], k);
        if (v !== undefined) saida[k] = v;
      }
      return saida;
    }
    if (Array.isArray(local) && Array.isArray(remote)) {
      return porId(local) && porId(remote) ? mesclarListaComId(base, local, remote) : mesclarListaSimples(base, local, remote);
    }
    if (typeof local === 'number' && typeof remote === 'number' && MAXIMO.has(campo)) return Math.max(local, remote);
    return local;
  }

  // Preferências de leitura: marcas, notas e pomodoro viajam; o resto do aparelho fica.
  function mesclarPrefs(base, local, remote) {
    const l = local || {}, r = remote || {};
    const m = merge3(base || {}, l, r);
    if (!ehObj(m)) return local;
    for (const campo of SO_NESTE_APARELHO) {
      if (campo in l) m[campo] = l[campo]; else delete m[campo];
    }
    // Estado do pomodoro (etapa, tempo, ciclo): vale o lado atualizado por último.
    const pl = l.pomodoro, pr = r.pomodoro;
    if (ehObj(pl) && ehObj(pr) && ehObj(m.pomodoro)) {
      const novo = (Number(pr.em) || 0) > (Number(pl.em) || 0) ? pr : pl;
      for (const c of ['version', 'minutes', 'shortMinutes', 'longMinutes', 'rodada', 'feitos', 'mode', 'auto', 'remainingMs', 'ativo', 'em']) {
        if (c in novo) m.pomodoro[c] = novo[c]; else delete m.pomodoro[c];
      }
      if ('floating' in pl) m.pomodoro.floating = pl.floating;
    }
    return m;
  }

  const api = { merge3, mesclarPrefs, igual };
  root.MASTER_SYNC_MERGE = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
