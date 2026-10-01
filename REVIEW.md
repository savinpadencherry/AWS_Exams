# Review notes: AIP-C01 rebuild (1 October 2026)

## What changed

The AIF-C01 practitioner app (5 × 65 questions, ordering/matching items, 90-minute timer, 58 generated SVG lessons) was replaced with an AIP-C01 program. The previous exam banks, lesson data and SVG assets were removed. The engine was rewritten rather than patched because the exam format differs (75 questions, 180 minutes, multiple choice and multiple response only) and because progress is now tracked per question, skill and task rather than per attempt.

## Sources

- The **official AIP-C01 exam guide PDF** supplied by the learner: domains, weights, 20 tasks and their skills, scoring rules and the in-scope and out-of-scope service lists. Skill titles in `js/blueprint.js` are short paraphrases, not copies of the guide.
- **Published exam summaries** (via web search) for the 75-question, 180-minute format. Sources disagreed on duration (a beta used 205 minutes). The guide does not state it. Confirm when booking.
- AWS service behaviour is written from general knowledge of Amazon Bedrock, Knowledge Bases, Guardrails, Prompt Management, Prompt Flows, Agents, AgentCore, Strands Agents, MCP, SageMaker AI, OpenSearch, Step Functions and related services.

The sandbox that built this blocks `docs.aws.amazon.com`, so **reference links and fine-grained service claims were not re-verified against live documentation**. Treat the links as starting points. If a question's technical detail conflicts with current AWS docs, trust the docs and tell the maintainer.

## Quality work done

- Every question maps to a real task and skill in the blueprint; tests enforce this, plus option counts, per-option reasons, answer ranges and uniqueness.
- Found and fixed a serious authoring flaw: in the first draft the correct answer was the longest option in **94%** of single-choice items (median 3.7× the length of the wrong options), which lets a learner score well without the knowledge. All option sets were rewritten with plausible distractors (real services used in a way that breaks a stated constraint). The measured figures are now **68%** longest and a median length ratio of **1.17×**.
- Options are shuffled per attempt, so answer position carries no signal (a scripted "always click the first option" run scored chance level).
- Multiple-response items need the exact set; there is no partial credit, matching the real exam.

## Known limits

- The correct option is still a little more specific than its distractors on average (about 17% longer). Domains 4 and 5 are the most skewed. Do not use length as a strategy; it will not work on the real exam.
- Difficulty is not psychometrically calibrated. Some items are easier than the real exam, which uses longer, denser scenarios with several plausible answers.
- 306 questions is a practice bank, not a prediction. Domain 2 agent and MCP content and Domain 1 retrieval content are the deepest; Domain 4 and 5 have the fewest questions, in line with their weights.
- Features that changed recently (AgentCore, S3 Vectors, Automated Reasoning checks, Bedrock Data Automation, API Gateway response streaming, Kiro) are described conservatively. Check current availability and limits.
- The `labs/` folder is the earlier LocalStack lab program for the practitioner track and is untouched. LocalStack does not emulate Bedrock models, so it is of limited use for this exam.
- Browser storage is per browser; clearing site data resets progress.

## Validation

`node --test tests/exam.test.cjs` checks the blueprint, study modules, all questions, mock composition and non-overlap, the 180-minute persisted deadline, learning-mode locking, exact-match scoring, adaptive selection, immutability of results and corrupt-state handling. A Playwright run completed a full 75-question mock, review, dashboard, drills and mobile layout without console errors.
