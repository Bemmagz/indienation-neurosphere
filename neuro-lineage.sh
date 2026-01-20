#!/data/data/com.termux/files/usr/bin/bash

# NeuroSphere Lineage Management v4.3.0
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
RED='\033[0;31m'
NC='\033[0m'

DB_FILE="neurosphere.db"

header() {
    echo -e "${CYAN}╔══════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║          NEUROSPHERE LINEAGE MANAGEMENT             ║${NC}"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════╝${NC}"
}

case "$1" in
    tree|lineage)
        header
        echo -e "${GREEN}Displaying lineage tree...${NC}"
        echo ""
        python neuro-tree.py
        ;;
    
    stats)
        header
        echo -e "${GREEN}Lineage Statistics${NC}"
        echo "══════════════════════"
        
        sqlite3 "$DB_FILE" << 'STATS_SQL'
.mode box
.headers on

-- Total lineage stats
SELECT 
    'Total Lineages' as "Metric",
    COUNT(DISTINCT CASE WHEN inherited_from IS NULL OR inherited_from = '' THEN id END) as "Value"
FROM citizens
UNION ALL
SELECT 
    'Total Inheritance Transfers',
    COUNT(*) 
FROM inheritance_records
UNION ALL
SELECT 
    'Total Aura Transferred',
    COALESCE(SUM(aura_transferred), 0)
FROM inheritance_records
UNION ALL
SELECT 
    'Average Transfer Size',
    COALESCE(AVG(aura_transferred), 0)
FROM inheritance_records;

.print "\n📈 Largest Lineages:"
SELECT 
    inherited_from as "Origin",
    COUNT(*) as "Heirs",
    SUM(current_aura) as "Total_Aura_in_Lineage"
FROM citizens 
WHERE inherited_from IS NOT NULL AND inherited_from != ''
GROUP BY inherited_from 
ORDER BY COUNT(*) DESC 
LIMIT 3;

.print "\n👑 Most Valuable Lineages:"
SELECT 
    inherited_from as "Founder",
    MAX(current_aura) as "Highest_Aura_in_Lineage",
    AVG(current_aura) as "Average_Aura"
FROM citizens 
WHERE inherited_from IS NOT NULL AND inherited_from != ''
GROUP BY inherited_from 
ORDER BY MAX(current_aura) DESC 
LIMIT 3;
STATS_SQL
        ;;
    
    export)
        header
        if [ -z "$2" ]; then
            OUTPUT="lineage_export_$(date +%Y%m%d_%H%M%S)"
        else
            OUTPUT="$2"
        fi
        
        echo -e "${GREEN}Exporting lineage data to: ${OUTPUT}.{txt,json,csv}${NC}"
        echo ""
        
        # Export as text
        python neuro-tree.py > "${OUTPUT}.txt"
        echo -e "✅ Text export: ${OUTPUT}.txt"
        
        # Export as JSON
        python3 << 'JSON_EOF' > "${OUTPUT}.json" 2>/dev/null
import sqlite3
import json

conn = sqlite3.connect("neurosphere.db")
cursor = conn.cursor()

# Get all citizens with lineage info
cursor.execute("""
    SELECT id, current_aura, status, inherited_from, created_at
    FROM citizens
    ORDER BY inherited_from, created_at
""")

citizens = []
for row in cursor.fetchall():
    citizens.append({
        "id": row[0],
        "aura": row[1],
        "status": row[2],
        "inherited_from": row[3],
        "created_at": row[4]
    })

# Get inheritance records
cursor.execute("SELECT owner_id, heir_id, aura_transferred, executed_at FROM inheritance_records")
inheritance = []
for row in cursor.fetchall():
    inheritance.append({
        "from": row[0],
        "to": row[1],
        "aura_transferred": row[2],
        "timestamp": row[3]
    })

conn.close()

# Create export structure
export_data = {
    "metadata": {
        "export_date": "2024-01-20T12:00:00Z",
        "version": "NeuroSphere v4.3.0",
        "total_citizens": len(citizens),
        "total_transfers": len(inheritance)
    },
    "citizens": citizens,
    "inheritance_records": inheritance
}

print(json.dumps(export_data, indent=2))
JSON_EOF
        echo -e "✅ JSON export: ${OUTPUT}.json"
        
        # Export as CSV
        sqlite3 "$DB_FILE" << 'CSV_EOF' > "${OUTPUT}.csv"
.headers on
.mode csv
SELECT 
    id as "Citizen_ID",
    current_aura as "Aura",
    status as "Status",
    inherited_from as "Inherited_From",
    created_at as "Created_At"
FROM citizens
ORDER BY inherited_from, current_aura DESC;
CSV_EOF
        echo -e "✅ CSV export: ${OUTPUT}.csv"
        
        echo ""
        echo -e "${YELLOW}📁 Export complete! Files created:${NC}"
        ls -lh "${OUTPUT}".*
        ;;
    
    find)
        header
        if [ -z "$2" ]; then
            echo -e "${RED}Usage: ./neuro-lineage.sh find [citizen_id]${NC}"
            exit 1
        fi
        
        echo -e "${GREEN}Finding lineage for: $2${NC}"
    python neuro-tree.py | grep -A 5 "$2"
        echo "══════════════════════════════════"
        
        # Find ancestors
        echo -e "${YELLOW}👤 ANCESTORS:${NC}"
        sqlite3 "$DB_FILE" << 'ANCESTOR_SQL'
