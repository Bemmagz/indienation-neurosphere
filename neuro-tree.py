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
