#!/data/data/com.termux/files/usr/bin/bash

# NeuroSphere Value Inheritance Protocol (VIP) v3.0 - SQL EDITION
# Keamanan Transaksional untuk Kontinuitas Nilai

OWNER_ID=$1
HEIR_ID=$2
DB_FILE="neurosphere.db"

if [ -z "$OWNER_ID" ] || [ -z "$HEIR_ID" ]; then
    echo "Usage: ./ns-inherit.sh [Owner_ID] [Heir_ID]"
    exit 1
fi

# 1. Ambil Skor & Validasi via SQL
OWNER_DATA=$(sqlite3 $DB_FILE "SELECT current_aura FROM citizens WHERE id='$OWNER_ID' AND status='active';")

if [ -z "$OWNER_DATA" ]; then
    echo "❌ Error: Owner $OWNER_ID not found or already inherited."
    exit 1
fi

# 2. Kalkulasi Warisan (70%)
HEIR_SCORE=$(echo "$OWNER_DATA * 0.7" | bc | cut -d. -f1)

echo "📜 Processing Legacy Transfer: $OWNER_ID -> $HEIR_ID ($HEIR_SCORE Aura)"

# 3. SQL ATOMIC TRANSACTION
sqlite3 $DB_FILE <<SQL
BEGIN TRANSACTION;
-- Archive Owner
UPDATE citizens SET status='inherited' WHERE id='$OWNER_ID';

-- Create/Update Heir
INSERT OR REPLACE INTO citizens (id, current_aura, status, inherited_from) 
VALUES ('$HEIR_ID', $HEIR_SCORE, 'active', '$OWNER_ID');

-- Record Inheritance History
INSERT INTO inheritance_records (owner_id, heir_id, aura_transferred)
VALUES ('$OWNER_ID', '$HEIR_ID', $HEIR_SCORE);
COMMIT;
SQL

if [ $? -eq 0 ]; then
    echo "✅ SUCCESS: Inheritance completed via SQL Transaction."
    ./ns-status.sh "$HEIR_ID"
else
    echo "❌ FATAL: Database transaction failed."
    exit 1
fi
