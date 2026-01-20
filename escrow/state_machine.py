import time

class EscrowContainer:
    def __init__(self, tx_id, amount, origin):
        self.tx_id = tx_id
        self.amount = amount
        self.origin = origin
        self.start_time = time.time()
        self.status = "PENDING"
        self.timeout = 900 # 15 Menit

    def check_status(self):
        elapsed = time.time() - self.start_time
        if elapsed > self.timeout:
            self.status = "AUTO_REVERT"
            return False, f"🕒 Timeout! {int(elapsed)}s passed. Returning to {self.origin}."
        return True, "⏳ Staging: Awaiting Bio-Verification."

# Instansiasi untuk audit trial
container = EscrowContainer("TX-AUDIT-001", 150000000, "Armiro_Wallet")
