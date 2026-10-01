/* Domain 5 questions: Task 5.1 (evaluation systems) and Task 5.2 (troubleshooting). */
(window.QBANK = window.QBANK || []).push(
{
  id: "d5-001", d: 5, t: "5.1", s: "5.1.1", type: "single",
  sc: "A team evaluates a summarisation model using only exact-match accuracy against reference summaries. Many good summaries are marked wrong because they use different wording.",
  q: "Which change gives a more meaningful assessment?",
  o: [
    "Combine overlap metrics such as ROUGE with semantic similarity (for example BERTScore) and LLM-as-a-judge ratings for relevance, factual accuracy and fluency",
    "Keep exact-match accuracy and lower the pass threshold so that more of the good paraphrased summaries are accepted",
    "Measure only the length of each summary compared with the reference, since similar length indicates similar content",
    "Evaluate only latency and cost per summary, since quality is difficult to measure for open-ended generation"],
  a: [0],
  e: "Open-ended generation needs **multiple quality dimensions**: overlap metrics, semantic metrics and judged qualities. Exact match penalises valid paraphrases.",
  w: [
    "Captures lexical overlap, meaning and judged quality, which exact match cannot.",
    "Still measures the wrong thing and only changes the cutoff.",
    "Length says nothing about correctness.",
    "Latency and cost are not quality measures."]
},

{
  id: "d5-002", d: 5, t: "5.1", s: "5.1.1", type: "single",
  sc: "A team needs an automated metric that rewards responses that preserve the meaning of a reference answer even when phrased very differently.",
  q: "Which metric is MOST suitable?",
  o: [
    "BERTScore, which compares contextual embeddings to measure semantic similarity",
    "Exact string equality between the generated answer and the reference answer after lowercasing",
    "Character count similarity, which compares the lengths of the generated and reference answers",
    "Token throughput, which measures how many tokens per second the model generates"],
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
    "Amazon Bedrock Model Evaluations: an automatic evaluation job with a custom dataset in S3 and results written to S3",
    "Amazon Rekognition Custom Labels, trained on the 500 prompts and the reference answers",
    "AWS Glue DataBrew, which scores the model outputs after profiling the prompt dataset",
    "AWS Transfer Family, which compares the answers from each model after they are uploaded by SFTP"],
  a: [0],
  e: "**Bedrock Model Evaluations** runs automatic, LLM-as-a-judge or human evaluations over your dataset and writes results to S3.",
  w: [
    "Purpose-built model comparison on your data with results stored for review.",
    "Rekognition Custom Labels trains image classifiers.",
    "DataBrew prepares data and does not evaluate models.",
    "Transfer Family moves files."]
},

{
  id: "d5-004", d: 5, t: "5.1", s: "5.1.5", type: "single",
  sc: "A team must score thousands of open-ended responses on helpfulness, completeness and harmfulness every week. Human review of all responses is too costly.",
  q: "Which approach is MOST suitable?",
  o: [
    "LLM-as-a-judge evaluations with defined rubrics, calibrated against a smaller human-rated sample",
    "Human review of every response each week, with reviewers scoring each one against the rubric",
    "Ignoring quality scoring and monitoring only the latency and cost of each response",
    "Counting punctuation marks and sentence counts as a proxy for helpfulness and completeness"],
  a: [0],
  e: "**LLM-as-a-judge** scales qualitative scoring; **calibrate** against human ratings on a sample to verify agreement.",
  w: [
    "Scalable scoring with a human check on judge accuracy.",
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
    "Exact-match comparison against a single reference sentence that represents the preferred brand voice",
    "Latency measurement only, since faster responses indicate that the tone is closer to the brand voice",
    "Token counts only, since shorter responses are more likely to be consistent with the brand voice"],
  a: [0],
  e: "Subjective qualities such as **brand voice** are best judged by **humans against a rubric**; an LLM judge can extend coverage.",
  w: [
    "Humans capture subjective nuance such as tone, with a rubric for consistency.",
    "One reference cannot represent the acceptable variety of good copy.",
    "Speed is not voice quality.",
    "Tokens do not measure tone."]
},

