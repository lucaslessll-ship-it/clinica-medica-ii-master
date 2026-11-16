/* Estudo aprofundado · Cirurgia · Exames laboratoriais no paciente cirúrgico. Texto original; referências ao final de cada aula. */
LessonDeep.add({
'cirpanc_4':{
 updated:'2026-11',
 pretest:['Qual enzima é mais específica para pancreatite e por quanto tempo ela fica alta?','Quais são os cinco critérios de Ranson na admissão?','O que o BISAP mede e qual pontuação indica maior risco?','Como distinguir colestase de lesão hepatocelular pelos exames?','O que significa vesícula palpável e indolor com icterícia?','Quando a bilirrubina e o colédoco dilatado mudam a conduta na suspeita de coledocolitíase?'],
 sections:[
  {h:'Enzimas pancreáticas: o que elas dizem e o que não dizem',p:[
   'Lipase e amilase confirmam o diagnóstico quando passam de 3 vezes o limite superior da normalidade. A lipase é mais específica, sobe em 4 a 8 horas, chega ao pico em cerca de 24 horas e demora 8 a 14 dias para normalizar. A amilase sobe mais cedo, volta ao normal em 3 a 5 dias e pode estar alta sem pancreatite (parotidite, perfuração de víscera oca, isquemia mesentérica, macroamilasemia).',
   'O valor da enzima não mede gravidade e a queda dela não autoriza alta nem realimentação por si só. Quem gradua é a falência orgânica (Atlanta revisado) e os escores clínicos. Exame com enzima normal e dor típica tardia pode ocorrer na pancreatite por hipertrigliceridemia ou em chegada tardia.'],
   table:{head:['Exame','Como usar'],rows:[
    ['Lipase','Diagnóstico; mais específica que a amilase'],
    ['ALT acima de 150 U/L (cerca de 3 vezes)','Sugere etiologia biliar; reforça a ultrassonografia de vesícula'],
    ['Triglicerídeos acima de 1.000 mg/dL','Causa da pancreatite; tratar a hipertrigliceridemia'],
    ['Cálcio baixo','Marcador de gravidade (aparece no Ranson de 48 horas)'],
    ['Ureia e hematócrito','Hemoconcentração e ureia crescente indicam perda de volume e pior evolução'],
    ['PCR acima de 150 mg/L após 48 horas','Preditor de necrose e de forma grave']]}},
  {h:'Escores de gravidade: Ranson, BISAP e quando usar',p:[
   'Os critérios de Ranson foram criados para pancreatite alcoólica e têm duas partes: admissão e 48 horas. Três ou mais pontos indicam maior risco, sem substituir a classificação de Atlanta. A limitação é prática: o escore só fica completo em 48 horas. O BISAP usa dados da admissão e é mais rápido.'],
   table:{head:['Ranson (não biliar)','Critério'],rows:[
    ['Admissão','Idade acima de 55 anos, leucócitos acima de 16.000/mm3, glicose acima de 200 mg/dL, LDH acima de 350 U/L, AST acima de 250 U/L'],
    ['48 horas','Queda do hematócrito acima de 10 pontos, aumento do nitrogênio ureico (BUN) acima de 5 mg/dL, cálcio abaixo de 8 mg/dL, PaO2 abaixo de 60 mmHg, déficit de base acima de 4 mEq/L, sequestro de líquido acima de 6 L'],
    ['Biliar (valores diferentes)','Admissão: idade acima de 70, leucócitos acima de 18.000, glicose acima de 220, LDH acima de 400, AST acima de 250. Em 48 horas a PaO2 não entra e o corte do BUN cai para 2 mg/dL; os cortes de déficit de base e de sequestro de líquido variam entre as fontes, então confira o da sua apostila']]},
   after:'Armadilha de prova: na P2 de Cirurgia (Med 60) a questão que pedia o critério de Ranson que NÃO está na admissão foi anulada, porque as quatro alternativas (idade, leucócitos, glicose, LDH) pertencem à admissão. Memorize as duas listas separadas.'},
  {h:'BISAP e Atlanta lado a lado',table:{head:['Escore','Itens','Leitura'],rows:[
   ['BISAP (1 ponto cada)','BUN acima de 25 mg/dL (nitrogênio ureico; corresponde a ureia perto de 54 mg/dL), alteração do estado mental, SIRS, idade acima de 60 anos, derrame pleural','3 ou mais: risco maior de falência orgânica e de morte'],
   ['Atlanta revisado','Falência orgânica transitória (até 48 horas) ou persistente (mais de 48 horas)','Persistente define grave'],
   ['Marshall modificado','Sistemas respiratório, renal e cardiovascular','2 pontos ou mais num sistema: falência']]},
   after:'Os escores orientam vigilância e nível de cuidado. Eles não substituem o exame clínico seriado, a diurese e a perfusão.'},
  {h:'Icterícia: padrão dos exames e imagem',p:[
   'Primeiro separe bilirrubina indireta (hemólise, Gilbert) de direta. Na direta, o padrão enzimático orienta: colestase eleva fosfatase alcalina e GGT de forma desproporcional, enquanto lesão hepatocelular eleva ALT e AST. A ultrassonografia é o primeiro exame: vias biliares dilatadas indicam obstrução e pedem a causa.',
   'Dor, febre e icterícia sugerem coledocolitíase com colangite e a conduta segue os critérios de Tóquio 2018, já estudados em Vias biliares. Icterícia progressiva, indolor, com vesícula palpável (sinal de Courvoisier) sugere neoplasia periampular e leva à tomografia ou ressonância com protocolo pancreático. O CA 19-9 acompanha a doença, não a diagnostica, e sobe também na obstrução biliar benigna.'],
   table:{head:['Cenário','Exame seguinte'],rows:[
    ['Colestase com dilatação na ultrassonografia','Colangiorressonância ou ultrassom endoscópico para achar a causa'],
    ['Alta probabilidade de coledocolitíase (cálculo visto ou colangite, ou bilirrubina acima de 4 com colédoco dilatado)','CPRE com tratamento, sem exame diagnóstico antes'],
    ['Probabilidade intermediária','Colangiorressonância ou ultrassom endoscópico antes de CPRE'],
    ['Icterícia indolor e vesícula palpável','Tomografia com protocolo pancreático e avaliação de ressecabilidade'],
    ['Icterícia pós-operatória precoce','Pensar em lesão de via biliar ou cálculo residual; colangiorressonância']]}}
 ],
 flow:{title:'Icterícia colestática no pronto-socorro',nodes:[
  {k:'start',t:'Icterícia com bilirrubina direta elevada'},
  {k:'do',t:'Fosfatase alcalina, GGT, ALT, AST, hemograma, PCR e ultrassonografia'},
  {k:'ask',t:'Vias biliares dilatadas?',yes:'Obstrução: procurar a causa',no:'Pensar em causa hepatocelular ou intra-hepática'},
  {k:'ask',t:'Febre, calafrios e hipotensão ou confusão?',yes:'Colangite grave: antibiótico e drenagem biliar urgente',no:'Seguir investigação com a imagem adequada'},
  {k:'do',t:'Probabilidade intermediária de coledocolitíase: colangiorressonância ou ultrassom endoscópico antes da CPRE'},
  {k:'end',t:'Cálculo: CPRE e colecistectomia. Massa: estadiar antes de drenar, salvo colangite'}]},
 reasoning:[
  'Enzima alta confirma pancreatite, falência orgânica gradua.',
  'Ranson exige 48 horas e foi criado para forma alcoólica; BISAP é mais prático na admissão.',
  'Padrão colestático mais dilatação de vias biliares é obstrução até prova em contrário.',
  'Colangite é diagnóstico clínico e laboratorial; a drenagem não espera exame de imagem demorado.'],
 mnemonics:[
  {n:'Ranson na admissão',t:'Idade 55, leucócitos 16 mil, glicose 200, LDH 350, AST 250.'},
  {n:'BISAP',t:'BUN, estado mental, SIRS, idade, pleural: 1 ponto cada.'},
  {n:'Courvoisier',t:'Vesícula palpável e indolor com icterícia: pensar em tumor, não em cálculo.'}],
 pitfalls:[
  'Usar o valor da lipase como medida de gravidade.',
  'Misturar os cortes de Ranson para forma biliar e não biliar.',
  'Pedir CPRE diagnóstica quando a colangiorressonância resolve.',
  'Interpretar CA 19-9 alto em paciente ictérico como diagnóstico de câncer.',
  'Tratar icterícia colestática febril como hepatite sem imagem das vias biliares.'],
 recall:[
  {q:'Qual enzima é mais específica para pancreatite?',a:'A lipase.'},
  {q:'Cinco critérios de Ranson na admissão (não biliar)?',a:'Idade acima de 55, leucócitos acima de 16.000, glicose acima de 200, LDH acima de 350, AST acima de 250.'},
  {q:'Quantos pontos de Ranson indicam pancreatite grave?',a:'Três ou mais.'},
  {q:'O que significa sinal de Courvoisier?',a:'Vesícula palpável e indolor com icterícia, sugerindo neoplasia periampular.'},
  {q:'Qual padrão enzimático indica colestase?',a:'Fosfatase alcalina e GGT desproporcionalmente altas.'},
  {q:'Qual escore da pancreatite usa só dados da admissão?',a:'O BISAP.'},
  {q:'Quando a PCR passa a indicar pior evolução na pancreatite?',a:'Acima de 150 mg/L depois de 48 horas.'},
  {q:'Qual o primeiro exame de imagem na icterícia colestática?',a:'Ultrassonografia das vias biliares.'}
 ],
 cases:[
  {title:'Dor em faixa, ALT alta e vesícula com cálculos',data:[
    'Mulher de 48 anos com dor epigástrica em faixa há 10 horas, vômitos, lipase 6 vezes o normal, ALT 310 e cálculos na ultrassonografia. Sem febre, bilirrubina 1,8.',
    'No dia seguinte mantém-se estável, sem falência orgânica.'],
   reasoning:[
    'Dois critérios fecham o diagnóstico; ALT acima de 150 reforça a causa biliar.',
    'O caso não descreve evidências suficientes de colangite ou obstrução persistente; CPRE não é rotina apenas pela ALT elevada.',
    'Ranson completo só viria em 48 horas; a evolução clínica e a falência orgânica guiam o nível de cuidado.'],
   conduct:[
    'Hidratação moderada guiada por metas, analgesia e dieta oral precoce conforme tolerância.',
    'Colecistectomia na mesma internação se confirmada forma leve.',
    'Reavaliar se surgir febre, icterícia crescente ou falência de órgão.'],
   error:'Pedir CPRE ou tomografia no primeiro dia só porque a ALT está alta.'},
  {title:'Icterícia progressiva sem dor',data:[
    'Homem de 68 anos com icterícia progressiva há 3 semanas, prurido, perda de peso, sem dor e sem febre. Vesícula palpável. Fosfatase alcalina e GGT muito elevadas.',
    'A ultrassonografia mostra dilatação de vias biliares intra e extra-hepáticas e vesícula distendida.'],
   reasoning:[
    'Colestase com dilatação indica obstrução; vesícula palpável e indolor sugere causa neoplásica distal.',
    'A tomografia com protocolo pancreático define ressecabilidade e deve preceder a drenagem quando não há colangite.'],
   conduct:[
    'Tomografia com protocolo pancreático e dosar CA 19-9 como linha de base.',
    'Discutir em equipe cirúrgica antes de colocar prótese biliar, salvo colangite.'],
   error:'Atribuir o quadro a cálculo e indicar CPRE direta sem imagem prévia do pâncreas.'}
 ],
 practice:['Calcule Ranson de admissão de um paciente de 60 anos, leucócitos 17 mil, glicose 150, LDH 400, AST 100.','Explique por que o CA 19-9 não confirma câncer em paciente ictérico.'],
 refs:[
  {t:'Ranson JH, et al. Prognostic signs and the role of operative management in acute pancreatitis. Surg Gynecol Obstet. 1974.',q:'Ranson prognostic signs role of operative management in acute pancreatitis 1974'},
  {t:'Wu BU, et al. The early prediction of mortality in acute pancreatitis: a large population-based study (BISAP). Gut. 2008.',q:'Wu BISAP early prediction of mortality in acute pancreatitis Gut 2008'},
  {t:'Banks PA, et al. Classification of acute pancreatitis 2012: revision of the Atlanta classification. Gut. 2013.',q:'Classification of acute pancreatitis 2012 revision of the Atlanta classification Banks Gut'},
  {t:'Buxbaum JL, et al. ASGE guideline on the role of endoscopy in the evaluation and management of choledocholithiasis. Gastrointest Endosc. 2019.',q:'ASGE guideline role of endoscopy evaluation management choledocholithiasis 2019'},
  {t:'Kiriyama S, et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholangitis. J Hepatobiliary Pancreat Sci. 2018.',q:'Tokyo Guidelines 2018 diagnostic criteria severity grading acute cholangitis'}],
 note:'Cortes do Ranson não biliar e do BISAP conferidos em 16/11/2026 (StatPearls, WikEM). BUN é nitrogênio ureico: ureia em mg/dL é cerca de 2,14 vezes maior. Cortes do Ranson biliar divergem entre fontes.',
 exam:[
  {c:'Critério de Ranson que NÃO está na admissão.',p:'Escolher uma alternativa entre idade, leucócitos, glicose e LDH.',r:'Todas pertencem à admissão (não biliar). Hematócrito, ureia, cálcio, PaO2, déficit de base e sequestro de líquido são os de 48 horas.'},
  {c:'Gravidade da pancreatite e valor da lipase.',p:'Lipase muito alta indica forma grave.',r:'A enzima não mede gravidade; a falência orgânica persistente define.'},
  {c:'Icterícia, vesícula palpável e indolor.',p:'Colecistite aguda litiásica.',r:'Courvoisier: neoplasia periampular até prova em contrário.'},
  {c:'Colestase com fosfatase alcalina e GGT altas.',p:'Hepatite viral aguda.',r:'Padrão colestático: pedir ultrassonografia de vias biliares.'}]
},
'cirremit_4':{
 updated:'2026-11',
 pretest:['Que distúrbio ácido-básico acompanha vômitos prolongados por estenose pilórica?','Como calcular o ânion gap e qual o valor normal?','Qual a primeira medida diante de hipercalemia com alteração no ECG?','Por que a velocidade de correção da hiponatremia importa?','Qual distúrbio causa fístula de delgado ou ileostomia de alto débito?','Quais sinais indicam hipocalcemia após tireoidectomia?'],
 sections:[
  {h:'Ler a gasometria em quatro passos',p:[
   'Passo 1, o pH: acidemia abaixo de 7,35 e alcalemia acima de 7,45. Passo 2, o processo primário: queda do bicarbonato com pH baixo é acidose metabólica; PaCO2 alta com pH baixo é acidose respiratória; bicarbonato alto com pH alto é alcalose metabólica. Passo 3, a compensação: na acidose metabólica a PaCO2 esperada pela fórmula de Winter é 1,5 vezes o bicarbonato mais 8, com variação de 2. Passo 4, o ânion gap: sódio menos a soma de cloro e bicarbonato, normal em torno de 8 a 12.',
   'Ânion gap aumentado aponta para ácidos não medidos (lactato, cetoácidos, uremia, intoxicações). Gap normal com acidose é perda de bicarbonato ou excesso de cloro.'],
   table:{head:['Situação cirúrgica','Distúrbio típico'],rows:[
    ['Vômitos e aspiração por sonda gástrica, estenose pilórica','Alcalose metabólica hipoclorêmica e hipocalêmica'],
    ['Diarreia, fístula de delgado ou pancreática, ileostomia de alto débito','Acidose metabólica hiperclorêmica (gap normal)'],
    ['Isquemia mesentérica, choque, sepse','Acidose com gap aumentado por lactato'],
    ['Excesso de soro fisiológico 0,9%','Acidose hiperclorêmica dilucional'],
    ['Pós-operatório com dor, opioide e hipoventilação','Acidose respiratória']]},
   after:'Lactato normal não exclui isquemia mesentérica inicial. Se a clínica é de dor desproporcional ao exame, a conduta não espera o lactato subir.'},
  {h:'Potássio e sódio no paciente cirúrgico',p:[
   'Hipocalemia vem de vômitos, diarreia, diuréticos e insulina. Causa arritmia e íleo adinâmico. A reposição de KCl é de cerca de 10 mEq/hora por veia periférica e até 20 mEq/hora em acesso central com monitorização, sempre conferindo a função renal. Hipocalemia refratária pensa em hipomagnesemia.',
   'Hipercalemia surge em lesão renal, esmagamento, grande queimadura, rabdomiólise e transfusão maciça. Com alteração no ECG (onda T apiculada, alargamento do QRS) a primeira medida é gluconato de cálcio, que protege a membrana e não baixa o potássio. Depois entram insulina com glicose, beta-agonista inalatório e medidas para eliminar (diurético, resina ou diálise).',
   'Hiponatremia pós-operatória é comum com dor, náusea, opioide e soluções hipotônicas. Corrigir rápido demais causa desmielinização osmótica: o limite é de 8 a 10 mEq/L em 24 horas. Convulsão ou coma exigem solução hipertônica em bolus, com meta de subida pequena inicial.'],
   table:{head:['Distúrbio','Conduta central'],rows:[
    ['Hipocalemia','Repor KCl com ritmo seguro, tratar a perda, checar magnésio'],
    ['Hipercalemia com ECG alterado','Gluconato de cálcio primeiro; depois insulina e glicose, beta-agonista, eliminação'],
    ['Hiponatremia sintomática grave','Solução salina hipertônica em bolus, meta inicial pequena'],
    ['Hiponatremia crônica assintomática','Tratar a causa e corrigir lentamente'],
    ['Hipocalcemia após tireoidectomia','Gluconato de cálcio se sintomática; parestesia perioral, Chvostek e Trousseau']]}},
  {h:'Escolha do líquido e perdas cirúrgicas',p:[
   'Cristaloides balanceados, como Ringer lactato, são preferidos para reposição ampla porque o excesso de soro fisiológico 0,9% causa acidose hiperclorêmica. Soro fisiológico entra bem na alcalose hipoclorêmica por vômitos. Perdas por sonda, dreno e estomas devem ser repostas pelo volume e pela composição estimada. Solução glicosada isolada não repõe volume e piora hiponatremia.',
   'Na pancreatite o cálcio baixo é sinal de gravidade; no grande queimado o potássio sobe nas primeiras horas pela destruição celular; no pós-operatório de tireoide e paratireoide o cálcio cai por hipoparatireoidismo transitório.'],
   after:'Em prova, associe sempre a perda ao distúrbio: o que saiu do paciente diz o que falta nele.'}
 ],
 flow:{title:'Distúrbio ácido-básico no pós-operatório',nodes:[
  {k:'start',t:'Gasometria arterial com pH alterado'},
  {k:'do',t:'Identificar o processo primário pelo bicarbonato e pela PaCO2'},
  {k:'ask',t:'Acidose metabólica?',yes:'Calcular ânion gap e dosar lactato',no:'Avaliar alcalose metabólica ou distúrbio respiratório'},
  {k:'ask',t:'Gap aumentado?',yes:'Lactato, cetoácidos, uremia: tratar a causa, ressuscitar',no:'Perda de bicarbonato ou excesso de cloro: rever fístula, diarreia e soro'},
  {k:'do',t:'Repor potássio e magnésio conforme função renal e repetir eletrólitos e gasometria depois da reposição'},
  {k:'end',t:'Repor o que saiu e corrigir a causa cirúrgica'}]},
 reasoning:[
  'Vômito perde ácido e cloro: o paciente alcaliniza e perde potássio.',
  'Perda intestinal baixa ou fístula perde bicarbonato: o paciente acidifica com gap normal.',
  'Hipercalemia com ECG alterado: proteger o coração antes de baixar o potássio.',
  'Corrigir sódio devagar protege o cérebro.'],
 mnemonics:[
  {n:'Winter',t:'PaCO2 esperada = 1,5 x HCO3 + 8, com mais ou menos 2.'},
  {n:'Gap',t:'Na menos (Cl mais HCO3); normal 8 a 12.'},
  {n:'Hipercalemia',t:'Cálcio protege, insulina e glicose deslocam, depois eliminar.'}],
 pitfalls:[
  'Tratar hipercalemia com ECG alterado só com insulina.',
  'Repor potássio rápido por veia periférica sem monitorização.',
  'Corrigir sódio acima de 10 mEq/L em 24 horas.',
  'Usar soro fisiológico em excesso e criar acidose hiperclorêmica.',
  'Esperar o lactato subir para suspeitar de isquemia mesentérica.'],
 recall:[
  {q:'Distúrbio da estenose pilórica?',a:'Alcalose metabólica hipoclorêmica e hipocalêmica.'},
  {q:'Distúrbio da fístula de delgado ou ileostomia de alto débito?',a:'Acidose metabólica hiperclorêmica com gap normal.'},
  {q:'Qual a primeira medida na hipercalemia com ECG alterado?',a:'Gluconato de cálcio.'},
  {q:'Qual o limite de correção do sódio em 24 horas?',a:'8 a 10 mEq/L.'},
  {q:'Como se calcula o ânion gap?',a:'Sódio menos a soma de cloro e bicarbonato.'},
  {q:'Qual a fórmula de Winter?',a:'PaCO2 esperada igual a 1,5 vezes o bicarbonato mais 8, com variação de 2.'},
  {q:'Qual distúrbio o excesso de soro fisiológico 0,9% pode causar?',a:'Acidose metabólica hiperclorêmica.'},
  {q:'Quais sinais indicam hipocalcemia após tireoidectomia?',a:'Parestesia perioral, sinal de Chvostek e sinal de Trousseau.'}
 ],
 cases:[
  {title:'Vômitos persistentes por obstrução pilórica',data:[
    'Homem de 60 anos com vômitos há 10 dias, emagrecimento e desidratação. Gasometria: pH 7,52, HCO3 38, PaCO2 48. Na 134, K 2,9, Cl 84.',
    'Urina ácida apesar da alcalose.'],
   reasoning:[
    'Alcalose metabólica hipoclorêmica e hipocalêmica por perda de ácido gástrico.',
    'A hipovolemia mantém a retenção de sódio com perda de H+ e K+ na urina, a aciduria paradoxal.'],
   conduct:[
    'Reposição com soro fisiológico 0,9% e potássio em ritmo seguro.',
    'Só depois do equilíbrio hidroeletrolítico operar a causa.'],
   error:'Operar antes de corrigir a alcalose e a hipocalemia.'},
  {title:'Ileostomia de alto débito',data:[
    'Paciente no sexto dia de ileostomia com débito de 2 litros por dia, fraqueza, pH 7,28, HCO3 14, ânion gap 10, Cl alto.'],
   reasoning:[
    'Acidose metabólica com gap normal indica perda de bicarbonato pelo débito.',
    'A reposição precisa cobrir o volume e a composição do que sai.'],
   conduct:[
    'Repor volume com cristaloide balanceado, corrigir potássio e magnésio e rever a dieta e os fármacos que reduzem o débito.',
    'Avaliar obstrução ou infecção como causa do aumento do débito.'],
   error:'Repor só com soro glicosado e ignorar o bicarbonato perdido.'}
 ],
 practice:['Calcule o ânion gap com Na 140, Cl 100 e HCO3 14 e classifique a acidose.','Cite a ordem de tratamento da hipercalemia com onda T apiculada.'],
 refs:[
  {t:'Sterns RH. Disorders of plasma sodium: causes, consequences, and correction. N Engl J Med. 2015.',q:'Sterns Disorders of plasma sodium causes consequences and correction NEJM 2015'},
  {t:'Kraut JA, Madias NE. Metabolic acidosis: pathophysiology, diagnosis and management. Nat Rev Nephrol. 2010.',q:'Kraut Madias Metabolic acidosis pathophysiology diagnosis and management Nat Rev Nephrol 2010'}],
 note:'Limite de correção do sódio coerente com Sterns 2015 (8 mEq/L em 24 h nos de maior risco, máximo de 10 a 12 nos demais). Velocidade de KCl segue a prática geral: o protocolo do serviço manda.',
 exam:[
  {c:'Estenose pilórica com vômitos prolongados.',p:'Acidose metabólica hiperclorêmica.',r:'Alcalose metabólica hipoclorêmica e hipocalêmica.'},
  {c:'Ileostomia de alto débito com ânion gap normal.',p:'Alcalose por perda de ácido.',r:'Acidose metabólica hiperclorêmica por perda de bicarbonato.'},
  {c:'Hipercalemia com onda T apiculada.',p:'Insulina e glicose isoladas.',r:'Gluconato de cálcio primeiro, depois insulina com glicose e eliminação.'},
  {c:'Correção do sódio na hiponatremia crônica.',p:'Normalizar em poucas horas.',r:'No máximo 8 a 10 mEq/L em 24 horas.'}]
}
});
