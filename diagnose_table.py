import requests

URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}"}

def diagnose():
    print("🔍 Memeriksa Struktur Tabel 'wallets'...")
    # Mengambil 1 baris contoh untuk melihat nama kolom yang benar
    r = requests.get(f"{URL}/rest/v1/wallets?select=*&limit=1", headers=headers)
    if r.status_code == 200:
        print("✅ Struktur Kolom Ditemukan:")
        print(r.json())
    else:
        print(f"❌ Gagal mengambil data: {r.status_code}")
        print(r.text)

if __name__ == "__main__":
    diagnose()
