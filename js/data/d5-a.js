/* Domain 5 questions: Task 5.1 (evaluation systems) and Task 5.2 (troubleshooting). */
(window.QBANK = window.QBANK || []).push(
{
  id: "d5-001", d: 5, t: "5.1", s: "5.1.1", type: "single",
  sc: "A team evaluates a summarisation model using only exact-match accuracy against reference summaries. Many good summaries are marked wrong because they use different wording.",
  q: "Which change gives a more meaningful assessment?",
  o: [
    "Combine overlap metrics such as ROUGE with semantic similarity (for example BERTScore) and LLM-as-a-judge ratings for relevance, factual accuracy and fluency",
    "Keep exact match and lower the pass threshold",
    "Measure only response length",
    "Evaluate only latency"],
  a: [0],
  e: "Open-ended generation needs **multiple quality dimensions**: overlap metrics, semantic metrics and judged qualities. Exact match penalises valid paraphrases.",
  w: [
    "Captures lexical overlap, meaning and judged quality.",
    "Still measures the wrong thing.",
    "Length says nothing about correctness.",
    "Latency is not quality."]
},

{
  id: "d5-002", d: 5, t: "5.1", s: "5.1.1", type: "single",
  sc: "A team needs an automated metric that rewards responses that preserve the meaning of a reference answer even when phrased very differently.",
  q: "Which metric is MOST suitable?",
  o: [
    "BERTScore, which compares contextual embeddings for semantic similarity",
    "Exact string equality",
    "Character count",
    "Token throughput"],
  a: [0],
  e: "**BERTScore** measures semantic similarity using embeddings, unlike n-gram overlap metrics (BLEU, ROUGE) that focus on shared wording.",
  w: [
    "Semantic similarity beyond surface wording.",
    "Fails on paraphrases.",
    "Unrelated to meaning.",
    "A performance metric, not a quality metric."]
},

{
  id: "d5-003", d: 5, t: "5.1", s: "5.1.2", type: "single",
  sc: "A company is choosing among three foundation models for question answering and wants a repeatable comparison on its own dataset of 500 prompts with reference answers, with results stored for review.",
  q: "Which service capability should it use?",
  o: [
    "Amazon Bedrock Model Evaluations, an automatic evaluation job with a custom dataset in S3 and results written to S3",
    "Amazon Rekognition Custom Labels",
    "AWS Glue DataBrew",
    "AWS Transfer Family"],
  a: [0],
  e: "**Bedrock Model Evaluations** runs automatic, LLM-as-a-judge or human evaluations over your dataset and writes results to S3.",
  w: [
    "Purpose-built model comparison on your data.",
    "Rekognition Custom Labels trains image classifiers.",
    "DataBrew prepares data.",
    "Transfer Family moves files."]
},

{
  id: "d5-004", d: 5, t: "5.1", s: "5.1.5", type: "single",
  sc: "A team must score thousands of open-ended responses on helpfulness, completeness and harmfulness every week. Human review of all responses is too costly.",
  q: "Which approach is MOST suitable?",
  o: [
    "LLM-as-a-judge evaluations with defined rubrics, calibrated against a smaller human-rated sample",
    "Human review of every response",
    "Ignoring quality",
    "Counting punctuation marks"],
  a: [0],
  e: "**LLM-as-a-judge** scales qualitative scoring; **calibrate** against human ratings on a sample to verify agreement.",
  w: [
    "Scalable scoring with a human check on accuracy.",
    "Too costly at this volume.",
    "Leaves quality unmeasured.",
    "Not a quality measure."]
},

{
  id: "d5-005", d: 5, t: "5.1", s: "5.1.5", type: "single",
  sc: "A marketing team wants to judge whether generated copy matches a nuanced brand voice and emotional tone, which is subjective and hard to specify as rules.",
  q: "Which evaluation method is MOST appropriate?",
  o: [
    "Human-based evaluation with a defined rating rubric (optionally supplemented by LLM-as-a-judge at scale)",
    "Exact-match against one reference sentence",
    "Only latency measurement",
    "Only token counts"],
  a: [0],
  e: "Subjective qualities such as **brand voice** are best judged by **humans against a rubric**; an LLM judge can extend coverage.",
  w: [
    "Humans capture subjective nuance.",
    "One reference cannot represent acceptable variety.",
    "Speed is not voice quality.",
    "Tokens do not measure tone."]
},

{
  id: "d5-006", d: 5, t: "5.1", s: "5.1.2", type: "single",
  sc: "A new model scores better offline. The team wants to confirm real-world impact on resolution rate and customer satisfaction before replacing the current model for everyone.",
  q: "Which approach is BEST?",
  o: [
    "A/B test or canary release: route a small share of live traffic to the new model, compare business and quality metrics, and expand only if results hold",
    "Replace the model for all users immediately",
    "Rely only on offline scores",
    "Test with two internal employees"],
  a: [0],
  e: "**A/B and canary testing** measure real-world outcomes with limited blast radius and clear comparison.",
  w: [
    "Controlled live validation with rollback ability.",
    "Unvalidated full cutover is risky.",
    "Offline sets may not represent production behavior.",
    "Two users give no statistical evidence."]
},

{
  id: "d5-007", d: 5, t: "5.1", s: "5.1.9", type: "single",
  sc: "After each release, the team wants automated checks that simulate real user journeys (ask a question, get a grounded answer, escalate) from outside the system every 5 minutes and alert on failures.",
  q: "Which service is MOST appropriate?",
  o: [
    "Amazon CloudWatch Synthetics canaries scripted with the user workflow, with alarms on failures",
    "AWS Cost Explorer",
    "Amazon Macie",
    "AWS Snowcone"],
  a: [0],
  e: "**CloudWatch Synthetics** runs scripted canaries on a schedule to validate end-to-end workflows and alarm on failures.",
  w: [
    "Synthetic user workflows with alerting.",
    "Cost Explorer analyses spend.",
    "Macie finds sensitive data.",
    "Snowcone is edge storage and compute hardware."]
},

{
  id: "d5-008", d: 5, t: "5.1", s: "5.1.2", type: "single",
  sc: "Two models achieve similar quality scores. Model X is slower and costs more per request. The team must justify the choice to stakeholders.",
  q: "Which analysis is MOST appropriate?",
  o: [
    "A cost-performance comparison: quality score per dollar, token efficiency and latency-to-quality ratio, alongside business outcomes",
    "Choose the one with the longer name",
    "Pick the more expensive one because price implies quality",
    "Avoid comparison"],
  a: [0],
  e: "Combine **quality, cost, latency and business impact** for an evidence-based recommendation.",
  w: [
    "Balanced, quantifiable trade-off.",
    "Irrelevant.",
    "Price does not guarantee quality.",
    "No evidence for the decision."]
},

{
  id: "d5-009", d: 5, t: "5.1", s: "5.1.3", type: "single",
  sc: "Product managers want real users to rate answers and flag wrong ones so that the team can learn from production failures.",
  q: "Which design is MOST appropriate?",
  o: [
    "Add thumbs up/down and comment capture in the UI, store feedback with the trace ID through API Gateway into DynamoDB or S3, and add recurring failures to the evaluation set",
    "Ignore user feedback",
    "Collect feedback by phone only",
    "Delete negative feedback"],
  a: [0],
  e: "**User-centred evaluation** captures feedback linked to the exact interaction and feeds it back into the evaluation dataset.",
  w: [
    "Closed feedback loop with traceability.",
    "Wastes the best signal.",
    "Does not scale and loses linkage.",
    "Hides problems."]
},

{
  id: "d5-010", d: 5, t: "5.1", s: "5.1.3", type: "single",
  sc: "Domain experts must label and score hundreds of answers each week against a detailed rubric, using a managed workflow with a workforce they control.",
  q: "Which service helps organise this annotation work?",
  o: [
    "Amazon SageMaker Ground Truth (or a human-based evaluation workflow) with a private workforce",
    "AWS Direct Connect",
    "Amazon EFS",
    "Amazon SNS"],
  a: [0],
  e: "**Ground Truth** and human evaluation workflows support managed labeling and review with private workforces.",
  w: [
    "Managed human annotation and review.",
    "Direct Connect is networking.",
    "EFS is file storage.",
    "SNS is messaging."]
},

{
  id: "d5-011", d: 5, t: "5.1", s: "5.1.4", type: "single",
  sc: "The company wants any change to prompts, models or retrieval settings to be blocked from production if quality drops below thresholds on the golden dataset.",
  q: "Which implementation is MOST appropriate?",
  o: [
    "A CI/CD quality gate in CodePipeline that runs the evaluation (Bedrock Model Evaluations or custom checks in CodeBuild) and fails the stage below defined thresholds",
    "A manual review after deployment",
    "A weekly meeting",
    "Rely on developer judgement"],
  a: [0],
  e: "**Automated quality gates** enforce regression thresholds before release.",
  w: [
    "Prevents regressions from shipping.",
    "Detects problems after users see them.",
    "Not systematic.",
    "Inconsistent."]
},

{
  id: "d5-012", d: 5, t: "5.1", s: "5.1.5", type: "multiple",
  sc: "A RAG application is being evaluated. The team wants to understand both whether the right information is fetched and whether the answer uses it faithfully.",
  q: "Which TWO sets of measurements should be included?",
  o: [
    "Retrieval quality: context relevance and context coverage of the retrieved passages",
    "Generation quality: faithfulness to the retrieved context, correctness, completeness and citation quality",
    "Only the total number of documents indexed",
    "Only the time of day",
    "Only the model's parameter count"],
  a: [0,1],
  e: "Evaluate **retrieval and generation separately** so you can tell which component to fix.",
  w: [
    "Tests the retriever.",
    "Tests the generator against the evidence.",
    "Index size is not quality.",
    "Irrelevant.",
    "Irrelevant."]
},

{
  id: "d5-013", d: 5, t: "5.1", s: "5.1.5", type: "single",
  sc: "RAG evaluation shows context relevance is high (the right passages are retrieved) but faithfulness is low (the answers contradict the passages).",
  q: "Where should the team focus?",
  o: [
    "The generation step: prompt instructions to use only the context, grounding checks, model choice and temperature",
    "The chunking strategy",
    "The embedding dimensions",
    "The vector index sharding"],
  a: [0],
  e: "Good retrieval with unfaithful answers points to the **generator or prompt**, not the retriever.",
  w: [
    "Targets the failing component.",
    "Chunking affects retrieval, which is already good.",
    "Embeddings affect retrieval.",
    "Sharding affects retrieval performance, not answer faithfulness."]
},

{
  id: "d5-014", d: 5, t: "5.1", s: "5.1.5", type: "single",
  sc: "A judge model consistently prefers longer answers and the first answer shown in pairwise comparisons, even when a shorter or second answer is better according to human reviewers.",
  q: "What is the BEST mitigation?",
  o: [
    "Randomise answer order, add rubric instructions that penalise unnecessary length, and calibrate the judge against human-labelled samples",
    "Trust the judge without checks",
    "Always show the longest answer first",
    "Replace human labels with the judge permanently"],
  a: [0],
  e: "LLM judges can show **position and verbosity bias**. Mitigate with order randomisation, clear rubrics and calibration to human labels.",
  w: [
    "Addresses known biases with verification.",
    "Unverified bias persists.",
    "Amplifies the bias.",
    "Removes the ground truth you need to check against."]
},

{
  id: "d5-015", d: 5, t: "5.1", s: "5.1.6", type: "single",
  sc: "A team wants to test whether its retriever returns at least one relevant passage in the top 5 results for a labelled set of 300 queries, and to track retrieval latency.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Retrieval-only evaluation with relevance judgments, computing metrics such as recall@5 or hit rate and measuring latency percentiles",
    "Judge only the final answers' grammar",
    "Count the documents in the index",
    "Skip evaluation"],
  a: [0],
  e: "**Retrieval quality testing** uses labelled queries and metrics like recall@k/hit rate, plus latency measurements.",
  w: [
    "Direct measure of retrieval effectiveness and speed.",
    "Grammar does not evaluate retrieval.",
    "Size is not relevance.",
    "Leaves retrieval untested."]
},

