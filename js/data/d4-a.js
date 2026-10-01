/* Domain 4 questions: Task 4.1 (cost), Task 4.2 (performance), Task 4.3 (monitoring). */
(window.QBANK = window.QBANK || []).push(
{
  id: "d4-001", d: 4, t: "4.1", s: "4.1.4", type: "single",
  sc: "A document Q&A application sends the same 12,000-token policy manual plus a user question on every request. Input token cost and latency are high, and the manual rarely changes.",
  q: "Which optimization is MOST effective?",
  o: [
    "Use Bedrock prompt caching with a cache checkpoint after the static manual, so the repeated prefix is reused",
    "Shuffle the order of the manual's sections on every request so that the model reads a fresh version each time",
    "Place the user question first and the manual second so that the prefix of the prompt changes with each request",
    "Purchase Provisioned Throughput and keep the prompt unchanged, so that the manual is processed on reserved capacity"],
  a: [0],
  e: "**Prompt caching** reuses the processed static **prefix** of a prompt, cutting cost and latency. Keep static content first and variable content (the question) last so the prefix stays identical.",
  w: [
    "Caches the large unchanging prefix, cutting repeated token processing cost and latency.",
    "Changing the text defeats caching.",
    "A varying prefix prevents cache hits; static content must come first.",
    "Reserved capacity does not reduce the repeated token processing."]
},

{
  id: "d4-002", d: 4, t: "4.1", s: "4.1.4", type: "single",
  sc: "A support site receives thousands of near-duplicate questions phrased differently (for example \"reset my password\" and \"how do I change my login password\"). Answers are generic and identical for all users.",
  q: "Which approach reduces cost MOST?",
  o: [
    "A semantic cache: embed the question, find a sufficiently similar cached question in a vector-capable store, and return the stored answer on a hit",
    "An exact-string cache keyed on the full question text, so that only identical questions skip the model and are answered from it",
    "Provisioned Throughput on the model, so that each question is answered with predictable latency at a fixed hourly price",
    "A higher temperature so that the model gives shorter and cheaper answers to repeated questions of a similar kind"],
  a: [0],
  e: "**Semantic caching** matches paraphrases by embedding similarity and avoids model invocations entirely for repeated intents.",
  w: [
    "Matches paraphrases by embedding similarity and skips the model call entirely for repeated intents.",
    "Exact matching would miss differently phrased questions.",
    "Reserved capacity does not avoid calls.",
    "Temperature does not reduce the number of calls."]
},

{
  id: "d4-003", d: 4, t: "4.1", s: "4.1.4", type: "single",
  sc: "A batch job repeatedly classifies the same product titles with identical prompts, a fixed model and fixed parameters, and uses temperature 0 for consistency. Many requests are exact duplicates.",
  q: "Which caching approach is MOST appropriate?",
  o: [
    "Result fingerprinting: hash the normalized request (model, parameters, prompt) as a key and store the response in DynamoDB or ElastiCache",
    "Semantic caching with a loose similarity threshold, so that near-identical product titles share a cached answer",
    "Caching only the model name, and recomputing the label for every product title on every run",
    "No caching, because every classification call must be new in order to reflect the latest model behavior"],
  a: [0],
  e: "For **deterministic, repeated requests**, an exact **request hash** gives a safe cache key with no false matches.",
  w: [
    "Exact-key caching is precise, cheap and safe for deterministic requests.",
    "A loose threshold risks returning wrong labels for distinct but similar titles.",
    "The model name alone is not a key to the result.",
    "Duplicates should not pay twice for identical, deterministic calls."]
},

{
  id: "d4-004", d: 4, t: "4.1", s: "4.1.1", type: "single",
  sc: "A RAG chatbot sends ten retrieved chunks and the full 40-turn chat history to the model on every turn. Costs rise with conversation length and answers are not improving.",
  q: "Which change reduces tokens while preserving quality?",
  o: [
    "Rerank and send only the top few chunks, and summarize or prune older turns while keeping recent turns verbatim",
    "Send even more chunks to be safe, since the model can ignore the passages that it does not need",
    "Remove the system prompt so that the instructions no longer take up space in the model's context",
    "Increase maxTokens so that the model has room to produce longer answers from the larger context"],
  a: [0],
  e: "**Context optimization**: reduce retrieved context to the most relevant passages and compress older history. Evaluate to confirm quality holds.",
  w: [
    "Cuts input tokens with minimal quality risk when validated on an evaluation set.",
    "More chunks adds tokens and noise.",
    "The system prompt provides required behavior.",
    "maxTokens increases potential output spend and does not shrink the input."]
},

{
  id: "d4-005", d: 4, t: "4.1", s: "4.1.2", type: "single",
  sc: "A team compares two models. Model A costs 5 times more per token but resolves 95% of tasks correctly on the first try; Model B is cheap but resolves 70% and needs retries or human fixes for the rest.",
  q: "Which metric best guides the choice?",
  o: [
    "Cost per successful task, including retries and human handling, alongside latency",
    "Price per token alone, since it is the number published by the provider for each model",
    "The release date of each model, since newer models are generally cheaper to run at scale",
    "The number of parameters of each model, since larger models always produce the best value"],
  a: [0],
  e: "Evaluate **price-to-performance**, such as total cost per successfully completed task, not raw per-token price.",
  w: [
    "Captures the real economics of quality differences.",
    "Ignores retries and failures.",
    "Release date is not a quality or cost measure.",
    "Size does not determine value."]
},

{
  id: "d4-006", d: 4, t: "4.1", s: "4.1.3", type: "single",
  sc: "A nightly job generates tags for 8 million catalog entries. Results are needed by morning, and the team wants the lowest per-token cost.",
  q: "Which option should they use?",
  o: [
    "Bedrock batch inference using JSONL input from S3",
    "Synchronous Converse calls from a Lambda function configured for maximum concurrency overnight",
    "Provisioned Throughput on a one-year commitment so that the nightly job has reserved capacity",
    "A streaming WebSocket connection for each catalog entry, with results pushed to the catalog service"],
  a: [0],
  e: "**Batch inference** is priced lower than on-demand and designed for large offline jobs.",
  w: [
    "Lower price for non-interactive bulk work and designed for large jobs.",
    "On-demand synchronous calls cost more and risk throttling.",
    "A long commitment for one nightly job is wasteful.",
    "Streaming serves interactive users."]
},

{
  id: "d4-007", d: 4, t: "4.1", s: "4.1.3", type: "single",
  sc: "A company bought Provisioned Throughput for a model and sees average utilization of about 15% with occasional peaks. Costs are high.",
  q: "What is the BEST next step?",
  o: [
    "Analyze utilization and token rates, right-size or reduce model units (or move spiky traffic back to on-demand), and monitor to adjust",
    "Buy more model units so that peak requests are always served from reserved capacity",
    "Ignore the utilization metrics, since reserved capacity is paid for whether it is used or not",
    "Disable invocation logging so that the logging overhead no longer counts against the provisioned capacity"],
  a: [0],
  e: "Provisioned capacity should match **measured token demand**. Low utilization suggests oversizing or a better fit with on-demand for spikes.",
  w: [
    "Data-driven right-sizing matches capacity to measured demand.",
    "More capacity worsens waste at 15% utilization.",
    "Metrics are needed for capacity planning, and ignoring them keeps the waste.",
    "Logging is unrelated to cost-fit."]
},

{
  id: "d4-008", d: 4, t: "4.1", s: "4.1.2", type: "single",
  sc: "Finance wants to attribute foundation model spend to individual applications and cost centres using Bedrock inference.",
  q: "Which approach provides this?",
  o: [
    "Create application inference profiles for each application with cost allocation tags, and analyze spend in AWS Cost Explorer",
    "Use a single shared inference profile for all applications and divide the monthly cost equally between them",
    "Estimate each application's cost from the CPU utilization of the servers that call the model",
    "Ask each team to report its own estimated usage and use the reports to allocate the monthly charge"],
  a: [0],
  e: "**Application inference profiles** with **cost allocation tags** let you track usage and cost per application.",
  w: [
    "Direct attribution of usage and cost through tagged profiles.",
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
    "A monthly review of the invoice by the finance team, who can then ask engineering about any large increases",
    "S3 Lifecycle rules that remove old prompts so that the agent has fewer opportunities to repeat calls",
    "A higher Lambda timeout so that the agent has time to finish its work before it is stopped"],
  a: [0],
  e: "Combine **financial anomaly detection** with **operational token metrics and alarms** for fast detection.",
  w: [
    "Automated detection from both spend and usage signals.",
    "A monthly review is too slow to catch an overnight loop.",
    "Lifecycle rules manage object storage and do not detect cost spikes.",
    "Longer timeouts allow more loop iterations and more cost."]
},

{
  id: "d4-010", d: 4, t: "4.1", s: "4.1.1", type: "multiple",
  sc: "A summarisation API produces verbose answers with long preambles, driving up output token cost.",
  q: "Which TWO actions reduce output cost without losing key content?",
  o: [
    "Set an appropriate maxTokens value and instruct the model to respond concisely in a defined format",
    "Compress the prompt instructions and remove unnecessary examples, validating quality on an evaluation set",
    "Ask the model to be as detailed as possible so that fewer follow-up questions need to be asked",
    "Double the temperature so that the model produces shorter, more varied responses on each request",
    "Remove the evaluation set to save time, since compression and limits are always safe to apply"],
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
    "Include tenant and permission context in the cache key or partition, so one user's cached answer is never served to a user without access",
    "Share one global cache so that every answer is reused across all users and hit rates are as high as possible",
    "Disable access control checks for cached items, since they were already checked when first generated",
    "Cache every answer indefinitely so that the cost of generating each answer is paid only once"],
  a: [0],
  e: "Caches must respect **authorization and personalization**. Scope keys by tenant/permissions and set sensible TTLs, or you create a data leak.",
  w: [
    "Prevents cross-user leakage of restricted content.",
    "A global cache could expose restricted content to the wrong users.",
    "Removing access control on cache hits is a security failure.",
    "Infinite caching serves stale or unauthorized content."]
},

