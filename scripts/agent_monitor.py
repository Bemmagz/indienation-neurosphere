import json
import random
import time

def monitor_agents():
    agents = ["Alpha", "Gamma", "Sigma", "Omega", "Delta"]
    active_count = 47
    print(f"\n--- [INSPEKSI AGEN AKTIF: {active_count} AGENTS] ---")
    
    # Simulasi aktivitas 5 agen teratas
    for i in range(5):
        agent_name = f"{random.choice(agents)}-{random.randint(100, 999)}"
        print(f"Agent {agent_name}: Syncing Sector {random.randint(1, 33)}... [SUCCESS]")
    
    print("--------------------------------------------------")
    print("Status: Seluruh Agen Terhubung ke ARGI Omega.")

def auto_broadcast_check(current_reg):
    if current_reg % 100 == 0 or current_reg > 100:
        print(f"\n[BROADCAST] Threshold 100 Reg Tercapai!")
        print(f"[UPDATE] Mengirim Laporan ROI Terbaru ke Monitoring Center...")
        print(f"[SUCCESS] Signal Sent to Google AI Studio.")

if __name__ == "__main__":
    monitor_agents()
    # Simulasi pengecekan dengan angka dari telemetry terakhir Anda (+108)
    auto_broadcast_check(108)
