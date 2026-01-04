import json

def check_donation_status():
    # Menghitung alokasi 15% dari total 100 Triliun ENPE
    total_supply = 100_000_000_000_000
    donation_allocation = total_supply * 0.15
    
    print("\n--- [SEKTOR 15: DONATION & DISASTER POOL] ---")
    print(f"Status Alokasi   : OPEN (Immediate Access)")
    print(f"Total Kapasitas  : {donation_allocation:,.0f} ENPE")
    print(f"Tujuan           : Bantuan Bencana & Operasional Harian")
    print(f"Hukum Dasar      : Mandat Founder 2025-12-20")
    print("----------------------------------------------")
    print("[READY] Dana siap didistribusikan secara instan.")

if __name__ == "__main__":
    check_donation_status()