{
  id: "d4-012", d: 4, t: "4.1", s: "4.1.2", type: "single",
  sc: "A high-volume feature uses a large model, and evaluations show a smaller model fails on a narrow set of stylistic requirements. The company can generate many high-quality examples using the large model.",
  q: "Which approach can lower per-request cost at scale?",
  o: [
    "Distill the large model's behavior into a smaller model (model distillation) and evaluate it against the golden dataset",
    "Keep the large model for every request, since its quality is already proven for the feature",
    "Train a new foundation model from scratch using the company's own data for this single feature",
    "Increase the prompt length to include more style instructions, so that the smaller model can follow them"],
  a: [0],
  e: "**Distillation** transfers a larger model's capability to a smaller, cheaper one for a specific task, cutting cost and latency at volume.",
  w: [
    "A smaller model trained on large-model outputs for this task, cutting cost and latency at volume.",
    "Misses the savings opportunity at high volume.",
    "Training from scratch is far costlier.",
    "Longer prompts increase cost and the evaluation shows the smaller model still fails."]
},

{
  id: "d4-013", d: 4, t: "4.2", s: "4.2.1", type: "single",
  sc: "A news site shows an AI-generated daily briefing that is identical for all readers each morning. Generating it on demand makes the first load slow and expensive.",
  q: "Which approach is MOST effective?",
  o: [
    "Pre-compute the briefing on a schedule (for example with EventBridge and Lambda), store it, and serve it from cache or CDN",
    "Generate the briefing on every page view so that readers always receive the most recent output",
    "Use a larger model for the briefing so that the first page load completes faster",
    "Increase the temperature so that the briefing is generated with fewer tokens on each request"],
  a: [0],
  e: "**Pre-computation** turns predictable work into a cheap read and removes model latency from the user path.",
  w: [
    "Removes model latency and cost from the request path for predictable output.",
    "Per-view generation repeats identical work.",
    "A larger model is typically slower and more expensive.",
    "Temperature does not help speed."]
},

