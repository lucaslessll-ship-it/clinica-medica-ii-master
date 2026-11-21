'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');
const files=['osce-pilot-data.js','osce-fa-data.js','osce-extra-07.js','osce-extra-24.js','osce-extra-04.js','osce-extra-20.js','osce-extra-46.js','osce-catalog-builder.js','osce-high-clinical.js','osce-high-heme-endo.js','osce-endo-medium-low.js','osce-reuma-medium-low.js','osce-hemo-medium-low.js','osce-other-medium-low.js','osce-curricular-additions.js','osce-pocus.js','osce-priority-index.js','osce-visual-notes.js','osce-pilot.js'];
function make(storage=new Map()){
 const window={addEventListener(){}},localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v))};
 const ctx=vm.createContext({window,localStorage,Date,console});
 for(const name of files)vm.runInContext(fs.readFileSync(path.join(ROOT,name),'utf8'),ctx,{filename:name});
 return {P:window.OSCEPilot,storage};
}
const getProgress=storage=>JSON.parse(storage.get('master_osce_pilot_v1'));
test('guia OSCE aparece no topo antes da sessão do dia, com método e orientação para IA',()=>{
 const {P}=make(),html=P.page();
 assert.match(html,/id="osce-welcome"/);
 assert.ok(html.indexOf('id="osce-welcome"')<html.indexOf('class="osce-pilot-hero"'));
 for(const word of ['recuperação ativa','confiança','D+1, D+3, D+7 ou D+21','Revisão por erros','Copiar para IA','Não mostrar novamente','Simular','Revisar respostas antes'])assert.ok(html.includes(word),word);
 assert.match(html,/id="osce-welcome-never"/);
 assert.doesNotMatch(html,/aria-modal="true"/);
});
test('fechar guia sem optar por ocultação vale só na sessão; na próxima abertura reaparece',()=>{
 const storage=new Map(),{P}=make(storage);
 P.closeWelcome();
 assert.doesNotMatch(P.page(),/id="osce-welcome"/);
 assert.match(P.page(),/Como estudar no OSCE/);
 assert.equal(getProgress(storage).settings.hideWelcome,false);
 assert.match(make(storage).P.page(),/id="osce-welcome"/);
});
test('Não mostrar novamente persiste; guia pode ser reaberto e reativado',()=>{
 const storage=new Map(),{P}=make(storage);
 P.welcomePreference(true);P.closeWelcome();
 assert.equal(getProgress(storage).settings.hideWelcome,true);
 const P2=make(storage).P;
 assert.doesNotMatch(P2.page(),/id="osce-welcome"/);
 assert.match(P2.page(),/Como estudar no OSCE/);
 P2.showWelcome();
 assert.match(P2.page(),/id="osce-welcome-never" checked/);
 P2.welcomePreference(false);P2.closeWelcome();
 assert.equal(getProgress(storage).settings.hideWelcome,false);
 assert.match(make(storage).P.page(),/id="osce-welcome"/);
});
test('a preferência não registra acertos nem altera notas ou o cronograma existente',()=>{
 const storage=new Map(),{P}=make(storage);
 P.start('essencial',null,61);P.answer('não sei');P.conf(1);P.reveal();P.finish();
 const prev=getProgress(storage),before=JSON.stringify(prev.items['61:sindrome'].attempts);
 P.home();P.showWelcome();P.welcomePreference(true);P.closeWelcome();
 const after=getProgress(storage);
 assert.equal(JSON.stringify(after.items['61:sindrome'].attempts),before);
 assert.equal(after.settings.hideWelcome,true);
 assert.equal(after.items['61:sindrome'].attempts.length,1);
});
test('script de revisão por falhas usa referências do tema real e reconhece erro com confiança alta',()=>{
 const {P}=make();
 P.start('essencial',null,87);P.answer('não sei');P.conf(3);P.reveal();P.finish();
 P.showPrompt();
 const html=P.page();
 assert.match(html,/ATENÇÃO: erro com confiança alta/);
 assert.match(html,/Fontes do tema para conferir/);
 assert.match(html,/POCUS/);
 assert.match(html,/pmc\.ncbi\.nlm\.nih\.gov/);
 assert.match(html,/Copiar para IA/);
 assert.doesNotMatch(html,/Use diretrizes atuais verificáveis \(SBC FA 2025/);
});
test('ao iniciar uma estação, o guia não reaparece quando voltar ao início durante a sessão',()=>{
 const {P}=make();
 P.start('essencial',null,52);P.home();
 assert.doesNotMatch(P.page(),/id="osce-welcome"/);
 assert.match(P.page(),/Como estudar no OSCE/);
});
