from flask import Flask, jsonify, request
import subprocess
import json
import os

app = Flask(__name__)

BASE_DIR = "/data/data/com.termux/files/home/indienation-neurosphere"
VAULT_PATH = os.path.join(BASE_DIR, "identity_vault.json")
VALIDATOR_SCRIPT = os.path.join(BASE_DIR, "tm_validator.py")

@app.route("/")
def root():
    return jsonify({
        "status": "ONLINE",
        "entity": "NeuroSphere Sovereign Node",
        "version": "1.0.0-kernel"
    })

@app.route("/verify", methods=["GET"])
def verify_identity():
    seq_id = request.args.get("id")
    asset = request.args.get("asset")
    
    if not seq_id or not asset:
        return jsonify({"error": "MISSING_PARAMS", "usage": "/verify?id=...&asset=..."}), 400

    # Memanggil Kernel Logic (tm_validator.py)
    result = subprocess.run(["python3", VALIDATOR_SCRIPT, seq_id, asset], capture_output=True, text=True)
    
    status_code = result.returncode
    return jsonify({
        "sequence_id": seq_id,
        "asset": asset,
        "is_valid": status_code == 0,
        "exit_code": status_code,
        "message": result.stdout.strip() if status_code == 0 else result.stderr.strip() or result.stdout.strip()
    })

@app.route("/balance")
def balance():
    if not os.path.exists(VAULT_PATH):
        return jsonify({"error": "VAULT_NOT_FOUND"}), 404

    with open(VAULT_PATH, "r") as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == "__main__":
    # Berjalan di port 5050 agar tidak bentrok
    app.run(host="127.0.0.1", port=5050)
