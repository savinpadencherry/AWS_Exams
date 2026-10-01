/* Domain 2 questions: Task 2.4 (FM API integrations) and Task 2.5 (integration patterns and dev tools). */
(window.QBANK = window.QBANK || []).push(
{
  id: "d2-055", d: 2, t: "2.4", s: "2.4.1", type: "single",
  sc: "An application supports models from three providers on Amazon Bedrock and must handle chat, tool use and a guardrail configuration with one code path.",
  q: "Which API should the developer call?",
  o: [
    "The Converse API, passing messages, toolConfig and guardrailConfig in a unified request format",
    "InvokeModel with a custom JSON body for each provider, selected with a switch statement in the application",
    "The Bedrock control-plane API for each request, creating a model invocation job for every chat turn",
    "Amazon SageMaker InvokeEndpoint, with each provider's model deployed behind its own endpoint"],
  a: [0],
  e: "The **Converse API** offers a consistent interface for messages, tools and guardrails across supported models.",
  w: [
    "One request shape for all supported models, including tools and guardrails.",
    "Per-provider bodies multiply code paths.",
    "Control-plane APIs manage resources and are not designed for interactive inference.",
    "InvokeEndpoint targets SageMaker endpoints, not Bedrock models, and adds infrastructure."]
},

{
  id: "d2-056", d: 2, t: "2.4", s: "2.4.1", type: "single",
  sc: "Users upload long documents for AI analysis that can take several minutes. The web client should receive an immediate acknowledgement and the result later.",
  q: "Which API design is MOST appropriate?",
  o: [
    "API Gateway validates the request, queues it on SQS and returns 202 with a job ID; workers call Bedrock and store results by job ID",
    "API Gateway invokes a Lambda function synchronously and keeps the connection open until the whole multi-minute analysis is complete",
    "The browser calls Bedrock directly using long-lived credentials embedded in the front-end code, and shows results when they arrive",
    "A scheduled job runs each night and emails every user a summary of their documents, without any job tracking or status page"],
  a: [0],
  e: "Long-running work should use an **asynchronous pattern** with a queue, a job identifier and a retrieval or notification mechanism.",
  w: [
    "Immediate acknowledgement, durable queueing and retrieval by job ID.",
    "Synchronous waiting runs into API timeouts for multi-minute work.",
    "Embedding long-lived credentials in browsers is a security flaw.",
    "Without tracking, users cannot find or relate results to uploads."]
},

{
  id: "d2-057", d: 2, t: "2.4", s: "2.4.2", type: "single",
  sc: "A chat interface feels slow because users see nothing until the full answer (about 20 seconds) is generated. The team wants text to appear as it is produced.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Use ConverseStream and relay chunks to the browser over a WebSocket, server-sent events or another streaming-capable endpoint",
    "Increase maxTokens so that the model produces the whole answer in fewer, larger chunks of output text for the interface to show",
    "Lower the temperature to reduce the time that the model needs to select each token during the generation of the answer",
    "Switch to batch inference so that the model can process the request in the background more efficiently than on-demand calls"],
  a: [0],
  e: "**Response streaming** returns tokens incrementally, improving perceived latency; relay them with WebSockets, SSE or Lambda response streaming.",
  w: [
    "Incremental delivery fixes the blank-screen problem by improving time to first token.",
    "More tokens means longer responses and a longer wait.",
    "Temperature does not control time to first token.",
    "Batch inference is asynchronous and slower for interactive use."]
},

{
  id: "d2-058", d: 2, t: "2.4", s: "2.4.2", type: "single",
  sc: "A REST API behind API Gateway returns 504 errors for requests where the model takes longer than the integration timeout (about 29 seconds by default) to finish generating.",
  q: "Which change BEST resolves this?",
  o: [
    "Stream the response (for example WebSocket or a streaming-capable API), or make the call asynchronous with a job ID and callback",
    "Remove API Gateway and expose the Lambda function directly with a public invocation endpoint that has no timeout",
    "Increase the model temperature so that generation completes faster using more varied token choices",
    "Disable CloudWatch logging for the API so that the integration spends less time writing log entries"],
  a: [0],
  e: "Long generations should be **streamed** or run **asynchronously** so no single request exceeds the integration timeout.",
  w: [
    "Avoids the timeout by changing the interaction pattern so no single request waits for the whole generation.",
    "Removing the gateway abandons authentication, throttling and validation without solving long generations.",
    "Temperature does not alter the integration time limit.",
    "Logging is unrelated to the timeout."]
},

