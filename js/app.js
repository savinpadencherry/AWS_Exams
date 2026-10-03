document.addEventListener("DOMContentLoaded", () => {
  const engine = new ExamEngine(),
    B = window.BLUEPRINT;
  const main = document.querySelector("#main"),
    timer = document.querySelector("#timer"),
    label = document.querySelector("#session-label");
  const dialog = document.querySelector("#confirm-dialog");
  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const md = (value) =>
    esc(value)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  const button = (text, action, cls = "", attrs = "") =>
    `<button class="${cls}" data-action="${action}" ${attrs}>${text}</button>`;
  const announce = (value) => {
    document.querySelector("#announcer").textContent = value;
  };
  const focus = () => {
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const save = () => {
    engine.save();
    storageNotice();
  };
  let mode = engine.read("mode", "learning");
  if (!["learning", "exam"].includes(mode)) mode = "learning";
  let navFilter = "all";
  const forms = [
    {
      name: "Architecture under constraints",
      copy: "Choose the right design when freshness, security, cost and operational effort compete.",
      tag: "DESIGN · INTEGRATE · GOVERN",
    },
    {
      name: "Production decisions",
      copy: "Work through difficult deployments, access boundaries, scaling choices and model trade-offs.",
      tag: "DEPLOY · PROTECT · OPTIMIZE",
    },
    {
      name: "Diagnose & improve",
      copy: "Read the evidence, isolate failures and choose changes that improve the complete system.",
      tag: "INVESTIGATE · VALIDATE · REFINE",
    },
    {
      name: "Build for the business",
      copy: "Connect service mechanics to reliable workflows, measured value and controlled operations.",
      tag: "BUILD · MEASURE · OPERATE",
    },
    {
      name: "Master the edge cases",
      copy: "Challenge assumptions about safety, state, retrieval and evaluation in demanding scenarios.",
      tag: "REASON · DEBUG · APPLY",
    },
  ];
  function storageNotice() {
    const existing = document.querySelector("#storage-warning");
    if (!engine.storageOK && !existing)
      main.insertAdjacentHTML(
        "afterbegin",
        '<p id="storage-warning" class="notice" role="alert">Browser storage is unavailable or full. You can continue, but this attempt may not survive a refresh.</p>',
      );
  }
  function home() {
    label.textContent = "";
    timer.textContent = "";
    const s = engine.state;
    main.innerHTML = `<section class="hero"><div><p class="eyebrow"><span class="status-dot"></span> AWS GENERATIVE AI DEVELOPER · PROFESSIONAL</p><h1>Five exams.<br><em>Deeper understanding.</em></h1><p class="hero-copy">Practice the decisions behind production AI. Take a full mock, understand every mistake, and see how the pieces fit together.</p><div class="hero-stats"><span><strong>375</strong> unique questions</span><span><strong>75</strong> per exam</span><span><strong>180</strong> minutes</span></div></div><aside class="hero-art" aria-label="Every question includes a visual explanation"><span class="art-label">FROM QUESTION TO UNDERSTANDING</span><div class="art-node"><span>01</span> Read the scenario <b>↘</b></div><div class="art-node"><span>02</span> Make the decision <b>↓</b></div><div class="art-node mint"><span>03</span> See why it works <b>✦</b></div><p>Visual lessons. Service theory. Console practice.</p></aside></section>
      ${s ? `<section class="resume"><div><span class="eyebrow">${s.submitted ? "LATEST RESULT" : "SAVED IN THIS BROWSER"}</span><h2>Mock ${s.exam}${s.retry ? " · Mistake review" : ""} · ${s.mode === "exam" ? "Timed exam" : "Learning mode"}</h2><p>${s.submitted ? `${engine.score().correct} / ${s.ids.length} correct. Your explanations are ready.` : s.mode === "exam" ? "Your 180-minute deadline keeps running while you are away." : `Continue at question ${s.index + 1} of ${s.ids.length}. Your checked answers are saved.`}</p></div>${button(s.submitted ? "View result →" : "Continue attempt →", "resume")}</section>` : ""}
      <section class="exam-selection" aria-labelledby="choose-title"><div class="section-heading"><div><p class="eyebrow">YOUR FIVE FULL-LENGTH MOCKS</p><h2 id="choose-title">Choose how you want to practice.</h2></div><fieldset class="mode-switch"><legend class="sr-only">Practice mode</legend><label class="${mode === "learning" ? "active" : ""}"><input type="radio" name="mode" value="learning" ${mode === "learning" ? "checked" : ""}> Learning mode</label><label class="${mode === "exam" ? "active" : ""}"><input type="radio" name="mode" value="exam" ${mode === "exam" ? "checked" : ""}> Timed exam</label></fieldset></div><p class="mode-description">${mode === "learning" ? "Untimed. Check each answer to unlock its visual lesson. Your first checked answer counts." : "180 minutes. Answers and diagrams stay hidden until submission. Multiple-response questions need the exact set."}</p>
      <div class="exam-grid">${forms
        .map((f, i) => {
          const n = i + 1,
            attempt = engine.history.find(
              (h) => h.exam === n && !h.retry && h.mode === mode,
            );
          return `<article class="exam-card"><div class="card-top"><span class="exam-number">0${n}</span><span class="pill">75 QUESTIONS</span></div><p class="eyebrow">MOCK EXAM ${n}</p><h3>${f.name}</h3><p>${f.copy}</p><div class="card-specs"><span>All 5 domains</span><span>${
            engine
              .mockIds(n)
              .map((id) => engine.byId.get(id))
              .filter((q) => q.type === "multiple").length
          } multiple-response</span></div><div class="card-bottom"><small>${attempt ? `Last ${mode === "exam" ? "timed" : "learning"} result: ${attempt.correct}/75 · ${attempt.percent}%` : "A distinct question set. No overlap."}</small>${button(mode === "learning" ? "Start learning →" : "Start timed exam →", "start", "", `data-exam="${n}"`)}</div></article>`;
        })
        .join("")}</div></section>
      <section class="learning-preview"><div><p class="eyebrow">A LESSON IN EVERY ANSWER</p><h2>Make the next decision with confidence.</h2></div><div class="benefit"><span>01</span><h3>Find the decisive clue</h3><p>Connect the scenario's constraints to the best answer.</p></div><div class="benefit"><span>02</span><h3>See the concept</h3><p>Follow a diagram built for that question, step by step.</p></div><div class="benefit"><span>03</span><h3>Understand the alternatives</h3><p>Learn the service mechanics, try a console exercise, and check the AWS source.</p></div></section>
      ${learningProgress()}<details class="info"><summary>Exam coverage & scoring</summary><p>The complete bank covers all 98 listed blueprint skills; each exam covers all 20 tasks. Domain counts are 23 / 20 / 15 / 9 / 8, approximating the official weights of 31 / 26 / 20 / 12 / 11%.</p><div class="blueprint-bars">${B.domains.map((d) => `<div><span>${esc(d.short)}</span><strong>${d.weight}%</strong><div class="bar"><i style="width:${d.weight * 2}%"></i></div></div>`).join("")}</div><p>AWS uses 65 scored and 10 unidentified unscored questions, with a passing scaled score of 750/1,000. These mocks grade all 75 questions and report raw accuracy. They are independent practice material, designed around the blueprint and AWS documentation; difficulty is not psychometrically calibrated to the official exam.</p><p>Sources checked 3 October 2026. Learning mode and retakes are useful for revision; an unseen timed attempt is a better check of recall. Existing progress from the previous app is left in browser storage separately.</p></details>
      ${
        engine.history.length
          ? `<details class="info"><summary>Recent attempts (${engine.history.length})</summary><div class="table-scroll"><table><thead><tr><th>Exam</th><th>Mode</th><th>Result</th><th>Date</th></tr></thead><tbody>${engine.history
              .slice(0, 12)
              .map(
                (h) =>
                  `<tr><td>Mock ${h.exam}${h.retry ? " · mistakes" : ""}</td><td>${h.mode === "exam" ? "Timed" : "Learning"}</td><td>${h.correct}/${h.total} · ${h.percent}%</td><td>${new Date(h.at).toLocaleDateString()}</td></tr>`,
              )
              .join(
                "",
              )}</tbody></table></div><p class="muted">History stores result summaries. Full answer review is available for the latest attempt.</p></details>`
          : ""
      }`;
    storageNotice();
  }
  function start(n, retry = null) {
    if (
      engine.state &&
      !engine.state.submitted &&
      !window.confirm(
        "Starting another attempt replaces your current in-progress attempt. Continue?",
      )
    )
      return;
    if (!engine.start(n, retry ? "learning" : mode, retry)) return;
    navFilter = "all";
    location.hash = "#/session";
    session();
    focus();
  }
  function header() {
    const s = engine.state;
    label.textContent = `Mock ${s.exam} · ${s.retry ? "Mistake review" : s.mode === "exam" ? "Timed exam" : "Learning mode"}`;
    tick();
  }
  function session() {
    if (!engine.state) {
      location.hash = "#/";
      return;
    }
    if (engine.expired()) engine.submit();
    header();
    if (engine.state.view === "results") results();
    else if (engine.state.view === "navigator") navigator();
    else question();
    storageNotice();
  }
  function question() {
    const s = engine.state,
      q = engine.question(),
      answer = s.answers[q.id] || [],
      revealed = engine.revealed(q),
      multi = q.type === "multiple";
    const done = engine
      .questions()
      .filter((x) =>
        s.mode === "learning" ? s.checked[x.id] : engine.complete(x),
      ).length;
    main.innerHTML = `<div class="question-toolbar"><div><p class="eyebrow">${s.submitted ? "ANSWER REVIEW" : s.retry ? "MISTAKE REVIEW" : "MOCK EXAM 0" + s.exam}</p><h2>Question ${s.index + 1}<span> / ${s.ids.length}</span></h2></div><div class="actions compact">${button(s.flagged[q.id] ? "⚑ Flagged" : "⚐ Flag for later", "flag", "secondary small", `aria-pressed="${!!s.flagged[q.id]}" ${s.submitted ? "disabled" : ""}`)}${button("Question map", "map", "secondary small")}</div></div><div class="question-progress"><div class="bar" role="progressbar" aria-label="${s.mode === "learning" ? "Checked" : "Answered"} questions" aria-valuemin="0" aria-valuemax="${s.ids.length}" aria-valuenow="${done}"><i style="width:${(100 * done) / s.ids.length}%"></i></div><span>${done} ${s.mode === "learning" ? "checked" : "answered"}</span></div>
    <article class="question"><p class="question-type">${multi ? `MULTIPLE RESPONSE · SELECT ${q.a.length === 2 ? "TWO" : q.a.length === 3 ? "THREE" : q.a.length}` : "MULTIPLE CHOICE · SELECT ONE"}</p><div class="scenario">${q.sc
      .split("\n\n")
      .map((p) => `<p>${esc(p)}</p>`)
      .join(
        "",
      )}</div><h1 class="question-title">${esc(q.q)}</h1><div class="options" role="group" aria-label="Answer choices">${s.optionOrder[
      q.id
    ]
      .map((oi, i) => {
        const selected = answer.includes(oi),
          right = q.a.includes(oi);
        return `<button class="option ${selected ? "selected" : ""} ${revealed && right ? "correct" : ""} ${revealed && selected && !right ? "incorrect" : ""}" data-action="select" data-option="${oi}" aria-pressed="${selected}" ${revealed ? "disabled" : ""}><span class="choice-letter">${String.fromCharCode(65 + i)}</span><span>${esc(q.o[oi])}${revealed && right ? '<b class="choice-status">✓ Correct answer</b>' : revealed && selected ? '<b class="choice-status">Your selection</b>' : ""}</span><span class="choice-mark ${multi ? "square" : ""}" aria-hidden="true">${selected ? "✓" : ""}</span></button>`;
      })
      .join("")}</div>
    ${
      !revealed
        ? `<fieldset class="confidence"><legend>How confident are you? <span>Optional · does not affect your score</span></legend>${[
            ["confident", "Confident"],
            ["guess", "Educated guess"],
            ["unsure", "Unsure"],
          ]
            .map(
              ([v, t]) =>
                `<label><input type="radio" name="confidence" value="${v}" ${s.confidence[q.id] === v ? "checked" : ""}>${t}</label>`,
            )
            .join("")}</fieldset>`
        : ""
    }
    ${s.mode === "learning" && !revealed ? `<div class="check-row">${button("Check answer & learn →", "check", "", engine.complete(q) ? "" : "disabled")}<span>${multi ? `${answer.length} of ${q.a.length} selected. ` : ""}Checking locks your first answer.</span></div>` : ""}
    ${revealed ? lesson(q) : ""}</article><nav class="question-nav" aria-label="Question navigation">${button("← Previous", "prev", "secondary", s.index === 0 ? "disabled" : "")}${button(s.submitted ? "Results" : "Review & submit", s.submitted ? "results" : "map", "secondary")}${button(s.index === s.ids.length - 1 ? "Question map →" : "Next question →", s.index === s.ids.length - 1 ? "map" : "next")}</nav><p class="keyboard-note">Keyboard: A–E choose · ← / → navigate · F flag. Your answers are saved automatically.</p>`;
  }
  function wrap(text, max) {
    const lines = [];
    let line = "";
    for (const word of text.split(/\s+/)) {
      if ((line + " " + word).trim().length > max && line) {
        lines.push(line);
        line = word;
      } else line = (line + " " + word).trim();
    }
    if (line) lines.push(line);
    return lines;
  }
  function diagram(q, mobile) {
    const id = q.id + (mobile ? "m" : "d"),
      w = mobile ? 360 : 880,
      boxW = mobile ? 340 : 202;
    const boxH = Math.max(
      mobile ? 140 : 208,
      ...q.diagram.steps.map(
        (s) =>
          55 +
          wrap(s.title, mobile ? 32 : 21).length * 19 +
          9 +
          wrap(s.detail, mobile ? 40 : 24).length * 18 +
          12,
      ),
    );
    const gap = 30,
      h = mobile ? 4 * boxH + 3 * gap + 16 : boxH + 32;
    return `<svg class="concept-svg ${mobile ? "mobile-diagram" : "desktop-diagram"}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title-${id} desc-${id}"><title id="title-${id}">${esc(q.diagram.title)}</title><desc id="desc-${id}">${esc(q.diagram.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.detail}`).join(" "))}</desc><defs><marker id="arrow-${id}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="none" stroke="#258a79" stroke-width="1.7"/></marker></defs>${q.diagram.steps
      .map((s, i) => {
        const x = mobile ? 10 : 8 + i * 221,
          y = mobile ? 6 + i * (boxH + gap) : 12,
          lines = wrap(s.title, mobile ? 32 : 21),
          details = wrap(s.detail, mobile ? 40 : 24),
          titleY = y + 55;
        return `${i < 3 ? `<path d="${mobile ? `M180 ${y + boxH + 3} V${y + boxH + gap - 3}` : `M${x + boxW + 2} ${12 + boxH / 2} H${x + 218}`}" stroke="#258a79" stroke-width="2" fill="none" marker-end="url(#arrow-${id})"/>` : ""}<rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="13" fill="${i === 3 ? "#ddf4e9" : "#ffffff"}" stroke="${i === 3 ? "#73b69f" : "#cbdedb"}"/><circle cx="${x + 25}" cy="${y + 25}" r="12" fill="${i === 3 ? "#166854" : "#e7f1f0"}"/><text x="${x + 25}" y="${y + 29}" text-anchor="middle" font-size="12" font-weight="700" fill="${i === 3 ? "#fff" : "#166854"}">${i + 1}</text><text x="${x + 16}" y="${titleY}" font-size="15" font-weight="700" fill="#123b37">${lines.map((l, j) => `<tspan x="${x + 16}" dy="${j ? 19 : 0}">${esc(l)}</tspan>`).join("")}</text><text x="${x + 16}" y="${titleY + lines.length * 19 + 9}" font-size="13" fill="#3b5e5b">${details.map((l, j) => `<tspan x="${x + 16}" dy="${j ? 18 : 0}">${esc(l)}</tspan>`).join("")}</text>`;
      })
      .join("")}</svg>`;
  }
  function lesson(q) {
    const viewed = engine.read("viewed", {});
    viewed[q.id] = Date.now();
    engine.write("viewed", viewed);
    const s = engine.state,
      a = engine.gradedAnswer(q),
      ok = engine.correct(q, a),
      selectedWrong = a.filter((i) => !q.a.includes(i)),
      missed = q.a.filter((i) => !a.includes(i));
    return `<section class="learning" aria-label="Answer explanation"><div class="learning-heading"><span class="result-chip ${ok ? "good" : "bad"}">${ok ? "✓ Correct" : a.length ? "Let’s work through this" : "Not answered / not checked"}</span><span>Domain ${q.d} · Task ${q.t}</span></div><h2>${esc(q.diagram.title)}</h2><div class="clue"><strong>The decisive clue</strong><p>${esc(q.clue)}</p></div>
    ${!ok && a.length ? `<div class="diagnosis"><h3>Where your answer breaks down</h3>${selectedWrong.map((i) => `<p>${md(q.w[i])}</p>`).join("")}${missed.length ? `<p><strong>${missed.length === 1 ? "Missing correct choice" : "Missing correct choices"}:</strong> ${missed.map((i) => esc(q.o[i])).join(" · ")}</p>` : ""}</div>` : ""}
    <figure class="concept-figure"><figcaption><span>VISUAL WALKTHROUGH</span> Follow the decision, step by step.</figcaption>${diagram(q, false)}${diagram(q, true)}</figure>
    <div class="answer-explanation"><h3>Why this answer works</h3><p>${md(q.e)}</p></div><details class="option-reasons" ${ok ? "" : "open"}><summary>Why every option is right or wrong</summary>${s.optionOrder[q.id].map((oi, i) => `<article class="reason ${q.a.includes(oi) ? "right-reason" : ""}"><div><span class="reason-letter">${String.fromCharCode(65 + i)}</span><strong>${q.a.includes(oi) ? "Correct" : "Incorrect"}${a.includes(oi) ? " · your selection" : ""}</strong></div><p class="option-quote">${esc(q.o[oi])}</p><p>${md(q.w[oi])}</p></article>`).join("")}</details>
    ${serviceGuide(q)}<div class="sources"><h3>Check the AWS documentation</h3>${q.refs
      .map((k) => {
        const r = window.SOURCES[k];
        return `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)} <span aria-hidden="true">↗</span></a>`;
      })
      .join(
        "",
      )}<small>References checked 3 October 2026.</small></div></section>`;
  }
  function learningProgress() {
    const viewed = engine.read("viewed", {}),
      labs = engine.read("labs", {});
    const seen = engine.bank.filter((q) => viewed[q.id]);
    const skills = new Set(seen.map((q) => q.s)),
      done = Object.keys(window.GUIDES).filter((t) => labs[t]).length;
    return `<details class="info learning-progress"><summary>Your learning coverage · ${seen.length}/375 lessons opened · ${done}/20 exercises completed</summary><p>Opening a lesson records exposure, not mastery. Use a fresh timed exam, explain the tradeoffs without looking, and verify the practical result before marking an exercise complete.</p><p><strong>${skills.size}/98 skills encountered in reviewed questions.</strong> The five sets collectively cover the listed blueprint skills; they cannot predict every live exam question or replace hands-on experience.</p><div class="table-scroll"><table><thead><tr><th>Task</th><th>Lessons opened</th><th>Practical exercise</th></tr></thead><tbody>${Object.entries(
      window.GUIDES,
    )
      .map(
        ([t, g]) =>
          `<tr><td>${esc(t)} · ${esc(g.title)}</td><td>${seen.filter((q) => q.t === t).length}/${engine.bank.filter((q) => q.t === t).length}</td><td>${labs[t] ? "✓ Completed" : "Not marked complete"}</td></tr>`,
      )
      .join(
        "",
      )}</tbody></table></div><p>Progress is stored only in this browser. Each question unlocks its task's theory and exercise after you check the answer or submit the timed exam.</p></details>`;
  }
  function serviceGuide(q) {
    const g = window.GUIDES[q.t],
      done = !!engine.read("labs", {})[q.t];
    return `<section class="service-guide"><p class="eyebrow">UNDERSTAND THE SERVICES · TASK ${esc(q.t)}</p><h3>${esc(g.title)}</h3><p class="guide-goal">${esc(g.goal)}</p><details class="theory"><summary>Concepts, theory & how the services work</summary>${g.concepts.map((c) => `<article><h4>${esc(c.heading)}</h4><p>${md(c.text)}</p></article>`).join("")}<div class="business-example"><h4>Apply it in a business</h4><p>${esc(g.business)}</p></div><div class="guide-references">${g.refs.map((k) => `<a href="${esc(window.SOURCES[k].url)}" target="_blank" rel="noopener">${esc(window.SOURCES[k].title)} ↗</a>`).join("")}</div></details><details class="console-lab"><summary>Practice in AWS · ${esc(g.lab.title)}</summary><p class="lab-intro">A guided sandbox exercise for this task. This page does not connect to your AWS account or create resources. Console labels, service availability and pricing can change; use the linked documentation for the selected Region.</p><h4>Before you start</h4><p>${esc(g.lab.prerequisites)}</p><ol>${g.lab.steps.map((x) => `<li>${md(x)}</li>`).join("")}</ol>${g.lab.code ? `<h4>${esc(g.lab.code.title)}</h4><p class="muted">Use an up-to-date AWS CLI v2 in CloudShell where applicable. Replace sandbox identifiers and select the intended Region. Running calls can incur charges.</p><pre class="lab-code" tabindex="0" aria-label="Practice code"><code>${esc(g.lab.code.text)}</code></pre>` : ""}<div class="verify-box"><h4>Verify your result</h4><p>${esc(g.lab.verify)}</p></div><h4>Clean up</h4><p>${esc(g.lab.cleanup)}</p><label class="lab-complete"><input type="checkbox" data-lab="${esc(q.t)}" ${done ? "checked" : ""}> I completed this exercise and verified the result.</label></details><div class="recall"><h4>Explain it without looking</h4><p>What requirement decides this answer? Describe each step in the diagram, where authorization is enforced, and what you would measure to prove it works. Then explain why the closest alternative fails this scenario.</p></div></section>`;
  }
  function navigator() {
    const s = engine.state,
      qs = engine.questions(),
      done = qs.filter((q) =>
        s.mode === "learning" ? s.checked[q.id] : engine.complete(q),
      ).length,
      flags = qs.filter((q) => s.flagged[q.id]).length;
    const visible = (q) =>
      navFilter === "all" ||
      (navFilter === "flagged" && s.flagged[q.id]) ||
      (navFilter === "unanswered" &&
        !(s.mode === "learning" ? s.checked[q.id] : engine.complete(q))) ||
      (navFilter === "wrong" &&
        s.submitted &&
        !engine.correct(q, engine.gradedAnswer(q)));
    main.innerHTML = `<section class="panel navigator"><p class="eyebrow">MOCK EXAM ${s.exam} · ${s.submitted ? "ANSWER REVIEW" : "YOUR PROGRESS"}</p><h1>Question map</h1><p>${done} ${s.mode === "learning" ? "checked" : "answered"} · ${qs.length - done} ${s.mode === "learning" ? "not checked" : "incomplete"} · ${flags} flagged</p><label class="filter-label">Show <select id="nav-filter">${[["all", "All questions"], ["flagged", "Flagged"], ["unanswered", s.mode === "learning" ? "Not checked" : "Unanswered / incomplete"], ...(s.submitted ? [["wrong", "Incorrect"]] : [])].map(([v, t]) => `<option value="${v}" ${v === navFilter ? "selected" : ""}>${t}</option>`).join("")}</select></label><div class="nav-grid">${
      qs
        .map((q, i) => ({ q, i }))
        .filter(({ q }) => visible(q))
        .map(({ q, i }) => {
          const completed =
              s.mode === "learning" ? s.checked[q.id] : engine.complete(q),
            correct = engine.correct(q, engine.gradedAnswer(q));
          return `<button data-action="jump" data-index="${i}" class="nav-cell ${completed ? "answered" : ""} ${s.flagged[q.id] ? "flagged" : ""} ${s.submitted ? (correct ? "nav-correct" : "nav-wrong") : ""}" aria-label="Question ${i + 1}, ${s.submitted ? (correct ? "correct" : "incorrect") : completed ? "complete" : "incomplete"}${s.flagged[q.id] ? ", flagged" : ""}">${i + 1}${s.flagged[q.id] ? "<span>⚑</span>" : ""}</button>`;
        })
        .join("") || "<p>No questions match this filter.</p>"
    }</div><p class="muted">${s.submitted ? "Green = correct · red = incorrect" : "Filled = complete · gold underline = flagged"}. Select a question to open it.</p><div class="actions">${button("Back to question", "return", "secondary")}${button(s.submitted ? "View results" : "Submit exam", s.submitted ? "results" : "submit")}</div></section>`;
  }
  function results() {
    const s = engine.state,
      r = engine.score(),
      confidentWrong = engine
        .questions()
        .filter(
          (q) =>
            s.confidence[q.id] === "confident" &&
            !engine.correct(q, engine.gradedAnswer(q)),
        );
    main.innerHTML = `<section class="results panel"><div><p class="eyebrow">MOCK EXAM ${s.exam} · ${s.mode === "exam" ? "TIMED RESULT" : "FIRST CHECKED ANSWERS"}${s.retry ? " · MISTAKE REVIEW" : ""}</p><h1>${r.percent}<span>%</span></h1><h2>${r.correct} of ${r.total} correct</h2><p>${r.percent >= 80 ? "A strong practice result. Use an unseen timed mock to check recall." : "Use the explanations to understand the constraints you missed."}</p><p class="muted">Raw practice accuracy. AWS’s 750/1,000 passing score is a scaled score, not 75% raw accuracy. All questions here are graded; multiple-response questions require the exact set.</p></div><div class="result-actions">${button("Review all explanations →", "review-all")}${button(`Review mistakes (${r.wrong.length})`, "review-wrong", "secondary", r.wrong.length ? "" : "disabled")}${button("Retry these mistakes", "retry", "secondary", r.wrong.length ? "" : "disabled")}${button("Back to five exams", "home", "text-button")}</div></section>
    <section class="domain-results"><div class="section-heading"><div><p class="eyebrow">WHAT TO WORK ON NEXT</p><h2>Your domain breakdown</h2></div></div>${B.domains
      .map((d) => {
        const row = r.domains[d.id];
        if (!row) return "";
        const percent = Math.round((100 * row.correct) / row.total);
        return `<article><div><span class="domain-index">0${d.id}</span><div><h3>${esc(d.short)}</h3><p>${d.weight}% of the official scored blueprint</p></div><strong>${row.correct}/${row.total}</strong></div><div class="bar"><i style="width:${percent}%"></i></div></article>`;
      })
      .join("")}</section>
    ${confidentWrong.length ? `<section class="panel misconception"><p class="eyebrow">REVISIT THESE ASSUMPTIONS</p><h2>${confidentWrong.length} confident ${confidentWrong.length === 1 ? "answer to revisit" : "answers to revisit"}</h2><p>You marked these confidently but missed the correct answer. Open a lesson to see the decisive clue.</p>${confidentWrong.map((q) => button(esc(q.diagram.title) + " →", "review-id", "review-link", `data-id="${q.id}"`)).join("")}</section>` : ""}`;
  }
  function tick() {
    const s = engine.state;
    if (!s || location.hash !== "#/session") {
      timer.textContent = "";
      return;
    }
    if (s.submitted) {
      timer.textContent = "Complete";
      timer.className = "";
      return;
    }
    if (s.mode === "learning") {
      timer.textContent = "Untimed";
      timer.className = "";
      return;
    }
    const secs = engine.remaining(),
      h = Math.floor(secs / 3600);
    timer.textContent = `${h}:${String(Math.floor((secs % 3600) / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
    timer.className = secs <= 600 ? "urgent" : "";
  }
  function route() {
    if (location.hash === "#/session" && engine.state) session();
    else {
      if (location.hash !== "#/") history.replaceState(null, "", "#/");
      home();
    }
    tick();
  }
  main.addEventListener("click", (event) => {
    const b = event.target.closest("button[data-action]");
    if (!b || b.disabled) return;
    const action = b.dataset.action,
      s = engine.state;
    if (action === "start") {
      start(+b.dataset.exam);
      return;
    }
    if (action === "home") {
      location.hash = "#/";
      return;
    }
    if (action === "resume") {
      location.hash = "#/session";
      return;
    }
    if (!s) return;
    if (engine.expired()) {
      engine.submit();
      session();
      announce("Time is up. Your exam was submitted.");
      return;
    }
    if (action === "select") {
      engine.select(+b.dataset.option);
      question();
      storageNotice();
      main
        .querySelector(`[data-option="${b.dataset.option}"]`)
        ?.focus({ preventScroll: true });
      return;
    }
    if (action === "check") {
      if (engine.check()) {
        question();
        storageNotice();
        announce("Answer checked. Your visual explanation is ready.");
        main
          .querySelector(".learning")
          .scrollIntoView({
            block: "start",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          });
      }
      return;
    }
    if (action === "flag") {
      s.flagged[engine.question().id] = !s.flagged[engine.question().id];
      save();
      question();
      return;
    }
    if (action === "next") engine.jump(s.index + 1);
    if (action === "prev") engine.jump(s.index - 1);
    if (action === "jump") engine.jump(+b.dataset.index);
    if (action === "map") {
      s.view = "navigator";
      navFilter = "all";
    }
    if (action === "return") s.view = "question";
    if (action === "results") s.view = "results";
    if (action === "review-all") engine.jump(0);
    if (action === "review-wrong") {
      s.view = "navigator";
      navFilter = "wrong";
    }
    if (action === "review-id") engine.jump(s.ids.indexOf(b.dataset.id));
    if (action === "retry") {
      start(s.exam, engine.score().wrong);
      return;
    }
    if (action === "submit") {
      const incomplete = engine
        .questions()
        .filter((q) =>
          s.mode === "learning" ? !s.checked[q.id] : !engine.complete(q),
        ).length;
      document.querySelector("#confirm-copy").textContent =
        `${incomplete} question${incomplete === 1 ? " is" : "s are"} ${s.mode === "learning" ? "not checked" : "unanswered or incomplete"} and will score as incorrect. Submission locks this attempt and unlocks all explanations.`;
      dialog.showModal();
      return;
    }
    save();
    session();
    focus();
  });
  main.addEventListener("change", (event) => {
    if (event.target.dataset.lab) {
      const labs = engine.read("labs", {});
      labs[event.target.dataset.lab] = event.target.checked;
      engine.write("labs", labs);
      storageNotice();
      announce(
        event.target.checked
          ? "Exercise marked complete."
          : "Exercise marked incomplete.",
      );
    }
    if (event.target.name === "mode") {
      mode = event.target.value;
      engine.write("mode", mode);
      home();
      main.querySelector(`input[name="mode"][value="${mode}"]`).focus();
    }
    if (event.target.name === "confidence") {
      engine.setConfidence(event.target.value);
      storageNotice();
    }
    if (event.target.id === "nav-filter") {
      navFilter = event.target.value;
      navigator();
      main.querySelector("#nav-filter").focus();
    }
  });
  document
    .querySelector("#cancel-submit")
    .addEventListener("click", () => dialog.close());
  document.querySelector("#confirm-submit").addEventListener("click", () => {
    dialog.close();
    engine.submit();
    session();
    focus();
  });
  document.addEventListener("keydown", (event) => {
    if (
      dialog.open ||
      location.hash !== "#/session" ||
      engine.state?.view !== "question" ||
      event.target.closest("input,select,textarea") ||
      event.ctrlKey ||
      event.altKey ||
      event.metaKey
    )
      return;
    const key = event.key.toLowerCase(),
      s = engine.state;
    if (/^[a-e]$/.test(key) && !engine.revealed(engine.question())) {
      const idx = s.optionOrder[engine.question().id][key.charCodeAt(0) - 97];
      if (idx !== undefined) {
        event.preventDefault();
        engine.select(idx);
        question();
        storageNotice();
      }
    } else if (["arrowright", "arrowleft"].includes(key)) {
      event.preventDefault();
      engine.jump(s.index + (key === "arrowright" ? 1 : -1));
      session();
      focus();
    } else if (key === "f" && !s.submitted) {
      s.flagged[engine.question().id] = !s.flagged[engine.question().id];
      save();
      question();
    }
  });
  function expiryCheck() {
    if (engine.expired()) {
      engine.submit();
      dialog.close();
      route();
      announce("Time is up. Your exam was submitted.");
    }
    tick();
  }
  window.addEventListener("hashchange", () => {
    route();
    focus();
  });
  window.addEventListener("pagehide", () => {
    if (engine.state) engine.save();
  });
  document.addEventListener("visibilitychange", expiryCheck);
  setInterval(expiryCheck, 500);
  engine.restore();
  route();
});
