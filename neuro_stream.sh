#!/data/data/com.termux/files/usr/bin/bash

clear
while true; do
    # --- HEADER KEDAULATAN ---
    echo -e "\033[1;35m==============================================================="
    echo -e "   INDIENATION NEUROSPHERE: LIVE BYTE-STREAM MONITOR"
    echo -e "===============================================================\033[0m"

    # 1. MONITOR BYTE-FLOW (HEX DUMP)
    # Mengambil 5 baris terakhir dari log dan mengubahnya menjadi aliran HEX
    echo -e "\033[1;33m[ SEKTOR 1: RAW BYTE STREAM (HEX) ]\033[0m"
    tail -n 3 cloudflare.log | xxd -l 64 | colrm 1 10
    echo ""

    # 2. MONITOR GRAFIK ALIRAN (AC-CHART)
    echo -e "\033[1;32m[ SEKTOR 2: TRAFFIC FLOW CHART ]\033[0m"
    HITS=$(grep -c "GET /" cloudflare.log)
    BARS=$(printf '%*s' "$((HITS % 50))" '' | tr ' ' '█')
    echo -e "FLOW: $BARS ($HITS Hits)"
    echo ""

    # 3. MONITOR MANDAT (TOKENOMICS 20 DES)
    echo -e "\033[1;36m[ SEKTOR 3: MANDAT INTEGRITY ]\033[0m"
    echo -e "LUV DONATION POOL : 15% [OPEN]"
    echo -e "ENPE SUPPLY      : 100T [LOCKED]"
    echo -e "FOUNDER LOCK     : 3 YEARS"
    echo ""

    # 4. LIVE REQUEST LOG
    echo -e "\033[1;37m[ SEKTOR 4: LIVE REQUESTS ]\033[0m"
    tail -n 5 cloudflare.log | grep "GET" || echo "Menunggu denyut data..."

    echo -e "\033[1;35m===============================================================\033[0m"
    sleep 2
    clear
done
