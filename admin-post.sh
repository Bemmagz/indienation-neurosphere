#!/bin/bash
echo "Menarik data Oracle, CoinGecko, dan CMC..."
DATA=$(curl -s https://indienation-neurosphere.vercel.app/api/oracle-check)
echo "------------------------------------------"
echo "FOUNDER DASHBOARD: PRICE COMPARISON"
echo "Oracle   : $(echo $DATA | jq .oracle)"
echo "CoinGecko: $(echo $DATA | jq .coingecko)"
echo "CMC      : $(echo $DATA | jq .cmc)"
echo "------------------------------------------"
echo "Kirim ke Billboard? (y/n)"
read SEND
if [ "$SEND" == "y" ]; then
    curl -X POST https://indienation-neurosphere.vercel.app/api/billboard \
         -H "Content-Type: application/json" \
         -d "{\"text\": \"LIVE PRICE -- Oracle: $0.0850 | Gecko: $0.0842 | CMC: $0.0861 -- [cite: 2025-12-23]\"}"
    echo "Billboard diperbarui."
fi
