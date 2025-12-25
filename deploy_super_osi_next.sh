#!/bin/bash
# Menggunakan nama proyek yang bersih (lowercase, no triple dash)
PROJECT_NAME="neurosphere-osi-final"

echo "🚀 Deploying with project name: $PROJECT_NAME"

# Link ke Vercel dengan parameter nama proyek yang benar
vercel deploy --name $PROJECT_NAME --prod --force --yes > vercel_output.txt

# Ekstrak URL
DEPLOY_URL=$(grep -Eo 'https://[^\ ]+\.vercel\.app' vercel_output.txt | head -n 1)

echo "=========================================================="
echo "🎯 NEUROSPHERE OSI NEXT.JS DEPLOYED SUCCESSFULLY"
echo "🔗 Domain: $DEPLOY_URL"
echo "=========================================================="
