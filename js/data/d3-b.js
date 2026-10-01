/* Domain 3 questions: Task 3.3 (governance and compliance) and Task 3.4 (responsible AI). */
(window.QBANK = window.QBANK || []).push(
{
  id: "d3-039", d: 3, t: "3.3", s: "3.3.1", type: "single",
  sc: "A regulated lender must document, for each deployed fine-tuned model, its intended use, training data summary, evaluation results and known limitations, and keep this documentation versioned alongside the model.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Create SageMaker Model Cards (programmatically through the API) linked to each model version",
    "Maintain a shared slide deck of model documentation that the risk team updates manually each quarter",
    "Use AWS Cost Explorer reports, tagged by model name, as the record of each model's intended use and limits",
    "Publish an Amazon CloudFront distribution that serves a static page describing the models in production"],
  a: [0],
  e: "**SageMaker Model Cards** capture intended use, data, evaluation and risk information in a structured, versionable form that can be created through the API.",
  w: [
    "Structured, programmatic documentation tied to model versions.",
    "Manual slides drift and lack structure or version linkage.",
    "Cost Explorer shows spend, not intended use or limitations.",
    "CloudFront is a CDN and does not provide governed, versioned documentation."]
},

{
  id: "d3-040", d: 3, t: "3.3", s: "3.3.1", type: "single",
  sc: "Auditors ask which source datasets were used to build the training and grounding data for a model, including transformations applied along the way.",
  q: "Which capability provides this traceability?",
  o: [
    "AWS Glue Data Catalog with Glue lineage tracking, plus metadata tags on datasets",
    "Amazon Polly recordings of the data engineers describing each dataset and transformation",
    "AWS WAF logs that record every request that read the training and grounding data",
    "Amazon Route 53 query logs that show which data sources the pipeline contacted"],
  a: [0],
  e: "**Glue** registers datasets in the **Data Catalog** and can track **lineage** through jobs; tags record ownership and sensitivity.",
  w: [
    "Lineage and cataloguing of data sources and transformations.",
    "Polly generates speech and does not track lineage.",
    "WAF logs record web requests, not data lineage.",
    "DNS logs do not describe datasets or transformations."]
},

{
  id: "d3-041", d: 3, t: "3.3", s: "3.3.2", type: "single",
  sc: "A knowledge assistant's answers must show where each fact came from, including document name, version and publication date, so reviewers can verify claims.",
  q: "Which design supports this?",
  o: [
    "Store source attribution metadata (document ID, URL, version, date) with each chunk, return it with retrieved passages, and show citations with the answer",
    "Remove all metadata at ingestion to save storage, and rely on the model to describe where it learned each fact",
    "Ask the model to guess the source document after it has written the answer, based on its general knowledge",
    "Show only the model name and version next to each answer, since it identifies how the answer was produced"],
  a: [0],
  e: "Carry **source attribution metadata** through ingestion and retrieval, and surface it with the generated answer for traceability.",
  w: [
    "Verifiable provenance for each answer.",
    "Removing metadata destroys traceability.",
    "Models may fabricate sources.",
    "The model name does not identify the evidence."]
},

{
  id: "d3-042", d: 3, t: "3.3", s: "3.3.2", type: "single",
  sc: "During an investigation, the security team must determine which IAM principal changed a guardrail configuration and who called Bedrock model APIs last week. They do not need prompt content.",
  q: "Which service provides this audit information?",
  o: [
    "AWS CloudTrail",
    "Amazon Macie, which reports which principal changed each guardrail and model setting last week",
    "AWS Cost Anomaly Detection, which lists the IAM principals responsible for unusual model usage",
    "Amazon Kendra, which indexes the console activity and answers questions about who changed what"],
  a: [0],
  e: "**CloudTrail** records API activity (who, what, when, from where). For prompt and response **content**, use model invocation logging instead.",
  w: [
    "The authoritative audit trail of API calls: who, what, when.",
    "Macie discovers sensitive data in S3.",
    "Cost Anomaly Detection flags unusual spend, not configuration changes by principal.",
    "Kendra provides enterprise search and does not record API activity."],
  trap: "CloudTrail = who did what. Invocation logs = what the model received and returned."
},

