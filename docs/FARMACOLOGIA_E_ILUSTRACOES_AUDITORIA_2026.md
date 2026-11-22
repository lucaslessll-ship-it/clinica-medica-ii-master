# Farmacologia integrada e ilustrações OSCE — 22/11/2026

## Escopo
Aplicação realizada exclusivamente no repositório Clínica Master. **Não alterar ApexMed**. Nenhum histórico de questões, doses, informações de pacientes ou autenticação foi migrado ou excluído.

## Inventário e transparência
- Catálogo existente: **279 medicamentos**, conectados a 320 entradas de reconhecimento, que também incluem classes e exposições.
- Todas as 279 fichas agora expõem: classe, mecanismo/efeito, contexto de uso, riscos, cautelas/contraindicações, interações, monitorização, regimes por indicação e fontes.
- **15 fichas** receberam sínteses farmacológicas individualizadas nesta implementação. As demais usam informações gerais de classe e, quando disponível, o mecanismo já documentado individualmente no acervo anterior. A expressão 'características gerais da classe' é proposital.
- Informações gerais de classe não são bula revisada individualmente. Não declarar as 279 fichas como homologadas ou verificadas por médico/farmacêutico.
- Regimes de dose preexistentes foram **preservados**. Os estados pendentes (atropina, dipirona, domperidona e Lugol) não foram convertidos em prescrições validadas.
- Digoxina foi priorizada com mecanismo da Na/K ATPase, efeito vagal sobre o nó AV, risco em bloqueios e interação/monitorização, com link de bula DailyMed.

## Integração e navegação
- `pharmacology-education.js` centraliza metadados farmacológicos após o carregamento de `prescription-data.js` e `posology-data.js`.
- `clinical.js` mostra farmacologia ANTES da posologia; alerta sobre informação específica versus informação de classe.
- `posology.js` marca menções nos parágrafos de aulas, resumos, explicações e enunciados não interativos; painel de farmacologia cita todos os medicamentos reconhecidos no conteúdo visível. Não insere botões dentro de alternativas interativas (`label`, `button`, `form`).
- Manual de prescrições carrega **18 fichas por vez**, com botão para ampliar; evita renderizar 279 cartões simultaneamente.
- `laboratorio-master/microcitose/index.html` também carrega os mesmos recursos; apresenta fichas consistentes no curso independente.

## Ilustrações do OSCE
- O gerador `osce-catalog-builder.js` não usa mais truncamento arbitrário de 49 caracteres, caixas SVG com altura fixa nem `foreignObject` de 75px.
- Quebra de linha por `<tspan>`, altura calculada por maior texto, título adaptativo, conteúdo sem reticência por corte.
- Os **79 esquemas didáticos** carregam metadados de layout; os pinos ficam no canto dos blocos para não cobrir sinais, confirmação e plano.
- Imagens e ECG reais mantêm seus próprios limites de interpretação; diagramas não são exames nem laudos.

## Testes
- `tests/pharmacology-integral.test.cjs`: completude estrutural 279, digoxina, regimes pendentes, integração independente, 18 por lote.
- `tests/osce-svg-no-clipping.test.cjs`: 79 diagramas, alturas, texto dentro das caixas, bloqueio AV total, pinos e spoiler no simulado.
- Manter suítes preexistentes `tests/posology.test.cjs` (Chrome real), POCUS, OSCE, questões, navegação e acessibilidade.

## Limites de homologação
Não foi realizada revisão clínica independente de todos os 279 princípios ativos e seus esquemas. Antes de uso assistencial, conferir o produto específico, bula brasileira e protocolo do serviço, população (gestação, pediatria, idosos), indicação, dose, via, forma, ajustes renais/hepáticos, interações e monitorização. O material é exclusivamente educacional.

## Referências de arquitetura
- FDA — estrutura de rotulagem e farmacologia: https://www.fda.gov/drugs/fdas-labeling-resources-human-prescription-drugs/frequently-asked-questions-about-labeling-prescription-medicines
- DailyMed — digoxina: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4b893a4a-31e6-4a7a-b16c-02b1e578335b
- Demais fontes: preservadas em `MASTER_RX.sources` e apresentadas por medicamento e por regime.