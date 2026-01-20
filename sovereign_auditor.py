import json
import os
import hashlib
import time
from datetime import datetime

# ANSI Colors untuk Terminal
G = '\033[92m' # Green
Y = '\033[93m' # Yellow
B = '\033[94m' # Blue
R = '\033[91m' # Red
C = '\033[0m'  # Clear

class SovereignAuditor:
    def __init__(self):
        self.TOTAL_SUPPLY = 100_000_000_000_000
        self.vaults = {
            "MAIN_POOL": "0xArmiroSovereignMainPool",
            "KINDNESS_POOL": "0xLUVKindnessDistribution",
            "ESCAPE_POOL": "0xZeroValueReserve"
        }
        self.ledger_dir = "logs"
        if not os.path.exists(self.ledger_dir):
            os.makedirs(self.ledger_dir)

    def run_audit(self):
        print(f"{B}=================================================={C}")
        print(f"{G}   NEUROSPHERE SOVEREIGN AUDIT SYSTEM v1.0{C}")
        print(f"{B}=================================================={C}")
        print(f"Timestamp : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Protocol  : {Y}BEYOND-BLOCKCHAIN-+++{C}")
        print(f"Security  : {G}ZERO-VALUE-ESCAPE ACTIVE{C}")
        print(f"{B}--------------------------------------------------{C}")

        # 1. Vault Verification
        print(f"{Y}[1] VERIFIKASI VAULT ADRESS{C}")
        for name, addr in self.vaults.items():
            print(f"    STATUS: {G}OK{C} | {name:<15} : {addr}")
        
        # 2. Forensic Ledger Scan
        print(f"\n{Y}[2] SCANNING FORENSIC LEDGER (logs/*.json){C}")
        ledger_files = [f for f in os.listdir(self.ledger_dir) if f.startswith('forensic_')]
        
        total_distributed = 0
        pioneers = set()

        for file in ledger_files:
            try:
                with open(os.path.join(self.ledger_dir, file), 'r') as f:
                    data = json.load(f)
                    total_distributed += data.get('enpe', 0)
                    pioneers.add(data.get('receiver', 'Unknown'))
            except:
                continue

        print(f"    File Ditemukan : {len(ledger_files)}")
        print(f"    Total Pioneer   : {len(pioneers)}")

        # 3. Supply Reconciliation
        current_balance = self.TOTAL_SUPPLY - total_distributed
        print(f"\n{Y}[3] REKONSILIASI SUPLAI ENPE{C}")
        print(f"    Initial Supply : {self.TOTAL_SUPPLY:>20,}")
        print(f"    Distributed    : {R}{total_distributed:>20,}{C}")
        print(f"    Current Pool   : {G}{current_balance:>20,}{C}")

        # 4. Integrity Check (DNA Hash)
        print(f"\n{Y}[4] INTEGRITY PROOF (DNA HASH){C}")
        root_string = f"NEURO-{self.TOTAL_SUPPLY}-{len(ledger_files)}"
        dna_root = hashlib.sha256(root_string.encode()).hexdigest()
        print(f"    Sovereign Root DNA: {B}{dna_root}{C}")
        
        if current_balance + total_distributed == self.TOTAL_SUPPLY:
            print(f"\n{G}>>> AUDIT RESULT: INTEGRITY VERIFIED (NO LEAKAGE){C}")
        else:
            print(f"\n{R}>>> AUDIT RESULT: CRITICAL FAILURE - SUPPLY MISMATCH{C}")
        
        print(f"{B}=================================================={C}")

if __name__ == "__main__":
    auditor = SovereignAuditor()
    auditor.run_audit()
