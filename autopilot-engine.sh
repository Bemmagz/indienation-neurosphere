#!/bin/bash
while true
do
    echo "[$(date)] 🛡️ Memulai siklus pemeriksaan kedaulatan..."
    # Jalankan skrip distribusi dan catat ke log
    node ~/indienation-neurosphere/kick-off-distribution.js >> ~/distribution.log 2>&1
    
    echo "[$(date)] 😴 Siklus selesai. Istirahat 1 jam..."
    # Tunggu 3600 detik (1 jam)
    sleep 3600
done