{
  id: "d5-006", d: 5, t: "5.1", s: "5.1.2", type: "single",
  sc: "A new model scores better offline. The team wants to confirm real-world impact on resolution rate and customer satisfaction before replacing the current model for everyone.",
  q: "Which approach is BEST?",
  o: [
    "A/B test or canary release: route a small share of live traffic to the new model, compare business and quality metrics, and expand only if results hold",
    "Replace the model for all users immediately, since better offline scores are strong evidence of better outcomes",
    "Rely only on the offline scores, repeating the offline evaluation on a larger dataset if more confidence is needed",
    "Test the new model with two internal employees for a week and decide based on their feedback"],
  a: [0],
  e: "**A/B and canary testing** measure real-world outcomes with limited blast radius and clear comparison.",
  w: [
    "Controlled live validation with a limited blast radius and rollback ability.",
    "Unvalidated full cutover is risky.",
    "Offline sets may not represent production behavior or business outcomes.",
    "Two users give no statistical evidence."]
},

{
  id: "d5-007", d: 5, t: "5.1", s: "5.1.9", type: "single",
  sc: "After each release, the team wants automated checks that simulate real user journeys (ask a question, get a grounded answer, escalate) from outside the system every 5 minutes and alert on failures.",
  q: "Which service is MOST appropriate?",
  o: [
    "CloudWatch Synthetics canaries scripted with the user workflow, with alarms on failures",
    "AWS Cost Explorer, with a saved report that shows daily spend for each component of the workflow",
    "Amazon Macie, with a daily scan of the application's S3 buckets for sensitive data",
    "AWS Snowcone, placed in a branch office to send test requests to the assistant every five minutes"],
  a: [0],
  e: "**CloudWatch Synthetics** runs scripted canaries on a schedule to validate end-to-end workflows and alarm on failures.",
  w: [
    "Synthetic user workflows run on a schedule, with alerting.",
    "Cost Explorer analyzes spend.",
    "Macie finds sensitive data.",
    "Snowcone is edge hardware and not a monitoring service."]
},

{
  id: "d5-008", d: 5, t: "5.1", s: "5.1.2", type: "single",
  sc: "Two models achieve similar quality scores. Model X is slower and costs more per request. The team must justify the choice to stakeholders.",
  q: "Which analysis is MOST appropriate?",
  o: [
    "A cost-performance comparison: quality score per dollar, token efficiency and latency-to-quality ratio, alongside business outcomes",
    "Choose the model whose name is longest, since vendors tend to give more capable models more descriptive names",
    "Pick the more expensive model because higher price implies higher quality for the same task",
    "Avoid a formal comparison and choose the model that the team has used the most in earlier projects"],
  a: [0],
  e: "Combine **quality, cost, latency and business impact** for an evidence-based recommendation.",
  w: [
    "A balanced, quantifiable trade-off analysis.",
    "Irrelevant to quality or cost.",
    "Price does not guarantee quality.",
    "No evidence for the decision."]
},

{
  id: "d5-009", d: 5, t: "5.1", s: "5.1.3", type: "single",
  sc: "Product managers want real users to rate answers and flag wrong ones so that the team can learn from production failures.",
  q: "Which design is MOST appropriate?",
  o: [
    "Add thumbs up/down and comments in the UI, store them with the trace ID in DynamoDB or S3 via API Gateway, and add recurring failures to the evaluation set",
    "Ignore user feedback and rely on the engineering team's own testing to identify problems with the assistant's answers",
    "Collect feedback by phone calls to a sample of customers every quarter and summarize the findings in a report for the team",
    "Delete negative feedback entries so that the dashboards stay consistent with the quality goals that the team has been given"],
  a: [0],
  e: "**User-centred evaluation** captures feedback linked to the exact interaction and feeds it back into the evaluation dataset.",
  w: [
    "A closed feedback loop with traceability to the exact interaction.",
    "Wastes the best signal of real-world failures.",
    "Does not scale and loses linkage to interactions.",
    "Hides the problems that need to be fixed."]
},

{
  id: "d5-010", d: 5, t: "5.1", s: "5.1.3", type: "single",
  sc: "Domain experts must label and score hundreds of answers each week against a detailed rubric, using a managed workflow with a workforce they control.",
  q: "Which service helps organise this annotation work?",
  o: [
    "Amazon SageMaker Ground Truth (or a human-based evaluation workflow) with a private workforce",
    "AWS Direct Connect, with a dedicated link that routes the answers to the experts' offices",
    "Amazon EFS, with a shared file system where the experts edit the answers and the rubric",
    "Amazon SNS, with a topic that sends each answer to every expert in an email"],
  a: [0],
  e: "**Ground Truth** and human evaluation workflows support managed labeling and review with private workforces.",
  w: [
    "Managed human annotation and review workflows with a workforce you control.",
    "Direct Connect is networking.",
    "EFS is shared file storage and does not manage annotation workflows.",
    "SNS is messaging and does not collect structured scores."]
},

