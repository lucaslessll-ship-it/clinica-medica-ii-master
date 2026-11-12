# MASTER Clínica Médica II — v7 | Engenharia Reversa da Banca

Plataforma educativa, independente da ApexMed, desenvolvida por **Lucas Lessa**.

**P2 prioritária · P1 cumulativa · 54 aulas · 136 questões autorais · 530 flashcards · provas oral e discursiva · Casos Mutantes.**

## O que mudou na versão 7

- **Ordem da P2 recalibrada** a partir da página de estratégias do Notion: Síncope/Crise → SGB → EM/MG → LES/SAAF/Vasculites → Emergências Onco-Hematológicas → Neoplasias Hematológicas → DII/Celíaca/CCR → Miopatias/Esclerose/Sjögren.
- **Banco P2 ampliado de 40 para 80** questões, composto por 12 N1 (15%), 36 N2 (45%) e 32 N3 (40%). P1 mantém 56 questões separadas.
- **Simulado P2** com 20 itens (3 N1, 9 N2 e 8 N3), cobrindo os 8 eixos; 90 min e correção comentada.
- **Radar da Banca**: origem da evidência classificada em *material direto*, *relato retrospectivo do Notion* e *simulação autoral*.
- **Laboratório Casos Mutantes**: 8 casos P2 e 2 P1, variáveis clínicas que mudam a investigação, estratificação ou conduta; 3 etapas por caso P2 e 2 por caso P1.
- **Discursivas P2/P1**: espelho de seis componentes com 10 pontos de **autoavaliação**; não constitui nota docente.
- **Caderno de erros** por mecanismo (não sabia / confundi conceito / errei algoritmo / li mal), com recomendação de reteste 48–72 horas.
- **Prioridade adaptativa** `peso do tema × lacuna observada × urgência`. Estimativa para organizar estudos, sem prever incidência nas provas.
- **252 flashcards da P2 reequilibrados**, mantidos 278 da P1 (530 total), com evolução do progresso armazenada no dispositivo.
- Correções de contraste no Fluxo MASTER 2.00 e componentes do novo laboratório (claro/escuro e responsividade).

## Acesso pelo GitHub Pages

Depois de enviar estes arquivos para o repositório `lucaslessll-ship-it/clinica-medica-ii-master` na branch `main`:

1. Entre em **Settings → Pages** no repositório.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. O workflow `.github/workflows/deploy-pages.yml` é executado a cada `push` na `main`, validando o código e publicando o site automaticamente.
4. Quando o primeiro deploy terminar, o site poderá ser acessado no endereço informado pelo GitHub Pages, normalmente `https://lucaslessll-ship-it.github.io/clinica-medica-ii-master/`.

**A URL acima é o formato esperado, não prova de que a publicação já foi concluída.** Confirme em Settings → Pages ou Actions.

Para editar diretamente pelo iPad: abra o arquivo de interesse no GitHub → ícone de edição → **Commit changes**. O workflow publica automaticamente a nova versão.

## Arquivos editáveis

| Modificação | Arquivos |
|---|---|
| Layout, navegação e módulos | `index.html`, `app.js`, `hig.js` |
| Cores, iPad, acessibilidade | `style.css`, `hig.css`, `evidence.css`, `banca.css` |
| Aulas completas da P2 | `data.js`, `deep_content.js` |
| Aulas completas da P1 | `p1_data.js` |
| Questões antigas **autorais** P2 e novos itens N1/N2/N3 | `questions.js`, `banca_questions.js` |
| Casos clínicos originais / mutantes | `cases.js`, `banca.js` |
| Ordem P2 e alocação de 252 flashcards | `priority_patch.js`, `extra_cards.js` |
| Questões e casos da P1 | `p1_questions.js`, `p1_cases.js`, `p1_app.js` |
| Flashcards da P2 e unificados | `MASTER_Clinica_II_v7_P2_252_Flashcards.csv`, `MASTER_Clinica_II_v7_P1_P2_530_Flashcards.csv` |
| Diretrizes, fonte original e evidências | `evidence.js` |
| Relatório de engenharia reversa e proveniência | `ENGENHARIA_REVERSA_V7.md` |
| Testes estáticos e empacotamento iPad | `scripts/validar.py`, `scripts/build_standalone.py` |

## Testes

```bash
python3 scripts/validar.py
for f in *.js; do node --check "$f"; done
python3 -m http.server 8080
```

O HTML individual iPad é gerado localmente com `python3 scripts/build_standalone.py`; para edição contínua e sincronização local do progresso no mesmo navegador, use **GitHub Pages por HTTPS**.

## Critérios de segurança e evidência

- O plano oficial de 2026.2 cita Harrison 21ª edição. A estratégia do Notion utiliza Harrison 22ª como atualização científica, **não como edição oficialmente exigida**.
- Planos de 2026.1/2026.2, Notion e compilação anotada da P1 sustentam a orientação pedagógica. **Não foram localizados os PDFs integrais de todas as provas Med 58–61**: não há percentuais históricos ou previsão de questões da P2.
- Novas questões e microcasos são **originais**, inspirados no padrão cognitivo, **não transcrições de provas**. Referências por assunto não garantem validação farmacológica individual.
- Conferir doses, contraindicações, contexto e a diretriz original antes de uso clínico; todo material é educacional, não prescrição para pacientes.
- Não subir livros licenciados, fotos de pacientes, avaliações sob restrição, dados privados ou credenciais para um repositório público.
- Os dados de estudo ficam no `localStorage` do navegador; fazer backup regular. GitHub **não é banco de progresso do usuário**.

**Desenvolvido por Lucas Lessa.**

## Atualização de estudo

As novas funções estão em `study.js`, `study.css` e `media-viewer.js`. Progresso individual sincroniza com Supabase após autenticação; alterações podem ficar pendentes quando offline. O menu da conta permite sincronizar, sair e exportar uma cópia de conflito quando disponível. Use também o backup completo nas Preferências.

Execute `npm ci && npm test` na raiz do repositório. Consulte `../AUDITORIA_MASTER_NOVA.md` para escopo entregue, fontes efetivamente verificadas e pendências. GitHub Pages publica a `main`; confirme a conclusão do workflow antes de anunciar uma versão no ar. Não há backend novo, migração de framework ou alterações de esquema nesta entrega.

### Consulta, raciocínio e prescrição

Dentro de cada aula, expanda **Da consulta à prescrição**. A aba **Consulta e raciocínio** organiza história, exame físico, investigação, decisões e retorno. **Prescrição e seguimento** oferece fichas selecionadas com fontes específicas. O acervo central fica em **Biblioteca → Manual de prescrição**; inclui filtro, busca e exercício de redação apenas nesta tela, sem envio ou salvamento do rascunho.

São 16 guias de matéria ligados às 54 aulas e 16 fichas adultas selecionadas, não um formulário completo ou prescrição individual. Escopo, conferência documental e validação estão em `../MANUAL_CLINICO_VALIDACAO.md`.
