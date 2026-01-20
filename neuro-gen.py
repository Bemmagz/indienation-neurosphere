#!/data/data/com.termux/files/usr/bin/python3

import sqlite3
import os

def get_aura_color(aura):
    """Determine color based on aura level."""
    if aura <= 30:
        return "green"    # 🌱 Seed
    elif aura <= 70:
        return "cyan"     # 🛡️ Guardian
    else:
        return "magenta"  # 👑 Legend

def get_rank_symbol(aura):
    """Get rank symbol based on aura."""
    if aura <= 30:
        return "🌱"
    elif aura <= 70:
        return "🛡️"
    else:
        return "👑"

def generate_svg(id, aura):
    """Generate SVG avatar for a citizen."""
    color = get_aura_color(aura)
    rank_symbol = get_rank_symbol(aura)
    
    svg_content = f'''<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="grad{id}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:{color};stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#000011;stop-opacity:1" />
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    </defs>
    
    <!-- Background -->
    <rect width="200" height="200" fill="#0a0a1a" />
    
    <!-- Aura Circle -->
    <circle cx="100" cy="100" r="80" fill="url(#grad{id})" filter="url(#glow)" opacity="0.8" />
    
    <!-- Rank Symbol -->
    <text x="100" y="90" text-anchor="middle" font-family="Arial" font-size="40" fill="white">{rank_symbol}</text>
    
    <!-- Citizen ID -->
    <text x="100" y="130" text-anchor="middle" font-family="Arial" font-size="12" fill="white" font-weight="bold">{id}</text>
    
    <!-- Aura Value -->
    <text x="100" y="150" text-anchor="middle" font-family="Arial" font-size="14" fill="{color}" font-weight="bold">Aura: {aura}</text>
    
    <!-- Decorative Rings -->
    <circle cx="100" cy="100" r="85" fill="none" stroke="{color}" stroke-width="2" opacity="0.5" />
    <circle cx="100" cy="100" r="75" fill="none" stroke="white" stroke-width="1" opacity="0.3" />
</svg>'''
    
    # Save to file
    filename = f"avatars/{id.replace('/', '_').replace(' ', '_')}.svg"
    with open(filename, "w") as f:
        f.write(svg_content)
    
    return filename

def main():
    """Main function to generate avatars for all active citizens."""
    print("🎨 Generating NeuroSphere Auralang Avatars...")
    print("==========================================")
    
    # Create avatars directory if it doesn't exist
    os.makedirs("avatars", exist_ok=True)
    
    # Connect to database
    try:
        conn = sqlite3.connect("neurosphere.db")
        cursor = conn.cursor()
        
        # Get all active citizens
        cursor.execute("SELECT id, current_aura FROM citizens WHERE status='active' ORDER BY current_aura DESC")
        citizens = cursor.fetchall()
        
        if not citizens:
            print("❌ No active citizens found in database.")
            return
        
        print(f"Found {len(citizens)} active citizens.")
        print()
        
        # Generate avatars
        generated = 0
        for id, aura in citizens:
            try:
                filename = generate_svg(id, aura)
                print(f"✅ {get_rank_symbol(aura)} {id}: {aura} aura → {filename}")
                generated += 1
            except Exception as e:
                print(f"❌ Failed to generate avatar for {id}: {e}")
        
        # Also generate for top 5 overall
        print()
        print("🏆 Generating leaderboard avatars...")
        cursor.execute("SELECT id, current_aura FROM citizens ORDER BY current_aura DESC LIMIT 5")
        top_citizens = cursor.fetchall()
        
        for id, aura in top_citizens:
            if not os.path.exists(f"avatars/{id.replace('/', '_').replace(' ', '_')}.svg"):
                filename = generate_svg(id, aura)
                print(f"📊 Leaderboard: {filename}")
        
        conn.close()
        
        print()
        print(f"✨ Successfully generated {generated} avatars in 'avatars/' directory.")
        print("💡 View them in any web browser or image viewer that supports SVG.")
        
        # Create an index.html to view all avatars
        create_html_index(citizens)
        
    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

def create_html_index(citizens):
    """Create an HTML file to view all avatars."""
    html_content = '''<!DOCTYPE html>
<html>
<head>
    <title>NeuroSphere Auralang Avatars</title>
    <style>
        body {
            background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
            color: white;
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #00ffff;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .avatar-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
            justify-items: center;
        }
        .avatar-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 15px;
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
            border: 1px solid rgba(0, 255, 255, 0.1);
        }
        .avatar-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 255, 255, 0.2);
            border-color: rgba(0, 255, 255, 0.3);
        }
        .avatar-card img {
            width: 180px;
            height: 180px;
            border-radius: 10px;
        }
        .citizen-id {
            margin-top: 10px;
            font-weight: bold;
            color: #00ffff;
        }
        .aura-value {
            color: #ff00ff;
            font-size: 0.9em;
        }
        .rank-badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 0.8em;
            margin-top: 5px;
        }
        .seed { background: rgba(0, 255, 0, 0.2); color: #00ff00; }
        .guardian { background: rgba(0, 255, 255, 0.2); color: #00ffff; }
        .legend { background: rgba(255, 0, 255, 0.2); color: #ff00ff; }
        .stats {
            text-align: center;
            margin-top: 30px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧠 NeuroSphere Auralang Avatars</h1>
        <p>Visual representation of citizen aura levels</p>
    </div>
    
    <div class="stats">
        <strong>Total Active Citizens:</strong> ''' + str(len(citizens)) + '''<br>
        <em>Generated: ''' + import datetime; datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + '''</em>
    </div>
    
    <div class="avatar-grid">
'''
    
    # Add avatar cards
    for id, aura in citizens:
        color_class = "seed" if aura <= 30 else "guardian" if aura <= 70 else "legend"
        rank_text = "Seed" if aura <= 30 else "Guardian" if aura <= 70 else "Legend"
        filename = f"{id.replace('/', '_').replace(' ', '_')}.svg"
        
        html_content += f'''
        <div class="avatar-card">
            <img src="{filename}" alt="{id}">
            <div class="citizen-id">{id}</div>
            <div class="aura-value">Aura: {aura}</div>
            <div class="rank-badge {color_class}">{rank_text}</div>
        </div>
        '''
    
    html_content += '''
    </div>
    
    <div class="stats">
        <p>NeuroSphere v4.2.0 | Aura determines rank: 🌱 Seed (0-30), 🛡️ Guardian (31-70), 👑 Legend (71+)</p>
    </div>
</body>
</html>
'''
    
    with open("avatars/index.html", "w") as f:
        f.write(html_content)
    
    print(f"📄 Created avatars/index.html to view all avatars.")
    print(f"🌐 Open it in a web browser to see the gallery.")

if __name__ == "__main__":
    main()
