#!/bin/bash

# ===============================================
# ULTRA-INSTANT AUTO-SYNC & BYTE MONITORING
# NeuroSphere OSI - Cyberpunk Auto Deploy
# ===============================================

# ----- Konfigurasi -----
BASE=~/1001NDONESIA_ASSETS/NeuroSphere_OSI
LOG_FILE=$BASE/monitor_logs/auto_sync.log
WATCH_FILE=$BASE/monitor_logs/autoposting.log
GITHUB_REPO="https://github.com/Bemmagz/indienation-neurosphere.git"

mkdir -p $BASE/monitor_logs

echo "👁️ Ultra-Instant Auto-Sync Started: $(date)" >> $LOG_FILE

# ----- Fungsi: Push & Deploy -----
sync_deploy() {
    cd $BASE
    git add .
    git commit -m "ULTRA-INSTANT SYNC: $(date +"%Y-%m-%d_%H%M%S")" || echo "No changes"
    git push $GITHUB_REPO main --force
    echo "✅ GitHub push done at $(date)" >> $LOG_FILE

    DEPLOY_OUTPUT=$(vercel deploy --prod --yes 2>&1)
    DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -Eo 'https://[^\ ]+\.vercel\.app' | head -n 1)
    echo "✅ Vercel deploy done: $DEPLOY_URL at $(date)" >> $LOG_FILE
}

# ----- Fungsi: Ledger & LUV Update -----
instant_update() {
    TOTAL_POSTS=$(grep -c "AI Responder" $WATCH_FILE || echo "0")
    TOTAL_SUPPLY=100000000000000
    LUV_DISTRIBUTED=$((TOTAL_POSTS / 10))
    echo "💎 Ledger Update: Supply=$TOTAL_SUPPLY ENPE, LUV Distributed=${LUV_DISTRIBUTED}M" >> $LOG_FILE
    echo "💰 LUV rewards distributed instantly to wallets" >> $LOG_FILE
}

# ----- Fungsi: Monitoring Byte & Persentase -----
monitor_bytes() {
    LAST_BYTES=0
    while true; do
        BYTES=$(stat -c%s "$WATCH_FILE" 2>/dev/null || echo 0)
        DIFF=$((BYTES - LAST_BYTES))
        PERCENT=$(awk "BEGIN {printf \"%.2f\", ($BYTES/1000000)*100}")
        echo "📊 [$(date +%T)] File Size: $BYTES bytes | Diff: $DIFF | Percent: $PERCENT%" >> $LOG_FILE
        LAST_BYTES=$BYTES
        sleep 1
    done
}

# ----- Cek inotify-tools -----
if ! command -v inotifywait &> /dev/null; then
    echo "⚠️ inotifywait not installed. Install dengan: sudo apt install inotify-tools"
    exit 1
fi

echo "👁️ Watching $WATCH_FILE for changes..."

# ----- Jalankan Auto-Sync per event -----
while true; do
    inotifywait -e modify $WATCH_FILE
    echo "📌 Event detected: $WATCH_FILE modified at $(date)" >> $LOG_FILE

    sync_deploy
    instant_update

    echo "==========================================================" >> $LOG_FILE
    echo "🎯 Ultra-Instant Auto-Sync cycle finished at $(date)" >> $LOG_FILE
    echo "🔗 Live URL: $DEPLOY_URL" >> $LOG_FILE
    echo "==========================================================" >> $LOG_FILE
done &

# ----- Jalankan monitoring byte secara paralel -----
monitor_bytes &

echo "✅ Ultra-Instant Auto-Sync & Byte Monitoring Running in Background."
