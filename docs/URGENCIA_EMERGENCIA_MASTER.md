# Urgência e Emergência Master — 8º período (2026.2)

## Situação
Implementação integrada ao **Estudo Master / Clínica Master** (não ao ApexMed). Esta especificação descreve a primeira versão funcional; não equivale a homologação clínica ou visual completa em produção.

## Matriz de origem
Plano de ensino 2026.2 da FMP/UNIFASE (72 horas, 36 teóricas e 36 práticas; P2 cumulativa, 20 múltipla escolha / 4 alternativas / 90 minutos). Organização por 23 aulas, desdobrando os tópicos programáticos oficiais em unidades de estudo.

## Arquivos
- `MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/emergency-content.js`: conteúdo das 23 aulas, referências, algoritmos, 46 questões de base e 23 casos iniciais; as camadas adicionais elevam o total a 115 questões e 46 casos.
- `.../emergency-depth-core.js` e `.../emergency-depth-p1a.js`, `-p1b.js`, `-p1c.js`, `-p2a.js`, `-p2b.js`, `-p2c.js`: aprofundamento aditivo por disciplina (sem alterar os IDs anteriores).
- `.../emergency.js`: integração via `CourseKit` nas rotas `emergency`, `emergency-p1`, `emergency-p2`; fluxogramas, evocação ativa, slides e simulado.
- `.../emergency-course.css`: interface herdando o design system já existente.
- `.../course-kit.js`: extensão aditiva opcional `extraModule`, preservando demais cursos.
- `.../index.html` e `.../app.js`: carregamento, cache e etiquetas de navegação.

## Conteúdo ampliado — revisão de 19/11/2026
P1: PCR, IRpA, VM, AVEI, sepse, síndrome de choque, politraumatizado, traumas específicos, grande queimado, crise asmática, insuficiência adrenal, afogamento, rebaixamento do sensório.
P2: emergência hipertensiva/EAP, SCA/dor torácica, arritmias, glicemias, ácido-base/gasometria, eletrólitos, tireoide, intoxicações, catástrofes, paliativos.

O modo prova da P2 sorteia 20 questões **autorais** dentre as 115 disponíveis (8 de P1 e 12 de P2, sendo ao menos uma de cada tema P2), com 90 minutos, correção comentada, registro das IDs sorteadas e possibilidade de retomar uma sessão não encerrada. O histórico guarda o resultado e as respostas de cada sessão. O curso utiliza as chaves `uep1`, `uep2` e `ueExam` no objeto `store.study`, reusando a persistência local e sincronização do Master conforme configuração de conta.

## Aprofundamento de alto rendimento
Cada um dos 23 módulos agora contém 8 seções (184 no total), tabela comparativa clínica, algoritmo sequencial, cinco questões com comentários, caso básico e caso evolutivo, pódio da memória e evocação ativa. São 115 questões autorais e 46 casos clínicos. As respostas previamente gravadas continuam relacionadas às mesmas questões anteriores, pois os novos itens foram acrescentados ao final dos módulos.

A P1 contém 13 temas e a P2 contém 10; a prova P2 é cumulativa. A camada de aprofundamento inclui fisiopatologia aplicada, raciocínio ABCDE, contraindicações, dose quando relevante, reavaliação, alertas de segurança e comparações de diferenciais.

## Aula-piloto de PCR — aprendizagem guiada
A primeira aula da P1 foi convertida em um percurso didático interativo **exclusivo da PCR**, sem alterar as outras 22 aulas. O motor comum `CourseKit.create` ganhou um hook opcional `moduleOverride`; a P1 ativa a experiência apenas quando `module.id==='pcr'`.

**Arquivos**
- `.../emergency-pcr-pilot.js`: sete etapas (pré-teste, fundamentos, fluxograma de ritmos, cronologia da RCP, caso clínico de cinco decisões, questões originais e síntese), quatro percursos de tempo (2/5/15/30 minutos), feedback e recomendação heurística de próximo treino.
- `.../emergency-pcr-pilot.css`: visual editorial, responsivo, isolado das demais aulas. Os estados de resposta, etapas abertas e progresso são semanticamente diferentes de domínio clínico.
- `tests/emergency-pcr-pilot.test.cjs`: verificações de regressão da PCR e preservação dos outros módulos.

