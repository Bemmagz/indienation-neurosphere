#!/usr/bin/env python3
from flask import Flask, jsonify, request
import os
from difflib import get_close_matches

app = Flask(__name__)

# --- Users database ---
users_db = {"NeuroID#001":{"name":"Alice"}, "NeuroID#002":{"name":"Bob"}, "NeuroID#003":{"name":"Charlie"}}

# --- Guard validation ---
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
            suggestions = get_close_matches(recipient, users_db.keys(), n=1, cutoff=0.5)
            suggestion_msg = f" Did you mean '{suggestions[0]}'?" if suggestions else ""
            return False, f"Recipient {recipient} invalid. Attempt {attempt}/{max_attempts}.{suggestion_msg}"

        if asset not in ["USDT","ENPE","LovelyCoin"]:
            return False, f"Asset {asset} unsupported."

        if network not in ["BSC","ETH","TRON"]:
            return False, f"Network {network} incompatible."

        valid = True

    if not valid:
        return False, "Maximum attempts reached. STOP."

    return True, "Intent validated successfully."

# --- Routes ---
@app.route("/")
def root():
    return jsonify({"status":"ONLINE","entity":"NeuroSphere Guard Node","version":"1.0.0-ADVANCED"})

@app.route("/transfer", methods=["POST"])
def transfer():
    payload = request.get_json()
    valid, message = validate_intent(payload)
    if not valid:
        return jsonify({"status":"FAILED","reason":message}), 400
    return jsonify({
        "status":"SUCCESS",
        "sender":payload["sender"],
        "recipient":payload["recipient"],
        "asset":payload["asset"],
        "network":payload["network"],
        "message":message
    })

PORT = int(os.environ.get("PORT", 5000))
if __name__=="__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
