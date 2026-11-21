# OSCE Clínica Médica II — trilha POCUS de prioridade máxima

## Critério de priorização

**Informação relatada pelo estudante:** os professores disseram que haverá POCUS na avaliação prático-oral. **Não há confirmação documental do número ou da lista exata de achados cobrados**; esta é uma seleção pedagógica baseada em correspondência com os conteúdos práticos (dispneia, derrames, pericardite, TEP, choque, PCR).

Não se atribuem porcentagens de chance, ranking estatístico ou a condição de "questão da banca" a nenhum subtema.

### Sequência recomendada

| Código visível | ID técnico | Tema |
|---|---:|---|
| P1 | 87 | Linhas B / edema pulmonar |
| P2 | 88 | Derrame pleural |
| P3 | 89 | Derrame pericárdico / tamponamento |
| P4 | 90 | Pneumotórax: lung sliding, lung point e modo M |
| P5 | 91 | VCI e avaliação hemodinâmica |
| P6 | 92 | VD no TEP |
| P7 | 93 | POCUS durante PCR |

**IDs 1–86 permanecem intactos na numeração pública e todas as chaves de progresso existentes mantêm o mesmo ID técnico.** O bloco especial P1–P7 antecede o índice clássico 1–86. Total geral: **93** estações, 70 novas perguntas autorais em POCUS.

## Método por estação

- **Essencial ~1 min:** 1 pergunta, resposta-modelo após tentativa e síntese clínica.
- **Revisão rápida ~5 min:** 4 perguntas de imagem, janela/técnica, conduta e armadilhas.
- **Completo ~25 min:** 10 perguntas clínicas incluindo anamnese, físico, interpretação, diferenciais, testes, conduta, gravidade e comunicação.
- **Pré-estudo opcional:** respostas abertas de cada item, checklist, dicas e fontes, sem registrar nota ou erro.
- **Simulação padrão:** digitar resposta, inclusive "não sei"; declarar confiança, revelar gabarito, corrigir checklist, abrir aprofundamentos; salvar tentativa e reagendar D+1/3/7/21 por critérios.
- **Material clínico autoral** com fontes e mnemônicos, não é gabarito da FMP.

## Imagens e riscos de interpretação

Todas as imagens são **externas à vinheta** e devem ser identificadas como referência, não evidência do paciente fictício. Cada imagem tem link ao crédito/licença. As ilustrações que já carregam um diagnóstico escrito não são reveladas durante a tentativa.

- **P1:** linhas B de paciente com *fibrose pulmonar* (Tinss, Wikimedia, CC BY-SA 4.0); visualiza artefato, **não** comprova edema cardiogênico do caso.
- **P2:** imagem real de derrame pleural **fetal** (Harstonraven, Wikimedia, CC BY-SA 4.0), anotada e mostrada apenas após responder. Não corresponde ao paciente adulto; a diferença é explicada.
- **P3:** derrame pericárdico (James Heilman, CC BY-SA 3.0) e GIF real de tamponamento (Jer5150, CC BY-SA 3.0; desbloqueio após tentativa). **Derrame não significa tamponamento necessariamente**.
- **P4:** barcode/stratosphere sign (Schomynv, domínio público) e imagem seashore de comparação (Tinss, CC BY-SA 4.0).
- **P5:** GIF de VCI **normal** com variação respiratória (Tinss, CC BY-SA 4.0), não mostra hipovolemia da vinheta.
- **P6:** ecocardiograma 4 câmaras **normal** (Kjetil Lenes, domínio público) para identificar anatomia; vídeo de sobrecarga direita em TEP está nas fontes para estudo, não é apresentado como exame do caso.
- **P7:** derrame pericárdico de referência como exemplo de possível causa reversível, não um exame da PCR fictícia.

**Limitações expressas:** linhas B inespecíficas; ausência de lung sliding isolada não confirma pneumotórax; VCI isolada não prevê responsividade à expansão; eco de VD não exclui TEP; POCUS durante RCP não deve atrasar compressões/desfibrilação e não é critério isolado para encerramento de reanimação.

## Diretrizes e consensos usados

1. *Guidance for Clinical Practice Using Emergency and Point-of-Care Ultrasonography* (2024): https://pmc.ncbi.nlm.nih.gov/articles/PMC11201855/
2. ESICM basic ultrasound skills (2021): https://pmc.ncbi.nlm.nih.gov/articles/PMC8596353/
3. EACVI — Lung US in heart failure: https://pmc.ncbi.nlm.nih.gov/articles/PMC11032195/
4. AAFP (2023) — Pleural effusion diagnostic approach: https://www.aafp.org/afp/2023/1100/pleural-effusion
5. EACVI/ACVC — Cardiac US in cardiovascular emergency (2025): https://academic.oup.com/ehjcimaging/article/26/11/1699/8239188
6. AHA — Adult advanced life support (2025): https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support
7. *Common pitfalls in POCUS* (2016): https://pmc.ncbi.nlm.nih.gov/articles/PMC5081982/

## Critérios de aceite

- 7 novas estações / 70 novas questões.
- Bloco POCUS visível antes do índice 1–86; números antigos preservados.
- Pré-estudo não cria tentativas; simulação impede gabarito sem resposta/confiança.
- Ao responder, libera checklist, aprofundamentos e imagens rotuladas.
- Cada imagem mostra proveniência correta; fallback quando arquivo externo não carrega.
- Histórico das demais estações e sincronização não são migrados.
- Testes em \`tests/osce-pocus-prioritario.test.cjs\`, revisão clínica e QA responsiva devem ser conferidos.

**A REVISAR:** As respostas são didáticas e devem ser validadas pelo docente antes de serem tratadas como padrão de avaliação oficial.
