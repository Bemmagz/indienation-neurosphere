#!/bin/bash
# NeuroSphere Founder Dashboard - Terminal UI
clear
echo "========================================================="
echo "        ◈ NEUROSPHERE FOUNDER COMMAND CENTER ◈          "
echo "========================================================="
echo " DATE: $(date +'%d-%m-%Y') | SYSTEM: STABLE"
echo "---------------------------------------------------------"
echo " [IDENTITY STATUS]"
TOTAL_CERT=$(find certificates/shard_* -name "*.svg" | wc -l)
echo " Total Genesis Certificates : $TOTAL_CERT / 100,000"

echo -e "\n [ECONOMY - TM IDENTITY]"
echo " Value Anchor per Citizen   : €100,000 (IND-EUR)"
echo " Total ENPE Supply          : 100 Trillion E-Coin"
echo " Reward Estafet             : 0-10 Coin/Day (Active)"

echo -e "\n [RECENT ACTIVITY]"
if [ -f test-result.json ]; then
    tail -n 3 test-result.json
else
    echo " No recent claims detected."
fi
echo "---------------------------------------------------------"
echo " Commands: [1] Monitor Queue [2] View Shards [3] Exit"
echo "========================================================="
