/* Domain 2 questions: Task 2.2 (model deployment) and Task 2.3 (enterprise integration). */
(window.QBANK = window.QBANK || []).push(
{
  id: "d2-027", d: 2, t: "2.2", s: "2.2.1", type: "single",
  sc: "A customer-facing assistant has steady, high traffic around the clock and a contractual latency SLA. On-demand inference occasionally returns throttling errors at peak, which breaches the SLA.",
  q: "Which Amazon Bedrock option BEST meets the requirement?",
  o: [
    "Purchase Provisioned Throughput for the model to reserve guaranteed capacity at the traffic level the SLA requires",
    "Move all requests to batch inference so that the model processes them in the background at a lower price per token",
    "Add a Lambda function that sleeps for a random interval before each call so that peak requests are spread out",
    "Switch to a model with a smaller context window so that each request uses less of the shared on-demand capacity"],
  a: [0],
  e: "**Provisioned Throughput** reserves model units for consistent throughput and latency, suited to steady, high, SLA-bound workloads.",
  w: [
    "Guaranteed capacity addresses throttling at peak and provides consistent latency.",
    "Batch inference is asynchronous and cannot meet an interactive latency SLA.",
    "Sleeping adds latency and does not add capacity.",
    "Context window size does not provide guaranteed capacity."]
},

{
  id: "d2-028", d: 2, t: "2.2", s: "2.2.1", type: "single",
  sc: "A publisher wants to generate summaries for 3 million archived articles over the weekend. There is no interactive latency requirement and cost matters.",
  q: "Which approach is MOST cost-effective?",
  o: [
    "Amazon Bedrock batch inference with input and output files stored in Amazon S3",
    "On-demand synchronous Converse calls from a Lambda function configured with maximum concurrency over the weekend",
    "Provisioned Throughput purchased on a one-year commitment so that the weekend job has guaranteed capacity",
    "A real-time SageMaker AI endpoint on the largest GPU instance type, kept running for the whole weekend"],
  a: [0],
  e: "**Batch inference** processes large JSONL jobs asynchronously at a lower price than on-demand for non-interactive work.",
  w: [
    "Designed for large offline workloads and priced lower than on-demand.",
    "Synchronous calls at scale invite throttling and cost more.",
    "A one-year commitment for a weekend job wastes money.",
    "An always-on large endpoint is expensive for a one-time job."]
},

{
  id: "d2-029", d: 2, t: "2.2", s: "2.2.1", type: "single",
  sc: "A company must run an open-weight model with a custom inference script (for specialized token post-processing), inside a VPC with no internet access, using specific GPU instance types.",
  q: "Which deployment is MOST appropriate?",
  o: [
    "A SageMaker AI real-time endpoint using a large model inference container with the custom inference code, deployed in the VPC",
    "Amazon Bedrock on-demand inference through the Converse API, with the post-processing logic added to the application",
    "AWS Lambda with the model weights included in the deployment package and the custom inference code as the handler",
    "An Amazon API Gateway endpoint with a mock integration that returns precomputed model outputs from a mapping template"],
  a: [0],
  e: "Custom inference code, instance choice and network isolation point to **SageMaker AI endpoints** with an LMI container in your VPC.",
  w: [
    "Full control over container, code, instance type and networking.",
    "Bedrock does not allow custom serving code or specific instance types for arbitrary open-weight models.",
    "Lambda cannot host large model weights or GPUs.",
    "A mock integration returns canned responses, not model inference."]
},

{
  id: "d2-030", d: 2, t: "2.2", s: "2.2.1", type: "single",
  sc: "A document-intelligence workload sends payloads up to 500 MB to a hosted model. Requests can take several minutes, results are not needed instantly, and traffic is sporadic with long idle periods.",
  q: "Which SageMaker AI inference option fits BEST?",
  o: [
    "Asynchronous inference, which queues requests, supports large payloads and can scale to zero when the endpoint is idle",
    "Real-time inference on a single always-on instance, with a long client-side timeout for each request",
    "Serverless inference, which scales to zero and is designed for GPU workloads with large payloads",
    "Batch transform jobs started manually by an operator each time a document arrives"],
  a: [0],
  e: "**Asynchronous inference** handles large payloads and long processing times, queues requests and can scale to zero.",
  w: [
    "Matches payload size, long duration and idle periods.",
    "Real-time endpoints have payload and timeout limits and bill while idle.",
    "Serverless inference has payload and duration limits and no GPU support suited to this workload.",
    "Manual batch transform adds operational burden and latency."]
},

{
  id: "d2-031", d: 2, t: "2.2", s: "2.2.2", type: "single",
  sc: "A team wants to host a 70-billion-parameter model in 16-bit precision. A single GPU does not have enough memory to hold the weights, plus extra memory is needed for the key-value cache at the target concurrency.",
  q: "Which approach resolves the memory constraint?",
  o: [
    "Shard the model across multiple GPUs with tensor parallelism, or quantize the weights to a lower precision to reduce the footprint",
    "Increase the Lambda memory setting so that the model is loaded into a larger pool of memory before inference",
    "Lower the temperature so that the model produces shorter outputs and therefore needs less memory",
    "Switch to a model variant with a longer context window so that more of the weights can be cached"],
  a: [0],
  e: "LLM weights plus the **KV cache** must fit in GPU memory. Use **tensor parallelism** across GPUs or **quantization** (and size instances accordingly).",
  w: [
    "Directly addresses the memory needed for weights and the KV cache.",
    "Lambda memory is unrelated to GPU memory.",
    "Temperature does not affect memory requirements.",
    "Longer contexts require more KV-cache memory, not less."]
},

{
  id: "d2-032", d: 2, t: "2.2", s: "2.2.2", type: "single",
  sc: "An LLM endpoint handles many concurrent requests of varying length. GPU utilization is low because requests are processed one at a time and short requests wait behind long ones.",
  q: "Which serving feature improves throughput MOST?",
  o: [
    "Continuous batching in an optimized serving framework, for example vLLM or TensorRT-LLM in a large model inference container",
    "Reduce the number of GPU instances to one so that all requests are queued in a single, predictable order",
    "Disable response streaming so that each reply is sent in one piece and the GPU is released sooner",
    "Raise the temperature so that the model finishes each response faster using more varied token choices"],
  a: [0],
  e: "**Continuous (in-flight) batching** schedules tokens from multiple requests together, keeping the GPU busy and improving token throughput.",
  w: [
    "Schedules tokens from multiple requests together, keeping the GPU busy and improving throughput.",
    "Fewer instances reduces capacity and worsens queueing.",
    "Streaming affects delivery, not GPU scheduling.",
    "Temperature is a sampling setting that does not improve GPU utilization."]
},

{
  id: "d2-033", d: 2, t: "2.2", s: "2.2.3", type: "single",
  sc: "A support application sends all queries to a large, expensive model. Analysis shows 70% of queries are simple and a smaller model answers them correctly. The remaining 30% need stronger reasoning.",
  q: "Which pattern reduces cost MOST while maintaining quality?",
  o: [
    "Model cascading: try a smaller model first and escalate to the larger model when the task is complex or confidence is low",
    "Always use the largest model for every request, because it is the safest choice for every query type",
    "Always use the smallest model for every request and accept the lower quality on complex questions",
    "Reduce the number of users by limiting access to the assistant to staff who really need it"],
  a: [0],
  e: "**Cascading** (or routing) sends routine queries to a cheap model and reserves the expensive model for hard cases.",
  w: [
    "Captures savings on the simple majority while protecting hard cases.",
    "Overpays on the 70% of traffic that is simple.",
    "Fails on the 30% that need stronger reasoning.",
    "Not a technical cost-optimization solution and harms the business."]
},

{
  id: "d2-034", d: 2, t: "2.2", s: "2.2.3", type: "single",
  sc: "A company needs to classify support tickets into 12 categories at very high volume. A fine-tuned small pre-trained model matches the accuracy of a much larger model on a golden test set.",
  q: "What should the developer do?",
  o: [
    "Deploy the smaller model for this task to reduce cost and latency, since it meets the evaluated accuracy bar",
    "Deploy the larger model because it is more capable in general and will be safer if the ticket types change",
    "Run both models on every request and keep the answer on which they agree to improve accuracy further",
    "Delay the launch until a larger model is released that might outperform both of the current candidates"],
  a: [0],
  e: "If a smaller model **meets the evaluated quality bar**, it wins on cost and latency. Capability beyond the task requirement is wasted spend.",
  w: [
    "Evidence shows equal accuracy at lower cost and latency.",
    "General capability is wasted on a narrow, measured task.",
    "Running both doubles cost without a measured benefit.",
    "Unnecessary delay, with no evidence of a quality gap."]
},

{
  id: "d2-035", d: 2, t: "2.2", s: "2.2.1", type: "single",
  sc: "A company's general assistant uses Amazon Bedrock foundation models, but one feature requires a domain-specific model the team fine-tuned and hosts itself. They want a single application to use both, with the choice made per request.",
  q: "Which architecture is MOST appropriate?",
  o: [
    "A hybrid design: Bedrock for general tasks and a SageMaker AI endpoint for the specialized model, selected by a routing layer",
    "Move everything to a single SageMaker AI endpoint and retire the Bedrock models used by the general assistant",
    "Re-run fine-tuning of the specialized model inside a Lambda function at the start of each request",
    "Build two separate applications, one for each model, and ask users to choose which one to open"],
  a: [0],
  e: "**Hybrid deployments** combine managed Bedrock models with self-hosted specialised models, with routing logic choosing per request.",
  w: [
    "Uses each platform where it is strongest, with per-request selection.",
    "Gives up managed models without need and adds hosting work.",
    "Lambda cannot perform model fine-tuning for each request.",
    "A poor user experience with no routing logic."]
},

{
  id: "d2-036", d: 2, t: "2.2", s: "2.2.2", type: "single",
  sc: "A platform team standardised on Kubernetes and wants to run its own inference containers with GPU nodes, scaling replicas with demand.",
  q: "Which scaling signal is MOST appropriate for LLM serving?",
  o: [
    "Concurrent requests, queue depth or GPU utilization per replica, rather than CPU alone",
    "CPU utilization of each pod, because CPU load is the standard indicator for container scaling decisions",
    "The number of objects in the model artifact bucket, since larger buckets indicate heavier inference demand",
    "The time of day only, using a fixed schedule that adds replicas during business hours"],
  a: [0],
  e: "LLM serving is **GPU- and token-bound**. Scale on **concurrency, queue depth or GPU utilization**; CPU often stays low while the GPU saturates.",
  w: [
    "LLM serving is GPU- and token-bound, so saturation shows up in concurrency, queues and GPU use.",
    "CPU often stays low while the GPUs are saturated.",
    "Object counts do not measure inference load.",
    "A fixed schedule cannot follow real traffic."]
},

{
  id: "d2-037", d: 2, t: "2.2", s: "2.2.1", type: "single",
  sc: "A startup has a daily spike of requests at 9 AM and almost no traffic otherwise. It wants predictable low latency during the spike, but not to pay for idle capacity all day.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Use on-demand Bedrock with retries and cross-Region inference for the spike, adding time-bound Provisioned Throughput only if throttling persists",
    "Buy a six-month Provisioned Throughput commitment immediately so that peak latency is guaranteed from day one",
    "Run GPU instances around the clock so that capacity is always available for the morning peak and no throttling occurs",
    "Disable retries so that errors surface quickly and the application can show a message instead of waiting"],
  a: [0],
  e: "Match the purchase model to the traffic shape. Short predictable spikes rarely justify long commitments; start with on-demand plus resilience measures and measure.",
  w: [
    "Starts cheap and escalates only with evidence of need.",
    "A long commitment pays for idle hours outside the daily spike.",
    "Round-the-clock GPUs are expensive for a single daily spike.",
    "Disabling retries worsens errors during the spike."]
},

