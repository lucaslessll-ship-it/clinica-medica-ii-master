/* Casos autorais. O índice de cada linha é persistido no histórico: acrescentar novas linhas ao fim de cada período. */
(() => {
  const add = (bank, topic, level, style, stem, options, answer, explanation) => {
    bank.push({t: topic, level, q: stem, o: options, a: answer, why: explanation,
      training: true, tag: style === 'F' ? 'Estilo faculdade' : 'Estilo residência',
      profile: style === 'F' ? 'estilo_fmp' : 'estilo_residencia'});
  };
  const p1 = add.bind(null, window.MASTER_P1_QUESTIONS);
  const p2 = add.bind(null, window.MASTER_QUESTIONS);

  p1('p1inf',1,'F','Homem de 67 anos tem febre, consolidação lobar e dois pares de hemoculturas com pneumococo. Qual achado mudaria a investigação para uma complicação pleural?',
    ['Escarro purulento na admissão','Dor pleurítica com derrame loculado','Leucocitose neutrofílica na admissão','Sopro tubário na área de consolidação'],1,
    'Febre com derrame loculado levanta a suspeita de derrame parapneumônico complicado. Os outros achados podem ocorrer na pneumonia sem complicação pleural.');
  p1('p1inf',2,'R','Paciente com prótese aórtica tem bacteremia persistente por S. aureus. O eco transtorácico tem janela limitada e não evidencia vegetação. Qual exame vem a seguir?',
    ['Ecocardiograma transtorácico com contraste','Angiotomografia coronariana','Cintilografia de perfusão miocárdica','Ecocardiograma transesofágico'],3,
    'Prótese e bacteremia persistente mantêm alta a suspeita de endocardite apesar do transtorácico. O transesofágico detalha a prótese e a região perivalvar.');
  p1('p1inf',3,'R','Mulher com pielonefrite obstrutiva foi drenada e está estável. Hemocultura e urina crescem E. coli sensível a ceftriaxona e resistente a ciprofloxacino. Qual ajuste do meropenem empírico é mais apropriado?',
    ['Trocar por ceftriaxona direcionada','Manter meropenem até o fim','Trocar por nitrofurantoína oral','Trocar por ciprofloxacino oral'],0,
    'Com foco controlado e isolado sensível, ceftriaxona direcionada permite descalonar. Nitrofurantoína não atinge adequadamente o parênquima e a bacteremia. O isolado é resistente à ciprofloxacina.');

  p1('p1arr',1,'F','Homem com palpitações tem ritmo irregular a 148 bpm, sem ondas P identificáveis, com QRS estreitos. Qual diagnóstico melhor explica o traçado?',
    ['Flutter atrial com condução variável','Taquicardia atrial multifocal','Fibrilação atrial com resposta rápida','Taquicardia por reentrada nodal'],2,
    'A irregularidade sem ondas atriais organizadas favorece fibrilação atrial. A taquicardia atrial multifocal tem ondas P identificáveis com pelo menos três morfologias.');
  p1('p1arr',2,'R','Mulher de 71 anos apresenta palpitações, QRS largo regular a 180 bpm, pressão de 74/42 mmHg e confusão. Há pulso central palpável. Qual intervenção é prioritária?',
    ['Amiodarona intravenosa em infusão','Cardioversão elétrica sincronizada','Desfibrilação elétrica não sincronizada','Manobra vagal e novo ECG'],1,
    'A taquicardia regular com pulso e instabilidade exige cardioversão sincronizada. A descarga não sincronizada se aplica quando a sincronização é inviável, como na TV polimórfica instável.');
  p1('p1arr',3,'R','Homem com fibrilação atrial persistente e início indeterminado quer cardioversão eletiva. Não usa anticoagulante e está estável. Qual estratégia permite cardioversão precoce?',
    ['Iniciar anticoagulação, excluir trombo por ETE e manter anticoagulação após o procedimento','Iniciar anticoagulação, excluir trombo por ETT e suspender ao recuperar ritmo sinusal','Usar antiagregante, excluir trombo por ETE e manter antiagregação após o procedimento','Realizar cardioversão e iniciar anticoagulação caso a fibrilação recorra'],0,
    'O eco transesofágico pode excluir trombo para abreviar a espera. A anticoagulação deve estar estabelecida antes e continuar por pelo menos quatro semanas, com manutenção posterior conforme risco embólico.');

  p1('p1has',1,'F','Paciente em uso regular de três anti-hipertensivos tem PA de 154/92 mmHg no consultório. A MAPA, feita com técnica adequada, mostra médias normais de dia e à noite. Qual interpretação é mais provável?',
    ['Hipertensão resistente confirmada','Hipertensão mascarada não controlada','Efeito do avental branco sob tratamento','Hipertensão noturna isolada'],2,
    'Pressão elevada no consultório e normal fora dele durante o tratamento caracteriza efeito do avental branco. A medida fora do consultório evita classificar o caso como resistência verdadeira.');
  p1('p1has',2,'R','Homem hipertenso evolui com dispneia aguda, estertores difusos e PA de 218/118 mmHg. Qual achado determina o manejo como emergência hipertensiva?',
    ['Elevação sistólica acima de 200 mmHg','Hipertrofia ventricular esquerda antiga','Uso irregular de três anti-hipertensivos','Edema pulmonar de início agudo'],3,
    'A emergência é definida pela lesão aguda de órgão-alvo. Edema pulmonar agudo exige tratamento monitorado e medicamentos tituláveis.');
  p1('p1has',3,'R','Paciente em tratamento com três anti-hipertensivos tem PA de 164/96 mmHg, potássio de 2,9 mEq/L e nódulo adrenal de 1 cm. Qual avaliação inicial aborda melhor a causa secundária suspeita?',
    ['Dosar aldosterona e renina após corrigir potássio','Solicitar cateterismo de veias adrenais como rastreio','Repetir tomografia e definir a causa pela lateralidade','Medir cortisol urinário para confirmar o subtipo'],0,
    'Hipocalemia e hipertensão resistente sugerem aldosteronismo primário. A triagem é bioquímica, com correção da hipocalemia e interpretação da interferência dos medicamentos. A imagem isolada não localiza secreção.');

  p1('p1dm',1,'F','Paciente com DM1 acorda sudorético e tremendo. Mede glicemia de 56 mg/dL, está alerta e consegue engolir. Qual conduta imediata?',
    ['Aplicar glucagon e aguardar uma hora','Ingerir carboidrato de absorção rápida','Ingerir refeição rica em gordura','Reduzir basal e repetir a medida'],1,
    'Hipoglicemia com deglutição segura pode ser tratada com carboidrato rápido, com nova glicemia em cerca de 15 minutos. Ajuste de insulina pode ser discutido depois.');
  p1('p1dm',2,'R','Paciente em uso de empagliflozina tem vômitos após cirurgia, glicemia de 178 mg/dL, pH 7,23 e beta-hidroxibutirato de 5,2 mmol/L. Qual distúrbio explica o quadro?',
    ['Cetose de jejum sem acidose','Estado hiperosmolar hiperglicêmico','Cetoacidose diabética euglicêmica','Acidose hiperclorêmica isolada'],2,
    'Acidose e cetonemia importante sustentam cetoacidose apesar da glicemia abaixo de 200 mg/dL. Jejum perioperatório e inibidor de SGLT2 são precipitantes.');
  p1('p1dm',3,'R','Paciente com cetoacidose tem glicemia de 390 mg/dL e potássio de 3,0 mEq/L. Recebeu hidratação inicial e tem diurese preservada. Qual é a próxima sequência?',
    ['Iniciar insulina e adiar potássio até nova gasometria','Iniciar bicarbonato e insulina no mesmo acesso','Iniciar insulina e glicose antes de repor potássio','Repor potássio e aguardar nível seguro para insulina'],3,
    'Insulina reduz ainda mais o potássio sérico. Com K abaixo de 3,5 mEq/L, o consenso de crises hiperglicêmicas orienta repor antes da infusão de insulina.');

  p1('p1tir1',1,'F','Mulher com palpitações, TSH suprimido, T4 livre elevado e TRAb positivo tem captação difusamente aumentada. Qual etiologia é mais provável?',
    ['Doença de Graves','Tireoidite subaguda','Adenoma tóxico','Tireotoxicose factícia'],0,
    'TRAb positivo e captação difusa elevada indicam Graves. Na tireoidite destrutiva e na exposição exógena, a captação tende a estar reduzida.');
  p1('p1tir1',2,'R','Paciente com doença de Graves inicia metimazol e retorna com febre e odinofagia. Qual a conduta até esclarecer a causa?',
    ['Reduzir dose e solicitar transaminases','Manter dose e solicitar painel viral','Suspender uso e solicitar hemograma','Trocar por propiltiouracil de imediato'],2,
    'Febre e odinofagia durante uso de antitireoidiano exigem suspensão e avaliação urgente de neutrófilos por possível agranulocitose.');
  p1('p1tir1',3,'R','Sete semanas após parto, mulher apresenta tremor e palpitações. TRAb é negativo e o Doppler não mostra hipervascularização. Sem dor cervical ou orbitopatia. Qual manejo inicial é mais coerente?',
    ['Metimazol até normalizar o TSH','Betabloqueador se sintomática e seguimento','Propiltiouracil durante a amamentação','Levotiroxina durante a fase tireotóxica'],1,
    'O padrão favorece tireoidite pós-parto destrutiva. Tireostáticos bloqueiam síntese e têm pouco benefício nesse contexto. Acompanhe eventual fase hipotireoidiana.');

  p1('p1tir2',1,'F','Mulher com TSH normal tem nódulo tireoidiano sólido de 1,8 cm. Qual característica ultrassonográfica aumenta a suspeita de malignidade?',
    ['Arquitetura espongiforme difusa','Componente cístico predominante','Artefato em cauda de cometa no coloide','Formato mais alto que largo'],3,
    'Formato mais alto que largo é uma característica de maior risco nos sistemas de estratificação ultrassonográfica. A indicação de punção também considera tamanho e os demais achados.');
  p1('p1tir2',2,'R','Nódulo tireoidiano de 2,1 cm é descoberto em paciente com TSH persistentemente suprimido. Ainda não foi comprovada autonomia. Qual exame orienta o próximo passo?',
    ['Cintilografia da tireoide','Dosagem de tireoglobulina','Pesquisa de anticorpo anti-TPO','Ultrassonografia com elastografia'],0,
    'Com TSH suprimido, a cintilografia identifica se o nódulo é hiperfuncionante e ajuda a orientar a necessidade de punção.');
  p1('p1tir2',3,'R','Mulher com Graves interrompeu o tratamento e chega com febre, agitação e taquiarritmia. O quadro sugere tempestade tireotóxica. Já foram iniciados suporte e glicocorticoide. Como organizar o uso de iodeto e tireostático?',
    ['Iniciar iodeto e administrar tireostático uma hora depois','Iniciar iodeto e suspender tireostático até normalizar a frequência','Dar tireostático e aguardar ao menos uma hora para o iodeto','Iniciar tireostático e adiar iodeto até normalizar T4 livre'],2,
    'Na sequência recomendada pela ATA, dê o tireostático antes do iodeto para bloquear a síntese hormonal e evitar fornecer substrato para nova produção.');

  p1('p1neuro',1,'F','Paciente apresenta hiperpigmentação, hipotensão postural e hipercalemia. Qual resultado favorece insuficiência adrenal primária?',
    ['Cortisol baixo com ACTH elevado','Cortisol baixo com ACTH reduzido','Cortisol alto com ACTH reduzido','Cortisol alto com ACTH elevado'],0,
    'Na insuficiência primária, perde-se a retroalimentação do cortisol e o ACTH aumenta. Deficiência mineralocorticoide explica a hipercalemia.');
  p1('p1neuro',2,'R','Mulher com massa selar de 3,4 cm tem prolactina discretamente elevada, resultado discordante do volume tumoral. Qual verificação laboratorial ajuda antes de definir a etiologia?',
    ['Repetir prolactina após teste com GnRH','Medir prolactina em amostra diluída','Dosar IGF-1 após supressão por glicose','Repetir ACTH após dexametasona'],1,
    'O efeito gancho pode subestimar níveis muito altos de prolactina. A dosagem com diluições ajuda a separar macroprolactinoma de efeito de haste.');
  p1('p1neuro',3,'R','Após cirurgia hipofisária, paciente tem diurese de 420 mL/h, sódio de 151 mEq/L, osmolalidade urinária de 95 mOsm/kg e glicemia de 104 mg/dL. Qual interpretação é mais provável?',
    ['Diurese osmótica por hiperglicemia','Secreção inadequada de vasopressina','Perda cerebral de sal','Deficiência central de vasopressina'],3,
    'A urina está diluída apesar da hipernatremia, logo há perda de água livre por incapacidade de concentrar. O contexto pós-operatório favorece deficiência central de vasopressina.');

  p1('p1tele',1,'F','Paciente inicia primeira videoconsulta. Qual registro sustenta a rastreabilidade do atendimento?',
    ['Identificação do serviço e duração da chamada','Identificação do paciente e registro clínico do encontro','Registro da plataforma e gravação da câmera','Identificação do profissional e recibo eletrônico'],1,
    'É necessário identificar o paciente e documentar a avaliação, orientações e conduta no prontuário. Gravação não substitui registro clínico.');
  p1('p1tele',2,'R','Durante teleconsulta, paciente relata disartria e fraqueza de início súbito há 35 minutos. Que encaminhamento é prioritário?',
    ['Agendar avaliação presencial para o mesmo turno','Solicitar tomografia ambulatorial em caráter urgente','Orientar reavaliação por vídeo após repouso','Acionar emergência e informar horário de início'],3,
    'Suspeita de AVC exige transferência urgente para avaliação presencial, com registro do horário de início ou último momento conhecido sem sintomas.');
  p1('p1tele',3,'F','Idoso com perda auditiva quer que a filha participe da teleconsulta e compartilhe o laudo. Qual abordagem melhor preserva autonomia e sigilo?',
    ['Confirmar com o paciente quem participa e o que pode ser compartilhado','Enviar o prontuário integral à familiar indicada no cadastro','Pedir à familiar que decida quais dados apresentar na consulta','Encerrar a chamada e reagendar atendimento exclusivo com a familiar'],0,
    'A participação de terceiros depende da vontade do paciente capaz. Registre o consentimento e compartilhe somente o necessário para a finalidade autorizada.');

  p2('reuma1',1,'F','Mulher de 45 anos tem fraqueza proximal simétrica, disfagia e CK de 3.100 U/L. Qual achado cutâneo favorece dermatomiosite?',
    ['Livedo reticular em membros inferiores','Pápulas violáceas sobre articulações dos dedos','Púrpura palpável em pernas e tornozelos','Eritema malar poupando os sulcos nasolabiais'],1,
    'Pápulas de Gottron sobre superfícies extensoras apoiam dermatomiosite. Livedo, púrpura e eritema malar apontam para outros mecanismos.');
  p2('reuma1',2,'R','Homem com esclerose sistêmica difusa passa de PA 108/68 para 172/105 mmHg. Creatinina duplica e o esfregaço mostra esquizócitos. Qual tratamento deve ser iniciado ao reconhecer a complicação?',
    ['Captopril com titulação monitorada','Losartana como tratamento de primeira escolha','Nifedipino como monoterapia inicial','Metilprednisolona em pulsoterapia inicial'],0,
    'O quadro é compatível com crise renal esclerodérmica. O IECA é prioritário mesmo com disfunção renal. Glicocorticoides em altas doses podem aumentar o risco de crise.');
  p2('reuma1',3,'R','Paciente com Sjögren desenvolve aumento unilateral de parótida há três meses, púrpura, C4 baixo e adenopatia cervical. Qual investigação é prioritária?',
    ['Teste de Schirmer e colorações da superfície ocular','Sialometria e ajuste de terapia para xerostomia','Avaliação da lesão com obtenção de tecido representativo','Biópsia de glândula salivar labial para reclassificação'],2,
    'Aumento parotídeo persistente com hipocomplementemia e adenopatia exige investigação de linfoma. O tecido deve vir da lesão ou de linfonodo representativo, conforme avaliação especializada.');

  p2('reuma2',1,'F','Mulher com LES em seguimento desenvolve edema e pressão mais alta. Qual padrão urinário favorece acometimento glomerular?',
    ['Piúria com nitrito positivo','Glicosúria com glicemia normal','Cristalúria com hematúria terminal','Proteinúria com cilindros hemáticos'],3,
    'Cilindros hemáticos e proteinúria sugerem glomerulonefrite. Nitrito e piúria favorecem infecção, enquanto glicosúria normoglicêmica sugere lesão tubular.');
  p2('reuma2',2,'R','Paciente com TVP proximal não provocada e síndrome antifosfolípide confirmada por tripla positividade persistente concluiu a fase inicial com heparina. Qual estratégia de manutenção é preferida?',
    ['Rivaroxabana em dose terapêutica','Varfarina com alvo de INR 2–3','Ácido acetilsalicílico em baixa dose','Clopidogrel em monoterapia'],1,
    'Antagonista da vitamina K é preferido após trombose venosa na SAF de alto risco. Anticoagulantes orais diretos não são a escolha no perfil triplo positivo.');
  p2('reuma2',3,'R','Homem com glomerulonefrite rapidamente progressiva e hemorragia alveolar tem PR3-ANCA positivo e biópsia renal pauci-imune. Qual esquema é apropriado para indução?',
    ['Metotrexato associado a glicocorticoide','Azatioprina associada a glicocorticoide','Rituximabe associado a glicocorticoide','Micofenolato associado a hidroxicloroquina'],2,
    'Hemorragia alveolar e perda renal caracterizam vasculite grave. Rituximabe ou ciclofosfamida associados ao controle anti-inflamatório são opções de indução. Azatioprina é alternativa de manutenção.');

  p2('neuro1',1,'F','Jovem desmaia após ficar em pé em sala quente. A testemunha relata dois abalos breves. Qual dado favorece síncope reflexa apesar dos abalos?',
    ['Sudorese prévia e recuperação rápida da orientação','Desvio cefálico sustentado e cianose durante o evento','Mordedura lateral de língua e mialgia posterior','Confusão prolongada e amnésia após o evento'],0,
    'Pródromo autonômico e reorientação rápida favorecem síncope. Abalos breves podem ocorrer por hipoperfusão e não definem epilepsia.');
  p2('neuro1',2,'R','Homem de 70 anos tem síncope durante caminhada em subida, sem pródromo. ECG mostra bloqueio bifascicular. Qual próximo passo é mais adequado?',
    ['Alta com teste de inclinação ambulatorial','Observação monitorizada e avaliação cardiológica','Alta com orientação para aumentar ingestão de sal','Investigação ambulatorial inicial com eletroencefalograma'],1,
    'Síncope no esforço e ECG anormal sugerem risco cardíaco. Monitorização e avaliação dirigida são prioritárias sobre testes para síncope reflexa ou epilepsia.');
  p2('neuro1',3,'R','Paciente com insuficiência hepática aguda e bloqueio atrioventricular de segundo grau mantém crise tônico-clônica após benzodiazepínico em dose adequada. Há acesso venoso e suporte de via aérea. Qual fármaco de segunda linha é preferível nesse contexto?',
    ['Valproato intravenoso em dose de ataque','Fenitoína intravenosa em dose de ataque','Lacosamida intravenosa em dose de ataque','Levetiracetam intravenoso em dose de ataque'],3,
    'Levetiracetam em dose de ataque é uma opção de segunda linha. A insuficiência hepática afasta valproato, enquanto fenitoína e lacosamida podem piorar a condução cardíaca.');

  p2('neuro2',1,'F','Duas semanas após gastroenterite, paciente apresenta fraqueza simétrica que ascendeu dos pés para as coxas. Qual achado favorece polirradiculoneuropatia em vez de mielopatia?',
    ['Nível sensitivo torácico bem delimitado','Sinal de Babinski bilateral','Abolição dos reflexos tendinosos','Espasticidade após a fase inicial'],2,
    'A arreflexia com progressão ascendente favorece Guillain-Barré. Nível sensitivo e sinais piramidais sustentam avaliação da medula.');
  p2('neuro2',2,'R','Paciente deixa de andar sem ajuda após quatro dias de fraqueza ascendente e arreflexia. Proteína no líquor ainda normal, sem pleocitose. Qual conduta é apropriada?',
    ['Repetir líquor e adiar terapia até dissociação','Iniciar imunoglobulina e monitorar a função respiratória','Iniciar metilprednisolona e observar a marcha','Aguardar eletroneuromiografia antes do tratamento'],1,
    'Proteína normal na primeira semana não exclui Guillain-Barré. Incapacidade de caminhar é indicação de imunoterapia, e o risco respiratório exige vigilância.');
  p2('neuro2',3,'R','Durante internação por Guillain-Barré, paciente apresenta disfagia, tosse fraca e queda da capacidade vital de 27 para 16 mL/kg. Saturação é de 97% em ar ambiente. Qual decisão é prioritária?',
    ['Administrar oxigênio e repetir oximetria em quatro horas','Iniciar ventilação não invasiva e manter observação em enfermaria','Transferir à UTI e preparar proteção eletiva de via aérea','Solicitar gasometria e aguardar elevação de CO₂ para intervir'],2,
    'Disfunção bulbar e queda rápida da capacidade vital indicam insuficiência ventilatória iminente. Saturação preservada pode mascarar o risco e não justifica esperar hipercapnia.');

  p2('neuro3',1,'F','Mulher apresenta ptose e diplopia que pioram ao final do dia. Pupilas e sensibilidade são normais. Qual localização melhor explica a fatigabilidade?',
    ['Junção neuromuscular','Trato corticoespinal','Nervo oculomotor compressivo','Fibras sensitivas de grande calibre'],0,
    'Fatigabilidade ocular com pupilas poupadas sugere disfunção da junção neuromuscular. Uma lesão compressiva não explica bem a flutuação típica.');
  p2('neuro3',2,'R','Paciente com esclerose múltipla volta a apresentar fraqueza antiga durante febre e disúria. O exame retorna ao basal quando a febre cede. Qual interpretação orienta a conduta?',
    ['Surto desmielinizante que exige corticoide imediato','Progressão da doença que exige troca de terapia','Recrudescimento transitório associado à infecção','Evento vascular que exige dupla antiagregação'],2,
    'Reaparecimento transitório de déficit antigo com febre favorece pseudossurto. Trate o gatilho e reavalie a persistência de sintomas após a resolução.');
  p2('neuro3',3,'R','Paciente com miastenia chega com fala anasalada, acúmulo de secreções e piora da força respiratória, sem bradicardia ou diarreia. Qual plano inicial aborda o risco imediato?',
    ['Aumentar piridostigmina e reavaliar a força após observação','Iniciar prednisona oral e observar a deglutição em enfermaria','Introduzir azatioprina e manter a dose habitual de piridostigmina','Proteger via aérea conforme evolução e iniciar terapia de resgate'],3,
    'Comprometimento bulbar e respiratório indica crise miastênica. Monitorização intensiva e imunoglobulina ou plasmaférese são prioritárias, junto do suporte ventilatório.');

  p2('gastro',1,'F','Mulher com diarreia crônica e deficiência de ferro ainda consome glúten. Qual triagem sorológica inicial é mais apropriada?',
    ['Antiendomísio IgA e IgG total','Antitransglutaminase IgA e IgA total','Antigliadina IgG e calprotectina fecal','Antitransglutaminase IgG e dosagem de albumina'],1,
    'Antitransglutaminase IgA com IgA total é a triagem inicial. A dosagem total identifica deficiência de IgA, situação em que ensaios IgG são úteis.');
  p2('gastro',2,'R','Homem com diarreia sanguinolenta apresenta inflamação contínua desde o reto até o cólon transverso. Qual achado adicional faria reconsiderar o diagnóstico em favor de Crohn?',
    ['Friabilidade da mucosa retal','Úlceras superficiais no cólon distal','Fístula perianal complexa','Urgência evacuatória e tenesmo'],2,
    'Fístula perianal complexa favorece doença transmural, típica de Crohn. Friabilidade superficial e tenesmo também cabem na retocolite.');
  p2('gastro',3,'R','Paciente com retocolite extensa é internado por oito evacuações sanguinolentas ao dia e taquicardia. Após três dias de corticoide intravenoso, mantém oito evacuações diárias e PCR de 62 mg/L. Não há perfuração. Qual próximo passo?',
    ['Manter a mesma dose de corticoide por mais uma semana','Trocar para prednisona oral e programar retorno breve','Aumentar mesalazina e reavaliar o sangramento em sete dias','Avaliar terapia de resgate e envolver cirurgia colorretal'],3,
    'A ausência de resposta no terceiro dia indica alto risco de falha do corticoide. Discutir infliximabe ou ciclosporina conforme o caso e envolver equipe cirúrgica sem adiar.');

  p2('hema',1,'F','Homem de 69 anos tem dor óssea, anemia, componente monoclonal e lesões líticas. Qual hipótese integra melhor os achados?',
    ['Macroglobulinemia de Waldenström','Gamopatia monoclonal indeterminada','Mieloma múltiplo com lesão óssea','Linfoma linfocítico disseminado'],2,
    'A lesão óssea lítica e a anemia sugerem dano de órgão relacionado à discrasia plasmocitária. A confirmação depende de avaliar plasmócitos clonais ou plasmocitoma.');
  p2('hema',2,'R','Pessoa com adenopatia cervical persistente e sintomas B tem tomografia suspeita de linfoma. O linfonodo é acessível e não há contraindicação cirúrgica. Qual amostra é preferível para classificação inicial?',
    ['Punção aspirativa por agulha fina','Biópsia excisional do linfonodo','Aspirado de medula óssea isolado','Citometria de fluxo em sangue periférico'],1,
    'A biópsia excisional permite avaliar arquitetura, imunofenótipo e outros marcadores necessários à classificação. Punção aspirativa isolada pode ser insuficiente.');
  p2('hema',3,'R','Paciente com suspeita de leucemia aguda tem promielócitos anormais, múltiplos bastonetes de Auer, fibrinogênio baixo e sangramento gengival. O resultado para PML::RARA só sai no dia seguinte. Qual conduta imediata?',
    ['Iniciar ATRA e corrigir a coagulopatia','Administrar hidroxiureia e aguardar confirmação','Iniciar indução convencional após novo hemograma','Corrigir a coagulopatia e adiar terapia diferenciadora'],0,
    'Suspeita de leucemia promielocítica é emergência. ATRA deve ser iniciado sem aguardar confirmação molecular, junto de suporte intensivo à coagulopatia.');

  p2('onco',1,'F','Após início de quimioterapia para linfoma volumoso, qual combinação laboratorial favorece síndrome de lise tumoral?',
    ['Hipercalemia, hiperfosfatemia e hiperuricemia','Hipercalemia, hipofosfatemia e hipouricemia','Hipocalemia, hiperfosfatemia e hipouricemia','Hipocalemia, hipofosfatemia e hiperuricemia'],0,
    'Lise celular libera potássio e fósforo. Degradação de ácidos nucleicos aumenta ácido úrico e pode haver hipocalcemia secundária à elevação do fósforo.');
  p2('onco',2,'R','Oito dias após quimioterapia, paciente tem temperatura de 38,8 °C, neutrófilos de 150/mm³ e pressão de 86/54 mmHg. Qual medida antimicrobiana é imediata?',
    ['Colher culturas e iniciar ceftriaxona intravenosa','Colher culturas e iniciar ciprofloxacino oral','Colher culturas e iniciar cefepima intravenosa','Colher culturas e iniciar vancomicina isolada'],2,
    'Neutropenia febril com instabilidade exige antibiótico antipseudomonas intravenoso sem atraso e manejo simultâneo da sepse. A coleta de culturas não deve atrasar a terapia.');
  p2('onco',3,'F','Paciente com câncer de próstata metastático apresenta dor torácica vertebral, fraqueza progressiva nas pernas e retenção urinária. Qual conduta prioriza a preservação neurológica?',
    ['Cintilografia óssea e ajuste de analgesia','Tomografia localizada e reavaliação funcional','Corticoterapia após confirmação em biópsia vertebral','Dexametasona e ressonância urgente da coluna'],3,
    'Déficit motor e disfunção esfincteriana sugerem compressão medular maligna. Inicie dexametasona e organize ressonância urgente com avaliação especializada.');
  p2('gastro',2,'F','Paciente de 57 anos, assintomático e sem contraindicação à endoscopia, tem teste imunoquímico fecal positivo no rastreamento. Qual exame completa a investigação?',
    ['Colonoscopia diagnóstica','Novo teste imunoquímico fecal','Retossigmoidoscopia flexível','Colonografia por tomografia'],0,
    'Resultado fecal positivo requer colonoscopia para identificar a causa e permitir biópsia ou polipectomia. Repetir o teste fecal pode atrasar a investigação.');
})();
