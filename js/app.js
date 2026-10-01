/* DOM controller. Content (blueprint, study, bank) and state (engine) live in separate modules. */
document.addEventListener('DOMContentLoaded', () => {
  const B = window.BLUEPRINT, STUDY = window.STUDY || {}, engine = new ExamEngine();
  const main = document.querySelector('#main'), timer = document.querySelector('#timer'), label = document.querySelector('#session-label');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');
  const btn = (text, action, cls = '', extra = '') => `<button class="${cls}" data-action="${action}" ${extra}>${text}</button>`;
  const announce = t => { document.querySelector('#announcer').textContent = t; };
  const focusMain = () => { main.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const nav = path => { location.hash = '#/' + path; };
  const domainOf = id => B.domains[id - 1];
  const prefs = { get: (k, d) => engine.read('aip-' + k, d), set: (k, v) => engine.write('aip-' + k, v) };
  let filter = 'all';

  /* ---------- shared fragments ---------- */
  const bar = (pct, cls = '') => `<div class="progress-track ${cls}" role="img" aria-label="${pct}%"><div style="width:${Math.max(0, Math.min(100, pct))}%"></div></div>`;
  const flow = f => !f ? '' : `<figure class="flow"><figcaption>${esc(f.title)}</figcaption><ol>${f.steps.map(s => `<li><strong>${esc(s.t)}</strong><span>${esc(s.d)}</span></li>`).join('')}</ol></figure>`;
  const table = t => `<div class="table-card"><h3>${esc(t.title)}</h3><div class="table-scroll"><table><thead><tr>${t.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${md(c)}</th>` : `<td>${md(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
  const refs = r => r?.length ? `<p class="sources">${r.map(([l, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(l)} ↗</a>`).join('')}</p>` : '';
  const taskTitle = id => id === 'strategy' ? 'Exam strategy' : `${id} ${B.taskIndex[id]?.title || ''}`;

  /* ---------- dashboard ---------- */
  function readiness() {
    return B.domains.map(d => ({ d, m: engine.mastery(q => q.d === d.id), tasks: d.tasks.map(t => ({ t, m: engine.mastery(q => q.t === t.id) })) }));
  }
  function planDay() {
    const done = prefs.get('plan', {});
    return window.PLAN.find(p => p.steps.some((_, i) => !done[`${p.day}-${i}`])) || window.PLAN[window.PLAN.length - 1];
  }
  function dashboard() {
    label.textContent = ''; timer.textContent = '';
    const date = prefs.get('examdate', ''); let countdown = '';
    if (date) { const days = Math.ceil((new Date(date + 'T00:00:00') - new Date()) / 864e5); countdown = days > 0 ? `${days} day${days === 1 ? '' : 's'} to exam` : days === 0 ? 'Exam day. You\'ve got this.' : 'Exam date has passed'; }
    const rd = readiness(), attempted = rd.reduce((n, r) => n + r.m.seen, 0), all = engine.bank.length;
    const weak = rd.flatMap(r => r.tasks).filter(x => x.m.seen >= 3).sort((a, b) => a.m.accuracy - b.m.accuracy).slice(0, 4);
    const pd = planDay(), mocks = Math.max(1, engine.mockCount()), misses = engine.mistakeIds().length;
    const studied = prefs.get('studied', {});
    main.innerHTML = `<section class="hero"><div class="eyebrow">AWS CERTIFIED GENERATIVE AI DEVELOPER · PROFESSIONAL · AIP-C01</div><h1>Learn it properly.<br>Then prove it under exam conditions.</h1>
    <p>Study guides for every task in the official blueprint, scenario questions written in the professional exam style, blueprint-weighted timed mocks, and a mistake queue that follows you.</p>
    <div class="hero-meta"><span>75 questions · 180 min</span><span>Pass = 750 / 1000</span><span>Multiple choice + multiple response</span><span>${all} practice questions</span></div></section>
    ${engine.state ? `<div class="resume"><div><strong>${engine.state.submitted ? 'Your latest result is saved' : 'Continue where you stopped'}</strong><p>${esc(engine.state.label)} · ${engine.state.mode === 'exam' ? 'timed; the clock keeps running while you are away.' : 'untimed learning mode.'}</p></div>${btn(engine.state.submitted ? 'View result' : 'Resume', 'resume')}</div>` : ''}
    <div class="grid-2"><section class="panel"><div class="eyebrow">YOUR PLAN</div><h2>Day ${pd.day}: ${esc(pd.title)}</h2><p class="muted">${esc(pd.hours)}</p>${btn('Open the 7-day plan', 'go', '', 'data-path="plan"')}
      <label class="date-row">Exam date <input type="date" id="exam-date" value="${esc(date)}"></label>${countdown ? `<p class="countdown">${esc(countdown)}</p>` : ''}</section>
      <section class="panel"><div class="eyebrow">NEXT BEST ACTION</div><h2>${attempted ? 'Strengthen weak areas' : 'Start with the exam strategy'}</h2>
      <p class="muted">${attempted ? `You have answered ${attempted} of ${all} questions. ${misses} are in your revision queue.` : 'Spend 10 minutes learning how AIP-C01 questions are built, then study Task 1.1.'}</p>
      <div class="actions"><button data-action="go" data-path="study/strategy">Exam strategy</button>${btn('Adaptive 25 questions', 'adaptive', 'secondary')}${btn(`Mistakes (${misses})`, 'mistakes', 'secondary', misses ? '' : 'disabled')}</div></section></div>
    <section class="section-heading"><div><div class="eyebrow">READINESS BY EXAM DOMAIN</div><h2>Where you stand</h2></div><p>Accuracy uses your most recent result per question. Coverage is the share of the bank you have attempted. Weights are the official share of scored content.</p></section>
    <div class="domain-cards">${rd.map(r => `<article class="domain-card"><div class="dc-head"><span class="weight">${r.d.weight}%</span><h3>D${r.d.id} ${esc(r.d.short)}</h3></div>${bar(r.m.accuracy ?? 0)}<p class="muted">${r.m.accuracy === null ? 'No answers yet' : `${r.m.accuracy}% accurate`} · ${r.m.coverage}% of ${r.m.total} questions attempted</p><div class="actions"><button class="secondary small" data-action="go" data-path="drill-domain/${r.d.id}">Drill</button><button class="secondary small" data-action="go" data-path="study#d${r.d.id}">Study</button></div></article>`).join('')}</div>
    ${weak.length ? `<section class="panel"><div class="eyebrow">WEAKEST TASKS RIGHT NOW</div><div class="weak-list">${weak.map(w => `<div class="weak"><div><strong>${w.t.id} ${esc(w.t.title)}</strong><span class="muted">${w.m.accuracy}% over ${w.m.seen} questions</span></div><div class="actions"><button class="secondary small" data-action="go" data-path="study/${w.t.id}">Study</button><button class="small" data-action="go" data-path="drill/${w.t.id}">Drill</button></div></div>`).join('')}</div></section>` : ''}
    <section class="section-heading"><div><div class="eyebrow">TIMED FULL MOCK EXAMS</div><h2>75 questions · 180 minutes</h2></div><p>Each mock covers all five domains using the blueprint weighting (${B.mockCounts.join(' / ')} questions). Mocks do not overlap while the bank allows it.</p></section>
    <div class="exam-grid">${Array.from({ length: mocks }, (_, i) => `<article class="exam-card"><span class="exam-number">0${i + 1}</span><h3>Mock Exam ${i + 1}</h3><p class="muted">Timed, shuffled, answers hidden until you submit.</p><div class="card-actions">${btn('Start timed mock', 'mock', '', `data-n="${i + 1}"`)}${btn('Learn mode (untimed)', 'mock-learn', 'secondary', `data-n="${i + 1}"`)}</div></article>`).join('')}</div>
    <p class="muted">Studied modules: ${Object.keys(studied).length} of ${Object.keys(B.taskIndex).length} tasks.</p>
    ${engine.history.length ? `<section class="history"><h2>Recent attempts</h2><div class="table-scroll"><table><thead><tr><th>Attempt</th><th>Mode</th><th>Raw</th><th>Blueprint-weighted</th><th>Date</th></tr></thead><tbody>${engine.history.slice(0, 8).map(h => `<tr><td>${esc(h.label)}</td><td>${h.mode === 'exam' ? 'Timed' : 'Learning'}</td><td>${h.correct}/${h.total} · ${h.percent}%</td><td>${h.weighted}%</td><td>${new Date(h.at).toLocaleDateString()}</td></tr>`).join('')}</tbody></table></div></section>` : ''}
    <details class="info"><summary>How this differs from the real exam</summary><p>The real exam has 75 questions (65 scored and 10 unscored, unidentified) in 180 minutes, scored on a scaled 100–1,000 range with 750 to pass. AWS does not publish a raw-percentage conversion. This app scores every question equally and also shows a blueprint-weighted percentage as a study heuristic only. Aim for steady 80%+ on unseen timed mocks. These are independent practice questions, not real exam items.</p></details>`;
  }

  /* ---------- study ---------- */
  function studyIndex() {
    const studied = prefs.get('studied', {});
    main.innerHTML = `<div class="crumbs"><a href="#/">Home</a> / Study</div><h1>Study guide</h1><p class="lead">One module per task in the official exam guide. Each explains the mental model, the AWS services, comparison tables, flow diagrams and how the exam disguises the question.</p>
    <a class="module-card strategy" href="#/study/strategy"><strong>Start here: Exam strategy</strong><span>How AIP-C01 questions are built, defaults the exam favours, time management.</span></a>
    ${B.domains.map(d => `<section id="d${d.id}"><div class="domain-head"><span class="weight">${d.weight}%</span><h2>Domain ${d.id}: ${esc(d.title)}</h2></div><div class="module-grid">${d.tasks.map(t => { const m = engine.mastery(q => q.t === t.id); return `<a class="module-card" href="#/study/${t.id}"><strong>${studied[t.id] ? '✓ ' : ''}Task ${t.id}</strong><span>${esc(t.title)}</span><small>${t.skills.length} skills · ${m.total} questions${m.accuracy === null ? '' : ` · ${m.accuracy}% accurate`}</small></a>`; }).join('')}</div></section>`).join('')}
    <p class="actions">${btn('Rapid review (all tables)', 'go', 'secondary', 'data-path="rapid"')}${btn('Services glossary', 'go', 'secondary', 'data-path="services"')}</p>`;
    if (location.hash.includes('#d')) document.getElementById(location.hash.split('#').pop())?.scrollIntoView();
  }
  function studyModule(id) {
    const m = STUDY[id]; if (!m) return notFound();
    const t = B.taskIndex[id], studied = prefs.get('studied', {});
    const ids = ['strategy', ...Object.keys(B.taskIndex)], i = ids.indexOf(id);
    const prev = ids[i - 1], next = ids[i + 1];
    const skills = t ? `<section class="skills"><h2>Skills the exam tests in this task</h2><ul>${t.skills.map(s => { const ms = engine.mastery(q => q.s === s.id); return `<li><b>${s.id}</b> ${esc(s.text)}<small>${ms.total} practice question${ms.total === 1 ? '' : 's'}${ms.accuracy === null ? '' : ` · ${ms.accuracy}% accurate`}</small></li>`; }).join('')}</ul></section>` : '';
    main.innerHTML = `<div class="crumbs"><a href="#/">Home</a> / <a href="#/study">Study</a> / ${esc(taskTitle(id))}</div>
    <div class="eyebrow">${t ? `DOMAIN ${t.domain} · ${domainOf(t.domain).weight}% OF THE EXAM · TASK ${id}` : 'START HERE'}</div><h1>${esc(t ? t.title : 'Exam strategy')}</h1>
    <p class="lead">${md(m.goal)}</p><section class="big-idea"><h2>The big idea</h2><p>${md(m.big)}</p></section>${skills}
    <section><h2>Core concepts</h2>${m.concepts.map(c => `<article class="concept"><h3>${esc(c.h)}</h3><p>${md(c.p)}</p>${c.trap ? `<div class="remember"><strong>Exam trap</strong><p>${md(c.trap)}</p></div>` : ''}</article>`).join('')}</section>
    ${(m.tables || []).map(table).join('')}${flow(m.flow)}
    <section class="spot"><h2>Spot it in the exam</h2><ul>${m.patterns.map(p => `<li>${md(p)}</li>`).join('')}</ul></section>${refs(m.refs)}
    <div class="actions sticky-actions">${t ? btn('Practise this task (12 questions)', 'go', '', `data-path="drill/${id}"`) : ''}${btn(studied[id] ? '✓ Marked as studied' : 'Mark as studied', 'studied', 'secondary', `data-id="${id}"`)}</div>
    <nav class="question-nav">${prev ? `<a class="btn secondary" href="#/study/${prev}">← ${esc(taskTitle(prev))}</a>` : '<span></span>'}${next ? `<a class="btn" href="#/study/${next}">${esc(taskTitle(next))} →</a>` : '<span></span>'}</nav>`;
    document.title = `${taskTitle(id)} · AIP-C01`;
  }
  function rapid() {
    main.innerHTML = `<div class="crumbs"><a href="#/">Home</a> / Rapid review</div><h1>Rapid review</h1><p class="lead">Every comparison table, spot-it pattern and exam trap in one place. Use it on the last two days and on exam morning.</p><p class="actions no-print">${btn('Print / save as PDF', 'print', 'secondary')}</p>
    ${['strategy', ...Object.keys(B.taskIndex)].map(id => { const m = STUDY[id]; if (!m) return ''; return `<section class="rapid"><h2>${esc(taskTitle(id))}</h2>${(m.tables || []).map(table).join('')}<div class="spot"><h3>Spot it</h3><ul>${m.patterns.map(p => `<li>${md(p)}</li>`).join('')}</ul></div>${m.concepts.filter(c => c.trap).map(c => `<div class="remember"><strong>Trap · ${esc(c.h)}</strong><p>${md(c.trap)}</p></div>`).join('')}</section>`; }).join('')}`;
  }
  function services() {
    const cats = [...new Set(window.SERVICES.map(s => s[1]))];
    main.innerHTML = `<div class="crumbs"><a href="#/">Home</a> / Services glossary</div><h1>In-scope services</h1><p class="lead">All ${window.SERVICES.length} services and features the exam guide lists as in scope (grouped as AWS groups them), with what each does in a GenAI solution and the confusions to avoid.</p>
    <div class="filters"><input id="svc-q" type="search" placeholder="Filter, e.g. cache, PII, vector" aria-label="Filter services"><select id="svc-c" aria-label="Category"><option value="">All categories</option>${cats.map(c => `<option>${esc(c)}</option>`).join('')}</select></div><div id="svc-list"></div>
    <details class="info"><summary>Services the guide lists as OUT of scope</summary><p>You are not expected to know these for AIP-C01: Amazon MQ; AWS Clean Rooms, Data Exchange, DataZone, FinSpace; Managed Blockchain; Chime, WorkDocs, WorkMail, Wickr, Alexa for Business; AWS Budgets, Cost and Usage Report, Savings Plans, Reserved Instance reports; Batch, EC2 Image Builder, ECS/EKS Anywhere, Elastic Beanstalk, Lightsail, Local Zones, Serverless Application Repository; App2Container, Copilot, ROSA; Amazon SES; Keyspaces, QLDB, Redshift, Timestream; Cloud9, CloudShell, CodeGuru, CodeStar, Corretto; WorkSpaces, AppStream, WorkLink; Device Farm, Location Service, Pinpoint; GameLift, Lumberyard; the IoT family; Console Mobile, Health Dashboard, License Manager, Proton, Trusted Advisor; DeepComposer, DeepRacer, DevOps Guru, Forecast, Fraud Detector, HealthLake, Lookout, Monitron, Panorama; Elemental Media services, Elastic Transcoder, Kinesis Video Streams, IVS; Migration services and Snow Family; App Mesh, Cloud Map, Direct Connect, Private 5G, Transit Gateway, VPN; Braket; RoboMaker; Ground Station.</p></details>`;
    const draw = () => {
      const q = document.querySelector('#svc-q').value.toLowerCase(), c = document.querySelector('#svc-c').value;
      const rows = window.SERVICES.filter(s => (!c || s[1] === c) && (!q || s.join(' ').toLowerCase().includes(q)));
      document.querySelector('#svc-list').innerHTML = rows.length ? `<div class="table-scroll"><table class="svc"><thead><tr><th>Service</th><th>Category</th><th>Role on this exam</th></tr></thead><tbody>${rows.map(s => `<tr><th scope="row">${esc(s[0])}</th><td>${esc(s[1])}</td><td>${esc(s[2])}${s[3] ? `<div class="warn">Don't confuse: ${esc(s[3])}</div>` : ''}</td></tr>`).join('')}</tbody></table></div>` : '<p>No services match.</p>';
    };
    document.querySelector('#svc-q').addEventListener('input', draw); document.querySelector('#svc-c').addEventListener('change', draw); draw();
  }
  function plan() {
    const done = prefs.get('plan', {}), cur = planDay();
    main.innerHTML = `<div class="crumbs"><a href="#/">Home</a> / 7-day plan</div><h1>7-day plan to exam day</h1><p class="lead">Built for a one-week sprint, roughly 3 to 4 hours a day, weighted toward Domain 1 (31%) and Domain 2 (26%). Tick steps as you finish them; shift days if your schedule moves.</p>
    ${window.PLAN.map(p => `<section class="plan-day ${p.day === cur.day ? 'current' : ''}"><h2>${p.day === 8 ? 'Exam day' : 'Day ' + p.day}: ${esc(p.title)} ${p.hours ? `<small>${esc(p.hours)}</small>` : ''}</h2><ul>${p.steps.map((s, i) => `<li><label><input type="checkbox" data-plan="${p.day}-${i}" ${done[`${p.day}-${i}`] ? 'checked' : ''}> ${esc(s.text)}</label>${s.go ? ` <a href="#/${s.go}">Open →</a>` : ''}</li>`).join('')}</ul></section>`).join('')}`;
  }
  function practice() { dashboard(); }
  function notFound() { main.innerHTML = '<h1>Not found</h1><p><a href="#/">Back to the dashboard</a></p>'; }

  /* ---------- practice sessions ---------- */
  function begin(opts) {
    if (engine.state && !engine.state.submitted && !confirm('Starting a new attempt replaces your in-progress attempt. Continue?')) { history.replaceState(null, '', '#/'); route(); return; }
    if (!engine.start(opts)) { main.innerHTML = '<h1>No questions found for that selection</h1><p><a href="#/">Back</a></p>'; return; }
    filter = 'all'; history.replaceState(null, '', '#/session'); route(); focusMain();
  }
  function session() {
    if (!engine.state) { nav(''); return; }
    if (engine.expired()) { engine.submit(); announce('Time is up. Your attempt was submitted.'); }
    if (engine.state.view === 'results') return results();
    if (engine.state.view === 'review') return navigator();
    question();
  }
  function sessionHeader() { const s = engine.state; label.textContent = `${s.label} · ${s.submitted ? 'Review' : s.mode === 'exam' ? 'Timed exam' : 'Learning mode'}`; tick(); }
  function question() {
    sessionHeader();
    const s = engine.state, q = engine.question(), a = s.answers[q.id] || [], revealed = s.review || s.revealed[q.id], ok = engine.correct(q, engine.finalAnswer(q));
    const order = s.optionOrder[q.id], disabled = s.submitted || revealed, multi = q.type === 'multiple';
    const controls = `<div class="options" role="group" aria-label="Answer choices">${order.map((oi, i) => { const right = q.a.includes(oi), selected = a.includes(oi);
      return `<button class="option ${selected ? 'selected' : ''} ${revealed && right ? 'correct' : ''} ${revealed && selected && !right ? 'incorrect' : ''}" data-action="select" data-option="${oi}" aria-pressed="${selected}" ${disabled ? 'disabled' : ''}><span class="letter">${multi ? '☐☑'[selected ? 1 : 0] : String.fromCharCode(65 + i)}</span><span>${esc(q.o[oi])}${revealed && right ? '<b class="choice-status">Correct answer</b>' : revealed && selected ? '<b class="choice-status">Your selection</b>' : ''}</span></button>`; }).join('')}</div>`;
    main.innerHTML = `<div class="question-toolbar"><span>Question ${s.index + 1} <span class="muted">of ${s.ids.length}</span></span><div>${btn(s.flagged[q.id] ? '⚑ Flagged' : '⚐ Flag for review', 'flag', 'secondary small', `aria-pressed="${!!s.flagged[q.id]}"`)}${btn('Navigator', 'navigator', 'secondary small')}</div></div>${bar(100 * (s.index + 1) / s.ids.length)}
    <article class="question"><div class="eyebrow">${multi ? `CHOOSE ${q.a.length} · ALL MUST BE CORRECT` : 'CHOOSE ONE'}</div><p class="scenario">${esc(q.sc)}</p><h1 class="question-title">${esc(q.q)}</h1>${controls}
    ${s.mode === 'learning' && !revealed && !s.submitted ? `<div class="check-row">${btn('Check answer & learn', 'check', '', engine.complete(q) ? '' : 'disabled')}<span class="muted">${multi ? `${a.length} of ${q.a.length} selected. ` : ''}Your first checked answer is saved.</span></div>` : ''}
    ${revealed ? explanation(q, ok) : ''}</article>
    <nav class="question-nav" aria-label="Question navigation">${btn('← Previous', 'prev', 'secondary', s.index === 0 ? 'disabled' : '')}<span>${s.submitted ? btn('Back to results', 'results', 'secondary') : btn(s.mode === 'exam' ? 'Review & submit' : 'Finish', 'navigator', 'secondary')}</span>${btn(s.index === s.ids.length - 1 ? 'Review attempt' : 'Next →', s.index === s.ids.length - 1 ? 'navigator' : 'next')}</nav>`;
  }
  function explanation(q, ok) {
    const s = engine.state, a = engine.finalAnswer(q) || [], t = B.taskIndex[q.t], sk = B.skillIndex[q.s], ref = STUDY[q.t]?.refs?.[0];
    return `<section class="learning" aria-label="Answer explanation"><div class="learning-heading"><span class="result-chip ${ok ? 'good' : 'bad'}">${ok ? 'Correct' : a.length ? 'Not quite. Let\'s understand why' : 'Not answered'}</span><span class="muted">Domain ${q.d} · Task ${q.t} · Skill ${q.s}</span></div>
    <div class="answer-box"><h3>Correct answer${q.a.length > 1 ? 's' : ''}</h3>${q.a.map(i => `<p>${esc(q.o[i])}</p>`).join('')}</div>
    <div class="lesson-grid"><div><h3>Why this is the best answer</h3><p>${md(q.e)}</p></div><div>${q.trap ? `<div class="remember"><strong>Exam trap</strong><p>${md(q.trap)}</p></div>` : ''}${sk ? `<p class="muted"><b>Skill ${sk.id}:</b> ${esc(sk.text)}</p>` : ''}</div></div>
    <details class="why-options" ${!ok ? 'open' : ''}><summary>Why each option is right or wrong</summary>${s.optionOrder[q.id].map(oi => `<div class="reason ${q.a.includes(oi) ? 'right-reason' : ''}"><strong>${esc(q.o[oi])}</strong>${a.includes(oi) ? '<span class="your-pick">Your selection</span>' : ''}<p>${md(q.w[oi])}</p></div>`).join('')}</details>
    <p class="sources"><a href="#/study/${q.t}" class="study-link">Study Task ${q.t}: ${esc(t?.title)} →</a>${ref ? `<a href="${esc(ref[1])}" target="_blank" rel="noopener">${esc(ref[0])} ↗</a>` : ''}</p>${!ok ? '<p class="queue-note">Added to your revision queue.</p>' : ''}</section>`;
  }
  function navigator() {
    engine.state.view = 'review'; engine.save(); sessionHeader();
    const s = engine.state, qs = engine.questions(), answered = qs.filter(q => engine.complete(q)).length, flagged = qs.filter(q => s.flagged[q.id]).length;
    const show = (q) => filter === 'all' || (filter === 'flagged' && s.flagged[q.id]) || (filter === 'unanswered' && !engine.complete(q)) || (filter === 'wrong' && !engine.correct(q, engine.finalAnswer(q)));
    main.innerHTML = `<section class="review"><div class="eyebrow">${s.submitted ? 'REVIEW ANSWERS' : 'BEFORE YOU FINISH'}</div><h1>Review your attempt</h1><p>${answered} complete · ${qs.length - answered} unanswered or incomplete · ${flagged} flagged</p>
    <label class="filter">Show <select id="review-filter"><option value="all">All questions</option><option value="flagged" ${filter === 'flagged' ? 'selected' : ''}>Flagged</option><option value="unanswered" ${filter === 'unanswered' ? 'selected' : ''}>Unanswered / incomplete</option>${s.submitted ? `<option value="wrong" ${filter === 'wrong' ? 'selected' : ''}>Incorrect</option>` : ''}</select></label>
    <div class="nav-grid">${qs.map((q, i) => ({ q, i })).filter(({ q }) => show(q)).map(({ q, i }) => `<button data-action="jump" data-index="${i}" class="nav-cell ${engine.complete(q) ? 'answered' : ''} ${s.flagged[q.id] ? 'flagged' : ''}" aria-label="Question ${i + 1}, ${engine.complete(q) ? 'answered' : 'incomplete'}${s.flagged[q.id] ? ', flagged' : ''}">${i + 1}${s.flagged[q.id] ? ' ⚑' : ''}</button>`).join('') || '<p>No questions match this filter.</p>'}</div>
    <div class="actions">${btn('Return to question', 'return', 'secondary')}${s.submitted ? btn('Back to results', 'results') : btn('Submit attempt', 'submit')}</div></section>`;
  }
  function results() {
    engine.state.view = 'results'; engine.state.review = false; engine.save(); sessionHeader();
    const s = engine.state, r = engine.score(), w = engine.weightedPercent(r), wrong = engine.questions().filter(q => !engine.correct(q, engine.finalAnswer(q)));
    const full = s.kind === 'mock', skillRows = Object.entries(r.bySkill).filter(([, v]) => v.correct < v.total).sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total).slice(0, 8);
    main.innerHTML = `<section class="results"><div class="eyebrow">${esc(s.label.toUpperCase())} · ${s.mode === 'exam' ? 'TIMED' : 'LEARNING · FIRST CHECKED ANSWERS'}</div><h1>${r.percent}% <span>raw accuracy</span></h1><p class="score-count">${r.correct} of ${r.total} correct · blueprint-weighted ${w}%</p>
    <p>${w >= 80 ? 'Strong. Confirm on an unseen timed mock and keep your mistake queue empty.' : w >= 70 ? 'Close. Fix the weak tasks below and retake a fresh mock.' : 'Keep going. Study the linked modules for each weak task, then drill them.'}</p><p class="score-note">Raw practice accuracy. AWS reports a scaled 100–1,000 score (750 to pass) and does not publish a raw-percentage conversion, so this is a study guide, not a prediction. ${full ? '' : 'Short drills are a small sample, so read the trend rather than one number.'}</p>
    <div class="actions">${btn('Review all explanations', 'review-all')}${btn('Retry these mistakes', 'retry', 'secondary', wrong.length ? '' : 'disabled')}${btn('Dashboard', 'home', 'secondary')}</div></section>
    <section class="domain-results"><h2>By domain (official weight)</h2>${B.domains.map(d => { const e = r.byDomain[d.id]; return e ? `<article><div><h3>D${d.id} ${esc(d.short)} <small>(${d.weight}%)</small></h3><span>${e.correct}/${e.total} · ${Math.round(100 * e.correct / e.total)}%</span></div>${bar(100 * e.correct / e.total)}</article>` : ''; }).join('')}</section>
    ${skillRows.length ? `<section class="missed"><h2>Skills to fix first</h2>${skillRows.map(([id, v]) => `<a class="missed-row" href="#/study/${B.skillIndex[id].task}"><span><b>${id}</b> ${esc(B.skillIndex[id].text)}</span><span>${v.correct}/${v.total} · Study →</span></a>`).join('')}</section>` : ''}
    ${wrong.length ? `<section class="missed"><h2>Missed questions</h2>${wrong.map(q => `<button class="missed-row" data-action="review-question" data-id="${q.id}"><span>Task ${q.t}: ${esc(q.sc.slice(0, 90))}…</span><span>Review →</span></button>`).join('')}</section>` : ''}`;
  }
  function tick() {
    const s = engine.state; if (!s || !location.hash.startsWith('#/session')) { timer.textContent = ''; return; }
    if (s.submitted) { timer.textContent = 'Attempt complete'; timer.className = ''; return; }
    if (s.mode === 'learning') { timer.textContent = 'Untimed'; timer.className = ''; return; }
    const sec = engine.remaining(), h = Math.floor(sec / 3600);
    timer.textContent = `${h ? h + ':' : ''}${String(Math.floor(sec % 3600 / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`; timer.className = sec <= 600 ? 'urgent' : '';
  }

  /* ---------- router ---------- */
  function route() {
    const raw = location.hash.replace(/^#\/?/, ''), [path] = raw.split('#'), [a, b] = path.split('/');
    document.title = 'AIP-C01 · Generative AI Developer Professional';
    if (a !== 'session') { label.textContent = ''; timer.textContent = ''; }
    if (a === '' || a === undefined || a === 'practice') dashboard();
    else if (a === 'study') b ? studyModule(b) : studyIndex();
    else if (a === 'rapid') rapid();
    else if (a === 'services') services();
    else if (a === 'plan') plan();
    else if (a === 'session') session();
    else if (a === 'mock') begin({ kind: 'mock', label: `Mock Exam ${b}`, ids: engine.mockIds(+b), mode: 'exam' });
    else if (a === 'mock-learn') begin({ kind: 'mock', label: `Mock Exam ${b} (learning)`, ids: engine.mockIds(+b), mode: 'learning' });
    else if (a === 'drill') begin({ kind: 'drill', label: `Drill · Task ${b}`, ids: engine.drillIds({ task: b, count: 12 }), mode: 'learning' });
    else if (a === 'drill-domain') begin({ kind: 'drill', label: `Drill · Domain ${b}`, ids: engine.drillIds({ domain: +b, count: 15 }), mode: 'learning' });
    else if (a === 'adaptive') begin({ kind: 'adaptive', label: 'Adaptive mix', ids: engine.smartIds(25), mode: 'learning' });
    else if (a === 'mistakes') begin({ kind: 'mistakes', label: 'Mistake retry', ids: engine.mistakeIds(), mode: 'learning' });
    else notFound();
    tick();
  }
  window.addEventListener('hashchange', () => { route(); focusMain(); });

  /* ---------- events ---------- */
  main.addEventListener('click', e => {
    const b = e.target.closest('button[data-action]'); if (!b || b.disabled) return;
    const action = b.dataset.action, s = engine.state;
    const direct = { go: () => nav(b.dataset.path), mock: () => nav('mock/' + b.dataset.n), 'mock-learn': () => nav('mock-learn/' + b.dataset.n), adaptive: () => nav('adaptive'), mistakes: () => nav('mistakes'),
      resume: () => nav('session'), home: () => nav(''), print: () => window.print(),
      studied: () => { const st = prefs.get('studied', {}); if (st[b.dataset.id]) delete st[b.dataset.id]; else st[b.dataset.id] = Date.now(); prefs.set('studied', st); studyModule(b.dataset.id); } };
    if (direct[action]) { direct[action](); return; }
    if (!s) return;
    if (engine.expired()) { engine.submit(); route(); return; }
    if (action === 'select') { engine.select(+b.dataset.option); question(); main.querySelector(`[data-option="${b.dataset.option}"]`)?.focus({ preventScroll: true }); return; }
    if (action === 'check') { if (engine.check()) { question(); announce('Answer checked. Explanation is below.'); main.querySelector('.learning')?.scrollIntoView({ block: 'start', behavior: 'smooth' }); } return; }
    if (action === 'flag') { const q = engine.question(); s.flagged[q.id] = !s.flagged[q.id]; engine.save(); question(); return; }
    if (action === 'next') engine.jump(s.index + 1);
    if (action === 'prev') engine.jump(s.index - 1);
    if (action === 'jump') engine.jump(+b.dataset.index);
    if (action === 'navigator') { s.view = 'review'; filter = 'all'; }
    if (action === 'return') s.view = 'question';
    if (action === 'results') s.view = 'results';
    if (action === 'review-all') { s.review = true; s.view = 'question'; s.index = 0; }
    if (action === 'review-question') { s.review = true; engine.jump(s.ids.indexOf(b.dataset.id)); }
    if (action === 'retry') { const ids = engine.questions().filter(q => !engine.correct(q, engine.finalAnswer(q))).map(q => q.id); begin({ kind: 'mistakes', label: 'Mistake retry', ids, mode: 'learning' }); return; }
    if (action === 'submit') { const n = engine.questions().filter(q => !engine.complete(q)).length; document.querySelector('#confirm-copy').textContent = `${n} question${n === 1 ? ' is' : 's are'} unanswered or incomplete and will score as incorrect. There is no penalty for guessing on the real exam.`; document.querySelector('#confirm-dialog').showModal(); return; }
    engine.save(); session(); focusMain();
  });
  main.addEventListener('change', e => {
    if (e.target.id === 'review-filter') { filter = e.target.value; navigator(); }
    if (e.target.id === 'exam-date') { prefs.set('examdate', e.target.value); dashboard(); }
    if (e.target.matches('[data-plan]')) { const d = prefs.get('plan', {}); d[e.target.dataset.plan] = e.target.checked; prefs.set('plan', d); }
  });
  document.querySelector('#home').addEventListener('click', e => { e.preventDefault(); nav(''); });
  document.querySelector('#cancel-submit').addEventListener('click', () => document.querySelector('#confirm-dialog').close());
  document.querySelector('#confirm-submit').addEventListener('click', () => { document.querySelector('#confirm-dialog').close(); engine.submit(); route(); focusMain(); });
  document.addEventListener('keydown', e => {
    if (!location.hash.startsWith('#/session') || !engine.state || engine.state.view !== 'question' || e.target.closest('input,select,textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
    const s = engine.state, q = engine.question(), k = e.key.toLowerCase();
    if (/^[a-f]$/.test(k) && !s.submitted && !s.revealed[q.id] && !s.review) { const oi = s.optionOrder[q.id][k.charCodeAt(0) - 97]; if (oi !== undefined) { engine.select(oi); question(); } }
    else if (k === 'arrowright' || k === 'n') { engine.jump(s.index + 1); question(); }
    else if (k === 'arrowleft' || k === 'p') { engine.jump(s.index - 1); question(); }
    else if (k === 'f' && !s.submitted) { s.flagged[q.id] = !s.flagged[q.id]; engine.save(); question(); }
  });
  setInterval(() => { if (engine.expired()) { engine.submit(); document.querySelector('#confirm-dialog').close(); if (location.hash.startsWith('#/session')) { route(); announce('Time is up. Your attempt was submitted.'); } } tick(); }, 500);
  document.addEventListener('visibilitychange', () => { if (engine.expired()) { engine.submit(); route(); } tick(); });

  engine.restore();
  if (!location.hash || location.hash === '#' || location.hash === '#/session' && !engine.state) history.replaceState(null, '', '#/');
  route();
});
