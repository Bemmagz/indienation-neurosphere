#!/bin/bash
LEDGER="core/mathematics_vault/ledger.jsonl"
LAST_HASH=$(md5sum $LEDGER)
while true; do
    CURRENT_HASH=$(md5sum $LEDGER)
    if [ "$CURRENT_HASH" != "$LAST_HASH" ]; then
        git add .
        git commit -m "AI-Guard: Automated Infrastructure Sync ($(date +%T))"
        git push origin main
        LAST_HASH=$CURRENT_HASH
    fi
    sleep 30
done
