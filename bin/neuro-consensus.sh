#!/bin/bash
# NEUROSPHERE SOCIAL CONSENSUS ENGINE v2.2.1
TARGET_ID=$1
IDENTITY_DIR="$HOME/indienation-neurosphere/identities"
CONSENSUS_DIR="$HOME/indienation-neurosphere/consensus"

mkdir -p "$CONSENSUS_DIR"

if [ -z "$TARGET_ID" ]; then
    echo "Usage: neuro-consensus.sh [USER_ID]"
    exit 1
fi

echo "--- MEMULAI VOTING KONSENSUS UNTUK $TARGET_ID ---"

# Mencari Social Leaders (Emas)
LEADERS=$(grep -l "#FFD700" "$IDENTITY_DIR"/*.json)
LEADER_COUNT=$(echo "$LEADERS" | wc -l)

if [ "$LEADER_COUNT" -lt 1 ]; then
    echo "ERROR: Tidak ada Social Leader untuk memberikan suara!"
    exit 1
fi

for leader_file in $LEADERS; do
    L_ID=$(grep -o '"id":"[^"]*"' "$leader_file" | cut -d'"' -f4)
    # Membuat 'Signature' fisik
    SIG_FILE="$CONSENSUS_DIR/$TARGET_ID-by-$L_ID.sig"
    touch "$SIG_FILE"
    echo "[VOTE] Leader $L_ID memberikan tanda tangan valid."
done

echo "Status: KONSENSUS TERCAPAI"
