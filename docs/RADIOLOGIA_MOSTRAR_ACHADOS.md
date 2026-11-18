# Radiologia — Mostrar achados

O catálogo de imagens com chaves `rad_*` e `cirrad*` foi conferido: 76 imagens. Foram acrescentadas marcações às 54 que não as possuíam, e preservadas integralmente as 22 já anotadas. A gravação foi limitada por `jsonb_array_length(coalesce(marks,'[]'))=0`, e a comparação posterior confirmou a preservação das 22 anteriores.

O manifesto `radiologia-achados.json` registra os identificadores, chaves, posições relativas e textos das marcações. São 241 indicações no total, incluindo anatomia de referência e achados. As 151 indicações novas incluem explicações individuais. Não foram publicados bytes de exames ou slides; a mídia continua no catálogo autenticado existente.

## Interação

- Mostrar achados revela números na imagem e uma lista correspondente.
- Cada descrição pode ser selecionada para destacar aquela marca e atenuar as demais.
- Ocultar achados volta ao exame sem a sobreposição didática.
- A ampliação tem seus próprios controles de achados e preserva a proporção do exame.
- A sobreposição acompanha a superfície real da imagem, não as faixas laterais do cartão.
- Encerrar a autenticação remove imagens, legendas e ampliação da página.

## Critérios de conteúdo

As coordenadas novas foram conferidas em prévias sobre as imagens originais. Os pixels não foram reconstruídos ou alterados. Foram usados nomes anatômicos e descrições do que é visível, com distinção entre localizar uma região e confirmar um diagnóstico. Nas reproduções reduzidas de cintilografia, as marcações orientam a sequência temporal sem inventar um foco preciso de sangramento.

Duas legendas legadas receberam correção de contexto: `vasc18` contém imagens pediátricas, e `rad_mm_pelve` mostra importante componente esclerótico, que não corresponde ao padrão lítico clássico do mieloma. O diâmetro apendicular e a pneumatose também foram contextualizados, sem tratá-los como prova diagnóstica isolada.

Referências de conferência: [WSES, isquemia mesentérica](https://pmc.ncbi.nlm.nih.gov/articles/PMC9580452/), [IMWG, critérios de diagnóstico do mieloma](https://www.myeloma.org/international-myeloma-working-group-imwg-criteria-diagnosis-multiple-myeloma), além das referências dos capítulos e das aulas fornecidas pelo usuário.

Novas imagens de Radiologia devem entrar com marcações e legenda conferidas; não devem receber setas genéricas para apenas exibir um botão. Os testes validam cobertura do manifesto, coordenadas, explicações novas, controles, teclado, foco individual, proporção em diferentes larguras e limpeza ao sair da conta.
