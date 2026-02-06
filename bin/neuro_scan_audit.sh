#!/bin/bash
# NeuroSphere Physical-Digital Bridge

# 1. Ambil Foto Identitas
echo "Menunggu pemindaian QR Code NeuroSphere..."
termux-camera-photo ~/last_scan.jpg

# 2. Ekstraksi Data QR
ID_SCAN=$(zbarimg --raw -q ~/last_scan.jpg | tr -d '\n')

# 3. Validasi Identitas & Jalankan Audit
if [ "$ID_SCAN" == "NS-QR-GREEN-001" ]; then
    echo -e "\033[1;32m[MATCH] Identitas INDIE-Founder Terverifikasi.\033[0m"
    ~/indienation-neurosphere/bin/neuro_check.sh
else
    echo -e "\033[1;31m[ERROR] Identitas Tidak Dikenal atau QR Ilegal.\033[0m"
fi

# 4. Auto-Cleanup (Menjaga Storage 10GB Tetap Bersih)
rm ~/last_scan.jpg
echo "Cleanup: File sementara dihapus."
