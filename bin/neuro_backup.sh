#!/bin/bash
ROOT_DIR="/data/data/com.termux/files/home/indienation-neurosphere"
BACKUP_DIR="$ROOT_DIR/backups"
TS=$(date +"%Y%m%d_%H%M%S")

mkdir -p "$BACKUP_DIR"

# File kritis yang wajib diamankan
FILES=("$ROOT_DIR/state/ledger.json" "$ROOT_DIR/state/karma.jsonl" "$ROOT_DIR/identity_vault.json")

echo -e "\033[0;35m[BACKUP] Initializing Shadow Sync...\033[0m"

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        cp "$file" "$BACKUP_DIR/${filename}_$TS.bak"
    fi
done

# Hapus backup lama (sisakan 10 cadangan terakhir agar hemat storage)
ls -t $BACKUP_DIR/*.bak | tail -n +31 | xargs rm -f 2>/dev/null

echo -e "\033[0;32m[SUCCESS] Snapshot saved at $TS. Identity is secure.\033[0m"
