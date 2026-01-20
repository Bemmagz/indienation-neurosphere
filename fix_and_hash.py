import json
import hashlib

def fix_vault():
    file_path = 'identity_vault.json'
    
    # Memastikan file ada
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        data = {}

    # Memperbaiki Root Keys agar terdeteksi Auditor (Standardization)
    data['handle'] = "FOUNDER-01"
    data['sequence_id'] = "TM-GEN-F69870"
    data['status'] = "LOCKED-3Y"
    
    # Menghapus DNA lama untuk perhitungan bersih
    if 'dna_hash' in data:
        del data['dna_hash']
    
    # Menghitung DNA Hash baru (Kebenaran Absolut)
    # sort_keys=True sangat penting agar hash konsisten di platform manapun
    raw_content = json.dumps(data, sort_keys=True)
    new_hash = hashlib.sha256(raw_content.encode()).hexdigest()
    
    # Memasukkan DNA Hash ke dalam file
    data['dna_hash'] = new_hash
    
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
    
    print(f"\033[92m[SUCCESS]\033[0m identity_vault.json telah disinkronkan.")
    print(f"New DNA Hash: \033[93m{new_hash}\033[0m")

if __name__ == "__main__":
    fix_vault()
