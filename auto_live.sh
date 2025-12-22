#!/data/data/com.termux/files/usr/bin/bash

# 1. Konfigurasi Identitas Bemmagz
WORKDIR="$HOME/indienation-neurosphere"
PORT=9999
LOG_CF="$WORKDIR/cloudflare.log"
LOG_FLASK="$WORKDIR/flask.log"

echo "[1/6] Mengunci Jalur Kedaulatan Bemmagz..."
cd $WORKDIR
termux-wake-lock
pkill -9 python3
pkill -9 cloudflared

# 2. Perbaikan Git (Anti-403)
git remote set-url origin https://github.com/Bemmagz/indienation-neurosphere.git
git config --global user.email "Bemmagz@gmail.com"
git config --global user.name "Bemmagz"

# 3. Cek Sertifikat Cloudflare
if [ ! -f ~/.cloudflared/cert.pem ]; then
    echo "[!] Sertifikat tidak ditemukan. Silahkan login di browser yang akan terbuka..."
    cloudflared tunnel login
fi

# 4. Jalankan NeuroGateway (Flask)
echo "[2/6] Membangkitkan NeuroGateway..."
source ~/neuroenv/bin/activate
nohup python3 neuro_gateway.py > $LOG_FLASK 2>&1 &

# 5. Jalankan Cloudflare Tunnel
echo "[3/6] Membuka Terowongan Cloudflare..."
# Hapus tunnel lama jika ada agar tidak konflik
cloudflared tunnel delete neuro-tunnel > /dev/null 2>&1
cloudflared tunnel create neuro-tunnel > /dev/null 2>&1
nohup cloudflared tunnel run neuro-tunnel > $LOG_CF 2>&1 &

# 6. Tunggu Link Aktif
echo "[4/6] Menunggu Link Cloudflare Aktif..."
LINK=""
while [ -z "$LINK" ]; do
    LINK=$(grep -o 'https://[-0-9a-z]*\.trycloudflare.com' $LOG_CF | head -n 1)
    sleep 2
done

echo "==========================================="
echo "🌍 GATEWAY LIVE: $LINK"
echo "💰 MANDAT: 100T ENPE | 1% LUV Reward OPEN"
echo "🛡️ SECURITY: AI Bots Blocked | Bemmagz Auth"
echo "==========================================="

# 7. Push Otomatis ke GitHub
echo "[5/6] Sinkronisasi ke GitHub Bemmagz..."
git add .
git commit -m "Auto-Live: Mandat 20 Dec Secured & Tunnel Active"
git push origin main

echo "[6/6] MONITORING BYTES (CTRL+C untuk berhenti)"
tail -f $LOG_CF
