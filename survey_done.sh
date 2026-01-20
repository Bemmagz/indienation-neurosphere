#!/bin/bash

# Cek apakah ada file voucher
FILES=(./vouchers/*.json)
if [ ! -e "${FILES[0]}" ]; then
    echo "[ERROR] Tidak ada template voucher. Jalankan ./create_voucher.sh dulu."
    exit 1
fi

echo "--- UPDATE DETAIL PROPERTI NEUROSPHERE ---"
# Pilih voucher terbaru
LATEST_VOUCHER=$(ls -t ./vouchers/*.json | head -1)
echo "[SYSTEM] Updating latest voucher: $LATEST_VOUCHER"

# Input Data Real-Time
echo -n "Masukkan Lokasi (contoh: Dubai Marina / Flores): "
read LOC
echo -n "Masukkan Harga (dalam IND-EUR): "
read PRICE
echo -n "Masukkan Hash/No Sertifikat: "
read DOC_HASH

# Update Metadata menggunakan 'sed' (Terminal Friendly)
sed -i "s/\"location\": \"PENDING\"/\"location\": \"$LOC\"/" "$LATEST_VOUCHER"
sed -i "s/\"valuation_ind_eur\": 0/\"valuation_ind_eur\": $PRICE/" "$LATEST_VOUCHER"
sed -i "s/\"legal_docs_hash\": \"NOT_SET\"/\"legal_docs_hash\": \"$DOC_HASH\"/" "$LATEST_VOUCHER"
sed -i "s/\"status\": \"DRAFT_WAITING_FOR_SURVEY\"/\"status\": \"FINALIZED_FOR_TRANSACTION\"/" "$LATEST_VOUCHER"

echo "------------------------------------------------"
echo "[SUCCESS] Data Properti Berhasil Dikunci!"
echo "[STATUS] Voucher siap ditukarkan di lokasi."
echo "------------------------------------------------"
cat "$LATEST_VOUCHER"
