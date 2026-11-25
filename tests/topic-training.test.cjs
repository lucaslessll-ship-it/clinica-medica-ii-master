const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const {createContext, runInContext} = require('node:vm');

const app = join(__dirname, '../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');

test('os blocos por tema têm N1, N2 e N3, dois estilos e índices legados preservados', () => {
  const context = createContext({window: {}});
  const load = file => runInContext(readFileSync(join(app, file), 'utf8'), context);
  for (const file of ['data.js', 'p1_data.js', 'questions.js', 'banca_questions.js', 'p1_questions.js']) load(file);
  const banks = [
    [context.window.MASTER_P1_DATA, context.window.MASTER_P1_QUESTIONS],
    [context.window.MASTER_DATA, context.window.MASTER_QUESTIONS],
  ];
  const originals = banks.map(([, questions]) => JSON.stringify(questions));
  load('topic-training-questions.js');
  const stems = new Set();
  for (const [index, [data, questions]] of banks.entries()) {
    const count = JSON.parse(originals[index]).length;
    assert.equal(JSON.stringify(questions.slice(0, count)), originals[index]);
    const added = questions.slice(count);
    for (const {id} of data.topics) {
      const block = added.filter(question => question.t === id);
      assert.deepEqual([...new Set(block.map(question => question.level))].sort(), [1, 2, 3], id);
      assert.deepEqual([...new Set(block.map(question => question.profile))].sort(),
        ['estilo_fmp', 'estilo_residencia'], id);
    }
    for (const question of added) {
      assert.equal(question.training, true);
      assert.equal(new Set(question.o).size, 4);
      assert.ok(question.o[question.a] && question.why);
      assert.ok(!stems.has(question.q), question.q);
      stems.add(question.q);
      const lengths = question.o.map(option => option.length);
      const distractors = lengths.filter((_, index) => index !== question.a);
      assert.ok(lengths[question.a] <= 1.15 * Math.max(...distractors), question.q);
      assert.ok(lengths[question.a] >= .68 * Math.min(...distractors), question.q);
    }
  }
});
