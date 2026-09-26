# Windows 11 x64 / recent WSL. Run from a normal PowerShell window.
# Re-run after a requested restart. No tokens in arguments or the repository.
[CmdletBinding()]
param(
    [ValidatePattern('^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$')]
    [string]$Distro,
    [ValidatePattern('^[a-z][a-z0-9_-]{0,31}$')]
    [string]$LinuxUser,
    [switch]$KeepRunning
)
$ErrorActionPreference = 'Stop'
if ($env:OS -ne 'Windows_NT') { throw 'Run this installer on Windows.' }
if ($env:PROCESSOR_ARCHITECTURE -ne 'AMD64') { throw 'This installer currently supports Windows x64 only.' }
$labStateDir = Join-Path $env:LOCALAPPDATA 'AwsStudy'
$labConfigFile = Join-Path $labStateDir 'config.json'
if (Test-Path -LiteralPath $labConfigFile) {
    $labSaved = Get-Content -LiteralPath $labConfigFile -Raw | ConvertFrom-Json
    if (-not $Distro) { $Distro = $labSaved.distro }
    if (-not $LinuxUser) { $LinuxUser = $labSaved.linuxUser }
}
if (-not $Distro) { $Distro = 'AWS-Study' }
if (-not $LinuxUser) { $LinuxUser = 'learner' }
if ($Distro -notmatch '^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$' -or $LinuxUser -notmatch '^[a-z][a-z0-9_-]{0,31}$' -or $LinuxUser -eq 'root') { throw 'Invalid distro name or Linux username.' }
if ((Get-PSDrive C).Free -lt 12GB) { throw 'Keep at least 12 GiB free on C: before setup.' }

function Invoke-SetupWsl {
    param([string[]]$LinuxArgs, [string]$LinuxUserName = 'root')
    & wsl.exe -d $Distro -u $LinuxUserName --cd $PSScriptRoot -- @LinuxArgs
    if ($LASTEXITCODE -ne 0) { throw "WSL setup command failed (exit $LASTEXITCODE). Re-run setup after fixing the error." }
}
function Get-LabDistroNames {
    param([switch]$Running)
    $labRegistered = @(Get-ChildItem 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss' -ErrorAction SilentlyContinue | ForEach-Object { (Get-ItemProperty $_.PSPath).DistributionName } | Where-Object { $_ })
    if (-not $Running -or -not $labRegistered.Count) { return $labRegistered }
    $labArgs = @('--list', '--quiet')
    if ($Running) { $labArgs += '--running' }
    $labOutput = & wsl.exe @labArgs 2>$null
    if ($LASTEXITCODE -ne 0) { throw 'Could not inspect running WSL distributions.' }
    @($labOutput | ForEach-Object { $_.Replace([string][char]0, '').Trim() } | Where-Object { $labRegistered -contains $_ })
}
function Set-WslStudyLimits {
    $labWslConfig = Join-Path $env:USERPROFILE '.wslconfig'
    $labOriginal = if (Test-Path -LiteralPath $labWslConfig) { [IO.File]::ReadAllText($labWslConfig) } else { '' }
    $labLines = [Collections.Generic.List[string]]::new()
    foreach ($line in ($labOriginal -split '\r?\n')) { $labLines.Add($line) }
    $labSection = -1
    for ($i = 0; $i -lt $labLines.Count; $i++) {
        if ($labLines[$i] -match '^\s*\[wsl2\]\s*$') { $labSection = $i; break }
    }
    if ($labSection -lt 0) { $labLines.Add('[wsl2]'); $labSection = $labLines.Count - 1 }
    foreach ($setting in @(@('memory','4GB'), @('processors','2'), @('swap','1GB'), @('defaultVhdSize','28GB'))) {
        $found = $false
        $i = $labSection + 1
        while ($i -lt $labLines.Count -and $labLines[$i] -notmatch '^\s*\[') {
            if ($labLines[$i] -match ('^\s*' + $setting[0] + '\s*=')) {
                $labLines[$i] = $setting[0] + '=' + $setting[1]
                $found = $true
            }
            $i++
        }
        if (-not $found) { $labLines.Insert($i, $setting[0] + '=' + $setting[1]) }
    }
    $labUpdated = ($labLines -join "`r`n").Trim() + "`r`n"
    if ($labUpdated -ne $labOriginal) {
        if (Test-Path -LiteralPath $labWslConfig) {
            Copy-Item -LiteralPath $labWslConfig -Destination ($labWslConfig + '.aws-study-backup-' + (Get-Date -Format 'yyyyMMddHHmmss'))
        }
        [IO.File]::WriteAllText($labWslConfig, $labUpdated, [Text.UTF8Encoding]::new($false))
    }
}

Write-Host 'Checking WSL. The lab uses 2 virtual CPUs / 4 GiB RAM globally and a 28 GiB new-distro disk.'
$labFeature = Get-CimInstance Win32_OptionalFeature -Filter "Name='VirtualMachinePlatform'"
$labWslReady = $false
if (Get-Command wsl.exe -ErrorAction SilentlyContinue) {
    & wsl.exe --version *> $null
    $labWslReady = $LASTEXITCODE -eq 0
}
if (-not $labWslReady -or $labFeature.InstallState -ne 1) {
    Write-Host 'Windows needs WSL components. Accept the Windows administrator prompt.'
    $labEnable = 'wsl.exe --install --no-distribution; exit $LASTEXITCODE'
    $labEncoded = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($labEnable))
    $labInstall = Start-Process powershell.exe -Verb RunAs -WindowStyle Hidden -ArgumentList @('-NoProfile','-EncodedCommand',$labEncoded) -PassThru -Wait
    if ($labInstall.ExitCode -notin @(0, 3010)) { throw "WSL component installation failed (exit $($labInstall.ExitCode))." }
    Write-Host 'Restart Windows normally, then run this same setup command again. Setup will continue.'
    exit 3010
}