{
  id: "d5-016", d: 5, t: "5.1", s: "5.1.7", type: "single",
  sc: "A team wants to determine how reliable its agent is across 200 scripted tasks, including whether it chooses the right tool with correct parameters and finishes the goal.",
  q: "Which metrics should be measured?",
  o: [
    "Task completion rate, tool selection and parameter accuracy, steps and cost per task, and reasoning quality from traces",
    "Only the number of lines of code",
    "Only the Region name",
    "Only the model's release date"],
  a: [0],
  e: "**Agent evaluation** examines outcomes and **trajectories**: completion, correct tool use, efficiency and reasoning quality.",
  w: [
    "Covers outcome and process.",
    "Code size is not agent quality.",
    "Irrelevant.",
    "Irrelevant."]
},

{
  id: "d5-017", d: 5, t: "5.1", s: "5.1.8", type: "single",
  sc: "Leadership wants a weekly report comparing candidate models on quality, cost and latency, and tracking trends in user satisfaction, delivered automatically.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Store evaluation results in S3/Athena, visualise with Amazon Quick or Managed Grafana dashboards showing model comparisons and trends, and schedule automated delivery",
    "A manually edited document each quarter",
    "Verbal updates only",
    "No reporting"],
  a: [0],
  e: "Automated pipelines and dashboards provide **consistent stakeholder reporting** with model comparison visualisations.",
  w: [
    "Repeatable, visual and automated.",
    "Slow and error-prone.",
    "Not auditable.",
    "Leaves stakeholders uninformed."]
},

