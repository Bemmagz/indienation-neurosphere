#!/bin/bash
# NEUROSPHERE VALUE GRANT (IND-EUR Transfer)
SENDER_ID=$1
RECIPIENT_ID=$2
AMOUNT=$3

IDENTITY_DIR="$HOME/indienation-neurosphere/identities"
SENDER_FILE="$IDENTITY_DIR/$SENDER_ID.json"
RECIPIENT_FILE="$IDENTITY_DIR/$RECIPIENT_ID.json"

if [ $# -ne 3 ]; then echo "Usage: neuro-grant [SENDER_ID] [RECIPIENT_ID] [AMT]"; exit 1; fi

# Guard: Cek Otoritas & Saldo
S_AURA=$(grep -o '"aura":"[^"]*"' "$SENDER_FILE" | cut -d'"' -f4)
S_BAL=$(grep -o '"ind_eur":[0-9]*' "$SENDER_FILE" | cut -d':' -f2)

if [ "$S_AURA" != "#FFD700" ]; then echo "ERROR: Hanya Social Leader yang bisa memberi Grant!"; exit 1; fi
if [ "$S_BAL" -lt "$AMOUNT" ]; then echo "ERROR: Saldo IND-EUR tidak mencukupi!"; exit 1; fi

# Eksekusi: Potong Saldo Pengirim & Tambah Saldo Penerima
NEW_S_BAL=$((S_BAL - AMOUNT))
sed -i "s/\"ind_eur\":$S_BAL/\"ind_eur\":$NEW_S_BAL/" "$SENDER_FILE"

if grep -q '"ind_eur"' "$RECIPIENT_FILE"; then
    R_BAL=$(grep -o '"ind_eur":[0-9]*' "$RECIPIENT_FILE" | cut -d':' -f2)
    NEW_R_BAL=$((R_BAL + AMOUNT))
    sed -i "s/\"ind_eur\":$R_BAL/\"ind_eur\":$NEW_R_BAL/" "$RECIPIENT_FILE"
else
    sed -i "s/}/, \"ind_eur\":$AMOUNT}/" "$RECIPIENT_FILE"
fi

echo "[GRANT SUCCESS] €$AMOUNT ditransfer dari $SENDER_ID ke $RECIPIENT_ID"