{
  id: "d2-059", d: 2, t: "2.4", s: "2.4.3", type: "single",
  sc: "An application intermittently receives ThrottlingException from Amazon Bedrock under load. Each client retries immediately and repeatedly, which prolongs the problem.",
  q: "Which client configuration is BEST?",
  o: [
    "Use the AWS SDK retry strategy with exponential backoff and jitter, and cap the number of attempts",
    "Retry in a tight loop without any delay so that each request is attempted again as soon as it fails",
    "Retry only once and ignore the failure if the second attempt is also throttled by the service",
    "Lengthen the prompt so that each request spends more time in processing before another call is made"],
  a: [0],
  e: "**Exponential backoff with jitter** spreads retries over time and avoids synchronised bursts. Cap attempts to bound latency.",
  w: [
    "Standard best practice for throttling: spreads retries and bounds latency.",
    "Immediate retries create a retry storm.",
    "Ignoring failures loses requests.",
    "Longer prompts consume more tokens and capacity."]
},

{
  id: "d2-060", d: 2, t: "2.4", s: "2.4.3", type: "single",
  sc: "A multi-tenant API must prevent one tenant from consuming the entire Bedrock quota and make costs attributable per tenant.",
  q: "Which control is MOST appropriate at the API layer?",
  o: [
    "API Gateway usage plans with per-tenant API keys, throttling and quotas",
    "A single shared API key for all tenants, with a request log reviewed at the end of each month for heavy users",
    "Unlimited burst limits on the API so that tenants are never blocked while they use the service",
    "Rely on Bedrock to divide the account's capacity evenly among tenants without any API-level controls"],
  a: [0],
  e: "**Usage plans, API keys, throttling and quotas** in API Gateway enforce fair use and give per-tenant metering.",
  w: [
    "Per-tenant limits, quotas and metering at the API layer.",
    "A shared key cannot separate tenants, and monthly review is too late.",
    "No limits lets one tenant starve the others.",
    "Bedrock quotas apply to your account, not per tenant."]
},

{
  id: "d2-061", d: 2, t: "2.4", s: "2.4.3", type: "single",
  sc: "A request path includes API Gateway, Lambda, a vector search and a Bedrock call. Users report occasional 12-second responses and the team cannot tell which hop is slow.",
  q: "Which service should they enable to find the bottleneck?",
  o: [
    "AWS X-Ray tracing across the services to view timing for each segment",
    "AWS Cost Explorer reports filtered by service to see which service has the highest monthly charge",
    "AWS Trusted Advisor checks for the account to look for under-utilized resources and cost savings",
    "Amazon Macie findings to see whether sensitive data in S3 is slowing the requests down"],
  a: [0],
  e: "**X-Ray** traces a request across service boundaries and shows latency per segment, revealing the slow hop.",
  w: [
    "Distributed tracing with per-segment latency reveals the slow hop.",
    "Cost Explorer shows spending, not request latency.",
    "Trusted Advisor gives account best-practice checks, not per-request timing.",
    "Macie discovers sensitive data in S3."]
},

{
  id: "d2-062", d: 2, t: "2.4", s: "2.4.4", type: "single",
  sc: "A support platform receives queries in several languages and domains. A small classifier must inspect each request and send it to a specialised model: legal questions to Model A, code questions to Model B, everything else to a cheaper general model. Routing rules change as new models are added.",
  q: "Which design is MOST appropriate?",
  o: [
    "A Step Functions workflow that classifies the request and uses a Choice state to invoke the matching model, with the mapping kept in configuration",
    "One prompt that asks the largest model to behave as a legal, coding and general specialist depending on the request",
    "A DNS record for each language and domain that sends requests to different model endpoints by hostname",
    "A random selection among the three models, adjusted by hand each week according to user complaints"],
  a: [0],
  e: "**Dynamic content-based routing** with Step Functions Choice states directs each request to the best-fit FM; keeping the mapping in configuration supports change.",
  w: [
    "Dynamic content-based routing to specialized models, with rules that can change.",
    "One prompt cannot use specialized models and is costly.",
    "DNS cannot inspect request content.",
    "Random routing ignores specialization."]
},

