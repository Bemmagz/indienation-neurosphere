from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Dummy validator
def validate_intent(payload):
    sender = payload.get("sender")
    recipient = payload.get("recipient")
    if not sender or not recipient:
        return False, "Sender atau recipient tidak valid."
    return True, "Intent validated successfully."

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status":"ACTIVE","port":os.environ.get("PORT")})

@app.route("/transfer", methods=["POST"])
def transfer():
    payload = request.get_json()
    valid, message = validate_intent(payload)
    if not valid:
        return jsonify({"status":"FAILED","reason":message}), 400
    return jsonify({
        "status":"SUCCESS",
        "message": message,
        "sender": payload["sender"],
        "recipient": payload["recipient"],
        "asset": payload.get("asset", ""),
        "network": payload.get("network", "")
    })

if __name__=="__main__":
    PORT = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=PORT, debug=True)
