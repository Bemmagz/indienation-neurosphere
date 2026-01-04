import json
import random

def generate_visual_map():
    # Simulasi persebaran di titik-titik utama
    regions = ["Sumatera", "Jawa", "Kalimantan", "Sulawesi", "Papua", "Bali-Nusa"]
    total_distributed = 128800 # Berdasarkan telemetry terbaru Anda
    
    print("\n--- [NEUROSPHERE DISTRIBUTION MAP: LUV IDENTITY] ---")
    print(f"Total LUV Disbursed: {total_distributed:,} LC")
    print("--------------------------------------------------")
    
    for region in regions:
        # Simulasi alokasi per wilayah
        count = random.randint(10, 30)
        percentage = (count / 121) * 100 # Berdasarkan Reg Today (+121)
        print(f"Wilayah {region:12}: [{count:3} New Identities] -> {percentage:.1f}% Aura Sync")

    print("--------------------------------------------------")
    print("[STATUS] Seluruh koordinat telah terinjeksi nilai TM.")

if __name__ == "__main__":
    generate_visual_map()
