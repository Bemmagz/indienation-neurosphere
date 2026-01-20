#!/usr/bin/env bash
# ============================================
# NeuroSphere Core Bootstrap Script
# ARGI + Bankruptcy-Loop + Modular Sovereignty
# ============================================

set -e

echo "🔐 NeuroSphere ARGI Bootstrap Starting..."

# 0. Pastikan file core executable
chmod +x ns-core.sh

# 1. Buat alias agar mudah dipanggil (Hanya berlaku di sesi saat ini)
alias ns='./ns-core.sh'

echo "✅ ns-core.sh executable & alias created"

# 2. Initialize ARGI Security Layer
./ns-core.sh init --mode "Regenerative" --quantum "Post-Lattice"

# 3. Activate Bankruptcy-Loop Algorithm
./ns-core.sh set fee_escalation --trigger "Anomaly_Detected" --rate "Exponential"

# 4. Connect 20-Country Modular Hubs
./ns-core.sh connect --nodes 20 --sync "Parallel_Modular"

# 5. Inject 1M LUV Distribution Logic
./ns-core.sh allocate --target "1M_People" --amount "1M_LUV" --lock "2_Years"

# 6. Route Attack Fees to Donation Pool
./ns-core.sh set route --attack_fine "Donation_Pool_15"

echo "🧠 NeuroSphere ARGI System ONLINE"
echo "🛡️ Quantum-Resilient | Self-Healing | Economically Defensive"