$labOthers = @(Get-LabDistroNames -Running | Where-Object { $_ -ne $Distro })
if ($labOthers.Count) { throw "Close other WSL work first: $($labOthers -join ', '). Resource limits apply to all WSL2 distros; setup will not interrupt other work." }
Set-WslStudyLimits
& wsl.exe --shutdown
if ($LASTEXITCODE -ne 0) { throw 'Could not shut down WSL to apply resource limits.' }
$labInstalled = @(Get-LabDistroNames)
if ($labInstalled -notcontains $Distro) {
    Write-Host "Downloading Ubuntu 24.04 as $Distro..."
    & wsl.exe --install -d Ubuntu-24.04 --name $Distro --no-launch --web-download --vhd-size 28GB
    if ($LASTEXITCODE -ne 0) { throw 'Ubuntu installation failed. Check WSL/firmware virtualization, then re-run setup.' }
}

# Check the actual VM/disk limits before installing packages or pulling images.
Invoke-SetupWsl -LinuxArgs @('python3','setup/verify-wsl.py')
Invoke-SetupWsl -LinuxArgs @('bash','setup/prepare-user.sh',$LinuxUser)
& wsl.exe --manage $Distro --set-default-user $LinuxUser
if ($LASTEXITCODE -ne 0) { throw 'Could not set the default Linux user. Update WSL and re-run.' }
Invoke-SetupWsl -LinuxArgs @('bash','setup/bootstrap-ubuntu.sh',$LinuxUser)
& wsl.exe --shutdown
if ($LASTEXITCODE -ne 0) { throw 'Could not restart WSL after bootstrap.' }
New-Item -ItemType Directory -Path $labStateDir -Force > $null
@{ distro=$Distro; linuxUser=$LinuxUser } | ConvertTo-Json | Set-Content -LiteralPath $labConfigFile -Encoding utf8

$labSuccessful = $false
try {
    & wsl.exe -d $Distro -u $LinuxUser -- test -s "/home/$LinuxUser/.config/aws-study/auth.token"
    if ($LASTEXITCODE -ne 0) {
        Write-Host 'Enter your LocalStack token locally. Input is hidden and saved only inside Ubuntu.'
        & (Join-Path $PSScriptRoot 'lab.ps1') token
    }
    & (Join-Path $PSScriptRoot 'lab.ps1') start
    Invoke-SetupWsl -LinuxUserName $LinuxUser -LinuxArgs @('bash','setup/verify-runtime.sh')
    & (Join-Path $PSScriptRoot 'lab.ps1') smoke
    $labSuccessful = $true
}
finally {
    if (-not $KeepRunning -or -not $labSuccessful) {
        & (Join-Path $PSScriptRoot 'lab.ps1') stop
    }
}
Write-Host 'Setup and storage smoke tests passed. Read labs/START-HERE.md to begin learning.'
if (-not $KeepRunning) { Write-Host 'The lab is now stopped. Start it with: .\labs\lab.ps1 start' }
