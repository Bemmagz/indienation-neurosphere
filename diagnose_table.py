import requests

URL = "https://yyzymgkdpqevkuhowjci.supabase.co/rest/v1/wallets"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
HEADERS = {"apikey": KEY, "Authorization": f"Bearer {KEY}"}

def check_samples():
    # Ambil 5 data teratas dan 5 data terbawah untuk verifikasi identitas
    r = requests.get(f"{URL}?select=iid,status&order=iid.asc&limit=5", headers=HEADERS)
    print("\n--- [ SAMPEL AWAL (RIIL) ] ---")
    print(r.json())
    
    r_last = requests.get(f"{URL}?select=iid,status&order=iid.desc&limit=5", headers=HEADERS)
    print("\n--- [ SAMPEL AKHIR (RIIL) ] ---")
    print(r_last.json())

if __name__ == "__main__":
    check_samples()
