'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const CODE=fs.readFileSync(path.join(ROOT,'master-planner.js'),'utf8');
const pad=n=>String(n).padStart(2,'0');
const today=()=>{const d=new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());};
const shift=days=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+days);return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());};
function setup(db=new Map(),uid='student-a'){
 const listeners={},notifications=[],routes=[],rendered=[];
 const window={addEventListener:(type,fn)=>{(listeners[type]??=[]).push(fn);},scrollY:0,scrollTo(){},MASTER_AUTH:{user:()=>({id:uid})}};
 window.P1={topics:[{id:'p1arr',title:'Arritmias na Clínica I',chapters:[]}]};
 window.CIR={topics:[{id:'ciraa',title:'Abdome agudo',chapters:[]}]};
 window.OSCEPilot={bank:()=>Array.from({length:93},(_,i)=>({number:i+1,title:'Estação '+(i+1),priority:i<40?'alta':'media',pocusOrder:i>=86?i-85:null})),preview(id){routes.push('preview:'+id);},start(t,ids,id){routes.push('simulate:'+id);}};
 const localStorage={getItem:k=>db.get(k)||null,setItem:(k,v)=>db.set(k,String(v))};
 const TOPICS=[{id:'neuro1',title:'Síncope e crise convulsiva',chapters:[]},{id:'gastro',title:'Doença celíaca e DII',chapters:[]}];
 const context=vm.createContext({window,localStorage,TOPICS,ui:{route:'other'},render:()=>rendered.push(true),navigate:route=>routes.push(route),toast:msg=>notifications.push(msg),document:{getElementById:()=>null},Date,Math,console});
 vm.runInContext(CODE,context,{filename:'master-planner.js'});
 return {p:window.MasterPlanner,db,window,listeners,notifications,routes,rendered,context};
}
function plan(c,date=shift(14),themes=['osce:87','p2:neuro1','cir:ciraa']){
 const p=c.p;p.openEditor();p.changeDraft('title','OSCE e Clínica');p.changeDraft('examDate',date);
 themes.forEach(key=>p.toggleTheme(key,true));p.savePlan();return p.activePlan();
}
test('a tela inicial é vazia e não simula pontos ou frequência anteriores',()=>{
 const c=setup();assert.match(c.p.page(),/Configurar primeira avaliação/);
 assert.equal(c.p.stats().xp,0);assert.equal(c.p.stats().days,0);
 assert.equal(c.p.activePlan(),null);assert.equal(c.db.has('master_study_planner_v1'),false);
});
test('catálogo inclui Clínica II, Clínica I, Cirurgia e 93 estações OSCE sem duplicações',()=>{
 const {p}=setup(),a=p.catalog();assert.equal(a.length,97);
 for(const label of ['Clínica Médica II','Clínica Médica I','Clínica Cirúrgica','OSCE · Clínica Médica','POCUS · OSCE'])assert.ok(a.some(x=>x.subject===label),label);
 assert.equal(new Set(a.map(x=>x.id)).size,a.length);
});
test('valida nome, seleção e data, e salva plano independente das notas das questões',()=>{
 const c=setup(),p=c.p;p.openEditor();
 p.changeDraft('title','X');p.savePlan();assert.equal(p.activePlan(),null);
 p.changeDraft('title','Prova Final');p.savePlan();assert.equal(p.activePlan(),null);
 p.toggleTheme('osce:1',true);p.changeDraft('examDate',shift(-2));p.savePlan();assert.equal(p.activePlan(),null);
 p.changeDraft('examDate',shift(9));p.savePlan();
 const a=p.activePlan();assert.equal(a.examDate,shift(9));assert.deepEqual([...a.themes],['osce:1']);
 assert.ok(c.db.has('master_study_planner_v1'));
 assert.equal(c.db.has('master_osce_pilot_v1'),false);
});
test('distribuição diária respeita limite e intervalo até a prova',()=>{
 const c=setup(),a=plan(c,shift(13));
 const s=c.p.schedule(a),todayKey=today();
 assert.ok(s.days>=1);assert.ok(s.planned>0);assert.ok(s.capacity>=1);
 assert.ok(s.rows.every(row=>row.tasks.length<=s.capacity));
 assert.ok(s.rows.every(row=>row.date>=todayKey&&row.date<=a.examDate));
 assert.ok(s.rows.flatMap(row=>row.tasks).some(x=>x.kind==='review'));
 assert.ok(s.rows.flatMap(row=>row.tasks).some(x=>x.kind==='new'));
});
test('prazo inviável não cria conclusão fictícia: sinaliza blocos sem vaga',()=>{
 const c=setup(),p=c.p,all=p.catalog().filter(x=>x.course==='osce').map(x=>x.id);
 const a=plan(c,shift(1),all);
 const s=p.schedule(a);
 assert.ok(s.unplaced+s.afterExam>0);
 assert.match(p.page(),/Carga superior ao prazo/);
 assert.equal(p.stats().xp,0);
});
test('uma autoavaliação de erro gera revisão amanhã; acerto sem ajuda amplia intervalo',()=>{
 const c=setup(),a=plan(c,shift(20),['osce:87']),p=c.p;
 p.register(a.id,'osce:87','again');
 let result=JSON.parse(c.db.get('master_study_planner_v1'));
 assert.equal(result.plans[0].progress['osce:87'].history[0].due,shift(1));
 assert.equal(p.stats().xp,4);
 p.register(a.id,'osce:87','good');
 assert.equal(p.stats().events.length,1,'sem XP infinito em repetições no mesmo dia');
 assert.equal(p.stats().recovered,0,'recuperação exige dias distintos');
});
test('estudo em nova data e desempenho independente não podem ser inferidos de simples visualizações',()=>{
 const c=setup(),a=plan(c),p=c.p;
 const x=p.homeCard();assert.match(x,/Master Planner/);
 assert.equal(p.stats().events.length,0);
 assert.equal(p.stats().days,0);
 const heat=p.heatmap();assert.match(heat,/Mapa de constância/);
 assert.ok((heat.match(/mp-heat-cell level-/g)||[]).length>300);
});
test('histórico do OSCE e Super Foco servem como sinais de prioridade sem alterar os bancos originais',()=>{
 const db=new Map(),uid='student-a';
 const osce={items:{'87:interpretacao':{attempts:[{score:40,due:new Date(Date.now()-86400000).toISOString(),at:new Date().toISOString()}]}}};
 const focus={records:{'osce:87:diagnostico':{score:40,attempts:1,due:new Date(Date.now()-43200000).toISOString(),lastAt:new Date().toISOString()}}};
 db.set('master_osce_pilot_v1',JSON.stringify(osce));
 db.set('master_super_foco_v1:'+uid,JSON.stringify(focus));
 const c=setup(db,uid),a=plan(c);
 const e=c.p.externalEvidence(c.p.catalog().find(t=>t.id==='osce:87'));
 assert.equal(e.attempts,2);assert.ok(e.due);
 assert.ok(c.p.schedule(a).rows.flatMap(x=>x.tasks).some(t=>t.id==='osce:87'&&t.kind==='review'));
 assert.deepEqual(JSON.parse(db.get('master_osce_pilot_v1')),osce);
 assert.deepEqual(JSON.parse(db.get('master_super_foco_v1:'+uid)),focus);
});
test('cada avaliação pode ser editada e outra criada sem apagar progresso anterior',()=>{
 const c=setup(),p=c.p,a=plan(c);
 p.register(a.id,'osce:87','good');
 p.openEditor(a.id);p.changeDraft('examDate',shift(28));p.savePlan();
 assert.equal(p.activePlan().examDate,shift(28));
 assert.equal(p.stats().events.length,1);
 plan(c,shift(32),['p2:gastro']);
 assert.equal(JSON.parse(c.db.get('master_study_planner_v1')).plans.length,2);
 assert.equal(p.stats().events.length,1);
});
test('dados pessoais são escapados e plano não altera módulos de estudo',()=>{
 const c=setup(),p=c.p;
 p.openEditor();p.changeDraft('title','Prova <img src=x onerror=alert(1)>');p.toggleTheme('osce:87',true);p.savePlan();
 const html=p.page();
 assert.doesNotMatch(html,/<img src=x onerror/);
 assert.match(html,/&lt;img/);
 const sources=['master_p2_lucas_v1','master_p1_lucas_v4','master_cir_lucas_v1','master_osce_pilot_v1'];
 for(const key of sources)assert.equal(c.db.has(key),false);
});
test('carregamento sincronizado recarrega apenas o planejador; troca de conta limpa estado em memória',()=>{
 const c=setup(),a=plan(c),previous=c.db.get('master_study_planner_v1');
 const state=JSON.parse(previous);state.settings.weeklyGoal=2;c.db.set('master_study_planner_v1',JSON.stringify(state));
 c.listeners['master-remote-merge'][0]({detail:{key:'master_study_planner_v1'}});
 assert.match(c.p.page(),/2 dias/);
 c.listeners['master-auth-ended'][0]();
 assert.equal(c.p.activePlan(),null);
 assert.equal(c.p.stats().xp,0);
});
test('CSS mobile e integração da home e rotas possuem os pontos de entrada esperados',()=>{
 const css=fs.readFileSync(path.join(ROOT,'master-planner.css'),'utf8');
 const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 const app=fs.readFileSync(path.join(ROOT,'app.js'),'utf8');
 const editorial=fs.readFileSync(path.join(ROOT,'editorial.js'),'utf8');
 const auth=fs.readFileSync(path.join(ROOT,'auth-config.js'),'utf8');
 assert.match(css,/\.mp-heat-grid/);assert.match(css,/@media\(max-width:430px\)/);
 assert.match(app,/case 'planner':/);assert.match(app,/dashboard','planner','today/);
 assert.match(editorial,/MasterPlanner\?\.homeCard/);
 assert.match(html,/master-planner\.js\?v=20261122-planner-v1/);
 assert.match(auth,/master_study_planner_v1/);
});
