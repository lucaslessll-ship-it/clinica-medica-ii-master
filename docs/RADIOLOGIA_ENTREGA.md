# Curso de Radiologia

Implementado sobre a main `71f795f`, preservando o Laboratório Master e as atualizações de Cirurgia.

## O que foi localizado

O catálogo privado `lesson_images` já contém 21 figuras nas chaves `rad_m2` até `rad_m9`; 19 possuem marcações. Consulta somente de leitura confirmou conteúdo base64 decodificável nas 21 figuras. Não foi necessário alterar tabelas, permissões, dados ou configuração do Supabase. A pasta do computador pessoal citada pelo usuário não está montada neste ambiente; o catálogo existente foi suficiente para finalizar a integração.

## Entrega

- Curso CourseKit com nove módulos: escolha do exame; tórax normal; tórax agudo; massa pulmonar; abdome no RX; TC e apendicite; anatomia musculoesquelética; trauma; lesões ósseas.
- 27 questões autorais com explicação e nove casos comentados.
- Acesso direto pela lateral, rota `#rad` e resultados na busca global.
- Conclusões, respostas e casos resolvidos usam `store.study.rad`, no mecanismo de persistência já utilizado pelos demais cursos.
- Imagens continuam privadas e carregam pelo mecanismo autenticado existente, incluindo zoom, créditos e mostrar/ocultar marcações.
- Versão de recursos `20261116-rad1`, preservando parâmetros e hash no redirecionamento inicial.

## Revisão e limites

As legendas preexistentes são mantidas com os respectivos créditos. O módulo 9 destaca explicitamente que esclerose não é o padrão habitual do mieloma e que a legenda discrepante exige revisão da fonte e do contexto. Não houve revisão docente independente de todas as imagens ou confirmação de autorização para redistribuição; nenhuma figura foi copiada para o repositório público.

As referências externas são apresentadas para aprofundamento, sem alegar consulta integral nesta execução: a rede deste ambiente bloqueou o acesso aos domínios ACR, NICE e Radiology Masterclass (403 no proxy). O conteúdo foi escrito com limites clínicos explícitos e integração com as aulas já existentes; não representa protocolo assistencial individual.

## Verificação

`tests/radiology.test.cjs` cobre os nove módulos em 320 e 1440 px, questões, chaves de imagens, ampliação, casos, persistência após recarga, navegação e pesquisa. A API é simulada nos testes, sem contas ou gravações de produção. As capturas foram conferidas visualmente em ambos os tamanhos. Os dois validadores estáticos existentes passaram.
