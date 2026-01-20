import time
import collections

class NeuroSphereEngine:
    def __init__(self):
        self.history = collections.deque()
        self.is_global_frozen = False
        self.threshold_count = 10  # Maksimal 10 tx kecil dalam durasi singkat
        self.window_seconds = 30   # Durasi pengawasan (detik)

    def assess_risk(self, amount):
        now = time.time()
        # Bersihkan riwayat yang sudah lama
        while self.history and now - self.history[0] > self.window_seconds:
            self.history.popleft()
        
        self.history.append(now)
        
        # Deteksi Serangan Fragmentasi (seribu, seribu, seribu...)
        if len(self.history) > self.threshold_count:
            return "CRITICAL_ENTROPY_SPIKE"
        
        if amount > 100000:
            return "HIGH_VALUE_PENDING"
            
        return "LOW_RISK_FLOW"

    def process_transaction(self, amount, currency):
        if self.is_global_frozen:
            print(f"❌ [ALERT] System is GLOBAL FROZEN. Cannot process {amount} {currency}.")
            return

        risk = self.assess_risk(amount)
        
        print(f"\n[NEURALANG] Analyzing: {amount} {currency}...")
        
        if risk == "CRITICAL_ENTROPY_SPIKE":
            self.is_global_frozen = True
            print("🚨 [AURALANG] DETECTION: FRAGMENTATION ATTACK (Anti-Circumvention Triggered)!")
            print("🚨 [STATUS] GLOBAL FREEZE ACTIVATED. 60s Bumerang Protocol engaged.")
            print("🚨 [ACTION] All pending funds returning to Armiro...")
        
        elif risk == "HIGH_VALUE_PENDING":
            print(f"🟡 [AURALANG] High Value Detected. Escrowing for 60s...")
            # Simulasi Bumerang Logic
            confirm = input("Confirm Aura Signature (y/n)? ")
            if confirm.lower() == 'y':
                print("✅ [RESULT] Executed.")
            else:
                print("🔁 [RESULT] Timeout/Fail. Returning to Origin.")
        
        else:
            print("🟢 [AURALANG] Low Risk. Executed Instantly.")

# --- SIMULASI ---
engine = NeuroSphereEngine()

# Simulasi transaksi normal
engine.process_transaction(5000, "ENPE")
time.sleep(1)

# Simulasi serangan "seribu, seribu, seribu" secara cepat
print("\n--- ATTACKER INITIATING FRAGMENTATION (1.000 x 12) ---")
for i in range(12):
    engine.process_transaction(1000, "ENPE")
    if engine.is_global_frozen:
        break