{
  id: "d2-038", d: 2, t: "2.2", s: "2.2.2", type: "multiple",
  sc: "A traditional ML engineer is moving from small classification models to large language model hosting.",
  q: "Which TWO factors are distinctive for deploying LLMs?",
  o: [
    "GPU memory must hold the model weights and a KV cache that grows with context length and concurrency",
    "Capacity is better planned in tokens per minute than only in requests per second",
    "Large language models never need to be monitored once they are deployed, because their behavior is fixed",
    "Latency is unaffected by output length, because the full response is generated in a single pass",
    "Quantization is impossible for large language models because their weights must stay at full precision"],
  a: [0,1],
  e: "LLM serving is dominated by **memory** (weights plus KV cache) and **token throughput**, and latency grows with output length.",
  w: [
    "KV-cache growth is a defining LLM constraint.",
    "Token-based throughput is the right planning unit.",
    "Monitoring remains essential for latency, cost and quality.",
    "Generating more tokens takes longer, token by token.",
    "Quantization is a common optimization."]
},

{
  id: "d2-039", d: 2, t: "2.3", s: "2.3.1", type: "single",
  sc: "A manufacturer wants an AI assistant to query a legacy inventory system that only exposes a SOAP interface and cannot be modified. Security requires that the assistant never connects to the system directly.",
  q: "Which design is MOST appropriate?",
  o: [
    "Wrap the legacy interface behind an API layer (API Gateway with a Lambda function that translates calls) and expose it to the agent as a tool",
    "Give the foundation model the network credentials of the legacy system so that it can call the SOAP interface directly",
    "Rewrite the legacy inventory application with a modern REST interface before starting any GenAI work on the assistant",
    "Export the inventory to a spreadsheet by hand every morning and upload it to the knowledge base for the assistant"],
  a: [0],
  e: "An **API facade** (API Gateway + Lambda) isolates the legacy system, enforces authentication and validation, and lets the AI call it as a tool without modifying it.",
  w: [
    "An API facade isolates the legacy system, enforces authentication and validation, and needs no change to it.",
    "Direct credentials violate the stated security rule.",
    "Unneeded delay and cost, and the requirement says the system cannot be modified.",
    "Manual exports go stale and do not scale."]
},