{
  id: "d3-043", d: 3, t: "3.3", s: "3.3.1", type: "single",
  sc: "For regulatory review, the company must be able to reconstruct each AI decision: the model and prompt version used, retrieved documents, guardrail outcomes and final answer, while respecting privacy rules.",
  q: "Which design is MOST appropriate?",
  o: [
    "Emit structured decision logs with a correlation ID, model ID, prompt version, retrieved document IDs and guardrail results, with access control, redaction and retention",
    "Keep no records of individual decisions, to reduce legal liability and the storage cost of the project over its lifetime",
    "Log only the final answer text, without any context about the model, the prompt or the retrieved documents that produced it",
    "Rely on screenshots that users and agents take when they believe that an answer might need to be reviewed by the compliance team"],
  a: [0],
  e: "**Structured decision logging** with correlation IDs provides traceability. Protect it with access control, redaction and retention rules.",
  w: [
    "Enables reconstruction of each decision while managing privacy.",
    "No records means no accountability.",
    "Missing context prevents reconstruction.",
    "Screenshots are unreliable and incomplete."]
},

{
  id: "d3-044", d: 3, t: "3.3", s: "3.3.3", type: "single",
  sc: "The enterprise AI governance board has approved three foundation models and two Regions. It wants to prevent any account in the organization from using other models or Regions.",
  q: "Which control enforces this organization-wide?",
  o: [
    "AWS Organizations service control policies (and IAM conditions) that deny Bedrock model access except for approved model ARNs and Regions",
    "An email from the governance board asking teams to use only the approved models and Regions in their applications",
    "A dashboard of model usage by account that the governance board reviews at the end of each month",
    "A WAF rule on an unrelated public API that blocks requests that mention models outside the approved list"],
  a: [0],
  e: "**SCPs** apply preventive guardrails across accounts. Restrict Bedrock actions to approved models and Regions.",
  w: [
    "Preventive, centrally enforced boundaries across accounts.",
    "Requests are not enforcement.",
    "Dashboards are detective, not preventive.",
    "WAF does not control Bedrock model access."]
},

{
  id: "d3-045", d: 3, t: "3.3", s: "3.3.4", type: "single",
  sc: "A deployed model that screens loan-application text must be monitored for changes in the distribution of inputs and for emerging bias between demographic groups. Alerts should be raised automatically.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Configure monitoring (for example SageMaker Model Monitor bias and drift checks or custom metrics) with CloudWatch alarms that notify and trigger remediation",
    "Review a manual sample of decisions once every two years during a scheduled internal audit of the lending process",
    "Disable monitoring to reduce cost, and investigate only if a regulator or a customer raises a complaint about decisions",
    "Retrain the model every hour regardless of what the metrics show, so that it is always up to date with the latest data"],
  a: [0],
  e: "Continuous **drift and bias monitoring** with **alarms and automated remediation** supports ongoing governance and audit readiness.",
  w: [
    "Automated detection, alerting and response for drift and bias.",
    "A two-year sample cannot catch drift.",
    "Removes oversight.",
    "Blind retraining is costly and may worsen issues."]
},

{
  id: "d3-046", d: 3, t: "3.3", s: "3.3.4", type: "single",
  sc: "A foundation-model assistant is monitored for semantic drift: the team wants to detect when the distribution of response topics and sentiment shifts relative to an approved baseline, and open a ticket automatically.",
  q: "Which design is MOST appropriate?",
  o: [
    "A scheduled job embeds a sample of responses, compares them with the baseline, publishes a drift metric to CloudWatch, and an alarm opens a ticket via EventBridge",
    "Wait for customer complaints about changes in the assistant's tone and topics before looking into the possible causes",
    "Check the temperature setting each month and assume that the responses have not changed if the setting is unchanged",
    "Delete all old responses regularly so that there is no history to compare against the current behavior of the assistant"],
  a: [0],
  e: "**Output drift monitoring** uses a baseline, measures distributional change, and wires alarms to automated workflows.",
  w: [
    "Measured, automated drift detection with an automated response.",
    "Reactive and slow.",
    "Temperature is a setting and not a drift measure.",
    "Deleting data destroys the evidence needed to detect drift."]
},

{
  id: "d3-047", d: 3, t: "3.3", s: "3.3.4", type: "single",
  sc: "Logs of conversations are needed for audits, but they contain personal data. The company wants to retain evidence while minimising exposure of personal details in stored logs.",
  q: "Which approach is BEST?",
  o: [
    "Apply token-level redaction (masking sensitive tokens) before or during logging, retaining the redacted record and a hashed identifier",
    "Store full unredacted conversation logs in a publicly readable location so that auditors can find them easily",
    "Never log any conversation content, even for interactions that are subject to regulatory audit",
    "Log only the user's password and a timestamp, since these are enough to identify each conversation later"],
  a: [0],
  e: "**Redaction before logging** retains useful audit evidence while limiting sensitive data exposure.",
  w: [
    "Preserves auditability with reduced exposure of personal data.",
    "Public storage exposes personal data.",
    "No logging removes the audit evidence the company needs.",
    "Logging passwords is a severe security failure."]
},

