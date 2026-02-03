import requests
import time

URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"

headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json", "Prefer": "resolution=merge-duplicates"}

def run_mass_init():
    batch_size = 500  # Ukuran aman untuk memori Termux
    total_records = 100000
    
    print(f"🚀 Memulai pendaftaran massal 1-100.000 IID...")

    for start in range(1, total_records + 1, batch_size):
        end = min(start + batch_size - 1, total_records)
        citizen_batch = []
        wallet_batch = []

        for i in range(start, end + 1):
            iid = f"INDIE-{str(i).zfill(10)}"
            # Data untuk tabel citizens
            citizen_batch.append({"iid": iid, "full_name": f"CITIZEN_{i}", "status": "ACTIVE"})
            # Data untuk tabel wallets
            wallet_batch.append({"iid": iid, "governance_layer": "SOCIAL_LAYER" if i > 10 else "GOVERNANCE", "amount_luv": 0, "amount_ind_eur": 0, "amount_enpe": 0})

        # Step 1: Daftarkan ke Citizens dulu (Identitas)
        r_cit = requests.post(f"{URL}/rest/v1/citizens", headers=headers, json=citizen_batch)
        
        # Step 2: Baru daftarkan ke Wallets (Dompet)
        r_wal = requests.post(f"{URL}/rest/v1/wallets", headers=headers, json=wallet_batch)

        if r_wal.status_code in [200, 201, 204]:
            print(f"✅ Batch {start}-{end} berhasil disinkronkan.")
        else:
            print(f"⚠️ Batch {start} gagal: {r_wal.text}")
            break
            
        time.sleep(0.2) # Jeda tipis agar koneksi stabil

if __name__ == "__main__":
    run_mass_init()
