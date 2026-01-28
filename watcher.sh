#!/bin/bash
echo "🛡️ AI Guard: Watcher Mode 2.0 (Throttled) Aktif..."
while inotifywait -r -e modify,create,delete --exclude '\.(log|git)' ./ ; do
    echo "⚡ Perubahan terdeteksi. Menunggu stabilitas (5 detik)..."
    sleep 5
    ./auto-pilot.sh
done
