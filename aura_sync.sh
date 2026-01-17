#!/bin/bash

VAULT=~/indienation-neurosphere/identity_vault.json
LAST_SYNC=$(date '+%Y-%m-%d')

echo "🧠 Memulai Sinkronisasi Auralang..."
echo "📅 Tanggal: $LAST_SYNC"

# Cek apakah vault ada
if [[ ! -f "$VAULT" ]]; then
    echo "❌ Vault tidak ditemukan. Membuat baru..."
    echo '{"assets":{"LUV":0},"notarized_at":"1970-01-01"}' > "$VAULT"
fi

# Algoritma E-KINDNESS: Random reward 0-10 koin
REWARD=$(( RANDOM % 11 ))

if [[ $REWARD -gt 0 ]]; then
    # Ambil saldo lama
    CURRENT_LUV=$(jq -r '.assets.LUV' "$VAULT")
    
    # Hitung saldo baru (tanpa bc, pakai arithmetic bash)
    NEW_LUV=$(( CURRENT_LUV + REWARD ))
    
    # Update vault dengan syntax jq yang benar
    jq --argjson new_luv "$NEW_LUV" '.assets.LUV = $new_luv' "$VAULT" > "${VAULT}.tmp"
    mv "${VAULT}.tmp" "$VAULT"
    
    echo "✨ Keajaiban Terdeteksi! Anda menerima $REWARD LUV hari ini."
    echo "📊 Saldo LUV: $CURRENT_LUV → $NEW_LUV"
else
    echo "🕯️ Hari ini adalah waktu untuk kontemplasi. (Reward: 0 LUV)"
fi

# Update timestamp sinkronisasi
jq --arg date "$LAST_SYNC" '.notarized_at = $date' "$VAULT" > "${VAULT}.tmp"
mv "${VAULT}.tmp" "$VAULT"

echo "✅ Sinkronisasi selesai."
