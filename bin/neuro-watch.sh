#!/bin/bash
# NEUROSPHERE EVOLUTION WATCH (50% Alert)

IDENTITY_DIR="$HOME/indienation-neurosphere/identities"
THRESHOLD=500000 # 50% dari 1 Juta LUV

echo "--- MONITORING POTENSI EVOLUSI (Threshold: $THRESHOLD LUV) ---"

for file in "$IDENTITY_DIR"/*.json; do
    [ -e "$file" ] || continue
    LUV=$(grep -o '"luv":[0-9]*' "$file" | cut -d':' -f2)
    ID=$(grep -o '"id":"[^"]*"' "$file" | cut -d'"' -f4)
    AURA=$(grep -o '"aura":"[^"]*"' "$file" | cut -d'"' -f4)

    if [ "$LUV" -ge "$THRESHOLD" ] && [ "$AURA" == "#33f3ff" ]; then
        echo "[ALERT] $ID memiliki $LUV LUV - Berada di jalur cepat menuju Aura Emas!"
    fi
done
