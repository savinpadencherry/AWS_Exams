/* Domain 1 questions: Task 1.1 (design) and Task 1.2 (FM selection/configuration). Independent practice items. */
(window.QBANK = window.QBANK || []).push(
{
  id: "d1-001", d: 1, t: "1.1", s: "1.1.1", type: "single",
  sc: "A law firm wants an assistant that answers questions about 40,000 internal case memos. Memos are added or edited every day. Answers must cite the memo they came from. The team is small and has no machine learning specialists.",
  q: "Which solution meets the requirements with the LEAST engineering effort?",
  o: [
    "Fine-tune an Amazon Titan model on all memos every week and serve it with Provisioned Throughput so answers reflect recent content",
    "Create an Amazon Bedrock knowledge base over the S3 memos, sync it on a schedule, and call RetrieveAndGenerate to return answers with citations",
    "Index the memos in an Amazon OpenSearch Serverless collection and write Lambda code for chunking, embedding, retrieval and prompt assembly",
    "Load all memos into Amazon DynamoDB and have a Lambda function pass the entire table to a long-context model with every question"],
  a: [1],
  e: "This is a retrieval problem: knowledge is private, changes daily and needs citations. **Knowledge Bases** handles chunking, embedding, storage, synchronisation and returns citations through `RetrieveAndGenerate`, with no ML expertise needed.",
  w: [
    "Fine-tuning bakes knowledge into weights, is up to a week stale for daily changes, and cannot cite the source memo.",
    "Managed RAG: incremental sync keeps content fresh and citations come back with each answer, with no ML expertise needed.",
    "This works technically, but the team must build and operate the whole pipeline, which contradicts \"least engineering effort\".",
    "40,000 memos far exceed any context window, and the approach would be extremely slow and costly per request."],
  trap: "Changing private knowledge plus citations means RAG, not fine-tuning."
},

{
  id: "d1-002", d: 1, t: "1.1", s: "1.1.2", type: "single",
  sc: "A retailer wants to automate product-description writing for 200,000 items. Executives are unsure about quality and per-item cost, and have asked for evidence before funding a full build.",
  q: "What is the BEST way to validate feasibility and business value?",
  o: [
    "Build the complete production pipeline with monitoring and multi-Region failover first, then measure quality and cost on live traffic",
    "Choose the model with the highest public leaderboard score, because published benchmarks predict quality on any catalog of products",
    "Run a time-boxed proof of concept on Bedrock with a representative sample, compare models with Model Evaluations and human review, and record latency and token cost",
    "Fine-tune a model on all existing descriptions before any evaluation so that quality is maximized from the very first test"],
  a: [2],
  e: "A proof of concept should test **feasibility, performance and value** with representative data before scaling. Evaluating candidate models on a sample and measuring cost and latency gives executives the evidence they asked for at low cost.",
  w: [
    "Building everything first defeats the purpose of validating cheaply before funding.",
    "Leaderboards do not reflect this retailer's catalog, tone or cost target, so they are not evidence of business value.",
    "A representative sample, model comparison, human review and cost/latency measurement is exactly the evidence executives asked for.",
    "Fine-tuning is heavy and premature before knowing whether prompting alone is sufficient."]
},

{
  id: "d1-003", d: 1, t: "1.1", s: "1.1.3", type: "single",
  sc: "Five teams in an enterprise are building GenAI applications. Each team configures guardrails, logging and prompt templates differently, and security reviews are slow and inconsistent.",
  q: "Which approach BEST standardizes implementation and review across teams?",
  o: [
    "Publish a wiki page of recommended settings and ask each team to follow it, with reviews done by each team's own lead",
    "Provide shared infrastructure-as-code constructs with approved guardrails, logging and prompt templates, and review each workload with the Well-Architected Tool Generative AI Lens",
    "Move all five teams into one shared AWS account with a single IAM role so that configuration is automatically identical",
    "Let each team select its own tools and schedule a manual architecture review once a year"],
  a: [1],
  e: "Reusable, versioned components (CDK or CloudFormation modules, Service Catalog products) make the secure configuration the default. The **Well-Architected Tool with the Generative AI Lens** provides a structured, repeatable review.",
  w: [
    "Documentation alone does not enforce consistency, and team-run reviews stay inconsistent.",
    "Codified building blocks make the secure setup the default, and a lens-based review standardizes governance.",
    "A shared role breaks least privilege and does not standardize guardrails, logging or prompts.",
    "Annual manual reviews are slow and inconsistent, which is the existing problem."]
},

{
  id: "d1-004", d: 1, t: "1.1", s: "1.1.1", type: "single",
  sc: "An insurer receives claim documents in Amazon S3. Each document takes up to three minutes to process with a foundation model, and volume spikes sharply at month end. Adjusters read results the next morning.",
  q: "Which architecture is MOST appropriate?",
  o: [
    "API Gateway REST API invoking a Lambda function that waits synchronously for each model response and returns it to the caller",
    "A WebSocket connection per adjuster that streams tokens in real time as each document is processed overnight",
    "An S3 event notification that queues messages on Amazon SQS, with Lambda or Step Functions workers calling Bedrock and storing results",
    "A fleet of Amazon EC2 instances that poll the bucket every second and call the model synchronously for each new document"],
  a: [2],
  e: "Nobody is waiting, work is long and bursty. **Queue-based asynchronous processing** smooths spikes, supports retries and dead-letter queues, and avoids synchronous API timeouts.",
  w: [
    "Synchronous calls risk API timeouts (about 29 seconds by default for API Gateway integrations) and handle month-end spikes poorly.",
    "Streaming optimizes interactive perceived latency, which is unnecessary when adjusters read results the next morning.",
    "SQS buffering decouples ingestion from processing, absorbs spikes, and supports retries and a dead-letter queue.",
    "Constant polling adds operations burden and idle cost without a buffering or retry benefit."]
},

{
  id: "d1-005", d: 1, t: "1.1", s: "1.1.1", type: "single",
  sc: "A company is launching an internal GenAI tool. Usage is unpredictable and will be near zero overnight. Finance wants cost to track usage and the team wants minimal infrastructure management.",
  q: "Which deployment strategy fits BEST?",
  o: [
    "Purchase Provisioned Throughput with a six-month commitment so capacity is always reserved for the tool",
    "Use Amazon Bedrock on-demand inference called from AWS Lambda so cost tracks usage and nothing idles overnight",
    "Run a GPU-based Amazon SageMaker AI real-time endpoint around the clock to guarantee low latency for every request",
    "Host an open-source model on EC2 in an Auto Scaling group with a minimum of four instances to handle bursts"],
  a: [1],
  e: "**On-demand Bedrock inference** is pay-per-token with no idle capacity, and Lambda scales to zero. Provisioned Throughput suits steady, high, predictable volume.",
  w: [
    "A commitment pays for capacity even when idle overnight and suits steady, predictable volume.",
    "Pay-per-token billing with no idle capacity, and Lambda scales to zero, matching unpredictable usage and minimal operations.",
    "An always-on GPU endpoint incurs cost around the clock regardless of usage.",
    "A fixed minimum fleet pays for idle GPUs and adds patching and scaling work."]
},

{
  id: "d1-006", d: 1, t: "1.1", s: "1.1.1", type: "single",
  sc: "A banking chatbot must answer questions such as \"What will my loan payment be if I borrow 18,500 at 6.4% for 42 months?\" The model sometimes returns slightly wrong numbers.",
  q: "Which design change MOST reliably fixes the numeric errors?",
  o: [
    "Switch to the largest available foundation model, which is less likely to make arithmetic mistakes on loan calculations",
    "Add \"think step by step\" to the prompt so that the model works through the amortization formula in its reply",
    "Fine-tune the model on thousands of solved loan-payment examples so that it memorizes how the calculation behaves",
    "Let the model extract the parameters and call a Lambda function (tool) that performs the calculation, then present the result"],
  a: [3],
  e: "LLMs are probabilistic and unreliable at exact arithmetic. Use the model for **language understanding** and a **deterministic tool** for the calculation (function calling / agent action).",
  w: [
    "Larger models still make arithmetic mistakes, so this lowers but does not remove the error.",
    "Chain-of-thought helps but remains non-deterministic, so numbers can still be slightly wrong.",
    "Fine-tuning does not make arithmetic exact; it only makes the output look more like the examples.",
    "Deterministic code gives exact, auditable results while the model handles language understanding."],
  trap: "Exact numbers, rules or database values come from tools, not model recall."
},

{
  id: "d1-007", d: 1, t: "1.1", s: "1.1.2", type: "multiple",
  sc: "A team is running a proof of concept for a contract-clause extraction feature. They need to decide whether it is feasible before requesting production funding.",
  q: "Which TWO activities belong in the proof of concept?",
  o: [
    "Build a golden dataset of representative contracts with the expected extractions for each clause",
    "Measure latency and token cost per document for each candidate model on that dataset",
    "Purchase a 12-month Provisioned Throughput commitment for the leading candidate model",
    "Implement active-active multi-Region failover for the extraction service",
    "Fine-tune a model on the entire contract archive before comparing any candidates"],
  a: [0,1],
  e: "A PoC validates **quality** (golden dataset) and **economics and speed** (latency and cost). Long commitments, multi-Region resilience and large fine-tuning are production-scale investments that come after feasibility is proven.",
  w: [
    "A representative golden set makes quality measurable and comparable across candidates.",
    "Cost and latency per document show whether the feature is economically viable at scale.",
    "A 12-month commitment before feasibility is proven is a financial risk, not PoC work.",
    "Resilience engineering belongs to the production design phase after feasibility is proven.",
    "Large-scale tuning is premature; prompting or RAG may already meet the quality bar."]
},

{
  id: "d1-008", d: 1, t: "1.1", s: "1.1.1", type: "single",
  sc: "A European healthcare company must process patient-related prompts only within EU Regions. It wants higher throughput than a single Region provides for an Anthropic Claude model on Amazon Bedrock.",
  q: "Which approach satisfies the requirements?",
  o: [
    "Use a global cross-Region inference profile so that requests are routed to whichever Region has the most spare capacity",
    "Use a cross-Region inference profile scoped to the EU geography so requests are pooled across EU Regions only",
    "Use a US cross-Region inference profile and encrypt the prompts with an AWS KMS key before sending them",
    "Call the model in a single EU Region and cache all responses indefinitely to reduce the need for extra capacity"],
  a: [1],
  e: "A **geography-specific inference profile (EU)** routes requests only among Regions in that geography, increasing throughput while keeping processing inside the EU. A global profile can route anywhere.",
  w: [
    "A global profile may route requests outside the EU, which violates the residency requirement.",
    "Processing stays inside EU Regions while capacity is pooled across them to raise throughput.",
    "A US profile processes data in the US; encrypting prompts does not change where processing occurs.",
    "Indefinite caching of patient-related answers is a privacy and correctness problem and does not scale throughput."]
},

{
  id: "d1-009", d: 1, t: "1.1", s: "1.1.1", type: "single",
  sc: "A marketing team wants every generated email to follow the company's brand voice and a fixed structure. The model already knows how to write emails; it just needs to follow the style consistently.",
  q: "What should the developer try FIRST?",
  o: [
    "A system prompt with style rules and a few examples, stored as a versioned template in Bedrock Prompt Management",
    "Continued pre-training of a model on a large corpus of the company's past emails to absorb the brand voice",
    "A Knowledge Base of all past marketing emails, retrieved and inserted into the prompt for every new request",
    "A multi-agent system in which a separate editor agent rewrites every draft to match the brand guidelines"],
  a: [0],
  e: "Climb the **augmentation ladder from the cheapest rung**. Style and format are usually achieved by clear instructions and few-shot examples. Tune or add components only if prompting measurably fails.",
  w: [
    "Cheapest and fastest rung of the ladder; style and format are usually achieved with clear instructions and examples.",
    "Continued pre-training is expensive and unnecessary when the model already writes good emails.",
    "RAG supplies knowledge, but the model lacks no knowledge here, only consistent style.",
    "Agents add cost, latency and complexity without addressing a missing capability."]
},

{
  id: "d1-010", d: 1, t: "1.1", s: "1.1.3", type: "multiple",
  sc: "A platform team wants every GenAI workload in the company to start from the same secure baseline: approved guardrails, invocation logging and tagged resources.",
  q: "Which TWO actions create standardized, reusable components?",
  o: [
    "Publish AWS CDK or CloudFormation constructs that bundle the approved guardrail, logging and tagging configuration",
    "Offer approved products in an AWS Service Catalog portfolio that teams can launch on demand",
    "Document the baseline configuration steps in a runbook and email it to each team lead for manual setup",
    "Have each team copy the settings by hand from another team's console configuration",
    "Grant every developer administrator permissions so they can configure what their workload needs"],
  a: [0,1],
  e: "**Infrastructure-as-code modules and Service Catalog products** make the compliant configuration repeatable and the default. Manual copying and broad permissions create drift and risk.",
  w: [
    "Versioned IaC encodes the baseline once and makes it reusable.",
    "Service Catalog lets teams self-serve governed, pre-approved stacks.",
    "Emailed manual steps are neither enforceable nor repeatable.",
    "Manual copying produces drift and mistakes.",
    "Administrator access violates least privilege and undermines standardization."]
},

{
  id: "d1-011", d: 1, t: "1.1", s: "1.1.1", type: "single",
  sc: "An insurer wants a claims application that accepts a photo of vehicle damage plus a short text description and produces a structured damage assessment in JSON.",
  q: "Which design is MOST direct?",
  o: [
    "Use Amazon Rekognition label detection on the photo and rely on those labels alone to produce the assessment",
    "Train a custom computer vision model and a separate NLP model on SageMaker AI, then merge their outputs with custom code",
    "Send the image and text together to a multimodal model through the Bedrock Converse API and request JSON output",
    "Use Amazon Textract to extract the text visible in the photo and feed that text to a text-only model"],
  a: [2],
  e: "A **multimodal FM** can reason over image and text in one request and return structured output. Converse supports image content blocks and a consistent request format.",
  w: [
    "Labels alone cannot produce a nuanced damage assessment and ignore the text description.",
    "Training and merging two custom models is far more work than needed.",
    "One call handles both modalities and returns the structured output directly.",
    "Textract extracts printed text, not damage information from a photo of a vehicle."]
},

{
  id: "d1-012", d: 1, t: "1.1", s: "1.1.2", type: "single",
  sc: "A proof of concept achieves 92% accuracy on a golden dataset, but the cost is about $0.40 per request while the business value per request is about $0.05.",
  q: "What is the BEST next step?",
  o: [
    "Proceed to production because accuracy of 92% already demonstrates that the feature is ready to launch",
    "Reduce token usage with prompt compression and context pruning, test a smaller or routed model on the golden dataset, and re-measure",
    "Purchase Provisioned Throughput to lower the per-request price immediately, then proceed with the current design",
    "Cancel the project because generative AI is too expensive to deliver a positive return for this feature"],
  a: [1],
  e: "The PoC revealed an **economic** gap. Cost levers (fewer tokens, caching, smaller or cascaded models) should be tested against the same golden dataset so the team can show whether value exceeds cost.",
  w: [
    "Ignoring an 8x gap between cost and value would build a money-losing product.",
    "Targets cost directly and uses the golden dataset to protect quality while testing cheaper options.",
    "Provisioned Throughput improves predictability at steady volume but would not by itself close a gap this large.",
    "Premature, since several cost levers (tokens, caching, smaller models) have not been tried."]
},

{
  id: "d1-013", d: 1, t: "1.2", s: "1.2.1", type: "single",
  sc: "A company routes 5 million short customer emails per day into five categories. Responses must return in under one second, and the budget is tight. A prototype using the largest model is accurate but slow and expensive.",
  q: "Which approach is BEST?",
  o: [
    "Keep the largest model for accuracy and add response caching in front of it to reduce average latency",
    "Evaluate smaller, faster models on a labeled sample of the company's emails and choose the cheapest that meets the accuracy target",
    "Choose the model with the longest context window, because more context always improves classification accuracy",
    "Fine-tune the largest model for classification so that it needs fewer tokens to produce each answer"],
  a: [1],
  e: "Short-text classification rarely needs the largest model. **Evaluate smaller candidates on your own data** and pick the cheapest model that meets the quality and latency targets.",
  w: [
    "Caching helps repeated inputs, but unique emails still hit the slow, expensive model.",
    "Evidence-based right-sizing improves latency and cost while protecting accuracy.",
    "Context length is irrelevant for short emails and does not improve classification.",
    "Tuning a large model increases cost and complexity for a simple task."],
  trap: "The professional exam favours the smallest model that passes evaluation."
},

{
  id: "d1-014", d: 1, t: "1.2", s: "1.2.1", type: "single",
  sc: "A developer must summarise 300-page reports that are about 250,000 tokens long. A model with a 200,000-token context window returns a ValidationException. The developer proposes raising maxTokens in the request.",
  q: "What is the correct analysis?",
  o: [
    "Raise maxTokens in the request, because it enlarges the amount of text the model can read and respond with",
    "maxTokens only limits the output; choose a longer-context model or split the report and summarize it in stages",
    "The error indicates throttling; retry the request with exponential backoff until capacity is available",
    "Reduce the temperature to zero so that the model handles long inputs more deterministically"],
  a: [1],
  e: "The **context window covers input plus output**. `maxTokens` caps only the response. Fit the content with a larger-window model or a **map-reduce** approach (summarise sections, then summarise the summaries).",
  w: [
    "maxTokens does not enlarge the context window; it only caps the response length.",
    "The input exceeds the context window, so fit it with a larger window or a map-reduce approach.",
    "Throttling raises ThrottlingException, not a ValidationException about input size.",
    "Temperature affects randomness, not size limits."]
},

{
  id: "d1-015", d: 1, t: "1.2", s: "1.2.2", type: "single",
  sc: "A product team wants to change which foundation model and inference parameters their Lambda-based app uses, and roll the change out to 10% of traffic first, without redeploying code. They want automatic rollback if error alarms fire.",
  q: "Which solution meets these requirements?",
  o: [
    "Store the model ID in a Lambda environment variable and redeploy the function with the new value for ten percent of invocations",
    "Store model ID and parameters in AWS AppConfig, deploy with a gradual rollout strategy, and attach CloudWatch alarms as rollback monitors",
    "Hard-code both models in the function and select one at random with a ten percent probability of the new model",
    "Keep the settings in an S3 object that every invocation downloads, and edit the object to change the model"],
  a: [1],
  e: "**AWS AppConfig** delivers validated configuration with **gradual deployment and automatic rollback** on CloudWatch alarms, so model selection changes need no code deployment.",
  w: [
    "Environment variable changes require a deployment and have no gradual rollout or alarm-based rollback.",
    "AppConfig provides validated configuration with gradual deployment and automatic rollback on alarms.",
    "Random selection in code is not controllable, auditable or reversible without a deployment.",
    "A raw S3 file lacks validation, rollout control and rollback."]
},

{
  id: "d1-016", d: 1, t: "1.2", s: "1.2.2", type: "single",
  sc: "An application calls Amazon Bedrock using InvokeModel with request bodies in one provider's format. The company wants to evaluate models from other providers with minimal code changes.",
  q: "What should the developer do?",
  o: [
    "Rewrite the request body for each provider's format and branch on the provider name inside the application code",
    "Use the Bedrock Converse API so messages, system prompt and inference parameters use one consistent format across supported models",
    "Move the workload to a different cloud provider whose single API already supports every model family",
    "Call each candidate model through its own SageMaker AI endpoint, where the payload format is identical for all models"],
  a: [1],
  e: "The **Converse API** normalises messages, system prompts, tool configuration and inference parameters across models, making swapping models far easier than model-specific InvokeModel payloads.",
  w: [
    "Per-provider body logic is exactly the code churn the team wants to avoid.",
    "One request shape across supported models minimizes code changes.",
    "Unnecessary and disruptive for a model-evaluation goal.",
    "SageMaker endpoint payloads depend on the serving container, so formats are not identical, and it adds infrastructure."]
},

{
  id: "d1-017", d: 1, t: "1.2", s: "1.2.2", type: "single",
  sc: "A SaaS platform serves premium and standard tenants. Premium tenants should use a larger model; standard tenants a smaller one. Product management wants to adjust the mapping weekly without engineering releases.",
  q: "Which architecture is BEST?",
  o: [
    "Maintain two code branches deployed as separate Lambda functions, one per tenant tier, each hard-coding its model",
    "Use one Lambda function behind API Gateway that reads a tenant-to-model mapping from AWS AppConfig and calls Bedrock with Converse",
    "Store the mapping as a CloudFormation parameter that engineers update and redeploy each week",
    "Ask the model in the system prompt which model it prefers to be routed to for each tenant"],
  a: [1],
  e: "Keep **model selection as data, not code**. A single function reads a mapping from **AppConfig**, so weekly changes are configuration deployments with validation and rollback.",
  w: [
    "Branching duplicates code and still requires releases for every change.",
    "Model selection becomes data, so weekly changes are validated configuration deployments with rollback.",
    "Stack parameter updates are engineering-driven releases, which product management wants to avoid.",
    "A model cannot choose its own routing infrastructure."]
},

{
  id: "d1-018", d: 1, t: "1.2", s: "1.2.3", type: "single",
  sc: "A fallback-less application calls a foundation model that intermittently times out. Retries pile up, exhaust Lambda concurrency and degrade unrelated features.",
  q: "Which pattern BEST prevents this cascading failure?",
  o: [
    "Increase the Lambda function timeout to the maximum so slow model calls have more time to finish",
    "Retry immediately in a tight loop until the model call succeeds, so that every request is eventually answered",
    "Implement a circuit breaker with Step Functions that records failures in DynamoDB and, past a threshold, routes to a fallback for a cool-down period",
    "Remove retries and error handling so that failures surface immediately and free up concurrency faster"],
  a: [2],
  e: "A **circuit breaker** stops calling an unhealthy dependency after repeated failures, protecting capacity, and routes to a **fallback** until the dependency recovers.",
  w: [
    "Longer timeouts hold concurrency longer and make cascading failure worse.",
    "Tight retry loops amplify load on the already struggling dependency.",
    "Failure state plus a Choice state implements open/half-open/closed behavior and a fallback path.",
    "No handling lets failures propagate to unrelated features and loses requests."]
},

{
  id: "d1-019", d: 1, t: "1.2", s: "1.2.3", type: "single",
  sc: "A newly released model is available on Amazon Bedrock only in a few Regions, but the company's application and data stores run in a different supported Region. The company needs the model with good burst capacity and has no strict single-Region processing rule.",
  q: "What should the developer use?",
  o: [
    "Use a cross-Region inference profile for the model, called from the application's Region",
    "Replicate the application stack and data stores into every Region where the model is natively available",
    "Copy the model weights from the supported Region into the application Region and host them there",
    "Open an AWS Support case asking for the model to be moved natively into the application Region"],
  a: [0],
  e: "**Cross-Region inference profiles** route requests to Regions that have capacity for the model, enabling use from the source Region and improving throughput during bursts.",
  w: [
    "Profiles provide access and burst capacity across Regions without duplicating infrastructure.",
    "Duplicating the stack is heavy and unnecessary when inference can be routed across Regions.",
    "Foundation model weights offered through Bedrock cannot be copied by customers.",
    "Not a standard customer option and does not meet the need quickly."]
},

{
  id: "d1-020", d: 1, t: "1.2", s: "1.2.3", type: "multiple",
  sc: "During an outage of the primary model, the company wants its support chatbot to continue serving customers, even if with reduced capability.",
  q: "Which TWO graceful degradation strategies are appropriate?",
  o: [
    "Fall back to a smaller secondary model or Region when the primary model is unavailable",
    "Return retrieval-only results (matching help articles) or a cached answer with a clear notice that generation is unavailable",
    "Retry the primary model indefinitely, holding the customer's chat open until the model returns",
    "Display the full error and stack trace to the customer so that they can describe the problem to support",
    "Disable authentication on the chatbot during the outage so that requests succeed through the fallback path"],
  a: [0,1],
  e: "**Graceful degradation** keeps core functionality alive with reduced capability: alternate model, cached answers, or retrieval-only responses, with clear messaging to users.",
  w: [
    "A secondary model preserves most functionality during the outage.",
    "Articles or cached answers still help users when generation is unavailable.",
    "Infinite retries create a hung experience and extra load.",
    "Stack traces leak internals and do not help customers.",
    "Removing authentication is a security failure, not a fallback."]
},

{
  id: "d1-021", d: 1, t: "1.2", s: "1.2.3", type: "multiple",
  sc: "A promotion causes traffic bursts. The application receives ThrottlingException errors from an on-demand Amazon Bedrock model during peaks.",
  q: "Which TWO actions reduce the impact of throttling?",
  o: [
    "Configure the AWS SDK retry strategy with exponential backoff and jitter",
    "Use a cross-Region inference profile to access more aggregate capacity during bursts",
    "Increase the Lambda function timeout so that throttled calls have longer to complete",
    "Retry immediately with no delay so that each request gets through as soon as capacity frees up",
    "Increase maxTokens for every request so that fewer requests are needed to produce a full answer"],
  a: [0,1],
  e: "**Backoff with jitter** spreads retries; **cross-Region inference** pools capacity across Regions. For sustained steady load, quota increases or Provisioned Throughput are additional options.",
  w: [
    "Backoff and jitter spread retries and reduce synchronized retry storms.",
    "Pooled capacity across Regions absorbs bursts.",
    "A longer timeout does not create capacity or reduce throttling.",
    "Immediate retries worsen throttling.",
    "Higher maxTokens increases per-request token consumption and does not reduce throttling."]
},

{
  id: "d1-022", d: 1, t: "1.2", s: "1.2.4", type: "single",
  sc: "A legal-tech company wants to adapt a 70-billion-parameter open-weight model to its domain terminology. GPU budget is limited and the team wants to avoid retraining all parameters.",
  q: "Which technique is MOST appropriate?",
  o: [
    "Pre-train a new model from scratch on the firm's legal corpus so the terminology is learned natively",
    "Use parameter-efficient fine-tuning with LoRA on SageMaker AI, training small adapter weights while the base weights stay frozen",
    "Run full fine-tuning of every parameter on a single small GPU, accepting slower training to save money",
    "Rely only on a much longer system prompt that lists the terminology and example usage on every request"],
  a: [1],
  e: "**LoRA** trains small low-rank adapter matrices while the base weights stay frozen, greatly reducing GPU memory, time and cost, and producing small artifacts that can be swapped.",
  w: [
    "Pre-training is vastly more expensive and slower than adaptation.",
    "Adapter-only training fits the limited GPU budget and avoids retraining all parameters.",
    "Updating all parameters of a 70B model needs far more GPU memory than a small GPU offers.",
    "A prompt cannot reliably teach substantial domain behavior at scale, and tuning is the stated goal."]
},

{
  id: "d1-023", d: 1, t: "1.2", s: "1.2.4", type: "single",
  sc: "A multi-tenant SaaS vendor has fine-tuned a separate LoRA adapter for each of 200 customers on the same base model. Most adapters are used rarely, and the vendor wants to avoid running 200 dedicated endpoints.",
  q: "Which deployment approach is MOST cost-effective?",
  o: [
    "Run 200 separate real-time endpoints on large GPU instances, one per customer adapter",
    "Use one SageMaker AI endpoint with inference components so the base model is shared and adapters are loaded as needed",
    "Merge all adapters into a single model so that every customer receives the same combined behavior",
    "Run each customer's adapter in a separate Lambda function with the base model packaged inside the deployment"],
  a: [1],
  e: "SageMaker AI **inference components** let multiple models/adapters share the same instances and scale independently, so rarely used adapters do not need dedicated endpoints.",
  w: [
    "This leaves most GPUs idle and multiplies cost.",
    "Shared infrastructure with per-component scaling is the cost-effective design for many rarely used adapters.",
    "Merging destroys the per-customer customization that the adapters provide.",
    "A large base model cannot be packaged and run on Lambda."]
},

{
  id: "d1-024", d: 1, t: "1.2", s: "1.2.4", type: "single",
  sc: "A team ships a new fine-tuned model version monthly. Compliance requires that only approved versions reach production and that a bad release can be reversed quickly.",
  q: "Which design BEST meets the requirements?",
  o: [
    "Developers copy model artifacts to production S3 buckets by hand after manual testing in a notebook",
    "Register versions in SageMaker Model Registry with approval status, deploy approved versions through a pipeline with blue/green or canary and alarm-based rollback",
    "Deploy directly from a notebook and keep the previous model version on the developer's laptop in case of problems",
    "Replace the production endpoint in place with the new version and restore the old one from a backup if needed"],
  a: [1],
  e: "**Model Registry** provides versioning, lineage and approval gates; an automated pipeline with **blue/green or canary** deployment and alarm-triggered **rollback** gives safe, reversible releases.",
  w: [
    "Manual copying lacks approval controls and auditability.",
    "Registry approvals, automated deployment and alarm-driven rollback give controlled, auditable and reversible releases.",
    "Not controlled, reproducible or auditable.",
    "In-place replacement lacks gradual traffic shifting and fast automated rollback."]
},

{
  id: "d1-025", d: 1, t: "1.2", s: "1.2.4", type: "single",
  sc: "A model provider announces that the foundation model version in production will be deprecated in three months. The application is critical and has a golden evaluation dataset.",
  q: "What is the BEST lifecycle approach?",
  o: [
    "Wait for the model to stop working and then investigate, since deprecation timelines are often extended by providers",
    "Evaluate the recommended successor on the golden dataset, adjust prompts, shift traffic gradually through configuration, then retire the old version",
    "Immediately switch all traffic to the successor without testing to avoid any disruption from the deprecation",
    "Ignore the notice, because deprecation affects only new customers and existing applications are unaffected"],
  a: [1],
  e: "Plan **lifecycle management**: evaluate the replacement against your golden set, adapt prompts, roll out gradually with rollback ability (configuration), then retire the old model.",
  w: [
    "Waiting leads to an outage when the model is retired.",
    "Controlled, evidence-based migration with a rollback path.",
    "Untested wholesale cutover risks regressions in a critical application.",
    "Deprecated models eventually become unavailable to all customers."]
},

{
  id: "d1-026", d: 1, t: "1.2", s: "1.2.4", type: "single",
  sc: "A data science team fine-tuned an open-weight model (a supported architecture) on SageMaker AI. Application developers want to call it with the Amazon Bedrock runtime APIs without managing inference infrastructure.",
  q: "Which feature should they use?",
  o: [
    "Amazon Bedrock Custom Model Import",
    "Amazon Bedrock Guardrails with a custom word filter",
    "AWS Glue Data Quality",
    "Amazon Bedrock Prompt Flows"],
  a: [0],
  e: "**Custom Model Import** brings supported open-weight model artifacts into Bedrock so they can be invoked through Bedrock APIs without managing servers.",
  w: [
    "Import makes the supported open-weight model artifacts invocable through Bedrock APIs without managing servers.",
    "Guardrails filter content; they do not host models.",
    "Glue Data Quality validates datasets, not models.",
    "Prompt Flows chains prompts and does not host models."]
},

{
  id: "d1-027", d: 1, t: "1.2", s: "1.2.1", type: "multiple",
  sc: "A team is choosing between three candidate foundation models for a customer-support summarisation feature.",
  q: "Which TWO selection criteria give the MOST reliable evidence?",
  o: [
    "Accuracy and quality scores measured on a sample of the company's own support tickets",
    "Latency and cost per successful summary at the expected volume",
    "The number of parameters stated in each vendor's marketing material",
    "Whichever model was released most recently, since newer models are always better at summarization",
    "Which model the largest competitor is publicly reported to use for its own support product"],
  a: [0,1],
  e: "Select with **task-specific measured quality** plus **latency and cost** at your volume. Parameter count, release date or popularity say little about fit.",
  w: [
    "Your own data reveals real-world fit for this task.",
    "Operational and economic viability matter at your volume.",
    "Parameter count does not determine suitability for a specific task.",
    "Newest is not necessarily best for this task.",
    "Competitor choices reflect different needs, data and constraints."]
},

{
  id: "d1-028", d: 1, t: "1.2", s: "1.2.3", type: "single",
  sc: "A chat application must return an answer even when generation is down. The architecture team defined a primary model, a cheaper secondary model and a cached FAQ answer set.",
  q: "Which Step Functions design implements this ordered fallback?",
  o: [
    "A Map state that calls the primary, secondary and cached options in parallel for every request and returns the slowest result",
    "A Task state for the primary model with Retry for transient errors and a Catch that routes to the secondary model, then a cached-answer Lambda",
    "A Wait state that pauses the workflow for 24 hours between attempts and then retries the primary model",
    "A single Pass state that returns a static error message as soon as the primary model reports a failure"],
  a: [1],
  e: "Use `Retry` for transient faults and `Catch` to move through **ordered fallbacks**. This preserves quality when possible and degrades gracefully when not.",
  w: [
    "Calling all three every time wastes money and returns the slowest answer.",
    "Retry plus ordered Catch fallbacks give layered resilience and graceful degradation.",
    "A day-long wait is useless for interactive chat.",
    "A static error is not graceful degradation."]
}
);
