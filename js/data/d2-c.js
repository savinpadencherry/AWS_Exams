/* Domain 2 questions: Task 2.4 (FM API integrations) and Task 2.5 (integration patterns and dev tools). */
(window.QBANK = window.QBANK || []).push(
{
  id: "d2-055", d: 2, t: "2.4", s: "2.4.1", type: "single",
  sc: "An application supports models from three providers on Amazon Bedrock and must handle chat, tool use and a guardrail configuration with one code path.",
  q: "Which API should the developer call?",
  o: [
    "The Converse API, passing messages, toolConfig and guardrailConfig in a unified format",
    "InvokeModel with a custom JSON body for each provider",
    "The Bedrock control-plane API for each request",
    "Amazon SageMaker InvokeEndpoint"],
  a: [0],
  e: "The **Converse API** offers a consistent interface for messages, tools and guardrails across supported models.",
  w: [
    "One request shape for all supported models.",
    "Per-provider bodies multiply code paths.",
    "Control-plane APIs manage resources, not inference.",
    "InvokeEndpoint targets SageMaker endpoints, not Bedrock models."]
},

{
  id: "d2-056", d: 2, t: "2.4", s: "2.4.1", type: "single",
  sc: "Users upload long documents for AI analysis that can take several minutes. The web client should receive an immediate acknowledgement and the result later.",
  q: "Which API design is MOST appropriate?",
  o: [
    "API Gateway accepts the request, validates it, places a message on Amazon SQS and returns 202 with a job ID; workers call Bedrock and store results, which the client retrieves by job ID",
    "API Gateway invokes Lambda synchronously and waits for the whole analysis",
    "The browser calls Bedrock directly with long-lived credentials",
    "A cron job emails results with no job tracking"],
  a: [0],
  e: "Long-running work should use an **asynchronous pattern** with a queue, a job identifier and a retrieval or notification mechanism.",
  w: [
    "Immediate acknowledgement, durable queueing and retrieval by job ID.",
    "Synchronous waiting hits API timeouts.",
    "Embedding long-lived credentials in browsers is a security flaw.",
    "No tracking means users cannot find results."]
},

{
  id: "d2-057", d: 2, t: "2.4", s: "2.4.2", type: "single",
  sc: "A chat interface feels slow because users see nothing until the full answer (about 20 seconds) is generated. The team wants text to appear as it is produced.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Use ConverseStream (or InvokeModelWithResponseStream) and relay chunks to the browser over a WebSocket, server-sent events or a streaming-capable endpoint",
    "Increase maxTokens",
    "Lower the temperature to reduce latency",
    "Switch to batch inference"],
  a: [0],
  e: "**Response streaming** returns tokens incrementally, improving perceived latency; relay them with WebSockets, SSE or Lambda response streaming.",
  w: [
    "Incremental delivery fixes the blank-screen problem.",
    "More tokens means longer responses.",
    "Temperature does not control time to first token.",
    "Batch inference is asynchronous and slower for interactive use."]
},

{
  id: "d2-058", d: 2, t: "2.4", s: "2.4.2", type: "single",
  sc: "A REST API behind API Gateway returns 504 errors for requests where the model takes longer than the integration timeout (about 29 seconds by default) to finish generating.",
  q: "Which change BEST resolves this?",
  o: [
    "Stream the response (for example WebSocket or streaming-capable API), or make the call asynchronous with a job ID and callback",
    "Remove API Gateway and expose the Lambda function ARN publicly",
    "Increase the model's temperature",
    "Disable CloudWatch logging"],
  a: [0],
  e: "Long generations should be **streamed** or run **asynchronously** so no single request exceeds the integration timeout.",
  w: [
    "Avoids the timeout by changing the interaction pattern.",
    "Public Lambda ARNs are not an invocation option and weaken security.",
    "Temperature does not alter the time limit.",
    "Logging is unrelated."]
},

{
  id: "d2-059", d: 2, t: "2.4", s: "2.4.3", type: "single",
  sc: "An application intermittently receives ThrottlingException from Amazon Bedrock under load. Each client retries immediately and repeatedly, which prolongs the problem.",
  q: "Which client configuration is BEST?",
  o: [
    "Use the AWS SDK retry strategy with exponential backoff and jitter, and cap the number of attempts",
    "Retry in a tight loop without delay",
    "Retry only once and ignore the failure",
    "Use a longer prompt"],
  a: [0],
  e: "**Exponential backoff with jitter** spreads retries over time and avoids synchronised bursts. Cap attempts to bound latency.",
  w: [
    "Standard best practice for throttling.",
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
    "A single shared API key for all tenants",
    "Unlimited burst limits",
    "Rely on Bedrock to evenly divide capacity among tenants"],
  a: [0],
  e: "**Usage plans, API keys, throttling and quotas** in API Gateway enforce fair use and give per-tenant metering.",
  w: [
    "Per-tenant limits and metering.",
    "A shared key cannot separate tenants.",
    "No limits lets one tenant starve others.",
    "Bedrock quotas apply to your account, not per tenant."]
},

