from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "NeuroGateway Online!"

@app.route('/simulate')
def simulate():
    timestamp = request.args.get('time', '')
    print(f"[SIMULATE] GET request received at {timestamp}")
    return jsonify({"status": "ok", "time": timestamp})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9999)
