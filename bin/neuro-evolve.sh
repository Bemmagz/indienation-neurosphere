#!/bin/bash
# NEUROSPHERE EVOLUTION ENGINE v2.2 (Hardened + Consensus)

IDENTITY_DIR="$HOME/indienation-neurosphere/identities"
EVENT_DIR="$HOME/indienation-neurosphere/events"
CONSENSUS_DIR="$HOME/indienation-neurosphere/consensus"
LOG_FILE="$HOME/indienation-neurosphere/distribute_log.txt"
CURRENT_TIME=$(date +%s)

echo "--- PEMINDAIAN EVOLUSI TOTAL (KEDAULATAN v2.2) ---"

for file in "$IDENTITY_DIR"/*.json; do
    [ -e "$file" ] || continue
    ID=$(grep -o '"id":"[^"]*"' "$file" | cut -d'"' -f4)
    LUV=$(grep -o '"luv":[0-9]*' "$file" | cut -d':' -f2)
    AURA=$(grep -o '"aura":"[^"]*"' "$file" | cut -d'"' -f4)
    
    # 1. Cek Usia (7 Hari)
    FILE_TIME=$(stat -c %Y "$file")
    AGE_DAYS=$(( (CURRENT_TIME - FILE_TIME) / 86400 ))
    
    # 2. Cek Bukti Fisik Estafet (Min. 3)
    VERIFIED_ESTAFETS=0
    HASHES=$(grep "FROM: $ID" "$LOG_FILE" | awk -F"HASH: " '{print $2}')
    for h in $HASHES; do
        [ -f "$EVENT_DIR/$h.evt" ] && ((VERIFIED_ESTAFETS++))
    done

    # 3. Cek Tanda Tangan Konsensus (Min. 2)
    SIG_COUNT=$(ls -1 "$CONSENSUS_DIR/$ID-by-"*.sig 2>/dev/null | wc -l)

    if [ "$LUV" -ge 1000000 ] && [ "$AGE_DAYS" -ge 7 ] && [ "$VERIFIED_ESTAFETS" -ge 3 ] && [ "$SIG_COUNT" -ge 2 ] && [ "$AURA" == "#33f3ff" ]; then
        sed -i 's/"aura":"#33f3ff"/"aura":"#FFD700"/g' "$file"
        echo "[SUCCESS] $ID BEREVOLUSI! (LUV, Age, Event, & Consensus Verified)"
    else
        echo "[SKIP] $ID: LUV($LUV), Age($AGE_DAYS), Events($VERIFIED_ESTAFETS/3), Votes($SIG_COUNT/2)"
    fi
done