{
  id: "d2-061", d: 2, t: "2.4", s: "2.4.3", type: "single",
  sc: "A request path includes API Gateway, Lambda, a vector search and a Bedrock call. Users report occasional 12-second responses and the team cannot tell which hop is slow.",
  q: "Which service should they enable to find the bottleneck?",
  o: [
    "AWS X-Ray tracing across the services to view segment timings",
    "AWS Cost Explorer",
    "AWS Trusted Advisor",
    "Amazon Macie"],
  a: [0],
  e: "**X-Ray** traces a request across service boundaries and shows latency per segment, revealing the slow hop.",
  w: [
    "Distributed tracing with per-segment latency.",
    "Cost Explorer shows spending.",
    "Trusted Advisor gives account best-practice checks.",
    "Macie discovers sensitive data in S3."]
},

{
  id: "d2-062", d: 2, t: "2.4", s: "2.4.4", type: "single",
  sc: "A support platform receives queries in several languages and domains. A small classifier must inspect each request and send it to a specialised model: legal questions to Model A, code questions to Model B, everything else to a cheaper general model. Routing rules change as new models are added.",
  q: "Which design is MOST appropriate?",
  o: [
    "An AWS Step Functions workflow that classifies the request and uses a Choice state to invoke the appropriate model, with the mapping managed in configuration",
    "One prompt that asks the largest model to pretend to be all specialists",
    "A DNS record for each language",
    "A random selection among the models"],
  a: [0],
  e: "**Dynamic content-based routing** with Step Functions Choice states directs each request to the best-fit FM; keeping the mapping in configuration supports change.",
  w: [
    "Content-based routing to specialised models.",
    "One prompt cannot use specialised models and is costly.",
    "DNS cannot inspect request content.",
    "Random routing ignores specialisation."]
},

{
  id: "d2-063", d: 2, t: "2.4", s: "2.4.4", type: "single",
  sc: "Two model endpoints serve the same task. The team wants to prefer whichever has lower recent error rates and latency, automatically shifting traffic as conditions change.",
  q: "Which routing approach is BEST?",
  o: [
    "Metric-based routing: publish latency and error metrics to CloudWatch and have the routing layer (Lambda or AppConfig-driven weights) adjust traffic toward the healthier model",
    "Static routing in code with a fixed 50/50 split",
    "Route by the first letter of the user's name",
    "Always use the model that was deployed first"],
  a: [0],
  e: "**Metric-based (adaptive) routing** uses live operational signals to shift traffic, unlike static routing.",
  w: [
    "Adaptive to observed health.",
    "Fixed splits cannot react to degradation.",
    "Arbitrary criteria are unrelated to quality.",
    "Ignores current conditions."]
},

{
  id: "d2-064", d: 2, t: "2.4", s: "2.4.1", type: "single",
  sc: "A public API forwards user JSON to a Lambda function that calls Bedrock. Malformed requests (missing fields, oversized text) reach Lambda and waste tokens and invocations.",
  q: "What is the MOST efficient way to reject bad requests early?",
  o: [
    "Configure API Gateway request validation with a JSON schema model for the request body and parameters",
    "Have the foundation model validate each request",
    "Validate only after the model call",
    "Disable the API"],
  a: [0],
  e: "**API Gateway request validation** rejects invalid payloads before Lambda or the model are invoked, saving cost.",
  w: [
    "Fails fast at the edge before any compute or tokens are spent.",
    "Model-based validation consumes tokens.",
    "Late validation wastes the call.",
    "Removes functionality."]
},

{
  id: "d2-065", d: 2, t: "2.4", s: "2.4.3", type: "single",
  sc: "A critical application should stay available if its primary Region is throttled or degraded for a foundation model. Occasional slightly higher latency is acceptable.",
  q: "Which design BEST improves availability?",
  o: [
    "Use a cross-Region inference profile and add an application fallback (retry in a secondary Region or a secondary model) with circuit-breaker logic",
    "Only retry the same request in the same Region forever",
    "Ignore errors and return empty responses",
    "Route all traffic to the slowest model"],
  a: [0],
  e: "Combine **cross-Region capacity** with **fallbacks and circuit breakers** to remain available when a Region or model degrades.",
  w: [
    "Layered availability: pooled capacity plus fallback paths.",
    "Endless retries add load and never recover.",
    "Empty responses fail the user.",
    "The slowest model harms experience."]
},