{
  id: "d4-014", d: 4, t: "4.2", s: "4.2.1", type: "single",
  sc: "A voice assistant must begin speaking within a second. Responses are short, and the current model is slow.",
  q: "Which Amazon Bedrock capability should be evaluated?",
  o: [
    "Latency-optimized inference for supported models, combined with streaming and a smaller model",
    "Batch inference, so that the model processes each reply in the background and returns it quickly",
    "A larger context window so that the model has more information available to respond in a single step",
    "Cross-Region replication of the S3 bucket that stores the conversation history for the assistant"],
  a: [0],
  e: "Latency-sensitive paths benefit from **latency-optimized inference options**, **streaming**, and appropriately sized models.",
  w: [
    "Targets time to first token and response speed for interactive use.",
    "Batch inference is asynchronous and unsuited to voice interaction.",
    "A larger window does not speed up generation.",
    "S3 replication is storage replication and does not change inference latency."]
},

{
  id: "d4-015", d: 4, t: "4.2", s: "4.2.1", type: "single",
  sc: "A report generator makes five independent model calls (one per section) sequentially, taking 40 seconds in total. Sections do not depend on each other.",
  q: "How can total latency be reduced MOST?",
  o: [
    "Run the five calls in parallel (a Step Functions Map or Parallel state, or concurrent SDK calls) within quota limits and assemble the results",
    "Keep the calls sequential but add a short delay between them so that the service is not overloaded by the requests from the report",
    "Combine all five sections into one very large prompt so that only one call is required, even though the response is much longer",
    "Remove all caching so that each section is generated fresh and no stale content can be returned to the people reading the report"],
  a: [0],
  e: "**Parallel requests** reduce wall-clock time for independent sub-tasks; respect concurrency quotas.",
  w: [
    "Wall-clock time becomes roughly that of the slowest call.",
    "Delays add time.",
    "One huge prompt may increase latency and reduce quality.",
    "Caching is a separate lever, and removing it does not reduce latency."]
},

