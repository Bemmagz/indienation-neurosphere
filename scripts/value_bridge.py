import json
import os

def update_bursa_roi(citizen_id):
    # Simulasi kenaikan nilai saat identitas baru tervalidasi
    increment_roi = 500  # Setiap scan menambah nilai utilitas bursa
    
    print(f"[BRIDGE] Menghubungkan ID {citizen_id} ke Sektor 11...")
    print(f"[BRIDGE] Mengirim sinyal distribusi ke Sektor 24...")
    print(f"[SUCCESS] ROI Accumulation Updated: +Rp {increment_roi}")

if __name__ == "__main__":
    update_bursa_roi("NS-000001")
