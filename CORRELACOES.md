# Correlações entre conteúdos

Regra do projeto para ligar um conteúdo ao outro dentro do MASTER. Vale para mim, para o
GPT e para qualquer sessão futura. Quem escreve conteúdo novo segue este arquivo; quem
revisa cobra este arquivo.

## 1. O problema que isso resolve

O site tem 547 blocos de aula em três frentes que hoje não se falam: as aulas clínicas e
cirúrgicas (P1, P2 e Cirurgia), os cursos de exame (ECG, Radiologia, POCUS, Hemograma) e o
curso de antibióticos. O aluno lê "FAST positivo" em trauma abdominal sem saber que existe
um módulo inteiro de POCUS sobre as quatro janelas, e estuda o módulo de hipercalemia no
ECG sem lembrar que a aula de emergências onco-hematológicas trata da lise tumoral que a
causa. A correlação não é enfeite: é o que transforma módulos paralelos em um só raciocínio.

## 2. Princípio: dono único

Cada conceito tem **uma** aula dona, a que ensina esse conceito a fundo. Todo link desse
conceito, venha de onde vier, aponta para a aula dona. Consequências práticas:

- A aula dona nunca linka o próprio termo. Quem já está lá não precisa de atalho para lá.
- Não existe link recíproco automático. Se A aponta para B, B não aponta de volta para A
  pelo mesmo termo, senão vira círculo.
- Se dois lugares parecem donos, o desempate está na regra 3.

## 3. Quem é dono do quê

| Domínio | Dono | O que ele ensina |
|---|---|---|
| Achado no traçado | curso de ECG | morfologia, critério, medida |
| Achado na imagem | curso de Radiologia | o que aparece no RX e na TC, e por quê |
| Achado à beira do leito | curso de POCUS | janela, técnica, interpretação ao vivo |
| Achado no sangue | curso de Hemograma | índice, morfologia, significado |
| Escolha e esquema de antibiótico | curso de ATB | espectro, dose, duração |
| Doença, conduta e decisão | aula de P1, P2 ou Cirurgia | quadro, diagnóstico, tratamento |

**Desempate.** O dono é quem ensina o **eixo do termo**, não quem cita mais vezes.
"Neutropenia" é achado de hemograma, dono é `hemo_m8`. "Neutropenia febril" é decisão de
antibiótico, dono é `atb_m11`. "Fibrilação atrial" como achado no traçado é `ecg_m13`; como
doença a ser anticoagulada é `p1arr_0`. Quando o mesmo nome tem dois eixos, são duas
entradas com termos distintos, nunca uma entrada ambígua.

## 4. As três vias

1. **Clínica para exame.** A mais comum. O texto cita o achado e o curso mostra como vê-lo.
   De `ciraa_5` para `rad_m5` em pneumoperitônio.
2. **Exame para clínica.** O curso cita a causa e a aula clínica trata dela.
   De `ecg_m15` para `onco_1` em lise tumoral.
3. **Exame para exame.** Raro e valioso.
   De `pocus_m12` para `cirvasc_3` em trombose venosa profunda.

## 5. O que pode virar âncora

Pode: termo que nomeia um conceito ensinável e específico. Pneumoperitônio, linhas B,
índice de Morris, Sokolow-Lyon, esquizócito, torsades de pointes, sinal do alvo.

Não pode: palavra genérica de método ou de uso corrente no texto. Tomografia aparece 123
vezes em Cirurgia, contraste 66, ultrassom 52. Linkar isso não ensina nada e enche a tela.
Se o termo não cabe numa frase do tipo "o curso X ensina a reconhecer Y", ele não é âncora.

Também não cabe âncora inline quando o termo **é o assunto da própria aula**. Numa aula
sobre colangite, a palavra colangite não vira link; a correlação com o esquema antibiótico
entra no bloco de rodapé da regra 7.

## 6. Zonas proibidas

Nunca inserir link dentro de:

