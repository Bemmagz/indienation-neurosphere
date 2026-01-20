#!/data/data/com.termux/files/usr/bin/bash

USER_ID=$1
ACTION=$2
COINS=$3

if [ -z "$USER_ID" ] || [ -z "$ACTION" ] || [ -z "$COINS" ]; then
    echo "Usage: ./ns-kindness-cycle.sh [Citizen_ID] [Action] [Coins]"
    exit 1
fi

# Setup Database Sederhana
DB_DIR="aura_history"
mkdir -p "$DB_DIR"
DB_FILE="$DB_DIR/${USER_ID}.db"

# 1. Ambil Skor Lama atau Inisialisasi
if [ -f "$DB_FILE" ]; then
    PREVIOUS_SCORE=$(cat "$DB_FILE")
else
    PREVIOUS_SCORE=30 # Skor awal warga baru
fi

echo "🌟 Processing Kindness Cycle for $USER_ID..."
echo "📊 Current Reputation: $PREVIOUS_SCORE"

# 2. Eksekusi Reward via Core
./ns-core.sh reward "$USER_ID" "$ACTION" "$COINS"

# 3. Kalkulasi Skor Baru (Akumulatif)
# Setiap 1 koin LUV menambah 2 poin Aura, maksimal 100
GROWTH=$((COINS * 2))
NEW_SCORE=$((PREVIOUS_SCORE + GROWTH))

if [ "$NEW_SCORE" -gt 100 ]; then NEW_SCORE=100; fi

# Simpan Skor Baru
echo "$NEW_SCORE" > "$DB_FILE"

# 4. Minting Identitas Baru
./ns-mint.sh "$USER_ID" "$NEW_SCORE"

echo "✅ Cycle Complete. $USER_ID evolved: $PREVIOUS_SCORE -> $NEW_SCORE"
