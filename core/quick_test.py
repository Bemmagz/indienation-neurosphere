import time
import sys
import os

# Menambahkan path agar bisa import dari folder yang sama
sys.path.append(os.path.dirname(__file__))
from engine import SovereignEngine

def manual_input_test():
    engine = SovereignEngine()
    print("\n" + "="*40)
    print("⚡ NEUROSPHERE QUICK TEST (MANUAL)")
    print("="*40)
    try:
        amount_input = input("Enter ENPE Amount: ")
        amount = int(amount_input.replace(',', ''))
        tx_id = f"TX-MANUAL-{int(time.time())}"
        tx = {"id": tx_id, "amount": amount}
        print(f"\n[SYSTEM] Processing {amount} ENPE...")
        time.sleep(1)
        engine.process(tx)
    except Exception as e:
        print(f"❌ Error: {e}")
    read = input("\nPress Enter to return...")

if __name__ == "__main__":
    manual_input_test()
