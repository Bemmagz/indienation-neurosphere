#!/bin/bash

echo "🚀 NeuroSphere v4.3.0 Showcase"
echo "============================="
echo "NFT Avatar System with QR Codes"
echo ""

# Make scripts executable
chmod +x neuro neuro-gen.py 2>/dev/null || true

# Show version
echo "🔧 System Version:"
./neuro version
echo ""

# Generate avatars if they don't exist
if [ ! -d "avatars" ] || [ $(find avatars -name "*.svg" | wc -l) -eq 0 ]; then
    echo "🎨 Generating NFT avatars..."
    ./neuro nft
else
    echo "✅ Avatars already exist in ./avatars/"
    echo "   Count: $(find avatars -name "*.svg" | wc -l)"
fi

echo ""
echo "🖼️ Avatar Gallery Preview:"
echo "-------------------------"
if [ -f "avatars/index.html" ]; then
    echo "📄 HTML Gallery: file://$(pwd)/avatars/index.html"
    echo ""
    echo "Recent avatars:"
    ls -1t avatars/*.svg 2>/dev/null | head -3 | while read file; do
        name=$(basename "$file" .svg)
        echo "  🎨 $name"
    done
else
    echo "❌ No gallery found. Generate avatars first: ./neuro nft"
fi

echo ""
echo "🔗 QR Code Features:"
echo "------------------"
echo "Each avatar contains a QR code with:"
echo "  • Citizen ID"
echo "  • Current Aura"
echo "  • Status"
echo "  • Timestamp"
echo "  • Verification URL"
echo ""

# Test QR functionality
echo "📱 QR Code Test:"
echo "---------------"
if command -v sqlite3 >/dev/null 2>&1; then
    # Get first citizen for demo
    FIRST_CITIZEN=$(sqlite3 neurosphere.db "SELECT id FROM citizens LIMIT 1;" 2>/dev/null)
    if [ -n "$FIRST_CITIZEN" ]; then
        echo "Testing QR display for: $FIRST_CITIZEN"
        echo ""
        ./neuro qr "$FIRST_CITIZEN"
    else
        echo "No citizens found. Create one: ./neuro reward Test Demo 10"
    fi
fi

echo ""
echo "🔍 Verification Test:"
echo "-------------------"
if [ -d "avatars" ] && [ $(ls avatars/*.svg 2>/dev/null | wc -l) -gt 0 ]; then
    FIRST_AVATAR=$(ls avatars/*.svg | head -1)
    echo "Verifying: $(basename "$FIRST_AVATAR" .svg)"
    ./neuro verify "$FIRST_AVATAR"
else
    echo "No avatars to verify. Generate some first."
fi

echo ""
echo "🚀 Quick Start Commands:"
echo "----------------------"
echo "1. Generate avatars: ./neuro nft"
echo "2. View gallery:     ./neuro gallery"
echo "3. Check QR data:    ./neuro qr [citizen_id]"
echo "4. Verify avatar:    ./neuro verify [file.svg]"
echo "5. Open in browser:  termux-open avatars/index.html"
echo ""
echo "✨ All v4.1.0 commands still work!"
echo "   ./neuro reward, ./neuro inherit, ./neuro dashboard, etc."
