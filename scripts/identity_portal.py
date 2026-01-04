import json
import os
import sys

def lookup_citizen(citizen_id=None):
    db_path = os.path.expanduser('~/indienation-neurosphere/database/sovereign_identities.json')
    
    if not os.path.exists(db_path):
        print("ERROR: Database identitas belum ditemukan.")
        return

    with open(db_path, 'r') as f:
        data = json.load(f)

    if citizen_id:
        print(f"\n--- Mengakses Sektor 33: Inspeksi ID {citizen_id} ---")
        # Pencarian sederhana untuk simulasi 10 pionir
        found = False
        for person in data['identities']:
            if person['id'] == citizen_id:
                print(f"Status Identitas : VALIDATED")
                print(f"Aura Visual      : {data['visual_engine']}")
                print(f"Saldo Terverifikasi: {person['balance']}")
                print(f"Manifest Nilai   : ENPE, LUV, IND-EUR")
                found = True
                break
        if not found:
            print("Status: ID Tidak Ditemukan atau Belum Terdaftar.")
        print("--------------------------------------------------\n")
    else:
        print(f"\n--- Portal Identitas NeuroSphere ---")
        print(f"Total Database: {len(data['identities'])} Pionir Terdaftar")
        print(f"Status Render: {data['sector_33_status']}")
        print("Gunakan: neuro-portal [Citizen-ID]")

if __name__ == "__main__":
    cid = sys.argv[1] if len(sys.argv) > 1 else None
    lookup_citizen(cid)