{
  id: "d5-018", d: 5, t: "5.1", s: "5.1.9", type: "single",
  sc: "A model version is being upgraded. Before shifting all traffic, the team wants to detect increased hallucination rates and meaning changes in responses relative to the current version using identical test prompts.",
  q: "Which validation steps are MOST appropriate?",
  o: [
    "Run the golden dataset through both versions, compare hallucination/faithfulness scores and semantic similarity of outputs, and require thresholds before the canary expands",
    "Skip validation because upgrades are always better",
    "Compare only price",
    "Wait for user complaints"],
  a: [0],
  e: "**Deployment validation** compares versions on AI-specific measures (hallucination, semantic drift) before expanding traffic.",
  w: [
    "Pre-release evidence on the risks that matter.",
    "Upgrades can change behavior.",
    "Price ignores quality.",
    "Reactive and risky."]
},

{
  id: "d5-019", d: 5, t: "5.1", s: "5.1.2", type: "multiple",
  sc: "A team prepares an Amazon Bedrock model evaluation job.",
  q: "Which TWO statements are accurate?",
  o: [
    "Evaluation jobs can use built-in or custom prompt datasets stored in Amazon S3",
    "Evaluation can use programmatic metrics, a judge model, or human reviewers, and results are written to S3",
    "Evaluation jobs can only be run on a single model with no comparison",
    "Evaluation requires training a new foundation model",
    "Evaluation results cannot be exported"],
  a: [0,1],
  e: "Bedrock evaluations use **S3 datasets**, support **automatic, LLM-as-a-judge and human** modes and store outputs in S3.",
  w: [
    "Datasets are in S3.",
    "Multiple modes with S3 results.",
    "Multiple models can be compared.",
    "No training is required.",
    "Results are written to S3."]
},

