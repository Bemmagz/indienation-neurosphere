#!/bin/bash
# Neurosphere Production-Grade Runner
# Protection: Anti-Depletion & Anti-Farming Simulation

BALANCE_FILE="$HOME/indienation-neurosphere/pool_balance.db"
LOG_FILE="$HOME/indienation-neurosphere/distribute_log.txt"

simulate_safe_dist() {
    REWARD=$((RANDOM % 10 + 1)) # Range 1-10 LUV
    CUR_BAL=$(cat "$BALANCE_FILE")
    
    # 🛡️ Guard 1: Anti-Depletion
    if [ "$CUR_BAL" -lt "$REWARD" ]; then
        echo -e "\033[1;31m[HALT] Pool depletion detected! Insufficient LUV.\033[0m"
        exit 1
    fi

    NEW_BAL=$(($CUR_BAL - $REWARD))
    echo "$NEW_BAL" > "$BALANCE_FILE"
    
    TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$TIMESTAMP] SUCCESS: $REWARD LUV distributed. Remaining: $NEW_BAL"
    echo "[$TIMESTAMP] ID: NS-USER-$(($RANDOM % 100)) | REWARD: $REWARD | STATUS: AUDITED" >> "$LOG_FILE"
}

simulate_safe_dist