{
  id: "d4-016", d: 4, t: "4.2", s: "4.2.2", type: "single",
  sc: "Vector search in an OpenSearch-based RAG system takes 900 ms and returns many borderline results. Most of the time is spent scoring many candidates.",
  q: "Which change is MOST likely to improve retrieval performance?",
  o: [
    "Tune the index (ANN parameters, shard layout, quantization), apply metadata filters to narrow candidates, and retrieve fewer results before reranking",
    "Increase the number of results returned to 500 so that the relevant passage is more likely to be included",
    "Remove metadata from the index to reduce its size, relying only on vector similarity for relevance",
    "Disable the approximate nearest-neighbor index so that every query uses exact comparison on all vectors"],
  a: [0],
  e: "Index tuning, **filtering** and retrieving fewer, better candidates reduce retrieval latency and improve relevance.",
  w: [
    "Targets the cost of scoring and candidate volume while improving relevance.",
    "Returning more results increases the amount of work.",
    "Metadata supports filtering and reduces the candidate set.",
    "Exact scans are slower."]
},

{
  id: "d4-017", d: 4, t: "4.2", s: "4.2.2", type: "single",
  sc: "A product search assistant needs both exact SKU matching and semantic similarity, with business control over how much each signal counts (for example, boosting in-stock items).",
  q: "Which approach is MOST appropriate?",
  o: [
    "Hybrid search in OpenSearch with custom scoring that weights lexical and vector scores and applies business boosts",
    "Vector-only search with a higher-dimension embedding, relying on it to match the SKUs exactly",
    "Keyword-only search with a synonym list, accepting that semantic queries will not match relevant products",
    "Random ordering of the matching products, adjusted by hand when the merchandising team reports a problem"],
  a: [0],
  e: "**Hybrid search with custom scoring** combines lexical and semantic relevance and allows business-specific weighting.",
  w: [
    "Controls the blend of exact and semantic matching and allows business boosts.",
    "Vectors may blur exact SKUs.",
    "Misses semantic similarity.",
    "Random ordering provides no relevance."]
},

{
  id: "d4-018", d: 4, t: "4.2", s: "4.2.3", type: "single",
  sc: "A pipeline sends 2,000 simultaneous requests to a model and gets throttled. Throughput targets are high, but latency of each request is not critical.",
  q: "Which approach MOST improves effective throughput?",
  o: [
    "Buffer requests in SQS and process with bounded concurrency tuned to quotas, with retries and backoff, or use batch inference for non-urgent work",
    "Remove all retries so that throttled requests are dropped immediately and do not add further load to the service during the burst",
    "Send all 2,000 requests at once with no limit, since the service will queue them internally if it cannot process them in time",
    "Reduce the number of workers to zero during peak periods so that no requests are sent and therefore none can be throttled"],
  a: [0],
  e: "Manage **concurrency** to match capacity, buffer bursts, and use batch where latency is flexible.",
  w: [
    "Smooths load and maximizes useful throughput within quotas.",
    "Dropped requests are lost and not processed.",
    "Unbounded bursts increase throttling.",
    "Zero workers process nothing."]
},

