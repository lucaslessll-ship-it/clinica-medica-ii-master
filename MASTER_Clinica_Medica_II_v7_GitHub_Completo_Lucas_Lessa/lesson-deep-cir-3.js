/* Estudo aprofundado · Cirurgia · Trauma abdominal e torácico. Texto original; referências ao final de cada aula. */
LessonDeep.add({
'cirtabd_0':{
 updated:'2026-11',
 pretest:['O que mudou no exame primário do ATLS 11?','Quais são as janelas do FAST?','Paciente instável com FAST positivo: qual a conduta?','Quando o lavado peritoneal ainda tem lugar?'],
 sections:[
  {h:'xABCDE: o que o ATLS 11 mudou',p:[
   'Na 11ª edição do ATLS (2025), o exame primário passou a ser xABCDE. O "x" vem antes da via aérea e significa controlar hemorragia externa exsanguinante: compressão direta, torniquete em membro, curativo hemostático. A lógica é que o sangramento não controlado é a principal causa de morte evitável no trauma. A nova edição também reforça a ressuscitação de controle de danos (transfusão precoce, hipotensão permissiva, menos cristaloide) e a correção do choque antes da intubação em sequência rápida, com videolaringoscopia como preferência.',
   'No abdome, a pergunta central do exame primário é: este paciente está sangrando dentro do abdome e precisa de laparotomia agora? A resposta vem da hemodinâmica, do exame físico e do FAST.']},
  {h:'Classes de choque hemorrágico',table:{head:['','Classe I','Classe II','Classe III','Classe IV'],rows:[
   ['Perda estimada','Até 15%','15 a 30%','31 a 40%','Mais de 40%'],
   ['Frequência cardíaca','Normal','Normal ou aumentada','Aumentada','Muito aumentada'],
   ['Pressão arterial','Normal','Normal','Normal ou baixa','Baixa'],
   ['Diurese','Normal','Normal','Reduzida','Muito reduzida'],
   ['Déficit de bases','0 a menos 2','Menos 2 a menos 6','Menos 6 a menos 10','Abaixo de menos 10'],
   ['Conduta','Monitorar','Considerar sangue','Transfusão','Transfusão maciça']]},
   after:'Hipotensão no adulto traumatizado é sangramento até prova em contrário. Os cinco lugares onde o sangue se esconde: tórax, abdome, pelve, ossos longos (fêmur) e para fora (couro cabeludo, ferimentos).'},
  {h:'FAST, eFAST, lavado e tomografia',table:{head:['Exame','Para que serve','Limitação'],rows:[
   ['FAST','Líquido livre nas janelas pericárdica (subxifoide), hepatorrenal (Morison), esplenorrenal e pélvica','Não vê retroperitônio nem lesão de víscera oca; depende do operador; precisa de algumas centenas de mL'],
   ['eFAST','Acrescenta janelas pleurais: pneumotórax e hemotórax','Mesmas limitações do operador'],
   ['Lavado peritoneal diagnóstico','Instável sem FAST disponível ou FAST duvidoso. Positivo: 10 mL ou mais de sangue na aspiração, conteúdo entérico, ou no lavado mais de 100 mil hemácias/mm³, mais de 500 leucócitos/mm³ ou bactérias no Gram','Invasivo; não avalia retroperitônio. Contraindicado quando já há indicação de laparotomia'],
   ['Tomografia com contraste','Padrão para o paciente estável: gradua lesões de órgãos sólidos, mostra blush e retroperitônio','Só para quem está estável']]}},
  {h:'Indicações de laparotomia',list:[
   'Instabilidade hemodinâmica com líquido livre (FAST ou lavado positivo).',
   'Peritonite.',
   'Evisceração.',
   'Ferimento por arma de fogo com trajeto que atravessa a cavidade peritoneal.',
   'Objeto empalado (retirar só no centro cirúrgico).',
   'Pneumoperitônio, ruptura de diafragma, sangramento digestivo ou urinário após ferimento penetrante.',
   'Tomografia com lesão que exige cirurgia (víscera oca, ducto pancreático, entre outras).']},
  {h:'Ferimento por arma branca no abdome anterior, paciente estável',p:[
   'Sem peritonite ou evisceração, explorar a ferida localmente. Se a aponeurose posterior não foi violada, pode ter alta. Se foi violada, as opções são exame físico seriado por 24 horas, tomografia ou laparoscopia diagnóstica. Ferimentos no flanco e no dorso: tomografia com contraste triplo. Ferimento toracoabdominal esquerdo: laparoscopia para excluir lesão diafragmática.',
   'Sinal do cinto de segurança na parede abdominal sugere lesão de víscera oca, de pâncreas ou duodeno e fratura de Chance na transição toracolombar.']}
 ],
 flow:{title:'Trauma abdominal contuso',nodes:[
  {k:'start',t:'Trauma contuso: xABCDE'},
  {k:'do',t:'Controlar hemorragia externa, via aérea, ventilação, dois acessos, sangue precoce'},
  {k:'ask',t:'Instável?',yes:'FAST',no:'Tomografia com contraste'},
  {k:'ask',t:'FAST positivo no instável?',yes:'Laparotomia',no:'Procurar sangramento em tórax, pelve e ossos longos; repetir FAST ou lavado'},
  {k:'ask',t:'Estável com lesão de órgão sólido sem outra indicação cirúrgica?',yes:'Tratamento não operatório monitorizado, embolização se blush',no:'Laparotomia ou laparoscopia conforme achado'},
  {k:'end',t:'Reavaliar e repetir exame primário a qualquer piora'}]},
 reasoning:['Instável com FAST positivo não vai para tomografia.','FAST negativo não exclui lesão: víscera oca e retroperitônio escapam.','Arma de fogo que atravessa o peritônio opera; arma branca estável pode ser observada.','Antes da intubação, corrigir o choque: intubar paciente hipotenso pode precipitar parada.'],
 mnemonics:[{n:'xABCDE',t:'Hemorragia exsanguinante primeiro, depois via aérea, respiração, circulação, neurológico e exposição.'},{n:'Cinco lugares do sangue',t:'Chão (externo), tórax, abdome, pelve e ossos longos.'},{n:'100 mil e 500',t:'Lavado positivo: mais de 100 mil hemácias ou mais de 500 leucócitos por mm³.'}],
 pitfalls:['Mandar paciente instável para tomografia.','Esquecer a pelve como fonte de choque com FAST negativo.','Remover objeto empalado no pronto-socorro.','Dar alta a ferimento por arma branca sem explorar a ferida.'],
 recall:[
  {q:'O que significa o x do xABCDE?',a:'Controle de hemorragia externa exsanguinante antes da via aérea.'},
  {q:'Quais as janelas do FAST?',a:'Pericárdica, hepatorrenal, esplenorrenal e pélvica.'},
  {q:'Conduta no instável com FAST positivo?',a:'Laparotomia.'},
  {q:'Critérios de lavado positivo?',a:'10 mL de sangue na aspiração, conteúdo entérico, mais de 100 mil hemácias ou mais de 500 leucócitos por mm³, ou bactérias.'},
  {q:'Qual classe de choque tem perda de 31 a 40%?',a:'Classe III.'},
  {q:'O que sugere o sinal do cinto de segurança?',a:'Lesão de víscera oca, pâncreas ou duodeno e fratura de Chance.'}],
 practice:['Desenhe o algoritmo de trauma contuso com as três saídas: laparotomia, tomografia e busca de outra fonte.','Liste sete indicações de laparotomia no trauma.'],
 refs:[
  {t:'American College of Surgeons. Advanced Trauma Life Support, 11ª edição. 2025.',q:'ATLS 11th edition American College of Surgeons 2025'},
  {t:'American College of Surgeons. ATLS 11: trauma care gets major upgrade. ACS Brief, setembro de 2025.',u:'https://www.facs.org/for-medical-professionals/news-publications/news-and-articles/acs-brief/september-16-2025-issue/trauma-care-gets-major-upgrade-with-launch-of-atls-11/'},
  {t:'Coccolini F, et al. Kidney and uro-trauma, liver, spleen: WSES-AAST guidelines. World J Emerg Surg. 2017 a 2020.',q:'WSES AAST guidelines liver trauma spleen trauma Coccolini'}],
 note:'ATLS 11ª edição e diretrizes da sociedade mundial de cirurgia de emergência.'
},
'cirtabd_1':{
 updated:'2026-11',
 pretest:['Qual órgão é o mais lesado no trauma abdominal contuso?','Grau alto de lesão esplênica contraindica tratamento não operatório?','O que é blush na tomografia?','Que vacinas são feitas após esplenectomia?'],
 sections:[
  {h:'Quem pode fazer tratamento não operatório',p:[
   'O critério principal é a estabilidade hemodinâmica, não o grau da lesão. Paciente estável, sem peritonite e sem outra indicação de laparotomia pode ser tratado sem cirurgia, desde que haja monitorização, possibilidade de exames seriados, sangue disponível e centro cirúrgico pronto. Com isso, a maioria das lesões de fígado e baço é tratada sem operação.',
   'Blush é o extravasamento de contraste na tomografia, sinal de sangramento arterial ativo. No paciente estável, indica angioembolização, não necessariamente cirurgia.']},
  {h:'Graus da AAST (simplificado)',table:{head:['Grau','Baço','Fígado'],rows:[
   ['I','Hematoma subcapsular menor que 10% ou laceração menor que 1 cm','Hematoma subcapsular menor que 10% ou laceração menor que 1 cm'],
   ['II','Hematoma de 10 a 50% ou laceração de 1 a 3 cm','Hematoma de 10 a 50% ou laceração de 1 a 3 cm'],
   ['III','Hematoma maior que 50% ou laceração maior que 3 cm','Hematoma maior que 50% ou laceração maior que 3 cm'],
   ['IV','Lesão vascular ou laceração com desvascularização maior que 25%','Ruptura de 25 a 75% de um lobo; lesão vascular ou sangramento ativo para o peritônio'],
   ['V','Baço pulverizado ou desvascularização completa','Ruptura de mais de 75% de um lobo; lesão de veias justa-hepáticas ou cava retro-hepática']]}},
  {h:'Baço',list:[
   'É o órgão mais lesado no trauma contuso. Sinal de Kehr pode estar presente.',
   'Instável: esplenectomia (ou esplenorrafia em casos selecionados).',
   'Após esplenectomia, risco de sepse fulminante por germes encapsulados (OPSI). Vacinar contra pneumococo, meningococo (ACWY e B) e Haemophilus influenzae tipo b, idealmente cerca de 14 dias após a cirurgia, ou antes da alta se houver risco de perda de seguimento. Vacina anual contra influenza.',
   'No tratamento não operatório, o risco de falha é maior nos primeiros dias. Orientar sinais de alarme.']},
  {h:'Fígado',list:[
   'Órgão mais lesado nos ferimentos por arma branca e muito lesado no trauma contuso.',
   'Manobra de Pringle: clampear o ligamento hepatoduodenal (artéria hepática, veia porta e colédoco). Se o sangramento continua, pensar em veias hepáticas ou cava retro-hepática.',
   'Empacotamento perihepático é a técnica básica do controle de danos no fígado.',
   'Complicações do tratamento não operatório: biloma, abscesso, hemobilia (tríade de Sandblom: dor no hipocôndrio direito, icterícia e hemorragia digestiva).']}
 ],
 flow:{title:'Lesão de fígado ou baço',nodes:[
  {k:'start',t:'Lesão de víscera sólida na tomografia'},
  {k:'ask',t:'Instável ou peritonite?',yes:'Laparotomia: esplenectomia, empacotamento hepático, Pringle',no:'Candidato a tratamento não operatório'},
  {k:'ask',t:'Blush ou pseudoaneurisma?',yes:'Angioembolização',no:'Observação'},
  {k:'do',t:'UTI ou unidade monitorizada, hemoglobina seriada, exame abdominal repetido, repouso'},
  {k:'ask',t:'Queda de hemoglobina ou instabilidade?',yes:'Falha: angioembolização ou cirurgia',no:'Mobilização progressiva e alta com orientação'},
  {k:'end',t:'Esplenectomizado: vacinas contra encapsulados'}]},
 reasoning:['Estabilidade decide, não o grau.','Blush no estável é caso de radiologia intervencionista.','Pringle que não para o sangramento aponta para veias hepáticas ou cava.'],
 mnemonics:[{n:'Estável não opera',t:'Lesão sólida em paciente estável: tratamento não operatório.'},{n:'Encapsulados: PMH',t:'Pneumococo, Meningococo, Haemophilus.'},{n:'Sandblom',t:'Dor, icterícia e sangramento digestivo: hemobilia.'}],
 pitfalls:['Operar lesão grau IV em paciente estável só pelo grau.','Esquecer a vacinação do esplenectomizado.','Achar que Pringle controla sangramento da cava retro-hepática.'],
 recall:[
  {q:'Principal critério para tratamento não operatório?',a:'Estabilidade hemodinâmica, sem peritonite e sem outra indicação de cirurgia.'},
  {q:'O que é blush?',a:'Extravasamento de contraste na tomografia, indicando sangramento ativo.'},
  {q:'Estruturas clampeadas na manobra de Pringle?',a:'Artéria hepática, veia porta e colédoco.'},
  {q:'Vacinas após esplenectomia?',a:'Pneumococo, meningococo e Haemophilus influenzae tipo b, mais influenza anual.'},
  {q:'Tríade da hemobilia?',a:'Dor no hipocôndrio direito, icterícia e hemorragia digestiva.'}],
 practice:['Escreva a conduta para lesão esplênica grau III com blush em paciente estável.','Explique por que o grau da lesão não define a cirurgia.'],
 refs:[
  {t:'Coccolini F, et al. Splenic trauma: WSES classification and guidelines for adult and pediatric patients. World J Emerg Surg. 2017.',q:'Splenic trauma WSES classification and guidelines 2017'},
  {t:'Coccolini F, et al. Liver trauma: WSES 2020 guidelines. World J Emerg Surg. 2020.',q:'Liver trauma WSES 2020 guidelines'},
  {t:'Kozar RA, et al. Organ injury scaling 2018 update: spleen, liver, and kidney. J Trauma Acute Care Surg. 2018.',q:'AAST organ injury scaling 2018 update spleen liver kidney'}],
 note:'Diretrizes de trauma de baço e fígado e escala de lesão da AAST.'
},
'cirtabd_2':{
 updated:'2026-11',
 pretest:['Quais são as três zonas do retroperitônio e quando explorar cada uma?','Qual é o primeiro passo na fratura de pelve em livro aberto com choque?','Quais sinais contraindicam a sondagem vesical no trauma?','Quando fazer colostomia na lesão de cólon?'],
 sections:[
  {h:'Vísceras ocas',list:[
   '<strong>Delgado:</strong> muito lesado nos ferimentos por arma de fogo. Rafia ou ressecção com anastomose.',
   '<strong>Cólon:</strong> na maioria, rafia primária ou ressecção com anastomose. Colostomia quando há choque, múltiplas transfusões, contaminação grosseira, comorbidade grave ou controle de danos.',
   '<strong>Duodeno:</strong> hematoma duodenal em criança após guidão de bicicleta causa obstrução alta e é tratado com sonda e nutrição. Lesões de parede exigem reparo.',
   '<strong>Pâncreas:</strong> amilase pode ser normal no início. O fator decisivo é o ducto principal: lesão ductal à esquerda dos vasos mesentéricos, pancreatectomia distal; sem lesão ductal, drenagem.',
   '<strong>Lesão de víscera oca no trauma contuso</strong> é difícil de ver na tomografia: líquido livre sem lesão de órgão sólido deve levantar suspeita.']},
  {h:'Retroperitônio: zonas e conduta',table:{head:['Zona','Conteúdo','Contuso','Penetrante'],rows:[
   ['I · central','Aorta, cava, pâncreas, duodeno, origem dos vasos mesentéricos','Explorar','Explorar'],
   ['II · lateral (flancos)','Rins, ureteres, cólon ascendente e descendente','Explorar só se hematoma expansivo, pulsátil ou com extravasamento urinário importante','Explorar'],
   ['III · pélvica','Vasos ilíacos, plexos venosos pélvicos','Não explorar: estabilizar a pelve, embolizar ou tamponar','Explorar']]},
   after:'A zona III contusa não se abre porque o sangramento é venoso e de osso, e a abertura do hematoma perde o tamponamento.'},
  {h:'Fratura de pelve com choque',list:[
   'Fechar a pelve: lençol ou cinta pélvica no nível dos trocânteres maiores, não da crista ilíaca.',
   'Transfusão com protocolo de transfusão maciça e ácido tranexâmico nas primeiras 3 horas.',
   'Sangramento arterial (blush): angioembolização. Sangramento venoso e ósseo: tamponamento pré-peritoneal e fixação externa.',
   'FAST positivo com pelve fraturada e instabilidade: laparotomia primeiro e tamponamento pélvico no mesmo ato.',
   'Não fazer manobras repetidas de compressão e abertura da pelve para testar estabilidade: desloca coágulos.']},
  {h:'Trauma urológico e diafragma',list:[
   '<strong>Uretra:</strong> sangue no meato, hematoma perineal ou escrotal e próstata alta ao toque contraindicam sonda vesical. Fazer uretrocistografia retrógrada; se lesão, cistostomia suprapúbica.',
   '<strong>Rim:</strong> a maioria é tratada sem cirurgia; hematúria é o sinal mais comum.',
   '<strong>Diafragma:</strong> lesão mais comum à esquerda (o fígado protege a direita). Radiografia com sonda nasogástrica no tórax é sugestiva. No ferimento toracoabdominal esquerdo, laparoscopia diagnóstica, porque lesões pequenas evoluem para hérnia diafragmática tardia.']}
 ],
 flow:{title:'Hematoma retroperitoneal na laparotomia',nodes:[
  {k:'start',t:'Hematoma retroperitoneal encontrado'},
  {k:'ask',t:'Zona I?',yes:'Explorar sempre',no:'Seguir'},
  {k:'ask',t:'Trauma penetrante?',yes:'Explorar zonas II e III',no:'Contuso'},
  {k:'ask',t:'Zona II expansiva ou pulsátil?',yes:'Explorar',no:'Não explorar'},
  {k:'do',t:'Zona III contusa: não abrir; fixar pelve, tamponar e embolizar'},
  {k:'end',t:'Documentar e reavaliar com imagem se necessário'}]},
 reasoning:['Central sempre explora; pélvica contusa nunca explora.','Cinta pélvica no trocânter, não na crista.','Sangue no meato uretral: nada de sonda.'],
 mnemonics:[{n:'1 sempre, 3 contusa nunca',t:'Zonas do retroperitônio.'},{n:'Trocânter',t:'Altura correta da cinta pélvica.'},{n:'Meato, períneo, próstata alta',t:'Três sinais de lesão uretral.'}],
 pitfalls:['Abrir hematoma pélvico contuso.','Sondar paciente com sangue no meato.','Colocar a cinta pélvica na cintura.','Fazer colostomia de rotina em toda lesão de cólon.'],
 recall:[
  {q:'Zona do retroperitônio sempre explorada?',a:'Zona I, central.'},
  {q:'Hematoma pélvico contuso: explora?',a:'Não; estabilizar a pelve, embolizar ou tamponar.'},
  {q:'Exame antes de sondar paciente com sangue no meato?',a:'Uretrocistografia retrógrada.'},
  {q:'Onde posicionar a cinta pélvica?',a:'Na altura dos trocânteres maiores.'},
  {q:'Lado mais comum de lesão diafragmática no contuso?',a:'Esquerdo.'}],
 practice:['Monte a tabela das três zonas para contuso e penetrante sem consultar.','Explique a conduta da lesão de cólon em paciente estável e em paciente em controle de danos.'],
 refs:[
  {t:'Coccolini F, et al. Pelvic trauma: WSES classification and guidelines. World J Emerg Surg. 2017.',q:'Pelvic trauma WSES classification and guidelines 2017'},
  {t:'Coccolini F, et al. Pancreatic trauma: WSES-AAST guidelines. World J Emerg Surg. 2019.',q:'Pancreatic trauma WSES AAST guidelines 2019'},
  {t:'American College of Surgeons. Advanced Trauma Life Support, 11ª edição. 2025.',q:'ATLS 11th edition'}],
 note:'Diretrizes de trauma pélvico e pancreático e ATLS 11.'
},
'cirtabd_3':{
 updated:'2026-11',
 pretest:['Quais são os elementos da tríade letal?','O que é cirurgia de controle de danos?','Qual dose e janela do ácido tranexâmico no trauma?','Como se mede a pressão intra-abdominal?'],
 sections:[
  {h:'Por que controlar danos',p:[
   'O paciente em choque hemorrágico grave entra num ciclo: hipotermia, acidose e coagulopatia se alimentam umas às outras e matam mais que a lesão anatômica. Muitos acrescentam a hipocalcemia (o diamante letal). A ideia do controle de danos é parar o sangramento e a contaminação rápido, interromper o ciclo na UTI e só depois reconstruir.'],
   table:{head:['Fase','O que se faz'],rows:[
    ['Ressuscitação de controle de danos','Hipotensão permissiva (PAS cerca de 80 a 90 mmHg sem trauma craniano), transfusão precoce em proporção próxima de 1:1:1 (plasma, plaquetas, hemácias), ácido tranexâmico, cálcio, aquecimento, pouco cristaloide'],
    ['Cirurgia abreviada','Controle do sangramento (empacotamento, ligaduras, shunts) e da contaminação (grampear e deixar alças em descontinuidade), fechamento temporário do abdome'],
    ['UTI','Aquecer, corrigir acidose e coagulopatia, otimizar perfusão em 24 a 48 horas'],
    ['Reoperação planejada','Retirar compressas, reconstrução definitiva (anastomoses, estomas), fechamento da parede']]}},
  {h:'Quando indicar',list:['pH abaixo de 7,2 ou déficit de bases grave','Temperatura abaixo de 35 °C','Coagulopatia clínica ou laboratorial','Transfusão maciça','Lesões combinadas complexas (vascular e víscera, fígado grave)','Necessidade de tempo cirúrgico longo em paciente instável']},
  {h:'Transfusão e ácido tranexâmico',list:[
   '<strong>Transfusão maciça:</strong> 10 ou mais concentrados em 24 horas, ou mais de 3 em 1 hora. Escore ABC prevê a necessidade: ferimento penetrante, PAS de 90 mmHg ou menos, FC de 120 ou mais e FAST positivo; 2 pontos ou mais ativam o protocolo.',
   '<strong>Ácido tranexâmico:</strong> 1 g em 10 minutos, seguido de 1 g em 8 horas, iniciado nas primeiras 3 horas do trauma (estudo CRASH-2). Depois de 3 horas, o benefício desaparece e o risco aumenta.',
   '<strong>Cristaloide:</strong> o ATLS limita a infusão inicial e prioriza sangue. Volumes grandes pioram coagulopatia, acidose e edema.']},
  {h:'Hipertensão e síndrome compartimental abdominal',p:[
   'A pressão intra-abdominal é medida pela bexiga: cerca de 25 mL de soro instilados, transdutor zerado na linha axilar média, leitura ao fim da expiração, paciente em decúbito dorsal. Normal até cerca de 5 a 7 mmHg. Hipertensão intra-abdominal começa em 12 mmHg (grau I 12 a 15, II 16 a 20, III 21 a 25, IV acima de 25).',
   'Síndrome compartimental abdominal é pressão sustentada acima de 20 mmHg com nova disfunção orgânica: oligúria, aumento da pressão nas vias aéreas, hipotensão por queda do retorno venoso. Medidas clínicas (sedação, drenagem de coleções, descompressão gástrica, balanço negativo) e, se não resolver, laparotomia descompressiva com abdome aberto.']}
 ],
 flow:{title:'Choque hemorrágico grave na sala de trauma',nodes:[
  {k:'start',t:'Trauma com choque classe III ou IV'},
  {k:'do',t:'Controle de hemorragia externa, ativar transfusão maciça, ácido tranexâmico se até 3 horas'},
  {k:'do',t:'Hipotensão permissiva sem TCE, aquecer, cálcio'},
  {k:'ask',t:'Tríade letal ou lesões complexas?',yes:'Cirurgia de controle de danos e fechamento temporário',no:'Cirurgia definitiva'},
  {k:'do',t:'UTI: corrigir hipotermia, acidose e coagulopatia'},
  {k:'end',t:'Reoperação planejada em 24 a 48 horas'}]},
 reasoning:['O paciente morre da fisiologia, não da anatomia: controle o sangramento e saia.','Hipotensão permissiva não vale para trauma craniano, onde a perfusão cerebral precisa de pressão.','Ácido tranexâmico depois de 3 horas não se usa.'],
 mnemonics:[{n:'Frio, ácido, sem coagulação',t:'Tríade letal: hipotermia, acidose, coagulopatia.'},{n:'1 g e 1 g, até 3 horas',t:'Ácido tranexâmico: 1 g em 10 minutos e 1 g em 8 horas, iniciado em até 3 horas.'},{n:'ABC 2',t:'Escore ABC de 2 ou mais: transfusão maciça.'}],
 pitfalls:['Fazer anastomoses longas em paciente hipotérmico e acidótico.','Usar hipotensão permissiva em paciente com TCE grave.','Repor com litros de cristaloide antes do sangue.','Esquecer de medir a pressão vesical no abdome tenso pós-operatório.'],
 recall:[
  {q:'Tríade letal?',a:'Hipotermia, acidose e coagulopatia.'},
  {q:'Quatro fases do controle de danos?',a:'Ressuscitação, cirurgia abreviada, recuperação na UTI e reoperação planejada.'},
  {q:'Esquema do ácido tranexâmico?',a:'1 g em 10 minutos e 1 g em 8 horas, iniciado até 3 horas do trauma.'},
  {q:'Definição de síndrome compartimental abdominal?',a:'Pressão intra-abdominal sustentada acima de 20 mmHg com nova disfunção orgânica.'},
  {q:'Componentes do escore ABC?',a:'Penetrante, PAS de 90 ou menos, FC de 120 ou mais e FAST positivo.'}],
 practice:['Explique a um interno por que a cirurgia foi interrompida com compressas no abdome.','Calcule o escore ABC: ferimento por arma de fogo, PA 85/50, FC 130, FAST positivo.'],
 refs:[
  {t:'CRASH-2 collaborators. Effects of tranexamic acid on death, vascular occlusive events, and blood transfusion in trauma patients. Lancet. 2010.',q:'CRASH-2 tranexamic acid trauma Lancet 2010'},
  {t:'Holcomb JB, et al. Transfusion of plasma, platelets, and red blood cells in a 1:1:1 vs a 1:1:2 ratio (PROPPR). JAMA. 2015.',q:'PROPPR 1:1:1 vs 1:1:2 ratio JAMA 2015'},
  {t:'Kirkpatrick AW, et al. Intra-abdominal hypertension and the abdominal compartment syndrome: updated consensus definitions (WSACS). Intensive Care Med. 2013.',q:'WSACS intra-abdominal hypertension abdominal compartment syndrome updated consensus 2013'}],
 note:'Estudos CRASH-2, PROPPR e consenso da sociedade de síndrome compartimental.'
},
'cirttor_0':{
 updated:'2026-11',
 pretest:['Pneumotórax hipertensivo precisa de radiografia para o diagnóstico?','Onde fazer a descompressão com agulha no adulto?','Qual volume de drenagem define hemotórax maciço?','Qual é a tríade de Beck?'],
 sections:[
  {h:'As lesões que matam no exame primário',table:{head:['Lesão','Reconhecer','Tratar'],rows:[
   ['Pneumotórax hipertensivo','Dispneia, hipotensão, turgência jugular, desvio da traqueia para o lado oposto, murmúrio abolido, hipertimpanismo','Descompressão imediata sem esperar radiografia (agulha ou toracostomia digital), depois dreno'],
   ['Pneumotórax aberto','Ferida torácica soprante; se o diâmetro for maior que cerca de dois terços da traqueia, o ar entra preferencialmente pela ferida','Curativo oclusivo de três pontas, dreno em outro local, fechamento cirúrgico'],
   ['Hemotórax maciço','Choque, murmúrio abolido, macicez, veias do pescoço colabadas','Dreno calibroso, reposição com sangue; toracotomia conforme drenagem'],
   ['Tamponamento cardíaco','Tríade de Beck: hipotensão, turgência jugular, bulhas abafadas; FAST pericárdico','Toracotomia ou esternotomia; pericardiocentese só como ponte'],
   ['Tórax instável com contusão','Duas ou mais fraturas em duas ou mais costelas consecutivas, movimento paradoxal, hipoxemia','Oxigênio, analgesia potente, ventilação se necessário, cuidado com volume'],
   ['Obstrução de via aérea e lesão traqueobrônquica','Estridor, enfisema extenso, fuga aérea persistente apesar do dreno','Via aérea definitiva, broncoscopia, segundo dreno, cirurgia']]}},
  {h:'Detalhes que caem',list:[
   '<strong>Local da descompressão no adulto:</strong> 4º ou 5º espaço intercostal entre as linhas axilares anterior e média, porque a parede é mais fina ali e a agulha alcança a pleura com mais frequência que no 2º espaço. Na criança, 2º espaço na linha hemiclavicular.',
   '<strong>Diferença entre hipertensivo e tamponamento:</strong> os dois têm hipotensão e turgência jugular. No pneumotórax, o murmúrio está abolido de um lado; no tamponamento, os pulmões estão normais e as bulhas abafadas.',
   '<strong>No tórax instável</strong>, quem mata é a contusão pulmonar embaixo. Excesso de cristaloide piora a contusão.',
   '<strong>Choque com veias do pescoço colabadas e tórax maciço:</strong> hemotórax maciço. Com veias distendidas: pneumotórax hipertensivo ou tamponamento.']}
 ],
 flow:{title:'Trauma torácico com choque',nodes:[
  {k:'start',t:'Trauma torácico com hipotensão'},
  {k:'ask',t:'Murmúrio abolido e hipertimpanismo com veias distendidas?',yes:'Pneumotórax hipertensivo: descompressão imediata',no:'Seguir'},
  {k:'ask',t:'Murmúrio abolido com macicez e veias colabadas?',yes:'Hemotórax maciço: dreno e sangue',no:'Seguir'},
  {k:'ask',t:'Pulmões normais, veias distendidas, bulhas abafadas, FAST pericárdico positivo?',yes:'Tamponamento: cirurgia',no:'Procurar sangramento abdominal, pélvico ou externo'},
  {k:'do',t:'Radiografia de tórax e eFAST depois das manobras salvadoras'},
  {k:'end',t:'Repetir exame primário após cada intervenção'}]},
 reasoning:['Diagnóstico de pneumotórax hipertensivo é clínico; pedir radiografia é erro de prova.','Veias do pescoço separam o grupo obstrutivo (cheias) do hemorrágico (vazias).','Pericardiocentese não é tratamento definitivo do tamponamento traumático.'],
 mnemonics:[{n:'Beck: baixa, cheia, abafada',t:'Pressão baixa, jugular cheia, bulhas abafadas.'},{n:'Quinto e axilar',t:'Agulha no 4º ou 5º espaço entre axilar anterior e média no adulto.'},{n:'Dois em dois',t:'Tórax instável: duas fraturas em duas costelas consecutivas.'}],
 pitfalls:['Pedir radiografia antes de descomprimir o pneumotórax hipertensivo.','Fechar com curativo de quatro lados o pneumotórax aberto.','Hidratar demais o paciente com contusão pulmonar.','Tratar tamponamento traumático só com pericardiocentese quando há cirurgião.'],
 recall:[
  {q:'Como se diagnostica o pneumotórax hipertensivo?',a:'Clinicamente, sem esperar exame de imagem.'},
  {q:'Local da descompressão com agulha no adulto?',a:'4º ou 5º espaço intercostal entre as linhas axilares anterior e média.'},
  {q:'O que é a tríade de Beck?',a:'Hipotensão, turgência jugular e bulhas abafadas.'},
  {q:'Curativo do pneumotórax aberto?',a:'Oclusivo fixado em três lados, seguido de dreno em outro local.'},
  {q:'Definição de tórax instável?',a:'Duas ou mais fraturas em duas ou mais costelas consecutivas, gerando segmento com movimento paradoxal.'}],
 practice:['Monte uma tabela com veias do pescoço, murmúrio e percussão para pneumotórax hipertensivo, hemotórax maciço e tamponamento.'],
 refs:[
  {t:'American College of Surgeons. Advanced Trauma Life Support, 11ª edição. 2025. Capítulo de trauma torácico.',q:'ATLS 11th edition thoracic trauma chapter'},
  {t:'Inaba K, et al. Optimal positioning for emergent needle thoracostomy: a cadaver-based study. J Trauma. 2011.',q:'Inaba optimal positioning emergent needle thoracostomy cadaver study'}],
 note:'ATLS 11ª edição.'
},
'cirttor_1':{
 updated:'2026-11',
 pretest:['Onde inserir o dreno torácico?','Quais critérios indicam toracotomia no hemotórax?','Quem se beneficia da toracotomia de reanimação?','Por que a incisão é feita na borda superior da costela?'],
 sections:[
  {h:'Drenagem torácica',list:[
   '<strong>Local:</strong> 5º espaço intercostal, à frente da linha axilar média, no triângulo de segurança (borda lateral do peitoral maior, borda anterior do grande dorsal e linha horizontal do 5º espaço, na altura do mamilo).',
   '<strong>Por cima da costela:</strong> o feixe vasculonervoso intercostal corre na borda inferior de cada costela; entrar pela borda superior da costela de baixo evita lesá-lo.',
   '<strong>Técnica:</strong> dissecção romba, exploração digital da cavidade antes de passar o dreno, dreno direcionado posterior e superiormente, selo d água.',
   '<strong>Calibre:</strong> no pneumotórax simples, drenos finos funcionam bem. No hemotórax, preferir drenos mais calibrosos para não coagular.',
   '<strong>Hemotórax retido:</strong> se persistir após drenagem, videotoracoscopia precoce (primeiros dias) reduz empiema e fibrotórax.']},
  {h:'Toracotomia após drenagem',table:{head:['Critério','Valor'],rows:[
   ['Drenagem inicial','1.500 mL ou mais de sangue de imediato'],
   ['Drenagem contínua','Mais de 200 mL por hora por 2 a 4 horas'],
   ['Hemodinâmica','Necessidade persistente de transfusão ou instabilidade apesar da reposição']]},
   after:'Os números orientam, mas a decisão é fisiológica: paciente que não estabiliza vai para o centro cirúrgico.'},
  {h:'Toracotomia de reanimação na sala de emergência',p:[
   'É feita pela via anterolateral esquerda no 5º espaço intercostal. Objetivos: abrir o pericárdio e aliviar tamponamento, controlar sangramento cardíaco ou pulmonar, clampear a aorta descendente, fazer massagem cardíaca interna e evacuar embolia gasosa.',
   'O melhor resultado é no ferimento penetrante torácico, sobretudo por arma branca no coração, com parada testemunhada e sinais de vida recentes. No trauma contuso com parada, a sobrevida é muito baixa, e a indicação fica restrita a parada testemunhada recente na chegada. Ausência de sinais de vida por tempo prolongado contraindica.']}
 ],
 flow:{title:'Hemotórax',nodes:[
  {k:'start',t:'Hemotórax na radiografia ou eFAST'},
  {k:'do',t:'Dreno no 5º espaço, à frente da linha axilar média, por cima da costela'},
  {k:'ask',t:'Saída imediata de 1.500 mL ou mais?',yes:'Toracotomia',no:'Medir drenagem por hora'},
  {k:'ask',t:'Mais de 200 mL por hora por 2 a 4 horas ou transfusão contínua?',yes:'Toracotomia',no:'Observação'},
  {k:'ask',t:'Hemotórax retido após 48 a 72 horas?',yes:'Videotoracoscopia precoce',no:'Retirar dreno quando débito baixo e pulmão expandido'},
  {k:'end',t:'Evitar empiema e fibrotórax'}]},
 reasoning:['1.500 de uma vez ou 200 por hora: toracotomia.','Borda superior da costela de baixo protege o feixe intercostal.','Toracotomia de reanimação funciona melhor no ferimento cardíaco por arma branca.'],
 mnemonics:[{n:'1500 ou 200',t:'Critérios de toracotomia no hemotórax.'},{n:'Triângulo seguro',t:'Peitoral, grande dorsal e 5º espaço.'},{n:'Por cima da costela',t:'O feixe passa por baixo.'}],
 pitfalls:['Inserir o dreno pela borda inferior da costela.','Usar trocarte pontiagudo para empurrar o dreno.','Indicar toracotomia de reanimação em parada prolongada de trauma contuso.','Deixar hemotórax retido sem videotoracoscopia.'],
 recall:[
  {q:'Onde inserir o dreno torácico?',a:'5º espaço intercostal, à frente da linha axilar média, pela borda superior da costela inferior.'},
  {q:'Critérios de toracotomia no hemotórax?',a:'1.500 mL de saída imediata, mais de 200 mL por hora por 2 a 4 horas ou necessidade persistente de transfusão.'},
  {q:'Via da toracotomia de reanimação?',a:'Anterolateral esquerda no 5º espaço intercostal.'},
  {q:'Quem mais se beneficia?',a:'Ferimento penetrante torácico com parada testemunhada e sinais de vida recentes, em especial lesão cardíaca por arma branca.'},
  {q:'Conduta no hemotórax retido?',a:'Videotoracoscopia precoce.'}],
 practice:['Descreva passo a passo a drenagem torácica, do posicionamento ao selo d água.'],
 refs:[
  {t:'American College of Surgeons. Advanced Trauma Life Support, 11ª edição. 2025.',q:'ATLS 11th edition thoracic trauma'},
  {t:'Seamon MJ, et al. An evidence-based approach to patient selection for emergency department thoracotomy: EAST practice management guideline. J Trauma Acute Care Surg. 2015.',q:'EAST practice management guideline emergency department thoracotomy 2015'},
  {t:'Patel NJ, et al. Management of simple and retained hemothorax: EAST practice management guideline. J Trauma Acute Care Surg. 2021.',q:'EAST practice management guideline simple and retained hemothorax 2021'}],
 note:'ATLS 11 e diretrizes da sociedade americana de cirurgia do trauma (EAST).'
},
'cirttor_2':{
 updated:'2026-11',
 pretest:['Onde a aorta costuma romper no trauma por desaceleração?','Quais achados da radiografia sugerem lesão de aorta?','Como evolui a contusão pulmonar?','Qual o exame inicial na suspeita de contusão cardíaca?'],
 sections:[
  {h:'Lesões potencialmente letais do exame secundário',table:{head:['Lesão','Pista','Conduta'],rows:[
   ['Contusão pulmonar','Opacidade que não respeita segmento e piora em 24 a 48 horas; hipoxemia','Oxigênio, analgesia, fisioterapia, evitar excesso de volume, ventilação se necessário'],
   ['Lesão traumática de aorta','Desaceleração brusca; ruptura no istmo, logo após a subclávia esquerda, no ligamento arterioso','AngioTC; controle de FC e PA; reparo endovascular (TEVAR)'],
   ['Ruptura de diafragma','Mais à esquerda; sonda nasogástrica no tórax; vísceras no tórax','Cirurgia, em geral por via abdominal na fase aguda'],
   ['Lesão de árvore traqueobrônquica','Enfisema subcutâneo extenso, fuga aérea persistente, pulmão que não expande com dreno','Broncoscopia e cirurgia'],
   ['Lesão de esôfago','Ferimento penetrante transmediastinal, pneumomediastino, dor, mediastinite','Esofagograma ou endoscopia; reparo e drenagem'],
   ['Contusão cardíaca','Arritmia, alteração de ECG, hipotensão sem outra causa','ECG em todos; monitorização se alterado; troponina; ecocardiograma se instável']]}},
  {h:'Radiografia na lesão de aorta',list:['Mediastino alargado (acima de cerca de 8 cm)','Apagamento do botão aórtico','Desvio da traqueia e da sonda nasogástrica para a direita','Rebaixamento do brônquio fonte esquerdo','Elevação do brônquio fonte direito','Apagamento da janela aortopulmonar','Capuz apical pleural esquerdo','Hemotórax esquerdo','Fratura de 1ª e 2ª costelas ou escápula (sinal de energia alta)'],
   after:'Radiografia normal não exclui: com mecanismo compatível, angioTC. Enquanto aguarda o reparo, manter frequência cardíaca abaixo de cerca de 80 bpm e pressão controlada (betabloqueador), desde que não haja choque por outra causa.'},
  {h:'Outras lesões',list:['<strong>Fraturas de costela em idoso:</strong> cada costela fraturada aumenta morbidade e mortalidade. Analgesia agressiva, inclusive bloqueios regionais.','<strong>Fratura de esterno:</strong> associada a contusão cardíaca; ECG.','<strong>Embolia gasosa:</strong> após ferimento pulmonar e ventilação com pressão positiva, com colapso súbito. Decúbito, toracotomia e clampeamento do hilo.','<strong>Asfixia traumática:</strong> compressão torácica com petéquias e pletora de face e pescoço.']}
 ],
 flow:{title:'Desaceleração brusca',nodes:[
  {k:'start',t:'Colisão frontal em alta velocidade ou queda de altura'},
  {k:'do',t:'xABCDE e radiografia de tórax'},
  {k:'ask',t:'Mediastino alargado ou outros sinais na radiografia?',yes:'AngioTC de tórax',no:'Mecanismo de alta energia ainda justifica angioTC'},
  {k:'ask',t:'Lesão de aorta confirmada?',yes:'Controle de FC e PA e TEVAR',no:'Seguir exame secundário'},
  {k:'do',t:'ECG para contusão cardíaca, avaliar costelas, diafragma e via aérea'},
  {k:'end',t:'Reavaliar contusão pulmonar em 24 a 48 horas'}]},
 reasoning:['Desaceleração mais mediastino largo: aorta no istmo.','Contusão pulmonar piora no segundo dia; cuidado com volume.','Dreno que borbulha sem parar e pulmão que não expande: lesão de brônquio.'],
 mnemonics:[{n:'Istmo, ligamento arterioso',t:'Ponto fixo onde a aorta rompe na desaceleração.'},{n:'Mediastino 8',t:'Acima de cerca de 8 cm sugere lesão de aorta.'},{n:'Sonda no tórax',t:'Hérnia diafragmática traumática à esquerda.'}],
 pitfalls:['Excluir lesão de aorta só porque a radiografia está normal.','Hidratar agressivamente a contusão pulmonar.','Não fazer ECG no trauma torácico fechado.'],
 recall:[
  {q:'Local mais comum da ruptura traumática da aorta?',a:'Istmo aórtico, junto ao ligamento arterioso, distal à subclávia esquerda.'},
  {q:'Cite quatro sinais radiológicos de lesão de aorta.',a:'Mediastino alargado, apagamento do botão aórtico, desvio da traqueia ou SNG para a direita, rebaixamento do brônquio fonte esquerdo.'},
  {q:'Tratamento preferido da lesão de aorta?',a:'Reparo endovascular (TEVAR), com controle prévio de FC e PA.'},
  {q:'Como evolui a contusão pulmonar?',a:'Piora em 24 a 48 horas; tratamento de suporte e cuidado com volume.'},
  {q:'Sinal de lesão traqueobrônquica após drenagem?',a:'Fuga aérea persistente e pulmão que não expande.'}],
 practice:['Liste de memória seis sinais radiológicos de lesão de aorta.'],
 refs:[
  {t:'Fox N, et al. Evaluation and management of blunt traumatic aortic injury: EAST practice management guideline. J Trauma Acute Care Surg. 2015.',q:'EAST blunt traumatic aortic injury practice management guideline 2015'},
  {t:'American College of Surgeons. Advanced Trauma Life Support, 11ª edição. 2025.',q:'ATLS 11th edition thoracic trauma'}],
 note:'Diretriz da EAST para lesão aórtica e ATLS 11.'
}
});
