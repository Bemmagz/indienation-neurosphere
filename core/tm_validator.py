#!/usr/bin/env python3
import sys, json, os, time

VAULT_PATH = os.path.expanduser(os.path.join(os.path.dirname(__file__), "../identity_vault.json"))

def validate_tm(seq_id, asset):
    if not os.path.exists(VAULT_PATH):
        print("VAULT_NOT_FOUND")
        return 1
    with open(VAULT_PATH, "r") as f:
        vault_data = json.load(f)
    current_id = vault_data.get("identity", {}).get("sequence_id")
    if seq_id != current_id:
        print(f"VALIDATION_FAILED: ID '{seq_id}' tidak cocok dengan Sovereign Node ini.")
        return 2
    available_assets = vault_data.get("assets", {})
    if asset not in available_assets:
        print(f"DIALECT_ERROR: Aset '{asset}' tidak tersedia di node ini.")
        return 2
    return 0

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: tm_validator.py <SEQUENCE_ID> <ASSET>")
        sys.exit(1)
    seq = sys.argv[1]
    ast = sys.argv[2]
    status = validate_tm(seq, ast)
    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{ts}] ID={seq} ASSET={ast} STATUS={status}")
    sys.exit(status)
