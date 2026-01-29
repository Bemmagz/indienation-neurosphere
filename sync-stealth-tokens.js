const crypto = require('crypto');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const SALT = "NEURO-SECRET-2026";

async function syncTokens() {
    console.log("📡 AI Guard: Memulai Sinkronisasi Token Stealth...");
    
    // Ambil semua data warga yang sudah di-reset tadi
    const { data: citizens, error } = await supabase.from('iid_inventory').select('iid');
    if (error) return console.error("❌ Gagal ambil data:", error.message);

    console.log(`📦 Memproses ${citizens.length} warga...`);

    for (let citizen of citizens) {
        const hash = crypto.createHash('sha256').update(citizen.iid + SALT).digest('hex').substring(0, 12);
        
        await supabase
            .from('iid_inventory')
            .update({ access_token: hash })
            .eq('iid', citizen.iid);
    }

    console.log("✅ SINKRONISASI SELESAI: Semua ID kini memiliki perisai Hash.");
}

syncTokens();
