/* Domain 2 questions: Task 2.2 (model deployment) and Task 2.3 (enterprise integration). */
(window.QBANK = window.QBANK || []).push(
{
  id: "d2-027", d: 2, t: "2.2", s: "2.2.1", type: "single",
  sc: "A customer-facing assistant has steady, high traffic around the clock and a contractual latency SLA. On-demand inference occasionally returns throttling errors at peak, which breaches the SLA.",
  q: "Which Amazon Bedrock option BEST meets the requirement?",
  o: [
    "Purchase Provisioned Throughput for the model to reserve guaranteed capacity",
    "Use batch inference for all requests",
    "Add a Lambda function that sleeps before each call",
    "Switch to a smaller context window"],
  a: [0],
  e: "**Provisioned Throughput** reserves model units for consistent throughput and latency, suited to steady, high, SLA-bound workloads.",
  w: [
    "Guaranteed capacity addresses throttling at peak.",
    "Batch inference is asynchronous and cannot meet interactive latency.",
    "Sleeping increases latency and does not add capacity.",
    "Context window size does not provide capacity."]
},

{
  id: "d2-028", d: 2, t: "2.2", s: "2.2.1", type: "single",
  sc: "A publisher wants to generate summaries for 3 million archived articles over the weekend. There is no interactive latency requirement and cost matters.",
  q: "Which approach is MOST cost-effective?",
  o: [
    "Amazon Bedrock batch inference with input and output in Amazon S3",
    "On-demand synchronous calls from a Lambda function at maximum concurrency",
    "Provisioned Throughput purchased for a one-year term",
    "A real-time SageMaker AI endpoint on the largest GPU instance"],
  a: [0],
  e: "**Batch inference** processes large JSONL jobs asynchronously at a lower price than on-demand for non-interactive work.",
  w: [
    "Designed for large offline workloads with a discount.",
    "Synchronous calls at scale invite throttling and cost more.",
    "A one-year commitment for a weekend job wastes money.",
    "An always-on large endpoint is expensive for a one-time job."]
},

{
  id: "d2-029", d: 2, t: "2.2", s: "2.2.1", type: "single",
  sc: "A company must run an open-weight model with a custom inference script (for specialized token post-processing), inside a VPC with no internet access, using specific GPU instance types.",
  q: "Which deployment is MOST appropriate?",
  o: [
    "An Amazon SageMaker AI real-time endpoint using a large model inference container with the custom inference code, deployed in the VPC",
    "Amazon Bedrock on-demand with the Converse API",
    "AWS Lambda with the model weights in the deployment package",
    "Amazon API Gateway mock integration"],
  a: [0],
  e: "Custom inference code, instance choice and network isolation point to **SageMaker AI endpoints** with an LMI container in your VPC.",
  w: [
    "Full control over container, code, instances and networking.",
    "Bedrock does not allow custom serving code for arbitrary open-weight models.",
    "Lambda cannot host large model weights and GPUs.",
    "A mock integration returns canned responses."]
},

{
  id: "d2-030", d: 2, t: "2.2", s: "2.2.1", type: "single",
  sc: "A document-intelligence workload sends payloads up to 500 MB to a hosted model. Requests can take several minutes, results are not needed instantly, and traffic is sporadic with long idle periods.",
  q: "Which SageMaker AI inference option fits BEST?",
  o: [
    "Asynchronous inference, which queues requests, supports large payloads and can scale to zero when idle",
    "Real-time inference on a single always-on instance",
    "Serverless inference for GPU workloads with large payloads",
    "Batch transform triggered manually for every request"],
  a: [0],
  e: "**Asynchronous inference** handles large payloads and long processing times, queues requests and can scale to zero.",
  w: [
    "Matches payload size, duration and idle periods.",
    "Real-time endpoints have payload and timeout limits and bill while idle.",
    "Serverless inference has size and duration limits unsuited to this.",
    "Manual batch transform adds operational burden and latency."]
},

{
  id: "d2-031", d: 2, t: "2.2", s: "2.2.2", type: "single",
  sc: "A team wants to host a 70-billion-parameter model in 16-bit precision. A single GPU does not have enough memory to hold the weights, plus extra memory is needed for the key-value cache at the target concurrency.",
  q: "Which approach resolves the memory constraint?",
  o: [
    "Shard the model across multiple GPUs with tensor parallelism, or quantize the weights to a lower precision to reduce the footprint",
    "Increase the Lambda memory setting",
    "Lower the temperature",
    "Switch to a model with a longer context window"],
  a: [0],
  e: "LLM weights plus the **KV cache** must fit in GPU memory. Use **tensor parallelism** across GPUs or **quantization** (and size instances accordingly).",
  w: [
    "Directly addresses weights and KV-cache memory.",
    "Lambda memory is unrelated to GPU memory.",
    "Temperature does not affect memory.",
    "Longer contexts require more KV-cache memory."]
},

{
  id: "d2-032", d: 2, t: "2.2", s: "2.2.2", type: "single",
  sc: "An LLM endpoint handles many concurrent requests of varying length. GPU utilization is low because requests are processed one at a time and short requests wait behind long ones.",
  q: "Which serving feature improves throughput MOST?",
  o: [
    "Continuous batching in an optimized serving framework (for example vLLM or TensorRT-LLM in a large model inference container)",
    "Reducing the number of GPU instances to one",
    "Disabling streaming",
    "Using a higher temperature"],
  a: [0],
  e: "**Continuous (in-flight) batching** schedules tokens from multiple requests together, keeping the GPU busy and improving token throughput.",
  w: [
    "Raises GPU utilization and throughput for concurrent requests.",
    "Fewer instances reduces capacity.",
    "Streaming affects delivery, not GPU scheduling.",
    "Temperature is a sampling setting."]
},

{
  id: "d2-033", d: 2, t: "2.2", s: "2.2.3", type: "single",
  sc: "A support application sends all queries to a large, expensive model. Analysis shows 70% of queries are simple and a smaller model answers them correctly. The remaining 30% need stronger reasoning.",
  q: "Which pattern reduces cost MOST while maintaining quality?",
  o: [
    "Model cascading: try a smaller model first and escalate to the larger model when the task is complex or confidence is low",
    "Always use the largest model for safety",
    "Always use the smallest model",
    "Reduce the number of users"],
  a: [0],
  e: "**Cascading** (or routing) sends routine queries to a cheap model and reserves the expensive model for hard cases.",
  w: [
    "Captures savings on the simple majority while protecting hard cases.",
    "Overpays on 70% of traffic.",
    "Fails on the 30% that need reasoning.",
    "Not a technical solution."]
},

{
  id: "d2-034", d: 2, t: "2.2", s: "2.2.3", type: "single",
  sc: "A company needs to classify support tickets into 12 categories at very high volume. A fine-tuned small pre-trained model matches the accuracy of a much larger model on a golden test set.",
  q: "What should the developer do?",
  o: [
    "Deploy the smaller model for this task to reduce cost and latency",
    "Deploy the larger model because it is more capable in general",
    "Combine both models for every request",
    "Delay launch until a larger model is released"],
  a: [0],
  e: "If a smaller model **meets the evaluated quality bar**, it wins on cost and latency. Capability beyond the task requirement is wasted spend.",
  w: [
    "Evidence shows equal accuracy at lower cost.",
    "General capability is irrelevant when the task is narrow and measured.",
    "Running both doubles cost without benefit.",
    "Unnecessary delay."]
},

{
  id: "d2-035", d: 2, t: "2.2", s: "2.2.1", type: "single",
  sc: "A company's general assistant uses Amazon Bedrock foundation models, but one feature requires a domain-specific model the team fine-tuned and hosts itself. They want a single application to use both, with the choice made per request.",
  q: "Which architecture is MOST appropriate?",
  o: [
    "A hybrid design: Bedrock for general tasks and a SageMaker AI endpoint for the specialised model, selected by a routing layer in the application",
    "Move everything to a single SageMaker endpoint and abandon Bedrock",
    "Fine-tune the model again inside Lambda",
    "Use two separate applications and ask users to pick"],
  a: [0],
  e: "**Hybrid deployments** combine managed Bedrock models with self-hosted specialised models, with routing logic choosing per request.",
  w: [
    "Uses each platform where it is strongest.",
    "Gives up managed models without need.",
    "Lambda cannot perform model fine-tuning.",
    "Poor user experience."]
},

{
  id: "d2-036", d: 2, t: "2.2", s: "2.2.2", type: "single",
  sc: "A platform team standardised on Kubernetes and wants to run its own inference containers with GPU nodes, scaling replicas with demand.",
  q: "Which scaling signal is MOST appropriate for LLM serving?",
  o: [
    "Concurrent requests, queue depth or GPU utilization per replica, rather than CPU alone",
    "CPU utilization only",
    "Number of S3 objects",
    "The time of day only"],
  a: [0],
  e: "LLM serving is **GPU- and token-bound**. Scale on **concurrency, queue depth or GPU utilization**; CPU often stays low while the GPU saturates.",
  w: [
    "Reflects real saturation of GPU-based inference.",
    "CPU may remain low while GPUs are saturated.",
    "Object counts do not measure inference load.",
    "A fixed schedule cannot follow real traffic."]
},

{
  id: "d2-037", d: 2, t: "2.2", s: "2.2.1", type: "single",
  sc: "A startup has a daily spike of requests at 9 AM and almost no traffic otherwise. It wants predictable low latency during the spike, but not to pay for idle capacity all day.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Use on-demand Bedrock with retries and cross-Region inference for the spike, and consider time-bound Provisioned Throughput only if spike throttling persists",
    "Buy a six-month Provisioned Throughput commitment immediately",
    "Run GPU instances 24/7",
    "Disable retries so errors surface quickly"],
  a: [0],
  e: "Match the purchase model to the traffic shape. Short predictable spikes rarely justify long commitments; start with on-demand plus resilience measures and measure.",
  w: [
    "Starts cheap and escalates only with evidence.",
    "A long commitment pays for idle hours.",
    "Round-the-clock GPUs are expensive.",
    "Disabling retries worsens errors during spikes."]
},

