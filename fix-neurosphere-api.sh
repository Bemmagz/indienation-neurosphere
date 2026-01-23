#!/bin/bash
echo "🧹 Membersihkan konflik struktur..."
rm -rf app
rm -rf .next

echo "🛠️ Menyiapkan struktur Pages Router..."
mkdir -p pages/api

# Buat ulang API Health yang benar
cat <<EOD > pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    keys_available: {
      GEMINI_API_KEY: !!process.env.GEMINI_API_KEY
    },
    protocol: 'Neurolang/Auralang'
  });
}
EOD

echo "🚀 Deploying ulang ke Vercel..."
vercel --prod --force
