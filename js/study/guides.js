/* Contextual theory and practical sandbox exercises; no AWS account connection. */
window.GUIDES = {
  1.1: {
    title: "Choose an architecture from business constraints",
    goal: "Explain why the proposed system meets quality, freshness, latency, security and cost requirements together.",
    concepts: [
      {
        heading: "Start with the job to be done",
        text: "A foundation model predicts useful language; it does not automatically know current private facts or perform reliable business transactions. Define the input, desired outcome, acceptable error, response deadline, volume and data boundary before selecting services. A business KPI such as correctly resolved cases is different from a technical KPI such as successful invocations.",
      },
      {
        heading: "Choose the right augmentation",
        text: "Prompting changes instructions and examples. RAG supplies retrieved external evidence without retraining weights. Fine-tuning changes learned behavior for supported models and tasks; it is not a continuously updated document database. Tools let the application fetch live facts or perform deterministic calculations. Agents choose and coordinate tools, which adds flexibility and requires explicit execution limits.",
      },
      {
        heading: "Match the integration pattern",
        text: "Converse supports synchronous model interaction; streaming improves time to first visible output. SQS decouples arrivals from asynchronous workers and requires idempotent handling. Batch inference fits supported offline workloads. Bedrock reduces model-hosting work; SageMaker AI provides more control over containers and serving. Evaluate quotas, supported capabilities and total cost rather than selecting a service by name.",
      },
      {
        heading: "Prove and standardize",
        text: "A representative proof of concept compares quality, latency, cost and human correction effort against a baseline. The Generative AI Lens helps review risks across the Well-Architected pillars. Turn accepted patterns into versioned infrastructure and configuration modules, with tests that verify the actual business and security boundaries.",
      },
    ],
    business:
      "A support-drafting product is valuable if it reduces time per correctly resolved case while preserving customer privacy. Estimate savings after reviewer effort and escalation, then pilot one bounded workflow before selling it broadly.",
    lab: {
      title: "Run a measurable Bedrock proof of concept",
      prerequisites:
        "Use an AWS sandbox account, a supported Region and authorized model access. Prepare ten synthetic cases with expected facts; avoid customer data. Model calls can incur charges.",
      steps: [
        "Open Amazon Bedrock in the AWS Console and select a supported model in the chat/text playground.",
        "Write one versioned task prompt and run the same ten cases on two suitable models. Keep parameters and input data recorded.",
        "Record factual correctness, editing effort, latency and observed token usage; estimate cost using current regional pricing.",
        "Compare the complete assisted workflow against a manual baseline and write an acceptance threshold.",
        "Use the Generative AI Lens documentation to record one risk and mitigation for security, reliability and cost.",
      ],
      verify:
        "You should have a comparison table and a defensible choice tied to business requirements. A successful HTTP response alone does not pass the quality gate.",
      cleanup:
        "Playground calls do not require leaving a dedicated endpoint running. Remove any optional test resources and logs you created; check Billing for incurred usage. Do not purchase provisioned capacity for this exercise.",
    },
    refs: ["genai-lens", "converse", "eval"],
  },
  1.2: {
    title: "Select, configure and release foundation models",
    goal: "Choose models using evidence and change them safely without coupling every client to a provider.",
    concepts: [
      {
        heading: "Capabilities come before rankings",
        text: "Check context window, supported modalities, tool use, languages, inference modes, Regions and licensing. A large context limit does not guarantee recall from every part of a document. Use representative datasets and measure tail latency and cost per successful task; public benchmarks are preliminary evidence only.",
      },
      {
        heading: "A configurable gateway",
        text: "Converse provides a common message interface while individual models still have capability and parameter differences. An application adapter validates those differences. AppConfig can deliver model IDs, prompt versions and routing thresholds with validation and controlled rollout. Its alarms need meaningful application metrics, including quality failures that still return HTTP 200.",
      },
      {
        heading: "Resilience with boundaries",
        text: "Retry transient failures with exponential backoff and jitter within a deadline. A circuit breaker temporarily stops repeatedly calling an unhealthy dependency; it needs maintained state and recovery probes. Cross-Region inference routes through supported profiles and can process requests in their destination Regions. It does not replicate your application database, and a fallback must still satisfy residency and quality constraints.",
      },
      {
        heading: "Customization and release lifecycle",
        text: "LoRA trains small adapter weights; full fine-tuning changes more parameters. Distillation transfers behavior from a teacher to a smaller model using an evaluated dataset. Custom Model Import serves supported externally trained architectures in Bedrock. SageMaker Model Registry records model packages, lineage and approval state; your deployment pipeline must enforce that approval and retain rollback artifacts.",
      },
    ],
    business:
      "A multi-tenant SaaS can serve routine extraction with a cheaper validated model and reserve specialist capability for difficult cases. Measure the complete routing policy, including retries and human rework, before promising cost savings.",
    lab: {
      title: "Compare model configurations and plan a safe rollout",
      prerequisites:
        "Use two supported models in a sandbox and a small synthetic golden dataset. AppConfig deployment and model usage may incur charges; a console inspection alone is sufficient for the release-planning portion.",
      steps: [
        "In Bedrock, inspect model details, supported inference modes and Region availability. Record one capability that differs.",
        "Run matched playground requests with recorded model IDs and settings; compare quality and latency by case type.",
        "In the AppConfig console, inspect or create a sandbox application, environment and configuration profile containing modelId and promptVersion.",
        "Define a validator and a gradual deployment strategy. Select an existing test alarm or document the CloudWatch quality metric the application would publish.",
        "Record the prior configuration and an explicit rollback trigger. If testing a deployment, use only the sandbox environment.",
      ],
      verify:
        "The chosen model must meet the workload threshold. You should be able to explain which alarm triggers rollback and why a model with HTTP 200 responses can still fail.",
      cleanup:
        "Delete sandbox AppConfig deployments/resources when no longer needed, respecting service deletion rules. Remove optional alarms and test logs. Do not import large weights or create paid endpoints merely to complete this walkthrough.",
      code: {
        title: "Inspect regional model availability",
        text: "aws bedrock list-foundation-models \\\n  --query 'modelSummaries[].{Id:modelId,Input:inputModalities,Streaming:responseStreamingSupported}' \\\n  --output table",
      },
    },
    refs: ["appconfig", "cross-region", "model-registry", "import"],
  },
  1.3: {
    title: "Prepare trustworthy inputs for models",
    goal: "Distinguish schema, meaning and modality errors before they reach the model.",
    concepts: [
      {
        heading: "Validation has layers",
        text: "Parsing checks whether data can be read; a schema checks fields and types; semantic rules check units, ranges and relationships. Glue Data Quality applies DQDL rules to datasets, while Lambda can validate individual events. Data Wrangler offers visual profiling and transformations. Quarantine rejected records and publish quality metrics instead of silently dropping them.",
      },
      {
        heading: "Use the correct extraction service",
        text: "Textract preserves text, forms and table relationships from supported documents. Transcribe converts supported speech into text; verify language and redaction support. Comprehend analyzes supported text for language, entities or PII. Bedrock Data Automation processes supported document and media inputs; standard and custom output modes differ by modality. SageMaker Processing and Glue suit larger transformations.",
      },
      {
        heading: "Format model requests deliberately",
        text: "InvokeModel bodies are model-specific. Converse uses roles and typed content blocks, with system instructions separate from user/assistant turns. A common API does not give every model image, document or tool support. Validate file size, content type and supported parameters before calling the selected model.",
      },
      {
        heading: "Normalization can change facts",
        text: "Deterministic cleaning should preserve names, quantities, negation and meaning. A model rewrite may help organize messy input but can introduce new facts. Compare critical fields with the source and keep source references when a human must review uncertain extraction. Well-formed JSON alone does not prove a correct invoice or claim.",
      },
    ],
    business:
      "An invoice-processing service can automate extraction while routing uncertain totals for review. Sell reduced manual work with measured error rates, not unverified automatic payment decisions.",
    lab: {
      title: "Inspect structured document extraction",
      prerequisites:
        "Use a synthetic invoice with line items, subtotal and tax. The Textract console and model/API processing can incur charges; check supported file formats and regional availability.",
      steps: [
        "Open Amazon Textract in the console and use the supported document analysis/demo workflow for the synthetic invoice.",
        "Compare extracted text with table and key-value relationships. Inspect confidence and source locations where provided.",
        "Manually verify line-item totals, currency and invoice identifier against the original; record a rule that would reject a mismatch.",
        "Create a second sample with a missing unit or ambiguous date and identify which checks require business semantics rather than OCR confidence.",
        "Document how rejected records would enter an SQS or review workflow instead of reaching a payment API.",
      ],
      verify:
        "You can distinguish an extraction error, a schema error and a business-rule error, and identify which service or application check handles each.",
      cleanup:
        "Delete test input/output objects and any temporary resources you created. Remove sensitive local exports if you used your own permitted data. Processing charges already incurred remain payable.",
    },
    refs: ["glue", "wrangler", "textract", "data-automation", "converse"],
  },
  1.4: {
    title: "Build and maintain the retrieval store",
    goal: "Explain ingestion, vector storage, metadata filtering and freshness as separate responsibilities.",
    concepts: [
      {
        heading: "What a knowledge base manages",
        text: "Bedrock Knowledge Bases can parse, chunk, embed and index supported sources, then expose retrieval and generation APIs. The vector store holds the searchable representation; the original documents remain the source of truth. Supported stores differ in query features, filtering, cost, capacity and operational control. Managed ingestion does not remove the need to monitor failures.",
      },
      {
        heading: "Select the storage architecture",
        text: "OpenSearch supports lexical and vector search with indexing and ranking controls. Aurora PostgreSQL with pgvector can keep vectors beside relational data; test index behavior under filters. S3 Vectors offers purpose-built vector storage and query resources, distinct from ordinary S3 objects. GraphRAG on supported Neptune Analytics integration can follow entity relationships that passage similarity alone may miss.",
      },
      {
        heading: "Metadata is part of correctness and security",
        text: "Document ID, version, jurisdiction, dates, product and access scope help constrain retrieval. Derive authorized filters from trusted identity, not model-supplied tenant IDs. Source connectors require explicit review of ACL behavior and permission synchronization; authenticating a user does not automatically constrain a custom knowledge-base query.",
      },
      {
        heading: "Freshness is a workflow",
        text: "S3-backed sources use ingestion jobs to reconcile supported changes. Direct ingestion supports documented operations for supported S3 and custom sources; coordinate it with synchronization and check its prerequisites and asynchronous status. Handle deletes and late or duplicate events. Monitor document counts, rejected records, freshness lag and shard-level hot spots instead of relying only on a healthy cluster.",
      },
    ],
    business:
      "A policy-search service must retrieve the right version for the right employee. The valuable feature is current, permission-correct evidence with measurable freshness, not simply storing embeddings.",
    lab: {
      title: "Build and verify a small knowledge base",
      prerequisites:
        "Use three synthetic policy documents and a sandbox S3 bucket. Knowledge bases may create separately billed vector-store resources. Inspect the store pricing before creating one; use existing sandbox resources where available.",
      steps: [
        "Upload three text policies with distinct topics and versions to a dedicated S3 prefix. Keep a manifest of expected document IDs.",
        "In Bedrock Knowledge Bases, choose a supported S3 source, embedding model and vector store. Review service-role permissions and any KMS access.",
        "Start a sync and inspect the ingestion job status and failed-document details; wait for successful completion.",
        "Use the test panel to retrieve facts and inspect source citations. Change one policy and synchronize again.",
        "Delete a test source under the configured deletion policy, synchronize and verify its old fact is no longer retrieved. Separately plan trusted metadata filters for two test tenants.",
      ],
      verify:
        "The returned evidence changes after synchronization, deleted content is handled as configured, and you can locate ingestion failures. Do not assume a successful job alone proves authorization.",
      cleanup:
        "Delete the knowledge base and data source when finished, then separately inspect and remove the vector store, collection/index, S3 objects and optional logs you created. Deleting a knowledge base may leave separately billed storage resources.",
      code: {
        title: "Synchronize and inspect an S3-backed data source",
        text: '# Set these to your SANDBOX resource IDs; this starts a billed ingestion job.\nKB_ID=\'replace-with-knowledge-base-id\'\nDS_ID=\'replace-with-s3-data-source-id\'\naws bedrock-agent start-ingestion-job \\\n  --knowledge-base-id "$KB_ID" --data-source-id "$DS_ID"\n# Use the ingestionJobId returned above to inspect completion and failures:\nJOB_ID=\'replace-with-ingestion-job-id\'\naws bedrock-agent get-ingestion-job \\\n  --knowledge-base-id "$KB_ID" --data-source-id "$DS_ID" \\\n  --ingestion-job-id "$JOB_ID"',
      },
    },
    refs: ["kb", "sync", "ingest", "delete-api", "retrieve", "s3-vectors"],
  },
  1.5: {
    title: "Retrieve the evidence an answer needs",
    goal: "Diagnose chunking, embeddings, query processing and ranking independently.",
    concepts: [
      {
        heading: "Chunking defines what can be found",
        text: "Fixed chunks are simple but can split an answer from its context. Section-aware, semantic or hierarchical approaches preserve different relationships at additional cost. Overlap bridges boundaries but duplicates content. Keep headings and source IDs, evaluate realistic questions and re-ingest when changing chunking strategy; some settings require recreating the data source.",
      },
      {
        heading: "Embedding compatibility",
        text: "An embedding maps content into a vector space where distance approximates semantic similarity. Document and query vectors must use a compatible model, dimensions and preprocessing. Equal dimensions do not make two different models compatible. Evaluate language and modality support; rebuild or migrate the index deliberately when changing embedding configuration.",
      },
      {
        heading: "Candidate generation and ranking",
        text: "Lexical search excels at exact codes; vectors support paraphrases. Hybrid search combines candidate signals with suitable score fusion. A reranker reorders candidate documents using a more expensive relevance model; it cannot recover evidence excluded before candidate generation. Apply authorization before ranking and test store-specific hybrid support.",
      },
      {
        heading: "Query handling and measurement",
        text: "Expansion adds controlled synonyms; decomposition retrieves separate evidence for multi-part questions. Retrieve returns passages; RetrieveAndGenerate adds generation and citations. A Converse tool or MCP interface can expose retrieval through a stable contract, but application code executes and authorizes the search. Measure precision, recall, hit rate and latency alongside grounded answer quality.",
      },
    ],
    business:
      "A technical-support assistant needs both exact product codes and natural-language symptom search. Improve deflection by retrieving complete, relevant procedures and preserving access control through reranking and caching.",
    lab: {
      title: "Compare retrieval settings on labeled questions",
      prerequisites:
        "Use the small sandbox knowledge base from the related exercise and ten questions with known supporting documents. Retrieval and reranker calls can incur charges.",
      steps: [
        "Create a table mapping each question to the document passages that should be retrieved; include an exact code, a paraphrase and a two-part question.",
        "In the knowledge-base test interface, inspect retrieved passages and source metadata. Use CloudShell or the SDK Retrieve API if the console does not expose the setting you need.",
        "Compare two supported result-count settings. Where supported, compare semantic and hybrid search while holding the corpus fixed.",
        "Test reranking if available and record whether missing evidence was absent from the candidate set or merely ranked too low.",
        "Calculate precision and recall for the labeled cases, and record latency and answer support before choosing the configuration.",
      ],
      verify:
        "You can explain whether a failure came from missing ingestion, poor chunks, incompatible embeddings, query mismatch or ranking. More retrieved text should not automatically be labeled better.",
      cleanup:
        "Remove temporary indexes or data sources created for comparisons, and clean up the parent knowledge base and vector storage when no longer needed. Keep only non-sensitive evaluation records.",
      code: {
        title: "Inspect retrieved evidence without generation",
        text: 'KB_ID=\'replace-with-sandbox-knowledge-base-id\'\naws bedrock-agent-runtime retrieve \\\n  --knowledge-base-id "$KB_ID" \\\n  --retrieval-query \'{"text":"What is the synthetic policy return period?"}\' \\\n  --retrieval-configuration \'{"vectorSearchConfiguration":{"numberOfResults":4}}\'',
      },
    },
    refs: ["retrieve", "chunk", "embedding", "hybrid", "knowledge-eval"],
  },
  1.6: {
    title: "Treat prompts as tested release artifacts",
    goal: "Build prompts, context and workflows that can be evaluated, approved and rolled back.",
    concepts: [
      {
        heading: "Instruction and context design",
        text: "Separate system instructions, untrusted user text and retrieved evidence. State task constraints, output requirements and representative examples. Few-shot examples can improve behavior, but conflicting examples can harm it. For exact arithmetic or authorization, use validated tools. A concise supported rationale is preferable to requiring private internal model reasoning.",
      },
      {
        heading: "Conversation state",
        text: "The application must send relevant conversation context on each invocation. Store history and pending workflow state under tenant/user/session scope; Lambda memory is not durable session storage. Summarize old turns carefully and retain critical identifiers. DynamoDB TTL deletes expired records eventually, so reads must enforce expiry when access must stop immediately.",
      },
      {
        heading: "Versioning is not approval",
        text: "Prompt Management provides parameterized prompts, variants and immutable versions. An external release process implements the organization's review and promotion policy. Pin evaluated versions and log identifiers. Template-variable validation, output schema checks and semantic regression tests cover different failure modes.",
      },
      {
        heading: "Flows and feedback",
        text: "Bedrock Flows visually connects supported model, data and logic nodes and exposes versions and aliases. Step Functions is often appropriate when the surrounding workflow needs durable retries or human callbacks. Turn representative user corrections into regression cases, compare matched prompt versions and deploy changes only after quality and policy checks.",
      },
    ],
    business:
      "A reusable customer-response product can package approved prompts and policy evidence while preserving separate customer histories. Its release process should demonstrate which tested prompt and evidence produced each draft.",
    lab: {
      title: "Create and test a versioned prompt",
      prerequisites:
        "Use a sandbox Bedrock project and synthetic customer cases. Prompt testing invokes models and can incur charges. Console labels and supported features may vary by Region.",
      steps: [
        "In Bedrock Prompt Management, create a prompt for a structured support reply with an explicit customer_name variable and required output fields.",
        "Create two variants with different instructions or examples. Run the same allowed, missing-data and adversarial cases against both.",
        "Render a test with a deliberately missing variable. Document a deterministic application check that would reject it before inference.",
        "Create an immutable version of the passing prompt and record its identifier in a release manifest.",
        "Describe an external approval step and previous-version rollback target; do not treat editing the draft as production promotion.",
      ],
      verify:
        "You have matched evaluation evidence, a frozen prompt version and a clear distinction between variable binding, output syntax and factual correctness.",
      cleanup:
        "Delete sandbox prompt versions/resources if no longer needed, following service constraints. Remove optional test logs and any temporary Flow or storage resources. Keep non-sensitive test cases for later revision.",
    },
    refs: ["prompt", "prompt-version", "flow", "ttl", "codepipeline"],
  },
  2.1: {
    title: "Build agents with explicit execution boundaries",
    goal: "Understand the model–tool loop and enforce authorization, budgets and approval outside model text.",
    concepts: [
      {
        heading: "The agent loop",
        text: "The model proposes a tool call, application code validates and executes it, and the observation returns to the model for the next step. Strands provides a code-first SDK; Bedrock Agents offers a managed orchestration approach. AgentCore provides capabilities such as runtime, identity and memory for supported agent architectures. These names are not interchangeable pieces of one mandatory stack.",
      },
      {
        heading: "State and multi-agent coordination",
        text: "Short-term conversation state differs from longer-term selected memories. Scope both to identity and task, and define retention. Agents-as-tools lets a planner call specialists; other patterns use routing or shared workflows. Establish a task owner, result contract and stopping condition so agents do not delegate forever. Model self-confidence needs calibration before it drives consequential routing.",
      },
      {
        heading: "Tools and MCP",
        text: "Tool schemas describe names, arguments and results; they do not establish business authorization. MCP standardizes discovery and invocation, not whether a server is trustworthy. Authenticate clients and servers, allowlist capabilities, validate arguments, enforce least privilege and restrict egress. Stateless short tools can fit Lambda; persistent sessions or longer work may fit containers or supported managed runtimes.",
      },
      {
        heading: "Safe actions and human review",
        text: "Bound iterations, tokens, time and retries even when every API call succeeds. Use idempotency for side effects. Bedrock return control lets an application handle proposed actions; supported user confirmation is distinct from a durable enterprise approval process. Standard Step Functions callback tasks support long waits with authenticated review and timeout handling. Protect task tokens and verify the approved action has not changed.",
      },
    ],
    business:
      "A purchasing assistant should propose and explain an order while deterministic services verify inventory, budget and manager approval. Start with read-only tools, then add narrowly scoped actions whose business effect is measurable.",
    lab: {
      title: "Trace a read-only agent tool call",
      prerequisites:
        "Use synthetic catalog data and a read-only Lambda tool in a sandbox. Agent/model calls and Lambda usage can incur charges. Do not connect a payment or deletion tool for this exercise.",
      steps: [
        "In Bedrock Agents, inspect or create a test agent with a supported model and scoped service role.",
        "Define a read-only action group with a simple product lookup schema and configure its Lambda integration or supported return-control handling.",
        "Test a valid lookup, a missing argument and an instruction asking for an unrelated action.",
        "Inspect the available agent trace: identify the proposed tool, validated arguments, returned observation and final answer.",
        "Write server-side authorization and idempotency rules you would require before replacing lookup with a mutating action. Add an explicit task time/iteration budget in the proposed application design.",
      ],
      verify:
        "You can identify who actually executes a tool and where invalid or unauthorized arguments are rejected. Trace visibility is not a guarantee that every private model thought is exposed.",
      cleanup:
        "Delete test agent aliases, agent resources, Lambda functions, roles and log groups that are no longer needed. Remove any AgentCore resources created separately; inspect billing for remaining runtime or storage use.",
    },
    refs: [
      "agent-actions",
      "agent-return",
      "agent-confirm",
      "agentcore",
      "mcp",
      "callback",
    ],
  },
  2.2: {
    title: "Deploy models for the real workload",
    goal: "Choose an inference mode and reason about request, token and memory capacity.",
    concepts: [
      {
        heading: "Bedrock inference modes",
        text: "On-demand inference fits variable supported workloads without managing model servers. Provisioned Throughput reserves model units under available terms; support and commitments vary by model. It does not guarantee the latency of your whole application. Batch inference processes supported offline jobs. Custom Model Import and customization have their own supported architectures and serving requirements.",
      },
      {
        heading: "SageMaker and containers",
        text: "SageMaker real-time endpoints support managed hosting of compatible models and containers. Asynchronous inference suits supported longer queued requests; other batch options suit offline processing. Custom containers must implement the expected serving contract. Startup health, model-loading time and dependencies matter before the endpoint can accept traffic.",
      },
      {
        heading: "GPU serving mechanics",
        text: "Memory contains weights, runtime buffers and KV cache for active sequences. Long contexts, long outputs and concurrent requests increase demand. Batching improves throughput but can worsen latency or memory pressure. Quantization and adapters have compatibility and quality tradeoffs. Scale on signals correlated with the actual bottleneck, not CPU alone.",
      },
      {
        heading: "Right-sizing and cascading",
        text: "Select the smallest candidate that meets the evaluated task requirements. A cascade needs a validated escalation signal and must include both first-call and fallback cost. Monitor rare categories and drift after launch. Admission control and supported quotas remain necessary even when autoscaling or regional routing is available.",
      },
    ],
    business:
      "A narrow ticket classifier may deliver better margins on a small model than a general assistant. Compare total cost per correctly classified ticket, including escalations, endpoint idle time and engineering overhead.",
    lab: {
      title: "Create a deployment decision and capacity sheet",
      prerequisites:
        "Use console inspection and a small on-demand benchmark. Creating GPU endpoints or provisioned capacity can be costly; this exercise does not require provisioning them.",
      steps: [
        "Inspect Bedrock model details and current inference support for the candidate models. Record which modes are actually offered.",
        "Inspect Service Quotas for relevant request and token limits in the selected Region.",
        "Run a small representative on-demand sample and record prompt/output lengths and observed latency.",
        "In SageMaker AI, inspect the endpoint/model creation options and serving-container requirements without submitting a paid endpoint deployment.",
        "Estimate peak concurrent token demand and list the evidence needed to justify on-demand, batch, asynchronous or dedicated serving.",
      ],
      verify:
        "Your choice ties interactive deadlines, token workload, quality and operational control to a supported deployment mode. You can explain why fitting weights in memory is insufficient for concurrency sizing.",
      cleanup:
        "If you created a test endpoint, delete the endpoint first and then unused endpoint configurations/model resources. Delete any provisioned model capacity according to its contractual terms; committed charges may remain. Inspect storage and logs separately.",
    },
    refs: [
      "provision",
      "batch",
      "async-inference",
      "custom-container",
      "gpu",
      "import",
    ],
  },
  2.3: {
    title: "Integrate AI into enterprise systems",
    goal: "Preserve identity, business state and release consistency across service boundaries.",
    concepts: [
      {
        heading: "Event-driven integration",
        text: "API Gateway and Lambda can add a controlled model-backed operation to an existing system. S3 events, EventBridge and SQS decouple changes from processing. Expect duplicates and out-of-order delivery where documented: use version-aware conditional writes and idempotency keys. Filter events created by your own writes to avoid feedback loops.",
      },
      {
        heading: "Identity and delegation",
        text: "Federation exchanges trusted identity for controlled sessions. Cognito user pools authenticate application users; identity pools can exchange supported identities for temporary AWS credentials. STS role assumption requires a valid trust relationship and permissions. For third-party multi-customer access, external IDs address confused-deputy risk; they are not a replacement for scoped role permissions.",
      },
      {
        heading: "Network and locality",
        text: "PrivateLink provides supported private service access through VPC endpoints. VPN or Direct Connect can connect enterprise networks with routing, DNS and security controls. Outposts brings supported AWS infrastructure on premises; Wavelength places supported compute in carrier environments. Neither means every regional managed FM runs locally. Measure the full path and design offline behavior.",
      },
      {
        heading: "Release the whole application",
        text: "A GenAI release includes code, model selection, prompt and guardrail versions, retrieval assets and configuration. Use CodePipeline/CodeBuild or equivalent automation for contract, security and quality gates. A release manifest makes promotion and rollback reproducible. Changing a container alone may leave an incompatible prompt or index active.",
      },
    ],
    business:
      "A CRM drafting feature can save agent time without replacing the CRM. Scope case access to the requesting user, write drafts idempotently and measure editing time and case resolution rather than merely counting generated text.",
    lab: {
      title: "Design and test a durable event boundary",
      prerequisites:
        "Use a sandbox SQS queue and a harmless test consumer if available. Standard queue and Lambda usage can incur charges. Use synthetic event bodies with no business side effects.",
      steps: [
        "Create or inspect a Standard SQS queue and a dead-letter queue; document visibility timeout and redrive settings.",
        "Send a synthetic event containing caseId, caseVersion and eventOrigin. Send the same event twice.",
        "In a test Lambda consumer or a written implementation sketch, use a conditional idempotency record keyed by case ID and version before writing a draft.",
        "Test a later case version and a draft-only self-generated event. The later version should be eligible; the self-generated update should be ignored by policy.",
        "Inspect queue/Lambda metrics and record how failed messages reach the DLQ and how an operator safely replays them.",
      ],
      verify:
        "Duplicate delivery produces one logical side effect, while a legitimate new case version can still be processed. A queue alone does not provide exactly-once business effects.",
      cleanup:
        "Delete test event-source mappings, functions, queues, idempotency records and log groups that you created. Do not leave an event loop or retrying consumer running.",
    },
    refs: ["sqs", "partial", "cognito", "sts", "private", "codepipeline"],
  },
  2.4: {
    title: "Build a reliable model API gateway",
    goal: "Distinguish API contracts, streaming, routing and retry behavior.",
    concepts: [
      {
        heading: "Request contracts",
        text: "Converse uses a common message schema; InvokeModel uses model-specific bodies. API Gateway can validate configured request elements, while application code checks model capability, authorization, sizes and business constraints. Treat unsupported parameters and malformed payloads as nonretryable validation problems. Never expose long-lived service credentials in client code.",
      },
      {
        heading: "Streaming is an event protocol",
        text: "ConverseStream and supported streaming integrations return events and deltas, not independently complete application JSON in each network chunk. Relay through a supported transport, handle error and completion events, and validate a complete structured output before executing actions. Time to first token and total response time are different measurements.",
      },
      {
        heading: "Resilience and quotas",
        text: "Set an end-to-end deadline, bounded retries and concurrency controls. Backoff with jitter reduces synchronized retry storms. API Gateway usage plans are best-effort usage controls, not hard spending limits or user authentication. Implement strict business budgets in application logic. A fallback must preserve task capability, safety and residency.",
      },
      {
        heading: "Routing strategies",
        text: "Static routing uses configured rules; content-based routing classifies a request; metric-based routing follows measured health and latency. Intelligent Prompt Routing supports documented model choices rather than arbitrary providers. Use validated uncertainty thresholds, an unknown path and stable health criteria. API transformations reshape payloads; they do not by themselves implement semantic routing or authorization.",
      },
    ],
    business:
      "A shared enterprise GenAI gateway can centralize authorized model access and cost attribution. Its value comes from measured reliability and consistent contracts, not simply hiding an API key behind another endpoint.",
    lab: {
      title: "Inspect one valid and one invalid API request",
      prerequisites:
        "Use CloudShell in a sandbox with permitted Bedrock access, or a local authorized SDK. Model calls can incur charges. Choose a model that supports Converse in the selected Region.",
      steps: [
        "Use the AWS documentation example for Converse and substitute your supported model ID and a short synthetic message.",
        "Record the returned content, stop reason and token-usage fields. Do not assume provider-specific fields are universal.",
        "Send a deliberately unsupported parameter in the sandbox and classify the returned error; remove the parameter instead of retrying it repeatedly.",
        "Review a ConverseStream example and identify text deltas, message completion, metadata and error events.",
        "Write a retry policy separating validation/authorization failures from throttling or transient service failures, with a total deadline and maximum attempts.",
      ],
      verify:
        "You can explain what the gateway must validate, which failures are retryable and why partial text chunks are not complete JSON documents.",
      cleanup:
        "No persistent model endpoint is needed for on-demand calls. Delete temporary scripts containing sensitive data, and remove optional test API Gateway/Lambda resources and logs you created.",
      code: {
        title: "Make one structured Converse call",
        text: 'MODEL_ID=\'replace-with-supported-model-or-profile-id\'\naws bedrock-runtime converse \\\n  --model-id "$MODEL_ID" \\\n  --messages \'[{"role":"user","content":[{"text":"Return a short greeting for a fictional customer."}]}]\' \\\n  --inference-config \'{"maxTokens":128,"temperature":0.2}\'',
      },
    },
    refs: [
      "converse",
      "api-validation",
      "usage-plans",
      "quotas",
      "intelligent-routing",
    ],
  },
  2.5: {
    title: "Connect applications and use development tools responsibly",
    goal: "Build usable interfaces and verify generated implementation against real requirements.",
    concepts: [
      {
        heading: "Frontend and API integration",
        text: "Amplify can supply supported authentication, data and AI application integration with frontend components. Backend routes must enforce user ownership and invoke services under scoped roles. OpenAPI describes a shared request/response contract; compatible tools can generate clients and mocks. Importing a contract does not automatically validate all backend output or make a UI accessible.",
      },
      {
        heading: "Accessible interactions",
        text: "Expose loading, streaming, error and completion states with meaningful labels and keyboard access. Preserve user control while content arrives. Handle disconnects and retries without duplicate business actions. Keep implementation-only details out of normal product workflows unless they help users make a decision.",
      },
      {
        heading: "Code and workflow tools",
        text: "Amazon Q Developer assists with code understanding, generation, refactoring and tests. Q Business targets enterprise knowledge assistance with configured identities and connectors. Kiro supports specification-driven development. Generated requirements, code and tests still need review against business invariants. Strands and managed Flows can implement language workflows, while explicit business processes may remain in Step Functions.",
      },
      {
        heading: "Troubleshooting with evidence",
        text: "Correlate request IDs across prompt rendering, retrieval, model calls and business APIs. Logs Insights helps query available fields; X-Ray or OpenTelemetry spans expose stage latency where instrumented. A suggestion to grant wildcard permissions may reveal a permission issue, but the final fix should identify the actual action and resource and test denied cases.",
      },
    ],
    business:
      "A customer-facing assistant needs a reliable product flow around the model: sign-in, scoped conversations, usable errors and feedback. Coding tools can accelerate this work, but acceptance tests protect the behavior customers pay for.",
    lab: {
      title: "Review an AI-assisted implementation change",
      prerequisites:
        "Use a small sandbox repository and a supported Q Developer or Kiro setup. This exercise can also be performed as a manual code review if the tool is unavailable. Do not provide production secrets.",
      steps: [
        "Write acceptance criteria for a duplicate-safe webhook, including authorization, retry behavior and one failure-recovery case.",
        "Ask the coding assistant to propose an implementation and tests, or inspect an existing proposal.",
        "Review whether tests challenge duplicate delivery and unauthorized IDs rather than merely asserting the implementation returns success.",
        "Run the tests and inspect the diff for removed checks, broad permissions or embedded credentials.",
        "Document one corrected assumption and the evidence that the final behavior meets the acceptance criteria.",
      ],
      verify:
        "You can explain why generated passing tests do not establish correctness when the tests omit a critical business requirement.",
      cleanup:
        "Remove sandbox credentials and temporary resources if created. Keep the reviewed non-sensitive code and acceptance cases as reusable learning artifacts.",
    },
    refs: [
      "q-developer",
      "q-business",
      "amplify",
      "openapi",
      "xray",
      "log-insights",
    ],
  },
  3.1: {
    title: "Apply layered input, output and tool safeguards",
    goal: "Reduce harmful output and injection risk while preserving useful authorized behavior.",
    concepts: [
      {
        heading: "Different controls solve different problems",
        text: "Guardrails can apply supported content filters, denied topics, word filters, sensitive-information handling and other configured checks. Scope and modality support vary. WAF addresses supported ingress patterns and rate abuse; it does not fully understand every semantic prompt attack. Comprehend can support documented text analysis before the model call.",
      },
      {
        heading: "Grounding and truth",
        text: "RAG provides evidence but the model can misstate it. Contextual grounding checks apply to documented grounding scenarios and scores; a supported claim can still depend on a wrong source. Schema validation checks structure, not facts. Use authoritative tools for exact calculations and enforce deterministic business rules before consequential actions.",
      },
      {
        heading: "Prompt injection boundaries",
        text: "Untrusted instructions can arrive through user text, retrieved documents or tool results. Separate instructions from data, test adversarial examples and limit what the application can execute. Guardrails and prompts are defense layers, not replacements for server-side authorization, allowlisted destinations or idempotency.",
      },
      {
        heading: "Enforcement and streaming",
        text: "A created guardrail is not automatically applied everywhere. Associate or apply it on supported invocation paths and use documented IAM conditions where applicable. Asynchronous streaming checks can release content before evaluation; synchronous or buffered handling is needed when the requirement is checking before display. Define failure behavior and test both missed detections and false positives.",
      },
    ],
    business:
      "A public support assistant should answer permitted questions, refuse prohibited assistance and never turn retrieved instructions into unauthorized tool actions. Measure both unsafe releases and unnecessary refusals.",
    lab: {
      title: "Test a guardrail on allowed and prohibited examples",
      prerequisites:
        "Use a sandbox Bedrock guardrail and harmless synthetic policy examples. Guardrail evaluations and model calls can incur charges. Test only services and content you control.",
      steps: [
        "In Bedrock Guardrails, create a policy with a denied topic, a test sensitive-word rule and supported PII handling appropriate to the exercise.",
        "Use the test interface with allowed content, a direct prohibited request, a paraphrase and a benign near-match.",
        "Record which policy triggered and whether each result is a true or false positive. Adjust only with evidence.",
        "Create a test version and inspect how the application supplies the guardrail identifier/version or calls ApplyGuardrail.",
        "List alternate invocation paths, including streaming and jobs, and specify how each receives the required checks before output or side effects.",
      ],
      verify:
        "You can distinguish topic filtering, exact word matching, PII handling and authorization. The test report includes useful content that must remain allowed as well as content that should be blocked.",
      cleanup:
        "Delete test guardrail resources/versions as supported when finished and remove test logs or optional model integration resources. Keep no real personal information in the example set.",
      code: {
        title: "Evaluate a synthetic input against a guardrail",
        text: 'GUARDRAIL_ID=\'replace-with-sandbox-guardrail-id\'\naws bedrock-runtime apply-guardrail \\\n  --guardrail-identifier "$GUARDRAIL_ID" \\\n  --guardrail-version DRAFT --source INPUT \\\n  --content \'[{"text":{"text":"A harmless synthetic policy test."}}]\'',
      },
    },
    refs: [
      "guardrails",
      "guardrail-enforce",
      "grounding",
      "stream-guardrail",
      "waf",
    ],
  },
  3.2: {
    title: "Protect data across every copy and access path",
    goal: "Separate identity, network, encryption, retrieval authorization and privacy transformations.",
    concepts: [
      {
        heading: "Authorization layers",
        text: "IAM grants identity permissions; role trust policies control assumption; resource and KMS key policies govern additional boundaries. A VPC endpoint policy controls requests through that endpoint, not every alternate public path. Lake Formation can enforce supported data access controls for integrated analytics, but it does not automatically govern arbitrary application caches or vector queries.",
      },
      {
        heading: "Privacy before and after inference",
        text: "Macie discovers sensitive data in supported S3 objects; Comprehend and Guardrails offer supported text-sensitive-information capabilities for different workflows. Detecting, masking, pseudonymizing and anonymizing are not equivalent. Stable pseudonyms retain linkage and need protection of re-identification mappings. Bedrock service commitments do not automatically redact your application's logs.",
      },
      {
        heading: "Encryption and logging",
        text: "TLS protects data in transit; KMS-backed encryption controls stored-data access where supported. Authorized processors can still see plaintext. CloudWatch log data protection masks supported sensitive data for readers subject to permissions; it is not the same as never storing the raw value. If policy forbids storage, redact before writing.",
      },
      {
        heading: "Retention and deletion",
        text: "Track source versions, parsed outputs, embeddings, caches, logs and sessions. S3 lifecycle current-version expiry does not necessarily delete noncurrent versions or downstream indexes. DynamoDB TTL is eventual, so enforce access expiry at read time. Deletion workflows must reconcile copies and respect applicable retention obligations, then verify the result.",
      },
    ],
    business:
      "A multi-tenant knowledge product earns trust by proving that each tenant retrieves only authorized current data and that deletion requests propagate through derived stores. Encryption alone does not establish this property.",
    lab: {
      title: "Trace one encrypted data access failure",
      prerequisites:
        "Use a sandbox S3 object encrypted under a sandbox customer-managed key, or inspect an existing non-production example. KMS keys may incur ongoing charges; this can be a policy-inspection exercise without creating a key.",
      steps: [
        "In IAM, identify the actual role used by the ingestion or application service. Inspect both its permission policy and trust policy.",
        "Inspect the S3 bucket/object access policy and the KMS key policy or grant relevant to that role.",
        "Write an access matrix for the intended object and one forbidden object. Distinguish S3 read permission from KMS decryption permission.",
        "Review the VPC endpoint policy if used, then identify whether a public network path remains possible.",
        "Document the minimum change needed for the allowed read and a negative test proving other resources remain denied.",
      ],
      verify:
        "You can locate the authorization layer responsible for a denial without granting administrator access or removing encryption.",
      cleanup:
        "Delete test objects and policies you created. Schedule deletion of an unused sandbox KMS key only after confirming nothing still depends on it, following KMS waiting periods. Never delete shared keys for cleanup.",
    },
    refs: [
      "iam",
      "kms",
      "private",
      "privacy",
      "pii",
      "macie",
      "lifecycle",
      "ttl",
    ],
  },
  3.3: {
    title: "Make governance auditable and enforceable",
    goal: "Record the evidence behind decisions and connect policy to preventive and detective controls.",
    concepts: [
      {
        heading: "Provenance and lineage",
        text: "A catalog inventories datasets and schemas; lineage links inputs, transformations and outputs. Record artifact versions, transformation code and parameters, exclusions and source identifiers. A knowledge-base ID or current S3 key alone cannot reconstruct historical content. Use immutable versions or hashes and preserve the needed evidence under a defined retention policy.",
      },
      {
        heading: "Audit versus payload logging",
        text: "CloudTrail records supported API activity with service-specific event coverage; do not assume every Bedrock operation is a data event or that CloudTrail contains prompts and completions. Supported model invocation logging can capture invocation content and usage to configured destinations and is not enabled by default. Secure these logs because they can contain sensitive material.",
      },
      {
        heading: "Organizational policy",
        text: "SCPs set permission ceilings for affected member accounts and do not grant permissions or constrain management-account principals. Combine organization controls, scoped IAM, versioned templates and automated checks. Model cards document intended use, evaluation and limitations; a model card is evidence for governance, not an enforcement mechanism by itself.",
      },
      {
        heading: "Continuous oversight",
        text: "Monitor misuse, drift, subgroup outcomes, refusal rates and policy failures as well as API health. CloudWatch consumes metrics your services and applications publish; it does not infer every quality metric automatically. Define investigation owners, thresholds, evidence retention and controlled remediation. Object Lock compliance retention can make stored object versions immutable for the retention period and must be planned carefully.",
      },
    ],
    business:
      "A regulated assistant needs to show which approved release and evidence supported a decision, who could access it and how policy failures were handled. This audit trail should minimize unnecessary personal payload retention.",
    lab: {
      title: "Build an audit evidence manifest",
      prerequisites:
        "Use synthetic request records and console inspection of CloudTrail and Bedrock logging settings. Do not enable long compliance-mode Object Lock retention merely for this exercise.",
      steps: [
        "Choose one sandbox model request and record its request ID, model configuration, prompt version and source document version/hash.",
        "Inspect CloudTrail event history or the configured trail for supported related API activity; note what is and is not present.",
        "Inspect Bedrock model invocation logging configuration and destination permissions. If enabling it for a test, use a dedicated restricted log group or bucket.",
        "Create a small manifest joining release identifiers, source evidence and decision outcome without unnecessary sensitive text.",
        "Write separate retention rules for audit metadata, prompt payloads and source versions, including how a dispute would be reconstructed.",
      ],
      verify:
        "You can explain why API audit records, invocation payload logs and data lineage are complementary and cannot substitute for one another.",
      cleanup:
        "Disable optional test invocation logging if no longer needed, then delete test destinations according to their retention policies. Do not delete shared audit trails or attempt to bypass retention locks.",
    },
    refs: ["cloudtrail", "logging", "cards", "scp", "object-lock"],
  },
  3.4: {
    title: "Evaluate responsible behavior for the actual users",
    goal: "Communicate evidence and limitations and assess subgroup outcomes with suitable metrics.",
    concepts: [
      {
        heading: "Transparency",
        text: "Tell users when content is AI-generated and provide permitted supporting sources. A citation must support the actual claim. A useful explanation summarizes relevant facts and policy; it does not require exposing private model reasoning or sensitive operational traces. Confidence should be calibrated against outcomes rather than invented because an answer sounds fluent.",
      },
      {
        heading: "Fairness is contextual",
        text: "Define affected groups and appropriate metrics for the business use. Overall accuracy can hide high error rates in a small cohort. Use representative samples, report uncertainty and examine missing labels or selective feedback. A single metric or the model's self-report does not prove fairness.",
      },
      {
        heading: "Policy evaluation",
        text: "Turn written responsible-AI requirements into allowed and prohibited test cases, with domain review of the rubric. Keep critical safety or authorization invariants separate from aggregate quality averages. A release can improve average usefulness while still failing a nonnegotiable policy gate.",
      },
      {
        heading: "Human responsibility",
        text: "Specify when users can challenge an answer, when a specialist should review it and who owns remediation. Use model cards to document intended use and known limitations. High-stakes decisions need appropriate domain oversight; the application must preserve the distinction between assistance and authorized decision-making.",
      },
    ],
    business:
      "A multilingual service should measure whether every supported language receives useful, safe answers. Report limitations honestly and improve underserved cohorts instead of hiding them in an overall score.",
    lab: {
      title: "Run a small cohort-based review",
      prerequisites:
        "Prepare synthetic cases covering two relevant user or language cohorts with the same task difficulty. A small exercise demonstrates the method; it is not enough to establish statistical fairness.",
      steps: [
        "Define a rubric for factual support, helpfulness, refusal appropriateness and a use-case-specific fairness concern.",
        "In a Bedrock playground or evaluation workflow, run a fixed prompt/model configuration over both cohorts.",
        "Score cases using the same rubric and record sample sizes, missing labels and disagreements.",
        "Compare subgroup results with the aggregate. Identify whether one cohort's failures disappear in the overall average.",
        "Write a model-card-style limitation and one remediation experiment, then define the evidence required before broader deployment.",
      ],
      verify:
        "Your report distinguishes observed subgroup differences from confident population-level conclusions and includes a user-facing explanation or review route.",
      cleanup:
        "Delete synthetic evaluation outputs and temporary resources when no longer needed. Retain only permitted anonymized labels and methodology for comparison.",
    },
    refs: ["eval", "cards", "grounding"],
  },
  4.1: {
    title: "Optimize total cost without breaking correctness",
    goal: "Account for tokens, idle capacity, cache validity and the cost of failures.",
    concepts: [
      {
        heading: "Token economics",
        text: "Count all input content: instructions, conversation, retrieved passages and tool schemas, plus output tokens and repeated calls. Transport compression does not reduce the model's text token count. Summarize and prune context with checks that preserve required facts. Output limits bound generated work but can truncate the answer if chosen without evaluation.",
      },
      {
        heading: "Price versus delivered value",
        text: "Compare cost per successful business task, including retries, escalation, human review and infrastructure. A smaller or distilled model can be better for a narrow task, but verify rare cases and drift. Batch processing can reduce costs for supported offline work; dedicated capacity is justified by measured utilization and available terms.",
      },
      {
        heading: "Different caches",
        text: "Prompt caching reuses eligible processed prompt prefixes for supported models, with model-specific minimums, checkpoints, TTL and billing. A semantic answer cache reuses a prior response and is application logic with different correctness risks. Scope all reusable results by trusted tenant, authorization and relevant data/prompt versions. Similar wording is not permission to share answers.",
      },
      {
        heading: "Hard limits need enforcement",
        text: "Billing reports and anomaly alerts help detect spend but are not immediate cancellation mechanisms. Enforce per-user or per-task token/cost budgets, concurrency and loop limits in the application. Record actual usage and reconcile estimates. Avoid high-cardinality or sensitive metric dimensions when attributing costs.",
      },
    ],
    business:
      "For a paid assistant, margin depends on completed customer outcomes after support and rework. Price tiers should reflect measured usage, approved model routing and enforceable budgets, not only a low advertised token price.",
    lab: {
      title: "Measure a token-cost optimization",
      prerequisites:
        "Use ten synthetic prompts and a supported on-demand model. Check current model pricing and caching support; the experiment itself incurs invocation charges.",
      steps: [
        "Run a baseline with a recorded prompt version and collect input/output usage and successful-task labels.",
        "Create a shorter prompt or bounded conversation summary that preserves critical facts; keep model settings and test cases fixed.",
        "Repeat the cases and compare total tokens, correctness and latency. Count retries and validation failures.",
        "If testing prompt caching, use the documented cache checkpoints and eligible prefix length; inspect cache usage fields rather than assuming repeated text was cached.",
        "Estimate cost per successful task and document a tenant-safe invalidation policy for any answer cache.",
      ],
      verify:
        "A proposed saving is accepted only if required quality and authorization remain intact. You can distinguish prompt-prefix reuse from reusing a previously generated answer.",
      cleanup:
        "Remove temporary result caches and test data. No provisioned capacity is required. Inspect any storage, endpoint or log resources created during the experiment for ongoing charges.",
    },
    refs: ["cache", "batch", "provision", "quotas", "cost-anomaly"],
  },
  4.2: {
    title: "Optimize the measured critical path",
    goal: "Connect latency, throughput and memory to the actual retrieval and generation workload.",
    concepts: [
      {
        heading: "Latency has multiple meanings",
        text: "Time to first token measures responsiveness; total completion time measures when the whole answer is ready. Queue wait, retrieval, reranking, model inference, tool calls and network transfer can dominate different requests. Trace the critical path before changing the model. Parallelize independent operations while preserving required ordering and bounded concurrency.",
      },
      {
        heading: "Retrieval tuning",
        text: "Inspect per-index or per-shard latency, memory, filters and query distribution. Approximate nearest-neighbor settings trade recall against work; more shards or candidates are not universally better. Preserve exact identifiers and evaluate hybrid scoring. A faster vector query is not a successful optimization if it removes the evidence needed for correct answers.",
      },
      {
        heading: "LLM throughput",
        text: "Request count alone hides variation in context and output length. Measure tokens, active sequences, queue depth and GPU/service limits. KV cache grows with sequence work; batching can improve throughput while increasing wait or memory. Autoscaling has warmup delays. Use admission control, supported quotas and realistic burst tests.",
      },
      {
        heading: "Sampling parameters",
        text: "Temperature changes the probability distribution; top-p restricts cumulative mass; sampling top-k limits candidate tokens where supported. Retrieval top-k is a different setting. Parameter availability and combinations vary by model. Lower temperature does not guarantee truth or exact reproducibility. Compare controlled settings with repeated representative runs and quality/cost measures.",
      },
    ],
    business:
      "A voice assistant needs a full latency budget from speech input to audible output. Streaming a fast first token is useful only if retrieval, safety checks and speech synthesis also meet the interaction requirement.",
    lab: {
      title: "Profile a request and select one optimization",
      prerequisites:
        "Use a sandbox application with stage timings or a small recorded trace dataset. Optional CloudWatch/X-Ray instrumentation and model calls can incur charges.",
      steps: [
        "Record end-to-end duration and separate spans for retrieval, reranking, inference and external tools.",
        "Compare several short and long requests, including queue time and input/output token counts.",
        "Identify the dominant critical-path stage. Check whether two slow operations are independent before proposing concurrency.",
        "Change one setting, such as candidate count, output limit or an independent fetch schedule, and rerun matched cases.",
        "Report p50 and p95 alongside factual quality and cost; note the sample size and any changed failure behavior.",
      ],
      verify:
        "The evidence identifies a bottleneck and a measured improvement without hiding quality regressions behind a faster average.",
      cleanup:
        "Remove temporary load generators, alarms and expensive endpoints. Delete test traces/logs under your retention policy and stop any scheduled benchmark jobs.",
    },
    refs: ["xray", "parameters", "gpu", "k-nn", "latency", "quotas"],
  },
  4.3: {
    title: "Observe model behavior and business outcomes",
    goal: "Find silent quality failures and cost runaways even when every API returns success.",
    concepts: [
      {
        heading: "Correlated observability",
        text: "Propagate request and session identifiers appropriately across stages. Record model, prompt and retrieval configuration versions, durations, token usage, retries and tool outcomes. Use X-Ray or OpenTelemetry spans for the application path and CloudWatch metrics/logs for operational analysis. Protect payloads and avoid placing personal data in metric dimensions.",
      },
      {
        heading: "Quality metrics must be built",
        text: "Hallucination or unsupported-claim rates require a defined evaluation process and labels or calibrated judges. Business resolution, escalation and abandonment metrics come from application events. Refusal rates need cohort analysis to distinguish intended blocking from false positives. A dashboard is only as meaningful as the data and denominators behind it.",
      },
      {
        heading: "Specialized failure patterns",
        text: "Watch ingestion lag, failed documents, vector-index health and relevance drift. For agents, track loop depth, repeated tool calls, delegation paths and completed tasks, not just individual API success. Token spikes can come from longer prompts, output growth, retries or unbounded agents. Adaptive alarms help detect anomalies; explicit budgets contain them.",
      },
      {
        heading: "Regression and forensics",
        text: "Replay versioned golden cases and compare observable actions and final claims. Semantic output differences need a rubric to separate harmless paraphrases from factual changes. API audit logs, invocation content logs and source lineage answer different questions. Retain the specific artifact references needed to investigate a disputed result without unnecessarily retaining sensitive text.",
      },
    ],
    business:
      "An AI operations dashboard should connect uptime and token spend to successful customer tasks. A system that is technically available but answers without its required private evidence is degraded.",
    lab: {
      title: "Investigate an expensive or slow request",
      prerequisites:
        "Use synthetic structured log records in a dedicated CloudWatch log group or existing permitted sandbox logs. Logs ingestion, storage and queries can incur charges.",
      steps: [
        "Create or inspect records containing requestId, promptVersion, modelId, inputTokens, outputTokens, attempts and stage durations.",
        "In Logs Insights, select a bounded time range and inspect actual field names before writing aggregation queries.",
        "Sort or aggregate expensive requests and compare tokens per logical request with number of invocation attempts.",
        "Build a small dashboard pairing latency and token metrics with an application outcome such as validated completion.",
        "Define an alert with an owner and a concrete response, including how to stop an agent loop or roll back a prompt configuration.",
      ],
      verify:
        "You can distinguish one long request from many retried calls and explain which runtime control contains the problem. A cost report alone is not an immediate stop control.",
      cleanup:
        "Delete test log groups, dashboards and alarms if no longer needed. Stop test producers and inspect any scheduled log/evaluation jobs for continuing charges.",
      code: {
        title:
          "Logs Insights: compare application token usage by prompt version",
        text: "# Paste in Logs Insights, not the CloudShell terminal.\n# Requires your application to emit these JSON fields.\nfields promptVersion, inputTokens, outputTokens, attempts\n| filter ispresent(promptVersion)\n| stats count(*) as requests,\n        avg(inputTokens) as avgInput,\n        avg(outputTokens) as avgOutput,\n        avg(attempts) as avgAttempts by promptVersion\n| sort avgInput desc",
      },
    },
    refs: [
      "logging",
      "cloudwatch-metrics",
      "log-insights",
      "dashboards",
      "anomaly",
      "agent-trace",
    ],
  },
  5.1: {
    title: "Evaluate the complete application",
    goal: "Design comparable tests of retrieval, generation, agents and user outcomes.",
    concepts: [
      {
        heading: "Define what good means",
        text: "Relevance, factual support, consistency, fluency, policy compliance and task completion are different properties. Exact match is appropriate for exact fields but can reject valid prose paraphrases. Semantic similarity can reward paraphrases while missing negation or changed quantities. Use multiple task-appropriate checks and explicit critical-failure gates.",
      },
      {
        heading: "Separate RAG and agent stages",
        text: "Precision@k is relevant returned items divided by returned items; recall@k is relevant returned items divided by all labeled relevant items. Hit rate asks whether at least one relevant item appears. After retrieval, evaluate whether the answer faithfully uses evidence. For agents, assess final task success, authorized tool use, repeated actions and resource consumption.",
      },
      {
        heading: "Human and model evaluation",
        text: "Experts need a consistent rubric, permitted workforce access and adjudication for disagreement. LLM judges can scale scoring but require calibration, bias checks and resistance to instructions embedded in evaluated text. User ratings have selection bias; pair them with abandonment, escalation and representative review. Supported Bedrock evaluation workflows can automate parts of this process.",
      },
      {
        heading: "Comparable releases and reports",
        text: "Pin dataset, rubric, model and prompt versions. Use matched cases and repeated runs where stochastic variation matters. Report cohorts, sample limitations, cost and latency alongside quality. Offline gates, canaries and synthetic end-to-end checks catch different failures. A health check that receives HTTP 200 cannot prove private retrieval and grounding work.",
      },
    ],
    business:
      "Before selling a support assistant, define successful resolution and compare with the current workflow. Give customers a report that explains dataset coverage, failure types and cost per outcome rather than a context-free accuracy number.",
    lab: {
      title: "Build a small evaluation dataset and report",
      prerequisites:
        "Prepare 12–20 synthetic cases with reference facts, supporting documents and expected task outcomes. Bedrock evaluation jobs, model calls, judge calls and human workflows can incur separate charges.",
      steps: [
        "Write a rubric covering factual support, required fields, policy behavior and successful task completion. Mark critical failures separately.",
        "Inspect Bedrock Evaluations and choose a supported workflow, or run a manual paired comparison using the same versioned cases.",
        "Score two prompt/model configurations on identical inputs. Include one unsupported question, one contradictory source and one exact-number case.",
        "For retrieval cases, label relevant passages and compute precision and recall independently of generated-answer quality.",
        "Report quality by cohort, latency, total invocation cost and limitations. Add a synthetic production question that requires a known private test document.",
      ],
      verify:
        "The report makes a defensible comparison and shows where retrieval succeeded but generation failed, or vice versa. A high aggregate score must not conceal a critical access violation.",
      cleanup:
        "Delete optional evaluation job outputs and temporary S3 datasets when finished, according to your retention policy. Stop scheduled evaluations and remove test canaries if you created them.",
    },
    refs: ["eval", "knowledge-eval", "groundtruth", "synthetics", "athena"],
  },
  5.2: {
    title: "Troubleshoot by isolating the failing layer",
    goal: "Use rendered requests and controlled comparisons to locate defects instead of changing every setting.",
    concepts: [
      {
        heading: "Start with the observed failure",
        text: "A ValidationException points toward request shape, unsupported parameters or capability limits; throttling suggests capacity or quota pressure; AccessDenied requires checking the actual principal and effective policies. A successful call with a bad answer requires content and workflow evaluation. Do not retry a deterministic defect indefinitely.",
      },
      {
        heading: "Inspect the full context",
        text: "Count system text, conversation, retrieved evidence, tool schemas and output reservation against model limits. Silent application truncation can discard important facts. Compare the fully rendered prompt, including bound variables and ordering, rather than only the template file. Keep diagnostics redacted and linked to release identifiers.",
      },
      {
        heading: "Isolate retrieval failures",
        text: "Check that the source was ingested, metadata filters permit it, chunks contain complete evidence, and query/document embeddings remain compatible. Equal dimensions are not proof of compatible models. Test labeled queries before rebuilding everything; missing ingestion, terminology changes and rank errors require different fixes.",
      },
      {
        heading: "Prevent recurrence",
        text: "Template tests catch missing variables and escaping errors; schema validation catches structural output defects; semantic tests catch wrong field meaning. Correlate logs and traces to stage boundaries, compare one controlled change at a time and add the reproduced failure to regression coverage. A rollback must restore the compatible code, prompt, model and retrieval configuration together.",
      },
    ],
    business:
      "For a production RAG service, fast incident diagnosis protects both customer trust and operating margin. Preserve evidence that separates a permissions issue from poor relevance or a prompt regression, then release a targeted verified fix.",
    lab: {
      title: "Reproduce and repair a prompt-rendering defect",
      prerequisites:
        "Use a sandbox template and synthetic data. The initial binding checks can run locally without AWS charges; an optional final model invocation incurs normal usage cost.",
      steps: [
        "Create a template requiring customer_name and supply customerName instead. Inspect the exact rendered text or the renderer's validation error.",
        "Add a deterministic check for missing required variables before invocation; include empty and wrongly typed values.",
        "Run a valid case and validate the output against a schema and labeled field meanings, not JSON parsing alone.",
        "Record prompt version and a correlation ID in a test diagnostic event. Use Logs Insights or your local log viewer to locate the render-stage failure.",
        "Add the missing-variable case to the regression set and compare the fixed release with the prior version on matched cases.",
      ],
      verify:
        "The deterministic defect is rejected before the model call, while valid requests still pass. You can state precisely which layer failed and which test prevents recurrence.",
      cleanup:
        "Delete temporary scripts or logs containing sensitive values and remove optional test resources. Retain only synthetic regression cases and non-sensitive configuration records.",
    },
    refs: ["prompt", "converse", "log-insights", "xray", "embedding"],
  },
};
