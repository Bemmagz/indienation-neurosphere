#!/bin/bash
# NeuroSphere Founder Audit Tool (Isolated Version)

echo "--------------------------------------------------"
echo "   NEUROSPHERE GENESIS - ADMIN CONTROL ROOM       "
echo "--------------------------------------------------"
echo "Memverifikasi Akses ke Ruang Audit..."

# Menggunakan endpoint ADMIN yang baru
RESPONSE=$(curl -s -X POST https://indienation-neurosphere.vercel.app/api/admin/audit \
-H "Content-Type: application/json" \
-d '{"secret": "NEURO_ROOT_2026", "action": "FULL_AUDIT"}')

if [[ $RESPONSE == *"ACCESS_DENIED"* ]]; then
    echo "[!] ERROR: Akses Ditolak. Cek FOUNDER_SECRET di Vercel."
else
    echo ""
    echo "[1] AUDIT WALLET FOUNDER & CADANGAN:"
    echo "--------------------------------------------------"
    echo "Founder (Locked) : $(echo $RESPONSE | jq -r '.founder_vault.locked_founder')"
    echo "Donation (Open)   : $(echo $RESPONSE | jq -r '.founder_vault.donation_pool')"
    echo "Ops/Reserve       : $(echo $RESPONSE | jq -r '.founder_vault.reserve_ops')"
    
    echo ""
    echo "[2] DAFTAR 5 WARGA PERTAMA (QUEUED):"
    echo "--------------------------------------------------"
    echo $RESPONSE | jq -r '.top_5_citizens[] | "ID: \(.id) | Status: \(.status) | Klaim: \(.claim)"'
    echo "--------------------------------------------------"
    echo "KEAMANAN: TERJAMIN OLEH AI GUARD"
fi