{
  id: "d2-063", d: 2, t: "2.4", s: "2.4.4", type: "single",
  sc: "Two model endpoints serve the same task. The team wants to prefer whichever has lower recent error rates and latency, automatically shifting traffic as conditions change.",
  q: "Which routing approach is BEST?",
  o: [
    "Metric-based routing: publish latency and error metrics to CloudWatch and let the routing layer adjust traffic toward the healthier model",
    "Static routing in code with a fixed 50/50 split, reviewed by an engineer each quarter",
    "Route by a hash of the user ID so that each user is consistently served by the same model endpoint",
    "Always use the model that was deployed first, since it is the best understood by the operations team"],
  a: [0],
  e: "**Metric-based (adaptive) routing** uses live operational signals to shift traffic, unlike static routing.",
  w: [
    "Adaptive routing driven by live operational signals.",
    "Fixed splits cannot react to degradation.",
    "Hash routing keeps users consistent but ignores health and performance.",
    "Ignores current conditions."]
},

{
  id: "d2-064", d: 2, t: "2.4", s: "2.4.1", type: "single",
  sc: "A public API forwards user JSON to a Lambda function that calls Bedrock. Malformed requests (missing fields, oversized text) reach Lambda and waste tokens and invocations.",
  q: "What is the MOST efficient way to reject bad requests early?",
  o: [
    "Configure API Gateway request validation with a JSON schema model for the request body and parameters",
    "Have the foundation model validate each request by asking it whether the input looks well formed",
    "Validate the request only after the model call, then discard any response that was produced for a bad request",
    "Disable the API for any client that has previously sent a malformed request and require a support ticket"],
  a: [0],
  e: "**API Gateway request validation** rejects invalid payloads before Lambda or the model are invoked, saving cost.",
  w: [
    "Fails fast at the edge, before any compute or tokens are spent.",
    "Model-based validation consumes tokens.",
    "Late validation wastes the call.",
    "Blocks legitimate clients and does not validate requests."]
},

{
  id: "d2-065", d: 2, t: "2.4", s: "2.4.3", type: "single",
  sc: "A critical application should stay available if its primary Region is throttled or degraded for a foundation model. Occasional slightly higher latency is acceptable.",
  q: "Which design BEST improves availability?",
  o: [
    "Use a cross-Region inference profile and add an application fallback (retry in a secondary Region or secondary model) with circuit-breaker logic",
    "Retry the same request in the same Region indefinitely until capacity returns to the primary model",
    "Ignore errors and return an empty response so that the application stays responsive during degradation",
    "Route all traffic to the slowest available model so that it is rarely throttled by other customers"],
  a: [0],
  e: "Combine **cross-Region capacity** with **fallbacks and circuit breakers** to remain available when a Region or model degrades.",
  w: [
    "Layered availability: pooled capacity plus fallback paths and failure containment.",
    "Endless retries add load and never recover.",
    "Empty responses fail the user.",
    "The slowest model harms the experience and is not a resilience strategy."]
},

{
  id: "d2-066", d: 2, t: "2.4", s: "2.4.4", type: "single",
  sc: "An application sends all requests to a premium model. Many simple requests do not need it. The team wants managed, automatic selection between a larger and a smaller model from the same family per request, to reduce cost with similar quality.",
  q: "Which Bedrock capability should they use?",
  o: [
    "Amazon Bedrock Intelligent Prompt Routing",
    "Amazon Bedrock Guardrails word filters configured with the names of the simple topics",
    "Amazon Bedrock Custom Model Import for each model, with a router model hosted alongside them",
    "Amazon Bedrock Knowledge Bases reranking to decide which model should answer each request"],
  a: [0],
  e: "**Intelligent Prompt Routing** predicts which model in a family best fits each prompt and routes accordingly to reduce cost.",
  w: [
    "Managed per-request routing between models in a family to reduce cost.",
    "Word filters block specific words and do not choose models.",
    "Custom Model Import brings external weights into Bedrock; it is not a routing feature.",
    "Reranking improves passage ordering, not model selection."]
},

