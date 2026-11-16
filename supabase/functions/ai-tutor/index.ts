import { createClient } from 'npm:@supabase/supabase-js@2.119.0';
import { createHandler } from './handler.mjs';
let pending;
async function loadCorpus(){
 if(!pending)pending=(async()=>{
  const result=await fetch('https://lucaslessll-ship-it.github.io/clinica-medica-ii-master/MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/ai-index.json?v=20261116-ai1',{signal:AbortSignal.timeout(15000)});
  if(!result.ok)throw new Error('corpus');return result.json();
 })().catch(error=>{pending=null;throw error;});
 return pending;
}
Deno.serve(createHandler({env:(key)=>Deno.env.get(key),createClient,fetch,loadCorpus}));
