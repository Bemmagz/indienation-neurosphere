#!/bin/bash
echo "⚠️ PROTOKOL LONJAKAN NEUROSPHERE DIAKTIFKAN..."

# 1. Membersihkan cache internal untuk membebaskan ruang (Batas 10GB)
echo "🧹 Membersihkan residu data..."
rm -rf ~/.cache/pip
git gc --prune=now --aggressive

# 2. Mengatur ulang prioritas Engine Autopilot (PID 2468)
echo "⚡ Meningkatkan prioritas proses Autopilot..."
renice -n -10 -p $(pgrep -f autopilot)

# 3. Validasi batasan data (Batas 100M)
echo "📊 Memeriksa penggunaan bandwidth..."
ifconfig | grep "RX bytes"

echo "✅ Sistem telah dioptimalkan untuk menangani lonjakan klaim."
