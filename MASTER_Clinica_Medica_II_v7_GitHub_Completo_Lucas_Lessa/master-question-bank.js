(() => {
  'use strict';

  const routes = {
    'qb-bank': 'Banco de questões',
    'qb-exam': 'Simulados personalizados',
    'qb-p2': 'Questões · P2',
    'qb-p2-exam': 'Simulado · P2',
    'qb-p1': 'Questões · P1',
    'qb-p1-exam': 'Simulado · P1',
    'qb-errors': 'Revisão dos erros',
    'qb-favorites': 'Favoritos',
    'qb-stats': 'Estatísticas de desempenho',
  };
  const periods = {'qb-p1': 'P1', 'qb-p1-exam': 'P1', 'qb-p2': 'P2', 'qb-p2-exam': 'P2'};
  const historical = {'qb-p1': 'p1practice', 'qb-p1-exam': 'p1exam', 'qb-p2': 'practice', 'qb-p2-exam': 'exam'};
  const profiles = {
    fixacao: 'Fixação', estilo_fmp: 'Estilo FMP', estilo_residencia: 'Estilo residência',
    raciocinio_clinico: 'Raciocínio clínico', diagnostico_diferencial: 'Diagnóstico diferencial',
    interpretacao_exames: 'Interpretação de exames', farmacologia: 'Farmacologia',
    conduta_terapeutica: 'Conduta terapêutica',
  };
  const origins = {
    banco_cm2: 'Banco CM2 reconstruído',
    fmp_oswaldo: 'FMP / Oswaldo — prova real', sao_paulo: 'Provas de São Paulo', enamed: 'ENAMED',
    enare: 'ENARE', outras_residencias: 'Outras provas de residência', autoral_master: 'Autoral Master',
  };
  const modes = {
    practice: 'Treino comentado', timed: 'Simulado cronometrado', focus: 'Super Foco',
    due: 'Revisão espaçada', wrong: 'Revisão de questões erradas', fmp: 'Simulado estilo FMP',
    residency: 'Simulado estilo residência',
  };
  const pageSize = 12;
  let session;
  let ticker;
  let basket;
  let activeOwner;

  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function button(text, action) {
    const element = node('button', text, 'btn');
    element.type = 'button';
    element.addEventListener('click', action);
    return element;
  }

  async function rpc(name, parameters, owner = activeOwner) {
    const auth = window.MASTER_AUTH;
    if (!auth?.user() || auth.user().id !== owner) throw new Error('Entre com sua conta para acessar o banco.');
    const {data, error} = await auth.client().rpc('master_qb_' + name, parameters);
    if (error) throw new Error('Banco indisponível. Tente novamente.');
    return data;
  }

  function catalog(filters, take = pageSize, skip = 0) {
    return rpc('catalog', {filters, take, skip});
  }

  function topicForRoute(route, value) {
    if (!value) return '';
    const period = periods[route];
    const topics = period === 'P1' ? window.MASTER_P1_DATA?.topics : window.MASTER_DATA?.topics;
    return period && (topics?.some(topic => topic.id === value) || (period === 'P2' && value === 'pocus'))
      ? value : '';
  }

  function section(route, lesson, topic) {
    const element = node('section', undefined, 'card pad master-qb');
    element.dataset.qbRoute = route;
    if (lesson) {
      element.dataset.qbLesson = lesson;
      element.id = 'questoes-da-aula';
    }
    if (topicForRoute(route, topic)) element.dataset.qbTopic = topic;
    const heading = node(lesson ? 'h2' : 'h1', lesson ? 'Questões vinculadas à aula' : routes[route]);
    if (lesson) heading.tabIndex = -1;
    element.append(heading);
    return element.outerHTML;
  }

  function jumpToLesson() {
    const section = document.getElementById('questoes-da-aula');
    section?.scrollIntoView({block: 'start'});
    section?.querySelector('h2')?.focus({preventScroll: true});
  }

  function previousLink(route) {
    if (!historical[route]) return null;
    const link = node('a', 'Histórico e sessões anteriores', 'btn ghost');
    link.href = '#' + historical[route];
    return link;
  }

  function updatedLink(route) {
    const entry = Object.keys(historical).find(key => historical[key] === route);
    if (!entry) return '';
    const banner = node('div', undefined, 'card pad qb-history-notice');
    const destination = entry.endsWith('-exam') ? 'Abrir simulados' : 'Abrir banco completo';
    const link = node('a', destination + ' · ' + periods[entry], 'btn primary');
    link.href = '#' + entry;
    banner.append(node('p', 'Histórico e sessões do treino anterior'), link);
    return banner.outerHTML;
  }

  function field(form, key, title, values, initial = '', any = true) {
    const label = node('label', title);
    const input = node(values ? 'select' : 'input');
    input.name = key;
    input.setAttribute('aria-label', title);
    if (values) {
      if (any) input.append(new Option('Qualquer', ''));
      for (const [value, label] of Object.entries(values)) input.append(new Option(label, value));
    }
    input.value = initial;
    label.append(input);
    form.append(label);
    return input;
  }

  function filterSet(form) {
    const filters = Object.fromEntries(Array.from(new FormData(form)).filter(([, value]) => value));
    const mode = filters.mode;
    delete filters.mode;
    delete filters.quantity;
    if (mode === 'due') filters.status = 'due';
    if (mode === 'wrong' || mode === 'focus') filters.performance = mode;
    if (mode === 'fmp') filters.profile = 'estilo_fmp';
    if (mode === 'residency') filters.profile = 'estilo_residencia';
    return filters;
  }

  function scoreText(hits) {
    return hits + (hits === 1 ? ' acerto' : ' acertos');
  }

  function questionTitle(question) {
    return [question.period, question.subtheme || question.theme, question.difficulty,
      question.source_level, origins[question.origin], question.source_style].filter(Boolean).join(' · ');
  }

  function addProvenance(parent, question, includeMetadata = false) {
    if (!includeMetadata && !question.reference && !question.source_mentions) return;
    const source = node('details', undefined, 'qb-source');
    source.append(node('summary', 'Fonte e detalhes'));
    if (includeMetadata) source.append(node('p', questionTitle(question)));
    if (question.reference) source.append(node('p', question.reference));
    if (question.source_mentions) {
      source.append(node('p', 'Provas mencionadas para o tema no PDF — ' + question.source_mentions));
    }
    parent.append(source);
  }

  function feedback(result, options, draft) {
    const block = node('div', undefined, 'qb-feedback');
    block.setAttribute('role', 'status');
    if (result.model_answer) {
      if (draft) block.append(node('strong', 'Sua resposta'), node('p', draft, 'qb-stem'));
      block.append(node('strong', 'Resposta-modelo · autocorreção'), node('p', result.model_answer));
    } else {
      block.append(node('strong', result.correct ? 'Resposta correta' : 'Resposta incorreta'));
    }
    block.append(node('p', result.comment));
    for (const [index, option] of options.entries()) {
      const explanation = result.options.find(item => item.id === option.id);
      const mark = result.answer === option.id ? ' (correta)' : '';
      if (mark || explanation?.comment) block.append(node('p',
        String.fromCharCode(65 + index) + mark + '. ' + (explanation?.comment || option.text)));
    }
    if (result.bibliography.length) block.append(node('p', 'Referências — ' + result.bibliography.join(' · ')));
    return block;
  }

  function player(parent, state, onExit) {
    clearInterval(ticker);
    const holder = node('section', undefined, 'qb-player');
    parent.replaceChildren(holder);
    const status = node('span', undefined, 'qb-clock');
    const error = node('p');
    error.setAttribute('role', 'alert');

    function show() {
      const question = state.items[state.position];
      holder.replaceChildren();
      if (state.finished) {
        holder.append(node('h2', 'Resultado'), node('p', state.results.size + ' respondidas de ' + state.items.length),
          node('p', scoreText(Array.from(state.results.values()).filter(result => result.correct).length)));
        for (const item of state.items) {
          const result = state.results.get(item.id);
          if (!result) continue;
          const detail = node('details');
          detail.append(node('summary', item.stem), feedback(result, item.options, state.drafts.get(item.id)));
          holder.append(detail);
        }
        holder.append(button('Voltar aos filtros', onExit));
        return;
      }
      const progress = node('div', undefined, 'qb-progress');
      progress.append(node('h2', 'Questão ' + (state.position + 1) + ' de ' + state.items.length));
      if (state.timed) progress.append(status);
      holder.append(progress, node('p', question.stem, 'qb-stem qb-stem-primary'));
      const answers = node('div', undefined, 'qb-options');
      for (const [index, option] of question.options.entries()) {
        const choice = button(undefined, () => answer(question, option));
        choice.classList.add('qb-choice');
        choice.dataset.option = option.id;
        choice.append(node('span', String.fromCharCode(65 + index) + '.', 'qb-choice-letter'),
          node('span', option.text));
        choice.setAttribute('aria-pressed', String(state.choices.get(question.id) === option.id));
        const pending = state.submissions.has(question.id) && !state.timed;
        choice.disabled = state.busy || state.results.has(question.id) || state.expired ||
          (pending && state.choices.get(question.id) !== option.id);
        answers.append(choice);
      }
      if (question.discursive && !state.results.has(question.id)) {
        const draft = node('textarea');
        draft.setAttribute('aria-label', 'Sua resposta discursiva');
        draft.rows = 6;
        draft.value = state.drafts.get(question.id) || '';
        draft.disabled = state.busy || state.expired;
        draft.addEventListener('input', () => {
          if (state.expired || (state.timed && Date.now() >= state.deadline)) return;
          state.drafts.set(question.id, draft.value);
          if (state.timed) {
            if (draft.value.trim()) state.choices.set(question.id, 'discursive');
            else state.choices.delete(question.id);
          }
        });
        answers.append(draft);
        if (!state.timed) {
          const reveal = button('Comparar com a resposta-modelo', () => answer(question, {id: 'discursive'}));
          reveal.disabled = state.busy || state.expired;
          answers.append(reveal);
        }
      }
      holder.append(answers, error);
      if (state.results.has(question.id)) holder.append(feedback(state.results.get(question.id), question.options, state.drafts.get(question.id)));
      const controls = node('div', undefined, 'qb-actions');
      if (state.position > 0 && state.timed) controls.append(button('Anterior', () => move(-1)));
      if (state.position + 1 < state.items.length) {
        const next = button('Próxima', () => move(1));
        next.disabled = !state.timed && !state.results.has(question.id);
        controls.append(next);
      }
      const finish = button(state.timed ? 'Entregar simulado' : 'Encerrar treino', submit);
      finish.disabled = state.busy;
      controls.append(finish);
      holder.append(controls);
      addProvenance(holder, question, true);
    }

    function move(step) {
      state.position += step;
      show();
      holder.querySelector('h2').tabIndex = -1;
      holder.querySelector('h2').focus();
    }

    function payload(question, choice) {
      const submission = state.submissions.get(question.id) || crypto.randomUUID();
      state.submissions.set(question.id, submission);
      return {qid: question.id, choice, submission};
    }

    async function answer(question, option) {
      if (state.busy || state.expired) return;
      if (state.timed) {
        if (Date.now() >= state.deadline) {
          await submit();
          return;
        }
        state.choices.set(question.id, option.id);
        for (const element of holder.querySelectorAll('[data-option]')) {
          element.setAttribute('aria-pressed', String(element.dataset.option === option.id));
        }
        return;
      }
      state.busy = true;
      state.choices.set(question.id, option.id);
      error.textContent = '';
      for (const control of holder.querySelectorAll('button')) control.disabled = true;
      try {
        state.results.set(question.id, await rpc('record', payload(question, option.id), state.owner));
      } catch (failure) {
        error.textContent = failure.message + ' Selecione novamente a resposta para reenviar.';
      } finally {
        state.busy = false;
        if (holder.isConnected) show();
      }
    }

    async function submit() {
      if (state.busy || state.finished) return;
      clearInterval(ticker);
      state.expired = true;
      state.busy = true;
      error.textContent = '';
      show();
      try {
        const answers = state.timed ? state.items.filter(item => state.choices.has(item.id))
          .map(item => payload(item, state.choices.get(item.id))) : [];
        if (answers.length) {
          const results = await rpc('record_batch', {answers}, state.owner);
          for (const result of results) state.results.set(result.id, result);
        }
        state.finished = true;
      } catch (failure) {
        error.textContent = failure.message + ' Use Entregar simulado para reenviar.';
      } finally {
        state.busy = false;
        if (holder.isConnected) show();
      }
    }

    function tick() {
      if (!holder.isConnected || state.finished || state.expired) {
        clearInterval(ticker);
        return;
      }
      const seconds = Math.ceil(Math.max(0, state.deadline - Date.now()) / 1000);
      status.textContent = 'Tempo restante ' + Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
      if (!seconds) void submit();
    }
    show();
    if (state.timed) {
      ticker = setInterval(tick, 1000);
      tick();
    }
  }

  function isTimed(mode) {
    return ['timed', 'fmp', 'residency'].includes(mode);
  }

  function createSession(items, mode) {
    const timed = isTimed(mode);
    return {
      items: items.map(item => ({...item, options: seedShuffle(item.options)})),
      owner: activeOwner, timed, deadline: Date.now() + items.length * 120_000, position: 0,
      choices: new Map(), results: new Map(), submissions: new Map(), drafts: new Map(),
    };
  }

  function catalogScreen(root, route) {
    const lesson = root.dataset.qbLesson;
    const period = periods[route];
    const entryTopic = root.dataset.qbTopic;
    const scope = lesson ? {lesson, legacy_topic: lesson.split('_')[0]} : period ? {period} : {};
    const key = [route, lesson, entryTopic].filter(Boolean).join(':');
    if (basket?.key !== key) basket = {key};
    const state = basket;
    const form = node('form', undefined, 'qb-filters');
    const pane = node('div');
    const count = node('p');
    count.setAttribute('role', 'status');
    const listing = node('div', undefined, 'qb-list');
    const initial = state.values || {};
    const selectedTopics = new Set(state.topics || (entryTopic ? [entryTopic] : []));
    const topics = node('details', undefined, 'qb-disclosure qb-topic-picker');
    const topicSummary = node('summary', 'Matérias · Todas');
    const topicList = node('div', undefined, 'qb-topic-list');
    const clearTopics = button('Usar todas as matérias', () => {
      selectedTopics.clear();
      for (const input of topicList.querySelectorAll('input')) input.checked = false;
      refreshSelection();
    });
    clearTopics.classList.add('ghost');
    topics.append(topicSummary, topicList, clearTopics);
    if (!lesson) form.append(topics);

    const essentials = node('div', undefined, 'qb-essentials');
    const examRoute = route.endsWith('-exam');
    const catalogModes = lesson ? modes : Object.fromEntries(Object.entries(modes)
      .filter(([name]) => isTimed(name) === examRoute));
    const mode = field(essentials, 'mode', 'Modalidade', catalogModes,
      initial.mode || (examRoute ? 'timed' : 'practice'), false);
    const quantity = field(essentials, 'quantity', 'Questões', null, initial.quantity || '20');
    Object.assign(quantity, {type: 'number', min: 1, max: 100, required: true});
    form.append(essentials);

    const advanced = node('details', undefined, 'qb-disclosure qb-advanced');
    const advancedFields = node('div', undefined, 'qb-advanced-grid');
    advanced.append(node('summary', 'Mais filtros'), advancedFields);
    if (!period && !lesson) field(advancedFields, 'period', 'Período', {P1: 'P1', P2: 'P2'}, initial.period);
    const subthemes = field(advancedFields, 'subtheme', 'Subtema', {}, initial.subtheme);
    field(advancedFields, 'format', 'Formato da questão', {objective: 'Objetiva', discursive: 'Discursiva'}, initial.format);
    field(advancedFields, 'origin', 'Origem', {bancos_e_provas: 'Bancos e provas', ...origins}, initial.origin);
    field(advancedFields, 'difficulty', 'Dificuldade', {N1: 'N1', N2: 'N2', N3: 'N3'}, initial.difficulty);
    const profile = field(advancedFields, 'profile', 'Perfil pedagógico', profiles, initial.profile);
    const performance = field(advancedFields, 'performance', 'Desempenho',
      {wrong: 'Erros', correct: 'Acertos'}, initial.performance || (route === 'qb-errors' ? 'wrong' : ''));
    const situation = field(advancedFields, 'status', 'Situação',
      {favorites: 'Favoritas', new: 'Não respondidas', due: 'Revisão vencida'},
      initial.status || (route === 'qb-favorites' ? 'favorites' : ''));
    const start = node('button', undefined, 'btn primary');
    start.type = 'submit';
    count.className = 'qb-count';
    const launch = node('div', undefined, 'qb-launch');
    launch.append(count, start);
    form.append(advanced, launch);
    pane.append(form);
    const previous = previousLink(route);
    if (previous) pane.append(previous);
    pane.append(listing);
    root.append(pane);
    const content = node('div');
    root.append(content);
    let offset = state.offset || 0;
    let generation = 0;
    let total = 0;

    function begin(items, selectedMode) {
      session = {key, value: createSession(items, selectedMode)};
      pane.hidden = true;
      player(content, session.value, () => {
        session = null;
        content.replaceChildren();
        pane.hidden = false;
        void load();
      });
    }

    function listItem(item) {
      const article = node('article', undefined, 'qb-list-item');
      article.append(node('p', item.stem, 'qb-stem qb-list-stem'),
        node('p', questionTitle(item), 'qb-list-meta'));
      article.append(button('Treinar questão', () => begin([item], 'practice')));
      const favorite = button(item.favorite ? 'Remover dos favoritos' : 'Favoritar', async () => {
        favorite.disabled = true;
        try {
          await rpc('record', {qid: item.id, favorite_value: !item.favorite});
          if (root.isConnected) await load();
        } catch (failure) {
          count.textContent = failure.message;
          favorite.disabled = false;
        }
      });
      favorite.setAttribute('aria-pressed', String(item.favorite));
      article.append(favorite);
      addProvenance(article, item);
      return article;
    }

    function activeFilters() {
      const themes = Array.from(selectedTopics);
      return {...filterSet(form), ...scope, ...(themes.length ? {themes} : {})};
    }

    function topicLabel(id) {
      const topic = [...(window.MASTER_DATA?.topics || []), ...(window.MASTER_P1_DATA?.topics || [])]
        .find(item => item.id === id);
      return topic?.title || (id === 'pocus' ? 'POCUS' : id);
    }

    function updateTopicSummary() {
      const count = selectedTopics.size;
      topicSummary.textContent = count === 1 ? 'Matérias · ' + topicLabel(selectedTopics.values().next().value)
        : count > 1 ? 'Matérias · ' + count + ' selecionadas' : 'Matérias · Todas';
      clearTopics.hidden = !count;
    }

    function refreshSelection() {
      state.topics = Array.from(selectedTopics);
      updateTopicSummary();
      offset = 0;
      void load();
    }

    function renderTopics(ids) {
      topicList.replaceChildren();
      for (const id of ids.filter(Boolean).sort((a, b) => topicLabel(a).localeCompare(topicLabel(b), 'pt-BR'))) {
        const label = node('label', undefined, 'qb-topic-option');
        const input = node('input');
        input.type = 'checkbox';
        input.checked = selectedTopics.has(id);
        input.addEventListener('change', event => {
          event.stopPropagation();
          if (input.checked) selectedTopics.add(id);
          else selectedTopics.delete(id);
          refreshSelection();
        });
        label.append(input, node('span', topicLabel(id)));
        topicList.append(label);
      }
      updateTopicSummary();
    }

    function fillSubthemes(values, prior) {
      subthemes.replaceChildren(new Option('Qualquer', ''));
      for (const value of values.filter(Boolean).sort((a, b) => a.localeCompare(b, 'pt-BR'))) {
        subthemes.append(new Option(value, value));
      }
      if (values.includes(prior)) subthemes.value = prior;
    }

    async function load(saved) {
      const request = ++generation;
      profile.disabled = ['fmp', 'residency'].includes(mode.value);
      performance.disabled = ['focus', 'wrong'].includes(mode.value);
      situation.disabled = mode.value === 'due';
      start.disabled = true;
      start.textContent = isTimed(mode.value) ? 'Gerar simulado' : 'Iniciar treino';
      count.textContent = 'Consultando questões…';
      try {
        const selected = saved || Object.fromEntries(new FormData(form));
        if (!lesson && !topicList.childElementCount) {
          const available = state.availableTopics || (await catalog(scope, 0)).themes;
          if (!root.isConnected || generation !== request) return;
          state.availableTopics = available;
          renderTopics(available);
        }
        const facets = activeFilters();
        delete facets.subtheme;
        const base = await catalog(facets, selected.subtheme ? 0 : pageSize, offset);
        if (!root.isConnected || generation !== request) return;
        fillSubthemes(base.subthemes, selected.subtheme);
        const data = selected.subtheme
          ? await catalog(activeFilters(), pageSize, offset)
          : base;
        if (!root.isConnected || generation !== request) return;
        if (offset && offset >= data.total) {
          offset = 0;
          return load();
        }
        total = data.total;
        state.offset = offset;
        state.values = Object.fromEntries(Array.from(form.elements).filter(control => control.name)
          .map(control => [control.name, control.value]));
        count.textContent = total + (total === 1 ? ' questão disponível' : ' questões disponíveis') +
          (lesson ? ' para esta aula' : '');
        start.disabled = total === 0;
        listing.replaceChildren(...data.items.map(listItem));
        const controls = node('div', undefined, 'qb-actions');
        if (offset) controls.append(button('Página anterior', () => { offset -= pageSize; void load(); }));
        if (offset + pageSize < total) controls.append(button('Próxima página', () => { offset += pageSize; void load(); }));
        listing.append(controls);
      } catch (failure) {
        if (root.isConnected && generation === request) {
          listing.replaceChildren();
          count.replaceChildren(document.createTextNode(failure.message + ' '),
            button('Tentar novamente', () => load(saved)));
        }
      }
    }

    form.addEventListener('change', event => {
      if (event.target === quantity) return;
      offset = 0;
      void load();
    });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      start.disabled = true;
      const request = generation;
      const selectedMode = mode.value;
      try {
        const limit = Math.min(total, Number(quantity.value), selectedMode === 'focus' ? 5 : 100);
        const data = await catalog({...activeFilters(), random: true}, limit);
        if (!root.isConnected || generation !== request) return;
        if (data.items.length) begin(data.items, selectedMode);
        else await load();
      } catch (failure) {
        if (root.isConnected && generation === request) {
          count.textContent = failure.message;
          start.disabled = false;
        }
      }
    });
    if (session?.key === key) {
      pane.hidden = true;
      player(content, session.value, () => {
        session = null;
        content.replaceChildren();
        pane.hidden = false;
        void load(initial);
      });
    } else void load(initial);
  }

  async function stats(root) {
    const status = node('p', 'Consultando desempenho…');
    status.setAttribute('role', 'status');
    root.append(status);
    try {
      const [overall, p1, p2] = await Promise.all([{}, {period: 'P1'}, {period: 'P2'}].map(filters => catalog(filters, 0)));
      if (root.isConnected) status.replaceChildren(...[overall, p1, p2].map((data, index) => {
        const title = ['Geral', 'P1', 'P2'][index];
        const percent = data.attempts ? Math.round(100 * data.hits / data.attempts) : 0;
        return node('span', title + ' — ' + data.hits + ' acertos em ' + data.attempts + ' tentativas (' + percent + '%)', 'qb-stat');
      }));
    } catch (failure) {
      if (root.isConnected) status.textContent = failure.message;
    }
  }

  function afterRender() {
    const user = window.MASTER_AUTH?.user();
    if (activeOwner !== user?.id) reset();
    activeOwner = user?.id;
    const root = document.querySelector('[data-qb-route]:not([data-qb-mounted])');
    if (!root) return;
    root.dataset.qbMounted = '';
    if (!user) {
      root.append(node('p', 'Entre com sua conta para acessar o banco.'));
      return;
    }
    if (root.dataset.qbRoute === 'qb-stats') void stats(root);
    else catalogScreen(root, root.dataset.qbRoute);
  }

  function reset() {
    clearInterval(ticker);
    session = null;
    basket = null;
    activeOwner = null;
  }
  window.addEventListener('master-auth-ended', reset);
  window.MasterQuestionBank = {routes, section, afterRender, topicForRoute, jumpToLesson, updatedLink};
})();
