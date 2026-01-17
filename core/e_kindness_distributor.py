import json, random, os, datetime

KARMA_FILE = "/data/data/com.termux/files/home/indienation-neurosphere/state/karma.jsonl"

def get_aura_data(user_id):
    points = 0
    dates = set()
    if os.path.exists(KARMA_FILE):
        with open(KARMA_FILE, "r") as f:
            for line in f:
                data = json.loads(line)
                if data.get("id") == user_id:
                    points += data.get("points", 0)
                    dt = data.get("timestamp", "").split("T")[0]
                    if dt: dates.add(dt)
    return points, len(dates)

def distribute():
    import sys
    user_id = sys.argv[1] if len(sys.argv) > 1 else "NeuroID#001"
    points, streak = get_aura_data(user_id)
    
    # Logic: Streak Multiplier
    multiplier = 2 if streak >= 3 else 1
    
    if points > 50:
        reward = random.randint(6, 10) * multiplier
        status = "GOLDEN RADIANCE"
    else:
        reward = random.randint(1, 5) * multiplier
        status = "CYAN STEADY"
        
    return {
        "user_id": user_id,
        "aura_points": points,
        "streak_days": streak,
        "multiplier": f"x{multiplier}",
        "reward_granted": f"{reward} LUV",
        "aura_status": status
    }

if __name__ == "__main__":
    print(json.dumps(distribute(), indent=2))
