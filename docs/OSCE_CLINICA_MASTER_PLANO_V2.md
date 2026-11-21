# OSCE Clínica Médica · Plano v2 (três fases)

**Status:** duas estações implementadas na branch para publicação autorizada pelo usuário em 21/11/2026, após validação de CI.

## Fontes e limites

O envio contém 74 estações e 403 perguntas, mas o CSV/DOCX não traz respostas-modelo. Os ZIPs têm 44 imagens originais e respectivas versões legendadas. A estação original 61 faz referência a ECG ausente. O caso e os comentários implementados são **autorais**, não transcrição de prova ou banco original. Não publicar mídia ou conteúdo protegido de terceiros em repositório público sem licença/autorização.

O exame documentado pela FMP é Avaliação Prático-Oral: raciocínio em casos, hipóteses sindrômicas/etiológicas e diferenciais, fisiopatologia, investigação, interpretação e conduta. As categorias 33 alta, 29 média e 12 baixa são prioridades pedagógicas e **não** previsão de incidência.

## Fase 1 — Primeiro projeto completo: síncope e fibrilação atrial

**Tema 61: síncope × crise convulsiva.** Dez perguntas autorais, três profundidades:
- Essencial ≈1 min: illness script com 90 palavras e uma questão ativa.
- Revisão rápida ≈5 min: quatro perguntas.
- Completo ≈25 min: dez perguntas, incluindo anamnese, exame físico, diferencial, fisiopatologia, exames, conduta, segurança e comunicação.

**Método:** pergunta sem spoiler, resposta escrita, confiança antes do feedback, dicas progressivas, resposta-modelo Master, checklist de critérios, registro de erros. Erro grave ou com alta confiança retorna D+1; parcial D+3; bom D+7; resposta excelente reiterada sem dicas D+21. Essa regra é heurística, não eficácia comprovada.

**Antiprocrastinação:** Sessão de hoje, início em um minuto, dia mínimo de um item, triagem por data e minutos, retomada, síntese ao terminar, primeira tarefa de amanhã.

**Aprofundamento:** painéis recolhíveis sobre história antes/durante/depois, risco cardíaco, exames, síndrome, mecanismo e palácio de memória.

**IA:** botão Gerar script de revisão → Copiar para IA; inclui os critérios realmente faltantes, a resposta anterior, o uso de dica e a confiança, e orienta arguição progressiva da FMP. Não envia automaticamente dados a terceiros.

**Referências:** ESC Síncope (2018); EUSEM (2024); Diretriz Brasileira de Cardiologia Geriátrica (2026). Material de estudo, não gabarito oficial.

**Critérios de aceite:** navegação inclusive barra recolhida, 3 profundidades, resposta protegida antes da tentativa, progressos e retestes persistentes, script copiável, responsividade e acessibilidade, testes de regressão sem perda dos módulos atuais.

**Tema 52: fibrilação atrial.** ECG original JPEG `i-031.jpg`, onze perguntas autorais, três profundidades, escore CHA₂DS₂-VA, controle da FC, cardioversão, anticoagulação e comparação com flutter, com referências SBC 2025 e ESC 2024. Acesso interno à aula existente `P1 → Cardiologia → Arritmias cardíacas`, termos clicáveis e fontes verificáveis.

**Mídias:** Estação 61 utiliza uma ilustração original gerada, com rótulo explícito de que não é imagem clínica real. Estação 52 mostra integralmente a imagem do ECG real fornecido, com zoom, sem expor imagens com legenda diagnóstica antes da tentativa.

**Sincronização:** migração `allow_osce_master_progress_v1` foi aplicada em produção ao Supabase e a nova chave consta na lista autorizada. Confirmar sincronização efetiva em dois dispositivos como teste pós-publicação.

## Fase 2 — Demais estações de alta prioridade

Somente depois de aprovar as duas primeiras estações. Construir e revisar, individualmente, as outras 31 estações de prioridade alta, com roteiro Master e conteúdo adequado; auditar imagens e autorização de distribuição, sem inventar dados ou traçados. Preservar histórico a cada versão.

## Fase 3 — 29 médias + 12 baixas e lacunas curriculares

Somente depois de aprovar a expansão. Integrar médias e baixas, infecções e emergências onco-hematológicas quando não contempladas, e mapa completo de cobertura, radar de competência e contrastes entre doenças. Voz e correção por IA são fases futuras opcionais, sujeitas a custos e validação.

## Ciência da aprendizagem e métricas

| Princípio | Função | Medir | Não prometer |
|---|---|---|---|
| Recuperação ativa | resposta antes do gabarito | ganho no reteste | retenção garantida |
| Pré-teste | tentativa obrigatória | adesão sem dicas | que errar não importa |
| Espaçamento | D+1/3/7/21 | retorno e acerto no prazo | cronograma universal ótimo |
| Intercalação | pares de contraste (fase 2) | desempenho em novos casos | ganho automático de nota |
| Carga cognitiva | 3 profundidades | conclusão por tier | mesmo ritmo para todos |
| Calibração | confiança pré-gabarito | erro com confiança alta | validação automática |
| Codificação dupla | imagens auditadas (fase 2) | leitura de traçado novo | imagem fictícia como prova |
| Autoexplicação | fala para paciente/colega | checklist de comunicação | resposta longa como melhor |
| Motivação | sessão curta e dia mínimo | retomada e constância | fim da procrastinação |

## PENDÊNCIAS PARA APROVAÇÃO

Aguardar resultados dos testes de CI, conferir contraste/legibilidade em celular e tablet, validação clínica independente, autorização de mídia e a decisão do usuário sobre o piloto. Nenhuma estação adicional será implementada antes disso.

## ONDE PAROU / O QUE FALTA

**Concluído na branch:** estações 61 e 52, imagens identificadas, três profundidades, checklists, revisão adaptativa, confiança, dicas, script de IA, navegação lateral e testes automatizados.

**Próximo passo:** passar CI, publicar as duas estações conforme autorização recebida, verificar uso real, e aguardar aprovação antes de expandir a próxima estação prioritária.
