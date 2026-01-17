#!/bin/bash

# --- Color Definitions ---
GOLD='\033[1;33m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'
BOLD='\033[1m'

KARMA_FILE="/data/data/com.termux/files/home/indienation-neurosphere/state/karma.jsonl"
USER_ID="NeuroID#001"

# --- Logic: Fetch Data ---
POINTS=0
if [[ -f "$KARMA_FILE" ]]; then
    POINTS=$(jq -s 'map(.points) | add' "$KARMA_FILE")
fi

# --- Aura Determination ---
if [ "$POINTS" -gt 50 ]; then
    AURA_STATUS="GOLDEN RADIANCE"
    AURA_COLOR=$GOLD
    AVATAR="[ ✧ CORE RADIANT ✧ ]"
else
    AURA_STATUS="CYAN STEADY"
    AURA_COLOR=$CYAN
    AVATAR="[ ◈ NODE INITIATE ◈ ]"
fi

# --- Render ID Card ---
echo -e "${AURA_COLOR}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓${NC}"
echo -e "${AURA_COLOR}┃${NC}  ${BOLD}NEUROSPHERE SOVEREIGN IDENTITY CARD${NC}          ${AURA_COLOR}┃${NC}"
echo -e "${AURA_COLOR}┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫${NC}"
echo -e "${AURA_COLOR}┃${NC}  ${AVATAR}                      ${AURA_COLOR}┃${NC}"
echo -e "${AURA_COLOR}┃${NC}  ID     : ${BOLD}${USER_ID}${NC}                           ${AURA_COLOR}┃${NC}"
echo -e "${AURA_COLOR}┃${NC}  STATUS : ${AURA_COLOR}${AURA_STATUS}${NC}                      ${AURA_COLOR}┃${NC}"
echo -e "${AURA_COLOR}┃${NC}  KARMA  : ${GREEN}${POINTS} Pts${NC}                               ${AURA_COLOR}┃${NC}"
echo -e "${AURA_COLOR}┃${NC}  NODE   : ACTIVE (PORT 5002)                   ${AURA_COLOR}┃${NC}"
echo -e "${AURA_COLOR}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛${NC}"
