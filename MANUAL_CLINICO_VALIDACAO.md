# Da consulta à prescrição — entrega de 12/11/2026

## Organização e escopo

A camada nova é aditiva: as aulas, bancos, IDs, históricos, saudação do painel e as cinco chaves de progresso existentes foram preservados. Não há alteração de esquema ou configuração do Supabase.

Cada uma das 54 aulas P2/P1 recebe um bloco expansível “Da consulta à prescrição”, com duas abas acessíveis:

- **Consulta e raciocínio:** pergunta organizadora, anamnese e justificativa, exame físico dirigido, modelo incompleto de redação, exames/objetivo/achados/limitações, conduta, correlações, iatrogenia e seguimento.
- **Prescrição e seguimento:** fichas selecionadas da matéria, com indicação/população, relação farmacológica, dose/via, estratégia de duração, cuidados e fontes específicas.

Há 16 guias de matéria, compartilhados entre seus capítulos; cada capítulo também mantém acesso ao próprio fenótipo, exames, conduta e exceções originais. Os guias não são apresentados como 54 consultas independentes nem substituem diferenças entre os subtemas.

A rota **Biblioteca → Manual de prescrição** reúne busca e filtro por matéria, redação de prescrição, exemplo acadêmico comentado e oficina de rascunho. A oficina verifica presença dos campos, **não** adequação clínica. Não emite receita, assinatura, PDF de prescrição ou validação legal. Não coleta identificação de paciente e não salva/envia o texto. Modelos de exame físico usam lacunas, distinguindo relato, observação e hipótese; não preenchem achados “normais”.

## Fichas selecionadas

16 fichas: hidroxicloroquina, pilocarpina, levetiracetam, imunoglobulina IV, piridostigmina, metilprednisolona, mesalazina, tretinoína oral/ATRA, cefepima, apixabana, anlodipino, metformina imediata, amoxicilina, levotiroxina, tiamazol/metimazol e hidrocortisona na crise adrenal.

Cada regime tem um contexto definido. Exemplos: levetiracetam oral não é esquema de estado de mal; cefepima está vinculada à neutropenia febril e à depuração renal explicitada; amoxicilina está vinculada ao cenário de PAC de baixa gravidade da NICE; mesalazina depende da apresentação de 1,2 g e não é esquema universal para Crohn. Telemedicina tem roteiro de segurança, sem medicamento padrão.

São fichas adultas de estudo, não formulário completo de todos os medicamentos ou todos os protocolos. Esquemas hospitalares de alto risco não oferecem preparação IV universal nem geram ordens de administração. Não foram adicionadas calculadoras de dose ou recomendações individualizadas.

## Rastreabilidade e limites da revisão

As URLs específicas, seções/escopos e a data da conferência documental estão em `prescription-data.js`, com links clicáveis nas fichas. Foram consultados resultados e trechos oficiais indexados de DailyMed/NLM, NICE, EULAR, EAN/PNS, NHS SPS, SmPC, Society for Endocrinology e protocolo de segurança Anvisa/Ministério da Saúde; também foram abertas páginas de DailyMed e localizados seus trechos de posologia. O acesso direto a algumas páginas NICE foi recusado com 403; nesses casos, o trecho indexado foi consultado, sem alegação de leitura integral da página bloqueada.

A conferência é documental e dirigida, não revisão médica independente. Não valida automaticamente todas as doses antigas da plataforma, não confere a disponibilidade de apresentações no Brasil e não substitui bula brasileira, protocolo local ou supervisão. As referências clínicas de apoio das aulas continuam identificadas como acervo existente, sem alegação de revalidação integral nesta entrega. Nenhuma edição de livro foi declarada integralmente consultada.

Fontes centrais reconsultáveis:

- EULAR LES: https://pubmed.ncbi.nlm.nih.gov/37827694/
- EAN/PNS SGB: https://onlinelibrary.wiley.com/doi/10.1111/ene.16073
- NICE EM: https://www.nice.org.uk/guidance/ng220/chapter/Recommendations
- NICE PAC: https://www.nice.org.uk/guidance/ng250/chapter/Recommendations
- Crise adrenal: https://www.endocrinology.org/clinical-practice/clinical-guidance/adrenal-crisis/
- Redação segura: https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/servicosdesaude/publicacoes/protocolo-de-seguranca-na-prescricao-uso-e-administracao-de-medicamentos
- Bulas individuais: links por ficha em `prescription-data.js`.

## Testes observados

- `npm test`: **29 cenários aprovados**, com APIs de autenticação/progresso interceptadas e sem gravações em produção.
- Cobertura adicional: 16 matérias e 16 fichas com fontes; todas as 54 aulas preservadas e com um guia; navegação por setas nas abas, filtro/busca do manual, rascunho sem persistência e teste de texto com HTML sem execução; larguras 375/820/1440 px em tema escuro, fonte ampliada e alto contraste.
- Validadores Python existentes, `node --check` em todos os JS e `git diff --check` aprovados.
- Capturas de celular e tablet inspecionadas. Safari real/VoiceOver e revisão clínica independente continuam pendentes. Os testes de interface não certificam segurança farmacológica individual.

## Arquivos

`clinical-data.js`: guias das matérias. `prescription-data.js`: fichas e fontes. `clinical.js`/`clinical.css`: abas, manual e oficina. Integrações pontuais em `index.html`, `app.js`, `p1_app.js` e texto de ligação em `study.js`. Testes adicionados em `tests/account-ui.test.cjs`.

Publicação autorizada expressamente pelo usuário em “finalize e publique”. Confirmar sucesso do workflow do Pages para o SHA integrado, além do push.
