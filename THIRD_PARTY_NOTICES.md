# Componentes abertos acrescentados ao Laboratório

## AMR 3.1.0

Dados de referência: Matthijs S. Berends e colaboradores, projeto AMR, versão 3.1.0, commit 052edc476158f1bad7a3df3b0fc78c95eea8ace4.

Origem: https://github.com/msberends/AMR/tree/v3.1.0.

Licença do componente: GPL-2. Cópia integral: tools/amr/LICENSE. Recorte distribuído: MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/amr-uro-data.js. Reprodução e atribuição: tools/amr/gerar_recorte.py e tools/amr/LEIA-ME.md.

Foram selecionadas três regras de interpretação da reprodução EUCAST 16.1. Fonte e hashes são preservados. Nenhum código do runtime R ou do pacote AMR é executado no navegador. Isso não atribui uma licença à totalidade do projeto ou aos documentos originais EUCAST/BrCAST.

## Ferramentas de otimização e validação

- Vite 8.3.8 — MIT — https://github.com/vitejs/vite
- ts-fsrs 6.0.0 — MIT — https://github.com/open-spaced-repetition/ts-fsrs. Código incluído no build; licença distribuída em assets/vendor/FSRS-LICENSE.txt.
- axe-core/Playwright 4.14.0 — MPL-2.0 — https://github.com/dequelabs/axe-core (integração https://github.com/dequelabs/axe-core-npm). Usado nos testes, sem execução para visitantes.
- Lighthouse CI 0.16.1 — Apache-2.0 — https://github.com/GoogleChrome/lighthouse-ci. Usado em auditoria local e CI.
- Promptfoo 0.125.1 — MIT — https://github.com/promptfoo/promptfoo. Usado para avaliar perguntas sintéticas com o handler real do tutor.

As dependências de auditoria e avaliação não são incluídas no JavaScript enviado aos visitantes.

## ECG do caderno Mastery de Arritmias

Os traçados em `assets/urgencia/mastery/ecg-*.svg` são recortes do canal MLII da MIT-BIH Arrhythmia Database v1.0.0, de Moody e Mark, distribuída pelo PhysioNet sob Open Data Commons Attribution License 1.0. Foram convertidos em curvas vetoriais, com escala vertical de 38 px/mV, deslocamento vertical pela mediana do recorte, grade e marcas derivadas das anotações da base. Os recortes e a interpretação estão identificados no caderno.

- [MIT-BIH Arrhythmia Database v1.0.0](https://physionet.org/content/mitdb/1.0.0/)
- [Licença ODC-BY 1.0](https://physionet.org/content/mitdb/view-license/1.0.0/)

## Exames clínicos na expansão Mastery de Urgência

- `rx-congestao.jpg` é uma radiografia anotada de congestão, de Mikael Häggström, reproduzida sem alterações. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Chest_radiograph_with_signs_of_congestive_heart_failure_-_annotated.jpg) · [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)
- `pocus-linhas-b.jpg` mostra linhas B em um caso de fibrose, de Tinss. A faixa técnica superior foi removida e os metadados foram retirados. O recorte permanece sob CC BY-SA 4.0. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:B_lines_on_a_lung_ultrasound_of_a_patient_with_fibrosis.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- `rx-afogamento.png` é uma radiografia em caso de aspiração de água salgada, de Dr. Terence McManus, reproduzida sem alterações. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Salt_water_aspiration_syndrome_chest_x-ray,_before_treatment.png) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
