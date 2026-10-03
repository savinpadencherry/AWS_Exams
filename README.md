# GenAI Pro — AIP-C01 practice and learning

**[Open the five exams](https://savinpadencherry.github.io/AWS_Exams/)**

Five distinct, full-length mock exams for **AWS Certified Generative AI Developer – Professional (AIP-C01)**. The interface contains five exam choices and two modes; the previous drill, service-menu and study-plan clutter has been removed.

- **375 questions**, 75 per form, with 10–11 multiple-response questions in each.
- Every form covers all 20 blueprint tasks with domain counts **23 / 20 / 15 / 9 / 8**, approximating the official **31 / 26 / 20 / 12 / 11%** weights. The complete bank covers all **98 listed skills**.
- **Learning mode:** untimed; checking an answer locks the first response and reveals the decisive clue, selected-answer diagnosis, question-specific SVG diagram and reasoning for every option.
- **Timed mode:** 180-minute wall-clock deadline, shuffled questions and options, flags, question map and confidence tracking. Explanations remain hidden until submission; leaving the page does not pause the timer.
- **Deeper learning:** each question links directly to its task's service theory, practical business example and guided sandbox exercise. There are **20 task guides and 20 exercises**, including six CLI/Logs Insights examples, verification criteria and cleanup instructions.
- Results include raw accuracy, domain breakdown, confident mistakes and a retry of only missed questions. Lesson exposure and exercise completion persist separately from attempts.

## How to study

1. Start with Mock 1 in learning mode. Commit to an answer before reading the explanation.
2. For a mistake, identify the decisive constraint, follow the diagram and explain why the closest alternative fails.
3. Open the service theory and practical exercise. Use a sandbox account, check current pricing and verify the stated result before marking the exercise complete.
4. Use the next unseen mock in timed mode to check recall. Review failures, then retry mistakes for learning.
5. Revisit weak skills in the [coverage map](docs/COVERAGE.md). Build a small end-to-end project and measure a real business outcome.

Opening a lesson measures exposure, not mastery. The exercises are guidance: this static site does not access an AWS account, provision resources or verify that you performed the exercise. Some exercises intentionally use inspection and design work instead of creating costly endpoints. The `labs/` directory retains the repository's separate local lab materials; those are not a simulation of every real AWS service and are not needed to use the exams.

## Exam alignment and limits

The [official guide](https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html) specifies 75 questions over 180 minutes, including 65 scored and 10 unidentified unscored items. AWS reports a scaled score, with 750/1,000 required to pass. These mocks grade **all 75** and report **raw accuracy**; 75% raw is not an AWS passing-score conversion. Multiple-response grading requires the exact set with no partial credit.

These are independent practice scenarios, not official or recalled exam questions. The supplied screenshots informed scenario style and learning needs; AWS documentation was used to check service behavior. Difficulty is not psychometrically calibrated against the live exam. No finite question bank can promise every possible exam item, a pass, or production readiness without practical experience.

Sources and service behavior were reviewed on **3 October 2026**. Capabilities, Regions, quotas, model support, console labels and pricing change. See [research notes](docs/RESEARCH.md), [source checks](docs/source-audit.json) and [review notes](REVIEW.md).

## Run and verify locally

The deployed app is static HTML/CSS/JavaScript with no build step, backend, account, analytics or external diagram dependency.

```sh
python3 -m http.server 8000
# Open http://localhost:8000
```

In another terminal:

```sh
npm ci
npm test
npm run coverage
npx playwright install chromium
npm run test:browser
```

`BASE_URL` can select another HTTP server. `BROWSER_EXECUTABLE` optionally selects an installed Chromium binary. Browser checks render every question at desktop and mobile widths, check diagram bounds, and exercise learning, wrong-answer review, persistence, exact-set grading, submission, expiry and practical progress. Test screenshots are written to `/tmp`.

## Maintenance and deployment

- `js/blueprint.js`: domain, task and skill mapping.
- `js/data/mock-bank.js`: five fixed forms, option-level explanations, diagrams and sources.
- `js/study/guides.js`: service theory, business examples and sandbox exercises.
- `js/exam-engine.js`: session, grading, timing and storage logic.
- `js/app.js` and `css/app.css`: accessible responsive UI and inline SVG rendering.
- `scripts/coverage.cjs`: reproducible skill coverage report.

Edit the checked-in data directly, keep IDs stable, verify source claims and run the checks. Change the asset query version when releasing. GitHub Pages publishes from **`main` / repository root**; pushing a commit starts the existing Pages deployment.

Progress uses localStorage under `aip-pro-v2-` and does not sync between devices. The previous app's storage is not erased. Only the latest attempt retains complete answer review; history keeps the latest 30 result summaries. Starting a new attempt asks before replacing an unfinished attempt. Blocking or clearing browser storage affects persistence. This client-side study tool is not a secure proctored assessment; its answer data is available in the source.
