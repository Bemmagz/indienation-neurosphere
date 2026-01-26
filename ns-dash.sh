#!/bin/bash
while true; do
    clear
    echo -e "\e[1;37m====================================================="
    echo -e "          INDIENATION COMMAND CENTER (v2.6)          "
    echo -e "=====================================================\e[0m"
    echo -e " STATUS: \e[32mACTIVE\e[0m | NETWORK: \e[34mSECURE\e[0m | UPTIME: $(uptime -p)"
    echo -e "-----------------------------------------------------"
    
    # Menghitung Total Identitas
    TOTAL_IID=$(psql -d neurosphere -t -c "SELECT count(*) FROM wallets WHERE id LIKE 'IID-2026-%';")
    # Menghitung Total Distribusi (Simulasi/Real)
    TOTAL_DIST=$(psql -d neurosphere -t -c "SELECT COALESCE(SUM(balance_ind_eur), 0) FROM wallets;")
    
    echo -e " TOTAL IDENTITIES (IID-2026) : \e[1;36m$TOTAL_IID\e[0m"
    echo -e " TOTAL DISTRIBUTED IND-EUR   : \e[1;32m$TOTAL_DIST\e[0m"
    echo -e "-----------------------------------------------------"
    echo -e " \e[1;33mRECENT ACTIVITY:\e[0m"
    psql -d neurosphere -c "SELECT id, balance_ind_eur, created_at FROM wallets WHERE balance_ind_eur > 0 ORDER BY created_at DESC LIMIT 5;"
    
    echo -e "\n \e[1;30mPress [CTRL+C] to exit monitoring\e[0m"
    sleep 5
done
