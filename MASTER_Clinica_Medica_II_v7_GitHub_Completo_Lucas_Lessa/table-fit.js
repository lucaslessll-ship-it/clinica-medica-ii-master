/* Ajuste de tabelas ao espaço disponível.
   Mede cada tabela depois de renderizar e ao redimensionar: se não couber na
   largura do container, empilha as linhas em blocos rotulados em vez de rolar.
   Vale para as tabelas atuais e para qualquer outra criada depois. */
(() => {
  'use strict';
  const RAIZ = '#main-content, .hig-dialog, .ai-tutor-dialog';
  const COLUNA_LEGIVEL = 120; // px mínimos por coluna para o texto ainda fluir
  let agendado = false, ocupado = false;

  const tabelas = () => {
    const encontradas = [];
    for (const raiz of document.querySelectorAll(RAIZ)) encontradas.push(...raiz.querySelectorAll('table'));
    return encontradas;
  };

  // Tabelas com células mescladas não viram blocos: a correspondência de rótulos se perderia.
  const mesclada = table => !!table.querySelector('[colspan]:not([colspan="1"]),[rowspan]:not([rowspan="1"])');

  function rotular(table) {
    const colunas = [...table.querySelectorAll('thead th')].map(th => th.textContent.trim());
    if (!colunas.length) return false;
    const assinatura = colunas.join('|');
    if (table.dataset.fitCols === assinatura) return true;
    for (const linha of table.querySelectorAll('tbody tr')) {
      let indice = 0;
      for (const celula of linha.children) {
        const rotulo = colunas[indice];
        if (celula.tagName === 'TD' && rotulo) celula.setAttribute('data-col', rotulo);
        indice++;
      }
    }
    table.dataset.fitCols = assinatura;
    return true;
  }

  // Trocar display quebra a semântica nativa; os papéis mantêm a tabela legível por leitores de tela.
  const PAPEIS = [['table', 'table'], ['thead', 'rowgroup'], ['tbody', 'rowgroup'], ['tfoot', 'rowgroup'], ['tr', 'row'], ['td', 'cell'], ['th', 'columnheader']];
  function papeis(table, ligar) {
    for (const [seletor, papel] of PAPEIS) {
      for (const elemento of (seletor === 'table' ? [table] : table.querySelectorAll(seletor))) {
        const valor = seletor === 'th' && elemento.getAttribute('scope') === 'row' ? 'rowheader' : papel;
        if (ligar) elemento.setAttribute('role', valor); else elemento.removeAttribute('role');
      }
    }
  }

  function ajustar() {
    agendado = false;
    const lista = tabelas().filter(t => !mesclada(t) && t.querySelector('thead th'));
    if (!lista.length) return;
    ocupado = true;
    // Empilhar só quando nem o texto quebrado cabe: compara a largura mínima
    // da tabela com o espaço do container. Leitura e escrita no mesmo quadro.
    for (const table of lista) table.dataset.fit = 'wrap';
    const empilhar = new Set();
    for (const table of lista) {
      const caixa = table.parentElement;
      if (!caixa) continue;
      const largura = table.style.width;
      table.style.width = 'min-content';
      const minima = table.offsetWidth;
      table.style.width = largura;
      const colunas = table.querySelectorAll('thead th').length || 1;
      // Não basta caber: uma coluna estreita demais transforma o texto numa
      // palavra por linha. Abaixo de COLUNA_LEGIVEL, a linha vira bloco.
      if (minima > caixa.clientWidth + 1 || caixa.clientWidth / colunas < COLUNA_LEGIVEL) empilhar.add(table);
    }
    for (const table of lista) {
      const deve = empilhar.has(table);
      if (deve) rotular(table);
      table.dataset.fit = deve ? 'stack' : 'wrap';
      papeis(table, deve);
    }
    ocupado = false;
  }

  function agendar() {
    if (agendado || ocupado) return;
    // Páginas sem tabela não agendam quadro nenhum: nada a medir, e o ritmo
    // de requestAnimationFrame de quem está na tela fica intocado.
    if (!document.querySelector(`${RAIZ.split(',').map(r => `${r.trim()} table`).join(',')}`)) return;
    agendado = true;
    requestAnimationFrame(ajustar);
  }

  function iniciar() {
    agendar();
    const alvo = document.getElementById('main-content');
    if (alvo) new MutationObserver(() => agendar()).observe(alvo, { childList: true, subtree: true });
    const dialogo = document.getElementById('hig-overlay');
    if (dialogo) new MutationObserver(() => agendar()).observe(dialogo, { childList: true, subtree: true });
    addEventListener('resize', agendar, { passive: true });
    addEventListener('master-auth-ready', agendar);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar, { once: true });
  else iniciar();
  window.TableFit = { ajustar: agendar };
})();