{
  id: "d2-040", d: 2, t: "2.3", s: "2.3.1", type: "single",
  sc: "When a support ticket is created in an existing ticketing system, a GenAI summary should be generated and attached to the ticket. The ticketing team does not want its system to depend on the AI service being available.",
  q: "Which integration pattern is BEST?",
  o: [
    "Publish a ticket-created event to Amazon EventBridge, trigger a summarization workflow, and write the result back asynchronously",
    "Have the ticketing system call the model synchronously and block ticket creation until the summary is returned",
    "Poll the ticket database every second from an EC2 instance and generate a summary for each new ticket found",
    "Require agents to copy ticket text into a separate chat window and paste the generated summary back by hand"],
  a: [0],
  e: "**Event-driven loose coupling** means ticket creation never waits on or fails because of the AI service; processing happens asynchronously.",
  w: [
    "Event-driven loose coupling means ticket creation never waits on or fails because of the AI service.",
    "Synchronous blocking couples ticketing availability to the AI service.",
    "Tight polling is wasteful and operationally heavy.",
    "Manual copying defeats automation."]
},

{
  id: "d2-041", d: 2, t: "2.3", s: "2.3.2", type: "single",
  sc: "A SaaS CRM sends HTTPS webhook callbacks when a lead is updated. The company wants to enrich each lead with an AI-generated summary and handle duplicate webhook deliveries safely.",
  q: "Which design is MOST appropriate?",
  o: [
    "An API Gateway endpoint triggering a Lambda webhook handler that verifies the signature, deduplicates by event ID, and calls Bedrock",
    "Allow the CRM to write directly into the model's prompt through a public endpoint that accepts raw text",
    "Run a fleet of EC2 instances that poll the CRM every few seconds and process any lead that has changed",
    "Ask the CRM vendor to send webhook events by email to an inbox that a person forwards to the AI team"],
  a: [0],
  e: "Webhook handlers belong in a thin, authenticated, **idempotent** layer: API Gateway plus Lambda with deduplication, then the model call.",
  w: [
    "A thin, authenticated and idempotent webhook layer, then the model call.",
    "Models do not accept webhooks, and an unauthenticated endpoint is unsafe.",
    "Polling is heavier and slower than push.",
    "Email is not an integration protocol here."]
},

