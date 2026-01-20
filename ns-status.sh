#!/data/data/com.termux/files/usr/bin/bash

USER_ID=$1
DB_FILE="neurosphere.db"

if [ "$USER_ID" == "status_summary" ]; then
    echo "=== NeuroSphere National Summary ==="
    sqlite3 $DB_FILE "SELECT 'Total Citizens : ' || COUNT(*) FROM citizens;"
    sqlite3 $DB_FILE "SELECT 'Active Users   : ' || COUNT(*) FROM citizens WHERE status='active';"
    sqlite3 $DB_FILE "SELECT 'Legacy Records : ' || COUNT(*) FROM citizens WHERE status='inherited';"
    exit 0
fi

if [ -z "$USER_ID" ]; then
    echo "Usage: ./ns-status.sh [Citizen_ID | status_summary]"
    exit 1
fi

echo "🔍 Querying Sovereign DB for: $USER_ID"
RESULT=$(sqlite3 $DB_FILE "SELECT id, current_aura, status, inherited_from FROM citizens WHERE id='$USER_ID';")

if [ -z "$RESULT" ]; then
    echo "🔴 STATUS: NOT FOUND"
else
    # Formatting output sederhana
    ID=$(echo $RESULT | cut -d'|' -f1)
    AURA=$(echo $RESULT | cut -d'|' -f2)
    STATUS=$(echo $RESULT | cut -d'|' -f3)
    FROM=$(echo $RESULT | cut -d'|' -f4)

    if [ "$STATUS" == "active" ]; then echo -n "🟢 "; else echo -n "🟡 "; fi
    echo "STATUS: ${STATUS^^}"
    echo "----------------------------"
    echo "Citizen ID : $ID"
    echo "Aura Score : $AURA"
    [ ! -z "$FROM" ] && echo "Inherited  : From $FROM"
    echo "----------------------------"
fi
