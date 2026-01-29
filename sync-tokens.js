require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const SALT = 'INDIE-NATION-SOVEREIGN-2026-X';

async function sync() {
    console.log("📡 AI Guard: Sinkronisasi 1.250 Token ke Database...");
    
    for (let i = 1; i <= 1250; i++) {
        const iid = `INDIE-${i.toString().padStart(10, '0')}`;
        const token = crypto.createHash('sha256').update(`${iid}:${SALT}`).digest('hex').substring(0, 24);

        const { error } = await supabase
            .from('iid_inventory')
            .update({ access_token: token })
            .eq('iid', iid);

        if (error) {
            console.error(`❌ Gagal pada ${iid}:`, error.message);
        } else if (i % 100 === 0 || i === 1) {
            console.log(`✅ Terverifikasi: ${iid}`);
        }
    }
    console.log("🏁 SINKRONISASI SELESAI: Semua gerbang sekarang aktif!");
}
sync();
