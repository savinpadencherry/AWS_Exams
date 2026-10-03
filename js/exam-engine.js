/* Deterministic grading and persistent sessions; no network or account required. */
class ExamEngine {
  static VERSION = 6;
  static PREFIX = "aip-pro-v2-";
  constructor(storage = null, now = () => Date.now(), random = Math.random) {
    if (!storage) {
      try {
        storage = window.localStorage;
      } catch {}
    }
    this.storage = storage;
    this.now = now;
    this.random = random;
    this.bank = window.QBANK || [];
    this.byId = new Map(this.bank.map((q) => [q.id, q]));
    this.state = null;
    this.storageOK = true;
    this.history = this.read("history", []);
    if (!Array.isArray(this.history)) this.history = [];
  }
  read(key, fallback) {
    try {
      return (
        JSON.parse(this.storage.getItem(ExamEngine.PREFIX + key)) ?? fallback
      );
    } catch {
      return fallback;
    }
  }
  write(key, value) {
    try {
      this.storage.setItem(ExamEngine.PREFIX + key, JSON.stringify(value));
      this.storageOK = true;
      return true;
    } catch {
      this.storageOK = false;
      return false;
    }
  }
  shuffle(values) {
    const a = [...values];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  mockIds(n) {
    return [1, 2, 3, 4, 5].includes(n)
      ? this.bank.filter((q) => q.exam === n).map((q) => q.id)
      : [];
  }
  start(n, mode, retryIds = null) {
    if (!["exam", "learning"].includes(mode)) return false;
    const all = this.mockIds(n),
      ids = retryIds
        ? [...new Set(retryIds)].filter((id) => all.includes(id))
        : all;
    if (!ids.length || (retryIds && mode !== "learning")) return false;
    this.state = {
      version: ExamEngine.VERSION,
      id: this.now() + "-" + this.random().toString(36).slice(2),
      exam: n,
      mode,
      retry: !!retryIds,
      ids: mode === "exam" ? this.shuffle(ids) : ids,
      index: 0,
      answers: {},
      checked: {},
      flagged: {},
      confidence: {},
      startedAt: this.now(),
      deadline: mode === "exam" ? this.now() + 180 * 60000 : null,
      submitted: false,
      view: "question",
      reviewFilter: "all",
      optionOrder: Object.fromEntries(
        ids.map((id) => [
          id,
          this.shuffle(this.byId.get(id).o.map((_, i) => i)),
        ]),
      ),
    };
    this.save();
    return true;
  }
  question() {
    return this.byId.get(this.state.ids[this.state.index]);
  }
  questions() {
    return (this.state?.ids || []).map((id) => this.byId.get(id));
  }
  remaining() {
    return this.state?.deadline
      ? Math.max(0, Math.ceil((this.state.deadline - this.now()) / 1000))
      : null;
  }
  expired() {
    return (
      !!this.state &&
      !this.state.submitted &&
      this.state.mode === "exam" &&
      this.remaining() === 0
    );
  }
  correct(q, answer) {
    return (
      Array.isArray(answer) &&
      answer.length === q.a.length &&
      new Set(answer).size === answer.length &&
      answer.every((v) => q.a.includes(v))
    );
  }
  complete(q) {
    return (this.state.answers[q.id] || []).length === q.a.length;
  }
  gradedAnswer(q) {
    return this.state.mode === "learning" && !this.state.checked[q.id]
      ? []
      : this.state.answers[q.id] || [];
  }
  revealed(q) {
    return (
      this.state.submitted ||
      (this.state.mode === "learning" && !!this.state.checked[q.id])
    );
  }
  select(index) {
    const s = this.state,
      q = this.question();
    if (this.expired()) {
      this.submit();
      return;
    }
    if (
      s.submitted ||
      s.checked[q.id] ||
      !Number.isInteger(index) ||
      index < 0 ||
      index >= q.o.length
    )
      return;
    let a = s.answers[q.id] || [];
    if (q.type === "single") a = [index];
    else if (a.includes(index)) a = a.filter((v) => v !== index);
    else if (a.length < q.a.length) a = [...a, index];
    s.answers[q.id] = a;
    this.save();
  }
  check() {
    const s = this.state,
      q = this.question();
    if (
      s.submitted ||
      s.mode !== "learning" ||
      s.checked[q.id] ||
      !this.complete(q)
    )
      return false;
    s.checked[q.id] = true;
    this.save();
    return true;
  }
  setConfidence(value) {
    const s = this.state,
      q = this.question();
    if (
      !s.submitted &&
      !s.checked[q.id] &&
      ["confident", "guess", "unsure"].includes(value)
    ) {
      s.confidence[q.id] = value;
      this.save();
    }
  }
  jump(index) {
    if (
      Number.isInteger(index) &&
      index >= 0 &&
      index < this.state.ids.length
    ) {
      this.state.index = index;
      this.state.view = "question";
      this.save();
    }
  }
  score() {
    const domains = {},
      wrong = [];
    let correct = 0;
    for (const q of this.questions()) {
      const ok = this.correct(q, this.gradedAnswer(q));
      if (ok) correct++;
      else wrong.push(q.id);
      const d = (domains[q.d] ||= { total: 0, correct: 0 });
      d.total++;
      if (ok) d.correct++;
    }
    return {
      correct,
      total: this.state.ids.length,
      percent: Math.round((correct / this.state.ids.length) * 100),
      domains,
      wrong,
    };
  }
  submit() {
    const s = this.state;
    if (!s || s.submitted) return;
    s.submitted = true;
    s.finishedAt = this.now();
    s.view = "results";
    const result = this.score();
    this.history.unshift({
      id: s.id,
      exam: s.exam,
      mode: s.mode,
      retry: s.retry,
      at: s.finishedAt,
      ...result,
    });
    this.history = this.history.slice(0, 30);
    this.write("history", this.history);
    this.save();
  }
  save() {
    return this.write("session", this.state);
  }
  restore() {
    const s = this.read("session", null);
    if (
      !s ||
      s.version !== ExamEngine.VERSION ||
      ![1, 2, 3, 4, 5].includes(s.exam) ||
      !["exam", "learning"].includes(s.mode) ||
      !Array.isArray(s.ids) ||
      !s.ids.length ||
      new Set(s.ids).size !== s.ids.length ||
      s.ids.some((id) => this.byId.get(id)?.exam !== s.exam) ||
      !Number.isInteger(s.index) ||
      s.index < 0 ||
      s.index >= s.ids.length ||
      !["question", "navigator", "results"].includes(s.view) ||
      typeof s.submitted !== "boolean" ||
      (s.view === "results" && !s.submitted) ||
      !Number.isFinite(s.startedAt) ||
      (s.mode === "exam" &&
        (!Number.isFinite(s.deadline) || s.ids.length !== 75)) ||
      ["answers", "checked", "flagged", "confidence", "optionOrder"].some(
        (k) => !s[k] || typeof s[k] !== "object" || Array.isArray(s[k]),
      )
    )
      return false;
    for (const id of s.ids) {
      const q = this.byId.get(id),
        order = s.optionOrder[id],
        answer = s.answers[id] || [];
      if (
        !Array.isArray(order) ||
        order.length !== q.o.length ||
        new Set(order).size !== order.length ||
        order.some((v) => !Number.isInteger(v) || v < 0 || v >= q.o.length) ||
        !Array.isArray(answer) ||
        answer.length > q.a.length ||
        new Set(answer).size !== answer.length ||
        answer.some((v) => !Number.isInteger(v) || v < 0 || v >= q.o.length) ||
        (s.checked[id] && answer.length !== q.a.length)
      )
        return false;
    }
    this.state = s;
    if (this.expired()) this.submit();
    return true;
  }
}
window.ExamEngine = ExamEngine;
