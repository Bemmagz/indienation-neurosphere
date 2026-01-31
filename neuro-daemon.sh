#!/bin/bash
echo "🛡️ NeuroSphere Autopilot Daemon Aktif..."
while true; do
    CURRENT_TIME=$(date +%H:%M)
    CURRENT_DATE=$(date +%d-%m)

    # Eksekusi Laporan Harian pukul 23:59
    if [ "$CURRENT_TIME" == "23:59" ]; then
        ./daily-report.sh
        sleep 61
    fi

    # Eksekusi Sambutan Massal tepat 01-02 pukul 00:00
    if [ "$CURRENT_TIME" == "00:00" ] && [ "$CURRENT_DATE" == "01-02" ]; then
        ./welcome-broadcast.sh
        sleep 61
    fi

    sleep 30
done
