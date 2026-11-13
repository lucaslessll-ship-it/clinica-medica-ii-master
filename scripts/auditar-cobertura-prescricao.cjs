// Inventory the actual curriculum. A topic-level card is never treated as complete
// coverage of every disease in that topic. No dosage recommendations are generated.
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const app=path.join(root,'MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const context=vm.createContext({window:{}});
for(const file of ['data.js','p1_data.js','clinical-data.js','prescription-data.js','prescription-calculations.js'])vm.runInContext(fs.readFileSync(path.join(app,file),'utf8'),context,{filename:file});
const {MASTER_DATA,MASTER_P1_DATA,MASTER_CLINICAL_GUIDES,MASTER_RX}=context.window;
const lessons=[];
for(const [period,data]of [['P2',MASTER_DATA],['P1',MASTER_P1_DATA]])for(const topic of data.topics)topic.chapters.forEach((chapter,index)=>{
  const references=(MASTER_CLINICAL_GUIDES[topic.id]?.drugs||[]).map(id=>({id,name:MASTER_RX.drugs[id].name,workedCalculation:!!MASTER_RX.calculations[id]}));
  lessons.push({id:`${period}:${topic.id}:${index}`,period,topic:topic.title,lesson:chapter.name,existingTreatment:chapter.strategy||chapter.treatment||'',topicReferences:references,scope:topic.id==='p1tele'?'Modalidade de atendimento; sem medicamento padrão.':'Fichas compartilhadas pela matéria; revisão dos regimes de cada doença ainda pendente.'});
});
const report={commit:require('node:child_process').execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),lessonCount:lessons.length,topicCount:MASTER_DATA.topics.length+MASTER_P1_DATA.topics.length,selectedDrugCount:Object.keys(MASTER_RX.drugs).length,workedCalculationCount:Object.keys(MASTER_RX.calculations).length,completeFormulary:false,blockedSources:['dailymed.nlm.nih.gov','www.nice.org.uk','www.endocrinology.org'],lessons};
fs.mkdirSync(path.join(root,'docs'),{recursive:true});
fs.writeFileSync(path.join(root,'docs','cobertura-prescricao.json'),JSON.stringify(report,null,2)+'\n');
const escape=value=>String(value).replace(/\|/g,'/').replace(/\n/g,' ');
const lines=['# Cobertura do manual de prescrição','',`${report.lessonCount} aulas, ${report.topicCount} matérias e ${report.selectedDrugCount} fichas selecionadas com ${report.workedCalculationCount} exemplos de cálculo. **Não é um formulário completo de todos os tratamentos.**`,'','O roteiro abaixo vem das aulas reais. As referências de uma matéria não constituem indicação para todas as doenças da matéria. O detalhamento de novos regimes depende de consulta a diretrizes/bulas e conferência por indicação. Nesta sessão, as três fontes oficiais acima responderam com bloqueio de proxy 403. Nenhuma dose nova foi gerada a partir deste inventário.','','| Aula | Matéria | Fichas disponíveis na matéria | Conduta original a revisar |','|---|---|---|---|'];
for(const item of lessons)lines.push(`| ${escape(item.id+' · '+item.lesson)} | ${escape(item.topic)} | ${escape(item.topicReferences.map(r=>r.name).join('; ')||'Sem medicamento padrão')} | ${escape(item.existingTreatment)} |`);
fs.writeFileSync(path.join(root,'docs','COBERTURA_PRESCRICAO.md'),lines.join('\n')+'\n');
console.log(`${report.lessonCount} aulas / ${report.topicCount} matérias / ${report.selectedDrugCount} fichas / ${report.workedCalculationCount} cálculos. Cobertura completa: não.`);
