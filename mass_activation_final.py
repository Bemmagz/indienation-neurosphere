import requests
import time

URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}

def run_final_activation():
    print("💎 Mengaktifkan 100 IID Pertama & Mengunci Status ACTIVE_STREAMING...")
    
    for i in range(1, 101):
        iid = f"INDIE-{str(i).zfill(10)}"
        payload = {
            "ind_eur_balance": 1000,
            "amount_ind_eur": 99000,
            "status": "ACTIVE_STREAMING"
        }
        r = requests.patch(f"{URL}/rest/v1/wallets?iid=eq.{iid}", headers=headers, json=payload)
        
        if r.status_code in [200, 204]:
            print(f"✅ {iid}: AKTIF - €1.000 Terkirim")
        else:
            print(f"❌ {iid}: GAGAL ({r.status_code})")
        
        # Jeda tipis untuk stabilitas API
        time.sleep(0.05)

if __name__ == "__main__":
    run_final_activation()
