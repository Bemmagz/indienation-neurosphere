#!/bin/bash
clear
echo -e "\e[1;34m###################################################\e[0m"
echo -e "\e[1;36m    NEUROSPHERE REAL-TIME MONITORING (BETA v1.0)   \e[0m"
echo -e "\e[1;34m###################################################\e[0m"
echo -e "\e[1;33mFOUNDER      :\e[0m Vault_Authority"
echo -e "\e[1;33mTIMESTAMP    :\e[0m $(date)"
echo -e "\e[1;32mSTABLE COIN  :\e[0m IND-EUR"
echo -e "\e[1;34m---------------------------------------------------\e[0m"

# Mengambil data dari PostgreSQL lokal (nanti bisa dihubungkan ke Supabase)
TOTAL_TX=$(psql -d neurosphere -t -c "SELECT count(*) FROM transactions;")
TOTAL_DIST=$(psql -d neurosphere -t -c "SELECT sum(amount) FROM transactions;")

echo -e "\e[1;37mTotal Transactions Today :\e[0m $TOTAL_TX"
echo -e "\e[1;37mTotal Distributed Value  :\e[0m $TOTAL_DIST IND-EUR"
echo -e "\e[1;34m---------------------------------------------------\e[0m"
echo -e "\e[1;35mSystem Load:\e[0m $(uptime | awk '{print $8 $9 $10}')"
echo -e "\e[1;34m###################################################\e[0m"
