#!/usr/bin/env python3
import json, os, sys, time

VAULT_PATH = "/data/data/com.termux/files/home/indienation-neurosphere/identity_vault.json"

def validate_tm(seq_id, asset):
    if not os.path.exists(VAULT_PATH):
        print("FATAL: VAULT_NOT_FOUND")
        return 1

    with open(VAULT_PATH, "r") as f:
        vault = json.load(f)

    current_id = vault.get("identity", {}).get("sequence_id")
    assets = vault.get("assets", {})

    if seq_id != current_id:
        print(f"VALIDATION_FAILED: ID '{seq_id}' tidak cocok dengan Sovereign Node ini.")
        return 2

    if asset not in assets:
        print(f"DIALECT_ERROR: Aset '{asset}' bukan bagian dari TM di node ini.")
        return 3

    return 0

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: tm_validator.py <SEQUENCE_ID> <ASSET>")
        sys.exit(1)

    seq = sys.argv[1]
    ast = sys.argv[2]

    status = validate_tm(seq, ast)

    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] ID={seq} ASSET={ast} STATUS={status}")

    sys.exit(status)
