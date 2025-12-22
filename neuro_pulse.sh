#!/bin/bash
while true; do
    clear
    echo "==============================================================="
    echo "          NEURO-PULSE MONITOR: KEDAULATAN DIGITAL              "
    echo "==============================================================="
    echo " STATUS DIREKTORI : $(pwd) [cite: 2025-12-21]"
    echo " STATUS ENV      : $VIRTUAL_ENV [cite: 2025-12-21]"
    echo "---------------------------------------------------------------"
    
    # 1. CEK PROSES AKTIF
    PID_FLASK=$(pgrep -f neuro_gateway.py)
    PID_TUNNEL=$(pgrep -f cloudflared)
    echo " [PROCESS] Flask Gateway : ${PID_FLASK:-STOPPED (KILLED?)}"
    echo " [PROCESS] CF Tunnel     : ${PID_TUNNEL:-STOPPED (KILLED?)}"
    
    # 2. MONITOR MANDAT TOKENOMICS (20 DES)
    echo "---------------------------------------------------------------"
    echo " [MANDAT] ENPE Supply    : 100 Triliun [cite: 2025-12-20]"
    echo " [MANDAT] LUV Reward     : 1% Founder -> 1M People [cite: 2025-12-20]"
    echo " [MANDAT] Donation Pool  : 15% (Status: OPEN) [cite: 2025-12-20]"
    
    # 3. MONITOR ALIRAN DATA (BYTE STREAM)
    echo "---------------------------------------------------------------"
    echo " [LIVE TRAFFIC] (Last 5 Hits):"
    tail -n 5 cloudflare.log | grep "GET" || echo " Waiting for incoming bytes..."
    
    # 4. MONITOR DATABASE PENDAFTAR
    echo "---------------------------------------------------------------"
    COUNT=$(grep -c "wallet" DATA_PENDAFTAR_ASLI/pendaftar_natal.json 2>/dev/null || echo "0")
    echo " [DATABASE] Total Klaim  : $COUNT / 1,000,000 People [cite: 2025-12-20]"
    echo "==============================================================="
    sleep 2
done
