#!/bin/bash

while true; do
    clear
    echo "================================================"
    echo "      NEUROSPHERE FOUNDER OPERATIONAL HUB       "
    echo "================================================"
    echo " 1. [CREATE]  Generate Property Voucher Draft"
    echo " 2. [SURVEY]  Finalize Property Data (at Location)"
    echo " 3. [DEPLOY]  Execute Transaction & Lock Asset"
    echo " 4. [AUDIT]   View All Vouchers/Assets"
    echo " 5. [EXIT]    Close Hub"
    echo "================================================"
    echo -n "Select Menu [1-5]: "
    read choice

    case $choice in
        1) ./create_voucher.sh; read -p "Press Enter to continue..." ;;
        2) ./survey_done.sh; read -p "Press Enter to continue..." ;;
        3) ./deploy_voucher.sh; read -p "Press Enter to continue..." ;;
        4) ls -l ./vouchers/; read -p "Press Enter to continue..." ;;
        5) exit 0 ;;
        *) echo "Invalid Option."; sleep 1 ;;
    esac
done
