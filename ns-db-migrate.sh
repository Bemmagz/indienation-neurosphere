#!/data/data/com.termux/files/usr/bin/bash

# NeuroSphere JSON to SQLite Bridge
# Memindahkan kedaulatan data dari file ke database relasional

DB_FILE="neurosphere.db"
JSON_DIR="aura_history"

if [ ! -d "$JSON_DIR" ]; then
    echo "❌ Error: Directory $JSON_DIR not found."
    exit 1
fi

echo "🚀 Starting Data Sovereignty Migration..."

# Gunakan Python untuk parsing JSON dan insert ke SQLite secara presisi
python3 - << END_PYTHON
import json
import sqlite3
import os

conn = sqlite3.connect('$DB_FILE')
cursor = conn.cursor()

def migrate():
    count = 0
    # 1. Proses Active Citizens (*.json tapi bukan *.inherited.json)
    for filename in os.listdir('$JSON_DIR'):
        if filename.endswith('.json') and not filename.endswith('.inherited.json'):
            path = os.path.join('$JSON_DIR', filename)
            with open(path, 'r') as f:
                data = json.load(f)
                
                cursor.execute('''
                    INSERT OR REPLACE INTO citizens (id, current_aura, status, inherited_from)
                    VALUES (?, ?, ?, ?)
                ''', (
                    data.get('citizen_id') or data.get('identity'),
                    data.get('current_aura') or data.get('social_reputation', 0),
                    data.get('status', 'active'),
                    data.get('inherited_from')
                ))
                count += 1
                print(f"✅ Migrated Active: {filename}")

        # 2. Proses Legacy Citizens (*.inherited.json)
        elif filename.endswith('.inherited.json'):
            path = os.path.join('$JSON_DIR', filename)
            with open(path, 'r') as f:
                data = json.load(f)
                
                cursor.execute('''
                    INSERT OR REPLACE INTO citizens (id, current_aura, status, inherited_from)
                    VALUES (?, ?, ?, ?)
                ''', (
                    data.get('citizen_id'),
                    data.get('original_aura', 0),
                    'inherited',
                    None
                ))
                
                # Masukkan juga ke record inheritance jika ada data heir
                if 'heir' in data:
                    cursor.execute('''
                        INSERT INTO inheritance_records (owner_id, heir_id, aura_transferred)
                        VALUES (?, ?, ?)
                    ''', (data['citizen_id'], data['heir'], data.get('inherited_aura', 0)))
                
                count += 1
                print(f"📜 Migrated Legacy: {filename}")

    conn.commit()
    print(f"\n✨ Total migrated: {count} identities.")

migrate()
conn.close()
END_PYTHON

echo "------------------------------------------"
echo "📊 Database neurosphere.db is now LIVE."
./ns-status.sh status_summary # Placeholder for next tool
echo "------------------------------------------"
