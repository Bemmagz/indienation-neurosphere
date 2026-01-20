#!/bin/bash
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; CYAN='\033[0;36m'; NC='\033[0m'

show_menu() {
    clear
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗"
    echo -e "║              NEUROSPHERE COMMAND CENTER v2.8                 ║"
    echo -e "║           LUV Distribution & E-Kindness Relay               ║"
    echo -e "╠══════════════════════════════════════════════════════════════╣"
    echo -e "${NC}║  1. 🚀  Initialize System     6. 🎨  Mint NFT-TM             ║"
    echo -e "║  2. 🧪  Ultra-Fast Engine     7. 📂  View Collection         ║"
    echo -e "║  3. ⚡  Quick Test            8. ✨  Evolve NFT Identity     ║"
    echo -e "║  4. 📊  Dashboard             9. ❤️   LUV Kindness Relay      ║"
    echo -e "║  5. 🔍  Forensic Log         10. 🧹  Purge All Data          ║"
    echo -e "║                          11. ❌  Exit                        ║"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
}

while true; do
    show_menu
    read -p "Select option (1-11): " opt
    case $opt in
        1) python3 core/engine.py ;;
        2) python3 neurosphere_engine_fast.py ;;
        3) python3 core/quick_test.py ;;
        4) python3 sovereign_dashboard.py ;;
        5) ls -t logs/*.json 2>/dev/null | head -1 | xargs cat || echo "No logs found." ;;
        6) python3 core/mint_nft.py ;; # FIXED: Memanggil Minting Engine
        7) 
            echo -e "\n${CYAN}📂 NFT-TM COLLECTION${NC}"
            if [ -z "$(ls -A vault/nfts/*.json 2>/dev/null)" ]; then
                echo "Vault is empty. Mint an NFT first (Option 6)."
            else
                for file in vault/nfts/*.json; do
                    ID=$(grep -o '"nft_id": "[^"]*' "$file" | cut -d'"' -f4)
                    LUV=$(grep -o '"luv_social": [0-9]*' "$file" | cut -d' ' -f2)
                    STAGE=$(grep -o '"stage": "[^"]*' "$file" | cut -d'"' -f4)
                    echo -e "${GREEN}ID: $ID | LUV: $LUV | Stage: $STAGE${NC}"
                    python3 core/evolution_engine.py qr "$ID"
                done
            fi
            ;;
        8)
            latest_nft=$(ls -t vault/nfts/*.json 2>/dev/null | head -1 | xargs basename 2>/dev/null)
            if [ -z "$latest_nft" ]; then echo "No NFT to evolve."; else python3 core/evolution_engine.py evolve "$latest_nft"; fi
            ;;
        9)
            latest_nft=$(ls -t vault/nfts/*.json 2>/dev/null | head -1 | xargs basename -s .json 2>/dev/null)
            if [ -z "$latest_nft" ]; then echo "No NFT for relay."; else python3 core/luv_relay.py "$latest_nft"; fi
            ;;
        10) 
            read -p "Purge all? (y/N): " confirm
            [[ "$confirm" == "y" ]] && rm -rf logs/*.json fast_forensic/*.json vault/nfts/*.json && echo "Cleaned."
            ;;
        11) exit 0 ;;
        *) echo "Invalid option." ; sleep 1 ;;
    esac
    echo ""
    read -p "Press Enter to return..."
done
