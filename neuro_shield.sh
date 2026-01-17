#!/bin/bash
set -e

BASE_DIR="/data/data/com.termux/files/home/indienation-neurosphere"
VALIDATOR="$BASE_DIR/tm_validator.py"
LEDGER="$BASE_DIR/state/claim_ledger.jsonl"

SEQ_ID="$1"
ASSET="$2"
AMOUNT="$3"

if [ -z "$SEQ_ID" ] || [ -z "$ASSET" ] || [ -z "$AMOUNT" ]; then
  echo "USAGE:"
  echo "  ./neuro_shield.sh <SEQUENCE_ID> <ASSET> <AMOUNT>"
  exit 1
fi

echo "🛡️  NEUROSPHERE TRANSACTION SHIELD"
echo "ID     : $SEQ_ID"
echo "ASSET  : $ASSET"
echo "AMOUNT : $AMOUNT"
echo "--------------------------------"

python3 "$VALIDATOR" "$SEQ_ID" "$ASSET"
STATUS=$?

TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

if [ "$STATUS" -eq 0 ]; then
  echo "[AUTHORIZED] Transaksi diizinkan"

  echo "{\"time\":\"$TIMESTAMP\",\"id\":\"$SEQ_ID\",\"asset\":\"$ASSET\",\"amount\":\"$AMOUNT\",\"status\":0}" >> "$LEDGER"

  echo "✅ SUCCESS: $AMOUNT $ASSET diklaim oleh $SEQ_ID"
  exit 0
else
  echo "[BLOCKED] Transaksi ditolak"

  echo "{\"time\":\"$TIMESTAMP\",\"id\":\"$SEQ_ID\",\"asset\":\"$ASSET\",\"amount\":\"$AMOUNT\",\"status\":$STATUS}" >> "$LEDGER"

  echo "⛔ DIBATALKAN demi keamanan sistem"
  exit 2
fi
