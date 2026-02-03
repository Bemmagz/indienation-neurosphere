import requests
import json
from datetime import datetime

URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}"}

def create_snapshot():
    print("📸 Mengambil Snapshot Kekayaan Nasional...")
    r = requests.get(f"{URL}/rest/v1/wallets?select=ind_eur_balance,amount_ind_eur,status", headers=headers)
    data = r.json()
    
    total_liquid = sum(item['ind_eur_balance'] for item in data)
    active_count = sum(1 for item in data if item['status'] == 'ACTIVE_STREAMING')
    
    snapshot = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "total_liquid_distributed": total_liquid,
        "active_citizens": active_count,
        "system_status": "HEALTHY"
    }
    
    with open("ledger_snapshot.json", "a") as f:
        f.write(json.dumps(snapshot) + "\n")
    
    print(f"✅ Snapshot Tersimpan: €{total_liquid} aktif di {active_count} warga.")

if __name__ == "__main__":
    create_snapshot()
