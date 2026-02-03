import requests
import concurrent.futures
import time

URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}

def simulate_activation(i):
    iid = f"INDIE-{str(i).zfill(10)}"
    # Pindahkan 1000 dari cadangan ke saldo aktif
    payload = {
        "ind_eur_balance": 1000,
        "amount_ind_eur": 99000
    }
    try:
        r = requests.patch(f"{URL}/rest/v1/wallets?iid=eq.{iid}", headers=headers, json=payload, timeout=10)
        return r.status_code
    except Exception:
        return 500

def run_test():
    print("🚀 Menjalankan Stress Test V3 (Aktivasi €1.000 Perdana)...")
    start_time = time.time()
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        # Mengetes pada 100 warga pertama
        results = list(executor.map(simulate_activation, range(1, 101)))
    
    end_time = time.time()
    success = results.count(204) + results.count(200)
    failed = len(results) - success
    
    print(f"\n--- [ LAPORAN STRESS TEST V3 ] ---")
    print(f"Total Request : 100")
    print(f"Sukses       : {success}")
    print(f"Gagal        : {failed}")
    print(f"Waktu Tempuh : {round(end_time - start_time, 2)} detik")
    print(f"----------------------------------")

if __name__ == "__main__":
    run_test()