WITH RECURSIVE ancestors(id, inherited_from, depth) AS (
    SELECT id, inherited_from, 0
    FROM citizens 
    WHERE id = '$2'
    UNION ALL
    SELECT c.id, c.inherited_from, a.depth + 1
    FROM citizens c
    JOIN ancestors a ON c.id = a.inherited_from
    WHERE a.inherited_from IS NOT NULL
)
SELECT 
    CASE 
        WHEN depth = 0 THEN '↳ Self'
        ELSE '↳ ' || id || ' →'
    END as "Generation",
    id as "Citizen",
    depth as "Gen"
FROM ancestors
ORDER BY depth DESC;
ANCESTOR_SQL
        
        # Find descendants
        echo -e "\n${YELLOW}👥 DESCENDANTS:${NC}"
        sqlite3 "$DB_FILE" << 'DESCENDANT_SQL'
WITH RECURSIVE descendants(id, depth) AS (
    SELECT id, 0
    FROM citizens 
    WHERE inherited_from = '$2'
    UNION ALL
    SELECT c.id, d.depth + 1
    FROM citizens c
    JOIN descendants d ON c.inherited_from = d.id
)
SELECT 
    CASE depth
        WHEN 0 THEN '↳ Direct Heir'
        ELSE '↳ ' || "" || '→ ' || id
    END as "Generation",
    id as "Citizen",
    depth as "Gen"
FROM descendants
ORDER BY depth, id;
DESCENDANT_SQL
        
        # Get lineage summary
        echo -e "\n${YELLOW}📊 LINEAGE SUMMARY:${NC}"
        sqlite3 "$DB_FILE" << 'SUMMARY_SQL'
SELECT 
    (SELECT COUNT(*) FROM citizens WHERE inherited_from = '$2') as "Direct_Heirs",
    (SELECT COUNT(*) FROM inheritance_records WHERE owner_id = '$2') as "Times_Transferred",
    (SELECT COALESCE(SUM(aura_transferred), 0) FROM inheritance_records WHERE owner_id = '$2') as "Total_Aura_Given",
    (SELECT current_aura FROM citizens WHERE id = '$2') as "Current_Aura"
FROM citizens 
WHERE id = '$2'
LIMIT 1;
SUMMARY_SQL
        ;;
    
    visualize)
        header
        echo -e "${GREEN}Creating lineage visualization...${NC}"
        
        # Generate DOT file for Graphviz
        cat > lineage.dot << 'DOT_EOF'
digraph NeuroSphereLineage {
    rankdir=TB;
    node [shape=box, style=filled, fontname="Arial"];
    edge [color=gray40];
    
    // Get data from database
DOT_EOF
        
        # Add nodes and edges from database
        sqlite3 "$DB_FILE" << 'DOT_DATA' >> lineage.dot
.mode list
.separator " "

-- Add nodes with color based on aura
SELECT 
    '    "' || id || '" [label="' || id || '\nAura: ' || current_aura || '", fillcolor="' ||
    CASE 
        WHEN current_aura <= 30 THEN 'lightgreen'
        WHEN current_aura <= 70 THEN 'lightblue'
        ELSE 'violet'
    END || '"];'
FROM citizens;

-- Add edges for inheritance
SELECT '    "' || inherited_from || '" -> "' || id || '" [label="' || aura_transferred || ' aura"];'
FROM citizens c
LEFT JOIN inheritance_records r ON c.inherited_from = r.owner_id AND c.id = r.heir_id
WHERE c.inherited_from IS NOT NULL AND c.inherited_from != '';
DOT_DATA
        
        echo '}' >> lineage.dot
        
        echo -e "✅ Created Graphviz file: lineage.dot"
        echo ""
        echo -e "${YELLOW}To generate visualization:${NC}"
        echo "  1. Install Graphviz: pkg install graphviz"
        echo "  2. Generate PNG: dot -Tpng lineage.dot -o lineage.png"
        echo "  3. Generate SVG: dot -Tsvg lineage.dot -o lineage.svg"
        echo ""
        echo -e "${CYAN}Or use online Graphviz tools to visualize.${NC}"
        ;;
    
    help|*)
        header
        echo -e "${YELLOW}Available Commands:${NC}"
        echo ""
        echo -e "  ${GREEN}tree${NC}                - Display lineage tree"
        echo -e "  ${GREEN}stats${NC}               - Lineage statistics"
        echo -e "  ${GREEN}export${NC} [name]      - Export lineage data (txt/json/csv)"
        echo -e "  ${GREEN}find${NC} [citizen_id]  - Find ancestors and descendants"
        echo -e "  ${GREEN}visualize${NC}          - Create Graphviz visualization"
        echo -e "  ${GREEN}help${NC}               - This help message"
        echo ""
        echo -e "${MAGENTA}Examples:${NC}"
        echo -e "  ./neuro-lineage.sh tree"
        echo -e "  ./neuro-lineage.sh find Heir_Successor_99"
        echo -e "  ./neuro-lineage.sh export my_lineage"
        echo -e "  ./neuro-lineage.sh stats"
        echo ""
        echo -e "${CYAN}Note:${NC} This complements the main 'neuro' command for lineage analysis."
        ;;
esac
