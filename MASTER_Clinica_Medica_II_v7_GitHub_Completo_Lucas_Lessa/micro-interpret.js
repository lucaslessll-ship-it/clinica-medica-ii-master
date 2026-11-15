/* Interpretador didático limitado ao recorte documental conferido. Sem conversões ou inferências taxonômicas. */
window.MicroInterpret=(()=>{
 'use strict';
 const data=window.MASTER_AMR_URO;
 const labels={S:'Sensível, regime de exposição padrão',I:'Sensível, exposição aumentada',R:'Resistente',NI:'Não interpretável pela tabela selecionada'};
 function no(reason){return {category:'NI',label:labels.NI,reason};}
 function classify(input){
  if(!input||input.standard!==data.standard||input.year!==data.year||input.revision!==data.revision||input.source!==data.source)return no('Norma, ano, revisão e origem precisam coincidir com o recorte conferido. BrCAST e EUCAST não são substituídos entre si.');
  const rule=data.rules.find(r=>r.organism===input.organism&&r.drug===input.drug&&r.method===input.method&&r.contexts.includes(input.context));
  if(!rule)return no('Não há regra conferida para esta espécie, antimicrobiano, método e contexto. Não é feito reaproveitamento de outra espécie.');
  if(input.unit!==rule.unit)return no('Unidade incompatível com o método. O simulador não converte halo em CIM.');
  if(rule.method==='DISK'&&input.diskMicrograms!==rule.diskMicrograms)return no('O conteúdo do disco precisa corresponder ao da regra conferida.');
  const raw=String(input.value??'').trim();
  if(!/^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw))return no('Informe uma medida exata positiva. Resultados com menor ou maior que, intervalos ou unidades misturadas exigem avaliação própria.');
  const value=Number(raw.replace(',','.'));
  if(!Number.isFinite(value)||value<=0||rule.method==='DISK'&&!Number.isInteger(value))return no('CIM deve ser positiva e finita; diâmetro deve ser um número inteiro positivo em milímetros.');
  const category=rule.method==='MIC'?(value<=rule.s?'S':value>rule.r?'R':'I'):(value>=rule.s?'S':value<rule.r?'R':'I');
  return {category,label:labels[category],ruleId:rule.id,standard:data.standard,year:data.year,revision:data.revision,source:data.source,reason:'Interpretação in vitro no contexto selecionado. Não determina diagnóstico, necessidade de antibiótico, dose ou adequação ao sítio.'};
 }
 return {classify,labels,provenance:()=>data};
})();
