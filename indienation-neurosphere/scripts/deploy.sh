#!/bin/bash
echo "📦 Mempersiapkan Build Produksi NeuroSphere..."
npm install
npm run build
echo "🚀 Mendeploy ke Vercel (indienation-neurosphere)..."
vercel --prod --yes
echo "✅ Sistem NeuroSphere Singularity Online!"
