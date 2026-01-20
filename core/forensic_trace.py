import json
import hashlib
import time

def generate_forensic_log(tx_id, action, reason, amount):
    log_entry = {
        "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
        "tx_id": tx_id,
        "action": action,
        "amount": amount,
        "reason": reason,
        "integrity_hash": ""
    }
    # Membuat rantai integritas (Immutable Log)
    raw_data = json.dumps(log_entry).encode()
    log_entry["integrity_hash"] = hashlib.sha256(raw_data).hexdigest()
    
    filename = f"logs/forensic_{tx_id}.json"
    with open(filename, "w") as f:
        json.dump(log_entry, f, indent=4)
    return filename

print("📄 Forensic Engine Ready.")
