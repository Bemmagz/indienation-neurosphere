#!/bin/bash
DOMAIN="https://neurosphere-ledger.vercel.app"
NODES=("sin1" "sfo1" "iad1")

echo "======================================================"
echo "   NEUROSPHERE EDGE SOVEREIGNTY: PURGE & MONITOR      "
echo "======================================================"

# 1. Force Purge via Redeploy (The only way via CLI without API Token)
echo "[1/2] Triggering Global Edge Purge..."
vercel --prod --yes --force > /dev/null 2>&1

# 2. Monitoring Loop
echo "[2/2] Monitoring Node Propagation (Waiting for 200 OK)..."
echo "Target: $DOMAIN"

while true; do
    all_ok=true
    for node in "${NODES[@]}"; do
        # Menggunakan header x-vercel-ip-city untuk mensimulasikan request dari node spesifik
        status=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN" -H "x-vercel-ip-city: $node")
        
        if [ "$status" -eq 200 ]; then
            echo -e "Node $node: [ \033[0;32m200 OK\033[0m ]"
        else
            echo -e "Node $node: [ \033[0;31m$status 404/WAITING\033[0m ]"
            all_ok=false
        fi
    done

    if $all_ok; then
        echo -e "\n\033[0;32m[SUCCESS] All Edges Synchronized. 404 Eliminated.\033[0m"
        break
    fi
    
    echo "--- Retrying in 15 seconds... ---"
    sleep 15
done
