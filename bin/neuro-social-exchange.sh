#!/bin/bash
# NEUROSPHERE SOCIAL EXCHANGE (EUR to LUV Conversion)
USER_ID=$1
EUR_AMOUNT=$2
RATIO=10 # 1 EUR = 10 LUV (Contoh Algoritma)

IDENTITY_DIR="$HOME/indienation-neurosphere/identities"
POOL_FILE="$HOME/indienation-neurosphere/pool_balance.db"
USER_FILE="$IDENTITY_DIR/$USER_ID.json"

if [ $# -ne 2 ]; then echo "Usage: neuro-social-exchange [USER_ID] [EUR_AMT]"; exit 1; fi

# Guard: Cek Saldo EUR
U_EUR=$(grep -o '"ind_eur":[0-9]*' "$USER_FILE" | cut -d':' -f2)
if [ "$U_EUR" -lt "$EUR_AMOUNT" ]; then echo "ERROR: Saldo IND-EUR tidak cukup!"; exit 1; fi

# Kalkulasi LUV yang didapat
LUV_GAIN=$((EUR_AMOUNT * RATIO))

# 1. Update Saldo User (EUR berkurang, LUV bertambah)
NEW_EUR=$((U_EUR - EUR_AMOUNT))
U_LUV=$(grep -o '"luv":[0-9]*' "$USER_FILE" | cut -d':' -f2)
NEW_LUV=$((U_LUV + LUV_GAIN))

sed -i "s/\"ind_eur\":$U_EUR/\"ind_eur\":$NEW_EUR/" "$USER_FILE"
sed -i "s/\"luv\":$U_LUV/\"luv\":$NEW_LUV/" "$USER_FILE"

# 2. Kembalikan EUR ke Pool Donasi (Sirkulasi Sistem)
CUR_POOL=$(cat "$POOL_FILE")
NEW_POOL=$((CUR_POOL + EUR_AMOUNT))
echo "$NEW_POOL" > "$POOL_FILE"

echo "[EXCHANGE SUCCESS] $USER_ID menukarkan €$EUR_AMOUNT menjadi $LUV_GAIN LUV"
echo "Pool Donasi kini: €$NEW_POOL"
