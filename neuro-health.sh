#!/bin/bash
echo "🧠 NEUROSPHERE HEALTH CHECK v4.0.0"
echo "=================================="

# Check database
if [ -f "neurosphere.db" ]; then
    echo "✅ Database file exists"
    SIZE=$(du -h neurosphere.db | cut -f1)
    echo "   Size: $SIZE"
else
    echo "❌ Database missing!"
    exit 1
fi

# Check neuro executable
if [ -f "neuro" ] && [ -x "neuro" ]; then
    echo "✅ Neuro CLI executable"
    VERSION=$(./neuro version)
    echo "   $VERSION"
else
    echo "❌ Neuro CLI missing or not executable"
    exit 1
fi

# Check database connectivity
if sqlite3 neurosphere.db "SELECT COUNT(*) FROM sqlite_master;" > /dev/null 2>&1; then
    echo "✅ Database connection OK"
    TABLES=$(sqlite3 neurosphere.db "SELECT COUNT(*) FROM sqlite_master WHERE type='table';")
    echo "   Tables: $TABLES"
else
    echo "❌ Database connection failed"
    exit 1
fi

# Check citizens count
CITIZENS=$(sqlite3 neurosphere.db "SELECT COUNT(*) FROM citizens;")
echo "✅ Citizens in system: $CITIZENS"

# Test basic command
echo ""
echo "🔧 Testing basic commands..."
./neuro status summary
echo ""
./neuro list 3

echo ""
echo "🧪 Health check completed!"
