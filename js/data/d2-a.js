/* Domain 2 questions: Task 2.1 (agentic AI and tool integrations). Plausible distractors by design. */
(window.QBANK = window.QBANK || []).push(
{
  id: "d2-001", d: 2, t: "2.1", s: "2.1.1", type: "single",
  sc: "A team wants an agent that books travel by calling three internal REST APIs and searching a policy knowledge base. They want a fully managed service where behavior is configured with instructions and an OpenAPI schema, with minimal framework code, built-in tracing and guardrail support.",
  q: "Which option BEST fits?",
  o: [
    "Amazon Bedrock Agents with an action group defined by the OpenAPI schema and a Knowledge Base attached to the agent",
    "A custom agent loop built with the Strands Agents SDK, packaged as a container and run on Amazon EC2 instances that the team patches",
    "AWS Step Functions with a hand-built reason-act loop in Lambda that calls the model, the three APIs and the knowledge base directly",
    "Amazon Q Developer configured with the three API schemas so that it serves as the runtime agent for travel booking requests"],
  a: [0],
  e: "**Bedrock Agents** is the managed, configuration-driven option: instructions, action groups (OpenAPI schema backed by Lambda), Knowledge Bases, guardrails and trace are built in.",
  w: [
    "Matches every stated requirement with the least code: managed, config-driven, with tracing and guardrail support.",
    "Strands is a code framework, and EC2 hosting adds operations burden that contradicts \"fully managed\".",
    "A hand-built loop is more engineering work than a managed agent for this standard pattern.",
    "Q Developer is a coding assistant, not an application agent runtime."]
},

{
  id: "d2-002", d: 2, t: "2.1", s: "2.1.1", type: "single",
  sc: "A team has built a custom agent with the Strands Agents SDK. They need to run it in production with isolated sessions per user, automatic scaling, and managed observability, without operating servers.",
  q: "Which AWS service should they use to host the agent?",
  o: [
    "Amazon Bedrock AgentCore Runtime",
    "Amazon Bedrock Prompt Flows, importing the Strands agent as a prompt node inside a visual flow",
    "Amazon SageMaker Ground Truth, which hosts custom code and manages scaling for interactive sessions",
    "AWS Glue interactive sessions, which scale automatically and isolate users in separate job runs"],
  a: [0],
  e: "**AgentCore Runtime** is a serverless, session-isolated runtime for agents built with any framework (including Strands) and any model.",
  w: [
    "A serverless, session-isolated runtime for agents built with any framework, including Strands.",
    "Prompt Flows is a visual prompt-chaining builder, not a hosting runtime for custom framework code.",
    "Ground Truth is a data-labeling service.",
    "Glue is an ETL service and is not an agent hosting runtime."]
},

{
  id: "d2-003", d: 2, t: "2.1", s: "2.1.1", type: "single",
  sc: "An agent serves customers across many conversations. The company wants it to remember stable facts and preferences (for example, preferred language and past product choices) across separate sessions, and to retrieve only the relevant memories.",
  q: "Which capability addresses this MOST directly?",
  o: [
    "Increase the context window and replay every past conversation in each request so the model can find the relevant facts itself",
    "Use Amazon Bedrock AgentCore Memory long-term memory strategies that extract and store preferences and facts for retrieval in later sessions",
    "Store every conversation in a CloudWatch Logs group and search it with Logs Insights during each customer request",
    "Set the temperature to zero so that the model reproduces its earlier answers consistently across separate sessions"],
  a: [1],
  e: "**AgentCore Memory** keeps short-term session events and extracts **long-term memories** (facts, preferences, summaries) that can be retrieved selectively in later sessions.",
  w: [
    "Replaying everything is costly, hits context limits and adds noise.",
    "Purpose-built memory with extraction and selective retrieval across sessions.",
    "Logs Insights is not designed as low-latency agent memory and cannot extract facts.",
    "Temperature has no relation to remembering facts between sessions."]
},

{
  id: "d2-004", d: 2, t: "2.1", s: "2.1.1", type: "single",
  sc: "A company has dozens of existing internal REST APIs described by OpenAPI specs and several Lambda functions. It wants agents built with different frameworks to discover and call them as tools through one managed, authenticated interface.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Amazon Bedrock AgentCore Gateway, which exposes APIs and Lambda functions as MCP-compatible tools with managed authentication",
    "Give each agent direct AWS credentials with broad permissions so that it can call every API and Lambda function itself",
    "Rewrite every internal API as an Amazon Bedrock Prompt Flow so that agents can call them as flow nodes",
    "Embed each API specification in every agent prompt and let the model construct raw HTTP calls on its own"],
  a: [0],
  e: "**AgentCore Gateway** converts existing APIs, OpenAPI specs and Lambda functions into **MCP tools**, handling discovery and authentication so any compatible agent can use them.",
  w: [
    "Central, standardized and authenticated tool access for any framework.",
    "Broad credentials violate least privilege and give no standard tool interface.",
    "Prompt Flows is not an API gateway for agent tools, and rewriting every API is unnecessary.",
    "Embedding specs in prompts does not provide authenticated execution and wastes tokens."]
},