{
  id: "d4-019", d: 4, t: "4.2", s: "4.2.4", type: "single",
  sc: "A data-extraction prompt returns slightly different field values on repeated runs. The task needs consistent, factual extraction.",
  q: "Which inference parameter change is MOST appropriate?",
  o: [
    "Lower the temperature (and optionally top-p) and validate the result on an evaluation set",
    "Raise the temperature to 1.0 so that the model explores more candidate values and picks the most common",
    "Increase top-k to the maximum so that the model considers the widest range of possible tokens",
    "Remove stop sequences so that the model can reconsider its answer before it finishes generating"],
  a: [0],
  e: "**Lower temperature** reduces randomness for factual, extraction and classification tasks. It improves consistency but does not guarantee identical output.",
  w: [
    "Reduces sampling randomness for factual and extraction tasks.",
    "Higher temperature adds variability.",
    "Considering more tokens increases variability.",
    "Stop sequences control termination, not randomness."]
},

{
  id: "d4-020", d: 4, t: "4.2", s: "4.2.4", type: "single",
  sc: "A team wants to know whether changing temperature from 0.7 to 0.3 improves answer quality for its support assistant.",
  q: "What is the BEST way to decide?",
  o: [
    "A/B test both settings on the same evaluation set (optionally followed by a canary on live traffic), comparing quality, consistency and cost",
    "Choose the setting based on the intuition of the most experienced engineer on the team",
    "Change several inference parameters at once without measuring, then keep the combination that looks best",
    "Use the highest temperature available, since more variety makes the assistant seem more helpful"],
  a: [0],
  e: "**A/B testing** with a fixed evaluation set provides evidence for parameter choices. Change one variable at a time.",
  w: [
    "Evidence-based comparison changing one variable at a time.",
    "Intuition is unreliable.",
    "Multiple simultaneous changes confound the results.",
    "High temperature increases variability and rarely improves support quality."]
},

{
  id: "d4-021", d: 4, t: "4.2", s: "4.2.5", type: "single",
  sc: "A self-hosted LLM service on containers scales on CPU utilization, but GPUs are saturated and requests queue up while CPU stays low.",
  q: "Which scaling signal is MOST appropriate?",
  o: [
    "Queue depth, concurrent requests per replica or GPU utilization",
    "Container CPU utilization only, since it is the standard scaling signal for container workloads",
    "Disk free space on the node, which drops as more model requests are logged",
    "The day of the week, with extra replicas added on the days that usually have more traffic"],
  a: [0],
  e: "LLM inference is **GPU- and token-bound**. Scale on **queue depth, concurrency or GPU utilization**.",
  w: [
    "Reflects the actual saturation of GPU-bound inference.",
    "CPU may stay low while GPUs are saturated.",
    "Disk space is unrelated to inference load.",
    "Calendar-based scaling ignores real load."]
},

{
  id: "d4-022", d: 4, t: "4.2", s: "4.2.5", type: "single",
  sc: "A team expects 200 requests per minute, averaging 1,500 input tokens and 400 output tokens, and must size Bedrock capacity and quotas.",
  q: "Which calculation is MOST appropriate for capacity planning?",
  o: [
    "Plan in tokens per minute: roughly 200 × (1,500 + 400) = 380,000 tokens per minute at average load, then add headroom for peaks",
    "Plan only for requests per second with no token estimate, since the quota is expressed per request",
    "Plan for 200 tokens per minute, since the request rate is the number that determines capacity",
    "Plan using only the 1,500 input tokens, since output tokens do not count toward the quota or the cost"],
  a: [0],
  e: "LLM capacity is expressed in **tokens per minute** (input plus output), with headroom for burst and growth.",
  w: [
    "Correct token-rate planning, with burst headroom.",
    "Requests alone hide the token load.",
    "Underestimates by orders of magnitude.",
    "Output tokens contribute to quota consumption and cost."]
},

