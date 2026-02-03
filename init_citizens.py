import requests
import time

URL = "https://indienation-neurosphere.supabase.co" # Pastikan ID Unik di sini
KEY = "YOUR_ANON_KEY"

def init_mass_citizens():
    headers = {
        "apikey": KEY,
        "Authorization": f"Bearer {KEY}",
        "Content-Type": "application/json"
    }
    
    # Batch processing (1000 per batch agar tidak melebihi limit 100M Termux)
    batch_size = 1000
    start_iid = 11
    end_iid = 100000

    print(f"🚀 Memulai Inisialisasi Massal IID {start_iid} ke {end_iid}...")

    for i in range(start_iid, end_iid + 1, batch_size):
        batch_end = min(i + batch_size - 1, end_iid)
        wallets = []
        
        for iid_num in range(i, batch_end + 1):
            formatted_iid = f"INDIE-{str(iid_num).zfill(10)}"
            wallets.append({
                "iid": formatted_iid,
                "governance_layer": "SOCIAL_LAYER",
                "amount_luv": 0,
                "amount_ind_eur": 0,
                "amount_enpe": 0
            })
        
        # Kirim ke Supabase
        r = requests.post(f"{URL}/rest/v1/wallets", headers=headers, json=wallets)
        
        if r.status_code in [201, 204]:
            print(f"✅ Batch {i} - {batch_end} Berhasil didaftarkan.")
        else:
            print(f"❌ Gagal pada batch {i}: {r.text}")
            break
        
        time.sleep(0.5) # Jeda untuk kestabilan koneksi

if __name__ == "__main__":
    init_mass_citizens()
