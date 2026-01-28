#!/bin/bash
echo "🛡️ AI Guard: Watcher Mode Aktif. Menunggu perubahan file..."
while inotifywait -r -e modify,create,delete ./ ; do
    echo "⚡ Perubahan terdeteksi! Memulai prosedur autopilot..."
    ./auto-pilot.sh
done
