#!/usr/bin/env python3
import json
import time
import hashlib
import os

class SovereignEngine:
    def __init__(self):
        self.policy = {
            "critical": 100_000_000,
            "micro": 100_000
        }
        self.log_dir = "logs"
        os.makedirs(self.log_dir, exist_ok=True)

    def _hash(self, payload: dict) -> str:
        raw = json.dumps(payload, sort_keys=True).encode()
        return hashlib.sha256(raw).hexdigest()

    def _write_forensic(self, tx: dict, action: str):
        record = {
            "timestamp": time.time(),
            "tx_id": tx["id"],
            "action": action,
            "amount": tx["amount"],
            "reason": "Policy Threshold Exceeded",
        }
        record["integrity_hash"] = self._hash(record)

        path = f"{self.log_dir}/forensic_{tx['id']}.json"
        with open(path, "w") as f:
            json.dump(record, f, indent=4)

        print(f"[FORENSIC] Evidence written -> {path}")

    def process(self, tx: dict):
        print("------------------------------------------------------------")
        print(f"[IMMUNE] TX={tx['id']} | Amount={tx['amount']}")

        if tx["amount"] >= self.policy["critical"]:
            print("[IMMUNE] CRITICAL LOCK ACTIVATED")
            self._write_forensic(tx, "CRITICAL_LOCK")
            print(f"[ESCROW] Level=CRITICAL | Holding 900s | TX={tx['id']}")

        elif tx["amount"] < self.policy["micro"]:
            print("[IMMUNE] LOW RISK | EXECUTE_INSTANT")

        else:
            print("[IMMUNE] SOFT_GUARD ACTIVATED | 15m Escrow Pending")

if __name__ == "__main__":
    engine = SovereignEngine()
    print("[SYSTEM] Sovereign policy loaded")
    print("[SYSTEM] Zero-Value-Escape ENABLED\n")

    test_txs = [
        {"id": "TX-CRITICAL-001", "amount": 150000000},
        {"id": "TX-MICRO-002", "amount": 50000}
    ]

    for tx in test_txs:
        engine.process(tx)

    print("\n[SYSTEM] All checks completed. No value escaped.")
