#!/bin/bash

BASE_DIR="$(pwd)"
VOUCHER_DIR="$BASE_DIR/vouchers"

mkdir -p "$VOUCHER_DIR"

pause() {
  echo ""
  read -p "Press ENTER to continue..."
}

create_voucher() {
  echo "------------------------------------------------"
  echo "  NEUROSPHERE PROPERTY VOUCHER GENERATOR (DRAFT)"
  echo "------------------------------------------------"

  VOUCHER_ID="NS-PROP-$(date +%s)"
  FILE="$VOUCHER_DIR/$VOUCHER_ID.json"

  cat <<EOF > "$FILE"
{
  "voucher_id": "$VOUCHER_ID",
  "status": "DRAFT_WAITING_FOR_SURVEY",
  "source_pool": "10_PERCENT_DAILY_OPERATIONAL",
  "issued_by": "FOUNDER_UMBRELLA",
  "property_details": {
    "location": "PENDING",
    "valuation_ind_eur": 0,
    "legal_docs_hash": "NOT_SET"
  },
  "timestamp": "$(date)"
}
EOF

  echo "[SUCCESS] Voucher created:"
  echo "$FILE"
}

survey_voucher() {
  LATEST=$(ls -t "$VOUCHER_DIR"/*.json 2>/dev/null | head -1)

  if [ -z "$LATEST" ]; then
    echo "[ERROR] Tidak ada voucher. Buat dulu (Menu 1)."
    return
  fi

  STATUS=$(grep '"status"' "$LATEST")

  if [[ "$STATUS" != *"DRAFT_WAITING_FOR_SURVEY"* ]]; then
    echo "[ERROR] Voucher tidak dalam status DRAFT."
    return
  fi

  echo "[SURVEY] Updating voucher: $LATEST"
  read -p "Lokasi Properti: " LOC
  read -p "Harga (IND-EUR): " PRICE
  read -p "Hash / No Sertifikat: " DOC

  sed -i "s/\"location\": \"PENDING\"/\"location\": \"$LOC\"/" "$LATEST"
  sed -i "s/\"valuation_ind_eur\": 0/\"valuation_ind_eur\": $PRICE/" "$LATEST"
  sed -i "s/\"legal_docs_hash\": \"NOT_SET\"/\"legal_docs_hash\": \"$DOC\"/" "$LATEST"
  sed -i "s/\"status\": \"DRAFT_WAITING_FOR_SURVEY\"/\"status\": \"FINALIZED_FOR_TRANSACTION\"/" "$LATEST"

  echo "[SUCCESS] Voucher finalized."
}

deploy_voucher() {
  LATEST=$(ls -t "$VOUCHER_DIR"/*.json 2>/dev/null | head -1)

  if [ -z "$LATEST" ]; then
    echo "[ERROR] Tidak ada voucher."
    return
  fi

  STATUS=$(grep '"status"' "$LATEST")

  if [[ "$STATUS" != *"FINALIZED_FOR_TRANSACTION"* ]]; then
    echo "[ERROR] Voucher belum siap deploy."
    return
  fi

  PRICE=$(grep valuation_ind_eur "$LATEST" | awk -F': ' '{print $2}' | tr -d ',')

  echo "------------------------------------------------"
  echo " NEUROSPHERE BLOCKCHAIN DEPLOYMENT (SIMULATION)"
  echo "------------------------------------------------"
  echo "Voucher : $(basename "$LATEST")"
  echo "Value   : $PRICE IND-EUR"
  echo "Pool    : 10% Daily Operational"
  echo "------------------------------------------------"

  read -p "Type 'execute' to confirm founder authority: " CONFIRM

  if [ "$CONFIRM" != "execute" ]; then
    echo "[CANCELLED] Deployment aborted."
    return
  fi

  echo "[PROCESS] Locking asset..."
  sleep 2

  sed -i "s/\"status\": \"FINALIZED_FOR_TRANSACTION\"/\"status\": \"DEPLOYED_ASSET_LOCKED\"/" "$LATEST"

  echo "[SUCCESS] Asset locked & merged with Founder Asset Identity."
}

audit_vouchers() {
  echo "[AUDIT MODE]"
  echo "------------------------------------------------"

  FILES=$(ls "$VOUCHER_DIR"/*.json 2>/dev/null)

  if [ -z "$FILES" ]; then
    echo "[INFO] Belum ada voucher."
    return
  fi

  for f in $FILES; do
    echo "FILE: $f"
    grep -E '"voucher_id"|"status"|"location"|"valuation_ind_eur"' "$f"
    echo "------------------------------------------------"
  done
}

while true; do
  clear
  echo "================================================"
  echo "     NEUROSPHERE FOUNDER OPERATIONAL HUB"
  echo "================================================"
  echo " 1. [CREATE]  Generate Property Voucher Draft"
  echo " 2. [SURVEY]  Finalize Property Data (On Site)"
  echo " 3. [DEPLOY]  Execute Transaction & Lock Asset"
  echo " 4. [AUDIT]   View All Vouchers / Assets"
  echo " 5. [EXIT]"
  echo "================================================"
  read -p "Select Menu [1-5]: " CHOICE

  case $CHOICE in
    1) create_voucher; pause ;;
    2) survey_voucher; pause ;;
    3) deploy_voucher; pause ;;
    4) audit_vouchers; pause ;;
    5) echo "Exiting Hub."; exit 0 ;;
    *) echo "Invalid choice."; pause ;;
  esac
done