- títulos e subtítulos;
- enunciado, alternativas e justificativa de questão;
- pergunta e resposta de caso clínico, porque entrega o raciocínio antes da hora;
- legenda e marcação de imagem;
- tabela de dose, posologia e cálculo;
- texto de alerta clínico ("pitfalls"), que precisa ser lido inteiro sem desvio.

Sobra o corpo das seções, que é onde a leitura é contínua e a dúvida aparece.

## 7. Densidade

- Só a **primeira** ocorrência de cada termo por aula.
- Máximo **6** links por aula e **2** por seção.
- Quando a aula estourar o limite, cortam-se os de menor valor, não se divide a aula.
- Além dos links inline, cada aula com ao menos uma correlação ganha o bloco **"Este tema se
  conecta com"** no rodapé, agrupado por aula dona, com no máximo 5 grupos. É ali que entram
  as correlações sem palavra óbvia para ancorar.

## 8. Formato da entrada

Uma entrada por conceito, em `correlacoes-data.js`:

```js
{t:'pneumoperitônio', v:['ar livre','ar subdiafragmático'], d:'rad_m5',
 o:'Ar na cavidade peritoneal, que no RX em ortostase aparece como crescente sob a cúpula.',
 p:'O curso mostra onde procurar e o que fazer quando o paciente não consegue ficar de pé.'}
```

- `t` termo canônico, como será exibido.
- `v` variantes aceitas. Casamento por palavra inteira, sem acento e sem diferenciar
  maiúsculas, nunca dentro de outra palavra.
- `s` siglas, casadas só em caixa alta. É o lugar de BAV, BRD, BRE, QTc, VCM e RDW: em
  minúsculas uma sigla de três letras pegaria palavra comum.
- `d` aula dona, pelo identificador do `ai-index.json`.
- `o` o que é, uma frase, até 140 caracteres.
- `p` por que abrir, uma frase, dita em função do leitor que está na outra aula.

## 9. Como o cartão aparece

O termo recebe sublinhado pontilhado discreto, não cor de link. Ao tocar, abre um cartão com
`o`, `p` e um botão "Abrir aula". O aluno resolve a dúvida sem sair da leitura e só navega se
quiser. No celular, tirar o leitor da aula e obrigá-lo a voltar é o erro mais caro.

O interruptor fica no próprio bloco do rodapé e desliga apenas as marcações no texto. O
bloco continua, porque é o ponto de religar e o índice das conexões da aula. A preferência
vale para as próximas leituras.

## 10. Validação automática

`scripts/validar-correlacoes.cjs` roda no mesmo workflow dos outros validadores e falha se:

- o destino `d` não existir no `ai-index.json`;
- dois termos diferentes apontarem para o mesmo eixo com sentidos conflitantes;
- um termo tiver mais de um dono;
- um termo constar da lista de genéricos proibidos;
- a simulação sobre o `ai-index.json` indicar aula acima de 6 links ou seção acima de 2;
- uma entrada estiver sem `o` ou sem `p`, ou com frase acima do limite;
- uma sigla do campo `s` não estiver em caixa alta.

A simulação é o ponto importante: o número de links que cairia em cada aula é calculado em
build-time, antes de ir para o navegador. É isso que impede a bagunça crescer sozinha.

## 11. O prompt

Para qualquer sessão que vá escrever ou revisar conteúdo:

> Siga CORRELACOES.md. Ao escrever conteúdo novo, não insira links à mão: proponha entradas
> para `correlacoes-data.js` no formato da regra 8, respeitando dono único, zonas proibidas e
> densidade. Rode `node scripts/validar-correlacoes.cjs` antes de abrir PR.

## Anexo A: glossário da fase 1

Quarenta conceitos de maior valor, priorizando o que liga Cirurgia aos cursos de exame. A
coluna "origem" indica onde o termo de fato aparece hoje no texto, conferido contra o
`ai-index.json`.

