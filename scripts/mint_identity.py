import json
import uuid

def generate_identity(count):
    identities = []
    for i in range(1, count + 1):
        uid = str(uuid.uuid4())[:8]
        identities.append({
            "citizen_id": f"NS-{uid}-{i:06d}",
            "claim_status": "READY",
            "allocated_luv": 1000000,
            "aura_type": "Gold-Tech",
            "tm_manifest": ["ENPE", "LUV", "IND-EUR"]
        })
    return identities

pioneers = generate_identity(10)
print(json.dumps({"status": "SUCCESS", "minted_batch": pioneers}, indent=4))
