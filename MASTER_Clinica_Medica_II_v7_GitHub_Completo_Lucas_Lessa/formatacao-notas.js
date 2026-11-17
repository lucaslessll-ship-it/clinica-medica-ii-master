/* Editor leve de anotacoes. Apenas texto: Markdown limitado e pre-visualizacao
   segura; jamais incorpora HTML, imagens, estilos ou scripts colados. */
(() => {
  'use strict';
  const SELETORES = [
    '#chapter-note','#p1-note','#cir-note',
    '.caderno-editor','.caderno-comentario',
    '.nota-painel-entrada textarea','.nota-painel-geral-editor','.caderno-painel-editor'
  ].join(',');
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function inline(texto) {
    return esc(texto)
      .replace(/\*\*([^*\n]+)\*\*/g,'<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g,'$1<em>$2</em>')
      .replace(/\+\+([^+\n]+)\+\+/g,'<u>$1</u>')
      .replace(/~~([^~\n]+)~~/g,'<s>$1</s>');
  }
  function renderizar(texto) {
    const linhas=String(texto ?? '').replace(/\r\n?/g,'\n').split('\n');
    let dentro=false, html='';
    for(const linha of linhas) {
      const item=/^\s*[-•]\s+(.+)$/.exec(linha);
      if(item) {
        if(!dentro){html+='<ul>';dentro=true}
        html+='<li>'+inline(item[1])+'</li>';
      } else {
        if(dentro){html+='</ul>';dentro=false}
        html+=linha.trim()?'<p>'+inline(linha)+'</p>':'<p class="nota-preview-vazio">&nbsp;</p>';
      }
    }
    if(dentro)html+='</ul>';
    return html;
  }

  function aplicar(textarea, tipo, anterior) {
    const inicio=anterior?.inicio ?? textarea.selectionStart, fim=anterior?.fim ?? textarea.selectionEnd;
    const escolhido=textarea.value.slice(inicio,fim);
    if(tipo==='preview')return;
    let novo, posicao;
    if(tipo==='lista') {
      const antes=escolhido||'item';
      novo=antes.split('\n').map(l=>'- '+l.replace(/^\s*[-•]\s+/,'')).join('\n');
      posicao=inicio+novo.length;
    } else {
      const marcadores={negrito:['**','**'],italico:['*','*'],sublinhado:['++','++'],riscado:['~~','~~']};
      const [abre,fecha]=marcadores[tipo]||['',''];
      novo=abre+(escolhido||'texto')+fecha;
      posicao=inicio+abre.length+(escolhido||'texto').length;
    }
    textarea.focus({preventScroll:true});
    textarea.setRangeText(novo,inicio,fim,'end');
    textarea.setSelectionRange(posicao,posicao);
    textarea.dispatchEvent(new Event('input',{bubbles:true}));
  }

  function montar(textarea) {
    if(textarea.dataset.formatoNotas==='sim')return;
    textarea.dataset.formatoNotas='sim';
    const barra=document.createElement('div');
    barra.className='nota-formatbar';
    barra.setAttribute('role','toolbar');
    barra.setAttribute('aria-label','Formatar anotação em texto');
    const comandos=[
      ['negrito','B','Negrito'],['italico','I','Itálico'],
      ['sublinhado','U','Sublinhado'],['riscado','S','Riscado'],
      ['lista','☰','Lista com marcadores'],['preview','◫','Mostrar ou ocultar prévia formatada']
    ];
    for(const [tipo,simbolo,nome] of comandos) {
      const b=document.createElement('button');
      b.type='button';b.dataset.formatar=tipo;b.title=nome;
      b.setAttribute('aria-label',nome);
      b.textContent=simbolo;
      if(tipo==='italico')b.style.fontStyle='italic';
      if(tipo==='negrito')b.style.fontWeight='800';
      if(tipo==='sublinhado')b.style.textDecoration='underline';
      if(tipo==='riscado')b.style.textDecoration='line-through';
      barra.append(b);
    }
    const previa=document.createElement('div');
    previa.className='nota-preview';
    previa.hidden=true;
    previa.setAttribute('aria-label','Pré-visualização da anotação formatada');
    textarea.before(barra);
    textarea.after(previa);
    const mostrar=()=>{
      if(!previa.hidden)previa.innerHTML=renderizar(textarea.value);
    };
    let selecaoAnterior=null;
    const guardar=evento=>{
      if(!evento.target.closest('button'))return;
      selecaoAnterior={inicio:textarea.selectionStart,fim:textarea.selectionEnd};
    };
    barra.addEventListener('touchstart',guardar,{passive:true});
    barra.addEventListener('mousedown',event=>{
      guardar(event);
      if(event.target.closest('button'))event.preventDefault();
    });
    barra.addEventListener('click',event=>{
      const b=event.target.closest('[data-formatar]');
      if(!b)return;
      if(b.dataset.formatar==='preview') {
        previa.hidden=!previa.hidden;
        b.setAttribute('aria-pressed',String(!previa.hidden));
        mostrar();
      } else {
        aplicar(textarea,b.dataset.formatar,selecaoAnterior);
        selecaoAnterior=null;
        previa.hidden=false;
        barra.querySelector('[data-formatar="preview"]').setAttribute('aria-pressed','true');
        mostrar();
      }
    });
    textarea.addEventListener('input',mostrar);
  }

  function iniciar() {
    document.querySelectorAll(SELETORES).forEach(montar);
    const observer=new MutationObserver(mutations=>{
      if(!mutations.some(m=>m.addedNodes.length))return;
      document.querySelectorAll(SELETORES+':not([data-formato-notas])').forEach(montar);
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }

  window.FormatacaoNotas={renderizar,esc};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iniciar,{once:true});
  else iniciar();
})();
