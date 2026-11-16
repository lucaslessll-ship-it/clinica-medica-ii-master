// Extrai somente os textos públicos das aulas, sem notas, progresso ou imagens privadas.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const A=path.join(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const window={addEventListener(){},__courses:{}};
const context=vm.createContext({window,document:{addEventListener(){},querySelectorAll(){return []}},structuredClone,console});
context.CourseKit={create(cfg){window.__courses[cfg.route]=cfg.MODULES;return {};}};
const scripts=[...fs.readFileSync(path.join(A,'index.html'),'utf8').matchAll(/<script src="([^"?]+)(?:\?[^\"]*)?"/g)].map(m=>m[1]);
for(const file of scripts){
 if(!['data.js','p1_data.js','cir_data.js','deep_content.js','lesson-deep.js'].includes(file)&&!/^lesson-deep-.+\.js$/.test(file)&&!/-course\.js$/.test(file))continue;
 let source=fs.readFileSync(path.join(A,file),'utf8');
 if(file==='lesson-deep.js')source=source.replace('const DATA={','const DATA=window.__deep={');
 if(['pocus-course.js','ecg-course.js'].includes(file))source=source.replace('const MODULES=[',`const MODULES=window.__courses.${file.split('-')[0]}=[`);
 vm.runInContext(source,context,{filename:file,timeout:3000});
}
const clean=s=>String(s).replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\b(?:Medcurso|Medcel|Sanar|Estratégia MED)\b/gi,'').replace(/\s+/g,' ').trim();
const skip=new Set(['updated','refs','fig','figs','id','image','img','u','url','credit','source','src']);
function strings(value){if(typeof value==='string')return [clean(value)];if(Array.isArray(value))return value.flatMap(strings);if(value&&typeof value==='object')return Object.entries(value).filter(([k])=>!skip.has(k)).flatMap(([,v])=>strings(v));return [];}
const docs=[];
function add(lesson,title,route,text,meta={}){
 const words=clean(text).split(/\s+/).filter(Boolean);if(words.length<15)return;
 for(let start=0,n=0;start<words.length;start+=360,n++){
  const end=words.length-start<500?words.length:Math.min(start+400,words.length);
  docs.push({id:lesson+':'+n,lesson,title:clean(title),route,text:words.slice(start,end).join(' '),...meta});if(end===words.length)break;
 }
}
const groups=[['p2',window.MASTER_DATA?.topics||[]],['p1',window.MASTER_P1_DATA?.topics||[]],['cir',window.MASTER_CIR_DATA?.topics||[]]];
const base=new Map();
for(const [kind,topics] of groups)for(const topic of topics)topic.chapters.forEach((chapter,index)=>{
 const key=topic.id+'_'+index;const route=kind==='p2'?'#topic/'+topic.id:kind==='p1'?'#p1topic':'#cirtopic';
 base.set(key,{title:topic.title+' · '+chapter.name,route,kind,topic:topic.id,chapter:index,chapterData:chapter});
});
for(const [key,d] of Object.entries(window.__deep||{})){
 const meta=base.get(key);if(!meta)throw new Error('Aula sem rota: '+key);
 add(key,meta.title,meta.route,strings(meta.chapterData).concat(strings(window.MASTER_DEEP?.chapters?.[key]||{}),strings(d)).join('\n'),{kind:meta.kind,topic:meta.topic,chapter:meta.chapter});
}
for(const [key,meta] of base)if(!window.__deep?.[key])add(key,meta.title,meta.route,strings(meta.chapterData).join('\n'),{kind:meta.kind,topic:meta.topic,chapter:meta.chapter});
for(const [route,modules] of Object.entries(window.__courses))modules.forEach((m,index)=>add(route+'_'+m.id,m.title,'#'+route,strings(m).join('\n'),{kind:'course',course:route,module:index}));
const json=JSON.stringify(docs);fs.writeFileSync(process.argv[2]||path.join(A,'ai-index.json'),json+'\n');
console.log(`${docs.length} blocos, ${new Set(docs.map(d=>d.lesson)).size} aulas, ${(Buffer.byteLength(json)/1024).toFixed(0)} KiB`);
