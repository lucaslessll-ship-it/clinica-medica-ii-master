# Validação do assistente de IA

Skill aplicada: `SKILL-assistente-ia-clinica-master.md`, fornecida pelo usuário nesta conversa. As instruções do documento orientaram a implementação; a autorização para concluir e publicar veio dos pedidos do usuário.

## Implementado

- Índice público gerado em Node/VM a partir dos dados reais e da ordem de carregamento do site, incluindo Clínica P1/P2, Cirurgia, POCUS, ECG, Hemograma, Antimicrobianos e Radiologia. Nesta versão: 547 blocos, 175 aulas, aproximadamente 1,5 MiB sem compressão. Não contém imagens privadas, notas, respostas ou progresso de contas.
- Busca MiniSearch 7.2.0, somente ao abrir o assistente, com normalização de acentos, prefixos, fuzzy 0,2 e prioridade para títulos. Cópia licenciada local como fallback do CDN.
- Painel acessível nos três temas, atalhos por aula atual, fontes que abrem a aula correta, histórico apenas em memória e descarte das respostas pendentes ao encerrar/trocar sessão. O boneco flutuante tem botão de ocultar; o menu lateral permanece disponível e permite reexibi-lo. Essa preferência de interface fica no dispositivo, sem salvar conversas. O painel inclui instruções de uso, e a tela inicial mostra um aviso dispensável de novas funções.
- Proxy autenticado, CORS restrito, cota atômica de 40 por dia, contexto de até cinco blocos/2.500 palavras e resposta limitada a 700 tokens. Os textos do cliente não são usados como autoridade: o servidor consulta o corpus público oficial. A IA é orientada a não inventar frequência em provas.
- Provedor configurado exclusivamente nos Secrets. Nunca lemos ou expomos valores de Secrets. Não criamos contas ou sessões de usuários para testar produção.
- Edge Function `ai-tutor` publicada, versão 2. Verificação HTTP real sem JWT confirmou 401 e `{"error":"auth"}`. Isso comprova a barreira de autenticação, não uma resposta do modelo.

## Testes automatizados

Os testes usam APIs/provedor simulados e a implementação real de MiniSearch. Foram verificados recuperação de “manobra vagal” e “abdome agudo”, navegação para a aula citada, atalhos POCUS, Escape, foco, reflow em 320 px, três temas, quota/erro, HTML inofensivo, encerramento de sessão, JWT inválido, CORS, seleção canônica dos blocos, fallback e cota atômica. Capturas de tela conferidas visualmente. A bateria completa `node --test --test-concurrency=4 tests/*.test.cjs` passou com 163 testes e nenhuma falha. A suíte de conta foi conferida também em execução isolada (55 testes aprovados); as novas opções de ocultar/reexibir, instruções e aviso de novidades têm cobertura própria.

## Cinco perguntas de aceitação com modelo real

Ainda não executadas: não há uma sessão de usuário autenticado de produção disponível neste ambiente. O usuário confirmou que ainda não cadastrou chave de provedor. Portanto, a geração de respostas reais fica bloqueada até configurar GROQ_API_KEY ou GEMINI_API_KEY nos Secrets. Não registrar respostas simuladas como evidência real.

| Área | Pergunta | Resposta real | Conferência da fonte |
| --- | --- | --- | --- |
| P1 cardio | Para que serve a manobra vagal nas taquicardias supraventriculares? | Pendente | Busca local recupera aula de arritmias P1; resposta real pendente |
| P1 infecções | Quais achados diferenciam pneumonia de outras infecções respiratórias na aula? | Pendente | Pendente com modelo real |
| P2 neuro | Como a aula diferencia síncope de crise epiléptica? | Pendente | Pendente com modelo real |
| Cirurgia | Como organizar a avaliação inicial do abdome agudo? | Pendente | Busca local recupera Cirurgia; resposta real pendente |
| POCUS | Quais são as limitações do FAST negativo? | Pendente | Pendente com modelo real |

Depois de entrar no site, abra o botão “Assistente de estudo” e faça essas perguntas. Cada resposta deve se apoiar somente nos trechos consultados, citar a aula, oferecer o link correto e terminar em “Dica de estudo:”. Se aparecer “A IA ainda precisa da chave”, configure o Secret pelo painel Supabase ou pelo comando documentado em `supabase/functions/ai-tutor/README.md`. Chave inválida e cota excedida têm mensagens próprias.

## POCUS preservado

As alterações preparadas antes do pedido de priorizar IA foram mantidas: exames e fotografias do acervo autenticado aparecem antes da teoria, seis desenhos foram retirados do acervo principal e seis legendas foram contextualizadas no cliente. As questões que exigem esquemas permanecem no bloco complementar, com IDs e respostas anteriores preservados. Nenhuma figura foi copiada para o repositório público; somente os dados sintéticos dos testes foram usados nas capturas automatizadas.