{
  id: "d4-023", d: 4, t: "4.2", s: "4.2.6", type: "single",
  sc: "An index with 1,024-dimension vectors is slow and memory-heavy. Evaluations show a small recall drop with 512 dimensions or with quantization.",
  q: "Which optimization is MOST appropriate?",
  o: [
    "Reduce dimensionality or apply vector quantization, then re-index and verify recall on test queries",
    "Double the dimensionality of the embeddings so that each vector captures more detail about its content",
    "Remove the index entirely and compute similarity against every stored vector in application code",
    "Increase top-k to 10,000 so that the relevant passages are certain to be included in the results"],
  a: [0],
  e: "Dimension reduction and **quantization** trade a small recall loss for large memory and latency gains; verify with retrieval tests.",
  w: [
    "Trades a small recall loss for large memory and latency gains, with verification.",
    "More dimensions increases memory and latency.",
    "Removing the index forces slow scans.",
    "A larger top-k increases the work for each query."]
},

{
  id: "d4-024", d: 4, t: "4.2", s: "4.2.6", type: "single",
  sc: "End-to-end latency is 6 seconds. Profiling shows time to first token is 3.5 seconds, driven by a 25,000-token prompt, and cross-Region calls to the vector store add 400 ms.",
  q: "Which TWO-step approach addresses the biggest contributors?",
  o: [
    "Shrink the prompt (fewer, reranked chunks; prompt caching for static parts) and co-locate the application and vector store in the same Region",
    "Increase maxTokens and change the temperature so that the model produces its answer more quickly",
    "Add more retries to the vector store call so that slow queries are repeated until they are fast",
    "Move the vector store to a different continent so that it is closer to the model's training data"],
  a: [0],
  e: "Profile first, then fix the dominant costs: **prompt size** and **network distance**. Prompt caching and fewer chunks reduce time to first token.",
  w: [
    "Targets both measured bottlenecks: prompt size and network distance.",
    "These settings do not address the bottlenecks.",
    "Retries add latency.",
    "More distance adds latency."]
},

{
  id: "d4-025", d: 4, t: "4.3", s: "4.3.1", type: "single",
  sc: "Users sometimes see failures at peak. The operations team wants an alert when Bedrock throttles requests and a dashboard of latency and token usage per model.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Use CloudWatch Bedrock runtime metrics (invocations, latency, throttles, input and output token counts) with alarms and a dashboard",
    "Use AWS Budgets alone, with a threshold that notifies the team when monthly spending exceeds a limit",
    "Run Amazon Macie on the application's S3 buckets to detect throttling and latency problems early",
    "Use Route 53 health checks alone, which report whether the application's domain is reachable"],
  a: [0],
  e: "Bedrock publishes **CloudWatch metrics** such as invocations, latency, throttling and token counts that support alarms and dashboards.",
  w: [
    "Native operational metrics for exactly these signals.",
    "Budgets track spend, not throttles or latency.",
    "Macie discovers sensitive data in S3.",
    "Health checks alone do not show model throttles or token usage."]
},

{
  id: "d4-026", d: 4, t: "4.3", s: "4.3.2", type: "single",
  sc: "The team needs to analyse the exact prompts and responses for slow and expensive requests to find patterns, but no content logs exist.",
  q: "What should they do?",
  o: [
    "Enable Bedrock model invocation logging to S3 and/or CloudWatch Logs with encryption and access control, and query with Logs Insights or Athena",
    "Enable CloudTrail only, because CloudTrail stores the prompt and response text for each model invocation",
    "Ask users to send screenshots of slow or expensive conversations so that the team can review them manually",
    "Increase the number of retries so that the SDK records additional detail about every failed request"],
  a: [0],
  e: "**Model invocation logging** (off by default) captures request and response content and metadata. CloudTrail records API calls but not prompt content.",
  w: [
    "Provides content-level logs for analysis.",
    "CloudTrail records API calls and does not include prompt content.",
    "Screenshots are not a systematic log.",
    "Retries do not produce content logs."]
},