{
  id: "d2-067", d: 2, t: "2.4", s: "2.4.2", type: "multiple",
  sc: "A team is evaluating whether to stream responses from Amazon Bedrock in their web application.",
  q: "Which TWO statements about streaming are correct?",
  o: [
    "It improves perceived responsiveness because users see tokens as they are generated",
    "ConverseStream returns the response incrementally as a stream of events",
    "It reduces the total number of output tokens billed, because partial responses can be cancelled early",
    "It removes the possibility of throttling, because streamed responses use a separate capacity pool",
    "It guarantees faster total completion time because tokens are generated in parallel on the server"],
  a: [0,1],
  e: "Streaming improves **time to first token** and perceived latency but does not change billing, throttling, or necessarily total generation time.",
  w: [
    "Users see output sooner.",
    "Incremental event stream.",
    "Token billing is unchanged for the tokens generated.",
    "Throttling can still occur.",
    "Total generation time is about the same."]
},

{
  id: "d2-068", d: 2, t: "2.4", s: "2.4.3", type: "single",
  sc: "An SQS-triggered Lambda function scales out rapidly and sends hundreds of simultaneous requests to Bedrock, causing throttling.",
  q: "What is the BEST way to smooth the load?",
  o: [
    "Set a maximum concurrency on the SQS event source mapping (or reserved concurrency) aligned with Bedrock quotas, and use backoff for retries",
    "Remove the queue so that requests arrive at Bedrock directly as soon as the events are produced",
    "Set the visibility timeout to zero so that failed messages are retried as quickly as possible",
    "Duplicate every message on the queue so that at least one copy is processed when a call is throttled"],
  a: [0],
  e: "Limit concurrency to what the quota allows so the **queue absorbs the burst** while workers consume steadily.",
  w: [
    "Controls parallelism relative to model quotas so the queue absorbs the burst.",
    "Removing the queue increases burstiness.",
    "A zero visibility timeout causes immediate redelivery and duplicate processing.",
    "Duplicating messages increases load."]
},

{
  id: "d2-069", d: 2, t: "2.5", s: "2.5.1", type: "single",
  sc: "A public GenAI API sometimes receives very large text inputs that exceed the model's context window or cause expensive requests. The team wants to prevent this at the API layer.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Enforce input size limits with API Gateway request validation, estimate tokens before invoking, reject or truncate oversize input, and set maxTokens",
    "Allow any input size and let the model return an error after it has already processed the oversized prompt and charged for it",
    "Increase the API timeout so that very large inputs have enough time to be processed by the model without being cut off",
    "Compress the request body with gzip so that large inputs fit within the model's context window and are accepted by the API"],
  a: [0],
  e: "Design FM APIs with **token limit management**: validate size early, estimate tokens, and cap output.",
  w: [
    "Controls cost and prevents context-window errors by validating early and capping output.",
    "Failures after expensive processing waste money.",
    "Timeouts do not fix size.",
    "Compression of the transport does not change the token count."]
},

{
  id: "d2-070", d: 2, t: "2.5", s: "2.5.2", type: "single",
  sc: "A front-end team with little back-end experience needs to add a conversational UI to a web app that talks to Amazon Bedrock, using declarative configuration and ready-made React components.",
  q: "Which tool is MOST suitable?",
  o: [
    "AWS Amplify with its AI Kit",
    "AWS Glue Studio notebooks, which provide ready-made front-end components for conversational experiences",
    "Amazon EMR Studio, which hosts the UI components and connects them to Amazon Bedrock models",
    "AWS Snowball Edge, which provides local web components that talk to the model"],
  a: [0],
  e: "**Amplify (AI Kit)** provides declarative backend configuration and UI components for conversational AI features.",
  w: [
    "Front-end friendly AI features with declarative configuration and components.",
    "Glue Studio is for ETL development.",
    "EMR Studio is for big data notebooks.",
    "Snowball Edge is edge hardware for data transfer and local compute."]
},

