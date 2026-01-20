#!/bin/bash
echo "🔍 Validating Inheritance Lineage Integrity..."
ERRORS=0

# Cek semua file aktif yang memiliki 'inherited_from'
for file in aura_history/*.json; do
    if [ -f "$file" ] && [[ "$file" != *.inherited.json ]]; then
        INHERITED_FROM=$(jq -r '.inherited_from // empty' "$file")
        if [ -n "$INHERITED_FROM" ]; then
            LEGACY_FILE="aura_history/${INHERITED_FROM}.inherited.json"
            if [ ! -f "$LEGACY_FILE" ]; then
                echo "❌ ERROR: $file inherits from $INHERITED_FROM but no legacy file found."
                ERRORS=$((ERRORS+1))
            else
                HEIR_IN_LEGACY=$(jq -r '.heir // empty' "$LEGACY_FILE")
                CITIZEN_ID=$(basename "$file" .json)
                if [ "$HEIR_IN_LEGACY" != "$CITIZEN_ID" ]; then
                    echo "⚠️ WARNING: Heir mismatch. $file expects from $INHERITED_FROM, but legacy points to $HEIR_IN_LEGACY"
                fi
            fi
        fi
    fi
done

# Cek semua file legacy yang memiliki 'heir'
for file in aura_history/*.inherited.json; do
    if [ -f "$file" ]; then
        HEIR=$(jq -r '.heir // empty' "$file")
        if [ -n "$HEIR" ]; then
            ACTIVE_FILE="aura_history/${HEIR}.json"
            if [ ! -f "$ACTIVE_FILE" ]; then
                echo "❌ ERROR: $file designates heir $HEIR but no active file found."
                ERRORS=$((ERRORS+1))
            fi
        fi
    fi
done

if [ $ERRORS -eq 0 ]; then
    echo "✅ All inheritance lineages are valid and consistent."
else
    echo "🔴 Found $ERRORS critical lineage issue(s)."
fi
