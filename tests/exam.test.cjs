const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const root = path.join(__dirname, "..");
function setup() {
  let now = 1000000;
  const store = new Map();
  const storage = {
    getItem: (k) => store.get(k) ?? null,
    setItem: (k, v) => store.set(k, v),
  };
  const ctx = { window: { localStorage: storage }, Date, Math, Map, Set };
  vm.createContext(ctx);
  for (const f of [
    "js/blueprint.js",
    "js/data/mock-bank.js",
    "js/study/guides.js",
    "js/exam-engine.js",
  ])
    vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx);
  return {
    e: new ctx.window.ExamEngine(storage, () => now),
    w: ctx.window,
    storage,
    advance: (ms) => (now += ms),
  };
}
test("exactly five non-overlapping full forms cover every blueprint task", () => {
  const { e, w } = setup();
  assert.equal(e.bank.length, 375);
  const all = new Set();
  for (let n = 1; n <= 5; n++) {
    const qs = e.mockIds(n).map((id) => e.byId.get(id));
    assert.equal(qs.length, 75);
    assert.equal(new Set(qs.map((q) => q.t)).size, 20);
    assert.deepEqual(
      [1, 2, 3, 4, 5].map((d) => qs.filter((q) => q.d === d).length),
      [23, 20, 15, 9, 8],
    );
    assert.ok(qs.filter((q) => q.type === "multiple").length >= 10);
    for (const q of qs) {
      assert.ok(!all.has(q.id));
      all.add(q.id);
    }
  }
  assert.equal(e.mockIds(6).length, 0);
  assert.equal(e.start(6, "exam"), false);
  assert.deepEqual(
    Array.from(w.BLUEPRINT.domains, (d) => d.weight),
    [31, 26, 20, 12, 11],
  );
});
test("every question has valid grading, specific visual instruction, and official sources", () => {
  const { e, w } = setup();
  const scenarios = new Set(),
    diagrams = new Set();
  for (const q of e.bank) {
    assert.ok(!scenarios.has(q.sc), q.id + " duplicate scenario");
    scenarios.add(q.sc);
    assert.equal(w.BLUEPRINT.taskIndex[q.t].domain, q.d, q.id);
    assert.equal(w.BLUEPRINT.skillIndex[q.s].task, q.t, q.id);
    assert.equal(q.w.length, q.o.length, q.id);
    assert.equal(new Set(q.o).size, q.o.length, q.id);
    assert.equal(new Set(q.a).size, q.a.length, q.id);
    assert.ok(
      q.a.every((i) => Number.isInteger(i) && i >= 0 && i < q.o.length),
      q.id,
    );
    if (q.type === "single") {
      assert.equal(q.o.length, 4, q.id);
      assert.equal(q.a.length, 1, q.id);
    } else {
      assert.ok(q.o.length >= 5 && q.a.length >= 2, q.id);
    }
    assert.ok(q.sc.length > 100, q.id);
    assert.ok(q.e.length > 100, q.id);
    assert.ok(q.clue.length > 30, q.id);
    assert.equal(q.diagram.steps.length, 4, q.id);
    assert.ok(
      q.diagram.steps.every((s) => s.title.length > 3 && s.detail.length > 15),
      q.id,
    );
    assert.ok(
      !diagrams.has(JSON.stringify(q.diagram)),
      q.id + " repeated diagram",
    );
    diagrams.add(JSON.stringify(q.diagram));
    assert.ok(q.refs.length, q.id);
    for (const key of q.refs) {
      assert.ok(w.SOURCES[key], q.id + " " + key);
      assert.match(
        w.SOURCES[key].url,
        /^https:\/\/(docs\.aws\.amazon\.com|docs\.opensearch\.org|docs\.amplify\.aws|github\.com|kiro\.dev)\//,
      );
    }
  }
});
test("learning locks the first checked answer, leaves unconfirmed answers ungraded, and has no timer", () => {
  const { e } = setup();
  e.start(1, "learning");
  assert.equal(e.remaining(), null);
  const q = e.question();
  const wrong = q.o.findIndex((_, i) => !q.a.includes(i));
  e.select(wrong);
  assert.equal(e.revealed(q), false);
  assert.equal(e.check(), true);
  assert.equal(e.revealed(q), true);
  e.select(q.a[0]);
  assert.equal(e.state.answers[q.id][0], wrong);
  e.jump(1);
  const next = e.question();
  next.a.forEach((i) => e.select(i));
  assert.equal(e.correct(next, e.gradedAnswer(next)), false);
  e.submit();
  assert.equal(e.score().correct, 0);
  assert.equal(e.revealed(next), true);
});
test("timed answers stay hidden and deadline survives reload with exact-once auto submission", () => {
  const { e, w, storage, advance } = setup();
  e.start(2, "exam");
  assert.equal(e.remaining(), 10800);
  const q = e.question();
  q.a.forEach((i) => e.select(i));
  assert.equal(e.revealed(q), false);
  assert.equal(e.check(), false);
  const order = JSON.stringify(e.state.optionOrder);
  advance(10800001);
  const restored = new w.ExamEngine(storage, () => 11800001);
  assert.equal(restored.restore(), true);
  assert.equal(restored.state.submitted, true);
  assert.equal(restored.history.length, 1);
  assert.equal(restored.score().correct, 1);
  assert.equal(JSON.stringify(restored.state.optionOrder), order);
  restored.submit();
  assert.equal(restored.history.length, 1);
});
test("multiple-response scoring uses the exact unique set and caps selections", () => {
  const { e } = setup();
  const q = e.bank.find((q) => q.type === "multiple");
  e.start(q.exam, "learning", [q.id]);
  e.select(q.a[0]);
  assert.equal(e.check(), false);
  q.a.slice(1).forEach((i) => e.select(i));
  const extra = q.o.findIndex((_, i) => !q.a.includes(i));
  e.select(extra);
  assert.equal(e.state.answers[q.id].length, q.a.length);
  assert.equal(e.correct(q, [q.a[0], q.a[0]]), false);
  assert.equal(e.correct(q, [...q.a].reverse()), true);
  assert.equal(e.check(), true);
  assert.equal(e.score().percent, 100);
});
test("all five exams score complete correct attempts and results cannot be edited", () => {
  const { e } = setup();
  for (let n = 1; n <= 5; n++) {
    e.start(n, "exam");
    e.questions().forEach((q) => (e.state.answers[q.id] = [...q.a]));
    e.submit();
    assert.equal(e.score().correct, 75);
    assert.equal(e.score().percent, 100);
    assert.equal(Object.keys(e.score().domains).length, 5);
    e.select(0);
    assert.equal(e.score().correct, 75);
  }
  assert.equal(e.history.length, 5);
});
test("retry uses only mistakes from the same form and is recorded separately", () => {
  const { e } = setup();
  e.start(1, "exam");
  e.questions()
    .slice(1)
    .forEach((q) => (e.state.answers[q.id] = [...q.a]));
  e.submit();
  const missed = e.score().wrong;
  assert.equal(missed.length, 1);
  e.start(1, "learning", missed);
  assert.equal(e.state.ids.length, 1);
  assert.equal(e.state.retry, true);
  e.question().a.forEach((i) => e.select(i));
  e.check();
  e.submit();
  assert.equal(e.score().percent, 100);
  assert.equal(e.history.length, 2);
  assert.equal(e.history[0].retry, true);
  assert.equal(e.history[1].total, 75);
  assert.equal(e.start(2, "learning", missed), false);
});
test("restoration rejects malformed state and leaves legacy storage untouched", () => {
  const { e, storage } = setup();
  storage.setItem("aip-session", "legacy");
  e.start(1, "learning");
  const s = JSON.parse(JSON.stringify(e.state));
  for (const patch of [
    { index: -1 },
    { ids: ["no-such-question"] },
    { answers: [] },
    { submitted: false, view: "results" },
    { optionOrder: {} },
    { answers: { [s.ids[0]]: [999] } },
  ]) {
    storage.setItem("aip-pro-v2-session", JSON.stringify({ ...s, ...patch }));
    assert.equal(e.restore(), false);
  }
  storage.setItem("aip-pro-v2-session", "{bad");
  assert.equal(e.restore(), false);
  assert.equal(storage.getItem("aip-session"), "legacy");
});
test("confidence persists but never affects grading; expired selection submits instead", () => {
  const { e, advance } = setup();
  e.start(1, "learning");
  e.setConfidence("confident");
  const q = e.question();
  q.a.forEach((i) => e.select(i));
  e.check();
  e.setConfidence("unsure");
  assert.equal(e.state.confidence[q.id], "confident");
  e.submit();
  assert.equal(e.score().correct, 1);
  e.start(3, "exam");
  advance(10800001);
  e.select(e.question().a[0]);
  assert.equal(e.state.submitted, true);
  assert.equal(e.score().correct, 0);
});
test("storage failures remain usable and are reported", () => {
  const { w } = setup();
  const e = new w.ExamEngine({
    getItem() {
      throw Error("blocked");
    },
    setItem() {
      throw Error("full");
    },
  });
  assert.equal(e.start(1, "learning"), true);
  assert.equal(e.storageOK, false);
  e.question().a.forEach((i) => e.select(i));
  assert.equal(e.check(), true);
});
test("all 98 skills have coverage and every task has substantive teaching and a verifiable exercise", () => {
  const { e, w } = setup();
  assert.equal(Object.keys(w.BLUEPRINT.skillIndex).length, 98);
  for (const skill of Object.keys(w.BLUEPRINT.skillIndex))
    assert.ok(
      e.bank.some((q) => q.s === skill),
      "uncovered " + skill,
    );
  assert.equal(Object.keys(w.GUIDES).length, 20);
  for (const [task, g] of Object.entries(w.GUIDES)) {
    assert.ok(w.BLUEPRINT.taskIndex[task]);
    assert.ok(g.concepts.length >= 4);
    assert.ok(
      g.concepts.every((c) => c.heading.length > 5 && c.text.length > 160),
      task,
    );
    assert.ok(g.business.length > 100);
    assert.ok(g.lab.steps.length >= 5);
    for (const field of ["prerequisites", "verify", "cleanup"])
      assert.ok(g.lab[field].length > 80, task + " " + field);
    assert.ok(g.refs.every((k) => w.SOURCES[k]));
  }
  for (const q of e.bank) assert.ok(w.GUIDES[q.t]);
});
test("neither answer length nor repeated options reliably gives away the key", () => {
  const { e } = setup();
  for (let n = 1; n <= 5; n++) {
    const qs = e.bank.filter((q) => q.exam === n && q.type === "single");
    for (const extreme of [Math.min, Math.max]) {
      const count = qs.filter(
        (q) => q.o[q.a[0]].length === extreme(...q.o.map((x) => x.length)),
      ).length;
      assert.ok(
        count / qs.length < 0.45,
        `form ${n}: answer-length cue ${count}/${qs.length}`,
      );
    }
  }
});
