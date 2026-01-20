import time

def auralang_guard(amount, signature_valid, kyc_status):
    # FLOW B: < 100K (FREE FLOW)
    if amount < 100000:
        return "EXECUTE_DIRECT", "🟢 Cair & Tanpa Friksi"

    # FLOW C & D: 100K - 100M (GUARDED)
    print(f"\n[NEURALANG] Monitoring Transaction: {amount}")
    print("[AURALANG] Entering Escrow TM Container (15 Min Window)")
    
    # Simulasi Verifikasi
    if not signature_valid:
        return "REVERT", "🚨 Signature Invalid! Uang Pulang."
    
    if amount > 100000000: # FLOW E: > 100M
        print("[CRITICAL LOCK] Full KYC & AI Verdict Required.")
        if kyc_status == "VERIFIED":
            return "EXECUTE", "✅ Verified. Transaction Success."
        else:
            return "REVERT", "🔁 Not Verified. Uang Otomatis Pulang."
            
    return "PENDING", "🟡 Waiting for 3FA/Device Confirm..."

# Simulasi Testing OPS 2
res, msg = auralang_guard(150000000, True, "NOT_VERIFIED")
print(f"RESULT: {res} | MSG: {msg}")
