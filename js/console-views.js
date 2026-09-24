/**
 * AWS Certified AI Practitioner (AIF-C01)
 * High-Fidelity AWS Management Console Visual Mockup Builder
 */

const CONSOLE_VIEWS = {
  // 1. Bedrock Guardrails Console Screen
  bedrock_guardrails_console: {
    serviceName: 'Amazon Bedrock',
    breadcrumbs: ['Amazon Bedrock', 'Safeguards', 'Guardrails', 'Compliance-PII-Safety-Guardrail'],
    title: 'Compliance-PII-Safety-Guardrail (Version 1 - Active)',
    statusBadge: 'Active',
    configs: [
      { label: 'Denied Topics', value: 'Prohibit Financial Investment Advice & Speculation', highlight: false },
      { label: 'Content Filters', value: 'Hate (High), Misconduct (High), Prompt Attacks (High)', highlight: true },
      { label: 'Sensitive Info Filters', value: 'Predefined: SSN, Credit Cards, TIN (Action: MASK)', highlight: true },
      { label: 'Contextual Grounding', value: 'Grounding Threshold: 0.85 | Relevance: 0.80', highlight: true }
    ],
    callout: 'Bedrock Guardrails natively masks sensitive PII and blocks prompt injection attacks across both inputs and outputs with zero custom code.'
  },

  // 2. Bedrock Knowledge Bases Console Screen
  bedrock_kb_console: {
    serviceName: 'Amazon Bedrock',
    breadcrumbs: ['Amazon Bedrock', 'Builder tools', 'Knowledge bases', 'Enterprise-Docs-KB'],
    title: 'Enterprise-Docs-KB (Managed RAG)',
    statusBadge: 'Ready',
    configs: [
      { label: 'Data Source', value: 's3://enterprise-policy-manuals-2026/', highlight: false },
      { label: 'Chunking Strategy', value: 'Hierarchical (Child chunk: 300 tokens, Parent: 1500 tokens)', highlight: true },
      { label: 'Embedding Model', value: 'Amazon Titan Text Embeddings V2 (1,536 dimensions)', highlight: true },
      { label: 'Vector Store', value: 'Amazon OpenSearch Serverless (Vector Search Collection)', highlight: true }
    ],
    callout: 'Syncing your S3 data source automatically re-indexes document embeddings into OpenSearch Serverless without manual ETL scripts.'
  },

  // 3. Bedrock Agents Console Screen
  bedrock_agent_console: {
    serviceName: 'Amazon Bedrock',
    breadcrumbs: ['Amazon Bedrock', 'Builder tools', 'Agents', 'CustomerSupportOrchestrator'],
    title: 'CustomerSupportOrchestrator (ReAct Framework)',
    statusBadge: 'Prepared',
    configs: [
      { label: 'Foundation Model', value: 'Anthropic Claude 3.5 Sonnet', highlight: false },
      { label: 'Action Group', value: 'OrdersAPIGroup (OpenAPI 3.0 Schema in S3)', highlight: true },
      { label: 'Action Lambda', value: 'arn:aws:lambda:us-east-1:123456789012:function:OrderHandler', highlight: true },
      { label: 'Associated KB', value: 'Enterprise-Refund-Policies-KB', highlight: true }
    ],
    callout: 'Bedrock Agents dynamically plan multi-step workflows, invoke Lambda functions via OpenAPI specs, and synthesize answers.'
  },

  // 4. SageMaker Clarify Bias & Explainability Console Screen
  clarify_console: {
    serviceName: 'Amazon SageMaker',
    breadcrumbs: ['Amazon SageMaker', 'Governance & Quality', 'Clarify', 'LoanApproval-Bias-Analysis'],
    title: 'LoanApproval-Bias-Analysis (Clarify Report)',
    statusBadge: 'Completed',
    configs: [
      { label: 'Pre-Training Metric (Data)', value: 'Difference in Positive Proportions in Labels (DPL) = 0.18', highlight: true },
      { label: 'Pre-Training Metric (Imbalance)', value: 'Class Imbalance (CI) = 0.38 (Disparate sample counts)', highlight: true },
      { label: 'Post-Training Metric (Model)', value: 'Disparate Impact (DI) = 0.72 (Alert: Below 0.8 threshold)', highlight: true },
      { label: 'Feature Attribution', value: 'Kernel SHAP (Local & Global Feature Importance)', highlight: true }
    ],
    callout: 'DPL evaluates pre-training raw dataset labels for fairness before training; Kernel SHAP provides exact local feature attribution.'
  },

  // 5. Amazon Q Business Admin Console Screen
  q_business_console: {
    serviceName: 'Amazon Q Business',
    breadcrumbs: ['Amazon Q Business', 'Applications', 'Corporate-Knowledge-Assistant'],
    title: 'Corporate-Knowledge-Assistant (Enterprise Chat)',
    statusBadge: 'Active',
    configs: [
      { label: 'Authentication', value: 'AWS IAM Identity Center (Corporate SAML 2.0 / Okta)', highlight: false },
      { label: 'Data Connectors', value: 'Microsoft SharePoint, Salesforce CRM, Amazon S3', highlight: true },
      { label: 'Permission Mode', value: 'Inherit Source ACLs (Document-level Access Control)', highlight: true },
      { label: 'Enterprise Plugins', value: 'Atlassian Jira (Create/Update Tickets), ServiceNow', highlight: true }
    ],
    callout: 'Amazon Q Business strictly enforces native document ACLs so non-technical enterprise staff only view data they are authorized to access.'
  },

  // 6. Amazon Q Developer Console Screen
  q_developer_console: {
    serviceName: 'Amazon Q Developer',
    breadcrumbs: ['Amazon Q Developer', 'Developer Hub', 'Transformations & Code Security'],
    title: 'Amazon Q Developer Workspace',
    statusBadge: 'Connected',
    configs: [
      { label: 'Supported Environments', value: 'VS Code, IntelliJ IDEA, AWS CLI, AWS Console', highlight: false },
      { label: 'Code Transformation', value: 'Automated Migration: Java 8/11 to Java 17 (Build passing)', highlight: true },
      { label: 'Security Vulnerability Scan', value: 'CWE Top 25 Scanned: 0 Critical, 0 High Vulnerabilities', highlight: true },
      { label: 'AWS Console Agent', value: 'Diagnose CloudWatch Errors & Generate IAM Policies', highlight: true }
    ],
    callout: 'Amazon Q Developer assists engineers with code generation, end-to-end version upgrades, security fixes, and console troubleshooting.'
  },

  // 7. Amazon Macie PII Discovery Console Screen
  macie_console: {
    serviceName: 'Amazon Macie',
    breadcrumbs: ['Amazon Macie', 'Sensitive Data Discovery', 'Findings', 'S3-Bucket-Scan-Job'],
    title: 'S3-Bucket-Scan-Job (Automated Discovery)',
    statusBadge: 'Findings Detected',
    configs: [
      { label: 'Target Storage', value: 's3://raw-customer-transcripts-2026/', highlight: false },
      { label: 'Sensitive Category', value: 'Financial & Personal Identification (PII / PHI)', highlight: true },
      { label: 'Findings Summary', value: '87 Unencrypted Payment Cards & Tax IDs Identified', highlight: true },
      { label: 'Automated Response', value: 'EventBridge -> Lambda: Enforce KMS Encryption & Restrict Access', highlight: true }
    ],
    callout: 'Amazon Macie uses ML and pattern matching to discover sensitive data in S3 before it is exposed or ingested into GenAI models.'
  },

  // 8. Amazon Pre-Trained AI Services Console Screen
  prebuilt_ai_console: {
    serviceName: 'AWS Pre-Trained AI Services',
    breadcrumbs: ['AWS Management Console', 'Artificial Intelligence', 'Vision, Speech & Language'],
    title: 'Ready-to-Use Managed AI APIs',
    statusBadge: 'Service Healthy',
    configs: [
      { label: 'Text & Documents', value: 'Amazon Textract (OCR, Tables, Key-Value Pairs, Queries)', highlight: true },
      { label: 'Natural Language', value: 'Amazon Comprehend (Sentiment, Entities, PII Redaction)', highlight: true },
      { label: 'Computer Vision', value: 'Amazon Rekognition (Labels, Faces, Moderation, Custom Labels)', highlight: true },
      { label: 'Speech & Audio', value: 'Amazon Transcribe (ASR Speech-to-Text) & Polly (TTS Voices)', highlight: true }
    ],
    callout: 'AWS managed AI services provide pre-trained intelligence via simple API calls without requiring machine learning models or infrastructure management.'
  }
};

