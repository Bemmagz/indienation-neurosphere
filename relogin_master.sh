#!/bin/bash
# =========================================
# NEUROSPHERE RELAUNCH & LOGIN MASTER SCRIPT
# Founder Authorized
# =========================================

NEURO_DIR=~/indienation-neurosphere
STATE_FILE="$NEURO_DIR/state/genesis.json"

echo "=== [1] Pastikan folder state & genesis.json ==="
mkdir -p $NEURO_DIR/state
if [ -f "$STATE_FILE" ]; then
    echo "[OK] Genesis file exists:"
    cat $STATE_FILE
else
    echo '[WARN] Genesis file missing. Membuat baru...'
    echo '{"status": "INITIALIZING", "timestamp": "'"$(date +%F_%T)"'"}' > $STATE_FILE
fi
echo "--------------------------------------------------"

echo "=== [2] Validasi status sistem & identitas Founder ==="
python3 $NEURO_DIR/scripts/check_status.py
echo "--------------------------------------------------"

echo "=== [3] Validasi SSH & GitHub Sinkron ==="
ssh -T git@github.com
echo "--------------------------------------------------"

echo "=== [4] Generate QR Token untuk login ==="
if [ -f "$NEURO_DIR/scripts/qr_generator.py" ]; then
    python3 $NEURO_DIR/scripts/qr_generator.py
else
    echo "[WARN] qr_generator.py tidak ditemukan!"
fi
echo "--------------------------------------------------"

echo "=== [5] Sinkronisasi Aura / LUV (LVI) ==="
if [ -f "$NEURO_DIR/scripts/aura_evolution.py" ]; then
    python3 $NEURO_DIR/scripts/aura_evolution.py
fi
if [ -f "$NEURO_DIR/scripts/value_bridge.py" ]; then
    python3 $NEURO_DIR/scripts/value_bridge.py
fi
echo "--------------------------------------------------"

echo "=== [6] Pindai identitas klien & validasi kedaulatan ==="
if [ -f "$NEURO_DIR/scripts/sovereign_scanner.py" ]; then
    python3 $NEURO_DIR/scripts/sovereign_scanner.py
fi
echo "--------------------------------------------------"

echo "=== [7] Jalankan health check & disaster pool ==="
for script in daily_health_check.py sector_15_donation.py; do
    if [ -f "$NEURO_DIR/scripts/$script" ]; then
        python3 $NEURO_DIR/scripts/$script
    fi
done
echo "--------------------------------------------------"

echo "=== [8] Tampilkan database & state terkini ==="
ls $NEURO_DIR/database/
cat $NEURO_DIR/database/state_current.json 2>/dev/null || echo "[WARN] state_current.json tidak ditemukan"
echo "--------------------------------------------------"

echo "=== [SUCCESS] Semua pengecekan selesai. Sistem siap untuk klien login ==="
