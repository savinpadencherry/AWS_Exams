#!/usr/bin/env bash
set -euo pipefail
unset AWS_PROFILE AWS_DEFAULT_PROFILE AWS_SESSION_TOKEN AWS_SECURITY_TOKEN
export AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test AWS_DEFAULT_REGION=us-east-1
export AWS_CONFIG_FILE=/dev/null AWS_SHARED_CREDENTIALS_FILE=/dev/null
export AWS_EC2_METADATA_DISABLED=true AWS_PAGER=''
for arg in "$@"; do
  case "$arg" in
    --endpoint*|--profile*|--debug) echo 'Endpoint/profile overrides and debug are disabled in this helper.' >&2; exit 2 ;;
  esac
done
exec aws "$@" --endpoint-url http://127.0.0.1:4566 --region us-east-1 --no-cli-pager
