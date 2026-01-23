#!/usr/bin/env python3
# monitor_tm.py - NeuroSphere Monitoring System

import requests
import json
from datetime import datetime, timedelta
import sys

# ====================
# IMPORT CONFIG
# ====================
try:
    from config_neurosphere import SB_URL, HEADERS, KINDNESS_CONFIG, DEMO_MODE
except ImportError:
    print("❌ Error: config_neurosphere.py tidak ditemukan!")
    print("💡 Buat file config_neurosphere.py terlebih dahulu")
    sys.exit(1)

# ====================
# HELPER FUNCTIONS
# ====================
def print_header(title):
    """Print header dengan format rapi"""
    print("\n" + "="*60)
    print(f"🧠 {title}")
    print("="*60)

def days_until_launch():
    """Hitung hari menuju launch date"""
    launch_date = datetime.strptime(KINDNESS_CONFIG['launch_date'], "%Y-%m-%d")
    return (launch_date - datetime.now()).days

# ====================
# DATABASE CONNECTION
# ====================
def check_connection():
    """Cek koneksi ke database"""
    print_header("TEST KONEKSI DATABASE")
    
    if DEMO_MODE:
        print("✅ DEMO MODE: Connection simulated")
        return True
    
    if not SB_URL or "your-project-id" in SB_URL:
        print("❌ SB_URL belum dikonfigurasi!")
        print("💡 Edit config_neurosphere.py dengan Supabase credentials Anda")
        return False
    
    try:
        print(f"🔗 Connecting to: {SB_URL}")
        response = requests.get(SB_URL, headers=HEADERS, timeout=10)
        
        if response.status_code in [200, 301, 302]:
            print(f"✅ Koneksi berhasil! Status: {response.status_code}")
            return True
        else:
            print(f"❌ Koneksi gagal! Status: {response.status_code}")
            print(f"   Response: {response.text[:100]}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Tidak bisa terhubung ke server")
        print("   Periksa koneksi internet dan project ID")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

