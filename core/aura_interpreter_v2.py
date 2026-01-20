import time
from forensic_trace import generate_forensic_log

def run_immune_response(tx_data):
    amount = tx_data['amount']
    print(f"\n--- 🛡️ NEUROSPHERE IMMUNE SYSTEM v2.0 ---")
    
    if amount > 100000000:
        print("🚨 CRITICAL_LOCK: Policy Threshold Exceeded.")
        log_file = generate_forensic_log(
            tx_data['id'], 
            "CRITICAL_LOCK", 
            "Value > 100M | Awaiting Hard KYC", 
            amount
        )
        print(f"🔒 Status: Funds Staged in Escrow.")
        print(f"📄 Evidence Saved: {log_file}")
        return "STAGED_IN_ESCROW"
    
    return "PROCESSED"

# Test Case
run_immune_response({'id': 'TX-999', 'amount': 150000000})
