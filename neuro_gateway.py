from flask import Flask, request
import os, json, datetime, subprocess

app = Flask(__name__)
DB = "DATA_PENDAFTAR_ASLI/pendaftar_natal.json"

@app.route('/')
def home():
    return """<body style='background:#000;color:#0f0;font-family:monospace;text-align:center;'>
    <canvas id='m'></canvas>
    <div style='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:1px solid #0f0;padding:30px;background:rgba(0,0,0,0.9);'>
    <h1>XMAS NEURO-DROP</h1>
    <form action='/reg' method='POST'>
    <input name='k' placeholder='ID' required style='background:#000;color:#0f0;border:1px solid #0f0;padding:10px;'><br><br>
    <input name='n' placeholder='SECTOR' required style='background:#000;color:#0f0;border:1px solid #0f0;padding:10px;'><br><br>
    <button style='background:#0f0;color:#000;padding:15px;font-weight:bold;cursor:pointer;'>CLAIM 1,000,000 LUV</button>
    </form>
    <p style='font-size:0.7em;'>LUV: 15% DONATION POOL OPEN | ENPE: NO DONATION</p>
    </div>
    <script>const c=document.getElementById('m');const ctx=c.getContext('2d');c.width=window.innerWidth;c.height=window.innerHeight;const s='01';const f=16;const drops=Array(Math.floor(c.width/f)).fill(1);function d(){ctx.fillStyle='rgba(0,0,0,0.05)';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#0f0';ctx.font=f+'px monospace';drops.forEach((y,i)=>{const t=s[Math.floor(Math.random()*s.length)];ctx.fillText(t,i*f,y*f);if(y*f>c.height&&Math.random()>0.975)drops[i]=0;drops[i]++;});}setInterval(d,33);</script></body>"""

@app.route('/reg', methods=['POST'])
def reg():
    data = {"k": request.form.get('k'), "n": request.form.get('n'), "ts": str(datetime.datetime.now())}
    if not os.path.exists("DATA_PENDAFTAR_ASLI"): os.makedirs("DATA_PENDAFTAR_ASLI")
    with open(DB, 'a') as f: f.write(json.dumps(data) + "\n")
    subprocess.Popen(["git add . && git commit -m 'Node Pulse' && git push origin main"], shell=True)
    return "<h1>SUCCESS</h1><p>Synced to Cloud & AI Studio.</p><a href='/' style='color:#0f0;'>BACK</a>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9999)
