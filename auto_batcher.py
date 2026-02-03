import time
import requests
import sys

# Konfigurasi Sovereign Ledger
URL = "https://yyzymgkdpqevkuhowjci.supabase.co/rest/v1/wallets"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
HEADERS = {
    "apikey": KEY,
    "Authorization": f"Bearer {KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

def process_shard(size=1000):
    print(f"\n🚀 [SHARD START] Mencari {size} warga inaktif...")
    try:
        # Mengambil daftar IID yang belum aktif
        resp = requests.get(f"{URL}?status=eq.INACTIVE&limit={size}", headers=HEADERS)
        citizens = resp.json()
        
        if not citizens or len(citizens) == 0:
            print("✨ Semua warga dalam shard ini sudah aktif atau tidak ditemukan.")
            return False

        for index, c in enumerate(citizens):
            iid = c['iid']
            payload = {"status": "ACTIVE_STREAMING", "ind_eur_balance": 1000}
            
            # Mekanisme Retry untuk menghadapi 'Connection Reset'
            success = False
            for attempt in range(3):
                try:
                    r = requests.patch(f"{URL}?iid=eq.{iid}", headers=HEADERS, json=payload)
                    if r.status_code in [200, 204]:
                        # Print satu baris agar terminal tetap bersih
                        sys.stdout.write(f"\r✅ Teraktivasi: {iid} [{index+1}/{len(citizens)}]")
                        sys.stdout.flush()
                        success = True
                        break
                    else:
                        print(f"\n⚠️ Status Error {r.status_code} pada {iid}")
                except Exception:
                    time.sleep(2)
            
            if not success:
                print(f"\n❌ Gagal memproses {iid} setelah 3 percobaan.")
            
            # JEDA KRUSIAL: 0.5 detik agar peer tidak melakukan reset
            time.sleep(0.5)
            
        return True
    except Exception as e:
        print(f"\n❌ Error Fatal: {e}")
        return False

# Eksekusi Batch Utama
if __name__ == "__main__":
    print("--- NEUROSPHERE AUTO-BATCHER V2 (SLOW-BURN) ---")
    for i in range(5):
        print(f"\n📦 Memulai Gelombang {i+1} dari 5")
        if not process_shard(1000):
            break
        print(f"\n⏳ Gelombang {i+1} Selesai. Cooling down 30 detik...")
        time.sleep(30)

    print("\n💤 Seluruh proses batch selesai. Sistem memasuki mode hibernasi.")

