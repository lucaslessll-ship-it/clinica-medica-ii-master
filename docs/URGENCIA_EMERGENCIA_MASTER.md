# Urgência e Emergência Master — 8º período (2026.2)

## Situação
Implementação integrada ao **Estudo Master / Clínica Master** (não ao ApexMed). Esta especificação descreve a primeira versão funcional; não equivale a homologação clínica ou visual completa em produção.

## Matriz de origem
Plano de ensino 2026.2 da FMP/UNIFASE (72 horas, 36 teóricas e 36 práticas; P2 cumulativa, 20 múltipla escolha / 4 alternativas / 90 minutos). Organização por 23 aulas, desdobrando os tópicos programáticos oficiais em unidades de estudo.

## Arquivos
- `MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/emergency-content.js`: conteúdo das 23 aulas, referências, algoritmos, 46 questões autorais e 23 casos.
- `.../emergency.js`: integração via `CourseKit` nas rotas `emergency`, `emergency-p1`, `emergency-p2`; fluxogramas, evocação ativa, slides e simulado.
- `.../emergency-course.css`: interface herdando o design system já existente.
- `.../course-kit.js`: extensão aditiva opcional `extraModule`, preservando demais cursos.
- `.../index.html` e `.../app.js`: carregamento, cache e etiquetas de navegação.

## Conteúdo da primeira versão
P1: PCR, IRpA, VM, AVEI, sepse, síndrome de choque, politraumatizado, traumas específicos, grande queimado, crise asmática, insuficiência adrenal, afogamento, rebaixamento do sensório.
P2: emergência hipertensiva/EAP, SCA/dor torácica, arritmias, glicemias, ácido-base/gasometria, eletrólitos, tireoide, intoxicações, catástrofes, paliativos.

O modo prova da P2 possui 20 questões **autorais** (8 de P1 e 12 de P2), 90 minutos, correção comentada, registro de sessão e possibilidade de retomar uma sessão não encerrada. O curso utiliza as chaves `uep1`, `uep2` e `ueExam` no objeto `store.study`, reusando a persistência local e sincronização do Master conforme configuração de conta.

## Imagens e slides
O curso **não publica cópias de imagens protegidas no repositório**. Quando há fonte identificada, inclui visualização embutida do PDF completo por iframe do próprio Drive e link à fonte original, sujeito a permissões do Google. O único ECG desenhado no código é figura esquemática autoral, explicitamente identificada como tal. A curadoria e inclusão de imagens individuais recortadas, com anotações clínicas e referência por figura, ainda precisa de análise de direitos/atribuição e revisão do conteúdo específico.

Pasta de slides verificada:
https://drive.google.com/drive/folders/1ZVMHML4TFafZrVq29M57cZwQ8EumFPFD

## Fontes e atualização
- AHA 2025, ACLS adulto: https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support
- AHA/ASA 2026, AVC isquêmico: https://professional.heart.org/en/science-news/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-stroke
- Surviving Sepsis Campaign 2026: https://sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026
- ATLS 11, GINA 2026 e diretrizes específicas indicadas nas aulas.

## Verificações executadas em 19/11/2026
- Sintaxe JavaScript aprovada em `app.js`, `course-kit.js`, `emergency-content.js` e `emergency.js`.
- Renderização das rotas P1/P2 testada em ambiente JS simulado com 23 módulos, 46 questões, 23 casos, fluxogramas e links de slides.
- Modo prova testado: 20 itens, mistura cumulativa, registro de resposta, correção, histórico e criação de nova sessão.
- Todos os códigos de referência usados nas aulas possuem registro no dicionário de fontes.
- **Não executados** nesta etapa: teste completo Vite/Playwright em navegador real, inspeção de PDFs originais por imagem, análise de acessibilidade em dispositivos, validação médica por docente e confirmação de deploy Cloudflare.

## Próximas etapas recomendadas para homologação
1. Teste real desktop/iPad/celular, com autenticação e sincronização de respostas.
2. Revisão médica das condutas e doses, com atenção a diferenças entre slides históricos e diretrizes atuais.
3. Curadoria de imagens individuais (figura/página, licença, referência, anotação e descrição alternativa).
4. Ampliação do banco de questões N1/N2/N3 e novas estações em role-playing, com métricas de domínio.
5. Testes de regressão em Clínica Médica e Cirurgia e auditoria de performance antes de declarar produção validada.
