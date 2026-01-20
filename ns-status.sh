#!/data/data/com.termux/files/usr/bin/bash

USER_ID=$1
if [ -z "$USER_ID" ]; then
    echo "Usage: ./ns-status.sh [Citizen_ID]"
    exit 1
fi

ACTIVE_FILE="aura_history/${USER_ID}.json"
LEGACY_FILE="aura_history/${USER_ID}.inherited.json"

if [ -f "$ACTIVE_FILE" ]; then
    echo "🟢 STATUS: ACTIVE CITIZEN"
    jq . "$ACTIVE_FILE"
elif [ -f "$LEGACY_FILE" ]; then
    echo "🟡 STATUS: INHERITED / LEGACY"
    jq . "$LEGACY_FILE"
else
    echo "🔴 STATUS: NOT FOUND"
fi
