#!/bin/bash
# Menyatukan fungsi silsilah ke dalam kernel neuro
echo "🧠 Merging Lineage Logic into NeuroSphere Kernel..."

# Update neuro CLI untuk mendukung 'tree' dan 'verify'
sed -i '/case "\$1" in/a \    tree)\n        python neuro-tree.py\n        ;;\n    verify)\n        ./neuro-lineage.sh find "$2"\n        ;;' neuro

# Pastikan neuro-tree.py menangani warga baru tanpa leluhur
cat << 'PY_EOF' > neuro-tree.py
import sqlite3
import sys

def build_tree(parent_id, level=0):
    try:
        conn = sqlite3.connect("neurosphere.db")
        cursor = conn.cursor()
        cursor.execute("SELECT id, current_aura FROM citizens WHERE inherited_from=?", (parent_id,))
        children = cursor.fetchall()
        for child in children:
            indent = "   " * level
            connector = "└── "
            icon = "🌱" if child[1] <= 30 else "🛡️"
            if child[1] > 70: icon = "👑"
            print(f"{indent}{connector}{icon} {child[0]} (Aura: {child[1]})")
            build_tree(child[0], level + 1)
        conn.close()
    except: pass

print("\n🌳 NEUROSPHERE LINEAGE MAP")
print("==========================")
conn = sqlite3.connect("neurosphere.db")
cursor = conn.cursor()
cursor.execute("SELECT id, current_aura FROM citizens WHERE inherited_from IS NULL OR inherited_from='' OR inherited_from='None'")
for origin in cursor.fetchall():
    print(f"🏛️ {origin[0]} [Origin]")
    build_tree(origin[0], 1)
conn.close()
PY_EOF

chmod +x neuro
echo "✅ Merge Complete. Try: ns tree"
