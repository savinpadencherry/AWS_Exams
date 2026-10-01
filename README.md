# AWS Certified Generative AI Developer – Professional (AIP-C01): Study & Practice

A static, no-build study app that **teaches** the AIP-C01 blueprint and then tests it under exam conditions. It replaces the earlier AI Practitioner (AIF-C01) practice app.

Open `index.html` through any static server (or GitHub Pages). No account, backend, API key or paid service is needed; progress is stored in your browser only.

```sh
python3 -m http.server 8000      # then open http://localhost:8000
node --test tests/exam.test.cjs  # blueprint, bank and engine checks
```

## What is in it

| Area | What you get |
| --- | --- |
| **Study guide** | One module for each of the 20 tasks in the official guide (Tasks 1.1–5.2) plus an exam-strategy page. Each has the mental model, concepts with *exam traps*, comparison tables, a flow diagram, a "spot it in the exam" list and AWS references. |
| **Practice bank** | 306 original scenario questions (single choice and multiple response, as in the real exam), each tagged with domain, task and skill, with an explanation and a reason for every option. |
| **Timed mocks** | Four non-overlapping **75-question, 180-minute** mocks assembled in the blueprint weighting (23 / 20 / 15 / 9 / 8 questions across the five domains, about 31 / 26 / 20 / 12 / 11 %). Shuffled, answers hidden, flagging, navigator, persisted deadline and auto-submit. |
| **Drills** | 12-question drills per task, 15-question drills per domain, an adaptive 25-question mix that favours unseen and missed items, and a mistake-retry queue. |
| **Dashboard** | Readiness by domain (accuracy and coverage), weakest tasks, attempt history with raw and blueprint-weighted results, exam-date countdown. |
| **Rapid review** | Every comparison table, pattern and exam trap on one printable page. |
| **Services glossary** | All services the guide lists as in scope, with their role on this exam and common mix-ups, plus the out-of-scope list. |
| **7-day plan** | A week of study and practice steps to exam day with checkboxes. |

Keyboard shortcuts in a question: `A`–`F` select, `N` / `P` next / previous, `F` flag.

## Exam facts used

From the official exam guide (AIP-C01, 2026): domains and weights **31 / 26 / 20 / 12 / 11 %**, 65 scored plus 10 unscored questions, multiple choice and multiple response only, scaled score 100–1,000 with **750 to pass**, compensatory scoring, no penalty for guessing. The **75 questions in 180 minutes** logistics come from published exam summaries (the guide itself does not state the duration); confirm the time limit on AWS or Pearson VUE when you book.

AWS does not publish a raw-percentage-to-scaled-score conversion. This app reports raw accuracy and a blueprint-weighted percentage as study heuristics only. A steady 80%+ on unseen timed mocks is a sensible goal, not a guarantee.

## Layout

```
index.html              entry point
css/app.css             responsive layout, light/dark, print styles
js/blueprint.js         domains, tasks, skills (from the exam guide)
js/study/*.js           study modules
js/data/d*.js           question bank, by domain
js/services.js, plan.js glossary and 7-day plan
js/exam-engine.js       sessions, scoring, adaptive selection, persistence
js/app.js               router and UI
tests/exam.test.cjs     node:test checks for blueprint, bank, mocks and engine
labs/                   optional LocalStack labs from the earlier practitioner track
```

## Sources, scope and limits

See [REVIEW.md](REVIEW.md). This is independent practice material, not affiliated with AWS or Pearson VUE, and contains no real or leaked exam questions. AWS services change quickly: check the linked AWS documentation for current behaviour before relying on a detail.
