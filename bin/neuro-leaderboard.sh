#!/bin/bash
# NEUROSPHERE REPUTATION RANKING (TAX-FREE & DEBT-FREE)

IDENTITY_DIR="$HOME/indienation-neurosphere/identities"

echo "=========================================================="
echo "      NEUROSPHERE REPUTATION RANKING (SOVEREIGN)"
echo "=========================================================="
printf "%-12s | %-12s | %-15s | %-10s\n" "IDENTITY" "AURA" "LUV (REP)" "STABLE"
echo "----------------------------------------------------------"

# Mengambil data tanpa potongan pajak
grep -h "" $IDENTITY_DIR/*.json | \
sed 's/[{"}]//g; s/,/ /g' | \
awk -F'[: ]+' '{
    aura_label = ($4 == "#FFD700") ? "GOLD" : "BLUE"
    # Mengidentifikasi posisi LUV dan IND-EUR secara dinamis
    luv_val = 0; eur_val = 0;
    for(i=1;i<=NF;i++) {
        if($i=="luv") luv_val=$(i+1)
        if($i=="ind_eur") eur_val=$(i+1)
    }
    printf "%-12s | %-12s | %-15s | €%-10s\n", $2, aura_label, luv_val, eur_val
}' | sort -k3 -nr | head -n 10

echo "=========================================================="