{
  id: "d4-027", d: 4, t: "4.3", s: "4.3.2", type: "single",
  sc: "Token consumption occasionally spikes far above normal levels, for example when a client script misbehaves. Static thresholds are hard to set because traffic varies by hour.",
  q: "Which monitoring approach works BEST?",
  o: [
    "CloudWatch anomaly detection alarms on the token-count metrics",
    "A fixed alarm threshold set at a very high token count that traffic is not expected to reach",
    "No alarm, with the team reviewing the token usage dashboard when they happen to look at it",
    "A weekly manual review of invoices by the finance team to compare usage with the previous week"],
  a: [0],
  e: "**Anomaly detection** learns expected patterns (including time-of-day) and alarms on deviations such as token bursts.",
  w: [
    "Learns expected patterns (including time of day) and alarms on deviations.",
    "A fixed threshold either misses spikes or fires constantly for traffic that varies by hour.",
    "No alarm means no timely detection.",
    "Too slow to catch a spike."]
},

{
  id: "d4-028", d: 4, t: "4.3", s: "4.3.1", type: "single",
  sc: "A RAG pipeline calls API Gateway, Lambda, OpenSearch, Bedrock and a downstream CRM. Teams want one view of each request across all services, including multi-agent hand-offs.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Distributed tracing with X-Ray or OpenTelemetry (for example AgentCore Observability for agents), with trace IDs propagated across services",
    "Reading each service's billing line item for the day to compare which service was used the most",
    "Relying on CPU metrics of each compute resource to infer how requests flowed through the application",
    "Copying logs from each service into email messages so that engineers can read them in order"],
  a: [0],
  e: "**Distributed tracing** correlates a request across services and agent steps with a trace ID.",
  w: [
    "End-to-end visibility of each request across services and agent hand-offs.",
    "Billing is not tracing.",
    "CPU metrics do not show request flow.",
    "Email is not observability."]
},

{
  id: "d4-029", d: 4, t: "4.3", s: "4.3.1", type: "single",
  sc: "Executives want to see business outcomes of the assistant (resolution rate, escalation rate, customer satisfaction) next to technical metrics on a single dashboard.",
  q: "Which solution is MOST appropriate?",
  o: [
    "Publish business metrics as custom CloudWatch metrics and build CloudWatch or Managed Grafana dashboards that show them with operational metrics",
    "Prepare a printed monthly report of business outcomes that is distributed to the executives and discussed in a management meeting",
    "Use only token counts and latency, since they are the only measures that the platform exposes automatically to the operations team",
    "Remove the metrics, since business outcomes are better judged through occasional impressions that executives gather from customers"],
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
    "Sample production responses on a schedule, score them with an LLM judge and grounding checks, publish quality metrics to CloudWatch, and alarm on drops",
    "Review every production response manually for as long as the assistant is in service, with reviewers scoring each of them by hand",
    "Assume the quality never changes after launch, since the model and documents are not modified by the team after they are deployed",
    "Count the number of words in each answer and treat longer answers as evidence of higher quality and of fewer hallucinations"],
  a: [0],
  e: "**Sampled automated evaluation** (judge plus grounding scores) provides scalable quality monitoring.",
  w: [
    "Scalable, automated quality measurement with trends and alerts.",
    "Does not scale.",
    "Quality can drift as content and usage change.",
    "Word count is not quality."]
},

{
  id: "d4-031", d: 4, t: "4.3", s: "4.3.4", type: "single",
  sc: "An agent usually calls a lookup tool one to three times per request. After a prompt change, some requests call it forty times. The team wants to catch this quickly in the future.",
  q: "Which measure is MOST appropriate?",
  o: [
    "Track tool-call counts, latency and error rates per request with baselines, and alarm when counts exceed expected ranges",
    "Disable all tools so that the agent cannot call them more times than are expected",
    "Increase the model temperature so that the agent is less likely to repeat the same tool call",
    "Ignore tool metrics and rely on the final answer quality to reveal any problem with tool usage"],
  a: [0],
  e: "**Tool call-pattern tracking** with usage baselines detects loops and regressions early.",
  w: [
    "Baselined monitoring of tool behavior detects loops and regressions early.",
    "Removes functionality instead of monitoring it.",
    "Temperature does not diagnose or prevent loops.",
    "Misses the issue until the cost or latency is already affected."]
},

