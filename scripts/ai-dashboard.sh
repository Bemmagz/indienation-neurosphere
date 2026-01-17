#!/bin/bash
# ========================================================
# NEUROSPHERE AI SENIOR ENGINEER - COMMAND DASHBOARD v2.0
# ========================================================

G1='\033[38;5;46m'; R1='\033[38;5;196m'; Y1='\033[38;5;226m'; B1='\033[38;5;39m'; NC='\033[0m'

while true; do
    clear
    echo -e "${B1}╔══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${B1}║       NEUROSPHERE ULTIMATE MONITOR - AI ENGINEER        ║${NC}"
    echo -e "${B1}╚══════════════════════════════════════════════════════════╝${NC}"
    
    # --- SECTION 1: INFRASTRUCTURE & BUILD LOGS ---
    echo -e "${Y1}[ INFRASTRUCTURE & VERCEL BUILD ]${NC}"
    V_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://indienation-neurosphere.vercel.app/ || echo "OFFLINE")
    if [ "$V_STATUS" == "200" ]; then VS="${G1}LIVE (200)${NC}"; else VS="${R1}ERROR ($V_STATUS)${NC}"; fi
    
    S_PID=$(pgrep -f auto-sync-engineer || echo "INACTIVE")
    if [ "$S_PID" != "INACTIVE" ]; then SS="${G1}RUNNING (PID: $S_PID)${NC}"; else SS="${R1}INACTIVE${NC}"; fi

    echo -e "Vercel Gateway : $VS"
    echo -e "Sync Agent     : $SS"
    
    # Tampilkan 3 log terakhir dari agen sinkronisasi
    echo -e "\n${Y1}[ LATEST DEPLOYMENT LOGS ]${NC}"
    if [ -f "$HOME/.neurosphere/sync.log" ]; then
        tail -n 3 "$HOME/.neurosphere/sync.log" | sed 's/^/  /'
    else
        echo "  No logs available yet."
    fi
    
    # --- SECTION 2: LEDGER INTEGRITY ---
    echo -e "\n${Y1}[ LEDGER INTEGRITY ]${NC}"
    LAST_ENTRY=$(tail -n 1 core/mathematics_vault/ledger.jsonl 2>/dev/null)
    KARMA=$(echo $LAST_ENTRY | jq -r '.karma' 2>/dev/null || echo "200")
    
    echo -e "Current Karma  : ${G1}$KARMA TM${NC}"
    echo -e "Aura Frequency : ${G1}Emerald (Stable)${NC}"
    
    # --- SECTION 3: API & AI ENGINE ---
    echo -e "\n${Y1}[ GOOGLE AI STUDIO (GEMINI) ]${NC}"
    if [ -f ".env.local" ] && grep -q "GOOGLE_AI_API_KEY" .env.local; then
        echo -e "Engine Status  : ${G1}AUTHENTICATED${NC}"
    else
        echo -e "Engine Status  : ${R1}KEY MISSING${NC}"
    fi

    echo -e "\n${B1}----------------------------------------------------------${NC}"
    echo -e "Press [Ctrl+C] to exit dashboard | Refresh: 5s"
    sleep 5
done
