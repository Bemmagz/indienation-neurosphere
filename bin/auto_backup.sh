#!/bin/bash

# --- Path Definitions ---
ROOT_DIR="/data/data/com.termux/files/home/indienation-neurosphere"
STATE_DIR="$ROOT_DIR/state"
BACKUP_DIR="$ROOT_DIR/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Create backup directory if not exists
mkdir -p "$BACKUP_DIR"

# --- Executive Backup ---
echo -e "\033[0;36m[BACKUP] Initiating Sovereign Data Archive...\033[0m"

# Backup Ledger, Karma, and Vault
tar -czf "$BACKUP_DIR/neurosphere_state_$TIMESTAMP.tar.gz" \
    -C "$ROOT_DIR" state/ledger.json state/karma.jsonl identity_vault.json

# Keep only the last 5 backups to save space
ls -t "$BACKUP_DIR"/neurosphere_state_*.tar.gz | tail -n +6 | xargs rm -f 2>/dev/null

echo -e "\033[0;32m[SUCCESS] State secured at: $TIMESTAMP\033[0m"
