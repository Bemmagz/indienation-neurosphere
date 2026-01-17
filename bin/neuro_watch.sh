#!/bin/bash
LEDGER="/data/data/com.termux/files/home/indienation-neurosphere/state/ledger.json"
GREEN='\033[0;32m'
NC='\033[0m'

echo "📡 NeuroSphere Watcher: Active. Monitoring pulses..."

# Gunakan tail untuk memantau perubahan file secara real-time
tail -f "$LEDGER" | while read -r line; do
    if [[ "$line" == *"status\":0"* ]]; then
        echo -e "${GREEN}[PULSE] Transaction Validated: Asset Flowing...${NC}"
        # Trigger efek visual sederhana
        sleep 0.1
    fi
done
