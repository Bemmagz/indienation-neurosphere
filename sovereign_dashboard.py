import json
import os
import glob

def run_dashboard():
    print("\n" + "="*50)
    print("      NEUROSPHERE SOVEREIGN DASHBOARD v2.3")
    print("="*50)

    log_files = glob.glob("logs/forensic_*.json")
    total_tx = len(log_files)
    critical_locks = 0
    total_value_locked = 0

    print(f"{'TX_ID':<20} | {'ACTION':<15} | {'AMOUNT':<15}")
    print("-" * 50)

    for file in log_files:
        with open(file, 'r') as f:
            data = json.load(f)
            tx_id = data.get("tx_id", "N/A")
            action = data.get("action", "N/A")
            amount = data.get("amount", 0)

            if action == "CRITICAL_LOCK":
                critical_locks += 1
                total_value_locked += amount
            
            print(f"{tx_id:<20} | {action:<15} | {amount:<15}")

    print("-" * 50)
    print(f"TOTAL TRANSACTIONS LOGGED : {total_tx}")
    print(f"TOTAL CRITICAL LOCKS      : {critical_locks}")
    print(f"TOTAL VALUE IN ESCROW     : {total_value_locked} ENPE")
    print("="*50 + "\n")

if __name__ == "__main__":
    run_dashboard()
