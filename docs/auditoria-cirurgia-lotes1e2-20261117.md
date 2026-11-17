# Auditoria de Cirurgia — consolidação dos lotes 1 e 2 (2026-11-17)

## Escopo e integridade
- Banco **autoral público**: `cir_questions.js`. Questões privadas de provas antigas e base do Supabase **não** foram modificadas.
- **432 questões e 432 IDs únicos**, em 14 temas; distribuição do gabarito **108/108/108/108**.
- **22 itens revistos com diretrizes rastreáveis**: 7 no lote 1 (`cir-20261117-a1`) e 15 no lote 2 (`cir-20261117-a2`). Os 410 demais conservam `cir-20261116`, sem edição semântica.
- **15/15 alertas** de pistas verbais de duas ou mais alternativas erradas foram trabalhados no lote 2: **restam 0** pelo mesmo critério. Isso não descarta outros vieses.
- Alternativa correta exclusivamente mais longa: 95 antes da segunda rodada, 95 após a segunda rodada (de 432); a métrica não é um teste de validade clínica.
- **Gabaritos e IDs mantidos**, e textos/fonte exibidos **somente após resposta ou entrega do simulado**, usando links HTTPS com `noopener noreferrer`. Novas versões `revision` separam o histórico por enunciado; não apagam respostas antigas.

## Lote 2 — alterações justificadas por diretrizes

| ID | Tema do banco | Gabarito original, preservado | Referência principal |
|---|---|---|---|
| `cirproc-13` | cirproc | D | ASTRO — diretriz de radioterapia para carcinoma escamoso anal (2025) |
| `cirremit-16` | cirremit | C | AAST — consenso de rabdomiólise em trauma (2022) |
| `cirvasc-09` | cirvasc | A | ESC — diretriz 2024 para doenças aórticas e arteriais periféricas |
| `cirrad-09` | cirrad | C | ESICM — recomendações para ultrassonografia à beira-leito (2021) |
| `ciruro-02` | ciruro | B | ACR — critérios de imagem para hematúria macroscópica |
| `cirtabd-23` | cirtabd | A | WSES — diretrizes de trauma hepático (2020) |
| `cirtabd-29` | cirtabd | B | Diretriz europeia sobre sangramento e coagulopatia após trauma — 6ª edição (2023) |
| `cirproc-27` | cirproc | C | ASCRS — Clinical Practice Guidelines: Treatment of Rectal Prolapse (2017) |
| `cirvasc-29` | cirvasc | B | ESVS — diretrizes de trombose venosa (2021) |
| `cirestom-21` | cirestom | D | ESGE/EHMSG/ESP — MAPS III, neoplasia gástrica precoce (2025) |
| `cirestom-25` | cirestom | C | Japanese Gastric Cancer Association — diretrizes 2025 (7ª ed.) |
| `cirestom-26` | cirestom | A | Consenso internacional LAP-TG — acompanhamento após gastrectomia total (2022) |
| `cirfig-20` | cirfig | C | AASLD — prática de manejo do carcinoma hepatocelular (2023) |
| `ciruro-27` | ciruro | D | AUA/SUFU — avaliação de hematúria e uso de anticoagulantes (2025) |
| `ciruro-28` | ciruro | A | EAU — diretrizes de neuro-urologia, avaliação urodinâmica |

### Padrões que foram corrigidos
- Redução de distratores extremos (por exemplo, alegar que um único exame encerra investigação de hematúria ou TVP).
- Casos com condições decisivas explícitas, como **estabilidade hemodinâmica**, contraindicações, anatomia e risco de sangramento.
- Alternativas mais homogêneas em comprimento e com condutas clinicamente comparáveis.
- Comentários explicando **por que** a resposta é correta e quais nuances podem modificar a conduta.
- Controle de acesso à bibliografia: nenhum link clínico nas alternativas ou antes da correção.

## Pista adicional encontrada na experiência de prova

Uma inspeção do motor revelou que os **432 itens autorais não tinham `shuffle` definido** e a função `orderOf` os exibia na ordem gravada no arquivo. Apesar de o banco ter 108 gabaritos por letra, a ordem das respostas visíveis não era renovada a cada sessão de estudo.

**Correção:** o motor agora embaralha as alternativas dos itens autorais em treino e simulado. A ordem gerada é mantida durante a mesma tentativa e registrada por questão para permitir navegação; a correção usa sempre o índice original (não a posição visual), evitando mudar o gabarito. A ordem original de questões privadas é preservada salvo quando sua origem já indicar embaralhamento.

**Dados históricos:** respostas de enunciados antigos ficam no armazenamento, mas são ignoradas em filtros de desempenho atual, questões devidas e plano de revisão até nova tentativa da versão editada. O histórico não é apagado.

## Verificação automatizada
```sh
node scripts/auditar-questoes-cirurgia.cjs
node --test tests/cirurgia-editorial.test.cjs
npm test
```
Os testes verificam unicidade, 4 alternativas, comprimento, existência de fontes, versões da revisão, equilíbrio das letras e exibição da correção. Análise automatizada não substitui arbitragem clínica de conteúdo controverso.

## Limitações importantes
1. **Não significa revisão médica individual de todas as 432 questões.** Ainda são 410 sem nova validação semântica nesta rodada; o indicador de heurística não mede precisão de diagnóstico ou tratamento.
2. A calibração de dificuldade N1/N2/N3 segundo provas da faculdade **requer leitura das provas históricas**. Não foi inferida uma frequência de temas sem consultá-las.
3. Recomenda-se segunda leitura crítica por docente/cirurgião antes de afirmar confiabilidade editorial plena em provas valendo nota.
4. Dados do Supabase, questões de outras disciplinas, URLs de produção e outras funcionalidades permanecem fora do escopo. Se a aplicação tiver outra fonte de questões, ela deve ser auditada separadamente.

## Próxima rodada recomendada
- Amostra estratificada dos 410 itens não revistos: 4–6 por tema, com preferência por repetições e questões de alta consequência clínica.
- Detecção de ambiguidades, gabaritos dependentes de diretriz e alternativas semanticamente equivalentes (não só pistas de linguagem).
- Auditoria separada do banco privado com estratégia de versão, backup e proposta de alterações **antes** de sobrescrever respostas de usuários.
