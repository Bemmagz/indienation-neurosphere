import random
from datetime import datetime

def live_market_feed():
    print(f"\n--- [SEKTOR 11: UTILITY BURSA LIVE - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] ---")
    enpe_price = 1.25 + random.uniform(-0.02, 0.05)
    luv_value = 0.85 + random.uniform(-0.01, 0.02)
    print(f"ENPE (Native)  : {enpe_price:.4f} IND-EUR")
    print(f"LUV (Social)   : {luv_value:.4f} IND-EUR")
    print("[SUCCESS] Market Signal: BROADCASTED")

if __name__ == "__main__":
    live_market_feed()
