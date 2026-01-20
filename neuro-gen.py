import sqlite3, os, qrcode, base64, sys
from io import BytesIO

def get_visuals(aura, level):
    # Skema warna berdasarkan kedalaman generasi
    # Gen 0: Gold | Gen 1: Cyan | Gen 2: Green | Gen 3: Magenta | Gen 4+: White
    colors = ["#FFD700", "#00ffff", "#00ff00", "#ff00ff", "#ffffff"]
    color = colors[min(level, len(colors)-1)]
    
    if aura >= 80: rank = "👑 LEGEND"
    elif aura >= 50: rank = "🛡️ GUARDIAN"
    else: rank = "🌱 SEED"
    return color, rank

def get_generation_level(conn, citizen_id, level=0):
    cursor = conn.cursor()
    cursor.execute("SELECT inherited_from FROM citizens WHERE id=?", (citizen_id,))
    row = cursor.fetchone()
    if row and row[0] and row[0] != 'None' and row[0] != '':
        return get_generation_level(conn, row[0], level + 1)
    return level

def generate_svg(id, aura, status, inherited_from, level):
    color, rank = get_visuals(aura, level)
    qr_base64 = base64.b64encode(BytesIO().tap(lambda b: qrcode.make(f"ns:{id}|gen:{level}", box_size=10, border=1).save(b, "PNG")).getvalue()).decode() if False else "" # Shortcut logic
    
    # Real QR Generation
    qr = qrcode.QRCode(version=1, box_size=10, border=1)
    qr.add_data(f"neurosphere:id={id}|gen={level}|aura={aura}")
    qr.make(fit=True)
    img = qr.make_image(fill_color=color, back_color="black")
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    qr_base64 = base64.b64encode(buffered.getvalue()).decode()

    lineage = f'<text x="125" y="220" text-anchor="middle" font-family="monospace" font-size="10" fill="#aaa">GEN {level} • FROM {inherited_from.upper()}</text>' if inherited_from else '<text x="125" y="220" text-anchor="middle" font-family="monospace" font-size="10" fill="#FFD700">❖ ORIGIN FOUNDER ❖</text>'
    
    svg = f"""
    <svg width="250" height="380" xmlns="http://www.w3.org/2000/svg">
        <rect width="250" height="380" rx="15" fill="#111" stroke="{color}" stroke-width="3"/>
        <text x="125" y="60" text-anchor="middle" font-family="monospace" font-size="10" fill="{color}" opacity="0.5">NEUROSPHERE ID CARD</text>
        <text x="125" y="170" text-anchor="middle" font-family="monospace" font-size="20" fill="white" font-weight="bold">{id}</text>
        <text x="125" y="195" text-anchor="middle" font-family="monospace" font-size="14" fill="{color}">{rank}</text>
        {lineage}
        <image x="65" y="240" width="120" height="120" href="data:image/png;base64,{qr_base64}" />
        <text x="125" y="370" text-anchor="middle" font-family="monospace" font-size="8" fill="#444">VERIFIED AURALANG PROTOCOL v4.5</text>
    </svg>
    """
    os.makedirs("avatars", exist_ok=True)
    with open(f"avatars/{id}.svg", "w") as f: f.write(svg)

conn = sqlite3.connect("neurosphere.db")
cursor = conn.cursor()
cursor.execute("SELECT id, current_aura, status, inherited_from FROM citizens")
for row in cursor.fetchall():
    level = get_generation_level(conn, row[0])
    generate_svg(row[0], row[1], row[2], row[3], level)
conn.close()
print("🧬 Decay System Active & NFTs Evolved!")
