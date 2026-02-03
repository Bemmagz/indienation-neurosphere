#!/bin/bash

# Folder data
CERT_DIR="vault/certificates"
mkdir -p $CERT_DIR

# Cek IID terakhir yang ada di folder
LAST_FILE=$(ls $CERT_DIR/CERT_INDIE-*.txt 2>/dev/null | sort | tail -n 1)

if [ -z "$LAST_FILE" ]; then
    # Jika folder kosong, paksa ke 11 karena 01-10 adalah Otoritas Founder (Locked)
    NEXT_ID=11
else
    # Ambil angka dari file terakhir
    LAST_NUM=$(echo "$LAST_FILE" | grep -oE '[0-9]+' | sed 's/^0*//')
    if [ "$LAST_NUM" -lt 10 ]; then
        NEXT_ID=11
    else
        NEXT_ID=$((LAST_NUM + 1))
    fi
fi

FORMATTED_ID=$(printf "INDIE-%010d" $NEXT_ID)

echo "--------------------------------------------------"
echo "         NEUROSPHERE GATEKEEPER v2.0              "
echo "--------------------------------------------------"
echo " IID 01-10 STATUS : [LOCKED] IMMUTABLE FOUNDER    "
echo " PUBLIC STATUS    : [OPEN] STARTING FROM IID 11   "
echo " NEXT PUBLIC IID  : $FORMATTED_ID                 "
echo "--------------------------------------------------"
