#!/data/data/com.termux/files/usr/bin/bash

### ====== 0. Setup ======
WORKDIR="$HOME/indienation-neurosphere"
LOG_CF="$WORKDIR/cloudflare.log"
LOG_FLASK="$WORKDIR/flask_error.log"
SIMULATE_SCRIPT="$WORKDIR/simulate_traffic.sh"
PORT=9999

echo -e "\033[1;32m[STEP 0] Verifikasi Environment & Directory\033[0m"
cd "$WORKDIR" || { echo "[FATAL] Direktori $WORKDIR tidak ada"; exit 1; }
source ~/neuroenv/bin/activate
echo -e "[OK] Environment aktif: $VIRTUAL_ENV"
echo -e "[OK] Direktori kerja: $(pwd)"

### ====== 1. Bersihkan proses lama ======
echo -e "\033[1;32m[STEP 1] Bersihkan proses lama\033[0m"
pkill -9 python3 2>/dev/null
pkill -9 cloudflared 2>/dev/null
sleep 1
echo "[OK] Proses lama dibersihkan"

### ====== 2. Jalankan NeuroGateway (Flask) ======
echo -e "\033[1;32m[STEP 2] Jalankan NeuroGateway (Flask)\033[0m"
nohup python3 "$WORKDIR/neuro_gateway.py" > "$LOG_FLASK" 2>&1 &
FLASK_PID=$!
sleep 2
ps -p $FLASK_PID >/dev/null || { echo "[FATAL] Flask gagal start"; exit 1; }
echo "[OK] Flask RUNNING (PID $FLASK_PID)"

### ====== 3. Jalankan Cloudflare Tunnel ======
echo -e "\033[1;32m[STEP 3] Jalankan Cloudflare Tunnel\033[0m"
# Pastikan login sudah dilakukan: cloudflared login
nohup cloudflared tunnel --url http://127.0.0.1:$PORT --no-autoupdate > "$LOG_CF" 2>&1 &
CF_PID=$!
sleep 2

# Tunggu tunnel muncul
LINK=""
echo "[INFO] Menunggu Cloudflare Tunnel aktif..."
while [ -z "$LINK" ]; do
    LINK=$(grep -o 'https://[-0-9a-z]*\.trycloudflare.com' "$LOG_CF" | head -n 1)
    sleep 2
done
echo -e "[OK] Tunnel aktif: \033[1;34m$LINK\033[0m"

### ====== 4. Tampilkan Dashboard Awal ======
echo -e "\033[1;32m===============================================================\033[0m"
echo -e "GATEWAY LINK : \033[1;34m$LINK\033[0m"
echo -e "GITHUB SYNC  : \033[1;32m[ CONNECTED ]\033[0m main -> main"
echo -e "TOKENOMICS   : \033[1;32m[ LOCKED ]\033[0m 15% Donation Pool OPEN"
echo -e "DATA FOLDER  : $WORKDIR/DATA_PENDAFTAR_ASLI"
echo -e "\033[1;32m===============================================================\033[0m"

echo -e "\033[1;33mDASHBOARD AKTIVITAS (Menunggu Klaim...)\033[0m"
echo -e "\033[1;30m(Tekan CTRL+C untuk keluar monitoring)\033[0m"

### ====== 5. Monitoring traffic byte-per-byte ======
tail -F "$LOG_CF" | while IFS= read -r line; do
    TIMESTAMP=$(date +"%Y-%m-%dT%H:%M:%S")
    if echo "$line" | grep -E "GET |POST "; then
        METHOD=$(echo "$line" | awk '{print $6}')
        PATH=$(echo "$line" | awk '{print $7}')
        echo -e "\033[1;34m[$TIMESTAMP]\033[0m \033[1;32m$METHOD\033[0m $PATH"
        echo "$line" | hexdump -C | head -n 5
        echo "---------------------------------------------------"
    fi
done &

### ====== 6. Simulasi traffic opsional ======
cat << 'EOF' > "$SIMULATE_SCRIPT"
#!/data/data/com.termux/files/usr/bin/bash
TARGET_PORT=9999
TARGET_HOST=127.0.0.1
while true; do
    TIMESTAMP=$(date +"%Y-%m-%dT%H:%M:%S")
    echo -e "GET /simulate?time=$TIMESTAMP HTTP/1.1\r\nHost: localhost\r\n\r\n" | nc $TARGET_HOST $TARGET_PORT
    echo -e "\033[1;33m[SIMULATE] GET request @ $TIMESTAMP\033[0m"
    sleep 1
done
EOF

chmod +x "$SIMULATE_SCRIPT"
nohup "$SIMULATE_SCRIPT" > /dev/null 2>&1 &

echo -e "\033[1;32m[INFO] NeuroSphere environment is LIVE and monitoring...\033[0m"
