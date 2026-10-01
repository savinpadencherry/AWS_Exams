/* Domain 4 questions: Task 4.1 (cost), Task 4.2 (performance), Task 4.3 (monitoring). */
(window.QBANK = window.QBANK || []).push(
{
  id: "d4-001", d: 4, t: "4.1", s: "4.1.4", type: "single",
  sc: "A document Q&A application sends the same 12,000-token policy manual plus a user question on every request. Input token cost and latency are high, and the manual rarely changes.",
  q: "Which optimization is MOST effective?",
  o: [
    "Use Amazon Bedrock prompt caching with a cache checkpoint after the static manual so the repeated prefix is reused",
    "Shuffle the manual text on every request",
    "Place the user question first and the manual second so the prefix changes every time",
    "Switch to Provisioned Throughput without changing the prompt"],
  a: [0],
  e: "**Prompt caching** reuses the processed static **prefix** of a prompt, cutting cost and latency. Keep static content first and variable content (the question) last so the prefix stays identical.",
  w: [
    "Caches the large unchanging prefix.",
    "Changing the text defeats caching.",
    "A varying prefix prevents cache hits.",
    "Capacity purchase does not reduce repeated token processing."]
},

{
  id: "d4-002", d: 4, t: "4.1", s: "4.1.4", type: "single",
  sc: "A support site receives thousands of near-duplicate questions phrased differently (for example \"reset my password\" and \"how do I change my login password\"). Answers are generic and identical for all users.",
  q: "Which approach reduces cost MOST?",
  o: [
    "A semantic cache: embed the incoming question, look for a sufficiently similar cached question in a vector-capable store (for example ElastiCache or OpenSearch), and return the stored answer on a hit",
    "An exact-string cache keyed on the full question text only",
    "Provisioned Throughput",
    "A higher temperature"],
  a: [0],
  e: "**Semantic caching** matches paraphrases by embedding similarity and avoids model invocations entirely for repeated intents.",
  w: [
    "Handles paraphrases and skips the FM call.",
    "Exact matching would miss differently phrased questions.",
    "Reserved capacity does not avoid calls.",
    "Temperature does not reduce calls."]
},

{
  id: "d4-003", d: 4, t: "4.1", s: "4.1.4", type: "single",
  sc: "A batch job repeatedly classifies the same product titles with identical prompts, a fixed model and fixed parameters, and uses temperature 0 for consistency. Many requests are exact duplicates.",
  q: "Which caching approach is MOST appropriate?",
  o: [
    "Result fingerprinting: hash the normalised request (model, parameters, prompt) as a key and store the response in DynamoDB or ElastiCache",
    "Semantic caching with a loose similarity threshold",
    "Caching only the model name",
    "No caching because every call must be new"],
  a: [0],
  e: "For **deterministic, repeated requests**, an exact **request hash** gives a safe cache key with no false matches.",
  w: [
    "Exact-key caching is precise and cheap.",
    "A loose similarity threshold risks returning wrong cached answers for distinct titles.",
    "The model name alone is not a key to the result.",
    "Duplicates should not pay twice."]
},

{
  id: "d4-004", d: 4, t: "4.1", s: "4.1.1", type: "single",
  sc: "A RAG chatbot sends ten retrieved chunks and the full 40-turn chat history to the model on every turn. Costs rise with conversation length and answers are not improving.",
  q: "Which change reduces tokens while preserving quality?",
  o: [
    "Rerank and send only the top few chunks, and summarise or prune older turns while keeping recent turns verbatim",
    "Send even more chunks to be safe",
    "Remove the system prompt",
    "Increase maxTokens"],
  a: [0],
  e: "**Context optimization**: reduce retrieved context to the most relevant passages and compress older history. Evaluate to confirm quality holds.",
  w: [
    "Cuts input tokens with minimal quality risk.",
    "More chunks adds tokens and noise.",
    "The system prompt provides required behavior.",
    "maxTokens increases potential output spend."]
},

{
  id: "d4-005", d: 4, t: "4.1", s: "4.1.2", type: "single",
  sc: "A team compares two models. Model A costs 5 times more per token but resolves 95% of tasks correctly on the first try; Model B is cheap but resolves 70% and needs retries or human fixes for the rest.",
  q: "Which metric best guides the choice?",
  o: [
    "Cost per successful task, including retries and human handling, alongside latency",
    "Price per token alone",
    "Model release date",
    "Number of parameters"],
  a: [0],
  e: "Evaluate **price-to-performance**, such as total cost per successfully completed task, not raw per-token price.",
  w: [
    "Captures the real economics of quality differences.",
    "Ignores retries and failures.",
    "Not a quality or cost measure.",
    "Size does not determine value."]
},

{
  id: "d4-006", d: 4, t: "4.1", s: "4.1.3", type: "single",
  sc: "A nightly job generates tags for 8 million catalog entries. Results are needed by morning, and the team wants the lowest per-token cost.",
  q: "Which option should they use?",
  o: [
    "Bedrock batch inference using JSONL input from S3",
    "Synchronous Converse calls from a Lambda function with maximum concurrency",
    "Provisioned Throughput purchased for a year",
    "A streaming WebSocket per catalog entry"],
  a: [0],
  e: "**Batch inference** is priced lower than on-demand and designed for large offline jobs.",
  w: [
    "Lower price for non-interactive bulk work.",
    "On-demand sync costs more and risks throttling.",
    "A long commitment for one nightly job is wasteful.",
    "Streaming serves interactive users."]
},

{
  id: "d4-007", d: 4, t: "4.1", s: "4.1.3", type: "single",
  sc: "A company bought Provisioned Throughput for a model and sees average utilization of about 15% with occasional peaks. Costs are high.",
  q: "What is the BEST next step?",
  o: [
    "Analyse utilization and token rates, right-size or reduce model units (or move spiky traffic back to on-demand), and monitor to adjust",
    "Buy more model units",
    "Ignore the utilization metrics",
    "Disable logging"],
  a: [0],
  e: "Provisioned capacity should match **measured token demand**. Low utilization suggests oversizing or a better fit with on-demand for spikes.",
  w: [
    "Data-driven right-sizing.",
    "More capacity worsens waste.",
    "Metrics are needed for capacity planning.",
    "Logging is unrelated to cost-fit."]
},

{
  id: "d4-008", d: 4, t: "4.1", s: "4.1.2", type: "single",
  sc: "Finance wants to attribute foundation model spend to individual applications and cost centres using Bedrock inference.",
  q: "Which approach provides this?",
  o: [
    "Create application inference profiles for each application with cost allocation tags, and analyse spend in AWS Cost Explorer",
    "Use a single shared profile and divide cost equally",
    "Estimate cost from CPU metrics",
    "Ask each team to self-report"],
  a: [0],
  e: "**Application inference profiles** with **cost allocation tags** let you track usage and cost per application.",
  w: [
    "Direct attribution through tagged profiles.",
    "Equal division ignores real usage.",
    "CPU does not measure token spend.",
    "Self-reporting is unreliable."]
},

{
  id: "d4-009", d: 4, t: "4.1", s: "4.1.1", type: "single",
  sc: "A bug causes an agent to loop and call the model hundreds of times for a single request, producing an unexpected cost spike overnight. The team wants automatic detection.",
  q: "Which combination is MOST appropriate?",
  o: [
    "AWS Cost Anomaly Detection for spend spikes plus CloudWatch alarms (including anomaly detection) on token-count metrics",
    "A monthly invoice review",
    "S3 Lifecycle rules",
    "Increase the Lambda timeout"],
  a: [0],
  e: "Combine **financial anomaly detection** with **operational token metrics and alarms** for fast detection.",
  w: [
    "Automated detection from spend and usage signals.",
    "A monthly review is too slow.",
    "Lifecycle rules manage object storage.",
    "Longer timeouts allow more loop iterations."]
},

{
  id: "d4-010", d: 4, t: "4.1", s: "4.1.1", type: "multiple",
  sc: "A summarisation API produces verbose answers with long preambles, driving up output token cost.",
  q: "Which TWO actions reduce output cost without losing key content?",
  o: [
    "Set an appropriate maxTokens value and instruct the model to respond concisely in a defined format",
    "Compress the prompt instructions and remove unnecessary examples while validating quality on an evaluation set",
    "Ask the model to be as detailed as possible",
    "Double the temperature",
    "Remove the evaluation set to save time"],
  a: [0,1],
  e: "Control **response length** and **prompt size**, validated against an evaluation set so quality remains acceptable.",
  w: [
    "Limits and shapes output length.",
    "Reduces input tokens while protecting quality.",
    "Detail increases tokens.",
    "Temperature does not cut length.",
    "Without evaluation, quality loss goes unnoticed."]
},

{
  id: "d4-011", d: 4, t: "4.1", s: "4.1.4", type: "single",
  sc: "A semantic cache is being added to a multi-tenant HR assistant. Answers depend on each user's department and permissions.",
  q: "What is the MOST important design consideration?",
  o: [
    "Include tenant and permission context in the cache key or partition so one user's cached answer is never served to a user without access",
    "Share one global cache so every answer is reused",
    "Disable all access control for cached items",
    "Cache answers indefinitely"],
  a: [0],
  e: "Caches must respect **authorization and personalization**. Scope keys by tenant/permissions and set sensible TTLs, or you create a data leak.",
  w: [
    "Prevents cross-user leakage.",
    "A global cache could expose restricted content.",
    "Removing access control is a security failure.",
    "Infinite caching serves stale or unauthorised content."]
},

{
  id: "d4-012", d: 4, t: "4.1", s: "4.1.2", type: "single",
  sc: "A high-volume feature uses a large model, and evaluations show a smaller model fails on a narrow set of stylistic requirements. The company can generate many high-quality examples using the large model.",
  q: "Which approach can lower per-request cost at scale?",
  o: [
    "Distil the large model's behavior into a smaller model (model distillation) and evaluate it against the golden dataset",
    "Keep the large model forever",
    "Train a new model from scratch",
    "Increase the prompt length"],
  a: [0],
  e: "**Distillation** transfers a larger model's capability to a smaller, cheaper one for a specific task, cutting cost and latency at volume.",
  w: [
    "Smaller model tuned with large-model outputs.",
    "Misses the savings opportunity.",
    "Training from scratch is far costlier.",
    "Longer prompts increase cost."]
},

{
  id: "d4-013", d: 4, t: "4.2", s: "4.2.1", type: "single",
  sc: "A news site shows an AI-generated daily briefing that is identical for all readers each morning. Generating it on demand makes the first load slow and expensive.",
  q: "Which approach is MOST effective?",
  o: [
    "Pre-compute the briefing on a schedule (for example with EventBridge and Lambda), store it, and serve it from cache or CDN",
    "Generate it on every page view",
    "Use a larger model",
    "Increase temperature"],
  a: [0],
  e: "**Pre-computation** turns predictable work into a cheap read and removes model latency from the user path.",
  w: [
    "Removes generation from the request path.",
    "Per-view generation repeats work.",
    "A larger model is slower and costlier.",
    "Temperature does not help speed."]
},

{
  id: "d4-014", d: 4, t: "4.2", s: "4.2.1", type: "single",
  sc: "A voice assistant must begin speaking within a second. Responses are short, and the current model is slow.",
  q: "Which Amazon Bedrock capability should be evaluated?",
  o: [
    "Latency-optimized inference for supported models, combined with streaming and a smaller model",
    "Batch inference",
    "A larger context window",
    "Cross-Region replication of S3 buckets"],
  a: [0],
  e: "Latency-sensitive paths benefit from **latency-optimized inference options**, **streaming**, and appropriately sized models.",
  w: [
    "Targets time-to-first-token and response speed.",
    "Batch is asynchronous.",
    "Larger windows do not speed generation.",
    "S3 replication is storage replication."]
},

{
  id: "d4-015", d: 4, t: "4.2", s: "4.2.1", type: "single",
  sc: "A report generator makes five independent model calls (one per section) sequentially, taking 40 seconds in total. Sections do not depend on each other.",
  q: "How can total latency be reduced MOST?",
  o: [
    "Run the five calls in parallel (for example a Step Functions Map or Parallel state, or concurrent SDK calls) within quota limits and assemble results",
    "Run them sequentially with a larger delay",
    "Combine all sections into one huge prompt",
    "Cache nothing"],
  a: [0],
  e: "**Parallel requests** reduce wall-clock time for independent sub-tasks; respect concurrency quotas.",
  w: [
    "Wall-clock time becomes roughly the slowest call.",
    "Delays add time.",
    "One huge prompt may increase latency and reduce quality.",
    "Caching is a separate lever."]
},

{
  id: "d4-016", d: 4, t: "4.2", s: "4.2.2", type: "single",
  sc: "Vector search in an OpenSearch-based RAG system takes 900 ms and returns many borderline results. Most of the time is spent scoring many candidates.",
  q: "Which change is MOST likely to improve retrieval performance?",
  o: [
    "Tune the index (ANN parameters, shard layout, quantization), apply metadata filters to narrow candidates, and retrieve fewer results before reranking",
    "Increase the number of results to 500",
    "Remove metadata",
    "Disable the ANN index"],
  a: [0],
  e: "Index tuning, **filtering** and retrieving fewer, better candidates reduce retrieval latency and improve relevance.",
  w: [
    "Targets the cost of scoring and candidate volume.",
    "More results increases work.",
    "Metadata supports filtering.",
    "Exact scans are slower."]
},

{
  id: "d4-017", d: 4, t: "4.2", s: "4.2.2", type: "single",
  sc: "A product search assistant needs both exact SKU matching and semantic similarity, with business control over how much each signal counts (for example, boosting in-stock items).",
  q: "Which approach is MOST appropriate?",
  o: [
    "Hybrid search in OpenSearch with custom scoring that weights lexical and vector scores and applies business boosts",
    "Vector-only search",
    "Keyword-only search",
    "Random ordering"],
  a: [0],
  e: "**Hybrid search with custom scoring** combines lexical and semantic relevance and allows business-specific weighting.",
  w: [
    "Controls blending and boosts.",
    "Misses exact SKUs.",
    "Misses semantic similarity.",
    "No relevance."]
},

{
  id: "d4-018", d: 4, t: "4.2", s: "4.2.3", type: "single",
  sc: "A pipeline sends 2,000 simultaneous requests to a model and gets throttled. Throughput targets are high, but latency of each request is not critical.",
  q: "Which approach MOST improves effective throughput?",
  o: [
    "Buffer requests in SQS and process with bounded concurrency tuned to quotas, using retries with backoff, or use batch inference for non-urgent work",
    "Remove all retries",
    "Send all requests at once with no limits",
    "Reduce the number of workers to zero"],
  a: [0],
  e: "Manage **concurrency** to match capacity, buffer bursts, and use batch where latency is flexible.",
  w: [
    "Smooths load and maximizes useful throughput.",
    "Failures would not be recovered.",
    "Unbounded bursts increase throttling.",
    "Zero workers process nothing."]
},

{
  id: "d4-019", d: 4, t: "4.2", s: "4.2.4", type: "single",
  sc: "A data-extraction prompt returns slightly different field values on repeated runs. The task needs consistent, factual extraction.",
  q: "Which inference parameter change is MOST appropriate?",
  o: [
    "Lower the temperature (and optionally top-p) and validate on an evaluation set",
    "Raise the temperature to 1.0",
    "Increase top-k to the maximum",
    "Remove stop sequences"],
  a: [0],
  e: "**Lower temperature** reduces randomness for factual, extraction and classification tasks. It improves consistency but does not guarantee identical output.",
  w: [
    "Reduces sampling randomness.",
    "Higher temperature adds variability.",
    "More candidate tokens increases variability.",
    "Stop sequences control termination, not randomness."]
},

{
  id: "d4-020", d: 4, t: "4.2", s: "4.2.4", type: "single",
  sc: "A team wants to know whether changing temperature from 0.7 to 0.3 improves answer quality for its support assistant.",
  q: "What is the BEST way to decide?",
  o: [
    "A/B test both settings against the same evaluation set (and optionally a canary on live traffic) comparing quality, consistency and cost",
    "Choose based on intuition",
    "Change several parameters at once without measuring",
    "Use the highest temperature"],
  a: [0],
  e: "**A/B testing** with a fixed evaluation set provides evidence for parameter choices. Change one variable at a time.",
  w: [
    "Evidence-based comparison.",
    "Intuition is unreliable.",
    "Multiple simultaneous changes confuse results.",
    "High temperature increases variability."]
},

{
  id: "d4-021", d: 4, t: "4.2", s: "4.2.5", type: "single",
  sc: "A self-hosted LLM service on containers scales on CPU utilization, but GPUs are saturated and requests queue up while CPU stays low.",
  q: "Which scaling signal is MOST appropriate?",
  o: [
    "Queue depth, concurrent requests per replica or GPU utilization",
    "Container CPU only",
    "Disk free space",
    "Day of the week"],
  a: [0],
  e: "LLM inference is **GPU- and token-bound**. Scale on **queue depth, concurrency or GPU utilization**.",
  w: [
    "Reflects actual saturation.",
    "CPU does not reflect GPU saturation.",
    "Disk space is unrelated.",
    "Calendar-based scaling ignores load."]
},

{
  id: "d4-022", d: 4, t: "4.2", s: "4.2.5", type: "single",
  sc: "A team expects 200 requests per minute, averaging 1,500 input tokens and 400 output tokens, and must size Bedrock capacity and quotas.",
  q: "Which calculation is MOST appropriate for capacity planning?",
  o: [
    "Plan in tokens per minute: roughly 200 × (1,500 + 400) = 380,000 tokens per minute at average load, then add headroom for peaks",
    "Plan only for requests per second with no token estimate",
    "Plan for 200 tokens per minute",
    "Ignore output tokens"],
  a: [0],
  e: "LLM capacity is expressed in **tokens per minute** (input plus output), with headroom for burst and growth.",
  w: [
    "Correct token-rate planning.",
    "Requests alone hide the token load.",
    "Underestimates by orders of magnitude.",
    "Output tokens contribute to quota and cost."]
},

{
  id: "d4-023", d: 4, t: "4.2", s: "4.2.6", type: "single",
  sc: "An index with 1,024-dimension vectors is slow and memory-heavy. Evaluations show a small recall drop with 512 dimensions or with quantization.",
  q: "Which optimization is MOST appropriate?",
  o: [
    "Reduce dimensionality or apply vector quantization, then re-index and verify recall on test queries",
    "Double the dimensionality",
    "Remove the index",
    "Increase top-k to 10,000"],
  a: [0],
  e: "Dimension reduction and **quantization** trade a small recall loss for large memory and latency gains; verify with retrieval tests.",
  w: [
    "Reduces memory and speeds search with measured recall.",
    "More dimensions increases cost.",
    "Removing the index forces slow scans.",
    "Larger top-k increases work."]
},

{
  id: "d4-024", d: 4, t: "4.2", s: "4.2.6", type: "single",
  sc: "End-to-end latency is 6 seconds. Profiling shows time to first token is 3.5 seconds, driven by a 25,000-token prompt, and cross-Region calls to the vector store add 400 ms.",
  q: "Which TWO-step approach addresses the biggest contributors?",
  o: [
    "Shrink the prompt (fewer, reranked chunks; prompt caching for static parts) and co-locate the application and vector store in the same Region",
    "Increase maxTokens and change the temperature",
    "Add more retries",
    "Move the vector store to a different continent"],
  a: [0],
  e: "Profile first, then fix the dominant costs: **prompt size** and **network distance**. Prompt caching and fewer chunks reduce time to first token.",
  w: [
    "Targets both measured bottlenecks.",
    "These settings do not address the bottlenecks.",
    "Retries add latency.",
    "More distance adds latency."]
},

{
  id: "d4-025", d: 4, t: "4.3", s: "4.3.1", type: "single",
  sc: "Users sometimes see failures at peak. The operations team wants an alert when Bedrock throttles requests and a dashboard of latency and token usage per model.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Use Amazon CloudWatch Bedrock runtime metrics (invocations, latency, throttles, input and output token counts) with alarms and a dashboard",
    "AWS Budgets only",
    "Amazon Macie",
    "Amazon Route 53 health checks only"],
  a: [0],
  e: "Bedrock publishes **CloudWatch metrics** such as invocations, latency, throttling and token counts that support alarms and dashboards.",
  w: [
    "Native operational metrics for exactly these signals.",
    "Budgets track spend, not throttles or latency.",
    "Macie finds sensitive data.",
    "Health checks alone do not show model throttles or tokens."]
},

