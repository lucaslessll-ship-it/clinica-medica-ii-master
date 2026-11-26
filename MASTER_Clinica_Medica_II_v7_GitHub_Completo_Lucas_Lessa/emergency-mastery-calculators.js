/* Calculadoras educacionais com unidades e faixas explícitas. */
(()=>{
'use strict';
const pao=['pao','PaO₂ (mmHg)',20,800],fio=['fio','FiO₂ (%)',21,100];
const na=['na','Na medido (mEq/L)',100,200],glucose=['glu','Glicemia (mg/dL)',25,1600];
const pf={
 title:'Relação PaO₂/FiO₂',fields:[pao,fio],
 formula:'PaO₂ ÷ (FiO₂ em % ÷ 100). Use FiO₂ conhecida. A relação isolada não estabelece SDRA.',
 source:['ATS · Atualização no manejo de SDRA','https://www.thoracic.org/statements/resources/cc/ards-guidelines.pdf'],
 compute:({pao,fio})=>[['PaO₂/FiO₂',pao/(fio/100),'mmHg']]
};
const tools={
 irpa:pf,
 vm:{
  title:'Peso predito e volume corrente de referência',fields:[['height','Altura (cm)',120,220],['base','Fórmula de peso predito',0,1,[['1','Masculina'],['0','Feminina']]]],
  formula:'Peso predito = base (50 ou 45,5 kg) + 0,91 × (altura em cm − 152,4). O volume exibido usa 6 mL/kg como referência educacional em SDRA.',
  source:pf.source,
  compute:({height,base})=>{const pbw=(base?50:45.5)+0.91*(height-152.4);return [['Peso predito',pbw,'kg'],['6 mL/kg de peso predito',pbw*6,'mL']];}
 },
 acidobase:{
  title:'Interpretador de acidose metabólica',
  fields:[['ph','pH arterial',6.6,7.8],['hco','Bicarbonato (mEq/L)',2,60],['co','PaCO₂ (mmHg)',5,120],na,['cl','Cl (mEq/L)',60,160],['alb','Albumina (g/dL)',0.5,6]],
  formula:'AG = Na − Cl − HCO₃. AG corrigido = AG + 2,5 × (4 − albumina). Se houver acidose metabólica, Winter = 1,5 × HCO₃ + 8 ± 2 mmHg. Delta ratio usa AG basal didático de 12 e HCO₃ basal de 24. Interprete com os intervalos locais.',
  source:['MSD Manual · Distúrbios acidobásicos','https://www.msdmanuals.com/professional/endocrine-and-metabolic-disorders/acid-base-regulation-and-disorders/acid-base-disorders'],
  compute:({ph,hco,co,na,cl,alb})=>{
   const gap=na-cl-hco,gapc=gap+2.5*(4-alb),expected=1.5*hco+8;
   const rows=[['Ânion gap',gap,'mEq/L'],['Ânion gap corrigido por albumina',gapc,'mEq/L']];
   if(ph<7.35&&hco<22){
    rows.push(['PaCO₂ esperada pela fórmula de Winter',expected,'mmHg (±2)']);
    rows.push(['Comparação com a PaCO₂ medida',co>expected+2?'Componente respiratório acidificante':co<expected-2?'Componente respiratório alcalinizante':'Dentro da faixa esperada','']);
    if(gapc>12)rows.push(['Delta ratio',(gapc-12)/(24-hco),'']);
   }else rows.push(['Orientação','Avalie outros processos e distúrbios mistos antes de aplicar Winter.','']);
   return rows;
  }
 },
 glicemia:{
  title:'Osmolalidade efetiva e sódio estimado na hiperglicemia',fields:[na,glucose],
  formula:'Osmolalidade efetiva = 2 × Na medido + glicemia ÷ 18. Na estimado = Na medido + 1,6 × [(glicemia − 100) ÷ 100] quando glicemia > 100. O fator de correção é aproximado.',
  source:['Consenso internacional · Crises hiperglicêmicas em adultos','https://doi.org/10.2337/dci24-0032'],
  compute:({na,glu})=>[['Osmolalidade efetiva',2*na+glu/18,'mOsm/kg'],['Estimativa do Na corrigido',na+1.6*Math.max(0,glu-100)/100,'mEq/L']]
 },
 eletrolitos:{
  title:'Déficit estimado de água livre na hipernatremia',
  fields:[['weight','Peso (kg)',30,220],['fraction','Fração estimada de água corporal',0.3,0.7],['sodium','Na medido (mEq/L)',141,200]],
  formula:'Déficit estimado = peso × fração de água corporal × [(Na ÷ 140) − 1]. A fórmula não prevê perdas em andamento nem orienta velocidade ou prescrição.',
  source:['Avaliação da hipernatremia em adultos','https://pmc.ncbi.nlm.nih.gov/articles/PMC10175862/'],
  compute:({weight,fraction,sodium})=>[['Déficit estimado',weight*fraction*(sodium/140-1),'L']]
 }
};
const pretty=value=>typeof value==='number'?value.toLocaleString('pt-BR',{maximumFractionDigits:2}):value;
function calculate(form){
 const model=tools[form.dataset.calculator];
 const values={},output=form.querySelector('output');
 for(const [key,label,min,max] of model.fields){
  const input=form.elements[key],value=input.value===''?NaN:Number(input.value);
  if(!Number.isFinite(value)||value<min||value>max){output.textContent='Confira '+label+' (faixa didática: '+pretty(min)+' a '+pretty(max)+').';return;}
  values[key]=value;
 }
 output.textContent=model.compute(values).map(([label,value,unit])=>label+': '+pretty(value)+(unit?' '+unit:'')).join(' · ');
}
function startAdult(form){
 const {walk,breath,rate,perfusion,commands}=form.elements;
 const output=form.querySelector('output');
 let result;
 if(walk.value==='yes')result='Mínima inicialmente. Reclassifique se houver mudança no quadro.';
 else if(walk.value==='no'){
  if(breath.value==='after-opening')result='Imediata. A respiração retornou após abertura de via aérea.';
  if(breath.value==='absent')result='Categoria preta no START clássico. A vítima permanece apneica após abertura de via aérea.';
  if(breath.value==='spontaneous'&&rate.valueAsNumber>0){
   if(rate.valueAsNumber>30)result='Imediata por frequência respiratória acima de 30/min.';
   else if(perfusion.value==='poor')result='Imediata por alteração de perfusão.';
   else if(perfusion.value==='adequate'&&commands.value==='no')result='Imediata pelo critério de comandos.';
   else if(perfusion.value==='adequate'&&commands.value==='yes')result='Atrasada nesta avaliação inicial.';
  }
 }
 output.textContent=result||'Preencha os achados necessários para o ramo escolhido.';
}
function startTool(){
 const options=(name,label,values)=>'<label>'+label+'<select name="'+name+'"><option value="">Escolha</option>'+values.map(([value,text])=>'<option value="'+value+'">'+text+'</option>').join('')+'</select></label>';
 return ['Exercício de classificação START adulto','Modelo didático do algoritmo clássico',
  '<form class="ue-master-qt" data-calculator="start" onsubmit="event.preventDefault();UEClinicalCalculators.startAdult(this)">'+
  options('walk','Deambula?', [['yes','Sim'],['no','Não']])+
  options('breath','Respiração', [['spontaneous','Espontânea'],['after-opening','Retornou após abertura da via aérea'],['absent','Ausente após abertura da via aérea']])+
  '<label>Frequência respiratória (/min)<input name="rate" type="number" min="1" max="120" inputmode="numeric"></label>'+
  options('perfusion','Perfusão pelo protocolo',[['adequate','Adequada'],['poor','Alterada']])+
  options('commands','Obedece a comandos?', [['yes','Sim'],['no','Não']])+
  '<button type="submit" class="btn primary">Classificar cenário</button><output aria-live="polite"></output></form>'+
  '<p>O exercício percorre deambulação, respiração, perfusão e comandos. Na resposta real, reclassifique conforme evolução e siga o método adotado pelo serviço.</p><p><a href="https://chemm.hhs.gov/startadult.htm" target="_blank" rel="noopener noreferrer">HHS CHEMM · Adult START</a></p>'];
}
function tool(id){
 if(id==='catastrofes')return startTool();
 const model=tools[id];if(!model)return null;
 const fields=model.fields.map(([key,label,min,max,options])=>'<label>'+label+(options?'<select name="'+key+'"><option value="">Escolha</option>'+options.map(([value,text])=>'<option value="'+value+'">'+text+'</option>').join('')+'</select>':'<input type="number" min="'+min+'" max="'+max+'" step="any" name="'+key+'" inputmode="decimal">')+'</label>').join('');
 return [model.title,'Referência educacional', '<form class="ue-master-qt" data-calculator="'+id+'" novalidate onsubmit="event.preventDefault();UEClinicalCalculators.calculate(this)">'+fields+'<button type="submit" class="btn primary">Calcular</button><output aria-live="polite"></output></form>'+
  '<p>'+model.formula+'</p><p><a target="_blank" rel="noopener noreferrer" href="'+model.source[1]+'">'+model.source[0]+'</a></p>'];
}
window.UEClinicalCalculators={tool,calculate,startAdult};
})();
