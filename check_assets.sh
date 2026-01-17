#!/bin/bash
clear
echo -e "\033[1;34m=== NEUROSPHERE FOUNDER DASHBOARD ===\033[0m"
# Mengambil data dari API Port 5000
DATA=$(curl -s http://127.0.0.1:5000/balance)

if [[ $DATA == *"ENPE"* ]]; then
    echo "$DATA" | jq -C .
else
    echo -e "\033[1;31m[!] Error: Data kedaulatan tidak terbaca.\033[0m"
    echo "Respon API: $DATA"
fi
echo -e "\033[1;32m-------------------------------------\033[0m"
echo -e "Status: ONLINE | Port: 5000 | Identity: FOUNDER-01"
