/* AIP-C01 blueprint, transcribed (short titles) from the official exam guide (2026).
   Domain weights are % of scored content. Every question and lesson maps to a task and skill. */
window.BLUEPRINT = {
  exam: {
    code: "AIP-C01",
    name: "AWS Certified Generative AI Developer – Professional",
    total: 75,
    scored: 65,
    unscored: 10,
    minutes: 180,
    passScaled: 750,
    scaleMax: 1000,
  },
  domains: [
    {
      id: 1,
      weight: 31,
      short: "FM Integration & Data",
      title: "Foundation Model Integration, Data Management, and Compliance",
      tasks: [
        {
          id: "1.1",
          title: "Analyze requirements and design GenAI solutions",
          skills: [
            [
              "1.1.1",
              "Architectural designs that fit business needs and constraints (FMs, integration patterns, deployment strategies)",
            ],
            [
              "1.1.2",
              "Proof-of-concept to validate feasibility, performance and value before scaling (Bedrock)",
            ],
            [
              "1.1.3",
              "Standardized components for consistent delivery (Well-Architected Framework, GenAI Lens)",
            ],
          ],
        },
        {
          id: "1.2",
          title: "Select and configure FMs",
          skills: [
            [
              "1.2.1",
              "Assess and choose FMs: benchmarks, capability analysis, limitations",
            ],
            [
              "1.2.2",
              "Dynamic model selection and provider switching without code changes (Lambda, API Gateway, AppConfig)",
            ],
            [
              "1.2.3",
              "Resilient AI: Step Functions circuit breakers, cross-Region inference, graceful degradation",
            ],
            [
              "1.2.4",
              "Customization lifecycle: SageMaker AI fine-tuned models, LoRA/adapters, Model Registry, rollback, retirement",
            ],
          ],
        },
        {
          id: "1.3",
          title: "Data validation and processing pipelines for FM consumption",
          skills: [
            [
              "1.3.1",
              "Data validation workflows (Glue Data Quality, Data Wrangler, Lambda, CloudWatch)",
            ],
            [
              "1.3.2",
              "Processing text, image, audio and tabular data (Bedrock multimodal, SageMaker Processing, Transcribe)",
            ],
            [
              "1.3.3",
              "Format input per model requirements (Bedrock JSON, SageMaker payloads, conversation formats)",
            ],
            [
              "1.3.4",
              "Improve input quality (Bedrock reformatting, Comprehend entities, Lambda normalization)",
            ],
          ],
        },
        {
          id: "1.4",
          title: "Design and implement vector store solutions",
          skills: [
            [
              "1.4.1",
              "Vector architectures for FM augmentation (Knowledge Bases, OpenSearch + Neural plugin, RDS/Aurora, DynamoDB metadata)",
            ],
            [
              "1.4.2",
              "Metadata frameworks for search precision (S3 metadata, authorship attributes, domain tags)",
            ],
            [
              "1.4.3",
              "High-performance vector search at scale (OpenSearch sharding, multi-index, hierarchical indexing)",
            ],
            [
              "1.4.4",
              "Integration with document systems, knowledge bases and wikis",
            ],
            [
              "1.4.5",
              "Data maintenance: incremental updates, change detection, sync workflows, scheduled refresh",
            ],
          ],
        },
        {
          id: "1.5",
          title: "Design retrieval mechanisms for FM augmentation",
          skills: [
            ["1.5.1", "Document segmentation / chunking approaches"],
            [
              "1.5.2",
              "Select and configure embedding models (Titan, dimensionality, domain fit, batch embedding)",
            ],
            [
              "1.5.3",
              "Deploy vector search (OpenSearch, Aurora pgvector, Knowledge Bases)",
            ],
            [
              "1.5.4",
              "Advanced search: semantic, hybrid keyword+vector, Bedrock reranker models",
            ],
            [
              "1.5.5",
              "Query handling: expansion, decomposition, transformation",
            ],
            [
              "1.5.6",
              "Consistent retrieval access: function calling, MCP clients, standardized APIs",
            ],
          ],
        },
        {
          id: "1.6",
          title:
            "Prompt engineering strategies and governance for FM interactions",
          skills: [
            [
              "1.6.1",
              "Instruction frameworks: Prompt Management roles/templates, Guardrails",
            ],
            [
              "1.6.2",
              "Interactive systems that keep context (Step Functions clarification, Comprehend intent, DynamoDB history)",
            ],
            [
              "1.6.3",
              "Prompt governance: parameterized templates, approvals, S3 repos, CloudTrail, CloudWatch Logs",
            ],
            [
              "1.6.4",
              "Prompt QA: Lambda output checks, Step Functions edge cases, CloudWatch regression",
            ],
            [
              "1.6.5",
              "Advanced prompting: structured input, output formats, chain-of-thought, feedback loops",
            ],
            ["1.6.6", "Complex prompt systems with Bedrock Prompt Flows"],
          ],
        },
      ],
    },
    {
      id: 2,
      weight: 26,
      short: "Implementation & Integration",
      title: "Implementation and Integration",
      tasks: [
        {
          id: "2.1",
          title: "Agentic AI solutions and tool integrations",
          skills: [
            [
              "2.1.1",
              "Autonomous systems with memory and state (Strands Agents, AWS Agent Squad, MCP)",
            ],
            [
              "2.1.2",
              "Structured reasoning: ReAct and chain-of-thought with Step Functions",
            ],
            [
              "2.1.3",
              "Safeguarded workflows: stopping conditions, timeouts, IAM boundaries, circuit breakers",
            ],
            [
              "2.1.4",
              "Model coordination: specialized FMs, ensemble aggregation, model selection frameworks",
            ],
            [
              "2.1.5",
              "Human-in-the-loop: Step Functions approvals, API Gateway feedback, human augmentation",
            ],
            [
              "2.1.6",
              "Reliable tool integrations: Strands API, function definitions, Lambda error handling and validation",
            ],
            [
              "2.1.7",
              "Model extension: stateless MCP servers on Lambda, complex MCP servers on ECS, MCP clients",
            ],
          ],
        },
        {
          id: "2.2",
          title: "Model deployment strategies",
          skills: [
            [
              "2.2.1",
              "Deploy per need: Lambda on-demand, Bedrock Provisioned Throughput, SageMaker endpoints, hybrid",
            ],
            [
              "2.2.2",
              "LLM-specific deployment: containers, memory, GPU utilization, token capacity, model loading",
            ],
            [
              "2.2.3",
              "Balance performance and resources: right-size models, smaller pre-trained models, model cascading",
            ],
          ],
        },
        {
          id: "2.3",
          title: "Enterprise integration architectures",
          skills: [
            [
              "2.3.1",
              "Connect to enterprise systems: API integrations, event-driven loose coupling, data synchronization",
            ],
            [
              "2.3.2",
              "Add GenAI to existing apps: API Gateway, Lambda webhooks, EventBridge",
            ],
            [
              "2.3.3",
              "Secure access: identity federation, RBAC, least-privilege API access",
            ],
            [
              "2.3.4",
              "Cross-environment: Outposts, Wavelength, secure cloud-to-on-prem routing, compliance across jurisdictions",
            ],
            [
              "2.3.5",
              "CI/CD and GenAI gateway architectures (CodePipeline, CodeBuild, automated tests, rollback)",
            ],
          ],
        },
        {
          id: "2.4",
          title: "FM API integrations",
          skills: [
            [
              "2.4.1",
              "Flexible interaction: sync Bedrock APIs, SDKs, SQS async, API Gateway request validation",
            ],
            [
              "2.4.2",
              "Real-time: streaming APIs, WebSockets/SSE, chunked transfer",
            ],
            [
              "2.4.3",
              "Resilience: SDK exponential backoff, API Gateway rate limiting, fallbacks, X-Ray",
            ],
            [
              "2.4.4",
              "Model routing: static, Step Functions content-based, metric-based, API Gateway transformations",
            ],
          ],
        },
        {
          id: "2.5",
          title: "Application integration patterns and development tools",
          skills: [
            [
              "2.5.1",
              "FM API interfaces: streaming through API Gateway, token limits, retries for timeouts",
            ],
            [
              "2.5.2",
              "Accessible AI interfaces: Amplify, OpenAPI, Prompt Flows no-code builders",
            ],
            [
              "2.5.3",
              "Business system enhancements: Lambda CRM, Step Functions document processing, Bedrock Data Automation",
            ],
            [
              "2.5.4",
              "Developer productivity: Amazon Q Developer for code generation, refactoring, testing",
            ],
            [
              "2.5.5",
              "Advanced GenAI apps: Strands, Agent Squad, Step Functions agent patterns, prompt chaining",
            ],
            [
              "2.5.6",
              "Troubleshooting efficiency: Logs Insights, X-Ray, Q Developer error recognition",
            ],
          ],
        },
      ],
    },
    {
      id: 3,
      weight: 20,
      short: "Safety, Security & Governance",
      title: "AI Safety, Security, and Governance",
      tasks: [
        {
          id: "3.1",
          title: "Input and output safety controls",
          skills: [
            [
              "3.1.1",
              "Input content safety: Guardrails, custom moderation with Step Functions/Lambda",
            ],
            [
              "3.1.2",
              "Output safety: Guardrails, toxicity evaluation, text-to-SQL for deterministic results",
            ],
            [
              "3.1.3",
              "Hallucination reduction: Knowledge Bases grounding, confidence scoring, JSON Schema outputs",
            ],
            [
              "3.1.4",
              "Defense in depth: Comprehend pre-filters, Guardrails, Lambda post-processing, API response filtering",
            ],
            [
              "3.1.5",
              "Threat detection: prompt injection, jailbreaks, sanitization, adversarial testing",
            ],
          ],
        },
        {
          id: "3.2",
          title: "Data security and privacy controls",
          skills: [
            [
              "3.2.1",
              "Protected environments: VPC endpoints, IAM, Lake Formation, CloudWatch monitoring",
            ],
            [
              "3.2.2",
              "Privacy-preserving: Comprehend/Macie PII, Bedrock privacy features, Guardrails, S3 Lifecycle retention",
            ],
            [
              "3.2.3",
              "Privacy with utility: masking, PII detection, anonymization",
            ],
          ],
        },
        {
          id: "3.3",
          title: "AI governance and compliance mechanisms",
          skills: [
            [
              "3.3.1",
              "Compliance frameworks: model cards, Glue lineage, tagging, CloudWatch decision logs",
            ],
            [
              "3.3.2",
              "Data source tracking: Glue Data Catalog, source attribution metadata, CloudTrail",
            ],
            [
              "3.3.3",
              "Organizational governance aligned to policy, regulation and responsible AI",
            ],
            [
              "3.3.4",
              "Continuous monitoring: misuse/drift/policy detection, bias drift, alerting, token-level redaction",
            ],
          ],
        },
        {
          id: "3.4",
          title: "Responsible AI principles",
          skills: [
            [
              "3.4.1",
              "Transparency: reasoning displays, confidence metrics, source attribution, agent tracing",
            ],
            [
              "3.4.2",
              "Fairness evaluation: CloudWatch fairness metrics, A/B testing, LLM-as-a-judge",
            ],
            [
              "3.4.3",
              "Policy-compliant AI: Guardrails by policy, model cards, automated compliance checks",
            ],
          ],
        },
      ],
    },
    {
      id: 4,
      weight: 12,
      short: "Efficiency & Optimization",
      title: "Operational Efficiency and Optimization for GenAI Applications",
      tasks: [
        {
          id: "4.1",
          title: "Cost optimization and resource efficiency",
          skills: [
            [
              "4.1.1",
              "Token efficiency: estimation, context optimization, response limits, prompt compression, pruning",
            ],
            [
              "4.1.2",
              "Cost-effective model selection: tiered usage, price-performance, efficient inference",
            ],
            [
              "4.1.3",
              "Throughput: batching, capacity planning, auto-scaling, provisioned throughput optimization",
            ],
            [
              "4.1.4",
              "Caching: semantic caching, result fingerprinting, edge caching, prompt caching",
            ],
          ],
        },
        {
          id: "4.2",
          title: "Optimize application performance",
          skills: [
            [
              "4.2.1",
              "Latency-cost tradeoffs: pre-computation, latency-optimized models, parallel requests, streaming",
            ],
            [
              "4.2.2",
              "Retrieval performance: index optimization, query preprocessing, hybrid search with custom scoring",
            ],
            [
              "4.2.3",
              "Throughput: token processing, batch inference, concurrency management",
            ],
            [
              "4.2.4",
              "Parameter tuning: temperature, top-k, top-p, A/B testing",
            ],
            [
              "4.2.5",
              "Resource allocation: capacity planning for tokens, utilization monitoring, GenAI-aware auto-scaling",
            ],
            [
              "4.2.6",
              "System performance: API profiling, vector DB query optimization, LLM latency reduction",
            ],
          ],
        },
        {
          id: "4.3",
          title: "Monitoring systems for GenAI applications",
          skills: [
            [
              "4.3.1",
              "Holistic observability: operational metrics, tracing, business metrics, dashboards",
            ],
            [
              "4.3.2",
              "GenAI KPIs: token usage, hallucination rate, response drift, Model Invocation Logs, cost anomalies",
            ],
            [
              "4.3.3",
              "Integrated observability: compliance monitoring, forensic traceability, audit logging",
            ],
            [
              "4.3.4",
              "Tool performance: call-pattern tracking, multi-agent coordination, usage baselines",
            ],
            [
              "4.3.5",
              "Vector store operations: performance monitoring, index optimization, data quality",
            ],
            [
              "4.3.6",
              "GenAI failure modes: golden datasets, output diffing, reasoning path tracing",
            ],
          ],
        },
      ],
    },
    {
      id: 5,
      weight: 11,
      short: "Testing & Troubleshooting",
      title: "Testing, Validation, and Troubleshooting",
      tasks: [
        {
          id: "5.1",
          title: "Evaluation systems for GenAI",
          skills: [
            [
              "5.1.1",
              "Assessment beyond traditional ML: relevance, factual accuracy, consistency, fluency",
            ],
            [
              "5.1.2",
              "Systematic model evaluation: Bedrock Model Evaluations, A/B, canary, cost-performance",
            ],
            [
              "5.1.3",
              "User-centered evaluation: feedback, ratings, annotation workflows",
            ],
            [
              "5.1.4",
              "QA processes: continuous evaluation, regression testing, quality gates",
            ],
            [
              "5.1.5",
              "Multi-perspective assessment: RAG evaluation, LLM-as-a-Judge, human feedback",
            ],
            [
              "5.1.6",
              "Retrieval quality testing: relevance scoring, context matching, latency",
            ],
            [
              "5.1.7",
              "Agent performance: task completion, tool usage effectiveness, agent evaluations",
            ],
            [
              "5.1.8",
              "Reporting to stakeholders: visualizations, automated reports, model comparisons",
            ],
            [
              "5.1.9",
              "Deployment validation: synthetic workflows, hallucination and semantic drift checks",
            ],
          ],
        },
        {
          id: "5.2",
          title: "Troubleshoot GenAI applications",
          skills: [
            [
              "5.2.1",
              "Content handling: context window overflow, dynamic chunking, truncation analysis",
            ],
            [
              "5.2.2",
              "FM integration issues: error logging, request validation, response analysis",
            ],
            [
              "5.2.3",
              "Prompt engineering problems: testing frameworks, version comparison, refinement",
            ],
            [
              "5.2.4",
              "Retrieval issues: relevance, embedding quality, drift, chunking, vector search performance",
            ],
            [
              "5.2.5",
              "Prompt maintenance: template testing, Logs diagnostics, X-Ray pipelines, schema validation",
            ],
          ],
        },
      ],
    },
  ],
};
(function () {
  const B = window.BLUEPRINT;
  B.taskIndex = {};
  B.skillIndex = {};
  for (const d of B.domains)
    for (const t of d.tasks) {
      t.domain = d.id;
      B.taskIndex[t.id] = t;
      t.skills = t.skills.map(([id, text]) => {
        const s = { id, text, task: t.id, domain: d.id };
        B.skillIndex[id] = s;
        return s;
      });
    }
  // Questions per full mock, proportional to weights (31/26/20/12/11 of 75) and totalling 75.
  B.mockCounts = [23, 20, 15, 9, 8];
})();