{
  id: "d2-005", d: 2, t: "2.1", s: "2.1.1", type: "single",
  sc: "A help-desk platform has separate specialist agents for billing, technical support and account security. Each incoming message must be classified and sent to the right specialist, with conversation context preserved when the user switches topics.",
  q: "Which solution is MOST appropriate for AWS-native orchestration?",
  o: [
    "AWS Agent Squad, using its classifier to route each message to the best specialist agent and maintain per-agent conversation history",
    "One large prompt containing the instructions for billing, technical support and account security handled by a single agent",
    "Amazon Rekognition Custom Labels trained to classify each message and invoke the matching specialist",
    "An EventBridge rule that forwards every message to all three agents and returns the first response received"],
  a: [0],
  e: "**Agent Squad** is an open-source multi-agent orchestrator: a **classifier** picks the best agent for each request and manages context across agents.",
  w: [
    "Purpose-built intent routing across specialist agents with context preserved.",
    "One mega-prompt degrades accuracy and cannot use separate tools per specialty.",
    "Rekognition analyzes images and video, not support messages.",
    "Broadcasting wastes cost and can return conflicting or wrong-specialty answers."]
},

{
  id: "d2-006", d: 2, t: "2.1", s: "2.1.1", type: "single",
  sc: "A company is building a research assistant where a coordinating agent delegates sub-tasks (web research, data analysis, report writing) to specialized collaborator agents and merges their results, using only managed Amazon Bedrock capabilities.",
  q: "Which feature should they use?",
  o: [
    "Amazon Bedrock multi-agent collaboration with a supervisor agent and collaborator agents",
    "Amazon Bedrock Guardrails contextual grounding checks applied across several independent agents",
    "Amazon Bedrock batch inference jobs that run each sub-task separately and merge the S3 outputs",
    "Amazon Bedrock Custom Model Import for each specialist, with a router model choosing between them"],
  a: [0],
  e: "**Multi-agent collaboration** in Bedrock Agents lets a **supervisor agent** decompose work and delegate to collaborator agents, then consolidate outputs.",
  w: [
    "Managed supervisor/collaborator orchestration with result consolidation.",
    "Grounding checks validate responses against sources; they do not coordinate agents.",
    "Batch inference runs offline bulk jobs and does not delegate dynamically.",
    "Custom Model Import brings external model weights into Bedrock; it is not an orchestration feature."]
},

{
  id: "d2-007", d: 2, t: "2.1", s: "2.1.2", type: "single",
  sc: "A compliance team wants an agent whose every reasoning and tool-calling step is observable, retryable and bounded, with an explicit audit of each iteration. They prefer to implement the reason-act-observe loop themselves using AWS orchestration.",
  q: "Which design is MOST appropriate?",
  o: [
    "A Step Functions state machine: a Task state invokes the model, a Choice state checks for a tool request, a Task runs the tool, and the loop returns the observation",
    "A single Lambda function that loops until the model stops requesting tools, with no step limit or per-step logging",
    "An SQS queue that stores the prompts and a consumer that calls the model once for each message",
    "An S3 bucket notification that invokes a function each time the model writes a new object to the bucket"],
  a: [0],
  e: "Implementing **ReAct in Step Functions** makes each step an explicit, logged, retryable state with built-in timeouts and iteration control.",
  w: [
    "Explicit states provide observability, retries and bounds for each iteration.",
    "An unbounded in-function loop is hard to observe and risks runaway execution and timeouts.",
    "A queue stores messages but does not implement the reasoning loop.",
    "Notifications are not an orchestration mechanism for a reasoning loop."]
},

