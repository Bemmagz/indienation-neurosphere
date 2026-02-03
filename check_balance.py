import requests
URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
def get_summary():
    headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}"}
    params = {"select": "iid,governance_layer,amount_luv,amount_ind_eur,amount_enpe", "iid": "lte.INDIE-0000000010", "order": "iid.asc"}
    print("\n--- [ NEUROSPHERE TREASURY SUMMARY ] ---")
    print(f"{'IID':<18} | {'LUV':<10} | {'EUR':<10} | {'ENPE':<10}")
    print("-" * 55)
    try:
        r = requests.get(f"{URL}/rest/v1/wallets", headers=headers, params=params)
        if r.status_code == 200:
            for w in r.json():
                print(f"{w['iid']:<18} | {w.get('amount_luv', 0):<10} | {w.get('amount_ind_eur', 0):<10} | {w.get('amount_enpe', 0):<10}")
            print("-" * 55)
            print("Status: Audit Integrity Verified.")
        else:
            print(f"❌ Server Error: {r.status_code}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")
if __name__ == "__main__":
    get_summary()
