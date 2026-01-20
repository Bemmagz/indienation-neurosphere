#!/bin/bash

# Folder untuk menyimpan voucher
mkdir -p ./vouchers

echo "------------------------------------------------"
echo "  NEUROSPHERE PROPERTY VOUCHER GENERATOR (DRAFT) "
echo "------------------------------------------------"

# Identifikasi Unik Voucher
VOUCHER_ID="AWM-PROP-$(date +%s)"

echo "[1] Creating Template for Voucher ID: $VOUCHER_ID"
echo "[2] Status: PRE-AUTHORIZED by Founder"

# Membuat file template (Metadata)
cat << METADATA > ./vouchers/${VOUCHER_ID}.json
{
  "voucher_id": "$VOUCHER_ID",
  "status": "DRAFT_WAITING_FOR_SURVEY",
  "source_pool": "10%_DAILY_OPERATIONAL",
  "issued_by": "Founder_Identity_Umbrella",
  "property_details": {
    "location": "PENDING",
    "valuation_ind_eur": 0,
    "legal_docs_hash": "NOT_SET"
  },
  "timestamp": "$(date)"
}
METADATA

echo "[SUCCESS] Template Created in ./vouchers/${VOUCHER_ID}.json"
echo "------------------------------------------------"
echo "TIPS: Anda bisa mengisi detail properti saat sudah"
echo "berada di lokasi menggunakan perintah 'nano' atau 'vim'."
echo "------------------------------------------------"