/**
 * Builds HTML for AWS Console UI mockup
 */
function buildAwsConsoleHtml(viewKey) {
  const data = CONSOLE_VIEWS[viewKey] || CONSOLE_VIEWS['bedrock_guardrails_console'];
  
  let configItemsHtml = '';
  data.configs.forEach(item => {
    configItemsHtml += `
      <div class="aws-config-item">
        <div class="aws-config-label">${item.label}</div>
        <div class="aws-config-value ${item.highlight ? 'highlight' : ''}">${item.value}</div>
      </div>
    `;
  });

  return `
    <div class="aws-console-card">
      <div class="aws-console-topbar">
        <div class="aws-console-brand">
          <span class="aws-console-logo">aws</span>
          <span style="font-weight: 500;">Management Console</span>
        </div>
        <div class="aws-console-search">Search services, features, docs [Alt+S]</div>
        <div class="aws-console-region">
          <span>&bull;</span> us-east-1 (N. Virginia)
        </div>
      </div>
      <div class="aws-console-breadcrumbs">
        ${data.breadcrumbs.map((crumb, idx) => `<span>${crumb}</span>${idx < data.breadcrumbs.length - 1 ? ' &gt; ' : ''}`).join('')}
      </div>
      <div class="aws-console-body">
        <div class="aws-console-header-section">
          <div class="aws-console-service-title">${data.title}</div>
          <div class="aws-console-badge-active">${data.statusBadge}</div>
        </div>
        <div class="aws-console-config-grid">
          ${configItemsHtml}
        </div>
        <div class="aws-console-callout">
          <strong>Console Insight:</strong> ${data.callout}
        </div>
      </div>
    </div>
  `;
}
