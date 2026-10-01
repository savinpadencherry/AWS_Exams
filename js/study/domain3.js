/* Domain 3 study modules (20% of the exam). */
window.STUDY = window.STUDY || {};
Object.assign(window.STUDY, {
'3.1': {
  goal: 'Stop harmful inputs and outputs, reduce hallucinations, layer defences, and detect prompt injection and jailbreaks.',
  big: 'Safety is **defence in depth**: no single filter is enough. Expect scenarios that combine pre-processing, model-level guardrails and post-processing, and ask which control addresses a specific risk (harmful content, hallucination, injection, structured-output failure).',
  concepts: [
    { h: 'Amazon Bedrock Guardrails', p: 'Configurable safeguards applied to **inputs and outputs**: **content filters** (hate, insults, sexual, violence, misconduct, plus **prompt attack** detection for jailbreaks and injection on inputs) with adjustable strength; **denied topics**; **word filters**; **sensitive information filters** (PII types and custom regex, with block or mask); **contextual grounding checks** (grounding and relevance thresholds, to catch hallucinations in RAG answers); **Automated Reasoning checks** (mathematically verified logic against your policy documents). Attach a guardrail to Converse/InvokeModel, Agents and Knowledge Bases, or call **`ApplyGuardrail`** independently on any text (including output from non-Bedrock models). Guardrails can run in **detect** mode to tune before enforcing.', trap: '"Apply safety to a model not hosted on Bedrock" or "check text without invoking a model" → ApplyGuardrail.' },
    { h: 'Custom moderation workflows', p: 'When you need logic beyond configuration (tenant-specific policies, human review of borderline content), use **Step Functions + Lambda**: classify, branch on risk score, send borderline items to a reviewer, log decisions. Real-time validation means checking before the model call and before returning the response.' },
    { h: 'Output safety and determinism', p: 'Use Guardrails to filter responses; use **specialised FM evaluations** (a judge model or toxicity classifier) to score content; and use **text-to-SQL** so numeric or factual answers come from **executing a query against the system of record** rather than from the model\'s memory, giving deterministic, auditable results. Validate generated SQL (allow-list, read-only role) before running it.' },
    { h: 'Reducing hallucinations', p: '**Ground** answers in retrieved sources with **Knowledge Bases** and require citations; use **contextual grounding checks**; add **confidence scoring** and **semantic-similarity verification** (compare the answer with the source passages and refuse or escalate when similarity is low); force **structured output** with a **JSON Schema** or tool-use schema so responses are parseable and constrained; lower temperature for factual tasks; instruct the model to say "I don\'t know".' },
    { h: 'Defense in depth', p: 'Layer: **API Gateway/WAF** (rate limits, request filtering) → **Comprehend** pre-filters (PII, toxicity, language) → **Guardrails** (model-level) → **Lambda post-processing** (schema, policy, link checks) → **API response filtering**. If one layer misses, another may catch.' },
    { h: 'Threat detection', p: '**Prompt injection** hides instructions in user input or retrieved documents ("ignore previous instructions"). **Jailbreaks** try to bypass policy. Mitigate with the Guardrails prompt-attack filter, input sanitisation, delimiting untrusted content, least-privilege tool access, output validation, **safety classifiers**, and **automated adversarial testing** (red-team prompt suites run in CI). Treat retrieved content as untrusted.' }
  ],
  tables: [{ title: 'Risk to control', head: ['Risk', 'Primary control'], rows: [
    ['Toxic or harmful user input/output', 'Guardrails content filters'],
    ['Jailbreak / prompt injection', 'Guardrails prompt-attack filter + sanitisation + least privilege'],
    ['Off-topic answers (for example investment advice)', 'Guardrails denied topics'],
    ['PII leakage', 'Guardrails sensitive-information filter / Comprehend'],
    ['Ungrounded RAG answers', 'Contextual grounding check + KB citations'],
    ['Policy/logic correctness (for example refund rules)', 'Automated Reasoning checks'],
    ['Wrong numbers', 'Text-to-SQL or tool execution, not model recall'],
    ['Unparseable output', 'JSON Schema / tool-use structured output + validation']] }],
  flow: { title: 'Defense-in-depth request path', steps: [
    { t: 'Edge', d: 'WAF + API Gateway throttling' },
    { t: 'Pre-filter', d: 'Comprehend PII/toxicity; sanitise' },
    { t: 'Guardrail (input)', d: 'Topics, content, prompt attack' },
    { t: 'FM + grounding', d: 'KB context, grounding check' },
    { t: 'Guardrail + post-process', d: 'Output filters, schema check, response filter' }] },
  patterns: [
    '"Reduce hallucinations in a RAG app" → contextual grounding check + citations.',
    '"Block a topic entirely" → denied topic.',
    '"Verify answer follows policy rules with logical proof" → Automated Reasoning checks.',
    '"Evaluate content for a non-Bedrock model" → ApplyGuardrail.',
    '"Deterministic answer from a database" → text-to-SQL.'],
  refs: [['Bedrock Guardrails', 'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html'], ['ApplyGuardrail', 'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-use-independent-api.html']]
},

'3.2': {
  goal: 'Isolate networks, enforce least privilege and granular data access, detect and protect PII, and apply retention.',
  big: 'Data security for GenAI means protecting data **in transit, at rest, in prompts and in logs**. The recurring services: **VPC endpoints (PrivateLink), IAM, KMS, Lake Formation, Comprehend, Macie, Guardrails and S3 Lifecycle**.',
  concepts: [
    { h: 'Protected environments', p: 'Use **interface VPC endpoints (AWS PrivateLink)** for `bedrock`, `bedrock-runtime`, `bedrock-agent` and `bedrock-agent-runtime` so traffic never traverses the public internet; add **endpoint policies** to restrict allowed actions and resources. Use **IAM** least privilege and permission boundaries; **SCPs** to limit models or Regions org-wide; **KMS customer-managed keys** for custom models, knowledge bases, agents and logs. **Lake Formation** provides **fine-grained** (database, table, column, row, cell) access to data lake sources feeding FMs. **CloudWatch** and CloudTrail monitor access. Bedrock does not use your prompts or completions to train base models and does not share them with model providers.', trap: '"Without traversing the internet" → VPC interface endpoints (PrivateLink). "Column- or row-level access to data" → Lake Formation.' },
    { h: 'Privacy-preserving systems', p: '**Amazon Comprehend** detects and redacts **PII** in text. **Amazon Macie** discovers sensitive data in **S3** at rest (find PII in training or knowledge-base buckets before ingestion). **Guardrails sensitive-information filters** block or mask PII in prompts and responses. Bedrock\'s native privacy: data is not stored for training; with **model invocation logging off by default**, you decide whether prompts/responses are logged and where. **S3 Lifecycle** rules enforce retention (expire or archive old documents and logs).' },
    { h: 'Privacy with utility', p: 'Strip identity but keep meaning: **masking/redaction** (replace names with placeholders), **tokenisation or pseudonymisation** (reversible mapping stored separately), **anonymisation**, and **data minimisation** (send only needed fields). Redact on the way in (before the model) and out (before display or logging). Test that redaction does not destroy the signal the model needs.' }
  ],
  tables: [{ title: 'PII tools compared', head: ['Tool', 'Works on', 'Typical use'], rows: [
    ['Comprehend PII', 'Text you send it', 'Detect/redact PII in prompts, documents, transcripts'],
    ['Macie', 'Data stored in S3', 'Discover sensitive data in buckets before ingestion'],
    ['Guardrails sensitive info', 'Live prompts and responses', 'Block/mask PII at inference time'],
    ['Lake Formation', 'Data lake tables/columns/rows', 'Who may read which data'],
    ['KMS CMK', 'Data at rest', 'Control and audit encryption keys']] }],
  flow: { title: 'Private, least-privilege FM access', steps: [
    { t: 'App in VPC', d: 'Private subnets, no internet route required' },
    { t: 'VPC endpoint', d: 'bedrock-runtime via PrivateLink + endpoint policy' },
    { t: 'IAM role', d: 'InvokeModel only on approved models' },
    { t: 'Data layer', d: 'Lake Formation permissions, KMS encryption' },
    { t: 'Monitor', d: 'CloudTrail + CloudWatch alarms' }] },
  patterns: [
    '"Keep traffic off the public internet" → interface VPC endpoints.',
    '"Find PII sitting in S3 buckets" → Macie.',
    '"Redact PII in text before sending to the model" → Comprehend or Guardrails.',
    '"Delete data after 90 days" → S3 Lifecycle.',
    '"Column-level restrictions for analysts and models" → Lake Formation.'],
  refs: [['Bedrock and VPC endpoints', 'https://docs.aws.amazon.com/bedrock/latest/userguide/usingVPC.html'], ['Bedrock data protection', 'https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html'], ['Amazon Macie', 'https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html']]
},

'3.3': {
  goal: 'Document, trace, audit and continuously monitor GenAI systems for compliance and policy adherence.',
  big: 'Governance answers four questions for auditors: **what model, trained/grounded on which data, did what, and who approved it**. Think documentation (model cards), lineage (Glue), audit trails (CloudTrail), decision logs (CloudWatch Logs) and ongoing monitoring (drift, misuse, bias).',
  concepts: [
    { h: 'Compliance frameworks', p: '**SageMaker Model Cards** (also programmatic via API) capture intended use, training data, evaluation results, limitations and risk rating. **AWS Glue** and its **Data Catalog** track datasets and **lineage**. **Metadata tagging** records data source, owner, sensitivity and approval status. **CloudWatch Logs** collect comprehensive **decision logs** (inputs, outputs, model/prompt version, guardrail results) subject to privacy rules.' },
    { h: 'Data source tracking', p: 'Register sources in the **Glue Data Catalog**; embed **source attribution metadata** in chunks (document ID, URL, version, timestamp) so every generated answer can cite where facts came from; use **CloudTrail** for immutable audit of API activity (who invoked, changed or deleted what). CloudTrail records API calls, not prompt content; use **model invocation logging** for content.', trap: 'CloudTrail = who did what API call. Model invocation logs = prompt and response content, tokens and metadata.' },
    { h: 'Organizational governance', p: 'Policies map to controls: acceptable-use rules to Guardrails; approval of new models to a process (Service Catalog products, SCPs restricting model access to approved IDs, IAM Access Analyzer to validate policies); regulatory requirements to data residency and retention settings; responsible-AI principles to evaluation gates. Centralise through a governance board and reusable, approved building blocks (**AWS Service Catalog**).' },
    { h: 'Continuous monitoring', p: 'Detect **misuse** (anomalous usage by user or tenant, policy violations from Guardrails metrics), **drift** (input or output distribution changes, via SageMaker Model Monitor for ML endpoints or custom metrics comparing response baselines), and **bias drift**. Automate **alerting and remediation** (CloudWatch alarms → SNS/EventBridge → Lambda that disables a key, tightens a guardrail or rolls back). **Token-level redaction** and **response logging** keep sensitive text out of logs while preserving audit value; **AI output policy filters** enforce rules at the response edge.' }
  ],
  tables: [{ title: 'Which record answers which audit question', head: ['Question', 'Evidence source'], rows: [
    ['What is this model for and what are its limits?', 'Model card'],
    ['Where did this training/grounding data come from?', 'Glue Data Catalog + lineage + metadata tags'],
    ['Who called or modified the model/prompt/guardrail?', 'CloudTrail'],
    ['What did the model receive and answer?', 'Model invocation logging / CloudWatch Logs'],
    ['Has behaviour drifted or become biased?', 'Model Monitor / custom CloudWatch metrics / evaluation jobs']] }],
  flow: { title: 'Governance loop', steps: [
    { t: 'Policy', d: 'Responsible-AI and regulatory rules defined' },
    { t: 'Document', d: 'Model cards, lineage, tags' },
    { t: 'Enforce', d: 'IAM/SCP, Guardrails, approved catalog' },
    { t: 'Observe', d: 'CloudTrail, invocation logs, metrics' },
    { t: 'Remediate', d: 'Alarms trigger automated or human response' }] },
  patterns: [
    '"Audit who invoked a model" → CloudTrail.',
    '"Track data lineage" → AWS Glue (Data Catalog).',
    '"Document model limitations for compliance" → SageMaker Model Cards.',
    '"Detect bias or data drift over time" → Model Monitor / Clarify-style monitoring + alarms.',
    '"Cite sources in generated content" → source attribution metadata + KB citations.'],
  refs: [['SageMaker Model Cards', 'https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html'], ['Bedrock model invocation logging', 'https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html'], ['Bedrock CloudTrail logging', 'https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html']]
},

'3.4': {
  goal: 'Make FM behaviour transparent, fair and policy-compliant, and prove it with evaluation.',
  big: 'Responsible AI at the professional level is **engineering**: show users why the system answered, measure fairness, and enforce policy automatically.',
  concepts: [
    { h: 'Transparency', p: 'Give users **evidence presentation** (citations and source links), **reasoning displays** (a brief explanation of the steps or sources used), and **confidence indicators** (CloudWatch custom metrics to track and quantify uncertainty, thresholds that route low-confidence answers to review). **Bedrock Agents tracing** exposes the agent\'s reasoning steps, tool calls and observations for debugging and explanation.' },
    { h: 'Fairness evaluation', p: 'Test outputs across demographic groups with matched prompts and compare. Use **predefined fairness metrics**, **Bedrock Model Evaluations** (including **LLM-as-a-judge** with rubrics such as stereotyping or harmfulness), and **systematic A/B testing** of prompt or model variants using **Prompt Management** variants or **Prompt Flows**. Track metrics over time in CloudWatch so regressions are visible.' },
    { h: 'Policy-compliant AI', p: 'Translate written policy into **Guardrails** (denied topics, filters, grounding), **model cards** that document limits and intended use, and **Lambda-based automated compliance checks** that run on outputs or in CI to flag violations before release.', trap: 'Explainability for FMs is mostly about sources, traces and rationale shown to users, not about extracting feature importances as in traditional ML.' }
  ],
  tables: [{ title: 'Principle to implementation', head: ['Principle', 'AWS implementation'], rows: [
    ['Transparency', 'Citations from KB, agent traces, reasoning display'],
    ['Fairness', 'Matched-prompt tests, LLM-as-a-judge, A/B with Prompt Management'],
    ['Accountability', 'Model cards, audit logs, approval gates'],
    ['Safety', 'Guardrails, adversarial testing'],
    ['Privacy', 'PII filters, retention, VPC isolation']] }],
  flow: { title: 'Fairness testing loop', steps: [
    { t: 'Build test set', d: 'Matched prompts across groups' },
    { t: 'Evaluate', d: 'Bedrock Model Evaluations + LLM judge' },
    { t: 'Compare', d: 'A/B variants in Prompt Management/Flows' },
    { t: 'Fix', d: 'Prompt, guardrail, data or model change' },
    { t: 'Track', d: 'CloudWatch metrics over time' }] },
  patterns: [
    '"Show users where an answer came from" → citations / source attribution.',
    '"Automatically assess bias at scale" → LLM-as-a-judge evaluation.',
    '"Compare two prompts for fairness" → A/B test with Prompt Management/Flows.',
    '"Show the agent\'s reasoning" → Bedrock agent tracing.'],
  refs: [['Model evaluation', 'https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html'], ['Agent trace', 'https://docs.aws.amazon.com/bedrock/latest/userguide/trace-events.html'], ['Responsible AI at AWS', 'https://aws.amazon.com/ai/responsible-ai/']]
}
});
