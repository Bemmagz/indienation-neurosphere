const crypto = require('crypto');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const SALT = "NEURO-SECRET-2026";

async function megaSync() {
    console.log("📡 AI Guard: Memulai Injeksi Kunci Massal (1.250 Citizens)...");
    
    const { data: citizens, error } = await supabase.from('iid_inventory').select('iid');
    if (error) return console.error("❌ Gagal:", error.message);

    console.log(`📦 Memproses ${citizens.length} identitas...`);

    for (let citizen of citizens) {
        // Generate Hash unik untuk setiap IID
        const hash = crypto.createHash('sha256').update(citizen.iid + SALT).digest('hex').substring(0, 12);
        
        await supabase
            .from('iid_inventory')
            .update({ access_token: hash })
            .eq('iid', citizen.iid);
    }

    console.log("🏁 MISI SELESAI: 1.250 Gerbang Stealth Kini Aktif Secara Global.");
}

megaSync();
