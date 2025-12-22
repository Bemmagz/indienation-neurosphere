#!/data/data/com.termux/files/usr/bin/bash
# ===============================================================
# NeuroSphere Live Byte-Stream Monitoring
# ===============================================================

LOG_CF="$WORKDIR/cloudflare.log"
TARGET_HOST="127.0.0.1"
TARGET_PORT=9999

echo -e "\033[1;32m[INFO] Memulai byte-per-byte monitoring NeuroGateway...\033[0m"
echo -e "\033[1;33m(Tekan CTRL+C untuk keluar)\033[0m"

# Memantau traffic dari Cloudflare tunnel dan tampilkan byte per byte
tail -F "$LOG_CF" | while IFS= read -r line; do
    TIMESTAMP=$(date +"%Y-%m-%dT%H:%M:%S")
    # Filter hanya GET atau POST
    if echo "$line" | grep -E "GET |POST "; then
        METHOD=$(echo "$line" | awk '{print $6}')
        PATH=$(echo "$line" | awk '{print $7}')
        echo -e "\033[1;34m[$TIMESTAMP]\033[0m \033[1;32m$METHOD\033[0m $PATH"
        # Tampilkan raw byte tambahan jika ada
        echo "$line" | hexdump -C | head -n 5
        echo "---------------------------------------------------"
    fi
done

