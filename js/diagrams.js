/**
 * AWS Certified AI Practitioner (AIF-C01)
 * Architecture Diagram SVG Generator
 */

const DIAGRAMS = {
  // 1. Bedrock RAG Knowledge Base
  bedrock_rag: `
    <svg class="diagram-svg" viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6" />
        </marker>
        <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
        </marker>
      </defs>
      <!-- S3 Data Source -->
      <g transform="translate(15, 30)">
        <rect class="arch-node arch-node-aws" width="130" height="70" />
        <text class="arch-text-title" x="65" y="30" text-anchor="middle">Amazon S3</text>
        <text class="arch-text-sub" x="65" y="48" text-anchor="middle">Raw Documents (PDF, CSV)</text>
      </g>
      <!-- Chunking & Embedding -->
      <path class="arch-flow-line" d="M 145 65 L 195 65" marker-end="url(#arrow)" />
      <g transform="translate(195, 30)">
        <rect class="arch-node" width="140" height="70" />
        <text class="arch-text-title" x="70" y="30" text-anchor="middle">Embedding Model</text>
        <text class="arch-text-sub" x="70" y="48" text-anchor="middle">Titan Embeddings V2</text>
      </g>
      <!-- Vector Database -->
      <path class="arch-flow-line" d="M 335 65 L 385 65" marker-end="url(#arrow)" />
      <g transform="translate(385, 30)">
        <rect class="arch-node arch-node-aws" width="160" height="70" />
        <text class="arch-text-title" x="80" y="26" text-anchor="middle">Vector Database</text>
        <text class="arch-text-sub" x="80" y="44" text-anchor="middle">OpenSearch Serverless</text>
        <text class="arch-text-sub" x="80" y="58" text-anchor="middle">(Aurora pgvector / Pinecone)</text>
      </g>
      <!-- Bedrock Foundation Model -->
      <path class="arch-flow-line" d="M 545 65 L 595 65" marker-end="url(#arrow)" />
      <g transform="translate(595, 20)">
        <rect class="arch-node arch-node-active" width="165" height="90" />
        <text class="arch-text-title" x="82" y="30" text-anchor="middle">Amazon Bedrock FM</text>
        <text class="arch-text-sub" x="82" y="50" text-anchor="middle">Claude 3.5 / Titan Text</text>
        <text class="arch-text-sub" x="82" y="68" text-anchor="middle">Grounded Synthesis</text>
      </g>
      <!-- User Query & Return Flow -->
      <g transform="translate(195, 140)">
        <rect class="arch-node" width="140" height="65" />
        <text class="arch-text-title" x="70" y="28" text-anchor="middle">User Prompt</text>
        <text class="arch-text-sub" x="70" y="46" text-anchor="middle">Question &amp; Intent</text>
      </g>
      <path class="arch-flow-line" d="M 335 172 L 465 172 L 465 105" marker-end="url(#arrow)" />
      <text class="arch-flow-label" x="380" y="165">Semantic Search</text>
      <path class="arch-flow-line" style="stroke: #10b981;" d="M 680 115 L 680 172 L 340 172" marker-end="url(#arrow-green)" />
      <text class="arch-flow-label" x="480" y="195" style="fill: #065f46;">Grounded Answer + Citations</text>
    </svg>
  `,

  // 2. Bedrock Agents (ReAct Loop)
  bedrock_agent: `
    <svg class="diagram-svg" viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-blue2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
        </marker>
      </defs>
      <!-- User Input -->
      <g transform="translate(20, 75)">
        <rect class="arch-node" width="120" height="70" />
        <text class="arch-text-title" x="60" y="32" text-anchor="middle">User Request</text>
        <text class="arch-text-sub" x="60" y="50" text-anchor="middle">"Cancel Order &amp; Refund"</text>
      </g>
      <!-- Bedrock Agent Core -->
      <path class="arch-flow-line" d="M 140 110 L 200 110" marker-end="url(#arrow-blue2)" />
      <g transform="translate(200, 45)">
        <rect class="arch-node arch-node-active" width="180" height="130" />
        <text class="arch-text-title" x="90" y="28" text-anchor="middle">Amazon Bedrock Agent</text>
        <rect x="15" y="42" width="150" height="34" rx="4" fill="#dbeafe" />
        <text class="arch-text-title" x="90" y="64" text-anchor="middle" font-size="12" fill="#1e40af">ReAct Framework</text>
        <text class="arch-text-sub" x="90" y="96" text-anchor="middle">1. Reasoning (Chain of Thought)</text>
        <text class="arch-text-sub" x="90" y="112" text-anchor="middle">2. Action Plan Execution</text>
      </g>
      <!-- Action Group -->
      <path class="arch-flow-line" d="M 380 90 L 440 90" marker-end="url(#arrow-blue2)" />
      <g transform="translate(440, 40)">
        <rect class="arch-node" width="140" height="85" />
        <text class="arch-text-title" x="70" y="26" text-anchor="middle">Action Group</text>
        <text class="arch-text-sub" x="70" y="45" text-anchor="middle">OpenAPI 3.0 Schema</text>
        <text class="arch-text-sub" x="70" y="62" text-anchor="middle">+ Parameters</text>
      </g>
      <!-- Lambda Execution -->
      <path class="arch-flow-line" d="M 580 82 L 630 82" marker-end="url(#arrow-blue2)" />
      <g transform="translate(630, 40)">
        <rect class="arch-node arch-node-aws" width="130" height="85" />
        <text class="arch-text-title" x="65" y="28" text-anchor="middle">AWS Lambda</text>
        <text class="arch-text-sub" x="65" y="48" text-anchor="middle">Order System API</text>
        <text class="arch-text-sub" x="65" y="64" text-anchor="middle">Execute DB Change</text>
      </g>
      <!-- Knowledge Base Association -->
      <path class="arch-flow-line" d="M 380 145 L 440 170" marker-end="url(#arrow-blue2)" />
      <g transform="translate(440, 145)">
        <rect class="arch-node arch-node-aws" width="140" height="60" />
        <text class="arch-text-title" x="70" y="26" text-anchor="middle">Knowledge Base</text>
        <text class="arch-text-sub" x="70" y="44" text-anchor="middle">Refund Policy Docs</text>
      </g>
    </svg>
  `,

  // 3. Bedrock Guardrails
  bedrock_guardrails: `
    <svg class="diagram-svg" viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-pink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#ec4899" />
        </marker>
        <marker id="arrow-green2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
        </marker>
      </defs>
      <!-- Incoming Prompt -->
      <g transform="translate(15, 75)">
        <rect class="arch-node" width="115" height="70" />
        <text class="arch-text-title" x="57" y="32" text-anchor="middle">User Prompt</text>
        <text class="arch-text-sub" x="57" y="50" text-anchor="middle">Input Text</text>
      </g>
      <!-- Guardrail Filter Chain -->
      <path class="arch-flow-line-security" d="M 130 110 L 175 110" marker-end="url(#arrow-pink)" />
      <g transform="translate(175, 30)">
        <rect class="arch-node arch-node-security" width="370" height="165" />
        <text class="arch-text-title" x="185" y="24" text-anchor="middle" fill="#be185d">Amazon Bedrock Guardrails Pipeline</text>
        
        <rect x="15" y="38" width="160" height="50" rx="4" fill="#ffffff" stroke="#f472b6" />
        <text class="arch-text-title" x="95" y="58" text-anchor="middle" font-size="11">1. Denied Topics</text>
        <text class="arch-text-sub" x="95" y="74" text-anchor="middle" font-size="10">Prohibit off-topic advice</text>

        <rect x="195" y="38" width="160" height="50" rx="4" fill="#ffffff" stroke="#f472b6" />
        <text class="arch-text-title" x="275" y="58" text-anchor="middle" font-size="11">2. Content Filters</text>
        <text class="arch-text-sub" x="275" y="74" text-anchor="middle" font-size="10">Hate, Violence, Jailbreaks</text>

        <rect x="15" y="98" width="160" height="50" rx="4" fill="#ffffff" stroke="#f472b6" />
        <text class="arch-text-title" x="95" y="118" text-anchor="middle" font-size="11">3. Sensitive PII</text>
        <text class="arch-text-sub" x="95" y="134" text-anchor="middle" font-size="10">Mask/Block SSN &amp; Cards</text>

        <rect x="195" y="98" width="160" height="50" rx="4" fill="#ffffff" stroke="#f472b6" />
        <text class="arch-text-title" x="275" y="118" text-anchor="middle" font-size="11">4. Contextual Grounding</text>
        <text class="arch-text-sub" x="275" y="134" text-anchor="middle" font-size="10">Detect Hallucinations</text>
      </g>
      <!-- Bedrock Foundation Model -->
      <path class="arch-flow-line" d="M 545 110 L 595 110" marker-end="url(#arrow)" />
      <g transform="translate(595, 45)">
        <rect class="arch-node arch-node-active" width="165" height="60" />
        <text class="arch-text-title" x="82" y="26" text-anchor="middle">Foundation Model</text>
        <text class="arch-text-sub" x="82" y="44" text-anchor="middle">Inference Processing</text>
      </g>
      <!-- Safe Filtered Output -->
      <g transform="translate(595, 130)">
        <rect class="arch-node" width="165" height="60" stroke="#10b981" stroke-width="2" fill="#ecfdf5" />
        <text class="arch-text-title" x="82" y="26" text-anchor="middle" fill="#065f46">Safe Compliant Output</text>
        <text class="arch-text-sub" x="82" y="44" text-anchor="middle" fill="#047857">PII Masked &amp; Grounded</text>
      </g>
    </svg>
  `,

  // 4. SageMaker Clarify (Bias & SHAP Explainability)
  clarify_bias: `
    <svg class="diagram-svg" viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-purp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
        </marker>
      </defs>
      <!-- Pre-Training Data -->
      <g transform="translate(20, 30)">
        <rect class="arch-node arch-node-aws" width="130" height="70" />
        <text class="arch-text-title" x="65" y="28" text-anchor="middle">Historical Dataset</text>
        <text class="arch-text-sub" x="65" y="46" text-anchor="middle">S3 Training Data</text>
      </g>
      <!-- Pre-Training Bias -->
      <path class="arch-flow-line" style="stroke: #6366f1;" d="M 150 65 L 205 65" marker-end="url(#arrow-purp)" />
      <g transform="translate(205, 20)">
        <rect class="arch-node" width="160" height="90" stroke="#6366f1" fill="#eef2ff" />
        <text class="arch-text-title" x="80" y="25" text-anchor="middle" fill="#3730a3">Pre-Training Bias</text>
        <text class="arch-text-sub" x="80" y="45" text-anchor="middle">&bull; CI (Class Imbalance)</text>
        <text class="arch-text-sub" x="80" y="62" text-anchor="middle">&bull; DPL (Diff in Positive Labels)</text>
        <text class="arch-text-sub" x="80" y="78" text-anchor="middle" font-size="10" fill="#4338ca">Checks Raw Data Bias</text>
      </g>
      <!-- SageMaker Model Training -->
      <path class="arch-flow-line" style="stroke: #6366f1;" d="M 365 65 L 415 65" marker-end="url(#arrow-purp)" />
      <g transform="translate(415, 30)">
        <rect class="arch-node arch-node-aws" width="140" height="70" />
        <text class="arch-text-title" x="70" y="28" text-anchor="middle">SageMaker Training</text>
        <text class="arch-text-sub" x="70" y="46" text-anchor="middle">XGBoost / Deep Learning</text>
      </g>
      <!-- Post-Training Bias -->
      <path class="arch-flow-line" style="stroke: #6366f1;" d="M 555 65 L 605 65" marker-end="url(#arrow-purp)" />
      <g transform="translate(605, 20)">
        <rect class="arch-node" width="160" height="90" stroke="#6366f1" fill="#eef2ff" />
        <text class="arch-text-title" x="80" y="25" text-anchor="middle" fill="#3730a3">Post-Training Bias</text>
        <text class="arch-text-sub" x="80" y="45" text-anchor="middle">&bull; DPPL (Diff in Pred Labels)</text>
        <text class="arch-text-sub" x="80" y="62" text-anchor="middle">&bull; DI (Disparate Impact &lt; 0.8)</text>
        <text class="arch-text-sub" x="80" y="78" text-anchor="middle" font-size="10" fill="#4338ca">Checks Prediction Bias</text>
      </g>
      <!-- Explainability (SHAP) -->
      <path class="arch-flow-line" style="stroke: #10b981;" d="M 485 100 L 485 145" marker-end="url(#arrow)" />
      <g transform="translate(205, 145)">
        <rect class="arch-node" width="400" height="65" stroke="#10b981" fill="#ecfdf5" />
        <text class="arch-text-title" x="200" y="26" text-anchor="middle" fill="#065f46">Explainability: Kernel SHAP Feature Attributions</text>
        <text class="arch-text-sub" x="200" y="46" text-anchor="middle" fill="#047857">Local Explainability (Single Loan Decision) &amp; Global Feature Importance Ranking</text>
      </g>
    </svg>
  `,

  // 5. Generative AI Security Scoping Matrix
  security_scoping: `
    <svg class="diagram-svg" viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text class="arch-text-title" x="390" y="22" text-anchor="middle" font-size="14">AWS Generative AI Security Scoping Matrix</text>
      <!-- Scope 1 -->
      <g transform="translate(15, 45)">
        <rect class="arch-node" width="140" height="145" fill="#f8fafc" stroke="#cbd5e1" />
        <rect x="0" y="0" width="140" height="26" rx="6" fill="#e2e8f0" />
        <text class="arch-text-title" x="70" y="18" text-anchor="middle" font-size="11">Scope 1: Consumer</text>
        <text class="arch-text-sub" x="70" y="45" text-anchor="middle">&bull; Public SaaS Apps</text>
        <text class="arch-text-sub" x="70" y="65" text-anchor="middle">&bull; Zero Customer Control</text>
        <text class="arch-text-sub" x="70" y="85" text-anchor="middle">&bull; Highest Data Risk</text>
        <text class="arch-text-sub" x="70" y="115" text-anchor="middle" font-weight="700" fill="#991b1b">Public Web Chat</text>
      </g>
      <!-- Scope 2 -->
      <g transform="translate(165, 45)">
        <rect class="arch-node" width="140" height="145" fill="#f8fafc" stroke="#cbd5e1" />
        <rect x="0" y="0" width="140" height="26" rx="6" fill="#e2e8f0" />
        <text class="arch-text-title" x="70" y="18" text-anchor="middle" font-size="11">Scope 2: Enterprise</text>
        <text class="arch-text-sub" x="70" y="45" text-anchor="middle">&bull; Enterprise 3rd-Party</text>
        <text class="arch-text-sub" x="70" y="65" text-anchor="middle">&bull; Commercial Terms</text>
        <text class="arch-text-sub" x="70" y="85" text-anchor="middle">&bull; SSO / Identity</text>
        <text class="arch-text-sub" x="70" y="115" text-anchor="middle" font-weight="700" fill="#1e40af">Salesforce / Slack</text>
      </g>
      <!-- Scope 3 (Highlight) -->
      <g transform="translate(315, 35)">
        <rect class="arch-node arch-node-aws" width="150" height="165" stroke-width="2.5" />
        <rect x="0" y="0" width="150" height="28" rx="6" fill="#ff9900" />
        <text class="arch-text-title" x="75" y="19" text-anchor="middle" font-size="12" fill="#111">Scope 3: Pre-trained FM</text>
        <text class="arch-text-title" x="75" y="48" text-anchor="middle" font-size="12" fill="#d97706">Amazon Bedrock API</text>
        <text class="arch-text-sub" x="75" y="70" text-anchor="middle">&bull; AWS Manages Infra</text>
        <text class="arch-text-sub" x="75" y="88" text-anchor="middle">&bull; Customer Owns Data</text>
        <text class="arch-text-sub" x="75" y="106" text-anchor="middle" font-weight="700" fill="#047857">&bull; No Base Model Training</text>
        <text class="arch-text-sub" x="75" y="126" text-anchor="middle">&bull; KMS Key Support</text>
        <text class="arch-text-sub" x="75" y="146" text-anchor="middle" font-weight="700" fill="#2563eb">Highest Exam Focus!</text>
      </g>
      <!-- Scope 4 -->
      <g transform="translate(475, 45)">
        <rect class="arch-node" width="140" height="145" fill="#f8fafc" stroke="#cbd5e1" />
        <rect x="0" y="0" width="140" height="26" rx="6" fill="#e2e8f0" />
        <text class="arch-text-title" x="70" y="18" text-anchor="middle" font-size="11">Scope 4: Fine-Tuned</text>
        <text class="arch-text-sub" x="70" y="45" text-anchor="middle">&bull; Custom Adapters</text>
        <text class="arch-text-sub" x="70" y="65" text-anchor="middle">&bull; Customer Dataset</text>
        <text class="arch-text-sub" x="70" y="85" text-anchor="middle">&bull; Private KMS Encrypt</text>
        <text class="arch-text-sub" x="70" y="115" text-anchor="middle" font-weight="700" fill="#3730a3">Bedrock Fine-Tuning</text>
      </g>
      <!-- Scope 5 -->
      <g transform="translate(625, 45)">
        <rect class="arch-node" width="140" height="145" fill="#f8fafc" stroke="#cbd5e1" />
        <rect x="0" y="0" width="140" height="26" rx="6" fill="#e2e8f0" />
        <text class="arch-text-title" x="70" y="18" text-anchor="middle" font-size="11">Scope 5: Self-Hosted</text>
        <text class="arch-text-sub" x="70" y="45" text-anchor="middle">&bull; Full Customer Control</text>
        <text class="arch-text-sub" x="70" y="65" text-anchor="middle">&bull; OS &amp; Container Mgmt</text>
        <text class="arch-text-sub" x="70" y="85" text-anchor="middle">&bull; Max Responsibility</text>
        <text class="arch-text-sub" x="70" y="115" text-anchor="middle" font-weight="700" fill="#1f2937">EC2 / SageMaker IaaS</text>
      </g>
      <!-- Responsibility Arrow Bottom -->
      <path d="M 25 210 L 755 210" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />
      <text class="arch-text-sub" x="25" y="224">Less Customer Control / More AWS Management</text>
      <text class="arch-text-sub" x="755" y="224" text-anchor="end">Full Customer Control &amp; Responsibility</text>
    </svg>
  `,

  // 6. Amazon Q Business Enterprise Architecture
  q_business_arch: `
    <svg class="diagram-svg" viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">
      <!-- Enterprise Data Sources -->
      <g transform="translate(20, 25)">
        <rect class="arch-node" width="150" height="175" fill="#f8fafc" />
        <text class="arch-text-title" x="75" y="24" text-anchor="middle">Corporate Data Sources</text>
        <rect x="15" y="38" width="120" height="28" rx="4" fill="#ffffff" stroke="#cbd5e1" />
        <text class="arch-text-sub" x="75" y="56" text-anchor="middle">Microsoft SharePoint</text>
        <rect x="15" y="72" width="120" height="28" rx="4" fill="#ffffff" stroke="#cbd5e1" />
        <text class="arch-text-sub" x="75" y="90" text-anchor="middle">Salesforce &amp; Jira</text>
        <rect x="15" y="106" width="120" height="28" rx="4" fill="#ffffff" stroke="#cbd5e1" />
        <text class="arch-text-sub" x="75" y="124" text-anchor="middle">Confluence / Google Drive</text>
        <rect x="15" y="140" width="120" height="26" rx="4" fill="#fff7ed" stroke="#ffedd5" />
        <text class="arch-text-sub" x="75" y="157" text-anchor="middle" fill="#c2410c">Amazon S3 Buckets</text>
      </g>
      <!-- Amazon Q Business App -->
      <path class="arch-flow-line" d="M 170 110 L 230 110" marker-end="url(#arrow)" />
      <g transform="translate(230, 30)">
        <rect class="arch-node arch-node-active" width="280" height="165" />
        <text class="arch-text-title" x="140" y="26" text-anchor="middle" fill="#1e40af">Amazon Q Business Application</text>
        
        <rect x="15" y="42" width="250" height="42" rx="4" fill="#ffffff" stroke="#93c5fd" />
        <text class="arch-text-title" x="140" y="60" text-anchor="middle" font-size="11">Native Enterprise ACL Inheritance</text>
        <text class="arch-text-sub" x="140" y="74" text-anchor="middle" font-size="10">Users only see documents they have rights to</text>

        <rect x="15" y="92" width="250" height="30" rx="4" fill="#ffffff" stroke="#93c5fd" />
        <text class="arch-text-sub" x="140" y="111" text-anchor="middle">Document Indexing &amp; Semantic Retrieval</text>

        <rect x="15" y="128" width="250" height="30" rx="4" fill="#ffffff" stroke="#93c5fd" />
        <text class="arch-text-sub" x="140" y="147" text-anchor="middle">Enterprise Action Plugins (Jira, Zendesk)</text>
      </g>
      <!-- Knowledge Worker User -->
      <path class="arch-flow-line" d="M 510 110 L 570 110" marker-end="url(#arrow)" />
      <g transform="translate(570, 45)">
        <rect class="arch-node" width="180" height="135" stroke="#10b981" fill="#ecfdf5" />
        <text class="arch-text-title" x="90" y="28" text-anchor="middle" fill="#065f46">Knowledge Worker</text>
        <text class="arch-text-sub" x="90" y="48" text-anchor="middle">(HR, Legal, Sales, Analysts)</text>
        <rect x="15" y="60" width="150" height="30" rx="4" fill="#ffffff" />
        <text class="arch-text-sub" x="90" y="80" text-anchor="middle">Slack, Teams, Web Portal</text>
        <text class="arch-text-sub" x="90" y="112" text-anchor="middle" font-weight="700" fill="#047857">Grounded Answers &amp; Citations</text>
      </g>
    </svg>
  `,

  // 7. SageMaker Inference Types
  inference_types: `
    <svg class="diagram-svg" viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text class="arch-text-title" x="390" y="22" text-anchor="middle" font-size="14">Amazon SageMaker Deployment &amp; Inference Modes</text>
      <!-- Real-time -->
      <g transform="translate(15, 45)">
        <rect class="arch-node" width="170" height="160" fill="#eff6ff" stroke="#3b82f6" />
        <text class="arch-text-title" x="85" y="26" text-anchor="middle" fill="#1e40af">Real-Time Inference</text>
        <text class="arch-text-sub" x="85" y="50" text-anchor="middle">&bull; Persistent 24/7 Endpoint</text>
        <text class="arch-text-sub" x="85" y="70" text-anchor="middle">&bull; Latency: Milliseconds</text>
        <text class="arch-text-sub" x="85" y="90" text-anchor="middle">&bull; Dedicated Compute</text>
        <rect x="15" y="105" width="140" height="42" rx="4" fill="#ffffff" />
        <text class="arch-text-sub" x="85" y="122" text-anchor="middle" font-weight="700" fill="#1d4ed8">Use Case:</text>
        <text class="arch-text-sub" x="85" y="138" text-anchor="middle">Fraud, Interactive Web</text>
      </g>
      <!-- Serverless -->
      <g transform="translate(205, 45)">
        <rect class="arch-node" width="170" height="160" fill="#f0fdf4" stroke="#10b981" />
        <text class="arch-text-title" x="85" y="26" text-anchor="middle" fill="#166534">Serverless Inference</text>
        <text class="arch-text-sub" x="85" y="50" text-anchor="middle">&bull; Automatic Scale to Zero</text>
        <text class="arch-text-sub" x="85" y="70" text-anchor="middle">&bull; Pay Per Request</text>
        <text class="arch-text-sub" x="85" y="90" text-anchor="middle">&bull; Intermittent Traffic</text>
        <rect x="15" y="105" width="140" height="42" rx="4" fill="#ffffff" />
        <text class="arch-text-sub" x="85" y="122" text-anchor="middle" font-weight="700" fill="#15803d">Use Case:</text>
        <text class="arch-text-sub" x="85" y="138" text-anchor="middle">Chatbots, Low-volume</text>
      </g>
      <!-- Asynchronous -->
      <g transform="translate(395, 45)">
        <rect class="arch-node" width="170" height="160" fill="#faf5ff" stroke="#a855f7" />
        <text class="arch-text-title" x="85" y="26" text-anchor="middle" fill="#6b21a8">Asynchronous Inference</text>
        <text class="arch-text-sub" x="85" y="50" text-anchor="middle">&bull; Queued Requests (S3)</text>
        <text class="arch-text-sub" x="85" y="70" text-anchor="middle">&bull; Large Payloads (1GB+)</text>
        <text class="arch-text-sub" x="85" y="90" text-anchor="middle">&bull; Up to 1-Hour Processing</text>
        <rect x="15" y="105" width="140" height="42" rx="4" fill="#ffffff" />
        <text class="arch-text-sub" x="85" y="122" text-anchor="middle" font-weight="700" fill="#7e22ce">Use Case:</text>
        <text class="arch-text-sub" x="85" y="138" text-anchor="middle">HD Video, High-Res Image</text>
      </g>
      <!-- Batch Transform -->
      <g transform="translate(585, 45)">
        <rect class="arch-node" width="170" height="160" fill="#fffbeb" stroke="#f59e0b" />
        <text class="arch-text-title" x="85" y="26" text-anchor="middle" fill="#92400e">Batch Transform</text>
        <text class="arch-text-sub" x="85" y="50" text-anchor="middle">&bull; Offline Bulk Datasets</text>
        <text class="arch-text-sub" x="85" y="70" text-anchor="middle">&bull; No Persistent Endpoint</text>
        <text class="arch-text-sub" x="85" y="90" text-anchor="middle">&bull; Spins down when done</text>
        <rect x="15" y="105" width="140" height="42" rx="4" fill="#ffffff" />
        <text class="arch-text-sub" x="85" y="122" text-anchor="middle" font-weight="700" fill="#b45309">Use Case:</text>
        <text class="arch-text-sub" x="85" y="138" text-anchor="middle">Nightly Customer Churn</text>
      </g>
    </svg>
  `
};

/**
 * Helper to get a diagram by key, or fallback to Bedrock RAG
 */
function getDiagramSvg(key) {
  if (DIAGRAMS[key]) {
    return DIAGRAMS[key];
  }
  return DIAGRAMS['bedrock_rag'];
}
