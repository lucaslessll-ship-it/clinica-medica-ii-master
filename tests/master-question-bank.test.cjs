const {test} = require('node:test');
const assert = require('node:assert/strict');
const {createServer} = require('node:http');
const {readFile} = require('node:fs/promises');
const {join, resolve, sep} = require('node:path');
const {chromium} = require('playwright');
const {exportLegacy} = require('../question-bank/export-legacy.cjs');

const app = 'MASTER_Clinica_Medica_II_v7_GitHub_Completo_Lucas_Lessa';

function authFixture() {
  const user = {id: 'question-bank-test', email: 'fixture@example.test', user_metadata: {master_welcome_tour_v1: true}};
  const question = {
    id: '10000000-0000-4000-8000-000000000001',
    stem: 'Enunciado sintético do teste', period: 'P2', difficulty: 'N2', origin: 'autoral_master',
    theme: 'neuro1', subtheme: 'fixture', favorite: false,
    options: [{id: 'A', text: 'Alternativa A'}, {id: 'B', text: 'Alternativa B'}],
  };
  const result = {
    id: question.id, correct: true, answer: 'B', comment: 'Comentário geral de teste',
    options: [{...question.options[0], comment: 'Comentário da A'}, {...question.options[1], comment: 'Comentário da B'}],
    bibliography: ['Referência de teste'],
  };
  const essay = {...question, id: '10000000-0000-4000-8000-000000000002',
    stem: 'Discursiva de teste', options: [], discursive: true, origin: 'banco_cm2'};
  const model = {id: essay.id, correct: null, model_answer: 'Modelo discursivo de teste',
    comment: 'Comentário discursivo', bibliography: []};
  localStorage.setItem('master_auth_local_owner', user.id);
  localStorage.setItem('master_dicas_v1', JSON.stringify({desligado: true, focoUsado: true}));
  localStorage.setItem('master_p2_lucas_v1', JSON.stringify({results: {0: {correct: true, answer: 0}}}));
  window.qbTestCalls = [];
  window.supabase = {createClient: () => ({
    auth: {
      getSession: async () => ({data: {session: {user, access_token: 'fixture'}}}),
      getUser: async () => ({data: {user}}),
      updateUser: async () => ({data: {user}}),
      onAuthStateChange: () => ({data: {subscription: {unsubscribe() {}}}}),
    },
    from() {
      const query = {
        select: () => query, order: () => query, eq: () => query, contains: () => query,
        range: async () => ({data: []}), maybeSingle: async () => ({data: {policy_version: '2026-11-08'}}),
        upsert: async () => ({}), then: resolve => resolve({data: []}),
      };
      return query;
    },
    async rpc(name, args) {
      window.qbTestCalls.push({name, args});
      if (name === 'master_qb_record_batch') return {data: args.answers.map(item => item.qid === essay.id ? model : result)};
      if (name === 'master_qb_record') return {data: result};
      if (name !== 'master_qb_catalog') return {data: {}};
      return {data: {total: 1, attempts: 0, hits: 0, themes: ['neuro1'], subthemes: ['fixture'],
        items: args.take ? [args.filters?.format === "discursive" ? essay : question] : []}};
    },
  })};
}

test('exportação mantém os índices e gabaritos legados para curadoria', () => {
  const rows = exportLegacy();
  assert.ok(rows.some(row => row.period === 'P1'));
  assert.ok(rows.some(row => row.period === 'P2'));
  assert.equal(new Set(rows.map(row => row.legacy_key)).size, rows.length);
  assert.ok(rows.every(row => row.origin === 'autoral_master' &&
    row.medical_status === 'pendente' && row.rights_status === 'pendente' &&
    row.options.some(option => option.id === row.original_answer)));
});