{
  id: "d2-008", d: 2, t: "2.1", s: "2.1.3", type: "single",
  sc: "During testing, an agent repeatedly calls the same search tool with slightly different queries, never reaching a final answer, and consumes large amounts of tokens before the workflow times out.",
  q: "Which control BEST prevents this behavior in production?",
  o: [
    "Add a stopping condition in the Step Functions workflow: an iteration counter checked by a Choice state, a token budget, and state timeouts that route to a fallback response",
    "Increase the Lambda timeout so that the agent has more time to finish before the function is stopped",
    "Switch to a larger model, which will reason well enough to avoid repeating searches on its own",
    "Add \"do not loop\" to the system prompt so that the model stops calling the same tool repeatedly"],
  a: [0],
  e: "**Safeguarded workflows** bound autonomy with an **iteration cap**, a token/cost budget and **timeouts**, then fall back gracefully.",
  w: [
    "Hard limits enforced by the orchestrator guarantee termination.",
    "More time lets the loop consume more tokens before stopping.",
    "Larger models can still loop and cost more.",
    "A prompt instruction is not an enforceable control."]
},

{
  id: "d2-009", d: 2, t: "2.1", s: "2.1.3", type: "multiple",
  sc: "A company is deploying an agent that can read customer records and update order status. Security wants strong boundaries so that a manipulated prompt cannot cause damage.",
  q: "Which TWO controls are MOST effective?",
  o: [
    "Give the agent execution role least-privilege IAM permissions scoped to the specific tables and actions it needs",
    "Require approval (human or policy check) before high-impact actions such as refunds, deletions or bulk status changes",
    "Add a sentence to the system prompt saying the agent must never delete data or change orders without authorization",
    "Grant the agent a broad PowerUser role so that it can recover from its own errors when a tool call fails",
    "Rely on the model's built-in alignment instead of tool restrictions, since aligned models refuse harmful actions"],
  a: [0,1],
  e: "The real boundary is **IAM**, not the prompt. Combine **least privilege** with **approval gates** for high-impact operations.",
  w: [
    "Even a fully manipulated prompt cannot exceed the role's permissions.",
    "Approval reduces the blast radius of risky actions.",
    "Prompt rules can be bypassed by injection.",
    "Broad permissions greatly increase the blast radius.",
    "Alignment is not a security control."],
  trap: "The agent's IAM role is the security boundary; prompts are guidance."
},

{
  id: "d2-010", d: 2, t: "2.1", s: "2.1.5", type: "single",
  sc: "A loan-processing workflow uses a foundation model to draft decisions. Decisions above $50,000 must be approved by a manager who may take up to two days to respond. The workflow must pause without holding compute and continue after the approval.",
  q: "Which design is MOST appropriate?",
  o: [
    "A Step Functions Standard workflow using the waitForTaskToken callback pattern; send the token to the reviewer and resume on SendTaskSuccess or SendTaskFailure",
    "A Lambda function that sleeps for up to two days while waiting for the manager to respond, then continues the workflow",
    "A Step Functions Express workflow that polls the approval status every second until the manager responds",
    "An extra model call that predicts whether the manager would approve the decision and proceeds without waiting"],
  a: [0],
  e: "**`.waitForTaskToken`** pauses a Standard workflow (up to one year) with no compute cost until a human responds via the task token.",
  w: [
    "The callback pattern pauses a Standard workflow for up to a year with no compute cost.",
    "Lambda has a 15-minute limit and would bill while waiting.",
    "Express workflows have a short maximum duration and polling is wasteful.",
    "A model cannot substitute for an authorized human approver."]
},

