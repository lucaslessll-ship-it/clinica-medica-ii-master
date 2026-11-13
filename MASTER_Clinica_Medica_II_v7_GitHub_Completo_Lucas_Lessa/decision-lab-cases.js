/* Original learning scenarios derived from the existing curriculum. The source IDs
   refer to the site's thematic bibliography, not independently rechecked protocols.
   No drug doses or real patient records are introduced. Legacy case IDs are unchanged. */
window.MASTER_DECISION_CASES=(()=>{
  const step=(title,patient,ask,o,a,why)=>({title,patient,ask,o,a,why});
  return [
    {id:'dl-status',topic:'neuro1',label:'Crise prolongada: sequência',period:'P2',source:'AES',summary:'O tempo e a resposta ao tratamento mudam a próxima intervenção.',stages:[
      step('Etapa 1 — Relógio clínico','Adulto apresenta crise tônico-clônica contínua há seis minutos. A equipe está ao lado do paciente.','Qual é a prioridade?',[
        'Aguardar EEG para demonstrar atividade epiléptica antes de tratar',
        'Proteger ABC, verificar glicemia e tratar estado de mal com primeira linha adequada em paralelo',
        'Encaminhar para consulta ambulatorial após observar mais meia hora'
      ],1,'A duração torna o quadro uma emergência. ABC, avaliação metabólica e benzodiazepínico conforme protocolo não devem esperar EEG; observação prolongada adia tratamento tempo-dependente.'),
      step('Etapa 2 — Primeira linha já feita','A crise persiste apesar da primeira linha adequadamente administrada. A ventilação está sendo monitorada.','Qual mudança é necessária?',[
        'Escalar para um fármaco de segunda linha conforme contraindicações e protocolo',
        'Repetir indefinidamente a mesma intervenção, sem reavaliar a via aérea',
        'Iniciar apenas antiepiléptico oral de manutenção e aguardar'
      ],0,'Persistência após primeira linha exige escalonamento e reavaliação contínua. Repetições sem estratégia atrasam controle e podem agravar depressão respiratória; manutenção oral não substitui tratamento agudo.'),
      step('Etapa 3 — Movimentos cessaram, consciência não','Após o tratamento, cessam os abalos, mas não há recuperação como esperado e persistem alterações de consciência.','Qual raciocínio é mais seguro?',[
        'A ausência de movimentos garante fim da atividade epiléptica',
        'Dar alta porque já não há crise visível',
        'Reavaliar causas e efeitos de medicações, considerar estado não convulsivo e obter EEG em ambiente apropriado'
      ],2,'O exame motor não exclui atividade elétrica persistente. EEG e investigação do estado mental são necessários no contexto; alta ou certeza de resolução com base apenas no fim dos abalos são prematuras.')
    ]},
    {id:'dl-variantes-sgb',topic:'neuro2',label:'Ataxia, olhos e consciência',period:'P2',source:'GBS',summary:'Uma alteração de consciência muda a localização e os diferenciais.',stages:[
      step('Etapa 1 — A tríade','Adulto após infecção apresenta oftalmoplegia, ataxia e arreflexia, com consciência preservada.','Qual hipótese integra melhor os achados?',[
        'Variante de Miller Fisher no espectro de SGB',
        'Miastenia ocular explica obrigatoriamente arreflexia e ataxia',
        'Esclerose múltipla confirmada apenas pela diplopia'
      ],0,'A tríade favorece Miller Fisher. Diplopia isolada não basta para EM, e ataxia/arreflexia não são explicadas pela topografia de uma miastenia ocular pura.'),
      step('Etapa 2 — Um sinal central','Em outro cenário, além de oftalmoplegia e ataxia, há sonolência e sinais piramidais.','Como reformular a hipótese?',[
        'Insistir em Miller Fisher puro, porque consciência não localiza lesão',
        'Considerar Bickerstaff e excluir causas de tronco/encefalopatia conforme apresentação',
        'Atribuir automaticamente os achados a ansiedade'
      ],1,'Consciência e sinais piramidais acrescentam envolvimento central. Bickerstaff entra no espectro, mas AVC de tronco e outras causas precisam ser considerados; não basta repetir o rótulo periférico.'),
      step('Etapa 3 — Sorologia negativa','O anti-GQ1b vem negativo, mas a síndrome clínica persiste.','O resultado permite encerrar a investigação?',[
        'Sim, o anticorpo negativo exclui todo o espectro',
        'Sim, desde que a saturação esteja normal',
        'Não; integrar evolução, exame, testes complementares e vigilância respiratória/autonômica'
      ],2,'O marcador não é perfeitamente sensível. A saturação também não exclui risco ventilatório neuromuscular; o acompanhamento clínico e os diferenciais permanecem necessários.')
    ]},
    {id:'dl-em-infeccao',topic:'neuro3',label:'EM: surto ou pseudossurto?',period:'P2',source:'MS',summary:'Febre e infecção podem recrudescer sintomas antigos sem definir um novo surto.',stages:[
      step('Etapa 1 — Piora durante febre','Pessoa com EM e déficit antigo apresenta piora do mesmo déficit durante febre e disúria.','Qual avaliação deve preceder pulsoterapia automática?',[
        'Presumir falha da terapia de base só pela piora transitória',
        'Ignorar febre e tratar todo sintoma como novo surto',
        'Investigar infecção, examinar neurologicamente e distinguir pseudossurto de nova atividade'
      ],2,'Infecção e temperatura podem agravar sintomas antigos. Isso exige investigação do gatilho e do exame; não confirma novo surto ou falha do tratamento de base por si só.'),
      step('Etapa 2 — O gatilho foi tratado','Após resolução do quadro infeccioso, surge novo déficit focal persistente, distinto do padrão antigo.','Qual próximo passo?',[
        'Reavaliar possível surto e necessidade de investigação e tratamento especializado',
        'Excluir surto para sempre, pois houve infecção antes',
        'Aumentar por conta própria o corticoide de manutenção'
      ],0,'Um déficit novo persistente pede reavaliação; o episódio infeccioso anterior não encerra o diagnóstico. A decisão sobre corticoide e tratamento modificador exige caracterização, não autoadministração.'),
      step('Etapa 3 — Impacto funcional','O novo déficit limita marcha e autocuidado, e a avaliação afasta um gatilho infeccioso ativo.','Qual fundamento orienta o manejo?',[
        'Apenas o número de lesões antigas, sem avaliar a função atual',
        'Gravidade, impacto funcional, diagnóstico do episódio e riscos individuais do tratamento',
        'O desejo de usar sempre a mesma via de medicação em todos os episódios'
      ],1,'A decisão integra impacto clínico e segurança. Lesões antigas ou preferência por uma via não substituem a avaliação do episódio e das comorbidades.')
    ]},
    {id:'dl-saaf',topic:'reuma2',label:'Trombose e anticorpos',period:'P2',source:'APS',summary:'Persistência laboratorial e perfil de risco mudam a interpretação e a escolha terapêutica.',stages:[
      step('Etapa 1 — Um teste isolado','Paciente teve trombose e um anticorpo antifosfolípide positivo durante doença aguda.','O que essa informação permite concluir?',[
        'Qualquer positividade isolada confirma definitivamente SAAF',
        'Há hipótese a investigar; integrar evento clínico, teste e persistência conforme critérios',
        'É preciso suspender todo tratamento da trombose até repetir exames'
      ],1,'Um teste isolado pode ser transitório. A investigação de SAAF considera contexto e persistência; isso não autoriza atrasar o manejo de uma trombose aguda.'),
      step('Etapa 2 — Persistência e alto risco','Os anticorpos permanecem positivos no intervalo apropriado e a avaliação identifica perfil de alto risco.','Qual cuidado muda a escolha de anticoagulante?',[
        'Não presumir equivalência entre anticoagulante direto e varfarina nesse perfil',
        'Escolher qualquer anticoagulante apenas pela comodidade, pois todos são equivalentes na SAAF',
        'Substituir anticoagulação indicada por antiplaquetário sem analisar o evento'
      ],0,'Na SAAF trombótica de alto risco, a escolha não pode ser extrapolada de FA comum. Perfil, evento e contraindicações precisam ser discutidos; comodidade isolada ou troca por antiplaquetário não resolvem essa decisão.'),
      step('Etapa 3 — Gravidez planejada','A paciente informa intenção de engravidar durante tratamento.','O que muda no plano?',[
        'Nenhuma revisão é necessária porque o diagnóstico já foi definido',
        'Interromper toda prevenção por conta própria ao suspeitar de gravidez',
        'Planejar manejo obstétrico/hematológico e rever segurança dos fármacos antes da gestação'
      ],2,'Gestação altera riscos e escolhas. Planejamento especializado reduz interrupções e exposições inadequadas; nem manutenção automática nem abandono de tratamento são respostas seguras.')
    ]},
    {id:'dl-miosite-pulmao',topic:'reuma1',label:'Miopatia: o pulmão muda tudo',period:'P2',source:'MYOSITIS',summary:'A creatinoquinase isolada não mede todo o risco de doença sistêmica.',stages:[
      step('Etapa 1 — Fraqueza objetiva','Pessoa com dificuldade progressiva para levantar da cadeira tem fraqueza proximal ao exame e lesões cutâneas sugestivas.','Qual investigação melhor organiza o caso?',[
        'Síndrome miopática, confirmação de lesão muscular e avaliação de acometimento sistêmico',
        'Rotular como fadiga sem testar força porque não há dor intensa',
        'Solicitar apenas marcador tumoral para definir toda a doença'
      ],0,'Fraqueza demonstrada exige localização e investigação muscular/sistêmica. Ausência de dor não elimina miopatia; marcador tumoral isolado não substitui a avaliação.'),
      step('Etapa 2 — Dispneia progressiva','Surgem tosse e dispneia em progressão, embora a CK esteja pouco elevada.','Qual interpretação é apropriada?',[
        'CK baixa exclui doença pulmonar ligada à miosite',
        'Priorizar apenas reabilitação e adiar avaliação respiratória',
        'Investigar doença intersticial e gravidade respiratória; CK não exclui fenótipo de alto risco'
      ],2,'Alguns fenótipos têm acometimento pulmonar importante com pouca elevação muscular. Exames de tórax e função/gravidade respiratória respondem a outra pergunta, que a CK não resolve.'),
      step('Etapa 3 — Disfagia','A paciente passa a engasgar e relata dificuldade para eliminar secreções.','Qual prioridade deve entrar no plano?',[
        'Aumentar o treino físico antes de avaliar deglutição',
        'Avaliar segurança de deglutição/via aérea, aspiração e necessidade de cuidado hospitalar',
        'Considerar o sintoma irrelevante para doença muscular'
      ],1,'Disfagia e secreções acrescentam risco de aspiração e comprometimento bulbar. A avaliação de segurança precede reabilitação indiscriminada ou espera ambulatorial.')
    ]},
    {id:'dl-sjogren',topic:'reuma1',label:'Sjögren: sicca ou alerta?',period:'P2',source:'SJOG',summary:'Tratamento de secura e investigação de doença sistêmica não são a mesma decisão.',stages:[
      step('Etapa 1 — Sintomas de secura','Adulto apresenta boca e olhos secos, com uso de medicações potencialmente ressecantes.','Qual primeiro raciocínio?',[
        'Diagnosticar Sjögren por um sintoma e iniciar imunossupressão sistêmica',
        'Rever medicamentos, investigar causas e avaliar objetivamente o quadro sicca',
        'Excluir doença porque o sintoma também pode ser medicamentoso'
      ],1,'Sintomas de secura têm diagnósticos diferenciais. Revisão e avaliação objetiva evitam tanto sobrediagnóstico quanto descarte automático da doença autoimune.'),
      step('Etapa 2 — Sintoma isolado confirmado','A avaliação encontra Sjögren com secura, sem manifestação ameaçadora de órgão identificada.','Qual princípio terapêutico é coerente?',[
        'Priorizar medidas locais/sintomáticas e prevenção de dano, ajustadas à avaliação',
        'Indicar sempre pulsoterapia porque a etiologia é autoimune',
        'Dispensar acompanhamento odontológico e ocular quando há tratamento sistêmico'
      ],0,'O manejo de sicca não se equipara ao de doença sistêmica grave. Medidas locais e prevenção ocular/oral permanecem centrais; autoimunidade não é indicação universal de pulsoterapia.'),
      step('Etapa 3 — Aumento glandular persistente','Meses depois há aumento persistente e assimétrico de parótida, linfonodos e perda de peso.','Qual mudança é necessária?',[
        'Renovar apenas tratamento de secura por ser manifestação habitual',
        'Concluir linfoma sem obter investigação',
        'Investigar complicação linfoproliferativa e outras causas, com avaliação especializada e tecido quando indicado'
      ],2,'O padrão é sinal de alerta, não prova isolada de linfoma. Exige investigação dirigida; atribuí-lo automaticamente à sicca também pode atrasar um diagnóstico relevante.')
    ]},
    {id:'dl-colite-grave',topic:'gastro',label:'Colite: gravidade e infecção',period:'P2',source:'UC',summary:'O diagnóstico prévio não dispensa pesquisar gatilhos e complicações.',stages:[
      step('Etapa 1 — Atividade importante','Paciente com retocolite apresenta evacuações sanguinolentas frequentes, taquicardia e prostração.','Qual decisão deve vir antes de uma simples renovação de receita?',[
        'Avaliar gravidade, hidratação, repercussão sistêmica e local de cuidado',
        'Classificar como doença leve apenas por já existir diagnóstico',
        'Recomendar antidiarreico de rotina sem avaliar complicações'
      ],0,'Atividade com repercussão sistêmica exige estratificação e pode necessitar internação. Diagnóstico antigo não define gravidade atual, e suprimir motilidade sem avaliação pode ser inadequado.'),
      step('Etapa 2 — Antibiótico recente','A piora seguiu uso de antibiótico e há febre.','O que deve ser incorporado à investigação?',[
        'A hipótese de DII elimina qualquer infecção associada',
        'Infecção, inclusive C. difficile, além de atividade inflamatória',
        'Apenas sorologia celíaca, porque explica automaticamente a febre'
      ],1,'Infecção pode mimetizar ou agravar o quadro. Ela não é excluída pelo diagnóstico de retocolite, e investigar apenas outra doença crônica ignora um gatilho tratável.'),
      step('Etapa 3 — Abdome distendido','Surgem distensão acentuada, dor e piora sistêmica.','Qual resposta é mais segura?',[
        'Manter manejo ambulatorial sem novo exame',
        'Solicitar colonoscopia completa eletiva como única providência',
        'Avaliar urgentemente complicações como dilatação tóxica/perfuração e acionar cuidado hospitalar multidisciplinar'
      ],2,'Distensão e toxicidade mudam o risco. Complicações requerem avaliação urgente, imagem e discussão especializada; exame endoscópico completo indiscriminado ou espera eletiva não substituem essa avaliação.')
    ]},
    {id:'dl-celiaca-teste',topic:'gastro',label:'Celíaca: teste fora do contexto',period:'P2',source:'CEL',summary:'Exposição ao glúten e imunoglobulinas influenciam a interpretação do exame.',stages:[
      step('Etapa 1 — Dieta antes do teste','Pessoa com diarreia e anemia iniciou dieta sem glúten por conta própria semanas antes da investigação. A sorologia é negativa.','Qual limite precisa ser reconhecido?',[
        'Sorologia negativa sempre exclui celíaca, independentemente da dieta',
        'Menor exposição ao glúten pode reduzir a sensibilidade dos testes; revisar condições da investigação',
        'Melhora com dieta confirma definitivamente o diagnóstico'
      ],1,'Dieta pode alterar testes, e melhora sintomática não é específica. É preciso reconstruir exposição e investigação; não concluir exclusão ou confirmação por um dado isolado.'),
      step('Etapa 2 — Deficiência de IgA','Outra pessoa tem suspeita clínica, tTG-IgA negativa e IgA total muito baixa.','Qual estratégia faz sentido?',[
        'Repetir indefinidamente apenas o mesmo teste IgA',
        'Desconsiderar a anemia porque a sorologia veio negativa',
        'Considerar testes baseados em IgG e avaliação endoscópica/biópsia conforme contexto'
      ],2,'A deficiência de IgA limita a sorologia dessa classe. A estratégia precisa se adaptar à imunoglobulina e ao risco clínico, sem abandonar a investigação de anemia.'),
      step('Etapa 3 — Planejar nova avaliação','A investigação continua inconclusiva após restrição dietética prévia.','Como conduzir o próximo passo?',[
        'Planejar avaliação especializada, exposição/testes quando apropriados e discutir limites e segurança',
        'Recomendar desafio de glúten universal por conta própria, sem avaliar o caso',
        'Registrar diagnóstico definitivo apenas para encerrar a investigação'
      ],0,'A confirmação deve ser planejada no contexto individual. Não há desafio universal para autoadministração, e conveniência administrativa não substitui critérios diagnósticos.')
    ]},
    {id:'dl-ccr-anemia',topic:'gastro',label:'Anemia e mudança intestinal',period:'P2',source:'CRC',summary:'Investigar sintomas é diferente de aplicar rastreamento a pessoa assintomática.',stages:[
      step('Etapa 1 — Sinal de alarme','Adulto mais velho tem anemia ferropriva nova, perda de peso e mudança persistente do hábito intestinal.','Qual enquadramento é adequado?',[
        'Investigação diagnóstica de sinais de alarme, incluindo avaliação colorretal',
        'Apenas aguardar a idade da próxima rodada de rastreamento',
        'Atribuir anemia a hemorroidas sem confirmar a causa'
      ],0,'Sinais de alarme exigem investigação diagnóstica. Calendário de rastreamento de assintomáticos e uma causa presumida de sangramento não explicam automaticamente o quadro.'),
      step('Etapa 2 — Sangue oculto negativo','Um teste fecal veio negativo, mas os sintomas persistem.','Como interpretar?',[
        'O teste negativo encerra toda investigação de anemia',
        'O resultado isolado não elimina indicação de investigação diagnóstica no contexto de risco',
        'É possível afirmar ausência de neoplasia sem examinar o paciente'
      ],1,'Um teste de triagem negativo não substitui avaliação de sinais de alarme. A decisão depende da hipótese e do risco pré-teste, não apenas do resultado isolado.'),
      step('Etapa 3 — Lesão identificada','A investigação encontra lesão colorretal suspeita.','Qual passo organiza a decisão terapêutica?',[
        'Começar o mesmo esquema de quimioterapia de qualquer tumor',
        'Prescrever apenas ferro e considerar a hipótese resolvida',
        'Confirmar histologia, avaliar extensão e discutir tratamento conforme estadiamento e condição clínica'
      ],2,'Identificar uma lesão inicia confirmação e estadiamento. A terapia depende de localização, extensão e características; reposição de ferro não trata a causa por si só.')
    ]},
    {id:'dl-linfoma',topic:'hema',label:'Linfonodo: obter o diagnóstico',period:'P2',source:'LYM',summary:'A qualidade da amostra muda o que se pode concluir sobre o subtipo.',stages:[
      step('Etapa 1 — Linfonodo persistente','Adulto apresenta linfonodomegalia persistente, sudorese noturna e perda ponderal.','O que é apropriado?',[
        'Definir imediatamente um subtipo de linfoma só pelos sintomas',
        'Investigar causas infecciosas, inflamatórias e neoplásicas, com avaliação dirigida e necessidade de tecido',
        'Ignorar a evolução por ausência de dor no linfonodo'
      ],1,'O conjunto merece investigação, mas não é específico. Ausência de dor não afasta doença relevante e sintomas sistêmicos não definem histologia.'),
      step('Etapa 2 — Material insuficiente','Uma punção citológica sugere proliferação linfoide, mas não permite classificar o processo.','Qual limite deve ser reconhecido?',[
        'Amostra adequada, muitas vezes com arquitetura e estudos complementares, é necessária para classificação',
        'Citologia inespecífica basta para todo esquema de linfoma',
        'Repetir apenas hemograma substitui a necessidade de tecido'
      ],0,'Arquitetura, imunofenótipo e outros estudos podem ser decisivos. Um resultado sugestivo, porém insuficiente, não sustenta automaticamente escolha de tratamento; hemograma responde a outra pergunta.'),
      step('Etapa 3 — Subtipo definido','O diagnóstico histológico foi estabelecido.','O tratamento pode ser escolhido apenas pelo nome genérico “linfoma”?',[
        'Sim, todos os subtipos compartilham uma receita universal',
        'Sim, basta a idade para definir o esquema',
        'Não; integrar subtipo, extensão, risco, comorbidades e objetivos do cuidado'
      ],2,'Linfomas são heterogêneos. Histologia e extensão, além das condições da pessoa, orientam a terapia; nome genérico e idade isolada são insuficientes.')
    ]},
    {id:'dl-mieloma',topic:'hema',label:'Pico monoclonal e dano',period:'P2',source:'MYELO',summary:'Um marcador não equivale sozinho a doença sintomática que exige terapia.',stages:[
      step('Etapa 1 — Achado laboratorial','Pessoa sem sintomas tem pico monoclonal identificado durante investigação.','Qual é a leitura inicial?',[
        'Todo pico monoclonal significa mieloma ativo',
        'Não há necessidade de caracterização se não existe dor óssea',
        'Caracterizar a gamopatia e pesquisar critérios de atividade e diagnósticos diferenciais'
      ],2,'Gamopatia monoclonal pode ter diferentes significados. Dor ausente não exclui critérios de atividade; o pico isolado também não confirma mieloma que requer tratamento.'),
      step('Etapa 2 — Rim e cálcio','Surgem disfunção renal e hipercalcemia em paciente com gamopatia.','Qual mudança é necessária?',[
        'Avaliar urgência e possível dano relacionado ao clone, além de outras causas',
        'Continuar apenas vigilância anual sem examinar a nova alteração',
        'Presumir que todas as alterações são obrigatoriamente causadas pelo clone'
      ],0,'Possível dano de órgão muda a urgência e a investigação. A associação precisa ser demonstrada no contexto; nem espera automática nem atribuição causal sem análise são adequadas.'),
      step('Etapa 3 — Critérios integrados','A equipe reúne medula, imagem, proteínas e avaliação de dano de órgão.','Qual fundamento diferencia observação de tratamento?',[
        'Somente o tamanho de um pico, independentemente dos demais achados',
        'Critérios diagnósticos/de atividade aplicáveis e atribuição dos achados, com hematologia',
        'Somente o resultado isolado de uma radiografia normal'
      ],1,'A distinção entre gamopatia, doença indolente e mieloma ativo exige critérios integrados, incluindo biomarcadores quando aplicáveis. Um único exame não substitui esse conjunto.')
    ]},
    {id:'dl-compressao',topic:'onco',label:'Dor lombar e ameaça neurológica',period:'P2',source:'MSCC',summary:'Um déficit novo muda o tempo disponível para investigar e tratar.',stages:[
      step('Etapa 1 — Dor com antecedente oncológico','Pessoa com câncer apresenta dor vertebral nova, progressiva, inclusive em repouso.','Qual raciocínio é apropriado?',[
        'Considerar comprometimento vertebral e investigar sinais neurológicos e estabilidade',
        'Atribuir sempre a contratura por ser um sintoma frequente',
        'Excluir complicação oncológica porque ainda consegue caminhar'
      ],0,'História oncológica e padrão da dor elevam preocupação. Marcha preservada não elimina doença vertebral; exame e sinais de alerta devem ser investigados.'),
      step('Etapa 2 — Fraqueza e retenção','Na evolução surgem fraqueza nas pernas e retenção urinária.','Qual prioridade muda?',[
        'Aguardar resposta a fisioterapia antes de solicitar nova avaliação',
        'Avaliação urgente de possível compressão medular, imagem apropriada e equipe especializada',
        'Tratar apenas a retenção e adiar investigação da coluna'
      ],1,'Déficit motor e esfíncter em risco constituem emergência. Cuidar só de um sintoma ou esperar fisioterapia pode perder tempo para preservar função.'),
      step('Etapa 3 — Enquanto a avaliação é organizada','A hipótese de compressão é forte e há piora funcional.','Qual conduta geral é coerente?',[
        'Esperar histologia definitiva para todas as medidas de proteção',
        'Forçar mobilização para testar estabilidade sem orientação',
        'Coordenar proteção/estabilidade e tratamento urgente segundo avaliação especializada, sem atraso evitável'
      ],2,'Proteção e decisões tempo-dependentes são organizadas em paralelo à confirmação e ao planejamento. Mobilização imprudente e espera indiscriminada podem acrescentar dano.')
    ]}
  ];
})();