{
  id: "d2-071", d: 2, t: "2.5", s: "2.5.2", type: "single",
  sc: "Multiple teams will consume a new GenAI summarisation API. Management wants consistent documentation, generated client SDKs and mock servers before implementation begins.",
  q: "Which practice supports this?",
  o: [
    "API-first development: define the contract in OpenAPI and import it into API Gateway to generate documentation, SDKs and validation",
    "Implement the API first and write the documentation only after other teams have started to consume the working endpoints",
    "Share the contract in a chat message and let each team build its own client from that description of the endpoints",
    "Give each team a different, undocumented endpoint so that each team can evolve its own integration independently of the others"],
  a: [0],
  e: "**OpenAPI** enables **API-first** development: one contract drives docs, SDKs, mocks, request validation and API Gateway configuration.",
  w: [
    "A single source of truth for docs, SDKs, mocks and validation.",
    "Late documentation causes divergence.",
    "Informal contracts drift.",
    "Undocumented endpoints impede adoption and consistency."]
},

{
  id: "d2-072", d: 2, t: "2.5", s: "2.5.3", type: "single",
  sc: "A CRM wants a button that drafts a reply to a customer case using the case history and a policy knowledge base, writing the draft back as a note. Developers prefer a serverless approach.",
  q: "Which implementation is MOST appropriate?",
  o: [
    "An API Gateway endpoint invoking a Lambda function that gathers case history, queries the knowledge base, calls Bedrock and writes the draft to the CRM",
    "A Lambda function that copies the case into a prompt template folder and waits for an agent to write the reply by hand afterwards",
    "A persistent EC2 server that polls the CRM every second and drafts a reply for every case that it finds in the system",
    "A model fine-tuned on each individual case at request time so that it knows the whole history of that particular customer"],
  a: [0],
  e: "**Lambda** is a natural glue layer for CRM enhancements: gather context, call the FM, and write results back.",
  w: [
    "Serverless integration with the CRM, the knowledge base and the model.",
    "Does not call the model and leaves the work manual.",
    "Polling servers add cost and operations and draft replies nobody requested.",
    "Per-request fine-tuning is impractical and slow."]
},

{
  id: "d2-073", d: 2, t: "2.5", s: "2.5.3", type: "single",
  sc: "A document pipeline must: extract text from uploaded forms, classify each document, summarise it with a foundation model, and route low-confidence items to a human reviewer, with retries and an audit trail.",
  q: "Which orchestration is MOST appropriate?",
  o: [
    "Step Functions orchestrating Textract, classification, Bedrock summarization and a human-review callback task, using Retry and Catch",
    "A single Lambda function that holds all of the logic and the state in memory until the document is processed",
    "An Amazon CloudFront distribution that caches the documents and calls the model for each cache miss",
    "AWS Direct Connect links that route documents between services and trigger the summarization"],
  a: [0],
  e: "**Step Functions** coordinates multi-step document workflows with retries, branching, human-in-the-loop callbacks and execution history.",
  w: [
    "Purpose-built for multi-step workflows with retries, branching, human callbacks and an audit trail.",
    "Monolithic functions are hard to retry, observe and extend.",
    "CloudFront is a CDN, not a workflow engine.",
    "Direct Connect is network connectivity."]
},

{
  id: "d2-074", d: 2, t: "2.5", s: "2.5.3", type: "single",
  sc: "A company needs to automatically convert videos, audio recordings and documents into structured fields (summaries, transcripts, key entities) and feed them to downstream systems on a schedule, with minimal custom ML code.",
  q: "Which service is designed for this workload?",
  o: [
    "Amazon Bedrock Data Automation, using projects and blueprints to define the structured output",
    "AWS Wavelength, which runs the extraction logic near mobile users and returns structured fields",
    "Amazon GameLift, which scales servers that read media files and produce structured summaries",
    "AWS Snow Family devices, which analyze the content locally and return structured results"],
  a: [0],
  e: "**Bedrock Data Automation** generates structured insights from multimodal content using blueprints, and can be invoked from automated workflows.",
  w: [
    "Built for multimodal-to-structured extraction with blueprints.",
    "Wavelength provides 5G edge compute and does not extract content.",
    "GameLift hosts game servers.",
    "Snow Family moves and processes data at the edge physically, not as a content extraction service."]
},

