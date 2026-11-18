# Imagens clínicas: exames primeiro

Atualização de 18/11/2026. Mantém rotas, índices das questões e progresso.

## POCUS

Os 15 tipos de desenho deixam de ser a imagem principal. Cada ocorrência, tanto na teoria quanto nas 48 questões visuais, recebe exames específicos do catálogo autenticado, orientação de leitura e um mapa desenhado secundário, inicialmente recolhido.

| Apoio | Referência real selecionada |
| --- | --- |
| Ecogenicidade | Cisto, rim e cálculo renal |
| Artefatos | Cálculo com sombra, cisto e linhas A |
| Transdutores | Fotografia de sonda linear e exemplos vascular, abdominal e cardíaco |
| Movimentos | Planos paraesternal longo e curto; não são demonstração do movimento |
| Pulmão normal | Linhas A; sem inferir deslizamento de imagem estática |
| Linhas B | Comparação linhas A/B |
| Modo M | Praia e código de barras |
| Derrame pleural | Líquido simples e septado |
| Morison | Exemplo sem faixa de líquido e exemplo com líquido livre |
| Janelas FAST | Hepatorrenal, pelve e subcostal; a última contém derrame no exemplo |
| Subxifoide | Subcostal quatro câmaras e derrame pericárdico |
| Paraesternal | Eixos longo e curto |
| Cava | Eixo longo e modo M |
| Vascular curto | Comparação de compressão da jugular |
| Agulha | Figura pública de ponta em veia antecubital e referência anatômica jugular; locais diferentes explicitados |

O mapa só é habilitado depois de todos os exames selecionados decodificarem. Ausência, raster inválido ou falha de imagem pública mantém o apoio oculto. Os números do mapa não são sobrepostos aos exames. A ordem segue a comparação clínica, não a ordem incidental do retorno da base. Consultas simultâneas à mesma chave são compartilhadas; cache e diálogos são limpos na saída/expiração/troca de sessão.

O catálogo principal deixa de apresentar os desenhos antigos sem proveniência individual; a tabela privada não foi alterada. Fundamentos e técnica usam as referências específicas junto do texto, sem uma galeria inicial vazia.

## Radiologia

Nove blocos de leitura guiada associam exames a modalidade, PA/perfil, padrões torácicos, caso pulmonar, cólon, apendicite axial/coronal, anatomia óssea, trauma e lesões ósseas. O décimo módulo mantém o conteúdo e exercícios existentes. `radsch_dose` deixa de ser apresentado como imagem de exame; a explicação textual sobre radiação permanece. Marcações da fonte sobre radiografias reais continuam com seus créditos.

## Fontes e limites da revisão

- O catálogo privado existente permanece no Supabase e só é carregado pelo cliente autenticado. Foram conferidos IDs, chaves, legendas e créditos; nenhuma imagem privada foi incluída no repositório, nem foi concedida nova permissão de acesso à base.
- A exportação das imagens privadas para conferência visual independente foi bloqueada pela revisão automática. Foi solicitada autorização específica ao usuário; esta revisão visual não deve ser declarada concluída antes de ocorrer.
- Fotografia de transdutor: Daniel W. Rickey, `UltrasoundProbe2006a.jpg`, CC BY-SA 2.5. [Página e licença](https://commons.wikimedia.org/wiki/File:UltrasoundProbe2006a.jpg).
- Agulha em veia antecubital: Riley DC, Garcia S, figura 2, *Crit Ultrasound J* 2012;4:3, CC BY 2.0. [Artigo original e licença](https://pmc.ncbi.nlm.nih.gov/articles/PMC3397656/). A imagem demonstra eixo longo, não técnica fora de plano. Consentimento de publicação registrado no artigo.
- As duas fontes públicas são referências externas diretas, sem alterações na imagem e com crédito/licença junto da figura. Dependem da disponibilidade dos servidores originais. O navegador de conferência não conseguiu abrir a sessão nesta tarefa; a identificação e a licença foram verificadas nas páginas das fontes, sem afirmar inspeção visual independente do raster.
- Não foram geradas simulações de exames por IA. Legendas diferenciam referência anatômica, aquisição estática, inferência clínica e avaliação dinâmica.

## Verificação funcional

Fixtures sintéticas exclusivamente em testes; não são imagens clínicas de produção. Testes verificam: ordem e seleção por ID, indisponibilidade e raster inválido, bloqueio de mapa sem exame, encerramento de sessão, consultas compartilhadas, 12 módulos POCUS, 10 módulos Radiologia, 48 questões com comparação, zoom, progresso e dimensões de 320 px a desktop nos dois temas.
