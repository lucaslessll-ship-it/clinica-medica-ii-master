# LABORATÓRIO MASTER · Piloto de Anemia Microcítica

**Status:** piloto isolado, para avaliação visual e pedagógica. **Não está publicado no MASTER.**

## O que funciona
- 7 etapas de aprendizagem e indicador de avanço.
- Aula aprofundada de ferro/heme/transferrina, ferritina, hepcidina e ferroportina, com diagrama SVG original.
- Comparação entre deficiência absoluta, anemia inflamatória e traço talassêmico; distinção entre diretrizes ASH 2026 e AGA 2020.
- 2 imagens de esfregaço reais da Wikimedia Commons, licença CC0, com ampliação e atribuição.
- 4 laudos clínicos fictícios, cada um com hemograma inicial, liberação sob demanda de exames, hipótese clínica e correção.
- Explorador de TSAT e índice de Mentzer com validação numérica e aviso de limitação.
- 3 casos progressivos com 9 decisões e feedback pós-resposta.
- 12 questões N1–N3 com alternativas de posição permutada e comentários das alternativas.
- 7 flashcards e exportação do progresso para JSON.
- Acessibilidade básica, modo noturno, layout desktop/iPad/celular, sem dependências de JavaScript de terceiros.

## Como abrir
**Método mais simples:** abra `Microcitose_LAB_MASTER_Demo.html` em um navegador moderno. As imagens reais e as fontes externas requerem internet; todo o restante funciona localmente.

**Para desenvolvedores:** `index.html` + `styles.css` + `app.js` são os arquivos-fonte equivalentes. Servidor HTTP local recomendado para testar integrações. O script de verificação `test_pilot.py` está no pacote.

## Projeto escalável (não copiar o HTML para 180 exames)
A versão definitiva deverá extrair o conteúdo para fichas estruturadas por exame ou síndrome e renderizá-las com componentes reutilizáveis. Exemplo de esquema:

```js
{
  id: 'hema.microcitose.01',
  version: '2026.11.15',
  reviewedBy: null,
  status: 'editorial-pilot',
  population: 'adulto',
  objectives: [...],
  physiopathology: [...],
  analytes: [{ id, loinc, specimen, unit, evidence, rangeByContext }],
  media: [{ type:'photo', url, license, author, sourceUrl, copyrightCheckedAt }],
  cases: [{ patient:'synthetic', labs:[], stages:[] }],
  questions: [{ id, level, stem, options, correctIndex, why, distractors, sourceIds }],
  refs: [{ id, doi, version, lastVerifiedAt }]
}
```

### Próximas etapas recomendadas
1. Substituir os dados embutidos em `app.js` por JSON modular e validador de esquema.
2. Fazer crosswalk LOINC/UCUM nos biomarcadores via `Precisa-Saude/fhir-brasil`, **somente após validar os códigos e o material/método**.
3. Incorporar capítulos do ELTME como referências textuais, mantendo autoria e CC BY 4.0; **não** copiar e colar diretrizes protegidas.
4. Adicionar catálogo de exames, filtros por especialidade, leituras de laudo e revisões ao longo do tempo.
5. Adicionar progresso isolado ao Supabase mediante migração específica e revisão RLS; neste piloto `localStorage` apenas.
6. Fazer revisão docente da interpretação clínica e testes com Safari/iPad físico.
7. Considerar imagens próprias ou de licença aberta por exame; não redistribuir materiais com licença incerta.

## Segurança e integridade
- Não recebe arquivos nem dados de pacientes; os valores são totalmente fictícios.
- Não usa Supabase, login, API externa de IA ou chave de serviço.
- Não oferece decisão clínica automática para valores livres do explorador.
- As imagens microscópicas usam `Special:FilePath` da Wikimedia; dependem de conexão, e o código oferece descrição alternativa e link da fonte.
- Fontes/diretrizes mudam ao longo do tempo; os cortes apresentados devem ser interpretados segundo população e finalidade.
- Não atribuir selo "revisado por especialista" até haver validação independente.

## QA
- `node --check app.js` aprovado.
- Playwright/Chromium: navegação por 7 seções, liberação de laudo, resposta de caso, correção de questão, modo escuro, nos tamanhos 1440, 820 e 390 px.
- Sem erro de JavaScript, nem overflow horizontal nas seções testadas.
- As URLs de imagens foram verificadas quanto à licença CC0, **não houve teste de carregamento das imagens no navegador automatizado offline**.

## Arquivos
- `Microcitose_LAB_MASTER_Demo.html` — versão de demonstração em um único arquivo.
- `index.html` — estrutura do componente.
- `styles.css` — visual e responsividade.
- `app.js` — conteúdo, aulas, questões e interação.
- `FONTES_E_LICENCAS.md` — bases científicas e proveniência de cada imagem.
- `test_pilot.py` — testes básicos (Playwright + Chromium).