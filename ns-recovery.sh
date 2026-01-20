#!/bin/bash
# Protokol Pemulihan Aura NeuroSphere
ID=$1
DEED=$2

if [ -z "$ID" ] || [ -z "$DEED" ]; then
    echo "Usage: ns recover [ID] [DEED_DESCRIPTION]"
    exit 1
fi

# Hitung bonus pemulihan (10% dari aura saat ini)
sqlite3 neurosphere.db << SQL_EOF
UPDATE citizens 
SET current_aura = CAST(current_aura * 1.11 AS INTEGER) 
WHERE id = '$ID';
INSERT INTO history (citizen_id, action, aura_change) 
VALUES ('$ID', 'RECOVERY: $DEED', 10);
SQL_EOF

echo "✨ RECOVERY SUCCESSFUL: $ID has restored their aura through '$DEED'."
python neuro-gen.py