{
  id: "d4-026", d: 4, t: "4.3", s: "4.3.2", type: "single",
  sc: "The team needs to analyse the exact prompts and responses for slow and expensive requests to find patterns, but no content logs exist.",
  q: "What should they do?",
  o: [
    "Enable Amazon Bedrock model invocation logging to Amazon S3 and/or CloudWatch Logs, with appropriate encryption and access control, and query with Logs Insights or Athena",
    "Enable CloudTrail only, because it stores prompts",
    "Ask users for screenshots",
    "Increase the number of retries"],
  a: [0],
  e: "**Model invocation logging** (off by default) captures request and response content and metadata. CloudTrail records API calls but not prompt content.",
  w: [
    "Provides content-level logs for analysis.",
    "CloudTrail does not include prompt text.",
    "Screenshots are not systematic logs.",
    "Retries do not produce logs."]
},

{
  id: "d4-027", d: 4, t: "4.3", s: "4.3.2", type: "single",
  sc: "Token consumption occasionally spikes far above normal levels, for example when a client script misbehaves. Static thresholds are hard to set because traffic varies by hour.",
  q: "Which monitoring approach works BEST?",
  o: [
    "CloudWatch anomaly detection alarms on the token-count metrics",
    "A fixed alarm at a very high number",
    "No monitoring",
    "A weekly manual review of invoices"],
  a: [0],
  e: "**Anomaly detection** learns expected patterns (including time-of-day) and alarms on deviations such as token bursts.",
  w: [
    "Adapts to varying traffic patterns.",
    "A fixed threshold either misses spikes or fires constantly.",
    "No visibility.",
    "Too slow."]
},

