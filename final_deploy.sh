#!/data/data/com.termux/files/usr/bin/bash

WORKDIR="$HOME/indienation-neurosphere"
LOG_FLASK="$WORKDIR/flask.log"
LOG_TUNNEL="$WORKDIR/serveo.log"
DATABASE="$WORKDIR/DATA_PENDAFTAR_LUV.txt"

echo "================================================="
echo "⚡ DEPLOYING BEMMAGZ SOVEREIGN GATEWAY v2.0 ⚡"
echo "================================================="

# 1. Bersihkan proses lama
pkill -9 python3
pkill -9 ssh
mkdir -p $WORKDIR/templates
touch $DATABASE

# 2. Bangun Landing Page (Mandat 20 Des)
cat << 'HTML' > $WORKDIR/templates/index.html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Indienation Neurosphere | Bemmagz</title>
    <style>
        :root { --gold: #d4af37; --dark: #0a0a0a; --gray: #1a1a1a; --white: #e0e0e0; }
        body { background: var(--dark); color: var(--white); font-family: 'Courier New', monospace; margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; }
        .container { border: 2px solid var(--gold); padding: 2rem; border-radius: 15px; background: var(--gray); box-shadow: 0 0 30px rgba(212, 175, 55, 0.3); max-width: 90%; }
        h1 { color: var(--gold); letter-spacing: 5px; }
        .stats { display: flex; justify-content: space-around; margin: 2rem 0; border-top: 1px solid #333; border-bottom: 1px solid #333; padding: 1rem 0; }
        .val { display: block; font-size: 1.5rem; color: var(--gold); font-weight: bold; }
        .label { font-size: 0.7rem; text-transform: uppercase; opacity: 0.7; }
        .btn { background: var(--gold); color: black; border: none; padding: 1rem 2rem; font-weight: bold; cursor: pointer; text-decoration: none; border-radius: 5px; display: inline-block; }
        .lock-info { color: #ff4444; font-size: 0.7rem; margin-top: 1.5rem; }
    </style>
</head>
<body>
    <div class="container">
        <h1>INDIENATION</h1>
        <p>NEUROSPHERE GATEWAY [BEMMAGZ]</p>
        <div class="stats">
            <div><span class="val">100T</span><span class="label">Total ENPE</span></div>
            <div style="border-left: 1px solid #333; border-right: 1px solid #333; padding: 0 15px;">
                <span class="val">OPEN</span><span class="label">15% Donation Pool</span>
            </div>
            <div><span class="val">1M LUV</span><span class="label">Reward/Person</span></div>
        </div>
        <a href="/claim" class="btn">KLAIM 1 JUTA LUV</a>
        <div class="lock-info">MANDAT 20 DESEMBER: ASSETS LOCKED 2-3 YEARS</div>
    </div>
</body>
</html>
HTML

# 3. Bangun NeuroGateway dengan Logika Pencatatan
cat << 'PY' > $WORKDIR/neuro_gateway.py
from flask import Flask, render_template, request
from datetime import datetime
import os

app = Flask(__name__)
DB_PATH = os.path.join(os.path.dirname(__file__), 'DATA_PENDAFTAR_LUV.txt')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/claim')
def claim():
    user_ip = request.remote_addr
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open(DB_PATH, 'a') as f:
        f.write(f"KLAIM: {timestamp} | IP: {user_ip} | Status: Mandat 20 Des Valid\n")
    return "<h1>Klaim Berhasil!</h1><p>Data Anda telah tercatat dalam sistem kedaulatan Bemmagz. Reward 1 Juta LUV akan segera diproses.</p><a href='/'>Kembali</a>"

if __name__ == "__main__":
    app.run(port=9999, host='0.0.0.0')
PY

# 4. Eksekusi
echo "[1/3] Menyalakan NeuroGateway..."
nohup python3 $WORKDIR/neuro_gateway.py > $LOG_FLASK 2>&1 &
echo "[2/3] Membuka Tunnel Publik..."
nohup ssh -o StrictHostKeyChecking=no -R 80:localhost:9999 serveo.net > $LOG_TUNNEL 2>&1 &

echo "[3/3] Menghubungkan ke Kedaulatan..."
sleep 10
LINK=$(grep -o 'https://[-0-9a-z]*\.serveousercontent.com' $LOG_TUNNEL | head -n 1)

echo "================================================="
echo "🌍 LIVE LINK: $LINK"
echo "👤 OWNER: Bemmagz@gmail.com"
echo "📊 MONITOR KLAIM: tail -f $DATABASE"
echo "================================================="
