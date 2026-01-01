#!/data/data/com.termux/files/usr/bin/bash

WORKDIR="$HOME/indienation-neurosphere"
PORT=9999
LOG_FLASK="$WORKDIR/flask.log"
LOG_TUNNEL="$WORKDIR/serveo.log"

echo "[1/5] Membersihkan proses lama..."
pkill -9 python3
pkill -9 ssh
rm -f $LOG_FLASK $LOG_TUNNEL

echo "[2/5] Menjalankan NeuroGateway..."
cd $WORKDIR
source ~/neuroenv/bin/activate
nohup python3 neuro_gateway.py > $LOG_FLASK 2>&1 &

echo "[3/5] Membuka tunnel Serveo..."
nohup ssh -R 80:localhost:$PORT serveo.net > $LOG_TUNNEL 2>&1 &

echo "[4/5] Menunggu link publik Serveo..."
LINK=""
while [ -z "$LINK" ]; do
    LINK=$(grep -o 'https://.*\.serveousercontent\.com' $LOG_TUNNEL | head -n 1)
    sleep 2
done

echo "=============================================="
echo "🌍 LINK PUBLISH: $LINK"
echo "👤 OWNER: Bemmagz@gmail.com"
echo "=============================================="
echo "[5/5] NeuroGateway Online & Tunnel Serveo Aktif!"
echo "Pantau log Flask: tail -f $LOG_FLASK"
echo "Pantau log Tunnel: tail -f $LOG_TUNNEL"

