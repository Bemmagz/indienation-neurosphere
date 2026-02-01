import json
import os
from datetime import datetime

def calculate_balance():
    # Konstitusi Genesis: 01-02-2026
    genesis = datetime(2026, 2, 1)
    now = datetime.now()
    diff_days = (now - genesis).days + 1
    
    if diff_days == 1:
        return 1000
    elif diff_days < 365:
        return 1000 + (diff_days - 1) * 270
    else:
        return 100000

def audit():
    current_balance = calculate_balance()
    pioneer_file = 'logs/pioneer_ledger.json'
    
    # Hitung total distribusi
    total_pioneers = 0
    if os.path.exists(pioneer_file):
        with open(pioneer_file, 'r') as f:
            total_pioneers = len(json.load(f))
    
    total_distributed_eur = total_pioneers * current_balance

    print("==================================================")
    print("   NEUROSPHERE SOVEREIGN AUDIT SYSTEM v1.2        ")
    print("==================================================")
    print(f"Timestamp : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Epoch     : 0 (The Beginning)")
    print("--------------------------------------------------")
    print(f"[1] SCANNING PIONEERS: {total_pioneers} Identities")
    print(f"[2] INDIVIDUAL GRANT : €{current_balance:,}")
    print(f"[3] TOTAL IN CIRCULATION: €{total_distributed_eur:,}")
    print("--------------------------------------------------")
    print("[STATUS]: ECONOMIC FLOW IS LIVE")
    print("==================================================")

if __name__ == "__main__":
    audit()
