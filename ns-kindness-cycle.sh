#!/data/data/com.termux/files/usr/bin/bash

# NeuroSphere Kindness Cycle v3.0 - SQL EDITION
# Mencatat setiap aksi kebaikan ke dalam Ledger Digital

USER_ID=$1
ACTION=$2
REWARD=$3
DB_FILE="neurosphere.db"

if [ -z "$USER_ID" ] || [ -z "$ACTION" ] || [ -z "$REWARD" ]; then
    echo "Usage: ./ns-kindness-cycle.sh [Citizen_ID] [Action_Name] [Reward_Amount]"
    exit 1
fi

# 1. Verifikasi Eksistensi User
CHECK=$(sqlite3 $DB_FILE "SELECT id FROM citizens WHERE id='$USER_ID' AND status='active';")
if [ -z "$CHECK" ]; then
    echo "❌ Error: Active citizen $USER_ID not found."
    exit 1
fi

# 2. Update Aura & Insert Riwayat (Atomic Transaction)
sqlite3 $DB_FILE <<SQL
BEGIN TRANSACTION;
UPDATE citizens SET current_aura = current_aura + $REWARD WHERE id = '$USER_ID';
INSERT INTO kindness_actions (citizen_id, action, coins) VALUES ('$USER_ID', '$ACTION', $REWARD);
COMMIT;
SQL

if [ $? -eq 0 ]; then
    NEW_AURA=$(sqlite3 $DB_FILE "SELECT current_aura FROM citizens WHERE id='$USER_ID';")
    echo "------------------------------------------"
    echo "✨ KINDNESS RECORDED"
    echo "Citizen : $USER_ID"
    echo "Action  : ${ACTION//_/ }"
    echo "Reward  : +$REWARD LUV"
    echo "Current : $NEW_AURA Aura"
    echo "------------------------------------------"
else
    echo "❌ FATAL: Database error during kindness recording."
fi