{
  id: "d3-048", d: 3, t: "3.3", s: "3.3.4", type: "single",
  sc: "A company wants every response sent to customers to pass a final policy check (for example, no unapproved claims about product performance) that is implemented in code and can be updated independently from the model.",
  q: "Where should this check run?",
  o: [
    "A post-processing policy filter, for example a Lambda function in the response path that validates responses against policy rules and blocks or rewrites them",
    "Add the rules to the training data only, trusting the model to apply them correctly in every possible conversation it has",
    "Edit the model's weights by hand to remove the ability to make unapproved claims about product performance in responses",
    "Implement the check in the user's browser so that responses are validated by the client before they are displayed to the user"],
  a: [0],
  e: "A **post-processing policy filter** gives an independent, updatable enforcement point separate from the model.",
  w: [
    "Independent, updatable, code-level enforcement before delivery.",
    "Training data cannot guarantee runtime compliance, and cannot be updated independently.",
    "Hand-editing weights is impractical and unverifiable.",
    "Browser-side controls can be bypassed."]
},

{
  id: "d3-049", d: 3, t: "3.3", s: "3.3.2", type: "single",
  sc: "An investigator asks which version of the knowledge base content and which prompt version produced a particular answer three months ago.",
  q: "What should have been recorded at answer time?",
  o: [
    "A trace record with the answer ID, prompt version, model ID, knowledge base ingestion version or timestamp, and retrieved chunk identifiers",
    "Only the user's display name and the time of the request, since these identify who received the answer and when",
    "The browser type and operating system of the client, since they identify the environment in which the request was made",
    "Nothing at answer time, since the model can reconstruct what it was given if it is asked about it three months later"],
  a: [0],
  e: "Traceability requires **versioned lineage** captured at inference time: prompt, model, data source version and retrieved evidence.",
  w: [
    "Complete versioned lineage for later reconstruction.",
    "Display names do not identify versions.",
    "Client environment details are irrelevant to how the answer was produced.",
    "Models do not retain per-request history."]
},

{
  id: "d3-050", d: 3, t: "3.3", s: "3.3.3", type: "multiple",
  sc: "An organization is building a governance framework for GenAI across business units.",
  q: "Which TWO elements belong in the framework?",
  o: [
    "Approved model and prompt catalogs with change approval workflows",
    "Policies mapped to technical controls such as guardrails, IAM restrictions and monitoring, with named owners",
    "Allowing each business unit to bypass the review process when it is working to a tight deadline",
    "Removing audit logging for AI services to reduce storage cost, since the model providers keep their own logs",
    "Training models on all available customer data without review, since more data always improves quality"],
  a: [0,1],
  e: "Governance combines **approved, versioned assets with change control** and **policies translated into enforceable, owned controls**.",
  w: [
    "Controls what may be used and how it changes.",
    "Policies become enforceable and accountable.",
    "Bypassing review defeats governance.",
    "Audit logs are essential and providers do not hold your audit trail.",
    "Unreviewed data use creates compliance and privacy risk."]
},

{
  id: "d3-051", d: 3, t: "3.4", s: "3.4.1", type: "single",
  sc: "A financial-advice assistant's regulators require users to be able to see which documents informed each recommendation.",
  q: "Which feature BEST provides transparency?",
  o: [
    "Return citations from the knowledge base and display the source documents with each answer",
    "Hide the retrieved documents from users to keep the interface simple and prevent them from second-guessing the answer",
    "Increase the temperature so that answers are more varied and users see different explanations on each request",
    "Show a generic disclaimer under every answer saying the content might be wrong, without any further detail"],
  a: [0],
  e: "**Evidence presentation** (citations and source links) lets users verify the basis of an answer.",
  w: [
    "Direct source attribution lets users verify the basis of an answer.",
    "Hiding evidence reduces transparency.",
    "Temperature has no transparency effect.",
    "A generic disclaimer shows no evidence."]
},

