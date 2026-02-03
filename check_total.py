import requests

URL = "https://yyzymgkdpqevkuhowjci.supabase.co/rest/v1/wallets"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
HEADERS = {"apikey": KEY, "Authorization": f"Bearer {KEY}"}

def audit():
    # Menarik jumlah total baris secara eksplisit
    try:
        r_total = requests.get(f"{URL}?select=count", headers=HEADERS)
        total = r_total.json()[0]['count'] if isinstance(r_total.json(), list) else "Error"
        
        # Menarik jumlah warga aktif
        r_active = requests.get(f"{URL}?status=ilike.*ACTIVE*&select=count", headers=HEADERS)
        active = r_active.json()[0]['count'] if isinstance(r_active.json(), list) else "Error"
        
        print("\n--- [ VERIFIKASI DATA NEUROSPHERE ] ---")
        print(f"📊 Total Populasi Ledger : {total}")
        print(f"✅ Warga Aktif Terdeteksi : {active}")
        print("---------------------------------------")
        
        if int(active) < 70000:
             print("💡 Catatan: Jika angka lebih rendah dari 79rb, kemungkinan besar status")
             print("   warga lama perlu di-sinkronisasi ulang ke format 'ACTIVE_STREAMING'.")
    except Exception as e:
        print(f"⚠️ Gagal menarik data: {e}")

if __name__ == "__main__":
    audit()
