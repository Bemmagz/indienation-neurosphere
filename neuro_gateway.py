from flask import Flask, render_template, request
from datetime import datetime
import os

app = Flask(__name__)
DB_PATH = os.path.join(os.path.dirname(__file__), 'DATA_PENDAFTAR_LUV.txt')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/claim')
def claim():
    user_ip = request.remote_addr
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open(DB_PATH, 'a') as f:
        f.write(f"KLAIM: {timestamp} | IP: {user_ip} | Status: Mandat 20 Des Valid\n")
    return "<h1>Klaim Berhasil!</h1><p>Data Anda telah tercatat dalam sistem kedaulatan Bemmagz. Reward 1 Juta LUV akan segera diproses.</p><a href='/'>Kembali</a>"

if __name__ == "__main__":
    app.run(port=9999, host='0.0.0.0')
