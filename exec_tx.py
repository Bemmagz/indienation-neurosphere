import requests
URL = "https://yyzymgkdpqevkuhowjci.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
def run():
    print("\n--- [ NEUROSPHERE EXECUTIVE TX v2.0 ] ---")
    to = input("Target IID: ")
    luv = input("Amount LUV: ") or 0
    eur = input("Amount IND-EUR: ") or 0
    enpe = input("Amount ENPE: ") or 0
    purpose = input("Purpose: ").upper()
    payload = {"from_iid": "INDIE-0000000001", "to_iid": to, "amount_luv": int(luv), "amount_ind_eur": int(eur), "amount_enpe": int(enpe), "label": f"EXECUTIVE_ACTION | PURPOSE: {purpose}"}
    headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json", "Prefer": "return=minimal"}
    r = requests.post(f"{URL}/rest/v1/ledger_transactions", json=payload, headers=headers)
    if r.status_code in [201, 204]:
        print("\n✅ TRANSACTION SUCCESSFUL")
    else:
        print(f"\n❌ FAILED: {r.text}")
if __name__ == "__main__":
    run()
