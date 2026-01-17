#!/bin/bash

KARMA_FILE="/data/data/com.termux/files/home/indienation-neurosphere/state/karma.jsonl"
GREEN='\033[0;32m'
GOLD='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${GOLD}--- NEUROSPHERE IDENTITY AURA ---${NC}"

if [[ ! -f "$KARMA_FILE" ]]; then
    echo "Belum ada jejak Karma terdeteksi. Mulailah berbagi LovelyCoin!"
    exit 0
fi

# Hitung total poin
TOTAL_POINTS=$(jq -s 'map(.points) | add' "$KARMA_FILE")
STREAK=$(wc -l < "$KARMA_FILE")

echo -e "Identity  : ${CYAN}NeuroID#001${NC}"
echo -e "Total Poin: ${GREEN}$TOTAL_POINTS Points${NC}"
echo -e "Streak    : $STREAK Transaksi Valid"

if [ "$TOTAL_POINTS" -gt 50 ]; then
    echo -e "Aura Level: ${GOLD}GOLDEN RADIANCE (High Trust)${NC}"
else
    echo -e "Aura Level: ${CYAN}CYAN STEADY (New Sovereign)${NC}"
fi
echo "--------------------------------"
