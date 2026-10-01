/* Domain 2 study modules (26% of the exam). */
window.STUDY = window.STUDY || {};
Object.assign(window.STUDY, {
'2.1': {
  goal: 'Build agents that reason, use tools safely, remember context, coordinate, and involve humans, using Bedrock Agents/AgentCore, Strands, Agent Squad, MCP and Step Functions.',
  big: 'An **agent** is an FM in a loop: it **reasons** about a goal, **chooses a tool**, **observes** the result, and repeats until done. The exam checks that you can pick the right framework, make the loop **safe and bounded**, expose tools reliably, and keep state. Domain 2 is 26% of the exam, and this is its biggest topic.',
  concepts: [
    { h: 'The agent landscape on AWS', p: '**Amazon Bedrock Agents**: fully managed. You provide instructions, **action groups** (OpenAPI schema or function definitions backed by Lambda, or return-of-control to your app), optional **Knowledge Bases**, memory, guardrails and tracing. **Multi-agent collaboration** lets a supervisor delegate to collaborator agents. **Amazon Bedrock AgentCore**: infrastructure for agents built in **any framework and any model**: **Runtime** (serverless, session-isolated hosting), **Memory** (short- and long-term), **Gateway** (turn APIs, Lambda and OpenAPI into MCP tools), **Identity**, **Observability**, **Browser** and **Code Interpreter**. **Strands Agents**: AWS open-source, model-driven SDK (`@tool` functions, multi-agent patterns, MCP support, OpenTelemetry tracing). **AWS Agent Squad**: open-source multi-agent orchestrator with a classifier that routes each request to the best specialist agent.', trap: 'Bedrock Agents = managed config-driven agent. Strands = code framework. AgentCore = production platform to run and secure agents built with any framework (including Strands). They complement each other.' },
    { h: 'Reasoning patterns (ReAct and chain-of-thought)', p: '**ReAct** alternates **Reason → Act → Observe**. **Chain-of-thought** asks the model to think step by step before answering. You can implement explicit ReAct loops in **Step Functions**: a Task state invokes the model, a Choice state inspects whether it requested a tool, a Task runs the tool, and a loop returns the observation to the model. Explicit state machines make each step observable, retryable and bounded.' },
    { h: 'Safeguarded workflows', p: 'Autonomy needs fences: **stopping conditions** (max iterations or tokens, goal reached; a Choice state with a counter), **timeouts** (state `TimeoutSeconds`, Lambda timeout), **least-privilege IAM** so the agent role can only touch approved resources, **circuit breakers** to stop repeated failing calls, and **Guardrails** on inputs and outputs. For high-impact actions (payments, deletes) require approval.', trap: 'The agent\'s IAM role is the real security boundary. Never rely on the prompt saying "do not delete".' },
    { h: 'Memory and state', p: 'Short-term memory is the **session/conversation context**. Long-term memory persists across sessions: Bedrock Agents memory (session summaries) or **AgentCore Memory** (extracts semantic facts, user preferences, summaries). In custom agents, persist state in **DynamoDB** and retrieve relevant memories (or via a vector store) per turn.' },
    { h: 'Model coordination', p: 'Use specialised FMs for different sub-tasks (a small model for routing and extraction, a large one for reasoning, a multimodal one for images). **Aggregation logic** combines outputs (voting, merging, picking with a judge model) for ensembles. A **model selection framework** chooses per request based on complexity, cost or latency.' },
    { h: 'Human-in-the-loop', p: '**Step Functions** supports human approval with the **`.waitForTaskToken`** callback pattern: the workflow pauses, notifies a reviewer (SNS, email, a UI behind **API Gateway**), and resumes when the reviewer calls `SendTaskSuccess` or `SendTaskFailure`. Feedback endpoints on API Gateway store ratings and corrections for later improvement. Bedrock Agents can also **return control** to the application for confirmation before running an action.' },
    { h: 'Reliable tool integration', p: 'Good tools have **clear names and descriptions** (the FM chooses tools from them), **strict input schemas**, **parameter validation**, **idempotency** where side effects exist and **structured errors** the FM can recover from. Implement validation and error handling in **Lambda**. In Strands, plain Python functions with `@tool` and type hints become tool definitions.' },
    { h: 'Model Context Protocol (MCP)', p: '**MCP** is an open standard that connects agents (**MCP clients**) to tools, resources and prompts exposed by **MCP servers**, so a tool is written once and reused by any compliant client. Remote servers use the **Streamable HTTP** transport (older SSE and local stdio also exist). **Stateless, lightweight tools** fit **Lambda-hosted** MCP servers. **Complex, long-running or stateful tools** (persistent connections, heavy dependencies) fit **containers on ECS/Fargate**. **AgentCore Gateway** can present existing APIs and Lambda functions as MCP tools with managed auth. Use MCP client libraries so all agents access tools consistently.' }
  ],
  tables: [
    { title: 'Which agent technology?', head: ['Scenario', 'Choose', 'Reason'], rows: [
      ['Managed agent, minimal code, Knowledge Base + Lambda actions', 'Bedrock Agents', 'Config-driven, built-in tracing/guardrails'],
      ['Custom logic, open-source code framework, any model', 'Strands Agents (hosted on AgentCore Runtime)', 'Code control with managed hosting'],
      ['Route requests across many specialist agents', 'AWS Agent Squad or Bedrock multi-agent collaboration', 'Classifier/supervisor routing'],
      ['Secure, isolated, long-running agent hosting any framework', 'Amazon Bedrock AgentCore Runtime', 'Session isolation, scaling'],
      ['Expose existing APIs as tools to agents', 'AgentCore Gateway / MCP server', 'Standard tool interface'],
      ['Auditable bounded loop with approvals and retries', 'Step Functions', 'Explicit states, callbacks']] },
    { title: 'Where to host an MCP server', head: ['Tool profile', 'Host'], rows: [
      ['Stateless, short, spiky traffic', 'AWS Lambda'], ['Stateful, long-running, heavy dependencies', 'Amazon ECS / Fargate'], ['Existing REST/Lambda APIs to publish as tools', 'AgentCore Gateway']] }],
  flow: { title: 'A bounded ReAct loop in Step Functions', steps: [
    { t: 'Reason', d: 'Task: invoke FM with goal + tool list' },
    { t: 'Decide', d: 'Choice: tool requested? final answer? max steps hit?' },
    { t: 'Act', d: 'Task: Lambda tool (validated, least-privilege)' },
    { t: 'Observe', d: 'Append result to context; loop' },
    { t: 'Stop / approve', d: 'Final answer, or wait for human token' }] },
  patterns: [
    '"Prevent runaway agent loops" → stopping conditions (iteration cap) + timeouts + circuit breaker.',
    '"Require manager approval before an action" → Step Functions waitForTaskToken.',
    '"Lightweight stateless tools shared by many agents" → MCP server on Lambda.',
    '"Complex tool needing long-lived connections" → MCP server on ECS.',
    '"Route to the right specialist agent" → Agent Squad classifier / supervisor.'],
  refs: [['Bedrock Agents', 'https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html'], ['AgentCore', 'https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html'], ['Strands Agents', 'https://strandsagents.com/'], ['Model Context Protocol', 'https://modelcontextprotocol.io/']]
},

'2.2': {
  goal: 'Deploy FMs on the right substrate for the workload: on-demand, provisioned, SageMaker or containers, optimised for LLM constraints.',
  big: 'LLMs differ from classic ML models: they are huge (memory-bound), GPU-hungry, and billed or limited by **tokens**. Deployment questions ask which hosting model gives the right balance of control, cost, latency and operations.',
  concepts: [
    { h: 'Bedrock deployment options', p: '**On-demand** (pay per token, no commitment, shared capacity, quotas) is ideal for variable traffic and prototypes. **Provisioned Throughput** reserves **model units** for guaranteed tokens-per-minute and consistent latency; commitment terms reduce price, and it is required to serve most **custom (fine-tuned) models**. **Batch inference** processes large JSONL jobs from S3 asynchronously at a discount for non-interactive workloads. **Custom Model Import** serves supported open-weight architectures you trained elsewhere. **Cross-Region inference** increases burst capacity.' },
    { h: 'Lambda for on-demand invocation', p: 'A Lambda function calling Bedrock is the simplest serverless integration: it scales to zero, pairs with API Gateway or EventBridge, and suits intermittent workloads. Mind the **15-minute** maximum duration and concurrency limits that Bedrock throttling can interact with.' },
    { h: 'SageMaker AI endpoints', p: 'Choose SageMaker when you need a **specific open model, custom container, custom inference code, GPUs of your choosing** or network isolation you control. **JumpStart** deploys popular open models quickly. **Large Model Inference (LMI) containers** (DJL Serving with vLLM or TensorRT-LLM) provide tensor parallelism, continuous batching and quantization. **Inference components** pack several models or **LoRA adapters** onto shared instances and scale each independently. Endpoint types: real-time, serverless, **asynchronous** (large payloads, long jobs, scale to zero) and batch transform. Hybrid is common: Bedrock for general tasks, SageMaker for a specialised model.' },
    { h: 'LLM-specific deployment challenges', p: 'Model weights must fit in **GPU memory** (parameters × bytes per parameter, plus the **KV cache** that grows with context length and concurrency). Options: pick a larger instance, shard the model across GPUs (tensor parallelism), **quantize** (INT8/FP8/4-bit) to shrink memory, and optimise loading (store weights in S3 and stream, use fast model loading). Plan **token throughput**, not just requests per second. Container-based patterns on **ECS/EKS with GPU instances** suit teams standardised on containers.' },
    { h: 'Balance performance and resources', p: 'Right-size: use **smaller pre-trained or distilled models** for narrow tasks; **cascade** (try a cheap model first, escalate to a larger one only when confidence is low or the task is complex); route by query complexity; cache repeated work. The exam consistently prefers the smallest model that meets the quality bar.', trap: 'Do not default to the largest model "to be safe". If a small model meets the evaluated quality target, it wins on cost and latency.' }
  ],
  tables: [{ title: 'Deployment decision guide', head: ['Situation', 'Best fit'], rows: [
    ['Spiky or unknown traffic, minimal ops', 'Bedrock on-demand (+ Lambda)'],
    ['Steady high volume, need guaranteed throughput/latency', 'Bedrock Provisioned Throughput'],
    ['Serve your fine-tuned Bedrock model', 'Provisioned Throughput (custom model)'],
    ['Overnight bulk summarisation of 1M documents', 'Bedrock batch inference'],
    ['Open-weight model, custom container, GPU control', 'SageMaker AI endpoint (LMI/JumpStart)'],
    ['Many LoRA adapters on one base model', 'SageMaker inference components / multi-adapter'],
    ['Large payloads or long jobs, tolerate wait', 'SageMaker asynchronous inference']] }],
  flow: { title: 'Choosing hosting', steps: [
    { t: 'Is a Bedrock model enough?', d: 'Yes → Bedrock. No → SageMaker/containers' },
    { t: 'Traffic shape', d: 'Spiky: on-demand. Steady: Provisioned Throughput' },
    { t: 'Interactive?', d: 'No → batch inference or async endpoint' },
    { t: 'Right-size model', d: 'Smallest model that passes evaluation; cascade' },
    { t: 'Operate', d: 'Autoscale, monitor token throughput and cost' }] },
  patterns: [
    '"Guaranteed throughput" → Provisioned Throughput.',
    '"Custom open-source model with custom serving code" → SageMaker endpoint.',
    '"Process overnight, no latency requirement" → batch inference.',
    '"Reduce GPU memory" → quantization / tensor parallelism / smaller model.'],
  refs: [['Provisioned Throughput', 'https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html'], ['Batch inference', 'https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html'], ['SageMaker inference', 'https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html']]
},

'2.3': {
  goal: 'Fit GenAI into enterprises: connect legacy systems, loosely couple with events, secure access, span on-premises and edge, and automate delivery with CI/CD and a GenAI gateway.',
  big: 'Enterprises already have systems, identity providers, compliance rules and release processes. The exam rewards **loosely coupled, secure, automated** designs that add GenAI without rewriting everything.',
  concepts: [
    { h: 'Connecting existing systems', p: 'Wrap legacy functions behind **APIs** (API Gateway + Lambda) so FMs and agents call them as tools. Use **event-driven** integration (EventBridge, SNS/SQS, DynamoDB Streams, S3 events) so the AI service reacts to business events without tight coupling and can fail independently. Use **synchronisation patterns** (CDC, AppFlow, DataSync) to keep AI data stores aligned with systems of record.' },
    { h: 'Adding GenAI to existing applications', p: '**API Gateway** fronts microservices with auth, throttling and request validation. **Lambda webhook handlers** receive callbacks from SaaS products and call Bedrock. **EventBridge** routes events (for example "ticket created") to an AI summarisation workflow and publishes the result back as another event.' },
    { h: 'Secure access frameworks', p: '**Identity federation** (IAM Identity Center, Cognito with SAML/OIDC) lets corporate identities reach the AI app. Use **role-based access control** for who can invoke which model and see which data. Grant **least-privilege IAM** (`bedrock:InvokeModel` only on the approved model ARNs; restrict with condition keys such as required guardrails). Preserve end-user identity so retrieval can filter documents per user.' },
    { h: 'Cross-environment and hybrid', p: '**AWS Outposts** runs AWS infrastructure on premises to keep data local and integrate with on-prem systems. **AWS Wavelength** puts compute at 5G edge locations for ultra-low latency. **Direct Connect or VPN** plus **PrivateLink/VPC endpoints** give private routing between on-prem and AWS services. For **data residency**, choose Regions and inference profiles deliberately, and keep sensitive data processing in approved jurisdictions.' },
    { h: 'CI/CD and GenAI gateways', p: 'Automate with **CodePipeline** (orchestrate), **CodeBuild** (build, run unit tests, evaluation suites, security scans) and **CodeDeploy** or CloudFormation/CDK (deploy with rollback). A **GenAI gateway** is a central abstraction layer (often API Gateway + Lambda or a container service) that all applications call to reach models: it centralises authentication, quotas per team, guardrails, logging, caching, model routing and cost attribution.' }
  ],
  tables: [{ title: 'Integration pattern chooser', head: ['Need', 'Pattern'], rows: [
    ['Add AI to a system without touching its code', 'Event-driven: EventBridge + Lambda'],
    ['Expose AI capability to many internal teams safely', 'GenAI gateway: API Gateway + auth + quotas + guardrails'],
    ['Data must stay on-prem', 'Outposts / hybrid with private connectivity'],
    ['Ultra-low latency for mobile edge', 'Wavelength'],
    ['Same corporate login everywhere', 'Identity federation (IAM Identity Center/Cognito)'],
    ['Automate tests and rollback of AI changes', 'CodePipeline + CodeBuild + CodeDeploy']] }],
  flow: { title: 'GenAI gateway', steps: [
    { t: 'Authenticate', d: 'Federated identity, API keys/usage plans' },
    { t: 'Policy', d: 'Rate limits, request validation, guardrails' },
    { t: 'Route', d: 'Pick model/prompt from AppConfig' },
    { t: 'Invoke & cache', d: 'Bedrock Converse, semantic/exact cache' },
    { t: 'Observe', d: 'Logs, traces, per-team cost tags' }] },
  patterns: [
    '"Loose coupling" → events (EventBridge/SQS), not direct synchronous calls everywhere.',
    '"Central control of model access, quotas and logging" → GenAI gateway.',
    '"Keep data on premises while using AWS AI" → Outposts + private connectivity.',
    '"Per-user document security" → propagate identity, filter retrieval.'],
  refs: [['Amazon EventBridge', 'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html'], ['AWS Outposts', 'https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html']]
},

'2.4': {
  goal: 'Call FMs reliably from applications: sync, streaming, async, resilient and routed.',
  big: 'This task is about **the API layer between your application and the model**: which Bedrock API, how to stream tokens, how to survive throttling and timeouts, and how to route requests to the right model.',
  concepts: [
    { h: 'Bedrock runtime APIs', p: '`InvokeModel` (model-specific body) and `InvokeModelWithResponseStream`. **`Converse`** and **`ConverseStream`** give a unified chat/tool/guardrail interface across models and are the usual best answer for multi-model apps. `ApplyGuardrail` evaluates text without calling a model. Batch inference is an asynchronous job API. Use language **AWS SDKs** from Lambda, containers or EC2; API Gateway adds **request validation** (JSON schema models) in front.' },
    { h: 'Sync vs async', p: 'Synchronous calls suit interactive requests. When work takes long or arrives in bursts, accept the request, put it on **SQS** (or start a Step Functions execution), return a job ID, and process with workers, which smooths bursts, supports retries and a **dead-letter queue**, and avoids API timeouts. Notify completion via SNS, WebSocket or polling.' },
    { h: 'Real-time streaming', p: 'Streaming returns tokens incrementally so users see output immediately (better perceived latency). Use `ConverseStream` or `InvokeModelWithResponseStream` and relay chunks to the client with **WebSockets** (API Gateway WebSocket APIs), **server-sent events**, **AppSync subscriptions**, Lambda response streaming (function URLs) or API Gateway REST API response streaming. Mind each integration\'s timeout: classic API Gateway REST integrations default to about 29 seconds, which is why long generations are streamed or run asynchronously.', trap: 'Streaming improves time-to-first-token, not total generation time or cost.' },
    { h: 'Resilience', p: 'Throttling (`ThrottlingException`, HTTP 429) is expected under load. The AWS SDK provides **retry with exponential backoff and jitter** (configure max attempts and mode). **API Gateway** usage plans and throttling protect your backend and the Bedrock quota. Add **fallbacks** (alternate model or Region, cached answer) and **X-Ray** tracing across API Gateway, Lambda and Bedrock to see where time and errors occur.' },
    { h: 'Intelligent model routing', p: '**Static routing**: application code or config maps task types to models. **Dynamic content-based routing** with **Step Functions** Choice states: a cheap classifier inspects the request (language, complexity, domain) and sends it to a specialised FM. **Metric-based routing** uses latency, error rate or cost signals to prefer healthy or cheaper models. **API Gateway request/response transformations** (mapping templates) can route or reshape payloads. **Bedrock Intelligent Prompt Routing** automatically picks between models in a family per request to cut cost with similar quality.' }
  ],
  tables: [{ title: 'Choose the interaction style', head: ['Requirement', 'Pattern'], rows: [
    ['Chat that shows text as it is generated', 'ConverseStream + WebSocket/SSE'],
    ['Document summarisation that takes minutes', 'SQS or Step Functions async + notify'],
    ['Many models, one request shape', 'Converse API'],
    ['Protect backend from bursts', 'API Gateway throttling + SQS buffer'],
    ['Transient 429s', 'SDK retries with exponential backoff and jitter'],
    ['Pick cheapest adequate model per request', 'Intelligent Prompt Routing or classifier + Step Functions routing']] }],
  flow: { title: 'Resilient streaming request', steps: [
    { t: 'Client', d: 'WebSocket/SSE connection' },
    { t: 'API Gateway', d: 'Auth, throttling, validation' },
    { t: 'Lambda/service', d: 'ConverseStream with SDK retries' },
    { t: 'Stream relay', d: 'Chunks pushed to client' },
    { t: 'Fallback', d: 'On error: alternate model or cached answer' }] },
  patterns: [
    '"ThrottlingException under bursts" → backoff with jitter, quotas/Provisioned Throughput, queue buffering, cross-Region inference.',
    '"Users wait too long to see anything" → streaming.',
    '"Request exceeds API timeout" → async pattern.',
    '"Send simple queries to a cheaper model" → routing / cascading.'],
  refs: [['Converse API', 'https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html'], ['Intelligent Prompt Routing', 'https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html'], ['Bedrock runtime errors', 'https://docs.aws.amazon.com/bedrock/latest/userguide/troubleshooting-api-error-codes.html']]
},

'2.5': {
  goal: 'Build usable GenAI interfaces and workflows, and speed up developers with Amplify, OpenAPI, Prompt Flows, Bedrock Data Automation, Q Developer, Strands and observability tools.',
  big: 'This is the **developer experience** task: FM-ready API interfaces, low-code builders, business-system enhancement, productivity tools, advanced orchestrations and faster troubleshooting.',
  concepts: [
    { h: 'FM-ready API interfaces', p: 'Design APIs for GenAI traits: **streaming responses**, **token limits** (reject or trim oversized inputs early, set `maxTokens`), and **retry strategies** for model timeouts. API Gateway adds validation, auth, throttling and caching; pair with Lambda or containers that call Bedrock.' },
    { h: 'Accessible AI interfaces', p: '**AWS Amplify** (including its **AI Kit**) provides declarative backends and UI components so front-end developers can add chat and AI features quickly. **OpenAPI specifications** enable **API-first** development: define the contract once, generate docs, SDKs and mocks, and import it into API Gateway or Bedrock Agent action groups. **Prompt Flows** lets non-programmers assemble AI workflows visually.' },
    { h: 'Enhancing business systems', p: '**Lambda** can add AI to CRM events (summarise a case, draft a reply, score a lead). **Step Functions** orchestrates document-processing pipelines (extract, classify, summarise, route). **Bedrock Data Automation** turns unstructured documents, images, audio and video into **structured outputs** using blueprints, so automated workflows can consume them.' },
    { h: 'Developer productivity', p: '**Amazon Q Developer** generates and explains code, refactors, writes unit tests, suggests API usage, performs code reviews and security scans, assists with **console error diagnosis**, and automates upgrades. **Kiro** is an agentic IDE with spec-driven development. These accelerate building and testing GenAI components; they are developer tools, not runtime components of your application.', trap: 'Q Developer helps people write code; Q Business gives employees an assistant over enterprise data. Do not mix them up.' },
    { h: 'Advanced applications and chaining', p: 'Orchestrate with **Strands Agents** and **Agent Squad** for AWS-native agentic apps, **Step Functions** for agent design patterns (sequential, parallel, map, human approval), and prompt chaining where one prompt\'s output feeds the next (Bedrock Prompt Flows or code).' },
    { h: 'Troubleshooting faster', p: '**CloudWatch Logs Insights** queries prompts, responses, latency and token counts from invocation logs. **X-Ray** traces a request through API Gateway, Lambda and Bedrock calls to find the slow or failing hop. **Q Developer** helps recognise error patterns and suggest fixes.' }
  ],
  tables: [{ title: 'Tool to purpose', head: ['Tool', 'Purpose'], rows: [
    ['Amplify (AI Kit)', 'Front-end/UI with AI conversation components'], ['OpenAPI', 'API-first contract; import to API Gateway/agents'], ['Prompt Flows', 'No-code visual AI workflow builder'],
    ['Bedrock Data Automation', 'Unstructured to structured extraction'], ['Step Functions', 'Document pipelines and agent patterns'], ['Q Developer', 'Code gen, refactor, test, error help'],
    ['Logs Insights', 'Query prompts/responses/latency'], ['X-Ray', 'Distributed tracing of FM calls']] }],
  flow: { title: 'API-first GenAI feature', steps: [
    { t: 'OpenAPI contract', d: 'Define request/response, token limits' },
    { t: 'API Gateway', d: 'Validate, auth, throttle' },
    { t: 'Lambda + Bedrock', d: 'Stream or async result' },
    { t: 'Front end', d: 'Amplify components' },
    { t: 'Operate', d: 'Logs Insights + X-Ray' }] },
  patterns: [
    '"Non-developers build the AI workflow" → Prompt Flows.',
    '"Convert invoices/audio/video into structured JSON for workflows" → Bedrock Data Automation.',
    '"Speed up writing/refactoring code" → Q Developer.',
    '"Find which hop is slow" → X-Ray.'],
  refs: [['Bedrock Data Automation', 'https://docs.aws.amazon.com/bedrock/latest/userguide/bda.html'], ['Amazon Q Developer', 'https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html'], ['AWS X-Ray', 'https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html']]
}
});
