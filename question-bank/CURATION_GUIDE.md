# Guia de curadoria

Use JSONL em UTF-8 com uma questão por linha. O CSV aceita os mesmos nomes de campos e usa JSON para valores compostos e números.
Use os identificadores canônicos da aula em `lesson_ids`. A origem registra a procedência e `profiles` registra os objetivos pedagógicos. Uma questão autoral pode ter o perfil `estilo_fmp` com origem `autoral_master`.

Antes de liberar uma questão, confirme o gabarito revisado, explique todas as alternativas, registre referências e documente a revisão médica e a autorização de reprodução. Use identificadores profissionais ou editoriais adequados ao caráter público do GitHub.

- `inbox/` recebe material local autorizado para processamento.
- `review/` recebe os candidatos extraídos e os lotes em revisão.
- `approved/` recebe lotes com aprovação médica e autorização documentada, ambos compatíveis com publicação no GitHub.
- `rejected/` guarda decisões locais de exclusão.
- `reports/` guarda relatórios locais de importação.

PDFs, transcrições sem autorização e relatórios com conteúdo restrito ficam fora do GitHub. Materiais proprietários podem orientar objetivos pedagógicos para questões originais. Lotes privados só podem ser compartilhados por um canal com acesso autorizado.
