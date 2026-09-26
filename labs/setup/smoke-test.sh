#!/usr/bin/env bash
# Repeatable setup verification. Synthetic data only; no model downloads.
set -euo pipefail
lab_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
local_aws() { bash "$lab_dir/aws-local.sh" "$@"; }
bucket=aws-study-smoke
table=aws-study-tickets
if ! local_aws s3api head-bucket --bucket "$bucket" 2>/dev/null; then
  local_aws s3api create-bucket --bucket "$bucket" >/dev/null
fi
lab_tmp=$(mktemp -d)
trap 'rm -f -- "$lab_tmp/ticket.txt" "$lab_tmp/returned.txt"; rmdir -- "$lab_tmp"' EXIT
printf 'Synthetic ticket: my parcel is late.\n' > "$lab_tmp/ticket.txt"
local_aws s3 cp "$lab_tmp/ticket.txt" "s3://$bucket/ticket.txt" >/dev/null
local_aws s3 cp "s3://$bucket/ticket.txt" "$lab_tmp/returned.txt" >/dev/null
cmp "$lab_tmp/ticket.txt" "$lab_tmp/returned.txt"
echo 'PASS: S3 returned exactly the uploaded bytes.'
if ! local_aws dynamodb describe-table --table-name "$table" >/dev/null 2>&1; then
  local_aws dynamodb create-table --table-name "$table" --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --billing-mode PAY_PER_REQUEST >/dev/null
fi
local_aws dynamodb wait table-exists --table-name "$table"
local_aws dynamodb put-item --table-name "$table" --item '{"id":{"S":"ticket-001"},"category":{"S":"delivery"}}'
actual=$(local_aws dynamodb get-item --table-name "$table" --key '{"id":{"S":"ticket-001"}}' --consistent-read --query Item.category.S --output text)
[[ "$actual" == delivery ]] || { echo 'FAIL: DynamoDB value differs.' >&2; exit 1; }
echo 'PASS: DynamoDB returned the expected ticket category.'
echo 'These checks verify emulated storage, not AI classification or AWS production behaviour.'
