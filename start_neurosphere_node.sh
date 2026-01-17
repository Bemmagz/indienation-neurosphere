#!/usr/bin/env bash
PORT=5000
PY_FILE="neurosphere_guard_node.py"

# --- Matikan Flask lama di port 5000 ---
PIDS=$(lsof -ti tcp:$PORT)
if [ ! -z "$PIDS" ]; then
    echo "[INFO] Killing old Flask processes: $PIDS"
    kill -9 $PIDS
fi

# --- Buat file Python jika belum ada ---
if [ ! -f "$PY_FILE" ]; then
    echo "[INFO] Creating $PY_FILE..."
    cat <<PYEOF > $PY_FILE
#!/usr/bin/env python3
from flask import Flask, jsonify, request

app = Flask(__name__)
users_db = {"NeuroID#001": {"name": "Alice"}, "NeuroID#002": {"name": "Bob"}}

def validate_intent(payload):
    max_attempts = 5
    attempt = 0
    valid = False
    while attempt < max_attempts and not valid:
        sender = payload.get("sender")
        recipient = payload.get("recipient")
        asset = payload.get("asset")
        network = payload.get("network")
        if sender not in users_db:
            return False, f"Sender {sender} not recognized."
        if recipient not in users_db:
            attempt += 1
            return False, f"Recipient {recipient} invalid. Attempt {attempt}/{max_attempts}."
        if asset not in ["USDT","ENPE","LovelyCoin"]:
            return False, f"Asset {asset} unsupported."
        if network not in ["BSC","ETH","TRON"]:
            return False, f"Network {network} incompatible."
        valid = True
    if not valid:
        return False, "Maximum attempts reached. STOP."
    return True, "Intent validated successfully."

@app.route("/")
def root():
    return jsonify({"status":"ONLINE","entity":"NeuroSphere Guard Node","version":"1.0.0-RIVL"})

@app.route("/transfer", methods=["POST"])
def transfer():
    payload = request.get_json()
    valid, message = validate_intent(payload)
    if not valid:
        return jsonify({"status":"FAILED","reason":message}), 400
    return jsonify({"status":"SUCCESS","sender":payload["sender"],"recipient":payload["recipient"],"asset":payload["asset"],"network":payload["network"],"message":message})

if __name__=="__main__":
    app.run(host="0.0.0.0", port=$PORT, debug=True)
PYEOF
    chmod +x $PY_FILE
fi

# --- Jalankan Flask Node ---
echo "[INFO] Starting NeuroSphere Guard Node on port $PORT..."
python3 $PY_FILE
