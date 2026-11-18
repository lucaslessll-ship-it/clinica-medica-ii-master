# Radiologia de Cirurgia — integração das aulas

Oito apresentações fornecidas pelo usuário foram revisadas. A seleção inclui 28 imagens de exames, não as apresentações completas. Foram excluídos slides de abertura, fotografias sem utilidade radiológica, capturas de navegador com propagandas, figuras com identificadores visíveis e imagens de baixa pertinência.

## Organização e compatibilidade

- `cirrad_0`: obstrução, transição, hérnias e volvo.
- `cirrad_1`: apendicite e diverticulite, com US e TC.
- `cirrad_2`: anatomia normal do FAST, exemplos positivos e limitações.
- `cirrad_3`: sangramento digestivo e hemorragia extraluminal, incluindo aneurisma roto.
- `cirrad_4` e `cirrad_5`: mantidos como esofagogastroduodenal e revisão integrada.
- `cirrad_6` a `cirrad_9`: fígado, vias biliares, pâncreas e isquemia mesentérica.

Os seis identificadores anteriores, anotações, conclusões e questões foram preservados. O plano de estudos inclui automaticamente as quatro aulas adicionadas. O índice de busca/assistente incorpora o novo texto sem indexar chaves internas de mídia.

## Imagens e procedência

O manifesto JSON registra tema, slide de origem, hash SHA-256 do arquivo extraído, identificador da galeria e legenda revisada. Nomes de docentes, instituições e caminhos dos arquivos enviados não integram esse manifesto nem as legendas. As imagens não receberam reconstrução generativa, recorte ou alteração de achados; a conversão para WebP sem perdas foi comparada pixel a pixel com o arquivo original.

Os bytes selecionados ficam na tabela existente `public.lesson_images`, com política de leitura autenticada. Os arquivos PPTX e os bytes das imagens não foram adicionados ao repositório público. O material é de apoio fornecido para estudo; não se atribuiu licença aberta desconhecida. Outras imagens já existentes não foram alteradas.

## Revisão e verificações

Referências clínicas estão vinculadas em cada aula. Foram contextualizados FAST negativo, indicação/tempo da TC na pancreatite, pneumatose, espessamento vesicular e sinais isolados de obstrução. As legendas distinguem achado ilustrado de diagnóstico e limitação da imagem estática.

Testes abrangem cobertura das oito fontes, 28 imagens em galerias contextuais, ampliação, evocação, preservação de anotações e IDs, plano de estudos e enquadramento em 320, 820 e 1280 px. A revisão visual local utiliza os exames enviados; os testes versionados usam apenas um pixel sintético para testar a interface.