{
  id: "d2-066", d: 2, t: "2.4", s: "2.4.4", type: "single",
  sc: "An application sends all requests to a premium model. Many simple requests do not need it. The team wants managed, automatic selection between a larger and a smaller model from the same family per request, to reduce cost with similar quality.",
  q: "Which Bedrock capability should they use?",
  o: [
    "Amazon Bedrock Intelligent Prompt Routing",
    "Amazon Bedrock Guardrails word filters",
    "Amazon Bedrock Custom Model Import",
    "Amazon Bedrock Knowledge Bases reranking"],
  a: [0],
  e: "**Intelligent Prompt Routing** predicts which model in a family best fits each prompt and routes accordingly to reduce cost.",
  w: [
    "Managed per-request routing between models in a family.",
    "Word filters block specific words.",
    "Custom Model Import brings external weights into Bedrock.",
    "Reranking improves retrieved passage ordering."]
},

{
  id: "d2-067", d: 2, t: "2.4", s: "2.4.2", type: "multiple",
  sc: "A team is evaluating whether to stream responses from Amazon Bedrock in their web application.",
  q: "Which TWO statements about streaming are correct?",
  o: [
    "It improves perceived responsiveness because users see tokens as they are generated",
    "ConverseStream returns the response incrementally as a stream of events",
    "It reduces the total number of output tokens billed",
    "It removes the possibility of throttling",
    "It guarantees faster total completion time"],
  a: [0,1],
  e: "Streaming improves **time to first token** and perceived latency but does not change billing, throttling, or necessarily total generation time.",
  w: [
    "Users see output sooner.",
    "Incremental event stream.",
    "Token billing is unchanged.",
    "Throttling can still occur.",
    "Total generation time is about the same."]
},

{
  id: "d2-068", d: 2, t: "2.4", s: "2.4.3", type: "single",
  sc: "An SQS-triggered Lambda function scales out rapidly and sends hundreds of simultaneous requests to Bedrock, causing throttling.",
  q: "What is the BEST way to smooth the load?",
  o: [
    "Set a maximum concurrency on the SQS event source mapping (or Lambda reserved concurrency) aligned with Bedrock quotas, and use backoff for retries",
    "Remove the queue so requests arrive directly",
    "Increase the visibility timeout to zero",
    "Duplicate every message"],
  a: [0],
  e: "Limit concurrency to what the quota allows so the **queue absorbs the burst** while workers consume steadily.",
  w: [
    "Controls parallelism relative to model quotas.",
    "Removing the queue increases burstiness.",
    "A zero visibility timeout causes immediate redelivery and duplicates.",
    "Duplicating messages increases load."]
},

{
  id: "d2-069", d: 2, t: "2.5", s: "2.5.1", type: "single",
  sc: "A public GenAI API sometimes receives very large text inputs that exceed the model's context window or cause expensive requests. The team wants to prevent this at the API layer.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Enforce input size limits with API Gateway request validation and count or estimate tokens before invoking the model, rejecting or truncating oversize input and setting maxTokens for responses",
    "Allow any size and let the model fail",
    "Increase the API timeout",
    "Compress the request body only"],
  a: [0],
  e: "Design FM APIs with **token limit management**: validate size early, estimate tokens, and cap output.",
  w: [
    "Controls cost and prevents context-window errors.",
    "Failures after expensive processing waste money.",
    "Timeouts do not fix size.",
    "Compression does not change token count."]
},

{
  id: "d2-070", d: 2, t: "2.5", s: "2.5.2", type: "single",
  sc: "A front-end team with little back-end experience needs to add a conversational UI to a web app that talks to Amazon Bedrock, using declarative configuration and ready-made React components.",
  q: "Which tool is MOST suitable?",
  o: [
    "AWS Amplify with its AI Kit",
    "AWS Glue",
    "Amazon EMR",
    "AWS Snowball"],
  a: [0],
  e: "**Amplify (AI Kit)** provides declarative backend configuration and UI components for conversational AI features.",
  w: [
    "Front-end-friendly AI features with components.",
    "Glue is for ETL.",
    "EMR runs big data frameworks.",
    "Snowball is for physical data transfer."]
},

