#!/bin/bash

# Konstitusi Waktu Genesis (01 Februari 2026)
GENESIS_SEC=$(date -d "2026-02-01 00:00:00" +%s)
NOW_SEC=$(date +%s)

# Hitung selisih hari
DIFF_SEC=$((NOW_SEC - GENESIS_SEC))
DIFF_DAYS=$((DIFF_SEC / 86400 + 1))

# Logika Pembagian Proposional
if [ "$DIFF_DAYS" -lt 1 ]; then
    BALANCE=0
    STATUS="Pre-Genesis"
elif [ "$DIFF_DAYS" -eq 1 ]; then
    BALANCE=1000
    STATUS="Day 1: Genesis Grant"
elif [ "$DIFF_DAYS" -lt 365 ]; then
    # Hari pertama 1000 + (sisa hari * 270)
    EXTRA_DAYS=$((DIFF_DAYS - 1))
    BALANCE=$((1000 + (EXTRA_DAYS * 270)))
    STATUS="Day $DIFF_DAYS: Daily Growth"
else
    BALANCE=100000
    STATUS="Final: Sovereign Maturity"
fi

# Output ke Terminal
echo "------------------------------------------"
echo "   INDIE-NATION SOVEREIGN WALLET          "
echo "------------------------------------------"
echo " IID     : INDIE-0000000001               "
echo " Status  : $STATUS                        "
echo " Saldo   : €$(printf "%'d" $BALANCE)      "
echo "------------------------------------------"
