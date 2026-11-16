# Laboratório Master: função renal e EAS

Continuação: as etapas de eletrólitos e gasometria foram acrescentadas em [laboratorio-equilibrio.md](laboratorio-equilibrio.md). Os números abaixo registram o lote original.

Entrega de 16/11/2026, conforme a trilha renal do plano do Laboratório de Exames. Conteúdo e laudos autorais; pessoas fictícias. Revisão docente externa pendente.

## O que entrou

- Três módulos: creatinina, ureia e TFGe; DRC e albuminúria; EAS e sedimento.
- Cada módulo contém três perguntas de pré-teste, oito seções, um laudo resolvido, diferenciais, erros comuns e seis questões com comentário de todas as alternativas.
- Cinco casos progressivos com duas decisões cada: perdas e LRA, DRC e unidades da RAC, sedimento ativo, inflamação urinária e obstrução.
- Justificativa antes da decisão, pista, comentários, síntese e revisão. Apenas respostas geram tentativas e acertos.
- Revisão das decisões: acerto independente retorna em 1, 3 ou 7 dias, conforme configuração; erro ou uso de ajuda retorna em um dia. São parâmetros educacionais, sem promessa de eficácia individual.
- Entrada em Laboratório Master, busca global, links diretos e retorno ao laboratório. Microcitose continua no mesmo lugar.
- Tempo de leitura calculado por reading-time.js, sem duração fixa atribuída às aulas.

## Persistência e compatibilidade

O estado novo é opcional em `store.study.labRenal`, dentro da chave de progresso existente. Não há migração, nova tabela ou alteração da lista de chaves permitidas. O mecanismo de autenticação existente observa a gravação e agenda a sincronização. Sem conexão, o envio pode ficar pendente.

O histórico detalhado retém 100 tentativas; os totais são cumulativos. Justificativas têm limite de 1.200 caracteres, com orçamento preventivo de 950.000 bytes para o objeto completo. Falha de gravação não substitui o progresso anterior.

Questionários mantêm o embaralhamento determinístico do CourseKit. Abrir aula ou síntese não gera acerto. Consultar síntese marca ajuda para as decisões daquele caso.

## Conferência dos critérios

| Item utilizado | Fonte consultada | Escopo |
| --- | --- | --- |
| LRA: aumento de pelo menos 26 µmol/L em 48 h, pelo menos 50% em 7 dias, ou diurese adulta abaixo de 0,5 mL/kg/h por mais de 6 h | NICE NG148, 1.3.1, versão atualizada em 2024 | Critérios alternativos. Mantida a unidade literal, sem falsa igualdade com 0,3 mg/dL. |
| DRC por pelo menos 3 meses; categorias G1 a G5 e A1 a A3 | Awdishu e colaboradores, 2025, síntese da KDIGO 2024, tabelas 1 a 3 | Não chamar um resultado isolado de doença crônica. |
| Confirmação precoce de TFGe nova abaixo de 60 em até 2 semanas | NICE NG203, 1.1.8 | Não aguardar esse prazo se houver síndrome aguda. Não confundir com comprovação de cronicidade. |
| RAC entre 3 e 70 mg/mmol: confirmar em amostra matinal; a partir de 70, dispensar essa confirmação específica | NICE NG203, 1.1.12 | Não aplicar os mesmos números a mg/g. Não dispensa avaliação ou demonstração de cronicidade. |
| Ultrassom em até 24 h na LRA sem causa identificada ou risco de obstrução; imediato, em até 6 h, na suspeita de rim infectado e obstruído | NICE NG148, 1.4.5 e 1.4.6 | Fluxo britânico; instabilidade exige atendimento imediato, sem aguardar o prazo máximo. |
| Terapia renal substitutiva por complicações refratárias e estado global | NICE NG148, 1.5.8 e 1.5.9 | Não há gatilho por creatinina ou ureia isoladas. |
| Células e cilindros como padrões, sem exclusividade diagnóstica | Gaggar e Raju, 2024 | Sem generalizar percentuais de acurácia de estudos selecionados. |
| Qualidade da amostra e reação para sangue | Delanghe e Speeckaert, 2014 | Fundamentos analíticos, sem transformar prazos de conservação em protocolo local. |
| Bacteriúria assintomática em não grávidas | NICE NG109, 1.2 | Sem extrapolar para gestação ou situações urológicas específicas. |

Fontes e links completos estão em `lab-renal-data.js`. Evidência de consulta, fora do repositório público: `/workspace/entregas/lab-renal-fontes/`.

## Limites e pendências

- PDF primário KDIGO 2024: acesso bloqueado no ambiente. Foi lida a síntese aberta de 2025, identificada como fonte secundária. Não se declara leitura da diretriz primária.
- Não foi definido ponto de corte universal de razão ureia/creatinina, contagem de células no EAS ou periodicidade de controle. Dependem de método, analito, contexto e fonte específica; ficam a confirmar se forem necessários em uma futura unidade.
- Não há calculadora automática de dose por TFGe. Depuração e TFGe indexada não são intercambiáveis; LRA exige avaliação própria. As fichas farmacológicas existentes continuam disponíveis pelo Manual de prescrição e pela anotação contextual.
- Revisão docente independente segue pendente. Não foram incluídas imagens novas nem modificados dados reais no Supabase. O simulador de antibiograma permanece removido.

## Validação

152 testes aprovados na suíte completa, incluindo nove específicos do bloco renal. Validadores validar.py e validar_v7.py aprovados; sintaxe conferida em 80 arquivos JS. Fluxos testados com autenticação simulada e bloqueio de chamadas ao Supabase real. Cobertura de 320, 390, 820 e 1280 px, temas claro e escuro, teclado, persistência, isolamento entre contas e uso de ajuda.

## Onde parei e o que falta

Concluído o bloco renal e EAS: 3 aulas, 18 questões, 5 casos, 10 decisões, busca e progresso no ambiente existente.

Próximas etapas do projeto, ainda não implementadas neste lote:

1. Sódio, osmolaridade e distúrbios da água.
2. Potássio, magnésio, cálcio e fósforo.
3. Gasometria, equilíbrio ácido-base e lactato.
4. Exames de interesse cirúrgico: coagulação, função hepática e marcadores pancreáticos.
5. Revisão docente dos pilotos e expansão gradual do catálogo de exames, com fontes verificadas por unidade.
