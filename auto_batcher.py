import requests
import time

URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}

def run_auto_batch(limit=1000):
    print(f"🚀 Mencari {limit} warga berikutnya untuk aktivasi...")
    
    # 1. Ambil IID yang masih INACTIVE
    r_get = requests.get(f"{URL}/rest/v1/wallets?status=eq.INACTIVE&limit={limit}", headers=headers)
    targets = r_get.json()
    
    if not targets:
        print("✅ Semua warga sudah aktif!")
        return

    print(f"📦 Memproses {len(targets)} warga...")
    
    for citizen in targets:
        iid = citizen['iid']
        payload = {
            "ind_eur_balance": 1000,
            "amount_ind_eur": 99000,
            "status": "ACTIVE_STREAMING"
        }
        r_patch = requests.patch(f"{URL}/rest/v1/wallets?iid=eq.{iid}", headers=headers, json=payload)
        
        if r_patch.status_code in [200, 204]:
            print(f"✅ {iid} Activated.")
        else:
            print(f"❌ {iid} Failed.")
        
        # Jeda 0.05 detik untuk menjaga kesehatan API
        time.sleep(0.05)

if __name__ == "__main__":
    run_auto_batch()
