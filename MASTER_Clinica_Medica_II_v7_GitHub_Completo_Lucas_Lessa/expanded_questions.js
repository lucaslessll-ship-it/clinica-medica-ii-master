/* Questões autorais. Revisão editorial assistida por IA, com fontes consultadas;
   não equivale a homologação oficial nem revisão independente por médico. */
(() => {
 'use strict';
 const refs={
  ssc:{title:'BSR: systemic sclerosis — renal crisis',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11534099/',year:2024},
  sjo:{title:'BSR: Sjögren disease — investigation of lymphoma',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC12013823/',year:2024},
  sle:{title:'EULAR: management of SLE, 2023 update',url:'https://ard.bmj.com/content/83/1/15',year:2024},
  aps:{title:'EULAR: antiphospholipid syndrome in adults',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11034817/',year:2019},
  syn:{title:'ESC: diagnosis and management of syncope',url:'https://academic.oup.com/eurheartj/article/39/21/1883/4939241',year:2018},
  epi:{title:'NICE NG217, section 7: status epilepticus',url:'https://www.nice.org.uk/guidance/ng217/chapter/7-Treating-status-epilepticus-repeated-or-cluster-seizures-and-prolonged-seizures',year:2025},
  gbs:{title:'EAN/PNS: diagnosis and treatment of Guillain–Barré syndrome',url:'https://aanfiles.blob.core.windows.net/guidelines/61598405-ac04-42cf-898c-5eb582e55ebc/J%20Peripheral%20Nervous%20Sys%20-%202023%20-%20Doorn%20-%20European%20Academy%20of%20Neurology%20Peripheral%20Nerve%20Society%20Guideline%20on%20diagnosis%20and.pdf',year:2023},
  gbsA:{title:'AAN: immunotherapy for Guillain–Barré syndrome',url:'https://www.aan.com/Guidelines/home/GetGuidelineContent/115',year:2003},
  ms:{title:'VA Multiple Sclerosis Centers: relapse management',url:'https://www.va.gov/MS/LEARN_ABOUT_MULTIPLE_SCLEROSIS/Relapse_Management_for_Multiple_Sclerosis.asp',year:2026},
  mg:{title:'Guideline for the management of myasthenic syndromes',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC10752078/',year:2023},
  cd:{title:'NICE NG20, sections 1.1–1.3: coeliac investigation',url:'https://www.nice.org.uk/guidance/ng20/chapter/Recommendations',year:2015},
  cd26:{title:'BSG: adult coeliac disease, diagnosis recommendations 1–3',url:'https://doi.org/10.1136/gutjnl-2025-337747',year:2026},
  uc:{title:'ECCO: ulcerative colitis, recommendation 43',url:'https://doi.org/10.1093/ecco-jcc/jjag066',year:2026},
  ucN:{title:'NICE NG130, recommendations 1.2.22–1.2.24',url:'https://www.nice.org.uk/guidance/ng130/chapter/recommendations',year:2019},
  fn:{title:'NICE CG151, sections 1.4–1.5: neutropenic sepsis',url:'https://www.nice.org.uk/guidance/cg151/chapter/Recommendations',year:2012},
  cord:{title:'NICE NG234, sections 1.3 and 1.5: cord compression',url:'https://www.nice.org.uk/guidance/ng234/chapter/Recommendations',year:2023},
  apl:{title:'ABHH: diagnosis and management of acute promyelocytic leukemia',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11451342',year:2024},
  mm:{title:'IMWG: diagnostic criteria for multiple myeloma',url:'https://www.myeloma.org/international-myeloma-working-group-imwg-criteria-diagnosis-multiple-myeloma',year:2014},
  lymph:{title:'NICE NG52, recommendations 1.1.1–1.1.3: lymphoma biopsy',url:'https://www.nice.org.uk/guidance/ng52/chapter/Recommendations',year:2016}
 };
 const bank=[];
 function add(id,t,subtopic,level,q,answers,reasoning,pitfall,takeaways,ref,pharmacology='Não é necessário definir esquema farmacológico para resolver este item. Tratamento individual depende de avaliação clínica e protocolo.'){
  // A posição da melhor resposta varia; embaralhamento na prova mantém o índice.
  const shift=bank.length%4, rotated=answers.slice(shift).concat(answers.slice(0,shift));
  bank.push({id:'cm2-exp-'+id,module:'P2',t,subtopic,level,q,o:rotated.map(x=>x[0]),a:(4-shift)%4,why:reasoning.join(' '),tag:subtopic,status:'released',reviewedAt:'2026-11-12',reviewType:'Revisão editorial assistida por IA com fonte; sem validação médica independente',references:ref.map(k=>refs[k]),teaching:{reasoning,alternatives:rotated.map(x=>x[1]),pitfall,takeaways,pharmacology}});
 }
 add('001','reuma1','crise-renal',3,'Mulher de 46 anos com esclerose sistêmica difusa, antes normotensa, apresenta cefaleia, PA 198/116 mmHg e creatinina de 0,8 para 2,5 mg/dL. Há esquizócitos. A equipe suspeita de crise renal esclerodérmica. Qual decisão específica não deve aguardar a biópsia?',[
 ['Iniciar IECA com titulação e monitorização renal e pressórica','A combinação de hipertensão recente, lesão renal e microangiopatia demanda tratamento imediato.'],
 ['Aguardar histologia antes de tratar a pressão','A espera expõe a lesão de órgão progressiva.'],
 ['Iniciar corticoide em alta dose como terapia da crise','Não substitui IECA e pode aumentar o risco de crise renal.'],
 ['Tratar apenas a hemólise com transfusão','Suporte pode ser necessário, mas não corrige o processo renal e vascular.']
 ],['Integre mudança da pressão, função renal e hemólise; nenhum dado deve ser interpretado isoladamente.','O alvo inicial é a emergência vascular da esclerose sistêmica, com vigilância de complicações.'],'Elevação da creatinina não é motivo automático para omitir o tratamento específico.',['Reconhecer síndrome antes de exigir confirmação invasiva.'],['ssc'],'IECA reduz a ação da angiotensina II; exige acompanhamento de pressão, potássio e função renal.');
 add('002','reuma1','crise-renal',3,'Homem com crise renal esclerodérmica iniciou IECA e mantém necessidade de diálise por lesão renal aguda. Não há hipotensão, hipercalemia refratária ou outra contraindicação individual. Qual interpretação é mais adequada?',[
 ['Diálise não torna automaticamente inútil a manutenção do IECA','A indicação específica não desaparece apenas porque suporte renal foi necessário.'],
 ['Diálise comprova falha definitiva e obriga retirar todo IECA','Necessidade de suporte não estabelece irreversibilidade imediata.'],
 ['A creatinina deve normalizar antes de qualquer controle pressórico','A sequência proposta deixa a emergência vascular sem tratamento.'],
 ['A prioridade é substituir IECA por pulsoterapia isolada','A pulsoterapia não ocupa o lugar do tratamento específico da crise.']
 ],['Separe necessidade de suporte renal da indicação de controle da crise.','Reavalie tolerância e contraindicações, sem usar a diálise como regra automática de suspensão.'],'Não transformar um marcador de gravidade em contraindicação absoluta.',['Suporte e tratamento da causa podem coexistir.'],['ssc']);
 add('003','reuma1','sjogren-linfoma',2,'Mulher de 58 anos com Sjögren, antes com aumento parotídeo flutuante, apresenta glândula unilateral endurecida e persistentemente aumentada há dois meses, além de linfonodo cervical. Qual próximo passo é mais apropriado?',[
 ['Investigar precocemente possível processo linfoproliferativo','Mudança persistente do padrão glandular merece investigação dirigida.'],
 ['Atribuir obrigatoriamente à secura e apenas aumentar saliva artificial','Sintomáticos não esclarecem o novo achado.'],
 ['Considerar linfoma excluído porque não há febre','Ausência de sintoma sistêmico isolado não exclui linfoma.'],
 ['Esperar um ano para documentar persistência','O quadro já oferece justificativa para investigação sem demora.']
 ],['Compare o padrão atual com a evolução habitual da doença.','O novo aumento glandular persistente exige investigação, sem declarar diagnóstico apenas pelo exame físico.'],'A associação de risco não equivale à confirmação histológica.',['Mudança de padrão clínico merece nova hipótese.'],['sjo']);
 add('004','reuma1','sjogren-investigacao',3,'Paciente com Sjögren desenvolve edema salivar novo e adenomegalia. Propõe-se tratar empiricamente e adiar qualquer investigação, pois o anti-Ro já era positivo. Qual é a melhor crítica?',[
 ['Autoanticorpo prévio não esclarece a causa do novo aumento glandular','O diagnóstico de base não deve encerrar o raciocínio sobre novos sinais.'],
 ['Anti-Ro positivo confirma que toda massa é benigna','Autoanticorpo não define natureza histológica de massa.'],
 ['Apenas repetir anti-Ro substitui avaliação dirigida','O exame não resolve a questão anatômica e etiológica atual.'],
 ['Todo aumento glandular confirma câncer sem necessidade de investigação','O risco exige investigar, e não antecipar uma certeza indevida.']
 ],['Evite ancoragem no diagnóstico conhecido.','A conduta deve responder à nova alteração e selecionar investigação conforme exame e contexto.'],'Não confundir marcador da doença com teste de benignidade.',['Investigar suspeita sem rotular antes da confirmação.'],['sjo']);
 add('005','reuma2','les-tratamento',2,'Mulher com LES e manifestações cutâneo-articulares pergunta se hidroxicloroquina deve ser reservada apenas para nefrite. Não há contraindicação ao fármaco. Qual resposta está alinhada à recomendação EULAR?',[
 ['É tratamento de base para LES, com avaliação individual e vigilância de toxicidade','A utilidade não se limita a acometimento renal.'],
 ['Só tem indicação quando já existe insuficiência renal','A restrição proposta não corresponde ao papel do medicamento.'],
 ['Deve substituir qualquer imunossupressão em doença ameaçadora de órgão','Tratamento de base não significa monoterapia suficiente para toda gravidade.'],
 ['Dispensa acompanhamento ocular por ser usado há muitos anos','Tempo de uso não elimina risco de toxicidade.']
 ],['Diferencie medicamento de base e terapia ajustada à gravidade.','Presença ou ausência de lesão de órgão influencia o conjunto terapêutico.'],'Uma indicação ampla não elimina contraindicações individuais.',['Avaliar benefício e toxicidade em conjunto.'],['sle'],'Hidroxicloroquina é antimalárico imunomodulador; a avaliação de risco retiniano faz parte do acompanhamento.');
 add('006','reuma2','les-corticoide',3,'Paciente com LES controlado permanece usando glicocorticoide crônico e apresenta efeitos adversos. A equipe quer reduzir dano sem perder controle da doença. Qual estratégia geral é mais coerente?',[
 ['Planejar redução gradual e avaliar tratamento poupador conforme atividade','Controle da doença e redução de dano medicamentoso precisam caminhar juntos.'],
 ['Manter indefinidamente qualquer dose porque a doença é autoimune','A manutenção deve considerar dano e alternativas.'],
 ['Interromper abruptamente o glicocorticoide de longa duração','Suspensão brusca pode ser insegura e não é a proposta de desmame.'],
 ['Suspender todos os medicamentos de base para observar uma recaída','Provocar atividade não é método adequado de avaliação.']
 ],['Identifique duas metas: estabilidade do LES e menor exposição a corticoide.','O plano depende da atividade e do histórico, com redução supervisionada.'],'Não transformar recomendação de redução em suspensão abrupta.',['Remissão deve incluir preocupação com dano acumulado.'],['sle']);
 add('007','reuma2','saaf-anticoagulacao',3,'Homem com SAAF confirmada, tripla positividade e AVC isquêmico prévio deseja trocar varfarina por rivaroxabana apenas para evitar INR. Não há contraindicação à varfarina. Qual decisão é mais apropriada?',[
 ['Explicar o perfil de alto risco e manter estratégia baseada em antagonista da vitamina K','Tripla positividade e trombose arterial tornam a troca proposta inadequada em regra.'],
 ['Trocar automaticamente porque todo DOAC é superior em qualquer trombofilia','A generalização ignora a evidência específica da SAAF de alto risco.'],
 ['Suspender anticoagulação porque anticoagulante lúpico prolonga testes','O efeito laboratorial não significa proteção contra trombose.'],
 ['Substituir obrigatoriamente por aspirina isolada','Antiagregação isolada não substitui automaticamente a prevenção secundária indicada.']
 ],['Classifique o perfil trombótico antes de escolher a conveniência do esquema.','A indicação é individual, mas a evidência não apoia rivaroxabana neste cenário.'],'Não extrapolar resultados de fibrilação atrial para SAAF arterial.',['O contexto muda a escolha do anticoagulante.'],['aps']);
 add('008','reuma2','saaf-diagnostico',2,'Mulher sem trombose ou morbidade obstétrica apresenta anticorpo antifosfolípide em exame solicitado por outra razão. Qual interpretação evita excesso diagnóstico?',[
 ['Positividade isolada não estabelece por si só SAAF clínica','É necessário integrar manifestação clínica e perfil laboratorial.'],
 ['Todo anticorpo positivo exige diagnóstico de SAAF trombótica','O teste não demonstra um evento que não aconteceu.'],
 ['O achado elimina qualquer necessidade de avaliar riscos adicionais','A ausência de SAAF confirmada não equivale a risco nulo.'],
 ['O exame confirma que a paciente já teve trombose silenciosa','Não se pode inventar evento a partir do anticorpo.']
 ],['Separe presença de autoanticorpos e síndrome clínica.','Persistência, perfil e contexto orientam avaliação do risco, sem rotular automaticamente.'],'Evitar tanto o sobrediagnóstico quanto a conclusão de ausência total de risco.',['Resultado laboratorial deve responder a uma pergunta clínica.'],['aps']);
 add('009','neuro1','sincope-avaliacao',2,'Homem de 64 anos apresenta perda breve de consciência, recuperação espontânea e exame neurológico normal. Sem trauma craniano ou déficit focal. Qual conjunto integra melhor a avaliação inicial da suspeita de síncope?',[
 ['História detalhada, exame com pressão ortostática e ECG','A investigação inicial busca mecanismo e sinais de risco.'],
 ['TC de crânio e EEG obrigatórios para todos','Esses exames dependem de indicação e não substituem a avaliação inicial.'],
 ['Ressonância antes de perguntar como ocorreu o episódio','A história do evento é central para classificar a perda de consciência.'],
 ['Apenas glicemia, encerrando investigação se normal','Um resultado normal isolado não explica o episódio.']
 ],['Reconstrua antes, durante e depois do evento.','Direcione exames adicionais pelos achados, em vez de pedir uma bateria indistinta.'],'Exame neurológico normal não exclui causa cardíaca.',['ECG e ortostatismo pertencem ao início do raciocínio.'],['syn']);
 add('010','neuro1','sincope-risco',3,'Mulher de 52 anos perdeu a consciência enquanto corria, sem pródromo, e recuperou-se rapidamente. Tem cardiopatia estrutural conhecida. Uma crise convulsiva não foi observada. Qual aspecto pesa mais na decisão de investigação urgente?',[
 ['Evento no esforço associado a cardiopatia estrutural','São dados de alerta para mecanismo cardíaco.'],
 ['Recuperação rápida torna impossível uma síncope cardíaca','A recuperação espontânea é compatível com síncope e não elimina risco.'],
 ['Ausência de abalos exclui doença cardíaca','Abalos não são requisito para um mecanismo cardíaco.'],
 ['Idade inferior a 65 anos garante etiologia benigna','Um ponto de corte etário não neutraliza sinais de risco.']
 ],['Use contexto do evento e doença de base para estratificar risco.','A resolução do episódio não assegura segurança após ele.'],'Confundir recuperação com baixo risco.',['Síncope de esforço merece atenção dirigida.'],['syn']);
 add('011','neuro1','estado-mal-inicial',3,'Adulto apresenta crise tônico-clônica contínua há seis minutos. Há equipe de ressuscitação, glicemia capilar já foi verificada e acesso venoso disponível. Qual conduta medicamentosa inicial é apropriada em paralelo ao suporte?',[
 ['Administrar benzodiazepínico por via apropriada, com monitorização','Crise convulsiva prolongada já demanda tratamento de emergência.'],
 ['Esperar completar trinta minutos para definir urgência','O tratamento não deve aguardar o antigo limiar temporal.'],
 ['Aguardar EEG para autorizar qualquer medicação','Atividade convulsiva contínua permite agir clinicamente.'],
 ['Realizar ressonância antes de interromper a crise','A investigação etiológica não deve preceder a estabilização necessária.']
 ],['Reconheça que a duração ultrapassou o limiar operacional de emergência.','Interromper a crise e oferecer suporte ocorrem junto da busca da causa.'],'Esperar confirmação instrumental diante de emergência clínica.',['Cronometrar muda a conduta.'],['epi'],'Benzodiazepínicos potencializam a transmissão GABAérgica. Monitorizar ventilação e consciência; dose e via seguem protocolo e contexto.');
 add('012','neuro1','estado-mal-refratario',3,'Crise convulsiva persiste após duas doses adequadas de benzodiazepínico administradas segundo protocolo. O suporte está em andamento. Qual é a próxima estratégia geral mais apropriada?',[
 ['Escalonar para fármaco antiepiléptico intravenoso de segunda linha e apoio especializado','Persistência exige seguir o algoritmo e preparar escalonamento.'],
 ['Repetir benzodiazepínicos indefinidamente sem reavaliar ventilação','A repetição sem limite aumenta risco e adia a próxima etapa.'],
 ['Encerrar monitorização porque já houve medicação','A ausência de resposta exige maior vigilância.'],
 ['Dar alta após sedação, mesmo com atividade convulsiva','Sedação não comprova controle seguro do estado de mal.']
 ],['Verifique tratamento adequado e persistência real da crise.','A resposta insuficiente determina avanço no algoritmo e suporte especializado.'],'Sedação e cessação da crise não são sinônimos.',['Cada etapa tem avaliação de resposta e plano seguinte.'],['epi']);
 add('013','neuro2','sgb-imunoterapia',3,'Paciente com SGB há uma semana não consegue caminhar sem ajuda. Não há contraindicação individual às opções usuais. Qual plano tem suporte na diretriz EAN/PNS?',[
 ['Imunoglobulina intravenosa ou plasmaférese, além de suporte','Há opções específicas para doença com limitação relevante.'],
 ['Corticoide oral isolado como substituto equivalente','Não é terapia específica eficaz estabelecida para o quadro.'],
 ['Apenas observação domiciliar até ocorrer hipoxemia','Gravidade funcional exige avaliação e monitorização apropriadas.'],
 ['Combinar sistematicamente plasmaférese seguida imediatamente de imunoglobulina','A sequência rotineira não é recomendada.']
 ],['Integre tempo de evolução e capacidade funcional.','Escolha a terapia específica considerando disponibilidade, contraindicações e suporte.'],'Reduzir o manejo à saturação de oxigênio.',['Imunoterapia não substitui vigilância respiratória e autonômica.'],['gbs']);
 add('014','neuro2','sgb-evolucao',3,'Homem inicialmente diagnosticado com SGB continua piorando progressivamente dez semanas após o início. Não se trata apenas de recuperação lenta: há novos déficits objetivos. Qual hipótese de revisão deve ser considerada?',[
 ['Polirradiculoneuropatia desmielinizante inflamatória crônica de início agudo','Progressão prolongada muda a avaliação do diagnóstico inicial.'],
 ['A piora confirma para sempre uma doença monofásica aguda','A cronologia deve ser reavaliada diante de progressão além da janela esperada.'],
 ['A duração prova uma miastenia ocular isolada','O tempo, sozinho, não estabelece esse diagnóstico e o quadro não é ocular.'],
 ['A evolução exclui qualquer neuropatia inflamatória','Uma neuropatia inflamatória crônica continua no diferencial.']
 ],['Diferencie recuperação demorada de progressão objetiva persistente.','A cronologia é um critério para revisar classificação e plano.'],'Não usar o rótulo inicial para ignorar dados novos.',['Reavaliação diagnóstica faz parte do seguimento.'],['gbs']);
 add('015','neuro2','sgb-tratamento-combinado',3,'Em uma internação por SGB, propõe-se plasmaférese imediatamente seguida de imunoglobulina para todos, mesmo sem indicação individual adicional. Qual é a melhor avaliação?',[
 ['A combinação sequencial rotineira não é recomendada','As opções não precisam ser usadas automaticamente em sequência.'],
 ['É obrigatória em todo paciente incapaz de andar','Gravidade não estabelece benefício da sequência universal.'],
 ['É necessária para tornar corticoide oral eficaz','A associação proposta não transforma corticoide em terapia comprovada.'],
 ['Dispensa fisioterapia e suporte por substituir toda assistência','Tratamento específico não elimina cuidados de suporte.']
 ],['Avalie evidência de benefício da combinação, não apenas a existência de dois tratamentos.','Uma opção eficaz não implica que sua soma automática seja superior.'],'Confundir intensidade terapêutica com benefício demonstrado.',['Escolher uma estratégia fundamentada e acompanhar resposta.'],['gbsA']);
 add('016','neuro2','sgb-corticoide',2,'Paciente com SGB pergunta por que não receberá prednisona como única imunoterapia, já que sua doença foi explicada como imunomediada. Qual resposta é melhor?',[
 ['Mecanismo imunológico não garante benefício de todo imunossupressor','A escolha depende de evidência específica da doença.'],
 ['Prednisona é sempre superior à imunoglobulina na SGB','A afirmação contraria as recomendações.'],
 ['Nenhuma intervenção modifica a recuperação','Imunoglobulina e plasmaférese têm papel terapêutico.'],
 ['Corticoide torna dispensável a avaliação de deglutição','Avaliação de suporte permanece necessária independentemente da medicação.']
 ],['Parta da evidência para o tratamento, sem deduzir eficácia apenas da fisiopatologia.','Explique a diferença entre plausibilidade e benefício demonstrado.'],'Aplicar o mesmo medicamento a todas as doenças autoimunes.',['Tratamento precisa de evidência específica.'],['gbsA']);
 add('017','neuro3','em-pseudosurto',2,'Mulher com EM tem piora de uma fraqueza antiga durante febre e disúria. Não há novo déficit focal descrito. Antes de classificar como surto e iniciar tratamento específico, qual avaliação é prioritária?',[
 ['Pesquisar infecção e outros precipitantes de pseudossurto','A piora associada a febre pode refletir recrudescimento de sintomas prévios.'],
 ['Diagnosticar automaticamente nova atividade inflamatória','O contexto fornece uma explicação alternativa a investigar.'],
 ['Ignorar a febre porque não interfere na função neurológica','Temperatura e infecção podem agravar sintomas.'],
 ['Suspender definitivamente todo tratamento de EM sem avaliação','A situação exige esclarecimento, não decisão definitiva indiscriminada.']
 ],['Compare déficit antigo e manifestação nova.','Procure precipitantes tratáveis antes de chamar toda piora de surto.'],'Não presumir que toda deterioração é nova lesão desmielinizante.',['O contexto sistêmico modifica a interpretação neurológica.'],['ms']);
 add('018','neuro3','em-reavaliacao',3,'Paciente com EM apresenta piora transitória de sintomas antigos após calor intenso. Recupera o estado basal ao resfriar-se, sem novo achado. Qual interpretação é mais prudente?',[
 ['Considerar pseudossurto relacionado ao calor e reavaliar se persistir','A reversibilidade após retirar o precipitante favorece recrudescimento transitório.'],
 ['Usar a piora transitória para comprovar progressão permanente','O episódio descrito não demonstra incapacidade irreversível.'],
 ['Concluir que nunca mais precisa de acompanhamento','A explicação provável não elimina seguimento e avaliação de novos eventos.'],
 ['Tratar toda exposição ao calor como crise convulsiva','Não há manifestação convulsiva no enunciado.']
 ],['Observe relação temporal com o precipitante e retorno ao basal.','Persistência ou nova característica deve motivar nova avaliação.'],'Usar intensidade subjetiva isolada para concluir atividade inflamatória.',['Duração e contexto ajudam a classificar a piora.'],['ms']);
 add('019','neuro3','miastenia-crise',3,'Paciente com miastenia generalizada desenvolve dificuldade crescente de deglutição e fraqueza respiratória. A equipe suspeita de crise iminente. Qual é o plano mais apropriado?',[
 ['Internação monitorizada, avaliação ventilatória e terapia rápida como IVIG ou plasmaférese','Ameaça bulbar e respiratória exige suporte e tratamento dirigido.'],
 ['Apenas consulta eletiva, pois ptose não é dolorosa','O risco atual é ventilatório e bulbar, não dor ocular.'],
 ['Esperar parada respiratória antes de avaliar via aérea','A avaliação deve antecipar deterioração.'],
 ['Aumentar sedativos e orientar repouso domiciliar','Pode agravar risco sem tratar a emergência.']
 ],['Reconheça ameaça funcional vital na doença da junção neuromuscular.','A escolha terapêutica acompanha suporte e busca de desencadeantes.'],'Focar no sintoma ocular conhecido e ignorar o novo risco bulbar.',['Crise demanda avaliação hospitalar.'],['mg']);
 add('020','neuro3','miastenia-escalonamento',3,'Paciente com miastenia permanece com sintomas relevantes apesar de tratamento sintomático e apresenta exacerbações. Quer apenas aumentar doses por conta própria. Qual princípio é mais adequado?',[
 ['Reavaliar atividade e necessidade de estratégia imunoterápica especializada','Controle insuficiente demanda revisão do plano e dos riscos.'],
 ['A resposta parcial prova que nunca precisará de imunoterapia','O sintomático não define sozinho o controle imunológico.'],
 ['Usar IVIG continuamente em qualquer quadro ocular leve','Terapias de resgate não são universais para toda gravidade.'],
 ['Suspender acompanhamento porque a doença é flutuante','Flutuação não elimina necessidade de avaliar exacerbações.']
 ],['Diferencie alívio sintomático e controle da doença.','Escalone conforme gravidade e avaliação especializada, não por automedicação.'],'Tratar toda piora apenas como necessidade de mais sintomático.',['Reavaliação orienta opções e monitorização.'],['mg']);
 add('021','gastro','celiaca-iga',3,'Adulto com diarreia e anemia ferropriva tem tTG-IgA negativo, IgA total muito baixa e segue consumindo glúten. Qual avaliação adicional é mais apropriada?',[
 ['Sorologia baseada em IgG e avaliação especializada com biópsias conforme o contexto','A deficiência de IgA limita a interpretação da sorologia inicial.'],
 ['Excluir doença celíaca apenas pelo tTG-IgA negativo','Um teste dependente da classe deficiente pode não detectar a doença.'],
 ['Diagnosticar celíaca sem outro dado porque há anemia','Anemia tem múltiplas causas e não confirma a hipótese.'],
 ['Usar apenas CEA para confirmar enteropatia','CEA não é teste diagnóstico de doença celíaca.']
 ],['Verifique se o exame é interpretável no paciente.','A deficiência imunoglobulínica altera a estratégia diagnóstica.'],'Interpretar resultado negativo sem analisar validade.',['IgA total contextualiza tTG-IgA.'],['cd26']);
 add('022','gastro','celiaca-dieta',2,'Mulher com suspeita de doença celíaca planeja retirar todo glúten hoje e realizar a investigação depois. Ainda não foi avaliada por especialista. Qual orientação sobre o processo diagnóstico é melhor?',[
 ['Explicar que a retirada prévia pode prejudicar os testes e planejar investigação antes da exclusão','A exposição alimentar interfere na sensibilidade diagnóstica.'],
 ['Afirmar que a dieta não interfere em sorologia ou histologia','A afirmação ignora a relação do teste com a exposição.'],
 ['Usar melhora clínica isolada como confirmação definitiva','Resposta à dieta não identifica necessariamente a causa.'],
 ['Descartar investigação porque não há emagrecimento','A apresentação pode ser variada.']
 ],['Discuta a sequência entre investigação e intervenção.','Se já houve restrição alimentar, a avaliação especializada decide a estratégia, sem desafio improvisado.'],'Confundir resposta sintomática com diagnóstico confirmado.',['Planejar testes antes de alterar exposição relevante.'],['cd']);
 add('023','gastro','colite-grave',3,'Adulto com retocolite apresenta diarreia sanguinolenta intensa e repercussão sistêmica. Após avaliação hospitalar, foi classificado como colite aguda grave, sem perfuração. Qual abordagem inicial é mais coerente?',[
 ['Corticoterapia intravenosa e avaliação paralela do risco de cirurgia','O manejo requer tratamento e vigilância de falha/complicação.'],
 ['Apenas mesalazina oral e alta sem reavaliação','A gravidade hospitalar não é compatível com essa simplificação.'],
 ['Adiar qualquer avaliação cirúrgica até falência de múltiplos órgãos','A avaliação deve ser precoce.'],
 ['Apenas antidiarreico para mascarar o número de evacuações','Controle aparente do sintoma não trata a inflamação grave.']
 ],['Classifique gravidade antes de selecionar o local e a intensidade do tratamento.','Busque infecção e complicações, e estabeleça critérios de resposta.'],'Não usar redução do sintoma como único indicador de segurança.',['Manejo de colite grave é multidisciplinar.'],['uc']);
 add('024','gastro','colite-resgate',3,'Pessoa internada por colite ulcerativa grave tem pouca melhora após 72 horas de corticoterapia intravenosa. Não há indicação de alta. Qual é a melhor estratégia geral?',[
 ['Discutir terapia de resgate e possibilidade cirúrgica com equipe especializada','Falha inicial exige decisão ativa, não prolongamento indefinido.'],
 ['Manter o mesmo plano sem prazo de avaliação','A ausência de resposta pede revisão.'],
 ['Dar alta porque já completou três dias de medicação','Tempo de tratamento isolado não garante estabilidade.'],
 ['Considerar cirurgia proibida por se tratar de doença inflamatória','A cirurgia faz parte das opções em cenários selecionados.']
 ],['Avalie resposta objetiva e sinais de complicação.','Defina resgate ou cirurgia conforme evolução e equipe, considerando preferências e riscos.'],'Confundir tratamento iniciado com tratamento eficaz.',['Avaliar resposta em tempo definido.'],['ucN']);
 add('025','onco','neutropenia-febril',3,'Paciente em quimioterapia chega prostrado, febril, com neutropenia conhecida. Não há foco evidente. Culturas podem ser colhidas prontamente. Qual conduta tem prioridade?',[
 ['Tratar como emergência e iniciar antibiótico empírico sem esperar identificar o foco','A ausência de foco não exclui infecção grave.'],
 ['Esperar a cultura identificar o agente para iniciar qualquer antibiótico','A espera pode atrasar terapia necessária.'],
 ['Alta com antitérmico porque não há secreção purulenta','Imunossupressão pode reduzir manifestações locais.'],
 ['Solicitar radiografia de rotina e só tratar se houver infiltrado','A investigação não depende de pneumonia demonstrada.']
 ],['Integre tratamento antineoplásico, febre e vulnerabilidade infecciosa.','Colha exames sem criar atraso indevido para o antibiótico.'],'Ausência de inflamação exuberante não significa baixo risco.',['Suspeita fundamentada já exige ação.'],['fn']);
 add('026','onco','neutropenia-risco',3,'Pessoa com sepse neutropênica recebeu tratamento inicial e deseja alta imediata porque a febre cedeu. Qual elemento deve orientar a decisão de seguimento ambulatorial?',[
 ['Reavaliação de risco por equipe capacitada, estabilidade e condições de retorno','A decisão envolve evolução e segurança fora do hospital.'],
 ['Uma medida de temperatura normal é suficiente','Resposta pontual não determina risco global.'],
 ['Todo paciente com câncer deve obrigatoriamente ficar internado para sempre','A decisão não pode ignorar reavaliação individual.'],
 ['A ausência de cateter torna qualquer alta segura','Cateter é apenas uma parte do contexto.']
 ],['Distingua melhora inicial de baixo risco sustentado.','Incorpore condições clínicas e sociais, além de acesso rápido a atendimento.'],'Converter um sinal isolado em critério absoluto.',['Alta é decisão de risco, não apenas de temperatura.'],['fn']);
 add('027','onco','compressao-medular',3,'Homem com câncer conhecido apresenta dor dorsal progressiva, dificuldade nova para caminhar e retenção urinária. Qual é a atitude diagnóstica prioritária?',[
 ['Acionar avaliação emergencial e obter RM de coluna com urgência','Déficit neurológico em contexto oncológico sugere compressão medular.'],
 ['Aguardar consulta de rotina porque a dor começou antes da fraqueza','A alteração neurológica muda a urgência.'],
 ['Usar radiografia normal para excluir compressão','Radiografia não exclui a condição.'],
 ['Tratar apenas como constipação induzida por opioide','A hipótese não explica adequadamente o conjunto neurológico.']
 ],['Associe câncer e dor axial aos novos sinais motores e esfincterianos.','O objetivo é reconhecer ameaça neurológica potencialmente tratável.'],'Não se tranquilizar com exame simples incapaz de excluir a hipótese.',['O tempo de investigação importa para preservar função.'],['cord']);
 add('028','onco','compressao-imagem',2,'Paciente com suspeita de compressão medular metastática e déficit motor tem radiografia da coluna sem alteração relevante. Qual conclusão é adequada?',[
 ['A hipótese persiste e exige imagem apropriada urgente','Uma radiografia normal não encerra a investigação.'],
 ['O exame exclui lesão epidural e autoriza alta','A técnica não possui esse poder de exclusão.'],
 ['O achado torna impossível qualquer doença oncológica','Não há relação lógica entre normalidade radiográfica e exclusão universal.'],
 ['Apenas repetir radiografia em seis meses resolve a urgência','A estratégia não responde ao déficit atual.']
 ],['Escolha exame capaz de responder à hipótese.','A urgência deriva do quadro clínico, mesmo quando o teste inicial é pouco informativo.'],'Confundir exame realizado com hipótese investigada adequadamente.',['Resultado negativo depende da capacidade do método.'],['cord']);
 add('029','hema','lpa-urgencia',3,'Adulto apresenta sangramento, plaquetopenia e esfregaço fortemente suspeito de leucemia promielocítica aguda. A confirmação molecular foi enviada. Qual conduta específica deve ser discutida imediatamente com hematologia?',[
 ['Iniciar ATRA diante da suspeita, com suporte da coagulopatia','A demora pode agravar risco hemorrágico precoce.'],
 ['Aguardar obrigatoriamente o resultado molecular antes de qualquer terapia específica','A suspeita forte já determina urgência terapêutica.'],
 ['Considerar punção lombar a primeira medida em todo paciente','Procedimento invasivo pode ser perigoso na coagulopatia.'],
 ['Dar alta porque a confirmação ainda não existe','A instabilidade hematológica não permite essa conduta.']
 ],['Reconheça a associação entre padrão hematológico e emergência hemorrágica.','Confirmação e suporte acontecem em paralelo à conduta específica.'],'Exigir certeza molecular antes de reconhecer risco imediato.',['Suspeita de LPA é emergência.'],['apl'],'ATRA promove diferenciação de promielócitos; exige equipe especializada e monitorização, inclusive para síndrome de diferenciação.');
 add('030','hema','mieloma-diagnostico',2,'Homem com proteína monoclonal e 25% de plasmócitos clonais na medula tem lesões osteolíticas atribuídas à discrasia. Qual interpretação é mais adequada?',[
 ['Os achados sustentam mieloma ativo, não apenas uma gamopatia sem dano','Há clone plasmocitário e evento definidor atribuído à doença.'],
 ['Proteína monoclonal sempre significa MGUS, mesmo com dano ósseo','O dano atribuível altera a classificação.'],
 ['Mieloma exige que todos os componentes de CRAB estejam presentes','Não é necessário reunir todos.'],
 ['Lesão lítica é suficiente para escolher quimioterapia sem avaliação hematológica','Classificar não elimina estadiamento e decisão especializada.']
 ],['Relacione carga clonal e evento definidor.','Atribuição da lesão ao processo plasmocitário é parte do diagnóstico.'],'Não exigir uma síndrome completa com todos os sinais.',['Um critério qualificante pode mudar a classificação.'],['mm']);
 add('031','hema','mieloma-atribuicao',3,'Pessoa com pequena proteína monoclonal tem anemia ferropriva documentada por sangramento digestivo e não possui outro evento definidor demonstrado. Qual interpretação evita classificar mieloma ativo indevidamente?',[
 ['Investigar a discrasia, mas não atribuir automaticamente essa anemia ao clone','Dano de órgão precisa ser explicado no contexto da doença plasmocitária.'],
 ['Qualquer anemia mais proteína monoclonal confirma mieloma ativo','Coexistência não demonstra causalidade.'],
 ['A deficiência de ferro exclui para sempre qualquer doença plasmocitária','É possível haver condições concomitantes.'],
 ['Iniciar tratamento antineoplásico sem estudar medula ou outros critérios','A decisão exige critérios e avaliação especializada.']
 ],['Pergunte se o achado de órgão é atribuível ao clone.','Continue investigação adequada sem transformar associação em certeza.'],'Usar CRAB como lista sem raciocínio causal.',['Coexistência não é prova de causa.'],['mm']);
 add('032','hema','linfoma-biopsia',2,'Mulher com linfonodo cervical acessível, persistente e suspeito de linfoma está clinicamente estável e tem baixo risco cirúrgico. Qual procedimento oferece melhor avaliação diagnóstica inicial entre as opções?',[
 ['Biópsia excisional para avaliar tecido e arquitetura','A arquitetura contribui para classificar adequadamente o linfoma.'],
 ['Apenas dosar LDH para confirmar subtipo','LDH não substitui o estudo do tecido.'],
 ['Usar resposta a antibiótico como confirmação de histologia','Resposta clínica não define subtipo de neoplasia.'],
 ['Iniciar tratamento definitivo sem obtenção de material','A classificação requer investigação apropriada.']
 ],['A escolha depende de acessibilidade, risco e necessidade de tecido.','Se cirurgia trouxer risco excessivo, amostra por core pode ser alternativa; o caso descrito favorece excisão.'],'Confundir marcador de atividade com diagnóstico histológico.',['Preservar arquitetura pode ser decisivo.'],['lymph']);
 window.MASTER_EXPANDED_QUESTIONS=bank;
})();
