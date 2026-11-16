/* Destaque automático de valores clínicos no texto das aulas.
   Marca só número + unidade, corte ou prazo: é o que o olho procura em prova.
   Os termos-chave já vêm marcados com <strong> no conteúdo e recebem estilo
   próprio pelo CSS, sem passar por aqui. */
(() => {
  'use strict';
  const LEITURA = '.deep-block,.pocus-card-body,.pocus-lead,.pocus-sec,.course-body,.insight,.case-step';
  // Fora da prosa: metadados, rótulos e controles não recebem marca.
  const PROIBIDO = 'a,code,pre,kbd,script,style,textarea,input,select,button,.k-dado,[contenteditable],[data-no-destaque],.deep-head,.subtle,.kicker,.page-eyebrow,.pocus-crumb,.deep-read-time,.badge,.chip,.tag,thead,time,.stat,.kpi,.pill,[class*="lab-"],[class*="-chip"],[class*="-badge"]';
  const UNIDADES = 'mg\\/dL|mg\\/kg|mcg\\/kg|µg\\/kg|mEq\\/L|mmol\\/L|µmol\\/L|mL\\/kg|mL\\/h|L\\/min|g\\/dL|mg\\/L|ng\\/mL|pg\\/mL|UI\\/L|UI\\/mL|mOsm\\/kg|mmHg|cmH2O|bpm|irpm|mcg|µg|mg|mL|dL|kg|UI|%|°C|mSv|g';
  const TEMPO = 'horas?|h|minutos?|min|segundos?|dias?|semanas?|meses|mês|anos?';
  const VALOR = new RegExp(`(?:[<>≥≤]\\s?)?\\d{1,4}(?:[.,]\\d{1,3})?(?:\\s?[-–a]\\s?\\d{1,4}(?:[.,]\\d{1,3})?)?\\s?(?:${UNIDADES}|${TEMPO})(?![\\wÀ-ÿ/])`, 'giu');
  let agendado = false, ocupado = false;

  function marcar(raiz) {
    const andarilho = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
      acceptNode(no) {
        if (!no.nodeValue || no.nodeValue.length < 2 || !/\d/.test(no.nodeValue)) return NodeFilter.FILTER_REJECT;
        return no.parentElement && !no.parentElement.closest(PROIBIDO) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const alvos = [];
    for (let no = andarilho.nextNode(); no; no = andarilho.nextNode()) {
      VALOR.lastIndex = 0;
      if (VALOR.test(no.nodeValue)) alvos.push(no);
    }
    for (const no of alvos) {
      const texto = no.nodeValue;
      const fragmento = document.createDocumentFragment();
      let fim = 0;
      VALOR.lastIndex = 0;
      for (let achado = VALOR.exec(texto); achado; achado = VALOR.exec(texto)) {
        if (achado.index > fim) fragmento.append(texto.slice(fim, achado.index));
        const marca = document.createElement('span');
        marca.className = 'k-dado';
        marca.textContent = achado[0];
        fragmento.append(marca);
        fim = achado.index + achado[0].length;
      }
      if (fim < texto.length) fragmento.append(texto.slice(fim));
      no.replaceWith(fragmento);
    }
  }

  function aplicar() {
    agendado = false;
    ocupado = true;
    for (const bloco of document.querySelectorAll(LEITURA)) {
      if (bloco.dataset.destaque === '1') continue;
      bloco.dataset.destaque = '1';
      marcar(bloco);
    }
    ocupado = false;
  }

  function agendar() {
    if (agendado || ocupado) return;
    agendado = true;
    requestAnimationFrame(aplicar);
  }

  function iniciar() {
    agendar();
    const alvo = document.getElementById('main-content');
    if (alvo) new MutationObserver(() => agendar()).observe(alvo, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar, { once: true });
  else iniciar();
  window.Destaque = { aplicar: agendar };
})();