{
  id: "d3-052", d: 3, t: "3.4", s: "3.4.1", type: "single",
  sc: "An agent decides which tools to call. Reviewers want a record of its reasoning steps and tool calls to explain a decision to an auditor.",
  q: "Which capability helps MOST?",
  o: [
    "Bedrock agent tracing, which exposes rationale, tool invocations, parameters and observations",
    "A larger knowledge base so that the agent has more information available when it explains its decisions",
    "Provisioned Throughput so that the agent has enough capacity to record its reasoning during each request",
    "A CloudFront cache in front of the agent so that repeated decisions can be shown to reviewers quickly"],
  a: [0],
  e: "**Agent trace** events provide the reasoning trail for explaining agent behavior.",
  w: [
    "Explicit reasoning and action trail for each step.",
    "Data volume does not provide explanations.",
    "Capacity does not create explanations.",
    "Caching is unrelated to explaining decisions."]
},

{
  id: "d3-053", d: 3, t: "3.4", s: "3.4.1", type: "single",
  sc: "The business wants to flag answers where the system is uncertain and route them to a human, and to track the proportion of uncertain answers over time.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Compute a confidence indicator (grounding score or similarity), publish it to CloudWatch, route low-confidence answers to review, and alarm on rising uncertainty",
    "Always present answers as certain so that users trust the assistant and do not ask for human review of the content",
    "Disable monitoring so that the team is not distracted by uncertainty metrics during the first months after the launch",
    "Use the temperature value as the confidence measure and send answers below a temperature threshold to a human reviewer"],
  a: [0],
  e: "**Confidence metrics** quantify uncertainty; thresholds drive human review, and CloudWatch tracks trends.",
  w: [
    "Measurable uncertainty with routing and trend tracking.",
    "Hides risk from users.",
    "No data on uncertainty means no improvement.",
    "Temperature is an input parameter, not a confidence measure."]
},

{
  id: "d3-054", d: 3, t: "3.4", s: "3.4.2", type: "single",
  sc: "A hiring-assistant prompt generates candidate summaries. The company wants to test whether summaries differ in tone or content when only the candidate's name or demographic indicator changes.",
  q: "Which evaluation approach is MOST appropriate?",
  o: [
    "Create matched prompt pairs that differ only in the attribute, generate outputs at scale, and score differences with an LLM judge rubric and statistics",
    "Evaluate a single hand-picked example for each demographic group and review the responses informally as a team",
    "Trust the model because the provider states that it was trained with responsible AI practices and has been tested",
    "Skip evaluation until after launch so that real candidates can reveal any problems that exist in the generated summaries"],
  a: [0],
  e: "**Counterfactual (matched-pair) testing** with automated judging quantifies fairness differences systematically.",
  w: [
    "Controlled counterfactual comparison at scale.",
    "A single example is anecdotal.",
    "Provider claims are not evidence for your use case.",
    "Skipping evaluation leaves bias undetected and affects real candidates."]
},

{
  id: "d3-055", d: 3, t: "3.4", s: "3.4.2", type: "single",
  sc: "Two prompt versions are candidates for a loan-explanation assistant. The team wants to compare them for fairness and quality using systematic variants and measured outcomes.",
  q: "Which tooling supports a structured A/B comparison on Amazon Bedrock?",
  o: [
    "Prompt Management variants (or Prompt Flows) combined with Bedrock Model Evaluations on a shared dataset",
    "Two untracked text files edited by different developers, tested by whoever has time to try them",
    "A single prompt tested once on a few examples, with the second candidate assumed to be equivalent",
    "AWS Snowball Edge, which runs both prompts offline and returns the better one to the team"],
  a: [0],
  e: "**Prompt variants** compared with **Model Evaluations** on identical data enable controlled A/B testing.",
  w: [
    "Structured variants with identical evaluation data enable a controlled A/B comparison.",
    "Untracked files are not controlled testing.",
    "A single test lacks comparison.",
    "Snowball Edge transfers data and runs edge compute; it does not compare prompts."]
},

{
  id: "d3-056", d: 3, t: "3.4", s: "3.4.2", type: "multiple",
  sc: "A team is selecting how to measure fairness and harmful stereotypes for a generative assistant before launch.",
  q: "Which TWO approaches are appropriate?",
  o: [
    "Use Bedrock Model Evaluations with LLM-as-a-judge metrics such as stereotyping and harmfulness on a representative dataset",
    "Track fairness metrics over time in CloudWatch so that regressions after changes are visible",
    "Evaluate only overall accuracy on a single demographic group, which is the most commonly used group",
    "Assume fairness because the training dataset is large and contains examples from many sources",
    "Remove human review of the evaluation results to avoid introducing reviewer bias into the process"],
  a: [0,1],
  e: "Use **dataset-based, multi-metric evaluation** and **ongoing tracking**. One group's accuracy or dataset size alone does not show fairness.",
  w: [
    "Automated judged metrics on representative data.",
    "Trends reveal regressions.",
    "Single-group accuracy hides disparities.",
    "Dataset size does not guarantee fairness.",
    "Human review adds important perspective."]
},