{
  id: "d2-011", d: 2, t: "2.1", s: "2.1.5", type: "single",
  sc: "A Bedrock agent can issue refunds through an action group. The business wants the end user to confirm each refund in the chat application before the action executes.",
  q: "Which Bedrock Agents capability supports this?",
  o: [
    "Use return of control or user confirmation on the action, so the application asks the user to confirm before the action runs",
    "Increase the agent's idle session timeout so that users have more time to reconsider before a refund is issued",
    "Attach a larger knowledge base of refund policies so that the agent can decide more accurately when to issue refunds",
    "Lower the agent's temperature so that the agent is less likely to choose the refund action without a clear reason"],
  a: [0],
  e: "Agents can **return control** to the calling application (or require **user confirmation**) before executing sensitive actions, enabling confirmation in the UI.",
  w: [
    "Keeps a human decision in the loop before the action executes.",
    "Session timeout does not add confirmation.",
    "Knowledge bases supply information, not confirmation.",
    "Temperature does not create approval steps."]
},

{
  id: "d2-012", d: 2, t: "2.1", s: "2.1.6", type: "single",
  sc: "An agent has two tools: \"get_customer\" and \"lookup_account\". Descriptions are vague, and the agent frequently calls the wrong tool or passes malformed parameters.",
  q: "What is the MOST effective fix?",
  o: [
    "Rewrite names and descriptions to state exactly when each tool applies, define strict input schemas, and validate parameters in the Lambda tool",
    "Add more overlapping tools so that the model always has a close match available for each user request",
    "Increase the temperature to encourage the model to explore different tools until one returns a useful result",
    "Remove input validation from the tools so that calls succeed more often even with imperfect parameters"],
  a: [0],
  e: "The model selects tools using **names, descriptions and schemas**. Clear descriptions plus **strict schemas and server-side validation** improve selection and reliability.",
  w: [
    "Improves the information the model uses to choose and call tools, and protects against bad parameters.",
    "More overlapping tools usually increases confusion.",
    "Higher temperature adds randomness to tool choice.",
    "Removing validation lets bad inputs through."]
},

{
  id: "d2-013", d: 2, t: "2.1", s: "2.1.6", type: "single",
  sc: "A tool Lambda function calls an internal service that sometimes returns 503. Currently the function raises an unhandled exception and the agent run fails entirely.",
  q: "Which change makes the agent more resilient?",
  o: [
    "Catch the error in the tool, retry transient failures with backoff, and return a structured error the agent can reason about",
    "Let the exception propagate so that the failure is clearly visible in the logs and the run stops immediately",
    "Set the tool timeout to zero so that the function never waits on the unreliable internal service",
    "Disable the tool permanently after the first error so that the agent no longer depends on the internal service"],
  a: [0],
  e: "Tools should **handle errors** and return structured results so the agent can recover, retry or choose another approach.",
  w: [
    "Handled errors and structured responses let the agent recover, retry or pick another approach.",
    "Unhandled exceptions abort the whole run.",
    "A zero timeout fails immediately.",
    "Permanent disablement removes capability after a transient fault."]
},

{
  id: "d2-014", d: 2, t: "2.1", s: "2.1.6", type: "single",
  sc: "An agent calls a payment tool. Network retries occasionally cause the same \"charge customer\" request to be executed twice.",
  q: "Which tool design change prevents duplicate charges?",
  o: [
    "Make the operation idempotent by requiring an idempotency key for each logical request and ignoring repeats that use the same key",
    "Tell the model in the prompt never to retry the charge tool, regardless of what the tool returns",
    "Increase the model's maxTokens so that the model can complete its reasoning before calling the charge tool",
    "Move the agent to a faster network so that duplicate requests become unlikely to occur"],
  a: [0],
  e: "Tools with side effects need **idempotency** so retries are safe regardless of cause.",
  w: [
    "Server-side idempotency guarantees safety under retries from any cause.",
    "Prompts cannot control infrastructure-level retries.",
    "maxTokens is unrelated to duplicate calls.",
    "Faster networks do not eliminate retries."]
},