**Persistência**
- Novo estado em `store.study.uep1.pcrPilot`: modo, etapa, respostas, dicas, histórico de tentativas, casos, revisões e conclusão. As questões existentes continuam em `store.study.uep1.quiz`; seus IDs e resultados não foram alterados.
- O reteste de cinco minutos reinicia as decisões do percurso, mantendo registros de tentativas anteriores, marcação de conclusão e respostas históricas do banco.
- Na conclusão, o piloto sugere revisões D+1 e D+7. **Não é FSRS nem envia notificações**; é uma regra inicial fixa para teste da experiência.
- O recomendador seleciona reconhecimento, algoritmo, caso ou questões com regras simples e transparentes. A versão ainda não utiliza conhecimento bayesiano ou modelos proprietários calibrados.

**Conteúdo clínico**
- Embasado nos algoritmos AHA 2025 BLS, ACLS e pós-parada.
- O fluxograma separa corretamente presença de pulso, PCR chocável e PCR não chocável; contém traçados SVG *esquemáticos, não diagnósticos*.
- Foi extraído um ECG individual do PDF de PCR e inserido na etapa de escolha de ritmos, sem slide inteiro nem link ao documento.
- Nenhuma interface de arguição oral foi adicionada à PCR; o treino usa apenas decisões, questões, caso e memória.
- Doses e condutas requerem protocolo institucional e supervisão para uso clínico real.

**Verificação inicial**
- Sintaxe de todos os scripts envolvidos aprovada.
- Simulação funcional das quatro rotas de tempo, respostas, alternativa de pulso/ritmo, cinco decisões de caso, salvamento das questões originais, marcação de conclusão e reteste sem apagar histórico.
- Falta executar QA real em navegador com autenticação, persistência entre dispositivos, acessibilidade móvel/tablet e conferência do deploy.

## Imagens e esquemas visuais (atualizado em 21/11/2026)
- **23 JPEGs individuais foram extraídos de slides e resumos**, sem publicar páginas inteiras; 22 são exibidos na interface (uma imagem ficou reservada por não ser específica o suficiente para EAP).
- Imagens e diagramas aparecem após a seção teórica relevante: ECGs, TC/RX, anatomia, manobras e sinais clínicos, com legendas dirigidas ao raciocínio.
- Nos demais 14 temas usam-se fluxogramas autorais em lugar de fotografias inadequadas ou decorativas.
- Não há mais `iframe`, previews ou links para PDFs completos. O trabalho de checagem de direitos de republicação de figuras de terceiros ainda deve ser feito antes de distribuição externa.
- Inventário e páginas de origem: `docs/URGENCIA_FIGURAS_CURADORIA_2026.md`.


## Fontes e atualização
- AHA 2025, ACLS adulto: https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support
- AHA/ASA 2026, AVC isquêmico: https://professional.heart.org/en/science-news/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-stroke
- Surviving Sepsis Campaign 2026: https://sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026
- ATLS 11, GINA 2026 e diretrizes específicas indicadas nas aulas.

## Verificações executadas em 19/11/2026
- Sintaxe JavaScript aprovada em `app.js`, `course-kit.js`, `emergency-content.js` e `emergency.js`.
- Renderização das rotas P1/P2 testada em ambiente JS simulado com 23 módulos, 184 seções, 115 questões, 46 casos, fluxogramas, pódio da memória e figuras clínicas no contexto.
- Modo prova testado em três sessões sorteadas: 20 itens únicos por sessão, exatamente 8 da P1 e 12 da P2, correção, histórico e criação de nova sessão.
- Todas as 23 IDs de módulo foram encontradas e aprofundadas; todos os códigos de referência usados nas aulas possuem registro no dicionário de fontes.
- Teste de integridade automatizado acrescentado em `tests/emergency-deep.test.cjs`.
- **Não executados** nesta etapa: teste completo Vite/Playwright em navegador real, análise de acessibilidade em dispositivos, validação médica por docente e confirmação de deploy Cloudflare.

## Próximas etapas recomendadas para homologação
1. Teste real desktop/iPad/celular, com autenticação e sincronização de respostas.
2. Revisão médica das condutas e doses, com atenção a diferenças entre slides históricos e diretrizes atuais.
3. Auditar direitos/atribuição das imagens individuais já extraídas; revisar legendas e descrição alternativa com docentes.
4. Evoluir as questões atuais para calibração N1/N2/N3 e novas estações em role-playing, com métricas de domínio.
5. Testes de regressão em Clínica Médica e Cirurgia e auditoria de performance antes de declarar produção validada.

