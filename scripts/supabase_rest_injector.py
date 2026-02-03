import json
import os
import httpx
import time

# Kredensial (Silakan pastikan URL dan KEY Anda benar)
URL = "YOUR_SUPABASE_URL" 
KEY = "YOUR_SUPABASE_SERVICE_ROLE_KEY"

# Endpoint tabel (Sesuaikan nama tabel Anda, misal: 'citizens')
TABLE_URL = f"{URL}/rest/v1/citizens"

headers = {
    "apikey": KEY,
    "Authorization": f"Bearer {KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

def inject_data():
    file_path = "logs/mass_ledger_100k.json"
    
    if not os.path.exists(file_path):
        print("Error: File ledger 100k tidak ditemukan!")
        return

    with open(file_path, 'r') as f:
        data = json.load(f)

    total = len(data)
    batch_size = 500 # Ukuran batch lebih kecil agar lebih stabil di REST
    
    print(f"[*] Memulai Injeksi REST: {total} data...")

    with httpx.Client() as client:
        for i in range(0, total, batch_size):
            batch = data[i:i+batch_size]
            try:
                response = client.post(TABLE_URL, json=batch, headers=headers)
                response.raise_for_status()
                print(f"[-] Terkirim: {i + len(batch)} / {total}")
            except Exception as e:
                print(f"[!] Gagal pada batch {i}: {e}")
                time.sleep(1) # Jeda sejenak jika terjadi gangguan jaringan

    print(f"\n[DONE] 100.000 Identitas telah AKTIF di Supabase via REST API.")

if __name__ == "__main__":
    inject_data()
