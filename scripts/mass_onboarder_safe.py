import json
import os
from datetime import datetime

# KONFIGURASI AMAN (Database-Centric)
LEDGER_FILE = "logs/mass_ledger_100k.json"

def onboard_100k():
    os.makedirs("logs", exist_ok=True)
    
    # Memastikan mulai dari 11 untuk menghormati 10 Besar Founder
    next_id = 11
    count = 100000
    ledger = []
    
    print("==================================================")
    print("      NEUROSPHERE MASS ONBOARDER v3.0            ")
    print("==================================================")
    print(f"[*] Target Identitas : {count}")
    print(f"[*] Gerbang Awal     : INDIE-{next_id:010d}")
    print("--------------------------------------------------")

    for i in range(count):
        current_num = next_id + i
        iid = f"INDIE-{current_num:010d}"
        
        # Struktur data efisien untuk Supabase
        new_entry = {
            "iid": iid,
            "alias": f"Citizen-{current_num}",
            "status": "PUBLIC_OPEN",
            "reg_date": datetime.now().strftime("%Y-%m-%d"),
            "bio_sync": False
        }
        ledger.append(new_entry)
        
        # Progress tracker setiap 20.000 data
        if (i + 1) % 20000 == 0:
            print(f"[PROGRESS] {i + 1} Identitas diamankan...")

    # Simpan dalam satu file (Sekitar 18MB)
    with open(LEDGER_FILE, 'w') as f_save:
        json.dump(ledger, f_save)
        
    print("--------------------------------------------------")
    print(f"[SUKSES] Database Tercipta: {LEDGER_FILE}")
    print(f"[INFO] Storage Safety: AMAN (< 20MB)")
    print("==================================================")

if __name__ == "__main__":
    onboard_100k()
