# AIP-C01 coverage map

375 original practice questions across five non-overlapping 75-question forms. Every form covers all 20 tasks. Collectively, the bank covers all 98 skills transcribed from the official guide. Coverage means a tagged practice item exists; it is not a claim of exhaustive assessment or official difficulty calibration.

| Form | D1 | D2 | D3 | D4 | D5 | Multiple response |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 23 | 20 | 15 | 9 | 8 | 10 |
| 2 | 23 | 20 | 15 | 9 | 8 | 10 |
| 3 | 23 | 20 | 15 | 9 | 8 | 11 |
| 4 | 23 | 20 | 15 | 9 | 8 | 10 |
| 5 | 23 | 20 | 15 | 9 | 8 | 10 |

## Domain 1: Foundation Model Integration, Data Management, and Compliance (31%)

| Skill | Scope | Question IDs (form) |
|---|---|---|
| 1.1.1 | Architectural designs that fit business needs and constraints (FMs, integration patterns, deployment strategies) | d1-001 (1), d1-004 (3), d1-006 (1), d1-008 (3), d1-011 (2), d1-009 (5), pro-001 (5), d1-005 (5) |
| 1.1.2 | Proof-of-concept to validate feasibility, performance and value before scaling (Bedrock) | d1-007 (2), d1-012 (3), d1-002 (4), pro-002 (4) |
| 1.1.3 | Standardized components for consistent delivery (Well-Architected Framework, GenAI Lens) | d1-003 (2), d1-010 (1), pro-003 (5) |
| 1.2.1 | Assess and choose FMs: benchmarks, capability analysis, limitations | d1-013 (1), d1-014 (2), d1-027 (3), pro-004 (5) |
| 1.2.2 | Dynamic model selection and provider switching without code changes (Lambda, API Gateway, AppConfig) | d1-015 (3), d1-016 (1), pro-005 (4), d1-017 (4) |
| 1.2.3 | Resilient AI: Step Functions circuit breakers, cross-Region inference, graceful degradation | d1-018 (2), d1-020 (3), d1-021 (1), d1-028 (1), d1-019 (4) |
| 1.2.4 | Customization lifecycle: SageMaker AI fine-tuned models, LoRA/adapters, Model Registry, rollback, retirement | d1-022 (2), d1-023 (3), d1-024 (1), d1-025 (2), d1-026 (5), pro-006 (5) |
| 1.3.1 | Data validation workflows (Glue Data Quality, Data Wrangler, Lambda, CloudWatch) | d1-029 (2), d1-030 (3), d1-041 (2), d1-039 (4), pro-007 (5) |
| 1.3.2 | Processing text, image, audio and tabular data (Bedrock multimodal, SageMaker Processing, Transcribe) | d1-031 (1), d1-032 (2), d1-040 (1), pro-008 (4), d1-033 (4) |
| 1.3.3 | Format input per model requirements (Bedrock JSON, SageMaker payloads, conversation formats) | d1-034 (3), d1-035 (1), d1-036 (2), d1-043 (4), pro-009 (5) |
| 1.3.4 | Improve input quality (Bedrock reformatting, Comprehend entities, Lambda normalization) | d1-037 (3), d1-042 (5), d1-038 (5) |
| 1.4.1 | Vector architectures for FM augmentation (Knowledge Bases, OpenSearch + Neural plugin, RDS/Aurora, DynamoDB metadata) | d1-045 (3), d1-058 (3), d1-047 (4), d1-044 (4), d1-046 (5), d1-053 (5) |
| 1.4.2 | Metadata frameworks for search precision (S3 metadata, authorship attributes, domain tags) | d1-048 (1), d1-049 (2), pro-010 (4) |
| 1.4.3 | High-performance vector search at scale (OpenSearch sharding, multi-index, hierarchical indexing) | d1-050 (3), d1-051 (1), d1-052 (2), d1-059 (1), pro-011 (5) |
| 1.4.4 | Integration with document systems, knowledge bases and wikis | d1-055 (3), d1-054 (4), pro-012 (5) |
| 1.4.5 | Data maintenance: incremental updates, change detection, sync workflows, scheduled refresh | d1-056 (1), d1-057 (2) |
| 1.5.1 | Document segmentation / chunking approaches | d1-060 (2), d1-061 (3), d1-062 (1), d1-063 (2), d1-080 (2), pro-013 (4) |
| 1.5.2 | Select and configure embedding models (Titan, dimensionality, domain fit, batch embedding) | d1-064 (3), d1-065 (1), d1-079 (1), d1-066 (4), d1-067 (4), pro-014 (5) |
| 1.5.3 | Deploy vector search (OpenSearch, Aurora pgvector, Knowledge Bases) | d1-077 (2), d1-081 (4), d1-068 (5) |
| 1.5.4 | Advanced search: semantic, hybrid keyword+vector, Bedrock reranker models | d1-069 (2), d1-070 (3), d1-071 (1), d1-078 (3), pro-015 (4) |
| 1.5.5 | Query handling: expansion, decomposition, transformation | d1-072 (2), d1-073 (3), d1-074 (4), pro-016 (5) |
| 1.5.6 | Consistent retrieval access: function calling, MCP clients, standardized APIs | d1-076 (1), d1-075 (5) |
| 1.6.1 | Instruction frameworks: Prompt Management roles/templates, Guardrails | d1-082 (3), d1-083 (5) |
| 1.6.2 | Interactive systems that keep context (Step Functions clarification, Comprehend intent, DynamoDB history) | d1-084 (1), d1-086 (2), pro-017 (4), d1-085 (5) |
| 1.6.3 | Prompt governance: parameterized templates, approvals, S3 repos, CloudTrail, CloudWatch Logs | d1-087 (3), d1-088 (1), pro-018 (4) |
| 1.6.4 | Prompt QA: Lambda output checks, Step Functions edge cases, CloudWatch regression | d1-089 (2), d1-090 (3), pro-019 (5) |
| 1.6.5 | Advanced prompting: structured input, output formats, chain-of-thought, feedback loops | d1-092 (1), d1-091 (4), d1-093 (5) |
| 1.6.6 | Complex prompt systems with Bedrock Prompt Flows | d1-094 (2), d1-095 (3), d1-096 (4) |