| Termo | Dono | Origem esperada |
|---|---|---|
| pneumoperitônio, ar livre | `rad_m5` | abdome agudo perfurativo, trauma |
| níveis hidroaéreos | `rad_m5` | abdome agudo obstrutivo |
| sinal do alvo, pseudo-rim | `rad_m10` | invaginação, abdome agudo pediátrico |
| contraste hidrossolúvel | `rad_m10` | perfuração, pós-operatório |
| coluna cervical, linhas de alinhamento | `rad_m8` | trauma |
| apendicite na tomografia | `rad_m6` | apendicite aguda |
| massa pulmonar, nódulo solitário | `rad_m4` | oncologia, achado incidental |
| derrame pleural na radiografia | `rad_m3` | trauma torácico, pneumonia |
| linha iliofemoral | `rad_m7` | trauma de pelve e quadril |
| FAST, E-FAST | `pocus_m5` | trauma abdominal e torácico |
| veia cava inferior | `pocus_m6` | choque, volemia |
| linhas B | `pocus_m4` | dispneia, congestão |
| pneumotórax no ultrassom | `pocus_m4` | trauma torácico |
| compressão venosa, trombose venosa profunda | `pocus_m12` | doença venosa, embolia |
| aorta abdominal, aneurisma | `pocus_m9` | abdome agudo vascular |
| vesícula no ultrassom, sinal de Murphy ecográfico | `pocus_m10` | colecistite, colelitíase |
| acesso venoso guiado | `pocus_m7` | choque, terapia intensiva |
| septo em D, D-sign | `pocus_m8` | embolia pulmonar, choque |
| fibrilação atrial no traçado | `ecg_m13` | arritmias, pós-operatório |
| flutter atrial | `ecg_m13` | arritmias |
| torsades de pointes | `ecg_m14` | arritmias, drogas |
| taquicardia ventricular | `ecg_m14` | parada, arritmias |
| bloqueio atrioventricular, BAV | `ecg_m12` | bradicardias |
| bloqueio de ramo | `ecg_m8` | arritmias, dor torácica |
| supradesnivelamento de ST | `ecg_m10` | dor torácica, infarto |
| onda Q patológica | `ecg_m7` | infarto prévio |
| Sokolow-Lyon | `ecg_m7` | hipertensão, valvopatia |
| padrão de strain | `ecg_m9` | sobrecarga ventricular |
| intervalo QT corrigido, Bazett | `ecg_m11` | drogas, síncope |
| hipercalemia no ECG, onda T apiculada | `ecg_m15` | renal, lise tumoral |
| baixa voltagem | `ecg_m7` | derrame pericárdico, obesidade |
| esquizócito | `hemo_m6` | microangiopatia, hemólise |
| reticulócitos | `hemo_m3` | anemias |
| VCM, RDW | `hemo_m2` | anemias |
| desvio à esquerda | `hemo_m8` | infecção, abdome agudo |
| trombocitopenia | `hemo_m10` | sepse, hepatopatia |
| pancitopenia | `hemo_m11` | onco-hematologia |
| esfregaço periférico | `hemo_m12` | anemias, leucemias |
| neutropenia febril | `atb_m11` | onco-hematologia |
| profilaxia cirúrgica | `atb_m12` | pré-operatório |
| Clostridioides difficile | `atb_m10` | diarreia pós-antibiótico |
| síndrome de lise tumoral | `onco_1` | ECG de hipercalemia, hemograma |

Fora da fase 1 por falta de matéria-prima no texto atual: termos de Hemograma e ECG que hoje
não aparecem em nenhuma aula clínica. Eles entram quando o conteúdo clínico crescer, ou via
bloco de rodapé, que não depende de palavra âncora.

## 12. Estado da fase 1

Quarenta e duas entradas, 108 termos. A simulação prevê 65 links em 42 aulas, nenhuma acima
do teto. As aulas com mais conexões são as que de fato pedem leitura cruzada: síncope e crise
convulsiva (6), leucemias (5), taquicardia ventricular e torsades (4), trauma e FAST (4),
abdome agudo obstrutivo (3).

Para rodar a validação: `npm run validar:correlacoes`, ou com `--detalhe` para ver o
ranking de aulas e os termos de cada uma.