{
  id: "d5-011", d: 5, t: "5.1", s: "5.1.4", type: "single",
  sc: "The company wants any change to prompts, models or retrieval settings to be blocked from production if quality drops below thresholds on the golden dataset.",
  q: "Which implementation is MOST appropriate?",
  o: [
    "A CI/CD quality gate in CodePipeline that runs the evaluation in CodeBuild or Bedrock and fails the stage below defined thresholds",
    "A manual review after deployment, with the team monitoring the first day of production for complaints from users of the assistant",
    "A weekly meeting where the team discusses the recent changes and agrees whether the quality of the answers seems acceptable",
    "Rely on each developer's judgement about whether a change is safe, since developers know the code that they changed best"],
  a: [0],
  e: "**Automated quality gates** enforce regression thresholds before release.",
  w: [
    "An automated gate that prevents regressions from shipping.",
    "Detects problems after users have already seen them.",
    "Not systematic or enforced.",
    "Inconsistent and unauditable."]
},

{
  id: "d5-012", d: 5, t: "5.1", s: "5.1.5", type: "multiple",
  sc: "A RAG application is being evaluated. The team wants to understand both whether the right information is fetched and whether the answer uses it faithfully.",
  q: "Which TWO sets of measurements should be included?",
  o: [
    "Retrieval quality: context relevance and context coverage of the retrieved passages",
    "Generation quality: faithfulness to the retrieved context, correctness, completeness and citation quality",
    "The total number of documents indexed in the knowledge base, as a measure of answer quality",
    "The time of day at which each question was asked, as a measure of how well the answers fit",
    "The number of parameters of the generation model, as a measure of faithfulness to the retrieved context"],
  a: [0,1],
  e: "Evaluate **retrieval and generation separately** so you can tell which component to fix.",
  w: [
    "Tests the retriever.",
    "Tests the generator against the evidence.",
    "Index size is not quality.",
    "Irrelevant to quality.",
    "Parameter count is not a measure of faithfulness."]
},

{
  id: "d5-013", d: 5, t: "5.1", s: "5.1.5", type: "single",
  sc: "RAG evaluation shows context relevance is high (the right passages are retrieved) but faithfulness is low (the answers contradict the passages).",
  q: "Where should the team focus?",
  o: [
    "The generation step: prompt instructions to use only the provided context, grounding checks, model choice and temperature",
    "The chunking strategy, because small chunks are the most common cause of unfaithful answers",
    "The embedding dimensions, because higher dimensions would make the model contradict the passages less often",
    "The vector index sharding, because shard layout determines how faithfully the model uses the passages"],
  a: [0],
  e: "Good retrieval with unfaithful answers points to the **generator or prompt**, not the retriever.",
  w: [
    "Good retrieval with unfaithful answers points to the generator or prompt.",
    "Chunking affects retrieval, which is already good.",
    "Embeddings affect retrieval.",
    "Sharding affects retrieval performance, not answer faithfulness."]
},

{
  id: "d5-014", d: 5, t: "5.1", s: "5.1.5", type: "single",
  sc: "A judge model consistently prefers longer answers and the first answer shown in pairwise comparisons, even when a shorter or second answer is better according to human reviewers.",
  q: "What is the BEST mitigation?",
  o: [
    "Randomize answer order, add rubric instructions that penalize unnecessary length, and calibrate the judge against human-labeled samples",
    "Trust the judge without checks, since judge models are designed to be neutral across different answers",
    "Always show the longest answer first, so that the judge sees the most complete answer before the others",
    "Replace human labels with the judge permanently, since human labels are slower and more expensive to collect"],
  a: [0],
  e: "LLM judges can show **position and verbosity bias**. Mitigate with order randomisation, clear rubrics and calibration to human labels.",
  w: [
    "Addresses position and verbosity bias with verification against humans.",
    "Unverified bias persists.",
    "Amplifies the bias.",
    "Removes the ground truth that is needed to check the judge."]
},

