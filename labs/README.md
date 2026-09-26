# AWS business labs

Reviewed 27 September 2026. Learn by making decisions, testing them, and explaining tradeoffs. LocalStack supplies an AWS API sandbox, with a Resource Browser for supported resources; it is not a complete copy of AWS or its console.

**Installed and smoke-tested after restart.** [Start here](START-HERE.md) for the PowerShell controls and your first learning decisions. See [measured results](PROGRESS.md) for the resource baseline.

## Learning loop

1. Codex presents a business problem and measurable success criteria without revealing the architecture.
2. You propose a design and predict a failure. Codex gives progressive hints before showing the solution.
3. You run the key commands; Codex handles boilerplate. Label each component **emulated AWS**, **simulated AI response**, or **real hosted AI**.
4. Codex introduces one reproducible fault. You diagnose and fix it using observed evidence.
5. Explain business, cost, security, and responsible-AI implications; answer five original scenario questions.
6. Save design, commands, evidence, mistakes, and limitations. Revisit the decisions next session and about a week later. Shut down after each session.

Questions saved under `labs/questions/` are study material only: the current quiz app does not import that folder automatically.

## Phase 1: AI Practitioner

AIF-C01 weights fundamentals 20%, GenAI 24%, foundation-model applications 28%, responsible AI 14%, and security/governance 14%. Building ML infrastructure is outside the expected job tasks. Practical work should make the decisions memorable, not consume all study time.

Suggested 45-minute session: 5 minutes brief, 10 design, 15 experiment, 10 debugging/debrief, 5 retrieval. Adjust for comfort; duration is not a thermal guarantee.

| Lab | Business decision and experiment | Execution | Focus |
|---|---|---|---|
| 0 | Store and retrieve a synthetic ticket; prove the endpoint is local | S3 and DynamoDB; add one Lambda after baseline measurement | Foundations |
| 1 | Triage shop tickets; choose rules, classification, or GenAI; measure missed safety complaints | Tiny labelled dataset, local storage, clearly labelled deterministic classifier | D1, D4, D5 |
| 2 | Choose a model and improve prompts; test hallucination and consistency | PartyRock in the browser within its daily allowance | D2, D3 |
| 3 | Answer changing refund-policy questions; compare prompting, RAG, and fine-tuning | S3 documents, tiny explicit retrieval simulation; optional hosted-model comparison | D2, D3 |
| 4 | Evaluate a classifier; discover leakage, imbalance, and biased outcomes | Small CSV, confusion matrix, subgroup review, model-card exercise | D1, D4 |
| 5 | Decide whether an assistant is safe and economical to launch | Human review, injection cases, illustrative token costs, privacy and audit decisions | D3, D4, D5 |
| 6 | Secure the workflow and recover failed jobs | IAM allow/deny checks with enforcement; SQS/DLQ extension | D5; SAA bridge |

Start with [the first business brief](scenarios/01-ticket-triage.md). The learner's design comes before the reference solution.

## Emulator boundaries

- The runtime reports an activated license and Pro edition. S3/DynamoDB operations passed; this does not independently establish the billing plan or every service entitlement.
- Bedrock runtime emulation can start Ollama and download model weights. The actual model differs from the AWS model ID. **Bedrock runtime is disabled in the baseline.** No local LLM inference or training by default.
- Current Bedrock coverage lists `CreateGuardrail` as unimplemented. Verify individual Knowledge Base and guardrail operations before planning a lab. An application filter is not an AWS Guardrail; keyword lookup is not vector search.
- IAM enforcement defaults off. Before a permissions drill, enable it and prove both an allowed and a denied request with a restricted identity. Bootstrap credentials do not prove least privilege.
- Local tests cannot establish AWS latency, billing, multi-AZ reliability, or foundation-model quality.
- PartyRock has a daily free allowance, not unlimited usage. It demonstrates hosted AI behaviour but does not replace Bedrock console/API experience.

## ROG Ally budget

One Ubuntu 24.04 WSL2 distribution, Docker Engine, AWS CLI, one LocalStack image, and initially only S3/DynamoDB. Add a single Python Lambda runtime later. Avoid EKS, OpenSearch, RDS, local LLMs, and training containers for now.

- Start with **4 GiB RAM, 2 virtual CPUs, 1 GiB swap** for WSL2. These limits reduce available resources; they do not cap temperature or guarantee near-zero idle CPU.
- New distro disk ceiling: **28 GiB**, about 30.1 decimal GB, leaving space within the user's **40 GB total** for swap, WSL, caches, and project data. Verify the actual limit after installation. It is not a quota on all Windows writes.
- Planning allowance: **10–20 GB total**, not a measured size or guarantee. Review at 28 GB total; stop new downloads at 32 GB until space is recovered. Account for transient installers and retained images.
- Runtime data and tokens live inside WSL, outside OneDrive. This repository holds only small sources and synthetic fixtures.
- Measure Windows VHD size, Windows free space, Linux `df -h /`, and `docker system df`. Deleting Docker files does not guarantee immediate Windows VHD shrinkage. Review disposable artifacts individually; no routine blanket `docker system prune`.
- Baseline container: 2 GiB RAM, one CPU, bounded logs, no restart policy. Docker Engine is disabled at boot and started on demand.
- Use the Ally's existing low-power mode if comfortable, keep vents clear, and watch actual CPU, memory, fan behaviour and device temperatures. Pause if uncomfortable or throttling. Never infer temperature from CPU caps alone.
- Stop Compose and Docker, then run `wsl --shutdown` from PowerShell to release the VM. This stops **all** WSL distributions; check for other work first. Stopping LocalStack alone does not stop the VM.

## Phase 2: Solutions Architect Associate

Extend the ticket system with queues, retries, idempotency, IaC, encryption and recovery. Use architecture exercises for VPC routing, NAT, security groups/NACLs, multi-AZ and disaster recovery. Local emulation cannot establish real network or regional-failure behaviour. Real AWS labs need an explicitly chosen scope, current prices, budget alerts, and verified teardown; Free Tier does not guarantee zero charges.

## Setup and sources

[Setup](setup/NEXT.md) · [Progress](PROGRESS.md)

- [AWS AIF-C01 guide](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html)
- [Student plan](https://www.localstack.cloud/localstack-for-students), [student coverage announcement](https://blog.localstack.cloud/localstack-for-students/)
- [Installation](https://docs.localstack.cloud/aws/getting-started/installation/), [Bedrock](https://docs.localstack.cloud/aws/services/bedrock/), [configuration/IAM](https://docs.localstack.cloud/aws/customization/configuration-options/), [Resource Browser](https://docs.localstack.cloud/aws/connecting/console/)
- [WSL settings](https://learn.microsoft.com/en-us/windows/wsl/wsl-config), [disk management](https://learn.microsoft.com/en-us/windows/wsl/disk-space)
- [PartyRock daily allowance](https://aws.amazon.com/blogs/aws/introducing-new-partyrock-capabilities-and-free-daily-usage/)