{
  id: "d2-042", d: 2, t: "2.3", s: "2.3.3", type: "single",
  sc: "Employees sign in through the company's corporate identity provider. The GenAI application must grant access based on department roles, and no separate user database should be created.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Federate the corporate identity provider with AWS (IAM Identity Center or Cognito with SAML/OIDC) and map identity-provider groups to application roles",
    "Create a shared username and password for each department and distribute it to the employees in that department",
    "Store employee passwords in a DynamoDB table so that the application can verify logins without any external identity system",
    "Allow anonymous access to the application and restrict by corporate IP address ranges instead of user roles"],
  a: [0],
  e: "**Identity federation** reuses corporate identities and groups for role-based access, avoiding duplicate credential stores.",
  w: [
    "A single source of identity with role mapping, and no duplicate credential store.",
    "Shared credentials destroy accountability.",
    "Custom password storage is risky and redundant.",
    "IP filtering is not user-level, role-based authorization."]
},

{
  id: "d2-043", d: 2, t: "2.3", s: "2.3.3", type: "multiple",
  sc: "A security team wants least-privilege access to foundation models for several applications on Amazon Bedrock.",
  q: "Which TWO measures apply?",
  o: [
    "Scope IAM permissions for bedrock:InvokeModel to the specific model or inference profile ARNs each application needs",
    "Use IAM condition keys (for example requiring a specific guardrail) to enforce safety settings on invocations",
    "Grant bedrock:* on all resources to every application role to simplify deployment and troubleshooting",
    "Share one IAM access key between all applications so that credentials can be rotated in a single place",
    "Allow invocation from any IAM principal in the account so that new applications can start without a policy change"],
  a: [0,1],
  e: "**Resource-level permissions** and **condition keys** enforce least privilege and mandatory guardrails. Wildcards and shared keys defeat accountability.",
  w: [
    "Limits which models can be invoked.",
    "Conditions can require guardrails on invocations.",
    "Wildcards grant excessive access.",
    "Shared keys prevent attribution and increase the impact of a leak.",
    "Account-wide access violates least privilege."]
},

