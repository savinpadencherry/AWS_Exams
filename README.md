# AWS Certified AI Practitioner (AIF-C01) Exam Simulation & Hyper-Learning Platform

[![AWS Certified](https://img.shields.io/badge/AWS-Certified%20AI%20Practitioner%20(AIF--C01)-FF9900?logo=amazon-aws&logoColor=white)](https://aws.amazon.com/certification/certified-ai-practitioner/)
[![Exam Mode](https://img.shields.io/badge/Exam%20Mode-Pearson%20VUE%20Simulated-002D62)](https://home.pearsonvue.com/)
[![Questions](https://img.shields.io/badge/Questions-325%20Scenario%20Questions-232F3E)](https://github.com/savinpadencherry/AWS_Exams)
[![Passing Score](https://img.shields.io/badge/Passing%20Score-700%20%2F%201000-059669)](https://aws.amazon.com/certification/certified-ai-practitioner/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Vanilla%20JS%2FCSS)-blue)](https://github.com/savinpadencherry/AWS_Exams)

An interactive, high-fidelity **Pearson VUE exam simulator** and **hyper-learning platform** for the **AWS Certified AI Practitioner (AIF-C01)** certification exam. Built strictly against the official AWS Exam Guide blueprint and the latest 2025 generative AI curriculum.

---

## 🎯 Platform Highlights

### 1. Dual Mode System
* **Exam Mode (Testing Center Simulation)**:
  * Strict **90-minute countdown timer** with auto-submission on expiration.
  * Real Pearson VUE Navy & Gray interface styling, typography, and controls.
  * Single-choice (radio) and multiple-response (checkbox) question mechanics.
  * Flag questions for review with a 65-question grid navigator.
  * Pre-submission review screen displaying answered, unanswered, and flagged questions.
  * Official AWS scaled scoring algorithm (**100–1000 scale, 700 passing score**).
  * Comprehensive domain performance diagnostics with mastery progress bars.
* **Hyper-Learning Mode (Deep Mastery & Immediate Feedback)**:
  * Instant visual feedback on every selected answer (green for correct, red for incorrect).
  * **Simplified Plain-English Explanations**: Core intuition without academic jargon.
  * **Distractor Breakdown**: Deep analysis of why every incorrect option is wrong, identifying common exam traps.
  * **Pearson VUE Exam Watch Tips**: High-yield heuristics and keywords to watch for in question stems.
  * **Interactive SVG Architecture Diagrams**: Visualizing data flows, RAG pipelines, Bedrock agent loops, and security boundaries.
  * **Simulated AWS Management Console Cards**: Visualizing exactly how settings appear inside the real AWS console (Bedrock Guardrails, Knowledge Bases, SageMaker Clarify, Amazon Q).

---

## 📚 5 Full-Length Mock Exams (325 Total Scenario Questions)

Every mock exam consists of **65 questions** structured precisely to match the official AWS AIF-C01 blueprint weightings:

| Domain | Domain Title | Official Weight | Questions / Exam |
| :---: | :--- | :---: | :---: |
| **Domain 1** | Fundamentals of AI and Machine Learning | 20% | 13 Questions |
| **Domain 2** | Fundamentals of Generative AI | 24% | 16 Questions |
| **Domain 3** | Applications of Foundation Models | 28% | 18 Questions |
| **Domain 4** | Guidelines for Responsible AI | 14% | 9 Questions |
| **Domain 5** | Security, Compliance, and Governance for AI Solutions | 14% | 9 Questions |
| **Total** | **Full Pearson VUE Blueprint** | **100%** | **65 Questions** |

### Mock Exam Breakdown
1. **Mock Exam 1: Bedrock, Generative AI & Foundation Models Mastery**
   * *Focus*: Amazon Bedrock (Knowledge Bases, Agents, Guardrails, Model Evaluation), Foundation Model selection, prompt engineering techniques (Zero-shot, Few-shot, Chain-of-Thought), and GenAI architectures.
2. **Mock Exam 2: Machine Learning Lifecycle & SageMaker Architecture**
   * *Focus*: End-to-end ML lifecycle (data prep, feature engineering, model training, tuning, deployment, monitoring), Amazon SageMaker Studio, Canvas, Feature Store, Model Monitor, Clarify, and inference patterns (Real-Time, Serverless, Asynchronous, Batch Transform).
3. **Mock Exam 3: Real-World AWS AI Services, Vision, Speech & NLP**
   * *Focus*: Purpose-built pre-trained AI services: Amazon Rekognition, Comprehend, Textract, Transcribe, Polly, Translate, Kendra, Lex, and Amazon Q (Business vs. Developer).
4. **Mock Exam 4: Responsible AI, Bias, Governance & Security Scoping Matrix**
   * *Focus*: AWS Responsible AI pillars (fairness, explainability, privacy, robustness, transparency, governance), SageMaker Clarify bias metrics (CI, DPL, CDD, SHAP values), Bedrock Guardrails PII masking, AWS AI Service Cards, and the Generative AI Security Scoping Matrix (Scopes 1 to 5).
5. **Mock Exam 5: Final Comprehensive Pearson VUE Simulated Exam**
   * *Focus*: Full predictive blueprint exam blending tricky scenarios, multi-response questions, cost-optimization trade-offs, model customization decisions (Prompt Engineering vs. RAG vs. Fine-Tuning vs. Pre-training), and enterprise security architectures.

---

## 🎨 Interactive Visual Generators

### 1. SVG Architecture Diagrams (`js/diagrams.js`)
* **Amazon Bedrock RAG Flow**: User Query → Embedding Generation → Amazon OpenSearch Serverless Vector Store → Context Augmentation → Foundation Model response.
* **Bedrock Agents ReAct Loop**: User Intent → Reasoning Engine → Action Groups (OpenAPI schema + AWS Lambda) → Enterprise Knowledge Base lookup.
* **Bedrock Guardrails Pipeline**: Content Filters (Hate, Insults, Sexual, Violence) + Prompt Attack Protection + Denied Topics + Sensitive Data PII Redaction/Masking.
* **SageMaker Clarify Bias & SHAP Explainability**: Pre-training data distribution analysis → Post-training performance disparity → Kernel SHAP feature attribution waterfall.
* **Generative AI Security Scoping Matrix**: Scopes 1 through 5 comparing customer vs. AWS shared responsibility across Pre-trained APIs, Foundation Models, Fine-Tuning, and Custom Training.
* **Amazon Q Business Architecture**: 40+ Enterprise Data Source connectors → Access Control List (ACL) sync → IAM Identity Center → Grounded GenAI Assistant.
* **SageMaker Inference Selection Tree**: Interactive decision path guiding selection between Real-Time, Serverless, Asynchronous, and Batch Transform endpoints.

### 2. High-Fidelity AWS Management Console Views (`js/console-views.js`)
* **Amazon Bedrock Guardrails Console**: Filter strength sliders (None, Low, Medium, High), PII masking regex, and denied topic configuration.
* **Bedrock Knowledge Bases Setup**: Vector index configuration, chunking strategies (Fixed, Hierarchical, Semantic), and embeddings model selector.
* **Bedrock Agents Console**: Action group API mapping, Lambda function binding, and agent test runner chat panel.
* **SageMaker Clarify Bias Report**: Facet value selection, Disparate Impact, and Class Imbalance graphs.
* **Amazon Q Business Admin View**: Connector health, index sync status, document permissions, and identity federation settings.
* **Amazon Macie & AI Governance Console**: PII discovery jobs, automated S3 bucket scanning, and AI Service Card compliance reports.

---

## 🚀 Quick Start Guide

### Option 1: Open Locally in Browser (Zero Install)
This application has **zero external runtime dependencies** (no `node_modules`, no webpack/vite build step required). You can run it immediately:

1. Clone or download this repository:
   ```bash
   git clone https://github.com/savinpadencherry/AWS_Exams.git
   cd AWS_Exams
   ```
2. Open `index.html` directly in any modern browser:
   * **Linux/Ubuntu**: `xdg-open index.html`
   * **macOS**: `open index.html`
   * **Windows**: Double-click `index.html` or run `start index.html`

### Option 2: Run via Local Lightweight Web Server
To test under standard HTTP origin conditions:
```bash
# Using Python 3
python3 -m http.server 8080

# Or using Node http-server / npx
npx serve .
```
Then navigate to: `http://localhost:8080` in your web browser.

### Option 3: GitHub Pages Deployment
1. Go to repository **Settings** &rarr; **Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose branch `main` and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://savinpadencherry.github.io/AWS_Exams/`.

---

## ⌨️ Keyboard Shortcuts (Pearson VUE Style)

| Key | Action |
| :--- | :--- |
| **`1` – `5`** or **`A` – `E`** | Select option A, B, C, D, or E |
| **`Right Arrow` (`→`)** | Next Question |
| **`Left Arrow` (`←`)** | Previous Question |
| **`F`** | Toggle Flag for Review |
| **`N`** | Open Question Navigator Modal |
| **`R`** | Open Pre-Submission Review Screen |
| **`Esc`** | Close Question Navigator Modal |

---

## 📁 Repository Structure

```
AWS_Exams/
├── index.html               # Main Pearson VUE SPA container & viewports
├── README.md                # Comprehensive documentation & exam study blueprint
├── css/
│   ├── styles.css           # Pearson VUE navigation bar, typography, and base theme
│   ├── exam.css             # Question stems, scenario callouts, review screen, score card
│   ├── learning.css         # Hyper-learning mode styles, distractor cards, console UI tabs
│   └── diagrams.css         # Responsive SVG architecture diagram styling & animations
└── js/
    ├── app.js               # Application orchestration, keyboard bindings, view router
    ├── exam-engine.js       # Timer, scaled scoring algorithm (100-1000), domain stats engine
    ├── diagrams.js          # SVG generators for AWS AI/ML architectures
    ├── console-views.js     # Simulated AWS Management Console cards
    └── data/
        ├── exam1.js         # Exam 1 (65 Questions: Bedrock, GenAI & FM Mastery)
        ├── exam2.js         # Exam 2 (65 Questions: ML Lifecycle & SageMaker Architecture)
        ├── exam3.js         # Exam 3 (65 Questions: Real-World AWS AI Services & Vision/NLP)
        ├── exam4.js         # Exam 4 (65 Questions: Responsible AI, Bias & Security Scoping)
        └── exam5.js         # Exam 5 (65 Questions: Final Pearson VUE Simulated Exam)
```

---

## 🏆 Scoring Methodology

AWS certification examinations report scores on a scaled score from **100 to 1,000**. The minimum passing score is **700**.

* **Raw to Scaled Score Calculation**:
  $$\text{Scaled Score} = 100 + \left(\frac{\text{Correct Questions}}{65}\right) \times 900$$
* **Multi-response scoring**: For questions with multiple correct options (e.g., *"Select TWO"*), all correct options must be selected to earn full credit, mirroring Pearson VUE scoring rules.
* **Domain Diagnostic**: Each domain is weighted according to AWS guidelines and displays status:
  * **Meets Expectations**: Domain score $\ge 70\%$
  * **Needs Improvement**: Domain score $< 70\%$

---

## 📄 License
This project is open-source and created for educational purposes to prepare candidates for the AWS Certified AI Practitioner (AIF-C01) examination. AWS service names, trademarks, and logos are property of Amazon Web Services, Inc.