{
  id: "d3-057", d: 3, t: "3.4", s: "3.4.3", type: "single",
  sc: "Internal policy states that the assistant must not make medical diagnoses and must always include a safety disclaimer for health topics. The policy needs to be enforced and its limits documented for reviewers.",
  q: "Which combination is MOST appropriate?",
  o: [
    "Guardrails (a denied topic for diagnosis plus response checks), a model card documenting limitations, and automated compliance checks in Lambda",
    "A comment in the source code explaining the policy to future developers, with a reminder to follow it",
    "A larger context window so that the assistant can read the full policy in every conversation",
    "Only a prompt instruction telling the model not to diagnose and to include a disclaimer on health topics"],
  a: [0],
  e: "Translate policy into **enforceable controls** (Guardrails), **documentation** (model card) and **automated verification** (compliance checks).",
  w: [
    "Enforcement, documentation and automated verification together.",
    "Comments are not controls.",
    "Context size is unrelated to enforcement.",
    "Prompts alone are not reliable enforcement."]
},

{
  id: "d3-058", d: 3, t: "3.4", s: "3.4.3", type: "single",
  sc: "Before each release, the company wants an automated test that generates responses to a policy test set and fails the deployment if any response violates the written responsible-AI policy.",
  q: "Which implementation is MOST suitable?",
  o: [
    "A CI/CD stage (CodeBuild) running a Lambda- or model-based compliance checker against the test set and failing the pipeline on violations",
    "A manual spot check by a team member once a year, with notes saved in the project folder",
    "Publishing the responsible-AI policy as a PDF on the intranet so that developers can read it",
    "Letting each developer decide, case by case, whether a response seems to follow the written policy"],
  a: [0],
  e: "**Automated compliance gates** in CI/CD make policy adherence a repeatable pre-release requirement.",
  w: [
    "A repeatable, enforced pre-release gate.",
    "Annual spot checks are infrequent.",
    "Documentation does not test behavior.",
    "Inconsistent and unauditable."]
},

{
  id: "d3-059", d: 3, t: "3.4", s: "3.4.1", type: "multiple",
  sc: "Designers want users to understand and trust AI answers in a medical information product.",
  q: "Which TWO UI and system features improve transparency?",
  o: [
    "Visible source citations and a clear indication that the content is AI-generated",
    "A brief explanation of why the answer was given, including which sources were used",
    "Hiding uncertainty so that the assistant appears confident and users trust the answers more",
    "Removing all disclaimers to keep the interface clean and avoid confusing patients",
    "Preventing users from viewing the sources, to keep them from drawing incorrect conclusions from them"],
  a: [0,1],
  e: "Transparency means **disclosure, evidence and rationale**, not hiding uncertainty or sources.",
  w: [
    "Disclosure and evidence.",
    "Rationale and sources are visible.",
    "Concealing uncertainty undermines trust.",
    "Disclaimers inform appropriate reliance.",
    "Blocking sources defeats transparency."]
},

{
  id: "d3-060", d: 3, t: "3.4", s: "3.4.2", type: "single",
  sc: "Evaluation at launch showed acceptable fairness, but a later prompt change and a model update might reintroduce disparities. The team wants early detection.",
  q: "What should they implement?",
  o: [
    "Re-run the fairness evaluation suite automatically on every prompt or model change and on a schedule, with CloudWatch alarms on regressions",
    "Trust the evaluation done at launch permanently, since the design of the assistant has not fundamentally changed since then",
    "Run fairness checks only after a public complaint has been received about the assistant's answers or its behavior",
    "Block every model update so that the evaluated version never changes, even when security fixes are available from the provider"],
  a: [0],
  e: "**Continuous evaluation** with metrics and alarms catches fairness regressions after changes.",
  w: [
    "Ongoing, automated detection of fairness regressions.",
    "One-time results do not cover later changes.",
    "Reactive and harmful.",
    "Blocking all updates prevents necessary improvements and security fixes."]
}
);
