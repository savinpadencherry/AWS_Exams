# Lab progress

A lab is complete after observed build evidence, fault diagnosis, and a debrief. Four of five correct answers is a study target, not an AWS pass prediction.

| Lab | Built | Fault diagnosed | Debrief >=4/5 | Date |
|---|---|---|---|---|
| 0: local storage smoke test | [x] | [ ] | [ ] | 2026-09-27 |
| 1: ticket triage decisions | [ ] | [ ] | [ ] | |
| 2: models and prompting | [ ] | [ ] | [ ] | |
| 3: grounded policy answers | [ ] | [ ] | [ ] | |
| 4: evaluation and bias | [ ] | [ ] | [ ] | |
| 5: responsible launch and cost | [ ] | [ ] | [ ] | |
| 6: security and reliability | [ ] | [ ] | [ ] | |

## Verified after restart on 27 September 2026

- [x] WSL2 starts successfully; Ubuntu-24.04 installed.
- [x] Effective WSL limits: 2 virtual CPUs, approximately 3.8 GiB usable RAM, 1 GiB swap.
- [x] Logical Ubuntu disk ceiling: 30,064,771,072 bytes / 28 GiB.
- [x] Docker Engine 29.8.1, Compose 5.5.1, AWS CLI 2.37.4 installed.
- [x] Docker/socket/containerd disabled at boot; checked inactive after WSL shutdown/reopen.
- [x] LocalStack 2026.8.4 runtime reports Pro edition and license activated. Billing-plan name and all service entitlements were not independently inspected.
- [x] Image pinned: `localstack/localstack@sha256:03bde1974f8bb7a7b6d4128228cf9048c7bdb8249deb998d1b80af73926c0017`.
- [x] S3 byte-for-byte upload/download and DynamoDB write/read passed.
- [x] Live container configuration: one CPU, 2 GiB RAM, 2 GiB combined memory+swap (no container swap), restart=no, OOMKilled=false.
- [x] Stop control removed disposable resources and left Ubuntu Stopped; no vmmemWSL process was reported afterward.
- [x] Restart reused the pinned image and both smoke checks passed again. The sleeping keepalive process kept the session available between commands.

## Measured baseline

After the initial smoke checks:

- Container: 637.6 MiB RAM; CPU sample 5.08% of one CPU. A sample is not a sustained-load or temperature test.
- Later idle sample: 669.8 MiB RAM, 0.97% of one CPU. Final state: lab shut down after verification.
- Linux memory: 1.1 GiB used, 2.7 GiB available; swap used 0 bytes. Cached memory is reclaimable and Windows working set can differ.
- Linux filesystem: about 4.1 GiB used of a 28 GiB filesystem.
- Ubuntu VHD file: about 4.57 decimal GB.
- Windows WSL program files: about 0.87 GB; retained WSL installer: about 0.26 GB.
- Swap file at observation: about 0.038 GB; configured maximum 1 GiB.
- These counted components total about 5.74 GB, plus small project/configuration files and other installation overhead. This is not a whole-system disk attribution measurement.
- Docker storage is already inside the VHD: one image, 1.88 GB; container writable layer about 65 MB. Do not count these twice.
- C: free space after installation: about 209.3 GB. Other Windows activity may affect free space.

Only S3/DynamoDB are enabled. No local model inference, model downloads, Lambda runtimes or training services were installed. Temperature was not measured.

## Learning next

Portable installer verification: reran `setup-windows.ps1 -Distro Ubuntu-24.04 -LinuxUser aksha` successfully. VM and container limits, activated license, both storage checks and automatic shutdown passed. Fresh Windows elevation/reboot stages were not retested by uninstalling WSL. The runtime controls now read local configuration instead of hardcoded usernames/paths.

Read [START-HERE](START-HERE.md) and answer the first business-design decisions. Setup validation does not count as learner mastery. Introduce one failure after the learner explains the normal data flow, then record their diagnosis and debrief here.

The previously supplied token activated successfully and is stored outside the repository in WSL. Rotate it through LocalStack and use the hidden local token prompt to update it. Do not paste a replacement into chat.

Question files are not automatically connected to the existing quiz app.
