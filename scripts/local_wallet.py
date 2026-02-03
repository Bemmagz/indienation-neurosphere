import json
import datetime
import os

WALLET_FILE = 'state/my_local_wallet.json'

def update_wallet():
    now = datetime.datetime.now().strftime("%Y-%m-%d")
    
    # Load data lama jika ada
    if os.path.exists(WALLET_FILE):
        with open(WALLET_FILE, 'r') as f:
            data = json.load(f)
    else:
        data = {"iid": "INDIE-0000000001", "balance": 0, "history": []}

    # Cek apakah hari ini sudah klaim
    last_claim = data['history'][-1]['date'] if data['history'] else ""
    
    if last_claim == now:
        print(f"Status: Anda sudah melakukan kebaikan hari ini. Saldo: €{data['balance']}")
        return

    # Logika Angka Harian
    claim_count = len(data['history']) + 1
    amount = 1000 if claim_count == 1 else 270
    
    # Update Saldo
    data['balance'] += amount
    data['history'].append({"date": now, "amount": amount, "note": "Daily Kindness Grant"})
    
    with open(WALLET_FILE, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Berhasil! Hari ke-{claim_count} telah dicatat. Tambah €{amount}. Total: €{data['balance']}")

update_wallet()
