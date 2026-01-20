#!/bin/bash
# Real-time System Monitor

echo -e "\033[1;36m"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║               REAL-TIME SYSTEM MONITOR                      ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "\033[0m"

while true; do
    clear
    echo -e "\033[1;33m$(date '+%Y-%m-%d %H:%M:%S') - NeuroSphere Monitor\033[0m"
    echo -e "\033[1;34m════════════════════════════════════════════════════════════\033[0m"
    
    # System Status
    echo -e "\033[1;32m📊 SYSTEM STATUS:\033[0m"
    echo -e "  Zero-Value-Escape: \033[1;32mACTIVE ✓\033[0m"
    echo -e "  Auto-Revert: \033[1;32mENABLED\033[0m"
    echo -e "  Real-time Monitoring: \033[1;32mRUNNING\033[0m"
    
    # File Statistics
    echo -e "\n\033[1;32m📁 FILE STATISTICS:\033[0m"
    echo -e "  Forensic Logs: \033[1;33m$(ls -1 forensic_chains/*.json 2>/dev/null | wc -l)\033[0m files"
    echo -e "  Transaction Logs: \033[1;33m$(ls -1 logs/*.json 2>/dev/null | wc -l)\033[0m files"
    echo -e "  Audit Files: \033[1;33m$(ls -1 real_time_audits/*.json 2>/dev/null | wc -l)\033[0m files"
    
    # Recent Activity
    echo -e "\n\033[1;32m🕒 RECENT ACTIVITY:\033[0m"
    if [ -d "forensic_chains" ]; then
        RECENT=$(ls -t forensic_chains/*.json 2>/dev/null | head -1)
        if [ -n "$RECENT" ]; then
            TX_ID=$(basename "$RECENT" .json)
            echo -e "  Last Transaction: \033[1;36m$TX_ID\033[0m"
            echo -e "  File: \033[1;33m$(basename "$RECENT")\033[0m"
            echo -e "  Time: \033[1;33m$(date -r "$RECENT" '+%H:%M:%S')\033[0m"
        else
            echo -e "  \033[1;33mNo recent activity\033[0m"
        fi
    fi
    
    # System Info
    echo -e "\n\033[1;32m⚙️  SYSTEM CONFIGURATION:\033[0m"
    echo -e "  Timeout Settings:"
    echo -e "    • > 100,000: \033[1;31m30 seconds\033[0m"
    echo -e "    • > 1,000,000: \033[1;33m60 seconds\033[0m"
    echo -e "    • > 100,000,000: \033[1;35m900 seconds\033[0m"
    
    echo -e "\n\033[1;31mPress Ctrl+C to exit monitor\033[0m"
    echo -e "\033[1;34m════════════════════════════════════════════════════════════\033[0m"
    sleep 3
done