test('banco, filtros, aula, simulado e progresso legado em três tamanhos', {timeout: 90000}, async () => {
  const root = resolve('.');
  const server = createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://local').pathname);
      const file = resolve(join(root, pathname));
      if (!file.startsWith(root + sep)) throw Error('Invalid path');
      res.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' :
        file.endsWith('.css') ? 'text/css' : 'text/html');
      res.end(await readFile(file));
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium'});
    for (const viewport of [{width: 390, height: 844}, {width: 768, height: 1024}, {width: 1440, height: 900}]) {
      const page = await browser.newPage({viewport, reducedMotion: 'reduce'});
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('https://cdn.jsdelivr.net/**/supabase.min.js', route => route.fulfill({
        contentType: 'text/javascript', body: '(' + authFixture.toString() + ')()',
      }));
      await page.goto('http://127.0.0.1:' + server.address().port + '/' + app + '/index.html#qb-exam');
      await page.waitForFunction(() => document.getElementById('master-auth')?.hidden);
      await page.getByText('1 questão disponível', {exact: true}).waitFor();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.getByLabel('Período', {exact: true}).selectOption('P2');
      await page.getByText('1 questão disponível', {exact: true}).waitFor();
      await page.getByLabel('Dificuldade', {exact: true}).selectOption('N2');
      await page.getByText('1 questão disponível', {exact: true}).waitFor();
      await page.getByRole('button', {name: 'Iniciar sessão'}).click();
      await page.getByRole('button', {name: /Alternativa B/}).click();
      assert.equal(await page.getByText('Comentário geral de teste').count(), 0);
      await page.getByRole('button', {name: 'Entregar simulado'}).click();
      await page.getByText('1 acerto', {exact: true}).waitFor();
      await page.locator('.qb-player summary').click();
      await page.getByText(/\(correta\).*Comentário da B/).waitFor();
      const calls = await page.evaluate(() => window.qbTestCalls);
      assert.ok(calls.some(call => call.args?.filters?.period === 'P2' && call.args?.filters?.difficulty === 'N2'));
      assert.equal(calls.find(call => call.name === 'master_qb_record_batch').args.answers[0].choice, 'B');
      await page.evaluate(() => navigate('topic', 'neuro1'));
      await page.getByText('1 questão disponível para esta aula').waitFor();
      assert.ok(await page.evaluate(() => window.qbTestCalls.some(call => call.args?.filters?.lesson === 'neuro1_0')));
      assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('master_p2_lucas_v1')).results[0].correct), true);
      if (viewport.width === 1440) {
        const lesson = page.locator('[data-qb-lesson="neuro1_0"]');
        await lesson.getByLabel('Origem', {exact: true}).selectOption('bancos_e_provas');
        await lesson.getByLabel('Modalidade', {exact: true}).selectOption('timed');
        await lesson.getByText('1 questão disponível para esta aula').waitFor();
        await lesson.getByRole('button', {name: 'Iniciar sessão'}).click();
        await lesson.getByRole('button', {name: 'Entregar simulado'}).waitFor();
        await lesson.getByRole('button', {name: 'Entregar simulado'}).click();
        await lesson.getByRole('button', {name: 'Voltar aos filtros'}).click();
        await lesson.getByLabel('Formato da questão', {exact: true}).selectOption('discursive');
        await lesson.getByText('Discursiva de teste', {exact: true}).waitFor();
        await lesson.getByRole('button', {name: 'Iniciar sessão'}).click();
        await lesson.getByRole('textbox', {name: 'Sua resposta discursiva'}).fill('Rascunho privado');
        assert.equal(await lesson.getByText('Modelo discursivo de teste').count(), 0);
        await lesson.getByRole('button', {name: 'Entregar simulado'}).click();
        await lesson.locator('.qb-player summary').click();
        await lesson.getByText('Modelo discursivo de teste').waitFor();
        await lesson.getByText('Rascunho privado').waitFor();
        assert.ok(await page.evaluate(() => window.qbTestCalls.some(call =>
          call.args?.answers?.some(item => item.choice === 'discursive'))));
        assert.ok(await page.evaluate(() => window.qbTestCalls.some(call =>
          call.args?.filters?.lesson === 'neuro1_0' &&
          call.args.filters.origin === 'bancos_e_provas' && call.args.filters.random)));
        await page.evaluate(() => navigate('p1practice'));
        await page.locator('.topic-grid').getByRole('button', {name: /Diabetes em situações especiais/}).click();
        await page.locator('.p1-question').waitFor();
        assert.match(await page.locator('#main-content h1').textContent(), /1 de 3/);

        await page.evaluate(() => startPractice('neuro1'));
        await page.locator('.question-stem').waitFor();
        assert.deepEqual(await page.evaluate(() =>
          ui.practice.ids.map(id => QUESTION_BANK[id].level).sort()), [1, 2, 3]);
      }
      assert.deepEqual(errors, []);
      await page.close();
    }
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
});
