# Piloto de urocultura e antibiograma

Versão 2026.11.15.1. Acesso pelo curso existente de Antimicrobianos, botão Abrir laboratório de microbiologia, pela busca global ou pela rota #micro. Sem novo menu de curso.

## Entrega

Três aulas aprofundadas: amostra e síndrome; método e norma; adequação ao foco. Nove perguntas de pré-teste e 18 questões N2/N3 com comentário específico para cada alternativa. Cinco casos autorais, cada um com duas etapas, justificativa escrita, pista, feedback e síntese: sintomas baixos e isolamento único; cultura sem sintomas; infecção alta; cateter e qualidade; categoria I e norma.

Simulador documental de antibiograma com três regras de E. coli. Confere espécie, antimicrobiano, método, unidade, contexto, norma, ano, revisão e origem. Fora do recorte, retorna Não interpretável pela tabela selecionada. Não há extrapolação taxonômica, conversão de halo em CIM, classificação de medidas censuradas, escolha automática de antimicrobiano ou geração de dose.

## Tecnologia aberta efetivamente utilizada

Dados da distribuição AMR 3.1.0, de 16/10/2026, sob licença GPL-2. O script tools/amr/gerar_recorte.py consulta dois arquivos fixados no commit 052edc476158f1bad7a3df3b0fc78c95eea8ace4, confere hashes e compara o recorte bruto e normalizado. A origem, os limites, as notas disponíveis e os hashes completos são preservados na saída. São duas representações do mesmo pacote, não duas fontes clínicas independentes.

O processamento de curadoria é offline em Python, sobre dados exportados do projeto AMR. Não foi instalado nem executado R. O navegador recebe somente três registros, com menos de 10 kB, e um interpretador JS limitado. A licença e os créditos acompanham os arquivos publicados em assets/licenses/. Fonte e reprodução permanecem públicas no repositório. Não há banco de resistência integral, framework novo, serviço externo de interpretação ou imagens neste piloto.

Foram reutilizados CourseKit, tokens, estilos, autenticação e busca já existentes. As tecnologias do plano que não ajudam este lote não foram acrescentadas: Chart.js, OpenSeadragon, KaTeX, H5P, Synthea e catálogo LOINC permanecem para necessidades concretas de lotes posteriores.

## Recorte e limite de conferência

Fonte normativa reproduzida: EUCAST 2026, Clinical Breakpoint Tables, revisão 16.1, via AMR 3.1.0. O acesso direto às páginas de EUCAST e BrCAST foi bloqueado pela política de rede em 15/11/2026. A interface e os materiais informam que a conferência disponível é secundária e versionada. Não foi declarada leitura direta do documento original nem equivalência BrCAST.

Regras no exercício:

- E. coli e nitrofurantoína por CIM, apenas no contexto cistite não complicada: S até 64 mg/L; R acima de 64 mg/L.
- E. coli e nitrofurantoína por disco de 100 microgramas, no mesmo contexto: S a partir de 11 mm; R abaixo de 11 mm.
- E. coli e ciprofloxacino por CIM, indicações diferentes de meningite: S até 0,25 mg/L; I acima de 0,25 e até 0,5 mg/L; R acima de 0,5 mg/L. O escopo do simulador é limitado aos contextos urinários declarados.

Não foi habilitado disco de ciprofloxacino, pois condições, incertezas e notas próprias exigem revisão adicional. Uma nota ausente na extração não significa conferência integral do documento original. Rótulos BrCAST, anos ou revisões diferentes são recusados, sem fallback.

## Conteúdo clínico

Foram consultadas as páginas vigentes de NICE NG109, NG111 e NG113, publicadas em 2018. As referências e os escopos constam em micro-course-data.js. O texto não reproduz tabelas de doses nem transfere automaticamente o protocolo britânico ao Brasil.

Aulas e casos separam indicação de tratar, qualidade da amostra, significado do resultado e adequação ao sítio. Não adotam um limite universal de UFC/mL. I é ensinado como sensível com exposição aumentada em EUCAST, sem ajuste automático de dose. Suscetibilidade in vitro não equivale à escolha clínica de antibiótico.

Revisão docente e conferência direta dos documentos normativos originais continuam pendentes. O status é visível em todas as telas do laboratório. Doses, ajustes, duração e prazos terapêuticos permanecem a confirmar em fontes aplicáveis ao Brasil antes de um lote de prescrição.

## Progresso e privacidade

Novo campo opcional store.study.labMicro, preservando os campos existentes. Sem tabelas novas, migrations, novas storage_key ou mudanças em lesson_images. Limite de justificativa de 1.200 caracteres e histórico das últimas 100 tentativas, com totais agregados preservados. A gravação confere o tamanho do payload completo e informa falha de armazenamento.

O simulador não armazena suas entradas. Apenas respostas, justificativas e revisões dos exercícios são salvas com o progresso da conta. Abrir uma aula ou uma síntese não gera acerto. Responder com ajuda ou após consultar a síntese muda o agendamento. Os intervalos de 1, 3 ou 7 dias são parâmetros educacionais ajustáveis.

## Verificação e próximos passos

Testes cobrem o conteúdo e os gabaritos após redistribuição das alternativas, limites de interpretação, bloqueios de contexto e versão, recarga, troca de contas, preservação do piloto anterior e quatro larguras nos dois temas. Teclado, toque sintetizado, fontes de pelo menos 12 px, alvos de 44 px e movimento reduzido foram exercitados em Chromium. Os testes não acessam dados reais do Supabase. Safari físico e revisão integral por leitor de tela não foram realizados.

Próximo lote: obter e conferir diretamente os documentos originais BrCAST/EUCAST e erratas, revisar com docente e ampliar o recorte somente por combinações documentadas. A fundação de catálogo e demais trilhas continua sendo etapa posterior.
