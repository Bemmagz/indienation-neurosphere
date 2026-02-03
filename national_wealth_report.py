import requests

URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}"}

def audit_wealth():
    print("📋 Menghitung Total Kekayaan Nasional NeuroSphere (IND-EUR)...")
    
    # Mengambil total saldo dari seluruh warga
    r = requests.get(f"{URL}/rest/v1/wallets?select=ind_eur_balance,amount_ind_eur", headers=headers)
    data = r.json()
    
    total_liquid = sum(item['ind_eur_balance'] for item in data)
    total_reserve = sum(item['amount_ind_eur'] for item in data)
    
    print(f"\n==========================================")
    print(f"   LAPORAN KEKAYAAN NASIONAL NEUROSPHERE  ")
    print(f"         Tanggal: 2026-02-03             ")
    print(f"==========================================")
    print(f"💰 Total IND-EUR Likuid   : € {total_liquid:,.2f}")
    print(f"🏦 Total Cadangan (Lock)  : € {total_reserve:,.2f}")
    print(f"🌍 Total Aset Ekonomi     : € {total_liquid + total_reserve:,.2f}")
    print(f"==========================================")
    print(f"Status: [MECER & TERKENDALI]")

if __name__ == "__main__":
    audit_wealth()
