#!/data/data/com.termux/files/usr/bin/bash

# ====== Path dasar ======
WORKDIR="$HOME/indienation-neurosphere"
CERT_PATH="$WORKDIR/cert.pem"
LOG_CF="$WORKDIR/cloudflare.log"
TUNNEL_NAME="neuro-tunnel"

# ====== Step 1: Login Cloudflare jika perlu ======
if [ ! -f "$CERT_PATH" ]; then
    echo -e "\033[1;33m[INFO] Origin cert tidak ditemukan. Login ke Cloudflare...\033[0m"
    cloudflared tunnel login
    echo -e "\033[1;32m[INFO] Login selesai. Pastikan cert.pem tersimpan di $CERT_PATH\033[0m"
fi

# ====== Step 2: Set Environment Variable ======
export TUNNEL_ORIGIN_CERT="$CERT_PATH"
echo -e "\033[1;32m[INFO] TUNNEL_ORIGIN_CERT = $TUNNEL_ORIGIN_CERT\033[0m"

# ====== Step 3: Jalankan Tunnel ======
echo -e "\033[1;33m[INFO] Menjalankan Cloudflare Tunnel: $TUNNEL_NAME ...\033[0m"
nohup cloudflared tunnel run "$TUNNEL_NAME" > "$LOG_CF" 2>&1 &
CF_PID=$!
sleep 3

# ====== Step 4: Tunggu link tunnel aktif ======
LINK=""
echo -e "\033[1;33m[INFO] Menunggu Cloudflare Tunnel aktif...\033[0m"
while [ -z "$LINK" ]; do
    LINK=$(grep -o 'https://[-0-9a-z]*\.trycloudflare.com' "$LOG_CF" | head -n 1)
    sleep 2
done

echo -e "\033[1;32m[OK] Tunnel aktif: \033[1;34m$LINK\033[0m"
echo -e "\033[1;32m[INFO] Tunnel PID: $CF_PID\033[0m"
