#!/bin/bash
# AI Guard: Nano Auto-Save & Sync
FILE_TO_WATCH=$1

if [ -z "$1" ]; then
    echo "❌ Gunakan: ./autosave-guard.sh nama_file.js"
    exit 1
fi

echo "🛡️ AI Guard: Mengawasi $FILE_TO_WATCH..."
while true; do
    # Cek jika file berubah dalam 5 detik terakhir
    inotifywait -e modify "$FILE_TO_WATCH" 2>/dev/null
    
    # Simpan backup dengan timestamp
    cp "$FILE_TO_WATCH" "${FILE_TO_WATCH}.bak"
    echo "💾 Auto-saved pada $(date +%H:%V:%S)"
    
    # Jika Anda menggunakan git, aktifkan baris di bawah ini:
    # git add "$FILE_TO_WATCH" && git commit -m "Auto-save $FILE_TO_WATCH"
done
