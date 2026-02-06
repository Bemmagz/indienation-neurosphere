#!/bin/bash
# Neurosphere Pool Sustainability Calculator

BALANCE=$(cat ~/indienation-neurosphere/pool_balance.db)
AVG_REWARD=5  # Rata-rata distribusi harian (0-10)

# Menghitung proyeksi hari
DAYS_REMAINING=$(($BALANCE / $AVG_REWARD))
YEARS_REMAINING=$(($DAYS_REMAINING / 365))

echo -e "\n============================================"
echo -e "      NEUROSPHERE SUSTAINABILITY STATS      "
echo -e "============================================"
echo "Current Pool Balance : $BALANCE LUV"
echo "Avg Daily Outflow    : $AVG_REWARD LUV/user"
echo "Projected Endurance  : $DAYS_REMAINING Days"
echo "Approximate Years    : $YEARS_REMAINING Years"
echo "--------------------------------------------"
echo "AI Guard Status      : MONITORING"
echo "Policy               : Aggressive Growth Phase"
echo "============================================"