{
  id: "d4-028", d: 4, t: "4.3", s: "4.3.1", type: "single",
  sc: "A RAG pipeline calls API Gateway, Lambda, OpenSearch, Bedrock and a downstream CRM. Teams want one view of each request across all services, including multi-agent hand-offs.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Distributed tracing with AWS X-Ray or OpenTelemetry (for example through AgentCore Observability for agents), with trace IDs propagated across services",
    "Reading each service's billing line",
    "Relying on CPU metrics only",
    "Copying logs to email"],
  a: [0],
  e: "**Distributed tracing** correlates a request across services and agent steps with a trace ID.",
  w: [
    "End-to-end visibility.",
    "Billing is not tracing.",
    "CPU metrics do not show request flow.",
    "Email is not observability."]
},

{
  id: "d4-029", d: 4, t: "4.3", s: "4.3.1", type: "single",
  sc: "Executives want to see business outcomes of the assistant (resolution rate, escalation rate, customer satisfaction) next to technical metrics on a single dashboard.",
  q: "Which solution is MOST appropriate?",
  o: [
    "Publish business metrics as custom CloudWatch metrics (or to a data source) and build dashboards in CloudWatch or Amazon Managed Grafana alongside operational metrics",
    "A printed monthly report",
    "Use only token counts",
    "Remove metrics for simplicity"],
  a: [0],
  e: "Combine **custom business metrics** with operational ones in **CloudWatch dashboards or Managed Grafana** for a holistic view.",
  w: [
    "Unified technical and business visibility.",
    "Not timely or interactive.",
    "Tokens alone omit business impact.",
    "No visibility."]
},

