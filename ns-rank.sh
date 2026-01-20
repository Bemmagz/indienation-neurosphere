#!/data/data/com.termux/files/usr/bin/bash

# NeuroSphere Rank Visualizer
# Menentukan peringkat warga berdasarkan akumulasi nilai kebaikan

USER_ID=$1
DB_FILE="neurosphere.db"

if [ -z "$USER_ID" ]; then
    echo "Usage: ./ns-rank.sh [Citizen_ID]"
    exit 1
fi

AURA=$(sqlite3 $DB_FILE "SELECT current_aura FROM citizens WHERE id='$USER_ID';")

if [ -z "$AURA" ]; then
    echo "❌ Citizen not found."
    exit 1
fi

# Logika Penentuan Rank
if [ "$AURA" -le 30 ]; then
    RANK="🌱 Seed of Kindness"
    COLOR="\e[32m" # Green
elif [ "$AURA" -le 70 ]; then
    RANK="🛡️ Guardian of Value"
    COLOR="\e[34m" # Blue
elif [ "$AURA" -le 150 ]; then
    RANK="💎 Emerald Pillar"
    COLOR="\e[36m" # Cyan
else
    RANK="👑 Living Legend"
    COLOR="\e[35m" # Magenta
fi

echo -e "------------------------------------------"
echo -e "👤 Citizen: $USER_ID"
echo -e "🌟 Aura   : $AURA"
echo -e "🏆 Rank   : ${COLOR}${RANK}\e[0m"
echo -e "------------------------------------------"