{
  id: "d2-038", d: 2, t: "2.2", s: "2.2.2", type: "multiple",
  sc: "A traditional ML engineer is moving from small classification models to large language model hosting.",
  q: "Which TWO factors are distinctive for deploying LLMs?",
  o: [
    "GPU memory must hold the model weights and a KV cache that grows with context length and concurrency",
    "Capacity is better planned in tokens per minute than only in requests per second",
    "Models never need to be monitored",
    "Latency is unaffected by output length",
    "Quantization is impossible"],
  a: [0,1],
  e: "LLM serving is dominated by **memory** (weights plus KV cache) and **token throughput**, and latency grows with output length.",
  w: [
    "KV-cache growth is a defining LLM constraint.",
    "Token-based throughput is the right planning unit.",
    "Monitoring remains essential.",
    "Generating more tokens takes longer.",
    "Quantization is a common optimisation."]
},

{
  id: "d2-039", d: 2, t: "2.3", s: "2.3.1", type: "single",
  sc: "A manufacturer wants an AI assistant to query a legacy inventory system that only exposes a SOAP interface and cannot be modified. Security requires that the assistant never connects to the system directly.",
  q: "Which design is MOST appropriate?",
  o: [
    "Wrap the legacy interface behind an API layer (API Gateway with Lambda that translates calls), and expose it to the agent as a tool",
    "Give the foundation model the system's network credentials",
    "Rewrite the legacy application before starting",
    "Export the inventory to a spreadsheet by hand every day"],
  a: [0],
  e: "An **API facade** (API Gateway + Lambda) isolates the legacy system, enforces authentication and validation, and lets the AI call it as a tool without modifying it.",
  w: [
    "Decouples the AI from the legacy interface and enforces control.",
    "Direct credentials violate the security rule.",
    "Unneeded delay and cost.",
    "Manual exports are stale and unscalable."]
},

