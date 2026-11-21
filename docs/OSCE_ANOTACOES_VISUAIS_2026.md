# Marcações visuais — OSCE Clínica Médica e POCUS

## Cobertura e método
Marcações são botões sobrepostos no navegador, reversíveis e independentes do arquivo original. No simulado só aparecem após a tentativa e a declaração de confiança; no modo Revisar respostas antes, ficam abertas, sem nota.

- 14 arquivos diagnósticos reais ou de referência (ECG, foto, radiografia e POCUS) nas estações técnicas 52, 4, 20, 46 e 87–93, com 37 pontos/explicações.
- 79 diagramas gerados pelo catálogo Master: três apontamentos lógicos para Sinais, Confirmação e Conduta, explicitamente rotulados como esquemas e não como exames.
- GIFs de VCI e tamponamento: guias em texto, sem setas paradas sobre estruturas que se movem.
- Cada ponto contém o que se vê e o que não se pode concluir isoladamente. As imagens podem ser ampliadas com pontos e comparadas sem marcações.

## Precauções clínicas
- ECG da estação 52: o recorte i-031.jpg não permite confirmar sozinho todos os critérios de fibrilação atrial. Comparar RR, QRS e atividade atrial sem afirmar ausência inequívoca de P.
- Torsades: linha azul já está no arquivo original; não é um segundo traçado. QT é avaliado fora da taquicardia.
- Mobitz II: esquema de referência, não o ECG original do documento.
- LES: eritema de face e radiografia de Jaccoud são material de terceiros. Imagem isolada não confirma LES, nem a redutibilidade clínica.
- POCUS P1: imagem de linhas B é de fibrose, não de edema cardiogênico no caso.
- POCUS P2: derrame pleural fetal com rótulos originais, não uma janela de punção adulta; oculta até correção.
- POCUS P3/P7: líquido pericárdico não é sinônimo de tamponamento.
- POCUS P4: barcode e ausência de sliding isolados não confirmam pneumotórax; seashore é comparação.
- POCUS P5: VCI normal não determina responsividade a fluidos.
- POCUS P6: eco normal de quatro câmaras não demonstra TEP nem exclui a doença.
- POCUS P7: o ultrassom não deve prolongar pausas de compressões ou retardar choque.

## Como adicionar novos achados
Editar osce-visual-notes.js usando a chave de identificação técnica da estação, não seu número visível. O array indexa exatamente images[index]. Cada nota exige nome, significado e limitação. Coordenadas x/y são percentuais da imagem verificada, de 0 a 100. Se não houver verificação do local ou for vídeo/GIF, não inventar coordenadas. Preservar créditos/licenças dos exames de terceiros.

## Validação
Checar responsividade, precisão dos locais, legenda antes/depois da resposta, zoom e testes tests/osce-visual-notes.test.cjs. As anotações são educativas e não equivalem a laudo ou homologação institucional.