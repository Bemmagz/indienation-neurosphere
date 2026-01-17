#!/bin/bash
VAULT=~/indienation-neurosphere/identity_vault.json

if [[ -f "$VAULT" ]]; then
    IDENTITY=$(jq -r '.identity.handle' "$VAULT")
    ID=$(jq -r '.identity.id' "$VAULT")
    LUV=$(jq -r '.assets.LUV' "$VAULT")
    ENPE=$(jq -r '.assets.ENPE' "$VAULT")
    SYNC=$(jq -r '.notarized_at' "$VAULT")

    echo -e "\n--- NEUROSPHERE SOVEREIGN BALANCE ---"
    echo "Identity: $IDENTITY (ID: $ID)"
    echo "------------------------------------"
    echo "💖 LUV Balance  : $LUV"
    echo "💰 ENPE Balance : $ENPE"
    echo "🕐 Last Sync    : $SYNC"
    echo "------------------------------------"
    
    STREAK=$(jq -r '.karma.streak' "$VAULT")
    echo "🔥 Streak: $STREAK days"
else
    echo "❌ Vault missing!"
fi
