import json

def generate_pioneers(count):
    pioneers = []
    # IID 001 adalah Founder [cite: 2026-02-01]
    for i in range(1, count + 1):
        iid = f"INDIE-{str(i).zfill(10)}"
        pioneers.append({
            "iid": iid,
            "status": "PUBLIC_OPEN",
            "reg_date": "2026-02-01",
            "bio_sync": False
        })
    return pioneers

data = generate_pioneers(100000)
with open('state/pioneer_registry.json', 'w') as f:
    json.dump(data, f, indent=2)

print(f"SUKSES: 100.000 IID Perintis telah diaktivasi dalam registry.")
