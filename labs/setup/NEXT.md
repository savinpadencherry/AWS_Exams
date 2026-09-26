# Setup status and recovery

Installed and verified on 27 September 2026 after Windows restart. Use [START-HERE](../START-HERE.md) for normal sessions; no further installation is needed.

For another machine, use [the Windows installer](../setup-windows.ps1) and [installation guide](../INSTALL.md). The installer records the selected distro/user in local app data, so the controls work from another checkout path or Windows account without source edits. The names below describe the original installation only.

## Installed environment

- Ubuntu-24.04 under WSL2, normal default user `aksha` (locked password; no passwordless sudo added).
- Docker Engine 29.8.1, Compose 5.5.1, AWS CLI 2.37.4.
- LocalStack 2026.8.4 pinned by digest in `compose.yaml`.
- Runtime reports `edition=pro` and `is_license_activated=true`.
- S3 byte-for-byte round trip and DynamoDB write/read passed.

Windows can perform maintenance explicitly with `wsl -d Ubuntu-24.04 -u root -- ...`. The Linux user has Docker group membership, which grants root-equivalent Docker access. A Linux password is not needed for the supplied PowerShell controls; set one with `wsl -d Ubuntu-24.04 -u root -- passwd aksha` if you later want password-based Linux administration.

## Everyday controls

From the AWS_Exams project in PowerShell:

```powershell
.\labs\lab.ps1 start
.\labs\lab.ps1 smoke
.\labs\lab.ps1 status
.\labs\lab.ps1 stop
```

Start launches a hidden, sleeping WSL keepalive process so WSL does not exit after a short CLI call. The PID is recorded under `%LOCALAPPDATA%\AwsStudy`. It does no compute work. Stop removes this project's disposable containers and volumes, stops Docker, and terminates this Ubuntu distribution. It shuts down WSL entirely only when no other distribution is running.

Docker, its socket, and containerd are disabled at boot. LocalStack has no restart policy. Nothing in this lab is registered to start when Windows starts.

## Token

The previously supplied token was used to activate the runtime. It is saved at `/home/aksha/.config/aws-study/auth.token`, mode 600, inside Ubuntu and outside the repo/OneDrive. Do not publish container environment inspection or rendered Compose configuration.

Rotate the token previously shared in chat through your LocalStack account, then enter the replacement locally with:

```powershell
.\labs\lab.ps1 token
```

Stop/start applies the replacement. The prompt hides input. Runtime activation is verified; the exact Student billing-plan label was not separately inspected.

## Budget

The effective WSL limits are 4 GiB RAM, 2 CPUs and 1 GiB swap. Ubuntu's logical disk maximum is 30,064,771,072 bytes (28 GiB). LocalStack is limited to one CPU and 2 GiB RAM with no container swap. Only S3 and DynamoDB are enabled. No model weights were downloaded.

See [PROGRESS](../PROGRESS.md) for observed sizes. Disk ceilings exclude Windows-side tools, installers, swap and project files. Review total use before adding services; stop new downloads at 32 decimal GB and preserve headroom below the user's 40 GB budget. The Linux start helper refuses to start at 20 GiB used. No blanket prune is scheduled.

## Recovery

If startup fails, run `status` and inspect the specific failure. If a session was interrupted, run `stop`, then `start`. The pinned image is reused; there is no routine image update or pull. Health readiness alone does not prove service behaviour; run `smoke` when diagnosing an environment problem.

The bootstrap script remains available for a fresh Ubuntu 24.04 installation with an existing normal Linux user. It is not needed for ordinary sessions. Keep scripts in LF format when editing from Windows.
