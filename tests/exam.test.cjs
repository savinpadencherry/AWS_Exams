const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');

function setup(random = Math.random) {
  let time = 1000000;
  const values = new Map();
  const storage = { getItem: k => (values.has(k) ? values.get(k) : null), setItem: (k, v) => values.set(k, v), removeItem: k => values.delete(k) };
  const context = { window: { localStorage: storage }, Date, Math, Map, Set, console };
  vm.createContext(context);
  const files = ['js/blueprint.js', ...fs.readdirSync(path.join(root, 'js/study')).map(f => 'js/study/' + f), 'js/services.js', 'js/plan.js',
    ...fs.readdirSync(path.join(root, 'js/data')).filter(f => f.endsWith('.js')).sort().map(f => 'js/data/' + f), 'js/exam-engine.js'];
  for (const p of files) vm.runInContext(fs.readFileSync(path.join(root, p), 'utf8'), context);
  return { engine: new context.window.ExamEngine(storage, () => time, random), context, storage, advance: n => (time += n), W: context.window };
}

test('blueprint matches the official AIP-C01 structure and weights', () => {
  const { W } = setup(); const B = W.BLUEPRINT;
  assert.equal(B.domains.length, 5);
  assert.deepEqual(Array.from(B.domains.map(d => d.weight)), [31, 26, 20, 12, 11]);
  assert.equal(B.domains.reduce((n, d) => n + d.weight, 0), 100);
  assert.deepEqual(Array.from(B.domains.map(d => d.tasks.length)), [6, 5, 4, 3, 2]);
  assert.equal(Object.keys(B.taskIndex).length, 20);
  assert.equal(B.mockCounts.reduce((a, b) => a + b, 0), 75);
  assert.equal(B.exam.minutes, 180); assert.equal(B.exam.passScaled, 750);
  assert.equal(B.exam.scored + B.exam.unscored, B.exam.total);
  assert.ok(Object.keys(B.skillIndex).length >= 80);
});

