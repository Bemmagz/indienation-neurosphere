import json, os

KARMA_FILE = "/data/data/com.termux/files/home/indienation-neurosphere/state/karma.jsonl"
VAULT = "/data/data/com.termux/files/home/indienation-neurosphere/identity_vault.json"

def get_points():
    points = 0
    if os.path.exists(KARMA_FILE):
        with open(KARMA_FILE, "r") as f:
            for line in f:
                points += json.loads(line).get("points", 0)
    return points

def evolve():
    current_points = get_points()
    threshold = 50 # Ambang batas untuk evolusi ke V2
    
    print(f"--- EVOLUTION CHAMBER ---")
    print(f"Current Karma: {current_points} Pts")
    
    if current_points >= threshold:
        print("✅ CONDITION MET: Ready for Evolution to V2.0!")
        # Logika pembaruan metadata identitas bisa ditaruh di sini
        return True
    else:
        print(f"❌ CONDITION FAILED: Need {threshold - current_points} more points to evolve.")
        return False

if __name__ == "__main__":
    evolve()
