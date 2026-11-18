# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Lucas Lessa (autor, estudante de medicina na UNIFASE/FMP, 8º período) e colegas da mesma turma. Situação: estudo para as provas P1 e P2 de Clínica Médica II e para a prova de Cirurgia, muitas vezes em sessões curtas no celular ou iPad, à noite ou entre plantões. Trabalho a fazer: revisar aulas, resolver questões no estilo da banca, treinar casos clínicos, acompanhar lacunas e revisar erros.

## Product Purpose

Plataforma pessoal e fechada (login via Supabase) para estudar só por ela e chegar preparado para as provas e para a prática. Inclui aulas detalhadas P1/P2, banco de questões N1/N2/N3, simulado, discursivas, casos clínicos mutantes, flashcards, caderno de erros, cursos de POCUS e ECG com imagens reais, módulo de Cirurgia e Radar da Banca. Sucesso: o estudante consegue estudar inteiramente pelo site, sabe o que priorizar e vê seu progresso.

## Positioning

Engenharia reversa da banca da FMP: ordem dos temas, pesos e estilo de questão calibrados para esta prova específica, não um banco genérico. Conteúdo com proveniência classificada (material direto, relato do Notion, simulação autoral).

## Operating Context

Site estático publicado no GitHub Pages via GitHub Actions; build Vite/esbuild preservando os scripts clássicos; HTML/CSS/JS com dados em arquivos .js. Autenticação e sincronização de progresso via Supabase; progresso também salvo no dispositivo. Testes Playwright em `tests/` e validadores Python em `scripts/`. Uso frequente em 320 a 390 px, iPad e desktop, modos claro, escuro e alto contraste.

## Capabilities and Constraints

- Conteúdo visível a qualquer usuário logado; os arquivos estáticos são públicos.
- Imagens clínicas (POCUS, RX) devem ser reais, com legenda, referência e alt text; nada gerado por IA.
- Nomes de empresas de cursinho não aparecem; só referências bibliográficas.
- POCUS em aba própria e destacada no menu.
- Prioridade adaptativa é heurística declarada, não previsão de incidência.
- Sem prescrição de condutas: ferramenta de estudo, não substitui supervisão clínica.
- Alterações sempre por patch cirúrgico, preservando rotas, IDs e progressKeys existentes.
- Planejado: assistente de IA gratuito que consulta o conteúdo do site e dá dicas de estudo.

## Brand Commitments

Nome público: Estudo Master. Autor: Lucas Lessa. Idioma: PT-BR. Voz: direta, clínica, sem marketing. Direção visual aprovada: Editorial contemporâneo — marfim, verde profundo, cobre, Source Serif 4 nos títulos e Public Sans na interface. A camada compartilhada é `editorial.css`; a base de interação e acessibilidade de `tokens.css` e `hig.css` continua válida. Ver `docs/EDITORIAL_CONTEMPORANEO.md`.

## Evidence on Hand

Aulas, questões, flashcards (CSV), casos e cursos no diretório `MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa/`. Capturas da interface em `assets/`. Manifesto de mídia em `assets/media-manifest.json`. Não há depoimentos, métricas de uso nem avaliação docente; não inventar.

## Product Principles

1. Estudar só pelo site deve bastar para a prova.
2. Precisão e restrição visual: nada distrai da leitura e da questão.
3. Proveniência explícita de todo conteúdo.
4. Funciona bem no celular, offline-tolerante, acessível em alto contraste.
5. Cada mudança preserva o que já funciona.

## Accessibility & Inclusion

Alvo WCAG 2.1 AA; modos claro, escuro e alto contraste já existentes; navegação por teclado e leitores de tela exigidos nos testes.
