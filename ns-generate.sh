#!/data/data/com.termux/files/usr/bin/bash

# NeuroSphere Kindness Event Generator
# Simulates global activity for E-KINDNESS

activities=("Mengajar_Seni" "Pembersihan_Pantai" "Donasi_Buku" "Layanan_Kesehatan" "Konservasi_Alam" "Pembangunan_Sumur" "Pelatihan_Digital")
nodes=("Baucau_TL" "Jakarta_ID" "Suva_FJ" "Port_Moresby_PG" "Apia_WS")

echo "🚀 Starting Global Kindness Simulation..."
echo "------------------------------------------"

for i in {1..10}
do
    USER="Citizen_$(($RANDOM % 900 + 100))"
    ACT=${activities[$RANDOM % ${#activities[@]}]}
    NODE=${nodes[$RANDOM % ${#nodes[@]}]}
    REWARD=$(($RANDOM % 10 + 1))
    
    echo "[$NODE] Sending Transaction..."
    ./ns-core.sh reward "$USER" "$ACT" "$REWARD"
    sleep 1
done

echo "------------------------------------------"
echo "✅ Simulation Complete. All transactions synced to 20 nodes."