{
  id: "d2-040", d: 2, t: "2.3", s: "2.3.1", type: "single",
  sc: "When a support ticket is created in an existing ticketing system, a GenAI summary should be generated and attached to the ticket. The ticketing team does not want its system to depend on the AI service being available.",
  q: "Which integration pattern is BEST?",
  o: [
    "Event-driven: publish a ticket-created event to Amazon EventBridge, trigger a summarisation workflow, and write the result back asynchronously",
    "Have the ticketing system call the model synchronously and block ticket creation until it returns",
    "Poll the ticket database every second from an EC2 instance",
    "Require agents to copy ticket text into a chat window"],
  a: [0],
  e: "**Event-driven loose coupling** means ticket creation never waits on or fails because of the AI service; processing happens asynchronously.",
  w: [
    "Decouples availability and scales independently.",
    "Synchronous blocking couples ticketing availability to the AI service.",
    "Tight polling is wasteful and operationally heavy.",
    "Manual copying defeats automation."]
},

{
  id: "d2-041", d: 2, t: "2.3", s: "2.3.2", type: "single",
  sc: "A SaaS CRM sends HTTPS webhook callbacks when a lead is updated. The company wants to enrich each lead with an AI-generated summary and handle duplicate webhook deliveries safely.",
  q: "Which design is MOST appropriate?",
  o: [
    "API Gateway endpoint triggering a Lambda webhook handler that verifies the signature, deduplicates by event ID (for example with DynamoDB conditional writes), and calls Amazon Bedrock",
    "Allow the CRM to write directly into the model's prompt",
    "Run a fleet of EC2 instances polling the CRM",
    "Send webhooks by email"],
  a: [0],
  e: "Webhook handlers belong in a thin, authenticated, **idempotent** layer: API Gateway plus Lambda with deduplication, then the model call.",
  w: [
    "Authenticated and idempotent handling of inbound events.",
    "Models do not accept webhooks.",
    "Polling is heavier and slower than push.",
    "Email is not an integration protocol here."]
},

