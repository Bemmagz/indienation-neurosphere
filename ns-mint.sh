#!/data/data/com.termux/files/usr/bin/bash

# NeuroSphere Aura Identity Minting Engine v1.0
# Generates Metadata for Living Value Identity

USER_ID=$1
AURA_SCORE=$2

if [ -z "$USER_ID" ] || [ -z "$AURA_SCORE" ]; then
    echo "Usage: ./ns-mint.sh [Citizen_ID] [Social_Score_0_to_100]"
    exit 1
fi

# Menentukan Warna Aura berdasarkan Score
if [ "$AURA_SCORE" -ge 80 ]; then
    COLOR="Diamond-White"
    RANK="Sovereign-Kindness"
elif [ "$AURA_SCORE" -ge 50 ]; then
    COLOR="Emerald-Green"
    RANK="Active-Contributor"
else
    COLOR="Azure-Blue"
    RANK="New-Citizen"
fi

MINT_TIME=$(date +%s)
FILE_NAME="AURA_${USER_ID}_${MINT_TIME}.json"

echo "🎨 Minting Aura Identity for $USER_ID..."
sleep 1

{
echo "{"
echo "  \"identity\": \"$USER_ID\","
echo "  \"protocol\": \"NeuroSphere v2.6.6\","
echo "  \"aura_color\": \"$COLOR\","
echo "  \"rank\": \"$RANK\","
echo "  \"social_reputation\": $AURA_SCORE,"
echo "  \"mint_timestamp\": $MINT_TIME,"
echo "  \"ledger_status\": \"VERIFIED_ARGI\""
echo "}"
} > "$FILE_NAME"

echo "✅ Success! Identity minted to: $FILE_NAME"
echo "✨ Aura Color: $COLOR | Rank: $RANK"
