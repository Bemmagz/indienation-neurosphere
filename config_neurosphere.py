# config_neurosphere.py
# Konfigurasi Database NeuroSphere

# ====================
# SUPA BASE CONFIG
# ====================
SUPABASE_CONFIG = {
    "project_id": "your-project-id-here",      # Ganti dengan Project ID Anda
    "anon_key": "your-anon-key-here",          # Ganti dengan Anon Key Anda
    "service_role_key": "your-service-key-here"  # Opsional
}

# URL API Supabase
SB_URL = f"https://{SUPABASE_CONFIG['project_id']}.supabase.co/rest/v1"

# Headers untuk API request
HEADERS = {
    "apikey": SUPABASE_CONFIG['anon_key'],
    "Authorization": f"Bearer {SUPABASE_CONFIG['anon_key']}",
    "Content-Type": "application/json"
}

# ====================
# KEYS OF KINDNESS CONFIG
# ====================
KINDNESS_CONFIG = {
    "launch_date": "2026-02-01",
    "target_recipients": 2000000,
    "reward_per_person": 100000,            # €100,000
    "total_value": 200000000000000,         # €200 Trillion
    "program_name": "Keys of Kindness Estafet",
    "currency": "Euro",
    "voucher_ratio": 1                      # 1 voucher = €1
}

# ====================
# DEMO MODE (jika belum ada database)
# ====================
DEMO_MODE = True  # Set False jika sudah punya Supabase

if DEMO_MODE:
    print("⚠️  DEMO MODE: Using simulated data")
    print("💡 To use real database, set DEMO_MODE = False")
    print("   and edit SUPABASE_CONFIG with your credentials")
