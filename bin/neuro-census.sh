#!/bin/bash
# NEUROSPHERE CENSUS & CONSTITUTIONAL AUDIT
IDENTITY_DIR="$HOME/indienation-neurosphere/identities"
CONSENSUS_DIR="$HOME/indienation-neurosphere/consensus"

VALID_GOLD=0
LEGACY_GOLD=0
CITIZENS=$(ls -1 "$IDENTITY_DIR"/*.json 2>/dev/null | wc -l)

for file in "$IDENTITY_DIR"/*.json; do
    [ -e "$file" ] || continue
    AURA=$(grep -o '"aura":"[^"]*"' "$file" | cut -d'"' -f4)
    ID=$(grep -o '"id":"[^"]*"' "$file" | cut -d'"' -f4)
    SIGS=$(ls "$CONSENSUS_DIR/$ID-by-"*.sig 2>/dev/null | wc -l)
    
    if [ "$AURA" == "#FFD700" ]; then
        if [ "$SIGS" -ge 2 ]; then ((VALID_GOLD++)); else ((LEGACY_GOLD++)); fi
    fi
done

echo "============================================"
echo "    NEUROSPHERE CONSTITUTIONAL CENSUS       "
echo "============================================"
echo "Total Populasi      : $CITIZENS"
echo "Gold Leaders (Valid): $VALID_GOLD"
echo "Gold Leaders (Legacy): $LEGACY_GOLD"
echo "--------------------------------------------"
echo "Status Konstitusi   : $([ $LEGACY_GOLD -gt 0 ] && echo "AUDIT REQUIRED" || echo "STABLE")"
echo "============================================"