{
  id: "d4-032", d: 4, t: "4.3", s: "4.3.5", type: "multiple",
  sc: "The team operates an OpenSearch vector index backing a production assistant and wants proactive operational management.",
  q: "Which TWO practices help?",
  o: [
    "Monitor query latency, indexing lag, resource utilization and recall on a fixed set of test queries",
    "Run data quality validation (duplicates, empty chunks, missing metadata) and scheduled index optimization or reindexing after embedding changes",
    "Never review index health, since managed services optimize the index automatically for every use case",
    "Add random documents to the index to test how it behaves when the amount of data increases suddenly",
    "Disable alarms on the cluster to avoid alert noise during normal fluctuations in query volume"],
  a: [0,1],
  e: "Operate vector stores with **performance and relevance monitoring** plus **data quality and index maintenance** routines.",
  w: [
    "Tracks performance and retrieval quality.",
    "Keeps data and index healthy over time.",
    "No review leads to silent degradation.",
    "Random documents pollute the results.",
    "Alarms provide early warning."]
},

{
  id: "d4-033", d: 4, t: "4.3", s: "4.3.6", type: "single",
  sc: "After each prompt or model change, the team wants to detect hallucinations and regressions using a fixed set of questions with known reference answers.",
  q: "Which asset should they maintain?",
  o: [
    "A golden dataset of representative inputs and expected answers, replayed automatically and scored on every change",
    "A fresh random sample of new questions each time, so that the evaluation is never influenced by earlier tests",
    "A list of the model names and versions that have been used in production since the project began",
    "A spreadsheet of monthly costs for each model, compared between releases"],
  a: [0],
  e: "A **golden dataset** gives a stable benchmark for detecting hallucination and regressions across changes.",
  w: [
    "A stable, repeatable regression benchmark.",
    "Non-comparable between runs.",
    "Does not test behavior.",
    "Costs do not measure quality."]
},

{
  id: "d4-034", d: 4, t: "4.3", s: "4.3.6", type: "single",
  sc: "A model upgrade shows no errors, but support staff say answers feel different. The team wants to quantify how much responses changed on the same prompts.",
  q: "Which technique is MOST appropriate?",
  o: [
    "Output diffing: run identical prompts through both versions and compare responses with semantic similarity and judge scoring",
    "Compare the model release notes of the two versions, which list all of the behavioral changes",
    "Check the Lambda memory configuration, since it determines how the model phrases its answers",
    "Compare only the average response lengths of the two versions over the last week of production"],
  a: [0],
  e: "**Output diffing** compares responses across versions for consistency using semantic and judged measures.",
  w: [
    "Direct, quantitative consistency analysis on the same inputs.",
    "Release notes do not show behavior on your prompts.",
    "Memory configuration is unrelated.",
    "Length alone misses semantic change."]
},

{
  id: "d4-035", d: 4, t: "4.3", s: "4.3.6", type: "single",
  sc: "A multi-step agent reaches wrong conclusions even though each tool returns correct data. Developers need to find the step where the logic went wrong.",
  q: "Which approach is MOST useful?",
  o: [
    "Reasoning path tracing: capture and review the agent's intermediate thoughts, tool selections and observations step by step",
    "Increase maxTokens so that the agent has room to write a longer reasoning section before answering",
    "Switch the application to another Region so that the agent uses a different copy of the model",
    "Only review the final answers, since correct tool data should lead to a correct conclusion"],
  a: [0],
  e: "**Reasoning path tracing** exposes where the agent's logic diverged, which final-answer review cannot.",
  w: [
    "Step-level visibility into where the logic diverged.",
    "maxTokens does not reveal reasoning.",
    "Regions are unrelated to reasoning errors.",
    "Final answers hide the failing step."]
},

{
  id: "d4-036", d: 4, t: "4.3", s: "4.3.3", type: "multiple",
  sc: "A regulated firm wants integrated observability for forensic investigation of AI-assisted decisions.",
  q: "Which TWO capabilities support forensic traceability?",
  o: [
    "Correlation IDs linking user requests to prompts, retrieved documents, tool calls and responses across logs and traces",
    "AWS CloudTrail audit logs and model invocation logs retained under a defined policy",
    "Deleting all logs after one day to limit the amount of sensitive data that is kept",
    "Allowing any engineer to edit log records, so that mistakes in the logs can be corrected quickly",
    "Storing only the final answer of each interaction, because the answers are what customers saw"],
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
