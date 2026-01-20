#!/bin/bash
echo "🔐 Validating Data Sovereignty Migration..."
echo "=========================================="

# 1. Check counts match
JSON_COUNT=$(ls -1 aura_history/*.json 2>/dev/null | wc -l)
DB_COUNT=$(sqlite3 neurosphere.db "SELECT COUNT(*) FROM citizens;")

echo "File Count: $JSON_COUNT JSON files"
echo "DB Count  : $DB_COUNT database records"

if [ "$JSON_COUNT" -eq "$DB_COUNT" ]; then
    echo "✅ Counts match perfectly."
else
    echo "⚠️  Count mismatch! Investigating..."
fi

# 2. Check specific critical records
echo -e "\n🔍 Checking critical inheritance lineage..."
sqlite3 neurosphere.db << SQL
SELECT 
    'Owner: ' || c1.id,
    'Heir:  ' || c2.id,
    'Aura:  ' || i.aura_transferred
FROM inheritance_records i
JOIN citizens c1 ON i.owner_id = c1.id
JOIN citizens c2 ON i.heir_id = c2.id;
SQL

# 3. Verify no orphaned records
echo -e "\n📋 Checking data integrity..."
ORPHANED=$(sqlite3 neurosphere.db "SELECT COUNT(*) FROM citizens WHERE id NOT IN (SELECT owner_id FROM inheritance_records UNION SELECT heir_id FROM inheritance_records) AND inherited_from IS NOT NULL;")
if [ "$ORPHANED" -eq 0 ]; then
    echo "✅ No orphaned inheritance records."
else
    echo "⚠️  Found $ORPHANED potential orphan records."
fi

echo "=========================================="
echo "Validation complete."