{
  id: "d4-030", d: 4, t: "4.3", s: "4.3.2", type: "single",
  sc: "The company wants to track hallucination rate and answer quality over time for a RAG assistant in production, without human review of every response.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Sample production responses on a schedule, score them with an LLM-as-a-judge and grounding checks against retrieved context, and publish quality metrics to CloudWatch with alarms",
    "Review every response manually forever",
    "Assume quality never changes",
    "Count the number of words per answer"],
  a: [0],
  e: "**Sampled automated evaluation** (judge plus grounding scores) provides scalable quality monitoring.",
  w: [
    "Scalable, automated and trendable.",
    "Does not scale.",
    "Quality can drift.",
    "Word count is not quality."]
},

{
  id: "d4-031", d: 4, t: "4.3", s: "4.3.4", type: "single",
  sc: "An agent usually calls a lookup tool one to three times per request. After a prompt change, some requests call it forty times. The team wants to catch this quickly in the future.",
  q: "Which measure is MOST appropriate?",
  o: [
    "Track tool-call counts, latency and error rates per request with baselines, and alarm when counts exceed expected ranges",
    "Disable all tools",
    "Increase the model temperature",
    "Ignore tool metrics"],
  a: [0],
  e: "**Tool call-pattern tracking** with usage baselines detects loops and regressions early.",
  w: [
    "Baselined monitoring of tool behavior.",
    "Removes functionality.",
    "Temperature does not diagnose loops.",
    "Misses the issue."]
},

