# Research and content decisions

Reviewed 3 October 2026 against the [official certification overview](https://aws.amazon.com/certification/certified-generative-ai-developer-professional/), [exam guide](https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html), its five domain pages and the service references attached to each question and task guide.

The first three forms did not cover eight listed skills adequately: routing, accessible application integration, developer tooling, sampling-parameter experiments, observable regression traces, stakeholder reporting, prompt comparisons and template diagnostics. Two additional forms close those coverage gaps and add production and business cases. The final 375 questions include revised repository scenarios and newly authored scenarios, with distinct IDs and no overlap between forms. They mix foundational distinctions with multi-constraint architecture, troubleshooting and operational decisions.

Each question has a best-answer rationale, an explanation for every distractor, a decisive clue and a unique four-stage diagram. Task guides add service mechanics and hands-on context without exposing hints during a timed attempt. Tags map to the explicit skill being assessed; a question can also teach adjacent concepts without claiming that one item exhaustively assesses a skill.

Important distinctions checked in the source material:

- Prompt Management versions freeze prompts; an external process implements organization-specific approval and promotion.
- S3-backed and custom knowledge-base sources have different synchronization behavior. Direct-ingestion operations have prerequisites and asynchronous status; source S3 content and indexed data must stay reconciled.
- Query and document embedding spaces must be compatible; equal vector dimensions alone are insufficient.
- Source connectors do not justify assuming a custom application's document authorization is automatic. Enforce trusted identity scope throughout retrieval, caches and tools.
- CloudTrail API auditing differs from supported model invocation content logging. Event classes vary by operation; invocation logging is configurable and not enabled by default.
- IAM permissions for Converse correspond to documented model-invocation actions. Guardrail IAM enforcement has path-specific limits; creation alone does not apply a guardrail universally.
- An endpoint policy governs traffic through that VPC endpoint. It does not automatically constrain alternate public paths.
- Asynchronous streaming safety checks can release content before evaluation. Required pre-release checks need appropriate synchronous or buffered handling.
- Grounding scores, semantic similarity, citations and valid JSON each measure different properties; none alone guarantees factual truth.
- TTL deletion is eventual. Access expiry needs read-time checks; S3 current-object expiry does not remove all noncurrent or derived copies.
- API Gateway usage plans are best effort, not hard cost ceilings or user authentication. Runtime task budgets require application enforcement.
- Model units, autoscaling and low temperature do not guarantee end-to-end latency, factual accuracy or exact reproducibility.
- Agent diagnosis can use observable actions and tool traces without requiring private model reasoning. Tool schemas and MCP conformance do not authorize business actions.
- Data catalogs, transformation lineage, source versions and model cards serve distinct governance purposes. Neither tags nor API logs automatically reconstruct every transformation.
- Bedrock Data Automation output customization, modalities, batch inference, prompt caching and intelligent routing are support-matrix-dependent features.
- Precision, recall and hit rate have different denominators. Fairness and quality need representative cohorts and explicit uncertainty rather than only a global average.

The [source audit](source-audit.json) records 114 referenced documentation/project pages checked for successful retrieval and substantive content. Automated link checks establish availability, not factual correctness; the service distinctions above were separately reviewed. Some open-source frameworks have moved repositories, so links follow their current project locations. AWS Console exercises are instructional and were not executed against a live AWS account during this change.