## Curadoria visual e neutralidade editorial (19/11/2026)
- Os **23 módulos** não renderizam mais PDFs integrais, iframes do Drive, blocos “Imagens da aula original” nem links diretos para os slides completos. Os nomes de docentes e instituições não são exibidos na interface de Urgência e Emergência.
- Os PDFs foram **consultados como material de referência**; o arquivo-fonte continua identificado nos dados internos, mas não aparece na aula. As referências clínicas verificáveis permanecem disponíveis.
- Diagramas autorais foram mantidos onde não havia imagem fonte adequada; os módulos de IRpA, AVC, sepse, choque e trauma usam figuras individuais extraídas dos PDFs.
- **Atualização de 21/11/2026:** foram extraídas 23 figuras individuais dos PDFs, das quais 22 estão vinculadas às aulas. Os outros módulos recebem esquemas de decisão. Consultar o inventário de fonte e de direitos.
- Verificação em motor JS simulado: 23 módulos/115 questões, ausência de iframe/preview nas 23 aulas, ausência de marcas institucionais na renderização, e nenhuma referência de fonte ausente.


## PCR — piloto de aprendizagem adaptativa (19/11/2026)

**Escopo concluído na implementação:** PCR somente. Os demais 22 módulos continuam com a estrutura anterior. Os novos arquivos `pcr-adaptive-engine.js`, `pcr-adaptive-ui.js`, `pcr-adaptive-ui.css` são carregados antes da experiência PCR.

- **Mapa de competências:** 8 competências identificadas em respostas da aula, casos progressivos, questões antigas e novas questões de retenção/transferência. Domínio estimado com evidência e incerteza, sem atribuir proficiência apenas por abrir páginas.
- **Recuperação ativa:** 16 questões adicionais em variantes de recuperação e transferência, com justificativa de cada uma das quatro alternativas; as 11 decisões guiadas também passam a mostrar a explicação por alternativa.
- **Confiança:** após uma resposta inicial, usuário pode classificar "chutei", "tive dúvida" ou "tenho certeza"; a escolha integra o registro da tentativa.
- **Recomendador:** regras auditáveis de lacuna de domínio (30%), urgência de revisão (25%), peso para prova (20%), importância clínica (15%) e pré-requisitos (10%), com penalidade de repetição imediata. Estes pesos **não foram validados empiricamente**.
- **Revisão:** intervalos *heurísticos* e específicos por competência (1, 3, 7, 14, 30, 60 e 90 dias em sequência de acertos; reteste breve após erro), não o algoritmo FSRS real. Agendamentos são internos à plataforma, **sem criação de lembretes externos**.
- **Leitura anti-procrastinação:** entrada em um clique, quatro durações, tarefas pequenas, navegação progressiva e opção entre decisões guiadas e leitura integral. O modo integral expande o conteúdo aprofundado, preservando o histórico.
- **Indicadores:** acurácia de tentativas, acurácia em perguntas de transferência, confiança, tempo até primeira ação, necessidade de revisão e contagem de evidências. São indicadores exploratórios no estado do navegador, não provas de ganho de notas.
- **Compatibilidade:** o `CourseKit` ganhou `onAnswer` opcional, usado somente em `module.id==='pcr'`. A primeira resposta do banco alimenta o motor adaptativo; respostas pré-existentes permanecem no `store.study.uep1.quiz`. Os novos eventos ficam isolados em `store.study.uep1.pcrAdaptive`.
- **Regressões:** testes automatizados adicionados em `tests/pcr-adaptive.test.cjs`. Testes iniciais em motor JS simulado demonstraram renderização, integração e preservação das outras 22 aulas. **Ainda faltam** navegador real, persistência autenticada entre dispositivos, teste com usuários, experimentos A/B válidos e calibração estatística do algoritmo.

**Itens não implementados como tecnologia comprovada:** FSRS completo com parâmetros otimizados por histórico, Bayesian Knowledge Tracing, IRT/Rasch calibrado, sincronização verificada entre aparelhos e conclusão de experimentos A/B. A etapa atual é um piloto funcional fundamentado em mecanismos didáticos, não a validação dessas tecnologias.
