#!/bin/bash
clear
# Jalankan Pulse di awal agar status Fresh
./pulse_supabase.sh
echo ""

G='\033[0;32m'
B='\033[0;34m'
P='\033[0;35m'
R='\033[0;31m'
NC='\033[0m'

echo -e "${P}====================================================${NC}"
echo -e "${P}       NEUROSPHERE ULTIMATE DASHBOARD (TUI)         ${NC}"
echo -e "${P}====================================================${NC}"
echo -e " Founder: ${G}INDIE-Founder${NC} | AI Guard: ${G}ACTIVE${NC}"
echo -e " Storage: ${B}$(du -sh . | cut -f1)${NC} / 10GB | Data Limit: ${R}100M${NC}"
echo -e "----------------------------------------------------"

echo -e "${B}[1] TECHNOLOGY MONEY (TM) STATUS${NC}"
echo -e "  - ENPE (E Coin)    : 100T [20% Staking]"
echo -e "  - LUV (Lovely)     : 100T [1% 1M People Pool]"
echo -e "  - IND-EUR (Stable) : €100,000 Anchor"
echo ""

echo -e "${G}[2] AURALANG INTERPRETER LOGS${NC}"
tail -n 2 neuro_monitor.aura | sed 's/^/  /'
echo ""

echo -e "${P}[3] INFRASTRUCTURE HEALTH${NC}"
echo -e "  - Supabase : ${G}CONNECTED${NC}"
echo -e "  - Vercel   : ${R}BUILD FAILED${NC}"
echo -e "  - GitHub   : ${G}SYNCED${NC}"
echo -e "----------------------------------------------------"
echo -e " Press [CTRL+C] to exit dashboard "
