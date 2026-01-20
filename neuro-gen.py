import sqlite3
import os
import qrcode
import base64
from io import BytesIO

def get_aura_color(aura):
    if aura <= 30: return "#00ff00"    # 🌱 Seed
    if aura <= 70: return "#00ffff"    # 🛡️ Guardian
    return "#ff00ff"                 # 👑 Legend

def generate_qr_base64(data, color):
    qr = qrcode.QRCode(version=1, box_size=10, border=1)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color=color, back_color="black")
    
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode()

def generate_svg(id, aura, status):
    color = get_aura_color(aura)
    # Data yang tertanam di QR (Bisa berupa URI atau Hash)
    qr_data = f"neurosphere:id={id}|aura={aura}|status={status}"
    qr_base64 = generate_qr_base64(qr_data, color)
    
    svg_content = f"""
    <svg width="250" height="350" xmlns="http://www.w3.org/2000/svg">
        <rect width="250" height="350" rx="15" fill="#111" stroke="{color}" stroke-width="2"/>
        
        <circle cx="125" cy="100" r="60" fill="{color}" opacity="0.2">
            <animate attributeName="r" values="55;65;55" dur="3s" repeatCount="indefinite" />
        </circle>
        
        <text x="125" y="180" text-anchor="middle" font-family="monospace" font-size="18" fill="white" font-weight="bold">{id}</text>
        <text x="125" y="205" text-anchor="middle" font-family="monospace" font-size="14" fill="{color}">{status.upper()}</text>
        <text x="125" y="225" text-anchor="middle" font-family="monospace" font-size="12" fill="#888">AURA: {aura}</text>
        
        <image x="65" y="240" width="120" height="120" href="data:image/png;base64,{qr_base64}" />
        
        <text x="125" y="335" text-anchor="middle" font-family="monospace" font-size="10" fill="#444">NEUROSPHERE SOVEREIGN ID</text>
    </svg>
    """
    
    os.makedirs("avatars", exist_ok=True)
    with open(f"avatars/{id}.svg", "w") as f:
        f.write(svg_content)
    print(f"✅ NFT Avatar + QR generated for {id}")

# Connect to DB
conn = sqlite3.connect("neurosphere.db")
cursor = conn.cursor()
cursor.execute("SELECT id, current_aura, status FROM citizens WHERE status='active' OR status='inherited'")
for row in cursor.fetchall():
    generate_svg(row[0], row[1], row[2])
conn.close()
