import time
import requests
import json

URL = "https://yyzymgkdpqevkuhowjci.supabase.co/rest/v1/wallets"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
HEADERS = {
    "apikey": KEY,
    "Authorization": f"Bearer {KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

def process_shard(start_idx, size=1000):
    print(f"🚀 Processing Shard: {start_idx} to {start_idx + size}")
    # Ambil 1000 warga yang masih INACTIVE
    resp = requests.get(f"{URL}?status=eq.INACTIVE&limit={size}", headers=HEADERS)
    citizens = resp.json()
    
    for c in citizens:
        iid = c['iid']
        # Update status & kucurkan likuiditas awal €1.000
        payload = {"status": "ACTIVE_STREAMING", "ind_eur_balance": 1000}
        requests.patch(f"{URL}?iid=eq.{iid}", headers=HEADERS, json=payload)
        with open("batch_log.txt", "a") as f:
            f.write(f"✅ {iid} Activated.\n")
        print(f"Aktivasi: {iid}")

# Main Logic: 5.000 divided into 5 shards
for i in range(5):
    process_shard(i * 1000)
    print("⏳ Shard complete. Cooling down for 60 seconds...")
    time.sleep(60) # Cooldown untuk menghindari Rate Limit Free Tier

print("💤 Mega Batch 5.000 Selesai. Sistem hibernasi.")
