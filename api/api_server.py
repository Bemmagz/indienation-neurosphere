#!/usr/bin/env python3
from flask import Flask, jsonify
from flask_cors import CORS
import os, json
app = Flask(__name__)
CORS(app)
LEDGER_PATH = os.path.join(os.path.dirname(__file__), "../state/ledger.json")
@app.route("/")
def root(): return jsonify({"status":"ONLINE","entity":"NeuroSphere Node","version":"1.0.0-auto"})
@app.route("/ledger")
def ledger():
    if not os.path.exists(LEDGER_PATH): return jsonify([])
    with open(LEDGER_PATH,"r") as f:
        try: data = json.load(f)
        except: data = []
    return jsonify(data)
if __name__=="__main__":
    app.run(host="127.0.0.1", port=5050)
