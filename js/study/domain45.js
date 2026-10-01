/* Domain 4 (12%) and Domain 5 (11%) study modules, plus the strategy guide. */
window.STUDY = window.STUDY || {};
Object.assign(window.STUDY, {
'4.1': {
  goal: 'Cut GenAI cost without losing quality: tokens, model tiers, throughput planning and caching.',
  big: 'FM cost is driven mainly by **tokens in and out** and by **which model** you call. Optimisation = send fewer tokens, use cheaper models when adequate, reuse work, and buy capacity the cheapest way that still meets requirements.',
  concepts: [
    { h: 'Token efficiency', p: '**Estimate and track** tokens (Bedrock exposes token counts in responses and CloudWatch; the `CountTokens` API can estimate before sending). Reduce **context size**: trim irrelevant retrieved chunks (rerank and send fewer), summarise or prune old conversation turns, **compress prompts** (remove verbosity, shorter instructions), set **response limits** (`maxTokens`, concise-answer instructions). Output tokens usually cost more than input tokens.' },
    { h: 'Cost-effective model selection', p: '**Tiered usage**: simple FAQ-style queries to a small, cheap model; complex reasoning to a larger one; use **cascading** or **Intelligent Prompt Routing**. Measure **price-to-performance**: cost per successful task, not price per token. Consider **distillation** to transfer a large model\'s skill into a small one for a high-volume task.' },
    { h: 'Throughput and capacity', p: '**Batch inference** for non-urgent bulk work (priced lower than on-demand). **Provisioned Throughput** when steady volume makes reserved capacity cheaper and more predictable than on-demand (right-size model units from measured token rates; do not leave idle). **Auto-scaling** for SageMaker endpoints and containers. **Capacity planning** from expected tokens per minute and peak concurrency; monitor utilisation to adjust.' },
    { h: 'Caching', p: '**Prompt caching** (Bedrock cache checkpoints) reuses the processed static prefix of a prompt (long system prompt, documents), cutting cost and latency on repeated prefixes; the cached portion must be an identical prefix and has a time-to-live. **Semantic caching** stores answers keyed by embedding similarity (ElastiCache/MemoryDB/OpenSearch) so near-duplicate questions skip the FM. **Exact-match / result fingerprinting** hashes a normalised deterministic request (model, params, prompt) as the key (DynamoDB/ElastiCache). **Edge caching** (CloudFront, API Gateway cache) serves repeated GET-style results close to users.', trap: 'Prompt caching helps with a repeated **prefix**; semantic caching avoids the model call entirely for similar **questions**. Caching personalised or sensitive answers across users is a security bug.' },
    { h: 'Visibility and governance of spend', p: 'Use **application inference profiles** and **cost allocation tags** to attribute spend per team/app. **Cost Explorer** analyses spend; **AWS Cost Anomaly Detection** alerts on unusual spikes (for example a runaway agent loop). Track tokens per request in CloudWatch and alarm on token bursts.' }
  ],
  tables: [{ title: 'Cost lever to savings mechanism', head: ['Lever', 'How it saves'], rows: [
    ['Fewer retrieved chunks / reranking', 'Fewer input tokens'],
    ['maxTokens + concise instruction', 'Fewer output tokens'],
    ['Prompt caching', 'Discounted, faster reads of repeated prefix'],
    ['Semantic/exact cache', 'Skip FM call entirely'],
    ['Smaller or routed model', 'Lower price per token'],
    ['Batch inference', 'Discount for async bulk'],
    ['Provisioned Throughput (steady load)', 'Predictable lower effective rate at volume']] }],
  flow: { title: 'Cost optimisation order', steps: [
    { t: 'Measure', d: 'Tokens and cost per task, by app/team' },
    { t: 'Shrink prompts', d: 'Prune context, compress, limit output' },
    { t: 'Cache', d: 'Prompt, semantic and exact caches' },
    { t: 'Right-size model', d: 'Tier/cascade/distil' },
    { t: 'Buy capacity wisely', d: 'On-demand, batch or provisioned' }] },
  patterns: [
    '"Same long system prompt on every call" → prompt caching.',
    '"Many users ask the same questions in different words" → semantic caching.',
    '"Nightly bulk processing, cost matters" → batch inference.',
    '"Spend spiked unexpectedly" → Cost Anomaly Detection + token metrics.',
    '"Attribute cost per team" → application inference profiles + tags.'],
  refs: [['Prompt caching', 'https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html'], ['Batch inference', 'https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html'], ['AWS Cost Anomaly Detection', 'https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html']]
},

'4.2': {
  goal: 'Make GenAI apps fast: latency, retrieval, throughput, inference parameters, resources and system-level tuning.',
  big: 'Performance work starts with **profiling** (where does the time go: retrieval, model, network?) then tackles the biggest contributor. Remember the trade-off triangle: **latency, cost, quality**.',
  concepts: [
    { h: 'Latency versus cost', p: '**Pre-compute** predictable answers (nightly summaries, popular queries). Use **latency-optimized inference** options for time-sensitive paths. Run **independent requests in parallel** (fan-out sub-questions, then merge). **Stream** to cut perceived latency. Benchmark each option; faster hardware or models cost more.' },
    { h: 'Retrieval performance', p: 'Tune the **index** (ANN parameters, shard count, quantization, only index what you need), **preprocess queries** (normalise, expand, extract filters), use **hybrid search with custom scoring**, retrieve fewer but better chunks (rerank), and cache frequent queries.' },
    { h: 'Throughput', p: '**Token processing optimisation** (shorter prompts, prompt caching), **batch inference** for offline work, and **concurrency management** (bounded worker pools, SQS to buffer, respect Bedrock quotas, Provisioned Throughput or cross-Region inference for more headroom).' },
    { h: 'Inference parameters', p: '**Temperature** scales randomness: low (0 to 0.3) for factual, extraction, code and classification; higher for creative. **Top-p** (nucleus) samples from the smallest set of tokens whose cumulative probability reaches p; **top-k** limits choices to the k most likely tokens. Change one at a time, prefer adjusting temperature **or** top-p, and **A/B test** against your evaluation set. Lower temperature increases consistency but does not guarantee identical output or factual correctness.', trap: 'Parameters are **model-specific**; confirm which a model supports. Temperature 0 is not a hallucination fix.' },
    { h: 'Resource allocation and system performance', p: 'Plan capacity from **token rates** (input and output per request × request rate). Monitor **utilisation** and scale on GenAI-aware signals (queue depth, concurrent requests, tokens per minute, GPU utilisation) rather than only CPU. **Profile API calls** (prompt vs completion size, time to first token, total duration), optimise **vector DB queries**, reduce service hops, reuse connections and co-locate components in the same Region.' }
  ],
  tables: [{ title: 'Symptom to lever', head: ['Symptom', 'First lever'], rows: [
    ['Users stare at blank screen', 'Streaming'],
    ['Slow retrieval step', 'Index tuning, fewer results, hybrid + filters, cache'],
    ['429 throttling at peak', 'Backoff, quota increase/Provisioned Throughput, cross-Region inference, queue'],
    ['Inconsistent extraction output', 'Lower temperature, structured output, few-shot'],
    ['Long end-to-end time from several lookups', 'Parallel requests']] }],
  flow: { title: 'Performance tuning loop', steps: [
    { t: 'Profile', d: 'X-Ray, logs: retrieval vs model vs network' },
    { t: 'Fix biggest cost', d: 'Index, prompt size, model, parallelism' },
    { t: 'Tune parameters', d: 'Temperature/top-p/top-k per use case' },
    { t: 'A/B test', d: 'Compare on evaluation set' },
    { t: 'Re-measure', d: 'Quality, latency, cost together' }] },
  patterns: [
    '"Reduce perceived latency" → streaming.',
    '"Deterministic, consistent output" → low temperature + schema (not a guarantee).',
    '"Autoscale on what?" → tokens/queue depth/concurrency, not just CPU.',
    '"Evaluate parameter change" → A/B test on evaluation set.'],
  refs: [['Inference parameters', 'https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html'], ['Latency-optimized inference', 'https://docs.aws.amazon.com/bedrock/latest/userguide/latency-optimized-inference.html']]
},

'4.3': {
  goal: 'Observe GenAI systems end to end: metrics, traces, logs, GenAI KPIs, tools, vector stores and novel failure modes.',
  big: 'Traditional monitoring (CPU, errors) is necessary but not enough. GenAI needs **token usage, latency, quality, hallucination and drift** signals plus **content-level logs** and **traces** across multi-step chains and agents.',
  concepts: [
    { h: 'Holistic observability', p: '**CloudWatch** `AWS/Bedrock` metrics: invocations, latency, client/server errors, throttles, input/output token counts. **Tracing** with X-Ray (or OpenTelemetry) across API Gateway, Lambda, Bedrock, retrieval and tools. **Custom business metrics** (resolution rate, conversion, escalation rate) on **dashboards** (CloudWatch dashboards, Managed Grafana). **Model invocation logging** to S3/CloudWatch Logs captures full prompts and responses (disabled by default; enable deliberately and protect, because it can contain sensitive data).' },
    { h: 'GenAI-specific KPIs', p: 'Track **token usage** (and cost), **prompt effectiveness** (task success rate per prompt version), **hallucination rate** (judge/grounding scores), **response quality** and **response drift** (embedding distance or score shift versus a baseline), plus **anomaly detection** for token bursts (CloudWatch anomaly detection alarms) and **cost anomalies** (Cost Anomaly Detection). Use **Logs Insights** on invocation logs for detailed request/response analysis and benchmarking.' },
    { h: 'Integrated observability and audit', p: 'Combine dashboards, **compliance monitoring**, **forensic traceability** (trace ID linking a user request to prompts, retrieved chunks, tool calls and the answer) and **audit logging** (CloudTrail), plus user-interaction and model-behaviour pattern tracking, so any answer can be reconstructed later.' },
    { h: 'Tool and multi-agent performance', p: 'Instrument tool calls: **call counts, latency, error rates, retries, parameter-validation failures** per tool, with **usage baselines** to flag anomalies (a tool suddenly called 50 times per request = loop). For multi-agent systems, trace **agent-to-agent hand-offs** and coordination. AgentCore Observability and Bedrock agent traces provide this data.' },
    { h: 'Vector store operations', p: 'Monitor **query latency, recall/relevance, indexing lag, storage and CPU/memory** (OpenSearch/Aurora metrics), schedule **index optimisation** (merges, reindex after embedding model changes), and run **data quality validation** (duplicates, stale or empty chunks, missing metadata).' },
    { h: 'Failure modes unique to GenAI', p: 'Use **golden datasets** (fixed inputs with reference answers) to detect hallucination and regressions on every change; **output diffing** to compare responses across model or prompt versions for **consistency**; **reasoning path tracing** to find where an agent\'s logic went wrong; specialised pipelines that sample production traffic into an evaluation queue.' }
  ],
  tables: [{ title: 'Signal to tool', head: ['Signal', 'Tool'], rows: [
    ['Latency, errors, throttles, token counts', 'CloudWatch metrics (AWS/Bedrock)'],
    ['Full prompt/response content', 'Model invocation logging + Logs Insights'],
    ['Where time is spent across services', 'X-Ray / OpenTelemetry'],
    ['Who changed or called what', 'CloudTrail'],
    ['Cost spike', 'Cost Anomaly Detection / Cost Explorer'],
    ['Hallucination / quality drift', 'Golden dataset + judge evaluations on a schedule'],
    ['Probe the app from outside', 'CloudWatch Synthetics canaries']] }],
  flow: { title: 'Observability stack', steps: [
    { t: 'Emit', d: 'Metrics, traces, invocation logs, tool logs' },
    { t: 'Correlate', d: 'Trace ID across request, retrieval, tools' },
    { t: 'Evaluate', d: 'Golden dataset + judge scores' },
    { t: 'Alert', d: 'Anomaly alarms on tokens, quality, cost' },
    { t: 'Act', d: 'Dashboard, runbook, automated remediation' }] },
  patterns: [
    '"Need to see exact prompts and responses" → model invocation logging.',
    '"Token usage spiked, find which app" → CloudWatch metrics by inference profile + cost tags.',
    '"Detect hallucination regressions after a change" → golden dataset.',
    '"Compare outputs between model versions" → output diffing.',
    '"Agent loops calling a tool repeatedly" → tool call-pattern baselines.'],
  refs: [['Bedrock CloudWatch metrics', 'https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring.html'], ['Model invocation logging', 'https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html'], ['CloudWatch Synthetics', 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html']]
},

'5.1': {
  goal: 'Evaluate FM systems properly: quality metrics, systematic model comparison, user feedback, QA gates, RAG and agent evaluation, reporting and deployment validation.',
  big: 'FMs are non-deterministic and open-ended, so classic accuracy metrics are insufficient. You combine **automatic metrics, LLM-as-a-judge and humans**, evaluate **retrieval and generation separately**, and wire evaluation into **CI/CD quality gates**.',
  concepts: [
    { h: 'Quality dimensions beyond classic ML', p: 'Evaluate **relevance**, **factual accuracy/faithfulness**, **consistency**, **fluency/coherence**, completeness, helpfulness, safety (toxicity, stereotyping) and **refusal behaviour**. Traditional metrics: **ROUGE** (recall of overlapping n-grams, summarisation), **BLEU** (precision, translation), **BERTScore** (semantic similarity via embeddings), accuracy/F1 for classification. Overlap metrics miss meaning, so combine with semantic metrics and judges.' },
    { h: 'Bedrock Model Evaluations', p: 'Three modes: **automatic** (programmatic metrics on built-in or custom datasets for tasks such as summarisation, Q&A, classification, accuracy, robustness, toxicity), **LLM-as-a-judge** (a judge model scores outputs on metrics such as correctness, completeness, helpfulness, harmfulness), and **human-based** (your workforce or AWS-managed team rates against criteria). Jobs read datasets from S3 and write results to S3. Use them to compare models and prompts, and use **A/B and canary testing** in production for real-traffic outcomes. Include **cost-performance analysis**: token efficiency and latency-to-quality ratios and business outcomes.' },
    { h: 'RAG evaluation', p: 'Evaluate **retrieval** (context relevance, context coverage: did we fetch what was needed?) and **generation** (faithfulness/groundedness, correctness, completeness, citation precision/coverage) separately. Bedrock supports **RAG evaluation jobs** for Knowledge Bases (retrieve-only or retrieve-and-generate) and for your own pipeline. A wrong answer with good retrieval points at the prompt/model; a wrong answer with poor retrieval points at chunking, embeddings or search.', trap: 'Always separate "was the right context retrieved?" from "did the model use it correctly?" Fixing the wrong half wastes time.' },
    { h: 'User-centred evaluation and QA', p: 'Collect **thumbs up/down and ratings** in the UI (API Gateway to DynamoDB/S3), add **annotation workflows** for experts (SageMaker Ground Truth or custom review tools), and feed results into the evaluation set. **Continuous evaluation** runs on a schedule and on each change; **regression tests** replay the golden set; **quality gates** in CodePipeline block deployment if scores drop below thresholds.' },
    { h: 'Agent evaluation', p: 'Measure **task completion rate**, **tool selection and parameter correctness**, number of steps/cost per task, recovery from tool errors and **reasoning quality** across multi-step workflows (Bedrock/AgentCore evaluations, traces, trajectory judges).' },
    { h: 'Reporting and deployment validation', p: 'Communicate to stakeholders with **dashboards** (CloudWatch, Managed Grafana, Quick), automated periodic reports and **model comparison visualisations** (quality vs cost vs latency). Validate each release with **synthetic user workflows** (CloudWatch Synthetics), **AI-specific output checks** for hallucination rate and **semantic drift**, and automated consistency checks before shifting full traffic (canary).' }
  ],
  tables: [{ title: 'Evaluation method chooser', head: ['Need', 'Method'], rows: [
    ['Cheap, repeatable comparison across models', 'Automatic metrics / LLM-as-a-judge'],
    ['Nuanced criteria (brand voice, empathy)', 'Human evaluation (+ judge for scale)'],
    ['Is retrieval the problem?', 'RAG evaluation: retrieve-only metrics'],
    ['Real-user impact of a change', 'A/B or canary release'],
    ['Block regressions before deploy', 'Golden-set regression in CI/CD quality gate'],
    ['Agent reliability', 'Task completion + tool-use evaluations on traces']] }],
  flow: { title: 'Evaluation pipeline in CI/CD', steps: [
    { t: 'Golden dataset', d: 'Curated prompts + references in S3' },
    { t: 'Evaluate', d: 'Automatic + LLM judge (+ human sample)' },
    { t: 'Gate', d: 'CodePipeline stage fails below thresholds' },
    { t: 'Canary', d: 'Small traffic share, synthetic workflows' },
    { t: 'Report & learn', d: 'Dashboards; feedback grows the dataset' }] },
  patterns: [
    '"Compare candidate models at scale with consistent criteria" → Bedrock Model Evaluations (LLM-as-a-judge).',
    '"Is it the retriever or the generator?" → RAG evaluation, separate metrics.',
    '"Prevent quality regressions in deployment" → golden dataset + automated quality gate.',
    '"Real traffic comparison" → A/B or canary.',
    '"Summarisation overlap metric" → ROUGE.'],
  refs: [['Bedrock evaluation', 'https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html'], ['RAG evaluation', 'https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-kb.html']]
},

'5.2': {
  goal: 'Diagnose common GenAI failures: context overflow, API integration errors, prompt issues, retrieval problems and prompt maintenance.',
  big: 'Troubleshooting questions give symptoms and ask for the most likely cause or the best diagnostic. Build a mental map: **symptom → layer (input/context, API, prompt, retrieval, model) → tool**.',
  concepts: [
    { h: 'Content handling and context overflow', p: 'Each model has a **context window** (input + output tokens). Exceeding it raises a `ValidationException` or leads to truncation and lost information. Diagnose with token counts and logs; fix with **dynamic chunking**, summarising or pruning history, selecting only top-ranked chunks, a **longer-context model**, or splitting work (map-reduce summarisation). Watch for `stopReason` of `max_tokens` indicating **output truncation**; raise the limit or request concise output. Models can also under-use information buried in the middle of a long context.' },
    { h: 'FM integration issues', p: 'Typical errors: `ValidationException` (malformed body, wrong model-specific fields, parameters out of range), `AccessDeniedException` (IAM or model access/Region), `ResourceNotFoundException` (wrong model ID/Region), `ThrottlingException` (rate limit; back off), `ModelTimeoutException`, `ServiceQuotaExceededException`, `ModelNotReadyException` (retry). Use **error logging**, **request validation** at the edge and **response analysis** (check stop reason, token counts, guardrail interventions). Missing logs usually mean invocation logging is not enabled or the log destination lacks permissions.' },
    { h: 'Prompt problems', p: 'Inconsistent or low-quality responses: ambiguous instructions, missing examples, conflicting rules, too much context. Use a **prompt testing framework** (fixed test set), **version comparison** (Prompt Management variants/versions, A/B), and **systematic refinement** (change one thing at a time, measure). Check whether a guardrail is blocking or altering output.' },
    { h: 'Retrieval problems', p: 'Poor answers with RAG: analyse **relevance of retrieved passages**; check **embedding quality** (same model for index and query; domain fit; dimensions), **chunking** (too small/large, split mid-idea), **stale or missing documents** (failed sync, deletions not propagated), **drift** (content or query distribution changed), **vectorisation failures** (parsing errors, unsupported file types), metadata filter mistakes, and **vector search performance** (index parameters, shards). Remedies: re-chunk, re-embed, hybrid search, reranking, fix ingestion.', trap: 'If recall suddenly drops after changing the embedding model, the likely cause is that the index still holds vectors from the old model.' },
    { h: 'Prompt maintenance', p: 'Templates drift and break: use **template testing** in CI, **CloudWatch Logs** (Insights) to find confused or failing prompts, **X-Ray** to trace the prompt pipeline, **schema validation** to detect format inconsistencies in outputs, and a **systematic refinement workflow** with versioned prompts and rollback.' }
  ],
  tables: [{ title: 'Symptom to likely cause', head: ['Symptom', 'Likely cause', 'Diagnostic'], rows: [
    ['Answer cut off mid-sentence', 'maxTokens too low / stopReason max_tokens', 'Inspect stopReason and output tokens'],
    ['ValidationException after model swap', 'Request body not valid for that model', 'Request validation; use Converse'],
    ['AccessDeniedException', 'IAM, model access, or wrong Region', 'CloudTrail + IAM policy simulator'],
    ['Relevant doc exists but never retrieved', 'Chunking/embedding/filter problem or stale index', 'Retrieve-only test, relevance scoring'],
    ['Right context retrieved, wrong answer', 'Prompt or model issue', 'Prompt versions, judge scoring'],
    ['Random format failures', 'Prompt/template drift', 'Schema validation, template tests'],
    ['Intermittent latency spikes', 'Throttling, large prompts, cold paths', 'X-Ray + metrics']] }],
  flow: { title: 'Triage order', steps: [
    { t: 'Reproduce', d: 'Capture exact request and response' },
    { t: 'Check API layer', d: 'Errors, stopReason, quotas, IAM' },
    { t: 'Check context', d: 'Token counts, truncation, ordering' },
    { t: 'Check retrieval', d: 'Retrieve-only: relevance, freshness' },
    { t: 'Check prompt/model', d: 'Compare versions on test set' }] },
  patterns: [
    '"Works for short docs, fails for long ones" → context window overflow → chunk/summarise.',
    '"Newly added documents do not appear" → ingestion/sync failure.',
    '"After changing embedding model results are random" → mixed embeddings; re-index.',
    '"Need to find which step in the chain failed" → X-Ray / traces.',
    '"Output format occasionally wrong" → schema validation + prompt template testing.'],
  refs: [['Bedrock API error codes', 'https://docs.aws.amazon.com/bedrock/latest/userguide/troubleshooting-api-error-codes.html'], ['Context windows and inference', 'https://docs.aws.amazon.com/bedrock/latest/userguide/inference.html']]
},

strategy: {
  goal: 'Read AIP-C01 questions the way the exam writers intend.',
  big: 'Almost every question is a scenario with four plausible answers (or five-plus for multiple response). Several options are technically possible; only one is **best given the stated constraint**. Find the constraint first, then eliminate.',
  concepts: [
    { h: 'Find the deciding phrase', p: 'Underline words such as **least operational overhead**, **most cost-effective**, **lowest latency**, **without code changes**, **fully managed**, **audit**, **real time**, **compliance/residency**, **minimal changes to the existing application**. They choose between otherwise valid architectures.' },
    { h: 'Defaults the exam favours', p: '**Managed over self-built** (Knowledge Bases over a hand-rolled vector pipeline, Bedrock Agents/AgentCore over custom agent servers, Guardrails over regex Lambdas) unless a requirement demands control. **Right-sized models** over the largest. **Retrieval over fine-tuning** for changing knowledge. **Configuration over code** for swappable behaviour. **Least privilege and private connectivity** for security. **Measure then optimise** for cost and performance.' },
    { h: 'Common distractor patterns', p: 'A service that exists but solves a different problem (Macie for live prompts, CloudTrail for prompt content, Comprehend for hallucinations). A correct-sounding feature that is **too heavy** (train a custom model) or **too weak** (a prompt instruction instead of a guardrail). An answer that **meets function but violates the constraint** (requires code changes, adds operations burden, breaks residency).' },
    { h: 'Multiple-response questions', p: 'You must pick **all** correct answers; there is no partial credit. Treat each option as true/false against the scenario. The count in the question ("choose TWO") is firm. Unanswered questions are scored incorrect and there is **no penalty for guessing**, so always answer.' },
    { h: 'Time management', p: '75 questions in 180 minutes is about **2.4 minutes per question**, and scenario text is long. First pass: answer the ones you know, **flag** the rest, never leave blanks. Second pass: spend remaining time on flagged items. Reserve 10 minutes for a final check.' },
    { h: 'Scoring facts from the exam guide', p: '65 scored plus 10 unscored (unmarked) questions. Scaled score 100 to 1,000; **750 is the minimum passing score**. Compensatory scoring: you only need to pass overall, not each domain. Weights: **D1 31%, D2 26%, D3 20%, D4 12%, D5 11%**.' }
  ],
  tables: [{ title: 'Constraint phrase to likely answer family', head: ['Phrase', 'Think'], rows: [
    ['Least operational overhead', 'Fully managed Bedrock capability'],
    ['Without code changes / dynamic', 'AppConfig, Prompt Management aliases, configuration'],
    ['Latest/private data', 'RAG (Knowledge Bases)'],
    ['Consistent format at high volume', 'Fine-tune/distil, or structured output'],
    ['Deterministic / exact', 'Tools, text-to-SQL, rules, Automated Reasoning'],
    ['Audit who did what', 'CloudTrail'],
    ['Auditable content', 'Model invocation logs'],
    ['No internet path', 'VPC endpoints / PrivateLink'],
    ['Burst throttling', 'Backoff + queue + quota/provisioned/cross-Region'],
    ['Cut cost', 'Cache, smaller model, fewer tokens, batch']] }],
  flow: { title: 'Answering method', steps: [
    { t: 'Read the last line', d: 'What exactly is asked: best, first, most cost-effective?' },
    { t: 'Find constraints', d: 'Latency, ops, cost, compliance, existing systems' },
    { t: 'Eliminate', d: 'Wrong service, too heavy, violates constraint' },
    { t: 'Choose managed/simple', d: 'Among survivors, prefer least effort that satisfies all' },
    { t: 'Flag & move on', d: 'Do not burn minutes; return later' }] },
  patterns: [
    'Two answers both work → pick the one with less operational effort that still meets every stated constraint.',
    'An option mentions training a model for a retrieval problem → almost certainly a distractor.',
    'An option that relies on the prompt to enforce security → distractor; use IAM/Guardrails.'],
  refs: [['Official exam guide (AIP-C01)', 'https://aws.amazon.com/certification/certified-generative-ai-developer-professional/']]
}
});
