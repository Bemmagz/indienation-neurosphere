#!/bin/bash
# ========================================================
# NEUROSPHERE ALL-IN-ONE AGENT (BASH FRIENDLY)
# Combine: Fix Path, Auto-Sync, and Dashboard
# ========================================================

# --- Parameter Warna ---
G1='\033[38;5;46m'; R1='\033[38;5;196m'; Y1='\033[38;5;226m'; B1='\033[38;5;39m'; NC='\033[0m'

echo -e "${B1}>>> RECONFIGURING NEUROSPHERE INFRASTRUCTURE...${NC}"

# 1. FIX PATH & VERCEL CONFIG (Penyelesaian Masalah 404 & ENOENT)
echo -e "${Y1}[1/3] Aligning Vercel & Root Path...${NC}"
cat << 'V_EOF' > vercel.json
{
  "version": 2,
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
V_EOF

# 2. GENERATE GENESIS LEDGER (Jika belum ada)
mkdir -p core/mathematics_vault
if [ ! -s "core/mathematics_vault/ledger.jsonl" ]; then
    echo '{"user_id":"NeuroID#001","karma":200,"desc":"Genesis Block","sig":"initial_sig","ts":'$(date +%s)'}' > core/mathematics_vault/ledger.jsonl
    echo -e "${G1}Ledger Genesis Created. ✅${NC}"
fi

# 3. BACKGROUND SYNC AGENT (PID Generator)
# Mematikan agen lama jika ada untuk menghindari duplikasi
pkill -f auto-sync-engineer 2>/dev/null

cat << 'S_EOF' > scripts/auto-sync-engineer.sh
#!/bin/bash
LEDGER="core/mathematics_vault/ledger.jsonl"
LAST_HASH=$(md5sum $LEDGER)
while true; do
    CURRENT_HASH=$(md5sum $LEDGER)
    if [ "$CURRENT_HASH" != "$LAST_HASH" ]; then
        git add .
        git commit -m "AI-Guard: Automated Infrastructure Sync ($(date +%T))"
        git push origin main
        LAST_HASH=$CURRENT_HASH
    fi
    sleep 30
done
S_EOF
chmod +x scripts/auto-sync-engineer.sh
nohup ./scripts/auto-sync-engineer.sh > $HOME/.neurosphere/sync.log 2>&1 &

# 4. LAUNCH TERMINAL DASHBOARD
echo -e "${G1}[3/3] Infrastructure Re-aligned. Launching Dashboard...${NC}"
sleep 2

./scripts/ai-dashboard.sh
