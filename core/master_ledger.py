import json
import os
import hashlib

class MasterLedger:
    def __init__(self):
        self.genesis_supply = 100_000_000_000_000
        self.vault_path = "vault/nfts"
        self.log_path = "logs"
        self.pools = {
            "DONATION": 0.15,
            "RESERVE": 0.10,
            "FOUNDER": 0.75  # Sesuai kesepakatan, dikurangi 1% LUV
        }

    def verify_integrity(self, nft_data):
        # Membuktikan Immutability: Cek apakah DNA Hash cocok dengan konten
        temp_data = nft_data.copy()
        original_hash = temp_data.pop("dna_hash", None)
        raw_data = json.dumps(temp_data, sort_keys=True).encode()
        current_hash = hashlib.sha256(raw_data).hexdigest()
        return original_hash == current_hash

    def run_audit(self):
        print("\n" + "═"*60)
        print("📊 NEUROSPHERE SOVEREIGN AUDIT REPORT (POST-QUANTUM)")
        print("═"*60)
        
        total_minted = 0
        pioneers = []
        
        if os.path.exists(self.vault_path):
            for file in os.listdir(self.vault_path):
                with open(f"{self.vault_path}/{file}", 'r') as f:
                    nft = json.load(f)
                    total_minted += nft["tm_contents"]["enpe_native"]
                    
                    # Verifikasi Immutable
                    status = "✅ VALID" if self.verify_integrity(nft) else "❌ COMPROMISED"
                    pioneers.append({
                        "id": nft["nft_id"],
                        "owner": nft["owner_identity"],
                        "enpe": nft["tm_contents"]["enpe_native"],
                        "status": status
                    })

        # Summary Supply
        print(f"CORE SUPPLY STATUS:")
        print(f" • Total Genesis : {self.genesis_supply:,} ENPE")
        print(f" • Total Circulating: {total_minted:,} ENPE")
        print(f" • Real-time Reserve: {self.genesis_supply - total_minted:,} ENPE")
        print("-" * 60)
        
        # Pioneer Ledger
        print(f"PIONEER WALLET HOLDER LEDGER:")
        if not pioneers:
            print(" [!] No claims detected yet.")
        for p in pioneers:
            print(f" • [{p['status']}] {p['owner']} | {p['id']} | Balance: {p['enpe']:,} ENPE")
        
        print("-" * 60)
        print(f"AUDIT CONCLUSION: SYSTEM IS {'CONSISTENT' if total_minted < self.genesis_supply else 'OVERFLOW ERROR'}")
        print("═"*60 + "\n")

if __name__ == "__main__":
    ledger = MasterLedger()
    ledger.run_audit()
