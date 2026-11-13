# Preparação dos próximos lotes

Esta branch prepara a renderização dos campos opcionais `exam`, `cases` e `figs`. O conteúdo das 58 aulas existentes permanece preservado. O aprofundamento clínico, as novas questões e a curadoria das imagens dependem da consulta às fontes.

## Campos opcionais

`exam` recebe uma lista de itens, com o padrão do enunciado, a pegadinha e a resposta esperada. O bloco Como cai na prova aparece imediatamente depois do pré-teste. Também aceita itens em texto simples.

```js
exam:[{
  pattern:'Descrição do padrão de enunciado.',
  trap:'Descrição da pegadinha.',
  answer:'Resposta esperada e sua justificativa.'
}]
```

`cases` recebe os casos resolvidos. Cada etapa pode ser texto ou lista de passos. Os textos destes exemplos descrevem o formato e não são conteúdo clínico.

```js
cases:[{
  title:'Título do caso',
  data:['Dados do caso.'],
  reasoning:['Primeiro passo do raciocínio.','Segundo passo.'],
  conduct:['Primeira conduta.','Próximo passo.'],
  error:'Erro comum que precisa ser evitado.'
}]
```

`figs` recebe os campos solicitados para a imagem e um campo opcional `markers`. As coordenadas de cada marcação vão de 0 a 100 e representam porcentagens da imagem. `x` e `y` posicionam o número; `toX` e `toY` posicionam a ponta da seta; `label` explica a marcação na legenda numerada. São aceitas de 2 a 4 marcações.

O renderizador aceita caminhos locais `assets/figs/*.webp`, texto alternativo, legenda, crédito, licença CC BY ou CC0 e página de origem HTTPS no PubMed Central, Commons ou Radiopaedia. Metadados incompletos e licenças incompatíveis não geram uma figura. Esse filtro de formato não comprova a licença: cada página original ainda precisa ser consultada antes de acrescentar o arquivo e seus metadados.

As setas e os números são SVG sobre a imagem, preservando os bytes do WebP. A figura abre em uma caixa de diálogo ao tocar ou usar Enter, com legenda e créditos. Escape e o botão Fechar imagem fecham a ampliação e devolvem o foco ao botão original.

`LessonDeep.figures(lista)` permite reutilizar a apresentação no curso POCUS quando as imagens forem verificadas e acrescentadas. O curso existente continua preservado.

## Verificação

Os testes usam somente uma figura geométrica sintética, gerada e interceptada no navegador. Essa figura e os seus metadados são dados de teste e não são publicados no conteúdo do site.

Há verificações de compatibilidade das aulas existentes, ordem do bloco de prova, casos estruturados, escape de texto, licença incompatível, créditos, setas, legenda, ampliação, fechamento, retorno do foco e ausência de rolagem horizontal em 320, 390, 820 e 1280 px, nos temas claro e escuro.

Resultado desta branch de preparação: 71 testes aprovados, nenhum teste falhou ou foi ignorado. Os dois validadores Python, a sintaxe dos 51 arquivos JavaScript e `git diff --check` passaram. Esta branch parte da main anterior ao lote 1, portanto essa contagem não deve ser somada à contagem de testes daquele lote.

## Inventário de questões para o aprofundamento

O acréscimo proposto atende simultaneamente ao mínimo de 10 novas por tema e à meta de pelo menos 30 por tema, preservando os IDs das questões existentes.

| Tema | Peso | Existentes | Acréscimo necessário |
| --- | ---: | ---: | ---: |
| Abdome agudo | 5 | 26 | 10 |
| Pâncreas | 5 | 16 | 14 |
| Trauma abdominal | 5 | 17 | 13 |
| Trauma torácico | 5 | 12 | 18 |
| Hérnias | 4 | 16 | 14 |
| Coloproctologia | 4 | 14 | 16 |
| REMIT, cicatrização e queimaduras | 4 | 16 | 14 |
| Doença vascular | 4 | 15 | 15 |
| Vias biliares | 4 | 9 | 21 |
| Radiologia | 3 | 18 | 12 |
| Urologia | 3 | 26 | 10 |
| Esôfago | 3 | 9 | 21 |
| Estômago | 3 | 9 | 21 |
| Fígado | 3 | 9 | 21 |

São 55 questões novas nos temas de peso 5 e 220 questões novas no total. Este é o inventário da pendência; as questões ainda precisam ser escritas e conferidas.

## Pendências para os lotes clínicos

- Conferir as diretrizes atuais e aprofundar as 19 aulas dos quatro temas de peso 5, depois as 39 aulas restantes.
- Acrescentar 4 a 6 itens de prova, 2 casos, pelo menos 6 perguntas de pré-teste e 8 de evocação em cada aula.
- Acrescentar pelo menos 10 questões por tema e alcançar a meta de 30 por tema, com justificativa de cada alternativa.
- Ampliar a exigência de integridade de todas as aulas para `exam >= 4` junto com a entrega do conteúdo. A suíte atual mantém as verificações anteriores, sem simular que as aulas já foram ampliadas.
- Confirmar as licenças na origem, baixar e converter as figuras para WebP de até 1200 px, acrescentar crédito, link, texto alternativo e marcações de cada imagem.
- Aprofundar os 8 módulos POCUS, com imagens reais verificadas, comparação com esquemas, roteiro falado, técnica, prova prática e 6 questões por módulo baseadas nas imagens.
- Depois do merge do lote 1, atualizar esta branch a partir da main, alinhar a nova versão nos três arquivos exigidos e no rodapé, repetir as verificações, abrir PR e confirmar a publicação.

O acesso às fontes e à API do GitHub retornou HTTP 403 no proxy do ambiente. As regras necessárias foram salvas no rascunho de rede, mas ainda dependem de aplicação ao ambiente ativo. Não foram acrescentados números clínicos sem conferência nem imagens com licença presumida.
