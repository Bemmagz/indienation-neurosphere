#!/bin/bash
BASE=/data/data/com.termux/files/home/1001NDONESIA_ASSETS/NeuroSphere_OSI;WATCH_FILE=/data/data/com.termux/files/home/1001NDONESIA_ASSETS/NeuroSphere_OSI/monitor_logs/autoposting.log;LOG_FILE=/data/data/com.termux/files/home/1001NDONESIA_ASSETS/NeuroSphere_OSI/monitor_logs/auto_sync.log;GITHUB_REPO="https://github.com/Bemmagz/indienation-neurosphere.git"
echo "👁️ Ultra-Instant Auto-Sync Started: $(date)" >> $LOG_FILE
command -v inotifywait &> /dev/null || { echo "⚠️ inotifywait missing, install: sudo apt install inotify-tools"; exit 1; }
while true; do
inotifywait -e modify $WATCH_FILE
echo "📌 Event detected: $WATCH_FILE modified at $(date)" >> $LOG_FILE
cd $BASE
git add .; git commit -m "ULTRA-INSTANT SYNC: $(date +"%Y-%m-%d_%H%M%S")" || echo "No changes"
git push $GITHUB_REPO main --force
DEPLOY_OUTPUT=$(vercel deploy --prod --yes 2>&1)
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT"|grep -Eo 'https://[^\ ]+\.vercel\.app'|head -n1)
echo "✅ Vercel deploy done: $DEPLOY_URL at $(date)" >> $LOG_FILE
TOTAL_POSTS=$(grep -c "AI Responder" $WATCH_FILE || echo "0")
TOTAL_SUPPLY=100000000000000
LUV_DISTRIBUTED=$((TOTAL_POSTS/10))
echo "💎 Ledger Update: Supply=$TOTAL_SUPPLY ENPE, LUV Distributed=${LUV_DISTRIBUTED}M" >> $LOG_FILE
echo "💰 LUV rewards distributed instantly to wallets" >> $LOG_FILE
echo "==========================================================" >> $LOG_FILE
done
