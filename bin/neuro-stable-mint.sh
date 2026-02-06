#!/bin/bash
# NEUROSPHERE STABLE MINTING PROTOCOL
# Target: ONLY Valid Gold Leaders

IDENTITY_DIR="$HOME/indienation-neurosphere/identities"
CONSENSUS_DIR="$HOME/indienation-neurosphere/consensus"
STABLE_AMT=100000 # €100.000 Anchor

echo "--- MENGINISIASI PENCETAKAN IND-EUR (VALUE ANCHOR) ---"

for file in "$IDENTITY_DIR"/*.json; do
    [ -e "$file" ] || continue
    ID=$(grep -o '"id":"[^"]*"' "$file" | cut -d'"' -f4)
    AURA=$(grep -o '"aura":"[^"]*"' "$file" | cut -d'"' -f4)
    SIGS=$(ls "$CONSENSUS_DIR/$ID-by-"*.sig 2>/dev/null | wc -l)

    # Syarat: Emas + Minimal 2 Konsensus
    if [ "$AURA" == "#FFD700" ] && [ "$SIGS" -ge 2 ]; then
        if ! grep -q '"ind_eur"' "$file"; then
            sed -i "s/}/, \"ind_eur\":$STABLE_AMT}/" "$file"
            echo "[MINTED] €$STABLE_AMT IND-EUR dialokasikan ke $ID"
        else
            echo "[SKIP] $ID sudah memiliki alokasi IND-EUR."
        fi
    fi
done
