#!/bin/bash
# Supabase Keep-Alive Pulse
# Logic: Neurolang Activity Simulation

API_URL="https://jpcofjankomicljstmqw.supabase.co/rest/v1/"

echo -n "Sending Pulse to Supabase... "
# Melakukan permintaan HEAD untuk memicu aktivitas server tanpa mendownload data besar
RESPONSE=$(curl -s -o /dev/null -I -w "%{http_code}" "$API_URL")

if [ "$RESPONSE" == "200" ] || [ "$RESPONSE" == "401" ]; then
    echo -e "[\033[0;32m SUCCESS \033[0m] - Status: $RESPONSE"
else
    echo -e "[\033[0;31m FAILED \033[0m] - Status: $RESPONSE"
fi