{
  id: "d2-042", d: 2, t: "2.3", s: "2.3.3", type: "single",
  sc: "Employees sign in through the company's corporate identity provider. The GenAI application must grant access based on department roles, and no separate user database should be created.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Federate the corporate identity provider with AWS (IAM Identity Center or Amazon Cognito using SAML/OIDC) and map identity-provider groups to application roles",
    "Create a shared username and password for each department",
    "Store employee passwords in DynamoDB",
    "Allow anonymous access and filter by IP address"],
  a: [0],
  e: "**Identity federation** reuses corporate identities and groups for role-based access, avoiding duplicate credential stores.",
  w: [
    "Single source of identity with role mapping.",
    "Shared credentials destroy accountability.",
    "Custom password storage is risky and redundant.",
    "IP filtering is not user-level authorization."]
},

{
  id: "d2-043", d: 2, t: "2.3", s: "2.3.3", type: "multiple",
  sc: "A security team wants least-privilege access to foundation models for several applications on Amazon Bedrock.",
  q: "Which TWO measures apply?",
  o: [
    "Scope IAM permissions for bedrock:InvokeModel to the specific model or inference profile ARNs each application needs",
    "Use IAM condition keys (for example requiring a specific guardrail) to enforce safety settings on invocations",
    "Grant bedrock:* on all resources to simplify deployment",
    "Share one access key between all applications",
    "Allow invocation from any IAM principal in the account"],
  a: [0,1],
  e: "**Resource-level permissions** and **condition keys** enforce least privilege and mandatory guardrails. Wildcards and shared keys defeat accountability.",
  w: [
    "Limits which models can be invoked.",
    "Conditions can require guardrails on invocations.",
    "Wildcards grant excessive access.",
    "Shared keys prevent attribution and rotation hygiene.",
    "Account-wide access violates least privilege."]
},

{
  id: "d2-044", d: 2, t: "2.3", s: "2.3.3", type: "single",
  sc: "A RAG chatbot over HR documents must ensure each employee only sees content they are authorised to read. Authorization data comes from the identity provider (department, region, clearance).",
  q: "Which design BEST enforces this?",
  o: [
    "Pass the authenticated user's attributes to the retrieval layer and apply metadata filters (or per-group indexes) so unauthorised chunks are never retrieved",
    "Tell the model not to reveal documents the user should not see",
    "Retrieve all documents and let the model decide what to show",
    "Use a single shared service account and trust the UI"],
  a: [0],
  e: "**Enforce authorization at retrieval**, so restricted chunks never reach the prompt. The model cannot be trusted to withhold information it has already been given.",
  w: [
    "Server-side filtering before generation.",
    "Prompt instructions can be bypassed.",
    "Unauthorized content is already exposed to the model.",
    "UI-only controls can be bypassed."],
  trap: "Never rely on the model to enforce access control."
},

