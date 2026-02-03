import requests
import time

URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}

def complete_activation():
    print("🚀 Menggenapkan Aktivasi 100 Warga Pertama (Target €100.000 Likuid)...")
    
    for i in range(1, 101):
        iid = f"INDIE-{str(i).zfill(10)}"
        payload = {
            "ind_eur_balance": 1000,
            "amount_ind_eur": 99000,
            "status": "ACTIVE_STREAMING"
        }
        r = requests.patch(f"{URL}/rest/v1/wallets?iid=eq.{iid}", headers=headers, json=payload)
        
        if r.status_code in [200, 204]:
            print(f"✅ {iid} Stabilized.")
        else:
            print(f"⚠️ {iid} Failed: {r.status_code}")
        
        # Jeda 0.1 detik untuk menghindari blokir rate-limit Supabase
        time.sleep(0.1)

if __name__ == "__main__":
    complete_activation()
