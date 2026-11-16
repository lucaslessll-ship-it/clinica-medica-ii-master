// Local evaluation of the real tutor handler with public lessons and synthetic auth.
// Never calls the production database or spends a student's daily allowance.
const fs=require('node:fs');
const MiniSearch=require('minisearch');
const corpusPath='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/ai-index.json';
const corpus=JSON.parse(fs.readFileSync(fs.existsSync('dist/'+corpusPath)?'dist/'+corpusPath:corpusPath,'utf8'));
const index=new MiniSearch({fields:['title','text'],searchOptions:{boost:{title:3},prefix:true,fuzzy:0.2}});index.addAll(corpus);
class TutorProvider{
 id(){return 'clinica-master-tutor';}
 async callApi(question,context){
  if(!process.env.GROQ_API_KEY&&!process.env.GEMINI_API_KEY)return {error:'Configure GROQ_API_KEY ou GEMINI_API_KEY no ambiente local para avaliar o modelo real.'};
  const {createHandler}=await import('../supabase/functions/ai-tutor/handler.mjs');
  const blocks=index.search(context.vars.search||question).slice(0,5).map(b=>({id:b.id}));
  const handler=createHandler({corpus,env:k=>process.env[k]||({SUPABASE_URL:'https://evaluation.invalid',SUPABASE_SERVICE_ROLE_KEY:'local-fixture'}[k]),createClient:()=>({auth:{getUser:async()=>({data:{user:{id:'synthetic-evaluation'}}})},rpc:async()=>({data:1})})});
  const response=await handler(new Request('https://evaluation.invalid/ai-tutor',{method:'POST',headers:{Authorization:'Bearer synthetic-evaluation'},body:JSON.stringify({question,blocks})}));
  const result=await response.json();return response.ok?{output:result.answer}:{error:'Tutor: '+result.error};
 }
}
module.exports=TutorProvider;
