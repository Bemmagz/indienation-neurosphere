#!/bin/bash
LEDGER="/data/data/com.termux/files/home/indienation-neurosphere/state/ledger.json"
AMOUNT=$1

if [ -z "$AMOUNT" ]; then
    echo "Usage: neuro donate [amount]"
    exit 1
fi

# Simbolis: Mencatat donasi ke ledger dengan tag DONATION_POOL
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
echo "{\"timestamp\": \"$TIMESTAMP\", \"type\": \"DONATION\", \"asset\": \"ENPE\", \"amount\": $AMOUNT, \"tag\": \"15_PERCENT_POOL\", \"status\": 0}" >> "$LEDGER"

echo -e "\033[0;32m[HEART] Donasi sejumlah $AMOUNT ENPE telah dialokasikan ke Emergency Pool.\033[0m"
echo -e "\033[0;36m[INFO] Dana ini siap didistribusikan untuk bantuan bencana.\033[0m"
