#!/data/data/com.termux/files/usr/bin/bash

# NeuroSphere Value Inheritance Protocol (VIP) v1.0
# Secure Legacy Transfer with Atomic Locking

OWNER_ID=$1
HEIR_ID=$2

if [ -z "$OWNER_ID" ] || [ -z "$HEIR_ID" ]; then
    echo "Usage: ./ns-inherit.sh [Owner_ID] [Heir_ID]"
    exit 1
fi

DB_FILE="aura_history/${OWNER_ID}.db"
LOCK_FILE="$DB_FILE.lock"

# 🔒 Acquire Atomic Lock
exec 200>"$LOCK_FILE"
flock -w 5 200 || { echo "⚠️ Could not acquire lock on $DB_FILE"; exit 1; }

if [ ! -f "$DB_FILE" ]; then
    echo "[ERROR] Owner reputation data not found."
    flock -u 200
    exit 1
fi

OWNER_SCORE=$(cat "$DB_FILE")
# Heir inherits 70% of the reputation
HEIR_SCORE=$(echo "$OWNER_SCORE * 0.7" | bc | cut -d. -f1)

echo "📜 Processing Inheritance Legacy from $OWNER_ID to $HEIR_ID..."
sleep 2

# 1. Archive Owner & Create Heir Data
echo "$HEIR_SCORE" > "aura_history/${HEIR_ID}.db"
mv "$DB_FILE" "aura_history/${OWNER_ID}.legacy"

# 🔓 Release Lock
flock -u 200
rm -f "$LOCK_FILE"

# 2. Mint New Identity for Heir
./ns-mint.sh "$HEIR_ID" "$HEIR_SCORE"

echo "------------------------------------------"
echo "✅ Inheritance Complete (Atomic Lock Released)"
echo "✨ $HEIR_ID inherited $HEIR_SCORE points."
echo "🔒 Legacy Archive: aura_history/${OWNER_ID}.legacy"
echo "------------------------------------------"
