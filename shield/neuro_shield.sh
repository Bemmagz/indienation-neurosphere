#!/bin/bash
ROOT="$(dirname "$0")/.."
LEDGER="$ROOT/core/ledger.sh"
VALIDATOR="$ROOT/core/validator.sh"
SEQ="$1"
ASSET="$2"
AMOUNT="$3"
LEDGER_FILE="$ROOT/state/ledger.json"
mkdir -p "$(dirname "$LEDGER_FILE")"
touch "$LEDGER_FILE"
echo "🛡️  NEUROSPHERE TRANSACTION SHIELD"
echo "ID     : $SEQ"
echo "ASSET  : $ASSET"
echo "AMOUNT : $AMOUNT"
echo "--------------------------------"
"$VALIDATOR" "$SEQ" "$ASSET"
STATUS=$?
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
if [[ $STATUS -eq 0 ]]; then
    echo "{\"time\":\"$TIMESTAMP\",\"id\":\"$SEQ\",\"asset\":\"$ASSET\",\"amount\":\"$AMOUNT\",\"status\":0}" >> "$LEDGER_FILE"
    echo "[AUTHORIZED] Transaksi diizinkan"
    echo "✅ SUCCESS: $AMOUNT $ASSET diklaim oleh $SEQ"
else
    echo "{\"time\":\"$TIMESTAMP\",\"id\":\"$SEQ\",\"asset\":\"$ASSET\",\"amount\":\"$AMOUNT\",\"status\":$STATUS}" >> "$LEDGER_FILE"
    echo "[BLOCKED] Transaksi ditolak"
    echo "⛔ DIBATALKAN demi keamanan sistem"
fi
