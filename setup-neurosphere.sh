#!/bin/bash

echo "🧠 NeuroSphere v4.1.0 Setup"
echo "============================"

# Check if we're in the right directory
if [ ! -f "neuro" ]; then
    echo "❌ Error: 'neuro' file not found in current directory"
    echo "Please run this script from the NeuroSphere directory"
    exit 1
fi

# Check dependencies
if ! command -v sqlite3 &> /dev/null; then
    echo "Installing sqlite3..."
    if command -v pkg &> /dev/null; then
        pkg install sqlite3 -y
    elif command -v apt-get &> /dev/null; then
        sudo apt-get install sqlite3 -y
    elif command -v brew &> /dev/null; then
        brew install sqlite3
    elif command -v yum &> /dev/null; then
        sudo yum install sqlite3 -y
    else
        echo "⚠️  Could not install sqlite3 automatically"
        echo "Please install sqlite3 manually and run setup again"
    fi
fi

# Make neuro executable
chmod +x neuro

# Create alias in .bashrc
if ! grep -q "alias ns=" ~/.bashrc 2>/dev/null; then
    echo "" >> ~/.bashrc
    echo "# NeuroSphere CLI Alias" >> ~/.bashrc
    echo "alias ns='$(pwd)/neuro'" >> ~/.bashrc
    echo "✅ Added permanent alias to ~/.bashrc"
fi

# Source the alias for current session
source ~/.bashrc 2>/dev/null || true

# Also create a local alias for this session
alias ns='./neuro'

# Initialize database by running version command
echo ""
echo "Initializing NeuroSphere..."
./neuro version

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Quick Start Commands:"
echo "   ns help                    # Show all commands"
echo "   ns status summary          # System overview"
echo "   ns reward Alex Teaching 5  # Grant kindness points"
echo "   ns list 5                  # Top 5 citizens"
echo "   ns dashboard               # Live dashboard (Ctrl+C to exit)"
echo ""
echo "📚 For more examples, see QUICKSTART.md"
