#!/usr/bin/env bash
set -euo pipefail
curl --fail --silent --show-error --max-time 10 http://127.0.0.1:4566/_localstack/info |
  python3 -c 'import json,sys; x=json.load(sys.stdin); print("LocalStack",x.get("version"),"edition:",x.get("edition"),"license activated:",x.get("is_license_activated")); sys.exit(0 if x.get("is_license_activated") is True else 1)'
lab_id=$(docker ps -q --filter label=com.docker.compose.project=aws-study --filter label=com.docker.compose.service=localstack)
[[ -n $lab_id ]] || { echo 'LocalStack is not running.' >&2; exit 1; }
docker inspect "$lab_id" --format '{{json .HostConfig}}' |
  python3 -c 'import json,sys; x=json.load(sys.stdin); assert x["NanoCpus"]==1000000000; assert x["Memory"]==2147483648; assert x["MemorySwap"]==2147483648; assert x["RestartPolicy"]["Name"]=="no"; print("Verified container CPU/RAM limits and restart policy.")'
docker stats --no-stream "$lab_id"
df -h /
free -h
