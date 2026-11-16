# ECG: continuidade da revisão privada

Preparado em 16/11/2026. A tabela lista chaves usadas pelo código, não comprova presença nem adequação das imagens no Supabase. Os 27 traçados não foram visualizados nesta rodada; não foram inventadas marcações nem realizados UPDATEs.

| Módulo | Chave esperada | Verificação privada |
|---|---|---|
| m1 · Como o ECG é registrado | ecg_m1 | a confirmar |
| m2 · Ondas, intervalos e a ordem de leitura | ecg_m2 | a confirmar |
| m3 · Frequência cardíaca | ecg_m3 | a confirmar |
| m4 · Ritmo: é sinusal? | ecg_m4 | a confirmar |
| m5 · Eixo elétrico do QRS | ecg_m5 | a confirmar |
| m6 · Onda P e intervalo PR | ecg_m6 | a confirmar |
| m7 · Complexo QRS: duração, amplitude e onda Q | ecg_m7 | a confirmar |
| m8 · Bloqueios de ramo | ecg_m8 | a confirmar |
| m9 · Segmento ST e onda T | ecg_m9 | a confirmar |
| m10 · Isquemia e infarto: critérios e paredes | ecg_m10 | a confirmar |
| m11 · Intervalo QT | ecg_m11 | a confirmar |
| m12 · Bradiarritmias e bloqueios atrioventriculares | ecg_m12 | a confirmar |
| m13 · Taquiarritmias de QRS estreito | ecg_m13 | a confirmar |
| m14 · Taquiarritmias de QRS largo | ecg_m14 | a confirmar |
| m15 · Eletrólitos, drogas e padrões que salvam vida | ecg_m15 | a confirmar |

| Traçado | ID informado no banco | Chave de leitura | Marcações |
|---|---|---|---|
| t16 | ecgtr_t16 | ecg_t16 | Pendente de visualização e conferência ampliada. |
| t17 | ecgtr_t17 | ecg_t17 | Pendente de visualização e conferência ampliada. |
| t18 | ecgtr_t18 | ecg_t18 | Pendente de visualização e conferência ampliada. |
| t19 | ecgtr_t19 | ecg_t19 | Pendente de visualização e conferência ampliada. |
| t20 | ecgtr_t20 | ecg_t20 | Pendente de visualização e conferência ampliada. |
| t29 | ecgtr_t29 | ecg_t29 | Pendente de visualização e conferência ampliada. |
| t30 | ecgtr_t30 | ecg_t30 | Pendente de visualização e conferência ampliada. |
| t31 | ecgtr_t31 | ecg_t31 | Pendente de visualização e conferência ampliada. |
| t32 | ecgtr_t32 | ecg_t32 | Pendente de visualização e conferência ampliada. |
| t33 | ecgtr_t33 | ecg_t33 | Pendente de visualização e conferência ampliada. |
| t37 | ecgtr_t37 | ecg_t37 | Pendente de visualização e conferência ampliada. |
| t38 | ecgtr_t38 | ecg_t38 | Pendente de visualização e conferência ampliada. |
| t39 | ecgtr_t39 | ecg_t39 | Pendente de visualização e conferência ampliada. |
| t43 | ecgtr_t43 | ecg_t43 | Pendente de visualização e conferência ampliada. |
| t44 | ecgtr_t44 | ecg_t44 | Pendente de visualização e conferência ampliada. |
| t45 | ecgtr_t45 | ecg_t45 | Pendente de visualização e conferência ampliada. |
| t46 | ecgtr_t46 | ecg_t46 | Pendente de visualização e conferência ampliada. |
| t53 | ecgtr_t53 | ecg_t53 | Pendente de visualização e conferência ampliada. |
| t54 | ecgtr_t54 | ecg_t54 | Pendente de visualização e conferência ampliada. |
| t55 | ecgtr_t55 | ecg_t55 | Pendente de visualização e conferência ampliada. |
| t56 | ecgtr_t56 | ecg_t56 | Pendente de visualização e conferência ampliada. |
| t57 | ecgtr_t57 | ecg_t57 | Pendente de visualização e conferência ampliada. |
| t58 | ecgtr_t58 | ecg_t58 | Pendente de visualização e conferência ampliada. |
| t59 | ecgtr_t59 | ecg_t59 | Pendente de visualização e conferência ampliada. |
| t60 | ecgtr_t60 | ecg_t60 | Pendente de visualização e conferência ampliada. |
| t64 | ecgtr_t64 | ecg_t64 | Pendente de visualização e conferência ampliada. |
| t65 | ecgtr_t65 | ecg_t65 | Pendente de visualização e conferência ampliada. |

Os esquemas ecgsch_brd, ecgsch_bre, ecgsch_bav, ecgsch_narrow e ecgsch_wide foram informados como existentes nas chaves m8, m12, m13 e m14. A leitura dessas chaves já está implementada no curso. Acesso autenticado é necessário para confirmar as linhas, abrir imagens e revisar achados. Não basta conferir o laudo escrito para posicionar uma seta.

O ebook de ECG anexado excede o limite de transferência de 32 MiB deste ambiente. Não foi possível renderizar suas páginas. Os PDFs locais de Urologia UNIFASE e Medpack foram lidos para triagem, sem publicar seus arquivos, imagens ou trechos. Não forneceram traçados para substituir a inspeção do ECG.

Próximo passo: conexão autenticada ao Supabase e versão do ebook com até 32 MiB, ou páginas relevantes em arquivos menores. Manter as imagens e dados base64 fora do repositório público. Para novas imagens, seguir o pipeline privado solicitado, com WebP de até 1000 px e cifragem AES256, e conferir cada imagem antes do envio. Para marcas, atualizar apenas marks por id, sem modificar data ou caption.
