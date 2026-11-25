const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const directory = path.resolve(__dirname, '../MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa');

function exportLegacy() {
  const context = vm.createContext({window: {}});
  for (const file of ['questions.js', 'banca_questions.js', 'p1_questions.js', 'topic-training-questions.js']) {
    vm.runInContext(fs.readFileSync(path.join(directory, file), 'utf8'), context, {filename: file});
  }
  return ['P1', 'P2'].flatMap(period => {
    const source = context.window[period === 'P1' ? 'MASTER_P1_QUESTIONS' : 'MASTER_QUESTIONS'];
    return Array.from(source, (q, index) => ({
      discipline: 'clinica_medica',
      period,
      theme: q.t,
      lesson_ids: [q.t],
      stem: q.q,
      options: Array.from(q.o, (text, i) => ({id: String.fromCharCode(65 + i), text})),
      original_answer: q.a >= 0 && q.a < q.o.length ? String.fromCharCode(65 + q.a) : '',
      comment: q.why,
      origin: 'autoral_master',
      profiles: q.profile ? [q.profile] : [],
      difficulty: 'N' + q.level,
      bibliography: [],
      medical_status: 'pendente',
      rights_status: 'pendente',
      revision_history: [],
      legacy_key: period.toLowerCase() + ':' + index,
    }));
  });
}
if (require.main === module) {
  for (const question of exportLegacy()) process.stdout.write(JSON.stringify(question) + '\n');
}
module.exports = {exportLegacy};
