import json
import os
from datetime import datetime
import hashlib

# Konfigurasi Path Termux
CERT_DIR = "vault/certificates"
LEDGER_FILE = "logs/pioneer_ledger.json"

def get_next_id():
    # Mengambil ID terakhir dari ledger secara aman
    if not os.path.exists(LEDGER_FILE):
        return 11
    try:
        with open(LEDGER_FILE, 'r') as f:
            data = json.load(f)
            if not data: return 11
            last_id_str = data[-1]['iid']
            last_num = int(last_id_str.split('-')[1])
            # Pastikan tidak pernah mengusik IID 01-10
            return max(11, last_num + 1)
    except (IndexError, ValueError, json.JSONDecodeError):
        return 11

def onboard_users(count):
    # Pastikan folder tersedia
    os.makedirs(CERT_DIR, exist_ok=True)
    os.makedirs("logs", exist_ok=True)
    
    next_id = get_next_id()
    
    # Load ledger lama atau buat baru jika hilang
    if os.path.exists(LEDGER_FILE):
        with open(LEDGER_FILE, 'r') as f:
            ledger = json.load(f)
    else:
        ledger = []

    print(f"\n[!] Memulai Onboarding {count} Warga Baru...")

    for i in range(count):
        current_num = next_id + i
        iid = f"INDIE-{current_num:010d}"
        reg_hash = hashlib.sha256(iid.encode()).hexdigest()[:16]
        
        # 1. Update Ledger Data
        new_entry = {
            "iid": iid,
            "alias": f"Citizen-{current_num}",
            "status": "PUBLIC_OPEN",
            "reg_date": datetime.now().strftime("%Y-%m-%d")
        }
        ledger.append(new_entry)
        
        # 2. Generate Certificate File (Ringan & Cepat)
        cert_path = os.path.join(CERT_DIR, f"CERT_{iid}.txt")
        with open(cert_path, 'w') as f_cert:
            f_cert.write(f"""
==================================================
       NEUROSPHERE CITIZEN CERTIFICATE
==================================================
IID          : {iid}
OWNER NAME   : [OPEN FOR REGISTRATION]
STATUS       : PUBLIC_OPEN (AUTO-GENERATED)
GRANT VALUE  : €100,000 (Maturity Stage)
DAILY FLOW   : €270/Day
REG-HASH     : {reg_hash}
DATE         : {datetime.now().strftime("%Y-%m-%d")}
==================================================
""")
            
    # Save updated ledger secara permanen
    with open(LEDGER_FILE, 'w') as f_save:
        json.dump(ledger, f_save, indent=2)
        
    print(f"DONE: IID {next_id} s/d {next_id + count - 1} SECURED.")
    print(f"LOKASI: {CERT_DIR}/\n")

if __name__ == "__main__":
    try:
        num = int(input("Masukkan jumlah warga baru yang ingin didaftarkan: "))
        onboard_users(num)
    except ValueError:
        print("Error: Masukkan angka yang valid!")
