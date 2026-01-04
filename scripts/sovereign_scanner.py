import json
import os
import time

def scan_identity(citizen_id):
    db_path = os.path.expanduser('~/indienation-neurosphere/database/sovereign_identities.json')
    
    print(f"\n[SCANNING] Menginisialisasi Sensor Biometrik...")
    time.sleep(0.5)
    print(f"[SCANNING] Membaca QR Code & Hash Algoritma...")
    time.sleep(0.5)

    if not os.path.exists(db_path):
        print("ERROR: Database Pusat tidak terdeteksi. Jalankan 'export_aura.py'!")
        return

    with open(db_path, 'r') as f:
        data = json.load(f)

    found = False
    for person in data['identities']:
        if person['id'] == citizen_id:
            print("\n" + "="*48)
            print(f"      IDENTITY VALIDATED: {citizen_id}")
            print("="*48)
            print(f" Status Identitas  : PIONEER - LVI VALID")
            print(f" Pancaran Aura     : {data['visual_engine']}")
            print(f" Alokasi Nilai     : {person['balance']}")
            print(f" Dialek Ekonomi    : ENPE, LUV, IND-EUR")
            print(f" Protokol Warisan  : ENABLED (QR-SYNC)")
            print("="*48)
            print("[SUCCESS] Akses Kedaulatan Diberikan.\n")
            found = True
            break
    
    if not found:
        print("\n[ALERT] Identitas TIDAK dikenali. Akses Ditolak.")

if __name__ == "__main__":
    scan_identity("NS-000001")
