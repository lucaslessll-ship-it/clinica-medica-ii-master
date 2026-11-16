# Padrão de destaque na leitura

Dois papéis apenas. Mais do que isso vira poluição e o olho para de distinguir
o que importa.

## 1. Termo-chave: `<strong>`

O termo que abre a ideia, geralmente seguido de dois-pontos.

```html
<li><strong>Fenitoína:</strong> dose de ataque 20 mg/kg, risco de hipotensão.</li>
```

Renderiza em verde escuro e peso 650. Vale em `.deep-block`, `.pocus-card-body`,
`.pocus-lead`, `.pocus-sec`, `.course-body`, `.insight`, `.case-step` e
`.lesson-block`, nos três temas.

Use no máximo um por frase. Não use para ênfase retórica ("isso é **muito**
importante"): só para o nome da coisa.

## 2. Valor clínico: automático

Número com unidade, corte ou prazo é marcado sozinho por `destaque.js`, com
uma marca de leitura discreta atrás do texto. Não escreva `<span class="k-dado">`
à mão: basta escrever o valor com a unidade junto.

Reconhecidos: unidades de dose e laboratório (mg, mcg, mL, mg/dL, mEq/L,
mmol/L, ng/mL, UI/L, mmHg, cmH2O, bpm, irpm, %, °C, g, kg, mSv) e tempo
(segundos, minutos, horas, dias, semanas, meses, anos). Faixas funcionam:
`50 a 60 mmHg`, `6 a 8 segundos`, `> 90 mmHg`.

Densidade medida nas aulas: cerca de 6 marcas por mil palavras, perto de uma
por parágrafo.

### O que fica de fora
Metadados e rótulos (`.deep-head`, `.subtle`, `.kicker`, `.page-eyebrow`,
cabeçalho de tabela), links, código e campos de formulário. Para excluir um
trecho, use `data-no-destaque`.

## Ao escrever conteúdo novo
1. Marque o termo-chave com `<strong>`, uma vez, onde ele é definido.
2. Escreva o valor com a unidade colada ao número; o destaque é automático.
3. Não use `<mark>`, `<u>`, caixa alta, cor inline ou negrito em frase inteira.