## Domain 2: Implementation and Integration (26%)

| Skill | Scope | Question IDs (form) |
|---|---|---|
| 2.1.1 | Autonomous systems with memory and state (Strands Agents, AWS Agent Squad, MCP) | d2-001 (1), d2-002 (2), d2-003 (3), d2-004 (1), d2-006 (2), d2-020 (3), d2-023 (2), d2-005 (4), d2-025 (5) |
| 2.1.2 | Structured reasoning: ReAct and chain-of-thought with Step Functions | d2-007 (3), d2-021 (1), d2-024 (3) |
| 2.1.3 | Safeguarded workflows: stopping conditions, timeouts, IAM boundaries, circuit breakers | d2-008 (1), d2-009 (2), d2-022 (4), pro-020 (5) |
| 2.1.4 | Model coordination: specialized FMs, ensemble aggregation, model selection frameworks | d2-018 (1), d2-019 (2) |
| 2.1.5 | Human-in-the-loop: Step Functions approvals, API Gateway feedback, human augmentation | d2-010 (3), d2-011 (1), pro-021 (4) |
| 2.1.6 | Reliable tool integrations: Strands API, function definitions, Lambda error handling and validation | d2-012 (2), d2-013 (3), d2-014 (1), d2-026 (1), pro-022 (5) |
| 2.1.7 | Model extension: stateless MCP servers on Lambda, complex MCP servers on ECS, MCP clients | d2-016 (2), d2-017 (3), d2-015 (4), pro-023 (5) |
| 2.2.1 | Deploy per need: Lambda on-demand, Bedrock Provisioned Throughput, SageMaker endpoints, hybrid | d2-027 (2), d2-028 (3), d2-029 (1), d2-030 (2), d2-035 (3), d2-037 (4) |
| 2.2.2 | LLM-specific deployment: containers, memory, GPU utilization, token capacity, model loading | d2-031 (3), d2-032 (1), d2-038 (1), pro-024 (4), d2-036 (5) |
| 2.2.3 | Balance performance and resources: right-size models, smaller pre-trained models, model cascading | d2-033 (2), d2-034 (4), pro-025 (5) |
| 2.3.1 | Connect to enterprise systems: API integrations, event-driven loose coupling, data synchronization | d2-039 (2), d2-040 (3), d2-051 (1), pro-026 (4) |
| 2.3.2 | Add GenAI to existing apps: API Gateway, Lambda webhooks, EventBridge | d2-041 (1), d2-052 (2) |
| 2.3.3 | Secure access: identity federation, RBAC, least-privilege API access | d2-042 (2), d2-043 (3), d2-044 (1), d2-053 (3), pro-027 (4) |
| 2.3.4 | Cross-environment: Outposts, Wavelength, secure cloud-to-on-prem routing, compliance across jurisdictions | d2-045 (2), d2-047 (3), d2-046 (5), d2-054 (5) |
| 2.3.5 | CI/CD and GenAI gateway architectures (CodePipeline, CodeBuild, automated tests, rollback) | d2-048 (1), d2-049 (2), d2-050 (3), pro-028 (5) |
| 2.4.1 | Flexible interaction: sync Bedrock APIs, SDKs, SQS async, API Gateway request validation | d2-055 (1), d2-056 (2), d2-064 (2) |
| 2.4.2 | Real-time: streaming APIs, WebSockets/SSE, chunked transfer | d2-057 (3), d2-058 (1), d2-067 (1), pro-029 (4) |
| 2.4.3 | Resilience: SDK exponential backoff, API Gateway rate limiting, fallbacks, X-Ray | d2-059 (2), d2-060 (3), d2-061 (1), d2-065 (3), d2-068 (2), pro-030 (5) |
| 2.4.4 | Model routing: static, Step Functions content-based, metric-based, API Gateway transformations | d2-062 (4), d2-066 (4), pro-031 (4), d2-063 (5) |
| 2.5.1 | FM API interfaces: streaming through API Gateway, token limits, retries for timeouts | d2-069 (3) |
| 2.5.2 | Accessible AI interfaces: Amplify, OpenAPI, Prompt Flows no-code builders | d2-071 (4), pro-033 (5), d2-070 (5), d2-082 (5), pro-032 (5) |
| 2.5.3 | Business system enhancements: Lambda CRM, Step Functions document processing, Bedrock Data Automation | d2-073 (1), d2-074 (4), d2-072 (5) |
| 2.5.4 | Developer productivity: Amazon Q Developer for code generation, refactoring, testing | d2-076 (4), pro-034 (4), d2-075 (5), d2-080 (5), pro-035 (5) |
| 2.5.5 | Advanced GenAI apps: Strands, Agent Squad, Step Functions agent patterns, prompt chaining | d2-077 (2), d2-081 (4), pro-036 (4) |
| 2.5.6 | Troubleshooting efficiency: Logs Insights, X-Ray, Q Developer error recognition | d2-079 (3), d2-078 (4), pro-037 (5) |