{
  id: "d2-075", d: 2, t: "2.5", s: "2.5.4", type: "single",
  sc: "Developers maintain a legacy service with little test coverage and need help understanding code, writing unit tests and refactoring functions, directly in their IDE.",
  q: "Which AWS offering should they use?",
  o: [
    "Amazon Q Developer",
    "Amazon Q Business, connected to the code repository as an enterprise data source",
    "Amazon Rekognition, analyzing screenshots of the code to propose refactoring changes",
    "Amazon Lex, with a conversational bot that answers questions about the service's source code"],
  a: [0],
  e: "**Amazon Q Developer** assists with code explanation, generation, test writing, refactoring and review inside IDEs.",
  w: [
    "An AI coding assistant for explaining code, writing tests and refactoring in the IDE.",
    "Q Business answers employee questions over enterprise data and is not the IDE coding assistant.",
    "Rekognition analyzes images and video and does not refactor code.",
    "Lex builds conversational bots and is not a coding assistant."],
  trap: "Q Developer = code help; Q Business = enterprise knowledge assistant."
},

{
  id: "d2-076", d: 2, t: "2.5", s: "2.5.4", type: "multiple",
  sc: "A company is rolling out two AI assistants: one to help its engineers write and test code, and one to let non-technical employees ask questions across Confluence, SharePoint and ticketing data with respect for existing permissions.",
  q: "Which TWO choices are correct?",
  o: [
    "Amazon Q Developer for the engineers' coding assistance",
    "Amazon Q Business for employees' questions over connected enterprise data with permission-aware answers",
    "Amazon Q Business for generating unit tests inside the engineers' IDE",
    "Amazon Q Developer for indexing SharePoint and answering HR questions with document permissions",
    "Amazon Polly for both use cases, converting questions and code into spoken responses"],
  a: [0,1],
  e: "Match each product to its role: **Q Developer** for software development tasks, **Q Business** for enterprise Q&A with connectors and access control.",
  w: [
    "Correct assignment for developers.",
    "Correct assignment for enterprise knowledge with connectors and permissions.",
    "Q Business is not the IDE coding assistant.",
    "Q Developer is not the enterprise knowledge assistant.",
    "Polly converts text to speech."]
},

{
  id: "d2-077", d: 2, t: "2.5", s: "2.5.5", type: "single",
  sc: "A team is building a feature in which one prompt extracts key facts from a document, a second prompt uses those facts to draft a summary, and a third prompt checks the summary for policy compliance. They want this as a managed chain on Bedrock without custom orchestration code.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Amazon Bedrock Prompt Flows with three prompt nodes connected in sequence",
    "Three separate Lambda functions that an engineer invokes manually in order each time a document arrives",
    "One prompt that asks for the facts, the summary and the compliance check all at once, with no staged checks",
    "AWS Glue crawlers configured to extract the facts and pass them to the summarization prompt"],
  a: [0],
  e: "**Prompt chaining** (output of one prompt feeding the next) is natively supported by Prompt Flows with sequential nodes.",
  w: [
    "A managed visual chain of prompts where each output feeds the next.",
    "Manual invocation defeats automation.",
    "A single prompt loses the staged checks and is harder to debug.",
    "Glue crawlers discover data schemas and do not chain prompts."]
},

{
  id: "d2-078", d: 2, t: "2.5", s: "2.5.6", type: "single",
  sc: "Model invocation logging is enabled to a CloudWatch Logs group. The team needs to find which prompts produced the largest input token counts and longest latencies in the last 24 hours.",
  q: "Which tool should they use?",
  o: [
    "CloudWatch Logs Insights queries over the invocation logs",
    "AWS Config rules evaluating the model resources for compliance with token limits",
    "Amazon Macie scans of the log group for the prompts with the highest token counts",
    "IAM Access Analyzer findings that rank prompts by token count and latency"],
  a: [0],
  e: "**Logs Insights** lets you query and aggregate structured invocation logs by token counts, latency, model and more.",
  w: [
    "Interactive analysis and aggregation of structured log fields.",
    "Config evaluates resource configuration, not log content.",
    "Macie discovers sensitive data in S3, not token usage.",
    "Access Analyzer reviews permissions."]
},

