# Central de questões e revisão de erros

A rota `#revisao` foi preservada, com acesso em Exercícios → Revisão das erradas e pelos atalhos do painel e dos treinos. A sugestão inicial é um cartão dispensável por dia, sem modal ou interrupção da aula.

## Regra da fila

- Erro: entra na fila de erros imediatamente e vence no próximo dia, à meia-noite local. Pode ser revisado antes dessa data.
- Acerto: encerra a pendência, sem reagendamento automático, inclusive quando houve ajuda declarada. A informação sobre ajuda continua no histórico nativo.
- Novo erro: reabre a pendência para o dia seguinte.
- Respostas em branco não são contadas como tentativas ou erros automáticos.
- Flashcards, evocação e casos progressivos mantêm seus fluxos próprios; a central reúne bancos objetivos e questões de fixação dos cursos.

Filtros: bloco, matéria/módulo, erradas, vencidas, inéditas na versão atual ou todas, além dos erros de uma sessão específica. Uma rodada pode misturar blocos e ter de 1 a 50 questões. As respostas atualizam os resultados originais; não existe um segundo gabarito ou histórico de notas independente.

## Compatibilidade e armazenamento

`QNav` mantém os identificadores dos bancos e questões. `QuestionReview` fornece adaptadores para P2, P1, Cirurgia, POCUS, ECG e as instâncias de CourseKit, incluindo Radiologia, Hemograma, Antimicrobianos e laboratórios. Os módulos carregados sob demanda continuam assim; a central carrega os catálogos e permite repetir uma falha de rede sem apagar progresso.

Erros anteriores são recuperados dos resultados já existentes. Caixas antigas que indicavam acerto encerram sua pendência. Nenhuma sessão antiga é inventada para respostas cuja sessão original não foi registrada.

A agenda usa `qlog` nas preferências existentes. Até 40 sessões ficam em `questionReview.sessions` na mesma preferência sincronizada. Cada sessão registra ID, horário, bloco e a última resposta por questão, incluindo se houve erro em uma tentativa anterior da mesma sessão. A tela permite mostrar as sessões adicionais. Não há tabela nova, mudança de RLS ou acesso administrativo adicional.

A sincronização trata resultado e data da tentativa como um registro único, escolhendo a tentativa mais recente em conflitos concorrentes. Sessões distintas são mescladas por ID; relógios dos aparelhos são a origem dos horários. O encerramento ou troca de conta limpa a rodada ativa em memória. A limpeza de progresso da Clínica também remove suas filas e sessões, preservando dados de P1 e Cirurgia que vivem em chaves separadas.

## Verificações

Testes cobrem erro/acerto/novo erro, data local, ajuda, migração sem sessões fictícias, rodadas mistas, filtros, atualização dos resultados nativos, cursos, histórico da sessão, dispensar a sugestão, encerramento de conta, versão otimizada com catálogos sob demanda, sincronização concorrente e enquadramento em 320, 820 e 1280 px.
