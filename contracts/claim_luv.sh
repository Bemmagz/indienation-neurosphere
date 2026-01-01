#!/bin/bash
set -e

LEDGER="ledger/luv_ledger.csv"
CLAIM=1000000

DEVICE_HASH="$1"
INTENT="$2"

if [ -z "$DEVICE_HASH" ] || [ "$INTENT" != "CLAIM_LUV" ]; then
  echo "[REJECTED] Invalid intent or device hash"
  exit 1
fi

IDENTITY_HASH=$(echo "${DEVICE_HASH}_$(date +%s%N)" | sha256sum | awk '{print $1}')

if grep -q "$IDENTITY_HASH" "$LEDGER"; then
  echo "[REJECTED] Identity already claimed"
  exit 1
fi

DISTRIBUTED=$(awk -F',' '{sum+=$2} END {print sum}' "$LEDGER")
TOTAL=1000000000000

if [ $((DISTRIBUTED + CLAIM)) -gt $TOTAL ]; then
  echo "[HALT] Supply exhausted"
  exit 1
fi

echo "$IDENTITY_HASH,$CLA