{
  id: "d2-045", d: 2, t: "2.3", s: "2.3.4", type: "single",
  sc: "A hospital must keep raw patient records on premises. It wants to use foundation models in AWS for summarisation using only de-identified text, with private connectivity and no public internet path.",
  q: "Which architecture is MOST appropriate?",
  o: [
    "De-identify data on premises, connect to AWS over AWS Direct Connect or Site-to-Site VPN into a VPC, and call Amazon Bedrock through an interface VPC endpoint (AWS PrivateLink)",
    "Upload raw records to a public S3 bucket and call Bedrock over the internet",
    "Email de-identified text to the model",
    "Disable encryption to reduce latency"],
  a: [0],
  e: "Keep sensitive data local, **de-identify before leaving**, and use **private connectivity** (Direct Connect/VPN + PrivateLink VPC endpoint) to reach AWS services.",
  w: [
    "Combines data minimisation with private routing.",
    "Public exposure violates the requirement.",
    "Email is not a secure integration path.",
    "Encryption must remain enabled."]
},

{
  id: "d2-046", d: 2, t: "2.3", s: "2.3.4", type: "single",
  sc: "A mobile augmented-reality application needs ultra-low-latency pre-processing close to 5G users before calling a foundation model for descriptions.",
  q: "Which AWS service helps place compute closest to the mobile users?",
  o: [
    "AWS Wavelength",
    "AWS Direct Connect",
    "Amazon S3 Glacier",
    "AWS Snowball"],
  a: [0],
  e: "**AWS Wavelength** embeds AWS compute inside 5G networks, reducing latency for mobile edge workloads.",
  w: [
    "Edge compute within 5G networks.",
    "Direct Connect provides private network links, not edge compute.",
    "Glacier is archival storage.",
    "Snowball is data transfer hardware."]
},

{
  id: "d2-047", d: 2, t: "2.3", s: "2.3.4", type: "single",
  sc: "A multinational must keep EU customers' data processing within the EU and US customers' within the US. The same application serves both.",
  q: "Which design is MOST appropriate?",
  o: [
    "Deploy regional stacks, route users with Amazon Route 53 geolocation routing, and use Region-appropriate (geography-scoped) inference profiles and data stores",
    "One global stack in a single Region for all users",
    "A global inference profile for all traffic",
    "Disable logging to avoid data movement"],
  a: [0],
  e: "**Regional deployments with geo-routing** and **geography-scoped inference profiles** keep processing within jurisdictions.",
  w: [
    "Keeps each user population within its jurisdiction.",
    "Moves EU data outside the EU.",
    "Global profiles may process in any Region.",
    "Disabling logging weakens compliance evidence."]
},

{
  id: "d2-048", d: 2, t: "2.3", s: "2.3.5", type: "single",
  sc: "A team ships prompt, guardrail and agent configuration changes through a Git repository. They want every change automatically tested for regression and security issues, and rolled back if the deployment fails.",
  q: "Which approach is MOST appropriate?",
  o: [
    "AWS CodePipeline orchestrating AWS CodeBuild stages that run evaluation tests and security scans, then deploying with rollback support (for example CodeDeploy or CloudFormation)",
    "Manually copy changes to production in the console",
    "Deploy directly from developer laptops",
    "Run tests only in production after release"],
  a: [0],
  e: "A **CI/CD pipeline** (CodePipeline + CodeBuild + deployment with rollback) automates **testing, scanning and safe releases** for GenAI components.",
  w: [
    "Automated quality gates and rollback.",
    "Manual copying is error-prone and unauditable.",
    "Laptop deployments lack controls.",
    "Production-only testing exposes users to regressions."]
},

{
  id: "d2-049", d: 2, t: "2.3", s: "2.3.5", type: "single",
  sc: "Twenty product teams call Amazon Bedrock directly with their own keys and settings. The company wants centralised authentication, per-team quotas, mandatory guardrails, request logging, and the ability to change models without teams modifying code.",
  q: "Which architecture addresses these requirements?",
  o: [
    "A centralised GenAI gateway (for example API Gateway with Lambda or a container service) that all applications call, enforcing authentication, quotas, guardrails, logging and model routing",
    "Let each team continue calling Bedrock directly",
    "Ask each team to log to a spreadsheet",
    "Create one IAM user shared by all teams"],
  a: [0],
  e: "A **GenAI gateway** is a single abstraction layer providing consistent security, quotas, guardrails, observability and routing.",
  w: [
    "One control point for cross-cutting concerns.",
    "Direct calls leave policy up to each team.",
    "Spreadsheet logging is not observability.",
    "A shared user removes attribution and quota separation."]
},

