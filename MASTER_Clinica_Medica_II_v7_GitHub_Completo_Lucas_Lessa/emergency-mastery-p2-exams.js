/* Itens autorais suplementares. Cada registro traz conceito, nível, competência, caso e
   cinco pares opção/comentário. A primeira opção de origem é o gabarito sem embaralhar. */
(()=>{
'use strict';
function add(id,records){
 for(const record of records.trim().split(/\n\s*\n/)){
  const [meta,stem,...options]=record.trim().split('\n').map(line=>line.trim());
  const [concept,level,competency]=meta.split('|');
  const choices=options.map(entry=>entry.split('|'));
  if(choices.length!==5||choices.some(pair=>pair.length!==2||pair.some(text=>!text)))throw new Error('Questão incompleta: '+id+' · '+stem);
  window.UE_MASTERY_ASSESSMENTS[id].push([concept,Number(level),competency,stem,...choices]);
 }
}
add('sca',`
primeiros-minutos|1|Triagem
Adulto chega com desconforto torácico sugestivo de isquemia. Qual objetivo temporal orienta o primeiro ECG?
Obter ECG de 12 derivações em até 10 minutos|O primeiro traçado pode mudar imediatamente o fluxo de reperfusão.
Esperar primeiro resultado de troponina|A coleta complementa o ECG.
Agendar para até duas horas|Esse intervalo pode atrasar decisões tempo-dependentes.
Obter apenas após analgesia completa|O registro durante a dor é informativo.
Substituir por monitor de uma derivação|O monitor auxilia vigilância, mas não substitui o ECG diagnóstico.

primeiros-minutos|1|Reconhecimento
Mulher idosa com diabetes relata dispneia e sudorese súbitas, sem dor típica. Qual ação evita subdiagnóstico?
Incluir equivalente isquêmico e avaliar com ECG e estratificação|A manifestação pode ocorrer sem dor torácica clássica.
Excluir isquemia pela ausência de dor|Equivalentes anginosos são possíveis.
Diagnosticar hipoglicemia sem medir glicemia|Hipoglicemia é hipótese concorrente, não conclusão.
Usar idade como prova de infarto|Idade é fator de risco.
Solicitar teste ambulatorial sem avaliação atual|O início agudo requer triagem imediata.

territorio|2|Interpretação do ECG
Dor isquêmica em curso, com infradesnível em V1–V3 e ondas R proeminentes. Que extensão do ECG pode esclarecer uma oclusão posterior?
Obter derivações V7–V9|Alterações anteriores podem ser a imagem recíproca do supra posterior.
Obter somente DII longo|Ajuda a estudar ritmo, sem visualizar a parede posterior.
Usar somente V3R|É uma derivação direita.
Descartar IAM com supra pela ausência de supra anterior|Parede posterior está pouco representada no ECG padrão.
Interpretar o infradesnível como troca de eletrodos sem conferência|Verifique técnica, mas o padrão é clínico e requer investigação.

troponina|2|Interpretação
Dor começou há uma hora e primeira troponina de alta sensibilidade está abaixo do limite. ECG não diagnóstico. Qual próximo passo?
Seguir algoritmo seriado validado para o ensaio e tempo de sintomas|Uma amostra muito precoce pode anteceder a elevação.
Excluir SCA em qualquer caso|Tempo, contexto e intervalo entre amostras importam.
Pedir CK-MB como regra em lugar da série|Não substitui de rotina o protocolo com troponina.
Ignorar ECG se a troponina estiver baixa|ECG mantém valor independente.
Repetir só se ocorrer hipotensão|O quadro suspeito já sustenta seguimento.

reperfusao|3|Decisão de reperfusão
Paciente chega com IAM com supra e acesso rápido a angioplastia primária. Tem história de hemorragia intracraniana anterior. O que favorece a estratégia mecânica?
Angioplastia no tempo apropriado e alto risco associado à fibrinólise|A história de hemorragia intracraniana contraindica fibrinólise, e a intervenção mecânica é o caminho quando disponível.
Dar fibrinolítico e angioplastia como rotina sem revisar risco|O antecedente é contraindicação crítica para fibrinólise.
Esperar necrose documentada para encaminhar|A reperfusão é tempo-dependente.
Dar anticoagulante isolado como reperfusão definitiva|Ele não substitui a abertura da artéria.
Realizar teste de isquemia eletivo|Há diagnóstico agudo compatível no caso.

reperfusao|2|Estratificação
SCA sem supra com dor recorrente apesar de tratamento, instabilidade e alteração dinâmica no ECG. O que essa evolução indica?
Avaliação invasiva urgente conforme rede e risco|Instabilidade e isquemia recorrente favorecem intervenção urgente.
Alta com teste para a próxima semana|Há sinais de risco imediato.
Fibrinólise rotineira sem critérios de oclusão|A estratégia padrão neste cenário é avaliação invasiva.
Observar sem repetir ECG|A evolução elétrica orienta a urgência.
Esperar resultado isolado da CK-MB|Marcador não substitui avaliação da instabilidade.

antiagregacao|1|Farmacologia
Em SCA, qual ação do AAS fundamenta a antiagregação?
Inibição irreversível da COX-1 plaquetária|Reduz a síntese de tromboxano A₂ e a ativação.
Bloqueio primário de receptores P2Y12|Esse é o alvo de outra classe.
Ativação direta da plasmina|É mecanismo de fibrinolíticos.
Inibição direta da trombina circulante|É ação de anticoagulantes específicos.
Quelação de cálcio no sangue|Não é a ação terapêutica do AAS.

antiagregacao|2|Segurança
SCA confirmada com hipoxemia. Qual princípio orienta administrar oxigênio?
Titular quando há hipoxemia ou comprometimento respiratório|A indicação decorre da oxigenação e do contexto.
Oferecer alto fluxo a todos mesmo com SpO₂ normal|Não há benefício de rotina em normoxemia.
Evitar todo oxigênio em síndrome coronariana|Hipoxemia é indicação de suporte.
Aguardar troponina para corrigir hipoxemia|Suporte deve avançar em paralelo.
Usar oxigênio no lugar da reperfusão|Suporte não substitui tratamento causal.

aorta|3|Segurança
Pessoa com provável dissecção tem diferença de PA entre braços e deteriora logo após ECG com alterações isquêmicas. Que relação é possível?
Envolvimento coronariano pela dissecção|A dissecção pode afetar óstio coronariano e produzir sinais de isquemia.
Um ECG isquêmico exclui lesão aórtica|As duas condições podem coexistir.
Déficit de pulso nunca ocorre em lesão aórtica|Má perfusão de ramos é uma complicação.
Uma troponina alta distingue com certeza as duas causas|Lesão miocárdica pode resultar de ambas.
A imagem aórtica é irrelevante após alteração do ECG|O diagnóstico pode mudar completamente a abordagem.

tep|2|Exames
Paciente jovem, estável e com baixa probabilidade de TEP segundo avaliação validada tem dímero D negativo abaixo do limite apropriado. Que papel o resultado costuma ter?
Apoiar exclusão de TEP nessa faixa de probabilidade|O valor preditivo depende da probabilidade e do limiar.
Confirmar embolia crônica|O teste negativo não confirma embolia.
Excluir TEP com a mesma segurança em alta probabilidade|Alta probabilidade pede estratégia diferente.
Medir a dimensão do êmbolo|Dímero D não mede carga trombótica.
Afastar toda causa de dor|Avaliação do restante do diferencial continua.

primeiros-minutos|2|Diferencial
Homem apresenta dor intensa após vômitos repetidos, dispneia e crepitação subcutânea na região cervical. Além de SCA, qual emergência precisa avançar no diferencial?
Perfuração esofágica|Vômitos seguidos de dor e enfisema subcutâneo levantam essa suspeita.
Angina estável como explicação completa|Não explica enfisema cervical.
Hiperglicemia como prova de causa do quadro|É inespecífica e pode ser reacional.
Hiperventilação funcional como primeira conclusão|Não explica crepitação subcutânea.
Somente dor muscular pela força dos vômitos|A presença de ar em tecidos muda a urgência.

ecg|3|Diferencial de ECG
Dor piora ao deitar e melhora sentado inclinado para frente. ECG mostra supra difuso e depressão de PR. Qual leitura integra os achados sem encerrar a avaliação?
Pericardite é hipótese forte e o ECG deve ser correlacionado com clínica e exames|Padrão difuso e PR apoiam inflamação, com avaliação de causas graves concorrentes.
Todo supra corresponde a um único território coronariano|A distribuição é uma pista importante.
Excluir envolvimento miocárdico sem examinar|Miopericardite pode coexistir.
Fibrinólise automática pelo supra|Indicação depende de diagnóstico e critérios.
Usar só a dor postural como prova|A interpretação é integrada.

troponina|3|Classificação
Durante hemorragia aguda com anemia grave, a troponina sobe e cai e surgem sinais de isquemia ao ECG. Sem evidência de evento aterotrombótico, qual conceito pode explicar?
IAM tipo 2 por desequilíbrio oferta-demanda|Há evidência de isquemia associada a estresse de oferta, mas o mecanismo deve ser investigado.
Toda elevação dinâmica é IAM tipo 1|Tipo 1 pressupõe mecanismo aterotrombótico.
Lesão não isquêmica obrigatória|Há evidência isquêmica no cenário.
Angina estável sem lesão|Elevação e queda acima do limite indicam lesão.
Tromboembolismo pulmonar confirmado|Troponina e ECG não confirmam essa etiologia.
`);
add('hipertensiva',`
orgao|1|Avaliação
Paciente chega com leitura oscilométrica muito alta e manguito pequeno. Está estável. Que medida melhora a avaliação inicial?
Repetir com manguito adequado e avaliar lesão aguda|Medida correta e avaliação clínica reduzem erro de classificação.
Aceitar o valor sem confirmar técnica|Manguito pequeno pode elevar artificialmente a leitura.
Usar pulsação do relógio como substituto da PA|Frequência não mede pressão.
Iniciar droga IV só pelo aparelho|A identificação de lesão define emergência.
Adiar toda avaliação até consulta futura|É preciso avaliar risco e sintomas atuais.

orgao|2|Diagnóstico
PA 210/115 com confusão nova, cefaleia e alteração visual. Que investigação deve avançar com monitorização?
Busca de lesão neurológica aguda e diagnósticos concorrentes|Encefalopatia hipertensiva, AVC e outras causas exigem avaliação dirigida.
Presumir cefaleia habitual e dar alta|Alteração mental é sinal de alarme.
Tratar exclusivamente a dor e repetir em uma semana|Há possível lesão de órgão-alvo.
Excluir processo neurológico se a pessoa não tiver dor torácica|São eixos independentes.
Solicitar teste ergométrico como prioridade|Não responde à urgência neurológica.

orgao|2|Estratificação
Pessoa com PA muito elevada, creatinina que dobrou recentemente e oligúria. Como interpretar a disfunção renal?
Avaliar se há lesão renal aguda relacionada à emergência|A tendência temporal importa e modifica o manejo.
Atribuir a alteração obrigatoriamente a DRC antiga|A piora recente sugere componente agudo.
Excluir lesão porque não há cefaleia|Lesão pode ser renal isolada.
Usar creatinina como medidor direto de perfusão cerebral|Não avalia o sistema nervoso.
Normalizar a pressão de forma abrupta em todos os casos|Pode agravar hipoperfusão.

velocidade|2|Fisiologia
Hipertenso crônico teve queda abrupta de PA após intervenção e desenvolveu sinais de má perfusão. Que princípio ajuda a explicar?
Deslocamento da autorregulação e risco de isquemia com queda rápida|Metas e titulação buscam reduzir o dano mantendo perfusão.
A perfusão de órgãos é invariável com PA|A autorregulação tem limites.
O valor alvo de consultório serve a toda fase aguda|Urgência exige metas adaptadas ao fenótipo.
Piora implica obrigatoriamente necessidade de cair ainda mais a PA|Pode indicar excesso de redução.
A PAM é irrelevante à perfusão|Ela fornece contexto junto aos sinais clínicos.

ventilacao|3|Escalada
Paciente em VNI por EAP passa a vomitar, fica estuporoso e não protege a via aérea. Que decisão deve ser priorizada?
Reavaliar imediatamente via aérea e necessidade de suporte invasivo|A perda de proteção compromete a segurança da máscara.
Manter VNI e aprofundar sedação|Sedação pode piorar ventilação e proteção.
Aumentar pressão e aguardar uma hora|Não responde à aspiração iminente.
Retirar suporte sem outra estratégia|É preciso garantir ventilação e oxigenação.
Presumir melhor adaptação porque a pessoa se mexe menos|Redução de atividade pode representar deterioração.

diuretico|2|Farmacologia
Paciente com EAP apresenta ortopneia, jugulares elevadas, edema periférico e ganho de peso recente. O que favorece considerar diurético de alça?
Sinais convergentes de congestão com excesso de volume|A natriurese pode ajudar, com vigilância de perfusão e função renal.
Edema de início abrupto exige diurético isolado para todos|Redistribuição e hipertensão podem exigir outras medidas.
A natriurese dispensa suporte se há hipoxemia|Ventilação e oxigenação continuam prioritárias.
Eletrólitos nunca mudam com diurético de alça|Perdas de K e outras alterações são plausíveis.
A dose pode ser escolhida sem contexto renal|Função renal e exposição prévia importam.

nitrato|2|Segurança
Dispneia e sinais de congestão acompanham PA 78/50, extremidades frias e confusão. Qual cautela farmacológica?
Evitar iniciar nitrato enquanto há hipotensão e má perfusão|Vasodilatação pode reduzir ainda mais pressão e retorno venoso.
Usar nitrato porque toda congestão responde igual|O fenótipo hemodinâmico muda a segurança.
Dobrar dose se as extremidades estão frias|Pode agravar instabilidade.
Usar nitrato como substituto da avaliação de choque|Choque requer suporte e causa a investigar.
Usar PA sistólica sem examinar perfusão depois|Ambos orientam titulação.

pocus|2|Integração
Coração com função sistólica reduzida, linhas B bilaterais difusas e ortopneia. Como usar o conjunto?
Apoia congestão cardiogênica no contexto apropriado|Padrões pulmonares ganham especificidade ao integrar clínica e avaliação cardíaca.
Confirma infecção independentemente da história|Linhas B são inespecíficas.
Descarta valvopatia|Ultrassom focado não substitui avaliação valvar detalhada.
Quantifica diretamente a pressão de enchimento|Os artefatos não medem pressão diretamente.
Exclui outros mecanismos de hipoxemia|Pode haver causas concomitantes.

congestao|1|Mecanismo
Qual alteração produz edema pulmonar hidrostático cardiogênico?
Elevação da pressão capilar pulmonar|O gradiente favorece saída de líquido para interstício e alvéolos.
Redução isolada da pressão venosa pulmonar|Tende a reduzir filtração hidrostática.
Aumento obrigatório da permeabilidade por lesão inflamatória|É mecanismo típico de outras síndromes, não requisito para edema hidrostático.
Bloqueio da ventilação exclusivamente por secreção|Obstrução brônquica isolada não define edema.
Queda da pressão de enchimento esquerda em todos os casos|Pressão esquerda elevada pode se transmitir aos pulmões.

reavaliacao|2|Monitorização
Após suporte em EAP, que conjunto indica resposta clínica mais consistente?
Melhora do trabalho respiratório e oxigenação com perfusão sustentada|Integra ventilação, oxigenação e efeito hemodinâmico.
Queda da PA com piora da consciência|Pode sinalizar hipoperfusão.
Aumento do esforço com saturação isolada semelhante|Pode sinalizar falha ventilatória.
Apenas diminuição de estertores sem mudança clínica|A ausculta isolada é insuficiente.
Diurese única sem acompanhar eletrólitos|Não resume resposta ou segurança.

velocidade|3|Segurança
Gestante com hipertensão grave e sintomas neurológicos novos chega ao serviço. Qual estratégia é adequada?
Seguir fluxo obstétrico urgente com avaliação materna e fetal e metas específicas|Pré-eclâmpsia e eclâmpsia têm manejo próprio.
Usar protocolo geral para alta de hipertensão assintomática|Há sintomas e contexto obstétrico de alto risco.
Aguardar a próxima consulta pré-natal|O quadro é potencialmente tempo-dependente.
Usar qualquer anti-hipertensivo crônico sem revisar gestação|Segurança e indicação variam.
Avaliar apenas pressão fetal e ignorar sinais maternos|A estabilização materna é essencial.

orgao|1|Reconhecimento
Em hipertensão marcada, qual é um exemplo de lesão aguda de órgão-alvo?
Edema pulmonar cardiogênico de instalação recente|É lesão aguda com repercussão respiratória.
História familiar de hipertensão|É fator de risco.
Retinopatia documentada anos atrás sem alteração nova|É achado crônico no cenário informado.
Tratamento antigo com duas drogas|O número de medicamentos não estabelece lesão.
Falta recente de renovação da receita sem sintomas ou lesão|É uma barreira terapêutica, sem definir emergência.

ventilacao|3|Raciocínio
Paciente com edema pulmonar hipertensivo melhora dispneia logo após início de pressão positiva. Que efeito pode contribuir?
Menor trabalho respiratório e redução da carga transmural do ventrículo esquerdo|A pressão positiva altera mecânica e interações coração-pulmão.
Aumento garantido de retorno venoso em qualquer paciente|Pressão intratorácica positiva pode reduzir retorno.
Resolução instantânea de todo excesso corporal de fluido|A melhora pode preceder remoção de água.
Desligamento do estímulo ventilatório pela hipoxemia|O suporte melhora troca gasosa e trabalho respiratório.
Efeito invariável mesmo em choque não reconhecido|Perfusão e tolerância precisam ser reavaliadas.
`);
add('acidobase',`
primario|1|Interpretação
Gasometria: pH 7,24, PaCO₂ 62, HCO₃ 26. Qual desvio melhor explica a acidemia?
Elevação de PaCO₂|O CO₂ elevado acidifica o meio, com bicarbonato próximo da referência.
Queda grande de bicarbonato|Ele não está baixo.
Hipocapnia acentuada|A PaCO₂ está elevada.
Alcalose metabólica isolada|Não explica pH baixo nesse padrão.
Elevação de PaO₂ comprovada|Não há dado de PaO₂ no caso.

primario|1|Interpretação
Gasometria: pH 7,51, PaCO₂ 47, bicarbonato 36. Que processo explica melhor a alcalemia?
Alcalose metabólica|O bicarbonato aumentado tem efeito alcalinizante. CO₂ maior pode representar compensação.
Alcalose respiratória|Esperaria PaCO₂ baixa.
Acidose hiperclorêmica|Esperaria bicarbonato baixo.
Acidose respiratória como única causa do pH|CO₂ alto acidifica, não alcaliniza.
Normalidade porque há dois valores alterados|pH alto indica alcalemia.

winter|2|Cálculo
Acidose metabólica com bicarbonato 10 e PaCO₂ 23 mmHg. Qual leitura da compensação?
PaCO₂ dentro da faixa de Winter|A previsão é 23 ± 2 mmHg.
Acidose respiratória adicional demonstrada|PaCO₂ não está acima do esperado.
Alcalose respiratória adicional demonstrada|PaCO₂ não está abaixo do esperado.
O cálculo exige PaO₂ em lugar de PaCO₂|Winter compara PaCO₂.
Normalidade do metabolismo porque compensou|A acidose metabólica permanece.

winter|3|Misto
Acidose metabólica com bicarbonato 14 e PaCO₂ 21. Qual componente adicional a fórmula de Winter sugere?
Alcalose respiratória|PaCO₂ prevista é 29 ± 2. A medida é inferior.
Compensação apropriada|21 não está entre 27 e 31.
Acidose respiratória adicional|Exigiria medida acima da faixa.
Compensação metabólica por hipercapnia crônica isolada|A PaCO₂ é baixa.
Nenhum porque 21 mmHg é PaCO₂ aceitável em todo caso|A interpretação depende do bicarbonato.

primario|2|Semiologia
Vômitos prolongados, hipovolemia e pH 7,49 com bicarbonato 34. Qual mecanismo é mais plausível?
Perda de ácido gástrico com manutenção da alcalose na depleção de volume e cloreto|As perdas reduzem carga ácida e a resposta renal ajuda a sustentar a alteração.
Perda predominante de bicarbonato por diarreia|Tende a acidose hiperclorêmica.
Hiperventilação definida pela concentração de bicarbonato|Avalie PaCO₂ para determinar componente respiratório.
Retenção primária de CO₂ como causa da alcalemia|CO₂ elevado produz efeito acidificante.
Acidose láctica isolada|Esperaria consumo de bicarbonato.

albumina|2|Limitações
Duas pessoas com a mesma carga de ânions não medidos têm albumina muito diferente. Em qual delas o AG não corrigido pode parecer falsamente baixo?
Na pessoa com albumina mais baixa|A menor contribuição de um ânion não medido reduz o basal.
Na pessoa com albumina mais alta|Isso tende a aumentar o AG basal.
Em nenhuma porque AG depende apenas do sódio|Cloreto, bicarbonato e ânions não medidos influenciam.
Na pessoa com maior PaO₂|Oxigenação não entra diretamente no cálculo.
O efeito só existe se o K for incluído|A albumina influencia ambas as convenções.

misto|3|Mecanismo
Adulto com salicilato e taquipneia tem bicarbonato muito baixo e PaCO₂ ainda menor que a esperada. Qual padrão é compatível?
Acidose metabólica associada a alcalose respiratória|O contexto e a PaCO₂ abaixo da compensação sustentam processo misto.
Acidose metabólica e respiratória|Acidose respiratória elevaria PaCO₂ acima da previsão.
Alcalose metabólica isolada|Bicarbonato baixo não a sustenta.
Acidose respiratória isolada|PaCO₂ muito baixa contraria a hipótese.
Compensação apropriada pela fórmula|A comparação descrita já mostra desvio.

delta|3|Interpretação
Constatado AG corrigido elevado, o aumento do AG é muito menor que a queda do bicarbonato. Que hipótese adicional deve ser considerada?
Componente de acidose metabólica com AG normal|Déficit de bicarbonato extra pode indicar distúrbio hiperclorêmico concomitante.
Alcalose metabólica como única causa do delta baixo|Alcalose tenderia a atenuar a queda do bicarbonato.
Acidose respiratória comprovada|Para avaliar componente respiratório, compare PaCO₂.
Hipoxemia comprovada|Delta ratio não mede oxigenação.
Indicação automática de bicarbonato IV|O cálculo não prescreve terapia.

cloreto|2|Etiologia
Após grande volume de solução rica em cloreto, bicarbonato cai e cloreto aumenta, sem evidência de gap alto. Que hipótese integrar?
Componente de acidose hiperclorêmica|Carga relativa de cloreto pode contribuir para a alteração.
Produção necessariamente alta de cetonas|É preciso investigar por outros dados.
Alcalose metabólica por ganho de bicarbonato|Bicarbonato caiu.
Identificação automática de toda causa da acidose|Choque e outras causas podem coexistir.
Acidose respiratória comprovada sem PaCO₂|O componente respiratório exige gasometria.

respiratorio|2|Mecanismo
Hipoventilação aguda após sedativo produz rápido aumento da PaCO₂. O que diferencia a fase aguda da crônica?
Na fase aguda, o aumento de bicarbonato tende a ser menor|Os rins precisam de tempo para adaptação sustentada.
Na fase aguda, a retenção renal completa é instantânea|A adaptação se desenvolve com o tempo.
Na crônica, bicarbonato nunca aumenta|O aumento pode ser parte da compensação.
Na aguda, PaCO₂ obrigatoriamente cai|Hipoventilação eleva CO₂.
A distinção se faz só com PaO₂|História, pH, PaCO₂ e HCO₃ ajudam.

gap|1|Cálculo
Na fórmula do AG sem potássio, de qual concentração se subtrai a soma de cloreto e bicarbonato?
Sódio|AG = Na − (Cl + HCO₃).
Potássio|A convenção descrita exclui K.
Magnésio|Não entra nessa fórmula.
PaCO₂|É usada na análise ventilatória.
Albumina|Pode corrigir o resultado depois do cálculo.

misto|3|Leitura integrada
Pessoa com sepse, lactato elevado e diarreia tem pH quase normal com taquipneia. Que estratégia é a mais informativa?
Calcular AG com contexto de albumina e checar PaCO₂ frente ao bicarbonato|Processos metabólicos e respiratórios podem coexistir com pH quase normal.
Encerrar avaliação pelo pH|O pH pode refletir efeitos que se contrabalançam.
Interpretar lactato alto como prova de causa exclusivamente anaeróbia|O lactato pode subir por mecanismos variados.
Usar apenas o bicarbonato para excluir alteração ventilatória|Compare com a PaCO₂.
Deduzir que toda diarreia eleva AG|A perda digestiva de bicarbonato costuma gerar componente de AG normal.

delta|2|Limitações
Bicarbonato e AG estão no intervalo de referência. Um estudante propõe calcular delta ratio para diagnosticar alteração respiratória. Qual correção?
Delta ratio é ferramenta de mistura metabólica quando existe acidose com AG elevado|Avaliação respiratória exige pH, PaCO₂ e comparação apropriada.
O delta ratio substitui PaCO₂|Não mede ventilação.
Ele é obrigatório em toda gasometria|É aplicado a cenários selecionados.
Um denominador próximo de zero torna o resultado mais robusto|Pode tornar a razão instável ou sem sentido.
O resultado determina dose de bicarbonato|A ferramenta é interpretativa.
`);
add('eletrolitos',`
k|1|Mecanismo
Após cálcio e insulina por hipercalemia, qual intervenção remove efetivamente K do organismo?
Hemodiálise quando indicada|Retira potássio do compartimento corporal.
Cálcio IV|Protege eletricamente sem remover K.
Insulina|Desloca K para dentro da célula.
Agonista beta-2|Pode promover deslocamento temporário.
Glicose isolada|Não é técnica de eliminação.

k|2|Segurança
K inesperadamente alto em coleta hemolisada de adulto assintomático. Qual abordagem conserva segurança diagnóstica?
Repetir coleta adequada, avaliar ECG e gravidade ao mesmo tempo|Hemólise pode elevar K artificialmente. Suspeita de risco real exige ação sem atraso.
Aceitar todo resultado hemolisado como verdadeiro|Há possibilidade de pseudohipercalemia.
Descartar o achado sem nova coleta|Hipercalemia real pode coexistir.
Usar ECG normal como exclusão absoluta|ECG tem sensibilidade limitada.
Administrar K antes de repetir|Pode causar dano se o resultado for real.

calcio|2|Monitorização
QRS segue alargado após a primeira medida de estabilização na hipercalemia. O que revisar?
ECG, resposta ao cálcio e necessidade de nova estabilização conforme protocolo|Persistência elétrica exige reavaliação. Remoção e deslocamento devem avançar.
Concluir que K normalizou apenas porque cálcio foi administrado|Cálcio não reduz o K.
Retirar monitor para evitar artefato|A vigilância elétrica é essencial.
Repor K pela largura do QRS|Pode agravar a toxicidade.
Considerar a coleta desnecessária|K seriado acompanha resposta.

insulina|2|Mecanismo
Por que K pode voltar a subir algumas horas após uma resposta inicial à insulina?
O deslocamento é temporário e K pode ainda não ter sido eliminado|Trate causa, reavalie e use meios de eliminação quando indicados.
Toda resposta inicial significa eliminação completa|O mecanismo é redistribuição.
Cálcio provoca liberação tardia obrigatória de K|Esse não é seu mecanismo.
O primeiro K pós-tratamento define alta automaticamente|A recorrência precisa de avaliação.
Elevação posterior prova hemólise em todos os casos|Pode refletir rebote verdadeiro.

na|1|Diagnóstico
Que condição torna falsa a premissa de que todo sódio plasmático baixo representa hipo-osmolalidade efetiva?
Hiperglicemia importante|Glicose extracelular pode deslocar água e reduzir Na medido com tonicidade elevada.
Perda de bicarbonato isolada|Não demonstra esse mecanismo.
Potássio normal|Não define tonicidade.
Edema periférico isolado|Precisa de contexto osmótico.
Magnésio normal|Não explica deslocamento hídrico por osmóis.

na|2|Investigação
Confirmada hiponatremia hipotônica sem emergência neurológica em contexto estável. Que dados ajudam a classificar mecanismo?
Osmolalidade urinária, sódio urinário e contexto clínico|Orientam excreção de água e resposta renal, com interpretação contextual.
Somente PA sistólica|Não caracteriza excreção de água e soluto.
Somente idade|Não define mecanismo.
Apenas cálcio ionizado|Não é o eixo principal do diagnóstico.
Um único Na repetido sem contexto|A tendência é útil, mas insuficiente para a causa.

cronico|3|Decisão
Paciente com hiponatremia crônica recebe terapia e o Na sobe muito mais rápido que o planejado. Qual ação?
Interromper a contribuição corrigível e chamar equipe experiente para manejo do excesso|Reavalie diurese, trajetória e medidas específicas sob monitorização.
Continuar terapia na mesma velocidade|Aumenta risco osmótico.
Usar ausência de sinais neurológicos imediatos como segurança|Complicações podem ser tardias.
Cessar todas as coletas|É preciso monitorar a trajetória.
Normalizar Na imediatamente assim que subir|O objetivo é evitar ultrapassar a correção segura.

hiperna|2|Cálculo
Adulto de 70 kg, fração estimada de água corporal 0,5, Na 154. Que déficit de água livre a fórmula simplificada estima?
3,5 L|35 × (154 ÷ 140 − 1). Não inclui perdas contínuas.
35 L|É a água corporal total estimada.
7 L|Usaria fração corporal ou diferença incorreta.
14 L|É a diferença numérica em mEq/L, sem conversão válida.
0 L|Há Na acima da referência usada.

hiperna|3|Segurança
Hipernatremia de duração incerta com perdas persistentes. Por que uma estimativa inicial de água livre não basta?
A duração, perdas em curso e medidas seriadas mudam o plano|A fórmula é um ponto de partida.
Fórmula já incorpora toda produção urinária futura|Ela não estima perdas futuras.
Todo paciente com Na igual precisa do mesmo volume|Peso, fração de água e comorbidades influem.
A trajetória do sódio é irrelevante|Monitoração evita desvio.
O volume deve ser infundido integralmente sem reavaliação|A estratégia precisa ser ajustada.

mag|1|Mecanismo
Qual distúrbio pode manter hipocalemia por perda renal apesar de reposição de K?
Hipomagnesemia|A deficiência de Mg favorece excreção renal de potássio.
Hipernatremia isolada como regra|Não explica esse mecanismo usual.
Hipercloremia isolada como diagnóstico|Cloreto não substitui medida de Mg.
Hiperfosfatemia isolada|Não é a associação clássica.
Hiperglicemia leve como única conclusão|Outros fatores devem ser avaliados.

mag|3|Interpretação
Após diarreia prolongada, paciente tem QT prolongado, K baixo e Mg baixo. O que o contexto implica?
Rever eletrólitos e fármacos que prolongam QT e acompanhar ritmo|Déficits simultâneos podem favorecer arritmia e dificultar correção.
Corrigir apenas K e ignorar Mg|Mg baixo pode perpetuar perdas.
Prescrever droga que alongue QT sem revisar risco|Pode aumentar risco arrítmico.
Considerar seguro porque não houve síncope|A predisposição elétrica existe.
Interpretar QT como teste direto de volemia|É medida elétrica.

ca|2|Fisiologia
Em alcalose aguda, paciente desenvolve parestesias com cálcio total sem grande mudança. O que pode acontecer com cálcio ionizado?
Redução por maior ligação a proteínas|pH mais alto pode diminuir a fração livre.
Aumento obrigatório por menor ligação|A direção mais típica é a oposta.
Valor invariável enquanto o cálcio total estável|Frações podem mudar.
Elevação igual à do bicarbonato|São medidas diferentes.
Não há efeito do pH sobre cálcio ligado|A ligação depende do pH.

k|2|Reconhecimento
Qual contexto favorece considerar eliminação extracorpórea de K?
Hipercalemia grave persistente em paciente com depuração renal muito baixa|Controle definitivo depende de eliminação. Avalie emergência e indicação de diálise.
K normal e perfusão normal como regra|Não estabelece indicação.
Resposta elétrica ao cálcio como garantia de que diálise nunca será necessária|O risco metabólico pode persistir.
Hipoglicemia isolada após insulina|Exige correção, não indica por si remoção de K.
Uma única leitura suspeita sem avaliação adicional|Contexto e confirmação orientam a decisão.
`);
add('glicemia',`
cad|1|Reconhecimento
Qual marcador mede mais diretamente a cetonemia avaliada em CAD?
Beta-hidroxibutirato|É cetona predominante na CAD e útil na avaliação.
Sódio total|Mede eletrólito.
Creatinina|Ajuda a avaliar função renal.
Lactato isolado|Não mede cetonas.
Dímero D|Relaciona-se a degradação de fibrina.

ehh|1|Reconhecimento
Qual característica predomina no estado hiperosmolar hiperglicêmico típico?
Hiperglicemia intensa com hiperosmolalidade e desidratação|Cetonemia e acidose marcantes sustentam CAD ou sobreposição.
Hipoglicemia por definição|Contradiz o fenótipo.
Cetonemia elevada obrigatória|Pode haver pouca cetonemia no EHH típico.
Acidose respiratória obrigatória|Não é critério.
Hiponatremia hipotônica obrigatória|Tonicidade pode estar alta com Na medido baixo.

cad|2|Misto
Cetonemia significativa e acidose coexistem com hiperglicemia intensa e osmolalidade efetiva muito alta. Como organizar a hipótese?
Avaliar sobreposição CAD/EHH|Marcadores dos dois fenótipos podem coexistir e exigem manejo atento a ambos.
Classificar como EHH puro pela glicemia elevada|A acidose com cetonemia indica componente de CAD.
Excluir hiperosmolalidade se há cetonemia|As duas podem ocorrer juntas.
Tratar só a acidose até normalizar o pH|Volume, K e tonicidade também importam.
Diagnosticar hipoglicemia devido à alteração mental|A glicemia medida está elevada.

ehh|3|Monitorização
Glicemia vem caindo no EHH, mas o sódio medido sobe e osmolalidade pouco muda. Que interpretação é mais útil?
Acompanhar tendência de osmolalidade, perfusão e Na em conjunto|A queda da glicose pode elevar Na medido. Isso não define sozinho a escolha de fluido.
Interromper manejo porque sódio subiu|O contexto osmótico e hemodinâmico orienta.
Tratar Na isoladamente com água rápida|Pode alterar tonicidade de forma insegura.
Usar apenas glicemia para declarar resolução|Osmolalidade e estado clínico importam.
Presumir erro de laboratório|Mudança é fisiologicamente possível.

potassio|2|Fisiologia
No início de CAD, K sérico está normal apesar de poliúria e vômitos. Qual risco ao iniciar tratamento?
K pode cair porque reservas corporais estão reduzidas e insulina desloca K|Concentração sérica inicial não mede o estoque total.
K normal exclui perda corporal|Pode haver perda significativa.
Insulina só altera glicose|Tem efeito sobre distribuição de K.
Vômitos sempre causam hipercalemia|Podem contribuir para depleção.
O ECG inicial substitui coletas seriadas|Monitorização bioquímica continua necessária.

resolucao|3|Transição
CAD resolveu bioquimicamente e a equipe vai trocar insulina IV por subcutânea. O que essa transição deve prever?
Sobreposição apropriada de insulina conforme esquema e protocolo|Evita intervalo sem insulina efetiva e risco de recorrência da cetogênese.
Retirar toda insulina por várias horas|Pode recidivar CAD.
Usar glicemia isolada como autorização de alta|Critérios clínicos e bioquímicos precisam ser avaliados.
Dispensar plano de alimentação|Esquema também depende de alimentação e seguimento.
Suspender monitorização de K antes da transição|Depende do curso e risco residual.

glicose|2|Farmacologia
Por que insulina deve continuar no protocolo de CAD após a queda inicial de glicemia, enquanto houver cetogênese?
Suprime lipólise e produção de cetonas|O objetivo metabólico vai além de corrigir a glicemia.
Só reduz concentração de glicose no plasma|A insulina afeta lipólise e cetogênese.
Corrige acidose por ser um tampão direto|Seu efeito na acidose é principalmente pela reversão do mecanismo.
Substitui qualquer necessidade de monitorização de K|Aumenta necessidade de atenção ao K.
É desnecessária se a pessoa voltar a urinar|Diurese não define resolução metabólica.

hipo|1|Segurança
Em hipoglicemia sintomática, qual critério prático ajuda a escolher via oral?
Consciência e deglutição seguras|Reduz risco de aspiração e permite absorção apropriada.
Presença de hálito cetônico|Não indica via segura.
Uso prévio de insulina isolado|Não informa deglutição.
Hipertensão isolada|Não determina escolha de via.
Valor de sódio isolado|Não estabelece segurança de via oral.

hipo|3|Reavaliação
Pessoa melhora após glicose, mas usou sulfonilureia de longa ação. Qual motivo sustenta observação e controle seriado?
Risco de hipoglicemia recorrente pela duração do efeito secretagogo|Resposta inicial não garante estabilidade.
A primeira glicemia normal encerra risco|A medicação pode seguir atuando.
O mecanismo é apenas perda alimentar|O fármaco estimula liberação de insulina.
O risco depende só de cetonemia|Cetonas não orientam recorrência nesse caso.
Necessidade de insulina adicional de rotina|Pode piorar hipoglicemia.

volume|2|Cálculo
Glicemia 500 mg/dL, Na medido 130. Usando 1,6 mEq/L a cada 100 mg/dL de glicose acima de 100, qual Na corrigido aproximado?
136,4 mEq/L|130 + 1,6 × 4. É estimativa, não meta de tratamento.
123,6 mEq/L|Aplica a correção com sinal inverso.
138 mEq/L|Usa cinco incrementos em vez de quatro.
130 mEq/L|É o Na medido.
141 mEq/L|Não corresponde ao fator descrito no enunciado.

resolucao|3|Limitação
Após muito cloreto em tratamento de CAD, paciente tem cetonemia resolvida e bicarbonato ainda baixo, com padrão hiperclorêmico. O que revisar?
Critérios específicos de resolução e a presença de acidose hiperclorêmica concorrente|Bicarbonato, cetonemia e pH ajudam a distinguir persistência de CAD de outra acidose.
A cetonemia não informa a resolução|É componente importante do acompanhamento.
Todo bicarbonato baixo após fluidos significa nova CAD|Pode haver componente hiperclorêmico.
Aumentar insulina sem avaliar outros dados|Risco de hipoglicemia e hipocalemia.
Desconsiderar evolução dos eletrólitos|Ajuda a explicar mudança do padrão.

causa|2|Prevenção
Após CAD associada a dificuldade de acesso à insulina, qual medida de alta aborda o principal risco de recorrência?
Garantir plano viável de acesso, aplicação, monitorização e sinais de alarme|Recorrência depende também de barreiras práticas.
Prescrever sem verificar disponibilidade|Repete a barreira.
Suspender seguimento porque acidose resolveu|O risco permanece após alta.
Orientar suspender insulina em toda doença aguda|A interrupção pode precipitar crise.
Usar apenas valor glicêmico de saída|O plano deve abordar continuidade.

ehh|3|Diagnóstico diferencial
Adulto em EHH permanece com déficit focal após melhora inicial da perfusão. Qual cuidado?
Investigar evento neurológico concorrente|A hiperosmolalidade pode alterar sensório, mas não exclui AVC ou outra causa focal.
Atribuir obrigatoriamente todo déficit ao EHH|Pode perder diagnóstico tempo-dependente.
Esperar vários dias antes de examinar|A persistência exige avaliação.
Interpretar cetonas como substituto da avaliação neurológica|São dados de outro eixo.
Encerrar investigação só porque glicose caiu|A evolução clínica ainda é relevante.
`);
add('intox',`
suporte|1|Prioridade
Ao chegar a cena de exposição com vapores desconhecidos, qual prioridade precede o exame?
Garantir segurança e acionar recursos adequados|Evita exposição secundária e permite abordagem coordenada.
Entrar sem proteção para identificar o produto|Pode criar novas vítimas.
Iniciar exame sem comunicar o cenário|A equipe precisa de informações de risco.
Esperar diagnóstico laboratorial para acionar ajuda|A suspeita de risco já justifica acionamento.
Priorizar nome comercial à segurança|O agente importa depois do controle da cena.

suporte|2|Investigação
Paciente apresenta alteração mental após ingestão desconhecida. Que avaliação inicial é de alto rendimento?
ABC, glicemia, ECG e história dirigida conforme apresentação|Identifica ameaças rápidas e pistas toxicodinâmicas.
Solicitar apenas painel urinário|O painel é limitado e pode atrasar decisões.
Obter só o rótulo da embalagem|Exame, exposição e ventilação continuam centrais.
Confiar na ausência de odor|Não exclui intoxicação.
Esperar identificação definitiva para tratar hipotensão|Trate o comprometimento em paralelo.

colinergico|3|Segurança
Vítima contaminada e ainda com roupa molhada após exposição cutânea chega com secreções abundantes. Como organizar equipe e suporte?
Proteger equipe, descontaminar conforme protocolo e tratar ameaças respiratórias|Contaminação secundária e insuficiência respiratória exigem abordagem coordenada.
Descontaminar sem proteção|Expõe a equipe.
Usar só atropina e ignorar ventilação|Antídoto não substitui suporte.
Aguardar atividade de colinesterase para ventilar|O risco respiratório é imediato.
Dar alta após retirar roupas sem observação|O quadro sistêmico exige cuidado.

colinergico|2|Monitorização
Em síndrome colinérgica com broncorreia, qual dado acompanha mais diretamente resposta clínica ao tratamento de sinais muscarínicos?
Melhora das secreções e da ventilação|Pulmões e oxigenação têm prioridade imediata.
Pupila isolada atingindo tamanho normal|Miose pode persistir e não é o alvo principal.
Normalização de qualquer exame urinário|Não mede rapidamente resposta respiratória.
Queda obrigatória da frequência cardíaca|O foco é suporte e sinais clínicos.
Desaparecimento instantâneo de toda fraqueza|Fraqueza nicotínica pode exigir avaliação própria.

anticolinergico|2|Diferencial
Que achado favorece intoxicação antimuscarínica em vez de simpatomimética num paciente agitado e midriático?
Pele seca e retenção urinária|O bloqueio muscarínico reduz secreção e motilidade.
Sudorese profusa como regra|Favorece ativação simpatomimética.
Midríase isolada|Pode ocorrer nos dois.
Taquicardia isolada|É comum nos dois.
Hipertermia isolada|Não discrimina adequadamente.

opioide|1|Farmacologia
Qual alvo explica a utilidade da naloxona na depressão respiratória por opioide?
Receptores opioides|O antagonismo pode reverter depressão respiratória.
Receptores muscarínicos|São alvo de outros fármacos.
Transportador de serotonina|Não explica o efeito da naloxona.
Receptores adrenérgicos alfa|Não é o mecanismo principal.
Canais gástricos de prótons|Não se relacionam à reversão.

opioide|3|Reavaliação
Após naloxona, a frequência respiratória melhora e depois cai novamente. Qual hipótese orienta conduta?
Recorrência da ação opioide com necessidade de reavaliar suporte e antagonismo|O efeito do agonista pode durar mais que o do antagonista.
A primeira resposta exclui nova depressão|A duração é variável.
A piora prova falta de opioide|Pode representar recorrência.
Usar carvão em sonolento como primeira ação|Risco de aspiração.
Aguardar teste urinário antes de ventilar|Ventilação não pode esperar.

canal|2|Interpretação
Em intoxicação medicamentosa, que achado no ECG pede avaliação de bloqueio de canais de sódio?
Alargamento novo do QRS|Indica retardo de condução intraventricular em contextos compatíveis.
Frequência respiratória elevada|Não é achado de ECG.
QTc normal como prova de bloqueio|Uma medida normal não demonstra o mecanismo.
Onda P normal isolada|Não define condução ventricular.
Ritmo sinusal isolado|Pode coexistir com várias alterações, mas não indica bloqueio por si.

carvao|2|Limitações
Por que o carvão ativado não é solução universal de descontaminação?
Adsorção varia com o agente e o risco de aspiração deve ser considerado|O tempo e a gravidade também influem.
Adsorve todos os produtos igualmente|Há agentes mal adsorvidos.
É útil mesmo com via aérea insegura em qualquer paciente|Aspiração pode causar dano grave.
Substitui suporte respiratório|Não restaura ventilação.
Apenas a pressão define indicação|É necessária avaliação da exposição.

paracetamol|2|Cronologia
Pessoa procurou atendimento muito cedo após uma ingestão aguda única conhecida de paracetamol. Qual cuidado na interpretação da concentração inicial?
Verificar se o tempo de coleta é válido para o nomograma|Amostra muito precoce pode anteceder absorção suficiente.
Usar a qualquer tempo sem verificar horário|O nomograma relaciona tempo e concentração.
Excluir risco sempre que dosagem precoce é baixa|O resultado pode não representar o pico.
Trocar concentração por opinião sobre a dose|História ajuda, mas não substitui dados adequados.
Considerar testes hepáticos iniciais normais como alta automática|Lesão pode aparecer depois.

retorno|2|Monitorização
Paciente assintomático após ingestão de formulação de liberação prolongada. O que modifica observação?
Possibilidade de absorção e toxicidade tardias|O manejo depende de agente, dose, formulação, exames e orientação toxicológica.
Ausência inicial de sintomas encerra avaliação|A latência pode ser importante.
Todas as formulações têm a mesma curva|Liberação prolongada altera cinética.
O tempo relatado não importa|Tempo orienta testes e observação.
Apenas hidratação oral elimina todo risco|Não substitui avaliação específica.

suporte|2|Comunicação
Ao buscar apoio toxicológico, qual conjunto de informações melhora a decisão?
Substância, via, quantidade possível, tempo, formulação e estado atual|Permite estimar risco e orientar monitorização e tratamento.
Somente nome do paciente|Não informa exposição.
Apenas a suspeita de intoxicação|O apoio depende de dados mais específicos.
Somente fotografia sem horário|A imagem pode ajudar a identificar, mas não define cronologia.
Somente o último sinal vital|Faltam fonte e evolução.

retorno|3|Decisão de alta
Qual critério é mais útil em conjunto após resolução clínica de intoxicação intencional?
Estabilidade após período apropriado e avaliação de riscos médicos e psicossociais|Plano seguro depende de toxicidade tardia e risco de recorrência.
Antídoto administrado como único critério|Não garante resolução sustentada.
Alta automaticamente se exames iniciais normais|Podem ocorrer complicações posteriores.
Observar exclusivamente pupilas|Não resume risco individual.
Dispensar avaliação psicossocial pela melhora física|A intenção modifica seguimento e segurança.

canal|3|Farmacologia
Por que a resposta ao bicarbonato IV em bloqueio por tricíclico requer reavaliação seriada?
Há risco de persistência elétrica, distúrbios de pH e eletrólitos|Titulação exige ECG, hemodinâmica e exames.
O QRS nunca muda com a estratégia|Pode melhorar ou persistir.
A dose independe de resposta em todo cenário|A estratégia é monitorada.
Alcalinização não interfere em nenhuma variável|pH e eletrólitos podem mudar.
Bicarbonato elimina sistemicamente o agente de imediato|O objetivo é tratar toxicidade elétrica.
`);
add('tireoide',`
tempestade|1|Reconhecimento
Qual sinal é compatível com tempestade tireotóxica em quadro de tireotoxicose grave?
Taquiarritmia com febre|Hiperatividade adrenérgica e disfunção sistêmica apoiam a hipótese.
Hipotermia e bradicardia como padrão típico|Esses sinais favorecem mixedema.
Apenas aumento estável de peso|Não caracteriza tempestade.
Apenas TSH normal sem sintomas|Não caracteriza tireotoxicose grave.
Somente bócio antigo|Não define descompensação.

mixedema|1|Reconhecimento
Que alteração ventilatória é especialmente importante no mixedema grave?
Hipoventilação com retenção de CO₂|Déficit de estímulo ventilatório e fraqueza podem comprometer trocas.
Alcalose respiratória obrigatória|O fenômeno típico pode ser o oposto.
Hiperventilação por definição|O esforço pode estar reduzido.
Ventilação sempre normal|A insuficiência respiratória é possível.
Apenas aumento de PaO₂|Não representa o risco primário.

exames|2|Interpretação
Paciente crítico com suspeita de hipotireoidismo central tem T4 livre baixo e TSH sem elevação apropriada. Qual inferência?
TSH isolado não exclui disfunção central|Interprete T4 livre, eixo hipofisário e quadro clínico.
TSH normal exclui qualquer hipotireoidismo|Não vale na disfunção central.
T4 livre baixo confirma tempestade|Tempestade é tireotoxicose.
Usar só frequência para classificar o eixo|Exames e contexto importam.
Concluir doença tireoidiana sem considerar doença crítica|Doença não tireoidiana pode interferir.

ventilacao|3|Suporte
Pessoa com mixedema provável e obnubilação progride para hipercapnia e hipoxemia. Qual próximo raciocínio?
Priorizar suporte ventilatório e proteção de via aérea conforme gravidade|A investigação endócrina corre em paralelo.
Esperar efeito de hormônio antes de ventilar|A falência respiratória é imediata.
Retirar oxigênio para avaliar PaCO₂|Não trata risco atual.
Medir TSH novamente antes de examinar|Não deve atrasar suporte.
Atribuir hipercapnia a erro em todos os casos|Hipoventilação faz parte da síndrome.

precipitante|2|Causa concorrente
Paciente com mixedema grave e suspeita de infecção tem temperatura abaixo de 36 °C. Que cuidado?
Investigar infecção apesar de não haver febre|A doença e o estado global podem alterar resposta térmica.
Excluir infecção pelo frio|Não é um critério de exclusão.
Tratar exclusivamente temperatura|Suporte e causa devem ser abordados.
Usar só TSH para diagnosticar infecção|É outro eixo.
Adiar avaliação de perfusão por prever melhora hormonal|Perfusão requer monitorização atual.

iodo|2|Mecanismo
Qual ação diferencia tionamidas do uso de iodo na estratégia clássica de tempestade?
Tionamida reduz a síntese de novos hormônios|A sequência terapêutica aproveita alvos distintos.
Tionamida é apenas vasopressor|Não é seu mecanismo.
Iodo e tionamida são intercambiáveis|Têm ações e cuidados próprios.
Tionamida substitui ventilação|Suporte é independente.
Tionamida só corrige desidratação|Não é um fluido de ressuscitação.

cortisol|3|Segurança
Qual dado torna relevante preparar avaliação de insuficiência adrenal antes de reposição tireoidiana no mixedema grave?
Choque associado e possibilidade de deficiência concomitante|A reposição pode elevar a necessidade de cortisol.
TSH elevado exclui doença adrenal|São eixos distintos.
Ausência de hipercalemia exclui toda insuficiência adrenal|A apresentação é variável.
Pressão baixa é indicação de esperar todo exame antes de suporte|Instabilidade exige cuidado imediato.
A tireoide produz cortisol quando recebe levotiroxina|Cortisol é adrenal.

beta|2|Interpretação
Paciente com tempestade, taquicardia e perfusão preservada está sendo monitorizado. O que o controle adrenérgico aborda?
Manifestações como frequência elevada, em contexto de avaliação da função cardíaca|É parte do controle sintomático, com cautelas hemodinâmicas.
Elimina instantaneamente o gatilho infeccioso|Não trata infecção.
Não precisa considerar asma ou choque|Condições concorrentes afetam segurança.
Substitui controle tireoidiano em todos os casos|O manejo depende de várias medidas.
Trata apenas hiponatremia|Não é seu alvo.

tempestade|3|Diagnóstico diferencial
Pessoa com antecedentes tireoidianos chega febril e taquicárdica, com pneumonite e confusão. Como usar escores de tempestade?
Como apoio à avaliação, com atenção a sobreposição com sepse e outras causas|Sintomas podem ser compartilhados e o tratamento pode ser paralelo.
Escala positiva exclui sepse|Os quadros podem coexistir.
Escala baixa torna toda tireotoxicose irrelevante|O contexto clínico continua necessário.
Escala substitui avaliação hemodinâmica|Não mede todas as necessidades de suporte.
Escala determina um fármaco único para todos|A escolha depende da etiologia e do risco.

exames|1|Exames
Qual combinação é mais informativa que TSH sozinho na avaliação tireoidiana aguda?
TSH, T4 livre e quadro clínico|Interpretação depende do eixo hormonal e da gravidade.
TSH e grupo sanguíneo|Grupo sanguíneo não avalia eixo.
TSH e altura|Altura não esclarece disfunção aguda.
TSH e creatinina isolada|Não substitui medida hormonal e clínica.
TSH e temperatura sem demais dados|A temperatura é inespecífica.

ventilacao|2|Monitorização
Durante tratamento de mixedema, que evolução exige atenção urgente ainda que a temperatura melhore?
Piora da ventilação ou da consciência|Melhora de um marcador não indica resolução de falência sistêmica.
Temperatura subindo gradualmente com estabilidade|Pode ser favorável no contexto.
Repetição de um valor sem mudança clínica|Tendência é útil, mas não é ameaça isolada.
Presença de antecedente de hipotireoidismo|É informação basal.
Ausência de taquicardia|Não define sozinha deterioração.

precipitante|2|Investigar história
Que dado de adesão muda a interpretação em pessoa com tempestade provável?
Interrupção recente de tratamento antitireoidiano|Pode favorecer descompensação.
Vacinação antiga sem sintomas|Isoladamente não estabelece gatilho.
Uso de óculos|Não tem relação causal.
Grupo sanguíneo|Não caracteriza descompensação.
História de dieta isolada sem contexto|Não substitui exposição medicamentosa e exames.

mixedema|2|Diferencial
Pessoa hipotérmica, hiponatrêmica e rebaixada tem glicemia de 45 mg/dL. Qual medida evita dano enquanto se investiga mixedema?
Corrigir hipoglicemia e sustentar funções vitais em paralelo|Hipoglicemia pode contribuir para o sensório e é reversível.
Aguardar exame tireoidiano para corrigir glicemia|A hipoglicemia exige ação.
Atribuir todo rebaixamento à tireoide|Causas simultâneas são possíveis.
Administrar glicose oral com deglutição insegura|A via deve respeitar proteção da via aérea.
Considerar glicemia baixa um critério de exclusão de mixedema|Pode coexistir.

beta|3|Segurança
Após medicamento para reduzir frequência na tempestade, a PA cai, a perfusão piora e a frequência diminui. Qual leitura mais segura?
Reavaliar baixo débito, efeito do fármaco e necessidade de suporte|Frequência menor não garante benefício se perfusão piorou.
Interpretar dose como bem-sucedida só pela frequência|Perfusão é desfecho central.
Aumentar dose automaticamente|Pode agravar disfunção.
Aguardar TSH para agir|Instabilidade exige resposta imediata.
Ignorar avaliação cardíaca porque a causa é endócrina|Disfunção cardíaca pode complicar tempestade.
`);
add('catastrofes',`
capacidade|1|Conceito
Qual objetivo central da triagem quando o número de vítimas excede a capacidade imediata?
Ordenar intervenções segundo urgência, benefício provável e recursos|A avaliação é rápida e sujeita a reclassificação.
Fechar diagnóstico completo de cada vítima|O tempo inicial é limitado.
Classificar apenas por ordem de chegada|Não considera urgência ou benefício.
Prever a evolução com certeza|Categorias mudam.
Enviar todas ao mesmo destino|Pode comprometer a rede.

start|1|Reconhecimento
Que três eixos fisiológicos o START adulto avalia nas vítimas que não deambulam?
Respiração, perfusão e capacidade de obedecer comandos|A decisão usa marcadores rápidos segundo protocolo.
Temperatura, peso e alergias|São dados úteis em outros contextos, não a sequência inicial.
Laboratório, tomografia e eletrocardiograma|Não são pré-requisitos da triagem.
Dor, idade e tempo de espera isoladamente|Não resumem fisiologia.
Documento, seguro e endereço|São dados administrativos.

start|2|Aplicação
No START adulto, vítima que não deambula não respira inicialmente, mas retoma respiração após abertura de via aérea. Qual prioridade no algoritmo padrão?
Imediata|A retomada após intervenção simples indica categoria imediata.
Mínima|A retomada não torna a vítima de baixa prioridade.
Atrasada|Comprometimento respiratório inicial altera a classificação.
Categoria de vítima que segue apneica|A vítima recuperou ventilação.
Sem classificação até radiografia|A decisão é clínica na cena.

start|2|Aplicação
Adulto que não deambula respira a 34/min no protocolo START clássico. Qual classificação inicial?
Imediata|Respiração acima de 30/min aciona essa categoria no START adulto clássico.
Mínima|O padrão ventilatório é anormal para a regra.
Atrasada só porque respira espontaneamente|Frequência acima do limiar muda prioridade.
Sem classificação até medir temperatura|A medida respiratória já orienta.
Categoria de apneia persistente|A vítima respira.

start|3|Aplicação
No START adulto clássico, vítima não deambula, respira a 22/min, tem pulso radial presente e não obedece a comandos. Qual categorização inicial?
Imediata|Incapacidade de obedecer comandos é critério mesmo com respiração e perfusão dentro da faixa de decisão.
Atrasada pois tem pulso radial|O critério mental ainda precisa ser aplicado.
Mínima porque está acordada|Deambulação e exame fisiológico importam.
Sem observação se não há sangramento externo|Lesões críticas podem ser ocultas.
Categoria de apneia persistente|Há respiração.

start|2|Aplicação
Adulto que não deambula, respira a 20/min, tem perfusão adequada e obedece a comandos. No START clássico, qual categoria inicial?
Atrasada|Os marcadores imediatos do algoritmo não foram acionados, mas não deambula.
Mínima pela respiração dentro do limiar|A vítima está no grupo não deambulante.
Imediata apenas por não deambular|O método segue para marcadores fisiológicos.
Sem categoria por falta de exames|A triagem é clínica.
Categoria de apneia persistente|A vítima respira.

cena|3|Coordenação
Área com risco químico segue insegura quando chegam mais ambulâncias. Qual intervenção de comando é apropriada?
Restringir acesso e coordenar controle do risco e fluxo de descontaminação|A resposta exige proteção das equipes e da rede.
Abrir acesso a todos os socorristas|Pode ampliar a exposição.
Transportar contaminados sem avisar destino|Pode haver contaminação secundária.
Adiar aviso até conhecer o agente exato|O risco suspeito já exige comunicação.
Transferir coordenação para cada veículo isoladamente|A resposta precisa de comando comum.

comando|2|Comunicação
Qual mensagem inicial ajuda regulação sem exigir contagem perfeita?
Local, tipo de incidente, riscos, estimativa de vítimas, acessos e recursos necessários|Dados acionáveis permitem resposta antecipada.
Apenas número depois de identificação completa|Atrasa mobilização.
Apenas nome do primeiro socorrista|Não orienta logística.
Somente lista de lesões após diagnóstico definitivo|Dados iniciais são necessários antes disso.
Somente destino do primeiro transporte|Não dimensiona incidente.

retriagem|2|Monitorização
No posto de tratamento, vítima deambulante inicialmente verde passa a ficar dispneica e confusa. O que fazer?
Reavaliar fisiologia e atualizar categoria e plano|A deambulação inicial é triagem, não garantia de estabilidade.
Manter verde até o hospital|Deterioração exige nova decisão.
Ignorar porque andou|Lesões podem evoluir.
Mudar cor sem comunicar o posto|A equipe receptora precisa de atualização.
Considerar novo quadro como simples ansiedade sem examinar|Há sinais de alarme.

transporte|3|Capacidade
Vítima grave precisa de intervenção especializada indisponível no hospital mais próximo. Que decisão é proporcional?
Regular destino conforme urgência, capacidade e condições de transporte|Distância conta, junto da capacidade de resolver a ameaça.
Enviar automaticamente a unidade mais próxima|Ela pode não oferecer o cuidado necessário.
Escolher sempre o hospital mais distante|Distância não garante capacidade.
Aguardar vaga sem reavaliar|A prioridade e o estado podem mudar.
Ignorar informação clínica na regulação|A necessidade específica deve ser comunicada.

etiqueta|2|Continuidade
A categoria de uma vítima mudou após controle de sangramento. Como manter rastreabilidade?
Registrar categoria nova, tempo, intervenção e comunicação|Permite recuperar evolução sem depender de memória.
Apagar toda classificação anterior sem horário|Perde a trajetória.
Registrar apenas cor sem intervenção|Não explica a mudança.
Manter etiqueta sem conferência no embarque|Informação pode estar desatualizada.
Comunicar só verbalmente e omitir registro|Perde rastreabilidade em transições.

pediatria|2|Segurança
Criança em incidente coletivo tem padrão respiratório cujo significado muda com idade. Que dado deve orientar o algoritmo?
Usar critérios fisiológicos e ferramenta pediátrica de referência local|A fisiologia não é equivalente à do adulto.
Usar limiar adulto em toda idade|Pode produzir categorias incorretas.
Colocar todas as crianças em categoria mínima|Não considera fisiologia.
Classificar apenas pelo peso|Não resume gravidade.
Aguardar exame complementar de rotina|A triagem inicial é clínica.

capacidade|3|Conflito de recursos
Chegam duas vítimas com necessidades distintas e apenas um meio avançado de transporte imediato. Como decidir?
Reavaliar gravidade, benefício esperado, tempo e capacidade da rede conforme protocolo|A decisão se baseia em necessidade e recurso disponível, com documentação.
Transportar quem fez o primeiro pedido|A ordem do pedido não determina urgência.
Classificar apenas pela idade|Idade isolada não mede benefício ou ameaça imediata.
Fixar categorias sem reavaliação|A situação é dinâmica.
Omitir discussão com regulação|A rede coordena destinos e recursos.

cena|1|Priorização
Qual diferença prática entre triagem e tratamento no cenário inicial?
Triagem classifica rapidamente e inclui intervenções imediatas previstas; tratamento aprofundado segue o fluxo|A divisão mantém capacidade de avaliar muitas vítimas.
A triagem exige completar todo tratamento antes da vítima seguinte|Isso bloqueia a classificação rápida.
Triagem significa nunca intervir|Intervenções rápidas podem ser previstas.
Tratamento e transporte dispensam registro|A rastreabilidade continua necessária.
O primeiro examinador define diagnóstico definitivo para todos|A avaliação é inicial e revisável.
`);
add('paliativos',`
objetivos|1|Conceito
Quem pode se beneficiar de cuidado paliativo?
Pessoa com doença grave e sofrimento relevante, inclusive durante tratamento da doença|Cuidados paliativos podem coexistir com terapias modificadoras.
Apenas quem interrompeu todos os tratamentos|O cuidado pode ser integrado.
Somente pessoas nas últimas horas|Pode ser iniciado antes.
Somente pacientes com câncer|Outras doenças graves também geram necessidades.
Apenas quem tem ordem de não reanimar|São decisões diferentes.

objetivos|2|Proporcionalidade
Pessoa com doença avançada deseja ficar lúcida para conversar, mas refere dor. Qual abordagem melhor combina os objetivos?
Titular medidas de alívio avaliando dor, sedação e preferência por lucidez|Proporcionalidade considera o desfecho que importa à pessoa.
Aumentar sedativos sem discutir lucidez|Pode contrariar a prioridade.
Deixar dor sem tratamento para manter vigília|Há opções que podem equilibrar os objetivos.
Usar apenas sinais vitais como medida de sucesso|Experiência de sofrimento e lucidez importam.
Definir objetivo exclusivamente pelo diagnóstico|Preferências individuais orientam.

dor|2|Reavaliação
Após ajuste de analgésico, paciente tem menos dor, mas sedação maior do que deseja. Qual ação?
Reavaliar benefício, efeitos adversos e alternativas com a pessoa e a equipe|Alívio e tolerância orientam titulação.
Declarar melhora completa pelo escore de dor|Ignora efeito valorizado pelo paciente.
Aumentar automaticamente dose|Pode agravar sedação.
Interromper todo cuidado proporcional|Há ajustes possíveis.
Substituir diálogo por protocolo único|Metas e contexto importam.

dor|3|Farmacologia
Paciente em conforto tem dor e disfunção renal progressiva. Qual cautela ao escolher opioide?
Revisar substância, metabólitos, função renal e resposta antes de titular|Acúmulo e toxicidade variam com o fármaco.
Considerar todos os opioides iguais na disfunção renal|Propriedades e metabólitos diferem.
Titular sem examinar sedação e ventilação|Efeitos adversos precisam de vigilância.
Usar apenas idade para calcular escolha|Função orgânica e exposição também importam.
Evitar qualquer analgesia independentemente de sofrimento|Analgesia proporcional segue relevante.

dispneia|2|Proporcionalidade
Pessoa com dispneia em fim de vida tem secreção e derrame pleural provável. Que pergunta orienta considerar procedimento?
O potencial de alívio justifica a carga e corresponde às metas?|Avalie benefício esperado, riscos e preferências.
Causa reversível obriga intervenção invasiva sempre|Reversibilidade não é o único critério.
Cuidado paliativo proíbe qualquer procedimento|Procedimentos podem ser apropriados para alívio.
Imagem isolada decide a preferência|A decisão requer diálogo e contexto.
Somente normalizar a imagem define sucesso|Conforto e objetivos são centrais.

comunicacao|2|Comunicação
Família ouve que o paciente está em deterioração e pede uma previsão exata. Qual resposta preserva confiança?
Explicar o que é conhecido, explicitar a incerteza e dizer como a equipe acompanhará|Comunicação franca evita falsa precisão e mantém plano.
Prometer um horário exato sem dados|Cria falsa certeza.
Evitar qualquer informação difícil|Impede participação informada.
Usar apenas termos técnicos|Pode dificultar compreensão.
Adiar sempre até o momento de morrer|Discussões antecipadas orientam cuidado.

comunicacao|2|Escuta
Antes de explicar prognóstico, qual pergunta ajuda a adaptar a conversa?
O que a pessoa já entende e quanto quer saber agora?|Permite calibrar informação e respeitar preferências.
Quem tem a opinião mais forte na sala?|Não identifica compreensão nem autonomia.
Qual intervenção prefere sem explicar opções?|A decisão precisa de contexto.
Quer que não falemos mais disso?|Pode fechar diálogo antes de explorar necessidades.
Podemos assumir que todos entenderam?|É melhor confirmar explicitamente.

registro|1|Continuidade
Qual dado é essencial no registro de metas de cuidado?
Intervenções específicas, participantes, preferência conhecida e plano de revisão|Promove continuidade entre equipes.
Somente a expressão “paliativo”|É ambígua para decisões concretas.
Somente o diagnóstico|Não descreve metas.
Somente o nome de um profissional|Não orienta conduta.
Apenas a data de internação|Não esclarece decisões.

dnr|2|Escopo
Pessoa tem ordem documentada de não reanimar, mas chega com hipoglicemia sintomática e pulso. Qual distinção importa?
Ordem de RCP não define sozinha o manejo da hipoglicemia antes da parada|Cuidado proporcional segue o plano e a necessidade atual.
A ordem transforma hipoglicemia em evento sem tratamento possível|O escopo é específico.
Toda intervenção antes de parada viola a ordem|Confunde decisões diferentes.
É preciso iniciar compressões por ter ordem não reanimar|Há pulso e não há indicação.
A ordem dispensa avaliar preferências adicionais|Outros limites precisam ser conhecidos.

delirium|2|Ambiente
Paciente paliativo piora confusão à noite, sem ameaça imediata. Que medida de baixa carga pode integrar a abordagem?
Revisar medicamentos, orientar e reduzir fatores ambientais desorganizadores|Medidas não farmacológicas e causas reversíveis podem aliviar.
Restringir fisicamente como rotina imediata|Pode agravar sofrimento e exige indicação específica.
Manter estímulos intensos continuamente|Pode piorar desorganização.
Atribuir toda confusão a demência antiga|Delirium é flutuante e pode ter causas tratáveis.
Usar sedação profunda automática|É medida distinta com critérios próprios.

sedacao|3|Objetivo
Qual desfecho orienta titulação de sedação paliativa quando indicada?
Alívio proporcional de sofrimento refratário, com monitorização|A profundidade é ajustada ao alívio necessário.
Perda obrigatória da consciência em todos os casos|A profundidade depende do objetivo e da resposta.
Normalização de todos os exames|A intervenção visa sofrimento.
Atender pedido isolado sem avaliação|Refratariedade e decisão precisam de avaliação.
Substituir toda comunicação com a família|Explicação e seguimento são essenciais.

objetivos|3|Incerto
Uma intervenção potencialmente reversível tem benefício incerto e carga moderada. A pessoa aceita tentar se houver critérios de parada. Qual estratégia?
Acordar tentativa limitada no tempo com objetivos e reavaliação|Permite avaliar resposta e respeitar preferências.
Prometer benefício certo|O benefício é incerto.
Iniciar sem combinar quando reavaliar|Pode prolongar carga sem objetivo.
Recusar discussão porque a pessoa está em paliativos|Cuidado paliativo admite tentativas proporcionais.
Converter automaticamente em terapia indefinida|Contraria a condição da pessoa.

registro|2|Transferência
Na mudança de plantão, o que protege melhor uma decisão de metas pactuada?
Transmitir e documentar limites, cuidados mantidos e gatilhos de nova conversa|Evita interpretação inconsistente entre equipes.
Repassar apenas código abreviado sem contexto|Pode ser ambíguo.
Assumir que todos lerão todo o prontuário antes de agir|Comunicação direta ajuda continuidade.
Omitir intervenções aceitas|Pode levar à omissão de cuidado.
Evitar reavaliar quando o estado mudar|Preferências e contexto devem ser revisitados.

objetivos|2|Autonomia
Pessoa sem capacidade decisória atual deixou preferências conhecidas antes da deterioração. Que fonte deve orientar a discussão com representante?
Valores e preferências documentados, integrados à situação clínica|O representante ajuda a expressar a vontade previamente conhecida.
Apenas a intervenção mais invasiva disponível|Disponibilidade não define adequação.
A preferência do profissional como regra única|A decisão deve considerar a pessoa.
Excluir preferências antigas sem razão|Elas ajudam a orientar representação.
Decidir exclusivamente pelo tempo estimado de internação|Tempo não substitui valores e prognóstico.
`);
})();
