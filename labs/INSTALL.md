# Install the lightweight AWS lab

## Requirements

- Windows 11 x64 with firmware virtualization enabled, internet access, and administrator access for Windows components if needed.
- Git to clone this repository. The quiz app can also be used at its GitHub Pages URL without installing the lab.
- At least 12 GiB free on C: for initial installation headroom. Keep the overall lab below the 40 GB budget by reviewing storage before adding services.
- Your own active LocalStack token. The GitHub Student plan is supported; account enrollment is separate from installation.

In PowerShell:

```powershell
git clone https://github.com/savinpadencherry/AWS_Exams.git
cd AWS_Exams
powershell -NoProfile -ExecutionPolicy Bypass -File .\labs\setup-windows.ps1
```

If Windows components need enabling, the installer requests elevation and then asks you to restart. It does not restart the computer itself. Run the same command after restarting. Later stages reuse existing installations.

## What setup does

1. Checks available space and WSL components. Existing running WSL work must be closed before global limits are applied.
2. Backs up `.wslconfig` when it changes and sets two virtual CPUs, 4 GiB RAM, 1 GiB swap, and a 28 GiB maximum for new distro disks. Other settings are preserved.
3. Installs a dedicated Ubuntu 24.04 distro named `AWS-Study` and creates a normal user named `learner` with a locked password. No passwordless sudo is configured.
4. Verifies effective memory/CPU limits and the root disk's logical maximum. It refuses an oversized existing disk rather than attempting to shrink it.
5. Installs Docker Engine from Docker's signed apt repository and AWS CLI from AWS. Docker group access is root-equivalent; use this distro for these labs. Docker, its socket, and containerd are disabled at boot.
6. Prompts for the token only if none is saved. The hidden input is stored inside WSL at `~/.config/aws-study/auth.token` with mode 600. It is not encrypted; root/Docker users can access runtime credentials.
7. Downloads the pinned LocalStack image only when missing. Starts it with one CPU, 2 GiB RAM, no container swap, bounded logs, and no restart policy. The endpoint binds to Windows localhost through WSL.
8. Verifies license activation, container limits and actual S3/DynamoDB operations, then stops the lab. Use `-KeepRunning` to leave a successful setup running.

No local models, Lambda runtimes, Kubernetes or training services are installed. No real AWS credentials are needed. The AWS command wrapper uses test credentials and an explicit localhost endpoint.

## Existing installations and recovery

The installer saves only the distro name and Linux username in `%LOCALAPPDATA%\AwsStudy\config.json`. Future runs and lab controls use these values; no Windows username or checkout path is hardcoded. Keep one configured lab per Windows user.

To adopt a suitable existing Ubuntu 24.04 distro explicitly:

```powershell
.\labs\setup-windows.ps1 -Distro Ubuntu-24.04 -LinuxUser your_linux_username
```

That distro must have a disk maximum of 28 GiB or less. Setup stops the selected distro and changes its Docker startup configuration, so choose a dedicated lab distro. On the original ROG Ally installation, the saved selection is `Ubuntu-24.04` / `aksha`; setup already tested this reuse path.

If WSL installation reports a virtualization error after a restart, resolve firmware virtualization/Virtual Machine Platform first. If it reports an unknown modern WSL option, update WSL with `wsl --update` and retry. The script does not change BIOS settings.

If token activation fails, correct the account/license or rotate the token, then run:

```powershell
.\labs\lab.ps1 token
.\labs\setup-windows.ps1
```

Token replacement takes effect on the next stop/start. Never put tokens in command arguments, Git files, screenshots or chat. Setup failure during runtime checks attempts to stop the lab.

## Daily use and storage

Read [START-HERE](START-HERE.md). Start uses a hidden sleeping WSL process to keep the session alive between commands; stop terminates it. Stop removes only this Compose project's disposable resources and volumes, stops Docker, and terminates the configured distro. When no other distro is running it also shuts down WSL. It does not remove the Ubuntu installation or cached image.

The 28 GiB virtual disk limit excludes Windows binaries, swap and source files. Review total storage at 28 decimal GB; stop new downloads at 32 GB to preserve headroom below 40 GB. The helper also refuses to start if Linux usage reaches 20 GiB. Deleting container files does not necessarily shrink the Windows VHD immediately. No blanket pruning is scheduled.

## Verification scope

Validated on the original Windows/WSL machine by rerunning setup against the installed Ubuntu distro, checking license activation and resource ceilings, performing S3/DynamoDB round trips, and confirming shutdown. The fresh Windows component/UAC/reboot path is provided but was not retested by removing the working installation. The separate quiz app regression suite remains under `tests/`.
