import requests
import concurrent.futures
import time

URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}

def simulate_activation(i):
    iid = f"INDIE-{str(i).zfill(10)}"
    payload = {"status": "ACTIVE_STREAMING", "amount_ind_eur": 1000}
    try:
        r = requests.patch(f"{URL}/rest/v1/wallets?iid=eq.{iid}", headers=headers, json=payload, timeout=10)
        return r.status_code
    except:
        return 500

def run_test():
    print("🔥 Memulai Stress Test: Mensimulasikan 1.000 Aktivasi Serentak...")
    start_time = time.time()
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
        results = list(executor.map(simulate_activation, range(100, 1100)))
    
    end_time = time.time()
    success = results.count(204) + results.count(200)
    failed = len(results) - success
    
    print(f"\n--- [ LAPORAN STRESS TEST ] ---")
    print(f"Total Request : 1.000")
    print(f"Sukses       : {success}")
    print(f"Gagal        : {failed}")
    print(f"Waktu Tempuh : {round(end_time - start_time, 2)} detik")
    print(f"-------------------------------")

if __name__ == "__main__":
    run_test()