{
  id: "d5-015", d: 5, t: "5.1", s: "5.1.6", type: "single",
  sc: "A team wants to test whether its retriever returns at least one relevant passage in the top 5 results for a labelled set of 300 queries, and to track retrieval latency.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Retrieval-only evaluation with relevance judgments, computing metrics such as recall@5 or hit rate and measuring latency percentiles",
    "Judge only the grammar of the final answers, since grammatical answers indicate that retrieval worked",
    "Count the number of documents in the index and assume that more documents give better retrieval",
    "Skip retrieval evaluation and evaluate only the end-to-end user satisfaction at the end of each quarter"],
  a: [0],
  e: "**Retrieval quality testing** uses labelled queries and metrics like recall@k/hit rate, plus latency measurements.",
  w: [
    "A direct measure of retrieval effectiveness and speed.",
    "Grammar does not evaluate retrieval.",
    "Index size is not relevance.",
    "Leaves retrieval untested and slow to diagnose."]
},

{
  id: "d5-016", d: 5, t: "5.1", s: "5.1.7", type: "single",
  sc: "A team wants to determine how reliable its agent is across 200 scripted tasks, including whether it chooses the right tool with correct parameters and finishes the goal.",
  q: "Which metrics should be measured?",
  o: [
    "Task completion rate, tool selection and parameter accuracy, steps and cost per task, and reasoning quality from traces",
    "Only the number of lines of code in the agent, since smaller agents are generally more reliable",
    "Only the Region in which the agent runs, since it determines the agent's accuracy across tasks",
    "Only the release date of the underlying model, since newer models always complete more tasks"],
  a: [0],
  e: "**Agent evaluation** examines outcomes and **trajectories**: completion, correct tool use, efficiency and reasoning quality.",
  w: [
    "Covers outcome and process: completion, correct tool use, efficiency and reasoning.",
    "Code size is not agent quality.",
    "The Region does not determine task accuracy.",
    "Release date is not a reliability metric."]
},

{
  id: "d5-017", d: 5, t: "5.1", s: "5.1.8", type: "single",
  sc: "Leadership wants a weekly report comparing candidate models on quality, cost and latency, and tracking trends in user satisfaction, delivered automatically.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Store evaluation results in S3/Athena, visualize with Amazon Quick or Managed Grafana dashboards of comparisons and trends, and schedule automated delivery",
    "A manually edited document that the team updates each quarter with the latest numbers and sends to the stakeholders by email",
    "Verbal updates in the weekly meeting, with no stored record of the evaluation results that the stakeholders could review later",
    "No reporting, since stakeholders can ask the engineering team for the information whenever they need to know the current status"],
  a: [0],
  e: "Automated pipelines and dashboards provide **consistent stakeholder reporting** with model comparison visualisations.",
  w: [
    "Repeatable, visual and automated reporting.",
    "Slow and error-prone.",
    "Not auditable.",
    "Leaves stakeholders uninformed."]
},

{
  id: "d5-018", d: 5, t: "5.1", s: "5.1.9", type: "single",
  sc: "A model version is being upgraded. Before shifting all traffic, the team wants to detect increased hallucination rates and meaning changes in responses relative to the current version using identical test prompts.",
  q: "Which validation steps are MOST appropriate?",
  o: [
    "Run the golden dataset through both versions, compare hallucination and similarity scores, and require thresholds before the canary expands",
    "Skip validation because newer model versions are always better than the versions they replace, according to the provider",
    "Compare only the price per token of the two versions and choose the cheaper one for the production application going forward",
    "Wait for user complaints after the full rollout before deciding whether to revert the upgrade to the previous model version"],
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
    "Evaluation jobs can only evaluate a single model at a time and cannot be used to compare models",
    "Evaluation requires training a new foundation model before the job can score the responses",
    "Evaluation results cannot be exported and can only be viewed in the console for 24 hours"],
  a: [0,1],
  e: "Bedrock evaluations use **S3 datasets**, support **automatic, LLM-as-a-judge and human** modes and store outputs in S3.",
  w: [
    "Datasets are in S3.",
    "Multiple evaluation modes with results written to S3.",
    "Multiple models can be compared.",
    "No training is required.",
    "Results are written to S3 and remain available."]
},

