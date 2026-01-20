#!/bin/bash

echo "🚀 NeuroSphere Lineage System Demo v4.3.0"
echo "═════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Make scripts executable
chmod +x neuro-tree.py neuro-lineage.sh 2>/dev/null || true

# Step 1: Show current state
echo -e "${CYAN}📊 STEP 1: Current Database State${NC}"
echo "────────────────────────────────"
sqlite3 neurosphere.db "SELECT COUNT(*) as 'Total Citizens' FROM citizens;"
sqlite3 neurosphere.db "SELECT COUNT(*) as 'Inheritance Records' FROM inheritance_records;"
echo ""

# Step 2: Display lineage tree
echo -e "${CYAN}📈 STEP 2: Lineage Tree Visualization${NC}"
echo "─────────────────────────────────────"
python neuro-tree.py
echo ""

# Step 3: Export data
echo -e "${CYAN}💾 STEP 3: Data Export${NC}"
echo "───────────────────────"
./neuro-lineage.sh export demo_lineage
echo ""

# Step 4: Show advanced features
echo -e "${CYAN}🔍 STEP 4: Advanced Lineage Analysis${NC}"
echo "────────────────────────────────────"
echo -e "${YELLOW}Finding lineage for Heir_Successor_99:${NC}"
echo ""
sqlite3 neurosphere.db << 'ANALYSIS_SQL'
.mode box
.headers on

-- Direct lineage analysis
WITH RECURSIVE lineage AS (
    SELECT id, inherited_from, 0 as depth
    FROM citizens 
    WHERE id = 'Heir_Successor_99'
    UNION ALL
    SELECT c.id, c.inherited_from, l.depth + 1
    FROM citizens c
    JOIN lineage l ON c.inherited_from = l.id
    WHERE l.inherited_from IS NOT NULL
)
SELECT 
    CASE depth
        WHEN 0 THEN 'Self'
        ELSE 'Ancestor ' || depth
    END as "Position",
    id as "Citizen",
    (SELECT current_aura FROM citizens WHERE id = lineage.id) as "Aura"
FROM lineage
ORDER BY depth DESC;
ANALYSIS_SQL
echo ""

# Step 5: Create visualization instructions
echo -e "${CYAN}🎨 STEP 5: Visualization Options${NC}"
echo "──────────────────────────────────"
echo "Available visualization methods:"
echo "1. Text Tree: python neuro-tree.py"
echo "2. HTML Gallery: Open avatars/index.html"
echo "3. Graphviz: ./neuro-lineage.sh visualize"
echo "4. Export Formats: JSON, CSV, Text"
echo ""

# Step 6: Show integration with avatars
echo -e "${CYAN}🖼️ STEP 6: Avatar Integration${NC}"
echo "─────────────────────────────"
if [ -d "avatars" ]; then
    echo "Avatars with lineage data:"
    ls avatars/*.svg 2>/dev/null | head -3 | while read file; do
        citizen=$(basename "$file" .svg)
        echo "  🎨 $citizen.svg"
    done
    echo ""
    echo "Each avatar contains QR code with lineage info!"
else
    echo "No avatars found. Generate them with: ./neuro nft"
fi

echo ""
echo -e "${GREEN}✅ Demo Complete!${NC}"
echo ""
echo "📚 Available Commands:"
echo "  ./neuro-lineage.sh tree      # Display lineage"
echo "  ./neuro-lineage.sh find [id] # Find specific lineage"
echo "  ./neuro-lineage.sh stats     # Statistics"
echo "  ./neuro-lineage.sh export    # Export data"
echo "  python neuro-tree.py         # Text tree"
echo "  ./neuro nft                  # Generate avatars"