{
  id: "d2-044", d: 2, t: "2.3", s: "2.3.3", type: "single",
  sc: "A RAG chatbot over HR documents must ensure each employee only sees content they are authorised to read. Authorization data comes from the identity provider (department, region, clearance).",
  q: "Which design BEST enforces this?",
  o: [
    "Pass the signed-in user's attributes to retrieval and apply metadata filters (or per-group indexes) so unauthorized chunks are never retrieved",
    "Tell the model in the system prompt not to reveal documents that the signed-in user is not authorized to read",
    "Retrieve all matching documents and let the model decide which parts of them are appropriate to show to the current user",
    "Use one shared service account for retrieval and rely on the user interface to hide any content that is restricted"],
  a: [0],
  e: "**Enforce authorization at retrieval**, so restricted chunks never reach the prompt. The model cannot be trusted to withhold information it has already been given.",
  w: [
    "Server-side filtering before generation keeps restricted content out of the prompt.",
    "Prompt instructions can be bypassed by injection.",
    "Unauthorized content has already been exposed to the model.",
    "UI-only controls can be bypassed."],
  trap: "Never rely on the model to enforce access control."
},

{
  id: "d2-045", d: 2, t: "2.3", s: "2.3.4", type: "single",
  sc: "A hospital must keep raw patient records on premises. It wants to use foundation models in AWS for summarisation using only de-identified text, with private connectivity and no public internet path.",
  q: "Which architecture is MOST appropriate?",
  o: [
    "De-identify data on premises, connect over Direct Connect or Site-to-Site VPN into a VPC, and call Bedrock through an interface VPC endpoint (PrivateLink)",
    "Upload the raw patient records to a public S3 bucket and call Bedrock over the internet from a public endpoint",
    "Email the de-identified text to a mailbox that an automation reads and forwards to the foundation model",
    "Disable encryption on the connection to reduce latency, since the data has been de-identified before sending"],
  a: [0],
  e: "Keep sensitive data local, **de-identify before leaving**, and use **private connectivity** (Direct Connect/VPN + PrivateLink VPC endpoint) to reach AWS services.",
  w: [
    "Combines data minimization with private routing.",
    "Public exposure violates the requirement and the raw data must stay on premises.",
    "Email is not a secure integration path.",
    "Encryption must remain enabled."]
},

{
  id: "d2-046", d: 2, t: "2.3", s: "2.3.4", type: "single",
  sc: "A mobile augmented-reality application needs ultra-low-latency pre-processing close to 5G users before calling a foundation model for descriptions.",
  q: "Which AWS service helps place compute closest to the mobile users?",
  o: [
    "AWS Wavelength",
    "AWS Direct Connect, with a dedicated link from the mobile carrier's data center to the AWS Region",
    "Amazon S3 Glacier, with pre-processing code stored in the archive near the mobile users",
    "AWS Snowball Edge, shipped to each mobile user location to host the pre-processing code"],
  a: [0],
  e: "**AWS Wavelength** embeds AWS compute inside 5G networks, reducing latency for mobile edge workloads.",
  w: [
    "Wavelength embeds AWS compute inside 5G networks, reducing latency for mobile edge workloads.",
    "Direct Connect provides a private network link, not edge compute near users.",
    "Glacier is archival storage.",
    "Snowball Edge is data transfer and edge hardware, not a 5G edge service."]
},

