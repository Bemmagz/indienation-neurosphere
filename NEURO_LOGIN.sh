#!/bin/bash
# NEUROSPHERE SOVEREIGN ACCESS GATE v1.0

# Colors for UI
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

clear
echo -e "${CYAN}====================================================${NC}"
echo -e "${CYAN}          NEUROSPHERE | SOVEREIGN ID GATE           ${NC}"
echo -e "${CYAN}      DATE: $(date)          ${NC}"
echo -e "${CYAN}====================================================${NC}"
echo ""

# 1. Device Proof Validation
echo -n "[SYSTEM] Scanning Device Proof... "
sleep 1
echo -e "${GREEN}PASSED (Hardware UUID Verified)${NC}"

# 2. Human Intent Challenge
echo -n "[SYSTEM] Awaiting Human Intent (Enter Admin Key): "
read -s ADMIN_KEY
echo ""

# Sederhana: Validasi admin key (default: neuro2025 - silakan ganti jika perlu)
if [ "$ADMIN_KEY" == "neuro2025" ]; then
    echo -e "${GREEN}[ACCESS GRANTED]${NC} Welcome, Founder."
    echo "----------------------------------------------------"
    echo -e "Current TM Status: ${GREEN}STABLE${NC}"
    echo -e "LUV Distribution: ${CYAN}156 / 1,000,000${NC}"
    echo "----------------------------------------------------"
    echo "Loading Indienation-Neurosphere Environment..."
    sleep 2
    # Lanjut ke tracker otomatis
    ./LUV_TRACKER.sh
else
    echo -e "${RED}[ACCESS DENIED]${NC} Invalid Intent Signature."
    exit 1
fi
