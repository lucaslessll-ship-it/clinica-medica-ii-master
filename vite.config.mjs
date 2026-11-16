import {defineConfig} from 'vite';
import {transform} from 'esbuild';
import {cp,readFile,writeFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const app='MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';
const groups={ecg:['ecg-course.js'],hemo:['hemo-course.js'],atb:['atb-course.js'],rad:['rad-course.js']};
const deepFiles=[...(await readFile(app+'/index.html','utf8')).matchAll(/<script src="(lesson-deep-[^"?]+\.js)/g)].map(m=>m[1]);
for(const file of deepFiles){const route=file.startsWith('lesson-deep-cir-')?'cirtopic':file.startsWith('lesson-deep-p1-')?'p1topic':'topic';(groups[route]||=[]).push(file);}
export default defineConfig({
 build:{outDir:'dist',emptyOutDir:true,lib:{entry:'tooling/fsrs-entry.js',name:'MasterFSRS',formats:['iife'],fileName:()=>app+'/assets/vendor/fsrs-runtime.js'}},
 plugins:[{name:'legacy-study-site',async closeBundle(){
  await cp(app,'dist/'+app,{recursive:true});await cp('index.html','dist/index.html');
  execFileSync(process.execPath,['scripts/build-ai-index.cjs','dist/'+app+'/ai-index.json'],{stdio:'inherit'});
  await cp('node_modules/ts-fsrs/LICENSE','dist/'+app+'/assets/vendor/FSRS-LICENSE.txt');
  const digest=createHash('sha256');
  // Keep classic scripts in their original order and global scope.
  async function optimize(dir){for(const item of await readdir(dir)){const file=path.join(dir,item);if((await stat(file)).isDirectory())await optimize(file);else if(/\.(js|css)$/.test(file)&&!file.endsWith('fsrs-runtime.js')){const source=await readFile(file,'utf8');const result=await transform(source,{sourcefile:file,loader:file.endsWith('.css')?'css':'js',minifyWhitespace:true,minifySyntax:true,minifyIdentifiers:false,target:'es2022',legalComments:'eof'});digest.update(result.code);await writeFile(file,result.code);}}}
  await optimize('dist/'+app);
  digest.update(await readFile('dist/'+app+'/assets/vendor/fsrs-runtime.js'));const version=digest.digest('hex').slice(0,12);
  const htmlPath='dist/'+app+'/index.html';let html=await readFile(htmlPath,'utf8');
  for(const files of Object.values(groups))for(const file of files)html=html.replace(new RegExp('\\s*<script src="'+file.replaceAll('.','\\.')+'[^" ]*"><\\/script>'),'');
  // These courses are only needed after navigation; failure leaves a retry button.
  html=html.replace('<script src="data.js','<script src="route-assets.js"></script>\n  <script src="data.js');
  html=html.replace('<script src="study.js','<script src="assets/vendor/fsrs-runtime.js"></script>\n<script src="study.js');
  html=html.replace(/((?:src|href)="[^":?]+\.(?:js|css))(?:\?[^"]*)?"/g,'$1?v='+version+'"');
  await writeFile(htmlPath,html);
  const loader=`(()=>{const base=new URL('.',document.currentScript.src),groups=${JSON.stringify(groups)},loaded=new Set(),pending=new Map();window.RouteAssets={ready:route=>!groups[route]||loaded.has(route),ensure(route){if(!groups[route]||loaded.has(route))return Promise.resolve();if(pending.has(route))return pending.get(route);const promise=groups[route].reduce((p,file)=>p.then(()=>new Promise((resolve,reject)=>{const tag=document.createElement('script');tag.src=new URL(file+'?v=${version}',base);tag.onload=resolve;tag.onerror=()=>{tag.remove();reject(new Error('Não foi possível carregar a aula.'));};document.head.append(tag);})),Promise.resolve()).then(()=>loaded.add(route)).finally(()=>pending.delete(route));pending.set(route,promise);return promise;}};})();`;
  await writeFile('dist/'+app+'/route-assets.js',loader);
 }}]
});
