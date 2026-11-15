/* LAB MASTER progress sync: isolated per authenticated user, no changes to existing MASTER progress. */
(() => {
  'use strict';
  const COURSE_ID='microcitose-2026-v1';
  const TABLE='lab_master_progress';
  const PREFIX='lab_master_microcitose_v2_';
  const API=window.LabMasterCourse;
  if(!API)return;
  let client=null,userId=null,epoch=0,pending=false,sending=false,timer=null,seq=0;
  const empty=()=>({done:[],quizAnswers:{},caseAnswers:{},profiles:{},theme:'light',flash:0,flipped:false,_clock:{done:{},quiz:{},cases:{},profiles:{},reset:{}}});
  const isObj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
  const obj=v=>isObj(v)?v:{};
  const num=v=>Number.isFinite(Number(v))?Number(v):0;
  const snapshot=()=>API.getSnapshot();
  const info=msg=>API.status(msg);
  const localKey=id=>PREFIX+id;
  function read(key){try{return obj(JSON.parse(localStorage.getItem(key)||'{}'))}catch{return{}}}
  const ctime=(s,area,id)=>num(obj(obj(s._clock)[area])[id]);
  function mergeClock(a,b){
    const merged={};
    for(const area of ['done','quiz','cases','profiles','reset']){
      merged[area]={};
      for(const k of new Set([...Object.keys(obj(obj(a._clock)[area])),...Object.keys(obj(obj(b._clock)[area]))]))
        merged[area][k]=Math.max(ctime(a,area,k),ctime(b,area,k));
    }
    return merged;
  }
  function mergeAnswers(a,b,key,area,resetName){
    const out={},reset=Math.max(ctime(a,'reset',resetName),ctime(b,'reset',resetName));
    for(const id of new Set([...Object.keys(obj(a[key])),...Object.keys(obj(b[key]))])){
      const ra=ctime(a,area,id),rb=ctime(b,area,id);
      const av=Object.prototype.hasOwnProperty.call(obj(a[key]),id)&&((ra>=reset&&ra>0)||reset===0);
      const bv=Object.prototype.hasOwnProperty.call(obj(b[key]),id)&&((rb>=reset&&rb>0)||reset===0);
      if(!av&&!bv)continue;
      out[id]=av&&(!bv||ra>=rb)?a[key][id]:b[key][id];
    }
    return out;
  }
  function merge(aRaw,bRaw){
    const a=obj(aRaw),b=obj(bRaw),clock=mergeClock(a,b),out={...empty(),...a,...b,_clock:clock};
    const views=['overview','physio','patterns','microscopy','lab','cases','quiz'];
    out.done=views.filter(v=>{
      const aa=ctime(a,'done',v),bb=ctime(b,'done',v);
      if(aa!==bb)return (aa>bb?a:b).done?.includes(v)===true;
      return (Array.isArray(a.done)&&a.done.includes(v))||(Array.isArray(b.done)&&b.done.includes(v));
    });
    out.quizAnswers=mergeAnswers(a,b,'quizAnswers','quiz','quiz');
    out.caseAnswers=mergeAnswers(a,b,'caseAnswers','cases','cases');
    out.profiles={};
    for(const id of new Set([...Object.keys(obj(a.profiles)),...Object.keys(obj(b.profiles))])){
      const ta=ctime(a,'profiles',id),tb=ctime(b,'profiles',id);
      const winner=ta>=tb?obj(a.profiles)[id]:obj(b.profiles)[id];
      const other=ta>=tb?obj(b.profiles)[id]:obj(a.profiles)[id];
      const p=obj(winner),q=obj(other);
      if(!Object.keys(p).length && Math.max(ta,tb)>0)continue;
      out.profiles[id]={...q,...p,requested:[...new Set([...(Array.isArray(q.requested)?q.requested:[]),...(Array.isArray(p.requested)?p.requested:[])])]};
      if(p.answer===null||p.answer===undefined){
        if(q.answer!==undefined&&ta===tb)out.profiles[id].answer=q.answer;
      }
    }
    const older=num(Date.parse(a._updatedAt||'')),newer=num(Date.parse(b._updatedAt||''));
    const pref=newer>=older?b:a;
    out.theme=pref.theme==='dark'?'dark':'light';
    out.flash=Number.isInteger(pref.flash)?pref.flash:0;
    out.flipped=pref.flipped===true;
    out._updatedAt=older>newer?a._updatedAt:b._updatedAt;
    return out;
  }
  function adopt(data,id){
    API.adopt(data,localKey(id));
  }
  function schedule(){
    if(!userId)return;
    pending=true;seq++;
    clearTimeout(timer);
    timer=setTimeout(()=>{void flush()},1100);
    info('Alterações pendentes…');
  }
  async function load(id){
    const token=++epoch;userId=id;pending=false;clearTimeout(timer);
    info('Carregando progresso…');
    try{
      const {data,error}=await client.from(TABLE).select('payload,revision').eq('user_id',id).eq('course_id',COURSE_ID).maybeSingle();
      if(error)throw error;if(token!==epoch||id!==userId)return;
      const local=read(localKey(id));
      const combined=merge(obj(data?.payload),local);
      adopt(combined,id);
      info('Progresso conectado ao Supabase');
      if(!data||JSON.stringify(combined)!==JSON.stringify(data.payload)){schedule()}
    }catch(e){if(token!==epoch)return;adopt(read(localKey(id)),id);info('Somente neste dispositivo (sem conexão)');}
  }
  async function flush(){
    if(sending||!pending||!userId||!client)return;
    const id=userId,token=epoch;
    sending=true;pending=false;const startSeq=seq;
    try{
      for(let attempt=0;attempt<5;attempt++){
        if(token!==epoch||id!==userId)return;
        const {data:row,error:readError}=await client.from(TABLE).select('payload,revision').eq('user_id',id).eq('course_id',COURSE_ID).maybeSingle();
        if(readError)throw readError;
        const combined=merge(obj(row?.payload),snapshot());
        const byteSize=new TextEncoder().encode(JSON.stringify(combined)).byteLength;
        if(byteSize>120000)throw Error('progress_limit');
        let result;
        if(row){
          result=await client.from(TABLE).update({payload:combined,revision:row.revision+1,updated_at:new Date().toISOString()})
            .eq('user_id',id).eq('course_id',COURSE_ID).eq('revision',row.revision).select('revision').maybeSingle();
          if(!result.error&&!result.data)continue;
        }else{
          result=await client.from(TABLE).insert({user_id:id,course_id:COURSE_ID,payload:combined,revision:1}).select('revision').maybeSingle();
          if(result.error?.code==='23505')continue;
        }
        if(result.error)throw result.error;
        if(token!==epoch||id!==userId)return;
        const latest=seq===startSeq?combined:merge(combined,snapshot());
        adopt(latest,id);
        if(seq!==startSeq){pending=true;}else{info('Sincronizado na sua conta');}
        return;
      }
      throw Error('sync_conflict');
    }catch(e){
      if(token===epoch){pending=true;info(e.message==='progress_limit'?'Progresso muito grande; exporte uma cópia':'Sem sincronização; dados salvos neste dispositivo');}
    }finally{
      sending=false;if(pending&&token===epoch){clearTimeout(timer);timer=setTimeout(()=>{void flush()},4000);}
    }
  }
  async function init(){
    const cfg=window.MASTER_AUTH_CONFIG;
    if(!cfg?.url||!cfg?.publishableKey||!window.supabase?.createClient){info('Modo local (conexão indisponível)');return;}
    try{
      const storage=window.MasterSessionStorage?.create(cfg.url)?.storage;
      client=window.supabase.createClient(cfg.url,cfg.publishableKey,{
        auth:{storage:storage||localStorage,persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}
      });
      const {data:{user},error}=await client.auth.getUser();
      if(error&&!user){info('Entre no MASTER para sincronizar');}
      if(user?.id){await load(user.id)}else{info('Entre no MASTER para sincronizar');}
      client.auth.onAuthStateChange((event,session)=>{
        const id=session?.user?.id||null;
        if(id&&id!==userId){void load(id);}
        else if(!id&&userId){epoch++;userId=null;clearTimeout(timer);pending=false;API.adopt(empty(),PREFIX+'guest');info('Entre no MASTER para sincronizar');}
      });
    }catch(e){info('Modo local (sem sincronização)');}
  }
  window.LabMasterSync={schedule,flush,merge,init};
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&pending)void flush()});
  void init();
})();
