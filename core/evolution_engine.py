import json
import os
import hashlib
import time

def generate_ascii_qr(data):
    """Simulasi QR Code ASCII untuk Trademark Forehead"""
    border = "╔" + "═" * 21 + "╗"
    footer = "╚" + "═" * 21 + "╝"
    # Menggunakan hash data untuk menciptakan pola visual unik
    h = hashlib.md5(data.encode()).hexdigest()
    pattern = []
    for i in range(0, 30, 6):
        line = "║ "
        for j in range(5):
            char = "█" if int(h[i+j], 16) > 7 else " "
            line += char * 3 + " "
        line += "║"
        pattern.append(line)
    
    return f"{border}\n" + "\n".join(pattern) + f"\n{footer}"

def evolve_nft(nft_id):
    path = f"vault/nfts/{nft_id}"
    if not os.path.exists(path):
        return None
    
    with open(path, 'r+') as f:
        data = json.load(f)
        # Logika Evolusi: Upgrade Stage
        stages = ["Living Value Identity", "Social Reputation Layer", "Hyper-Realistic Avatar", "Inheritable Legacy"]
        current_stage = data.get("evolution", {}).get("stage", stages[0])
        
        try:
            next_idx = stages.index(current_stage) + 1
            if next_idx < len(stages):
                data["evolution"]["stage"] = stages[next_idx]
                data["evolution"]["last_evolved"] = time.ctime()
                # Update DNA Hash karena konten berubah
                raw_data = json.dumps(data, sort_keys=True).encode()
                data["dna_hash"] = hashlib.sha256(raw_data).hexdigest()
                
                f.seek(0)
                json.dump(data, f, indent=4)
                f.truncate()
                return data
        except ValueError:
            pass
    return data

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 2 and sys.argv[1] == "qr":
        print(generate_ascii_qr(sys.argv[2]))
    elif len(sys.argv) > 2 and sys.argv[1] == "evolve":
        res = evolve_nft(sys.argv[2])
        if res:
            print(f"✅ NFT Evolved to: {res['evolution']['stage']}")