{
  id: "d5-020", d: 5, t: "5.1", s: "5.1.4", type: "single",
  sc: "The assistant's quality might degrade slowly over months as documents, users and models change. The team wants early warning.",
  q: "What should they implement?",
  o: [
    "Continuous evaluation: scheduled runs of the golden set plus sampled production scoring, with trend alarms in CloudWatch",
    "A one-time evaluation at launch, repeated only if the application is redesigned",
    "Evaluation only when customers complain, so that effort is spent on problems that users actually notice",
    "Remove the golden set to avoid the maintenance cost of keeping the reference answers up to date"],
  a: [0],
  e: "**Continuous evaluation** detects gradual degradation that one-off tests miss.",
  w: [
    "Ongoing measurement with alerts catches gradual degradation.",
    "Misses later drift.",
    "Reactive.",
    "Removes the benchmark."]
},

{
  id: "d5-021", d: 5, t: "5.2", s: "5.2.1", type: "single",
  sc: "A summarisation function works for short documents but returns a ValidationException for long ones, stating that the input is too long for the model.",
  q: "Which fix is MOST appropriate?",
  o: [
    "Detect overflow with token counting and use dynamic chunking with map-reduce summarization, or choose a longer-context model",
    "Raise maxTokens, since the limit applies to the combined size of the input and the output of the model for each request",
    "Lower the temperature, so that the model processes long inputs more carefully and avoids returning the validation error",
    "Retry the same request, since the exception is likely to be transient for large inputs and will succeed on a later attempt"],
  a: [0],
  e: "The input exceeds the **context window**. Chunk and summarise in stages, or use a longer-context model.",
  w: [
    "Addresses the input size directly.",
    "maxTokens limits output only.",
    "Temperature does not change size limits.",
    "Retrying the same oversized request fails again."]
},

{
  id: "d5-022", d: 5, t: "5.2", s: "5.2.1", type: "single",
  sc: "Generated reports are cut off mid-sentence. Responses include a stop reason of max_tokens.",
  q: "What is the cause and fix?",
  o: [
    "The output hit the maxTokens limit; raise it appropriately (within model and cost limits) or request a more concise structure",
    "The model is throttled; add exponential backoff so that the request is allowed to complete",
    "The vector index is stale; re-run the ingestion job so that the content is complete",
    "IAM permissions are missing; add permission to invoke the model so that the output is not truncated"],
  a: [0],
  e: "A **max_tokens stop reason** means generation was truncated by the configured limit.",
  w: [
    "Exact match to the symptom: a max_tokens stop reason means truncation by the configured limit.",
    "Throttling returns errors, not truncated output.",
    "Index staleness affects retrieval content, not response truncation.",
    "Missing permissions cause access errors, not truncated output."]
},

{
  id: "d5-023", d: 5, t: "5.2", s: "5.2.2", type: "single",
  sc: "A new application receives AccessDeniedException when invoking a foundation model, although the IAM role has bedrock:InvokeModel permission on another model.",
  q: "What should the developer check FIRST?",
  o: [
    "Whether the policy resource ARNs cover this model or profile, the model is enabled in this Region and account, and no SCP or endpoint policy blocks it",
    "The temperature setting of the request, since high temperature values are rejected by some models with an access error",
    "The chunk size of the knowledge base, since it determines which models can be invoked by the role of the application",
    "The embedding dimensions, since they must match the permissions that are attached to the invoking role of the application"],
  a: [0],
  e: "AccessDenied points to **IAM resource scope, model availability or enablement, or organizational/endpoint policies**. CloudTrail shows the denial context.",
  w: [
    "These are the typical causes of AccessDenied, and CloudTrail shows the denial context.",
    "Inference parameters do not cause access denial.",
    "Chunking is unrelated to invocation permissions.",
    "Embedding settings are unrelated to IAM permissions."]
},

{
  id: "d5-024", d: 5, t: "5.2", s: "5.2.2", type: "single",
  sc: "A request fails with a ValidationException that mentions an unsupported inference parameter after the team swapped to a different model and kept the same extra parameters.",
  q: "What is the MOST likely cause?",
  o: [
    "The new model does not support one of the supplied parameters (they are model-specific); remove or map it, preferably using Converse inferenceConfig",
    "The knowledge base is empty, so the model rejects parameters that refer to retrieval settings in the request it receives",
    "A CloudWatch alarm is firing, which blocks the extra parameter from being sent in the request to the model for processing",
    "The S3 bucket has versioning enabled, which changes how the model interprets the inference parameters in the request"],
  a: [0],
  e: "Inference parameters are **model-specific**. Validate the request against the model's supported fields.",
  w: [
    "Parameter mismatch after a model swap is a common ValidationException cause.",
    "Knowledge base state is unrelated to a validation error on inference parameters.",
    "Alarms do not block requests.",
    "Versioning is unrelated to parameter handling."]
},

