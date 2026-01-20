import json
import hashlib
import time
import os
from datetime import datetime

class TM_NFT_Container:
    def __init__(self, owner_id):
        self.owner_id = owner_id
        self.vault_path = "vault/nfts"
        os.makedirs(self.vault_path, exist_ok=True)

    def mint_identity(self, enpe_val, luv_val, stable_val):
        timestamp = int(time.time())
        nft_id = f"NFT-TM-{self.owner_id[:5].upper()}-{timestamp}"
        
        # Metadata sesuai kesepakatan NeuroSphere
        metadata = {
            "nft_id": nft_id,
            "owner_identity": self.owner_id,
            "tm_contents": {
                "enpe_native": enpe_val,
                "luv_social": luv_val,
                "stable_anchor": stable_val
            },
            "security": {
                "protocol": "Zero-Value-Escape",
                "timeout_rule": "60s_FAST",
                "trademark": "Forehead-Identity-QR"
            },
            "evolution": {
                "stage": "Living Value Identity",
                "minted_at": datetime.now().isoformat()
            }
        }

        # Generate Hash Keamanan (Digital DNA)
        raw_data = json.dumps(metadata, sort_keys=True).encode()
        metadata["dna_hash"] = hashlib.sha256(raw_data).hexdigest()

        # Simpan ke Vault
        file_path = f"{self.vault_path}/{nft_id}.json"
        with open(file_path, 'w') as f:
            json.dump(metadata, f, indent=4)
        
        return metadata

if __name__ == "__main__":
    print("\n╔════════════════════════════════════════════════════════╗")
    print("║         🎨 NEUROSPHERE NFT-TM GENERATOR               ║")
    print("║         Living Value Identity Container               ║")
    print("╚════════════════════════════════════════════════════════╝\n")
    
    # Baca input dari user
    owner = input("Enter owner identity (e.g., ARMIRO_CHIEF_001): ").strip()
    if not owner:
        owner = "ARMIRO_CHIEF_001"
    
    try:
        enpe_val = float(input("Enter ENPE value: ").strip() or "1000000")
        luv_val = float(input("Enter LUV social value: ").strip() or "5000")
        stable_val = float(input("Enter STABLE anchor value: ").strip() or "100")
    except ValueError:
        print("⚠️  Invalid input, using default values")
        enpe_val = 1000000
        luv_val = 5000
        stable_val = 100
    
    engine = TM_NFT_Container(owner)
    nft = engine.mint_identity(enpe_val, luv_val, stable_val)
    
    print(f"\n✅ NFT-TM MINTED SUCCESSFULLY!")
    print(f"═"*50)
    print(f"🆔 NFT ID: {nft['nft_id']}")
    print(f"👤 Owner: {nft['owner_identity']}")
    print(f"💰 Contents:")
    print(f"   • ENPE Native: {nft['tm_contents']['enpe_native']:,}")
    print(f"   • LUV Social: {nft['tm_contents']['luv_social']:,}")
    print(f"   • STABLE Anchor: {nft['tm_contents']['stable_anchor']:,}")
    print(f"🔐 Security:")
    print(f"   • Protocol: {nft['security']['protocol']}")
    print(f"   • Timeout Rule: {nft['security']['timeout_rule']}")
    print(f"   • Trademark: {nft['security']['trademark']}")
    print(f"🧬 Digital DNA: {nft['dna_hash'][:32]}...")
    print(f"📂 Location: vault/nfts/{nft['nft_id']}.json")
    print(f"═"*50)
    print(f"\n🚀 This NFT-TM now operates under NeuroSphere's 60s timeout")
    print(f"   and Zero-Value-Escape security protocol!")
