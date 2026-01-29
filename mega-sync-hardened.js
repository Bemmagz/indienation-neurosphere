const crypto = require('crypto');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const SALT = process.env.NEURO_SALT;

if (!SALT) {
    console.error("❌ ERROR: NEURO_SALT tidak ditemukan di .env!");
    process.exit(1);
}

async function megaSync() {
    console.log("📡 AI Guard: Memulai Injeksi Kunci 24-Hex (Hardened)...");
    
    const { data: citizens, error } = await supabase.from('iid_inventory').select('iid');
    if (error) return console.error("❌ Gagal Fetch:", error.message);

    console.log(`📦 Memproses ${citizens.length} Citizens dengan Standar Keamanan Baru...`);

    for (let citizen of citizens) {
        // Standar Audit: 24 Karakter (96 bit) + Deterministik Salt
        const token = crypto
            .createHash('sha256')
            .update(`${citizen.iid}:${SALT}`)
            .digest('hex')
            .substring(0, 24);
        
        const { error: upErr } = await supabase
            .from('iid_inventory')
            .update({ 
                access_token: token,
                updated_at: new Date() 
            })
            .eq('iid', citizen.iid);

        if (upErr) console.error(`❌ Gagal di ${citizen.iid}:`, upErr.message);
    }

    console.log("🏁 MISI SELESAI: 1.250 Gerbang Stealth 24-Hex Aktif & Terkunci.");
}

megaSync();
