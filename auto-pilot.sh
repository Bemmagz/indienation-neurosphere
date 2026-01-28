#!/bin/bash
echo "🚀 [$(date)] NeuroSphere Autopilot: Memulai Siklus..."

# Sinkronisasi Database & Saldo
node seed.js

# Optimasi Penyimpanan (Limit 10 GB)
git gc --prune=now --aggressive > /dev/null 2>&1

# Publikasi Otomatis
git add .
git commit -m "Auto-Sovereign Update: $(date)" --quiet
git push origin master --force --quiet

# Deploy ke Vercel
vercel --prod --force --yes > /dev/null 2>&1

echo "✅ [$(date)] Siklus Selesai. Sistem Sinkron."