## Domain 3: AI Safety, Security, and Governance (20%)

| Skill | Scope | Question IDs (form) |
|---|---|---|
| 3.1.1 | Input content safety: Guardrails, custom moderation with Step Functions/Lambda | d3-001 (1), d3-007 (1), d3-009 (3), d3-021 (2), pro-038 (4) |
| 3.1.2 | Output safety: Guardrails, toxicity evaluation, text-to-SQL for deterministic results | d3-003 (3), d3-004 (1), d3-008 (2), d3-010 (1), d3-022 (3), d3-023 (4), pro-039 (4), d3-020 (5) |
| 3.1.3 | Hallucination reduction: Knowledge Bases grounding, confidence scoring, JSON Schema outputs | d3-005 (2), d3-006 (3), d3-011 (2), d3-013 (3), d3-012 (4), pro-040 (5) |
| 3.1.4 | Defense in depth: Comprehend pre-filters, Guardrails, Lambda post-processing, API response filtering | d3-014 (1), d3-016 (4), pro-041 (4), d3-015 (5) |
| 3.1.5 | Threat detection: prompt injection, jailbreaks, sanitization, adversarial testing | d3-002 (2), d3-017 (2), d3-018 (3), d3-019 (1), d3-024 (1), pro-042 (5) |
| 3.2.1 | Protected environments: VPC endpoints, IAM, Lake Formation, CloudWatch monitoring | d3-025 (2), d3-026 (3), d3-027 (1), d3-031 (1), d3-035 (1), d3-038 (3), d3-032 (4), d3-036 (4), pro-043 (5), pro-046 (5) |
| 3.2.2 | Privacy-preserving: Comprehend/Macie PII, Bedrock privacy features, Guardrails, S3 Lifecycle retention | d3-029 (2), d3-030 (3), d3-037 (2), pro-044 (5), d3-028 (5) |
| 3.2.3 | Privacy with utility: masking, PII detection, anonymization | d3-033 (2), d3-034 (3), pro-045 (4) |
| 3.3.1 | Compliance frameworks: model cards, Glue lineage, tagging, CloudWatch decision logs | d3-039 (1), d3-043 (1), d3-040 (4), pro-047 (4) |
| 3.3.2 | Data source tracking: Glue Data Catalog, source attribution metadata, CloudTrail | d3-041 (2), d3-042 (3), d3-049 (2), pro-048 (5) |
| 3.3.3 | Organizational governance aligned to policy, regulation and responsible AI | d3-044 (2), d3-050 (3), pro-049 (4) |
| 3.3.4 | Continuous monitoring: misuse/drift/policy detection, bias drift, alerting, token-level redaction | d3-046 (3), d3-047 (1), d3-045 (5), d3-048 (5), pro-050 (5) |
| 3.4.1 | Transparency: reasoning displays, confidence metrics, source attribution, agent tracing | d3-052 (1), d3-053 (2), d3-059 (4), pro-051 (4), d3-051 (5) |
| 3.4.2 | Fairness evaluation: CloudWatch fairness metrics, A/B testing, LLM-as-a-judge | d3-054 (3), d3-056 (1), d3-060 (3), d3-055 (4), pro-052 (5) |
| 3.4.3 | Policy-compliant AI: Guardrails by policy, model cards, automated compliance checks | d3-057 (2), d3-058 (5) |

