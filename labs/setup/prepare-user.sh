#!/usr/bin/env bash
set -euo pipefail
[[ $EUID == 0 ]] || { echo 'Run as root.' >&2; exit 1; }
lab_user=${1:?Pass a Linux username}
[[ $lab_user =~ ^[a-z][a-z0-9_-]{0,31}$ && $lab_user != root ]] || exit 2
. /etc/os-release
[[ $ID == ubuntu && $VERSION_ID == 24.04 ]] || { echo 'Expected Ubuntu 24.04.' >&2; exit 1; }
if ! id "$lab_user" >/dev/null 2>&1; then
  useradd --create-home --shell /bin/bash "$lab_user"
fi
# Password stays locked; maintenance is explicit through wsl.exe -u root.
id "$lab_user"
