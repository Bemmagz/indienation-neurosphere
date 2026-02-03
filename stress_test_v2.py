import requests
import concurrent.futures
import time

URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}

def simulate_activation(i):
    # Format IID harus presisi sesuai database: INDIE-0000000001 dst.
    iid = f"INDIE-{str(i).zfill(10)}"
    payload = {"status": "ACTIVE_STREAMING", "amount_ind_eur": 1000}
    try:
        r = requests.patch(f"{URL}/rest/v1/wallets?iid=eq.{iid}", headers=headers, json=payload, timeout=10)
        # 204 No Content berarti update berhasil
        return r.status_code
    except Exception as e:
        return 500

def run_test():
    print("🚀 Mengulang Stress Test dengan IID Terverifikasi (10-110)...")
    start_time = time.time()
    
    # Mengurangi pekerja dari 50 ke 10 agar tidak diblokir API
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        results = list(executor.map(simulate_activation, range(10, 110)))
    
    end_time = time.time()
    success = results.count(204) + results.count(200)
    failed = len(results) - success
    
    print(f"\n--- [ LAPORAN STRESS TEST V2 ] ---")
    print(f"Total Request : 100")
    print(f"Sukses       : {success}")
    print(f"Gagal        : {failed}")
    print(f"Waktu Tempuh : {round(end_time - start_time, 2)} detik")
    if failed > 0:
        print(f"Sample Status Code: {results[0] if results else 'None'}")
    print(f"-------------------------------")

if __name__ == "__main__":
    run_test()
