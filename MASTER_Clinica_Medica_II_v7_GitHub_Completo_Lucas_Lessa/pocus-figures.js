/* Curso POCUS: esquemas didáticos originais em SVG, com apontamentos numerados.
   São desenhos, não imagens reais de exame; nenhum material de terceiros foi copiado. */
const PocusFigures=(()=>{
'use strict';
let uid=0;
const W=640,H=380;
const screen='#05080a';
// Textura granular parecida com o speckle do modo B, recortada pela forma indicada.
function speckle(id,clip,opacity=.5){return `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="${uid}"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .9 .9 .9 0 -.75"/></filter><rect x="0" y="0" width="${W}" height="${H}" filter="url(#${id})" opacity="${opacity}" clip-path="url(#${clip})" style="mix-blend-mode:screen"/>`;}
function mark(n,x,y,lx,ly){return `<g class="pf-mark"><line x1="${lx}" y1="${ly}" x2="${x}" y2="${y}" stroke="#ffd166" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="3.2" fill="#ffd166"/><circle cx="${lx}" cy="${ly}" r="12" fill="#ffd166" stroke="#1b1b1b" stroke-width="1"/><text x="${lx}" y="${ly+4.5}" text-anchor="middle" font-size="13" font-weight="800" fill="#1b1b1b">${n}</text></g>`;}
function label(x,y,text,opts={}){const {size=13,fill='#e8f1f0',anchor='middle',weight=600}=opts;return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}">${text}</text>`;}
function wrap(title,body,notes,opts={}){
  const h=opts.h||H,light=opts.light;
  return `<figure class="pocus-fig${light?' light':''}"><svg viewBox="0 0 ${W} ${h}" role="img" aria-label="${title}" font-family="Inter,system-ui,sans-serif"><rect width="${W}" height="${h}" rx="14" fill="${light?'#f4f9f8':screen}"/>${body}</svg><figcaption><strong>${title}</strong>${notes&&notes.length?`<ol>${notes.map(n=>`<li>${n}</li>`).join('')}</ol>`:''}<small>Esquema didático original. Não é imagem real de exame e não substitui a visualização de exames supervisionados.</small></figcaption></figure>`;
}
// Setor de transdutor convexo/setorial: ápice no topo.
function sector(id,narrow){
  const path=narrow?'M286 18 L354 18 L606 296 Q320 372 34 296 Z':'M214 22 Q320 8 426 22 L612 296 Q320 372 28 296 Z';
  return {clip:`<clipPath id="${id}"><path d="${path}"/></clipPath>`,path};
}
function rectClip(id,x,y,w,h){return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/></clipPath>`;}

function ecogenicidade(){
  const cols=[['Anecoico','#000','Sem ecos: urina, bile, derrame simples'],['Hipoecoico','#3d4346','Menos ecos que o entorno'],['Isoecoico','#7b8387','Igual ao tecido de referência'],['Hiperecoico','#eef2f2','Mais ecos: pleura, diafragma, cálculo, osso']];
  const body=cols.map(([name,fill,desc],i)=>{const x=24+i*150;return `<rect x="${x}" y="40" width="138" height="150" rx="8" fill="#7b8387"/><circle cx="${x+69}" cy="115" r="46" fill="${fill}" stroke="#aab4b6" stroke-width="1"/>${label(x+69,222,name,{size:15,weight:800})}<foreignObject x="${x}" y="232" width="138" height="90"><div xmlns="http://www.w3.org/1999/xhtml" style="font:12px Inter,system-ui,sans-serif;color:#c9d6d6;text-align:center;line-height:1.4">${desc}</div></foreignObject>`}).join('');
  return wrap('Escala de ecogenicidade',body+label(320,352,'A ecogenicidade é sempre relativa: compare a estrutura com o tecido ao redor.',{size:12.5,fill:'#9fb3b3'}),[]);
}
function artefatos(){
  const id='af'+(++uid);
  const body=`<defs>${rectClip(id+'a',20,20,290,330)}${rectClip(id+'b',330,20,290,330)}</defs>
  <rect x="20" y="20" width="290" height="330" rx="4" fill="#5e676a"/><rect x="330" y="20" width="290" height="330" rx="4" fill="#5e676a"/>
  <path d="M428 190 L522 190 L534 350 L416 350 Z" fill="#b9c2c4" opacity=".75"/>
  ${speckle(id+'f',id+'a',.35)}${speckle(id+'g',id+'b',.35)}
  <path d="M124 156 Q165 130 206 156 L214 350 L116 350 Z" fill="#020303"/><path d="M120 150 Q165 118 210 150" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>
  <ellipse cx="475" cy="140" rx="52" ry="46" fill="#000"/>
  ${label(165,44,'Sombra acústica',{weight:800})}${label(475,44,'Reforço posterior',{weight:800})}
  ${mark(1,165,134,70,100)}${mark(2,165,270,70,290)}${mark(3,475,140,570,100)}${mark(4,475,280,570,300)}`;
  return wrap('Artefatos que ajudam o diagnóstico',body,['Superfície muito refletora (cálculo ou osso): linha hiperecoica curva.','Sombra acústica posterior: faixa anecoica atrás do refletor, porque quase nenhum som passa.','Coleção líquida simples: anecoica, de contorno regular.','Reforço acústico posterior: tecido atrás do líquido parece mais claro, pois o som foi pouco atenuado.']);
}
function transdutores(){
  const probe=(x,name,beam,freq,uso)=>`<g><rect x="${x+52}" y="30" width="56" height="70" rx="12" fill="#dfe9e7" stroke="#147e71" stroke-width="2"/>${beam}${label(x+80,262,name,{size:16,weight:800,fill:'#173238'})}${label(x+80,284,freq,{size:12.5,fill:'#0b6c66',weight:700})}<foreignObject x="${x-10}" y="292" width="180" height="80"><div xmlns="http://www.w3.org/1999/xhtml" style="font:12px Inter,system-ui,sans-serif;color:#41585c;text-align:center;line-height:1.4">${uso}</div></foreignObject></g>`;
  const lin=`<rect x="92" y="100" width="96" height="14" rx="3" fill="#147e71"/><path d="M92 114 H188 V232 H92 Z" fill="#147e71" opacity=".18" stroke="#147e71" stroke-dasharray="4 4"/>`;
  const con=`<path d="M258 114 Q320 92 382 114 L382 100 Q320 80 258 100 Z" fill="#147e71"/><path d="M258 114 Q320 92 382 114 L420 232 Q320 262 220 232 Z" fill="#147e71" opacity=".18" stroke="#147e71" stroke-dasharray="4 4"/>`;
  const set=`<rect x="508" y="100" width="24" height="12" rx="3" fill="#147e71"/><path d="M520 112 L600 228 Q520 262 440 228 Z" fill="#147e71" opacity=".18" stroke="#147e71" stroke-dasharray="4 4"/>`;
  const body=probe(60,'Linear',lin,'Alta frequência','Estruturas superficiais: vasos, pleura, partes moles, punções')+probe(240,'Convexo',con,'Baixa frequência','Abdome, FAST, bases pulmonares, pelve')+probe(440,'Setorial',set,'Baixa frequência','Coração e janelas entre costelas; feixe parte de um ponto');
  return wrap('Os três transdutores básicos',body,[],{light:true});
}
function movimentos(){
  const p=(x,name,extra,desc)=>`<g><rect x="${x+48}" y="70" width="44" height="86" rx="10" fill="#dfe9e7" stroke="#147e71" stroke-width="2"/><rect x="${x+48}" y="150" width="44" height="10" rx="3" fill="#147e71"/><line x1="${x+10}" y1="162" x2="${x+130}" y2="162" stroke="#8aa5a2" stroke-width="2"/>${extra}${label(x+70,212,name,{size:15,weight:800,fill:'#173238'})}<foreignObject x="${x-4}" y="222" width="148" height="110"><div xmlns="http://www.w3.org/1999/xhtml" style="font:12px Inter,system-ui,sans-serif;color:#41585c;text-align:center;line-height:1.4">${desc}</div></foreignObject></g>`;
  const arr=(d)=>`<path d="${d}" stroke="#e5484d" stroke-width="3" fill="none" stroke-linecap="round" marker-end="url(#pfarr)"/>`;
  const body=`<defs><marker id="pfarr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#e5484d"/></marker></defs>`
   +p(14,'Deslizar',arr('M104 112 H140')+arr('M50 112 H16'),'Muda o ponto de contato sobre a pele, sem mudar o ângulo')
   +p(170,'Bascular',arr('M264 62 Q284 54 300 70'),'Inclina o feixe para varrer a estrutura, com a face apoiada no mesmo ponto')
   +p(326,'Rodar',arr('M372 56 A30 12 0 1 1 430 56'),'Gira no próprio eixo: passa do eixo curto para o eixo longo')
   +p(482,'Comprimir',arr('M552 30 V62'),'Pressão gradual: desloca gás e testa se a veia colaba');
  return wrap('Movimentos da sonda',body,[],{light:true,h:340});
}
function pulmaoBase(id,extra){
  // Linear, longitudinal: pele no topo, duas costelas com sombra, linha pleural entre elas.
  return `<defs>${rectClip(id+'c',40,20,560,340)}</defs><rect x="40" y="20" width="560" height="340" rx="4" fill="#0b0f11"/>
  <rect x="40" y="20" width="560" height="78" fill="#4a5255" clip-path="url(#${id}c)"/><path d="M40 62 H600" stroke="#8b9597" stroke-width="2" opacity=".6"/>
  <rect x="150" y="128" width="340" height="232" fill="#1a2023"/>
  ${speckle(id+'f',id+'c',.3)}
  ${extra}
  <path d="M60 118 Q105 92 150 118" stroke="#f4f7f7" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M490 118 Q535 92 580 118" stroke="#f4f7f7" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M58 124 Q105 100 152 124 V360 H58 Z" fill="#010202"/><path d="M488 124 Q535 100 582 124 V360 H488 Z" fill="#010202"/>
  <path d="M152 130 H488" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`;
}
function pulmaoNormal(){
  const id='pn'+(++uid);
  const a=`<path d="M156 240 H484" stroke="#cfd8d9" stroke-width="3.5" opacity=".8"/><path d="M160 350 H480" stroke="#aeb9ba" stroke-width="3" opacity=".5"/>`;
  return wrap('Pulmão aerado normal: sinal do morcego e linhas A',pulmaoBase(id,a)+mark(1,105,106,105,46)+mark(2,105,250,30,290)+mark(3,300,130,300,60)+mark(4,400,240,560,210)+mark(5,220,350,30,340),
  ['Costela: arco hiperecoico superficial.','Sombra acústica da costela.','Linha pleural: linha hiperecoica entre as costelas, cerca de 0,5 cm abaixo delas. No exame real ela cintila com a respiração (deslizamento).','Linha A: repetição horizontal da linha pleural, a uma distância igual à que separa a pele da pleura.','Segunda linha A, com o mesmo espaçamento. Linhas A indicam ar abaixo da pleura; sozinhas não distinguem pulmão normal de pneumotórax.']);
}
function linhasB(){
  const id='lb'+(++uid);
  const b=[195,265,335,410,455].map(x=>`<path d="M${x-3} 132 L${x+3} 132 L${x+11} 360 L${x-11} 360 Z" fill="#eef3f3" opacity=".82"/>`).join('');
  return wrap('Linhas B: padrão intersticial',pulmaoBase(id,b)+mark(1,300,130,300,60)+mark(2,265,250,95,60)+mark(3,455,345,610,330),
  ['Linha pleural, de onde todas as linhas B partem.','Linha B: vertical, hiperecoica, tipo feixe de laser, que se move com o deslizamento e apaga as linhas A.','A linha B chega ao fim da tela sem perder intensidade. Três ou mais em um espaço intercostal definem região positiva.']);
}
function modoM(){
  const id='mm'+(++uid);
  const lines=(x)=>[40,58,74,92,106].map(y=>`<path d="M${x} ${y} h270" stroke="#c9d2d3" stroke-width="${y%4?2:3}" opacity=".8"/>`).join('');
  const body=`<defs>${rectClip(id+'a',30,30,270,310)}${rectClip(id+'b',340,30,270,310)}</defs>
  <rect x="30" y="30" width="270" height="310" fill="#0b0f11"/><rect x="340" y="30" width="270" height="310" fill="#0b0f11"/>
  ${lines(30)}${lines(340)}<path d="M30 124 h270" stroke="#fff" stroke-width="4"/><path d="M340 124 h270" stroke="#fff" stroke-width="4"/>
  <rect x="30" y="128" width="270" height="212" fill="#59626480"/>${speckle(id+'f',id+'a',.6)}<rect x="30" y="30" width="270" height="94" fill="#0b0f11"/>${lines(30)}<path d="M30 124 h270" stroke="#fff" stroke-width="4"/>
  ${[150,172,190,214,236,262,284,306,326].map(y=>`<path d="M340 ${y} h270" stroke="#c9d2d3" stroke-width="${y%3?2:3.5}" opacity=".75"/>`).join('')}
  ${label(165,22,'Praia: deslizamento presente',{weight:800})}${label(475,22,'Código de barras: sem deslizamento',{weight:800})}
  ${mark(1,90,74,60,362)}${mark(2,165,124,165,362)}${mark(3,240,230,270,362)}${mark(4,475,236,475,362)}`;
  return wrap('Modo M no pulmão',body,['Parede torácica imóvel: linhas horizontais ("mar").','Linha pleural.','Abaixo da pleura, o movimento do pulmão gera padrão granulado ("areia"). Mar e areia juntos formam o sinal da praia.','Sem deslizamento, tudo abaixo da pleura também vira linhas horizontais: sinal do código de barras ou da estratosfera. Indica ausência de deslizamento, não pneumotórax por si só.'],{h:384});
}
function derramePleural(){
  const id='dp'+(++uid),s=sector(id+'s');
  const body=`<defs>${s.clip}</defs><g clip-path="url(#${id}s)"><path d="${s.path}" fill="#0b0f11"/>
  <path d="M300 10 H620 V300 H372 Q360 170 300 60 Z" fill="#6a7376"/>
  <path d="M120 150 L236 190 L150 244 Z" fill="#8d9698"/>
  ${speckle(id+'f',id+'s',.3)}
  <path d="M20 10 H300 V60 Q360 170 372 300 H20 Z" fill="#000"/>
  <path d="M120 150 L236 190 L150 244 Z" fill="#8d9698"/>
  <path d="M300 14 Q362 160 372 300" stroke="#fff" stroke-width="6" fill="none"/>
  <path d="M30 296 Q320 276 612 296 V380 H30 Z" fill="#010202"/><path d="M40 294 Q320 274 604 294" stroke="#f1f5f5" stroke-width="7" fill="none" stroke-dasharray="52 12"/>
  </g>
  ${mark(1,480,170,600,70)}${mark(2,352,150,400,36)}${mark(3,190,100,60,50)}${mark(4,170,196,36,180)}${mark(5,200,286,60,350)}${label(120,372,'cranial',{size:11,fill:'#9fb3b3'})}${label(520,372,'caudal',{size:11,fill:'#9fb3b3'})}`;
  return wrap('Derrame pleural na base direita',body,['Fígado: tecido de ecotextura homogênea, abaixo do diafragma.','Diafragma: linha curva hiperecoica.','Derrame pleural: área anecoica acima do diafragma.','Pulmão atelectasiado flutuando no líquido.','Sinal da coluna: os corpos vertebrais continuam visíveis acima do diafragma, porque o líquido conduz o som. No pulmão aerado normal a coluna some nesse ponto.']);
}
function morrison(){
  const id='mo'+(++uid);
  const panel=(x,pos)=>`<g><rect x="${x}" y="34" width="280" height="300" fill="#0b0f11"/><path d="M${x} 34 H${x+280} V150 Q${x+170} 120 ${x+60} 210 L${x} 240 Z" fill="#6a7376"/>
  
  <ellipse cx="${x+170}" cy="${pos?258:240}" rx="98" ry="52" transform="rotate(-24 ${x+170} ${pos?258:240})" fill="#474f52"/><ellipse cx="${x+170}" cy="${pos?258:240}" rx="52" ry="18" transform="rotate(-24 ${x+170} ${pos?258:240})" fill="#dfe6e6"/></g>`;
  const body=`<defs>${rectClip(id+'a',30,34,280,300)}${rectClip(id+'b',330,34,280,300)}</defs>${panel(30,false)}${panel(330,true)}${speckle(id+'f',id+'a',.3)}${speckle(id+'g',id+'b',.3)}
  <path d="M310 152 Q200 122 90 212 L30 242" stroke="#eef3f3" stroke-width="3" fill="none"/><path d="M610 150 Q500 120 390 210 L330 240 L330 264 L400 234 Q505 150 610 178 Z" fill="#000"/>
  ${label(170,24,'Normal',{weight:800})}${label(470,24,'Líquido livre',{weight:800})}
  ${mark(1,110,90,60,358)}${mark(2,200,240,170,358)}${mark(3,150,166,280,358)}${mark(4,470,166,470,358)}${mark(5,350,250,580,358)}`;
  return wrap('Recesso hepatorrenal (espaço de Morrison)',body,['Fígado.','Rim direito: córtex hipoecoico e seio renal central hiperecoico.','Interface normal: fígado e rim separados apenas por uma linha fina hiperecoica.','Líquido livre: faixa anecoica entre fígado e rim.','Varra até a ponta caudal do fígado e a goteira paracólica: é a região do quadrante superior direito onde o líquido aparece com mais frequência.'],{h:384});
}
function janelasFast(){
  const dot=(n,x,y,c='#0b6c66')=>`<circle cx="${x}" cy="${y}" r="15" fill="${c}"/><text x="${x}" y="${y+5}" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">${n}</text>`;
  const body=`<circle cx="200" cy="52" r="30" fill="#e3ecea" stroke="#8aa5a2" stroke-width="2"/><path d="M130 100 Q200 82 270 100 L282 300 Q200 330 118 300 Z" fill="#e3ecea" stroke="#8aa5a2" stroke-width="2"/><path d="M130 104 L84 230 M270 104 L316 230" stroke="#8aa5a2" stroke-width="16" stroke-linecap="round"/><path d="M150 176 Q200 196 250 176" stroke="#8aa5a2" stroke-width="2" fill="none" stroke-dasharray="5 5"/>
  ${dot(1,140,206)}${dot(2,264,196)}${dot(3,200,292)}${dot(4,200,182)}${dot(5,166,128,'#b3312f')}${dot(6,234,128,'#b3312f')}
  <g font-size="13" fill="#173238">${[['1','Quadrante superior direito: hepatorrenal, subfrênico e ponta do fígado'],['2','Quadrante superior esquerdo: subfrênico e esplenorrenal'],['3','Pelve: atrás da bexiga, em dois planos'],['4','Subxifoide: pericárdio'],['5 e 6','E-FAST: tórax anterior bilateral, deslizamento pleural']].map(([n,t],i)=>`<text x="350" y="${70+i*52}" font-weight="800" fill="${i===4?'#b3312f':'#0b6c66'}">${n}</text><foreignObject x="350" y="${76+i*52}" width="270" height="44"><div xmlns="http://www.w3.org/1999/xhtml" style="font:12.5px Inter,system-ui,sans-serif;color:#41585c;line-height:1.35">${t}</div></foreignObject>`).join('')}</g>
  ${label(110,352,'direita do paciente',{size:11,fill:'#6c8589'})}${label(292,352,'esquerda',{size:11,fill:'#6c8589'})}`;
  return wrap('Janelas do FAST e do E-FAST',body,[],{light:true});
}
function subxifoide(){
  const id='sx'+(++uid),s=sector(id+'s',true);
  const body=`<defs>${s.clip}</defs><g clip-path="url(#${id}s)"><path d="${s.path}" fill="#0b0f11"/>
  <path d="M100 10 H540 L620 150 Q320 96 20 176 Z" fill="#6a7376"/>
  ${speckle(id+'f',id+'s',.3)}
  <ellipse cx="330" cy="238" rx="198" ry="98" transform="rotate(8 330 238)" fill="#000" stroke="#f3f6f6" stroke-width="4"/>
  <ellipse cx="330" cy="240" rx="170" ry="74" transform="rotate(8 330 240)" fill="#7a8386"/>
  <path d="M190 206 Q260 176 322 200 L318 236 Q250 228 196 244 Z" fill="#050708"/>
  <path d="M184 262 Q260 244 322 256 L326 296 Q250 312 196 296 Z" fill="#050708"/>
  <path d="M344 202 Q420 196 478 226 L470 250 Q410 240 344 240 Z" fill="#050708"/>
  <path d="M346 260 Q420 258 474 270 Q450 300 350 300 Z" fill="#050708"/>
  </g>
  ${mark(1,320,80,560,50)}${mark(2,300,152,80,70)}${mark(3,256,214,60,240)}${mark(4,256,278,90,340)}${mark(5,410,222,590,230)}${mark(6,410,280,560,330)}`;
  return wrap('Janela subxifoide com derrame pericárdico',body,['Fígado: serve de janela acústica, no campo próximo.','Derrame pericárdico: faixa anecoica entre o pericárdio (linha hiperecoica) e o miocárdio, circundando o coração.','Ventrículo direito: é a câmara mais próxima do fígado nesta janela.','Ventrículo esquerdo.','Átrio direito.','Átrio esquerdo.']);
}
function paraesternal(){
  const id='pl'+(++uid),s=sector(id+'s',true);
  const body=`<defs>${s.clip}</defs><g clip-path="url(#${id}s)"><path d="${s.path}" fill="#0b0f11"/>
  <path d="M150 40 H500 V62 H150 Z" fill="#7a8386"/><path d="M120 122 Q300 96 420 128 L420 150 Q300 122 120 150 Z" fill="#8a9396"/>
  <path d="M110 252 Q290 272 430 248 L436 276 Q290 300 110 280 Z" fill="#8a9396"/><path d="M40 284 Q300 306 620 270 V380 H40 Z" fill="#4a5255"/>
  ${speckle(id+'f',id+'s',.3)}
  <path d="M180 62 H470 V120 Q330 96 180 120 Z" fill="#050708"/>
  <path d="M110 152 Q290 126 404 152 L404 246 Q280 270 110 250 Z" fill="#030405"/>
  <path d="M420 130 Q470 124 540 136 L540 176 Q470 170 420 178 Z" fill="#030405" stroke="#dfe6e6" stroke-width="3"/>
  <path d="M410 190 Q480 180 548 200 Q556 250 470 262 Q420 262 408 246 Z" fill="#030405"/>
  <path d="M404 186 L356 206 M408 246 L360 226" stroke="#f1f5f5" stroke-width="4" stroke-linecap="round"/>
  <circle cx="470" cy="300" r="20" fill="#030405" stroke="#dfe6e6" stroke-width="3"/>
  </g>
  ${mark(1,320,86,320,20)}${mark(2,250,128,70,100)}${mark(3,250,200,50,200)}${mark(4,378,214,300,340)}${mark(5,480,226,600,230)}${mark(6,480,154,600,130)}${mark(7,470,300,560,346)}${mark(8,250,268,90,330)}`;
  return wrap('Paraesternal eixo longo',body,['Ventrículo direito (via de saída), no campo próximo.','Septo interventricular.','Cavidade do ventrículo esquerdo.','Valva mitral: folhetos anterior e posterior.','Átrio esquerdo.','Raiz da aorta e valva aórtica.','Aorta torácica descendente, em corte transversal, atrás do átrio esquerdo. Líquido que passa na frente dela é pericárdico; líquido atrás dela é pleural.','Parede posterior do ventrículo esquerdo.']);
}
function veiaCava(){
  const id='vc'+(++uid),s=sector(id+'s');
  const body=`<defs>${s.clip}</defs><g clip-path="url(#${id}s)"><path d="${s.path}" fill="#6a7376"/>${speckle(id+'f',id+'s',.3)}
  <path d="M40 150 Q120 120 190 170 Q200 250 120 300 Q60 300 40 260 Z" fill="#030405"/>
  <path d="M180 190 Q330 176 600 196 L600 244 Q330 232 186 240 Z" fill="#000" stroke="#cfd8d9" stroke-width="2"/>
  <path d="M290 186 Q330 130 420 96 L436 112 Q360 150 322 190 Z" fill="#000"/>
  <path d="M40 300 Q320 290 600 320 V380 H40 Z" fill="#0b0f11"/>
  </g>
  <path d="M370 188 V238" stroke="#ffd166" stroke-width="2.5"/><path d="M362 188 h16 M362 238 h16" stroke="#ffd166" stroke-width="2.5"/>
  ${mark(1,110,220,50,90)}${mark(2,480,218,600,150)}${mark(3,372,128,470,50)}${mark(4,370,213,300,352)}${mark(5,430,120,600,300)}`;
  return wrap('Veia cava inferior em eixo longo (subcostal)',body,['Átrio direito, onde a veia cava desemboca.','Veia cava inferior: estrutura tubular anecoica, de parede fina, que atravessa o fígado.','Veia hepática chegando à veia cava.','Local da medida: logo caudal à entrada das veias hepáticas, a cerca de 0,5 a 3 cm do átrio direito, perpendicular ao eixo do vaso.','Fígado.']);
}
function vascularCurto(){
  const id='vs'+(++uid);
  const panel=(x,comp)=>`<g><rect x="${x}" y="34" width="280" height="290" fill="#3c4447"/><path d="M${x} 70 Q${x+140} 96 ${x+280} 66 V110 Q${x+140} 142 ${x} 112 Z" fill="#596265"/></g>`;
  const lumen=(x,comp)=>`<ellipse cx="${x+178}" cy="${comp?188:180}" rx="${comp?56:50}" ry="${comp?5:36}" fill="#000" stroke="#aab4b6" stroke-width="1.5"/><circle cx="${x+98}" cy="216" r="30" fill="#000" stroke="#f1f5f5" stroke-width="5"/>`;
  const body=`<defs>${rectClip(id+'a',30,34,280,290)}${rectClip(id+'b',330,34,280,290)}</defs>${panel(30,false)}${panel(330,true)}${speckle(id+'f',id+'a',.28)}${speckle(id+'g',id+'b',.28)}${lumen(30,false)}${lumen(330,true)}
  ${label(170,24,'Sem compressão',{weight:800})}${label(470,24,'Com compressão leve',{weight:800})}
  ${mark(1,208,180,270,348)}${mark(2,128,216,70,348)}${mark(3,170,98,170,348)}${mark(4,508,188,560,348)}${mark(5,428,216,380,348)}`;
  return wrap('Jugular interna e carótida em eixo curto',body,['Veia jugular interna: oval, parede fina, em geral anterolateral à artéria. Aumenta com Valsalva.','Artéria carótida: redonda, parede espessa e pulsátil.','Músculo esternocleidomastoideo, superficial aos vasos.','A veia colaba por completo com pressão leve. Veia que não colaba levanta suspeita de trombo: não puncione ali.','A artéria mantém o formato com a mesma pressão.'],{h:374});
}
function agulha(){
  const id='ag'+(++uid);
  const body=`<defs>${rectClip(id+'a',30,34,280,290)}${rectClip(id+'b',330,34,280,290)}</defs>
  <rect x="30" y="34" width="280" height="290" fill="#3c4447"/><rect x="330" y="34" width="280" height="290" fill="#3c4447"/>
  ${speckle(id+'f',id+'a',.28)}${speckle(id+'g',id+'b',.28)}
  <path d="M30 170 H310 V236 H30 Z" fill="#000" stroke="#aab4b6" stroke-width="1.5"/>
  <path d="M52 44 L214 204" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
  <path d="M466 204 L462 300 L478 300 L474 204 Z" fill="#000" opacity=".5"/><ellipse cx="470" cy="200" rx="52" ry="38" fill="#000" stroke="#aab4b6" stroke-width="1.5"/><circle cx="470" cy="196" r="5" fill="#fff"/>
  ${label(170,24,'Em plano (eixo longo)',{weight:800})}${label(470,24,'Fora de plano (eixo curto)',{weight:800})}
  ${mark(1,120,112,60,348)}${mark(2,214,204,180,348)}${mark(3,270,214,280,348)}${mark(4,470,196,440,348)}${mark(5,520,200,570,348)}`;
  return wrap('Visualização da agulha',body,['Em plano: toda a haste aparece como linha hiperecoica.','Ponta da agulha dentro da luz do vaso. Só avance vendo a ponta.','Veia em eixo longo.','Fora de plano: a agulha aparece só como um ponto hiperecoico. Esse ponto pode ser a haste, e não a ponta; por isso desloque a sonda acompanhando a ponta à medida que ela avança.','Veia em eixo curto.'],{h:374});
}
const all={ecogenicidade,artefatos,transdutores,movimentos,pulmaoNormal,linhasB,modoM,derramePleural,morrison,janelasFast,subxifoide,paraesternal,veiaCava,vascularCurto,agulha};
return {render:name=>all[name]?all[name]():'',names:Object.keys(all)};
})();
window.PocusFigures=PocusFigures;
