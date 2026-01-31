#!/data/data/com.termux/files/usr/bin/bash
URL="https://yyzymgkdqevkuhowjci.supabase.co/rest/v1/claims?select=*"
KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"

clear
echo "=========================================="
echo "    NEUROSPHERE GENESIS LIVE MONITOR     "
echo "=========================================="
echo "Founder: INDIE-Founder"
echo "------------------------------------------"

while true; do
    # Mengambil range 0-0 hanya untuk mendapatkan metadata Count dari Header
    RESPONSE=$(curl -s -I -X GET "$URL"         -H "apikey: $KEY"         -H "Authorization: Bearer $KEY"         -H "Range: 0-0"         -H "Prefer: count=exact")
    
    # Ekstraksi angka dari header Content-Range (format: 0-0/10)
    COUNT=$(echo "$RESPONSE" | grep -oP '(?<=/)\d+')
    
    if [ -z "$COUNT" ]; then COUNT=0; fi
    
    TIME=$(date +%H:%M:%S)
    PROGRES=$(( COUNT * 100 / 100000 ))
    
    echo -ne "\r[$TIME] Terdaftar: $COUNT Warga | Progres: $PROGRES%          "
    sleep 5
done