{
  id: "d2-050", d: 2, t: "2.3", s: "2.3.5", type: "multiple",
  sc: "A company is designing the central GenAI gateway for all its internal applications.",
  q: "Which TWO capabilities should the gateway provide?",
  o: [
    "Per-team usage plans or quotas with request throttling and cost attribution tags",
    "Central request/response logging and tracing with consistent guardrail enforcement",
    "Direct exposure of foundation model credentials to client applications",
    "A requirement that each team implement its own security controls",
    "Removal of all authentication for convenience"],
  a: [0,1],
  e: "A gateway centralises **quota/cost control** and **observability and safety enforcement**. Pushing credentials to clients or authentication removal defeats its purpose.",
  w: [
    "Quotas and cost attribution per team.",
    "Uniform logging and guardrails.",
    "Exposing credentials is insecure.",
    "Decentralised controls recreate the inconsistency.",
    "Authentication is mandatory."]
},

{
  id: "d2-051", d: 2, t: "2.3", s: "2.3.1", type: "single",
  sc: "Product data in an Amazon DynamoDB table changes frequently, and the vector index backing a product assistant must reflect changes within seconds.",
  q: "Which synchronisation pattern is MOST appropriate?",
  o: [
    "DynamoDB Streams triggering AWS Lambda to re-embed changed items and upsert them into the vector store",
    "A weekly full re-index",
    "Manual updates by the support team",
    "Replace the vector store with CloudTrail logs"],
  a: [0],
  e: "**Change data capture** with **DynamoDB Streams** and Lambda provides near-real-time incremental synchronisation to the vector store.",
  w: [
    "Incremental, event-driven and fast.",
    "A weekly rebuild leaves long staleness windows.",
    "Manual processes do not scale.",
    "CloudTrail is an audit log, not a data source."]
},

{
  id: "d2-052", d: 2, t: "2.3", s: "2.3.2", type: "single",
  sc: "A document service emits events at unpredictable bursts. A Lambda function that calls Bedrock for each event is being throttled and some events are lost on failures.",
  q: "Which change improves reliability MOST?",
  o: [
    "Place an Amazon SQS queue between the event source and Lambda, with a dead-letter queue and a limited maximum concurrency on the event source mapping",
    "Increase the Lambda memory to the maximum",
    "Remove retries",
    "Send events to the model directly in the prompt"],
  a: [0],
  e: "A **queue buffer** with controlled concurrency respects Bedrock quotas, retries failures and preserves failed messages in a **DLQ**.",
  w: [
    "Buffering, concurrency control and DLQ prevent loss and throttling cascades.",
    "More memory does not change Bedrock throttling or loss.",
    "Without retries failures are lost.",
    "Events cannot be sent through prompts."]
},

{
  id: "d2-053", d: 2, t: "2.3", s: "2.3.3", type: "single",
  sc: "Several application accounts need to call foundation models that are enabled and governed in one central AI platform account, using short-lived credentials and an audit trail.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Cross-account IAM roles that application accounts assume (via AWS STS) with permissions limited to approved models, with calls recorded in AWS CloudTrail",
    "Copy long-term access keys to every account",
    "Make the central account's resources public",
    "Use the root user in every account"],
  a: [0],
  e: "**Cross-account role assumption** gives temporary credentials with least privilege, and CloudTrail records who assumed and invoked what.",
  w: [
    "Short-lived, scoped and auditable.",
    "Long-term keys increase exposure.",
    "Public resources eliminate access control.",
    "Root use is a major security anti-pattern."]
},

{
  id: "d2-054", d: 2, t: "2.3", s: "2.3.4", type: "single",
  sc: "A manufacturing plant needs AWS services running locally for single-digit-millisecond access to on-premises machines, while still integrating with the AWS Region for model access and storage.",
  q: "Which AWS offering provides AWS infrastructure and services on premises?",
  o: [
    "AWS Outposts",
    "Amazon CloudFront",
    "AWS Global Accelerator",
    "Amazon Route 53"],
  a: [0],
  e: "**AWS Outposts** extends AWS infrastructure and services to on-premises sites for low-latency local processing with Regional integration.",
  w: [
    "Delivers AWS infrastructure on premises.",
    "CloudFront is a CDN.",
    "Global Accelerator improves global network routing.",
    "Route 53 is DNS."]
}
);
