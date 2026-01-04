import json

status = {
    "identity": "NeuroSphere Sovereign Engine",
    "enpe_supply": "100 Trillion (E Coin)",
    "luv_distribution": "1% for 1 Million People (1M LUV/each)",
    "stable_coin": "IND-EUR (Unlimited)",
    "lock_status": {
        "founder": "3 Years Locked",
        "assets_general": "2 Years Locked",
        "donation_pool": "OPEN (15%)",
        "disaster_pool": "OPEN (15%)"
    },
    "unified_identity": "Technology Money (TM)"
}
print(json.dumps(status, indent=4))