{
  id: "d4-032", d: 4, t: "4.3", s: "4.3.5", type: "multiple",
  sc: "The team operates an OpenSearch vector index backing a production assistant and wants proactive operational management.",
  q: "Which TWO practices help?",
  o: [
    "Monitor query latency, indexing lag, resource utilization and recall on a fixed set of test queries",
    "Run data quality validation (duplicates, empty chunks, missing metadata) and scheduled index optimization or reindexing after embedding changes",
    "Never review index health",
    "Add random documents to test the index",
    "Disable alarms"],
  a: [0,1],
  e: "Operate vector stores with **performance and relevance monitoring** plus **data quality and index maintenance** routines.",
  w: [
    "Tracks performance and retrieval quality.",
    "Keeps data and index healthy.",
    "No review leads to silent degradation.",
    "Random documents pollute results.",
    "Alarms provide early warning."]
},

{
  id: "d4-033", d: 4, t: "4.3", s: "4.3.6", type: "single",
  sc: "After each prompt or model change, the team wants to detect hallucinations and regressions using a fixed set of questions with known reference answers.",
  q: "Which asset should they maintain?",
  o: [
    "A golden dataset of representative inputs and expected answers, replayed automatically and scored on every change",
    "A random sample of new questions each time",
    "A list of model names",
    "A spreadsheet of costs"],
  a: [0],
  e: "A **golden dataset** gives a stable benchmark for detecting hallucination and regressions across changes.",
  w: [
    "Stable, repeatable regression benchmark.",
    "Non-comparable between runs.",
    "Does not test behavior.",
    "Costs do not measure quality."]
},

