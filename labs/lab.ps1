param(
    [ValidateSet('start', 'stop', 'status', 'smoke', 'token')]
    [string]$Action = 'status'
)
$ErrorActionPreference = 'Stop'
$labStateDir = Join-Path $env:LOCALAPPDATA 'AwsStudy'
$labConfigFile = Join-Path $labStateDir 'config.json'
if (-not (Test-Path -LiteralPath $labConfigFile)) { throw 'Run .\labs\setup-windows.ps1 first.' }
$labConfig = Get-Content -LiteralPath $labConfigFile -Raw | ConvertFrom-Json
$labDistro = $labConfig.distro
$labUser = $labConfig.linuxUser
if ($labDistro -notmatch '^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$' -or $labUser -notmatch '^[a-z][a-z0-9_-]{0,31}$' -or $labUser -eq 'root') { throw 'Invalid lab config. Re-run setup.' }
$labSetupLinux = 'setup'
$labKeeperFile = Join-Path $labStateDir 'keepalive.pid'
function Invoke-LabWsl {
    param([string[]]$LinuxArgs, [string]$LinuxUser = $labUser)
    & wsl.exe -d $labDistro -u $LinuxUser --cd $PSScriptRoot -- @LinuxArgs
    if ($LASTEXITCODE -ne 0) { throw "Lab command failed (exit $LASTEXITCODE)." }
}
function Get-RunningLabDistros {
    @((& wsl.exe --list --running --quiet) | ForEach-Object { $_.Replace([string][char]0, '').Trim() } | Where-Object { $_ })
}
if ($Action -eq 'stop') {
    $labRunning = @(Get-RunningLabDistros)
    if ($labRunning -notcontains $labDistro) { Write-Host 'Lab is already stopped.'; return }
    try { Invoke-LabWsl -LinuxArgs @('bash', "$labSetupLinux/lab.sh", 'stop') }
    finally {
        # Terminate even if Docker was never installed or its service already failed.
        try { Invoke-LabWsl -LinuxUser root -LinuxArgs @('systemctl', 'stop', 'docker.service', 'docker.socket', 'containerd.service') }
        finally { & wsl.exe --terminate $labDistro }
        $labStillRunning = ((& wsl.exe --list --running --quiet) -join '').Replace([string][char]0, '').Trim()
        if (-not $labStillRunning) { & wsl.exe --shutdown }
        if (Test-Path -LiteralPath $labKeeperFile) { Remove-Item -LiteralPath $labKeeperFile }
    }
    Write-Host 'Lab stopped. Disposable container data was removed; lesson files are preserved.'
    return
}
if ($Action -eq 'status') {
    (& wsl.exe --list --verbose | Out-String).Replace([string][char]0, '') | Write-Host
    $labRunning = @(Get-RunningLabDistros)
    if ($labRunning -contains $labDistro) {
        Invoke-LabWsl -LinuxArgs @('bash', "$labSetupLinux/lab.sh", 'status')
    }
    return
}
switch ($Action) {
    'start' {
        if ((Get-PSDrive C).Free -lt 10GB) { throw 'Less than 10 GiB free on C:. Review storage first.' }
        # systemd services alone do not keep WSL alive after a CLI call exits.
        # This sleeping process uses negligible CPU and ends when the distro stops.
        $labKeeper = $null
        if (Test-Path -LiteralPath $labKeeperFile) {
            $labKeeperId = [int](Get-Content -LiteralPath $labKeeperFile -Raw)
            $labKeeper = Get-CimInstance Win32_Process -Filter "ProcessId=$labKeeperId" -ErrorAction SilentlyContinue
            if ($labKeeper.CommandLine -notlike "*$labDistro*--exec sleep infinity*") { $labKeeper = $null }
        }
        if (-not $labKeeper) {
            New-Item -ItemType Directory -Path $labStateDir -Force > $null
            $labKeeper = Start-Process -FilePath wsl.exe -ArgumentList @('-d', $labDistro, '-u', $labUser, '--exec', 'sleep', 'infinity') -WindowStyle Hidden -PassThru
            Set-Content -LiteralPath $labKeeperFile -Value $labKeeper.Id
        }
        try {
            Invoke-LabWsl -LinuxUser root -LinuxArgs @('systemctl', 'start', 'docker')
            Invoke-LabWsl -LinuxArgs @('bash', "$labSetupLinux/lab.sh", 'start')
        }
        catch {
            & wsl.exe --terminate $labDistro
            if (Test-Path -LiteralPath $labKeeperFile) { Remove-Item -LiteralPath $labKeeperFile }
            throw
        }
    }
    'smoke' { Invoke-LabWsl -LinuxArgs @('bash', "$labSetupLinux/smoke-test.sh") }
    'token' { Invoke-LabWsl -LinuxArgs @('bash', "$labSetupLinux/lab.sh", 'token') }
}