{
  id: "d2-047", d: 2, t: "2.3", s: "2.3.4", type: "single",
  sc: "A multinational must keep EU customers' data processing within the EU and US customers' within the US. The same application serves both.",
  q: "Which design is MOST appropriate?",
  o: [
    "Deploy regional stacks, route users with Route 53 geolocation routing, and use Region-appropriate (geography-scoped) inference profiles and data stores",
    "Run one global stack in a single Region for all users and rely on contracts to cover data residency",
    "Use a global inference profile for all traffic so that every user is served from the nearest available Region",
    "Disable logging to avoid moving any data between Regions, and process everything in the Region with spare capacity"],
  a: [0],
  e: "**Regional deployments with geo-routing** and **geography-scoped inference profiles** keep processing within jurisdictions.",
  w: [
    "Keeps each user population within its jurisdiction.",
    "Moves EU data outside the EU.",
    "Global profiles may process in any Region.",
    "Disabling logging weakens compliance evidence and does not control where processing occurs."]
},

{
  id: "d2-048", d: 2, t: "2.3", s: "2.3.5", type: "single",
  sc: "A team ships prompt, guardrail and agent configuration changes through a Git repository. They want every change automatically tested for regression and security issues, and rolled back if the deployment fails.",
  q: "Which approach is MOST appropriate?",
  o: [
    "CodePipeline orchestrating CodeBuild stages that run evaluation tests and security scans, then deploying with rollback support",
    "Manually copy the changes to production in the console after a developer has tested them on a local machine",
    "Deploy directly from developer laptops using personal credentials, with a chat message to announce the change",
    "Run the tests only in production after release and revert manually if any user reports a problem"],
  a: [0],
  e: "A **CI/CD pipeline** (CodePipeline + CodeBuild + deployment with rollback) automates **testing, scanning and safe releases** for GenAI components.",
  w: [
    "Automated quality gates, security scans and rollback for GenAI components.",
    "Manual copying is error-prone and unauditable.",
    "Laptop deployments lack controls and audit trails.",
    "Production-only testing exposes users to regressions."]
},

{
  id: "d2-049", d: 2, t: "2.3", s: "2.3.5", type: "single",
  sc: "Twenty product teams call Amazon Bedrock directly with their own keys and settings. The company wants centralised authentication, per-team quotas, mandatory guardrails, request logging, and the ability to change models without teams modifying code.",
  q: "Which architecture addresses these requirements?",
  o: [
    "A centralized GenAI gateway that all applications call, enforcing authentication, quotas, guardrails, logging and model routing",
    "Let each team continue calling Bedrock directly and publish a document describing the preferred settings, guardrails and logging for all teams",
    "Ask each team to record its model usage in a shared spreadsheet that the platform team reviews at the end of every month",
    "Create one IAM user with Bedrock access and share its credentials with all twenty teams so that usage is centrally controlled"],
  a: [0],
  e: "A **GenAI gateway** is a single abstraction layer providing consistent security, quotas, guardrails, observability and routing.",
  w: [
    "One control point for cross-cutting concerns, with model changes hidden from callers.",
    "Direct calls leave policy up to each team.",
    "Spreadsheet logging is not observability or enforcement.",
    "A shared user removes attribution and quota separation."]
},

{
  id: "d2-050", d: 2, t: "2.3", s: "2.3.5", type: "multiple",
  sc: "A company is designing the central GenAI gateway for all its internal applications.",
  q: "Which TWO capabilities should the gateway provide?",
  o: [
    "Per-team usage plans or quotas with request throttling and cost attribution tags",
    "Central request/response logging and tracing with consistent guardrail enforcement",
    "Direct exposure of foundation model credentials to client applications so that they can call models faster",
    "A requirement that each team implement its own security controls and logging inside its application",
    "Removal of authentication on internal calls to keep the gateway simple and fast for all callers"],
  a: [0,1],
  e: "A gateway centralises **quota/cost control** and **observability and safety enforcement**. Pushing credentials to clients or authentication removal defeats its purpose.",
  w: [
    "Quotas and cost attribution per team.",
    "Uniform logging, tracing and guardrails.",
    "Exposing credentials is insecure and defeats the gateway.",
    "Decentralized controls recreate the inconsistency.",
    "Authentication is mandatory for a shared gateway."]
},

