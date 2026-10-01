/* Domain 1 study modules (31% of the exam). Inline markup: **bold**, `code`. */
window.STUDY = window.STUDY || {};
Object.assign(window.STUDY, {
'1.1': {
  goal: 'Turn a vague business ask into a defensible GenAI architecture, prove it with a cheap proof of concept, and standardize it.',
  big: 'The professional exam rarely asks "what is Bedrock". It gives a messy business scenario with constraints (latency, data residency, budget, team skills, risk) and asks which architecture fits **best**. Your job is to translate constraints into design choices: which model access pattern, which augmentation technique (prompting, RAG, fine-tuning, agents), which integration pattern (sync, streaming, async, event-driven) and which guardrails.',
  concepts: [
    { h: 'The augmentation ladder: always climb the cheapest rung that works', p: 'Start with **prompt engineering** (minutes, no data pipeline). If the model lacks private or fresh knowledge, add **RAG** (Knowledge Bases). If you need a consistent style, format or domain behaviour that prompts cannot achieve, consider **fine-tuning** or distillation. If the task needs multiple steps and live systems, add **agents/tools**. Moving up costs more engineering, time and money.', trap: 'Fine-tuning is almost never the answer for "the model needs our latest documents". Knowledge that changes belongs in retrieval, not in weights.' },
    { h: 'Proof of concept before scale', p: 'A PoC answers three questions: is it **feasible** (can any FM do the task?), does it **perform** (quality, latency, cost per request measured on a representative sample), and does it create **business value**. On AWS the fastest PoC path is Amazon Bedrock: the Bedrock Playground to compare models, Knowledge Bases for RAG in a few clicks, and Bedrock Model Evaluations to score candidates. Use real, representative data and a **golden dataset** so results are comparable.', trap: 'A PoC that uses toy data, a single happy-path prompt and no cost measurement does not validate feasibility.' },
    { h: 'Integration patterns and when each fits', p: '**Synchronous request/response** for chat or short tasks (Converse API). **Streaming** when perceived latency matters (ConverseStream). **Asynchronous** (SQS, Step Functions, Bedrock batch inference) for long documents or bulk jobs where users do not wait. **Event-driven** (EventBridge, S3 events) to add AI to existing systems with loose coupling. Pick based on who is waiting and how long the work takes.' },
    { h: 'Deployment strategies', p: '**Serverless / on-demand** Bedrock for variable or unpredictable traffic and the lowest ops burden. **Provisioned Throughput** for steady high volume needing guaranteed capacity (and required for most custom models). **SageMaker AI endpoints** when you need full control of the container, open-weight models, GPUs or custom inference code. **Hybrid** combines them: Bedrock for general tasks, SageMaker for a specialised model.' },
    { h: 'Standardization with the Well-Architected Framework and GenAI Lens', p: 'The **Generative AI Lens** extends the six Well-Architected pillars (operational excellence, security, reliability, performance efficiency, cost optimization, sustainability) with GenAI-specific guidance: model selection, prompt management, guardrails, evaluation, data lineage. Use the **AWS Well-Architected Tool** to run reviews against the lens and keep reusable, versioned building blocks (IaC modules, prompt templates, guardrail configs) so every team ships consistently.' }
  ],
  tables: [{ title: 'Choosing the augmentation technique', head: ['Need', 'Best fit', 'Why not the others'], rows: [
    ['Model must follow a brand voice or output format', 'Prompt engineering / Prompt Management templates', 'Fine-tuning is heavier; start with prompts'],
    ['Answers must use private documents that change weekly', 'RAG with Knowledge Bases', 'Fine-tuning bakes in stale knowledge and needs retraining'],
    ['Specialised terminology, consistent style at low latency/cost', 'Fine-tuning or distillation to a smaller model', 'Prompts get long and costly at scale'],
    ['Multi-step tasks calling live APIs', 'Agents (Bedrock Agents / AgentCore / Strands)', 'RAG alone cannot take actions'],
    ['Deterministic business rules or numeric answers', 'Code/tools (text-to-SQL, Lambda) with the FM orchestrating', 'LLMs are probabilistic and weak at exact arithmetic']] }],
  flow: { title: 'From requirement to architecture', steps: [
    { t: 'Clarify constraints', d: 'Latency, volume, data sensitivity, residency, budget, team skills' },
    { t: 'Pick technique', d: 'Prompting, then RAG, then tuning, then agents' },
    { t: 'PoC on Bedrock', d: 'Representative data, golden set, measure quality, latency, cost' },
    { t: 'Design for production', d: 'Integration pattern, guardrails, observability, IaC' },
    { t: 'Review & standardize', d: 'Well-Architected GenAI Lens, reusable components' }] },
  patterns: [
    'Scenario says "latest company documents" and "least effort" → Knowledge Bases (RAG), not fine-tuning.',
    '"Validate before investing" → a time-boxed Bedrock PoC with a golden dataset and cost measurement.',
    '"Consistent across many teams/environments" → IaC modules, Prompt Management, shared guardrails, Well-Architected GenAI Lens review.',
    '"Unpredictable bursts" → on-demand Bedrock; "steady predictable high volume" → Provisioned Throughput.'],
  refs: [['Generative AI Lens', 'https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html'], ['Amazon Bedrock user guide', 'https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html']]
},

'1.2': {
  goal: 'Choose the right FM, make the choice swappable at runtime, keep the system alive when a model or Region fails, and manage customized models through their lifecycle.',
  big: 'Model choice is a **business decision with measurable inputs**: quality on your task, latency, cost, context window, modalities, languages, licensing and regional availability. The professional twist is architecture: apps should not hard-code a model. Configuration, routing and fallbacks let you change providers without a code deploy and survive outages.',
  concepts: [
    { h: 'Selecting a model with evidence', p: 'Compare candidates on a representative task set using **Bedrock Model Evaluations** (automatic metrics, LLM-as-a-judge or human review). Weigh benchmark scores against **your** task, then measure latency and cost per successful answer. Check context window size, supported modalities, tool-use support, and whether the model is available in your Region. Smaller models are often good enough for classification, extraction and routing.', trap: 'Public leaderboards are a starting point, not proof. The exam favours evaluating candidates on the customer\'s own data.' },
    { h: 'Provider switching without code changes', p: 'Keep the model ID, inference parameters and prompt version **outside the code**. **AWS AppConfig** delivers feature flags and configuration with validation, gradual rollout and automatic rollback on CloudWatch alarms. Put an abstraction in front: a **Lambda** function (or **API Gateway** + Lambda) that reads the config and calls Bedrock through the **Converse API**, whose unified request format makes swapping models far easier than model-specific `InvokeModel` bodies.', trap: 'If the question says "without redeploying" or "dynamic", think AppConfig / Parameter Store plus an abstraction layer, not editing environment variables in code.' },
    { h: 'Resilient AI systems', p: 'Layer defences: SDK **retries with exponential backoff and jitter** for throttling; a **circuit breaker** in **Step Functions** (track consecutive failures in DynamoDB; a Choice state stops calling an unhealthy model and routes to a fallback); **cross-Region inference** profiles to spread load and survive Regional capacity limits; **graceful degradation** (smaller model, cached answer, retrieval-only result, static message) when everything else fails.' },
    { h: 'Cross-Region inference (CRIS)', p: 'An **inference profile** routes a request to the best available Region in a geography (for example US or EU) or globally. It increases throughput, absorbs traffic bursts and helps for models with limited Regional availability. Data at rest stays in the source Region; requests may be processed in other Regions of the profile, which matters for strict residency requirements. **Application inference profiles** add tagging for cost tracking.', trap: 'Cross-Region inference is not disaster recovery for your own data, and it can conflict with a hard "must process only in Region X" rule.' },
    { h: 'Customizing and managing models', p: '**Bedrock** supports fine-tuning, continued pre-training and distillation for supported models, plus **Custom Model Import** for open-weight models. **SageMaker AI** hosts domain-specific fine-tuned models when you need container control. **LoRA** and other parameter-efficient techniques train small adapter weights instead of all parameters, cutting GPU time and cost and letting several adapters share one base model. Track versions in **SageMaker Model Registry** (approval status, lineage), deploy through automated pipelines with **blue/green or canary** shifting and CloudWatch-alarm rollback, and **retire** models on a schedule by replacing aliases rather than deleting blindly.' }
  ],
  tables: [{ title: 'Resilience tools and what they solve', head: ['Failure', 'Mechanism', 'Where it lives'], rows: [
    ['Transient throttling (429)', 'Retry with exponential backoff + jitter', 'AWS SDK config'],
    ['A model keeps failing or is slow', 'Circuit breaker, then route to fallback model', 'Step Functions + DynamoDB state'],
    ['Regional capacity or burst traffic', 'Cross-Region inference profile', 'Bedrock'],
    ['Everything down', 'Graceful degradation: cache, static answer, retrieval only', 'Application logic'],
    ['Bad model release', 'Canary/blue-green with alarm rollback; Model Registry versions', 'SageMaker / CodeDeploy / AppConfig']] }],
  flow: { title: 'A swappable, resilient model call', steps: [
    { t: 'Client request', d: 'API Gateway + Lambda' },
    { t: 'Read config', d: 'AppConfig: model ID, params, prompt version' },
    { t: 'Invoke', d: 'Bedrock Converse via inference profile' },
    { t: 'On failure', d: 'Retry, then Step Functions circuit breaker, then fallback model' },
    { t: 'Degrade', d: 'Cached or retrieval-only answer if all else fails' }] },
  patterns: [
    '"Switch models without code changes" → AppConfig + abstraction (Converse API).',
    '"Model has limited Regional availability / need more throughput" → cross-Region inference profile.',
    '"Stop hammering a failing dependency" → circuit breaker (Step Functions + DynamoDB).',
    '"Train only a small number of parameters" → LoRA / adapters; "version, approve, roll back" → Model Registry.'],
  refs: [['Cross-Region inference', 'https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html'], ['Converse API', 'https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html'], ['SageMaker Model Registry', 'https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html']]
},

'1.3': {
  goal: 'Make sure the data entering an FM is valid, correctly formatted for that model, multimodal-ready and high quality.',
  big: 'Garbage in, confident garbage out. This task is about the **pipeline in front of the model**: validating data, converting text, images, audio and tables into forms a model can consume, formatting requests exactly as each model API expects, and cleaning inputs so responses are better and more consistent.',
  concepts: [
    { h: 'Validation workflows', p: '**AWS Glue Data Quality** defines rules in DQDL (completeness, uniqueness, value ranges, referential checks) and scores datasets inside Glue jobs. **SageMaker Data Wrangler** profiles and cleans data visually for ML. **Lambda** runs custom checks (schema, language, length, PII) on events such as S3 uploads. Publish pass/fail counts as **CloudWatch metrics** and alarm on drops so bad data stops the pipeline early.' },
    { h: 'Multimodal and complex data', p: '**Text**: clean, deduplicate, chunk. **Images**: send to multimodal FMs on Bedrock (for example Claude or Nova) for captioning or Q&A, or use Rekognition/Textract for specialised extraction. **Audio**: **Amazon Transcribe** converts speech to text (with speaker labels and PII redaction) before an FM summarises it. **Tabular**: convert to structured text or let the FM write SQL; use **SageMaker Processing** for heavy batch transforms. **Bedrock Data Automation** extracts structured output from documents, images, audio and video using blueprints.', trap: 'Use the purpose-built service when it exists. Transcribe for audio-to-text, Textract for forms and tables in scanned docs, then the FM for reasoning over the result.' },
    { h: 'Model-specific request formatting', p: '`InvokeModel` bodies are **model-specific JSON** (each provider defines its own fields for prompt, max tokens, temperature). The **Converse API** normalises this into a common `messages` structure with roles (`user`/`assistant`), a `system` block, `inferenceConfig`, `toolConfig` and `guardrailConfig`. SageMaker endpoints expect whatever the serving container defines (for example a JSON `inputs` + `parameters` payload). Dialog apps must replay conversation history in the right role order.', trap: 'A ValidationException after switching models usually means the request body format is wrong for that model. Converse avoids this class of bug.' },
    { h: 'Improving input quality', p: 'Normalise before you embed or prompt: strip boilerplate and markup, fix encodings, standardise dates and units, expand abbreviations, resolve duplicates. Use **Comprehend** to extract entities, key phrases, language and PII. Use an FM itself to **rewrite messy text** into clean, structured form. Do the deterministic work in **Lambda**.' }
  ],
  tables: [{ title: 'Which service prepares which data', head: ['Input', 'Service', 'Output for the FM'], rows: [
    ['Scanned forms, invoices, tables', 'Amazon Textract (or Bedrock Data Automation)', 'Text, key-value pairs, tables'],
    ['Call recordings', 'Amazon Transcribe', 'Transcript with speakers, optional PII redaction'],
    ['Images', 'Multimodal FM on Bedrock / Rekognition', 'Descriptions, labels, answers'],
    ['Free text with entities and PII', 'Amazon Comprehend', 'Entities, sentiment, PII spans'],
    ['Large CSV/Parquet transforms', 'SageMaker Processing / Glue ETL', 'Clean features or text'],
    ['Dataset health checks', 'Glue Data Quality / Data Wrangler', 'Rule pass/fail scores']] }],
  flow: { title: 'Pipeline in front of the model', steps: [
    { t: 'Ingest', d: 'S3 upload, Kinesis, AppFlow' },
    { t: 'Validate', d: 'Glue Data Quality, Lambda checks, CloudWatch metrics' },
    { t: 'Convert', d: 'Transcribe, Textract, multimodal FM, Processing' },
    { t: 'Clean & enrich', d: 'Normalize, Comprehend entities, FM rewrite' },
    { t: 'Format', d: 'Converse messages or model-specific JSON' }] },
  patterns: [
    '"Data must meet quality thresholds before use" → Glue Data Quality rules + CloudWatch alarm.',
    '"Audio calls to summaries" → Transcribe then FM.',
    '"Switching to another model broke requests" → body format; use Converse.',
    '"Extract entities/PII from text before prompting" → Comprehend.'],
  refs: [['Glue Data Quality', 'https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html'], ['Bedrock Data Automation', 'https://docs.aws.amazon.com/bedrock/latest/userguide/bda.html']]
},

'1.4': {
  goal: 'Pick, build and maintain the vector store behind RAG: semantic retrieval, metadata, scale, integrations and freshness.',
  big: 'A vector store holds **embeddings** (numeric representations of meaning) so you can find content by semantic similarity. Exam questions test which store fits the requirement (managed simplicity vs performance vs existing database), how metadata sharpens retrieval, how to scale, and how to keep the index current.',
  concepts: [
    { h: 'Options and when each wins', p: '**Bedrock Knowledge Bases** is the managed route: it ingests from data sources, chunks, embeds and stores in a vector store you choose, and exposes `Retrieve` / `RetrieveAndGenerate`. Supported stores include **OpenSearch Serverless** (default quick create), **Aurora PostgreSQL (pgvector)**, **Neptune Analytics** (GraphRAG), **S3 Vectors** (low-cost, large scale) and third parties such as Pinecone, Redis Enterprise Cloud and MongoDB Atlas. **Amazon OpenSearch Service** gives full control: k-NN, hybrid search, sharding and the neural plugin. **Aurora/RDS PostgreSQL with pgvector** suits teams that want vectors next to relational data and SQL joins. **DocumentDB** and **MemoryDB** also offer vector search. **DynamoDB** is not a vector engine; use it for metadata, session state and pointers alongside a vector store.', trap: 'If the question says "least operational overhead", choose Knowledge Bases with a managed store. If it says "fine control over indexing, scoring, sharding", choose OpenSearch Service.' },
    { h: 'OpenSearch neural search integration', p: 'The OpenSearch **neural plugin** and **ML connectors** call an embedding model (for example on Bedrock) at index and query time, so you can send plain text and let OpenSearch embed it. Ingest pipelines generate embeddings during indexing; **search pipelines** blend lexical and vector scores for hybrid queries. Topic-based segmentation can map to separate indexes or filtered fields.' },
    { h: 'Metadata frameworks', p: 'Attach metadata to each document or chunk: timestamps, author, department, document type, language, access group, domain tags. Retrieval then combines vector similarity with **filters** (for example only HR documents from the last year) for precision and context awareness. In Knowledge Bases, S3 objects can carry a companion `.metadata.json` file; the filter is applied at query time. **S3 object metadata and tags** can drive the same idea in custom pipelines.', trap: 'Per-user or per-tenant access control in RAG is done with **metadata filters** (or separate indexes) applied server-side, never by trusting the prompt to hide documents.' },
    { h: 'Performance at scale', p: 'OpenSearch scales through **shards** (partition the index across nodes) and replicas (throughput and availability). Choose the ANN engine and algorithm (HNSW for low latency and high recall, IVF for memory efficiency), and consider **quantization** to cut memory. Use **multi-index** designs for specialised domains, and **hierarchical indexing** (a coarse summary index routing to detailed chunk indexes) to narrow search. Aurora uses `hnsw` or `ivfflat` indexes.' },
    { h: 'Connecting enterprise content', p: 'Knowledge Bases connect natively to S3, web crawlers, Confluence, SharePoint and Salesforce. For other systems use **AppFlow** (SaaS to S3), **Transfer Family/DataSync** (files), **Lambda** custom connectors, and the direct-ingestion API for custom sources. **Amazon Kendra** and **Amazon Q Business** offer prebuilt connectors when you want enterprise search without managing a vector pipeline.' },
    { h: 'Keeping the index fresh', p: 'Stale vectors give confidently wrong answers. Use **incremental sync** (Knowledge Base ingestion jobs only process changed objects), **change detection** (S3 events to EventBridge or Lambda triggers, DynamoDB Streams, CDC from databases), **scheduled refresh** (EventBridge Scheduler starting ingestion jobs), and delete handling so removed documents leave the index.' }
  ],
  tables: [{ title: 'Vector store selection', head: ['Requirement', 'Choose', 'Notes'], rows: [
    ['Managed RAG, minimal ops', 'Knowledge Bases + OpenSearch Serverless', 'Default quick-create path'],
    ['Lowest storage cost, huge corpora, infrequent queries', 'S3 Vectors', 'Cost-optimised; check latency needs'],
    ['Vectors beside relational data, SQL joins', 'Aurora PostgreSQL pgvector', 'Fits teams already on Aurora/RDS'],
    ['Full control: hybrid, sharding, custom scoring', 'OpenSearch Service (managed cluster)', 'Neural plugin, search pipelines'],
    ['Relationships between entities matter (GraphRAG)', 'Neptune Analytics', 'Graph + vector'],
    ['Document metadata, sessions, caching keys', 'DynamoDB', 'Not a vector index']] }],
  flow: { title: 'Ingestion into a vector store', steps: [
    { t: 'Source', d: 'S3, Confluence, SharePoint, web, custom' },
    { t: 'Parse & chunk', d: 'Strategy chosen for content structure' },
    { t: 'Embed', d: 'Titan Text Embeddings V2 or Cohere Embed' },
    { t: 'Store + metadata', d: 'OpenSearch / Aurora pgvector / S3 Vectors' },
    { t: 'Sync', d: 'Incremental jobs on change or schedule' }] },
  patterns: [
    '"Existing PostgreSQL, join vectors with relational data" → Aurora pgvector.',
    '"Hybrid keyword + semantic with custom scoring" → OpenSearch Service.',
    '"Each user sees only their documents" → metadata filtering / per-tenant index.',
    '"Index must reflect changes within minutes" → event-driven incremental ingestion.'],
  refs: [['Knowledge Bases', 'https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html'], ['OpenSearch k-NN', 'https://docs.aws.amazon.com/opensearch-service/latest/developerguide/knn.html'], ['pgvector on Aurora', 'https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html']]
},

'1.5': {
  goal: 'Design retrieval that actually returns the right context: chunking, embeddings, search type, reranking, query handling and standard access.',
  big: 'Retrieval quality caps answer quality. Most RAG failures are retrieval failures: the right passage was never fetched. This task covers each lever in the pipeline: **how you chunk, which embedding model you use, how you search, how you rerank and how you transform the query**.',
  concepts: [
    { h: 'Chunking strategies', p: '**Fixed-size** (tokens + overlap): simple, predictable. **Default** Bedrock chunking (about 300 tokens, sentence-aware). **Hierarchical**: small child chunks are matched for precision, then the larger **parent** chunk is returned for context. **Semantic**: split where meaning changes using embeddings (costlier, better coherence). **None**: one chunk per file. **Custom** via a Lambda transformation for structure-aware logic (headings, tables, code). Too small loses context; too large dilutes relevance and wastes tokens. Overlap prevents cutting an idea in half.', trap: 'Long structured documents (manuals, contracts with sections) are the classic use case for hierarchical chunking.' },
    { h: 'Embedding model selection', p: '**Amazon Titan Text Embeddings V2** supports 256, 512 or 1,024 dimensions and long inputs (8,192 tokens), multilingual text and optional normalisation. **Cohere Embed** models are strong for multilingual and retrieval-tuned use. Higher dimensions capture more nuance but cost more storage and latency; lower dimensions are cheaper and faster with some accuracy loss. **Use the same model for indexing and querying**, and re-embed everything if you change models. Use batch jobs (Lambda, Bedrock batch inference) to embed large corpora.', trap: 'Mixing embedding models between ingestion and query produces meaningless similarity scores.' },
    { h: 'Search architecture', p: '**Semantic (vector) search** finds meaning but can miss exact tokens such as part numbers or error codes. **Keyword (BM25)** is exact but literal. **Hybrid search** combines both and is usually the best default for enterprise content (Knowledge Bases supports it on OpenSearch, Aurora and MongoDB stores). A **reranker model** (Cohere Rerank, Amazon Rerank via Bedrock) re-scores the top-N candidates with a cross-encoder for much better ordering, improving precision when you send only a few passages to the FM.' },
    { h: 'Query handling', p: '**Query expansion**: have an FM add synonyms or rewrite a terse query. **Decomposition**: split a multi-part question into sub-queries retrieved separately (Knowledge Bases offers query decomposition; you can also build it with Lambda or Step Functions). **Transformation**: rewrite follow-up questions into standalone queries using conversation history; extract metadata filters from natural language.' },
    { h: 'Consistent access for FMs', p: 'Expose retrieval as a **tool**: a function-calling interface (Converse `toolConfig`) or an **MCP server** that wraps vector search so any MCP-capable agent can call it the same way. Standardised APIs (the Knowledge Base `Retrieve` API or an API Gateway endpoint) keep retrieval consistent across apps.' }
  ],
  tables: [{ title: 'Search approach comparison', head: ['Approach', 'Strength', 'Weakness', 'Use when'], rows: [
    ['Vector only', 'Finds paraphrases and concepts', 'Misses exact IDs/codes', 'Natural-language questions'],
    ['Keyword only', 'Exact matches', 'No semantics', 'Known-term lookup'],
    ['Hybrid', 'Both signals', 'More tuning', 'Default for enterprise search'],
    ['Hybrid + rerank', 'Best top-k precision', 'Extra latency/cost', 'Quality matters, few passages sent to FM']] }],
  flow: { title: 'Advanced retrieval pipeline', steps: [
    { t: 'Rewrite query', d: 'Expand, decompose, extract filters' },
    { t: 'Hybrid search', d: 'Vector + keyword with metadata filters' },
    { t: 'Rerank', d: 'Cross-encoder reorders top candidates' },
    { t: 'Assemble context', d: 'Parent chunks, citations, token budget' },
    { t: 'Generate', d: 'FM answers from retrieved context' }] },
  patterns: [
    '"Exact product codes are being missed" → hybrid search.',
    '"Right passage retrieved but ranked 8th" → add a reranker.',
    '"Answers lack surrounding context" → hierarchical chunking (return parent).',
    '"Question has several parts" → query decomposition.',
    '"Lower storage cost with minimal accuracy loss" → fewer embedding dimensions.'],
  refs: [['KB chunking and parsing', 'https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking-parsing.html'], ['Titan embeddings', 'https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html'], ['Reranker models', 'https://docs.aws.amazon.com/bedrock/latest/userguide/rerank.html']]
},

'1.6': {
  goal: 'Control FM behaviour with well-built prompts, manage prompts like code, test them, and chain them into workflows.',
  big: 'In production, prompts are **versioned, governed, tested assets**, not strings buried in code. Expect questions on prompt techniques (role, structure, chain-of-thought, output formats), on **Bedrock Prompt Management and Prompt Flows**, and on governance (approval, audit, regression testing).',
  concepts: [
    { h: 'Instruction frameworks', p: 'Strong prompts separate **system instructions** (role, tone, rules, refusal policy) from **user input** and **context**. **Bedrock Prompt Management** stores prompts with `{{variables}}`, multiple **variants** (compare models or wording), **drafts and immutable versions**, and can be called by ID/ARN from the Converse API or inside Flows. **Guardrails** enforce responsible-AI rules the prompt alone cannot guarantee. Templates fix the response format (JSON schema, headings, length).' },
    { h: 'Interactive systems and context', p: 'Chat quality depends on **context management**: store conversation history in **DynamoDB** (with TTL), summarise old turns to save tokens, and pass relevant history each call. Use **Step Functions** to orchestrate clarification: if required information is missing, ask the user and wait, then continue. **Comprehend** or an FM can classify **intent** to route the request (for example billing vs technical support).' },
    { h: 'Prompt governance', p: 'Treat prompts like code: **parameterised templates** in Prompt Management with an approval workflow; template repositories in **S3** (versioned) or Git; **CloudTrail** records who created or changed prompts and who invoked models; **CloudWatch Logs** capture usage. Separate dev/test/prod, require review before promotion, and keep an audit trail for regulated environments.' },
    { h: 'Prompt quality assurance', p: '**Lambda** checks that output meets expectations (valid JSON, required fields, length, banned phrases). **Step Functions** runs a suite of **edge cases** (empty input, very long input, adversarial text, other languages). **CloudWatch** tracks pass rates across prompt versions so a **regression** after a change is caught before or just after release. Pair with a golden dataset (see Domain 5).' },
    { h: 'Advanced prompting techniques', p: '**Few-shot examples** show the exact format. **Chain-of-thought** (ask for step-by-step reasoning) improves multi-step logic. **Structured input** with XML-like tags separates instructions, documents and questions. **Output format specs** (JSON schema, tool use for structured output) make responses machine-readable. **Feedback loops** feed errors or critic comments back for a second attempt. Lower `temperature` for consistency.' },
    { h: 'Prompt Flows for complex systems', p: '**Bedrock Prompt Flows** is a visual (and API/SDK) builder that chains **nodes**: Input, Prompt, Knowledge Base, Agent, Lambda, Condition, Iterator/Collector, S3 and Output. It supports sequential chains, conditional branching on a model response, reusable prompt components, and pre/post-processing steps. Flows are **versioned with aliases** so applications call a stable alias, and they suit no-code or low-code builders.', trap: 'Prompt Flows orchestrates prompt/model/data steps; for long-running processes with retries, human approval and many AWS integrations, Step Functions is the stronger orchestrator.' }
  ],
  tables: [{ title: 'Orchestrator choice for prompt chains', head: ['Need', 'Prompt Flows', 'Step Functions'], rows: [
    ['Visual, low-code chain of prompts/KB/agents', 'Best fit', 'Overkill'],
    ['Branch on model output', 'Condition node', 'Choice state'],
    ['Wait for human approval, long retries, 200+ AWS integrations', 'Not designed for it', 'Best fit (callbacks, Retry/Catch)'],
    ['Versioned alias for apps to call', 'Flow versions + aliases', 'State machine versions + aliases']] }],
  flow: { title: 'Prompt lifecycle', steps: [
    { t: 'Draft', d: 'Template with variables in Prompt Management' },
    { t: 'Test', d: 'Edge cases + golden set; compare variants' },
    { t: 'Approve & version', d: 'Immutable version, review gate' },
    { t: 'Deploy', d: 'Referenced by ID/alias from app or Flow' },
    { t: 'Monitor', d: 'CloudWatch pass rates, CloudTrail audit, regression alarms' }] },
  patterns: [
    '"Reusable parameterised prompt with approval and versioning" → Bedrock Prompt Management.',
    '"Chain prompts with branching, no code" → Prompt Flows.',
    '"Who changed the prompt in production?" → CloudTrail.',
    '"Output must be valid JSON" → output schema/tool use + Lambda validation.',
    '"Missing info mid-conversation" → Step Functions clarification loop.'],
  refs: [['Prompt Management', 'https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html'], ['Prompt Flows', 'https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html'], ['Prompt engineering guidelines', 'https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html']]
}
});
