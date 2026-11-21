# Clínica Master — atualização visual e de usabilidade (P2 → P1)

Data: 21/11/2026. Escopo: Urgência e Emergência, 23 aulas existentes. Não modifica textos das questões, gabaritos, banco de provas ou progresso.

## Ordem de implantação

**P2 primeiro:** dez temas recebem dez ilustrações vetoriais clínicas originais em arquivos SVG individuais. As figuras têm sombreado e recursos anatômicos, mas são **esquemas pedagógicos**, não fotografias nem imagens diagnósticas reais. A ilustração raster fotorrealista criada na conversa é um protótipo de estilo e **não foi publicada no repositório**. As imagens diagnósticas já existentes em Arritmias são preservadas para comparação.

| P2 | Imagem principal | Estratégia didática |
|---|---|---|
| Emergência hipertensiva/EAP | Pulmões e alvéolo congesto | Diferenciar PA elevada de lesão aguda e mecanismo do EAP |
| Síndrome coronariana aguda | Coração, coronária com placa e trombo | Ligar mecanismo a sintomas e decisão de reperfusão |
| Taqui/bradiarritmias | Traçados esquemáticos lado a lado | Comparar QRS e regularidade, junto a seis ECGs extraídos |
| Emergências glicêmicas | CAD e estado hiperosmolar | Visualizar insulina, cetogênese e perda hídrica |
| Distúrbios ácido-base | Pulmões, rins, PaCO₂ e HCO₃⁻ | Relacionar compensação e processo primário |
| Distúrbios eletrolíticos | Potássio e padrões de ECG | Buscar repercussão eletrofisiológica com ressalvas |
| Emergências tireoidianas | Tireoide e dois extremos metabólicos | Reconhecer tempestade e coma mixedematoso |
| Intoxicações | Padrões pupilares e sinais clínicos | Diferenciar toxidromes sem diagnosticar apenas pela pupila |
| Catástrofes | Fluxo de triagem e categorias | Classificação inicial, reavaliação e contingência |
| Cuidados paliativos | Paciente, equipe e decisão proporcional | Conforto ativo, comunicação e reavaliação |

**P1 em seguida:** novas figuras de ventilação mecânica (curva pressão/tempo), queimado (camadas da pele), asma (luz brônquica), crise adrenal (adrenal/rim) e afogamento (alvéolo e hipóxia). Os demais temas P1 continuam com figuras individuais extraídas de PDFs. A PCR tem ECG ampliável na decisão de ritmo.

## Componente comum de ampliação

`emergency-image-viewer.js` + `emergency-image-viewer.css`

- Botão semântico de ampliação dentro do card da imagem; texto acessível e feedback de foco.
- Modal com `role="dialog"`, `aria-modal="true"`, retorno ao foco anterior e controle da rolagem sem desligar o modo foco da plataforma.
- Zoom de 100% até 500%, redução, ajuste à tela; roda do mouse; clique duplo.
- Arrastar após ampliar; pinça de dois dedos em telas compatíveis; swipe horizontal para navegar entre imagens da mesma aula quando não ampliadas.
- Setas, Escape, teclado +/−/0 e contenção de tabulação no modal.
- Responsividade em tablet e celular (controles com área mínima para toque, imagem contida, altura dinâmica).
- Carregamento `lazy`, texto alternativo, legenda clínica e preservação de proporções.

## Estrutura e arquivos

- `assets/urgencia/illustrations/*.svg`: quinze ilustrações escaláveis.
- `emergency-visual-data.js`: links contextuais nas aulas (imagens complementares continuam no atlas).
- `emergency-pcr-pilot.js`: ECG real com botão de ampliar.
- `emergency-image-viewer.js/css`: visualizador comum.
- `index.html`: scripts e CSS com versão de cache.
- `tests/urgencia-visual-p2-p1.test.cjs`: cobertura de P2/P1 e integridade do histórico.

## Limites do trabalho

As ilustrações vetoriais não devem ser usadas como substitutas de ECG real, radiografia, TC ou imagem diagnóstica. Algumas figuras extraídas dos slides originais podem ter restrições de direito de publicação; sua proveniência deve ser auditada antes de uso externo.

Os testes automatizados simulados confirmam presença das imagens, do zoom e da navegação, mas **não equivalem a inspeção visual em dispositivo real, teste de gestos no Safari/iPad ou verificação do deploy no Cloudflare**. Antes de considerar o fluxo concluído em produção, testar os três tamanhos (desktop, tablet e celular) e observar eventuais gestos conflitantes com o sistema operacional.

## Integridade dos dados

Não alterar `store.study`, `QuestionHistory`, `QNav`, conteúdo de questões ou IDs de respostas. Os scripts novos só afetam interface de imagens. A navegação interna e o modo foco continuam sob responsabilidade dos módulos existentes.
