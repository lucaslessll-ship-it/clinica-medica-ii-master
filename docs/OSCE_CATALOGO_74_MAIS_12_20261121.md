# OSCE Clínica Médica · Catálogo de 74 temas + 12 complementares

**Versão:** 21/11/2026. **Escopo:** treino educacional para Avaliação Prático-Oral (APO) em Clínica Médica II, não publicação oficial da FMP.

## Entregável

- **74 estações curriculares**, cada uma com Essencial (aprox. 1 min), Revisão rápida (4 perguntas) e Completo.
- **12 estações complementares** numeradas 75–86 para infecções, emergências oncohematológicas, TEP e pericardite.
- **788 perguntas no software:** as sete estações iniciais, individualmente preparadas, somam 77 perguntas; as **79 restantes** contêm nove questões **novas e autorais** por caso, totalizando 711. **Não são as 403 perguntas originais transcritas do arquivo de terceiros.**
- Avaliação por tentativa → confiança → resposta-modelo → autoauditoria dos critérios → feedback → aprofundamentos em acordes → revisão D+1/D+3/D+7/D+21.
- Botão **Revisar respostas antes** permite leitura e sínteses sem pontuação, sem alterar histórico.
- Script individual de revisão baseado nos erros, com botão copiar para IA e instruções para arguição ativa.
- Busca por título/área/número, filtro Alta/Média/Baixa/Complementares, paginação de 12 casos e duas barras de cobertura.

## Matriz de prioridade dos 74 temas originais

- **Alta (33):** 4, 5, 7, 8, 12, 20, 22, 24, 29, 32, 34, 35, 37, 38, 39, 41, 43, 44, 45, 46, 52, 53, 55, 59, 60, 61, 62, 64, 66, 69, 70, 71, 73
- **Média (29):** 1, 2, 3, 6, 9, 11, 15, 16, 18, 19, 25, 26, 27, 28, 30, 31, 33, 36, 40, 42, 48, 51, 56, 57, 58, 63, 67, 68, 74
- **Baixa (12):** 10, 13, 14, 17, 21, 23, 47, 49, 50, 54, 65, 72

A classificação é uma **heurística de preparação**, não probabilidade de cobrança na avaliação da FMP.

## Imagens, autoria e licenças

- As estações iniciais preservam o ECG fornecido na 52 e figura ilustrativa na 61; outras referências Wikimedia estão identificadas com créditos.
- Os novos 79 cartões exibem **diagramas autorais de raciocínio**, com aviso explícito: **não são exame, ECG ou fotografia de paciente**.
- O repositório público não inclui o banco original de 403 perguntas, nem as 44 imagens de autoria/distribuição ainda não autorizadas.
- As figuras de raciocínio não podem ser usadas para afirmar achados que dependem de ECG, ultrassonografia, histologia, tomografia, fotografia ou outro exame clínico real.

## Fontes e limites

- Fontes externas nos novos cartões são **índices/bibliotecas de diretrizes**, como ATA/Endocrine Society, ACR/EULAR, AHA/ESC, NCI/ELN, ACG, EAN/NICE, KDIGO e IDSA.
- Estas bibliotecas **não são revisão bibliográfica individual para cada caso**, portanto os novos 79 casos foram marcados `status: revisao-autoral`.
- As respostas são **sínteses clínicas iniciais** de estudo e devem passar por **revisão médica por especialidade**, com diretriz específica e checagem de posologia, segurança e critérios antes de receber selo de conteúdo auditado.
- Aulas internas só aparecem como link quando existe metadado verificado. Sem aula identificada, a interface informa a ausência e oferece as referências.

## Persistência

- Chave atual do OSCE: `master_osce_pilot_v1`, já permitida na restrição do Supabase `public.master_progress` com RLS por `user_id = auth.uid()`.
- Tabela possui limite de 1 MiB por JSON. **É necessário monitorar volume de tentativas**, pois 788 perguntas podem extrapolar o limite após muitas sessões. Não prometa histórico ilimitado.
- Preservar o esquema anterior para não perder o progresso das sete primeiras estações.

## Aceite e validação

1. Verificar contagem total: 74 + 12 = 86, sem duplicações; 33/29/12 entre os 74.
2. Verificar três profundidades, 4 perguntas rápidas e nove/mais perguntas completas.
3. Validar que gabaritos não apareçam antes da tentativa no Simular e estejam visíveis no Revisar respostas antes.
4. Conferir correção, nota por checklist, reteste e geração de script por erros.
5. Conferir filtro de prioridade, busca, paginação, menu compacto, foco e responsividade em tablet/celular.
6. Executar suíte GitHub Actions e confirmar publicação Pages da versão combinada.

**Aviso de uso:** Simulação de ensino e recuperação ativa, não orientação médica personalizada nem gabarito oficial da FMP.
