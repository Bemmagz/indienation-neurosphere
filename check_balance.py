import requests

URL = "https://yyzymgkdpqevkuhowjci.supabase.co/rest/v1/wallets"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
HEADERS = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Prefer": "count=exact"}

def real_audit():
    # Menghitung yang BENAR-BENAR aktif (Bukan INACTIVE)
    r = requests.get(f"{URL}?status=eq.ACTIVE_STREAMING&select=iid", headers=HEADERS)
    count = r.headers.get("Content-Range", "0-0/0").split("/")[-1]
    
    print("\n--- [ REAL-TIME SOVEREIGNTY REPORT ] ---")
    print(f"✅ Warga Aktif (Real) : {count}")
    print(f"💤 Warga Inaktif      : {100014 - int(count)}")
    print("----------------------------------------\n")

if __name__ == "__main__":
    real_audit()
