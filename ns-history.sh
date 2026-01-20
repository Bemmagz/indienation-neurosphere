#!/data/data/com.termux/files/usr/bin/bash

USER_ID=$1
DB_FILE="neurosphere.db"

if [ -z "$USER_ID" ]; then
    echo "Usage: ./ns-history.sh [Citizen_ID]"
    exit 1
fi

echo "📜 Kindness Ledger for: $USER_ID"
echo "------------------------------------------"
sqlite3 $DB_FILE -header -column "SELECT timestamp, action, coins FROM kindness_actions WHERE citizen_id='$USER_ID' ORDER BY timestamp DESC;"
echo "------------------------------------------"