## Domain 4: Operational Efficiency and Optimization for GenAI Applications (12%)

| Skill | Scope | Question IDs (form) |
|---|---|---|
| 4.1.1 | Token efficiency: estimation, context optimization, response limits, prompt compression, pruning | d4-004 (1), d4-009 (3), d4-010 (1), pro-053 (5) |
| 4.1.2 | Cost-effective model selection: tiered usage, price-performance, efficient inference | d4-005 (2), d4-008 (2), d4-012 (3), pro-054 (5) |
| 4.1.3 | Throughput: batching, capacity planning, auto-scaling, provisioned throughput optimization | d4-006 (3), d4-007 (1) |
| 4.1.4 | Caching: semantic caching, result fingerprinting, edge caching, prompt caching | d4-001 (1), d4-002 (2), d4-003 (3), d4-011 (2), pro-055 (4) |
| 4.2.1 | Latency-cost tradeoffs: pre-computation, latency-optimized models, parallel requests, streaming | d4-015 (1), d4-013 (4), d4-014 (5) |
| 4.2.2 | Retrieval performance: index optimization, query preprocessing, hybrid search with custom scoring | d4-016 (2), d4-017 (3) |
| 4.2.3 | Throughput: token processing, batch inference, concurrency management | d4-018 (1), pro-056 (4) |
| 4.2.4 | Parameter tuning: temperature, top-k, top-p, A/B testing | d4-019 (4), d4-020 (5), pro-057 (5) |
| 4.2.5 | Resource allocation: capacity planning for tokens, utilization monitoring, GenAI-aware auto-scaling | d4-021 (2), d4-022 (3) |
| 4.2.6 | System performance: API profiling, vector DB query optimization, LLM latency reduction | d4-023 (1), d4-024 (2), pro-058 (4) |
| 4.3.1 | Holistic observability: operational metrics, tracing, business metrics, dashboards | d4-025 (3), d4-028 (2), d4-029 (5) |
| 4.3.2 | GenAI KPIs: token usage, hallucination rate, response drift, Model Invocation Logs, cost anomalies | d4-026 (1), d4-030 (3), d4-027 (4), pro-059 (5) |
| 4.3.3 | Integrated observability: compliance monitoring, forensic traceability, audit logging | d4-036 (3) |
| 4.3.4 | Tool performance: call-pattern tracking, multi-agent coordination, usage baselines | d4-031 (1), pro-060 (4) |
| 4.3.5 | Vector store operations: performance monitoring, index optimization, data quality | d4-032 (2) |
| 4.3.6 | GenAI failure modes: golden datasets, output diffing, reasoning path tracing | d4-033 (4), d4-035 (4), d4-034 (5), pro-061 (5) |