{
  id: "d2-051", d: 2, t: "2.3", s: "2.3.1", type: "single",
  sc: "Product data in an Amazon DynamoDB table changes frequently, and the vector index backing a product assistant must reflect changes within seconds.",
  q: "Which synchronisation pattern is MOST appropriate?",
  o: [
    "DynamoDB Streams triggering AWS Lambda to re-embed changed items and upsert them into the vector store",
    "A full re-index of the product table once a week, scheduled during a low-traffic period",
    "Manual updates by the support team whenever they notice that a product description has changed",
    "Replace the vector store with CloudTrail logs and query the change history during each request"],
  a: [0],
  e: "**Change data capture** with **DynamoDB Streams** and Lambda provides near-real-time incremental synchronisation to the vector store.",
  w: [
    "Incremental, event-driven change data capture with near-real-time updates.",
    "A weekly rebuild leaves long staleness windows.",
    "Manual processes do not scale.",
    "CloudTrail is an audit log, not a product data source."]
},

{
  id: "d2-052", d: 2, t: "2.3", s: "2.3.2", type: "single",
  sc: "A document service emits events at unpredictable bursts. A Lambda function that calls Bedrock for each event is being throttled and some events are lost on failures.",
  q: "Which change improves reliability MOST?",
  o: [
    "Place an SQS queue between the event source and Lambda, with a dead-letter queue and a limited maximum concurrency on the event source mapping",
    "Increase the Lambda memory to the maximum so that each invocation runs faster and fewer simultaneous calls are needed",
    "Remove retries from the function so that throttled events fail quickly instead of waiting in the queue",
    "Send the events to the model directly inside the prompt so that the function does not need to call Bedrock"],
  a: [0],
  e: "A **queue buffer** with controlled concurrency respects Bedrock quotas, retries failures and preserves failed messages in a **DLQ**.",
  w: [
    "A queue buffer with controlled concurrency respects Bedrock quotas, retries failures and preserves failed messages in a DLQ.",
    "More memory does not change Bedrock throttling or message loss.",
    "Without retries, failures are lost.",
    "Events cannot be sent through prompts to bypass the API."]
},

{
  id: "d2-053", d: 2, t: "2.3", s: "2.3.3", type: "single",
  sc: "Several application accounts need to call foundation models that are enabled and governed in one central AI platform account, using short-lived credentials and an audit trail.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Cross-account IAM roles that application accounts assume through STS, limited to approved models, with calls recorded in CloudTrail",
    "Copy long-term IAM access keys for the platform account into every application account and rotate them yearly",
    "Make the central account's model access public and rely on application-level checks to restrict callers",
    "Use the root user of the platform account from every application account for simplicity of administration"],
  a: [0],
  e: "**Cross-account role assumption** gives temporary credentials with least privilege, and CloudTrail records who assumed and invoked what.",
  w: [
    "Short-lived, scoped and auditable access.",
    "Long-term keys increase exposure and have no per-call auditing of assumption.",
    "Public resources eliminate access control.",
    "Root use is a major security anti-pattern."]
},

{
  id: "d2-054", d: 2, t: "2.3", s: "2.3.4", type: "single",
  sc: "A manufacturing plant needs AWS services running locally for single-digit-millisecond access to on-premises machines, while still integrating with the AWS Region for model access and storage.",
  q: "Which AWS offering provides AWS infrastructure and services on premises?",
  o: [
    "AWS Outposts",
    "Amazon CloudFront with an origin in the plant, so that requests are served from edge locations near the machines",
    "AWS Global Accelerator, which places AWS compute in the plant for the lowest possible latency",
    "Amazon Route 53 Resolver, which runs AWS services on premises for local name resolution and processing"],
  a: [0],
  e: "**AWS Outposts** extends AWS infrastructure and services to on-premises sites for low-latency local processing with Regional integration.",
  w: [
    "Outposts delivers AWS infrastructure and services on premises with Regional integration.",
    "CloudFront is a CDN and does not run AWS services on premises.",
    "Global Accelerator improves network routing and does not place compute on premises.",
    "Route 53 Resolver handles DNS, not on-premises compute."]
}
);
