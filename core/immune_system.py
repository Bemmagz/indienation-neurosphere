import time
import json
import hashlib

class MonetaryImmuneSystem:
    def __init__(self):
        self.log_chain = [] # Local Forensic Chain

    def get_last_hash(self):
        return self.log_chain[-1]['integrity_hash'] if self.log_chain else "0" * 64

    def generate_legal_log(self, tx_id, action, amount, reason):
        prev_hash = self.get_last_hash()
        log_entry = {
            "timestamp": time.time(),
            "tx_id": tx_id,
            "action": action,
            "amount": amount,
            "reason": reason,
            "prev_hash": prev_hash,
            "rule_id": "AURA-MONETARY-GUARD-V1"
        }
        
        # Create Tamper-Linked Hash
        raw_data = json.dumps(log_entry, sort_keys=True).encode()
        log_entry["integrity_hash"] = hashlib.sha256(raw_data).hexdigest()
        
        self.log_chain.append(log_entry)
        
        with open(f"logs/forensic_{tx_id}.json", "w") as f:
            json.dump(log_entry, f, indent=4)
        return log_entry["integrity_hash"]

class EscrowContainer:
    def __init__(self, tx_id, amount, origin, timeout=15): # 15s untuk simulasi cepat
        self.tx_id = tx_id
        self.amount = amount
        self.origin = origin
        self.start_time = time.time()
        self.timeout = timeout
        self.status = "ESCROWED"

    def check_lifespan(self):
        elapsed = time.time() - self.start_time
        if elapsed > self.timeout:
            self.status = "AUTO_REVERT"
            return False, f"🕒 Time-Lock Expired ({int(elapsed)}s) -> REVERT TO {self.origin}"
        return True, f"⏳ Active in Escrow ({int(self.timeout - elapsed)}s remaining)"

# --- TEST RUN: THE IMMUNE RESPONSE ---
immune = MonetaryImmuneSystem()
print("🛡️ Initializing NeuroSphere Immune System...")

# 1. Detect High Value
tx_id = "TX-999"
amount = 150000000
origin = "OWNER_001"

print(f"\n[ALERT] Detecting Transaction {tx_id}: {amount} ENPE")
immune.generate_legal_log(tx_id, "CRITICAL_LOCK", amount, "Policy Threshold > 100M")

# 2. Start Escrow
escrow = EscrowContainer(tx_id, amount, origin)
print(f"[STATUS] {escrow.status}: Funds staged in secure container.")

# 3. Simulate Time-lapse
print("Waiting for verification or timeout...")
time.sleep(3)
active, msg = escrow.check_lifespan()
print(f"Update: {msg}")