{
  id: "d2-071", d: 2, t: "2.5", s: "2.5.2", type: "single",
  sc: "Multiple teams will consume a new GenAI summarisation API. Management wants consistent documentation, generated client SDKs and mock servers before implementation begins.",
  q: "Which practice supports this?",
  o: [
    "API-first development: define the contract in an OpenAPI specification and import it into API Gateway to generate documentation, SDKs and validation",
    "Implement first and document later",
    "Share the contract in a chat message",
    "Give each team a different undocumented endpoint"],
  a: [0],
  e: "**OpenAPI** enables **API-first** development: one contract drives docs, SDKs, mocks, request validation and API Gateway configuration.",
  w: [
    "Single source of truth for the interface.",
    "Late documentation causes divergence.",
    "Informal contracts drift.",
    "Undocumented endpoints impede adoption."]
},

{
  id: "d2-072", d: 2, t: "2.5", s: "2.5.3", type: "single",
  sc: "A CRM wants a button that drafts a reply to a customer case using the case history and a policy knowledge base, writing the draft back as a note. Developers prefer a serverless approach.",
  q: "Which implementation is MOST appropriate?",
  o: [
    "An API Gateway endpoint invoking a Lambda function that retrieves case history, queries the knowledge base, calls Bedrock, and writes the draft back through the CRM API",
    "A Lambda function that stores the case in a prompt template folder",
    "A persistent EC2 server polling every second",
    "A model fine-tuned on every case at request time"],
  a: [0],
  e: "**Lambda** is a natural glue layer for CRM enhancements: gather context, call the FM, and write results back.",
  w: [
    "Serverless integration with the CRM and model.",
    "Does not call the model or CRM.",
    "Polling servers add cost and operations.",
    "Per-request fine-tuning is impractical."]
},

{
  id: "d2-073", d: 2, t: "2.5", s: "2.5.3", type: "single",
  sc: "A document pipeline must: extract text from uploaded forms, classify each document, summarise it with a foundation model, and route low-confidence items to a human reviewer, with retries and an audit trail.",
  q: "Which orchestration is MOST appropriate?",
  o: [
    "AWS Step Functions orchestrating Textract, Comprehend or Bedrock classification, Bedrock summarisation, and a human-review callback task, using Retry and Catch",
    "A single Lambda function with all logic and no state tracking",
    "Amazon CloudFront",
    "AWS Direct Connect"],
  a: [0],
  e: "**Step Functions** coordinates multi-step document workflows with retries, branching, human-in-the-loop callbacks and execution history.",
  w: [
    "Purpose-built for multi-step workflows with auditability.",
    "Monolithic functions are hard to retry, observe and extend.",
    "CloudFront is a CDN.",
    "Direct Connect is networking."]
},

{
  id: "d2-074", d: 2, t: "2.5", s: "2.5.3", type: "single",
  sc: "A company needs to automatically convert videos, audio recordings and documents into structured fields (summaries, transcripts, key entities) and feed them to downstream systems on a schedule, with minimal custom ML code.",
  q: "Which service is designed for this workload?",
  o: [
    "Amazon Bedrock Data Automation, using projects and blueprints to define the structured output",
    "AWS Wavelength",
    "Amazon GameLift",
    "AWS Snow Family"],
  a: [0],
  e: "**Bedrock Data Automation** generates structured insights from multimodal content using blueprints, and can be invoked from automated workflows.",
  w: [
    "Built for multimodal-to-structured extraction.",
    "Wavelength provides edge compute.",
    "GameLift hosts game servers.",
    "Snow Family moves data physically."]
},

{
  id: "d2-075", d: 2, t: "2.5", s: "2.5.4", type: "single",
  sc: "Developers maintain a legacy service with little test coverage and need help understanding code, writing unit tests and refactoring functions, directly in their IDE.",
  q: "Which AWS offering should they use?",
  o: [
    "Amazon Q Developer",
    "Amazon Q Business",
    "Amazon Rekognition",
    "Amazon Lex"],
  a: [0],
  e: "**Amazon Q Developer** assists with code explanation, generation, test writing, refactoring and review inside IDEs.",
  w: [
    "AI coding assistant for developers.",
    "Q Business answers employee questions over enterprise data.",
    "Rekognition analyses images and video.",
    "Lex builds conversational bots."],
  trap: "Q Developer = code help; Q Business = enterprise knowledge assistant."
},

