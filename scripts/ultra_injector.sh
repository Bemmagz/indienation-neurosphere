#!/bin/bash

# Kredensial Otomatis
URL="https://yyzymgkdpqevkuhowjci.supabase.co"
KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
TABLE_URL="${URL}/rest/v1/citizens"
FILE="logs/mass_ledger_100k.json"

echo "=================================================="
echo "      NEUROSPHERE UPSERT MODE (ANTI-409)          "
echo "=================================================="
echo "[*] Melanjutkan pengiriman 100.000 warga..."

python3 -c "
import json
with open('$FILE', 'r') as f:
    data = json.load(f)
    batch_size = 500
    for i in range(0, len(data), batch_size):
        print(json.dumps(data[i:i+batch_size]))
" | while read -r BATCH; do
    
    SUCCESS=0
    while [ $SUCCESS -eq 0 ]; do
        # Menggunakan Prefer: resolution=merge-duplicates untuk menangani Error 409
        RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$TABLE_URL" \
            -H "apikey: $KEY" \
            -H "Authorization: Bearer $KEY" \
            -H "Content-Type: application/json" \
            -H "Prefer: resolution=merge-duplicates" \
            -d "$BATCH")

        if [[ "$RESPONSE" == "201" || "$RESPONSE" == "204" || "$RESPONSE" == "200" ]]; then
            echo -n "."
            SUCCESS=1
        elif [ "$RESPONSE" == "000" ]; then
            echo -e "\n[!] Sinyal Hilang. Menunggu 5 detik..."
            sleep 5
        else
            echo -e "\n[!] Kode Server: $RESPONSE. Mencoba lagi..."
            sleep 5
        fi
    done
done
echo -e "\n[DONE] Kedaulatan 100.000 Warga Selesai Disinkronkan!"