{
  id: "d5-025", d: 5, t: "5.2", s: "5.2.2", type: "single",
  sc: "The team enabled model invocation logging but sees no logs in the CloudWatch Logs group.",
  q: "What should they verify?",
  o: [
    "Logging is enabled for the right Region and destination, and the logging role can write to the log group (and use the KMS key if encrypted)",
    "The model temperature is set to zero, since logging is skipped for requests that use higher temperature settings in the request",
    "The vector store has enough shards, since invocation logs are written through the index of the knowledge base for the application",
    "The Lambda memory is set to its maximum, since logging needs additional memory for each invocation of the model by the function"],
  a: [0],
  e: "Missing logs usually mean **settings, destination or permissions** (including KMS key access) are wrong.",
  w: [
    "Missing logs usually mean settings, destination or permissions (including KMS access) are wrong.",
    "Temperature is unrelated to logging.",
    "Shards are unrelated to invocation logs.",
    "Lambda memory is unrelated to Bedrock invocation logging."]
},

{
  id: "d5-026", d: 5, t: "5.2", s: "5.2.3", type: "single",
  sc: "After a prompt edit, some answers improved and others got worse, but no one can say whether the edit helped overall.",
  q: "Which approach resolves the uncertainty?",
  o: [
    "Run both prompt versions on the same fixed test set, compare scores per category, and refine one change at a time",
    "Keep editing the prompt and watch for complaints, adjusting again whenever a problem is reported",
    "Revert to the earlier version at random, since it is equally likely to be better than the new version",
    "Change the model and the prompt at the same time so that the improvements are not tied to one variable"],
  a: [0],
  e: "**Version comparison on a fixed test set** with isolated changes gives evidence about the effect of each edit.",
  w: [
    "Controlled comparison that isolates the effect of the change.",
    "Not systematic and driven by complaints.",
    "Random reverts do not provide evidence.",
    "Multiple simultaneous changes confound the results."]
},

{
  id: "d5-027", d: 5, t: "5.2", s: "5.2.4", type: "single",
  sc: "Users ask about a refund policy that exists in the knowledge base, but the assistant says it has no information. Retrieval tests show the relevant document never appears in results.",
  q: "Which diagnostic steps are MOST appropriate?",
  o: [
    "Check the ingestion job status, how the document was parsed and chunked, test retrieval for the query alone, and examine metadata filters and embedding match",
    "Increase maxTokens so that the model can read a longer part of the knowledge base before it answers the question from the user",
    "Change the temperature to a higher value so that the model explores further passages before it decides on the final answer text",
    "Disable guardrails, since they remove passages from the retrieval results when those passages contain terms from the policy"],
  a: [0],
  e: "If the document never surfaces, investigate the **retrieval pipeline**: ingestion, parsing/chunking, filters, embedding relevance.",
  w: [
    "Systematic diagnosis of the retrieval pipeline.",
    "maxTokens does not affect retrieval.",
    "Temperature does not affect retrieval.",
    "Guardrails do not remove passages from retrieval results."]
},

{
  id: "d5-028", d: 5, t: "5.2", s: "5.2.4", type: "single",
  sc: "Search quality collapsed after a deployment that switched the query-time embedding model, but the stored document vectors were created with the previous model.",
  q: "What is the fix?",
  o: [
    "Use the same embedding model for queries and documents: revert the query model or re-embed and re-index the entire corpus with the new model",
    "Increase top-k to retrieve more results, so that the relevant documents are likely to be among them",
    "Add more shards to the index so that similarity computations between vector spaces are more accurate",
    "Lower the temperature of the generation model so that it handles poorly matched passages more carefully"],
  a: [0],
  e: "Embeddings from different models are **not comparable**. Index and query must use the same model.",
  w: [
    "Restores a consistent vector space.",
    "More results do not fix invalid similarity.",
    "Shards do not fix the mismatch between vector spaces.",
    "Temperature is unrelated to retrieval."]
},