# ====================
# FOUNDER NFT CHECK
# ====================
def check_founder_tm():
    """Cek status NFT TM Founder"""
    print_header("STATUS FOUNDER NFT TM")
    
    if DEMO_MODE:
        # Data demo untuk founder
        print("👑 Founder ID: founder_neurosphere")
        print("💰 ENPE Balance: 1,000,000 coins")
        print("❤️  AURA Score: 950/1000")
        print("🔹 Kindness Level: Diamond")
        print("📅 Joined: 2024-01-01")
        print("🔗 Estafet Chain: 1250 acts of kindness")
        return
    
    if not check_connection():
        print("⚠️  Tidak bisa cek founder status")
        return
    
    try:
        # Query database untuk founder
        response = requests.get(
            f"{SB_URL}/tm_identity",
            params={"owner": "eq.founder_id"},
            headers=HEADERS,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data:
                founder = data[0]
                
                # Extract data
                owner = founder.get('owner', 'N/A')
                created = founder.get('created_at', 'N/A')
                
                # Parse metadata
                enpe_meta = founder.get('enpe_metadata', {})
                if isinstance(enpe_meta, str):
                    try:
                        enpe_meta = json.loads(enpe_meta)
                    except:
                        enpe_meta = {}
                
                luv_meta = founder.get('luv_metadata', {})
                if isinstance(luv_meta, str):
                    try:
                        luv_meta = json.loads(luv_meta)
                    except:
                        luv_meta = {}
                
                # Print results
                print(f"👑 Founder ID: {owner}")
                print(f"📅 Created: {created}")
                print(f"💰 ENPE Balance: {enpe_meta.get('balance', 0):,} coins")
                print(f"❤️  AURA Score: {luv_meta.get('aura_score', 0)}")
                print(f"🔹 Kindness Level: {luv_meta.get('level', 'N/A')}")
                
            else:
                print("⚠️  Founder data tidak ditemukan")
                print("💡 Buat record dengan owner='founder_id' di database")
        else:
            print(f"❌ Error: {response.status_code}")
            print(f"   {response.text[:200]}")
            
    except Exception as e:
        print(f"❌ Error checking founder: {str(e)}")

# ====================
# CLAIMS MONITORING
# ====================
def check_total_claims():
    """Cek total klaim yang sudah terjadi"""
    print_header("TOTAL CLAIMS MONITORING")
    
    if DEMO_MODE:
        # Data demo untuk claims
        target = KINDNESS_CONFIG['target_recipients']
        registered = 1250000  # Simulasi 1.25 juta pendaftar
        days_left = days_until_launch()
        
        print(f"👥 Total Registered: {registered:,} users")
        print(f"🎯 Target (1 Feb 2026): {target:,} users")
        print(f"📈 Progress: {(registered/target*100):.1f}%")
        print(f"📊 Required: {target - registered:,} more users")
        print(f"⏳ Days to launch: {days_left} days")
        
        if days_left > 0:
            daily_needed = (target - registered) / days_left
            print(f"📅 Daily target: {daily_needed:,.0f} users/day")
        
        print(f"\n💰 E-Kindness Distributed:")
        print(f"   • Total coins: 2,500,000,000")
        print(f"   • Average per user: 2,000 coins")
        print(f"   • Active chains: 45,000")
        return
    
    if not check_connection():
        print("⚠️  Tidak bisa cek claims")
        return
    
    try:
        # Query untuk count
        response = requests.get(
            f"{SB_URL}/tm_identity",
            params={"select": "count"},
            headers=HEADERS
        )
        
        if response.status_code == 200:
            # Parse content-range
            content_range = response.headers.get('content-range', '0-0/0')
            if '/' in content_range:
                total = int(content_range.split('/')[-1])
            else:
                total = 0
            
            # Calculate progress
            target = KINDNESS_CONFIG['target_recipients']
            days_left = days_until_launch()
            
            print(f"👥 Total Registered: {total:,} users")
            print(f"🎯 Target (1 Feb 2026): {target:,} users")
            print(f"📈 Progress: {(total/target*100 if target > 0 else 0):.1f}%")
            
            if total < target:
                print(f"📊 Required: {target - total:,} more users")
            
            print(f"⏳ Days to launch: {days_left} days")
            
            if days_left > 0 and total < target:
                daily_needed = (target - total) / days_left
                print(f"📅 Daily target: {daily_needed:,.0f} users/day")
            
        else:
            print(f"❌ Error: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error checking claims: {str(e)}")

# ====================
# PROGRAM DETAILS
# ====================
def show_program_details():
    """Tampilkan detail program Keys of Kindness"""
    print_header("PROGRAM DETAILS")
    
    config = KINDNESS_CONFIG
    days_left = days_until_launch()
    
    print(f"📛 Program Name: {config.get('program_name')}")
    print(f"📅 Launch Date: {config.get('launch_date')}")
    print(f"⏳ Days to Launch: {days_left} days")
    print(f"👥 Target Recipients: {config.get('target_recipients'):,}")
    print(f"💰 Reward per Person: €{config.get('reward_per_person'):,}")
    print(f"💵 Total Value: €{config.get('total_value'):,}")
    print(f"💶 Voucher System: 1 voucher = €{config.get('voucher_ratio')}")
    
    print("\n🔑 FEATURES:")
    print("   • AURA Algorithm based distribution")
    print("   • 12-month kindness tracking")
    print("   • Fingerprint & Facial Recognition")
    print("   • Age requirement: 17+ years")
    print("   • Merchant reward program")
    print("   • Disaster area support (min 1000 people)")
    
    print("\n📋 REGISTRATION REQUIREMENTS:")
    print("   1. Age 17+ (like driving license)")
    print("   2. Valid fingerprint/facial scan")
    print("   3. Positive AURA score")
    print("   4. Registered in NeuroSphere system")
    
    print("\n🏪 FOR MERCHANTS:")
    print("   • Receive €100,000 reward")
    print("   • Employees also get rewards")
    print("   • Must accept vouchers")
    
    print("\n🏢 FOR COMPANIES:")
    print("   • Reward goes to decision-maker (CEO/Founder)")
    print("   • Not to corporate entity")
    print("   • Must register individually")

# ====================
# GENERATE REPORT
# ====================
def generate_full_report():
    """Generate laporan lengkap"""
    print("\n" + "="*60)
    print("🚀 NEUROSPHERE - KEYS OF KINDNESS ESTAFET")
    print("="*60)
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"📊 Report Generated: {timestamp}")
    print(f"💻 Environment: neuroenv")
    print(f"🔧 Demo Mode: {'ON' if DEMO_MODE else 'OFF'}")
    
    # Show program details
    show_program_details()
    
    # Check database if not in demo mode
    if not DEMO_MODE:
        if check_connection():
            check_founder_tm()
            check_total_claims()
        else:
            print_header("DATABASE STATUS")
            print("❌ Cannot generate full report - database connection failed")
            print("💡 Solutions:")
            print("   1. Check internet connection")
            print("   2. Edit config_neurosphere.py with correct credentials")
            print("   3. Ensure Supabase project is active")
            print("   4. Set DEMO_MODE = True for testing")
    else:
        # In demo mode, show simulated data
        check_founder_tm()
        check_total_claims()
    
    print_header("SYSTEM STATUS")
    
    if DEMO_MODE:
        print("⚠️  SYSTEM: DEMO MODE - No real database connection")
        print("📋 STATUS: Development in progress")
        print("🎯 TARGET: Ready for 1 February 2026 launch")
    else:
        print("✅ SYSTEM: Connected to NeuroSphere Database")
        print("📋 STATUS: Active monitoring")
        print("🎯 TARGET: On track for 1 February 2026 launch")
    
    print("\n📌 NEXT STEPS:")
    print("   1. Complete AURA Algorithm integration")
    print("   2. Deploy registration Web-App")
    print("   3. Onboard merchant partners globally")
    print("   4. Launch marketing campaign")
    print("   5. Final testing phase")
    
    print("\n" + "="*60)
    print("🙏 Biarlah kita bisa bermanfaat bagi semua makhluk")
    print("   & bukan malahan merugikan pihak lain")
    print("="*60)

# ====================
# MAIN EXECUTION
# ====================
if __name__ == "__main__":
    generate_full_report()
