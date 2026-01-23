#!/bin/bash

# Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
BLUE='\033[0;34m'
NC='\033[0m'

# Typewriter effect
type_text() {
    text="$1"
    delay="$2"
    for (( i=0; i<${#text}; i++ )); do
        echo -n "${text:$i:1}"
        sleep $delay
    done
    echo ""
}

clear
echo -e "${CYAN}"
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║   🧠   N E U R O S P H E R E   M O N I T O R            ║"
echo "║                                                          ║"
echo "║   🔑   Keys of Kindness Estafet                         ║"
echo "║   📅   Launch: 1 February 2026                          ║"
echo "║   💰   2M × €100,000 = €200 Trillion                    ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

sleep 1
echo -e "${YELLOW}[SYSTEM] Connecting to NeuroSphere Core...${NC}"
sleep 0.5
echo -e "${GREEN}[OK] Verified by Neurolang Engine${NC}"
echo -e "${GREEN}[OK] Stable Coin IND-EUR Linked${NC}"
sleep 1

echo -e "\n${MAGENTA}--- FOUNDER NFT TM STATUS (SIMULATED) ---${NC}"
type_text "Identity ID  : NS-FOUNDER-001" 0.05
type_text "ENPE (Native): 100,000,000,000,000 E-Coin" 0.05
type_text "LUV (Social) : 1,000,000,000,000 LUV" 0.05
type_text "Status       : LOCKED (3 Years)" 0.05

echo -e "\n${BLUE}--- GLOBAL ADOPTION TRACKER ---${NC}"
type_text "Total Claims : 1,240,582 Users" 0.05
type_text "Daily Relay  : 0.85% Activity" 0.05
type_text "Next Epoch   : 24h 12m 04s" 0.05

echo -e "\n${CYAN}============================================================${NC}"
echo -e "🙏 Biarlah kita bisa bermanfaat bagi semua makhluk"
echo -e "   & bukan malahan merugikan pihak lain"
echo -e "${CYAN}============================================================${NC}"