{
  id: "d2-079", d: 2, t: "2.5", s: "2.5.6", type: "single",
  sc: "A deployed assistant intermittently responds slowly. The request path includes API Gateway, a Lambda orchestrator, an OpenSearch query and two Bedrock calls. Logs show no errors.",
  q: "Which approach gives the FASTEST insight into which step is slow?",
  o: [
    "Enable AWS X-Ray tracing and inspect the service map and segment timings for slow requests",
    "Increase the Lambda memory and see whether the slow requests improve before investigating further",
    "Ask the model to explain why its response was slow so that it can identify the slow dependency",
    "Review the monthly billing report to find the service with the highest charges during the week"],
  a: [0],
  e: "**X-Ray** shows per-hop timing across the request path, directly pinpointing slow dependencies.",
  w: [
    "Direct visibility into each hop of the request path.",
    "Guessing without evidence can waste time and money.",
    "The model has no visibility into infrastructure latency.",
    "Billing does not reveal latency."]
},

{
  id: "d2-080", d: 2, t: "2.5", s: "2.5.4", type: "single",
  sc: "A team wants an agentic development environment that turns a feature request into a requirements document, design and task list before generating code, with reusable project guidance.",
  q: "Which tool aligns with this spec-driven workflow?",
  o: [
    "Kiro",
    "AWS CloudFormation, with templates that describe the requirements and design for each feature",
    "Amazon Athena, with queries that store the requirements and tasks for each feature as tables",
    "AWS Transfer Family, with SFTP folders that hold the requirements and design documents"],
  a: [0],
  e: "**Kiro** is an agentic IDE emphasising **spec-driven development** (requirements, design, tasks) with steering guidance.",
  w: [
    "Kiro is an agentic IDE built around spec-driven development: requirements, design and tasks.",
    "CloudFormation provisions infrastructure.",
    "Athena queries data in S3.",
    "Transfer Family handles file transfers."]
},

{
  id: "d2-081", d: 2, t: "2.5", s: "2.5.5", type: "single",
  sc: "An application needs an agent to plan tasks across several tools. The team wants a code-first, model-driven SDK from AWS with built-in support for MCP tools and OpenTelemetry tracing.",
  q: "Which option fits?",
  o: [
    "Strands Agents",
    "AWS Glue DataBrew, which provides a visual interface for chaining model-driven tools",
    "Amazon Pinpoint, which provides APIs for model-driven tool use and tracing",
    "AWS Elastic Beanstalk, which provides a managed platform for model-driven agent loops"],
  a: [0],
  e: "**Strands Agents** is an open-source, model-driven agent SDK with tool decorators, MCP support and tracing.",
  w: [
    "A code-first, model-driven agent SDK with MCP support and OpenTelemetry tracing.",
    "DataBrew prepares data visually.",
    "Pinpoint handles customer engagement messaging.",
    "Elastic Beanstalk deploys web applications and is not an agent SDK."]
},

{
  id: "d2-082", d: 2, t: "2.5", s: "2.5.2", type: "single",
  sc: "A business analyst without coding skills must prototype an AI workflow that classifies emails, retrieves policy text and drafts replies, then share it with developers for production.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Build the workflow visually in Bedrock Prompt Flows, test it, then publish a version and alias for developers to call from applications",
    "Write a distributed system in Java that implements the workflow, and share the source repository with developers",
    "Order AWS Snowball Edge devices to run the workflow locally and ask developers to integrate with the devices",
    "Create a batch job on a mainframe that classifies the emails and returns drafts through nightly file exchange"],
  a: [0],
  e: "Prompt Flows offers a **no-code visual builder** with versions and aliases so prototypes become callable assets for developers.",
  w: [
    "No-code authoring plus a stable, callable alias for production use.",
    "Heavy engineering effort for a prototype and not usable by the analyst.",
    "Snowball Edge is edge hardware, not a workflow tool.",
    "Unrelated to the requirement and impractical for the prototype."]
}
);