{
  id: "d5-020", d: 5, t: "5.1", s: "5.1.4", type: "single",
  sc: "The assistant's quality might degrade slowly over months as documents, users and models change. The team wants early warning.",
  q: "What should they implement?",
  o: [
    "Continuous evaluation: scheduled runs of the golden set plus sampled production scoring, with trend alarms in CloudWatch",
    "A one-time evaluation at launch",
    "Evaluation only when customers complain",
    "Remove the golden set"],
  a: [0],
  e: "**Continuous evaluation** detects gradual degradation that one-off tests miss.",
  w: [
    "Ongoing measurement with alerts.",
    "Misses later drift.",
    "Reactive.",
    "Removes the benchmark."]
},

{
  id: "d5-021", d: 5, t: "5.2", s: "5.2.1", type: "single",
  sc: "A summarisation function works for short documents but returns a ValidationException for long ones, stating that the input is too long for the model.",
  q: "Which fix is MOST appropriate?",
  o: [
    "Detect overflow with token counting and use dynamic chunking with a map-reduce summarisation, or select a model with a longer context window",
    "Raise maxTokens",
    "Lower the temperature",
    "Retry the same request"],
  a: [0],
  e: "The input exceeds the **context window**. Chunk and summarise in stages, or use a longer-context model.",
  w: [
    "Addresses input size directly.",
    "maxTokens limits only output.",
    "Temperature does not change size limits.",
    "Retrying the same oversized request fails again."]
},

