#!/bin/bash
# NEUROSPHERE TIME-TRAVEL SIMULATOR
# Force-aging an identity and injecting estafet logs

TARGET_ID="NS-USER-931"
LOG_FILE="$HOME/indienation-neurosphere/distribute_log.txt"
TARGET_FILE="$HOME/indienation-neurosphere/identities/$TARGET_ID.json"

echo "--- MENGAKSELERASI USIA & REPUTASI: $TARGET_ID ---"

if [ -f "$TARGET_FILE" ]; then
    # 1. Manipulasi Saldo ke 1.000.005 LUV
    sed -i 's/"luv":[0-9]*/"luv":1000005/g' "$TARGET_FILE"
    
    # 2. Manipulasi Tanggal File (Mundur 8 Hari)
    touch -d "8 days ago" "$TARGET_FILE"
    
    # 3. Injeksi 3 Log Estafet Palsu
    for i in {1..3}; do
        echo "$(date "+%Y-%m-%d %H:%M:%S") | BROADCAST | FROM: $TARGET_ID | TO: NS-DUMMY-$i | AMT: 1 | HASH: SIM-$(date +%s)-$i" >> "$LOG_FILE"
    done

    echo "Status: $TARGET_ID sekarang memenuhi syarat (1M LUV, Age 8d, 3 Estafets)."
else
    echo "Error: Target $TARGET_ID tidak ditemukan."
fi