{
  id: "d2-015", d: 2, t: "2.1", s: "2.1.7", type: "single",
  sc: "A team wants to expose a simple stateless tool that converts currencies as an MCP server. Traffic is spiky and low on average. They want the lowest operational overhead and pay-per-use pricing.",
  q: "Where should they host the MCP server?",
  o: [
    "AWS Lambda behind a function URL or API Gateway",
    "A fleet of Amazon EC2 instances running continuously with the MCP server installed on each instance",
    "An Amazon EKS cluster with dedicated GPU nodes running the MCP server as a long-lived pod",
    "An Amazon SageMaker AI real-time endpoint that hosts the MCP server code behind an endpoint invocation"],
  a: [0],
  e: "Stateless, lightweight tools fit **Lambda-hosted MCP servers**: no servers to manage and billing only when invoked.",
  w: [
    "Serverless, pay-per-use, and well suited to stateless tools with spiky traffic.",
    "Always-on EC2 pays for idle capacity and needs patching.",
    "GPU nodes are unnecessary for a currency tool and add cost and operations.",
    "SageMaker endpoints host models, not general tool servers."]
},

{
  id: "d2-016", d: 2, t: "2.1", s: "2.1.7", type: "single",
  sc: "An MCP tool maintains long-lived connections to a trading data feed, keeps in-memory state between calls, and has heavy native dependencies.",
  q: "Which hosting choice is MOST appropriate?",
  o: [
    "Containers on Amazon ECS with AWS Fargate",
    "AWS Lambda with the maximum 15-minute timeout, reconnecting to the feed on each invocation",
    "Amazon S3 static website hosting with client-side scripts that maintain the data feed connection",
    "Amazon CloudFront Functions that hold the feed connection and cache state at the edge"],
  a: [0],
  e: "**Complex, stateful or long-running tools** suit **containers** on ECS/Fargate rather than short-lived stateless Lambda.",
  w: [
    "Containers support persistent connections, in-memory state and heavy native dependencies.",
    "Lambda is ephemeral and time-limited, a poor match for persistent connections and state.",
    "S3 hosts static content and cannot run server-side tools.",
    "CloudFront Functions run tiny, short-lived edge scripts."]
},

{
  id: "d2-017", d: 2, t: "2.1", s: "2.1.7", type: "multiple",
  sc: "A platform team wants agents from several teams to consume shared tools consistently using the Model Context Protocol.",
  q: "Which TWO statements describe the MCP architecture correctly?",
  o: [
    "Agents act as MCP clients that discover and call tools exposed by MCP servers",
    "A tool implemented once as an MCP server can be reused by any compliant client",
    "MCP requires every tool to be implemented as an AWS Lambda function with an IAM-authenticated URL",
    "MCP replaces IAM, so authorization is not required once a tool is exposed through an MCP server",
    "MCP can only be used with agents that are built and hosted in Amazon Bedrock Agents"],
  a: [0,1],
  e: "MCP is an **open standard** with clients and servers; tools are written once and reused. It does not dictate hosting or replace authentication and authorization.",
  w: [
    "That is the client/server role split in MCP.",
    "Reuse across clients is the main benefit of the standard.",
    "Servers can run anywhere, for example Lambda or containers.",
    "Authorization and least privilege are still required.",
    "MCP is framework-agnostic and works with many agent frameworks."]
},

{
  id: "d2-018", d: 2, t: "2.1", s: "2.1.4", type: "single",
  sc: "An application receives a mix of simple FAQs, long contract analyses and image-based questions. Using the largest multimodal model for everything is expensive.",
  q: "Which architecture is MOST cost-effective while preserving quality?",
  o: [
    "A lightweight classifier (small FM or rules) that routes each request to a specialized model: small for FAQs, large for contracts, multimodal for images",
    "Send every request to the largest multimodal model, since it can handle all three types of requests accurately",
    "Send every request to the smallest model and ask users to resubmit when the answer is not good enough",
    "Choose the model for each request at random and rely on the volume of traffic to even out cost and quality"],
  a: [0],
  e: "**Model coordination and routing** match each task to the cheapest model that satisfies its needs.",
  w: [
    "Task-matched models balance cost and capability.",
    "Overpays for the simple requests, which are the majority.",
    "Fails on complex and image tasks and shifts the burden to users.",
    "Random choice ignores task requirements."]
},