{
  id: "d5-022", d: 5, t: "5.2", s: "5.2.1", type: "single",
  sc: "Generated reports are cut off mid-sentence. Responses include a stop reason of max_tokens.",
  q: "What is the cause and fix?",
  o: [
    "The output hit the maxTokens limit; raise it appropriately (within model and cost limits) or request a more concise structure",
    "The model is throttled; add backoff",
    "The vector index is stale",
    "IAM permissions are missing"],
  a: [0],
  e: "A **max_tokens stop reason** means generation was truncated by the configured limit.",
  w: [
    "Exact match to the symptom.",
    "Throttling returns errors, not truncated output.",
    "Index staleness affects retrieval.",
    "Missing permissions cause access errors."]
},

{
  id: "d5-023", d: 5, t: "5.2", s: "5.2.2", type: "single",
  sc: "A new application receives AccessDeniedException when invoking a foundation model, although the IAM role has bedrock:InvokeModel permission on another model.",
  q: "What should the developer check FIRST?",
  o: [
    "Whether the policy resource ARNs cover this model or inference profile, that the model is available and enabled in this Region and account, and any SCP or endpoint policy restrictions (check CloudTrail for details)",
    "The temperature setting",
    "The chunk size",
    "The embedding dimensions"],
  a: [0],
  e: "AccessDenied points to **IAM resource scope, model availability or enablement, or organizational/endpoint policies**. CloudTrail shows the denial context.",
  w: [
    "Checks the typical causes of AccessDenied.",
    "Inference parameters do not cause access denial.",
    "Chunking is unrelated.",
    "Embedding settings are unrelated."]
},

{
  id: "d5-024", d: 5, t: "5.2", s: "5.2.2", type: "single",
  sc: "A request fails with a ValidationException that mentions an unsupported inference parameter after the team swapped to a different model and kept the same extra parameters.",
  q: "What is the MOST likely cause?",
  o: [
    "The new model does not support one of the supplied parameters (parameters are model-specific); remove or map it, preferably using Converse with inferenceConfig",
    "The knowledge base is empty",
    "A CloudWatch alarm is firing",
    "The S3 bucket is versioned"],
  a: [0],
  e: "Inference parameters are **model-specific**. Validate the request against the model's supported fields.",
  w: [
    "Parameter mismatch after a model swap.",
    "Knowledge base state is unrelated to a validation error on parameters.",
    "Alarms do not cause validation errors.",
    "Versioning is unrelated."]
},

{
  id: "d5-025", d: 5, t: "5.2", s: "5.2.2", type: "single",
  sc: "The team enabled model invocation logging but sees no logs in the CloudWatch Logs group.",
  q: "What should they verify?",
  o: [
    "That logging is enabled in Bedrock settings for the correct Region and destination, and the logging role has permission to write to the log group (and KMS key if encrypted)",
    "That the model temperature is zero",
    "That the vector store has enough shards",
    "That Lambda memory is at maximum"],
  a: [0],
  e: "Missing logs usually mean **settings, destination or permissions** (including KMS key access) are wrong.",
  w: [
    "Common causes of absent invocation logs.",
    "Temperature is unrelated.",
    "Shards are unrelated.",
    "Lambda memory is unrelated."]
},

{
  id: "d5-026", d: 5, t: "5.2", s: "5.2.3", type: "single",
  sc: "After a prompt edit, some answers improved and others got worse, but no one can say whether the edit helped overall.",
  q: "Which approach resolves the uncertainty?",
  o: [
    "Run both prompt versions on the same fixed test set, compare scores per category, and refine one change at a time",
    "Keep editing and watch for complaints",
    "Revert at random",
    "Change the model and prompt at the same time"],
  a: [0],
  e: "**Version comparison on a fixed test set** with isolated changes gives evidence about the effect of each edit.",
  w: [
    "Controlled comparison.",
    "Not systematic.",
    "Random reverts do not help.",
    "Multiple changes confound results."]
},

{
  id: "d5-027", d: 5, t: "5.2", s: "5.2.4", type: "single",
  sc: "Users ask about a refund policy that exists in the knowledge base, but the assistant says it has no information. Retrieval tests show the relevant document never appears in results.",
  q: "Which diagnostic steps are MOST appropriate?",
  o: [
    "Check that the document was ingested successfully (ingestion job status), inspect how it was parsed and chunked, test retrieval for the query alone, and examine metadata filters and embedding match",
    "Increase maxTokens",
    "Change the temperature",
    "Disable guardrails"],
  a: [0],
  e: "If the document never surfaces, investigate the **retrieval pipeline**: ingestion, parsing/chunking, filters, embedding relevance.",
  w: [
    "Systematic retrieval-side diagnosis.",
    "maxTokens does not affect retrieval.",
    "Temperature does not affect retrieval.",
    "Guardrails do not cause missing retrieval results."]
},

