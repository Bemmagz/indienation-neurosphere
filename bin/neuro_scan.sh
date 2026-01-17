#!/bin/bash

# Cara 1: Mencoba ifconfig (umum di Termux)
LOCAL_IP=$(ifconfig wlan0 2>/dev/null | grep "inet " | awk '{print $2}')

# Cara 2: Fallback ke hostname
if [ -z "$LOCAL_IP" ]; then
    LOCAL_IP=$(hostname -I | awk '{print $1}')
fi

# Extract Prefix
NET_PREFIX=$(echo $LOCAL_IP | cut -d. -f1-3)
PORT=5002
MY_ID="NeuroID#001"

if [ -z "$NET_PREFIX" ] || [ "$NET_PREFIX" == ".." ]; then
    echo -e "\033[0;31m[ERROR] Gagal mendeteksi IP lokal. Pastikan WiFi aktif atau Hotspot menyala.\033[0m"
    exit 1
fi

echo -e "\033[0;35m📡 Scanning & Syncing Aura in ${NET_PREFIX}.0/24 (My IP: $LOCAL_IP)...\033[0m"

for i in {1..254}; do
    (
        target="${NET_PREFIX}.${i}"
        # Cek Node dengan timeout sangat singkat agar cepat
        if curl -s -m 0.5 "http://${target}:${PORT}/" | grep -q "NeuroSphere" 2>/dev/null; then
            echo -e "\033[0;32m[FOUND] Node at ${target}. Sending Handshake...\033[0m"
            
            # Aura Handshake
            curl -s -X POST "http://${target}:${PORT}/transfer" \
                 -H "Content-Type: application/json" \
                 -d "{\"sender\": \"$MY_ID\", \"recipient\": \"PEER_SYNC\", \"asset\": \"HANDSHAKE_AURA\", \"network\": \"NEURO_LOCAL\"}" > /dev/null 2>&1
        fi
    ) &
done
wait
echo -e "\033[0;36m[DONE] Aura Broadcast Complete.\033[0m"
