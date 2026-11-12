/* Worked arithmetic using the existing adult reference regimens, not new indications. */
window.MASTER_RX.calculations = {
  hydroxychloroquine: {
    scenario: 'Exemplo fictício: adulto de 60 kg; analisar o alvo por peso já citado na ficha.',
    steps: [
      '5 mg/kg/dia × 60 kg = 300 mg/dia. A unidade kg se cancela; o resultado é dose diária, não por tomada.',
      '400 mg/dia ÷ 60 kg = 6,67 mg/kg/dia: a dose fixa de 400 mg não coincide com o alvo de 5 mg/kg/dia neste exemplo.',
      'Não arredondar automaticamente 300 mg para 400 mg. Apresentação, possibilidade de fracionamento, risco retiniano e plano de seguimento precisam ser definidos antes do esquema final.'
    ],
    checkpoint: 'O cálculo por peso ajuda a avaliar exposição; não determina sozinho a dose para rim, retina ou doença ameaçadora de órgão.'
  },
  pilocarpine: {
    scenario: 'Exemplo fictício: regime adulto de 5 mg por tomada, quatro tomadas diárias, já descrito para Sjögren.',
    steps: [
      '5 mg/tomada × 4 tomadas/dia = 20 mg/dia.',
      'Se a apresentação prescrita for comprimido de 5 mg: 5 mg ÷ 5 mg/comprimido = 1 comprimido por tomada.',
      'Para um exercício de quantidade de 30 dias: 1 × 4 × 30 = 120 comprimidos. Os 30 dias são apenas a janela do exercício, não duração padrão do tratamento.'
    ],
    checkpoint: 'O regime de hepatopatia moderada citado na ficha é diferente. Não substituir a seleção clínica por uma conta de comprimidos.'
  },
  levetiracetam: {
    scenario: 'Exemplo fictício: dose oral inicial de referência de 500 mg a cada 12 horas; não é tratamento de estado de mal.',
    steps: [
      '24 horas/dia ÷ 12 horas/tomada = 2 tomadas/dia.',
      '500 mg/tomada × 2 tomadas/dia = 1.000 mg/dia.',
      'Na etapa de titulação de +500 mg por tomada já citada na ficha: (500 + 500) mg × 2 = 2.000 mg/dia. O acréscimo diário seria 1.000 mg, não 500 mg.',
      'Com comprimidos de 500 mg e dose inicial escolhida, um exercício de 30 dias resulta em 1 × 2 × 30 = 60 comprimidos.'
    ],
    checkpoint: 'A função renal, a indicação e a tolerância definem se esse regime é aplicável. A conta não autoriza titulação automática.'
  },
  ivig: {
    scenario: 'Exemplo fictício: peso de dosagem de 70 kg previamente definido pela equipe para o regime de SGB desta ficha.',
    steps: [
      '0,4 g/kg/dia × 70 kg = 28 g/dia.',
      '28 g/dia × 5 dias = 140 g no curso; conferência independente: 2 g/kg × 70 kg = 140 g.',
      'Conversão de concentração, somente se o produto confirmar 10 g/100 mL: 10 ÷ 100 = 0,1 g/mL; 28 g ÷ 0,1 g/mL = 280 mL.',
      'Volume não é velocidade. Esta conta não fornece diluente, compatibilidade, descarte, escalonamento de infusão ou taxa de administração.'
    ],
    checkpoint: 'O peso aplicável e o produto devem ser confirmados no protocolo. Risco renal/trombótico e monitorização não são resolvidos pelo cálculo.'
  },
  pyridostigmine: {
    scenario: 'Exemplo fictício do regime didático de 60 mg quatro vezes ao dia, já citado na ficha; não é início universal.',
    steps: [
      '60 mg/tomada × 4 tomadas/dia = 240 mg/dia.',
      'Se a apresentação for comprimido de 60 mg: 1 comprimido/tomada × 4 = 4 comprimidos/dia.',
      'Quantidade ilustrativa para 7 dias: 4 × 7 = 28 comprimidos. A duração e a distribuição ao longo das atividades/refeições são decisões separadas.'
    ],
    checkpoint: 'Não transformar quatro tomadas em intervalo rígido sem conferir o plano. Piora respiratória pode ser crise; não responder apenas aumentando a dose.'
  },
  methylprednisolone: {
    scenario: 'Exercício com os dois cursos alternativos para surto de EM já apresentados na ficha, sem somá-los.',
    steps: [
      'Curso oral de referência: 500 mg/dia × 5 dias = 2.500 mg no curso.',
      'Conversão: 2.500 mg ÷ 1.000 mg/g = 2,5 g no curso oral.',
      'Alternativa IV citada: 1 g/dia × 3 a 5 dias = 3 a 5 g no curso. A escolha da via e do curso exige indicação; os totais não demonstram intercambialidade.',
      'Não deduzir quantidade de comprimidos ou frascos sem a apresentação confirmada, nem combinar os dois cursos por causa desta comparação.'
    ],
    checkpoint: 'Dose total acumulada não informa preparo IV. Gravidade, infecção/pseudossurto, glicemia e efeitos psiquiátricos precisam ser avaliados.'
  },
  mesalamine: {
    scenario: 'Exemplo restrito à apresentação de liberação retardada de 1,2 g citada na ficha.',
    steps: [
      '2,4 g/dia ÷ 1,2 g/comprimido = 2 comprimidos/dia.',
      '4,8 g/dia ÷ 1,2 g/comprimido = 4 comprimidos/dia. É a outra extremidade da faixa de indução, não instrução para aumentar a dose.',
      'Para uma janela ilustrativa de 28 dias na dose de 2,4 g/dia: 2 × 28 = 56 comprimidos.',
      'Conferência de unidades: 1,2 g = 1.200 mg. Não aplicar a conta a outra liberação, via ou forma farmacêutica.'
    ],
    checkpoint: 'Indução e manutenção são estratégias distintas. A quantidade do exercício não fixa a duração clínica da colite.'
  },
  tretinoin: {
    scenario: 'Exemplo fictício de aritmética por superfície corporal: 180 cm e 80 kg, em protocolo de LPA definido pela hematologia.',
    steps: [
      'Fórmula de Mosteller para o exercício: superfície corporal = √[(altura em cm × peso em kg) ÷ 3.600].',
      '√[(180 × 80) ÷ 3.600] = √4 = 2 m². Usar 180 cm, não 1,80 m, nesta fórmula.',
      'Dose de referência da ficha: 22,5 mg/m² por tomada × 2 m² = 45 mg por tomada.',
      '45 mg/tomada × 2 tomadas/dia = 90 mg/dia. A referência de 45 mg/m²/dia é diária; repeti-la duas vezes dobraria o total.',
      'Apresentação, arredondamento, combinações e administração devem ser definidos pelo protocolo especializado; o valor teórico não é uma ordem pronta.'
    ],
    checkpoint: 'A fórmula estima superfície corporal. Ela não escolhe o protocolo nem afasta teratogenicidade e síndrome de diferenciação.'
  },
  cefepime: {
    scenario: 'Exemplo restrito à neutropenia febril adulta com CrCl >60 mL/min, nas condições da ficha existente.',
    steps: [
      '24 horas/dia ÷ 8 horas/tomada = 3 tomadas/dia.',
      '2 g/tomada × 3 tomadas/dia = 6 g/dia = 6.000 mg/dia.',
      'Esse total não substitui a dose por tomada. “6 g/dia” sozinho não informa intervalo, preparo ou infusão.',
      'Se CrCl ≤60 mL/min, interromper a extrapolação e consultar a tabela específica da indicação. Não reduzir proporcionalmente pela razão entre duas depurações nem substituir CrCl por TFGe automaticamente.'
    ],
    checkpoint: 'Ajuste renal e monitorização de neurotoxicidade exigem a referência do produto/protocolo. Não há taxa IV universal derivada de 2 g.'
  },
  apixaban: {
    scenario: 'Exercício no contexto de FA não valvar: separar seleção do regime e cálculo da quantidade.',
    steps: [
      'No regime de 5 mg a cada 12 horas: 5 × (24 ÷ 12) = 10 mg/dia.',
      'Exemplo fictício dos critérios da ficha: 82 anos e 58 kg já constituem dois critérios. O regime de redução citado é 2,5 mg a cada 12 horas, após conferir indicação e demais impedimentos.',
      'Na referência reduzida: 2,5 × 2 = 5 mg/dia. Esse resultado não significa dar 5 mg uma vez ao dia.',
      'Com a apresentação correspondente ao regime escolhido: 1 comprimido × 2 tomadas × 30 dias = 60 comprimidos, apenas como exercício de quantidade.'
    ],
    checkpoint: 'Um único critério não ativa automaticamente essa regra de dois critérios. Não extrapolar o esquema de FA para TVP/TEP ou todos os cenários renais.'
  },
  amlodipine: {
    scenario: 'Exercício com a referência inicial de 5 mg uma vez ao dia para HAS estável na ficha.',
    steps: [
      '5 mg/tomada × 1 tomada/dia = 5 mg/dia.',
      'Com comprimido de 5 mg: 5 ÷ 5 = 1 comprimido por tomada.',
      'Para o exercício de 28 dias: 1 × 1 × 28 = 28 comprimidos.',
      'A alternativa inicial de 2,5 mg em determinadas condições não autoriza partir qualquer comprimido de 5 mg: é necessário conferir a apresentação e a possibilidade de divisão.'
    ],
    checkpoint: 'Não calcular a dose pelo nível isolado da PA. HAS crônica não tem duração universal de 28 dias nem usa esse fármaco como resgate de emergência.'
  },
  metformin: {
    scenario: 'Exercício com a referência de liberação imediata de 500 mg duas vezes ao dia com refeições.',
    steps: [
      '500 mg/tomada × 2 tomadas/dia = 1.000 mg/dia = 1 g/dia.',
      'Com comprimido de 500 mg, para 30 dias ilustrativos: 1 × 2 × 30 = 60 comprimidos.',
      'Comparação com o outro início citado na ficha: 850 mg uma vez ao dia = 850 mg/dia. Não são totais diários iguais.',
      'A apresentação XR não é convertida apenas trocando o rótulo; conferir dose, frequência e limites próprios. A dose máxima da ficha não é uma meta obrigatória.'
    ],
    checkpoint: 'TFGe e contexto agudo condicionam o uso. Nenhuma multiplicação torna metformina adequada para cetoacidose, hipóxia ou instabilidade.'
  },
  amoxicillin: {
    scenario: 'Exercício do esquema NICE para PAC de baixa gravidade já citado: 500 mg três vezes ao dia por cinco dias.',
    steps: [
      '500 mg/tomada × 3 tomadas/dia = 1.500 mg/dia.',
      '1.500 mg/dia × 5 dias = 7.500 mg no curso.',
      'Se a apresentação escolhida for cápsula de 500 mg: 1 cápsula × 3 × 5 = 15 cápsulas.',
      'Conferir se dose, foco, gravidade, rim, alergias e diretriz local permitem esse esquema antes de calcular a quantidade.'
    ],
    checkpoint: 'O exemplo não determina tratamento para meningite, sepse ou ITU e não demonstra equivalência entre regimes de diferentes diretrizes.'
  },
  levothyroxine: {
    scenario: 'Exemplo fictício: adulto de 60 kg que já satisfizesse os critérios de reposição plena da ficha; não se aplica automaticamente a idosos/cardiopatas.',
    steps: [
      '1,6 micrograma/kg/dia × 60 kg = 96 microgramas/dia como estimativa teórica.',
      'Conversão: 96 microgramas ÷ 1.000 microgramas/mg = 0,096 mg. Micrograma e miligrama não são intercambiáveis.',
      'A apresentação disponível e a escolha da dose inicial exigem decisão clínica; não arredondar automaticamente a estimativa para um comprimido.',
      'A estratégia inicial de 12,5–25 microgramas/dia descrita para idosos/cardiopatia é diferente do cálculo de reposição plena; não somar os regimes.'
    ],
    checkpoint: 'O cálculo não substitui avaliação cardíaca/adrenal nem o seguimento laboratorial. Peso e contexto de dosagem precisam ser definidos.'
  },
  methimazole: {
    scenario: 'Exercício limitado ao exemplo leve da bula já citada: total de 15 mg/dia dividido em três tomadas.',
    steps: [
      '15 mg/dia ÷ 3 tomadas/dia = 5 mg por tomada.',
      'Se a apresentação escolhida for comprimido de 5 mg: 5 ÷ 5 = 1 comprimido por tomada.',
      'Para 30 dias ilustrativos: 1 × 3 × 30 = 90 comprimidos.',
      '15 mg/dia não significa 15 mg em cada tomada; esse erro produziria 45 mg/dia. Gravidade e protocolo podem determinar outra estratégia.'
    ],
    checkpoint: 'Febre/odinofagia exige avaliação de agranulocitose, não recálculo de quantidade. Não extrapolar para tireoidite, gestação ou tempestade tireotóxica.'
  },
  hydrocortisone: {
    scenario: 'Exercício hospitalar da fase após a dose imediata de 100 mg, conforme a ficha de crise adrenal.',
    steps: [
      'Na alternativa intermitente: 24 horas ÷ 6 horas = 4 administrações por 24 horas.',
      '50 mg/administração × 4 = 200 mg em 24 horas.',
      'Na alternativa contínua: 200 mg ÷ 24 horas ≈ 8,33 mg/h. São alternativas de manutenção, não dois regimes para somar.',
      'A dose imediata de 100 mg é uma etapa separada. Não a repetir automaticamente a cada intervalo nem inferir o total de um dia civil sem conferir os horários.',
      'Para converter mg/h em mL/h seria indispensável a concentração final confirmada: mL/h = mg/h ÷ mg/mL. Este exercício não define solução ou preparo.'
    ],
    checkpoint: 'A correspondência aritmética de 200 mg/24 h não substitui reposição volêmica, monitorização, tratamento do gatilho ou prescrição hospitalar completa.'
  }
};
