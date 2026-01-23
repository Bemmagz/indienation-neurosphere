#!/bin/bash
# neuro_cli.sh - NeuroSphere Command Line Interface

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Banner
show_banner() {
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
}

# Main menu
main_menu() {
    while true; do
        show_banner
        
        echo -e "${YELLOW}╔══════════════════════════════════════════════════════════╗${NC}"
        echo -e "${YELLOW}║                    MENU UTAMA                           ║${NC}"
        echo -e "${YELLOW}╚══════════════════════════════════════════════════════════╝${NC}"
        echo ""
        echo -e "${GREEN}[1]${NC} 🚀 Generate Full Report"
        echo -e "${GREEN}[2]${NC} 👑 Check Founder Status"
        echo -e "${GREEN}[3]${NC} 📊 Check Total Claims"
        echo -e "${GREEN}[4]${NC} 🔗 Test Database Connection"
        echo -e "${GREEN}[5]${NC} 📋 View Program Details"
        echo -e "${GREEN}[6]${NC} ⚙️  Edit Configuration"
        echo -e "${GREEN}[7]${NC} 🛠️  Setup Instructions"
        echo -e "${GREEN}[8]${NC} ❌ Exit"
        echo ""
        echo -e "${BLUE}══════════════════════════════════════════════════════════${NC}"
        
        read -p "Pilih opsi (1-8): " choice
        echo ""
        
        case $choice in
            1)
                echo -e "${MAGENTA}Generating Full Report...${NC}"
                python monitor_tm.py
                echo ""
                read -p "Press Enter to continue..."
                ;;
            2)
                echo -e "${MAGENTA}Checking Founder NFT TM Status...${NC}"
                python -c "
import sys
sys.path.append('.')
from monitor_tm import check_founder_tm
check_founder_tm()
"
                echo ""
                read -p "Press Enter to continue..."
                ;;
            3)
                echo -e "${MAGENTA}Checking Total Claims...${NC}"
                python -c "
import sys
sys.path.append('.')
from monitor_tm import check_total_claims
check_total_claims()
"
                echo ""
                read -p "Press Enter to continue..."
                ;;
            4)
                echo -e "${MAGENTA}Testing Database Connection...${NC}"
                python -c "
import sys
sys.path.append('.')
from monitor_tm import check_connection
check_connection()
"
                echo ""
                read -p "Press Enter to continue..."
                ;;
            5)
                echo -e "${MAGENTA}Showing Program Details...${NC}"
                python -c "
import sys
sys.path.append('.')
from monitor_tm import show_program_details
show_program_details()
"
                echo ""
                read -p "Press Enter to continue..."
                ;;
            6)
                echo -e "${MAGENTA}Editing Configuration...${NC}"
                if [ -f "config_neurosphere.py" ]; then
                    nano config_neurosphere.py
                    echo -e "${GREEN}Configuration updated!${NC}"
                else
                    echo -e "${RED}Configuration file not found!${NC}"
                    echo "Creating default config..."
                    cat > config_neurosphere.py << 'CONFIGEOF'
# config_neurosphere.py
SUPABASE_CONFIG = {
    "project_id": "your-project-id-here",
    "anon_key": "your-anon-key-here",
}
SB_URL = f"https://{SUPABASE_CONFIG['project_id']}.supabase.co/rest/v1"
HEADERS = {
    "apikey": SUPABASE_CONFIG['anon_key'],
    "Authorization": f"Bearer {SUPABASE_CONFIG['anon_key']}",
}
KINDNESS_CONFIG = {
    "launch_date": "2026-02-01",
    "target_recipients": 2000000,
    "reward_per_person": 100000,
    "total_value": 200000000000000,
    "program_name": "Keys of Kindness Estafet"
}
DEMO_MODE = True
CONFIGEOF
                    echo -e "${GREEN}Default config created. Please edit it.${NC}"
                fi
                sleep 2
                ;;
            7)
                echo -e "${MAGENTA}Setup Instructions:${NC}"
                echo "================================"
                echo "1. Edit config_neurosphere.py:"
                echo "   - Set your Supabase project_id"
                echo "   - Set your Supabase anon_key"
                echo "   - Set DEMO_MODE = False"
                echo ""
                echo "2. Install required packages:"
                echo "   pip install requests"
                echo ""
                echo "3. Run the monitor:"
                echo "   python monitor_tm.py"
                echo "   or"
                echo "   ./neuro_cli.sh"
                echo ""
                echo "4. For Supabase setup:"
                echo "   - Create project at supabase.com"
                echo "   - Create table 'tm_identity'"
                echo "   - Get API keys from Settings → API"
                echo ""
                read -p "Press Enter to continue..."
                ;;
            8)
                echo -e "${GREEN}Thank you for using NeuroSphere Monitor!${NC}"
                echo "Goodbye! 👋"
                exit 0
                ;;
            *)
                echo -e "${RED}Pilihan tidak valid!${NC}"
                sleep 2
                ;;
        esac
    done
}

# Check requirements
check_requirements() {
    echo -e "${BLUE}Checking requirements...${NC}"
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        echo -e "${RED}Python3 not found!${NC}"
        echo "Installing Python3..."
        pkg install python -y
    fi
    
    # Check requests package
    python3 -c "import requests" 2>/dev/null
    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}Installing requests package...${NC}"
        pip install requests
    fi
    
    # Check config file
    if [ ! -f "config_neurosphere.py" ]; then
        echo -e "${YELLOW}Creating default configuration...${NC}"
        cat > config_neurosphere.py << 'CONFIGEOF'
# config_neurosphere.py
SUPABASE_CONFIG = {
    "project_id": "your-project-id-here",
    "anon_key": "your-anon-key-here",
}
SB_URL = f"https://{SUPABASE_CONFIG['project_id']}.supabase.co/rest/v1"
HEADERS = {
    "apikey": SUPABASE_CONFIG['anon_key'],
    "Authorization": f"Bearer {SUPABASE_CONFIG['anon_key']}",
}
KINDNESS_CONFIG = {
    "launch_date": "2026-02-01",
    "target_recipients": 2000000,
    "reward_per_person": 100000,
    "total_value": 200000000000000,
    "program_name": "Keys of Kindness Estafet"
}
DEMO_MODE = True
CONFIGEOF
        echo -e "${GREEN}Default config created. Please edit it.${NC}"
        sleep 2
    fi
    
    echo -e "${GREEN}Requirements check complete!${NC}"
    sleep 1
}

# Main
echo -e "${CYAN}Starting NeuroSphere Monitor...${NC}"
check_requirements
chmod +x neuro_cli.sh 2>/dev/null
main_menu