{
  id: "d2-076", d: 2, t: "2.5", s: "2.5.4", type: "multiple",
  sc: "A company is rolling out two AI assistants: one to help its engineers write and test code, and one to let non-technical employees ask questions across Confluence, SharePoint and ticketing data with respect for existing permissions.",
  q: "Which TWO choices are correct?",
  o: [
    "Amazon Q Developer for the engineers' coding assistance",
    "Amazon Q Business for employees' questions over connected enterprise data with permission-aware answers",
    "Amazon Q Business for generating unit tests in the IDE",
    "Amazon Q Developer to index SharePoint and answer HR questions",
    "Amazon Polly for both use cases"],
  a: [0,1],
  e: "Match each product to its role: **Q Developer** for software development tasks, **Q Business** for enterprise Q&A with connectors and access control.",
  w: [
    "Correct assignment for developers.",
    "Correct assignment for enterprise knowledge.",
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
    "Three separate unconnected Lambda functions invoked manually",
    "One prompt asking for everything at once with no checks",
    "AWS Glue crawlers"],
  a: [0],
  e: "**Prompt chaining** (output of one prompt feeding the next) is natively supported by Prompt Flows with sequential nodes.",
  w: [
    "Managed visual chain of prompts.",
    "Manual invocation defeats automation.",
    "A single prompt loses the staged checks.",
    "Glue crawlers discover schema in data stores."]
},

{
  id: "d2-078", d: 2, t: "2.5", s: "2.5.6", type: "single",
  sc: "Model invocation logging is enabled to a CloudWatch Logs group. The team needs to find which prompts produced the largest input token counts and longest latencies in the last 24 hours.",
  q: "Which tool should they use?",
  o: [
    "CloudWatch Logs Insights queries over the invocation logs",
    "AWS Config rules",
    "Amazon Macie",
    "IAM Access Analyzer"],
  a: [0],
  e: "**Logs Insights** lets you query and aggregate structured invocation logs by token counts, latency, model and more.",
  w: [
    "Interactive analysis of log fields.",
    "Config evaluates resource configuration.",
    "Macie finds sensitive data in S3.",
    "Access Analyzer reviews permissions."]
},

{
  id: "d2-079", d: 2, t: "2.5", s: "2.5.6", type: "single",
  sc: "A deployed assistant intermittently responds slowly. The request path includes API Gateway, a Lambda orchestrator, an OpenSearch query and two Bedrock calls. Logs show no errors.",
  q: "Which approach gives the FASTEST insight into which step is slow?",
  o: [
    "Enable AWS X-Ray tracing and inspect the service map and segment timings for slow requests",
    "Increase Lambda memory and hope",
    "Ask the model to explain the slowdown",
    "Review monthly billing"],
  a: [0],
  e: "**X-Ray** shows per-hop timing across the request path, directly pinpointing slow dependencies.",
  w: [
    "Direct visibility into each hop.",
    "Guessing without evidence.",
    "The model has no visibility into infrastructure latency.",
    "Billing does not reveal latency."]
},

{
  id: "d2-080", d: 2, t: "2.5", s: "2.5.4", type: "single",
  sc: "A team wants an agentic development environment that turns a feature request into a requirements document, design and task list before generating code, with reusable project guidance.",
  q: "Which tool aligns with this spec-driven workflow?",
  o: [
    "Kiro",
    "AWS CloudFormation",
    "Amazon Athena",
    "AWS Transfer Family"],
  a: [0],
  e: "**Kiro** is an agentic IDE emphasising **spec-driven development** (requirements, design, tasks) with steering guidance.",
  w: [
    "Spec-driven agentic IDE.",
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
    "AWS Glue DataBrew",
    "Amazon Pinpoint",
    "AWS Elastic Beanstalk"],
  a: [0],
  e: "**Strands Agents** is an open-source, model-driven agent SDK with tool decorators, MCP support and tracing.",
  w: [
    "Code-first agent SDK with MCP and tracing.",
    "DataBrew prepares data visually.",
    "Pinpoint handles customer engagement messaging.",
    "Elastic Beanstalk deploys web apps."]
},

{
  id: "d2-082", d: 2, t: "2.5", s: "2.5.2", type: "single",
  sc: "A business analyst without coding skills must prototype an AI workflow that classifies emails, retrieves policy text and drafts replies, then share it with developers for production.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Build the workflow visually in Amazon Bedrock Prompt Flows, test it, then publish a version and alias for developers to call from applications",
    "Write a distributed system in Java",
    "Use AWS Snowball",
    "Create a mainframe batch job"],
  a: [0],
  e: "Prompt Flows offers a **no-code visual builder** with versions and aliases so prototypes become callable assets for developers.",
  w: [
    "No-code authoring plus a stable callable alias.",
    "Heavy engineering effort for a prototype.",
    "Snowball transfers data physically.",
    "Unrelated to the requirement."]
}
);