test('every task has a study module with concepts, patterns and https references', () => {
  const { W } = setup();
  for (const id of [...Object.keys(W.BLUEPRINT.taskIndex), 'strategy']) {
    const m = W.STUDY[id]; assert.ok(m, id);
    for (const f of ['goal', 'big']) assert.equal(typeof m[f], 'string', id + f);
    assert.ok(m.concepts.length >= 3, id); assert.ok(m.patterns.length >= 3, id); assert.ok(m.flow.steps.length >= 4, id);
    for (const t of m.tables || []) for (const r of t.rows) assert.equal(r.length, t.head.length, id + t.title);
    for (const [, url] of m.refs || []) assert.match(url, /^https:\/\//);
  }
});

test('question bank is structurally valid and mapped to the blueprint', () => {
  const { W } = setup(); const B = W.BLUEPRINT, ids = new Set();
  assert.ok(W.QBANK.length >= 300);
  for (const q of W.QBANK) {
    assert.ok(!ids.has(q.id), 'duplicate ' + q.id); ids.add(q.id);
    assert.equal(B.taskIndex[q.t]?.domain, q.d, q.id);
    assert.equal(B.skillIndex[q.s]?.task, q.t, q.id + ' skill/task');
    assert.ok(['single', 'multiple'].includes(q.type), q.id);
    for (const f of ['sc', 'q', 'e']) assert.ok(typeof q[f] === 'string' && q[f].length > 10, q.id + f);
    assert.equal(q.w.length, q.o.length, q.id); assert.ok(q.w.every(x => typeof x === 'string' && x.length > 5), q.id);
    assert.equal(new Set(q.o).size, q.o.length, q.id + ' duplicate options');
    assert.ok(q.a.every(i => Number.isInteger(i) && i >= 0 && i < q.o.length), q.id);
    assert.equal(new Set(q.a).size, q.a.length, q.id);
    if (q.type === 'single') { assert.equal(q.o.length, 4, q.id); assert.equal(q.a.length, 1, q.id); }
    else { assert.ok(q.o.length >= 5 && q.a.length >= 2 && q.a.length < q.o.length, q.id); }
  }
});

test('bank covers every domain and task in blueprint proportion and has multiple-response items', () => {
  const { W } = setup(); const B = W.BLUEPRINT;
  B.domains.forEach((d, i) => assert.ok(W.QBANK.filter(q => q.d === d.id).length >= B.mockCounts[i] * 4, 'domain ' + d.id));
  for (const t of Object.keys(B.taskIndex)) assert.ok(W.QBANK.filter(q => q.t === t).length >= 10, 'task ' + t);
  const multi = W.QBANK.filter(q => q.type === 'multiple').length;
  assert.ok(multi / W.QBANK.length > 0.08 && multi / W.QBANK.length < 0.3);
});

test('four non-overlapping 75-question mocks follow the blueprint weighting', () => {
  const { engine: e, W } = setup(); assert.ok(e.mockCount() >= 4);
  const seen = new Set();
  for (let n = 1; n <= 4; n++) {
    const ids = e.mockIds(n); assert.equal(ids.length, 75); assert.equal(new Set(ids).size, 75);
    assert.deepEqual([1, 2, 3, 4, 5].map(d => ids.filter(id => e.byId.get(id).d === d).length), Array.from(W.BLUEPRINT.mockCounts));
    for (const id of ids) { assert.ok(!seen.has(id), 'overlap ' + id); seen.add(id); }
  }
});

test('timed mock lasts 180 minutes, persists and auto-submits after expiry', () => {
  const s = setup(), e = s.engine;
  assert.equal(e.start({ kind: 'mock', label: 'Mock 1', ids: e.mockIds(1), mode: 'exam' }), true);
  assert.equal(e.state.ids.length, 75); assert.equal(e.state.minutes, 180); assert.equal(e.remaining(), 180 * 60);
  s.advance(180 * 60000 - 1000); assert.equal(e.remaining(), 1); e.save();
  const f = new s.context.window.ExamEngine(s.storage, () => 1000000 + 180 * 60000 + 5000);
  assert.equal(f.restore(), true); assert.equal(f.state.submitted, true); assert.equal(f.history.length, 1); f.submit(); assert.equal(f.history.length, 1);
});

test('learning mode requires an explicit check, locks the first answer and records mastery', () => {
  const { engine: e } = setup();
  const sq = e.bank.find(x => x.type === 'single' && x.t === '1.2');
  e.start({ kind: 'drill', label: 'd', ids: [sq.id], mode: 'learning' });
  const q = e.question(), wrong = q.o.findIndex((_, i) => !q.a.includes(i));
  assert.equal(e.remaining(), null);
  e.select(wrong); assert.equal(e.state.revealed[q.id], undefined);
  assert.equal(e.check(), true); assert.equal(e.qstats[q.id].last, 0); assert.ok(e.mistakeIds().includes(q.id));
  e.select(q.a[0]); assert.equal(e.state.answers[q.id][0], wrong); assert.equal(e.score().correct, 0);
});

test('multiple response needs the exact set, caps selections and never gives partial credit', () => {
  const { engine: e } = setup(); const q = e.bank.find(q => q.type === 'multiple');
  e.start({ kind: 'drill', label: 'd', ids: [q.id], mode: 'learning' });
  e.select(q.a[0]); assert.equal(e.check(), false);
  for (let i = 0; i < q.o.length; i++) e.select(i);
  assert.equal(e.state.answers[q.id].length, q.a.length);
  assert.equal(e.correct(q, [q.a[0]]), false); assert.equal(e.correct(q, [...q.a].reverse()), true);
  const extra = q.o.map((_, i) => i).find(i => !q.a.includes(i)); assert.equal(e.correct(q, [...q.a.slice(1), extra]), false);
});

test('scores are raw with domain, task and skill breakdowns and a blueprint-weighted heuristic', () => {
  const { engine: e } = setup(); e.start({ kind: 'mock', label: 'M', ids: e.mockIds(2), mode: 'exam' });
  e.questions().forEach(q => (e.state.answers[q.id] = [...q.a]));
  let r = e.score(); assert.equal(r.percent, 100); assert.equal(e.weightedPercent(r), 100); assert.equal(r.scaledScore, undefined);
  assert.equal(Object.keys(r.byDomain).length, 5);
  const q0 = e.question(); e.state.answers[q0.id] = []; r = e.score(); assert.equal(r.correct, 74);
  assert.ok(e.weightedPercent(r) < 100);
});

test('results are immutable after submit, history capped, and retries clear the queue', () => {
  const s = setup(), e = s.engine; const ids = [e.bank.find(x => x.type === 'single' && x.t === '2.1').id];
  e.start({ kind: 'drill', label: 'd', ids, mode: 'learning' });
  const q = e.question(); e.select(q.o.findIndex((_, i) => !q.a.includes(i))); e.check(); e.submit();
  const pct = e.score().percent; e.select(q.a[0]); assert.equal(e.score().percent, pct);
  assert.ok(e.mistakeIds().includes(q.id));
  e.start({ kind: 'mistakes', label: 'r', ids: [q.id], mode: 'learning' });
  q.a.forEach(i => e.select(i)); e.check(); assert.ok(!e.mistakeIds().includes(q.id));
});

test('unchecked learning questions count as unattempted when the attempt is submitted', () => {
  const { engine: e } = setup(); e.start({ kind: 'drill', label: 'd', ids: e.drillIds({ domain: 3, count: 4 }), mode: 'learning' });
  const q = e.question(); e.select(q.a[0]); e.submit(); assert.equal(e.score().correct, 0);
});

test('selection helpers favour unseen and missed questions and respect filters', () => {
  const { engine: e } = setup(() => 0.5);
  const ids = e.smartIds(25); assert.equal(ids.length, 25); assert.equal(new Set(ids).size, 25);
  for (const d of [1, 2, 3, 4, 5]) assert.ok(ids.some(id => e.byId.get(id).d === d), 'domain ' + d);
  const t = e.drillIds({ task: '5.2', count: 12 }); assert.equal(t.length, 12); assert.ok(t.every(id => e.byId.get(id).t === '5.2'));
  const sk = e.drillIds({ skill: '2.1.7', count: 99 }); assert.ok(sk.every(id => e.byId.get(id).s === '2.1.7'));
  const seen = e.bank.slice(0, 40); seen.forEach(q => (e.qstats[q.id] = { n: 1, c: 1, last: 1 }));
  assert.ok(e.weight(e.bank[100]) > e.weight(seen[0]));
  e.qstats[seen[0].id].last = 0; assert.ok(e.weight(seen[0]) > e.weight(e.bank[100]));
});

test('invalid input, corrupt and stale sessions fail safely; option permutations survive resume', () => {
  const s = setup(), e = s.engine;
  e.start({ kind: 'mock', label: 'M', ids: e.mockIds(3), mode: 'exam' });
  e.select(200); assert.equal(e.state.answers[e.question().id], undefined);
  for (const q of e.questions()) assert.deepEqual(Array.from(e.state.optionOrder[q.id]).sort(), Array.from(q.o, (_, i) => i).sort());
  const before = JSON.stringify(e.state.optionOrder); assert.equal(e.restore(), true); assert.equal(JSON.stringify(e.state.optionOrder), before);
  s.storage.setItem('aip-session', '{bad'); assert.equal(e.restore(), false);
  s.storage.setItem('aip-session', JSON.stringify({ version: 1 })); assert.equal(e.restore(), false);
});

test('services glossary and plan cover the in-scope list and exam week', () => {
  const { W } = setup();
  assert.ok(W.SERVICES.length >= 100); assert.ok(W.SERVICES.every(s => s.length === 4 && s[0] && s[1] && s[2]));
  for (const name of ['Amazon Bedrock AgentCore', 'AWS AppConfig', 'Amazon OpenSearch Service', 'AWS Step Functions', 'Amazon Macie', 'Kiro']) assert.ok(W.SERVICES.some(s => s[0] === name), name);
  assert.equal(W.PLAN.length, 8);
});
