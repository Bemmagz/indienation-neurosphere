#!/bin/bash
set -e

echo "===================================================="
echo " NEUROSPHERE | LUV GENESIS INITIALIZER"
echo " MODE        : SOVEREIGN OFF-CHAIN"
echo " DATE (UTC)  : $(date -u)"
echo "===================================================="
echo

# ===============================================
# 0. ROOT VALIDATION
# ===============================================
BASE_DIR="$HOME/indienation-neurosphere"

if [ ! -d "$BASE_DIR" ]; then
  echo "[FATAL] Project directory not found: $BASE_DIR"
  exit 1
fi

cd "$BASE_DIR"

# ===============================================
# 1. DIRECTORY STRUCTURE
# ===============================================
mkdir -p state ledger contracts logs

# ===============================================
# 2. GENESIS CONSTANTS
# ===============================================
TOTAL_LUV_SUPPLY=1000000000000
CLAIM_PER_HUMAN=1000000
MAX_HUMANS=1000000

# ===============================================
# 3. FILE DEFINITIONS
# ===============================================
GENESIS_FLAG="state/GENESIS_ACTIVE"
SOFT_FLAG="state/SOFT_LAUNCH_ACTIVE"
CONFIG_FILE="state/genesis.conf"
LEDGER_FILE="ledger/luv_ledger.csv"
AUDIT_LOG="logs/audit.log"

# ===============================================
# 4. GENESIS INITIALIZATION
# ===============================================
if [ ! -f "$GENESIS_FLAG" ]; then
  echo "[INFO] Initializing GENESIS..."

  date -u > "$GENESIS_FLAG"

  cat <<EOF > "$CONFIG_FILE"
TOTAL_LUV_SUPPLY=$TOTAL_LUV_SUPPLY
CLAIM_PER_HUMAN=$CLAIM_PER_HUMAN
MAX_HUMANS=$MAX_HUMANS
MODE=SOVEREIGN_OFFCHAIN
IMMUTABLE=TRUE
EOF

  echo "hash,amount,timestamp" > "$LEDGER_FILE"
  echo "[GENESIS] Activated at $(date -u)" >> "$AUDIT_LOG"
else
  echo "[INFO] Genesis already active."
fi

# ===============================================
# 5. SOFT LAUNCH
# ===============================================
if [ ! -f "$SOFT_FLAG" ]; then
  date -u > "$SOFT_FLAG"
  echo "[SOFT-LAUNCH] Enabled at $(date -u)" >> "$AUDIT_LOG"
fi

# ===============================================
# 6. STATUS REPORT
# ===============================================
CLAIMS=$(($(wc -l < "$LEDGER_FILE") - 1))
DISTRIBUTED=$((CLAIMS * CLAIM_PER_HUMAN))
REMAINING=$((TOTAL_LUV_SUPPLY - DISTRIBUTED))

echo
echo "---------------- SYSTEM STATUS ----------------"
echo "Genesis        : ACTIVE"
echo "Soft Launch    : ACTIVE"
echo "Claims         : $CLAIMS / $MAX_HUMANS"
echo "Distributed    : $DISTRIBUTED LUV"
echo "Remaining      : $REMAINING LUV"
echo "Ledger         : $LEDGER_FILE"
echo "------------------------------------------------"
echo "SYSTEM STATUS  : SOVEREIGN | IMMUTABLE | LIVE"
echo "================================================"
