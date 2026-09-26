#!/usr/bin/env bash
set -euo pipefail
lab_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
lab_config="$HOME/.config/aws-study"
lab_token="$lab_config/auth.token"
case "${1:-}" in
  token)
    umask 077
    mkdir -p "$lab_config"
    chmod 700 "$lab_config"
    IFS= read -r -s -p 'LocalStack token (hidden; saved only in WSL): ' value
    printf '\n'
    [[ -n $value ]] || { echo 'Empty token; nothing saved.' >&2; exit 1; }
    printf '%s\n' "$value" > "$lab_token"
    chmod 600 "$lab_token"
    unset value
    echo 'Token saved; not yet verified.'
    ;;
  start|stop)
    LOCALSTACK_AUTH_TOKEN=unused-for-stop
    if [[ ${1} == start ]]; then
      [[ -r $lab_token ]] || { echo 'Run: bash lab.sh token' >&2; exit 1; }
      IFS= read -r LOCALSTACK_AUTH_TOKEN < "$lab_token"
    fi
    export LOCALSTACK_AUTH_TOKEN
    if [[ ${1} == start ]]; then
      lab_used=$(df -B1 --output=used / | tail -n 1 | tr -d ' ')
      (( lab_used < 20 * 1024 * 1024 * 1024 )) || { echo 'Linux use >=20 GiB: review host/VHD budget before starting.' >&2; exit 1; }
      docker info >/dev/null
      docker compose --progress quiet -f "$lab_dir/compose.yaml" up -d --pull missing
      for ((attempt=0; attempt<60; attempt++)); do
        if curl --fail --silent --max-time 2 http://127.0.0.1:4566/_localstack/health >/dev/null; then
          echo 'LocalStack is ready. Run the smoke check or begin the lesson.'
          unset LOCALSTACK_AUTH_TOKEN
          exit 0
        fi
        sleep 1
      done
      echo 'Startup did not become healthy in time. Run status; do not assume the lab is ready.' >&2
      exit 1
    else
      if ! docker info >/dev/null 2>&1; then
        echo 'Docker is already stopped.'
        exit 0
      fi
      docker compose -f "$lab_dir/compose.yaml" down --volumes
    fi
    unset LOCALSTACK_AUTH_TOKEN
    ;;
  status)
    df -h /
    if ! docker info >/dev/null 2>&1; then
      echo 'Docker is stopped; start the lab when you want to study.'
      exit 0
    fi
    docker system df
    docker ps --filter label=com.docker.compose.project=aws-study
    lab_id=$(docker ps -q --filter label=com.docker.compose.project=aws-study)
    if [[ -n $lab_id ]]; then
      docker stats --no-stream "$lab_id"
      curl --fail --silent --show-error --max-time 10 http://127.0.0.1:4566/_localstack/health | python3 -c 'import json,sys; h=json.load(sys.stdin); print("Running services:", ", ".join(k for k,v in h.get("services",{}).items() if v=="running")); print("LocalStack:", h.get("version"), "edition:", h.get("edition"))'
    else
      echo 'The lab container is stopped.'
    fi
    ;;
  *) echo 'Usage: bash lab.sh {token|start|status|stop}' >&2; exit 2 ;;
esac
