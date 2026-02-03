import requests
import time

URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"

headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}

def inject():
    batch_size = 5000
    total_records = 100000
    target_value = 100000  # 100.000 EUR
    
    print(f"🚀 Menyuntikkan Target Value €{target_value} ke {total_records} IID...")

    for start in range(1, total_records + 1, batch_size):
        end = min(start + batch_size - 1, total_records)
        
        # Menggunakan range filter untuk update massal per batch
        range_filter = f"iid=gte.INDIE-{str(start).zfill(10)}&iid=lte.INDIE-{str(end).zfill(10)}"
        payload = {"amount_ind_eur": target_value}
        
        r = requests.patch(f"{URL}/rest/v1/wallets?{range_filter}", headers=headers, json=payload)
        
        if r.status_code in [200, 204]:
            print(f"✅ Batch {start}-{end} berhasil disuntik €100.000.")
        else:
            print(f"⚠️ Gagal pada batch {start}: {r.text}")
        
        time.sleep(0.3)

if __name__ == "__main__":
    inject()
