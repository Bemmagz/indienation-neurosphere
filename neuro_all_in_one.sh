#!/bin/bash
# ================================================
# NEUROSPHERE ALL-IN-ONE LAUNCHER
# Setup + CLI + Validator + Ledger + Shield
# ================================================

ROOT_DIR="$(pwd)"

# ----- 1️⃣ Create directories -----
mkdir -p "$ROOT_DIR/bin" "$ROOT_DIR/shield" "$ROOT_DIR/core" "$ROOT_DIR/state"

# ----- 2️⃣ Create identity vault -----
VAULT_FILE="$ROOT_DIR/identity_vault.json"
if [ ! -f "$VAULT_FILE" ]; then
cat > "$VAULT_FILE" <<'EOF'
{
  "identity": {"sequence_id": "TM-GEN-F69870"},
  "assets": {"LUV": 1000, "ENPE": 500, "DOGE": 0}
}
EOF
fi

# ----- 3️⃣ Create core/tm_validator.py -----
cat > "$ROOT_DIR/core/tm_validator.py" <<'EOF'
#!/usr/bin/env python3
import sys, json, os, time

VAULT_PATH = os.path.expanduser(os.path.join(os.path.dirname(__file__), "../identity_vault.json"))

def validate_tm(seq_id, asset):
    if not os.path.exists(VAULT_PATH):
        print("VAULT_NOT_FOUND")
        return 1
    with open(VAULT_PATH, "r") as f:
        vault_data = json.load(f)
    current_id = vault_data.get("identity", {}).get("sequence_id")
    if seq_id != current_id:
        print(f"VALIDATION_FAILED: ID '{seq_id}' tidak cocok dengan Sovereign Node ini.")
        return 2
    available_assets = vault_data.get("assets", {})
    if asset not in available_assets:
        print(f"DIALECT_ERROR: Aset '{asset}' tidak tersedia di node ini.")
        return 2
    return 0

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: tm_validator.py <SEQUENCE_ID> <ASSET>")
        sys.exit(1)
    seq = sys.argv[1]
    ast = sys.argv[2]
    status = validate_tm(seq, ast)
    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{ts}] ID={seq} ASSET={ast} STATUS={status}")
    sys.exit(status)
EOF
chmod +x "$ROOT_DIR/core/tm_validator.py"

# ----- 4️⃣ Create core/ledger.sh -----
cat > "$ROOT_DIR/core/ledger.sh" <<'EOF'
#!/bin/bash
LEDGER_FILE="$(dirname "$0")/../state/ledger.json"
mkdir -p "$(dirname "$LEDGER_FILE")"

cmd="$1"; shift || true

if [ "$cmd" == "balance" ]; then
    [ ! -f "$LEDGER_FILE" ] && echo "[]" && exit 0
    cat "$LEDGER_FILE" | jq .
elif [ "$cmd" == "record" ]; then
    SEQ_ID="$1"; ASSET="$2"; AMOUNT="$3"; STATUS="$4"; TIMESTAMP="$5"
    [ ! -f "$LEDGER_FILE" ] && echo "[]" > "$LEDGER_FILE"
    jq --arg time "$TIMESTAMP" \
       --arg id "$SEQ_ID" \
       --arg asset "$ASSET" \
       --arg amount "$AMOUNT" \
       --argjson status "$STATUS" \
       '. += [{"time":$time,"id":$id,"asset":$asset,"amount":$amount,"status":$status}]' \
       "$LEDGER_FILE" > "${LEDGER_FILE}.tmp" && mv "${LEDGER_FILE}.tmp" "$LEDGER_FILE"
fi
EOF
chmod +x "$ROOT_DIR/core/ledger.sh"

# ----- 5️⃣ Create shield/neuro_shield.sh -----
cat > "$ROOT_DIR/shield/neuro_shield.sh" <<'EOF'
#!/bin/bash
SEQ_ID="$1"; ASSET="$2"; AMOUNT="$3"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
VALIDATOR="$ROOT_DIR/core/tm_validator.py"
LEDGER="$ROOT_DIR/core/ledger.sh"

echo "🛡️  NEUROSPHERE TRANSACTION SHIELD"
echo "ID     : $SEQ_ID"
echo "ASSET  : $ASSET"
echo "AMOUNT : $AMOUNT"
echo "--------------------------------"

python3 "$VALIDATOR" "$SEQ_ID" "$ASSET"
STATUS=$?

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

if [ $STATUS -eq 0 ]; then
    echo "[AUTHORIZED] Transaksi diizinkan"
    "$LEDGER" record "$SEQ_ID" "$ASSET" "$AMOUNT" 0 "$TIMESTAMP"
    echo "✅ SUCCESS: $AMOUNT $ASSET diklaim oleh $SEQ_ID"
    exit 0
else
    echo "[BLOCKED] Transaksi ditolak"
    "$LEDGER" record "$SEQ_ID" "$ASSET" "$AMOUNT" $STATUS "$TIMESTAMP"
    echo "⛔ DIBATALKAN demi keamanan sistem"
    exit 2
fi
EOF
chmod +x "$ROOT_DIR/shield/neuro_shield.sh"

# ----- 6️⃣ Create bin/neuro CLI -----
cat > "$ROOT_DIR/bin/neuro" <<'EOF'
#!/bin/bash
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SHIELD="$ROOT_DIR/shield/neuro_shield.sh"
LEDGER="$ROOT_DIR/core/ledger.sh"

usage() {
  echo "USAGE:"
  echo "  neuro claim <SEQUENCE_ID> <ASSET> <AMOUNT> [<SEQ_ID2> <ASSET2> <AMOUNT2> ...]"
  echo "  neuro balance"
  exit 1
}

CMD="${1:-}"
case "$CMD" in
  claim)
    shift
    while (( "$#" )); do
      SEQ_ID="$1"; ASSET="$2"; AMOUNT="$3"
      [[ -z "$SEQ_ID" || -z "$ASSET" || -z "$AMOUNT" ]] && usage
      "$SHIELD" "$SEQ_ID" "$ASSET" "$AMOUNT" &
      shift 3
    done
    wait
    ;;
  balance)
    "$LEDGER" balance
    ;;
  *)
    usage
    ;;
esac
EOF
chmod +x "$ROOT_DIR/bin/neuro"

echo "✅ NEUROSPHERE ALL-IN-ONE SETUP COMPLETED!"
echo "Use './bin/neuro claim <SEQ_ID> <ASSET> <AMOUNT>' to claim assets."
echo "Use './bin/neuro balance' to check ledger."
