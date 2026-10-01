/* State, selection and scoring. Independent of rendering; no network or account required.
   Question shape: {id,d,t,s,type:'single'|'multiple',q,o[],a[],e,w[],trap?}
   d=domain, t=task id, s=skill id, a=correct option indexes, w=per-option reasoning. */
class ExamEngine {
  static VERSION = 4;
  static MINUTES_PER_QUESTION = 180 / 75;
  constructor(storage = null, now = () => Date.now(), random = Math.random) {
    if (!storage) { try { storage = window.localStorage; } catch {} }
    this.storage = storage; this.now = now; this.random = random;
    this.B = window.BLUEPRINT;
    this.bank = window.QBANK || [];
    this.byId = new Map(this.bank.map(q => [q.id, q]));
    this.state = null;
    this.history = this.read('aip-history', []);
    if (!Array.isArray(this.history)) this.history = [];
    this.qstats = this.read('aip-qstats', {});
    if (!this.qstats || Array.isArray(this.qstats) || typeof this.qstats !== 'object') this.qstats = {};
  }
  read(key, fallback) { try { return JSON.parse(this.storage.getItem(key)) ?? fallback; } catch { return fallback; } }
  write(key, value) { try { this.storage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } }
  shuffle(values) { const a = [...values]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(this.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /* ---------- selecting questions ---------- */
  pool(domain) { return this.bank.filter(q => q.d === domain).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true })); }
  mockCount() { return Math.floor(Math.min(...this.B.domains.map((d, i) => this.pool(d.id).length / this.B.mockCounts[i]))) || 0; }
  /* Mock n takes a fixed slice of every domain pool so mocks 1..N never overlap while the bank allows it. */
  mockIds(n) {
    const out = [];
    this.B.domains.forEach((d, i) => {
      const p = this.pool(d.id), c = this.B.mockCounts[i];
      if (!p.length) return;
      for (let k = 0; k < c; k++) out.push(p[((n - 1) * c + k) % p.length].id);
    });
    return out;
  }
  weight(q) { const s = this.qstats[q.id]; return !s ? 3 : s.last === 0 ? 6 : 1; }
  pick(candidates, count) {
    const pool = [...candidates], out = [];
    while (out.length < count && pool.length) {
      const total = pool.reduce((n, q) => n + this.weight(q), 0); let r = this.random() * total, i = 0;
      for (; i < pool.length - 1; i++) { r -= this.weight(pool[i]); if (r <= 0) break; }
      out.push(pool.splice(i, 1)[0].id);
    }
    return out;
  }
  /* Blueprint-weighted adaptive set that favours unseen and previously missed questions. */
  smartIds(count = 25) {
    const ws = this.B.domains.map(d => d.weight), sum = ws.reduce((a, b) => a + b, 0);
    let ids = [];
    this.B.domains.forEach((d, i) => { ids = ids.concat(this.pick(this.bank.filter(q => q.d === d.id), Math.max(1, Math.round(count * ws[i] / sum)))); });
    return this.shuffle(ids).slice(0, count);
  }
  drillIds({ domain, task, skill, count = 12 }) {
    const c = this.bank.filter(q => (!domain || q.d === domain) && (!task || q.t === task) && (!skill || q.s === skill));
    return this.shuffle(this.pick(c, count));
  }
  mistakeIds() { return Object.keys(this.qstats).filter(id => this.qstats[id].last === 0 && this.byId.has(id)); }

  /* ---------- session lifecycle ---------- */
  start({ kind, label, ids, mode }) {
    const qs = ids.map(id => this.byId.get(id)).filter(Boolean);
    if (!qs.length) return false;
    const ordered = mode === 'exam' ? this.shuffle(qs) : qs;
    const minutes = Math.ceil(qs.length * ExamEngine.MINUTES_PER_QUESTION);
    this.state = { version: ExamEngine.VERSION, id: String(this.now()) + '-' + Math.random().toString(36).slice(2), kind, label, mode, minutes,
      index: 0, ids: ordered.map(q => q.id), answers: {}, firstAnswers: {}, revealed: {}, flagged: {}, startedAt: this.now(),
      deadline: mode === 'exam' ? this.now() + minutes * 60000 : null, submitted: false, review: false, view: 'question',
      optionOrder: Object.fromEntries(qs.map(q => [q.id, this.shuffle(q.o.map((_, i) => i))])) };
    this.save(); return true;
  }
  questions() { return (this.state?.ids || []).map(id => this.byId.get(id)); }
  question() { return this.questions()[this.state.index]; }
  remaining() { return this.state?.deadline ? Math.max(0, Math.ceil((this.state.deadline - this.now()) / 1000)) : null; }
  expired() { return !!this.state && this.state.mode === 'exam' && !this.state.submitted && this.remaining() === 0; }
  correct(q, answer) {
    if (!Array.isArray(answer) || answer.length !== q.a.length) return false;
    const a = [...answer].sort(), k = [...q.a].sort(); return a.every((v, i) => v === k[i]);
  }
  complete(q) { const a = this.state.answers[q.id] || []; return a.length === q.a.length && new Set(a).size === a.length && a.every(v => Number.isInteger(v) && v >= 0 && v < q.o.length); }
  finalAnswer(q) { return this.state.mode === 'learning' ? this.state.firstAnswers[q.id] : this.state.answers[q.id]; }
  select(index) {
    const q = this.question(), s = this.state;
    if (s.submitted || s.revealed[q.id] || !Number.isInteger(index) || index < 0 || index >= q.o.length) return;
    if (this.expired()) { this.submit(); return; }
    let a = s.answers[q.id] || [];
    if (q.type === 'single') a = [index];
    else if (a.includes(index)) a = a.filter(v => v !== index);
    else if (a.length < q.a.length) a = [...a, index];
    s.answers[q.id] = a; this.save();
  }
  check() {
    const q = this.question(), s = this.state;
    if (s.mode !== 'learning' || s.submitted || s.revealed[q.id] || !this.complete(q)) return false;
    s.firstAnswers[q.id] = [...s.answers[q.id]]; s.revealed[q.id] = true;
    this.record(q, s.answers[q.id]); this.save(); return true;
  }
  record(q, answer) {
    const prev = this.qstats[q.id] || { n: 0, c: 0 }, ok = this.correct(q, answer);
    this.qstats[q.id] = { n: prev.n + 1, c: prev.c + (ok ? 1 : 0), last: ok ? 1 : 0, at: this.now() };
    this.write('aip-qstats', this.qstats);
  }
  jump(index) { if (index >= 0 && index < this.state.ids.length) { this.state.index = index; this.state.view = 'question'; this.save(); } }

  /* ---------- scoring ---------- */
  score() {
    const s = this.state, byDomain = {}, byTask = {}, bySkill = {};
    let right = 0;
    for (const q of this.questions()) {
      const ok = this.correct(q, this.finalAnswer(q)); if (ok) right++;
      for (const [map, key] of [[byDomain, q.d], [byTask, q.t], [bySkill, q.s]]) { const e = map[key] || (map[key] = { total: 0, correct: 0 }); e.total++; if (ok) e.correct++; }
    }
    const total = this.questions().length;
    return { total, correct: right, percent: total ? Math.round(100 * right / total) : 0, byDomain, byTask, bySkill };
  }
  /* Weighted by the blueprint, over domains present in the attempt. A study heuristic, not an AWS score. */
  weightedPercent(result) {
    let num = 0, den = 0;
    for (const d of this.B.domains) { const e = result.byDomain[d.id]; if (e && e.total) { num += d.weight * e.correct / e.total; den += d.weight; } }
    return den ? Math.round(100 * num / den) : 0;
  }
  submit() {
    const s = this.state; if (!s || s.submitted) return;
    s.submitted = true; s.view = 'results'; s.review = false; s.finishedAt = this.now();
    if (s.mode === 'exam') this.questions().forEach(q => this.record(q, s.answers[q.id]));
    else this.questions().filter(q => !s.revealed[q.id]).forEach(q => { s.firstAnswers[q.id] = []; });
    const r = this.score();
    this.history.unshift({ id: s.id, kind: s.kind, label: s.label, mode: s.mode, at: this.now(), total: r.total, correct: r.correct, percent: r.percent, weighted: this.weightedPercent(r), byDomain: r.byDomain });
    this.history = this.history.slice(0, 40); this.write('aip-history', this.history); this.save();
  }

  /* ---------- progress analytics ---------- */
  mastery(filter) {
    const qs = this.bank.filter(filter); let seen = 0, right = 0;
    for (const q of qs) { const s = this.qstats[q.id]; if (s) { seen++; if (s.last === 1) right++; } }
    return { total: qs.length, seen, right, accuracy: seen ? Math.round(100 * right / seen) : null, coverage: qs.length ? Math.round(100 * seen / qs.length) : 0 };
  }

  /* ---------- persistence ---------- */
  save() { return this.write('aip-session', this.state); }
  clearSession() { this.state = null; try { this.storage.removeItem('aip-session'); } catch {} }
  restore() {
    const s = this.read('aip-session', null);
    if (!s || s.version !== ExamEngine.VERSION) return false;
    if (!Array.isArray(s.ids) || !s.ids.length || s.ids.some(id => !this.byId.has(id)) || !Number.isInteger(s.index) || s.index < 0 || s.index >= s.ids.length
      || !['exam', 'learning'].includes(s.mode) || !s.answers || !s.firstAnswers || !s.optionOrder || !s.revealed || !s.flagged || (s.mode === 'exam' && !Number.isFinite(s.deadline))) return false;
    for (const id of s.ids) {
      const q = this.byId.get(id), order = s.optionOrder[id];
      if (!Array.isArray(order) || order.length !== q.o.length || new Set(order).size !== order.length || order.some(v => !Number.isInteger(v) || v < 0 || v >= q.o.length)) return false;
    }
    this.state = s; if (this.expired()) this.submit(); return true;
  }
}
window.ExamEngine = ExamEngine;