{
  id: "d5-029", d: 5, t: "5.2", s: "5.2.4", type: "single",
  sc: "A scheduled knowledge base sync job has been failing for two weeks, and the assistant is giving outdated answers about prices.",
  q: "What should the team do?",
  o: [
    "Inspect the ingestion job status and failure reasons, fix the cause, re-run the sync, and add alarms for failed syncs",
    "Switch to a larger model so that it can infer the current prices from its general knowledge of the products in the catalog",
    "Increase the chat history length so that earlier conversations about prices are used in the answers given to new customers",
    "Ignore the issue because answers are generated by AI and cannot reflect the latest data from the company anyway"],
  a: [0],
  e: "Outdated answers from a RAG system often trace to **failed ingestion**. Fix it and add alerting.",
  w: [
    "Resolves the root cause and prevents recurrence.",
    "A larger model cannot know unsynced data.",
    "Chat history is unrelated to the knowledge base content.",
    "Staleness will continue and harm customers."]
},

{
  id: "d5-030", d: 5, t: "5.2", s: "5.2.5", type: "single",
  sc: "Some customer messages contain the literal text \"{{customer_name}}\" in generated replies, and downstream JSON parsing occasionally fails.",
  q: "Which approach BEST finds and prevents these issues?",
  o: [
    "Template tests in CI that fail on unresolved placeholders, schema validation of outputs, and Logs Insights queries to find affected requests",
    "Hope that the model will fix the placeholders by itself when it sees them in the template that it was given in the prompt",
    "Disable logging to avoid recording malformed outputs, which would otherwise make the quality dashboards look worse than they are",
    "Delete the template and write each reply from scratch so that placeholders cannot appear, accepting less consistent replies"],
  a: [0],
  e: "Catch **unrendered template variables** and format errors with **template testing**, **schema validation** and **log queries**.",
  w: [
    "Prevention plus detection of unrendered placeholders and format errors.",
    "Not a reliable fix.",
    "Removes diagnostics.",
    "Removes the feature and its consistency."]
},

{
  id: "d5-031", d: 5, t: "5.2", s: "5.2.4", type: "single",
  sc: "A product launches under a new name and terminology. The assistant retrieves older articles but misses new ones that use the new vocabulary, and relevance has slowly worsened.",
  q: "Which approach BEST addresses this drift?",
  o: [
    "Monitor retrieval relevance on a labeled query set, update content and synonyms, enable hybrid search, and re-embed or re-chunk as needed",
    "Disable retrieval and let the model answer from its training data, which does not include the new name of the product line",
    "Reduce the temperature so that the model is less likely to mention the older articles in the answers that it writes for users",
    "Wait until users learn the old product name and adapt their queries to match the terminology of the older articles over time"],
  a: [0],
  e: "Content and vocabulary **drift** requires monitoring and remediation across data, query handling and retrieval configuration.",
  w: [
    "Detects and fixes relevance degradation from vocabulary drift.",
    "Removing retrieval loses grounding, and the model does not know the new name.",
    "Temperature is unrelated to retrieval relevance.",
    "Shifts the burden to users."]
},

{
  id: "d5-032", d: 5, t: "5.2", s: "5.2.2", type: "multiple",
  sc: "A GenAI API intermittently fails, and the team is designing a troubleshooting approach for FM integration issues.",
  q: "Which TWO practices help diagnose these failures?",
  o: [
    "Log request IDs, model IDs, error types, stop reasons and token counts with correlation IDs, and analyze them with Logs Insights",
    "Validate requests at the edge (schema, size, parameters) to catch malformed calls before the model is invoked",
    "Remove all error handling so that failures appear immediately and consistently in the application logs",
    "Turn off tracing to reduce noise, since traces rarely help to find the cause of intermittent failures",
    "Test only in production, where the real conditions are present and the failures appear most often"],
  a: [0,1],
  e: "Structured error logging with correlation and **early request validation** make FM integration failures diagnosable and preventable.",
  w: [
    "Rich diagnostic data to find failure patterns.",
    "Prevents a class of failures before they reach the model.",
    "Hides failures and removes recovery.",
    "Tracing helps diagnose intermittent failures.",
    "Risky and unstructured."]
}
);
