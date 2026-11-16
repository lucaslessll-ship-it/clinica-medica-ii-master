# Laboratório Master

O catálogo reúne 20 trilhas com 49 aulas: 23 aulas dos cursos anteriores e 26 aulas novas. Hemograma, renal/equilíbrio e microbiologia continuam em suas rotas e com seus identificadores de progresso originais. Microcitose visual continua disponível em `#labmicrocitose` e no endereço anterior do módulo.

## Percurso

1. Fundamentos dos exames
2. Hemograma e esfregaço
3. Anemias e metabolismo do ferro
4. Hemostasia e coagulação
5. Função renal e albuminúria
6. EAS e sedimento
7. Água e eletrólitos
8. Gasometria e lactato
9. Glicemia, HbA1c e cetonas
10. Lipídios e risco cardiovascular
11. Fígado, vias biliares e pâncreas
12. Proteínas e nutrição
13. Fezes e investigação digestiva
14. Hormônios e metabolismo mineral
15. Inflamação e resposta sistêmica
16. Microbiologia e antibiograma
17. Sorologias e testes moleculares
18. Autoimunidade e complemento
19. Marcadores cardíacos e musculares
20. Líquidos biológicos

Cada novo bloco contém duas aulas, quatro questões e um caso com duas decisões progressivas: 52 questões de aula e 26 decisões de caso. Diagramas, gráficos e laudos são autorais e fictícios, identificados como exemplos. Não foram acrescentadas imagens clínicas sintéticas. As referências oficiais estão vinculadas em cada aula, com limites de interpretação. Revisão docente externa pendente: validação técnica não equivale a revisão médica independente. Não há nova prescrição ou posologia.

## Integração e manutenção

- Conteúdo: `lab-academy-data.js`; navegação e apresentação: `lab-academy.js`; estilos: `lab-academy.css`.
- Rotas: `#labmaster`, `#labmaster/trilha/ID`, `#labmaster/aula/ID`, `#labmaster/casos`, `#labmaster/caso/ID/ETAPA`, `#labmaster/progresso`; atalhos laterais `#labarea-AREA`.
- Progresso novo: `store.study.labAcademy`, no mecanismo existente de armazenamento/sincronização. Nenhuma tabela, credencial ou política do Supabase foi modificada. Os cursos anteriores mantêm seus registros separados.
- Leitura concluída é autodeclarada; acerto exige resposta. As decisões contam respostas únicas, sem atribuir acerto pela abertura de conteúdo. Uma etapa posterior não é liberada sem a resposta anterior.
- Notas limitadas a 1.200 caracteres, escapadas na renderização; gravação protegida pelo limite existente de 950 kB. Nenhum dado de paciente deve ser incluído.
- O carregamento sob demanda do Hemograma é respeitado no build otimizado; falha de rede permite nova tentativa.
- A busca global do site inclui as novas aulas. O índice específico do assistente de IA não foi ampliado nesta entrega.

## Verificação

`tests/lab-academy.test.cjs` percorre as trilhas, novas aulas e casos, testa persistência, segurança das notas, bloqueio de etapas e telas de 320 a 1.440 px. `tests/optimized-site.test.cjs` verifica os mesmos pontos de integração no pacote de produção e audita acessibilidade do catálogo, laudo e caso. As regressões dos laboratórios anteriores acompanham a nova página de entrada.
