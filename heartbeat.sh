#!/bin/bash
echo "💓 Heartbeat NeuroSphere Dimulai..."
while true
do
    echo "🚀 Memulai Batch Otomatis pada $(date)"
    python /data/data/com.termux/files/home/indienation-neurosphere/auto_batcher.py
    echo "💤 Batch selesai. Tidur selama 6 jam..."
    sleep 21600
done
