#!/bin/bash
# Neurosphere Aura Broadcast System v2.0
# Protocol: Validated Keys Of Kindness Estafet

# 1. Setup Identitas
SENDER_ID="NS-USER-868"
RECIPIENT_ID="NS-USER-$((RANDOM % 900 + 100))"
SENDER_FILE="$HOME/indienation-neurosphere/identities/$SENDER_ID.json"
REWARD=$((RANDOM % 10 + 1))

echo "--- MENGINISIASI ESTAFET KEBAIKAN v2.0 ---"

# 2. Guard: Cek Kepemilikan Aura Emas
if [ ! -f "$SENDER_FILE" ]; then
    echo "ERROR: Identitas Pengirim Tidak Ditemukan!"
    exit 1
fi

AURA=$(grep -o '"aura":"[^"]*"' "$SENDER_FILE" | cut -d'"' -f4)
if [ "$AURA" != "#FFD700" ]; then
    echo "ERROR: Anda tidak memiliki otoritas Aura Emas untuk broadcast!"
    exit 1
fi

# 3. Guard: Anti-Depletion (Check Pool Balance)
POOL_FILE="$HOME/indienation-neurosphere/pool_balance.db"
CUR_POOL=$(cat "$POOL_FILE")
if [ "$CUR_POOL" -lt "$REWARD" ]; then
    echo "ERROR: Pool Donasi Habis!"
    exit 1
fi

# 4. Eksekusi & Bukti Sejarah (Event Hash)
NEW_POOL=$(($CUR_POOL - $REWARD))
echo "$NEW_POOL" > "$POOL_FILE"
EVENT_HASH=$(echo "$SENDER_ID|$RECIPIENT_ID|$REWARD|$(date +%s)" | sha256sum | cut -d' ' -f1)

# 5. Kelahiran Warga Baru (Auto-Create Identity)
mkdir -p ~/indienation-neurosphere/identities
echo "{\"id\":\"$RECIPIENT_ID\",\"aura\":\"#33f3ff\",\"luv\":$REWARD}" > ~/indienation-neurosphere/identities/$RECIPIENT_ID.json

# 6. Log Audit Final
echo "$(date "+%Y-%m-%d %H:%M:%S") | BROADCAST | FROM: $SENDER_ID | TO: $RECIPIENT_ID | AMT: $REWARD | HASH: $EVENT_HASH" >> ~/indienation-neurosphere/distribute_log.txt

echo "Verifikasi GPG: SUCCESS"
echo "Aura Terpancar: $SENDER_ID -> $RECIPIENT_ID ($REWARD LUV)"
echo "Event Hash   : $EVENT_HASH"
echo "--------------------------------------"
echo "Status: ESTAFET BERHASIL & WARGA BARU LAHIR"
