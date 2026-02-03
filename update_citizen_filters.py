import requests
import time
import random

URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"

headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}

def update_filters():
    batch_size = 5000
    total = 100000
    print(f"🛡️ Memperbarui 100.000 warga dengan filter usia & telepon...")

    for start in range(1, total + 1, batch_size):
        end = min(start + batch_size - 1, total)
        # Simulasi: Memberikan tanggal lahir acak antara 1970-2015
        # Ini akan menciptakan variasi warga dewasa dan anak-anak
        year = random.randint(1970, 2015)
        mock_birth_date = f"{year}-01-01"
        
        range_filter = f"iid=gte.INDIE-{str(start).zfill(10)}&iid=lte.INDIE-{str(end).zfill(10)}"
        payload = {
            "birth_date": mock_birth_date,
            "phone_number": f"+62812{random.randint(1000, 9999)}{random.randint(1000, 9999)}",
            "is_verified": True
        }
        
        r = requests.patch(f"{URL}/rest/v1/citizens?{range_filter}", headers=headers, json=payload)
        if r.status_code in [200, 204]:
            print(f"✅ Batch {start}-{end} terverifikasi dengan Birth Date: {mock_birth_date}")
        else:
            print(f"⚠️ Gagal pada batch {start}: {r.text}")
        time.sleep(0.3)

if __name__ == "__main__":
    update_filters()