## Domain 5: Testing, Validation, and Troubleshooting (11%)

| Skill | Scope | Question IDs (form) |
|---|---|---|
| 5.1.1 | Assessment beyond traditional ML: relevance, factual accuracy, consistency, fluency | d5-001 (1), d5-002 (5), pro-062 (5) |
| 5.1.2 | Systematic model evaluation: Bedrock Model Evaluations, A/B, canary, cost-performance | d5-003 (2), d5-006 (2), d5-019 (3), d5-008 (4) |
| 5.1.3 | User-centered evaluation: feedback, ratings, annotation workflows | d5-009 (1), pro-063 (4), d5-010 (5) |
| 5.1.4 | QA processes: continuous evaluation, regression testing, quality gates | d5-011 (2), d5-020 (1), pro-064 (5) |
| 5.1.5 | Multi-perspective assessment: RAG evaluation, LLM-as-a-Judge, human feedback | d5-004 (3), d5-005 (1), d5-012 (3), d5-013 (1), d5-014 (2) |
| 5.1.6 | Retrieval quality testing: relevance scoring, context matching, latency | d5-015 (3), pro-065 (4) |
| 5.1.7 | Agent performance: task completion, tool usage effectiveness, agent evaluations | d5-016 (1) |
| 5.1.8 | Reporting to stakeholders: visualizations, automated reports, model comparisons | d5-017 (4), pro-066 (5) |
| 5.1.9 | Deployment validation: synthetic workflows, hallucination and semantic drift checks | d5-007 (3), d5-018 (2), pro-067 (4) |
| 5.2.1 | Content handling: context window overflow, dynamic chunking, truncation analysis | d5-021 (2), d5-022 (3) |
| 5.2.2 | FM integration issues: error logging, request validation, response analysis | d5-023 (1), d5-025 (2), d5-032 (3), d5-024 (5) |
| 5.2.3 | Prompt engineering problems: testing frameworks, version comparison, refinement | d5-026 (4), pro-068 (5) |
| 5.2.4 | Retrieval issues: relevance, embedding quality, drift, chunking, vector search performance | d5-027 (3), d5-028 (1), d5-029 (2), d5-031 (4) |
| 5.2.5 | Prompt maintenance: template testing, Logs diagnostics, X-Ray pipelines, schema validation | pro-069 (4), d5-030 (5) |
