# Review: 24 September 2026

## Findings addressed

- Each original exam already contained all five domains, but section-oriented titles and domain-grouped presentation obscured that. All exams are now named as mixed practice exams; timed questions are shuffled and topic labels are hidden until review.
- Removed the unsupported `100 + rawAccuracy * 900` formula and false official/Pearson claims. Raw accuracy is reported with the real scoring distinction explained.
- Repaired malformed Exam 3 question 12, which had shifted fields and invalid options/answer keys.
- Multiple-response learning no longer reveals the key after the first click. Complete answers must be explicitly checked.
- Learning is untimed; submitted and checked answers are immutable. Review cannot inflate the saved score.
- Replaced decrement-only timing with a persisted deadline and automatic submission, including expiry while away.
- Replaced generic, often unrelated visual mappings and fabricated console screens with explicit per-question lesson mappings and original responsive teaching diagrams.
- Corrected responsible AI dimensions, outdated manual Bedrock access guidance, temperature determinism claims, watermark/C2PA conflation, cross-Region residency assumptions, PEFT guarantees, key-deletion timing and overbroad compliance/fairness conclusions.
- Added one ordering and one matching question per exam. Replaced selected trivia with context engineering, MCP, AgentCore, prompt versioning, distillation, LLM-as-a-judge, sustainability and intellectual-property-risk questions.
- Added first-check learning scores, per-domain diagnostics, a mistake queue, fresh retries and attempt history.
- Native buttons, select controls, modal dialogs, keyboard focus and mobile visual variants improve accessibility.

## Source use

The supplied presentation and PDF were extracted locally and used as cross-checking material. The supplied PDF appears to be an excerpt ending in the early AI-services discussion, not the complete book; the 100-slide deck covers more topics. Neither attachment is copied into this public repository. New explanatory prose, examples and diagrams were authored for this app.

Current primary references include:

- [Exam guide, question formats and scoring](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html)
- [AI/ML domain](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html)
- [Generative AI domain](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html)
- [Foundation model domain](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html)
- [Responsible AI domain](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html)
- [Security and governance domain](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html)
- [Responsible AI dimensions](https://aws.amazon.com/ai/responsible-ai/)
- [Bedrock model access](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html)
- [Cross-Region inference](https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html)
- [Titan image provenance](https://docs.aws.amazon.com/bedrock/latest/userguide/titan-image-models.html)
- [Bedrock AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)
- [Prompt Management](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html)
- [Model distillation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-distillation.html)

Service availability and console paths change. Current documentation limits Clarify and Model Monitor to existing customers; lessons flag this distinction. The exam may still require understanding their conceptual roles. Always consult the linked current AWS documentation before creating real resources.

## Limits

The bank remains independent authored practice, not a calibrated predictor of exam performance. Some inherited questions have simplistic distractors or more implementation detail than AIF-C01 requires. Repeated underlying concepts are intentional revision, and some inherited scenarios overlap. Matching/ordering tasks use accessible selection controls rather than duplicating a proprietary testing UI. Native SVG assets provide conceptual and architecture visuals; no live AWS account was used to capture console screenshots. All 65 items are scored for learning feedback rather than pretending to know which 15 real-exam items are unscored.

## Validation

`node --test tests/exam.test.cjs` checks all 325 items and asset mappings, blueprint counts, four question types, exact-match scoring, first-check locking, multi-response reveal gating, deadline persistence/expiry, immutable results, retry clearing and invalid state handling. Browser smoke checks cover the deployed learner flow separately.
