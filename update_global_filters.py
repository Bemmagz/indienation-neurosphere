import requests
import time
import random

URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"

headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}

def update_global():
    batch_size = 5000
    total = 100000
    # Daftar beberapa kode negara internasional untuk simulasi global
    country_codes = ["+1", "+44", "+49", "+33", "+62", "+81", "+61", "+971"]
    
    print(f"🌍 Sinkronisasi 100.000 Warga ke Standar Identitas Global...")

    for start in range(1, total + 1, batch_size):
        end = min(start + batch_size - 1, total)
        
        # Simulasi penyebaran usia global (10-60 tahun)
        year = random.randint(1965, 2016)
        mock_birth_date = f"{year}-01-01"
        code = random.choice(country_codes)
        
        range_filter = f"iid=gte.INDIE-{str(start).zfill(10)}&iid=lte.INDIE-{str(end).zfill(10)}"
        payload = {
            "birth_date": mock_birth_date,
            "phone_number": f"{code}{random.randint(100000000, 999999999)}",
            "is_verified": True,
            "identity_hash": f"SHA256-{random.getrandbits(128)}" # Simulasi Hash Wajah yang di-encrypt
        }
        
        r = requests.patch(f"{URL}/rest/v1/citizens?{range_filter}", headers=headers, json=payload)
        if r.status_code in [200, 204]:
            print(f"✅ Global Sync Batch {start}-{end} | Origin: {code}")
        else:
            print(f"⚠️ Error: {r.text}")
        time.sleep(0.3)

if __name__ == "__main__":
    update_global()
