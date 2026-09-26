#!/usr/bin/env bash
# Run as root after Ubuntu first-run creates a normal Linux user.
# No token arguments, default AWS credential changes, or passwordless sudo.
set -euo pipefail
[[ $EUID == 0 ]] || { echo 'Run as root.' >&2; exit 1; }
lab_user=${1:?Pass the existing Linux username}
id "$lab_user" >/dev/null
[[ $lab_user != root ]] || { echo 'Use a normal Linux user.' >&2; exit 1; }
. /etc/os-release
[[ $ID == ubuntu && $VERSION_ID == 24.04 ]] || { echo 'Expected Ubuntu 24.04.' >&2; exit 1; }
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y ca-certificates curl unzip python3
python3 - <<'PY'
import configparser
from pathlib import Path
p = Path('/etc/wsl.conf')
c = configparser.ConfigParser()
c.read(p)
if not c.has_section('boot'):
    c.add_section('boot')
c.set('boot', 'systemd', 'true')
with p.open('w') as f:
    c.write(f)
PY
# Official signed Docker apt repository.
if ! command -v docker >/dev/null 2>&1; then
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
  printf 'deb [arch=%s signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu %s stable\n' \
    "$(dpkg --print-architecture)" "$VERSION_CODENAME" > /etc/apt/sources.list.d/docker.list
  apt-get update
  apt-get install -y --no-install-recommends docker-ce docker-ce-cli containerd.io docker-compose-plugin
fi
docker compose version
# Docker group access is root-equivalent; dedicate this distro to labs.
usermod -aG docker "$lab_user"
# Disable socket activation too. Explicitly start Docker each session.
systemctl disable --now docker.service docker.socket containerd.service
if ! command -v aws >/dev/null 2>&1; then
  [[ $(uname -m) == x86_64 ]] || { echo 'AWS installer expects x86_64.' >&2; exit 1; }
  lab_tmp=$(mktemp -d)
  trap 'rm -rf -- "$lab_tmp"' EXIT
  curl -fsSL https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o "$lab_tmp/aws.zip"
  unzip -q "$lab_tmp/aws.zip" -d "$lab_tmp"
  "$lab_tmp/aws/install"
fi
apt-get clean
aws --version
echo 'Docker/AWS CLI bootstrap finished. The Windows installer will verify LocalStack next.'
