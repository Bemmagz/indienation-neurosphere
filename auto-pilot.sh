#!/bin/bash
# AI Guard: Autopilot Deployment System

echo "🚀 NeuroSphere Autopilot Started..."

# 1. Jalankan Seeder Otomatis (Jika ada perubahan data)
node seed.js

# 2. Audit & Cleanup (Hemat Ruang 10 GB)
git gc --prune=now --aggressive

# 3. Auto Commit & Push
git add .
git commit -m "Auto-Update: $(date '+%Y-%m-%d %H:%M:%S') [System Generated]"
git push origin master

# 4. Trigger Vercel Production
vercel --prod --force --yes

echo "✅ Deployment Complete. No manual action required."
