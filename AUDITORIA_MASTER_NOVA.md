# Entrega de estudo e auditoria de escopo

O pedido direto do usuário autoriza publicação, substituindo as orientações de não publicar dos anexos. A branch `melhorias-interface-autenticacao` parte da versão já testada `ace1edf` da `melhorias-master`, preservando suas correções; a `main` anterior era `86a75a7`.

## Implementado

- Menu em seis grupos expansíveis, mantendo todas as rotas existentes; avatar com conta, preferências, senha e sincronização. Mostrar/ocultar senha nos formulários.
- P2 com oito títulos e ordem do checklist, alternância para prioridade pedagógica e checklist com material autodeclarado, leituras, cartões e questões reais. Oral com exatamente seis temas: reuma2, reuma1, neuro1, neuro2, neuro3 e gastro. Hema/onco preservados para escrita. Finalização de caso oral registrada.
- P1 em seis agrupamentos, preservando oito IDs e toda a biblioteca.
- Painel com erros, revisões, simulado, retomada de aula e calendário editável (24 e 26/11/2026 às 08h, horário local informado, sujeito a confirmação).
- Sessões mistas, erradas, inéditas e vencidas usando apenas o banco atual. Correção após resposta; simulado continua corrigindo ao final. Confiança opcional e ajuda registradas sem inventar dados antigos. Erros e acertos com ajuda voltam ao primeiro intervalo. Fila limitada por dia; intervalos 1/3/7 e carga configuráveis, explicitamente heurísticos.
- Metadados aditivos em `study` dentro de `master_p2_lucas_v1`. As cinco progressKeys e IDs originais foram preservados; nenhum esquema, RLS, usuário ou registro de produção foi alterado para teste.
- Detecção otimista de alterações remotas antes de gravar; preservação de cópia remota por conta e exportação pelo perfil. Pendências locais também recuperáveis. **Não é transação atômica**: gravações rigorosamente simultâneas continuam exigindo futura evolução do servidor. Não foi prometida sincronização sem conflitos.
- POCUS separado: fundamentos, escopo limitado, qualidade/orientação de janela, limitações, registro e treino verbal, com anotação e conclusão persistentes. Não se presumiu FAST/cardíaco/pulmão como exigência da banca. Fonte nova efetivamente reaberta: Lewiss, AHRQ/PSNet, 2018, https://psnet.ahrq.gov/web-mm/ultrasound-looked-fine-point-care-ultrasound-and-patient-safety . As orientações são introdutórias e não substituem prática supervisionada.
- Visualizador de imagem local: zoom, ajuste, arraste, tela cheia quando suportada, setas, traço, desfazer, limpar, teclado, Escape, retorno de foco e exportação PNG. Coordenadas normalizadas; original não alterado. Nenhum upload ou persistência de imagens.

## Imagens e evidências: limites concretos

Inventário: ícone e cinco capturas da interface; nenhuma imagem clínica pré-existente. Candidato Servier Medical Art, oligodendrócito: página e licença CC BY 4.0 verificadas via busca, porém download binário recusado pelo ambiente com HTTP 403. Não foi possível a inspeção visual exigida, portanto **não incluído**. Manifesto em `assets/media-manifest.json`. Não há imagem clínica sintética, acervo restrito ou hotlink.

A busca da ACEP localizou suas diretrizes; a página inicial solicitada não foi acessível. A fonte AHRQ acima foi lida. As demais referências preexistentes **não foram revalidadas integralmente** nesta entrega. Não se adicionaram vídeos sem IDs verificados, doses novas, calculadoras de prescrição ou selos de revisão científica. Cada aula sinaliza a curadoria pendente. A revisão individual de todas as recomendações, farmacologia, vídeos por subtema e imagens licenciadas permanece pendente; esta é uma versão funcional de estudo, não a conclusão da auditoria científica abrangente descrita no briefing.

## Verificação

`npm test`: testes de conta existentes mais currículo, filtros, datas controladas, confiança/ajuda, persistência POCUS, imagem quebrada, zoom/marcações/exportação e backup de conflito. APIs de autenticação/progresso interceptadas: nenhuma escrita real de teste. Validadores `scripts/validar.py`, `scripts/validar_v7.py` e sintaxe de todos os JS.

Layout em Chromium: 320/390/820/1180 px, claro/escuro e alto contraste; teclado. Safari real, VoiceOver/NVDA, Lighthouse, 200% de zoom em todos os conteúdos e uso com duas contas/dispositivos reais não certificados. O download WebKit já havia sido bloqueado.

## Publicação e privacidade

O repositório tem `has_pages: true`; o workflow existente `pages build and deployment` publica a `main`. Publicação deve ser confirmada pelo resultado desse workflow para o novo SHA, não apenas pelo push. A consulta direta do ambiente a `api.github.com` e `github.io` foi bloqueada; o conector GitHub consegue ler metadados e workflows.

A autenticação bloqueia a interface, não os arquivos estáticos públicos. Dados pessoais continuam dependendo das políticas do Supabase existentes. Entrega real de e-mails e redirecionamentos autorizados ainda requer verificação operacional; nenhuma configuração do Supabase foi modificada.
