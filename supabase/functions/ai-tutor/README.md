# Tutor de estudo

A função valida o JWT com `auth.getUser`, recusa usuários anônimos, aplica 40 tentativas por dia pela RPC atômica `ai_usage_hit` já existente e usa somente blocos do índice público oficial. O cliente envia IDs; texto, título e fonte são reobtidos do corpus oficial pelo servidor. Nenhuma pergunta ou resposta é gravada no banco ou nos logs da função.

A configuração `verify_jwt = false` preserva a configuração anterior da função e permite o uso da chave publicável atual. Isso não torna o tutor anônimo: a autenticação é obrigatória dentro do handler. Teste real sem token: HTTP 401, `{"error":"auth"}`.

Somente os Secrets `GROQ_API_KEY` e/ou `GEMINI_API_KEY` habilitam o provedor. Não coloque chaves no HTML, JavaScript público ou Git. O padrão usa Groq `openai/gpt-oss-120b`, com fallback `llama-3.1-8b-instant`; Gemini `gemini-2.5-flash-lite` é tentado se houver sua chave. Não há contratação ou habilitação de cobrança por este código. Os limites reais dependem da conta do provedor.

A documentação oficial consultada em 16/11/2026 informa para GPT OSS 120B, no plano gratuito, 30 RPM, 1.000 RPD e 8.000 TPM, sujeitos à conta e a mudanças: https://console.groq.com/docs/rate-limits . Os 40 usos são um limite por conta do site, não uma garantia de disponibilidade do provedor para todos os usuários.

## Manutenção

1. `npm run build:ai-index` quando as aulas mudarem.
2. Publicar o site para disponibilizar `ai-index.json`.
3. Se necessário configurar o segredo em ambiente local confiável, evitando gravar seu valor no histórico do shell; os exemplos abaixo usam placeholder:

```sh
supabase secrets set GROQ_API_KEY=SUA_CHAVE --project-ref lnbcqrdjivvqbhylhtgd
supabase functions deploy ai-tutor --project-ref lnbcqrdjivvqbhylhtgd --no-verify-jwt
```

A função já foi publicada por conector nesta execução. Não é necessário repetir o deploy para alterar somente um Secret. Não envie a chave pelo chat.

## Banco existente

`public.ai_usage(user_id, day, count)` tem RLS e nenhuma policy para clientes. A RPC `ai_usage_hit(p_user,p_limit)` usa `SECURITY DEFINER`, `search_path = ''`, operação atômica e EXECUTE restrito a postgres/service_role. A identidade vem exclusivamente de getUser e não do body. Apenas a função de servidor tem acesso ao contador. O aviso informativo de RLS sem policy é intencional: https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy . Nenhuma alteração de schema, policies ou permissões foi necessária.