{
  id: "d5-028", d: 5, t: "5.2", s: "5.2.4", type: "single",
  sc: "Search quality collapsed after a deployment that switched the query-time embedding model, but the stored document vectors were created with the previous model.",
  q: "What is the fix?",
  o: [
    "Use the same embedding model for queries and documents: either revert the query model or re-embed and re-index the entire corpus with the new model",
    "Increase top-k to compensate",
    "Add more shards",
    "Lower the temperature"],
  a: [0],
  e: "Embeddings from different models are **not comparable**. Index and query must use the same model.",
  w: [
    "Restores a consistent vector space.",
    "More results do not fix invalid similarity.",
    "Shards do not fix meaning.",
    "Temperature is unrelated to retrieval."]
},

{
  id: "d5-029", d: 5, t: "5.2", s: "5.2.4", type: "single",
  sc: "A scheduled knowledge base sync job has been failing for two weeks, and the assistant is giving outdated answers about prices.",
  q: "What should the team do?",
  o: [
    "Inspect the ingestion job status and failure reasons, fix the cause (permissions, parsing errors or source issues), re-run the sync, and add monitoring and alarms for failed syncs",
    "Switch to a larger model",
    "Increase the chat history length",
    "Ignore it because answers are generated by AI"],
  a: [0],
  e: "Outdated answers from a RAG system often trace to **failed ingestion**. Fix it and add alerting.",
  w: [
    "Resolves the root cause and prevents recurrence.",
    "A larger model cannot know unsynced data.",
    "History length is unrelated.",
    "Staleness will continue."]
},

{
  id: "d5-030", d: 5, t: "5.2", s: "5.2.5", type: "single",
  sc: "Some customer messages contain the literal text \"{{customer_name}}\" in generated replies, and downstream JSON parsing occasionally fails.",
  q: "Which approach BEST finds and prevents these issues?",
  o: [
    "Template tests in CI that render prompts with sample variables and fail on unresolved placeholders, schema validation of outputs, and CloudWatch Logs Insights queries to find affected requests",
    "Hope the model fixes the placeholders",
    "Disable logging",
    "Delete the template"],
  a: [0],
  e: "Catch **unrendered template variables** and format errors with **template testing**, **schema validation** and **log queries**.",
  w: [
    "Prevention plus detection.",
    "Not a reliable fix.",
    "Removes diagnostics.",
    "Removes the feature."]
},

{
  id: "d5-031", d: 5, t: "5.2", s: "5.2.4", type: "single",
  sc: "A product launches under a new name and terminology. The assistant retrieves older articles but misses new ones that use the new vocabulary, and relevance has slowly worsened.",
  q: "Which approach BEST addresses this drift?",
  o: [
    "Monitor retrieval relevance on a labelled query set, update the content and synonyms/query expansion, enable hybrid search, and re-embed content or adjust chunking as needed",
    "Disable retrieval",
    "Reduce the temperature",
    "Wait until users learn the old name"],
  a: [0],
  e: "Content and vocabulary **drift** requires monitoring and remediation across data, query handling and retrieval configuration.",
  w: [
    "Detects and fixes relevance degradation.",
    "Removing retrieval loses grounding.",
    "Temperature is unrelated.",
    "Shifts the burden to users."]
},

{
  id: "d5-032", d: 5, t: "5.2", s: "5.2.2", type: "multiple",
  sc: "A GenAI API intermittently fails, and the team is designing a troubleshooting approach for FM integration issues.",
  q: "Which TWO practices help diagnose these failures?",
  o: [
    "Log request IDs, model IDs, error types, stop reasons and token counts with correlation IDs, and analyse them with Logs Insights",
    "Validate requests at the edge (schema, size, parameters) to catch malformed calls before the model is invoked",
    "Remove all error handling",
    "Turn off tracing to reduce noise",
    "Test only in production"],
  a: [0,1],
  e: "Structured error logging with correlation and **early request validation** make FM integration failures diagnosable and preventable.",
  w: [
    "Rich diagnostic data.",
    "Prevents a class of failures.",
    "Hides failures.",
    "Tracing aids diagnosis.",
    "Risky and unstructured."]
}
);
