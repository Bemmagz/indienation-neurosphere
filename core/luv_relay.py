import json
import os
import random
import time
from datetime import datetime

class LuvDistributor:
    def __init__(self):
        self.vault_path = "vault/nfts"
        self.log_path = "logs/luv_distribution.json"
        os.makedirs("logs", exist_ok=True)

    def relay_kindness(self, sender_nft_id):
        path = f"{self.vault_path}/{sender_nft_id}.json"
        if not os.path.exists(path):
            return "❌ NFT ID tidak ditemukan."

        with open(path, 'r+') as f:
            data = json.load(f)
            
            # Algoritma Keys of Kindness (0-10 LUV per estafet)
            amount = random.randint(1, 10) 
            
            current_luv = data["tm_contents"]["luv_social"]
            if current_luv < amount:
                return "❌ Saldo LUV tidak mencukupi untuk estafet."

            # Eksekusi Pengurangan Saldo (Founder/Sender)
            data["tm_contents"]["luv_social"] -= amount
            data["evolution"]["last_relay"] = datetime.now().isoformat()
            
            # Simpan Perubahan
            f.seek(0)
            json.dump(data, f, indent=4)
            f.truncate()

            # Forensic Log untuk Distribusi
            log_entry = {
                "timestamp": datetime.now().isoformat(),
                "event": "LUV_RELAY_KINDNESS",
                "from": sender_nft_id,
                "amount": amount,
                "unit": "LUV",
                "remaining_pool": data["tm_contents"]["luv_social"]
            }
            
            with open(self.log_path, 'a') as log_file:
                log_file.write(json.dumps(log_entry) + "\n")

            return f"✅ Estafet Berhasil! {amount} LUV telah didistribusikan dari {sender_nft_id}."

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        distro = LuvDistributor()
        print(distro.relay_kindness(sys.argv[1]))