{
  id: "d2-019", d: 2, t: "2.1", s: "2.1.4", type: "single",
  sc: "For high-stakes risk summaries, a company runs the same question through three different foundation models and wants a single consolidated answer that favors points on which the models agree.",
  q: "Which design implements this ensemble approach?",
  o: [
    "Invoke the three models in parallel (Step Functions Parallel state), then use aggregation logic or a judge model to reconcile the answers",
    "Invoke only the cheapest of the three models, and use the other two only if the first one returns an error",
    "Average the temperature settings of the three models and send the question once with the averaged value",
    "Use the output of whichever model responds first, since all three are expected to produce similar answers"],
  a: [0],
  e: "**Ensembles** run several models and apply **custom aggregation** (voting, consensus, or a judge model) to improve reliability on high-stakes outputs.",
  w: [
    "Parallel invocation plus reconciliation is the ensemble pattern, favoring points of agreement.",
    "A single model gives no cross-checking.",
    "Temperatures are inputs, not combinable outputs.",
    "First-response selection ignores quality and agreement."]
},

{
  id: "d2-020", d: 2, t: "2.1", s: "2.1.1", type: "single",
  sc: "A Bedrock agent calls an order-lookup action but needs a customer ID that the user has not provided. The team wants the agent to ask the user for the missing value instead of guessing.",
  q: "Which feature supports this?",
  o: [
    "Enable the agent's ability to request user input for missing required parameters in the action group definition",
    "Remove the required parameters from the schema so that the action succeeds even when information is missing",
    "Hard-code a default customer ID in the Lambda function so that the lookup always returns a result",
    "Increase the knowledge base chunk size so that the agent can find the customer ID in documents"],
  a: [0],
  e: "Bedrock Agents can **ask the user for missing information** when required parameters are absent, rather than inventing values.",
  w: [
    "Asking the user for missing required fields is built in.",
    "Making parameters optional invites wrong or empty calls.",
    "A default ID would return another customer's data.",
    "Chunk size affects retrieval, not parameter collection."]
},

{
  id: "d2-021", d: 2, t: "2.1", s: "2.1.2", type: "single",
  sc: "An agent gives an incorrect answer. Developers cannot tell whether the model chose the wrong tool, a tool returned bad data, or the model misread a correct result.",
  q: "What should they use to diagnose this FIRST?",
  o: [
    "The agent trace (enableTrace), which shows the model's reasoning steps, tool calls, parameters and observations for each turn",
    "Amazon CloudFront access logs for the web application that hosts the agent's chat interface",
    "Amazon S3 server access logs for the bucket that stores the knowledge base documents",
    "AWS Cost Explorer reports for the days when incorrect answers were reported by users"],
  a: [0],
  e: "**Agent tracing** exposes the orchestration steps: rationale, tool invocations, inputs/outputs and final response, making reasoning errors visible.",
  w: [
    "Shows the exact orchestration steps and tool interactions behind an answer.",
    "CloudFront logs show content delivery requests, not reasoning.",
    "S3 access logs show bucket requests, not agent reasoning.",
    "Cost Explorer shows spend, not reasoning."]
},

{
  id: "d2-022", d: 2, t: "2.1", s: "2.1.3", type: "single",
  sc: "An enterprise requires that any agent user input and agent output be checked for harmful content, PII exposure and prohibited topics, consistently, without writing custom filtering code in each agent.",
  q: "What is the MOST appropriate control?",
  o: [
    "Attach an Amazon Bedrock guardrail to the agent so inputs and outputs are evaluated against the configured policies",
    "Add keyword checks inside every action Lambda function and keep the lists in sync across agents",
    "Disable the agent's tools so that outputs only contain text produced by the model itself",
    "Rely on the base model's default safety training, which is applied in the same way to every deployment"],
  a: [0],
  e: "Guardrails can be **attached to agents** to apply content, topic, PII and grounding policies consistently on inputs and outputs.",
  w: [
    "Centralized, consistent safety policy on both directions.",
    "Per-tool keyword checks are inconsistent and miss prompts and responses.",
    "Removing tools removes functionality and does not filter the model's own output.",
    "Default model safety is not a configurable organizational policy."]
},