{
  id: "d4-034", d: 4, t: "4.3", s: "4.3.6", type: "single",
  sc: "A model upgrade shows no errors, but support staff say answers feel different. The team wants to quantify how much responses changed on the same prompts.",
  q: "Which technique is MOST appropriate?",
  o: [
    "Output diffing: run identical prompts through both versions and compare responses with semantic similarity and judge scoring to measure consistency",
    "Compare the model release notes only",
    "Check the Lambda memory",
    "Compare only response lengths"],
  a: [0],
  e: "**Output diffing** compares responses across versions for consistency using semantic and judged measures.",
  w: [
    "Direct, quantitative consistency analysis.",
    "Notes do not show behavior on your prompts.",
    "Memory is unrelated.",
    "Length alone misses semantic change."]
},

{
  id: "d4-035", d: 4, t: "4.3", s: "4.3.6", type: "single",
  sc: "A multi-step agent reaches wrong conclusions even though each tool returns correct data. Developers need to find the step where the logic went wrong.",
  q: "Which approach is MOST useful?",
  o: [
    "Reasoning path tracing: capture and review the agent's intermediate thoughts, tool selections and observations step by step",
    "Increase maxTokens",
    "Switch Regions",
    "Only look at the final answer"],
  a: [0],
  e: "**Reasoning path tracing** exposes where the agent's logic diverged, which final-answer review cannot.",
  w: [
    "Step-level visibility into decisions.",
    "maxTokens does not reveal reasoning.",
    "Regions are unrelated.",
    "Final answers hide the failing step."]
},

{
  id: "d4-036", d: 4, t: "4.3", s: "4.3.3", type: "multiple",
  sc: "A regulated firm wants integrated observability for forensic investigation of AI-assisted decisions.",
  q: "Which TWO capabilities support forensic traceability?",
  o: [
    "Correlation IDs linking user requests to prompts, retrieved documents, tool calls and responses across logs and traces",
    "AWS CloudTrail audit logs and model invocation logs retained under a defined policy",
    "Deleting all logs after one day",
    "Allowing anyone to edit logs",
    "Storing only the final answer"],
  a: [0,1],
  e: "Forensic work needs **end-to-end correlation** and **retained, protected audit and content logs**.",
  w: [
    "Links the full chain of events.",
    "Who-did-what plus what-was-sent evidence.",
    "Short retention destroys evidence.",
    "Editable logs are untrustworthy.",
    "Final answers alone cannot explain how they were produced."]
}
);
