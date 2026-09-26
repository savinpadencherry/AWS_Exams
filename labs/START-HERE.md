# Your lightweight AWS learning lab

Open PowerShell in the AWS_Exams folder. The lab stays off until you start it.

**New machine?** Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\labs\setup-windows.ps1` first. See [installation details](INSTALL.md). Restart and rerun if Windows requests it; your token is entered at a hidden local prompt.

```powershell
.\labs\lab.ps1 start
.\labs\lab.ps1 smoke
.\labs\lab.ps1 status
.\labs\lab.ps1 stop
```

The smoke command uploads and retrieves one synthetic ticket from S3, then writes and reads its category in DynamoDB. It checks that the lab works. You have not completed a lesson merely by running it.

Stop removes disposable cloud resources. Your source files and lesson notes remain. Start and smoke recreate the baseline when needed. Docker does not start automatically. The stop command also closes this Ubuntu distribution; when no other distributions are running, it shuts down WSL.

## First lesson: the overwhelmed gadget shop

Read [the brief](scenarios/01-ticket-triage.md), then send your design in this chat. Start with these three decisions:

1. Which should be the first experiment: keyword rules, a trained classifier, or a generative model? What would make you change your choice?
2. Which mistake is worse: routing a delivery complaint to the wrong team, or missing a report of a smoking battery? How should that change what we measure?
3. Which decisions should always go to a human?

You can answer in ordinary language. I will turn your choices into a small experiment, give hints when it breaks, and ask you to explain the evidence. We will distinguish simulated responses from real AI throughout.

## Resource limits

- LocalStack: one CPU, 2 GiB RAM, no container swap, bounded logs.
- All WSL work: two virtual CPUs, 4 GiB RAM, 1 GiB swap.
- Ubuntu virtual disk: 28 GiB maximum. Windows installation files and swap are additional.
- Only S3 and DynamoDB enabled initially. No local model inference, training, Kubernetes, or background lab startup.

CPU limits are ceilings, not temperature guarantees. Use `status` to inspect measured container use. Expand the lab only after checking storage and memory.

## Credentials

The token is stored privately inside Ubuntu, outside this repository and OneDrive. To replace it after rotating it in your LocalStack account, run:

```powershell
.\labs\lab.ps1 token
```

Input is hidden. Stop and start the lab to apply the replacement. Do not paste a token into lesson notes or chat.
