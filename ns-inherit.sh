#!/data/data/com.termux/files/usr/bin/bash

# NeuroSphere Value Inheritance Protocol (VIP) v2.0
# Memindahkan Reputasi + Riwayat secara Atomik & Terverifikasi

OWNER_ID=$1
HEIR_ID=$2
INHERITANCE_KEY=$3

# 0. VERIFIKASI AWAL
if [ -z "$OWNER_ID" ] || [ -z "$HEIR_ID" ] || [ -z "$INHERITANCE_KEY" ]; then
    echo "Usage: ./ns-inherit.sh [Owner_ID] [Heir_ID] [Key]"
    exit 1
fi

# Simulasi Verifikasi Key (Bisa dihubungkan ke OpenSSL/Master Key nanti)
if [ "$INHERITANCE_KEY" != "NS-SECRET-2026" ]; then
    echo "⛔ UNAUTHORIZED: Invalid inheritance key."
    exit 1
fi

DB_DIR="aura_history"
DB_FILE="$DB_DIR/${OWNER_ID}.json"
LOCK_FILE="$DB_FILE.lock"
LOG_FILE="logs/inheritance.log"

mkdir -p "$DB_DIR" logs inheritance_certs

# 1. ATOMIC LOCKING
exec 200>"$LOCK_FILE"
flock -w 10 200 || { echo "⚠️ System busy. Could not acquire lock."; exit 1; }

if [ ! -f "$DB_FILE" ]; then
    echo "[ERROR] Owner data not found: $DB_FILE"
    flock -u 200; exit 1
fi

# 2. LOAD DATA & HISTORY
OWNER_DATA=$(cat "$DB_FILE")
OWNER_SCORE=$(echo "$OWNER_DATA" | jq -r '.social_reputation // 0')
OWNER_HISTORY=$(echo "$OWNER_DATA" | jq -c '.history // []')

# 3. KALKULASI WARISAN (70% Skor)
HEIR_SCORE=$(echo "$OWNER_SCORE * 0.7" | bc | cut -d. -f1)

# 4. CREATE HEIR DATA (Membawa Riwayat Pendahulu)
HEIR_DATA_JSON=$(jq -n \
    --arg id "$HEIR_ID" \
    --argjson aura "$HEIR_SCORE" \
    --argjson hist "$OWNER_HISTORY" \
    --arg owner "$OWNER_ID" \
    '{identity: $id, social_reputation: $aura, history: $hist, inherited_from: $owner, inherited_at: "'$(date -Iseconds)'"}')

echo "$HEIR_DATA_JSON" > "$DB_DIR/${HEIR_ID}.json"

# 5. ARCHIVE & CLEANUP
mv "$DB_FILE" "$DB_DIR/${OWNER_ID}.inherited.json"

# 6. RELEASE LOCK
flock -u 200
rm -f "$LOCK_FILE"

# 7. MINT IDENTITY & AUDIT CERT
./ns-mint.sh "$HEIR_ID" "$HEIR_SCORE"
echo "$HEIR_DATA_JSON" | jq '. + {cert_type: "LegacyInheritance"}' > "inheritance_certs/CERT_${OWNER_ID}_TO_${HEIR_ID}.json"

# 8. LOGGING
echo "$(date -Iseconds) | OWNER:$OWNER_ID | HEIR:$HEIR_ID | SCORE:$HEIR_SCORE" >> "$LOG_FILE"

echo "------------------------------------------"
echo "✅ VALUE INHERITANCE COMPLETE (VIP v2.0)"
echo "✨ $HEIR_ID inherited $HEIR_SCORE points & history."
echo "📜 Logged to: $LOG_FILE"
echo "------------------------------------------"
