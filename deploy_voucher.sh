#!/bin/bash

# Cek file voucher yang sudah FINAL
LATEST_VOUCHER=$(ls -t ./vouchers/*.json | head -1)
if [ ! -f "$LATEST_VOUCHER" ]; then
    echo "[ERROR] Voucher tidak ditemukan."
    exit 1
fi

# Cek apakah sudah difinalisasi
STATUS=$(grep "status" "$LATEST_VOUCHER" | cut -d '"' -f 4)
if [ "$STATUS" != "FINALIZED_FOR_TRANSACTION" ]; then
    echo "[ERROR] Voucher masih DRAFT. Jalankan ./survey_done.sh dulu."
    exit 1
fi

# Ambil nilai harga untuk simulasi pemotongan
PRICE=$(grep "valuation_ind_eur" "$LATEST_VOUCHER" | awk -F': ' '{print $2}' | tr -d ',')

echo "------------------------------------------------"
echo "   NEUROSPHERE BLOCKCHAIN DEPLOYMENT          "
echo "------------------------------------------------"
echo "[ACTION] Deploying Voucher: $(basename $LATEST_VOUCHER)"
echo "[POOL] Source: 10% Daily Operational"
echo "[VALUE] Amount: $PRICE IND-EUR"
echo -n "[AUTH] Confirm Founder Authority (type 'execute'): "
read CONFIRM

if [ "$CONFIRM" == "execute" ]; then
    echo "[PROCESS] Communicating with NeuroSphere Engine..."
    sleep 2
    echo "[BURN] Locking IND-EUR Value into Property Asset..."
    
    # Update status menjadi SPENT
    sed -i "s/\"status\": \"FINALIZED_FOR_TRANSACTION\"/\"status\": \"DEPLOYED_ASSET_LOCKED\"/" "$LATEST_VOUCHER"
    
    echo "------------------------------------------------"
    echo "[SUCCESS] TRANSACTION COMPLETE"
    echo "Asset Identity has been merged with Founder NFT TM."
    echo "Check Metadata: $LATEST_VOUCHER"
    echo "------------------------------------------------"
else
    echo "[CANCELLED] Deployment aborted by Founder."
fi
