#!/data/data/com.termux/files/usr/bin/bash

# NeuroSphere Aura Scanner v1.0
# Simulates social benefit validation

FILE=$1

if [ ! -f "$FILE" ]; then
    echo "[ERROR] Aura Identity file not found!"
    exit 1
fi

COLOR=$(grep "aura_color" "$FILE" | cut -d '"' -f 4)
RANK=$(grep "rank" "$FILE" | cut -d '"' -f 4)
USER=$(grep "identity" "$FILE" | cut -d '"' -f 4)

echo "🔍 Scanning Aura Identity for: $USER..."
sleep 1
echo "✨ Aura Detected: $COLOR ($RANK)"
echo "------------------------------------------"

case $COLOR in
    "Diamond-White")
        echo "[BENEFIT GRANTED] Access to Premium Healthcare & Zero-Interest Loans."
        echo "Status: HIGH-VALUE CITIZEN"
        ;;
    "Emerald-Green")
        echo "[BENEFIT GRANTED] 50% Discount on Public Transport & Education."
        echo "Status: TRUSTED CONTRIBUTOR"
        ;;
    *)
        echo "[STANDARD ACCESS] Basic Services Enabled."
        echo "Status: GROWING CITIZEN"
        ;;
esac
echo "------------------------------------------"