{
  id: "d2-023", d: 2, t: "2.1", s: "2.1.1", type: "single",
  sc: "An agent must call a third-party SaaS API on behalf of each signed-in user. Each user must authorize access individually, and the company does not want to hard-code or share API keys inside the agent.",
  q: "Which capability is designed for this?",
  o: [
    "Amazon Bedrock AgentCore Identity, which manages inbound authentication and securely obtains and stores outbound OAuth tokens for agents acting on behalf of users",
    "Embed one shared API key in the system prompt so that every agent request to the SaaS API succeeds",
    "Store each user's password in the conversation history so that the agent can sign in on their behalf",
    "Make the SaaS API public so that no credentials are needed from any of the agents"],
  a: [0],
  e: "**AgentCore Identity** handles agent identity and delegated access: authenticate users inbound and manage **credentials/tokens** for outbound calls to third-party services.",
  w: [
    "Managed delegated authorization and secure credential handling.",
    "Prompts are not secret storage, and one shared key breaks per-user authorization.",
    "Storing passwords in history is a serious security failure.",
    "Public APIs remove access control."]
},

{
  id: "d2-024", d: 2, t: "2.1", s: "2.1.2", type: "single",
  sc: "A claims-processing process has fixed, well-known steps: extract data, validate against rules, summarise, and route. The FM is needed only inside two of the steps. Predictability, auditability and low cost are priorities.",
  q: "Which architecture is MOST appropriate?",
  o: [
    "A Step Functions workflow with deterministic steps that calls the FM only where language understanding is needed",
    "A fully autonomous agent that decides which steps to run and in what order for each claim",
    "A single large prompt that asks the model to extract, validate, summarize and route in one call",
    "A multi-agent group with a supervisor agent coordinating a specialist agent for each of the four steps"],
  a: [0],
  e: "When the process is **known and fixed**, deterministic orchestration with FM calls at specific steps is more predictable, auditable and cheaper than an autonomous agent.",
  w: [
    "Deterministic control with targeted FM use gives predictability, auditability and low cost.",
    "Autonomy adds variability, cost and risk without need for a fixed process.",
    "One prompt reduces control and auditability of individual steps.",
    "Multi-agent complexity is unnecessary for a fixed flow."],
  trap: "Do not choose agents when a deterministic workflow is enough."
},

{
  id: "d2-025", d: 2, t: "2.1", s: "2.1.1", type: "single",
  sc: "A team builds a multi-agent application with Strands Agents. A \"planner\" agent should call a \"research\" agent and a \"calculator\" agent whenever needed, treating them like tools.",
  q: "Which pattern is this?",
  o: [
    "Agents-as-tools: each specialist agent is wrapped as a tool that the planner agent can call",
    "Batch inference: each specialist agent runs as an offline job and writes results to S3 for the planner",
    "Semantic caching: the planner stores specialist answers and reuses them for similar questions",
    "Cross-Region inference: the planner sends each task to the specialist hosted in the fastest Region"],
  a: [0],
  e: "In Strands, a specialist agent can be exposed as a **tool** to an orchestrator agent (agents-as-tools), alongside other patterns such as swarm and graph workflows.",
  w: [
    "Specialists callable as tools from an orchestrator agent is the agents-as-tools pattern in Strands.",
    "Batch inference processes offline jobs and is not a runtime agent-composition pattern.",
    "Semantic caching reuses answers; it does not compose agents.",
    "Cross-Region inference spreads model requests across Regions; it is not an orchestration pattern."]
},

{
  id: "d2-026", d: 2, t: "2.1", s: "2.1.6", type: "single",
  sc: "An agent tool starts a report-generation job that takes about 20 minutes. The agent currently waits for the tool and times out.",
  q: "Which design BEST integrates the long-running job?",
  o: [
    "Have the tool start the job asynchronously and return a job ID, then check status with a separate tool or receive a completion callback or event",
    "Increase the model's temperature so that the agent produces its answer before the report job finishes",
    "Make the Lambda tool poll internally for the full 20 minutes until the report is complete",
    "Ask the user to wait without any status mechanism until the agent eventually receives the report"],
  a: [0],
  e: "Long jobs need an **asynchronous pattern**: start, return a handle, then poll or receive a callback/event so the agent stays responsive within timeouts.",
  w: [
    "An async start with a handle, plus polling or a callback, fits time limits and keeps the agent responsive.",
    "Temperature is irrelevant to job duration.",
    "Lambda has a 15-minute limit, and in-tool polling ties up the agent.",
    "Without status, users and agents cannot see progress, and the timeout problem remains."]
}
);
