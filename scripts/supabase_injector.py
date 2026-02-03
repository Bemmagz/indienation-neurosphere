import json
import os
from supabase import create_client, Client

# Kredensial yang Anda berikan (Terintegrasi secara otomatis)
URL = "YOUR_SUPABASE_URL" 
KEY = "YOUR_SUPABASE_SERVICE_ROLE_KEY"

supabase: Client = create_client(URL, KEY)

def inject_data():
    file_path = "logs/mass_ledger_100k.json"
    
    if not os.path.exists(file_path):
        print("Error: File ledger 100k tidak ditemukan!")
        return

    with open(file_path, 'r') as f:
        data = json.load(f)

    print(f"[*] Memulai injeksi 100.000 data ke Supabase...")
    
    # Membagi data menjadi batch (misal: 1000 per kiriman) agar tidak timeout
    batch_size = 1000
    for i in range(0, len(data), batch_size):
        batch = data[i:i+batch_size]
        try:
            supabase.table("citizens").upsert(batch).execute()
            print(f"[-] Berhasil mengirim: {i + len(batch)} / 100.000")
        except Exception as e:
            print(f"[!] Error pada batch ke-{i}: {e}")

    print("\n[DONE] 100.000 Identitas kini AKTIF secara Global di Supabase!")

if __name__ == "__main__":
    inject_data()
