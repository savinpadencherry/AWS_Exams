# AWS AI Practitioner: Practice & Learn

[Open the exam app](https://savinpadencherry.github.io/AWS_Exams/)

Five mixed, 65-question AIF-C01 practice exams. Every exam covers all five domains with 13 / 16 / 18 / 9 / 9 questions, approximating the published 20% / 24% / 28% / 14% / 14% blueprint. Timed attempts shuffle question order and answer positions. Learning attempts preserve question order and shuffle answer positions.

## Learning workflow

1. Choose **Learn at my pace** and commit a complete answer with **Check answer & learn**.
2. Read the plain-language concept, concrete example and question-specific explanation.
3. Inspect the relevant original concept/architecture diagram. Mobile versions remain readable; enlarge for more detail.
4. Inspect each alternative, then answer the recall question before revealing its answer.
5. Use the AWS reference and console navigation guide where applicable.
6. Retry missed questions from the dashboard. A correct fresh retry clears a question from the revision queue.

58 original topic lessons and 116 desktop/mobile SVG assets support the 325 items. Visuals are teaching diagrams, **not screenshots of the AWS console**. The previous generic console mockups and unrelated diagrams are no longer part of the app.

## Exam behavior

- 90-minute wall-clock deadline, including time away from the tab; refresh cannot reset it.
- Untimed learning, explicit answer check, and locked first-check results.
- Single choice, multiple response, ordering and matching in each exam.
- Exact-match scoring without partial credit; incomplete questions count as incorrect.
- Flagging, question navigator and final submission review.
- Answers hidden during a timed attempt, with explanations available afterward.
- Immutable submitted results, per-domain raw accuracy, saved attempts and mistake retries.
- Local browser storage only; no account, API keys, backend or paid runtime services.

AWS uses 50 scored questions plus 15 unidentified unscored questions, and a scaled 100–1000 score with a 700 passing mark. AWS does **not** publish a raw-percentage conversion. This app scores **all 65 practice questions** equally and reports raw accuracy. Its 80% study target is arbitrary guidance, not an AWS passing score. The questions are independent practice content, not real exam items or predictions. Difficulty has not been psychometrically calibrated. Some retained technical questions extend beyond foundational exam scope.

## Run and test

No installation or build step is required.

```sh
python3 -m http.server 8000
node --test tests/exam.test.cjs
```

Open `http://localhost:8000`. GitHub Pages publishes the repository root from `main` using the existing Pages configuration.

## Hands-on AWS business labs

The optional [lab program](labs/README.md) adds business scenarios and a local AWS API sandbox to the quiz app. Start with a gadget shop's support-ticket system, then learn evaluation, prompting, RAG, responsible AI, and security through decisions and experiments. LocalStack emulates selected AWS services; it is not the full AWS Console or a substitute for real model evaluation.

On **Windows 11 x64**, clone this repository, open PowerShell in its folder, and run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\labs\setup-windows.ps1
```

This process-only execution policy option does not change your saved PowerShell policy. The installer sets up WSL2 and Ubuntu 24.04, Docker Engine, AWS CLI, and the pinned LocalStack image. On a fresh Windows machine, accept the administrator prompt if requested, restart when instructed, then rerun the same command. Enter your own LocalStack token at the hidden local prompt; no token is included in this repository. Obtain an account/license through [LocalStack](https://app.localstack.cloud/) or its [GitHub Student offer](https://www.localstack.cloud/localstack-for-students).

Setup verifies the license, CPU/RAM limits, and S3/DynamoDB round trips, then **stops the lab**. It can be rerun and reuses installed tools and the saved token. The quiz app remains independently available without Docker.

```powershell
.\labs\lab.ps1 start    # Start a study session
.\labs\lab.ps1 smoke    # Verify local storage
.\labs\lab.ps1 status   # Inspect resource usage
.\labs\lab.ps1 stop     # Remove disposable resources and stop the VM
```

Budget: LocalStack **1 CPU / 2 GiB RAM**; WSL **2 virtual CPUs / 4 GiB RAM / 1 GiB swap**; new Ubuntu disk maximum **28 GiB**. Only S3/DynamoDB run initially. No model downloads or automatic startup. WSL settings are global: the installer backs up existing `.wslconfig`, preserves unrelated settings, and asks you to close other running WSL distributions before applying limits. Windows files and swap are additional to the disk ceiling. See [setup details](labs/INSTALL.md) and [your first lesson](labs/START-HERE.md).

## Modules

- `js/data/exam*.js`: complete mixed exam banks, answer reasons and explicit lesson mappings.
- `js/lessons.js`: beginner explanations, examples, recall checks and reference links.
- `assets/lessons/`: original SVG teaching diagrams, with mobile layouts.
- `js/exam-engine.js`: session persistence, answer checking, timer deadline, scoring and revision queue.
- `js/app.js`: accessible browser UI and event handling.
- `css/app.css`: responsive layout and lesson presentation.
- `tests/exam.test.cjs`: bank validation and engine regression tests, using Node's built-in test runner.

Progress from the older app is not migrated because its score formula and answer-reveal behavior made results incomparable. The old storage key is left untouched. Clearing browser storage removes local progress; progress does not sync between devices.

## Sources and review

Reviewed 24 September 2026 against the [current AWS AIF-C01 guide](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html), its five domain pages and relevant AWS service documentation. Each lesson provides its own source. See [REVIEW.md](REVIEW.md) for the audit findings and limitations.

This independent practice app is not affiliated with AWS or Pearson VUE. No proprietary exam interface, actual exam questions or leaked question banks are used.
